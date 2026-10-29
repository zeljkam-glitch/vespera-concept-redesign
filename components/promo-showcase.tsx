'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CatalogProduct } from '@/lib/products';
import { getAiLifestyleImage, saleShowcaseSlugs } from '@/lib/product-media';

export function PromoShowcase({ products }: { products: CatalogProduct[] }) {
  const showcaseProducts = saleShowcaseSlugs.flatMap((slug) => {
    const product = products.find((item) => item.slug === slug && item.discount && item.regularPrice);
    const showcaseImage = getAiLifestyleImage(slug);
    return product && showcaseImage ? [{ ...product, showcaseImage }] : [];
  });
  const [active, setActive] = useState(0);
  const product = showcaseProducts[active];
  const go = (direction: number) => setActive((current) => (current + direction + showcaseProducts.length) % showcaseProducts.length);

  if (!product) return null;

  return (
    <section className="promo-showcase" aria-label="Aktualne Vespera akcije i popusti">
      <div className="promo-media">
        <Image key={product.showcaseImage} src={product.showcaseImage} alt={`${product.type} ${product.name}`} width={1680} height={900} sizes="100vw" priority />
      </div>
      <div className="promo-shade" aria-hidden="true" />
      <span className="promo-ai-badge" aria-label="Fotografija prilagođena umjetnom inteligencijom"><b>AI</b> modified</span>
      <div className="promo-content" aria-live="polite" aria-atomic="true">
        {product.discount && <span className="promo-discount">{product.discount}</span>}
        <p className="eyebrow">Aktualna akcijska ponuda</p>
        <h2>{product.type} {product.name}</h2>
        <p className="promo-dimensions">{product.dimensions} · {product.status}</p>
        <div className="promo-prices">
          {product.regularPrice && <span>Cijena prije sniženja prema izvornom katalogu <s>{product.regularPrice}</s></span>}
          <strong>{product.price}</strong>
        </div>
        <Link className="button button-accent" href={product.href ?? `/proizvod/${product.slug}`}>Pogledajte proizvod</Link>
        <small>Prikazana akcijska i ranija cijena prepisane su iz javnog Vespera kataloga. Prije narudžbe salon potvrđuje da su cijena, izvedba i dostupnost još aktualne.</small>
      </div>
      <button className="promo-arrow promo-arrow-left" type="button" onClick={() => go(-1)} aria-label="Prethodni izdvojeni proizvod"><ChevronLeft aria-hidden="true" /></button>
      <button className="promo-arrow promo-arrow-right" type="button" onClick={() => go(1)} aria-label="Sljedeći izdvojeni proizvod"><ChevronRight aria-hidden="true" /></button>
      <div className="promo-dots" aria-label="Odaberite izdvojeni proizvod">
        {showcaseProducts.map((item, index) => <button key={item.slug} type="button" className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Prikažite ${item.type} ${item.name}`} aria-current={index === active ? 'true' : undefined} />)}
      </div>
    </section>
  );
}
