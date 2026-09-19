import type { Metadata } from "next";
import Link from "next/link";
import { RuleNote, SectionHead, Stamp } from "@/components/ui";
import { ClosingCta } from "@/components/sections";
import { getDict } from "@/lib/i18n";
import { route, site, telHref, type Locale } from "@/lib/site";

export function servicesMetadata(locale: Locale): Metadata {
  const t = getDict(locale);
  return {
    title: locale === "es" ? "Servicios" : "Services",
    description:
      locale === "es"
        ? "Reparaciones del día a día, plomería y electricidad dentro del alcance de handyman, carpintería, pintura, exterior y seguridad — más la lista clara de cuándo traemos un socio licenciado."
        : "Everyday repairs, handyman-scope plumbing and electrical, carpentry, painting, exterior and safety work — plus the plain list of when we bring a licensed trade partner.",
    openGraph: { title: `${t.nav.services} | ${site.nameFull}`, description: t.services.body },
  };
}

export function ServicesPage({ locale, t }: { locale: Locale; t: ReturnType<typeof getDict> }) {
  return (
    <>
      <header className="bg-navy py-14 text-cream sm:py-16">
        <div className="shell">
          <SectionHead title={t.services.title} body={t.services.body} tone="cream" />
        </div>
      </header>

      {/* jump list, laid out as a ticket index */}
      <nav aria-label={t.nav.services} className="border-b-2 border-navy bg-cream">
        <div className="shell flex flex-wrap gap-x-6 gap-y-2 py-4">
          {t.services.categories.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="label-lg text-[0.92rem] text-navy hover:text-red"
            >
              <span className="tnum text-navy/40">{String(i + 1).padStart(2, "0")}</span>{" "}
              {c.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="ground py-14 sm:py-16">
        <div className="shell space-y-14">
          {t.services.categories.map((c, i) => (
            <section key={c.id} id={c.id} className="scroll-mt-28">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <div className="flex items-center gap-3">
                    <span className="display text-[2.6rem] leading-none text-navy/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Stamp tone="navy" flat>
                      {c.inHouse ? t.common.inHouse : t.common.partner}
                    </Stamp>
                  </div>
                  <h2 className="display mt-4 text-[clamp(1.9rem,4.4vw,2.9rem)] text-navy">
                    {c.name}
                  </h2>
                  <p className="mt-4 max-w-[46ch] text-[1rem] leading-relaxed text-navy/75">
                    {c.blurb}
                  </p>
                  <Link href={route("contact", locale)} className="btn btn-primary mt-6">
                    {t.services.cta}
                  </Link>
                </div>

                <div>
                  <h3 className="label border-b-2 border-navy/25 pb-2 text-navy/60">
                    {t.common.included}
                  </h3>
                  <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {c.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-[0.97rem] leading-snug text-navy/85"
                      >
                        <span
                          className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-red"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {c.boundary.length > 0 ? (
                    <RuleNote
                      lane={t.common.notIncluded}
                      tone="gold"
                      className="mt-8"
                    >
                      <ul className="space-y-2">
                        {c.boundary.map((b) => (
                          <li key={b} className="flex gap-2.5 leading-snug">
                            <span aria-hidden="true" className="mt-[0.1rem] font-bold text-gold">
                              →
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </RuleNote>
                  ) : null}
                </div>
              </div>
            </section>
          ))}

          {/* the licensed-partner boundary, made explicit */}
          <section id="licensed" className="scroll-mt-28 border-t-2 border-navy pt-12">
            <SectionHead
              
              title={t.services.boundaryTitle}
              body={t.services.boundaryBody}
            />

            <ul className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {t.services.licensedItems.map((li) => (
                <li key={li.name} className="border-t-2 border-navy/25 pt-5 sm:pr-6">
                  <Stamp tone="gold" flat>
                    {li.who}
                  </Stamp>
                  <h3 className="display mt-3 text-[1.3rem] leading-tight text-navy">{li.name}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-navy/75">{li.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href={route("contact", locale)} className="btn btn-primary">
                {t.nav.quote}
              </Link>
              <a href={telHref} className="btn btn-line">
                <span className="tnum">{site.contact.phone}</span>
              </a>
            </div>
          </section>
        </div>
      </div>

      <ClosingCta locale={locale} t={t} />
    </>
  );
}
