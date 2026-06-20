"use client"

import { createContext, useContext } from "react"
import type { OfferConfig } from "@/types/offer"

const OfferContext = createContext<OfferConfig | null>(null)

export function OfferProvider({
  offer,
  children,
}: {
  offer: OfferConfig
  children: React.ReactNode
}) {
  return <OfferContext.Provider value={offer}>{children}</OfferContext.Provider>
}

export function useOffer(): OfferConfig {
  const ctx = useContext(OfferContext)
  if (!ctx) throw new Error("useOffer must be used within an OfferProvider")
  return ctx
}
