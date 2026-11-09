import { gabionTypes } from "@/config/site";

export type CalcLine = { type: string; qty: number };

export const CALC_EVENT = "calc:send";
export const CALC_KEY = "calc-lines";

/** Обединява редове с еднакъв вид габион и смята сумите. */
export function priced(lines: CalcLine[]) {
  const qtyByType = new Map<string, number>();
  for (const l of lines) {
    if (!Number.isFinite(l.qty) || l.qty < 1) continue;
    qtyByType.set(l.type, (qtyByType.get(l.type) || 0) + Math.floor(l.qty));
  }
  const rows = gabionTypes
    .filter((t) => qtyByType.has(t.id))
    .map((t) => {
      const qty = Math.min(qtyByType.get(t.id)!, 100000);
      return { ...t, qty, sum: qty * t.price };
    });
  return { rows, total: rows.reduce((a, r) => a + r.sum, 0) };
}

export const eur = (n: number) => `${n.toLocaleString("bg-BG")} €`;
