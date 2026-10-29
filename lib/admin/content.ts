import 'server-only';

import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { get, put } from '@vercel/blob';
import { catalogProducts, type CatalogProduct } from '@/lib/products';

export type Promotion = {
  enabled: boolean;
  label: string;
  salePrice: string;
  referencePrice: string;
  startsAt: string;
  endsAt: string;
};

export type AdminProduct = Omit<CatalogProduct, 'regularPrice' | 'price' | 'discount'> & {
  price: string;
  imageAlt: string;
  description: string;
  promotion: Promotion;
};

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  alt: string;
};

export type SiteTexts = {
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  actionsEyebrow: string;
  actionsTitle: string;
  actionsBody: string;
};

export type ContentSnapshot = {
  updatedAt: string;
  products: AdminProduct[];
  media: MediaItem[];
  texts: SiteTexts;
};

export type ContentWorkspace = {
  version: 1;
  publishedAt: string | null;
  draft: ContentSnapshot;
  published: ContentSnapshot;
};

const contentPath = path.join(process.cwd(), '.data', 'vespera-content.json');
const contentBlobPath = 'admin/vespera-content.json';

function hasBlobStorage() {
  return Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
}

async function readBlobWorkspace() {
  const result = await get(contentBlobPath, { access: 'private', useCache: false });
  if (!result || result.statusCode !== 200) return null;
  const parsed: unknown = JSON.parse(await new Response(result.stream).text());
  return isWorkspace(parsed) ? parsed : null;
}

async function saveBlobWorkspace(workspace: ContentWorkspace) {
  await put(contentBlobPath, `${JSON.stringify(workspace, null, 2)}\n`, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json; charset=utf-8',
    cacheControlMaxAge: 60,
  });
}

async function readFileWorkspace() {
  try {
    const parsed: unknown = JSON.parse(await readFile(contentPath, 'utf8'));
    return isWorkspace(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

const defaultTexts: SiteTexts = {
  heroEyebrow: 'Salon namještaja u Karlovcu od 2008.',
  heroTitle: 'Dobar namještaj počinje dobrim savjetom.',
  heroBody: 'Posjetite salon, isprobajte proizvode i razgovarajte s ljudima koji znaju pomoći.',
  actionsEyebrow: 'Aktualni katalog kreveta',
  actionsTitle: '32 javno objavljena modela na jednom mjestu.',
  actionsBody: 'Cijene i podaci preneseni su s javne Vespera stranice. Dostupnost, izvedbu i konačnu cijenu uvijek potvrdite sa salonom.',
};

function initialProduct(product: CatalogProduct): AdminProduct {
  return {
    ...product,
    price: product.regularPrice ?? product.price,
    imageAlt: `${product.type} ${product.name}`,
    description: `${product.type} ${product.name}. Provjerite dostupne izvedbe, boje i rok isporuke u salonu.`,
    promotion: {
      enabled: Boolean(product.discount),
      label: product.discount ?? '',
      salePrice: product.price,
      referencePrice: product.regularPrice ?? product.price,
      startsAt: '',
      endsAt: '',
    },
  };
}

function createInitialWorkspace(): ContentWorkspace {
  const now = new Date().toISOString();
  const products = catalogProducts.map(initialProduct);
  const media = products.map((product) => ({
    id: product.slug,
    name: product.name,
    url: product.image,
    alt: product.imageAlt,
  }));
  const snapshot: ContentSnapshot = { updatedAt: now, products, media, texts: defaultTexts };
  return { version: 1, publishedAt: null, draft: structuredClone(snapshot), published: structuredClone(snapshot) };
}

function isWorkspace(value: unknown): value is ContentWorkspace {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<ContentWorkspace>;
  return candidate.version === 1 && Boolean(candidate.draft?.products) && Boolean(candidate.published?.products);
}

export async function getWorkspace(): Promise<ContentWorkspace> {
  if (hasBlobStorage()) return (await readBlobWorkspace()) ?? createInitialWorkspace();
  return (await readFileWorkspace()) ?? createInitialWorkspace();
}

export async function saveWorkspace(workspace: ContentWorkspace) {
  if (hasBlobStorage()) {
    await saveBlobWorkspace(workspace);
    return;
  }
  const directory = path.dirname(contentPath);
  await mkdir(directory, { recursive: true });
  const temporaryPath = `${contentPath}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(workspace, null, 2)}\n`, 'utf8');
  await rename(temporaryPath, contentPath);
}

export function promotionState(promotion: Promotion, now = new Date()) {
  if (!promotion.enabled) return 'inactive' as const;
  const startsAt = promotion.startsAt ? new Date(promotion.startsAt) : null;
  const endsAt = promotion.endsAt ? new Date(promotion.endsAt) : null;
  if (startsAt && startsAt > now) return 'scheduled' as const;
  if (endsAt && endsAt <= now) return 'ended' as const;
  return 'active' as const;
}

export function toCatalogProduct(product: AdminProduct, now = new Date()): CatalogProduct {
  const active = promotionState(product.promotion, now) === 'active';
  return {
    slug: product.slug,
    name: product.name,
    type: product.type,
    room: product.room,
    dimensions: product.dimensions,
    regularPrice: active ? product.promotion.referencePrice : undefined,
    price: active ? product.promotion.salePrice : product.price,
    discount: active ? product.promotion.label : undefined,
    image: product.slug === 'manila' && product.image === 'https://vespera.hr/wp-content/uploads/2026/07/1781691780_1781690676836_edit_338493474214675.png' ? '/manila-photo.jpeg' : product.image,
    status: product.status,
    features: product.features,
    href: product.href,
    sourceUrl: product.sourceUrl,
    sourceNote: product.sourceNote,
  };
}

export async function getPublishedContent() {
  const workspace = await getWorkspace();
  return {
    ...workspace.published,
    // Javno prikazani katalog namjerno dolazi iz provjerenog izvornog skupa u kodu.
    // Time stara Blob snimka s demo cijenama ne može ponovno objaviti nepotvrđene
    // referentne cijene nakon deploya.
    products: catalogProducts,
  };
}
