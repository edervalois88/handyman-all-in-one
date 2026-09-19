"use client";

/**
 * The world's motion, in one place.
 *
 * There is exactly ONE animation authority on this site: Motion (the library
 * formerly called Framer Motion). Nothing animates from CSS keyframes, and no
 * second animation runtime is loaded. That is deliberate — scattered effects
 * from several runtimes is the failure mode this design explicitly refuses.
 *
 * The house curve is the same exponential ease-out the direction contract uses
 * for the hero ticket: fast departure, long settle, no overshoot, no bounce.
 *
 * SAFETY RULE, learned the hard way: an entrance must never be able to strand
 * content. A pure `whileInView` reveal leaves an element at `opacity: 0`
 * forever if the observer never fires — skipping to an anchor, find-in-page, a
 * very fast scroll, or a print stylesheet all do that. So every reveal here
 * fires on whichever comes first: the element entering view, OR a short
 * failsafe timer after mount. The worst case is a reveal that arrives early;
 * the content is never invisible.
 */

import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";
import { createElement, useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** Exponential ease-out. Matches cubic-bezier(0.16, 1, 0.3, 1). */
export const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

/** The single scroll-entrance transition. */
export const riseTransition: Transition = {
  duration: 0.62,
  ease: EASE_OUT,
};

/** Paper settling onto the stack: a short drop with a long settle. */
export const settleTransition: Transition = {
  duration: 0.5,
  ease: EASE_OUT,
};

export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0 },
};

/**
 * Staggered children: a short, ordered settle rather than a uniform fade.
 * `delayChildren` is small enough that the last child still lands inside the
 * first viewport's attention.
 */
export const listVariants: Variants = {
  hidden: {},
  shown: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

export function useMotionOk() {
  // `useReducedMotion` returns null on the server; treat that as "animate",
  // because the markup default is fully visible and static.
  return useReducedMotion() !== true;
}

/** How long a reveal may wait for its observer before showing itself anyway. */
const FAILSAFE_MS = 1400;

function useRevealControl(amount: number, enabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    if (!enabled || inView) return;
    const t = setTimeout(() => setForced(true), FAILSAFE_MS);
    return () => clearTimeout(t);
  }, [enabled, inView]);

  return { ref, shown: !enabled || inView || forced };
}

/**
 * Reveals its children, once, when they first scroll into view.
 *
 * Visible by default: with reduced motion, before hydration, or if the observer
 * never fires, the content renders in its final state. Motion here is an
 * enhancement, never a precondition for seeing the page.
 */
export function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  amount = 0.25,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  const ok = useMotionOk();
  const { ref, shown } = useRevealControl(amount, ok);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (!ok) {
    return createElement(as, { className }, children);
  }

  return (
    <MotionTag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      variants={riseVariants}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      transition={{ ...riseTransition, delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * A list that settles item by item. Use for siblings that share a rhythm —
 * service categories, values, process steps — never for a whole page section,
 * so the page keeps one entrance and the lists keep their own cadence.
 */
export function RevealList({
  children,
  as = "ul",
  className = "",
  amount = 0.12,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  amount?: number;
}) {
  const ok = useMotionOk();
  const { ref, shown } = useRevealControl(amount, ok);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.ul;

  if (!ok) {
    return createElement(as, { className }, children);
  }

  return (
    <MotionTag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      variants={listVariants}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
    >
      {children}
    </MotionTag>
  );
}

/** A child of `RevealList`. */
export function RevealItem({
  children,
  as = "li",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const ok = useMotionOk();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.li;

  if (!ok) {
    return createElement(as, { className }, children);
  }

  return (
    <MotionTag className={className} variants={riseVariants} transition={settleTransition}>
      {children}
    </MotionTag>
  );
}

/**
 * A form line number that counts up once when it arrives.
 *
 * Written on Motion rather than adopted from the catalogue's CountUp, because a
 * work-order line number is always zero-padded to two digits and the vendored
 * one has no padding option. Renders its final value if motion is reduced.
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
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [forced, setForced] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!ok) return;
    if (inView) return;
    const t = setTimeout(() => setForced(true), FAILSAFE_MS);
    return () => clearTimeout(t);
  }, [ok, inView]);

  useEffect(() => {
    if (!ok || (!inView && !forced)) return;

    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / (duration * 1000));
      // the same exponential ease-out as everything else in the world
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ok, inView, forced, to, duration]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {String(ok ? value : to).padStart(pad, "0")}
    </span>
  );
}
