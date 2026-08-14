import { useEffect, useState } from "react";
import { ArrowUpRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SOCIAL, SHEETS_URL } from "@/lib/constants";

type NewsItem = {
  data: string;
  tag: string;
  titulo: string;
  resumo: string;
  cor: "secondary" | "accent" | "primary";
};

const TAG_COLORS: Record<NewsItem["cor"], string> = {
  secondary: "bg-secondary/15 text-secondary",
  accent: "bg-accent/20 text-amber-700",
  primary: "bg-primary/10 text-primary",
};

type GvizCell = { v?: string | number | { year?: number; month?: number; day?: number } | null };
type GvizRow = { c?: GvizCell[] };
type GvizCol = { label?: string };
type GvizParsed = { table?: { rows?: GvizRow[]; cols?: GvizCol[] } };

function parseGviz(raw: string): NewsItem[] {
  const jsonStr = raw.replace(/^[^{]*/, "").replace(/[^}]*$/, "");
  let parsed: GvizParsed;
  try {
    parsed = JSON.parse(jsonStr) as GvizParsed;
  } catch {
    return [];
  }
  const rows: GvizRow[] = parsed?.table?.rows ?? [];
  const cols: GvizCol[] = parsed?.table?.cols ?? [];
  const colIndex: Record<string, number> = {};
  cols.forEach((c: GvizCol, i: number) => {
    colIndex[(c.label || "").toLowerCase().trim()] = i;
  });
  return rows
    .map((row: GvizRow) => {
      const c = row.c ?? [];
      const getRaw = (key: string) => c[colIndex[key]]?.v;
      const get = (key: string) => {
        const rawVal = getRaw(key);
        if (rawVal == null) return '';
        if (typeof rawVal === 'object' && rawVal !== null) {
          const d = rawVal as { year?: number; month?: number; day?: number };
          if (d.year !== undefined && d.month !== undefined && d.day !== undefined) {
            const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
            return `${months[d.month]} ${d.year}`;
          }
        }
        const str = rawVal.toString().trim();
        const match = str.match(/^Date\((\d{4}),(\d{1,2}),(\d{1,2})\)$/i);
        if (match) {
          const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
          return `${months[parseInt(match[2], 10)]} ${match[1]}`;
        }
        return str;
      };

      return {
        data: get("data"),
        tag: get("tag"),
        titulo: get("titulo"),
        resumo: get("resumo"),
        cor: (get("cor") as NewsItem["cor"]) || "secondary",
      };
    })
    .filter((n) => n.titulo.length > 0);
}

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(SHEETS_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.text();
      })
      .then((raw) => {
        setNews(parseGviz(raw).slice(0, 3));
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return (
    <section id="noticias" className="py-20 md:py-28" aria-labelledby="news-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Fique por dentro
          </span>
          <h2
            id="news-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-primary md:text-5xl"
          >
            Notícias &amp; Atualizações
          </h2>
          <p className="mt-3 text-muted-foreground">
            Acompanhe nossas ações, projetos e conquistas recentes.
          </p>
        </div>

        {loading && (
          <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Carregando notícias...
          </div>
        )}

        {error && (
          <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground">
            <AlertCircle className="h-5 w-5 text-destructive" aria-hidden="true" />
            <p>
              Não foi possível carregar as notícias. Veja no{" "}
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-primary underline"
              >
                Instagram
              </a>
              .
            </p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {news.map((n) => (
              <article
                key={n.titulo}
                className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="flex items-center justify-between bg-primary/5 px-6 py-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {n.data}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${TAG_COLORS[n.cor] ?? TAG_COLORS.secondary}`}
                  >
                    {n.tag}
                  </span>
                </div>
                <div className="px-6 pb-6 pt-5">
                  <h3 className="font-heading text-lg font-bold leading-snug text-primary">
                    {n.titulo}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {n.resumo}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            Nenhuma notícia publicada ainda. Em breve!
          </p>
        )}

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
