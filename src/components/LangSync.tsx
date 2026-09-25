"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, localeFromPath } from "@/lib/site";

/**
 * Sets the document's `lang` to match the route.
 *
 * WHY THIS IS A CLIENT COMPONENT, WHICH IS NOT THE OBVIOUS ANSWER.
 *
 * This site is bilingual, and `<html lang>` is absent on every route — which WCAG
 * 3.1.1 requires and which means a screen reader reads the whole Spanish page
 * with English pronunciation. On a site whose differentiator IS the Spanish, that
 * is the most serious defect in the build.
 *
 * The correct place to fix it is the root layout, since only a root layout can
 * render `<html>`. Three ways to get the locale in there, and two of them are
 * disproportionate to one attribute:
 *
 *   · Separate root layouts via route groups — `app/(en)/layout.tsx` and
 *     `app/(es)/layout.tsx`. Correct, and it would also cover a visitor with
 *     JavaScript disabled. But it means moving all fifteen route files, splitting
 *     the one shared layout in two, and accepting a FULL PAGE RELOAD on every
 *     language switch instead of a client-side navigation. That last part is a
 *     real regression in the one interaction this site is built around.
 *   · A `[locale]` dynamic segment — same restructuring, and it rewrites every
 *     URL in the project, the sitemap, and the canonical links.
 *   · This. One component, one attribute, no restructuring.
 *
 * Be clear about the trade: this runs in an effect, so the served HTML keeps
 * `lang="en"` from the root layout and Spanish is corrected on hydration. A
 * visitor with JavaScript disabled still gets an English `lang` on a Spanish
 * page. That is a smaller wrong than every screen-reader user getting it wrong,
 * and it leaves the route table and the language switcher alone. If the site ever
 * grows a second locale or stops being fully static, take the route-group route
 * and delete this file.
 */
export function LangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = localeFromPath(pathname ?? "/") || DEFAULT_LOCALE;
    if (document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
  }, [pathname]);

  return null;
}
