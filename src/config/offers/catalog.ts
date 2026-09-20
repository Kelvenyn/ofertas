import catalogData from "./catalog.json"
import type { OfferConfig } from "@/types/offer"
import { getCheckoutSummary as summarizeCheckouts } from "@/lib/offer-routing"

export interface CashflowConfig {
  workspaceId: string
  offerId: string
}

export type OfferStatus = "active" | "inactive" | "draft"

export interface OfferCatalogEntry {
  /** Immutable identity used for Blob storage and the original offer configuration. */
  id: string
  /** The only public route currently resolving to this offer. */
  slug: string
  label: string
  status: OfferStatus
  favicon: string | null
  cashflow: CashflowConfig | null
  [key: string]: unknown
}

export interface OfferCatalog {
  homepageOffer: string
  offers: Record<string, OfferCatalogEntry>
}

type StaticOfferCatalog = {
  homepageOffer: string
  offers: Record<string, { label: string; favicon: string | null; cashflow: CashflowConfig | null; status?: OfferStatus }>
}

const staticCatalog = catalogData as StaticOfferCatalog

// The original catalog keys become stable IDs. Operational slugs may change in Blob.
export const OFFER_CATALOG: OfferCatalog = {
  homepageOffer: staticCatalog.homepageOffer,
  offers: Object.fromEntries(Object.entries(staticCatalog.offers).map(([id, entry]) => [id, {
    ...entry,
    id,
    slug: id,
    status: entry.status ?? "active",
  } satisfies OfferCatalogEntry])),
}

export function getCatalogEntry(slug: string): OfferCatalogEntry | undefined {
  return OFFER_CATALOG.offers[slug]
}

export function getCatalogEntryById(id: string): OfferCatalogEntry | undefined {
  return Object.values(OFFER_CATALOG.offers).find((entry) => entry.id === id)
}

export function cashflowScriptUrl(config: CashflowConfig): string {
  return `https://cashflow.mentoriaprocesso.com/t/p.js?w=${encodeURIComponent(config.workspaceId)}&o=${encodeURIComponent(config.offerId)}`
}

export function getCheckoutSummary(offer: OfferConfig): { count: number; valid: boolean } {
  return summarizeCheckouts(offer)
}
