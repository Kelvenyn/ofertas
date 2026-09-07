"use client"

import { useState } from "react"

type Palette = { label: string; vars: Record<string, string> }

const PALETTES: Palette[] = [
  { label: "Azul-petróleo", vars: { "--brand": "#0F766E", "--brand-deep": "#115E59", "--brand-ink": "#16302B", "--brand-dark": "#2BAA9A", "--brand-light": "#8BD5CA", "--brand-subtle": "#E6F5F2", "--cta": "#C2410C", "--cta-deep": "#9A3412", "--cta-darkest": "#7C2D12", "--accent": "#D97706", "--yellow": "#F4B942", "--bg": "#FAFCFB", "--bg-alt": "#115E59" } },
  { label: "Verde-sálvia", vars: { "--brand": "#4D7C67", "--brand-deep": "#315A49", "--brand-ink": "#18382C", "--brand-dark": "#7AA88D", "--brand-light": "#B9D5C1", "--brand-subtle": "#EFF7F0", "--cta": "#B45309", "--cta-deep": "#92400E", "--cta-darkest": "#78350F", "--accent": "#D97706", "--yellow": "#EAB308", "--bg": "#FBFCF9", "--bg-alt": "#315A49" } },
  { label: "Terracota", vars: { "--brand": "#C2410C", "--brand-deep": "#9A3412", "--brand-ink": "#431407", "--brand-dark": "#EA580C", "--brand-light": "#FDBA74", "--brand-subtle": "#FFF7ED", "--cta": "#16A34A", "--cta-deep": "#15803D", "--cta-darkest": "#14532D", "--accent": "#B45309", "--yellow": "#F59E0B", "--bg": "#FFFBF7", "--bg-alt": "#9A3412" } },
  { label: "Azul profundo", vars: { "--brand": "#1D4ED8", "--brand-deep": "#1E3A8A", "--brand-ink": "#14213D", "--brand-dark": "#3B82F6", "--brand-light": "#BFDBFE", "--brand-subtle": "#EFF6FF", "--cta": "#16A34A", "--cta-deep": "#15803D", "--cta-darkest": "#14532D", "--accent": "#EA580C", "--yellow": "#FBBF24", "--bg": "#F8FAFF", "--bg-alt": "#1E3A8A" } },
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
    <p>Escolha uma das 4 combinações para pré-visualizar a oferta.</p>
    <div className="palette-menu-options">
      {PALETTES.map((palette, index) => <button key={palette.label} onClick={() => applyPalette(index)} aria-pressed={active === index}>
        <span className="palette-swatches" aria-hidden="true">{["--brand", "--brand-dark", "--cta", "--accent"].map((variable) => <i key={variable} style={{ background: palette.vars[variable] }} />)}</span>
        {palette.label}{active === index && <span aria-hidden="true">✓</span>}
      </button>)}
    </div>
  </aside>
}
