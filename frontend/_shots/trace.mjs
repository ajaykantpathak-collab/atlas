import { chromium } from 'file:///C:/Users/Alesha4285/AppData/Local/npm-cache/_npx/6bcb61ec6d5aea22/node_modules/playwright/index.mjs';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(process.argv[2], { waitUntil: 'load', timeout: 120000 });
await p.waitForTimeout(6000);
for (let i = 0; i < 90; i++) {
    const txt = (await p.evaluate(() => document.body.innerText)).slice(0, 250).replace(/\n/g, ' · ');
    if (i % 5 === 0 || /mastery|results/i.test(txt)) console.log(`${i}: ${txt.slice(0, 110)}`);
    if (/your mastery|who uses this|due for review/i.test(txt)) { await p.screenshot({ path: '_shots/T_results.png' }); console.log('*** RESULTS ***'); break; }
    if (/common error|try the lab/i.test(txt)) { await p.screenshot({ path: '_shots/T_miscon.png' }); console.log('*** MISCONCEPTION ***'); }
    const esc = p.locator('text=/show me this step|skip for now|explain differently/i').first();
    if (await esc.count()) await esc.click().catch(() => {});
    const inp = p.locator('input[type="text"]');
    if (await inp.count()) await inp.first().fill('1.5').catch(() => {});
    const cta = p.locator('button:not([disabled])').filter({ hasText: /Begin|Let|Continue|Next|Done|Check|Got it|learn|prove|finish|results|Submit/i });
    if (await cta.count()) { await cta.last().click().catch(() => {}); await p.waitForTimeout(900); continue; }
    const opt = p.locator('button[class*="rounded-"]:not([disabled])').filter({ hasText: /\w{3,}/ });
    const n = await opt.count();
    if (n) await opt.nth(i % 3 === 0 ? n - 1 : 1).click().catch(() => {});
    await p.waitForTimeout(900);
}
await p.screenshot({ path: '_shots/T_end.png' });
await b.close();
