/**
 * test-asset-loading.js — checks which assets fail to load.
 */
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const failedRequests = [];
  const consoleErrors = [];

  page.on('requestfailed', (req) => {
    failedRequests.push(req.url());
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('response', (resp) => {
    if (resp.status() >= 400) {
      failedRequests.push(`${resp.status()} ${resp.url()}`);
    }
  });

  await page.goto('http://localhost:3000/game-test', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForSelector('button', { timeout: 10000 });

  // Click Class 1
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Class 1')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));

  // Click first game
  const gameButtons = await page.$$('button');
  for (const btn of gameButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.length > 3 && !text.includes('Class') && !text.includes('Atlas')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 5000));

  console.log('=== Failed Requests ===');
  failedRequests.forEach(r => console.log('  ', r));
  console.log('=== Console Errors ===');
  consoleErrors.forEach(e => console.log('  ', e));

  await browser.close();
})();
