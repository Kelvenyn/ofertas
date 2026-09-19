import { createOfferMetadata, OfferRouteLayout } from "@/components/OfferRouteLayout"
import { OFFER } from "@/config/offers/tilapia/offer"

const SLUG = "tilapia"

export const metadata = createOfferMetadata(SLUG, OFFER)

export default function Layout({ children }: { children: React.ReactNode }) {
  return <OfferRouteLayout slug={SLUG} offer={OFFER}>{children}</OfferRouteLayout>
}
