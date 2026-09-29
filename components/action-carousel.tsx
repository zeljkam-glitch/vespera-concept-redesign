'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { catalogProducts } from '@/lib/products';

const actionProducts = catalogProducts.filter((product) => product.discount).slice(0, 8);

export function ActionCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.action-slide');
    track.scrollBy({ left: direction * ((card?.offsetWidth ?? 300) + 18), behavior: 'smooth' });
  };

  return <div className="action-carousel" aria-label="Akcijski proizvodi">
    <div className="action-carousel-controls"><p><strong>{actionProducts.length} izdvojenih proizvoda</strong><span>Pomaknite prstom ili koristite tipke.</span></p><div><button type="button" onClick={() => move(-1)} aria-label="Prethodni akcijski proizvodi"><ChevronLeft aria-hidden="true" /></button><button type="button" onClick={() => move(1)} aria-label="Sljedeći akcijski proizvodi"><ChevronRight aria-hidden="true" /></button></div></div>
    <div className="action-track" ref={trackRef}>{actionProducts.map((product) => <article className="product-card sale-card action-slide" key={product.slug}><Link className="product-card-link" href={product.href ?? `/proizvod/${product.slug}`}><div className="product-image"><Image src={product.image} alt={`${product.type} ${product.name}`} width={760} height={570} sizes="(max-width: 620px) 82vw, (max-width: 1000px) 44vw, 29vw" />{product.discount && <span className="promo-badge">{product.discount}</span>}</div><div className="product-body"><span className={`catalog-status catalog-status-${product.status === 'Po narudžbi' ? 'order' : product.status === 'Izložbeni primjerak' ? 'display' : 'check'}`}>{product.status}</span><p className="product-kicker">{product.type} · {product.dimensions}</p><h3>{product.name}</h3><div className="anchor-price">{product.regularPrice && <span>Redovna cijena {product.regularPrice}</span>}<strong>{product.price}</strong><small>Akcijsku cijenu i dostupnost potvrđuje salon.</small></div><span className="text-link">Pogledajte detalje</span></div></Link></article>)}</div>
  </div>;
}
