import Link from 'next/link';
import { Home, MapPin, Menu, Phone, Search } from 'lucide-react';

export function ConceptBar() {
  return <div className="concept-bar"><span>SALTY BRAND STUDIO</span><span>Konceptualni redizajn · nije službena Vespera stranica</span></div>;
}

export function Header() {
  return <><ConceptBar /><header className="site-header">
    <Link href="/" className="brand" aria-label="Vespera, početna">vespera<span>.</span></Link>
    <nav className="desktop-nav" aria-label="Glavna navigacija">
      <Link href="/garniture">Garniture</Link><a href="#kategorije">Sav namještaj</a><a href="#vodici">Savjeti</a><a href="#salon">Salon</a>
    </nav>
    <a className="header-phone" href="tel:+38547645535"><Phone size={20} aria-hidden="true" /> 047 645 535</a>
    <button className="menu-button" aria-label="Otvori izbornik"><Menu size={27} aria-hidden="true" /></button>
  </header></>;
}

export function SearchBox() {
  return <form className="search-box" role="search">
    <Search size={24} aria-hidden="true" /><label htmlFor="site-search" className="sr-only">Što tražite?</label>
    <input id="site-search" type="search" placeholder="Što tražite? Npr. manja kutna garnitura" />
    <Link href="/garniture">Traži</Link>
  </form>;
}

export function Footer() {
  return <footer className="footer" id="salon">
    <div><Link href="/" className="brand brand-light">vespera<span>.</span></Link><p>Namještaj za život kakav stvarno živite.</p></div>
    <div><h3>Salon u Karlovcu</h3><p>Matka Laginje 1, 47000 Karlovac</p><a href="tel:+38547645535">047 645 535</a><a href="mailto:namjestaj@vespera.hr">namjestaj@vespera.hr</a></div>
    <div><h3>Tu smo za pomoć</h3><Link href="/garniture">Odabir garniture</Link><a href="#vodici">Vodiči prije kupnje</a><a href="#kuhinje">3D planiranje kuhinje</a></div>
    <p className="footer-note">Konceptualni portfolio projekt Salty Brand Studija. Sadržaj proizvoda služi za demonstraciju UX smjera.</p>
  </footer>;
}

export function StickyNav() {
  return <nav className="sticky-nav" aria-label="Brze akcije">
    <Link href="/"><Home aria-hidden="true" /><span>Početna</span></Link><a href="#site-search"><Search aria-hidden="true" /><span>Traži</span></a><a href="tel:+38547645535"><Phone aria-hidden="true" /><span>Nazovi</span></a><a href="https://maps.google.com/?q=Matka+Laginje+1+Karlovac"><MapPin aria-hidden="true" /><span>Salon</span></a>
  </nav>;
}

export function PageShell({ children }: { children: React.ReactNode }) { return <><Header />{children}<Footer /><StickyNav /></>; }
