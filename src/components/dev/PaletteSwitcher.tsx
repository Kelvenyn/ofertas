"use client"

import { useState } from "react"

type PaletteKey = "verde" | "turquesa" | "azul" | "indigo" | "roxo" | "coral" | "laranja" | "dourado" | "grafite" | "marinho"

type Palette = { label: string; swatch: string; vars: Record<string, string> }

// Os CTAs e ícones de checklist usam as variáveis verdes da oferta e não entram aqui.
const PALETTES: Record<PaletteKey, Palette> = {
  verde: { label: "Verde Energia", swatch: "#059669", vars: { "--brand": "#059669", "--brand-deep": "#047857", "--brand-ink": "#065F46", "--brand-dark": "#10B981", "--brand-light": "#6EE7B7", "--brand-subtle": "#D1FAE5", "--accent": "#0EA5E9", "--yellow": "#FACC15", "--bg": "#ECFDF5", "--bg-alt": "#16A34A" } },
  turquesa: { label: "Turquesa Profissional", swatch: "#0E7490", vars: { "--brand": "#0E7490", "--brand-deep": "#155E75", "--brand-ink": "#164E63", "--brand-dark": "#06B6D4", "--brand-light": "#67E8F9", "--brand-subtle": "#CFFAFE", "--accent": "#F97316", "--yellow": "#FACC15", "--bg": "#ECFEFF", "--bg-alt": "#0E7490" } },
  azul: { label: "Azul Saúde", swatch: "#2563EB", vars: { "--brand": "#2563EB", "--brand-deep": "#1D4ED8", "--brand-ink": "#1E3A8A", "--brand-dark": "#60A5FA", "--brand-light": "#93C5FD", "--brand-subtle": "#DBEAFE", "--accent": "#F97316", "--yellow": "#FDE047", "--bg": "#EFF6FF", "--bg-alt": "#2563EB" } },
  indigo: { label: "Índigo Ativo", swatch: "#4F46E5", vars: { "--brand": "#4F46E5", "--brand-deep": "#4338CA", "--brand-ink": "#312E81", "--brand-dark": "#818CF8", "--brand-light": "#A5B4FC", "--brand-subtle": "#E0E7FF", "--accent": "#F59E0B", "--yellow": "#FDE047", "--bg": "#EEF2FF", "--bg-alt": "#4F46E5" } },
  roxo: { label: "Roxo Movimento", swatch: "#7C3AED", vars: { "--brand": "#7C3AED", "--brand-deep": "#6D28D9", "--brand-ink": "#4C1D95", "--brand-dark": "#A78BFA", "--brand-light": "#C4B5FD", "--brand-subtle": "#EDE9FE", "--accent": "#F97316", "--yellow": "#FDE047", "--bg": "#FAF5FF", "--bg-alt": "#7C3AED" } },
  coral: { label: "Coral Vitalidade", swatch: "#E11D48", vars: { "--brand": "#E11D48", "--brand-deep": "#BE123C", "--brand-ink": "#881337", "--brand-dark": "#FB7185", "--brand-light": "#FDA4AF", "--brand-subtle": "#FFE4E6", "--accent": "#0EA5E9", "--yellow": "#FACC15", "--bg": "#FFF1F2", "--bg-alt": "#E11D48" } },
  laranja: { label: "Laranja Solar", swatch: "#EA580C", vars: { "--brand": "#EA580C", "--brand-deep": "#C2410C", "--brand-ink": "#9A3412", "--brand-dark": "#FB923C", "--brand-light": "#FDBA74", "--brand-subtle": "#FFEDD5", "--accent": "#0EA5E9", "--yellow": "#FACC15", "--bg": "#FFF7ED", "--bg-alt": "#EA580C" } },
  dourado: { label: "Dourado Ativo", swatch: "#CA8A04", vars: { "--brand": "#CA8A04", "--brand-deep": "#A16207", "--brand-ink": "#713F12", "--brand-dark": "#EAB308", "--brand-light": "#FDE047", "--brand-subtle": "#FEF9C3", "--accent": "#EA580C", "--yellow": "#FACC15", "--bg": "#FEFCE8", "--bg-alt": "#CA8A04" } },
  grafite: { label: "Grafite & Lima", swatch: "#334155", vars: { "--brand": "#334155", "--brand-deep": "#1E293B", "--brand-ink": "#0F172A", "--brand-dark": "#64748B", "--brand-light": "#94A3B8", "--brand-subtle": "#E2E8F0", "--accent": "#65A30D", "--yellow": "#FACC15", "--bg": "#F8FAFC", "--bg-alt": "#334155" } },
  marinho: { label: "Azul Marinho", swatch: "#1E3A8A", vars: { "--brand": "#1E3A8A", "--brand-deep": "#172554", "--brand-ink": "#0F1D4D", "--brand-dark": "#3B82F6", "--brand-light": "#93C5FD", "--brand-subtle": "#DBEAFE", "--accent": "#06B6D4", "--yellow": "#FACC15", "--bg": "#F0F7FF", "--bg-alt": "#1E3A8A" } },
}

export function PaletteSwitcher() {
  const [active, setActive] = useState<PaletteKey>("verde")
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
