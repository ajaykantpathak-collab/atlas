// Phase 2 supplemental probes v2 — run after `node _audit_authed.js all`:
//  - diagnostic: subject+chapter+start, answer 2 questions, verify API persistence
//  - junior: maths activity, verify /api/v1/junior calls
//  - exam-simulator: open first exam via New link
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost';
const OUT = path.join(__dirname, '_shots_authed');
const out = { generatedAt: new Date().toISOString(), probes: [] };
const log = (s) => console.log(new Date().toISOString().slice(11, 19), s);

function apiLogin() {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ email: 'demo@dreamapp.in', password: 'demo123' });
    const req = require('http').request({
      host: 'localhost', port: 80, path: '/api/auth/login', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }, timeout: 20000,
    }, (res) => { let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d))); });
    req.on('error', reject); req.write(body); req.end();
  });
}

(async () => {
  const data = await apiLogin();
  const browser = await chromium.launch({ channel: 'chrome' });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(([t, u]) => {
    localStorage.setItem('dream-auth', JSON.stringify({ state: { user: u, token: t, isAuthenticated: true }, version: 0 }));
  }, [data.access_token, data.user]);

  const rec = (name, obj) => { out.probes.push({ probe: name, ...obj }); log(`[${name}] ${obj.result || 'done'}`); };
  const shot = async (page, name) => { try { await page.screenshot({ path: path.join(OUT, 'pf_' + name + '.png') }); } catch {} };

  function watch(page) {
    page._api = [];
    page.on('response', r => { try { if (r.url().includes('/api/')) page._api.push(r.status() + ' ' + r.request().method() + ' ' + r.url().replace(BASE, '').slice(0, 110)); } catch {} });
  }

  // ── diagnostic full mini-flow with API capture ────────────────────────────
  {
    const page = await ctx.newPage(); watch(page);
    try {
      await page.goto(BASE + '/diagnostic', { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(4000);
      await page.locator('text=Mathematics').first().click();
      await page.waitForTimeout(600);
      await page.locator('text=Algebra').first().click();
      await page.waitForTimeout(600);
      const startBtn = page.locator('button:has-text("Start Diagnostic")').first();
      const enabled = await startBtn.isEnabled().catch(() => false);
      if (enabled) await startBtn.click();
      await page.waitForTimeout(4000);
      // answer Q1: pick option A, submit
      await page.locator('button').filter({ hasText: /^\s*[A-D]\s/ }).first().click().catch(() => {});
      await page.waitForTimeout(400);
      await page.locator('button:has-text("Submit")').first().click().catch(() => {});
      await page.waitForTimeout(3000);
      await shot(page, 'diagnostic_q2');
      const txt = await page.evaluate(() => (document.body.innerText || '').slice(0, 450).replace(/\n+/g, ' | '));
      rec('diagnostic_persistence', { startedButton: enabled, afterText: txt, apiCalls: page._api.filter(a => a.includes('diagnostic') || a.includes(' 5')).slice(0, 20), allApi: page._api.slice(0, 20), result: 'ok' });
    } catch (e) { rec('diagnostic_persistence', { error: String(e).slice(0, 250), result: 'fail' }); }
    await page.close();
  }

  // ── junior maths with API capture ─────────────────────────────────────────
  {
    const page = await ctx.newPage(); watch(page);
    try {
      await page.goto(BASE + '/junior', { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(5000);
      await page.locator('button:has-text("Maths"), :text("Maths")').first().click().catch(() => {});
      await page.waitForTimeout(5000);
      await shot(page, 'junior_maths2');
      const txt = await page.evaluate(() => (document.body.innerText || '').slice(0, 350).replace(/\n+/g, ' | '));
      rec('junior_api_check', { afterText: txt, apiCalls: page._api.filter(a => a.includes('junior')).slice(0, 10), allApi: page._api.slice(0, 10), result: 'ok' });
    } catch (e) { rec('junior_api_check', { error: String(e).slice(0, 250), result: 'fail' }); }
    await page.close();
  }

  // ── exam-simulator open exam ──────────────────────────────────────────────
  {
    const page = await ctx.newPage(); watch(page);
    try {
      await page.goto(BASE + '/exam-simulator', { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(5000);
      await page.locator('a:has-text("New")').first().click().catch(() => {});
      await page.waitForTimeout(6000);
      await shot(page, 'exam_open2');
      const txt = await page.evaluate(() => (document.body.innerText || '').slice(0, 350).replace(/\n+/g, ' | '));
      rec('exam_open_check', { finalUrl: page.url().replace(BASE, ''), afterText: txt, apiCalls: page._api.slice(0, 10), result: 'ok' });
    } catch (e) { rec('exam_open_check', { error: String(e).slice(0, 250), result: 'fail' }); }
    await page.close();
  }

  fs.writeFileSync(path.join(OUT, 'probes_final.json'), JSON.stringify(out, null, 1));
  log('probes_final done -> _shots_authed/probes_final.json');
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
