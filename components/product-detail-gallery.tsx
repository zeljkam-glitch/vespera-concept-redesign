'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { CatalogProduct } from '@/lib/products';
import { getAiLifestyleImage } from '@/lib/product-media';

export function ProductDetailGallery({ product }: { product: CatalogProduct }) {
  const aiImage = getAiLifestyleImage(product.slug);
  const [selected, setSelected] = useState<'original' | 'ai'>('original');
  const image = selected === 'ai' && aiImage ? aiImage : product.image;
  const isAi = selected === 'ai' && Boolean(aiImage);

  return (
    <div className="product-gallery">
      <div className={`main-product-image${isAi ? ' is-ai-view' : ' is-original-view'}`}>
        <Image
          key={image}
          src={image}
          alt={isAi ? `${product.type} ${product.name} u AI prilagođenom ambijentu` : `${product.type} ${product.name} – izvorna fotografija proizvoda`}
          width={1140}
          height={860}
          sizes="(max-width: 920px) 100vw, 52vw"
          priority
        />
        {product.discount ? <span className="promo-badge">{product.discount}</span> : null}
        {isAi ? <span className="detail-ai-badge"><b>AI</b> modified</span> : null}
      </div>
      {aiImage ? (
        <div className="product-gallery-switch" aria-label="Odaberite fotografiju proizvoda">
          <button type="button" className={selected === 'original' ? 'is-active' : ''} aria-pressed={selected === 'original'} onClick={() => setSelected('original')}>
            <Image src={product.image} alt="" width={160} height={120} sizes="80px" />
            <span>Izvorna fotografija</span>
          </button>
          <button type="button" className={selected === 'ai' ? 'is-active' : ''} aria-pressed={selected === 'ai'} onClick={() => setSelected('ai')}>
            <Image src={aiImage} alt="" width={160} height={120} sizes="80px" />
            <span>AI ambijent</span>
          </button>
        </div>
      ) : null}
      <p className="image-caption">
        {aiImage ? 'Pojedine fotografije proizvoda prilagođene su ili generirane pomoću AI-ja. Izvornu fotografiju koristite za provjeru izgleda modela, a boju, materijal i izvedbu potvrdite u salonu.' : 'Prikazana je izvorna fotografija proizvoda. Boju, materijal i konačnu izvedbu potvrdite u salonu.'}
      </p>
    </div>
  );
}
