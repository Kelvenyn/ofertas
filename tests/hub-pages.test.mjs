import assert from "node:assert/strict"
import { createHmac } from "node:crypto"
import path from "node:path"
import test from "node:test"
import { createJiti } from "jiti"

const jiti = createJiti(import.meta.url, { alias: { "@": path.resolve("src"), "server-only": path.resolve("tests/helpers/server-only.mjs") } })
const { snapshotToOverrides, snapshotSettings, renderableOffer } = await jiti.import("../src/lib/hub-pages-domain.ts")
const { mergeOperationalCatalog, resolveOperationalOfferRecord } = await jiti.import("../src/lib/operational-catalog-domain.ts")
const { getOfferConfig } = await jiti.import("../src/config/offers/index.ts")
const { isValidHubPreviewToken } = await jiti.import("../src/lib/hub-preview-token.ts")

const base = () => structuredClone(getOfferConfig("psicopedagogia"))
const page = (fields) => ({ id: "7f1c2b2e-1d0a-4c1b-9a51-0a8f5f8a3c11", legacyId: null, templateId: null, slug: "x", label: "X", status: "active", favicon: null, cashflow: null, version: 1, offer: base(), ...fields })
const snapshot = (pages) => ({ schemaVersion: 1, generatedAt: "2026-10-27T00:00:00Z", settings: { typographySize: "G", imageSize: "P" }, pages })

test("uma página legada do hub substitui o offer.ts e pode mudar de endereço", () => {
  const offer = base(); offer.hero.subline = "Subline vinda do hub"
  const overrides = snapshotToOverrides(snapshot([page({ legacyId: "psicopedagogia", slug: "mapa-perfil", offer })]))
  const catalog = mergeOperationalCatalog(overrides)
  const record = resolveOperationalOfferRecord("mapa-perfil", catalog, overrides)
  assert.equal(record.entry.id, "psicopedagogia")
  assert.equal(record.offer.hero.subline, "Subline vinda do hub")
  assert.equal(resolveOperationalOfferRecord("psicopedagogia", catalog, overrides), undefined)
})

test("legada desativada ou arquivada esconde a rota estática; ausente cai no offer.ts", () => {
  const overrides = snapshotToOverrides(snapshot([page({ legacyId: "alicate", slug: "alicate", status: "inactive", offer: null })]))
  const catalog = mergeOperationalCatalog(overrides)
  assert.equal(catalog.offers.alicate.status, "inactive")
  assert.equal(catalog.offers.box.status, "active")
  assert.deepEqual(resolveOperationalOfferRecord("box", catalog, overrides).offer, getOfferConfig("box"))
})

test("página nova do hub entra só publicada, sem roubar rota original", () => {
  const draft = snapshotToOverrides(snapshot([page({ slug: "nova", status: "draft", offer: null })]))
  assert.deepEqual(draft, {})
  const live = snapshotToOverrides(snapshot([page({ slug: "nova" })]))
  assert.equal(mergeOperationalCatalog(live).offers.nova.templateId, "psicopedagogia")
  assert.deepEqual(snapshotToOverrides(snapshot([page({ slug: "alicate" })])), {})
})

test("configuração quebrada não vai ao ar; copy acima do limite já publicada continua", () => {
  const broken = base(); broken.hero.image = "https://evil.example.com/x.png"
  assert.equal(renderableOffer(broken), undefined)
  const legacy = snapshotToOverrides(snapshot([page({ legacyId: "box", slug: "box", offer: broken })]))
  assert.equal(legacy.box.status, "inactive")
  const long = base(); long.bonuses[0].desc = "x".repeat(130)
  assert.ok(renderableOffer(long))
  assert.deepEqual(snapshotSettings(snapshot([])), { typographySize: "G", imageSize: "P" })
})

test("a prévia só abre com o token assinado pelo hub e dentro da validade", () => {
  process.env.PAGES_SITE_TOKEN = "segredo-de-teste"
  const id = "7f1c2b2e-1d0a-4c1b-9a51-0a8f5f8a3c11"
  const sign = (expires) => `${expires}.${createHmac("sha256", "segredo-de-teste").update(`preview.${id}.${expires}`).digest("base64url")}`
  const now = Date.now(), future = Math.floor(now / 1000) + 60
  assert.equal(isValidHubPreviewToken(id, sign(future), now), true)
  assert.equal(isValidHubPreviewToken(id, sign(future - 120), now), false)
  assert.equal(isValidHubPreviewToken("outro-id", sign(future), now), false)
  assert.equal(isValidHubPreviewToken(id, undefined, now), false)
})

test("a ordem das seções do meio vem da página e completa as que faltam na ordem padrão", async () => {
  const { orderedSections, MOVABLE_SECTION_IDS } = await jiti.import("../src/types/offer.ts")
  assert.deepEqual(orderedSections(undefined), [...MOVABLE_SECTION_IDS])
  const order = orderedSections(["pricing", "faq", "pricing", "hero", "nada"])
  assert.deepEqual(order.slice(0, 3), ["pricing", "faq", "socialProof"])
  assert.equal(order.length, MOVABLE_SECTION_IDS.length)
  const { validateOfferConfig } = await jiti.import("../src/lib/offer-validation.ts")
  const offer = base()
  assert.deepEqual(validateOfferConfig({ ...offer, sectionOrder: ["pricing", "faq"] }).errors, [])
  assert.ok(validateOfferConfig({ ...offer, sectionOrder: ["hero"] }).errors.includes("Ordem das seções inválida."))
})
