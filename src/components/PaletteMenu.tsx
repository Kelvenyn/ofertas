"use client"

import { useState } from "react"
import type { OfferPalette } from "@/types/offer"

const palettes: Array<{ name: string; colors: Pick<OfferPalette, "brand" | "brandDeep" | "brandInk" | "brandDark" | "brandLight" | "brandSubtle" | "cta" | "ctaDeep" | "ctaDarkest" | "accent" | "yellow" | "bg" | "bgAlt"> }> = [
  { name: "Verde natural", colors: { brand: "#4F7A3A", brandDeep: "#284C2A", brandInk: "#18351E", brandDark: "#7DAA57", brandLight: "#B7D59C", brandSubtle: "#EDF5E7", cta: "#E6772E", ctaDeep: "#C85B1B", ctaDarkest: "#9D4212", accent: "#D9A441", yellow: "#E7C75F", bg: "#F7F5ED", bgAlt: "#284C2A" } },
  { name: "Terracota", colors: { brand: "#A6552A", brandDeep: "#6E2E1D", brandInk: "#431A12", brandDark: "#D98654", brandLight: "#EFC2A7", brandSubtle: "#FBEFE8", cta: "#477B3A", ctaDeep: "#315E2B", ctaDarkest: "#20441E", accent: "#C89B43", yellow: "#E2BF63", bg: "#FCF6F0", bgAlt: "#6E2E1D" } },
  { name: "Oliva", colors: { brand: "#68723D", brandDeep: "#3D4525", brandInk: "#252A17", brandDark: "#9BA46A", brandLight: "#D5DBAF", brandSubtle: "#F1F3E4", cta: "#D46A2E", ctaDeep: "#AE4E20", ctaDarkest: "#7A3218", accent: "#B98C36", yellow: "#D6B958", bg: "#F8F7ED", bgAlt: "#3D4525" } },
  { name: "Verde profundo", colors: { brand: "#20735B", brandDeep: "#104437", brandInk: "#092C24", brandDark: "#59A98B", brandLight: "#B3DCC9", brandSubtle: "#E5F4EC", cta: "#E08A26", ctaDeep: "#B96716", ctaDarkest: "#85470F", accent: "#D7A52D", yellow: "#E4C55E", bg: "#F4F8F3", bgAlt: "#104437" } },
]

export function PaletteMenu() {
  const [open, setOpen] = useState(true)
  const applyPalette = (palette: (typeof palettes)[number]) => {
    const root = document.getElementById("offer-root")
    if (!root) return
    Object.entries(palette.colors).forEach(([key, value]) => root.style.setProperty(`--${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value))
  }

  if (!open) return <button className="palette-menu-reopen" onClick={() => setOpen(true)}>Paleta</button>

  return <aside className="palette-menu" aria-label="Escolher paleta de cores">
    <div className="palette-menu-head"><strong>Paleta do jardim</strong><button onClick={() => setOpen(false)} aria-label="Minimizar menu de paleta">×</button></div>
    <p>Escolha ao vivo a combinação que mais gosta.</p>
    <div className="palette-menu-options">
      {palettes.map((palette) => <button key={palette.name} onClick={() => applyPalette(palette)}><span className="palette-swatches">{[palette.colors.brand, palette.colors.brandDeep, palette.colors.cta, palette.colors.accent].map((color) => <i key={color} style={{ backgroundColor: color }} />)}</span>{palette.name}</button>)}
    </div>
  </aside>
}
