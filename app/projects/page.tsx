import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export const metadata: Metadata = {
  title: "Проекты",
  description: "Подборка проектов Никиты Кононенко из локальной папки D:\\Project AI: игры, аудио-студии, desktop apps, mini apps и web-платформы."
};

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsSection />
    </main>
  );
}
