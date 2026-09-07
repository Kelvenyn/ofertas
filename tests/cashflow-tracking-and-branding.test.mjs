import assert from "node:assert/strict"
import test from "node:test"
import { readFile } from "node:fs/promises"

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")

const tilapiaOffer = "b6f77b1d-115d-45ff-a9ee-b4ed79b73845"
const mapaOffer = "da308c1d-8e9b-46c3-b9f4-5657d8f51335"
const forbiddenBranding = /universo\s*eduk|universoeduk\.com|contatouniversoeduk@gmail\.com/i

test("Tilápia uses the Cashflow offer configured in the dashboard", async () => {
  const layout = await read("src/app/tilapia/layout.tsx")

  assert.match(layout, new RegExp(`o=${tilapiaOffer}`))
  assert.match(layout, new RegExp(`data-offer="${tilapiaOffer}"`))
})

test("Mapa de Perfil keeps its configured Cashflow offer", async () => {
  const layout = await read("src/app/psicopedagogia/layout.tsx")

  assert.match(layout, new RegExp(`o=${mapaOffer}`))
  assert.match(layout, new RegExp(`data-offer="${mapaOffer}"`))
})

test("the pricing component does not depend on the retired Hub tracker", async () => {
  const pricing = await read("src/components/sections/OfferPricing.tsx")

  assert.doesNotMatch(pricing, /trackhub|trackEvent/)
})

for (const [offer, privacyPath, termsPath] of [
  ["tilapia", "/tilapia/politica-de-privacidade", "/tilapia/termos-de-uso"],
  ["psicopedagogia", "/psicopedagogia/politica-de-privacidade", "/psicopedagogia/termos-de-uso"],
]) {
  test(`${offer} uses legal pages without Universo Eduk branding`, async () => {
    const config = await read(`src/config/offers/${offer}/offer.ts`)
    const privacy = await read(`src/app/${offer}/politica-de-privacidade/page.tsx`)
    const terms = await read(`src/app/${offer}/termos-de-uso/page.tsx`)

    assert.match(config, new RegExp(`privacyUrl: "${privacyPath}"`))
    assert.match(config, new RegExp(`termsUrl: "${termsPath}"`))
    assert.doesNotMatch(privacy, forbiddenBranding)
    assert.doesNotMatch(terms, forbiddenBranding)
    assert.match(privacy, new RegExp(`backHref="/${offer}"`))
    assert.match(terms, new RegExp(`backHref="/${offer}"`))
  })
}
