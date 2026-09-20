import type { OfferConfig } from "@/types/offer"
import { OFFER as laboralOffer } from "@/config/offers/laboral/offer"

const castracaoImage = (src: string) => src.replace("/images/laboral/", "/images/castracao/")

const bonuses = [
  { title: "Controle Simples de Estoque para Castrações", titleBreak: "Controle de Estoque\npara Castrações", desc: "Planilha e folha imprimível para registrar entrada, saída e materiais disponíveis.", price: "R$ 27,00" },
  { title: "Ficha de Organização da Rotina Cirúrgica", titleBreak: "Ficha da Rotina\nCirúrgica", desc: "Modelo para registrar procedimento, responsável pela preparação e observações da equipe.", price: "R$ 27,00" },
  { title: "Consulta Expressa em Uma Página", titleBreak: "Consulta Expressa\nem Uma Página", desc: "Resumo visual dos principais pontos para conferir antes da castração.", price: "R$ 27,00" },
  { title: "Sequência Visual da Preparação da Sala", titleBreak: "Sequência Visual\nda Preparação", desc: "Quadros curtos para acompanhar a ordem de conferência da sala e da mesa.", price: "R$ 27,00" },
] as const

export const OFFER: OfferConfig = {
  ...laboralOffer,
  meta: { title: "Mapa Visual Castração", description: "Mapas visuais e checklists para preparar a mesa cirúrgica para castrações com mais clareza e segurança." },
  palette: { brand: "#047857", brandDeep: "#065F46", brandInk: "#064E3B", brandDark: "#34D399", brandLight: "#A7F3D0", brandSubtle: "#D1FAE5", cta: "#15803D", ctaDeep: "#166534", ctaDarkest: "#14532D", accent: "#EA580C", yellow: "#FACC15", bg: "#ECFDF5", bgAlt: "#047857" },
  orientation: "landscape",
  hero: {
    ...laboralOffer.hero, pill: "AUXILIADORES E VETERINÁRIOS", headline: "Mapa Visual de Preparação\nda Mesa para Castração", subline: "Entre na sala com clareza e segurança.",
    image: castracaoImage(laboralOffer.hero.image), imageAlt: "Kit visual de preparação da mesa para castração", support: "Você receberá um kit completo com mapas visuais e checklists que facilitam a preparação da mesa cirúrgica", ctaText: "QUERO O KIT", marqueeText: "MAPAS VISUAIS • CHECKLISTS • CÃES E GATOS •", bullets: ["Mapas visuais para consulta rápida", "Checklists para a preparação", "Materiais por categoria", "Arquivos para adaptar à rotina"]
  },
  socialProof: { ...laboralOffer.socialProof, title: "Auxiliares e Veterinários já usam e aprovam", testimonials: laboralOffer.socialProof.testimonials.map((item) => ({ ...item, src: castracaoImage(item.src), alt: "Depoimento de profissional da rotina veterinária" })) },
  counter: { prefix: "+ de", target: 60, label: "Mapas visuais para preparar a mesa" },
  kitCards: { ...laboralOffer.kitCards, heading: "Prepare a mesa antes da castração", images: laboralOffer.kitCards.images.map((item) => ({ ...item, src: castracaoImage(item.src), alt: "Material visual do kit de castração" })) },
  benefits: { title: "Os materiais do KIT de preparação possuem", ctaText: "QUERO O KIT", items: [
    { icon: "🗺️", title: "Consulta rápida", desc: "Mapas visuais organizados para consulta rápida e fácil." },
    { icon: "✅", title: "Checklist", desc: "Use checklist detalhados para garantir que nada fique esquecido." },
    { icon: "🧰", title: "Organização", desc: "Identificação clara dos instrumentos, facilite a preparação." },
    { icon: "✏️", title: "Adaptação", desc: "Listas de materiais separadas, evite confusões na hora da castração." },
  ] },
  urgency: { title: "Prepare a mesa com segurança antes do próximo procedimento", highlight: "", body: "Tenha um guia visual para conferir a organização da bancada, os instrumentos e os materiais essenciais antes de entrar na sala.", ctaText: "QUERO O KIT", trust: ["ACESSO IMEDIATO", "MATERIAL DIGITAL"] },
  deliverables: { ...laboralOffer.deliverables, title: "TUDO O QUE VOCÊ VAI RECEBER", image: castracaoImage(laboralOffer.deliverables.image), imageAlt: "Kit de preparação para castração", bullets: ["Mapa visual para castração de cão macho", "Mapa visual para castração de cão fêmea", "Mapa visual para castração de gato macho", "Mapa visual para castração de gata fêmea", "Checklist de preparação da sala", "Lista visual de materiais e consumíveis", "Guia visual dos instrumentos", "Checklist de conferência da mesa", "Folhas de consulta rápida"] },
  bonusSection: { ...laboralOffer.bonusSection, titleLead: "4 BÔNUS", titleHighlight: "EXCLUSIVOS", subtitle: "No Plano Completo, você também recebe materiais para organizar a rotina e consultar o essencial com ainda mais agilidade." },
  bonuses: laboralOffer.bonuses.slice(0, bonuses.length).map((bonus, index) => ({ ...bonus, front: castracaoImage(bonus.front), back: castracaoImage(bonus.back), ...bonuses[index] })),
  pricing: { titleLead: "ESCOLHA A OPÇÃO", titleHighlight: "IDEAL PARA VOCÊ", plans: [
    { ...laboralOffer.pricing.plans[0], title: "Plano Básico", image: castracaoImage(laboralOffer.pricing.plans[0].image), imageAlt: "Plano Básico do Mapa Visual Castração", oldPrice: "R$ 17,90", price: "R$ 17,90", installments: "ou 4x de R$ 4,48 no cartão", items: ["Mapa visual de preparação da mesa", "Kit visual para castração de cães e gatos", "Checklists para cada etapa da preparação", "Arquivos em PDF para consulta e impressão", "Materiais organizados por categoria", "Referências para preparar mesa e sala"], mutedItems: ["Não inclui os bônus do Plano Completo"], ctaText: "QUERO BÁSICO", ctaHref: "https://pay.cakto.com.br/37k2pbs_996604" },
    { ...laboralOffer.pricing.plans[1], title: "Plano Completo", image: castracaoImage(laboralOffer.pricing.plans[1].image), imageAlt: "Plano Completo do Mapa Visual Castração", oldPrice: "R$ 27,90", price: "R$ 27,90", installments: "ou 4x de R$ 6,98 no cartão", items: ["Mapa Visual de Preparação da Mesa para Castração", "Kit visual de preparação para castração de Cães e Gatos", "Checklists para cada etapa da preparação", ...bonuses.map(({ title }) => `🎁 ${title}`), "Arquivos em PDF para consulta e impressão"], extraNote: "MAIS DE 60 PÁGINAS VISUAIS", ctaText: "QUERO COMPLETO", ctaHref: "https://pay.cakto.com.br/36ombw2_996610" },
  ] },
  guarantee: { ...laboralOffer.guarantee, icon: laboralOffer.guarantee.icon ? castracaoImage(laboralOffer.guarantee.icon) : undefined, iconAlt: "Garantia de 30 dias", marqueeText: "GARANTIA 30 DIAS ✦ RISCO ZERO ✦ COMPRA SEGURA ✦ ", title: "GARANTIA DE 30 DIAS ZERO RISCO PARA VOCÊ", body: "Você tem **30 dias de garantia** para conhecer o kit. Se o material não fizer sentido para a sua rotina ou não atender às suas necessidades, poderá solicitar o reembolso dentro desse período." },
  access: { title: "Como é o acesso ao kit", steps: [
    { title: "Conclua a compra", desc: "Após o pagamento, o acesso é liberado automaticamente." }, { title: "Receba por email", desc: "Você recebe as instruções de acesso no email cadastrado." }, { title: "Baixe os arquivos", desc: "Acesse os materiais pelo computador ou celular e imprima quando precisar." }, { title: "Use e aplique", desc: "Consulte os mapas, siga os checklists e adapte os arquivos à sua rotina." },
  ] },
  faq: { title: "Perguntas Frequentes", items: [
    {"q":"O que vou receber no Kit Visual?","a":"Você recebe mapas visuais para castrações de cães e gatos, checklists da mesa, bancada e sala, além de PDFs para consulta ou impressão. O Plano Completo inclui 4 bônus."},
    {"q":"O kit serve para castração de cães e gatos?","a":"Sim. O material inclui referências visuais para cão macho, cão fêmea, gato macho e gata fêmea, facilitando a consulta conforme o procedimento preparado."},
    {"q":"O material substitui o protocolo da clínica?","a":"Não. O kit ajuda a organizar a preparação. Adapte os materiais ao protocolo, à estrutura e às orientações da sua clínica."},
    {"q":"Como recebo e uso os materiais?","a":"Após a confirmação da compra, as instruções chegam por email. Os arquivos podem ser consultados no celular ou computador e impressos quando necessário."},
    {"q":"E se o kit não fizer sentido para minha rotina?","a":"Você tem 30 dias de garantia para conhecer o material e solicitar o reembolso, se ele não atender às suas necessidades."}
  ] },
  footer: { ...laboralOffer.footer, updateTitle: "Material feito para consulta prática", updateBody: "O Kit de Preparação para Castração foi organizado para tornar a conferência da mesa e da sala mais clara no dia a dia.", privacyUrl: "/politica-de-privacidade", termsUrl: "/termos-de-uso" }
}
