'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Check, CheckCircle2, Heart, Phone, Scale, SlidersHorizontal, X } from 'lucide-react';
import { PageShell, SearchBox } from '@/components/site-chrome';

const groups = [
  { title: 'Veličina prostora', options: ['Manji prostor', 'Srednji prostor', 'Veliki prostor'] },
  { title: 'Funkcije', options: ['Pomoćni ležaj', 'Spremnik'] },
  { title: 'Udobnost i održavanje', options: ['Lakše ustajanje', 'Lako održavanje'] },
  { title: 'Budžet', options: ['Do 1.000 €', 'Do 1.500 €'] },
];

const products = [
  { name: 'Manila', size: '240 × 175 cm', seat: 'Provjeriti u salonu', bed: '200 × 160 cm', storage: 'Da', care: 'Lako održavanje', features: 'Ležaj · spremnik · manje dimenzije', price: '1.152,00 €', image: 'https://vespera.hr/wp-content/uploads/2026/07/1781691780_1781690676836_edit_338493474214675.png', tags: ['Manji prostor', 'Pomoćni ležaj', 'Spremnik', 'Do 1.500 €', 'Lako održavanje'], href: '/proizvod/manila', status: 'Dostupnost potvrđuje salon', tone: 'check' },
  { name: 'Soho', size: '252 × 158 cm', seat: 'Provjeriti u salonu', bed: 'Da', storage: 'Da', care: 'Prema odabranoj tkanini', features: 'Ležaj · spremnik · metalne nogice', price: '984,00 €', image: 'https://vespera.hr/wp-content/uploads/2026/06/Soho_ambijent.jpg', tags: ['Manji prostor', 'Pomoćni ležaj', 'Spremnik', 'Do 1.000 €'], href: '', status: 'Dostupno za narudžbu', tone: 'order' },
  { name: 'Asti', size: '270 × 176 cm', seat: 'Provjeriti u salonu', bed: 'Da', storage: 'Da', care: 'Više vrsta tkanine', features: 'Ležaj · spremnik · više boja', price: '1.384,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/09/ASTI.jpg', tags: ['Srednji prostor', 'Pomoćni ležaj', 'Spremnik', 'Do 1.500 €'], href: '', status: 'Provjerite varijantu', tone: 'check' },
  { name: 'Monaco', size: '290 × 220 cm', seat: '48 cm', bed: 'Da', storage: 'Da', care: 'Vodoodbojna tkanina', features: '48 cm visina sjedišta · vodoodbojna tkanina', price: '1.275,00 €', image: 'https://vespera.hr/wp-content/uploads/2026/06/Monaco_sastav02_dd822400.jpg', tags: ['Srednji prostor', 'Pomoćni ležaj', 'Spremnik', 'Do 1.500 €', 'Lakše ustajanje', 'Lako održavanje'], href: '', status: 'Posljednji primjerak', tone: 'last' },
  { name: 'Morgan', size: '310 × 240 cm', seat: 'Provjeriti u salonu', bed: 'Da', storage: 'Ladica', care: 'Prema odabranoj tkanini', features: 'Ležaj · ladica · lijevi ili desni kut', price: '1.536,00 €', image: 'https://vespera.hr/wp-content/uploads/2024/07/MORGAN-GRT.jpg', tags: ['Veliki prostor', 'Pomoćni ležaj', 'Spremnik'], href: '', status: 'Dostupno za narudžbu', tone: 'order' },
  { name: 'Yoka', size: '310 × 250 cm', seat: 'Provjeriti u salonu', bed: 'Da', storage: 'Da', care: 'Prema odabranoj tkanini', features: 'Ležaj · spremnik · prostrana', price: '960,65 €', image: 'https://vespera.hr/wp-content/uploads/2021/11/YOKA.jpg', tags: ['Veliki prostor', 'Pomoćni ležaj', 'Spremnik', 'Do 1.000 €'], href: '', status: 'Provjerite telefonom', tone: 'check' },
];

function inferredFilters(query: string) {
  const value = query.toLocaleLowerCase('hr');
  const tags: string[] = [];
  if (value.includes('manj')) tags.push('Manji prostor');
  if (value.includes('srednj')) tags.push('Srednji prostor');
  if (value.includes('velik')) tags.push('Veliki prostor');
  if (value.includes('ležaj') || value.includes('spavanje')) tags.push('Pomoćni ležaj');
  if (value.includes('spremnik') || value.includes('odlaganje')) tags.push('Spremnik');
  if (value.includes('ustaj')) tags.push('Lakše ustajanje');
  if (value.includes('održav')) tags.push('Lako održavanje');
  return tags;
}

function GarnitureContent() {
  const [selected, setSelected] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [compared, setCompared] = useState<string[]>([]);
  const [notice, setNotice] = useState('');
  const query = useSearchParams().get('q')?.trim() ?? '';
  const toggle = (option: string) => setSelected((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option]);
  const queryTags = inferredFilters(query);
  useEffect(() => {
    const restoreSaved = () => { try { setSaved(JSON.parse(localStorage.getItem('vespera-saved') ?? '[]')); } catch { setSaved([]); } };
    queueMicrotask(restoreSaved);
  }, []);
  const persistSaved = (next: string[]) => { setSaved(next); localStorage.setItem('vespera-saved', JSON.stringify(next)); };
  const toggleSaved = (name: string) => {
    const next = saved.includes(name) ? saved.filter((item) => item !== name) : [...saved, name];
    persistSaved(next);
    setNotice(saved.includes(name) ? `${name} je uklonjena sa spremljenog popisa.` : `${name} je spremljena za razgovor u salonu.`);
  };
  const toggleCompared = (name: string) => {
    if (compared.includes(name)) return setCompared(compared.filter((item) => item !== name));
    if (compared.length >= 3) return setNotice('Možete usporediti najviše tri modela odjednom.');
    setCompared([...compared, name]);
    setNotice('Model je dodan u usporedbu.');
  };
  const visible = products.filter((product) => {
    const matchesFilters = [...selected, ...queryTags].every((option) => product.tags.includes(option));
    const haystack = `${product.name} kutna garnitura ${product.size} ${product.features} ${product.tags.join(' ')}`.toLocaleLowerCase('hr');
    const matchesFreeText = !query || queryTags.length > 0 || haystack.includes(query.toLocaleLowerCase('hr'));
    return matchesFilters && matchesFreeText;
  });

  return <PageShell><main>
    <section className="listing-hero"><div className="container"><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><span>Garniture</span></nav><p className="eyebrow">Od prostora prema proizvodu</p><h1>Trebam novu garnituru</h1><p className="lead">Odaberite ono što vam je važno. Pokazat ćemo prikladnije modele i reći što treba provjeriti u salonu.</p><SearchBox /></div></section>

    <section className="section container listing-layout" aria-labelledby="filter-heading">
      <aside className="filters"><div className="filter-heading"><SlidersHorizontal aria-hidden="true" /><h2 id="filter-heading">Vaš odabir</h2></div>{groups.map((group) => <fieldset key={group.title}><legend>{group.title}</legend><div className="filter-row">{group.options.map((option) => <button type="button" key={option} className="filter-chip" aria-pressed={selected.includes(option)} onClick={() => toggle(option)}>{selected.includes(option) ? '✓ ' : ''}{option}</button>)}</div></fieldset>)}
        <div className="filter-meta"><p>{visible.length} {visible.length === 1 ? 'rezultat' : 'rezultata'}</p>{selected.length > 0 && <button className="clear-button" onClick={() => setSelected([])}>Očisti sve</button>}</div>
        <div className="filter-help"><strong>Niste sigurni?</strong><p>Recite nam dimenziju zida i što vam je najvažnije.</p><a href="tel:+38547645535"><Phone size={19} aria-hidden="true" /> Nazovite salon</a></div>
      </aside>

      <div className="results"><div className="results-intro"><p><strong>{visible.length} {visible.length === 1 ? 'model' : 'modela'}</strong> odgovara odabiru</p><span>Prikaz je koncept. Dostupnost uvijek potvrđuje salon.</span></div>
        {notice && <output className="tool-notice" aria-live="polite">{notice}</output>}
        {saved.length > 0 && <section className="saved-summary" aria-labelledby="saved-title"><div><Heart aria-hidden="true" /><span><strong id="saved-title">Spremljeno za razgovor</strong><small>{saved.join(', ')}</small></span></div><a href={`https://wa.me/?text=${encodeURIComponent(`Zanima me usporedba ovih Vespera modela: ${saved.join(', ')}. Molim informacije o dostupnosti.`)}`} target="_blank" rel="noreferrer">Pošaljite popis na WhatsApp</a></section>}
        {compared.length > 0 && <section className="compare-panel" aria-labelledby="compare-title"><div className="compare-head"><div><p className="eyebrow">Brža odluka</p><h2 id="compare-title">Usporedite modele</h2></div><button type="button" className="clear-button" onClick={() => setCompared([])}>Zatvorite usporedbu <X aria-hidden="true" /></button></div><div className="compare-scroll"><table><thead><tr><th scope="col">Važno za odluku</th>{compared.map((name) => <th scope="col" key={name}>{name}</th>)}</tr></thead><tbody>{[
          ['Cijena', 'price'], ['Dimenzije', 'size'], ['Visina sjedišta', 'seat'], ['Pomoćni ležaj', 'bed'], ['Spremnik', 'storage'], ['Održavanje', 'care'], ['Dostupnost', 'status'],
        ].map(([label, key]) => <tr key={key}><th scope="row">{label}</th>{compared.map((name) => { const product = products.find((item) => item.name === name)!; return <td key={name}>{String(product[key as keyof typeof product])}</td>; })}</tr>)}</tbody></table></div><p className="compare-note">Nepotpune podatke potvrdit će prodajni savjetnik. To je sigurnije nego prikazivati pretpostavljene vrijednosti.</p></section>}
        {query && <output className="query-note"><span>Rezultati za: <strong>“{query}”</strong></span><Link href="/garniture">Poništite pretragu</Link></output>}
        {selected.includes('Lakše ustajanje') && <div className="result-note"><strong>Savjet:</strong> Za lakše ustajanje tražite višu i čvršću sjedeću plohu. Monaco ima navedenu visinu sjedišta od 48 cm.</div>}
        {visible.length > 0 ? <div className="product-grid listing-products">{visible.map((product) => <article className="product-card" key={product.name}><div className="product-image"><Image src={product.image} alt={`Kutna garnitura ${product.name}`} width={960} height={720} sizes="(max-width: 620px) 100vw, (max-width: 920px) 50vw, 34vw" /></div><div className="product-body"><span className={`status status-${product.tone}`}>{product.status}</span><p className="product-kicker">Kutna garnitura · {product.size}</p><h3>{product.name}</h3><p className="product-features">{product.features}</p><div className="price"><strong>{product.price}</strong></div><div className="product-tools"><button type="button" aria-pressed={saved.includes(product.name)} onClick={() => toggleSaved(product.name)}>{saved.includes(product.name) ? <Check aria-hidden="true" /> : <Heart aria-hidden="true" />}{saved.includes(product.name) ? 'Spremljeno' : 'Spremite'}</button><button type="button" aria-pressed={compared.includes(product.name)} onClick={() => toggleCompared(product.name)}><Scale aria-hidden="true" />{compared.includes(product.name) ? 'U usporedbi' : 'Usporedite'}</button></div>{product.href ? <Link className="text-link" href={product.href}>Pogledajte model <ArrowRight size={19} aria-hidden="true" /></Link> : <a className="text-link" href="tel:+38547645535"><Phone size={19} aria-hidden="true" /> Provjerite u salonu</a>}</div></article>)}</div> : <div className="empty-result"><CheckCircle2 size={40} aria-hidden="true" /><h2>Nema točnog podudaranja</h2><p>Uklonite jedan uvjet ili nazovite. U salonu možemo provjeriti dodatne modele i izvedbe.</p><a href="tel:+38547645535" className="button button-accent">Nazovite 047 645 535</a></div>}
      </div>
    </section>
  </main></PageShell>;
}

export default function GarniturePage() {
  return <Suspense fallback={<PageShell><main><section className="listing-hero"><div className="container"><p className="eyebrow">Od prostora prema proizvodu</p><h1>Trebam novu garnituru</h1></div></section></main></PageShell>}><GarnitureContent /></Suspense>;
}
