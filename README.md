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
| **prose — the reading path** | **448** | **89** |
| scanned data (ticket values, towns, questions) | 778 | 97 |
| chrome (nav, buttons, footer) | 122 | 51 |
| everything in `<main>` | 1,348 | 237 |
| **prose reading time at 200 wpm** | **2m14s** | **27s** |
| whole page read line by line | 6m44s | 1m11s |
| desktop height | 8,996px (10 screens) | 2,251px (2.5 screens) |
| phone height | 15,800px (17.6 screens) | ~3,600px (4 screens) |
| footer words (all 13 routes) | 96 → **85** | 85 |

Run `node tools/word-budget.mjs` against a production build for the current figures across all
twelve routes.

**The 30-second figure is about prose, and that is the only reading of it that survives contact with
a real page.** A ticket's field values, a list of eight town names and three table rows of questions
are scanned, not read in order; the nav is not read at all. Of the concise page's 237 words in
`<main>`, 89 are sentences, and the longest of them is 11 words. Someone who reads every word
linearly takes about 71 seconds; someone *using* the page — reading the headings, the one line under
each, and pressing the tiles — takes well under 30, which is what the brief was asking for.

The rule the block list follows: **the home page answers, the inner pages explain.** Service detail
went to `/services`, the process to `/about`, and the remaining questions to `/contact`, which is
where the answers already were.

### The hero video

`public/video/hero.mp4` — 6.04s, 1284x716, 5.78 MB — is the client's own footage of the truck, and it
is the **ground of the concise hero**: full-bleed, with the copy on its own opaque navy panel and the
work-order ticket as a ruled strip below.

**Why a panel and not a text scrim.** The footage is a sunlit afternoon and the truck is near-white,
so cream or navy type straight onto it fails contrast in exactly the region the headline occupies.
The fix cannot be a dark wash, because this world has no gradients anywhere. So the text gets an
opaque panel with a hard edge — which is also what the site already is: navy panels on cream stock.

**The composition rule, and the first version got it wrong.** The panel was laid over a centred,
full-width video, which put it straight across the cab and left the frame showing a truck with no
front. Narrowing the panel did not fix it, because the problem was not the panel's width — the panel
and the subject were competing for the same pixels. The hero is now two tracks: the panel owns 46% of
the width, and the footage fills only what is left and is anchored right, so what gets cropped is the
house and the empty driveway the panel is sitting on. The truck stays whole.

**`object-position` is one constant shared by the video and by the status tag laid over it**, and that
is load-bearing rather than tidy. The watermark the tag covers is positioned relative to the footage,
so anything covering it has to use the same two numbers or it drifts off the mark as the viewport
changes.

Three more things were measured rather than reasoned, and two were wrong first:

- **The footage stopped 24px short of the bottom of the hero.** The cause was not the video: the hero
  section held the footage box PLUS a `checker` tear-edge strip below it, so the section was 48px
  taller than the box every child inside it was positioned against. `h-full` could not fix it, because
  a percentage height resolves against a content-driven parent. The box is now the whole hero and the
  tear edge is a border.
- **The caption moved off the footage and into the panel.** It was sitting on sunlit concrete, and
  light-on-light at 0.7rem is unreadable; a caption nobody can read is not a caption. The `ON SITE`
  tag on the footage says the same thing in the register the world uses.
- **Motion is gated, and the obvious gate does not work.** `autoPlay={motionOk}` fails, because
  `autoPlay` is a boolean attribute: the server renders it, and by the time the client could remove it
  the browser has already started. Skipping the `play()` call fails too — attaching a source to an
  element carrying `autoPlay` is itself what starts playback, so declining to start something you never
  started does nothing. The element is **paused** explicitly, on the media event as well as the effect.
  Verified paused under `prefers-reduced-motion` and playing without it.

**The loading deferral buys nothing today, and that is recorded, not hidden.** `preload="metadata"`
does not limit the fetch — Chrome asks for `bytes=0-` and Next returns all 5.78 MB — so the source is
attached by an `IntersectionObserver`. But the hero is on the first screen at every width, so it
attaches on load anyway. The observer stays because the placement may move, and because it puts the
cost where a future change has to see it.

**Page weight is 6.03 MB, 96% of it this one file.** That is the price of the footage and it is the
client's accepted call. Two ways down if it matters: re-encode at 960px and a higher CRF (a 6-second
loop of a truck does not need 1280px), or move the footage below the fold where the deferral starts
working.

> **The footage carries a visible "KlingAI 3.0" watermark**, bottom-right, 30px from the right edge
> and 23px from the bottom of the frame. It could not be removed in CSS — it is inside the video's own
> frame, and `object-fit: cover`, an oversized element, `transform: scale()` about the corner, and
> `clip-path` insets were all tried and measured; every inset deep enough to take the mark also took
> the back of the truck. The file's own metadata also declares it generated: the `udta/meta` atom
> carries `AIGC` with `"ContentProducer":"kling"`.
>
> **It is covered, on the client's instruction, by the `ON SITE` tag** in the footage's bottom-right
> corner — a piece of the brand rather than a redaction. The tag is a navy ground with a cream
> hairline, the same state register as the `APPROVED` stamp on the ticket, sized by `min-w`/`min-h` in
> `em` so it keeps covering the mark: 102x41px on the desktop footage track, against a mark needing roughly
> the last 12% covered. If the client supplies a clean export, the tag can go.

### What is still open on this page

Three things the page does not yet do, all recorded rather than quietly left:

- **Nothing above the fold on a phone says what the company does.** The first service tile is
  1.63 screens down at 390px. The hero does say it — "Repairs, maintenance and improvements" — but
  that line is 18px of type inside a 598px panel, and the six categories are not in the nav either.
  Fixing it properly means either a sixth item in the header nav or moving the tile row above the
  hero's work-order ticket on small viewports, and both change the composition the client has
  already approved at desktop. Worth a decision rather than a guess.
- **The page promises a price in three places and states none.** The ticket shows a price field, the
  picker says "we will quote the whole list in one price", and the meta description leads with "one
  price" — but `concise.faq[0]` is still the placeholder asking the owner to publish a call-out fee
  and minimum job. That is the owner's number to supply, not one to invent, so it stays a
  placeholder; it is the single highest-value piece of copy missing from the page.
- **The hero footage carries a visible KlingAI watermark** and the file is 5.78 MB. The mark is
  covered by the hero's `ON SITE` tag (see *The hero video*); the right fix is a clean export from
  Kling, after which the tag can go. The weight is a deliberate accepted cost, on the client's call.

Two things worth knowing before editing the copy:

- **It carries its own headline line.** `concise.heroLine` replaces `whatWeDo.line` here. The long
  version spends its second half on a concrete example — *"from a sticking door to repainting a
  floor"* — which earns its words on a page a reader is settling into and does not earn them in a
  hero that has to land in one glance. `whatWeDo.line` is untouched for the long home.
- **The service tile hint says "tap or point at one".** It said *"point at one"*, which is wrong on
  every touch device, where there is nothing to point with. The tiles are buttons.

### Measuring it

The numbers above come from Playwright against a production build, and the checks are in
[`tools/`](tools/) rather than in a scratch directory, so the next person can re-run them instead of
re-deriving them. They are not part of the build and Playwright is deliberately not an app
dependency — point `PW_PATH` and `CHROME_PATH` at an existing install.

```bash
npm run build && npx next start -p 4177     # the checks measure the real build, not the dev server

PW_PATH=~/.tools/node_modules/playwright-core CHROME_PATH=/path/to/chrome \
  node tools/overflow-audit.mjs      # 12 routes x 8 widths: lockup, overflow, status board
  node tools/word-budget.mjs         # prose / scanned / chrome, per route
  node tools/mark-alignment.mjs      # how straight the row of six service marks is
  node tools/picker-handoff.mjs      # the tile picker, end to end, both languages
  node tools/asterisk-balance.mjs    # every placeholder mark has a footnote
```

Three measurement mistakes are written into `word-budget.mjs` because all three produced a
confident wrong number here, and each one looked like a pass:

- **Counting elements rather than text nodes.** Summing `main a` + `main span` + `main li` double-
  and triple-counts every word nested inside another of those selectors — about 40% too high.
- **Counting `<style>` text.** `SplitFlapText` ships an inline stylesheet; read as copy it added 518
  phantom words to the hero. The fix for this was itself wrong once, because it was checked against
  the wrong node.
- **Counting a shut `<details>` as read prose.** Chrome hides accordion content with
  `content-visibility`, which leaves the box non-zero, so a naive visibility test counts answers
  nobody has opened.

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
    Logo.tsx, ui.tsx, LocaleShell.tsx, NotFoundPage.tsx, LangSync.tsx
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
public/
  brand/                    supplied logo artwork, recoloured to brand values
  video/hero.mp4            the client's own footage, the ground of the concise hero
  video/hero-poster.jpg     its first frame, so the hero is never an empty box
tools/                      verification scripts, run against a production build
  harness.mjs               shared Playwright setup
  overflow-audit.mjs        every route at 8 widths
  word-budget.mjs           prose / scanned / chrome, per route
  mark-alignment.mjs        how straight the row of six service marks is
  picker-handoff.mjs        the concise tile picker, end to end, both languages
  asterisk-balance.mjs      every placeholder mark has a footnote
```

### The icon frame, and why the marks have numbers in them

[`ServiceMarks.tsx`](src/components/ServiceMarks.tsx) draws six marks in a shared 48-unit `viewBox`
and normalises each one inside an `IconFrame` group. The numbers in its `INK` table are measured ink
boxes — what each mark actually paints, in its own coordinate space — and they exist because **a
shared viewBox is not a shared silhouette.**

Measured from rendering, the six marks' ink is 34.2x39.1, 37.2x33.4, 35.4x24.6, 35.4x28.4, 41.5x28.2
and 34.6x33.4 units. In a row of six equal tiles that reads as a crooked row: the handsaw floats,
the door hangs low. Every mark was individually fine and the set was wrong.

The first attempt at this shipped and did not work, in three separate ways. All three are worth
knowing, because each looked correct in review:

- **The `INK` table was derived by hand from path data.** Fine for lines, wrong the moment a shape
  rotates — the door is drawn at `rotate(-30)` — and it overstated the plumbing mark by 8 units, so a
  mark that is wider than tall was scaled as if it were tall.
- **The frame equalised the LONGEST side.** That sounds fair and is not: a wide mark comes out short,
  so the ladder and the saw rendered 26-27 units tall against the door's 41 — a 55% spread, worse on
  the axis the frame existed to fix. It now fits **height** and lets width fall where it may, the way
  letters do.
- **`vectorEffect="non-scaling-stroke"` was on the `<g>`.** It applies to graphics elements and is
  not inherited, so every child computed to `none`, the group transform thinned the heavier marks,
  and the set shipped with a 1.31x spread in stroke weight — precisely the defect the comment
  claimed the attribute was preventing. `frameShapes()` now walks each mark and puts it on every
  shape, so a shape added later cannot miss it.

Measured against the labels the marks sit above, before and after the rewrite:

| | before | after |
|---|---|---|
| ink centre misalignment | 7.3px | **0.2px** |
| gap to label, spread | 9.0px | **1.3px** |

Two notes for anyone changing a drawing:

- **Re-measure its `INK` row**, with `tools/mark-alignment.mjs` as the check. Do not do it by hand:
  getBBox() on the `<svg>` returns the box *after* the transform, so reading it and feeding it back
  is circular, and arithmetic on `d` attributes cannot see a rotation.
- **`vectorEffect` goes on the shape, never the group.** This is the one that shipped wrong, and it
  is invisible in a code review because the attribute is right there and looks like it is doing
  something.

### Accessibility

The site meets WCAG 3.1.1 — `<html lang>` — but **not from the root layout**, which is the obvious
place and not where it ended up. Spanish pages live under `/es` and were shipping with no `lang`
attribute at all, so a screen reader read the whole Spanish page with English pronunciation. On a
site whose differentiator is the Spanish, that was the most serious defect in the build.

The fix is [`src/components/LangSync.tsx`](src/components/LangSync.tsx), a client component, because
the alternatives were disproportionate to one attribute: two root layouts via route groups would
mean moving all fifteen route files and accepting a **full page reload on every language switch**,
and a `[locale]` dynamic segment would rewrite every URL in the project. The trade is stated in the
file: Spanish is corrected on hydration, so a visitor with JavaScript disabled still gets `lang="en"`
on a Spanish page. That is the smaller wrong. If the site gains a locale or stops being fully static,
take the route-group route and delete the component.

Two other floors the page keeps: every text link is at least 44px tall (`.link-rule` sets
`min-height` rather than relying on padding that happens to add up — a transparent pseudo-element
overlay was tried first and reverted, because it enlarges the hit area while remaining invisible to
`getBoundingClientRect` and to every automated check), and the tile picker's count sits in an
`aria-live="polite"` region, because otherwise the control's only feedback is silent to a screen
reader, which hears each tile's pressed state and never the total.


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
