"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { PromiseRow, Stamp, TicketField } from "./ui";
import SplitFlapText from "./reactbits/SplitFlapText";
import { EASE_OUT } from "./motion/primitives";
import { route, site, telHref, type Locale } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

/**
 * First viewport. A navy work-order panel carries the promise and the single
 * primary action; the cream job ticket overlaps it, so the visitor's first
 * impression is the artifact this whole design world is built from.
 *
 * The site's one authored motion moment lives here, orchestrated by Motion (the
 * library formerly called Framer Motion): the ticket FEEDS INTO the panel and
 * its stamp STRIKES once just after it lands. It replaces what used to be CSS
 * keyframes, so there is exactly one animation authority on the site rather
 * than two. Motion's own `useReducedMotion` disables both.
 */
export function Hero({ locale, t }: { locale: Locale; t: Dict }) {
  const statusIndex = t.hero.ticketFields.findIndex(
    ([, value]) => value === t.hero.ticketStatus,
  );

  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="shell relative pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-14">
          {/* ── left: the promise ─────────────────────────────────────── */}
          <div>
            <Stamp tone="red" flat>
              {t.hero.ticketNo} · {t.common.inHouse}
            </Stamp>

            <h1 className="display mt-6 whitespace-pre-line text-[clamp(2.55rem,8.6vw,6.2rem)] text-cream">
              {t.hero.title}
            </h1>

            {/* Workwear Red on Warm Cream is 4.11:1, which clears WCAG AA for large
                text but not for body size. Setting this line bold at >=1.17rem keeps
                it large text — so the brand's red survives here without a compromise. */}
            <p className="label-lg mt-5 text-[1.17rem] font-bold text-red sm:text-[1.4rem]">
              {t.hero.sub}
            </p>

            <p className="mt-6 max-w-[54ch] text-[1.03rem] leading-relaxed text-cream/85">
              {t.hero.body}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={route("contact", locale)} className="btn btn-primary">
                {t.hero.ctaPrimary}
              </Link>
              <Link
                href={route("services", locale)}
                className="btn border-2 border-cream/40 bg-transparent text-cream shadow-none hover:bg-cream/10"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <p className="mt-6 text-[0.95rem] text-cream/70">
              {locale === "es" ? "O llámenos: " : "Or call "}
              <a
                href={telHref}
                className="tnum font-bold text-cream underline decoration-red decoration-2 underline-offset-4"
              >
                {site.contact.phone}
              </a>
            </p>
          </div>

          {/* ── right: the job ticket, overlapping the panel ──────────── */}
          <motion.div
            className="relative lg:-mb-8"
            initial={{ opacity: 0, x: 28, y: -16, rotate: -2.6 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            transition={{ duration: 0.72, ease: EASE_OUT }}
          >
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
                    /* The status field is the board the office would actually have on
                       the wall, cycling through the states a job passes through:
                       React Bits' SplitFlapText, re-skinned flat onto this world's
                       paper and ink. */
                    <div key={label} className="field-row">
                      <span className="label text-ink-soft">{label}</span>
                      <SplitFlapText
                        words={[...t.hero.ticketStatusCycle]}
                        padTo={0}
                        gap={2}
                        fontSize={13}
                        flipDuration={0.1}
                        stagger={0.05}
                        cycleDelay={2600}
                        charset="alpha"
                        flipsPerChar={5}
                        tileColor="var(--navy)"
                        textColor="var(--cream)"
                      />
                    </div>
                  ) : (
                    <TicketField key={label} label={label} value={value} />
                  ),
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-navy/20 px-5 py-5 sm:px-7">
                <motion.span
                  className="inline-flex"
                  initial={{ opacity: 0, scale: 1.45, filter: "blur(5px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.34, ease: EASE_OUT, delay: 0.5 }}
                >
                  <Stamp tone="red">{t.hero.ticketStamp}</Stamp>
                </motion.span>
                <p className="label text-ink-soft">
                  {locale === "es" ? "Precio aprobado antes de empezar" : "Priced before we start"}
                </p>
              </div>

              {/* the ticket is authored demonstration data, and says so */}
              <p className="border-t border-dashed border-rule-strong px-5 py-3 text-[0.75rem] leading-relaxed text-gold-ink sm:px-7">
                * {t.common.syntheticNote} — {locale === "es"
                  ? "no es un cliente real ni precios reales."
                  : "not a real customer and not real pricing."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* the brand book's navy/cream checkerboard, closing the panel */}
      <div aria-hidden="true" className="checker h-10 w-full opacity-25 sm:h-12" />
    </section>
  );
}

/** The four-beat brand promise, given its own band so it reads as a pledge. */
export function PromiseBand({ t }: { t: Dict }) {
  return (
    <section className="border-b-2 border-navy bg-cream py-12 sm:py-14">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 className="display text-[clamp(1.6rem,3.4vw,2.4rem)] text-navy">
            {t.promise.title}
          </h2>
          <p className="max-w-[46ch] text-[0.95rem] leading-relaxed text-navy/70">
            {t.promise.body}
          </p>
        </div>
        <div className="mt-9">
          <PromiseRow items={t.promise.items} tone="ink" />
        </div>
      </div>
    </section>
  );
}
