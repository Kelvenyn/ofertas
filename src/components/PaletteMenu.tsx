"use client"

import { useState } from "react"
import type { OfferPalette } from "@/types/offer"

const greenCta = { cta: "#16A34A", ctaDeep: "#11863D", ctaDarkest: "#0E6B31" }
type PaletteColors = Omit<OfferPalette, keyof typeof greenCta>
const palette = (name: string, colors: PaletteColors) => ({ name, colors: { ...colors, ...greenCta } })

const palettes = [
  palette("Verde natural", { brand: "#4F7A3A", brandDeep: "#284C2A", brandInk: "#18351E", brandDark: "#7DAA57", brandLight: "#B7D59C", brandSubtle: "#EDF5E7", accent: "#D9A441", yellow: "#E7C75F", bg: "#F7F5ED", bgAlt: "#284C2A" }),
  palette("Terracota", { brand: "#A6552A", brandDeep: "#6E2E1D", brandInk: "#431A12", brandDark: "#D98654", brandLight: "#EFC2A7", brandSubtle: "#FBEFE8", accent: "#C89B43", yellow: "#E2BF63", bg: "#FCF6F0", bgAlt: "#6E2E1D" }),
  palette("Oliva", { brand: "#68723D", brandDeep: "#3D4525", brandInk: "#252A17", brandDark: "#9BA46A", brandLight: "#D5DBAF", brandSubtle: "#F1F3E4", accent: "#B98C36", yellow: "#D6B958", bg: "#F8F7ED", bgAlt: "#3D4525" }),
  palette("Verde profundo", { brand: "#20735B", brandDeep: "#104437", brandInk: "#092C24", brandDark: "#59A98B", brandLight: "#B3DCC9", brandSubtle: "#E5F4EC", accent: "#D7A52D", yellow: "#E4C55E", bg: "#F4F8F3", bgAlt: "#104437" }),
  palette("Areia quente", { brand: "#9A663B", brandDeep: "#604127", brandInk: "#3C281A", brandDark: "#C79563", brandLight: "#E8C9A7", brandSubtle: "#F9EEDF", accent: "#B8793E", yellow: "#DEA952", bg: "#FFF8E8", bgAlt: "#604127" }),
  palette("Azul botânico", { brand: "#2F6B68", brandDeep: "#1A4140", brandInk: "#102A2A", brandDark: "#6B9E99", brandLight: "#B8D9D3", brandSubtle: "#E5F2EF", accent: "#C68A3C", yellow: "#DDB957", bg: "#F2F8F7", bgAlt: "#1A4140" }),
  palette("Vinho e oliva", { brand: "#7A3E3A", brandDeep: "#4C2423", brandInk: "#301516", brandDark: "#AF7169", brandLight: "#E3B7AE", brandSubtle: "#F8EAE6", accent: "#84914A", yellow: "#C9B056", bg: "#FBF4EF", bgAlt: "#4C2423" }),
  palette("Sálvia", { brand: "#62806D", brandDeep: "#3C5648", brandInk: "#26372E", brandDark: "#93B09D", brandLight: "#C8DBCC", brandSubtle: "#EDF4EE", accent: "#B98546", yellow: "#D8B85A", bg: "#F7FAF5", bgAlt: "#3C5648" }),
  palette("Carvão e musgo", { brand: "#52633B", brandDeep: "#293121", brandInk: "#1B2016", brandDark: "#899B68", brandLight: "#C8D2B1", brandSubtle: "#EFF2E7", accent: "#B77A3F", yellow: "#D6AF4C", bg: "#F5F5EF", bgAlt: "#293121" }),
  palette("Rosa queimado", { brand: "#9A5E5B", brandDeep: "#643937", brandInk: "#3E2221", brandDark: "#C88E89", brandLight: "#E8C3BD", brandSubtle: "#FAEEEB", accent: "#8A9A55", yellow: "#D5B85C", bg: "#FCF6F1", bgAlt: "#643937" }),
]

export function PaletteMenu() {
  const [open, setOpen] = useState(true)
  const applyPalette = (selected: (typeof palettes)[number]) => {
    const root = document.getElementById("offer-root")
    if (!root) return
    Object.entries(selected.colors).forEach(([key, value]) => root.style.setProperty(`--${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value))
  }

  if (!open) return <button className="palette-menu-reopen" onClick={() => setOpen(true)}>Paleta</button>

  return <aside className="palette-menu" aria-label="Escolher paleta de cores">
    <div className="palette-menu-head"><strong>Paleta do jardim</strong><button onClick={() => setOpen(false)} aria-label="Minimizar menu de paleta">×</button></div>
    <p>CTA e bullets ficam verdes em todas as opções.</p>
    <div className="palette-menu-options">
      {palettes.map((item) => <button key={item.name} onClick={() => applyPalette(item)}><span className="palette-swatches">{[item.colors.brand, item.colors.brandDeep, item.colors.cta, item.colors.accent].map((color) => <i key={color} style={{ backgroundColor: color }} />)}</span>{item.name}</button>)}
    </div>
  </aside>
}
