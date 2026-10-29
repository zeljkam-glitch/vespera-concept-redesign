'use client';

import { type SyntheticEvent, useState } from 'react';
import Link from 'next/link';

type NewsletterFormProps = {
  mode?: 'subscribe' | 'unsubscribe';
};

export function NewsletterForm({ mode = 'subscribe' }: NewsletterFormProps) {
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const isUnsubscribe = mode === 'unsubscribe';

  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage('');
    const form = event.currentTarget;
    const data = new FormData(form);
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        action: mode,
        email: data.get('email'),
        consent: data.get('consent') === 'on',
        company: data.get('company'),
        source: isUnsubscribe ? 'odjava-stranica' : 'footer-newsletter',
      }),
    });
    const result = await response.json() as { message?: string };
    setMessage(result.message ?? 'Zahtjev je obrađen.');
    if (response.ok) form.reset();
    setPending(false);
  }

  return <form className={`newsletter-form ${isUnsubscribe ? 'newsletter-unsubscribe' : ''}`} onSubmit={submit}>
    <label htmlFor={`newsletter-email-${mode}`}>E-mail adresa</label>
    <div className="newsletter-row"><input id={`newsletter-email-${mode}`} name="email" type="email" autoComplete="email" required placeholder="ime@primjer.hr" /><button type="submit" disabled={pending}>{pending ? 'Spremamo…' : isUnsubscribe ? 'Odjavi me' : 'Prijavi me'}</button></div>
    <label className="newsletter-honeypot" aria-hidden="true">Tvrtka<input name="company" tabIndex={-1} autoComplete="off" /></label>
    {!isUnsubscribe && <label className="newsletter-consent"><input name="consent" type="checkbox" required /><span>Želim primati novosti i ponude e-mailom. Privolu mogu povući u bilo kojem trenutku putem <Link href="/newsletter/odjava">odjave</Link>. Pročitao/la sam <Link href="/privatnost">obavijest o privatnosti</Link>.</span></label>}
    <p className="newsletter-message" aria-live="polite">{message}</p>
  </form>;
}
