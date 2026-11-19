'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CatalogProduct } from '@/lib/products';
import { getAiLifestyleImage } from '@/lib/product-media';

export function PromoShowcase({ products }: { products: CatalogProduct[] }) {
  const showcaseProducts = products.filter((product) => product.monthlyPromotion);
  const [active, setActive] = useState(0);
  if (!showcaseProducts.length) return null;

  const activeIndex = active % showcaseProducts.length;
  const product = showcaseProducts[activeIndex];
  const ambience = getAiLifestyleImage(product.slug);
  const go = (direction: number) => setActive((current) => (current + direction + showcaseProducts.length) % showcaseProducts.length);

  return (
    <section className="promo-showcase" aria-label="Aktualne Vespera akcije i popusti">
      <div className="promo-media">
        <Image key={product.slug} src={ambience || product.image} alt={`${product.type} ${product.name}`} width={1680} height={900} sizes="100vw" priority />
      </div>
      <div className="promo-shade" aria-hidden="true" />
      {ambience && <span className="promo-ai-badge" aria-label="Fotografija prilagođena umjetnom inteligencijom"><b>AI</b> modified</span>}
      <div className="promo-content" aria-live="polite" aria-atomic="true">
        {product.discount && <span className="promo-discount">{product.discount}</span>}
        <p className="eyebrow">Akcije ovog mjeseca</p>
        <h2>{product.type} {product.name}</h2>
        <p className="promo-dimensions">{product.dimensions} · {product.status}</p>
        <div className="promo-prices">
          {product.regularPrice && <span>Referentna cijena <s>{product.regularPrice}</s></span>}
          <strong>{product.price}</strong>
        </div>
        <Link className="button button-accent" href={product.href ?? `/proizvod/${product.slug}`}>Pogledajte proizvod</Link>
        <small>Prije narudžbe potvrdite cijenu, izvedbu i dostupnost u salonu.</small>
      </div>
      {showcaseProducts.length > 1 && <>
        <button className="promo-arrow promo-arrow-left" type="button" onClick={() => go(-1)} aria-label="Prethodni izdvojeni proizvod"><ChevronLeft aria-hidden="true" /></button>
        <button className="promo-arrow promo-arrow-right" type="button" onClick={() => go(1)} aria-label="Sljedeći izdvojeni proizvod"><ChevronRight aria-hidden="true" /></button>
        <div className="promo-dots" aria-label="Odaberite izdvojeni proizvod">
          {showcaseProducts.map((item, index) => <button key={item.slug} type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Prikažite ${item.type} ${item.name}`} aria-current={index === activeIndex ? 'true' : undefined} />)}
        </div>
      </>}
    </section>
  );
}
