// Всички бизнес данни на сайта. Сменяй оттук.

export const site = {
  brand: "Vasko Group",
  tagline: "Габиони и оградни системи",
  phone: "0895 174 002",
  phoneHref: "tel:+359895174002",
  phoneE164: "+359895174002",
  email: "iosifkirov31@gmail.com",
  // ПЛЕЙСХОЛДЪР: началният час (08:00) да се потвърди
  hours: {
    label: "Пон–Пет 08:00–18:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  years: 10,
  projects: 150,
  addressLocality: "София",
  country: "BG",
  currency: "€",
} as const;

export type GabionType = {
  id: string;
  label: string;
  size: string;
  /** в см: дължина × ширина × височина */
  dims: [number, number, number];
  price: number;
};

// Финални цени за брой
export const gabionTypes: GabionType[] = [
  { id: "100x100x100", label: "Габион 100×100×100 см", size: "100×100×100 см", dims: [100, 100, 100], price: 50 },
  { id: "100x50x100", label: "Габион 100×50×100 см", size: "100×50×100 см", dims: [100, 50, 100], price: 35 },
  { id: "50x50x100", label: "Габион 50×50×100 см", size: "50×50×100 см", dims: [50, 50, 100], price: 20 },
];

export type City = { slug: string; name: string; inName: string };

export const cities: City[] = [
  { slug: "sofia", name: "София", inName: "в София" },
  { slug: "plovdiv", name: "Пловдив", inName: "в Пловдив" },
  { slug: "pazardzhik", name: "Пазарджик", inName: "в Пазарджик" },
  { slug: "velingrad", name: "Велинград", inName: "във Велинград" },
  { slug: "pernik", name: "Перник", inName: "в Перник" },
  { slug: "asenovgrad", name: "Асеновград", inName: "в Асеновград" },
  { slug: "karlovo", name: "Карлово", inName: "в Карлово" },
];

export const nav = [
  { href: "/#uslugi", label: "Услуги" },
  { href: "/#kalkulator", label: "Цени" },
  { href: "/#proekti", label: "Проекти" },
  { href: "/gradove", label: "Градове" },
  { href: "/#chzv", label: "Въпроси" },
  { href: "/#kontakti", label: "Контакти" },
];
