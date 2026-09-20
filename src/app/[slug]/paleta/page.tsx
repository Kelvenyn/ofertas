import { notFound, redirect } from "next/navigation"
import OfferPage from "@/components/OfferPage"
import { OfferRouteLayout } from "@/components/OfferRouteLayout"
import { PaletteEditor } from "@/components/dev/PaletteEditor"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getOperationalOfferRecord } from "@/lib/operational-catalog"

export default async function PalettePreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!(await isAdminAuthenticated())) redirect(`/painel/login?next=/${encodeURIComponent(slug)}/paleta`)
  const record = await getOperationalOfferRecord(slug)
  if (!record) notFound()

  return (
    <OfferRouteLayout slug={record.entry.slug} offer={record.offer} previewMode>
      <OfferPage />
      <PaletteEditor slug={record.entry.slug} initialOffer={record.offer} />
    </OfferRouteLayout>
  )
}
