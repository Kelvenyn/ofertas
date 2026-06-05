# Low Ticket Template — Auditoria e Padronização

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar a página em um template reutilizável onde trocar de oferta = editar 1 arquivo, com CSS dirigido por tokens e performance otimizada.

**Architecture:** Três fases sequenciais — P1 limpa o CSS morto e tokeniza as cores; P2 centraliza todo conteúdo em `src/config/offer.ts` e injeta a paleta como CSS variables via `layout.tsx`; P3 reduz fontes de 4→2, converte imagens para `next/image` e pausar animações fora da viewport.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript strict, Tailwind v4, CSS global com tokens via CSS custom properties.

---

## Mapa de Arquivos

### Fase 1 — Criar/Modificar
- `src/app/globals.css` — remover 13 blocos mortos; adicionar tokens semânticos em `:root`; substituir hex cru por `var(--token)`

### Fase 2 — Criar
- `src/types/offer.ts` — schema TypeScript completo do contrato de oferta
- `src/config/offer.ts` — dados da oferta atual (NeuroAtividades Kids)

### Fase 2 — Modificar
- `src/app/layout.tsx` — injetar paleta como CSS custom properties no `<html>`
- `src/components/sections/VendaImediata.tsx`
- `src/components/sections/SocialProof.tsx`
- `src/components/sections/CounterPainPoints.tsx`
- `src/components/sections/KitCards.tsx`
- `src/components/sections/Benefits.tsx`
- `src/components/sections/Urgencia.tsx`
- `src/components/sections/IdealParaVoce.tsx`
- `src/components/sections/TudoQueVoceRecebe.tsx`
- `src/components/sections/Bonuses.tsx`
- `src/components/sections/OfferPricing.tsx`
- `src/components/sections/Guarantee.tsx`
- `src/components/sections/ComoEAcesso.tsx`
- `src/components/sections/FAQ.tsx`
- `src/components/sections/Footer.tsx`

### Fase 3 — Modificar
- `src/app/layout.tsx` — reduzir fontes de 4 para 2
- `src/app/globals.css` — remover fontes mortas e keyframes orphans
- `src/components/sections/VendaImediata.tsx` — `<img>` → `<Image>` com `priority`
- `src/components/sections/TudoQueVoceRecebe.tsx` — `<img>` → `<Image>`
- `src/components/sections/OfferPricing.tsx` — `<img>` → `<Image>`
- `src/components/sections/Guarantee.tsx` — `<img>` → `<Image>`
- `src/components/sections/KitCards.tsx` — pausar marquee fora da viewport
- `src/components/ui/ScrollMarquee.tsx` — pausar fora da viewport

---

## FASE 1 — Limpeza + Tokenização

### Task 1: Remover os 11 componentes órfãos

**Files:**
- Delete: `src/components/sections/AccessInfo.tsx`
- Delete: `src/components/sections/CTAButton.tsx`
- Delete: `src/components/sections/Creator.tsx`
- Delete: `src/components/sections/Hero.tsx`
- Delete: `src/components/sections/HeroImage.tsx`
- Delete: `src/components/sections/KitTitle.tsx`
- Delete: `src/components/sections/PriceDisplay.tsx`
- Delete: `src/components/sections/ProcessSteps.tsx`
- Delete: `src/components/sections/PromoBanner.tsx`
- Delete: `src/components/sections/Skills.tsx`
- Delete: `src/components/sections/TopTimer.tsx`

- [ ] **Step 1: Confirmar que nenhum componente ativo importa os órfãos**

```bash
grep -r "AccessInfo\|CTAButton\|Creator\|HeroImage\|KitTitle\|PriceDisplay\|ProcessSteps\|PromoBanner\|Skills\|TopTimer" src --include="*.tsx" | grep -v "^Binary" | grep -v "src/components/sections/\(Access\|CTAButton\|Creator\|Hero\|KitTitle\|PriceDisplay\|Process\|Promo\|Skills\|TopTimer\)"
```

Esperado: nenhuma saída.

- [ ] **Step 2: Deletar os arquivos órfãos**

```bash
cd src/components/sections && rm AccessInfo.tsx CTAButton.tsx Creator.tsx Hero.tsx HeroImage.tsx KitTitle.tsx PriceDisplay.tsx ProcessSteps.tsx PromoBanner.tsx Skills.tsx TopTimer.tsx
```

No PowerShell:
```powershell
cd src/components/sections; Remove-Item AccessInfo.tsx, CTAButton.tsx, Creator.tsx, Hero.tsx, HeroImage.tsx, KitTitle.tsx, PriceDisplay.tsx, ProcessSteps.tsx, PromoBanner.tsx, Skills.tsx, TopTimer.tsx
```

- [ ] **Step 3: Commit**

```bash
git add -u src/components/sections/
git commit -m "chore: remove 11 orphan section components"
```

---

### Task 2: Remover blocos CSS mortos do globals.css

13 blocos de CSS (`pk-top-timer`, `hero-bonos`, `.bonus-badge`, `org-anos-`, `titulo-entregaveis-`, `neuro-processo-`, `bonos-wrap` antigo, `acesso-material-`, `.creator-`, `.promo-banner-`, `garantia-pei-`, `qs-social-`).

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Criar script de limpeza dos blocos mortos**

Criar o arquivo `scripts/remove-dead-css.mjs`:

```js
import { readFileSync, writeFileSync } from 'fs'

const DEAD_BLOCKS = [
  'TOP TIMER',
  'HERO',
  'CTA BUTTON',
  'PRICE',
  'SKILLS',
  'KIT TITLE',
  'PROCESS',
]

// Blocos mortos identificados por classe-âncora (mais seguro que nome)
const DEAD_CLASS_ANCHORS = [
  '.pk-top-timer',
  '.hero-bonos',
  '.bonus-badge {',
  '@keyframes pulse {',
  '.org-anos-wrap',
  '.titulo-entregaveis {',
  '.neuro-processo {',
  '.bonos-wrap {',
  '.acesso-material-wrap',
  '.creator-section',
  '.pei-promo-banner',
  '.garantia-pei-wrap',
  '.qs-social-wrap',
]

const css = readFileSync('src/app/globals.css', 'utf8')
const blockHeaderRe = /\/\* ={5,} .+ ={5,} \*\//g

// Split into [before-first-header, block1-header, block1-content, block2-header, ...]
const parts = []
let last = 0
let m
while ((m = blockHeaderRe.exec(css)) !== null) {
  parts.push({ type: 'content', text: css.slice(last, m.index) })
  parts.push({ type: 'header', text: m[0], start: m.index })
  last = m.index + m[0].length
}
parts.push({ type: 'content', text: css.slice(last) })

// Pair each header with its following content
const blocks = []
for (let i = 0; i < parts.length; i++) {
  if (parts[i].type === 'header') {
    const content = parts[i + 1]?.type === 'content' ? parts[i + 1].text : ''
    blocks.push({ header: parts[i].text, content })
    i++ // skip content
  } else if (i === 0 && parts[i].type === 'content') {
    blocks.push({ header: null, content: parts[i].text })
  }
}

// Mark dead blocks
const kept = blocks.filter(block => {
  if (!block.header) return true // preamble always kept
  const combined = block.header + block.content
  return !DEAD_CLASS_ANCHORS.some(anchor => combined.includes(anchor))
})

const result = kept.map(b => b.header ? b.header + b.content : b.content).join('')
writeFileSync('src/app/globals.css', result, 'utf8')

const removed = blocks.length - kept.length
console.log(`✓ Removed ${removed} dead CSS blocks. Original: ${blocks.length}, kept: ${kept.length}`)
```

- [ ] **Step 2: Executar o script**

```bash
node scripts/remove-dead-css.mjs
```

Esperado: `✓ Removed 13 dead CSS blocks. Original: 30, kept: 17`

- [ ] **Step 3: Verificar que classes ativas continuam no arquivo**

```bash
grep -c "\.vi-hero\|\.sp-section\|\.dc-wrap\|\.ben-section\|\.urg-section\|\.bon-section\|\.offer-pei-section\|\.gar-section\|\.faq-acc-wrap" src/app/globals.css
```

Esperado: `9` (todas as 9 classes ativas presentes).

- [ ] **Step 4: Build deve passar**

```bash
npm run build
```

Esperado: build verde sem erros de CSS.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css scripts/remove-dead-css.mjs
git commit -m "chore: remove ~1180 lines of dead CSS blocks"
```

---

### Task 3: Adicionar tokens semânticos e substituir hex cru

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Substituir o bloco `:root` existente pelo bloco com tokens semânticos**

Encontrar o bloco `:root {` (após `@theme inline`) em `globals.css` e substituir por:

```css
:root {
  /* === PALETA DE OFERTA (sobrescritos por offer.ts via layout.tsx) === */
  --brand: #0b7fe8;
  --brand-deep: #082f63;
  --brand-ink: #123a6d;
  --brand-dark: #1d4ed8;
  --brand-light: #49a6ff;
  --brand-subtle: #eaf5ff;
  --cta: #22c978;
  --cta-deep: #00a85a;
  --cta-darkest: #007d43;
  --accent: #ff8a5b;
  --yellow: #ffd166;
  --bg: #f8fbff;
  --text: #111111;
  --text-muted: #425466;
  --text-light: #5b6b7b;
  --surface: #ffffff;
  --urgency: #dc2626;

  /* === shadcn/ui aliases (mantém compatibilidade) === */
  --background: var(--bg);
  --foreground: var(--text);
  --card: var(--surface);
  --card-foreground: var(--text);
  --popover: var(--surface);
  --popover-foreground: var(--text);
  --primary: var(--brand);
  --primary-foreground: var(--surface);
  --secondary: #f3f8ff;
  --secondary-foreground: var(--brand-ink);
  --muted: #f0f4f8;
  --muted-foreground: var(--text-light);
  --accent-color: var(--accent);
  --accent-foreground: var(--surface);
  --destructive: var(--urgency);
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: var(--brand);
  --chart-1: var(--brand);
  --chart-2: var(--accent);
  --chart-3: var(--cta);
  --chart-4: var(--yellow);
  --chart-5: var(--brand-ink);
  --radius: 0.625rem;
  --sidebar: var(--bg);
  --sidebar-foreground: var(--text);
  --sidebar-primary: var(--brand);
  --sidebar-primary-foreground: var(--surface);
  --sidebar-accent: var(--accent);
  --sidebar-accent-foreground: var(--surface);
  --sidebar-border: #e2e8f0;
  --sidebar-ring: var(--brand);
}
```

- [ ] **Step 2: Criar script de substituição de hex por tokens**

Criar `scripts/tokenize-css.mjs`:

```js
import { readFileSync, writeFileSync } from 'fs'

// Mapear hex (case-insensitive) para var(--token)
// NOTA: não substituir dentro de rgba() pois rgba usa componentes rgb, não hex
const TOKEN_MAP = [
  [/#0b7fe8/gi, 'var(--brand)'],
  [/#082f63/gi, 'var(--brand-deep)'],
  [/#123a6d/gi, 'var(--brand-ink)'],
  [/#1d4ed8/gi, 'var(--brand-dark)'],
  [/#49a6ff/gi, 'var(--brand-light)'],
  [/#eaf5ff/gi, 'var(--brand-subtle)'],
  [/#22c978/gi, 'var(--cta)'],
  [/#00a85a/gi, 'var(--cta-deep)'],
  [/#007d43/gi, 'var(--cta-darkest)'],
  [/#ff8a5b/gi, 'var(--accent)'],
  [/#ffd166/gi, 'var(--yellow)'],
  [/#f8fbff/gi, 'var(--bg)'],
  [/#111111/gi, 'var(--text)'],
  [/#425466/gi, 'var(--text-muted)'],
  [/#5b6b7b/gi, 'var(--text-light)'],
  [/#dc2626/gi, 'var(--urgency)'],
  // #FFFFFF cuidado: só substituir quando não for parte de rgba(..., ...)
  // Deixa #fff e #ffffff em gradients/box-shadow rgba intactos
]

let css = readFileSync('src/app/globals.css', 'utf8')

// Proteger blocos @theme inline e :root do início do arquivo (tokens definition)
// Só substituir abaixo da linha "@layer base"
const layerBaseIdx = css.indexOf('@layer base')
if (layerBaseIdx === -1) throw new Error('@layer base not found')

const preamble = css.slice(0, layerBaseIdx)
let body = css.slice(layerBaseIdx)

let count = 0
for (const [re, token] of TOKEN_MAP) {
  const before = body
  body = body.replace(re, token)
  const diff = (before.match(re) || []).length
  if (diff > 0) console.log(`  ${token}: ${diff} substituições`)
  count += diff
}

writeFileSync('src/app/globals.css', preamble + body, 'utf8')
console.log(`\n✓ Total: ${count} substituições`)
```

- [ ] **Step 3: Executar o script**

```bash
node scripts/tokenize-css.mjs
```

Esperado: log mostrando ~120-140 substituições totais.

- [ ] **Step 4: Verificar resultado — nenhum hex de paleta deve sobrar no body do CSS**

```bash
grep -i -E "#0b7fe8|#082f63|#123a6d|#1d4ed8|#49a6ff|#22c978|#00a85a|#425466|#dc2626" src/app/globals.css | grep -v "var(--" | grep -v ":root" | grep -v "@theme"
```

Esperado: nenhuma saída.

- [ ] **Step 5: Build deve passar e página deve renderizar identicamente**

```bash
npm run build
```

Iniciar `npm run dev` e comparar visualmente no browser.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css scripts/tokenize-css.mjs
git commit -m "feat(p1): tokenizar paleta de cores — hex cru → var(--token)"
```

---

## FASE 2 — Centralização de Conteúdo

### Task 4: Criar os tipos TypeScript da oferta

**Files:**
- Create: `src/types/offer.ts`

- [ ] **Step 1: Criar src/types/offer.ts**

```typescript
export interface OfferPalette {
  brand: string
  brandDeep: string
  brandInk: string
  brandDark: string
  brandLight: string
  brandSubtle: string
  cta: string
  ctaDeep: string
  ctaDarkest: string
  accent: string
  yellow: string
  bg: string
}

export interface OfferMeta {
  title: string
  description: string
}

export interface OfferHero {
  pill: string
  titleLine1: string
  titleLine2: string
  titleLine3: string
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  subtitle: string
  ctaText: string
  timerLabel: string
  marqueeText: string
  marqueeGradient: string
}

export interface OfferTestimonial {
  src: string
  alt: string
  gradient: string
}

export interface OfferCounter {
  prefix: string
  target: number
  label: string
}

export interface KitImage {
  src: string
  alt: string
}

export interface BenefitItem {
  icon: string
  title: string
  desc: string
}

export interface IdealItem {
  icon: string
  title: string
  desc: string
}

export interface BonusItem {
  front: string
  back: string
  title: string
  desc: string
  price: string
}

export interface PricingPlan {
  id: string
  label: string
  title: string
  image: string
  imageAlt: string
  featured: boolean
  badgeText?: string
  extraNote?: string
  oldPrice: string
  price: string
  installments: string
  items: string[]
  mutedItems?: string[]
  ctaText: string
  ctaHref: string
}

export interface AccessStep {
  num: string
  title: string
  desc: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface OfferConfig {
  meta: OfferMeta
  palette: OfferPalette
  hero: OfferHero
  socialProof: {
    testimonials: OfferTestimonial[]
  }
  counter: OfferCounter
  kitCards: {
    heading1: string
    heading2: string
    images: KitImage[]
  }
  benefits: BenefitItem[]
  urgency: {
    pill: string
    title: string
    highlight: string
    body: string
    ctaText: string
    trust: string[]
  }
  idealPara: {
    pill: string
    title: string
    subtitle: string
    items: IdealItem[]
  }
  deliverables: {
    pill: string
    title: string
    titleHighlight: string
    image: string
    imageAlt: string
    bullets: string[]
  }
  bonuses: BonusItem[]
  pricing: {
    pill: string
    heading1: string
    heading2: string
    image: string
    imageAlt: string
    body: string
    plans: PricingPlan[]
    trustBadges: string[]
  }
  guarantee: {
    marqueeText: string
    icon: string
    iconAlt: string
    title: string
    body: string
  }
  access: {
    title: string
    steps: AccessStep[]
  }
  faq: {
    title: string
    items: FaqItem[]
  }
  footer: {
    updateTitle: string
    updateBody: string
    copyright: string
  }
}
```

- [ ] **Step 2: Typecheck deve passar**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/types/offer.ts
git commit -m "feat(p2): add OfferConfig TypeScript contract"
```

---

### Task 5: Criar src/config/offer.ts com dados da oferta atual

**Files:**
- Create: `src/config/offer.ts`

- [ ] **Step 1: Criar src/config/offer.ts**

Antes de criar, ler `src/components/sections/Bonuses.tsx` completo para extrair todos os itens do array `bonuses`. Depois criar:

```typescript
import type { OfferConfig } from '@/types/offer'

export const OFFER: OfferConfig = {
  meta: {
    title: "Atividades psicopedagógicas infantis – melhor-pravoce.online",
    description: "+250 atividades prontas para atendimentos Psicopedagógicos infantis. Materiais lúdicos, fichas de aplicação e atividades imprimíveis para trabalhar atenção, memória, leitura, escrita e raciocínio lógico com mais praticidade nos atendimentos infantis.",
  },
  palette: {
    brand: "#0B7FE8",
    brandDeep: "#082F63",
    brandInk: "#123A6D",
    brandDark: "#1D4ED8",
    brandLight: "#49A6FF",
    brandSubtle: "#EAF5FF",
    cta: "#22C978",
    ctaDeep: "#00A85A",
    ctaDarkest: "#007D43",
    accent: "#FF8A5B",
    yellow: "#FFD166",
    bg: "#F8FBFF",
  },
  hero: {
    pill: "NEUROATIVIDADES KIDS",
    titleLine1: "+250 Atividades Prontas",
    titleLine2: "para atendimentos",
    titleLine3: "Psicopedagógicos infantis",
    image: "/images/a4996fc9-5b06-464a-86b1-817af5b4f1ae.webp",
    imageAlt: "NeuroAtividades Kids",
    imageWidth: 340,
    imageHeight: 425,
    subtitle: "Materiais lúdicos, fichas de aplicação e atividades imprimíveis para trabalhar atenção, memória, leitura, escrita e raciocínio lógico com mais praticidade nos atendimentos infantis.",
    ctaText: "QUERO ACESSAR O KIT AGORA",
    timerLabel: "BÔNUS ENCERRAM EM",
    marqueeText: "MATERIAL EM ALTA QUALIDADE • ACESSO IMEDIATO • BÔNUS INCLUÍDOS • ",
    marqueeGradient: "linear-gradient(135deg, #fd5b00 0%, #ff8c1a 35%, #ffc107 65%, #ffd41e 100%)",
  },
  socialProof: {
    testimonials: [
      { src: "/images/CR-NINJA-15.webp", alt: "Depoimento 1", gradient: "linear-gradient(90deg, #0B7FE8, #1D4ED8)" },
      { src: "/images/CR-NINJA-16.webp", alt: "Depoimento 2", gradient: "linear-gradient(90deg, #22C978, #1AAF64)" },
      { src: "/images/CR-NINJA-17.webp", alt: "Depoimento 3", gradient: "linear-gradient(90deg, #49A6FF, #0B7FE8)" },
      { src: "/images/CR-NINJA-18.webp", alt: "Depoimento 4", gradient: "linear-gradient(90deg, #082F63, #1D4ED8)" },
      { src: "/images/CR-NINJA-15.webp", alt: "Depoimento 5", gradient: "linear-gradient(90deg, #22C978, #4ADE80)" },
      { src: "/images/CR-NINJA-16.webp", alt: "Depoimento 6", gradient: "linear-gradient(90deg, #0B7FE8, #49A6FF)" },
    ],
  },
  counter: {
    prefix: "+ de",
    target: 250,
    label: "atividades psicopedagógicas",
  },
  kitCards: {
    heading1: "Conheça o Material",
    heading2: "Que Vai Transformar\nSeus Atendimentos",
    images: [
      { src: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_26_00.webp", alt: "Jogo da Atenção" },
      { src: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_56-1.webp", alt: "Sequência Lógica" },
      { src: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_52-1.webp", alt: "Memória das Figuras" },
      { src: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_33.webp", alt: "Sílabas em Ação" },
      { src: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_44-1.webp", alt: "Trilha da Leitura" },
      { src: "/images/ChatGPT-Image-21-de-mai.-de-2026-14_25_48-1.webp", alt: "Coordenação Motora Fina" },
      { src: "/images/2dd43d5e-6d02-4303-b0f8-be047df9bb0c.webp", alt: "Atividade para Casa" },
      { src: "/images/7886b7ae-8c1b-49a2-b185-e4955ab73050.webp", alt: "Registro de Evolução" },
    ],
  },
  benefits: [
    { icon: "🧠", title: "Atenção e Concentração", desc: "Atividades lúdicas para estimular foco, controle inibitório e atenção sustentada." },
    { icon: "🔍", title: "Memória e Raciocínio", desc: "Exercícios para desenvolver retenção, associação e pensamento lógico." },
    { icon: "✏️", title: "Leitura e Escrita", desc: "Materiais para trabalhar consciência fonológica e alfabetização." },
    { icon: "🧩", title: "Organização e Praticidade", desc: "Fichas prontas para aplicar rapidamente sem precisar criar do zero." },
  ],
  urgency: {
    pill: "OPORTUNIDADE ÚNICA",
    title: "O que você está\nesperando para\nter ",
    highlight: "atendimentos profissionais",
    body: "Em poucos minutos você já consegue\nabrir o material e começar a\naplicar com seus pacientes.",
    ctaText: "Comece agora",
    trust: ["ACESSO IMEDIATO", "ACESSO VITALÍCIO"],
  },
  idealPara: {
    pill: "É PARA VOCÊ",
    title: "Ideal para você que…",
    subtitle: "Este material foi pensado para psicopedagogos, terapeutas e educadores que atuam com crianças e buscam mais organização e praticidade.",
    items: [
      { icon: "🎯", title: "Atividades prontas", desc: "Sem precisar criar do zero para cada atendimento" },
      { icon: "🎮", title: "Sessões lúdicas", desc: "Recursos que prendem a atenção e motivam as crianças" },
      { icon: "⚡", title: "Aplicação rápida", desc: "Materiais organizados por habilidade para usar no momento" },
      { icon: "📊", title: "Acompanhamento", desc: "Fichas e registros para documentar a evolução" },
    ],
  },
  deliverables: {
    pill: "CONTEÚDO DO KIT",
    title: "Veja o que você recebe",
    titleHighlight: "NeuroAtividades Kids",
    image: "/images/a4996fc9-5b06-464a-86b1-817af5b4f1ae.webp",
    imageAlt: "NeuroAtividades Kids",
    bullets: [
      "Mais de 250 atividades psicopedagógicas prontas",
      "Materiais para atenção, memória, leitura e escrita",
      "Atividades lúdicas e imprimíveis",
      "Fichas de aplicação organizadas por habilidade",
      "Material pronto para baixar e imprimir",
      "Acesso imediato após a compra",
    ],
  },
  bonuses: [
    // Extrair do array `bonuses` em src/components/sections/Bonuses.tsx
    // Formato: { front, back, title, desc, price }
    // (Ler o arquivo completo antes de preencher)
  ],
  pricing: {
    pill: "ESCOLHA SUA OPÇÃO",
    heading1: "Garanta seu",
    heading2: "NeuroAtividades Kids",
    image: "/images/4943e9df-5a44-4443-b18d-b7084546bdad.webp",
    imageAlt: "NeuroAtividades Kids",
    body: "Escolha o **Plano Básico** para acessar as atividades principais ou aproveite o **Plano Completo** para liberar uma versão mais robusta, com bônus extras, fichas de apoio e recursos para organizar melhor seus atendimentos.",
    plans: [
      {
        id: "basic",
        label: "PARA COMEÇAR HOJE",
        title: "Plano Básico",
        image: "/images/4943e9df-5a44-4443-b18d-b7084546bdad.webp",
        imageAlt: "Plano Básico",
        featured: false,
        oldPrice: "de R$ 47,00",
        price: "R$ 14,90",
        installments: "pagamento único • acesso imediato",
        items: [
          "+250 atividades psicopedagógicas prontas",
          "Materiais para atenção, memória, leitura, escrita e raciocínio lógico",
          "Atividades lúdicas e imprimíveis para atendimentos infantis",
          "Fichas de aplicação organizadas por habilidade",
          "Material pronto para baixar, imprimir e aplicar",
          "Acesso imediato após a compra",
        ],
        mutedItems: [
          "Não inclui os bônus complementares",
          "Não inclui roteiro de sondagem inicial",
          "Não inclui registro de evolução psicopedagógica",
        ],
        ctaText: "QUERO O PLANO BÁSICO",
        ctaHref: "https://pay.hotmart.com/I105936984X?off=u2fg19a2&checkoutMode=10",
      },
      {
        id: "premium",
        label: "TUDO DESBLOQUEADO",
        title: "Plano Completo",
        image: "/images/a4996fc9-5b06-464a-86b1-817af5b4f1ae.webp",
        imageAlt: "Plano Completo",
        featured: true,
        badgeText: "O MAIS ESCOLHIDO",
        extraNote: "A opção mais completa para aplicar, estimular, registrar e acompanhar a evolução da criança com mais praticidade",
        oldPrice: "de R$ 97,00",
        price: "R$ 22,90",
        installments: "pagamento único • acesso imediato",
        items: [
          "+250 atividades psicopedagógicas prontas",
          "Atividades para atenção, concentração e controle inibitório",
          "Recursos para memória visual e auditiva",
          "Materiais de consciência fonológica, leitura e escrita",
          "Atividades de sequência lógica e raciocínio",
          "Fichas de aplicação para atendimentos infantis",
          "Cartões de Reforço Positivo",
          "Roteiro de Sondagem Inicial",
          "Atividades para Enviar para Casa",
          "Registro de Evolução Psicopedagógica",
          "Acesso imediato após a compra",
        ],
        ctaText: "QUERO O PLANO COMPLETO",
        ctaHref: "https://pay.hotmart.com/I105936984X?off=fvch2t63&checkoutMode=10",
      },
    ],
    trustBadges: ["🔒 Compra segura", "⚡ Acesso imediato no WhatsApp e e-mail", "📱 Use no celular ou computador"],
  },
  guarantee: {
    marqueeText: "GARANTIA 30 DIAS",
    icon: "/images/INCONDICIONAL-_1_-1-1.webp",
    iconAlt: "Garantia de 30 dias",
    title: "Satisfação garantida\nou seu dinheiro de volta.",
    body: "Teste o **NeuroAtividades Kids** por 30 dias. Se você não gostar por algum motivo, devolvemos 100% do valor, sem perguntas.",
  },
  access: {
    title: "Como é o acesso",
    steps: [
      { num: "01", title: "Faça a compra", desc: "Escolha seu plano e finalize o pagamento de forma segura." },
      { num: "02", title: "Receba o acesso", desc: "O material chega no seu e-mail e WhatsApp imediatamente." },
      { num: "03", title: "Baixe e imprima", desc: "Acesse, baixe e imprima as atividades que quiser." },
      { num: "04", title: "Aplique nos atendimentos", desc: "Use nas sessões ou envie para casa com os pais." },
    ],
  },
  faq: {
    title: "Perguntas Frequentes",
    items: [
      { q: "Como recebo o material após a compra?", a: "Após a confirmação do pagamento, você recebe o link de acesso no e-mail cadastrado e também no WhatsApp. Basta clicar e fazer o download." },
      { q: "O material é indicado para qual faixa etária?", a: "As atividades são voltadas para crianças em fase de alfabetização e desenvolvimento infantil, aproximadamente dos 4 aos 12 anos, podendo ser adaptadas conforme a necessidade." },
      { q: "Posso imprimir as atividades quantas vezes quiser?", a: "Sim! Ao adquirir o material, você tem acesso vitalício e pode imprimir quantas vezes precisar para usar com seus pacientes." },
      { q: "O material atende diferentes habilidades?", a: "Sim. As atividades são organizadas por habilidade (atenção, memória, leitura, escrita, raciocínio lógico, etc.), facilitando a escolha do recurso ideal para cada momento." },
      { q: "E se eu não gostar do material?", a: "Você tem 7 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeito, devolvemos 100% do seu dinheiro." },
    ],
  },
  footer: {
    updateTitle: "Material em constante atualização",
    updateBody: "O NeuroAtividades Kids recebe novas atividades periodicamente. Ao adquirir agora, você garante acesso vitalício e todas as atualizações futuras sem pagar nada a mais.",
    copyright: "2025 © Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.",
  },
}
```

**ATENÇÃO:** O array `bonuses: []` acima está vazio como placeholder. Antes de salvar, ler o arquivo `src/components/sections/Bonuses.tsx` completo e extrair todos os itens do array `const bonuses`. Preencher com os dados reais.

- [ ] **Step 2: Typecheck deve passar sem erros**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/config/offer.ts
git commit -m "feat(p2): add offer.ts config for NeuroAtividades Kids"
```

---

### Task 6: Injetar paleta como CSS custom properties via layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Atualizar layout.tsx para importar OFFER e injetar paleta**

Substituir o conteúdo de `src/app/layout.tsx` por:

```tsx
import type { Metadata } from "next";
import { Nunito, Inter, Sora, Poppins } from "next/font/google";
import { OFFER } from "@/config/offer";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: OFFER.meta.title,
  description: OFFER.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { palette: p } = OFFER;
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} ${inter.variable} ${sora.variable} ${poppins.variable} antialiased`}
      style={{
        "--brand": p.brand,
        "--brand-deep": p.brandDeep,
        "--brand-ink": p.brandInk,
        "--brand-dark": p.brandDark,
        "--brand-light": p.brandLight,
        "--brand-subtle": p.brandSubtle,
        "--cta": p.cta,
        "--cta-deep": p.ctaDeep,
        "--cta-darkest": p.ctaDarkest,
        "--accent": p.accent,
        "--yellow": p.yellow,
        "--bg": p.bg,
      } as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Build deve passar**

```bash
npm run build
```

- [ ] **Step 3: Verificar no browser que as cores não mudaram** (dev server)

```bash
npm run dev
```

Abrir localhost e confirmar visual idêntico.

- [ ] **Step 4: Testar troca de paleta** — no `offer.ts`, mudar temporariamente `brand: "#E53E3E"` (vermelho), salvar e verificar que o azul da página vira vermelho. Depois desfazer.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(p2): inject palette from offer.ts as CSS custom properties"
```

---

### Task 7: Refatorar seções simples para ler da config

Seções que só exibem arrays de dados hardcoded: `Benefits`, `IdealParaVoce`, `TudoQueVoceRecebe`, `CounterPainPoints`, `KitCards`, `ComoEAcesso`, `FAQ`, `Footer`.

**Padrão de refatoração:** remover o array/constante hardcoded do topo do arquivo e importar da config. A estrutura JSX permanece inalterada.

**Files:**
- Modify: `src/components/sections/Benefits.tsx`
- Modify: `src/components/sections/IdealParaVoce.tsx`
- Modify: `src/components/sections/TudoQueVoceRecebe.tsx`
- Modify: `src/components/sections/CounterPainPoints.tsx`
- Modify: `src/components/sections/KitCards.tsx`
- Modify: `src/components/sections/ComoEAcesso.tsx`
- Modify: `src/components/sections/FAQ.tsx`
- Modify: `src/components/sections/Footer.tsx`

- [ ] **Step 1: Refatorar Benefits.tsx**

Remover `const benefits = [...]` do topo. Adicionar import e prop:

```tsx
import { OFFER } from "@/config/offer"

export function Benefits() {
  const benefits = OFFER.benefits
  return (
    // JSX inalterado
  )
}
```

- [ ] **Step 2: Refatorar IdealParaVoce.tsx**

```tsx
import { OFFER } from "@/config/offer"

export function IdealParaVoce() {
  const { pill, title, subtitle, items } = OFFER.idealPara
  return (
    <section className="idv-section">
      <div className="idv-inner">
        <div className="idv-pill">{pill}</div>
        <h2 className="idv-title">{title}</h2>
        <p className="idv-sub">{subtitle}</p>
        <div className="idv-grid">
          {items.map((item, i) => (
            <div className="idv-card" key={i}>
              <div className="idv-card-icon">{item.icon}</div>
              <h3 className="idv-card-title">{item.title}</h3>
              <p className="idv-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Refatorar TudoQueVoceRecebe.tsx**

Remover `const bullets = [...]`. Adicionar no componente:
```tsx
import { OFFER } from "@/config/offer"
// ...
const { pill, title, titleHighlight, image, imageAlt, bullets } = OFFER.deliverables
```
Substituir strings hardcoded na JSX pelas variáveis acima.

- [ ] **Step 4: Refatorar CounterPainPoints.tsx**

Remover valores hardcoded `target = 250` e `"atividades psicopedagógicas"`. Adicionar:
```tsx
import { OFFER } from "@/config/offer"
// ...
const { prefix, target, label } = OFFER.counter
```
Substituir `250` por `target` no `animate()` e `aria-valuemax`, e `"atividades psicopedagógicas"` por `{label}`.

- [ ] **Step 5: Refatorar KitCards.tsx**

```tsx
import { OFFER } from "@/config/offer"

export function KitCards() {
  const { heading1, heading2, images } = OFFER.kitCards
  const headingLines = heading2.split('\n')
  return (
    <div className="bloco-categoria-interpretacao">
      <div className="bloco-categoria-inner">
        <div className="cat-topo-interpretacao">
          <div className="cat-titulo-interpretacao">
            <span className="cat-numero-destaque">{heading1}</span>
            <span className="cat-linha-titulo">
              {headingLines[0]}<br />{headingLines[1]}
            </span>
          </div>
        </div>
        <div className="esteira-interpretacao-wrap">
          <div className="esteira-interpretacao">
            <div className="esteira-interpretacao-track">
              {[...images, ...images].map((img, i) => (
                <div className="esteira-interpretacao-img" key={i}>
                  <img src={img.src} alt={img.alt} width={200} height={280} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Refatorar ComoEAcesso.tsx**

```tsx
import { OFFER } from "@/config/offer"

export function ComoEAcesso() {
  const { title, steps } = OFFER.access
  return (
    <section className="cea-section">
      <div className="cea-inner">
        <h2 className="cea-title">{title}</h2>
        <div className="cea-steps">
          {steps.map((step, i) => (
            <div className="cea-step" key={i}>
              <div className="cea-step-num">{step.num}</div>
              <div className="cea-step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Refatorar FAQ.tsx**

```tsx
import { OFFER } from "@/config/offer"

// Remover const faqItems = [...]. No componente:
const { title, items: faqItems } = OFFER.faq
```
Substituir `"Perguntas Frequentes"` hardcoded por `{title}`.

- [ ] **Step 8: Refatorar Footer.tsx**

```tsx
import { OFFER } from "@/config/offer"

export function Footer() {
  const { updateTitle, updateBody, copyright } = OFFER.footer
  return (
    <>
      <div className="pei-promo-wrap">
        <div className="pei-promo-inner">
          <h3>{updateTitle}</h3>
          <p>{updateBody}</p>
        </div>
      </div>
      <footer className="edu-toast-wrap" role="contentinfo">
        {copyright}
      </footer>
    </>
  )
}
```

- [ ] **Step 9: Build e typecheck devem passar**

```bash
npm run check
```

- [ ] **Step 10: Commit**

```bash
git add src/components/sections/Benefits.tsx src/components/sections/IdealParaVoce.tsx src/components/sections/TudoQueVoceRecebe.tsx src/components/sections/CounterPainPoints.tsx src/components/sections/KitCards.tsx src/components/sections/ComoEAcesso.tsx src/components/sections/FAQ.tsx src/components/sections/Footer.tsx
git commit -m "feat(p2): refactor 8 simple sections to read from offer config"
```

---

### Task 8: Refatorar seções com lógica interativa (VendaImediata, SocialProof, Urgencia, Bonuses, OfferPricing, Guarantee)

**Files:**
- Modify: `src/components/sections/VendaImediata.tsx`
- Modify: `src/components/sections/SocialProof.tsx`
- Modify: `src/components/sections/Urgencia.tsx`
- Modify: `src/components/sections/Bonuses.tsx`
- Modify: `src/components/sections/OfferPricing.tsx`
- Modify: `src/components/sections/Guarantee.tsx`

- [ ] **Step 1: Refatorar VendaImediata.tsx**

O timer e scroll logic permanecem. Remover strings hardcoded. Adicionar ao topo do componente (após os imports):

```tsx
import { OFFER } from "@/config/offer"
```

No corpo do componente, antes do `return`:
```tsx
const { pill, titleLine1, titleLine2, titleLine3, image, imageAlt, imageWidth, imageHeight, subtitle, ctaText, timerLabel, marqueeText, marqueeGradient } = OFFER.hero
```

Substituir todos os valores hardcoded na JSX:
- `"NEUROATIVIDADES KIDS"` → `{pill}`
- `"+250 Atividades Prontas"` → `{titleLine1}`
- `"para atendimentos"` → `{titleLine2}`
- `"Psicopedagógicos infantis"` → `{titleLine3}`
- `src="/images/a4996fc9..."` → `src={image}`
- `alt="NeuroAtividades Kids"` → `alt={imageAlt}`
- `width={340}` → `width={imageWidth}`
- `height={425}` → `height={imageHeight}`
- A string do subtítulo → `{subtitle}`
- `"QUERO ACESSAR O KIT AGORA"` → `{ctaText}`
- `"BÔNUS ENCERRAM EM"` → `{timerLabel}`
- O `text=` do `ScrollMarquee` → `text={marqueeText}`
- O `gradient=` do `ScrollMarquee` → `gradient={marqueeGradient}`

- [ ] **Step 2: Refatorar SocialProof.tsx**

Remover `const testimonials = [...]` do topo. Adicionar:
```tsx
import { OFFER } from "@/config/offer"
// ...
const testimonials = OFFER.socialProof.testimonials
```
Na JSX: `color` → `gradient` (o campo mudou de nome de `color` para `gradient`). Atualizar a referência de `.color` para `.gradient` nas ocorrências.

- [ ] **Step 3: Refatorar Urgencia.tsx**

```tsx
import { OFFER } from "@/config/offer"

export function Urgencia() {
  const { pill, title, highlight, body, ctaText, trust } = OFFER.urgency
  return (
    <section className="urg-section">
      <div className="urg-inner">
        <div className="urg-card">
          <div className="urg-glow" />
          <div className="urg-pill">
            <span className="urg-pill-icon">&#9889;</span>
            {pill}
          </div>
          <h2 className="urg-title">
            {title.split('\n').map((line, i) => (
              <span key={i}>{line}{i === title.split('\n').length - 1 ? <span className="urg-highlight">{highlight}</span> : null}<br /></span>
            ))}
            de verdade?
          </h2>
          <div className="urg-dots">
            <span className="urg-dot" />
            <span className="urg-dot urg-dot-active" />
            <span className="urg-dot" />
          </div>
          <p className="urg-text">
            {body.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
          <div className="urg-cta-wrap">
            <ShinyButton href="#oferta" className="urg-cta-btn">{ctaText}</ShinyButton>
          </div>
          <div className="urg-trust">
            {trust.map((t, i) => (
              <span key={i}>
                {i > 0 && <span className="urg-trust-sep">&bull;</span>}
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Refatorar Bonuses.tsx**

Remover `const bonuses = [...]` do topo. Adicionar:
```tsx
import { OFFER } from "@/config/offer"
```
No componente (antes da JSX):
```tsx
const bonuses = OFFER.bonuses
```
Toda a lógica de flip card e timer permanece inalterada.

- [ ] **Step 5: Refatorar OfferPricing.tsx**

```tsx
import { ShinyButton } from "@/components/ui/ShinyButton"
import { OFFER } from "@/config/offer"

export function OfferPricing() {
  const { pill, heading1, heading2, image, imageAlt, body, plans, trustBadges } = OFFER.pricing
  return (
    <section className="offer-pei-section" id="oferta">
      <div className="offer-pei-container">
        <div className="offer-pei-head">
          <div className="offer-pei-pill">{pill}</div>
          <h2>
            <span className="offer-main-line">{heading1}</span>
            <span>{heading2}</span>
          </h2>
          <div className="offer-product-preview">
            <img src={image} alt={imageAlt} width={320} height={400} />
          </div>
          <p dangerouslySetInnerHTML={{ __html: body.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
        </div>
        <div className="offer-pei-grid">
          {plans.map((plan) => (
            <div key={plan.id} className={`offer-card ${plan.featured ? 'premium-plan' : 'basic-plan'}`}>
              {plan.badgeText && <div className="offer-badge">{plan.badgeText}</div>}
              <div className="offer-card-top">
                <div className={`plan-label ${plan.featured ? 'premium-label' : 'basic-label'}`}>{plan.label}</div>
                <h3>{plan.title}</h3>
                <div className="offer-plan-img">
                  <img src={plan.image} alt={plan.imageAlt} width={200} height={250} />
                </div>
              </div>
              <div className="offer-price-block">
                <div className="offer-old-price">{plan.oldPrice}</div>
                <div className="offer-price">{plan.price}</div>
                <div className="offer-installments">{plan.installments}</div>
              </div>
              {plan.extraNote && <div className="premium-extra-note">{plan.extraNote}</div>}
              <ul className="offer-list">
                {plan.items.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
                {plan.mutedItems?.map((item, i) => (
                  <li key={`m-${i}`} className="muted">{item}</li>
                ))}
              </ul>
              <ShinyButton href={plan.ctaHref} className={`offer-btn ${plan.featured ? 'premium-btn' : 'basic-btn'}`} showArrow={false}>
                {plan.ctaText}
              </ShinyButton>
            </div>
          ))}
        </div>
        <div className="offer-bottom-info">
          {trustBadges.map((badge, i) => <span key={i}>{badge}</span>)}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Refatorar Guarantee.tsx**

Remover strings hardcoded. Adicionar:
```tsx
import { OFFER } from "@/config/offer"
```
No componente:
```tsx
const { marqueeText, icon, iconAlt, title, body } = OFFER.guarantee
```
Substituir na JSX:
- `text="GARANTIA 30 DIAS"` → `text={marqueeText}` (em ambos os `ScrollMarquee`)
- `src="/images/INCONDICIONAL..."` → `src={icon}`
- `alt="Garantia de 30 dias"` → `alt={iconAlt}`
- O `gar-title` hardcoded → renderizar `{title}` com `dangerouslySetInnerHTML` ou splitlines em `<br>`
- O parágrafo do `gar-text` → renderizar `{body}` com bold markdown simples

- [ ] **Step 7: Build e typecheck devem passar**

```bash
npm run check
```

- [ ] **Step 8: Testar troca completa de oferta** — no `offer.ts`, mudar o título do hero e um preço, verificar que os dois campos mudam na página.

- [ ] **Step 9: Commit**

```bash
git add src/components/sections/
git commit -m "feat(p2): refactor all sections to read from offer config — nova oferta = 1 arquivo"
```

---

## FASE 3 — Performance / Leveza

### Task 9: Reduzir fontes de 4 para 2

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Verificar usos reais de Sora e Poppins no CSS vivo**

```bash
grep -c "font-family:.*'Sora'" src/app/globals.css
grep -c "font-family:.*'Poppins'" src/app/globals.css
```

Anotar os números. Se Sora > 10 ou Poppins > 10, vale manter; se < 10, substituir por Nunito é seguro.

- [ ] **Step 2: Substituir Sora por Nunito no CSS**

```bash
node -e "
const fs = require('fs');
let c = fs.readFileSync('src/app/globals.css','utf8');
c = c.replace(/'Sora'[^,;]*(,\s*system-ui)?/g, \"'Nunito', system-ui, sans-serif\");
c = c.replace(/'Poppins'[^,;]*(,\s*system-ui)?/g, \"'Inter', system-ui, sans-serif\");
fs.writeFileSync('src/app/globals.css',c);
console.log('Done');
"
```

- [ ] **Step 3: Remover imports de Sora e Poppins de layout.tsx**

Em `layout.tsx`, remover os blocos:
```tsx
const sora = Sora({...})
const poppins = Poppins({...})
```
E remover `import { ..., Sora, Poppins } from "next/font/google"`.

Remover `${sora.variable}` e `${poppins.variable}` da className do `<html>`.

- [ ] **Step 4: Verificar que não sobrou referência a Sora/Poppins**

```bash
grep -r "Sora\|Poppins\|--font-sora\|--font-poppins" src/
```

Esperado: nenhuma saída.

- [ ] **Step 5: Build deve passar**

```bash
npm run build
```

Inspecionar visualmente os títulos e body — devem parecer os mesmos ou melhores.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "perf(p3): reduzir 4 fontes para 2 (Nunito + Inter)"
```

---

### Task 10: Converter `<img>` cru para `next/image`

**Files:**
- Modify: `src/components/sections/VendaImediata.tsx`
- Modify: `src/components/sections/TudoQueVoceRecebe.tsx`
- Modify: `src/components/sections/OfferPricing.tsx`
- Modify: `src/components/sections/Guarantee.tsx`
- Modify: `src/components/sections/KitCards.tsx`

- [ ] **Step 1: Converter img do hero em VendaImediata.tsx (priority)**

Adicionar import no topo: `import Image from "next/image"`

Substituir:
```tsx
// antes
<img src={image} alt={imageAlt} width={imageWidth} height={imageHeight} />
// depois
<Image src={image} alt={imageAlt} width={imageWidth} height={imageHeight} priority />
```

- [ ] **Step 2: Converter imagens em TudoQueVoceRecebe.tsx**

```tsx
import Image from "next/image"
// ...
// antes
<img src={image} alt={imageAlt} width={340} height={425} />
// depois
<Image src={image} alt={imageAlt} width={340} height={425} />
```

- [ ] **Step 3: Converter imagens em OfferPricing.tsx**

```tsx
import Image from "next/image"
// Preview e imagens de plano
// Substituir todos os <img> por <Image> com width/height mantidos
```

- [ ] **Step 4: Converter imagem em Guarantee.tsx**

```tsx
import Image from "next/image"
// ...
<Image src={icon} alt={iconAlt} width={140} height={140} />
```

- [ ] **Step 5: Converter imagens em KitCards.tsx (lazy)**

```tsx
import Image from "next/image"
// ...
<Image src={img.src} alt={img.alt} width={200} height={280} loading="lazy" />
```
Remover `loading="lazy"` pois é default no `next/image`.

- [ ] **Step 6: Verificar next.config se necessário**

Se o build falhar com "hostname not configured", adicionar em `next.config.ts`:
```ts
images: {
  unoptimized: true, // para imagens locais em /public sem CDN
}
```

- [ ] **Step 7: Build deve passar**

```bash
npm run build
```

- [ ] **Step 8: Commit**

```bash
git add src/components/sections/
git commit -m "perf(p3): img cru → next/image com priority no hero"
```

---

### Task 11: Pausar animações fora da viewport + prefers-reduced-motion

**Files:**
- Modify: `src/components/ui/ScrollMarquee.tsx`
- Modify: `src/components/sections/KitCards.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Ler ScrollMarquee.tsx atual**

Ler o arquivo para entender a implementação atual antes de modificar.

- [ ] **Step 2: Adicionar pausa por IntersectionObserver ao ScrollMarquee**

Substituir a implementação de `src/components/ui/ScrollMarquee.tsx` por:

```tsx
"use client"
import { useEffect, useRef } from "react"

interface Props {
  text: string
  gradient?: string
  className?: string
  reverse?: boolean
}

export function ScrollMarquee({ text, gradient, className = "", reverse = false }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        track.style.animationPlayState = entry.isIntersecting ? "running" : "paused"
      },
      { threshold: 0 }
    )
    obs.observe(wrap)
    return () => obs.disconnect()
  }, [])

  const repeated = text.repeat(8)

  return (
    <div
      ref={wrapRef}
      className={`scroll-marquee ${className}`}
      style={gradient ? { background: gradient } : undefined}
    >
      <div
        ref={trackRef}
        className="scroll-marquee-content"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        <span className="scroll-marquee-text">{repeated}</span>
        <span className="scroll-marquee-text" aria-hidden>{repeated}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Adicionar `@media (prefers-reduced-motion)` para marquees no globals.css**

Verificar se já existe no arquivo. Se não existir, adicionar ao final da seção SCROLL MARQUEE no CSS:

```css
@media (prefers-reduced-motion: reduce) {
  .scroll-marquee-content {
    animation: none;
  }
  .esteira-interpretacao-track {
    animation: none;
  }
}
```

- [ ] **Step 4: Adicionar pausa por IntersectionObserver ao KitCards.tsx**

Adicionar `useRef` para o track e `useEffect` com IntersectionObserver:

```tsx
"use client"
import { useEffect, useRef } from "react"
import { OFFER } from "@/config/offer"

export function KitCards() {
  const { heading1, heading2, images } = OFFER.kitCards
  const headingLines = heading2.split('\n')
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return
    const obs = new IntersectionObserver(
      ([e]) => { track.style.animationPlayState = e.isIntersecting ? "running" : "paused" },
      { threshold: 0 }
    )
    obs.observe(wrap)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="bloco-categoria-interpretacao">
      <div className="bloco-categoria-inner">
        <div className="cat-topo-interpretacao">
          <div className="cat-titulo-interpretacao">
            <span className="cat-numero-destaque">{heading1}</span>
            <span className="cat-linha-titulo">
              {headingLines[0]}<br />{headingLines[1]}
            </span>
          </div>
        </div>
        <div className="esteira-interpretacao-wrap" ref={wrapRef}>
          <div className="esteira-interpretacao">
            <div className="esteira-interpretacao-track" ref={trackRef}>
              {[...images, ...images].map((img, i) => (
                <div className="esteira-interpretacao-img" key={i}>
                  <img src={img.src} alt={img.alt} width={200} height={280} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Build e typecheck devem passar**

```bash
npm run check
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/ScrollMarquee.tsx src/components/sections/KitCards.tsx src/app/globals.css
git commit -m "perf(p3): pausar marquees fora da viewport + prefers-reduced-motion"
```

---

### Task 12: Verificação final de performance

- [ ] **Step 1: Build de produção**

```bash
npm run build
```

Verificar no output do build o tamanho do bundle JS e CSS. Anotar.

- [ ] **Step 2: Verificar que nenhum `<img>` cru sobrou nas seções principais**

```bash
grep -rn "<img " src/components/sections/ | grep -v "//\|eslint-disable"
```

Para cada ocorrência restante, verificar se precisa ser migrada. Imagens dentro de `bon-new-img` (card de bônus com flip) podem ficar como `<img>` por enquanto (a animação 3D com `object-fit` pode ter issues com `next/image`).

- [ ] **Step 3: Commit final**

```bash
git add -A
git commit -m "perf(p3): verificação final — template low ticket padronizado e otimizado"
```

---

## Resumo das Verificações por Fase

| Fase | Comando | Critério de Sucesso |
|------|---------|---------------------|
| P1 | `npm run build` | Build verde; ~1.180 linhas removidas do CSS |
| P2 | `npm run check` + trocar valor na config | Visual inalterado; troca propagada em 1 arquivo |
| P3 | `npm run build` + Lighthouse | LCP melhora; fontes reduzidas no network tab |

---

## Notas Importantes

- **Ordem é obrigatória:** P1 → P2 → P3. P2 depende dos tokens do P1.
- **Scripts de Node** em `scripts/` devem ser executados da raiz do projeto (`cd .../lowticket`).
- **Imagens em cards flip (Bonuses):** manter `<img>` cru por enquanto — o flip 3D com CSS `transform: rotateY` + `next/image` pode gerar artefatos de layout.
- **`dangerouslySetInnerHTML` em OfferPricing/Guarantee:** só processar markdown simples (`**bold**`) vindo de `offer.ts` — conteúdo não é user-supplied.
- **Array `bonuses`** em `offer.ts`: ler `src/components/sections/Bonuses.tsx` completo para extrair todos os itens antes de criar o config (o plano mostra o array vazio como placeholder).
