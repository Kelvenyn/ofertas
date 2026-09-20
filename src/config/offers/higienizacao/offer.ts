import type { OfferConfig } from "@/types/offer"

const pages = Array.from({ length: 15 }, (_, index) => ({
  src: `/images/higienizacao/demonstrativo-${String(index + 1).padStart(2, "0")}.webp`,
  alt: `Página ${index + 1} do Manual Prático de Diagnóstico e Decisão para Higienização`
}))

const bonusDetails = [
  {
    title: "Guia Visual de Identificação de Tecidos e Pontos de Atenção",
    titleBreak: "Guia Visual de Tecidos\ne Pontos de Atenção",
    desc: "Compare tecidos e saiba o que observar antes de escolher o procedimento de higienização.",
    price: "R$ 29,90"
  },
  {
    title: "Checklist de Higienização Profissional",
    titleBreak: "Checklist de higienização prévia\nProfissional",
    desc: "Confira o estofado, os materiais, os riscos e os pontos de atenção antes de iniciar o serviço.",
    price: "R$ 12,90"
  },
  {
    title: "Manual Prático de Extração e Secagem",
    titleBreak: "Manual Prático de\nExtração e Secagem",
    desc: "Avalie a umidade, acompanhe a extração e conduza melhor a secagem do estofado.",
    price: "R$ 19,90"
  },
  {
    title: "Ficha Profissional de Avaliação e Registro do Estofado",
    titleBreak: "Ficha de Avaliação e\nRegistro do Estofado",
    desc: "Registre o estado do estofado, o diagnóstico, o procedimento e o resultado de cada atendimento.",
    price: "R$ 19,90"
  },
  {
    title: "Guia Visual dos Erros Mais Comuns",
    titleBreak: "Guia Visual dos\nErros Mais Comuns",
    desc: "Reconheça erros comuns na higienização e saiba o que revisar antes de insistir.",
    price: "R$ 12,90"
  },
  {
    title: "Kit Profissional de Organização de Produtos e Acessórios",
    titleBreak: "Kit de Organização de\nProdutos e Acessórios",
    desc: "Organize produtos e acessórios e confira o que levar para cada atendimento.",
    price: "R$ 12,90"
  },
] as const

export const OFFER: OfferConfig = {
  meta: {
    title: "Manual Prático de Diagnóstico e Decisão para Higienização",
    description: "Uma referência visual com 30 situações práticas para avaliar sofás, colchões e cadeiras estofadas antes e durante cada higienização."
  },
  palette: {
    brand: "#334155",
    brandDeep: "#1E293B",
    brandInk: "#0F172A",
    brandDark: "#475569",
    brandLight: "#CBD5E1",
    brandSubtle: "#F1F5F9",
    cta: "#16A34A",
    ctaDeep: "#15803D",
    ctaDarkest: "#14532D",
    accent: "#D4A017",
    yellow: "#F2C94C",
    bg: "#F8FAFC",
    bgAlt: "#1E293B"
  },
  orientation: "portrait",
  hero: {
    pill: "MANUAL PRÁTICO DE HIGIENIZAÇÃO",
    headline: "Manual Prático de\nDiagnóstico e Decisão",
    subline: "para Higienização de Sofás, Colchões e Cadeiras Estofadas",
    image: "/images/higienizacao/plano-completo.webp",
    imageAlt: "Manual Prático de Diagnóstico e Decisão para Higienização com seis bônus",
    support: "Consulte uma referência visual para observar tecidos, avaliar riscos e escolher o próximo passo da higienização.",
    ctaText: "QUERO O MANUAL",
    marqueeText: "IDENTIFIQUE • AVALIE • HIGIENIZE COM MAIS CLAREZA",
    bullets: [
      "Diagnostique antes de aplicar",
      "Saiba exatamente o que observar",
      "Escolha o caminho com segurança",
      "Reduza erros, danos e retrabalho",
    ]
  },
  socialProof: {
    title: "Profissionais já usam o manual de higienização",
    testimonials: Array.from({ length: 6 }, (_, index) => ({
      src: `/images/higienizacao/depoimento-${String(index + 1).padStart(2, "0")}.webp`,
      alt: `Depoimento ${index + 1} de profissional que utiliza o manual de higienização`
    }))
  },
  counter: {
    prefix: "",
    target: 30,
    label: "Diagnósticos para avaliar estofados"
  },
  kitCards: {
    heading: "Consulte o manual durante o serviço",
    images: pages
  },
  benefits: {
    title: "O manual prático vai te trazer mais:",
    ctaText: "QUERO TER O MANUAL",
    items: [
      {
        icon: "🔍",
        title: "Clareza",
        desc: "Siga uma sequência para avaliar o estofado antes de decidir o procedimento."
      },
      {
        icon: "🎯",
        title: "Direcionamento",
        desc: "Observe material, problema e riscos antes de iniciar a higienização."
      },
      {
        icon: "🛡️",
        title: "Segurança",
        desc: "Consulte orientações para tecidos, manchas e situações diferentes."
      },
      {
        icon: "✓",
        title: "Profissionalismo",
        desc: "Use o manual como referência para organizar cada etapa do serviço."
      },
    ]
  },
  urgency: {
    title: "Na dúvida sobre o estofado, consulte o manual",
    highlight: "",
    body: "Identifique o estofado, avalie os riscos e consulte opções antes de iniciar a higienização.",
    ctaText: "QUERO O MANUAL",
    trust: ["MATERIAL DIGITAL"]
  },
  deliverables: {
    title: "TUDO O QUE VOCÊ VAI RECEBER",
    image: "/images/higienizacao/plano-completo.webp",
    imageAlt: "Manual Prático de Higienização e os seis bônus do Plano Completo",
    bullets: [
      "Manual de identificação de tecidos e pontos de atenção",
      "Checklist de higienização prévia profissional",
      "Manual de extração e secagem",
      "Ficha de avaliação e registro do estofado",
      "Guia visual dos erros mais comuns",
      "Kit para organizar produtos e acessórios",
      "Material visual e fácil de consultar durante o atendimento",
    ]
  },
  bonusSection: {
    titleLead: "6 BÔNUS",
    titleHighlight: "EXCLUSIVOS",
    subtitle: "Além do manual, o Plano Completo inclui 6 materiais extras sobre tecidos, checklist, extração, avaliação, erros e organização.",
    cardLabel: "BÔNUS",
    timerText: "BÔNUS DISPONÍVEIS SOMENTE\nNO PLANO COMPLETO",
    freeLabel: "GRÁTIS"
  },
  bonuses: bonusDetails.map((bonus, index) => ({
    front: `/images/higienizacao/bonus-${String(index + 1).padStart(2, "0")}-frente.webp`,
    back: `/images/higienizacao/bonus-${String(index + 1).padStart(2, "0")}-verso.webp`,
    ...bonus
  })),
  pricing: {
    titleLead: "ESCOLHA O PLANO",
    titleHighlight: "IDEAL PARA O SEU SERVIÇO",
    plans: [
      {
        id: "basic",
        title: "Plano Básico",
        image: "/images/higienizacao/plano-basico.webp",
        imageAlt: "Plano Básico do Manual Prático de Higienização",
        featured: false,
        oldPrice: "de R$ 39,90",
        price: "R$ 17,90",
        installments: "ou 4x de R$ 4,47 no cartão",
        items: [
          "Manual Prático de Diagnóstico e Decisão",
          "30 situações de sofás, colchões e cadeiras",
          "Diagnóstico visual para avaliar riscos",
          "Orientação para avaliar riscos",
          "Material digital para consultar durante o serviço",
          "Acesso após a confirmação da compra"
        ],
        mutedItems: ["Não inclui os 6 bônus do Plano Completo"],
        ctaText: "QUERO O PLANO BÁSICO!",
        ctaHref: "https://pay.hotmart.com/Y107568605N"
      },
      {
        id: "premium",
        label: "MAIS COMPLETO",
        title: "Plano Completo",
        image: "/images/higienizacao/plano-completo.webp",
        imageAlt: "Plano Completo do Manual Prático de Higienização com seis bônus",
        featured: true,
        oldPrice: "de R$ 147,00",
        price: "R$ 27,90",
        installments: "ou 4x de R$ 6,97 no cartão",
        items: [
          "Manual Prático de Diagnóstico e Decisão",
          "🎁 Guia visual de tecidos",
          "🎁 Checklist de higienização prévia",
          "🎁 Manual de extração e secagem",
          "🎁 Ficha de avaliação do estofado",
          "🎁 Guia de erros comuns",
          "🎁 Kit para organizar produtos",
          "Acesso após a confirmação da compra"
        ],
        ctaText: "QUERO O PLANO COMPLETO!",
        ctaHref: "https://pay.hotmart.com/N107568642I"
      },
    ],
    trustText: "Compra segura • Garantia de 30 dias"
  },
  guarantee: {
    marqueeText: "GARANTIA DE 30 DIAS • COMPRA SEGURA • RISCO ZERO • ",
    icon: "/images/higienizacao/garantia.webp",
    iconAlt: "Selo de garantia de 30 dias",
    title: "Conheça o material com tranquilidade",
    body: "Você tem **30 dias de garantia** para acessar e avaliar o Manual Prático. Se decidir que ele não é para você, poderá solicitar o reembolso dentro desse prazo."
  },
  access: {
    title: "Como você vai receber seu Manual Prático",
    steps: [
      {
        title: "Escolha seu plano",
        desc: "Selecione o Plano Básico ou o Plano Completo e conclua o pagamento."
      },
      {
        title: "Aguarde a confirmação",
        desc: "Assim que o pagamento for confirmado, as informações de acesso serão enviadas para você."
      },
      {
        title: "Acesse o material",
        desc: "Abra o conteúdo digital pelo celular, tablet ou computador."
      },
      {
        title: "Consulte durante o serviço",
        desc: "Use o manual para avaliar os riscos e decidir o próximo passo."
      },
    ],
    ctaText: "QUERO O MANUAL"
  },
  faq: {
    title: "Perguntas Frequentes",
    items: [
      { q: "O que encontro no Manual Prático?", a: "São 30 situações de sofás, colchões e cadeiras, com diagnóstico visual, pontos de atenção, riscos e orientações para decidir como prosseguir." },
      { q: "Como recebo o manual?", a: "Após a confirmação da compra, você recebe as instruções para acessar o material digital." },
      { q: "O material é físico ou digital?", a: "É digital e pode ser consultado pelo celular, tablet ou computador durante o serviço." },
      { q: "Para quem é o manual?", a: "Para profissionais que higienizam sofás, colchões e cadeiras estofadas e buscam uma referência visual para avaliar o serviço." },
      { q: "E se eu não gostar?", a: "Você tem 30 dias para avaliar o Manual Prático e solicitar o reembolso, se decidir que ele não é para você." }
    ]
  },
  footer: {
    updateTitle: "Manual Prático de Higienização",
    updateBody: "Uma referência visual para apoiar suas decisões antes e durante cada serviço.",
    copyright: "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.",
    privacyUrl: "/politica-de-privacidade",
    termsUrl: "/termos-de-uso",
    showUpdate: false
  }
}
