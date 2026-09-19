import "server-only"
import { get, put } from "@vercel/blob"
import { unstable_cache } from "next/cache"
import {
  OFFER_CATALOG,
  isKnownPalette,
  isKnownStatus,
  type OfferCatalog,
  type OfferCatalogEntry,
  type OfferStatus,
} from "@/config/offers/catalog"
import type { PaletteKey } from "@/config/offers/palettes"

const BLOB_PATH = "admin/ofertas-operacionais.json"
export const OPERATIONAL_CATALOG_CACHE_TAG = "operational-offers"

type OfferOverride = Pick<OfferCatalogEntry, "status" | "paletteKey">

interface StoredOverrides {
  version: 1
  offers: Record<string, OfferOverride>
}

function validateOverrides(value: unknown): Record<string, OfferOverride> {
  if (!value || typeof value !== "object" || !("offers" in value)) return {}
  const offers = (value as { offers?: unknown }).offers
  if (!offers || typeof offers !== "object") return {}

  return Object.fromEntries(Object.entries(offers).flatMap(([slug, override]) => {
    if (!OFFER_CATALOG.offers[slug] || !override || typeof override !== "object") return []
    const item = override as { status?: unknown; paletteKey?: unknown }
    if (!isKnownStatus(item.status) || !isKnownPalette(item.paletteKey)) return []
    return [[slug, { status: item.status, paletteKey: item.paletteKey }]]
  }))
}

async function readOverrides(): Promise<{ overrides: Record<string, OfferOverride>; etag?: string }> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { overrides: {} }

  const blob = await get(BLOB_PATH, { access: "private", useCache: false })
  if (!blob) return { overrides: {} }

  try {
    const payload = await new Response(blob.stream).json()
    return { overrides: validateOverrides(payload), etag: blob.blob.etag }
  } catch {
    return { overrides: {}, etag: blob.blob.etag }
  }
}

const getCachedOverrides = unstable_cache(
  async () => (await readOverrides()).overrides,
  ["operational-offers"],
  { revalidate: 3600, tags: [OPERATIONAL_CATALOG_CACHE_TAG] },
)

function mergeOverrides(overrides: Record<string, OfferOverride>): OfferCatalog {
  return {
    ...OFFER_CATALOG,
    offers: Object.fromEntries(Object.entries(OFFER_CATALOG.offers).map(([slug, entry]) => [
      slug,
      { ...entry, ...overrides[slug] },
    ])),
  }
}

export async function getOperationalCatalog(): Promise<OfferCatalog> {
  return mergeOverrides(await getCachedOverrides())
}

export async function updateOperationalOffer(
  slug: string,
  changes: { status?: OfferStatus; paletteKey?: PaletteKey },
): Promise<OfferCatalogEntry | undefined> {
  if (!OFFER_CATALOG.offers[slug]) return undefined
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("O armazenamento administrativo não está configurado.")

  const { overrides, etag } = await readOverrides()
  const current = OFFER_CATALOG.offers[slug]
  const nextOverride: OfferOverride = {
    status: changes.status ?? overrides[slug]?.status ?? current.status,
    paletteKey: changes.paletteKey ?? overrides[slug]?.paletteKey ?? current.paletteKey,
  }
  const next: StoredOverrides = { version: 1, offers: { ...overrides, [slug]: nextOverride } }
  await put(BLOB_PATH, JSON.stringify(next), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
    ...(etag ? { ifMatch: etag } : {}),
  })

  return { ...current, ...nextOverride }
}
