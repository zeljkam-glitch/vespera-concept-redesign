'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Armchair,
  BarChart3,
  Bell,
  Bookmark,
  BookOpen,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Copy,
  Database,
  FileText,
  GraduationCap,
  Images,
  LayoutList,
  Link2,
  Menu,
  MessageCircle,
  MessageSquareText,
  MousePointerClick,
  Send,
  Save,
  Share2,
  Settings,
  Sparkles,
  Target,
  Eye,
  X,
} from 'lucide-react';
import { activeGuideItem, contentPillars, contentPlan, furnitureExamples, publishingRules, toneRules, type ContentItem, type ContentStatus, type FurnitureExample } from '@/lib/content-os-data';
import { AdsMeasurement } from './ads-measurement';
import { TextSizeControl } from './text-size-control';
import styles from './content-os.module.css';

type View = 'dashboard' | 'create' | 'ideas' | 'plan' | 'library' | 'education' | 'approvals' | 'guidelines' | 'results' | 'ads' | 'settings';
type ActiveRole = 'Valentina' | 'Natalija';
type AnalyticsRecord = { reach: number; saves: number; shares: number; comments: number; clicks: number; inquiries: number; lesson: string };
type StoredState = { statuses: Record<string, ContentStatus>; checkedShots: Record<string, number[]>; analytics: Record<string, AnalyticsRecord> };
type SystemSettings = { defaultRole: ActiveRole; weeklyGoal: 2 | 3 | 4; approvalRequired: boolean; reminders: boolean; instagram: boolean; facebook: boolean };

const defaultSystemSettings: SystemSettings = { defaultRole: 'Valentina', weeklyGoal: 3, approvalRequired: true, reminders: true, instagram: true, facebook: true };

const navItems: { id: View; label: string; icon: typeof CalendarDays }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutList },
  { id: 'create', label: 'Kreiraj objavu', icon: Sparkles },
  { id: 'ideas', label: 'Ideje i inspiracija', icon: BookOpen },
  { id: 'plan', label: 'Plan 3 mjeseca', icon: CalendarDays },
  { id: 'library', label: 'Primjeri po namještaju', icon: Armchair },
  { id: 'education', label: 'Edukacija', icon: GraduationCap },
  { id: 'approvals', label: 'Odobrenja', icon: ClipboardCheck },
  { id: 'guidelines', label: 'Brend pravila', icon: FileText },
  { id: 'results', label: 'Rezultati', icon: BarChart3 },
  { id: 'ads', label: 'Oglasi i mjerenje', icon: MousePointerClick },
];

const stepMeta = [
  { label: 'Odaberi cilj', icon: Target },
  { label: 'Snimi materijal', icon: Camera },
  { label: 'Složi objavu', icon: MessageSquareText },
  { label: 'Pošalji na odobrenje', icon: Send },
  { label: 'Objavi i zabilježi', icon: BarChart3 },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat('hr-HR', { weekday: 'short', day: 'numeric', month: 'numeric' }).format(new Date(`${value}T12:00:00`));
}

function statusClass(status: ContentStatus) {
  return styles[`status${status.replaceAll(' ', '').replaceAll('Č', 'C').replaceAll('č', 'c')}`] ?? '';
}

function exampleToItem(furniture: FurnitureExample, example: FurnitureExample['examples'][number]): ContentItem {
  return {
    id: `template-${furniture.id}-${example.format.toLowerCase()}`,
    date: '2026-10-17',
    week: 0,
    pillar: furniture.id === 'kuhinja' ? 'Kuhinje' : 'Proizvod',
    format: example.format,
    channels: ['Instagram', 'Facebook'],
    title: example.title,
    goal: example.purpose,
    hook: example.hook,
    caption: example.captionTemplate,
    cta: example.cta,
    shots: example.recipe,
    factsToConfirm: ['Naziv i model proizvoda', 'Dostupnost na dan objave', 'Cijena samo uz Natalijinu potvrdu'],
    orientation: example.format === 'Reel' || example.format === 'Story' ? 'Vertikalno 9:16' : 'Portretno 4:5',
    duration: example.format === 'Reel' ? '15–25 sekundi' : example.format === 'Story' ? '3–5 Storyja' : example.format === 'Karusel' ? '5–7 slajdova' : '1 glavna fotografija',
    image: furniture.image,
    status: 'Planirano',
  };
}

export function ContentOS() {
  const [view, setView] = useState<View>('dashboard');
  const [selected, setSelected] = useState<ContentItem>(activeGuideItem);
  const [step, setStep] = useState(2);
  const [mobileNav, setMobileNav] = useState(false);
  const [activeRole, setActiveRole] = useState<ActiveRole>('Valentina');
  const [profileMenu, setProfileMenu] = useState(false);
  const [weekFilter, setWeekFilter] = useState<number | 'all'>('all');
  const [pillarFilter, setPillarFilter] = useState<string>('Sve teme');
  const [copied, setCopied] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [systemSettings, setSystemSettings] = useState<SystemSettings>(defaultSystemSettings);
  const [draftCaption, setDraftCaption] = useState(activeGuideItem.caption);
  const [draftCta, setDraftCta] = useState(activeGuideItem.cta);
  const [state, setState] = useState<StoredState>({ statuses: { [activeGuideItem.id]: activeGuideItem.status }, checkedShots: {}, analytics: {} });

  useEffect(() => {
    const saved = window.localStorage.getItem('vespera-content-os-v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<StoredState>;
        const nextState: StoredState = { statuses: parsed.statuses ?? { [activeGuideItem.id]: activeGuideItem.status }, checkedShots: parsed.checkedShots ?? {}, analytics: parsed.analytics ?? {} };
        const frame = window.requestAnimationFrame(() => setState(nextState));
        return () => window.cancelAnimationFrame(frame);
      } catch { /* keep safe defaults */ }
    }
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem('vespera-content-os-settings-v1');
    if (!saved) return;
    try {
      const parsed = { ...defaultSystemSettings, ...JSON.parse(saved) } as SystemSettings;
      const frame = window.requestAnimationFrame(() => {
        setSystemSettings(parsed);
        setActiveRole(parsed.defaultRole);
      });
      return () => window.cancelAnimationFrame(frame);
    } catch { /* keep safe defaults */ }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('vespera-content-os-v3', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  useEffect(() => {
    if (!mobileNav) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [mobileNav]);

  const selectedStatus = state.statuses[selected.id] ?? selected.status;
  const checkedShots = state.checkedShots[selected.id] ?? [];
  const filteredPlan = useMemo(() => contentPlan.filter((entry) => {
    const weekMatch = weekFilter === 'all' || entry.week === weekFilter;
    const pillarMatch = pillarFilter === 'Sve teme' || entry.pillar === pillarFilter;
    return weekMatch && pillarMatch;
  }), [weekFilter, pillarFilter]);
  const weeks = useMemo(() => Array.from(new Set(contentPlan.map((entry) => entry.week))), []);
  const pendingApprovals = [activeGuideItem, ...contentPlan].filter((entry) => (state.statuses[entry.id] ?? entry.status) === 'Čeka odobrenje');
  const published = [activeGuideItem, ...contentPlan].filter((entry) => (state.statuses[entry.id] ?? entry.status) === 'Objavljeno');

  function selectItem(entry: ContentItem, targetStep = 1) {
    setSelected(entry);
    setDraftCaption(entry.caption);
    setDraftCta(entry.cta);
    setStep(targetStep);
    setView('create');
    setMobileNav(false);
  }

  function setStatus(id: string, status: ContentStatus) {
    setState((current) => ({ ...current, statuses: { ...current.statuses, [id]: status } }));
  }

  function toggleShot(index: number) {
    setState((current) => {
      const currentList = current.checkedShots[selected.id] ?? [];
      const next = currentList.includes(index) ? currentList.filter((value) => value !== index) : [...currentList, index];
      return { ...current, checkedShots: { ...current.checkedShots, [selected.id]: next } };
    });
  }

  function setAnalytics(id: string, field: keyof AnalyticsRecord, value: number | string) {
    setState((current) => {
      const currentRecord = current.analytics[id] ?? { reach: 0, saves: 0, shares: 0, comments: 0, clicks: 0, inquiries: 0, lesson: '' };
      return { ...current, analytics: { ...current.analytics, [id]: { ...currentRecord, [field]: value } } };
    });
  }

  async function copyCaption() {
    await navigator.clipboard.writeText(`${draftCaption}\n\n${draftCta}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function selectRole(role: ActiveRole) {
    setActiveRole(role);
    setProfileMenu(false);
    setMobileNav(false);
    setView('dashboard');
  }

  function saveSystemSettings() {
    window.localStorage.setItem('vespera-content-os-settings-v1', JSON.stringify(systemSettings));
    setActiveRole(systemSettings.defaultRole);
    setSettingsSaved(true);
    window.setTimeout(() => setSettingsSaved(false), 1800);
  }

  const roleMeta = activeRole === 'Valentina'
    ? { initial: 'V', title: 'Koordinatorica sadržaja' }
    : { initial: 'N', title: 'Vlasnica · odobrava' };

  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <button className={styles.mobileMenu} onClick={() => setMobileNav(true)} aria-label="Otvori izbornik"><Menu /></button>
        <div className={styles.wordmark}><Image src="/brand/vespera-logo-horizontal.svg" alt="Vespera namještaj" width={560} height={168} priority /><span>CONTENT OS</span></div>
        <div className={styles.today}>Subota, 17. listopada 2026.</div>
        <TextSizeControl variant="os" />
        <div className={styles.profileWrap}>
          <button className={styles.profile} onClick={() => setProfileMenu((open) => !open)} aria-expanded={profileMenu} aria-haspopup="menu">
            <span>{roleMeta.initial}</span><span><strong>{activeRole}</strong><small>{roleMeta.title}</small></span><ChevronDown size={16} />
          </button>
          {profileMenu && <div className={styles.profileMenu} role="menu" aria-label="Odaberi profil">
            <button role="menuitem" onClick={() => selectRole('Natalija')}><span>N</span><div><strong>Natalija</strong><small>Pregledava i odobrava</small></div>{activeRole === 'Natalija' && <Check />}</button>
            <button role="menuitem" onClick={() => selectRole('Valentina')}><span>V</span><div><strong>Valentina</strong><small>Priprema i objavljuje</small></div>{activeRole === 'Valentina' && <Check />}</button>
          </div>}
        </div>
      </header>

      {mobileNav && <button className={styles.mobileBackdrop} onClick={() => setMobileNav(false)} aria-label="Zatvori izbornik" />}
      <aside className={`${styles.sidebar} ${mobileNav ? styles.sidebarOpen : ''}`}>
        <button className={styles.closeNav} onClick={() => setMobileNav(false)} aria-label="Zatvori izbornik"><X /></button>
        <div className={styles.weekIntro}><span>VESPERA CONTENT OS</span><h2>Manje razmišljanja.<br />Više objavljenog.</h2></div>
        <nav aria-label="Content OS">
          {navItems.map((item) => <button key={item.id} className={view === item.id ? styles.navActive : ''} onClick={() => { setView(item.id); setMobileNav(false); }}><item.icon /><span>{item.label}</span>{item.id === 'approvals' && pendingApprovals.length > 0 && <b>{pendingApprovals.length}</b>}</button>)}
        </nav>
        <div className={styles.sidebarBottom}>
          <span className={styles.roleLabel}>RADIM KAO</span>
          <button className={`${styles.people} ${activeRole === 'Natalija' ? styles.personActive : ''}`} onClick={() => selectRole('Natalija')}><span>N</span><div><strong>Natalija</strong><small>Vlasnica · odobrava</small></div>{activeRole === 'Natalija' && <Check />}</button>
          <button className={`${styles.people} ${activeRole === 'Valentina' ? styles.personActive : ''}`} onClick={() => selectRole('Valentina')}><span>V</span><div><strong>Valentina</strong><small>Priprema i objavljuje</small></div>{activeRole === 'Valentina' && <Check />}</button>
          <button className={view === 'settings' ? styles.navActive : ''} onClick={() => { setView('settings'); setMobileNav(false); }}><Settings /> Postavke sustava</button>
        </div>
      </aside>

      <section className={styles.workspace}>
        {view === 'dashboard' && <DashboardView role={activeRole} weeklyGoal={systemSettings.weeklyGoal} pendingApprovals={pendingApprovals.length} published={published.length} statuses={state.statuses} onCreate={() => { setSelected(activeGuideItem); setStep(1); setView('create'); }} onPlan={() => setView('plan')} onApprovals={() => setView('approvals')} onLibrary={() => setView('library')} onEducation={() => setView('education')} onSelect={selectItem} />}
        {view === 'create' && <GuideView item={selected} step={step} setStep={setStep} status={selectedStatus} approvalRequired={systemSettings.approvalRequired} checkedShots={checkedShots} toggleShot={toggleShot} caption={draftCaption} setCaption={setDraftCaption} cta={draftCta} setCta={setDraftCta} copyCaption={copyCaption} copied={copied} setStatus={setStatus} analytics={state.analytics[selected.id]} setAnalytics={setAnalytics} onOpenPlan={() => setView('plan')} />}
        {view === 'ideas' && <IdeaStudio onUse={selectItem} />}
        {view === 'plan' && <PlanView items={filteredPlan} weeks={weeks} weekFilter={weekFilter} setWeekFilter={setWeekFilter} pillarFilter={pillarFilter} setPillarFilter={setPillarFilter} statuses={state.statuses} onSelect={selectItem} />}
        {view === 'library' && <LibraryView onUse={(example) => { setSelected(example); setDraftCaption(example.caption); setDraftCta(example.cta); setStep(1); setView('create'); }} />}
        {view === 'education' && <EducationView onStart={() => { setSelected(activeGuideItem); setStep(1); setView('create'); }} onLibrary={() => setView('library')} />}
        {view === 'approvals' && <ApprovalView items={pendingApprovals} onSelect={selectItem} setStatus={setStatus} />}
        {view === 'guidelines' && <GuidelinesView />}
        {view === 'results' && <ResultsView published={published} analytics={state.analytics} statuses={state.statuses} onSelect={selectItem} />}
        {view === 'ads' && <AdsMeasurement role={activeRole} />}
        {view === 'settings' && <SettingsView settings={systemSettings} setSettings={setSystemSettings} saved={settingsSaved} onSave={saveSystemSettings} onAnalytics={() => setView('results')} onEducation={() => setView('education')} />}
      </section>
    </main>
  );
}

function DashboardView({ role, weeklyGoal, pendingApprovals, published, statuses, onCreate, onPlan, onApprovals, onLibrary, onEducation, onSelect }: {
  role: ActiveRole;
  weeklyGoal: 2 | 3 | 4; pendingApprovals: number; published: number; statuses: Record<string, ContentStatus>;
  onCreate: () => void; onPlan: () => void; onApprovals: () => void; onLibrary: () => void; onEducation: () => void; onSelect: (item: ContentItem, step?: number) => void;
}) {
  const nextPosts = contentPlan.slice(0, weeklyGoal);
  const inProgress = [activeGuideItem, ...contentPlan].filter((item) => (statuses[item.id] ?? item.status) === 'U pripremi').length;
  const isNatalija = role === 'Natalija';
  const natalijaHasApprovals = pendingApprovals > 0;
  const primaryAction = isNatalija ? (natalijaHasApprovals ? onApprovals : onPlan) : onCreate;
  return <div className={styles.dashboard}>
    <div className={styles.dashboardHero}>
      <div><p>SUBOTA, 17. LISTOPADA</p><h1>Dobro jutro, {role}.</h1><span>{isNatalija ? (natalijaHasApprovals ? `Čeka te ${pendingApprovals} ${pendingApprovals === 1 ? 'objava' : 'objave'} za pregled. Sve činjenice i tekst su na jednom mjestu.` : 'Sve je pregledano. Možeš provjeriti plan za ovaj tjedan i vidjeti što Valentina priprema.') : 'Danas imaš jedan jasan zadatak: dovrši primjer za fotelju. Sustav te vodi korak po korak.'}</span></div>
      <button className={styles.heroAction} onClick={primaryAction}>{isNatalija ? (natalijaHasApprovals ? <ClipboardCheck /> : <CalendarDays />) : <Sparkles />}<span><small>{isNatalija ? 'TVOJ PREGLED' : 'DANAŠNJI ZADATAK'}</small><strong>{isNatalija ? (natalijaHasApprovals ? 'Pregledaj objave za odobrenje' : 'Provjeri plan za ovaj tjedan') : 'Napravi objavu za fotelju'}</strong><em>{isNatalija ? (natalijaHasApprovals ? 'Provjeri činjenice · odobri ili vrati' : 'Datumi, teme i statusi objava') : '5 koraka · oko 25 minuta'}</em></span><ArrowRight /></button>
    </div>

    <section className={styles.dashboardStats} aria-label="Pregled sadržaja">
      <article><span>Ovaj tjedan</span><strong>{weeklyGoal}</strong><small>planirane objave</small></article>
      <article><span>U pripremi</span><strong>{inProgress}</strong><small>otvorenih zadataka</small></article>
      <article><span>Čeka Nataliju</span><strong>{pendingApprovals}</strong><small>za provjeru činjenica</small></article>
      <article><span>Objavljeno</span><strong>{published}</strong><small>objava u sustavu</small></article>
    </section>

    <div className={styles.dashboardGrid}>
      <section className={styles.dashboardPanel}>
        <div className={styles.panelTitle}><div><p>SLJEDEĆE OBJAVE</p><h2>Plan za ovaj tjedan</h2></div><button onClick={onPlan}>Otvori cijeli plan <ArrowRight /></button></div>
        <div className={styles.upcomingList}>{nextPosts.map((item, index) => <button key={item.id} onClick={() => onSelect(item)}><span className={styles.dateBadge}><b>{new Date(`${item.date}T12:00:00`).getDate()}</b><small>{new Intl.DateTimeFormat('hr-HR', { month: 'short' }).format(new Date(`${item.date}T12:00:00`))}</small></span><span><small>{index === 0 ? 'SLJEDEĆE' : item.format.toUpperCase()}</small><strong>{item.title}</strong><em>{item.pillar} · {item.format}</em></span><i className={statusClass(statuses[item.id] ?? item.status)}>{statuses[item.id] ?? item.status}</i><ArrowRight /></button>)}</div>
      </section>

      <aside className={styles.dashboardSide}>
        <article className={styles.learningCard}><GraduationCap /><p>VALENTININA EDUKACIJA</p><h2>Nisi sigurna što snimiti?</h2><span>Otvori kratke lekcije, pogledaj dobar primjer i prati korake bez nagađanja.</span><button onClick={onEducation}>Otvori edukaciju <ArrowRight /></button></article>
        <article className={styles.libraryCard}><Images /><div><p>BIBLIOTEKA PRIMJERA</p><h3>7 vrsta namještaja<br />28 gotovih formata</h3><span>Reel, karusel, fotografija i Story za svaki proizvod.</span></div><button onClick={onLibrary}>Pronađi primjer <ArrowRight /></button></article>
      </aside>
    </div>

    <section className={styles.quickStart}><div><p>BRZI POČETAK</p><h2>Što želiš napraviti?</h2></div><button onClick={onCreate}><Sparkles /><span><strong>Nova objava</strong><small>Vođeni proces u 5 koraka</small></span></button><button onClick={onLibrary}><Armchair /><span><strong>Primjer za namještaj</strong><small>Odaberi proizvod i format</small></span></button><button onClick={onEducation}><BookOpen /><span><strong>Nauči osnove</strong><small>Kratke lekcije i kontrolne liste</small></span></button></section>
  </div>;
}

const contentModes = [
  { id: 'educate', name: 'Educiraj', description: 'Riješi jednu dilemu i pomozi prije kupnje.', example: 'Mjere, materijali, održavanje, usporedbe', metric: 'Spremanja' },
  { id: 'inspire', name: 'Inspiriraj', description: 'Pokaži kako komad mijenja osjećaj prostora.', example: 'Stil, boje, kombinacije, prije i poslije', metric: 'Dijeljenja' },
  { id: 'product', name: 'Pokaži proizvod', description: 'Dokaži funkciju, proporcije i kvalitetu.', example: 'Detalji, otvaranje, sjedenje, pohrana', metric: 'Upiti' },
  { id: 'trust', name: 'Izgradi povjerenje', description: 'Pokaži ljude, proces i stvarno iskustvo.', example: 'Tim, salon, dostava, realizacija, kupci', metric: 'Komentari' },
  { id: 'visit', name: 'Potakni dolazak', description: 'Daj dobar razlog za posjet salonu.', example: 'Isprobavanje, uzorci, savjetovanje, dostupnost', metric: 'Dolasci' },
];

const vesperaPersonas = [
  { id: 'family', name: 'Obitelj koja uređuje dom', label: 'Praktični planeri', situation: 'Uređuju dnevni boravak ili spavaću sobu i žele izbjeći pogrešnu kupnju.', cares: 'Mjere, trajnost, održavanje, pohrana i omjer cijene i kvalitete.', message: 'Pokaži kako proizvod radi u stvarnom životu.' },
  { id: 'newhome', name: 'Par u novom stanu', label: 'Prvi veći izbori', situation: 'Imaju puno odluka, ograničen prostor i žele skladan rezultat.', cares: 'Proporcije, stil, kombiniranje, budžet i redoslijed kupnje.', message: 'Pojednostavi izbor i daj jasan prvi korak.' },
  { id: 'kitchen', name: 'Kupac nove kuhinje', label: 'Projekt, ne samo proizvod', situation: 'Planira ulaganje i boji se pogrešnih mjera, rokova i loše organizacije.', cares: 'Proces, ergonomija, materijali, raspored, rok i što je uključeno.', message: 'Objasni proces mirno, precizno i bez skrivenih obećanja.' },
  { id: 'comfort', name: 'Kupac kojem je važna udobnost', label: 'Sigurnost i lako korištenje', situation: 'Traži komad koji je ugodan, jednostavan za korištenje i lako se održava.', cares: 'Visina sjedišta, oslonac, ustajanje, tkanina i mogućnost isprobavanja.', message: 'Pokaži korištenje i pozovi na isprobavanje u salonu.' },
];

const industryTopics = [
  { name: 'Prostor i mjere', prompts: 'što izmjeriti · prolazi · vrata · proporcije' },
  { name: 'Udobnost i ergonomija', prompts: 'sjedenje · visina · dubina · svakodnevne navike' },
  { name: 'Materijali i održavanje', prompts: 'tkanine · fronte · radne ploče · čišćenje' },
  { name: 'Funkcija i pohrana', prompts: 'ladice · ležaj · otvaranje · organizacija' },
  { name: 'Stil i kombiniranje', prompts: 'boje · oblici · mali i veliki prostori' },
  { name: 'Proces kupnje', prompts: 'od mjerenja do odluke · dostava · montaža' },
  { name: 'Ljudi i povjerenje', prompts: 'tim · savjetovanje · stvarni kupci · realizacije' },
  { name: 'Salon i lokalna priča', prompts: 'što isprobati · što ponijeti · Karlovac' },
];

const ideaAngles: Record<string, { title: string; hook: string; plan: string; caption: string; cta: string }[]> = {
  educate: [
    { title: '3 provjere prije odluke', hook: 'Prije odluke o kategoriji „{Product}” provjerite ove tri stvari.', plan: 'Kreni od česte pogreške, pokaži tri konkretne provjere i završi jasnim savjetom.', caption: 'Dobar odabir počinje prije kupnje. U kategoriji „{Product}” provjerite prostor, način korištenja i detalje koji utječu na svakodnevicu. Fotografija je početak, a mjere i isprobavanje daju sigurniji odgovor.', cta: 'Spremite objavu i ponesite mjere u salon.' },
    { title: 'Najčešća greška kupaca', hook: 'Može stati u prostor, a ipak biti pogrešan izbor.', plan: 'Pokaži pogrešan pristup, objasni posljedicu i demonstriraj bolju provjeru.', caption: 'Sama širina često nije dovoljna. Pri odabiru iz kategorije „{Product}” treba provjeriti proporcije, prolaz i način korištenja. Nekoliko minuta pripreme može spriječiti skupu pogrešku.', cta: 'Pošaljite nam fotografiju prostora i osnovne mjere.' },
    { title: 'Mali vodič za pametniji izbor', hook: 'Ovo su detalji koje na fotografiji ne možete procijeniti.', plan: 'Snimi četiri detalja koja se vide ili osjete tek uživo i objasni zašto su važna.', caption: 'Boja, tekstura, osjećaj pod rukom i udobnost mogu izgledati drukčije na ekranu. Zato proizvode iz kategorije „{Product}” vrijedi pogledati izbliza i provjeriti detalje važne za vaš dom.', cta: 'Dođite pogledati i isprobati uživo.' },
  ],
  inspire: [
    { title: 'Jedan komad, drukčiji osjećaj prostora', hook: 'Ponekad prostor ne treba više stvari. Treba pravi komad.', plan: 'Prikaži miran široki kadar, zatim detalje i završni skladan prostor.', caption: '{Product} može povezati boje, omekšati prostor ili mu dati jasnu funkciju. Ne tražimo trend radi trenda, nego rješenje koje odgovara prostoru i ljudima koji u njemu žive.', cta: 'Spremite kombinaciju koja vam se sviđa.' },
    { title: 'Dvije izvedbe, dva karaktera', hook: 'Isti prostor. Dvije potpuno različite atmosfere.', plan: 'Usporedi dvije boje, materijala ili izvedbe i pitaj publiku što bi odabrala.', caption: 'Svjetlija i tamnija izvedba u kategoriji „{Product}” stvaraju drukčiji dojam, ali odluka ovisi i o svjetlu, podu i ostatku namještaja.', cta: 'Napišite A ili B u komentar.' },
    { title: 'Kutak koji poziva na predah', hook: 'Kako izgleda prostor u kojem stvarno želite ostati?', plan: 'Ispričaj kratku vizualnu priču od praznog kuta do gotove, uporabne cjeline.', caption: 'Ugodan dom nastaje iz malih odluka koje imaju smisla zajedno. {Product} je polazište, a proporcije, svjetlo i materijali stvaraju cjelinu.', cta: 'Sačuvajte kao inspiraciju za svoj prostor.' },
  ],
  product: [
    { title: 'Pogled izbliza', hook: 'Ovaj detalj mijenja način na koji koristite proizvod svaki dan.', plan: 'Pokaži cijeli proizvod, važan detalj, funkciju u uporabi i realne proporcije.', caption: 'U kategoriji „{Product}” izdvajamo funkciju koju vrijedi vidjeti uživo. Pokazujemo je bez filtra i iz više kutova kako biste lakše procijenili odgovara li vašim navikama.', cta: 'Javite se za dostupnost ili dođite u salon.' },
    { title: 'Kako radi u stvarnom prostoru', hook: 'Lijepo izgleda. Ali kako se ponaša svaki dan?', plan: 'Demonstriraj otvaranje, sjedenje, spremanje ili drugu glavnu funkciju proizvoda.', caption: 'Dobar namještaj treba izgledati dobro i olakšati svakodnevicu. Zato u kategoriji „{Product}” pokazujemo funkciju, prostor koji proizvod zauzima i detalje koje ćete koristiti svaki dan.', cta: 'Pogledajte funkciju uživo u Vesperi.' },
    { title: 'Detalj koji treba provjeriti', hook: 'Prije kupnje pogledajte upravo ovaj dio.', plan: 'Krupnim kadrom pokaži materijal, spoj, okov ili mehanizam i objasni njegovu ulogu.', caption: 'Kvaliteta se često vidi u detalju. U kategoriji „{Product}” provjerite završnu obradu, način korištenja i ono što je važno za dugotrajnost.', cta: 'Spremite podsjetnik za sljedeći obilazak salona.' },
  ],
  trust: [
    { title: 'Kako izgleda dobar razgovor u salonu', hook: 'Ne morate znati sve odgovore prije dolaska.', plan: 'Pokaži doček, razgovor, mjere, uzorke i način na koji tim postavlja pitanja.', caption: 'Naš posao nije požuriti odluku. Zajedno prolazimo prostor, navike i mogućnosti kako bi odabir iz kategorije „{Product}” imao smisla i nakon kupnje.', cta: 'Ponesite mjere i fotografiju prostora — krenut ćemo od toga.' },
    { title: 'Iza jedne preporuke', hook: 'Zašto isti komad nije dobar izbor za svaki dom?', plan: 'Prikaži kako tim uspoređuje mjere, potrebe i izvedbe prije preporuke.', caption: 'Preporuka u kategoriji „{Product}” počinje pitanjima: tko koristi proizvod, koliko je prostora dostupno i što vam je važno svaki dan. Tek nakon toga biramo izvedbu.', cta: 'Dođite na razgovor bez obveze.' },
    { title: 'Stvarna odluka, stvarni razlog', hook: 'Kupci su odabrali ovu izvedbu zbog jednog praktičnog razloga.', plan: 'Ispričaj anonimiziranu priču kupca: problem, kriterij, izbor i rezultat.', caption: 'Kod svake odluke postoji razlog. Ovaj put izbor u kategoriji „{Product}” odgovorio je na konkretan prostor i navike, a odluka nije donesena samo prema izgledu.', cta: 'Recite nam što vaš prostor treba riješiti.' },
  ],
  visit: [
    { title: 'Što provjeriti uživo', hook: 'Ove četiri stvari ekran vam ne može pokazati.', plan: 'Pokaži dodir materijala, korištenje funkcije, proporcije uz osobu i razgovor s timom.', caption: 'U kategoriji „{Product}” uživo možete procijeniti boju, materijal, proporcije i osjećaj pri korištenju. To su informacije koje olakšavaju mirnu odluku.', cta: 'Navratite u Vesperu u Karlovcu i provjerite sami.' },
    { title: 'Ponesite ovo u salon', hook: 'Za bolju preporuku trebaju nam samo tri stvari.', plan: 'Pokaži fotografiju prostora, zapisane mjere i jednu jasnu potrebu kupca.', caption: 'Za razgovor o kategoriji „{Product}” ponesite fotografiju prostora, osnovne mjere i recite nam što vam je najvažnije. Tako brže dolazimo do izvedbi koje imaju smisla.', cta: 'Spremite popis prije dolaska.' },
    { title: 'Deset minuta za sigurniju odluku', hook: 'Prije odluke odvojite deset minuta za pravi test.', plan: 'Prikaži kratak obilazak i tri stvari koje osoba može provjeriti u salonu.', caption: 'Nekoliko minuta isprobavanja i usporedbe često vrijedi više od deset fotografija. Izbor iz kategorije „{Product}” pogledajte u kontekstu svojih mjera i navika.', cta: 'Posjetite salon i isprobajte bez žurbe.' },
  ],
};

function IdeaStudio({ onUse }: { onUse: (item: ContentItem, step?: number) => void }) {
  const [goal, setGoal] = useState('educate');
  const [personaId, setPersonaId] = useState('family');
  const [productId, setProductId] = useState('fotelja');
  const [format, setFormat] = useState<ContentItem['format']>('Karusel');
  const [variation, setVariation] = useState(0);
  const persona = vesperaPersonas.find((entry) => entry.id === personaId) ?? vesperaPersonas[0];
  const product = furnitureExamples.find((entry) => entry.id === productId) ?? furnitureExamples[0];
  const mode = contentModes.find((entry) => entry.id === goal) ?? contentModes[0];
  const angle = ideaAngles[goal][variation % ideaAngles[goal].length];
  const replaceProduct = (value: string) => value.replaceAll('{Product}', product.name);
  const generated: ContentItem = {
    id: `idea-${goal}-${personaId}-${productId}-${format}-${variation}`,
    date: '2026-10-17', week: 0,
    pillar: goal === 'educate' ? 'Savjet' : goal === 'trust' ? 'Povjerenje' : goal === 'visit' ? 'Salon' : product.id === 'kuhinja' ? 'Kuhinje' : 'Proizvod',
    format, channels: ['Instagram', 'Facebook'],
    title: replaceProduct(angle.title), goal: `${mode.name}: ${angle.plan} Namijenjeno osobi: ${persona.name}.`,
    hook: replaceProduct(angle.hook), caption: replaceProduct(angle.caption), cta: angle.cta,
    shots: [...product.mustShow.slice(0, 4), format === 'Karusel' ? 'Završni slajd s jednom jasnom porukom' : format === 'Story' ? 'Završni Story s pitanjem ili CTA-om' : 'Završni kadar s jasnim CTA-om'],
    factsToConfirm: ['Točan naziv ili model', 'Dostupnost na dan objave', 'Cijena i rok samo uz Natalijinu potvrdu'],
    orientation: format === 'Reel' || format === 'Story' ? 'Vertikalno 9:16' : 'Portretno 4:5',
    duration: format === 'Reel' ? '15–25 sekundi' : format === 'Story' ? '3–5 Storyja' : format === 'Karusel' ? '5–7 slajdova' : '1 glavna fotografija',
    image: product.image, status: 'Planirano',
  };

  return <div className={styles.ideaStudio}>
    <div className={styles.pageHeading}><div><p>VESPERA CONTENT MARKETING</p><h1>Ideje koje imaju razlog.</h1><span>Prvo nauči što sadržaj treba napraviti. Zatim složi novu objavu bez praznog papira.</span></div></div>

    <section className={styles.marketingBasics}><div><span>01</span><strong>Odaberi jednu osobu</strong><small>Ne obraćamo se svima odjednom.</small></div><div><span>02</span><strong>Riješi jednu potrebu</strong><small>Svaka objava odgovara na jedno pitanje.</small></div><div><span>03</span><strong>Traži jednu radnju</strong><small>Spremi, pitaj, posjeti ili isprobaj.</small></div></section>

    <section className={styles.learningSection}><div className={styles.sectionIntro}><p>VRSTE SADRŽAJA</p><h2>Pet poslova koje objava može obaviti.</h2><span>Dobar tjedan ne čine tri prodajne objave. Miješamo pomoć, inspiraciju, dokaz i poziv.</span></div><div className={styles.contentTypeGrid}>{contentModes.map((entry, index) => <article key={entry.id}><b>{String(index + 1).padStart(2, '0')}</b><h3>{entry.name}</h3><p>{entry.description}</p><small>{entry.example}</small><em>Mjerimo: {entry.metric}</em></article>)}</div></section>

    <section className={styles.learningSection}><div className={styles.sectionIntro}><p>TEME KOJE VESPERI IMAJU SMISLA</p><h2>Ne pričamo samo o proizvodima.</h2><span>Svako područje može dati desetke korisnih objava.</span></div><div className={styles.topicMap}>{industryTopics.map((topic) => <article key={topic.name}><Target /><div><strong>{topic.name}</strong><span>{topic.prompts}</span></div></article>)}</div></section>

    <section className={styles.personaSection}><div className={styles.sectionIntro}><p>KOME SE OBRAĆAMO</p><h2>Četiri glavne persone.</h2><span>Persona nije izmišljeni životopis. To je stvarna situacija u kojoj kupac treba pomoć.</span></div><div className={styles.personaGrid}>{vesperaPersonas.map((entry) => <article key={entry.id}><small>{entry.label}</small><h3>{entry.name}</h3><p>{entry.situation}</p><dl><dt>Važno im je</dt><dd>{entry.cares}</dd><dt>Kako govorimo</dt><dd>{entry.message}</dd></dl></article>)}</div></section>

    <section className={styles.tovStrip}><div><p>TOV SMJER · NENAD VUKUŠIĆ</p><h2>Jasno. Ljudski. Konkretno.</h2><span>{toneRules.promise}</span></div><div><strong>DA</strong><span>„Pošaljite fotografiju i tri mjere. Reći ćemo vam s čime ima smisla krenuti.”</span></div><div><strong>NE</strong><span>„Otkrijte savršenstvo vrhunske kvalitete za vaš dom!”</span></div><ul><li>Stvarna situacija kupca</li><li>Jedna korisna misao</li><li>Činjenice prije pridjeva</li><li>Jasan sljedeći korak</li></ul><small className={styles.tovCredit}>{toneRules.note}</small></section>

    <section className={styles.analyticsLesson}><div className={styles.sectionIntro}><p>ANALITIKA BEZ STRAHA</p><h2>Brojke odgovaraju na jedno pitanje: što trebamo ponoviti?</h2><span>Rezultat provjeravamo 48 sati nakon objave. Ne uspoređujemo jednu objavu s cijelim mjesecom, nego s objavama slične teme i formata.</span></div><div className={styles.metricLessons}><article><Eye /><strong>Doseg</strong><span>Koliko je ljudi vidjelo objavu.</span><small>Dobar znak da su tema i početak privukli pažnju.</small></article><article><Bookmark /><strong>Spremanja</strong><span>Koliko ljudi želi sačuvati savjet.</span><small>Najvažnije za vodiče, mjere i usporedbe.</small></article><article><Share2 /><strong>Dijeljenja</strong><span>Koliko je ljudi poslalo objavu drugome.</span><small>Znak da je sadržaj koristan ili inspirativan.</small></article><article><MessageCircle /><strong>Komentari</strong><span>Koliko je objava pokrenula razgovor.</span><small>Čitaj pitanje i temu komentara, ne samo broj.</small></article><article><Send /><strong>Upiti</strong><span>Poruke, pozivi i dolasci povezani s objavom.</span><small>Najvažniji poslovni signal za Vesperu.</small></article></div><div className={styles.analyticsDecisions}><strong>Nakon unosa odluči samo jedno:</strong><span><b>Puno spremanja?</b> Napravi još jedan savjet na istu temu.</span><span><b>Puno dijeljenja?</b> Ponovi format i kut priče.</span><span><b>Puno upita?</b> Tema vodi prema prodaji — daj joj više mjesta u planu.</span><span><b>Slab rezultat?</b> Promijeni hook ili vizual, ne cijelu strategiju nakon jedne objave.</span></div></section>

    <section className={styles.generatorSection}><div className={styles.generatorIntro}><p>GENERATOR IDEJA</p><h2>Kad ne znaš što objaviti, kreni od četiri izbora.</h2><span>Generator spaja Vesperine teme, publiku i pravila tona. Svaki rezultat možeš odmah otvoriti u vođenom procesu.</span></div><div className={styles.generatorWorkspace}><div className={styles.generatorControls}>
      <label><span>1. Što želiš postići?</span><select value={goal} onChange={(event) => { setGoal(event.target.value); setVariation(0); }}>{contentModes.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select></label>
      <label><span>2. Kome se obraćaš?</span><select value={personaId} onChange={(event) => setPersonaId(event.target.value)}>{vesperaPersonas.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select></label>
      <label><span>3. Koji proizvod?</span><select value={productId} onChange={(event) => setProductId(event.target.value)}>{furnitureExamples.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select></label>
      <label><span>4. Koji format?</span><select value={format} onChange={(event) => setFormat(event.target.value as ContentItem['format'])}>{(['Reel', 'Karusel', 'Fotografija', 'Story'] as const).map((entry) => <option key={entry}>{entry}</option>)}</select></label>
      <button onClick={() => setVariation((current) => current + 1)}><Sparkles /> Daj mi drugu ideju</button>
    </div><article className={styles.generatedIdea}><div className={styles.ideaMeta}><span>{mode.name}</span><span>{product.name}</span><span>{format}</span><span>TOV: Nenad Vukušić</span></div><small>IDEJA ZA: {persona.name.toUpperCase()}</small><h2>{generated.title}</h2><blockquote>{generated.hook}</blockquote><div><strong>Kako izgleda objava</strong><p>{replaceProduct(angle.plan)}</p></div><div><strong>Predloženi tekst</strong><p>{generated.caption}</p></div><div><strong>CTA</strong><p>{generated.cta}</p></div><div className={styles.toneCheck}><strong>Provjera tona prije objave</strong><p>Govori li ovo o stvarnoj situaciji? Ima li jednu korisnu misao? Možemo li pridjev zamijeniti činjenicom?</p></div><button onClick={() => onUse(generated, 1)}>Pretvori u objavu <ArrowRight /></button></article></div></section>
  </div>;
}

function EducationView({ onStart, onLibrary }: { onStart: () => void; onLibrary: () => void }) {
  const lessons = [
    { number: '01', title: 'Odaberi cilj', text: 'Prvo odluči treba li objava educirati, predstaviti proizvod, izgraditi povjerenje ili dovesti osobu u salon.', time: '3 min' },
    { number: '02', title: 'Snimi materijal', text: 'Napravi širi kadar, detalj, proizvod u uporabi i završni kadar. Aplikacija daje točan popis za svaki proizvod.', time: '8 min' },
    { number: '03', title: 'Složi objavu', text: 'Koristi pripremljeni hook, tekst i jedan CTA. Mijenjaj samo provjerene podatke označene uglatim zagradama.', time: '5 min' },
    { number: '04', title: 'Pošalji Nataliji', text: 'Natalija provjerava model, dostupnost, cijenu i rok. Ne mora ponovno pisati cijelu objavu.', time: '2 min' },
    { number: '05', title: 'Objavi i nauči', text: 'Nakon 48 sati zapiši doseg, spremanja, dijeljenja i upite kako bi plan postajao sve bolji.', time: '4 min' },
  ];
  return <div className={styles.educationPage}>
    <div className={styles.pageHeading}><div><p>VALENTININA EDUKACIJA</p><h1>Od ideje do objave,<br />bez nagađanja.</h1><span>Pet kratkih lekcija koje možeš odmah primijeniti na stvarnoj objavi.</span></div><button className={styles.heroPrimary} onClick={onStart}><Sparkles /> Pokreni vođeni primjer</button></div>
    <div className={styles.educationIntro}><div><strong>Pravilo broj 1</strong><h2>Ne moraš biti stručnjakinja za marketing.</h2><p>Trebaš znati što pokazati, koje podatke potvrditi i kojim redoslijedom raditi. Sustav donosi odluke s tobom.</p></div><div className={styles.educationPromise}><CheckCircle2 /><span><strong>Na kraju znaš:</strong> odabrati format, snimiti obavezne kadrove, složiti tekst, zatražiti odobrenje i izmjeriti rezultat.</span></div></div>
    <InsightsGuide />
    <div className={styles.lessonList}>{lessons.map((lesson, index) => <article key={lesson.number}><span>{lesson.number}</span><div><small>LEKCIJA {lesson.number} · {lesson.time}</small><h2>{lesson.title}</h2><p>{lesson.text}</p></div><button onClick={index === 1 ? onLibrary : onStart}>{index === 1 ? 'Pogledaj primjere' : 'Vježbaj na fotelji'} <ArrowRight /></button></article>)}</div>
    <div className={styles.educationCallout}><span className={styles.calloutIcon}><Armchair /></span><div><p>TREBAŠ KONKRETAN PRIMJER?</p><h2>Odaberi komad namještaja i prati gotove korake.</h2><span>Fotelja, ormar, stolić, kauč, kuhinja, komoda ili krevet — za svaki te čekaju ideja, kadrovi, tekst i CTA.</span></div><button onClick={onLibrary}>Pogledaj primjere <ArrowRight /></button></div>
  </div>;
}

function InsightsGuide() {
  return <section className={styles.insightsGuide}>
    <div className={styles.insightsGuideHead}><div><p>GDJE SU META INSIGHTS?</p><h2>Kao da prvi put držiš mobitel.</h2><span>Ne traži sve brojke odjednom. Otvori objavu, pritisni jednu tipku i prepiši označene vrijednosti.</span></div><div><strong>Važno</strong><span>Ovu opciju vidiš samo ako je Instagram profesionalni račun. Naziv gumba može biti “Prikaži uvide”, “View insights” ili samo “Insights”.</span></div></div>
    <div className={styles.insightScreens}>
      <article><div className={styles.screenStep}><b>1</b><span><strong>Otvori objavu</strong><small>Instagram aplikacija → Vesperin profil → dodirni objavu.</small></span></div><div className={styles.phone}><div className={styles.phoneTop}><Camera /> Instagram <span>•••</span></div><div className={styles.postProfile}><i>V</i><span><strong>vespera_namjestaj</strong><small>Karlovac</small></span></div><Image src="/content-os/fotelja-siroki-kadar.png" alt="Primjer Instagram objave" width={420} height={420} /><div className={styles.postIcons}><span>♡</span><MessageCircle /><Share2 /><Bookmark /></div><button className={styles.insightTarget}>Prikaži uvide <ArrowRight /></button><div className={styles.tapLabel}>PRITISNI OVDJE</div></div></article>
      <article><div className={styles.screenStep}><b>2</b><span><strong>Prepiši ove brojke</strong><small>Ne trebaš razumjeti cijeli ekran. Samo šest označenih polja.</small></span></div><div className={styles.phone}><div className={styles.phoneTop}><ArrowLeft /> Uvidi za objavu</div><div className={styles.insightOverview}><p>PREGLED</p><div><span><Eye /><small>Doseg</small><strong>1.876</strong></span><span><Bookmark /><small>Spremanja</small><strong>28</strong></span><span><Share2 /><small>Dijeljenja</small><strong>12</strong></span><span><MessageCircle /><small>Komentari</small><strong>6</strong></span></div></div><div className={styles.insightExplain}><b>PREPIŠI:</b><span>1.876 u “Doseg”</span><span>28 u “Spremanja”</span><span>12 u “Dijeljenja”</span><span>6 u “Komentari”</span></div></div></article>
      <article><div className={styles.screenStep}><b>3</b><span><strong>Za Facebook otvori Business Suite</strong><small>Meta Business Suite → Sadržaj → Objavljeno → odaberi istu objavu.</small></span></div><div className={styles.phone}><div className={styles.phoneTop}><BarChart3 /> Meta Business Suite</div><div className={styles.businessTabs}><b>Sadržaj</b><span>Uvidi</span></div><div className={styles.contentRow}><Image src="/content-os/fotelja-siroki-kadar.png" alt="Primjer Facebook objave" width={92} height={92} /><span><small>OBJAVLJENO</small><strong>Fotelja u vašem kutku mira</strong><em>Instagram + Facebook</em></span></div><button className={styles.insightTarget}>Pogledaj rezultate <ArrowRight /></button><div className={styles.fbNumbers}><span><small>Doseg</small><strong>942</strong></span><span><small>Reakcije</small><strong>31</strong></span><span><small>Dijeljenja</small><strong>8</strong></span></div></div></article>
      <article><div className={styles.screenStep}><b>4</b><span><strong>Vrati se u Content OS</strong><small>Otvori objavu → korak 5 “Objavi i zabilježi”.</small></span></div><div className={`${styles.phone} ${styles.osPhone}`}><div className={styles.phoneTop}><Image src="/brand/vespera-logo-horizontal.svg" alt="Vespera" width={100} height={30} /> Content OS</div><p>REZULTAT OBJAVE</p>{[['Doseg','1.876'],['Spremanja','28'],['Dijeljenja','12'],['Komentari','6']].map(([label,value]) => <label key={label}><span>{label}</span><strong>{value}</strong></label>)}<div className={styles.manualOnly}><b>SAMO OVO PROCJENJUJEŠ SAMA</b><span>Konkretni upiti: poruke, pozivi ili dolasci zbog objave.</span></div><button>Spremi rezultat <Check /></button></div></article>
    </div>
    <div className={styles.childSimple}><strong>Najkraće moguće:</strong><span>Otvori objavu → pritisni “Prikaži uvide” → prepiši četiri broja → dodaj koliko je bilo stvarnih upita → spremi.</span></div>
  </section>;
}

function LibraryView({ onUse }: { onUse: (item: ContentItem) => void }) {
  const [selectedFurniture, setSelectedFurniture] = useState(furnitureExamples[0].id);
  const [selectedFormat, setSelectedFormat] = useState<FurnitureExample['examples'][number]['format']>('Reel');
  const furniture = furnitureExamples.find((item) => item.id === selectedFurniture) ?? furnitureExamples[0];
  const example = furniture.examples.find((item) => item.format === selectedFormat) ?? furniture.examples[0];
  return <div className={styles.libraryPage}>
    <div className={styles.pageHeading}><div><p>BIBLIOTEKA GOTOVIH PRIMJERA</p><h1>Odaberi namještaj.<br />Mi dajemo recept.</h1><span>Za svaki proizvod dobivaš ideju, točne kadrove, početnu rečenicu, tekst i poziv na akciju.</span></div></div>
    <div className={styles.furnitureTabs} role="tablist">{furnitureExamples.map((item) => <button key={item.id} className={item.id === furniture.id ? styles.furnitureActive : ''} onClick={() => setSelectedFurniture(item.id)}><Armchair /><span>{item.name}</span></button>)}</div>
    <div className={styles.libraryGrid}>
      <aside className={styles.productBrief}><Image src={furniture.image} alt={furniture.name} width={520} height={560} /><p>ŠTO KUPAC ŽELI ZNATI</p><h2>{furniture.question}</h2><strong>Uvijek pokaži:</strong><ul>{furniture.mustShow.map((point) => <li key={point}><CheckCircle2 />{point}</li>)}</ul><div><X /><span><b>Izbjegavaj</b>{furniture.avoid}</span></div></aside>
      <section className={styles.templateArea}>
        <div className={styles.formatTabs}>{furniture.examples.map((item) => <button key={item.format} className={item.format === example.format ? styles.formatActive : ''} onClick={() => setSelectedFormat(item.format)}>{item.format}</button>)}</div>
        <div className={styles.templateHeader}><div><p>{example.format.toUpperCase()} · GOTOV PRIMJER</p><h2>{example.title}</h2><span>{example.purpose}</span></div><button className={styles.heroPrimary} onClick={() => onUse(exampleToItem(furniture, example))}>Koristi ovaj primjer <ArrowRight /></button></div>
        <div className={styles.templateBlock}><p>HOOK / PRVA REČENICA</p><blockquote>{example.hook}</blockquote></div>
        <div className={styles.recipe}><p>TOČAN REDOSLIJED</p><ol>{example.recipe.map((step, index) => <li key={step}><span>{index + 1}</span><div><strong>{step}</strong><small>{example.format === 'Karusel' ? `Slajd ${index + 1}` : example.format === 'Fotografija' ? 'Provjera kadra' : `Kadar ${index + 1}`}</small></div></li>)}</ol></div>
        <div className={styles.copyTemplate}><div><p>PREDLOŽAK TEKSTA</p><span>{example.captionTemplate}</span></div><div><p>POZIV NA AKCIJU</p><strong>{example.cta}</strong></div></div>
      </section>
    </div>
  </div>;
}

function GuideView({ item, step, setStep, status, approvalRequired, checkedShots, toggleShot, caption, setCaption, cta, setCta, copyCaption, copied, setStatus, analytics, setAnalytics, onOpenPlan }: {
  item: ContentItem; step: number; setStep: (step: number) => void; status: ContentStatus; approvalRequired: boolean; checkedShots: number[]; toggleShot: (index: number) => void;
  caption: string; setCaption: (value: string) => void; cta: string; setCta: (value: string) => void; copyCaption: () => void; copied: boolean;
  setStatus: (id: string, status: ContentStatus) => void; analytics?: AnalyticsRecord; setAnalytics: (id: string, field: keyof AnalyticsRecord, value: number | string) => void; onOpenPlan: () => void;
}) {
  const isChairExample = item.id.includes('fotelja');
  const examples = isChairExample ? [
    { src: item.image, label: 'Širi kadar', note: 'Pokaži proizvod u prostoru.' },
    { src: '/content-os/fotelja-detalj.png', label: 'Detalj', note: 'Pokaži materijal i teksturu.' },
    { src: '/content-os/fotelja-u-upotrebi.png', label: 'U uporabi', note: 'Pokaži kako se proizvod koristi.' },
    { src: '/brand/vespera-brand-reference.jpeg', label: 'Završni kadar', note: 'Ostavi prostora za lokaciju.' },
  ] : [
    { src: item.image, label: 'Proizvod', note: 'Prvo pokaži cijeli proizvod.' },
    { src: item.image, label: 'Funkcija', note: 'Zatim pokaži uporabu ili rješenje.' },
    { src: item.image, label: 'Detalj', note: 'Približi materijal, okov ili izvedbu.' },
    { src: '/brand/vespera-brand-reference.jpeg', label: 'Završetak', note: 'Dodaj jasan sljedeći korak.' },
  ];
  return <>
    <div className={styles.pageHeading}>
      <div><p>VESPERA CONTENT OS</p><h1>{step === 1 ? 'Odaberi cilj' : step === 2 ? 'Snimi materijal' : step === 3 ? 'Složi objavu' : step === 4 ? 'Pošalji na odobrenje' : 'Objavi i zabilježi'}</h1></div>
      <button className={styles.textButton} onClick={onOpenPlan}><CalendarDays /> Otvori tromjesečni plan</button>
    </div>
    <ol className={styles.stepper}>
      {stepMeta.map((meta, index) => { const number = index + 1; const Icon = meta.icon; return <li key={meta.label}><button onClick={() => setStep(number)} className={number === step ? styles.stepActive : number < step ? styles.stepDone : ''}><span>{number < step ? <Check /> : <Icon />}</span><b>{number}. {meta.label}</b><small>{number === step ? 'U tijeku' : number < step ? 'Gotovo' : 'Slijedi'}</small></button></li>; })}
    </ol>
    <div className={styles.guideGrid}>
      <section className={styles.guideMain}>
        <p className={styles.kicker}>KORAK {step} / 5 · {item.format} · {formatDate(item.date)}</p>
        {step === 1 && <GoalStep item={item} />}
        {step === 2 && <ShootStep item={item} examples={examples} checkedShots={checkedShots} toggleShot={toggleShot} />}
        {step === 3 && <CopyStep item={item} caption={caption} setCaption={setCaption} cta={cta} setCta={setCta} copyCaption={copyCaption} copied={copied} />}
        {step === 4 && <ApprovalStep item={item} status={status} approvalRequired={approvalRequired} setStatus={setStatus} />}
        {step === 5 && <PublishStep item={item} status={status} analytics={analytics} setAnalytics={setAnalytics} setStatus={setStatus} />}
      </section>
      <aside className={styles.guideAside}>
        <div className={styles.tip}><p>SAVJET</p><h3>{step === 2 ? 'Prirodno svjetlo radi čuda.' : step === 3 ? 'Jedna objava, jedna poruka.' : 'Provjeri prije nego nastaviš.'}</h3><span>{step === 2 ? 'Snimi uz dnevno svjetlo, drži mobitel stabilno i pokaži prostor onako kako doista izgleda.' : step === 3 ? 'Prvu rečenicu neka osoba razumije bez dodatnog konteksta.' : 'Ako podatak nije potvrđen, označi ga Nataliji umjesto da nagađaš.'}</span></div>
        <div className={styles.dosDonts}><p>DA — OVO RADI</p><ul><li><CheckCircle2 /> Snimaj iz prirodnog svjetla</li><li><CheckCircle2 /> Drži mobitel uspravno</li><li><CheckCircle2 /> Pokaži stvaran prostor</li><li><CheckCircle2 /> Uključi detalje i atmosferu</li></ul><p className={styles.dont}>NE — OVO IZBJEGAVAJ</p><ul className={styles.noList}><li><X /> Ne dodaj filtre koji mijenjaju boju</li><li><X /> Ne skrivaj dimenzije i uvjete</li><li><X /> Ne obećavaj rok bez potvrde</li><li><X /> Ne koristi više od jednog glavnog CTA-a</li></ul></div>
      </aside>
    </div>
    <div className={styles.bottomAction}>
      <div><LayoutList /><span><strong>{status}</strong><small>Napredak se automatski sprema na ovom uređaju.</small></span></div>
      <button disabled={step === 1} onClick={() => setStep(Math.max(1, step - 1))}><ArrowLeft /> Natrag</button>
      <button className={styles.primary} onClick={() => { if (step === 2) setStatus(item.id, 'U pripremi'); if (step < 5) setStep(step + 1); }}>{step === 5 ? 'Spremi rezultat' : step === 2 ? 'Materijal je spreman' : 'Nastavi'} <ArrowRight /></button>
    </div>
  </>;
}

function GoalStep({ item }: { item: ContentItem }) {
  return <div className={styles.flowSection}><h2>{item.title}</h2><p className={styles.lead}>{item.goal}</p><div className={styles.choiceGrid}><button className={styles.choiceActive}><Target /><span><b>Primarni cilj</b><small>{item.goal}</small></span><CheckCircle2 /></button><button><MessageSquareText /><span><b>Glavni hook</b><small>{item.hook}</small></span></button><button><Send /><span><b>Poziv na akciju</b><small>{item.cta}</small></span></button></div><div className={styles.infoStrip}><strong>Tematski stup</strong><span>{item.pillar}</span><strong>Kanali</strong><span>{item.channels.join(' + ')}</span><strong>Format</strong><span>{item.format}</span></div></div>;
}

function ShootStep({ item, examples, checkedShots, toggleShot }: { item: ContentItem; examples: { src: string; label: string; note: string }[]; checkedShots: number[]; toggleShot: (index: number) => void }) {
  const instruction = item.format === 'Karusel' ? 'Pripremi svaki slajd prema redoslijedu. Fotografije snimi na dnevnom svjetlu, a na svakom slajdu zadrži samo jednu jasnu poruku.' : item.format === 'Fotografija' ? 'Snimi nekoliko verzija glavnog kadra pa odaberi onu na kojoj se najbolje vide proporcije, boja i važan detalj.' : item.format === 'Story' ? 'Snimi kratke vertikalne Storyje redom. Svaki treba imati jednu poruku i dovoljno praznog prostora za tekst ili anketu.' : 'Snimi nekoliko kratkih kadrova prema uputama. Nije potrebna profesionalna oprema — dovoljan je mobitel i dobro svjetlo.';
  return <div className={styles.flowSection}><h2>{item.title}</h2><p className={styles.lead}>{instruction}</p><p className={styles.sectionLabel}>VIZUALNI REDOSLIJED</p><div className={styles.exampleGrid}>{examples.map((example, index) => <figure key={example.label}><Image src={example.src} alt={example.label} width={420} height={520} loading={index === 0 ? 'eager' : 'lazy'} sizes="(max-width: 900px) 46vw, 18vw" /><figcaption><b><span>{index + 1}</span>{example.label}</b><small>{example.note}</small></figcaption></figure>)}</div><div className={styles.specRow}><div><span>ORIJENTACIJA</span><strong>{item.orientation}</strong></div><div><span>OPSEG</span><strong>{item.duration}</strong></div><div><span>OBAVEZNO</span><strong>{item.shots.length} elemenata</strong></div></div><div className={styles.checklist}><div><ClipboardCheck /><span><strong>Kratka provjera materijala</strong><small>Označi element tek nakon što ga pregledaš.</small></span></div>{item.shots.map((shot, index) => <label key={shot}><input type="checkbox" checked={checkedShots.includes(index)} onChange={() => toggleShot(index)} /><span>{shot}</span></label>)}</div></div>;
}

function CopyStep({ item, caption, setCaption, cta, setCta, copyCaption, copied }: { item: ContentItem; caption: string; setCaption: (value: string) => void; cta: string; setCta: (value: string) => void; copyCaption: () => void; copied: boolean }) {
  return <div className={styles.flowSection}><h2>Tekst je već pripremljen.</h2><p className={styles.lead}>Prilagodi samo potvrđene podatke. Zadrži jednu poruku i jedan poziv na akciju.</p><label className={styles.field}><span>HOOK / PRVA REČENICA</span><input value={item.hook} readOnly /></label><label className={styles.field}><span>TEKST OBJAVE</span><textarea value={caption} onChange={(event) => setCaption(event.target.value)} rows={9} /></label><label className={styles.field}><span>POZIV NA AKCIJU</span><input value={cta} onChange={(event) => setCta(event.target.value)} /></label><button className={styles.copyButton} onClick={copyCaption}>{copied ? <Check /> : <Copy />}{copied ? 'Kopirano' : 'Kopiraj tekst i CTA'}</button></div>;
}

function ApprovalStep({ item, status, approvalRequired, setStatus }: { item: ContentItem; status: ContentStatus; approvalRequired: boolean; setStatus: (id: string, status: ContentStatus) => void }) {
  return <div className={styles.flowSection}><h2>{approvalRequired ? 'Natalija treba provjeriti samo činjenice.' : 'Objava je spremna za završnu provjeru.'}</h2><p className={styles.lead}>{approvalRequired ? 'Vizual, struktura i tekst su spremni. Označi podatke koji se moraju potvrditi na dan objave.' : 'Odobrenje je isključeno u postavkama. Valentina može provjeriti podatke i nastaviti na objavu.'}</p><div className={styles.approvalBox}>{item.factsToConfirm.length ? item.factsToConfirm.map((fact) => <label key={fact}><input type="checkbox" /> <span>{fact}</span></label>) : <p>Nema dodatnih prodajnih podataka za potvrdu.</p>}</div><div className={styles.approvalSummary}><div><span>Tema</span><strong>{item.title}</strong></div><div><span>Datum</span><strong>{formatDate(item.date)}</strong></div><div><span>Status</span><strong>{status}</strong></div></div><button className={styles.largePrimary} onClick={() => setStatus(item.id, approvalRequired ? 'Čeka odobrenje' : 'Odobreno')}>{approvalRequired ? <Send /> : <CheckCircle2 />} {approvalRequired ? 'Pošalji Nataliji na odobrenje' : 'Označi spremno za objavu'}</button></div>;
}

function PublishStep({ item, status, analytics, setAnalytics, setStatus }: { item: ContentItem; status: ContentStatus; analytics?: AnalyticsRecord; setAnalytics: (id: string, field: keyof AnalyticsRecord, value: number | string) => void; setStatus: (id: string, status: ContentStatus) => void }) {
  const record = analytics ?? { reach: 0, saves: 0, shares: 0, comments: 0, clicks: 0, inquiries: 0, lesson: '' };
  const fields: { key: Exclude<keyof AnalyticsRecord, 'lesson'>; label: string; source: string }[] = [
    { key: 'reach', label: 'Doseg', source: 'Instagram / Facebook Insights' },
    { key: 'saves', label: 'Spremanja', source: 'Instagram Insights' },
    { key: 'shares', label: 'Dijeljenja', source: 'Instagram / Facebook Insights' },
    { key: 'comments', label: 'Komentari', source: 'Instagram / Facebook' },
    { key: 'clicks', label: 'Klikovi', source: 'Meta Insights' },
    { key: 'inquiries', label: 'Konkretni upiti', source: 'Valentina označava ručno' },
  ];
  return <div className={styles.flowSection}><h2>Objavi, pa se vrati za 48 sati.</h2><p className={styles.lead}>U prvoj verziji Valentina prepisuje pet brojki iz Meta Insightsa. Samo konkretne prodajne upite označava prema porukama, pozivima i dolascima u salon.</p><div className={styles.sourceNotice}><Database /><div><strong>Trenutačno: jednostavan ručni unos</strong><span>Kasnije se osnovne Meta brojke mogu povlačiti automatski. Upiti ostaju ručni jer ih treba poslovno procijeniti.</span></div></div><div className={styles.metricGrid}>{fields.map((field) => <label key={field.key}><span>{field.label}</span><input type="number" min="0" value={record[field.key]} onChange={(event) => setAnalytics(item.id, field.key, Number(event.target.value))} /><small>{field.source}</small></label>)}</div><label className={styles.field}><span>ŠTO SMO NAUČILI?</span><textarea rows={4} value={record.lesson} onChange={(event) => setAnalytics(item.id, 'lesson', event.target.value)} placeholder="Npr. ljudi su najviše spremali kadar s mjerama; sljedeći put temu pretvoriti u karusel." /></label><button className={styles.largePrimary} onClick={() => setStatus(item.id, 'Objavljeno')}><CheckCircle2 /> {status === 'Objavljeno' ? 'Rezultat je spremljen' : 'Spremi rezultat i označi objavljeno'}</button></div>;
}

function PlanView({ items, weeks, weekFilter, setWeekFilter, pillarFilter, setPillarFilter, statuses, onSelect }: { items: ContentItem[]; weeks: number[]; weekFilter: number | 'all'; setWeekFilter: (value: number | 'all') => void; pillarFilter: string; setPillarFilter: (value: string) => void; statuses: Record<string, ContentStatus>; onSelect: (item: ContentItem) => void }) {
  return <div className={styles.listPage}><div className={styles.pageHeading}><div><p>19. 10. 2026. — 15. 1. 2027.</p><h1>Plan za 13 tjedana</h1><span>39 glavnih objava · 3 objave tjedno · materijal za Story iz svake objave</span></div></div><div className={styles.filters}><label>Tjedan<select value={weekFilter} onChange={(event) => setWeekFilter(event.target.value === 'all' ? 'all' : Number(event.target.value))}><option value="all">Svi tjedni</option>{weeks.map((week) => <option key={week} value={week}>Tjedan {week}</option>)}</select></label><label>Tema<select value={pillarFilter} onChange={(event) => setPillarFilter(event.target.value)}><option>Sve teme</option>{contentPillars.map((pillar) => <option key={pillar.name}>{pillar.name}</option>)}</select></label><div className={styles.planCount}><strong>{items.length}</strong><span>prikazanih objava</span></div></div><div className={styles.planTable}><div className={styles.planHead}><span>Datum</span><span>Objava</span><span>Tema / format</span><span>Status</span><span /></div>{items.map((entry) => { const status = statuses[entry.id] ?? entry.status; return <button className={styles.planRow} key={entry.id} onClick={() => onSelect(entry)}><span>{formatDate(entry.date)}<small>Tjedan {entry.week}</small></span><span><strong>{entry.title}</strong><small>{entry.goal}</small></span><span><b>{entry.pillar}</b><small>{entry.format} · {entry.channels.join(' + ')}</small></span><span><i className={statusClass(status)}>{status}</i></span><ArrowRight /></button>; })}</div></div>;
}

function ApprovalView({ items, onSelect, setStatus }: { items: ContentItem[]; onSelect: (item: ContentItem, step?: number) => void; setStatus: (id: string, status: ContentStatus) => void }) {
  return <div className={styles.listPage}><div className={styles.pageHeading}><div><p>NATALIJIN PREGLED</p><h1>Odobrenja</h1><span>Provjeri činjenice. Valentina je već pripremila format, kadrove i tekst.</span></div></div>{items.length === 0 ? <div className={styles.empty}><CheckCircle2 /><h2>Sve je pregledano.</h2><p>Kada Valentina pošalje objavu, pojavit će se ovdje.</p></div> : <div className={styles.approvalList}>{items.map((entry) => <article key={entry.id}><Image src={entry.image} alt="" width={220} height={220} /><div><p>{formatDate(entry.date)} · {entry.format}</p><h2>{entry.title}</h2><span>{entry.factsToConfirm.join(' · ') || 'Nema dodatnih podataka za potvrdu.'}</span></div><div className={styles.approvalActions}><button onClick={() => onSelect(entry, 4)}>Pregledaj</button><button className={styles.primary} onClick={() => setStatus(entry.id, 'Odobreno')}><Check /> Odobri</button></div></article>)}</div>}</div>;
}

function GuidelinesView() {
  return <div className={styles.listPage}><div className={styles.pageHeading}><div><p>VALENTININ PRIRUČNIK</p><h1>Kako radimo sadržaj</h1><span>Ako nisi sigurna, slijedi ova pravila. Ne moraš izmišljati novi proces.</span></div></div><section className={styles.guideBook}><div><p>TJEDNI RITAM</p><h2>Jedno snimanje, cijeli tjedan sadržaja.</h2><ol><li><b>Ponedjeljak</b><span>Praktičan savjet koji ljudi spremaju.</span></li><li><b>Srijeda</b><span>Proizvod, funkcija ili kuhinjski detalj.</span></li><li><b>Petak</b><span>Salon, tim, realizacija ili konkretna ponuda.</span></li></ol></div><div><p>ŠEST PRAVILA</p><ul>{publishingRules.map((rule) => <li key={rule}><Check /> {rule}</li>)}</ul></div></section><section className={styles.pillars}><p>TEMATSKI STUPOVI</p>{contentPillars.map((pillar) => <article key={pillar.name}><strong>{pillar.share}</strong><h3>{pillar.name}</h3><span>{pillar.purpose}</span></article>)}</section><section className={styles.voiceGuide}><div className={styles.voiceIntro}><p>TOV SMJER · NENAD VUKUŠIĆ</p><h2>Rečenica treba zvučati kao čovjek, a pomoći kao stručnjak.</h2><span>{toneRules.promise}</span><blockquote>“Pošaljite fotografiju i tri osnovne mjere. Reći ćemo vam s čime ima smisla krenuti.”</blockquote><small>{toneRules.note}</small></div><div className={styles.voiceRules}><div><p>KORISTIMO</p>{toneRules.use.map((rule, index) => <span key={rule}><b>{String(index + 1).padStart(2, '0')}</b>{rule}<Check /></span>)}</div><div><p>IZBJEGAVAMO</p>{toneRules.avoid.map((rule, index) => <span key={rule}><b>{String(index + 1).padStart(2, '0')}</b>{rule}<X /></span>)}</div></div></section><section className={styles.rewriteSection}><div><p>PRIMJERI PRIJE / POSLIJE</p><h2>Makni reklamni sloj. Ostavi ono što kupcu koristi.</h2><span>Valentina može svaki tekst provjeriti na isti način: stvarna situacija, konkretna informacija, lagan sljedeći korak.</span></div><div className={styles.rewriteGrid}>{toneRules.rewrites.map((example, index) => <article key={example.before}><small>PRIMJER {String(index + 1).padStart(2, '0')}</small><div><b>PRIJE</b><p>{example.before}</p></div><div><b>POSLIJE</b><p>{example.after}</p></div></article>)}</div></section></div>;
}

function SettingsView({ settings, setSettings, saved, onSave, onAnalytics, onEducation }: {
  settings: SystemSettings; setSettings: (settings: SystemSettings) => void; saved: boolean; onSave: () => void; onAnalytics: () => void; onEducation: () => void;
}) {
  return <div className={styles.settingsPage}>
    <div className={styles.settingsHeading}>
      <div><p>POSTAVKE SUSTAVA</p><h1>Prilagodi način rada.</h1><span>Ove se postavke spremaju na ovom uređaju i odmah prilagođavaju dashboard.</span></div>
      <button className={styles.settingsSave} onClick={onSave}>{saved ? <CheckCircle2 /> : <Save />}{saved ? 'Spremljeno' : 'Spremi postavke'}</button>
    </div>

    <div className={styles.settingsLayout}>
      <section className={styles.settingsCard}>
        <div className={styles.settingsCardHead}><span>01</span><div><p>POČETNI PROFIL</p><h2>Tko najčešće otvara alat?</h2></div></div>
        <div className={styles.roleChoices}>
          {(['Valentina', 'Natalija'] as ActiveRole[]).map((role) => <button key={role} className={settings.defaultRole === role ? styles.settingSelected : ''} onClick={() => setSettings({ ...settings, defaultRole: role })}><span>{role.slice(0, 1)}</span><div><strong>{role}</strong><small>{role === 'Valentina' ? 'Priprema i objavljuje' : 'Pregledava i odobrava'}</small></div>{settings.defaultRole === role && <Check />}</button>)}
        </div>
        <small className={styles.settingHelp}>Odabrani profil pojavit će se nakon svakog novog otvaranja aplikacije.</small>
      </section>

      <section className={styles.settingsCard}>
        <div className={styles.settingsCardHead}><span>02</span><div><p>TJEDNI RITAM</p><h2>Koliko glavnih objava planiramo?</h2></div></div>
        <div className={styles.goalChoices}>{([2, 3, 4] as const).map((goal) => <button key={goal} className={settings.weeklyGoal === goal ? styles.settingSelected : ''} onClick={() => setSettings({ ...settings, weeklyGoal: goal })}><strong>{goal}</strong><small>{goal === 2 ? 'mirniji ritam' : goal === 3 ? 'preporučeno' : 'pojačani ritam'}</small></button>)}</div>
        <small className={styles.settingHelp}>Dashboard će prikazati isti broj sljedećih objava. Plan za tri mjeseca ostaje sačuvan.</small>
      </section>

      <section className={styles.settingsCard}>
        <div className={styles.settingsCardHead}><span>03</span><div><p>TIJEK ODOBRAVANJA</p><h2>Kontrola prije objave</h2></div></div>
        <label className={styles.settingToggle} aria-label="Natalijino odobrenje"><div><strong>Natalijino odobrenje</strong><small>Valentina šalje objavu na pregled prije objavljivanja.</small></div><input type="checkbox" checked={settings.approvalRequired} onChange={(event) => setSettings({ ...settings, approvalRequired: event.target.checked })} /><i /></label>
        <label className={styles.settingToggle} aria-label="Podsjetnik nakon 48 sati"><div><strong>Podsjetnik nakon 48 sati</strong><small>Podsjeti Valentinu da prepiše rezultate objave.</small></div><input type="checkbox" checked={settings.reminders} onChange={(event) => setSettings({ ...settings, reminders: event.target.checked })} /><i /></label>
      </section>

      <section className={styles.settingsCard}>
        <div className={styles.settingsCardHead}><span>04</span><div><p>KANALI</p><h2>Gdje Vespera objavljuje?</h2></div></div>
        <label className={styles.settingToggle} aria-label="Instagram"><div><strong>Instagram</strong><small>Reel, karusel, fotografija i Story</small></div><input type="checkbox" checked={settings.instagram} onChange={(event) => setSettings({ ...settings, instagram: event.target.checked })} /><i /></label>
        <label className={styles.settingToggle} aria-label="Facebook"><div><strong>Facebook</strong><small>Fotografije, video i poveznice</small></div><input type="checkbox" checked={settings.facebook} onChange={(event) => setSettings({ ...settings, facebook: event.target.checked })} /><i /></label>
      </section>
    </div>

    <section className={styles.integrationSection}>
      <div className={styles.integrationIntro}><p>ANALITIKA I POVEZIVANJA</p><h2>Što je povezano, a što unosimo ručno?</h2><span>Ovdje uvijek vidiš stvarno stanje. Sustav neće prikazivati automatske rezultate dok povezivanje nije napravljeno.</span></div>
      <div className={styles.integrationGrid}>
        <article><Database /><div><span className={styles.statusReady}>AKTIVNO</span><h3>Rezultati u Content OS-u</h3><p>Doseg, spremanja, dijeljenja, klikove i upite trenutačno unosite ručno za svaku objavu.</p></div><button onClick={onAnalytics}>Otvori rezultate <ArrowRight /></button></article>
        <article><Bell /><div><span className={styles.statusLocal}>NA OVOM UREĐAJU</span><h3>Podsjetnici</h3><p>Postavka je spremljena, ali automatske e-mail i mobilne obavijesti još nisu povezane.</p></div><button onClick={onEducation}>Pogledaj postupak <ArrowRight /></button></article>
        <article><Link2 /><div><span className={styles.statusPlanned}>NIJE POVEZANO</span><h3>Meta i Google analitika</h3><p>Za automatske brojke trebaju Meta API, Google Analytics i dozvole vlasnika računa.</p></div><button onClick={onEducation}>Kako sada mjerimo <ArrowRight /></button></article>
      </div>
    </section>

    <div className={styles.mobileSettingsSave}><button onClick={onSave}>{saved ? <CheckCircle2 /> : <Save />}{saved ? 'Postavke su spremljene' : 'Spremi postavke'}</button></div>
  </div>;
}

function ResultsView({ published, analytics, statuses, onSelect }: { published: ContentItem[]; analytics: Record<string, AnalyticsRecord>; statuses: Record<string, ContentStatus>; onSelect: (item: ContentItem, step?: number) => void }) {
  const allItems = [activeGuideItem, ...contentPlan];
  const trackedItems = allItems.filter((item) => analytics[item.id] || (statuses[item.id] ?? item.status) === 'Objavljeno');
  const totals = Object.values(analytics).reduce((sum, record) => ({ reach: sum.reach + record.reach, saves: sum.saves + record.saves, shares: sum.shares + record.shares, inquiries: sum.inquiries + record.inquiries }), { reach: 0, saves: 0, shares: 0, inquiries: 0 });
  const formatScores = allItems.reduce<Record<string, number>>((scores, item) => { const record = analytics[item.id]; if (record) scores[item.format] = (scores[item.format] ?? 0) + record.saves + record.shares + record.inquiries; return scores; }, {});
  const topFormat = Object.entries(formatScores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Još nema podataka';
  const nextForEntry = published[0] ?? activeGuideItem;
  return <div className={styles.resultsPage}>
    <div className={styles.resultsHeading}><div><p>UČENJE IZ SADRŽAJA</p><h1>Rezultati bez kompliciranja.</h1><span>Brojke unosimo 48 sati nakon objave. Sustav ih veže uz temu i format kako bismo znali što ponoviti.</span></div><div className={styles.trackingBadge}><Database /><span><small>NAČIN PRAĆENJA</small><strong>Ručni unos iz Meta Insightsa</strong><em>oko 2 minute po objavi</em></span></div></div>
    <section className={styles.resultSummary}><article><span>Objavljeno</span><strong>{published.length}</strong><small>objava</small></article><article><span>Ukupan doseg</span><strong>{totals.reach.toLocaleString('hr-HR')}</strong><small>Instagram + Facebook</small></article><article><span>Korisne reakcije</span><strong>{(totals.saves + totals.shares).toLocaleString('hr-HR')}</strong><small>spremanja + dijeljenja</small></article><article><span>Konkretni upiti</span><strong>{totals.inquiries}</strong><small>ručno potvrđeni</small></article><article><span>Najbolji format</span><strong>{topFormat}</strong><small>prema korisnim reakcijama</small></article></section>
    <section className={styles.analyticsFlow}><div><p>KAKO DOLAZIMO DO BROJKI</p><h2>Jedna kratka provjera nakon svake objave.</h2></div><ol><li><b>01</b><span><strong>Objavi sadržaj</strong><small>Označi objavu kao objavljenu.</small></span></li><li><b>02</b><span><strong>Pričekaj 48 sati</strong><small>Brojke tada možemo poštenije usporediti.</small></span></li><li><b>03</b><span><strong>Prepiši Insights</strong><small>Doseg, spremanja, dijeljenja, komentare i klikove.</small></span></li><li><b>04</b><span><strong>Označi upite</strong><small>Poruke, pozivi ili dolasci povezani s objavom.</small></span></li></ol></section>
    <section className={styles.connectionNote}><div><Database /><span><small>SADA</small><strong>Valentina ručno unosi osnovne brojke.</strong><em>Najbrže za početak i bez dodatnih troškova.</em></span></div><ArrowRight /><div><Sparkles /><span><small>KASNIJE</small><strong>Meta automatski šalje analitiku.</strong><em>Upiti i dalje ostaju ručni jer traže ljudsku procjenu.</em></span></div></section>
    <section className={styles.resultEntries}><div className={styles.panelTitle}><div><p>REZULTATI PO OBJAVI</p><h2>{trackedItems.length ? 'Objave koje pratimo' : 'Još nema unesenih rezultata'}</h2></div><button onClick={() => onSelect(nextForEntry, 5)}>Unesi prve rezultate <ArrowRight /></button></div>{trackedItems.length ? <div className={styles.resultRows}>{trackedItems.map((item) => { const record = analytics[item.id] ?? { reach: 0, saves: 0, shares: 0, comments: 0, clicks: 0, inquiries: 0, lesson: '' }; return <button key={item.id} onClick={() => onSelect(item, 5)}><span><small>{item.format} · {item.pillar}</small><strong>{item.title}</strong></span><span><small>Doseg</small><b>{record.reach.toLocaleString('hr-HR')}</b></span><span><small>Spremanja</small><b>{record.saves}</b></span><span><small>Dijeljenja</small><b>{record.shares}</b></span><span><small>Upiti</small><b>{record.inquiries}</b></span><ArrowRight /></button>; })}</div> : <div className={styles.firstResult}><div><strong>1</strong><span>Objavi sadržaj</span></div><div><strong>2</strong><span>Vrati se za 48 sati</span></div><div><strong>3</strong><span>Prepiši šest brojki</span></div><button onClick={() => onSelect(nextForEntry, 5)}>Otvori obrazac za unos <ArrowRight /></button></div>}</section>
  </div>;
}
