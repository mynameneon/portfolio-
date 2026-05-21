import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "Обо мне",
  description: "Профиль Никиты Кононенко: разработка, UX/UI, аналитика, компьютерное обучение, электроника и FPV/hardware."
};

export default function AboutPage() {
  return (
    <main>
      <AboutSection />
    </main>
  );
}
