# NeuroAtividades Kids Clone — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pixel-perfect clone of the NeuroAtividades Kids sales page with all 12 sections, then iterate with review feedback.

**Architecture:** Single Next.js page (`page.tsx`) importing section components, Tailwind CSS v4 for all styling, Nunito + Inter via next/font.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, shadcn/ui primitives, TypeScript strict

---

## File Structure

```
src/
  app/
    layout.tsx          # Root layout (Nunito + Inter fonts) — ALREADY DONE
    globals.css         # Global styles + Tailwind theme — ALREADY DONE (may need tweaks)
    page.tsx            # Main page importing all sections → MODIFY
  components/
    sections/
      Hero.tsx          # CREATE: Hero + top bar + counter
      PainPoints.tsx    # CREATE: Pain points / age groups grid
      KitContents.tsx   # CREATE: Product showcase + categories
      HowItWorks.tsx    # CREATE: 4-step process
      Bonuses.tsx       # CREATE: 4 bonus cards
      AccessInfo.tsx    # CREATE: Two-column access info
      SocialProof.tsx   # CREATE: Testimonials carousel + stats
      Pricing.tsx       # CREATE: Two pricing plans
      Creator.tsx       # CREATE: Bio section
      Guarantee.tsx     # CREATE: 7-day guarantee
      FAQ.tsx           # CREATE: Accordion FAQ (client component)
      Footer.tsx        # CREATE: Copyright + links
public/
  images/               # All assets — ALREADY DOWNLOADED
docs/
  design-references/
    target-fresh-desktop.png   # Reference screenshot — ALREADY TAKEN
```

---

### Task 1: Clean slate + rebuild layout foundation

**Files:**
- Modify: `src/components/sections/*` (delete all)
- Modify: `src/app/globals.css` (verify theme)
- Modify: `src/app/layout.tsx` (verify fonts)

- [ ] **Delete all old section components**

Run: `Remove-Item -Recurse -Force src/components/sections/*`

Expected: Directory empty

- [ ] **Verify layout.tsx has correct fonts**

Read `src/app/layout.tsx` and confirm Nunito (700,800,900) + Inter (400,500,600,700) are configured as CSS variables `--font-nunito` and `--font-inter`.

- [ ] **Verify globals.css has correct Tailwind v4 theme**

Confirm in `src/app/globals.css`:
- `--color-primary-blue: #0b7fe8`
- `--color-dark-blue: #123a6d`
- `--color-accent-coral: #ff8a5b`
- `--color-green-cta: #0bb869`
- `--font-nunito: "Nunito"` is defined
- `@import "tailwindcss"` is present

- [ ] **Verify build still passes**

Run: `npm run build`
Expected: Compiled successfully

- [ ] **Commit**

```
git add -A
git commit -m "chore: clean slate for rebuild"
```

---

### Task 2: Build Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Create Hero.tsx**

```tsx
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.h === 0 && prev.m === 0 && prev.s === 0) return prev
        const total = prev.h * 3600 + prev.m * 60 + prev.s - 1
        return {
          h: Math.floor(total / 3600),
          m: Math.floor((total % 3600) / 60),
          s: total % 60,
        }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0B7FE8] text-white text-center text-sm py-2 px-4 font-bold">
        ⚡ ATENÇÃO: Acesso promocional disponível HOJE! ⚡
        <span className="ml-2 font-mono">
          {String(timeLeft.h).padStart(2, "0")}:
          {String(timeLeft.m).padStart(2, "0")}:
          {String(timeLeft.s).padStart(2, "0")}
        </span>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#082F63] via-[#0B7FE8] to-[#49A6FF] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="font-nunito text-3xl md:text-5xl lg:text-[3rem] leading-tight font-extrabold">
              +250 atividades prontas
              <br />
              para atendimentos
              <br />
              Psicopedagógicos infantis
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Materiais lúdicos, fichas de aplicação e atividades imprimíveis
              para crianças de 3 a 12 anos
            </p>
            <a
              href="#oferta"
              className="inline-block bg-gradient-to-b from-[#22C978] to-[#00B368] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:brightness-110 transition-all"
            >
              QUERO ACESSAR O KIT AGORA
            </a>
            <p className="text-sm text-white/60">
              🔒 Compra 100% segura • Acesso imediato
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/asset-0.webp"
              alt="NeuroAtividades Kids"
              width={390}
              height={487}
              unoptimized
              className="w-full max-w-sm h-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Counter Bar */}
        <div className="bg-white/10 backdrop-blur border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-nunito font-extrabold">+250</div>
              <div className="text-sm text-white/70">Atividades</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-nunito font-extrabold">+2.500</div>
              <div className="text-sm text-white/70">Profissionais</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-nunito font-extrabold">98%</div>
              <div className="text-sm text-white/70">Satisfação</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Update page.tsx to import and render Hero**

Read current page.tsx and replace its content:

```tsx
import { Hero } from "@/components/sections/Hero"

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  )
}
```

- [ ] **Verify build passes**

Run: `npm run build`
Expected: Compiled successfully

- [ ] **Commit**

```
git add -A
git commit -m "feat: add Hero section with top bar and counter"
```

---

### Task 3: Build Pain Points section

**Files:**
- Create: `src/components/sections/PainPoints.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Create PainPoints.tsx**

```tsx
import Image from "next/image"

const ageGroups = [
  {
    title: "3 a 5 anos",
    desc: "Atividades sensoriais, percepção visual, coordenação motora grossa e fina, primeiras letras e números.",
    image: "/images/asset-2.webp",
    count: "+60 atividades",
  },
  {
    title: "5 a 7 anos",
    desc: "Alfabetização, raciocínio lógico, atenção seletiva, memória, consciência fonológica.",
    image: "/images/asset-3.webp",
    count: "+80 atividades",
  },
  {
    title: "7 a 10 anos",
    desc: "Interpretação textual, produção escrita, resolução de problemas, pensamento crítico, funções executivas.",
    image: "/images/asset-4.webp",
    count: "+70 atividades",
  },
  {
    title: "10 a 12 anos",
    desc: "Leitura avançada, escrita criativa, operações matemáticas, planejamento, autonomia nos estudos.",
    image: "/images/asset-5.webp",
    count: "+40 atividades",
  },
]

export function PainPoints() {
  return (
    <section className="bg-[#F8FBFF] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-[#123A6D] text-center mb-12">
          Atividades organizadas por faixa etária
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {ageGroups.map((group) => (
            <div
              key={group.title}
              className="bg-white rounded-2xl shadow-sm p-6 flex gap-4 items-start hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-[#F3F8FF]">
                <Image
                  src={group.image}
                  alt={group.title}
                  width={96}
                  height={96}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-nunito font-bold text-lg text-[#123A6D]">
                    {group.title}
                  </h3>
                  <span className="text-xs bg-[#0B7FE8] text-white px-2 py-0.5 rounded-full font-semibold">
                    {group.count}
                  </span>
                </div>
                <p className="text-[#425466] text-sm leading-relaxed">
                  {group.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Update page.tsx to add PainPoints**

Edit the imports and render list:

```tsx
import { Hero } from "@/components/sections/Hero"
import { PainPoints } from "@/components/sections/PainPoints"

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
    </main>
  )
}
```

- [ ] **Verify build passes**

Run: `npm run build`
Expected: Compiled successfully

- [ ] **Commit**

```
git add -A
git commit -m "feat: add Pain Points section with age group cards"
```

---

### Task 4: Build Kit Contents section

**Files:**
- Create: `src/components/sections/KitContents.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Create KitContents.tsx**

```tsx
import Image from "next/image"

const categories = [
  { title: "Interpretação de Texto", image: "/images/asset-2.webp" },
  { title: "Coordenação Motora Fina", image: "/images/asset-7.webp" },
  { title: "Atenção e Foco", image: "/images/asset-2.webp" },
  { title: "Raciocínio Lógico", image: "/images/asset-3.webp" },
  { title: "Memória das Figuras", image: "/images/asset-4.webp" },
  { title: "Leitura e Escrita", image: "/images/asset-5.webp" },
  { title: "Sílabas em Ação", image: "/images/asset-6.webp" },
  { title: "Atividades para Casa", image: "/images/asset-8.webp" },
]

export function KitContents() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-[#123A6D] text-center mb-4">
          Veja o que você recebe no NeuroAtividades Kids
        </h2>
        <p className="text-[#425466] text-center mb-12 max-w-2xl mx-auto">
          Mais de 250 atividades psicopedagógicas organizadas por categoria e faixa etária
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-[#F3F8FF]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  width={300}
                  height={300}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-nunito font-bold text-sm md:text-base text-[#123A6D]">
                  {cat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-10 font-nunito font-bold text-[#0B7FE8] text-xl">
          E MUITO MAIS! +250 atividades no total
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Update page.tsx**

- [ ] **Verify build passes**

- [ ] **Commit**

---

### Task 5: Build How It Works section

**Files:**
- Create: `src/components/sections/HowItWorks.tsx`
- Modify: `src/app/page.tsx`

```tsx
const steps = [
  { num: "01", title: "Escolha a Atividade", desc: "Navegue pelo material organizado por faixa etária e habilidade. Encontre a atividade ideal para cada criança." },
  { num: "02", title: "Faça o Download", desc: "Baixe os PDFs imediatamente após a compra. Tudo pronto para imprimir, sem espera." },
  { num: "03", title: "Aplique na Sessão", desc: "Utilize as atividades lúdicas nos seus atendimentos. Materiais testados que engajam as crianças." },
  { num: "04", title: "Acompanhe a Evolução", desc: "Use as fichas de registro para monitorar o progresso e compartilhar com pais e escola." },
]

export function HowItWorks() {
  return (
    <section className="bg-[#082F63] py-16 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-center mb-4">
          Do improviso para um atendimento mais leve, organizado e intencional
        </h2>
        <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
          Veja como funciona
        </p>
        <div className="grid md:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <div key={step.num} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-[#0B7FE8]/30" />
              )}
              <div className="w-16 h-16 rounded-full bg-white text-[#0B7FE8] flex items-center justify-center font-nunito font-extrabold text-xl mx-auto mb-4 relative z-10">
                {step.num}
              </div>
              <h3 className="font-nunito font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-white/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Update page.tsx to add HowItWorks after PainPoints**
- [ ] **Verify build passes**
- [ ] **Commit**

---

### Task 6: Build Bonuses section

**Files:**
- Create: `src/components/sections/Bonuses.tsx`
- Modify: `src/app/page.tsx`

```tsx
import Image from "next/image"

const bonuses = [
  { title: "Cartões de Reforço Positivo", image: "/images/asset-9.webp", value: "R$27" },
  { title: "Roteiro de Sondagem Inicial", image: "/images/asset-10.webp", value: "R$37" },
  { title: "Atividades para Enviar para Casa", image: "/images/asset-11.webp", value: "R$27" },
  { title: "Registro de Evolução Psicopedagógica", image: "/images/asset-12.webp", value: "R$27" },
]

export function Bonuses() {
  return (
    <section className="bg-[#F8FBFF] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-[#123A6D] mb-2">
            Bônus Exclusivos
          </h2>
          <span className="inline-block bg-[#FF8A5B] text-white text-sm font-bold px-4 py-1 rounded-full">
            apenas hoje
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {bonuses.map((bonus) => (
            <div
              key={bonus.title}
              className="bg-white rounded-2xl border-2 border-[#FFD166] shadow-lg overflow-hidden flex md:flex-row flex-col"
            >
              <div className="md:w-48 h-48 bg-[#F3F8FF] flex-shrink-0">
                <Image
                  src={bonus.image}
                  alt={bonus.title}
                  width={200}
                  height={200}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <span className="text-xs font-bold text-white bg-[#FF8A5B] px-2 py-0.5 rounded-full inline-block w-fit mb-2">
                  BÔNUS
                </span>
                <h3 className="font-nunito font-bold text-lg text-[#123A6D]">{bonus.title}</h3>
                <p className="text-[#425466] text-sm mt-1">Valor: {bonus.value}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 font-bold text-[#0BB869] text-lg">
          Valor total dos bônus: R$ 117,60 — Hoje: GRÁTIS
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Update page.tsx**
- [ ] **Verify build passes**
- [ ] **Commit**

---

### Task 7: Build Access Info section

**Files:**
- Create: `src/components/sections/AccessInfo.tsx`
- Modify: `src/app/page.tsx`

```tsx
import Image from "next/image"

export function AccessInfo() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-[#123A6D] text-center mb-12">
          Receba tudo de forma rápida e prática
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#F3F8FF] rounded-2xl p-6 flex md:flex-row flex-col items-center gap-6">
            <Image src="/images/asset-20.webp" alt="Acesso via WhatsApp e E-mail" width={150} height={150} unoptimized className="rounded-xl" />
            <div>
              <h3 className="font-nunito font-bold text-lg text-[#123A6D] mb-2">Acesso via WhatsApp e E-mail</h3>
              <p className="text-[#425466] text-sm">Receba tudo no conforto do seu celular</p>
            </div>
          </div>
          <div className="bg-[#F3F8FF] rounded-2xl p-6 flex md:flex-row flex-col items-center gap-6">
            <Image src="/images/asset-21.webp" alt="Material pronto para baixar, imprimir e aplicar" width={150} height={150} unoptimized className="rounded-xl" />
            <div>
              <h3 className="font-nunito font-bold text-lg text-[#123A6D] mb-2">Material pronto para baixar, imprimir e aplicar</h3>
              <p className="text-[#425466] text-sm">Tudo em PDF de alta qualidade</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Update page.tsx**
- [ ] **Verify build passes**
- [ ] **Commit**

---

### Task 8: Build Social Proof section

**Files:**
- Create: `src/components/sections/SocialProof.tsx`
- Modify: `src/app/page.tsx`

```tsx
const testimonials = [
  { name: "Carla M.", role: "Psicopedagoga", text: "Finalmente um material completo! Uso com todos meus pacientes e eles amam." },
  { name: "Juliana S.", role: "Psicopedagoga", text: "Economizo horas de preparo por semana. Valeu cada centavo!" },
  { name: "Renata O.", role: "Mãe atípica", text: "Minha filha tem TDAH e as atividades de atenção são incríveis." },
  { name: "Dra. Patrícia L.", role: "Neuropedagoga", text: "Uso no consultório e recomendo para envio para casa. Nota 10!" },
  { name: "Amanda F.", role: "Psicopedagoga", text: "As crianças amam! O material é lúdico e muito bem elaborado." },
]

export function SocialProof() {
  return (
    <section className="bg-[#F3F8FF] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-[#123A6D] text-center mb-4">
          Profissionais que já começaram a usar o NeuroAtividades Kids
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl shadow-sm p-6 min-w-[280px] md:min-w-[320px] snap-start flex-shrink-0"
            >
              <div className="flex text-yellow-400 mb-3">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <p className="text-[#425466] text-sm mb-4">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="font-bold text-[#123A6D] text-sm">{t.name}</p>
                <p className="text-[#5B6B7B] text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-12 text-center">
          <div>
            <div className="font-nunito text-2xl md:text-3xl font-extrabold text-[#0B7FE8]">+2.500</div>
            <div className="text-sm text-[#425466]">Psicopedagogas</div>
          </div>
          <div>
            <div className="font-nunito text-2xl md:text-3xl font-extrabold text-[#0B7FE8]">98%</div>
            <div className="text-sm text-[#425466]">Satisfação</div>
          </div>
          <div>
            <div className="font-nunito text-2xl md:text-3xl font-extrabold text-[#0B7FE8]">+50.000</div>
            <div className="text-sm text-[#425466]">Atividades baixadas</div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Update page.tsx**
- [ ] **Verify build passes**
- [ ] **Commit**

---

### Task 9: Build Pricing section

**Files:**
- Create: `src/components/sections/Pricing.tsx`
- Modify: `src/app/page.tsx`

```tsx
export function Pricing() {
  return (
    <section id="oferta" className="bg-gradient-to-b from-[#082F63] to-[#0B7FE8] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-white text-center mb-12">
          Garanta seu NeuroAtividades Kids
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {/* Kit Essencial */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="font-nunito font-bold text-xl text-[#123A6D] mb-2">Kit Essencial</h3>
            <div className="text-4xl font-nunito font-extrabold text-[#0B7FE8] mb-1">
              R$ 47
            </div>
            <p className="text-xs text-[#5B6B7B] mb-6">ou 12x de R$ 4,70</p>
            <ul className="text-left text-sm text-[#425466] space-y-3 mb-8">
              <li className="flex items-start gap-2">✓ +150 atividades psicopedagógicas</li>
              <li className="flex items-start gap-2">✓ 2 bônus exclusivos</li>
              <li className="flex items-start gap-2">✓ 1 ano de acesso</li>
            </ul>
            <a
              href="#"
              className="block w-full bg-gradient-to-b from-[#22C978] to-[#00B368] text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all"
            >
              QUERO O KIT ESSENCIAL
            </a>
          </div>

          {/* Kit Completo */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-[#FFD166] relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF8A5B] text-white text-xs font-bold px-4 py-1 rounded-full">
              MAIS VENDIDO
            </span>
            <h3 className="font-nunito font-bold text-xl text-[#123A6D] mb-2">Kit Completo</h3>
            <div className="text-4xl font-nunito font-extrabold text-[#0B7FE8] mb-1">
              R$ 67
            </div>
            <p className="text-xs text-[#5B6B7B] mb-6">ou 12x de R$ 6,70</p>
            <ul className="text-left text-sm text-[#425466] space-y-3 mb-8">
              <li className="flex items-start gap-2">✓ +250 atividades psicopedagógicas</li>
              <li className="flex items-start gap-2">✓ Todos os 4 bônus exclusivos</li>
              <li className="flex items-start gap-2">✓ Acesso vitalício</li>
              <li className="flex items-start gap-2">✓ Atualizações gratuitas</li>
            </ul>
            <a
              href="#"
              className="block w-full bg-gradient-to-b from-[#22C978] to-[#00B368] text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all"
            >
              QUERO O KIT COMPLETO
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Update page.tsx**
- [ ] **Verify build passes**
- [ ] **Commit**

---

### Task 10: Build Creator section

**Files:**
- Create: `src/components/sections/Creator.tsx`
- Modify: `src/app/page.tsx`

```tsx
import Image from "next/image"

export function Creator() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 flex md:flex-row flex-col items-center gap-8">
        <div className="w-48 h-48 rounded-full overflow-hidden bg-[#F3F8FF] flex-shrink-0">
          <Image
            src="/images/asset-19.webp"
            alt="Laura Martins"
            width={200}
            height={200}
            unoptimized
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-nunito font-extrabold text-2xl text-[#123A6D] mb-1">Laura Martins</h2>
          <p className="text-[#0B7FE8] font-semibold text-sm mb-4">Psicopedagoga (CRP: 12/34567)</p>
          <p className="text-[#425466] text-sm leading-relaxed">
            Com mais de 10 anos de experiência em psicopedagogia clínica e institucional,
            Laura desenvolveu o NeuroAtividades Kids para ajudar profissionais a terem
            sessões mais produtivas e organizadas. Seu material já é utilizado por mais
            de 2.500 psicopedagogas em todo o Brasil.
          </p>
          <blockquote className="mt-4 italic text-[#5B6B7B] border-l-4 border-[#0B7FE8] pl-4 text-sm">
            &ldquo;Criei esse material para que você não precise mais passar horas preparando
            atividades. São anos de experiência organizados em um só lugar.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Update page.tsx**
- [ ] **Verify build passes**
- [ ] **Commit**

---

### Task 11: Build Guarantee section

**Files:**
- Create: `src/components/sections/Guarantee.tsx`
- Modify: `src/app/page.tsx`

```tsx
import Image from "next/image"

export function Guarantee() {
  return (
    <section className="bg-[#F8FBFF] py-16">
      <div className="max-w-4xl mx-auto px-4 flex md:flex-row flex-col items-center gap-8">
        <Image
          src="/images/asset-23.webp"
          alt="Garantia de 7 dias"
          width={200}
          height={200}
          unoptimized
          className="w-48 h-auto"
        />
        <div>
          <h2 className="font-nunito text-3xl font-extrabold text-[#123A6D] mb-4">
            Compre com tranquilidade: você tem 7 dias de garantia
          </h2>
          <p className="text-[#425466] text-sm leading-relaxed">
            Se por qualquer motivo você não ficar satisfeito com o NeuroAtividades Kids,
            devolvemos 100% do seu dinheiro. Sem burocracia, sem perguntas.
            Você tem 7 dias de garantia incondicional a partir da data da compra.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Update page.tsx**
- [ ] **Verify build passes**
- [ ] **Commit**

---

### Task 12: Build FAQ section

**Files:**
- Create: `src/components/sections/FAQ.tsx`
- Modify: `src/app/page.tsx`

```tsx
"use client"

import { useState } from "react"

const faqs = [
  { q: "Como recebo o material?", a: "Após a confirmação do pagamento, você receberá o acesso por e-mail e WhatsApp com instruções para baixar todo o material." },
  { q: "As atividades são indicadas para qual idade?", a: "De 3 a 12 anos, organizadas por faixa etária (3-5, 5-7, 7-10, 10-12 anos) para facilitar a escolha." },
  { q: "Posso usar no consultório e também enviar para casa?", a: "Sim! As atividades são licenciadas para uso profissional. Você pode aplicar nas sessões e enviar atividades complementares para casa." },
  { q: "Quanto tempo tenho de acesso?", a: "O acesso ao Kit Completo é vitalício com atualizações gratuitas. O Kit Essencial tem acesso por 1 ano." },
  { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia incondicional. Se não ficar satisfeito, devolvemos 100% do seu dinheiro." },
  { q: "O material vem em PDF?", a: "Sim, todo o material está em formato PDF de alta qualidade, pronto para baixar, imprimir e aplicar." },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-[#F8FBFF] py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-nunito text-3xl md:text-4xl font-extrabold text-[#123A6D] text-center mb-12">
          Perguntas Frequentes
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-4 flex items-center justify-between gap-4"
              >
                <span className="font-semibold text-[#0B7FE8] text-sm md:text-base">
                  {faq.q}
                </span>
                <span className={`text-[#0B7FE8] transition-transform ${openIndex === i ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-[#425466] text-sm">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Update page.tsx**
- [ ] **Verify build passes**
- [ ] **Commit**

---

### Task 13: Build Footer

**Files:**
- Create: `src/components/sections/Footer.tsx`
- Modify: `src/app/page.tsx`

```tsx
export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0B7FE8] to-[#065CB6] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="font-nunito font-bold text-xl mb-2">NeuroAtividades Kids</div>
        <p className="text-sm text-white/70 mb-4">
          © 2026 NeuroAtividades Kids. Todos os direitos reservados.
        </p>
        <div className="flex justify-center gap-4 text-sm text-white/60 mb-4">
          <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
        </div>
        <p className="text-xs text-white/50">
          🔒 Compra 100% Segura • CNPJ: XX.XXX.XXX/XXXX-XX
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Update page.tsx to include all sections**

Final page.tsx should render all sections in order:

```tsx
import { Hero } from "@/components/sections/Hero"
import { PainPoints } from "@/components/sections/PainPoints"
import { KitContents } from "@/components/sections/KitContents"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Bonuses } from "@/components/sections/Bonuses"
import { AccessInfo } from "@/components/sections/AccessInfo"
import { SocialProof } from "@/components/sections/SocialProof"
import { Pricing } from "@/components/sections/Pricing"
import { Creator } from "@/components/sections/Creator"
import { Guarantee } from "@/components/sections/Guarantee"
import { FAQ } from "@/components/sections/FAQ"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <KitContents />
      <HowItWorks />
      <Bonuses />
      <AccessInfo />
      <SocialProof />
      <Pricing />
      <Creator />
      <Guarantee />
      <FAQ />
      <Footer />
    </main>
  )
}
```

- [ ] **Run final build verification**

Run: `npm run build`
Expected: Compiled successfully, no errors

- [ ] **Commit all remaining work**

```
git add -A
git commit -m "feat: complete NeuroAtividades Kids clone with all sections"
```

---

### Task 14: Review pass — visual comparison

**Files:**
- Modify: All section files as needed

- [ ] **Start dev server and take screenshot**

Run: `npm run dev` in background

Navigate to `http://localhost:3000` and take full-page screenshot, save to `docs/design-references/clone-fullpage.png`

- [ ] **Compare with target reference**

Compare `docs/design-references/clone-fullpage.png` against `docs/design-references/target-fresh-desktop.png` visually. Check:
- Header gradient and top bar match
- Hero heading font size and spacing
- Product image position and size
- Pain point cards layout and colors
- Kit contents grid alignment
- Bonus cards golden border
- Pricing cards layout and colors
- FAQ accordion opens/closes
- Footer gradient and text

- [ ] **Fix any visual discrepancies**

For each section that doesn't match, update the component file. Rebuild and re-screenshot after each fix.

- [ ] **Final build verification**

Run: `npm run build`
Expected: Compiled successfully

- [ ] **Commit review fixes**

```
git add -A
git commit -m "fix: visual review adjustments"
```

---

### Task 15: Deploy to Vercel

**Files:** None

- [ ] **Push to GitHub**

```
git push origin master
```

- [ ] **Deploy to Vercel production**

```
vercel deploy --prod --yes
```

- [ ] **Verify deployment**

Run: `curl -s -o /dev/null -w "%{http_code}" https://lowticket-seven.vercel.app`
Expected: 200

- [ ] **Take final production screenshot**

Navigate to production URL and take full-page screenshot. Save to `docs/design-references/production-final.png`
