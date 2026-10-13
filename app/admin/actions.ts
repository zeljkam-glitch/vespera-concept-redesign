'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { clearAdminSession, createAdminSession, isAdmin, validCredentials } from '@/lib/admin/session';
import { getWorkspace, saveWorkspace, type AdminProduct, type MediaItem, type SiteTexts } from '@/lib/admin/content';

const allowedRooms = ['Dnevni boravak', 'Spavaća soba', 'Kuhinja'] as const;
const allowedStatuses = ['Na zalihi', 'Po narudžbi', 'Izložbeni primjerak', 'Provjerite dostupnost'] as const;

function text(formData: FormData, name: string, max = 500) {
  const value = formData.get(name);
  return (typeof value === 'string' ? value : '').trim().slice(0, max);
}

function safeUrl(value: string) {
  if (value.startsWith('/')) return value;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : '';
  } catch {
    return '';
  }
}

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error('Niste prijavljeni.');
}

export async function loginAction(_state: { error: string }, formData: FormData) {
  const username = text(formData, 'username', 100);
  const password = text(formData, 'password', 200);
  if (!validCredentials(username, password)) return { error: 'Korisničko ime ili lozinka nisu ispravni.' };
  await createAdminSession();
  redirect('/admin');
}

export async function logoutAction() {
  await clearAdminSession();
  redirect('/admin/prijava');
}

export async function saveTextsAction(formData: FormData) {
  await requireAdmin();
  const workspace = await getWorkspace();
  const texts: SiteTexts = {
    heroEyebrow: text(formData, 'heroEyebrow', 120),
    heroTitle: text(formData, 'heroTitle', 160),
    heroBody: text(formData, 'heroBody', 320),
    actionsEyebrow: text(formData, 'actionsEyebrow', 120),
    actionsTitle: text(formData, 'actionsTitle', 160),
    actionsBody: text(formData, 'actionsBody', 420),
  };
  workspace.draft.texts = texts;
  workspace.draft.updatedAt = new Date().toISOString();
  await saveWorkspace(workspace);
  revalidatePath('/admin');
}

export async function saveProductAction(formData: FormData) {
  await requireAdmin();
  const workspace = await getWorkspace();
  const originalSlug = text(formData, 'originalSlug', 100);
  const slug = text(formData, 'slug', 100).toLocaleLowerCase('hr').replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
  const roomValue = text(formData, 'room', 50);
  const statusValue = text(formData, 'status', 60);
  const image = safeUrl(text(formData, 'image', 1200));
  if (!slug || !text(formData, 'name', 140) || !image) throw new Error('Naziv, slug i valjana HTTPS ili lokalna fotografija su obavezni.');

  const product: AdminProduct = {
    slug,
    name: text(formData, 'name', 140),
    type: text(formData, 'type', 140),
    room: allowedRooms.includes(roomValue as (typeof allowedRooms)[number]) ? roomValue as AdminProduct['room'] : 'Dnevni boravak',
    dimensions: text(formData, 'dimensions', 140),
    price: text(formData, 'price', 80),
    image,
    imageAlt: text(formData, 'imageAlt', 240),
    description: text(formData, 'description', 700),
    status: allowedStatuses.includes(statusValue as (typeof allowedStatuses)[number]) ? statusValue as AdminProduct['status'] : 'Provjerite dostupnost',
    features: text(formData, 'features', 500).split(',').map((item) => item.trim()).filter(Boolean).slice(0, 12),
    href: text(formData, 'href', 240) || undefined,
    promotion: {
      enabled: formData.get('promotionEnabled') === 'on',
      label: text(formData, 'promotionLabel', 30),
      salePrice: text(formData, 'salePrice', 80),
      referencePrice: text(formData, 'referencePrice', 80),
      startsAt: text(formData, 'startsAt', 40),
      endsAt: text(formData, 'endsAt', 40),
    },
  };

  const index = workspace.draft.products.findIndex((item) => item.slug === originalSlug);
  if (index >= 0) workspace.draft.products[index] = product;
  else workspace.draft.products.push(product);
  workspace.draft.updatedAt = new Date().toISOString();
  await saveWorkspace(workspace);
  revalidatePath('/admin');
  revalidatePath('/admin/pregled');
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  const slug = text(formData, 'originalSlug', 100);
  const workspace = await getWorkspace();
  workspace.draft.products = workspace.draft.products.filter((product) => product.slug !== slug);
  workspace.draft.updatedAt = new Date().toISOString();
  await saveWorkspace(workspace);
  revalidatePath('/admin');
}

export async function saveMediaAction(formData: FormData) {
  await requireAdmin();
  const workspace = await getWorkspace();
  const originalId = text(formData, 'originalId', 100);
  const id = (text(formData, 'id', 100) || crypto.randomUUID()).replace(/[^a-zA-Z0-9-_]/g, '-');
  const url = safeUrl(text(formData, 'url', 1200));
  if (!url) throw new Error('Fotografija mora imati valjanu HTTPS ili lokalnu adresu.');
  const item: MediaItem = { id, name: text(formData, 'name', 140), url, alt: text(formData, 'alt', 240) };
  const index = workspace.draft.media.findIndex((media) => media.id === originalId);
  if (index >= 0) workspace.draft.media[index] = item;
  else workspace.draft.media.push(item);
  workspace.draft.updatedAt = new Date().toISOString();
  await saveWorkspace(workspace);
  revalidatePath('/admin');
}

export async function publishAction() {
  await requireAdmin();
  const workspace = await getWorkspace();
  const now = new Date().toISOString();
  workspace.published = structuredClone({ ...workspace.draft, updatedAt: now });
  workspace.publishedAt = now;
  await saveWorkspace(workspace);
  revalidatePath('/', 'layout');
  redirect('/admin?objavljeno=da');
}
