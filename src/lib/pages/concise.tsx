import type { Metadata } from "next";
import { ConciseHome } from "@/components/ConciseBlocks";
import { LocaleShell } from "@/components/LocaleShell";
import { getDict } from "@/lib/i18n";
import { site, type Locale } from "@/lib/site";

/**
 * The concise home page, served as a comparison route.
 *
 * Same world, same components, same words — just fewer of them. It sits beside
 * the long home while the client decides which one becomes `/`, so both can be
 * opened on the same phone and read end to end. Delete this route once that is
 * settled and move the winner's component into `home.tsx`.
 *
 * Deliberately absent from the header, the footer and the sitemap: it is a
 * review build, not a second front door.
 */

export function conciseMetadata(locale: Locale): Metadata {
  const t = getDict(locale);
  /*
   * `whatWeDo.line` was the obvious source for this and is no longer the right
   * one: the concise hero carries a shorter line of its own, and a description
   * should describe the page it is attached to. Composed from the tagline plus
   * the category names instead, which is what the page actually shows and what
   * somebody searching for one of those trades would match on.
   */
  const services = t.services.categories.map((c) => c.short).join(", ");
  return {
    title:
      locale === "es"
        ? "Reparación del hogar, en corto — una sola empresa"
        : "Home repair, in short — one company, one standard",
    description: `${t.hero.sub} ${services}.`.slice(0, 158),
    alternates: {
      canonical: locale === "es" ? "/es/concise" : "/concise",
      languages: { en: "/concise", es: "/es/concise" },
    },
    openGraph: {
      title: `${site.nameFull} — ${t.tagline}`,
      description: t.concise.heroLine,
      images: [{ url: "/brand/og-card.png", width: 1200, height: 630 }],
    },
  };
}

export function conciseHomePage(locale: Locale) {
  return {
    generateMetadata: (): Metadata => conciseMetadata(locale),
    default: function Concise() {
      return (
        <LocaleShell locale={locale}>
          <ConciseHome locale={locale} t={getDict(locale)} />
        </LocaleShell>
      );
    },
  };
}
