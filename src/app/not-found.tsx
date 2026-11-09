import Link from "next/link";
import { services } from "@/content/services";
import { CallButton } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="mesh">
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="font-display text-6xl font-bold text-green">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-forest md:text-3xl">Тази страница не съществува</h1>
        <p className="mt-4 text-lg text-stone">Адресът е грешен или страницата е преместена. Изберете услуга или се обадете.</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/${s.slug}`} className="inline-block rounded-lg border-2 border-line bg-white px-4 py-2.5 font-semibold text-forest hover:border-green">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <CallButton />
        </div>
      </div>
    </section>
  );
}
