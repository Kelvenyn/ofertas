import type { Metadata } from "next"
import { notFound } from "next/navigation"
import OfferPage from "@/components/OfferPage"
import { createOfferMetadata, OfferRouteLayout } from "@/components/OfferRouteLayout"
import { getOperationalOfferRecord } from "@/lib/operational-catalog"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const record = await getOperationalOfferRecord(slug)
  if (!record || record.entry.status !== "active") return { robots: { index: false, follow: false } }
  return createOfferMetadata(record.entry.slug, record.offer)
}

export default async function DynamicOfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const record = await getOperationalOfferRecord(slug)
  if (!record || record.entry.status !== "active") notFound()

  return (
    <OfferRouteLayout slug={record.entry.slug} offer={record.offer}>
      <OfferPage />
    </OfferRouteLayout>
  )
}
