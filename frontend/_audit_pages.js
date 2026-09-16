const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost';
const OUT = path.join(__dirname, '_shots');
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
  '/', '/login', '/signup', '/forgot-password', '/verify-email',
  '/onboarding', '/dashboard', '/learn', '/explore', '/practice',
  '/practice/deterministic', '/quizzes', '/simulations', '/sims-v2',
  '/tutor', '/ai-tutor', '/socratic-tutor', '/competency-tutor', '/tutoring',
  '/solver', '/diagnostic', '/exam', '/exam-prep', '/exam-simulator',
  '/homework', '/progress', '/achievements', '/portfolio', '/videos',
  '/study-groups', '/study-tools', '/coding-playground', '/sandbox',
  '/cognitive', '/holistic', '/junior', '/galaxy', '/my-world', '/atlas',
  '/atlas-v2', '/3d-lab', '/lumen', '/organism', '/lesson', '/offline',
  '/settings', '/settings/accessibility', '/parent-overview',
  '/teacher-dashboard', '/teacher-overview', '/admin-dashboard',
];

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const report = [];

  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
    page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e).slice(0, 200)));
    let status = 0, finalUrl = '';
    try {
      const resp = await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 20000 });
      status = resp ? resp.status() : 0;
      finalUrl = page.url();
      await page.waitForTimeout(1200);
    } catch (e) {
      errors.push('NAV: ' + String(e).slice(0, 120));
      finalUrl = page.url();
    }
    const name = (route === '/' ? 'home' : route.slice(1).replace(/\//g, '_')) || 'home';
    try { await page.screenshot({ path: path.join(OUT, name + '.png') }); } catch {}
    report.push({ route, status, finalUrl, errors: errors.slice(0, 5) });
    await page.close();
  }
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1));
  for (const r of report) {
    const redir = r.finalUrl !== BASE + r.route ? ' -> ' + r.finalUrl.replace(BASE, '') : '';
    console.log(`${String(r.status).padEnd(4)} ${r.route}${redir} ${r.errors.length ? '| ERR: ' + r.errors[0] : ''}`);
  }
  await browser.close();
})();
