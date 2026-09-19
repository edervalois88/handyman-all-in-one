"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { altPath, route, site, telHref, type Locale, type RouteKey } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

const NAV: RouteKey[] = ["services", "areas", "about", "contact"];

export function Header({ locale, t }: { locale: Locale; t: Dict }) {
  const pathname = usePathname() || route("home", locale);
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const other = altPath(pathname);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("noscroll", open);
    return () => document.body.classList.remove("noscroll");
  }, [open]);

  return (
    <>
      <a href="#main" className="skip label">
        {t.nav.skip}
      </a>

      {/* utility strip: the one place the phone number always lives */}
      <div className="bg-navy text-cream">
        <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
          <p className="label flex items-center gap-2 text-cream/85">
            <span className="live-dot" aria-hidden="true" />
            {locale === "es"
              ? "Contestamos en horario laboral"
              : "We answer during business hours"}
            <span className="text-gold" aria-hidden="true">
              *
            </span>
          </p>
          <div className="flex items-center gap-3 text-[0.82rem]">
            <a href={telHref} className="label text-cream hover:text-white">
              {t.nav.call}: <span className="tnum tracking-normal">{site.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-rule transition-shadow ${
          stuck ? "shadow-lift-2" : ""
        }`}
        style={{ backgroundColor: "var(--paper)" }}
      >
        <div className="shell flex items-center justify-between gap-3 py-3">
          <Logo locale={locale} size="sm" />

          <nav aria-label={locale === "es" ? "Principal" : "Primary"} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV.map((key) => {
                const href = route(key, locale);
                const active =
                  pathname === href || (key !== "home" && pathname.startsWith(href));
                return (
                  <li key={key}>
                    <Link
                      href={href}
                      className={`label-lg text-[0.95rem] transition-colors ${
                        active ? "text-red" : "text-navy hover:text-red"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {t.nav[key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={other}
              hrefLang={locale === "es" ? "en" : "es"}
              aria-label={t.meta.switchAria}
              className="label-lg hidden rounded-sm border-2 border-navy/25 px-2.5 py-1.5 text-[0.78rem] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-cream sm:inline-block"
            >
              {t.meta.switchTo}
            </Link>

            <a
              href={telHref}
              className="btn btn-ink hidden px-4 py-3 text-[0.85rem] sm:inline-flex"
            >
              {t.nav.call}
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="label-lg flex items-center gap-2 rounded-sm border-2 border-navy/25 px-3 py-2 text-[0.72rem] text-navy lg:hidden"
            >
              {open ? t.nav.close : t.nav.menu}
              <span aria-hidden="true" className="flex flex-col gap-[3px]">
                <span className="block h-[2px] w-3.5 bg-navy" />
                <span className="block h-[2px] w-3.5 bg-navy" />
                <span className="block h-[2px] w-3.5 bg-navy" />
              </span>
            </button>
          </div>
        </div>

        {open ? (
          <div id="mobile-nav" className="border-t-2 border-navy/15 bg-cream lg:hidden">
            <nav
              aria-label={locale === "es" ? "Principal" : "Primary"}
              className="shell py-3"
            >
              <ul className="divide-y divide-navy/10">
                {(["home", ...NAV] as RouteKey[]).map((key) => {
                  const href = route(key, locale);
                  const active = pathname === href;
                  return (
                    <li key={key}>
                      <Link
                        href={href}
                        className={`label-lg block py-3.5 text-[1.05rem] ${
                          active ? "text-red" : "text-navy"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {t.nav[key]}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="flex flex-col gap-2.5 pt-4 pb-2">
                <a href={telHref} className="btn btn-primary w-full">
                  {t.nav.call}
                </a>
                <Link href={route("contact", locale)} className="btn btn-line w-full">
                  {t.nav.quote}
                </Link>
                <Link href={other} className="btn btn-line w-full" hrefLang={locale === "es" ? "en" : "es"}>
                  {t.meta.switchTo}
                </Link>
              </div>
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}
