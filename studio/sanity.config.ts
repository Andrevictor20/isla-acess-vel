import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

const projectId = 
  (typeof process !== 'undefined' && process.env ? process.env.PUBLIC_SANITY_PROJECT_ID : (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.PUBLIC_SANITY_PROJECT_ID : null)) 
  ?? 'bhpznnoe';
const dataset = 
  (typeof process !== 'undefined' && process.env ? process.env.PUBLIC_SANITY_DATASET : (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.PUBLIC_SANITY_DATASET : null)) 
  ?? 'production';

export default defineConfig({
  projectId,
  dataset,
  name: 'isla-studio',
  title: 'ISLA — Painel de Conteúdo',
  basePath: '/',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem()
              .title('Configurações do Site')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),
            S.divider(),
            S.listItem()
              .title('Notícias')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Notícias')),
            S.listItem()
              .title('Autores')
              .schemaType('author')
              .child(S.documentTypeList('author').title('Autores')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
