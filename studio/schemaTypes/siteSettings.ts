import { defineType, defineField } from 'sanity';

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'impactStats',
      title: 'Estatísticas de Impacto',
      type: 'array',
      description: 'Números exibidos na seção "Nosso Impacto".',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Número', type: 'number', validation: (Rule) => Rule.required().integer().positive() }),
            defineField({ name: 'suffix', title: 'Sufixo (ex: +, %)', type: 'string' }),
            defineField({ name: 'label', title: 'Rótulo', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),

    defineField({
      name: 'contactInfo',
      title: 'Informações de Contato',
      type: 'object',
      fields: [
        defineField({ name: 'address', title: 'Endereço', type: 'string' }),
        defineField({ name: 'phone', title: 'Telefone', type: 'string' }),
        defineField({ name: 'whatsapp', title: 'WhatsApp (com +55)', type: 'string' }),
        defineField({ name: 'email', title: 'E-mail', type: 'string' }),
      ],
    }),

    defineField({
      name: 'socialLinks',
      title: 'Redes Sociais',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram (URL)', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook (URL)', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube (URL)', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok (URL)', type: 'url' }),
      ],
    }),

    defineField({
      name: 'testimonials',
      title: 'Depoimentos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Nome', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'role', title: 'Cargo / Relação com o ISLA', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'text', title: 'Depoimento', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
            defineField({
              name: 'photo',
              title: 'Foto (opcional)',
              type: 'image',
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Texto alternativo',
                  type: 'string',
                  validation: (Rule) => Rule.required().error('Texto alternativo obrigatório para a foto'),
                }),
              ],
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'role' } },
        },
      ],
    }),

    defineField({
      name: 'partners',
      title: 'Parceiros',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Nome do parceiro', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Texto alternativo',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
            defineField({ name: 'url', title: 'Site (URL)', type: 'url' }),
          ],
          preview: { select: { title: 'name', media: 'logo' } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configurações do Site' };
    },
  },
});
