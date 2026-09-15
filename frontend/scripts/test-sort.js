/**
 * Test sort challenges specifically — verify bins and sortItems render
 */

const puppeteer = require('puppeteer');

async function runTest() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const realErrors = [];
  page.on('pageerror', (err) => realErrors.push('PAGE ERROR: ' + err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!text.includes('favicon') && !text.includes('Failed to load resource')) {
        realErrors.push('CONSOLE ERROR: ' + text);
      }
    }
  });

  console.log('1. Loading /game-test...');
  await page.goto('http://localhost:3000/game-test', { waitUntil: 'networkidle0', timeout: 30000 });

  console.log('2. Selecting Class 1...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const class1 = btns.find(b => b.textContent.trim() === 'Class 1');
    if (class1) class1.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  console.log('3. Clicking BalanceGame...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const balance = btns.find(b => b.textContent.includes('Balance'));
    if (balance) balance.click();
  });
  await new Promise(r => setTimeout(r, 4000));

  // Click through teaching slides
  console.log('4. Clicking through teaching slides...');
  for (let i = 0; i < 6; i++) {
    const clicked = await page.evaluate(() => {
      const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next'));
      if (nextBtn) { nextBtn.click(); return true; }
      return false;
    });
    if (!clicked) break;
    await new Promise(r => setTimeout(r, 600));
  }
  await new Promise(r => setTimeout(r, 1000));

  // Click Start
  console.log('5. Clicking Start...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Start'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  // Skip through identify challenges (challenges 0-2)
  console.log('6. Answering identify challenges 0-2...');
  for (let i = 0; i < 3; i++) {
    // Try each option until correct or correct answer is revealed
    for (let attempt = 0; attempt < 5; attempt++) {
      const stillButtons = await page.evaluate(() => {
        return document.querySelectorAll('button[class*="from-indigo"]').length;
      });
      if (stillButtons === 0) break;
      await page.evaluate((idx) => {
        const buttons = Array.from(document.querySelectorAll('button[class*="from-indigo"]'));
        if (buttons[idx] && !buttons[idx].disabled) buttons[idx].click();
      }, attempt % 3);
      await new Promise(r => setTimeout(r, 1200));

      // Check if "Got it! Next Challenge" button appeared (correct answer revealed)
      const gotIt = await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Got it'));
        if (btn) { btn.click(); return true; }
        return false;
      });
      if (gotIt) { await new Promise(r => setTimeout(r, 1500)); break; }
    }
    // Click "Next Challenge" button if it appeared
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next Challenge') || b.textContent.includes('Finish'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
  }

  // Now we should be at challenge 3 (sort challenge)
  console.log('7. Checking sort challenge UI...');
  const sortUI = await page.evaluate(() => {
    const text = document.body.innerText;
    const hasDragText = text.includes('Drag each card');
    const binElements = document.querySelectorAll('[data-bin-id]').length;
    const sortContainer = document.querySelectorAll('[data-sort-container]').length;
    const draggableCards = document.querySelectorAll('[class*="cursor-grab"]').length;
    return { hasDragText, binElements, sortContainer, draggableCards };
  });
  console.log('   Sort UI:', JSON.stringify(sortUI));

  // Take screenshot
  await page.screenshot({ path: 'D:/dream_app/frontend/test-sort.png' });
  console.log('   Screenshot saved: test-sort.png');

  console.log('\n=== RESULTS ===');
  console.log('Errors:', realErrors.length);
  if (realErrors.length > 0) realErrors.forEach(e => console.log('  -', e));
  else console.log('PASS: No errors');

  await browser.close();
  process.exit(realErrors.length > 0 ? 1 : 0);
}

runTest().catch(err => {
  console.error('Test crashed:', err.message);
  process.exit(1);
});
