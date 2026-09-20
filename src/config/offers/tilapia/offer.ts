import type { OfferConfig } from "@/types/offer"

const image = (name: string) => `/images/tilapia/${name}`

const bonuses = [
  ["25 Ideias de Criadouros Modulares e Expansíveis", "25 Ideias de Criadouros\nModulares e Expansíveis", "Referências visuais para quem pretende começar com uma estrutura menor e deixar possibilidades de crescimento."],
  ["20 Projetos com Filtragem e Reservatório Organizados", "20 Projetos com Filtragem\ne Reservatório", "Configurações mostrando maneiras diferentes de posicionar caixas, reservatório, filtragem, bomba e retorno."],
  ["25 Modelos com Drenagem e Limpeza Facilitadas", "25 Modelos com Drenagem\ne Limpeza", "Modelos com diferentes formas de posicionar drenos, tubulações e acessos aos componentes."],
  ["20 Diagramas Visuais de Circulação da Água", "20 Diagramas Visuais de\nCirculação da Água", "Esquemas simplificados mostrando visualmente diferentes caminhos de entrada, circulação e retorno da água."],
] as const

export const OFFER: OfferConfig = {
  meta: {
    title: "48 Projetos Visuais de Criadouros para Tilápias",
    description: "48 projetos visuais de criadouros para tilápias, organizados por espaço e com tamanhos definidos para você escolher e montar."
  },
  palette: { brand: "#0E7490", brandDeep: "#164E63", brandInk: "#083344", brandDark: "#22A6C3", brandLight: "#A5E3EC", brandSubtle: "#E8F8F8", cta: "#16A34A", ctaDeep: "#11863D", ctaDarkest: "#0E6B31", accent: "#D99922", yellow: "#F4C95D", bg: "#F3FAFA", bgAlt: "#164E63" },
  orientation: "landscape",
  hero: {
    pill: "48 PROJETOS VISUAIS",
    headline: "48 Projetos Visuais\nde Criadouros para Tilápias",
    subline: "Escolha um projeto adequado ao seu espaço.",
    image: image("plano-completo.webp"), imageAlt: "Plano Completo: Projetos de Criadouros para Tilápias",
    support: "Compare estruturas e organize as caixas no espaço disponível antes da montagem.",
    ctaText: "QUERO OS PROJETOS", marqueeText: "48 PROJETOS VISUAIS • PDF • ACESSO IMEDIATO",
    bullets: ["Projetos para vários espaços", "Tamanhos definidos nos projetos", "Organize a estrutura", "Dicas para a montagem"]
  },
  socialProof: {
    title: "Quem já usa os projetos aprova",
    testimonials: Array.from({ length: 7 }, (_, index) => ({ src: image(`depoimento-${String(index + 1).padStart(2, "0")}.webp`), alt: `Depoimento de cliente ${index + 1}` }))
  },
  counter: { prefix: "", target: 48, label: "48 projetos de criadouros" },
  kitCards: {
    heading: "Veja como são os projetos que você vai receber:",
    images: Array.from({ length: 18 }, (_, index) => ({ src: image(`demonstrativo-${String(index + 1).padStart(2, "0")}.webp`), alt: `Projeto visual de criadouro para tilápias ${index + 1}` }))
  },
  benefits: {
    title: "Compare projetos de criadouros para tilápias", ctaText: "QUERO OS PROJETOS",
    items: [
      { icon: "🧰", title: "Praticidade", desc: "São 48 projetos já prontos: escolha o que combina com seu espaço e monte." },
      { icon: "📐", title: "Variedade", desc: "Opções para quintal, terreno, sítio, chácara, corredor e outros espaços." },
      { icon: "👁️", title: "Clareza", desc: "Visualize a estrutura antes de iniciar a montagem." },
      { icon: "💰", title: "Economia", desc: "Compare os tamanhos indicados com as dimensões do seu espaço." },
    ]
  },
  urgency: { title: "Planeje o espaço do seu criadouro", highlight: "", body: "Compare projetos e medidas com seu espaço antes de iniciar a montagem.", ctaText: "QUERO OS PROJETOS", trust: ["ACESSO IMEDIATO", "ACESSO VITALÍCIO"] },
  deliverables: {
    title: "TUDO O QUE VOCÊ VAI RECEBER", image: image("plano-completo.webp"), imageAlt: "Projetos Visuais de Criadouros de Tilápias",
    bullets: ["48 Projetos Visuais de Criadouros de Tilápias", "Projetos para Quintais Pequenos", "Projetos para Terrenos", "Projetos para Sítios e Chácaras", "Projetos para Corredores e Espaços Estreitos", "Projetos para Fundos de Casa", "Projetos para Cantos de Terreno", "Projetos para Áreas Cobertas", "Projetos para Pequenas Áreas Produtivas", "Arquivos em PDF prontos para consulta"]
  },
  bonusSection: { titleLead: "4 BÔNUS", titleHighlight: "EXCLUSIVOS", subtitle: "Além dos 48 Projetos, ao adquirir o Plano Completo você também recebe 4 bônus especiais.", cardLabel: "BÔNUS", timerText: "BÔNUS DISPONÍVEIS SOMENTE\nNO PLANO COMPLETO", freeLabel: "GRÁTIS" },
  bonuses: bonuses.map(([title, titleBreak, desc], index) => ({ front: image(`bonus-${String(index + 1).padStart(2, "0")}-frente.webp`), back: image(`bonus-${String(index + 1).padStart(2, "0")}-verso.webp`), title, titleBreak, desc, price: "R$ 27,00" })),
  pricing: {
    titleLead: "ESCOLHA SEU", titleHighlight: "PROJETO DE CRIADOURO",
    plans: [
      { id: "basic", title: "Plano Básico", image: image("plano-basico.webp"), imageAlt: "Plano Básico de Projetos para Tilápias", featured: false, oldPrice: "de R$ 39,90", price: "R$ 17,90", installments: "ou 2x de R$ 8,95 no cartão", items: ["48 projetos visuais de criadouros", "Opções por tipo de espaço", "Medidas indicadas nos projetos", "Material prático e organizado", "Arquivos digitais em PDF", "Acesso após a compra"], mutedItems: ["Não inclui os bônus do Plano Completo"], ctaText: "QUERO O BÁSICO", ctaHref: "https://pay.hotmart.com/P107251373A?checkoutMode=10&bid=1787257996978" },
      { id: "premium", title: "Plano Completo", image: image("plano-completo.webp"), imageAlt: "Plano Completo de Projetos para Tilápias", featured: true, oldPrice: "de R$ 147,00", price: "R$ 27,90", installments: "ou 3x de R$ 9,30 no cartão", items: ["48 projetos visuais de criadouros", "Categorias para espaços variados", "🎁 25 ideias de criadouros modulares", "🎁 20 projetos com filtragem e reservatório", "🎁 25 modelos com drenagem e limpeza", "🎁 20 diagramas de circulação da água", "Dicas antes da montagem", "Acesso vitalício ao material"], ctaText: "QUERO O COMPLETO", ctaHref: "https://pay.hotmart.com/T107252223S?checkoutMode=10&bid=1787258545238" },
    ]
  },
  guarantee: { marqueeText: "GARANTIA 30 DIAS • RISCO ZERO • SATISFAÇÃO OU DINHEIRO DE VOLTA • ", icon: image("garantia.webp"), iconAlt: "Garantia de 30 dias", title: "COMPRA 100% SEGURA E GARANTIDA!", body: "Você tem **30 dias de garantia** para conhecer os projetos. Caso não fique satisfeito, poderá solicitar o reembolso dentro desse período." },
  access: { title: "Como você vai receber seus projetos", ctaText: "QUERO OS PROJETOS", steps: [{ title: "Conclua sua compra", desc: "Após a confirmação do pagamento, seu acesso é liberado automaticamente." }, { title: "Receba no email", desc: "As instruções para acessar o material chegam diretamente no email cadastrado na compra." }, { title: "Baixe os PDFs", desc: "Os projetos ficam organizados em arquivos digitais, prontos para baixar." }, { title: "Escolha, visualize e monte", desc: "Encontre o tipo de espaço que você tem, escolha o projeto e comece a montar." }] },
  faq: { title: "Perguntas Frequentes", items: [{ q: "O que vem no Plano Completo?", a: "Você recebe 48 projetos visuais e quatro bônus sobre módulos, filtragem e reservatórios, drenagem e limpeza, e circulação da água." }, { q: "Como recebo e consulto os projetos?", a: "Após a confirmação da compra, você recebe o acesso por email. Os arquivos digitais em PDF podem ser consultados em seus dispositivos." }, { q: "Os projetos têm medidas definidas?", a: "Sim. Os modelos trazem tamanhos definidos; compare as medidas com seu espaço antes de montar." }, { q: "Posso consultar os projetos mais de uma vez?", a: "Sim. O acesso vitalício permite consultar os arquivos novamente quando precisar." }, { q: "Como funciona a garantia?", a: "Você tem 30 dias para solicitar o reembolso, conforme as condições da plataforma de pagamento." }] },
  footer: { updateTitle: "Material em constante atualização", updateBody: "Os projetos recebem melhorias e referências novas periodicamente. Ao adquirir agora, você garante acesso vitalício ao material.", copyright: "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.", privacyUrl: "/politica-de-privacidade", termsUrl: "/termos-de-uso" }
}
