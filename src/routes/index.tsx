import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { MapSection } from "@/components/sections/MapSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Instituto São Luís Acessível (ISLA) — A Inclusão é Para Todos",
      },
      {
        name: "description",
        content:
          "O ISLA desenvolve ações e projetos em defesa dos direitos de pessoas com deficiência, mobilidade reduzida e idosos em São Luís, Maranhão.",
      },
      {
        property: "og:title",
        content: "Instituto São Luís Acessível — A Inclusão é Para Todos",
      },
      {
        property: "og:description",
        content:
          "Defesa dos direitos de pessoas com deficiência, mobilidade reduzida e idosos em São Luís — MA.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo principal
      </a>

      <Header />

      <main id="main">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ImpactSection />
        <MapSection />
        <ContactSection />
      </main>

      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
