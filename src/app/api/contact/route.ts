import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/config/site";
import { eur, priced } from "@/lib/calc";

const schema = z.object({
  name: z.string().trim().max(100).optional().default(""),
  phone: z.string().trim().min(6, "Въведете валиден телефон.").max(30).regex(/^[+\d\s()\-/]+$/, "Въведете валиден телефон."),
  email: z.union([z.literal(""), z.email("Невалиден имейл.")]).optional().default(""),
  city: z.string().trim().max(60).optional().default(""),
  service: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().max(3000).optional().default(""),
  website: z.string().optional().default(""),
  calc: z.array(z.object({ type: z.string().max(30), qty: z.number().int().min(1).max(100000) })).max(20).optional().default([]),
});

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Невалидна заявка." }, { status: 400 });
  }
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Невалидни данни." }, { status: 400 });
  }
  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true }); // honeypot

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!key || !to) return NextResponse.json({ error: "Формата не е конфигурирана." }, { status: 500 });

  const { rows, total } = priced(d.calc);
  const fields: [string, string][] = [
    ["Име", d.name || "—"],
    ["Телефон", d.phone],
    ["Имейл", d.email || "—"],
    ["Град", d.city || "—"],
    ["Услуга", d.service || "—"],
  ];

  const td = 'style="padding:8px 12px;border-bottom:1px solid #dce3d3;vertical-align:top"';
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#1e2619;max-width:600px">
<h2 style="color:#2f4a1c;margin:0 0 12px">Ново запитване от сайта</h2>
<table style="border-collapse:collapse;width:100%">${fields
    .map(([k, v]) => `<tr><td ${td}><b>${k}</b></td><td ${td}>${k === "Телефон" ? `<a href="tel:${esc(v.replace(/[^\d+]/g, ""))}">${esc(v)}</a>` : esc(v)}</td></tr>`)
    .join("")}</table>
<h3 style="color:#2f4a1c;margin:20px 0 8px">Съобщение</h3>
<p style="white-space:pre-wrap;margin:0">${esc(d.message || "—")}</p>
${
  rows.length
    ? `<h3 style="color:#2f4a1c;margin:20px 0 8px">Сметка от калкулатора</h3>
<table style="border-collapse:collapse;width:100%"><tr><th ${td} align="left">Габион</th><th ${td} align="right">Брой</th><th ${td} align="right">Ед. цена</th><th ${td} align="right">Сума</th></tr>
${rows.map((r) => `<tr><td ${td}>${r.size}</td><td ${td} align="right">${r.qty}</td><td ${td} align="right">${eur(r.price)}</td><td ${td} align="right">${eur(r.sum)}</td></tr>`).join("")}
<tr><td ${td} colspan="3"><b>Общо</b></td><td ${td} align="right"><b>${eur(total)}</b></td></tr></table>`
    : ""
}</div>`;

  const text = [
    "Ново запитване от сайта",
    ...fields.map(([k, v]) => `${k}: ${v}`),
    "",
    `Съобщение: ${d.message || "—"}`,
    ...(rows.length ? ["", "Сметка от калкулатора:", ...rows.map((r) => `${r.size} × ${r.qty} = ${eur(r.sum)}`), `Общо: ${eur(total)}`] : []),
  ].join("\n");

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: `${site.brand} <onboarding@resend.dev>`,
    to: [to],
    replyTo: d.email || undefined,
    subject: `Запитване: ${d.service || "габиони/огради"} – ${d.name || d.phone}${d.city ? `, ${d.city}` : ""}`,
    html,
    text,
  });
  if (error) {
    console.error("Resend error", error);
    return NextResponse.json({ error: "Запитването не беше изпратено." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
