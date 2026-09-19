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
    // Soft Sage is a surface colour, not an ink: at #8A9A83 on Warm Cream it is
    // only 2.4:1. The stamp keeps the maintenance register through its wording
    // and carries a legible ink instead.
    sage: "text-ink-soft",
    gold: "text-gold-ink",
    cream: "text-cream",
  }[tone];
  return (
    <span className={`stamp ${flat ? "stamp-flat" : ""} ${colors} ${className}`}>
      {children}
    </span>
  );
}

/**
 * Section header in the work-order grammar.
 *
 * The heading names the section on its own — no kicker, no eyebrow. Where the
 * world wants a marker, the form line number sits in the ruled margin gutter
 * beside the heading, which is where a work order keeps it.
 */
export function SectionHead({
  index,
  title,
  body,
  tone = "ink",
  align = "start",
  className = "",
}: {
  index?: string;
  title: string;
  body?: string;
  tone?: "ink" | "cream";
  align?: "start" | "center";
  className?: string;
}) {
  const head = tone === "ink" ? "text-navy" : "text-cream";
  const muted = tone === "ink" ? "text-navy/75" : "text-cream/80";
  const lane = tone === "ink" ? "text-ink-soft" : "text-cream/70";
  // one rule weight, declared once, shared by the bottom rule (below sm) and the
  // gutter's right border (from sm up), so the device does not change identity
  // when the breakpoint flips
  const ruleWeight = tone === "ink" ? "border-rule-strong" : "border-cream/30";

  const heading = (
    <h2 className={`display whitespace-pre-line text-[clamp(2.1rem,5.4vw,4.1rem)] ${head}`}>
      {title}
    </h2>
  );

  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      <div
        className={`flex items-stretch gap-3 sm:gap-4 ${
          index ? "flex-col sm:flex-row" : ""
        }`}
      >
        {index ? (
          /*
           * The form line number always sits at a rule. Below `sm` there is no
           * room for a vertical gutter, so the numeral carries a bottom rule and
           * the heading sits beneath it; from `sm` up the rule turns into the
           * gutter's right border and the heading sits beside it. Either way the
           * number is never a bare label floating above a heading, and the rule
           * keeps ONE weight across the breakpoint so it reads as the same device
           * rather than two.
           */
          <p
            className={`label shrink-0 self-start border-b pb-1.5 pt-0.5 text-ink-soft sm:self-stretch sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4 sm:pt-1.5 ${lane} ${ruleWeight}`}
          >
            {index}
          </p>
        ) : null}
        <div className="min-w-0">
          {heading}
          {body ? (
            <p className={`mt-5 max-w-[52ch] text-[1.02rem] leading-relaxed ${muted}`}>{body}</p>
          ) : null}
        </div>
      </div>
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
      <span className={`label ${tone === "ink" ? "text-ink-soft" : "text-cream/60"}`}>
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
  const laneColor = tone === "gold" ? "text-gold-ink" : "text-navy/70";
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
      <span className="label text-gold-ink" aria-hidden="true">
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
