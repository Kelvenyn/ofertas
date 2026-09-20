import assert from "node:assert/strict"
import test from "node:test"
import path from "node:path"
import { createJiti } from "jiti"
import { OFFER as higienizacaoBase } from "../src/config/offers/higienizacao/offer.ts"
import { generatePaletteCandidates, repairPaletteContrast, validatePaletteContrast } from "../src/lib/color.ts"
import {
  applyOfferCatalogPatch,
  findOfferBySlug,
  getActiveFallbackSlug,
  getCheckoutSummary,
  getOfferRevalidationPaths,
  migrateLegacyOffer,
  OfferRoutingError,
  validateOfferSlug,
} from "../src/lib/offer-routing.ts"

const jiti = createJiti(import.meta.url, { alias: { "@": path.resolve("src") } })
const { validateOfferConfig } = await jiti.import("../src/lib/offer-validation.ts")

const originalIds = ["alicate", "box"]
const initialCatalog = () => ({
  alicate: { id: "alicate", slug: "alicate", status: "active", label: "Alicate" },
  box: { id: "box", slug: "box", status: "active", label: "Box" },
})

test("renomear e desativar a oferta remove o slug antigo e mantém identidade estável", () => {
  const changed = applyOfferCatalogPatch(initialCatalog(), "alicate", {
    slug: "alicate-profissional",
    status: "inactive",
  }, originalIds)

  assert.equal(changed.entry.id, "alicate")
  assert.equal(changed.entry.slug, "alicate-profissional")
  assert.equal(changed.entry.status, "inactive")
  assert.equal(changed.previousSlug, "alicate")
  assert.equal(findOfferBySlug(changed.entries, "alicate"), undefined)
  assert.equal(findOfferBySlug(changed.entries, "alicate-profissional")?.id, "alicate")
})

test("reativar uma oferta mantém sua nova slug canônica", () => {
  const renamed = applyOfferCatalogPatch(initialCatalog(), "alicate", { slug: "mapa-eletrico" }, originalIds)
  const activated = applyOfferCatalogPatch(renamed.entries, "mapa-eletrico", { status: "active" }, originalIds)

  assert.equal(activated.entry.status, "active")
  assert.equal(findOfferBySlug(activated.entries, "alicate"), undefined)
  assert.equal(findOfferBySlug(activated.entries, "mapa-eletrico")?.id, "alicate")
})

test("404 escolhe a homepage ativa ou outra oferta ativa se a homepage estiver desativada", () => {
  const entries = initialCatalog()
  assert.equal(getActiveFallbackSlug("alicate", entries), "alicate")
  entries.alicate.status = "inactive"
  assert.equal(getActiveFallbackSlug("alicate", entries), "box")
  entries.box.status = "draft"
  assert.equal(getActiveFallbackSlug("alicate", entries), undefined)
})

test("migração de overrides v2 amplia cinco paletas para dez sem perder as já salvas", () => {
  const fallback = structuredClone(higienizacaoBase)
  fallback.bonuses = fallback.bonuses.map((bonus, index) => ({ ...bonus, desc: `Descrição nova concisa ${index + 1}.` }))
  const paletteCandidates = [repairPaletteContrast(fallback.palette)]
  for (let attempt = 0; paletteCandidates.length < 10 && attempt < 8; attempt += 1) {
    const candidates = generatePaletteCandidates(fallback.palette, {
      count: 10,
      seed: 333 + attempt * 104729,
      hueShifts: [-36, 36, -72, 72, 108, -108, 144, -144, 180, 0],
    })
    for (const candidate of candidates) {
      if (paletteCandidates.some((current) => current.brand === candidate.brand)) continue
      paletteCandidates.push(candidate)
      if (paletteCandidates.length === 10) break
    }
  }
  fallback.paletteCandidates = paletteCandidates

  const legacy = structuredClone(fallback)
  legacy.palette.brandDark = "#FFFFFF"
  legacy.paletteCandidates = paletteCandidates.slice(0, 5).map((palette, index) => index === 1 ? { ...palette, brandDark: "#FFFFFF" } : palette)
  legacy.bonuses = legacy.bonuses.map((bonus, index) => ({ ...bonus, title: `Título preservado ${index + 1}`, desc: "x".repeat(130 + index) }))
  legacy.hero.support = "Acesso por e-mail — sem improviso."
  legacy.bonuses[0].title = "Checklist Anti-Improviso"
  legacy.kitCards.images[0].src = "/images/higienizacao/demonstrativo-01.webp"

  const migrated = migrateLegacyOffer(legacy, fallback, repairPaletteContrast, 2)
  assert.equal(migrated.paletteCandidates.length, 10)
  assert.equal(migrated.paletteCandidates[0].brand, legacy.palette.brand)
  assert.equal(new Set(migrated.paletteCandidates.map((palette) => palette.brand)).size, 10)
  assert.ok(migrated.paletteCandidates.every((palette) => validatePaletteContrast(palette).length === 0))
  assert.equal(migrated.bonuses[0].title, "Checklist Anti Improviso")
  assert.equal(migrated.bonuses[0].desc, fallback.bonuses[0].desc)
  assert.equal(migrated.hero.support, "Acesso por email sem improviso.")
  assert.equal(migrated.kitCards.images[0].src, "/images/higienizacao/demonstrativo-01.webp")
  assert.deepEqual(validateOfferConfig(migrated).errors, [])
})

test("validador rejeita hífens e travessões em copy para manter a página padronizada", () => {
  const invalid = structuredClone(higienizacaoBase)
  invalid.hero.support = "Acesso por e-mail — sem improviso."
  assert.ok(validateOfferConfig(invalid).errors.some((issue) => issue.includes("use espaço no lugar de hífen ou travessão")))
})

test("CTAs da oferta respeitam limite de 34 caracteres e uma única linha", () => {
  const invalid = structuredClone(higienizacaoBase)
  invalid.benefits.ctaText = "X".repeat(35)
  invalid.urgency.ctaText = "Uma linha\nOutra linha"
  const issues = validateOfferConfig(invalid).errors
  assert.ok(issues.some((issue) => issue.includes("Benefícios: botão: 35/34")))
  assert.ok(issues.some((issue) => issue.includes("Urgência: botão: mantenha o botão em uma linha")))
})

test("configuração v3 inválida não recebe reparo de migração e continua fechada", () => {
  const invalid = structuredClone(higienizacaoBase)
  invalid.palette.brandDark = "#FFFFFF"
  invalid.paletteCandidates = Array.from({ length: 5 }, () => invalid.palette)
  invalid.bonuses[0].desc = "x".repeat(130)
  const normalized = migrateLegacyOffer(invalid, higienizacaoBase, repairPaletteContrast, 3)

  assert.equal(normalized, invalid)
  assert.equal(validateOfferConfig(normalized).errors.some((issue) => issue.includes("dez paletas")), true)
  assert.equal(validateOfferConfig(normalized).errors.some((issue) => issue.includes("Bônus 1: descrição")), true)
})

test("slug invalida, rota reservada, slug original alheia e duplicata recebem erro legível", () => {
  const entries = initialCatalog()
  assert.match(validateOfferSlug("Minha oferta", "alicate", entries, originalIds) ?? "", /letras minúsculas/)
  assert.match(validateOfferSlug("painel", "alicate", entries, originalIds) ?? "", /reservada/)
  assert.match(validateOfferSlug("box", "alicate", entries, originalIds) ?? "", /rota original/)
  assert.match(validateOfferSlug("nova-oferta", "alicate", {
    ...entries,
    outro: { id: "outro", slug: "nova-oferta" },
  }, originalIds) ?? "", /usada por outra oferta/)
})

test("status inválido e slug antiga usada como alias não passam", () => {
  assert.throws(
    () => applyOfferCatalogPatch(initialCatalog(), "alicate", { status: "paused" }, originalIds),
    (error) => error instanceof OfferRoutingError && error.statusCode === 400,
  )
  const changed = applyOfferCatalogPatch(initialCatalog(), "alicate", { slug: "nova-rota" }, originalIds)
  assert.equal(findOfferBySlug(changed.entries, "alicate"), undefined)
})

test("troca de slug invalida as rotas antiga, nova, seus previews e o painel", () => {
  const paths = getOfferRevalidationPaths("slug-antiga", "slug-nova")
  assert.deepEqual(paths, [
    "/painel",
    "/slug-antiga", "/slug-antiga/preview", "/slug-antiga/paleta", "/painel/slug-antiga",
    "/slug-nova", "/slug-nova/preview", "/slug-nova/paleta", "/painel/slug-nova",
  ])
})

test("ativação aceita um ou dois checkouts válidos e rejeita links incompletos ou inválidos", () => {
  assert.deepEqual(getCheckoutSummary({ pricing: { plans: [{ ctaHref: "https://pay.hotmart.com/A1" }] } }), { count: 1, valid: true })
  assert.deepEqual(getCheckoutSummary({ pricing: { plans: [
    { ctaHref: "https://pay.hotmart.com/A1" },
    { ctaHref: "https://pay.cakto.com.br/B2" },
  ] } }), { count: 2, valid: true })
  assert.equal(getCheckoutSummary({ pricing: { plans: [{ ctaHref: "https://pay.hotmart.com/A1" }, {}] } }).valid, false)
  assert.equal(getCheckoutSummary({ pricing: { plans: [{ ctaHref: "http://pay.hotmart.com/A1" }] } }).valid, false)
  assert.equal(getCheckoutSummary({ pricing: { plans: [
    { ctaHref: "https://pay.hotmart.com/A1" },
    { ctaHref: "https://pay.hotmart.com/B2" },
    { ctaHref: "https://pay.hotmart.com/C3" },
  ] } }).valid, false)
})
