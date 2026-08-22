import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://conny.vercel.app'),
  title: 'Conny (@conny_ny) | Official Link in Bio & VTuber Hub',
  description: 'Official link-in-bio for Conny (@conny_ny). Watch latest YouTube videos, Facebook fanpage updates, streams & join the cozy community!',
  keywords: ['Conny', 'conny_ny', 'VTuber', 'Gaming Creator', 'Link in Bio', 'YouTube Gaming', 'Facebook Fanpage'],
  authors: [{ name: 'Conny' }],
  openGraph: {
    title: 'Conny (@conny_ny) | Official Link in Bio',
    description: 'Official link-in-bio for Conny. Connect across YouTube, Facebook & Community Hubs.',
    type: 'website',
    images: [
      {
        url: '/avatar.png',
        width: 800,
        height: 800,
        alt: 'Conny Avatar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conny | Official Gaming & VTuber Hub',
    description: 'Connect with Conny on YouTube & Facebook Fanpage.',
    images: ['/avatar.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-bg text-brand-white min-h-screen selection:bg-brand-pink selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
