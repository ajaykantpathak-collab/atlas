import { chromium } from 'file:///C:/Users/Alesha4285/AppData/Local/npm-cache/_npx/6bcb61ec6d5aea22/node_modules/playwright/index.mjs';
const url = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [], hits = new Set();
p.on('console', m => { if (m.type() === 'error' && !/Hydrat|ERR_CONNECTION/.test(m.text())) errs.push(m.text().slice(0, 160)); });
p.on('pageerror', e => errs.push('PAGE: ' + e.message.slice(0, 160)));
await p.goto(url, { waitUntil: 'load', timeout: 120000 });
await p.waitForTimeout(7000);

const shot = async (tag) => { if (!hits.has(tag)) { hits.add(tag); await p.screenshot({ path: `_shots/ft_${tag}.png` }); } };

for (let step = 0; step < 60; step++) {
    const txt = await p.evaluate(() => document.body.innerText);
    const t = txt.slice(0, 800);
    if (/common error|try the lab again|misconception|not quite/i.test(t)) await shot('misconception');
    if (/mastery|stars lit|who uses this|due for review|next up|fix this/i.test(t)) { await shot('results'); if (/results|mastery/i.test(t)) break; }
    if (/SCAFFOLD|MISSION|CASE|DISSECT|BUILD|DRILL/.test(t)) await shot('beat_' + (t.match(/SCAFFOLD|MISSION|CASE|DISSECT|BUILD|DRILL/) ?? ['x'])[0].toLowerCase());
    if (/resuming where/i.test(t)) await shot('resume');

    // DELIBERATE: sometimes pick a non-first option to force wrong answers
    const opts = p.locator('button:not([disabled])').filter({ hasText: /\w{4,}/ });
    const n = await opts.count();
    const cta = p.locator('button:not([disabled])').filter({ hasText: /Begin|Let|Continue|Next|Done|Check|Got it|Prove|Skip|Show me|learn|finish|results/i }).first();
    if (step % 3 === 1 && n > 2) await opts.nth(Math.min(2, n - 1)).click().catch(() => {});  // likely-wrong pick
    else if (await cta.count()) await cta.click().catch(() => {});
    else if (n > 0) await opts.nth(0).click().catch(() => {});
    await p.waitForTimeout(1300);
}
await p.screenshot({ path: '_shots/ft_final.png' });
console.log(JSON.stringify({ errs: errs.slice(0, 8), shots: [...hits] }, null, 1));
await b.close();
