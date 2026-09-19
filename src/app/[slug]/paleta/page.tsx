import { notFound, redirect } from "next/navigation"
import OfferPage from "@/components/OfferPage"
import { OfferRouteLayout } from "@/components/OfferRouteLayout"
import { PaletteEditor } from "@/components/dev/PaletteEditor"
import { getOfferConfig } from "@/config/offers"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getOperationalCatalog } from "@/lib/operational-catalog"

export default async function PalettePreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!(await isAdminAuthenticated())) redirect(`/admin/login?next=/${encodeURIComponent(slug)}/paleta`)
  const entry = (await getOperationalCatalog()).offers[slug]
  const offer = getOfferConfig(slug)
  if (!entry || !offer) notFound()

  return (
    <OfferRouteLayout slug={slug} offer={offer}>
      <OfferPage />
      <PaletteEditor slug={slug} initialPaletteKey={entry.paletteKey} />
    </OfferRouteLayout>
  )
}
