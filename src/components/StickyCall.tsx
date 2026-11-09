import Link from "next/link";
import { site } from "@/config/site";
import { PhoneIcon } from "./ui";

export default function StickyCall() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1.4fr_1fr] gap-2 border-t border-line bg-white p-2 md:hidden">
      <a href={site.phoneHref} className="flex items-center justify-center gap-2 rounded-lg bg-green py-3 font-semibold text-white">
        <PhoneIcon /> Обади се
      </a>
      <Link href="#kontakti" className="flex items-center justify-center rounded-lg bg-forest py-3 font-semibold text-white">
        Запитване
      </Link>
    </div>
  );
}
