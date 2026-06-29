# Config Panel — Visual Customization Tool

## Goal
Replace the existing `PaletteSwitcher` with a richer floating panel that lets the user customize key offer elements visually and export a JSON config for me to apply to `offer.ts`.

## Architecture

### Component: `ConfigPanel` (`src/components/dev/ConfigPanel.tsx`)
- Client component ("use client")
- Floating panel fixed to bottom-right (z-index 9999)
- Toggle button to show/hide the panel
- Reads current offer values from `useOffer()` context
- Uses local `useState` for edited values
- On "Gerar Config", outputs a JSON string to a textarea
- "Copiar" button copies the JSON to clipboard

### State Shape
```typescript
interface ConfigState {
  palette: PaletteKey  // "atual" | "a" | "b" | "c" | "d" | "e" | "f"
  marqueeText: string
  marqueeGradient: GradientKey  // predefined gradients
  heroCta: string
  heroTitle1: string
  heroTitle2: string
  urgencyCta: string
}
```

### Controls (6 items)

| Control | Type | Live Preview | Marks as changed? |
|---|---|---|---|
| Palette | 7 radio swatches | ✅ CSS vars | Shows active dot |
| Marquee Text | text input | ❌ | ✓ icon when differs from original |
| Marquee Gradient | dropdown (5 options) | ❌ | ✓ icon when differs from original |
| Hero CTA | text input | ❌ | ✓ icon when differs from original |
| Hero Title 1 | text input | ❌ | ✓ icon when differs from original |
| Hero Title 2 | text input | ❌ | ✓ icon when differs from original |
| Urgency CTA | text input | ❌ | ✓ icon when differs from original |

### Gradient Presets
1. **Padrão (da paleta)** — auto, computed from palette brand color
2. **Azul para Verde** — `linear-gradient(90deg, #0EA5E9 0%, #16A34A 100%)`
3. **Roxo para Rosa** — `linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)`
4. **Laranja para Amarelo** — `linear-gradient(90deg, #F97316 0%, #EAB308 100%)`
5. **Verde para Teal** — `linear-gradient(90deg, #059669 0%, #0D9488 100%)`

### Output Format
```json
{
  "palette": { "brand": "#0EA5E9", "brandDeep": "#0284C7", ... },
  "hero": { "titleLine1": "...", "titleLine2": "...", "ctaText": "..." },
  "marqueeText": "...",
  "marqueeGradient": "linear-gradient(...)",
  "urgencyCtaText": "..."
}
```

### Key Behaviors
1. **Palette change** applies CSS vars immediately on `#offer-root`
2. **Text inputs** are pre-filled with current values from `useOffer()`
3. **"Modified" indicator** (✓) appears when the field value differs from the original
4. **"Gerar Config"** button is always enabled; generates JSON from current state
5. **"Copiar"** button appears only after config is generated
6. After copying, panel stays visible for further tweaks
7. Panel can be closed by clicking the toggle button again

### Files to Create
- `src/components/dev/ConfigPanel.tsx` — main component (replaces PaletteSwitcher)

### Files to Modify
- `src/app/psicopedagogia/page.tsx` — replace `PaletteSwitcher` import/usage with `ConfigPanel`
- `src/components/dev/PaletteSwitcher.tsx` — can be kept or deleted (no longer imported)

### Non-Goals
- No server-side persistence
- No admin backend
- No image upload
- No CSS variable generation beyond palette
