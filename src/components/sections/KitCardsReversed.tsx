"use client"

import { useOffer } from "@/context/offer-context"
import { InfiniteImageRail } from "@/components/ui/InfiniteImageRail"

export function KitCardsReversed() {
  const { kitCards } = useOffer()
  return <InfiniteImageRail images={kitCards.images} displayAspect={kitCards.displayAspect ?? "auto"} direction="reverse" />
}
