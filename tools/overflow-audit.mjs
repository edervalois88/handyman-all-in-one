/**
 * The narrow-width audit.
 *
 * Three failures this catches, each of which shipped at least once:
 *
 *  · The header lockup clipping. A flex row out of room does not overflow its
 *    text box — it SHRINKS it below the content width, so `scrollWidth` still
 *    looks healthy while the wordmark is cut off. Spanish is worse, because
 *    "ESPAÑOL" is longer than "ENGLISH".
 *  · Horizontal overflow at 320px, which is a layout the client will open.
 *  · The split-flap STATUS board wrapping to two rows. It switches by DISPLAY, so
 *    the live variant is found by measuring which one has a non-zero box, not by
 *    reading a class list.
 *
 * `load`, not `networkidle`: the hero carries a looping video, so the network is
 * never idle and `networkidle` times out against production.
 */
import { chromium, launchArgs, BASE, ROUTES, WIDTHS } from "./harness.mjs";

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: launchArgs() });
let bad = 0;
let n = 0;

for (const path of ROUTES) {
  for (const w of WIDTHS) {
    n++;
    const ctx = await browser.newContext({
      viewport: { width: w, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    await page.goto(BASE + path, { waitUntil: "load" });
    await page.waitForTimeout(400);

    const m = await page.evaluate(() => {
      const boxed = (e) => {
        if (!e) return false;
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      };

      const link = document.querySelector("header a[aria-label]");
      const word = link && link.querySelector(".logo-word");
      const wr = word ? word.getBoundingClientRect() : null;

      const cands = [
        document.querySelector(".split-flap-text--full"),
        document.querySelector(".split-flap-text--short"),
      ];
      const board = cands.find(boxed) || null;
      let boardRows = 0;
      if (board) {
        const tiles = [...board.querySelectorAll(".split-flap-text__tile")];
        boardRows = new Set(tiles.map((t) => Math.round(t.getBoundingClientRect().top))).size;
      }

      return {
        // >1 means the text box is narrower than the text inside it
        clipped: wr ? word.scrollWidth > Math.ceil(wr.width) + 1 : false,
        scrollW: document.documentElement.scrollWidth,
        vw: document.documentElement.clientWidth,
        boardRows,
      };
    });

    const problems = [];
    if (m.clipped) problems.push("lockup clipped");
    if (m.scrollW > m.vw + 1) problems.push(`overflow ${m.scrollW}/${m.vw}`);
    if (m.boardRows > 1) problems.push(`board wrapped (${m.boardRows} rows)`);

    if (problems.length) {
      bad++;
      console.log(`FAIL ${path} @${w}: ${problems.join(", ")}`);
    }
    await ctx.close();
  }
}

console.log(
  bad === 0
    ? `PASS: all ${n} route/width combinations — lockup intact, no overflow, board single-row`
    : `${bad}/${n} failures`,
);
await browser.close();
process.exit(bad === 0 ? 0 : 1);
