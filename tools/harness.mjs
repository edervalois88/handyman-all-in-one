/**
 * Shared setup for the scripts in this folder.
 *
 * Everything here measures a RUNNING PRODUCTION BUILD, not the dev server, so
 * the numbers are the numbers a visitor gets. Start one first:
 *
 *   npm run build && npx next start -p 4177
 *
 * Playwright is deliberately NOT a dependency of the app — it is a heavy dev
 * dependency for a static marketing site. Point the two variables at an existing
 * install instead:
 *
 *   PW_PATH=~/.tools/node_modules/playwright-core
 *   CHROME_PATH=/path/to/chrome.exe
 *
 *   node tools/overflow-audit.mjs     every route at 8 widths
 *   node tools/word-budget.mjs        prose / scanned / chrome split
 *   node tools/mark-alignment.mjs     how straight the row of six marks is
 *   node tools/picker-handoff.mjs     the tile picker, end to end, both languages
 *   node tools/asterisk-balance.mjs   the site's placeholder-marker rule
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW_PATH || "playwright-core");

export const BASE = process.env.BASE || "http://127.0.0.1:4177";

/**
 * Optional host pin, for when local DNS is unreliable.
 *
 * Running these checks against the deployment is the point of having them, and a
 * flaky resolver makes that impossible: `ERR_NAME_NOT_RESOLVED` looks exactly
 * like a broken deployment and is not one. Set `HOST_RESOLVE` to skip DNS:
 *
 *   BASE=https://example.vercel.app HOST_RESOLVE=example.vercel.app:216.198.79.195 \
 *     node tools/overflow-audit.mjs
 *
 * Playwright's `--host-resolver-rules` maps the name to the address for the
 * browser only, so the certificate and the Host header are still the real ones.
 */
export function launchArgs() {
  const pin = process.env.HOST_RESOLVE;
  return pin ? [`--host-resolver-rules=MAP ${pin.replace(":", " ")}`] : [];
}

/** Every page, both languages. */
export const ROUTES = [
  "/",
  "/concise",
  "/services",
  "/service-areas",
  "/about",
  "/contact",
  "/es",
  "/es/concise",
  "/es/services",
  "/es/service-areas",
  "/es/about",
  "/es/contact",
];

/** The narrows the site claims to support, plus the desktop it is designed at. */
export const WIDTHS = [320, 340, 360, 390, 414, 768, 1024, 1440];

export { chromium };

/**
 * A context with motion turned off.
 *
 * `reducedMotion: "reduce"` is not a nicety. Several components animate on load,
 * and a tile caught mid-flip has a scaleY near zero — which moves its bounding
 * box by half its height and invents a phantom second row. Measuring a moving
 * page measures the animation, not the layout.
 *
 * AND NOT `networkidle`. These scripts used it until a looping background video
 * was added to the hero, at which point every one of them began timing out
 * against production: a muted looping video holds a request open forever, so the
 * network is never idle. `load` plus a settle delay is what these checks actually
 * want, and it works against a video that never stops downloading.
 */
export async function open(path, { width = 1440, height = 900, base = BASE } = {}) {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH,
    args: launchArgs(),
  });
  const ctx = await browser.newContext({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: "load" });
  await page.waitForTimeout(400);
  return { browser, ctx, page };
}

/** Is this element actually rendered, i.e. worth measuring? Injected as source. */
export const VISIBLE_FN = `(e) => {
  const r = e.getBoundingClientRect();
  if (r.width === 0 || r.height === 0) return false;
  const cs = getComputedStyle(e);
  return cs.visibility !== "hidden" && cs.display !== "none" && cs.opacity !== "0";
}`;

/** Words in a string, counting a hyphenated or apostrophised token as one. */
export const COUNT_WORDS_FN = `(s) => (s.match(/[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9'’\\-]*/g) || []).length`;
