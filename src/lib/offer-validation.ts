import { validatePaletteContrast } from "@/lib/color"
import type { OfferConfig, OfferPalette, SectionId } from "@/types/offer"

const PALETTE_KEYS: (keyof OfferPalette)[] = [
  "brand", "brandDeep", "brandInk", "brandDark", "brandLight", "brandSubtle",
  "cta", "ctaDeep", "ctaDarkest", "accent", "yellow", "bg", "bgAlt",
]

const SECTION_IDS: SectionId[] = [
  "countdown", "hero", "socialProof", "counter", "kit", "kitReversed", "benefits",
  "urgency", "deliverables", "bonuses", "pricing", "guarantee", "access", "faq", "footer",
]

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value)
const isText = (value: unknown): value is string => typeof value === "string"
const isList = (value: unknown): value is unknown[] => Array.isArray(value)

export function getOfferCopyIssues(value: unknown): string[] {
  if (!isRecord(value)) return ["A configuração da oferta é inválida."]
  const issues: string[] = []
  const hero = isRecord(value.hero) ? value.hero : {}
  const social = isRecord(value.socialProof) ? value.socialProof : {}
  const counter = isRecord(value.counter) ? value.counter : {}
  const kit = isRecord(value.kitCards) ? value.kitCards : {}
  const benefits = isRecord(value.benefits) ? value.benefits : {}
  const urgency = isRecord(value.urgency) ? value.urgency : {}
  const deliverables = isRecord(value.deliverables) ? value.deliverables : {}
  const bonusSection = isRecord(value.bonusSection) ? value.bonusSection : {}
  const pricing = isRecord(value.pricing) ? value.pricing : {}
  const guarantee = isRecord(value.guarantee) ? value.guarantee : {}
  const access = isRecord(value.access) ? value.access : {}
  const faq = isRecord(value.faq) ? value.faq : {}
  const footer = isRecord(value.footer) ? value.footer : {}

  const check = (label: string, text: unknown, max: number, singleLine = false) => {
    if (isText(text)) {
      if (text.length > max) issues.push(`${label}: ${text.length}/${max} caracteres.`)
      if (/[\u2010-\u2015\u2212-]/u.test(text)) issues.push(`${label}: use espaço no lugar de hífen ou travessão.`)
      if (singleLine && /[\r\n]/u.test(text)) issues.push(`${label}: mantenha o botão em uma linha.`)
    }
  }
  const list = (label: string, entries: unknown, min: number, max: number) => {
    if (!isList(entries)) {
      issues.push(`${label}: lista inválida.`)
      return []
    }
    if (entries.length < min || entries.length > max) issues.push(`${label}: ${entries.length} itens; use de ${min} a ${max}.`)
    return entries
  }

  check("Hero: pill", hero.pill, 30)
  check("Hero: headline", isText(hero.headline) ? hero.headline.replace(/\n/g, "") : hero.headline, 70)
  check("Hero: subline", hero.subline, 70)
  check("Hero: apoio", hero.support, 160)
  const heroBullets = list("Hero: bullets", hero.bullets, 4, 4)
  heroBullets.forEach((item, index) => check(`Hero: bullet ${index + 1}`, item, 34))
  check("Hero: botão", hero.ctaText, 34, true)
  check("Hero: marquee", hero.marqueeText, 70)

  check("Prova social: título", social.title, 48)
  list("Prova social: depoimentos", social.testimonials, 0, 7)
  check("Contador: prefixo", counter.prefix, 8)
  check("Contador: rótulo", counter.label, 44)
  check("Kit: título", kit.heading, 48)
  list("Kit: imagens", kit.images, 10, 18)

  check("Benefícios: título", benefits.title, 48)
  const benefitItems = list("Benefícios: cards", benefits.items, 4, 4)
  check("Benefícios: botão", benefits.ctaText, 34, true)
  benefitItems.forEach((raw, index) => {
    const item = isRecord(raw) ? raw : {}
    check(`Benefício ${index + 1}: título`, item.title, 32)
    check(`Benefício ${index + 1}: descrição`, item.desc, 100)
  })

  check("Urgência: título", urgency.title, 60)
  check("Urgência: corpo", urgency.body, 140)
  check("Urgência: botão", urgency.ctaText, 34, true)
  const trust = list("Urgência: selos", urgency.trust, 1, 3)
  trust.forEach((item, index) => check(`Urgência: selo ${index + 1}`, item, 30))
  check("Entregáveis: título", deliverables.title, 48)
  const deliveryItems = list("Entregáveis: bullets", deliverables.bullets, 6, 10)
  deliveryItems.forEach((item, index) => check(`Entregáveis: bullet ${index + 1}`, item, 60))

  check("Bônus: título", `${String(bonusSection.titleLead ?? "")} ${String(bonusSection.titleHighlight ?? "")}`.trim(), 48)
  check("Bônus: subtítulo", bonusSection.subtitle, 140)
  const bonuses = list("Bônus", value.bonuses, 0, 6)
  bonuses.forEach((raw, index) => {
    const item = isRecord(raw) ? raw : {}
    check(`Bônus ${index + 1}: descrição`, item.desc, 120)
    if (isText(item.titleBreak) && item.titleBreak.split("\n").length > 2) issues.push(`Bônus ${index + 1}: título passa de duas linhas.`)
  })

  check("Planos: título", `${String(pricing.titleLead ?? "")} ${String(pricing.titleHighlight ?? "")}`.trim(), 48)
  const plans = list("Planos", pricing.plans, 1, 2)
  plans.forEach((raw, index) => {
    const plan = isRecord(raw) ? raw : {}
    check(`Plano ${index + 1}: título`, plan.title, 34)
    const expected = String(plan.id ?? "").toLowerCase().includes("basic") ? 6 : 8
    const items = list(`Plano ${index + 1}: itens`, plan.items, expected, expected)
    items.forEach((item, itemIndex) => check(`Plano ${index + 1}: item ${itemIndex + 1}`, item, 60))
  })
  check("Planos: nota", pricing.note, 160)
  check("Garantia: título", guarantee.title, 50)
  check("Garantia: corpo", guarantee.body, 200)

  check("Acesso: título", access.title, 48)
  const steps = list("Acesso: passos", access.steps, 4, 4)
  check("Acesso: botão", access.ctaText, 34, true)
  steps.forEach((raw, index) => {
    const step = isRecord(raw) ? raw : {}
    check(`Acesso: passo ${index + 1} título`, step.title, 30)
    check(`Acesso: passo ${index + 1} descrição`, step.desc, 90)
  })

  check("FAQ: título", faq.title, 48)
  const questions = list("FAQ", faq.items, 5, 5)
  questions.forEach((raw, index) => {
    const item = isRecord(raw) ? raw : {}
    check(`FAQ ${index + 1}: pergunta`, item.q, 70)
    check(`FAQ ${index + 1}: resposta`, item.a, 200)
  })
  check("Rodapé: título", footer.updateTitle, 50)
  check("Rodapé: aviso", footer.updateBody, 160)
  return issues
}

export function validateOfferConfig(value: unknown): { offer?: OfferConfig; errors: string[] } {
  if (!isRecord(value)) return { errors: ["A configuração da oferta é inválida."] }
  const errors: string[] = []
  const offer = value as unknown as OfferConfig

  if (!isRecord(value.meta) || !isText(value.meta.title) || !isText(value.meta.description)) errors.push("Metadados inválidos.")
  const palette = value.palette
  if (!isRecord(palette)) errors.push("Paleta inválida.")
  else {
    for (const key of PALETTE_KEYS) {
      const color = palette[key]
      if (!isText(color) || !/^#[0-9a-f]{6}$/i.test(color)) errors.push(`Cor inválida: ${key}.`)
    }
    if (PALETTE_KEYS.every((key) => isText(palette[key]) && /^#[0-9a-f]{6}$/i.test(palette[key] as string))) {
      errors.push(...validatePaletteContrast(palette as unknown as OfferPalette).map((item) => `Contraste ${item.pair}: ${item.ratio.toFixed(2)}:1.`))
    }
  }
  if (offer.orientation !== "portrait" && offer.orientation !== "landscape") errors.push("Orientação inválida.")
  if (value.paletteCandidates !== undefined) {
    if (!isList(value.paletteCandidates) || value.paletteCandidates.length !== 10) errors.push("São necessárias dez paletas candidatas.")
    else value.paletteCandidates.forEach((palette, index) => {
      if (!isRecord(palette) || PALETTE_KEYS.some((key) => !isText(palette[key]) || !/^#[0-9a-f]{6}$/i.test(palette[key] as string))) {
        errors.push(`Paleta candidata ${index + 1} inválida.`)
      } else if (validatePaletteContrast(palette as unknown as OfferPalette).length) {
        errors.push(`Paleta candidata ${index + 1} não atinge contraste WCAG AA.`)
      }
    })
  }
  if (value.sections !== undefined) {
    if (!isRecord(value.sections)) errors.push("Seções inválidas.")
    else for (const [id, enabled] of Object.entries(value.sections)) {
      if (!SECTION_IDS.includes(id as SectionId) || typeof enabled !== "boolean") errors.push(`Configuração de seção inválida: ${id}.`)
    }
  }
  if (!isRecord(value.hero) || !isRecord(value.socialProof) || !isRecord(value.counter) || !isRecord(value.kitCards) ||
      !isRecord(value.benefits) || !isRecord(value.urgency) || !isRecord(value.deliverables) || !isRecord(value.bonusSection) ||
      !isRecord(value.pricing) || !isRecord(value.guarantee) || !isRecord(value.access) || !isRecord(value.faq) || !isRecord(value.footer) ||
      !isList(value.bonuses)) errors.push("Faltam blocos obrigatórios do contrato OfferConfig.")
  errors.push(...getOfferCopyIssues(value))
  return errors.length ? { errors } : { offer, errors }
}
