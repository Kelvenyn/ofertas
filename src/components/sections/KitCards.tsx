"use client"

import { useOffer } from "@/context/offer-context"
import { InfiniteImageRail } from "@/components/ui/InfiniteImageRail"

export function KitCards() {
  const offer = useOffer()
  const { kitCards } = offer
  return <InfiniteImageRail images={kitCards.images} orientation={offer.orientation} heading={kitCards.heading} />
}
