import type { OfferConfig } from "@/types/offer"

const pages = Array.from({ length: 15 }, (_, index) => ({
  src: `/images/higienizacao/page-${String(index + 1).padStart(2, "0")}.webp`,
  alt: `Página ${index + 1} do Manual Prático de Diagnóstico e Decisão para Higienização`,
  width: 1200,
  height: 1697,
}))

const bonusDetails = [
  {
    title: "Guia Visual de Identificação de Tecidos e Pontos de Atenção",
    titleBreak: "Guia Visual de Tecidos\ne Pontos de Atenção",
    desc: "Um guia visual para comparar características dos principais tecidos e saber o que observar antes de escolher o procedimento de higienização.",
    price: "R$ 29,90",
  },
  {
    title: "Checklist Pré-Higienização Profissional",
    titleBreak: "Checklist Pré-Higienização\nProfissional",
    desc: "Um checklist rápido para conferir o estofado, o material, os riscos e os pontos de atenção antes de aplicar qualquer produto ou iniciar o serviço.",
    price: "R$ 12,90",
  },
  {
    title: "Manual Prático de Extração e Secagem",
    titleBreak: "Manual Prático de\nExtração e Secagem",
    desc: "Um guia prático para avaliar a umidade, entender o que observar durante a extração e conduzir melhor a secagem do estofado.",
    price: "R$ 19,90",
  },
  {
    title: "Ficha Profissional de Avaliação e Registro do Estofado",
    titleBreak: "Ficha de Avaliação e\nRegistro do Estofado",
    desc: "Uma ficha profissional para registrar o estado do estofado, o diagnóstico, o procedimento realizado e o resultado de cada atendimento.",
    price: "R$ 19,90",
  },
  {
    title: "Guia Visual dos Erros Mais Comuns",
    titleBreak: "Guia Visual dos\nErros Mais Comuns",
    desc: "Um guia visual para reconhecer os erros mais comuns durante a higienização e saber o que revisar antes de insistir no procedimento.",
    price: "R$ 12,90",
  },
  {
    title: "Kit Profissional de Organização de Produtos e Acessórios",
    titleBreak: "Kit de Organização de\nProdutos e Acessórios",
    desc: "Um kit de fichas para organizar produtos, pulverizadores, escovas, acessórios e equipamentos e conferir o que levar para cada atendimento.",
    price: "R$ 12,90",
  },
] as const

export const OFFER: OfferConfig = {
  meta: {
    title: "Manual Prático de Diagnóstico e Decisão para Higienização",
    description: "Uma referência visual com 30 situações práticas para avaliar sofás, colchões e cadeiras estofadas antes e durante cada higienização.",
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
    bgAlt: "#1E293B",
  },
  hero: {
    pill: "MANUAL PRÁTICO DE HIGIENIZAÇÃO",
    titleLine1: "Manual Prático de",
    titleLine2: "Diagnóstico e Decisão",
    titleLine3: "para Higienização de Sofás, Colchões e Cadeiras Estofadas",
    image: "/images/higienizacao/plan-complete.webp",
    imageAlt: "Manual Prático de Diagnóstico e Decisão para Higienização com seis bônus",
    imageWidth: 1080,
    imageHeight: 1080,
    subtitle: "Tenha sempre em mãos uma referência visual para entender o que está diante de você, o que precisa observar, quais riscos avaliar e qual caminho considerar antes e durante cada higienização.",
    ctaText: "QUERO TER O MANUAL",
    timerLabel: "OFERTA ENCERRA EM",
    marqueeText: "IDENTIFIQUE • AVALIE • HIGIENIZE DO JEITO CERTO • REDUZA ERROS E RETRABALHO • ",
    marqueeGradient: "linear-gradient(90deg, #0F172A 0%, #334155 34%, #D4A017 68%, #1E293B 100%)",
    bullets: [
      "Diagnostique antes de aplicar",
      "Saiba exatamente o que observar",
      "Escolha o caminho com mais segurança",
      "Reduza erros, danos e retrabalho",
    ],
  },
  socialProof: {
    title: "Quem higieniza sofás, colchões e cadeiras já está usando o manual",
    testimonials: Array.from({ length: 6 }, (_, index) => ({
      src: `/images/higienizacao/testimonial-${String(index + 1).padStart(2, "0")}.webp`,
      alt: `Depoimento ${index + 1} de profissional que utiliza o manual de higienização`,
      gradient: index % 2 === 0
        ? "linear-gradient(90deg, #1E293B, #334155)"
        : "linear-gradient(90deg, #D4A017, #334155)",
    })),
  },
  counter: {
    prefix: "",
    target: 30,
    label: "Diagnósticos de sofás, colchões e cadeiras estofadas\npara avaliar e higienizar",
  },
  kitCards: {
    heading1: "Veja como o manual ajuda você a consultar durante o serviço:",
    images: pages,
    displayAspect: "portrait",
  },
  benefits: {
    title: "O manual prático vai te trazer mais:",
    ctaText: "QUERO TER O MANUAL",
    items: [
      {
        icon: "🔍",
        title: "Clareza",
        desc: "Olhe para o estofado e tenha uma sequência clara do que precisa avaliar antes de decidir o procedimento de higienização.",
      },
      {
        icon: "🎯",
        title: "Direcionamento",
        desc: "Depois de identificar o material, o problema e os riscos, entenda quais decisões precisam ser tomadas antes e durante a higienização.",
      },
      {
        icon: "🛡️",
        title: "Segurança",
        desc: "Trabalhe com mais segurança diante de tecidos, manchas e situações diferentes, reduzindo tentativa e erro no estofado do cliente.",
      },
      {
        icon: "✓",
        title: "Profissionalismo",
        desc: "Consulte o manual sempre que surgir uma dúvida e conduza cada etapa com mais organização, confiança e postura profissional.",
      },
    ],
  },
  urgency: {
    pill: "REFERÊNCIA DURANTE O SERVIÇO",
    title: "Quantas vezes você ficou diante de um estofado sem saber qual caminho seguir?",
    highlight: "",
    body: "Tenha uma referência visual para identificar o que está diante de você, avaliar os riscos e entender qual caminho considerar antes e durante cada higienização.",
    ctaText: "QUERO ACESSAR O MANUAL →",
    trust: ["MATERIAL DIGITAL • ACESSO APÓS A CONFIRMAÇÃO DA COMPRA"],
  },
  deliverables: {
    pill: "MATERIAL DIGITAL",
    title: "TUDO O QUE VOCÊ VAI RECEBER",
    titleHighlight: "",
    image: "/images/higienizacao/plan-complete.webp",
    imageAlt: "Manual Prático de Higienização e os seis bônus do Plano Completo",
    bullets: [
      "Manual Prático de Diagnóstico e Decisão para Higienização de Sofás, Colchões e Cadeiras Estofadas",
      "30 situações práticas organizadas entre sofás, colchões e cadeiras",
      "Diagnóstico visual para saber exatamente o que observar em cada situação",
      "Orientação para avaliar riscos e escolher o caminho mais adequado antes de agir",
      "Decisões sobre aplicação, ação mecânica, umidade, extração e secagem",
      "Fluxo para saber quando continuar, ajustar ou interromper o procedimento",
      "Material visual e fácil de consultar durante o atendimento",
    ],
  },
  bonusSection: {
    pill: "EXTRAS INCLUÍDOS",
    titleLead: "6 BÔNUS",
    titleHighlight: "EXCLUSIVOS",
    subtitle: "Além do Manual Prático, no Plano Completo você também recebe 6 materiais extras para facilitar seu serviço, reduzir dúvidas no atendimento e ajudar antes, durante e depois da higienização de estofados.",
    cardLabel: "BÔNUS",
    touchHint: "Toque na imagem acima para ver o conteúdo.",
    backHint: "Toque para voltar",
    timerText: "BÔNUS DISPONÍVEIS SOMENTE\nNO PLANO COMPLETO",
    freeLabel: "GRÁTIS",
    cardImageAspect: "portrait",
  },
  bonuses: bonusDetails.map((bonus, index) => ({
    front: `/images/higienizacao/bonus-${String(index + 1).padStart(2, "0")}-front.webp`,
    back: `/images/higienizacao/bonus-${String(index + 1).padStart(2, "0")}-back.webp`,
    ...bonus,
  })),
  pricing: {
    titleLead: "ESCOLHA O PLANO",
    titleHighlight: "IDEAL PARA O SEU SERVIÇO",
    plans: [
      {
        id: "basic",
        title: "Plano Básico",
        image: "/images/higienizacao/plan-basic.webp",
        imageAlt: "Plano Básico do Manual Prático de Higienização",
        featured: false,
        oldPrice: "de R$ 39,90",
        price: "R$ 17,90",
        installments: "ou 4x de R$ 4,47 no cartão",
        items: [
          "Manual Prático de Diagnóstico e Decisão",
          "30 situações práticas de sofás, colchões e cadeiras",
          "Diagnóstico visual e orientação para avaliar riscos",
          "Material digital para consultar durante o serviço",
          "Acesso após a confirmação da compra",
        ],
        mutedItems: ["Não inclui os 6 bônus do Plano Completo"],
        ctaText: "QUERO O PLANO BÁSICO!",
        ctaHref: "https://pay.hotmart.com/Y107568605N",
      },
      {
        id: "premium",
        label: "MAIS COMPLETO",
        title: "Plano Completo",
        image: "/images/higienizacao/plan-complete.webp",
        imageAlt: "Plano Completo do Manual Prático de Higienização com seis bônus",
        featured: true,
        badgeText: "MELHOR ESCOLHA",
        oldPrice: "de R$ 147,00",
        price: "R$ 27,90",
        installments: "ou 4x de R$ 6,97 no cartão",
        items: [
          "Manual Prático de Diagnóstico e Decisão",
          ...bonusDetails.map((bonus, index) => `🎁 Bônus ${String(index + 1).padStart(2, "0")}: ${bonus.title}`),
          "Material digital para consultar pelo celular, tablet ou computador",
          "Acesso após a confirmação da compra",
        ],
        ctaText: "QUERO O PLANO COMPLETO!",
        ctaHref: "https://pay.hotmart.com/N107568642I",
      },
    ],
    trustText: "Compra segura • Garantia de 30 dias",
  },
  guarantee: {
    marqueeText: "GARANTIA DE 30 DIAS • COMPRA SEGURA • RISCO ZERO • ",
    marqueeGradient: "linear-gradient(90deg, #0F172A 0%, #334155 40%, #D4A017 70%, #1E293B 100%)",
    icon: "/images/higienizacao/garantia-30-dias.webp",
    iconAlt: "Selo de garantia de 30 dias",
    title: "Conheça o material com tranquilidade",
    body: "Você tem **30 dias de garantia** para acessar e avaliar o Manual Prático. Se decidir que ele não é para você, poderá solicitar o reembolso dentro desse prazo.",
  },
  access: {
    title: "Como você vai receber seu Manual Prático",
    steps: [
      {
        num: "01",
        title: "Escolha seu plano",
        desc: "Selecione o Plano Básico ou o Plano Completo e conclua o pagamento.",
      },
      {
        num: "02",
        title: "Aguarde a confirmação",
        desc: "Assim que o pagamento for confirmado, as informações de acesso serão enviadas para você.",
      },
      {
        num: "03",
        title: "Acesse o material",
        desc: "Abra o conteúdo digital pelo celular, tablet ou computador.",
      },
      {
        num: "04",
        title: "Consulte durante o serviço",
        desc: "Use o manual para observar a situação, avaliar os riscos e decidir o próximo passo da higienização.",
      },
    ],
    ctaText: "QUERO TER O MANUAL",
  },
  faq: {
    title: "Perguntas Frequentes",
    items: [
      {
        q: "Como vou receber o Manual Prático?",
        a: "Após a confirmação da compra, você receberá as informações necessárias para acessar o material digital.",
      },
      {
        q: "O material é físico ou digital?",
        a: "O material é 100% digital. Você pode acessá-lo pelo celular, tablet ou computador e consultá-lo durante seus atendimentos.",
      },
      {
        q: "Para quem é este manual?",
        a: "O manual foi preparado para quem trabalha com higienização de sofás, colchões e cadeiras estofadas e quer uma referência visual para apoiar a avaliação antes e durante o serviço.",
      },
      {
        q: "O que encontro no manual?",
        a: "Você encontra 30 situações práticas organizadas entre sofás, colchões e cadeiras, com diagnóstico visual, pontos de atenção, avaliação de riscos e orientações para decidir como prosseguir.",
      },
      {
        q: "O que vem no Plano Completo?",
        a: "O Plano Completo inclui o Manual Prático e os 6 bônus: Guia Visual de Tecidos, Checklist Pré-Higienização, Manual de Extração e Secagem, Ficha de Avaliação, Guia dos Erros Mais Comuns e Kit de Organização.",
      },
      {
        q: "E se eu comprar e decidir que o material não é para mim?",
        a: "Você tem 30 dias de garantia e pode solicitar o reembolso dentro desse prazo.",
      },
    ],
  },
  footer: {
    updateTitle: "Manual Prático de Higienização",
    updateBody: "Uma referência visual para apoiar suas decisões antes e durante cada serviço.",
    copyright: "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.",
    privacyUrl: "/politica-de-privacidade",
    termsUrl: "/termos-de-uso",
    missionText: "Identifique, avalie e higienize do jeito certo.",
    privacyLabel: "Política de Privacidade",
    termsLabel: "Termos de Uso",
    showUpdate: false,
  },
}
