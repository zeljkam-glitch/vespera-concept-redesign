# Vespera Content OS — design QA

Datum provjere: 17. listopada 2026.

## Referenca

- Odabrani smjer: treći koncept, urednički vođen radni proces.
- Izvorni mockup: `/Users/zeljkamikulcic/.codex/generated_images/01a148c8-e3c2-7ac3-b38e-a7101670e58b/exec-431382e6-c0fd-40e3-8151-bfd577550f90.png`
- Implementacija: `http://127.0.0.1:4173/content-os`

## Provjerene površine

- **Raspored:** stalna lijeva navigacija na desktopu, vođeni koraci u zaglavlju, glavni radni prostor, desni savjet i donja traka akcija odgovaraju odabranom smjeru.
- **Tipografija:** veliki serifni naslovi i čitljiv sans-serif za operativne upute održavaju urednički karakter reference.
- **Boje:** topla krem podloga, crna tipografija, prigušena crvena za oznake i žuta za aktivna stanja i glavne akcije.
- **Razmaci:** sadržaj ostaje pregledan na 1440 × 1024; radna kartica, primjeri kadrova i provjera snimanja ostaju jasna cjelina.
- **Responzivnost:** provjereno na 390 × 844; navigacija se otvara kao čitljiv bočni izbornik iznad sadržaja, koraci se pomiču vodoravno, a glavne akcije ostaju dostupne pri dnu.

## Funkcionalna provjera

- Navigacija između Danas, Plana, Odobrenja, Uputa i Rezultata.
- Odabir stavke iz tromjesečnog plana.
- Označavanje obaveznih kadrova.
- Uređivanje i kopiranje opisa i CTA-a.
- Slanje Nataliji na odobrenje i odobravanje objave.
- Spremanje statusa i rezultata u pregledniku.
- Mobilno otvaranje i zatvaranje izbornika.

## Ispravci nakon usporedbe

- Povećana vidljivost kontrolne liste u prvom desktop prikazu.
- Mobilni izbornik postavljen iznad radnog sadržaja i donje akcijske trake.
- Prva slika postavljena na prioritetno učitavanje radi uklanjanja LCP upozorenja.

## Druga iteracija — dashboard, edukacija i biblioteka

- Dashboard je postavljen kao početna površina s današnjim zadatkom, tjednim planom, statusima, odobrenjima i brzim akcijama.
- Vođeni proces iz odabranog trećeg koncepta zadržan je kao praktična edukacija i alat za izradu.
- Dodana je zasebna edukacija od pet kratkih lekcija s jasnim prijelazom na praktičnu vježbu.
- Dodana je biblioteka za sedam kategorija: fotelja, ormar, stolić, kauč/garnitura, kuhinja, komoda i krevet.
- Svaka kategorija ima Reel, karusel, fotografiju i Story: ukupno 28 gotovih recepata s ciljem, hookom, redoslijedom, predloškom teksta i CTA-om.
- Provjeren je put biblioteka → kuhinja → karusel → vođeni proces; odabrani primjer pravilno prenosi cilj, format, kadrove, tekst i CTA.
- Novi dashboard i edukacija provjereni su na 1440 × 1024 i 390 × 844.
- Tekstualna oznaka u zaglavlju zamijenjena je izvornim horizontalnim Vespera logotipom iz `/public/brand/vespera-logo-horizontal.svg`.
- Content OS sada koristi isti tipografski sustav kao web: Arial/Helvetica za naslove, tekst i kontrole, uz iste zbijene naslove i jače rezove.
- Logo i tipografija vizualno su provjereni na desktopu i mobitelu; izračunati font naslova potvrđen je kao `Arial, Helvetica, sans-serif`.
- Ekran Rezultati redizajniran je oko stvarnog procesa: objava, čekanje 48 sati, prepisivanje Meta Insights brojki i ručno označavanje konkretnih upita.
- Analitika se sada trajno sprema uz pojedinu objavu u lokalnom prototipu te se automatski zbraja u dosege, korisne reakcije, upite i najbolji format.
- Velike zelene i crvene plohe u pravilima tona zamijenjene su uredničkim prikazom glasa brenda, primjerom rečenice i numeriranim pravilima.
- Provjeren je unos probne analitike, prikaz zbroja na rezultatima i povrat podataka na nulu.
- U edukaciju je dodan četverodijelni vizualni vodič za Meta Insights: otvaranje Instagram objave, pronalazak gumba „Prikaži uvide”, prepisivanje četiri pokazatelja, Facebook Business Suite i povratak u Content OS.
- Vodič je vizualno provjeren na desktopu i mobitelu; označeni gumbi, brojke i upute ostaju čitljivi i u uskom prikazu.
- Dodan je centar „Ideje i inspiracija” s pet vrsta sadržaja, osam relevantnih tematskih područja, četiri Vesperine persone i sažetim pravilima tone of voicea.
- Generator kombinira cilj, personu, kategoriju namještaja i format te izrađuje hook, koncept, tekst, CTA i popis kadrova u Vesperinom tonu.
- Provjeren je put generator → nova varijacija → vođeni proces; odabrana persona, kategorija, format i sadržaj pravilno se prenose u izradu objave.
- Centar i generator provjereni su na 1440 × 1024 i 390 × 844.
- Dodana je kratka edukacija o dosegu, spremanjima, dijeljenjima, komentarima i konkretnim upitima, uz jasnu odluku što ponoviti nakon svake vrste rezultata.

## Rezultat

**Passed.** Implementacija je vizualno i funkcionalno usklađena s odabranim konceptom te je spremna za korisnički pregled.
