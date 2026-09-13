'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Clipboard,
  ExternalLink,
  FileCheck2,
  Lightbulb,
  LoaderCircle,
  Printer,
  Send,
} from 'lucide-react';
import { ConceptBar } from '@/components/site-chrome';

type Question = {
  id: string;
  label: string;
  help?: string;
  type?: 'short' | 'long' | 'select';
  options?: string[];
  key?: boolean;
};

type Section = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  note?: {
    title: string;
    items: string[];
  };
  questions: Question[];
};

const sections: Section[] = [
  {
    id: 'ciljevi',
    eyebrow: '01 Poslovni smjer',
    title: 'Što novi web treba postići?',
    intro: 'Prvo dogovaramo poslovni rezultat. Tek onda odlučujemo koje stranice i alati imaju smisla.',
    questions: [
      { id: 'respondent_name', label: 'Ime i prezime osobe koja ispunjava upitnik', type: 'short', key: true },
      { id: 'respondent_email', label: 'E-mail za eventualna dodatna pitanja', type: 'short' },
      { id: 'main_goal', label: 'Koji je najvažniji rezultat novog weba u sljedećih 12 mjeseci?', help: 'Više dolazaka u salon, više upita za kuhinje, više prodaje akcijskih proizvoda ili nešto četvrto?', type: 'long', key: true },
      { id: 'priority_categories', label: 'Koje tri kategorije donose najviše prihoda ili imaju najveći potencijal?', type: 'long', key: true },
      { id: 'business_difference', label: 'Zašto kupci odaberu Vesperu umjesto velikog lanca ili online trgovine?', type: 'long', key: true },
      { id: 'success_measure', label: 'Po čemu ćemo nakon šest mjeseci znati da je novi web uspješan?', help: 'Broj poziva, upita, rezerviranih termina, dolazaka u salon ili prodaja.', type: 'long' },
    ],
  },
  {
    id: 'kupci',
    eyebrow: '02 Kupci i odluka',
    title: 'Tko kupuje i kako odlučuje?',
    intro: 'Web treba odgovarati stvarnim pitanjima kupaca, a ne samo pratiti strukturu dobavljačkih kataloga.',
    questions: [
      { id: 'main_customer', label: 'Opišite najčešćeg Vesperina kupca.', help: 'Dob, lokacija, tip doma, okvirni budžet i što mu je najvažnije.', type: 'long', key: true },
      { id: 'secondary_customer', label: 'Koje su druge važne skupine kupaca?', type: 'long' },
      { id: 'top_questions', label: 'Kojih pet pitanja kupci najčešće postavljaju prije kupnje?', type: 'long', key: true },
      { id: 'purchase_fears', label: 'Čega se kupci najviše boje kod kupnje namještaja?', help: 'Pogrešne dimenzije, neudobnost, rok, boja, dostava, cijena ili nejasna kvaliteta.', type: 'long' },
      { id: 'family_decision', label: 'Tko sve sudjeluje u odluci i dijele li kupci proizvode s obitelji prije kupnje?', type: 'long' },
    ],
  },
  {
    id: 'ponuda',
    eyebrow: '03 Ponuda i dostupnost',
    title: 'Kako ponuda stvarno funkcionira?',
    intro: 'Vesperina ponuda nije stalni katalog. Web zato mora jasno razlikovati ono što je u salonu, što se može naručiti i što se možda više neće vratiti.',
    questions: [
      { id: 'stock_types', label: 'Koje vrste dostupnosti postoje u Vesperi?', help: 'Primjer: izloženo u salonu, odmah dostupno, po narudžbi, zadnji komad, rasprodano.', type: 'long', key: true },
      { id: 'repeatability', label: 'Koliko često se isti model može ponovno naručiti nakon prodaje?', type: 'long', key: true },
      { id: 'stock_updates', label: 'Tko zna stvarno stanje ponude i koliko često se ono mijenja?', type: 'long', key: true },
      { id: 'product_source', label: 'Odakle dolaze podaci o proizvodima?', help: 'Dobavljački katalozi, cjenici, fotografije, interne tablice ili objave na društvenim mrežama.', type: 'long' },
      { id: 'product_fields', label: 'Koje podatke Vespera može pouzdano dati za svaki proizvod?', help: 'Naziv, cijena, dimenzije, boje, materijali, visina sjedišta, ležaj, spremnik, rok i održavanje.', type: 'long', key: true },
      { id: 'delivery_rules', label: 'Kako funkcioniraju dostava, unos, montaža i odvoz starog namještaja?', type: 'long' },
    ],
  },
  {
    id: 'kuhinje',
    eyebrow: '04 Kuhinje i namještaj po mjeri',
    title: 'Kako izgleda put od upita do montaže?',
    intro: 'Kuhinje po mjeri trebaju postati jedan od glavnih prodajnih putova, s jasnim očekivanjima prije prvog razgovora.',
    questions: [
      { id: 'custom_scope', label: 'Što točno Vespera nudi po mjeri?', help: 'Kuhinje, ormari, predsoblja, komode, radne ploče ili drugo.', type: 'long', key: true },
      { id: 'kitchen_process', label: 'Opišite svaki korak od prvog upita do završene montaže.', type: 'long', key: true },
      { id: 'measure_service', label: 'Tko mjeri prostor, kada i naplaćuje li se mjerenje ili 3D planiranje?', type: 'long', key: true },
      { id: 'kitchen_inputs', label: 'Što kupac treba pripremiti prije prvog termina?', type: 'long' },
      { id: 'kitchen_budget', label: 'Možemo li na webu komunicirati okvirne budžete ili cijenu od?', help: 'Ako da, što cijena uključuje, a što se računa posebno?', type: 'long' },
      { id: 'kitchen_timeline', label: 'Koji su realni rokovi za projektiranje, proizvodnju, dostavu i montažu?', type: 'long' },
      { id: 'kitchen_examples', label: 'Imamo li završene projekte koje smijemo fotografirati i objaviti kao studije slučaja?', type: 'select', options: ['Da, imamo dovoljno primjera', 'Imamo nekoliko primjera', 'Treba prikupiti dopuštenja', 'Trenutačno nemamo materijale'] },
    ],
  },
  {
    id: 'cijene',
    eyebrow: '05 Cijene i akcije',
    title: 'Kako ćemo koristiti sidrene cijene?',
    intro: 'Sidrena cijena daje kupcu kontekst za procjenu vrijednosti. Koristit ćemo samo stvarne i provjerljive usporedbe, bez umjetno napuhanih redovnih cijena.',
    questions: [
      { id: 'price_records', label: 'Postoji li pouzdana evidencija redovne, prethodne i akcijske cijene za svaki proizvod?', type: 'select', options: ['Da, za sve proizvode', 'Da, ali nije na jednom mjestu', 'Samo za dio proizvoda', 'Ne, treba uspostaviti evidenciju'], key: true },
      { id: 'anchor_type', label: 'Koji cjenovni kontekst ima najviše smisla za Vesperu?', help: 'Redovna i akcijska cijena, iznos uštede, postotak popusta, cijena od, raspon cijene ili usporedba varijanti.', type: 'long', key: true },
      { id: 'promotion_validity', label: 'Možemo li za svaku akciju navesti rok trajanja i vrijedi li ponuda samo dok traju zalihe?', type: 'long', key: true },
      { id: 'price_approval', label: 'Tko provjerava i odobrava cijene prije objave?', type: 'short', key: true },
      { id: 'kitchen_anchor', label: 'Koju početnu cijenu ili raspon možemo pošteno koristiti za kuhinje po mjeri?', help: 'Treba jasno definirati što je uključeno u prikazanu cijenu.', type: 'long' },
      { id: 'payment_options', label: 'Koje načine plaćanja, rate ili pogodnosti možemo komunicirati?', type: 'long' },
      { id: 'price_compliance', label: 'Tko potvrđuje da je prikaz sniženja usklađen s aktualnim pravilima zaštite potrošača?', help: 'Za finalni web trebamo pouzdan poslovni ili pravni izvor, ne pretpostavku.', type: 'short' },
    ],
  },
  {
    id: 'identitet',
    eyebrow: '06 Brand i logotip',
    title: 'Što zadržavamo, a što profesionaliziramo?',
    intro: 'Žuto-crna kombinacija je prepoznatljiva i može ostati temelj. Postojeći logotip ima ograničenja u digitalnoj primjeni pa trebamo dogovoriti razinu promjene.',
    questions: [
      { id: 'logo_direction', label: 'Jeste li otvoreni za novu ili dorađenu verziju logotipa?', type: 'select', options: ['Da, želim vidjeti potpuno novi smjer', 'Da, ali želim zadržati prepoznatljivost postojećeg logotipa', 'Želim samo tehnički uredniju verziju postojećeg logotipa', 'Ne, postojeći logotip mora ostati nepromijenjen'], key: true },
      { id: 'logo_keep', label: 'Koji elementi postojećeg logotipa moraju ostati prepoznatljivi?', help: 'Naziv Vespera, žuta boja, crna ploha, serifna slova ili nešto drugo.', type: 'long' },
      { id: 'brand_feeling', label: 'Kako Vespera treba izgledati i zvučati u tri do pet riječi?', type: 'short', key: true },
      { id: 'brand_avoid', label: 'Što nikako ne želite da novi identitet djeluje?', type: 'long' },
      { id: 'logo_files', label: 'Postoje li izvorne datoteke logotipa?', help: 'SVG, EPS, AI ili kvalitetan PDF. Mala PNG ili JPG slika nije dovoljna za profesionalni sustav.', type: 'select', options: ['Da, imamo vektorske datoteke', 'Imamo samo PNG ili JPG', 'Nisam sigurna', 'Nemamo izvorne datoteke'] },
      { id: 'brand_examples', label: 'Koja tri branda ili trgovine vam izgledaju kvalitetno i zašto?', type: 'long' },
    ],
  },
  {
    id: 'sadrzaj',
    eyebrow: '07 Fotografije, sadržaj i povjerenje',
    title: 'Što možemo pokazati stvarnim dokazima?',
    intro: 'Vespera treba stvarne, kvalitetne fotografije proizvoda, salona, ljudi i realizacija. Vizual ne smije ovisiti o pikseliziranim objavama s tekstom preko fotografije.',
    questions: [
      { id: 'photo_access', label: 'Možemo li dobiti originalne fotografije proizvoda bez cijena, logotipa i teksta preko slike?', type: 'select', options: ['Da, od dobavljača', 'Da, ali samo za dio ponude', 'Treba tražiti dopuštenje', 'Ne, trebamo novo fotografiranje'], key: true },
      { id: 'photo_session', label: 'Jeste li otvoreni za profesionalno fotografiranje salona, tima, proizvoda i realiziranih kuhinja?', type: 'select', options: ['Da', 'Možda, ovisno o budžetu', 'Ne sada'] },
      { id: 'owner_story', label: 'Koja je priča Vespere, kada je osnovana i što se promijenilo kroz godine?', type: 'long' },
      { id: 'team_story', label: 'Tko savjetuje kupce i smijemo li predstaviti ljude iza Vespere?', type: 'long' },
      { id: 'reviews', label: 'Koje recenzije i izjave kupaca smijemo objaviti te gdje im je izvor?', type: 'long' },
      { id: 'blog_owner', label: 'Tko može davati stručne informacije za savjete i blog?', help: 'Željka može urediti i napisati tekst, ali Vespera treba potvrditi stručne činjenice.', type: 'short' },
    ],
  },
  {
    id: 'funkcije',
    eyebrow: '08 Digitalni alati',
    title: 'Što kupcu stvarno pomaže?',
    intro: 'Ne trebamo kopirati veliki webshop. Biramo alate koji vode prema razgovoru, salonu i sigurnijoj odluci.',
    questions: [
      { id: 'sales_model', label: 'Što kupac treba moći napraviti online?', type: 'select', options: ['Pregledati ponudu i nazvati', 'Poslati upit ili rezervirati proizvod', 'Rezervirati termin', 'Kupiti i platiti online', 'Kombinacija navedenog'], key: true },
      { id: 'saved_compare', label: 'Želite li spremanje i usporedbu proizvoda bez korisničkog računa?', type: 'select', options: ['Da', 'Možda kasnije', 'Ne'] },
      { id: 'kitchen_booking', label: 'Želite li stvarno online rezerviranje termina za kuhinje?', type: 'select', options: ['Da, s kalendarom slobodnih termina', 'Da, kao zahtjev koji Vespera naknadno potvrđuje', 'Ne, dovoljan je poziv ili običan obrazac'], key: true },
      { id: 'channels', label: 'Koji kontaktni kanali trebaju biti vidljivi?', help: 'Telefon, e-mail, WhatsApp, Facebook Messenger, Instagram ili obrazac.', type: 'long' },
      { id: 'catalog', label: 'Želite li digitalni katalog ili stranicu aktualne ponude koja se redovito mijenja?', type: 'long' },
      { id: 'notifications', label: 'Ima li smisla ponuditi obavijest kada stigne novi proizvod ili nova akcija?', type: 'select', options: ['Da, e-mailom', 'Da, WhatsAppom uz privolu', 'Možda kasnije', 'Ne'] },
    ],
  },
  {
    id: 'dodatna-podrska',
    eyebrow: '09 Dodatna podrška',
    title: 'Što bi Vesperi još olakšalo posao?',
    intro: 'Ova pitanja nisu obveza niti automatska ponuda. Pomažu nam razumjeti što bi vam moglo biti korisno sada, kasnije ili uopće nije prioritet. Odgovor „ne sada” potpuno je u redu.',
    questions: [
      { id: 'additional_interest', label: 'Osim novog weba, postoji li područje za koje biste voljeli barem čuti prijedlog?', type: 'select', options: ['Da, voljela bih vidjeti mogućnosti', 'Možda kasnije', 'Trenutačno mi je dovoljan web', 'Nisam sigurna, trebam preporuku'], key: true },
      { id: 'photo_support', label: 'Bi li Vesperi koristilo profesionalno fotografiranje salona, tima, proizvoda ili realiziranih kuhinja?', type: 'select', options: ['Da, zanima me', 'Možda u kasnijoj fazi', 'Imamo dovoljno kvalitetnih fotografija', 'Ne sada'] },
      { id: 'social_support', label: 'Želite li pomoć s planom i sadržajem za Instagram i Facebook?', help: 'To može biti samo početni plan i predlošci, povremena pomoć ili redovito vođenje.', type: 'select', options: ['Da, želim redovitu podršku', 'Da, želim početni plan i predloške', 'Možda povremeno', 'Ne, vodimo samostalno'] },
      { id: 'google_support', label: 'Bi li vam koristilo urediti Google Business profil i jednostavnije prikupljati vjerodostojne recenzije kupaca?', type: 'select', options: ['Da, zanima me', 'Možda kasnije', 'To već dobro funkcionira', 'Ne sada'] },
      { id: 'content_support', label: 'Razmišljate li o redovitom blogu ili kratkim savjetima koji kupcima olakšavaju izbor?', type: 'select', options: ['Da, želim redoviti sadržaj', 'Da, ali samo povremeno', 'Želim prvo nekoliko osnovnih vodiča', 'Ne sada'] },
      { id: 'sales_materials_support', label: 'Trebaju li Vesperi i usklađeni materijali za salon i prodaju?', help: 'Na primjer cjenici, kartice proizvoda, katalog, oznake za akcije ili predlošci za društvene mreže.', type: 'select', options: ['Da, to bi nam koristilo', 'Možda samo neki materijali', 'Možda kasnije', 'Ne sada'] },
      { id: 'advertising_support', label: 'Biste li nakon dovršetka weba željeli razgovarati o Google ili Meta oglašavanju?', type: 'select', options: ['Da, nakon što web bude spreman', 'Možda kasnije', 'Već imamo podršku za oglašavanje', 'Ne sada'] },
      { id: 'ongoing_support', label: 'Nakon objave weba, biste li radije sami unosili promjene ili imali podršku Salty Brand Studija?', type: 'select', options: ['Želim redovitu mjesečnu podršku', 'Želim povremenu podršku po potrebi', 'Želim naučiti uređivati samostalno', 'Još ne znam'], key: true },
      { id: 'other_support', label: 'Postoji li još nešto što bi vam olakšalo prodaju ili komunikaciju s kupcima?', type: 'long' },
    ],
  },
  {
    id: 'operativa',
    eyebrow: '10 Održavanje i završetak projekta',
    title: 'Tko će web održavati živim?',
    intro: 'Najbolji dizajn neće pomoći ako cijene, fotografije i dostupnost ostanu zastarjeli. Završavamo jasnim vlasništvom nad svakim zadatkom.',
    note: {
      title: 'Kako će vlasništvo nad webom funkcionirati?',
      items: [
        'Postojeća domena vespera.hr ostaje u vlasništvu Vespere. Za novi web obično ne selimo domenu, nego mijenjamo samo zapise koji web povezuju s novom platformom.',
        'Kod weba čuva se u privatnom GitHub projektu, a Vercel ga objavljuje. Računi trebaju biti pod kontrolom Vespere, dok Salty Brand Studio dobiva samo suradnički pristup potreban za rad.',
        'Natalija ne treba nikome slati lozinke. Ona ili druga ovlaštena osoba zadržava pristup e-mailu za oporavak, broj mobitela, dvostruku zaštitu računa i pričuvne kodove.',
        'Prije promjene postavki domene spremamo postojeće zapise kako bismo zaštitili poslovni e-mail i druge povezane usluge.',
        'GitHub račun može biti bez naknade. Vercelova besplatna opcija namijenjena je osobnoj i nekomercijalnoj uporabi, pa za konačni poslovni web prije objave biramo odgovarajući komercijalni plan ili drugi hosting.',
        'Nova domena kupuje se samo ako Vespera želi novu adresu. Za .hr domenu usporedit ćemo ovlaštene hrvatske registrare i trošak obnove. GoDaddy je moguća opcija za neke nastavke, ali nije nužan.',
      ],
    },
    questions: [
      { id: 'content_owner', label: 'Tko će u Vesperi javljati nove proizvode, cijene i promjene dostupnosti?', type: 'short', key: true },
      { id: 'update_frequency', label: 'Koliko često realno možemo ažurirati aktualnu ponudu?', type: 'select', options: ['Svaki dan', 'Jednom tjedno', 'Dva puta mjesečno', 'Jednom mjesečno', 'Samo kada netko pošalje promjenu'], key: true },
      { id: 'cms_choice', label: 'Želi li Natalija sama uređivati sadržaj ili da ažuriranja vodi Salty Brand Studio?', type: 'select', options: ['Želim sama uređivati', 'Želim jednostavan obrazac ili tablicu za unos', 'Želim da Salty vodi ažuriranja', 'Trebam preporuku'], key: true },
      { id: 'production_domain', label: 'Želite li da konačni novi web koristi postojeću domenu vespera.hr?', help: 'Domena već postoji. Trebamo potvrditi da je to adresa koju želite zadržati za novi web.', type: 'select', options: ['Da, želimo zadržati vespera.hr', 'Želimo i dodatnu domenu', 'Razmišljamo o novoj domeni', 'Trebamo preporuku'], key: true },
      { id: 'domain_management', label: 'Znate li gdje se upravlja domenom vespera.hr i tko ima pristup tom računu?', help: 'Dovoljni su naziv registrara ili pružatelja usluge i ime kontaktne osobe. Nemojte ovdje upisivati lozinku.', type: 'long', key: true },
      { id: 'domain_connection', label: 'Može li osoba koja upravlja domenom dodati potrebne zapise ili Saltyju dati siguran, ograničen pristup?', help: 'Najsigurnije je da vlasnik računa sam potvrdi promjenu ili pošalje poziv za suradnju. Lozinka se ne šalje e-mailom ni kroz ovaj upitnik.', type: 'select', options: ['Da, možemo dodati zapise prema uputama', 'Da, možemo dati ograničen pristup', 'Moramo kontaktirati sadašnjeg pružatelja usluge', 'Ne znamo tko ima pristup'], key: true },
      { id: 'domain_renewal', label: 'Tko je odgovoran za obnovu domene i je li uključena automatska obnova?', help: 'Trebamo potvrditi kontakt, datum isteka i način plaćanja kako domena ne bi slučajno istekla.', type: 'long' },
      { id: 'project_account_email', label: 'Koja Vesperina e-mail adresa treba biti vlasnik novih GitHub i Vercel računa?', help: 'Najbolja je posebna adresa pod kontrolom Vespere, primjerice web@vespera.hr. Ako to nije moguće, Natalija može otvoriti poseban Gmail samo za digitalnu imovinu Vespere.', type: 'short', key: true },
      { id: 'account_security_owner', label: 'Tko će u Vesperi čuvati pristup tom e-mailu, dvostruku zaštitu i pričuvne kodove?', help: 'Ta osoba ostaje stvarni vlasnik računa. Salty Brand Studio dobiva vlastiti poziv za suradnju i ne treba Vesperinu lozinku.', type: 'short', key: true },
      { id: 'hosting_choice', label: 'Želite li prije konačne objave usporediti cijenu Vercelova poslovnog plana s drugim sigurnim hosting opcijama?', help: 'Prototip može ostati na testnoj adresi bez dodatnog troška, ali produkcijski poslovni web treba koristiti plan koji dopušta komercijalnu uporabu.', type: 'select', options: ['Da, želim jasnu usporedbu', 'Želim ostati na Vercelu', 'Želim najpovoljniju prikladnu opciju', 'Trebam preporuku'], key: true },
      { id: 'integrations', label: 'Koje postojeće alate i račune Vespera već koristi?', help: 'Domena, hosting, poslovni e-mail, Google profil, Analytics, kalendar, skladišna evidencija ili računovodstveni program.', type: 'long' },
      { id: 'legal_materials', label: 'Postoje li aktualni uvjeti kupnje, privatnost, kolačići, reklamacije, jamstva i informacije o dostavi?', type: 'long' },
      { id: 'approvals', label: 'Tko konačno odobrava logotip, tekstove, cijene, fotografije i objavu weba?', type: 'short', key: true },
      { id: 'timeline_budget', label: 'Koji su željeni rok i raspoloživi budžet za finalnu produkcijsku verziju?', type: 'long', key: true },
    ],
  },
];

const preparationItems = [
  'Izvorne datoteke logotipa i eventualne stare brand smjernice',
  'Popis aktivnih dobavljača i dopuštenja za korištenje sadržaja',
  'Tablica aktualnih proizvoda, cijena, dimenzija i dostupnosti',
  'Originalne fotografije bez grafika, cijena i teksta preko slike',
  'Opis procesa naručivanja, dostave, montaže i reklamacija',
  'Podaci o kuhinjama po mjeri, rokovima, mjerenju i 3D planiranju',
  'Primjeri završenih kuhinja i dopuštenja kupaca za objavu',
  'Provjerljive recenzije i njihove poveznice ili dopuštenja',
  'Podaci o vlasniku domene, registraru, obnovi i osobi koja sigurno upravlja pristupima',
  'Vesperina e-mail adresa za vlasništvo nad GitHubom, hostingom, Google Business profilom i analitikom',
  'Aktualni pravni tekstovi i osoba koja potvrđuje prikaz cijena',
];

const allQuestions = sections.flatMap((section) => section.questions);
const storageKey = 'vespera-natalija-questionnaire';

export default function NatalijaQuestionnairePage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [copyStatus, setCopyStatus] = useState('');
  const [sendStatus, setSendStatus] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');

  useEffect(() => {
    const restore = () => {
      try {
        const stored = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
        if (stored && typeof stored === 'object') setAnswers(stored);
      } catch {
        setAnswers({});
      }
    };
    queueMicrotask(restore);
  }, []);

  const answeredCount = useMemo(
    () => allQuestions.filter((question) => answers[question.id]?.trim()).length,
    [answers],
  );

  const progress = Math.round((answeredCount / allQuestions.length) * 100);

  function updateAnswer(id: string, value: string) {
    setAnswers((current) => {
      const next = { ...current, [id]: value };
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
    setCopyStatus('');
    setSendStatus('');
  }

  function buildSummary() {
    const lines = [
      'VESPERA, SAŽETAK RAZGOVORA S NATALIJOM',
      `Datum: ${new Intl.DateTimeFormat('hr-HR').format(new Date())}`,
      '',
    ];
    sections.forEach((section) => {
      lines.push(section.title.toUpperCase());
      section.questions.forEach((question) => {
        const answer = answers[question.id]?.trim();
        lines.push(`${question.label}\n${answer || '[Nije odgovoreno]'}`, '');
      });
    });
    return lines.join('\n');
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(buildSummary());
      setCopyStatus('Odgovori su kopirani. Možete ih zalijepiti u dokument ili poruku.');
    } catch {
      setCopyStatus('Kopiranje nije uspjelo. Upotrijebite ispis i spremite stranicu kao PDF.');
    }
  }

  async function sendSummary() {
    if (website) return;
    if (!consent) {
      setSendStatus('Prije slanja potvrdite da pristajete poslati odgovore Salty Brand Studiju.');
      return;
    }
    if (!answers.respondent_name?.trim()) {
      setSendStatus('Upišite ime i prezime osobe koja šalje odgovore.');
      document.getElementById('ciljevi')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsSending(true);
    setSendStatus('Šaljem odgovore...');
    try {
      const response = await fetch('https://formsubmit.co/ajax/hello@saltybrandstudio.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Vespera upitnik, ${answers.respondent_name}`,
          _cc: 'zeljka.mikulcic.samobor@gmail.com',
          _template: 'table',
          _honey: website,
          'Ispunila osoba': answers.respondent_name,
          'Kontakt e-mail': answers.respondent_email || 'Nije naveden',
          'Datum slanja': new Intl.DateTimeFormat('hr-HR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date()),
          'Odgovori na upitnik': buildSummary(),
          'Izvor': 'Vespera konceptualni redizajn, Salty Brand Studio',
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || data?.success === false || data?.success === 'false') throw new Error('Slanje nije potvrđeno.');
      setSendStatus('Odgovori su poslani na obje Salty Brand Studio adrese. Lokalna kopija ostaje spremljena u ovom pregledniku.');
    } catch {
      setSendStatus('Slanje trenutačno nije uspjelo. Odgovori nisu izgubljeni. Kopirajte ih ili pokušajte ponovno.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <ConceptBar />
      <header className="questionnaire-header">
        <Link href="/" className="questionnaire-back"><ArrowLeft aria-hidden="true" /> Natrag na Vespera koncept</Link>
        <span>Salty Brand Studio, radni upitnik</span>
      </header>
      <main className="questionnaire-page">
        <section className="questionnaire-hero">
          <div className="questionnaire-hero-copy">
            <p className="eyebrow">Razgovor s vlasnicom Vespere</p>
            <h1>Upitnik za dovršetak projekta.</h1>
            <p>Ovaj razgovor pretvara koncept u web koji odgovara stvarnom načinu prodaje, naručivanja i rada Vespere.</p>
            <div className="questionnaire-meta"><span>{sections.length} tema</span><span>{allQuestions.length} pitanja</span><span>60 do 90 minuta</span></div>
          </div>
          <aside className="questionnaire-intro-note">
            <Lightbulb aria-hidden="true" />
            <div><strong>Kako koristiti upitnik</strong><p>Željka vodi razgovor, a odgovore upisuje ovdje. Nacrt se automatski čuva samo u ovom pregledniku. Odgovori se šalju tek kada na kraju pritisnete gumb za slanje.</p></div>
          </aside>
        </section>

        <div className="questionnaire-layout">
          <aside className="questionnaire-progress" aria-label="Napredak upitnika">
            <div className="progress-card">
              <span>Odgovoreno</span>
              <strong>{answeredCount} od {allQuestions.length}</strong>
              <div className="progress-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
              <small>{progress}% upitnika</small>
            </div>
            <nav aria-label="Teme razgovora">
              {sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.eyebrow}<span>{section.title}</span></a>)}
            </nav>
          </aside>

          <form className="questionnaire-form" onSubmit={(event) => event.preventDefault()}>
            {sections.map((section) => (
              <section className="question-section" id={section.id} key={section.id}>
                <div className="question-section-head">
                  <p className="eyebrow">{section.eyebrow}</p>
                  <h2>{section.title}</h2>
                  <p>{section.intro}</p>
                </div>
                {section.note && (
                  <aside className="question-section-note">
                    <Lightbulb aria-hidden="true" />
                    <div>
                      <h3>{section.note.title}</h3>
                      <ul>{section.note.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                  </aside>
                )}
                <div className="question-list">
                  {section.questions.map((question, index) => (
                    <label className="question-field" key={question.id}>
                      <span className="question-label"><b>{String(index + 1).padStart(2, '0')}</b><strong>{question.label}</strong>{question.key && <em>Ključno</em>}</span>
                      {question.help && <small>{question.help}</small>}
                      {question.type === 'select' ? (
                        <select value={answers[question.id] ?? ''} onChange={(event) => updateAnswer(question.id, event.target.value)}>
                          <option value="">Odaberite odgovor</option>
                          {question.options?.map((option) => <option key={option}>{option}</option>)}
                        </select>
                      ) : question.type === 'short' ? (
                        <input type={question.id === 'respondent_email' ? 'email' : 'text'} autoComplete={question.id === 'respondent_name' ? 'name' : question.id === 'respondent_email' ? 'email' : undefined} value={answers[question.id] ?? ''} onChange={(event) => updateAnswer(question.id, event.target.value)} />
                      ) : (
                        <textarea rows={4} value={answers[question.id] ?? ''} onChange={(event) => updateAnswer(question.id, event.target.value)} />
                      )}
                    </label>
                  ))}
                </div>
              </section>
            ))}

            <section className="preparation-section" id="materijali">
              <div><p className="eyebrow">Materijali za predaju</p><h2>Što trebamo od Natalije?</h2><p>Ne treba sve prikupiti prije razgovora. Na kraju samo dogovorite tko dostavlja svaku stavku i do kojeg datuma.</p></div>
              <ul>{preparationItems.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
            </section>

            <section className="questionnaire-finish">
              <FileCheck2 aria-hidden="true" />
              <div><p className="eyebrow">Nakon razgovora</p><h2>Pretvorite odgovore u radni brief.</h2><p>Kopirajte sažetak u svoj projektni dokument. Neodgovorena pitanja ostat će jasno označena kako ništa važno ne bi nestalo.</p></div>
              <div className="questionnaire-consent">
                <label><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>Potvrđujem da želim poslati unesene odgovore na <strong>hello@saltybrandstudio.com</strong> i <strong>zeljka.mikulcic.samobor@gmail.com</strong>.</span></label>
                <p>Odgovore za dostavu obrađuje FormSubmit. Servis navodi da zadržava prijave do 30 dana. Nemojte upisivati lozinke, brojeve kartica ni druge osjetljive podatke.</p>
                <label className="questionnaire-honey" aria-hidden="true">Ostavite prazno<input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
              </div>
              <div className="questionnaire-actions">
                <button className="button button-accent" type="button" onClick={sendSummary} disabled={isSending}>{isSending ? <LoaderCircle className="sending-icon" aria-hidden="true" /> : <Send aria-hidden="true" />}{isSending ? 'Šaljem odgovore' : 'Pošaljite odgovore Željki'}</button>
                <button className="button button-light" type="button" onClick={copySummary}><Clipboard aria-hidden="true" /> Kopirajte odgovore</button>
                <button className="button button-light" type="button" onClick={() => window.print()}><Printer aria-hidden="true" /> Ispišite ili spremite PDF</button>
                <Link className="button button-ghost" href="/"><ExternalLink aria-hidden="true" /> Otvorite Vespera koncept</Link>
              </div>
              {(sendStatus || copyStatus) && <output className="copy-status" aria-live="polite">{sendStatus || copyStatus}</output>}
            </section>
          </form>
        </div>
      </main>
    </>
  );
}
