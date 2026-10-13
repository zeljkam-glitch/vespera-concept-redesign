const allowedHosts = new Set(['vespera.hr', 'www.vespera.hr']);
const maxImageBytes = 12 * 1024 * 1024;

export async function GET(request: Request) {
  const source = new URL(request.url).searchParams.get('src');
  if (!source) return new Response('Nedostaje izvor fotografije.', { status: 400 });

  let imageUrl: URL;
  try {
    imageUrl = new URL(source);
  } catch {
    return new Response('Neispravna adresa fotografije.', { status: 400 });
  }

  if (imageUrl.protocol !== 'https:' || !allowedHosts.has(imageUrl.hostname) || !imageUrl.pathname.startsWith('/wp-content/uploads/')) {
    return new Response('Izvor fotografije nije dopušten.', { status: 403 });
  }

  try {
    const response = await fetch(imageUrl, { signal: AbortSignal.timeout(10_000) });
    const contentType = response.headers.get('content-type') ?? '';
    const contentLength = Number(response.headers.get('content-length') ?? 0);
    if (!response.ok || !response.body || !contentType.startsWith('image/')) return new Response('Fotografija nije dostupna.', { status: 502 });
    if (contentLength > maxImageBytes) return new Response('Fotografija je prevelika.', { status: 413 });

    return new Response(response.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000',
      },
    });
  } catch {
    return new Response('Fotografija trenutačno nije dostupna.', { status: 502 });
  }
}
