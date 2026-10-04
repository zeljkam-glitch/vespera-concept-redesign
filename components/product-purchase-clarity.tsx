import type { CatalogProduct } from '@/lib/products';

const statusDescriptions: Record<CatalogProduct['status'], string> = {
  'Na zalihi': 'Proizvod je prema posljednjoj informaciji dostupan u Vesperi. Status ne rezervira proizvod i može se promijeniti prije sljedećeg ažuriranja.',
  'Po narudžbi': 'Proizvod nije spreman za trenutno preuzimanje. Dobavljivost odabrane izvedbe i očekivani rok potvrđuju se prije narudžbe.',
  'Izložbeni primjerak': 'Prodaje se konkretan primjerak iz salona. Stanje proizvoda, jamstvo, preuzimanje i dostavu provjerite prije kupnje.',
  'Provjerite dostupnost': 'Dostupnost još nije potvrđena. Nazovite salon prije dolaska ili odluke o kupnji.',
};

type ProductPurchaseClarityProps = {
  status: CatalogProduct['status'];
  hasDiscount?: boolean;
};

export function ProductPurchaseClarity({ status, hasDiscount = false }: ProductPurchaseClarityProps) {
  return <section className="container purchase-clarity" aria-labelledby="purchase-clarity-title">
    <div className="purchase-clarity-head"><p className="eyebrow">Bez pretpostavki</p><h2 id="purchase-clarity-title">Prije odluke provjerite četiri stvari.</h2><p>Podaci na webu pomažu odabiru. Konačna izvedba, cijena, dostupnost i usluge vrijede kada su navedeni na pisanoj ponudi Vespere.</p></div>
    <div className="purchase-clarity-grid">
      <article><span>01</span><h3>Na što se odnosi cijena?</h3><p>Na model i osnovnu ili prikazanu izvedbu opisanu na stranici. Druga dimenzija, boja, tkanina, materijal ili dodatna oprema mogu promijeniti cijenu.</p></article>
      <article><span>02</span><h3>Što cijena ne podrazumijeva?</h3><p>Dostava, unos, montaža, odvoz, uređaji i dekoracije uključeni su samo kada su izričito navedeni uz proizvod ili na pisanoj ponudi.</p></article>
      <article><span>03</span><h3>Što znači “{status}”?</h3><p>{statusDescriptions[status]}</p></article>
      <article><span>04</span><h3>{hasDiscount ? 'Koliko traje akcija?' : 'Kada proizvod stiže?'}</h3><p>{hasDiscount ? 'Datum početka i završetka akcije te raspoloživa količina moraju biti navedeni uz konačnu objavu. Demo cijena na ovom konceptu nije prodajna ponuda.' : 'Za proizvod po narudžbi salon potvrđuje dobavljivost, odabranu izvedbu i očekivani rok te ih navodi na pisanoj ponudi.'}</p></article>
    </div>
  </section>;
}
