import Link from "next/link";
import { Logo } from "./Logo";
import { route, site, type Locale, type RouteKey } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

const company: RouteKey[] = ["about", "areas", "contact"];

export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-navy text-cream">
      {/* perforated tear edge, as on a carbon-copy stub */}
      <div className="perf-t bg-navy" aria-hidden="true" />

      <div className="shell py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr]">
          <div>
            <Logo locale={locale} tone="cream" size="md" />
            <p className="mt-5 max-w-[34ch] text-[0.98rem] leading-relaxed text-cream/80">
              {t.footer.blurb}
            </p>
            <p className="display mt-6 text-[1.35rem] leading-snug text-cream/90">
              {t.tagline}
            </p>
            <Link
              href={route("contact", locale)}
              className="btn btn-ink mt-4 w-full sm:w-auto"
            >
              {t.nav.quote}
            </Link>
          </div>

          <nav aria-label={t.footer.companyTitle}>
            <h2 className="label border-b-2 border-cream/25 pb-2 text-cream/70">
              {t.footer.companyTitle}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {company.map((key) => (
                <li key={key}>
                  <Link
                    href={route(key, locale)}
                    className="label-lg text-[0.98rem] text-cream/90 hover:text-white"
                  >
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label border-b-2 border-cream/25 pb-2 text-cream/70">
              {t.footer.areasTitle}
            </h2>
            <ul className="mt-4 space-y-1.5 text-[0.92rem] text-cream/80">
              {site.areas.slice(0, 6).map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p className="label mt-3 max-w-[24ch] leading-relaxed text-gold">
              * {t.areas.note}
            </p>
          </div>

          <div>
            <h2 className="label border-b-2 border-cream/25 pb-2 text-cream/70">
              {t.footer.contactTitle}
            </h2>
            <address className="mt-4 space-y-2 text-[0.95rem] not-italic text-cream/85">
              <p>
                <a href={`tel:${site.contact.phoneHref}`} className="tnum hover:text-white">
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.contact.email}`} className="break-all hover:text-white">
                  {site.contact.email}
                </a>
              </p>
              <p className="text-cream/70">
                {site.contact.addressLine}
                <br />
                {site.contact.city}, {site.contact.state} {site.contact.zip}
              </p>
            </address>

            <h2 className="label mt-7 border-b-2 border-cream/25 pb-2 text-cream/70">
              {t.footer.hoursTitle}
            </h2>
            <ul className="mt-4 space-y-1.5 text-[0.9rem] text-cream/80">
              {site.hours.map((h) => (
                <li key={h.days.en} className="flex justify-between gap-4">
                  <span>{h.days[locale]}</span>
                  <span className="tnum text-right text-cream/70">
                    {typeof h.time === "string" ? h.time : h.time[locale]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/20 pt-6">
          <p className="max-w-[70ch] text-[0.8rem] leading-relaxed text-gold">
            * {t.footer.placeholder}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[0.85rem] text-cream/70">
            <p>
              © {year} {site.nameFull}. {t.footer.rights}
            </p>
            <p className="label text-cream/60">
              {t.tagline} · {site.credentials.license}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
