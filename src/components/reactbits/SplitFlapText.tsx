"use client";

/**
 * SplitFlapText — vendored from React Bits (https://reactbits.dev).
 *
 * MIT + Commons Clause License Condition v1.0. Copyright (c) 2026 David Haz.
 * Upstream: https://github.com/DavidHDev/react-bits
 *
 * LOCAL MODIFICATION, and the reason for it: upstream renders each character
 * tile with layered gradients, inset box-shadows, a bevelled middle seam and a
 * 3D `perspective` transform — a simulated physical object. This project refuses
 * faked physicality and ships no gradients, so the stylesheet below draws the
 * tile as flat paper in the brand's own tokens: cream stock over a navy ink
 * character, one hairline rule across the fold, depth from `--lift-1` alone,
 * and a 2D fold instead of a 3D rotate. The mechanic and the logic are
 * upstream's; only the surface is this world's.
 *
 * One further local change: upstream reads the reduced-motion media query with
 * `useState` + `useEffect`; this uses `useSyncExternalStore`, which is the same
 * behaviour without a setState in an effect (React 19 recommends against it).
 *
 * Vends nothing else: React only, no animation runtime.
 */

import {
  type CSSProperties,
  type HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type TileState = {
  current: string;
  next: string;
  flipping: boolean;
  tick: number;
};

type AnimationPlan = {
  index: number;
  from: string;
  target: string;
  sequence: string[];
  start: number;
  step: number;
  done: boolean;
};

export interface SplitFlapTextProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  /** One or more phrases. With more than one, the board cycles through them. */
  words?: string[];
  /** A single phrase; mutually exclusive with `words`. */
  text?: string;
  /** Seconds per character flip. */
  flipDuration?: number;
  /** Seconds between the first character and the next. */
  stagger?: number;
  /** Milliseconds a settled phrase is held before cycling. */
  cycleDelay?: number;
  charset?: "alpha" | "alphanumeric" | "numeric" | (string & {});
  flipsPerChar?: number;
  tileColor?: string;
  textColor?: string;
  tileRadius?: number | string;
  gap?: number | string;
  fontSize?: number | string;
  loop?: boolean;
  padTo?: number;
  style?: CSSProperties;
}

const CHARSETS: Record<string, string> = {
  alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  alphanumeric: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  numeric: "0123456789",
};

/**
 * The surface. Flat paper only: no gradients, no inset shadows, no 3D.
 * The fold is a single hairline, which is how a real split-flap board reads
 * at a glance anyway.
 */
const styles = `
.split-flap-text{
  font-family:var(--font-mono),"Courier New",monospace;
  font-weight:700;
  line-height:1;
  letter-spacing:0;
  font-variant-numeric:tabular-nums;
  gap:var(--split-flap-gap,2px);
  flex-wrap:nowrap;
  max-width:100%;
  /*
   * LOCAL MODIFICATION 5 - the board scales down on narrow screens.
   * A fixed tile size cannot serve both a 1440px ticket and a 320px one: the
   * longest phrase measures ~275px, which fits the value column at every width
   * above ~360px and overflows it below that. The font size is the one knob that
   * changes the board's whole footprint, so the container scales it and the
   * caller sets the base size. The nowrap above guarantees it degrades by getting
   * smaller, never by wrapping mid-phrase.
   */
  font-size:var(--split-flap-font-size,1rem);
}
@media (max-width:400px){
  .split-flap-text{font-size:calc(var(--split-flap-font-size,1rem) * .78)}
}
/*
 * The binding case at the narrowest width is SPANISH, not English: its longest
 * state ("Cotización aprobada", 19 characters) is 3 characters wider than the
 * English one, and at a 205px value column that is the whole margin.
 */
@media (max-width:340px){
  .split-flap-text{font-size:calc(var(--split-flap-font-size,1rem) * .62)}
}
/* Every tile is the SAME width, fixed in px, and the row never wraps. An
   em-based width makes each tile as wide as its own character, so a fixed-length
   board jitters as it cycles and wraps mid-phrase on a narrow phone. A real
   board has uniform tiles and a fixed footprint.
   LOCAL MODIFICATION 3: the separation between tiles is a hairline hairline of
   the stock showing through, not a drop shadow per tile. Fourteen drop shadows
   in a row reads as fourteen little boxes; a printed board reads as one board. */
.split-flap-text__tile{
  position:relative;
  display:inline-block;
  flex:0 0 auto;
  width:calc(var(--split-flap-font-size,1rem) * .74);
  height:calc(var(--split-flap-font-size,1rem) * 1.5);
  overflow:hidden;
  border-radius:1px;
  background:var(--split-flap-tile-color,var(--navy));
  isolation:isolate;
}
/* the fold: one hairline, the way a printed board reads */
.split-flap-text__tile:before{
  content:"";
  position:absolute;
  z-index:8;
  top:calc(50% - .5px);
  left:0;
  width:100%;
  height:1px;
  background:var(--split-flap-rule-color,rgba(244,237,218,.14));
  pointer-events:none;
}
/* the seam between neighboring tiles: one hairline of paper, so the board reads
   as separate flaps without giving each tile its own drop shadow */
.split-flap-text__tile + .split-flap-text__tile:after{
  content:"";
  position:absolute;
  z-index:9;
  inset:0 auto 0 -1px;
  width:1px;
  background:var(--split-flap-seam-color,color-mix(in srgb,var(--navy) 55%,var(--cream)));
  pointer-events:none;
}
.split-flap-text__half{
  position:absolute;
  left:0;
  width:100%;
  height:50%;
  overflow:hidden;
  background:var(--split-flap-tile-color,var(--navy));
}
.split-flap-text__half--top{top:0}
.split-flap-text__half--bottom{bottom:0}
.split-flap-text__char{
  position:absolute;
  left:0;
  width:100%;
  height:200%;
  box-sizing:border-box;
  display:flex;
  align-items:center;
  justify-content:center;
  /* nudge the glyph up so the fold line does not sit on the baseline and the
     descender survives the tile's bottom clip */
  padding-bottom:.3em;
  color:var(--split-flap-text-color,var(--cream));
}
.split-flap-text__half--top .split-flap-text__char{top:0}
.split-flap-text__half--bottom .split-flap-text__char{bottom:0}
.split-flap-text__flap{
  position:absolute;
  left:0;
  width:100%;
  height:50%;
  overflow:hidden;
  z-index:6;
  backface-visibility:hidden;
  background:var(--split-flap-tile-color,var(--navy));
}
.split-flap-text__flap--front{top:0;transform-origin:center bottom;animation:split-flap-front var(--split-flap-flip-duration,.12s) var(--split-flap-ease,cubic-bezier(.16,1,.3,1)) both}
.split-flap-text__flap--back{bottom:0;transform-origin:center top;transform:scaleY(0);animation:split-flap-back var(--split-flap-flip-duration,.12s) var(--split-flap-ease,cubic-bezier(.16,1,.3,1)) both}
.split-flap-text__flap--front .split-flap-text__char{top:0}
.split-flap-text__flap--back .split-flap-text__char{bottom:0}
/* a 2D fold, not a 3D rotate: the tile narrows to nothing and unfolds */
@keyframes split-flap-front{0%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes split-flap-back{0%{transform:scaleY(0)}100%{transform:scaleY(1)}}
@media (prefers-reduced-motion:reduce){
  .split-flap-text__flap{animation:none!important;display:none}
}
`;

const toCssUnit = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

const resolveCharset = (charset: SplitFlapTextProps["charset"]) => {
  if (charset && CHARSETS[charset]) return CHARSETS[charset];
  return typeof charset === "string" && charset.length > 0
    ? charset
    : CHARSETS.alphanumeric;
};

const normalizePhrase = (phrase: string, width: number) => {
  const safe = String(phrase ?? "");
  return safe.padEnd(width, " ").slice(0, width);
};

const createTiles = (phrase: string): TileState[] =>
  phrase.split("").map((char) => ({
    current: char,
    next: char,
    flipping: false,
    tick: 0,
  }));

const sampleChar = (charset: string) =>
  charset.charAt(Math.floor(Math.random() * charset.length)) || " ";

const buildSequence = (target: string, flips: number, charset: string) => {
  const steps: string[] = [];
  for (let i = 0; i < flips; i += 1) steps.push(sampleChar(charset));
  steps.push(target);
  return steps;
};

/** Subscribes to the reduced-motion preference without a setState in an effect. */
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReduced(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_QUERY).matches;
}
const usePrefersReducedMotion = () =>
  useSyncExternalStore(subscribeReduced, getReducedSnapshot, () => false);

export default function SplitFlapText({
  words = ["LAUNCH READY", "SYNC ONLINE", "SIGNAL LIVE"],
  text,
  flipDuration = 0.12,
  stagger = 0.06,
  cycleDelay = 2400,
  charset = "alphanumeric",
  flipsPerChar = 8,
  tileColor,
  textColor,
  tileRadius = 2,
  gap = 2,
  fontSize = 16,
  loop = true,
  padTo = 12,
  className = "",
  style,
  ...props
}: SplitFlapTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const rafRef = useRef<number | null>(null);
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentTextRef = useRef("");

  const sourceWords = Array.isArray(words) && words.length > 0 ? words : [text ?? ""];
  const phrasesKey =
    typeof text === "string" ? text : sourceWords.map((w) => String(w ?? "")).join("\u001f");
  const phrases = useMemo(() => phrasesKey.split("\u001f"), [phrasesKey]);

  const width = useMemo(() => {
    const longest = phrases.reduce((max, p) => Math.max(max, p.length), 1);
    return Math.max(1, Math.ceil(Number(padTo) || 0), longest);
  }, [padTo, phrases]);

  const normalizedPhrases = useMemo(
    () => phrases.map((p) => normalizePhrase(p, width)),
    [phrases, width],
  );

  const [tiles, setTiles] = useState<TileState[]>(() =>
    createTiles(normalizedPhrases[0] || ""),
  );

  useEffect(() => {
    const clearAnimation = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (cycleTimerRef.current) {
        clearTimeout(cycleTimerRef.current);
        cycleTimerRef.current = null;
      }
    };

    clearAnimation();

    const firstPhrase = normalizedPhrases[0] || "";
    // LOCAL MODIFICATION: only reset when the phrase list actually changed. The
    // useState initialiser already builds the first phrase's tiles, so the reset
    // is a no-op on mount — and skipping it is also what keeps this effect from
    // calling setState synchronously on every render (React 19 warns on that).
    if (currentTextRef.current !== firstPhrase) {
      currentTextRef.current = firstPhrase;
      setTiles(createTiles(firstPhrase));
    } else {
      currentTextRef.current = firstPhrase;
    }

    if (normalizedPhrases.length <= 1 || typeof window === "undefined") {
      return clearAnimation;
    }

    let phraseIndex = 0;
    let cancelled = false;

    const safeFlipMs = Math.max(40, (Number(flipDuration) || 0.12) * 1000);
    const safeStaggerMs = Math.max(0, (Number(stagger) || 0) * 1000);
    const safeCycleDelay = Math.max(400, Number(cycleDelay) || 2400);
    const safeFlips = Math.max(0, Math.floor(Number(flipsPerChar) || 0));
    const activeCharset = resolveCharset(charset);

    const animateTo = (targetPhrase: string) => {
      if (prefersReducedMotion) {
        currentTextRef.current = targetPhrase;
        setTiles(createTiles(targetPhrase));
        return 0;
      }

      const fromPhrase = normalizePhrase(currentTextRef.current, width);
      const targetChars = targetPhrase.split("");

      const plans = targetChars
        .map<AnimationPlan | null>((targetChar, index) => {
          const fromChar = fromPhrase[index] || " ";
          if (fromChar === targetChar) return null;
          return {
            index,
            from: fromChar,
            target: targetChar,
            sequence: buildSequence(targetChar, safeFlips, activeCharset),
            start: index * safeStaggerMs,
            step: -1,
            done: false,
          };
        })
        .filter((p): p is AnimationPlan => p !== null);

      if (plans.length === 0) {
        currentTextRef.current = targetPhrase;
        return 0;
      }

      let startedAt: number | null = null;
      let maxDuration = 0;

      const step = (now: number) => {
        if (cancelled) return;
        if (startedAt === null) startedAt = now;
        const elapsed = now - startedAt;

        setTiles(() => {
          const next = targetChars.map((char) => ({
            current: char,
            next: char,
            flipping: false,
            tick: 0,
          }));

          plans.forEach((plan) => {
            if (plan.done) return;
            if (elapsed < plan.start) return;

            const since = elapsed - plan.start;
            const stage = Math.floor(since / safeFlipMs);
            if (stage !== plan.step) {
              plan.step = stage;
              plan.sequence.shift();
              if (plan.sequence.length === 0) plan.done = true;
            }
            const shown = plan.sequence[0] ?? plan.target;
            next[plan.index] = {
              current: shown,
              next: plan.sequence[1] ?? plan.target,
              flipping: true,
              tick: stage,
            };
          });

          return next;
        });

        maxDuration = Math.max(
          maxDuration,
          ...plans.map((p) => p.start + p.sequence.length * safeFlipMs),
        );

        if (plans.some((p) => !p.done)) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          currentTextRef.current = targetPhrase;
          setTiles(createTiles(targetPhrase));
        }
      };

      rafRef.current = requestAnimationFrame(step);
      return maxDuration;
    };

    const scheduleNext = (delay: number) => {
      if (cancelled) return;
      cycleTimerRef.current = setTimeout(() => {
        if (cancelled) return;
        const nextIndex = phraseIndex + 1;
        if (nextIndex >= normalizedPhrases.length && !loop) return;
        phraseIndex = nextIndex % normalizedPhrases.length;
        const animationDuration = animateTo(normalizedPhrases[phraseIndex]);
        scheduleNext(safeCycleDelay + animationDuration);
      }, delay);
    };

    scheduleNext(safeCycleDelay);

    return () => {
      cancelled = true;
      clearAnimation();
    };
  }, [
    normalizedPhrases,
    width,
    loop,
    cycleDelay,
    flipDuration,
    stagger,
    flipsPerChar,
    charset,
    prefersReducedMotion,
  ]);

  const settledText = tiles.map((t) => t.current).join("").trimEnd();
  const componentStyle = {
    "--split-flap-tile-color": tileColor,
    "--split-flap-text-color": textColor,
    "--split-flap-radius": toCssUnit(tileRadius),
    "--split-flap-gap": toCssUnit(gap),
    "--split-flap-font-size": toCssUnit(fontSize),
    "--split-flap-flip-duration": `${Math.max(0.04, Number(flipDuration) || 0.12)}s`,
    ...style,
  } as CSSProperties;

  return (
    <>
      <style>{styles}</style>
      {/*
       * LOCAL MODIFICATION 4 — accessibility. Upstream puts `role="text"` and an
       * `aria-label` on the container with the tiles hidden. `role="text"` is not
       * an ARIA role, and a named generic element is dropped by some assistive
       * tech, so the state could go unannounced.
       *
       * Instead: an sr-only text node carries the settled phrase and the board
       * itself is `aria-hidden`. The value is always exposed to the reading
       * order, and it stays current because the node re-renders with the tiles.
       *
       * It is deliberately NOT a live region: a board that cycles every 2.6
       * seconds announcing itself would be hostile to a screen-reader user.
       */}
      <span className="sr-only">{settledText}</span>
      <div
        className={`split-flap-text inline-flex items-center whitespace-pre select-none ${className}`.trim()}
        style={componentStyle}
        aria-hidden="true"
        {...props}
      >
        {tiles.map((tile, index) => (
          <span
            className="split-flap-text__tile"
            aria-hidden="true"
            key={`${index}-${tiles.length}`}
          >
            <span className="split-flap-text__half split-flap-text__half--top">
              <span className="split-flap-text__char">
                {tile.current === " " ? "\u00A0" : tile.current}
              </span>
            </span>
            <span className="split-flap-text__half split-flap-text__half--bottom">
              <span className="split-flap-text__char">
                {tile.flipping ? tile.next : tile.current}
              </span>
            </span>

            {tile.flipping ? (
              <>
                <span
                  className="split-flap-text__flap split-flap-text__flap--front"
                  key={`front-${index}-${tile.tick}`}
                >
                  <span className="split-flap-text__char">
                    {tile.current === " " ? "\u00A0" : tile.current}
                  </span>
                </span>
                <span
                  className="split-flap-text__flap split-flap-text__flap--back"
                  key={`back-${index}-${tile.tick}`}
                >
                  <span className="split-flap-text__char">
                    {tile.next === " " ? "\u00A0" : tile.next}
                  </span>
                </span>
              </>
            ) : null}
          </span>
        ))}
      </div>
    </>
  );
}
