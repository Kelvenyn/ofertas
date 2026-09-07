import type { OfferConfig } from "@/types/offer"

const image = (name: string) => `/images/lavanderia/${name}`

export const OFFER: OfferConfig = {
  meta: {
    title: "50 Projetos de Áreas de Serviço Pequenas",
    description: "50 projetos visuais para comparar ideias e aproveitar melhor cada canto da sua área de serviço.",
  },
  palette: {
    brand: "#0F766E", brandDeep: "#115E59", brandInk: "#16302B", brandDark: "#2BAA9A", brandLight: "#8BD5CA", brandSubtle: "#E6F5F2",
    cta: "#C2410C", ctaDeep: "#9A3412", ctaDarkest: "#7C2D12", accent: "#D97706", yellow: "#F4B942", bg: "#FAFCFB", bgAlt: "#115E59",
  },
  hero: {
    pill: "50 PROJETOS VISUAIS",
    titleLine1: "50 Projetos de Áreas de Serviço Pequenas",
    titleLine2: "Com varal, armários e espaço para lavanderia",
    titleLine3: "",
    image: image("Plano Completo.webp"), imageAlt: "50 Projetos de Áreas de Serviço Pequenas", imageWidth: 1080, imageHeight: 1080,
    subtitle: "Tenha em mãos 50 projetos visuais para comparar ideias e descobrir como aproveitar melhor cada canto da sua área de serviço, mesmo com pouco espaço.",
    ctaText: "QUERO VER OS 50 PROJETOS", timerLabel: "BÔNUS ENCERRAM EM",
    marqueeText: "50 PROJETOS VISUAIS ✦ ACESSO IMEDIATO ✦ VARAIS E ARMÁRIOS ✦ IDEIAS PARA POUCO ESPAÇO ✦ 6 BÔNUS EXCLUSIVOS ✦ ",
    marqueeGradient: "linear-gradient(90deg, #115E59 0%, #0F766E 45%, #2BAA9A 72%, #115E59 100%)",
    bullets: ["Visualizar o que realmente pode caber", "Aproveitar melhor cada canto", "Organizar sem deixar tudo apertado", "Encontrar ideias de varal e armários", "Preservar espaço para circular"],
  },
  socialProof: {
    title: "Mulheres de todo o Brasil já usam e aprovam",
    testimonials: Array.from({ length: 6 }, (_, index) => ({ src: image(`Depoimento (${index + 1}).webp`), alt: `Depoimento sobre os projetos de áreas de serviço ${index + 1}`, gradient: "linear-gradient(90deg, #115E59, #0F766E)" })),
  },
  counter: { prefix: "+ de", target: 50, label: "Projetos visuais para comparar\ne adaptar à sua lavanderia" },
  kitCards: {
    heading1: "Veja como são os projetos que você vai ter em mãos:",
    images: Array.from({ length: 16 }, (_, index) => ({ src: image(`Imagem (${index + 1}).webp`), alt: `Projeto ${index + 1} de área de serviço pequena`, width: 2000, height: 1414 })),
  },
  benefits: {
    title: "Por que mulheres com áreas de serviço pequenas estão escolhendo os 50 Projetos?", ctaText: "QUERO VER OS 50 PROJETOS",
    items: [
      { icon: "📐", title: "Visualização", desc: "Veja diferentes configurações prontas e entenda melhor o que pode funcionar no espaço que você tem." },
      { icon: "🧩", title: "Aproveitamento", desc: "Descubra formas de usar paredes, cantos, alturas e pequenos vãos sem deixar a lavanderia ainda mais apertada." },
      { icon: "🧺", title: "Organização", desc: "Encontre referências para distribuir máquina, tanque, varal, armários e áreas de apoio de forma mais funcional." },
      { icon: "✅", title: "Clareza", desc: "Compare possibilidades antes de decidir o que comprar, instalar ou adaptar na sua área de serviço." },
    ],
  },
  urgency: {
    pill: "OPORTUNIDADE ÚNICA", title: "Aproveite melhor sua lavanderia com projetos visuais prontos para usar", highlight: "",
    body: "Enquanto você pensa em como organizar o espaço, outras mulheres já estão usando as referências para visualizar possibilidades, comparar configurações e decidir com mais clareza. O preço promocional não dura para sempre.",
    ctaText: "QUERO VER OS 50 PROJETOS", trust: ["ACESSO IMEDIATO", "MATERIAL DIGITAL"],
  },
  deliverables: {
    pill: "ACESSO IMEDIATO", title: "TUDO O QUE VOCÊ VAI RECEBER", titleHighlight: "", image: image("Plano Completo.webp"), imageAlt: "Plano Completo — Projetos de Áreas de Serviço Pequenas",
    bullets: ["Projetos Prontos de Áreas de Serviço Pequenas", "50 modelos visuais organizados para comparar", "Ideias de varal, armários, bancada e armazenamento", "Medidas ilustrativas para ajudar na visualização", "Material digital para consultar pelo celular, tablet ou computador", "Referências visuais fáceis de comparar e adaptar", "Entrega imediata por e-mail"],
  },
  bonusSection: { pill: "EXTRA INCLUÍDO", titleLead: "6 BÔNUS", titleHighlight: "EXCLUSIVOS", subtitle: "Além dos 50 Projetos de Áreas de Serviço Pequenas, ao adquirir o Plano Completo você também recebe 6 bônus especiais.", cardLabel: "BÔNUS", touchHint: "Toque na imagem acima para ver o conteúdo.", backHint: "Toque para voltar", timerText: "BÔNUS DISPONÍVEL NO PLANO COMPLETO", freeLabel: "GRÁTIS", cardImageAspect: "portrait" },
  bonuses: [
    ["25 Ideias de Varal para Pouco Espaço", "Soluções visuais para secar roupas sem deixar o varal dominar sua área de serviço.", "R$ 19,90"],
    ["20 Ideias de Armários para Áreas de Serviço Pequenas", "Referências para guardar produtos, utensílios e roupas sem deixar os armários ocuparem toda a lavanderia.", "R$ 19,90"],
    ["Manual da Organização da Área de Serviço", "Um passo a passo visual para decidir o que guardar, onde colocar cada coisa e como manter a lavanderia organizada no dia a dia.", "R$ 17,90"],
    ["Checklist da Área de Serviço Funcional", "Um diagnóstico visual para conferir espaço, circulação, armazenamento, varal e rotina e descobrir o que melhorar primeiro.", "R$ 14,90"],
    ["Guia para Aproveitar Espaços Vazios", "Um guia visual para encontrar centímetros esquecidos e transformá-los em apoio, armazenamento e organização.", "R$ 19,90"],
    ["20 Referências de Bancadas para Áreas de Serviço", "Soluções visuais para criar apoio, dobrar roupas e organizar a rotina sem deixar a bancada ocupar espaço demais.", "R$ 19,90"],
  ].map(([title, desc, price], index) => ({ front: image(`bonus-${index + 1}-frente.webp`), back: image(`bonus-${index + 1}-verso.webp`), title, titleBreak: title.replace(" para ", " para\n"), desc, price })),
  pricing: {
    titleLead: "APROVEITE ENQUANTO", titleHighlight: "O PLANO COMPLETO ESTÁ EM PROMOÇÃO!", note: "Os links de compra serão liberados em breve.",
    plans: [
      { id: "basic", title: "Plano Básico", image: image("Plano Básico.webp"), imageAlt: "Plano Básico — Projetos de Áreas de Serviço Pequenas", featured: false, oldPrice: "de R$ 39,90", price: "R$ 17,90", installments: "ou 4x de R$ 4,47 no cartão", items: ["50 Projetos de Áreas de Serviço Pequenas", "Arquivo digital em formato visual e prático", "Acesso imediato após a confirmação da compra", "Material para consultar pelo celular, tablet ou computador"], mutedItems: ["Não inclui os bônus do Plano Completo"], ctaText: "QUERO ESSA OPÇÃO!", ctaDisabled: true },
      { id: "premium", title: "Plano Completo", image: image("Plano Completo.webp"), imageAlt: "Plano Completo — Projetos de Áreas de Serviço Pequenas", featured: true, oldPrice: "de R$ 147,00", price: "R$ 27,90", installments: "ou 4x de R$ 6,97 no cartão", items: ["50 Projetos de Áreas de Serviço Pequenas", "🎁 Bônus 01: 25 Ideias de Varal para Pouco Espaço", "🎁 Bônus 02: 20 Ideias de Armários para Áreas de Serviço Pequenas", "🎁 Bônus 03: Manual da Organização da Área de Serviço", "🎁 Bônus 04: Checklist da Área de Serviço Funcional", "🎁 Bônus 05: Guia para Aproveitar Espaços Vazios", "🎁 Bônus 06: 20 Referências de Bancadas para Áreas de Serviço", "Envio imediato por e-mail", "Acesso pelo celular, tablet ou computador", "Compra segura"], ctaText: "QUERO O PLANO COMPLETO!", ctaDisabled: true },
    ],
  },
  guarantee: { marqueeText: "SATISFAÇÃO OU DINHEIRO DE VOLTA ✦ GARANTIA 30 DIAS ✦ RISCO ZERO ✦ ", marqueeGradient: "linear-gradient(90deg, #115E59 0%, #0F766E 45%, #2BAA9A 72%, #115E59 100%)", icon: image("garantia-30-dias.webp"), iconAlt: "Garantia de 30 dias", title: "Compra 100% segura e garantida!", body: "Você tem **30 dias de garantia** para testar o material. Se não gostar por qualquer motivo, devolvemos 100% do valor. Sem perguntas, sem burocracia." },
  access: { title: "Como você vai receber seus 50 Projetos de Áreas de Serviço Pequenas", steps: [
    { num: "1", title: "Conclua sua compra", desc: "Após a confirmação do pagamento, seu acesso é liberado automaticamente." },
    { num: "2", title: "Receba no e-mail", desc: "As instruções de acesso chegam diretamente no e-mail cadastrado na compra." },
    { num: "3", title: "Acesse os materiais", desc: "Tudo organizado em arquivos digitais, pronto para abrir pelo celular, tablet ou computador." },
    { num: "4", title: "Compare com sua lavanderia", desc: "Abra os projetos, encontre configurações parecidas com o seu espaço e use as referências para planejar suas adaptações." },
  ] },
  faq: { title: "Perguntas Frequentes", items: [
    { q: "Como vou receber os 50 Projetos de Áreas de Serviço Pequenas?", a: "Após a confirmação do pagamento, você recebe as instruções de acesso no e-mail cadastrado e pode abrir os materiais digitalmente." },
    { q: "O material é físico ou digital?", a: "O material é 100% digital. Você pode consultar pelo celular, tablet ou computador sempre que quiser comparar uma ideia com a sua área de serviço." },
    { q: "As medidas dos projetos servem exatamente para qualquer lavanderia?", a: "Não. As medidas são referências visuais para ajudar na comparação. Antes de adaptar qualquer ideia, confira sempre as dimensões reais do seu ambiente, da máquina, do tanque, dos móveis e das áreas de circulação." },
    { q: "O que vem no Plano Completo?", a: "Você recebe os 50 Projetos de Áreas de Serviço Pequenas e os 6 bônus: ideias de varal, ideias de armários, Manual da Organização, Checklist Funcional, Guia para Aproveitar Espaços Vazios e referências de bancadas." },
    { q: "E se eu comprar e não gostar?", a: "Você conta com 30 dias de garantia. Se o material não fizer sentido para você, pode solicitar o reembolso dentro do prazo, conforme as condições da plataforma de pagamento." },
  ] },
  footer: { updateTitle: "Material em constante atualização", updateBody: "Novas referências e ideias podem ser adicionadas periodicamente. Ao adquirir agora, você garante acesso vitalício ao material e às futuras atualizações incluídas no produto.", showUpdate: true, copyright: "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.", missionText: "Encontre ideias para deixar sua área de serviço mais funcional, mesmo com pouco espaço.", privacyUrl: "/politica-de-privacidade", termsUrl: "/termos-de-uso", privacyLabel: "Política de Privacidade", termsLabel: "Termos de Uso" },
}
