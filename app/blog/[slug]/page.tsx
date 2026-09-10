import Link from 'next/link';
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/site-chrome';
import { blogPosts, getBlogPost } from '@/lib/blog-posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return <PageShell><main>
    <article className="article-page"><header className="article-header"><div className="narrow"><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><Link href="/blog">Blog</Link></nav><p className="eyebrow">{post.category} · {post.readTime}</p><h1>{post.title}</h1><p className="lead">{post.intro}</p></div></header>
      <div className="narrow article-content">{post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}</section>)}<div className="article-cta"><h2>Sljedeći korak</h2><p>Primijenite vodič na svoj prostor ili razgovarajte sa savjetnikom u salonu.</p><div className="hero-actions"><Link className="button button-accent" href={post.ctaHref}>{post.ctaLabel} <ArrowRight aria-hidden="true" /></Link><a className="button button-light" href="tel:+38547645535"><Phone aria-hidden="true" /> Nazovite salon</a></div></div><Link className="text-link back-link" href="/blog"><ArrowLeft aria-hidden="true" /> Natrag na sve vodiče</Link></div>
    </article>
  </main></PageShell>;
}
