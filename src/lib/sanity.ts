import { createClient } from '@sanity/client';

// groq is just a tagged template literal for syntax highlighting — no runtime magic needed
const groq = (strings: TemplateStringsArray, ...values: unknown[]) =>
  strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '');

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? 'placeholder',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2025-08-14',
  useCdn: true,
});

// ──────────────────────────────────────────
// GROQ Queries
// ──────────────────────────────────────────

/** All published posts ordered by date */
export const ALL_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    category,
    publishedAt,
    featured,
    "authorName": author->name,
  }
`;

/** Latest N posts for home preview */
export const RECENT_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc)[0..2] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    category,
    publishedAt,
  }
`;

/** Single post by slug */
export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    body,
    category,
    publishedAt,
    featured,
    seoTitle,
    seoDescription,
    "authorName": author->name,
    "authorPhoto": author->photo,
    "authorRole": author->role,
  }
`;

/** All slugs — for getStaticPaths */
export const ALL_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    publishedAt,
  }
`;

/** Posts by category */
export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    category,
    publishedAt,
  }
`;

/** Site settings singleton */
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    impactStats,
    contactInfo,
    socialLinks,
    testimonials,
    partners,
  }
`;

// ──────────────────────────────────────────
// Types
// ──────────────────────────────────────────

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: SanityImage;
  excerpt: string;
  category: 'Institucional' | 'Eventos' | 'Imprensa' | 'Campanhas';
  publishedAt: string;
  featured?: boolean;
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
  authorName?: string;
  authorPhoto?: SanityImage;
  authorRole?: string;
}

export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}

export interface PortableTextBlock {
  _type: 'block' | 'image';
  [key: string]: unknown;
}

export interface SiteSettings {
  impactStats?: Array<{ value: number; suffix: string; label: string }>;
  contactInfo?: {
    address?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
  };
  testimonials?: Array<{
    name: string;
    role: string;
    text: string;
    photo?: SanityImage;
  }>;
  partners?: Array<{
    name: string;
    logo?: SanityImage;
    url?: string;
  }>;
}

export { groq };
