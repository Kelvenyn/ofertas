import dynamic from "next/dynamic"
import { CountdownBar } from "@/components/CountdownBar"
import { VendaImediata } from "@/components/sections/VendaImediata"
import { SocialProof } from "@/components/sections/SocialProof"
import { CounterPainPoints } from "@/components/sections/CounterPainPoints"
import { KitCards } from "@/components/sections/KitCards"
import { KitCardsReversed } from "@/components/sections/KitCardsReversed"
import { Benefits } from "@/components/sections/Benefits"
import { Urgencia } from "@/components/sections/Urgencia"
import { TudoQueVoceRecebe } from "@/components/sections/TudoQueVoceRecebe"
import { Bonuses } from "@/components/sections/Bonuses"
import { OfferPricing } from "@/components/sections/OfferPricing"

const Guarantee = dynamic(() => import("@/components/sections/Guarantee").then((m) => m.Guarantee))
const ComoEAcesso = dynamic(() => import("@/components/sections/ComoEAcesso").then((m) => m.ComoEAcesso))
const FAQ = dynamic(() => import("@/components/sections/FAQ").then((m) => m.FAQ))
const Footer = dynamic(() => import("@/components/sections/Footer").then((m) => m.Footer))

export default function CastracaoPage() {
  return <><a href="#oferta" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[var(--z-skip-link)] focus:bg-white focus:text-[var(--brand)] focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg">Pular para a oferta</a><CountdownBar /><header><VendaImediata /></header><main id="conteudo"><SocialProof /><CounterPainPoints /><KitCards /><KitCardsReversed /><Benefits /><Urgencia /><TudoQueVoceRecebe /><Bonuses /><OfferPricing /><Guarantee /><ComoEAcesso /><FAQ /></main><Footer /></>
}
