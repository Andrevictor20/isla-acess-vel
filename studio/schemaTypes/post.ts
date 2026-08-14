import { defineType, defineField } from 'sanity';

export const postSchema = defineType({
  name: 'post',
  title: 'Notícia',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(150).error('Título obrigatório (5–150 caracteres)'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required().error('Slug obrigatório para gerar a URL da notícia'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem principal',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo (acessibilidade)',
          type: 'string',
          validation: (Rule) =>
            Rule.required().error(
              'Texto alternativo é OBRIGATÓRIO — descreva a imagem para usuários com deficiência visual.',
            ),
        }),
      ],
      validation: (Rule) => Rule.required().error('Imagem principal obrigatória'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo (aparece nos cards)',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.required().min(20).max(280).error('Resumo obrigatório (20–280 caracteres)'),
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo completo',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              validation: (Rule) =>
                Rule.required().error('Toda imagem precisa de texto alternativo (WCAG AA)'),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Institucional', value: 'Institucional' },
          { title: 'Eventos', value: 'Eventos' },
          { title: 'Imprensa', value: 'Imprensa' },
          { title: 'Campanhas', value: 'Campanhas' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Selecione uma categoria'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('Data de publicação obrigatória'),
    }),
    defineField({
      name: 'featured',
      title: 'Destacar na home?',
      type: 'boolean',
      initialValue: false,
      description: 'Posts em destaque aparecem no topo da seção de notícias da home.',
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'Título SEO (opcional)',
      type: 'string',
      description: 'Se vazio, usa o título da notícia. Máx. 60 caracteres.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descrição SEO (opcional)',
      type: 'text',
      rows: 2,
      description: 'Se vazia, usa o resumo. Máx. 160 caracteres.',
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      category: 'category',
    },
    prepare({ title, author, media, category }) {
      return {
        title,
        subtitle: [category, author].filter(Boolean).join(' · '),
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Data de publicação, mais recente',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
