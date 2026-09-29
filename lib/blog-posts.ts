export type BlogSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type BlogQuestion = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  quickAnswer: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  imageAlt: string;
  sections: BlogSection[];
  questions: BlogQuestion[];
  ctaLabel: string;
  ctaHref: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'kako-izmjeriti-prostor',
    category: 'Mjerenje',
    readTime: '5 min čitanja',
    title: 'Kako pravilno izmjeriti prostor prije kupnje namještaja?',
    seoTitle: 'Kako izmjeriti prostor za namještaj | Vespera',
    metaDescription: 'Izmjerite zid, prolaze, vrata i prostor za otvaranje prije kupnje namještaja. Praktičan vodič Vespera salona u Karlovcu.',
    intro: 'Dobra mjera nije samo širina zida. Nekoliko dodatnih provjera može spriječiti neugodno iznenađenje pri dostavi i postavljanju.',
    quickAnswer: 'Izmjerite zid i visinu prostorije, ali i sva vrata, hodnike, zavoje i stubišta kojima namještaj mora proći. Zatim označite prozore, radijatore, utičnice i prostor potreban za normalan prolaz i otvaranje elemenata.',
    author: 'Vespera savjetnici',
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    image: 'https://vespera.hr/wp-content/uploads/2026/07/1781691780_1781690676836_edit_338493474214675.png',
    imageAlt: 'Kutna garnitura u dnevnom boravku kao primjer planiranja dimenzija',
    sections: [
      { heading: 'Počnite od zida, ali nemojte stati na njemu', paragraphs: ['Izmjerite korisnu širinu zida od ruba do ruba, bez lajsni i drugih prepreka. Zabilježite položaj utičnica, radijatora, prozora i vrata koja se otvaraju prema namještaju. Mjeru zapišite u centimetrima i fotografirajte cijeli zid.'], points: ['Širina i visina zida', 'Udaljenost do prozora i vrata', 'Položaj radijatora i utičnica'] },
      { heading: 'Provjerite put od ulaza do prostorije', paragraphs: ['Najljepša garnitura ne pomaže ako ne može proći kroz ulaz. Izmjerite ulazna vrata, hodnik, stubište, dizalo i najuže mjesto na putu. Kod zavoja je važan i prostor za okretanje većih dijelova.'], points: ['Širina i visina svih vrata', 'Najuži dio hodnika', 'Zavoji, stubište i dizalo'] },
      { heading: 'Ostavite prostor za svakodnevni život', paragraphs: ['Ne planirajte namještaj od zida do zida. Ostavite dovoljno mjesta za prolaz, otvaranje vrata i ladica te jednostavno čišćenje. Ako niste sigurni, donesite skicu i fotografije u Vespera salon u Karlovcu.'] },
    ],
    questions: [
      { question: 'Koje mjere trebam ponijeti u salon?', answer: 'Ponesite širinu i visinu zida, položaj vrata i prozora te širinu najužeg prolaza kojim namještaj ulazi u prostor.' },
      { question: 'Je li dovoljna fotografija prostora?', answer: 'Fotografija mnogo pomaže, ali ne zamjenjuje mjere. Najkorisnija je kombinacija nekoliko fotografija, jednostavne skice i osnovnih dimenzija.' },
    ],
    ctaLabel: 'Isprobajte kalkulator za Manilu',
    ctaHref: '/proizvod/manila',
  },
  {
    slug: 'lakse-ustajanje',
    category: 'Udobnost',
    readTime: '4 min čitanja',
    title: 'Kako odabrati garnituru iz koje se lakše ustaje?',
    seoTitle: 'Garnitura iz koje se lakše ustaje | Vespera',
    metaDescription: 'Saznajte kako visina i dubina sjedišta, čvrstoća i nasloni za ruke olakšavaju ustajanje iz garniture ili fotelje.',
    intro: 'Udobnost nije samo mekoća. Visina, dubina i oslonac mogu znatno promijeniti koliko je sjedenje ugodno i ustajanje sigurno.',
    quickAnswer: 'Lakše se ustaje iz dovoljno visokog i stabilnog sjedišta na kojem su stopala cijelom površinom na podu. Važni su čvrsti nasloni za ruke, dobra potpora leđima i dubina koja ne tjera tijelo u klizanje.',
    author: 'Vespera savjetnici',
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    image: 'https://vespera.hr/wp-content/uploads/2026/06/Soho_ambijent.jpg',
    imageAlt: 'Kutna garnitura s višim sjedištem i naslonima za ruke',
    sections: [
      { heading: 'Provjerite visinu i čvrstoću sjedišta', paragraphs: ['Prenisko ili vrlo mekano sjedište može otežati ustajanje. Sjednite tako da su stopala cijelom površinom na podu, a koljena približno pod pravim kutom. Zatim ustanite bez zaleta i procijenite koliko vam je pokret prirodan.'] },
      { heading: 'Dubina treba podupirati, a ne gurati', paragraphs: ['Ako je sjedište preduboko, leđa ostaju bez oslonca ili stopala ne dosežu pod. Isprobajte položaj u kojem možete nasloniti leđa bez naprezanja nogu i bez dodatnih jastuka iza leđa.'] },
      { heading: 'Isprobajte garnituru kao kod kuće', paragraphs: ['U salonu nemojte samo kratko sjesti. Nekoliko puta sjednite i ustanite, naslonite se i provjerite oslonac za ruke. Ako garnituru koristi više osoba, korisno je da je isprobaju svi kojima su udobnost i lakše ustajanje važni.'], points: ['Stopala stabilno na podu', 'Leđa oslonjena bez klizanja', 'Čvrsti nasloni za ruke', 'Ustajanje bez velikog napora'] },
    ],
    questions: [
      { question: 'Je li tvrđa garnitura uvijek bolja za ustajanje?', answer: 'Ne mora biti vrlo tvrda, ali stabilnije sjedište obično pruža bolji oslonac od dubokog sjedišta u koje tijelo jako tone.' },
      { question: 'Može li se udobnost procijeniti samo prema dimenzijama?', answer: 'Dimenzije pomažu u užem izboru, ali osjećaj sjedenja treba provjeriti uživo jer ovise i o punjenju, kutu naslona i građi osobe.' },
    ],
    ctaLabel: 'Odaberite garnituru prema potrebama',
    ctaHref: '/garniture',
  },
  {
    slug: 'priprema-kuhinje-po-mjeri',
    category: 'Kuhinje po mjeri',
    readTime: '6 min čitanja',
    title: 'Što pripremiti za prvi razgovor o kuhinji po mjeri?',
    seoTitle: 'Priprema za kuhinju po mjeri | Vespera Karlovac',
    metaDescription: 'Fotografije, mjere, uređaji, navike i budžet: pripremite informacije za kvalitetniji prvi razgovor o kuhinji po mjeri.',
    intro: 'Za početak ne trebate savršen nacrt. Dovoljne su osnovne mjere, nekoliko fotografija i iskren opis onoga što u sadašnjoj kuhinji ne funkcionira.',
    quickAnswer: 'Za prvi razgovor pripremite fotografije svakog zida, približne mjere, položaj instalacija, popis uređaja i okvirni budžet. Konačnu izvedbu treba temeljiti na stručnoj izmjeri i dogovorenom 3D prijedlogu.',
    author: 'Vespera savjetnici',
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    image: 'https://vespera.hr/wp-content/uploads/2026/06/csm_inspiration_stage_laser_412_3bd5d5fd87.jpg',
    imageAlt: 'Moderna kuhinja po mjeri s radnim otokom',
    sections: [
      { heading: 'Fotografirajte cijeli prostor', paragraphs: ['Snimite svaki zid i detalje poput prozora, vrata, bojlera, cijevi i priključaka. Šira fotografija često daje više korisnih informacija od mnogo krupnih detalja.'] },
      { heading: 'Zapišite osnovne mjere i uređaje', paragraphs: ['Izmjerite zidove, visinu prostorije te položaj vrata i prozora. Zapišite širinu hladnjaka, perilice, pećnice i drugih uređaja koje želite zadržati. Za prvi razgovor približne mjere su dovoljne, ali konačne se provjeravaju prije narudžbe.'] },
      { heading: 'Razmislite o navikama, ne samo o izgledu', paragraphs: ['Koliko osoba koristi kuhinju, treba li vam više radne plohe, gdje držite posuđe i smeta li vam nešto u sadašnjem rasporedu? Ti odgovori oblikuju funkcionalniju kuhinju.'], points: ['Popis uređaja', 'Što želite zadržati', 'Okvirni budžet', 'Primjeri boja i stilova', 'Što sada ne funkcionira'] },
    ],
    questions: [
      { question: 'Moram li imati točne mjere prije prvog razgovora?', answer: 'Ne. Približne mjere dovoljne su za početnu ideju i razgovor. Konačne mjere treba stručno provjeriti prije narudžbe.' },
      { question: 'Zašto je okvirni budžet važan?', answer: 'Budžet pomaže da se odmah usporede izvedive opcije materijala, okova, uređaja i rasporeda bez gubljenja vremena na neprikladna rješenja.' },
    ],
    ctaLabel: 'Pripremite sažetak projekta',
    ctaHref: '/kuhinje#projekt',
  },
  {
    slug: 'kuhinja-po-mjeri-cijena',
    category: 'Kuhinje po mjeri',
    readTime: '7 min čitanja',
    title: 'Koliko košta kuhinja po mjeri i što utječe na cijenu?',
    seoTitle: 'Kuhinja po mjeri: cijena i što je određuje | Vespera',
    metaDescription: 'Cijenu kuhinje po mjeri određuju dimenzije, materijali, okovi, radna ploča, uređaji i montaža. Saznajte kako usporediti ponude.',
    intro: 'Dvije kuhinje iste duljine mogu imati vrlo različitu cijenu. Razlika najčešće nije samo u frontama, nego i u unutrašnjosti elemenata, okovima i detaljima izvedbe.',
    quickAnswer: 'Cijena kuhinje po mjeri ovisi o broju i vrsti elemenata, materijalima fronti i radne ploče, kvaliteti okova, unutarnjoj opremi, uređajima, dostavi i montaži. Zato se kvalitetna cijena daje tek nakon mjera i jasne specifikacije.',
    author: 'Vespera savjetnici',
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    image: 'https://vespera.hr/wp-content/uploads/2026/06/csm_inspiration_stage_laser_412_3bd5d5fd87.jpg',
    imageAlt: 'Kuhinja po mjeri s različitim elementima i radnom pločom',
    sections: [
      { heading: 'Duljina kuhinje nije jedina mjera cijene', paragraphs: ['Visoki elementi, ladice, kutni mehanizmi i posebni završeci mogu znatno promijeniti ukupnu cijenu. Otvoreni prostor bez mnogo prepreka obično se planira jednostavnije od prostora s kosinama, cijevima ili nestandardnim kutovima.'] },
      { heading: 'Materijali i okovi čine veliku razliku', paragraphs: ['Fronte, radna ploča, ručkice, šarke i vodilice razlikuju se po trajnosti, izgledu i cijeni. Tražite da ponuda jasno navede što je uključeno kako biste uspoređivali jednaku razinu izvedbe.'], points: ['Materijal i obrada fronti', 'Vrsta radne ploče', 'Šarke i vodilice', 'Unutarnja oprema ladica', 'Rasvjeta i dodatni mehanizmi'] },
      { heading: 'Kako dobiti korisnu i usporedivu ponudu', paragraphs: ['Prije usporedbe ponuda provjerite uključuju li izmjeru, 3D prijedlog, dostavu, montažu, izreze, završne letvice i priključivanje uređaja. Najniži početni iznos nije nužno i najniži konačni trošak.'] },
    ],
    questions: [
      { question: 'Može li se cijena kuhinje dati samo prema dužnom metru?', answer: 'Cijena po dužnom metru može poslužiti samo kao vrlo gruba orijentacija jer ne uključuje razlike u elementima, materijalima, okovima i posebnim rješenjima.' },
      { question: 'Kako smanjiti cijenu bez velikog gubitka funkcionalnosti?', answer: 'Najprije pojednostavite raspored i broj posebnih mehanizama. Savjetnik može predložiti gdje se isplati uložiti, a gdje odabrati jednostavniju izvedbu.' },
    ],
    ctaLabel: 'Zatražite razgovor o kuhinji',
    ctaHref: '/kuhinje#projekt',
  },
  {
    slug: 'kutna-garnitura-za-mali-dnevni-boravak',
    category: 'Dnevni boravak',
    readTime: '6 min čitanja',
    title: 'Kako odabrati kutnu garnituru za mali dnevni boravak?',
    seoTitle: 'Kutna garnitura za mali dnevni boravak | Vespera',
    metaDescription: 'Odaberite kutnu garnituru za mali prostor prema mjerama, strani kuta, dubini, prolazima, ležaju i spremniku.',
    intro: 'Mali dnevni boravak ne traži nužno mali broj sjedećih mjesta. Ključ je odabrati mjeru, stranu kuta i funkcije koje neće blokirati prolaz.',
    quickAnswer: 'Za mali dnevni boravak prvo odredite najveću dopuštenu širinu i dubinu te ostavite slobodan prolaz. Provjerite stranu kuta, prostor za razvlačenje ležaja i otvaranje spremnika, a zatim usporedite modele uživo.',
    author: 'Vespera savjetnici',
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    image: 'https://vespera.hr/wp-content/uploads/2026/06/Soho_ambijent.jpg',
    imageAlt: 'Kompaktnija kutna garnitura u suvremenom dnevnom boravku',
    sections: [
      { heading: 'Označite najveći gabarit na podu', paragraphs: ['Ljepljivom trakom ili novinama označite širinu i dubinu željenog modela. Tako ćete odmah vidjeti ostaje li dovoljno prostora za prolaz, otvaranje balkonskih vrata i pristup drugim komadima namještaja.'] },
      { heading: 'Odredite lijevi ili desni kut', paragraphs: ['Strana kuta promatra se prema načinu na koji je proizvođač definira, pa se nemojte oslanjati samo na naziv. Fotografirajte prostor i u salonu zajedno provjerite orijentaciju modela.'] },
      { heading: 'Birajte funkcije koje stvarno koristite', paragraphs: ['Ležaj i spremnik vrlo su korisni, ali trebaju prostor za otvaranje. U malom prostoru prednost može imati model s užim rukonaslonima, podignutim nogicama ili kraćom ležaljkom.'], points: ['Izmjerite zid i prolaz', 'Provjerite stranu kuta', 'Otvorite ležaj i spremnik u salonu', 'Usporedite visinu i dubinu sjedišta'] },
    ],
    questions: [
      { question: 'Koliko prostora treba ostaviti za prolaz?', answer: 'Ovisi o rasporedu i korisnicima, ali prolaz mora omogućiti sigurno i prirodno kretanje bez zaobilaženja oštrih rubova. Označavanje gabarita na podu najbolji je praktični test.' },
      { question: 'Je li kutna garnitura dobra za vrlo mali stan?', answer: 'Može biti, posebno ako zamjenjuje više komada i ima spremnik ili ležaj. Ključno je provjeriti stvarne vanjske dimenzije, a ne samo broj sjedećih mjesta.' },
    ],
    ctaLabel: 'Pogledajte garniture',
    ctaHref: '/garniture',
  },
  {
    slug: 'boxspring-ili-klasicni-krevet',
    category: 'Spavaća soba',
    readTime: '6 min čitanja',
    title: 'Boxspring ili klasični krevet: koja je razlika?',
    seoTitle: 'Boxspring ili klasični krevet: usporedba | Vespera',
    metaDescription: 'Usporedite boxspring i klasični krevet prema visini, madracu, potpori, spremniku, održavanju i prostoru u spavaćoj sobi.',
    intro: 'Najbolji krevet nije isti za svakoga. Boxspring i klasična konstrukcija razlikuju se po visini, osjećaju ležanja, mogućnostima kombiniranja i održavanju.',
    quickAnswer: 'Boxspring je obično viši i čini slojeviti sustav baze i madraca, dok klasični krevet koristi okvir, podnicu i zaseban madrac. Odabir ovisi o željenoj visini, potpori, mogućnosti zamjene dijelova, spremniku i dimenzijama sobe.',
    author: 'Vespera savjetnici',
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    image: 'https://vespera.hr/wp-content/uploads/2026/08/crafterkrevet_4-1140x641.jpg',
    imageAlt: 'Boxspring krevet u uređenoj spavaćoj sobi',
    sections: [
      { heading: 'Razlika je u konstrukciji', paragraphs: ['Klasični krevet najčešće se sastoji od okvira, podnice i madraca. Boxspring koristi tapeciranu bazu s opružnim ili potpornim sustavom, madrac i ponekad nadmadrac. Ta konstrukcija utječe na visinu i osjećaj ležanja.'] },
      { heading: 'Visina može olakšati lijeganje i ustajanje', paragraphs: ['Viši krevet mnogim ljudima olakšava ustajanje, ali previsoka površina može biti nepraktična nižim osobama. U salonu sjednite na rub kreveta: stopala bi trebala stabilno dosezati pod.'] },
      { heading: 'Provjerite što se može mijenjati zasebno', paragraphs: ['Prije kupnje pitajte mogu li se madrac, nadmadrac ili podnica kasnije zasebno zamijeniti. Provjerite postoji li spremnik i koliko prostora treba za njegovo otvaranje.'], points: ['Ukupna visina kreveta', 'Tvrdoća i potpora madraca', 'Mogućnost zamjene dijelova', 'Spremnik i održavanje tkanine'] },
    ],
    questions: [
      { question: 'Je li boxspring uvijek udobniji?', answer: 'Ne. Udobnost ovisi o cijelom sustavu, tjelesnoj građi i navikama spavanja. Oba tipa mogu biti vrlo udobna ako su pravilno odabrani.' },
      { question: 'Koji je krevet lakši za održavanje?', answer: 'Klasični okvir često ima više slobodnog prostora za čišćenje, dok tapecirani boxspring traži redovito usisavanje tkanine. Konstrukcije se razlikuju pa svaki model treba provjeriti zasebno.' },
    ],
    ctaLabel: 'Pogledajte krevete',
    ctaHref: '/namjestaj?prostorija=Spavaća+soba',
  },
  {
    slug: 'odrzavanje-tapeciranog-namjestaja',
    category: 'Održavanje',
    readTime: '5 min čitanja',
    title: 'Kako održavati tapecirani namještaj bez oštećenja?',
    seoTitle: 'Održavanje tapeciranog namještaja | Vespera',
    metaDescription: 'Pravilno usisavanje, brzo uklanjanje mrlja i provjera deklaracije pomažu očuvati tkaninu garniture, fotelje ili kreveta.',
    intro: 'Najviše štete često ne napravi sama mrlja, nego agresivno trljanje ili pogrešno sredstvo. Prvi korak uvijek je provjeriti upute za konkretnu tkaninu.',
    quickAnswer: 'Tapecirani namještaj redovito usisavajte mekanim nastavkom. Tekućinu odmah upijte bez trljanja, a sredstvo prvo testirajte na skrivenom mjestu i koristite samo ako odgovara deklaraciji tkanine.',
    author: 'Vespera savjetnici',
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    image: 'https://vespera.hr/wp-content/uploads/2026/06/Monaco_sastav02_dd822400.jpg',
    imageAlt: 'Tapecirana kutna garnitura u dnevnom boravku',
    sections: [
      { heading: 'Redovito uklonite prašinu i mrvice', paragraphs: ['Koristite mekan nastavak usisavača i nižu snagu. Posebno očistite spojeve između sjedišta i naslona. Ako su jastuci pomični, povremeno ih okrenite prema uputama proizvođača.'] },
      { heading: 'Kod mrlje reagirajte brzo, ali nježno', paragraphs: ['Tekućinu upijte čistom bijelom krpom, bez snažnog pritiskanja i širenja mrlje. Ne nanosite veliku količinu vode i ne koristite univerzalna sredstva prije provjere oznake tkanine.'] },
      { heading: 'Zaštitite tkaninu od sunca i topline', paragraphs: ['Dugotrajno izravno sunce može promijeniti boju, a blizina izvora topline isušiti materijal. Ostavite razmak od radijatora i povremeno provjerite dio tkanine koji je najviše izložen.'], points: ['Sačuvajte deklaraciju tkanine', 'Sredstvo testirajte na skrivenom mjestu', 'Ne trljajte grubo', 'Za zahtjevne mrlje zatražite profesionalni savjet'] },
    ],
    questions: [
      { question: 'Smijem li koristiti sredstvo za čišćenje tepiha?', answer: 'Samo ako proizvođač tkanine to dopušta. Sredstva za tepihe mogu biti prejaka ili ostaviti trag na tapeciranoj tkanini.' },
      { question: 'Što znači vodoodbojna tkanina?', answer: 'Vodoodbojna obrada usporava upijanje tekućine, ali ne znači da je tkanina potpuno nepropusna. Tekućinu i dalje treba brzo ukloniti.' },
    ],
    ctaLabel: 'Pitajte za materijale',
    ctaHref: '/#salon-info',
  },
  {
    slug: 'dostava-i-montaza-namjestaja-karlovac',
    category: 'Dostava i montaža',
    readTime: '5 min čitanja',
    title: 'Što provjeriti prije dostave i montaže namještaja?',
    seoTitle: 'Dostava i montaža namještaja Karlovac | Vespera',
    metaDescription: 'Pripremite prolaz, parking, podove i prostor prije dostave namještaja u Karlovcu i okolici. Saznajte što potvrditi sa salonom.',
    intro: 'Dobra priprema skraćuje dostavu i smanjuje rizik od problema na ulazu, stubištu ili u prostoriji u kojoj se namještaj postavlja.',
    quickAnswer: 'Prije dostave potvrdite adresu, kat, dizalo, mogućnost prilaza i sve uske prolaze. Oslobodite put do prostorije, zaštitite osjetljive podove i sa salonom provjerite uključuje li dogovor unos, montažu i odvoz ambalaže.',
    author: 'Vespera savjetnici',
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    image: 'https://vespera.hr/wp-content/uploads/2026/06/Monaco_sastav02_dd822400.jpg',
    imageAlt: 'Velika kutna garnitura za koju treba pripremiti put dostave',
    sections: [
      { heading: 'Ponovno provjerite sve prolaze', paragraphs: ['Izmjerite ulazna vrata, stubište, hodnik, dizalo i vrata prostorije. Obavijestite salon o uskim zavojima, niskom stropu ili drugim preprekama prije dogovorenog termina.'] },
      { heading: 'Pripremite pristup objektu i prostoriju', paragraphs: ['Osigurajte mjesto za zaustavljanje dostavnog vozila kada je to moguće. Maknite manje komade namještaja, tepihe i lomljive predmete s puta te zaštitite osjetljive podove.'] },
      { heading: 'Jasno potvrdite što usluga uključuje', paragraphs: ['Prije isporuke provjerite datum i vremenski okvir, cijenu dostave, unos na kat, montažu i postupanje s ambalažom. Uvjeti mogu ovisiti o proizvodu i lokaciji.'], points: ['Točna adresa i kontakt', 'Kat i dostupnost dizala', 'Širina prolaza', 'Dostava, unos i montaža', 'Postupanje s ambalažom'] },
    ],
    questions: [
      { question: 'Dostavlja li Vespera samo u Karlovcu?', answer: 'Područje i uvjete dostave treba potvrditi sa salonom. Web može prikazati okvirno područje, ali konačan dogovor ovisi o adresi i narudžbi.' },
      { question: 'Što ako namještaj ne može proći kroz vrata?', answer: 'Zato je važno prolaze izmjeriti prije narudžbe. Ako postoji sumnja, fotografije i mjere treba pokazati savjetniku prije konačne potvrde proizvoda.' },
    ],
    ctaLabel: 'Nazovite salon',
    ctaHref: '/#salon-info',
  },
  {
    slug: 'namjestaj-po-mjeri-proces',
    category: 'Namještaj po mjeri',
    readTime: '7 min čitanja',
    title: 'Namještaj po mjeri: kako izgleda proces od ideje do montaže?',
    seoTitle: 'Namještaj po mjeri: proces od ideje do montaže',
    metaDescription: 'Saznajte kako teku razgovor, mjerenje, 3D prijedlog, ponuda, potvrda materijala, izrada, dostava i montaža namještaja po mjeri.',
    intro: 'Namještaj po mjeri nije samo proizvod drugačijih dimenzija. Dobar proces povezuje navike ukućana, mjere prostora, materijale, budžet i izvedbu.',
    quickAnswer: 'Proces obično počinje razgovorom i osnovnim informacijama, zatim slijede izmjera i prijedlog, usklađivanje materijala i cijene, potvrda narudžbe, izrada te dogovorena dostava i montaža. Svaka ključna odluka treba biti zapisana u ponudi.',
    author: 'Vespera savjetnici',
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    image: 'https://vespera.hr/wp-content/uploads/2026/06/csm_inspiration_stage_laser_412_3bd5d5fd87.jpg',
    imageAlt: 'Kuhinja i namještaj planirani prema prostoru',
    sections: [
      { heading: 'Prvi razgovor definira problem koji rješavamo', paragraphs: ['Donesite fotografije, približne mjere i popis potreba. Važno je objasniti što u postojećem prostoru ne funkcionira, tko ga koristi i koji je okvirni budžet.'] },
      { heading: 'Mjerenje i prijedlog pretvaraju ideju u rješenje', paragraphs: ['Nakon provjere mjera izrađuje se raspored ili 3D prijedlog kada je to dio usluge. Tada se usklađuju materijali, boje, okovi, unutarnja organizacija i svi detalji koji utječu na cijenu.'] },
      { heading: 'Ponuda mora jasno opisati konačnu izvedbu', paragraphs: ['Prije narudžbe provjerite dimenzije, materijale, broj elemenata, uređaje, rok, dostavu i montažu. Promjene nakon potvrde mogu utjecati na cijenu i rok pa je bolje dvojbe riješiti prije početka izrade.'], points: ['Potrebe i budžet', 'Izmjera prostora', 'Raspored ili 3D prijedlog', 'Materijali i okovi', 'Jasna ponuda', 'Dostava i montaža'] },
    ],
    questions: [
      { question: 'Koliko traje izrada namještaja po mjeri?', answer: 'Rok ovisi o vrsti projekta, materijalima i trenutnom opterećenju proizvodnje. Točan okvir treba biti naveden uz konačnu ponudu i potvrđen prije narudžbe.' },
      { question: 'Mogu li mijenjati projekt nakon potvrde?', answer: 'Promjene su ponekad moguće, ali mogu utjecati na cijenu i rok, osobito nakon naručivanja materijala ili početka proizvodnje. Zato sve važne detalje treba potvrditi unaprijed.' },
    ],
    ctaLabel: 'Razgovarajte o svom prostoru',
    ctaHref: '/kuhinje#projekt',
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
