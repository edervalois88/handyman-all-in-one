"use client";

/**
 * The offer, as a legend.
 *
 * This exists for one reason: a first-time visitor should be able to answer
 * "what is this company and what can it do for me" without scrolling, reading a
 * paragraph, or guessing. The hero carries the tagline, which is evocative
 * rather than descriptive, so this band states the offer plainly and shows the
 * six categories at a glance.
 *
 * It is deliberately NOT six equal icon cards. The category default is a grid of
 * same-size cards each holding a rounded glyph, a heading and a line of text, and
 * this build refuses it on the record. This is a single ruled legend: six index
 * entries on one line, with hairline rules doing the separating, the service
 * marks at 40px and the count above. Hovering or focusing an entry names what
 * that category actually covers, which is the information a visitor is looking
 * for and the reason the marks are here at all.
 *
 * The marks animate their one working part on hover and focus. They are still
 * otherwise, so a visitor who never points at one is never distracted — and the
 * page keeps its rule of three authored MOMENTS, because an interaction is not an
 * entrance.
 */

import { useState } from "react";
import Link from "next/link";
import { ServiceMark } from "./ServiceMarks";
import { route, type Locale } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

export function WhatWeDo({ locale, t }: { locale: Locale; t: Dict }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="border-b-2 border-navy bg-cream-warm/60 py-10 sm:py-12">
      <div className="shell">
        {/*
         * The anchor statement. Set larger than body copy and given the ruled
         * lane the world uses for anything that must not be skimmed past.
         */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
          <p className="label shrink-0 border-b border-rule-strong pb-1.5 text-ink-soft sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
            {t.whatWeDo.label}
          </p>
          {/*
           * `text-balance` is what stops this ending in a two-word widow at one
           * width and a five-line column at another. The measure is wide enough
           * to read as a sentence rather than as a stack.
           */}
          <p className="display max-w-[54ch] text-balance text-[clamp(1.1rem,1.9vw,1.4rem)] leading-snug text-navy">
            {t.whatWeDo.line}
          </p>
        </div>

        {/*
         * The legend. One ruled list, not a card grid: the rules carry the grid,
         * the marks sit on the baseline of their entry, and the whole thing reads
         * as an index rather than as six brochures.
         */}
        <div className="mt-9 border-t-2 border-navy pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
            <h3 className="label text-navy">{t.whatWeDo.glanceTitle}</h3>
            <p className="label text-ink-soft">{t.whatWeDo.glanceHint}</p>
          </div>

          <ul className="mt-5 grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
            {t.services.categories.map((c, i) => {
              const active = activeId === c.id;
              return (
                <li key={c.id} className="border-t border-rule-strong pt-4 lg:pr-5">
                  <Link
                    href={`${route("services", locale)}#${c.id}`}
                    className="group block"
                    onMouseEnter={() => setActiveId(c.id)}
                    onMouseLeave={() => setActiveId((v) => (v === c.id ? null : v))}
                    onFocus={() => setActiveId(c.id)}
                    onBlur={() => setActiveId((v) => (v === c.id ? null : v))}
                  >
                    <span className="label text-navy/35">
                      {String((i + 1) * 10).padStart(3, "0")}
                    </span>
                    <span
                      className={`mt-2 block transition-colors ${
                        active ? "text-red" : "text-navy"
                      }`}
                    >
                      <ServiceMark id={c.id} size={44} active={active} />
                    </span>
                    <span className="display mt-3 block text-[0.98rem] leading-tight text-navy">
                      {c.short}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/*
           * What the pointed-at entry covers. Held at a fixed minimum height so
           * pointing across the row does not move the page under the reader.
           */}
          <p
            className="mt-5 min-h-[3.2rem] border-t border-dashed border-rule-strong pt-3 text-[0.95rem] leading-relaxed text-navy/80"
            aria-live="polite"
          >
            {activeId
              ? t.services.categories.find((c) => c.id === activeId)?.covers
              : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
