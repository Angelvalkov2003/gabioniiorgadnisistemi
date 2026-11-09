"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cities, site } from "@/config/site";
import { services } from "@/content/services";
import { CALC_EVENT, CALC_KEY, eur, priced, type CalcLine } from "@/lib/calc";

const input = "h-12 w-full rounded-lg border border-line bg-white px-3 text-base focus:border-green";

export default function ContactForm({ defaultService = "", defaultCity = "" }: { defaultService?: string; defaultCity?: string }) {
  const router = useRouter();
  const [lines, setLines] = useState<CalcLine[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(CALC_KEY);
      if (saved) setLines(JSON.parse(saved));
    } catch {}
    const on = (e: Event) => setLines((e as CustomEvent<CalcLine[]>).detail);
    window.addEventListener(CALC_EVENT, on);
    return () => window.removeEventListener(CALC_EVENT, on);
  }, []);

  const { rows, total } = priced(lines);

  const clearCalc = () => {
    setLines([]);
    try {
      sessionStorage.removeItem(CALC_KEY);
    } catch {}
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const body = { ...Object.fromEntries(fd.entries()), calc: rows.map((r) => ({ type: r.id, qty: r.qty })) };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Запитването не беше изпратено.");
      clearCalc();
      router.push("/blagodarim");
    } catch (err) {
      setStatus("error");
      setError(`${err instanceof Error ? err.message : "Запитването не беше изпратено."} Опитайте отново или се обадете на ${site.phone}.`);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-line bg-white p-4 sm:grid-cols-2 sm:p-6">
      <div className="sm:col-span-1">
        <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium">Име</label>
        <input id="cf-name" name="name" autoComplete="name" className={input} maxLength={100} />
      </div>
      <div>
        <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-medium">Телефон *</label>
        <input id="cf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={6} maxLength={30} className={input} />
      </div>
      <div>
        <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium">Имейл</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" maxLength={120} className={input} />
      </div>
      <div>
        <label htmlFor="cf-city" className="mb-1.5 block text-sm font-medium">Град</label>
        <select id="cf-city" name="city" defaultValue={defaultCity} className={input}>
          <option value="">Изберете град</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.name}>{c.name}</option>
          ))}
          <option value="Друго населено място">Друго населено място</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-service" className="mb-1.5 block text-sm font-medium">Услуга</label>
        <select id="cf-service" name="service" defaultValue={defaultService} className={input}>
          <option value="">Изберете услуга</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
          <option value="Друго">Друго</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium">Съобщение</label>
        <textarea id="cf-message" name="message" rows={4} maxLength={3000} className={`${input} h-auto py-3`} placeholder="Опишете обекта: дължина, височина, наклон на терена…" />
      </div>
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Уебсайт</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {rows.length > 0 && (
        <div className="rounded-xl bg-mist p-4 sm:col-span-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-forest">Сметка от калкулатора</p>
            <button type="button" onClick={clearCalc} className="text-sm text-stone underline">Премахни</button>
          </div>
          <ul className="mt-2 space-y-1 text-sm">
            {rows.map((r) => (
              <li key={r.id} className="flex justify-between gap-2">
                <span>{r.size} × {r.qty} бр.</span>
                <span>{eur(r.sum)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 flex justify-between border-t border-line pt-2 font-semibold">
            <span>Общо</span>
            <span>{eur(total)}</span>
          </p>
        </div>
      )}

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="w-full rounded-lg bg-green py-4 text-base font-semibold text-white hover:bg-green-dark disabled:opacity-60">
          {status === "sending" ? "Изпращане…" : "Изпрати запитване"}
        </button>
        {status === "error" && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
        <p className="mt-3 text-xs text-stone">
          С изпращането се съгласявате данните да бъдат използвани само за отговор на запитването. <a href="/politika-za-poveritelnost" className="underline">Политика за поверителност</a>
        </p>
      </div>
    </form>
  );
}
