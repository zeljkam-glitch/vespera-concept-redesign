import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { get } from '@vercel/blob';

const contentTypes: Record<string, string> = {
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

export async function GET(_request: Request, context: { params: Promise<{ key: string[] }> }) {
  const { key } = await context.params;
  const pathname = key.join('/');
  if (key.some((segment) => segment === '..' || segment.includes('\\')) || !pathname.startsWith('products/')) {
    return new Response('Not found', { status: 404 });
  }
  if (process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN) {
    const object = await get(pathname, { access: 'private' });
    if (!object || object.statusCode !== 200) return new Response('Not found', { status: 404 });
    const headers = new Headers();
    object.headers.forEach((value, name) => headers.set(name, value));
    headers.set('cache-control', 'public, max-age=86400');
    return new Response(object.stream, { headers });
  }

  try {
    const body = await readFile(path.join(process.cwd(), '.data', 'media', pathname));
    return new Response(body, {
      headers: {
        'content-type': contentTypes[path.extname(pathname).toLowerCase()] ?? 'application/octet-stream',
        'cache-control': 'public, max-age=86400',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
