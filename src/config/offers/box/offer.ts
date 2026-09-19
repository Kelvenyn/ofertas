import type { OfferConfig } from "@/types/offer"

export const OFFER: OfferConfig = {
  meta: {
    title: "Guia Passo a Passo de Box com Tijolos e Blocos de Vidro",
    description: "Um guia visual para pedreiros montarem box com tijolos e blocos de vidro, do planejamento ao acabamento profissional."
  },
  palette: {
    brand: "#2563EB",
    brandDeep: "#1E3A8A",
    brandInk: "#172554",
    brandDark: "#60A5FA",
    brandLight: "#BFDBFE",
    brandSubtle: "#EFF6FF",
    cta: "#16A34A",
    ctaDeep: "#11863D",
    ctaDarkest: "#0E6B31",
    accent: "#C2410C",
    yellow: "#FBBF24",
    bg: "#F8FAFF",
    bgAlt: "#1E3A8A"
  },
  orientation: "landscape",
  hero: {
    pill: "GUIA VISUAL PASSO A PASSO",
    headline: "Guia Passo a Passo de Box\ncom Tijolos e Blocos de Vidro",
    subline: "Meça, monte e finalize com acabamento profissional",
    image: "/images/box/Plano Completo.webp",
    imageAlt: "Guia Passo a Passo de Box com Tijolos e Blocos de Vidro",
    support: "Tenha em mãos um guia visual para montar diferentes modelos de box com tijolos e blocos de vidro e acompanhar o serviço do início ao acabamento, sem improvisar durante a obra.",
    ctaText: "QUERO O GUIA VISUAL DE BOX",
    marqueeText: "30 Modelos Visuais • Passo a Passo Visual • Acesso Imediato • 15 Modelos com Tijolos • 15 Modelos com Blocos de Vidro • 6 Bônus Práticos • ",
    bullets: [
      "Visualize o box antes de começar",
      "Confira e defina a obra",
      "Faça a obra com um passo a passo",
      "Evite improvisos",
    ]
  },
  socialProof: {
    title: "Pedreiros de todo o Brasil já estão usando o Guia passo a passo",
    testimonials: [
      { src: "/images/box/Depoimento (1).webp", alt: "Depoimento 1" },
      { src: "/images/box/Depoimento (2).webp", alt: "Depoimento 2" },
      { src: "/images/box/Depoimento (3).webp", alt: "Depoimento 3" },
      { src: "/images/box/Depoimento (4).webp", alt: "Depoimento 4" },
      { src: "/images/box/Depoimento (5).webp", alt: "Depoimento 5" },
      { src: "/images/box/Depoimento (6).webp", alt: "Depoimento 6" },
    ]
  },
  counter: {
    prefix: "",
    target: 30,
    label: "Modelos com Tijolos e Blocos de Vidro organizados para você consultar na obra"
  },
  kitCards: {
    heading: "Veja como é o Guia passo a passo que você vai usar nas suas obras: 30 modelos visuais de box com tijolos e blocos de vidro para consultar durante o serviço",
    images: Array.from({ length: 16 }, (_, index) => ({
      src: `/images/box/Imagem (${index + 1}).webp`,
      alt: `Modelo de box com tijolos e blocos de vidro ${index + 1}`
    }))
  },
  benefits: {
    title: "Por que pedreiros estão escolhendo o Guia Passo a Passo de Box?",
    ctaText: "QUERO O GUIA VISUAL DE BOX",
    items: [
      { icon: "🧱", title: "Praticidade", desc: "30 modelos visuais organizados para você encontrar uma referência parecida e consultar direto na obra." },
      { icon: "📋", title: "Organização", desc: "Modelos, materiais, nichos e etapas reunidos em um só lugar." },
      { icon: "✅", title: "Segurança", desc: "Mesmo quando aparecer um modelo que você ainda não fez, você tem uma referência para evitar improvisos durante o serviço." },
      { icon: "📈", title: "Oportunidade", desc: "Tenha uma referência para consultar quando o cliente pedir um modelo que você ainda não fez." },
    ]
  },
  urgency: {
    title: "Tenha mais segurança para pegar serviços de box com um guia passo a passo pronto para consultar",
    highlight: "",
    body: "Enquanto você pensa, outros pedreiros já estão usando o guia e pegando mais serviços de box com tijolo e bloco de vidro.",
    ctaText: "QUERO ACESSAR AGORA",
    trust: ["ACESSO IMEDIATO • MATERIAL DIGITAL"]
  },
  deliverables: {
    title: "TUDO O QUE VOCÊ VAI RECEBER",
    image: "/images/box/Plano Completo.webp",
    imageAlt: "Guia Visual Passo a Passo de Box",
    bullets: [
      "Guia Visual Passo a Passo de Box com Tijolos e Blocos de Vidro",
      "15 modelos com tijolos e alvenaria",
      "15 modelos com blocos de vidro",
      "Projeto, materiais e preparação de cada modelo",
      "Passo a passo visual da montagem do início ao acabamento",
      "Referências de nichos, meia parede, divisórias e diferentes modelos",
      "Material digital visual e fácil de consultar na obra",
    ]
  },
  bonusSection: {
    titleLead: "6 BÔNUS",
    titleHighlight: "EXCLUSIVOS",
    subtitle: "Além do Guia passo a passo, ao adquirir o Plano Completo você também recebe 6 bônus especiais.",
    cardLabel: "BÔNUS",
    timerText: "BÔNUS DISPONÍVEIS SOMENTE\nNO PLANO COMPLETO",
    freeLabel: "GRÁTIS",
  },
  bonuses: [
    { front: "/images/box/bonus-1-frente.webp", back: "/images/box/bonus-1-verso.webp", title: "+10 Modelos de Box para Banheiros Pequenos", titleBreak: "+10 Modelos de Box\npara Banheiros Pequenos", desc: "Referências visuais para escolher modelos que aproveitem melhor espaços compactos sem prejudicar a circulação." },
    { front: "/images/box/bonus-2-frente.webp", back: "/images/box/bonus-2-verso.webp", title: "+12 Projetos de Nichos Integrados ao Box", titleBreak: "+12 Projetos de Nichos\nIntegrados ao Box", desc: "Projetos de nichos internos, externos, verticais, horizontais e combinados para agregar mais função à divisória." },
    { front: "/images/box/bonus-3-frente.webp", back: "/images/box/bonus-3-verso.webp", title: "Guia Visual de Acabamentos de Quinas, Bordas e Encontros", titleBreak: "Guia Visual de\nAcabamentos", desc: "Referências ampliadas para conferir os detalhes que mais aparecem no resultado final do serviço." },
    { front: "/images/box/bonus-4-frente.webp", back: "/images/box/bonus-4-verso.webp", title: "Ficha de Medição do Banheiro", titleBreak: "Ficha de Medição\ndo Banheiro", desc: "Fichas práticas para registrar medidas, posição da divisória, nichos e interferências antes de começar a obra." },
    { front: "/images/box/bonus-5-frente.webp", back: "/images/box/bonus-5-verso.webp", title: "Lista de Materiais por Tipo de Box", titleBreak: "Lista de Materiais\npor Tipo de Box", desc: "Consulte os materiais por tipo de serviço e organize o que precisa estar separado antes de começar." },
    { front: "/images/box/bonus-6-frente.webp", back: "/images/box/bonus-6-verso.webp", title: "Checklist Final Antes de Entregar ao Cliente", titleBreak: "Checklist Final do Box", desc: "Revise alinhamento, nichos, revestimento, quinas, juntas, limpeza e aparência final antes da entrega." },
  ],
  pricing: {
    titleLead: "APROVEITE ENQUANTO",
    titleHighlight: "O PLANO COMPLETO ESTÁ DISPONÍVEL!",
    note: "Pagamento seguro pela Hotmart. Acesso ao material após a confirmação da compra.",
    plans: [
      {
        id: "basic",
        title: "Plano Básico",
        image: "/images/box/Plano Básico.webp",
        imageAlt: "Plano Básico do Guia de Box",
        featured: false,
        oldPrice: "",
        price: "R$ 17,90",
        installments: "Consulte as opções de pagamento no checkout",
        items: ["Guia Visual Passo a Passo de Box com Tijolos e Blocos de Vidro", "15 modelos com tijolos e alvenaria", "15 modelos com blocos de vidro", "Acesso ao material pelo celular, tablet ou computador"],
        mutedItems: ["Não inclui os 6 bônus do Plano Completo"],
        ctaText: "QUERO ESSA OPÇÃO!",
        ctaHref: "https://pay.hotmart.com/O107671809H"
      },
      {
        id: "premium",
        title: "Plano Completo",
        image: "/images/box/Plano Completo.webp",
        imageAlt: "Plano Completo do Guia de Box",
        featured: true,
        oldPrice: "",
        price: "R$ 27,90",
        installments: "Consulte as opções de pagamento no checkout",
        items: ["Guia Visual Passo a Passo de Box com Tijolos e Blocos de Vidro", "🎁 Bônus 01: +10 Modelos de Box para Banheiros Pequenos", "🎁 Bônus 02: +12 Projetos de Nichos Integrados ao Box", "🎁 Bônus 03: Guia Visual de Acabamentos", "🎁 Bônus 04: Ficha de Medição do Banheiro", "🎁 Bônus 05: Lista de Materiais por Tipo de Box", "🎁 Bônus 06: Checklist Final do Box", "Acesso ao material pelo celular, tablet ou computador", "Compra segura"],
        ctaText: "QUERO O PLANO COMPLETO!",
        ctaHref: "https://pay.hotmart.com/U107671878D"
      },
    ]
  },
  guarantee: {
    marqueeText: "GARANTIA 30 DIAS • RISCO ZERO • SATISFAÇÃO OU DINHEIRO DE VOLTA • ",
    icon: "/images/box/garantia-30-dias.webp",
    iconAlt: "Garantia de 30 dias",
    title: "Compra 100% segura e garantida!",
    body: "Você tem **30 dias de garantia** para testar o material. Se não gostar por qualquer motivo, devolvemos 100% do valor. Sem perguntas, sem burocracia."
  },
  access: {
    title: "Como você vai receber seu Guia de Box",
    steps: [
      { title: "Conclua sua compra", desc: "Após o pagamento, seu acesso é liberado automaticamente." },
      { title: "Receba no e-mail", desc: "As instruções chegam diretamente no e-mail cadastrado na compra." },
      { title: "Acesse os materiais", desc: "Tudo organizado em arquivos digitais, prontos para consultar." },
      { title: "Use nas obras", desc: "Consulte pelo celular, tablet ou computador durante o serviço." },
    ]
  },
  faq: {
    title: "Perguntas Frequentes",
    items: [
      { q: "Como vou receber o Guia Passo a Passo de Box?", a: "Você recebe os arquivos digitais por e-mail logo após a confirmação da compra." },
      { q: "O material é físico ou digital?", a: "É 100% digital. Você recebe os arquivos para consultar pelo celular, tablet ou computador durante a obra." },
      { q: "O guia mostra apenas modelos prontos?", a: "Não. O material reúne referências de modelos, materiais, preparação e etapas visuais da montagem até o acabamento." },
      { q: "O que vem no Plano Completo?", a: "O Guia Passo a Passo de Box + 6 bônus: modelos para banheiros pequenos, projetos de nichos, guia de acabamentos, ficha de medição, lista de materiais e checklist final." },
      { q: "E se eu comprar e não gostar?", a: "Você tem 30 dias de garantia. Se não for para você, basta solicitar o reembolso e devolvemos 100% do valor." },
    ]
  },
  footer: {
    updateTitle: "Material em constante atualização",
    updateBody: "O Guia Passo a Passo de Box pode receber novos modelos e referências periodicamente. Ao adquirir, você garante acesso ao material e às atualizações futuras que forem disponibilizadas.",
    copyright: "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.",
    privacyUrl: "/politica-de-privacidade",
    termsUrl: "/termos-de-uso"
    }
}
