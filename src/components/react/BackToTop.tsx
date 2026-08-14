import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Voltar ao topo da página"
      className="fixed bottom-24 right-5 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--primary)] shadow-[var(--shadow-soft)] transition-transform hover:scale-105 hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
    >
      <ChevronUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
