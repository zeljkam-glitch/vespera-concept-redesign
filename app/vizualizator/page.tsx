import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Camera, CheckCircle2, Grid3X3, Phone } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';
import { KitchenPlanner } from '@/components/kitchen-planner';
import { RoomVisualizer } from '@/components/room-visualizer';
import { getPublishedContent } from '@/lib/admin/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Vizualni alati | Vespera namještaj',
  description: 'Postavite Vesperin namještaj u fotografiju svog prostora ili pripremite osnovni nacrt kuhinje prije dolaska u salon.',
};

export default async function VizualizatorPage() {
  const content = await getPublishedContent();

  return <PageShell><main>
    <section className="visualizer-hero planner-hero"><div className="container"><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><span>Vizualni alati</span></nav><p className="eyebrow">Besplatna priprema prije dolaska u salon</p><h1>Zamislite namještaj u svom prostoru.</h1><p className="lead">Učitajte fotografiju prostorije i postavite odabrani Vespera proizvod ili pripremite osnovni nacrt kuhinje. Oba alata služe kao polazište za razgovor sa savjetnikom.</p><div className="visualizer-tool-switch"><a href="#proizvod-u-prostoru"><Camera aria-hidden="true" /><span><strong>Proizvod u fotografiji</strong><small>Brza orijentacijska montaža</small></span></a><a href="#planer-kuhinje"><Grid3X3 aria-hidden="true" /><span><strong>Planer kuhinje</strong><small>Mjere, priključci i raspored</small></span></a></div></div></section>

    <section className="section container visualizer-product-section" id="proizvod-u-prostoru"><div className="section-heading"><div><p className="eyebrow">AI vizualizacija prostora</p><h2>Pogledajte proizvod u svojoj prostoriji.</h2></div><p>Fotografirajte prostor i odaberite proizvod iz objavljene ponude. AI priprema novu fotografiju s prirodnijom perspektivom, svjetlom i sjenama.</p></div><RoomVisualizer products={content.products} /></section>

    <section className="visualizer-kitchen-section" id="planer-kuhinje"><div className="container"><div className="section-heading"><div><p className="eyebrow">Planiranje po mjeri</p><h2>Pripremite osnovni nacrt kuhinje.</h2></div><p>Unesite mjere, označite vrata i priključke te složite elemente u mjerilu. Planer ne provjerava nosivost zidova, instalacije ni mogućnost montaže.</p></div><KitchenPlanner /></div></section>

    <section className="visualizer-next"><div className="container"><div><p className="eyebrow">Što slijedi nakon alata?</p><h2>Vaša ideja postaje polazište za dobar razgovor.</h2><p>Vespera zatim provjerava točne mjere, prolaze, priključke, materijale, cijenu i mogućnosti izvedbe prije narudžbe.</p></div><div className="visualizer-next-steps"><p><CheckCircle2 aria-hidden="true" /><span><strong>Ponesite mjere i fotografije</strong>Ne moraju biti savršene za prvi razgovor.</span></p><p><CheckCircle2 aria-hidden="true" /><span><strong>Pregledajte uzorke u salonu</strong>Boje i materijale uvijek je najbolje provjeriti uživo.</span></p><a className="button button-accent" href="tel:+38547645535"><Phone aria-hidden="true" /> Nazovite 047 645 535</a></div></div></section>
    <div className="container"><Link className="text-link back-link" href="/"><ArrowLeft aria-hidden="true" /> Natrag na početnu</Link></div>
  </main></PageShell>;
}
