# Template Plugavel v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move offer-specific text that is still hardcoded in reusable sections into the offer configuration.

**Architecture:** Keep the current one-page landing structure. Extend `OfferConfig` with section-level copy fields, update the current `OFFER` object with existing copy, then render those fields in the affected components.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4.

---

### Task 1: Extend Offer Types

**Files:**
- Modify: `src/types/offer.ts`

- [x] Add configurable fields for bonus section heading, bonus card labels, pricing heading, and guarantee marquee.
- [x] Run `npm run typecheck` and expect TypeScript to fail until `src/config/offer.ts` is updated.

### Task 2: Populate Current Offer Config

**Files:**
- Modify: `src/config/offer.ts`

- [x] Add the new fields using the current visible copy, preserving the existing page behavior.
- [x] Keep all values offer-specific inside `OFFER`.

### Task 3: Render Configurable Copy

**Files:**
- Modify: `src/components/sections/Bonuses.tsx`
- Modify: `src/components/sections/OfferPricing.tsx`
- Modify: `src/components/sections/Guarantee.tsx`
- Modify: `src/components/ui/FlipCard.tsx`

- [x] Replace hardcoded section copy with values from `OFFER`.
- [x] Pass bonus labels from `Bonuses` into `FlipCard`.
- [x] Preserve current CSS class names and layout.

### Task 4: Verify Template

**Files:**
- No direct edits expected.

- [x] Run `npm run typecheck`.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Review `git diff --stat` and commit when clean.
