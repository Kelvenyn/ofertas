import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { OfferProvider } from "@/context/offer-context"
import { cashflowScriptUrl, getCatalogEntry, isOfferPublic, resolveOfferPalette } from "@/config/offers/catalog"
import { paletteCssVariables } from "@/config/offers/palettes"
import { getOperationalCatalog } from "@/lib/operational-catalog"
import type { OfferConfig } from "@/types/offer"

export function createOfferMetadata(slug: string, offer: OfferConfig): Metadata {
  const entry = getCatalogEntry(slug)
  if (!entry) return {}

  return {
    title: offer.meta.title,
    description: offer.meta.description,
    icons: { icon: entry.favicon ?? "/favicon.png" },
    openGraph: {
      title: offer.meta.title,
      description: offer.meta.description,
      type: "website",
      locale: "pt_BR",
      siteName: offer.meta.title,
    },
  }
}

export async function OfferRouteLayout({ slug, offer, children }: { slug: string; offer: OfferConfig; children: React.ReactNode }) {
  const entry = (await getOperationalCatalog()).offers[slug]
  if (!entry || !isOfferPublic(entry)) notFound()

  const palette = resolveOfferPalette(entry, offer.palette)
  const style = paletteCssVariables(palette)

  return (
    <>
      {entry.cashflow && (
        <Script
          id={`cashflow-tracker-${slug}`}
          src={cashflowScriptUrl(entry.cashflow)}
          data-offer={entry.cashflow.offerId}
          data-nowprocket
          data-no-minify="1"
          data-no-optimize="1"
          data-cfasync="false"
          async
          strategy="afterInteractive"
        />
      )}
      <div id="offer-root" className={entry.className || undefined} style={style}>
        <OfferProvider offer={offer}>{children}</OfferProvider>
      </div>
    </>
  )
}
