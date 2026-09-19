import type { OfferPalette } from "@/types/offer"

export const FIXED_ACTION_COLORS = {
  cta: "#16A34A",
  ctaDeep: "#11863D",
  ctaDarkest: "#0E6B31",
} as const

export const PALETTES = {
  petroleo: {
    label: "Azul-petróleo",
    colors: { brand: "#007C83", brandDeep: "#0F4C5C", brandInk: "#12333B", brandDark: "#32B6B2", brandLight: "#9EE5DE", brandSubtle: "#E7F7F5", ...FIXED_ACTION_COLORS, accent: "#D97706", yellow: "#F4B942", bg: "#FAFCFB", bgAlt: "#0F4C5C" },
  },
  cobalto: {
    label: "Cobalto",
    colors: { brand: "#2563EB", brandDeep: "#1E3A8A", brandInk: "#172554", brandDark: "#60A5FA", brandLight: "#BFDBFE", brandSubtle: "#EFF6FF", ...FIXED_ACTION_COLORS, accent: "#EA580C", yellow: "#FBBF24", bg: "#F8FAFF", bgAlt: "#1E3A8A" },
  },
  marinho: {
    label: "Marinho",
    colors: { brand: "#0A3A68", brandDeep: "#08294D", brandInk: "#061D38", brandDark: "#2B6FA3", brandLight: "#A9C8E1", brandSubtle: "#EAF2F8", ...FIXED_ACTION_COLORS, accent: "#D49A17", yellow: "#F4C34F", bg: "#F8FBFE", bgAlt: "#08294D" },
  },
  floresta: {
    label: "Floresta",
    colors: { brand: "#166534", brandDeep: "#14532D", brandInk: "#052E16", brandDark: "#3D8B5A", brandLight: "#A7D8B6", brandSubtle: "#ECF8F0", ...FIXED_ACTION_COLORS, accent: "#C58B16", yellow: "#E8B94A", bg: "#FAFFFB", bgAlt: "#14532D" },
  },
  oliva: {
    label: "Oliva",
    colors: { brand: "#4D7C0F", brandDeep: "#365314", brandInk: "#253708", brandDark: "#84B83D", brandLight: "#D9F99D", brandSubtle: "#F7FEE7", ...FIXED_ACTION_COLORS, accent: "#B7791F", yellow: "#EAB308", bg: "#FCFDF8", bgAlt: "#365314" },
  },
  terracota: {
    label: "Terracota",
    colors: { brand: "#C2410C", brandDeep: "#9A3412", brandInk: "#431407", brandDark: "#EA6A2B", brandLight: "#FDBA74", brandSubtle: "#FFF1E7", ...FIXED_ACTION_COLORS, accent: "#9A5B13", yellow: "#E8AA2E", bg: "#FFFBF7", bgAlt: "#9A3412" },
  },
  vinho: {
    label: "Vinho",
    colors: { brand: "#9F1239", brandDeep: "#881337", brandInk: "#4C0519", brandDark: "#D43C65", brandLight: "#FECDD3", brandSubtle: "#FFF1F2", ...FIXED_ACTION_COLORS, accent: "#B7791F", yellow: "#EAB94B", bg: "#FFFBFC", bgAlt: "#881337" },
  },
  ameixa: {
    label: "Ameixa",
    colors: { brand: "#7E2253", brandDeep: "#581C40", brandInk: "#350C27", brandDark: "#A33B71", brandLight: "#F5B8D3", brandSubtle: "#FFF1F7", ...FIXED_ACTION_COLORS, accent: "#B7791F", yellow: "#E8B94A", bg: "#FFFAFC", bgAlt: "#581C40" },
  },
  violeta: {
    label: "Violeta",
    colors: { brand: "#6D28D9", brandDeep: "#4C1D95", brandInk: "#2E1065", brandDark: "#8B5CF6", brandLight: "#DDD6FE", brandSubtle: "#F5F3FF", ...FIXED_ACTION_COLORS, accent: "#C26313", yellow: "#EAB94B", bg: "#FCFAFF", bgAlt: "#4C1D95" },
  },
  "grafite-dourado": {
    label: "Grafite e dourado",
    colors: { brand: "#334155", brandDeep: "#1E293B", brandInk: "#0F172A", brandDark: "#64748B", brandLight: "#CBD5E1", brandSubtle: "#F1F5F9", ...FIXED_ACTION_COLORS, accent: "#D4A017", yellow: "#F2C14E", bg: "#F8FAFC", bgAlt: "#1E293B" },
  },
} as const satisfies Record<string, { label: string; colors: OfferPalette }>

export type PaletteKey = keyof typeof PALETTES

export const PALETTE_KEYS = Object.keys(PALETTES) as PaletteKey[]

export function getPalette(key: PaletteKey): OfferPalette {
  return PALETTES[key].colors
}

export function paletteCssVariables(palette: OfferPalette): React.CSSProperties {
  return {
    "--brand": palette.brand,
    "--brand-deep": palette.brandDeep,
    "--brand-ink": palette.brandInk,
    "--brand-dark": palette.brandDark,
    "--brand-light": palette.brandLight,
    "--brand-subtle": palette.brandSubtle,
    "--cta": FIXED_ACTION_COLORS.cta,
    "--cta-deep": FIXED_ACTION_COLORS.ctaDeep,
    "--cta-darkest": FIXED_ACTION_COLORS.ctaDarkest,
    "--accent": palette.accent,
    "--yellow": palette.yellow,
    "--bg": palette.bg,
    "--bg-alt": palette.bgAlt,
    "--marquee-gradient": `linear-gradient(90deg, ${palette.brandDeep} 0%, ${palette.brand} 42%, ${palette.brandDark} 72%, ${palette.brandDeep} 100%)`,
  } as React.CSSProperties
}
