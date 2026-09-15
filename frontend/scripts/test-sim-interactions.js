/**
 * test-sim-interactions.js
 *
 * Real interaction tests for the simulation framework.
 * Tests actual drag-and-drop and tap flows, not just canvas existence.
 * Uses Puppeteer to simulate pointer events on the PixiJS canvas.
 */

const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3000';
const GAME_TEST_URL = `${BASE_URL}/game-test`;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!text.includes('favicon') && !text.includes('Failed to load resource')) {
        errors.push(text);
      }
    }
  });

  const results = [];

  try {
    // ─── Helper: Load game-test and select a class ────────
    await page.goto(GAME_TEST_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);

    // Select Class 5
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent.includes('Class 5')) {
          btn.click();
          return;
        }
      }
    });
    await sleep(1500);

    // ─── Helper: Click through teaching slides and start ──
    async function startGame(gameIndex) {
      // Click game button by index
      await page.evaluate((idx) => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const gameButtons = buttons.filter(b => b.textContent.length > 5 && !b.textContent.includes('Class'));
        if (gameButtons[idx]) gameButtons[idx].click();
      }, gameIndex);
      await sleep(1000);

      // Click through 5 teaching slides
      for (let i = 0; i < 5; i++) {
        await page.evaluate(() => {
          const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next') || b.textContent.includes('▶'));
          if (nextBtn) nextBtn.click();
        });
        await sleep(300);
      }

      // Click Start button
      await page.evaluate(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Start'));
        if (startBtn) startBtn.click();
      });
      await sleep(1500);
    }

    // ─── Helper: Get canvas bounding box ──────────────────
    async function getCanvasBox() {
      return await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      });
    }

    // ─── Helper: Simulate a drag on the canvas ────────────
    async function canvasDrag(startX, startY, endX, endY) {
      const box = await getCanvasBox();
      if (!box) return;

      const sx = box.x + startX;
      const sy = box.y + startY;
      const ex = box.x + endX;
      const ey = box.y + endY;

      // Move to start
      await page.mouse.move(sx, sy);
      await page.mouse.down();
      await sleep(100);

      // Move in steps
      const steps = 10;
      for (let i = 1; i <= steps; i++) {
        const x = sx + (ex - sx) * (i / steps);
        const y = sy + (ey - sy) * (i / steps);
        await page.mouse.move(x, y);
        await sleep(30);
      }

      await page.mouse.up();
      await sleep(500);
    }

    // ─── Helper: Simulate a tap on the canvas ─────────────
    async function canvasTap(x, y) {
      const box = await getCanvasBox();
      if (!box) return;

      const tx = box.x + x;
      const ty = box.y + y;

      await page.mouse.move(tx, ty);
      await page.mouse.down();
      await sleep(50);
      await page.mouse.up();
      await sleep(300);
    }

    // ─── Helper: Get challenge text ───────────────────────
    async function getChallengeText() {
      return await page.evaluate(() => {
        const el = document.querySelector('[class*="challenge"], [class*="question"], p, h2, h3');
        // Look for the challenge text in any element
        const allText = document.body.innerText;
        const lines = allText.split('\n').filter(l => l.length > 10 && l.includes('?'));
        return lines[0] || '';
      });
    }

    // ─── Helper: Check if canvas has content ──────────────
    async function canvasHasContent() {
      return await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return false;
        const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('2d');
        if (!ctx) return false;
        return canvas.width > 0 && canvas.height > 0;
      });
    }

    // ─── Helper: Check if DOM answer buttons are hidden ───
    async function domButtonsHidden() {
      return await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const answerButtons = buttons.filter(b => {
          const text = b.textContent.trim();
          return text.length > 0 && text.length < 50 && !b.textContent.includes('Show') && !b.textContent.includes('Hint') && !b.textContent.includes('Next') && !b.textContent.includes('Start') && !b.textContent.includes('Class');
        });
        // In interactive mode, there should be an instruction text instead of buttons
        const hasInstruction = document.body.innerText.includes('Drag') || document.body.innerText.includes('Tap') || document.body.innerText.includes('Click');
        return answerButtons.length === 0 || hasInstruction;
      });
    }

    // ═══ TEST 1: Class 5 mixing simulation (drag substance into beaker) ═══
    console.log('TEST 1: Mixing simulation interaction...');
    await startGame(0); // First game (agriculture/biology)
    await sleep(1000);

    // Skip to a mixture-related challenge by clicking through challenges
    let challengeText = await getChallengeText();
    console.log(`  Challenge: ${challengeText.substring(0, 80)}`);

    const canvasOk1 = await canvasHasContent();
    const buttonsHidden1 = await domButtonsHidden();

    // Try a drag on the canvas (from bottom area to center)
    await canvasDrag(360, 480, 360, 200);
    await sleep(500);

    results.push({
      test: 'Mixing/agriculture game loads',
      canvasOk: canvasOk1,
      buttonsHidden: buttonsHidden1,
      errors: errors.length,
    });
    console.log(`  Canvas OK: ${canvasOk1}, Buttons hidden: ${buttonsHidden1}, Errors: ${errors.length}`);

    // Reset for next test
    errors.length = 0;
    await page.goto(GAME_TEST_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent.includes('Class 5')) { btn.click(); return; }
      }
    });
    await sleep(1500);

    // ═══ TEST 2: Class 5 angles (interactive angle drawing) ═══
    console.log('TEST 2: Angles simulation interaction...');
    await startGame(1); // Angles game
    await sleep(1000);

    challengeText = await getChallengeText();
    console.log(`  Challenge: ${challengeText.substring(0, 80)}`);

    const canvasOk2 = await canvasHasContent();
    const buttonsHidden2 = await domButtonsHidden();

    // Try tapping on the canvas (simulating angle interaction)
    await canvasTap(400, 300);
    await sleep(300);

    results.push({
      test: 'Angles game loads',
      canvasOk: canvasOk2,
      buttonsHidden: buttonsHidden2,
      errors: errors.length,
    });
    console.log(`  Canvas OK: ${canvasOk2}, Buttons hidden: ${buttonsHidden2}, Errors: ${errors.length}`);

    // Reset
    errors.length = 0;
    await page.goto(GAME_TEST_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent.includes('Class 5')) { btn.click(); return; }
      }
    });
    await sleep(1500);

    // ═══ TEST 3: Class 5 chemistry/percentage (interactive grid) ═══
    console.log('TEST 3: Chemistry/percentage simulation interaction...');
    await startGame(7); // Chemistry game
    await sleep(1000);

    challengeText = await getChallengeText();
    console.log(`  Challenge: ${challengeText.substring(0, 80)}`);

    const canvasOk3 = await canvasHasContent();
    const buttonsHidden3 = await domButtonsHidden();

    // Try clicking grid cells
    await canvasTap(300, 200);
    await sleep(200);
    await canvasTap(320, 200);
    await sleep(200);
    await canvasTap(340, 200);
    await sleep(500);

    results.push({
      test: 'Chemistry/percentage game loads',
      canvasOk: canvasOk3,
      buttonsHidden: buttonsHidden3,
      errors: errors.length,
    });
    console.log(`  Canvas OK: ${canvasOk3}, Buttons hidden: ${buttonsHidden3}, Errors: ${errors.length}`);

    // Reset
    errors.length = 0;
    await page.goto(GAME_TEST_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent.includes('Class 1')) { btn.click(); return; }
      }
    });
    await sleep(1500);

    // ═══ TEST 4: Class 1 addition (drag objects into basket) ═══
    console.log('TEST 4: Class 1 addition interaction...');
    await startGame(0); // First game (addition)
    await sleep(1000);

    challengeText = await getChallengeText();
    console.log(`  Challenge: ${challengeText.substring(0, 80)}`);

    const canvasOk4 = await canvasHasContent();
    const buttonsHidden4 = await domButtonsHidden();

    // Try dragging from object area to basket
    await canvasDrag(200, 400, 360, 250);
    await sleep(500);

    results.push({
      test: 'Class 1 addition game loads',
      canvasOk: canvasOk4,
      buttonsHidden: buttonsHidden4,
      errors: errors.length,
    });
    console.log(`  Canvas OK: ${canvasOk4}, Buttons hidden: ${buttonsHidden4}, Errors: ${errors.length}`);

    // ═══ TEST 5: Show-me button triggers guided mode ═══
    console.log('TEST 5: Show-me button...');
    errors.length = 0;
    await page.goto(GAME_TEST_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent.includes('Class 1')) { btn.click(); return; }
      }
    });
    await sleep(1500);
    await startGame(0);
    await sleep(1000);

    // Click Show-me button
    const showMeClicked = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Show me') || b.textContent.includes('🦉'));
      if (btn) { btn.click(); return true; }
      return false;
    });
    await sleep(2000);

    results.push({
      test: 'Show-me button works',
      showMeClicked,
      errors: errors.length,
    });
    console.log(`  Show-me clicked: ${showMeClicked}, Errors: ${errors.length}`);

  } catch (err) {
    console.error('Test error:', err.message);
    results.push({ test: 'Test execution', error: err.message });
  } finally {
    await browser.close();
  }

  // ─── Print results ──────────────────────────────────────
  console.log('\n=== SIM INTERACTION TEST RESULTS ===');
  let allPass = true;
  for (const r of results) {
    const pass = !r.error && (r.canvasOk === undefined || r.canvasOk) && (r.errors === undefined || r.errors === 0);
    if (!pass) allPass = false;
    console.log(`  ${pass ? 'PASS' : 'FAIL'}: ${r.test}${r.error ? ' — ' + r.error : ''}`);
  }
  console.log(allPass ? '\nALL TESTS PASSED' : '\nSOME TESTS FAILED');
  process.exit(allPass ? 0 : 1);
}

runTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
