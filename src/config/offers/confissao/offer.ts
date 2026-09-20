import type { OfferConfig } from "@/types/offer"
import { OFFER as laboralOffer } from "@/config/offers/laboral/offer"

const bonuses = [
  {
    title: "Exame de Consciência de Bolso",
    titleBreak: "Exame de Consciência\nde Bolso",
    desc: "Um exame visual, resumido e organizado. Pode ser consultado pelo celular ou impresso em formato dobrável antes da confissão.",
    price: "R$ 27,00"
  },
  {
    title: "40 Perguntas para Preparar sua Confissão",
    titleBreak: "40 Perguntas para\nPreparar sua Confissão",
    desc: "Uma coleção de perguntas práticas para reconhecer faltas, omissões, hábitos e atitudes presentes na vida cotidiana.",
    price: "R$ 27,00"
  },
  {
    title: "Orações para Antes e Depois da Confissão",
    titleBreak: "Orações Antes e Depois\nda Confissão",
    desc: "Uma seleção de orações curtas para pedir sinceridade, arrependimento, coragem, serenidade e gratidão.",
    price: "R$ 27,00"
  },
  {
    title: "Guia Visual da Primeira Missa Depois da Confissão",
    titleBreak: "Guia da Primeira Missa\nDepois da Confissão",
    desc: "Um material mostrando como se preparar para voltar à Missa e participar com mais atenção e reverência.",
    price: "R$ 27,00"
  },
  {
    title: "Calendário de Vida Sacramental",
    titleBreak: "Calendário de Vida\nSacramental",
    desc: "Um calendário para registrar confissões, Missas importantes, períodos penitenciais e momentos de preparação espiritual.",
    price: "R$ 27,00"
  },
  {
    title: "Exame Diário de Cinco Minutos",
    titleBreak: "Exame Diário de\nCinco Minutos",
    desc: "Um roteiro para revisar o dia com gratidão, reconhecer falhas e escolher uma atitude para o dia seguinte.",
    price: "R$ 27,00"
  },
] as const

const confissaoImage = (filename: string) => `/images/confissao/${filename}`

export const OFFER: OfferConfig = {
  ...laboralOffer,
  meta: {
    title: "Guia Visual da Confissão",
    description: "Um passo a passo visual para organizar o exame de consciência, saber o que dizer ao padre e se confessar com tranquilidade."
  },
  palette: {
    brand: "#9F1239",
    brandDeep: "#4C0519",
    brandInk: "#3B0715",
    brandDark: "#BE123C",
    brandLight: "#FDA4AF",
    brandSubtle: "#FFF1F2",
    cta: "#16A34A",
    ctaDeep: "#15803D",
    ctaDarkest: "#166534",
    accent: "#D4A72C",
    yellow: "#D4A72C",
    bg: "#FFF7F5",
    bgAlt: "#4C0519"
  },
  orientation: "portrait",
  hero: {
    ...laboralOffer.hero,
    pill: "PARA QUEM VAI SE CONFESSAR",
    headline: "Guia Visual\nda Confissão",
    subline: "Organize o exame e saiba o que dizer ao padre.",
    image: confissaoImage("plano-completo.webp"),
    imageAlt: "Guia Visual da Confissão",
    support: "Use um roteiro visual para preparar o exame de consciência e acompanhar cada etapa da confissão.",
    ctaText: "QUERO O GUIA",
    marqueeText: "GUIA VISUAL ✦ EXAME DE CONSCIÊNCIA ✦ PASSO A PASSO ✦",
    bullets: [
      "Passo a passo para cada etapa",
      "Exame de consciência por áreas",
      "Frases para organizar o que dizer",
      "Orientações após a confissão",
    ]
  },
  socialProof: {
    ...laboralOffer.socialProof,
    title: "VEJA O QUE NOSSOS CLIENTES ESTÃO DIZENDO",
    testimonials: laboralOffer.socialProof.testimonials.slice(0, 5).map((testimonial, index) => ({
      ...testimonial,
      src: confissaoImage(`depoimento-${String(index + 1).padStart(2, "0")}.webp`),
      alt: "Depoimento de cliente do Guia Visual da Confissão"
    }))
  },
  counter: {
    prefix: "+ de",
    target: 25,
    label: "Páginas para preparar a confissão"
  },
  kitCards: {
    ...laboralOffer.kitCards,
    heading: "VEJA O GUIA VISUAL DA CONFISSÃO POR DENTRO",
    images: Array.from({ length: 14 }, (_, index) => ({
      src: confissaoImage(`demonstrativo-${String(index + 1).padStart(2, "0")}.webp`),
      alt: `Página ${index + 1} do Guia Visual da Confissão`
    }))
  },
  benefits: {
    title: "O GUIA VISUAL DA CONFISSÃO POSSUI:",
    ctaText: "QUERO O GUIA",
    items: [
      { icon: "⏱️", title: "Mais clareza", desc: "Abra o guia e saiba exatamente o que dizer, sem gaguejar ou esquecer o que precisa confessar." },
      { icon: "🧭", title: "Mais organização", desc: "Siga o exame de consciência organizado por áreas da vida e não esqueça nada importante." },
      { icon: "🙏", title: "Mais tranquilidade", desc: "Saia do confessionário com a certeza de que fez sua parte da forma correta." },
      { icon: "💙", title: "Mais proximidade com Deus", desc: "Sinta mais leveza e conexão espiritual depois de cada confissão." },
    ]
  },
  urgency: {
    title: "Como se preparar para a confissão?",
    highlight: "",
    body: "Você já sabe que precisa se confessar. Falta um passo a passo pronto para organizar o que dizer e sair em paz.",
    ctaText: "QUERO O GUIA",
    trust: ["ACESSO IMEDIATO", "ACESSO VITALÍCIO"]
  },
  deliverables: {
    ...laboralOffer.deliverables,
    title: "TUDO O QUE VOCÊ VAI RECEBER",
    imageAlt: "Guia Visual da Confissão",
    image: confissaoImage("plano-completo.webp"),
    bullets: [
      "Guia visual completo em PDF",
      "Exame de consciência organizado por áreas da vida",
      "Roteiro do que dizer ao padre",
      "Frases para situações de nervosismo",
      "Orientação para depois da confissão",
      "Resumo visual de bolso",
      "Versão para celular e imprimir",
      "E muito mais…",
    ]
  },
  bonusSection: {
    ...laboralOffer.bonusSection,
    titleLead: "6 BÔNUS",
    titleHighlight: "EXCLUSIVOS",
    subtitle: "No Plano Completo, você recebe materiais extras para se preparar, se confessar e viver com mais profundidade sua vida espiritual.",
    timerText: "BÔNUS DISPONÍVEIS SOMENTE\nNO PLANO COMPLETO"
  },
  bonuses: laboralOffer.bonuses.map((bonus, index) => ({
    ...bonus,
    front: confissaoImage(`bonus-${String(index + 1).padStart(2, "0")}-frente.webp`),
    back: confissaoImage(`bonus-${String(index + 1).padStart(2, "0")}-verso.webp`),
    ...bonuses[index]
  })),
  pricing: {
    titleLead: "ESCOLHA O PLANO",
    titleHighlight: "IDEAL PARA VOCÊ",
    note: "O Guia Visual da Confissão recebe melhorias e correções periódicas. Ao adquirir agora, você garante acesso vitalício.",
    plans: [
      {
        ...laboralOffer.pricing.plans[0],
        title: "Plano Básico",
        image: confissaoImage("plano-basico.webp"),
        imageAlt: "Plano Básico do Guia Visual da Confissão",
        oldPrice: "De R$37,90",
        price: "R$17,90",
        installments: "ou 4x de R$4,48 no cartão",
        items: [
          "Guia Visual da Confissão em PDF",
          "Passo a passo para preparar a confissão",
          "Exame de consciência por áreas da vida",
          "Orientações para cada etapa",
          "Arquivo digital em formato visual",
          "Acesso após a confirmação da compra"
        ],
        mutedItems: ["Não inclui os bônus do Plano Completo"],
        ctaText: "QUERO BÁSICO",
        ctaHref: "https://pay.cakto.com.br/34a7bsf_1018665"
      },
      {
        ...laboralOffer.pricing.plans[1],
        title: "Plano Completo",
        image: confissaoImage("plano-completo.webp"),
        imageAlt: "Plano Completo do Guia Visual da Confissão",
        oldPrice: "De R$199,90",
        price: "R$27,90",
        installments: "ou 6x de R$4,65 no cartão",
        items: [
          "Guia Visual da Confissão em PDF",
          "🎁 Exame de Consciência de Bolso",
          "🎁 40 Perguntas para Preparar a Confissão",
          "🎁 Orações antes e depois da confissão",
          "🎁 Guia visual para a primeira Missa",
          "🎁 Calendário de vida sacramental",
          "🎁 Exame diário de cinco minutos",
          "Acesso digital imediato e vitalício"
        ],
        ctaText: "QUERO COMPLETO",
        ctaHref: "https://pay.cakto.com.br/38cq2d4_1018666"
      },
    ]
  },
  guarantee: {
    ...laboralOffer.guarantee,
    icon: confissaoImage("garantia.webp"),
    iconAlt: "Garantia de 30 dias",
    marqueeText: "GARANTIA 30 DIAS ✦ RISCO ZERO ✦ SATISFAÇÃO OU DINHEIRO DE VOLTA ✦ ",
    title: "Compra 100% segura e garantida!",
    body: "Você tem 30 dias para conhecer o Guia Visual da Confissão. Se ele não atender às suas necessidades, pode solicitar o reembolso dentro desse prazo."
  },
  access: {
    title: "Como receber seu Guia Visual da Confissão",
    steps: [
      { title: "Conclua sua compra", desc: "Após o pagamento, seu acesso é liberado automaticamente." },
      { title: "Receba no email", desc: "As instruções e o link chegam no email cadastrado na compra." },
      { title: "Acesse os PDFs", desc: "Tudo organizado para consultar no celular, tablet ou computador." },
      { title: "Prepare sua confissão", desc: "Siga o passo a passo, use as frases prontas e viva sua confissão com clareza." },
    ],
    ctaText: "ACESSAR AGORA"
  },
  faq: {
    title: "Perguntas Frequentes",
    items: [
      { q: "O que vem no Plano Completo?", a: "Você recebe o Guia Visual e seis bônus: exame de bolso, perguntas para preparar a confissão, orações, guia para a primeira Missa, calendário sacramental e exame diário." },
      { q: "Como recebo o guia?", a: "Após a confirmação da compra, você recebe por email as instruções para acessar os arquivos digitais." },
      { q: "O material é físico ou digital?", a: "O guia e os bônus são digitais, em PDF, para consultar no celular, tablet ou computador." },
      { q: "O guia ajuda a preparar a confissão?", a: "Sim. Ele organiza o exame de consciência e reúne frases para ajudar a acompanhar cada etapa." },
      { q: "Como funciona a garantia?", a: "Você tem 30 dias para solicitar o reembolso, conforme as condições da oferta." }
    ]
  },
  footer: {
    ...laboralOffer.footer,
    showUpdate: false,
    copyright: "© Todos os direitos reservados. Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Fazemos todos os esforços para indicar claramente as informações do produto. Não vendemos seu email ou dados a terceiros. Dúvidas? Fale conosco de Segunda a Sexta, das 09h às 18h.",
    privacyUrl: "/politica-de-privacidade",
    termsUrl: "/termos-de-uso"
    }
}
