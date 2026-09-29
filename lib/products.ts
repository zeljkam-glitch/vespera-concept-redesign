export type CatalogProduct = {
  slug: string;
  name: string;
  type: string;
  room: 'Dnevni boravak' | 'Spavaća soba' | 'Kuhinja';
  dimensions: string;
  regularPrice?: string;
  price: string;
  discount?: string;
  image: string;
  status: 'Na zalihi' | 'Po narudžbi' | 'Izložbeni primjerak' | 'Provjerite dostupnost';
  features: string[];
  href?: string;
};

export const catalogProducts: CatalogProduct[] = [
  {
    slug: 'manila',
    name: 'Manila',
    type: 'Kutna garnitura',
    room: 'Dnevni boravak',
    dimensions: '240 × 175 cm',
    regularPrice: '1.440,00 €',
    price: '1.152,00 €',
    discount: '−20%',
    image: 'https://vespera.hr/wp-content/uploads/2026/07/1781691780_1781690676836_edit_338493474214675.png',
    status: 'Provjerite dostupnost',
    features: ['pomoćni ležaj', 'spremnik', 'za manji prostor'],
    href: '/proizvod/manila',
  },
  {
    slug: 'soho',
    name: 'Soho',
    type: 'Kutna garnitura',
    room: 'Dnevni boravak',
    dimensions: '252 × 158 cm',
    regularPrice: '1.230,00 €',
    price: '984,00 €',
    discount: '−20%',
    image: 'https://vespera.hr/wp-content/uploads/2026/06/Soho_ambijent.jpg',
    status: 'Po narudžbi',
    features: ['pomoćni ležaj', 'spremnik', 'metalne nogice'],
  },
  {
    slug: 'monaco',
    name: 'Monaco',
    type: 'Kutna garnitura',
    room: 'Dnevni boravak',
    dimensions: '290 × 220 cm',
    regularPrice: '1.700,00 €',
    price: '1.275,00 €',
    discount: '−25%',
    image: 'https://vespera.hr/wp-content/uploads/2026/06/Monaco_sastav02_dd822400.jpg',
    status: 'Izložbeni primjerak',
    features: ['ležaj', 'spremnik', 'vodoodbojna tkanina'],
  },
  {
    slug: 'crafter',
    name: 'Crafter',
    type: 'Boxspring krevet',
    room: 'Spavaća soba',
    dimensions: '140, 180 ili 200 × 200 cm',
    regularPrice: '1.890,00 €',
    price: '1.512,00 €',
    discount: '−20%',
    image: 'https://vespera.hr/wp-content/uploads/2026/08/crafterkrevet_4-1140x641.jpg',
    status: 'Po narudžbi',
    features: ['više dimenzija', 'više boja tkanine', 'boxspring sustav'],
  },
  {
    slug: 'lotos',
    name: 'Lotos',
    type: 'Tapecirani krevet',
    room: 'Spavaća soba',
    dimensions: '180 × 200 cm',
    regularPrice: '1.150,00 €',
    price: '920,00 €',
    discount: '−20%',
    image: 'https://vespera.hr/wp-content/uploads/2023/02/lotos-krevet-1170x707.png',
    status: 'Provjerite dostupnost',
    features: ['spremnik', 'tapecirano uzglavlje', 'bračni krevet'],
  },
  {
    slug: 'remi',
    name: 'Remi',
    type: 'Krevet',
    room: 'Spavaća soba',
    dimensions: 'više dimenzija',
    regularPrice: '1.100,00 €',
    price: '825,00 €',
    discount: '−25%',
    image: 'https://vespera.hr/wp-content/uploads/2026/04/remi-1140x1140.jpg',
    status: 'Provjerite dostupnost',
    features: ['više dimenzija', 'tapecirano uzglavlje', 'više boja'],
  },
  {
    slug: 'valencia',
    name: 'Valencia',
    type: 'Blok kuhinja',
    room: 'Kuhinja',
    dimensions: '200 cm',
    regularPrice: '880,00 €',
    price: '792,00 €',
    discount: '−10%',
    image: 'https://vespera.hr/wp-content/uploads/2023/09/valencia-siva.jpg',
    status: 'Po narudžbi',
    features: ['artisan hrast', 'grafit siva ili bijela', 'blok kuhinja'],
  },
  {
    slug: 'savona',
    name: 'Savona',
    type: 'Blok kuhinja',
    room: 'Kuhinja',
    dimensions: '180 cm',
    regularPrice: '538,00 €',
    price: '430,40 €',
    discount: '−20%',
    image: 'https://vespera.hr/wp-content/uploads/2026/06/savona.jpg',
    status: 'Po narudžbi',
    features: ['artisan hrast', 'bijela mat', 'blok kuhinja'],
  },
  {
    slug: 'drina',
    name: 'Drina',
    type: 'Blok kuhinja',
    room: 'Kuhinja',
    dimensions: '180 cm',
    regularPrice: '819,00 €',
    price: '655,20 €',
    discount: '−20%',
    image: 'https://vespera.hr/wp-content/uploads/2026/06/drina-180.jpg',
    status: 'Po narudžbi',
    features: ['pijesak lak', 'bijela mat', 'blok kuhinja'],
  },
];

export const roomLinks = [
  { name: 'Dnevni boravak', description: 'Garniture, trosjedi, fotelje, regali i klub stolići', href: '/namjestaj?prostorija=Dnevni+boravak' },
  { name: 'Spavaća soba', description: 'Kreveti, madraci, ormari, podnice i komode', href: '/namjestaj?prostorija=Spavaća+soba' },
  { name: 'Kuhinja', description: 'Kuhinje po mjeri i gotovi blokovi', href: '/namjestaj?prostorija=Kuhinja' },
  { name: 'Blagovaonica', description: 'Stolovi, stolice i kompleti za svakodnevni život', href: '/namjestaj?q=stolice' },
  { name: 'Predsoblje', description: 'Cipelari, ormari, vješalice i ogledala', href: '/namjestaj?q=predsoblje' },
  { name: 'Ured i radna soba', description: 'Radni stolovi, uredske stolice i odlaganje', href: '/namjestaj?q=ured' },
];
