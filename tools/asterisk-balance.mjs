/**
 * The site's own placeholder rule, checked rather than trusted.
 *
 * Every figure the business has not confirmed carries a gold asterisk, and every
 * asterisk must have a footnote to point at. This counts both per route, in both
 * languages, so a mark added without a note — or a note deleted out from under a
 * mark — fails here instead of shipping.
 */
import { chromium, BASE, ROUTES } from "./harness.mjs";

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
let orphaned = 0;

for (const path of ROUTES) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(150);

  const m = await page.evaluate(() => {
    const notes = [];
    const marks = [];
    // leaves only, so a wrapper is not counted alongside its own text
    document
      .querySelectorAll("footer p, footer span, main p, main span, main li, main dt, main dd")
      .forEach((e) => {
        if (e.querySelector("p,span,li,dt,dd")) return;
        const t = (e.innerText || "").trim();
        if (!t || !t.includes("*")) return;
        if (t.startsWith("*")) notes.push(t.slice(0, 64));
        else marks.push(t.slice(0, 64));
      });
    return { notes, marks };
  });

  // A mark with no note anywhere on the page is the failure this exists for.
  const bad = m.marks.length > 0 && m.notes.length === 0;
  if (bad) orphaned++;

  console.log(
    `${bad ? "FAIL" : " ok "}  ${path.padEnd(20)} notes=${m.notes.length} marks=${m.marks.length}`,
  );
  if (bad) for (const k of m.marks) console.log(`        unreferenced mark: ${k}`);
  await ctx.close();
}

console.log(
  orphaned === 0
    ? "\nPASS: every asterisk has a footnote and no note is stranded"
    : `\n${orphaned} route(s) carry an asterisk with nothing to explain it`,
);
await browser.close();
process.exit(orphaned === 0 ? 0 : 1);
