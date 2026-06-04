import Hero from "@/components/sections/Hero";
import { PainPoints } from "@/components/sections/PainPoints";
import { KitContents } from "@/components/sections/KitContents";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Bonuses } from "@/components/sections/Bonuses";

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <KitContents />
      <HowItWorks />
      <Bonuses />
    </main>
  );
}
