import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { RuleNote, SectionHead } from "@/components/ui";
import { SiteIcon } from "@/components/SiteIcons";
import { getDict } from "@/lib/i18n";
import { mailHref, site, telHref, type Locale } from "@/lib/site";

export function contactMetadata(locale: Locale): Metadata {
  const t = getDict(locale);
  return {
    title: locale === "es" ? "Solicitar cotización" : "Request a quote",
    description: t.contact.body,
    openGraph: { title: `${t.nav.contact} | ${site.nameFull}`, description: t.contact.body },
  };
}

export function ContactPage({ locale, t }: { locale: Locale; t: ReturnType<typeof getDict> }) {
  return (
    <>
      <header className="bg-navy py-14 text-cream sm:py-16">
        <div className="shell">
          <SectionHead title={t.contact.title} body={t.contact.body} tone="cream" />
        </div>
      </header>

      <div className="ground py-14 sm:py-16">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-14">
          <QuoteForm locale={locale} t={t} />

          <aside className="space-y-6 self-start">
            <div className="sheet p-6">
              <h2 className="display text-[1.6rem] text-navy">{t.contact.asideTitle}</h2>
              <p className="mt-2 text-[0.96rem] leading-relaxed text-navy/75">
                {t.contact.asideBody}
                <span className="text-gold-ink" aria-hidden="true">
                  {" "}
                  *
                </span>
              </p>
              {/*
               * Icons earn their place here and almost nowhere else on the site:
               * this is the block people scan for one specific detail, and a glyph
               * in front of each one turns four lines of text into four findable
               * things. They are hidden from assistive tech because the label
               * beside them already says it.
               */}
              <ul className="mt-5 space-y-3">
                <li className="flex items-center gap-3 border-t border-rule pt-3">
                  <SiteIcon name="phone" className="shrink-0 text-red" />
                  <a
                    href={telHref}
                    className="tnum text-[1.05rem] font-bold text-navy hover:text-red"
                  >
                    {site.contact.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 border-t border-rule pt-3">
                  <SiteIcon name="mail" className="shrink-0 text-red" />
                  <a href={mailHref} className="break-all text-[1rem] text-navy hover:text-red">
                    {site.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 border-t border-rule pt-3">
                  <SiteIcon name="pin" className="mt-0.5 shrink-0 text-red" />
                  <span className="text-[0.96rem] leading-relaxed text-navy/85">
                    {site.contact.addressLine}
                    <br />
                    {site.contact.city}, {site.contact.state} {site.contact.zip}
                  </span>
                </li>
              </ul>
              <p className="label mt-4 leading-relaxed text-gold-ink">
                * {t.common.placeholderNote} —{" "}
                {locale === "es"
                  ? "incluye el tiempo de respuesta prometido."
                  : "includes the promised response time."}
              </p>
            </div>

            <div className="sheet p-6">
              <h2 className="label flex items-center gap-2.5 border-b-2 border-navy/25 pb-2 text-ink-soft">
                <SiteIcon name="clock" size={17} className="text-navy" />
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
            </div>

            <div className="sheet p-6">
              <h2 className="label flex items-center gap-2.5 border-b-2 border-navy/25 pb-2 text-ink-soft">
                <SiteIcon name="house" size={17} className="text-navy" />
                {t.contact.areasTitle}
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-navy/75">
                {t.contact.areasBody}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.areas.map((a) => (
                  <li
                    key={a}
                    className="label border border-navy/25 px-2 py-1 text-[0.72rem] text-navy/80"
                  >
                    {a}
                  </li>
                ))}
              </ul>
              <p className="label mt-4 text-gold-ink">* {t.common.placeholderNote}</p>
            </div>

            <RuleNote lane={t.footer.contactTitle}>
              <address className="not-italic leading-relaxed">
                {site.contact.addressLine}
                <br />
                {site.contact.city}, {site.contact.state} {site.contact.zip}
              </address>
              <p className="label mt-3 text-gold-ink">
                {site.credentials.license} · * {t.common.placeholderNote}
              </p>
            </RuleNote>
          </aside>
        </div>
      </div>
    </>
  );
}
