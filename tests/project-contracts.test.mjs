import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { validateOffers } from "../scripts/validate-offers.mjs"

test("catálogo, checkouts, paletas e tracking obedecem aos contratos do projeto", async () => {
  const result = await validateOffers(fileURLToPath(new URL("..", import.meta.url)))
  const catalog = JSON.parse(await readFile(new URL("../src/config/offers/catalog.json", import.meta.url), "utf8"))
  const offers = Object.values(catalog.offers)
  const activeOffers = offers.filter((offer) => offer.status !== "draft" && offer.status !== "inactive")
  assert.equal(result.offerCount, activeOffers.length)
  assert.equal(result.paletteCount, 10)
  assert.deepEqual(result.errors, [])
  // Só pendências operacionais de Cashflow são avisos; copy fora do limite bloqueia a validação.
  const configuredCashflow = activeOffers.filter((offer) => offer.cashflow?.workspaceId && offer.cashflow.offerId).length
  assert.equal(result.warnings.filter((w) => w.includes("tracking Cashflow")).length, activeOffers.length - configuredCashflow)
})
