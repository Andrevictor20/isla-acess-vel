import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'

// Lê o token de autenticação do Sanity CLI local
function getSanityToken() {
  try {
    const configPath = join(homedir(), '.config', 'sanity', 'config.json')
    const config = JSON.parse(readFileSync(configPath, 'utf-8'))
    return config.authToken
  } catch {
    return null
  }
}

const token = getSanityToken()
if (!token) {
  console.error('❌ Nenhum token do Sanity CLI encontrado. Faça login com: cd studio && npx sanity login')
  process.exit(1)
}

const client = createClient({
  projectId: 'bhpznnoe',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

async function seed() {
  console.log('🔍 Buscando autor André Victor...')
  const author = await client.fetch(`*[_type == "author" && slug.current == "andre-victor"][0]`)
  if (!author) {
    console.error('❌ Autor André Victor não encontrado. Execute o seed-fake-post.ts primeiro.')
    process.exit(1)
  }
  console.log('✅ Autor encontrado:', author.name, '| _id:', author._id)

  // ─── POST 1: Eventos ───────────────────────────────────────────────────────
  console.log('\n📰 Criando Notícia 2 — Eventos...')
  const post1 = await client.createOrReplace({
    _id: 'post-festival-inclusao-2024',
    _type: 'post',
    title: 'Festival de Inclusão 2024: ISLA Realiza 3 Dias de Cultura e Acessibilidade em São Luís',
    slug: { _type: 'slug', current: 'festival-de-inclusao-2024-isla-cultura-acessibilidade' },
    category: 'Eventos',
    publishedAt: new Date('2024-10-12T18:00:00.000Z').toISOString(),
    featured: false,
    author: { _type: 'reference', _ref: author._id },
    excerpt:
      'O Festival de Inclusão 2024, promovido pelo ISLA, reuniu artistas, educadores e a comunidade em três dias de apresentações culturais, oficinas acessíveis e debates sobre direitos das pessoas com deficiência.',
    body: [
      {
        _type: 'block',
        _key: 'ev-b1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ev-s1', marks: [], text: 'O Instituto São Luís Acessível (ISLA) realizou entre os dias 10 e 12 de outubro de 2024 a primeira edição do Festival de Inclusão, um evento cultural que transformou o Parque da Saudade em um espaço de encontro, arte e advocacy pela acessibilidade.' }],
      },
      {
        _type: 'block',
        _key: 'ev-b2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ev-s2', marks: [], text: 'Durante três dias, mais de dois mil visitantes participaram de shows musicais com intérpretes de LIBRAS, exposições de arte produzida por pessoas com deficiência visual, rodas de conversa com especialistas em políticas públicas de inclusão e oficinas gratuitas de braile, comunicação aumentativa e alternativa (CAA) e tecnologia assistiva.' }],
      },
      {
        _type: 'block',
        _key: 'ev-b3',
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ev-s3', marks: [], text: 'Cultura para Todos, Sem Exceção' }],
      },
      {
        _type: 'block',
        _key: 'ev-b4',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ev-s4', marks: [], text: '"Queremos mostrar que cultura e acessibilidade não são opostos — eles se complementam e se enriquecem", afirmou André Victor, diretor do ISLA, durante a abertura do evento. "Cada apresentação aqui foi pensada para que todos, sem exceção, possam vivenciar plenamente."' }],
      },
      {
        _type: 'block',
        _key: 'ev-b5',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ev-s5', marks: [], text: 'O festival contou com apoio da Secretaria Municipal de Cultura de São Luís e com patrocínio de empresas comprometidas com práticas ESG inclusivas. A organização já estuda a realização da 2ª edição para 2025, com expansão para outros municípios do Maranhão.' }],
      },
    ],
    seoTitle: 'Festival de Inclusão 2024 do ISLA em São Luís',
    seoDescription: 'O ISLA realizou o Festival de Inclusão 2024 com 3 dias de cultura, arte e acessibilidade reunindo mais de 2.000 pessoas no Parque da Saudade.',
  })
  console.log('✅ Notícia 2 criada! ID:', post1._id)

  // ─── POST 2: Campanhas ─────────────────────────────────────────────────────
  console.log('\n📰 Criando Notícia 3 — Campanhas...')
  const post2 = await client.createOrReplace({
    _id: 'post-campanha-sao-luis-acessivel',
    _type: 'post',
    title: "Campanha 'São Luís Acessível': ISLA Mapeia e Denuncia Barreiras Urbanas na Capital",
    slug: { _type: 'slug', current: 'campanha-sao-luis-acessivel-isla-mapeia-barreiras-urbanas' },
    category: 'Campanhas',
    publishedAt: new Date('2024-09-21T10:00:00.000Z').toISOString(),
    featured: false,
    author: { _type: 'reference', _ref: author._id },
    excerpt:
      "O ISLA lançou a campanha 'São Luís Acessível' para mapear e denunciar barreiras de acessibilidade nas ruas da capital maranhense, mobilizando voluntários e cobrando respostas do poder público.",
    body: [
      {
        _type: 'block',
        _key: 'ca-b1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ca-s1', marks: [], text: "O Instituto São Luís Acessível (ISLA) deu início à campanha 'São Luís Acessível', uma ação de advocacy e mapeamento participativo que tem como objetivo identificar, registrar e denunciar barreiras de acessibilidade nas vias públicas, estabelecimentos comerciais e equipamentos urbanos da capital maranhense." }],
      },
      {
        _type: 'block',
        _key: 'ca-b2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ca-s2', marks: [], text: 'A iniciativa mobilizou mais de 150 voluntários, entre pessoas com deficiência, estudantes de arquitetura e direito, e servidores públicos. Equipados com smartphones e um aplicativo desenvolvido pelo próprio ISLA, os participantes cadastraram mais de 900 ocorrências de calçadas quebradas, ausência de rampas, semáforos sonoros defeituosos e banheiros públicos inacessíveis.' }],
      },
      {
        _type: 'block',
        _key: 'ca-b3',
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ca-s3', marks: [], text: 'Relatório Entregue às Autoridades' }],
      },
      {
        _type: 'block',
        _key: 'ca-b4',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ca-s4', marks: [], text: 'Com os dados coletados, o ISLA produziu um relatório técnico detalhado entregue à Prefeitura de São Luís, à Câmara Municipal e ao Ministério Público do Maranhão. O documento inclui coordenadas GPS de cada barreira, fotos e sugestões de adequação baseadas na norma NBR 9050.' }],
      },
      {
        _type: 'block',
        _key: 'ca-b5',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'ca-s5', marks: [], text: '"Enquanto as calçadas quebrarem e as rampas não existirem, a cidade não é de todos. Esse mapeamento é nossa forma de exigir o que a lei já garante", declarou André Victor. A campanha continua aberta para novos registros através do site do ISLA.' }],
      },
    ],
    seoTitle: 'Campanha São Luís Acessível — ISLA mapeia barreiras urbanas',
    seoDescription: 'O ISLA mobilizou 150 voluntários para mapear mais de 900 barreiras de acessibilidade em São Luís e entregou relatório às autoridades.',
  })
  console.log('✅ Notícia 3 criada! ID:', post2._id)

  console.log('\n🎉 Todas as notícias foram criadas com sucesso!')
}

seed().catch((err) => {
  console.error('❌ Erro:', err.message || err)
  process.exit(1)
})
