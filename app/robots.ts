import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vespera-concept-redesign.vercel.app';
  const isOfficialSite = process.env.NEXT_PUBLIC_OFFICIAL_SITE === 'true';
  return isOfficialSite
    ? { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}/sitemap.xml` }
    : { rules: { userAgent: '*', disallow: '/' } };
}
