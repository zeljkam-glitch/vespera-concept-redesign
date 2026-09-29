import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/site-chrome';
import { blogPosts, getBlogPost } from '@/lib/blog-posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.seoTitle,
      description: post.metaDescription,
      images: [{ url: post.image, alt: post.imageAlt }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

function sectionId(heading: string) {
  return heading.toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default async function BlogArticlePage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vespera-concept-redesign.vercel.app';
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: [post.image],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'Vespera namještaj', url: siteUrl },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.questions.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Početna', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Savjeti', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  };
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category)).slice(0, 3);

  return <PageShell><main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <article className="article-page"><header className="article-header"><div className="narrow"><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><Link href="/blog">Savjeti</Link></nav><p className="eyebrow">{post.category} · {post.readTime}</p><h1>{post.title}</h1><p className="lead">{post.intro}</p><p className="article-byline">Pripremili: <strong>{post.author}</strong> · Ažurirano {new Intl.DateTimeFormat('hr-HR').format(new Date(post.updatedAt))}</p></div><div className="article-cover"><Image src={post.image} alt={post.imageAlt} width={1680} height={900} sizes="100vw" priority /></div></header>
      <div className="narrow article-content"><aside className="quick-answer" aria-labelledby="quick-answer-title"><p className="eyebrow">Odgovor ukratko</p><h2 id="quick-answer-title">Što je najvažnije?</h2><p>{post.quickAnswer}</p></aside><nav className="article-toc" aria-label="Sadržaj članka"><strong>U ovom vodiču</strong>{post.sections.map((section) => <a key={section.heading} href={`#${sectionId(section.heading)}`}>{section.heading}</a>)}</nav>{post.sections.map((section) => <section id={sectionId(section.heading)} key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}</section>)}<section className="article-faq" aria-labelledby="article-faq-title"><p className="eyebrow">Najčešća pitanja</p><h2 id="article-faq-title">Kratki i jasni odgovori.</h2>{post.questions.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section><div className="article-cta"><h2>Sljedeći korak</h2><p>Primijenite vodič na svoj prostor ili razgovarajte sa savjetnikom u salonu.</p><div className="hero-actions"><Link className="button button-accent" href={post.ctaHref}>{post.ctaLabel} <ArrowRight aria-hidden="true" /></Link><a className="button button-light" href="tel:+38547645535"><Phone aria-hidden="true" /> Nazovite salon</a></div></div><section className="related-guides" aria-labelledby="related-title"><p className="eyebrow">Povezani vodiči</p><h2 id="related-title">Nastavite s pripremom.</h2>{relatedPosts.map((item) => <Link key={item.slug} href={`/blog/${item.slug}`}><span>{item.category}</span><strong>{item.title}</strong><ArrowRight aria-hidden="true" /></Link>)}</section><Link className="text-link back-link" href="/blog"><ArrowLeft aria-hidden="true" /> Natrag na sve vodiče</Link></div>
    </article>
  </main></PageShell>;
}
