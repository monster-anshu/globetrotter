import type { Metadata } from 'next';
import { Archivo, Sour_Gummy } from 'next/font/google';
import './globals.css';

const sansFont = Sour_Gummy({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Globetrotter',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sansFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
