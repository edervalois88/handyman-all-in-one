import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { RuleNote, SectionHead } from "@/components/ui";
import { getDict } from "@/lib/i18n";
import { site, telHref, type Locale } from "@/lib/site";

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
              <a href={telHref} className="btn btn-primary mt-5 w-full">
                <span className="tnum">{site.contact.phone}</span>
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="btn btn-line mt-2.5 w-full break-all"
              >
                {site.contact.email}
              </a>
              <p className="label mt-4 leading-relaxed text-gold-ink">
                * {t.common.placeholderNote} —{" "}
                {locale === "es"
                  ? "incluye el tiempo de respuesta prometido."
                  : "includes the promised response time."}
              </p>
            </div>

            <div className="sheet p-6">
              <h2 className="label border-b-2 border-navy/25 pb-2 text-navy/60">
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
              <h2 className="label border-b-2 border-navy/25 pb-2 text-navy/60">
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
