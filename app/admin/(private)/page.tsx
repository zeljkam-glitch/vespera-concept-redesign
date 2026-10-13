import { CheckCircle2, Clock3, Eye, ImageIcon, Package, Percent, Plus, Save, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AdminMediaUpload } from '@/components/admin-media-upload';
import { deleteProductAction, publishAction, saveMediaAction, saveProductAction, saveTextsAction } from '@/app/admin/actions';
import { getWorkspace, promotionState, type AdminProduct, type MediaItem } from '@/lib/admin/content';

function dateForInput(value: string) {
  return value ? value.slice(0, 16) : '';
}

function ProductForm({ product, media }: { product?: AdminProduct; media: MediaItem[] }) {
  const id = product?.slug ?? 'novi-proizvod';
  const state = product ? promotionState(product.promotion) : 'inactive';
  const labels = { inactive: 'Bez akcije', active: 'Akcija traje', scheduled: 'Zakazana', ended: 'Završena' };
  return (
    <details className="admin-editor" open={!product}>
      <summary><span><Package aria-hidden="true" /><strong>{product?.name ?? 'Novi proizvod'}</strong><small>{product ? `${product.type} · ${labels[state]}` : 'Dodajte proizvod u nacrt'}</small></span><span>Uredi</span></summary>
      <form action={saveProductAction} className="admin-form-grid">
        <input type="hidden" name="originalSlug" value={product?.slug ?? ''} />
        <label><span>Naziv</span><input name="name" defaultValue={product?.name} required /></label>
        <label><span>Slug / adresa</span><input name="slug" defaultValue={product?.slug} placeholder="npr. nova-garnitura" required /></label>
        <label><span>Vrsta proizvoda</span><input name="type" defaultValue={product?.type} required /></label>
        <label><span>Prostorija</span><select name="room" defaultValue={product?.room ?? 'Dnevni boravak'}><option>Dnevni boravak</option><option>Spavaća soba</option><option>Kuhinja</option></select></label>
        <label><span>Dimenzije</span><input name="dimensions" defaultValue={product?.dimensions} /></label>
        <label><span>Redovna cijena</span><input name="price" defaultValue={product?.price} placeholder="1.250,00 €" required /></label>
        <label><span>Dostupnost</span><select name="status" defaultValue={product?.status ?? 'Provjerite dostupnost'}><option>Na zalihi</option><option>Po narudžbi</option><option>Izložbeni primjerak</option><option>Provjerite dostupnost</option></select></label>
        <label><span>Istaknute značajke, odvojene zarezom</span><input name="features" defaultValue={product?.features.join(', ')} /></label>
        <label className="admin-span-2"><span>Fotografija (HTTPS ili lokalna /media adresa)</span><input name="image" defaultValue={product?.image} list={`media-${id}`} required /><datalist id={`media-${id}`}>{media.map((item) => <option key={item.id} value={item.url}>{item.name}</option>)}</datalist></label>
        <label className="admin-span-2"><span>Opis fotografije</span><input name="imageAlt" defaultValue={product?.imageAlt} required /></label>
        <label className="admin-span-2"><span>Opis proizvoda</span><textarea name="description" defaultValue={product?.description} rows={3} /></label>
        <fieldset className="admin-promotion admin-span-2"><legend>Akcija i automatski završetak</legend>
          <label className="admin-checkbox"><input type="checkbox" name="promotionEnabled" defaultChecked={product?.promotion.enabled} /><span>Uključi akciju</span></label>
          <div className="admin-form-grid"><label><span>Oznaka popusta</span><input name="promotionLabel" defaultValue={product?.promotion.label} placeholder="−20%" /></label><label><span>Akcijska cijena</span><input name="salePrice" defaultValue={product?.promotion.salePrice} /></label><label><span>Referentna cijena</span><input name="referencePrice" defaultValue={product?.promotion.referencePrice} /></label><label><span>Početak</span><input name="startsAt" type="datetime-local" defaultValue={dateForInput(product?.promotion.startsAt ?? '')} /></label><label><span>Završetak</span><input name="endsAt" type="datetime-local" defaultValue={dateForInput(product?.promotion.endsAt ?? '')} /></label></div>
          <p>Po isteku završnog datuma proizvod automatski se vraća na redovnu cijenu i nestaje iz akcijskih prikaza.</p>
        </fieldset>
        <div className="admin-form-actions admin-span-2"><button className="button button-dark" type="submit"><Save aria-hidden="true" /> Spremi u nacrt</button>{product && <button className="admin-delete" type="submit" formAction={deleteProductAction}>Ukloni iz nacrta</button>}</div>
      </form>
    </details>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ objavljeno?: string }> }) {
  const workspace = await getWorkspace();
  const params = await searchParams;
  const activePromotions = workspace.draft.products.filter((product) => promotionState(product.promotion) === 'active').length;
  const scheduledPromotions = workspace.draft.products.filter((product) => promotionState(product.promotion) === 'scheduled').length;
  return (
    <main className="admin-main">
      <section className="admin-title-row"><div><p className="eyebrow">Kontrolni centar</p><h1>Vespera Admin</h1><p>Sve promjene prvo se spremaju kao nacrt. Javni sadržaj ostaje netaknut do objave.</p></div><form action={publishAction}><button className="button button-accent" type="submit"><Send aria-hidden="true" /> Objavi cijeli nacrt</button></form></section>
      {params.objavljeno === 'da' && <p className="admin-success"><CheckCircle2 aria-hidden="true" /> Nacrt je objavljen.</p>}
      <section className="admin-stats" aria-label="Sažetak"><article><Package /><strong>{workspace.draft.products.length}</strong><span>proizvoda</span></article><article><Percent /><strong>{activePromotions}</strong><span>aktivnih akcija</span></article><article><Clock3 /><strong>{scheduledPromotions}</strong><span>zakazanih akcija</span></article><article><ImageIcon /><strong>{workspace.draft.media.length}</strong><span>fotografija</span></article></section>

      <section className="admin-section" id="tekstovi"><header><div><p className="eyebrow">Tekstovi</p><h2>Naslovnica i akcije</h2></div><p>Najvažniji tekstovi naslovnice uređuju se bez zahvata u kod.</p></header><form action={saveTextsAction} className="admin-panel admin-form-grid"><label><span>Nadnaslov naslovnice</span><input name="heroEyebrow" defaultValue={workspace.draft.texts.heroEyebrow} /></label><label className="admin-span-2"><span>Glavni naslov</span><input name="heroTitle" defaultValue={workspace.draft.texts.heroTitle} /></label><label className="admin-span-2"><span>Uvodni tekst</span><textarea name="heroBody" defaultValue={workspace.draft.texts.heroBody} rows={3} /></label><label><span>Nadnaslov akcija</span><input name="actionsEyebrow" defaultValue={workspace.draft.texts.actionsEyebrow} /></label><label className="admin-span-2"><span>Naslov akcija</span><input name="actionsTitle" defaultValue={workspace.draft.texts.actionsTitle} /></label><label className="admin-span-2"><span>Opis akcija</span><textarea name="actionsBody" defaultValue={workspace.draft.texts.actionsBody} rows={3} /></label><div className="admin-form-actions admin-span-2"><button className="button button-dark" type="submit"><Save /> Spremi tekstove</button></div></form></section>

      <section className="admin-section" id="proizvodi"><header><div><p className="eyebrow">Proizvodi i akcije</p><h2>Ponuda</h2></div><a className="button button-light" href="#novi"><Plus /> Novi proizvod</a></header><div className="admin-editor-list">{workspace.draft.products.map((product) => <ProductForm key={product.slug} product={product} media={workspace.draft.media} />)}<div id="novi"><ProductForm media={workspace.draft.media} /></div></div></section>

      <section className="admin-section" id="fotografije"><header><div><p className="eyebrow">Fotografije</p><h2>Medijska zbirka</h2></div><p>Prenesite fotografiju, dodajte pristupačan opis i zatim je odaberite na proizvodu.</p></header><div className="admin-media-grid">{workspace.draft.media.map((item) => <form action={saveMediaAction} className="admin-media-card" key={item.id}><Image src={item.url} alt={item.alt} width={720} height={540} unoptimized /><input type="hidden" name="originalId" value={item.id} /><label><span>Naziv</span><input name="name" defaultValue={item.name} /></label><label><span>ID</span><input name="id" defaultValue={item.id} /></label><label><span>Adresa</span><input name="url" defaultValue={item.url} required /></label><label><span>Opis fotografije</span><input name="alt" defaultValue={item.alt} /></label><button type="submit"><Save /> Spremi</button></form>)}<AdminMediaUpload /></div></section>

      <section className="admin-ready"><Eye /><div><p className="eyebrow">Prije objave</p><h2>Pregledajte cijeli nacrt.</h2><p>Pregled koristi nacrt, dok javna stranica i dalje koristi zadnju objavljenu verziju.</p></div><Link className="button button-accent" href="/admin/pregled">Otvori pregled nacrta</Link></section>
    </main>
  );
}
