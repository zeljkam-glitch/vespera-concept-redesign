import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Phone } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';
import { KitchenPlanner } from '@/components/kitchen-planner';

export const metadata: Metadata = {
  title: 'Planer kuhinje | Vespera namještaj',
  description: 'Unesite mjere, označite vrata i priključke te složite osnovni nacrt kuhinje prije razgovora s Vesperinim savjetnikom.',
};

export default function VizualizatorPage() {
  return <PageShell><main>
    <section className="visualizer-hero planner-hero"><div className="container"><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><span>Planer kuhinje</span></nav><p className="eyebrow">Besplatna priprema prije dolaska u salon</p><h1>Isplanirajte svoju kuhinju.</h1><p className="lead">Unesite mjere, označite vrata i priključke te složite elemente u mjerilu. Ne trebate znati stručne izraze. Vodimo vas korak po korak.</p><p className="prototype-note">Planer je u demo fazi. Konačne mjere, izvedbu i cijenu potvrđuje Vesperin savjetnik.</p></div></section>
    <section className="section container"><KitchenPlanner /></section>
    <section className="visualizer-next"><div className="container"><div><p className="eyebrow">Što slijedi nakon planera?</p><h2>Nacrt postaje polazište za dobar razgovor.</h2><p>Vespera zatim provjerava točne mjere, prolaze, priključke, materijale, cijenu i mogućnosti izvedbe prije narudžbe.</p></div><div className="visualizer-next-steps"><p><CheckCircle2 aria-hidden="true" /><span><strong>Ponesite mjere i fotografije</strong>Ne moraju biti savršene za prvi razgovor.</span></p><p><CheckCircle2 aria-hidden="true" /><span><strong>Pregledajte uzorke u salonu</strong>Boje i materijale uvijek je najbolje provjeriti uživo.</span></p><a className="button button-accent" href="tel:+38547645535"><Phone aria-hidden="true" /> Nazovite 047 645 535</a></div></div></section>
    <div className="container"><Link className="text-link back-link" href="/"><ArrowLeft aria-hidden="true" /> Natrag na početnu</Link></div>
  </main></PageShell>;
}
