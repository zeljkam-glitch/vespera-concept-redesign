'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BarChart3, BookOpen, CalendarDays, Check, ClipboardList, Lightbulb, Megaphone, Plus, Search, Sparkles, Target, Trash2, Users } from 'lucide-react';
import styles from './ads-measurement.module.css';

type Role = 'Valentina' | 'Natalija';
type Channel = 'Google' | 'Meta' | 'ChatGPT';
type Tab = 'overview' | 'plan' | 'tracker' | 'education';
type ChannelResult = { budget: number; spend: number; inquiries: number; qualified: number; visits: number; offers: number; sales: number; revenue: number };
type Lead = { id: string; date: string; source: Channel | 'Organski' | 'Preporuka' | 'Prolaznik'; campaign: string; category: string; status: 'Novi upit' | 'Kvalificiran' | 'Dolazak' | 'Ponuda' | 'Prodaja'; value: number };
type AdsState = { setup: boolean[]; results: Record<Channel, ChannelResult>; leads: Lead[] };

const emptyResult = (budget: number): ChannelResult => ({ budget, spend: 0, inquiries: 0, qualified: 0, visits: 0, offers: 0, sales: 0, revenue: 0 });
const defaultState: AdsState = { setup: [false, false, false, false, false], results: { Google: emptyResult(600), Meta: emptyResult(600), ChatGPT: emptyResult(450) }, leads: [] };
const setupSteps = ['Dogovoriti što je kvalitetan upit', 'Postaviti GA4 i Google Ads konverzije', 'Postaviti Meta Pixel i označene poveznice', 'Dodati pitanje „Kako ste nas pronašli?”', 'Otvoriti jednu zajedničku evidenciju upita'];
const phases = [
  { number: '00', period: 'Prije oglasa · 1 tjedan', title: 'Postavi mjerenje', copy: 'Dogovori ciljeve, označi poveznice i provjeri da se bilježe obrasci, pozivi i dolasci.' },
  { number: '01', period: 'Tjedni 1–4', title: 'Google + Meta uče', copy: 'Ne gasimo kampanju nakon nekoliko dana. Pratimo kvalitetne upite i popravljamo samo očite probleme.' },
  { number: '02', period: 'Tjedni 5–8', title: 'Usporedi kvalitetu', copy: 'Gledamo koji kanal donosi dolaske, ponude i prodaju, a ne samo jeftine klikove.' },
  { number: '03', period: 'Nakon 60 dana · 6 tjedana', title: 'Testiraj ChatGPT', copy: 'Dodajemo ga kao zaseban eksperiment s vlastitim budžetom i odvojenom oznakom izvora.' },
];

function money(value: number) { return new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value); }
function metric(value: number, fallback = '—') { return Number.isFinite(value) && value > 0 ? money(value) : fallback; }

export function AdsMeasurement({ role }: { role: Role }) {
  const [tab, setTab] = useState<Tab>('overview');
  const [state, setState] = useState<AdsState>(defaultState);
  const [saved, setSaved] = useState(false);
  const [lead, setLead] = useState<Omit<Lead, 'id'>>({ date: '2026-10-17', source: 'Google', campaign: 'google_pretraga_namjestaj', category: 'Garnitura', status: 'Novi upit', value: 0 });

  useEffect(() => {
    const stored = window.localStorage.getItem('vespera-ads-measurement-v1');
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as AdsState;
      const frame = window.requestAnimationFrame(() => setState(parsed));
      return () => window.cancelAnimationFrame(frame);
    } catch { /* keep safe defaults */ }
  }, []);

  const channelTotals = useMemo(() => Object.entries(state.results) as [Channel, ChannelResult][], [state.results]);
  const totals = channelTotals.reduce((sum, [, item]) => ({ spend: sum.spend + item.spend, inquiries: sum.inquiries + item.inquiries, qualified: sum.qualified + item.qualified, visits: sum.visits + item.visits, sales: sum.sales + item.sales, revenue: sum.revenue + item.revenue }), { spend: 0, inquiries: 0, qualified: 0, visits: 0, sales: 0, revenue: 0 });
  const setupDone = state.setup.filter(Boolean).length;

  function persist(next = state) {
    window.localStorage.setItem('vespera-ads-measurement-v1', JSON.stringify(next));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  function updateResult(channel: Channel, field: keyof ChannelResult, value: number) {
    setState((current) => ({ ...current, results: { ...current.results, [channel]: { ...current.results[channel], [field]: value } } }));
  }

  function addLead() {
    const next = { ...state, leads: [{ ...lead, id: `${Date.now()}` }, ...state.leads] };
    setState(next);
    persist(next);
    setLead((current) => ({ ...current, campaign: '', value: 0 }));
  }

  return <div className={styles.page}>
    <header className={styles.hero}>
      <div><p>VESPERA · OGLASI I MJERENJE</p><h1>Od oglasa do stvarnog kupca.</h1><span>{role === 'Valentina' ? 'Tvoj dio je jednostavan: koristi označenu poveznicu, zapiši izvor upita i jednom tjedno unesi rezultate.' : 'Ovdje vidiš koliko ulažemo, koji kanal donosi kvalitetne upite i pretvaraju li se oni u dolaske, ponude i prodaju.'}</span></div>
      <aside><Target /><div><small>TRENUTAČNI PLAN</small><strong>60 dana Google + Meta</strong><span>Zatim zaseban ChatGPT test od 6 tjedana</span></div></aside>
    </header>

    <nav className={styles.tabs} aria-label="Oglasi i mjerenje">
      <button className={tab === 'overview' ? styles.active : ''} onClick={() => setTab('overview')}><BarChart3 /> Pregled</button>
      <button className={tab === 'plan' ? styles.active : ''} onClick={() => setTab('plan')}><CalendarDays /> Plan testa</button>
      <button className={tab === 'tracker' ? styles.active : ''} onClick={() => setTab('tracker')}><ClipboardList /> Rezultati i upiti</button>
      <button className={tab === 'education' ? styles.active : ''} onClick={() => setTab('education')}><BookOpen /> Edukacija i ideje</button>
    </nav>

    {tab === 'overview' && <>
      <section className={styles.kpis}>
        <article><span>Uloženo</span><strong>{money(totals.spend)}</strong><small>Google + Meta + ChatGPT</small></article>
        <article><span>Kvalitetni upiti</span><strong>{totals.qualified}</strong><small>{metric(totals.spend / totals.qualified)} po upitu</small></article>
        <article><span>Dolasci u salon</span><strong>{totals.visits}</strong><small>iz evidentiranih kampanja</small></article>
        <article><span>Prodaje</span><strong>{totals.sales}</strong><small>{totals.revenue ? `${money(totals.revenue)} prihoda` : 'još nema podataka'}</small></article>
      </section>
      <section className={styles.decisionGrid}>
        {channelTotals.map(([channel, result]) => {
          const enough = result.spend >= 100 || result.inquiries >= 5;
          const decision = channel === 'ChatGPT' && result.spend === 0 ? 'Pokrenuti nakon 60 dana osnovnog testa.' : !enough ? 'Prerano za zaključak. Nastavi prikupljati podatke.' : result.qualified === 0 ? 'Upiti nisu dovoljno kvalitetni. Promijeni poruku ili cilj.' : result.sales > 0 ? 'Kanal donosi prodaju. Zadrži ga i testiraj jednu novu varijantu.' : 'Prati put od kvalitetnog upita do ponude prije promjene budžeta.';
          return <article key={channel} className={channel === 'ChatGPT' ? styles.futureCard : ''}><div><ChannelIcon channel={channel} /><span>{channel === 'ChatGPT' ? 'KASNIJI EKSPERIMENT' : 'AKTIVNI TEST'}</span></div><h2>{channel}</h2><dl><div><dt>Budžet</dt><dd>{money(result.budget)}</dd></div><div><dt>Potrošnja</dt><dd>{money(result.spend)}</dd></div><div><dt>Kvalitetni</dt><dd>{result.qualified}</dd></div><div><dt>Prodaje</dt><dd>{result.sales}</dd></div></dl><p>{decision}</p><button onClick={() => setTab('tracker')}>Unesi rezultate <ArrowRight /></button></article>;
        })}
      </section>
      <section className={styles.truthStrip}><Lightbulb /><div><strong>Jedna brojka nije dovoljna.</strong><span>Platforma govori kome pripisuje rezultat. Vesperina evidencija govori je li upit bio kvalitetan, je li osoba došla u salon i je li kupila. Odluku donosimo iz oba izvora.</span></div></section>
    </>}

    {tab === 'plan' && <>
      <section className={styles.sectionHead}><div><p>JASAN REDOSLIJED</p><h2>Plan testa bez nagađanja</h2></div><span>Ne mijenjamo tri stvari odjednom. Svaki tjedan provjeravamo podatke, a veće odluke donosimo nakon 30 i 60 dana.</span></section>
      <div className={styles.phaseGrid}>{phases.map((phase) => <article key={phase.number}><b>{phase.number}</b><small>{phase.period}</small><h3>{phase.title}</h3><p>{phase.copy}</p></article>)}</div>
      <section className={styles.setupCard}><div><p>PRIJE PRVOG EURA</p><h2>Postavljanje mjerenja</h2><span>{setupDone} od {setupSteps.length} koraka završeno</span></div><div>{setupSteps.map((item, index) => <label key={item}><input type="checkbox" checked={state.setup[index]} onChange={() => { const setup = state.setup.map((checked, itemIndex) => itemIndex === index ? !checked : checked); const next = { ...state, setup }; setState(next); persist(next); }} /><i>{state.setup[index] && <Check />}</i><span>{item}</span></label>)}</div></section>
      <section className={styles.weekPlan}><div><strong>Tjedni 1–2</strong><span>Provjeri rade li linkovi, obrasci i pozivi. Ne ocjenjuj prodaju.</span></div><div><strong>Tjedni 3–4</strong><span>Usporedi cijenu i kvalitetu upita. Zaustavi samo očito lošu varijantu.</span></div><div><strong>Tjedni 5–6</strong><span>Gledaj dolaske, ponude i proizvode koji izazivaju stvaran interes.</span></div><div><strong>Tjedni 7–8</strong><span>Odluči gdje povećati, zadržati ili smanjiti budžet.</span></div></section>
    </>}

    {tab === 'tracker' && <>
      <section className={styles.sectionHead}><div><p>JEDNOM TJEDNO · 10 MINUTA</p><h2>Rezultati po kanalu</h2></div><button className={styles.save} onClick={() => persist()}>{saved ? <Check /> : <ClipboardList />}{saved ? 'Spremljeno' : 'Spremi rezultate'}</button></section>
      <div className={styles.resultCards}>{channelTotals.map(([channel, result]) => <article key={channel}><header><ChannelIcon channel={channel} /><div><small>{channel === 'ChatGPT' ? 'EKSPERIMENT' : 'KANAL'}</small><h3>{channel}</h3></div></header><div className={styles.inputs}>{(['budget', 'spend', 'inquiries', 'qualified', 'visits', 'offers', 'sales', 'revenue'] as (keyof ChannelResult)[]).map((field) => <label key={field}><span>{{ budget: 'Planirani budžet €', spend: 'Potrošeno €', inquiries: 'Svi upiti', qualified: 'Kvalitetni upiti', visits: 'Dolasci u salon', offers: 'Ponude', sales: 'Prodaje', revenue: 'Prihod €' }[field]}</span><input type="number" min="0" value={result[field]} onChange={(event) => updateResult(channel, field, Number(event.target.value))} /></label>)}</div><footer><span>Cijena kvalitetnog upita <b>{metric(result.spend / result.qualified)}</b></span><span>ROAS <b>{result.spend > 0 && result.revenue > 0 ? `${(result.revenue / result.spend).toFixed(1)}×` : '—'}</b></span></footer></article>)}</div>

      <section className={styles.leadsSection}>
        <div className={styles.sectionHead}><div><p>IZVOR ISTINE</p><h2>Evidencija upita</h2></div><span>Jedan red po ozbiljnom kontaktu. Bez toga prodaja u salonu ostaje nevidljiva oglasima.</span></div>
        <div className={styles.leadForm}>
          <label><span>Datum</span><input type="date" value={lead.date} onChange={(event) => setLead({ ...lead, date: event.target.value })} /></label>
          <label><span>Izvor</span><select value={lead.source} onChange={(event) => setLead({ ...lead, source: event.target.value as Lead['source'] })}>{['Google', 'Meta', 'ChatGPT', 'Organski', 'Preporuka', 'Prolaznik'].map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>Kampanja / oglas</span><input value={lead.campaign} onChange={(event) => setLead({ ...lead, campaign: event.target.value })} placeholder="npr. meta_garniture_reel" /></label>
          <label><span>Proizvod</span><select value={lead.category} onChange={(event) => setLead({ ...lead, category: event.target.value })}>{['Garnitura', 'Kuhinja', 'Fotelja', 'Ormar', 'Krevet', 'Komoda', 'Stolić', 'Ostalo'].map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>Status</span><select value={lead.status} onChange={(event) => setLead({ ...lead, status: event.target.value as Lead['status'] })}>{['Novi upit', 'Kvalificiran', 'Dolazak', 'Ponuda', 'Prodaja'].map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>Vrijednost €</span><input type="number" min="0" value={lead.value} onChange={(event) => setLead({ ...lead, value: Number(event.target.value) })} /></label>
          <button onClick={addLead} disabled={!lead.campaign.trim()}><Plus /> Dodaj upit</button>
        </div>
        {state.leads.length === 0 ? <div className={styles.noLeads}><Users /><strong>Još nema evidentiranih upita.</strong><span>Prvi ozbiljan poziv, poruku ili dolazak upiši ovdje.</span></div> : <div className={styles.leadRows}>{state.leads.map((item) => <article key={item.id}><span><small>{item.date}</small><strong>{item.source}</strong></span><span><small>Kampanja</small><strong>{item.campaign}</strong></span><span><small>Proizvod</small><strong>{item.category}</strong></span><span><small>Status</small><strong>{item.status}</strong></span><span><small>Vrijednost</small><strong>{money(item.value)}</strong></span><button aria-label="Ukloni upit" onClick={() => { const next = { ...state, leads: state.leads.filter((entry) => entry.id !== item.id) }; setState(next); persist(next); }}><Trash2 /></button></article>)}</div>}
      </section>
    </>}

    {tab === 'education' && <>
      <section className={styles.sectionHead}><div><p>KRATKO I PRAKTIČNO</p><h2>Što svaki kanal radi?</h2></div><span>Valentina ne treba učiti oglašavanje napamet. Treba znati što pripremiti i kako prepoznati dobar rezultat.</span></section>
      <div className={styles.lessonGrid}>
        <article><Search /><small>GOOGLE</small><h3>Hvata postojeću namjeru.</h3><p>Osoba već traži garnituru, kuhinju ili salon. Oglas mora odgovoriti na točan upit i ponuditi jasan sljedeći korak.</p><b>Dobar signal: poziv, obrazac, upute za dolazak.</b></article>
        <article><Megaphone /><small>META</small><h3>Stvara želju i povjerenje.</h3><p>Video, karusel i fotografija pokazuju funkciju, izgled i stvaran salon. Najbolji sadržaj može postati oglas.</p><b>Dobar signal: kvalitetna poruka, dolazak, ponuda.</b></article>
        <article><Sparkles /><small>CHATGPT</small><h3>Ulazi u fazu istraživanja.</h3><p>Koristan je kada ljudi uspoređuju opcije i traže pomoć pri odluci. Testiramo ga tek kad znamo osnovnu cijenu rezultata.</p><b>Dobar signal: informirani upit s jasnom potrebom.</b></article>
      </div>
      <section className={styles.attributionLesson}><div><p>KAKO ZNAMO OTKUD JE KUPAC?</p><h2>Tri tragova, jedna odluka.</h2></div><ol><li><b>01</b><span><strong>Označena poveznica</strong>UTM govori iz kojeg oglasa je osoba došla.</span></li><li><b>02</b><span><strong>Podatak platforme</strong>Google, Meta ili ChatGPT bilježe klik i konverziju.</span></li><li><b>03</b><span><strong>Pitanje u salonu</strong>„Kako ste nas pronašli?” otkriva put koji tehnologija propušta.</span></li></ol></section>
      <section className={styles.ideaSection}><div><p>INSPIRACIJA ZA OGLASE</p><h2>Ideje koje odgovaraju namještaju</h2></div><div>{[
        ['Garniture', 'Tri mjere koje trebate znati prije kupnje', 'Karusel ili kratki Reel'],
        ['Kuhinje', 'Od prve skice do gotove kuhinje u pet koraka', 'Video procesa + obrazac'],
        ['Fotelje', 'Kako prepoznati fotelju iz koje se lakše ustaje', 'Demonstracija u salonu'],
        ['Ormari', 'Koliko prostora zapravo dobivate dobrim rasporedom', 'Prije/poslije karusel'],
        ['Salon', 'Dođite s fotografijom i mjerama prostora', 'Lokalni oglas za dolazak'],
        ['Povjerenje', 'Što ćemo vas pitati prije nego preporučimo proizvod', 'Natalija govori u kameru'],
      ].map(([category, idea, format]) => <article key={idea}><small>{category}</small><strong>{idea}</strong><span>{format}</span></article>)}</div></section>
    </>}
  </div>;
}

function ChannelIcon({ channel }: { channel: Channel }) {
  return channel === 'Google' ? <Search /> : channel === 'Meta' ? <Megaphone /> : <Sparkles />;
}
