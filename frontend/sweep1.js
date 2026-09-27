// Verify sweep part 1: landing + signup + briefing + galaxy
const { chromium } = require('playwright');
const SHOT = 'D:/platform/screenshots/verify_2026-09-24/';
const BASE = 'http://localhost:3001';
const results = [];
function rec(item, pass, note) {
  results.push({ item, pass, note });
  console.log((pass ? 'PASS' : 'FAIL'), '|', item, '|', note || '');
}
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message.slice(0, 120)));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 120)); });

  // 1. Landing
  try {
    await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(8000);
    await page.screenshot({ path: SHOT + '01_landing_1440.png' });
    const txt = await page.textContent('body');
    rec('landing loads', txt && txt.length > 200, txt.slice(0, 80).replace(/\n/g, ' '));
    await ctx2landing390();
  } catch (e) { rec('landing loads', false, e.message.slice(0, 100)); }

  async function ctx2landing390() {
    const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const p = await m.newPage();
    try {
      await p.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
      await p.waitForTimeout(6000);
      await p.screenshot({ path: SHOT + '01_landing_390.png' });
      const scrollW = await p.evaluate(() => document.documentElement.scrollWidth);
      rec('landing 390 no h-overflow', scrollW <= 395, 'scrollWidth=' + scrollW);
    } catch (e) { rec('landing 390', false, e.message.slice(0, 80)); }
    await m.close();
  }

  // 2. Signup
  let studentToken = null;
  try {
    const email = 'sweep' + Date.now() + '@test.in';
    await page.goto(BASE + '/signup', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(4000);
    await page.screenshot({ path: SHOT + '02_signup_form.png' });
    // fill form generically
    const inputs = await page.$$('input');
    const filled = [];
    for (const inp of inputs) {
      const type = await inp.getAttribute('type');
      const ph = (await inp.getAttribute('placeholder')) || '';
      const name = ((await inp.getAttribute('name')) || '') + ' ' + ph;
      if (type === 'email' || /email/i.test(name)) { await inp.fill(email); filled.push('email'); }
      else if (type === 'password' || /password/i.test(name)) { await inp.fill('Sweep@12345'); filled.push('pass'); }
      else if (/name/i.test(name)) { await inp.fill('Sweep Tester'); filled.push('name'); }
      else if (type === 'text' && !filled.length) { await inp.fill('Sweep Tester'); filled.push('text'); }
    }
    rec('signup form fillable', filled.length >= 2, filled.join(','));
    // class select?
    const selects = await page.$$('select');
    for (const s of selects) { try { await s.selectOption({ index: 1 }); } catch {} }
    await page.screenshot({ path: SHOT + '02_signup_filled.png' });
    const btn = await page.$('button[type=submit], button:has-text("Sign"), button:has-text("Create"), button:has-text("Start")');
    if (btn) { await btn.click(); await page.waitForTimeout(8000); }
    await page.screenshot({ path: SHOT + '02_after_signup.png' });
    const url = page.url();
    rec('signup -> lands somewhere', !url.includes('/signup'), url);
  } catch (e) { rec('signup flow', false, e.message.slice(0, 120)); }

  // 3. Dashboard / command briefing
  try {
    await page.goto(BASE + '/dashboard', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(8000);
    await page.screenshot({ path: SHOT + '03_dashboard.png' });
    const body = await page.textContent('body');
    rec('dashboard renders', body && body.length > 300, 'len=' + (body || '').length);
  } catch (e) { rec('dashboard', false, e.message.slice(0, 100)); }

  // 4. Galaxy
  try {
    await page.goto(BASE + '/galaxy', { waitUntil: 'networkidle', timeout: 40000 });
    await page.waitForTimeout(10000);
    await page.screenshot({ path: SHOT + '04_galaxy.png' });
    const body = await page.textContent('body');
    const hasStars = /stars? lit|of 9,099|galaxy/i.test(body || '');
    rec('galaxy renders + HUD', !!hasStars, (body || '').slice(0, 100).replace(/\n/g, ' '));
  } catch (e) { rec('galaxy', false, e.message.slice(0, 100)); }

  console.log('CONSOLE ERRORS:', errors.slice(0, 10));
  await browser.close();
  require('fs').writeFileSync(SHOT + 'part1.json', JSON.stringify(results, null, 2));
})();
