import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria das Graças",
    role: "Mãe de aluno atendido",
    initials: "MG",
    text: "O ISLA mudou a vida da minha família. Hoje meu filho frequenta a escola com dignidade e acolhimento.",
  },
  {
    name: "João Pereira",
    role: "Pessoa com deficiência",
    initials: "JP",
    text: "Pela primeira vez senti que minha voz importava. O instituto me ajudou a conhecer e exigir meus direitos.",
  },
  {
    name: "Dona Antônia",
    role: "Idosa atendida",
    initials: "DA",
    text: "Aqui encontrei companhia, respeito e cuidado. Recomendo o trabalho do ISLA de olhos fechados.",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      className="relative py-20 md:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="bg-azulejo absolute inset-0 opacity-[0.04]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Vozes que importam
          </span>
          <h2
            id="testimonials-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-primary md:text-5xl"
          >
            Depoimentos de quem viveu a transformação
          </h2>
        </motion.div>

        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative w-[85vw] shrink-0 snap-start rounded-2xl border border-border bg-card p-7 shadow-soft md:w-auto md:shrink"
            >
              <Quote
                className="absolute -top-4 left-6 h-10 w-10 rounded-full bg-accent p-2 text-accent-foreground"
                aria-hidden="true"
              />
              <blockquote className="mt-3 text-base leading-relaxed text-foreground">
                <p>&ldquo;{t.text}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div
                  aria-hidden="true"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-primary">{t.name}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {t.role}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
