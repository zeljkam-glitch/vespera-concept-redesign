import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';

const news = [
  { date: '07. 08. 2026.', category: 'Rasprodaja', title: 'Izložbeni primjerci po posebnim cijenama', copy: 'Izdvojeni modeli iz salona dostupni su u ograničenoj količini. Prije dolaska provjerite je li odabrani proizvod još dostupan.', href: '/namjestaj?odmah=da', image: 'https://vespera.hr/wp-content/uploads/2026/06/Monaco_sastav02_dd822400.jpg' },
  { date: '05. 08. 2026.', category: 'Dnevni boravak', title: 'Kutna garnitura Monaco', copy: 'Model s podesivim naslonima, pomoćnim ležajem i spremnikom za svakodnevno praktičniji dnevni boravak.', href: '/proizvod/monaco', image: 'https://vespera.hr/wp-content/uploads/2026/06/Monaco_sastav02_dd822400.jpg' },
  { date: '29. 06. 2026.', category: 'Dnevni boravak', title: 'Kutna garnitura Soho', copy: 'Kompaktnija garnitura s ležajem i spremnikom, prikladna za prostor u kojem svaki centimetar ima svoju ulogu.', href: '/proizvod/soho', image: 'https://vespera.hr/wp-content/uploads/2026/06/Soho_ambijent.jpg' },
  { date: '23. 06. 2026.', category: 'Blagovaonica', title: 'Novosti za blagovaonicu', copy: 'Stolovi i stolice za svakodnevne obroke, obiteljska okupljanja i prostore različitih veličina.', href: '/namjestaj?q=stolice', image: 'https://vespera.hr/wp-content/uploads/2026/06/ambijent-3-960x540.jpg' },
  { date: 'Aktualno', category: 'Kuhinje', title: 'Besplatna izmjera i 3D planiranje', copy: 'Pripremite fotografije prostora i osnovne želje, a Vespera će pomoći oblikovati kuhinju prema prostoru i budžetu.', href: '/kuhinje', image: 'https://vespera.hr/wp-content/uploads/2026/06/csm_inspiration_stage_laser_412_3bd5d5fd87.jpg' },
  { date: 'Aktualno', category: 'Savjeti', title: 'Kako se pripremiti prije kupnje namještaja?', copy: 'Mjere, prolazi, način korištenja i budžet pomažu da razgovor u salonu odmah bude konkretniji.', href: '/blog', image: 'https://vespera.hr/wp-content/uploads/2026/08/crafterkrevet_4-1140x641.jpg' },
];

export default function NovostiPage() {
  return <PageShell><main>
    <section className="blog-hero"><div className="container"><p className="eyebrow">Novosti iz Vespere</p><h1>Nova ponuda, akcije i korisne informacije.</h1><p className="lead">Na jednom mjestu pratite nove modele, proizvode dostupne odmah, akcije i projekte kuhinja po mjeri.</p></div></section>
    <section className="section container news-grid">{news.map((item) => <article className="news-card" key={`${item.date}-${item.title}`}><Link href={item.href}><div className="news-image"><Image src={item.image} alt="" width={760} height={500} sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw" /></div><div className="news-body"><p className="news-meta">{item.category} · {item.date}</p><h2>{item.title}</h2><p>{item.copy}</p><span className="text-link">Saznajte više <ArrowRight aria-hidden="true" /></span></div></Link></article>)}</section>
  </main></PageShell>;
}
