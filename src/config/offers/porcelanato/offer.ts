import type { OfferConfig } from "@/types/offer"
import { OFFER as base } from "@/config/offers/psicopedagogia/offer"

const image = (src: string) => `/images/porcelanato/${src.split("/").pop()}`

const bonusDetails = [
  ["20 Manchas no Porcelanato", "20 Manchas no\nPorcelanato", "Descubra o que usar e como agir nas manchas mais comuns sem correr o risco de estragar o porcelanato."],
  ["Produtos Recomendados para Porcelanato", "Produtos Recomendados\npara Porcelanato", "Veja quais produtos vale ter em casa e quais opções usar em diferentes situações de limpeza do porcelanato."],
  ["Porcelanato sem Marcas", "Porcelanato\nsem Marcas", "Aprenda a limpar sem deixar rastros, manchas de pano, aparência embaçada ou marcas depois da limpeza."],
  ["Panos, Mops, Esponjas e Utensílios Certos", "Panos, Mops e\nUtensílios Certos", "Descubra quais utensílios usar no porcelanato e quais podem riscar, marcar ou prejudicar o acabamento."],
  ["15 Cuidados para Não Estragar o Porcelanato", "15 Cuidados para\nNão Estragar", "Conheça cuidados simples para evitar riscos, manchas, desgaste e outros erros comuns no dia a dia."],
  ["Porcelanato para Casa com Crianças e Pets", "Casa com\nCrianças e Pets", "Veja como cuidar do piso diante de pelos, patas, xixi, comida derramada e outras situações comuns dentro de casa."],
] as const

export const OFFER: OfferConfig = {
  ...base,
  meta: {
    title: "Guia Visual do Porcelanato",
    description: "Um guia visual para saber o que usar, como limpar e o que evitar sem estragar o porcelanato da sua casa."
  },
  palette: {
    brand: "#C2410C", brandDeep: "#9A3412", brandInk: "#431407", brandDark: "#EA580C", brandLight: "#FDBA74", brandSubtle: "#FFF7ED",
    cta: "#16A34A", ctaDeep: "#15803D", ctaDarkest: "#14532D", accent: "#B45309", yellow: "#F59E0B", bg: "#FFFBF7", bgAlt: "#9A3412"
  },
  orientation: "portrait",
  hero: {
    ...base.hero,
    pill: "GUIA VISUAL DO PORCELANATO",
    headline: "37 Cuidados para seu Porcelanato",
    subline: "Saiba o que usar, como limpar e o que evitar.",
    image: "/images/porcelanato/plano-completo.webp", imageAlt: "Guia Visual do Porcelanato",
    support: "Consulte o guia visual para limpar, lidar com manchas e cuidar do piso.",
    ctaText: "QUERO O GUIA",
    marqueeText: "PORCELANATO SEM MARCAS ✦ O QUE USAR ✦ COMO LIMPAR ✦ O QUE EVITAR",
    bullets: ["Identifique seu tipo de piso", "Veja o que pode usar no piso", "Limpe sem deixar marcas", "Cuide da aparência do porcelanato"]
  },
  socialProof: {
    title: "Quem usa o Guia Visual recomenda",
    testimonials: base.socialProof.testimonials.map((item) => ({ ...item, src: image(item.src) }))
  },
  counter: { prefix: "+", target: 50, label: "Páginas para cuidar do porcelanato" },
  kitCards: {
    heading: "Veja por dentro o Guia Visual do Porcelanato",
    images: Array.from({ length: 15 }, (_, index) => ({
      src: `/images/porcelanato/demonstrativo-${String(index + 1).padStart(2, "0")}.webp`,
      alt: `Página ${index + 1} do Guia Visual do Porcelanato`
    }))
  },
  benefits: {
    title: "Cuide do porcelanato depois de limpar", ctaText: "QUERO O GUIA",
    items: [
      { icon: "🧴", title: "Use o Produto Certo", desc: "Veja quais produtos pode usar, quais exigem cuidado e quais manter longe do porcelanato." },
      { icon: "🔎", title: "Conheça Seu Porcelanato", desc: "Identifique se o piso é polido, acetinado, fosco, amadeirado, antiderrapante ou outro tipo." },
      { icon: "🧽", title: "Limpe Sem Deixar Marcas", desc: "Dose o produto e finalize sem resíduos, rastros ou aparência embaçada." },
      { icon: "✨", title: "Mantenha a Aparência Bonita", desc: "Conheça cuidados que preservam o acabamento no dia a dia." },
    ]
  },
  urgency: {
    title: "O piso fica marcado depois de secar?", highlight: "",
    body: "O guia reúne orientações sobre produtos e métodos de limpeza para diferentes situações.",
    ctaText: "QUERO O GUIA", trust: ["ACESSO IMEDIATO", "MATERIAL DIGITAL"]
  },
  deliverables: {
    ...base.deliverables, title: "TUDO O QUE VOCÊ VAI RECEBER", image: "/images/porcelanato/plano-completo.webp", imageAlt: "Guia Visual do Porcelanato",
    bullets: ["Guia Visual do Porcelanato", "37 Cuidados para manter seu porcelanato mais bonito", "Identificação dos tipos de porcelanato", "Produtos que podem ou não ser usados no piso", "O jeito certo de limpar cada tipo de porcelanato", "Como evitar marcas e aparência embaçada depois da limpeza", "Soluções para sujeiras do dia a dia", "Guia de Consulta Rápida"]
  },
  bonusSection: {
    ...base.bonusSection, titleLead: "6 BÔNUS PARA DEIXAR SEU GUIA", titleHighlight: "AINDA MAIS COMPLETO",
    subtitle: "Além do Guia Visual do Porcelanato, escolhendo o Plano Completo você recebe estes 6 materiais adicionais."
  },
  bonuses: base.bonuses.map((bonus, index) => ({ ...bonus, front: image(bonus.front), back: image(bonus.back), title: bonusDetails[index][0], titleBreak: bonusDetails[index][1], desc: bonusDetails[index][2], price: "R$ 19,90" })),
  pricing: {
    titleLead: "ESCOLHA SEU PLANO", titleHighlight: "PARA O PORCELANATO", note: "Os links de compra serão liberados em breve.",
    plans: [
      { ...base.pricing.plans[0], title: "Plano Básico", image: "/images/porcelanato/plano-basico.webp", imageAlt: "Plano Básico do Guia Visual do Porcelanato", oldPrice: "", price: "R$ 17,90", installments: "ou 4x de R$ 4,47 no cartão", installmentsPosition: "abovePrice", items: ["Guia Visual do Porcelanato", "37 Cuidados Essenciais", "O que pode e o que não pode usar", "O jeito certo de limpar cada tipo", "Guia de consulta rápida", "Acesso após a confirmação da compra"], mutedItems: ["Não inclui os 6 bônus do Plano Completo."], ctaText: "QUERO BÁSICO", ctaHref: "https://pay.hotmart.com/H107326985E", ctaDisabled: false },
      { ...base.pricing.plans[1], title: "Plano Completo", image: "/images/porcelanato/plano-completo.webp", imageAlt: "Plano Completo do Guia Visual do Porcelanato", oldPrice: "", price: "R$ 27,90", installments: "ou 4x de R$ 6,97 no cartão", installmentsPosition: "abovePrice", items: ["Guia Visual do Porcelanato", "37 Cuidados Essenciais", "🎁 20 manchas no porcelanato", "🎁 Produtos recomendados para o piso", "🎁 Limpeza sem marcas", "🎁 Panos e utensílios corretos", "🎁 15 cuidados para evitar danos", "🎁 Cuidados com crianças e pets"], ctaText: "QUERO COMPLETO", ctaHref: "https://pay.hotmart.com/U107327600E", ctaDisabled: false },
    ]
  },
  guarantee: {
    ...base.guarantee, marqueeText: "GARANTIA 30 DIAS ✦ COMPRA SEGURA ✦ ACESSO IMEDIATO", icon: "/images/porcelanato/garantia.webp", iconAlt: "Garantia de 30 dias", sealText: undefined,
    title: "Sua compra é segura", body: "Você tem 30 dias para conhecer o guia. Se decidir que ele não é para você, pode solicitar o reembolso dentro desse prazo."
  },
  access: {
    title: "Como receber seu Guia Visual do Porcelanato", ctaText: "QUERO O GUIA",
    steps: [
      { title: "Faça sua compra", desc: "Escolha o Plano Básico ou Completo e conclua o pagamento." },
      { title: "Receba seu acesso", desc: "Após a confirmação da compra, você recebe as informações de acesso ao material." },
      { title: "Abra pelo celular", desc: "Acesse o Guia Visual do Porcelanato pelo celular, tablet ou computador." },
      { title: "Consulte quando precisar", desc: "Surgiu uma dúvida durante a limpeza? Abra o guia, procure a situação e veja a orientação." },
    ]
  },
  faq: {
    title: "Perguntas Frequentes",
    items: [
      { q: "O que vem no Plano Completo?", a: "O Guia Visual, 37 cuidados e seis bônus sobre manchas, produtos, limpeza sem marcas, utensílios, conservação e cuidados com crianças e pets." },
      { q: "Como recebo o guia?", a: "Após a confirmação da compra, você recebe as instruções de acesso por email. O material é digital e pode ser consultado no celular, tablet ou computador." },
      { q: "Preciso entender de porcelanato?", a: "Não é necessário ser especialista. O guia ajuda a identificar tipos de piso e consultar orientações de cuidado." },
      { q: "O guia fala sobre produtos de limpeza?", a: "Sim. Reúne orientações sobre produtos comuns, o que pode ser usado, o que exige cuidado e o que evitar." },
      { q: "Como funciona a garantia?", a: "Você tem 30 dias para solicitar o reembolso, conforme as condições da oferta." }
    ]
  },
  footer: { ...base.footer, showUpdate: false }
}
