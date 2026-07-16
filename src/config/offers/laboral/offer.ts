import type { OfferConfig } from "@/types/offer"
import { OFFER as psicopedagogiaOffer } from "@/config/offers/psicopedagogia/offer"

const bonuses = [
  { title: "20 Alongamentos para Equipe Operacional", titleBreak: "20 Alongamentos\nEquipe Operacional", desc: "Feche a sessão trabalhando o corpo, além da interação em grupo.", price: "R$ 19,90" },
  { title: "20 Alongamentos para Equipe Administrativa", titleBreak: "20 Alongamentos\nEquipe Administrativa", desc: "Exercícios voltados para quem passa a maior parte do expediente sentado.", price: "R$ 19,90" },
  { title: "Dinâmicas com Objetos do Trabalho", titleBreak: "Dinâmicas com\nObjetos do Trabalho", desc: "Dinâmicas com materiais já disponíveis na empresa, sem precisar comprar equipamentos.", price: "R$ 29,90" },
  { title: "Lista de Presença e Sessões", titleBreak: "Lista de Presença\ne Sessões", desc: "Controle quem participou, quais dinâmicas foram aplicadas e quando.", price: "R$ 19,90" },
  { title: "Dinâmicas para SIPAT e Datas Especiais", titleBreak: "SIPAT e Datas\nEspeciais", desc: "Dinâmicas prontas para SIPAT, semana interna e datas especiais da empresa.", price: "R$ 29,90" },
  { title: "Respiração para Encerrar a Sessão", titleBreak: "Respiração para\nEncerrar a Sessão", desc: "Exercícios simples de respiração para fechar a sessão com o grupo mais calmo e focado.", price: "R$ 19,90" },
] as const

export const OFFER: OfferConfig = {
  ...psicopedagogiaOffer,
  meta: { title: "50 Dinâmicas Prontas de Ginástica Laboral", description: "Dinâmicas práticas para fisioterapeutas energizarem e engajarem equipes nas empresas." },
  palette: { brand: "#059669", brandDeep: "#047857", brandInk: "#065F46", brandDark: "#10B981", brandLight: "#6EE7B7", brandSubtle: "#D1FAE5", cta: "#16A34A", ctaDeep: "#15803D", ctaDarkest: "#166534", accent: "#0EA5E9", yellow: "#FACC15", bg: "#ECFDF5", bgAlt: "#16A34A" },
  hero: {
    ...psicopedagogiaOffer.hero,
    pill: "PARA FISIOTERAPEUTAS QUE ATENDEM EMPRESAS", titleLine1: "50 Dinâmicas Prontas", titleLine2: "de Ginástica Laboral", titleLine3: "Para energizar equipes administrativas e operacionais e aumentar a participação em cada sessão.", imageAlt: "50 Dinâmicas Prontas de Ginástica Laboral",
    subtitle: "Tenha dinâmicas adequadas ao perfil dos colaboradores, ao objetivo do momento e ao tempo disponível na empresa.", ctaText: "QUERO AS DINÂMICAS PRONTAS", marqueeText: "50 DINÂMICAS PRONTAS ✦ PARA FISIOTERAPEUTAS ✦ ADMINISTRATIVO ✦ OPERACIONAL ✦ ", marqueeGradient: "linear-gradient(90deg, #059669 0%, #10B981 35%, #6EE7B7 60%, #F97316 82%, #059669 100%)",
    bullets: ["Dinâmicas para diferentes perfis de colaboradores", "Organizadas por objetivo e formato de participação", "Opções para aplicações de 5, 10 e 15 minutos", "Material prático para consultar pelo celular ou imprimir"],
  },
  socialProof: { ...psicopedagogiaOffer.socialProof, title: "Fisioterapeutas de todo o Brasil já usam e aprovam" },
  counter: { prefix: "+ de", target: 50, label: "dinâmicas laborais prontas para aplicar" },
  kitCards: { ...psicopedagogiaOffer.kitCards, heading1: "Veja como suas dinâmicas ficam organizadas para aplicar:" },
  benefits: { title: "Por que fisioterapeutas estão escolhendo as Dinâmicas Laborais Prontas?", ctaText: "QUERO AS DINÂMICAS PRONTAS", items: [
    { icon: "⏱️", title: "Mais tempo", desc: "Abra uma dinâmica pronta e pare de perder tempo criando atividades novas toda semana." },
    { icon: "🔄", title: "Mais variedade", desc: "Tenha opções para variar as sessões sem repetir sempre o mesmo aquecimento." },
    { icon: "📋", title: "Mais organização", desc: "Escolha por equipe, objetivo, formato de participação e tempo disponível." },
    { icon: "💼", title: "Mais engajamento", desc: "Conduza sessões mais participativas, mesmo com colaboradores resistentes." },
  ] },
  urgency: { pill: "OPORTUNIDADE ÚNICA", title: "Chegue à próxima sessão com uma dinâmica pronta para aplicar", highlight: "", body: "Você já conhece os exercícios técnicos. O que falta é um repertório de dinâmicas organizado para escolher, abrir e conduzir sem monotonia.", ctaText: "QUERO ACESSAR AGORA", trust: ["ACESSO IMEDIATO • ACESSO VITALÍCIO"] },
  idealPara: { pill: "É PARA VOCÊ", title: "Este material é ideal para fisioterapeutas que desejam:", subtitle: "Mais repertório, menos planejamento e sessões mais dinâmicas nas empresas.", items: [
    { icon: "🏢", title: "Atender equipes", desc: "Ter opções para colaboradores administrativos e operacionais." }, { icon: "⚡", title: "Ganhar agilidade", desc: "Preparar a atividade em poucos minutos antes do atendimento." }, { icon: "🧩", title: "Variar sessões", desc: "Escolher objetivos e formatos sem repetir a mesma dinâmica." }, { icon: "✅", title: "Conduzir com segurança", desc: "Ter um passo a passo claro para aplicar em cada empresa." },
  ] },
  deliverables: { ...psicopedagogiaOffer.deliverables, pill: "ACESSO IMEDIATO", title: "Tudo o que você vai receber", imageAlt: "Dinâmicas Laborais Prontas", bullets: ["50 dinâmicas completas de ginástica laboral", "25 dinâmicas para equipe administrativa", "25 dinâmicas para equipe operacional", "Dinâmicas de 5, 10 e 15 minutos", "Objetivo, formato de participação e passo a passo de cada dinâmica", "Comandos de condução e sugestões de adaptação", "PDFs para celular, tablet, computador ou impressão"] },
  bonusSection: { ...psicopedagogiaOffer.bonusSection, pill: "EXTRAS INCLUÍDOS", titleLead: "6 BÔNUS", titleHighlight: "EXCLUSIVOS", subtitle: "No Plano Completo, você recebe materiais extras para planejar, conduzir e encerrar seus atendimentos com dinâmica e exercício físico." },
  bonuses: psicopedagogiaOffer.bonuses.map((bonus, index) => ({ ...bonus, ...bonuses[index] })),
  pricing: { titleLead: "ESCOLHA O PLANO", titleHighlight: "IDEAL PARA VOCÊ", plans: [
    { ...psicopedagogiaOffer.pricing.plans[0], title: "Plano Básico", imageAlt: "Plano Básico de Dinâmicas Laborais", oldPrice: "de R$ 39,90", price: "R$ 17,90", installments: "ou 4x de R$ 4,47 no cartão", items: ["50 dinâmicas de ginástica laboral prontas", "25 dinâmicas administrativas e 25 operacionais", "Dinâmicas de 5, 10 e 15 minutos", "Arquivos em PDF para consulta e impressão"], mutedItems: ["Não inclui os bônus do Plano Completo"], ctaText: "QUERO O PLANO BÁSICO" },
    { ...psicopedagogiaOffer.pricing.plans[1], title: "Plano Completo", imageAlt: "Plano Completo de Dinâmicas Laborais", oldPrice: "de R$ 147,00", price: "R$ 27,90", installments: "ou 4x de R$ 6,97 no cartão", items: ["50 dinâmicas de ginástica laboral prontas", ...bonuses.map(({ title }) => `🎁 ${title}`), "Acesso imediato e vitalício"], ctaText: "QUERO O PLANO COMPLETO" },
  ] },
  guarantee: { ...psicopedagogiaOffer.guarantee, marqueeText: "GARANTIA 30 DIAS ✦ RISCO ZERO ✦ SATISFAÇÃO OU DINHEIRO DE VOLTA ✦ ", marqueeGradient: "linear-gradient(90deg, #059669 0%, #10B981 35%, #6EE7B7 60%, #F97316 82%, #059669 100%)", body: "Você tem **30 dias de garantia** para conhecer as Dinâmicas Laborais Prontas. Se o material não atender às suas necessidades, pode solicitar o reembolso dentro desse período." },
  access: { title: "Como você vai receber suas Dinâmicas Laborais Prontas", steps: [
    { num: "01", title: "Conclua sua compra", desc: "Após o pagamento, seu acesso é liberado automaticamente." }, { num: "02", title: "Receba no e-mail", desc: "As instruções chegam no e-mail cadastrado na compra." }, { num: "03", title: "Acesse os PDFs", desc: "Tudo organizado para consultar no celular, tablet ou computador." }, { num: "04", title: "Escolha e aplique", desc: "Identifique a equipe, o objetivo e o tempo disponível. Depois, é só abrir a dinâmica." },
  ] },
  faq: { title: "Perguntas Frequentes", items: [
    { q: "Como vou receber as dinâmicas?", a: "Após a confirmação da compra, você recebe o acesso digital aos arquivos em PDF." }, { q: "As dinâmicas servem para quais equipes?", a: "Você recebe 25 dinâmicas para equipes administrativas e 25 para equipes operacionais." }, { q: "Quais durações estão disponíveis?", a: "Há dinâmicas de 5, 10 e 15 minutos para se adaptar ao tempo da empresa." }, { q: "Preciso criar ou adaptar alguma coisa?", a: "Não. As dinâmicas já vêm prontas, com passo a passo, comandos e orientações para aplicar." }, { q: "E se eu não gostar?", a: "Você conta com 30 dias de garantia para avaliar o material." },
  ] },
  footer: { ...psicopedagogiaOffer.footer, updateTitle: "Material em constante atualização", updateBody: "As Dinâmicas Laborais Prontas recebem melhorias e correções periódicas. Ao adquirir agora, você garante acesso vitalício.", missionText: "Conduza sessões de ginástica laboral com mais variedade, organização e menos improviso" },
}
