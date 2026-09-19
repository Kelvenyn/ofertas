import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const source = await readFile(new URL("../src/config/offers/palettes.ts", import.meta.url), "utf8")

function luminance(hex) {
  const channels = [1, 3, 5]
    .map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255)
    .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function contrast(foreground, background) {
  const first = luminance(foreground)
  const second = luminance(background)
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
}

function color(line, name) {
  const value = line.match(new RegExp(`${name}: "(#[A-Fa-f0-9]{6})"`))?.[1]
  assert.ok(value, `token ausente: ${name}`)
  return value
}

test("as dez paletas mantêm combinações de texto em WCAG AA", () => {
  const entries = [...source.matchAll(/^  (?:(?:"([^"]+)")|([a-z][a-z0-9-]*)): \{\r?\n    label: "[^"]+",\r?\n    colors: \{([^\n]+)\},/gm)]
  assert.equal(entries.length, 10)

  for (const entry of entries) {
    const key = entry[1] ?? entry[2]
    const colors = entry[3]
    const pairs = [
      [color(colors, "brand"), "#FFFFFF", "branco sobre brand"],
      [color(colors, "brandDeep"), "#FFFFFF", "branco sobre brandDeep"],
      [color(colors, "brandInk"), color(colors, "bg"), "brandInk sobre bg"],
      [color(colors, "brandInk"), color(colors, "brandSubtle"), "brandInk sobre brandSubtle"],
    ]
    for (const [foreground, background, label] of pairs) {
      assert.ok(contrast(foreground, background) >= 4.5, `${key}: ${label}`)
    }
  }

  assert.ok(contrast("#FFFFFF", "#11863D") >= 4.5, "texto branco no início do CTA")
  assert.ok(contrast("#FFFFFF", "#0E6B31") >= 4.5, "texto branco no fim do CTA")
})
