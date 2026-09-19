"use client";

/**
 * The world's motion, in one place.
 *
 * ONE animation authority: Motion (the library formerly called Framer Motion).
 * Nothing animates from CSS keyframes and no second runtime is loaded.
 *
 * THREE AUTHORED MOMENTS, plus the line-number counters:
 *
 *   1. The job ticket feeds into the panel and its APPROVED stamp strikes.
 *      (in Hero.tsx — the page's narrator.)
 *   2. Each commitment in the promise band is PINNED to the board, one after
 *      the other. The only scroll response on the site, and it is made of this
 *      world's own action: a form being filed.
 *   3. The STATUS board cycles the states a job passes through.
 *      (SplitFlapText — a diegetic instrument, not decoration.)
 *
 *   And a small fourth, on one page only: TicketNumber counts the services line
 *   numbers up, which is a work order numbering its own lines.
 *
 * Why this file is small, and why there is no generic `Reveal` here any more.
 * An earlier version of this layer wrapped every heading and every list in the
 * same fade-and-rise, which is ~40 identical entrances across five routes. A
 * reviewer sent that back twice, correctly: a uniform entrance is not motion,
 * it is a texture. The floor's sentence is "one authored moment, not scattered
 * effects and not one identical entrance on every section". So the generic
 * reveal is deliberately GONE. If you are tempted to add it back for a new
 * section, don't — either the section earns its own authored moment from the
 * world's materials, or it stays still.
 *
 * SAFETY RULE, learned the hard way: an entrance must never strand content. A
 * pure `whileInView` reveal leaves an element at `opacity: 0` forever when the
 * observer never fires — skipping to an anchor, find-in-page, a very fast
 * scroll, or printing all do that. Every animated element here fires on
 * whichever comes first: entering view, or a short failsafe after mount. The
 * worst case is an arrival that happens early; content is never invisible.
 */

import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Exponential ease-out. Matches cubic-bezier(0.16, 1, 0.3, 1). */
export const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

/** The ticket's entrance: 0.72s, the house curve. */
export const ticketTransition: Transition = { duration: 0.72, ease: EASE_OUT };

/** A stamp striking: short, decisive, no overshoot. */
export const strikeTransition: Transition = { duration: 0.34, ease: EASE_OUT };

export function useMotionOk() {
  // `useReducedMotion` returns null on the server; treat that as "animate",
  // because the markup default is fully visible and static.
  return useReducedMotion() !== true;
}

/** How long an entrance may wait for its observer before showing itself. */
const FAILSAFE_MS = 1400;

/**
 * Fires once when the element enters view, or after the failsafe, whichever
 * comes first. Returns a ref to attach and whether the arrival has happened.
 */
export function useArrival(amount = 0.35, enabled = true) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    if (!enabled || inView) return;
    const t = setTimeout(() => setForced(true), FAILSAFE_MS);
    return () => clearTimeout(t);
  }, [enabled, inView]);

  return { ref, arrived: !enabled || inView || forced };
}

/**
 * The promise band's commitments, each pinned to the board in turn.
 *
 * This is the site's only scroll response. It is keyed to the world's own
 * action — a stamp coming down on a form — rather than a generic rise, and it
 * is applied to four small tokens in one band, not to every section.
 */
export function PinToBoard({
  children,
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  const ok = useMotionOk();
  const { ref, arrived } = useArrival(0.4, ok);

  if (!ok) return <li className={className}>{children}</li>;

  return (
    <motion.li
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      initial={{ opacity: 0, y: -10, scale: 1.06 }}
      animate={arrived ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ ...strikeTransition, delay: index * 0.11 }}
    >
      {children}
    </motion.li>
  );
}

/**
 * A form line number that counts up once when it arrives.
 *
 * Written on Motion rather than the catalogue's CountUp, because a work-order
 * line number is always zero-padded to two digits. Renders its final value if
 * motion is reduced, and never waits on the observer alone.
 */
export function TicketNumber({
  to,
  className = "",
  duration = 0.9,
  pad = 2,
}: {
  to: number;
  className?: string;
  duration?: number;
  pad?: number;
}) {
  const ok = useMotionOk();
  const { ref, arrived } = useArrival(0.6, ok);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!ok || !arrived) return;

    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ok, arrived, to, duration]);

  return (
    <span
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`tnum ${className}`}
    >
      {String(ok ? value : to).padStart(pad, "0")}
    </span>
  );
}
