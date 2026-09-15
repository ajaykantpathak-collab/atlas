import { chromium } from 'file:///C:/Users/Alesha4285/AppData/Local/npm-cache/_npx/6bcb61ec6d5aea22/node_modules/playwright/index.mjs';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [], hits = new Set();
p.on('pageerror', e => errs.push('PAGE: ' + e.message.slice(0, 200)));
await p.goto(process.argv[2], { waitUntil: 'load', timeout: 120000 });
await p.waitForTimeout(6000);
const shot = async (t) => { if (!hits.has(t)) { hits.add(t); await p.screenshot({ path: `_shots/x_${t}.png` }); } };

for (let step = 0; step < 80; step++) {
    const t = await p.evaluate(() => document.body.innerText.slice(0, 900));
    if (/common error|misconception|try the lab/i.test(t)) { await shot('misconception'); console.log('MISCONCEPTION'); }
    if (/your mastery|who uses this|due for review|stars lit/i.test(t)) { await shot('results'); console.log('RESULTS'); break; }
    if (/confidence|how sure/i.test(t)) await shot('play');

    // fill any text inputs (scaffold blanks)
    const inputs = p.locator('input[type="text"], input:not([type])');
    if (await inputs.count()) { await inputs.first().fill('1.50').catch(() => {}); }
    // use the escape hatch if visible
    const esc = p.locator('text=/stuck\?.*show|show me this step/i').first();
    if (await esc.count()) await esc.click().catch(() => {});
    // CTAs
    const cta = p.locator('button:not([disabled])').filter({ hasText: /Begin|Let|Continue|Next|Done|Check|Got it|Prove|Skip|learn|Show results|finish/i }).first();
    const opts = p.locator('button:not([disabled])').filter({ hasText: /\w{4,}/ });
    const n = await opts.count();
    if (await cta.count()) await cta.click().catch(() => {});
    else if (n >= 3 && step % 2 === 0) await opts.nth(n - 1).click().catch(() => {});   // wrong pick
    else if (n > 0) await opts.nth(0).click().catch(() => {});
    await p.waitForTimeout(1200);
}
await shot('final');
console.log(JSON.stringify({ errs, shots: [...hits] }, null, 1));
await b.close();
