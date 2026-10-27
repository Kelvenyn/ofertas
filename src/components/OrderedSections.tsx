"use client"

import type { ReactNode } from "react"
import { OfferSection } from "@/components/OfferSection"
import { useOffer } from "@/context/offer-context"
import { orderedSections, type MovableSectionId } from "@/types/offer"

/** The middle sections in the order the page chose in the hub (default order when it chose none). */
export function OrderedSections({ sections }: { sections: Record<MovableSectionId, ReactNode> }) {
  const offer = useOffer()
  return orderedSections(offer.sectionOrder).map(id => <OfferSection key={id} id={id}>{sections[id]}</OfferSection>)
}
