import { chromium } from 'file:///C:/Users/Alesha4285/AppData/Local/npm-cache/_npx/6bcb61ec6d5aea22/node_modules/playwright/index.mjs';
const url = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 200)); });
p.on('pageerror', e => errs.push('PAGE: ' + e.message.slice(0, 200)));
await p.goto(url, { waitUntil: 'load', timeout: 90000 }).catch(e => errs.push('NAV: ' + e.message.split('\n')[0]));
await p.waitForTimeout(8000);

const shots = [];
// click through: Begin → beats (skip/continue buttons) → challenges (click an option)
for (let i = 0; i < 14; i++) {
    const btn = await p.$('button:has-text("Begin"), button:has-text("Continue"), button:has-text("Next"), button:has-text("Done"), button:has-text("Start"), button:has-text("Skip"), button:has-text("Prove"), button:has-text("Check"), button:has-text("Got it")');
    if (btn) { await btn.click().catch(() => {}); await p.waitForTimeout(1600); }
    else {
        // try clicking an option card
        const opt = await p.$('button:has-text("A)"), [class*="cursor-pointer"], div[role="button"]');
        if (opt) await opt.click().catch(() => {});
        await p.waitForTimeout(1200);
    }
    if (i === 3 || i === 7 || i === 11) {
        const f = `_shots/pt_${i}.png`;
        await p.screenshot({ path: f });
        shots.push(f);
    }
}
await p.screenshot({ path: '_shots/pt_end.png' });
console.log(JSON.stringify({ errs: errs.slice(0, 6), shots }, null, 1));
await b.close();
