import type { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-posts';
import { catalogProducts } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vespera-concept-redesign.vercel.app';
  const updated = new Date('2026-09-29');
  const staticPages = ['', '/namjestaj', '/garniture', '/kuhinje', '/vizualizator', '/blog', '/novosti', '/informacije'];
  return [
    ...staticPages.map((path) => ({ url: `${siteUrl}${path}`, lastModified: updated, changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : .8 })),
    ...blogPosts.map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: new Date(post.updatedAt), changeFrequency: 'monthly' as const, priority: .7 })),
    ...catalogProducts.map((product) => ({ url: `${siteUrl}${product.href ?? `/proizvod/${product.slug}`}`, lastModified: updated, changeFrequency: 'weekly' as const, priority: .7 })),
  ];
}
