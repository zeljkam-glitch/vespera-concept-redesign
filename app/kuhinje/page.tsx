'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, ImagePlus, MapPin, Phone, Ruler, Send } from 'lucide-react';
import { PageShell } from '@/components/site-chrome';

const layouts = ['Ravna', 'L-kuhinja', 'U-kuhinja', 'Otok ili poluotok', 'Još ne znam'];
const budgets = ['Do 5.000 €', '5.000–10.000 €', '10.000–15.000 €', 'Više od 15.000 €', 'Trebam procjenu'];

export default function KuhinjePage() {
  const [layout, setLayout] = useState('');
  const [budget, setBudget] = useState('');
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent) { event.preventDefault(); setSent(true); }

  return <PageShell><main>
    <section className="kitchen-hero"><div className="container kitchen-hero-grid"><div><nav className="breadcrumbs dark-breadcrumbs" aria-label="Putanja"><Link href="/">Početna</Link><span aria-hidden="true">/</span><span>Kuhinje po mjeri</span></nav><p className="eyebrow">Besplatno stručno planiranje</p><h1>Vaša kuhinja počinje dobrim razgovorom.</h1><p className="lead">Recite nam kako živite, što vas smeta u sadašnjem prostoru i što želite postići. Mi ćemo pomoći s mjerama, rasporedom i 3D prijedlogom.</p><div className="hero-actions"><a className="button button-accent" href="#projekt">Pripremite projekt <ArrowRight aria-hidden="true" /></a><a className="button button-dark-outline" href="tel:+38547645535"><Phone aria-hidden="true" /> 047 645 535</a></div></div><div className="kitchen-hero-image"><img src="https://vespera.hr/wp-content/uploads/2022/08/01_stage_moderne_kuechen-960x257.jpg" alt="Suvremena kuhinja s radnim otokom" /><span>3D planiranje prilagođeno vašem prostoru</span></div></div></section>

    <section className="section container"><div className="section-head"><div><p className="eyebrow">Kako radimo</p><h2>Jedan proces. Jasni koraci.</h2></div><p>Prije narudžbe trebate znati što se prilagođava, što ulazi u cijenu i tko vodi svaki sljedeći korak.</p></div><ol className="kitchen-steps"><li><span>01</span><div><h3>Razgovor i potrebe</h3><p>Prostor, navike, stil, uređaji i okvirni budžet.</p></div></li><li><span>02</span><div><h3>Mjere i instalacije</h3><p>Provjeravamo zidove, priključke, prozore i prolaze.</p></div></li><li><span>03</span><div><h3>3D prijedlog</h3><p>Vidite raspored prije konačne odluke.</p></div></li><li><span>04</span><div><h3>Ponuda i odabir</h3><p>Materijali, okovi, rokovi i stavke troška.</p></div></li><li><span>05</span><div><h3>Dostava i montaža</h3><p>Dogovor termina i priprema prostora.</p></div></li></ol></section>

    <section className="project-section" id="projekt"><div className="container project-grid"><div className="project-copy"><p className="eyebrow">Digitalna priprema termina</p><h2>Pošaljite početne informacije.</h2><p>Ne morate imati savršene mjere. Dovoljna je približna skica, nekoliko fotografija i opis onoga što vam je važno.</p><div className="project-benefits"><p><Ruler aria-hidden="true" /><span><strong>Manje nagađanja</strong> prije prvog sastanka</span></p><p><ImagePlus aria-hidden="true" /><span><strong>Fotografije i skica</strong> daju kontekst prostoru</span></p><p><MapPin aria-hidden="true" /><span><strong>Termin u salonu</strong> koristi se za konkretne odluke</span></p></div><p className="prototype-note">Ovo je funkcionalni prototip. Uneseni podaci se ne šalju Vesperi.</p></div>
      <form className="project-form" onSubmit={submit} aria-label="Priprema projekta kuhinje">
        {sent ? <div className="success-state" role="status"><Check size={46} aria-hidden="true" /><h3>Projekt je pripremljen.</h3><p>U stvarnoj verziji ovdje biste dobili potvrdu, popis pripremljenih podataka i očekivano vrijeme odgovora.</p><button type="button" className="button" onClick={() => setSent(false)}>Uredite podatke</button></div> : <>
          <fieldset><legend>1. Kakav raspored razmatrate?</legend><div className="choice-grid">{layouts.map((item) => <label key={item} className={layout === item ? 'choice selected' : 'choice'}><input type="radio" name="layout" value={item} checked={layout === item} onChange={() => setLayout(item)} /><span>{item}</span></label>)}</div></fieldset>
          <fieldset><legend>2. Koji je okvirni budžet?</legend><div className="choice-grid">{budgets.map((item) => <label key={item} className={budget === item ? 'choice selected' : 'choice'}><input type="radio" name="budget" value={item} checked={budget === item} onChange={() => setBudget(item)} /><span>{item}</span></label>)}</div></fieldset>
          <div className="field-grid"><label><span>Ime i prezime</span><input type="text" name="name" autoComplete="name" required /></label><label><span>Telefon</span><input type="tel" name="phone" autoComplete="tel" required /></label></div>
          <label><span>Što želite promijeniti u prostoru?</span><textarea name="message" rows={4} placeholder="Npr. treba mi više radne plohe i lakši pristup posuđu." /></label>
          <label className="file-field"><ImagePlus aria-hidden="true" /><span><strong>Dodajte fotografije ili skicu</strong><small>JPG, PNG ili PDF u stvarnoj verziji</small></span><input type="file" multiple accept="image/*,.pdf" /></label>
          <button className="button button-accent form-submit" type="submit"><Send aria-hidden="true" /> Pripremite projekt</button>
        </>}
      </form>
    </div></section>

    <section className="section container"><div className="kitchen-clarity"><div><p className="eyebrow">Bez nejasnih obećanja</p><h2>Što znači “po mjeri”?</h2><p>Mogućnosti ovise o odabranom kuhinjskom sustavu. Na ponudi treba jasno pisati koji su elementi standardni, što se konfigurira i gdje je moguća posebna prilagodba.</p></div><div className="clarity-list"><p><strong>Moduli</strong><span>Dostupne širine i rasporedi elemenata</span></p><p><strong>Materijali</strong><span>Fronte, korpusi, radne ploče i okovi</span></p><p><strong>Prilagodbe</strong><span>Završne stranice, ispune, visine i radna ploča</span></p><p><strong>Usluga</strong><span>Mjerenje, planiranje, dostava i montaža</span></p></div></div><Link className="text-link back-link" href="/"><ArrowLeft aria-hidden="true" /> Natrag na početnu</Link></section>
  </main></PageShell>;
}
