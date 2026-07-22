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
  hero: {
    ...psicopedagogiaOffer.hero,
    pill: "PARA PROFESSORES DE GINÁSTICA LABORAL", titleLine1: "50 Dinâmicas Prontas", titleLine2: "de Ginástica Laboral", titleLine3: "Para engajar até os colaboradores mais resistentes, do operacional ao administrativo, sem precisar pesquisar nada na internet.", image: laboralImage(psicopedagogiaOffer.hero.image), imageAlt: "50 Dinâmicas Prontas de Ginástica Laboral",
    subtitle: "Identifique o perfil da equipe, escolha o objetivo do momento de acordo com o tempo disponível e aplique a dinâmica certa.", ctaText: "QUERO AS DINÂMICAS PRONTAS", marqueeText: "50 DINÂMICAS PRONTAS ✦ ADMINISTRATIVO ✦ OPERACIONAL ✦ ACESSO IMEDIATO ✦ ", marqueeGradient: "linear-gradient(90deg, var(--brand) 0%, var(--brand-deep) 100%)",
    bullets: ["Dinâmicas adequadas a cada perfil de equipe", "Organizadas por objetivo, para encontrar rapidamente", "Opções para aplicações de 5, 10 e 15 minutos", "Material prático para consultar pelo celular ou imprimir"],
  },
  socialProof: { ...psicopedagogiaOffer.socialProof, title: "Professores que atendem empresas, igual você, já usam e aprovam", testimonials: psicopedagogiaOffer.socialProof.testimonials.map((testimonial) => ({ ...testimonial, src: laboralImage(testimonial.src) })) },
  counter: { prefix: "+ de", target: 50, label: "Dinâmicas Laborais prontas para aplicar" },
  kitCards: { ...psicopedagogiaOffer.kitCards, heading1: "Veja como encontrar a dinâmica certa para cada momento:", images: psicopedagogiaOffer.kitCards.images.map((image) => ({ ...image, src: laboralImage(image.src) })) },
  benefits: { title: "Como esse material está transformando as Dinâmicas Laborais.", ctaText: "QUERO AS DINÂMICAS PRONTAS", items: [
    { icon: "⏱️", title: "Mais tempo", desc: "Abra uma dinâmica pronta e pare de perder tempo criando atividades novas toda semana." },
    { icon: "🔄", title: "Mais variedade", desc: "Alterne entre 50 opções e evite repetir sempre o mesmo aquecimento." },
    { icon: "📋", title: "Mais organização", desc: "Escolha por equipe, objetivo, formato de participação e tempo disponível." },
    { icon: "💼", title: "Mais engajamento", desc: "Dinâmicas pensadas para envolver até os colaboradores mais resistentes." },
  ] },
  urgency: { pill: "OPORTUNIDADE ÚNICA", title: "Leve sempre uma dinâmica pronta para a próxima sessão", highlight: "", body: "Você já domina a parte técnica. Falta um repertório pronto para escolher, abrir e aplicar com facilidade.", ctaText: "QUERO ACESSAR AGORA", trust: ["ACESSO IMEDIATO • ACESSO VITALÍCIO"] },
  idealPara: { pill: "É PARA VOCÊ", title: "Este material é ideal para professores de ginástica laboral que desejam:", subtitle: "Mais repertório, menos planejamento e sessões mais dinâmicas nas empresas.", items: [
    { icon: "🏢", title: "Atender equipes", desc: "Ter opções para colaboradores administrativos e operacionais." }, { icon: "⚡", title: "Ganhar agilidade", desc: "Preparar a atividade em poucos minutos antes do atendimento." }, { icon: "🧩", title: "Variar sessões", desc: "Escolher objetivos e formatos sem repetir a mesma dinâmica." }, { icon: "✅", title: "Conduzir com segurança", desc: "Ter um passo a passo claro para aplicar em cada empresa." },
  ] },
  deliverables: { ...psicopedagogiaOffer.deliverables, pill: "ACESSO IMEDIATO", title: "Tudo o que você vai receber", image: laboralImage(psicopedagogiaOffer.deliverables.image), imageAlt: "Dinâmicas Laborais Prontas", bullets: ["50 dinâmicas completas de ginástica laboral", "25 dinâmicas para equipe administrativa", "25 dinâmicas para equipe operacional", "Dinâmicas de 5, 10 e 15 minutos", "Objetivo, formato de participação e passo a passo de cada dinâmica", "Comandos de condução e sugestões de adaptação", "PDFs para celular, tablet, computador ou impressão"] },
  bonusSection: { ...psicopedagogiaOffer.bonusSection, pill: "EXTRAS INCLUÍDOS", titleLead: "6 BÔNUS", titleHighlight: "EXCLUSIVOS", subtitle: "No Plano Completo, você recebe materiais extras para planejar, conduzir e encerrar seus atendimentos com dinâmica e exercício físico." },
  bonuses: psicopedagogiaOffer.bonuses.map((bonus, index) => ({ ...bonus, front: laboralImage(bonus.front), back: laboralImage(bonus.back), ...bonuses[index] })),
  pricing: { titleLead: "ESCOLHA O PLANO", titleHighlight: "IDEAL PARA VOCÊ", plans: [
    { ...psicopedagogiaOffer.pricing.plans[0], title: "Plano Básico", image: laboralImage(psicopedagogiaOffer.pricing.plans[0].image), imageAlt: "Plano Básico de Dinâmicas Laborais", oldPrice: "de R$ 39,90", price: "R$ 17,90", installments: "ou 4x de R$ 4,47 no cartão", items: ["50 dinâmicas de ginástica laboral prontas", "25 dinâmicas administrativas e 25 operacionais", "Dinâmicas de 5, 10 e 15 minutos", "Arquivos em PDF para consulta e impressão"], mutedItems: ["Não inclui os bônus do Plano Completo"], ctaText: "QUERO O PLANO BÁSICO", ctaHref: "https://pay.hotmart.com/T106774776N?checkoutMode=10" },
    { ...psicopedagogiaOffer.pricing.plans[1], title: "Plano Completo", image: laboralImage(psicopedagogiaOffer.pricing.plans[1].image), imageAlt: "Plano Completo de Dinâmicas Laborais", oldPrice: "de R$ 147,00", price: "R$ 27,90", installments: "ou 4x de R$ 6,97 no cartão", items: ["50 dinâmicas de ginástica laboral prontas", ...bonuses.map(({ title }) => `🎁 ${title}`), "Acesso imediato e vitalício"], ctaText: "QUERO O PLANO COMPLETO", ctaHref: "https://pay.hotmart.com/L106774881O?checkoutMode=10" },
  ] },
  guarantee: { ...psicopedagogiaOffer.guarantee, icon: laboralImage(psicopedagogiaOffer.guarantee.icon), marqueeText: "GARANTIA 30 DIAS ✦ RISCO ZERO ✦ SATISFAÇÃO OU DINHEIRO DE VOLTA ✦ ", marqueeGradient: "linear-gradient(90deg, var(--brand) 0%, var(--brand-deep) 100%)", body: "Você tem **30 dias de garantia** para conhecer as Dinâmicas Laborais Prontas. Se o material não atender às suas necessidades, pode solicitar o reembolso dentro desse período." },
  access: { title: "Como você vai receber suas Dinâmicas Laborais Prontas", steps: [
    { num: "01", title: "Conclua sua compra", desc: "Após o pagamento, seu acesso é liberado automaticamente." }, { num: "02", title: "Receba no e-mail", desc: "As instruções chegam no e-mail cadastrado na compra." }, { num: "03", title: "Acesse os PDFs", desc: "Tudo organizado para consultar no celular, tablet ou computador." }, { num: "04", title: "Escolha e aplique", desc: "Identifique a equipe, o objetivo e o tempo disponível. Depois, é só abrir a dinâmica." },
  ] },
  faq: { title: "Perguntas Frequentes", items: [
    { q: "Como vou receber as dinâmicas?", a: "Após a confirmação da compra, você recebe o acesso digital aos arquivos em PDF." }, { q: "As dinâmicas servem para quais equipes?", a: "Você recebe 25 dinâmicas para equipes administrativas e 25 para equipes operacionais." }, { q: "Quais durações estão disponíveis?", a: "Há dinâmicas de 5, 10 e 15 minutos para se adaptar ao tempo da empresa." }, { q: "Preciso criar ou adaptar alguma coisa?", a: "Não. As dinâmicas já vêm prontas, com passo a passo, comandos e orientações para aplicar." }, { q: "E se eu não gostar?", a: "Você conta com 30 dias de garantia para avaliar o material." },
  ] },
  footer: { ...psicopedagogiaOffer.footer, updateTitle: "Material em constante atualização", updateBody: "As Dinâmicas Laborais Prontas recebem melhorias e correções periódicas. Ao adquirir agora, você garante acesso vitalício.", missionText: "Conduza sessões de ginástica laboral com mais variedade, organização e menos improviso" },
}
