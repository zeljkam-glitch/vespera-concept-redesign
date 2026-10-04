'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Check, Download, ImagePlus, Mail, MoveHorizontal, Palette, RotateCcw, Sofa } from 'lucide-react';

const rooms = ['Dnevni boravak', 'Spavaća soba', 'Kuhinja'];
const furniture = ['Kutna garnitura', 'Krevet', 'Kuhinja po mjeri', 'Stol i stolice'];
const styles = ['Topao i prirodan', 'Svijetao i miran', 'Taman i elegantan', 'Klasičan i ugodan'];
const palettes = [
  { name: 'Pijesak', color: '#c8ad8b' },
  { name: 'Maslina', color: '#7d8060' },
  { name: 'Terakota', color: '#a9674d' },
  { name: 'Antracit', color: '#4b4b49' },
  { name: 'Topla bijela', color: '#e9e4d8' },
];

const roomImages: Record<string, string> = {
  'Dnevni boravak': 'https://vespera.hr/wp-content/uploads/2026/06/Soho_ambijent.jpg',
  'Spavaća soba': 'https://vespera.hr/wp-content/uploads/2026/08/crafterkrevet_4-1140x641.jpg',
  Kuhinja: 'https://vespera.hr/wp-content/uploads/2026/06/csm_inspiration_stage_laser_412_3bd5d5fd87.jpg',
};

export function RoomVisualizer() {
  const [room, setRoom] = useState('Dnevni boravak');
  const [item, setItem] = useState('Kutna garnitura');
  const [style, setStyle] = useState('Topao i prirodan');
  const [palette, setPalette] = useState(palettes[0]);
  const [scale, setScale] = useState(68);
  const [position, setPosition] = useState('center');
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [prepared, setPrepared] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => {
    if (previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  function chooseRoom(value: string) {
    setRoom(value);
    if (value === 'Spavaća soba') setItem('Krevet');
    if (value === 'Kuhinja') setItem('Kuhinja po mjeri');
    if (value === 'Dnevni boravak' && !['Kutna garnitura', 'Stol i stolice'].includes(item)) setItem('Kutna garnitura');
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
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    setPrepared(false);
  }

  function prepare() {
    setPrepared(true);
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  }

  function reset() {
    setRoom('Dnevni boravak');
    setItem('Kutna garnitura');
    setStyle('Topao i prirodan');
    setPalette(palettes[0]);
    setScale(68);
    setPosition('center');
    setFileName('');
    setPreviewUrl('');
    setError('');
    setPrepared(false);
  }

  const summary = `Vespera vizualni planer\nProstor: ${room}\nŽeljeni namještaj: ${item}\nStil: ${style}\nPaleta: ${palette.name}\nVeličina u prikazu: ${scale}%\nPozicija: ${position === 'left' ? 'lijevo' : position === 'right' ? 'desno' : 'sredina'}\nFotografija: ${fileName || 'korišten je ogledni prostor'}\n\nNapomena: Ovo je priprema ideje. Konačne mjere, materijale, cijenu i 3D prijedlog potvrđuje Vespera.`;
  const mailHref = `mailto:namjestaj@vespera.hr?subject=${encodeURIComponent('Upit iz Vespera vizualnog planera')}&body=${encodeURIComponent(summary)}`;

  function downloadSummary() {
    const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vespera-vizualni-plan.txt';
    link.click();
    URL.revokeObjectURL(url);
  }

  return <div className="room-visualizer">
    <div className="visualizer-controls">
      <fieldset><legend><span>1</span> Odaberite prostor</legend><div className="visual-choice-grid">{rooms.map((value) => <button type="button" key={value} className={room === value ? 'is-selected' : ''} aria-pressed={room === value} onClick={() => chooseRoom(value)}>{value}</button>)}</div></fieldset>
      <fieldset><legend><span>2</span> Dodajte fotografiju</legend><label className="visual-photo-input"><ImagePlus aria-hidden="true" /><span><strong>{fileName || 'Odaberite fotografiju prostora'}</strong><small>JPG, PNG ili WebP, najviše 10 MB</small></span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => handleFile(event.target.files?.[0])} /></label>{error && <p className="visual-error" role="alert">{error}</p>}<p className="visual-privacy">Fotografija se prikazuje samo u vašem pregledniku i u ovom prototipu se ne šalje na poslužitelj.</p></fieldset>
      <fieldset><legend><span>3</span> Odaberite smjer</legend><label><strong>Što želite vizualizirati?</strong><select value={item} onChange={(event) => { setItem(event.target.value); setPrepared(false); }}>{furniture.map((value) => <option key={value}>{value}</option>)}</select></label><label><strong>Stil</strong><select value={style} onChange={(event) => { setStyle(event.target.value); setPrepared(false); }}>{styles.map((value) => <option key={value}>{value}</option>)}</select></label><div><strong>Paleta boja</strong><div className="palette-options">{palettes.map((value) => <button type="button" key={value.name} className={palette.name === value.name ? 'is-selected' : ''} aria-label={value.name} aria-pressed={palette.name === value.name} onClick={() => { setPalette(value); setPrepared(false); }}><span style={{ background: value.color }} aria-hidden="true" />{value.name}</button>)}</div></div></fieldset>
      <button className="button button-accent visualizer-primary" type="button" onClick={prepare}><Palette aria-hidden="true" /> Prikažite ideju u prostoru</button>
    </div>

    <div className="visualizer-result" ref={resultRef} aria-live="polite">
      <div className="visualizer-canvas">
        <Image src={previewUrl || roomImages[room]} alt={previewUrl ? `Vaša fotografija prostora: ${fileName}` : `Ogledni prikaz: ${room}`} fill sizes="(max-width: 920px) 100vw, 58vw" unoptimized />
        <div className="visualizer-tone" style={{ background: palette.color }} aria-hidden="true" />
        {prepared && <div className={`furniture-outline furniture-${item === 'Krevet' ? 'bed' : item === 'Kuhinja po mjeri' ? 'kitchen' : item === 'Stol i stolice' ? 'table' : 'sofa'} position-${position}`} style={{ width: `${scale}%`, borderColor: palette.color }} aria-hidden="true"><span>{item}</span></div>}
        {!prepared && <div className="visualizer-empty"><Sofa aria-hidden="true" /><strong>Vaš prostor pojavit će se ovdje.</strong><span>Odaberite postavke i pritisnite „Prikažite ideju u prostoru”.</span></div>}
        {prepared && <div className="visualizer-result-label"><Check aria-hidden="true" /><span><strong>Pripremljen smjer</strong>{style} · {palette.name}</span></div>}
      </div>

      <div className="visualizer-adjustments"><label><MoveHorizontal aria-hidden="true" /><span><strong>Veličina prikaza</strong><input type="range" min="40" max="90" value={scale} onChange={(event) => setScale(Number(event.target.value))} aria-label="Veličina prikaza namještaja" /></span><output>{scale}%</output></label><fieldset className="position-controls"><legend className="sr-only">Pozicija namještaja</legend><button type="button" className={position === 'left' ? 'is-selected' : ''} onClick={() => setPosition('left')}>Lijevo</button><button type="button" className={position === 'center' ? 'is-selected' : ''} onClick={() => setPosition('center')}>Sredina</button><button type="button" className={position === 'right' ? 'is-selected' : ''} onClick={() => setPosition('right')}>Desno</button></fieldset></div>

      {prepared && <div className="visualizer-actions"><button className="button button-light" type="button" onClick={downloadSummary}><Download aria-hidden="true" /> Preuzmite sažetak</button><a className="button button-accent" href={mailHref}><Mail aria-hidden="true" /> Pošaljite upit e-mailom</a><button className="button button-ghost" type="button" onClick={reset}><RotateCcw aria-hidden="true" /> Počnite ispočetka</button></div>}
      <p className="visualizer-disclaimer">Prikaz je orijentacijska skica, ne fotografija stvarnog proizvoda, ponuda ili konačan 3D projekt. Veličina na slici ne potvrđuje da će proizvod stati, a boja nije vjeran uzorak materijala. Mjere, izvedbu, cijenu i dostupnost potvrđuje savjetnik.</p>
    </div>
  </div>;
}
