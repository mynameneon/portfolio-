import type { Metadata } from "next";
import { ExperienceSection } from "@/components/sections/ExperienceSection";

export const metadata: Metadata = {
  title: "Опыт",
  description: "Timeline опыта Никиты Кононенко: официальные позиции, фриланс и подробные описания ролей."
};

export default function ExperiencePage() {
  return (
    <main>
      <ExperienceSection />
    </main>
  );
}
