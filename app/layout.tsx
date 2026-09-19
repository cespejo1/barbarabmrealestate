import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://barbarabmrealestate.com'),
  title: 'Barbara B.M. Real Estate | South Florida Real Estate',
  description: 'Thoughtful guidance for buying and selling exceptional homes in South Florida.',
  openGraph: {
    title: 'Barbara B.M. Real Estate',
    description: 'Local insight. Personal service. A smarter way home.',
    type: 'website',
    images: [{ url: '/hero-home.png', width: 1920, height: 1024 }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
