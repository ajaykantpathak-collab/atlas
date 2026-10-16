/**
 * capture_screens.js — Play Store phone screenshots for Atlas.
 * Launches the live app at http://localhost:3001 headless, phone-sized
 * (390x844, DPR 2 -> 780x1688 PNG), one shot per route.
 *
 * Run:  node "D:\platform\deploy\store-assets\tools\capture_screens.js"
 * Playwright is resolved from deploy/frontend/node_modules.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('D:/platform/deploy/frontend/node_modules/playwright');

const BASE = 'http://localhost:3001';
const OUT = path.join(__dirname, '..', 'screenshots');

const ROUTES = [
  { route: '/',                 file: 'shot-1-home-raw.png' },
  { route: '/dashboard',        file: 'shot-2-dashboard-raw.png' },
  { route: '/learning/lab',     file: 'shot-3-lab-raw.png' },
  { route: '/learning/games',   file: 'shot-4-games-raw.png' },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: 'en-IN',
  });
  const page = await ctx.newPage();

  for (const { route, file } of ROUTES) {
    const url = BASE + route;
    let finalUrl = url;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    } catch (e) {
      console.warn(`  networkidle timeout on ${route} — continuing with whatever loaded`);
    }
    await page.waitForTimeout(3000);           // let animations/data settle
    finalUrl = page.url();
    await page.screenshot({ path: path.join(OUT, file), type: 'png' });
    const redirected = finalUrl.replace(/\/$/, '') !== route && !finalUrl.endsWith(route)
      ? `  (landed on ${finalUrl})` : '';
    console.log(`  ${file}  <= ${route}${redirected}`);
  }

  await browser.close();
  console.log('done');
})().catch((e) => { console.error(e); process.exit(1); });
