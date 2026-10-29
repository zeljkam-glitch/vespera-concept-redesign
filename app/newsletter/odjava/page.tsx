import { NewsletterForm } from '@/components/newsletter-form';
import { PageShell } from '@/components/site-chrome';

export default function NewsletterUnsubscribePage() {
  return <PageShell><main><section className="info-hero"><div className="container"><p className="eyebrow">Newsletter</p><h1>Odjava bez prepreka.</h1><p className="lead">Upišite adresu koju želite ukloniti. Odjava se evidentira odmah i vrijedi za buduće marketinške poruke.</p></div></section><section className="section container narrow"><NewsletterForm mode="unsubscribe" /></section></main></PageShell>;
}
