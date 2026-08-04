import type { OfferConfig } from "@/types/offer"
import { OFFER as laboralOffer } from "@/config/offers/laboral/offer"

const image = (src: string) => {
  const filename = src.split("/").pop()

  return `/images/croqui/${filename}`
}

const bonuses = [
  {
    title: "Biblioteca de Croquis Masculinos",
    titleBreak: "Biblioteca de Croquis\nMasculinos",
    desc: "Bases corporais masculinas prontas para imprimir e utilizar na criação de roupas masculinas.",
    price: "R$ 27,00",
  },
  {
    title: "Biblioteca de Croquis em Movimento",
    titleBreak: "Biblioteca de Croquis\nem Movimento",
    desc: "Bases com poses mais dinâmicas, posições editoriais, expressivas e naturais.",
    price: "R$ 27,00",
  },
  {
    title: "Biblioteca de Croquis Plus Size",
    titleBreak: "Biblioteca de Croquis\nPlus Size",
    desc: "Bases de corpos plus size prontas para diferentes silhuetas.",
    price: "R$ 27,00",
  },
  {
    title: "Biblioteca de Croquis Infantis",
    titleBreak: "Biblioteca de Croquis\nInfantis",
    desc: "Bases corporais infantis para criação de roupas e coleções para crianças.",
    price: "R$ 27,00",
  },
  {
    title: "Biblioteca de Croquis dos Pés",
    titleBreak: "Biblioteca de Croquis\ndos Pés",
    desc: "Bases de pés em diferentes posições para sapatos, sandálias e botas.",
    price: "R$ 27,00",
  },
] as const

const demoImageOrder = [2, 7, 0, 5, 9, 3, 1, 8, 4, 6]

export const OFFER: OfferConfig = {
  ...laboralOffer,
  meta: {
    title: "60 Bases de Croquis",
    description: "Bases de croqui prontas para transformar ideias de moda em desenhos com mais rapidez e clareza.",
  },
  palette: {
    brand: "#9A6B2D",
    brandDeep: "#6F4A1F",
    brandInk: "#241912",
    brandDark: "#C49A58",
    brandLight: "#E6C995",
    brandSubtle: "#F8F0E3",
    cta: "#16A34A",
    ctaDeep: "#15803D",
    ctaDarkest: "#166534",
    accent: "#B57939",
    yellow: "#D6AA64",
    bg: "#FCF8F1",
    bgAlt: "#6F4A1F",
  },
  hero: {
    ...laboralOffer.hero,
    pill: "PARA QUEM CRIA MODA",
    titleLine1: "+60 Bases de Croqui",
    titleLine2: "Prontas para Desenhar",
    titleLine3: "Suas Roupas em Minutos",
    image: "/images/croqui/Plano Completo.webp",
    imageAlt: "Mockup do pacote de bases de croqui",
    subtitle: "Pare de travar na folha em branco e comece a desenhar suas roupas com bases de croqui prontas.",
    subtitlePosition: "beforeImage",
    ctaText: "QUERO ACESSAR AGORA",
    marqueeText: "60 BASES DE CROQUI ✦ PRONTAS PARA IMPRIMIR ✦ ACESSO IMEDIATO ✦ ",
    marqueeGradient: "linear-gradient(90deg, var(--brand) 0%, var(--brand-deep) 100%)",
    bullets: ["60 bases femininas prontas", "Arquivos em PNG e PDF", "Bases na proporção das 9 cabeças", "Imprima e comece a desenhar imediatamente"],
  },
  socialProof: {
    ...laboralOffer.socialProof,
    title: "Depoimento de quem já usa os croqui no dia a dia",
    testimonials: laboralOffer.socialProof.testimonials.slice(0, 5).map((testimonial) => ({ ...testimonial, src: image(testimonial.src), alt: "Depoimento de criadora de moda" })),
  },
  counter: {
    prefix: "+ de",
    target: 60,
    label: "Bases de Croqui prontas para\ndesenhar suas próximas criações",
  },
  kitCards: {
    ...laboralOffer.kitCards,
    heading1: "Veja as bases que você vai usar para tirar suas ideias do papel:",
    images: demoImageOrder.map((index) => {
      const item = laboralOffer.kitCards.images[index]
      return { ...item, src: image(item.src), alt: "Base de croqui pronta para desenhar" }
    }),
  },
  benefits: {
    title: "COM O PACK CROQUI PRONTO, SUAS IDEIAS VIRAM CRIAÇÕES",
    ctaText: "QUERO ACESSAR AGORA",
    items: [
      { icon: "💡", title: "Ideia vira croqui", desc: "Tire a roupa da cabeça e veja no papel em minutos." },
      { icon: "📐", title: "Proporção sem técnica", desc: "Desenhe croquis proporcionais sem precisar dominar técnicas de desenho." },
      { icon: "👥", title: "Looks para cada corpo", desc: "Crie para feminino, masculino, plus size e infantil com mais liberdade." },
      { icon: "👗", title: "Mais segurança para mostrar", desc: "Apresente a peça à cliente antes de costurar e se orgulhe do seu croqui." },
    ],
  },
  urgency: {
    pill: "OPORTUNIDADE ÚNICA",
    title: "QUANTAS IDEIAS INCRÍVEIS VOCÊ NÃO CONSEGUE DESENHAR POR NÃO TER UMA BASE PRONTA?",
    highlight: "",
    body: "Tenha uma base pronta para visualizar e desenhar suas próximas criações antes da sua próxima venda.",
    ctaText: "QUERO ACESSAR AGORA",
    trust: ["ACESSO IMEDIATO • MATERIAL DIGITAL"],
    timerMode: "hoursMinutesSeconds",
  },
  deliverables: {
    ...laboralOffer.deliverables,
    pill: "ACESSO IMEDIATO",
    title: "TUDO O QUE VOCÊ VAI RECEBER",
    image: "/images/croqui/Plano Completo.webp",
    imageAlt: "Mockup do pacote de bases de croqui",
    bullets: [
      "60 bases femininas prontas para imprimir",
      "Orientação rápida de utilização",
      "Bases em diferentes poses",
      "Corpos para croquis mais realistas",
      "Proporção das 9 cabeças",
      "Acesso imediato ao material",
      "E muito mais…",
    ],
  },
  bonusSection: {
    ...laboralOffer.bonusSection,
    pill: "EXTRAS INCLUÍDOS",
    titleLead: "5 BÔNUS",
    titleHighlight: "EXCLUSIVOS",
    subtitle: "No Plano Completo, você também recebe materiais para ampliar ainda mais suas criações e agilizar seu processo.",
    timerText: "BÔNUS DISPONÍVEL SOMENTE\nNO PLANO COMPLETO",
    cardImageAspect: "portrait",
  },
  bonuses: laboralOffer.bonuses.slice(0, bonuses.length).map((bonus, index) => ({
    ...bonus,
    front: image(bonus.front),
    back: image(bonus.back),
    ...bonuses[index],
  })),
  pricing: {
    titleLead: "ESCOLHA A OPÇÃO",
    titleHighlight: "IDEAL PARA VOCÊ",
    plans: [
      {
        ...laboralOffer.pricing.plans[0],
        title: "Plano Básico",
        image: "/images/croqui/Plano Básico.webp",
        imageAlt: "Plano Básico de Bases de Croqui",
        oldPrice: "R$ 27,90",
        price: "R$ 17,90",
        installments: "ou 4x de R$ 4,48 no cartão",
        items: ["60 bases femininas prontas para imprimir", "Orientação rápida de utilização", "Acesso imediato ao material", "Arquivos em PDF para impressão"],
        mutedItems: ["Não inclui os bônus do Plano Completo"],
        ctaText: "QUERO O PLANO BÁSICO",
        ctaHref: "https://pay.cakto.com.br/q5hydrz",
      },
      {
        ...laboralOffer.pricing.plans[1],
        title: "Plano Completo",
        image: "/images/croqui/Plano Completo.webp",
        imageAlt: "Plano Completo de Bases de Croqui",
        featured: true,
        oldPrice: "R$ 37,90",
        price: "R$ 27,90",
        installments: "ou 6x de R$ 5,00 no cartão",
        items: ["60 bases femininas prontas para imprimir", ...bonuses.map(({ title }) => `🎁 ${title}`), "Arquivos em PDF para impressão", "Acesso imediato ao material"],
        ctaText: "QUERO O PLANO COMPLETO",
        ctaHref: "https://pay.cakto.com.br/qkhtu7h",
      },
    ],
  },
  guarantee: {
    ...laboralOffer.guarantee,
    icon: image(laboralOffer.guarantee.icon),
    iconAlt: "Garantia de 30 dias",
    marqueeText: "GARANTIA 30 DIAS ✦ RISCO ZERO ✦ COMPRA SEGURA ✦ ",
    marqueeGradient: "linear-gradient(90deg, var(--brand) 0%, var(--brand-deep) 100%)",
    title: "GARANTIA DE 30 DIAS ZERO RISCO PARA VOCÊ",
    body: "Você tem **30 dias de garantia** para conhecer as Bases de Croqui Prontas. Se o material não atender às suas necessidades, pode solicitar o reembolso dentro desse período.",
  },
  access: {
    title: "Como é o acesso às bases",
    steps: [
      { num: "01", title: "Conclua sua compra", desc: "Após o pagamento, seu acesso é liberado automaticamente." },
      { num: "02", title: "Escolha sua base", desc: "Selecione a pose desejada e visualize." },
      { num: "03", title: "Desenhe sua roupa", desc: "Imprima e contorne, adicionando cor e detalhes." },
      { num: "04", title: "Mostre suas criações", desc: "Compartilhe com clientes e receba feedback." },
    ],
    ctaText: "QUERO COMEÇAR AGORA",
  },
  faq: {
    title: "Perguntas Frequentes",
    items: [
      { q: "Preciso saber desenhar bem para usar?", a: "Não. As bases já vêm prontas, você só imprime e desenha por cima." },
      { q: "O acesso é imediato?", a: "Sim. Após a confirmação do pagamento, o acesso é liberado automaticamente." },
      { q: "Posso usar as bases para criar roupas masculinas?", a: "Sim, você recebe também a Biblioteca de Croquis Masculinos como bônus." },
      { q: "As bases são editáveis?", a: "Sim. Você pode personalizá-las conforme suas necessidades." },
      { q: "O que acontece se eu não gostar do material?", a: "Você tem 30 dias de garantia para solicitar o reembolso." },
    ],
  },
  footer: {
    ...laboralOffer.footer,
    showUpdate: false,
    copyright: "© Todos os direitos reservados. Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Fazemos todos os esforços para indicar claramente as informações do produto. Não vendemos seu e-mail ou dados a terceiros. Dúvidas? Fale conosco de Segunda a Sexta, das 09h às 18h.",
    privacyUrl: "/politica-de-privacidade",
    termsUrl: "/termos-de-uso",
  },
}
