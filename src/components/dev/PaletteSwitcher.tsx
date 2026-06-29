"use client"

import { useState } from "react"

type PaletteKey = "atual" | "a" | "b" | "c" | "d" | "e" | "f"

const PALETTES: Record<PaletteKey, { label: string; swatch: string; vars: Record<string, string> }> = {
  atual: {
    label: "Atual",
    swatch: "#0A1F44",
    vars: {
      "--brand": "#0A1F44",
      "--brand-deep": "#081733",
      "--brand-ink": "#061226",
      "--brand-dark": "#1A2F54",
      "--brand-light": "#B0B8C7",
      "--brand-subtle": "#E4E6EB",
      "--cta": "#16A34A",
      "--cta-deep": "#11863D",
      "--cta-darkest": "#0E6B31",
      "--accent": "#E11D2E",
      "--yellow": "#FFC107",
      "--bg": "#FFF8E8",
      "--bg-alt": "#FFC107",
    },
  },
  a: {
    label: "A — Vinho & Ouro",
    swatch: "#4A0E1A",
    vars: {
      "--brand": "#4A0E1A",
      "--brand-deep": "#3A0A14",
      "--brand-ink": "#2A0610",
      "--brand-dark": "#5D1522",
      "--brand-light": "#C4818F",
      "--brand-subtle": "#F5E8EB",
      "--cta": "#16A34A",
      "--cta-deep": "#11863D",
      "--cta-darkest": "#0E6B31",
      "--accent": "#C8860A",
      "--yellow": "#F5C518",
      "--bg": "#FEF5EC",
      "--bg-alt": "#F5C518",
    },
  },
  b: {
    label: "B — Azul Royal",
    swatch: "#1A3A6B",
    vars: {
      "--brand": "#1A3A6B",
      "--brand-deep": "#142F58",
      "--brand-ink": "#0D2040",
      "--brand-dark": "#244580",
      "--brand-light": "#8EA8D0",
      "--brand-subtle": "#E8EDF6",
      "--cta": "#16A34A",
      "--cta-deep": "#11863D",
      "--cta-darkest": "#0E6B31",
      "--accent": "#C0392B",
      "--yellow": "#F0C040",
      "--bg": "#F5F7FF",
      "--bg-alt": "#F0C040",
    },
  },
  c: {
    label: "C — Verde Musgo",
    swatch: "#2D5016",
    vars: {
      "--brand": "#2D5016",
      "--brand-deep": "#22400F",
      "--brand-ink": "#182E0A",
      "--brand-dark": "#3A6520",
      "--brand-light": "#8AB06A",
      "--brand-subtle": "#EBF2E4",
      "--cta": "#16A34A",
      "--cta-deep": "#11863D",
      "--cta-darkest": "#0E6B31",
      "--accent": "#C0521A",
      "--yellow": "#E8A020",
      "--bg": "#FBF6EE",
      "--bg-alt": "#E8A020",
    },
  },
  d: {
    label: "D — Índigo & Coral",
    swatch: "#1E3A8A",
    vars: {
      "--brand": "#1E3A8A",
      "--brand-deep": "#172E6B",
      "--brand-ink": "#0F2050",
      "--brand-dark": "#2E4FA3",
      "--brand-light": "#8BA4D8",
      "--brand-subtle": "#E0E9F8",
      "--cta": "#F43F5E",
      "--cta-deep": "#E11D48",
      "--cta-darkest": "#BE123C",
      "--accent": "#F59E0B",
      "--yellow": "#FBBF24",
      "--bg": "#F5F7FF",
      "--bg-alt": "#F43F5E",
    },
  },
  e: {
    label: "E — Esmeralda & Dourado",
    swatch: "#065F46",
    vars: {
      "--brand": "#065F46",
      "--brand-deep": "#064E3B",
      "--brand-ink": "#042F26",
      "--brand-dark": "#059669",
      "--brand-light": "#6EE7B7",
      "--brand-subtle": "#D1FAE5",
      "--cta": "#D97706",
      "--cta-deep": "#B45309",
      "--cta-darkest": "#92400E",
      "--accent": "#DC2626",
      "--yellow": "#FBBF24",
      "--bg": "#F0FDF4",
      "--bg-alt": "#D97706",
    },
  },
  f: {
    label: "F — Violeta & Tangerina",
    swatch: "#5B21B6",
    vars: {
      "--brand": "#5B21B6",
      "--brand-deep": "#4C1D95",
      "--brand-ink": "#3B1270",
      "--brand-dark": "#7C3AED",
      "--brand-light": "#A78BFA",
      "--brand-subtle": "#EDE9FE",
      "--cta": "#F97316",
      "--cta-deep": "#EA580C",
      "--cta-darkest": "#C2410C",
      "--accent": "#06B6D4",
      "--yellow": "#FACC15",
      "--bg": "#FAF5FF",
      "--bg-alt": "#F97316",
    },
  },
}

export function PaletteSwitcher() {
  const [active, setActive] = useState<PaletteKey>("atual")
  const [open, setOpen] = useState(false)

  function applyPalette(key: PaletteKey) {
    const el = document.getElementById("offer-root")
    if (!el) return
    const vars = PALETTES[key].vars
    Object.entries(vars).forEach(([prop, val]) => el.style.setProperty(prop, val))
    setActive(key)
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 8,
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {open && (
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: 12,
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            minWidth: 200,
          }}
        >
          <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#888", textTransform: "uppercase" }}>
            Paleta de Cores
          </p>
          {(Object.keys(PALETTES) as PaletteKey[]).map((key) => {
            const p = PALETTES[key]
            const isActive = active === key
            return (
              <button
                key={key}
                onClick={() => applyPalette(key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: isActive ? "1.5px solid #fff" : "1.5px solid transparent",
                  background: isActive ? "#2a2a2a" : "transparent",
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 400,
                  textAlign: "left",
                  width: "100%",
                  transition: "background 150ms",
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: p.swatch,
                    flexShrink: 0,
                    boxShadow: isActive ? `0 0 0 2px ${p.swatch}44` : "none",
                  }}
                />
                {p.label}
                {isActive && <span style={{ marginLeft: "auto", fontSize: 10, opacity: 0.6 }}>✓</span>}
              </button>
            )
          })}
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        title="Trocar paleta de cores"
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "#1a1a1a",
          border: "2px solid #444",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          fontSize: 20,
          transition: "transform 150ms",
        }}
      >
        🎨
      </button>
    </div>
  )
}
