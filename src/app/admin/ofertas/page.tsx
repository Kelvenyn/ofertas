import { redirect } from "next/navigation"
import { getCheckoutSummary } from "@/config/offers/catalog"
import { OFFER_CONFIGS, type OfferSlug } from "@/config/offers"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getOperationalCatalog } from "@/lib/operational-catalog"
import { AdminOffersClient } from "./AdminOffersClient"

export const metadata = { title: "Administração | Universo Eduk" }

export default async function AdminOffersPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login?next=/admin/ofertas")
  const catalog = await getOperationalCatalog()

  const offers = Object.entries(catalog.offers).map(([slug, entry]) => {
    const offer = OFFER_CONFIGS[slug as OfferSlug]
    const checkout = offer ? getCheckoutSummary(offer) : { count: 0, valid: false }
    return {
      slug,
      label: entry.label,
      status: entry.status,
      paletteKey: entry.paletteKey,
      hasCashflow: Boolean(entry.cashflow),
      checkoutCount: checkout.count,
      checkoutValid: checkout.valid,
    }
  })

  return <AdminOffersClient initialOffers={offers} />
}
