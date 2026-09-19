import type { RouteKey } from "@/lib/site";

/** URL segment for each non-home route, identical in both languages. */
export const LOCALIZED_SLUG: Record<Exclude<RouteKey, "home">, string> = {
  services: "services",
  areas: "service-areas",
  about: "about",
  contact: "contact",
};
