"use client"

import type { ReactNode } from "react"
import { useOffer } from "@/context/offer-context"
import type { SectionId } from "@/types/offer"

export function OfferSection({ id, children }: { id: SectionId; children: ReactNode }) {
  const offer = useOffer()
  const enabled = offer.sections?.[id] ?? true
  return enabled ? children : null
}
