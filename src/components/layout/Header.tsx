import { useEffect, useState } from "react";
import { Menu, X, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE, CONTACT, SOCIAL } from "@/lib/constants";
import logo from "@/assets/isla-logo.jpg";

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.17 8.17 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z" />
    </svg>
  );
}

const topSocials = [
  { href: SOCIAL.instagram, label: "Instagram", icon: Instagram },
  { href: SOCIAL.facebook, label: "Facebook", icon: Facebook },
  { href: SOCIAL.youtube, label: "YouTube", icon: Youtube },
  { href: SOCIAL.tiktok, label: "TikTok", icon: TikTokIcon },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean,
    ) as Element[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) {
            setActiveSection("#" + e.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const handleAnchor = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs md:px-8">
          <a
            href={`tel:${CONTACT.phone}`}
            className="inline-flex items-center gap-2 font-semibold hover:text-accent"
            aria-label={`Ligar para ${CONTACT.phone}`}
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{CONTACT.phone}</span>
          </a>
          <ul className="flex items-center gap-1">
            {topSocials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${s.label} do ISLA`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 hover:text-accent"
                >
                  <s.icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md shadow-[0_2px_20px_-10px_rgba(27,44,107,0.25)]"
            : "bg-background/60 backdrop-blur-sm"
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
              loading="eager"
              decoding="async"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-secondary/30"
            />
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="font-heading text-sm font-extrabold text-primary">
                {SITE.shortName}
              </span>
              <span className="text-[11px] text-muted-foreground">{SITE.slogan}</span>
            </div>
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleAnchor(link.href);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={`inline-flex min-h-11 items-center rounded-md px-4 text-sm transition-colors hover:bg-secondary/10 hover:text-primary ${
                        isActive
                          ? "bg-secondary/15 font-bold text-primary"
                          : "font-semibold text-foreground/80"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
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
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleAnchor(link.href);
                        }}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex min-h-11 items-center rounded-md px-3 text-base hover:bg-secondary/10 hover:text-primary ${
                          isActive
                            ? "bg-secondary/15 font-bold text-primary"
                            : "font-semibold text-foreground/90"
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
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
      </div>
    </header>
  );
}
