import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BedDouble, Camera, ChefHat, CirclePercent, Clock3, MapPin, MessageCircle, PackageOpen, Phone, Ruler, ShieldCheck, Sofa, Utensils } from 'lucide-react';
import { PageShell, SearchBox } from '@/components/site-chrome';

const currentProducts = [
  { name: 'Manila', type: 'Kutna garnitura', size: '240 × 175 cm', price: '1.152,00 €', image: 'https://vespera.hr/wp-content/uploads/2026/07/1781691780_1781690676836_edit_338493474214675.png', status: 'Akcijska ponuda', promo: '−20%', tone: 'last', href: '/proizvod/manila' },
  { name: 'Castello', type: 'Krevet s madracem', size: 'Ograničena ponuda', price: '988,00 €', image: '/brand/castello-showroom.jpeg', status: 'Akcijska cijena', promo: '−23%', tone: 'last', href: '/garniture' },
  { name: 'Dream', type: 'Krevet', size: 'Više boja i materijala', price: '588,00 €', image: '/brand/dream-beds.jpeg', status: 'Akcijska cijena', promo: '−30%', tone: 'last', href: '/garniture' },
];

const tasks = [
  { label: 'Garnitura za dnevni boravak', note: 'Veličina, ležaj i udobnost', icon: Sofa, href: '/garniture' },
  { label: 'Krevet ili madrac', note: 'Za bolji san i lakše ustajanje', icon: BedDouble, href: '/#aktualno' },
  { label: 'Nova kuhinja', note: 'Planiranje za vaš prostor', icon: ChefHat, href: '/kuhinje' },
  { label: 'Blagovaonica', note: 'Stolovi i stolice za svakodnevicu', icon: Utensils, href: '/#aktualno' },
  { label: 'Više mjesta za odlaganje', note: 'Ormari, komode i predsoblja', icon: PackageOpen, href: '/#aktualno' },
  { label: 'Akcije i posebne ponude', note: 'Izdvojeni proizvodi dok traju zalihe', icon: CirclePercent, href: '/#aktualno' },
];

export default function Home() {
  return (
    <PageShell><main>
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy"><p className="eyebrow">Salon namještaja · Karlovac</p><h1>Dobar namještaj počinje dobrim savjetom.</h1><p>Posjetite salon, isprobajte proizvode i razgovarajte s ljudima koji znaju pomoći.</p>
            <div className="hero-actions"><a className="button button-accent" href="#aktualno">Pogledajte akcije <ArrowRight aria-hidden="true" /></a><Link className="button button-light" href="/kuhinje">Planirajte kuhinju</Link></div>
            <a className="text-link" href="tel:+38547645535"><Phone size={20} aria-hidden="true" /> Radije biste razgovarali? 047 645 535</a>
          </div>
          <div className="hero-image"><Image src="https://vespera.hr/wp-content/uploads/2026/06/ambijent-3-960x540.jpg" alt="Prostrana kutna garnitura u suvremenom dnevnom boravku" width={960} height={540} sizes="(max-width: 920px) 100vw, 50vw" priority /><div className="hero-badge">Više od 20 godina pomažemo uređivati domove u Karlovcu i okolici.</div></div>
        </div>
        <div className="hero-search"><SearchBox /></div>
      </section>

      <section className="trust-strip" aria-label="Prednosti i brze radnje">
        <div><ShieldCheck aria-hidden="true" /><span><strong>Osobno savjetovanje</strong> u salonu</span></div><div><Ruler aria-hidden="true" /><span><strong>3D planiranje</strong> kuhinje</span></div><a className="trust-call" href="tel:+38547645535"><Clock3 aria-hidden="true" /><span><strong>Provjerite dostupnost</strong> Nazovite 047 645 535</span></a>
      </section>

      <section className="section container" id="kategorije"><div className="section-head"><div><p className="eyebrow">Krenite od svoje potrebe</p><h2>Što želite riješiti?</h2></div><p>Ne morate znati naziv kolekcije ili proizvođača. Dovoljno je znati što treba bolje funkcionirati u vašem domu.</p></div>
        <div className="task-grid">{tasks.map(({ label, note, icon: Icon, href }) => <Link href={href} className="task-card" key={label}><Icon className="task-icon" size={29} aria-hidden="true" /><span><strong>{label}</strong><small>{note}</small></span><ArrowRight size={21} aria-hidden="true" /></Link>)}</div>
      </section>

      <section className="section current-section" id="aktualno"><div className="container"><div className="sale-heading"><div><p className="eyebrow">Akcije i posebne ponude</p><h2>Izdvojeno iz aktualne ponude.</h2></div><p>Ograničene količine i ponude koje se mijenjaju. Nazovite salon za potvrdu modela, boje i dostupnosti.</p></div>
        <div className="product-grid">{currentProducts.map((product) => <article className="product-card sale-card" key={product.name}><Link href={product.href}><div className="product-image"><Image src={product.image} alt={`${product.type} ${product.name}`} width={960} height={720} sizes="(max-width: 620px) 100vw, (max-width: 920px) 50vw, 33vw" /><span className="promo-badge">{product.promo}</span></div><div className="product-body"><span className={`status status-${product.tone}`}>{product.status}</span><p className="product-kicker">{product.type} · {product.size}</p><h3>{product.name}</h3><div className="price"><strong>{product.price}</strong></div><span className="text-link">Provjerite ponudu <ArrowRight size={19} aria-hidden="true" /></span></div></Link></article>)}</div>
        <p className="availability-note"><strong>Zašto provjera?</strong> Dio ponude naručuje se u ograničenoj količini i isti se model možda neće ponovno pojaviti.</p>
      </div></section>

      <section className="section container"><div className="help-box"><div><p className="eyebrow">Jednostavniji odabir</p><h2>Recite nam što vam je važno.</h2><p>Prostor, način korištenja i udobnost važniji su od kataloških šifri. Nekoliko kratkih pitanja vodi vas do prikladnijeg izbora.</p><Link className="button button-accent" href="/garniture">Pomozite mi odabrati <ArrowRight aria-hidden="true" /></Link></div>
        <ol className="help-steps"><li><span>01</span><div><strong>Prostor</strong><small>Koliki je zid i kako izgleda prolaz?</small></div></li><li><span>02</span><div><strong>Navike</strong><small>Treba li ležaj, spremnik ili lako održavanje?</small></div></li><li><span>03</span><div><strong>Osjećaj</strong><small>Volite li više, čvršće ili mekše sjedište?</small></div></li></ol>
      </div></section>

      <section className="kitchen-feature" id="kuhinje"><div className="kitchen-photo"><Image src="https://vespera.hr/wp-content/uploads/2022/08/01_stage_moderne_kuechen-960x257.jpg" alt="Moderna kuhinja planirana prema prostoru" width={960} height={540} sizes="(max-width: 920px) 100vw, 55vw" /></div><div className="kitchen-copy"><p className="eyebrow">Kuhinje i namještaj po mjeri</p><h2>Od prve skice do prostora koji radi za vas.</h2><p>Počinjemo razgovorom, mjerama i vašim navikama. Zatim pripremamo 3D prijedlog i jasnu ponudu.</p><div className="process-list"><span>01 Razgovor i potrebe</span><span>02 Mjere i 3D prijedlog</span><span>03 Ponuda, narudžba i montaža</span></div><Link className="button button-accent" href="/kuhinje">Pripremite svoj projekt <ArrowRight aria-hidden="true" /></Link></div></section>

      <section className="section container" id="vodici"><div className="section-head"><div><p className="eyebrow">Savjeti prije kupnje</p><h2>Praktična pomoć za lakšu odluku.</h2></div><p>Jasni vodiči o mjerama, udobnosti i planiranju prostora — bez kompliciranih stručnih izraza.</p></div><div className="guide-grid">
        <article className="guide"><span className="number">MJERENJE · 5 MIN</span><h3>Kako pravilno izmjeriti prostor prije kupnje?</h3><p>Zid je tek početak. Provjerite vrata, hodnik, stubište i prostor za prolaz.</p><Link className="text-link" href="/blog/kako-izmjeriti-prostor">Pročitajte vodič</Link></article>
        <article className="guide"><span className="number">UDOBNOST · 4 MIN</span><h3>Kako odabrati garnituru iz koje se lakše ustaje?</h3><p>Visina sjedišta, dubina i čvrstoća mogu biti važnije od samog izgleda.</p><Link className="text-link" href="/blog/lakse-ustajanje">Pročitajte vodič</Link></article>
        <article className="guide"><span className="number">KUHINJE · 6 MIN</span><h3>Što pripremiti za planiranje kuhinje po mjeri?</h3><p>Nekoliko fotografija i osnovnih mjera dovoljno je za kvalitetniji prvi razgovor.</p><Link className="text-link" href="/blog/priprema-kuhinje-po-mjeri">Pročitajte vodič</Link></article>
      </div><Link className="button advice-button" href="/blog">Pogledajte sve savjete <ArrowRight aria-hidden="true" /></Link></section>

      <section className="social-section" aria-labelledby="social-title"><div className="container social-grid"><div><p className="eyebrow">Vespera na društvenim mrežama</p><h2 id="social-title">Pratite novu ponudu, akcije i realizacije.</h2></div><div className="social-copy"><p>Na Facebooku i Instagramu pogledajte što je upravo stiglo u salon, izdvojene ponude te primjere kuhinja i namještaja po mjeri.</p><div className="social-links"><a href="https://www.facebook.com/vesperanamjestaj/photos/" target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /><span><strong>Facebook</strong><small>Fotografije i aktualna ponuda</small></span><ArrowRight aria-hidden="true" /></a><a href="https://www.instagram.com/vespera_namjestaj/" target="_blank" rel="noreferrer"><Camera aria-hidden="true" /><span><strong>Instagram</strong><small>@vespera_namjestaj</small></span><ArrowRight aria-hidden="true" /></a></div></div></div></section>

      <section className="salon-section" id="salon-info"><div className="container salon-grid"><div><p className="eyebrow">Salon u Karlovcu</p><h2>Dođite, sjednite, otvorite, isprobajte.</h2><p>Namještaj je odluka koju je dobro osjetiti uživo. Naš tim pomoći će vam usporediti modele i potvrditi dostupnost.</p><div className="hero-actions"><a className="button button-accent" href="https://maps.google.com/?q=Matka+Laginje+1+Karlovac"><MapPin aria-hidden="true" /> Kako do salona</a><a className="button button-light" href="tel:+38547645535"><Phone aria-hidden="true" /> Nazovite salon</a></div></div><div className="salon-facts"><p><strong>Adresa</strong><span>Ul. Matka Laginje 1, Karlovac</span></p><p><strong>Telefon</strong><span>047 645 535</span></p><p><strong>Pomoć</strong><span>Od odabira do dostave i montaže</span></p></div></div></section>
    </main></PageShell>
  );
}
