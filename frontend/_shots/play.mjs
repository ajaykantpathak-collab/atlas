import { chromium } from 'file:///C:/Users/Alesha4285/AppData/Local/npm-cache/_npx/6bcb61ec6d5aea22/node_modules/playwright/index.mjs';
const url = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('console', m => { if (m.type() === 'error' && !m.text().includes('Hydration')) errs.push(m.text().slice(0, 160)); });
p.on('pageerror', e => errs.push('PAGE: ' + e.message.slice(0, 160)));
await p.goto(url, { waitUntil: 'load', timeout: 90000 }).catch(e => errs.push('NAV: ' + e.message.split('\n')[0]));
await p.waitForTimeout(7000);

const shots = [];
for (let i = 0; i < 22; i++) {
    // click any option button first if present (discovery/observe/predict/mcq)
    const opt = p.locator('button.rounded-2xl, button[class*="rounded-2xl"]').first();
    const cta = p.locator('button:has-text("Begin"), button:has-text("Let"), button:has-text("Continue"), button:has-text("Next"), button:has-text("Done"), button:has-text("Check"), button:has-text("Got"), button:has-text("Prove"), button:has-text("Skip")').first();
    if (await opt.count() && i > 0) await opt.click().catch(() => {});
    else if (await cta.count()) await cta.click().catch(() => {});
    await p.waitForTimeout(1500);
    if ([4, 9, 14, 19].includes(i)) { const f = `_shots/play_${i}.png`; await p.screenshot({ path: f }); shots.push(f); }
}
await p.screenshot({ path: '_shots/play_end.png' });
console.log(JSON.stringify({ errs: errs.slice(0, 8) }, null, 1));
await b.close();
