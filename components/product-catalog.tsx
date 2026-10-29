'use client';

import { Suspense, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CirclePercent, Phone, Search, SlidersHorizontal } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';
import { catalogSourceNote, categoryGroups, type CatalogProduct } from '@/lib/products';

const statuses = ['Na zalihi', 'Po narudžbi', 'Izložbeni primjerak'];

function CatalogContent({ products: allProducts }: { products: CatalogProduct[] }) {
  const params = useSearchParams();
  const initialQuery = params.get('q') ?? '';
  const initialRoom = params.get('prostorija') ?? 'Sve prostorije';
  const salesOnly = params.get('akcija') === 'da';
  const immediateOnly = params.get('odmah') === 'da';
  const [query, setQuery] = useState(initialQuery);
  const [room, setRoom] = useState(initialRoom);
  const [status, setStatus] = useState('Sve dostupnosti');
  const products = useMemo(() => allProducts.filter((product) => {
    const searchable = `${product.name} ${product.type} ${product.room} ${product.features.join(' ')}`.toLocaleLowerCase('hr');
    const immediate = product.status === 'Na zalihi' || product.status === 'Izložbeni primjerak';
    return (!query.trim() || searchable.includes(query.trim().toLocaleLowerCase('hr'))) && (room === 'Sve prostorije' || product.room === room) && (status === 'Sve dostupnosti' || product.status === status) && (!salesOnly || Boolean(product.discount)) && (!immediateOnly || immediate);
  }), [allProducts, immediateOnly, query, room, salesOnly, status]);

  return <PageShell><main>
    <section className="catalog-hero"><div className="container catalog-hero-grid"><div><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span>/</span><span>Namještaj</span></nav><p className="eyebrow">Javno objavljeni Vespera katalog</p><h1>{immediateOnly ? 'Dostupnost treba potvrditi' : salesOnly ? 'Nema potvrđenih referentnih cijena' : 'Kreveti i boxspring modeli'}</h1><p className="lead">{salesOnly ? 'Promotivne oznake nisu prenesene jer javni izvor ne potvrđuje najnižu cijenu u prethodnih 30 dana za svaki model.' : catalogSourceNote}</p></div><aside><strong>Važno</strong><p>Ponuda se mijenja. Prije dolaska potvrdite model, boju, cijenu i dostupnost telefonom.</p><a href="tel:+38547645535"><Phone aria-hidden="true" /> 047 645 535</a></aside></div></section>
    {!salesOnly && !immediateOnly && <section className="room-nav container"><div className="room-nav-head"><p className="eyebrow">Kategorije namještaja</p><h2>Pronađite proizvod po prostoriji.</h2></div><div className="category-directory">{categoryGroups.map((group) => <article key={group.name}><Link className="category-title" href={group.href}>{group.name}</Link><ul>{group.categories.map((category) => <li key={category}><Link href={`/namjestaj?q=${encodeURIComponent(category)}`}>{category}</Link></li>)}</ul></article>)}</div></section>}
    <section className="section container catalog-layout"><aside className="catalog-filters"><div className="filter-heading"><SlidersHorizontal aria-hidden="true" /><h2>Filtrirajte</h2></div><label><span>Pretražite ponudu</span><div className="catalog-search"><Search aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Naziv, vrsta ili svojstvo" /></div></label><label><span>Prostorija</span><select value={room} onChange={(event) => setRoom(event.target.value)}><option>Sve prostorije</option><option>Dnevni boravak</option><option>Spavaća soba</option><option>Kuhinja</option></select></label><label><span>Dostupnost</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>Sve dostupnosti</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label><button type="button" className="clear-button" onClick={() => { setQuery(''); setRoom('Sve prostorije'); setStatus('Sve dostupnosti'); }}>Očistite filtre</button></aside>
      <div className="catalog-results"><div className="catalog-results-head"><p><strong>{products.length}</strong> {products.length === 1 ? 'proizvod' : 'proizvoda'}</p></div>{products.length ? <div className="product-grid catalog-products">{products.map((product) => <article className="product-card" key={product.slug}><Link className="product-card-link" href={product.href ?? `/proizvod/${product.slug}`}><div className="product-image"><Image src={product.image} alt={`${product.type} ${product.name}`} width={960} height={720} sizes="(max-width: 620px) 100vw, (max-width: 1100px) 50vw, 33vw" />{product.discount && <span className="promo-badge">{product.discount}</span>}</div><div className="product-body"><span className="catalog-status catalog-status-check">{product.status}</span><p className="product-kicker">{product.room} · {product.dimensions}</p><h3>{product.name}</h3><p className="product-features">{product.type} · {product.features.join(' · ')}</p><div className="anchor-price">{product.regularPrice && <span>Najniža cijena u prethodnih 30 dana {product.regularPrice}</span>}<strong>{product.price}</strong><small>Objavljena cijena; potvrditi s Vesperom prije kupnje.</small></div><span className="text-link">Pogledajte detalje</span></div></Link></article>)}</div> : <div className="empty-result"><CirclePercent aria-hidden="true" /><h2>Nema točnog podudaranja</h2><p>Pokušajte s manje uvjeta ili nazovite salon.</p></div>}</div>
    </section>
  </main></PageShell>;
}

export function ProductCatalog({ products }: { products: CatalogProduct[] }) {
  return <Suspense fallback={<PageShell><main><section className="catalog-hero"><div className="container"><p className="eyebrow">Vespera namještaj</p><h1>Učitavamo ponudu.</h1></div></section></main></PageShell>}><CatalogContent products={products} /></Suspense>;
}
