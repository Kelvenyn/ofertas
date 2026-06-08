# Design: Bonus Cards Visual Refresh

## Context

The bonus cards on the Pixel Art Bíblico landing page need visual improvements:
1. The current blue background (#1B4D8F) feels flat and dated
2. Long titles break awkwardly in the pill badges
3. The "BÔNUS #1" stripe is not prominent enough

## Design Decisions

### 1. Card Background Color

**Current:** `--card-dark: #1B4D8F` (flat blue)

**New:**
```css
--card-dark: #0ea5e9;

.bon-new-card {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  border: 1px solid rgba(14, 165, 233, 0.3);
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.25);
}
```

**Rationale:** Vibrant blue (#0ea5e9) harmonizes with the green CTA (#10b981) on the blue-green spectrum. The gradient adds depth without complexity.

### 2. Title Line Breaks

**Current:** Titles render as single strings, breaking naturally at word boundaries.

**New:** Force line breaks at logical points using `<br />` tags.

| Original Title | With Line Break |
|---|---|
| Mapas Mentais do Antigo Testamento | Mapas Mentais do\<br\>Antigo Testamento |
| Mapas Mentais do Novo Testamento | Mapas Mentais do\<br\>Novo Testamento |
| Colorir com os Salmos | Colorir com os\<br\>Salmos |
| Colorir com os Provérbios | Colorir com os\<br\>Provérbios |
| Planner de Leitura Bíblica | Planner de\<br\>Leitura Bíblica |
| Marcadores de Abas Bíblicas | Marcadores de\<br\>Abas Bíblicas |

**Implementation:** Add `titleBreak` field to bonus items in `offer.ts`. Update `FlipCard.tsx` to render the break.

### 3. Stripe Visibility

**Current:**
```css
.bon-new-stripe {
  background: var(--cta);  /* green */
  font-size: 11px;
  box-shadow: 0 2px 12px rgba(16, 185, 129, 0.5);
}
```

**New:**
```css
.bon-new-stripe {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  font-size: 12px;
  font-weight: 900;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding: 6px 40px;
}
```

**Rationale:** Orange (#f59e0b) contrasts strongly with the blue card background (complementary colors). Larger font, heavier weight, and stronger shadow make the badge unmissable.

## Files to Modify

1. `src/app/globals.css` — Update `--card-dark`, `.bon-new-card`, `.bon-new-stripe` styles
2. `src/config/offer.ts` — Add `titleBreak` field to each bonus item
3. `src/components/ui/FlipCard.tsx` — Render `titleBreak` as `<br />` in pill title

## Out of Scope

- Changes to card layout or flip behavior
- Changes to other sections
- New animations or interactions

## Verification

1. Run `npm run build` — no errors
2. Visual check on live site:
   - Cards have vibrant blue gradient background
   - Titles break at logical points
   - Orange stripe is prominent on all cards
