import type { Metadata } from "next";
import { SkillsSection } from "@/components/sections/SkillsSection";

export const metadata: Metadata = {
  title: "Навыки",
  description: "Матрица навыков Никиты Кононенко: разработка, дизайн, аналитика, компьютерные инструменты, soft skills и электроника."
};

export default function SkillsPage() {
  return (
    <main>
      <SkillsSection />
    </main>
  );
}
