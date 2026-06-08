# Bonus Cards Reformulation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace blue gradient bonus cards with white cards, centered floating badge, green dashed title pill, and timer glow animation.

**Architecture:** Two files change: CSS (complete style overhaul) and FlipCard component (stripe → badge, class name updates). No data structure changes.

**Tech Stack:** CSS custom properties, React, Next.js

---

### Task 1: Update CSS — White Card, Badge, Title Pill, Timer Animation

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update `.bon-new-card` styles**

Find lines 2410-2419:
```css
.bon-new-card {
  position: relative;
  border-radius: 20px;
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  border: 1px solid rgba(14, 165, 233, 0.3);
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.25);
  text-align: center;
  overflow: visible;
  transition: box-shadow .35s ease;
}
```

Replace with:
```css
.bon-new-card {
  position: relative;
  border-radius: 20px;
  background: #FFFFFF;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  text-align: center;
  overflow: visible;
  transition: box-shadow .35s ease;
}
```

- [ ] **Step 2: Update `.bon-new-card:hover` styles**

Find lines 2421-2425:
```css
@media (hover: hover) {
  .bon-new-card:hover {
    box-shadow: 0 12px 40px rgba(14, 165, 233, 0.35), 0 0 0 1px rgba(14, 165, 233, 0.3);
  }
}
```

Replace with:
```css
@media (hover: hover) {
  .bon-new-card:hover {
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  }
}
```

- [ ] **Step 3: Replace `.bon-new-stripe` with `.bon-new-badge`**

Find lines 2477-2497 (`.bon-new-stripe` and `.bon-new-stripe-text`):
```css
.bon-new-stripe { ... }
.bon-new-stripe-text { ... }
```

Replace with:
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
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .05em;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 10;
  white-space: nowrap;
  animation: bon-badge-float 2s ease-in-out infinite;
}

@keyframes bon-badge-float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-4px); }
}
```

- [ ] **Step 4: Update `.bon-new-touch-hint` color**

Find lines 2528-2534:
```css
.bon-new-touch-hint {
  margin: 0;
  padding: 10px 16px 0;
  font-size: 13px;
  line-height: 1.4;
  color: rgba(255,255,255,.6);
}
```

Replace with:
```css
.bon-new-touch-hint {
  margin: 0;
  padding: 10px 16px 0;
  font-size: 13px;
  line-height: 1.4;
  color: #9ca3af;
}
```

- [ ] **Step 5: Update `.bon-new-pill-title` styles**

Find lines 2548-2562:
```css
.bon-new-pill-title {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  border-radius: 999px;
  background: var(--cta);
  color: #FFFFFF;
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: .03em;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(16,185,129,.3);
}
```

Replace with:
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

- [ ] **Step 6: Update `.bon-new-desc` color**

Find lines 2564-2571:
```css
.bon-new-desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  color: rgba(255,255,255,.75);
  max-width: 280px;
}
```

Replace with:
```css
.bon-new-desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  color: #4b5563;
  max-width: 280px;
}
```

- [ ] **Step 7: Update `.bon-new-price` color**

Find lines 2573-2578:
```css
.bon-new-price {
  font-size: 20px;
  font-weight: 800;
  color: #FFFFFF;
  letter-spacing: -.02em;
}
```

Replace with:
```css
.bon-new-price {
  font-size: 22px;
  font-weight: 800;
  color: #047857;
  letter-spacing: -.02em;
}
```

- [ ] **Step 8: Update `.bon-new-timer-text` with animation**

Find lines 2593-2599:
```css
.bon-new-timer-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(255,255,255,.55);
}
```

Replace with:
```css
.bon-new-timer-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #059669;
  animation: bon-timer-glow 2s ease-in-out infinite;
}

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
```

- [ ] **Step 9: Update `.bon-new-pill-free` colors**

Find lines 2601-2615:
```css
.bon-new-pill-free {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--cta) 0%, var(--cta-deep) 100%);
  color: #FFFFFF;
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: .04em;
  text-transform: uppercase;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
}
```

Replace with:
```css
.bon-new-pill-free {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
  border-radius: 999px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #FFFFFF;
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: .04em;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}
```

- [ ] **Step 10: Remove `.bon-click-badge` styles**

Find and delete lines 2627-2655 (`.bon-click-badge`, `@keyframes bon-badge-fade-in`, and mobile override). These are no longer needed since we have the floating badge.

- [ ] **Step 11: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: reformulate bonus card CSS — white card, floating badge, green dashed title, timer glow"
```

---

### Task 2: Update FlipCard Component — Stripe to Badge

**Files:**
- Modify: `src/components/ui/FlipCard.tsx`

- [ ] **Step 1: Replace stripe with badge**

Find lines 85-89:
```tsx
<div className="bon-new-stripe">
  <span className="bon-new-stripe-text">
    <span aria-hidden="true">🎁</span> {labels.cardLabel} #{bonusNumber}
  </span>
</div>
```

Replace with:
```tsx
<div className="bon-new-badge">
  <span aria-hidden="true">🎁</span> {labels.cardLabel} #{bonusNumber}
</div>
```

- [ ] **Step 2: Remove unused state variables**

Find lines 21-22:
```tsx
const [showPulse, setShowPulse] = useState(false)
const [showBadge, setShowBadge] = useState(false)
```

Remove these two lines (pulse and badge are now CSS-only animations).

- [ ] **Step 3: Remove pulse/badge useEffect**

Find lines 29-41:
```tsx
useEffect(() => {
  if (!flipped) {
    setShowPulse(false)
    setShowBadge(false)
    const pulseTimer = setTimeout(() => {
      setShowPulse(true)
      setShowBadge(true)
    }, 3000)
    return () => clearTimeout(pulseTimer)
  } else {
    setShowBadge(false)
  }
}, [flipped])
```

Delete this entire useEffect.

- [ ] **Step 4: Update handleClick to remove pulse/badge reset**

Find lines 43-47:
```tsx
const handleClick = useCallback(() => {
  setFlipped((current) => !current)
  setShowPulse(false)
  setShowBadge(false)
}, [])
```

Replace with:
```tsx
const handleClick = useCallback(() => {
  setFlipped((current) => !current)
}, [])
```

- [ ] **Step 5: Remove pulse class from front card**

Find line 75:
```tsx
<div className={`bon-new-face bon-new-front ${showPulse ? 'bon-card-pulse' : ''}`}>
```

Replace with:
```tsx
<div className="bon-new-face bon-new-front">
```

- [ ] **Step 6: Remove click badge rendering**

Find lines 95-97:
```tsx
{showBadge && !flipped && (
  <div className="bon-click-badge">TOQUE PARA VER</div>
)}
```

Delete these lines.

- [ ] **Step 7: Verify typecheck**

```bash
npm run typecheck
```

Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/FlipCard.tsx
git commit -m "feat: replace stripe with floating badge in FlipCard"
```

---

### Task 3: Build, Push, and Verify

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: PASS

- [ ] **Step 2: Push to deploy**

```bash
git push origin main
git push origin main:master
```

- [ ] **Step 3: Visual verification checklist**

- [ ] Cards have white background with subtle shadows
- [ ] Badge "BÔNUS #1" floats at top center with animation
- [ ] Title pill has green dashed border, text in one line
- [ ] Timer text pulses and glows green
- [ ] All text is readable (accessible contrast)
- [ ] Card flip still works
