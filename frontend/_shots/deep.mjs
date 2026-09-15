import { chromium } from 'file:///C:/Users/Alesha4285/AppData/Local/npm-cache/_npx/6bcb61ec6d5aea22/node_modules/playwright/index.mjs';
const url = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('console', m => { if (m.type() === 'error' && !m.text().includes('Hydrat')) errs.push(m.text().slice(0, 160)); });
p.on('pageerror', e => errs.push('PAGE: ' + e.message.slice(0, 160)));
await p.goto(url, { waitUntil: 'load', timeout: 120000 });
await p.waitForTimeout(7000);

const log = [];
const shot = async (tag) => { const f = `_shots/deep_${tag}.png`; await p.screenshot({ path: f }); log.push(tag); };

for (let step = 0; step < 40; step++) {
    // capture interesting screens
    const txt = await p.evaluate(() => document.body.innerText.slice(0, 400));
    if (/common error|try the lab|misconception/i.test(txt)) { await shot('misconception'); }
    if (/your mastery|results|stars lit/i.test(txt)) { await shot('results'); break; }
    if (/MISSION|mission/i.test(txt) && !log.includes('mission')) { await shot('mission'); }
    if (/beat|scaffold|STEP/i.test(txt) && !log.includes('beats')) { await shot('beats'); }

    // advance: prefer CTA buttons, else click a NON-disabled option
    const cta = p.locator('button:not([disabled])').filter({ hasText: /Begin|Let|Continue|Next|Done|Check|Got it|Prove|Skip|Try|Show me|learn/i }).first();
    const enabledOpt = p.locator('button:not([disabled])[class*="rounded"]').filter({ hasText: /\w/ }).nth(1);
    if (await cta.count()) await cta.click().catch(() => {});
    else if (await enabledOpt.count()) await enabledOpt.click().catch(() => {});
    await p.waitForTimeout(1400);
}
await shot('end');
console.log(JSON.stringify({ errs: errs.slice(0, 8), shots: log }, null, 1));
await b.close();
