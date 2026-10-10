/**
 * The spec's central requirement: the construction must be derived from scroll
 * position, not played back. This parks the page at known fractions of each
 * stage and checks that what is on screen matches where the scrollbar is — and
 * that scrolling back up reverses it.
 */
import puppeteer from "puppeteer-core";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const p = await b.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push("js: " + e.message.slice(0, 110)));
p.on("console", (m) => m.type() === "error" && errs.push("console: " + m.text().slice(0, 110)));
await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:4173/", { waitUntil: "networkidle2" });
await p.waitForFunction(() => !document.querySelector("[data-intro]"), { timeout: 30000 }).catch(() => {});
await wait(1200);

/** Scroll so that `fraction` of the named section has been travelled. */
async function parkIn(id, fraction) {
  await p.evaluate(
    ({ id, fraction }) => {
      const el = document.getElementById(id);
      const top = el.offsetTop;
      const travel = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + travel * fraction, behavior: "instant" });
    },
    { id, fraction }
  );
  await wait(650);
}

function near(actual, expected, tol, label) {
  const ok = Math.abs(actual - expected) <= tol;
  console.log(`  ${ok ? "ok  " : "FAIL"} ${label}: got ${actual}, expected ~${expected} (±${tol})`);
  return ok;
}

let failures = 0;
const check = (ok) => { if (!ok) failures++; };

// ---- Structure: the readout is the building's own completion percentage.
console.log("\nStructure — the frame tracks the scrollbar");
for (const [fraction, expected] of [[0, 0], [0.175, 25], [0.35, 50], [0.525, 75], [0.7, 100]]) {
  await parkIn("structure", fraction);
  const pct = await p.evaluate(() => {
    const el = [...document.querySelectorAll("span")].find((s) => /^\d+%$/.test(s.textContent.trim()));
    return el ? parseInt(el.textContent) : -1;
  });
  check(near(pct, expected, 6, `at ${Math.round(fraction * 100)}% of the stage`));
}

// ---- Reversing must un-build it.
console.log("\nStructure — scrolling back reverses the build");
await parkIn("structure", 0.6);
const high = await p.evaluate(() => parseInt([...document.querySelectorAll("span")].find((s) => /^\d+%$/.test(s.textContent.trim()))?.textContent ?? "-1"));
await parkIn("structure", 0.2);
const low = await p.evaluate(() => parseInt([...document.querySelectorAll("span")].find((s) => /^\d+%$/.test(s.textContent.trim()))?.textContent ?? "-1"));
check(near(low < high ? 1 : 0, 1, 0, `reversed (${high}% → ${low}%)`));

// ---- How many floors are actually drawn at each point?
console.log("\nStructure — floors drawn, counted from the DOM");
for (const [fraction, expectRoughly] of [[0.1, 3], [0.35, 9], [0.65, 18]]) {
  await parkIn("structure", fraction);
  const visible = await p.evaluate(() => {
    const svg = document.querySelector("#structure svg");
    if (!svg) return -1;
    return [...svg.querySelectorAll("g")].filter((g) => parseFloat(getComputedStyle(g).opacity) > 0.5).length;
  });
  check(near(visible, expectRoughly, 5, `at ${Math.round(fraction * 100)}% of the stage`));
}

// ---- Foundation: the depth gauge follows the same value.
console.log("\nFoundation — depth readout follows the scroll");
const depths = [];
for (const fraction of [0.05, 0.4, 0.75, 0.95]) {
  await parkIn("foundation", fraction);
  const d = await p.evaluate(() => {
    const el = [...document.querySelectorAll("span")].find((s) => /^−\d+\.\d/.test(s.textContent.trim()));
    return el ? parseFloat(el.textContent.replace("−", "")) : -1;
  });
  depths.push(d);
  console.log(`  depth at ${Math.round(fraction * 100)}%: −${d}m`);
}
check(near(depths[0] < depths[1] && depths[1] < depths[2] && depths[3] < depths[2] ? 1 : 0, 1, 0, "descends then returns to grade"));

// ---- Land: the survey drawing appears in order.
console.log("\nLand — the drawing builds in sequence");
const landStates = [];
for (const fraction of [0.02, 0.3, 0.6, 0.95]) {
  await parkIn("land", fraction);
  const s = await p.evaluate(() => {
    const el = document.querySelector("#land polygon");
    const frame = [...document.querySelectorAll("#land svg")]
      .sort((a, b) => b.querySelectorAll("g").length - a.querySelectorAll("g").length)[0];
    return {
      boundary: el ? +parseFloat(getComputedStyle(el).opacity).toFixed(2) : -1,
      towerDrawn: frame ? [...frame.querySelectorAll("g")].filter((g) => parseFloat(getComputedStyle(g).opacity) > 0.5).length : -1,
    };
  });
  landStates.push(s);
  console.log(`  at ${Math.round(fraction * 100)}%: boundary opacity ${s.boundary}, tower floors ${s.towerDrawn}`);
}
check(near(landStates[0].boundary < landStates[1].boundary ? 1 : 0, 1, 0, "boundary draws in after the start"));
check(near(landStates[2].towerDrawn > landStates[0].towerDrawn ? 1 : 0, 1, 0, "tower rises later in the stage"));

console.log("\nconsole/page errors:", errs.length ? errs.slice(0, 3) : "none");
if (errs.length) failures++;
console.log(failures === 0 ? "\nScroll-driven behaviour verified.\n" : `\n${failures} check(s) failed.\n`);
await b.close();
process.exit(failures === 0 ? 0 : 1);
