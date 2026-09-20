"use client";

/**
 * The preloader.
 *
 * THE TRADE-OFF, stated plainly: this is the only thing on the site that spends
 * the visitor's time without giving them anything back, so it has to earn the
 * spend or it is a defect. Four rules keep it honest, and all four are
 * deliberate:
 *
 *  1. IT IS SHORT. 850ms of walk, then it leaves. Not a fixed splash held for
 *     effect — the mark actually measures its distance from the progress and
 *     stops when the bar is full.
 *  2. IT PLAYS ONCE PER SESSION. `sessionStorage` remembers, so a visitor moving
 *     between pages is never shown it twice. That is the difference between a
 *     title card and a toll booth.
 *  3. IT CANNOT STRAND THE PAGE. Content is rendered underneath from the first
 *     paint — this is an overlay, not a gate — and a hard timer removes it even
 *     if something never loads.
 *  4. REDUCED MOTION SKIPS IT ENTIRELY. A visitor who has asked for stillness
 *     gets the page, immediately.
 *
 * The animation is the brand's own mark, unchanged: the walker from the brand
 * book carrying its ladder. It is NOT redrawn as a walk cycle — a walk cycle would
 * mean inventing limbs the mark does not have, and the mark is the one asset the
 * brand book is unambiguous about. Instead it WALKS THE WAY A SILHOUETTE WALKS:
 * a slow body bob, a slight forward lean, and a ruled ground scrolling beneath
 * it at the pace it advances. The scrolling ground does the work; the figure only
 * has to be convincing enough not to contradict it.
 *
 * The red tick marks along the ground are the progress. They advance with the
 * real counter, so the bar is a readout rather than a decoration.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "./motion/primitives";

/** How long the walk lasts. Short enough to forgive, long enough to read. */
const WALK_MS = 850;
const SESSION_KEY = "hm-splash-shown";

export function Preloader() {
  const reduce = useReducedMotion();
  /*
   * Start hidden, and let the effect below decide. Deliberately NOT a lazy
   * initialiser reading `window`: this component renders on the server, and a
   * first client render that disagreed with the server's would be a hydration
   * mismatch. The overlay appearing a frame after load is invisible to the
   * visitor and correct at every render.
   */
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    // Reduced motion: never show it. The page is already rendered underneath.
    if (reduce) return;

    // Once per session.
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Private mode or blocked storage: show it, it is harmless.
    }

    /*
     * The first frame is deferred rather than set synchronously in the effect
     * body. Everything below is already asynchronous — this only exists to keep
     * React 19's set-state-in-effect rule satisfied, and it changes nothing a
     * visitor can perceive.
     */
    let raf = 0;
    let start = 0;
    let started = false;

    const tick = (now: number) => {
      if (!started) {
        started = true;
        start = now;
        setVisible(true);
      }
      const t = Math.min(1, (now - start) / WALK_MS);
      // the house curve: fast departure, long settle, no overshoot
      const eased = 1 - Math.pow(1 - t, 4);
      setProgress(eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!done.current) {
        done.current = true;
        setLeaving(true);
      }
    };
    raf = requestAnimationFrame(tick);

    // Failsafe: whatever happens, the overlay goes.
    const hardStop = setTimeout(() => {
      if (!done.current) {
        done.current = true;
        setLeaving(true);
      }
    }, WALK_MS + 900);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hardStop);
    };
  }, [reduce]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-navy"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.32, ease: EASE_OUT }}
      onAnimationComplete={() => {
        if (leaving) setVisible(false);
      }}
      aria-hidden="true"
    >
      {/* the ruled ground, and the red ticks that are the progress readout */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="relative h-px w-full bg-cream/20">
          <motion.div
            className="absolute inset-y-0 left-0 bg-red"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/*
         * The tick row scrolls at the pace the walker advances, which is what
         * makes the figure read as walking rather than sliding: the ground moves,
         * the body stays put and bobs.
         */}
        <motion.div
          className="relative h-5 overflow-hidden"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 1.1, ease: "linear", repeat: Infinity }}
        >
          <div className="absolute inset-0 flex w-[200%]">
            {Array.from({ length: 64 }).map((_, i) => (
              <span
                key={i}
                className="h-3 flex-1 border-l"
                style={{
                  borderColor:
                    i % 8 === 0 ? "rgba(244,237,218,0.42)" : "rgba(244,237,218,0.16)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/*
       * The walker, advancing across the frame as the progress fills.
       *
       * The wordmark TRAVELS WITH IT rather than sitting in its own centred
       * block. Two separate things crossing the same bottom strip collide, and
       * the first version did exactly that: the figure walked straight through
       * the wordmark around the middle of the frame. Cleared by width, never by
       * height — raise the sign and it floats free of its own sign-writer.
       */}
      <motion.div
        className="absolute bottom-7"
        initial={{ left: "5%" }}
        animate={{ left: `${5 + progress * 56}%` }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      >
        <div className="flex items-end gap-5">
          <motion.div
            /* the body bob: small enough to read as weight rather than bounce */
            animate={{ y: [0, -3, 0, -2, 0], rotate: [-1.2, -0.6, -1.2] }}
            transition={{ duration: 0.62, ease: "easeInOut", repeat: Infinity }}
            style={{ transformOrigin: "50% 100%" }}
          >
            <Image
              src="/brand/mark-cream.png"
              alt=""
              width={46}
              height={59}
              priority
              className="h-auto w-auto"
              style={{ height: 56, width: "auto" }}
            />
          </motion.div>

          <div className="pb-1">
            <p className="display text-[1.6rem] leading-none text-cream">HANDYMAN</p>
            <p className="label mt-1.5 text-cream/55">All&nbsp;-&nbsp;in&nbsp;-&nbsp;One</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
