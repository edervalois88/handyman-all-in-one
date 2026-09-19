import type { Metadata } from "next";
import Link from "next/link";
import { SectionHead, Stamp } from "@/components/ui";
import { ClosingCta } from "@/components/sections";
import { getDict } from "@/lib/i18n";
import { route, site, type Locale } from "@/lib/site";

export function aboutMetadata(locale: Locale): Metadata {
  const t = getDict(locale);
  return {
    title: locale === "es" ? "Nosotros" : "About",
    description: t.about.body.slice(0, 158),
    openGraph: { title: `${t.about.kicker} | ${site.nameFull}`, description: t.about.positioning },
  };
}

export function AboutPage({ locale, t }: { locale: Locale; t: ReturnType<typeof getDict> }) {
  return (
    <>
      <header className="bg-navy py-14 text-cream sm:py-16">
        <div className="shell">
          <SectionHead
            index="—"
            kicker={t.about.kicker}
            title={t.about.title}
            body={t.about.body}
            tone="cream"
          />
        </div>
      </header>

      {/* mission / vision / positioning, as three stamped directives */}
      <section className="border-b-2 border-navy bg-cream py-14 sm:py-16">
        <div className="shell grid gap-px lg:grid-cols-3">
          {[
            { label: t.about.missionLabel, body: t.about.mission },
            { label: t.about.visionLabel, body: t.about.vision },
            { label: t.about.positioningLabel, body: t.about.positioning },
          ].map((b) => (
            <div key={b.label} className="border-t-2 border-navy pt-6 lg:pr-10">
              <span className="label text-red">{b.label}</span>
              <p className="mt-3 text-[1.08rem] leading-relaxed text-navy">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* values, as a control sheet */}
      <section className="ground py-14 sm:py-16">
        <div className="shell">
          <SectionHead
            index="—"
            kicker={t.about.valuesLabel}
            title={locale === "es" ? "Lo que no\nnegociamos." : "What we don't\ntrade away."}
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {t.about.values.map((v, i) => (
              <li key={v.name} className="sheet flex flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="display text-[1.7rem] text-navy">{v.name}</h3>
                  <span className="display text-[2.2rem] leading-none text-navy/15" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="display mt-2 text-[1.15rem] leading-snug text-red">{v.body}</p>
                <p className="mt-4 border-t border-dashed border-rule-strong pt-4 text-[0.97rem] leading-relaxed text-navy/75">
                  {v.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* the operating standard, as a signed checklist */}
      <section className="border-y-2 border-navy bg-cream py-14 sm:py-16">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHead
              index="—"
              kicker={t.about.standardLabel}
              title={locale === "es" ? "Cómo se\nve en la práctica." : "What it looks\nlike in practice."}
            />
            <Stamp tone="red" className="mt-8">
              {t.tagline}
            </Stamp>
          </div>

          <ul className="self-start">
            {t.about.standard.map((s) => (
              <li
                key={s}
                className="flex items-start gap-4 border-b border-rule py-5 text-[1.02rem] leading-relaxed text-navy"
              >
                <span className="box box-on" aria-hidden="true">
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
                    <path
                      d="M1 6.4 4.2 9.6 11 2.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="shell mt-12">
          <div className="flex flex-wrap items-center gap-4">
            <Link href={route("contact", locale)} className="btn btn-primary">
              {t.nav.quote}
            </Link>
            <Link href={route("services", locale)} className="btn btn-line">
              {t.common.allServices}
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta locale={locale} t={t} />
    </>
  );
}
