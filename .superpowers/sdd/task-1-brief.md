# Task 1: Offer Config

**Files:**
- Create: `src/config/offers/psicopedagogia/offer.ts`

**Goal:** Create the offer configuration file for Psicopedagogia, mirroring the structure of `lembrancinhas/offer.ts`.

**Context:** This is the foundational task. All other tasks depend on this file. The file must export `const OFFER: OfferConfig` following the exact data structure.

**Steps:**
1. Create directory `src/config/offers/psicopedagogia/` if it doesn't exist
2. Create `offer.ts` with the complete code below
3. Run `npx tsc --noEmit src/config/offers/psicopedagogia/offer.ts` to verify

## Complete Code

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
