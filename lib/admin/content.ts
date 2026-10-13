import 'server-only';

import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { env } from 'cloudflare:workers';
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

function database() {
  try {
    return env.DB ?? null;
  } catch {
    return null;
  }
}

const defaultTexts: SiteTexts = {
  heroEyebrow: 'Salon namještaja u Karlovcu od 2008.',
  heroTitle: 'Dobar namještaj počinje dobrim savjetom.',
  heroBody: 'Posjetite salon, isprobajte proizvode i razgovarajte s ljudima koji znaju pomoći.',
  actionsEyebrow: 'Aktualne akcije',
  actionsTitle: 'Jasna cijena. Ponuda koja se mijenja.',
  actionsBody: 'Prikazujemo akcijsku i referentnu cijenu te status proizvoda. Dostupnost i izvedbu uvijek potvrdite sa salonom.',
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
  const db = database();
  if (db) {
    try {
      const row = await db.prepare('SELECT payload FROM vespera_content WHERE id = 1').first<{ payload: string }>();
      if (row) {
        const parsed: unknown = JSON.parse(row.payload);
        if (isWorkspace(parsed)) return parsed;
      }
      return createInitialWorkspace();
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      if (!message.includes('no such table')) throw error;
      return createInitialWorkspace();
    }
  }
  try {
    const parsed: unknown = JSON.parse(await readFile(contentPath, 'utf8'));
    return isWorkspace(parsed) ? parsed : createInitialWorkspace();
  } catch {
    return createInitialWorkspace();
  }
}

export async function saveWorkspace(workspace: ContentWorkspace) {
  const db = database();
  if (db) {
    const payload = JSON.stringify(workspace);
    await db.prepare(`
      INSERT INTO vespera_content (id, payload, updated_at)
      VALUES (1, ?1, ?2)
      ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at
    `).bind(payload, new Date().toISOString()).run();
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
    image: product.image,
    status: product.status,
    features: product.features,
    href: product.href,
  };
}

export async function getPublishedContent() {
  const workspace = await getWorkspace();
  return {
    ...workspace.published,
    products: workspace.published.products.map((product) => toCatalogProduct(product)),
  };
}
