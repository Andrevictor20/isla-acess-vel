import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo da página"
      className="fixed bottom-5 right-5 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-primary shadow-soft transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ChevronUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
