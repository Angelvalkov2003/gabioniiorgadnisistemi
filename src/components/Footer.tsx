import Link from "next/link";
import { cities, site } from "@/config/site";
import { services } from "@/content/services";

export default function Footer() {
  return (
    <footer className="mesh-light bg-forest text-white/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold text-white">{site.brand}</p>
          <p className="mt-3 text-sm">Габиони, подпорни стени и оградни системи. Над {site.years} години опит и {site.projects}+ завършени обекта.</p>
          <a href={site.phoneHref} className="mt-4 inline-block font-display text-xl font-bold text-white">
            {site.phone}
          </a>
        </div>
        <div>
          <p className="font-semibold text-white">Услуги</p>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="hover:text-white hover:underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Градове</p>
          <ul className="mt-3 space-y-2 text-sm">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/gradove/${c.slug}`} className="hover:text-white hover:underline">
                  Габиони и огради {c.inName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Контакти</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={site.phoneHref} className="hover:underline">{site.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all hover:underline">{site.email}</a>
            </li>
            <li>{site.hours.label}</li>
            <li>{site.address}</li>
            <li>ЕИК: {site.eik}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/70 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.brand}. Всички права запазени.</p>
          <Link href="/politika-za-poveritelnost" className="hover:underline">Политика за поверителност</Link>
        </div>
      </div>
    </footer>
  );
}
