import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Camera, CheckCircle2, Clock3, CreditCard, MapPin, MessageCircle, Phone, ShieldCheck, Truck } from 'lucide-react';
import { PromoShowcase } from '@/components/promo-showcase';
import { ActionCarousel } from '@/components/action-carousel';
import { PageShell, SearchBox } from '@/components/site-chrome';
import { roomLinks } from '@/lib/products';

export default function Home() {
  return (
    <PageShell><main>
      <PromoShowcase />

      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy"><p className="eyebrow">Salon namještaja u Karlovcu od 2008.</p><h1>Dobar namještaj počinje dobrim savjetom.</h1><p>Posjetite salon, isprobajte proizvode i razgovarajte s ljudima koji znaju pomoći.</p>
            <div className="hero-actions"><Link className="button button-accent" href="/namjestaj?akcija=da">Pogledajte akcije <ArrowRight aria-hidden="true" /></Link><Link className="button button-light" href="/kuhinje">Planirajte kuhinju</Link></div>
            <a className="text-link" href="tel:+38547645535"><Phone size={20} aria-hidden="true" /> Radije biste razgovarali? 047 645 535</a>
          </div>
          <div className="hero-image"><Image src="https://vespera.hr/wp-content/uploads/2026/06/ambijent-3-960x540.jpg" alt="Prostrana kutna garnitura u suvremenom dnevnom boravku" width={960} height={540} sizes="(max-width: 920px) 100vw, 50vw" priority /><div className="hero-badge">Od 2008. pomažemo urediti dom po stvarnim potrebama i budžetu.</div></div>
        </div>
        <div className="hero-search"><SearchBox /></div>
      </section>

      <section className="trust-strip" aria-label="Prednosti Vespere">
        <div><ShieldCheck aria-hidden="true" /><span><strong>Osobni savjet</strong> bez žurbe</span></div>
        <div><Truck aria-hidden="true" /><span><strong>Dostava i montaža</strong> prema dogovoru</span></div>
        <a className="trust-call" href="tel:+38547645535"><Clock3 aria-hidden="true" /><span><strong>Provjera dostupnosti</strong> 047 645 535</span></a>
      </section>

      <section className="section container" id="kategorije">
        <div className="section-head"><div><p className="eyebrow">Namještaj po prostorijama</p><h2>Što danas uređujete?</h2></div><p>Krenite od prostorije, a zatim suzite izbor prema dimenzijama, cijeni i dostupnosti.</p></div>
        <div className="room-home-grid">{roomLinks.map((room, index) => <Link href={room.href} key={room.name}><span>0{index + 1}</span><div><strong>{room.name}</strong><small>{room.description}</small></div><ArrowRight aria-hidden="true" /></Link>)}</div>
        <Link className="button advice-button" href="/namjestaj">Pregledajte sav namještaj <ArrowRight aria-hidden="true" /></Link>
      </section>

      <section className="section current-section" id="aktualno"><div className="container">
        <div className="sale-heading"><div><p className="eyebrow">Aktualne akcije</p><h2>Jasna cijena. Ponuda koja se mijenja.</h2></div><p>Prikazujemo akcijsku i referentnu cijenu te status proizvoda. Svi iznosi u ovom konceptu su demo podaci koje Vespera treba potvrditi prije objave.</p></div>
        <ActionCarousel />
        <div className="action-catalog"><div><p className="eyebrow">Mjesečni katalog akcija</p><h3>Sve aktualne ponude na jednom mjestu.</h3><p>Katalog se redovito osvježava. U konačnoj verziji Natalija ga može zamijeniti bez pomoći programera.</p></div><Link className="button button-accent" href="/namjestaj?akcija=da">Otvorite akcijski katalog <ArrowRight aria-hidden="true" /></Link></div>
      </div></section>

      <section className="kitchen-feature" id="kuhinje"><div className="kitchen-photo"><Image src="https://vespera.hr/wp-content/uploads/2026/06/csm_inspiration_stage_laser_412_3bd5d5fd87.jpg" alt="Moderna kuhinja planirana prema prostoru" width={1680} height={800} sizes="(max-width: 920px) 100vw, 55vw" /></div><div className="kitchen-copy"><p className="eyebrow">Kuhinje i namještaj po mjeri</p><h2>Od mjerenja do montaže, uz jednu jasnu ponudu.</h2><p>Besplatno mjerimo prostor i pripremamo 3D prijedlog prema vašim navikama i budžetu. Okvirni rok isporuke je oko 30 dana.</p><div className="process-list"><span>01 Besplatna izmjera prostora</span><span>02 Besplatno 3D planiranje</span><span>03 Dostava i stručna montaža</span></div><Link className="button button-dark" href="/kuhinje">Planirajte svoju kuhinju <ArrowRight aria-hidden="true" /></Link></div></section>

      <section className="section container" id="placanje"><div className="payment-panel"><div><p className="eyebrow">Fleksibilno plaćanje</p><h2>Odaberite način koji vam odgovara.</h2><p>Gotovinski popust i obročno plaćanje provjeravaju se u salonu za svaki proizvod i karticu.</p></div><div className="payment-facts"><p><CreditCard aria-hidden="true" /><span><strong>Do 24 rate</strong><small>Zagrebačka, Erste, Karlovačka i Privredna banka te Diners</small></span></p><p><CheckCircle2 aria-hidden="true" /><span><strong>Gotovinski popust</strong><small>Točan iznos potvrđuje prodajni savjetnik</small></span></p><a className="button button-light" href="tel:+38547645535">Provjerite mogućnosti</a></div></div></section>

      <section className="section container" id="vodici"><div className="section-head"><div><p className="eyebrow">Savjeti prije kupnje</p><h2>Manje dvojbi prije odluke.</h2></div><p>Kratki, razumljivi vodiči o mjerama, udobnosti i planiranju prostora.</p></div><div className="guide-grid">
        <article className="guide"><span className="number">MJERENJE · 5 MIN</span><h3>Kako pravilno izmjeriti prostor prije kupnje?</h3><p>Zid je tek početak. Provjerite vrata, hodnik, stubište i prostor za prolaz.</p><Link className="text-link" href="/blog/kako-izmjeriti-prostor">Pročitajte vodič</Link></article>
        <article className="guide"><span className="number">UDOBNOST · 4 MIN</span><h3>Kako odabrati garnituru iz koje se lakše ustaje?</h3><p>Visina sjedišta, dubina i čvrstoća mogu biti važnije od samog izgleda.</p><Link className="text-link" href="/blog/lakse-ustajanje">Pročitajte vodič</Link></article>
        <article className="guide"><span className="number">KUHINJE · 6 MIN</span><h3>Što pripremiti za planiranje kuhinje po mjeri?</h3><p>Nekoliko fotografija i osnovnih mjera dovoljno je za kvalitetniji prvi razgovor.</p><Link className="text-link" href="/blog/priprema-kuhinje-po-mjeri">Pročitajte vodič</Link></article>
      </div><Link className="button advice-button" href="/blog">Pogledajte sve savjete <ArrowRight aria-hidden="true" /></Link></section>

      <section className="social-section" aria-labelledby="social-title"><div className="container social-grid"><div><p className="eyebrow">Vespera na društvenim mrežama</p><h2 id="social-title">Nova ponuda, akcije i realizacije.</h2></div><div className="social-copy"><p>Na Facebooku i Instagramu pogledajte što je stiglo u salon te primjere kuhinja i namještaja po mjeri.</p><div className="social-links"><a href="https://www.facebook.com/vesperanamjestaj/photos/" target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /><span><strong>Facebook</strong><small>Fotografije i aktualna ponuda</small></span><ArrowRight aria-hidden="true" /></a><a href="https://www.instagram.com/vespera_namjestaj/" target="_blank" rel="noreferrer"><Camera aria-hidden="true" /><span><strong>Instagram</strong><small>@vespera_namjestaj</small></span><ArrowRight aria-hidden="true" /></a></div></div></div></section>

      <section className="salon-section" id="salon-info"><div className="container salon-grid"><div><p className="eyebrow">Salon u Karlovcu</p><h2>Dođite, sjednite, otvorite, isprobajte.</h2><p>Namještaj je odluka koju je dobro osjetiti uživo. Naš tim pomaže usporediti modele, rokove i mogućnosti plaćanja.</p><div className="hero-actions"><a className="button button-accent" href="https://maps.google.com/?q=Matka+Laginje+1+Karlovac"><MapPin aria-hidden="true" /> Kako do salona</a><a className="button button-light" href="tel:+38547645535"><Phone aria-hidden="true" /> Nazovite salon</a></div></div><div className="salon-facts"><p><strong>Adresa</strong><span>Ul. Matka Laginje 1, Karlovac</span></p><p><strong>Telefon</strong><span>047 645 535</span></p><p><strong>Područje</strong><span>Karlovac, Ogulin, Slunj, Jastrebarsko i okolica</span></p></div></div></section>
    </main></PageShell>
  );
}
