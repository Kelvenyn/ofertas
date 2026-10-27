import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import postcss from "postcss"

const css = postcss.parse(await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8"))

function declarationsFor(selector) {
  const declarations = new Map()
  css.walkRules((rule) => {
    if (!rule.selector.split(",").map((entry) => entry.trim()).includes(selector)) return
    rule.walkDecls((declaration) => declarations.set(declaration.prop, declaration.value))
  })
  return declarations
}

test("deliverables artwork stays inside its card when the mobile image scale grows", () => {
  const image = declarationsFor(".tqvr-image")
  assert.equal(image.get("max-width"), "100%")
  assert.equal(image.get("box-sizing"), "border-box")
  assert.match(image.get("width"), /^min\(/)
  assert.match(image.get("width"), /100%/)
})

test("shared purchase buttons have slightly more width on every offer", () => {
  for (const selector of [
    ".benefits-cta-wrap .shiny-cta",
    ".urg-cta-wrap .shiny-cta",
    ".offer-btn.shiny-cta",
  ]) {
    assert.equal(declarationsFor(selector).get("width"), "min(100%, 340px)", selector)
  }
})
