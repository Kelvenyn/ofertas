import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import ts from "typescript"

async function compileTypeScriptModule(relativePath, replacements = []) {
  const path = new URL(relativePath, import.meta.url)
  const source = await readFile(path, "utf8")
  let javascript = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText
  for (const [search, replacement] of replacements) javascript = javascript.replaceAll(search, replacement)
  const encoded = Buffer.from(javascript).toString("base64")
  return `data:text/javascript;base64,${encoded}`
}

const colorModuleUrl = await compileTypeScriptModule("../src/lib/color.ts")
const colorModule = await import(colorModuleUrl)
const paletteModuleUrl = await compileTypeScriptModule("../src/config/offers/palettes.ts", [
  ['"@/lib/color"', JSON.stringify(colorModuleUrl)],
])
const palettesModule = await import(paletteModuleUrl)
const {
  contrastRatio,
  generatePaletteCandidates,
  hexToHsl,
  hslToRgb,
  hslToHex,
  isOfferPalette,
  parseHex,
  repairPaletteContrast,
  rgbToHsl,
  rgbToHex,
  shiftHue,
  validatePaletteContrast,
  withLightness,
} = colorModule
const { FIXED_ACTION_COLORS, PALETTES, getPalette, paletteCssVariables } = palettesModule

test("hex, RGB, HSL e luminância convertem cores corretamente", () => {
  assert.deepEqual(parseHex("#FF8000"), [255, 128, 0])
  assert.equal(rgbToHex(-12, 128.4, 300), "#0080FF")
  assert.equal(hslToHex(...hexToHsl("#12883E")), "#12883E")
  assert.deepEqual(hslToRgb(...rgbToHsl(18, 124, 207)).map(Math.round), [18, 124, 207])
  assert.equal(shiftHue("#12883E", 30), "#128879")
  assert.equal(withLightness("#12883E", 0), "#000000")
  assert.equal(contrastRatio("#FFFFFF", "#000000"), 21)
  assert.throws(() => parseHex("#12FG00"), /Cor inválida/)
})

test("reparo força os tokens de ação fixos e passa todos os pares reais em AA", () => {
  const invalid = {
    ...getPalette("cobalto"),
    brand: "#60A5FA",
    brandDeep: "#BFDBFE",
    brandInk: "#FFFFFF",
    brandDark: "#60A5FA",
    brandSubtle: "#CBD5E1",
    cta: "#16A34A",
  }

  assert.ok(validatePaletteContrast(invalid).length > 0)
  const repaired = repairPaletteContrast(invalid)
  assert.equal(isOfferPalette(repaired), true)
  for (const [token, color] of Object.entries(FIXED_ACTION_COLORS)) assert.equal(repaired[token], color)
  assert.deepEqual(validatePaletteContrast(repaired), [])
})

test("gerador retorna dez OfferPalette distintas, válidas e reproduzíveis por seed", () => {
  const base = getPalette("cobalto")
  const first = generatePaletteCandidates(base, { seed: 12345 })
  const repeated = generatePaletteCandidates(base, { seed: 12345 })
  const nextSeed = generatePaletteCandidates(base, { seed: 12346 })

  assert.equal(first.length, 10)
  assert.deepEqual(first, repeated)
  assert.notDeepEqual(first, nextSeed)
  assert.equal(new Set(first.map((palette) => JSON.stringify(palette))).size, 10)
  for (const palette of first) {
    assert.equal(isOfferPalette(palette), true)
    assert.deepEqual(validatePaletteContrast(palette), [])
    assert.equal(palette.cta, FIXED_ACTION_COLORS.cta)
    assert.equal(palette.ctaDeep, FIXED_ACTION_COLORS.ctaDeep)
    assert.equal(palette.ctaDarkest, FIXED_ACTION_COLORS.ctaDarkest)
  }
})

test("variáveis CSS reparam paletas de código antes dos gradientes com texto branco", () => {
  for (const { colors } of Object.values(PALETTES)) {
    const variables = paletteCssVariables(colors)
    assert.ok(contrastRatio("#FFFFFF", variables["--brand-dark"]) >= 4.5)
    assert.ok(contrastRatio("#FFFFFF", variables["--cta"]) >= 4.5)
    assert.equal(variables["--cta"], FIXED_ACTION_COLORS.cta)
  }
})

test("gerador rejeita limites que poderiam produzir listas não seguras", () => {
  assert.throws(() => generatePaletteCandidates(getPalette("cobalto"), { count: 11, seed: 1 }), RangeError)
  assert.throws(() => generatePaletteCandidates(getPalette("cobalto"), { seed: Number.NaN }), /seed/i)
})
