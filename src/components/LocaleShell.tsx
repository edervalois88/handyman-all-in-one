import { Header } from "./Header";
import { Preloader } from "./Preloader";
import { Footer } from "./Footer";
import { getDict } from "@/lib/i18n";
import { site, type Locale } from "@/lib/site";

/**
 * Chrome shared by both languages. A plain component rather than a route-group
 * layout so the document element can carry the correct `lang` per language.
 */
export function LocaleShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = getDict(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.nameFull,
    slogan: t.tagline,
    description:
      "Home repair and maintenance company. Small-to-mid-sized home projects handled by a qualified in-house crew, with licensed trade partners when required.",
    url: site.contact.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.addressLine,
      addressLocality: site.contact.city,
      addressRegion: site.contact.state,
      postalCode: site.contact.zip,
    },
    areaServed: site.areas.map((a) => ({ "@type": "City", name: a })),
    knowsLanguage: ["en", "es"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "15:00",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Structured data must be raw JSON in the document, not an escaped string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Preloader />
      <Header locale={locale} t={t} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
