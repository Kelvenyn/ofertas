import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const layoutPath = new URL("../src/app/psicopedagogia/layout.tsx", import.meta.url)

test("autoriza o tracker antes de carregar o script externo", async () => {
  const source = await readFile(layoutPath, "utf8")
  const grantIndex = source.indexOf('id="trackhub-autogrant"')
  const trackerIndex = source.indexOf('src="https://hub.universoeduk.com/tracker.js"')

  assert.notEqual(grantIndex, -1, "o layout deve preparar a autorização do tracker")
  assert.notEqual(trackerIndex, -1, "o layout deve carregar o tracker do HubTrack")
  assert.ok(grantIndex < trackerIndex, "a autorização deve ocorrer antes do tracker")
})
