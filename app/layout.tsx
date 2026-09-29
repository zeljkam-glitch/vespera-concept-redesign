import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vespera-concept-redesign.vercel.app';
const isOfficialSite = process.env.NEXT_PUBLIC_OFFICIAL_SITE === 'true';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Vespera namještaj | konceptualni redizajn',
  description: 'Koncept digitalnog salona za aktualnu ponudu, garniture i planiranje kuhinja po mjeri.',
  robots: isOfficialSite ? { index: true, follow: true } : { index: false, follow: false, noarchive: true },
  icons: { icon: '/favicon.svg' },
  openGraph: { locale: 'hr_HR', siteName: 'Vespera namještaj', type: 'website' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: 'Vespera namještaj',
    url: siteUrl,
    logo: `${siteUrl}/brand/vespera-logo-primary.svg`,
    telephone: '+38547645535',
    email: 'namjestaj@vespera.hr',
    address: { '@type': 'PostalAddress', streetAddress: 'Ulica Matka Laginje 1', postalCode: '47000', addressLocality: 'Karlovac', addressCountry: 'HR' },
    sameAs: ['https://www.facebook.com/vesperanamjestaj/photos/', 'https://www.instagram.com/vespera_namjestaj/'],
  };

  return (
    <html lang="hr">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        {children}
      </body>
    </html>
  );
}
