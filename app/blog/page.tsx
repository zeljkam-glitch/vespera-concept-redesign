import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, Phone } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';
import { blogPosts } from '@/lib/blog-posts';

export const metadata: Metadata = {
  title: 'Savjeti za namještaj i kuhinje po mjeri | Vespera',
  description: 'Praktični savjeti Vespera salona o odabiru namještaja, mjerenju prostora, udobnosti, kuhinjama po mjeri, dostavi i održavanju.',
};

export default function BlogPage() {
  return <PageShell><main>
    <section className="blog-hero"><div className="container"><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><span>Savjeti</span></nav><p className="eyebrow">Vespera savjeti</p><h1>Praktični odgovori za bolji dom.</h1><p className="lead">Vodiči iz iskustva salona o namještaju, mjerama, udobnosti, održavanju i planiranju kuhinje po mjeri.</p><nav className="blog-topics" aria-label="Teme vodiča"><a href="#svi-vodici">Svi vodiči</a><Link href="/kuhinje">Kuhinje po mjeri</Link><Link href="/garniture">Garniture</Link><Link href="/namjestaj?prostorija=Spavaća+soba">Spavaće sobe</Link></nav></div></section>

    <section className="section container" id="svi-vodici" aria-labelledby="articles-heading"><div className="section-head"><div><p className="eyebrow">Vodiči prije kupnje</p><h2 id="articles-heading">Od mjerenja do montaže.</h2></div><p>Kratki odgovori prvo, a zatim detaljne upute koje možete primijeniti kod kuće ili ponijeti u salon.</p></div><div className="blog-grid">{blogPosts.map((post, index) => <article className="blog-card" key={post.slug}><Link className="blog-card-image" href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true"><Image src={post.image} alt="" width={760} height={480} sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw" /></Link><div className="blog-card-copy"><span className="blog-index">{String(index + 1).padStart(2, '0')}</span><p className="blog-meta">{post.category} · {post.readTime}</p><h3>{post.title}</h3><p>{post.quickAnswer}</p><Link className="text-link" href={`/blog/${post.slug}`}>Pročitajte vodič <ArrowRight size={20} aria-hidden="true" /></Link></div></article>)}</div></section>

    <section className="blog-help"><div className="container"><BookOpen size={42} aria-hidden="true" /><div><p className="eyebrow">Trebate konkretnu pomoć?</p><h2>Neke odluke lakše su u razgovoru.</h2><p>Ponesite mjere ili fotografije prostora. U salonu možete usporediti mogućnosti i dobiti odgovor za svoju situaciju.</p></div><a className="button button-accent" href="tel:+38547645535"><Phone aria-hidden="true" /> Nazovite 047 645 535</a></div></section>
  </main></PageShell>;
}
