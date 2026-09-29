import Link from 'next/link';
import Image from 'next/image';
import { Camera, Home, MapPin, Menu, MessageCircle, Phone, Search } from 'lucide-react';

export function ConceptBar() {
  return <div className="concept-bar"><span>SALTY BRAND STUDIO</span><span>Konceptualni redizajn · nije službena Vespera stranica</span></div>;
}

export function UtilityBar() {
  return <nav className="utility-bar" aria-label="Dodatne informacije"><Link href="/#salon-info">O nama</Link><Link href="/informacije">Korisnički kutak</Link><Link href="/namjestaj?akcija=da">Katalog / letak</Link><Link href="/novosti">Novosti</Link></nav>;
}

export function Header() {
  return <><ConceptBar /><UtilityBar /><header className="site-header">
    <Link href="/" className="brand" aria-label="Vespera namještaj, početna">
      <Image src="/brand/vespera-logo.png" alt="Vespera namještaj" width={480} height={480} priority />
    </Link>
    <nav className="desktop-nav" aria-label="Glavna navigacija">
      <Link href="/namjestaj?akcija=da">Akcije</Link><Link className="available-now-link" href="/namjestaj?odmah=da">Dostupno odmah</Link><Link href="/namjestaj">Namještaj</Link><Link href="/kuhinje">Kuhinje po mjeri</Link><Link href="/blog">Savjeti</Link><Link href="/#salon-info">Salon</Link>
    </nav>
    <a className="header-phone" href="tel:+38547645535"><Phone size={20} aria-hidden="true" /> 047 645 535</a>
    <details className="mobile-menu">
      <summary aria-label="Otvori izbornik"><Menu size={27} aria-hidden="true" /></summary>
      <nav aria-label="Mobilna navigacija"><Link href="/namjestaj?akcija=da">Akcije</Link><Link className="available-now-link" href="/namjestaj?odmah=da">Dostupno odmah</Link><Link href="/namjestaj">Namještaj po prostorijama</Link><Link href="/kuhinje">Kuhinje po mjeri</Link><Link href="/novosti">Novosti</Link><Link href="/blog">Savjeti prije kupnje</Link><Link href="/informacije">Korisnički kutak</Link><Link href="/#salon">Salon i kontakt</Link></nav>
    </details>
  </header></>;
}

export function SearchBox() {
  return <search><form className="search-box" action="/namjestaj">
    <Search size={24} aria-hidden="true" /><label htmlFor="site-search" className="sr-only">Što tražite?</label>
    <input id="site-search" name="q" type="search" placeholder="Npr. krevet 180 cm ili manja garnitura" />
    <button type="submit">Traži</button>
  </form></search>;
}

export function Footer() {
  return <footer className="footer" id="salon">
    <div><Link href="/" className="brand brand-light"><Image src="/brand/vespera-logo.png" alt="Vespera namještaj" width={480} height={480} /></Link><p>Dobar namještaj počinje dobrim savjetom.</p></div>
    <div><h3>Salon u Karlovcu</h3><p>Matka Laginje 1, 47000 Karlovac</p><a href="tel:+38547645535">047 645 535</a><a href="mailto:namjestaj@vespera.hr">namjestaj@vespera.hr</a></div>
    <div><h3>Tu smo za pomoć</h3><Link href="/namjestaj">Namještaj po prostorijama</Link><Link href="/namjestaj?odmah=da">Dostupno odmah</Link><Link href="/novosti">Novosti</Link><Link href="/blog">Savjeti prije kupnje</Link><Link href="/kuhinje">3D planiranje kuhinje</Link><Link href="/informacije">Korisnički kutak</Link><div className="footer-social"><a href="https://www.facebook.com/vesperanamjestaj/photos/" target="_blank" rel="noreferrer" aria-label="Vespera namještaj na Facebooku"><MessageCircle aria-hidden="true" /> Facebook</a><a href="https://www.instagram.com/vespera_namjestaj/" target="_blank" rel="noreferrer" aria-label="Vespera namještaj na Instagramu"><Camera aria-hidden="true" /> Instagram</a></div></div>
    <div className="footer-payments">
      <div className="footer-payment-options"><h3>Plaćanje do 24 rate</h3><div className="payment-logos" aria-label="Prihvaćene kartice"><span><Image src="/payment/visa.svg" alt="Visa" width={82} height={30} /></span><span><Image src="/payment/mastercard.svg" alt="Mastercard" width={52} height={34} /></span><span><Image src="/payment/diners-club.svg" alt="Diners Club" width={88} height={34} /></span></div><p>Gotovinski popust te obročno plaćanje karticama Zagrebačke, Erste, Karlovačke i Privredne banke i Dinersa. Broj rata i uvjete provjerite u salonu.</p></div>
      <div className="footer-legal"><p>Fotografije proizvoda mogu biti ilustrativne, a boje na zaslonu razlikovati se od stvarnih. Dekorativni predmeti i električni uređaji nisu uključeni u cijenu osim kada je to izričito navedeno.</p><p>Akcijske cijene i dostupnost vrijede do isteka zaliha ili datuma navedenog uz ponudu. Sve cijene iskazane su u eurima. Konačnu cijenu, izvedbu, rok, dostavu i montažu potvrđuje salon prije narudžbe.</p></div>
    </div>
    <p className="footer-note">Konceptualni portfolio projekt Salty Brand Studija. Sadržaj proizvoda služi za demonstraciju UX smjera.</p>
  </footer>;
}

export function StickyNav() {
  return <nav className="sticky-nav" aria-label="Brze akcije">
    <Link href="/"><Home aria-hidden="true" /><span>Početna</span></Link><Link href="/#site-search"><Search aria-hidden="true" /><span>Traži</span></Link><a href="tel:+38547645535"><Phone aria-hidden="true" /><span>Nazovi</span></a><a href="https://maps.google.com/?q=Matka+Laginje+1+Karlovac"><MapPin aria-hidden="true" /><span>Salon</span></a>
  </nav>;
}

export function PageShell({ children }: { children: React.ReactNode }) { return <><a className="skip-link" href="#main-content">Preskočite na glavni sadržaj</a><Header /><div id="main-content" tabIndex={-1}>{children}</div><Footer /><StickyNav /></>; }
