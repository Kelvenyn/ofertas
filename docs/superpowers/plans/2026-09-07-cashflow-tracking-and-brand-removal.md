# Cashflow Tracking and Brand Removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore Cashflow tracking for Tilápia and remove Hub/Universo Eduk references from the Tilápia and Mapa de Perfil public routes.

**Architecture:** Cashflow owns all pixel and CAPI behavior, so the two route layouts load only their offer-specific Cashflow scripts. The shared pricing component no longer emits duplicate legacy tracking events. Route-local legal pages isolate the requested branding change from the other seven offers.

**Tech Stack:** Next.js 16, React 19, TypeScript, Node.js built-in test runner.

## Global Constraints

- Never embed Meta Pixel or CAPI tokens in frontend source.
- Keep Cashflow as the only tracking script in the target routes.
- Do not alter legal or tracking behavior for the other seven offer routes.
- Preserve Hotmart checkout links and the current UTM template.

---

### Task 1: Add a tracking and branding regression test

**Files:**
- Create: `tests/cashflow-tracking-and-branding.test.mjs`

**Interfaces:**
- Consumes: the four route layouts/configuration files and the shared pricing component.
- Produces: an executable Node test command that protects the Cashflow offer IDs and route-local legal links.

- [ ] **Step 1: Write the failing test**

```js
import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("Tilápia points at the Cashflow offer configured in the dashboard", async () => {
  const layout = await read("src/app/tilapia/layout.tsx");
  assert.match(layout, /o=b6f77b1d-8ace-4256-b34d-5cfb2461eacc/);
  assert.match(layout, /data-offer="b6f77b1d-8ace-4256-b34d-5cfb2461eacc"/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/cashflow-tracking-and-branding.test.mjs`

Expected: FAIL because the current layout references `5d5d7f10-8a99-4d2e-b882-1731ba58774f`.

- [ ] **Step 3: Expand the test before implementation**

Add assertions that the two offer configs point to local legal routes and that `OfferPricing.tsx` has no `trackhub` or `trackEvent` reference.

- [ ] **Step 4: Commit the test**

```bash
git add tests/cashflow-tracking-and-branding.test.mjs
git commit -m "test: cover cashflow offer tracking"
```

### Task 2: Correct Cashflow tracking and remove the legacy Hub adapter

**Files:**
- Modify: `src/app/tilapia/layout.tsx:19-20`
- Modify: `src/components/sections/OfferPricing.tsx:3-31,106-113`
- Delete: `src/lib/trackhub.ts`
- Delete: `src/types/trackhub.d.ts`

**Interfaces:**
- Consumes: the Cashflow script loaded by offer layouts.
- Produces: one canonical client-side tracker and no duplicate ViewContent or InitiateCheckout emission.

- [ ] **Step 1: Change the Tilápia script ID**

Replace both instances of `5d5d7f10-8a99-4d2e-b882-1731ba58774f` with `b6f77b1d-115d-45ff-a9ee-b4ed79b73845`.

- [ ] **Step 2: Remove legacy event calls**

Delete the `trackEvent` import, the mount-time ViewContent effect, and the pricing CTA `onClick` that emits InitiateCheckout. Cashflow emits PageView/ViewContent itself and Hotmart supplies InitiateCheckout.

- [ ] **Step 3: Delete unused legacy files**

Delete `src/lib/trackhub.ts` and `src/types/trackhub.d.ts` after confirming no remaining imports with `rg -n "trackhub|trackEvent" src`.

- [ ] **Step 4: Run regression test to verify it passes**

Run: `node --test tests/cashflow-tracking-and-branding.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit the tracking change**

```bash
git add src/app/tilapia/layout.tsx src/components/sections/OfferPricing.tsx src/lib/trackhub.ts src/types/trackhub.d.ts tests/cashflow-tracking-and-branding.test.mjs
git commit -m "fix: restore tilapia cashflow tracking"
```

### Task 3: Add legal pages without Universo Eduk for the two target offers

**Files:**
- Create: `src/app/tilapia/politica-de-privacidade/page.tsx`
- Create: `src/app/tilapia/termos-de-uso/page.tsx`
- Create: `src/app/psicopedagogia/politica-de-privacidade/page.tsx`
- Create: `src/app/psicopedagogia/termos-de-uso/page.tsx`
- Modify: `src/components/legal/LegalPage.tsx:4-15`
- Modify: `src/config/offers/tilapia/offer.ts:67`
- Modify: `src/config/offers/psicopedagogia/offer.ts:255-256`
- Modify: `tests/cashflow-tracking-and-branding.test.mjs`

**Interfaces:**
- Consumes: `LegalPage` and `LegalSection` from `src/components/legal/LegalPage.tsx`.
- Produces: legal pages at route-local URLs, referenced only by the two target offer footers.

- [ ] **Step 1: Extend the failing test**

Assert each target offer config contains its new route-local `privacyUrl` and `termsUrl`; assert each new legal page does not contain `Universo Eduk`, `universoeduk.com`, or `contatouniversoeduk@gmail.com`; assert each page supplies its own offer return URL.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/cashflow-tracking-and-branding.test.mjs`

Expected: FAIL because the target configs use the root legal routes and route-local pages do not exist.

- [ ] **Step 3: Implement the four route-local legal pages**

Add optional `backHref` and `backLabel` props to the shared legal component, preserving `/` and its current label as defaults. Use the props from each route-local page with neutral product-specific language. State the relevant product name, describe technical/cookie and purchase data handling, preserve the statutory copyright and refund wording, and omit any Universo Eduk brand, domain, or email.

- [ ] **Step 4: Redirect each target footer to its local legal pages**

Set Tilápia paths to `/tilapia/politica-de-privacidade` and `/tilapia/termos-de-uso`; set Mapa paths to `/psicopedagogia/politica-de-privacidade` and `/psicopedagogia/termos-de-uso`.

- [ ] **Step 5: Run the regression test**

Run: `node --test tests/cashflow-tracking-and-branding.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit the legal-page change**

```bash
git add src/app/tilapia src/app/psicopedagogia src/config/offers/tilapia/offer.ts src/config/offers/psicopedagogia/offer.ts tests/cashflow-tracking-and-branding.test.mjs
git commit -m "feat: isolate offer legal pages"
```

### Task 4: Verify the implementation

**Files:**
- Verify: modified files from Tasks 1-3

- [ ] **Step 1: Run static regression tests**

Run: `node --test tests/cashflow-tracking-and-branding.test.mjs`

Expected: all tests pass.

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`

Expected: exit code 0.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: exit code 0 and routes include the two new pairs of legal pages.

- [ ] **Step 4: Manual post-deploy verification**

Open the production Tilápia URL with a real ad click URL. In Cashflow, verify a current PageView/ViewContent for offer `b6f77b1d-8ace-4256-b34d-5cfb2461eacc`, then confirm the visit preserves campaign UTM values through the Hotmart CTA.
