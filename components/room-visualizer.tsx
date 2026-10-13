'use client';

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import NextImage from 'next/image';
import { Check, Download, Eye, EyeOff, ImagePlus, Mail, Move, RotateCcw } from 'lucide-react';
import type { CatalogProduct } from '@/lib/products';

const rooms = ['Dnevni boravak', 'Spavaća soba', 'Kuhinja'];
const roomImages: Record<string, string> = {
  'Dnevni boravak': 'https://vespera.hr/wp-content/uploads/2026/06/Soho_ambijent.jpg',
  'Spavaća soba': 'https://vespera.hr/wp-content/uploads/2026/08/crafterkrevet_4-1140x641.jpg',
  Kuhinja: 'https://vespera.hr/wp-content/uploads/2026/06/csm_inspiration_stage_laser_412_3bd5d5fd87.jpg',
};

function displaySrc(src: string) {
  return src.startsWith('https://vespera.hr/') || src.startsWith('https://www.vespera.hr/')
    ? `/api/visualizer/product-image?src=${encodeURIComponent(src)}`
    : src;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawCover(context: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const ratio = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * ratio;
  const drawHeight = image.naturalHeight * ratio;
  context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

export function RoomVisualizer({ products }: { products: CatalogProduct[] }) {
  const usableProducts = useMemo(() => products.filter((product) => product.image), [products]);
  const [room, setRoom] = useState('Dnevni boravak');
  const roomProducts = useMemo(() => usableProducts.filter((product) => product.room === room), [room, usableProducts]);
  const selectableProducts = roomProducts.length ? roomProducts : usableProducts;
  const [productSlug, setProductSlug] = useState(usableProducts[0]?.slug ?? '');
  const product = usableProducts.find((item) => item.slug === productSlug) ?? selectableProducts[0];
  const [scale, setScale] = useState(42);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 68 });
  const [blend, setBlend] = useState(true);
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [prepared, setPrepared] = useState(false);
  const [showBefore, setShowBefore] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number } | null>(null);

  useEffect(() => () => {
    if (previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  function chooseRoom(value: string) {
    setRoom(value);
    const firstMatch = usableProducts.find((item) => item.room === value);
    if (firstMatch) setProductSlug(firstMatch.slug);
    setPrepared(false);
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
    if (previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    setPrepared(false);
  }

  function prepare() {
    if (!product) {
      setError('Trenutačno nema proizvoda s fotografijom za prikaz.');
      return;
    }
    setPrepared(true);
    setShowBefore(false);
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  }

  function reset() {
    if (previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    setRoom('Dnevni boravak');
    setProductSlug(usableProducts[0]?.slug ?? '');
    setScale(42);
    setRotation(0);
    setPosition({ x: 50, y: 68 });
    setBlend(true);
    setFileName('');
    setPreviewUrl('');
    setError('');
    setPrepared(false);
    setShowBefore(false);
  }

  function updatePosition(clientX: number, clientY: number) {
    const bounds = canvasRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setPosition({
      x: Math.min(92, Math.max(8, ((clientX - bounds.left) / bounds.width) * 100)),
      y: Math.min(90, Math.max(18, ((clientY - bounds.top) / bounds.height) * 100)),
    });
  }

  function startDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    dragRef.current = { pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX, event.clientY);
  }

  function drag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (dragRef.current?.pointerId === event.pointerId) updatePosition(event.clientX, event.clientY);
  }

  function stopDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  }

  const roomSource = previewUrl || displaySrc(roomImages[room]);
  const productSource = product ? displaySrc(product.image) : '';
  const summary = `Vespera vizualni alat\nProstor: ${room}\nProizvod: ${product?.name ?? 'nije odabran'}\nFotografija: ${fileName || 'korišten je ogledni prostor'}\n\nNapomena: Prikaz je orijentacijska montaža. Mjere, boju, dostupnost, cijenu i mogućnost smještaja potvrđuje Vespera.`;
  const mailHref = `mailto:namjestaj@vespera.hr?subject=${encodeURIComponent('Upit iz Vespera vizualnog alata')}&body=${encodeURIComponent(summary)}`;

  async function downloadImage() {
    if (!product || downloading) return;
    setDownloading(true);
    setError('');
    try {
      const [roomImage, furnitureImage] = await Promise.all([loadImage(roomSource), loadImage(productSource)]);
      const canvas = document.createElement('canvas');
      canvas.width = 1600;
      canvas.height = 1200;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas nije dostupan.');
      drawCover(context, roomImage, canvas.width, canvas.height);
      const targetWidth = canvas.width * (scale / 100);
      const targetHeight = targetWidth * (furnitureImage.naturalHeight / furnitureImage.naturalWidth);
      const centerX = canvas.width * (position.x / 100);
      const centerY = canvas.height * (position.y / 100);
      context.save();
      context.translate(centerX, centerY);
      context.rotate((rotation * Math.PI) / 180);
      if (blend) context.globalCompositeOperation = 'multiply';
      context.drawImage(furnitureImage, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
      context.restore();
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.download = `vespera-${product.slug}-u-prostoru.jpg`;
      link.click();
    } catch {
      setError('Montažu trenutačno nije moguće preuzeti. Pokušajte s drugom fotografijom.');
    } finally {
      setDownloading(false);
    }
  }

  return <div className="room-visualizer">
    <div className="visualizer-controls">
      <fieldset><legend><span>1</span> Odaberite prostor</legend><div className="visual-choice-grid">{rooms.map((value) => <button type="button" key={value} className={room === value ? 'is-selected' : ''} aria-pressed={room === value} onClick={() => chooseRoom(value)}>{value}</button>)}</div></fieldset>
      <fieldset><legend><span>2</span> Fotografirajte ili učitajte prostor</legend><label className="visual-photo-input"><ImagePlus aria-hidden="true" /><span><strong>{fileName || 'Odaberite fotografiju prostora'}</strong><small>JPG, PNG ili WebP, najviše 10 MB</small></span><input type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={(event) => handleFile(event.target.files?.[0])} /></label><p className="visual-privacy">Fotografija ostaje na vašem uređaju i ne šalje se Vesperi.</p></fieldset>
      <fieldset><legend><span>3</span> Odaberite proizvod</legend><label htmlFor="visualizer-product"><strong>Proizvod iz aktualne ponude</strong></label><select id="visualizer-product" value={product?.slug ?? ''} disabled={!selectableProducts.length} onChange={(event) => { setProductSlug(event.target.value); setPrepared(false); }}>{selectableProducts.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select>{product && <div className="visual-product-summary"><NextImage src={productSource} alt="" width={176} height={128} unoptimized /><span><strong>{product.name}</strong><small>{product.type} · {product.room}</small></span></div>}<div className="visual-blend-toggle"><input id="visualizer-blend" type="checkbox" checked={blend} onChange={(event) => setBlend(event.target.checked)} /><label htmlFor="visualizer-blend"><strong>Prirodnije uklapanje</strong><small>Najbolje radi s fotografijama proizvoda na svijetloj pozadini.</small></label></div></fieldset>
      {error && <p className="visual-error" role="alert">{error}</p>}
      <button className="button button-accent visualizer-primary" type="button" onClick={prepare} disabled={!product}><Move aria-hidden="true" /> Postavite proizvod u prostor</button>
    </div>

    <div className="visualizer-result" ref={resultRef} aria-live="polite">
      <div className="visualizer-canvas" ref={canvasRef}>
        <NextImage className="visualizer-room-photo" src={roomSource} alt={previewUrl ? `Vaša fotografija prostora: ${fileName}` : `Ogledni prikaz: ${room}`} fill sizes="(max-width: 920px) 100vw, 58vw" unoptimized />
        {prepared && product && !showBefore && <button type="button" className={`visualized-product${blend ? ' is-blended' : ''}`} style={{ left: `${position.x}%`, top: `${position.y}%`, width: `${scale}%`, transform: `translate(-50%, -50%) rotate(${rotation}deg)` }} onPointerDown={startDrag} onPointerMove={drag} onPointerUp={stopDrag} onPointerCancel={stopDrag} aria-label="Pomaknite proizvod po fotografiji"><NextImage src={productSource} alt={product.name} width={1200} height={800} unoptimized draggable={false} /><span><Move aria-hidden="true" /> Povucite</span></button>}
        {!prepared && <div className="visualizer-empty"><ImagePlus aria-hidden="true" /><strong>Vaš prostor pojavit će se ovdje.</strong><span>Možete koristiti svoju fotografiju ili ogledni prostor.</span></div>}
        {prepared && !showBefore && <div className="visualizer-result-label"><Check aria-hidden="true" /><span><strong>Orijentacijska montaža</strong>{product?.name}</span></div>}
      </div>

      {prepared && <div className="visualizer-adjustments"><label><strong>Veličina</strong><input type="range" min="18" max="85" value={scale} onChange={(event) => setScale(Number(event.target.value))} aria-label="Veličina proizvoda" /><output>{scale}%</output></label><label><strong>Visina</strong><input type="range" min="18" max="90" value={position.y} onChange={(event) => setPosition((current) => ({ ...current, y: Number(event.target.value) }))} aria-label="Visina proizvoda" /><output>{Math.round(position.y)}%</output></label><label><strong>Nagib</strong><input type="range" min="-12" max="12" value={rotation} onChange={(event) => setRotation(Number(event.target.value))} aria-label="Nagib proizvoda" /><output>{rotation}°</output></label><button className="visualizer-before-button" type="button" onClick={() => setShowBefore((value) => !value)}>{showBefore ? <Eye aria-hidden="true" /> : <EyeOff aria-hidden="true" />}{showBefore ? 'Prikaži poslije' : 'Prikaži prije'}</button></div>}

      {prepared && <div className="visualizer-actions"><button className="button button-light" type="button" onClick={downloadImage} disabled={downloading}><Download aria-hidden="true" /> {downloading ? 'Pripremamo…' : 'Preuzmite montažu'}</button><a className="button button-accent" href={mailHref}><Mail aria-hidden="true" /> Pošaljite upit</a><button className="button button-ghost" type="button" onClick={reset}><RotateCcw aria-hidden="true" /> Počnite ispočetka</button></div>}
      <p className="visualizer-disclaimer">Prikaz je orijentacijska fotomontaža, a ne završna AI vizualizacija, ponuda ili potvrda da proizvod stane u prostor. Proporcije i boje mogu odstupati. Konačne mjere, izvedbu, cijenu i dostupnost potvrđuje Vesperin savjetnik.</p>
    </div>
  </div>;
}
