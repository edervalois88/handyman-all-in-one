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

The book names **Acumin Pro Condensed** and **Lato**; neither is licensable for the web. The
closest open equivalents carry the same character:

| Role | Face | Why |
|---|---|---|
| Display | **Oswald** | Heavy condensed grotesk, matching the `HANDYMAN` logotype |
| Labels / UI | **Barlow Condensed** | Condensed label work, workwear-signage register |
| Body / data | **Courier Prime** | The world is mid-century service paperwork |

All three are self-hosted at build time by `next/font/google` — no runtime request to Google.

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

The direction contract and the direction verdicts are recorded in
[`.impeccable/`](.impeccable/), and `DESIGN.md` documents the built system. The raw brand book
and its extracted pages are archived in [`assets/brand-book/`](assets/brand-book/), with
[`assets/build-assets.py`](assets/build-assets.py) to regenerate `public/brand/` from them.

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
    services/, service-areas/, about/, contact/                 EN routes
    es/services/, es/service-areas/, es/about/, es/contact/     ES routes
    not-found.tsx, robots.ts, sitemap.ts
  components/
    Header.tsx              sticky nav, mobile drawer, EN/ES toggle
    Footer.tsx              contact, hours, coverage, placeholder notice
    Hero.tsx                first viewport + the promise band
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
      home.tsx, services.tsx, areas.tsx, about.tsx, contact.tsx
      routes.ts
assets/
  brand-book/               the source PDF, extracted pages and artwork
  build-assets.py           regenerates public/brand/ from that artwork
```

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
