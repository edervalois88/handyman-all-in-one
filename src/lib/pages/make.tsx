import type { Metadata } from "next";
import { LocaleShell } from "@/components/LocaleShell";
import { HomePage, homeMetadata } from "./home";
import { ServicesPage, servicesMetadata } from "./services";
import { AreasPage, areasMetadata } from "./areas";
import { AboutPage, aboutMetadata } from "./about";
import { ContactPage, contactMetadata } from "./contact";
import { LOCALIZED_SLUG } from "./routes";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

export { LOCALIZED_SLUG };

/**
 * One page per language. English lives at the root, Spanish under /es; both are
 * fully static, and each route file is two lines that call into here.
 */

export function homePage(locale: Locale) {
  return {
    generateMetadata: (): Metadata => homeMetadata(locale),
    default: function Home() {
      return (
        <LocaleShell locale={locale}>
          <HomePage locale={locale} />
        </LocaleShell>
      );
    },
  };
}

export function servicesPage(locale: Locale) {
  return {
    generateMetadata: (): Metadata => servicesMetadata(locale),
    default: function Services() {
      return (
        <LocaleShell locale={locale}>
          <ServicesPage locale={locale} t={getDict(locale)} />
        </LocaleShell>
      );
    },
  };
}

export function areasPage(locale: Locale) {
  return {
    generateMetadata: (): Metadata => areasMetadata(locale),
    default: function Areas() {
      return (
        <LocaleShell locale={locale}>
          <AreasPage locale={locale} t={getDict(locale)} />
        </LocaleShell>
      );
    },
  };
}

export function aboutPage(locale: Locale) {
  return {
    generateMetadata: (): Metadata => aboutMetadata(locale),
    default: function About() {
      return (
        <LocaleShell locale={locale}>
          <AboutPage locale={locale} t={getDict(locale)} />
        </LocaleShell>
      );
    },
  };
}

export function contactPage(locale: Locale) {
  return {
    generateMetadata: (): Metadata => contactMetadata(locale),
    default: function Contact() {
      return (
        <LocaleShell locale={locale}>
          <ContactPage locale={locale} t={getDict(locale)} />
        </LocaleShell>
      );
    },
  };
}
