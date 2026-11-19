type CatalogCategory = {
  label: string;
  types: readonly string[];
  href?: string;
};

type CatalogGroup = {
  name: string;
  categories: readonly CatalogCategory[];
};

export const catalogGroups: readonly CatalogGroup[] = [
  { name: 'Kuhinja', categories: [
    { label: 'Kuhinje po mjeri', types: [], href: '/kuhinje' },
    { label: 'Blok kuhinje', types: ['Blok kuhinja', 'Blok kuhinje'] },
  ] },
  { name: 'Blagovaonica', categories: [
    { label: 'Stolovi', types: ['Stol', 'Stolovi', 'Blagovaonski stol'] },
    { label: 'Stolice', types: ['Stolica', 'Stolice', 'Blagovaonska stolica'] },
  ] },
  { name: 'Dnevni boravak', categories: [
    { label: 'Kutne garniture', types: ['Kutna garnitura', 'Kutne garniture'] },
    { label: 'TDF garniture', types: ['TDF garnitura', 'TDF garniture'] },
    { label: 'Regali', types: ['Regal', 'Regali'] },
    { label: 'TV elementi', types: ['TV element', 'TV elementi'] },
    { label: 'Komode', types: ['Komoda', 'Komode'] },
    { label: 'Trosjedi', types: ['Trosjed', 'Trosjedi'] },
    { label: 'Fotelje', types: ['Fotelja', 'Fotelje'] },
    { label: 'Klub stolovi', types: ['Klub stol', 'Klub stolić', 'Klub stolovi'] },
  ] },
  { name: 'Spavaća soba', categories: [
    { label: 'Spavaće sobe', types: ['Spavaća soba', 'Spavaće sobe'] },
    { label: 'Boxspring kreveti', types: ['Boxspring krevet', 'Boxspring kreveti'] },
    { label: 'Kreveti', types: ['Krevet', 'Kreveti', 'Tapecirani krevet', 'Tapecirani kreveti'] },
    { label: 'Ormari', types: ['Ormar', 'Ormari'] },
    { label: 'Madraci', types: ['Madrac', 'Madraci'] },
    { label: 'Podnice', types: ['Podnica', 'Podnice'] },
  ] },
  { name: 'Predsoblja', categories: [
    { label: 'Predsoblja', types: ['Predsoblje', 'Predsoblja'] },
    { label: 'Cipelari', types: ['Cipelar', 'Cipelari'] },
  ] },
  { name: 'Radna soba', categories: [
    { label: 'PC stolovi', types: ['PC stol', 'PC stolovi', 'Radni stol'] },
    { label: 'Uredske stolice', types: ['Uredska stolica', 'Uredske stolice'] },
  ] },
];

export function catalogHref(room: string, category?: CatalogCategory) {
  if (category?.href) return category.href;
  const params = new URLSearchParams({ prostorija: room });
  if (category) params.set('kategorija', category.label);
  return `/namjestaj?${params}`;
}
