import type { Metadata, Viewport } from "next";
import { Oswald, Barlow_Condensed, Courier_Prime } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/* Type system, chosen as the closest open equivalents of the brand book's faces:
   the logotype is a heavy condensed workwear grotesk, and this world is
   mid-century service paperwork — so the display face is condensed and the text
   face is a typewriter. Acumin Pro Condensed and Lato (the book's picks) are not
   licensable for web; these carry the same character. */
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCond = Barlow_Condensed({
  variable: "--font-barlow-cond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const courier = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.contact.url),
  title: {
    default: `${site.nameFull} — ${site.tagline.en}`,
    template: `%s | ${site.nameFull}`,
  },
  description:
    "One company, one standard, one point of contact for your entire home. HandyMan manages small-to-mid-sized home projects with a qualified in-house crew and licensed trade partners when required.",
  applicationName: site.nameFull,
  openGraph: {
    type: "website",
    siteName: site.nameFull,
    title: `${site.nameFull} — ${site.tagline.en}`,
    description: "One company. One standard. One point of contact.",
    images: [{ url: "/brand/og-card.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nameFull} — ${site.tagline.en}`,
    description: "One company. One standard. One point of contact.",
    images: ["/brand/og-card.png"],
  },
  icons: {
    icon: [
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/apple-icon-180.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1d2945",
  colorScheme: "light",
};

/* ─────────────────────────────────────────────────────────────────────────────
   THE DIRECTION CONTRACT.

   Emitted as the first child of <body> so it survives the production build and
   anyone can audit the built output against it. It is a raw HTML comment rather
   than a JSX comment because JSX comments are stripped by the compiler, and a
   contract the build erased is a contract nobody can audit.

   THESIS, OWN-WORLD, STORY, FIRST VIEWPORT, FORM, FINISH.
   ───────────────────────────────────────────────────────────────────────────── */
const DIRECTION_CONTRACT = `THESIS: the accountability of a real home-services company is only checkable on paper, so this page is built as its paperwork — a work order you can read — refusing the category's navy hero + smiling-technician stock photo + invented five-star carousel.
OWN-WORLD: Warm Cream carbon-copy stock, Midnight Navy ink, Workwear Red reserved for stamps, state and actions only; condensed workwear display caps, typewriter body, dotted field rules, tabbed sheets, perforated stubs, red rubber stamps, and depth built from overlapping paper — no gradients.
STORY: the visitor sees their own list of six stalled jobs, understands that one company answers, arrives, quotes first and stands behind the work, and starts a written quote.
FIRST VIEWPORT: a navy work-order panel on the left carrying the promise and the primary action, and the cream job ticket overlapping it on the right with live fields and an APPROVED stamp; a cream checker band anchors the base.
FORM: grounded direction 6 of 7 — The Work Order (seed e7d16d82).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md.`;

const DIRECTION_CONTRACT_ID = "direction-contract";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${oswald.variable} ${barlowCond.variable} ${courier.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/*
         * The contract lives in the body as a raw HTML comment. A JSX comment is
         * stripped by the compiler and a contract the build erased is a contract
         * nobody can audit, so it is injected as markup and `grep e7d16d82` finds
         * it in the built output. The host uses `display: contents` so it adds no
         * box of its own to the layout.
         */}
        <div
          id={DIRECTION_CONTRACT_ID}
          style={{ display: "contents" }}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: `<!--\n${DIRECTION_CONTRACT}\n-->` }}
        />
        {children}
      </body>
    </html>
  );
}
