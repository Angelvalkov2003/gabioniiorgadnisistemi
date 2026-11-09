import type { Metadata } from "next";
import { site, cities, gabionTypes } from "@/config/site";
import type { Faq } from "@/content/services";

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || "http://localhost:3000").replace(/\/$/, "");

/** Индексира се само на собствен домейн (не *.vercel.app / localhost). */
export const indexable = !/vercel\.app|localhost/.test(siteUrl);

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", locale: "bg_BG", siteName: site.brand },
  };
}

export const businessId = `${siteUrl}/#business`;

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": businessId,
    name: site.brand,
    description: "Габиони, подпорни стени, оградни системи и изграждане на огради.",
    url: siteUrl,
    telephone: site.phoneE164,
    email: site.email,
    image: `${siteUrl}/opengraph-image.jpg`,
    logo: `${siteUrl}/images/logo.webp`,
    priceRange: `${Math.min(...gabionTypes.map((g) => g.price))}–${Math.max(...gabionTypes.map((g) => g.price))} €`,
    address: { "@type": "PostalAddress", addressLocality: site.addressLocality, addressCountry: site.country },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: site.hours.days, opens: site.hours.opens, closes: site.hours.closes },
    ],
    areaServed: cities.map((c) => ({ "@type": "City", name: c.name })),
  };
}

export function serviceLd(name: string, description: string, path: string, area?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteUrl}${path}`,
    provider: { "@id": businessId },
    areaServed: area ? { "@type": "City", name: area } : cities.map((c) => ({ "@type": "City", name: c.name })),
  };
}

export function faqLd(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
