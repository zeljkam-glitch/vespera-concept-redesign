'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, MapPin, MessageCircle, Phone, Share2 } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';

export default function ManilaPage() {
  const [wall,setWall]=useState('');
  const [result,setResult]=useState('');
  const [copyStatus,setCopyStatus]=useState('');
  function calculate(event:{preventDefault:()=>void}){ event.preventDefault(); const n=Number(wall); if(!n)return setResult('Upišite širinu zida u centimetrima.'); setResult(n>=260?`Da — ostaje vam približno ${n-240} cm. Preporučujemo barem 10 cm slobodnog prostora sa svake strane.`:`Zid je vjerojatno preuzak. Za Manilu preporučujemo najmanje 260 cm.`); }
  async function copyLink(){ try { await navigator.clipboard.writeText(location.href); setCopyStatus('Poveznica je kopirana.'); } catch { setCopyStatus('Kopiranje nije uspjelo. Označite adresu stranice u pregledniku.'); } }
  useEffect(()=>{
    const context=(document as Document & {modelContext?:{registerTool:(tool:unknown,options:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
    if(!context?.registerTool)return;
    const lifecycle=new AbortController();
    void Promise.resolve(context.registerTool({name:'calculate_manila_fit',title:'Provjeri hoće li Manila stati',description:'Izračunava odgovara li kutna garnitura Manila zidu zadane širine i prikazuje isti rezultat u kalkulatoru na stranici.',inputSchema:{type:'object',properties:{wallWidthCm:{type:'number',minimum:1}},required:['wallWidthCm'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:(input:unknown)=>{const width=Number((input as {wallWidthCm:number}).wallWidthCm);if(!Number.isFinite(width)||width<1)throw new Error('Širina zida mora biti pozitivan broj.');const message=width>=260?`Da — ostaje vam približno ${width-240} cm. Preporučujemo barem 10 cm slobodnog prostora sa svake strane.`:'Zid je vjerojatno preuzak. Za Manilu preporučujemo najmanje 260 cm.';setWall(String(width));setResult(message);return{fits:width>=260,remainingCm:width-240,message};}},{signal:lifecycle.signal})).catch(()=>{});
    return()=>lifecycle.abort();
  },[]);
  return <PageShell><main>
    <div className="container page-intro"><nav className="breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link> / <Link href="/garniture">Garniture</Link> / Manila</nav><Link className="text-link" href="/garniture"><ArrowLeft size={20}/> Natrag na garniture</Link></div>
    <section className="container product-layout">
      <div className="product-gallery"><div className="main-product-image"><Image src="https://vespera.hr/wp-content/uploads/2026/07/1781691780_1781690676836_edit_338493474214675.png" alt="Kutna garnitura Manila u svijetloj tkanini" width={960} height={720} sizes="(max-width: 920px) 100vw, 52vw" priority /></div><p className="image-caption">Fotografija proizvoda: javno objavljen Vespera sadržaj. Boja i izvedba mogu se razlikovati.</p></div>
      <div className="product-info"><p className="eyebrow">Kutna garnitura · za manji prostor</p><h1>Manila</h1><p className="availability">Nazovite salon za potvrdu dostupnosti</p><div className="product-price"><span>Redovna cijena <s>1.440,00 €</s> · ušteda 20%</span><strong>1.152,00 €</strong></div><p>Ravne linije, pomoćni ležaj i spremnik za posteljinu u dimenzijama prikladnima za manji dnevni boravak.</p>
        <div className="key-facts"><div className="fact"><span>Ukupne dimenzije</span><strong>240 × 175 × 95 cm</strong></div><div className="fact"><span>Ležaj</span><strong>200 × 160 cm</strong></div><div className="fact"><span>Odlaganje</span><strong>Spremnik za posteljinu</strong></div><div className="fact"><span>Izvedba</span><strong>Više boja i tkanina</strong></div></div>
        <div className="cta-stack"><a className="button button-accent" href="tel:+38547645535"><Phone/> Provjerite dostupnost</a><a className="button button-light" href="https://maps.google.com/?q=Matka+Laginje+1+Karlovac"><MapPin/> Kako do salona</a></div>
        <div className="share-row"><a className="button button-ghost" href="https://wa.me/?text=Kutna%20garnitura%20Manila%20%E2%80%94%20https%3A%2F%2Fvespera-concept-redesign.vercel.app%2Fproizvod%2Fmanila" target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true"/> Pošaljite na WhatsApp</a><button className="button button-ghost" type="button" onClick={copyLink}><Share2 aria-hidden="true"/> Kopirajte poveznicu</button></div>{copyStatus && <output className="copy-status">{copyStatus}</output>}
      </div>
    </section>

    <section className="container section"><p className="eyebrow">Brza procjena</p><h2>Je li Manila za vas?</h2><div className="for-you"><div><Check/><strong>Imate manji ili srednji dnevni boravak</strong><span>Kompaktna je u odnosu na mnoge velike kutne garniture.</span></div><div><Check/><strong>Povremeno trebate dodatni ležaj</strong><span>Razvlači se u površinu za spavanje 200 × 160 cm.</span></div><div><Check/><strong>Nedostaje vam prostora za odlaganje</strong><span>Ugrađeni spremnik skriva posteljinu i deke.</span></div></div></section>

    <section className="fit-section"><div className="container fit-card"><div><p className="eyebrow">Jednostavan kalkulator</p><h2>Hoće li stati?</h2><p>Manila je široka 240 cm. Za ugodno postavljanje preporučujemo barem 10 cm slobodnog prostora sa svake strane.</p><div className="dimension-diagram" aria-label="Tlocrt garniture: 240 centimetara širine i 175 centimetara dubine"><div className="dimension-shape"><strong>Manila</strong></div></div></div>
      <form className="fit-input-wrap" onSubmit={calculate}><label htmlFor="wall">Koliko je širok vaš zid?</label><div className="fit-input"><input id="wall" inputMode="numeric" type="number" min="1" value={wall} onChange={e=>setWall(e.target.value)} placeholder="npr. 285" aria-describedby="wall-unit"/><button type="submit">Provjeri</button></div><span id="wall-unit">Upišite mjeru u centimetrima.</span>{result&&<output className="fit-result">{result}</output>}</form></div></section>

    <section className="container section"><div className="section-head"><div><p className="eyebrow">Prije dolaska</p><h2>Isprobajte je u salonu</h2></div><p>Provjerite visinu sjedenja, tvrdoću i lakoću razvlačenja. Naš tim može pripremiti uzorke tkanina i potvrditi rok isporuke.</p></div><a className="button" href="tel:+38547645535"><Phone/> Nazovite 047 645 535</a></section>
  </main></PageShell>;
}
