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
  previewOrigin,
}: {
  offer: OfferConfig
  children: React.ReactNode
  previewMode?: boolean
  /** Origin of the hub editor allowed to send live previews (defaults to this site). */
  previewOrigin?: string
}) {
  const [currentOffer, setCurrentOffer] = useState(offer)

  useEffect(() => {
    if (!previewMode) return
    const receivePreview = (event: MessageEvent) => {
      if (event.origin !== (previewOrigin ?? window.location.origin) || event.data?.type !== "ofertas:preview") return
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
    const announceReady = () => window.parent.postMessage({ type: "ofertas:preview-ready" }, previewOrigin ?? window.location.origin)
    window.addEventListener("message", receivePreview)
    announceReady()
    return () => window.removeEventListener("message", receivePreview)
  }, [previewMode, previewOrigin])

  // Hub editor preview: a click on a text or image tells the hub which field to open, and links do not navigate.
  useEffect(() => {
    if (!previewMode || !previewOrigin) return
    const style = document.createElement("style")
    style.textContent = "#offer-root :is(h1,h2,h3,h4,p,li,span,strong,em,small,a,button,img,summary):hover{outline:2px dashed rgba(14,165,233,.7);outline-offset:2px;cursor:pointer}"
    document.head.append(style)
    const click = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target?.closest("#offer-root")) return
      event.preventDefault()
      event.stopPropagation()
      const image = target.closest("img")
      const value = image ? image.getAttribute("src") ?? "" : (target.innerText || target.textContent || "").trim().slice(0, 400)
      if (value) window.parent.postMessage({ type: "ofertas:preview-click", kind: image ? "image" : "text", value }, previewOrigin)
    }
    document.addEventListener("click", click, true)
    return () => { document.removeEventListener("click", click, true); style.remove() }
  }, [previewMode, previewOrigin])

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
