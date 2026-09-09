'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageShell, SearchBox } from '@/components/site-chrome';

const options = ['Manji prostor', 'Srednji prostor', 'Veliki prostor', 'Pomoćni ležaj', 'Spremnik', 'Lakše ustajanje', 'Lako održavanje', 'Do 1.000 €', 'Do 1.500 €'];
const products = [
  { name:'Manila', size:'240 × 175 cm', features:'Ležaj · spremnik · manje dimenzije', price:'1.152,00 €', old:'1.440,00 €', sale:'−20%', image:'https://vespera.hr/wp-content/uploads/2026/07/1781691780_1781690676836_edit_338493474214675.png', tags:['Manji prostor','Pomoćni ležaj','Spremnik','Do 1.500 €','Lako održavanje'], href:'/proizvod/manila' },
  { name:'Soho', size:'252 × 158 cm', features:'Ležaj · spremnik · metalne nogice', price:'984,00 €', old:'1.230,00 €', sale:'−20%', image:'https://vespera.hr/wp-content/uploads/2024/07/soho-1-300x300.jpg', tags:['Manji prostor','Pomoćni ležaj','Spremnik','Do 1.000 €'], href:'/garniture' },
  { name:'Asti', size:'270 × 176 cm', features:'Ležaj · spremnik · više boja', price:'1.384,00 €', old:'1.730,00 €', sale:'−20%', image:'https://vespera.hr/wp-content/uploads/2025/09/ASTI-300x300.jpg', tags:['Srednji prostor','Pomoćni ležaj','Spremnik','Do 1.500 €'], href:'/garniture' },
  { name:'Monaco', size:'290 × 220 cm', features:'48 cm visina sjedišta · vodoodbojna tkanina', price:'1.275,00 €', old:'1.700,00 €', sale:'−25%', image:'https://vespera.hr/wp-content/uploads/2026/06/ambijent-3-960x540.jpg', tags:['Srednji prostor','Pomoćni ležaj','Spremnik','Do 1.500 €','Lakše ustajanje','Lako održavanje'], href:'/garniture' },
  { name:'Morgan', size:'310 × 240 cm', features:'Ležaj · ladica · lijevi ili desni kut', price:'1.536,00 €', old:'1.920,00 €', sale:'−20%', image:'https://vespera.hr/wp-content/uploads/2024/07/MORGAN-GRT-300x300.jpg', tags:['Veliki prostor','Pomoćni ležaj','Spremnik'], href:'/garniture' },
  { name:'Yoka', size:'310 × 250 cm', features:'Ležaj · spremnik · prostrana', price:'960,65 €', old:'1.372,35 €', sale:'−30%', image:'https://vespera.hr/wp-content/uploads/2021/11/YOKA.jpg', tags:['Veliki prostor','Pomoćni ležaj','Spremnik','Do 1.000 €'], href:'/garniture' },
];

export default function GarniturePage() {
  const [selected,setSelected] = useState<string[]>([]);
  const toggle=(option:string)=>setSelected(current=>current.includes(option)?current.filter(item=>item!==option):[...current,option]);
  const visible=selected.length===0?products:products.filter(product=>selected.every(option=>product.tags.includes(option)));
  return <PageShell><main className="container">
    <section className="page-intro"><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link> / Garniture</nav><p className="eyebrow">Jednostavniji put do pravog izbora</p><h1>Trebam novu garnituru</h1><p className="lead">Recite nam što vam treba. Filtri su napisani prema stvarnim životnim potrebama, a ne kataloškim šiframa.</p></section>
    <SearchBox />
    <section className="section" style={{paddingTop:'54px'}} aria-labelledby="filter-heading">
      <div className="filters"><h2 className="filter-title" id="filter-heading">Što vam je važno?</h2><div className="filter-row">{options.map(option=><button key={option} className="filter-chip" aria-pressed={selected.includes(option)} onClick={()=>toggle(option)}>{selected.includes(option)?'✓ ':''}{option}</button>)}</div>
        <div className="filter-meta"><p>{visible.length} {visible.length===1?'garnitura odgovara':'garnitura odgovara'} vašem odabiru</p>{selected.length>0&&<button className="clear-button" onClick={()=>setSelected([])}>Očisti odabir</button>}</div>
      </div>
      {selected.includes('Lakše ustajanje')&&<div className="result-note"><strong>Savjet:</strong> Za lakše ustajanje tražite višu i čvršću sjedeću plohu. Monaco ima sjedište visoko 48 cm.</div>}
      {visible.length>0?<div className="product-grid">{visible.map(product=><article className="product-card" key={product.name}><Link href={product.href}><div className="product-image"><img src={product.image} alt={`Kutna garnitura ${product.name}`}/></div><div className="product-body"><span className="product-kicker">Kutna garnitura · {product.size}</span><h3>{product.name}</h3><p className="product-features">{product.features}</p><div className="price"><strong>{product.price}</strong><span className="old-price">{product.old}</span><span className="sale">{product.sale}</span></div><span className="text-link">Pogledajte detalje <ArrowRight size={19}/></span></div></Link></article>)}</div>:<div className="result-note"><h3>Nema točnog podudaranja</h3><p>Pokušajte ukloniti jedan uvjet ili nas nazovite. Zajedno možemo provjeriti dodatne modele i varijante.</p><a href="tel:+38547645535" className="button">Nazovite 047 645 535</a></div>}
    </section>
    <aside className="help-box" style={{marginBottom:'90px'}}><div><CheckCircle2 size={38}/><h2>Niste sigurni u mjere?</h2><p>Izmjerite najdulji zid i prolaz kroz najuža vrata. Za sve ostalo pomoći ćemo telefonom ili u salonu.</p></div><div><p className="eyebrow">Sljedeći korak</p><p>Otvorite model Manila i isprobajte jednostavan kalkulator “Hoće li stati?”.</p><Link className="button" href="/proizvod/manila">Pogledajte Manilu <ArrowRight/></Link></div></aside>
  </main></PageShell>;
}
