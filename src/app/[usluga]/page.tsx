import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Calculator from "@/components/Calculator";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, CitiesGrid, ContactSection, FaqList, Gallery, ServicesGrid } from "@/components/sections";
import { CheckIcon, CtaRow, Section } from "@/components/ui";
import { getService, services } from "@/content/services";
import { breadcrumbLd, faqLd, pageMeta, serviceLd } from "@/lib/seo";

type Props = { params: Promise<{ usluga: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ usluga: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).usluga);
  if (!s) return {};
  return pageMeta({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/${s.slug}`,
    keywords: [
      s.name.toLowerCase(),
      `${s.name.toLowerCase()} цена`,
      `${s.name.toLowerCase()} монтаж`,
      "габиони",
      "габионни огради",
      "София",
      "Пловдив",
      "Пазарджик",
    ],
  });
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).usluga);
  if (!s) notFound();

  return (
    <>
      <JsonLd data={serviceLd(s.name, s.metaDescription, `/${s.slug}`)} />
      <JsonLd data={faqLd(s.faq)} />
      <JsonLd data={breadcrumbLd([{ name: s.name, path: `/${s.slug}` }])} />
      <Breadcrumbs items={[{ name: s.name }]} />

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-12 pt-6 lg:grid-cols-2 lg:gap-12 lg:pb-16">
          <div>
            <h1 className="font-display text-[1.9rem] font-bold leading-[1.15] text-forest sm:text-5xl">{s.h1}</h1>
            <p className="mt-5 text-lg text-stone">{s.intro}</p>
            <CtaRow className="mt-8" />
          </div>
          <Image src={s.image.src} alt={s.image.alt} width={s.image.w} height={s.image.h} priority sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14 md:py-20">
        {s.sections.map((sec) => (
          <section key={sec.h} className="mb-12 last:mb-0">
            <h2 className="font-display text-xl font-bold text-forest md:text-2xl">{sec.h}</h2>
            <div className="prose-block mt-4 text-lg leading-relaxed text-ink/90">
              {sec.p.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            {sec.list && (
              <ul className="mt-5 space-y-2.5">
                {sec.list.map((li) => (
                  <li key={li} className="flex gap-3 text-lg">
                    <CheckIcon className="mt-1 size-5 shrink-0 text-green" />
                    {li}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <CtaRow className="mt-12" />
      </div>

      {s.showCalculator && (
        <Section id="kalkulator" title="Калкулатор на цената" lead="Изберете размер и брой габиони и изпратете сметката със запитването." className="border-y border-line bg-mist">
          <Calculator />
        </Section>
      )}

      <Section title={`Снимки – ${s.name.toLowerCase()}`}>
        <Gallery items={s.gallery} />
      </Section>

      <Section title="Въпроси и отговори" className="border-t border-line">
        <FaqList items={s.faq} />
        <CtaRow className="mt-10" />
      </Section>

      <Section title={`${s.name} по градове`} className="bg-mist" lead={`Търсите ${s.name.toLowerCase()} в София, Пловдив, Пазарджик или друг град? Изберете града за локална информация.`}>
        <CitiesGrid serviceName={s.name} />
        <p className="mt-6 text-stone">
          Вижте и <Link href="/gradove" className="text-green underline">габиони във всички градове</Link> или{" "}
          <Link href="/" className="text-green underline">цените на началната страница</Link>.
        </p>
      </Section>

      <Section title="Други услуги">
        <ServicesGrid exclude={s.slug} />
      </Section>

      <ContactSection defaultService={s.name} title={`Запитване за ${s.name.toLowerCase()}`} />
    </>
  );
}
