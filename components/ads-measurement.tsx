'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, BarChart3, BookOpen, Calculator, CalendarDays, Check, ChevronDown, CircleDollarSign, ClipboardList, Eye, Lightbulb, Megaphone, MessageCircle, MousePointerClick, Plus, Route, Search, Sparkles, Store, Target, Trash2, TrendingUp, Users } from 'lucide-react';
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

const learningPath = [
  { number: '01', title: 'Što oglasi mogu napraviti', copy: 'Razlikuj vidljivost, interes, upit i prodaju. Svaka razina ima svoju brojku.' },
  { number: '02', title: 'Kako rade kanali', copy: 'Google hvata potražnju, Meta je stvara, a ChatGPT ulazi dok osoba istražuje.' },
  { number: '03', title: 'Kako pratimo kupca', copy: 'Označena poveznica, podaci platforme i pitanje u salonu zajedno daju potpuniju sliku.' },
  { number: '04', title: 'Kako čitamo rezultate', copy: 'Klik nije rezultat. Pratimo kvalitetan upit, dolazak, ponudu, prodaju i prihod.' },
  { number: '05', title: 'Kako donosimo odluku', copy: 'Mijenjamo jednu stvar, čekamo dovoljno podataka i budžet usmjeravamo prema kvaliteti.' },
];

const funnelStages = [
  { icon: Eye, label: '1. Vidjela oglas', metric: 'Doseg i prikazi', copy: 'Osoba je primijetila Vesperu. Još ne znamo želi li kupiti.' },
  { icon: MousePointerClick, label: '2. Pokazala interes', metric: 'Klik i posjet', copy: 'Otvorila je web, kartu, profil ili poruku.' },
  { icon: MessageCircle, label: '3. Poslala upit', metric: 'Svi upiti', copy: 'Pitala je za cijenu, dostupnost, mjeru ili termin.' },
  { icon: Target, label: '4. Kvalificirana', metric: 'Kvalitetni upiti', copy: 'Ima stvarnu potrebu, odgovarajući proizvod i realan rok kupnje.' },
  { icon: Store, label: '5. Došla / dobila ponudu', metric: 'Dolasci i ponude', copy: 'Napravila je konkretan korak prema kupnji.' },
  { icon: CircleDollarSign, label: '6. Kupila', metric: 'Prodaje, prihod i ROAS', copy: 'Ovdje oglas postaje poslovni rezultat.' },
];

const metricLessons = [
  ['Doseg', 'Koliko je različitih ljudi vidjelo oglas.', 'Za prepoznatljivost; nije dokaz prodaje.'],
  ['Prikazi', 'Koliko je puta oglas prikazan, uključujući ponavljanja.', 'Pomaže vidjeti zamara li oglas publiku.'],
  ['CTR', 'Postotak ljudi koji su kliknuli nakon prikaza.', 'Govori privlače li poruka i vizual pažnju.'],
  ['CPC', 'Potrošnja podijeljena brojem klikova.', 'Govori koliko plaćamo posjet, ne koliko plaćamo kupca.'],
  ['Svi upiti', 'Pozivi, poruke i obrasci, bez procjene kvalitete.', 'Pokazuje volumen kontakata.'],
  ['Kvalitetni upiti', 'Kontakti koji odgovaraju Vesperinoj ponudi i području.', 'Glavna rana poslovna metrika.'],
  ['CPL', 'Potrošnja podijeljena brojem kvalitetnih upita.', 'Uspoređujemo kanale prema istoj definiciji upita.'],
  ['ROAS', 'Prihod pripisan oglasima podijeljen potrošnjom.', 'Pokazuje prihod, ali ne uključuje maržu i ostale troškove.'],
];

const diagnoses = [
  { symptom: 'Mnogo prikaza, malo klikova', meaning: 'Oglas ne privlači pažnju ili poruka nije relevantna.', action: 'Promijeni prvi kadar, naslov ili proizvod. Ne mijenjaj publiku i vizual istodobno.' },
  { symptom: 'Klikovi postoje, upita nema', meaning: 'Ljudi su zainteresirani, ali ih web ili ponuda ne vode dalje.', action: 'Provjeri mobilnu stranicu, cijenu, kontakt, brzinu i jasnoću sljedećeg koraka.' },
  { symptom: 'Mnogo upita, malo kvalitetnih', meaning: 'Oglas privlači znatiželju, ali ne dovoljno ozbiljne kupce.', action: 'Napiši raspon cijene, lokaciju, rok ili kome je proizvod namijenjen.' },
  { symptom: 'Kvalitetni upiti, malo dolazaka', meaning: 'Nedostaje konkretan dogovor ili praćenje kontakta.', action: 'Ponudi dva termina, pošalji lokaciju i javi se ponovno unutar jednog radnog dana.' },
  { symptom: 'Dolasci postoje, prodaje nema', meaning: 'Problem vjerojatno nije samo u oglasu.', action: 'Pregledaj ponudu, cijenu, dostupnost, iskustvo u salonu i razloge odustajanja.' },
  { symptom: 'Platforma prijavljuje više prodaja od evidencije', meaning: 'Više kanala može sebi pripisati istog kupca.', action: 'Financijsku odluku temelji na Vesperinoj evidenciji i stvarnom računu.' },
];

const glossary = [
  ['Kampanja', 'Glavni spremnik s ciljem i budžetom, primjerice “Dolasci u salon”.'],
  ['Skup oglasa', 'Mjesto gdje se određuju publika, lokacija, raspored i način trošenja.'],
  ['Oglas', 'Konkretan video, fotografija, naslov i poziv na akciju koji osoba vidi.'],
  ['Konverzija', 'Radnja koju želimo mjeriti: poziv, obrazac, poruka, dolazak ili kupnja.'],
  ['UTM oznaka', 'Kratka oznaka u poveznici koja analitici govori kanal, kampanju i oglas.'],
  ['Pixel / tag', 'Kod na webu koji platformi javlja da je osoba napravila važnu radnju.'],
  ['Remarketing', 'Oglas ljudima koji su već posjetili web, profil ili gledali sadržaj.'],
  ['Atribucija', 'Pravilo prema kojem kanal dobiva zaslugu za upit ili prodaju.'],
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
      <section className={styles.educationIntro}>
        <div><p>MALA ŠKOLA OGLAŠAVANJA</p><h2>Od prvog prikaza do prodaje.</h2><span>Ovaj dio možeš čitati redom kao kratku edukaciju ili otvoriti samo lekciju koja ti treba. Svaka brojka ovdje vodi do konkretne odluke.</span></div>
        <aside><BookOpen /><strong>5 lekcija</strong><span>oko 20 minuta za cijelu edukaciju</span></aside>
      </section>

      <div className={styles.learningPath}>{learningPath.map((lesson) => <article key={lesson.number}><b>{lesson.number}</b><h3>{lesson.title}</h3><p>{lesson.copy}</p></article>)}</div>

      <section className={styles.lessonBlock}>
        <header><span>LEKCIJA 01</span><div><h2>Oglas nije prodaja. Oglas pokreće put.</h2><p>Kupnja namještaja često traje tjednima. Zato pratimo svaki korak, umjesto da od jednog klika odmah očekujemo račun.</p></div></header>
        <div className={styles.funnelGrid}>{funnelStages.map((stage) => { const Icon = stage.icon; return <article key={stage.label}><Icon /><small>{stage.metric}</small><h3>{stage.label}</h3><p>{stage.copy}</p></article>; })}</div>
        <div className={styles.callout}><AlertCircle /><p><strong>Najvažnija razlika:</strong> osoba koja pita samo cijenu ulazi u “sve upite”. Kvalitetan upit zna što traži, nalazi se na području koje Vespera pokriva i ima realnu namjeru kupnje.</p></div>
      </section>

      <section className={styles.lessonBlock}>
        <header><span>LEKCIJA 02</span><div><h2>Svaki kanal ima drugi posao.</h2><p>Kanale uspoređujemo prema kvaliteti kupaca koje donose, ali od njih ne očekujemo isti način rada.</p></div></header>
        <div className={styles.lessonGrid}>
          <article><Search /><small>GOOGLE · ODLUKA</small><h3>Hvata postojeću namjeru.</h3><p>Osoba već traži garnituru, kuhinju, ormar ili salon u blizini. Oglas odgovara na točan upit i vodi na odgovarajući proizvod ili kontakt.</p><ul><li>Najbolje za: aktivnu potražnju</li><li>Rizik: skupi ili nerelevantni klikovi</li><li>Pratimo: pozive, obrasce, rute i prodaju</li></ul><b>Dobar signal: osoba zna što traži i želi sljedeći korak.</b></article>
          <article><Megaphone /><small>META · INTERES</small><h3>Stvara želju i povjerenje.</h3><p>Instagram i Facebook pokazuju Vesperu ljudima koji možda još ne traže aktivno, ali uređuju prostor ili razmišljaju o kupnji.</p><ul><li>Najbolje za: video, karusel i remarketing</li><li>Rizik: jeftini, ali neozbiljni upiti</li><li>Pratimo: kvalitetne poruke, dolaske i ponude</li></ul><b>Dobar signal: sadržaj dovodi osobu iz inspiracije u razgovor.</b></article>
          <article><Sparkles /><small>CHATGPT · ISTRAŽIVANJE</small><h3>Ulazi dok osoba uspoređuje.</h3><p>Može se pojaviti dok korisnik istražuje uređenje ili rješava konkretan problem. Budući da je kanal nov, tretiramo ga kao odvojeni eksperiment.</p><ul><li>Najbolje za: informirane istraživačke upite</li><li>Rizik: malo lokalnih podataka i nepoznata cijena</li><li>Pratimo: označene posjete i kvalitetne upite</li></ul><b>Dobar signal: dodatni kupci koje postojeći kanali nisu donijeli.</b></article>
        </div>
      </section>

      <section className={styles.lessonBlock}>
        <header><span>LEKCIJA 03</span><div><h2>Kako znamo otkud je kupac?</h2><p>Nijedan trag nije savršen. Zajedno koristimo poveznicu, platformu i razgovor s osobom.</p></div></header>
        <div className={styles.attributionSteps}>
          <article><b>01</b><Route /><div><h3>Označena poveznica</h3><p>UTM oznaka u poveznici zapisuje izvor, kampanju i oglas. Primjer: <code>utm_source=meta</code> i <code>utm_campaign=garniture</code>.</p></div></article>
          <article><b>02</b><BarChart3 /><div><h3>Podatak platforme</h3><p>Google, Meta ili ChatGPT bilježe klik i radnju na webu. To nam pomaže popravljati kampanju, ali platforma može sebi pripisati previše zasluga.</p></div></article>
          <article><b>03</b><MessageCircle /><div><h3>Pitanje u salonu</h3><p>Valentina pita: “Kako ste nas prvi put pronašli?” Odgovor upisuje uz kontakt, čak i kada analitika već pokazuje izvor.</p></div></article>
          <article><b>04</b><CircleDollarSign /><div><h3>Povezivanje s prodajom</h3><p>Kad nastane ponuda ili račun, status istog kontakta ažurira se u evidenciji. Tako znamo koji je kanal donio stvaran prihod.</p></div></article>
        </div>
        <div className={styles.truthRule}><strong>Vesperino pravilo izvora istine</strong><p>Platforma pomaže optimizirati oglase. Evidencija upita, ponuda i računa pokazuje poslovni rezultat. Ako se brojke razlikuju, za odluku o budžetu koristimo Vesperinu evidenciju.</p></div>
      </section>

      <section className={styles.lessonBlock}>
        <header><span>LEKCIJA 04</span><div><h2>Brojke prevedene na običan jezik.</h2><p>Ne treba pratiti sve što platforme nude. Ovih osam pojmova dovoljno je za kvalitetan razgovor i tjednu odluku.</p></div></header>
        <div className={styles.metricTable}><div className={styles.metricHeader}><span>POJAM</span><span>ŠTO ZNAČI</span><span>KAKO GA KORISTIMO</span></div>{metricLessons.map(([name, meaning, use]) => <article key={name}><strong>{name}</strong><span>{meaning}</span><span>{use}</span></article>)}</div>
        <div className={styles.formulaGrid}>
          <article><Calculator /><small>CIJENA KVALITETNOG UPITA</small><strong>potrošnja ÷ kvalitetni upiti</strong><p>600 € ÷ 10 = 60 € po kvalitetnom upitu</p></article>
          <article><TrendingUp /><small>ROAS</small><strong>prihod ÷ potrošnja</strong><p>3.000 € ÷ 600 € = 5× ROAS</p></article>
          <article><CircleDollarSign /><small>TOČKA POKRIĆA</small><strong>potrošnja ÷ bruto dobit po prodaji</strong><p>Ako po prodaji ostaje 1.000 €, za 2.400 € oglasa trebaju približno 3 prodaje.</p></article>
        </div>
      </section>

      <section className={styles.lessonBlock}>
        <header><span>LEKCIJA 05</span><div><h2>Kad brojka izgleda loše, prvo pronađi mjesto problema.</h2><p>Loš krajnji rezultat ne znači uvijek da treba ugasiti kanal. Ova tablica pokazuje što prvo provjeriti.</p></div></header>
        <div className={styles.diagnosisList}>{diagnoses.map((item, index) => <details key={item.symptom} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.symptom}</strong><ChevronDown /></summary><div><p><b>Što to najčešće znači</b>{item.meaning}</p><p><b>Prvi sljedeći potez</b>{item.action}</p></div></details>)}</div>
      </section>

      <section className={styles.roleLesson}>
        <div><p>TKO ŠTO RADI?</p><h2>Jedna kratka rutina svaki tjedan.</h2><span>Za provjeru je dovoljno 20 minuta petkom. Podaci se unose na kartici “Rezultati i upiti”.</span></div>
        <article><small>VALENTINA · TIJEKOM TJEDNA</small><h3>Zapiši stvarne kontakte.</h3><ul><li>Upiši izvor svakog ozbiljnog upita.</li><li>Pitaj “Kako ste nas prvi put pronašli?”</li><li>Ažuriraj status: upit, dolazak, ponuda ili prodaja.</li><li>Upiši vrijednost kada je prodaja potvrđena.</li></ul></article>
        <article><small>NATALIJA · PETKOM</small><h3>Donesi poslovnu odluku.</h3><ul><li>Provjeri potrošnju i kvalitetne upite.</li><li>Usporedi dolaske, ponude i prodaje po kanalu.</li><li>Zabilježi zašto su ljudi odustali.</li><li>Odobri jednu promjenu za sljedeći tjedan.</li></ul></article>
      </section>

      <section className={styles.glossarySection}><div><p>RJEČNIK BEZ ŽARGONA</p><h2>Ako naiđeš na nepoznatu riječ.</h2></div><div>{glossary.map(([term, definition]) => <details key={term}><summary><strong>{term}</strong><ChevronDown /></summary><p>{definition}</p></details>)}</div></section>

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
