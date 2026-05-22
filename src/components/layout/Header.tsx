import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import logo from "@/assets/isla-logo.jpg";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md shadow-[0_2px_20px_-10px_rgba(27,44,107,0.25)]"
          : "bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3"
          aria-label={`${SITE.name} - Início`}
        >
          <img
            src={logo}
            alt={`Logo do ${SITE.name}`}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-secondary/30"
          />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="font-heading text-sm font-extrabold text-primary">
              {SITE.shortName}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {SITE.slogan}
            </span>
          </div>
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAnchor(link.href);
                  }}
                  className="inline-flex min-h-11 items-center rounded-md px-4 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary/10 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button
            onClick={() => handleAnchor("#contato")}
            className="min-h-11 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Entre em Contato
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-primary hover:bg-secondary/10 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background/95 backdrop-blur lg:hidden"
        >
          <nav aria-label="Navegação móvel" className="mx-auto max-w-7xl px-4 py-3">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAnchor(link.href);
                    }}
                    className="flex min-h-11 items-center rounded-md px-3 text-base font-semibold text-foreground/90 hover:bg-secondary/10 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  onClick={() => handleAnchor("#contato")}
                  className="w-full min-h-11 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Entre em Contato
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
