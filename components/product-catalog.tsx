'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CirclePercent, Clock3, PackageOpen, Phone, Search, SlidersHorizontal, Sofa } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';
import { ProductVisual } from '@/components/product-visual';
import { catalogSourceNote, categoryGroups, type CatalogProduct } from '@/lib/products';

const statuses = ['Na zalihi', 'Po narudžbi', 'Izložbeni primjerak'];

function CatalogContent({ products: allProducts }: { products: CatalogProduct[] }) {
  const params = useSearchParams();
  const initialQuery = params.get('q') ?? '';
  const initialRoom = params.get('prostorija') ?? 'Sve prostorije';
  const salesOnly = params.get('akcija') === 'da';
  const immediateOnly = params.get('odmah') === 'da';
  const lastChanceOnly = params.get('ponuda') === 'posljednja';
  const requestedStatus = params.get('status');
  const [query, setQuery] = useState(initialQuery);
  const [room, setRoom] = useState(initialRoom);
  const [status, setStatus] = useState(requestedStatus && statuses.includes(requestedStatus) ? requestedStatus : 'Sve dostupnosti');
  const products = useMemo(() => allProducts.filter((product) => {
    const searchable = `${product.name} ${product.type} ${product.room} ${product.features.join(' ')}`.toLocaleLowerCase('hr');
    const immediate = product.status === 'Na zalihi' || product.status === 'Izložbeni primjerak';
    const lastChance = product.status === 'Izložbeni primjerak' && Boolean(product.discount && product.regularPrice);
    return (!query.trim() || searchable.includes(query.trim().toLocaleLowerCase('hr'))) && (room === 'Sve prostorije' || product.room === room) && (status === 'Sve dostupnosti' || product.status === status) && (!salesOnly || Boolean(product.discount)) && (!immediateOnly || immediate) && (!lastChanceOnly || lastChance);
  }), [allProducts, immediateOnly, lastChanceOnly, query, room, salesOnly, status]);
  const viewTitle = lastChanceOnly ? 'Posljednja prilika' : requestedStatus === 'Izložbeni primjerak' ? 'Izložbeni primjerci' : immediateOnly ? 'Trenutno dostupno' : salesOnly ? 'Akcije' : 'Kreveti i boxspring modeli';
  const viewDescription = lastChanceOnly
    ? 'Ovdje se prikazuju samo potvrđeni izložbeni komadi na popustu, dostupni dok se ne prodaju.'
    : requestedStatus === 'Izložbeni primjerak'
      ? 'Konkretni komadi iz salona. Prije dolaska provjerite stanje, cijenu i je li proizvod još dostupan.'
      : immediateOnly
        ? 'Prikazuju se samo proizvodi koje je salon označio kao na zalihi ili izložene.'
        : salesOnly
          ? 'Prikazane redovne cijene i postotci popusta preneseni su iz javnog Vespera kataloga.'
          : catalogSourceNote;
  const offerLinks = [
    { title: 'Akcije', href: '/namjestaj?akcija=da', icon: CirclePercent },
    { title: 'Trenutno dostupno', href: '/namjestaj?odmah=da', icon: PackageOpen },
    { title: 'Izložbeni primjerci', href: '/namjestaj?status=Izložbeni+primjerak', icon: Sofa },
    { title: 'Posljednja prilika', href: '/namjestaj?ponuda=posljednja', icon: Clock3 },
  ];

  return <PageShell><main>
    <section className="catalog-hero"><div className="container catalog-hero-grid"><div><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span>/</span><span>Namještaj</span></nav><p className="eyebrow">Vespera ponuda</p><h1>{viewTitle}</h1><p className="lead">{viewDescription}</p></div><aside><strong>Važno</strong><p>Ponuda se mijenja. Prije dolaska potvrdite model, boju, cijenu i dostupnost telefonom.</p><a href="tel:+38547645535"><Phone aria-hidden="true" /> 047 645 535</a></aside></div></section>
    <nav className="container offer-catalog-nav" aria-label="Vrste ponude">{offerLinks.map(({ title, href, icon: Icon }) => <a href={href} key={title}><Icon aria-hidden="true" /><span>{title}</span><ArrowRight aria-hidden="true" /></a>)}</nav>
    {!salesOnly && !immediateOnly && !lastChanceOnly && !requestedStatus && <section className="room-nav container"><div className="room-nav-head"><p className="eyebrow">Kategorije namještaja</p><h2>Pronađite proizvod po prostoriji.</h2></div><div className="category-directory">{categoryGroups.map((group) => <article key={group.name}><Link className="category-title" href={group.href}>{group.name}</Link><ul>{group.categories.map((category) => <li key={category}><Link href={`/namjestaj?q=${encodeURIComponent(category)}`}>{category}</Link></li>)}</ul></article>)}</div></section>}
    <section className="section container catalog-layout"><aside className="catalog-filters"><div className="filter-heading"><SlidersHorizontal aria-hidden="true" /><h2>Filtrirajte</h2></div><label><span>Pretražite ponudu</span><div className="catalog-search"><Search aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Naziv, vrsta ili svojstvo" /></div></label><label><span>Prostorija</span><select value={room} onChange={(event) => setRoom(event.target.value)}><option>Sve prostorije</option><option>Dnevni boravak</option><option>Spavaća soba</option><option>Kuhinja</option></select></label><label><span>Dostupnost</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>Sve dostupnosti</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label><button type="button" className="clear-button" onClick={() => { setQuery(''); setRoom('Sve prostorije'); setStatus('Sve dostupnosti'); }}>Očistite filtre</button></aside>
      <div className="catalog-results"><div className="catalog-results-head"><p><strong>{products.length}</strong> {products.length === 1 ? 'proizvod' : 'proizvoda'}</p><span>Svaka kartica prikazuje jednu izvornu fotografiju na bijeloj podlozi. AI ambijent dostupan je na stranici proizvoda.</span></div>{products.length ? <div className="product-grid catalog-products">{products.map((product) => <article className="product-card" key={product.slug}><Link className="product-card-link" href={product.href ?? `/proizvod/${product.slug}`}><ProductVisual product={product} sizes="(max-width: 620px) 100vw, (max-width: 1100px) 50vw, 33vw" /><div className="product-body"><span className="catalog-status catalog-status-check">{product.status}</span><p className="product-kicker">{product.room} · {product.dimensions}</p><h3>{product.name}</h3><p className="product-features">{product.type} · {product.features.join(' · ')}</p><div className={`anchor-price${product.regularPrice ? ' anchor-price-sale' : ''}`}>{product.regularPrice && <><span>Ranije objavljena cijena <s>{product.regularPrice}</s></span><b className="anchor-discount">Ušteda {product.discount?.replace('−', '')}</b></>}<strong>{product.price}</strong><small>Objavljene cijene i popuste prije kupnje potvrdite sa salonom.</small></div><span className="text-link">Pogledajte detalje</span></div></Link></article>)}</div> : <div className="empty-result"><CirclePercent aria-hidden="true" /><h2>Trenutno nema potvrđenih proizvoda</h2><p>{lastChanceOnly || requestedStatus || immediateOnly ? 'Ponuda će se pojaviti čim salon potvrdi status proizvoda. Za najnovije stanje nazovite 047 645 535.' : 'Pokušajte s manje uvjeta ili nazovite salon.'}</p></div>}</div>
    </section>
  </main></PageShell>;
}

export function ProductCatalog({ products }: { products: CatalogProduct[] }) {
  return <Suspense fallback={<PageShell><main><section className="catalog-hero"><div className="container"><p className="eyebrow">Vespera namještaj</p><h1>Učitavamo ponudu.</h1></div></section></main></PageShell>}><CatalogContent products={products} /></Suspense>;
}
