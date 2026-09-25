"use client";

/**
 * The concise home page's blocks.
 *
 * THE BUDGET, and why this file exists at all. The long-form home measured 1,411
 * words over 8,960px — about seven minutes of reading, when the client asked for
 * under thirty seconds. At roughly 200 words a minute that leaves about 200 words
 * for the whole page including labels and buttons.
 *
 * So the rule these blocks follow: the home page ANSWERS, the inner pages
 * EXPLAIN. Every block that was doing explanatory work moved to the page that
 * owns it — service detail to /services, the process to /about, the remaining
 * questions to /contact — and what is left here is the shortest true statement of
 * each idea. Six blocks, five of them interactive or visual, and no paragraph
 * longer than two lines.
 *
 * Nothing here is a truncation of the long copy. Truncated copy reads like
 * truncated copy. Each block was rewritten to say the one thing it has to say.
 */

import { useState } from "react";
import Link from "next/link";
import { ServiceMark } from "./ServiceMarks";
import { Stamp, TicketField } from "./ui";
import { StatusBoard } from "./StatusBoard";
import { route, site, telHref, type Locale } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

/* ─────────────────────────────────────────────────────────────────────────────
   1. The service tiles — the page's main interactive piece.

   Six tiles, each a service category. Tapping one selects it and the walker on
   that tile takes a step; the count updates and the action changes to carry it.
   Selection is real state, not decoration: the chosen categories are passed to
   the quote form, so a visitor who taps three tiles arrives at the form with
   those three already ticked. That is the whole point of the interaction — it
   shortens the path instead of adding a step to it.
   ───────────────────────────────────────────────────────────────────────────── */

export function ServiceTiles({
  locale,
  t,
  selected,
  onToggle,
}: {
  locale: Locale;
  t: Dict;
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <section className="border-b-2 border-navy bg-cream py-10 sm:py-12">
      <div className="shell">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h2 className="display text-[clamp(1.5rem,3.2vw,2.2rem)] text-navy">
            {t.concise.tilesTitle}
          </h2>
          <p className="label text-ink-soft">{t.concise.tilesHint}</p>
        </div>

        <ul className="mt-7 grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
          {t.services.categories.map((c, i) => {
            const on = selected.includes(c.id);
            return (
              <li key={c.id} className="border-t-2 border-navy/20 pt-4 lg:pr-5">
                <button
                  type="button"
                  onClick={() => onToggle(c.id)}
                  aria-pressed={on}
                  className="group block w-full text-left"
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className={`label ${on ? "text-red" : "text-navy/35"}`}>
                      {String((i + 1) * 10).padStart(3, "0")}
                    </span>
                    {/*
                     * The tick is the selection state. It replaces nothing — the
                     * mark itself changes colour — but a visible state marker is
                     * what makes this read as a control rather than a link.
                     */}
                    <span
                      aria-hidden="true"
                      className={`grid h-4 w-4 place-items-center rounded-[2px] border-2 transition-colors ${
                        on ? "border-red bg-red text-cream" : "border-navy/25 text-transparent"
                      }`}
                    >
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
                  </span>

                  <span
                    className={`mt-1 block transition-colors ${on ? "text-red" : "text-navy"}`}
                  >
                    {/*
                     * 56, not the 44 this started at. On the long home's legend
                     * the mark is a mark in a ruled list of six and 44 is right;
                     * here each mark heads a TILE the width of a column, and at
                     * 44 it occupied a fifth of its own tile and read as a
                     * footnote to the number above it. The row of six is the
                     * page's main piece of iconography, so it is sized like one.
                     */}
                    <ServiceMark id={c.id} size={56} active={on} />
                  </span>
                  <span className="display mt-4 block text-[0.98rem] leading-tight text-navy">
                    {c.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-rule pt-5">
          <Link
            href={`${route("contact", locale)}${
              selected.length ? `?jobs=${selected.join(",")}` : ""
            }`}
            className="btn btn-primary"
          >
            {selected.length
              ? t.concise.pickerCta.replace("{n}", String(selected.length))
              : t.concise.pickerEmpty}
          </Link>
          <Link href={route("services", locale)} className="btn btn-line">
            {t.concise.tilesCta}
          </Link>
          {selected.length ? (
            <span className="label text-ink-soft">
              {selected.length} {t.concise.pickerSelected}
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. The problem, said once.

   The long home gave this 138 words across three cards explaining why chasing
   contractors is tiring — to an audience that already knows, because that is why
   they are on the page. One line, three tags, done.
   ───────────────────────────────────────────────────────────────────────────── */

export function ProblemLine({ t }: { t: Dict }) {
  return (
    <section className="border-b border-rule bg-cream-warm/60 py-10 sm:py-12">
      <div className="shell grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14">
        <p className="display text-balance text-[clamp(1.25rem,2.6vw,1.9rem)] leading-snug text-navy">
          {t.concise.problem}
        </p>
        <ul className="flex flex-wrap gap-2.5">
          {t.concise.problemTags.map((tag) => (
            <li
              key={tag}
              className="label border-2 border-navy/20 px-3 py-2 text-navy/70"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. Three steps, in one row.

   The long version ran five rows of prose. Steps 2 and 5 of that version were
   detail — what a walkthrough is, what a warranty covers — and detail is what the
   inner pages are for. Three steps fit on one line and still say the whole shape
   of the transaction: you send a list, you get one price, we finish it.
   ───────────────────────────────────────────────────────────────────────────── */

export function StepsRow({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="bg-navy py-12 text-cream sm:py-14">
      <div className="shell">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h2 className="display text-[clamp(1.5rem,3.2vw,2.2rem)] text-cream">
            {t.concise.stepsTitle}
          </h2>
          <Link
            href={route("about", locale)}
            className="label-lg border-b-2 border-red pb-1 text-cream hover:text-red"
          >
            {t.concise.stepsCta}
          </Link>
        </div>

        <ol className="mt-8 grid gap-px sm:grid-cols-3">
          {t.concise.steps.map((s) => (
            <li key={s.n} className="border-t-2 border-cream/25 pt-5 sm:pr-8">
              <span className="display text-[2.4rem] leading-none text-red">{s.n}</span>
              <h3 className="display mt-3 text-[1.35rem] text-cream">{s.title}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-cream/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. The promise, as four stamps.

   The four beats are the brand book's own and the page's strongest content, so
   they stay — but as four lines, not as four paragraphs. Nothing animates: the
   page already has the ticket, the tiles and the status board, and a fourth
   moving thing would be noise.
   ───────────────────────────────────────────────────────────────────────────── */

export function PromiseStamps({ t }: { t: Dict }) {
  return (
    <section className="border-b-2 border-navy bg-cream py-10 sm:py-12">
      <div className="shell">
        <h2 className="display text-[clamp(1.4rem,3vw,2rem)] text-navy">
          {t.concise.promise}
        </h2>
        <ul className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.promise.items.map((it) => (
            <li key={it.n} className="flex items-baseline gap-3 border-t-2 border-navy/20 pt-4">
              <span className="label shrink-0 text-red">{it.n}</span>
              <span className="display text-[1.15rem] leading-tight text-navy">{it.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. Three questions, answered in a line.

   Accordions, because the answers are reference material rather than reading —
   and they are shut by default so the page stays short for someone who does not
   need them. The other five questions live on /contact, which is where someone
   who wants to read eight answers is already heading.
   ───────────────────────────────────────────────────────────────────────────── */

export function FaqShort({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="ground py-10 sm:py-12">
      <div className="shell grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
        <div>
          <h2 className="display text-[clamp(1.4rem,3vw,2rem)] text-navy">
            {t.concise.faqTitle}
          </h2>
          <Link
            href={route("contact", locale)}
            className="label-lg mt-4 inline-block border-b-2 border-red pb-1 text-navy hover:text-red"
          >
            {t.concise.faqAll}
          </Link>
        </div>
        <div className="border-t-2 border-navy">
          {t.concise.faq.map((item) => (
            <details key={item.q} className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4">
                <span className="display text-[1.15rem] text-navy">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="grid h-6 w-6 shrink-0 place-items-center border-2 border-navy text-navy transition-transform group-open:rotate-45"
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
              <p className="max-w-[62ch] pb-4 text-[0.97rem] leading-relaxed text-navy/80">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   6. Coverage and the close, in one band.

   These were two separate sections running to 152 words between them. Coverage
   needs a list, not an argument; the close needs one line and a phone number.
   ───────────────────────────────────────────────────────────────────────────── */

export function AreasAndClose({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="border-t-2 border-navy bg-cream py-10 sm:py-12">
      <div className="shell">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h2 className="display text-[clamp(1.4rem,3vw,2rem)] text-navy">
            {t.concise.areasTitle}
          </h2>
          <Link
            href={route("areas", locale)}
            className="label-lg border-b-2 border-red pb-1 text-navy hover:text-red"
          >
            {t.concise.areasCta}
          </Link>
        </div>

        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {site.areas.map((a) => (
            <li key={a} className="display text-[1.05rem] text-navy/80">
              {a}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-col gap-5 border-t-2 border-navy pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="display text-[clamp(1.5rem,3.4vw,2.3rem)] text-navy">
              {t.cta.title.replace(/\n/g, " ")}
            </p>
            <p className="mt-1.5 text-[0.97rem] text-navy/70">{t.tagline}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={route("contact", locale)} className="btn btn-primary">
              {t.cta.primary}
            </Link>
            <a href={telHref} className="btn btn-line">
              <span className="tnum">{site.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   THE PAGE.

   One client component owns the selection state, because two separate blocks read
   from it: the tiles set it, and the action that carries the count consumes it.
   Splitting them into independent components would have meant two sources of
   truth for one fact.
   ───────────────────────────────────────────────────────────────────────────── */

export function ConciseHome({ locale, t }: { locale: Locale; t: Dict }) {
  const [selected, setSelected] = useState<string[]>([]);

  const onToggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <>
      <ConciseHero locale={locale} t={t} />
      <ServiceTiles locale={locale} t={t} selected={selected} onToggle={onToggle} />
      <PromiseStamps t={t} />
      <ProblemLine t={t} />
      <StepsRow locale={locale} t={t} />
      <FaqShort locale={locale} t={t} />
      <AreasAndClose locale={locale} t={t} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   THE FIRST VIEWPORT.

   Same world as the long home — navy panel, the job ticket overlapping it, the
   status board, the stamp — with the argument cut from 90 words to 34. The ticket
   is kept because it does more explaining per word than any paragraph on the page:
   it shows a price, an approval and a schedule in one glance.
   ───────────────────────────────────────────────────────────────────────────── */

function ConciseHero({ locale, t }: { locale: Locale; t: Dict }) {
  const statusIndex = t.hero.ticketFields.findIndex(
    ([, value]) => value === t.hero.ticketStatus,
  );

  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="shell relative pb-12 pt-12 sm:pb-16 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-14">
          <div>
            <Stamp tone="red" flat>
              {t.hero.ticketNo} · {t.common.inHouse}
            </Stamp>

            <h1 className="display mt-6 whitespace-pre-line text-[clamp(2.55rem,8.6vw,5.6rem)] text-cream">
              {t.hero.title}
            </h1>

            <p className="label-lg mt-5 text-[1.17rem] font-bold text-red sm:text-[1.4rem]">
              {t.hero.sub}
            </p>

            {/* one line, where the long home spent a paragraph */}
            <p className="mt-6 max-w-[42ch] text-[1.02rem] leading-relaxed text-cream/85">
              {t.concise.heroLine}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={route("contact", locale)} className="btn btn-primary">
                {t.hero.ctaPrimary}
              </Link>
              <a
                href={telHref}
                className="btn border-2 border-cream/40 bg-transparent text-cream shadow-none hover:bg-cream/10"
              >
                <span className="tnum">{site.contact.phone}</span>
              </a>
            </div>
          </div>

          <div className="relative lg:-mb-8">
            <div
              aria-hidden="true"
              className="sheet absolute -left-3 -top-3 hidden h-full w-full rotate-[-1.1deg] opacity-50 lg:block"
            />
            <div className="sheet-raised relative">
              <div className="flex items-center justify-between gap-4 border-b-2 border-navy/20 px-5 py-4 sm:px-7">
                <h2 className="display text-[1.5rem] text-navy">{t.hero.ticketTitle}</h2>
                <span className="label text-ink-soft">{t.hero.ticketNo}</span>
              </div>

              <div className="px-5 sm:px-7">
                {t.hero.ticketFields.map(([label, value], i) =>
                  i === statusIndex ? (
                    <div
                      key={label}
                      className="field-row"
                      style={{ containerType: "inline-size", containerName: "board" }}
                    >
                      <span className="label text-ink-soft">{label}</span>
                      <StatusBoard
                        full={t.hero.ticketStatusCycle}
                        short={t.hero.ticketStatusCycleShort}
                      />
                    </div>
                  ) : (
                    <TicketField key={label} label={label} value={value} />
                  ),
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-navy/20 px-5 py-5 sm:px-7">
                <Stamp tone="red">{t.hero.ticketStamp}</Stamp>
                <p className="label text-ink-soft">
                  {locale === "es" ? "Precio aprobado antes de empezar" : "Priced before we start"}
                </p>
              </div>

              <p className="border-t border-dashed border-rule-strong px-5 py-3 text-[0.75rem] leading-relaxed text-gold-ink sm:px-7">
                * {t.common.syntheticNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="checker h-10 w-full opacity-25 sm:h-12" />
    </section>
  );
}
