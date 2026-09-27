// Verify sweep part 2: authenticated student — story, practice, doubt, key pages
const { chromium } = require('playwright');
const fs = require('fs');
const SHOT = 'D:/platform/screenshots/verify_2026-09-24/';
const BASE = 'http://localhost:3001';
const API = 'http://localhost:8001';
const results = [];
const rec = (i, p, n) => { results.push({ item: i, pass: p, note: n }); console.log(p ? 'PASS' : 'FAIL', '|', i, '|', n || ''); };

async function api(path, token, body) {
  const r = await fetch(API + path, {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const t = await r.text();
  try { return { status: r.status, json: JSON.parse(t) }; } catch { return { status: r.status, text: t }; }
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message.slice(0, 130)));

  // fresh student
  const email = 'sweepstu' + Date.now() + '@test.in';
  const su = await api('/api/auth/signup', null, { name: 'Sweep Student', email, password: 'Sweep@12345', role: 'student', grade: 10 });
  const token = su.json && su.json.access_token;
  rec('student signup api', !!token, email);
  if (token) {
    await page.addInitScript(t => { localStorage.setItem('token', t); }, token);
  }

  // --- page tour: load each student route, capture screenshot + size ---
  const routes = ['/dashboard', '/galaxy', '/learn', '/practice', '/diagnostic',
    '/achievements', '/progress', '/homework', '/tutor', '/socratic-tutor',
    '/solver', '/sims-v2', '/simulations', '/explore', '/chapter-test',
    '/exam-prep', '/ai-tutor', '/study-tools', '/quizzes', '/review',
    '/settings', '/my-galaxy', '/onboarding'];
  for (const r of routes) {
    try {
      await page.goto(BASE + r, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForTimeout(6000);
      const body = await page.textContent('body');
      const len = (body || '').length;
      const is404 = /404|not found|doesn't exist/i.test(body || '') && len < 2000;
      const name = r.slice(1);
      await page.screenshot({ path: SHOT + 'page_' + name + '.png' });
      rec('page ' + r, len > 500 && !is404, 'len=' + len);
    } catch (e) { rec('page ' + r, false, e.message.slice(0, 80)); }
  }

  // --- practice session drive ---
  try {
    await page.goto(BASE + '/practice', { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(8000);
    // try to start a session
    const startBtn = await page.$('button:has-text("Start"), button:has-text("Begin"), button:has-text("Practice")');
    if (startBtn) { await startBtn.click(); await page.waitForTimeout(6000); }
    await page.screenshot({ path: SHOT + '05_practice_session.png' });
    const body = await page.textContent('body');
    rec('practice session content', /solve|answer|question|submit/i.test(body || ''), (body || '').slice(0, 90).replace(/\n/g, ' '));
  } catch (e) { rec('practice session', false, e.message.slice(0, 100)); }

  // --- doubt / solve API live check ---
  const d1 = await api('/api/practice/deterministic/solve', token, { text: 'For Plane Angle: given arc_length = 443, radius = 25, find theta.' });
  rec('doubt solve verified (physics)', d1.json && d1.json.tier === 'VERIFIED', JSON.stringify(d1.json).slice(0, 120));
  const d2 = await api('/api/practice/deterministic/solve', token, { text: 'asdkfj qwioeu random garbage 987' });
  rec('doubt garbage honest refusal', d2.json && d2.json.tier !== 'VERIFIED', JSON.stringify(d2.json).slice(0, 120));

  console.log('PAGE ERRORS:', errors.slice(0, 10));
  fs.writeFileSync(SHOT + 'part2.json', JSON.stringify(results, null, 2));
  await browser.close();
})();
