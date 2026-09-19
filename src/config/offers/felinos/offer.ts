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
    pill: "MAPA DOS COMPORTAMENTOS FELINOS", headline: "Mapa dos Comportamentos Felinos\npara tutores que querem entender melhor seus gatos", subline: "Entenda os sinais, saiba como agir e fortaleça o vínculo com seu gato",
    image: "/images/felinos/Plano Completo.webp", imageAlt: "Mapa dos Comportamentos Felinos",
    support: "Tenha em mãos um mapa visual para entender o que os comportamentos do seu gato podem estar comunicando, reconhecer sinais de bem-estar e saber como responder em cada situação, sem ficar tentando adivinhar o que ele quer dizer.",
    ctaText: "QUERO O MAPA", marqueeText: "COMPORTAMENTOS FELINOS • SIGNIFICADOS E CONTEXTOS • ACESSO IMEDIATO • ",
    bullets: ["Entender o que seu gato está comunicando", "Reconhecer sinais de felicidade e bem-estar", "Identificar demonstrações de carinho e confiança", "Saber como agir diante de cada comportamento"]
  },
  socialProof: {
    title: "Tutores de Gatos de todo o Brasil já usam e aprovam",
    testimonials: [
      { src: "/images/felinos/Depoimento (1).webp", alt: "Depoimento de tutor de gato 1" },
      { src: "/images/felinos/Depoimento (2).webp", alt: "Depoimento de tutor de gato 2" },
      { src: "/images/felinos/Depoimento (3).webp", alt: "Depoimento de tutor de gato 3" },
      { src: "/images/felinos/Depoimento (4).webp", alt: "Depoimento de tutor de gato 4" },
      { src: "/images/felinos/Depoimento (5).webp", alt: "Depoimento de tutor de gato 5" },
      { src: "/images/felinos/Depoimento (6).webp", alt: "Depoimento de tutor de gato 6" },
    ]
  },
  counter: { prefix: "+ de", target: 30, label: "Comportamentos Felinos organizados\npara você entender seu gato" },
  kitCards: { heading: "Veja como é o mapa que você vai usar:", images: Array.from({ length: 10 }, (_, index) => ({ src: `/images/felinos/Imagem (${index + 1}).webp`, alt: `Página ${index + 1} do Mapa dos Comportamentos Felinos` })) },
  benefits: {
    title: "Por que tutores de gatos estão usando o Mapa dos Comportamentos Felinos?", ctaText: "QUERO O MAPA",
    items: [
      { icon: "🧠", title: "Clareza", desc: "Em vez de ficar tentando adivinhar, você aprende a reconhecer sinais, comportamentos e contextos com muito mais clareza." },
      { icon: "🎯", title: "Direcionamento", desc: "Você não entende apenas o que o comportamento pode significar — também descobre o que observar e como agir de forma mais adequada." },
      { icon: "✅", title: "Segurança", desc: "Mordida, rabo mexendo, esconderijo, lambida ou aproximação deixam de ser sinais soltos e passam a ser analisados junto do corpo e do contexto." },
      { icon: "🤝", title: "Conexão", desc: "Quanto mais você entende a forma dele se comunicar, mais fácil fica respeitar limites, reconhecer conforto e fortalecer a convivência entre vocês." },
    ]
  },
  urgency: { title: "Pare de ficar tentando adivinhar o que seu gato quer dizer", highlight: "", body: "Enquanto você tenta interpretar sozinho cada mordida, olhar, movimento do rabo ou mudança de comportamento, o Mapa dos Comportamentos Felinos te ajuda a observar os sinais com mais clareza e saber como responder.", ctaText: "QUERO O MAPA", trust: ["ACESSO IMEDIATO • ACESSO VITALÍCIO"] },
  deliverables: { title: "TUDO O QUE VOCÊ VAI RECEBER", image: "/images/felinos/Plano Completo.webp", imageAlt: "Mapa dos Comportamentos Felinos", bullets: ["Mapa dos Comportamentos Felinos completo", "30 sinais e comportamentos felinos explicados", "Sinais de carinho, confiança, conforto e limites", "Leitura de olhos, orelhas, rabo e postura corporal", "Orientação simples de como agir em cada situação", "O que observar no corpo e no contexto antes de interpretar", "Material visual e fácil de consultar", "Entrega imediata por e-mail"] },
  bonusSection: { titleLead: "6 BÔNUS", titleHighlight: "EXCLUSIVOS", subtitle: "Além do Mapa dos Comportamentos Felinos, ao adquirir o Plano Completo você também recebe 6 bônus especiais.", cardLabel: "BÔNUS", timerText: "BÔNUS DISPONÍVEIS SOMENTE\nNO PLANO COMPLETO", freeLabel: "GRÁTIS" },
  bonuses: [
    { front: "/images/felinos/bonus-1-frente.webp", back: "/images/felinos/bonus-1-verso.webp", title: "Fichas Visuais do Rabo Felino", titleBreak: "Fichas Visuais\ndo Rabo Felino", desc: "Fichas visuais para identificar posições e movimentos do rabo, entender o que podem indicar e o que observar antes de interpretar.", price: "R$ 12,90" },
    { front: "/images/felinos/bonus-2-frente.webp", back: "/images/felinos/bonus-2-verso.webp", title: "Sinais de Carinho e Confiança", titleBreak: "Sinais de Carinho\ne Confiança", desc: "Um guia visual para reconhecer carinho, confiança e proximidade, entender o contexto de cada sinal e evitar conclusões apressadas.", price: "R$ 12,90" },
    { front: "/images/felinos/bonus-3-frente.webp", back: "/images/felinos/bonus-3-verso.webp", title: "Guia das Mordidas Felinas", titleBreak: "Guia das\nMordidas Felinas", desc: "Um guia prático para diferenciar mordidas de brincadeira, limite, medo ou desconforto e entender como responder em cada situação.", price: "R$ 19,90" },
    { front: "/images/felinos/bonus-4-frente.webp", back: "/images/felinos/bonus-4-verso.webp", title: "25 Ideias de Brincadeiras", titleBreak: "25 Ideias de\nBrincadeiras", desc: "25 brincadeiras simples para estimular caça, curiosidade e movimento, com instruções práticas para variar a rotina do seu gato.", price: "R$ 24,90" },
    { front: "/images/felinos/bonus-5-frente.webp", back: "/images/felinos/bonus-5-verso.webp", title: "Manual do Cantinho Ideal", titleBreak: "Manual do\nCantinho Ideal", desc: "Um manual visual para organizar descanso, refúgio, altura e observação, criando um ambiente mais seguro e confortável para o gato.", price: "R$ 19,90" },
    { front: "/images/felinos/bonus-6-frente.webp", back: "/images/felinos/bonus-6-verso.webp", title: "Checklist de Mudanças no Comportamento", titleBreak: "Checklist de Mudanças\nno Comportamento", desc: "Um checklist prático para registrar alimentação, descanso e interação, acompanhar mudanças no comportamento e não depender apenas da memória.", price: "R$ 12,90" },
  ],
  pricing: {
    titleLead: "APROVEITE ENQUANTO", titleHighlight: "O PLANO COMPLETO ESTÁ EM PROMOÇÃO!",
    plans: [
      { id: "basic", title: "Plano Básico", image: "/images/felinos/Plano Básico.webp", imageAlt: "Plano Básico — Mapa dos Comportamentos Felinos", featured: false, oldPrice: "de R$ 39,90", price: "R$ 17,90", installments: "ou 4x de R$ 4,47 no cartão", items: ["Mapa dos Comportamentos Felinos completo", "+ de 30 sinais e comportamentos organizados", "Explicação prática e orientação de como responder", "Material visual e fácil de consultar"], mutedItems: ["Não inclui os bônus do Plano Completo"], ctaText: "QUERO O MAPA", ctaHref: "https://pay.hotmart.com/W107428182W" },
      { id: "premium", title: "Plano Completo", image: "/images/felinos/Plano Completo.webp", imageAlt: "Plano Completo — Mapa dos Comportamentos Felinos", featured: true, oldPrice: "de R$ 147,00", price: "R$ 27,90", installments: "ou 4x de R$ 6,97 no cartão", items: ["Mapa dos Comportamentos Felinos completo", "🎁 Bônus 01: Fichas Visuais do Rabo Felino", "🎁 Bônus 02: Sinais de Carinho e Confiança", "🎁 Bônus 03: Guia das Mordidas Felinas", "🎁 Bônus 04: 25 Ideias de Brincadeiras", "🎁 Bônus 05: Manual do Cantinho Ideal", "🎁 Bônus 06: Checklist de Mudanças no Comportamento", "Material visual e fácil de consultar", "Acesso ao conteúdo pelo celular, tablet ou computador", "Compra segura"], ctaText: "QUERO O MAPA", ctaHref: "https://pay.hotmart.com/A107428242E" },
    ]
  },
  guarantee: { marqueeText: "GARANTIA 30 DIAS • RISCO ZERO • SATISFAÇÃO OU DINHEIRO DE VOLTA • ", icon: "/images/felinos/garantia-30-dias.webp", iconAlt: "Garantia de 30 dias", title: "Compra 100% segura e garantida!", body: "Você tem **30 dias de garantia** para testar o material. Se não gostar por qualquer motivo, devolvemos 100% do valor. Sem perguntas, sem burocracia." },
  access: { title: "Como você vai receber seu Mapa dos Comportamentos Felinos", steps: [{ title: "Conclua sua compra", desc: "Após o pagamento, seu acesso é liberado automaticamente." }, { title: "Receba no e-mail", desc: "As instruções chegam diretamente no e-mail cadastrado na compra." }, { title: "Acesse os materiais", desc: "Tudo organizado em formato digital, pronto para consultar." }, { title: "Entenda seu gato", desc: "Consulte pelo celular, tablet ou computador sempre que perceber algum comportamento e quiser entender melhor o que ele pode estar comunicando." }] },
  faq: { title: "Perguntas Frequentes", items: [
    { q: "Como vou receber o Mapa dos Comportamentos Felinos?", a: "Após a confirmação do pagamento, você receberá as instruções de acesso no e-mail cadastrado na compra." },
    { q: "O material é físico ou digital?", a: "O material é 100% digital e entregue em formato de eBook." },
    { q: "Preciso entender de comportamento felino?", a: "Não. O mapa foi organizado para ser simples e fácil de consultar. Você encontra o comportamento, entende o que ele pode significar, observa os outros sinais e vê como agir." },
    { q: "Um comportamento sozinho mostra exatamente o que meu gato está sentindo?", a: "Não. O mapa ajuda você a interpretar os comportamentos considerando também o contexto e os outros sinais apresentados pelo gato. Por isso, cada comportamento mostra o que pode significar, o que observar junto e como agir." },
    { q: "O que vem no Plano Completo?", a: "Além do Mapa dos Comportamentos Felinos, você também recebe os 6 bônus especiais: Fichas Visuais do Rabo Felino, Sinais de Carinho e Confiança do Seu Gato, Guia das Mordidas Felinas, 25 Ideias de Brincadeiras para Entreter Seu Gato, Manual Prático do Cantinho Ideal para o Gato e Checklist de Mudanças no Comportamento." },
    { q: "E se eu comprar e não gostar?", a: "Você tem 30 dias de garantia. Se não for para você, basta solicitar o reembolso e devolvemos 100% do valor." },
  ] },
  footer: { updateTitle: "", updateBody: "", showUpdate: false, copyright: "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.", privacyUrl: "/politica-de-privacidade", termsUrl: "/termos-de-uso" }
}
