import { gabionTypes } from "@/config/site";

export type CalcLine = { type: string; qty: number };

export const CALC_EVENT = "calc:send";
export const CALC_KEY = "calc-lines";

export function priced(lines: CalcLine[]) {
  const rows = lines
    .map((l) => {
      const t = gabionTypes.find((g) => g.id === l.type);
      if (!t || !Number.isFinite(l.qty) || l.qty < 1) return null;
      const qty = Math.min(Math.floor(l.qty), 100000);
      return { ...t, qty, sum: qty * t.price };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);
  return { rows, total: rows.reduce((a, r) => a + r.sum, 0) };
}

export const eur = (n: number) => `${n.toLocaleString("bg-BG")} €`;
