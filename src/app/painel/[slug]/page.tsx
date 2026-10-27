import { notFound, redirect } from "next/navigation"
import { getCatalogEntryById } from "@/config/offers/catalog"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getOperationalCatalog, getOperationalOffer } from "@/lib/operational-catalog"
import { countInheritedImageReferences, getOfferTemplateConfig } from "@/lib/operational-catalog-domain"
import { OfferEditor } from "./OfferEditor"

export const dynamic = "force-dynamic"

export default async function EditOfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!(await isAdminAuthenticated())) redirect(`/painel/login?next=/painel/${encodeURIComponent(slug)}`)
  const [catalog, offer] = await Promise.all([getOperationalCatalog(), getOperationalOffer(slug)])
  const entry = catalog.offers[slug]
  if (!entry || !offer) notFound()
  const templateConfig = getOfferTemplateConfig(entry)
  const templateFavicon = entry.templateId ? getCatalogEntryById(entry.templateId)?.favicon : null
  const inheritedImageCount = entry.templateId && templateConfig
    ? countInheritedImageReferences(offer, entry.favicon, templateConfig, templateFavicon)
    : 0
  const defaultPlans = templateConfig?.pricing.plans ?? []
  return <OfferEditor slug={entry.slug ?? slug} label={entry.label} initialOffer={offer} defaultPlans={defaultPlans} initialCashflow={entry.cashflow} initialFavicon={entry.favicon} initialStatus={entry.status} templateId={entry.templateId} inheritedImageCount={inheritedImageCount} />
}
