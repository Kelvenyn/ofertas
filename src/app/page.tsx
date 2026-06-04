import { TopBar } from "@/components/sections/top-bar"
import { Hero } from "@/components/sections/hero"
import { PainPoints } from "@/components/sections/pain-points"
import { SkillsGrid } from "@/components/sections/skills-grid"
import { KitContents } from "@/components/sections/kit-contents"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Bonuses } from "@/components/sections/bonuses"
import { AccessInfo } from "@/components/sections/access-info"
import { SocialProof } from "@/components/sections/social-proof"
import { Pricing } from "@/components/sections/pricing"
import { Creator } from "@/components/sections/creator"
import { Urgency } from "@/components/sections/urgency"
import { FAQ } from "@/components/sections/faq"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <>
      <TopBar />
      <Hero />
      <PainPoints />
      <SkillsGrid />
      <KitContents />
      <HowItWorks />
      <Bonuses />
      <AccessInfo />
      <SocialProof />
      <Pricing />
      <Creator />
      <Urgency />
      <FAQ />
      <Footer />
    </>
  )
}
