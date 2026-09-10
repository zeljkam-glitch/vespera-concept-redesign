import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vespera namještaj — konceptualni redizajn',
  description: 'Koncept digitalnog salona za aktualnu ponudu, garniture i planiranje kuhinja po mjeri.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body>
        {children}
      </body>
    </html>
  );
}
