// Relative like operational-catalog-domain.ts: the test loader would resolve the alias to catalog.json.
import { getCatalogEntryById, OFFER_CATALOG, type CashflowConfig } from "../config/offers/catalog"
import { validateOfferSlug } from "@/lib/offer-routing"
import { getOfferCopyIssues, validateOfferConfig } from "@/lib/offer-validation"
import { isWebpReference, type OfferOverride } from "@/lib/operational-catalog-domain"
import type { OfferConfig } from "@/types/offer"

/** Pure part of the hub reading (hub-pages.ts): the snapshot contract and its mapping to the catalog overrides. */
export type HubPage = {
  id: string; legacyId: string | null; templateId: string | null; slug: string; label: string
  status: "active" | "inactive" | "draft"; favicon: string | null; cashflow: CashflowConfig | null; version: number; offer: unknown
}
export type HubSnapshot = { schemaVersion: 1; generatedAt: string; settings: { typographySize: string; imageSize: string }; pages: HubPage[] }

export function isSnapshot(value: unknown): value is HubSnapshot {
  const candidate = value as HubSnapshot | null
  return Boolean(candidate) && candidate!.schemaVersion === 1 && Array.isArray(candidate!.pages) && typeof candidate!.settings === "object"
}

/** A page config the site can render: the contract and the images; copy over the limit is tolerated as it is live. */
export function renderableOffer(value: unknown): OfferConfig | undefined {
  const checked = validateOfferConfig(value)
  const copyIssues = new Set(getOfferCopyIssues(value))
  if (checked.errors.some((error) => !copyIssues.has(error))) return undefined
  const offer = value as OfferConfig
  const images = [
    offer.hero.image, offer.deliverables.image, offer.benefits.image, offer.guarantee.icon,
    ...offer.socialProof.testimonials.map((item) => item.src), ...offer.kitCards.images.map((item) => item.src),
    ...offer.bonuses.flatMap((bonus) => [bonus.front, bonus.back]), ...offer.pricing.plans.map((plan) => plan.image),
  ].filter((src): src is string => src !== undefined)
  return images.every(isWebpReference) ? offer : undefined
}

/**
 * Turns the hub snapshot into the overrides the catalog already understands (same shape as the old Blob v4).
 * A legacy page keeps its static id, so an archived or inactive one still hides its /<id> route.
 */
export function snapshotToOverrides(snapshot: HubSnapshot): Record<string, OfferOverride> {
  const overrides: Record<string, OfferOverride> = {}
  const claimed: Record<string, { id: string; slug: string }> = {}
  const pages = [...snapshot.pages].sort((left, right) => Number(Boolean(right.legacyId)) - Number(Boolean(left.legacyId)))
  for (const page of pages) {
    const isStatic = Boolean(page.legacyId && getCatalogEntryById(page.legacyId))
    const id = isStatic ? page.legacyId! : page.id
    const offer = page.status === "active" ? renderableOffer(page.offer) : undefined
    if (!isStatic && !offer) continue
    if (validateOfferSlug(page.slug, id, claimed, Object.keys(OFFER_CATALOG.offers))) continue
    claimed[id] = { id, slug: page.slug }
    const favicon = page.favicon && isWebpReference(page.favicon) ? page.favicon : null
    overrides[id] = {
      slug: page.slug,
      status: page.status === "active" && !offer ? "inactive" : page.status,
      cashflow: page.cashflow,
      favicon: isStatic ? favicon ?? getCatalogEntryById(id)!.favicon : favicon,
      ...(offer ? { offer } : {}),
      ...(isStatic ? {} : { label: page.label, templateId: page.templateId ?? "psicopedagogia" }),
    }
  }
  return overrides
}

export function snapshotSettings(snapshot: HubSnapshot): { typographySize: "P" | "M" | "G"; imageSize: "P" | "M" | "G" } {
  const size = (value: string) => value === "P" || value === "G" ? value : "M"
  return { typographySize: size(snapshot.settings.typographySize), imageSize: size(snapshot.settings.imageSize) }
}
