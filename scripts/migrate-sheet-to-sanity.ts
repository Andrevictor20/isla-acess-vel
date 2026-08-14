/**
 * One-shot migration: Google Sheets (gviz) → Sanity CMS
 *
 * Usage:
 *   npx tsx scripts/migrate-sheet-to-sanity.ts
 *
 * Requires SANITY_API_TOKEN (write token) in environment.
 */

import { createClient } from '@sanity/client';

const SHEETS_URL =
  'https://docs.google.com/spreadsheets/d/1iWeJsvLaZDr8M1cBO8Th_Vu6LNc3NBChlLzObXh7bww/gviz/tq?tqx=out:json';

const sanityClient = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2025-08-14',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s]+/g, '-')
    .slice(0, 96);
}

const TAG_TO_CATEGORY: Record<string, string> = {
  institucional: 'Institucional',
  eventos: 'Eventos',
  evento: 'Eventos',
  imprensa: 'Imprensa',
  campanha: 'Campanhas',
  campanhas: 'Campanhas',
};

function mapCategory(tag: string): string {
  const lower = (tag ?? '').toLowerCase();
  return TAG_TO_CATEGORY[lower] ?? 'Institucional';
}

function parseGvizDate(raw: unknown): string {
  if (!raw) return new Date().toISOString();
  if (typeof raw === 'object' && raw !== null) {
    const d = raw as { year?: number; month?: number; day?: number };
    if (d.year !== undefined && d.month !== undefined && d.day !== undefined) {
      return new Date(d.year, d.month, d.day).toISOString();
    }
  }
  const str = String(raw).trim();
  const match = str.match(/^Date\((\d{4}),(\d{1,2}),(\d{1,2})\)$/i);
  if (match) {
    return new Date(
      parseInt(match[1], 10),
      parseInt(match[2], 10),
      parseInt(match[3], 10),
    ).toISOString();
  }
  const parsed = new Date(str);
  return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

async function main() {
  console.log('📰 Buscando dados da planilha Google Sheets...');
  const res = await fetch(SHEETS_URL);
  if (!res.ok) throw new Error(`Falha ao buscar planilha: ${res.status}`);
  const raw = await res.text();

  const jsonStr = raw.replace(/^[^{]*/, '').replace(/[^}]*$/, '');
  const parsed = JSON.parse(jsonStr);
  const rows: unknown[] = parsed?.table?.rows ?? [];
  const cols: unknown[] = parsed?.table?.cols ?? [];

  const colIndex: Record<string, number> = {};
  (cols as Array<{ label?: string }>).forEach((c, i) => {
    colIndex[(c.label ?? '').toLowerCase().trim()] = i;
  });

  const news: Array<{ titulo: string; resumo: string; tag: string; data: unknown }> = rows
    .map((row) => {
      const c = ((row as { c?: unknown[] }).c) ?? [];
      const get = (key: string) => (c as Array<{ v?: unknown }>)[colIndex[key]]?.v;
      return {
        titulo: String(get('titulo') ?? '').trim(),
        resumo: String(get('resumo') ?? '').trim(),
        tag: String(get('tag') ?? '').trim(),
        data: get('data'),
      };
    })
    .filter((n) => n.titulo.length > 0);

  console.log(`✅ ${news.length} notícias encontradas. Importando para o Sanity...`);

  let created = 0;
  let skipped = 0;

  for (const n of news) {
    const slug = slugify(n.titulo);
    const docId = `migrated-${slug}`.slice(0, 60);

    const doc = {
      _type: 'post',
      _id: docId,
      title: n.titulo,
      slug: { _type: 'slug', current: slug },
      excerpt: n.resumo || n.titulo,
      category: mapCategory(n.tag),
      publishedAt: parseGvizDate(n.data),
      featured: false,
    };

    try {
      await sanityClient.createOrReplace(doc);
      console.log(`  ✔ Criado: "${n.titulo}"`);
      created++;
    } catch (err) {
      console.warn(`  ⚠ Pulado "${n.titulo}":`, (err as Error).message);
      skipped++;
    }
  }

  console.log(`\n🎉 Migração concluída: ${created} criados, ${skipped} pulados.`);
}

main().catch((err) => {
  console.error('❌ Erro fatal:', err);
  process.exit(1);
});
