"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { paletteCssVariables } from "@/config/offers/palettes"
import { validateOfferConfig } from "@/lib/offer-validation"
import type { OfferConfig } from "@/types/offer"

const OfferContext = createContext<OfferConfig | null>(null)

export function OfferProvider({
  offer,
  children,
  previewMode = false,
}: {
  offer: OfferConfig
  children: React.ReactNode
  previewMode?: boolean
}) {
  const [currentOffer, setCurrentOffer] = useState(offer)

  useEffect(() => {
    if (!previewMode) return
    const receivePreview = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== "ofertas:preview") return
      const checked = validateOfferConfig(event.data.offer)
      if (checked.offer) setCurrentOffer(checked.offer)
      if (typeof event.data.favicon === "string") {
        try {
          const favicon = new URL(event.data.favicon, window.location.origin)
          const allowed = favicon.origin === window.location.origin || favicon.hostname.endsWith(".public.blob.vercel-storage.com")
          if (!allowed) return
          let icon = document.querySelector<HTMLLinkElement>('link[rel~="icon"]')
          if (!icon) {
            icon = document.createElement("link")
            icon.rel = "icon"
            document.head.append(icon)
          }
          icon.href = favicon.toString()
        } catch { /* Ignora URLs de favicon inválidas no preview. */ }
      }
    }
    const announceReady = () => window.parent.postMessage({ type: "ofertas:preview-ready" }, window.location.origin)
    window.addEventListener("message", receivePreview)
    announceReady()
    return () => window.removeEventListener("message", receivePreview)
  }, [previewMode])

  useEffect(() => {
    if (!previewMode) return
    const root = document.getElementById("offer-root")
    if (!root) return
    const variables = paletteCssVariables(currentOffer.palette)
    for (const [name, value] of Object.entries(variables)) {
      if (typeof value === "string") root.style.setProperty(name, value)
    }
  }, [currentOffer.palette, previewMode])

  return <OfferContext.Provider value={currentOffer}>{children}</OfferContext.Provider>
}

export function useOffer(): OfferConfig {
  const ctx = useContext(OfferContext)
  if (!ctx) throw new Error("useOffer must be used within an OfferProvider")
  return ctx
}
