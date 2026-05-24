const partners = [
  "Prefeitura de São Luís",
  "Governo do Estado do Maranhão",
  "OAB Maranhão",
  "UFMA",
  "SEBRAE MA",
  "Parceiro (em breve)",
];

export function PartnersSection() {
  return (
    <section
      id="parceiros"
      className="bg-muted/40 py-20 md:py-24"
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Junto com você
          </span>
          <h2
            id="partners-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-primary md:text-4xl"
          >
            Parceiros e Apoiadores
          </h2>
          <p className="mt-3 text-muted-foreground">Construindo a inclusão juntos</p>
        </div>

        <ul className="mt-12 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
          {partners.map((p) => (
            <li
              key={p}
              className="flex h-20 min-w-[220px] shrink-0 items-center justify-center rounded-xl border border-border bg-card p-6 text-center text-sm font-semibold text-muted-foreground transition-colors hover:border-secondary/50 hover:text-primary md:min-w-0"
            >
              {p}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Quer se tornar parceiro?{" "}
          <a
            href="#contato"
            className="font-semibold text-primary underline underline-offset-4 hover:text-secondary"
          >
            Entre em contato
          </a>
          .
        </p>
      </div>
    </section>
  );
}
