/**
 * Single source of truth for every replaceable business detail.
 *
 * ⚠️  EVERYTHING IN `contact`, `areas`, `hours` AND `proof` IS A PLACEHOLDER.
 *     Replace with the real business details before launch. The UI renders
 *     these values directly, so editing this file is the only change needed.
 */

export type Locale = "en" | "es";
export const LOCALES: Locale[] = ["en", "es"];
export const DEFAULT_LOCALE: Locale = "en";

/** Which language a pathname belongs to. */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

/** The same page in the other language. */
export function altPath(pathname: string): string {
  return localeFromPath(pathname) === "es"
    ? pathname.replace(/^\/es(?=\/|$)/, "") || "/"
    : pathname === "/"
      ? "/es"
      : `/es${pathname}`;
}

/** A route key on the public site, language-independent. */
export type RouteKey = "home" | "services" | "areas" | "about" | "contact";
const PATHS: Record<RouteKey, string> = {
  home: "/",
  services: "/services",
  areas: "/service-areas",
  about: "/about",
  contact: "/contact",
};

/** Build the URL for a route in a given language. */
export function route(key: RouteKey, locale: Locale = DEFAULT_LOCALE): string {
  const base = PATHS[key];
  return locale === "es" ? (base === "/" ? "/es" : `/es${base}`) : base;
}

export const routeKeys: RouteKey[] = ["home", "services", "areas", "about", "contact"];

export const site = {
  name: "HandyMan",
  nameFull: "HandyMan All-in-One",
  /** Brand essence, used as the tagline everywhere. */
  tagline: { en: "Your home, handled.", es: "Su casa, resuelta." },

  /** ⚠️ PLACEHOLDER — replace with the real phone number (digits only in `phoneHref`). */
  contact: {
    phone: "(555) 010-2288",
    phoneHref: "+15550102288",
    email: "hello@handymanallinone.com",
    addressLine: "1420 Workshop Ave, Suite B",
    city: "Springfield",
    state: "ST",
    zip: "00000",
    /** Set to the real public URL once the domain is connected. */
    url: "https://handyman-all-in-one.vercel.app",
  },

  /** ⚠️ PLACEHOLDER — replace with the real coverage list. */
  areas: [
    "Springfield",
    "Riverton",
    "Oak Hollow",
    "Cedar Falls",
    "Maple Grove",
    "Fairview",
    "Brookside",
    "Lakeshore",
  ],

  /** ⚠️ PLACEHOLDER — replace with the real hours. */
  hours: [
    { days: { en: "Monday – Friday", es: "Lunes – Viernes" }, time: "7:00 AM – 6:00 PM" },
    { days: { en: "Saturday", es: "Sábado" }, time: "8:00 AM – 3:00 PM" },
    { days: { en: "Sunday", es: "Domingo" }, time: { en: "Closed", es: "Cerrado" } },
  ],

  /**
   * ⚠️ PLACEHOLDER — these are the honest answers for a new business.
   * Replace each `value` once the business can state a real figure.
   * Never invent a number here: every one of these is rendered as a fact.
   */
  proof: {
    response: { value: { en: "Same business day", es: "Mismo día hábil" } },
    scheduling: { value: { en: "2-hour arrival window", es: "Ventana de llegada de 2 horas" } },
    quote: { value: { en: "Fixed, approved before we start", es: "Fijo, aprobado antes de empezar" } },
    warranty: { value: { en: "1-year workmanship", es: "1 año de mano de obra" } },
  },

  /** ⚠️ PLACEHOLDER — replace with real license / insurance details. */
  credentials: {
    license: "HIC #0000000",
    insured: { en: "General liability insured", es: "Asegurado de responsabilidad general" },
  },
} as const;

export const telHref = `tel:${site.contact.phoneHref}`;
export const mailHref = `mailto:${site.contact.email}`;

export const addressOneLine = `${site.contact.addressLine}, ${site.contact.city}, ${site.contact.state} ${site.contact.zip}`;
