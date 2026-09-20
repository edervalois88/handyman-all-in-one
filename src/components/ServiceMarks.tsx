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

import { motion, type Transition } from "motion/react";
import { useMotionOk } from "./motion/primitives";

type IconProps = {
  size?: number;
  className?: string;
  active?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

function Svg({
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

/* ── 1. Everyday repairs — a door that sticks, swinging free ─────────────── */

function IconRepairs({ size, className, active = false }: IconProps) {
  const ok = useMotionOk();
  const on = active && ok;
  const swing: Transition = { duration: 0.55, ease: EASE };
  return (
    <Svg size={size} className={className}>
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
      <path d="M9 6v36M39 6v36" strokeWidth={2.6} />
      <path d="M5 22h38" strokeWidth={3.4} />
      <path d="M12 22v9h6v-9M30 22v9h6v-9" strokeWidth={2.4} />
      <motion.g initial={{ opacity: 0.3 }} animate={{ opacity: on ? 1 : 0.3 }} transition={fix}>
        <path d="M15 8v10M33 8v10" strokeWidth={2.2} />
      </motion.g>
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
