'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CatalogProduct } from '@/lib/products';

const featuredModels: Array<{ slug: string; image: string; aiModified?: boolean }> = [
  { slug: 'crafter', image: '/generated/crafter-carousel-ai-modified.jpg', aiModified: true },
  { slug: 'lotos', image: '/generated/lotos-carousel-ai-modified.jpg', aiModified: true },
  { slug: 'remi', image: '/generated/remi-carousel-ai-modified.jpg', aiModified: true },
  { slug: 'kent', image: '/generated/kent-carousel-ai-modified.jpg', aiModified: true },
  { slug: 'canon', image: '/generated/canon-carousel-ai-modified.jpg', aiModified: true },
  { slug: 'sardinia', image: '/generated/sardinia-carousel-ai-modified.jpg', aiModified: true },
];

export function PromoShowcase({ products }: { products: CatalogProduct[] }) {
  const showcaseProducts = featuredModels.flatMap((featured) => {
    const product = products.find((item) => item.slug === featured.slug);
    return product ? [{ ...product, showcaseImage: featured.image, aiModified: featured.aiModified ?? false }] : [];
  });
  const [active, setActive] = useState(0);
  const product = showcaseProducts[active];
  const go = (direction: number) => setActive((current) => (current + direction + showcaseProducts.length) % showcaseProducts.length);

  if (!product) return null;

  return (
    <section className="promo-showcase" aria-label="Izdvojeni Vespera modeli kreveta">
      <div className="promo-media">
        <Image key={product.showcaseImage} src={product.showcaseImage} alt={`${product.type} ${product.name}`} width={1680} height={900} sizes="100vw" priority />
      </div>
      <div className="promo-shade" aria-hidden="true" />
      {product.aiModified && <span className="promo-ai-badge" aria-label="Fotografija prilagođena umjetnom inteligencijom"><b>AI</b> modified</span>}
      <div className="promo-content" aria-live="polite" aria-atomic="true">
        {product.discount && <span className="promo-discount">{product.discount}</span>}
        <p className="eyebrow">Izdvojeni model</p>
        <h2>{product.type} {product.name}</h2>
        <p className="promo-dimensions">{product.dimensions} · {product.status}</p>
        <div className="promo-prices">
          {product.regularPrice && <span>Cijena prije sniženja prema izvornom katalogu <s>{product.regularPrice}</s></span>}
          <strong>{product.price}</strong>
        </div>
        <Link className="button button-accent" href={product.href ?? `/proizvod/${product.slug}`}>Pogledajte proizvod</Link>
        <small>Cijene i popust preneseni su s javne Vespera stranice. Konačnu cijenu i dostupnost potvrdite sa salonom.</small>
      </div>
      <button className="promo-arrow promo-arrow-left" type="button" onClick={() => go(-1)} aria-label="Prethodni izdvojeni proizvod"><ChevronLeft aria-hidden="true" /></button>
      <button className="promo-arrow promo-arrow-right" type="button" onClick={() => go(1)} aria-label="Sljedeći izdvojeni proizvod"><ChevronRight aria-hidden="true" /></button>
      <div className="promo-dots" aria-label="Odaberite izdvojeni proizvod">
        {showcaseProducts.map((item, index) => <button key={item.slug} type="button" className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Prikažite ${item.type} ${item.name}`} aria-current={index === active ? 'true' : undefined} />)}
      </div>
    </section>
  );
}
