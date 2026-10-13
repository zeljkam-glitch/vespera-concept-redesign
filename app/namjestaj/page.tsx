import { ProductCatalog } from '@/components/product-catalog';
import { getPublishedContent } from '@/lib/admin/content';

export const dynamic = 'force-dynamic';

export default async function NamjestajPage() {
  const content = await getPublishedContent();
  return <ProductCatalog products={content.products} />;
}
