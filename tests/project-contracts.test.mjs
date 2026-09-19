import assert from "node:assert/strict"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { validateOffers } from "../scripts/validate-offers.mjs"

test("catálogo, checkouts, paletas e tracking obedecem aos contratos do projeto", async () => {
  const result = await validateOffers(fileURLToPath(new URL("..", import.meta.url)))
  assert.equal(result.offerCount, 15)
  assert.equal(result.paletteCount, 10)
  assert.deepEqual(result.errors, [])
  assert.equal(result.warnings.length, 8)
})
