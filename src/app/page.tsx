import Hero from "@/components/sections/Hero";
import { PainPoints } from "@/components/sections/PainPoints";
import { KitContents } from "@/components/sections/KitContents";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Bonuses } from "@/components/sections/Bonuses";
import { SocialProof } from "@/components/sections/SocialProof";
import { Pricing } from "@/components/sections/Pricing";

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <KitContents />
      <HowItWorks />
      <Bonuses />
      <SocialProof />
      <Pricing />
    </main>
  );
}
