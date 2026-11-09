"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { nav, site } from "@/config/site";
import { PhoneIcon } from "./ui";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/images/logo.webp" alt={`${site.brand} – габиони и оградни системи`} width={44} height={44} priority className="rounded" />
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold text-forest">{site.brand}</span>
            <span className="block text-xs text-stone">Габиони и огради</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Основно меню">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-ink hover:text-green">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="hidden items-center gap-2 rounded-lg bg-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-dark sm:inline-flex">
            <PhoneIcon className="size-4" /> {site.phone}
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Затвори менюто" : "Отвори менюто"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="border-t border-line bg-white lg:hidden" aria-label="Мобилно меню">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block border-b border-line py-3.5 text-base font-medium last:border-0" onClick={() => setOpen(false)}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
