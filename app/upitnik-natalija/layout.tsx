import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vespera, upitnik za razgovor s vlasnicom',
  description: 'Radni upitnik Salty Brand Studija za dovršetak Vesperina digitalnog i vizualnog redizajna.',
};

export default function QuestionnaireLayout({ children }: { children: React.ReactNode }) {
  return children;
}
