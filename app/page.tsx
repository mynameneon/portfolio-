import { HeroSection } from "@/components/sections/HeroSection";
import { DepthDeckSection } from "@/components/sections/DepthDeckSection";
import { ParallaxShowcase } from "@/components/sections/ParallaxShowcase";
import { ServicesSection } from "@/components/sections/ServicesSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ParallaxShowcase />
      <DepthDeckSection />
      <ServicesSection />
    </main>
  );
}
