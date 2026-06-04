import { VendaImediata } from "@/components/sections/VendaImediata"
import { SocialProof } from "@/components/sections/SocialProof"
import { CounterPainPoints } from "@/components/sections/CounterPainPoints"
import { KitCards } from "@/components/sections/KitCards"
import { Benefits } from "@/components/sections/Benefits"
import { CTAButton } from "@/components/sections/CTAButton"
import { Urgencia } from "@/components/sections/Urgencia"
import { IdealParaVoce } from "@/components/sections/IdealParaVoce"
import { TudoQueVoceRecebe } from "@/components/sections/TudoQueVoceRecebe"
import { Bonuses } from "@/components/sections/Bonuses"
import { OfferPricing } from "@/components/sections/OfferPricing"
import { Guarantee } from "@/components/sections/Guarantee"
import { ComoEAcesso } from "@/components/sections/ComoEAcesso"
import { FAQ } from "@/components/sections/FAQ"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <main>
      {/* 1. Venda Imediata */}
      <VendaImediata />

      {/* 2. Prova Social */}
      <SocialProof />

      {/* 3. Demonstrativo */}
      <CounterPainPoints />
      <KitCards />

      {/* 4. Benefícios */}
      <Benefits />

      {/* 5. Urgência */}
      <Urgencia />

      {/* 6. Ideal para você que deseja */}
      <IdealParaVoce />

      {/* 7. Tudo o que você vai receber */}
      <TudoQueVoceRecebe />

      {/* 8. Bônus */}
      <Bonuses />

      {/* 9. Oferta */}
      <OfferPricing />

      {/* 10. Garantia */}
      <Guarantee />

      {/* 11. Como é o Acesso */}
      <ComoEAcesso />

      {/* 12. FAQ */}
      <FAQ />

      {/* 13. Rodapé */}
      <Footer />
    </main>
  )
}
