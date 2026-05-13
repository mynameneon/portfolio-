import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Cursor } from "@/components/ui/Cursor";
import { InteractionHints } from "@/components/ui/InteractionHints";
import { LanguageProvider } from "@/hooks/useLanguage";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nikita-kononenko.netlify.app"),
  title: {
    default: "Никита Кононенко — Full-stack / UX / FPV",
    template: "%s — Никита Кононенко"
  },
  description:
    "Профессиональное портфолио Никиты Кононенко: full-stack разработка, UX/UI, аналитика, продажи, FPV-дроны и операционный опыт.",
  openGraph: {
    title: "Никита Кононенко — Portfolio System",
    description:
      "Сдержанное premium-dark портфолио с опытом в разработке, дизайне, аналитике, продажах и электронике.",
    url: "https://nikita-kononenko.netlify.app",
    siteName: "Nikita Kononenko Portfolio",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Nikita Kononenko portfolio preview"
      }
    ],
    locale: "ru_RU",
    type: "website"
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
        <LanguageProvider>
          <AmbientBackground />
          <Cursor />
          <Navbar />
          {children}
          <InteractionHints />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
