import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export const metadata: Metadata = {
  title: "Проекты",
  description: "Интерактивная подборка проектов Никиты Кононенко: игры, аудио-студии, desktop apps, mini apps и web-платформы."
};

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsSection />
    </main>
  );
}
