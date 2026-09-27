// Verify sweep part 3: security, teacher flow, parent, hindi, latency
const { chromium } = require('playwright');
const fs = require('fs');
const SHOT = 'D:/platform/screenshots/verify_2026-09-24/';
const BASE = 'http://localhost:3001';
const API = 'http://localhost:8001';
const results = [];
const rec = (i, p, n) => { results.push({ item: i, pass: p, note: n }); console.log(p ? 'PASS' : 'FAIL', '|', i, '|', n || ''); };

async function api(path, token, body, method) {
  const r = await fetch(API + path, {
    method: method || (body ? 'POST' : 'GET'),
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const t = await r.text();
  try { return { status: r.status, json: JSON.parse(t) }; } catch { return { status: r.status, text: t.slice(0, 300) }; }
}
const login = async (e, p) => (await api('/api/auth/login', null, { email: e, password: p })).json;

(async () => {
  const browser = await chromium.launch();

  // ---------- SECURITY ----------
  const sA = (await api('/api/auth/signup', null, { name: 'Stu A', email: 'sa' + Date.now() + '@t.in', password: 'Pass@12345', role: 'student', grade: 10 })).json;
  const sB = (await api('/api/auth/signup', null, { name: 'Stu B', email: 'sb' + Date.now() + '@t.in', password: 'Pass@12345', role: 'student', grade: 10 })).json;
  const teacher = await login('teacher@dreamapp.in', 'demo123');
  const parent = await login('parent@dreamapp.in', 'demo123');
  rec('teacher login', !!(teacher && teacher.access_token));
  rec('parent login', !!(parent && parent.access_token));
  const tokA = sA && sA.access_token, tokB = sB && sB.access_token, tokT = teacher && teacher.access_token;

  // student token on teacher API
  const sec1 = await api('/api/teacher/overview', tokA);
  rec('student->teacher api denied', sec1.status === 403 || sec1.status === 401, 'status=' + sec1.status);
  // no token on teacher API
  const sec2 = await api('/api/teacher/overview', null);
  rec('anon->teacher api denied', sec2.status === 403 || sec2.status === 401, 'status=' + sec2.status);
  // student B on student A data — dashboard/{id}
  if (tokA && tokB) {
    const uidA = JSON.parse(Buffer.from(tokA.split('.')[1], 'base64').toString()).sub;
    const sec3 = await api('/api/dashboard/student/' + uidA, tokB);
    rec('studentB->studentA data denied', sec3.status === 403 || sec3.status === 401, 'status=' + sec3.status);
  }
  // logged-out teacher page redirects
  const ctx0 = await browser.newContext();
  const p0 = await ctx0.newPage();
  await p0.goto(BASE + '/teacher-overview', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await p0.waitForTimeout(5000);
  const u0 = p0.url();
  rec('logged-out /teacher-overview redirects', /login|signin|auth|welcome|\/$/.test(u0) || !u0.includes('teacher-overview'), u0);
  await p0.screenshot({ path: SHOT + '08_teacher_loggedout.png' });
  await ctx0.close();

  // ---------- TEACHER FLOW ----------
  const ctxT = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pt = await ctxT.newPage();
  if (tokT) await pt.addInitScript(t => localStorage.setItem('token', t), tokT);
  for (const r of ['/teacher-overview', '/teacher-dashboard', '/teacher-assignments']) {
    try {
      await pt.goto(BASE + r, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await pt.waitForTimeout(7000);
      const body = await pt.textContent('body');
      await pt.screenshot({ path: SHOT + '09' + r.replace(/\//g, '_') + '.png' });
      rec('teacher page ' + r, (body || '').length > 500, 'len=' + (body || '').length);
    } catch (e) { rec('teacher page ' + r, false, e.message.slice(0, 80)); }
  }
  // create assignment via API
  if (tokT) {
    const asg = await api('/api/assignments', tokT, {
      title: 'Sweep Test Assignment', class_level: 10, subject: 'maths',
      due_date: '2026-10-01', description: 'verify sweep',
    });
    rec('teacher create assignment', asg.status === 200 || asg.status === 201, 'status=' + asg.status + ' ' + JSON.stringify(asg.json || asg.text).slice(0, 100));
  }
  await ctxT.close();

  // ---------- PARENT ----------
  const ctxP = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pp = await ctxP.newPage();
  if (parent && parent.access_token) await pp.addInitScript(t => localStorage.setItem('token', t), parent.access_token);
  for (const r of ['/parent-dashboard', '/parent-portal']) {
    try {
      await pp.goto(BASE + r, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await pp.waitForTimeout(7000);
      const body = await pp.textContent('body');
      await pp.screenshot({ path: SHOT + '10' + r.replace(/\//g, '_') + '.png' });
      rec('parent page ' + r, (body || '').length > 500, 'len=' + (body || '').length);
    } catch (e) { rec('parent page ' + r, false, e.message.slice(0, 80)); }
  }
  await ctxP.close();

  // ---------- HINDI TOGGLE ----------
  const ctxS = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const ps = await ctxS.newPage();
  if (tokA) await ps.addInitScript(t => localStorage.setItem('token', t), tokA);
  await ps.goto(BASE + '/dashboard', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await ps.waitForTimeout(7000);
  const hindiBtn = await ps.$('button:has-text("हिंदी"), button:has-text("Hindi"), [data-lang], button:has-text("HI")');
  rec('hindi toggle present', !!hindiBtn);
  if (hindiBtn) {
    await hindiBtn.click(); await ps.waitForTimeout(3000);
    const body = await ps.textContent('body');
    const hasHindi = /[\u0900-\u097F]{4,}/.test(body || '');
    await ps.screenshot({ path: SHOT + '11_hindi.png' });
    rec('hindi flips chrome', hasHindi);
  }
  await ctxS.close();

  // ---------- LATENCY ----------
  const lat = [];
  for (const p of ['/api/health', '/api/practice/deterministic/solve']) {
    const t0 = Date.now();
    if (p.includes('solve')) await api(p, tokA, { text: 'HCF of 12 and 18' });
    else await api(p, null);
    lat.push([p, Date.now() - t0]);
  }
  for (const [p, ms] of lat) rec('latency ' + p, ms < 5000, ms + 'ms');

  fs.writeFileSync(SHOT + 'part3.json', JSON.stringify(results, null, 2));
  await browser.close();
})();
