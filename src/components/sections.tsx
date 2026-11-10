import Image from "next/image";
import Link from "next/link";
import { cities, site } from "@/config/site";
import { services, type Faq } from "@/content/services";
import { gallery, type Img } from "@/content/images";
import { CheckIcon, CtaRow, Section } from "./ui";
import ContactForm from "./ContactForm";

export function Hero({ title, text, image }: { title: string; text: string; image: Img }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-12 pt-8 md:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-20">
        <div>
          <h1 className="font-display text-[1.9rem] font-bold leading-[1.15] text-forest sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-lg text-stone">{text}</p>
          <dl className="mt-6 flex gap-8">
            <div>
              <dt className="sr-only">Опит</dt>
              <dd className="font-display text-3xl font-bold text-green">{site.years}+</dd>
              <dd className="text-sm text-stone">години опит</dd>
            </div>
            <div>
              <dt className="sr-only">Проекти</dt>
              <dd className="font-display text-3xl font-bold text-green">{site.projects}+</dd>
              <dd className="text-sm text-stone">завършени проекта</dd>
            </div>
            <div className="hidden sm:block">
              <dt className="sr-only">Цени</dt>
              <dd className="font-display text-3xl font-bold text-green">20 €</dd>
              <dd className="text-sm text-stone">габион от</dd>
            </div>
          </dl>
          <CtaRow className="mt-8" />
          <p className="mt-4 text-sm text-stone">Безплатен оглед и оферта. Работно време: {site.hours.label}</p>
        </div>
        <div className="relative">
          <div className="mesh absolute -right-6 -top-6 h-full w-full rounded-2xl" aria-hidden="true" />
          <Image
            src={image.src}
            alt={image.alt}
            width={image.w}
            height={image.h}
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="relative aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid({ exclude }: { exclude?: string }) {
  const list = services.filter((s) => s.slug !== exclude);
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s) => (
        <Link key={s.slug} href={`/${s.slug}`} className="group flex flex-col bg-white hover:bg-mist">
          <Image src={s.image.src} alt={s.image.alt} width={s.image.w} height={s.image.h} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10] w-full object-cover" />
          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-display text-lg font-bold text-forest">{s.name}</h3>
            <p className="mt-2 flex-1 text-stone">{s.short}</p>
            <span className="mt-4 text-sm font-semibold text-green group-hover:underline">Научете повече за {s.name.toLowerCase()}</span>
          </div>
        </Link>
      ))}
      {list.length % 3 === 2 && (
        <div className="hidden flex-col justify-center bg-forest p-6 text-white lg:flex">
          <p className="font-display text-lg font-bold">Не намирате нужното?</p>
          <p className="mt-2 text-white/80">Обадете се и ще кажем дали можем да помогнем.</p>
          <a href={site.phoneHref} className="mt-4 font-display text-xl font-bold">{site.phone}</a>
        </div>
      )}
    </div>
  );
}

const reasons = [
  { t: "Фиксирани цени на габионите", d: "Знаете цената на коша предварително. Без скрити такси в офертата." },
  { t: "Един екип от изкопа до монтажа", d: "Имаме собствена техника, затова не чакате отделни подизпълнители." },
  { t: `Над ${site.years} години опит`, d: `Повече от ${site.projects} изградени огради и стени в Южна и Западна България.` },
  { t: "Безплатен оглед", d: "Идваме на място, измерваме и предлагаме най-подходящото решение." },
  { t: "Здрави материали", d: "Поцинкована мрежа и подбран камък, които издържат десетилетия." },
  { t: "Ясни срокове", d: "Договаряме дата за старт и я спазваме. Почистваме след себе си." },
];

export function WhyUs() {
  return (
    <Section id="zashto-nas" title="Защо да изберете нас" className="bg-mist">
      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r) => (
          <li key={r.t} className="flex gap-4">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-green text-white">
              <CheckIcon className="size-4" />
            </span>
            <div>
              <h3 className="font-semibold text-forest">{r.t}</h3>
              <p className="mt-1 text-stone">{r.d}</p>
            </div>
          </li>
        ))}
      </ul>
      <CtaRow className="mt-12" />
    </Section>
  );
}

export function Gallery({ items = gallery }: { items?: Img[] }) {
  return (
    <div className="columns-2 gap-3 md:columns-3 [&>*]:mb-3">
      {items.map((img) => (
        <figure key={img.src} className="break-inside-avoid overflow-hidden rounded-xl">
          <Image src={img.src} alt={img.alt} width={img.w} height={img.h} sizes="(min-width: 768px) 33vw, 50vw" className="h-auto w-full" />
          <figcaption className="sr-only">{img.alt}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function CitiesGrid({ current, serviceName }: { current?: string; serviceName?: string }) {
  const label = (name: string, inName: string) => (serviceName ? `${serviceName} ${inName}` : `Габиони ${name}`);
  return (
    <ul className="flex flex-wrap gap-3">
      {cities.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/gradove/${c.slug}`}
            aria-current={c.slug === current ? "page" : undefined}
            className={`inline-block rounded-lg border-2 px-5 py-3 font-semibold ${c.slug === current ? "border-green bg-green text-white" : "border-line text-forest hover:border-green"}`}
          >
            {label(c.name, c.inName)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const steps = [
  { t: "Обаждане или запитване", d: "Разказвате какво ви трябва. Можете да изпратите и снимки на терена." },
  { t: "Безплатен оглед", d: "Измерваме, оглеждаме почвата и наклона и обсъждаме вариантите." },
  { t: "Оферта", d: "Получавате ясна цена по позиции и срок за изпълнение." },
  { t: "Изграждане", d: "Изкоп, основа, монтаж и пълнеж от нашия екип и техника." },
  { t: "Предаване", d: "Проверяваме заедно резултата и почистваме обекта." },
];

export function Process() {
  return (
    <Section id="kak-rabotim" title="Как работим" lead="От първото обаждане до готовата ограда – пет ясни стъпки.">
      <ol className="grid gap-6 md:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.t} className="relative border-t-4 border-green pt-4">
            <span className="font-display text-3xl font-bold text-green/40">{i + 1}</span>
            <h3 className="mt-2 font-semibold text-forest">{s.t}</h3>
            <p className="mt-1 text-sm text-stone">{s.d}</p>
          </li>
        ))}
      </ol>
      <CtaRow className="mt-12" />
    </Section>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line">
      {items.map((f) => (
        <details key={f.q} className="group px-5">
          <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-semibold text-forest">
            {f.q}
            <span className="faq-icon text-2xl leading-none text-green transition-transform" aria-hidden="true">+</span>
          </summary>
          <p className="pb-5 text-stone">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ContactSection({ defaultService, defaultCity, title = "Изпратете запитване" }: { defaultService?: string; defaultCity?: string; title?: string }) {
  return (
    <section id="kontakti" className="mesh-light bg-forest py-16 text-white md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="font-display text-2xl font-bold md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-white/80">Оставете телефон и ще ви се обадим в рамките на работния ден. Или звъннете директно.</p>
          <a href={site.phoneHref} className="mt-8 block font-display text-3xl font-bold">{site.phone}</a>
          <ul className="mt-6 space-y-2 text-white/80">
            <li>
              <a href={`mailto:${site.email}`} className="break-all hover:underline">{site.email}</a>
            </li>
            <li>{site.hours.label}</li>
            <li>Работим в: {cities.map((c) => c.name).join(", ")}</li>
          </ul>
        </div>
        <div className="text-ink">
          <ContactForm defaultService={defaultService} defaultCity={defaultCity} />
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Навигация" className="mx-auto max-w-6xl px-4 pt-5 text-sm text-stone">
      <ol className="flex flex-wrap gap-1.5">
        <li>
          <Link href="/" className="hover:underline">Начало</Link>
        </li>
        {items.map((it) => (
          <li key={it.name} className="before:mr-1.5 before:content-['/']">
            {it.href ? <Link href={it.href} className="hover:underline">{it.name}</Link> : <span aria-current="page">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
