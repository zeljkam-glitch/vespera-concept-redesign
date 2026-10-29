import Image from 'next/image';
import type { CatalogProduct } from '@/lib/products';
import { getAiLifestyleImage } from '@/lib/product-media';

type ProductVisualProps = {
  product: CatalogProduct;
  sizes: string;
  priority?: boolean;
};

export function ProductVisual({ product, sizes, priority = false }: ProductVisualProps) {
  const lifestyleImage = getAiLifestyleImage(product.slug);

  return (
    <div className={`product-image product-visual${lifestyleImage ? ' has-ai-ambience' : ''}`}>
      <div className="product-studio-image">
        <Image
          src={product.image}
          alt={`${product.type} ${product.name} – izvorna fotografija proizvoda`}
          width={960}
          height={720}
          sizes={sizes}
          priority={priority}
        />
        <span className="product-image-label">Proizvod</span>
      </div>
      {lifestyleImage && (
        <div className="product-ambience-image">
          <Image
            src={lifestyleImage}
            alt={`${product.type} ${product.name} u AI prilagođenom ambijentu`}
            width={560}
            height={420}
            sizes="(max-width: 620px) 38vw, 190px"
          />
          <span className="product-ai-label"><b>AI</b> modified</span>
        </div>
      )}
      {product.discount && <span className="promo-badge">{product.discount}</span>}
    </div>
  );
}
