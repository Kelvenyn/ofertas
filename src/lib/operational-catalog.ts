import "server-only"
import { BlobPreconditionFailedError, get, put } from "@vercel/blob"
import { unstable_cache } from "next/cache"
import { OFFER_CATALOG, getCatalogEntryById, type OfferCatalog, type OfferCatalogEntry } from "@/config/offers/catalog"
import { getOfferConfig } from "@/config/offers"
import { getCheckoutSummary } from "@/lib/offer-routing"
import { normalizeIfMatchEtag, updateVersionedValue } from "@/lib/versioned-blob-update"
import { OfferRoutingError } from "@/lib/offer-routing"
import {
  assertValidOperationalOffer,
  isWebpReference,
  insertDraftOffer,
  mergeOperationalCatalog,
  resolveOperationalOfferRecord,
  serializeOperationalOverridesV4,
  validateNewOfferSlug,
  validateOperationalOverrides,
  validateTemplateOfferActivation,
  type OfferOverride,
} from "@/lib/operational-catalog-domain"
import type { OfferConfig } from "@/types/offer"

const BLOB_PATH = "admin/ofertas-operacionais.json"
export const OPERATIONAL_CATALOG_CACHE_TAG = "operational-offers"

const STATIC_IDS = Object.values(OFFER_CATALOG.offers).map((entry) => entry.id)

/** Validate current v4 and migrate the supported v1-v3 operational catalog formats. */
export function validateOverrides(value: unknown): Record<string, OfferOverride> {
  return validateOperationalOverrides(value)
}

async function readOverrides(): Promise<{ overrides: Record<string, OfferOverride>; etag?: string }> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { overrides: {} }

  const blob = await get(BLOB_PATH, { access: "private", useCache: false })
  if (!blob) return { overrides: {} }
  try {
    const payload = await new Response(blob.stream).json()
    return { overrides: validateOverrides(payload), etag: normalizeIfMatchEtag(blob.blob.etag) }
  } catch (error) {
    throw new Error("O catálogo operacional da oferta não pôde ser lido.", { cause: error })
  }
}

const getCachedOverrides = unstable_cache(
  async () => (await readOverrides()).overrides,
  ["operational-offers-v4"],
  { revalidate: 3600, tags: [OPERATIONAL_CATALOG_CACHE_TAG] },
)

export async function getOperationalCatalog(): Promise<OfferCatalog> {
  return mergeOperationalCatalog(await getCachedOverrides())
}

export async function getOperationalOffer(slug: string): Promise<OfferConfig | undefined> {
  const catalog = await getOperationalCatalog()
  const record = resolveOperationalOfferRecord(slug, catalog, await getCachedOverrides())
  return record?.offer
}

export async function getOperationalOfferRecord(slug: string): Promise<{
  entry: OfferCatalogEntry
  offer: OfferConfig
} | undefined> {
  const catalog = await getOperationalCatalog()
  return resolveOperationalOfferRecord(slug, catalog, await getCachedOverrides())
}

async function updateOverrides<R>(
  update: (overrides: Record<string, OfferOverride>) => { overrides: Record<string, OfferOverride>; result: R },
): Promise<R> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("O armazenamento operacional não está configurado.")
  return updateVersionedValue({
    read: async () => {
      const { overrides, etag } = await readOverrides()
      return { value: overrides, etag }
    },
    update: (overrides) => {
      const updated = update(overrides)
      return { value: serializeOperationalOverridesV4(updated.overrides), result: updated.result }
    },
    write: async (next, etag) => put(BLOB_PATH, JSON.stringify(next), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 0,
      ...(etag ? { ifMatch: etag } : {}),
    }),
    isConflict: (error) => error instanceof BlobPreconditionFailedError,
  })
}

export async function createOperationalOffer({ label, slug }: { label: string; slug: string }): Promise<OfferCatalogEntry> {
  const normalizedLabel = label.trim()
  if (!normalizedLabel || normalizedLabel.length > 80) throw new OfferRoutingError("O nome deve ter de 1 a 80 caracteres.", 400)
  const id = crypto.randomUUID()

  return updateOverrides((overrides) => {
    const inserted = insertDraftOffer(overrides, { id, label: normalizedLabel, slug })
    return { overrides: inserted.overrides, result: inserted.entry }
  })
}

export async function updateOperationalOffer(
  slug: string,
  changes: OfferOverride,
): Promise<OfferCatalogEntry | undefined> {
  const cachedCatalog = await getOperationalCatalog()
  const cachedEntry = Object.values(cachedCatalog.offers).find((entry) => entry.slug === slug)
  if (!cachedEntry) return undefined

  if (changes.offer) assertValidOperationalOffer(changes.offer)
  if (changes.cashflow !== undefined && changes.cashflow !== null &&
      (typeof changes.cashflow.workspaceId !== "string" || typeof changes.cashflow.offerId !== "string")) {
    throw new Error("Configuração de tracking inválida.")
  }
  if (changes.favicon !== undefined && changes.favicon !== null && !isWebpReference(changes.favicon)) {
    throw new Error("Favicon inválido.")
  }

  return updateOverrides((overrides) => {
    const catalog = mergeOperationalCatalog(overrides)
    const current = Object.values(catalog.offers).find((entry) => entry.id === cachedEntry.id)
    if (!current) throw new Error("Oferta não encontrada.")
    if (changes.slug !== undefined) {
      const slugError = validateNewOfferSlug(changes.slug, current.id, catalog.offers, STATIC_IDS)
      if (slugError) throw new OfferRoutingError(slugError, 400)
    }

    const currentOffer = overrides[current.id]?.offer ?? getOfferConfig(current.id)
    const nextOffer = changes.offer ?? currentOffer
    if (!nextOffer) throw new Error("Configuração da oferta não encontrada.")
    const nextStatus = changes.status ?? current.status
    const nextFavicon = Object.hasOwn(changes, "favicon") ? changes.favicon : current.favicon
    const activatingOrEditingActive = nextStatus === "active" && (
      changes.status === "active" || changes.offer !== undefined || changes.slug !== undefined || changes.favicon !== undefined
    )

    if (activatingOrEditingActive) {
      const checkout = getCheckoutSummary(nextOffer)
      if (current.templateId) {
        const templateOffer = getOfferConfig(current.templateId)
        const templateEntry = getCatalogEntryById(current.templateId)
        if (!templateOffer || !templateEntry) throw new Error("O modelo de origem da oferta não está disponível.")
        const activationError = validateTemplateOfferActivation(
          nextOffer,
          nextFavicon,
          templateOffer,
          templateEntry.favicon,
          checkout.valid && nextOffer.pricing.plans.every((plan) => plan.ctaDisabled !== true),
        )
        if (activationError) throw new OfferRoutingError(activationError, 422)
      } else if (!checkout.valid) {
        throw new OfferRoutingError("Para ativar, configure um link HTTPS válido para cada plano (um ou dois planos).", 422)
      }
    }

    const identity = applyCatalogIdentity(current, changes)
    const nextOverride: OfferOverride = {
      ...overrides[current.id],
      ...changes,
      slug: identity.slug,
      status: identity.status,
    }
    return {
      overrides: { ...overrides, [current.id]: nextOverride },
      result: {
        ...current,
        slug: identity.slug,
        status: identity.status,
        ...(Object.hasOwn(changes, "cashflow") ? { cashflow: changes.cashflow } : {}),
        ...(Object.hasOwn(changes, "favicon") ? { favicon: changes.favicon } : {}),
      },
    }
  })
}

function applyCatalogIdentity(
  current: OfferCatalogEntry,
  changes: Pick<OfferOverride, "slug" | "status">,
): { slug: string; status: "active" | "inactive" | "draft" } {
  const slug = changes.slug ?? current.slug
  const status = changes.status ?? current.status
  return { slug, status }
}
