'use client';

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  DoorOpen,
  Download,
  Droplets,
  Flame,
  Grid2X2,
  Mail,
  Move,
  PlugZap,
  Printer,
  RotateCw,
  Ruler,
  Save,
  Trash2,
  Warehouse,
  Wind,
} from 'lucide-react';
import styles from './kitchen-planner.module.css';

type Wall = 'Gornji zid' | 'Desni zid' | 'Donji zid' | 'Lijevi zid';
type FixtureType = 'Vrata' | 'Prozor' | 'Voda' | 'Struja' | 'Plin' | 'Radijator' | 'Ventilacija';
type ModuleKind = 'base40' | 'base60' | 'base80' | 'sink60' | 'hob60' | 'dishwasher60' | 'fridge60' | 'tall60' | 'corner90';

type Fixture = {
  id: string;
  type: FixtureType;
  wall: Wall;
  position: number;
  width: number;
};

type PlannerModule = {
  id: string;
  kind: ModuleKind;
  label: string;
  shortLabel: string;
  width: number;
  depth: number;
  x: number;
  y: number;
  rotation: 0 | 90;
};

type SavedPlan = {
  roomWidth: number;
  roomLength: number;
  roomHeight: number;
  fixtures: Fixture[];
  modules: PlannerModule[];
  styleChoice: string;
  budget: string;
  needs: string[];
  notes: string;
};

const STORAGE_KEY = 'vespera-kitchen-planner-v1';
const walls: Wall[] = ['Gornji zid', 'Desni zid', 'Donji zid', 'Lijevi zid'];
const fixtureTypes: FixtureType[] = ['Vrata', 'Prozor', 'Voda', 'Struja', 'Plin', 'Radijator', 'Ventilacija'];
const needsOptions = ['Više prostora za odlaganje', 'Pećnica na ugodnoj visini', 'Jednostavno održavanje', 'Prostor za sjedenje', 'Lakše kretanje', 'Mjesto za perilicu posuđa'];

const moduleCatalog: Array<Omit<PlannerModule, 'id' | 'x' | 'y' | 'rotation'>> = [
  { kind: 'base40', label: 'Donji ormarić 40 cm', shortLabel: 'Ormarić 40', width: 40, depth: 60 },
  { kind: 'base60', label: 'Donji ormarić 60 cm', shortLabel: 'Ormarić 60', width: 60, depth: 60 },
  { kind: 'base80', label: 'Donji ormarić 80 cm', shortLabel: 'Ormarić 80', width: 80, depth: 60 },
  { kind: 'sink60', label: 'Element sa sudoperom 60 cm', shortLabel: 'Sudoper', width: 60, depth: 60 },
  { kind: 'hob60', label: 'Element s pločom za kuhanje 60 cm', shortLabel: 'Ploča', width: 60, depth: 60 },
  { kind: 'dishwasher60', label: 'Perilica posuđa 60 cm', shortLabel: 'Perilica', width: 60, depth: 60 },
  { kind: 'fridge60', label: 'Hladnjak 60 cm', shortLabel: 'Hladnjak', width: 60, depth: 65 },
  { kind: 'tall60', label: 'Visoki element 60 cm', shortLabel: 'Visoki', width: 60, depth: 60 },
  { kind: 'corner90', label: 'Kutni element 90 cm', shortLabel: 'Kutni 90', width: 90, depth: 90 },
];

const fixtureIcons: Record<FixtureType, typeof DoorOpen> = {
  Vrata: DoorOpen,
  Prozor: Warehouse,
  Voda: Droplets,
  Struja: PlugZap,
  Plin: Flame,
  Radijator: Wind,
  Ventilacija: Wind,
};

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function actualSize(item: PlannerModule) {
  return item.rotation === 0
    ? { width: item.width, depth: item.depth }
    : { width: item.depth, depth: item.width };
}

function overlaps(a: PlannerModule, b: PlannerModule) {
  const as = actualSize(a);
  const bs = actualSize(b);
  return a.x < b.x + bs.width && a.x + as.width > b.x && a.y < b.y + bs.depth && a.y + as.depth > b.y;
}

function makeModule(kind: ModuleKind, x: number, y: number, rotation: 0 | 90 = 0): PlannerModule {
  const source = moduleCatalog.find((entry) => entry.kind === kind) ?? moduleCatalog[1];
  return { ...source, id: uid('module'), x, y, rotation };
}

export function KitchenPlanner() {
  const [step, setStep] = useState(1);
  const [roomWidth, setRoomWidth] = useState(320);
  const [roomLength, setRoomLength] = useState(280);
  const [roomHeight, setRoomHeight] = useState(255);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [fixtureType, setFixtureType] = useState<FixtureType>('Vrata');
  const [fixtureWall, setFixtureWall] = useState<Wall>('Gornji zid');
  const [fixturePosition, setFixturePosition] = useState(40);
  const [fixtureWidth, setFixtureWidth] = useState(90);
  const [modules, setModules] = useState<PlannerModule[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [styleChoice, setStyleChoice] = useState('Topla bijela i drvo');
  const [budget, setBudget] = useState('Još ne znam');
  const [needs, setNeeds] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string; startClientX: number; startClientY: number; startX: number; startY: number } | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const plan = JSON.parse(stored) as Partial<SavedPlan>;
        if (plan.roomWidth) setRoomWidth(plan.roomWidth);
        if (plan.roomLength) setRoomLength(plan.roomLength);
        if (plan.roomHeight) setRoomHeight(plan.roomHeight);
        if (Array.isArray(plan.fixtures)) setFixtures(plan.fixtures);
        if (Array.isArray(plan.modules)) setModules(plan.modules);
        if (plan.styleChoice) setStyleChoice(plan.styleChoice);
        if (plan.budget) setBudget(plan.budget);
        if (Array.isArray(plan.needs)) setNeeds(plan.needs);
        if (typeof plan.notes === 'string') setNotes(plan.notes);
        setSavedMessage('Vraćen je nacrt spremljen na ovom uređaju.');
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const plan: SavedPlan = { roomWidth, roomLength, roomHeight, fixtures, modules, styleChoice, budget, needs, notes };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  }, [hydrated, roomWidth, roomLength, roomHeight, fixtures, modules, styleChoice, budget, needs, notes]);

  const selected = modules.find((item) => item.id === selectedId);

  const collisions = useMemo(() => {
    const ids = new Set<string>();
    modules.forEach((item, index) => {
      modules.slice(index + 1).forEach((other) => {
        if (overlaps(item, other)) {
          ids.add(item.id);
          ids.add(other.id);
        }
      });
    });
    return ids;
  }, [modules]);

  const warnings = useMemo(() => {
    const messages: string[] = [];
    if (collisions.size > 0) messages.push('Neki elementi se preklapaju. Pomaknite elemente označene crvenom bojom.');
    const sink = modules.find((item) => item.kind === 'sink60');
    const water = fixtures.find((item) => item.type === 'Voda');
    if (sink && !water) messages.push('Dodali ste sudoper, ali još niste označili priključak vode.');
    if (modules.length === 0) messages.push('Dodajte barem jedan kuhinjski element.');
    if (roomWidth < 180 || roomLength < 180) messages.push('Provjerite mjere prostorije. Jedna je stranica manja od 180 cm.');
    return messages;
  }, [collisions, fixtures, modules, roomLength, roomWidth]);

  function updateRoomDimension(setter: (value: number) => void, value: string) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) setter(clamp(parsed, 120, 900));
  }

  function addFixture() {
    const wallLength = fixtureWall === 'Gornji zid' || fixtureWall === 'Donji zid' ? roomWidth : roomLength;
    setFixtures((current) => [...current, {
      id: uid('fixture'),
      type: fixtureType,
      wall: fixtureWall,
      position: clamp(fixturePosition, 0, wallLength - 10),
      width: clamp(fixtureWidth, 10, wallLength),
    }]);
    setSavedMessage(`${fixtureType} je dodan na nacrt.`);
  }

  function addModule(kind: ModuleKind) {
    const source = moduleCatalog.find((entry) => entry.kind === kind) ?? moduleCatalog[1];
    const offset = (modules.length * 18) % Math.max(30, roomWidth - source.width);
    const item = makeModule(kind, clamp(15 + offset, 0, roomWidth - source.width), clamp(15 + offset / 2, 0, roomLength - source.depth));
    setModules((current) => [...current, item]);
    setSelectedId(item.id);
    setSavedMessage(`${source.shortLabel} je dodan. Sada ga možete pomaknuti na nacrtu.`);
  }

  function applyPreset(preset: 'line' | 'l' | 'u') {
    const topY = 6;
    const leftX = 6;
    const rightX = Math.max(6, roomWidth - 66);
    const initial: PlannerModule[] = [
      makeModule('fridge60', 8, topY),
      makeModule('base60', 72, topY),
      makeModule('sink60', 136, topY),
      makeModule('dishwasher60', 200, topY),
      makeModule('hob60', 264, topY),
    ].map((item) => ({ ...item, x: clamp(item.x, 0, roomWidth - actualSize(item).width), y: clamp(item.y, 0, roomLength - actualSize(item).depth) }));

    if (preset !== 'line') {
      initial.push(makeModule('base60', leftX, 76, 90), makeModule('tall60', leftX, 140, 90));
    }
    if (preset === 'u') {
      initial.push(makeModule('base60', rightX, 76, 90), makeModule('base80', Math.max(6, roomWidth - 66), 140, 90));
    }
    setModules(initial);
    setSelectedId(initial[0]?.id ?? '');
    setSavedMessage('Početni raspored je postavljen. Prilagodite ga svojim mjerama.');
  }

  function updateModule(id: string, transform: (item: PlannerModule) => PlannerModule) {
    setModules((current) => current.map((item) => item.id === id ? transform(item) : item));
  }

  function moveSelected(dx: number, dy: number) {
    if (!selected) return;
    updateModule(selected.id, (item) => {
      const size = actualSize(item);
      return { ...item, x: clamp(item.x + dx, 0, roomWidth - size.width), y: clamp(item.y + dy, 0, roomLength - size.depth) };
    });
  }

  function rotateSelected() {
    if (!selected) return;
    updateModule(selected.id, (item) => {
      const rotation = item.rotation === 0 ? 90 : 0;
      const rotated = { ...item, rotation } as PlannerModule;
      const size = actualSize(rotated);
      return { ...rotated, x: clamp(item.x, 0, roomWidth - size.width), y: clamp(item.y, 0, roomLength - size.depth) };
    });
  }

  function removeSelected() {
    if (!selected) return;
    setModules((current) => current.filter((item) => item.id !== selected.id));
    setSelectedId('');
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLButtonElement>, item: PlannerModule) {
    if (!canvasRef.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedId(item.id);
    dragRef.current = { id: item.id, startClientX: event.clientX, startClientY: event.clientY, startX: item.x, startY: item.y };
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    const canvas = canvasRef.current;
    if (!drag || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    updateModule(drag.id, (item) => {
      const size = actualSize(item);
      const x = drag.startX + ((event.clientX - drag.startClientX) / rect.width) * roomWidth;
      const y = drag.startY + ((event.clientY - drag.startClientY) / rect.height) * roomLength;
      return { ...item, x: Math.round(clamp(x, 0, roomWidth - size.width)), y: Math.round(clamp(y, 0, roomLength - size.depth)) };
    });
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
  }

  function toggleNeed(value: string) {
    setNeeds((current) => current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value]);
  }

  function savePlan() {
    const plan: SavedPlan = { roomWidth, roomLength, roomHeight, fixtures, modules, styleChoice, budget, needs, notes };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    setSavedMessage('Nacrt je spremljen na ovom uređaju. Možete mu se vratiti kasnije.');
  }

  function resetPlan() {
    if (!window.confirm('Želite li izbrisati cijeli nacrt i početi ispočetka?')) return;
    setRoomWidth(320);
    setRoomLength(280);
    setRoomHeight(255);
    setFixtures([]);
    setModules([]);
    setSelectedId('');
    setStyleChoice('Topla bijela i drvo');
    setBudget('Još ne znam');
    setNeeds([]);
    setNotes('');
    setStep(1);
    window.localStorage.removeItem(STORAGE_KEY);
    setSavedMessage('Nacrt je izbrisan.');
  }

  const summary = useMemo(() => {
    const fixtureSummary = fixtures.length ? fixtures.map((item) => `${item.type}: ${item.wall}, ${item.position} cm od početka zida, širina ${item.width} cm`).join('\n') : 'Nisu uneseni.';
    const moduleSummary = modules.length ? modules.map((item) => `${item.label}, pozicija ${Math.round(item.x)} × ${Math.round(item.y)} cm`).join('\n') : 'Nisu dodani.';
    return `VESPERA PLANER KUHINJE\n\nKontakt: ${contactName || 'nije unesen'}\nTelefon: ${contactPhone || 'nije unesen'}\nE-mail: ${contactEmail || 'nije unesen'}\n\nPROSTORIJA\n${roomWidth} × ${roomLength} cm, visina ${roomHeight} cm\n\nOTVORI I PRIKLJUČCI\n${fixtureSummary}\n\nELEMENTI\n${moduleSummary}\n\nSTIL I POTREBE\nStil: ${styleChoice}\nBudžet: ${budget}\nPotrebe: ${needs.join(', ') || 'nisu označene'}\nNapomena: ${notes || 'nema dodatne napomene'}\n\nOvaj nacrt je orijentacijski. Konačne mjere, izvedbu, materijale, cijenu i rok potvrđuje Vespera nakon stručne provjere.`;
  }, [budget, contactEmail, contactName, contactPhone, fixtures, modules, needs, notes, roomHeight, roomLength, roomWidth, styleChoice]);

  const mailHref = `mailto:namjestaj@vespera.hr?subject=${encodeURIComponent('Nacrt kuhinje iz Vespera planera')}&body=${encodeURIComponent(summary)}`;

  function downloadPlan() {
    const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vespera-nacrt-kuhinje.txt';
    link.click();
    URL.revokeObjectURL(url);
  }

  function fixtureStyle(item: Fixture) {
    const isHorizontal = item.wall === 'Gornji zid' || item.wall === 'Donji zid';
    const wallLength = isHorizontal ? roomWidth : roomLength;
    const start = clamp((item.position / wallLength) * 100, 0, 96);
    const size = clamp((item.width / wallLength) * 100, 3, 100 - start);
    if (item.wall === 'Gornji zid') return { left: `${start}%`, width: `${size}%`, top: 0 };
    if (item.wall === 'Donji zid') return { left: `${start}%`, width: `${size}%`, bottom: 0 };
    if (item.wall === 'Lijevi zid') return { top: `${start}%`, height: `${size}%`, left: 0 };
    return { top: `${start}%`, height: `${size}%`, right: 0 };
  }

  return (
    <div className={styles.planner}>
      <div className={styles.progress} aria-label="Koraci planiranja">
        {[['1', 'Prostor'], ['2', 'Otvori i priključci'], ['3', 'Stil i potrebe'], ['4', 'Složite elemente']].map(([number, label]) => (
          <button key={number} type="button" className={step === Number(number) ? styles.activeStep : ''} aria-current={step === Number(number) ? 'step' : undefined} onClick={() => setStep(Number(number))}>
            <span>{number}</span>{label}
          </button>
        ))}
      </div>

      <div className={styles.layout}>
        <aside className={styles.controls} aria-label={`Korak ${step} od 4`}>
          {step === 1 && (
            <section>
              <p className={styles.eyebrow}>Korak 1 od 4</p>
              <h2>Unesite mjere prostora</h2>
              <p>Mjerite od zida do zida. Za početni nacrt mjere ne moraju biti savršene.</p>
              <div className={styles.dimensionGrid}>
                <label><span>Širina</span><span className={styles.inputWithUnit}><input type="number" min="120" max="900" value={roomWidth} onChange={(event) => updateRoomDimension(setRoomWidth, event.target.value)} /><em>cm</em></span></label>
                <label><span>Duljina</span><span className={styles.inputWithUnit}><input type="number" min="120" max="900" value={roomLength} onChange={(event) => updateRoomDimension(setRoomLength, event.target.value)} /><em>cm</em></span></label>
                <label><span>Visina</span><span className={styles.inputWithUnit}><input type="number" min="180" max="500" value={roomHeight} onChange={(event) => updateRoomDimension(setRoomHeight, event.target.value)} /><em>cm</em></span></label>
              </div>
              <div className={styles.measureTip}><Ruler aria-hidden="true" /><span><strong>Što još treba izmjeriti?</strong>Visinu prozorske klupčice te udaljenost priključaka od kuta prostorije.</span></div>
            </section>
          )}

          {step === 2 && (
            <section>
              <p className={styles.eyebrow}>Korak 2 od 4</p>
              <h2>Označite što se ne može pomicati</h2>
              <p>Dodajte vrata, prozore i postojeće priključke. Položaj mjerite od lijevog ili gornjeg kuta zida.</p>
              <div className={styles.fixtureForm}>
                <label><span>Što dodajete?</span><select value={fixtureType} onChange={(event) => setFixtureType(event.target.value as FixtureType)}>{fixtureTypes.map((value) => <option key={value}>{value}</option>)}</select></label>
                <label><span>Na kojem zidu?</span><select value={fixtureWall} onChange={(event) => setFixtureWall(event.target.value as Wall)}>{walls.map((value) => <option key={value}>{value}</option>)}</select></label>
                <label><span>Udaljenost od kuta</span><span className={styles.inputWithUnit}><input type="number" min="0" value={fixturePosition} onChange={(event) => setFixturePosition(Number(event.target.value))} /><em>cm</em></span></label>
                <label><span>Širina</span><span className={styles.inputWithUnit}><input type="number" min="10" value={fixtureWidth} onChange={(event) => setFixtureWidth(Number(event.target.value))} /><em>cm</em></span></label>
                <button type="button" className="button button-accent" onClick={addFixture}>Dodajte na nacrt</button>
              </div>
              {fixtures.length > 0 && <ul className={styles.fixtureList}>{fixtures.map((item) => {
                const Icon = fixtureIcons[item.type];
                return <li key={item.id}><Icon aria-hidden="true" /><span><strong>{item.type}</strong>{item.wall}, {item.position} cm</span><button type="button" aria-label={`Ukloni: ${item.type}`} onClick={() => setFixtures((current) => current.filter((entry) => entry.id !== item.id))}><Trash2 aria-hidden="true" /></button></li>;
              })}</ul>}
            </section>
          )}

          {step === 3 && (
            <section>
              <p className={styles.eyebrow}>Korak 3 od 4</p>
              <h2>Kako želite koristiti kuhinju?</h2>
              <label className={styles.fullField}><span>Vizualni smjer</span><select value={styleChoice} onChange={(event) => setStyleChoice(event.target.value)}><option>Topla bijela i drvo</option><option>Svijetla i minimalistička</option><option>Tamna i elegantna</option><option>Klasična i ugodna</option><option>Još ne znam</option></select></label>
              <fieldset className={styles.needs}><legend>Što vam je važno?</legend>{needsOptions.map((value) => <label key={value}><input type="checkbox" checked={needs.includes(value)} onChange={() => toggleNeed(value)} /><span>{value}</span></label>)}</fieldset>
              <label className={styles.fullField}><span>Okvirni budžet</span><select value={budget} onChange={(event) => setBudget(event.target.value)}><option>Do 5.000 €</option><option>5.000 do 8.000 €</option><option>8.000 do 12.000 €</option><option>Više od 12.000 €</option><option>Još ne znam</option></select><small>Ovo nije ponuda. Budžet pomaže savjetniku predložiti realno rješenje.</small></label>
              <label className={styles.fullField}><span>Dodatna napomena</span><textarea rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Npr. često kuhamo u dvoje, želimo mnogo ladica..." /></label>
            </section>
          )}

          {step === 4 && (
            <section>
              <p className={styles.eyebrow}>Korak 4 od 4</p>
              <h2>Složite osnovni raspored</h2>
              <p>Odaberite gotov početak ili dodajte elemente pojedinačno. Element na nacrtu možete povući prstom ili mišem.</p>
              <div className={styles.presets} aria-label="Početni raspored"><button type="button" onClick={() => applyPreset('line')}>Ravna kuhinja</button><button type="button" onClick={() => applyPreset('l')}>L raspored</button><button type="button" onClick={() => applyPreset('u')}>U raspored</button></div>
              <div className={styles.catalog}>{moduleCatalog.map((item) => <button type="button" key={item.kind} onClick={() => addModule(item.kind)}><Grid2X2 aria-hidden="true" /><span><strong>{item.shortLabel}</strong>{item.width} × {item.depth} cm</span></button>)}</div>
            </section>
          )}

          <div className={styles.stepActions}>
            {step > 1 && <button type="button" className="button button-light" onClick={() => setStep((current) => current - 1)}>Prethodni korak</button>}
            {step < 4 && <button type="button" className="button button-accent" onClick={() => setStep((current) => current + 1)}>Nastavite</button>}
          </div>
        </aside>

        <section className={styles.workspace} aria-label="Nacrt kuhinje">
          <div className={styles.workspaceHead}>
            <div><p className={styles.eyebrow}>Vaš nacrt</p><h2>{roomWidth} × {roomLength} cm</h2></div>
            <button type="button" className={styles.saveButton} onClick={savePlan}><Save aria-hidden="true" /> Spremite nacrt</button>
          </div>

          <div className={styles.canvasWrap}>
            <span className={styles.widthMeasure}>{roomWidth} cm</span>
            <span className={styles.lengthMeasure}>{roomLength} cm</span>
            <div ref={canvasRef} className={styles.canvas} style={{ aspectRatio: `${roomWidth} / ${roomLength}` }}>
              <div className={styles.grid} aria-hidden="true" />
              {fixtures.map((item) => {
                const Icon = fixtureIcons[item.type];
                return <div key={item.id} className={`${styles.fixtureMarker} ${item.wall.includes('zid') ? '' : ''}`} style={fixtureStyle(item)} title={`${item.type}: ${item.wall}`}><Icon aria-hidden="true" /><span>{item.type}</span></div>;
              })}
              {modules.map((item) => {
                const size = actualSize(item);
                const isSelected = selectedId === item.id;
                return <button
                  type="button"
                  key={item.id}
                  className={`${styles.module} ${isSelected ? styles.selectedModule : ''} ${collisions.has(item.id) ? styles.collisionModule : ''}`}
                  style={{ left: `${(item.x / roomWidth) * 100}%`, top: `${(item.y / roomLength) * 100}%`, width: `${(size.width / roomWidth) * 100}%`, height: `${(size.depth / roomLength) * 100}%` }}
                  aria-label={`${item.label}, pozicija ${Math.round(item.x)} sa ${Math.round(item.y)} centimetara`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(item.id)}
                  onPointerDown={(event) => handlePointerDown(event, item)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                ><Move aria-hidden="true" /><span>{item.shortLabel}</span><small>{size.width} × {size.depth}</small></button>;
              })}
              {modules.length === 0 && <div className={styles.canvasEmpty}><Grid2X2 aria-hidden="true" /><strong>Nacrt je spreman.</strong><span>U četvrtom koraku dodajte kuhinjske elemente.</span><button type="button" onClick={() => setStep(4)}>Dodajte elemente</button></div>}
            </div>
          </div>

          {selected && <div className={styles.selectionControls}>
            <div><strong>{selected.label}</strong><span>Pozicija: {Math.round(selected.x)} × {Math.round(selected.y)} cm</span></div>
            <div className={styles.movePad} aria-label="Pomaknite odabrani element">
              <button type="button" aria-label="Pomakni gore za 10 centimetara" onClick={() => moveSelected(0, -10)}><ArrowUp /></button>
              <button type="button" aria-label="Pomakni lijevo za 10 centimetara" onClick={() => moveSelected(-10, 0)}><ArrowLeft /></button>
              <button type="button" aria-label="Pomakni dolje za 10 centimetara" onClick={() => moveSelected(0, 10)}><ArrowDown /></button>
              <button type="button" aria-label="Pomakni desno za 10 centimetara" onClick={() => moveSelected(10, 0)}><ArrowRight /></button>
            </div>
            <button type="button" onClick={rotateSelected}><RotateCw aria-hidden="true" /> Zakrenite</button>
            <button type="button" onClick={removeSelected}><Trash2 aria-hidden="true" /> Uklonite</button>
          </div>}

          <div className={warnings.length ? styles.warningBox : styles.readyBox} aria-live="polite">
            {warnings.length ? <AlertTriangle aria-hidden="true" /> : <Check aria-hidden="true" />}
            <div><strong>{warnings.length ? 'Provjerite prije slanja' : 'Nacrt je spreman za razgovor'}</strong>{warnings.length ? <ul>{warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul> : <p>Nema očitih preklapanja. Konačnu izvedivost ipak potvrđuje Vesperin savjetnik.</p>}</div>
          </div>

          {savedMessage && <p className={styles.savedMessage} role="status">{savedMessage}</p>}

          <div className={styles.contactCard}>
            <div><p className={styles.eyebrow}>Sačuvajte rezultat</p><h2>Pošaljite nacrt Vesperi</h2><p>Ostavite kontakt kako bi sažetak u e-mailu bio potpun. Ništa se ne šalje bez vašeg pritiska na gumb.</p></div>
            <div className={styles.contactFields}>
              <label><span>Ime i prezime</span><input type="text" value={contactName} onChange={(event) => setContactName(event.target.value)} autoComplete="name" /></label>
              <label><span>Telefon</span><input type="tel" value={contactPhone} onChange={(event) => setContactPhone(event.target.value)} autoComplete="tel" /></label>
              <label><span>E-mail</span><input type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} autoComplete="email" /></label>
            </div>
            <div className={styles.finalActions}>
              <a className="button button-accent" href={mailHref}><Mail aria-hidden="true" /> Pošaljite e-mail Vesperi</a>
              <button className="button button-light" type="button" onClick={() => window.print()}><Printer aria-hidden="true" /> Ispišite ili spremite PDF</button>
              <button className="button button-light" type="button" onClick={downloadPlan}><Download aria-hidden="true" /> Preuzmite sažetak</button>
              <button className={styles.resetButton} type="button" onClick={resetPlan}>Izbrišite nacrt</button>
            </div>
          </div>

          <div className={styles.printSummary}>
            <h1>Vespera nacrt kuhinje</h1>
            <pre>{summary}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}
