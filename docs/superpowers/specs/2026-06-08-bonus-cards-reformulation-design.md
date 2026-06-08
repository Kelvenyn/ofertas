# Design: Bonus Cards Reformulation

## Context

The bonus cards need a complete visual overhaul to improve readability, accessibility, and visual appeal. The current blue gradient cards with diagonal stripes are being replaced with a cleaner white card design with better text hierarchy.

## Design Decisions

### 1. Top Badge (Replacing Stripe)

**Current:** Diagonal stripe "BÔNUS #1" rotated 45° at top-right corner.

**New:** Centered pill badge at top edge, half outside card, half over image.

```css
.bon-new-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #FFFFFF;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 10;
  animation: bon-badge-float 2s ease-in-out infinite;
}

@keyframes bon-badge-float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-4px); }
}
```

### 2. Title Pill with Dashed Border

**Current:** Green solid pill background.

**New:** Light green background with darker green dashed border. Text must fit in one line.

```css
.bon-new-pill-title {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 999px;
  background: #d1fae5;
  border: 2px dashed #059669;
  color: #047857;
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
}
```

### 3. White Card with Shadows

**Current:** Blue gradient background (#0ea5e9 → #0284c7).

**New:** White background with subtle shadows and accessible text colors.

```css
.bon-new-card {
  background: #FFFFFF;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: box-shadow .35s ease;
}

.bon-new-card:hover {
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}
```

**Text colors:**
- Description: #4b5563 (gray)
- Price: #047857 (dark green)
- Timer: #059669 (green) with glow animation

### 4. Timer Animation

**Current:** Static white text at 55% opacity.

**New:** Pulsing opacity + subtle green glow.

```css
@keyframes bon-timer-glow {
  0%, 100% { 
    opacity: 0.6;
    text-shadow: none;
  }
  50% { 
    opacity: 1;
    text-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
  }
}

.bon-new-timer-text {
  animation: bon-timer-glow 2s ease-in-out infinite;
  color: #059669;
}
```

### 5. Color and Weight Adjustments

| Element | Before | After |
|---|---|---|
| Card background | Blue gradient | White #FFFFFF |
| Card border | Blue transparent | Gray #e5e7eb |
| Card shadow | Blue tinted | Black subtle |
| Title pill | Green solid | Light green + dashed border |
| Description | White 75% | Gray #4b5563 |
| Price | White | Dark green #047857 |
| Timer | White 55% | Green #059669 with glow |
| Badge | Orange stripe | Orange floating pill |

## Files to Modify

1. `src/app/globals.css` — Replace all `.bon-new-*` styles with new white card design
2. `src/components/ui/FlipCard.tsx` — Replace stripe with badge, update class names

## Out of Scope

- Changes to card flip behavior or animations
- Changes to other sections
- Changes to data structure (titleBreak field stays)

## Verification

1. Run `npm run build` — no errors
2. Visual check on live site:
   - Cards have white background with subtle shadows
   - Badge "BÔNUS #1" floats at top center with animation
   - Title pill has green dashed border, text in one line
   - Timer text pulses and glows
   - All text is readable (accessible contrast)
