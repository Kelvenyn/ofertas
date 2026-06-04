import { TopTimer } from "@/components/sections/TopTimer"
import Hero from "@/components/sections/Hero"
import { HeroImage } from "@/components/sections/HeroImage"
import { CounterPainPoints } from "@/components/sections/CounterPainPoints"
import { PriceDisplay } from "@/components/sections/PriceDisplay"
import { CTAButton } from "@/components/sections/CTAButton"
import { Skills } from "@/components/sections/Skills"
import { ProcessSteps } from "@/components/sections/ProcessSteps"
import { IdealParaVoce } from "@/components/sections/IdealParaVoce"
import { KitTitle } from "@/components/sections/KitTitle"
import { KitCards } from "@/components/sections/KitCards"
import { AccessInfo } from "@/components/sections/AccessInfo"
import { Bonuses } from "@/components/sections/Bonuses"
import { OfferPricing } from "@/components/sections/OfferPricing"
import { Guarantee } from "@/components/sections/Guarantee"
import { SocialProof } from "@/components/sections/SocialProof"
import { Creator } from "@/components/sections/Creator"
import { FAQ } from "@/components/sections/FAQ"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <main>
      {/* 1. Venda Imediata */}
      <TopTimer />
      <Hero />
      <HeroImage />
      <PriceDisplay />
      <CTAButton />

      {/* 2. Intensificação da Dor */}
      <CounterPainPoints />

      {/* 3. Benefícios do Produto */}
      <Skills />
      <ProcessSteps />
      <CTAButton />

      {/* 4. Ideal para você que deseja */}
      <IdealParaVoce />

      {/* 5. Tudo o que você vai receber */}
      <KitTitle />
      <KitCards />
      <AccessInfo />
      <CTAButton />

      {/* 6. Bônus */}
      <Bonuses />
      <CTAButton />

      {/* 7. Oferta e Valores */}
      <OfferPricing />

      {/* 8. Garantia */}
      <Guarantee />
      <CTAButton />

      {/* 9. Prova Social / Autoridade */}
      <SocialProof />
      <Creator />

      {/* 10. FAQ */}
      <FAQ />
      <CTAButton />

      {/* 11. Rodapé */}
      <Footer />
    </main>
  )
}
