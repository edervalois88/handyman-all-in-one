React Bits — vendored components
================================

The files in this directory come from **React Bits** (https://reactbits.dev), an open-source
collection of animated React components. React Bits is distributed as source you copy into your
project (its official install path is the `jsrepo` or `shadcn` CLI), not as an npm package.

## Licence and attribution

React Bits is released under the **MIT + Commons Clause License Condition v1.0**.
Copyright (c) 2026 David Haz.

The grant permits use, modification and distribution "as part of an application, website, or
product", including commercially. The Commons Clause restricts only selling the components
themselves, or a product whose value derives substantially from them — neither applies here.
The condition is that this notice is retained in the copies.

Upstream: https://github.com/DavidHDev/react-bits

## What was changed, and why

These files were **not** dropped in unmodified. Each was adapted to this project's design
system, and the changes are deliberate:

| File | Upstream | Local change |
|---|---|---|
| `SplitFlapText.tsx` | `SplitFlapText-TS-TW` | Four local changes, all recorded in the file: (1) the stylesheet was rewritten, because upstream renders each tile with layered gradients, inset box-shadows, a bevelled seam and 3D `perspective` — a simulated physical object, which this project refuses; the tiles are flat paper in the brand's tokens, and the flip is a 2D fold rather than a 3D rotate. (2) Tile width is fixed and the row never wraps, because an em-based width makes a fixed-length board jitter as it cycles and wrap mid-phrase on a phone. (3) The reduced-motion query uses `useSyncExternalStore` instead of `useState` + `useEffect`. (4) Accessibility: the settled phrase is exposed through an sr-only text node with the board `aria-hidden`, replacing upstream's `role="text"` + `aria-label` on a generic container (`role="text"` is not an ARIA role and a named generic element is dropped by some assistive tech). The component logic — tile state, per-character flip sequencing, stagger — is upstream's. |

`CountUp` was vendored here and then **deleted**: it was not used anywhere, and dead
third-party code carrying a licence obligation is worse than no file. `TicketNumber` in
`src/components/motion/primitives.tsx` covers what it would have done, with the
zero-padding a work-order line number needs.

`SplitFlapText` remains MIT + Commons Clause and keeps this directory's attribution.

## Which runtime each one needs

- `CountUp` → `motion` (installed)
- `SplitFlapText` → React only

Nothing here pulls GSAP, OGL, Three.js or Lenis. Components from the wider catalogue that depend
on the premium GSAP plugins (`SplitText`, `Shuffle`) were rejected: `gsap/SplitText` is a
Club GreenSock plugin and is not in the free `gsap` package, so it would fail the production
build.
