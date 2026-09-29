'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    eyebrow: 'Akcije svaki mjesec',
    title: 'Prvo pogledajte što je sada povoljnije.',
    copy: 'Izdvojene ponude, jasne prethodne cijene i provjera dostupnosti prije dolaska.',
    cta: 'Pogledajte aktualne akcije',
    href: '/namjestaj?akcija=da',
    image: 'https://vespera.hr/wp-content/uploads/2026/06/Monaco_sastav02_dd822400.jpg',
    alt: 'Kutna garnitura iz Vesperine aktualne ponude',
  },
  {
    eyebrow: 'Kuhinje po mjeri',
    title: 'Besplatna izmjera i 3D planiranje.',
    copy: 'Planiramo prema prostoru, potrebama i budžetu. Okvirni rok isporuke je 30 dana.',
    cta: 'Rezervirajte termin',
    href: '/kuhinje#projekt',
    image: 'https://vespera.hr/wp-content/uploads/2026/06/csm_inspiration_stage_laser_412_3bd5d5fd87.jpg',
    alt: 'Kuhinja po mjeri s radnim otokom',
  },
  {
    eyebrow: 'Plaćanje koje vam odgovara',
    title: 'Gotovinski popust ili do 24 rate.',
    copy: 'U salonu provjerite mogućnosti plaćanja karticama Zagrebačke, Erste, Karlovačke i Privredne banke te Dinersom.',
    cta: 'Provjerite načine plaćanja',
    href: '/#placanje',
    image: 'https://vespera.hr/wp-content/uploads/2026/08/crafterkrevet_4-1140x641.jpg',
    alt: 'Boxspring krevet u uređenoj spavaćoj sobi',
  },
];

export function PromoShowcase() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const go = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section className="promo-showcase" aria-label="Izdvojene Vespera ponude">
      <div className="promo-media">
        <Image key={slide.image} src={slide.image} alt={slide.alt} width={1680} height={900} sizes="100vw" priority />
      </div>
      <div className="promo-content" aria-live="polite">
        <p className="eyebrow">{slide.eyebrow}</p>
        <h2>{slide.title}</h2>
        <p>{slide.copy}</p>
        <Link className="button button-dark" href={slide.href}>{slide.cta}</Link>
        <div className="promo-controls">
          <button type="button" onClick={() => go(-1)} aria-label="Prethodna ponuda"><ChevronLeft aria-hidden="true" /></button>
          <span>{active + 1} / {slides.length}</span>
          <button type="button" onClick={() => go(1)} aria-label="Sljedeća ponuda"><ChevronRight aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
