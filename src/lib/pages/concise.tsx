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
   * A FIT-TO-LENGTH JOIN, not a `.slice(0, 158)`.
   *
   * The first version appended all six category names and then hard-cut the
   * string at 158 characters. English reached 158 mid-phrase and shipped a
   * description ending "…Exterior & seasonal, Safety" — cut inside "Safety &
   * accessibility", with no ellipsis, reading as a seventh category called
   * "Safety". Spanish happened to land at 116 characters and ended cleanly on
   * "Seguridad.", so the defect was invisible in the language anyone would check
   * first, and the two languages described the page unequally by 42 characters.
   *
   * This adds whole categories while they fit and stops, so neither language can
   * be cut mid-word and neither is padded to a quota.
   */
  const parts = [t.hero.sub];
  for (const c of t.services.categories) {
    const next = `${parts.join(" ")} ${c.short},`;
    if (next.length > 155) break;
    parts.push(`${c.short},`);
  }
  const description = `${parts.join(" ").replace(/,$/, "")}.`;

  return {
    title:
      locale === "es"
        ? "Reparación del hogar, en corto — una sola empresa"
        : "Home repair, in short — one company, one standard",
    description,
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
