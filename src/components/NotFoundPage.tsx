import Link from "next/link";
import { LocaleShell } from "./LocaleShell";
import { DEFAULT_LOCALE } from "@/lib/site";
import { getDict } from "@/lib/i18n";

/** Bilingual-aware 404. Served in the default language. */
export function NotFoundPage() {
  const locale = DEFAULT_LOCALE;
  const t = getDict(locale);

  return (
    <LocaleShell locale={locale}>
      <section className="ground flex min-h-[62vh] items-center py-20">
        <div className="shell max-w-[62ch]">
          <span className="stamp stamp-flat text-red">{t.notFound.code}</span>
          <h1 className="display mt-6 text-[clamp(2.4rem,7vw,4.6rem)] text-navy">
            {t.notFound.title}
          </h1>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-navy/75">{t.notFound.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-ink">
              {t.notFound.cta}
            </Link>
            <Link href="/es" className="btn btn-line" hrefLang="es">
              Ir al sitio en español
            </Link>
          </div>
        </div>
      </section>
    </LocaleShell>
  );
}
