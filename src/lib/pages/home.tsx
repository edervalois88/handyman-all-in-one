import type { Metadata } from "next";
import { Hero, PromiseBand } from "@/components/Hero";
import {
  AreasTeaser,
  ClosingCta,
  Compare,
  Faq,
  Problem,
  Process,
  ServiceGrid,
  Solution,
} from "@/components/sections";
import { getDict } from "@/lib/i18n";
import { site, type Locale } from "@/lib/site";

export function homeMetadata(locale: Locale): Metadata {
  const t = getDict(locale);
  return {
    title:
      locale === "es"
        ? "Reparación y mantenimiento del hogar — una sola empresa"
        : "Home repair & maintenance — one company, one standard",
    description: t.hero.body.slice(0, 158),
    alternates: {
      canonical: locale === "es" ? "/es" : "/",
      languages: { en: "/", es: "/es" },
    },
    openGraph: {
      title: `${site.nameFull} — ${t.tagline}`,
      description: t.hero.sub,
      images: [{ url: "/brand/og-card.png", width: 1200, height: 630 }],
    },
  };
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <>
      <Hero locale={locale} t={t} />
      <PromiseBand t={t} />
      <Problem locale={locale} t={t} />
      <Solution locale={locale} t={t} />
      <ServiceGrid locale={locale} t={t} />
      <Process locale={locale} t={t} />
      <Compare locale={locale} t={t} />
      <AreasTeaser locale={locale} t={t} />
      <Faq locale={locale} t={t} />
      <ClosingCta locale={locale} t={t} />
    </>
  );
}
