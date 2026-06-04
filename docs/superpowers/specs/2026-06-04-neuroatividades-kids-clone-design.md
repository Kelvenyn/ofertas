# Design Specification: NeuroAtividades Kids Clone

## Target
- **URL:** https://melhor-pravoce.online/atividades-psicopedagogicas-infantis/
- **Goal:** Pixel-perfect clone — match spacing, colors, typography, layout exactly

## Tech Stack
- Next.js 16 (App Router, React 19, TypeScript strict)
- Tailwind CSS v4 with oklch design tokens
- Nunito (headings 700-900) + Inter (body 400-700) via next/font
- shadcn/ui primitives for interactive components (FAQ accordion, countdown timer)

## Approach: Full Build + Review
1. Clean slate — delete old components, rebuild from scratch
2. Build all 12 sections in a single `page.tsx` with inline section components
3. Review pass — compare with reference screenshots, fix discrepancies
4. Deploy to Vercel

## Page Structure (top → bottom)

### 1. Hero Section
- **Background:** Gradient (`#082F63` → `#0B7FE8`) or blue solid
- **Top Bar:** Thin bar with urgency text + countdown timer
- **Content:** Headline (Nunito 900, white, ~3rem), subtitle (Inter 500, white/light), product mockup image (right on desktop, below on mobile)
- **CTA Button:** Green gradient (`#22C978` → `#00B368`), rounded, bold white text "QUERO ACESSAR O KIT AGORA"
- **Trust badges:** "Compra 100% segura • Acesso imediato"
- **Document counter bar:** Stats row below hero (doc count, professionals, satisfaction)

### 2. Pain Points Section
- **Background:** `#F8FBFF`
- **Heading:** "Atividades organizadas por faixa etária"
- **Grid of age-group cards:** 3-5 anos, 5-7 anos, 7-10 anos, 10-12 anos
- **Each card:** Icon/image, age range, description, number of activities
- **Grid:** 2 columns on desktop, 1 on mobile

### 3. Kit Contents Section
- **Background:** White
- **Heading:** "Veja o que você recebe no NeuroAtividades Kids"
- **Category grid:** 6+ categories of activities (Interpretação, Coordenação, Atenção, etc.)
- **Each category:** Image thumbnail + title + brief description
- **Grid:** 3 columns desktop, 2 tablet, 1 mobile

### 4. How It Works Section
- **Background:** Dark blue (`#082F63`)
- **Heading:** "Do improviso para um atendimento mais leve, organizado e intencional"
- **4-step process:** Steps shown as numbered cards or icons with descriptions
- **Layout:** Horizontal row on desktop, vertical stack on mobile

### 5. Bonuses Section
- **Background:** `#F8FBFF`
- **Heading:** "Bônus Exclusivos"
- **4 bonus cards:** Each with image, badge "BÔNUS", title, original value
- **Each card:** White bg, golden border (`#FFD166`), shadow, rounded-2xl
- **Total value line:** "Valor total: R$ 117,60 — Hoje: GRÁTIS"

### 6. Access Info Section
- **Background:** White
- **Two info blocks:** Side by side on desktop
- **Block 1:** Image + "Acesso via WhatsApp e E-mail"
- **Block 2:** Image + "Material pronto para baixar, imprimir e aplicar"

### 7. Social Proof Section
- **Background:** `#F3F8FF`
- **Heading:** "Profissionais que já começaram a usar"
- **Testimonial cards:** Horizontal scroll or grid of 4-5 testimonials
- **Each card:** Avatar, name, role, star rating, quote text
- **Stats counter:** "+2.500 psicopedagogas", "98% satisfação"

### 8. Pricing Section
- **Background:** Dark blue gradient (`#082F63` → `#0B7FE8`)
- **Heading:** "Garanta seu NeuroAtividades Kids"
- **Two plans side by side:**
  - **Kit Essencial (R$47):** 150+ atividades, 2 bônus, 1 ano acesso
  - **Kit Completo (R$67):** 250+ atividades, 4 bônus, acesso vitalício, atualizações, "MAIS VENDIDO" badge
- **Kit Completo:** Larger card, golden border, elevated shadow, badge
- **Each card:** White bg, rounded-2xl, CTA button, installment text

### 9. Creator Section
- **Background:** White
- **Photo + Bio:** Laura Martins — Psicopedagoga
- **Layout:** Image left, text right on desktop; stacked on mobile
- **Quote:** Testimonial about creating the material

### 10. Guarantee Section
- **Background:** White or light
- **Badge image:** 7-day guarantee seal
- **Heading:** "Compre com tranquilidade: você tem 7 dias de garantia"
- **Text:** "Se por qualquer motivo não ficar satisfeito, devolvemos 100% do seu dinheiro"

### 11. FAQ Section
- **Background:** `#F8FBFF`
- **Heading:** "Perguntas Frequentes"
- **6-8 accordion items** (use client component with useState toggle)
- **Items:** Payment, access, age range, printing, refund, updates
- **Each:** Blue question (`#0B7FE8`), gray answer, click to expand/collapse

### 12. Footer
- **Background:** Blue gradient (`#0B7FE8` → `#065CB6`)
- **Content:** Brand name, copyright, privacy policy link, security badge
- **Text:** White, centered

## Interaction States
- **Buttons:** Hover (slight brightness increase), Active (scale 0.98)
- **Cards:** Hover (subtle shadow increase, translateY -2px)
- **FAQ:** Click to toggle, smooth height animation (max-height transition)
- **Countdown timer:** Client-side `useEffect` with `setInterval`, display HH:MM:SS

## Responsive Breakpoints
- **Mobile (default):** Single column, stacked layout
- **Tablet (md / 768px):** 2 columns where applicable
- **Desktop (lg / 1024px):** Full multi-column layout, side-by-side sections

## Data / Content
- All copy (headlines, descriptions, testimonials, FAQ) from target page
- Images downloaded locally to `public/images/`
- **No external API calls** — fully static page

## Constraints
- No CSS-in-JS, no inline styles — Tailwind only
- No external dependencies beyond what's in package.json
- Page must be fully static (SSG) — no server components needed
- All interactive elements (timer, FAQ) are client components with `"use client"`

## Success Criteria
- Build compiles with `npm run build` (no errors, no warnings)
- Visual comparison with reference screenshot shows no noticeable differences
- Responsive layout works on mobile (390px) and desktop (1280px)
- All interactive elements work (timer counts down, FAQ toggles)
- Deploy on Vercel returns HTTP 200 on root path
