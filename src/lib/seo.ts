import type { Metadata } from "next";
import { site, cities, gabionTypes } from "@/config/site";
import type { Faq } from "@/content/services";

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || "http://localhost:3000").replace(/\/$/, "");

/** Production (вкл. Vercel) и собствен домейн се индексират. Preview и localhost – не. */
export const indexable =
  process.env.VERCEL_ENV === "production" ||
  (!!process.env.NEXT_PUBLIC_SITE_URL && !/localhost|127\.0\.0\.1/.test(siteUrl));

export const defaultOgImage = {
  url: "/images/gabionni-koloni-alu-ograda.webp",
  width: 1170,
  height: 875,
  alt: "Габионни колони и ограда – Vasko Group",
};

export const defaultKeywords = [
  "габиони",
  "габионни огради",
  "подпорни стени",
  "оградни системи",
  "изграждане на огради",
  "габиони цена",
  "габиони монтаж",
  "габиони София",
  "габиони Пловдив",
  "габиони Пазарджик",
  "ламелни огради",
  "3D пана",
  "механизация изкопи",
];

export function pageMeta({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const kw = keywords?.length ? keywords : defaultKeywords;
  return {
    title,
    description,
    keywords: kw,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: "bg_BG",
      siteName: site.brand,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
    },
  };
}

export const businessId = `${siteUrl}/#business`;

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": businessId,
    name: site.brand,
    alternateName: "Габиони и оградни системи",
    description:
      "Габиони, габионни огради, подпорни стени, оградни системи и изграждане на огради с монтаж в София, Пловдив, Пазарджик и региона.",
    url: siteUrl,
    telephone: site.phoneE164,
    email: site.email,
    image: `${siteUrl}${defaultOgImage.url}`,
    logo: `${siteUrl}/images/logo.webp`,
    priceRange: `${Math.min(...gabionTypes.map((g) => g.price))}–${Math.max(...gabionTypes.map((g) => g.price))} €`,
    address: { "@type": "PostalAddress", addressLocality: site.addressLocality, addressCountry: site.country },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: site.hours.days, opens: site.hours.opens, closes: site.hours.closes },
    ],
    areaServed: cities.map((c) => ({ "@type": "City", name: c.name })),
    knowsAbout: [
      "габиони",
      "габионни огради",
      "подпорни стени от габиони",
      "оградни системи",
      "ламелни огради",
      "изкопни работи",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Габиони и услуги",
      itemListElement: [
        ...gabionTypes.map((g) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: g.label },
          price: g.price,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        })),
        ...["Габионни огради", "Подпорни стени", "Оградни системи", "Изграждане на огради", "Механизация"].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      ],
    },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.brand} – габиони и оградни системи`,
    url: siteUrl,
    inLanguage: "bg-BG",
    publisher: { "@id": businessId },
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
    serviceType: name,
  };
}

export function faqLd(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Начало", item: siteUrl },
      ...items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: it.name,
        ...(it.path ? { item: `${siteUrl}${it.path}` } : {}),
      })),
    ],
  };
}
