import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { SITE, SOCIAL, NAV_LINKS, CONTACT } from "@/lib/constants";
import logo from "@/assets/isla-logo.jpg";

export function Footer() {
  return (
    <footer className="relative mt-20 bg-primary text-primary-foreground">
      <div className="bg-azulejo absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt={`Logo ${SITE.name}`}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-secondary/40"
              />
              <div>
                <p className="font-heading text-lg font-extrabold">{SITE.shortName}</p>
                <p className="text-sm text-primary-foreground/80">{SITE.slogan}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-primary-foreground/80">
              {SITE.description}
            </p>
          </div>

          <nav aria-label="Links rápidos">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-secondary">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-11 items-center text-sm text-primary-foreground/85 hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-secondary">
              Contato
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />
                <a href={`tel:${CONTACT.phone}`} className="hover:text-accent">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-accent">
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            <div className="mt-5 flex gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram do ISLA"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook do ISLA"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-primary-foreground/70 md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</p>
          <p>Site desenvolvido com compromisso de acessibilidade WCAG 2.1 AA.</p>
        </div>
      </div>
    </footer>
  );
}
