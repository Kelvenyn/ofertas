# Behaviors — NeuroAtividades Kids

## Scroll-Driven Behaviors

### Counter Animation
- **Trigger:** IntersectionObserver at threshold 0.35
- **Element:** `.dc-wrap` (observed via `#docs-counter`)
- **Animation:** Counter counts from 0 to 250 over 1800ms with cubic ease-out
- **Progress bar:** Width animates from 0% to 100% with sheen effect
- **Sheen:** `@keyframes dc-sheen` — moves highlight from -35% left to 105% over 2.2s infinite

## Click-Driven Behaviors

### CTAs
- All CTA buttons link to `#oferta`
- On page load, if URL has `#oferta`, it scrolls to top (not the element)
- Hover: `translateY(-2px)`, enhanced box-shadow
- Pulse animation: `@keyframes ctaPulse` — scale 1 → 1.045 → 1 over 1.8s infinite

### FAQ Accordion
- Click to toggle: expand/collapse with smooth transitions
- Max-height transition on content panel

## Time-Driven Behaviors

### Countdown Timer
- Runs on page load via `setInterval(1000)`
- Counts down to end of current day (23:59:59)
- Display: `00h 00m 00s` format

### Marquee / Card Track
- CSS animation: cards scroll horizontally in a continuous loop
- Duplicate set of cards ensures seamless loop

### Pill Shine
- `@keyframes tituloPillBrilho` — Sheen sweeps across the "CONTEÚDO DO KIT" pill

## Hover Behaviors

### CTA Buttons
- Normal: box-shadow 0 14px 34px rgba(37,99,235,.28)
- Hover: translateY(-2px), box-shadow 0 18px 42px rgba(37,99,235,.34)

## Responsive Breakpoints
- **Desktop (1440px):** Full layout, max-width containers
- **Tablet (768px):** Maintains layout, adjusts font sizes
- **Mobile (480px):** Padding reduces, font sizes decrease, single column
- **Mobile (420px):** Timer adjusts
- **Mobile (360px):** Min font sizes applied
