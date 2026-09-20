import type { OfferConfig } from "@/types/offer"
import { OFFER as psicopedagogiaOffer } from "@/config/offers/psicopedagogia/offer"

const laboralImage = (src: string) => src.replace("/images/psicopedagogia/", "/images/laboral/")

const bonuses = [
  { title: "20 Alongamentos para Equipe Operacional", titleBreak: "20 Alongamentos\nEquipe Operacional", desc: "Encerre a sessão trabalhando o corpo da equipe operacional.", price: "R$ 19,90" },
  { title: "20 Alongamentos para Equipe Administrativa", titleBreak: "20 Alongamentos\nEquipe Administrativa", desc: "Exercícios voltados para quem passa a maior parte do expediente sentado.", price: "R$ 19,90" },
  { title: "Dinâmicas com Objetos do Trabalho", titleBreak: "Dinâmicas com\nObjetos do Trabalho", desc: "Dinâmicas com materiais já disponíveis na empresa, sem precisar comprar equipamentos.", price: "R$ 29,90" },
  { title: "Lista de Presença e Sessões", titleBreak: "Lista de Presença\ne Sessões", desc: "Controle quem participou, quais dinâmicas foram aplicadas e quando.", price: "R$ 19,90" },
  { title: "Dinâmicas para SIPAT e Datas Especiais", titleBreak: "SIPAT e Datas\nEspeciais", desc: "Dinâmicas prontas para SIPAT, semana interna e datas especiais da empresa.", price: "R$ 29,90" },
  { title: "20 Sessões Prontas de Ginástica Laboral", titleBreak: "20 Sessões Prontas\nde Ginástica Laboral", desc: "20 roteiros completos para você abrir, conduzir e encerrar atendimentos sem precisar montar a sessão do zero.", price: "R$ 29,90" },
] as const

export const OFFER: OfferConfig = {
  ...psicopedagogiaOffer,
  meta: { title: "Ginástica Laboral", description: "Dinâmicas práticas para professores de ginástica laboral energizarem e engajarem equipes nas empresas." },
  palette: { brand: "#0E7490", brandDeep: "#155E75", brandInk: "#164E63", brandDark: "#06B6D4", brandLight: "#67E8F9", brandSubtle: "#CFFAFE", cta: "#16A34A", ctaDeep: "#15803D", ctaDarkest: "#166534", accent: "#F97316", yellow: "#FACC15", bg: "#ECFEFF", bgAlt: "#0E7490" },
  orientation: "landscape",
  hero: {
    ...psicopedagogiaOffer.hero,
    pill: "PARA PROFESSORES DE GINÁSTICA", headline: "50 Dinâmicas Prontas\nde Ginástica Laboral", subline: "Dinâmicas para engajar equipes, do operacional ao administrativo.", image: laboralImage(psicopedagogiaOffer.hero.image), imageAlt: "50 Dinâmicas Prontas de Ginástica Laboral",
    support: "Identifique o perfil da equipe, escolha o objetivo do momento de acordo com o tempo disponível e aplique a dinâmica certa.", ctaText: "VER DINÂMICAS", marqueeText: "50 DINÂMICAS • ADMINISTRATIVO • OPERACIONAL • ACESSO IMEDIATO", bullets: ["Dinâmicas para perfis de equipe", "Organizadas por objetivo", "Opções de 5, 10 e 15 minutos", "Consulte no celular ou imprima"]
  },
  socialProof: { ...psicopedagogiaOffer.socialProof, title: "Professores de ginástica laboral usam o material", testimonials: psicopedagogiaOffer.socialProof.testimonials.map((testimonial) => ({ ...testimonial, src: laboralImage(testimonial.src) })) },
  counter: { prefix: "+ de", target: 50, label: "Dinâmicas Laborais prontas para aplicar" },
  kitCards: { ...psicopedagogiaOffer.kitCards, heading: "Encontre uma dinâmica para cada momento", images: psicopedagogiaOffer.kitCards.images.map((image) => ({ ...image, src: laboralImage(image.src) })) },
  benefits: { title: "Como o material ajuda nas dinâmicas", ctaText: "VER DINÂMICAS", items: [
    { icon: "⏱️", title: "Mais tempo", desc: "Abra uma dinâmica pronta e pare de perder tempo criando atividades novas toda semana." },
    { icon: "🔄", title: "Mais variedade", desc: "Alterne entre 50 opções e evite repetir sempre o mesmo aquecimento." },
    { icon: "📋", title: "Mais organização", desc: "Escolha por equipe, objetivo, formato de participação e tempo disponível." },
    { icon: "💼", title: "Mais engajamento", desc: "Dinâmicas pensadas para envolver até os colaboradores mais resistentes." },
  ] },
  urgency: { title: "Leve sempre uma dinâmica pronta para a próxima sessão", highlight: "", body: "Você já domina a parte técnica. Falta um repertório pronto para escolher, abrir e aplicar com facilidade.", ctaText: "VER DINÂMICAS", trust: ["ACESSO IMEDIATO", "ACESSO VITALÍCIO"] },
  deliverables: { ...psicopedagogiaOffer.deliverables, title: "Tudo o que você vai receber", image: laboralImage(psicopedagogiaOffer.deliverables.image), imageAlt: "Dinâmicas Laborais Prontas", bullets: ["50 dinâmicas completas de ginástica laboral", "25 dinâmicas para equipe administrativa", "25 dinâmicas para equipe operacional", "Dinâmicas de 5, 10 e 15 minutos", "Objetivo, formato e passo a passo das dinâmicas", "Comandos de condução e sugestões de adaptação", "PDFs para celular, tablet, computador ou impressão"] },
  bonusSection: { ...psicopedagogiaOffer.bonusSection, titleLead: "6 BÔNUS", titleHighlight: "EXCLUSIVOS", subtitle: "No Plano Completo, você recebe materiais extras para planejar, conduzir e encerrar seus atendimentos com dinâmica e exercício físico." },
  bonuses: psicopedagogiaOffer.bonuses.map((bonus, index) => ({ ...bonus, front: laboralImage(bonus.front), back: laboralImage(bonus.back), ...bonuses[index] })),
  pricing: { titleLead: "ESCOLHA O PLANO", titleHighlight: "IDEAL PARA VOCÊ", plans: [
    { ...psicopedagogiaOffer.pricing.plans[0], title: "Plano Básico", image: laboralImage(psicopedagogiaOffer.pricing.plans[0].image), imageAlt: "Plano Básico de Dinâmicas Laborais", oldPrice: "de R$ 39,90", price: "R$ 17,90", installments: "ou 4x de R$ 4,47 no cartão", items: ["50 dinâmicas prontas de ginástica laboral", "25 para equipes administrativas e 25 operacionais", "Opções de 5, 10 e 15 minutos", "Objetivo e formato de participação", "Passo a passo e comandos de condução", "Arquivos em PDF para consulta e impressão"], mutedItems: ["Não inclui os bônus do Plano Completo"], ctaText: "QUERO BÁSICO", ctaHref: "https://pay.cakto.com.br/39omw5z_995732" },
    { ...psicopedagogiaOffer.pricing.plans[1], title: "Plano Completo", image: laboralImage(psicopedagogiaOffer.pricing.plans[1].image), imageAlt: "Plano Completo de Dinâmicas Laborais", oldPrice: "de R$ 147,00", price: "R$ 27,90", installments: "ou 4x de R$ 6,97 no cartão", items: ["50 dinâmicas de ginástica laboral prontas", ...bonuses.map(({ title }) => `🎁 ${title}`), "Acesso imediato e vitalício"], ctaText: "QUERO COMPLETO", ctaHref: "https://pay.cakto.com.br/od5sd2c" },
  ] },
  guarantee: { ...psicopedagogiaOffer.guarantee, icon: psicopedagogiaOffer.guarantee.icon ? laboralImage(psicopedagogiaOffer.guarantee.icon) : undefined, marqueeText: "GARANTIA 30 DIAS ✦ RISCO ZERO ✦ SATISFAÇÃO OU DINHEIRO DE VOLTA ✦ ", body: "Você tem **30 dias de garantia** para conhecer as Dinâmicas Laborais Prontas. Se o material não atender às suas necessidades, pode solicitar o reembolso dentro desse período." },
  access: { title: "Como receber as Dinâmicas Laborais", steps: [
    { title: "Conclua sua compra", desc: "Após o pagamento, seu acesso é liberado automaticamente." }, { title: "Receba no email", desc: "As instruções chegam no email cadastrado na compra." }, { title: "Acesse os PDFs", desc: "Tudo organizado para consultar no celular, tablet ou computador." }, { title: "Escolha e aplique", desc: "Identifique a equipe, o objetivo e o tempo disponível. Depois, é só abrir a dinâmica." },
  ] },
  faq: { title: "Perguntas Frequentes", items: [
    { q: "Como vou receber as dinâmicas?", a: "Após a confirmação da compra, você recebe o acesso digital aos arquivos em PDF." }, { q: "As dinâmicas servem para quais equipes?", a: "Você recebe 25 dinâmicas para equipes administrativas e 25 para equipes operacionais." }, { q: "Quais durações estão disponíveis?", a: "Há dinâmicas de 5, 10 e 15 minutos para se adaptar ao tempo da empresa." }, { q: "Preciso criar ou adaptar alguma coisa?", a: "Não. As dinâmicas já vêm prontas, com passo a passo, comandos e orientações para aplicar." }, { q: "E se eu não gostar?", a: "Você conta com 30 dias de garantia para avaliar o material." },
  ] },
  footer: { ...psicopedagogiaOffer.footer, updateTitle: "Material em constante atualização", updateBody: "As Dinâmicas Laborais Prontas recebem melhorias e correções periódicas. Ao adquirir agora, você garante acesso vitalício.", privacyUrl: "/politica-de-privacidade", termsUrl: "/termos-de-uso" }
}
