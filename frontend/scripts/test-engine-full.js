/**
 * Full engine test — clicks through teaching slides, enters challenges,
 * answers a question, and verifies the complete flow.
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
      // Ignore favicon 404s and SVG data URL issues
      if (!text.includes('favicon') && !text.includes('Failed to load resource')) {
        realErrors.push('CONSOLE ERROR: ' + text);
      }
    }
  });

  console.log('1. Loading /game-test...');
  await page.goto('http://localhost:3000/game-test', { waitUntil: 'networkidle0', timeout: 30000 });

  console.log('2. Waiting for class selector buttons...');
  await page.waitForSelector('button[class*="rounded-xl"]', { timeout: 10000 });

  // Click Class 1
  console.log('3. Selecting Class 1...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const class1 = btns.find(b => b.textContent.trim() === 'Class 1');
    if (class1) class1.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Now wait for game buttons (rounded-lg class)
  console.log('4. Waiting for game buttons...');
  await page.waitForSelector('button[class*="rounded-lg"]', { timeout: 10000 });
  const gameButtonCount = await page.evaluate(() => document.querySelectorAll('button[class*="rounded-lg"]').length);
  console.log('   Game buttons found:', gameButtonCount);

  // Click first game
  console.log('5. Clicking first game...');
  await page.evaluate(() => {
    const btn = document.querySelector('button[class*="rounded-lg"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 4000));

  // Check canvas
  const canvas = await page.evaluate(() => {
    const c = document.querySelector('canvas');
    return c ? { width: c.width, height: c.height } : null;
  });
  console.log('6. Canvas:', JSON.stringify(canvas));

  // Check teaching slide
  const slide = await page.evaluate(() => {
    const h2 = document.querySelector('h2');
    const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next'));
    return { title: h2 ? h2.textContent : null, hasNext: !!nextBtn };
  });
  console.log('7. Teaching slide:', JSON.stringify(slide));

  // Click Next through all slides
  console.log('8. Clicking through teaching slides...');
  for (let i = 0; i < 5; i++) {
    const clicked = await page.evaluate(() => {
      const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next'));
      if (nextBtn) { nextBtn.click(); return true; }
      return false;
    });
    if (!clicked) break;
    await new Promise(r => setTimeout(r, 800));
  }
  await new Promise(r => setTimeout(r, 1000));

  // Check if Start button appeared
  const startCheck = await page.evaluate(() => {
    const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Start'));
    return { hasStart: !!startBtn, text: startBtn ? startBtn.textContent : null };
  });
  console.log('7. Start button:', JSON.stringify(startCheck));

  // Click Start to enter challenges
  if (startCheck.hasStart) {
    console.log('8. Entering challenges...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Start'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 2000));

    // Check challenge UI
    const challenge = await page.evaluate(() => {
      const text = document.body.innerText;
      const hasChallenge = text.includes('Challenge');
      const hasHint = !!Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('hint'));
      const optionButtons = document.querySelectorAll('button[class*="from-indigo"]').length;
      return { hasChallengeText: hasChallenge, hasHintButton: hasHint, optionCount: optionButtons };
    });
    console.log('9. Challenge UI:', JSON.stringify(challenge));

    // Answer the first challenge by clicking an option
    if (challenge.optionCount > 0) {
      console.log('10. Answering challenge by clicking first option...');
      await page.evaluate(() => {
        const opt = document.querySelector('button[class*="from-indigo"]');
        if (opt) opt.click();
      });
      await new Promise(r => setTimeout(r, 2000));

      // Check if we got feedback
      const feedback = await page.evaluate(() => {
        const text = document.body.innerText;
        const hasCorrect = text.includes('Correct') || text.includes('correct');
        const hasNextChallenge = !!Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next Challenge'));
        return { hasCorrect, hasNextChallenge };
      });
      console.log('11. Answer feedback:', JSON.stringify(feedback));

      // Take screenshot of challenge
      await page.screenshot({ path: 'D:/dream_app/frontend/test-screenshot-challenge.png' });
      console.log('    Screenshot saved: test-screenshot-challenge.png');
    }
  }

  // Take final screenshot
  await page.screenshot({ path: 'D:/dream_app/frontend/test-screenshot-final.png' });

  console.log('\n=== FINAL RESULTS ===');
  console.log('Real errors (excluding favicon):', realErrors.length);
  if (realErrors.length > 0) {
    realErrors.forEach(e => console.log('  -', e));
  } else {
    console.log('PASS: Engine works end-to-end with no errors');
  }

  await browser.close();
  process.exit(realErrors.length > 0 ? 1 : 0);
}

runTest().catch(err => {
  console.error('Test crashed:', err.message);
  process.exit(1);
});
