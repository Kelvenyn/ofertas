"use client"

import { useState } from "react"

type PaletteKey = "pergaminho" | "vinho" | "azulMariano" | "verdeEsperanca"

type Palette = { label: string; swatch: string; vars: Record<string, string> }

// Os CTAs e ícones de checklist usam as variáveis verdes da oferta e não entram aqui.
const PALETTES: Record<PaletteKey, Palette> = {
  pergaminho: { label: "Pergaminho & Ouro", swatch: "#78350F", vars: { "--brand": "#78350F", "--brand-deep": "#451A03", "--brand-ink": "#2D160A", "--brand-dark": "#A16207", "--brand-light": "#E8C77F", "--brand-subtle": "#FEF3C7", "--accent": "#9F1239", "--yellow": "#D4A72C", "--bg": "#FFF9ED", "--bg-alt": "#451A03" } },
  vinho: { label: "Vinho Litúrgico", swatch: "#9F1239", vars: { "--brand": "#9F1239", "--brand-deep": "#4C0519", "--brand-ink": "#3B0715", "--brand-dark": "#BE123C", "--brand-light": "#FDA4AF", "--brand-subtle": "#FFF1F2", "--accent": "#D4A72C", "--yellow": "#D4A72C", "--bg": "#FFF7F5", "--bg-alt": "#4C0519" } },
  azulMariano: { label: "Azul Mariano", swatch: "#1E3A8A", vars: { "--brand": "#1E3A8A", "--brand-deep": "#172554", "--brand-ink": "#0F1D4D", "--brand-dark": "#3B82F6", "--brand-light": "#BFDBFE", "--brand-subtle": "#EFF6FF", "--accent": "#9F1239", "--yellow": "#D4A72C", "--bg": "#F7FAFF", "--bg-alt": "#172554" } },
  verdeEsperanca: { label: "Verde Esperança", swatch: "#166534", vars: { "--brand": "#166534", "--brand-deep": "#14532D", "--brand-ink": "#052E16", "--brand-dark": "#22C55E", "--brand-light": "#BBF7D0", "--brand-subtle": "#F0FDF4", "--accent": "#9F1239", "--yellow": "#D4A72C", "--bg": "#F7FCF7", "--bg-alt": "#14532D" } },
}

export function PaletteSwitcher() {
  const [active, setActive] = useState<PaletteKey>("pergaminho")
  const [open, setOpen] = useState(false)

  function applyPalette(key: PaletteKey) {
    const root = document.getElementById("offer-root")
    if (!root) return
    Object.entries(PALETTES[key].vars).forEach(([property, value]) => root.style.setProperty(property, value))
    setActive(key)
  }

  return (
    <div style={{ position: "fixed", bottom: 24, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, fontFamily: "'Manrope', sans-serif" }}>
      {open && (
        <div style={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 14, padding: "14px", display: "flex", flexDirection: "column", gap: 6, boxShadow: "0 12px 32px rgba(15,23,42,.35)", minWidth: 230, maxHeight: "70vh", overflowY: "auto" }}>
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
