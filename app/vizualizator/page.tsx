import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Phone } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';
import { RoomVisualizer } from '@/components/room-visualizer';

export const metadata: Metadata = {
  title: 'Vizualni planer prostora | Vespera namještaj',
  description: 'Dodajte fotografiju prostora, odaberite namještaj, stil i paletu te pripremite jasan vizualni smjer za razgovor u Vespera salonu.',
};

export default function VizualizatorPage() {
  return <PageShell><main>
    <section className="visualizer-hero"><div className="container"><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><span>Vizualni planer</span></nav><p className="eyebrow">Vespera alat za pripremu prostora</p><h1>Isprobajte ideju prije dolaska u salon.</h1><p className="lead">Dodajte fotografiju, odaberite vrstu namještaja, stil i boje. Dobit ćete jasan sažetak za razgovor sa savjetnikom.</p></div></section>
    <section className="section container"><RoomVisualizer /></section>
    <section className="visualizer-next"><div className="container"><div><p className="eyebrow">Što slijedi nakon planera?</p><h2>Prava odluka i dalje počinje mjerama.</h2><p>Vizualni planer pomaže objasniti smjer. Vespera zatim provjerava dimenzije, prolaze, materijale, cijenu i dostupnost prije narudžbe.</p></div><div className="visualizer-next-steps"><p><CheckCircle2 aria-hidden="true" /><span><strong>Ponesite mjere i fotografije</strong>Ne moraju biti savršene za prvi razgovor.</span></p><p><CheckCircle2 aria-hidden="true" /><span><strong>Isprobajte proizvode u salonu</strong>Udobnost i materijal provjerite uživo.</span></p><a className="button button-accent" href="tel:+38547645535"><Phone aria-hidden="true" /> Nazovite 047 645 535</a></div></div></section>
    <div className="container"><Link className="text-link back-link" href="/"><ArrowLeft aria-hidden="true" /> Natrag na početnu</Link></div>
  </main></PageShell>;
}
