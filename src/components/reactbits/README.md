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
| `SplitFlapText.tsx` | `SplitFlapText-TS-TW` | The stylesheet was rewritten. Upstream renders each character tile with layered gradients, inset box-shadows, a bevelled middle seam and 3D `perspective`, i.e. a simulated physical object. This project forbids faked physicality and gradients, so the tiles are now flat paper: the brand's cream stock, a navy ink character, one hairline rule across the fold, depth from `--lift-1` only. The flip became a 2D fold rather than a 3D rotate. The component logic — tile state, per-character flip sequencing, stagger, reduced-motion handling, accessible label — is upstream's. |
| `CountUp.tsx` | `CountUp-TS-TW` | Unmodified. It already uses `motion/react` exclusively, which is this project's single animation authority. |

Both remain MIT + Commons Clause, and both keep this directory's attribution.

## Which runtime each one needs

- `CountUp` → `motion` (installed)
- `SplitFlapText` → React only

Nothing here pulls GSAP, OGL, Three.js or Lenis. Components from the wider catalogue that depend
on the premium GSAP plugins (`SplitText`, `Shuffle`) were rejected: `gsap/SplitText` is a
Club GreenSock plugin and is not in the free `gsap` package, so it would fail the production
build.
