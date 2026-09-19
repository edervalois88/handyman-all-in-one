"use client";

import Link from "next/link";
import { Reveal, RevealItem, RevealList } from "./motion/primitives";
import { RuleNote, SectionHead, Stamp } from "./ui";
import { route, site, telHref, type Locale } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

/* ─────────────────────────── The problem ─────────────────────────── */

export function Problem({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="ground-plain border-y border-rule py-16 sm:py-20 md:py-24">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Reveal>
              <SectionHead
              index="01"
              title={t.problem.title}
              body={t.problem.body}
              tone="ink"
              />
            </Reveal>
            <RuleNote
              lane={locale === "es" ? "En resumen" : "In short"}
              className="mt-8"
            >
              {t.problem.close}
            </RuleNote>
          </div>

          <RevealList className="grid gap-5 self-start">
            {t.problem.alt.map((a, i) => (
              <RevealItem key={a.label} className="sheet flex gap-5 p-5 sm:p-6">
                <div className="shrink-0 border-r border-ink-soft/50 pr-4 text-center">
                  <span className="display block text-[2.2rem] leading-none text-ink-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label mt-2 block text-ink-soft">{a.label}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="display text-[1.35rem] text-navy">{a.title}</h3>
                  <p className="mt-2 max-w-[46ch] text-[0.97rem] leading-relaxed text-navy/75">
                    {a.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealList>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Our solution ─────────────────────────── */

export function Solution({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="ground py-16 sm:py-20 md:py-24">
      <div className="shell">
        <Reveal>
          <SectionHead
          index="02"
          title={t.solution.title}
          body={t.solution.body}
          className="max-w-[62ch]"
          />
        </Reveal>

        <RevealList className="mt-12 grid gap-px md:grid-cols-3">
          {t.solution.points.map((p, i) => (
            <RevealItem key={p.title} className="flex gap-4 border-t-2 border-navy pt-6 md:pr-8">
              <span className="label shrink-0 border-r border-ink-soft/50 pr-4 pt-1.5 text-ink-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="display text-[1.55rem] text-navy">{p.title}</h3>
                <p className="mt-2.5 max-w-[38ch] text-[0.98rem] leading-relaxed text-navy/75">
                  {p.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealList>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link href={route("about", locale)} className="btn btn-line">
            {locale === "es" ? "Cómo trabajamos" : "How we work"}
          </Link>
          <p className="text-[0.95rem] text-navy/70">
            {locale === "es"
              ? "Cada trabajo exige un especialista licenciado en algún punto. Nosotros lo gestionamos."
              : "Every job needs a licensed specialist at some point. We handle that part."}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Service grid ─────────────────────────── */

export function ServiceGrid({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="border-y-2 border-navy bg-cream py-16 sm:py-20 md:py-24">
      <div className="shell">
        <Reveal>
          <SectionHead
          index="03"
          title={t.services.title}
          body={t.services.body}
          className="max-w-[62ch]"
          />
        </Reveal>

        <RevealList className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.categories.map((c) => (
            <RevealItem key={c.id} className="sheet-stack">
              <div className="sheet stub-b flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="display text-[1.4rem] leading-tight text-navy">{c.name}</h3>
                </div>
                <Stamp tone={c.inHouse ? "navy" : "sage"} flat className="mt-3 self-start">
                  {c.inHouse ? t.common.inHouse : t.common.partner}
                </Stamp>
                <p className="mt-4 text-[0.96rem] leading-relaxed text-navy/75">{c.blurb}</p>
                <ul className="mt-5 space-y-2 border-t border-dashed border-rule-strong pt-5">
                  {c.items.slice(0, 4).map((item) => (
                    <li key={item} className="flex gap-2.5 text-[0.93rem] leading-snug text-navy/85">
                      <span className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 bg-red" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  {c.items.length > 4 ? (
                    <p className="label mb-3 text-ink-soft">
                      +{c.items.length - 4} {locale === "es" ? "más" : "more"}
                    </p>
                  ) : null}
                  <Link
                    href={`${route("services", locale)}#${c.id}`}
                    className="label-lg inline-block border-b-2 border-red pb-1 text-navy hover:text-red"
                  >
                    {t.common.learnMore}
                  </Link>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealList>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link href={route("services", locale)} className="btn btn-ink">
            {t.common.allServices}
          </Link>
          <Link href={route("contact", locale)} className="btn btn-primary">
            {t.services.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── How it works ─────────────────────────── */

export function Process({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="bg-navy py-16 text-cream sm:py-20 md:py-24">
      <div className="shell">
        <Reveal>
          <SectionHead
          index="04"
          title={t.process.title}
          body={t.process.body}
          tone="cream"
          />
        </Reveal>

        {/* A live status timeline: the job's own progress, as on a ticket. */}
        <RevealList as="ol" className="mt-12">
          {t.process.steps.map((s) => (
            <RevealItem
              key={s.n}
              className="grid gap-3 border-t border-cream/20 py-6 sm:grid-cols-[4.5rem_minmax(0,1fr)_11rem] sm:items-baseline sm:gap-6"
            >
              <span className="display text-[1.7rem] leading-none text-red">{s.n}</span>
              <div>
                <h3 className="display text-[1.5rem] text-cream">{s.title}</h3>
                <p className="mt-2 max-w-[62ch] text-[0.98rem] leading-relaxed text-cream/75">
                  {s.body}
                </p>
              </div>
              <span className="label justify-self-start border border-cream/30 px-2.5 py-1.5 text-gold-ink sm:justify-self-end">
                {s.meta} <span aria-hidden="true">*</span>
              </span>
            </RevealItem>
          ))}
        </RevealList>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href={route("contact", locale)} className="btn btn-primary">
            {t.nav.quote}
          </Link>
          <a
            href={telHref}
            className="btn border-2 border-cream/45 bg-transparent text-cream shadow-none hover:bg-cream hover:text-navy"
          >
            <span className="tnum">{site.contact.phone}</span>
          </a>
        </div>
        <p className="mt-5 text-[0.78rem] leading-relaxed text-gold-ink">
          * {locale === "es"
            ? "Plazos de ejemplo — reemplazar por los compromisos reales antes de publicar."
            : "Example timelines — replace with the real commitments before launch."}
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────── Comparison ─────────────────────────── */

export function Compare({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="ground py-16 sm:py-20 md:py-24">
      <div className="shell">
        <Reveal>
          <SectionHead
          index="05"
          title={t.compare.title}
          body={t.compare.body}
          />
        </Reveal>

        {/* Wide: a real table, one column per option. */}
        <div className="mt-12 hidden lg:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{t.compare.title}</caption>
            <thead>
              <tr>
                {t.compare.cols.map((c, i) => (
                  <th
                    key={c || "row"}
                    scope="col"
                    className={`label align-bottom ${
                      i === 1
                        ? "bg-transparent px-4 py-3.5 text-cream"
                        : "border-b-2 border-navy/30 px-4 py-3.5 text-ink-soft"
                    }`}
                  >
                    {c || (
                      <span className="sr-only">
                        {locale === "es" ? "Criterio" : "Criterion"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.compare.rows.map((row, ri) => (
                <tr key={row[0]} className={ri % 2 ? "bg-cream-warm/60" : ""}>
                  {row.map((cell, ci) => (
                    <td
                      key={`${row[0]}-${ci}`}
                      className={`px-4 py-3.5 align-top text-[0.95rem] ${
                        ci === 0
                          ? "label border-b border-rule pt-5 text-ink-soft"
                          : ci === 1
                            ? "border-b border-navy/20 bg-navy px-4 text-cream"
                            : "border-b border-rule text-navy/70"
                      }`}
                    >
                      {ci === 1 ? (
                        <span className="flex items-start gap-2.5">
                          <span
                            className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-red"
                            aria-hidden="true"
                          />
                          <span className="font-semibold">{cell}</span>
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Narrow: one sheet per criterion, so all three answers stay on screen
            instead of a scroll box that hides both rivals. */}
        <RevealList className="mt-12 grid gap-5 sm:grid-cols-2 lg:hidden">
          {t.compare.rows.map((row, ri) => (
            <RevealItem key={row[0]} className="sheet-stack">
              <div className="sheet flex h-full flex-col">
                <div className="flex items-baseline gap-3 border-b-2 border-navy/20 px-5 py-3.5">
                  <span className="label tnum text-ink-soft">
                    {String(ri + 1).padStart(2, "0")}
                  </span>
                  <h3 className="label text-navy">{row[0]}</h3>
                </div>

                <div className="bg-navy px-5 py-4">
                  <p className="label text-cream/60">{t.compare.cols[1]}</p>
                  <p className="mt-1.5 flex items-start gap-2.5 text-[1rem] font-semibold text-cream">
                    <span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 bg-red" aria-hidden="true" />
                    {row[1]}
                  </p>
                </div>

                <dl className="mt-auto divide-y divide-dashed divide-rule-strong px-5">
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="label text-ink-soft">{t.compare.cols[2]}</dt>
                    <dd className="text-right text-[0.92rem] text-navy/75">{row[2]}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="label text-ink-soft">{t.compare.cols[3]}</dt>
                    <dd className="text-right text-[0.92rem] text-navy/75">{row[3]}</dd>
                  </div>
                </dl>
              </div>
            </RevealItem>
          ))}
        </RevealList>
      </div>
    </section>
  );
}

/* ─────────────────────────── Service areas ─────────────────────────── */

export function AreasTeaser({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="border-y border-rule bg-cream py-16 sm:py-20 md:py-24">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal>
          <SectionHead index="06" title={t.areas.title} body={t.areas.body} />
        </Reveal>

        <div className="self-start">
          <RevealList className="grid grid-cols-2 gap-px sm:grid-cols-3">
            {site.areas.map((a) => (
              <RevealItem
                key={a}
                className="border-t-2 border-navy/25 px-1 py-3 text-[1rem] text-navy"
              >
                {a}
              </RevealItem>
            ))}
          </RevealList>
          <p className="label mt-4 text-gold-ink">* {t.areas.note}</p>

          <div className="sheet mt-8 p-5 sm:p-6">
            <h3 className="display text-[1.35rem] text-navy">{t.areas.findTitle}</h3>
            <p className="mt-2 text-[0.96rem] leading-relaxed text-navy/75">{t.areas.findBody}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={route("areas", locale)} className="btn btn-ink">
                {t.areas.cta}
              </Link>
              <a href={telHref} className="btn btn-line">
                <span className="tnum">{site.contact.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FAQ ─────────────────────────── */

export function Faq({ t }: { t: Dict }) {
  return (
    <section className="ground py-16 sm:py-20 md:py-24">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
        <Reveal>
          <SectionHead index="07" title={t.faq.title} />
        </Reveal>

        <div className="border-t-2 border-navy">
          {t.faq.items.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i, 5) * 0.04}>
              <details className="group border-b border-rule py-1">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4">
                  <span className="display text-[1.22rem] leading-snug text-navy">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 grid h-6 w-6 shrink-0 place-items-center border-2 border-navy text-navy transition-transform group-open:rotate-45"
                  >
                    <svg viewBox="0 0 12 12" className="h-3 w-3">
                      <path
                        d="M6 1v10M1 6h10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-[68ch] pb-5 text-[0.99rem] leading-relaxed text-navy/80">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Closing CTA ─────────────────────────── */

export function ClosingCta({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="relative overflow-hidden bg-navy text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 hidden h-64 w-64 opacity-[0.18] lg:block"
      >
        <div className="checker h-full w-full" />
      </div>

      <div className="shell relative py-16 sm:py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
          <div>
            <h2 className="display whitespace-pre-line text-[clamp(2.3rem,6.2vw,4.4rem)] text-cream">
              {t.cta.title}
            </h2>
            <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-cream/85">
              {t.cta.body}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={route("contact", locale)} className="btn btn-primary">
                {t.cta.primary}
              </Link>
              <a
                href={telHref}
                className="btn border-2 border-cream/45 bg-transparent text-cream shadow-none hover:bg-cream hover:text-navy"
              >
                {t.cta.secondary.replace("{phone}", site.contact.phone)}
              </a>
            </div>
          </div>

          <ul className="sheet-stack self-start">
            <li className="sheet p-6">
              <p className="label border-b border-rule-strong pb-2 text-ink-soft">
                {locale === "es" ? "Lo que puede esperar" : "What you can expect"}
              </p>
              <ul className="mt-1">
                {t.cta.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3.5 border-b border-dashed border-rule-strong py-3.5 text-[0.98rem] text-navy last:border-b-0"
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
                    <span className="font-semibold">{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.78rem] leading-relaxed text-gold-ink">
                * {locale === "es"
                  ? "Cifras y plazos de ejemplo — reemplazar por los reales antes de publicar."
                  : "Example figures and timelines — replace with the real ones before launch."}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}