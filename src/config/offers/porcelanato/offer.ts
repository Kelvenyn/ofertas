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
  hero: {
    ...base.hero,
    pill: "GUIA VISUAL DO PORCELANATO",
    titleLine1: "37 Cuidados Essenciais para",
    titleLine2: "Manter Seu Porcelanato Sempre Bonito,",
    titleLine3: "Sem Marcas e Bem Cuidado",
    image: "/images/porcelanato/Plano Completo.webp", imageAlt: "Guia Visual do Porcelanato", imageWidth: 1080, imageHeight: 1080,
    subtitle: "Tenha no celular um guia visual completo para descobrir como limpar, tirar manchas e o que evitar para cuidar bem do seu piso.",
    ctaText: "QUERO O GUIA AGORA",
    marqueeText: "PORCELANATO BONITO ✦ SEM MARCAS ✦ O QUE USAR ✦ COMO LIMPAR ✦ O QUE EVITAR ✦ BEM CUIDADO ✦ PORCELANATO BONITO ✦ SEM MARCAS ✦ O QUE USAR ✦ COMO LIMPAR ✦ O QUE EVITAR ✦ BEM CUIDADO",
    bullets: ["Identifique seu tipo de porcelanato", "Descubra o que pode e o que não pode usar no piso", "Aprenda a limpar sem deixar marcas depois que seca", "Evite erros que podem prejudicar a aparência do porcelanato"]
  },
  socialProof: {
    title: "Quem já usa o Guia Visual do Porcelanato recomenda",
    testimonials: base.socialProof.testimonials.map((item) => ({ ...item, src: image(item.src) }))
  },
  counter: { prefix: "+", target: 50, label: "Páginas passo a passo para você\ncuidar do seu Porcelanato" },
  kitCards: {
    heading1: "Veja por dentro o Guia Visual do Porcelanato",
    images: Array.from({ length: 15 }, (_, index) => ({
      src: `/images/porcelanato/Imagem (${index + 1}).webp`,
      alt: `Página ${index + 1} do Guia Visual do Porcelanato`,
      width: 1055,
      height: 1491
    }))
  },
  benefits: {
    title: "Não basta limpar. O porcelanato precisa parecer limpo depois que seca.", ctaText: "QUERO O GUIA AGORA",
    items: [
      { icon: "🧴", title: "Use o Produto Certo", desc: "Veja quais produtos pode usar, quais exigem cuidado e quais manter longe do porcelanato." },
      { icon: "🔎", title: "Conheça Seu Porcelanato", desc: "Identifique se o piso é polido, acetinado, fosco, amadeirado, antiderrapante ou outro tipo." },
      { icon: "🧽", title: "Limpe Sem Deixar Marcas", desc: "Use a quantidade certa e finalize sem resíduos, rastros ou aparência embaçada." },
      { icon: "✨", title: "Mantenha a Aparência Bonita", desc: "Conheça cuidados que preservam o acabamento no dia a dia." },
    ]
  },
  urgency: {
    title: "Você limpa seu porcelanato... mas quando ele seca parece que não ficou limpo de verdade?", highlight: "",
    body: "Pare de ficar testando coisas que você vê na internet, isso só vai estragar seu porcelanato que você tanto sonhou em ter.",
    ctaText: "QUERO O GUIA AGORA", trust: ["ACESSO IMEDIATO ✦ MATERIAL DIGITAL"]
  },
  deliverables: {
    ...base.deliverables, title: "TUDO O QUE VOCÊ VAI RECEBER", image: "/images/porcelanato/Plano Completo.webp", imageAlt: "Guia Visual do Porcelanato",
    bullets: ["Guia Visual do Porcelanato", "37 Cuidados para manter seu porcelanato mais bonito", "Identificação dos tipos de porcelanato", "Produtos que podem ou não ser usados no piso", "O jeito certo de limpar cada tipo de porcelanato", "Como evitar marcas e aparência embaçada depois da limpeza", "Soluções para sujeiras do dia a dia", "Guia de Consulta Rápida"]
  },
  bonusSection: {
    ...base.bonusSection, pill: "EXTRAS INCLUÍDOS", titleLead: "6 BÔNUS PARA DEIXAR SEU GUIA", titleHighlight: "AINDA MAIS COMPLETO",
    subtitle: "Além do Guia Visual do Porcelanato, escolhendo o Plano Completo você recebe estes 6 materiais adicionais.", cardImageAspect: "portrait"
  },
  bonuses: base.bonuses.map((bonus, index) => ({ ...bonus, front: image(bonus.front), back: image(bonus.back), title: bonusDetails[index][0], titleBreak: bonusDetails[index][1], desc: bonusDetails[index][2], price: "R$ 19,90" })),
  pricing: {
    titleLead: "ESCOLHA COMO VOCÊ", titleHighlight: "QUER RECEBER", note: "Os links de compra serão liberados em breve.",
    plans: [
      { ...base.pricing.plans[0], title: "Plano Básico", image: "/images/porcelanato/Plano Básico.webp", imageAlt: "Plano Básico do Guia Visual do Porcelanato", oldPrice: "", price: "R$ 17,90", installments: "ou 4x de R$ 4,47 no cartão", installmentsPosition: "abovePrice", items: ["Guia Visual do Porcelanato", "37 Cuidados Essenciais", "O que pode e o que não pode usar", "O jeito certo de limpar cada tipo", "Guia de consulta rápida", "Acesso após a confirmação da compra"], mutedItems: ["Não inclui os 6 bônus do Plano Completo."], ctaText: "QUERO BÁSICO", ctaHref: "https://pay.hotmart.com/H107326985E", ctaDisabled: false },
      { ...base.pricing.plans[1], title: "Plano Completo", image: "/images/porcelanato/Plano Completo.webp", imageAlt: "Plano Completo do Guia Visual do Porcelanato", oldPrice: "", price: "R$ 27,90", installments: "ou 4x de R$ 6,97 no cartão", installmentsPosition: "abovePrice", items: ["Guia Visual do Porcelanato", "37 Cuidados Essenciais", ...bonusDetails.map(([title], index) => `🎁 Bônus ${index + 1}: ${title}`), "Material digital", "Acesso após a confirmação da compra", "Consulte pelo celular, tablet ou computador"], ctaText: "QUERO COMPLETO", ctaHref: "https://pay.hotmart.com/U107327600E", ctaDisabled: false },
    ]
  },
  guarantee: {
    ...base.guarantee, marqueeText: "GARANTIA ✦ COMPRA SEGURA ✦ ACESSO IMEDIATO ✦ GARANTIA ✦ COMPRA SEGURA ✦ ACESSO IMEDIATO", icon: "/images/porcelanato/garantia-30-dias.webp", iconAlt: "Garantia de 30 dias", sealText: undefined,
    title: "Sua compra é segura", body: "Você pode conhecer o material com tranquilidade. Se decidir que ele não é para você, poderá solicitar o reembolso dentro do prazo de garantia da oferta."
  },
  access: {
    title: "Como você vai receber seu Guia Visual do Porcelanato", ctaText: "QUERO O GUIA AGORA",
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
      { q: "Como vou receber o Guia Visual do Porcelanato?", a: "Após a confirmação da compra, você recebe as informações necessárias para acessar o material digital." },
      { q: "O material é físico ou digital?", a: "O Guia Visual do Porcelanato é 100% digital. Você pode consultá-lo pelo celular, tablet ou computador." },
      { q: "Preciso entender de porcelanato?", a: "Não.\n\nO material foi pensado justamente para quem não quer se tornar especialista.\n\nVocê identifica seu piso, encontra a situação que precisa resolver e consulta a orientação correspondente." },
      { q: "E se eu não souber qual tipo de porcelanato tenho?", a: "O próprio guia possui uma seção visual para ajudar você a reconhecer os principais tipos de porcelanato antes de escolher como limpar." },
      { q: "O guia fala sobre produtos de limpeza?", a: "Sim.\n\nVocê encontra orientações sobre produtos comuns do dia a dia, com indicação do que pode ser utilizado, do que exige cuidado e do que deve ser evitado conforme a situação apresentada no material." },
      { q: "O que vem no Plano Completo?", a: "O Guia Visual do Porcelanato mais os 6 bônus: Manchas, Produtos Recomendados, Porcelanato sem Marcas, Utensílios, Cuidados e Crianças e Pets." },
      { q: "Posso consultar pelo celular enquanto estou limpando?", a: "Sim. A proposta do guia é justamente funcionar como um material rápido de consulta para usar sempre que surgir uma dúvida." },
      { q: "E se eu comprar e não gostar?", a: "Você poderá solicitar o reembolso dentro do prazo de garantia definido para a oferta." },
    ]
  },
  footer: { ...base.footer, showUpdate: false }
}
