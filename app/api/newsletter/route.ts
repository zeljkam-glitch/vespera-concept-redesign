import { isValidEmail, normalizeEmail, subscribe, unsubscribe } from '@/lib/newsletter';

export const dynamic = 'force-dynamic';

type NewsletterRequest = {
  action?: 'subscribe' | 'unsubscribe';
  email?: string;
  consent?: boolean;
  company?: string;
  source?: string;
};

export async function POST(request: Request) {
  let body: NewsletterRequest;
  try {
    body = await request.json() as NewsletterRequest;
  } catch {
    return Response.json({ ok: false, message: 'Zahtjev nije ispravan.' }, { status: 400 });
  }

  // Nevidljivo polje hvata automatizirane prijave bez otkrivanja ponašanja obrasca.
  if (body.company) return Response.json({ ok: true, message: 'Zahtjev je zaprimljen.' });

  const email = normalizeEmail(body.email ?? '');
  if (!isValidEmail(email)) {
    return Response.json({ ok: false, message: 'Upišite ispravnu e-mail adresu.' }, { status: 400 });
  }

  try {
    if (body.action === 'unsubscribe') {
      await unsubscribe(email, body.source ?? 'newsletter-odjava');
      return Response.json({ ok: true, message: 'E-mail adresa je odjavljena iz newslettera.' });
    }

    if (body.consent !== true) {
      return Response.json({ ok: false, message: 'Za prijavu je potrebna izričita privola.' }, { status: 400 });
    }

    await subscribe(email, body.source ?? 'footer-newsletter');
    return Response.json({ ok: true, message: 'Prijava je spremljena. Hvala!' });
  } catch {
    return Response.json({ ok: false, message: 'Prijava trenutačno nije dostupna. Pokušajte ponovno.' }, { status: 503 });
  }
}
