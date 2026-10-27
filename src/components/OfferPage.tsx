import dynamic from "next/dynamic"
import { OfferSection } from "@/components/OfferSection"
import { OrderedSections } from "@/components/OrderedSections"
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

const Guarantee = dynamic(() => import("@/components/sections/Guarantee").then((module) => module.Guarantee))
const ComoEAcesso = dynamic(() => import("@/components/sections/ComoEAcesso").then((module) => module.ComoEAcesso))
const FAQ = dynamic(() => import("@/components/sections/FAQ").then((module) => module.FAQ))
const Footer = dynamic(() => import("@/components/sections/Footer").then((module) => module.Footer))

export default function OfferPage() {
  return (
    <>
      <a href="#oferta" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[var(--z-skip-link)] focus:bg-white focus:text-[var(--brand)] focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg">
        Pular para a oferta
      </a>
      <OfferSection id="countdown"><CountdownBar /></OfferSection>
      <OfferSection id="hero"><header><VendaImediata /></header></OfferSection>
      <main id="conteudo">
        <OrderedSections sections={{
          socialProof: <SocialProof />, counter: <CounterPainPoints />, kit: <KitCards />, kitReversed: <KitCardsReversed />,
          benefits: <Benefits />, urgency: <Urgencia />, deliverables: <TudoQueVoceRecebe />, bonuses: <Bonuses />,
          pricing: <OfferPricing />, guarantee: <Guarantee />, access: <ComoEAcesso />, faq: <FAQ />,
        }} />
      </main>
      <OfferSection id="footer"><Footer /></OfferSection>
    </>
  )
}
