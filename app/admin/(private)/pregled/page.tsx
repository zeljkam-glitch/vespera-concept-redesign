import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CalendarClock, CheckCircle2 } from 'lucide-react';
import { getWorkspace, promotionState, toCatalogProduct } from '@/lib/admin/content';

export default async function DraftPreviewPage() {
  const workspace = await getWorkspace();
  const products = workspace.draft.products.map((product) => ({ source: product, display: toCatalogProduct(product) }));
  return (
    <main className="admin-preview">
      <div className="admin-preview-bar"><Link href="/admin"><ArrowLeft /> Natrag u uređivanje</Link><strong>Pregled nacrta — nije javno</strong><span>Posljednja izmjena {new Intl.DateTimeFormat('hr-HR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(workspace.draft.updatedAt))}</span></div>
      <section className="admin-preview-hero"><p className="eyebrow">{workspace.draft.texts.heroEyebrow}</p><h1>{workspace.draft.texts.heroTitle}</h1><p>{workspace.draft.texts.heroBody}</p></section>
      <section className="admin-preview-products"><div className="section-head"><div><p className="eyebrow">{workspace.draft.texts.actionsEyebrow}</p><h2>{workspace.draft.texts.actionsTitle}</h2></div><p>{workspace.draft.texts.actionsBody}</p></div><div className="product-grid catalog-products">{products.map(({ source, display }) => { const state = promotionState(source.promotion); return <article className="product-card" key={display.slug}><div className="product-image"><Image src={display.image} alt={source.imageAlt} width={960} height={720} unoptimized />{display.discount && <span className="promo-badge">{display.discount}</span>}</div><div className="product-body"><span className={`admin-promo-state is-${state}`}>{state === 'active' ? <CheckCircle2 /> : <CalendarClock />}{state === 'active' ? 'Akcija traje' : state === 'scheduled' ? 'Zakazana akcija' : state === 'ended' ? 'Akcija završena' : 'Bez akcije'}</span><p className="product-kicker">{display.type} · {display.dimensions}</p><h3>{display.name}</h3><p>{source.description}</p><div className="anchor-price">{display.regularPrice && <span>Referentna cijena {display.regularPrice}</span>}<strong>{display.price}</strong></div></div></article>; })}</div></section>
    </main>
  );
}
