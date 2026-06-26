# Psicopedagogia Offer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a new offer landing page for "Mapa de Perfil Infantil para Psicopedagogas Iniciantes" at route `/psicopedagogia` mirroring the existing `lembrancinhas` structure.

**Architecture:** Static offer config drives all content via React Context + CSS custom properties. Sections are shared components reused without modification. PaletteSwitcher provides runtime color switching.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, CSS Custom Properties

## Global Constraints

- Root route `/` must keep redirecting to `/lembrancinhas` (do NOT change `src/app/page.tsx`)
- Existing `lembrancinhas` offer files must NOT be modified
- All copy follows the spec at `docs/superpowers/specs/2026-06-26-psicopedagogia-offer-design.md`
- Checkout links use `#` placeholder — to be replaced later
- Image paths use `/images/psicopedagogia/` — images will be provided later
- 6 bonuses (not 5 like lembrancinhas)
- PaletteSwitcher must be visible on psicopedagogia page

---

### Task 1: Offer Config

**Files:**
- Create: `src/config/offers/psicopedagogia/offer.ts`

**Interfaces:**
- Consumes: `OfferConfig` type from `@/types/offer`
- Produces: `export const OFFER: OfferConfig`

- [ ] **Step 1: Create the offer config file**

```typescript
import type { OfferConfig } from '@/types/offer'

export const OFFER: OfferConfig = {
  meta: {
    title: "Mapa de Perfil Infantil para Psicopedagogas Iniciantes",
    description: "Um mapa visual e prático para psicopedagogas iniciantes identificarem o perfil da criança, escolherem o objetivo da sessão e conduzirem o atendimento com mais segurança.",
  },
  palette: {
    brand: "#0D4F4F",
    brandDeep: "#0A3D3D",
    brandInk: "#062B2B",
    brandDark: "#126161",
    brandLight: "#7AB8B8",
    brandSubtle: "#E0F0F0",
    cta: "#16A34A",
    ctaDeep: "#11863D",
    ctaDarkest: "#0E6B31",
    accent: "#E8634A",
    yellow: "#F0B040",
    bg: "#F5F8F0",
    bgAlt: "#E8634A",
  },
  hero: {
    pill: "MAPA DE PERFIL INFANTIL",
    titleLine1: "Mapa de Perfil Infantil",
    titleLine2: "para psicopedagogas iniciantes",
    titleLine3: "Identifique, escolha e conduza com mais segurança",
    image: "/images/psicopedagogia/hero.webp",
    imageAlt: "Mapa de Perfil Infantil",
    imageWidth: 340,
    imageHeight: 425,
    subtitle: "Um mapa visual e prático para psicopedagogas iniciantes identificarem o perfil da criança, escolherem o objetivo da sessão e conduzirem o atendimento com mais segurança, clareza e menos improviso.",
    ctaText: "QUERO O MAPA DE PERFIL INFANTIL",
    timerLabel: "BÔNUS ENCERRAM EM",
    marqueeText: "15 Perfis Infantis • Atividade-guia para cada perfil • Acesso Imediato • ",
    marqueeGradient: "linear-gradient(90deg, #0D4F4F 0%, #126161 30%, #7AB8B8 55%, #E0F0F0 80%, #0D4F4F 100%)",
    bullets: [
      "Identificar o perfil da criança",
      "Escolher a atividade certa",
      "Definir o objetivo da sessão",
      "Conduzir sem improvisar",
      "Atender com mais segurança",
    ],
  },
  socialProof: {
    title: "Olha só o que Psicopedagogas Iniciantes estão achando",
    testimonials: [
      { src: "/images/psicopedagogia/depoimento-1.webp", alt: "Depoimento 1", gradient: "linear-gradient(90deg, #0D4F4F, #0A3D3D)" },
      { src: "/images/psicopedagogia/depoimento-2.webp", alt: "Depoimento 2", gradient: "linear-gradient(90deg, #16A34A, #11863D)" },
      { src: "/images/psicopedagogia/depoimento-3.webp", alt: "Depoimento 3", gradient: "linear-gradient(90deg, #7AB8B8, #0D4F4F)" },
      { src: "/images/psicopedagogia/depoimento-4.webp", alt: "Depoimento 4", gradient: "linear-gradient(90deg, #0A3D3D, #062B2B)" },
      { src: "/images/psicopedagogia/depoimento-5.webp", alt: "Depoimento 5", gradient: "linear-gradient(90deg, #16A34A, #E8634A)" },
      { src: "/images/psicopedagogia/depoimento-6.webp", alt: "Depoimento 6", gradient: "linear-gradient(90deg, #0D4F4F, #16A34A)" },
      { src: "/images/psicopedagogia/depoimento-7.webp", alt: "Depoimento 7", gradient: "linear-gradient(90deg, #7AB8B8, #0A3D3D)" },
      { src: "/images/psicopedagogia/depoimento-8.webp", alt: "Depoimento 8", gradient: "linear-gradient(90deg, #E8634A, #0D4F4F)" },
    ],
  },
  counter: {
    prefix: "+ de",
    target: 15,
    label: "Perfis Infantis organizados para suas sessões",
  },
  kitCards: {
    heading1: "VEJA POR DENTRO O MAPA DO PERFIL QUE VAI TE AJUDAR NAS SESSÕES",
    images: [
      { src: "/images/psicopedagogia/kit-1.webp", alt: "Mapa de Perfil Infantil 1" },
      { src: "/images/psicopedagogia/kit-2.webp", alt: "Mapa de Perfil Infantil 2" },
      { src: "/images/psicopedagogia/kit-3.webp", alt: "Mapa de Perfil Infantil 3" },
      { src: "/images/psicopedagogia/kit-4.webp", alt: "Mapa de Perfil Infantil 4" },
      { src: "/images/psicopedagogia/kit-5.webp", alt: "Mapa de Perfil Infantil 5" },
      { src: "/images/psicopedagogia/kit-6.webp", alt: "Mapa de Perfil Infantil 6" },
      { src: "/images/psicopedagogia/kit-7.webp", alt: "Mapa de Perfil Infantil 7" },
      { src: "/images/psicopedagogia/kit-8.webp", alt: "Mapa de Perfil Infantil 8" },
      { src: "/images/psicopedagogia/kit-9.webp", alt: "Mapa de Perfil Infantil 9" },
      { src: "/images/psicopedagogia/kit-10.webp", alt: "Mapa de Perfil Infantil 10" },
    ],
  },
  benefits: {
    title: "O Mapa de Perfil Infantil possui tudo para tornar suas sessões mais seguras, organizadas e sem improviso",
    ctaText: "QUERO O MAPA DE PERFIL INFANTIL",
    items: [
      { icon: "🧠", title: "15 perfis infantis organizados", desc: "A psicopedagoga consegue identificar perfis como criança agitada, dispersa, ansiosa, resistente, impulsiva, desorganizada e muito mais." },
      { icon: "🎯", title: "Atividade certa para cada perfil", desc: "Em vez de escolher no improviso, ela consulta o perfil da criança e encontra uma atividade-guia mais adequada para aquele atendimento." },
      { icon: "📋", title: "Aplicação simples na sessão", desc: "Basta observar o comportamento da criança, seguir o mapa visual e aplicar a orientação indicada com mais clareza." },
      { icon: "✅", title: "Mais segurança para iniciantes", desc: "Mesmo no início da prática clínica, a psicopedagoga consegue entrar na sessão com um caminho claro para seguir." },
    ],
  },
  urgency: {
    pill: "OPORTUNIDADE ÚNICA",
    title: "APROVEITE O PREÇO PROMOCIONAL POR TEMPO LIMITADO",
    highlight: "",
    body: "Pare de escolher atividades no improviso e comece a conduzir suas sessões com mais clareza. Com o Mapa de Perfil Infantil, você sabe o que observar, qual perfil identificar e qual atividade aplicar com cada criança.",
    ctaText: "QUERO ACESSAR AGORA E USAR HOJE",
    trust: ["ACESSO IMEDIATO • ACESSO VITALÍCIO"],
  },
  idealPara: {
    pill: "É PARA VOCÊ",
    title: "ESTE MATERIAL É IDEAL PARA VOCÊ QUE DESEJA:",
    subtitle: "Feito para psicopedagogas iniciantes que querem mais segurança nos primeiros atendimentos.",
    items: [
      { icon: "🚀", title: "Parar de improvisar nas sessões", desc: "Ter um mapa visual para seguir antes e durante cada atendimento." },
      { icon: "🎯", title: "Escolher atividades com mais segurança", desc: "Saber exatamente qual atividade aplicar de acordo com o perfil da criança." },
      { icon: "🧩", title: "Saber o que aplicar com cada perfil infantil", desc: "Identificar a criança agitada, dispersa, ansiosa, resistente e saber o que fazer." },
      { icon: "💪", title: "Se sentir mais preparada nos primeiros atendimentos", desc: "Entrar na sessão com um caminho claro, mesmo sem experiência prática." },
    ],
  },
  deliverables: {
    pill: "⚡ ACESSO IMEDIATO",
    title: "TUDO O QUE VOCÊ VAI RECEBER",
    titleHighlight: "",
    image: "/images/psicopedagogia/deliverables.webp",
    imageAlt: "Mapa de Perfil Infantil",
    bullets: [
      "Mapa de Perfil Infantil para Psicopedagogas Iniciantes",
      "Arquivo Digital pronto para imprimir",
      "Material visual, organizado e fácil de aplicar",
      "Mapa geral com 15 perfis infantis",
      "Atividade-guia para cada perfil infantil",
      "Orientação simples de como aplicar",
      "Entrega imediata por Whatsapp e e-mail",
      "E muito mais…",
    ],
  },
  bonusSection: {
    pill: "EXTRA INCLUÍDO",
    titleLead: "6 BÔNUS",
    titleHighlight: "EXCLUSIVOS",
    subtitle: "Além do Mapa de Perfil Infantil, ao adquirir o Plano Completo você também recebe 6 bônus especiais.",
    cardLabel: "BÔNUS",
    touchHint: "Toque na imagem acima para ver o conteúdo.",
    backHint: "Toque para voltar",
    timerText: "BÔNUS DISPONÍVEIS SOMENTE\nNO PLANO COMPLETO",
    freeLabel: "GRÁTIS",
  },
  bonuses: [
    {
      front: "/images/psicopedagogia/bonus-1-frente.webp",
      back: "/images/psicopedagogia/bonus-1-verso.webp",
      title: "Roteiro Sessão Sem Travar",
      titleBreak: "Roteiro Sessão\nSem Travar",
      desc: "Um roteiro prático para a psicopedagoga saber como conduzir a sessão do início ao fim, sem ficar perdida ou travar no meio do atendimento.",
      price: "R$ 29,90",
    },
    {
      front: "/images/psicopedagogia/bonus-2-frente.webp",
      back: "/images/psicopedagogia/bonus-2-verso.webp",
      title: "Checklist Anti-Improviso",
      titleBreak: "Checklist\nAnti-Improviso",
      desc: "Um checklist simples para preparar a sessão antes da criança chegar, com perfil, objetivo, atividade, materiais, plano B e frases de condução.",
      price: "R$ 12,90",
    },
    {
      front: "/images/psicopedagogia/bonus-3-frente.webp",
      back: "/images/psicopedagogia/bonus-3-verso.webp",
      title: "Atividades Prontas por Perfil Infantil",
      titleBreak: "Atividades Prontas\npor Perfil Infantil",
      desc: "Um banco com 75 atividades prontas, separadas por perfil infantil, para a psicopedagoga ter mais opções do que aplicar em cada tipo de criança.",
      price: "R$ 19,90",
    },
    {
      front: "/images/psicopedagogia/bonus-4-frente.webp",
      back: "/images/psicopedagogia/bonus-4-verso.webp",
      title: "Mapa dos Perfis Combinados",
      titleBreak: "Mapa dos Perfis\nCombinados",
      desc: "Um mapa visual para ajudar quando a criança apresenta mais de um comportamento ao mesmo tempo, como agitação com impulsividade ou ansiedade com resistência.",
      price: "R$ 19,90",
    },
    {
      front: "/images/psicopedagogia/bonus-5-frente.webp",
      back: "/images/psicopedagogia/bonus-5-verso.webp",
      title: "Fichas de Evolução da Criança",
      titleBreak: "Fichas de Evolução\nda Criança",
      desc: "Fichas práticas para registrar o que aconteceu na sessão, acompanhar avanços, perceber padrões e planejar o próximo atendimento com mais organização.",
      price: "R$ 12,90",
    },
    {
      front: "/images/psicopedagogia/bonus-6-frente.webp",
      back: "/images/psicopedagogia/bonus-6-verso.webp",
      title: "Kit Visual de Combinados",
      titleBreak: "Kit Visual de\nCombinados",
      desc: "Cards visuais para criar combinados com a criança, organizar a sessão e retomar regras sem transformar tudo em bronca.",
      price: "R$ 12,90",
    },
  ],
  pricing: {
    titleLead: "APROVEITE ENQUANTO",
    titleHighlight: "O PLANO COMPLETO ESTÁ EM PROMOÇÃO!",
    plans: [
      {
        id: "basic",
        title: "Plano Básico",
        image: "/images/psicopedagogia/basic-plan.webp",
        imageAlt: "Plano Básico",
        featured: false,
        oldPrice: "de R$ 39,90",
        price: "R$ 17,90",
        installments: "ou 4x de R$ 4,47 no cartão",
        items: [
          "Mapa de Perfil Infantil para Psicopedagogas Iniciantes",
          "Arquivo digital em formato visual e prático",
          "Acesso imediato após a confirmação da compra",
          "Material para consultar pelo celular, tablet ou computador",
        ],
        mutedItems: [
          "Não inclui os bônus do Plano Completo",
        ],
        ctaText: "QUERO ESSA OPÇÃO!",
        ctaHref: "#",
      },
      {
        id: "premium",
        title: "Plano Completo",
        image: "/images/psicopedagogia/premium-plan.webp",
        imageAlt: "Plano Completo",
        featured: true,
        oldPrice: "de R$ 147,00",
        price: "R$ 27,90",
        installments: "ou 4x de R$ 6,97 no cartão",
        items: [
          "Mapa de Perfil Infantil para Psicopedagogas Iniciantes",
          "🎁 Bônus 01: Roteiro Sessão Sem Travar",
          "🎁 Bônus 02: Checklist Anti-Improviso",
          "🎁 Bônus 03: Atividades Prontas por Perfil Infantil",
          "🎁 Bônus 04: Mapa dos Perfis Combinados",
          "🎁 Bônus 05: Fichas de Evolução da Criança",
          "🎁 Bônus 06: Kit Visual de Combinados",
          "Envio imediato por e-mail",
          "Acesso ao material pelo celular, tablet ou computador",
          "Compra segura",
        ],
        ctaText: "QUERO O PLANO COMPLETO!",
        ctaHref: "#",
      },
    ],
  },
  guarantee: {
    marqueeText: "GARANTIA 15 DIAS • RISCO ZERO • SATISFAÇÃO OU DINHEIRO DE VOLTA • ",
    marqueeGradient: "linear-gradient(90deg, #0D4F4F 0%, #126161 30%, #7AB8B8 55%, #E0F0F0 80%, #0D4F4F 100%)",
    icon: "/images/psicopedagogia/garantia-15-dias.webp",
    iconAlt: "Garantia de 15 dias",
    title: "Compra 100% segura e garantida!",
    body: "Você tem **15 dias de garantia** para testar o material. Se não gostar por qualquer motivo, devolvemos 100% do valor. Sem perguntas, sem burocracia.",
  },
  access: {
    title: "Como você vai receber seu Mapa de Perfil Infantil",
    steps: [
      { num: "01", title: "Conclua sua compra", desc: "Após escolher o plano e finalizar o pagamento, seu pedido é confirmado automaticamente." },
      { num: "02", title: "Receba no e-mail", desc: "As instruções de acesso chegam diretamente no e-mail cadastrado no momento da compra." },
      { num: "03", title: "Acesse os materiais", desc: "Você poderá abrir o Mapa de Perfil Infantil e, no plano completo, todos os bônus incluídos." },
      { num: "04", title: "Use nas suas sessões", desc: "Consulte pelo celular, tablet ou computador antes ou durante seus atendimentos psicopedagógicos." },
    ],
  },
  faq: {
    title: "Perguntas Frequentes",
    items: [
      { q: "O que é o Mapa de Perfil Infantil?", a: "O Mapa de Perfil Infantil para Psicopedagogas Iniciantes é um material digital, visual e prático para ajudar a psicopedagoga a identificar o perfil da criança e escolher uma atividade mais adequada para a sessão." },
      { q: "Esse material é indicado para psicopedagogas iniciantes?", a: "Sim. Ele foi criado justamente para psicopedagogas que estão começando e ainda sentem insegurança na hora de escolher o que aplicar com cada criança. A linguagem é simples, visual e direta, sem excesso de teoria." },
      { q: "O material é físico ou digital?", a: "O material é 100% digital. Após a confirmação da compra, você recebe as instruções de acesso no e-mail cadastrado e pode abrir pelo celular, tablet ou computador." },
      { q: "O que vem no Plano Básico?", a: "O Plano Básico inclui o produto principal: Mapa de Perfil Infantil para Psicopedagogas Iniciantes. Com ele, você terá acesso ao mapa visual para identificar perfis infantis, entender o objetivo da sessão e consultar uma atividade-guia para cada perfil." },
      { q: "O que vem no Plano Completo?", a: "O Plano Completo inclui o Mapa de Perfil Infantil + todos os 6 bônus: Roteiro Sessão Sem Travar, Checklist Anti-Improviso, Atividades Prontas por Perfil Infantil, Mapa dos Perfis Combinados, Fichas de Evolução da Criança e Kit Visual de Combinados." },
      { q: "O material ajuda com crianças agitadas, dispersas ou resistentes?", a: "Sim. O produto trabalha 15 perfis infantis, incluindo criança agitada, dispersa, impulsiva, ansiosa, resistente, desorganizada, insegura, desmotivada e outros perfis comuns na prática psicopedagógica." },
      { q: "Tem garantia?", a: "Sim. Você tem 15 dias de garantia para conhecer o material. Se perceber que ele não é o que esperava, pode solicitar o reembolso dentro do prazo da garantia." },
    ],
  },
  footer: {
    updateTitle: "Material em constante atualização",
    updateBody: "O Mapa de Perfil Infantil recebe novos perfis e atividades periodicamente. Ao adquirir agora, você garante acesso vitalício e todas as atualizações futuras.",
    copyright: "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.",
    missionText: "Conduza suas sessões psicopedagógicas com mais segurança, clareza e menos improviso",
    privacyUrl: "/psicopedagogia/politica-de-privacidade",
    termsUrl: "/psicopedagogia/termos-de-uso",
    privacyLabel: "Política de Privacidade",
    termsLabel: "Termos de Uso",
  },
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit src/config/offers/psicopedagogia/offer.ts`
Expected: No type errors

---

### Task 2: Psicopedagogia Layout

**Files:**
- Create: `src/app/psicopedagogia/layout.tsx`

**Interfaces:**
- Consumes: `OFFER` from `@/config/offers/psicopedagogia/offer`, `OfferProvider` from `@/context/offer-context`
- Produces: Layout with CSS vars injected, Meta/OG tags, tracking pixels

- [ ] **Step 1: Create the layout file**

```tsx
import type { Metadata } from "next"
import Script from "next/script"
import { OFFER } from "@/config/offers/psicopedagogia/offer"
import { OfferProvider } from "@/context/offer-context"

export const metadata: Metadata = {
  title: "Mapa de Perfil Infantil",
  description: OFFER.meta.description,
  icons: {
    icon: "/images/psicopedagogia/favicon.png",
  },
  openGraph: {
    title: OFFER.meta.title,
    description: OFFER.meta.description,
    type: "website",
    locale: "pt_BR",
    siteName: OFFER.meta.title,
  },
}

export default function PsicopedagogiaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { palette: p } = OFFER
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','1653520942410205');
fbq('track','PageView');
`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1653520942410205&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <Script id="utmify-pixel-id" strategy="afterInteractive">
        {`window.pixelId = "6a39b5a3d2e009d7c7ae0f21";`}
      </Script>
      <Script
        id="utmify-pixel"
        src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
        strategy="afterInteractive"
      />
      <Script
        id="utmify-utms"
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-xcod-sck
        data-utmify-prevent-subids
        strategy="afterInteractive"
      />

      <div
        id="offer-root"
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
          "--bg-alt": p.bgAlt,
        } as React.CSSProperties}
      >
        <OfferProvider offer={OFFER}>{children}</OfferProvider>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit src/app/psicopedagogia/layout.tsx`
Expected: No type errors

---

### Task 3: Psicopedagogia Page

**Files:**
- Create: `src/app/psicopedagogia/page.tsx`

**Interfaces:**
- Consumes: All section components (shared), `PaletteSwitcher` from `@/components/dev/PaletteSwitcher`

- [ ] **Step 1: Create the page file**

```tsx
import dynamic from "next/dynamic"
import { CountdownBar } from "@/components/CountdownBar"
import { VendaImediata } from "@/components/sections/VendaImediata"
import { SocialProof } from "@/components/sections/SocialProof"
import { CounterPainPoints } from "@/components/sections/CounterPainPoints"
import { KitCards } from "@/components/sections/KitCards"
import { KitCardsReversed } from "@/components/sections/KitCardsReversed"
import { Benefits } from "@/components/sections/Benefits"
import { Urgencia } from "@/components/sections/Urgencia"
import { TudoQueVoceRecebe } from "@/components/sections/TudoQueVoceRecebe"
import { Bonuses } from "@/components/sections/Bonuses"
import { OfferPricing } from "@/components/sections/OfferPricing"
import { PaletteSwitcher } from "@/components/dev/PaletteSwitcher"
const Guarantee = dynamic(() => import("@/components/sections/Guarantee").then(m => m.Guarantee))
const ComoEAcesso = dynamic(() => import("@/components/sections/ComoEAcesso").then(m => m.ComoEAcesso))
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(m => m.FAQ))
const Footer = dynamic(() => import("@/components/sections/Footer").then(m => m.Footer))

export default function PsicopedagogiaPage() {
  return (
    <>
      <a href="#oferta" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[var(--z-skip-link)] focus:bg-white focus:text-[var(--brand)] focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg">
        Pular para a oferta
      </a>

      <CountdownBar />

      <header>
        <VendaImediata />
      </header>

      <main id="conteudo">
        <SocialProof />
        <CounterPainPoints />
        <KitCards />
        <KitCardsReversed />
        <Benefits />
        <Urgencia />
        <TudoQueVoceRecebe />
        <Bonuses />
        <OfferPricing />
        <Guarantee />
        <ComoEAcesso />
        <FAQ />
      </main>

      <Footer />

      <PaletteSwitcher />
    </>
  )
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit src/app/psicopedagogia/page.tsx`
Expected: No type errors

---

### Task 4: PaletteSwitcher — Add 3 New Palettes

**Files:**
- Modify: `src/components/dev/PaletteSwitcher.tsx`

**Interfaces:**
- Consumes: Existing `PaletteKey` type, `PALETTES` record
- Produces: Updated PALETTES with 3 psicopedagogia color schemes, initial active palette set to new default

- [ ] **Step 1: Update PaletteKey type to include new keys**

Change `type PaletteKey = "atual" | "a" | "b" | "c"` to:
```typescript
type PaletteKey = "atual" | "a" | "b" | "c" | "d" | "e" | "f"
```

- [ ] **Step 2: Add 3 new palettes to the PALETTES record**

Add after the `c: {` block (after line 83), before the closing `}` of the `PALETTES` record:

```typescript
  d: {
    label: "D — Azul Petróleo & Coral",
    swatch: "#0D4F4F",
    vars: {
      "--brand": "#0D4F4F",
      "--brand-deep": "#0A3D3D",
      "--brand-ink": "#062B2B",
      "--brand-dark": "#126161",
      "--brand-light": "#7AB8B8",
      "--brand-subtle": "#E0F0F0",
      "--cta": "#16A34A",
      "--cta-deep": "#11863D",
      "--cta-darkest": "#0E6B31",
      "--accent": "#E8634A",
      "--yellow": "#F0B040",
      "--bg": "#F5F8F0",
      "--bg-alt": "#E8634A",
    },
  },
  e: {
    label: "E — Verde Menta & Lilás",
    swatch: "#2D5A4B",
    vars: {
      "--brand": "#2D5A4B",
      "--brand-deep": "#214336",
      "--brand-ink": "#172E25",
      "--brand-dark": "#3A705E",
      "--brand-light": "#8DB8A8",
      "--brand-subtle": "#E6F0EC",
      "--cta": "#16A34A",
      "--cta-deep": "#11863D",
      "--cta-darkest": "#0E6B31",
      "--accent": "#9B59B6",
      "--yellow": "#E8A040",
      "--bg": "#F5F8F8",
      "--bg-alt": "#9B59B6",
    },
  },
  f: {
    label: "F — Rosa Antigo & Terracota",
    swatch: "#8C4A5A",
    vars: {
      "--brand": "#8C4A5A",
      "--brand-deep": "#6E3847",
      "--brand-ink": "#502735",
      "--brand-dark": "#A85A6E",
      "--brand-light": "#D4A0B0",
      "--brand-subtle": "#F2E4E8",
      "--cta": "#16A34A",
      "--cta-deep": "#11863D",
      "--cta-darkest": "#0E6B31",
      "--accent": "#C0734A",
      "--yellow": "#E8A040",
      "--bg": "#FFF5F5",
      "--bg-alt": "#C0734A",
    },
  },
```

- [ ] **Step 3: Verify the file compiles**

Run: `npx tsc --noEmit src/components/dev/PaletteSwitcher.tsx`
Expected: No type errors

---

### Task 5: Privacy Policy Page

**Files:**
- Create: `src/app/psicopedagogia/politica-de-privacidade/page.tsx`

**Interfaces:**
- Consumes: Next.js Metadata, Link

- [ ] **Step 1: Create the privacy policy page**

```tsx
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Política de Privacidade | Mapa de Perfil Infantil",
  description: "Política de privacidade e proteção de dados pessoais conforme a LGPD (Lei 13.709/2018).",
}

export default function PoliticaDePrivacidadePage() {
  return (
    <div style={{ background: "var(--bg, #F5F8F0)", minHeight: "100vh", padding: "60px 16px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", fontFamily: "'Manrope', sans-serif", color: "var(--text, #333)" }}>

        <Link
          href="/psicopedagogia"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--brand, #0D4F4F)", fontWeight: 700, fontSize: 14, marginBottom: 32, textDecoration: "none" }}
        >
          ← Voltar para a página
        </Link>

        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 900, color: "var(--brand-ink, #062B2B)", marginBottom: 8, lineHeight: 1.15 }}>
          Política de Privacidade
        </h1>
        <p style={{ color: "var(--text-muted, #6B6B6B)", marginBottom: 40, fontSize: 14 }}>
          Última atualização: junho de 2026
        </p>

        <Section title="1. Identificação do Responsável">
          <p>
            Esta Política de Privacidade é aplicável ao site <strong>universoeduk.com</strong> e aos produtos
            digitais comercializados sob a marca <strong>Universo Eduk</strong>, operados por pessoa física
            com e-mail de contato: <strong>contatouniversoeduk@gmail.com</strong>.
          </p>
        </Section>

        <Section title="2. Dados Pessoais Coletados">
          <p>Coletamos os seguintes dados pessoais:</p>
          <ul>
            <li><strong>Dados de identificação:</strong> nome completo e endereço de e-mail fornecidos no momento da compra pela plataforma Hotmart.</li>
            <li><strong>Dados de navegação:</strong> endereço IP, tipo de dispositivo, navegador, páginas visitadas e tempo de permanência, coletados automaticamente por ferramentas de análise.</li>
            <li><strong>Dados de rastreamento de marketing:</strong> identificadores de sessão e parâmetros UTM, coletados pelo Meta Pixel (Facebook) e pelo Utmify para mensuração de campanhas.</li>
          </ul>
        </Section>

        <Section title="3. Finalidade do Tratamento">
          <p>Os dados são tratados para as seguintes finalidades:</p>
          <ul>
            <li>Processamento e entrega do produto digital adquirido;</li>
            <li>Envio de comunicações relacionadas ao pedido (confirmação de compra, acesso ao material);</li>
            <li>Melhoria da experiência de navegação no site;</li>
            <li>Mensuração da eficácia de campanhas de marketing digital;</li>
            <li>Cumprimento de obrigações legais e fiscais.</li>
          </ul>
        </Section>

        <Section title="4. Base Legal (LGPD)">
          <p>O tratamento dos seus dados pessoais é realizado com base nas seguintes hipóteses legais previstas na Lei 13.709/2018 (LGPD):</p>
          <ul>
            <li><strong>Execução de contrato</strong> (Art. 7º, V): para processar a compra e entregar o produto;</li>
            <li><strong>Legítimo interesse</strong> (Art. 7º, IX): para análise de navegação e melhoria do site;</li>
            <li><strong>Consentimento</strong> (Art. 7º, I): para o uso de pixels de rastreamento de marketing (que podem ser recusados via configurações do navegador).</li>
          </ul>
        </Section>

        <Section title="5. Compartilhamento de Dados">
          <p>Seus dados podem ser compartilhados com os seguintes terceiros, exclusivamente para as finalidades descritas:</p>
          <ul>
            <li><strong>Hotmart:</strong> plataforma de processamento de pagamentos e entrega do produto digital;</li>
            <li><strong>Meta Platforms (Facebook):</strong> ferramenta de mensuração de anúncios (Meta Pixel);</li>
            <li><strong>Utmify:</strong> ferramenta de rastreamento de fontes de tráfego.</li>
          </ul>
          <p>Não vendemos, alugamos ou cedemos seus dados a terceiros para fins comerciais.</p>
        </Section>

        <Section title="6. Retenção de Dados">
          <p>
            Os dados de compra são mantidos pelo tempo necessário ao cumprimento de obrigações fiscais e legais
            (mínimo de 5 anos, conforme legislação tributária). Dados de navegação coletados por ferramentas de
            análise são retidos conforme a política de cada ferramenta (geralmente 26 meses).
          </p>
        </Section>

        <Section title="7. Seus Direitos como Titular">
          <p>Conforme a LGPD, você tem direito a:</p>
          <ul>
            <li>Confirmar a existência de tratamento de seus dados;</li>
            <li>Acessar seus dados pessoais;</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
            <li>Solicitar a portabilidade dos dados;</li>
            <li>Revogar o consentimento, quando aplicável.</li>
          </ul>
          <p>Para exercer seus direitos, entre em contato pelo e-mail: <strong>contatouniversoeduk@gmail.com</strong>. Atendemos em até 15 dias úteis.</p>
        </Section>

        <Section title="8. Cookies e Tecnologias de Rastreamento">
          <p>
            Utilizamos cookies e pixels de rastreamento para analisar o tráfego e mensurar o desempenho de campanhas.
            Você pode desativar cookies nas configurações do seu navegador. Note que desativá-los pode afetar a
            funcionalidade de algumas áreas do site.
          </p>
        </Section>

        <Section title="9. Segurança">
          <p>
            Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado,
            perda ou destruição. As transações financeiras são processadas integralmente pela Hotmart, que possui
            certificação PCI-DSS.
          </p>
        </Section>

        <Section title="10. Alterações nesta Política">
          <p>
            Esta política pode ser atualizada periodicamente. Alterações relevantes serão comunicadas por e-mail
            aos compradores ativos. A data da última atualização está indicada no topo desta página.
          </p>
        </Section>

        <Section title="11. Contato">
          <p>
            Dúvidas sobre esta política ou sobre o tratamento dos seus dados pessoais:<br />
            <strong>E-mail:</strong> contatouniversoeduk@gmail.com
          </p>
        </Section>

      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 20, fontWeight: 900, color: "var(--brand, #0D4F4F)", marginBottom: 12 }}>
        {title}
      </h2>
      <div style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--text-muted, #6B6B6B)" }}>
        {children}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit src/app/psicopedagogia/politica-de-privacidade/page.tsx`
Expected: No type errors

---

### Task 6: Terms of Use Page

**Files:**
- Create: `src/app/psicopedagogia/termos-de-uso/page.tsx`

- [ ] **Step 1: Create the terms of use page**

```tsx
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Termos de Uso | Mapa de Perfil Infantil",
  description: "Termos e condições de uso do produto digital Mapa de Perfil Infantil para Psicopedagogas Iniciantes.",
}

export default function TermosDeUsoPage() {
  return (
    <div style={{ background: "var(--bg, #F5F8F0)", minHeight: "100vh", padding: "60px 16px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", fontFamily: "'Manrope', sans-serif", color: "var(--text, #333)" }}>

        <Link
          href="/psicopedagogia"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--brand, #0D4F4F)", fontWeight: 700, fontSize: 14, marginBottom: 32, textDecoration: "none" }}
        >
          ← Voltar para a página
        </Link>

        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 900, color: "var(--brand-ink, #062B2B)", marginBottom: 8, lineHeight: 1.15 }}>
          Termos de Uso
        </h1>
        <p style={{ color: "var(--text-muted, #6B6B6B)", marginBottom: 40, fontSize: 14 }}>
          Última atualização: junho de 2026
        </p>

        <Section title="1. Aceitação dos Termos">
          <p>
            Ao adquirir qualquer produto digital disponibilizado no site <strong>universoeduk.com</strong>,
            você declara ter lido, compreendido e concordado integralmente com estes Termos de Uso.
            Caso não concorde com alguma condição, não realize a compra.
          </p>
        </Section>

        <Section title="2. Descrição do Produto">
          <p>
            <strong>Mapa de Perfil Infantil para Psicopedagogas Iniciantes</strong> é um produto digital composto por
            arquivos em formato PDF contendo um mapa visual de perfis infantis, atividades-guia e orientações para
            condução de sessões psicopedagógicas.
            O produto é entregue exclusivamente em formato digital, sem envio de material físico.
          </p>
          <p>
            Os arquivos são disponibilizados por e-mail e/ou plataforma Hotmart imediatamente após
            a confirmação do pagamento.
          </p>
        </Section>

        <Section title="3. Licença de Uso">
          <p>
            Ao adquirir o produto, o comprador recebe uma <strong>licença pessoal, intransferível e não exclusiva</strong>
            para uso do material. É expressamente proibido:
          </p>
          <ul>
            <li>Revender, redistribuir, sublicenciar ou ceder o produto a terceiros;</li>
            <li>Compartilhar o arquivo em grupos, plataformas de download ou redes sociais;</li>
            <li>Utilizar o material para fins comerciais além do uso pessoal;</li>
            <li>Remover ou alterar marcas d&#39;água, créditos ou informações de autoria.</li>
          </ul>
        </Section>

        <Section title="4. Propriedade Intelectual">
          <p>
            Todo o conteúdo do produto — incluindo textos, ilustrações, layouts e designs — é protegido
            pela Lei de Direitos Autorais (Lei nº 9.610/1998). A propriedade intelectual permanece
            integralmente com o autor. A compra não transfere qualquer direito autoral.
          </p>
        </Section>

        <Section title="5. Política de Reembolso">
          <p>
            Oferecemos <strong>garantia incondicional de 15 (quinze) dias</strong> a partir da data da compra.
            Se por qualquer motivo você não estiver satisfeito com o produto, basta solicitar o reembolso
            pelo e-mail <strong>contatouniversoeduk@gmail.com</strong> ou diretamente pela plataforma Hotmart.
            O valor será devolvido integralmente, sem perguntas.
          </p>
          <p>
            Após o prazo de 15 dias, não será possível solicitar reembolso.
          </p>
        </Section>

        <Section title="6. Limitação de Responsabilidade">
          <p>
            O produto é fornecido &quot;como está&quot;. Não nos responsabilizamos por:
          </p>
          <ul>
            <li>Problemas de impressão decorrentes de configurações do equipamento do comprador;</li>
            <li>Incompatibilidade de software para abertura dos arquivos PDF;</li>
            <li>Uso indevido do material em desacordo com estes Termos.</li>
          </ul>
        </Section>

        <Section title="7. Alterações nos Termos">
          <p>
            Estes termos podem ser atualizados a qualquer momento. A versão vigente estará sempre disponível
            nesta página, com a data de última atualização indicada no topo.
          </p>
        </Section>

        <Section title="8. Legislação Aplicável">
          <p>
            Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de domicílio
            do comprador para dirimir eventuais conflitos, conforme o Código de Defesa do Consumidor (Lei 8.078/1990).
          </p>
        </Section>

        <Section title="9. Contato">
          <p>
            Para dúvidas, sugestões ou exercício de direitos:<br />
            <strong>E-mail:</strong> contatouniversoeduk@gmail.com
          </p>
        </Section>

      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 20, fontWeight: 900, color: "var(--brand, #0D4F4F)", marginBottom: 12 }}>
        {title}
      </h2>
      <div style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--text-muted, #6B6B6B)" }}>
        {children}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit src/app/psicopedagogia/termos-de-uso/page.tsx`
Expected: No type errors

---

### Task 7: Image Placeholder Directory

**Files:**
- Create: `public/images/psicopedagogia/.gitkeep`

- [ ] **Step 1: Create the directory and .gitkeep**

Run: `New-Item -ItemType Directory -Path "public/images/psicopedagogia" -Force; Set-Content -Path "public/images/psicopedagogia/.gitkeep" -Value ""`

---

### Task 8: Final Build Verification

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: Build succeeds
