import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Calculator from "@/components/Calculator";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, CitiesGrid, ContactSection, FaqList, Gallery } from "@/components/sections";
import { CheckIcon, CtaRow, Section } from "@/components/ui";
import { cities, gabionTypes, site } from "@/config/site";
import { cityContent } from "@/content/cities";
import { services } from "@/content/services";
import { breadcrumbLd, faqLd, pageMeta, serviceLd } from "@/lib/seo";

type Props = { params: Promise<{ grad: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => cities.map((c) => ({ grad: c.slug }));

const getCity = (slug: string) => cities.find((c) => c.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCity((await params).grad);
  if (!c) return {};
  return pageMeta({
    title: `Габиони ${c.name} – цени, монтаж и огради`,
    description: `Габиони ${c.name}: габионни огради, подпорни стени и оградни системи с монтаж. Цени от ${Math.min(...gabionTypes.map((g) => g.price))} € за брой. Безплатен оглед ${c.inName} и околностите.`,
    path: `/gradove/${c.slug}`,
    keywords: [
      `габиони ${c.name}`,
      `габионни огради ${c.name}`,
      `подпорни стени ${c.name}`,
      `огради ${c.name}`,
      `габиони цена ${c.name}`,
      `габиони монтаж ${c.name}`,
      "габиони",
      "оградни системи",
      "изграждане на огради",
    ],
  });
}

export default async function CityPage({ params }: Props) {
  const c = getCity((await params).grad);
  if (!c) notFound();
  const content = cityContent[c.slug];
  const minPrice = Math.min(...gabionTypes.map((g) => g.price));
  const faq = [
    {
      q: `Колко струват габиони ${c.name}?`,
      a: `Цените на габионите ${c.inName} са: ${gabionTypes.map((g) => `${g.size} – ${g.price} €`).join(", ")}. Пълнежът и монтажът се изчисляват след безплатен оглед.`,
    },
    {
      q: `Правите ли монтаж на габиони ${c.inName}?`,
      a: `Да. Доставяме и монтираме габиони ${c.inName} и в околните населени места: ${content.areas}.`,
    },
    {
      q: `Изграждате ли подпорни стени и огради ${c.inName}?`,
      a: `Да – габионни подпорни стени, габионни огради, ламели, 3D пана и цялостно изграждане на огради ${c.inName}.`,
    },
    {
      q: `Безплатен ли е огледът ${c.inName}?`,
      a: `Да, огледът и офертата ${c.inName} и в региона са безплатни. Обадете се на ${site.phone}.`,
    },
  ];

  return (
    <>
      <JsonLd data={serviceLd(`Габиони ${c.name}`, content.intro, `/gradove/${c.slug}`, c.name)} />
      <JsonLd data={faqLd(faq)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Градове", path: "/gradove" },
          { name: `Габиони ${c.name}`, path: `/gradove/${c.slug}` },
        ])}
      />
      <Breadcrumbs items={[{ name: "Градове", href: "/gradove" }, { name: `Габиони ${c.name}` }]} />

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-12 pt-6 lg:grid-cols-2 lg:gap-12 lg:pb-16">
          <div>
            <h1 className="font-display text-[1.9rem] font-bold leading-[1.15] text-forest sm:text-5xl">Габиони {c.name}</h1>
            <p className="mt-5 text-lg text-stone">{content.intro}</p>
            <CtaRow className="mt-8" />
          </div>
          <Image
            src={content.image.src}
            alt={`Габиони ${c.name} – ${content.image.alt}`}
            width={content.image.w}
            height={content.image.h}
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14 md:py-20">
        <h2 className="font-display text-xl font-bold text-forest md:text-2xl">Габиони и огради {c.inName}</h2>
        <p className="mt-4 text-lg leading-relaxed">{content.detail}</p>
        <p className="mt-4 text-lg leading-relaxed">{content.servicesIntro}</p>

        <h2 className="mt-12 font-display text-xl font-bold text-forest md:text-2xl">Какво предлагаме {c.inName}</h2>
        <ul className="mt-5 space-y-2.5">
          {content.offers.map((li) => (
            <li key={li} className="flex gap-3 text-lg">
              <CheckIcon className="mt-1 size-5 shrink-0 text-green" />
              {li}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-xl font-bold text-forest md:text-2xl">Услуги {c.inName}</h2>
        <ul className="mt-5 divide-y divide-line rounded-2xl border border-line">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/${s.slug}`} className="block px-5 py-4 hover:bg-mist">
                <span className="font-semibold text-forest">
                  {s.name} {c.inName}
                </span>
                <span className="mt-1 block text-stone">{s.short}</span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-xl font-bold text-forest md:text-2xl">Населени места около {c.name}</h2>
        <p className="mt-4 text-lg leading-relaxed">
          Освен в {c.name} работим и в: {content.areas}. Ако сте наблизо и търсите габиони, подпорна стена или ограда – обадете се за оглед.
        </p>
        <CtaRow className="mt-10" />
      </div>

      <Section
        id="kalkulator"
        title={`Цени на габиони ${c.inName}`}
        lead={`Габиони ${c.name} от ${minPrice} € за брой. Цените са еднакви във всички градове. Изчислете сумата и я изпратете със запитването.`}
        className="border-y border-line bg-mist"
      >
        <Calculator />
      </Section>

      <Section title={`Проекти – габиони и огради`}>
        <Gallery />
      </Section>

      <Section title={`Често задавани въпроси за габиони ${c.name}`} className="border-t border-line">
        <FaqList items={faq} />
      </Section>

      <Section title="Габиони в други градове" className="bg-mist">
        <CitiesGrid current={c.slug} />
      </Section>

      <ContactSection defaultCity={c.name} title={`Запитване за габиони ${c.inName}`} />
    </>
  );
}
