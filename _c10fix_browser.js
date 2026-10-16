// c10fix — Playwright walkthrough on :3001 for the class-10 audit account.
// Captures the four UI defect surfaces: exam-simulator branding, tutor class,
// diagnostic subject cards (Hindi), dashboard mastery map + grammar practice.
const { chromium } = require('playwright');
const fs = require('fs');
const SHOTS = 'D:/platform/_c10_audit/shots_c10fix';
const TAG = process.env.SHOT_TAG || 'run';

(async () => {
  const creds = JSON.parse(fs.readFileSync('D:/platform/_c10_audit/creds.json', 'utf-8'));
  fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message.slice(0, 160)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 200)); });

  // login
  await page.goto('http://localhost:3001/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.fill('input[type="email"]', creds.email);
  await page.fill('input[type="password"]', creds.password);
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(8000);
  console.log('LOGIN ->', page.url());

  const visit = async (name, url, waitMs) => {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(waitMs || 7000);
    const bodyText = (await page.locator('body').innerText().catch(() => '')).replace(/\n+/g, ' | ');
    await page.screenshot({ path: `${SHOTS}/${TAG}_${name}.png`, fullPage: false });
    console.log(`VISIT ${name}: ${bodyText.slice(0, 330)}`);
    return bodyText;
  };

  const examTxt = await visit('exam_simulator', 'http://localhost:3001/exam-simulator', 8000);
  const tutorTxt = await visit('tutor', 'http://localhost:3001/tutor', 9000);
  const diagTxt = await visit('diagnostic', 'http://localhost:3001/diagnostic', 8000);
  const dashTxt = await visit('dashboard', 'http://localhost:3001/dashboard', 8000);
  const prepTxt = await visit('exam_prep', 'http://localhost:3001/exam-prep', 7000);

  const checks = {
    exam_isc_branding: /ISC Board Exams|ISC बोर्ड/i.test(examTxt),
    exam_cbse_branding: /CBSE/i.test(examTxt),
    tutor_class11: /Class 11/i.test(tutorTxt),
    tutor_class10: /Class 10/i.test(tutorTxt),
    diagnostic_hindi_card: /Hindi/i.test(diagTxt),
    dashboard_mastery_mentions_660: /660/i.test(dashTxt),
  };
  console.log('CHECKS', JSON.stringify(checks));
  fs.writeFileSync(`${SHOTS}/${TAG}_checks.json`, JSON.stringify({ checks, errors: errors.slice(0, 20) }, null, 1));
  console.log('console/page errors:', errors.length);
  await browser.close();
  console.log('BROWSER PASS DONE:', TAG);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
