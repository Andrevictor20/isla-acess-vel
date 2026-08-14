import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './sanity';
import type { SanityImage } from './sanity';

const builder = imageUrlBuilder(sanityClient);

/**
 * Build a Sanity image URL with CDN transformations.
 * Always use this helper — never serve images without resizing.
 */
export function urlFor(source: SanityImage | undefined | null) {
  if (!source) return null;
  return builder.image(source);
}

/**
 * Generate a srcset string for responsive images.
 */
export function urlForSrcset(
  source: SanityImage | undefined | null,
  widths: number[] = [400, 800, 1200],
): string {
  if (!source) return '';
  return widths
    .map((w) => `${urlFor(source)?.width(w).auto('format').url()} ${w}w`)
    .join(', ');
}
