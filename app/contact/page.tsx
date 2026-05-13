import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты и форма связи с Никитой Кононенко."
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
