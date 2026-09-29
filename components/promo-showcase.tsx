'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { catalogProducts } from '@/lib/products';

const actionProducts = catalogProducts.filter((product) => product.discount).slice(0, 8);

export function PromoShowcase() {
  const [active, setActive] = useState(0);
  const product = actionProducts[active];
  const go = (direction: number) => setActive((current) => (current + direction + actionProducts.length) % actionProducts.length);

  return (
    <section className="promo-showcase" aria-label="Aktualni proizvodi na akciji">
      <div className="promo-media">
        <Image key={product.image} src={product.image} alt={`${product.type} ${product.name}`} width={1680} height={900} sizes="100vw" priority />
      </div>
      <div className="promo-shade" aria-hidden="true" />
      <div className="promo-content" aria-live="polite" aria-atomic="true">
        <span className="promo-discount">{product.discount}</span>
        <p className="eyebrow">Aktualna ponuda</p>
        <h2>{product.type} {product.name}</h2>
        <p className="promo-dimensions">{product.dimensions} · {product.status}</p>
        <div className="promo-prices">
          {product.regularPrice && <span>Najniža cijena u prethodnih 30 dana* <s>{product.regularPrice}</s></span>}
          <strong>{product.price}</strong>
        </div>
        <Link className="button button-accent" href={product.href ?? `/proizvod/${product.slug}`}>Pogledajte proizvod</Link>
        <small>*Demo cijene i dostupnost Vespera potvrđuje prije objave.</small>
      </div>
      <button className="promo-arrow promo-arrow-left" type="button" onClick={() => go(-1)} aria-label="Prethodni akcijski proizvod"><ChevronLeft aria-hidden="true" /></button>
      <button className="promo-arrow promo-arrow-right" type="button" onClick={() => go(1)} aria-label="Sljedeći akcijski proizvod"><ChevronRight aria-hidden="true" /></button>
      <div className="promo-dots" aria-label="Odaberite akcijski proizvod">
        {actionProducts.map((item, index) => <button key={item.slug} type="button" className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Prikažite ${item.type} ${item.name}`} aria-current={index === active ? 'true' : undefined} />)}
      </div>
    </section>
  );
}
