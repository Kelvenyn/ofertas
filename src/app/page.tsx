import Hero from "@/components/sections/Hero";
import { PainPoints } from "@/components/sections/PainPoints";
import { KitContents } from "@/components/sections/KitContents";

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <KitContents />
    </main>
  );
}
