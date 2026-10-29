'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductVisual } from '@/components/product-visual';
import type { CatalogProduct } from '@/lib/products';
import { featuredModelSlugs } from '@/lib/product-media';

export function ActionCarousel({ products }: { products: CatalogProduct[] }) {
  const actionProducts = featuredModelSlugs.flatMap((slug) => {
    const product = products.find((item) => item.slug === slug && !item.discount);
    return product ? [product] : [];
  });
  const trackRef = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.action-slide');
    track.scrollBy({ left: direction * ((card?.offsetWidth ?? 300) + 18), behavior: 'smooth' });
  };

  if (!actionProducts.length) return <div className="empty-result"><h3>Katalog je trenutačno prazan.</h3><p>Provjerite ponudu izravno sa salonom.</p></div>;

  return <div className="action-carousel" aria-label="Izdvojeni modeli kreveta">
    <div className="action-carousel-controls"><p><strong>{actionProducts.length} izdvojena modela</strong><span>Izvorna fotografija i AI prilagođeni ambijent.</span></p><div><button type="button" onClick={() => move(-1)} aria-label="Prethodni proizvodi"><ChevronLeft aria-hidden="true" /></button><button type="button" onClick={() => move(1)} aria-label="Sljedeći proizvodi"><ChevronRight aria-hidden="true" /></button></div></div>
    <div className="action-track" ref={trackRef}>{actionProducts.map((product) => <article className="product-card action-slide" key={product.slug}><Link className="product-card-link" href={product.href ?? `/proizvod/${product.slug}`}><ProductVisual product={product} sizes="(max-width: 620px) 82vw, (max-width: 1000px) 44vw, 29vw" /><div className="product-body"><span className="catalog-status catalog-status-check">{product.status}</span><p className="product-kicker">{product.type} · {product.dimensions}</p><h3>{product.name}</h3><div className="anchor-price"><strong>{product.price}</strong><small>Objavljena cijena proizvoda; aktualnost provjerite sa salonom.</small></div><span className="text-link">Pogledajte detalje</span></div></Link></article>)}</div>
  </div>;
}
