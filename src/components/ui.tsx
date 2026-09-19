import { site } from "@/lib/site";
import type { Locale } from "@/lib/site";

/** A rotated rubber stamp. Used for state, never decoration. */
export function Stamp({
  children,
  tone = "red",
  flat = false,
  className = "",
}: {
  children: React.ReactNode;
  tone?: "red" | "navy" | "sage" | "gold" | "cream";
  flat?: boolean;
  className?: string;
}) {
  const colors = {
    red: "text-red",
    navy: "text-navy",
    sage: "text-sage-deep",
    gold: "text-gold",
    cream: "text-cream",
  }[tone];
  return (
    <span className={`stamp ${flat ? "stamp-flat" : ""} ${colors} ${className}`}>
      {children}
    </span>
  );
}

/** Section header in the work-order grammar: numbered, ruled, plainly labelled. */
export function SectionHead({
  index,
  kicker,
  title,
  body,
  tone = "ink",
  align = "start",
  className = "",
}: {
  index?: string;
  kicker: string;
  title: string;
  body?: string;
  tone?: "ink" | "cream";
  align?: "start" | "center";
  className?: string;
}) {
  const head = tone === "ink" ? "text-navy" : "text-cream";
  const muted = tone === "ink" ? "text-navy/75" : "text-cream/80";
  const rule = tone === "ink" ? "border-navy/25" : "border-cream/30";

  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <div
        className={`flex items-center gap-3 border-b-2 ${rule} pb-2 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {index ? (
          <span className={`label ${tone === "ink" ? "text-red" : "text-cream/70"}`}>
            {index}
          </span>
        ) : null}
        <span className={`label ${muted}`}>{kicker}</span>
      </div>
      <h2
        className={`display mt-6 whitespace-pre-line text-[clamp(2.1rem,5.4vw,4.1rem)] ${head}`}
      >
        {title}
      </h2>
      {body ? (
        <p className={`mt-5 max-w-[52ch] text-[1.02rem] leading-relaxed ${muted} ${
          align === "center" ? "mx-auto" : ""
        }`}>
          {body}
        </p>
      ) : null}
    </div>
  );
}

/** Small dotted label/value pair, as on a work order. */
export function TicketField({
  label,
  value,
  tone = "ink",
}: {
  label: string;
  value: React.ReactNode;
  tone?: "ink" | "cream";
}) {
  return (
    <div className="field-row">
      <span className={`label ${tone === "ink" ? "text-navy/60" : "text-cream/60"}`}>
        {label}
      </span>
      <span
        className={`text-[0.98rem] ${
          tone === "ink" ? "text-navy" : "text-cream"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * A ruled margin note, as on a work order: a titled lane on the left and the
 * note body beside it, closed top and bottom by the same rule the tickets use.
 * The lane carries the meaning, which is why it is a lane and not an accent bar.
 */
export function RuleNote({
  lane,
  tone = "navy",
  className = "",
  children,
}: {
  lane: string;
  tone?: "navy" | "gold";
  className?: string;
  children: React.ReactNode;
}) {
  const laneColor = tone === "gold" ? "text-gold" : "text-navy/70";
  return (
    <div
      className={`margin-rule ${tone === "gold" ? "margin-rule--gold" : "margin-rule--navy"} ${className}`}
    >
      <p className={`label ${laneColor}`}>{lane}</p>
      <div className="margin-rule__body text-[0.97rem] leading-relaxed text-navy/85">
        {children}
      </div>
    </div>
  );
}

/** Marks every value the owner must replace before launch. */
export function Placeholder({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const note = locale === "es" ? "Dato de ejemplo" : "Placeholder";
  return (
    <span
      className="inline-flex items-baseline gap-1.5"
      title={locale === "es"
        ? "Reemplazar con el dato real antes de publicar"
        : "Replace with the real detail before launch"}
    >
      <span className="underline decoration-gold decoration-2 decoration-dotted underline-offset-4">
        {children}
      </span>
      <span className="label text-gold" aria-hidden="true">
        *
      </span>
      <span className="sr-only">{note}</span>
    </span>
  );
}

/** The four-beat promise, rendered as a compact stamp row. */
export function PromiseRow({
  items,
  tone = "cream",
}: {
  items: readonly { n: string; title: string; body: string }[];
  tone?: "ink" | "cream";
}) {
  const border = tone === "ink" ? "border-navy/20" : "border-cream/25";
  const head = tone === "ink" ? "text-navy" : "text-cream";
  const muted = tone === "ink" ? "text-navy/70" : "text-cream/75";
  const num = "text-red";

  return (
    <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <li
          key={it.n}
          className={`border-t-2 ${border} pt-5 sm:pr-6`}
        >
          <span className={`label ${num}`}>{it.n}</span>
          <h3 className={`display mt-2 text-[1.5rem] ${head}`}>{it.title}</h3>
          <p className={`mt-2 text-[0.95rem] leading-relaxed ${muted}`}>{it.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function ContactChips({
  locale,
  tone = "ink",
  showAddress = true,
}: {
  locale: Locale;
  tone?: "ink" | "cream";
  showAddress?: boolean;
}) {
  const muted = tone === "ink" ? "text-navy/70" : "text-cream/75";
  return (
    <address className={`not-italic text-[0.95rem] leading-relaxed ${muted}`}>
      <a
        href={`tel:${site.contact.phoneHref}`}
        className="link-u font-semibold"
        style={{ color: "inherit" }}
      >
        {site.contact.phone}
      </a>
      <br />
      <a href={`mailto:${site.contact.email}`} className="link-u">
        {site.contact.email}
      </a>
      {showAddress ? (
        <>
          <br />
          {site.contact.addressLine}, {site.contact.city}, {site.contact.state}{" "}
          {site.contact.zip}
        </>
      ) : null}
    </address>
  );
}
