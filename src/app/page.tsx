import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import JsonLd from "@/components/JsonLd";
import { CitiesGrid, ContactSection, FaqList, Gallery, Hero, Process, ServicesGrid, WhyUs } from "@/components/sections";
import { CtaRow, Section } from "@/components/ui";
import { images } from "@/content/images";
import { homeFaq } from "@/content/services";
import { faqLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(homeFaq)} />
      <Hero
        title="Габиони, подпорни стени и огради с монтаж"
        text="Изграждаме габионни огради, подпорни стени и модерни оградни системи – от изкопа до последния камък. Фиксирани цени на габионите и безплатен оглед."
        image={images.aluOgrada}
      />

      <Section id="uslugi" title="Услуги" lead="Всичко за оградата и терена от един изпълнител.">
        <ServicesGrid />
        <CtaRow className="mt-10" />
      </Section>

      <Section id="kalkulator" title="Цени и калкулатор" lead="Изберете размер и брой габиони и вижте сумата веднага. После я изпратете с едно натискане." className="border-y border-line">
        <Calculator />
      </Section>

      <WhyUs />

      <Section id="proekti" title="Наши проекти" lead="Огради, подпорни стени и стълбища, изградени от нашия екип.">
        <Gallery />
        <CtaRow className="mt-10" />
      </Section>

      <Section id="gradove" title="Къде работим" lead="Идваме на оглед и изграждаме в тези градове и околностите им." className="bg-mist">
        <CitiesGrid />
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
