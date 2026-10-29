'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CatalogProduct } from '@/lib/products';

export function ActionCarousel({ products }: { products: CatalogProduct[] }) {
  const actionProducts = products.slice(0, 8);
  const trackRef = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.action-slide');
    track.scrollBy({ left: direction * ((card?.offsetWidth ?? 300) + 18), behavior: 'smooth' });
  };

  if (!actionProducts.length) return <div className="empty-result"><h3>Katalog je trenutačno prazan.</h3><p>Provjerite ponudu izravno sa salonom.</p></div>;

  return <div className="action-carousel" aria-label="Akcijski proizvodi">
    <div className="action-carousel-controls"><p><strong>{actionProducts.length} izdvojenih modela</strong><span>Pomaknite prstom ili koristite tipke.</span></p><div><button type="button" onClick={() => move(-1)} aria-label="Prethodni proizvodi"><ChevronLeft aria-hidden="true" /></button><button type="button" onClick={() => move(1)} aria-label="Sljedeći proizvodi"><ChevronRight aria-hidden="true" /></button></div></div>
    <div className="action-track" ref={trackRef}>{actionProducts.map((product) => <article className="product-card sale-card action-slide" key={product.slug}><Link className="product-card-link" href={product.href ?? `/proizvod/${product.slug}`}><div className="product-image"><Image src={product.image} alt={`${product.type} ${product.name}`} width={760} height={570} sizes="(max-width: 620px) 82vw, (max-width: 1000px) 44vw, 29vw" />{product.discount && <span className="promo-badge">{product.discount}</span>}</div><div className="product-body"><span className="catalog-status catalog-status-check">{product.status}</span><p className="product-kicker">{product.type} · {product.dimensions}</p><h3>{product.name}</h3><div className="anchor-price">{product.regularPrice && <span>Cijena prije sniženja <s>{product.regularPrice}</s></span>}<strong>{product.price}</strong><small>Cijene i popust prema izvornom Vespera katalogu.</small></div><span className="text-link">Pogledajte detalje</span></div></Link></article>)}</div>
  </div>;
}
