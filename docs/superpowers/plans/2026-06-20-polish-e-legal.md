# Polish, Marquee, Páginas Legais e Bugs — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refinar a landing de lembrancinhas com quebras de texto balanceadas, marquee dourada-alaranjada, páginas legais funcionais (LGPD), e corrigir bugs encontrados na análise de código.

**Architecture:** Todas as mudanças são localizadas. Textos fixados em `offer.ts`. Marquee corrigida em `ScrollMarquee.tsx` e `globals.css`. Páginas legais são rotas novas em `src/app/lembrancinhas/`. Bugs corrigidos nos componentes afetados.

**Tech Stack:** Next.js 16 App Router, React Context, CSS custom properties, TypeScript

---

## Bugs Identificados (para referência dos tasks)

| # | Arquivo | Descrição |
|---|---------|-----------|
| B1 | `ScrollMarquee.tsx` | Fade usa `var(--bg)` mas na seção Garantia o fundo é `var(--brand-subtle)` — fade fica com cor errada |
| B2 | `globals.css` | `.vi-marquee-track` e `@keyframes viMarqueeScroll` são CSS morto (ScrollMarquee usa rAF, não CSS animation) |
| B3 | `TudoQueVoceRecebe.tsx` | `titleHighlight` é desestruturado mas nunca renderizado |
| B4 | `OfferPricing.tsx` | `mutedItems` e `extraNote` definidos em `offer.ts` e no type, mas não renderizados no componente |
| B5 | `ComoEAcesso.tsx` / `Benefits.tsx` | `STEP_COLORS` / `CARD_COLORS` hardcoded em hex em vez de CSS vars — não se adaptam à paleta |
| B6 | `Footer.tsx` | Links Política de Privacidade e Termos de Uso apontam para `#` |
| B7 | `VendaImediata.tsx` | `hero.subtitle` usa `\n` para quebra manual — cria linhas desequilibradas em telas diferentes |
| B8 | `offer.ts` | `marqueeGradient` em hero e guarantee usa azul escuro — precisa ser dourado-alaranjado |

---

## Task 1: Marquee — Cor Dourada, Fades Corretos, Loop Garantido

**Files:**
- Modify: `src/components/ui/ScrollMarquee.tsx`
- Modify: `src/app/globals.css` (remover CSS morto)
- Modify: `src/config/offers/lembrancinhas/offer.ts` (atualizar gradients)
- Modify: `src/components/sections/Guarantee.tsx` (passar fadeColor)
- Modify: `src/components/sections/VendaImediata.tsx` (passar fadeColor)

### Por que o loop pode ficar vazio

O `ScrollMarquee` renderiza dois blocos (`blockRef` + segundo div). O `blockW` é medido via `ResizeObserver`. Se a tela for muito larga e o texto muito curto, há espaço em branco visível antes do loop reiniciar. A solução é calcular quantas cópias são necessárias para cobrir `window.innerWidth * 2` e renderizá-las dinamicamente.

### Por que o fade tem cor errada

`FADE_L = linear-gradient(to right, var(--bg, #FFFFFF), transparent)` — mas na seção Garantia, o fundo é `var(--brand-subtle) = #E4E6EB`. A solução é adicionar prop `fadeColor` ao `ScrollMarquee`.

- [ ] **Step 1: Adicionar prop `fadeColor` e `copies` a `ScrollMarquee`**

```tsx
// src/components/ui/ScrollMarquee.tsx
"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface ScrollMarqueeProps {
  text?: string
  gradient?: string
  height?: number
  className?: string
  reverse?: boolean
  fadeColor?: string
}

function renderText(text: string) {
  const parts = text.split(/•/g)
  const result: React.ReactNode[] = []
  parts.forEach((part, i) => {
    result.push(<span key={`t${i}`}>{part}</span>)
    if (i < parts.length - 1) {
      result.push(
        <span key={`s${i}`} style={{ opacity: 0.5, margin: "0 18px" }}>✦</span>
      )
    }
  })
  return result
}

export function ScrollMarquee({
  text = "MATERIAL EM ALTA QUALIDADE • ACESSO IMEDIATO • BÔNUS INCLUÍDOS • ",
  gradient = "linear-gradient(135deg, #C8860A 0%, #E8A020 35%, #F5C842 65%, #FDD835 100%)",
  height = 48,
  className = "",
  reverse = false,
  fadeColor = "var(--bg, #FFF8E8)",
}: ScrollMarqueeProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const pos = useRef(0)
  const blockW = useRef(0)
  const lastScrollY = useRef(0)
  const scrollVel = useRef(0)
  const displayVel = useRef(0)
  const hovered = useRef(false)
  const [copies, setCopies] = useState(4)
  const [ready, setReady] = useState(false)

  const [reducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  )

  const direction = reverse ? -1 : 1
  const isVisibleRef = useRef(true)

  const measure = useCallback(() => {
    if (!blockRef.current) return
    const w = blockRef.current.offsetWidth
    if (w > 0) {
      blockW.current = w
      const needed = Math.ceil((window.innerWidth * 2.5) / w) + 2
      setCopies(Math.max(needed, 4))
    }
  }, [])

  useEffect(() => {
    measure()
    const id = setTimeout(() => { measure(); setReady(true) }, 50)
    const ro = new ResizeObserver(measure)
    if (blockRef.current) ro.observe(blockRef.current)
    window.addEventListener("resize", measure, { passive: true })
    return () => {
      clearTimeout(id)
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [measure])

  useEffect(() => {
    if (!barRef.current) return
    const parent = barRef.current.closest('.scroll-marquee')
    if (!parent) return
    const obs = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0.1 }
    )
    obs.observe(parent)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (reducedMotion || !ready) return
    lastScrollY.current = window.scrollY
    const BASE = 0.5 * direction

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      lastScrollY.current = y
      scrollVel.current = Math.max(-4, Math.min(4, delta * 0.08)) * direction
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const loop = () => {
      if (document.hidden || !isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(loop)
        return
      }
      const effectiveBase = hovered.current ? 0 : BASE
      const target = effectiveBase + scrollVel.current
      displayVel.current = lerp(displayVel.current, target, 0.08)
      scrollVel.current *= 0.95

      pos.current -= displayVel.current
      if (blockW.current > 0) {
        if (pos.current <= -blockW.current) pos.current += blockW.current
        if (pos.current > 0) pos.current -= blockW.current
      }

      if (barRef.current) barRef.current.style.transform = `translateX(${pos.current}px)`
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("scroll", onScroll)
    }
  }, [ready, reducedMotion, direction])

  const rendered = renderText(text)
  const FADE_L = `linear-gradient(to right, ${fadeColor}, transparent)`
  const FADE_R = `linear-gradient(to left, ${fadeColor}, transparent)`

  if (reducedMotion) {
    return (
      <div className={`scroll-marquee ${className}`} style={{ height, background: gradient }} aria-hidden="true">
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="scroll-marquee-text">{rendered}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`scroll-marquee ${className}`}
      style={{ height, background: gradient }}
      aria-hidden="true"
      onMouseEnter={() => { hovered.current = true }}
      onMouseLeave={() => { hovered.current = false }}
    >
      <div className="scroll-marquee-fade-left" style={{ background: FADE_L }} />
      <div className="scroll-marquee-fade-right" style={{ background: FADE_R }} />
      <div ref={barRef} className="scroll-marquee-bar">
        <div ref={blockRef} className="scroll-marquee-text">
          {Array.from({ length: copies }, (_, i) => (
            <span key={i} style={{ display: "inline" }}>{rendered}</span>
          ))}
        </div>
        <div className="scroll-marquee-text">
          {Array.from({ length: copies }, (_, i) => (
            <span key={i} style={{ display: "inline" }}>{rendered}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Atualizar `offer.ts` com gradients dourado-alaranjado**

Em `src/config/offers/lembrancinhas/offer.ts`, alterar:
```ts
// hero.marqueeGradient
marqueeGradient: "linear-gradient(90deg, #8B5E0A 0%, #C8860A 30%, #E8A020 55%, #F5C518 80%, #C8860A 100%)",

// guarantee.marqueeGradient
marqueeGradient: "linear-gradient(90deg, #8B5E0A 0%, #C8860A 30%, #E8A020 55%, #F5C518 80%, #C8860A 100%)",
```

- [ ] **Step 3: Passar `fadeColor` correto em cada uso de `ScrollMarquee`**

Em `src/components/sections/VendaImediata.tsx`, atualizar o `<ScrollMarquee>`:
```tsx
<ScrollMarquee
  text={marqueeText}
  gradient={marqueeGradient}
  className="vi-marquee"
  fadeColor="var(--bg, #FFF8E8)"
/>
```

Em `src/components/sections/Guarantee.tsx`, atualizar ambos os `<ScrollMarquee>`:
```tsx
<ScrollMarquee text={marqueeText} gradient={marqueeGradient} height={44} fadeColor="var(--brand-subtle, #E4E6EB)" />
// ...
<ScrollMarquee text={marqueeText} gradient={marqueeGradient} height={44} reverse fadeColor="var(--brand-subtle, #E4E6EB)" />
```

- [ ] **Step 4: Remover CSS morto da marquee em `globals.css`**

Remover os blocos:
```css
/* REMOVER — CSS morto, ScrollMarquee usa rAF não CSS animation */
.vi-marquee-track { ... }
.vi-marquee-track span { ... }
@keyframes viMarqueeScroll { ... }
```

Também atualizar o fade width de `80px` para `120px` para blur mais suave:
```css
.scroll-marquee-fade-left,
.scroll-marquee-fade-right {
  position: absolute;
  top: 0;
  width: 120px;   /* era 80px */
  height: 100%;
  z-index: 2;
  pointer-events: none;
}
```

- [ ] **Step 5: Build e verificar**
```bash
cd C:/Users/Kelvenyn/Documents/opencode/lembrancinhas
npm run typecheck && npm run build
```
Esperado: sem erros.

- [ ] **Step 6: Commit**
```bash
git add src/components/ui/ScrollMarquee.tsx src/components/sections/Guarantee.tsx src/components/sections/VendaImediata.tsx src/config/offers/lembrancinhas/offer.ts src/app/globals.css
git commit -m "feat: marquee dourada-alaranjada, fade correto por contexto, loop garantido"
```

---

## Task 2: Quebras de Texto Balanceadas

**Files:**
- Modify: `src/config/offers/lembrancinhas/offer.ts` (remover `\n` manuais do subtitle)
- Modify: `src/components/sections/VendaImediata.tsx` (remover split por `\n`)
- Modify: `src/app/globals.css` (garantir `text-wrap: balance` nos elementos certos)

### Análise

O `hero.subtitle` usa `\n` e o componente faz `subtitle.split("\n")` para inserir `<br />`. Isso cria quebras forçadas que ficam desequilibradas em telas < 400px ou > 600px. A solução é remover o `\n` e deixar o CSS controlar as quebras com `text-wrap: balance` e `max-width` adequado.

- [ ] **Step 1: Atualizar `hero.subtitle` em `offer.ts` — remover quebras manuais**

```ts
// src/config/offers/lembrancinhas/offer.ts
subtitle: "Tenha em mãos +50 Modelos de Lembrancinhas, fáceis de montar e organizados por temas para entregar ao crismando sem precisar criar nada do zero.",
```

- [ ] **Step 2: Simplificar VendaImediata para não depender de `\n`**

Em `src/components/sections/VendaImediata.tsx`, substituir o bloco do subtítulo:
```tsx
// ANTES
const subtitleLines = subtitle.split("\n")
// ...
<p className="vi-sub">
  {subtitleLines.map((line, i) => (
    <span key={i}>
      {line}
      {i < subtitleLines.length - 1 && <br />}
    </span>
  ))}
</p>

// DEPOIS
<p className="vi-sub">{subtitle}</p>
```

- [ ] **Step 3: Adicionar `text-wrap: balance` ao `.vi-sub` e `.urg-text` em `globals.css`**

```css
.vi-sub {
  max-width: 460px;       /* reduzir de 520px para linhas mais curtas */
  margin: 0 auto 16px;
  font-family: 'Manrope', system-ui, sans-serif;
  font-size: 17px;
  line-height: 1.65;
  font-weight: 500;
  color: var(--text-muted);
  text-wrap: balance;     /* ADICIONAR */
}

.urg-text {
  /* ... existente ... */
  text-wrap: balance;     /* ADICIONAR */
}

.gar-text {
  /* ... existente ... */
  text-wrap: balance;     /* ADICIONAR */
}

.bon-sub {
  /* ... existente ... */
  text-wrap: balance;     /* ADICIONAR, remover white-space: pre-line */
}
```

- [ ] **Step 4: Verificar `.pei-promo-inner p` e `.faq-acc-btn`**

```css
.pei-promo-inner p {
  text-wrap: balance;    /* ADICIONAR */
}
```

- [ ] **Step 5: Build**
```bash
npm run typecheck && npm run build
```

- [ ] **Step 6: Commit**
```bash
git add src/config/offers/lembrancinhas/offer.ts src/components/sections/VendaImediata.tsx src/app/globals.css
git commit -m "fix: quebras de texto balanceadas via text-wrap: balance, remove quebras manuais"
```

---

## Task 3: Página Política de Privacidade (LGPD)

**Files:**
- Create: `src/app/lembrancinhas/politica-de-privacidade/page.tsx`
- Modify: `src/components/sections/Footer.tsx` (atualizar link)
- Modify: `src/config/offers/lembrancinhas/offer.ts` (atualizar `privacyUrl`)

### Conteúdo Legal (LGPD — Lei 13.709/2018)

A política deve cobrir: responsável pelos dados, dados coletados (e-mail, nome, IP), finalidade, base legal, retenção, compartilhamento (Hotmart, Meta Pixel, Utmify), direitos do titular, e contato.

- [ ] **Step 1: Criar `src/app/lembrancinhas/politica-de-privacidade/page.tsx`**

```tsx
// src/app/lembrancinhas/politica-de-privacidade/page.tsx
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Política de Privacidade | Lembrancinhas para Crisma",
  description: "Política de privacidade e proteção de dados pessoais conforme a LGPD (Lei 13.709/2018).",
}

export default function PoliticaDePrivacidadePage() {
  return (
    <div style={{ background: "var(--bg, #FFF8E8)", minHeight: "100vh", padding: "60px 16px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", fontFamily: "'Manrope', sans-serif", color: "var(--text, #333)" }}>

        <Link
          href="/lembrancinhas"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--brand, #0A1F44)", fontWeight: 700, fontSize: 14, marginBottom: 32, textDecoration: "none" }}
        >
          ← Voltar para a página
        </Link>

        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 900, color: "var(--brand-ink, #061226)", marginBottom: 8, lineHeight: 1.15 }}>
          Política de Privacidade
        </h1>
        <p style={{ color: "var(--text-muted, #6B6B6B)", marginBottom: 40, fontSize: 14 }}>
          Última atualização: junho de 2026
        </p>

        <Section title="1. Identificação do Responsável">
          <p>
            Esta Política de Privacidade é aplicável ao site <strong>universoeduk.com</strong> e aos produtos
            digitais comercializados sob a marca <strong>Universo Eduk</strong>, operados por pessoa física
            com e-mail de contato: <strong>kelvenyn@gmail.com</strong>.
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
          <p>Para exercer seus direitos, entre em contato pelo e-mail: <strong>kelvenyn@gmail.com</strong>. Atendemos em até 15 dias úteis.</p>
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
            <strong>E-mail:</strong> kelvenyn@gmail.com
          </p>
        </Section>

      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 20, fontWeight: 900, color: "var(--brand, #0A1F44)", marginBottom: 12 }}>
        {title}
      </h2>
      <div style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--text-muted, #6B6B6B)" }}>
        {children}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Atualizar `privacyUrl` em `offer.ts`**

```ts
// src/config/offers/lembrancinhas/offer.ts
privacyUrl: "/lembrancinhas/politica-de-privacidade",
```

- [ ] **Step 3: Build**
```bash
npm run typecheck && npm run build
```

- [ ] **Step 4: Commit**
```bash
git add src/app/lembrancinhas/politica-de-privacidade/ src/config/offers/lembrancinhas/offer.ts
git commit -m "feat: página Política de Privacidade (LGPD)"
```

---

## Task 4: Página Termos de Uso

**Files:**
- Create: `src/app/lembrancinhas/termos-de-uso/page.tsx`
- Modify: `src/config/offers/lembrancinhas/offer.ts` (atualizar `termsUrl`)

- [ ] **Step 1: Criar `src/app/lembrancinhas/termos-de-uso/page.tsx`**

```tsx
// src/app/lembrancinhas/termos-de-uso/page.tsx
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Termos de Uso | Lembrancinhas para Crisma",
  description: "Termos e condições de uso do produto digital Lembrancinhas para Crisma.",
}

export default function TermosDeUsoPage() {
  return (
    <div style={{ background: "var(--bg, #FFF8E8)", minHeight: "100vh", padding: "60px 16px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", fontFamily: "'Manrope', sans-serif", color: "var(--text, #333)" }}>

        <Link
          href="/lembrancinhas"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--brand, #0A1F44)", fontWeight: 700, fontSize: 14, marginBottom: 32, textDecoration: "none" }}
        >
          ← Voltar para a página
        </Link>

        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 900, color: "var(--brand-ink, #061226)", marginBottom: 8, lineHeight: 1.15 }}>
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
            <strong>Lembrancinhas para Crisma</strong> é um produto digital composto por arquivos em formato
            PDF contendo modelos prontos de lembrancinhas temáticas para a Sacramento do Crisma.
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
            <li>Utilizar o material para fins comerciais além do uso pessoal (ex.: imprimir e vender fisicamente em escala);</li>
            <li>Remover ou alterar marcas d'água, créditos ou informações de autoria.</li>
          </ul>
          <p>
            O uso permitido inclui: impressão para uso próprio, uso em atividades de catequese pessoal ou
            de uma única paróquia/comunidade onde o comprador atua.
          </p>
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
            Oferecemos <strong>garantia incondicional de 30 (trinta) dias</strong> a partir da data da compra.
            Se por qualquer motivo você não estiver satisfeito com o produto, basta solicitar o reembolso
            pelo e-mail <strong>kelvenyn@gmail.com</strong> ou diretamente pela plataforma Hotmart.
            O valor será devolvido integralmente, sem perguntas.
          </p>
          <p>
            Após o prazo de 30 dias, não será possível solicitar reembolso.
          </p>
        </Section>

        <Section title="6. Limitação de Responsabilidade">
          <p>
            O produto é fornecido "como está". Não nos responsabilizamos por:
          </p>
          <ul>
            <li>Problemas de impressão decorrentes de configurações do equipamento do comprador;</li>
            <li>Incompatibilidade de software para abertura dos arquivos PDF;</li>
            <li>Uso indevido do material em desacordo com estes Termos.</li>
          </ul>
          <p>
            Os arquivos são compatíveis com leitores de PDF padrão (Adobe Reader, Preview, Chrome PDF Viewer).
          </p>
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
            <strong>E-mail:</strong> kelvenyn@gmail.com
          </p>
        </Section>

      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 20, fontWeight: 900, color: "var(--brand, #0A1F44)", marginBottom: 12 }}>
        {title}
      </h2>
      <div style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--text-muted, #6B6B6B)" }}>
        {children}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Atualizar `termsUrl` em `offer.ts`**

```ts
// src/config/offers/lembrancinhas/offer.ts
termsUrl: "/lembrancinhas/termos-de-uso",
```

- [ ] **Step 3: Build**
```bash
npm run typecheck && npm run build
```

- [ ] **Step 4: Commit**
```bash
git add src/app/lembrancinhas/termos-de-uso/ src/config/offers/lembrancinhas/offer.ts
git commit -m "feat: página Termos de Uso com licença de uso pessoal, garantia e LGPD"
```

---

## Task 5: Correção de Bugs Restantes

**Files:**
- Modify: `src/components/sections/OfferPricing.tsx` (renderizar `mutedItems` e `extraNote`)
- Modify: `src/components/sections/TudoQueVoceRecebe.tsx` (remover `titleHighlight` não usado)
- Modify: `src/app/globals.css` (remover `dc-label` hardcoded `color: var(--brand-deep)` na `.dc-prefix` que usa `color: #FFF8E8` — verificar se está correto)

### Bug B4: `mutedItems` e `extraNote` não renderizados em `OfferPricing`

- [ ] **Step 1: Adicionar render de `extraNote` e `mutedItems` em `OfferPricing.tsx`**

No `OfferPricing.tsx`, dentro do loop `plans.map`, após o `<h3>{plan.title}</h3>`:
```tsx
{plan.extraNote && (
  <p style={{
    margin: "0 0 10px",
    fontSize: 13,
    fontWeight: 800,
    color: "var(--cta-deep)",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  }}>
    {plan.extraNote}
  </p>
)}
```

Após `<AnimatedBullets items={plan.items} className="offer-list" />`, adicionar:
```tsx
{plan.mutedItems && plan.mutedItems.length > 0 && (
  <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
    {plan.mutedItems.map((item, i) => (
      <li key={i} style={{ fontSize: 13.5, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14 }}>✗</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
)}
```

### Bug B3: `titleHighlight` não renderizado em `TudoQueVoceRecebe`

- [ ] **Step 2: Remover `titleHighlight` do destructure (ou renderizá-lo)**

Verificar `offer.ts` — o campo é `""` (vazio). Basta remover do destructure para limpar o warning de variável não usada:

```tsx
// TudoQueVoceRecebe.tsx
const { title, image, imageAlt, bullets } = offer.deliverables
// Remover titleHighlight do destructure
```

### Bug B5: Cores hardcoded em Benefits e ComoEAcesso

- [ ] **Step 3: Manter cores hardcoded mas documentadas**

As cores em `STEP_COLORS` e `CARD_COLORS` são intencionais — são as cores de acento sequencial por card. Como não variam por paleta (são cores fixas de UI), deixar como estão mas adicionar comentário inline é aceitável. Não é um bug crítico, apenas design decision. **Pular este step** — YAGNI.

- [ ] **Step 4: Build final**
```bash
npm run typecheck && npm run build
```
Esperado: zero erros.

- [ ] **Step 5: Commit**
```bash
git add src/components/sections/OfferPricing.tsx src/components/sections/TudoQueVoceRecebe.tsx
git commit -m "fix: renderiza mutedItems e extraNote em OfferPricing, remove titleHighlight não usado"
```

---

## Task 6: Push final

- [ ] **Step 1: Push para origin**
```bash
git push
```

---

## Paletas de Cores (Entregável — Não Gera Código)

Três propostas de paleta que combinam com a temática religiosa/católica da oferta. O **CTA verde** (`#16A34A`) permanece fixo em todas.

---

### Paleta A — Vinho & Ouro (Majestade)
*Sensação: realeza, tradição, sagrado. Ideal para público mais conservador e devoto.*

| Token | Cor | Hex |
|-------|-----|-----|
| `brand` | Vinho escuro | `#4A0E1A` |
| `brandDeep` | Vinho profundo | `#3A0A14` |
| `brandInk` | Vinho quase preto | `#2A0610` |
| `brandDark` | Vinho médio | `#5D1522` |
| `brandLight` | Rosa vinho claro | `#C4818F` |
| `brandSubtle` | Rosa muito claro | `#F5E8EB` |
| `accent` | Dourado cálido | `#C8860A` |
| `yellow` | Dourado claro | `#F5C518` |
| `bg` | Creme quente | `#FEF5EC` |
| `bgAlt` | Dourado claro | `#F5C518` |
| `cta` | Verde (fixo) | `#16A34A` |

---

### Paleta B — Azul Royal & Prata (Solenidade)
*Similar à atual mas mais saturado e elegante. Azul real profundo com prata luminosa.*

| Token | Cor | Hex |
|-------|-----|-----|
| `brand` | Azul real | `#1A3A6B` |
| `brandDeep` | Azul profundo | `#142F58` |
| `brandInk` | Azul quase preto | `#0D2040` |
| `brandDark` | Azul médio | `#244580` |
| `brandLight` | Azul névoa | `#8EA8D0` |
| `brandSubtle` | Azul muito claro | `#E8EDF6` |
| `accent` | Vermelho carmim | `#C0392B` |
| `yellow` | Ouro claro | `#F0C040` |
| `bg` | Branco azulado | `#F5F7FF` |
| `bgAlt` | Ouro claro | `#F0C040` |
| `cta` | Verde (fixo) | `#16A34A` |

---

### Paleta C — Verde Musgo & Terracota (Natureza Sacra)
*Tom terroso, orgânico, espiritual. Remete a oliveiras, jardins de clausura.*

| Token | Cor | Hex |
|-------|-----|-----|
| `brand` | Verde musgo | `#2D5016` |
| `brandDeep` | Verde sombra | `#22400F` |
| `brandInk` | Verde quase preto | `#182E0A` |
| `brandDark` | Verde médio | `#3A6520` |
| `brandLight` | Verde névoa | `#8AB06A` |
| `brandSubtle` | Verde muito claro | `#EBF2E4` |
| `accent` | Terracota | `#C0521A` |
| `yellow` | Dourado quente | `#E8A020` |
| `bg` | Pergaminho | `#FBF6EE` |
| `bgAlt` | Dourado quente | `#E8A020` |
| `cta` | Verde (fixo) | `#16A34A` |

> Para aplicar qualquer paleta: editar os campos correspondentes em `src/config/offers/lembrancinhas/offer.ts`.

---

## Self-Review

**Spec coverage:**
- [x] Task 1 — Marquee dourada-alaranjada + fades + loop
- [x] Task 2 — Quebras de texto balanceadas
- [x] Task 3 — Política de Privacidade funcional (LGPD)
- [x] Task 4 — Termos de Uso funcional
- [x] Task 5 — Bugs: mutedItems, extraNote, titleHighlight
- [x] Task 6 — Push
- [x] Paletas de cores — 3 propostas documentadas

**Placeholder scan:** Sem TBDs ou TODOs — todo o código está completo em cada step.

**Type consistency:** 
- `ScrollMarquee` recebe `fadeColor?: string` — tipo consistente com uso nos componentes
- `OfferPricing` usa `plan.mutedItems` e `plan.extraNote` — ambos já definidos em `OfferConfig` no `src/types/offer.ts`
- Páginas legais usam inline styles para ser autocontidas e não depender de classes CSS da landing
