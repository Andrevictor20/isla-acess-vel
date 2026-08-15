# ISLA — Instituto São Luís Acessível

> Site institucional do **Instituto São Luís Acessível (ISLA)**, desenvolvido com Astro e Sanity CMS, com foco em acessibilidade, performance e SEO.

[![CI](https://github.com/Andrevictor20/isla-acess-vel/actions/workflows/verify.yml/badge.svg)](https://github.com/Andrevictor20/isla-acess-vel/actions/workflows/verify.yml)

---

## 🚀 Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Astro](https://astro.build) — geração estática (SSG) |
| UI / Componentes | React + Tailwind CSS v4 + Radix UI |
| CMS | [Sanity](https://sanity.io) — headless CMS |
| Deploy | [Vercel](https://vercel.com) |

---

## 📄 Páginas

| Rota | Descrição |
|---|---|
| `/` | Home — seções Hero, Sobre, Impacto, Serviços, Notícias, Parceiros, Contato |
| `/blog` | Listagem de todas as notícias publicadas |
| `/blog/[slug]` | Página de detalhe de cada notícia |
| `/rss.xml` | Feed RSS das notícias |

---

## 📰 Como funciona o Blog

O blog é alimentado pelo **Sanity CMS**. O fluxo é simples:

```
Você publica uma notícia no painel do Sanity
        ↓
O Sanity armazena o conteúdo na nuvem
        ↓
O Vercel faz um novo build do site (via Webhook)
        ↓ (~1-2 minutos)
A notícia aparece em /blog ✅
```

### Categorias disponíveis
- **Institucional** — ações e conquistas do ISLA
- **Eventos** — eventos e atividades
- **Campanhas** — campanhas de conscientização
- **Imprensa** — cobertura na mídia

### Campos de cada notícia
- Título, slug (URL), categoria e data de publicação
- Imagem principal com texto alternativo obrigatório (acessibilidade)
- Resumo (aparece nos cards da listagem)
- Conteúdo completo em rich text (Portable Text)
- Opção de destaque na home
- Título e descrição SEO opcionais

---

## ⚙️ Rodando localmente

### Pré-requisitos
- Node.js **≥ 22.12.0**
- Acesso ao projeto no [Sanity](https://sanity.io/manage)

### Instalação

```bash
git clone https://github.com/Andrevictor20/isla-acess-vel.git
cd isla-acess-vel
npm install
```

Configure as variáveis de ambiente copiando o arquivo de exemplo:

```bash
cp .env.example .env
# Preencha os valores no .env com os dados do seu projeto Sanity
```

### Comandos

```bash
npm run dev       # Site + painel Sanity em paralelo
npm run dev:site  # Apenas o site (porta 4321)
npm run studio    # Apenas o painel Sanity (porta 3333)
npm run build     # Build de produção
npm run check     # Verificação de tipos
npm run lint      # Lint
```

---

## ♿ Acessibilidade

Este projeto segue as diretrizes **WCAG 2.1 nível AA**:

- Estrutura semântica com HTML5
- ARIA labels em todos os componentes interativos
- Navegação por teclado
- Textos alternativos obrigatórios em todas as imagens
- Widget de acessibilidade integrado (ajuste de fonte e contraste)

---

## 📄 Licença

Desenvolvido para o **Instituto São Luís Acessível**. Todos os direitos reservados.
