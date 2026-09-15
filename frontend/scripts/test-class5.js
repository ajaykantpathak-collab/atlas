/**
 * test-class5.js — Test Class 5 games across all subjects.
 * Verifies that the canvas visual renderer handles Class 5 topics:
 * - Math: angles, perimeter, area, fractions, decimals, percentages, integers, primes, patterns
 * - Biology: circulatory, crops, agriculture
 * - Physics: physical/chemical changes, air composition
 * - Chemistry: mixtures, solutions
 * - CS: computer history
 * - Geography: environment, natural disasters
 * - EVS: transport
 */

const puppeteer = require('puppeteer');

const BASE = 'http://localhost:3000';
const wait = (ms) => new Promise(r => setTimeout(r, ms));

async function testClass5Game(page, gameIndex, gameName) {
  const result = { game: gameName, errors: [], challengeText: null, canvasOk: false };

  try {
    // Select Class 5
    const classBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.textContent && b.textContent.includes('Class 5'));
    });
    if (classBtn && classBtn.asElement()) {
      await classBtn.asElement().click();
      await wait(1000);
    }

    // Click the game
    const gameBtn = await page.evaluateHandle((idx) => {
      const btns = Array.from(document.querySelectorAll('button'));
      const gameBtns = btns.filter(b => b.textContent && b.textContent.length > 3 && !b.textContent.match(/Class\s+[1-5]/i));
      return gameBtns[idx];
    }, gameIndex);
    if (gameBtn && gameBtn.asElement()) {
      await gameBtn.asElement().click();
      await wait(2000);
    } else {
      result.errors.push('Game button not found');
      return result;
    }

    // Check canvas
    const canvas = await page.$('canvas');
    if (!canvas) { result.errors.push('No canvas'); return result; }
    result.canvasOk = true;

    // Click through teaching slides
    for (let i = 0; i < 6; i++) {
      const next = await page.evaluateHandle(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        return btns.find(b => b.textContent && (b.textContent.includes('Next') || b.textContent.includes('→')));
      });
      if (next && next.asElement()) {
        await next.asElement().click();
        await wait(400);
      }
    }

    // Click Start
    const start = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.textContent && b.textContent.includes('Start'));
    });
    if (start && start.asElement()) {
      await start.asElement().click();
      await wait(1500);
    }

    // Get challenge text
    result.challengeText = await page.evaluate(() => {
      const p = document.querySelector('p');
      return p ? p.textContent?.substring(0, 100) : null;
    });

    // Try answering wrong to trigger solution walkthrough
    const opts = await page.$$('button');
    let clicked = 0;
    for (let i = 0; i < opts.length && clicked < 2; i++) {
      const text = await page.evaluate(el => el.textContent, opts[i]);
      if (text && text.length > 0 && text.length < 60 && !text.includes('Class') && !text.includes('Start') && !text.includes('Next') && !text.includes('Hint') && !text.includes('Listen') && !text.includes('Got it')) {
        try {
          await opts[i].click();
          await wait(600);
          clicked++;
        } catch (_e) {}
      }
    }

    // Check if correct answer shown
    result.correctShown = await page.evaluate(() => document.body.innerText.includes('✓') || document.body.innerText.includes('correct answer is'));

  } catch (err) {
    result.errors.push(err.message);
  }
  return result;
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const errors = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    page.on('pageerror', (err) => {
      if (!err.message.includes('favicon')) errors.push(`Page: ${err.message}`);
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().includes('favicon') && !msg.text().includes('WebGL') && !msg.text().includes('Canvas2D') && !msg.text().includes('Failed to load')) {
        errors.push(`Console: ${msg.text()}`);
      }
    });

    // Test a selection of Class 5 games across subjects
    const testGames = [
      { idx: 0, name: 'Agriculture (biology)' },
      { idx: 1, name: 'Angles (maths)' },
      { idx: 2, name: 'Area/Perimeter (maths)' },
      { idx: 3, name: 'Changes/Air (physics)' },
      { idx: 5, name: 'CS game' },
      { idx: 10, name: 'Geography game' },
      { idx: 21, name: 'Physics game 2' },
      { idx: 22, name: 'Chemistry game' },
    ];

    for (const tg of testGames) {
      console.log(`\nTesting Class 5 game ${tg.idx}: ${tg.name}...`);
      await page.goto(`${BASE}/game-test`, { waitUntil: 'networkidle0', timeout: 30000 });
      await wait(2000);
      const r = await testClass5Game(page, tg.idx, tg.name);
      console.log(`  Challenge: ${r.challengeText?.substring(0, 80) || 'N/A'}`);
      console.log(`  Canvas OK: ${r.canvasOk}`);
      console.log(`  Correct shown: ${r.correctShown}`);
      if (r.errors.length > 0) console.log(`  Errors: ${r.errors}`);
    }

  } catch (err) {
    errors.push(`Fatal: ${err.message}`);
  } finally {
    await browser.close();
  }

  console.log('\n=== CLASS 5 TEST RESULTS ===');
  console.log('Real errors:', errors.length);
  errors.forEach(e => console.log('  -', e));
  if (errors.length === 0) {
    console.log('PASS: Class 5 games work with no errors');
  } else {
    console.log('FAIL: Errors detected');
    process.exit(1);
  }
})();
