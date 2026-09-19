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
    headline: "+60 Lembrancinhas Cristãs\npara Deixar Seus Encontros Ainda Mais Especiais",
    subline: "Para você que cuida da organização dos cultos, chás, reuniões e encontros de mulheres da sua igreja.",
    image: "/images/lembrancinhas/Plano Completo.webp", imageAlt: "Kit Encontros Especiais com Lembrancinhas Cristãs",
    support: "Em vez de procurar uma nova ideia toda vez, tenha +60 modelos organizados por temas para escolher, imprimir e usar quando precisar.",
    ctaText: "QUERO AS LEMBRANCINHAS", marqueeText: "+60 MODELOS ✦ PDF A4, ALTA QUALIDADE ✦ ACESSO IMEDIATO ✦ PRONTAS PARA IMPRIMIR ✦ ",
    bullets: ["+60 modelos organizados por temas", "Para todos os tipos de encontros", "Material em PDF de alta qualidade", "Economia de tempo e criatividade"]
  },
  socialProof: {
    title: "Veja o que outras mulheres estão falando",
    testimonials: [
      { src: "/images/lembrancinhas/Depoimento (1).webp", alt: "Depoimento 1" },
      { src: "/images/lembrancinhas/Depoimento (2).webp", alt: "Depoimento 2" },
      { src: "/images/lembrancinhas/Depoimento (3).webp", alt: "Depoimento 3" },
      { src: "/images/lembrancinhas/Depoimento (4).webp", alt: "Depoimento 4" },
      { src: "/images/lembrancinhas/Depoimento (5).webp", alt: "Depoimento 5" },
      { src: "/images/lembrancinhas/Depoimento (6).webp", alt: "Depoimento 6" },
      { src: "/images/lembrancinhas/Depoimento (7).webp", alt: "Depoimento 7" },
    ]
  },
  counter: { prefix: "+ de", target: 60, label: "Modelos de Lembrancinhas Cristãs" },
  kitCards: {
    heading: "Veja como são os modelos que você vai receber:",
    images: Array.from({ length: 14 }, (_, index) => ({ src: `/images/lembrancinhas/Imagem (${index + 1}).webp`, alt: `Lembrancinha Cristã ${index + 1}` }))
  },
  benefits: {
    title: "Para facilitar seus próximos encontros", ctaText: "QUERO TER AS LEMBRANCINHAS",
    items: [
      { icon: "💡", title: "Tenha sempre uma ideia pronta", desc: "Não precisa mais procurar na internet toda vez que precisar de uma lembrancinha." },
      { icon: "🗂️", title: "Escolha de acordo com o tema", desc: "Fé, Gratidão, Propósito, Espírito Santo, Cura e várias outras opções." },
      { icon: "🖨️", title: "Prepare de forma simples", desc: "Escolha o modelo, imprima e monte quantas lembrancinhas precisar." },
      { icon: "💝", title: "Entregue algo com significado", desc: "Um pequeno mimo que ajuda a demonstrar o carinho colocado na preparação daquele encontro." },
    ]
  },
  urgency: {
    title: "Já ficou pensando: “O que vamos entregar dessa vez?”", highlight: "",
    body: "Imagine a reação das pessoas ao receberem algo diferente. Em cada encontro, você pode entregar uma lembrancinha linda e cheia de significado.",
    ctaText: "QUERO AS LEMBRANCINHAS", trust: ["ACESSO IMEDIATO • ACESSO VITALÍCIO"]
  },
  deliverables: {
    title: "Tudo o que você vai receber", image: "/images/lembrancinhas/Plano Completo.webp", imageAlt: "Kit Encontros Especiais com Lembrancinhas Cristãs",
    bullets: ["+60 Modelos de Lembrancinhas Cristãs", "Lembrancinhas de Cura", "Lembrancinhas do Espírito Santo", "Lembrancinhas de Fé", "Lembrancinhas dos Apóstolos", "Lembrancinhas de Gratidão", "Lembrancinhas de Propósito", "Lembrancinhas descontraídas e muito mais", "Arquivos em PDF prontos para impressão (A4)"]
  },
  bonusSection: {
    titleLead: "4 BÔNUS", titleHighlight: "EXCLUSIVOS", subtitle: "Além dos +60 modelos, você também recebe 4 bônus especiais.",
    cardLabel: "BÔNUS", timerText: "BÔNUS INCLUSOS\nPOR TEMPO LIMITADO", freeLabel: "GRÁTIS"
  },
  bonuses: [
    { front: "/images/lembrancinhas/bonus-1-frente.webp", back: "/images/lembrancinhas/bonus-1-verso.webp", title: "Vídeos Aulas de Montagem das Lembrancinhas", titleBreak: "Vídeos Aulas de Montagem\ndas Lembrancinhas", desc: "Aulas em vídeo com orientações passo a passo para montagem, impressão, recorte e finalização de cada lembrancinha.", price: "R$ 19,90" },
    { front: "/images/lembrancinhas/bonus-2-frente.webp", back: "/images/lembrancinhas/bonus-2-verso.webp", title: "Lembrancinhas Dinâmicas", titleBreak: "Lembrancinhas\nDinâmicas", desc: "Modelos pensados para ir além da entrega e trazer interação, reflexão e participação durante os encontros.", price: "R$ 29,90" },
    { front: "/images/lembrancinhas/bonus-3-frente.webp", back: "/images/lembrancinhas/bonus-3-verso.webp", title: "20 Tags Cristãs para Mimos", titleBreak: "20 Tags Cristãs\npara Mimos", desc: "Uma coleção com 20 tags prontas para imprimir, com mensagens cristãs para acompanhar chocolates, doces, saquinhos e pequenos presentes.", price: "R$ 19,90" },
    { front: "/images/lembrancinhas/bonus-4-frente.webp", back: "/images/lembrancinhas/bonus-4-verso.webp", title: "32 Marcadores Bíblicos para Presentear nos Encontros", titleBreak: "32 Marcadores Bíblicos\npara Presentear nos Encontros", desc: "Receba 32 modelos de marcadores bíblicos para presentear nos encontros, usar junto à Bíblia ou acrescentar a uma lembrancinha.", price: "R$ 29,90" },
  ],
  pricing: {
    titleLead: "APROVEITE ENQUANTO", titleHighlight: "OS BÔNUS ESTÃO INCLUSOS!",
    plans: [
      { id: "kit-encontros-especiais", label: "OFERTA ESPECIAL", title: "Kit Encontros Especiais", image: "/images/lembrancinhas/Plano Completo.webp", imageAlt: "Kit Encontros Especiais", featured: true, oldPrice: "de R$ 162,30", price: "R$ 27,90", installments: "ou 4x de R$ 6,97 no cartão", items: ["+60 Modelos de Lembrancinhas Cristãs", "Temas: Cura, Espírito Santo, Fé, Apóstolos, Gratidão, Propósito, Descontraídas, Oração, Motivação e Delicadas", "🎁 Bônus 01: Vídeos Aulas de Montagem das Lembrancinhas", "🎁 Bônus 02: Lembrancinhas Dinâmicas", "🎁 Bônus 03: 20 Tags Cristãs para Mimos", "🎁 Bônus 04: 32 Marcadores Bíblicos para Presentear nos Encontros", "Arquivos em PDF prontos para impressão (A4)", "Envio imediato por e-mail e acesso vitalício"], ctaText: "QUERO AS LEMBRANCINHAS", ctaHref: "https://pay.cakto.com.br/37nb8vz" },
    ]
  },
  guarantee: {
    marqueeText: "GARANTIA 30 DIAS • RISCO ZERO • SATISFAÇÃO OU DINHEIRO DE VOLTA • ", icon: "/images/lembrancinhas/garantia-30-dias.webp", iconAlt: "Garantia de 30 dias", title: "Compra 100% segura e garantida!", body: "Você conta com **30 dias de garantia**. Caso não fique satisfeita, poderá solicitar o reembolso dentro desse período."
  },
  access: {
    title: "Como você vai receber suas lembrancinhas",
    steps: [
      { title: "Conclua sua compra", desc: "Após a confirmação do pagamento, seu acesso é liberado automaticamente." },
      { title: "Receba no e-mail", desc: "As instruções para acessar o material chegam diretamente no e-mail cadastrado na compra." },
      { title: "Baixe os PDFs", desc: "Os modelos ficam organizados em arquivos digitais, prontos para baixar." },
      { title: "Escolha, imprima e entregue", desc: "Encontre o tema do seu encontro, escolha a lembrancinha e prepare quantas unidades precisar." },
    ]
  },
  faq: {
    title: "Perguntas Frequentes",
    items: [
      { q: "Como vou receber as lembrancinhas?", a: "Após a confirmação da compra, você receberá no e-mail cadastrado as instruções para acessar e baixar todos os arquivos." },
      { q: "As lembrancinhas são físicas ou digitais?", a: "O material é 100% digital. Nenhum produto físico será enviado para sua casa: você recebe os arquivos em PDF e imprime onde preferir." },
      { q: "Preciso editar alguma coisa?", a: "Não. Os modelos já são entregues prontos para impressão. Basta escolher, imprimir e seguir as orientações de montagem quando necessário." },
      { q: "O que vem no Kit Encontros Especiais?", a: "Você recebe os +60 modelos de Lembrancinhas Cristãs e os 4 bônus inclusos: Vídeos Aulas de Montagem das Lembrancinhas, Lembrancinhas Dinâmicas, 20 Tags Cristãs para Mimos e 32 Marcadores Bíblicos para Presentear nos Encontros." },
      { q: "Quais temas de lembrancinhas estão disponíveis?", a: "Você encontrará opções para temas como Fé, Gratidão, Propósito, Espírito Santo, Cura, Apóstolos, Oração, Motivação, além de modelos delicados e descontraídos." },
      { q: "E se eu comprar e não gostar?", a: "Você conta com 30 dias de garantia. Caso não fique satisfeita, poderá solicitar o reembolso dentro desse período." },
    ]
  },
  footer: {
    updateTitle: "Material em constante atualização", updateBody: "As Lembrancinhas Cristãs recebem novos modelos periodicamente. Ao adquirir agora, você garante acesso vitalício e todas as atualizações futuras.",
    copyright: "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.", privacyUrl: "/politica-de-privacidade", termsUrl: "/termos-de-uso" }
}
