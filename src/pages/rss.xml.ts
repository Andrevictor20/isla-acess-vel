import rss from '@astrojs/rss';
import { sanityClient, ALL_POSTS_QUERY } from '@/lib/sanity';
import type { SanityPost } from '@/lib/sanity';
import { SITE } from '@/lib/constants';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  let posts: SanityPost[] = [];
  try {
    posts = await sanityClient.fetch<SanityPost[]>(ALL_POSTS_QUERY);
  } catch {
    posts = [];
  }

  return rss({
    title: `${SITE.name} — Notícias`,
    description: SITE.description,
    site: context.site?.href ?? SITE.url,
    items: posts.map((post) => ({
      title: post.title,
      description: post.excerpt,
      pubDate: new Date(post.publishedAt),
      link: `/blog/${post.slug.current}`,
      categories: [post.category],
    })),
    customData: '<language>pt-BR</language>',
    stylesheet: false,
  });
}
