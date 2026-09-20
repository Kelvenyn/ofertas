export type OfferLifecycleStatus = "active" | "inactive" | "draft"

export interface RoutedOfferEntry {
  id: string
  slug: string
  status: OfferLifecycleStatus
  [key: string]: unknown
}

export class OfferRoutingError extends Error {
  readonly statusCode: 400 | 404 | 409 | 422
  constructor(message: string, statusCode: 400 | 404 | 409 | 422) {
    super(message)
    this.name = "OfferRoutingError"
    this.statusCode = statusCode
  }
}

const RESERVED_SLUGS = new Set([
  "admin", "api", "error", "images", "next", "painel", "paleta", "preview",
  "politica-de-privacidade", "termos-de-uso", "_next",
])
const NON_COPY_KEYS = new Set(["palette", "paletteCandidates", "src", "front", "back", "image", "icon", "ctaHref", "privacyUrl", "termsUrl", "id"])

function normalizeLegacyCopy(value: unknown, key?: string): unknown {
  if (typeof value === "string") {
    if (key && NON_COPY_KEYS.has(key)) return value
    return value
      .replace(/e[\u2010-\u2015\u2212-]mail/giu, "email")
      .replace(/[\u2010-\u2015\u2212-]/gu, " ")
      .replace(/[ \t]{2,}/gu, " ")
  }
  if (Array.isArray(value)) return value.map((item) => normalizeLegacyCopy(item, key))
  if (!value || typeof value !== "object") return value
  return Object.fromEntries(Object.entries(value).map(([childKey, child]) => [
    childKey,
    NON_COPY_KEYS.has(childKey) ? child : normalizeLegacyCopy(child, childKey),
  ]))
}

export function isOfferStatus(value: unknown): value is OfferLifecycleStatus {
  return value === "active" || value === "inactive" || value === "draft"
}

export function findOfferBySlug<T extends { id: string; slug: string }>(
  entries: Record<string, T>,
  slug: string,
): T | undefined {
  const direct = entries[slug]
  if (direct?.slug === slug) return direct
  return Object.values(entries).find((entry) => entry.slug === slug)
}

export function getActiveFallbackSlug<T extends { slug: string; status: OfferLifecycleStatus }>(
  homepageOffer: string,
  entries: Record<string, T>,
): string | undefined {
  const preferred = entries[homepageOffer] ?? Object.values(entries).find((entry) => entry.slug === homepageOffer)
  if (preferred?.status === "active") return preferred.slug
  return Object.values(entries).find((entry) => entry.status === "active")?.slug
}

export function getOfferRevalidationPaths(previousSlug: string, nextSlug = previousSlug): string[] {
  const paths = new Set<string>(["/painel"])
  for (const slug of new Set([previousSlug, nextSlug])) {
    paths.add(`/${slug}`)
    paths.add(`/${slug}/preview`)
    paths.add(`/${slug}/paleta`)
    paths.add(`/painel/${slug}`)
  }
  return [...paths]
}

export function migrateLegacyOffer<T>(
  candidateOffer: unknown,
  fallbackOffer: T,
  repairPalette: (palette: unknown) => unknown,
  version = 2,
): unknown {
  if (version === 3 || !candidateOffer || typeof candidateOffer !== "object" || Array.isArray(candidateOffer)) return candidateOffer
  const offer = normalizeLegacyCopy(candidateOffer) as Record<string, unknown>
  const fallback = fallbackOffer as Record<string, unknown>
  const activePalette = repairPalette(offer.palette)
  const candidatePalettes = Array.isArray(offer.paletteCandidates) ? offer.paletteCandidates : []
  const fallbackPalettes = Array.isArray(fallback.paletteCandidates) ? fallback.paletteCandidates : []
  const paletteCandidates: unknown[] = []
  for (const raw of [activePalette, ...candidatePalettes, ...fallbackPalettes]) {
    let repaired: unknown
    try { repaired = repairPalette(raw) } catch { continue }
    if (!repaired || typeof repaired !== "object" || typeof (repaired as { brand?: unknown }).brand !== "string") continue
    if (paletteCandidates.some((current) => (current as { brand: string }).brand === (repaired as { brand: string }).brand)) continue
    paletteCandidates.push(repaired)
    if (paletteCandidates.length === 10) break
  }

  const fallbackBonuses = Array.isArray(fallback.bonuses) ? fallback.bonuses : []
  const bonuses = Array.isArray(offer.bonuses) ? offer.bonuses.map((raw, index) => {
    if (!raw || typeof raw !== "object" || typeof (raw as { desc?: unknown }).desc !== "string" ||
        (raw as { desc: string }).desc.length <= 120) return raw
    const fallbackDescription = (fallbackBonuses[index] as { desc?: unknown } | undefined)?.desc
    return typeof fallbackDescription === "string" ? { ...raw, desc: fallbackDescription } : raw
  }) : offer.bonuses

  return { ...offer, palette: activePalette, paletteCandidates, bonuses }
}

export function validateOfferSlug(
  slug: unknown,
  offerId: string,
  entries: Record<string, { id: string; slug: string }>,
  originalIds: Iterable<string>,
): string | undefined {
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 63) {
    return "A slug deve usar até 63 caracteres, com letras minúsculas, números e hífens entre palavras."
  }
  if (RESERVED_SLUGS.has(slug)) return `A slug “${slug}” é reservada pelo site.`

  const originalOwner = [...originalIds].find((id) => id === slug)
  if (originalOwner && originalOwner !== offerId) {
    return `A slug “${slug}” pertence à rota original de outra oferta.`
  }

  const currentOwner = Object.values(entries).find((entry) => entry.slug === slug && entry.id !== offerId)
  if (currentOwner) return `A slug “${slug}” já está sendo usada por outra oferta.`
  return undefined
}

export function applyOfferCatalogPatch<T extends RoutedOfferEntry>(
  entries: Record<string, T>,
  currentSlug: string,
  changes: { slug?: unknown; status?: unknown },
  originalIds: Iterable<string>,
): { entries: Record<string, T>; entry: T; previousSlug: string } {
  const current = findOfferBySlug(entries, currentSlug)
  if (!current) throw new OfferRoutingError("Oferta não encontrada.", 404)

  const slug = changes.slug === undefined ? current.slug : changes.slug
  const slugError = validateOfferSlug(slug, current.id, entries, originalIds)
  if (slugError) throw new OfferRoutingError(slugError, 400)

  const status = changes.status === undefined ? current.status : changes.status
  if (!isOfferStatus(status)) throw new OfferRoutingError("Status inválido. Use active, inactive ou draft.", 400)

  const entry = { ...current, slug, status } as T
  const nextEntries = Object.fromEntries(Object.values(entries)
    .filter((candidate) => candidate.id !== current.id)
    .map((candidate) => [candidate.slug, candidate])) as Record<string, T>
  nextEntries[entry.slug] = entry
  return { entries: nextEntries, entry, previousSlug: current.slug }
}

export function getCheckoutSummary(offer: unknown): { count: number; valid: boolean } {
  const rawPlans = (offer as { pricing?: { plans?: unknown } } | null)?.pricing?.plans
  const plans = Array.isArray(rawPlans) ? rawPlans : []
  const validLink = (value: unknown): value is string => {
    if (typeof value !== "string") return false
    try {
      const url = new URL(value)
      return url.protocol === "https:" &&
        (url.hostname === "pay.hotmart.com" || url.hostname === "pay.cakto.com.br") &&
        Boolean(url.pathname && url.pathname !== "/") &&
        !url.username && !url.password
    } catch {
      return false
    }
  }
  return {
    count: plans.length,
    valid: (plans.length === 1 || plans.length === 2) &&
      plans.every((plan) => validLink((plan as { ctaHref?: unknown } | null)?.ctaHref)),
  }
}
