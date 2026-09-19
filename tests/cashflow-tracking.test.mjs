import assert from "node:assert/strict"
import test from "node:test"
import { readFile } from "node:fs/promises"

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")

const cashflow = {
  alicate: "31f8a6d0-f4cf-42b5-a2e6-995f08c59ac4",
  higienizacao: "a4e2c680-4214-4804-90c8-a3d908dc103c",
  lavanderia: "858b9d0c-d3f7-4e71-a0b6-288817b6d656",
  tilapia: "b6f77b1d-115d-45ff-a9ee-b4ed79b73845",
  psicopedagogia: "da308c1d-8e9b-46c3-b9f4-5657d8f51335",
}

test("catálogo centraliza as ofertas Cashflow configuradas", async () => {
  const catalog = JSON.parse(await read("src/config/offers/catalog.json"))
  for (const [offer, offerId] of Object.entries(cashflow)) assert.equal(catalog.offers[offer].cashflow.offerId, offerId)
})

test("shell compartilhado preserva URL, atributos e estratégia do Cashflow", async () => {
  const layout = await read("src/components/OfferRouteLayout.tsx")
  for (const marker of ["cashflowScriptUrl(entry.cashflow)", "data-offer={entry.cashflow.offerId}", "data-nowprocket", 'data-no-minify="1"', 'data-no-optimize="1"', 'data-cfasync="false"', 'strategy="afterInteractive"']) {
    assert.ok(layout.includes(marker), `atributo ausente: ${marker}`)
  }
})
