import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

interface NavLink {
  label: string;
  href: string;
}

interface Props {
  navLinks: NavLink[];
  isHome?: boolean;
}

export default function MobileNav({ navLinks, isHome = false }: Props) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (!isHome) return;
    const anchors = navLinks.filter((l) => l.href.startsWith('#'));
    const sections = anchors
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) {
            setActiveSection('#' + e.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [navLinks, isHome]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    if (href.startsWith('#') && isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--primary)] hover:bg-[color-mix(in_oklab,var(--secondary)_10%,transparent)] lg:hidden"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[5.5rem] z-40 border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur lg:hidden"
        >
          <nav aria-label="Navegação móvel" className="mx-auto max-w-7xl px-4 py-3">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = isHome && activeSection === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#') && isHome) {
                          e.preventDefault();
                        }
                        handleClick(link.href);
                      }}
                      aria-current={isActive ? 'true' : undefined}
                      className={`flex min-h-11 items-center rounded-md px-3 text-base hover:bg-[color-mix(in_oklab,var(--secondary)_10%,transparent)] hover:text-[var(--primary)] ${
                        isActive
                          ? 'bg-[color-mix(in_oklab,var(--secondary)_15%,transparent)] font-bold text-[var(--primary)]'
                          : 'font-semibold text-[var(--foreground)]/90'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li className="pt-2">
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex min-h-11 items-center gap-2 rounded-md px-3 text-base font-semibold text-[var(--primary)] hover:bg-[color-mix(in_oklab,var(--secondary)_10%,transparent)]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={isHome ? '#contato' : '/#contato'}
                  onClick={(e) => {
                    if (isHome) { e.preventDefault(); handleClick('#contato'); }
                  }}
                  className="flex w-full min-h-11 items-center justify-center rounded-full bg-[var(--accent)] px-6 font-bold text-[var(--accent-foreground)]"
                >
                  Entre em Contato
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
