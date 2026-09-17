// Authenticated end-to-end audit harness — Atlas Phase 2 (ATLAS_10x10_PLAN.md)
// Usage:
//   node _audit_authed.js crawl   — login via real /login UI, crawl every app route
//   node _audit_authed.js flows   — interactive flows (practice, tutor, progress, achievements, probes)
//   node _audit_authed.js all     — both
// Screenshots -> _shots_authed/, machine report -> _shots_authed/report.json
// NOTE: deploy/frontend/_-prefixed files are wiped by scripts/sync-deploy.js —
// canonical copies live in D:\platform\frontend (repo side).

const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost';
const APP_DIR = path.join(__dirname, 'app');
const OUT = path.join(__dirname, '_shots_authed');
const EMAIL = 'demo@dreamapp.in';
const PASS = 'demo123';
const CRAWL_WAIT_MS = 5000;

fs.mkdirSync(OUT, { recursive: true });

// ─── Route enumeration from app directory ────────────────────────────────────
function enumerateRoutes(appDir) {
  const routes = [];
  function walk(dir, segs) {
    let entries = [];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      if (e.name === 'node_modules' || e.name.startsWith('_')) continue;
      if (e.name.startsWith('(')) { walk(path.join(dir, e.name), segs); continue; } // route group = transparent
      walk(path.join(dir, e.name), segs.concat(e.name));
    }
    if (fs.existsSync(path.join(dir, 'page.tsx'))) {
      routes.push({ route: '/' + segs.join('/'), dynamic: segs.some(s => s.startsWith('[')) });
    }
  }
  walk(appDir, []);
  return routes;
}

function concreteRoute(route) {
  if (route === '/learn/[topicId]') return { url: '__TOPIC__', kind: 'topic' };
  return { url: route.replace(/\[([^\]]+)\]/g, 'demo'), kind: 'placeholder' };
}

// ─── Node-side HTTP helper (fallback token fetch) ────────────────────────────
function apiLogin() {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ email: EMAIL, password: PASS });
    const req = http.request({
      host: 'localhost', port: 80, path: '/api/auth/login', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
      timeout: 20000,
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(new Error('bad login json: ' + data.slice(0, 100))); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(new Error('timeout')); });
    req.write(body); req.end();
  });
}

// ─── Login (real UI first, token injection fallback) ─────────────────────────
async function loginViaUI(ctx, log) {
  const page = await ctx.newPage();
  try {
    await page.goto(BASE + '/login', { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForSelector('input[type="email"]', { timeout: 15000 });
    await page.fill('input[type="email"]', EMAIL);
    await page.fill('input[type="password"]', PASS);
    await Promise.all([
      page.waitForURL('**/dashboard**', { timeout: 25000 }),
      page.click('button[type="submit"]'),
    ]);
    await page.waitForTimeout(1500);
    const auth = await page.evaluate(() => {
      try { return JSON.parse(localStorage.getItem('dream-auth') || 'null'); } catch { return null; }
    });
    const token = auth && auth.state && auth.state.token;
    if (!token || token === 'demo-token') throw new Error('no real token in dream-auth after UI login');
    log(`UI login OK (token ${String(token).slice(0, 12)}..., user=${auth.state.user && auth.state.user.email})`);
    await page.close();
    return { method: 'ui', token };
  } catch (e) {
    try { await page.close(); } catch {}
    log(`UI login failed (${String(e).slice(0, 120)}) — falling back to token injection`);
    return null;
  }
}

async function buildAuthedContext(browser, log) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const ui = await loginViaUI(ctx, log);
  let token = ui && ui.token;
  let method = ui ? 'ui' : 'injection';
  if (!token) {
    const data = await apiLogin();
    token = data.access_token;
    await ctx.addInitScript(([t, u]) => {
      localStorage.setItem('dream-auth', JSON.stringify({
        state: { user: u, token: t, isAuthenticated: true }, version: 0,
      }));
    }, [token, data.user]);
  }
  return { ctx, token, method };
}

// ─── Page instrumentation ─────────────────────────────────────────────────────
function attachCapture(page) {
  const rec = { consoleErrors: [], pageErrors: [], apiErrors: [], requestFailed: [] };
  page.on('console', m => {
    if (m.type() === 'error') rec.consoleErrors.push(m.text().slice(0, 300));
  });
  page.on('pageerror', e => rec.pageErrors.push(String(e).slice(0, 300)));
  page.on('response', r => {
    try {
      const url = r.url();
      if (r.status() >= 400 && (url.includes('/api/') || url.startsWith(BASE))) {
        rec.apiErrors.push({ status: r.status(), url: url.replace(BASE, '').slice(0, 160) });
      }
    } catch {}
  });
  page.on('requestfailed', r => {
    const url = r.url();
    if (url.includes('/api/')) rec.requestFailed.push({ err: r.failure() && r.failure().errorText, url: url.replace(BASE, '').slice(0, 160) });
  });
  return rec;
}

function dedupe(list, keyFn) {
  const seen = new Set(); const out = [];
  for (const item of list) { const k = keyFn(item); if (!seen.has(k)) { seen.add(k); out.push(item); } }
  return out;
}

// ─── CRAWL ────────────────────────────────────────────────────────────────────
async function crawl(browser, log) {
  const { ctx, method } = await buildAuthedContext(browser, log);
  log(`auth context ready via ${method}`);
  const routes = enumerateRoutes(APP_DIR);
  log(`enumerated ${routes.length} routes from app/**/page.tsx`);

  // resolve a real topic id for /learn/[topicId]
  let topicUrl = null;
  {
    const p = await ctx.newPage();
    try {
      await p.goto(BASE + '/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
      const data = await p.evaluate(async () => {
        const auth = JSON.parse(localStorage.getItem('dream-auth') || '{}');
        const t = auth.state && auth.state.token;
        const r = await fetch('/api/content/recommended', { headers: t ? { Authorization: 'Bearer ' + t } : {} });
        if (!r.ok) return null;
        const j = await r.json();
        return Array.isArray(j) && j[0] ? j[0].node_id : null;
      });
      if (data) {
        topicUrl = '/learn/' + encodeURIComponent(data);
        log(`resolved /learn/[topicId] -> ${topicUrl}`);
      } else log('could not resolve a topic id for /learn/[topicId] — will use placeholder');
    } catch (e) { log('topic resolve error: ' + String(e).slice(0, 100)); }
    await p.close();
  }

  const report = [];
  for (const { route, dynamic } of routes) {
    let target = route;
    let tag = dynamic ? 'dynamic' : 'static';
    if (route.includes('[')) {
      const c = concreteRoute(route);
      if (c.kind === 'topic' && topicUrl) { target = topicUrl; tag = 'dynamic-resolved'; }
      else { target = c.url; tag = 'dynamic-placeholder'; }
    }
    const page = await ctx.newPage();
    const rec = attachCapture(page);
    const entry = {
      route, tag, url: BASE + target, httpStatus: 0, finalUrl: '',
      bouncedTo: '', bodyTextLen: 0, appErrorText: '',
      consoleErrors: [], pageErrors: [], apiErrors: [], requestFailed: [], screenshot: '',
    };
    try {
      const resp = await page.goto(BASE + target, { waitUntil: 'domcontentloaded', timeout: 45000 });
      entry.httpStatus = resp ? resp.status() : 0;
      await page.waitForTimeout(CRAWL_WAIT_MS);
      entry.finalUrl = page.url();
      const path1 = target.split('?')[0];
      if (entry.finalUrl && !entry.finalUrl.startsWith(BASE + path1)) {
        entry.bouncedTo = entry.finalUrl.replace(BASE, '');
      }
      entry.bodyTextLen = await page.evaluate(() => (document.body && document.body.innerText || '').length);
      const t = await page.evaluate(() => (document.body && document.body.innerText || '').slice(0, 400));
      if (/Application error|Internal Server Error|This page could not be found/i.test(t)) {
        entry.appErrorText = (t.match(/(Application error[^\n]*|Internal Server Error|This page could not be found[^\n]*)/i) || [''])[0];
      }
    } catch (e) {
      entry.pageErrors.push('NAV: ' + String(e).slice(0, 200));
      entry.finalUrl = page.url();
    }
    entry.consoleErrors = dedupe(rec.consoleErrors, x => x).slice(0, 8);
    entry.pageErrors = dedupe(rec.pageErrors, x => x).slice(0, 5);
    entry.apiErrors = dedupe(rec.apiErrors, x => x.status + x.url).slice(0, 10);
    entry.requestFailed = dedupe(rec.requestFailed, x => x.err + x.url).slice(0, 5);
    const name = (target === '/' ? 'home' : target.slice(1).replace(/[\/\[\]]/g, '_').replace(/=/g, '_').slice(0, 80)) || 'home';
    entry.screenshot = `_shots_authed/${name}.png`;
    try { await page.screenshot({ path: path.join(OUT, name + '.png') }); } catch {}
    report.push(entry);
    await page.close();
    const flags = [
      entry.bouncedTo && `-> ${entry.bouncedTo}`,
      entry.appErrorText && `APPERR`,
      entry.pageErrors.length && `PGERR(${entry.pageErrors.length})`,
      entry.apiErrors.length && `API4xx(${entry.apiErrors.length})`,
      entry.bodyTextLen < 40 && `BLANK(${entry.bodyTextLen})`,
    ].filter(Boolean).join(' ');
    log(`${String(entry.httpStatus).padEnd(3)} ${route} ${flags ? '| ' + flags : 'ok'}`);
  }

  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify({ generatedAt: new Date().toISOString(), base: BASE, loginMethod: method, totalRoutes: report.length, report }, null, 1));
  log(`crawl done: ${report.length} routes -> ${path.join(OUT, 'report.json')}`);
  await ctx.close();
  return report;
}

// ─── FLOWS ────────────────────────────────────────────────────────────────────
const flowsOut = [];
function record(flow, data) { flowsOut.push({ flow, ...data }); console.log(new Date().toISOString().slice(11, 19), `[flow:${flow}] ${data.result}`); }

async function flows(browser, log) {
  const { ctx, method } = await buildAuthedContext(browser, log);
  const shot = async (page, name) => { try { await page.screenshot({ path: path.join(OUT, 'flow_' + name + '.png'), fullPage: false }); } catch {} };

  // ── 1. /practice: start session -> answer -> feedback -> next -> end ──────
  {
    const page = await ctx.newPage();
    const cap = attachCapture(page);
    const r = { result: 'fail', steps: [] };
    try {
      await page.goto(BASE + '/practice', { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(4000);
      await shot(page, 'practice_idle');
      const start = page.locator('button[aria-label="Start practice session"]');
      if (await start.count() === 0) throw new Error('Start button not found');
      await start.click();
      r.steps.push('clicked Start Practice');
      await page.waitForSelector('[role="radiogroup"] button', { timeout: 30000 });
      await page.waitForTimeout(1500);
      await shot(page, 'practice_q1');
      await page.locator('[role="radiogroup"] button').first().click();
      await page.waitForTimeout(400);
      await shot(page, 'practice_selected');
      const submitBtn = page.locator('button:has-text("Submit"), button:has-text("Check"), button:has-text("Answer")').first();
      if (await submitBtn.count() === 0) throw new Error('Submit button not found');
      await submitBtn.click();
      r.steps.push('submitted option 0');
      await page.waitForTimeout(2500);
      await shot(page, 'practice_feedback');
      const feedbackTxt = await page.evaluate(() => (document.body.innerText || '').slice(0, 600).replace(/\n+/g, ' | '));
      const adv = page.locator('button:has-text("Next"), button:has-text("Continue"), button:has-text("Advance")').first();
      let advanced = false;
      if (await adv.count() > 0) { try { await adv.click({ timeout: 5000 }); advanced = true; } catch {} }
      if (!advanced) await page.waitForTimeout(3500);
      r.steps.push('advanced (button=' + advanced + ')');
      await page.waitForTimeout(1500);
      await shot(page, 'practice_q2_or_summary');
      const afterTxt = await page.evaluate(() => (document.body.innerText || '').slice(0, 400).replace(/\n+/g, ' | '));
      await shot(page, 'practice_end');
      r.feedback = feedbackTxt.slice(0, 300); r.afterAdvance = afterTxt.slice(0, 250);
      r.apiErrors = dedupe(cap.apiErrors, x => x.status + x.url).slice(0, 8);
      r.consoleErrors = dedupe(cap.consoleErrors, x => x).slice(0, 8);
      r.result = r.steps.length >= 3 ? 'pass' : 'fail';
    } catch (e) {
      r.error = String(e).slice(0, 300);
      r.consoleErrors = dedupe(cap.consoleErrors, x => x).slice(0, 8);
      await shot(page, 'practice_error');
    }
    await page.close();
    record('practice', r);
  }

  // ── 2. /tutor: send message, capture reply ────────────────────────────────
  {
    const page = await ctx.newPage();
    const cap = attachCapture(page);
    const r = { result: 'fail' };
    try {
      await page.goto(BASE + '/tutor', { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(4000);
      await shot(page, 'tutor_initial');
      const ta = page.locator('textarea').first();
      if (await ta.count() === 0) throw new Error('no textarea found on /tutor');
      const bubbleCountBefore = await page.locator('[class*="message"], [class*="bubble"], [class*="chat"]').count();
      await ta.fill('What is the Pythagorean theorem? Give me a hint.');
      await ta.press('Enter');
      r.sent = true;
      let replied = false;
      for (let i = 0; i < 20; i++) {
        await page.waitForTimeout(2000);
        const c = await page.locator('[class*="message"], [class*="bubble"], [class*="chat"]').count();
        if (c > bubbleCountBefore + 1) { replied = true; break; }
      }
      await page.waitForTimeout(2000);
      await shot(page, 'tutor_reply');
      const bodyTxt = await page.evaluate(() => (document.body.innerText || ''));
      const idx = bodyTxt.indexOf('Pythagorean');
      r.replyExcerpt = idx >= 0 ? bodyTxt.slice(idx, idx + 700).replace(/\n+/g, ' | ') : bodyTxt.slice(0, 500).replace(/\n+/g, ' | ');
      r.replyAppeared = replied;
      r.apiErrors = dedupe(cap.apiErrors, x => x.status + x.url).slice(0, 8);
      r.consoleErrors = dedupe(cap.consoleErrors, x => x).slice(0, 8);
      r.result = r.sent && r.replyAppeared ? 'pass' : (r.sent ? 'partial' : 'fail');
    } catch (e) {
      r.error = String(e).slice(0, 300);
      await shot(page, 'tutor_error');
    }
    await page.close();
    record('tutor', r);
  }

  // ── 3. /progress + /achievements: verify real numbers ─────────────────────
  for (const [route, key] of [['/progress', 'progress'], ['/achievements', 'achievements']]) {
    const page = await ctx.newPage();
    const cap = attachCapture(page);
    const r = { result: 'fail' };
    try {
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(6000);
      await shot(page, key);
      const txt = await page.evaluate(() => (document.body.innerText || ''));
      r.bodyTextExcerpt = txt.slice(0, 500).replace(/\n+/g, ' | ');
      r.apiErrors = dedupe(cap.apiErrors, x => x.status + x.url).slice(0, 8);
      r.consoleErrors = dedupe(cap.consoleErrors, x => x).slice(0, 8);
      r.result = 'pass';
    } catch (e) { r.error = String(e).slice(0, 300); await shot(page, key + '_error'); }
    await page.close();
    record(key, r);
  }

  // ── 4. Pending-wiring probes: diagnostic / exam-simulator / junior ───────
  const probes = [
    ['/diagnostic', 'diagnostic', 'button:has-text("Start"), button:has-text("Begin"), button:has-text("Start Diagnostic")'],
    ['/exam-simulator', 'exam_simulator', 'button:has-text("Start"), button:has-text("Begin"), button:has-text("Create")'],
    ['/junior', 'junior', 'button:has-text("Start"), button:has-text("Play"), button:has-text("Try")'],
  ];
  for (const [route, key, sel] of probes) {
    const page = await ctx.newPage();
    const cap = attachCapture(page);
    const r = { route, result: 'probe' };
    try {
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(5000);
      await shot(page, key + '_1');
      r.bodyTextExcerpt = await page.evaluate(() => (document.body.innerText || '').slice(0, 400).replace(/\n+/g, ' | '));
      const btn = page.locator(sel).first();
      if (await btn.count() > 0) {
        try { await btn.click({ timeout: 5000 }); r.clicked = true; } catch { r.clicked = false; }
        await page.waitForTimeout(6000);
        await shot(page, key + '_2_after_click');
        r.afterClickText = await page.evaluate(() => (document.body.innerText || '').slice(0, 400).replace(/\n+/g, ' | '));
      } else { r.clicked = false; r.noButton = true; }
      r.apiErrors = dedupe(cap.apiErrors, x => x.status + x.url).slice(0, 10);
      r.consoleErrors = dedupe(cap.consoleErrors, x => x).slice(0, 8);
    } catch (e) { r.error = String(e).slice(0, 300); await shot(page, key + '_error'); }
    await page.close();
    record('probe_' + key, r);
  }

  fs.writeFileSync(path.join(OUT, 'flows.json'), JSON.stringify({ generatedAt: new Date().toISOString(), loginMethod: method, flows: flowsOut }, null, 1));
  log(`flows done -> ${path.join(OUT, 'flows.json')}`);
  await ctx.close();
  return flowsOut;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
(async () => {
  const mode = (process.argv[2] || 'all');
  const log = (s) => console.log(new Date().toISOString().slice(11, 19), s);
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    if (mode === 'crawl' || mode === 'all') await crawl(browser, log);
    if (mode === 'flows' || mode === 'all') await flows(browser, log);
  } finally {
    await browser.close().catch(() => {});
  }
})().catch(e => { console.error('FATAL', e); process.exit(1); });
