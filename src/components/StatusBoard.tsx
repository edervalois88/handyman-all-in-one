"use client";

/**
 * The ticket's STATUS field: a mechanical board cycling the states a job passes
 * through, drawn in this world's flat paper rather than upstream's simulated 3D.
 *
 * WHY THIS LOOKS THE WAY IT DOES — three faults found by measuring, in order
 *
 * 1. Scaling the TYPE down on narrow screens was wrong. At 390px the ticket's
 *    field row stacks label-over-value, so the board has the column's full width
 *    and the longest Spanish state needs well under it: the scale was spending a
 *    wide margin to shrink the one field that carries state. The board keeps the
 *    ticket's field scale at every width; a narrow column gets SHORTER STATES
 *    instead. Spanish is the binding case — "Cotización aprobada" is 19
 *    characters against English's 15 — so its short set is shorter still.
 *
 * 2. Mounting BOTH variants and hiding one with CSS was wrong. `display: none`
 *    stops neither a timer nor a requestAnimationFrame chain, so the hidden board
 *    kept flipping and calling setState forever — and on phones the hidden one is
 *    the longer phrase set, i.e. the bigger board spinning hardest on the device
 *    class least able to afford it. Exactly one board is mounted here.
 *
 * 3. ESTIMATING the board's width from a per-character constant was wrong, and
 *    subtly so: the estimate could over-predict, the board would overflow its
 *    column, the overflow would SHRINK the column, the ResizeObserver would then
 *    measure the shrunken column and the full phrase would be rejected for a
 *    reason it had itself caused. The width is measured instead — the real tile
 *    row is rendered out of flow as a probe and compared against the column.
 *
 * The probe is `aria-hidden`, `visibility: hidden`, absolutely positioned and
 * cannot be clicked, so it adds nothing to the layout, the reading order or the
 * accessibility tree. Its tiles carry no text content, because the row width
 * depends only on the tile count and the gap, never on which characters are
 * showing.
 */

import { useEffect, useRef, useState } from "react";
import SplitFlapText from "./reactbits/SplitFlapText";

const TILE_EM = 0.74; // must match the tile width in SplitFlapText's stylesheet

function tileRowWidth(chars: number, fontSize: number, gap: number) {
  return chars * fontSize * TILE_EM + Math.max(0, chars - 1) * gap;
}

export function StatusBoard({
  full,
  short,
  fontSize = 16,
  gap = 2,
  cycleDelay = 2600,
}: {
  full: readonly string[];
  short: readonly string[];
  fontSize?: number;
  gap?: number;
  cycleDelay?: number;
}) {
  const laneRef = useRef<HTMLDivElement>(null);
  const [fitsFull, setFitsFull] = useState(true);

  const fullChars = full.reduce((m, p) => Math.max(m, p.length), 0);

  useEffect(() => {
    const lane = laneRef.current;
    if (!lane) return;

    const read = () => {
      const w = lane.getBoundingClientRect().width;
      if (w > 0) setFitsFull(tileRowWidth(fullChars, fontSize, gap) <= w);
    };

    read();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(read);
    ro.observe(lane);
    return () => ro.disconnect();
  }, [fullChars, fontSize, gap]);

  const phrases = fitsFull ? full : short;

  return (
    <div ref={laneRef} className="relative">
      {/* The probe: the real tile row, out of flow, so its width cannot affect
          the column it is measuring. */}
      <div
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 flex"
        style={{ gap: `${gap}px` }}
      >
        {Array.from({ length: fullChars }).map((_, i) => (
          <span
            key={i}
            style={{
              width: `calc(${fontSize}px * ${TILE_EM})`,
              height: `calc(${fontSize}px * 1.5)`,
              flex: "0 0 auto",
            }}
          />
        ))}
      </div>

      <SplitFlapText
        /* Remount on a set change so the flip loop restarts against the new
           phrases and no timers from the old set survive. */
        key={fitsFull ? "full" : "short"}
        words={[...phrases]}
        padTo={0}
        gap={gap}
        fontSize={fontSize}
        flipDuration={0.1}
        stagger={0.05}
        cycleDelay={cycleDelay}
        charset="alpha"
        flipsPerChar={5}
        tileColor="var(--navy)"
        textColor="var(--cream)"
      />
    </div>
  );
}
