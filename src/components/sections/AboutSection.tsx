import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const items = [
  {
    icon: Target,
    title: "Missão",
    text:
      "Desenvolver ações e projetos em defesa dos direitos das pessoas com qualquer tipo de deficiência, mobilidade reduzida e idosos.",
  },
  {
    icon: Eye,
    title: "Visão",
    text:
      "Ser referência em inclusão no estado do Maranhão, promovendo uma sociedade verdadeiramente acessível para todos.",
  },
  {
    icon: Heart,
    title: "Valores",
    text:
      "Inclusão, dignidade, respeito, empatia e compromisso permanente com os direitos humanos e a cidadania.",
  },
];

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 md:py-28" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Quem somos
          </span>
          <h2
            id="about-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-primary md:text-5xl"
          >
            Construindo uma São Luís acessível para todos
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            O Instituto São Luís Acessível atua há anos articulando a sociedade civil,
            o poder público e parceiros para garantir direitos, autonomia e participação
            plena de pessoas com deficiência, mobilidade reduzida e idosos.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="group relative h-full overflow-hidden border-border/60 bg-card p-8 transition-all after:absolute after:inset-y-0 after:left-0 after:w-1 after:rounded-l-2xl after:bg-gradient-to-b after:from-secondary after:to-accent after:opacity-0 after:transition-opacity hover:-translate-y-1 hover:shadow-elegant group-hover:after:opacity-100">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary via-accent to-primary opacity-80" />
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/15 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <item.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-bold text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{item.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
