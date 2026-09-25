/**
 * How straight is the row of six service marks?
 *
 * A shared 48-unit viewBox is not a shared silhouette. The marks are framed
 * individually (see `INK` in src/components/ServiceMarks.tsx), and this measures
 * whether that is still true after somebody edits a drawing.
 *
 * WHAT IT MEASURES, and why it is not simply getBBox(): getBBox() returns path
 * GEOMETRY, and with `vector-effect="non-scaling-stroke"` the stroke is not in
 * the geometry at all, so getBBox() under-reports the visible mark by about half
 * a stroke on each side. This adds that back, then reports the one number that
 * describes what a person sees: where each mark's ink CENTRE sits relative to the
 * label underneath it. If those agree, the row is straight.
 */
import { chromium, BASE } from "./harness.mjs";

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });

for (const path of ["/concise", "/es/concise"]) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);

  const m = await page.evaluate(() => {
    const lis = [...document.querySelectorAll('main > section[data-section="services"] li')];
    return lis.map((li) => {
      /*
       * Each tile holds TWO svgs: the 10px tick inside the selection box and the
       * mark. An earlier version of this measured the tick and reported a
       * perfectly even row — the tick is the same drawing six times. Pick the
       * mark by rendered size, never by document order.
       */
      const svgs = [...li.querySelectorAll("svg")];
      svgs.sort((a, b) => b.getBoundingClientRect().width - a.getBoundingClientRect().width);
      const svg = svgs[0];
      const sr = svg.getBoundingClientRect();
      const bb = svg.getBBox(); // geometry only, in viewBox units
      const k = sr.width / 48; // px per viewBox unit

      // the widest declared stroke decides the overhang
      const sws = [...svg.querySelectorAll("path,rect,circle,ellipse,line,polyline")].map((e) =>
        parseFloat(getComputedStyle(e).strokeWidth),
      );
      const sw = Math.max(...sws.filter((n) => !Number.isNaN(n)));
      const inkTop = sr.top + bb.y * k - (sw / 2) * k;
      const inkBot = sr.top + (bb.y + bb.height) * k + (sw / 2) * k;

      const labelEl = [...li.querySelectorAll("span")].reverse().find((s) => (s.innerText || "").trim());
      const lr = labelEl.getBoundingClientRect();

      return {
        name: (labelEl.innerText || "").trim(),
        inkH: +((inkBot - inkTop) / k).toFixed(1),
        gap: +(lr.top - inkBot).toFixed(1),
        centre: +(lr.top - (inkTop + inkBot) / 2).toFixed(1),
      };
    });
  });

  console.log(`\n=== ${path}`);
  console.log("mark                     ink height   gap to label   ink centre above label");
  console.log("-".repeat(78));
  for (const x of m) {
    console.log(
      `${(x.name || "?").slice(0, 24).padEnd(25)}${String(x.inkH).padEnd(13)}${String(x.gap).padEnd(15)}${x.centre}`,
    );
  }
  const gaps = m.map((x) => x.gap);
  const cs = m.map((x) => x.centre);
  console.log(
    `  gap spread ${(Math.max(...gaps) - Math.min(...gaps)).toFixed(1)}px   ` +
      `centre spread ${(Math.max(...cs) - Math.min(...cs)).toFixed(1)}px`,
  );
  await ctx.close();
}

await browser.close();
