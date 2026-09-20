import test from "node:test"
import assert from "node:assert/strict"
import { calculateDiscountPercentage } from "../src/lib/pricing.ts"

test("desconto usa preço de ancoragem e arredonda a porcentagem", () => {
  assert.equal(calculateDiscountPercentage("de R$ 39,90", "R$ 17,90"), 55)
  assert.equal(calculateDiscountPercentage("de R$ 147,00", "R$ 27,90"), 81)
  assert.equal(calculateDiscountPercentage("R$ 100,00", "R$ 49,50"), 51)
})

test("não mostra desconto quando os preços são inválidos ou o atual não é menor", () => {
  assert.equal(calculateDiscountPercentage("", "R$ 17,90"), 0)
  assert.equal(calculateDiscountPercentage("R$ 39,90", "R$ 0,00"), 0)
  assert.equal(calculateDiscountPercentage("R$ 39,90", "R$ 39,90"), 0)
  assert.equal(calculateDiscountPercentage("R$ 39,90", "R$ 45,00"), 0)
})
