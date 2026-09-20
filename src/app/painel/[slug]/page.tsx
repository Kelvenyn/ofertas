import { notFound, redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getOperationalCatalog, getOperationalOffer } from "@/lib/operational-catalog"
import { OfferEditor } from "./OfferEditor"

export const dynamic = "force-dynamic"

export default async function EditOfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!(await isAdminAuthenticated())) redirect(`/painel/login?next=/painel/${encodeURIComponent(slug)}`)
  const [catalog, offer] = await Promise.all([getOperationalCatalog(), getOperationalOffer(slug)])
  const entry = catalog.offers[slug]
  if (!entry || !offer) notFound()
  return <OfferEditor slug={entry.slug ?? slug} label={entry.label} initialOffer={offer} initialCashflow={entry.cashflow} initialFavicon={entry.favicon} initialStatus={entry.status} />
}
