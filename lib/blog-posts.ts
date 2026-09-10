export type BlogSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type BlogPost = {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  intro: string;
  sections: BlogSection[];
  ctaLabel: string;
  ctaHref: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'kako-izmjeriti-prostor',
    category: 'Mjerenje',
    readTime: '5 min čitanja',
    title: 'Kako pravilno izmjeriti prostor prije kupnje namještaja?',
    intro: 'Dobra mjera nije samo širina zida. Nekoliko dodatnih provjera može spriječiti neugodno iznenađenje pri dostavi i postavljanju.',
    sections: [
      {
        heading: 'Počnite od zida, ali nemojte stati na njemu',
        paragraphs: ['Izmjerite korisnu širinu zida, od ruba do ruba, bez lajsni i drugih prepreka. Zabilježite položaj utičnica, radijatora, prozora i vrata koja se otvaraju prema namještaju.'],
        points: ['Širina i visina zida', 'Udaljenost do prozora i vrata', 'Položaj radijatora i utičnica'],
      },
      {
        heading: 'Provjerite put do prostorije',
        paragraphs: ['Najljepša garnitura ne pomaže ako ne može proći kroz ulaz. Izmjerite ulazna vrata, hodnik, stubište i najuže mjesto na putu do prostorije.'],
        points: ['Širina svih vrata', 'Najuži dio hodnika', 'Zavoji, stubište i dizalo'],
      },
      {
        heading: 'Ostavite prostor za svakodnevni život',
        paragraphs: ['Ne planirajte namještaj od zida do zida. Ostavite dovoljno mjesta za prolaz, otvaranje vrata i ladica te jednostavno čišćenje. Ako niste sigurni, donesite skicu i fotografije u salon.'],
      },
    ],
    ctaLabel: 'Isprobajte kalkulator za Manilu',
    ctaHref: '/proizvod/manila',
  },
  {
    slug: 'lakse-ustajanje',
    category: 'Udobnost',
    readTime: '4 min čitanja',
    title: 'Kako odabrati garnituru iz koje se lakše ustaje?',
    intro: 'Udobnost nije samo mekoća. Visina, dubina i oslonac mogu znatno promijeniti koliko je sjedenje ugodno i ustajanje sigurno.',
    sections: [
      {
        heading: 'Provjerite visinu sjedišta',
        paragraphs: ['Prenisko sjedište može otežati ustajanje. Sjednite tako da su stopala cijelom površinom na podu, a koljena približno pod pravim kutom.'],
      },
      {
        heading: 'Dubina treba podupirati, ne gurati',
        paragraphs: ['Ako je sjedište preduboko, leđa ostaju bez oslonca ili stopala ne dosežu pod. Isprobajte položaj u kojem možete nasloniti leđa bez naprezanja nogu.'],
      },
      {
        heading: 'Nasloni za ruke pomažu pri ustajanju',
        paragraphs: ['Čvrst i dobro postavljen naslon za ruke pruža oslonac. U salonu nekoliko puta sjednite i ustanite — to je korisniji test od kratkog sjedenja.'],
        points: ['Stopala stabilno na podu', 'Leđa oslonjena bez klizanja', 'Nasloni za ruke na ugodnoj visini'],
      },
    ],
    ctaLabel: 'Odaberite garnituru prema potrebama',
    ctaHref: '/garniture',
  },
  {
    slug: 'priprema-kuhinje-po-mjeri',
    category: 'Kuhinje po mjeri',
    readTime: '6 min čitanja',
    title: 'Što pripremiti za prvi razgovor o kuhinji po mjeri?',
    intro: 'Za početak ne trebate savršen nacrt. Dovoljne su osnovne mjere, nekoliko fotografija i iskren opis onoga što u sadašnjoj kuhinji ne funkcionira.',
    sections: [
      {
        heading: 'Fotografirajte cijeli prostor',
        paragraphs: ['Snimite svaki zid i detalje poput prozora, vrata, bojlera, cijevi i priključaka. Šira fotografija često daje više korisnih informacija od mnogo krupnih detalja.'],
      },
      {
        heading: 'Zapišite osnovne mjere',
        paragraphs: ['Izmjerite zidove, visinu prostorije te položaj vrata i prozora. Za prvi razgovor približne mjere su dovoljne; konačne mjere treba provjeriti prije narudžbe.'],
      },
      {
        heading: 'Razmislite o navikama, ne samo o izgledu',
        paragraphs: ['Koliko osoba koristi kuhinju, treba li vam više radne plohe, gdje držite posuđe i koje uređaje želite zadržati? Ti odgovori oblikuju bolji raspored.'],
        points: ['Popis uređaja', 'Što želite zadržati', 'Okvirni budžet', 'Primjeri boja i stilova koji vam se sviđaju'],
      },
    ],
    ctaLabel: 'Pripremite sažetak projekta',
    ctaHref: '/kuhinje#projekt',
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
