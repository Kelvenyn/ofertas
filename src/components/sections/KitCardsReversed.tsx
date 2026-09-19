"use client"

import { useOffer } from "@/context/offer-context"
import { InfiniteImageRail } from "@/components/ui/InfiniteImageRail"

export function KitCardsReversed() {
  const offer = useOffer()
  const { kitCards } = offer
  return <InfiniteImageRail images={kitCards.images} orientation={offer.orientation} direction="reverse" />
}
