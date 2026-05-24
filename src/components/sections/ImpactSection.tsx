import { useEffect, useRef, useState } from "react";
import { IMPACT_STATS } from "@/lib/constants";

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || startedRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const prefersReduced = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            if (prefersReduced) {
              setValue(to);
              io.disconnect();
              return;
            }
            const duration = 1800;
            const start = performance.now();
            let raf = 0;
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(eased * to));
              if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            io.disconnect();
            return () => cancelAnimationFrame(raf);
          }
        }
      },
      { rootMargin: "-80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {value.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export function ImpactSection() {
  return (
    <section
      id="impacto"
      className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-24"
      aria-labelledby="impact-heading"
    >
      <div className="bg-azulejo absolute inset-0 opacity-[0.08]" aria-hidden="true" />
      <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Nosso impacto
          </span>
          <h2
            id="impact-heading"
            className="mt-3 font-heading text-3xl font-extrabold md:text-5xl"
          >
            Números que contam histórias reais
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4 md:divide-x md:divide-white/10 md:gap-0">
          {IMPACT_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur md:rounded-none md:border-0 md:bg-transparent md:backdrop-blur-0"
            >
              <p className="font-heading text-4xl font-extrabold text-accent md:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-primary-foreground/80">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
