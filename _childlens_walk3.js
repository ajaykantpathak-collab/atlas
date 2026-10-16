/* CHILD-LENS walk 3: complete real sessions to reach end-of-session screens:
 * - C6 lesson "Take Quiz" -> full quiz -> results
 * - C6 practice: type an answer, submit, see feedback
 * - Diagnostic: subject+chapter -> Start -> answer all -> results screen
 * - /explore with long wait
 */
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

async function clickVisible(page, texts, timeout = 2500) {
  for (const t of texts) {
    try {
      const loc = page.locator(`button:has-text("${t}"), a:has-text("${t}")`).first();
      if (await loc.isVisible({ timeout }) ) { await loc.click({ timeout: 2000 }); return t; }
    } catch (e) {}
  }
  return null;
}

async function signup(page, klass) {
  await go(page, '/signup', 2000);
  const email = `child3_c${klass}_${TS}@example.com`;
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
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await signup(page, 6);

  // ---- full quiz from the lesson
  newBand('c6_quiz');
  await go(page, '/learn/numbers-in-our-everyday-life', 4000);
  const took = await clickVisible(page, ['Take Quiz']);
  console.log('take quiz clicked: ' + took);
  await page.waitForTimeout(3500);
  await shot(page, 'quiz_landing', `after Take Quiz`);
  const started = await clickVisible(page, ['Start Quiz', 'Start', 'Begin']);
  console.log('quiz start clicked: ' + started);
  await page.waitForTimeout(2500);
  await shot(page, 'quiz_q1');
  // answer up to 8 questions
  for (let q = 1; q <= 8; q++) {
    // MCQ: click first option-like element; else type an answer
    let answered = false;
    try {
      const btns = page.locator('button:visible');
      const n = await btns.count();
      for (let i = 0; i < n; i++) {
        const t = (await btns.nth(i).innerText().catch(() => '')).trim();
        if (t && !/start|submit|next|skip|exit|quit|check|quiz/i.test(t) && t.length > 0 && t.length < 150) {
          await btns.nth(i).click({ timeout: 1200 }); answered = true; break;
        }
      }
    } catch (e) {}
    if (!answered) {
      const inp = page.locator('input[type="text"]:visible, input[type="number"]:visible').first();
      if (await inp.isVisible({ timeout: 1500 }).catch(() => false)) {
        await inp.fill('4'); answered = true;
      }
    }
    await page.waitForTimeout(800);
    const nxt = await clickVisible(page, ['Submit', 'Check Answer', 'Check', 'Next Question', 'Next']);
    await page.waitForTimeout(1800);
    await shot(page, `quiz_after_q${q}`, `answered=${answered} clicked=${nxt}`);
    // stop if results-ish screen appears
    const body = await page.evaluate(() => document.body.innerText.slice(0, 3000));
    if (/results?|score|complete|finished|you got|out of/i.test(body) && !/Question \d+ of/i.test(body)) { console.log('quiz seems finished at q' + q); break; }
  }

  // ---- practice with typed answer
  newBand('c6_practice3');
  await go(page, '/practice', 3000);
  await clickVisible(page, ['Start Practice']);
  await page.waitForTimeout(3000);
  await shot(page, 'practice_q1');
  const inp = page.locator('textarea:visible, input[type="text"]:visible').first();
  if (await inp.isVisible({ timeout: 2500 }).catch(() => false)) {
    await inp.fill('1/5 and 6/10 because they equal the same amount of cake');
    await clickVisible(page, ['Submit Answer']);
    await page.waitForTimeout(2500);
    await shot(page, 'practice_after_submit', 'typed a reasonable answer and submitted');
  } else {
    await shot(page, 'practice_no_input');
  }
  // continue through remaining questions quickly
  for (let q = 2; q <= 6; q++) {
    const nx = await clickVisible(page, ['Next Question', 'Next', 'Continue']);
    if (!nx) break;
    await page.waitForTimeout(2000);
    const inp2 = page.locator('textarea:visible, input[type="text"]:visible').first();
    if (await inp2.isVisible({ timeout: 1500 }).catch(() => false)) {
      await inp2.fill('not sure');
      await clickVisible(page, ['Submit Answer']);
      await page.waitForTimeout(2000);
    }
    await shot(page, `practice_q${q}`);
  }

  // ---- explore with long wait
  newBand('c6_explore2');
  await go(page, '/explore', 12000);
  await shot(page, 'explore_after_12s');

  // ---- diagnostic full: subject + chapter + start + all questions
  newBand('c6_diagfull');
  await go(page, '/diagnostic', 3000);
  await clickVisible(page, ['Mathematics']);
  await page.waitForTimeout(1000);
  await shot(page, 'subject_then_chapters');
  await clickVisible(page, ['Algebra']);
  await page.waitForTimeout(800);
  const go2 = await clickVisible(page, ['Start Diagnostic']);
  console.log('diag start: ' + go2);
  await page.waitForTimeout(3500);
  await shot(page, 'diag_q1');
  for (let q = 1; q <= 12; q++) {
    let answered = false;
    try {
      const btns = page.locator('button:visible');
      const n = await btns.count();
      for (let i = 0; i < n; i++) {
        const t = (await btns.nth(i).innerText().catch(() => '')).trim();
        if (t && !/start|submit|next|skip|exit|quit|check|diagnostic|question/i.test(t) && t.length > 0 && t.length < 200) {
          await btns.nth(i).click({ timeout: 1200 }); answered = true; break;
        }
      }
    } catch (e) {}
    if (!answered) {
      const inp2 = page.locator('input:visible').first();
      if (await inp2.isVisible({ timeout: 1200 }).catch(() => false)) { await inp2.fill('5'); answered = true; }
    }
    await page.waitForTimeout(600);
    const nx = await clickVisible(page, ['Submit', 'Check', 'Next']);
    await page.waitForTimeout(1500);
    if (q % 3 === 0) await shot(page, `diag_after_q${q}`, `answered=${answered}`);
    const body = await page.evaluate(() => document.body.innerText.slice(0, 3000));
    if (/Question \d+ of (\d+)/.test(body)) {
      const m = body.match(/Question (\d+) of (\d+)/);
      if (m && m[1] === m[2]) { await shot(page, 'diag_last_answered'); }
    }
    if (/Diagnostic Complete|Your Results|Results|complete/i.test(body) && !/Question \d+ of/i.test(body)) {
      console.log('diag finished at q' + q);
      await shot(page, 'diag_results_screen', 'THE 15-minute payoff screen');
      break;
    }
  }
  await shot(page, 'diag_final_state');

  // dashboard after real activity
  newBand('c6_after2');
  await go(page, '/dashboard', 4500);
  await shot(page, 'dashboard_after_real_session');

  await ctx.close();
  await browser.close();
  console.log('WALK3 DONE');
})().catch(e => { console.error('FATAL', e); process.exit(1); });
