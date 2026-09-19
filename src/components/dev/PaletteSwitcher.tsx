"use client"

import { useEffect, useState } from "react"

type PaletteKey = "turquesa" | "azul" | "verde" | "terracota" | "ameixa"

type Palette = { label: string; vars: Record<string, string> }

const PALETTES: Record<PaletteKey, Palette> = {
  turquesa: { label: "Turquesa", vars: { "--brand": "#0F766E", "--brand-deep": "#115E59", "--brand-ink": "#16302B", "--brand-dark": "#2BAA9A", "--brand-light": "#8BD5CA", "--brand-subtle": "#E6F5F2", "--cta": "#16A34A", "--cta-deep": "#11863D", "--cta-darkest": "#0E6B31", "--accent": "#D97706", "--yellow": "#F4B942", "--bg": "#F7FAF9", "--bg-alt": "#115E59", "--marquee-gradient": "linear-gradient(90deg, #115E59 0%, #0F766E 45%, #2BAA9A 72%, #115E59 100%)" } },
  azul: { label: "Azul profundo", vars: { "--brand": "#1D4ED8", "--brand-deep": "#1E3A8A", "--brand-ink": "#14213D", "--brand-dark": "#3B82F6", "--brand-light": "#BFDBFE", "--brand-subtle": "#EFF6FF", "--cta": "#16A34A", "--cta-deep": "#15803D", "--cta-darkest": "#14532D", "--accent": "#EA580C", "--yellow": "#FBBF24", "--bg": "#F8FAFF", "--bg-alt": "#1E3A8A", "--marquee-gradient": "linear-gradient(90deg, #1E3A8A 0%, #1D4ED8 45%, #3B82F6 72%, #1E3A8A 100%)" } },
  verde: { label: "Verde natural", vars: { "--brand": "#3F6212", "--brand-deep": "#365314", "--brand-ink": "#1C2D0D", "--brand-dark": "#65A30D", "--brand-light": "#BEF264", "--brand-subtle": "#F7FEE7", "--cta": "#16A34A", "--cta-deep": "#15803D", "--cta-darkest": "#14532D", "--accent": "#D97706", "--yellow": "#EAB308", "--bg": "#FAFCF5", "--bg-alt": "#365314", "--marquee-gradient": "linear-gradient(90deg, #365314 0%, #3F6212 45%, #65A30D 72%, #365314 100%)" } },
  terracota: { label: "Terracota", vars: { "--brand": "#C2410C", "--brand-deep": "#9A3412", "--brand-ink": "#431407", "--brand-dark": "#EA580C", "--brand-light": "#FDBA74", "--brand-subtle": "#FFF7ED", "--cta": "#16A34A", "--cta-deep": "#15803D", "--cta-darkest": "#14532D", "--accent": "#B45309", "--yellow": "#F59E0B", "--bg": "#FFFBF7", "--bg-alt": "#9A3412", "--marquee-gradient": "linear-gradient(90deg, #9A3412 0%, #C2410C 45%, #EA580C 72%, #9A3412 100%)" } },
  ameixa: { label: "Ameixa", vars: { "--brand": "#7E2253", "--brand-deep": "#581C40", "--brand-ink": "#350C27", "--brand-dark": "#A33B71", "--brand-light": "#F5B8D3", "--brand-subtle": "#FFF1F7", "--cta": "#16A34A", "--cta-deep": "#15803D", "--cta-darkest": "#14532D", "--accent": "#D97706", "--yellow": "#F4B942", "--bg": "#FFFAFC", "--bg-alt": "#581C40", "--marquee-gradient": "linear-gradient(90deg, #581C40 0%, #7E2253 45%, #A33B71 72%, #581C40 100%)" } },
}

export function PaletteSwitcher() {
  const [active, setActive] = useState<PaletteKey | null>(null)
  const [open, setOpen] = useState(true)
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAvailable(Boolean(document.getElementById("offer-root"))))
    return () => cancelAnimationFrame(frame)
  }, [])

  function applyPalette(key: PaletteKey) {
    const root = document.getElementById("offer-root")
    if (!root) return
    Object.entries(PALETTES[key].vars).forEach(([property, value]) => root.style.setProperty(property, value))
    setActive(key)
  }

  if (!available) return null

  if (!open) return <button className="palette-menu-reopen" onClick={() => setOpen(true)}>Ver paletas</button>

  return <aside className="palette-menu" aria-label="Paletas de cores para pré-visualização">
    <div className="palette-menu-head"><strong>Paletas ao vivo</strong><button onClick={() => setOpen(false)} aria-label="Fechar paletas">×</button></div>
    <p>Escolha uma das 5 combinações para pré-visualizar a oferta.</p>
    <div className="palette-menu-options">
      {(Object.keys(PALETTES) as PaletteKey[]).map((key) => {
        const palette = PALETTES[key]
        return <button key={key} onClick={() => applyPalette(key)} aria-pressed={active === key}>
          <span className="palette-swatches" aria-hidden="true">{["--brand", "--brand-dark", "--cta", "--accent"].map((variable) => <i key={variable} style={{ background: palette.vars[variable] }} />)}</span>
          {palette.label}{active === key && <span aria-hidden="true">✓</span>}
        </button>
      })}
    </div>
  </aside>
}
