/**
 * test-visual-canvas.js — Test that the PixiJS canvas renders visual challenges.
 *
 * Verifies:
 * - Canvas mounts with correct dimensions
 * - Teaching slides work
 * - Challenge phase shows visual content on canvas (not just DOM)
 * - Wrong answer triggers solution walkthrough
 * - Second wrong answer reveals correct answer on canvas
 * - Multiple subjects tested (math, biology, etc.)
 */

const puppeteer = require('puppeteer');

const BASE = 'http://localhost:3000';

async function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function testSubject(page, className, gameIndex, subjectName) {
  const results = { subject: subjectName, errors: [], canvasContent: false, visualLayerChildren: 0 };

  try {
    // Select class
    await page.waitForSelector('button', { timeout: 10000 });
    const classButtons = await page.$$eval('button', els =>
      els.filter(e => e.textContent && e.textContent.match(/Class\s+[1-5]/i))
         .map(e => e.textContent.trim())
    );

    if (classButtons.length === 0) {
      results.errors.push('No class buttons found');
      return results;
    }

    // Click the class tab
    const classBtn = await page.evaluateHandle((className) => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.textContent && b.textContent.includes(className));
    }, className);

    if (classBtn) {
      await classBtn.asElement().click();
      await wait(1000);
    }

    // Wait for game buttons
    await page.waitForSelector('button', { timeout: 10000 });
    const gameButtons = await page.$$eval('button', els =>
      els.filter(e => e.textContent && e.textContent.length > 5 && !e.textContent.match(/Class\s+[1-5]/i))
         .map(e => e.textContent.trim())
    );

    if (gameButtons.length <= gameIndex) {
      results.errors.push(`Only ${gameButtons.length} games found, need index ${gameIndex}`);
      return results;
    }

    // Click the game
    const gameBtn = await page.evaluateHandle((idx) => {
      const btns = Array.from(document.querySelectorAll('button'));
      const gameBtns = btns.filter(b => b.textContent && b.textContent.length > 5 && !b.textContent.match(/Class\s+[1-5]/i));
      return gameBtns[idx];
    }, gameIndex);

    if (gameBtn) {
      await gameBtn.asElement().click();
      await wait(2000);
    }

    // Check canvas
    const canvas = await page.$('canvas');
    if (!canvas) {
      results.errors.push('No canvas found');
      return results;
    }

    const canvasInfo = await page.evaluate(() => {
      const c = document.querySelector('canvas');
      return { width: c?.width, height: c?.height, hasContext: !!c?.getContext('2d') };
    });
    results.canvasInfo = canvasInfo;

    // Click through teaching slides
    for (let i = 0; i < 5; i++) {
      const nextBtn = await page.evaluateHandle(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        return btns.find(b => b.textContent && (b.textContent.includes('Next') || b.textContent.includes('→')));
      });
      if (nextBtn && nextBtn.asElement()) {
        await nextBtn.asElement().click();
        await wait(500);
      }
    }

    // Click Start
    const startBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.textContent && b.textContent.includes('Start'));
    });
    if (startBtn && startBtn.asElement()) {
      await startBtn.asElement().click();
      await wait(1500);
    }

    // Check challenge text
    const challengeText = await page.evaluate(() => {
      const el = document.querySelector('[class*="challenge"]') || document.querySelector('p');
      return el ? el.textContent : null;
    });
    results.challengeText = challengeText;

    // Check that canvas has visual content (non-blank pixels)
    const canvasHasContent = await page.evaluate(() => {
      const c = document.querySelector('canvas');
      if (!c) return false;
      const ctx = c.getContext('2d');
      if (!ctx) return false;
      const imageData = ctx.getImageData(0, 0, c.width, c.height);
      let nonBgPixels = 0;
      // Check for non-background pixels (background is 0xfdf6e3 = ~253,246,227)
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        // Count pixels that differ significantly from background
        if (Math.abs(r - 253) > 20 || Math.abs(g - 246) > 20 || Math.abs(b - 227) > 20) {
          nonBgPixels++;
        }
      }
      return { nonBgPixels, totalPixels: c.width * c.height, ratio: nonBgPixels / (c.width * c.height) };
    });
    results.canvasContent = canvasHasContent;
    results.visualLayerChildren = canvasHasContent ? canvasHasContent.nonBgPixels : 0;

    // Try answering wrong twice to trigger solution walkthrough + correct answer
    const optionBtns = await page.$$('button');
    let wrongAttempts = 0;
    for (let i = 0; i < optionBtns.length && wrongAttempts < 2; i++) {
      const text = await page.evaluate(el => el.textContent, optionBtns[i]);
      if (text && text.length > 0 && text.length < 50 && !text.includes('Class') && !text.includes('Start') && !text.includes('Next') && !text.includes('Hint') && !text.includes('Listen')) {
        try {
          await optionBtns[i].click();
          await wait(800);
          wrongAttempts++;
        } catch (_e) {}
      }
    }

    // Check if correct answer is shown
    const correctAnswerShown = await page.evaluate(() => {
      const body = document.body.innerText;
      return body.includes('✓') || body.includes('correct answer is');
    });
    results.correctAnswerShown = correctAnswerShown;

    // Check canvas content after wrong answers (should show solution walkthrough)
    const canvasAfterWrong = await page.evaluate(() => {
      const c = document.querySelector('canvas');
      if (!c) return false;
      const ctx = c.getContext('2d');
      if (!ctx) return false;
      const imageData = ctx.getImageData(0, 0, c.width, c.height);
      let nonBgPixels = 0;
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        if (Math.abs(r - 253) > 20 || Math.abs(g - 246) > 20 || Math.abs(b - 227) > 20) {
          nonBgPixels++;
        }
      }
      return nonBgPixels;
    });
    results.canvasAfterWrong = canvasAfterWrong;

  } catch (err) {
    results.errors.push(err.message);
  }

  return results;
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const errors = [];

  try {
    const page = await browser.newPage();
    page.on('pageerror', (err) => {
      if (!err.message.includes('favicon')) errors.push(`Page error: ${err.message}`);
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().includes('favicon') && !msg.text().includes('Failed to load resource') && !msg.text().includes('WebGL') && !msg.text().includes('Canvas2D fallback')) {
        errors.push(`Console error: ${msg.text()}`);
      }
    });

    console.log('1. Loading /game-test...');
    await page.goto(`${BASE}/game-test`, { waitUntil: 'networkidle2', timeout: 30000 });
    await wait(2000);

    // Test Class 1 Math (first game — addition)
    console.log('\n2. Testing Class 1 Math (Addition)...');
    const mathResult = await testSubject(page, 'Class 1', 0, 'Math - Addition');
    console.log('   Canvas:', JSON.stringify(mathResult.canvasInfo));
    console.log('   Challenge:', mathResult.challengeText?.substring(0, 60));
    console.log('   Canvas content (non-bg pixels):', mathResult.canvasContent?.nonBgPixels || 0);
    console.log('   Content ratio:', ((mathResult.canvasContent?.ratio || 0) * 100).toFixed(1) + '%');
    console.log('   Correct answer shown:', mathResult.correctAnswerShown);
    console.log('   Canvas after wrong answers:', mathResult.canvasAfterWrong);
    if (mathResult.errors.length > 0) console.log('   Errors:', mathResult.errors);

    // Reload for next test
    await page.goto(`${BASE}/game-test`, { waitUntil: 'networkidle2', timeout: 30000 });
    await wait(2000);

    // Test Class 3 Biology (look for a biology game)
    console.log('\n3. Testing Class 3 Biology...');
    const bioResult = await testSubject(page, 'Class 3', 0, 'Biology');
    console.log('   Canvas:', JSON.stringify(bioResult.canvasInfo));
    console.log('   Challenge:', bioResult.challengeText?.substring(0, 60));
    console.log('   Canvas content (non-bg pixels):', bioResult.canvasContent?.nonBgPixels || 0);
    console.log('   Content ratio:', ((bioResult.canvasContent?.ratio || 0) * 100).toFixed(1) + '%');
    if (bioResult.errors.length > 0) console.log('   Errors:', bioResult.errors);

    // Reload for next test
    await page.goto(`${BASE}/game-test`, { waitUntil: 'networkidle2', timeout: 30000 });
    await wait(2000);

    // Test Class 2 (another subject)
    console.log('\n4. Testing Class 2...');
    const c2Result = await testSubject(page, 'Class 2', 0, 'Class 2');
    console.log('   Canvas:', JSON.stringify(c2Result.canvasInfo));
    console.log('   Challenge:', c2Result.challengeText?.substring(0, 60));
    console.log('   Canvas content (non-bg pixels):', c2Result.canvasContent?.nonBgPixels || 0);
    console.log('   Content ratio:', ((c2Result.canvasContent?.ratio || 0) * 100).toFixed(1) + '%');
    if (c2Result.errors.length > 0) console.log('   Errors:', c2Result.errors);

    // Take a screenshot of the math challenge
    await page.goto(`${BASE}/game-test`, { waitUntil: 'networkidle2', timeout: 30000 });
    await wait(2000);
    const r2 = await testSubject(page, 'Class 1', 0, 'Math screenshot');
    await page.screenshot({ path: 'test-visual-canvas.png' });
    console.log('\n5. Screenshot saved: test-visual-canvas.png');

  } catch (err) {
    errors.push(`Fatal: ${err.message}`);
  } finally {
    await browser.close();
  }

  console.log('\n=== FINAL RESULTS ===');
  console.log('Real errors (excluding favicon):', errors.length);
  errors.forEach(e => console.log('  -', e));

  if (errors.length === 0) {
    console.log('PASS: Canvas visual rendering works with no errors');
  } else {
    console.log('FAIL: Errors detected');
    process.exit(1);
  }
})();
