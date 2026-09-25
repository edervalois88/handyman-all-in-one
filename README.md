# HandyMan All-in-One — website

The marketing site for **HandyMan All-in-One**, a residential home repair and maintenance
company. Built bilingual (English at `/`, Spanish at `/es`) on Next.js 16 + Tailwind v4, and
deployed as fully static pages.

> **Your home, handled.** — One company. One standard. One point of contact.

---

## ⚠️ Replace these before launch

Every business detail lives in **one file**: [`src/lib/site.ts`](src/lib/site.ts).
Anything the site renders as a fact and the owner has to supply is there, and is also marked
with a gold asterisk in the UI so it is impossible to miss.

| What | Where | Current placeholder |
|---|---|---|
| Phone number | `site.contact.phone` / `phoneHref` | `(555) 010-2288` |
| Email | `site.contact.email` | `hello@handymanallinone.com` |
| Address | `site.contact.addressLine`, `city`, `state`, `zip` | `1420 Workshop Ave` |
| Public URL | `site.contact.url` | the Vercel URL |
| Service areas | `site.areas` | 8 invented towns |
| Hours | `site.hours` | 7–6 weekdays, 8–3 Sat |
| Response / warranty figures | `site.proof` | stated commitments, not measured |
| License number | `site.credentials.license` | `HIC #0000000` |

Four FAQ answers are deliberately written as *"Placeholder answer — state your real policy"*
(quote fee, response time, permits, materials). Replace them in
[`src/lib/dict.en.ts`](src/lib/dict.en.ts) and [`src/lib/dict.es.ts`](src/lib/dict.es.ts).

The site also states four operating commitments it cannot yet prove. Each carries a gold `*`
with a footnote on the same surface, and each must be replaced with a number the business can
actually hold on its busiest week — or dropped:

| Commitment | Where | Token |
|---|---|---|
| Same business day response | Home, process step 01 | `dict.*.process.steps[0].meta` |
| 2-hour arrival window | Home, process step 04 | `dict.*.process.steps[3].meta` |
| 1-year workmanship warranty | Home, process step 05 and the CTA list | `dict.*.process.steps[4].meta` |
| We call back the same day | Contact, "Or just call" card | `dict.*.contact.asideBody` |

**No fabricated social proof ships anywhere.** There are no review counts, star ratings, years
in business, project totals or customer logos on this site, because none of those are knowable
yet. If you add them, add only what you can prove.

### Wiring the quote form

The quote form is real (validation, checkbox states, success and error states, reference
number) but sends nowhere yet. Connect it in
[`src/components/QuoteForm.tsx`](src/components/QuoteForm.tsx) — look for the
`── Replace this block with your real endpoint ──` marker:

```ts
const res = await fetch("/api/quote", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
if (!res.ok) throw new Error("send failed");
```

Add `src/app/api/quote/route.ts` to forward to email (Resend, Postmark, SendGrid) or a CRM.

---

## The brand

The site is built entirely from the supplied brand book. The palette is treated as law.

| Role | Token | Hex | Used for |
|---|---|---|---|
| Primary | `navy` | `#1D2945` | Backgrounds, type, the walker mark |
| Primary neutral | `cream` | `#F4EDDA` | Page ground, reversed logos |
| Primary accent | `red` | `#C74732` | **Actions, stamps and state only** |
| Secondary accent | `gold` | `#D69A3A` | Placeholder marks, licensed-partner stamps |
| Supporting | `sage` | `#8A9A83` | Outdoor / maintenance register |

Workwear Red never fills a large background field, per the brand book's own instruction — it is
reserved for calls to action, stamps and small graphic details.

### Typography

The book names two options, and they are not equivalent in cost. **Option 1** is *Acumin Pro
Condensed*, with *Acumin Pro Regular* for subtitles and *Acumin Pro Thin* for text — a commercial
Adobe Fonts family, so using it on the web means buying a licence. **Option 2** is *Lato*
(Bold / Medium / Regular), which is **free under the SIL Open Font License** and could be adopted
at no cost today.

The site currently ships neither. It runs on three open faces chosen to carry the same character:

| Role | Face | Why |
|---|---|---|
| Display | **Oswald** | Heavy condensed grotesk, matching the `HANDYMAN` logotype |
| Labels / UI | **Barlow Condensed** | Condensed label work, workwear-signage register |
| Body / data | **Courier Prime** | The world is mid-century service paperwork |

All three are self-hosted at build time by `next/font/google` — no runtime request to Google.

**This is a substitution, and it is the client's decision to reverse.** Acumin Pro Condensed has no
free equivalent — condensed grotesks at that weight are the whole reason the family is licensed —
so Oswald and Barlow Condensed are the closest open stand-ins, not the book's faces. Lato is the
cheaper half of the question: it is free, and swapping the body face to Lato would take one line in
`src/app/layout.tsx` plus the `--font-*` tokens in `globals.css`. It has no condensed cut, though,
so it cannot replace the display face without giving up the logotype's proportions. The option that
matches the book exactly is Acumin, and that one needs a licence purchase.

### Logo assets

`public/brand/` holds the production artwork, extracted from the brand book PDF and recoloured
to exact brand values (the source panels are bitonal, so the mark is pixel-faithful):

| File | Use |
|---|---|
| `mark-navy.png`, `mark-cream.png` | Header, footer, reversed placements |
| `mark-red.png`, `mark-gold.png`, `mark-sage.png` | Alternate grounds |
| `lockup-*.png` | Full vertical lockup (mark + wordmark + tagline) |
| `icon-192.png`, `icon-512.png`, `apple-icon-180.png` | Favicons, home-screen icon |
| `og-card.png` | Social share card (1200×630) |
| `stamp-impression.png` | Rubber-stamp ink mask, generated by `assets/build-stamp-impression.py` |

The direction contract and the direction verdicts are recorded in
[`.impeccable/`](.impeccable/), and `DESIGN.md` documents the built system. The raw brand book
and its extracted pages are archived in [`assets/brand-book/`](assets/brand-book/), with
[`assets/build-assets.py`](assets/build-assets.py) to regenerate `public/brand/` from them.

### Colour contrast

Every pair below was measured, not estimated. AA needs **4.5:1** for body text and **3:1** for
large text (≥24px, or ≥18.66px bold).

| Pair | Ratio | Verdict |
|---|---|---|
| Gold `#D69A3A` on Navy | 5.87:1 | pass — kept as-is |
| Navy on Gold `#D69A3A` | 5.87:1 | pass — kept as-is |
| `--gold-ink` `#8A6014` on Cream | 4.78:1 | pass |
| `--ink-soft` `#55607C` on Cream | 5.36:1 | pass |
| `--ink-soft` on Cream-Warm | 5.00:1 | pass |
| Navy `/70`–`/75` on Cream (body) | 5.07–5.92:1 | pass |
| Cream `/70`–`/85` on Navy | 6.79–9.36:1 | pass |
| White on Workwear Red (buttons) | 4.80:1 | pass |
| Workwear Red `#C74732` on Cream | 4.11:1 | **large text only** |
| Cream on Workwear Red | 4.11:1 | **large text only** |

Three substitutions exist because the brand palette alone does not clear AA in the roles the
book assigns it:

- **`--gold-ink` (`#8A6014`)** — Utility Gold is a legitimate *fill* and stays the token for gold
  surfaces and for gold on navy. Every piece of gold **text on a light ground** uses this ink.
- **`--ink-soft` (`#55607C`)** — the secondary ink. Low-opacity navy (`navy/60` and below) reads
  as a tasteful grey and measures 1.6–3.8:1 on cream; this token carries the same register at
  5.36:1. It is used for field labels, ghost numerals, table criteria, line numbers, the
  "Covered" tags and the maintenance stamp.
- **The hero sub-line** is set bold at ≥1.17rem so that Workwear Red on Cream qualifies as
  *large* text (3:1 threshold) rather than body text. The brand's red survives there unchanged.

Workwear Red is only ever used on cream as large or bold text, or as a small graphic detail —
never for body copy. Soft Sage (`#8A9A83`) is a surface colour at 2.4:1 on cream, so it is never
used as an ink; the maintenance register it represents is carried by wording instead.

The gold asterisk system is the placeholder marker: **any figure, timeline or detail the
business has not yet confirmed carries a gold `*`** with a footnote on the same surface. That
currently covers the hero demonstration ticket, the four process timelines, the promised
response time on the contact page, the closing-CTA expectation list, and every placeholder
business detail.

---

### Motion

There is **one animation authority**: [`motion`](https://motion.dev) (the library formerly called
Framer Motion). Nothing animates from CSS keyframes and no second animation runtime is loaded.

**Three authored moments, and no fourth:**

1. The job ticket feeds into the panel and its APPROVED stamp strikes — the page's narrator.
2. Each commitment in the promise band is **pinned to the board** in turn. This is the site's only
   scroll response, and it is made of the world's own action rather than a generic rise.
3. The `STATUS` board cycles the states a job passes through.

`TicketNumber` counts the services line numbers up once, which is a fourth small one-shot — a work
order numbering its own lines, on one page only.

Mechanics live in [`src/components/motion/primitives.tsx`](src/components/motion/primitives.tsx):
`useArrival`, `PinToBoard`, `TicketNumber`, and the house curve `cubic-bezier(0.16, 1, 0.3, 1)`.

**There is deliberately no generic `Reveal`.** An earlier version of this layer wrapped every
heading and every list in the same fade-and-rise: roughly forty identical entrances across five
routes. A reviewer sent that back twice, correctly — a uniform entrance is not motion, it is a
texture, and it diluted the one moment that was doing work. If you want to animate a new section,
author its moment from the world's materials, or let it stay still. The comment at the top of
`primitives.tsx` says the same thing where you will actually see it.

**The safety rule, and why it exists.** An entrance must never be able to strand content. A pure
`whileInView` reveal leaves an element at `opacity: 0` forever if the observer never fires —
skipping to an anchor, find-in-page, a very fast scroll, or printing all do that. The first build
of this layer shipped that bug and six comparison cards were caught permanently invisible. Every
animated element now fires on **whichever comes first**: entering view, or a 1.4s failsafe after
mount. The worst case is an arrival that happens early; content is never invisible. Under
`prefers-reduced-motion` nothing animates and everything renders in its final state.

### Vendored components from React Bits

`src/components/reactbits/` holds components from [React Bits](https://reactbits.dev), which is
distributed as source you copy in rather than as an npm package. Read
[`src/components/reactbits/README.md`](src/components/reactbits/README.md) for the licence
(MIT + Commons Clause, Copyright © 2026 David Haz) and for exactly what was changed locally.

- **`SplitFlapText`** renders the ticket's `STATUS` field as the mechanical board an office would
  actually have on the wall, cycling through the states a job passes through. Its logic is
  upstream's; its stylesheet is rewritten, because upstream draws the tiles with gradients, inset
  shadows and 3D perspective — simulated physicality, which this project refuses. The local
  version is flat paper: navy ink on cream stock, one hairline across the fold, `--lift-1` for
  depth.

  **The board never drops below the field scale, and there is exactly one of it.**
  Two faults were found here by measuring, and both are worth knowing before touching this
  component:

  1. Scaling the type down by a viewport query was wrong. At 390px the ticket's field row stacks
     label-over-value, so the board has the column's full width — the scale was spending a wide
     margin to shrink the one field that carries state. A narrow column now gets **shorter states
     at the same size** (`ticketStatusCycleShort`): a brief word at the field scale beats a long
     one at half of it.
  2. Mounting both variants and hiding one with CSS was wrong. `display: none` stops neither a
     timer nor a `requestAnimationFrame` chain, so the hidden board kept flipping forever — and
     on phones the hidden one is the *longer* phrase set, i.e. the bigger board spinning hardest
     on the device class least able to afford it. `src/components/StatusBoard.tsx` mounts exactly
     one board and measures the column with a probe that sits out of flow, so its own width can
     never shrink the column it is measuring. That feedback loop was the third fault, and the
     subtlest: an over-predicting estimate made the board overflow, the overflow shrank the
     column, and the observer then measured the shrunken column and rejected the full phrase for
     a reason it had caused itself.

  The ticket's value lane is `minmax(min-content, 1fr)` for the same reason: a fixed-length
  instrument cannot live in a track that is allowed to squeeze it.

  | width | EN | ES |
  |---|---|---|
  | 320 | Quote approved (206px) | Cotización aprobada (261px) |
  | 390 | Quote approved (205px) | Cotización aprobada (261px) |
  | 1440 | Quote approved (205px) | Cotización aprobada (261px) |

  The full state is used at **every** width in both languages. The short set remains as the
  fallback for a genuinely narrower column.

> `CountUp` was vendored here and has since been **deleted as unused** — nothing imported it. It is
> not present in this build.

Components from the wider catalogue were **rejected on evidence**, not on taste: `SplitText` and
`Shuffle` import `gsap/SplitText`, a Club GreenSock plugin that is not in the free `gsap` package,
so they fail the production build. `ScrollStack` pulls in Lenis for smooth scrolling, a second
motion runtime.

> Note on naming: the npm package literally called `react-bits` is **not** this library. It is an
> unrelated 2017 React Native helper (`dmiller9911/react-bits`) that depends on
> `create-react-class`. The official React Bits installs through `jsrepo` or `shadcn`.

---

## The concise home — `/concise`, `/es/concise`

The client asked for a home page that reads in **under 30 seconds**, is friendlier on first contact,
and leans on interaction and iconography instead of paragraphs — without losing the look and feel.

Rather than replace the home page, the answer lives beside it. **`/concise` is a second front door
that is deliberately absent from the header, the footer and the sitemap**, so the long home can be
compared against it on the same phone and the client decides which one becomes `/`. Delete the
loser's route files and move the winner's component into `home.tsx` when that is settled.

Where the words went:

| | long home `/` | concise `/concise` |
|---|---|---|
| **prose — the reading path** | **448** | **71** |
| scanned data (ticket values, towns, questions) | 824 | 109 |
| chrome (nav, buttons, footer) | 76 | 38 |
| everything in `<main>` | 1,679 | 243 |
| **prose reading time at 200 wpm** | **2m14s** | **21s** |
| whole page read line by line | 6m44s | 1m05s |
| desktop height | 8,960px (10 screens) | 2,197px (2.4 screens) |
| phone height | 15,800px (17.6 screens) | 3,627px (4 screens) |
| footer words (all 13 routes) | 96 → **85** | 85 |

**The 30-second figure is about prose, and that is the only reading of it that survives contact with
a real page.** A ticket's field values, a list of eight town names and three table rows of questions
are scanned, not read in order; the nav is not read at all. Of the concise page's 243 words in
`<main>`, 71 are sentences. The four longest prose runs on the entire page are 8, 10, 10 and 10
words — there is no paragraph to get lost in.

The rule the block list follows: **the home page answers, the inner pages explain.** Service detail
went to `/services`, the process to `/about`, and the remaining questions to `/contact`, which is
where the answers already were.

Two things worth knowing before editing it:

- **It carries its own headline line.** `concise.heroLine` replaces `whatWeDo.line` here. The long
  version spends its second half on a concrete example — *"from a sticking door to repainting a
  floor"* — which earns its words on a page a reader is settling into and does not earn them in a
  hero that has to land in one glance. `whatWeDo.line` is untouched for the long home.
- **The service tile hint says "tap or point at one".** It said *"point at one"*, which is wrong on
  every touch device, where there is nothing to point with. The tiles are buttons.

### Measuring it

The numbers above were taken with Playwright against a production build, not estimated:

```bash
npm run build && npx next start -p 4177   # serve the real build
# then drive it with Playwright: count words in <main>, measure its height
```

If you re-measure, **count text nodes, not elements.** Summing `main a` + `main span` + `main li`
double- and triple-counts every word nested inside another of those selectors and reports a total
about 40% too high. An earlier version of that script also read `<style>` text — `SplitFlapText`
ships an inline stylesheet — which added 518 phantom "words" to the hero. And a shut `<details>` is
not part of the reading path: Chrome hides it with `content-visibility`, which leaves the box
non-zero, so a naive visibility test counts three collapsed answers as prose the reader has read.
All three mistakes produced a confident, wrong number.

### Motion today: four authored moments

The README has claimed "three, and no fourth" since the first build. What is actually in the tree is
four, and the honest list is:

1. The job ticket feeds into the panel and its APPROVED stamp strikes — the page's narrator.
2. Each promise-band commitment is **pinned to the board** in turn — the only scroll response.
3. The `STATUS` board cycles the states a job passes through.
4. `Preloader` walks the walker mark across the screen, once per session, with a hard failsafe and a
   `prefers-reduced-motion` bypass.

That is still far from one identical entrance per section, which is the thing the rule was written
to prevent. The service marks and the `PinToBoard` band are **interactions**, not entrances, and do
not count against it.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
npx tsc --noEmit # typecheck
```

## Project structure

```
src/
  app/
    layout.tsx              root document, fonts, metadata
    page.tsx                /            (EN home)
    es/page.tsx             /es          (ES home)
    concise/page.tsx        /concise     (EN concise home — comparison route)
    es/concise/page.tsx     /es/concise  (ES concise home — comparison route)
    services/, service-areas/, about/, contact/                 EN routes
    es/services/, es/service-areas/, es/about/, es/contact/     ES routes
    not-found.tsx, robots.ts, sitemap.ts
  components/
    Header.tsx              sticky nav, mobile drawer, EN/ES toggle
    Footer.tsx              contact, hours, coverage, placeholder notice
    Hero.tsx                first viewport + the promise band
    WhatWeDo.tsx            the offer as a ruled legend of six marked entries
    ServiceMarks.tsx        the six service drawings + the shared icon frame
    SiteIcons.tsx           the utility glyph set, and the rule for using it
    ConciseBlocks.tsx       the concise home's blocks
    Preloader.tsx           the walker, once per session
    StatusBoard.tsx         the split-flap status field
    sections.tsx            problem, solution, services, process, compare, areas, FAQ, CTA
    QuoteForm.tsx           the conversion surface
    Logo.tsx, ui.tsx, LocaleShell.tsx, NotFoundPage.tsx
  lib/
    site.ts                 ← ALL replaceable business data + routing helpers
    dict.en.ts              English copy (source of truth for structure)
    dict.es.ts              Spanish copy, typed against the English dictionary
    i18n.ts                 dictionary accessor
    pages/
      make.tsx              per-language page factories
      home.tsx, concise.tsx, services.tsx, areas.tsx, about.tsx, contact.tsx
      routes.ts
assets/
  brand-book/               the source PDF, extracted pages and artwork
  build-assets.py           regenerates public/brand/ from that artwork
```

### The icon frame, and why the marks have numbers in them

[`ServiceMarks.tsx`](src/components/ServiceMarks.tsx) draws six marks in a shared 48-unit `viewBox`
and normalises each one inside an `IconFrame` group. The numbers in its `INK` table are measurements
of each drawing's painted bounding box, including half a stroke on every side, and they exist
because **a shared viewBox is not a shared silhouette.**

Measured on the drawings as authored, the six marks' ink started at y=4, 4, 16, 6, 12 and 6 and
ended at y=44, 40, 43, 37, 43 and 42 — a 12-unit variance. In a row of six equal tiles that reads as
a crooked row: the handsaw floats, the door and the ladder hang low. Every mark was individually
fine and the set was wrong. Mapping each ink box onto one shared box took the misalignment from
**7.3px to 2.7px** as measured against the labels they sit above.

Two notes for anyone changing a drawing:

- **Recompute its `INK` row**, or the row goes crooked again in a way that is easy to see and hard
  to attribute.
- **`vectorEffect="non-scaling-stroke"` on the frame group is load-bearing.** A group `transform`
  scales the stroke with everything else, so normalising would otherwise also thin the heavier
  marks — the exterior at scale 0.815 would render its 2.8 weight at 2.28px next to the door's
  2.51px, and the set would read as a family with one member drawn in a lighter pen. With
  non-scaling strokes every mark renders the weight it declares.

### Bilingual by construction

`dict.es.ts` is typed against `DictValue<typeof en>`, so a key added to English and forgotten in
Spanish is a **build error**, not a silent English fallback. Both languages are statically
prerendered at build time, and every page emits `hreflang` alternates plus a canonical URL.

To add a page: create the copy in both dictionaries, add the component in `src/lib/pages/`, then
create the two thin route files (`src/app/<slug>/page.tsx` and `src/app/es/<slug>/page.tsx`) that
call the matching factory in `make.tsx`.

---

## Deployment

Static output, so any host works; it is deployed on Vercel with zero configuration.

```bash
git push origin main          # Vercel builds and deploys automatically
vercel --prod                 # or deploy from the CLI
```

After the first deploy, set `site.contact.url` in `src/lib/site.ts` to the real domain so the
canonical URLs, `robots.txt` and `sitemap.xml` point at the right host.

---

## Credits

Brand identity and brand book: **Ochoa Studio**.
