"use client"

import { useOffer } from "@/context/offer-context"
import { InfiniteImageRail } from "@/components/ui/InfiniteImageRail"

export function KitCards() {
  const { kitCards } = useOffer()
  return <InfiniteImageRail images={kitCards.images} displayAspect={kitCards.displayAspect ?? "auto"} heading={kitCards.heading1} subtitle={kitCards.heading2} />
}
