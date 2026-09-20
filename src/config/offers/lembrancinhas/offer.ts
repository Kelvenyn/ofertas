import type { OfferConfig } from '@/types/offer'

export const OFFER: OfferConfig = {
  meta: {
    title: "Lembrancinhas Cristãs: +60 modelos prontos para encontros",
    description: "+60 modelos de lembrancinhas cristãs em PDF A4, organizados por temas e prontos para imprimir e entregar em seus encontros."
  },
  palette: {
    brand: "#9D3A58", brandDeep: "#5C1E34", brandInk: "#35101D", brandDark: "#C35C7D", brandLight: "#F0C4D1", brandSubtle: "#FFF0F4",
    cta: "#16A34A", ctaDeep: "#11863D", ctaDarkest: "#0E6B31", accent: "#C78C5C", yellow: "#E5B96B", bg: "#FFF7F8", bgAlt: "#5C1E34"
  },
  orientation: "portrait",
  hero: {
    pill: "PARA LÍDERES DE MULHERES",
    headline: "+60 Lembrancinhas Cristãs para encontros especiais",
    subline: "Para cultos, chás e encontros de mulheres na igreja.",
    image: "/images/lembrancinhas/plano-completo.webp", imageAlt: "Kit Encontros Especiais com Lembrancinhas Cristãs",
    support: "Escolha entre mais de 60 modelos por tema, imprima e use quando precisar.",
    ctaText: "VER LEMBRANCINHAS", marqueeText: "+60 MODELOS ✦ PDF A4 ✦ PRONTOS PARA IMPRIMIR ✦ ACESSO IMEDIATO",
    bullets: ["Mais de 60 modelos por tema", "Para encontros de mulheres", "Arquivos digitais em PDF", "Modelos prontos para imprimir"]
  },
  socialProof: {
    title: "Veja o que outras mulheres estão falando",
    testimonials: [
      { src: "/images/lembrancinhas/depoimento-01.webp", alt: "Depoimento 1" },
      { src: "/images/lembrancinhas/depoimento-02.webp", alt: "Depoimento 2" },
      { src: "/images/lembrancinhas/depoimento-03.webp", alt: "Depoimento 3" },
      { src: "/images/lembrancinhas/depoimento-04.webp", alt: "Depoimento 4" },
      { src: "/images/lembrancinhas/depoimento-05.webp", alt: "Depoimento 5" },
      { src: "/images/lembrancinhas/depoimento-06.webp", alt: "Depoimento 6" },
      { src: "/images/lembrancinhas/depoimento-07.webp", alt: "Depoimento 7" },
    ]
  },
  counter: { prefix: "+ de", target: 60, label: "Modelos de lembrancinhas cristãs" },
  kitCards: {
    heading: "Veja os modelos de lembrancinhas",
    images: Array.from({ length: 14 }, (_, index) => ({ src: `/images/lembrancinhas/demonstrativo-${String(index + 1).padStart(2, "0")}.webp`, alt: `Lembrancinha Cristã ${index + 1}` }))
  },
  benefits: {
    title: "Para facilitar seus próximos encontros", ctaText: "VER LEMBRANCINHAS",
    items: [
      { icon: "💡", title: "Tenha sempre uma ideia pronta", desc: "Não precisa mais procurar na internet toda vez que precisar de uma lembrancinha." },
      { icon: "🗂️", title: "Escolha de acordo com o tema", desc: "Fé, Gratidão, Propósito, Espírito Santo, Cura e várias outras opções." },
      { icon: "🖨️", title: "Prepare de forma simples", desc: "Escolha o modelo, imprima e monte quantas lembrancinhas precisar." },
      { icon: "💝", title: "Entregue algo com significado", desc: "Um pequeno mimo que ajuda a demonstrar o carinho colocado na preparação daquele encontro." },
    ]
  },
  urgency: {
    title: "Já pensou no que entregar no próximo encontro?", highlight: "",
    body: "Escolha uma lembrancinha diferente e cheia de significado para o próximo encontro.",
    ctaText: "VER LEMBRANCINHAS", trust: ["ACESSO IMEDIATO", "ACESSO VITALÍCIO"]
  },
  deliverables: {
    title: "Tudo o que você vai receber", image: "/images/lembrancinhas/plano-completo.webp", imageAlt: "Kit Encontros Especiais com Lembrancinhas Cristãs",
    bullets: ["+60 Modelos de Lembrancinhas Cristãs", "Lembrancinhas de Cura", "Lembrancinhas do Espírito Santo", "Lembrancinhas de Fé", "Lembrancinhas dos Apóstolos", "Lembrancinhas de Gratidão", "Lembrancinhas de Propósito", "Lembrancinhas descontraídas e muito mais", "Arquivos em PDF prontos para impressão (A4)"]
  },
  bonusSection: {
    titleLead: "4 BÔNUS", titleHighlight: "EXCLUSIVOS", subtitle: "No Kit Encontros Especiais, você também recebe quatro bônus.",
    cardLabel: "BÔNUS", timerText: "BÔNUS INCLUSOS\nPOR TEMPO LIMITADO", freeLabel: "GRÁTIS"
  },
  bonuses: [
    { front: "/images/lembrancinhas/bonus-01-frente.webp", back: "/images/lembrancinhas/bonus-01-verso.webp", title: "Vídeos Aulas de Montagem das Lembrancinhas", titleBreak: "Vídeos Aulas de Montagem\ndas Lembrancinhas", desc: "Aulas em vídeo com orientações passo a passo para montagem, impressão, recorte e finalização de cada lembrancinha.", price: "R$ 19,90" },
    { front: "/images/lembrancinhas/bonus-02-frente.webp", back: "/images/lembrancinhas/bonus-02-verso.webp", title: "Lembrancinhas Dinâmicas", titleBreak: "Lembrancinhas\nDinâmicas", desc: "Modelos pensados para ir além da entrega e trazer interação, reflexão e participação durante os encontros.", price: "R$ 29,90" },
    { front: "/images/lembrancinhas/bonus-03-frente.webp", back: "/images/lembrancinhas/bonus-03-verso.webp", title: "20 Tags Cristãs para Mimos", titleBreak: "20 Tags Cristãs\npara Mimos", desc: "20 tags para imprimir com mensagens cristãs para chocolates, doces e pequenos presentes.", price: "R$ 19,90" },
    { front: "/images/lembrancinhas/bonus-04-frente.webp", back: "/images/lembrancinhas/bonus-04-verso.webp", title: "32 Marcadores Bíblicos para Presentear nos Encontros", titleBreak: "32 Marcadores Bíblicos\npara Presentear nos Encontros", desc: "32 marcadores bíblicos para presentear, usar junto à Bíblia ou incluir nas lembrancinhas.", price: "R$ 29,90" },
  ],
  pricing: {
    titleLead: "ESCOLHA SEU", titleHighlight: "KIT DE LEMBRANCINHAS",
    plans: [
      { id: "kit-encontros-especiais", label: "OFERTA ESPECIAL", title: "Kit Encontros Especiais", image: "/images/lembrancinhas/plano-completo.webp", imageAlt: "Kit Encontros Especiais", featured: true, oldPrice: "de R$ 162,30", price: "R$ 27,90", installments: "ou 4x de R$ 6,97 no cartão", items: ["Mais de 60 lembrancinhas cristãs", "Temas de fé, gratidão, propósito e outros", "🎁 Aulas em vídeo para montagem", "🎁 Lembrancinhas dinâmicas", "🎁 20 tags cristãs para mimos", "🎁 32 marcadores bíblicos", "PDF A4 pronto para imprimir", "Envio por email e acesso vitalício"], ctaText: "QUERO AS LEMBRANCINHAS", ctaHref: "https://pay.cakto.com.br/37nb8vz" },
    ]
  },
  guarantee: {
    marqueeText: "GARANTIA 30 DIAS • RISCO ZERO • SATISFAÇÃO OU DINHEIRO DE VOLTA • ", icon: "/images/lembrancinhas/garantia.webp", iconAlt: "Garantia de 30 dias", title: "Compra 100% segura e garantida!", body: "Você conta com **30 dias de garantia**. Caso não fique satisfeita, poderá solicitar o reembolso dentro desse período."
  },
  access: {
    title: "Como receber suas lembrancinhas",
    steps: [
      { title: "Conclua sua compra", desc: "Após a confirmação do pagamento, seu acesso é liberado automaticamente." },
      { title: "Receba no email", desc: "As instruções para acessar o material chegam diretamente no email cadastrado na compra." },
      { title: "Baixe os PDFs", desc: "Os modelos ficam organizados em arquivos digitais, prontos para baixar." },
      { title: "Escolha, imprima e entregue", desc: "Escolha um tema, imprima os modelos e monte as lembrancinhas." },
    ]
  },
  faq: {
    title: "Perguntas Frequentes",
    items: [
      { q: "O que vem no Kit Encontros Especiais?", a: "São mais de 60 modelos cristãos e quatro bônus: aulas em vídeo, lembrancinhas dinâmicas, 20 tags e 32 marcadores bíblicos." },
      { q: "Como recebo os arquivos?", a: "Após a confirmação da compra, você recebe por email as instruções para acessar e baixar os arquivos." },
      { q: "O material é físico ou digital?", a: "O material é digital, em PDF A4. Nenhum item físico é enviado; você imprime onde preferir." },
      { q: "Preciso editar os modelos?", a: "Não. Os modelos estão prontos para impressão. Escolha, imprima e siga as instruções de montagem quando necessário." },
      { q: "Como funciona a garantia?", a: "Você tem 30 dias para solicitar o reembolso, conforme as condições da plataforma de pagamento." }
    ]
  },
  footer: {
    updateTitle: "Material em constante atualização", updateBody: "As Lembrancinhas Cristãs recebem novos modelos periodicamente. Ao adquirir agora, você garante acesso vitalício e todas as atualizações futuras.",
    copyright: "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.", privacyUrl: "/politica-de-privacidade", termsUrl: "/termos-de-uso" }
}
