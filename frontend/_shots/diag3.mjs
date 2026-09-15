import { chromium } from 'file:///C:/Users/Alesha4285/AppData/Local/npm-cache/_npx/6bcb61ec6d5aea22/node_modules/playwright/index.mjs';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
await p.goto(process.argv[2], { waitUntil: 'load', timeout: 120000 });
await p.waitForTimeout(6000);
const seen = new Set();
for (let i = 0; i < 70; i++) {
    const txt = (await p.evaluate(() => document.body.innerText)).slice(0, 400);
    const tag = txt.match(/MISSION|SCAFFOLD|CASE|DISSECT|BUILD|DRILL|confidence|common error|mastery|next up|due for review/i)?.[0];
    if (tag && !seen.has(tag)) { seen.add(tag); await p.screenshot({ path: `_shots/y_${tag.toLowerCase().replace(/\W/g,'')}.png` }); console.log('HIT:', tag); }
    if (/mastery bars|your mastery|who uses this/i.test(txt)) { await p.screenshot({ path: '_shots/y_results.png' }); console.log('RESULTS'); break; }
    // escape hatches first
    for (const sel of ['text=/show me this step/i', 'text=/skip for now/i', 'text=/explain differently/i']) {
        const el = p.locator(sel).first();
        if (await el.count()) { await el.click().catch(() => {}); }
    }
    const inp = p.locator('input[type="text"]');
    if (await inp.count()) await inp.first().fill('1.5').catch(() => {});
    // CTA buttons anywhere
    const cta = p.locator('button:not([disabled])').filter({ hasText: /Begin|Let|Continue|Next|Done|Check|Got it|learn|prove|finish|Show|results/i });
    if (await cta.count()) { await cta.last().click().catch(() => {}); await p.waitForTimeout(1000); continue; }
    // MCQ/subpart options — the violet/white option buttons
    const opt = p.locator('button[class*="rounded-2xl"]:not([disabled])').filter({ hasText: /\w{3,}/ });
    const n = await opt.count();
    if (n) await opt.nth(i % 3 === 0 ? n - 1 : 1).click().catch(() => {});   // vary picks → some wrong
    await p.waitForTimeout(1000);
}
console.log('ERRS:', JSON.stringify(errs.slice(0, 5)), '| seen:', [...seen].join(','));
await b.close();
