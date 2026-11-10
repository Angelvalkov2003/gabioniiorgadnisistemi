import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import JsonLd from "@/components/JsonLd";
import { CitiesGrid, ContactSection, FaqList, Gallery, Hero, Process, ServicesGrid, WhyUs } from "@/components/sections";
import { CtaRow, Section } from "@/components/ui";
import { images } from "@/content/images";
import { homeFaq } from "@/content/services";
import { site } from "@/config/site";
import { defaultKeywords, faqLd, pageMeta } from "@/lib/seo";

const homeTitle = `Габиони и оградни системи – цени и монтаж | ${site.brand}`;

export const metadata: Metadata = {
  ...pageMeta({
    title: homeTitle,
    description:
      "Габиони, габионни огради, подпорни стени и оградни системи с монтаж. Цени от 20 €. Габиони София, Пловдив, Пазарджик, Велинград, Перник, Асеновград и Карлово.",
    path: "/",
    keywords: defaultKeywords,
  }),
  title: { absolute: homeTitle },
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(homeFaq)} />
      <Hero
        title="Габиони, подпорни стени и огради с монтаж"
        text="Изграждаме габионни огради, подпорни стени и модерни оградни системи – от изкопа до последния камък. Фиксирани цени на габионите и безплатен оглед в София, Пловдив, Пазарджик и региона."
        image={images.aluOgrada}
      />

      <Section id="uslugi" title="Услуги" lead="Габиони, подпорни стени, оградни системи и механизация – всичко от един изпълнител.">
        <ServicesGrid />
        <CtaRow className="mt-10" />
      </Section>

      <Section id="kalkulator" title="Цени на габиони и калкулатор" lead="Изберете размер и брой габиони и вижте сумата веднага. После я изпратете с едно натискане." className="border-y border-line">
        <Calculator />
      </Section>

      <WhyUs />

      <Section id="proekti" title="Наши проекти" lead="Габионни огради, подпорни стени и стълбища, изградени от нашия екип.">
        <Gallery />
        <CtaRow className="mt-10" />
      </Section>

      <Section id="gradove" title="Габиони по градове" lead="Търсите габиони София, Пловдив, Пазарджик или друг град? Идваме на оглед и изграждаме на място." className="bg-mist">
        <CitiesGrid />
        <p className="mt-6 text-stone">
          Вижте и <Link href="/gradove" className="font-semibold text-green underline">всички градове с габиони и огради</Link>.
        </p>
        <CtaRow className="mt-10" />
      </Section>

      <Process />

      <Section id="chzv" title="Често задавани въпроси" className="border-t border-line">
        <FaqList items={homeFaq} />
        <CtaRow className="mt-10" />
      </Section>

      <ContactSection />
    </>
  );
}
