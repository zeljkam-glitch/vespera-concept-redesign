import Link from 'next/link';
import Image from 'next/image';
import { Home, MapPin, Menu, Phone, Search } from 'lucide-react';

export function ConceptBar() {
  return <div className="concept-bar"><span>SALTY BRAND STUDIO</span><span>Konceptualni redizajn · nije službena Vespera stranica</span></div>;
}

export function Header() {
  return <><ConceptBar /><header className="site-header">
    <Link href="/" className="brand" aria-label="Vespera namještaj, početna">
      <Image src="/brand/vespera-logo.png" alt="Vespera namještaj" width={480} height={480} priority />
    </Link>
    <nav className="desktop-nav" aria-label="Glavna navigacija">
      <Link href="/#aktualno">Akcije</Link><Link href="/garniture">Garniture</Link><Link href="/kuhinje">Kuhinje po mjeri</Link><Link href="/blog">Blog</Link><Link href="/#salon">Salon</Link>
    </nav>
    <a className="header-phone" href="tel:+38547645535"><Phone size={20} aria-hidden="true" /> 047 645 535</a>
    <details className="mobile-menu">
      <summary aria-label="Otvori izbornik"><Menu size={27} aria-hidden="true" /></summary>
      <nav aria-label="Mobilna navigacija"><Link href="/#aktualno">Akcije</Link><Link href="/garniture">Garniture</Link><Link href="/kuhinje">Kuhinje po mjeri</Link><Link href="/blog">Blog i savjeti</Link><Link href="/#salon">Salon i kontakt</Link></nav>
    </details>
  </header></>;
}

export function SearchBox() {
  return <search><form className="search-box" action="/garniture">
    <Search size={24} aria-hidden="true" /><label htmlFor="site-search" className="sr-only">Što tražite?</label>
    <input id="site-search" name="q" type="search" placeholder="Npr. manja garnitura sa spremnikom" />
    <button type="submit">Traži</button>
  </form></search>;
}

export function Footer() {
  return <footer className="footer" id="salon">
    <div><Link href="/" className="brand brand-light"><Image src="/brand/vespera-logo.png" alt="Vespera namještaj" width={480} height={480} /></Link><p>Dobar namještaj počinje dobrim savjetom.</p></div>
    <div><h3>Salon u Karlovcu</h3><p>Matka Laginje 1, 47000 Karlovac</p><a href="tel:+38547645535">047 645 535</a><a href="mailto:namjestaj@vespera.hr">namjestaj@vespera.hr</a></div>
    <div><h3>Tu smo za pomoć</h3><Link href="/garniture">Odabir garniture</Link><Link href="/blog">Blog i vodiči</Link><Link href="/kuhinje">3D planiranje kuhinje</Link></div>
    <p className="footer-note">Konceptualni portfolio projekt Salty Brand Studija. Sadržaj proizvoda služi za demonstraciju UX smjera.</p>
  </footer>;
}

export function StickyNav() {
  return <nav className="sticky-nav" aria-label="Brze akcije">
    <Link href="/"><Home aria-hidden="true" /><span>Početna</span></Link><Link href="/#site-search"><Search aria-hidden="true" /><span>Traži</span></Link><a href="tel:+38547645535"><Phone aria-hidden="true" /><span>Nazovi</span></a><a href="https://maps.google.com/?q=Matka+Laginje+1+Karlovac"><MapPin aria-hidden="true" /><span>Salon</span></a>
  </nav>;
}

export function PageShell({ children }: { children: React.ReactNode }) { return <><Header />{children}<Footer /><StickyNav /></>; }
