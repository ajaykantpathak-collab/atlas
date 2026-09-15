const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function screenshot() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000 });

  const outDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Light Ray
  await page.goto('http://localhost:3000/test-sim', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(outDir, '06-lightray-new.png'), fullPage: true });
  console.log('Saved 06-lightray-new.png');

  // Switch to Circuit Builder
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Circuit Builder'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(outDir, '07-circuit-new.png'), fullPage: true });
  console.log('Saved 07-circuit-new.png');

  // Switch back to Light Ray and test prism mode
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Light Ray'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent === 'Prism');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, '08-lightray-prism.png'), fullPage: true });
  console.log('Saved 08-lightray-prism.png');

  await browser.close();
  console.log('Done!');
}

screenshot().catch(err => { console.error('FATAL:', err.message); process.exit(1); });
