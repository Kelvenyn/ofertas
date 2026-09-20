import type { OfferConfig } from "@/types/offer"

const image = (name: string) => `/images/lavanderia/${name}`

export const OFFER: OfferConfig = {
  meta: {
    title: "50 Projetos de Áreas de Serviço Pequenas",
    description: "50 projetos visuais para comparar ideias e aproveitar melhor cada canto da sua área de serviço."
  },
  palette: {
    brand: "#0F766E", brandDeep: "#115E59", brandInk: "#16302B", brandDark: "#2BAA9A", brandLight: "#8BD5CA", brandSubtle: "#E6F5F2",
    cta: "#16A34A", ctaDeep: "#11863D", ctaDarkest: "#0E6B31", accent: "#D97706", yellow: "#F4B942", bg: "#FAFCFB", bgAlt: "#115E59"
  },
  orientation: "landscape",
  hero: {
    pill: "50 PROJETOS VISUAIS",
    headline: "50 Projetos Visuais para Área de Serviço",
    subline: "Ideias para organizar a lavanderia, mesmo com pouco espaço.",
    image: image("plano-completo.webp"), imageAlt: "50 Projetos de Áreas de Serviço Pequenas",
    support: "Compare projetos e ideias para aproveitar melhor sua área de serviço.",
    ctaText: "VER OS PROJETOS", marqueeText: "50 PROJETOS VISUAIS ✦ VARAIS E ARMÁRIOS ✦ ACESSO IMEDIATO",
    bullets: ["Veja o que cabe no seu espaço", "Aproveite melhor cada canto", "Organize sem apertar o ambiente", "Ideias de varais e armários"]
  },
  socialProof: {
    title: "Mulheres de todo o Brasil já usam e aprovam",
    testimonials: Array.from({ length: 6 }, (_, index) => ({ src: image(`depoimento-${String(index + 1).padStart(2, "0")}.webp`), alt: `Depoimento sobre os projetos de áreas de serviço ${index + 1}` }))
  },
  counter: { prefix: "+ de", target: 50, label: "50 projetos para sua lavanderia" },
  kitCards: {
    heading: "Veja os projetos por dentro",
    images: Array.from({ length: 16 }, (_, index) => ({ src: image(`demonstrativo-${String(index + 1).padStart(2, "0")}.webp`), alt: `Projeto ${index + 1} de área de serviço pequena` }))
  },
  benefits: {
    title: "Por que consultar projetos de lavanderia?", ctaText: "VER OS PROJETOS",
    items: [
      { icon: "📐", title: "Visualização", desc: "Veja diferentes configurações prontas e entenda melhor o que pode funcionar no espaço que você tem." },
      { icon: "🧩", title: "Aproveitamento", desc: "Use paredes, cantos, alturas e vãos sem apertar a lavanderia." },
      { icon: "🧺", title: "Organização", desc: "Distribua máquina, tanque, varal e armários com referências funcionais." },
      { icon: "✅", title: "Clareza", desc: "Compare possibilidades antes de decidir o que comprar, instalar ou adaptar na sua área de serviço." },
    ]
  },
  urgency: {
    title: "Visualize melhor sua área de serviço", highlight: "",
    body: "Compare configurações e planeje a área de serviço. Confira as medidas reais antes de adaptar qualquer projeto.",
    ctaText: "VER OS PROJETOS", trust: ["ACESSO IMEDIATO", "MATERIAL DIGITAL"]
  },
  deliverables: {
    title: "TUDO O QUE VOCÊ VAI RECEBER", image: image("plano-completo.webp"), imageAlt: "Plano Completo de Projetos de Áreas de Serviço Pequenas",
    bullets: ["Projetos Prontos de Áreas de Serviço Pequenas", "50 modelos visuais organizados para comparar", "Ideias de varal, armários, bancada e armazenamento", "Medidas ilustrativas para ajudar na visualização", "Consulte pelo celular, tablet ou computador", "Referências visuais fáceis de comparar e adaptar", "Entrega imediata por email"]
  },
  bonusSection: { titleLead: "6 BÔNUS", titleHighlight: "EXCLUSIVOS", subtitle: "No Plano Completo, você também recebe seis bônus para organizar a área de serviço.", cardLabel: "BÔNUS", timerText: "BÔNUS DISPONÍVEL NO PLANO COMPLETO", freeLabel: "GRÁTIS" },
  bonuses: [
    ["25 Ideias de Varal para Pouco Espaço", "Soluções visuais para secar roupas sem deixar o varal dominar sua área de serviço.", "R$ 19,90"],
    ["20 Ideias de Armários para Áreas de Serviço Pequenas", "Referências para guardar produtos, utensílios e roupas sem deixar os armários ocuparem toda a lavanderia.", "R$ 19,90"],
    ["Manual da Organização da Área de Serviço", "Um passo a passo visual para decidir o que guardar, onde colocar cada coisa e como manter a lavanderia organizada no dia a dia.", "R$ 17,90"],
    ["Checklist da Área de Serviço Funcional", "Um diagnóstico visual para conferir espaço, circulação, armazenamento, varal e rotina e descobrir o que melhorar primeiro.", "R$ 14,90"],
    ["Guia para Aproveitar Espaços Vazios", "Um guia visual para encontrar centímetros esquecidos e converter esses espaços em apoio, armazenamento e organização.", "R$ 19,90"],
    ["20 Referências de Bancadas para Áreas de Serviço", "Soluções visuais para criar apoio, dobrar roupas e organizar a rotina sem deixar a bancada ocupar espaço demais.", "R$ 19,90"],
  ].map(([title, desc, price], index) => ({ front: image(`bonus-${String(index + 1).padStart(2, "0")}-frente.webp`), back: image(`bonus-${String(index + 1).padStart(2, "0")}-verso.webp`), title, titleBreak: title.replace(" para ", " para\n"), desc, price })),
  pricing: {
    titleLead: "ESCOLHA SEU PLANO", titleHighlight: "DE LAVANDERIA",
    plans: [
      { id: "basic", title: "Plano Básico", image: image("plano-basico.webp"), imageAlt: "Plano Básico de Projetos de Áreas de Serviço Pequenas", featured: false, oldPrice: "de R$ 39,90", price: "R$ 17,90", installments: "ou 4x de R$ 4,47 no cartão", items: ["50 projetos de áreas de serviço", "Arquivo digital em formato visual", "Acesso após confirmação da compra", "Consulta pelo celular, tablet ou computador", "Referências de varais e armários", "Ideias para espaços compactos"], mutedItems: ["Não inclui os bônus do Plano Completo"], ctaText: "QUERO O BÁSICO", ctaHref: "https://pay.hotmart.com/G107492677W" },
      { id: "premium", title: "Plano Completo", image: image("plano-completo.webp"), imageAlt: "Plano Completo de Projetos de Áreas de Serviço Pequenas", featured: true, oldPrice: "de R$ 147,00", price: "R$ 27,90", installments: "ou 4x de R$ 6,97 no cartão", items: ["50 projetos de áreas de serviço", "🎁 25 ideias de varal", "🎁 20 ideias de armários", "🎁 Manual de organização", "🎁 Checklist funcional", "🎁 Guia para aproveitar espaços", "🎁 20 referências de bancadas", "Acesso digital por email"], ctaText: "QUERO O COMPLETO", ctaHref: "https://pay.hotmart.com/J107492716E" },
    ]
  },
  guarantee: { marqueeText: "SATISFAÇÃO OU DINHEIRO DE VOLTA ✦ GARANTIA 30 DIAS ✦ RISCO ZERO ✦ ", icon: image("garantia.webp"), iconAlt: "Garantia de 30 dias", title: "Compra 100% segura e garantida!", body: "Você tem 30 dias para testar o material. Se decidir que ele não é para você, pode solicitar o reembolso dentro desse prazo." },
  access: { title: "Como receber os projetos de lavanderia", steps: [
    { title: "Conclua sua compra", desc: "Após a confirmação do pagamento, seu acesso é liberado automaticamente." },
    { title: "Receba no email", desc: "As instruções de acesso chegam diretamente no email cadastrado na compra." },
    { title: "Acesse os materiais", desc: "Os arquivos digitais abrem no celular, tablet ou computador." },
    { title: "Compare com sua lavanderia", desc: "Compare projetos parecidos com seu espaço e planeje adaptações." },
  ] },
  faq: { title: "Perguntas Frequentes", items: [
    { q: "Como recebo os projetos de lavanderia?", a: "Após a confirmação da compra, você recebe por email as instruções de acesso aos arquivos digitais." },
    { q: "O material é físico ou digital?", a: "O material é digital e pode ser consultado pelo celular, tablet ou computador." },
    { q: "As medidas servem para qualquer lavanderia?", a: "As medidas são referências visuais. Confira as dimensões reais do ambiente e dos equipamentos antes de adaptar qualquer projeto." },
    { q: "O que vem no Plano Completo?", a: "Você recebe 50 projetos e seis bônus: ideias de varais, armários e bancadas, manual, checklist e guia de aproveitamento de espaços." },
    { q: "Como funciona a garantia?", a: "Você tem 30 dias para solicitar o reembolso, conforme as condições da plataforma de pagamento." }
  ] },
  footer: { updateTitle: "Material em constante atualização", updateBody: "O material pode receber novas referências. A compra inclui acesso vitalício ao conteúdo e às atualizações do produto.", showUpdate: true, copyright: "Copyright © 2026 | Todos os direitos reservados. Este material é protegido pela Lei nº 9.610/98, sendo proibida a reprodução total ou parcial sem autorização.", privacyUrl: "/politica-de-privacidade", termsUrl: "/termos-de-uso" }
}
