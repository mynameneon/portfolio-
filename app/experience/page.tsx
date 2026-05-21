import type { Metadata } from "next";
import { ExperienceSection } from "@/components/sections/ExperienceSection";

export const metadata: Metadata = {
  title: "Опыт",
  description: "Опыт Никиты Кононенко с главным акцентом на IT, компьютеры, разработку, сборку и hardware-направление."
};

export default function ExperiencePage() {
  return (
    <main>
      <ExperienceSection />
    </main>
  );
}
