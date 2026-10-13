import { env } from 'cloudflare:workers';
import { getWorkspace, saveWorkspace } from '@/lib/admin/content';
import { isAdmin } from '@/lib/admin/session';

const allowedTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
]);

export async function POST(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const formData = await request.formData();
  const file = formData.get('file');
  const rawName = formData.get('name');
  const rawAlt = formData.get('alt');
  const name = (typeof rawName === 'string' ? rawName : '').trim().slice(0, 140);
  const alt = (typeof rawAlt === 'string' ? rawAlt : '').trim().slice(0, 240);
  if (!(file instanceof File)) return Response.json({ error: 'Odaberite fotografiju.' }, { status: 400 });
  const extension = allowedTypes.get(file.type);
  if (!extension) return Response.json({ error: 'Podržani su JPG, PNG, WebP i GIF.' }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return Response.json({ error: 'Fotografija smije imati najviše 8 MB.' }, { status: 400 });
  if (!name || !alt) return Response.json({ error: 'Naziv i opis fotografije su obavezni.' }, { status: 400 });

  const id = crypto.randomUUID();
  const key = `products/${id}.${extension}`;
  await env.BUCKET.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  const workspace = await getWorkspace();
  workspace.draft.media.push({ id, name, alt, url: `/admin-media/${key}` });
  workspace.draft.updatedAt = new Date().toISOString();
  await saveWorkspace(workspace);
  return Response.json({ ok: true, url: `/admin-media/${key}` }, { status: 201 });
}
