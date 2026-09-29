'use client';

import { Suspense, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CirclePercent, Phone, Search, SlidersHorizontal } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';
import { catalogProducts, roomLinks } from '@/lib/products';

const statuses = ['Na zalihi', 'Po narudžbi', 'Izložbeni primjerak'];

function CatalogContent() {
  const params = useSearchParams();
  const initialQuery = params.get('q') ?? '';
  const initialRoom = params.get('prostorija') ?? 'Sve prostorije';
  const salesOnly = params.get('akcija') === 'da';
  const [query, setQuery] = useState(initialQuery);
  const [room, setRoom] = useState(initialRoom);
  const [status, setStatus] = useState('Sve dostupnosti');

  const products = useMemo(() => catalogProducts.filter((product) => {
    const text = `${product.name} ${product.type} ${product.room} ${product.features.join(' ')}`.toLocaleLowerCase('hr');
    const matchesQuery = !query.trim() || text.includes(query.trim().toLocaleLowerCase('hr'));
    const matchesRoom = room === 'Sve prostorije' || product.room === room;
    const matchesStatus = status === 'Sve dostupnosti' || product.status === status;
    return matchesQuery && matchesRoom && matchesStatus && (!salesOnly || Boolean(product.discount));
  }), [query, room, status, salesOnly]);

  return (
    <PageShell><main>
      <section className="catalog-hero">
        <div className="container catalog-hero-grid">
          <div><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><span>Namještaj</span></nav><p className="eyebrow">Pregled kao webshop, kupnja uz savjet</p><h1>{salesOnly ? 'Aktualne akcije' : 'Namještaj za cijeli dom'}</h1><p className="lead">Pregledajte modele, cijene i mogućnosti. Proizvod rezervirate ili naručujete razgovorom sa salonom, bez nesigurne online kupnje.</p></div>
          <aside><strong>Važno</strong><p>Ponuda se mijenja svaki tjedan. Prije dolaska potvrdite model, boju i dostupnost telefonom.</p><a href="tel:+38547645535"><Phone aria-hidden="true" /> 047 645 535</a></aside>
        </div>
      </section>

      <section className="room-nav container" aria-labelledby="room-heading"><div className="room-nav-head"><p className="eyebrow">Pronađite prema prostoriji</p><h2 id="room-heading">Gdje uređujete?</h2></div><div className="room-link-grid">{roomLinks.map((item) => <Link href={item.href} key={item.name}><strong>{item.name}</strong><span>{item.description}</span></Link>)}</div></section>

      <section className="section container catalog-layout" aria-label="Katalog proizvoda">
        <aside className="catalog-filters"><div className="filter-heading"><SlidersHorizontal aria-hidden="true" /><h2>Filtrirajte</h2></div>
          <label><span>Pretražite ponudu</span><div className="catalog-search"><Search aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Naziv, vrsta ili svojstvo" /></div></label>
          <label><span>Prostorija</span><select value={room} onChange={(event) => setRoom(event.target.value)}><option>Sve prostorije</option><option>Dnevni boravak</option><option>Spavaća soba</option><option>Kuhinja</option></select></label>
          <label><span>Dostupnost</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>Sve dostupnosti</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label>
          <button type="button" className="clear-button" onClick={() => { setQuery(''); setRoom('Sve prostorije'); setStatus('Sve dostupnosti'); }}>Očistite filtre</button>
          <div className="catalog-help"><strong>Ne nalazite što tražite?</strong><p>U salonu postoji više izvedbi, boja i modela nego u ovom demo katalogu.</p><a href="mailto:namjestaj@vespera.hr">Pošaljite upit</a></div>
        </aside>

        <div className="catalog-results"><div className="catalog-results-head"><p><strong>{products.length}</strong> {products.length === 1 ? 'proizvod' : 'proizvoda'}</p><span>Demo podaci za prikaz budućeg sustava</span></div>
          {products.length ? <div className="product-grid catalog-products">{products.map((product) => <article className="product-card" key={product.slug}><div className="product-image"><Image src={product.image} alt={`${product.type} ${product.name}`} width={960} height={720} sizes="(max-width: 620px) 100vw, (max-width: 1100px) 50vw, 33vw" />{product.discount && <span className="promo-badge">{product.discount}</span>}</div><div className="product-body"><span className={`catalog-status catalog-status-${product.status === 'Po narudžbi' ? 'order' : product.status === 'Izložbeni primjerak' ? 'display' : 'check'}`}>{product.status}</span><p className="product-kicker">{product.room} · {product.dimensions}</p><h3>{product.name}</h3><p className="product-features">{product.type} · {product.features.join(' · ')}</p><div className="anchor-price">{product.regularPrice && <span>Prije {product.regularPrice}</span>}<strong>{product.price}</strong><small>Cijena evidentirana 10. 09. 2026.</small></div>{product.href ? <Link className="text-link" href={product.href}>Pogledajte model</Link> : <a className="text-link" href={`tel:+38547645535`}><Phone size={19} aria-hidden="true" /> Provjerite u salonu</a>}</div></article>)}</div> : <div className="empty-result"><CirclePercent aria-hidden="true" /><h2>Nema točnog podudaranja</h2><p>Pokušajte s manje uvjeta ili nazovite salon. Aktualna ponuda mijenja se tjedno.</p><a className="button button-accent" href="tel:+38547645535">Nazovite salon</a></div>}
        </div>
      </section>
    </main></PageShell>
  );
}

export default function NamjestajPage() {
  return <Suspense fallback={<PageShell><main><section className="catalog-hero"><div className="container"><p className="eyebrow">Vespera namještaj</p><h1>Učitavamo ponudu.</h1></div></section></main></PageShell>}><CatalogContent /></Suspense>;
}
