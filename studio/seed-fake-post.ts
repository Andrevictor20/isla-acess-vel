import { getCliClient } from 'sanity/cli'
import fs from 'fs'
import path from 'path'

async function seed() {
  const client = getCliClient({ apiVersion: '2024-01-01' })

  console.log('🚀 Criando Autor: André Victor...')
  const author = await client.createOrReplace({
    _id: 'author-andre-victor',
    _type: 'author',
    name: 'André Victor',
    slug: { _type: 'slug', current: 'andre-victor' },
    role: 'Diretor Executivo do ISLA',
    bio: 'Ativista, desenvolvedor e líder institucional na defesa da acessibilidade e inclusão social em São Luís.'
  })

  console.log('📸 Uploading imagem principal para o Sanity Assets...')
  const imagePath = path.resolve('../public/images/noticia-conquista.png')
  const imageStream = fs.createReadStream(imagePath)
  
  const imageAsset = await client.assets.upload('image', imageStream, {
    filename: 'noticia-conquista.png'
  })

  console.log('📰 Criando Notícia Fictícia...')
  const post = await client.createOrReplace({
    _id: 'post-isla-centro-comunitario',
    _type: 'post',
    title: 'ISLA Inaugura o Primeiro Centro Comununitário de Tecnologia Assistiva de São Luís',
    slug: { _type: 'slug', current: 'isla-inaugura-primeiro-centro-comunitario-acessivel' },
    category: 'Institucional',
    publishedAt: new Date().toISOString(),
    featured: true,
    author: {
      _type: 'reference',
      _ref: author._id
    },
    mainImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageAsset._id
      },
      alt: 'Fachada moderna do Centro Comununitário do ISLA em São Luís, com rampas de acessibilidade, piso tátil e pessoas com e sem deficiência sorrindo na entrada.'
    },
    excerpt: 'Em um marco histórico para o Maranhão, o Instituto São Luís Acessível (ISLA) entregou seu primeiro centro comunitário 100% adaptado com laboratório de tecnologia assistiva gratuito.',
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'O Instituto São Luís Acessível (ISLA) celebrou hoje uma das maiores conquistas de sua história. Com a presença de membros da comunidade, ativistas e famílias atendidas, foi inaugurado o novo Centro Comunitário de Tecnologia Assistiva no coração de São Luís (MA).'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'Tecnologia ao Serviço da Inclusão'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's3',
            text: 'O espaço conta com laboratórios equipados com leitores de tela avançados, mouses oculares, impressoras Braille e oficinas práticas de orientação e mobilidade urbana. Todas as instalações seguem rigorosamente a norma NBR 9050 de acessibilidade universal.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'b4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's4',
            text: '"Este centro é o resultado de anos de luta coletiva. Nosso objetivo é garantir que nenhuma pessoa com deficiência em São Luís fique à margem das oportunidades educacionais e profissionais por falta de recursos assistivos", declarou André Victor, Diretor do ISLA.'
          }
        ]
      }
    ],
    seoTitle: 'ISLA Inaugura Centro Comununitário Acessível em São Luís',
    seoDescription: 'Novo centro do ISLA oferece tecnologia assistiva e oficinas gratuitas para pessoas com deficiência no Maranhão.'
  })

  console.log('✅ Sucesso! Notícia e Autor criados com ID:', post._id)
}

seed().catch((err) => {
  console.error('❌ Erro ao criar conteúdo:', err)
  process.exit(1)
})
