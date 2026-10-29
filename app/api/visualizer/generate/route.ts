import { createHmac } from 'node:crypto';
import { get, put } from '@vercel/blob';
import { generateImage } from 'ai';
import { getPublishedContent } from '@/lib/admin/content';
import { featureFlags } from '@/lib/features';

export const runtime = 'nodejs';
export const maxDuration = 60;

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const allowedPlacements = new Set(['replace', 'center', 'left', 'right']);
const allowedProductHosts = new Set(['vespera.hr', 'www.vespera.hr']);
const dailyLimit = 3;
const localRateLimits = new Map<string, number>();

function hasBlobStorage() {
  return Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
}

function clientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const address = forwarded || request.headers.get('x-real-ip') || 'unknown';
  const secret = process.env.VESPERA_SESSION_SECRET || 'vespera-local-ai-limit';
  return createHmac('sha256', secret).update(address).digest('hex').slice(0, 32);
}

async function consumeDailyUse(request: Request) {
  const date = new Date().toISOString().slice(0, 10);
  const key = clientKey(request);
  const storageKey = `ai-rate/${date}/${key}.json`;

  if (!hasBlobStorage()) {
    const localKey = `${date}:${key}`;
    const count = localRateLimits.get(localKey) ?? 0;
    if (count >= dailyLimit) return false;
    localRateLimits.set(localKey, count + 1);
    return true;
  }

  const current = await get(storageKey, { access: 'private', useCache: false });
  let count = 0;
  if (current?.statusCode === 200) {
    const parsed = JSON.parse(await new Response(current.stream).text()) as { count?: number };
    count = typeof parsed.count === 'number' ? parsed.count : 0;
  }
  if (count >= dailyLimit) return false;
  await put(storageKey, JSON.stringify({ count: count + 1, date }), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });
  return true;
}

async function fetchProductImage(request: Request, source: string) {
  let url: URL;
  if (source.startsWith('/admin-media/')) {
    url = new URL(source, request.url);
  } else {
    url = new URL(source);
    if (url.protocol !== 'https:' || !allowedProductHosts.has(url.hostname) || !url.pathname.startsWith('/wp-content/uploads/')) {
      throw new Error('Nedopušten izvor fotografije proizvoda.');
    }
  }

  const response = await fetch(url, { signal: AbortSignal.timeout(12_000) });
  const contentType = response.headers.get('content-type') ?? '';
  const contentLength = Number(response.headers.get('content-length') ?? 0);
  if (!response.ok || !allowedTypes.has(contentType.split(';')[0])) throw new Error('Fotografija proizvoda nije dostupna.');
  if (contentLength > 12 * 1024 * 1024) throw new Error('Fotografija proizvoda je prevelika.');
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > 12 * 1024 * 1024) throw new Error('Fotografija proizvoda je prevelika.');
  return bytes;
}

function placementInstruction(value: string) {
  if (value === 'left') return 'Place the product naturally on the left side of the visible floor area.';
  if (value === 'right') return 'Place the product naturally on the right side of the visible floor area.';
  if (value === 'center') return 'Place the product naturally near the center of the visible floor area.';
  return 'Replace the most visually similar existing furniture with the reference product. If there is no suitable existing furniture, place it in the clearest available floor area.';
}

function publicError(error: unknown) {
  const statusCode = typeof error === 'object' && error && 'statusCode' in error ? Number(error.statusCode) : 0;
  const message = error instanceof Error ? error.message : '';
  if (statusCode === 401 || message.includes('authentication')) return 'AI usluga još nije aktivirana za ovaj projekt.';
  if (statusCode === 402 || message.includes('insufficient_funds') || message.includes('quota_for_entity_exceeded')) return 'Dosegnut je postavljeni AI budžet. Pokušajte ponovno kasnije.';
  if (statusCode === 429) return 'AI je trenutačno zauzet. Pričekajte nekoliko minuta i pokušajte ponovno.';
  if (statusCode === 403 || message.includes('customer_verification_required')) return 'Vlasnik projekta treba dovršiti aktivaciju AI usluge na Vercelu.';
  return 'AI vizualizaciju trenutačno nije moguće izraditi. Pokušajte s drugom fotografijom ili ponovno kasnije.';
}

export async function POST(request: Request) {
  if (!featureFlags.aiRoomVisualizer) {
    return Response.json({ error: 'AI vizualizator privremeno nije dostupan.' }, { status: 404 });
  }

  try {
    const formData = await request.formData();
    const room = formData.get('room');
    const productSlug = formData.get('productSlug');
    const placement = formData.get('placement');

    if (!(room instanceof File) || typeof productSlug !== 'string' || typeof placement !== 'string') {
      return Response.json({ error: 'Nedostaje fotografija, proizvod ili položaj.' }, { status: 400 });
    }
    if (!allowedTypes.has(room.type) || room.size > 10 * 1024 * 1024) {
      return Response.json({ error: 'Fotografija mora biti JPG, PNG ili WebP i imati najviše 10 MB.' }, { status: 400 });
    }
    if (!allowedPlacements.has(placement)) return Response.json({ error: 'Odabrani položaj nije podržan.' }, { status: 400 });

    const content = await getPublishedContent();
    const product = content.products.find((item) => item.slug === productSlug);
    if (!product?.image) return Response.json({ error: 'Odabrani proizvod nije dostupan.' }, { status: 404 });
    if (!(await consumeDailyUse(request))) {
      return Response.json({ error: 'Iskoristili ste 3 današnje vizualizacije. Pokušajte ponovno sutra.' }, { status: 429 });
    }

    const [roomBytes, productBytes] = await Promise.all([
      room.arrayBuffer().then((buffer) => new Uint8Array(buffer)),
      fetchProductImage(request, product.image),
    ]);
    const model = process.env.AI_VISUALIZER_MODEL || 'openai/gpt-image-2.5-sunburst';
    const prompt = [
      'Create one photorealistic interior visualization by editing IMAGE 1, the customer room photo.',
      `IMAGE 2 is the exact reference for the furniture product named ${product.name}, type ${product.type}. Extract only that furniture product from IMAGE 2; never copy its original room, walls, floor, rug, windows, decor, people, text, labels, or background.`,
      placementInstruction(placement),
      'Preserve IMAGE 1 architecture, camera angle, crop, walls, windows, doors, floor, lighting, existing decor, and any people exactly unless furniture must be removed to make space.',
      'Match the product perspective, realistic scale, contact shadows, color temperature, occlusion, and floor plane to IMAGE 1.',
      'Preserve the reference product design, upholstery color, seams, cushions, armrests, legs, proportions, and configuration as faithfully as possible. Do not redesign it and do not add text or logos.',
      'Return only the final edited room photograph, without a collage, frame, caption, before-and-after layout, watermark, or explanation.',
    ].join(' ');

    const { image } = await generateImage({
      model,
      prompt: { text: prompt, images: [roomBytes, productBytes] },
      size: '1536x1024',
      maxRetries: 1,
      abortSignal: AbortSignal.timeout(55_000),
    });

    const responseBody = new Uint8Array(image.uint8Array).buffer;
    return new Response(responseBody, {
      headers: {
        'Content-Type': image.mediaType || 'image/png',
        'Cache-Control': 'private, no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('AI visualizer generation failed', error instanceof Error ? error.message : 'Unknown error');
    return Response.json({ error: publicError(error) }, { status: 503 });
  }
}
