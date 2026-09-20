import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { OfferProvider } from "@/context/offer-context"
import { cashflowScriptUrl } from "@/config/offers/catalog"
import { paletteCssVariables } from "@/config/offers/palettes"
import { getOperationalCatalog, getOperationalOffer } from "@/lib/operational-catalog"
import { getGlobalSiteSettings, globalSiteSettingsStyle } from "@/lib/global-site-settings"
import type { OfferConfig } from "@/types/offer"

export async function createOfferMetadata(slug: string, offer: OfferConfig): Promise<Metadata> {
  const entry = (await getOperationalCatalog()).offers[slug]
  if (!entry) return {}

  return {
    title: offer.meta.title,
    description: offer.meta.description,
    icons: { icon: entry.favicon ?? "/favicon.webp" },
    openGraph: {
      title: offer.meta.title,
      description: offer.meta.description,
      type: "website",
      locale: "pt_BR",
      siteName: offer.meta.title,
    },
  }
}

export async function OfferRouteLayout({ slug, offer, children, previewMode = false }: { slug: string; offer: OfferConfig; children: React.ReactNode; previewMode?: boolean }) {
  const [catalog, operationalOffer, globalSettings] = await Promise.all([
    getOperationalCatalog(),
    getOperationalOffer(slug),
    getGlobalSiteSettings(),
  ])
  const entry = catalog.offers[slug]
  if (!entry || !operationalOffer) notFound()
  if (entry.status !== "active" && !previewMode) notFound()

  const effectiveOffer = operationalOffer ?? offer
  const style = { ...paletteCssVariables(effectiveOffer.palette), ...globalSiteSettingsStyle(globalSettings) }

  return (
    <>
      {entry.cashflow && !previewMode && (
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
      <div id="offer-root" style={style}>
        <OfferProvider offer={effectiveOffer} previewMode={previewMode}>{children}</OfferProvider>
      </div>
    </>
  )
}
