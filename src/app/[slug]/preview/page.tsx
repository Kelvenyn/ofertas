import { notFound, redirect } from "next/navigation"
import OfferPage from "@/components/OfferPage"
import { OfferRouteLayout } from "@/components/OfferRouteLayout"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getOperationalOfferRecord } from "@/lib/operational-catalog"

export const dynamic = "force-dynamic"

export default async function OfferPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!(await isAdminAuthenticated())) redirect(`/painel/login?next=/${encodeURIComponent(slug)}/preview`)
  const record = await getOperationalOfferRecord(slug)
  if (!record) notFound()

  return (
    <OfferRouteLayout slug={record.entry.slug} offer={record.offer} previewMode>
      <OfferPage />
    </OfferRouteLayout>
  )
}
