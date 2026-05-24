import { Toaster } from "@/components/ui/sonner";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { MapSection } from "@/components/sections/MapSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";

export default function App() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header />

      <main id="conteudo-principal" role="main" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ImpactSection />
        <TestimonialsSection />
        <PartnersSection />
        <NewsSection />
        <MapSection />
        <ContactSection />
      </main>

      <Footer />
      <AccessibilityWidget />
      <WhatsAppButton />
      <BackToTop />
      <Toaster richColors position="top-right" />
    </div>
  );
}
