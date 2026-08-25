import type { Metadata, Viewport } from 'next';
import {
  Cormorant_Garamond,
  Shippori_Mincho,
  Zen_Kaku_Gothic_New,
} from 'next/font/google';
import './globals.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import JsonLd from '@/components/ui/JsonLd';
import { siteConfig } from '@/config/site';
import { localBusinessJsonLd, websiteJsonLd } from '@/lib/jsonld';

/* 欧文ディスプレイ（見出しの英字ラベル用） */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-cormorant',
  display: 'swap',
});

/* 和文本文 */
const zenKaku = Zen_Kaku_Gothic_New({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-zen-kaku',
  display: 'swap',
  preload: false,
});

/* 和文見出し（明朝で大人っぽさを出す） */
const shippori = Shippori_Mincho({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-shippori',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: '相模原のコンカフェ alouette｜小田急相模原駅から徒歩4分',
    template: '%s',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { telephone: false },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: [{ url: siteConfig.logoSquare }],
  },
  alternates: { canonical: siteConfig.url },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#6d1b36',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${cormorant.variable} ${zenKaku.variable} ${shippori.variable} antialiased`}
    >
      <body>
        {/* JS が無効でもコンテンツが読めるようにする（reveal は初期状態が透明のため） */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-bordeaux focus:px-5 focus:py-3 focus:text-ivory"
        >
          本文へスキップ
        </a>

        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
