import type { OfferConfig } from "@/types/offer"
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

export const OFFER_CONFIGS = {
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

export type OfferSlug = keyof typeof OFFER_CONFIGS

export function getOfferConfig(slug: string): OfferConfig | undefined {
  return OFFER_CONFIGS[slug as OfferSlug]
}
