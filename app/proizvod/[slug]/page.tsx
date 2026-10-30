import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Mail, MapPin, Phone, Ruler, Truck } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';
import { ProductDetailGallery } from '@/components/product-detail-gallery';
import { ProductPageTools } from '@/components/product-page-tools';
import { ProductPurchaseClarity } from '@/components/product-purchase-clarity';
import { ProductVisual } from '@/components/product-visual';
import { catalogProducts } from '@/lib/products';
import { getPublishedContent } from '@/lib/admin/content';

type ProductPageProps = { params: Promise<{ slug: string }> };

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return catalogProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = (await getPublishedContent()).products.find((item) => item.slug === slug);
  if (!product) return {};
  return { title: `${product.name} | Vespera namještaj`, description: `${product.type} ${product.name}. Pogledajte cijenu, dimenzije i mogućnosti te provjerite dostupnost u salonu.` };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const content = await getPublishedContent();
  const product = content.products.find((item) => item.slug === slug);
  if (!product) notFound();
  const relatedProducts = content.products.filter((item) => item.slug !== product.slug && item.type === product.type).slice(0, 3);

  return <PageShell><main>
    <div className="container page-intro"><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><Link href="/namjestaj">Namještaj</Link><span aria-hidden="true">/</span><span>{product.name}</span></nav><Link className="text-link" href="/namjestaj"><ArrowLeft size={20} aria-hidden="true" /> Natrag na ponudu</Link></div>

    <section className="container product-layout">
      <ProductDetailGallery product={product} />
      <div className="product-info"><p className="eyebrow">{product.room} · {product.type}</p><h1>{product.name}</h1><p className="availability">{product.status}</p><div className="product-price">{product.regularPrice ? <><div className="product-price-label"><span>Ranije objavljena cijena prema Vespera katalogu</span>{product.discount ? <b>Ušteda {product.discount.replace('−', '')}</b> : null}</div><s>{product.regularPrice}</s></> : null}<strong>{product.price}</strong><small>Ovo nije potvrda najniže cijene u prethodnih 30 dana. Aktualnu cijenu, izvedbu i dostupnost potvrdite sa salonom prije narudžbe.</small></div>{product.sourceNote && <p className="source-warning"><strong>Napomena o izvoru:</strong> {product.sourceNote}</p>}<p>Vesperin savjetnik provjerava dostupne dimenzije, boje, materijale, rok isporuke te mogućnost dostave i montaže.</p>
        <div className="key-facts"><div className="fact"><span>Dimenzije</span><strong>{product.dimensions}</strong></div><div className="fact"><span>Dostupnost</span><strong>{product.status}</strong></div>{product.features.slice(0, 2).map((feature, index) => <div className="fact" key={feature}><span>{index === 0 ? 'Funkcionalnost' : 'Mogućnost'}</span><strong>{feature}</strong></div>)}</div>
        <div className="cta-stack"><a className="button button-accent" href="tel:+38547645535"><Phone aria-hidden="true" /> Provjerite dostupnost</a><a className="button button-dark" href={`mailto:namjestaj@vespera.hr?subject=${encodeURIComponent(`Ponuda i termin za ${product.name}`)}&body=${encodeURIComponent(`Zanima me ${product.type} ${product.name}. Molim potvrdu aktualne cijene, dostupnosti, izvedbi, roka te mogućnosti dostave i montaže. Želim dogovoriti i termin dolaska u salon.`)}`}><Mail aria-hidden="true" /> Zatražite ponudu ili termin</a>{product.sourceUrl && <a className="button button-light" href={product.sourceUrl} target="_blank" rel="noreferrer">Izvorni Vespera zapis</a>}<a className="button button-light" href="https://maps.google.com/?q=Matka+Laginje+1+Karlovac"><MapPin aria-hidden="true" /> Kako do salona</a></div>
        <ProductPageTools productName={product.name} />
      </div>
    </section>

    <ProductPurchaseClarity status={product.status} hasDiscount={Boolean(product.discount)} />

    <section className="container section"><p className="eyebrow">Prije dolaska u salon</p><h2>Što možete provjeriti?</h2><div className="for-you"><div><Ruler aria-hidden="true" /><strong>Odgovaraju li dimenzije?</strong><span>Izmjerite zid, prolaze, vrata i mjesto potrebno za korištenje proizvoda.</span></div><div><Check aria-hidden="true" /><strong>Koje su izvedbe dostupne?</strong><span>Pitajte za boje, tkanine, smjer, dodatne elemente i moguće prilagodbe.</span></div><div><Truck aria-hidden="true" /><strong>Kada proizvod stiže?</strong><span>Rok, dostavu, unos i montažu tražite navedene na pisanoj ponudi.</span></div></div></section>

    <section className="container section" aria-labelledby="product-details-title"><div className="section-head"><div><p className="eyebrow">O ovom modelu</p><h2 id="product-details-title">Detalji proizvoda</h2></div><p>Prikazujemo samo podatke javno objavljene uz ovaj model. Dodatne tehničke podatke i konačnu izvedbu potvrđuje salon.</p></div><dl className="product-detail-list"><div><dt>Vrsta proizvoda</dt><dd>{product.type}</dd></div><div><dt>Dimenzije</dt><dd>{product.dimensions}</dd></div>{product.features.map((feature) => <div key={feature}><dt>Značajka</dt><dd>{feature}</dd></div>)}<div><dt>Dostupnost</dt><dd>{product.status}</dd></div></dl></section>

    <section className="container section"><div className="service-card"><div><Truck aria-hidden="true" /><div><p className="eyebrow">Dostava i montaža</p><h2>Sve važne stavke potvrdite prije narudžbe.</h2><p>Cijena i opseg ovise o proizvodu, adresi, katu, pristupu prostoru i potrebnoj montaži. Zatražite da budu jasno navedeni na pisanoj ponudi.</p></div></div><div className="service-facts"><p><strong>Osobno preuzimanje</strong><span>Mogućnost i termin potvrđuje salon</span></p><p><strong>Rok isporuke</strong><span>Ovisi o modelu i odabranoj izvedbi</span></p><p><strong>Dostava i unos</strong><span>Cijena prema adresi i uvjetima pristupa</span></p><p><strong>Montaža</strong><span>Uključena samo kada je navedena na ponudi</span></p></div></div></section>

    {relatedProducts.length ? <section className="section related-products" id="slicni-modeli"><div className="container"><div className="section-head"><div><p className="eyebrow">Lakša usporedba</p><h2>Slični modeli</h2></div><p>Usporedite dimenzije, objavljenu cijenu i značajke. Dostupnost svakog modela provjerite sa salonom.</p></div><div className="product-grid">{relatedProducts.map((item) => <article className="product-card" key={item.slug}><Link className="product-card-link" href={item.href ?? `/proizvod/${item.slug}`}><ProductVisual product={item} sizes="(max-width: 620px) 100vw, (max-width: 920px) 50vw, 33vw" /><div className="product-body"><p className="product-kicker">{item.type} · {item.dimensions}</p><h3>{item.name}</h3><p className="product-features">{item.features.slice(0, 2).join(' · ')}</p><div className="anchor-price">{item.regularPrice ? <span>Ranije objavljeno <s>{item.regularPrice}</s></span> : null}<strong>{item.price}</strong></div><span className="text-link">Pogledajte model <ArrowRight size={19} aria-hidden="true" /></span></div></Link></article>)}</div></div></section> : null}
  </main></PageShell>;
}
