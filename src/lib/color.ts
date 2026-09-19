// Utilidades de cor para o sistema de paletas (Fase 4):
// conversão hex/HSL, luminância/contraste WCAG e validação nos pares reais.
export interface ContrastFailure {
  pair: string;
  foreground: string;
  background: string;
  ratio: number;
  required: number;
}

export function parseHex(hex: string): [number, number, number] {
  const clean = hex.replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) throw new Error(`Cor inválida: ${hex}`);
  return [
    Number.parseInt(clean.slice(0, 2), 16),
    Number.parseInt(clean.slice(2, 4), 16),
    Number.parseInt(clean.slice(4, 6), 16),
  ];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0").toUpperCase();
  return `#${c(r)}${c(g)}${c(b)}`;
}

export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s, l];
}

export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = ((h % 360) + 360) % 360 / 360;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
}

export function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = parseHex(hex);
  return rgbToHsl(r, g, b);
}

export function hslToHex(h: number, s: number, l: number): string {
  const [r, g, b] = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

export function shiftHue(hex: string, degrees: number): string {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex(h + degrees, s, l);
}

export function withLightness(hex: string, lightness: number): string {
  const [h, s] = hexToHsl(hex);
  return hslToHex(h, s, lightness);
}

export function relativeLuminance(hex: string): number {
  const channels = parseHex(hex)
    .map((v) => v / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export type PaletteLike = Record<string, string>;

// Pares reais exigidos em WCAG AA (§4.3): textos sobre fundos e branco sobre CTA.
export function validatePaletteContrast(palette: PaletteLike): ContrastFailure[] {
  const failures: ContrastFailure[] = [];
  const check = (pair: string, foreground: string, background: string, required = 4.5) => {
    const ratio = contrastRatio(foreground, background);
    if (ratio < required) failures.push({ pair, foreground, background, ratio, required });
  };
  check("branco sobre brand", "#FFFFFF", palette.brand);
  check("branco sobre brandDeep", "#FFFFFF", palette.brandDeep);
  check("brandInk sobre bg", palette.brandInk, palette.bg);
  check("brandInk sobre brandSubtle", palette.brandInk, palette.brandSubtle);
  check("branco sobre ctaDeep", "#FFFFFF", palette.ctaDeep);
  check("branco sobre ctaDarkest", "#FFFFFF", palette.ctaDarkest);
  return failures;
}

// Gerador determinístico (Fase 4, §4.3): "variações da atual" (deslocamento de
// matiz do brand) + "aleatórias" (semente fixa). Toda candidata passa por
// validação de contraste antes de ser oferecida — o gerador só retorna as
// aprovadas, já com CTA/bullets/glass fixos (§4.2: cta herdado da base).
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCandidate(base: PaletteLike, brandHue: number, brandSat: number): PaletteLike {
  const brand = hslToHex(brandHue, brandSat, 0.42);
  const brandDeep = hslToHex(brandHue, Math.min(1, brandSat + 0.08), 0.28);
  const brandInk = hslToHex(brandHue, Math.min(1, brandSat + 0.1), 0.16);
  const brandDark = hslToHex(brandHue, brandSat, 0.55);
  const brandLight = hslToHex(brandHue, 0.62, 0.78);
  const brandSubtle = hslToHex(brandHue, 0.55, 0.95);
  const accent = hslToHex(brandHue + 42, 0.72, 0.48);
  const yellow = hslToHex(brandHue + 42, 0.85, 0.62);
  const bg = hslToHex(brandHue, 0.28, 0.985);
  const bgAlt = hslToHex(brandHue, Math.min(1, brandSat + 0.08), 0.24);
  return {
    brand, brandDeep, brandInk, brandDark, brandLight, brandSubtle,
    cta: base.cta, ctaDeep: base.ctaDeep, ctaDarkest: base.ctaDarkest,
    accent, yellow, bg, bgAlt,
  };
}

// Escurece o texto / clareia o fundo até o par passar (reparo determinístico).
function repairTextOnBackground(text: string, background: string): string {
  let [h, s, l] = hexToHsl(text);
  for (let i = 0; i < 40 && contrastRatio(hslToHex(h, s, l), background) < 4.5; i += 1) l -= 0.02;
  if (contrastRatio(hslToHex(h, s, l), background) >= 4.5) return hslToHex(h, s, l);
  [h, s, l] = hexToHsl(background);
  for (let i = 0; i < 40 && contrastRatio(text, hslToHex(h, s, l)) < 4.5; i += 1) l += 0.02;
  return hslToHex(h, s, l);
}

function repairWhiteOn(color: string): string {
  const [h, s, l0] = hexToHsl(color);
  let l = l0;
  for (let i = 0; i < 40 && contrastRatio("#FFFFFF", hslToHex(h, s, l)) < 4.5; i += 1) l -= 0.02;
  return hslToHex(h, s, l);
}

export function repairPaletteContrast(palette: PaletteLike): PaletteLike {
  const fixed = { ...palette };
  if (contrastRatio("#FFFFFF", fixed.brand) < 4.5) fixed.brand = repairWhiteOn(fixed.brand);
  if (contrastRatio("#FFFFFF", fixed.brandDeep) < 4.5) fixed.brandDeep = repairWhiteOn(fixed.brandDeep);
  if (contrastRatio(fixed.brandInk, fixed.bg) < 4.5) fixed.brandInk = repairTextOnBackground(fixed.brandInk, fixed.bg);
  if (contrastRatio(fixed.brandInk, fixed.brandSubtle) < 4.5) {
    fixed.brandSubtle = hslToHex(...hexToHsl(fixed.brandSubtle).slice(0, 2) as [number, number], 0.95);
    if (contrastRatio(fixed.brandInk, fixed.brandSubtle) < 4.5) {
      fixed.brandInk = repairTextOnBackground(fixed.brandInk, fixed.brandSubtle);
    }
  }
  return fixed;
}

export interface GenerateOptions {
  count?: number;
  seed?: number;
  hueShifts?: number[];
}

export function generatePaletteCandidates(base: PaletteLike, options: GenerateOptions = {}): PaletteLike[] {
  const { count = 5, seed = 7, hueShifts = [0, -24, 24, -48, 48] } = options;
  const [baseHue, baseSat] = hexToHsl(base.brand);
  const rand = mulberry32(seed);
  const shifts = [...hueShifts];
  while (shifts.length < count) shifts.push(Math.round(rand() * 360 - 180));
  const out: PaletteLike[] = [];
  const seen = new Set<string>();
  for (const shift of shifts) {
    if (out.length >= count) break;
    const sat = Math.max(0.35, Math.min(0.9, baseSat + (rand() - 0.5) * 0.2));
    const candidate = repairPaletteContrast(buildCandidate(base, baseHue + shift, sat));
    if (validatePaletteContrast(candidate).length > 0) continue;
    if (seen.has(candidate.brand)) continue;
    seen.add(candidate.brand);
    out.push(candidate);
  }
  // Completa com matizes distantes caso algum reparo tenha falhado.
  for (let hue = baseHue + 90; out.length < count; hue += 60) {
    const candidate = repairPaletteContrast(buildCandidate(base, hue, 0.6));
    if (validatePaletteContrast(candidate).length > 0 || seen.has(candidate.brand)) continue;
    seen.add(candidate.brand);
    out.push(candidate);
  }
  return out;
}
