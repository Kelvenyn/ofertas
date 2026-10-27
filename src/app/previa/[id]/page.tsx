import type { Metadata } from "next"
import { notFound } from "next/navigation"
import OfferPage from "@/components/OfferPage"
import { OfferRouteLayout } from "@/components/OfferRouteLayout"
import { fetchHubPage, hubPagesUrl, renderableOffer } from "@/lib/hub-pages"
import { isValidHubPreviewToken } from "@/lib/hub-preview-token"

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: "Prévia", robots: { index: false, follow: false } }

/** Live preview inside the hub editor: any status, signed by the hub, updated by postMessage from the hub only. */
export default async function HubPreviewPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ t?: string }> }) {
  const [{ id }, { t }] = await Promise.all([params, searchParams])
  const hub = hubPagesUrl()
  if (!hub || !/^[0-9a-f-]{36}$/i.test(id) || !isValidHubPreviewToken(id, t)) notFound()
  const page = await fetchHubPage(id)
  // Copy over the limit still previews, so the editor can show and fix it.
  const offer = page ? renderableOffer(page.offer) : undefined
  if (!page || !offer) notFound()
  return (
    <OfferRouteLayout slug={page.slug} offer={offer} hubPreviewOrigin={hub}>
      <OfferPage />
    </OfferRouteLayout>
  )
}
