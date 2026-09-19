import { en } from "./dict.en";
import { es, type Dict } from "./dict.es";
import { DEFAULT_LOCALE, type Locale } from "./site";

const dictionaries: Record<Locale, Dict> = { en: en as unknown as Dict, es };

export type { Dict };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

/** True when the visitor's language is not the default one. */
export function isAlternate(locale: Locale): boolean {
  return locale !== DEFAULT_LOCALE;
}
