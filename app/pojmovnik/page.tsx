import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Mail, Phone } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Pojmovnik namještaja i kuhinja po mjeri | Vespera',
  description: 'Jednostavna objašnjenja izraza o garniturama, madracima, kuhinjama po mjeri, cijenama, dostavi i montaži.',
  alternates: { canonical: '/pojmovnik' },
};

const groups = [
  {
    id: 'garniture',
    title: 'Garniture i sjedenje',
    intro: 'Pojmovi koji pomažu procijeniti udobnost, veličinu i svakodnevno korištenje.',
    terms: [
      { term: 'Lijevi ili desni kut', definition: 'Označava na kojoj je strani produženi dio kutne garniture.', why: 'Smjer se ne označava jednako kod svih proizvođača. Prije narudžbe pokažite fotografiju prostora i na ponudi provjerite nacrt odabranog smjera.' },
      { term: 'Ležaj u garnituri', definition: 'Mehanizam kojim se sjedeći dio pretvara u dodatnu površinu za spavanje.', why: 'Provjerite dimenzije kada je ležaj otvoren, način otvaranja i je li namijenjen povremenom ili češćem spavanju.' },
      { term: 'Spremnik za posteljinu', definition: 'Prostor za odlaganje skriven ispod sjedišta ili produženog dijela garniture.', why: 'Važni su smjer otvaranja, potreban slobodan prostor i koliko je mehanizam lagan za korištenje.' },
      { term: 'Dubina sjedišta', definition: 'Udaljenost od prednjeg ruba sjedišta do naslona.', why: 'Dublje sjedište odgovara opuštenom sjedenju, ali nižim osobama može otežati oslonac leđa i stopala.' },
      { term: 'Visina sjedišta', definition: 'Visina od poda do gornje površine sjedišta.', why: 'Više i čvršće sjedište često olakšava sjedanje i ustajanje. Najsigurnije je isprobati ga u salonu.' },
      { term: 'Vodoodbojna tkanina', definition: 'Tkanina s obradom koja usporava upijanje prolivene tekućine.', why: 'Nije potpuno vodonepropusna. Mrlju i dalje treba brzo ukloniti prema uputama proizvođača.' },
      { term: 'Modularna garnitura', definition: 'Garnitura sastavljena od elemenata koji se mogu kombinirati u više rasporeda.', why: 'Provjerite koji su moduli stvarno dostupni, njihove dimenzije i može li se željena kombinacija ponovno naručiti.' },
    ],
  },
  {
    id: 'spavanje',
    title: 'Kreveti i madraci',
    intro: 'Osnovne razlike koje utječu na potporu, udobnost i trajnost.',
    terms: [
      { term: 'Boxspring krevet', definition: 'Tapecirani sustav kreveta koji obično uključuje podlogu, madrac i ponekad nadmadrac.', why: 'Pitajte koji su dijelovi uključeni u cijenu te mogu li se madrac i nadmadrac kasnije zasebno zamijeniti.' },
      { term: 'Podnica', definition: 'Noseća površina između okvira kreveta i madraca, najčešće izrađena od letvica.', why: 'Odgovarajuća podnica pomaže prozračivanju i pravilnoj potpori madraca. Mora biti usklađena s vrstom madraca.' },
      { term: 'Nadmadrac', definition: 'Tanji gornji sloj koji može promijeniti osjećaj mekoće i zaštititi madrac.', why: 'Može poboljšati udobnost, ali ne može popraviti istrošen ili udubljen madrac.' },
      { term: 'Džepićasta jezgra', definition: 'Sustav opruga kod kojeg je svaka opruga smještena u zaseban tekstilni džepić.', why: 'Opruge se mogu prilagođavati pojedinačno i smanjiti prijenos pokreta. Osjećaj ipak treba provjeriti ležanjem.' },
      { term: 'Tvrdoća madraca', definition: 'Opis osjećaja mekoće ili čvrstoće madraca.', why: 'Oznake tvrdoće nisu potpuno jednake kod svih proizvođača. Građa tijela, položaj spavanja i osobni osjećaj jednako su važni.' },
    ],
  },
  {
    id: 'kuhinje',
    title: 'Kuhinje po mjeri',
    intro: 'Dijelovi i izrazi koje ćete čuti tijekom planiranja kuhinje.',
    terms: [
      { term: 'Korpus', definition: 'Unutarnje tijelo kuhinjskog elementa na koje se postavljaju fronte, police i okovi.', why: 'Materijal, debljina i završna obrada korpusa utječu na izvedbu i trajnost elementa.' },
      { term: 'Fronta', definition: 'Vidljiva prednja ploha vrata ili ladice.', why: 'Materijal i obrada fronte snažno utječu na cijenu, izgled, čišćenje i otpornost na svakodnevno korištenje.' },
      { term: 'Radna ploča', definition: 'Površina na kojoj se priprema hrana i u koju se često ugrađuju sudoper i ploča za kuhanje.', why: 'Provjerite otpornost odabranog materijala na vlagu, toplinu, mrlje i ogrebotine te način spajanja.' },
      { term: 'Modul', definition: 'Kuhinjski element određene širine i namjene, primjerice ormarić, ladice ili visoki element.', why: 'Kuhinja po mjeri može kombinirati standardne module, ispune i posebno prilagođene dijelove. Pitajte što se točno prilagođava.' },
      { term: 'Sokl', definition: 'Donja maska koja skriva nogice i prostor ispod kuhinjskih elemenata.', why: 'Visina sokla utječe na konačnu visinu radne plohe, a mogućnost skidanja olakšava pristup i održavanje.' },
      { term: 'Okovi', definition: 'Šarke, vodilice, podizni mehanizmi i drugi dijelovi koji omogućuju otvaranje i zatvaranje.', why: 'Kvaliteta i nosivost okova utječu na svakodnevno korištenje. Na ponudi provjerite proizvođača i što je uključeno.' },
      { term: 'Usporivač ili soft close', definition: 'Mehanizam koji usporava vrata ili ladicu pri zatvaranju.', why: 'Provjerite dolazi li u svim elementima ili se pojedini okovi dodatno plaćaju.' },
      { term: 'Završna stranica', definition: 'Vidljiva bočna ploča na kraju niza elemenata, obično usklađena s frontama.', why: 'Nije uvijek dio osnovne cijene, zato treba biti jasno navedena u nacrtu i ponudi.' },
      { term: 'Ispuna ili blenda', definition: 'Uža ploča koja zatvara razmak između elementa i zida ili drugog dijela kuhinje.', why: 'Omogućuje pravilno otvaranje vrata i ladica uz zid. Nije izgubljen prostor bez razloga.' },
      { term: '3D prijedlog', definition: 'Vizualni prikaz mogućeg rasporeda, boja i elemenata kuhinje.', why: 'Pomaže zamisliti prostor, ali nije isto što i konačan izvedbeni nacrt s potvrđenim mjerama i priključcima.' },
    ],
  },
  {
    id: 'kupnja',
    title: 'Cijene, ponuda i dostupnost',
    intro: 'Izrazi koji objašnjavaju što se može kupiti odmah, što se naručuje i kako čitati cijenu.',
    terms: [
      { term: 'Dostupno odmah', definition: 'Proizvod koji je trenutačno na zalihi ili u salonu i ne čeka redovnu narudžbu dobavljaču.', why: 'Količine se mogu brzo promijeniti. Prije dolaska nazovite salon i zatražite potvrdu konkretnog modela, boje i komada.' },
      { term: 'Izložbeni primjerak', definition: 'Proizvod koji je bio izložen u salonu i koji se prodaje kao konkretan komad.', why: 'Pregledajte stanje, zabilježite moguća oštećenja i provjerite što vrijedi za jamstvo, dostavu i montažu.' },
      { term: 'Po narudžbi', definition: 'Proizvod ili izvedba koju dobavljač priprema nakon potvrđene narudžbe.', why: 'Na pisanoj ponudi provjerite model, boju, materijal, dimenzije, cijenu i očekivani rok.' },
      { term: 'Ograničena količina', definition: 'Ponuda određenog broja komada koja se možda neće ponoviti nakon prodaje zalihe.', why: 'Ako vam proizvod odgovara, zatražite provjeru dostupnosti. Sličan model može doći kasnije, ali ne mora biti isti.' },
      { term: 'Sidrena ili referentna cijena', definition: 'Cijena koja kupcu služi kao polazište za usporedbu s aktualnom ponudom.', why: 'Na webu mora biti jasno što ta cijena predstavlja. Prije objave svako sniženje i usporednu cijenu treba provjeriti prema važećim pravilima.' },
      { term: 'Najniža cijena u prethodnih 30 dana', definition: 'Referentni podatak koji se prikazuje uz određena oglašena sniženja.', why: 'Podatak mora odgovarati stvarnoj evidenciji cijena za konkretan proizvod. Demo cijene na ovom konceptu Vespera treba potvrditi prije objave.' },
      { term: 'Pisano potvrđena ponuda', definition: 'Dokument s dogovorenim proizvodom, izvedbom, cijenom, uslugama i drugim važnim stavkama.', why: 'Prije plaćanja provjerite jesu li navedeni svi dogovoreni detalji, rok te dostava i montaža ako ih trebate.' },
    ],
  },
  {
    id: 'usluge',
    title: 'Dostava, montaža i korištenje',
    intro: 'Što pojedina usluga obuhvaća i što treba dogovoriti prije isporuke.',
    terms: [
      { term: 'Dostava', definition: 'Prijevoz proizvoda do dogovorene adrese.', why: 'Provjerite obuhvaća li cijena samo dolazak vozila ili i unos u stan, kat bez dizala te udaljenost od mjesta istovara.' },
      { term: 'Unos u prostor', definition: 'Nošenje proizvoda od vozila do mjesta u domu gdje će biti postavljen.', why: 'Izmjerite vrata, hodnike, stubište i dizalo. Unos nije nužno uključen u osnovnu cijenu dostave.' },
      { term: 'Montaža', definition: 'Sastavljanje i postavljanje dijelova namještaja prema dogovorenom opsegu.', why: 'Tražite da ponuda navede što se montira, uključuje li pričvršćivanje i što morate pripremiti prije dolaska.' },
      { term: 'Priključivanje uređaja', definition: 'Spajanje uređaja na električne, vodovodne ili plinske instalacije.', why: 'Nije isto što i montaža namještaja. Za pojedine priključke može biti potrebna ovlaštena stručna osoba.' },
      { term: 'Odvoz ambalaže', definition: 'Uklanjanje kartona, folija i zaštitnog materijala nakon dostave ili montaže.', why: 'Provjerite je li uključen u dogovorenu uslugu ili ambalažu trebate zbrinuti sami.' },
      { term: 'Lakše ustajanje', definition: 'Odabir sjedišta čija visina, čvrstoća i oslonci olakšavaju podizanje.', why: 'Stopala trebaju imati dobar oslonac, a nasloni za ruke mogu pomoći. Proizvod je najbolje osobno isprobati.' },
      { term: 'Slobodan prolaz', definition: 'Nezakrčena širina potrebna za sigurno kretanje između namještaja.', why: 'Planirajte otvaranje vrata i ladica te dovoljno mjesta za hodanje, pomagalo za kretanje ili pomoć druge osobe.' },
    ],
  },
];

export default function GlossaryPage() {
  const definedTerms = groups.flatMap((group) => group.terms.map(({ term, definition }) => ({ '@type': 'DefinedTerm', name: term, description: definition })));
  const structuredData = { '@context': 'https://schema.org', '@type': 'DefinedTermSet', name: 'Vespera pojmovnik namještaja i kuhinja po mjeri', url: 'https://vespera-concept-redesign.vercel.app/pojmovnik', hasDefinedTerm: definedTerms };

  return <PageShell><main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <section className="glossary-hero"><div className="container glossary-hero-grid"><div><nav className="breadcrumbs dark-breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><span>Pojmovnik</span></nav><p className="eyebrow">Pomoć prije odluke</p><h1>Pojmovnik namještaja.</h1><p className="lead">Stručni izrazi objašnjeni jednostavno, kako biste znali što uspoređujete i što naručujete.</p></div><div className="glossary-hero-note"><BookOpen aria-hidden="true" /><p><strong>Ne morate znati stručne izraze.</strong> Dovoljno je opisati prostor, navike i ono što vam je važno. Ovaj pojmovnik pomaže pripremiti pitanja za salon.</p></div></div></section>

    <nav className="glossary-index container" aria-label="Kategorije pojmova">{groups.map((group, index) => <a href={`#${group.id}`} key={group.id}><span>{String(index + 1).padStart(2, '0')}</span>{group.title}</a>)}</nav>

    <div className="glossary-groups">{groups.map((group, groupIndex) => <section className="glossary-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}><div className="container glossary-group-grid"><header><p className="eyebrow">{String(groupIndex + 1).padStart(2, '0')}</p><h2 id={`${group.id}-title`}>{group.title}</h2><p>{group.intro}</p></header><div className="glossary-list">{group.terms.map(({ term, definition, why }) => <details key={term}><summary>{term}</summary><div><p className="glossary-definition">{definition}</p><p><strong>Što provjeriti:</strong> {why}</p></div></details>)}</div></div></section>)}</div>

    <section className="glossary-help"><div className="container"><div><p className="eyebrow">Niste pronašli odgovor?</p><h2>Pitajte bez nelagode.</h2><p>Pošaljite naziv proizvoda ili fotografiju. Vesperin savjetnik može objasniti izraz i provjeriti što to znači za konkretan model.</p></div><div className="glossary-help-actions"><a className="button button-accent" href="tel:+38547645535"><Phone aria-hidden="true" /> Nazovite 047 645 535</a><a className="button button-dark-outline" href="mailto:namjestaj@vespera.hr?subject=Pitanje%20o%20namje%C5%A1taju"><Mail aria-hidden="true" /> Pošaljite pitanje e-mailom</a></div></div></section>
  </main></PageShell>;
}
