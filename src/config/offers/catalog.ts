import catalogData from "./catalog.json"
import { getPalette, PALETTE_KEYS, type PaletteKey } from "./palettes"
import type { OfferConfig, OfferPalette } from "@/types/offer"

export const OFFER_STATUSES = ["draft", "active", "archived"] as const
export type OfferStatus = (typeof OFFER_STATUSES)[number]

export interface CashflowConfig {
  workspaceId: string
  offerId: string
}

export interface OfferCatalogEntry {
  label: string
  status: OfferStatus
  paletteKey: PaletteKey | null
  className: string
  favicon: string | null
  cashflow: CashflowConfig | null
}

export interface OfferCatalog {
  homepageOffer: string
  offers: Record<string, OfferCatalogEntry>
}

export const OFFER_CATALOG = catalogData as OfferCatalog

export function getCatalogEntry(slug: string): OfferCatalogEntry | undefined {
  return OFFER_CATALOG.offers[slug]
}

export function isKnownStatus(value: unknown): value is OfferStatus {
  return typeof value === "string" && OFFER_STATUSES.includes(value as OfferStatus)
}

export function isKnownPalette(value: unknown): value is PaletteKey {
  return typeof value === "string" && PALETTE_KEYS.includes(value as PaletteKey)
}

export function isOfferPublic(entry: OfferCatalogEntry, environment = process.env.NODE_ENV): boolean {
  return environment !== "production" || entry.status === "active"
}

export function resolveOfferPalette(entry: OfferCatalogEntry, fallback: OfferPalette): OfferPalette {
  return entry.paletteKey ? getPalette(entry.paletteKey) : fallback
}

export function cashflowScriptUrl(config: CashflowConfig): string {
  return `https://cashflow.mentoriaprocesso.com/t/p.js?w=${encodeURIComponent(config.workspaceId)}&o=${encodeURIComponent(config.offerId)}`
}

export function getCheckoutSummary(offer: OfferConfig): { count: number; valid: boolean } {
  const links = offer.pricing.plans.map((plan) => plan.ctaHref).filter(Boolean) as string[]
  const valid = links.length > 0 && links.every((link) => /^https:\/\/(pay\.hotmart\.com|pay\.cakto\.com\.br)\//.test(link))
  return { count: links.length, valid }
}
