import { motion } from "framer-motion";
import {
  Accessibility,
  GraduationCap,
  Scale,
  HeartHandshake,
  Users,
  Building2,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const actions = [
  {
    icon: Accessibility,
    title: "Acessibilidade Urbana",
    text: "Assessoria técnica para tornar espaços públicos e privados acessíveis a todas as pessoas.",
  },
  {
    icon: GraduationCap,
    title: "Educação Inclusiva",
    text: "Capacitação de profissionais, famílias e instituições em práticas inclusivas.",
  },
  {
    icon: Scale,
    title: "Defesa de Direitos",
    text: "Atuação em advocacy, denúncias e acompanhamento de políticas públicas.",
  },
  {
    icon: HeartHandshake,
    title: "Atenção ao Idoso",
    text: "Projetos de cuidado, convivência e proteção integral à pessoa idosa.",
  },
  {
    icon: Users,
    title: "Apoio à PCD",
    text: "Suporte direto a pessoas com deficiência e suas famílias em diferentes áreas.",
  },
  {
    icon: Building2,
    title: "Poder Público",
    text: "Articulação com órgãos governamentais para garantir políticas efetivas de inclusão.",
  },
];

export function ServicesSection() {
  return (
    <section
      id="acoes"
      className="relative py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="bg-azulejo absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Nossas ações
          </span>
          <h2
            id="services-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-primary md:text-5xl"
          >
            Projetos que transformam vidas
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg">
            Atuamos em diversas frentes para garantir inclusão real, com escuta ativa
            das comunidades atendidas.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            >
              <Card className="group h-full border-border/60 bg-card p-7 transition-all hover:-translate-y-1 hover:border-secondary/50 hover:shadow-soft">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <a.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-primary">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
