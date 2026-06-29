# Task 2: Psicopedagogia Layout - Report

## What was implemented

Created `src/app/psicopedagogia/layout.tsx` — the layout for the `/psicopedagogia` route. It:

- Imports `OFFER` config from `@/config/offers/psicopedagogia/offer`
- Exports `Metadata` with title "Mapa de Perfil Infantil", OG tags, and favicon
- Injects Facebook/TikTok/Utmify tracking scripts (identical to lembrancinhas)
- Wraps children in a `<div id="offer-root">` with CSS custom properties from the OFFER palette
- Wraps content in `<OfferProvider offer={OFFER}>`

## Test results

- **tsc --noEmit**: Passed (no errors)
- **eslint**: 1 warning — `<img>` without `<Image>` on noscript tag (same pattern as lembrancinhas layout; 3 pre-existing warnings not related to this file)
- **next build**: Compiled successfully, no new errors

Note: `/psicopedagogia` doesn't appear in the build route list because no `page.tsx` exists yet (expected — it's created in a subsequent task).

## Files changed

- Created: `src/app/psicopedagogia/layout.tsx` (84 lines)

## Self-review findings

- The noscript `<img>` tag triggers a lint warning (`@next/next/no-img-element`), but this is consistent with the `lembrancinhas/layout.tsx` pattern. The reference file includes an `eslint-disable-next-line` comment that the brief code omitted. This is a pre-existing convention choice.
- No page.tsx yet — the route won't render until the page is created in a later task.
- CSS custom properties and OfferProvider wiring match the established pattern.
