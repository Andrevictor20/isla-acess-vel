import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, ShieldCheck, Award, Users2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import logo from "@/assets/isla-logo.jpg";

const partners = [
  { icon: ShieldCheck, label: "Selo de Transparência" },
  { icon: Award, label: "Certificação OSCIP" },
  { icon: Users2, label: "Rede de Inclusão MA" },
  { icon: Sparkles, label: "Parceiros Locais" },
];

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="gradient-hero relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
      aria-labelledby="hero-heading"
    >
      <div
        className="bg-azulejo absolute inset-0 opacity-[0.09]"
        aria-hidden="true"
      />
      <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> ISLA — São Luís, Maranhão
          </span>

          <h1
            id="hero-heading"
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] text-primary sm:text-5xl md:text-6xl lg:text-7xl"
          >
            A Inclusão é <span className="text-secondary">Para Todos</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {SITE.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={() => scrollTo("#acoes")}
              className="min-h-12 gap-2 bg-primary text-primary-foreground shadow-elegant hover:bg-primary/90"
              aria-label="Conheça nossas ações"
            >
              Conheça Nossas Ações
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("#contato")}
              className="min-h-12 gap-2 border-primary/30 bg-background text-primary hover:bg-secondary/10"
              aria-label="Fale conosco"
            >
              <MessageSquare className="h-4 w-4" />
              Fale Conosco
            </Button>
          </div>

          <div
            className="mt-10 rounded-2xl border border-border/70 bg-background/60 px-5 py-4 backdrop-blur"
            aria-label="Parceiros e Certificações"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Parceiros e Certificações
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {partners.map((p) => (
                <li
                  key={p.label}
                  className="flex items-center gap-2 text-xs font-semibold text-primary/80"
                >
                  <p.icon className="h-4 w-4 text-secondary" aria-hidden="true" />
                  <span>{p.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6 text-left">
            {[
              { k: "8+", v: "Anos" },
              { k: "1.2k+", v: "Atendidos" },
              { k: "35", v: "Projetos" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-heading text-2xl font-extrabold text-primary">{s.k}</dt>
                <dd className="text-xs uppercase tracking-wider text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto"
        >
          <div className="absolute inset-0 -m-6 rounded-[2.5rem] bg-gradient-to-br from-secondary/30 via-transparent to-accent/30 blur-2xl" aria-hidden="true" />
          <div className="relative rounded-[2rem] border-4 border-white bg-white p-3 shadow-elegant">
            <img
              src={logo}
              alt={`Logo do ${SITE.name} sobre azulejo maranhense`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-72 w-72 rounded-[1.5rem] object-cover sm:h-96 sm:w-96"
            />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-5 py-2 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-soft">
            Desde São Luís — MA
          </div>
        </motion.div>
      </div>
    </section>
  );
}
