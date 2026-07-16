"use client"

import { useState } from "react"

type PaletteKey = "atual" | "azul" | "roxo" | "verde"

const PALETTES: Record<PaletteKey, { label: string; swatch: string; vars: Record<string, string> }> = {
  atual: {
    label: "Turquesa & Coral",
    swatch: "#0E7490",
    vars: { "--brand": "#0E7490", "--brand-deep": "#155E75", "--brand-ink": "#164E63", "--brand-dark": "#06B6D4", "--brand-light": "#67E8F9", "--brand-subtle": "#CFFAFE", "--cta": "#F97316", "--cta-deep": "#EA580C", "--cta-darkest": "#C2410C", "--accent": "#E11D48", "--yellow": "#FACC15", "--bg": "#ECFEFF", "--bg-alt": "#F97316" },
  },
  azul: {
    label: "Azul Elétrico & Lima",
    swatch: "#2563EB",
    vars: { "--brand": "#2563EB", "--brand-deep": "#1D4ED8", "--brand-ink": "#1E3A8A", "--brand-dark": "#60A5FA", "--brand-light": "#93C5FD", "--brand-subtle": "#DBEAFE", "--cta": "#65A30D", "--cta-deep": "#4D7C0F", "--cta-darkest": "#3F6212", "--accent": "#F43F5E", "--yellow": "#FDE047", "--bg": "#EFF6FF", "--bg-alt": "#65A30D" },
  },
  roxo: {
    label: "Roxo & Rosa",
    swatch: "#7C3AED",
    vars: { "--brand": "#7C3AED", "--brand-deep": "#6D28D9", "--brand-ink": "#4C1D95", "--brand-dark": "#A78BFA", "--brand-light": "#C4B5FD", "--brand-subtle": "#EDE9FE", "--cta": "#EC4899", "--cta-deep": "#DB2777", "--cta-darkest": "#BE185D", "--accent": "#F59E0B", "--yellow": "#FDE047", "--bg": "#FAF5FF", "--bg-alt": "#EC4899" },
  },
  verde: {
    label: "Verde Energia",
    swatch: "#059669",
    vars: { "--brand": "#059669", "--brand-deep": "#047857", "--brand-ink": "#065F46", "--brand-dark": "#10B981", "--brand-light": "#6EE7B7", "--brand-subtle": "#D1FAE5", "--cta": "#16A34A", "--cta-deep": "#15803D", "--cta-darkest": "#166534", "--accent": "#0EA5E9", "--yellow": "#FACC15", "--bg": "#ECFDF5", "--bg-alt": "#16A34A" },
  },
}

export function PaletteSwitcher() {
  const [active, setActive] = useState<PaletteKey>("verde")
  const [open, setOpen] = useState(false)

  function applyPalette(key: PaletteKey) {
    const el = document.getElementById("offer-root")
    if (!el) return
    Object.entries(PALETTES[key].vars).forEach(([prop, value]) => el.style.setProperty(prop, value))
    setActive(key)
  }

  return (
    <div style={{ position: "fixed", bottom: 24, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, fontFamily: "'Manrope', sans-serif" }}>
      {open && (
        <div style={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 14, padding: "14px", display: "flex", flexDirection: "column", gap: 6, boxShadow: "0 12px 32px rgba(15,23,42,.35)", minWidth: 220 }}>
          <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 800, letterSpacing: ".1em", color: "#94A3B8", textTransform: "uppercase" }}>Paleta da oferta</p>
          {(Object.keys(PALETTES) as PaletteKey[]).map((key) => {
            const palette = PALETTES[key]
            const isActive = active === key
            return <button key={key} onClick={() => applyPalette(key)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 9, border: isActive ? "1.5px solid #FFFFFF" : "1.5px solid transparent", background: isActive ? "#1E293B" : "transparent", cursor: "pointer", color: "#FFFFFF", fontSize: 13, fontWeight: isActive ? 700 : 500, textAlign: "left", width: "100%" }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", background: palette.swatch, flexShrink: 0, boxShadow: `0 0 0 2px ${palette.swatch}44` }} />
              {palette.label}{isActive && <span style={{ marginLeft: "auto", fontSize: 12 }}>✓</span>}
            </button>
          })}
        </div>
      )}
      <button onClick={() => setOpen((value) => !value)} title="Trocar paleta de cores" aria-label="Trocar paleta de cores" style={{ width: 50, height: 50, borderRadius: "50%", background: "#0F172A", border: "2px solid #334155", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 5px 18px rgba(15,23,42,.3)", fontSize: 22 }}>🎨</button>
    </div>
  )
}
