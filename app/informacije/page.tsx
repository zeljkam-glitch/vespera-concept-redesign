import Link from 'next/link';
import { CreditCard, HelpCircle, PackageCheck, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';

const topics = [
  {
    id: 'uvjeti',
    title: 'Prije narudžbe',
    icon: PackageCheck,
    text: 'Web služi informiranju i ne rezervira proizvod. Model, izvedba, cijena, rok i uključene usluge potvrđuju se na pisanoj ponudi prije narudžbe.',
    bullets: ['Provjerite točnu dimenziju, boju i materijal.', 'Provjerite što ulazi u cijenu.', 'Sačuvajte prihvaćenu ponudu i račun.'],
  },
  {
    id: 'placanje',
    title: 'Načini plaćanja',
    icon: CreditCard,
    text: 'Dostupan je gotovinski popust i obročno plaćanje do 24 rate. Broj rata ovisi o kartici, banci, iznosu i uvjetima koji vrijede na dan kupnje.',
    bullets: ['Prije kupnje potvrdite broj rata za svoju karticu.', 'Popust i obročna cijena ne moraju biti jednaki.', 'Mogućnosti plaćanja potvrđuje salon.'],
  },
  {
    id: 'dostava',
    title: 'Dostava i montaža',
    icon: Truck,
    text: 'Dostava, unos i montaža nisu isto. Opseg i cijena ovise o proizvodu, lokaciji, katu, pristupu prostoru i potrebnoj montaži.',
    bullets: ['Na ponudi treba pisati uključuje li cijena prijevoz, unos i montažu.', 'Odvoz starog namještaja i ambalaže nije uključen bez izričite potvrde.', 'Priključivanje uređaja i priprema instalacija dogovaraju se zasebno.'],
  },
  {
    id: 'reklamacije',
    title: 'Reklamacije i povrati',
    icon: RotateCcw,
    text: 'Za reklamaciju pripremite račun ili ponudu, fotografije i kratak opis problema te kontaktirajte salon. Službeni postupak i rokovi bit će objavljeni u produkcijskoj verziji.',
    bullets: ['Ne bacajte račun, ponudu ni dokumentaciju o isporuci.', 'Problem fotografirajte prije daljnjeg korištenja ili montaže.', 'Za proizvod po mjeri mogu vrijediti posebni uvjeti.'],
  },
  {
    id: 'privatnost',
    title: 'Privatnost podataka',
    icon: ShieldCheck,
    text: 'Podaci poslani kroz upit smiju se koristiti samo za svrhu koja je kupcu jasno navedena, primjerice odgovor, pripremu ponude ili dogovor termina.',
    bullets: ['Produkcijski obrazac mora imati obavijest o obradi podataka.', 'Podaci se ne koriste za marketing bez zasebne privole.', 'Službena politika privatnosti mora navesti voditelja obrade i prava korisnika.'],
  },
  {
    id: 'pitanja',
    title: 'Pomoć prije dolaska',
    icon: HelpCircle,
    text: 'Prije dolaska provjerite dostupnost, izloženu izvedbu, boje, dimenzije, rok, dostavu, montažu i mogućnosti plaćanja.',
    bullets: ['Navedite naziv proizvoda kada zovete ili šaljete e-mail.', 'Za proizvod po mjeri pripremite približne mjere i fotografije prostora.', 'Ako niste sigurni u pojam, otvorite pojmovnik.'],
  },
];

export default function InformacijePage() {
  return <PageShell><main>
    <section className="info-hero"><div className="container"><p className="eyebrow">Korisnički kutak</p><h1>Ključne informacije na jednom mjestu.</h1><p className="lead">Što provjeriti prije odluke, narudžbe i isporuke. Konačne uvjete za svaki proizvod potvrđuje salon na pisanoj ponudi.</p></div></section>
    <section className="section container info-directory">{topics.map(({ id, title, icon: Icon, text, bullets }) => <article id={id} key={id}><Icon aria-hidden="true" /><div><h2>{title}</h2><p>{text}</p><ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>{id === 'placanje' && <Link className="text-link" href="/#placanje">Pogledajte načine plaćanja</Link>}{id === 'pitanja' && <><Link className="text-link" href="/pojmovnik">Otvorite pojmovnik namještaja</Link><a className="text-link" href="tel:+38547645535">Nazovite 047 645 535</a></>}</div></article>)}</section>
    <section className="status-guide"><div className="container"><div className="status-guide-head"><p className="eyebrow">Dostupnost bez zabune</p><h2>Što znači status proizvoda?</h2></div><div className="status-guide-grid"><article><h3>Na zalihi</h3><p>Proizvod je dostupan prema posljednjem ažuriranju. Nije rezerviran dok salon ne potvrdi narudžbu.</p></article><article><h3>Po narudžbi</h3><p>Odabrana izvedba se naručuje. Dobavljivost i očekivani rok potvrđuju se prije narudžbe.</p></article><article><h3>Izložbeni primjerak</h3><p>Prodaje se konkretan komad iz salona. Stanje, jamstvo i uvjete preuzimanja potrebno je provjeriti.</p></article><article><h3>Provjerite dostupnost</h3><p>Podatak nije potvrđen. Nazovite ili pošaljite e-mail prije dolaska u salon.</p></article></div></div></section>
    <section className="faq-section"><div className="container faq-grid"><div><p className="eyebrow">Najčešća pitanja</p><h2>Prije dolaska u salon.</h2></div><div className="faq-list"><details><summary>Je li cijena na webu konačna?</summary><p>Cijena se odnosi na prikazanu ili osnovnu izvedbu. Boja, materijal, dimenzija, dostava i montaža mogu utjecati na konačnu ponudu.</p></details><details><summary>Kako provjeriti dostupnost?</summary><p>Nazovite salon ili pošaljite e-mail s nazivom proizvoda. Ponuda se mijenja i zato dostupnost treba potvrditi prije dolaska.</p></details><details><summary>Može li se namještaj naručiti u drugoj boji?</summary><p>Ovisi o modelu i dobavljaču. U salonu možete provjeriti uzorke, doplate i očekivani rok.</p></details><details><summary>Postoji li dostava i montaža?</summary><p>Da, prema dogovoru i vrsti proizvoda. Točan opseg i cijenu usluge potrebno je navesti na ponudi.</p></details></div></div></section>
    <section className="container section legal-note"><p><strong>Ovo je konceptualni prototip.</strong> Za konačnu produkcijsku verziju Vespera treba odobriti i objaviti službene uvjete kupnje, dostave, reklamacija, jamstva, privatnosti i kolačića. Ovaj sažetak pomaže korisniku, ali nije zamjena za službene dokumente.</p></section>
  </main></PageShell>;
}
