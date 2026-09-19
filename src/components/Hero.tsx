import Link from "next/link";
import { PromiseRow, Stamp, TicketField } from "./ui";
import { route, site, telHref, type Locale } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

/**
 * First viewport. A navy work-order panel carries the promise and the single
 * primary action; the cream job ticket overlaps it, so the visitor's first
 * impression is the artifact this whole design world is built from.
 */
export function Hero({ locale, t }: { locale: Locale; t: Dict }) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="shell relative pb-12 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-14">
          {/* ── left: the promise ─────────────────────────────────────── */}
          <div className="reveal">
            <div className="flex flex-wrap items-center gap-3">
              <span className="label border-b-2 border-cream/30 pb-1 text-cream/75">
                {t.hero.kicker}
              </span>
              <Stamp tone="red" flat>
                {t.hero.ticketNo}
              </Stamp>
            </div>

            <h1 className="display mt-6 whitespace-pre-line text-[clamp(2.55rem,8.6vw,6.2rem)] text-cream">
              {t.hero.title}
            </h1>

            <p className="label-lg mt-5 text-[1.15rem] text-red sm:text-[1.35rem]">
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
          <div className="relative reveal lg:-mb-8">
            <div
              aria-hidden="true"
              className="sheet absolute -left-3 -top-3 hidden h-full w-full rotate-[-1.1deg] opacity-50 lg:block"
            />
            <div className="sheet-raised relative">
              <div className="flex items-center justify-between gap-4 border-b-2 border-navy/20 px-5 py-4 sm:px-7">
                <h2 className="display text-[1.5rem] text-navy">{t.hero.ticketTitle}</h2>
                <span className="label text-navy/50">{t.hero.ticketNo}</span>
              </div>

              <div className="px-5 sm:px-7">
                {t.hero.ticketFields.map(([label, value]) => (
                  <TicketField key={label} label={label} value={value} />
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-navy/20 px-5 py-5 sm:px-7">
                <Stamp tone="red">{t.hero.ticketStamp}</Stamp>
                <p className="label text-navy/50">
                  {locale === "es" ? "Precio aprobado antes de empezar" : "Priced before we start"}
                </p>
              </div>
            </div>
          </div>
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
