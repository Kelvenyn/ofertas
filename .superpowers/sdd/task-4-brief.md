# Task 4: PaletteSwitcher — Add 3 New Palettes

**Files:**
- Modify: `src/components/dev/PaletteSwitcher.tsx`

**Goal:** Update PaletteSwitcher to include 3 new psicopedagogia color schemes (D, E, F) alongside the existing 4 (atual, A, B, C).

**Context:** This is the only Task that modifies an existing file. The type `PaletteKey` must be updated first, then the 3 new palettes added to the `PALETTES` record.

**Steps:**
1. Change `type PaletteKey = "atual" | "a" | "b" | "c"` to include ` | "d" | "e" | "f"`
2. Add 3 new palette entries (d, e, f) to the `PALETTES` record after the `c: {` block
3. Run `npx tsc --noEmit src/components/dev/PaletteSwitcher.tsx` to verify

## Palette Code to Add (after closing `}` of the `c:` entry, before the closing `}` of PALETTES)

```typescript
  d: {
    label: "D — Azul Petróleo & Coral",
    swatch: "#0D4F4F",
    vars: {
      "--brand": "#0D4F4F",
      "--brand-deep": "#0A3D3D",
      "--brand-ink": "#062B2B",
      "--brand-dark": "#126161",
      "--brand-light": "#7AB8B8",
      "--brand-subtle": "#E0F0F0",
      "--cta": "#16A34A",
      "--cta-deep": "#11863D",
      "--cta-darkest": "#0E6B31",
      "--accent": "#E8634A",
      "--yellow": "#F0B040",
      "--bg": "#F5F8F0",
      "--bg-alt": "#E8634A",
    },
  },
  e: {
    label: "E — Verde Menta & Lilás",
    swatch: "#2D5A4B",
    vars: {
      "--brand": "#2D5A4B",
      "--brand-deep": "#214336",
      "--brand-ink": "#172E25",
      "--brand-dark": "#3A705E",
      "--brand-light": "#8DB8A8",
      "--brand-subtle": "#E6F0EC",
      "--cta": "#16A34A",
      "--cta-deep": "#11863D",
      "--cta-darkest": "#0E6B31",
      "--accent": "#9B59B6",
      "--yellow": "#E8A040",
      "--bg": "#F5F8F8",
      "--bg-alt": "#9B59B6",
    },
  },
  f: {
    label: "F — Rosa Antigo & Terracota",
    swatch: "#8C4A5A",
    vars: {
      "--brand": "#8C4A5A",
      "--brand-deep": "#6E3847",
      "--brand-ink": "#502735",
      "--brand-dark": "#A85A6E",
      "--brand-light": "#D4A0B0",
      "--brand-subtle": "#F2E4E8",
      "--cta": "#16A34A",
      "--cta-deep": "#11863D",
      "--cta-darkest": "#0E6B31",
      "--accent": "#C0734A",
      "--yellow": "#E8A040",
      "--bg": "#FFF5F5",
      "--bg-alt": "#C0734A",
    },
  },
```
