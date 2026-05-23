import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import logo from "@/assets/isla-logo.jpg";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Algo deu errado
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocorreu um problema ao carregar esta página. Tente novamente ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1B2C6B" },

      // SEO primário
      { title: "Instituto São Luís Acessível — ISLA | A Inclusão é Para Todos" },
      {
        name: "description",
        content:
          "O ISLA desenvolve ações e projetos em defesa dos direitos de pessoas com deficiência, mobilidade reduzida e idosos em São Luís, Maranhão.",
      },
      {
        name: "keywords",
        content:
          "inclusão, acessibilidade, deficiência, São Luís, Maranhão, ISLA, instituto, direitos, PCD, idosos, mobilidade reduzida",
      },
      { name: "author", content: "Instituto São Luís Acessível" },
      { name: "robots", content: "index, follow" },
      { name: "googlebot", content: "index, follow" },

      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://isla.org.br" },
      { property: "og:title", content: "Instituto São Luís Acessível — A Inclusão é Para Todos" },
      {
        property: "og:description",
        content:
          "Desenvolvendo ações e projetos em defesa dos direitos de pessoas com deficiência, mobilidade reduzida e idosos.",
      },
      { property: "og:image", content: "https://isla.org.br/og-image.jpg" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "Instituto São Luís Acessível" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Instituto São Luís Acessível — ISLA" },
      {
        name: "twitter:description",
        content: "A Inclusão é Para Todos. Conheça o ISLA em São Luís, MA.",
      },
      { name: "twitter:image", content: "https://isla.org.br/og-image.jpg" },

      // Geo
      { name: "geo.region", content: "BR-MA" },
      { name: "geo.placename", content: "São Luís, Maranhão" },
      { name: "geo.position", content: "-2.5297;-44.3028" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap",
      },
      { rel: "preload", href: logo, as: "image" },
      { rel: "canonical", href: "https://isla.org.br" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
        >
          Pular para o conteúdo principal
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
