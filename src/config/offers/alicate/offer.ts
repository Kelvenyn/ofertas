import type { OfferConfig } from "@/types/offer"

const image = (name: string) => `/images/alicate/${name}`

const bonusDetails = [
  ["Mapa Visual de Defeitos em Alicates", "Mapa Visual de\nDefeitos em Alicates", "Um guia visual para reconhecer rapidamente os defeitos mais comuns em alicates de cutícula e saber onde observar antes de mexer na peça.", "R$ 19,90"],
  ["Checklist de Inspeção Antes da Amolação", "Checklist de Inspeção\nAntes da Amolação", "Um checklist rápido para conferir fio, alinhamento, fechamento, desgaste e danos antes de começar o serviço.", "R$ 19,90"],
  ["Guia de Organização da Bancada do Afiador", "Guia de Organização\nda Bancada", "Um guia visual para organizar ferramentas, materiais e itens de uso frequente de forma mais prática na bancada.", "R$ 19,90"],
  ["30 Sintomas Mais Comuns", "30 Sintomas\nMais Comuns", "Um guia para começar pelo que a peça está fazendo e reconhecer rapidamente qual situação merece ser investigada.", "R$ 24,90"],
  ["Guia Visual de Testes de Corte", "Guia Visual de\nTestes de Corte", "Um material para conferir o resultado final de alicates, tesouras e facas antes de devolver a peça ao cliente.", "R$ 19,90"],
  ["Rota Rápida da Bancada", "Rota Rápida\nda Bancada", "Um mapa visual para acompanhar o serviço do começo ao fim sem pular etapas: receber, avaliar, corrigir, amolar e testar.", "R$ 24,90"],
] as const

export const OFFER: OfferConfig = {
  meta: {
    title: "Manual Prático de Diagnóstico e Conserto para Amolar Alicate, Tesoura e Faca",
    description: "Um manual visual para identificar problemas, corrigir falhas e amolar alicates, tesouras e facas do jeito certo."
  },
  palette: {
    brand: "#B45309", brandDeep: "#78350F", brandInk: "#3B1A0B", brandDark: "#D97706", brandLight: "#FCD34D", brandSubtle: "#FFF7ED",
    cta: "#16A34A", ctaDeep: "#15803D", ctaDarkest: "#14532D", accent: "#EA580C", yellow: "#FBBF24", bg: "#FFF9F5", bgAlt: "#7C2D12"
  },
  orientation: "portrait",
  hero: {
    pill: "MANUAL PRÁTICO DE BANCADA",
    headline: "Diagnóstico e Conserto de\nAlicates, Tesouras e Facas",
    subline: "Identifique, corrija e amole do jeito certo",
    image: image("plano-completo.webp"), imageAlt: "Manual Prático de Diagnóstico e Conserto",
    support: "Consulte um material visual para entender o que observar, corrigir, amolar e testar antes de devolver a peça.",
    ctaText: "QUERO O MANUAL", marqueeText: "30 DIAGNÓSTICOS • ALICATES • TESOURAS • FACAS • ACESSO IMEDIATO • ",
    bullets: ["Diagnostique antes de amolar", "Veja exatamente onde observar", "Corrija com mais segurança", "Teste antes de devolver ao cliente"]
  },
  socialProof: {
    title: "Quem amola peças já usa o manual",
    testimonials: Array.from({ length: 6 }, (_, index) => ({ src: image(`depoimento-${String(index + 1).padStart(2, "0")}.webp`), alt: `Depoimento ${index + 1}` }))
  },
  counter: { prefix: "", target: 30, label: "Diagnósticos de alicates, tesouras e facas" },
  kitCards: {
    heading: "Consulte o manual na bancada",
    images: Array.from({ length: 16 }, (_, index) => ({ src: image(`demonstrativo-${String(index + 1).padStart(2, "0")}.webp`), alt: `Página ${index + 1} do Manual Prático` }))
  },
  benefits: {
    title: "O manual prático vai te trazer mais:", ctaText: "QUERO O MANUAL",
    image: image("beneficio.webp"), imageAlt: "Profissional usando o Manual Prático na bancada de amolação",
    items: [
      { icon: "🔍", title: "Clareza", desc: "Você bate o olho na peça e já tem um caminho mais claro de onde começar a observar." },
      { icon: "🎯", title: "Direcionamento", desc: "Entende melhor se precisa corrigir alguma coisa antes ou se já é hora de amolar." },
      { icon: "📋", title: "Organização", desc: "Problemas organizados por peça para consulta rápida." },
      { icon: "✅", title: "Segurança", desc: "Reduza tentativas antes de devolver a peça ao cliente." },
    ]
  },
  urgency: {
    title: "A peça ainda fica ruim após amolar?", highlight: "",
    body: "Consulte o que observar antes de mexer na peça e aproveite a condição especial por tempo limitado.",
    ctaText: "QUERO O MANUAL", trust: ["ACESSO IMEDIATO", "MATERIAL DIGITAL"]
  },
  deliverables: {
    title: "TUDO O QUE VOCÊ VAI RECEBER", image: image("plano-completo.webp"), imageAlt: "Manual Prático de Diagnóstico e Conserto",
    bullets: ["Manual para diagnosticar e consertar alicate, tesoura e faca", "30 problemas organizados entre alicates, tesouras e facas", "Diagnóstico visual para saber onde está a falha", "Passo a passo de correção para cada problema", "Orientação para saber quando corrigir e quando amolar", "Testes finais para conferir se a peça ficou boa", "Material visual e fácil de consultar na bancada"]
  },
  bonusSection: {
    titleLead: "6 BÔNUS", titleHighlight: "EXCLUSIVOS",
    subtitle: "Além do manual, o Plano Completo inclui 6 materiais extras para apoiar a amolação.",
    cardLabel: "BÔNUS", timerText: "BÔNUS DISPONÍVEIS SOMENTE\nNO PLANO COMPLETO", freeLabel: "GRÁTIS"
  },
  bonuses: bonusDetails.map(([title, titleBreak, desc, price], index) => {
    const number = String(index + 1).padStart(2, "0")
    return { front: image(`bonus-${String(number).padStart(2, "0")}-frente.webp`), back: image(`bonus-${String(number).padStart(2, "0")}-verso.webp`), title, titleBreak, desc, price }
  }),
  pricing: {
    titleLead: "ESCOLHA SEU PLANO E", titleHighlight: "ACESSE O MANUAL",
    note: "Compra segura pela Hotmart.",
    plans: [
      { id: "basic", title: "Plano Básico", image: image("plano-basico.webp"), imageAlt: "Plano Básico do Manual Prático", featured: false, oldPrice: "de R$ 39,90", price: "R$ 17,90", installments: "ou 4x de R$ 4,47 no cartão", items: ["Manual Prático de Diagnóstico e Conserto", "30 diagnósticos de alicates, tesouras e facas", "Material visual para consulta na bancada", "Orientação para corrigir e amolar", "Testes para conferir o resultado", "Acesso digital"], mutedItems: ["Não inclui os 6 bônus do Plano Completo"], ctaText: "QUERO ESTA OPÇÃO", ctaHref: "https://pay.hotmart.com/W107532528W?checkoutMode=10" },
      { id: "premium", title: "Plano Completo", image: image("plano-completo.webp"), imageAlt: "Plano Completo do Manual Prático", featured: true, oldPrice: "de R$ 147,00", price: "R$ 27,90", installments: "ou 4x de R$ 6,97 no cartão", items: ["Manual Prático de Diagnóstico e Conserto", ...bonusDetails.map(([title], index) => `🎁 Bônus ${index + 1}: ${title}`), "Material digital para consultar na bancada"], ctaText: "QUERO COMPLETO", ctaHref: "https://pay.hotmart.com/I107532617C?checkoutMode=10" },
    ]
  },
  guarantee: {
    marqueeText: "GARANTIA 30 DIAS • RISCO ZERO • COMPRA SEGURA • ", icon: image("garantia.webp"), iconAlt: "Garantia de 30 dias", title: "Compra segura e garantida!", body: "Você terá 30 dias de garantia para conhecer o material. Se ele não fizer sentido para sua rotina, poderá solicitar o reembolso dentro desse período."
  },
  access: { title: "Como você vai receber seu Manual Prático", steps: [
    { title: "Conclua sua compra", desc: "Escolha seu plano e finalize o pagamento." },
    { title: "Receba no email", desc: "As instruções de acesso chegam no email cadastrado na compra." },
    { title: "Abra o material", desc: "Acesse os arquivos pelo celular, tablet ou computador." },
    { title: "Consulte na bancada", desc: "Use o manual sempre que precisar diagnosticar, corrigir, amolar ou testar uma peça." },
  ] },
  faq: { title: "Perguntas Frequentes", items: [
    { q: "Como vou receber o Manual Prático?", a: "Após a confirmação da compra, você recebe as instruções de acesso no email cadastrado." },
    { q: "O material é físico ou digital?", a: "O material é 100% digital. Você pode consultar pelo celular, tablet ou computador e também imprimir para deixar na bancada." },
    { q: "O manual serve para quais peças?", a: "O conteúdo reúne diagnósticos para alicates, tesouras e facas, organizados para facilitar a consulta." },
    { q: "O que vem no Plano Completo?", a: "O Manual Prático mais 6 bônus: Mapa de Defeitos, Checklist de Inspeção, Guia da Bancada, 30 Sintomas, Guia de Testes e Rota Rápida da Bancada." },
    { q: "E se eu comprar e não gostar?", a: "Você terá 30 dias de garantia para conhecer o material e poderá solicitar o reembolso dentro desse prazo." },
  ] },
  footer: {
    updateTitle: "Material em constante atualização", updateBody: "O Manual Prático pode receber novos diagnósticos e referências. Ao adquirir, você acompanha as atualizações incluídas no material.", showUpdate: true,
    copyright: "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.",
    privacyUrl: "/politica-de-privacidade", termsUrl: "/termos-de-uso" }
}
