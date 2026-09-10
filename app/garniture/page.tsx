'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Phone, SlidersHorizontal } from 'lucide-react';
import { PageShell, SearchBox } from '@/components/site-chrome';

const groups = [
  { title: 'Veličina prostora', options: ['Manji prostor', 'Srednji prostor', 'Veliki prostor'] },
  { title: 'Funkcije', options: ['Pomoćni ležaj', 'Spremnik'] },
  { title: 'Udobnost i održavanje', options: ['Lakše ustajanje', 'Lako održavanje'] },
  { title: 'Budžet', options: ['Do 1.000 €', 'Do 1.500 €'] },
];

const products = [
  { name: 'Manila', size: '240 × 175 cm', features: 'Ležaj · spremnik · manje dimenzije', price: '1.152,00 €', image: 'https://vespera.hr/wp-content/uploads/2026/07/1781691780_1781690676836_edit_338493474214675.png', tags: ['Manji prostor', 'Pomoćni ležaj', 'Spremnik', 'Do 1.500 €', 'Lako održavanje'], href: '/proizvod/manila', status: 'Dostupnost potvrđuje salon', tone: 'check' },
  { name: 'Soho', size: '252 × 158 cm', features: 'Ležaj · spremnik · metalne nogice', price: '984,00 €', image: 'https://vespera.hr/wp-content/uploads/2024/07/soho-1-300x300.jpg', tags: ['Manji prostor', 'Pomoćni ležaj', 'Spremnik', 'Do 1.000 €'], href: '/proizvod/manila', status: 'Dostupno za narudžbu', tone: 'order' },
  { name: 'Asti', size: '270 × 176 cm', features: 'Ležaj · spremnik · više boja', price: '1.384,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/09/ASTI-300x300.jpg', tags: ['Srednji prostor', 'Pomoćni ležaj', 'Spremnik', 'Do 1.500 €'], href: '/proizvod/manila', status: 'Provjerite varijantu', tone: 'check' },
  { name: 'Monaco', size: '290 × 220 cm', features: '48 cm visina sjedišta · vodoodbojna tkanina', price: '1.275,00 €', image: 'https://vespera.hr/wp-content/uploads/2026/06/ambijent-3-960x540.jpg', tags: ['Srednji prostor', 'Pomoćni ležaj', 'Spremnik', 'Do 1.500 €', 'Lakše ustajanje', 'Lako održavanje'], href: '/proizvod/manila', status: 'Posljednji primjerak', tone: 'last' },
  { name: 'Morgan', size: '310 × 240 cm', features: 'Ležaj · ladica · lijevi ili desni kut', price: '1.536,00 €', image: 'https://vespera.hr/wp-content/uploads/2024/07/MORGAN-GRT-300x300.jpg', tags: ['Veliki prostor', 'Pomoćni ležaj', 'Spremnik'], href: '/proizvod/manila', status: 'Dostupno za narudžbu', tone: 'order' },
  { name: 'Yoka', size: '310 × 250 cm', features: 'Ležaj · spremnik · prostrana', price: '960,65 €', image: 'https://vespera.hr/wp-content/uploads/2021/11/YOKA.jpg', tags: ['Veliki prostor', 'Pomoćni ležaj', 'Spremnik', 'Do 1.000 €'], href: '/proizvod/manila', status: 'Status se provjerava', tone: 'check' },
];

export default function GarniturePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (option: string) => setSelected((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option]);
  const visible = selected.length === 0 ? products : products.filter((product) => selected.every((option) => product.tags.includes(option)));

  return <PageShell><main>
    <section className="listing-hero"><div className="container"><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><span>Garniture</span></nav><p className="eyebrow">Od prostora prema proizvodu</p><h1>Trebam novu garnituru</h1><p className="lead">Odaberite ono što vam je važno. Pokazat ćemo prikladnije modele i reći što treba provjeriti u salonu.</p><SearchBox /></div></section>

    <section className="section container listing-layout" aria-labelledby="filter-heading">
      <aside className="filters"><div className="filter-heading"><SlidersHorizontal aria-hidden="true" /><h2 id="filter-heading">Vaš odabir</h2></div>{groups.map((group) => <fieldset key={group.title}><legend>{group.title}</legend><div className="filter-row">{group.options.map((option) => <button type="button" key={option} className="filter-chip" aria-pressed={selected.includes(option)} onClick={() => toggle(option)}>{selected.includes(option) ? '✓ ' : ''}{option}</button>)}</div></fieldset>)}
        <div className="filter-meta"><p>{visible.length} {visible.length === 1 ? 'rezultat' : 'rezultata'}</p>{selected.length > 0 && <button className="clear-button" onClick={() => setSelected([])}>Očisti sve</button>}</div>
        <div className="filter-help"><strong>Niste sigurni?</strong><p>Recite nam dimenziju zida i što vam je najvažnije.</p><a href="tel:+38547645535"><Phone size={19} aria-hidden="true" /> Nazovite salon</a></div>
      </aside>

      <div className="results"><div className="results-intro"><p><strong>{visible.length} modela</strong> odgovara odabiru</p><span>Prikaz je koncept. Dostupnost uvijek potvrđuje salon.</span></div>
        {selected.includes('Lakše ustajanje') && <div className="result-note"><strong>Savjet:</strong> Za lakše ustajanje tražite višu i čvršću sjedeću plohu. Monaco ima navedenu visinu sjedišta od 48 cm.</div>}
        {visible.length > 0 ? <div className="product-grid listing-products">{visible.map((product) => <article className="product-card" key={product.name}><Link href={product.href}><div className="product-image"><img src={product.image} alt={`Kutna garnitura ${product.name}`} /></div><div className="product-body"><span className={`status status-${product.tone}`}>{product.status}</span><p className="product-kicker">Kutna garnitura · {product.size}</p><h3>{product.name}</h3><p className="product-features">{product.features}</p><div className="price"><strong>{product.price}</strong></div><span className="text-link">Pogledajte model <ArrowRight size={19} aria-hidden="true" /></span></div></Link></article>)}</div> : <div className="empty-result"><CheckCircle2 size={40} aria-hidden="true" /><h2>Nema točnog podudaranja</h2><p>Uklonite jedan uvjet ili nazovite. U salonu možemo provjeriti dodatne modele i izvedbe.</p><a href="tel:+38547645535" className="button button-accent">Nazovite 047 645 535</a></div>}
      </div>
    </section>
  </main></PageShell>;
}
