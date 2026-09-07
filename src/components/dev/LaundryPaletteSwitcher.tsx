"use client"

import { useState } from "react"

type Palette = { label: string; vars: Record<string, string> }

const CTA_GREEN = { "--cta": "#16A34A", "--cta-deep": "#11863D", "--cta-darkest": "#0E6B31" }

const PALETTES: Palette[] = [
  { label: "Azul-petróleo", vars: { "--brand": "#007C83", "--brand-deep": "#0F4C5C", "--brand-ink": "#12333B", "--brand-dark": "#32B6B2", "--brand-light": "#9EE5DE", "--brand-subtle": "#E7F7F5", ...CTA_GREEN, "--accent": "#D97706", "--yellow": "#F4B942", "--bg": "#FAFCFB", "--bg-alt": "#0F4C5C", "--marquee-gradient": "linear-gradient(90deg, #0F4C5C 0%, #007C83 45%, #32B6B2 72%, #0F4C5C 100%)" } },
  { label: "Azul-cobalto", vars: { "--brand": "#2563EB", "--brand-deep": "#1E3A8A", "--brand-ink": "#172554", "--brand-dark": "#60A5FA", "--brand-light": "#BFDBFE", "--brand-subtle": "#EFF6FF", ...CTA_GREEN, "--accent": "#EA580C", "--yellow": "#FBBF24", "--bg": "#F8FAFF", "--bg-alt": "#1E3A8A", "--marquee-gradient": "linear-gradient(90deg, #1E3A8A 0%, #2563EB 45%, #60A5FA 72%, #1E3A8A 100%)" } },
  { label: "Terracota", vars: { "--brand": "#D95D1A", "--brand-deep": "#9A3412", "--brand-ink": "#431407", "--brand-dark": "#F59E72", "--brand-light": "#FED7AA", "--brand-subtle": "#FFF7ED", ...CTA_GREEN, "--accent": "#B45309", "--yellow": "#F59E0B", "--bg": "#FFFBF7", "--bg-alt": "#9A3412", "--marquee-gradient": "linear-gradient(90deg, #9A3412 0%, #D95D1A 45%, #F59E72 72%, #9A3412 100%)" } },
  { label: "Ameixa", vars: { "--brand": "#9333EA", "--brand-deep": "#5B1F61", "--brand-ink": "#3B1247", "--brand-dark": "#C084FC", "--brand-light": "#E9D5FF", "--brand-subtle": "#FAF5FF", ...CTA_GREEN, "--accent": "#D97706", "--yellow": "#F4B942", "--bg": "#FEFBFF", "--bg-alt": "#5B1F61", "--marquee-gradient": "linear-gradient(90deg, #5B1F61 0%, #9333EA 45%, #C084FC 72%, #5B1F61 100%)" } },
  { label: "Verde-oliva", vars: { "--brand": "#4D7C0F", "--brand-deep": "#365314", "--brand-ink": "#253708", "--brand-dark": "#84B83D", "--brand-light": "#D9F99D", "--brand-subtle": "#F7FEE7", ...CTA_GREEN, "--accent": "#D97706", "--yellow": "#EAB308", "--bg": "#FCFDF8", "--bg-alt": "#365314", "--marquee-gradient": "linear-gradient(90deg, #365314 0%, #4D7C0F 45%, #84B83D 72%, #365314 100%)" } },
]

export function LaundryPaletteSwitcher() {
  const [active, setActive] = useState<number | null>(null)
  const [open, setOpen] = useState(false)

  function applyPalette(index: number) {
    const root = document.getElementById("offer-root")
    if (!root) return
    Object.entries(PALETTES[index].vars).forEach(([property, value]) => root.style.setProperty(property, value))
    setActive(index)
  }

  if (!open) return <button className="palette-menu-reopen" onClick={() => setOpen(true)}>Ver paletas</button>

  return <aside className="palette-menu" aria-label="Paletas de cores para pré-visualização">
    <div className="palette-menu-head"><strong>Paletas ao vivo</strong><button onClick={() => setOpen(false)} aria-label="Fechar paletas">×</button></div>
    <p>Escolha uma das 5 combinações para pré-visualizar a oferta.</p>
    <div className="palette-menu-options">
      {PALETTES.map((palette, index) => <button key={palette.label} onClick={() => applyPalette(index)} aria-pressed={active === index}>
        <span className="palette-swatches" aria-hidden="true">{["--brand", "--brand-dark", "--cta", "--accent"].map((variable) => <i key={variable} style={{ background: palette.vars[variable] }} />)}</span>
        {palette.label}{active === index && <span aria-hidden="true">✓</span>}
      </button>)}
    </div>
  </aside>
}
