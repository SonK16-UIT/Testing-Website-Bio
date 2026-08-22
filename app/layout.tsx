import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://shallred.vercel.app'),
  title: 'ShallRed | Official Link in Bio & Gaming Hub',
  description: 'Official link-in-bio for ShallRed (@ill_be_red / @shallred). Watch latest gaming videos on YouTube, TikTok clips, join the community & explore setup wishlist.',
  keywords: ['ShallRed', 'ill_be_red', 'Gaming Creator', 'Link in Bio', 'YouTube Gaming', 'TikTok Gaming'],
  authors: [{ name: 'ShallRed' }],
  openGraph: {
    title: 'ShallRed | Official Link in Bio',
    description: 'Official link-in-bio for ShallRed. Watch gaming videos, TikToks, and connect with the community.',
    type: 'website',
    images: [
      {
        url: '/avatar.png',
        width: 800,
        height: 800,
        alt: 'ShallRed Avatar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShallRed | Official Gaming Hub',
    description: 'Connect with ShallRed across YouTube, TikTok & Gaming networks.',
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
      <body className="bg-brand-bg text-brand-white min-h-screen selection:bg-brand-red selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
