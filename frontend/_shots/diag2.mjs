import { chromium } from 'file:///C:/Users/Alesha4285/AppData/Local/npm-cache/_npx/6bcb61ec6d5aea22/node_modules/playwright/index.mjs';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
await p.goto(process.argv[2], { waitUntil: 'load', timeout: 120000 });
await p.waitForTimeout(6000);
const seen = new Set();
for (let i = 0; i < 55; i++) {
    const cur = p.url(), txt = (await p.evaluate(() => document.body.innerText.slice(0, 150))).replace(/\n/g, ' | ');
    const tag = txt.match(/MISSION|SCAFFOLD|CASE|DISSECT|BUILD|DRILL|challenge|confidence|mastery|common error|results|review/i)?.[0] ?? 'other';
    if (!seen.has(tag)) { seen.add(tag); console.log(`NEW: ${tag} :: ${txt.slice(0, 80)}`); await p.screenshot({ path: `_shots/d_${tag.toLowerCase().replace(/\W/g,'')}.png` }); }
    if (/mastery|stars lit|who uses/i.test(txt)) { console.log('RESULTS REACHED'); break; }
    const esc = p.locator('text=/show me this step|skip for now/i').first();
    if (await esc.count()) { await esc.click().catch(() => {}); await p.waitForTimeout(800); continue; }
    const inp = p.locator('input[type="text"], input:not([type])');
    if (await inp.count()) { await inp.first().fill('1.5').catch(() => {}); }
    const cta = p.locator('button:not([disabled])').filter({ hasText: /Begin|Let|Continue|Next|Done|Check|Got it|learn|prove|finish|results/i }).first();
    if (await cta.count()) { await cta.click().catch(() => {}); await p.waitForTimeout(1100); continue; }
    // options — skip the Back link (it's an <a>, but filter buttons only + not first DOM button)
    const card = p.locator('.rounded-3xl, .rounded-2xl').last();
    const opts = card.locator('button:not([disabled])').filter({ hasText: /\w{4,}/ });
    const n = await opts.count();
    if (n) await opts.nth(i % 4 === 0 ? n - 1 : 0).click().catch(() => {});
    await p.waitForTimeout(1100);
}
console.log('ERRS:', JSON.stringify(errs.slice(0, 5)), '| seen:', [...seen].join(','));
await p.screenshot({ path: '_shots/d_end.png' });
await b.close();
