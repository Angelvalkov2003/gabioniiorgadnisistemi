import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, ContactSection } from "@/components/sections";
import { CtaRow, Section } from "@/components/ui";
import { cities } from "@/config/site";
import { cityContent } from "@/content/cities";
import { breadcrumbLd, pageMeta, siteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Габиони по градове – София, Пловдив, Пазарджик и още",
  description:
    "Габиони и огради с монтаж в София, Пловдив, Пазарджик, Велинград, Перник, Асеновград и Карлово. Цени от 20 €, безплатен оглед.",
  path: "/gradove",
  keywords: [
    "габиони София",
    "габиони Пловдив",
    "габиони Пазарджик",
    "габиони Велинград",
    "габиони Перник",
    "габиони Асеновград",
    "габиони Карлово",
    "габиони",
    "габионни огради",
  ],
});

export default function CitiesIndexPage() {
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Габиони по градове",
    itemListElement: cities.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Габиони ${c.name}`,
      url: `${siteUrl}/gradove/${c.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={listLd} />
      <JsonLd data={breadcrumbLd([{ name: "Градове", path: "/gradove" }])} />
      <Breadcrumbs items={[{ name: "Градове" }]} />

      <Section
        title="Габиони по градове"
        lead="Изберете града – ще намерите цени, услуги и населените места, които обслужваме наоколо."
      >
        <ul className="divide-y divide-line rounded-2xl border border-line">
          {cities.map((c) => {
            const content = cityContent[c.slug];
            return (
              <li key={c.slug}>
                <Link href={`/gradove/${c.slug}`} className="block px-5 py-5 hover:bg-mist sm:px-6">
                  <span className="font-display text-lg font-bold text-forest">Габиони {c.name}</span>
                  <span className="mt-1 block text-stone">{content.intro}</span>
                  <span className="mt-2 inline-block text-sm font-semibold text-green">Вижте габиони {c.inName} →</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <CtaRow className="mt-10" />
      </Section>

      <ContactSection title="Запитване за габиони и огради" />
    </>
  );
}
