import type { Metadata, Viewport } from "next";
import { Onest, Unbounded } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { siteUrl, indexable, localBusinessLd } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCall from "@/components/StickyCall";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";

const onest = Onest({ subsets: ["latin", "cyrillic"], variable: "--font-onest", display: "swap" });
const unbounded = Unbounded({ subsets: ["latin", "cyrillic"], weight: ["500", "700"], variable: "--font-unbounded", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `Габиони и оградни системи – цени и монтаж | ${site.brand}`, template: `%s | ${site.brand}` },
  description:
    "Габиони, подпорни стени, оградни системи и изграждане на огради. Цени на габиони от 20 €. София, Пловдив, Пазарджик, Велинград, Перник, Асеновград, Карлово.",
  applicationName: site.brand,
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: { type: "website", locale: "bg_BG", siteName: site.brand },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = { themeColor: "#628832", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${onest.variable} ${unbounded.variable}`}>
      <body className="min-h-screen pb-16 md:pb-0">
        <JsonLd data={localBusinessLd()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCall />
        <Analytics />
      </body>
    </html>
  );
}
