/**
 * _audit_diagnostic.js — authenticated E2E exercise of /diagnostic
 * (Phase 1a verification): injects the demo token, then drives the real
 * UI flow: setup -> 15 adaptive questions -> submit -> results -> remediation.
 * Screenshots -> _shots/diag_*.png ; logs /api/diagnostics traffic + errors.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost';
const OUT = path.join(__dirname, '_shots');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  // 1) API login (demo student)
  const loginRes = await fetch(BASE + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'demo@dreamapp.in', password: 'demo123' }),
  });
  if (!loginRes.ok) { console.error('LOGIN FAILED', loginRes.status); process.exit(1); }
  const login = await loginRes.json();
  const token = login.access_token;
  const user = login.user;
  console.log('login OK user=' + user.email + ' id=' + user.id);

  const browser = await chromium.launch({ channel: 'chrome' });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(([tok, u]) => {
    localStorage.setItem('token', tok);
    localStorage.setItem('dream-auth', JSON.stringify({
      state: { user: u, token: tok, isAuthenticated: true, isLoading: false },
      version: 0,
    }));
  }, [token, user]);

  const page = await ctx.newPage();
  const errors = [];
  const diagTraffic = [];
  page.on('console', m => {
    if (m.type() === 'error') errors.push(m.text().slice(0, 200));
    else if (m.type() === 'warning' && m.text().includes('Failed')) errors.push('warn: ' + m.text().slice(0, 160));
  });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e).slice(0, 200)));
  page.on('request', r => {
    if (r.url().includes('/api/diagnostics')) {
      diagTraffic.push('REQ ' + r.method() + ' ' + r.url().replace(BASE, ''));
    }
  });
  page.on('requestfailed', r => {
    if (r.url().includes('/api/diagnostics')) {
      diagTraffic.push('FAIL ' + r.method() + ' ' + r.url().replace(BASE, '') + ' ' + (r.failure() || {}).errorText);
    }
  });
  page.on('response', r => {
    if (r.url().includes('/api/diagnostics')) {
      diagTraffic.push('RES ' + r.request().method() + ' ' + r.url().replace(BASE, '') + ' -> ' + r.status());
    }
  });

  // 2) setup screen
  await page.goto(BASE + '/diagnostic', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(OUT, 'diag_1_setup.png') });

  await page.click('text=Mathematics');
  await page.waitForTimeout(500);
  await page.click('button:has-text("Algebra")');
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, 'diag_2_setup_selected.png') });

  // 3) start -> POST /api/diagnostics/start
  await page.click('button:has-text("Start Diagnostic")');
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(OUT, 'diag_3_question1.png') });

  // 4) answer every question (option A, then Submit; auto-advance after feedback)
  //    NOTE: scope to the answer radiogroup — the language switcher also
  //    uses role="radio".
  const ANSWER_RADIO = '[role="radiogroup"][aria-label="Answer options"] button[role="radio"]';
  // wait for the first question (cold chunk warm-up can take >10s)
  await page.waitForSelector(ANSWER_RADIO, { timeout: 40000 });
  let answered = 0;
  for (let i = 0; i < 20; i++) {
    let clicked = false;
    for (let attempt = 0; attempt < 5 && !clicked; attempt++) {
      try {
        const radio = await page.waitForSelector(ANSWER_RADIO, { timeout: 40000 });
        await radio.click({ timeout: 3000 });
        clicked = true;
      } catch (e) {
        if (attempt === 4) { console.log('radio click failed: ' + String(e).slice(0, 90)); }
        await page.waitForTimeout(400);
      }
    }
    if (!clicked) break;
    await page.waitForTimeout(300);
    const submitBtn = page.locator('button:has-text("Submit")').first();
    const submitEnabled = await submitBtn.isEnabled().catch(() => false);
    if (!submitEnabled) { console.log('submit still disabled on iteration ' + i + ' — breaking'); break; }
    await submitBtn.click({ timeout: 8000 });
    answered += 1;
    await page.waitForTimeout(1900); // 1.5s feedback + transition
  }
  console.log('answered questions: ' + answered);

  // 5) calculating -> results (POST submit + GET result)
  for (let s = 0; s < 10; s++) {
    await page.waitForTimeout(2000);
    const phase = await page.evaluate(() => {
      const t = document.body.innerText;
      if (t.includes('Calculating results')) return 'calculating';
      if (t.includes('Diagnostic Complete') || t.includes('Your Diagnostic Results')) return 'results';
      if (t.includes('Question ')) return (t.match(/Question \d+ of \d+/) || ['active'])[0];
      if (t.includes('Ready?')) return 'setup';
      return 'blank/other';
    });
    console.log('t+' + ((s + 1) * 2) + 's phase: ' + phase);
    if (phase === 'results') break;
  }
  await page.screenshot({ path: path.join(OUT, 'diag_4_results.png') });
  const resultsText = (await page.content()).includes('Your Diagnostic Results');
  console.log('results screen visible: ' + resultsText);

  // 6) remediation (GET /{id}/remediation — prefetched during results)
  await page.waitForTimeout(3000); // let the remediation prefetch land
  const remBtn = page.locator('button:has-text("Start Remediation")');
  if ((await remBtn.count()) > 0) {
    await remBtn.first().click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(OUT, 'diag_5_remediation.png') });
    console.log('remediation screen visible: ' +
      (await page.content()).includes('Your Learning Plan'));
  } else {
    console.log('remediation button not found');
  }

  console.log('--- /api/diagnostics traffic ---');
  for (const t of diagTraffic) console.log('  ' + t);
  console.log('--- console/page errors: ' + errors.length + ' ---');
  for (const e of errors.slice(0, 8)) console.log('  ' + e);

  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
