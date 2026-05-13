import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "Обо мне",
  description: "Профиль Никиты Кононенко: разработка, UX/UI, аналитика, электроника и операционный опыт."
};

export default function AboutPage() {
  return (
    <main>
      <AboutSection />
    </main>
  );
}
