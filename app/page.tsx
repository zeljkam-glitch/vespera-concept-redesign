import Link from 'next/link';
import { ArrowRight, BedDouble, ChefHat, CirclePercent, Grid2X2, House, PackageOpen, Ruler, SearchCheck, ShieldCheck, Sofa, Utensils } from 'lucide-react';
import { PageShell, SearchBox } from '@/components/site-chrome';

const products = [
  { name:'Manila', size:'240 × 175 cm', features:'Ležaj · spremnik · za manje prostore', old:'1.440,00 €', price:'1.152,00 €', sale:'−20%', image:'https://vespera.hr/wp-content/uploads/2026/07/1781691780_1781690676836_edit_338493474214675.png', href:'/proizvod/manila' },
  { name:'Asti', size:'270 × 176 cm', features:'Ležaj · spremnik · više boja', old:'1.730,00 €', price:'1.384,00 €', sale:'−20%', image:'https://vespera.hr/wp-content/uploads/2025/09/ASTI-300x300.jpg', href:'/garniture' },
  { name:'Yoka', size:'310 × 250 cm', features:'Ležaj · spremnik · prostrana', old:'1.372,35 €', price:'960,65 €', sale:'−30%', image:'https://vespera.hr/wp-content/uploads/2021/11/YOKA.jpg', href:'/garniture' },
];

const tasks = [
  { label:'Garnitura za dnevni boravak', icon:Sofa, href:'/garniture' },
  { label:'Krevet ili madrac', icon:BedDouble, href:'#' },
  { label:'Blagovaonica', icon:Utensils, href:'#' },
  { label:'Više mjesta za odlaganje', icon:PackageOpen, href:'#' },
  { label:'Nova kuhinja', icon:ChefHat, href:'#kuhinje' },
  { label:'Proizvodi na akciji', icon:CirclePercent, href:'#aktualno' },
];

export default function Home() {
  return <PageShell><main>
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-copy"><p className="eyebrow">Dom koji dobro funkcionira</p><h1>Namještaj koji vam olakšava život.</h1><p>Jasne informacije, stručna pomoć i proizvodi koje možete isprobati u našem salonu u Karlovcu.</p>
          <div className="hero-actions"><Link className="button button-accent" href="/garniture">Trebam novu garnituru <ArrowRight aria-hidden="true" /></Link><a className="button button-light" href="#kategorije">Pregledaj sav namještaj</a></div>
          <a className="text-link" href="tel:+38547645535">Radije biste razgovarali? Nazovite 047 645 535</a>
        </div>
        <div className="hero-image"><img src="https://vespera.hr/wp-content/uploads/2026/06/ambijent-3-960x540.jpg" alt="Kutna garnitura u suvremenom dnevnom boravku" /><div className="hero-badge">Više od 20 godina pomažemo domovima u Karlovcu i okolici.</div></div>
      </div>
      <div className="hero-search"><SearchBox /></div>
    </section>

    <section className="section container" id="kategorije"><div className="section-head"><div><p className="eyebrow">Krenite od potrebe</p><h2>Što tražite?</h2></div><p>Ne morate poznavati nazive kolekcija. Odaberite što želite riješiti u svom domu.</p></div>
      <div className="task-grid">{tasks.map(({label,icon:Icon,href})=><Link href={href} className="task-card" key={label}><Icon className="task-icon" size={30} aria-hidden="true"/><strong>{label}<ArrowRight size={21} aria-hidden="true"/></strong></Link>)}</div>
    </section>

    <section className="section editorial" id="aktualno"><div className="container"><div className="section-head"><div><p className="eyebrow">Bez rotirajućih bannera</p><h2>Aktualno u Vesperi</h2></div><p>Tri važne priče, vidljive odmah i čitljive vlastitim tempom.</p></div>
      <div className="editorial-grid"><Link href="/garniture" className="story"><img src="https://vespera.hr/wp-content/uploads/2021/11/YOKA.jpg" alt="Kutna garnitura Yoka"/><span className="story-tag">Izdvajamo</span><h3>Udobne garniture sa spremnikom i ležajem</h3></Link>
        <div className="story-stack"><a href="#kuhinje" className="story story-small"><span className="story-tag">Besplatno</span><h3>3D planiranje vaše nove kuhinje</h3></a><Link href="/garniture" className="story story-small"><span className="story-tag">Rasprodaja</span><h3>Izložbeni modeli po nižim cijenama</h3></Link></div></div>
    </div></section>

    <section className="section container"><div className="help-box"><div><p className="eyebrow">Jednostavan odabir</p><h2>Pomozite mi odabrati</h2><p>Odgovorite na tri kratka pitanja. Pokazat ćemo samo garniture koje odgovaraju vašem prostoru i navikama.</p><Link className="button" href="/garniture">Započni odabir <ArrowRight aria-hidden="true"/></Link></div>
      <div className="help-steps"><div className="help-step"><span>1</span> Koliko je velik vaš prostor?</div><div className="help-step"><span>2</span> Trebate li ležaj ili spremnik?</div><div className="help-step"><span>3</span> Što vam je najvažnije?</div></div></div>
    </section>

    <section className="section container"><div className="section-head"><div><p className="eyebrow">Provjereni izbori</p><h2>Preporučene garniture</h2></div><Link className="text-link" href="/garniture">Pogledajte sve <ArrowRight aria-hidden="true"/></Link></div>
      <div className="product-grid">{products.map(product=><article className="product-card" key={product.name}><Link href={product.href}><div className="product-image"><img src={product.image} alt={`Kutna garnitura ${product.name}`} /></div><div className="product-body"><span className="product-kicker">Kutna garnitura · {product.size}</span><h3>{product.name}</h3><p className="product-features">{product.features}</p><div className="price"><strong>{product.price}</strong><span className="old-price">{product.old}</span><span className="sale">{product.sale}</span></div><span className="text-link">Pogledajte detalje <ArrowRight size={19}/></span></div></Link></article>)}</div>
    </section>

    <section className="section" id="vodici"><div className="container"><div className="section-head"><div><p className="eyebrow">Prije nego odlučite</p><h2>Vodiči za sigurniju kupnju</h2></div></div><div className="guide-grid"><article className="guide"><span className="number">01</span><h3>Kako pravilno izmjeriti prostor?</h3><p>Što mjeriti i koliko prolaza ostaviti oko namještaja.</p><a className="text-link" href="#">Pročitajte vodič</a></article><article className="guide"><span className="number">02</span><h3>Koja visina sjedišta odgovara vama?</h3><p>Više sjedište može olakšati ustajanje i svakodnevnu uporabu.</p><a className="text-link" href="#">Pročitajte vodič</a></article><article className="guide"><span className="number">03</span><h3>Materijali koji se lakše održavaju</h3><p>Praktičan odabir tkanine za djecu, ljubimce i svakodnevni život.</p><a className="text-link" href="#">Pročitajte vodič</a></article></div></div></section>

    <section className="split-promo" id="kuhinje"><div className="promo-copy"><p className="eyebrow">Besplatna stručna usluga</p><h2>Vidite svoju kuhinju prije nego je naručite.</h2><p>Naš tim izrađuje detaljan 3D prikaz prilagođen prostoru, stilu i potrebama vašeg doma.</p><a className="button button-light" href="tel:+38547645535">Dogovorite planiranje</a></div><div className="promo-visual"><img src="https://vespera.hr/wp-content/uploads/2022/08/01_stage_moderne_kuechen-960x257.jpg" alt="Suvremena kuhinja po mjeri"/></div></section>

    <section className="testimonial container"><div className="stars" aria-label="5 od 5 zvjezdica">★★★★★</div><blockquote>“Nakon višemjesečnog traženja sofe kakvu želim, nalazim je baš u Vesperi. Susretljivi djelatnici, kvaliteta odlična, svaka preporuka.”</blockquote><p>Palma P. · javno objavljena recenzija</p></section>
  </main></PageShell>;
}
