import type { Metadata } from 'next';
import { site } from './site-data';
import './globals.css';
import './contact-form.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'South Florida Real Estate | Barbara B.M. Real Estate',
    template: '%s | Barbara B.M. Real Estate',
  },
  description: 'Buy or sell a home in South Florida with personal real estate guidance in Wellington, West Palm Beach, Fort Lauderdale, and Miami.',
  keywords: ['South Florida real estate', 'Wellington real estate agent', 'West Palm Beach homes', 'Fort Lauderdale real estate', 'Miami homes for sale'],
  alternates: {
    canonical: '/',
    languages: { 'en-US': '/', 'es-US': '/es' },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'South Florida Real Estate | Barbara B.M. Real Estate',
    description: 'Personal guidance for buyers and sellers in Wellington, West Palm Beach, Fort Lauderdale, and Miami.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_US'],
    url: '/',
    images: [{ url: '/hero-home.png', width: 1920, height: 1024 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'South Florida Real Estate | Barbara B.M. Real Estate',
    description: 'Personal real estate guidance across Wellington, West Palm Beach, Fort Lauderdale, and Miami.',
    images: ['/hero-home.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
