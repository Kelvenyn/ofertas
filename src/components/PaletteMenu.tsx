"use client"

import { useState } from "react"
import type { OfferPalette } from "@/types/offer"

const greenCta = { cta: "#16A34A", ctaDeep: "#11863D", ctaDarkest: "#0E6B31" }
type PaletteColors = Omit<OfferPalette, keyof typeof greenCta>
const palette = (name: string, colors: PaletteColors) => ({ name, colors: { ...colors, ...greenCta } })
const palettes = [
  palette("Vinho liturgico", { brand: "#7A1F32", brandDeep: "#48111F", brandInk: "#2F0B15", brandDark: "#AA4A5E", brandLight: "#E9BAC4", brandSubtle: "#FBECEF", accent: "#C89624", yellow: "#E5BD52", bg: "#FFF7F4", bgAlt: "#48111F" }),
  palette("Azul mariano", { brand: "#234F91", brandDeep: "#142D5A", brandInk: "#0E2040", brandDark: "#5B82C2", brandLight: "#C2D4F1", brandSubtle: "#EDF3FD", accent: "#C89624", yellow: "#E3C15B", bg: "#F7FAFF", bgAlt: "#142D5A" }),
  palette("Verde esperanca", { brand: "#356B4A", brandDeep: "#1D412B", brandInk: "#102919", brandDark: "#70A17F", brandLight: "#C2DDC5", brandSubtle: "#EFF7F0", accent: "#C38D28", yellow: "#DFC15B", bg: "#F8FBF5", bgAlt: "#1D412B" }),
  palette("Roxo da crisma", { brand: "#5C3A78", brandDeep: "#352044", brandInk: "#23152D", brandDark: "#9170AC", brandLight: "#D9C9E7", brandSubtle: "#F5F0F8", accent: "#C79828", yellow: "#E1C15B", bg: "#FCF9FD", bgAlt: "#352044" }),
  palette("Terracota sacra", { brand: "#9A4E32", brandDeep: "#5C291B", brandInk: "#3B1B12", brandDark: "#C77A5C", brandLight: "#EDC2B2", brandSubtle: "#FCEFE9", accent: "#BA8A28", yellow: "#E2BE57", bg: "#FFF8F2", bgAlt: "#5C291B" }),
  palette("Ouro e pergaminho", { brand: "#87621E", brandDeep: "#4F3914", brandInk: "#32240D", brandDark: "#B69348", brandLight: "#E8D5A1", brandSubtle: "#FBF5E4", accent: "#A53F32", yellow: "#E0B94C", bg: "#FFFCF4", bgAlt: "#4F3914" }),
  palette("Azul sereno", { brand: "#276979", brandDeep: "#173E49", brandInk: "#10282F", brandDark: "#62A0AC", brandLight: "#BFE0E4", brandSubtle: "#EDF8F8", accent: "#C1872F", yellow: "#E1BC5C", bg: "#F6FBFB", bgAlt: "#173E49" }),
  palette("Rosa de fe", { brand: "#9C5865", brandDeep: "#60313A", brandInk: "#3D1F25", brandDark: "#C88B96", brandLight: "#EDC6CC", brandSubtle: "#FCEEF0", accent: "#A68137", yellow: "#DFC063", bg: "#FFF8F8", bgAlt: "#60313A" }),
  palette("Oliva e ouro", { brand: "#596338", brandDeep: "#323A20", brandInk: "#202615", brandDark: "#8C9864", brandLight: "#D2D9B7", brandSubtle: "#F3F5E9", accent: "#B9862E", yellow: "#DDB953", bg: "#FAFAF3", bgAlt: "#323A20" }),
  palette("Cafe e creme", { brand: "#76503A", brandDeep: "#442D21", brandInk: "#2B1C15", brandDark: "#A67A5C", brandLight: "#DEC2AE", brandSubtle: "#F8EFE8", accent: "#A94B37", yellow: "#D8B04E", bg: "#FFF9F4", bgAlt: "#442D21" }),
]

export function PaletteMenu() {
  const [open, setOpen] = useState(true)
  function applyPalette(selected: (typeof palettes)[number]) {
    const root = document.getElementById("offer-root")
    if (!root) return
    Object.entries(selected.colors).forEach(([key, value]) => root.style.setProperty(`--${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value))
    setOpen(false)
  }
  if (!open) return null
  return <aside className="palette-menu" aria-label="Escolher paleta de cores">
    <div className="palette-menu-head"><strong>Teste de paleta</strong><button onClick={() => setOpen(false)} aria-label="Ocultar menu de paleta">&times;</button></div>
    <p>Escolha uma opcao para testar ao vivo. O menu se oculta em seguida.</p>
    <div className="palette-menu-options">
      {palettes.map((item) => <button key={item.name} onClick={() => applyPalette(item)}><span className="palette-swatches">{[item.colors.brand, item.colors.brandDeep, item.colors.cta, item.colors.accent].map((color) => <i key={color} style={{ backgroundColor: color }} />)}</span>{item.name}</button>)}
    </div>
  </aside>
}
