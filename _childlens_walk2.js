/* CHILD-LENS walk 2: the screens a fresh child reaches next —
 * /explore (mission CTA), a real C6 lesson, diagnostic with subject selected,
 * practice submit-empty behavior, lesson end screen. */
const { chromium } = require('D:/platform/deploy/frontend/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:3001';
const OUT = 'D:/platform/_shots/childlens';
const TS = Date.now().toString(36);
let stepIdx = 0;
let curDir = '';

function newBand(band) { curDir = path.join(OUT, band); fs.mkdirSync(curDir, { recursive: true }); stepIdx = 0; }

async function shot(page, label, note = '') {
  stepIdx += 1;
  const name = `${String(stepIdx).padStart(2, '0')}_${label}`;
  try {
    await page.screenshot({ path: path.join(curDir, `${name}.png`), fullPage: false });
    let text = '';
    try { text = await page.evaluate(() => document.body ? document.body.innerText : ''); } catch (e) { text = 'TEXT_FAIL ' + e.message; }
    fs.writeFileSync(path.join(curDir, `${name}.txt`),
      `URL: ${page.url()}\nTITLE: ${await page.title().catch(() => '')}\nNOTE: ${note}\n----VISIBLE TEXT----\n${text}`);
    try {
      const links = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a[href]')).map(a => ({ t: (a.innerText || a.getAttribute('aria-label') || '').trim().slice(0, 80), h: a.getAttribute('href') })).filter(x => x.t)
      );
      fs.writeFileSync(path.join(curDir, `${name}.links.json`), JSON.stringify(links, null, 1));
    } catch (e) {}
    console.log(`SHOT ${name} -> ${page.url()}`);
  } catch (e) { console.log(`SHOTFAIL ${name}: ${e.message}`); }
}

async function go(page, route, wait = 3000) {
  try {
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(wait);
    return true;
  } catch (e) { console.log(`NAVFAIL ${route}: ${e.message}`); return false; }
}

async function signup(page, klass) {
  await go(page, '/signup', 2000);
  const email = `child2_c${klass}_${TS}@example.com`;
  await page.locator('input[type="text"]').first().fill(`Test Child ${klass}`);
  await page.locator('input[type="email"]').first().fill(email);
  await page.locator('input[type="password"]').first().fill('happy123');
  await page.locator('select').first().selectOption(String(klass));
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(4000);
  console.log(`signed up c${klass} -> ${page.url()}`);
  return email;
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // ---- Class 6: explore + real lesson + diagnostic-with-subject + practice submit
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    await signup(page, 6);

    newBand('c6_explore');
    await go(page, '/explore', 4000);
    await shot(page, 'explore_landing', 'this is where the mission CTA lands');
    // click the first topic card if any
    try {
      const firstCard = page.locator('a[href^="/explore/"], a[href^="/learn/"]').first();
      const href = await firstCard.getAttribute('href', { timeout: 3000 });
      await firstCard.click({ timeout: 3000 });
      await page.waitForTimeout(3500);
      await shot(page, 'explore_first_click', `clicked ${href}`);
    } catch (e) { console.log('explore click fail: ' + e.message); }

    newBand('c6_lesson');
    await go(page, '/learn/c6_math_ch01_001', 4500);
    await shot(page, 'lesson_landing', 'the actual lesson a C6 child opens from dashboard');
    // interact: try Next / Check / Start practice etc.
    for (let i = 1; i <= 6; i++) {
      let clicked = null;
      for (const t of ['Next', 'Check Answer', 'Check', 'Got it', 'Continue', 'Start Practice', 'Practice', 'Mark', 'Complete']) {
        try {
          const loc = page.locator(`button:has-text("${t}")`).first();
          if (await loc.isVisible({ timeout: 800 }) && await loc.isEnabled({ timeout: 800 })) {
            await loc.click({ timeout: 2000 }); clicked = t; break;
          }
        } catch (e) {}
      }
      if (!clicked) { console.log('lesson: nothing more to click at step ' + i); break; }
      await page.waitForTimeout(1800);
      await shot(page, `lesson_step${i}`, `clicked: ${clicked}`);
    }

    newBand('c6_diagnostic2');
    await go(page, '/diagnostic', 3000);
    // child picks Mathematics card first
    try {
      await page.locator('text=Mathematics').first().click({ timeout: 3000 });
      await page.waitForTimeout(1200);
      await shot(page, 'diagnostic_subject_selected');
      await page.locator('button:has-text("Start Diagnostic")').first().click({ timeout: 4000 });
      await page.waitForTimeout(3500);
      await shot(page, 'diagnostic_q1', 'after Start Diagnostic');
      // answer 3 questions
      for (let q = 1; q <= 3; q++) {
        let clicked = null;
        // click first visible option (buttons not containing Start/Submit)
        try {
          const opts = page.locator('button:visible');
          const n = await opts.count();
          for (let i = 0; i < n; i++) {
            const t = (await opts.nth(i).innerText().catch(() => '')).trim();
            if (t && !/start|submit|skip|exit|quit|diagnostic/i.test(t) && t.length < 120) {
              await opts.nth(i).click({ timeout: 1500 }); clicked = t.slice(0, 40); break;
            }
          }
        } catch (e) {}
        if (!clicked) { console.log('diag: no option found q' + q); break; }
        await page.waitForTimeout(1200);
        // maybe need Next/Submit after choosing
        for (const t of ['Next', 'Submit', 'Confirm', 'Check']) {
          try { const b = page.locator(`button:has-text("${t}")`).first(); if (await b.isVisible({ timeout: 800 })) { await b.click({ timeout: 1500 }); break; } } catch (e) {}
        }
        await page.waitForTimeout(2000);
        await shot(page, `diagnostic_after_q${q}`, `chose: ${clicked}`);
      }
    } catch (e) { console.log('diag2 fail: ' + e.message); await shot(page, 'diagnostic_error', e.message); }

    newBand('c6_practice2');
    await go(page, '/practice', 3000);
    try {
      await page.locator('button:has-text("Start Practice")').first().click({ timeout: 4000 });
      await page.waitForTimeout(3000);
      await shot(page, 'practice_q1');
      // Submit with empty answer to see validation (a struggling child will do this)
      await page.locator('button:has-text("Submit Answer")').first().click({ timeout: 3000 });
      await page.waitForTimeout(1500);
      await shot(page, 'practice_submitted_empty', 'child submits without typing anything');
      // then type something wrong and submit
      const ta = page.locator('textarea, input[type="text"]').first();
      if (await ta.isVisible({ timeout: 2000 }).catch(() => false)) {
        await ta.fill('i dont know');
        await page.locator('button:has-text("Submit Answer")').first().click({ timeout: 3000 });
        await page.waitForTimeout(2500);
        await shot(page, 'practice_submitted_idk', 'child types "i dont know" and submits');
      } else {
        await shot(page, 'practice_no_input_found', 'no visible text input for the answer?');
      }
    } catch (e) { console.log('practice2 fail: ' + e.message); await shot(page, 'practice2_error', e.message); }

    // dashboard AFTER a practice attempt: does the child see any growth?
    newBand('c6_after');
    await go(page, '/dashboard', 4000);
    await shot(page, 'dashboard_after_practice');
    await ctx.close();
  }

  // ---- C9 + C12 explore (mission CTA target)
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    await signup(page, 9);
    newBand('c9_explore');
    await go(page, '/explore', 4000);
    await shot(page, 'explore_landing');
    await ctx.close();
  }
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    await signup(page, 12);
    newBand('c12_explore');
    await go(page, '/explore', 4000);
    await shot(page, 'explore_landing');
    // exam-prep default class check for C12
    await go(page, '/exam-prep', 3000);
    await shot(page, 'exam_prep_default');
    await ctx.close();
  }

  await browser.close();
  console.log('WALK2 DONE');
})().catch(e => { console.error('FATAL', e); process.exit(1); });
