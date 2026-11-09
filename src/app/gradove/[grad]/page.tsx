import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Calculator from "@/components/Calculator";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, CitiesGrid, ContactSection, FaqList, Gallery } from "@/components/sections";
import { CtaRow, Section } from "@/components/ui";
import { cities, gabionTypes } from "@/config/site";
import { cityContent } from "@/content/cities";
import { services } from "@/content/services";
import { faqLd, pageMeta, serviceLd } from "@/lib/seo";

type Props = { params: Promise<{ grad: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => cities.map((c) => ({ grad: c.slug }));

const getCity = (slug: string) => cities.find((c) => c.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCity((await params).grad);
  if (!c) return {};
  return pageMeta({
    title: `Габиони и огради ${c.inName} – цени и монтаж`,
    description: `Габиони, подпорни стени, оградни системи и изграждане на огради ${c.inName} и околностите. Габиони от 20 € за брой, безплатен оглед.`,
    path: `/gradove/${c.slug}`,
  });
}

export default async function CityPage({ params }: Props) {
  const c = getCity((await params).grad);
  if (!c) notFound();
  const content = cityContent[c.slug];
  const faq = [
    { q: `Колко струват габиони ${c.inName}?`, a: `Цените са еднакви за всички градове: ${gabionTypes.map((g) => `${g.size} – ${g.price} €`).join(", ")}. Пълнежът и монтажът се изчисляват след оглед.` },
    { q: `Правите ли оглед ${c.inName}?`, a: `Да, огледът ${c.inName} и в околните населени места е безплатен.` },
    { q: "Кои населени места обслужвате наоколо?", a: `${content.areas} и други села в региона.` },
  ];

  return (
    <>
      <JsonLd data={serviceLd(`Габиони и огради ${c.inName}`, content.intro, `/gradove/${c.slug}`, c.name)} />
      <JsonLd data={faqLd(faq)} />
      <Breadcrumbs items={[{ name: "Градове", href: "/#gradove" }, { name: c.name }]} />

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-12 pt-6 lg:grid-cols-2 lg:gap-12 lg:pb-16">
          <div>
            <h1 className="font-display text-[1.9rem] font-bold leading-[1.15] text-forest sm:text-5xl">Габиони и огради {c.inName}</h1>
            <p className="mt-5 text-lg text-stone">{content.intro}</p>
            <CtaRow className="mt-8" />
          </div>
          <Image src={content.image.src} alt={content.image.alt} width={content.image.w} height={content.image.h} priority sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14 md:py-20">
        <h2 className="font-display text-xl font-bold text-forest md:text-2xl">Нашата работа {c.inName}</h2>
        <p className="mt-4 text-lg leading-relaxed">{content.detail}</p>
        <p className="mt-4 text-lg leading-relaxed">Обслужваме и околните населени места: {content.areas}.</p>

        <h2 className="mt-12 font-display text-xl font-bold text-forest md:text-2xl">Услуги {c.inName}</h2>
        <ul className="mt-5 divide-y divide-line rounded-2xl border border-line">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/${s.slug}`} className="block px-5 py-4 hover:bg-mist">
                <span className="font-semibold text-forest">{s.name} {c.inName}</span>
                <span className="mt-1 block text-stone">{s.short}</span>
              </Link>
            </li>
          ))}
        </ul>
        <CtaRow className="mt-10" />
      </div>

      <Section id="kalkulator" title="Цени на габиони" lead={`Цените ${c.inName} са същите като навсякъде. Изчислете сумата и я изпратете със запитването.`} className="border-y border-line bg-mist">
        <Calculator />
      </Section>

      <Section title="Наши проекти">
        <Gallery />
      </Section>

      <Section title="Въпроси" className="border-t border-line">
        <FaqList items={faq} />
      </Section>

      <Section title="Други градове" className="bg-mist">
        <CitiesGrid current={c.slug} />
      </Section>

      <ContactSection defaultCity={c.name} title={`Запитване ${c.inName}`} />
    </>
  );
}
