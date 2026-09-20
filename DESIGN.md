# DESIGN.md — HandyMan All-in-One

The durable design decisions behind the marketing site. Written from the **built** world, not
from intention: every value here is one the code actually ships. Product truth lives in
[PRODUCT.md](PRODUCT.md); replaceable business data lives in
[`src/lib/site.ts`](src/lib/site.ts).

---

## 1. The world: The Work Order

**The one idea.** The accountability this brand sells — *one company, one standard, one point of
contact* — is not provable in an advertisement. It is provable on a piece of paper: a work order
with a price, a date, and an approval stamp on it. So the site is built as that paperwork.

**What it refuses.** The category's default landing page — navy hero, stock photo of a smiling
technician in a polo, "Your Trusted Local Handyman", four generic icon cards, a carousel of
invented five-star reviews, three checkmark bullets. And its predictable opposite: black, one
neon accent, oversized grotesk.

**How it was chosen.** A direction roll assigned grounded candidate 6 of 7 from the build's own
list. Six challengers were fused and given verdicts — one competitive (an early-80s drum-machine
step row), five declined (a darkroom exposure record, a Movida scene magazine, a teen-magazine
quiz spread, a Łowicz papercut, Versailles' axial vistas). Four **donor raises** were folded in,
and each is visible in the shipped system:

| Donor (verdict) | Discipline transferred | Where it shows |
|---|---|---|
| Exposure record — *declined* | meaning rides on a finite, enumerated tonal ramp, never on improvised colour | the closed palette contract in §3 |
| Drum machine — *competitive* | a temporal plan made spatially legible, with "where now" always shown | the five-step process timeline and its stage chips |
| Versailles — *declined* | every element carries an inspectable state | each service states in-house vs. licensed partner |
| Papercut — *declined* | depth by overlap, with no shading anywhere | `.sheet-stack`, the perforated stub, zero gradients |

Source record: [`.impeccable/direction-verdicts.md`](.impeccable/direction-verdicts.md).

---

## 2. Tokens and structure

All tokens are CSS custom properties in [`src/app/globals.css`](src/app/globals.css), exposed to
Tailwind v4 through `@theme inline`. There is no Tailwind config file; the CSS *is* the config.

```
--navy #1D2945   --navy-ink #16203A   --cream #F4EDDA
--cream-warm #EFE5CD   --cream-deep #E4D8BC
--red #C74732    --red-deep #A83A28
--gold #D69A3A   --gold-ink #8A6014
--sage #8A9A83   --sage-deep #6F7F69
--ink-soft #55607C
--rule  rgba(29,41,69,.18)   --rule-strong rgba(29,41,69,.42)
--lift-1 / --lift-2 / --lift-3   (paper elevation, offset + soft blur)
--shell 1240px
```

**Palette law.** Workwear Red is reserved for actions, stamps, state and small graphic details.
It never fills a large background field except the primary button itself. Utility Gold stays a
*fill* value; text on a light ground uses `--gold-ink`. Soft Sage is a surface colour and is never
used as an ink. Full ratios and the three substitutions: [README § Colour contrast](README.md).

**Layout.** One container (`.shell`, max 1240px), one vertical rhythm (16 / 20 / 24 in Tailwind
steps per band), and a single spacing principle: more space above a heading than below it. Bands
alternate ground (`--paper` with the 28px ruled line, plain cream, navy, or cream-warm) so the
page paces like a document rather than a stack of cards.

---

## 3. Typography

Three faces, all self-hosted at build time by `next/font/google` — the browser never contacts
Google.

| Role | Token | Face | Why |
|---|---|---|---|
| Display | `--font-display` | **Oswald** 400–700 | The logotype is a heavy condensed workwear grotesk; this is the closest open equivalent |
| Labels / UI | `--font-cond` | **Barlow Condensed** 400–700 | Condensed label work in the signage register |
| Body / data | `--font-mono` | **Courier Prime** 400/700 | The world is mid-century service paperwork, and the typewriter is its voice |

The brand book names Acumin Pro Condensed and Lato. Neither is licensable for the web; these
carry the same character. Display sits at `clamp(2.1rem, 5.4vw, 4.1rem)` for section headings and
up to `clamp(2.55rem, 8.6vw, 6.2rem)` for the hero, tracking `-0.005em` — well inside the
`-0.04em` floor. Body is Courier Prime at `1rem / 1.65` with a measure held to 52–68ch.

Classes: `.display`, `.label`, `.label-lg`, `.tnum` (tabular numerals for every figure — prices,
hours, phone numbers, line numbers).

---

## 4. Components

Every component is built in the world's own vocabulary. There is no stock component on the page.

| Component | File | What it is |
|---|---|---|
| `Stamp` | `components/ui.tsx` | A rotated rubber stamp whose border is a filled box revealed only through an authored ink mask. Used for state, never decoration. |
| `SectionHead` | `components/ui.tsx` | Heading with the form line number in a ruled margin gutter. **No kicker and no eyebrow** — the heading names its own section. |
| `RuleNote` | `components/ui.tsx` | A ruled margin note: a titled lane divided from its body by a dashed rule, closed by the ticket rule. The work-order margin, not a side accent bar. |
| `TicketField` | `components/ui.tsx` | Dotted label/value row as printed on a work order. |
| `Sheet` / `.sheet-stack` / `.stub-b` | `globals.css` | Paper. `.sheet-stack` prints the carbon copy beneath; `.stub-b` closes a document with a perforated tear edge. |
| `Hero` + `PromiseBand` | `components/Hero.tsx` | The first viewport and the four-beat pledge. |
| `QuoteForm` | `components/QuoteForm.tsx` | The conversion surface: native validation, custom checkbox in the world's grammar, working success and error states. |
| `Header` / `Footer` | `components/` | Sticky nav with drawer and EN/ES toggle; footer with contact, hours, coverage and the placeholder notice. |

**Motion.** Exactly one authored moment is drawn from the world's own material: the job ticket
feeds into the panel and its APPROVED stamp strikes once just after it lands. Around it, bands
and lists settle once as they enter view. All of it is orchestrated by **one authority**,
[`motion`](https://motion.dev), in
[`src/components/motion/primitives.tsx`](src/components/motion/primitives.tsx) — no CSS keyframes
and no second runtime. The house curve is `cubic-bezier(0.16, 1, 0.3, 1)`: fast departure, long
settle, no overshoot, no bounce.

An entrance may never strand content. A pure `whileInView` reveal leaves an element at
`opacity: 0` forever when the observer does not fire — skipping to an anchor, find-in-page, a
very fast scroll, or printing. Every reveal therefore fires on whichever comes first: entering
view, or a 1.4s failsafe after mount. Under `prefers-reduced-motion` nothing animates and
everything renders in its final state.

**Third-party components.** [`src/components/reactbits/`](src/components/reactbits/) carries
components from React Bits, vendored and attributed (MIT + Commons Clause, © 2026 David Haz).
`SplitFlapText` renders the ticket's `STATUS` field as the office's mechanical board, cycling the
states a job passes through — upstream's logic with this world's surface, because upstream's
tiles are gradients, inset shadows and 3D, which §6 refuses. `CountUp` was vendored and then
deleted as unused.

### The service marks

[`src/components/ServiceMarks.tsx`](src/components/ServiceMarks.tsx) holds six hand-drawn SVGs,
one per service category. They are **not** pictograms: no rounded glyph in a soft tinted square.
Each is a flat, single-weight line drawing of the *work* the service does, on the same technical
register as the field rules and perforations elsewhere on the page — a door in its frame, a pipe
run with a handwheel, a handsaw, a paint roller, a ladder against a house, a grab bar through its
studs.

Three rules govern them, and the first draft broke all three:

1. **One dominant silhouette each, and no two alike.** The first draft drew abstract diagrams, and
   at 40px four of the six were indistinguishable. Each now leads with a shape nobody could
   confuse for another.
2. **Fill the frame.** Each primary shape spans roughly 36 of the 48 units.
3. **Survive 16px.** If the silhouette does not read at 16px it is an illustration, not an icon.

Each mark carries exactly **one moving part**, and that part performs the action the service
performs: the door swings, the handwheel turns, the saw runs, the roller rolls, the hand climbs,
the bolt drives home. The motion is the meaning, so it is an **interaction, not decoration** — the
mark animates on hover or keyboard focus and is still otherwise. That is what keeps it outside the
page's rule of three authored *moments*: an interaction is not a fourth entrance, and a visitor
who never points at a mark is never distracted by one. Under `prefers-reduced-motion` nothing
moves, which took an explicit gate — Motion does not honour the preference on its own.

### Saying what the company does

Above the fold the page leans on the tagline, which is evocative rather than descriptive. A
first-time visitor skimming has to be able to answer "what is this and what can it do for me", so
[`WhatWeDo.tsx`](src/components/WhatWeDo.tsx) sits directly under the hero and does two things:
one plain sentence with no brand language in it, and a six-entry **legend** of the categories.

The legend is deliberately not six equal icon cards — the category default, and one the craft
floor refuses. It is a single ruled index: six entries on one line, hairline rules doing the
separating, and pointing at or tabbing to an entry names what that category actually covers. That
reveal is the information a visitor is looking for, and the reason the marks exist at all.

**Browser surfaces.** `::selection` is red on cream, `:focus-visible` is a 3px red ring, `<html>`
carries `scroll-behavior: smooth` (reverted under reduced motion), tabular numerals ship on every
figure, and the FAQ toggle is an authored SVG rather than a glyph.

---

## 5. Type system check

| Check | Result |
|---|---|
| Body / placeholder text ≥ 4.5:1 | pass — every pair measured; see README |
| Large text ≥ 3:1 | pass |
| Body measure 65–75ch | 52–68ch, tighter than the range on purpose: the typewriter face is wider per character |
| Display ≤ 6rem | 6.2rem on the hero only |
| Tracking ≥ −0.04em | −0.005em |
| Elevation declared once | `.sheet` uses border + lift; `.sheet-raised` uses lift alone |
| Card radii | 3px. This world's paper has cut corners, not rounded ones |
| Backgrounds | one-axis ruled line in the brand's own navy; no two-axis overlay, no gradient |
| Icons | authored SVG only, drawn at one stroke weight |
| No gradient text, no glass, no glow | confirmed |

---

## 6. What this system deliberately does not do

- **No fabricated proof.** No reviews, ratings, counts, years or logos anywhere.
- **No photography.** The brand book's imagery is a licensed mood board, so the site carries the
  mark, the palette and authored material instead. This is the single largest available upgrade —
  see [ANALISIS-DEL-NEGOCIO.md § 7](ANALISIS-DEL-NEGOCIO.md).
- **No unmarked claims.** Every figure or timeline the business has not confirmed carries a gold
  `*` with a footnote on its own surface.
- **No kickers, eyebrows or hero-metric scaffolds.** A large translucent ordinal beside a heading
  was removed rather than re-tinted.
- **No side accent bars.** The one device that resembles one is `RuleNote`, which is a titled
  gutter, not a stripe.

---

## 7. Adding to it

1. **Copy** goes in both dictionaries. `dict.es.ts` is typed against `DictValue<typeof en>`, so a
   key added in English and forgotten in Spanish is a build error, not a silent fallback.
2. **A new page**: add the copy, add the component under `src/lib/pages/`, add it to
   `pages/make.tsx`, then two thin route files — `src/app/<slug>/page.tsx` and
   `src/app/es/<slug>/page.tsx`.
3. **Business data**: `src/lib/site.ts` only.
4. **Brand artwork**: regenerate from the archived source with
   `assets/build-assets.py`; the stamp mask with `assets/build-stamp-impression.py`. Both are
   deterministic.

---

## 8. Provenance

| Gate | Result |
|---|---|
| Design detector | zero warnings; one advisory (the ruled paper ground), reviewed and ruled correct |
| Finish review | `disposition: ship` after four passes — 8 material fixes, then a contrast/motion cleanup, then an authored stamp asset, then the line-number rule |
| Bilingual parity | 5 routes × 2 languages, statically prerendered; `hreflang` + canonical on every page |
| Quote form | functionally verified in both languages: success state with a reference number; empty submit blocked by 6 native invalid fields |
| Accessibility | skip link, landmarks, `aria-current`, `aria-expanded`/`aria-controls`, labelled controls, `role="alert"` / `role="status"`, reduced-motion honoured |

Brand identity and brand book: **Ochoa Studio**.
