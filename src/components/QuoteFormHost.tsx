"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QuoteForm } from "./QuoteForm";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

/**
 * The quote form, plus the one thing the form cannot know on its own: which
 * services the visitor already picked on the way here.
 *
 * WHY THIS FILE EXISTS. The concise home's tile picker links to
 * `/contact?jobs=repairs,paint`, and something has to read that. The two obvious
 * candidates both cost more than they are worth:
 *
 *   · Reading the `searchParams` PAGE PROP would work, but it is a request-time
 *     API — it opts the whole route into dynamic rendering, and `/contact` is
 *     currently prerendered like every other page here.
 *   · `useSearchParams` is a client hook, so it keeps the route static, but on a
 *     prerendered route it forces the client tree up to the nearest Suspense
 *     boundary to render on the client. Next.js fails the production build
 *     outright when there is no such boundary — and the failure does not appear
 *     in development, where routes render on demand and the hook never suspends.
 *
 * So: one Suspense boundary, here, around the only component that needs the query
 * string. Everything above it still prerenders, and the form arrives a tick later
 * already knowing the visitor's list.
 */

/** The real form, reading the query string. Must be inside the Suspense boundary. */
function FormReadingJobs({ locale }: { locale: Locale }) {
  const params = useSearchParams();
  const jobs = params.get("jobs");

  /*
   * The ids are service CATEGORY ids. They are passed through unvalidated on
   * purpose — QuoteForm matches them against the dictionary and drops anything
   * it does not recognise, which is also what keeps a hand-edited URL from
   * ticking a box that does not exist.
   */
  const initialServices = jobs
    ? jobs
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : undefined;

  return (
    <QuoteForm
      locale={locale}
      t={getDict(locale)}
      initialServices={initialServices}
    />
  );
}

/**
 * The fallback. A skeleton of the real sheet at the real padding and rule weight,
 * so the form arriving does not shift the page under the reader.
 */
function FormSkeleton() {
  return (
    <div className="sheet-raised relative p-5 sm:p-8" aria-hidden="true">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-navy/20 pb-3">
        <span className="block h-7 w-40 bg-navy/10" />
        <span className="block h-4 w-20 bg-navy/10" />
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="block">
            <span className="block h-4 w-24 bg-navy/10" />
            <span className="mt-2 block h-11 w-full border-2 border-navy/15" />
          </span>
        ))}
      </div>
      <div className="mt-7">
        <span className="block h-4 w-32 bg-navy/10" />
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="block h-5 w-full bg-navy/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function QuoteFormHost({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <FormReadingJobs locale={locale} />
    </Suspense>
  );
}
