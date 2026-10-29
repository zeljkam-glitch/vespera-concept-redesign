const aiLifestyleImages: Record<string, string> = {
  crafter: '/generated/crafter-carousel-ai-modified.jpg',
  lotos: '/generated/lotos-carousel-ai-modified.jpg',
  remi: '/generated/remi-carousel-ai-modified.jpg',
  kent: '/generated/kent-carousel-ai-modified.jpg',
  canon: '/generated/canon-carousel-ai-modified.jpg',
  sardinia: '/generated/sardinia-carousel-ai-modified.jpg',
};

export function getAiLifestyleImage(slug: string) {
  return aiLifestyleImages[slug];
}

export const saleShowcaseSlugs = ['crafter', 'lotos', 'remi'];
export const featuredModelSlugs = ['kent', 'canon', 'sardinia'];
