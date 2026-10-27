import { OFFER_CATALOG, getCatalogEntryById, type OfferCatalog, type OfferCatalogEntry, type CashflowConfig } from "../config/offers/catalog"
import { getOfferConfig } from "../config/offers"
import { PALETTE_KEYS, type PaletteKey, getPalette } from "../config/offers/palettes"
import { repairPaletteContrast } from "./color"
import { validateOfferConfig } from "./offer-validation"
import { applyOfferCatalogPatch, findOfferBySlug, migrateLegacyOffer, OfferRoutingError, validateOfferSlug } from "./offer-routing"
import type { OfferConfig } from "../types/offer"

export interface OfferOverride {
  offer?: OfferConfig
  cashflow?: CashflowConfig | null
  favicon?: string | null
  label?: string
  slug?: string
  status?: "active" | "inactive" | "draft"
  templateId?: string
}

const STATIC_IDS = Object.values(OFFER_CATALOG.offers).map((entry) => entry.id)
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function isCashflow(value: unknown): value is CashflowConfig {
  return Boolean(value) && typeof value === "object" &&
    typeof (value as CashflowConfig).workspaceId === "string" &&
    typeof (value as CashflowConfig).offerId === "string"
}

export function isWebpReference(value: unknown): value is string {
  if (typeof value !== "string") return false
  if (value.startsWith("/images/") && value.endsWith(".webp")) return true
  try {
    const url = new URL(value)
    return url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com") && url.pathname.endsWith(".webp")
  } catch {
    return false
  }
}

export function normalizeStoredOffer(candidate: unknown, legacyFallback?: OfferConfig, legacyVersion?: 1 | 2): OfferConfig | undefined {
  if (!candidate || typeof candidate !== "object") return undefined
  let input: unknown = candidate
  if (legacyFallback && legacyVersion) {
    input = migrateLegacyOffer(
      candidate,
      legacyFallback,
      (palette) => repairPaletteContrast(palette as OfferConfig["palette"]),
      legacyVersion,
    )
  }
  const checked = validateOfferConfig(input)
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

export function assertValidOperationalOffer(candidate: OfferConfig): OfferConfig {
  const offer = normalizeStoredOffer(candidate)
  if (!offer) throw new Error("A configuração da oferta é inválida.")
  return offer
}

export function validateOperationalOverrides(value: unknown): Record<string, OfferOverride> {
  if (!isRecord(value) || !isRecord(value.offers)) throw new Error("Formato de catálogo operacional inválido.")
  if (value.version !== undefined && ![1, 2, 3, 4].includes(value.version as number)) {
    throw new Error("Versão de catálogo operacional incompatível.")
  }
  const version = value.version === 4 ? 4 : value.version === 3 ? 3 : 2
  const rawOffers = value.offers
  const normalized: Record<string, OfferOverride> = {}
  const claimed: Record<string, OfferCatalogEntry> = { ...OFFER_CATALOG.offers }

  for (const [key, raw] of Object.entries(rawOffers)) {
    if (!isRecord(raw)) {
      if (version === 4) throw new Error(`Registro operacional inválido para ${key}.`)
      continue
    }
    const id = version >= 3 ? key : getCatalogEntryById(key)?.id ?? key
    const base = getCatalogEntryById(id)
    const custom = version === 4 && !base
    if (!base && !custom) continue

    if (version >= 3 && (typeof raw.slug !== "string" || raw.status === undefined)) {
      throw new Error(`Identidade operacional incompleta para ${id}.`)
    }
    const rawSlug = version >= 3 && typeof raw.slug === "string" ? raw.slug : base!.slug
    const status = version >= 3 && raw.status !== undefined ? raw.status : base!.status
    const slugError = validateOfferSlug(rawSlug, id, claimed, STATIC_IDS)
    if (slugError || (status !== "active" && status !== "inactive" && status !== "draft")) {
      throw new Error(slugError ?? `Status operacional inválido para ${id}.`)
    }

    if (base) {
      const identity = applyOfferCatalogPatch(claimed, base.slug, { slug: rawSlug, status }, STATIC_IDS)
      for (const existingId of Object.keys(claimed)) delete claimed[existingId]
      Object.assign(claimed, identity.entries)
    } else {
      claimed[id] = {
        id,
        slug: rawSlug,
        label: typeof raw.label === "string" ? raw.label.trim() : "",
        status,
        favicon: typeof raw.favicon === "string" ? raw.favicon : null,
        cashflow: isCashflow(raw.cashflow) ? raw.cashflow : null,
      }
    }

    const override: OfferOverride = { slug: rawSlug, status }
    if (custom) {
      if (!UUID_PATTERN.test(id) || typeof raw.label !== "string" || raw.label.trim().length < 1 || raw.label.trim().length > 80) {
        throw new Error(`Identidade customizada inválida para ${id}.`)
      }
      if (typeof raw.templateId !== "string" || !getCatalogEntryById(raw.templateId)) {
        throw new Error(`Modelo operacional inválido para ${id}.`)
      }
      const offer = normalizeStoredOffer(raw.offer)
      if (!offer) throw new Error(`Configuração operacional inválida para ${id}.`)
      override.label = raw.label.trim()
      override.templateId = raw.templateId
      override.offer = offer
      if (Object.hasOwn(raw, "cashflow")) {
        if (raw.cashflow !== null && !isCashflow(raw.cashflow)) throw new Error(`Cashflow operacional inválido para ${id}.`)
        override.cashflow = raw.cashflow as CashflowConfig | null
      } else override.cashflow = null
      if (Object.hasOwn(raw, "favicon")) {
        if (raw.favicon !== null && !isWebpReference(raw.favicon)) throw new Error(`Favicon operacional inválido para ${id}.`)
        override.favicon = raw.favicon as string | null
      } else override.favicon = null
      normalized[id] = override
      continue
    }

    const item = raw as Record<string, unknown>
    if (Object.hasOwn(item, "offer")) {
      const fallback = getOfferConfig(id)
      const offer = version === 2
        ? normalizeStoredOffer(item.offer, fallback, 2)
        : normalizeStoredOffer(item.offer)
      if (!offer) throw new Error(`Configuração operacional inválida para ${id}.`)
      override.offer = offer
    } else if (typeof item.paletteKey === "string" && PALETTE_KEYS.includes(item.paletteKey as PaletteKey)) {
      const initial = getOfferConfig(id)
      if (initial) override.offer = normalizeStoredOffer(
        { ...initial, palette: getPalette(item.paletteKey as PaletteKey) },
        initial,
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

export function mergeOperationalCatalog(overrides: Record<string, OfferOverride>): OfferCatalog {
  const offers: Record<string, OfferCatalogEntry> = Object.fromEntries(Object.values(OFFER_CATALOG.offers).map((base) => {
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

  for (const [id, override] of Object.entries(overrides)) {
    if (getCatalogEntryById(id) || !override.templateId || !override.offer || !override.slug || !override.status || !override.label) continue
    const entry: OfferCatalogEntry = {
      id,
      slug: override.slug,
      label: override.label,
      status: override.status,
      favicon: override.favicon ?? null,
      cashflow: override.cashflow ?? null,
      templateId: override.templateId,
    }
    offers[entry.slug] = entry
  }

  const homeBase = getCatalogEntryById(OFFER_CATALOG.homepageOffer)
  const homepageOffer = homeBase ? (overrides[homeBase.id]?.slug ?? homeBase.slug) : OFFER_CATALOG.homepageOffer
  return { ...OFFER_CATALOG, homepageOffer, offers }
}

export function serializeOperationalOverridesV4(overrides: Record<string, OfferOverride>) {
  const offers = Object.fromEntries(Object.entries(overrides).map(([id, override]) => {
    const base = getCatalogEntryById(id)
    const slug = override.slug ?? base?.slug
    const status = override.status ?? base?.status
    if (!slug || !status) throw new Error(`Identidade operacional incompleta para ${id}.`)
    return [id, { ...override, slug, status }]
  }))
  return { version: 4 as const, offers }
}

export function resolveOperationalOfferRecord(
  slug: string,
  catalog: OfferCatalog,
  overrides: Record<string, OfferOverride>,
): { entry: OfferCatalogEntry; offer: OfferConfig } | undefined {
  const entry = findOfferBySlug(catalog.offers, slug)
  if (!entry) return undefined
  const offer = overrides[entry.id]?.offer ?? getOfferConfig(entry.id)
  return offer ? { entry, offer } : undefined
}

export function getOfferTemplateConfig(entry: Pick<OfferCatalogEntry, "id" | "templateId">): OfferConfig | undefined {
  return getOfferConfig(entry.templateId ?? entry.id)
}

export function createDraftOfferRecord({ id, label, slug }: { id: string; label: string; slug: string }) {
  const templateId = "psicopedagogia"
  const templateEntry = getCatalogEntryById(templateId)
  const templateOffer = getOfferConfig(templateId)
  if (!templateEntry || !templateOffer) throw new Error("O modelo Psicopedagogia não está disponível.")
  const offer = structuredClone(templateOffer)
  offer.pricing.plans = offer.pricing.plans.map((plan) => ({ ...plan, ctaHref: "", ctaDisabled: true }))
  const entry: OfferCatalogEntry = {
    ...templateEntry,
    id,
    slug,
    label: label.trim(),
    status: "draft",
    favicon: null,
    cashflow: null,
    templateId,
  }
  return { entry, override: { ...entry, offer } as OfferOverride & { offer: OfferConfig } }
}

export function insertDraftOffer(
  overrides: Record<string, OfferOverride>,
  input: { id: string; label: string; slug: string },
): { overrides: Record<string, OfferOverride>; entry: OfferCatalogEntry } {
  if (Object.hasOwn(overrides, input.id)) throw new Error("Não foi possível gerar uma identidade exclusiva para a oferta.")
  const catalog = mergeOperationalCatalog(overrides)
  const slugError = validateNewOfferSlug(input.slug, input.id, catalog.offers, STATIC_IDS)
  if (slugError) throw new OfferRoutingError(slugError, 400)
  const { entry, override } = createDraftOfferRecord(input)
  return { overrides: { ...overrides, [input.id]: override }, entry }
}

export function validateNewOfferSlug(
  slug: string,
  id: string,
  entries: Record<string, { id: string; slug: string }>,
  originalIds: Iterable<string> = STATIC_IDS,
): string | undefined {
  return validateOfferSlug(slug, id, entries, originalIds)
}

export function collectImageReferences(value: unknown): string[] {
  if (typeof value === "string") return isWebpReference(value) ? [value] : []
  if (Array.isArray(value)) return value.flatMap(collectImageReferences)
  if (value && typeof value === "object") return Object.values(value).flatMap(collectImageReferences)
  return []
}

export function countInheritedImageReferences(
  offer: OfferConfig,
  favicon: string | null | undefined,
  templateOffer: OfferConfig,
  templateFavicon: string | null | undefined,
): number {
  const inherited = new Set([...collectImageReferences(templateOffer), ...collectImageReferences(templateFavicon)])
  return [...collectImageReferences(offer), ...collectImageReferences(favicon)].filter((reference) => inherited.has(reference)).length
}

export function validateTemplateOfferActivation(
  offer: OfferConfig,
  favicon: string | null | undefined,
  templateOffer: OfferConfig,
  templateFavicon: string | null | undefined,
  checkoutValid: boolean,
): string | undefined {
  if (!checkoutValid) return "Para ativar, configure um link HTTPS válido para cada plano (um ou dois planos)."
  const inheritedCount = countInheritedImageReferences(offer, favicon, templateOffer, templateFavicon)
  if (inheritedCount > 0) return `Substitua as ${inheritedCount} imagens herdadas do modelo antes de ativar a oferta.`
  return undefined
}


