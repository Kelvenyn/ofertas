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
    description: "Um guia visual para saber o que usar, como limpar e o que evitar sem estragar o porcelanato da sua casa.",
  },
  palette: {
    brand: "#0F766E", brandDeep: "#115E59", brandInk: "#16302B", brandDark: "#2BAA9A", brandLight: "#8BD5CA", brandSubtle: "#E6F5F2",
    cta: "#16A34A", ctaDeep: "#11863D", ctaDarkest: "#0E6B31", accent: "#D97706", yellow: "#F4B942", bg: "#F7FAF9", bgAlt: "#115E59",
  },
  hero: {
    ...base.hero,
    pill: "GUIA VISUAL DO PORCELANATO",
    titleLine1: "Guia Visual do Porcelanato",
    titleLine2: "saiba o que usar, como limpar",
    titleLine3: "e o que evitar sem estragar seu piso",
    image: "/images/porcelanato/Plano Completo.webp", imageAlt: "Guia Visual do Porcelanato", imageWidth: 1080, imageHeight: 1080,
    subtitle: "Tenha sempre à mão um guia visual para saber como cuidar do seu porcelanato sem precisar pesquisar toda vez ou ficar na dúvida sobre qual produto usar.",
    ctaText: "QUERO O GUIA VISUAL DO PORCELANATO",
    marqueeText: "TIPOS DE PORCELANATO ✦ O QUE PODE USAR ✦ COMO LIMPAR ✦ O QUE EVITAR ✦ ACESSO IMEDIATO ✦ ",
    marqueeGradient: "linear-gradient(90deg, #115E59 0%, #0F766E 45%, #2BAA9A 72%, #115E59 100%)",
    bullets: ["Identifique qual é o seu porcelanato", "Saiba o que pode e o que não pode usar", "Veja como limpar cada tipo", "Resolva as sujeiras comuns do dia a dia", "Consulte rapidamente sempre que tiver dúvida"],
  },
  socialProof: {
    title: "Se você tem porcelanato em casa, provavelmente já ficou com alguma dessas dúvidas:",
    testimonials: [],
    questions: ["Posso passar esse produto aqui?", "Por que o piso ficou marcado depois que eu limpei?", "Será que esse produto pode tirar o brilho?", "Meu porcelanato é polido ou acetinado?", "Qual é o jeito certo de limpar sem estragar?"],
    conclusion: "Com o Guia Visual do Porcelanato, você não precisa procurar uma resposta diferente na internet toda vez que surgir uma dúvida.",
  },
  counter: { prefix: "+ de", target: 5, label: "situações organizadas para\ncuidar do seu porcelanato" },
  kitCards: {
    heading1: "Veja por dentro o Guia Visual do Porcelanato",
    images: base.kitCards.images.map((item, index) => ({ ...item, src: image(item.src), alt: `Página ${index + 1} do Guia Visual do Porcelanato` })),
  },
  benefits: {
    title: "Por que o Guia Visual do Porcelanato facilita tanto a limpeza?", ctaText: "QUERO TER O GUIA NO MEU CELULAR",
    items: [
      { icon: "🧴", title: "Saiba o que usar", desc: "Veja de forma simples quais produtos podem ser usados no seu porcelanato e quais é melhor evitar." },
      { icon: "🧽", title: "Limpe do jeito certo", desc: "Encontre a orientação de limpeza de acordo com o tipo de porcelanato que você tem em casa." },
      { icon: "⚠️", title: "Evite erros", desc: "Pare de testar produtos sem saber se eles podem manchar, riscar ou prejudicar o acabamento." },
      { icon: "📱", title: "Consulte quando precisar", desc: "Abra o guia pelo celular e encontre rapidamente a orientação que precisa naquele momento." },
    ],
  },
  urgency: {
    pill: "CONSULTA RÁPIDA", title: "Pare de ficar na dúvida toda vez que for limpar o porcelanato", highlight: "",
    body: "Você não precisa decorar produtos, pesquisar várias opiniões ou testar uma misturinha diferente a cada problema. Abra o guia, encontre o seu porcelanato e veja o que fazer.",
    ctaText: "QUERO ACESSAR O GUIA AGORA", trust: ["ACESSO IMEDIATO ✦ MATERIAL DIGITAL ✦ CONSULTA PELO CELULAR"],
  },
  deliverables: {
    ...base.deliverables, pill: "⚡ ACESSO IMEDIATO", title: "TUDO O QUE VOCÊ VAI RECEBER", image: "/images/porcelanato/Plano Completo.webp", imageAlt: "Guia Visual do Porcelanato",
    bullets: ["Guia Visual do Porcelanato", "Identifique o seu porcelanato", "O que pode e o que não pode usar", "O jeito certo de limpar cada tipo", "Limpeza do dia a dia", "Guia de consulta rápida", "Material digital e visual", "Acesso liberado após a compra"],
  },
  bonusSection: {
    ...base.bonusSection, pill: "EXTRAS INCLUÍDOS", titleLead: "6 BÔNUS PARA DEIXAR SEU GUIA", titleHighlight: "AINDA MAIS COMPLETO",
    subtitle: "Além do Guia Visual do Porcelanato, escolhendo o Plano Completo você recebe estes 6 materiais adicionais.",
  },
  bonuses: base.bonuses.map((bonus, index) => ({ ...bonus, front: image(bonus.front), back: image(bonus.back), title: bonusDetails[index][0], titleBreak: bonusDetails[index][1], desc: bonusDetails[index][2], price: "R$ 19,90" })),
  pricing: {
    titleLead: "ESCOLHA COMO VOCÊ", titleHighlight: "QUER RECEBER", note: "Os links de compra serão liberados em breve.",
    plans: [
      { ...base.pricing.plans[0], title: "Plano Básico", image: "/images/porcelanato/Plano Básico.webp", imageAlt: "Plano Básico do Guia Visual do Porcelanato", oldPrice: "", price: "R$ 17,90", installments: "", items: ["Guia Visual do Porcelanato", "Identifique o seu porcelanato", "O que pode e o que não pode usar", "O jeito certo de limpar cada tipo", "Limpeza do dia a dia", "Guia de consulta rápida", "Material digital", "Acesso após a confirmação da compra"], mutedItems: ["Não inclui os 6 bônus do Plano Completo."], ctaText: "QUERO SOMENTE O GUIA", ctaHref: undefined, ctaDisabled: true },
      { ...base.pricing.plans[1], title: "Plano Completo", image: "/images/porcelanato/Plano Completo.webp", imageAlt: "Plano Completo do Guia Visual do Porcelanato", badgeText: "MAIS ESCOLHIDO", oldPrice: "", price: "R$ 27,90", installments: "", items: ["Guia Visual do Porcelanato", ...bonusDetails.map(([title], index) => `🎁 Bônus ${index + 1}: ${title}`), "Material digital", "Acesso após a confirmação da compra", "Consulte pelo celular, tablet ou computador"], ctaText: "QUERO O GUIA + TODOS OS BÔNUS", ctaHref: undefined, ctaDisabled: true },
    ],
  },
  guarantee: {
    ...base.guarantee, marqueeText: "GARANTIA ✦ COMPRA SEGURA ✦ ACESSO IMEDIATO ✦ ", marqueeGradient: "linear-gradient(90deg, #115E59 0%, #0F766E 50%, #2BAA9A 100%)", icon: "", iconAlt: "Compra segura", sealText: "COMPRA\nSEGURA",
    title: "Sua compra é segura", body: "Você pode conhecer o material com tranquilidade. Se decidir que ele não é para você, poderá solicitar o reembolso dentro do prazo de garantia da oferta.",
  },
  access: {
    title: "Como você vai receber seu Guia Visual do Porcelanato", ctaText: "QUERO ACESSAR O GUIA AGORA",
    steps: [
      { num: "01", title: "Faça sua compra", desc: "Escolha o Plano Básico ou Completo e conclua o pagamento." },
      { num: "02", title: "Receba seu acesso", desc: "Após a confirmação da compra, você recebe as informações de acesso ao material." },
      { num: "03", title: "Abra pelo celular", desc: "Acesse o Guia Visual do Porcelanato pelo celular, tablet ou computador." },
      { num: "04", title: "Consulte quando precisar", desc: "Surgiu uma dúvida durante a limpeza? Abra o guia, procure a situação e veja a orientação." },
    ],
  },
  faq: {
    title: "Perguntas Frequentes",
    items: [
      { q: "Como vou receber o Guia Visual do Porcelanato?", a: "O acesso ao material digital é liberado após a confirmação da sua compra." },
      { q: "O material é físico ou digital?", a: "É um material digital, feito para você consultar facilmente pelo celular, tablet ou computador." },
      { q: "Preciso entender de porcelanato?", a: "Não. O guia foi criado justamente para deixar as informações simples, visuais e fáceis de consultar." },
      { q: "E se eu não souber qual tipo de porcelanato tenho?", a: "O primeiro bloco do guia ajuda você a identificar os principais tipos e entender qual deles mais se parece com o seu." },
      { q: "O guia fala sobre produtos de limpeza?", a: "Sim. Você encontra uma tabela mostrando o que pode usar, quando ter cuidado e quais produtos é melhor evitar." },
      { q: "O que vem no Plano Completo?", a: "O Guia Visual do Porcelanato mais os 6 bônus: Manchas, Produtos Recomendados, Porcelanato sem Marcas, Utensílios, Cuidados e Crianças e Pets." },
      { q: "Posso consultar pelo celular enquanto estou limpando?", a: "Sim. A proposta do guia é justamente funcionar como um material rápido de consulta para usar sempre que surgir uma dúvida." },
      { q: "E se eu comprar e não gostar?", a: "Você poderá solicitar o reembolso dentro do prazo de garantia definido para a oferta." },
    ],
  },
  footer: { ...base.footer, showUpdate: false, missionText: "Saiba o que usar, como limpar e o que evitar no porcelanato da sua casa." },
}
