# Bonus Cards Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update bonus card colors from flat blue (#1B4D8F) to vibrant blue (#0ea5e9), add manual line breaks to titles, and make the "BÔNUS" stripe more visible.

**Architecture:** Three focused changes: CSS variable + card styles, data layer (offer.ts + types), and component rendering (FlipCard). No new files needed.

**Tech Stack:** CSS custom properties, React, TypeScript, Next.js

---

### Task 1: Update Card Colors and Stripe CSS

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update `--card-dark` variable**

Find line 246:
```css
--card-dark: #1B4D8F;
```

Replace with:
```css
--card-dark: #0ea5e9;
```

- [ ] **Step 2: Update `.bon-new-card` styles**

Find lines 2410-2419:
```css
.bon-new-card {
  position: relative;
  border-radius: 20px;
  background: var(--card-dark);
  border: 1px solid rgba(16, 185, 129, 0.25);
  box-shadow: 0 8px 32px rgba(0,0,0,.25), 0 0 0 0 rgba(16,185,129,0);
  text-align: center;
  overflow: hidden;
  transition: box-shadow .35s ease;
}
```

Replace with:
```css
.bon-new-card {
  position: relative;
  border-radius: 20px;
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  border: 1px solid rgba(14, 165, 233, 0.3);
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.25);
  text-align: center;
  overflow: hidden;
  transition: box-shadow .35s ease;
}
```

- [ ] **Step 3: Update `.bon-new-card:hover` styles**

Find lines 2421-2425:
```css
@media (hover: hover) {
  .bon-new-card:hover {
    box-shadow: 0 12px 40px rgba(0,0,0,.3), 0 0 0 1px rgba(16,185,129,.25);
  }
}
```

Replace with:
```css
@media (hover: hover) {
  .bon-new-card:hover {
    box-shadow: 0 12px 40px rgba(14, 165, 233, 0.35), 0 0 0 1px rgba(14, 165, 233, 0.3);
  }
}
```

- [ ] **Step 4: Update `.bon-new-stripe` styles**

Find lines 2477-2492:
```css
.bon-new-stripe {
  position: absolute;
  top: 18px;
  right: -32px;
  padding: 5px 40px;
  background: var(--cta);
  color: #FFFFFF;
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .05em;
  text-transform: uppercase;
  transform: rotate(45deg);
  box-shadow: 0 2px 12px rgba(16, 185, 129, 0.5);
  z-index: 5;
}
```

Replace with:
```css
.bon-new-stripe {
  position: absolute;
  top: 18px;
  right: -32px;
  padding: 6px 40px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #FFFFFF;
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: .05em;
  text-transform: uppercase;
  transform: rotate(45deg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  z-index: 5;
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: update bonus card colors to vibrant blue and orange stripe"
```

---

### Task 2: Add Title Break Field to Data Layer

**Files:**
- Modify: `src/types/offer.ts`
- Modify: `src/config/offer.ts`

- [ ] **Step 1: Update `BonusItem` type**

Find lines 68-74 in `src/types/offer.ts`:
```typescript
export interface BonusItem {
  front: string
  back: string
  title: string
  desc: string
  price: string
}
```

Replace with:
```typescript
export interface BonusItem {
  front: string
  back: string
  title: string
  titleBreak?: string
  desc: string
  price: string
}
```

- [ ] **Step 2: Add `titleBreak` to each bonus in `src/config/offer.ts`**

Find lines 128-171 and update each bonus:

```typescript
bonuses: [
  {
    front: "/images/Bônus 1 - Frente.webp",
    back: "/images/Bônus 1 - Verso.webp",
    title: "Mapas Mentais do Antigo Testamento",
    titleBreak: "Mapas Mentais do<br />Antigo Testamento",
    desc: "Guia visual e lúdico para ajudar a criança a entender os principais livros, histórias e personagens do Antigo Testamento.",
    price: "R$ 37,90",
  },
  {
    front: "/images/Bônus 2 - Frente.webp",
    back: "/images/Bônus 2 - Verso.webp",
    title: "Mapas Mentais do Novo Testamento",
    titleBreak: "Mapas Mentais do<br />Novo Testamento",
    desc: "Guia visual para facilitar o aprendizado sobre Jesus, os evangelhos, os apóstolos e os ensinamentos do Novo Testamento.",
    price: "R$ 37,90",
  },
  {
    front: "/images/Bônus 3 - Frente.webp",
    back: "/images/Bônus 3 - Verso.webp",
    title: "Colorir com os Salmos",
    titleBreak: "Colorir com os<br />Salmos",
    desc: "Desenhos para colorir com mensagens inspiradas nos Salmos, ajudando a criança a aprender sobre confiança, gratidão e amor de Deus.",
    price: "R$ 19,90",
  },
  {
    front: "/images/Bônus 4 - Frente.webp",
    back: "/images/Bônus 4 - Verso.webp",
    title: "Colorir com os Provérbios",
    titleBreak: "Colorir com os<br />Provérbios",
    desc: "Desenhos para colorir com mensagens de Provérbios, ensinando sobre sabedoria, obediência, respeito e boas escolhas.",
    price: "R$ 19,90",
  },
  {
    front: "/images/Bônus 5 - Frente.webp",
    back: "/images/Bônus 5 - Verso.webp",
    title: "Planner de Leitura Bíblica",
    titleBreak: "Planner de<br />Leitura Bíblica",
    desc: "Checklist e cronograma organizado mês a mês para acompanhar a leitura bíblica com mais clareza.",
    price: "R$ 27,90",
  },
  {
    front: "/images/Bônus 6 - Frente.webp",
    back: "/images/Bônus 6 - Verso.webp",
    title: "Marcadores de Abas Bíblicas",
    titleBreak: "Marcadores de<br />Abas Bíblicas",
    desc: "Marcadores práticos, coloridos e bonitos para organizar a Bíblia e encontrar os livros com mais facilidade.",
    price: "R$ 14,90",
  },
],
```

- [ ] **Step 3: Verify typecheck**

```bash
npm run typecheck
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/types/offer.ts src/config/offer.ts
git commit -m "feat: add titleBreak field to bonus items"
```

---

### Task 3: Update FlipCard to Render Title Break

**Files:**
- Modify: `src/components/ui/FlipCard.tsx`

- [ ] **Step 1: Update pill title rendering**

Find line 124:
```tsx
<span className="bon-new-pill-title">{title}</span>
```

Replace with:
```tsx
<span className="bon-new-pill-title" dangerouslySetInnerHTML={{ __html: titleBreak || title }} />
```

Note: `titleBreak` is optional. If present, it contains `<br />` tags. If not, render `title` as-is.

- [ ] **Step 2: Update FlipCardProps interface**

Find lines 7-15:
```typescript
interface FlipCardProps {
  front: string
  back: string
  title: string
  desc: string
  price: string
  index: number
  labels: BonusSection
}
```

Replace with:
```typescript
interface FlipCardProps {
  front: string
  back: string
  title: string
  titleBreak?: string
  desc: string
  price: string
  index: number
  labels: BonusSection
}
```

- [ ] **Step 3: Update function signature**

Find line 17:
```typescript
export function FlipCard({ front, back, title, desc, price, index, labels }: FlipCardProps) {
```

Replace with:
```typescript
export function FlipCard({ front, back, title, titleBreak, desc, price, index, labels }: FlipCardProps) {
```

- [ ] **Step 4: Verify typecheck**

```bash
npm run typecheck
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/FlipCard.tsx
git commit -m "feat: render titleBreak in FlipCard pill title"
```

---

### Task 4: Build and Verify

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

- [ ] Cards have vibrant blue gradient background
- [ ] Titles break at logical points in the pill
- [ ] Orange stripe is prominent on all cards
- [ ] Hover effect works with new colors
