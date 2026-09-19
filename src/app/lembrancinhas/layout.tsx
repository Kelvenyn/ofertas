import { createOfferMetadata, OfferRouteLayout } from "@/components/OfferRouteLayout"
import { OFFER } from "@/config/offers/lembrancinhas/offer"

const SLUG = "lembrancinhas"

export const metadata = createOfferMetadata(SLUG, OFFER)

export default function Layout({ children }: { children: React.ReactNode }) {
  return <OfferRouteLayout slug={SLUG} offer={OFFER}>{children}</OfferRouteLayout>
}
