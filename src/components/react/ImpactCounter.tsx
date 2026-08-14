import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
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
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
      { rootMargin: '-80px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {value.toLocaleString('pt-BR')}
      {suffix}
    </span>
  );
}

interface Props {
  stats: Stat[];
}

export default function ImpactCounter({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:divide-x md:divide-white/10 md:gap-0">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur md:rounded-none md:border-0 md:bg-transparent md:backdrop-blur-0"
        >
          <p className="text-4xl font-extrabold text-[var(--accent)] md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
            <Counter to={s.value} suffix={s.suffix} />
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-white/80">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
