import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, MapPin, MessageCircle, Phone, Ruler, Truck } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';
import { catalogProducts } from '@/lib/products';

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return catalogProducts.filter((product) => product.slug !== 'manila').map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = catalogProducts.find((item) => item.slug === slug);
  if (!product) return {};
  return { title: `${product.name} | Vespera namještaj`, description: `${product.type} ${product.name}. Pogledajte cijenu, dimenzije i mogućnosti te provjerite dostupnost u salonu.` };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = catalogProducts.find((item) => item.slug === slug);
  if (!product) notFound();

  const shareText = encodeURIComponent(`${product.type} ${product.name}: https://vespera-concept-redesign.vercel.app/proizvod/${product.slug}`);

  return <PageShell><main>
    <div className="container page-intro"><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><Link href="/namjestaj">Namještaj</Link><span aria-hidden="true">/</span><span>{product.name}</span></nav><Link className="text-link" href="/namjestaj"><ArrowLeft size={20} aria-hidden="true" /> Natrag na ponudu</Link></div>

    <section className="container product-layout">
      <div className="product-gallery"><div className="main-product-image"><Image src={product.image} alt={`${product.type} ${product.name}`} width={1140} height={860} sizes="(max-width: 920px) 100vw, 52vw" priority />{product.discount && <span className="promo-badge">{product.discount}</span>}</div><p className="image-caption">Fotografija proizvoda služi kao prikaz modela. Boju, materijal i izvedbu potvrdite u salonu.</p></div>
      <div className="product-info"><p className="eyebrow">{product.room} · {product.type}</p><h1>{product.name}</h1><p className="availability">{product.status}</p><div className="product-price">{product.regularPrice && <span>Redovna cijena <s>{product.regularPrice}</s>{product.discount ? ` · ušteda ${product.discount.replace('−', '')}` : ''}</span>}<strong>{product.price}</strong><small>Cijena se odnosi na prikazanu ili osnovnu izvedbu. Konačnu cijenu potvrđuje salon.</small></div><p>Model možete pregledati bez online kupnje. Vesperin savjetnik provjerava dostupne dimenzije, boje, materijale, rok isporuke te mogućnost dostave i montaže.</p>
        <div className="key-facts"><div className="fact"><span>Dimenzije</span><strong>{product.dimensions}</strong></div><div className="fact"><span>Dostupnost</span><strong>{product.status}</strong></div>{product.features.slice(0, 2).map((feature, index) => <div className="fact" key={feature}><span>{index === 0 ? 'Funkcionalnost' : 'Mogućnost'}</span><strong>{feature}</strong></div>)}</div>
        <div className="cta-stack"><a className="button button-accent" href="tel:+38547645535"><Phone aria-hidden="true" /> Provjerite dostupnost</a><a className="button button-light" href="mailto:namjestaj@vespera.hr"><MessageCircle aria-hidden="true" /> Pošaljite upit</a><a className="button button-light" href="https://maps.google.com/?q=Matka+Laginje+1+Karlovac"><MapPin aria-hidden="true" /> Kako do salona</a></div>
        <a className="text-link whatsapp-link" href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Pošaljite proizvod na WhatsApp</a>
      </div>
    </section>

    <section className="container section"><p className="eyebrow">Prije dolaska u salon</p><h2>Što možete provjeriti?</h2><div className="for-you"><div><Ruler aria-hidden="true" /><strong>Odgovaraju li dimenzije?</strong><span>Izmjerite zid, prolaze, vrata i mjesto potrebno za korištenje proizvoda.</span></div><div><Check aria-hidden="true" /><strong>Koje su izvedbe dostupne?</strong><span>Pitajte za boje, tkanine, smjer, dodatne elemente i moguće prilagodbe.</span></div><div><Truck aria-hidden="true" /><strong>Kada proizvod stiže?</strong><span>Rok, dostavu, unos i montažu tražite navedene na pisanoj ponudi.</span></div></div></section>

    <section className="container section"><div className="service-card"><div><Truck aria-hidden="true" /><div><p className="eyebrow">Nema online kupnje</p><h2>Web pomaže odabrati. Kupnju završavate uz savjet.</h2><p>Vesperina ponuda nije uvijek ista i mnogi modeli imaju različite izvedbe. Zato stranica daje važne informacije, a konačnu narudžbu, cijenu i rok potvrđujete sa salonom.</p></div></div><div className="service-facts"><p><strong>Plaćanje</strong><span>Gotovinski popust ili do 24 rate</span></p><p><strong>Dostupnost</strong><span>Na zalihi, po narudžbi ili izložbeni primjerak</span></p><p><strong>Usluga</strong><span>Dostava i montaža prema dogovoru</span></p></div></div></section>
  </main></PageShell>;
}
