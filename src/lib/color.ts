import type { OfferPalette } from "@/types/offer"

export const FIXED_ACTION_COLORS = {
  cta: "#12883E",
  ctaDeep: "#11863D",
  ctaDarkest: "#0E6B31",
} as const

export interface ContrastFailure {
  pair: string;
  foreground: string;
  background: string;
  ratio: number;
  required: number;
}

const PALETTE_COLOR_KEYS = [
  "brand", "brandDeep", "brandInk", "brandDark", "brandLight", "brandSubtle",
  "cta", "ctaDeep", "ctaDarkest", "accent", "yellow", "bg", "bgAlt",
] as const satisfies readonly (keyof OfferPalette)[]

export function isOfferPalette(value: unknown): value is OfferPalette {
  if (!value || typeof value !== "object") return false
  const palette = value as Record<string, unknown>
  return PALETTE_COLOR_KEYS.every((key) => typeof palette[key] === "string" && /^#[\da-f]{6}$/i.test(palette[key] as string))
}

function assertOfferPalette(value: unknown): asserts value is OfferPalette {
  if (!isOfferPalette(value)) throw new Error("Paleta inválida: são necessárias 13 cores hexadecimais no formato #RRGGBB.")
}

export function parseHex(hex: string): [number, number, number] {
  if (typeof hex !== "string") throw new Error(`Cor inválida: ${String(hex)}`)
  const clean = hex.replace(/^#/, "")
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) throw new Error(`Cor inválida: ${hex}`)
  return [
    Number.parseInt(clean.slice(0, 2), 16),
    Number.parseInt(clean.slice(2, 4), 16),
    Number.parseInt(clean.slice(4, 6), 16),
  ]
}

export function rgbToHex(r: number, g: number, b: number): string {
  if (![r, g, b].every(Number.isFinite)) throw new Error("Os canais RGB precisam ser números finitos.")
  const channel = (value: number) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0").toUpperCase()
  return `#${channel(r)}${channel(g)}${channel(b)}`
}

export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const lightness = (max + min) / 2
  if (max === min) return [0, 0, lightness]

  const delta = max - min
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)
  let hue = 0
  if (max === r) hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6
  else if (max === g) hue = ((b - r) / delta + 2) / 6
  else hue = ((r - g) / delta + 4) / 6
  return [hue * 360, saturation, lightness]
}

export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (![h, s, l].every(Number.isFinite)) throw new Error("Os canais HSL precisam ser números finitos.")
  h = ((h % 360) + 360) % 360 / 360
  s = Math.max(0, Math.min(1, s))
  l = Math.max(0, Math.min(1, l))
  if (s === 0) return [l * 255, l * 255, l * 255]

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const channel = (value: number) => {
    if (value < 0) value += 1
    if (value > 1) value -= 1
    if (value < 1 / 6) return p + (q - p) * 6 * value
    if (value < 1 / 2) return q
    if (value < 2 / 3) return p + (q - p) * (2 / 3 - value) * 6
    return p
  }
  return [channel(h + 1 / 3) * 255, channel(h) * 255, channel(h - 1 / 3) * 255]
}

export function hexToHsl(hex: string): [number, number, number] {
  return rgbToHsl(...parseHex(hex))
}

export function hslToHex(h: number, s: number, l: number): string {
  return rgbToHex(...hslToRgb(h, s, l))
}

export function shiftHue(hex: string, degrees: number): string {
  const [h, s, l] = hexToHsl(hex)
  return hslToHex(h + degrees, s, l)
}

export function withLightness(hex: string, lightness: number): string {
  const [h, s] = hexToHsl(hex)
  return hslToHex(h, s, lightness)
}

export function relativeLuminance(hex: string): number {
  const channels = parseHex(hex)
    .map((value) => value / 255)
    .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

export function contrastRatio(foreground: string, background: string): number {
  const first = relativeLuminance(foreground)
  const second = relativeLuminance(background)
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
}

// Pares usados pelo CSS compartilhado: texto branco em superfícies/gradientes,
// brand em fundo sutil, brandInk nos fundos claros e texto branco no CTA.
export function validatePaletteContrast(palette: OfferPalette): ContrastFailure[] {
  assertOfferPalette(palette)
  const failures: ContrastFailure[] = []
  const check = (pair: string, foreground: string, background: string, required = 4.5) => {
    const ratio = contrastRatio(foreground, background)
    if (ratio < required) failures.push({ pair, foreground, background, ratio, required })
  }

  check("branco sobre brand", "#FFFFFF", palette.brand)
  check("branco sobre brandDeep", "#FFFFFF", palette.brandDeep)
  check("branco sobre brandDark", "#FFFFFF", palette.brandDark)
  check("brand sobre brandSubtle", palette.brand, palette.brandSubtle)
  check("brandInk sobre bg", palette.brandInk, palette.bg)
  check("brandInk sobre brandSubtle", palette.brandInk, palette.brandSubtle)
  check("branco sobre CTA", "#FFFFFF", palette.cta)
  check("branco sobre ctaDeep", "#FFFFFF", palette.ctaDeep)
  check("branco sobre ctaDarkest", "#FFFFFF", palette.ctaDarkest)
  return failures
}

// Deterministic PRNG; callers can pass a fresh seed for a new reproducible set.
export function mulberry32(seed: number): () => number {
  if (!Number.isFinite(seed)) throw new Error("A seed da paleta precisa ser um número finito.")
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let value = Math.imul(state ^ (state >>> 15), 1 | state)
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function freshSeed(): number {
  const cryptoApi = globalThis.crypto
  if (cryptoApi?.getRandomValues) {
    const seed = new Uint32Array(1)
    cryptoApi.getRandomValues(seed)
    return seed[0]
  }
  return Math.floor(Math.random() * 0x1_0000_0000)
}

function buildCandidate(base: OfferPalette, brandHue: number, brandSat: number): OfferPalette {
  return {
    brand: hslToHex(brandHue, brandSat, 0.42),
    brandDeep: hslToHex(brandHue, Math.min(1, brandSat + 0.08), 0.28),
    brandInk: hslToHex(brandHue, Math.min(1, brandSat + 0.1), 0.16),
    brandDark: hslToHex(brandHue, brandSat, 0.36),
    brandLight: hslToHex(brandHue, 0.62, 0.78),
    brandSubtle: hslToHex(brandHue, 0.55, 0.95),
    ...FIXED_ACTION_COLORS,
    accent: hslToHex(brandHue + 42, 0.72, 0.48),
    yellow: hslToHex(brandHue + 42, 0.85, 0.62),
    bg: hslToHex(brandHue, 0.28, 0.985),
    bgAlt: hslToHex(brandHue, Math.min(1, brandSat + 0.08), 0.24),
  }
}

function repairWhiteOn(color: string): string {
  const [hue, saturation, initialLightness] = hexToHsl(color)
  let lightness = initialLightness
  for (let i = 0; i < 101 && contrastRatio("#FFFFFF", hslToHex(hue, saturation, lightness)) < 4.5; i += 1) {
    lightness = Math.max(0, lightness - 0.01)
  }
  const repaired = hslToHex(hue, saturation, lightness)
  if (contrastRatio("#FFFFFF", repaired) < 4.5) throw new Error(`Não foi possível ajustar o contraste de ${color}.`)
  return repaired
}

function repairTextOnBackground(text: string, background: string): string {
  if (contrastRatio(text, background) >= 4.5) return text
  const [hue, saturation, originalLightness] = hexToHsl(text)
  const targetLightness = relativeLuminance(text) <= relativeLuminance(background) ? 0 : 1
  const direction = targetLightness > originalLightness ? 1 : -1

  for (let step = 1; step <= 100; step += 1) {
    const lightness = originalLightness + direction * step / 100
    const candidate = hslToHex(hue, saturation, Math.max(0, Math.min(1, lightness)))
    if (contrastRatio(candidate, background) >= 4.5) return candidate
  }
  return targetLightness === 0 ? "#000000" : "#FFFFFF"
}

function repairBackgroundForForeground(foreground: string, background: string): string {
  if (contrastRatio(foreground, background) >= 4.5) return background
  const [hue, saturation, originalLightness] = hexToHsl(background)
  const targetLightness = relativeLuminance(background) >= relativeLuminance(foreground) ? 1 : 0
  const direction = targetLightness > originalLightness ? 1 : -1

  for (let step = 1; step <= 100; step += 1) {
    const lightness = originalLightness + direction * step / 100
    const candidate = hslToHex(hue, saturation, Math.max(0, Math.min(1, lightness)))
    if (contrastRatio(foreground, candidate) >= 4.5) return candidate
  }
  return targetLightness === 0 ? "#000000" : "#FFFFFF"
}

export function repairPaletteContrast(palette: OfferPalette): OfferPalette {
  assertOfferPalette(palette)
  const fixed: OfferPalette = { ...palette, ...FIXED_ACTION_COLORS }
  fixed.brand = repairWhiteOn(fixed.brand)
  fixed.brandDeep = repairWhiteOn(fixed.brandDeep)
  fixed.brandDark = repairWhiteOn(fixed.brandDark)
  fixed.brandInk = repairTextOnBackground(fixed.brandInk, "#FFFFFF")
  const lighterSubtleText = relativeLuminance(fixed.brand) >= relativeLuminance(fixed.brandInk)
    ? fixed.brand
    : fixed.brandInk
  fixed.brandSubtle = repairBackgroundForForeground(lighterSubtleText, fixed.brandSubtle)
  fixed.bg = repairBackgroundForForeground(fixed.brandInk, fixed.bg)

  const failures = validatePaletteContrast(fixed)
  if (failures.length) {
    const details = failures.map((failure) => `${failure.pair} ${failure.foreground} / ${failure.background} (${failure.ratio.toFixed(2)}:1)`).join(", ")
    throw new Error(`Não foi possível reparar a paleta: ${details}.`)
  }
  return fixed
}

export interface GenerateOptions {
  count?: number;
  seed?: number;
  hueShifts?: number[];
}

export function generatePaletteCandidates(base: OfferPalette, options: GenerateOptions = {}): OfferPalette[] {
  assertOfferPalette(base)
    const count = options.count ?? 10
    if (!Number.isInteger(count) || count < 1 || count > 10) throw new RangeError("A geração aceita de 1 a 10 paletas por vez.")
  const seed = options.seed ?? freshSeed()
  const rand = mulberry32(seed)
  const safeBase = repairPaletteContrast(base)
  const [baseHue, baseSat] = hexToHsl(safeBase.brand)
  const requestedShifts = options.hueShifts ?? [0, -24, 24]
  if (requestedShifts.some((shift) => !Number.isFinite(shift))) throw new Error("Os deslocamentos de matiz precisam ser números finitos.")

  const shifts = requestedShifts.slice(0, count)
  while (shifts.length < count) shifts.push(rand() * 360 - 180)

  const candidates: OfferPalette[] = []
  const seen = new Set<string>()
  const addCandidate = (hue: number, saturation: number) => {
    const candidate = repairPaletteContrast(buildCandidate(safeBase, hue, saturation))
    const signature = PALETTE_COLOR_KEYS.map((key) => candidate[key]).join(":")
    if (seen.has(signature)) return
    seen.add(signature)
    candidates.push(candidate)
  }

  for (const shift of shifts) {
    const saturation = Math.max(0.35, Math.min(0.9, baseSat + (rand() - 0.5) * 0.2))
    addCandidate(baseHue + shift, saturation)
  }

  // Bounded retries avoid hanging if an unusual base color repairs to duplicates.
  for (let attempts = 0; candidates.length < count && attempts < 256; attempts += 1) {
    const hue = baseHue + rand() * 360 - 180
    const saturation = 0.35 + rand() * 0.55
    addCandidate(hue, saturation)
  }
  if (candidates.length !== count) throw new Error(`Foram geradas ${candidates.length} de ${count} paletas únicas.`)
  return candidates
}
