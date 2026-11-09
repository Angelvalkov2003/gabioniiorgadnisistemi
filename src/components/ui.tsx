import Link from "next/link";
import { site } from "@/config/site";

export function PhoneIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

export function CheckIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-semibold transition-colors text-base whitespace-nowrap";

export function CallButton({ variant = "solid", className = "" }: { variant?: "solid" | "light" | "outline"; className?: string }) {
  const v =
    variant === "solid"
      ? "bg-green text-white hover:bg-green-dark"
      : variant === "light"
        ? "bg-white text-forest hover:bg-mist"
        : "border-2 border-green text-forest hover:bg-mist";
  return (
    <a href={site.phoneHref} className={`${base} ${v} ${className}`}>
      <PhoneIcon /> {site.phone}
    </a>
  );
}

export function QuoteButton({ variant = "outline", className = "", href = "#kontakti" }: { variant?: "outline" | "light" | "solid"; className?: string; href?: string }) {
  const v =
    variant === "outline"
      ? "border-2 border-forest/20 text-forest hover:border-forest"
      : variant === "solid"
        ? "bg-forest text-white hover:bg-ink"
        : "border-2 border-white/40 text-white hover:border-white";
  return (
    <Link href={href} className={`${base} ${v} ${className}`}>
      Изпрати запитване
    </Link>
  );
}

export function CtaRow({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <CallButton variant={dark ? "light" : "solid"} />
      <QuoteButton variant={dark ? "light" : "outline"} />
    </div>
  );
}

export function Section({
  id,
  title,
  lead,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-2xl font-bold leading-tight text-forest md:text-4xl">{title}</h2>
        {lead && <p className="mt-4 max-w-2xl text-lg text-stone">{lead}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
