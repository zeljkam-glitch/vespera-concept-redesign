'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Check, Download, ImagePlus, Mail, RefreshCw, Sparkles, Upload, WandSparkles } from 'lucide-react';
import type { CatalogProduct } from '@/lib/products';

const rooms = ['Dnevni boravak', 'Spavaća soba', 'Kuhinja'];
const placements = [
  { value: 'replace', label: 'Umjesto postojećeg namještaja' },
  { value: 'center', label: 'U sredinu prostorije' },
  { value: 'left', label: 'Na lijevu stranu' },
  { value: 'right', label: 'Na desnu stranu' },
];

function displaySrc(src: string) {
  return src.startsWith('https://vespera.hr/') || src.startsWith('https://www.vespera.hr/')
    ? `/api/visualizer/product-image?src=${encodeURIComponent(src)}`
    : src;
}

export function RoomVisualizer({ products }: { products: CatalogProduct[] }) {
  const usableProducts = useMemo(() => products.filter((product) => product.image), [products]);
  const [room, setRoom] = useState('Dnevni boravak');
  const roomProducts = useMemo(() => usableProducts.filter((product) => product.room === room), [room, usableProducts]);
  const selectableProducts = roomProducts.length ? roomProducts : usableProducts;
  const [productSlug, setProductSlug] = useState(usableProducts[0]?.slug ?? '');
  const product = usableProducts.find((item) => item.slug === productSlug) ?? selectableProducts[0];
  const [placement, setPlacement] = useState('replace');
  const [roomFile, setRoomFile] = useState<File | null>(null);
  const [roomPreview, setRoomPreview] = useState('');
  const [resultUrl, setResultUrl] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'generating' | 'done'>('idle');
  const [error, setError] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => {
    if (roomPreview) URL.revokeObjectURL(roomPreview);
  }, [roomPreview]);

  useEffect(() => () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
  }, [resultUrl]);

  function chooseRoom(value: string) {
    setRoom(value);
    const firstMatch = usableProducts.find((item) => item.room === value);
    if (firstMatch) setProductSlug(firstMatch.slug);
    setResultUrl('');
    setStatus('idle');
  }

  function handleFile(file?: File) {
    setError('');
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Odaberite JPG, PNG ili WebP fotografiju.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Fotografija može imati najviše 10 MB.');
      return;
    }
    if (roomPreview) URL.revokeObjectURL(roomPreview);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setRoomFile(file);
    setRoomPreview(URL.createObjectURL(file));
    setResultUrl('');
    setStatus('idle');
  }

  async function generateVisualization() {
    if (!roomFile || !product || !consent || status === 'generating') return;
    setError('');
    setStatus('generating');
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl('');

    const formData = new FormData();
    formData.set('room', roomFile);
    formData.set('productSlug', product.slug);
    formData.set('placement', placement);

    try {
      const response = await fetch('/api/visualizer/generate', { method: 'POST', body: formData });
      if (!response.ok) {
        const payload = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(payload?.error || 'Vizualizaciju trenutačno nije moguće izraditi.');
      }
      const url = URL.createObjectURL(await response.blob());
      setResultUrl(url);
      setStatus('done');
      window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    } catch (generationError) {
      setStatus('idle');
      setError(generationError instanceof Error ? generationError.message : 'Vizualizaciju trenutačno nije moguće izraditi.');
    }
  }

  function downloadResult() {
    if (!resultUrl || !product) return;
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `vespera-${product.slug}-ai-vizualizacija.png`;
    link.click();
  }

  const summary = `Vespera AI vizualizacija\nProstor: ${room}\nProizvod: ${product?.name ?? 'nije odabran'}\nPozicija: ${placements.find((item) => item.value === placement)?.label ?? placement}\n\nNapomena: AI prikaz je inspirativan. Mjere, izvedbu, boju, cijenu i dostupnost potvrđuje Vespera.`;
  const mailHref = `mailto:namjestaj@vespera.hr?subject=${encodeURIComponent('Upit uz Vespera AI vizualizaciju')}&body=${encodeURIComponent(summary)}`;
  const canGenerate = Boolean(roomFile && product && consent && status !== 'generating');

  return <div className="ai-room-visualizer">
    <div className="ai-visualizer-form">
      <div className="ai-visualizer-intro"><WandSparkles aria-hidden="true" /><div><strong>AI spaja dvije fotografije</strong><p>Vaš prostor ostaje osnova, a odabrani Vespera proizvod uklapa se s novom perspektivom, svjetlom i sjenama.</p></div></div>

      <fieldset><legend><span>1</span> Odaberite prostor</legend><div className="visual-choice-grid">{rooms.map((value) => <button type="button" key={value} className={room === value ? 'is-selected' : ''} aria-pressed={room === value} onClick={() => chooseRoom(value)}>{value}</button>)}</div></fieldset>

      <fieldset><legend><span>2</span> Dodajte čistu fotografiju</legend><label className={`ai-photo-upload${roomPreview ? ' has-photo' : ''}`}><ImagePlus aria-hidden="true" /><span><strong>{roomFile?.name || 'Fotografirajte ili učitajte prostor'}</strong><small>Najbolji rezultat: dnevno svjetlo, bez ljudi i što manje stvari ispred mjesta za namještaj.</small></span><input type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={(event) => handleFile(event.target.files?.[0])} /></label>{roomPreview && <div className="ai-upload-preview"><Image src={roomPreview} alt="Odabrana fotografija prostorije" fill sizes="360px" unoptimized /><span><Check aria-hidden="true" /> Fotografija je spremna</span></div>}</fieldset>

      <fieldset><legend><span>3</span> Odaberite proizvod i mjesto</legend><label htmlFor="ai-product"><strong>Vespera proizvod</strong></label><select id="ai-product" value={product?.slug ?? ''} disabled={!selectableProducts.length} onChange={(event) => { setProductSlug(event.target.value); setResultUrl(''); setStatus('idle'); }}>{selectableProducts.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select>{product && <div className="visual-product-summary"><Image src={displaySrc(product.image)} alt="" width={176} height={128} unoptimized /><span><strong>{product.name}</strong><small>{product.type} · {product.room}</small></span></div>}<label htmlFor="ai-placement"><strong>Gdje želite proizvod?</strong></label><select id="ai-placement" value={placement} onChange={(event) => setPlacement(event.target.value)}>{placements.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></fieldset>

      <div className="ai-consent"><input id="ai-consent" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><label htmlFor="ai-consent"><strong>Dopuštam jednokratnu AI obradu fotografije.</strong><small>Fotografija se šalje pružatelju AI usluge samo radi izrade prikaza. Vespera je ne sprema u katalog ili admin.</small></label></div>
      {error && <p className="visual-error" role="alert">{error}</p>}
      <button className="button button-accent ai-generate-button" type="button" disabled={!canGenerate} onClick={generateVisualization}><Sparkles aria-hidden="true" /> {status === 'generating' ? 'AI priprema vaš prostor…' : resultUrl ? 'Izradite novu verziju' : 'Izradite AI vizualizaciju'}</button>
      <p className="ai-generation-note">Izrada obično traje do jedne minute. Dostupne su najviše 3 vizualizacije dnevno po korisniku.</p>
    </div>

    <div className="ai-visualizer-result" ref={resultRef} aria-live="polite">
      {status === 'generating' && <div className="ai-generating"><Sparkles aria-hidden="true" /><strong>Uklapamo proizvod u vaš prostor.</strong><span>AI usklađuje perspektivu, osvjetljenje i sjene. Ostavite ovu stranicu otvorenom.</span><div aria-hidden="true"><i /><i /><i /></div></div>}

      {status !== 'generating' && resultUrl && roomPreview && <><div className="ai-comparison"><figure><div><Image src={roomPreview} alt="Prostor prije AI obrade" fill sizes="(max-width: 920px) 100vw, 30vw" unoptimized /></div><figcaption>Prije</figcaption></figure><figure><div><Image src={resultUrl} alt={`AI prikaz proizvoda ${product?.name ?? ''} u prostoru`} fill sizes="(max-width: 920px) 100vw, 30vw" unoptimized /></div><figcaption><Sparkles aria-hidden="true" /> AI prijedlog</figcaption></figure></div><div className="ai-result-summary"><Check aria-hidden="true" /><div><strong>Vizualizacija je spremna</strong><span>{product?.name} · inspirativni prikaz</span></div></div><div className="visualizer-actions"><button className="button button-light" type="button" onClick={downloadResult}><Download aria-hidden="true" /> Preuzmite prikaz</button><a className="button button-accent" href={mailHref}><Mail aria-hidden="true" /> Pošaljite upit</a><button className="button button-ghost" type="button" onClick={generateVisualization}><RefreshCw aria-hidden="true" /> Druga verzija</button></div></>}

      {status === 'idle' && !resultUrl && <div className="ai-result-placeholder"><Upload aria-hidden="true" /><p className="eyebrow">Ovdje će se pojaviti rezultat</p><h3>Jedna fotografija. Jedan odabrani proizvod. Realističniji prijedlog.</h3><p>AI neće lijepiti cijelu katalošku fotografiju preko vašeg prostora. Iz nje će prepoznati proizvod i pokušati ga prirodno uklopiti u prostoriju.</p><ol><li><span>01</span>Fotografirajte prostor bez ljudi.</li><li><span>02</span>Odaberite proizvod i približno mjesto.</li><li><span>03</span>Pričekajte AI prijedlog.</li></ol></div>}

      <p className="visualizer-disclaimer">AI rezultat je inspirativan i može odstupati u detaljima proizvoda, boji i proporcijama. Ne potvrđuje da proizvod stane u prostor. Konačne mjere, izvedbu, cijenu i dostupnost potvrđuje Vesperin savjetnik.</p>
    </div>
  </div>;
}
