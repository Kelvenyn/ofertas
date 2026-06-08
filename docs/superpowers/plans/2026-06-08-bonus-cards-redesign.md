# Bonus Cards Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve bonus cards with pulse animation, click badge, and vibrant colors to make the flip interaction obvious

**Architecture:** Add CSS animations and state management to FlipCard component, enhance existing color values

**Tech Stack:** React, CSS, Next.js Image component

---

## File Structure

- `src/components/ui/FlipCard.tsx` - Add pulse state, badge, and indicator elements
- `src/app/globals.css` - Add animations and enhance color styles

---

### Task 1: Add Pulse Animation CSS

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add pulse keyframes**

```css
/* Add after existing .bon-new-inner styles */
@keyframes bon-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.bon-pulse {
  animation: bon-pulse 2s ease-in-out infinite;
}
```

- [ ] **Step 2: Add click badge styles**

```css
/* Add after .bon-pulse styles */
.bon-click-badge {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 700;
  z-index: 10;
  animation: bon-badge-fade-in 0.5s ease-out 1s both;
}

@keyframes bon-badge-fade-in {
  from { opacity: 0; transform: translateX(-50%) translateY(10px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* Mobile: permanent badge */
@media (max-width: 768px) {
  .bon-click-badge {
    animation: none;
    opacity: 1;
  }
}
```

- [ ] **Step 3: Add flip indicator styles**

```css
/* Add after .bon-click-badge styles */
.bon-flip-indicator {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: opacity 0.3s ease;
}
```

- [ ] **Step 4: Enhance existing colors**

```css
/* Update existing .bon-new-card border */
.bon-new-card {
  border-color: rgba(16, 185, 129, 0.25);
}

/* Update existing .bon-new-stripe shadow */
.bon-new-stripe {
  box-shadow: 0 2px 12px rgba(16, 185, 129, 0.4);
}

/* Update existing .bon-new-pill-free shadow */
.bon-new-pill-free {
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add pulse animation and click badge styles for bonus cards"
```

---

### Task 2: Update FlipCard Component

**Files:**
- Modify: `src/components/ui/FlipCard.tsx`

- [ ] **Step 1: Add pulse state and effect**

```tsx
// Add after existing state declarations
const [isPulsing, setIsPulsing] = useState(false)
const [showBadge, setShowBadge] = useState(false)

// Add effect for pulse timing
useEffect(() => {
  if (flipped) return
  
  const pulseTimer = setTimeout(() => {
    setIsPulsing(true)
    setShowBadge(true)
  }, 3000)
  
  return () => clearTimeout(pulseTimer)
}, [flipped])
```

- [ ] **Step 2: Update click handler**

```tsx
// Replace existing handleClick
const handleClick = useCallback(() => {
  setFlipped(current => !current)
  setIsPulsing(false)
  setShowBadge(false)
}, [])
```

- [ ] **Step 3: Add pulse class to front face**

```tsx
// Update the front face div
<div className={`bon-new-front ${isPulsing ? 'bon-pulse' : ''}`}>
```

- [ ] **Step 4: Add click badge element**

```tsx
// Add after the hand emoji div, before closing bon-new-front
{showBadge && !flipped && (
  <div className="bon-click-badge">
    👆 Toque para ver
  </div>
)}
```

- [ ] **Step 5: Add flip indicator element**

```tsx
// Add after the click badge, still inside bon-new-front
{!flipped && (
  <div className="bon-flip-indicator" aria-hidden="true">
    ↻
  </div>
)}
```

- [ ] **Step 6: Verify TypeScript**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/FlipCard.tsx
git commit -m "feat: add pulse animation and click badge to FlipCard component"
```

---

### Task 3: Test and Verify

**Files:**
- None (testing only)

- [ ] **Step 1: Run build**

```bash
npm run build
```
Expected: Build succeeds with no errors

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```
Expected: No TypeScript errors

- [ ] **Step 3: Test in browser**

1. Open the page in a browser
2. Scroll to the bonus section
3. Wait 3 seconds - pulse animation should start
4. Badge "👆 Toque para ver" should appear
5. Click on a card - should flip, pulse stops, badge disappears
6. Click again - should flip back
7. Test on mobile viewport - badge should be permanent

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: bonus cards redesign adjustments"
```

---

## Success Criteria

- [ ] Pulse animation starts after 3 seconds
- [ ] Click badge appears with fade-in animation
- [ ] Badge is permanent on mobile
- [ ] Flip indicator arrow is visible
- [ ] Colors are more vibrant
- [ ] All cards function correctly
- [ ] No TypeScript errors
- [ ] Build succeeds
