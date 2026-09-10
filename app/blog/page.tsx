import Link from 'next/link';
import { ArrowRight, BookOpen, Phone } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';
import { blogPosts } from '@/lib/blog-posts';

export default function BlogPage() {
  return <PageShell><main>
    <section className="blog-hero"><div className="container"><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><span>Savjeti</span></nav><p className="eyebrow">Vespera savjeti</p><h1>Savjeti za sigurniju kupnju.</h1><p className="lead">Konkretni odgovori prije kupnje namještaja, mjerenja prostora ili planiranja kuhinje po mjeri.</p></div></section>

    <section className="section container" aria-labelledby="articles-heading"><div className="section-head"><div><p className="eyebrow">Najnoviji vodiči</p><h2 id="articles-heading">Pročitajte prije odluke.</h2></div><p>Svaki vodič možete pročitati za nekoliko minuta i ponijeti njegove savjete u salon.</p></div><div className="blog-grid">{blogPosts.map((post, index) => <article className="blog-card" key={post.slug}><span className="blog-index">0{index + 1}</span><p className="blog-meta">{post.category} · {post.readTime}</p><h3>{post.title}</h3><p>{post.intro}</p><Link className="text-link" href={`/blog/${post.slug}`}>Pročitajte vodič <ArrowRight size={20} aria-hidden="true" /></Link></article>)}</div></section>

    <section className="blog-help"><div className="container"><BookOpen size={42} aria-hidden="true" /><div><p className="eyebrow">Trebate konkretnu pomoć?</p><h2>Neke odluke lakše su u razgovoru.</h2><p>Ponesite mjere ili fotografije prostora. U salonu možete usporediti mogućnosti i dobiti odgovor za svoju situaciju.</p></div><a className="button button-accent" href="tel:+38547645535"><Phone aria-hidden="true" /> Nazovite 047 645 535</a></div></section>
  </main></PageShell>;
}
