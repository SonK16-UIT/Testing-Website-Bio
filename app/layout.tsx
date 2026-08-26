import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conny (@conny_ny) | Official Link in Bio & VTuber Hub",
  description: "Cozy streams, fun gaming highlights & sweet vibes! Welcome to Conny's official home page 🎀✨",
  keywords: ["Conny", "conny_ny", "vtuber_conny", "VTuber", "Streamer", "Link in Bio", "Gaming"],
  authors: [{ name: "Conny" }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '64x64' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Conny (@conny_ny) | Official Link in Bio & VTuber Hub",
    description: "Cozy streams, fun gaming highlights & sweet vibes! Welcome to Conny's official home page 🎀✨",
    url: "https://conny-bio.creator-bio.workers.dev",
    siteName: "Conny Official",
    images: [
      {
        url: "/avatar.png",
        width: 800,
        height: 800,
        alt: "Conny Avatar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conny (@conny_ny) | Official Link in Bio & VTuber Hub",
    description: "Cozy streams, fun gaming highlights & sweet vibes! Welcome to Conny's official home page 🎀✨",
    images: ["/avatar.png"],
  },
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="pink">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased selection:bg-[var(--primary-accent)] selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
