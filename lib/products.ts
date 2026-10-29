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
  sourceUrl?: string;
  sourceNote?: string;
};

const sourceCheckedAt = '29. 10. 2026.';

function bed(product: Omit<CatalogProduct, 'room' | 'status'>): CatalogProduct {
  return { ...product, room: 'Spavaća soba', status: 'Provjerite dostupnost' };
}

// Podaci su prepisani iz javne kategorije KREVETI na vespera.hr na datum sourceCheckedAt.
// Namjerno nema regularPrice/discount vrijednosti: javni izvor ne potvrđuje da je navedena
// ranija cijena zakonita referentna cijena (najniža cijena u prethodnih 30 dana).
export const catalogProducts: CatalogProduct[] = [
  bed({ slug: 'crafter', name: 'Crafter', type: 'Boxspring krevet', dimensions: '200 × 160 cm', price: '1.512,00 €', image: 'https://vespera.hr/wp-content/uploads/2026/08/crafterkrevet_0-300x300.jpg', features: ['dostupne dimenzije 140 × 200, 180 × 200 i 200 × 200 cm', 'različite boje tkanine'], sourceUrl: 'https://vespera.hr/archives/9887' }),
  bed({ slug: 'enzo', name: 'Enzo', type: 'Boxspring krevet', dimensions: '200 × 160 cm', price: '1.312,00 €', image: 'https://vespera.hr/wp-content/uploads/2026/04/enzo-novi-300x300.jpg', features: ['dostupne dimenzije 140 × 200, 180 × 200 i 200 × 200 cm', 'različite boje i uzorci materijala'], sourceUrl: 'https://vespera.hr/archives/9721' }),
  bed({ slug: 'lotos', name: 'Lotos', type: 'Krevet', dimensions: '200 × 160 cm', price: '920,00 €', image: 'https://vespera.hr/wp-content/uploads/2023/02/lotos-krevet.png', features: ['dostupan i u dimenziji 200 × 180 cm'], sourceUrl: 'https://vespera.hr/archives/9707' }),
  bed({ slug: 'cruz', name: 'Cruz', type: 'Krevet', dimensions: '200 × 160 cm', price: '888,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/01/cruz-300x300.jpg', features: ['na podizanje', 'bez madraca', 'dostupne dimenzije 200 × 140 i 200 × 180 cm', 'različite boje tkanina'], sourceUrl: 'https://vespera.hr/archives/9705' }),
  bed({ slug: 'remi', name: 'Remi', type: 'Krevet', dimensions: '200 × 160 cm', price: '825,00 €', image: 'https://vespera.hr/wp-content/uploads/2026/04/remi-300x300.jpg', features: ['na podizanje', 'integrirani madrac', 'plava i siva boja'], sourceUrl: 'https://vespera.hr/archives/9703' }),
  bed({ slug: 'marshall', name: 'Marshall', type: 'Boxspring krevet', dimensions: '200 × 160 cm', price: '1.384,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/05/marshall-nova-300x300.jpg', features: ['dostupne dimenzije 140 × 200, 180 × 200 i 200 × 200 cm', 'različite boje tkanine'], sourceUrl: 'https://vespera.hr/archives/9701' }),
  bed({ slug: 'como', name: 'Como', type: 'Boxspring krevet', dimensions: '200 × 160 cm', price: '1.096,00 €', image: 'https://vespera.hr/wp-content/uploads/2026/04/como-pic-300x300.jpg', features: ['dostupne dimenzije 140 × 200, 180 × 200 i 200 × 200 cm', 'različite boje tkanine'], sourceUrl: 'https://vespera.hr/archives/9699' }),
  bed({ slug: 'melby', name: 'Melby', type: 'Boxspring krevet', dimensions: '200 × 160 cm', price: '1.112,00 €', image: 'https://vespera.hr/wp-content/uploads/2023/06/melby-krevet-300x300.jpg', features: ['dostupne dimenzije 120 × 200, 140 × 200, 180 × 200 i 200 × 200 cm', 'različite boje tkanine'], sourceUrl: 'https://vespera.hr/archives/9697' }),
  bed({ slug: 'marbella', name: 'Marbella', type: 'Boxspring krevet', dimensions: '200 × 160 cm', price: '1.312,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/05/nova-marbella-300x300.jpg', features: ['dostupne dimenzije 140 × 200, 180 × 200 i 200 × 200 cm', 'različite boje tkanine'], sourceUrl: 'https://vespera.hr/archives/9694' }),
  bed({ slug: 'allure', name: 'Allure', type: 'Boxspring krevet', dimensions: '200 × 160 cm', price: '1.386,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/01/allure-300x300.jpg', features: ['dostupne dimenzije 140 × 200, 180 × 200 i 200 × 200 cm', 'različite boje tkanine'], sourceUrl: 'https://vespera.hr/archives/9692' }),
  bed({ slug: 'oxford', name: 'Oxford', type: 'Boxspring krevet', dimensions: '200 × 160 cm', price: '1.392,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/03/oxfordweb-300x300.jpg', features: ['dostupne dimenzije 140 × 200, 180 × 200 i 200 × 200 cm', 'različite boje tkanine'], sourceUrl: 'https://vespera.hr/archives/9690' }),
  bed({ slug: 'oscar', name: 'Oscar', type: 'Boxspring krevet', dimensions: '200 × 160 cm', price: '1.312,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/08/novi-oscar-slika-300x300.jpg', features: ['dostupne dimenzije 140 × 200, 180 × 200 i 200 × 200 cm', 'različite boje tkanine'], sourceUrl: 'https://vespera.hr/archives/9688' }),
  bed({ slug: 'vertigo', name: 'Vertigo', type: 'Boxspring krevet', dimensions: '200 × 160 cm', price: '1.432,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/09/vertigokrevet_0450-300x300.jpg', features: ['dostupne dimenzije 140 × 200, 180 × 200 i 200 × 200 cm', 'različite boje tkanine'], sourceUrl: 'https://vespera.hr/archives/9686', sourceNote: 'Izvor navodi postotak sniženja koji nije matematički usklađen s objavljenim cijenama; postotak nije prenesen.' }),
  bed({ slug: 'castelo', name: 'Castelo', type: 'Boxspring krevet', dimensions: '200 × 160 cm', price: '1.027,20 €', image: 'https://vespera.hr/wp-content/uploads/2026/03/castelostranica_0-300x300.jpg', features: ['dostupne dimenzije 140 × 200, 180 × 200 i 200 × 200 cm', 'različite boje tkanine'], sourceUrl: 'https://vespera.hr/archives/9684' }),
  bed({ slug: 'bosco', name: 'Bosco', type: 'Boxspring krevet', dimensions: '200 × 180 cm', price: '1.135,20 €', image: 'https://vespera.hr/wp-content/uploads/2026/03/boscostranicaa_-300x300.jpg', features: ['dostupne dimenzije 140 × 200, 160 × 200 i 200 × 200 cm', 'različite boje tkanine'], sourceUrl: 'https://vespera.hr/archives/9682', sourceNote: 'Izvor sadrži tipografsku pogrešku u jednoj od ranijih cijena; prenesena je nedvosmisleno objavljena cijena 1.135,20 €.' }),
  bed({ slug: 'kent', name: 'Kent', type: 'Krevet', dimensions: '200 × 160 cm', price: '230,00 €', image: 'https://vespera.hr/wp-content/uploads/2016/05/krevet-Kent.jpg', features: ['bijeli hrast', 'sivi hrast'], sourceUrl: 'https://vespera.hr/archives/9743' }),
  bed({ slug: 'canon', name: 'Canon', type: 'Krevet', dimensions: '200 × 160 cm', price: '316,00 €', image: 'https://vespera.hr/wp-content/uploads/2022/10/canon.jpg', features: ['sivi hrast', 'tapecirano uzglavlje'], sourceUrl: 'https://vespera.hr/archives/9741' }),
  bed({ slug: 'sardinia', name: 'Sardinia', type: 'Krevet', dimensions: '200 × 160 ili 200 × 180 cm', price: 'od 340,00 €', image: 'https://vespera.hr/wp-content/uploads/2020/06/Sardinia-krevet.jpg', features: ['200 × 160 cm: 340,00 €', '200 × 180 cm: 363,00 €', 'artisan hrast', 'tkanina PR'], sourceUrl: 'https://vespera.hr/archives/9739' }),
  bed({ slug: 'aleria', name: 'Aleria', type: 'Krevet', dimensions: '200 × 160 cm', price: '240,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/09/aleria-bijela-300x300.jpg', features: ['bijela boja'], sourceUrl: 'https://vespera.hr/archives/9737' }),
  bed({ slug: 'barletta', name: 'Barletta', type: 'Krevet', dimensions: '200 × 120 cm', price: '260,00 €', image: 'https://vespera.hr/wp-content/uploads/2024/01/barletta-300x300.jpg', features: ['artisan hrast sa sivom tkaninom', 'sivi hrast sa sivom tkaninom'], sourceUrl: 'https://vespera.hr/archives/9735' }),
  bed({ slug: 'orlando', name: 'Orlando', type: 'Krevet', dimensions: 'od 200 × 120 cm', price: '548,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/02/Orlando.fw_-300x300.jpg', features: ['na podizanje', 'kutija za pohranu', 'dostupne dimenzije 200 × 120, 200 × 140, 200 × 160 i 200 × 180 cm', 'različite boje i uzorci materijala'], sourceUrl: 'https://vespera.hr/archives/9727', sourceNote: 'Objavljena cijena odnosi se na dimenziju 200 × 120 cm.' }),
  bed({ slug: 'kiki', name: 'Kiki', type: 'Boxspring krevet', dimensions: '200 × 140 cm', price: '696,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/09/krevet-kiki-300x300.jpg', features: ['nadmadrac', 'kutija za posteljinu', 'različite boje i uzorci materijala'], sourceUrl: 'https://vespera.hr/archives/9725' }),
  bed({ slug: 'dream', name: 'Dream', type: 'Krevet', dimensions: '200 × 80 cm', price: '588,00 €', image: 'https://vespera.hr/wp-content/uploads/2024/08/dream2.jpg', features: ['dostupan i u dimenziji 200 × 90 cm', 'mogućnost spajanja u bračni krevet', 'različite boje i uzorci materijala'], sourceUrl: 'https://vespera.hr/archives/9723' }),
  bed({ slug: 'violeta-90', name: 'Violeta 90', type: 'Krevet', dimensions: '200 × 90 cm', price: '242,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/01/violeta-natur-300x300.jpg', features: ['s podnicom', 'drvo masiv', 'boja bukve, trešnje ili bijela'], sourceUrl: 'https://vespera.hr/archives/9755' }),
  bed({ slug: 'lux-afrodita-90', name: 'Lux Afrodita 90', type: 'Krevet', dimensions: '200 × 90 cm', price: '240,00 €', image: 'https://vespera.hr/wp-content/uploads/2019/05/lux-afrodita-20090.jpg', features: ['s podnicom', 'drvo masiv', 'boja bukve, trešnje ili bijela'], sourceUrl: 'https://vespera.hr/archives/9753', sourceNote: 'Naslov objave navodi Lux Afrodita 90, dok opis proizvoda navodi Lara. Naziv treba potvrditi u salonu.' }),
  bed({ slug: 'lara-90', name: 'Lara 90', type: 'Krevet', dimensions: '200 × 90 cm', price: '240,00 €', image: 'https://vespera.hr/wp-content/uploads/2019/05/lara-20090.jpg', features: ['s podnicom', 'drvo masiv', 'boja bukve, trešnje ili bijela'], sourceUrl: 'https://vespera.hr/archives/9751' }),
  bed({ slug: 'lux-afrodita-160', name: 'Lux Afrodita 160', type: 'Krevet', dimensions: '200 × 160 cm', price: '498,00 €', image: 'https://vespera.hr/wp-content/uploads/2016/05/636167895571799353.jpg', features: ['s podnicom', 'dostupne dimenzije 200 × 90, 200 × 120, 200 × 140 i 200 × 180 cm', 'drvo masiv', 'boja bukve, trešnje ili bijela'], sourceUrl: 'https://vespera.hr/archives/9749' }),
  bed({ slug: 'lara-160', name: 'Lara 160', type: 'Krevet', dimensions: '200 × 160 cm', price: '440,00 €', image: 'https://vespera.hr/wp-content/uploads/2016/05/636162768169746126.jpg', features: ['s podnicom', 'dostupne dimenzije 200 × 90, 200 × 120, 200 × 140 i 200 × 180 cm', 'drvo masiv', 'boja bukve, trešnje ili bijela'], sourceUrl: 'https://vespera.hr/archives/9747' }),
  bed({ slug: 'violeta-160', name: 'Violeta 160', type: 'Krevet', dimensions: '200 × 160 cm', price: '435,33 €', image: 'https://vespera.hr/wp-content/uploads/2016/05/635079278625906085.jpg', features: ['s podnicom', 'dostupne dimenzije 200 × 90, 200 × 120, 200 × 140 i 200 × 180 cm', 'drvo masiv', 'boja bukve, trešnje ili bijela'], sourceUrl: 'https://vespera.hr/archives/9745' }),
  bed({ slug: 'samac', name: 'Samac', type: 'Tapecirani krevet', dimensions: '200 × 90 cm', price: '435,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/09/krevet-samac-300x300.jpg', features: ['sanduk za posteljinu', 'razne boje'], sourceUrl: 'https://vespera.hr/archives/9733' }),
  bed({ slug: 'sara', name: 'Sara', type: 'Krevet', dimensions: '200 × 140 cm', price: '510,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/09/krevet-sara-300x300.jpg', features: ['kutija za posteljinu', 'madrac žičane jezgre', 'dostupan i u dimenzijama 200 × 160 i 200 × 180 cm', 'različite boje i tkanine'], sourceUrl: 'https://vespera.hr/archives/9731' }),
  bed({ slug: 'san', name: 'San', type: 'Krevet', dimensions: '200 × 150 cm', price: '490,00 €', image: 'https://vespera.hr/wp-content/uploads/2025/09/krevet-san-web-300x300.jpg', features: ['kutija za posteljinu', 'madrac žičane jezgre', 'različite boje i tkanine'], sourceUrl: 'https://vespera.hr/archives/9729' }),
];

export const catalogSourceNote = `Javno dostupni podaci provjereni su na vespera.hr ${sourceCheckedAt} Dostupnost, konačnu izvedbu i cijenu potrebno je potvrditi u salonu.`;

export const roomLinks = [
  { name: 'Dnevni boravak', description: 'Garniture, trosjedi, fotelje, regali i klub stolići', href: '/namjestaj?prostorija=Dnevni+boravak' },
  { name: 'Spavaća soba', description: 'Kreveti iz javno objavljenog Vespera kataloga', href: '/namjestaj?prostorija=Spavaća+soba' },
  { name: 'Kuhinja', description: 'Kuhinje po mjeri i gotovi blokovi', href: '/kuhinje' },
  { name: 'Blagovaonica', description: 'Stolovi, stolice i kompleti za svakodnevni život', href: '/namjestaj?q=stolice' },
  { name: 'Predsoblje', description: 'Cipelari, ormari, vješalice i ogledala', href: '/namjestaj?q=predsoblje' },
  { name: 'Ured i radna soba', description: 'Radni stolovi, uredske stolice i odlaganje', href: '/namjestaj?q=ured' },
];

export const categoryGroups = [
  { name: 'Spavaća soba', href: '/namjestaj?prostorija=Spavaća+soba', categories: ['Kreveti', 'Boxspring kreveti', 'Tapecirani kreveti'] },
];
