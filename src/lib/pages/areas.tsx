import type { Metadata } from "next";
import Link from "next/link";
import { RuleNote, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion/primitives";
import { ClosingCta } from "@/components/sections";
import { getDict } from "@/lib/i18n";
import { site, telHref, type Locale } from "@/lib/site";

export function areasMetadata(locale: Locale): Metadata {
  const t = getDict(locale);
  return {
    title: locale === "es" ? "Zonas de servicio" : "Service areas",
    description:
      locale === "es"
        ? "Mantenemos un radio corto a propósito: traslados cortos significan llegadas puntuales y visitas de seguimiento la misma semana."
        : "We keep a tight radius on purpose: short drives mean the crew arrives when we said it would and can return the same week.",
    openGraph: { title: `${t.nav.areas} | ${site.nameFull}`, description: t.areas.body },
  };
}

export function AreasPage({ locale, t }: { locale: Locale; t: ReturnType<typeof getDict> }) {
  return (
    <>
      <header className="bg-navy py-14 text-cream sm:py-16">
        <div className="shell">
          <SectionHead title={t.areas.title} body={t.areas.body} tone="cream" />
        </div>
      </header>

      <div className="ground py-14 sm:py-16">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <section>
            <h2 className="label border-b-2 border-navy/25 pb-2 text-ink-soft">
              {t.areas.listTitle}
            </h2>

            {/* coverage rendered as a delivery manifest */}
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {site.areas.map((a, i) => (
                <li
                  key={a}
                  className="flex items-baseline justify-between gap-4 border-b border-dashed border-rule-strong py-3.5"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="label tnum text-ink-soft">
                      {String((i + 1) * 10).padStart(3, "0")}
                    </span>
                    <span className="display text-[1.2rem] text-navy">{a}</span>
                  </span>
                  <span className="label text-ink-soft">
                    {locale === "es" ? "Cubierta" : "Covered"}
                  </span>
                </li>
              ))}
            </ul>
            <p className="label mt-4 text-gold-ink">* {t.areas.note}</p>

            <RuleNote lane={t.areas.findTitle} className="mt-10">
              <p className="max-w-[56ch]">{t.areas.findBody}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={`${locale === "es" ? "/es" : ""}/contact`} className="btn btn-primary">
                  {t.areas.cta}
                </Link>
                <a href={telHref} className="btn btn-line">
                  <span className="tnum">{site.contact.phone}</span>
                </a>
              </div>
            </RuleNote>
          </section>

          <aside className="self-start space-y-6">
            <Reveal className="sheet p-6">
              <h2 className="label border-b-2 border-navy/25 pb-2 text-ink-soft">
                {t.contact.hoursTitle}
              </h2>
              <ul className="mt-4 space-y-2 text-[0.96rem] text-navy/85">
                {site.hours.map((h) => (
                  <li key={h.days.en} className="flex justify-between gap-4">
                    <span>{h.days[locale]}</span>
                    <span className="tnum">
                      {typeof h.time === "string" ? h.time : h.time[locale]}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="label mt-4 text-gold-ink">* {t.common.placeholderNote}</p>
            </Reveal>

            <Reveal className="sheet p-6">
              <h2 className="label border-b-2 border-navy/25 pb-2 text-ink-soft">
                {t.footer.contactTitle}
              </h2>
              <address className="mt-4 space-y-2 text-[0.96rem] not-italic text-navy/85">
                <p>
                  <a href={telHref} className="tnum link-u font-semibold">
                    {site.contact.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${site.contact.email}`} className="link-u break-all">
                    {site.contact.email}
                  </a>
                </p>
                <p className="text-navy/70">
                  {site.contact.addressLine}
                  <br />
                  {site.contact.city}, {site.contact.state} {site.contact.zip}
                </p>
              </address>
              <p className="label mt-4 text-gold-ink">* {t.common.placeholderNote}</p>
            </Reveal>
          </aside>
        </div>
      </div>

      <ClosingCta locale={locale} t={t} />
    </>
  );
}
