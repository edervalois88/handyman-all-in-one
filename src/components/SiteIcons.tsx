"use client";

/**
 * The utility icon set.
 *
 * Same family as the service marks in ServiceMarks.tsx: a 48-unit grid, one
 * stroke weight, square-ish joins, drawn flat in the brand's ink. Kept in its own
 * file because these are doing a different job — the service marks are pictures of
 * work, these are signals.
 *
 * WHERE THESE ARE ALLOWED TO GO, and where they are not.
 *
 * "More iconography across the site" is one edit away from becoming noise, and
 * noise is what makes a page unreadable. So these are used only where an icon
 * resolves something a reader would otherwise have to parse:
 *
 *   ALLOWED
 *   - beside contact details (phone, email, address, hours) — the four things
 *     people scan for and the four things a word alone makes them read
 *   - on a primary action, to mark it as the action
 *   - as the tick on a covered item or a completed step
 *   - as a state marker: licensed partner, warning, verified
 *
 *   NOT ALLOWED
 *   - beside a section heading or a kicker. That is the eyebrow, which this
 *     build refuses outright.
 *   - on every bullet in a list. A coloured square already does that job, and
 *     a row of a dozen glyphs reads as decoration.
 *   - as a card's only content, or centred above a heading. That is the
 *     icon-card template.
 *
 * If a proposed icon does not fit one of the four ALLOWED cases, it is
 * decoration and it does not ship.
 *
 * None of these animate. The page has three authored moments and a set of hover
 * interactions on the service marks; a third layer of motion on utility glyphs
 * would be the scatter this build keeps refusing.
 */

import { Svg as Base } from "./ServiceMarks";

type IconProps = {
  size?: number;
  className?: string;
};

function Glyph({
  size = 20,
  className = "",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <Base size={size} className={className} strokeWidth={2.6}>
      {children}
    </Base>
  );
}

/* ── contact ─────────────────────────────────────────────────────────────── */

export function IconPhone({ size, className }: IconProps) {
  return (
    <Glyph size={size} className={className}>
      <path d="M16 6h6l3 8-4 3a22 22 0 0 0 10 10l3-4 8 3v6a4 4 0 0 1-4 4A32 32 0 0 1 12 10a4 4 0 0 1 4-4z" />
    </Glyph>
  );
}

export function IconMail({ size, className }: IconProps) {
  return (
    <Glyph size={size} className={className}>
      <rect x="5" y="12" width="38" height="24" />
      <path d="M5 13l19 13 19-13" />
    </Glyph>
  );
}

export function IconPin({ size, className }: IconProps) {
  return (
    <Glyph size={size} className={className}>
      <path d="M24 43c8-10 13-16 13-23a13 13 0 1 0-26 0c0 7 5 13 13 23z" />
      <circle cx="24" cy="20" r="5" />
    </Glyph>
  );
}

export function IconClock({ size, className }: IconProps) {
  return (
    <Glyph size={size} className={className}>
      <circle cx="24" cy="24" r="18" />
      <path d="M24 13v12l8 5" />
    </Glyph>
  );
}

/* ── the work order's own marks ──────────────────────────────────────────── */

/** Covered, done, included. The tick this world uses. */
export function IconCheck({ size, className }: IconProps) {
  return (
    <Glyph size={size} className={className}>
      <path d="M9 25l10 10L39 14" />
    </Glyph>
  );
}

/** The arrow a primary action carries. */
export function IconArrow({ size, className }: IconProps) {
  return (
    <Glyph size={size} className={className}>
      <path d="M8 24h30" />
      <path d="M27 12l12 12-12 12" />
    </Glyph>
  );
}

/** A written quote: the document this whole brand rests on. */
export function IconQuoteDoc({ size, className }: IconProps) {
  return (
    <Glyph size={size} className={className}>
      <path d="M11 5h18l8 8v30H11z" />
      <path d="M29 5v8h8" />
      <path d="M17 26h14M17 33h14M17 19h6" />
    </Glyph>
  );
}

/** A licensed trade partner: the boundary, stated. */
export function IconLicensed({ size, className }: IconProps) {
  return (
    <Glyph size={size} className={className}>
      <path d="M24 5l16 6v14c0 9-7 15-16 18-9-3-16-9-16-18V11z" />
      <path d="M17 24l5 5 10-11" />
    </Glyph>
  );
}

/** The one warning this site ever gives: work that needs someone else. */
export function IconAlert({ size, className }: IconProps) {
  return (
    <Glyph size={size} className={className}>
      <path d="M24 6l19 34H5z" />
      <path d="M24 19v10" />
      <path d="M24 34h.01" />
    </Glyph>
  );
}

/** A house, for coverage and service areas. */
export function IconHouse({ size, className }: IconProps) {
  return (
    <Glyph size={size} className={className}>
      <path d="M6 23L24 7l18 16" />
      <path d="M11 21v21h26V21" />
      <path d="M20 42V30h8v12" />
    </Glyph>
  );
}

/** The calendar window a job is booked into. */
export function IconCalendar({ size, className }: IconProps) {
  return (
    <Glyph size={size} className={className}>
      <rect x="6" y="10" width="36" height="32" />
      <path d="M6 19h36" />
      <path d="M16 5v9M32 5v9" />
      <path d="M14 27h6M28 27h6M14 34h6M28 34h6" />
    </Glyph>
  );
}

/** A photograph, for the "send photos" hint on the quote form. */
export function IconCamera({ size, className }: IconProps) {
  return (
    <Glyph size={size} className={className}>
      <path d="M5 15h9l3-5h14l3 5h9v26H5z" />
      <circle cx="24" cy="27" r="8" />
    </Glyph>
  );
}

/* ── registry ────────────────────────────────────────────────────────────── */

export const SITE_ICONS = {
  phone: IconPhone,
  mail: IconMail,
  pin: IconPin,
  clock: IconClock,
  check: IconCheck,
  arrow: IconArrow,
  quote: IconQuoteDoc,
  licensed: IconLicensed,
  alert: IconAlert,
  house: IconHouse,
  calendar: IconCalendar,
  camera: IconCamera,
} as const;

export type SiteIconName = keyof typeof SITE_ICONS;

export function SiteIcon({
  name,
  size = 20,
  className = "",
}: {
  name: SiteIconName;
  size?: number;
  className?: string;
}) {
  const GlyphComp = SITE_ICONS[name];
  if (!GlyphComp) return null;
  return <GlyphComp size={size} className={className} />;
}
