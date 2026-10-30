import Image from 'next/image';
import type { CatalogProduct } from '@/lib/products';
import { getAiLifestyleImage } from '@/lib/product-media';

type ProductVisualProps = {
  product: CatalogProduct;
  sizes: string;
  priority?: boolean;
  presentation?: 'studio' | 'ambience';
};

export function ProductVisual({ product, sizes, priority = false, presentation = 'studio' }: ProductVisualProps) {
  const lifestyleImage = getAiLifestyleImage(product.slug);
  const showAmbience = presentation === 'ambience' && lifestyleImage;

  return (
    <div className={`product-image product-visual${showAmbience ? ' is-ai-ambience' : ' is-studio'}`}>
      <Image
        src={showAmbience ? lifestyleImage : product.image}
        alt={showAmbience ? `${product.type} ${product.name} u AI prilagođenom ambijentu` : `${product.type} ${product.name} – izvorna fotografija proizvoda`}
        width={960}
        height={720}
        sizes={sizes}
        priority={priority}
      />
      {showAmbience ? <span className="product-ai-label"><b>AI</b> modified</span> : <span className="product-image-label">Izvorna fotografija</span>}
      {product.discount && <span className="promo-badge">{product.discount}</span>}
    </div>
  );
}
