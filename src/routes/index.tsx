import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { MapSection } from "@/components/sections/MapSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header />

      <main id="conteudo-principal" role="main" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ImpactSection />
        <TestimonialsSection />
        <MapSection />
        <ContactSection />
      </main>

      <Footer />
      <AccessibilityWidget />
      <Toaster richColors position="top-right" />
    </div>
  );
}
