import "server-only"
import { BlobPreconditionFailedError, get, put } from "@vercel/blob"
import { unstable_cache } from "next/cache"
import { OFFER_CATALOG, type CashflowConfig, type OfferCatalog, type OfferCatalogEntry } from "@/config/offers/catalog"
import { getCatalogEntryById, type OfferStatus } from "@/config/offers/catalog"
import { getOfferConfig } from "@/config/offers"
import { PALETTE_KEYS, type PaletteKey, getPalette } from "@/config/offers/palettes"
import { repairPaletteContrast } from "@/lib/color"
import { validateOfferConfig } from "@/lib/offer-validation"
import { applyOfferCatalogPatch, findOfferBySlug, getCheckoutSummary, migrateLegacyOffer, OfferRoutingError, validateOfferSlug } from "@/lib/offer-routing"
import { normalizeIfMatchEtag, updateVersionedValue } from "@/lib/versioned-blob-update"
import type { OfferConfig } from "@/types/offer"

const BLOB_PATH = "admin/ofertas-operacionais.json"
export const OPERATIONAL_CATALOG_CACHE_TAG = "operational-offers"

export interface OfferOverride {
  offer?: OfferConfig
  cashflow?: CashflowConfig | null
  favicon?: string | null
  slug?: string
  status?: OfferStatus
}

interface StoredOverrides {
  version: 3
  offers: Record<string, Required<Pick<OfferOverride, "slug" | "status">> & OfferOverride>
}

const STABLE_IDS = Object.values(OFFER_CATALOG.offers).map((entry) => entry.id)

function isCashflow(value: unknown): value is CashflowConfig {
  return Boolean(value) && typeof value === "object" &&
    typeof (value as CashflowConfig).workspaceId === "string" &&
    typeof (value as CashflowConfig).offerId === "string"
}

function isWebpReference(value: unknown): value is string {
  if (typeof value !== "string") return false
  if (value.startsWith("/images/") && value.endsWith(".webp")) return true
  try {
    const url = new URL(value)
    return url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com")
  } catch {
    return false
  }
}

function normalizeOffer(offerId: string, candidate: unknown): OfferConfig | undefined {
  const fallback = getOfferConfig(offerId)
  if (!fallback || !candidate || typeof candidate !== "object") return undefined
  const checked = validateOfferConfig(candidate)
  if (!checked.offer) return undefined

  const offer = checked.offer
  const assetPaths = [
    offer.hero.image,
    offer.socialProof.testimonials.map((image) => image.src),
    offer.kitCards.images.map((image) => image.src),
    offer.benefits.image ? [offer.benefits.image] : [],
    offer.deliverables.image,
    offer.bonuses.flatMap((bonus) => [bonus.front, bonus.back]),
    offer.pricing.plans.map((plan) => plan.image),
    offer.guarantee.icon ? [offer.guarantee.icon] : [],
  ].flat(2)
  if (assetPaths.some((src) => !isWebpReference(src))) return undefined
  return offer
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

/**
 * Validate current v3 stable-ID records and migrate the prior v2 records,
 * which were keyed by the mutable public slug.
 */
export function validateOverrides(value: unknown): Record<string, OfferOverride> {
  if (!isRecord(value) || !isRecord(value.offers)) throw new Error("Formato de catálogo operacional inválido.")
  if (value.version !== undefined && value.version !== 1 && value.version !== 2 && value.version !== 3) {
    throw new Error("Versão de catálogo operacional incompatível.")
  }
  const version = value.version === 3 ? 3 : 2
  const rawOffers = value.offers
  const normalized: Record<string, OfferOverride> = {}
  const claimed = { ...OFFER_CATALOG.offers }

  for (const [key, raw] of Object.entries(rawOffers)) {
    const id = version === 3 ? key : getCatalogEntryById(key)?.id ?? key
    const base = getCatalogEntryById(id)
    if (!base || !isRecord(raw)) continue

    if (version === 3 && (typeof raw.slug !== "string" || raw.status === undefined)) {
      throw new Error(`Identidade operacional incompleta para ${id}.`)
    }
    const rawSlug = version === 3 && typeof raw.slug === "string" ? raw.slug : base.slug
    const slugError = validateOfferSlug(rawSlug, id, claimed, STABLE_IDS)
    const status = version === 3 && raw.status !== undefined ? raw.status : base.status
    if (slugError || (status !== "active" && status !== "inactive" && status !== "draft")) {
      throw new Error(slugError ?? `Status operacional inválido para ${id}.`)
    }

    const identity = applyOfferCatalogPatch(claimed, base.slug, { slug: rawSlug, status }, STABLE_IDS)
    for (const existingId of Object.keys(claimed)) delete claimed[existingId]
    Object.assign(claimed, identity.entries)

    const item = raw as Record<string, unknown>
    const override: OfferOverride = { slug: rawSlug, status }
    if (Object.hasOwn(item, "offer")) {
      const fallback = getOfferConfig(id)
      const candidateOffer = version === 2
        ? migrateLegacyOffer(item.offer, fallback, (palette) => repairPaletteContrast(palette as OfferConfig["palette"]), 2)
        : item.offer
      const offer = normalizeOffer(id, candidateOffer)
      if (!offer) throw new Error(`Configuração operacional inválida para ${id}.`)
      override.offer = offer
    } else if (typeof item.paletteKey === "string" && PALETTE_KEYS.includes(item.paletteKey as PaletteKey)) {
      // Migração do primeiro formato, que salvava somente o nome de um preset.
      const initial = getOfferConfig(id)
      if (initial) override.offer = migrateLegacyOffer(
        { ...initial, palette: getPalette(item.paletteKey as PaletteKey) },
        initial,
        (palette) => repairPaletteContrast(palette as OfferConfig["palette"]),
        1,
      ) as OfferConfig
    }
    if (Object.hasOwn(item, "cashflow")) {
      if (item.cashflow !== null && !isCashflow(item.cashflow)) throw new Error(`Cashflow operacional inválido para ${id}.`)
      override.cashflow = item.cashflow as CashflowConfig | null
    }
    if (Object.hasOwn(item, "favicon")) {
      if (item.favicon !== null && !isWebpReference(item.favicon)) throw new Error(`Favicon operacional inválido para ${id}.`)
      override.favicon = item.favicon as string | null
    }
    normalized[id] = override
  }

  return normalized
}

async function readOverrides(): Promise<{ overrides: Record<string, OfferOverride>; etag?: string }> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { overrides: {} }

  const blob = await get(BLOB_PATH, { access: "private", useCache: false })
  if (!blob) return { overrides: {} }
  try {
    const payload = await new Response(blob.stream).json()
    return { overrides: validateOverrides(payload), etag: normalizeIfMatchEtag(blob.blob.etag) }
  } catch (error) {
    // A malformed existing operational catalog must never restore older public routes/statuses.
    throw new Error("O catálogo operacional da oferta não pôde ser lido.", { cause: error })
  }
}

const getCachedOverrides = unstable_cache(
  async () => (await readOverrides()).overrides,
  ["operational-offers-v3"],
  { revalidate: 3600, tags: [OPERATIONAL_CATALOG_CACHE_TAG] },
)

function mergeOverrides(overrides: Record<string, OfferOverride>): OfferCatalog {
  const offers = Object.fromEntries(Object.values(OFFER_CATALOG.offers).map((base) => {
    const override = overrides[base.id]
    const entry = {
      ...base,
      slug: override?.slug ?? base.slug,
      status: override?.status ?? base.status,
      ...(override && Object.hasOwn(override, "cashflow") ? { cashflow: override.cashflow } : {}),
      ...(override && Object.hasOwn(override, "favicon") ? { favicon: override.favicon } : {}),
    } satisfies OfferCatalogEntry
    return [entry.slug, entry]
  }))
  const homeBase = getCatalogEntryById(OFFER_CATALOG.homepageOffer)
  const homepageOffer = homeBase ? (overrides[homeBase.id]?.slug ?? homeBase.slug) : OFFER_CATALOG.homepageOffer
  return { ...OFFER_CATALOG, homepageOffer, offers }
}

export async function getOperationalCatalog(): Promise<OfferCatalog> {
  return mergeOverrides(await getCachedOverrides())
}

export async function getOperationalOffer(slug: string): Promise<OfferConfig | undefined> {
  const catalog = await getOperationalCatalog()
  const entry = findOfferBySlug(catalog.offers, slug)
  if (!entry) return undefined
  return (await getCachedOverrides())[entry.id]?.offer ?? getOfferConfig(entry.id)
}

export async function getOperationalOfferRecord(slug: string): Promise<{
  entry: OfferCatalogEntry
  offer: OfferConfig
} | undefined> {
  const catalog = await getOperationalCatalog()
  const entry = findOfferBySlug(catalog.offers, slug)
  if (!entry) return undefined
  const offer = (await getCachedOverrides())[entry.id]?.offer ?? getOfferConfig(entry.id)
  return offer ? { entry, offer } : undefined
}

export async function updateOperationalOffer(
  slug: string,
  changes: OfferOverride,
): Promise<OfferCatalogEntry | undefined> {
  if (changes.cashflow !== undefined && changes.cashflow !== null && !isCashflow(changes.cashflow)) throw new Error("Configuração de tracking inválida.")
  if (changes.favicon !== undefined && changes.favicon !== null && !isWebpReference(changes.favicon)) throw new Error("Favicon inválido.")

  const cachedCatalog = await getOperationalCatalog()
  const cachedEntry = findOfferBySlug(cachedCatalog.offers, slug)
  if (!cachedEntry) return undefined
  if (changes.slug !== undefined) {
    const slugError = validateOfferSlug(changes.slug, cachedEntry.id, cachedCatalog.offers, STABLE_IDS)
    if (slugError) throw new OfferRoutingError(slugError, 400)
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("O armazenamento operacional não está configurado.")

  return updateVersionedValue({
    read: async () => {
      const { overrides, etag } = await readOverrides()
      return { value: overrides, etag }
    },
    update: (overrides) => {
      const catalog = mergeOverrides(overrides)
      const current = Object.values(catalog.offers).find((entry) => entry.id === cachedEntry.id)
      if (!current) throw new Error("Oferta não encontrada.")
      if (changes.offer && !normalizeOffer(current.id, changes.offer)) throw new Error("A configuração da oferta é inválida.")
      if (changes.slug !== undefined) {
        const slugError = validateOfferSlug(changes.slug, current.id, catalog.offers, STABLE_IDS)
        if (slugError) throw new OfferRoutingError(slugError, 400)
      }

      const currentOffer = overrides[current.id]?.offer ?? getOfferConfig(current.id)
      const nextOffer = changes.offer ?? currentOffer
      if (!nextOffer) throw new Error("Configuração da oferta não encontrada.")
      const nextStatus = changes.status ?? current.status
      if (nextStatus === "active" && (changes.status === "active" || changes.offer !== undefined || changes.slug !== undefined) && !getCheckoutSummary(nextOffer).valid) {
        throw new OfferRoutingError("Para ativar, configure um checkout válido para cada plano (um ou dois planos).", 422)
      }

      const identity = applyOfferCatalogPatch(catalog.offers, current.slug, {
        ...(changes.slug !== undefined ? { slug: changes.slug } : {}),
        ...(changes.status !== undefined ? { status: changes.status } : {}),
      }, STABLE_IDS)
      const nextOfferOverride: StoredOverrides["offers"][string] = {
        ...overrides[current.id],
        ...changes,
        slug: identity.entry.slug,
        status: identity.entry.status,
      }
      const storedOffers = Object.fromEntries(Object.entries(overrides).flatMap(([id, override]) => {
        const base = getCatalogEntryById(id)
        if (!base) return []
        return [[id, {
          ...override,
          slug: override.slug ?? base.slug,
          status: override.status ?? base.status,
        }]]
      })) as StoredOverrides["offers"]
      const next: StoredOverrides = {
        version: 3,
        offers: { ...storedOffers, [current.id]: nextOfferOverride },
      }

      return {
        value: next,
        result: {
          ...current,
          slug: identity.entry.slug,
          status: identity.entry.status,
          ...(Object.hasOwn(changes, "cashflow") ? { cashflow: changes.cashflow } : {}),
          ...(Object.hasOwn(changes, "favicon") ? { favicon: changes.favicon } : {}),
        },
      }
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
