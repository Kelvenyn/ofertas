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
    description: "48 projetos visuais de criadouros para tilápias, organizados por espaço e com tamanhos definidos para você escolher e montar.",
  },
  palette: { brand: "#0E7490", brandDeep: "#164E63", brandInk: "#083344", brandDark: "#22A6C3", brandLight: "#A5E3EC", brandSubtle: "#E8F8F8", cta: "#16A34A", ctaDeep: "#11863D", ctaDarkest: "#0E6B31", accent: "#D99922", yellow: "#F4C95D", bg: "#F3FAFA", bgAlt: "#164E63" },
  hero: {
    pill: "48 PROJETOS VISUAIS",
    titleLine1: "48 Projetos Visuais",
    titleLine2: "de Criadouros para Tilápias",
    titleLine3: "Com os tamanhos certos para você escolher e montar",
    image: image("Plano Completo.webp"), imageAlt: "Plano Completo: Projetos de Criadouros para Tilápias", imageWidth: 1080, imageHeight: 1080,
    subtitle: "Tenha em mãos 48 Projetos Visuais de Criadouros de Tilápias, escolha o que combina com o espaço que você tem e organize seu criadouro sem adivinhar medida ou testar por tentativa e erro.",
    ctaText: "QUERO OS PROJETOS", timerLabel: "OFERTA ENCERRA EM",
    marqueeText: "48 PROJETOS ✦ PDF ALTA QUALIDADE ✦ ACESSO IMEDIATO ✦ TAMANHOS JÁ DEFINIDOS ✦ ",
    marqueeGradient: "linear-gradient(90deg, #164E63 0%, #0E7490 45%, #22A6C3 72%, #164E63 100%)",
    bullets: ["Projetos para todos os tipos de espaço", "Tamanhos já definidos", "Clareza para organizar cada estrutura", "Dicas para evitar erros na montagem", "Acesso imediato após a compra"],
  },
  socialProof: {
    title: "Quem já usa os projetos aprova",
    testimonials: Array.from({ length: 7 }, (_, index) => ({ src: image(`Depoimento (${index + 1}).webp`), alt: `Depoimento de cliente ${index + 1}`, gradient: "linear-gradient(90deg, #0E7490, #164E63)" })),
  },
  counter: { prefix: "", target: 48, label: "Projetos visuais de criadouros\npara você escolher e montar" },
  kitCards: {
    heading1: "Veja como são os projetos que você vai receber:",
    images: Array.from({ length: 18 }, (_, index) => ({ src: image(`Imagem (${index + 1}).webp`), alt: `Projeto visual de criadouro para tilápias ${index + 1}`, width: 2000, height: 1414 })),
    displayAspect: "auto",
  },
  benefits: {
    title: "Por que quem quer criar tilápia está escolhendo os Projetos?", ctaText: "QUERO OS PROJETOS",
    items: [
      { icon: "🧰", title: "Praticidade", desc: "São 48 projetos já prontos: escolha o que combina com seu espaço e monte." },
      { icon: "📐", title: "Variedade", desc: "Cada tipo de espaço já tem seus projetos: quintal pequeno, terreno, sítio, chácara, corredor e mais." },
      { icon: "👁️", title: "Clareza", desc: "Visualize exatamente como vai ficar sua estrutura antes de montar, sem depender de tentativa e erro." },
      { icon: "💰", title: "Economia", desc: "Com os tamanhos certos definidos, você evita gastar com material que não serve para o seu espaço." },
    ],
  },
  urgency: { pill: "ACESSO IMEDIATO", title: "QUANTAS VEZES VOCÊ QUIS COMEÇAR A CRIAR TILÁPIA, MAS NÃO SABIA COMO ORGANIZAR O ESPAÇO QUE TINHA?", highlight: "", body: "Imagine escolher um projeto, visualizar exatamente como o seu criadouro vai ficar e montar tudo sem medo de errar a medida.", ctaText: "QUERO OS PROJETOS", trust: ["ACESSO IMEDIATO • ACESSO VITALÍCIO"] },
  deliverables: {
    pill: "⚡ ACESSO IMEDIATO", title: "TUDO O QUE VOCÊ VAI RECEBER", titleHighlight: "", image: image("Plano Completo.webp"), imageAlt: "Projetos Visuais de Criadouros de Tilápias",
    bullets: ["48 Projetos Visuais de Criadouros de Tilápias", "Projetos para Quintais Pequenos", "Projetos para Terrenos", "Projetos para Sítios e Chácaras", "Projetos para Corredores e Espaços Estreitos", "Projetos para Fundos de Casa", "Projetos para Cantos de Terreno", "Projetos para Áreas Cobertas", "Projetos para Pequenas Áreas Produtivas", "Arquivos em PDF prontos para consulta"],
  },
  bonusSection: { pill: "EXTRA INCLUÍDO", titleLead: "4 BÔNUS", titleHighlight: "EXCLUSIVOS", subtitle: "Além dos 48 Projetos, ao adquirir o Plano Completo você também recebe 4 bônus especiais.", cardLabel: "BÔNUS", touchHint: "Toque na imagem acima para ver o conteúdo.", backHint: "Toque para voltar", timerText: "BÔNUS DISPONÍVEIS SOMENTE\nNO PLANO COMPLETO", freeLabel: "GRÁTIS", cardImageAspect: "landscape" },
  bonuses: bonuses.map(([title, titleBreak, desc], index) => ({ front: image(`bonus-${index + 1}-frente.webp`), back: image(`bonus-${index + 1}-verso.webp`), title, titleBreak, desc, price: "R$ 27,00" })),
  pricing: {
    titleLead: "ESCOLHA O", titleHighlight: "PLANO IDEAL PARA VOCÊ",
    plans: [
      { id: "basic", title: "Plano Básico", image: image("Plano Básico.webp"), imageAlt: "Plano Básico de Projetos para Tilápias", featured: false, oldPrice: "de R$ 39,90", price: "R$ 17,90", installments: "ou 2x de R$ 8,95 no cartão", items: ["48 Projetos Visuais de Criadouros de Tilápias", "Material prático e organizado", "Arquivos em PDF prontos para consulta"], mutedItems: ["Não inclui os bônus do Plano Completo"], ctaText: "QUERO O PLANO BÁSICO", ctaHref: "https://pay.hotmart.com/P107251373A?checkoutMode=10&bid=1787257996978" },
      { id: "premium", title: "Plano Completo", image: image("Plano Completo.webp"), imageAlt: "Plano Completo de Projetos para Tilápias", featured: true, oldPrice: "de R$ 147,00", price: "R$ 27,90", installments: "ou 3x de R$ 9,30 no cartão", items: ["48 Projetos Visuais de Criadouros de Tilápias", "Categorias: Quintais, Terrenos, Sítios/Chácaras, Corredores, Fundos de Casa, Cantos de Terreno, Áreas Cobertas e Pequenas Áreas Produtivas", ...bonuses.map(([title]) => `🎁 ${title}`), "Dicas antes da montagem", "Arquivos em PDF prontos para consulta", "Envio imediato por e-mail", "Acesso vitalício ao material"], ctaText: "QUERO O PLANO COMPLETO", ctaHref: "https://pay.hotmart.com/T107252223S?checkoutMode=10&bid=1787258545238" },
    ],
  },
  guarantee: { marqueeText: "GARANTIA 30 DIAS • RISCO ZERO • SATISFAÇÃO OU DINHEIRO DE VOLTA • ", marqueeGradient: "linear-gradient(90deg, #164E63 0%, #0E7490 45%, #22A6C3 72%, #164E63 100%)", icon: image("garantia-30-dias.webp"), iconAlt: "Garantia de 30 dias", title: "COMPRA 100% SEGURA E GARANTIDA!", body: "Você tem **30 dias de garantia** para conhecer os projetos. Caso não fique satisfeito, poderá solicitar o reembolso dentro desse período." },
  access: { title: "Como você vai receber seus projetos", ctaText: "QUERO OS PROJETOS", steps: [{ num: "01", title: "Conclua sua compra", desc: "Após a confirmação do pagamento, seu acesso é liberado automaticamente." }, { num: "02", title: "Receba no e-mail", desc: "As instruções para acessar o material chegam diretamente no e-mail cadastrado na compra." }, { num: "03", title: "Baixe os PDFs", desc: "Os projetos ficam organizados em arquivos digitais, prontos para baixar." }, { num: "04", title: "Escolha, visualize e monte", desc: "Encontre o tipo de espaço que você tem, escolha o projeto e comece a montar." }] },
  faq: { title: "Perguntas Frequentes", items: [{ q: "Como vou receber meus projetos?", a: "Após a confirmação da compra, você receberá no e-mail cadastrado as instruções para acessar e baixar todos os arquivos." }, { q: "Os projetos são físicos ou digitais?", a: "O material é 100% digital. Nenhum produto físico será enviado para sua casa. Você recebe os arquivos em PDF e pode consultar de onde preferir." }, { q: "Preciso de experiência prévia para usar os projetos?", a: "Não. Os projetos já vêm prontos, com medidas definidas e organizados por tipo de espaço. Basta escolher o que combina com o seu." }, { q: "Os projetos servem para qualquer tipo de espaço?", a: "Sim. Os 48 projetos foram organizados para atender quintais pequenos, terrenos, sítios, chácaras, corredores, fundos de casa, cantos de terreno e áreas cobertas." }, { q: "O que vem no Plano Completo?", a: "Você recebe os 48 Projetos Visuais de Criadouros de Tilápias e os 4 bônus: Criadouros Modulares e Expansíveis, Filtragem e Reservatório Organizados, Drenagem e Limpeza Facilitadas e Diagramas de Circulação da Água." }, { q: "Posso consultar os projetos mais de uma vez?", a: "Sim. Você pode acessar os arquivos sempre que precisar, inclusive para planejar futuras expansões do seu criadouro." }, { q: "E se eu comprar e não gostar?", a: "Você conta com 30 dias de garantia. Caso não fique satisfeito, poderá solicitar o reembolso dentro desse período." }] },
  footer: { updateTitle: "Material em constante atualização", updateBody: "Os projetos recebem melhorias e referências novas periodicamente. Ao adquirir agora, você garante acesso vitalício ao material.", copyright: "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.", missionText: "Organize seu criadouro de tilápias com mais clareza, segurança e sem tentativa e erro.", privacyUrl: "/politica-de-privacidade", termsUrl: "/termos-de-uso", privacyLabel: "Política de Privacidade", termsLabel: "Termos de Uso" },
}
