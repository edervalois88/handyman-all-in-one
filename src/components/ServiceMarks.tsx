"use client";

/**
 * The service marks.
 *
 * These are NOT pictograms in the category's sense — no rounded glyph in a soft
 * tinted square. Each is a flat, single-weight line drawing of the WORK the
 * service does, on the same technical register as the field rules and
 * perforations elsewhere on the page.
 *
 * THREE RULES THESE FOLLOW, and the first version broke all three:
 *
 *  1. ONE DOMINANT SILHOUETTE PER MARK, and no two alike. The first version drew
 *     abstract diagrams — a stepped pipe run, a board with a saw, a roller bar —
 *     and at 40px four of the six were indistinguishable from each other. Each
 *     mark now leads with a shape nobody could confuse for another: a door in its
 *     frame, a pipe run with a handwheel, a handsaw, a paint roller, a ladder
 *     against a house, a grab bar through its studs.
 *  2. FILL THE FRAME. Marks drawn small inside their box disappear next to each
 *     other. Each primary shape spans roughly 36 of the 48 units.
 *  3. TEST AT 16px. Design at one size, test at the smallest. If the silhouette
 *     does not survive 16px it is not an icon, it is an illustration.
 *
 * Each mark carries exactly ONE moving part, and that part performs the action
 * the service performs: the door swings, the handwheel turns, the saw runs, the
 * roller rolls, the hand climbs, the bolt drives home. The motion is the meaning,
 * so it is an INTERACTION rather than a decoration: the mark animates on hover or
 * keyboard focus and is still otherwise. That keeps it outside the page's rule of
 * three authored MOMENTS — an interaction is not a fourth entrance — and a
 * visitor who never points at a mark is never distracted by one.
 *
 * With reduced motion the marks render in their resting state, which is a
 * complete drawing; the caller handles that with `active={false}`.
 */

import { Children, cloneElement, isValidElement } from "react";
import { motion, type Transition } from "motion/react";
import { useMotionOk } from "./motion/primitives";

type IconProps = {
  size?: number;
  className?: string;
  active?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The shared drawing surface for every icon on the site.
 *
 * Exported so the utility set in SiteIcons.tsx draws on the same grid, at the
 * same stroke weight, with the same joins — one family, not two. `strokeWidth` is
 * overridable because a 2.4-unit stroke that reads correctly at 48px is too thin
 * at 16-20px, which is where the utility glyphs live.
 */
export function Svg({
  size = 48,
  className = "",
  children,
  ...rest
}: Omit<IconProps, "active"> & { children: React.ReactNode } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   THE FRAME.

   A shared 48-unit viewBox is not a shared silhouette, and this file has now
   learned that twice. The marks are drawn by hand, and each one fills its frame
   differently: measured from rendering (frame transform removed, union of every
   shape's painted box), their ink spans 36.7x41.6, 40x36, 38x27, 38x31, 44x31 and
   38x36 units. Side by side in a row of six equal tiles that is a height variance
   of 27 to 42 units — the handsaw visibly floats while the door hangs low, and no
   amount of equal tile width hides it.

   So each mark is wrapped in a frame group that maps its own ink box onto one
   shared box. The numbers below are measurements, not taste; change a drawing and
   they must be re-measured, and `tools/mark-alignment.mjs` will tell you if the
   row has gone crooked.

   TWO DECISIONS WORTH KNOWING, because both had a wrong first answer:

   1. THE FRAME EQUALISES HEIGHT, NOT THE LONGEST SIDE. The first version scaled
      each mark so its LONGEST side fitted a fixed box, which sounds fair and is
      not: a mark that is wider than it is tall then comes out short. The ladder
      (44 wide) and the saw (38 wide) both ended up at 26-27 units tall against
      the door's 41, a 55% spread — worse on the axis the frame existed to fix.
      Fitting HEIGHT alone and letting width fall where it may gives every mark the
      same 34 units of height and a width of 22 to 39, which is what a set of
      pictograms is supposed to look like: they share a height and differ in
      width, the way letters do.

   2. `vectorEffect` GOES ON EVERY SHAPE, NOT ON THE GROUP. It was on the <g>
      first, with a comment explaining that it stopped the transform from thinning
      the heavier marks. It does not: `vector-effect` applies to graphics elements
      and is not inherited, so the <g> carried it, every child computed to `none`,
      and the set shipped with a 1.31x spread in stroke weight — the exact defect
      the comment claimed to be preventing. Verified in Chrome and confirmed from
      pixels: the same rect in the same scaled group paints thick with the
      attribute on the <g> and thin with it on the shape.

      So it is declared on each shape, which is the only place it does anything,
      and every shape gets it — including marks whose scale is nearly 1, because a
      set where some members compensate for the transform and others do not is a
      set with two rules. `frameShapes` below is what applies it, once, so no
      individual drawing can forget.
   ───────────────────────────────────────────────────────────────────────────── */

/** Where the shared box sits in the 48-unit space: bottom-aligned, centred. */
const FRAME_H = 34;
const FRAME_BOTTOM = 41;
const FRAME_CX = 24;

/**
 * Maps a mark's own ink box onto the shared frame.
 *
 * Height is fitted exactly and the box is bottom-aligned, so all six marks sit on
 * one line no matter how tall the drawing they came from.
 *
 * @param x0 left edge of the ink, @param y0 top edge
 * @param x1 right edge of the ink, @param y1 bottom edge
 */
function frameTransform(x0: number, y0: number, x1: number, y1: number): string {
  const w = x1 - x0;
  const h = y1 - y0;
  const scale = FRAME_H / h;
  const tx = FRAME_CX - scale * (x0 + w / 2);
  const ty = FRAME_BOTTOM - scale * y1;
  return `translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${scale.toFixed(3)})`;
}

/**
 * The frame group. Every mark's drawing goes inside one of these.
 *
 * The group sets only the transform. `vectorEffect` is applied to each SHAPE by
 * `frameShapes` rather than here, because a group does not inherit it — see
 * decision 2 above, which is not a hypothetical: it is what this file shipped.
 */
function IconFrame({ transform, children }: { transform: string; children: React.ReactNode }) {
  return <g transform={transform}>{frameShapes(children)}</g>;
}

/**
 * Spread `vectorEffect` onto every drawing element in a rendered mark.
 *
 * Done by walking the children rather than by adding the attribute to forty-odd
 * shapes by hand, so that a shape added later cannot miss it and quietly become
 * the one member of the family drawn in a heavier pen.
 */
function frameShapes(children: React.ReactNode): React.ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const props = child.props as { children?: React.ReactNode };
    return cloneElement(
      child as React.ReactElement<Record<string, unknown>>,
      { vectorEffect: "non-scaling-stroke" },
      props.children ? frameShapes(props.children) : props.children,
    );
  });
}

/**
 * INK — the bounding box of what a mark actually paints, x0 y0 x1 y1, in the
 * mark's OWN coordinate space.
 *
 * This is the space the frame transform operates in, so it is the only space this
 * table can be written in, and getting that wrong is how the first version shipped
 * a frame computed from numbers that described nothing on screen. Three ways to
 * get it wrong, all of which happened here:
 *
 *   · Hand arithmetic on the path data. Fine for lines, wrong the moment a shape
 *     is rotated — the door is drawn at `rotate(-30)` and that is what puts its
 *     ink at y=45.3 rather than 44 — and it silently mis-sized plumbing by 8 units.
 *   · getBBox() on the <svg>. That returns the box AFTER the frame transform, so
 *     feeding it back into this table is circular: it describes the output.
 *   · getBoundingClientRect() on the shapes, which carries the frame transform and
 *     the rendered size with it.
 *
 * These numbers come from each shape's painted rect converted back through the
 * frame's own scale and translation, unioned. The frame is scale-plus-translate
 * only, so that inversion is exact. `tools/mark-alignment.mjs` re-checks the
 * result, and the ink is measured at REST — which for the door is the open
 * position it is drawn in, so its swing envelope is inside these bounds already.
 */
const INK = {
  repairs: [6.6, 6.2, 40.8, 45.3],
  plumbing: [5.4, 5.2, 42.6, 38.6],
  carpentry: [6.3, 17.1, 41.7, 41.7],
  paint: [6.3, 7.3, 41.7, 35.7],
  exterior: [5.4, 13.4, 46.9, 41.6],
  safety: [6.7, 7.3, 41.3, 40.7],
} as const satisfies Record<string, readonly [number, number, number, number]>;

const FRAME_T = {
  repairs: frameTransform(...INK.repairs),
  plumbing: frameTransform(...INK.plumbing),
  carpentry: frameTransform(...INK.carpentry),
  paint: frameTransform(...INK.paint),
  exterior: frameTransform(...INK.exterior),
  safety: frameTransform(...INK.safety),
} as const;

/* ── 1. Everyday repairs — a door that sticks, swinging free ─────────────── */

function IconRepairs({ size, className, active = false }: IconProps) {
  const ok = useMotionOk();
  const on = active && ok;
  const swing: Transition = { duration: 0.55, ease: EASE };
  return (
    <Svg size={size} className={className}>
      <IconFrame transform={FRAME_T.repairs}>
        <path d="M7 5v38" strokeWidth={2.6} />
        <path d="M7 5h6M7 43h6" />
        <motion.g
          style={{ transformOrigin: "13px 41px" }}
          initial={{ rotate: -30 }}
          animate={{ rotate: on ? 0 : -30 }}
          transition={swing}
        >
          <path d="M13 8h20v36H13" strokeWidth={2.6} />
          <path d="M28 26v4" strokeWidth={3} />
        </motion.g>
        <path d="M37 22h5v5h-5" />
      </IconFrame>
    </Svg>
  );
}

/* ── 2. Plumbing & electrical — a supply run and its valve ───────────────── */

function IconPlumbing({ size, className, active = false }: IconProps) {
  const ok = useMotionOk();
  const on = active && ok;
  const turn: Transition = { duration: 0.7, ease: EASE };
  return (
    <Svg size={size} className={className}>
      <IconFrame transform={FRAME_T.plumbing}>
        <path d="M4 40h11V22h18v18h11" strokeWidth={2.8} />
        <rect x="19" y="17" width="10" height="10" strokeWidth={2.6} />
        <motion.g
          style={{ transformOrigin: "24px 12px" }}
          initial={{ rotate: 0 }}
          animate={{ rotate: on ? 200 : 0 }}
          transition={turn}
        >
          <ellipse cx="24" cy="12" rx="9" ry="4.5" strokeWidth={2.4} />
          <path d="M24 4v8" strokeWidth={2.4} />
        </motion.g>
        <motion.path
          d="M40 30v4"
          strokeWidth={2.6}
          initial={{ opacity: 1 }}
          animate={{ opacity: on ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </IconFrame>
    </Svg>
  );
}

/* ── 3. Carpentry & doors — a handsaw running a cut ──────────────────────── */

function IconCarpentry({ size, className, active = false }: IconProps) {
  const ok = useMotionOk();
  const on = active && ok;
  const run: Transition = { duration: 0.9, ease: EASE };
  return (
    <Svg size={size} className={className}>
      <IconFrame transform={FRAME_T.carpentry}>
        <rect x="5" y="29" width="38" height="14" strokeWidth={2.6} />
        <path d="M10 34h28M10 38h28" strokeWidth={1.2} />
        <motion.g initial={{ x: 0 }} animate={{ x: on ? 10 : 0 }} transition={run}>
          <path d="M6 20h22v8H6z" strokeWidth={2.6} />
          <path d="M6 20V16h22" strokeWidth={2.2} />
          <path d="M29 18h9v4h-11" strokeWidth={2.6} />
          <path d="M8 28l2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2" strokeWidth={1.5} />
        </motion.g>
        <motion.path
          d="M6 29h22"
          strokeWidth={2.2}
          initial={{ opacity: 0 }}
          animate={{ opacity: on ? 1 : 0 }}
          transition={{ duration: 0.25, delay: on ? 0.5 : 0 }}
        />
      </IconFrame>
    </Svg>
  );
}

/* ── 4. Paint & wall finish — a roller laying a coat ─────────────────────── */

function IconPaint({ size, className, active = false }: IconProps) {
  const ok = useMotionOk();
  const on = active && ok;
  const sweep: Transition = { duration: 0.85, ease: EASE };
  return (
    <Svg size={size} className={className}>
      <IconFrame transform={FRAME_T.paint}>
        <rect x="5" y="6" width="38" height="27" strokeWidth={2.6} />
        <motion.path
          d="M8 8.5h22v22H8"
          strokeWidth={2}
          initial={{ opacity: 0 }}
          animate={{ opacity: on ? 0.5 : 0 }}
          transition={{ duration: 0.35 }}
        />
        <motion.g initial={{ x: 0 }} animate={{ x: on ? 12 : 0 }} transition={sweep}>
          <rect x="9" y="10" width="14" height="8" rx="2" strokeWidth={2.6} />
          <path d="M16 18v5" strokeWidth={2.2} />
          <path d="M12 23h8v14h-8z" strokeWidth={2.6} />
          <path d="M12 28h8" strokeWidth={1.4} />
        </motion.g>
      </IconFrame>
    </Svg>
  );
}

/* ── 5. Exterior & seasonal — a ladder set against the wall ──────────────── */

function IconExterior({ size, className, active = false }: IconProps) {
  const ok = useMotionOk();
  const on = active && ok;
  const rise: Transition = { duration: 0.8, ease: EASE };
  return (
    <Svg size={size} className={className}>
      <IconFrame transform={FRAME_T.exterior}>
        <path d="M24 43V22l19-9v30" strokeWidth={2.8} />
        <path d="M43 13l5 2.5" strokeWidth={2.2} />
        <path d="M28 40h11" strokeWidth={1.4} />
        <path d="M4 43L20 12" strokeWidth={2.8} />
        <path d="M14 43L30 12" strokeWidth={2.8} />
        <path d="M8.5 35h15M12 28h15M15.5 21h14" strokeWidth={1.6} />
        <motion.path
          d="M18.5 31.5h4.5"
          strokeWidth={4}
          initial={{ y: 0 }}
          animate={{ y: on ? -14 : 0 }}
          transition={rise}
        />
      </IconFrame>
    </Svg>
  );
}

/* ── 6. Safety & accessibility — a grab bar anchored to the studs ────────── */

function IconSafety({ size, className, active = false }: IconProps) {
  const ok = useMotionOk();
  const on = active && ok;
  const fix: Transition = { duration: 0.4, ease: EASE };
  return (
    <Svg size={size} className={className}>
      <IconFrame transform={FRAME_T.safety}>
        <path d="M9 6v36M39 6v36" strokeWidth={2.6} />
        <path d="M5 22h38" strokeWidth={3.4} />
        <path d="M12 22v9h6v-9M30 22v9h6v-9" strokeWidth={2.4} />
        <motion.g initial={{ opacity: 0.3 }} animate={{ opacity: on ? 1 : 0.3 }} transition={fix}>
          <path d="M15 8v10M33 8v10" strokeWidth={2.2} />
        </motion.g>
      </IconFrame>
    </Svg>
  );
}

/* ── registry ────────────────────────────────────────────────────────────── */

const MARKS: Record<string, (p: IconProps) => React.ReactElement> = {
  repairs: IconRepairs,
  "plumbing-electrical": IconPlumbing,
  carpentry: IconCarpentry,
  paint: IconPaint,
  exterior: IconExterior,
  safety: IconSafety,
};

export function ServiceMark({
  id,
  size = 48,
  className = "",
  active = false,
}: {
  id: string;
  size?: number;
  className?: string;
  active?: boolean;
}) {
  const Mark = MARKS[id];
  if (!Mark) return null;
  return <Mark size={size} className={className} active={active} />;
}
