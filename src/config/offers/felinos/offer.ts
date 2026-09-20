import type { OfferConfig } from "@/types/offer"

export const OFFER: OfferConfig = {
  meta: {
    title: "Mapa dos Comportamentos Felinos para Tutores",
    description: "Um mapa visual e prático para entender os comportamentos do seu gato, o que eles podem significar e como agir em cada situação."
  },
  palette: {
    brand: "#D97706", brandDeep: "#9A3412", brandInk: "#431407", brandDark: "#F59E0B", brandLight: "#FCD34D", brandSubtle: "#FFF7ED",
    cta: "#16A34A", ctaDeep: "#11863D", ctaDarkest: "#0E6B31", accent: "#EA580C", yellow: "#FDE047", bg: "#FFFBEB", bgAlt: "#FED7AA"
  },
  orientation: "landscape",
  hero: {
    pill: "MAPA DO COMPORTAMENTO FELINO", headline: "Comportamentos Felinos para\nentender melhor seu gato", subline: "Entenda os sinais, saiba como agir e fortaleça o vínculo com seu gato",
    image: "/images/felinos/plano-completo.webp", imageAlt: "Mapa dos Comportamentos Felinos",
    support: "Use um mapa visual para reconhecer sinais de conforto, observar o contexto e escolher como responder ao comportamento do seu gato.",
    ctaText: "QUERO O MAPA", marqueeText: "COMPORTAMENTOS FELINOS • SIGNIFICADOS E CONTEXTOS • ACESSO IMEDIATO • ",
    bullets: ["Entenda os sinais do seu gato", "Reconheça sinais de conforto", "Identifique sinais de carinho", "Saiba como agir em cada situação"]
  },
  socialProof: {
    title: "Tutores de gatos já usam o mapa",
    testimonials: [
      { src: "/images/felinos/depoimento-01.webp", alt: "Depoimento de tutor de gato 1" },
      { src: "/images/felinos/depoimento-02.webp", alt: "Depoimento de tutor de gato 2" },
      { src: "/images/felinos/depoimento-03.webp", alt: "Depoimento de tutor de gato 3" },
      { src: "/images/felinos/depoimento-04.webp", alt: "Depoimento de tutor de gato 4" },
      { src: "/images/felinos/depoimento-05.webp", alt: "Depoimento de tutor de gato 5" },
      { src: "/images/felinos/depoimento-06.webp", alt: "Depoimento de tutor de gato 6" },
    ]
  },
  counter: { prefix: "+ de", target: 30, label: "Sinais felinos para entender seu gato" },
  kitCards: { heading: "Veja como é o mapa que você vai usar:", images: Array.from({ length: 10 }, (_, index) => ({ src: `/images/felinos/demonstrativo-${String(index + 1).padStart(2, "0")}.webp`, alt: `Página ${index + 1} do Mapa dos Comportamentos Felinos` })) },
  benefits: {
    title: "Entenda os sinais do seu gato", ctaText: "QUERO O MAPA",
    items: [
      { icon: "🧠", title: "Clareza", desc: "Reconheça sinais e contextos para interpretar melhor o comportamento." },
      { icon: "🎯", title: "Direcionamento", desc: "Veja o que observar e como responder a cada situação." },
      { icon: "✅", title: "Segurança", desc: "Relacione mordidas, rabo, esconderijo e aproximação ao contexto." },
      { icon: "🤝", title: "Conexão", desc: "Entenda sinais e respeite limites para fortalecer a convivência." },
    ]
  },
  urgency: { title: "Pare de ficar tentando adivinhar o que seu gato quer dizer", highlight: "", body: "Observe mordidas, olhares, movimentos do rabo e mudanças no comportamento com apoio do mapa.", ctaText: "QUERO O MAPA", trust: ["ACESSO IMEDIATO", "ACESSO VITALÍCIO"] },
  deliverables: { title: "TUDO O QUE VOCÊ VAI RECEBER", image: "/images/felinos/plano-completo.webp", imageAlt: "Mapa dos Comportamentos Felinos", bullets: ["Mapa dos Comportamentos Felinos completo", "30 sinais e comportamentos felinos explicados", "Sinais de carinho, confiança, conforto e limites", "Leitura de olhos, orelhas, rabo e postura corporal", "Orientação simples de como agir em cada situação", "O que observar no corpo e no contexto antes de interpretar", "Material visual e fácil de consultar", "Entrega imediata por email"] },
  bonusSection: { titleLead: "6 BÔNUS", titleHighlight: "EXCLUSIVOS", subtitle: "Além do Mapa dos Comportamentos Felinos, ao adquirir o Plano Completo você também recebe 6 bônus especiais.", cardLabel: "BÔNUS", timerText: "BÔNUS DISPONÍVEIS SOMENTE\nNO PLANO COMPLETO", freeLabel: "GRÁTIS" },
  bonuses: [
    { front: "/images/felinos/bonus-01-frente.webp", back: "/images/felinos/bonus-01-verso.webp", title: "Fichas Visuais do Rabo Felino", titleBreak: "Fichas Visuais\ndo Rabo Felino", desc: "Identifique posições do rabo e observe o contexto antes de interpretar.", price: "R$ 12,90" },
    { front: "/images/felinos/bonus-02-frente.webp", back: "/images/felinos/bonus-02-verso.webp", title: "Sinais de Carinho e Confiança", titleBreak: "Sinais de Carinho\ne Confiança", desc: "Reconheça sinais de carinho e confiança considerando o contexto.", price: "R$ 12,90" },
    { front: "/images/felinos/bonus-03-frente.webp", back: "/images/felinos/bonus-03-verso.webp", title: "Guia das Mordidas Felinas", titleBreak: "Guia das\nMordidas Felinas", desc: "Diferencie mordidas de brincadeira, medo ou desconforto e veja como responder.", price: "R$ 19,90" },
    { front: "/images/felinos/bonus-04-frente.webp", back: "/images/felinos/bonus-04-verso.webp", title: "25 Ideias de Brincadeiras", titleBreak: "25 Ideias de\nBrincadeiras", desc: "25 brincadeiras para estimular caça, curiosidade e movimento.", price: "R$ 24,90" },
    { front: "/images/felinos/bonus-05-frente.webp", back: "/images/felinos/bonus-05-verso.webp", title: "Manual do Cantinho Ideal", titleBreak: "Manual do\nCantinho Ideal", desc: "Organize descanso, refúgio e altura para deixar o ambiente confortável.", price: "R$ 19,90" },
    { front: "/images/felinos/bonus-06-frente.webp", back: "/images/felinos/bonus-06-verso.webp", title: "Checklist de Mudanças no Comportamento", titleBreak: "Checklist de Mudanças\nno Comportamento", desc: "Registre alimentação, descanso e interação para acompanhar mudanças.", price: "R$ 12,90" },
  ],
  pricing: {
    titleLead: "ESCOLHA O PLANO", titleHighlight: "PARA SEU GATO",
    plans: [
      { id: "basic", title: "Plano Básico", image: "/images/felinos/plano-basico.webp", imageAlt: "Plano Básico do Mapa dos Comportamentos Felinos", featured: false, oldPrice: "de R$ 39,90", price: "R$ 17,90", installments: "ou 4x de R$ 4,47 no cartão", items: ["Mapa dos Comportamentos Felinos", "Mais de 30 sinais organizados", "Possíveis significados dos sinais", "O que observar no contexto", "Como responder a cada situação", "Material visual para consulta"], mutedItems: ["Não inclui os bônus do Plano Completo"], ctaText: "QUERO O MAPA", ctaHref: "https://pay.hotmart.com/W107428182W" },
      { id: "premium", title: "Plano Completo", image: "/images/felinos/plano-completo.webp", imageAlt: "Plano Completo do Mapa dos Comportamentos Felinos", featured: true, oldPrice: "de R$ 147,00", price: "R$ 27,90", installments: "ou 4x de R$ 6,97 no cartão", items: ["Mapa dos Comportamentos Felinos", "🎁 Fichas visuais do rabo felino", "🎁 Sinais de carinho e confiança", "🎁 Guia das mordidas felinas", "🎁 25 ideias de brincadeiras", "🎁 Manual do cantinho ideal", "🎁 Checklist de mudanças no comportamento", "Acesso pelo celular, tablet ou computador"], ctaText: "QUERO O MAPA", ctaHref: "https://pay.hotmart.com/A107428242E" },
    ]
  },
  guarantee: { marqueeText: "GARANTIA 30 DIAS • RISCO ZERO • SATISFAÇÃO OU DINHEIRO DE VOLTA • ", icon: "/images/felinos/garantia.webp", iconAlt: "Garantia de 30 dias", title: "Compra 100% segura e garantida!", body: "Você tem **30 dias de garantia** para testar o material. Se não gostar por qualquer motivo, devolvemos 100% do valor. Sem perguntas, sem burocracia." },
  access: { title: "Como receber o Mapa de Comportamentos Felinos", steps: [{ title: "Conclua sua compra", desc: "Após o pagamento, seu acesso é liberado automaticamente." }, { title: "Receba no email", desc: "As instruções chegam diretamente no email cadastrado na compra." }, { title: "Acesse os materiais", desc: "Tudo organizado em formato digital, pronto para consultar." }, { title: "Entenda seu gato", desc: "Consulte o mapa quando quiser entender um comportamento do seu gato." }] },
  faq: { title: "Perguntas Frequentes", items: [
    { q: "O que vem no Plano Completo?", a: "O mapa e seis bônus: fichas do rabo, sinais de carinho, guia das mordidas, brincadeiras, cantinho ideal e checklist de mudanças." },
    { q: "Como recebo e consulto o material?", a: "Após a confirmação, as instruções chegam por email. O material digital pode ser consultado no celular, tablet ou computador." },
    { q: "Preciso entender de comportamento felino?", a: "Não. O mapa organiza possíveis significados, o que observar junto e como agir." },
    { q: "Um comportamento sozinho mostra o que meu gato sente?", a: "Não. Observe o contexto e os outros sinais; o mapa apresenta possibilidades, não uma conclusão isolada." },
    { q: "E se eu comprar e não gostar?", a: "Você tem 30 dias de garantia. Se não for para você, pode solicitar o reembolso dentro desse prazo." }
  ] },
  footer: { updateTitle: "", updateBody: "", showUpdate: false, copyright: "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.", privacyUrl: "/politica-de-privacidade", termsUrl: "/termos-de-uso" }
}
