import type { OfferConfig } from "@/types/offer"
import { generatePaletteCandidates, repairPaletteContrast } from "@/lib/color"
import { OFFER as alicate } from "./alicate/offer"
import { OFFER as castracao } from "./castracao/offer"
import { OFFER as confissao } from "./confissao/offer"
import { OFFER as croqui } from "./croqui/offer"
import { OFFER as felinos } from "./felinos/offer"
import { OFFER as higienizacao } from "./higienizacao/offer"
import { OFFER as jardim } from "./jardim/offer"
import { OFFER as laboral } from "./laboral/offer"
import { OFFER as lavanderia } from "./lavanderia/offer"
import { OFFER as lembrancinhas } from "./lembrancinhas/offer"
import { OFFER as porcelanato } from "./porcelanato/offer"
import { OFFER as psicopedagogia } from "./psicopedagogia/offer"
import { OFFER as tilapia } from "./tilapia/offer"
import { OFFER as box } from "./box/offer"
import { OFFER as calha } from "./calha/offer"

const SOURCE_OFFER_CONFIGS = {
  alicate,
  castracao,
  confissao,
  croqui,
  felinos,
  higienizacao,
  jardim,
  laboral,
  lavanderia,
  lembrancinhas,
  porcelanato,
  psicopedagogia,
  tilapia,
  box,
  calha,
} satisfies Record<string, OfferConfig>

export type OfferSlug = keyof typeof SOURCE_OFFER_CONFIGS

function stableSeed(value: string): number {
  return [...value].reduce((seed, character) => Math.imul(seed ^ character.charCodeAt(0), 16777619), 2166136261) >>> 0
}

function addPaletteCandidates(offer: OfferConfig, slug: string): OfferConfig {
  const palette = repairPaletteContrast(offer.palette)
  const paletteCandidates = [palette]
  for (let attempt = 0; paletteCandidates.length < 10 && attempt < 8; attempt += 1) {
    const generated = generatePaletteCandidates(palette, {
      count: 10,
      seed: (stableSeed(slug) + attempt * 104729) >>> 0,
      hueShifts: [-36, 36, -72, 72, 108, -108, 144, -144, 180, 0],
    })
    for (const candidate of generated) {
      if (paletteCandidates.some((current) => current.brand === candidate.brand)) continue
      paletteCandidates.push(candidate)
      if (paletteCandidates.length === 10) break
    }
  }
  if (paletteCandidates.length !== 10) throw new Error(`Não foi possível criar dez paletas para ${slug}.`)
  return { ...offer, palette, paletteCandidates }
}

export const OFFER_CONFIGS = Object.fromEntries(
  Object.entries(SOURCE_OFFER_CONFIGS).map(([slug, offer]) => [slug, addPaletteCandidates(offer, slug)]),
) as typeof SOURCE_OFFER_CONFIGS

export function getOfferConfig(slug: string): OfferConfig | undefined {
  return OFFER_CONFIGS[slug as OfferSlug]
}
