import type { Metadata } from "next";
import Link from "next/link";
import LeadConversion from "@/components/LeadConversion";
import { CallButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Благодарим за запитването",
  robots: { index: false, follow: false },
  alternates: { canonical: "/blagodarim" },
};

export default function ThankYou() {
  return (
    <section className="mesh">
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <LeadConversion />
        <h1 className="font-display text-3xl font-bold text-forest md:text-4xl">Благодарим! Запитването е изпратено.</h1>
        <p className="mt-5 text-lg text-stone">Ще се свържем с вас в рамките на работния ден. Ако е спешно, обадете се.</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <CallButton />
          <Link href="/" className="font-semibold text-green underline">Към началната страница</Link>
        </div>
      </div>
    </section>
  );
}
