# ISLA — Instituto São Luís Acessível

> Site institucional do **Instituto São Luís Acessível (ISLA)**, desenvolvido com Astro 7 e Sanity CMS, focado em acessibilidade, performance e SEO.

[![CI](https://github.com/Andrevictor20/isla-acess-vel/actions/workflows/verify.yml/badge.svg)](https://github.com/Andrevictor20/isla-acess-vel/actions/workflows/verify.yml)

---

## 🚀 Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Astro 7](https://astro.build) — geração estática (SSG) |
| UI / Componentes | React 19 + Tailwind CSS v4 + Radix UI |
| CMS | [Sanity v3](https://sanity.io) — headless CMS |
| Deploy | [Vercel](https://vercel.com) |
| Acessibilidade | WCAG AA, ARIA, pa11y |
| Tipagem | TypeScript strict |

---

## 📁 Estrutura do Projeto

```
isla-acess-vel/
├── src/
│   ├── components/
│   │   ├── astro/        # Componentes estáticos (Header, Footer, Hero…)
│   │   ├── react/        # Componentes interativos (ContactForm, AccessibilityWidget…)
│   │   ├── sections/     # Seções de página (legado React)
│   │   └── ui/           # Componentes Radix UI (shadcn)
│   ├── layouts/          # BaseLayout, BlogPost
│   ├── lib/
│   │   ├── sanity.ts     # Cliente Sanity + queries GROQ + tipagens
│   │   └── image.ts      # Helper para URLs de imagem do Sanity
│   ├── pages/
│   │   ├── index.astro   # Home
│   │   ├── blog/         # Listagem e detalhe de notícias
│   │   ├── api/          # Endpoint de contato
│   │   └── rss.xml.ts    # Feed RSS
│   └── styles/           # CSS global
├── studio/               # Sanity Studio isolado (painel de conteúdo)
│   ├── schemaTypes/      # Schemas: post, author, siteSettings
│   ├── sanity.config.ts  # Configuração do Studio
│   └── sanity.cli.ts     # Configuração do CLI
├── public/               # Assets estáticos
└── scripts/              # Scripts de migração e seed
```

---

## ⚙️ Configuração Local

### Pré-requisitos
- Node.js **≥ 22.12.0**
- npm

### 1. Clonar e instalar

```bash
git clone https://github.com/Andrevictor20/isla-acess-vel.git
cd isla-acess-vel
npm install
```

### 2. Variáveis de ambiente

Crie um arquivo `.env` na raiz com base no `.env.example`:

```bash
cp .env.example .env
```

Edite o `.env`:

```env
PUBLIC_SANITY_PROJECT_ID=bhpznnoe
PUBLIC_SANITY_DATASET=production
```

### 3. Rodar em desenvolvimento

```bash
# Roda site (port 4321) + Sanity Studio (port 3333) simultaneamente
npm run dev

# Só o site Astro
npm run dev:site

# Só o Sanity Studio
npm run studio
```

---

## 📦 Scripts disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Site + Studio em paralelo |
| `npm run dev:site` | Apenas o site Astro |
| `npm run studio` | Apenas o Sanity Studio |
| `npm run build` | Build de produção |
| `npm run check` | Type check com `astro check` |
| `npm run lint` | Lint com ESLint |
| `npm run format` | Formatar com Prettier |

---

## 🎨 Sanity CMS

O painel de conteúdo roda **isolado** na pasta `studio/`, sem acoplamento ao Astro.

### Schemas disponíveis

- **`post`** — Notícias e artigos (título, slug, imagem, corpo em Portable Text, categoria, SEO)
- **`author`** — Autores das notícias
- **`siteSettings`** — Configurações globais do site (stats, contato, redes sociais, parceiros)

### Categorias de notícias
`Institucional` · `Eventos` · `Imprensa` · `Campanhas`

### Deploy do Studio na nuvem (gratuito)

```bash
cd studio
npx sanity deploy
# URL: https://isla-studio.sanity.studio
```

---

## 🌐 Deploy no Vercel

### 1. Variáveis de ambiente no Vercel

No dashboard do Vercel → **Settings → Environment Variables**:

| Variável | Valor |
|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | `bhpznnoe` |
| `PUBLIC_SANITY_DATASET` | `production` |

### 2. CORS no Sanity

Em [sanity.io/manage](https://sanity.io/manage) → projeto → **API → CORS Origins**, adicione:
- `https://seu-projeto.vercel.app`
- `https://isla-acessivel.org.br` (domínio final)

### 3. Webhook para rebuild automático (recomendado)

Configure um Deploy Hook no Vercel e adicione como Webhook no Sanity (filtro: `_type == "post"`). Assim, toda notícia publicada dispara um rebuild automático do site.

---

## ♿ Acessibilidade

Este projeto segue as diretrizes **WCAG 2.1 nível AA**:

- Estrutura semântica com HTML5
- ARIA labels em todos os componentes interativos
- Contraste de cores verificado
- Navegação por teclado
- Textos alternativos obrigatórios em todas as imagens (validados pelo schema do Sanity)
- Widget de acessibilidade integrado (ajuste de fonte, contraste, redução de movimento)

---

## 📄 Licença

Projeto desenvolvido para o **Instituto São Luís Acessível**. Todos os direitos reservados.
