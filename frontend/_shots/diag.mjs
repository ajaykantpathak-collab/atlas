import { chromium } from 'file:///C:/Users/Alesha4285/AppData/Local/npm-cache/_npx/6bcb61ec6d5aea22/node_modules/playwright/index.mjs';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
await p.goto(process.argv[2], { waitUntil: 'load', timeout: 120000 });
await p.waitForTimeout(6000);
for (let i = 0; i < 50; i++) {
    const cur = p.url(), txt = (await p.evaluate(() => document.body.innerText.slice(0, 120))).replace(/\n/g, ' | ');
    console.log(`step${i}: ${cur.split('/').pop()} :: ${txt.slice(0, 90)}`);
    if (!cur.includes('v3_c12')) { console.log('NAVIGATED AWAY'); break; }
    const esc = p.locator('text=/show me this step|skip for now/i').first();
    if (await esc.count()) await esc.click().catch(() => {});
    const inp = p.locator('input[type="text"], input:not([type])');
    if (await inp.count()) await inp.first().fill('1.5').catch(() => {});
    const cta = p.locator('button:not([disabled])').filter({ hasText: /Begin|Let|Continue|Next|Done|Check|Got it|learn/i }).first();
    if (await cta.count()) { await cta.click().catch(() => {}); await p.waitForTimeout(1200); continue; }
    const opts = p.locator('button:not([disabled])').filter({ hasText: /\w{4,}/ });
    const n = await opts.count();
    if (n) await opts.nth(i % 3 === 0 ? n - 1 : 0).click().catch(() => {});
    await p.waitForTimeout(1200);
}
console.log('ERRS:', JSON.stringify(errs.slice(0, 5)));
await p.screenshot({ path: '_shots/diag_end.png' });
await b.close();
