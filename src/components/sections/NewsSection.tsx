import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SOCIAL } from "@/lib/constants";

const news = [
  {
    date: "Mai 2025",
    tag: "Evento",
    tagColor: "bg-secondary/15 text-secondary",
    title: "ISLA promove semana de conscientização sobre acessibilidade urbana",
    excerpt:
      "Durante a semana do dia da acessibilidade, o instituto realizou vistorias e orientações em espaços públicos de São Luís.",
  },
  {
    date: "Abr 2025",
    tag: "Projeto",
    tagColor: "bg-accent/20 text-accent-foreground",
    title: "Novo projeto de capacitação em educação inclusiva é lançado",
    excerpt:
      "Em parceria com escolas municipais, o ISLA inicia ciclo de formações para professores sobre práticas inclusivas.",
  },
  {
    date: "Mar 2025",
    tag: "Direitos",
    tagColor: "bg-primary/10 text-primary",
    title: "Instituto participa de audiência pública sobre mobilidade reduzida",
    excerpt:
      "Representantes do ISLA levaram demandas da comunidade à Câmara Municipal de São Luís em audiência histórica.",
  },
];

export function NewsSection() {
  return (
    <section
      id="noticias"
      className="py-20 md:py-28"
      aria-labelledby="news-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Fique por dentro
          </span>
          <h2
            id="news-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-primary md:text-5xl"
          >
            Notícias & Atualizações
          </h2>
          <p className="mt-3 text-muted-foreground">
            Acompanhe nossas ações, projetos e conquistas recentes.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {news.map((n) => (
            <article
              key={n.title}
              className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="flex items-center justify-between bg-primary/5 px-6 py-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {n.date}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${n.tagColor}`}
                >
                  {n.tag}
                </span>
              </div>
              <div className="px-6 pb-6 pt-5">
                <h3 className="font-heading text-lg font-bold leading-snug text-primary">
                  {n.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {n.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="min-h-12 gap-2 border-primary/30 bg-background text-primary hover:bg-secondary/10"
          >
            <a href={SOCIAL.instagram} target="_blank" rel="noreferrer noopener">
              Ver mais novidades
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
