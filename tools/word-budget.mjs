/**
 * The word budget, split three ways.
 *
 * "Reads in under 30 seconds" is a claim about PROSE — sentences a reader takes
 * in order. A page can carry a lot of scanned content (a ticket's field values, a
 * list of town names, three rows of questions) without that being reading time,
 * and a lot of chrome (nav, footer, buttons) that nobody reads at all. Counting
 * one lump number invites an argument instead of settling one, so this separates
 * them.
 *
 * THE MISTAKES THIS SCRIPT EXISTS TO NOT REPEAT, all of which produced confident
 * wrong numbers:
 *
 *  1. Counting ELEMENTS instead of text nodes. Summing `main a` + `main span` +
 *     `main li` double- and triple-counts every word nested inside another of
 *     those selectors — about 40% too high.
 *  2. Counting `<style>` text. SplitFlapText ships an inline stylesheet; read as
 *     text it added 518 phantom words to the hero.
 *  3. Counting a SHUT accordion as read prose. Chrome hides `<details>` content
 *     with `content-visibility`, which leaves the box non-zero — so a naive
 *     visibility test says "visible" and counts answers nobody has opened.
 */
import { chromium, launchArgs, BASE, ROUTES, VISIBLE_FN, COUNT_WORDS_FN } from "./harness.mjs";

const WPM = 200; // the low end of adult silent reading: the seconds reported are pessimistic

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: launchArgs() });
const rows = [];

for (const path of ROUTES) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: "load" });
  await page.waitForTimeout(200);

  const m = await page.evaluate(
    ({ visibleSrc, countSrc }) => {
      // Rebuilt from source rather than passed, because Playwright can only
      // serialise plain data into the page — functions in the argument are lost.
      const visible = new Function(`return ${visibleSrc}`)();
      const count = new Function(`return ${countSrc}`)();
      const main = document.querySelector("main");

      // PROSE = the reading path. DATA = what the eye lands on. CTRL = furniture.
      const PROSE = "h1,h2,h3,p";
      const DATA = "li,dt,dd,address";
      const CTRL = "a,button,label,legend,summary";

      const counts = { prose: 0, data: 0, chrome: 0, header: 0, footer: 0 };
      const runs = [];

      const walk = (root, sink) => {
        if (!root) return;
        const it = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = it.nextNode())) {
          const t = (node.nodeValue || "").trim();
          if (!t) continue;
          const el = node.parentElement;
          if (!el || !visible(el)) continue;
          if (el.closest("[aria-hidden='true']")) continue;
          if (el.closest("style,script,noscript,template")) continue;
          const shut = el.closest("details");
          if (shut && !shut.open && !el.closest("summary")) continue;
          const n = count(t);
          if (!n) continue;
          sink(n, el, t);
        }
      };

      walk(document.querySelector("header"), (n) => (counts.header += n));
      walk(document.querySelector("footer"), (n) => (counts.footer += n));
      walk(main, (n, el, t) => {
        if (el.closest(CTRL)) counts.chrome += n;
        else if (el.closest(DATA)) counts.data += n;
        else if (el.closest(PROSE)) {
          counts.prose += n;
          if (n > 6) runs.push({ n, tag: el.tagName, txt: t.replace(/\s+/g, " ").slice(0, 74) });
        } else counts.data += n;
      });

      return {
        counts,
        runs,
        height: Math.round(main.getBoundingClientRect().height),
      };
    },
    { visibleSrc: VISIBLE_FN, countSrc: COUNT_WORDS_FN },
  );

  rows.push({ path, ...m, ...m.counts });
  await ctx.close();
}

const secs = (n) => (n / WPM) * 60;
const fmt = (n) =>
  n < 60 ? `${n.toFixed(0)}s` : `${Math.floor(n / 60)}m${String(Math.round(n % 60)).padStart(2, "0")}s`;

console.log("\nroute                 PROSE   read     SCANNED  CHROME   total   height");
console.log("-".repeat(78));
for (const r of rows) {
  const total = r.prose + r.data + r.chrome;
  console.log(
    `${r.path.padEnd(22)}${String(r.prose).padEnd(8)}${fmt(secs(r.prose)).padEnd(9)}${String(
      r.data,
    ).padEnd(9)}${String(r.chrome).padEnd(9)}${String(total).padEnd(8)}${r.height}`,
  );
}

const concise = rows.find((r) => r.path === "/concise");
if (concise) {
  console.log("\nthe reading path of /concise — every prose run longer than six words");
  console.log("-".repeat(78));
  for (const r of concise.runs) console.log(`  ${String(r.n).padStart(3)}w ${r.tag.padEnd(4)} ${r.txt}`);
  console.log(`\n  prose total ${concise.prose} words = ${secs(concise.prose).toFixed(0)}s at ${WPM} wpm`);
  console.log(
    `  ${secs(concise.prose) < 30 ? "PASS" : "OVER"}: the 30-second target is met by the prose alone` +
      (secs(concise.prose) < 30 ? "" : " — it is not"),
  );
}

await browser.close();
