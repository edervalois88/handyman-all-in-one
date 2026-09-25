/**
 * The concise home's tile picker, tested end to end in both languages.
 *
 * The interaction is only worth having if the visitor does not have to make the
 * same choice twice. This clicks real tiles, follows the real link, and reads
 * which boxes are actually ticked on the form — because the link carried a
 * `?jobs=` parameter for a while with nothing on the other end reading it, and
 * nothing failed. A dead parameter looks exactly like a working one.
 */
import { chromium, launchArgs, BASE } from "./harness.mjs";

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: launchArgs() });
let fails = 0;

function check(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) fails++;
  console.log(
    `${ok ? "  ok  " : "FAIL  "}${name}` +
      (ok ? "" : `\n        want ${JSON.stringify(want)}\n        got  ${JSON.stringify(got)}`),
  );
}

const ticked = (page) =>
  page.$$eval("input[name=services]", (els) => els.filter((e) => e.checked).map((e) => e.value));

for (const [concise, contact] of [
  ["/concise", "/contact"],
  ["/es/concise", "/es/contact"],
]) {
  console.log(`\n=== ${concise} -> ${contact}`);
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();

  const tiles = () => page.locator('main > section[data-section="services"] li button');
  const cta = () => page.locator('main > section[data-section="services"] a.btn-primary');
  const count = () => page.locator('main > section[data-section="services"] [aria-live="polite"]');
  const pressed = () =>
    tiles().evaluateAll((els) => els.map((e) => e.getAttribute("aria-pressed")));

  await page.goto(BASE + concise, { waitUntil: "load" });

  check("six tiles render", await tiles().count(), 6);
  check(
    "CTA with nothing selected is the empty label",
    /quote my list|cotizar mi lista/i.test((await cta().innerText()).trim()),
    true,
  );
  check("aria-pressed all false", await pressed(), Array(6).fill("false"));

  // two on
  await tiles().nth(0).click();
  await tiles().nth(4).click();
  check("aria-pressed after two taps", await pressed(), [
    "true", "false", "false", "false", "true", "false",
  ]);
  check("CTA carries the count 2", /2/.test(await cta().innerText()), true);

  // one off
  await tiles().nth(4).click();
  check("aria-pressed after deselect", await pressed(), [
    "true", "false", "false", "false", "false", "false",
  ]);
  /*
   * At n=1 the CTA does NOT carry a digit, and that is the fix rather than a
   * regression: "Quote these 1" and "Cotizar estos 1" are both ungrammatical, so
   * the singular reads "Quote this one" / "Cotizar esta lista". Asserting a digit
   * here is what an earlier version of this check did, and it would now fail on a
   * correct page.
   */
  check(
    "CTA at n=1 is the singular form",
    /quote this one|cotizar esta lista/i.test(await cta().innerText()),
    true,
  );
  check(
    "count label at n=1 is singular in Spanish",
    /1\s+(selected|seleccionado)$/i.test((await count().innerText()).trim()),
    true,
  );

  const href = await cta().getAttribute("href");
  console.log(`  link: ${href}`);
  check("href names only the selected job", /jobs=repairs$/.test(href), true);

  await cta().click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(400);
  const got = await ticked(page);
  check("exactly one box ticked on arrival", got.length, 1);
  check("and it is the one that was chosen", /everyday repairs|reparaciones/i.test(got[0] || ""), true);

  // all six
  await page.goto(BASE + concise, { waitUntil: "load" });
  for (let i = 0; i < 6; i++) await tiles().nth(i).click();
  check(
    "all six pressed",
    await tiles().evaluateAll((els) => els.every((e) => e.getAttribute("aria-pressed") === "true")),
    true,
  );
  await cta().click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(400);
  check("all six ticked on the form", (await ticked(page)).length, 6);

  // the route on its own, and a hand-edited URL
  await page.goto(BASE + contact, { waitUntil: "load" });
  await page.waitForTimeout(400);
  check("plain contact still ticks exactly the first option", (await ticked(page)).length, 1);

  await page.goto(BASE + contact + "?jobs=not-a-real-service", { waitUntil: "load" });
  await page.waitForTimeout(400);
  check("unknown id falls back to the default tick", (await ticked(page)).length, 1);

  await ctx.close();
}

console.log(fails === 0 ? "\nPASS: tile picker handoff works end to end" : `\n${fails} FAILURES`);
await browser.close();
process.exit(fails === 0 ? 0 : 1);
