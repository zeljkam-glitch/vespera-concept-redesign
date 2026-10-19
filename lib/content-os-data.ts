export type ContentStatus = 'Planirano' | 'U pripremi' | 'Čeka odobrenje' | 'Odobreno' | 'Objavljeno';

export type ContentItem = {
  id: string;
  date: string;
  week: number;
  pillar: 'Savjet' | 'Proizvod' | 'Kuhinje' | 'Povjerenje' | 'Salon';
  format: 'Reel' | 'Karusel' | 'Fotografija' | 'Story';
  channels: string[];
  title: string;
  goal: string;
  hook: string;
  caption: string;
  cta: string;
  shots: string[];
  factsToConfirm: string[];
  orientation: string;
  duration: string;
  image: string;
  status: ContentStatus;
};

export type FurnitureFormatExample = {
  format: 'Reel' | 'Karusel' | 'Fotografija' | 'Story';
  title: string;
  purpose: string;
  hook: string;
  recipe: string[];
  captionTemplate: string;
  cta: string;
};

export type FurnitureExample = {
  id: string;
  name: string;
  question: string;
  mustShow: string[];
  avoid: string;
  image: string;
  examples: FurnitureFormatExample[];
};

const standardShots = {
  product: [
    'Širi kadar proizvoda u stvarnom prostoru',
    'Prednji i bočni kadar cijelog proizvoda',
    'Detalj materijala, šava, ručke ili okova',
    'Kadar funkcije u uporabi',
    'Završni kadar s dovoljno praznog prostora za naslov',
  ],
  kitchen: [
    'Širi kadar cijele kuhinje ili izložbenog sastava',
    'Otvaranje ladice ili elementa u jednom mirnom pokretu',
    'Detalj fronte, radne ploče i okova',
    'Kadar rješenja koje štedi prostor ili olakšava korištenje',
    'Završni kadar s Vesperinim uzorcima ili nacrtom',
  ],
  advice: [
    'Kadar problema koji kupac lako prepoznaje',
    'Valentina rukom pokazuje što treba provjeriti',
    'Krupni kadar mjere, detalja ili mehanizma',
    'Kadar ispravnog rješenja',
    'Završni kadar s jasnim sljedećim korakom',
  ],
  trust: [
    'Kadar ulaza ili šireg dijela salona',
    'Osoba iz tima u prirodnom radu, bez poziranja',
    'Detalj razgovora, uzoraka ili nacrta',
    'Proizvod ili realizacija na koju se priča odnosi',
    'Završni kadar s lokacijom salona',
  ],
};

const requiredFacts = ['Naziv proizvoda ili usluge', 'Dostupnost na dan objave', 'Cijena samo ako ju je Natalija potvrdila'];
const kitchenFacts = ['Proizvođač i linija', 'Što je uključeno u prikazano rješenje', 'Aktualni okvir roka potvrđen s Natalijom'];

function item(input: Omit<ContentItem, 'channels' | 'orientation' | 'duration' | 'status'> & Partial<Pick<ContentItem, 'channels' | 'orientation' | 'duration' | 'status'>>): ContentItem {
  return {
    channels: ['Instagram', 'Facebook'],
    orientation: input.format === 'Reel' || input.format === 'Story' ? 'Vertikalno 9:16' : 'Portretno 4:5',
    duration: input.format === 'Reel' ? '15–25 sekundi' : input.format === 'Story' ? '3–5 Storyja' : input.format === 'Karusel' ? '5–7 slajdova' : '1 glavna fotografija',
    status: 'Planirano',
    ...input,
  };
}

export const activeGuideItem: ContentItem = item({
  id: 'guide-fotelja',
  date: '2026-10-17',
  week: 0,
  pillar: 'Proizvod',
  format: 'Reel',
  title: 'Fotelja u vašem kutku mira',
  goal: 'Pokazati kako se jedna udobna fotelja uklapa u stvaran dom i potaknuti posjet salonu.',
  hook: 'Ovo nije samo fotelja. Ovo je kutak za vas.',
  caption: 'Ponekad je dovoljan jedan dobro odabran komad da prostor postane ugodniji. Ovu fotelju vrijedi pogledati izbliza, dodirnuti tkaninu i isprobati sjedište. Navratite u Vesperu u Karlovcu i pronađite izvedbu koja odgovara vašem prostoru.',
  cta: 'Posjetite naš salon u Karlovcu i isprobajte je.',
  shots: ['Širi kadar fotelje u prostoru', 'Detalj teksture i šava', 'Ruka na naslonu ili osoba koja sjeda', 'Bočni kadar cijele fotelje', 'Završni kadar s lokacijom salona'],
  factsToConfirm: requiredFacts,
  image: '/content-os/fotelja-siroki-kadar.png',
  status: 'U pripremi',
});

function formatExample(format: FurnitureFormatExample['format'], title: string, purpose: string, hook: string, recipe: string[], captionTemplate: string, cta: string): FurnitureFormatExample {
  return { format, title, purpose, hook, recipe, captionTemplate, cta };
}

export const furnitureExamples: FurnitureExample[] = [
  {
    id: 'fotelja', name: 'Fotelja', question: 'Kako izgleda, kako se sjedi i gdje stane?',
    mustShow: ['cijela fotelja u prostoru', 'tekstura i šav', 'osoba koja sjeda', 'bočni profil i visina naslona'],
    avoid: 'Nemoj snimiti samo prednju fotografiju bez mjerila i osjećaja veličine.', image: '/content-os/fotelja-siroki-kadar.png',
    examples: [
      formatExample('Reel', 'Kutak mira u 20 sekundi', 'Emocija i posjet salonu', 'Ovo nije samo fotelja. Ovo je vaš kutak mira.', ['2 s: prazan kut prostorije', '4 s: cijela fotelja', '4 s: detalj teksture', '5 s: osoba sjeda', '3 s: lokacija salona'], 'Ponekad je dovoljan jedan dobro odabran komad da prostor postane ugodniji. [NAZIV MODELA] možete pogledati i isprobati u Vesperi.', 'Dođite je isprobati u salonu.'),
      formatExample('Karusel', '5 stvari koje provjerite prije kupnje fotelje', 'Spremanja i edukacija', 'Lijepa fotelja nije uvijek i udobna fotelja.', ['Naslovni slajd', 'Visina sjedišta', 'Dubina sjedišta', 'Oslonac za leđa', 'Tkanina i održavanje', 'CTA s lokacijom'], 'Prije odluke provjerite visinu, dubinu, potporu za leđa i osjećaj materijala. Fotografija to ne može pokazati — isprobavanje može.', 'Spremite popis za dolazak u salon.'),
      formatExample('Fotografija', 'Fotelja tjedna', 'Predstaviti konkretan model', 'Komad koji mijenja osjećaj cijele prostorije.', ['Portretni kadar 4:5', 'Dnevno svjetlo sa strane', 'Čista pozadina', 'Malo prostora za naslov'], '[NAZIV MODELA] izdvajamo zbog [POTVRĐENA PREDNOST]. Dostupnost, boju i cijenu provjerite prije dolaska.', 'Pošaljite poruku za detalje.'),
      formatExample('Story', 'Odaberi svoju boju', 'Interakcija i istraživanje interesa', 'Koja bi bolje izgledala u vašem domu?', ['Story 1: fotelja u boji A', 'Story 2: anketa A/B', 'Story 3: detalj tkanine', 'Story 4: poziv u salon'], 'Anketa: svijetla ili tamna izvedba?', 'Glasajte pa je pogledajte uživo.'),
    ],
  },
  {
    id: 'ormar', name: 'Ormar', question: 'Koliko stane i kako izgleda iznutra?',
    mustShow: ['zatvoren ormar u cijelosti', 'otvaranje vrata', 'unutarnji raspored', 'ladice, police i vješanje'],
    avoid: 'Nemoj prikazivati samo fronte; kupcu je unutrašnjost glavni dokaz vrijednosti.', image: '/brand/castello-showroom.jpeg',
    examples: [
      formatExample('Reel', 'Što stane u ovaj ormar?', 'Pokazati kapacitet i funkciju', 'Izvana miran. Iznutra iskorišten do zadnjeg centimetra.', ['Cijeli zatvoreni ormar', 'Otvaranje vrata', 'Police odozgo prema dolje', 'Izvlačenje ladice', 'Završni kadar s mjerama'], 'Dobar ormar nije samo lijepa fronta. Raspored polica, vješanja i ladica treba pratiti ono što doista spremate.', 'Ponesite mjere zida i dođite razgovarati o rasporedu.'),
      formatExample('Karusel', 'Klizna ili klasična vrata?', 'Pomoći pri odluci', 'Vrata ormara biraju se prema prostoru ispred njega.', ['Naslov', 'Kada birati klizna', 'Kada birati klasična', 'Prostor za otvaranje', 'Čišćenje i pristup', 'CTA'], 'Klizna vrata štede prostor ispred ormara, a klasična omogućuju pregled većeg dijela unutrašnjosti. Odluka počinje mjerama i navikama.', 'Spremite usporedbu prije planiranja.'),
      formatExample('Fotografija', 'Detalj fronte i ručke', 'Istaknuti završnu obradu', 'Detalj koji određuje karakter cijele sobe.', ['Krupni kadar fronte', 'Ručka ili profil', 'Bočno svjetlo', 'Vjerna boja bez filtra'], 'Na ovoj izvedbi izdvajamo [MATERIJAL/BOJU] i [TIP RUČKE]. Uživo ćete najtočnije procijeniti ton i teksturu.', 'Pogledajte uzorke u salonu.'),
      formatExample('Story', 'Pogodi koliko polica', 'Interakcija', 'Koliko prostora krije ova fronta?', ['Zatvoreni ormar', 'Kviz s tri odgovora', 'Otvorena unutrašnjost', 'Pitanje publici'], 'Kviz pa otkrivanje unutarnjeg rasporeda.', 'Odgovorite što vi najviše trebate spremiti.'),
    ],
  },
  {
    id: 'stolic', name: 'Stolić', question: 'Je li pravih proporcija i kako funkcionira uz sjedenje?',
    mustShow: ['stolić uz garnituru', 'visinu u odnosu na sjedište', 'gornju plohu', 'noge, rubove i eventualnu pohranu'],
    avoid: 'Nemoj ga fotografirati samog na praznoj pozadini bez odnosa prema garnituri.', image: '/content-os/fotelja-u-upotrebi.png',
    examples: [
      formatExample('Reel', 'Prava veličina stolića', 'Praktičan savjet', 'Stolić može stati, a ipak smetati svakom prolasku.', ['Širi kadar uz garnituru', 'Mjerenje visine', 'Prolaz oko stolića', 'Odlaganje šalice', 'Završni tlocrt odozgo'], 'Provjerite visinu u odnosu na sjedište, udaljenost od garniture i slobodan prolaz. Male razlike mijenjaju svakodnevno korištenje.', 'Spremite prije mjerenja dnevnog boravka.'),
      formatExample('Karusel', 'Okrugli ili pravokutni stolić?', 'Usporedba i spremanja', 'Oblik stolića treba pratiti kretanje kroz prostor.', ['Naslov', 'Okrugli za mekši prolaz', 'Pravokutni uz dužu garnituru', 'Set stolića za fleksibilnost', 'Mjere koje trebate', 'CTA'], 'Okrugli oblik ublažava prolaze, pravokutni prati duže sjedenje, a set nudi fleksibilnost. Uvijek prvo označite gabarit na podu.', 'Pošaljite fotografiju prostora za preporuku.'),
      formatExample('Fotografija', 'Materijal izbliza', 'Istaknuti kvalitetu', 'Ploha koju ćete gledati i dodirivati svaki dan.', ['Kadar odozgo', 'Detalj ruba', 'Bočni profil', 'Jedan uporabni predmet za mjerilo'], '[NAZIV] spaja [MATERIJAL] i [DETALJ]. Prikazana boja može odstupati na ekranu, zato uzorak pogledajte uživo.', 'Provjerite dostupnost u salonu.'),
      formatExample('Story', 'Stiliziraj stolić', 'Lagani lifestyle sadržaj', 'Koja verzija je više vaš stil?', ['Prazan stolić', 'Varijanta A', 'Varijanta B', 'Anketa'], 'Dvije jednostavne stilizacije istog stolića.', 'Glasajte A ili B.'),
    ],
  },
  {
    id: 'kauc', name: 'Kauč i garnitura', question: 'Odgovara li prostoru, sjedenju i načinu korištenja?',
    mustShow: ['cijelu garnituru sprijeda i bočno', 'dubinu i visinu sjedišta', 'osobu koja sjedi i ustaje', 'ležaj, spremnik ili pomične dijelove'],
    avoid: 'Nemoj obećavati udobnost samo opisom; pokaži tijelo u odnosu na sjedište.', image: '/content-os/fotelja-siroki-kadar.png',
    examples: [
      formatExample('Reel', 'Test udobnosti u 4 koraka', 'Edukacija i dolazak u salon', 'Nemojte kupiti kauč prije ovog kratkog testa.', ['Sjedni do kraja', 'Provjeri oslonac za leđa', 'Ustani bez pridržavanja', 'Isprobaj ležaj ili funkciju', 'CTA iz salona'], 'U salonu sjednite kao kod kuće. Provjerite dubinu, oslonac i ustajanje, a zatim isprobajte funkcije koje ćete stvarno koristiti.', 'Dođite odvojiti deset minuta za isprobavanje.'),
      formatExample('Karusel', '5 mjera prije kupnje garniture', 'Smanjiti pogrešne odabire', 'Širina zida nije jedina mjera koja vam treba.', ['Zid', 'Dubina garniture', 'Prolaz', 'Vrata i lift', 'Otvaranje ležaja', 'Sažetak'], 'Izmjerite zid, prolaze, ulaz, lift ili stubište te prostor za otvaranje ležaja. Ponesite fotografije i mjere u salon.', 'Spremite kontrolni popis.'),
      formatExample('Fotografija', 'Garnitura u profilu', 'Pokazati proporcije', 'Pogled iz profila otkriva više nego prednja fotografija.', ['Cijeli bočni profil', 'Dnevno svjetlo', 'Bez širokokutnog izobličenja', 'Osoba ili pomoćni stolić za mjerilo'], '[NAZIV MODELA] ima [POTVRĐENA DUBINA/VISINA]. Za osjećaj sjedenja ipak je najbolje isprobati ga uživo.', 'Javite se za dostupne izvedbe.'),
      formatExample('Story', 'Tvrđe ili mekše sjedište?', 'Prikupiti preferencije', 'Što vi prvo provjeravate na kauču?', ['Video pritiska rukom', 'Anketa tvrđe/mekše', 'Pitanje o dubini', 'Poziv na testiranje'], 'Kratka anketa o udobnosti publike.', 'Odgovorite pa dođite usporediti.'),
    ],
  },
  {
    id: 'kuhinja', name: 'Kuhinja', question: 'Kako raspored rješava svakodnevne navike?',
    mustShow: ['širi kadar cijelog rasporeda', 'otvaranje ladica i elemenata', 'radnu plohu i uređaje', 'okove, fronte i pametna rješenja'],
    avoid: 'Nemoj objaviti realizaciju bez suglasnosti kupca i potvrđenih podataka.', image: '/brand/castello-showroom.jpeg',
    examples: [
      formatExample('Reel', 'Od ideje do kuhinje', 'Objasniti proces', 'Za prvi razgovor ne trebate savršen nacrt.', ['Fotografija praznog prostora', 'Mjere i razgovor', 'Uzorci', '3D prikaz', 'Gotova kuhinja ili izložbeni primjer'], 'Počinjemo prostorom, navikama i okvirnim budžetom. Nakon mjera biramo raspored, materijale i detalje te sve provjeravamo prije izvedbe.', 'Dogovorite prvi razgovor o kuhinji.'),
      formatExample('Karusel', '7 pitanja prije planiranja kuhinje', 'Kvalitetni upiti i spremanja', 'Dobra kuhinja počinje pitanjima o vašem danu.', ['Tko kuha', 'Koliko se sprema', 'Koji uređaji', 'Kolika radna ploha', 'Otoci i prolazi', 'Budžet', 'Rok i CTA'], 'Razmislite tko koristi kuhinju, što spremate, koje uređaje imate i koliko radne plohe trebate. Odgovori vode boljem rasporedu.', 'Spremite pitanja za prvi sastanak.'),
      formatExample('Fotografija', 'Detalj koji olakšava svaki dan', 'Pokazati stručnost', 'Mala odluka na nacrtu, velika razlika u korištenju.', ['Otvorena ladica ili kut', 'Krupni kadar okova', 'Ruka u korištenju', 'Čist kadar bez osobnih stvari'], 'Izdvajamo [RJEŠENJE] jer pomaže kod [KONKRETNA POTREBA]. Točno rješenje uvijek prilagođavamo prostoru i korisniku.', 'Pitajte nas kako bi radilo u vašoj kuhinji.'),
      formatExample('Story', 'Biramo frontu', 'Uključiti publiku u proces', 'Mat ili sjaj?', ['Uzorak A', 'Uzorak B', 'Anketa', 'Video uzorka na dnevnom svjetlu'], 'Pokažite dvije stvarne opcije i objasnite jednu razliku.', 'Glasajte i pogledajte uzorke u salonu.'),
    ],
  },
  {
    id: 'komoda', name: 'Komoda', question: 'Što skriva, što nosi i koliko prostora zauzima?',
    mustShow: ['cijelu komodu uz zid', 'otvorena vrata ili ladice', 'dubinu i unutarnju podjelu', 'nogice, ručke i gornju plohu'],
    avoid: 'Nemoj sakriti dubinu i način otvaranja kad su ključni za prolaz.', image: '/brand/castello-showroom.jpeg',
    examples: [
      formatExample('Reel', 'Jedna komoda, tri funkcije', 'Pokazati svestranost', 'Nije samo mjesto za dekoraciju.', ['Komoda zatvorena', 'Posuđe u unutrašnjosti', 'Dokumenti ili tekstil', 'Ploha stilizirana u tri verzije', 'Mjere na ekranu'], 'Komoda može organizirati blagovaonicu, dnevni boravak ili hodnik. Bitni su dubina, raspored unutrašnjosti i prostor za otvaranje.', 'Ponesite mjere zida u salon.'),
      formatExample('Karusel', 'Kako odabrati širinu komode', 'Praktičan vodič', 'Komoda treba ostaviti prostoru da diše.', ['Izmjeri zid', 'Provjeri vrata i utičnice', 'Odredi što spremaš', 'Visina u odnosu na TV ili sliku', 'Prolaz', 'CTA'], 'Osim širine zida provjerite utičnice, otvaranja, prolaz i ono što želite spremiti. Tek tada birajte stil.', 'Spremite prije mjerenja.'),
      formatExample('Fotografija', 'Komoda kao mirna baza', 'Inspiracija', 'Red u prostoru počinje komadom koji ima jasnu ulogu.', ['Ravni kadar', 'Samo 2–3 dekorativna predmeta', 'Vjerna boja', 'Vidljive nogice i rubovi'], '[NAZIV] donosi zatvorenu pohranu i mirniju vizuru prostora. Za dimenzije i izvedbe javite nam se prije dolaska.', 'Pošaljite fotografiju zida za prvi savjet.'),
      formatExample('Story', 'Što biste vi spremili?', 'Dobiti teme od publike', 'Što vam najviše stvara nered?', ['Otvorena prazna komoda', 'Anketa posuđe/tekstil', 'Pitanje otvorenog tipa', 'Primjer organizacije'], 'Pitanje publici vodi sljedećem edukativnom sadržaju.', 'Napišite nam odgovor.'),
    ],
  },
  {
    id: 'krevet', name: 'Krevet', question: 'Odgovaraju li visina, dimenzija i oslonac svakodnevnom korištenju?',
    mustShow: ['cijeli krevet sprijeda i bočno', 'visinu s madracem', 'uzglavlje i materijal', 'osobu koja sjeda ili ustaje'],
    avoid: 'Nemoj davati zdravstvena obećanja; govori o udobnosti i provjerljivim karakteristikama.', image: '/brand/dream-beds.jpeg',
    examples: [
      formatExample('Reel', 'Test visine kreveta', 'Povezati proizvod s uporabom', 'Stopala na podu otkrivaju odgovara li vam visina.', ['Osoba sjeda na rub', 'Stopala na podu', 'Ustajanje', 'Bočni kadar visine', 'Različite kombinacije u salonu'], 'Sjednite na rub i provjerite dosežu li stopala stabilno pod. Usporedite nekoliko visina kreveta i madraca prije odluke.', 'Dođite isprobati kombinacije uživo.'),
      formatExample('Karusel', 'Krevet nije samo madrac', 'Edukacija', 'Četiri dijela zajedno određuju osjećaj kreveta.', ['Okvir', 'Podnica', 'Madrac', 'Visina', 'Uzglavlje', 'Kontrolni popis'], 'Okvir, podnica, madrac i ukupna visina djeluju zajedno. Svaki dio provjerite prema svojim navikama i prostoru.', 'Spremite vodič prije dolaska.'),
      formatExample('Fotografija', 'Uzglavlje izbliza', 'Istaknuti materijal i stil', 'Detalj koji krevet pretvara u središte sobe.', ['Krupni kadar uzglavlja', 'Bočno svjetlo', 'Detalj šava', 'Širi kadar s noćnim ormarićem'], '[NAZIV] ima uzglavlje u izvedbi [POTVRĐENA TKANINA/BOJA]. Ton materijala najtočnije je pogledati na dnevnom svjetlu u salonu.', 'Javite se za dostupne izvedbe.'),
      formatExample('Story', 'Jutarnje pitanje', 'Interakcija', 'Je li vam teže leći ili ustati?', ['Pitanje', 'Anketa prenizak/previsok', 'Kratki test visine', 'Poziv u salon'], 'Jednostavno pitanje otvara temu visine kreveta bez medicinskih tvrdnji.', 'Glasajte i isprobajte nekoliko visina.'),
    ],
  },
];

export const contentPlan: ContentItem[] = [
  item({
    id: 'w01-mjere', date: '2026-10-19', week: 1, pillar: 'Savjet', format: 'Reel', title: 'Tri mjere prije kupnje garniture',
    goal: 'Smanjiti strah od pogrešne dimenzije i potaknuti kupce da dođu pripremljeni.',
    hook: 'Prije nego odaberete garnituru, izmjerite ove tri stvari.',
    caption: 'Dobra kupnja počinje prije dolaska u salon. Izmjerite zid, najuži prolaz od ulaza do prostorije i prostor potreban za normalno kretanje. Fotografirajte prostor i ponesite mjere — u Vesperi ćemo ih zajedno provjeriti.',
    cta: 'Spremite objavu i ponesite mjere u salon.', shots: standardShots.advice,
    factsToConfirm: ['Točna preporuka za mjerenje', 'Kontakt salona'], image: '/content-os/fotelja-siroki-kadar.png',
  }),
  item({
    id: 'w01-garnitura-detalji', date: '2026-10-21', week: 1, pillar: 'Proizvod', format: 'Karusel', title: 'Što provjeriti na garnituri',
    goal: 'Pretvoriti tehničke detalje u praktične koristi.', hook: 'Izgled je prvi dojam. Ovih pet detalja određuje svakodnevnu udobnost.',
    caption: 'Kod garniture provjerite visinu i dubinu sjedišta, oslonac za leđa, tkaninu, ležaj i spremnik. U salonu sjednite kao kod kuće i nekoliko puta ustanite. Dobar odabir je onaj koji odgovara vašem prostoru i načinu korištenja.',
    cta: 'Pošaljite nam fotografiju prostora ili navratite na isprobavanje.', shots: standardShots.product,
    factsToConfirm: requiredFacts, image: '/content-os/fotelja-detalj.png',
  }),
  item({
    id: 'w01-salon', date: '2026-10-23', week: 1, pillar: 'Salon', format: 'Fotografija', title: 'Zašto namještaj treba isprobati',
    goal: 'Povećati dolaske u salon.', hook: 'Fotografija pokazuje stil. Sjedenje otkriva odgovara li vam proizvod.',
    caption: 'Visina, dubina i čvrstoća sjedišta teško se procjenjuju preko ekrana. Zato vas u Vesperi pozivamo da namještaj pogledate, dodirnete i isprobate prije odluke. Nalazimo se u Ulici Matka Laginje 1 u Karlovcu.',
    cta: 'Navratite u salon i odvojite vrijeme za isprobavanje.', shots: standardShots.trust,
    factsToConfirm: ['Radno vrijeme', 'Adresa salona'], image: '/brand/castello-showroom.jpeg',
  }),
  item({
    id: 'w02-kuhinja-proces', date: '2026-10-26', week: 2, pillar: 'Kuhinje', format: 'Reel', title: 'Od ideje do kuhinje u pet koraka',
    goal: 'Objasniti proces i smanjiti nesigurnost oko prvog razgovora.', hook: 'Za prvi razgovor o kuhinji ne trebate savršen nacrt.',
    caption: 'Proces počinje razgovorom o prostoru, navikama i budžetu. Slijede mjere, raspored, odabir materijala, ponuda i dogovor o izvedbi. Dovoljno je ponijeti osnovne mjere i nekoliko fotografija — ostalo prolazimo zajedno.',
    cta: 'Javite nam se za termin razgovora o kuhinji.', shots: standardShots.kitchen,
    factsToConfirm: kitchenFacts, image: '/brand/castello-showroom.jpeg',
  }),
  item({
    id: 'w02-pohrana', date: '2026-10-28', week: 2, pillar: 'Savjet', format: 'Karusel', title: 'Pametna pohrana u maloj kuhinji',
    goal: 'Pokazati stručnost kroz rješavanje konkretnog problema.', hook: 'Mala kuhinja ne mora imati malo prostora za pohranu.',
    caption: 'Visoki elementi, duboke ladice i dobro iskorišteni kutovi mogu osloboditi radnu plohu i učiniti kuhinju preglednijom. Najbolje rješenje ovisi o vašim navikama, uređajima i stvarnim mjerama prostora.',
    cta: 'Spremite ideje i donesite fotografije prostora na planiranje.', shots: standardShots.kitchen,
    factsToConfirm: kitchenFacts, image: '/content-os/fotelja-detalj.png',
  }),
  item({
    id: 'w02-dostupno', date: '2026-10-30', week: 2, pillar: 'Proizvod', format: 'Fotografija', title: 'Dostupno u salonu ovaj tjedan',
    goal: 'Pretvoriti aktualnu zalihu u konkretne upite.', hook: 'Ovaj komad možete pogledati i isprobati odmah u salonu.',
    caption: 'Izdvajamo model koji je trenutačno dostupan za pregled u Vesperi. Prije dolaska nazovite nas kako bismo potvrdili stanje, cijenu i mogućnosti dostave. Ponuda i dostupnost mogu se promijeniti.',
    cta: 'Nazovite 047 645 535 i provjerite dostupnost.', shots: standardShots.product,
    factsToConfirm: [...requiredFacts, 'Uvjeti dostave i montaže'], image: '/content-os/fotelja-siroki-kadar.png',
  }),
  item({
    id: 'w03-realizacija', date: '2026-11-02', week: 3, pillar: 'Kuhinje', format: 'Karusel', title: 'Realizacija: kuhinja prema navikama obitelji',
    goal: 'Izgraditi povjerenje kroz stvaran projekt.', hook: 'Dobra kuhinja počinje pitanjem: kako je stvarno koristite?',
    caption: 'Kod ove realizacije raspored je oblikovan prema svakodnevnim navikama ukućana, potrebnoj radnoj plohi i mjestu za odlaganje. Prikazujemo detalje koji se na nacrtu lako previde, a u korištenju čine veliku razliku.',
    cta: 'Pošaljite nam fotografije svoje kuhinje za prvi razgovor.', shots: standardShots.kitchen,
    factsToConfirm: ['Suglasnost kupca za objavu', ...kitchenFacts], image: '/brand/castello-showroom.jpeg',
  }),
  item({
    id: 'w03-stol', date: '2026-11-04', week: 3, pillar: 'Savjet', format: 'Reel', title: 'Kako odabrati veličinu blagovaonskog stola',
    goal: 'Pomoći kupcu procijeniti prostor prije kupnje.', hook: 'Stol može stati u prostor, a ipak smetati pri svakom prolasku.',
    caption: 'Uz dimenziju stola računajte i prostor za izvlačenje stolice te prolaz iza osobe koja sjedi. Označite gabarit na podu ljepljivom trakom i provjerite kako se krećete oko njega. U salon ponesite mjeru zida i širinu prolaza.',
    cta: 'Spremite vodič prije mjerenja blagovaonice.', shots: standardShots.advice,
    factsToConfirm: ['Dimenzije prikazanog stola', ...requiredFacts], image: '/content-os/fotelja-u-upotrebi.png',
  }),
  item({
    id: 'w03-pitanja', date: '2026-11-06', week: 3, pillar: 'Povjerenje', format: 'Reel', title: 'Pitanje tjedna iz salona',
    goal: 'Pokrenuti komentare i prikupiti teme koje kupce stvarno zanimaju.', hook: 'Koje pitanje o namještaju najčešće ostane bez jasnog odgovora?',
    caption: 'Dimenzije, rok, tkanina, dostava ili održavanje? Napišite pitanje u komentar ili nam ga pošaljite porukom. Svakog tjedna odabrat ćemo jedno i odgovoriti kratko, jasno i bez stručnog žargona.',
    cta: 'Ostavite svoje pitanje u komentaru.', shots: standardShots.trust,
    factsToConfirm: ['Tko iz tima daje odgovor'], image: '/brand/castello-showroom.jpeg',
  }),
  item({
    id: 'w04-tkanina', date: '2026-11-09', week: 4, pillar: 'Savjet', format: 'Karusel', title: 'Prva pomoć za mrlju na tkanini',
    goal: 'Dati praktičan savjet koji se sprema i dijeli.', hook: 'Kod prolijevanja je brzina važnija od jačine sredstva.',
    caption: 'Tekućinu najprije upijte čistom svijetlom krpom, bez trljanja. Prije korištenja sredstva provjerite deklaraciju tkanine i testirajte ga na skrivenom mjestu. Ako niste sigurni, pitajte za upute uz konkretan model.',
    cta: 'Spremite objavu za slučaj nezgode.', shots: standardShots.advice,
    factsToConfirm: ['Uputa proizvođača za prikazanu tkaninu'], image: '/content-os/fotelja-detalj.png',
  }),
  item({
    id: 'w04-krevet', date: '2026-11-11', week: 4, pillar: 'Proizvod', format: 'Reel', title: 'Visina kreveta i lakše ustajanje',
    goal: 'Povezati proizvod s konkretnom životnom potrebom.', hook: 'Dobar krevet nije samo pitanje madraca — važna je i visina.',
    caption: 'Sjednite na rub kreveta i provjerite dosežu li stopala stabilno pod. Prenizak ili previsok krevet može otežati lijeganje i ustajanje. U salonu usporedite različite visine i pronađite onu koja odgovara vama.',
    cta: 'Dođite isprobati različite kombinacije kreveta i madraca.', shots: standardShots.product,
    factsToConfirm: requiredFacts, image: '/brand/dream-beds.jpeg',
  }),
  item({
    id: 'w04-3d', date: '2026-11-13', week: 4, pillar: 'Kuhinje', format: 'Fotografija', title: 'Iza kulisa 3D planiranja',
    goal: 'Učiniti uslugu planiranja opipljivom.', hook: 'Prije prve ladice postoji mnogo dobrih pitanja.',
    caption: '3D prikaz pomaže zamisliti raspored, boje i odnose u prostoru. Prije konačne odluke provjeravamo mjere, uređaje, otvaranja i navike ukućana. Vizual je početak razgovora, a potvrđeni nacrt vodi izvedbu.',
    cta: 'Dogovorite prvi razgovor o svojoj kuhinji.', shots: standardShots.kitchen,
    factsToConfirm: ['Je li usluga besplatna i pod kojim uvjetima', ...kitchenFacts], image: '/brand/castello-showroom.jpeg',
  }),
  item({
    id: 'w05-mali-dnevni', date: '2026-11-16', week: 5, pillar: 'Savjet', format: 'Reel', title: 'Kutna garnitura u malom dnevnom boravku',
    goal: 'Pomoći kupcima malih stanova i povećati kvalitetne upite.', hook: 'Najveća garnitura koja stane često nije najbolja garnitura za prostor.',
    caption: 'Označite širinu i dubinu garniture na podu, zatim provjerite prolaz, balkonska vrata i prostor za otvaranje ležaja. U malom prostoru prednost mogu imati uži rukonasloni, podignute nogice i kraća ležaljka.',
    cta: 'Pošaljite fotografiju i mjere prostora prije dolaska.', shots: standardShots.advice,
    factsToConfirm: ['Model prikazan u videu', ...requiredFacts], image: '/content-os/fotelja-siroki-kadar.png',
  }),
  item({
    id: 'w05-varia', date: '2026-11-18', week: 5, pillar: 'Kuhinje', format: 'Karusel', title: 'Detalj Varia Purion kuhinje',
    goal: 'Graditi stručni autoritet kroz jedan provjerljiv detalj.', hook: 'Detalj koji se vidi tek kada otvorite element.',
    caption: 'Kod kuhinje ne gledamo samo fronte. Način otvaranja, unutrašnjost ladice, okovi i završna obrada utječu na svakodnevno korištenje. Ovaj tjedan izdvajamo jedan detalj Varia Purion sustava i objašnjavamo kome može koristiti.',
    cta: 'Pogledajte uzorke i mehanizme u Vespera studiju.', shots: standardShots.kitchen,
    factsToConfirm: ['Točan naziv mehanizma', 'Dobavljivost prikazane izvedbe', ...kitchenFacts], image: '/content-os/fotelja-detalj.png',
  }),
  item({
    id: 'w05-akcija', date: '2026-11-20', week: 5, pillar: 'Proizvod', format: 'Fotografija', title: 'Aktualna ponuda bez sitnih slova',
    goal: 'Objaviti prodajnu ponudu jasno i vjerodostojno.', hook: 'Jedan proizvod, jedna cijena i sve što trebate znati prije dolaska.',
    caption: 'Izdvojeni model dostupan je u prikazanoj izvedbi i ograničenoj količini. U objavi jasno navodimo cijenu, dimenzije, stanje, trajanje ponude te uključuje li dostavu ili montažu. Prije dolaska zatražite potvrdu dostupnosti.',
    cta: 'Nazovite salon i rezervirajte provjeru proizvoda.', shots: standardShots.product,
    factsToConfirm: [...requiredFacts, 'Najniža cijena u prethodnih 30 dana ako je sniženje', 'Početak i završetak akcije', 'Količina'], image: '/content-os/fotelja-siroki-kadar.png',
  }),
  item({
    id: 'w06-ustajanje', date: '2026-11-23', week: 6, pillar: 'Savjet', format: 'Reel', title: 'Fotelja iz koje se lakše ustaje',
    goal: 'Pokazati empatiju i funkcionalnu vrijednost ponude.', hook: 'Tri detalja mogu znatno olakšati ustajanje iz fotelje.',
    caption: 'Više i stabilnije sjedište, čvrsti nasloni za ruke i dobra potpora leđima mogu olakšati svakodnevno korištenje. Najsigurnije je nekoliko puta sjesti i ustati u salonu. Ako fotelju koristi više osoba, povedite ih na isprobavanje.',
    cta: 'Navratite i isprobajte modele koji odgovaraju vašim potrebama.', shots: standardShots.product,
    factsToConfirm: requiredFacts, image: '/content-os/fotelja-u-upotrebi.png',
  }),
  item({
    id: 'w06-izbor-tima', date: '2026-11-25', week: 6, pillar: 'Povjerenje', format: 'Karusel', title: 'Izbor Vespera tima',
    goal: 'Uvesti ljudski glas i preporuku u sadržaj.', hook: 'Pitali smo naš tim koji detalj prvo provjeravaju na ovom proizvodu.',
    caption: 'Svaki član tima gleda proizvod malo drugačije. U ovom karuselu izdvajamo tri kratke preporuke iz salona: što provjeriti, kome model odgovara i što obavezno izmjeriti prije odluke.',
    cta: 'Koji biste detalj vi prvo provjerili?', shots: standardShots.trust,
    factsToConfirm: ['Imena i funkcije članova tima', ...requiredFacts], image: '/brand/castello-showroom.jpeg',
  }),
  item({
    id: 'w06-dostava', date: '2026-11-27', week: 6, pillar: 'Savjet', format: 'Reel', title: 'Priprema doma za dostavu',
    goal: 'Smanjiti probleme kod dostave i pokazati brigu nakon kupnje.', hook: 'Prije dostave provjerite put kojim namještaj ulazi u dom.',
    caption: 'Izmjerite vrata, hodnik, stubište i najuži zavoj. Oslobodite prolaz, zaštitite osjetljive podove i unaprijed javite postoji li problem s pristupom ili parkingom. Opseg dostave i montaže uvijek potvrdite na ponudi.',
    cta: 'Spremite checklistu prije termina dostave.', shots: standardShots.advice,
    factsToConfirm: ['Aktualni uvjeti Vesperine dostave i montaže'], image: '/content-os/fotelja-siroki-kadar.png',
  }),
  item({
    id: 'w07-materijali', date: '2026-11-30', week: 7, pillar: 'Kuhinje', format: 'Karusel', title: 'Kako usporediti kuhinjske fronte',
    goal: 'Educirati kupca i pripremiti kvalitetniji razgovor u salonu.', hook: 'Boja je važna, ali nije jedina razlika između fronti.',
    caption: 'Kod odabira fronte usporedite završnu obradu, način održavanja, otpornost i kako izgleda pod različitim svjetlom. Uzorak pogledajte uz radnu ploču i pod, a odluku donesite tek kada vidite cijelu kombinaciju.',
    cta: 'Dođite usporediti uzorke uživo.', shots: standardShots.kitchen,
    factsToConfirm: ['Nazivi i svojstva prikazanih materijala'], image: '/content-os/fotelja-detalj.png',
  }),
  item({
    id: 'w07-popust', date: '2026-12-02', week: 7, pillar: 'Proizvod', format: 'Fotografija', title: 'Posljednji komadi iz aktualne ponude',
    goal: 'Potaknuti provjeru dostupnosti bez umjetne hitnosti.', hook: 'Ograničena količina znači da dostupnost provjeravamo prije vašeg dolaska.',
    caption: 'Izdvajamo proizvode koji su dostupni u ograničenoj količini ili kao izložbeni primjerci. Za svaki komad navodimo stanje, cijenu i uvjete preuzimanja. Nazovite prije dolaska kako bismo potvrdili da je proizvod još dostupan.',
    cta: 'Provjerite dostupnost na 047 645 535.', shots: standardShots.product,
    factsToConfirm: [...requiredFacts, 'Stanje izložbenog primjerka', 'Uvjeti preuzimanja'], image: '/content-os/fotelja-siroki-kadar.png',
  }),
  item({
    id: 'w07-obilazak', date: '2026-12-04', week: 7, pillar: 'Salon', format: 'Reel', title: '60 sekundi kroz Vespera salon',
    goal: 'Smanjiti prepreku prvog dolaska i pokazati širinu ponude.', hook: 'Što možete pogledati u Vesperi prije nego donesete odluku?',
    caption: 'Kratko vas vodimo kroz salon: garniture, blagovaonice, spavaće sobe, uzorke i kuhinjski studio. Dođite s fotografijama prostora i osnovnim mjerama — razgovor će odmah biti konkretniji.',
    cta: 'Spremite lokaciju: Matka Laginje 1, Karlovac.', shots: standardShots.trust,
    factsToConfirm: ['Radno vrijeme', 'Odjeli koje snimamo'], image: '/brand/castello-showroom.jpeg',
  }),
  item({
    id: 'w08-boxspring', date: '2026-12-07', week: 8, pillar: 'Savjet', format: 'Karusel', title: 'Boxspring ili klasični krevet',
    goal: 'Pomoći usporedbi prije kupnje.', hook: 'Ne postoji bolji krevet za sve — postoji bolji izbor za vaše navike.',
    caption: 'Boxspring obično nudi višu površinu i slojevitu konstrukciju, dok klasični okvir daje veću slobodu kombiniranja madraca i podnice. Usporedite visinu, osjećaj pri ležanju, održavanje i mogućnost zamjene pojedinih dijelova.',
    cta: 'Isprobajte obje opcije u salonu prije odluke.', shots: standardShots.product,
    factsToConfirm: ['Koji su modeli izloženi', ...requiredFacts], image: '/brand/dream-beds.jpeg',
  }),
  item({
    id: 'w08-blagovaonica', date: '2026-12-09', week: 8, pillar: 'Proizvod', format: 'Reel', title: 'Blagovaonica spremna za goste',
    goal: 'Povezati ponudu s blagdanskim okupljanjima.', hook: 'Prije dodatnih stolica provjerite koliko mjesta stvarno imate.',
    caption: 'Za ugodno okupljanje važni su stabilan stol, dovoljno prostora po osobi i prolaz kada su stolice izvučene. Pokazujemo stol na razvlačenje i tri kadra koja pomažu procijeniti odgovara li vašoj blagovaonici.',
    cta: 'Pošaljite nam dimenzije prostora za preporuku modela.', shots: standardShots.product,
    factsToConfirm: ['Dimenzije sklopljenog i razvučenog stola', ...requiredFacts], image: '/content-os/fotelja-siroki-kadar.png',
  }),
  item({
    id: 'w08-recenzija', date: '2026-12-11', week: 8, pillar: 'Povjerenje', format: 'Fotografija', title: 'Iskustvo kupca: od razgovora do dostave',
    goal: 'Povećati povjerenje dokazom iz stvarnog iskustva.', hook: 'Najviše nam znači kada kupac kaže što je u procesu bilo stvarno korisno.',
    caption: 'Dijelimo provjereno iskustvo kupca o savjetovanju, odabiru i dostavi. Zahvalni smo na povjerenju i svakoj povratnoj informaciji koja nam pomaže biti jasniji i korisniji.',
    cta: 'Ako ste kupovali u Vesperi, ostavite nam iskrenu recenziju.', shots: standardShots.trust,
    factsToConfirm: ['Izvorna recenzija', 'Dopuštenje za ime ili inicijal'], image: '/brand/castello-showroom.jpeg',
  }),
  item({
    id: 'w09-cijena-kuhinje', date: '2026-12-14', week: 9, pillar: 'Kuhinje', format: 'Karusel', title: 'Što utječe na cijenu kuhinje po mjeri',
    goal: 'Objasniti cijenu bez lažnog pojednostavljivanja.', hook: 'Dvije kuhinje iste duljine mogu imati vrlo različitu cijenu.',
    caption: 'Broj ladica, visoki elementi, okovi, radna ploča, unutarnja oprema, uređaji i montaža utječu na konačnu cijenu. Zato kvalitetna ponuda nastaje nakon mjera i jasne specifikacije, a cijena po dužnom metru može biti samo gruba orijentacija.',
    cta: 'Dogovorite razgovor i zatražite jasnu pisanu ponudu.', shots: standardShots.kitchen,
    factsToConfirm: kitchenFacts, image: '/content-os/fotelja-detalj.png',
  }),
  item({
    id: 'w09-lezaj', date: '2026-12-16', week: 9, pillar: 'Proizvod', format: 'Reel', title: 'Kako se otvara pomoćni ležaj',
    goal: 'Pokazati funkciju koju fotografija ne može objasniti.', hook: 'Prije kupnje provjerite koliko prostora garnitura zauzima kada je ležaj otvoren.',
    caption: 'U kratkom videu pokazujemo cijeli postupak otvaranja, dimenziju ležaja i prostor potreban ispred garniture. Mehanizam isprobajte sami i pitajte je li ležaj namijenjen povremenom ili češćem spavanju.',
    cta: 'Dođite isprobati mehanizam u salonu.', shots: standardShots.product,
    factsToConfirm: ['Dimenzija otvorenog ležaja', 'Namjena prema proizvođaču', ...requiredFacts], image: '/content-os/fotelja-u-upotrebi.png',
  }),
  item({
    id: 'w09-tim', date: '2026-12-18', week: 9, pillar: 'Povjerenje', format: 'Fotografija', title: 'Ljudi koji pomažu prije odluke',
    goal: 'Humanizirati Vesperu i povezati lice s uslugom.', hook: 'Iza svake dobre preporuke stoji razgovor o prostoru i potrebama.',
    caption: 'Upoznajte osobu koja vas u salonu vodi kroz dimenzije, materijale i mogućnosti narudžbe. Naš je posao pomoći da prije odluke znate što kupujete, kada dolazi i kako će se uklopiti u vaš prostor.',
    cta: 'Navratite s fotografijama i mjerama prostora.', shots: standardShots.trust,
    factsToConfirm: ['Ime i uloga osobe na fotografiji'], image: '/brand/castello-showroom.jpeg',
  }),
  item({
    id: 'w10-blagdanski-stol', date: '2026-12-21', week: 10, pillar: 'Savjet', format: 'Karusel', title: 'Blagdanski stol bez gužve',
    goal: 'Dati pravovremen, praktičan sezonski savjet.', hook: 'Više mjesta za stolom počinje dobrim rasporedom, a ne još jednom stolicom.',
    caption: 'Provjerite prolaz iza stolica, pomaknite dekoraciju koja smeta razgovoru i pripremite produžetak stola prije dolaska gostiju. Ako birate novi stol, izmjerite prostor u punoj, razvučenoj dimenziji.',
    cta: 'Spremite savjete prije blagdanskog okupljanja.', shots: standardShots.advice,
    factsToConfirm: ['Radno vrijeme u blagdanskom tjednu'], image: '/content-os/fotelja-siroki-kadar.png',
  }),
  item({
    id: 'w10-odmah', date: '2026-12-23', week: 10, pillar: 'Proizvod', format: 'Fotografija', title: 'Što je dostupno odmah',
    goal: 'Usmjeriti kupce prema provjerenoj zalihi prije blagdana.', hook: 'Tražite proizvod bez redovne narudžbe? Ovo je aktualno stanje u salonu.',
    caption: 'Izdvajamo proizvode koje je moguće pogledati odmah. Količine se mogu brzo promijeniti, zato prije dolaska zatražite potvrdu konkretnog modela, boje i uvjeta preuzimanja.',
    cta: 'Nazovite 047 645 535 prije dolaska.', shots: standardShots.product,
    factsToConfirm: [...requiredFacts, 'Posebno radno vrijeme', 'Najraniji mogući termin preuzimanja'], image: '/content-os/fotelja-siroki-kadar.png',
  }),
  item({
    id: 'w10-cestitka', date: '2026-12-25', week: 10, pillar: 'Povjerenje', format: 'Fotografija', title: 'Blagdanska poruka iz Vespere',
    goal: 'Njegovati odnos sa zajednicom bez prodajne poruke.', hook: 'Hvala što ste svoje domove i odluke ove godine dijelili s nama.',
    caption: 'Želimo vam mirne blagdane, ugodne razgovore i mnogo lijepih trenutaka kod kuće. Hvala svakom kupcu koji nam je poklonio povjerenje i svima koji su nas preporučili dalje. Vaš Vespera tim.',
    cta: 'Bez prodajnog CTA-a.', shots: standardShots.trust,
    factsToConfirm: ['Konačna formulacija čestitke'], image: '/brand/vespera-brand-reference.jpeg',
  }),
  item({
    id: 'w11-plan-doma', date: '2026-12-28', week: 11, pillar: 'Savjet', format: 'Reel', title: 'Tri male promjene za funkcionalniji dom',
    goal: 'Povezati novogodišnje planiranje s praktičnim uređenjem.', hook: 'Ne morate mijenjati cijeli dom da biste ga lakše koristili.',
    caption: 'Oslobodite prolaz, premjestite komad koji blokira svjetlo i preispitajte gdje vam nedostaje pohrana. Tek nakon toga odlučite treba li vam novi namještaj. Dobra promjena počinje problemom koji želite riješiti.',
    cta: 'Napišite koji prostor želite poboljšati u novoj godini.', shots: standardShots.advice,
    factsToConfirm: [], image: '/content-os/fotelja-u-upotrebi.png',
  }),
  item({
    id: 'w11-ormar', date: '2026-12-30', week: 11, pillar: 'Proizvod', format: 'Karusel', title: 'Ormar iznutra: planiranje pohrane',
    goal: 'Pokazati funkcionalnost koja se ne vidi na naslovnoj fotografiji.', hook: 'Pravi kapacitet ormara vidi se tek kada otvorite vrata.',
    caption: 'Broj polica nije jedino mjerilo. Razmislite što vješate, što slažete, trebate li ladice i koliko visokog prostora koristite. U karuselu pokazujemo kako raspored unutrašnjosti mijenja svakodnevnu organizaciju.',
    cta: 'Napravite popis stvari koje ormar treba primiti.', shots: standardShots.product,
    factsToConfirm: ['Dostupne unutarnje izvedbe', ...requiredFacts], image: '/content-os/fotelja-detalj.png',
  }),
  item({
    id: 'w11-godina', date: '2027-01-01', week: 11, pillar: 'Povjerenje', format: 'Karusel', title: 'Godina u nekoliko Vespera trenutaka',
    goal: 'Pokazati kontinuitet, realizacije i zahvalnost.', hook: 'Iza svake fotografije ostaje jedan stvaran prostor i jedna važna odluka.',
    caption: 'Prisjećamo se nekoliko projekata, proizvoda i susreta koji su obilježili godinu. Hvala kupcima, partnerima i timu na povjerenju. U novu godinu ulazimo s istim ciljem: pomoći vam donijeti sigurniju odluku za svoj dom.',
    cta: 'Koji vam je Vespera trenutak ostao u sjećanju?', shots: standardShots.trust,
    factsToConfirm: ['Prava korištenja svih fotografija', 'Popis realizacija'], image: '/brand/castello-showroom.jpeg',
  }),
  item({
    id: 'w12-prvi-razgovor', date: '2027-01-04', week: 12, pillar: 'Kuhinje', format: 'Reel', title: 'Što ponijeti na prvi razgovor o kuhinji',
    goal: 'Povećati broj kvalitetno pripremljenih upita.', hook: 'Za početak su dovoljne četiri stvari koje već imate kod kuće.',
    caption: 'Ponesite osnovne mjere, fotografije prostora, popis uređaja i nekoliko primjera stila koji vam se sviđa. Dodajte okvirni budžet i recite što u sadašnjoj kuhinji ne funkcionira. To je dovoljno za konkretan prvi razgovor.',
    cta: 'Spremite popis i dogovorite termin.', shots: standardShots.kitchen,
    factsToConfirm: ['Način dogovaranja termina', ...kitchenFacts], image: '/brand/castello-showroom.jpeg',
  }),
  item({
    id: 'w12-uzorci', date: '2027-01-06', week: 12, pillar: 'Kuhinje', format: 'Karusel', title: 'Kako kombinirati frontu, radnu ploču i pod',
    goal: 'Pokazati vrijednost fizičkih uzoraka i stručnog savjeta.', hook: 'Tri lijepa uzorka ne moraju zajedno izgledati skladno.',
    caption: 'Uzorci se uspoređuju zajedno i pod svjetlom sličnim onome u vašem prostoru. Obratite pažnju na temperaturu boje, uzorak i kontrast. Fotografija na ekranu može promijeniti nijansu, zato konačan izbor provjerite uživo.',
    cta: 'Donesite fotografiju poda i pogledajte kombinacije u salonu.', shots: standardShots.kitchen,
    factsToConfirm: ['Nazivi prikazanih dekora'], image: '/content-os/fotelja-detalj.png',
  }),
  item({
    id: 'w12-termin', date: '2027-01-08', week: 12, pillar: 'Salon', format: 'Fotografija', title: 'Rezervirajte miran termin za planiranje',
    goal: 'Pretvoriti interes za kuhinju u dogovoren razgovor.', hook: 'Dobar plan traži vrijeme za pitanja, mjere i usporedbu mogućnosti.',
    caption: 'Ako planirate kuhinju ili veće opremanje, dogovoreni termin omogućuje da razgovor posvetimo vašem prostoru. Pošaljite osnovne informacije unaprijed i pripremit ćemo konkretnija pitanja za susret.',
    cta: 'Javite se telefonom ili e-mailom za termin.', shots: standardShots.trust,
    factsToConfirm: ['Dostupni termini', 'Trajanje razgovora', 'Je li termin obvezan'], image: '/brand/castello-showroom.jpeg',
  }),
  item({
    id: 'w13-test-garniture', date: '2027-01-11', week: 13, pillar: 'Savjet', format: 'Reel', title: 'Test udobnosti u 30 sekundi',
    goal: 'Naučiti kupca kako kvalitetno isprobati garnituru.', hook: 'Nemojte samo sjesti. Napravite ovaj kratki test.',
    caption: 'Sjednite do kraja, oslonite leđa, provjerite dosežu li stopala pod i ustanite bez pridržavanja ako možete. Zatim isprobajte mjesto na kojem biste najčešće sjedili kod kuće. Nekoliko minuta u salonu može spriječiti pogrešan izbor.',
    cta: 'Spremite test i isprobajte ga u Vesperi.', shots: standardShots.product,
    factsToConfirm: requiredFacts, image: '/content-os/fotelja-u-upotrebi.png',
  }),
  item({
    id: 'w13-pogreske', date: '2027-01-13', week: 13, pillar: 'Savjet', format: 'Karusel', title: 'Pet čestih pogrešaka pri planiranju prostorije',
    goal: 'Stvoriti vrijedan sadržaj za spremanje i dijeljenje.', hook: 'Proizvod može odgovarati mjerom, a ipak ne odgovarati prostoru.',
    caption: 'Najčešće se zaborave otvaranje vrata, radijator, utičnice, put dostave i prostor za svakodnevni prolaz. Prije kupnje nacrtajte jednostavan tlocrt i označite sve fiksne elemente.',
    cta: 'Pošaljite objavu osobi koja trenutačno uređuje dom.', shots: standardShots.advice,
    factsToConfirm: [], image: '/content-os/fotelja-siroki-kadar.png',
  }),
  item({
    id: 'w13-dodjite', date: '2027-01-15', week: 13, pillar: 'Salon', format: 'Reel', title: 'Što možete riješiti jednim dolaskom u Vesperu',
    goal: 'Zaključiti tromjesečje jasnim pozivom u salon.', hook: 'Dođite s mjerama. Otiđite s jasnijim sljedećim korakom.',
    caption: 'U jednom dolasku možete usporediti dimenzije, materijale, udobnost i mogućnosti narudžbe. Za kuhinju možemo otvoriti razgovor o rasporedu, uređajima i budžetu. Ne morate unaprijed znati stručne izraze — dovoljno je opisati prostor i potrebe.',
    cta: 'Navratite u Matka Laginje 1, Karlovac.', shots: standardShots.trust,
    factsToConfirm: ['Radno vrijeme', 'Kontakt'], image: '/brand/castello-showroom.jpeg',
  }),
];

export const contentPillars = [
  { name: 'Savjet', share: '35%', purpose: 'Odgovara na pitanja i smanjuje strah od pogrešne odluke.' },
  { name: 'Proizvod', share: '25%', purpose: 'Pokazuje korist, dimenzije, funkcije i stvarnu dostupnost.' },
  { name: 'Kuhinje', share: '20%', purpose: 'Vodi od prve ideje do razgovora i pisanog prijedloga.' },
  { name: 'Povjerenje', share: '10%', purpose: 'Pokazuje ljude, recenzije, realizacije i iskustvo.' },
  { name: 'Salon', share: '10%', purpose: 'Potiče dolazak, isprobavanje i razgovor uživo.' },
];

export const publishingRules = [
  'Objavljuj ponedjeljkom, srijedom i petkom. Vrijeme testiraj šest tjedana prije promjene.',
  'Za svaki Reel snimi najmanje pet kratkih vertikalnih kadrova i jedan kadar bez govora za naslovnicu.',
  'Jedan glavni materijal pretvori u Reel, Story najavu i Story podsjetnik. Ne stvaraj tri odvojena snimanja.',
  'Cijenu, popust, dostupnost, rok i uvjete dostave Natalija potvrđuje isti dan prije objave.',
  'Ako proizvod nije dostupan, objava se ne briše iz plana: zamijeni se edukativnim sadržajem istog stupa.',
  'Nakon 48 sati zapiši doseg, spremanja, dijeljenja, komentare, klikove i broj konkretnih upita.',
];

export const toneRules = {
  name: 'Nenad Vukušić TOV',
  note: 'Vesperina radna interpretacija: jasno, ljudski, konkretno i s mjerom duhovito. Ne kopiramo osobu; primjenjujemo javno prepoznatljive komunikacijske principe na Vesperin glas.',
  promise: 'Pišemo kao iskusan čovjek iz salona koji razumije stvarni problem kupca i zna ga objasniti bez reklamnog prenemaganja.',
  use: [
    'kreni od stvarne situacije kupca',
    'jedna korisna misao po objavi',
    'kratke rečenice i razgovoran hrvatski',
    'činjenice, mjere i primjeri umjesto pridjeva',
    'blaga dosjetka samo kada prirodno sjedne',
    'jedan lagan i jasan sljedeći korak',
  ],
  avoid: [
    'savršeno, premium i najbolje bez dokaza',
    'rečenice koje zvuče kao letak ili oglas',
    'forsirane šale i pametovanje',
    'stručni žargon bez ljudskog objašnjenja',
    'strah, pritisak i više uskličnika',
    'cijene, rokovi i popusti bez potvrde',
  ],
  rewrites: [
    {
      before: 'Otkrijte savršenstvo vrhunske kvalitete za vaš dom.',
      after: 'Kauč može stati u sobu i svejedno smetati. Zato prvo mjerimo prolaz, pa tek onda biramo model.',
    },
    {
      before: 'Iskoristite nevjerojatnu ponudu koju ne smijete propustiti!',
      after: 'Ovaj je model snižen do 31. listopada. U salonu ga možete sjesti, otvoriti i izmjeriti.',
    },
    {
      before: 'Javite nam se za više informacija.',
      after: 'Pošaljite fotografiju i tri osnovne mjere. Reći ćemo vam s čime ima smisla krenuti.',
    },
  ],
};
