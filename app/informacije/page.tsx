import Link from 'next/link';
import { CreditCard, HelpCircle, PackageCheck, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';

const topics = [
  { id: 'uvjeti', title: 'Uvjeti kupnje', icon: PackageCheck, text: 'Proizvod, izvedba, cijena, rok i uključene usluge potvrđuju se na ponudi prije narudžbe.' },
  { id: 'placanje', title: 'Kartično plaćanje', icon: CreditCard, text: 'Dostupan je gotovinski popust i obročno plaćanje do 24 rate, ovisno o kartici i aktualnim uvjetima banke.' },
  { id: 'dostava', title: 'Dostava i montaža', icon: Truck, text: 'Cijena i opseg usluge ovise o proizvodu, lokaciji, unosu u prostor i potrebnoj montaži.' },
  { id: 'reklamacije', title: 'Reklamacije i povrati', icon: RotateCcw, text: 'Za reklamaciju pripremite račun ili ponudu, fotografije i kratak opis problema te kontaktirajte salon.' },
  { id: 'privatnost', title: 'Privatnost podataka', icon: ShieldCheck, text: 'Podaci poslani kroz upit koriste se samo za odgovor, pripremu ponude ili dogovor termina.' },
  { id: 'pitanja', title: 'Najčešća pitanja', icon: HelpCircle, text: 'Prije dolaska možete provjeriti dostupnost, boje, dimenzije, rok, dostavu, montažu i mogućnosti plaćanja.' },
];

export default function InformacijePage() {
  return <PageShell><main>
    <section className="info-hero"><div className="container"><p className="eyebrow">Korisnički kutak</p><h1>Važne informacije bez sitnih slova.</h1><p className="lead">Osnovne informacije za sigurniji odabir. Konačne uvjete za svaki proizvod potvrđuje salon na pisanoj ponudi.</p></div></section>
    <section className="section container info-directory">{topics.map(({ id, title, icon: Icon, text }) => <article id={id} key={id}><Icon aria-hidden="true" /><div><h2>{title}</h2><p>{text}</p>{id === 'placanje' && <Link className="text-link" href="/#placanje">Pogledajte načine plaćanja</Link>}{id === 'pitanja' && <a className="text-link" href="tel:+38547645535">Nazovite 047 645 535</a>}</div></article>)}</section>
    <section className="faq-section"><div className="container faq-grid"><div><p className="eyebrow">Najčešća pitanja</p><h2>Prije dolaska u salon.</h2></div><div className="faq-list"><details><summary>Je li cijena na webu konačna?</summary><p>Cijena se odnosi na prikazanu ili osnovnu izvedbu. Boja, materijal, dimenzija, dostava i montaža mogu utjecati na konačnu ponudu.</p></details><details><summary>Kako provjeriti dostupnost?</summary><p>Nazovite salon ili pošaljite e-mail s nazivom proizvoda. Ponuda se mijenja i zato dostupnost treba potvrditi prije dolaska.</p></details><details><summary>Može li se namještaj naručiti u drugoj boji?</summary><p>Ovisi o modelu i dobavljaču. U salonu možete provjeriti uzorke, doplate i očekivani rok.</p></details><details><summary>Postoji li dostava i montaža?</summary><p>Da, prema dogovoru i vrsti proizvoda. Točan opseg i cijenu usluge potrebno je navesti na ponudi.</p></details></div></div></section>
    <section className="container section legal-note"><p><strong>Za konačnu produkcijsku verziju</strong> Natalija treba dostaviti službene uvjete kupnje, dostave, reklamacija i politiku privatnosti. Trenutačni sadržaj pokazuje predloženu strukturu i nije zamjena za službene pravne dokumente.</p></section>
  </main></PageShell>;
}
