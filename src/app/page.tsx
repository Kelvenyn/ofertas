import { PainPoints } from "@/components/sections/PainPoints"
import { KitContents } from "@/components/sections/KitContents"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Bonuses } from "@/components/sections/Bonuses"
import { AccessInfo } from "@/components/sections/AccessInfo"
import { SocialProof } from "@/components/sections/SocialProof"
import { Pricing } from "@/components/sections/Pricing"
import { Creator } from "@/components/sections/Creator"
import { Guarantee } from "@/components/sections/Guarantee"
import { FAQ } from "@/components/sections/FAQ"
import { Footer } from "@/components/sections/Footer"
import Hero from "@/components/sections/Hero"

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <KitContents />
      <HowItWorks />
      <Bonuses />
      <AccessInfo />
      <SocialProof />
      <Pricing />
      <Creator />
      <Guarantee />
      <FAQ />
      <Footer />
    </main>
  )
}
