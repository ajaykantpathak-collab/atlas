/* CHILD-LENS walk: fresh signup journeys for Class 6 / 9 / 12 on :3001.
 * Screenshots + visible-text captures into D:/platform/_shots/childlens/<band>/
 */
const { chromium } = require('D:/platform/deploy/frontend/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:3001';
const OUT = 'D:/platform/_shots/childlens';
const TS = Date.now().toString(36);

let stepIdx = 0;
let curDir = '';

function newBand(band) {
  curDir = path.join(OUT, band);
  fs.mkdirSync(curDir, { recursive: true });
  stepIdx = 0;
}

async function shot(page, label, note = '') {
  stepIdx += 1;
  const name = `${String(stepIdx).padStart(2, '0')}_${label}`;
  try {
    await page.screenshot({ path: path.join(curDir, `${name}.png`), fullPage: false });
    let text = '';
    try { text = await page.evaluate(() => document.body ? document.body.innerText : ''); } catch (e) { text = 'TEXT_FAIL ' + e.message; }
    const url = page.url();
    fs.writeFileSync(path.join(curDir, `${name}.txt`),
      `URL: ${url}\nTITLE: ${await page.title().catch(() => '')}\nNOTE: ${note}\n----VISIBLE TEXT----\n${text}`);
    // also capture all links (discoverability evidence)
    try {
      const links = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a[href]')).map(a => ({ t: (a.innerText || a.getAttribute('aria-label') || '').trim().slice(0, 80), h: a.getAttribute('href') })).filter(x => x.t)
      );
      fs.writeFileSync(path.join(curDir, `${name}.links.json`), JSON.stringify(links, null, 1));
    } catch (e) { /* ignore */ }
    console.log(`SHOT ${name} -> ${url}`);
  } catch (e) {
    console.log(`SHOTFAIL ${name}: ${e.message}`);
  }
}

async function go(page, route, wait = 3000) {
  try {
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(wait);
    return true;
  } catch (e) {
    console.log(`NAVFAIL ${route}: ${e.message}`);
    return false;
  }
}

async function clickByText(page, patterns, timeout = 4000) {
  for (const p of patterns) {
    try {
      const loc = page.locator(`button:has-text("${p}"), a:has-text("${p}"), [role="button"]:has-text("${p}")`).first();
      await loc.click({ timeout });
      return p;
    } catch (e) { /* try next */ }
  }
  return null;
}

async function fillField(page, selector, value) {
  try {
    await page.locator(selector).first().fill(value, { timeout: 5000 });
    return true;
  } catch (e) { console.log('FILLFAIL ' + selector + ': ' + e.message); return false; }
}

async function signupFlow(page, band, klass) {
  newBand(band);
  await go(page, '/signup', 2500);
  await shot(page, 'signup_landing', `fresh visit, class ${klass}`);

  // Fill the form as a child would
  const email = `child_${band}_${TS}@example.com`;
  await fillField(page, 'input[type="text"]', `Test Child ${klass}`);
  await fillField(page, 'input[type="email"]', email);
  await fillField(page, 'input[type="password"]', 'happy123');
  // select class in the dropdown
  try {
    await page.locator('select').first().selectOption(String(klass), { timeout: 4000 });
  } catch (e) { console.log('CLASSSELECT FAIL: ' + e.message); }
  await shot(page, 'signup_filled', `email=${email}`);

  await clickByText(page, ['Create Account'], 5000);
  await page.waitForTimeout(4000);
  await shot(page, 'after_create_account', 'where does signup land a child?');
  return email;
}

async function walkClass6(page) {
  // dashboard is captured by signupFlow; continue the child journey
  await go(page, '/dashboard', 4000);
  await shot(page, 'dashboard_settled');

  // onboarding — would a child ever reach it?
  await go(page, '/onboarding', 3500);
  await shot(page, 'onboarding_probe');

  // diagnostic — the "first thing" many platforms push
  await go(page, '/diagnostic', 4000);
  await shot(page, 'diagnostic_landing');

  // try to start the diagnostic like a child (click the big obvious button)
  const started = await clickByText(page, ['Start', 'Begin', 'Let', "Let's", 'Go']);
  if (started) {
    await page.waitForTimeout(3500);
    await shot(page, 'diagnostic_started', `clicked: ${started}`);
    // answer up to 4 questions as a child would: click first option
    for (let q = 1; q <= 4; q++) {
      const opt = await clickByText(page, ['A', 'B'], 2500);
      if (!opt) {
        // maybe option buttons are letterless; click any visible option-ish button
        try {
          await page.locator('button').nth(3).click({ timeout: 2000 });
        } catch (e) { break; }
      }
      await page.waitForTimeout(2000);
      await shot(page, `diagnostic_q${q}_answered`);
    }
  }

  // learn hub
  await go(page, '/learn', 4000);
  await shot(page, 'learn_hub');

  // open first chapter/node if present
  const learnClick = await clickByText(page, ['Start', 'Open', 'Continue', 'Learn']);
  if (learnClick) {
    await page.waitForTimeout(3500);
    await shot(page, 'learn_opened', `clicked: ${learnClick}`);
    // try to interact inside the lesson (next / check buttons)
    for (let i = 0; i < 3; i++) {
      const c = await clickByText(page, ['Next', 'Check', 'Continue', 'Got it'], 2000);
      if (!c) break;
      await page.waitForTimeout(1500);
      await shot(page, `lesson_step${i + 1}`, `clicked: ${c}`);
    }
  }

  // practice hub + one practice question
  await go(page, '/practice', 4000);
  await shot(page, 'practice_hub');
  const pclick = await clickByText(page, ['Start', 'Practice', 'Begin']);
  if (pclick) {
    await page.waitForTimeout(3000);
    await shot(page, 'practice_started', `clicked: ${pclick}`);
    const opt = await clickByText(page, ['Check'], 2500);
    try { await page.locator('button').filter({ hasText: /A|B|C|D/ }).first().click({ timeout: 2500 }); } catch (e) {}
    await page.waitForTimeout(1500);
    await shot(page, 'practice_answered');
    const chk = await clickByText(page, ['Check', 'Submit', 'Next'], 2500);
    await page.waitForTimeout(2000);
    await shot(page, 'practice_feedback', `clicked: ${chk}`);
  }

  // progress — "is it helping me?"
  await go(page, '/progress', 4000);
  await shot(page, 'progress');

  // achievements
  await go(page, '/achievements', 3500);
  await shot(page, 'achievements');

  // galaxy home (the dashboard's "primary way in")
  await go(page, '/my-galaxy', 4500);
  await shot(page, 'my_galaxy');

  // junior mode if it exists
  await go(page, '/junior', 3500);
  await shot(page, 'junior');
}

async function walkClass9(page) {
  await go(page, '/dashboard', 4000);
  await shot(page, 'dashboard_settled');

  await go(page, '/diagnostic', 4000);
  await shot(page, 'diagnostic_landing');
  const started = await clickByText(page, ['Start', 'Begin', 'Diagnostic']);
  if (started) {
    await page.waitForTimeout(3000);
    await shot(page, 'diagnostic_started', `clicked: ${started}`);
    for (let q = 1; q <= 3; q++) {
      try { await page.locator('button').filter({ hasText: /A|B|C|D/ }).first().click({ timeout: 2500 }); } catch (e) { break; }
      await page.waitForTimeout(1200);
      await clickByText(page, ['Next', 'Submit', 'Confirm'], 2000);
      await page.waitForTimeout(1500);
      await shot(page, `diagnostic_q${q}_answered`);
    }
  }

  await go(page, '/learn', 4000);
  await shot(page, 'learn_hub');

  await go(page, '/practice', 4000);
  await shot(page, 'practice_hub');

  await go(page, '/exam-prep', 4000);
  await shot(page, 'exam_prep');

  await go(page, '/homework', 3500);
  await shot(page, 'homework');

  await go(page, '/progress', 4000);
  await shot(page, 'progress');

  await go(page, '/achievements', 3000);
  await shot(page, 'achievements');

  await go(page, '/my-galaxy', 4000);
  await shot(page, 'my_galaxy');
}

async function walkClass12(page) {
  await go(page, '/dashboard', 4000);
  await shot(page, 'dashboard_settled');

  await go(page, '/diagnostic', 4000);
  await shot(page, 'diagnostic_landing');

  await go(page, '/exam-prep', 4000);
  await shot(page, 'exam_prep');

  await go(page, '/exam-simulator', 4000);
  await shot(page, 'exam_simulator');

  await go(page, '/learn', 4000);
  await shot(page, 'learn_hub');

  await go(page, '/practice', 3500);
  await shot(page, 'practice_hub');

  await go(page, '/progress', 4000);
  await shot(page, 'progress');

  await go(page, '/my-galaxy', 4000);
  await shot(page, 'my_galaxy');

  // board-exam framing: chapter-test
  await go(page, '/chapter-test', 3500);
  await shot(page, 'chapter_test');
}

async function mobilePass(context) {
  // Class 6 child on a phone — the most common device in India
  newBand('c6_mobile');
  const mpage = await context.newPage();
  await mpage.setViewportSize({ width: 390, height: 844 });
  await go(mpage, '/dashboard', 4500);
  await shot(mpage, 'mobile_dashboard');
  await go(mpage, '/learn', 3500);
  await shot(mpage, 'mobile_learn');
  await go(mpage, '/progress', 3000);
  await shot(mpage, 'mobile_progress');
  await mpage.close();
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  fs.mkdirSync(OUT, { recursive: true });

  // Class 6
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    const email = await signupFlow(page, 'c6', 6);
    await walkClass6(page);
    await mobilePass(ctx);
    fs.writeFileSync(path.join(OUT, 'c6', 'ACCOUNT.txt'), email);
    await ctx.close();
  }
  // Class 9
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    const email = await signupFlow(page, 'c9', 9);
    await walkClass9(page);
    fs.writeFileSync(path.join(OUT, 'c9', 'ACCOUNT.txt'), email);
    await ctx.close();
  }
  // Class 12
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    const email = await signupFlow(page, 'c12', 12);
    await walkClass12(page);
    fs.writeFileSync(path.join(OUT, 'c12', 'ACCOUNT.txt'), email);
    await ctx.close();
  }

  await browser.close();
  console.log('WALK DONE');
})().catch(e => { console.error('FATAL', e); process.exit(1); });
