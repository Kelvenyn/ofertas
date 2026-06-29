# Config Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace PaletteSwitcher with a richer ConfigPanel that lets the user customize palette, marquee, titles, and CTAs via a floating UI, then export a JSON config.

**Architecture:** A single `ConfigPanel` client component with inline styles, reading from `useOffer()` for initial values and managing local state for edits. Palette changes apply CSS vars live; text changes show a modified indicator. "Gerar Config" outputs JSON to a textarea for copying.

**Tech Stack:** React, Next.js, TypeScript, CSS custom properties

## Global Constraints

- Follow existing PaletteSwitcher pattern (inline styles, floating position)
- Read values from `useOffer()` context
- CTA color always stays green regardless of palette
- Only modify files listed below

---

### Task 1: Create ConfigPanel component

**Files:**
- Create: `src/components/dev/ConfigPanel.tsx`

**Interfaces:**
- Consumes: `useOffer()` from `@/context/offer-context` (returns full OfferConfig)
- Produces: Exported `ConfigPanel` function component (no props)
- Uses: `PALETTES` map (same as PaletteSwitcher — can be reused/inlined)

- [ ] **Step 1: Define palette data and types at top of file**

Insert at top of `src/components/dev/ConfigPanel.tsx`:

```typescript
"use client"

import { useState, useCallback } from "react"
import { useOffer } from "@/context/offer-context"

type PaletteKey = "atual" | "a" | "b" | "c" | "d" | "e" | "f"

const PALETTES: Record<PaletteKey, { label: string; swatch: string; vars: Record<string, string> }> = {
  atual: {
    label: "Atual",
    swatch: "#0A1F44",
    vars: {
      "--brand": "#0A1F44", "--brand-deep": "#081733", "--brand-ink": "#061226",
      "--brand-dark": "#1A2F54", "--brand-light": "#B0B8C7", "--brand-subtle": "#E4E6EB",
      "--cta": "#16A34A", "--cta-deep": "#11863D", "--cta-darkest": "#0E6B31",
      "--accent": "#E11D2E", "--yellow": "#FFC107", "--bg": "#FFF8E8", "--bg-alt": "#FFC107",
    },
  },
  a: {
    label: "A — Vinho & Ouro",
    swatch: "#4A0E1A",
    vars: {
      "--brand": "#4A0E1A", "--brand-deep": "#3A0A14", "--brand-ink": "#2A0610",
      "--brand-dark": "#5D1522", "--brand-light": "#C4818F", "--brand-subtle": "#F5E8EB",
      "--cta": "#16A34A", "--cta-deep": "#11863D", "--cta-darkest": "#0E6B31",
      "--accent": "#C8860A", "--yellow": "#F5C518", "--bg": "#FEF5EC", "--bg-alt": "#F5C518",
    },
  },
  b: {
    label: "B — Azul Royal",
    swatch: "#1A3A6B",
    vars: {
      "--brand": "#1A3A6B", "--brand-deep": "#142F58", "--brand-ink": "#0D2040",
      "--brand-dark": "#244580", "--brand-light": "#8EA8D0", "--brand-subtle": "#E8EDF6",
      "--cta": "#16A34A", "--cta-deep": "#11863D", "--cta-darkest": "#0E6B31",
      "--accent": "#C0392B", "--yellow": "#F0C040", "--bg": "#F5F7FF", "--bg-alt": "#F0C040",
    },
  },
  c: {
    label: "C — Verde Musgo",
    swatch: "#2D5016",
    vars: {
      "--brand": "#2D5016", "--brand-deep": "#22400F", "--brand-ink": "#182E0A",
      "--brand-dark": "#3A6520", "--brand-light": "#8AB06A", "--brand-subtle": "#EBF2E4",
      "--cta": "#16A34A", "--cta-deep": "#11863D", "--cta-darkest": "#0E6B31",
      "--accent": "#C0521A", "--yellow": "#E8A020", "--bg": "#FBF6EE", "--bg-alt": "#E8A020",
    },
  },
  d: {
    label: "D — Azul Bebê",
    swatch: "#0EA5E9",
    vars: {
      "--brand": "#0EA5E9", "--brand-deep": "#0284C7", "--brand-ink": "#0369A1",
      "--brand-dark": "#38BDF8", "--brand-light": "#7DD3FC", "--brand-subtle": "#E0F2FE",
      "--cta": "#16A34A", "--cta-deep": "#11863D", "--cta-darkest": "#0E6B31",
      "--accent": "#F59E0B", "--yellow": "#FBBF24", "--bg": "#F0F9FF", "--bg-alt": "#F59E0B",
    },
  },
  e: {
    label: "E — Verde Folha",
    swatch: "#059669",
    vars: {
      "--brand": "#059669", "--brand-deep": "#047857", "--brand-ink": "#065F46",
      "--brand-dark": "#10B981", "--brand-light": "#6EE7B7", "--brand-subtle": "#D1FAE5",
      "--cta": "#16A34A", "--cta-deep": "#11863D", "--cta-darkest": "#0E6B31",
      "--accent": "#F97316", "--yellow": "#FBBF24", "--bg": "#ECFDF5", "--bg-alt": "#F97316",
    },
  },
  f: {
    label: "F — Laranja & Amarelo",
    swatch: "#EA580C",
    vars: {
      "--brand": "#EA580C", "--brand-deep": "#D24D09", "--brand-ink": "#B04007",
      "--brand-dark": "#F97316", "--brand-light": "#FB923C", "--brand-subtle": "#FFEDD5",
      "--cta": "#16A34A", "--cta-deep": "#11863D", "--cta-darkest": "#0E6B31",
      "--accent": "#EAB308", "--yellow": "#FACC15", "--bg": "#FFF7ED", "--bg-alt": "#EAB308",
    },
  },
}

const GRADIENTS: Record<string, string> = {
  "Padrão (da paleta)": "",
  "Azul para Verde": "linear-gradient(90deg, #0EA5E9 0%, #16A34A 100%)",
  "Roxo para Rosa": "linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)",
  "Laranja para Amarelo": "linear-gradient(90deg, #F97316 0%, #EAB308 100%)",
  "Verde para Teal": "linear-gradient(90deg, #059669 0%, #0D9488 100%)",
}
```

- [ ] **Step 2: Write the component function with state and handlers**

After the constants, add:

```typescript
export function ConfigPanel() {
  const offer = useOffer()

  const [open, setOpen] = useState(false)
  const [activePalette, setActivePalette] = useState<PaletteKey>("d")
  const [values, setValues] = useState({
    marqueeText: offer.hero.marqueeText,
    marqueeGradient: "Padrão (da paleta)",
    heroCta: offer.hero.ctaText,
    heroTitle1: offer.hero.titleLine1,
    heroTitle2: offer.hero.titleLine2,
    urgencyCta: offer.urgency.ctaText,
  })
  const [generated, setGenerated] = useState<string | null>(null)

  const original = {
    marqueeText: offer.hero.marqueeText,
    heroCta: offer.hero.ctaText,
    heroTitle1: offer.hero.titleLine1,
    heroTitle2: offer.hero.titleLine2,
    urgencyCta: offer.urgency.ctaText,
  }

  function applyPalette(key: PaletteKey) {
    const el = document.getElementById("offer-root")
    if (!el) return
    const vars = PALETTES[key].vars
    Object.entries(vars).forEach(([prop, val]) => el.style.setProperty(prop, val))
    setActivePalette(key)
  }

  function setVal<K extends keyof typeof values>(key: K, val: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [key]: val }))
  }

  function isModified(key: keyof typeof original): boolean {
    return values[key as keyof typeof values] !== original[key]
  }

  const generateConfig = useCallback(() => {
    const paletteVars = PALETTES[activePalette].vars
    const config = {
      palette: {
        brand: paletteVars["--brand"],
        brandDeep: paletteVars["--brand-deep"],
        brandInk: paletteVars["--brand-ink"],
        brandDark: paletteVars["--brand-dark"],
        brandLight: paletteVars["--brand-light"],
        brandSubtle: paletteVars["--brand-subtle"],
        cta: paletteVars["--cta"],
        ctaDeep: paletteVars["--cta-deep"],
        ctaDarkest: paletteVars["--cta-darkest"],
        accent: paletteVars["--accent"],
        yellow: paletteVars["--yellow"],
        bg: paletteVars["--bg"],
        bgAlt: paletteVars["--bg-alt"],
      },
      hero: {
        titleLine1: values.heroTitle1,
        titleLine2: values.heroTitle2,
        ctaText: values.heroCta,
      },
      marqueeText: values.marqueeText,
      marqueeGradient: values.marqueeGradient === "Padrão (da paleta)"
        ? offer.hero.marqueeGradient
        : GRADIENTS[values.marqueeGradient],
      urgencyCtaText: values.urgencyCta,
    }
    setGenerated(JSON.stringify(config, null, 2))
  }, [activePalette, values, offer.hero.marqueeGradient])

  function copyToClipboard() {
    if (generated) navigator.clipboard.writeText(generated)
  }
```

- [ ] **Step 3: Write the JSX return with inline styles**

Continue with:

```typescript
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #444",
    background: "#222",
    color: "#fff",
    fontSize: 13,
    fontFamily: "'Manrope', sans-serif",
    outline: "none",
    boxSizing: "border-box",
  }

  const labelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 600,
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 4,
  }

  const modifiedBadge: React.CSSProperties = {
    color: "#22c55e",
    fontSize: 14,
    fontWeight: 700,
  }

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 20, zIndex: 9999,
      display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8,
      fontFamily: "'Manrope', sans-serif",
    }}>
      {open && (
        <div style={{
          background: "#1a1a1a", border: "1px solid #333", borderRadius: 12,
          padding: 16, width: 300, maxHeight: "80vh", overflowY: "auto",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}>
          <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700, color: "#fff" }}>
            Personalizar Landing
          </p>

          {/* Palette */}
          <label style={labelStyle}>Paleta</label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {(Object.keys(PALETTES) as PaletteKey[]).map((key) => {
              const p = PALETTES[key]
              return (
                <button key={key} onClick={() => applyPalette(key)} title={p.label}
                  style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: p.swatch, border: activePalette === key ? "2px solid #fff" : "2px solid #555",
                    cursor: "pointer", position: "relative",
                  }}
                >
                  {activePalette === key && (
                    <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}>✓</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Marquee Text */}
          <label style={labelStyle}>
            Texto do Marquee
            {isModified("marqueeText") && <span style={modifiedBadge}>✓</span>}
          </label>
          <input style={inputStyle} value={values.marqueeText}
            onChange={(e) => setVal("marqueeText", e.target.value)}
            placeholder="15 Perfis • Atividade-guia • ..." />

          {/* Marquee Gradient */}
          <label style={{ ...labelStyle, marginTop: 12 }}>
            Gradiente do Marquee
            {isModified("marqueeGradient" as any) && <span style={modifiedBadge}>✓</span>}
          </label>
          <select style={inputStyle} value={values.marqueeGradient}
            onChange={(e) => setVal("marqueeGradient", e.target.value)}>
            {Object.keys(GRADIENTS).map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          {/* Hero CTA */}
          <label style={{ ...labelStyle, marginTop: 12 }}>
            CTA do Hero
            {isModified("heroCta") && <span style={modifiedBadge}>✓</span>}
          </label>
          <input style={inputStyle} value={values.heroCta}
            onChange={(e) => setVal("heroCta", e.target.value)}
            placeholder="QUERO O MAPA" />

          {/* Hero Title 1 */}
          <label style={{ ...labelStyle, marginTop: 12 }}>
            Título Linha 1
            {isModified("heroTitle1") && <span style={modifiedBadge}>✓</span>}
          </label>
          <input style={inputStyle} value={values.heroTitle1}
            onChange={(e) => setVal("heroTitle1", e.target.value)}
            placeholder="Mapa de Perfil Infantil" />

          {/* Hero Title 2 */}
          <label style={{ ...labelStyle, marginTop: 12 }}>
            Título Linha 2
            {isModified("heroTitle2") && <span style={modifiedBadge}>✓</span>}
          </label>
          <input style={inputStyle} value={values.heroTitle2}
            onChange={(e) => setVal("heroTitle2", e.target.value)}
            placeholder="para psicopedagogas iniciantes" />

          {/* Urgency CTA */}
          <label style={{ ...labelStyle, marginTop: 12 }}>
            CTA da Urgência
            {isModified("urgencyCta") && <span style={modifiedBadge}>✓</span>}
          </label>
          <input style={inputStyle} value={values.urgencyCta}
            onChange={(e) => setVal("urgencyCta", e.target.value)}
            placeholder="QUERO ACESSAR AGORA" />

          {/* Generate button */}
          <button onClick={generateConfig}
            style={{
              width: "100%", marginTop: 16, padding: "10px 0",
              borderRadius: 8, border: "none",
              background: "linear-gradient(135deg, #16A34A, #059669)",
              color: "#fff", fontSize: 14, fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.02em",
            }}>
            Gerar Config
          </button>

          {/* Output */}
          {generated && (
            <>
              <textarea readOnly value={generated}
                style={{
                  width: "100%", marginTop: 12, padding: 10,
                  borderRadius: 6, border: "1px solid #444",
                  background: "#111", color: "#22c55e",
                  fontSize: 11, fontFamily: "'Menlo', monospace",
                  minHeight: 200, resize: "vertical", boxSizing: "border-box",
                }} />
              <button onClick={copyToClipboard}
                style={{
                  width: "100%", marginTop: 8, padding: "8px 0",
                  borderRadius: 8, border: "1px solid #555",
                  background: "transparent", color: "#fff",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}>
                Copiar
              </button>
            </>
          )}
        </div>
      )}

      <button onClick={() => setOpen((o) => !o)} title="Personalizar landing"
        style={{
          width: 48, height: 48, borderRadius: "50%",
          background: "#1a1a1a", border: "2px solid #444",
          cursor: "pointer", display: "flex", alignItems: "center",
          justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          fontSize: 20, transition: "transform 150ms",
        }}>
        ⚙️
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Verify the file compiles**

Run: `cmd.exe /c "npm run build"`
Expected: Compiled successfully, no errors

- [ ] **Step 5: Commit**

```bash
git add src/components/dev/ConfigPanel.tsx
git commit -m "feat: create ConfigPanel component with palette, text, and gradient controls"
```

---

### Task 2: Wire ConfigPanel into psicopedagogia page

**Files:**
- Modify: `src/app/psicopedagogia/page.tsx`

**Interfaces:**
- Consumes: `ConfigPanel` from `@/components/dev/ConfigPanel`

- [ ] **Step 1: Replace PaletteSwitcher import with ConfigPanel**

In `src/app/psicopedagogia/page.tsx`, change:
```typescript
import { PaletteSwitcher } from "@/components/dev/PaletteSwitcher"
```
to:
```typescript
import { ConfigPanel } from "@/components/dev/ConfigPanel"
```

- [ ] **Step 2: Replace PaletteSwitcher usage with ConfigPanel**

Change `<PaletteSwitcher />` to `<ConfigPanel />` at the bottom of the JSX.

- [ ] **Step 3: Build to verify**

Run: `cmd.exe /c "npm run build"`
Expected: Compiled successfully, no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/psicopedagogia/page.tsx
git commit -m "feat: replace PaletteSwitcher with ConfigPanel on psicopedagogia page"
```
