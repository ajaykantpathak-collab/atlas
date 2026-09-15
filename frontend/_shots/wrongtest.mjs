import { chromium } from 'file:///C:/Users/Alesha4285/AppData/Local/npm-cache/_npx/6bcb61ec6d5aea22/node_modules/playwright/index.mjs';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('pageerror', e => errs.push('PAGE: ' + e.message.slice(0, 200)));
await p.goto(process.argv[2], { waitUntil: 'load', timeout: 120000 });
await p.waitForTimeout(6000);

const shot = async (tag) => p.screenshot({ path: `_shots/wt_${tag}.png` });
const phase = async () => p.evaluate(() => {
    const t = document.body.innerText;
    if (/common error|misconception|try the lab/i.test(t)) return 'misconception';
    if (/SCAFFOLD|MISSION|CASE|DISSECT|BUILD|DRILL ·/.test(t)) return 'beats';
    if (/challenge|confidence|how sure/i.test(t)) return 'play';
    if (/mastery|stars|results/i.test(t)) return 'results';
    return 'other';
});

// Phase 1: burn through intro/discover/teach — click CTA aggressively
for (let i = 0; i < 25; i++) {
    const ph = await phase();
    if (ph === 'play' || ph === 'misconception') break;
    const cta = p.locator('button:not([disabled])').filter({ hasText: /Begin|Let|Continue|Next|Done|Check|Got it|learn|Skip/i }).first();
    if (await cta.count()) await cta.click().catch(() => {});
    else { const o = p.locator('button:not([disabled])').filter({ hasText: /\w{5,}/ }).nth(0); if (await o.count()) await o.click().catch(() => {}); }
    await p.waitForTimeout(1100);
}
await shot('pre_play');
console.log('phase before play:', await phase());

// Phase 2: play — deliberately pick LAST option (usually a distractor)
for (let i = 0; i < 15; i++) {
    const ph = await phase();
    if (ph === 'misconception') { await shot('misconception'); console.log('MISCONCEPTION FIRED'); }
    if (ph === 'results') { await shot('results'); console.log('RESULTS REACHED'); break; }
    const opts = p.locator('button:not([disabled])').filter({ hasText: /\w{4,}/ });
    const n = await opts.count();
    if (n >= 3) await opts.nth(n - 1).click().catch(() => {});   // last = usually wrong
    else if (n > 0) await opts.nth(0).click().catch(() => {});
    // advance after answering
    const adv = p.locator('button:not([disabled])').filter({ hasText: /Continue|Next|Check|Got it|learn|Done|Try|show me/i }).first();
    if (await adv.count()) await adv.click().catch(() => {});
    await p.waitForTimeout(1300);
}
await shot('final');
console.log(JSON.stringify({ errs }, null, 1));
await b.close();
