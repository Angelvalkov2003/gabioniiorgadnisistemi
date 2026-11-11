import type { Metadata, Viewport } from "next";
import { Onest, Unbounded } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { siteUrl, indexable, localBusinessLd, websiteLd, defaultKeywords, defaultOgImage } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCall from "@/components/StickyCall";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";

const onest = Onest({ subsets: ["latin", "cyrillic"], variable: "--font-onest", display: "swap" });
const unbounded = Unbounded({ subsets: ["latin", "cyrillic"], weight: ["500", "700"], variable: "--font-unbounded", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `Габиони и оградни системи – ${site.brandBg} | ${site.brand}`, template: `%s | ${site.brandBg}` },
  description: `${site.brandBg} (${site.brand}) – габиони, габионни огради, подпорни стени и оградни системи с монтаж. Цени от 20 €. София, Пловдив, Пазарджик, Велинград, Перник, Асеновград, Карлово.`,
  keywords: defaultKeywords,
  applicationName: site.brandBg,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  robots: indexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: site.brandBg,
    title: `Габиони и оградни системи – ${site.brandBg}`,
    description: `${site.brandBg} – габиони, подпорни стени и огради с монтаж. Цени от 20 €. Безплатен оглед.`,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Габиони и оградни системи | ${site.brandBg}`,
    description: `${site.brandBg} – габиони, подпорни стени и огради с монтаж. Цени от 20 €.`,
    images: [defaultOgImage.url],
  },
  verification: { google: "ca5f9f94a5038cb9" },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = { themeColor: "#628832", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${onest.variable} ${unbounded.variable}`}>
      <body className="min-h-screen pb-16 md:pb-0">
        <JsonLd data={localBusinessLd()} />
        <JsonLd data={websiteLd()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCall />
        <Analytics />
      </body>
    </html>
  );
}
