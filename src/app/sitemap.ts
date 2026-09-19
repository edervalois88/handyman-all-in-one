import type { MetadataRoute } from "next";
import { site, type Locale } from "@/lib/site";

const KEYS = ["", "/services", "/service-areas", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.contact.url.replace(/\/$/, "");

  const entries: MetadataRoute.Sitemap = [];
  for (const key of KEYS) {
    for (const locale of ["en", "es"] as Locale[]) {
      const path = locale === "es" ? `/es${key}` : key || "/";
      const enPath = key || "/";
      const esPath = `/es${key}`;

      entries.push({
        url: `${base}${path === "/" ? "" : path}`,
        lastModified: now,
        changeFrequency: key === "" ? "weekly" : "monthly",
        priority: key === "" ? 1 : 0.7,
        alternates: {
          languages: {
            en: `${base}${enPath === "/" ? "" : enPath}`,
            es: `${base}${esPath === "/es" ? "/es" : esPath}`,
          },
        },
      });
    }
  }
  return entries;
}
