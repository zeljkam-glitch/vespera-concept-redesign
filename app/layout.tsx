import type { Metadata } from 'next';
import { Geist, Lora } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vespera konceptualni redizajn — Salty Brand Studio',
  description: 'Mobile-first UX i accessibility koncept za pristupačniju kupnju namještaja.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body
        className={`${geistSans.variable} ${lora.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
