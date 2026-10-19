import type { Metadata } from 'next';
import { ContentOS } from '@/components/content-os';

export const metadata: Metadata = {
  title: 'Vespera Content OS',
  description: 'Planiranje, produkcija, odobravanje i analiza Vesperina sadržaja.',
  robots: { index: false, follow: false },
};

export default function ContentOSPage() {
  return <ContentOS />;
}
