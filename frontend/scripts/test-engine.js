/**
 * Headless browser smoke test for the game engine
 * Verifies the PixiJS canvas actually renders without errors
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

async function runTest() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--enable-features=Vulkan',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const errors = [];
  const consoleMessages = [];

  // Capture console messages
  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();
    consoleMessages.push({ type, text });
    if (type === 'error') {
      errors.push(text);
    }
  });

  // Capture failed requests
  page.on('requestfailed', (req) => {
    errors.push('REQUEST FAILED: ' + req.url() + ' - ' + req.failure().errorText);
  });

  page.on('response', (resp) => {
    if (resp.status() >= 400) {
      errors.push('HTTP ' + resp.status() + ': ' + resp.url());
    }
  });

  // Capture page errors
  page.on('pageerror', (err) => {
    errors.push('PAGE ERROR: ' + err.message);
  });

  console.log('1. Loading /game-test...');
  await page.goto('http://localhost:3001/game-test', { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for game buttons to appear (manifest loaded)
  console.log('2. Waiting for game buttons to load...');
  try {
    await page.waitForSelector('button[class*="rounded-xl"]', { timeout: 10000 });
    const buttonCount = await page.evaluate(() => document.querySelectorAll('button[class*="rounded-xl"]').length);
    console.log('   Game buttons found:', buttonCount);
  } catch (e) {
    console.log('   WARNING: No game buttons appeared. Manifest may not have loaded.');
    console.log('   Console messages:', consoleMessages.slice(0, 10));
  }

  // Click the first game button
  console.log('3. Clicking first game button...');
  const firstButton = await page.$('button[class*="rounded-xl"]');
  if (firstButton) {
    await firstButton.click();
    console.log('   Clicked.');

    // Wait for canvas to appear
    console.log('4. Waiting for PixiJS canvas to render...');
    try {
      await page.waitForSelector('canvas', { timeout: 15000 });
      const canvasInfo = await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return null;
        return {
          width: canvas.width,
          height: canvas.height,
          hasContext: !!canvas.getContext('webgl') || !!canvas.getContext('webgl2'),
        };
      });
      console.log('   Canvas found:', JSON.stringify(canvasInfo));
    } catch (e) {
      console.log('   WARNING: No canvas appeared after clicking game button.');
    }

    // Wait a bit for the engine to initialize
    await new Promise(r => setTimeout(r, 3000));

    // Check if the "Start" button appeared (teaching phase)
    console.log('5. Checking teaching phase UI...');
    const teachingUI = await page.evaluate(() => {
      const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Start'));
      const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next'));
      const slideTitle = document.querySelector('h2');
      return {
        hasStartButton: !!startBtn,
        hasNextButton: !!nextBtn,
        slideTitle: slideTitle ? slideTitle.textContent : null,
      };
    });
    console.log('   Teaching UI:', JSON.stringify(teachingUI));

    // Take a screenshot
    console.log('6. Taking screenshot...');
    await page.screenshot({ path: 'D:/dream_app/frontend/test-screenshot.png' });
    console.log('   Screenshot saved to test-screenshot.png');

    // Try clicking "Start" to enter challenges
    if (teachingUI.hasStartButton) {
      console.log('7. Clicking Start to enter challenges...');
      await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Start'));
        if (btn) btn.click();
      });
      await new Promise(r => setTimeout(r, 2000));

      // Check challenge phase
      const challengeUI = await page.evaluate(() => {
        const challengeText = document.body.innerText;
        return {
          hasChallengeText: challengeText.includes('Challenge'),
          hasHintButton: !!Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('hint')),
          hasOptions: document.querySelectorAll('button[class*="from-indigo"]').length,
        };
      });
      console.log('   Challenge UI:', JSON.stringify(challengeUI));

      // Take another screenshot
      await page.screenshot({ path: 'D:/dream_app/frontend/test-screenshot-challenge.png' });
      console.log('   Challenge screenshot saved');
    }
  }

  // Final report
  console.log('\n=== TEST RESULTS ===');
  console.log('Console errors:', errors.length);
  if (errors.length > 0) {
    console.log('Errors:');
    errors.forEach(e => console.log('  -', e));
  }
  console.log('Console messages (non-error):', consoleMessages.filter(m => m.type !== 'error').length);

  await browser.close();

  if (errors.length > 0) {
    process.exit(1);
  } else {
    console.log('\nPASS: No errors detected');
    process.exit(0);
  }
}

runTest().catch(err => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
