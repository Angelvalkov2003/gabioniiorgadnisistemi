"use client";

import { useState } from "react";
import { gabionTypes } from "@/config/site";
import { CALC_EVENT, CALC_KEY, eur, priced, type CalcLine } from "@/lib/calc";

export default function Calculator() {
  const [lines, setLines] = useState<CalcLine[]>([{ type: gabionTypes[0].id, qty: 10 }]);
  const { rows, total } = priced(lines);

  const update = (i: number, patch: Partial<CalcLine>) => setLines((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));
  const add = (type = gabionTypes[0].id) => setLines((ls) => [...ls, { type, qty: 1 }]);
  const remove = (i: number) => setLines((ls) => ls.filter((_, j) => j !== i));

  const send = () => {
    const valid = rows.map((r) => ({ type: r.id, qty: r.qty }));
    try {
      sessionStorage.setItem(CALC_KEY, JSON.stringify(valid));
    } catch {}
    window.dispatchEvent(new CustomEvent(CALC_EVENT, { detail: valid }));
    document.getElementById("kontakti")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
      {/* Размерите, начертани в мащаб (поглед отгоре) */}
      <div className="grid grid-cols-3 items-end gap-3 sm:gap-5">
        {gabionTypes.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => add(g.id)}
            className="group flex flex-col items-center gap-3 rounded-xl p-2 text-center hover:bg-mist"
            aria-label={`Добави ${g.label} за ${g.price} €`}
          >
            <span
              className="mesh block rounded-sm border-2 border-green bg-white transition-colors group-hover:bg-mist"
              style={{ width: `${g.dims[0] * 0.9}%`, aspectRatio: `${g.dims[0]} / ${g.dims[1]}`, maxWidth: `${g.dims[0] * 1.1}px` }}
            />
            <span className="text-xs text-stone sm:text-sm">{g.size}</span>
            <span className="font-display text-xl font-bold text-forest sm:text-2xl">{g.price} €</span>
          </button>
        ))}
        <p className="col-span-3 text-sm text-stone">Цена за брой. Натиснете размер, за да го добавите в сметката.</p>
      </div>

      <div className="rounded-2xl border border-line bg-white p-4 sm:p-6">
        <ul className="space-y-3">
          {lines.map((l, i) => (
            <li key={i} className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
              <label className="sr-only" htmlFor={`calc-type-${i}`}>Вид габион</label>
              <select
                id={`calc-type-${i}`}
                value={l.type}
                onChange={(e) => update(i, { type: e.target.value })}
                className="h-12 min-w-0 rounded-lg border border-line bg-white px-3 text-base"
              >
                {gabionTypes.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.size} – {g.price} €
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor={`calc-qty-${i}`}>Брой</label>
              <input
                id={`calc-qty-${i}`}
                type="number"
                inputMode="numeric"
                min={1}
                value={l.qty || ""}
                onChange={(e) => update(i, { qty: Number(e.target.value) })}
                className="h-12 w-20 rounded-lg border border-line px-3 text-base"
              />
              <button
                type="button"
                onClick={() => remove(i)}
                disabled={lines.length === 1}
                className="size-12 rounded-lg border border-line text-xl text-stone disabled:opacity-30"
                aria-label="Премахни реда"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => add()} className="mt-3 text-sm font-semibold text-green hover:underline">
          + Добави ред
        </button>

        <div className="mt-6 flex items-baseline justify-between border-t border-line pt-5">
          <span className="text-stone">Обща сума</span>
          <span className="font-display text-3xl font-bold text-forest" aria-live="polite">
            {eur(total)}
          </span>
        </div>
        <p className="mt-1 text-xs text-stone">Само кошовете. Пълнеж и монтаж – по оферта след оглед.</p>
        <button
          type="button"
          onClick={send}
          disabled={rows.length === 0}
          className="mt-5 w-full rounded-lg bg-green py-4 text-base font-semibold text-white hover:bg-green-dark disabled:opacity-40"
        >
          Изпрати запитване
        </button>
      </div>
    </div>
  );
}
