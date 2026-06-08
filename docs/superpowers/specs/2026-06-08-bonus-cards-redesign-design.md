# Bonus Cards Redesign

## Overview

Improve the bonus cards section to make the flip interaction more obvious and the colors more attractive. The current cards have a flip mechanism that users don't discover, and the color scheme feels dull.

## Goals

1. Make the flip interaction obvious through visual cues
2. Make the color scheme more vibrant and attractive
3. Maintain the existing card structure and functionality
4. Improve mobile and desktop experience

## Current State

- FlipCard component with front (image) and back (image) that flips on click
- Stripe with "BÔNUS #X" in corner
- Hand emoji pointing up (small, not obvious)
- Touch hint text below image (small, often missed)
- Dark theme with green accents
- Grid layout with 2 columns on desktop

## Design Decisions

### 1. Pulse Animation

**What:** CSS animation that subtly scales the card image (1.0 → 1.02 → 1.0)

**When:** 
- Starts after 3 seconds if user hasn't clicked
- Repeats every 5 seconds
- Stops when user clicks the card

**How:** 
- CSS `@keyframes bon-pulse` with `transform: scale()`
- Applied via `.bon-pulse` class
- Removed on first click via state management

**Files:**
- `src/app/globals.css`: Add keyframes and class
- `src/components/ui/FlipCard.tsx`: Add pulse state and effect

### 2. Badge "TOQUE PARA VER"

**Position:** Centered on image, below middle

**Visual:**
- Background: `rgba(0, 0, 0, 0.6)`
- Border radius: `8px`
- Padding: `8px 16px`
- Text: "👆 Toque para ver" in white, Nunito 14px bold
- Box shadow: `0 2px 8px rgba(0, 0, 0, 0.3)`

**Animation:**
- Fade-in with 1 second delay after pulse starts
- On mobile: badge is permanent (always visible)

**Files:**
- `src/app/globals.css`: Add badge styles
- `src/components/ui/FlipCard.tsx`: Add badge element

### 3. Color Enhancements

**Stripe green:**
- Keep `var(--cta)` (#10B981)
- Increase shadow opacity: `rgba(16, 185, 129, 0.4)`

**"GRÁTIS" badge:**
- Add subtle glow: `box-shadow: 0 0 12px rgba(16, 185, 129, 0.4)`

**Card border:**
- Increase opacity from `rgba(16, 185, 129, 0.15)` to `rgba(16, 185, 129, 0.25)`

**Hover effect:**
- Enhanced glow on border: `0 0 0 2px rgba(16, 185, 129, 0.3)`

**Files:**
- `src/app/globals.css`: Update existing color values

### 4. Flip Indicator Arrow

**What:** Larger arrow icon (24px) in bottom-right corner of image

**Visual:**
- Background: `rgba(255, 255, 255, 0.9)`
- Border radius: `50%`
- Size: `40px × 40px`
- Shadow: `0 2px 8px rgba(0, 0, 0, 0.2)`
- Icon: ↻ (rotate clockwise)

**Animation:**
- Gentle rotation during pulse animation
- Fades out when card is flipped

**Files:**
- `src/app/globals.css`: Add indicator styles
- `src/components/ui/FlipCard.tsx`: Add indicator element

## Implementation Details

### FlipCard.tsx Changes

```tsx
// Add state for pulse
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

// Stop pulse on click
const handleClick = useCallback(() => {
  setFlipped(current => !current)
  setIsPulsing(false)
  setShowBadge(false)
}, [])

// Add classes to elements
<div className={`bon-new-front ${isPulsing ? 'bon-pulse' : ''}`}>
  {/* ... existing content ... */}
  {showBadge && !flipped && (
    <div className="bon-click-badge">
      👆 Toque para ver
    </div>
  )}
</div>
```

### globals.css Changes

```css
/* Pulse animation */
@keyframes bon-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.bon-pulse {
  animation: bon-pulse 2s ease-in-out infinite;
}

/* Click badge */
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

/* Flip indicator */
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

/* Enhanced colors */
.bon-new-card {
  border-color: rgba(16, 185, 129, 0.25);
}

.bon-new-stripe {
  box-shadow: 0 2px 12px rgba(16, 185, 129, 0.4);
}

.bon-new-pill-free {
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
}

/* Mobile: permanent badge */
@media (max-width: 768px) {
  .bon-click-badge {
    animation: none;
    opacity: 1;
  }
}
```

## Files to Modify

1. `src/components/ui/FlipCard.tsx` - Add pulse state, badge, and indicator
2. `src/app/globals.css` - Add animations and enhance colors

## Testing

1. **Desktop:** Verify pulse starts after 3 seconds, badge appears, click stops pulse
2. **Mobile:** Verify badge is always visible, pulse works, flip functions
3. **Accessibility:** Ensure animations respect `prefers-reduced-motion`
4. **Performance:** Verify no layout shifts or performance issues

## Success Criteria

- [ ] Users discover the flip interaction without instructions
- [ ] Cards feel more vibrant and attractive
- [ ] Mobile experience is improved
- [ ] No regression in existing functionality
- [ ] Performance is maintained or improved
