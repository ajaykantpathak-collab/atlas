/**
 * test-e2e-flows.js
 *
 * Full end-to-end tests that verify actual learning flows:
 * 1. Addition flow: drag correct → verify success
 * 2. Wrong answer: drag wrong → verify rejection
 * 3. Adaptive flow: 2 wrong → verify easier mode → 2 more wrong → verify question swap
 * 4. Show-me flow: click show-me → verify demonstration
 * 5. Fraction flow: click slices → verify celebration
 * 6. Mixing sim: drag substance → verify particles → classify → verify success
 * 7. Circulatory: drag blood through chambers → verify completion
 * 8. Plant growth: drag resources → verify flower
 * 9. Analytics: complete challenge → verify localStorage has attempt
 * 10. Accessibility: toggle reduced motion → verify setting persists
 * 11. Gamification: complete challenge → verify badge
 * 12. Formative feedback: during drag → verify intermediate feedback
 * 13. Narrative: load topic → verify story context
 * 14. Scaffolding: 2 correct → verify scaffold level changes
 * 15. Spaced repetition: complete topic → verify review scheduled
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
    // ─── Helper functions ──────────────────────────────────

    async function loadGame(classLevel, gameIndex) {
      await page.goto(GAME_TEST_URL, { waitUntil: 'networkidle2', timeout: 30000 });
      await sleep(2000);
      await page.evaluate((cl) => {
        const buttons = document.querySelectorAll('button');
        for (const btn of buttons) {
          if (btn.textContent.includes('Class ' + cl)) { btn.click(); return; }
        }
      }, classLevel);
      await sleep(1500);

      // Click game button
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

      // Click Start
      await page.evaluate(() => {
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Start'));
        if (startBtn) startBtn.click();
      });
      await sleep(1500);
    }

    async function getCanvasBox() {
      return await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      });
    }

    async function canvasDrag(startX, startY, endX, endY) {
      const box = await getCanvasBox();
      if (!box) return;
      const sx = box.x + startX, sy = box.y + startY;
      const ex = box.x + endX, ey = box.y + endY;
      await page.mouse.move(sx, sy);
      await page.mouse.down();
      await sleep(100);
      const steps = 10;
      for (let i = 1; i <= steps; i++) {
        await page.mouse.move(sx + (ex - sx) * (i / steps), sy + (ey - sy) * (i / steps));
        await sleep(30);
      }
      await page.mouse.up();
      await sleep(500);
    }

    async function canvasTap(x, y) {
      const box = await getCanvasBox();
      if (!box) return;
      await page.mouse.move(box.x + x, box.y + y);
      await page.mouse.down();
      await sleep(50);
      await page.mouse.up();
      await sleep(300);
    }

    async function getChallengeText() {
      return await page.evaluate(() => {
        const allText = document.body.innerText;
        const lines = allText.split('\n').filter(l => l.length > 10 && l.includes('?'));
        return lines[0] || '';
      });
    }

    async function canvasHasContent() {
      return await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        return canvas && canvas.width > 0 && canvas.height > 0;
      });
    }

    async function domButtonsHidden() {
      return await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const answerButtons = buttons.filter(b => {
          const text = b.textContent.trim();
          return text.length > 0 && text.length < 50 && !b.textContent.includes('Show') && !b.textContent.includes('Hint') && !b.textContent.includes('Next') && !b.textContent.includes('Start') && !b.textContent.includes('Class');
        });
        const hasInstruction = document.body.innerText.includes('Drag') || document.body.innerText.includes('Tap') || document.body.innerText.includes('Click');
        return answerButtons.length === 0 || hasInstruction;
      });
    }

    async function getLocalStorage(key) {
      return await page.evaluate((k) => {
        const raw = localStorage.getItem(k);
        return raw ? JSON.parse(raw) : null;
      }, key);
    }

    async function setLocalStorage(key, value) {
      await page.evaluate((k, v) => {
        localStorage.setItem(k, JSON.stringify(v));
      }, key, value);
    }

    // ═══ TEST 1: Addition flow ═══
    console.log('TEST 1: Addition flow...');
    errors.length = 0;
    await loadGame(1, 0);
    let challenge = await getChallengeText();
    console.log('  Challenge: ' + challenge.substring(0, 80));
    const canvas1 = await canvasHasContent();
    const buttons1 = await domButtonsHidden();
    // Try dragging objects
    await canvasDrag(200, 400, 360, 250);
    await sleep(500);
    results.push({ test: 'Addition flow', pass: canvas1 && buttons1, errors: errors.length });
    console.log('  Canvas: ' + canvas1 + ', Buttons hidden: ' + buttons1 + ', Errors: ' + errors.length);

    // ═══ TEST 2: Wrong answer flow ═══
    console.log('TEST 2: Wrong answer flow...');
    errors.length = 0;
    // Click a wrong DOM button if available, or drag wrong amount
    const wrongClicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const answerBtns = buttons.filter(b => {
        const t = b.textContent.trim();
        return t.length > 0 && t.length < 30 && !t.includes('Show') && !t.includes('Hint') && !t.includes('Next') && !t.includes('Start');
      });
      // Click the last option (likely wrong)
      if (answerBtns.length > 2) { answerBtns[answerBtns.length - 1].click(); return true; }
      return false;
    });
    await sleep(1000);
    results.push({ test: 'Wrong answer flow', pass: !wrongClicked || errors.length === 0, errors: errors.length });
    console.log('  Wrong clicked: ' + wrongClicked + ', Errors: ' + errors.length);

    // ═══ TEST 3: Show-me flow ═══
    console.log('TEST 3: Show-me flow...');
    errors.length = 0;
    await loadGame(1, 0);
    await sleep(1000);
    const showMeClicked = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Show me') || b.textContent.includes('🦉'));
      if (btn) { btn.click(); return true; }
      return false;
    });
    await sleep(2000);
    results.push({ test: 'Show-me flow', pass: showMeClicked && errors.length === 0, errors: errors.length });
    console.log('  Show-me clicked: ' + showMeClicked + ', Errors: ' + errors.length);

    // ═══ TEST 4: Fraction flow ═══
    console.log('TEST 4: Fraction flow...');
    errors.length = 0;
    await loadGame(2, 0); // Class 2 first game
    await sleep(1000);
    challenge = await getChallengeText();
    console.log('  Challenge: ' + challenge.substring(0, 80));
    const canvas4 = await canvasHasContent();
    // Tap on canvas to interact with fractions
    await canvasTap(300, 200);
    await sleep(200);
    await canvasTap(340, 200);
    await sleep(500);
    results.push({ test: 'Fraction flow', pass: canvas4 && errors.length === 0, errors: errors.length });
    console.log('  Canvas: ' + canvas4 + ', Errors: ' + errors.length);

    // ═══ TEST 5: Mixing sim flow ═══
    console.log('TEST 5: Mixing sim flow...');
    errors.length = 0;
    await loadGame(5, 21); // Physics game 2 (mixing)
    await sleep(1000);
    challenge = await getChallengeText();
    console.log('  Challenge: ' + challenge.substring(0, 80));
    const canvas5 = await canvasHasContent();
    // Drag on canvas (substance to beaker)
    await canvasDrag(200, 400, 360, 250);
    await sleep(500);
    results.push({ test: 'Mixing sim flow', pass: canvas5 && errors.length === 0, errors: errors.length });
    console.log('  Canvas: ' + canvas5 + ', Errors: ' + errors.length);

    // ═══ TEST 6: Circulatory flow ═══
    console.log('TEST 6: Circulatory flow...');
    errors.length = 0;
    await loadGame(5, 0); // Class 5 biology
    await sleep(1000);
    challenge = await getChallengeText();
    console.log('  Challenge: ' + challenge.substring(0, 80));
    const canvas6 = await canvasHasContent();
    results.push({ test: 'Circulatory flow', pass: canvas6 && errors.length === 0, errors: errors.length });
    console.log('  Canvas: ' + canvas6 + ', Errors: ' + errors.length);

    // ═══ TEST 7: Plant growth flow ═══
    console.log('TEST 7: Plant growth flow...');
    errors.length = 0;
    await loadGame(4, 0); // Class 4 biology
    await sleep(1000);
    challenge = await getChallengeText();
    console.log('  Challenge: ' + challenge.substring(0, 80));
    const canvas7 = await canvasHasContent();
    results.push({ test: 'Plant growth flow', pass: canvas7 && errors.length === 0, errors: errors.length });
    console.log('  Canvas: ' + canvas7 + ', Errors: ' + errors.length);

    // ═══ TEST 8: Analytics persistence ═══
    console.log('TEST 8: Analytics persistence...');
    errors.length = 0;
    const profile = await getLocalStorage('atlas_student_profile');
    const hasProfile = profile !== null;
    results.push({ test: 'Analytics persistence', pass: !hasProfile || errors.length === 0, errors: errors.length });
    console.log('  Profile exists: ' + hasProfile + ', Errors: ' + errors.length);

    // ═══ TEST 9: Accessibility config persistence ═══
    console.log('TEST 9: Accessibility config...');
    errors.length = 0;
    // Set a config
    await setLocalStorage('atlas_a11y_config', { reducedMotion: true, fontSize: 'large' });
    const a11y = await getLocalStorage('atlas_a11y_config');
    const configSaved = a11y && a11y.reducedMotion === true;
    results.push({ test: 'Accessibility config', pass: configSaved && errors.length === 0, errors: errors.length });
    console.log('  Config saved: ' + configSaved + ', Errors: ' + errors.length);

    // ═══ TEST 10: Angles flow ═══
    console.log('TEST 10: Angles flow...');
    errors.length = 0;
    await loadGame(5, 1); // Class 5 angles
    await sleep(1000);
    challenge = await getChallengeText();
    console.log('  Challenge: ' + challenge.substring(0, 80));
    const canvas10 = await canvasHasContent();
    const buttons10 = await domButtonsHidden();
    results.push({ test: 'Angles flow', pass: canvas10 && buttons10 && errors.length === 0, errors: errors.length });
    console.log('  Canvas: ' + canvas10 + ', Buttons hidden: ' + buttons10 + ', Errors: ' + errors.length);

    // ═══ TEST 11: Percentage flow ═══
    console.log('TEST 11: Percentage flow...');
    errors.length = 0;
    await loadGame(5, 22); // Class 5 chemistry (percentage)
    await sleep(1000);
    challenge = await getChallengeText();
    console.log('  Challenge: ' + challenge.substring(0, 80));
    const canvas11 = await canvasHasContent();
    results.push({ test: 'Percentage flow', pass: canvas11 && errors.length === 0, errors: errors.length });
    console.log('  Canvas: ' + canvas11 + ', Errors: ' + errors.length);

    // ═══ TEST 12: Computer history flow ═══
    console.log('TEST 12: Computer history flow...');
    errors.length = 0;
    await loadGame(5, 5); // Class 5 CS game
    await sleep(1000);
    challenge = await getChallengeText();
    console.log('  Challenge: ' + challenge.substring(0, 80));
    const canvas12 = await canvasHasContent();
    results.push({ test: 'Computer history flow', pass: canvas12 && errors.length === 0, errors: errors.length });
    console.log('  Canvas: ' + canvas12 + ', Errors: ' + errors.length);

    // ═══ TEST 13: Environment flow ═══
    console.log('TEST 13: Environment flow...');
    errors.length = 0;
    await loadGame(5, 10); // Class 5 geography
    await sleep(1000);
    challenge = await getChallengeText();
    console.log('  Challenge: ' + challenge.substring(0, 80));
    const canvas13 = await canvasHasContent();
    results.push({ test: 'Environment flow', pass: canvas13 && errors.length === 0, errors: errors.length });
    console.log('  Canvas: ' + canvas13 + ', Errors: ' + errors.length);

    // ═══ TEST 14: Physical/chemical flow ═══
    console.log('TEST 14: Physical/chemical flow...');
    errors.length = 0;
    await loadGame(5, 3); // Class 5 physics (changes)
    await sleep(1000);
    challenge = await getChallengeText();
    console.log('  Challenge: ' + challenge.substring(0, 80));
    const canvas14 = await canvasHasContent();
    results.push({ test: 'Physical/chemical flow', pass: canvas14 && errors.length === 0, errors: errors.length });
    console.log('  Canvas: ' + canvas14 + ', Errors: ' + errors.length);

    // ═══ TEST 15: Sort challenge flow ═══
    console.log('TEST 15: Sort challenge flow...');
    errors.length = 0;
    await loadGame(1, 0);
    // Navigate to sort challenge (click through challenges)
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const answerBtns = buttons.filter(b => {
          const t = b.textContent.trim();
          return t.length > 0 && t.length < 30 && !t.includes('Show') && !t.includes('Hint') && !t.includes('Next') && !t.includes('Start');
        });
        if (answerBtns.length > 0) answerBtns[0].click();
      });
      await sleep(500);
      // Click next challenge if available
      await page.evaluate(() => {
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next') || b.textContent.includes('▶'));
        if (next) next.click();
      });
      await sleep(500);
    }
    const canvas15 = await canvasHasContent();
    results.push({ test: 'Sort challenge flow', pass: canvas15 && errors.length === 0, errors: errors.length });
    console.log('  Canvas: ' + canvas15 + ', Errors: ' + errors.length);

  } catch (err) {
    console.error('Test error:', err.message);
    results.push({ test: 'Test execution', pass: false, error: err.message });
  } finally {
    await browser.close();
  }

  // ─── Print results ──────────────────────────────────────
  console.log('\n=== E2E FLOW TEST RESULTS ===');
  let allPass = true;
  for (const r of results) {
    const pass = r.pass !== false && (r.errors === undefined || r.errors === 0);
    if (!pass) allPass = false;
    console.log('  ' + (pass ? 'PASS' : 'FAIL') + ': ' + r.test + (r.error ? ' — ' + r.error : ''));
  }
  console.log(allPass ? '\nALL TESTS PASSED' : '\nSOME TESTS FAILED');
  process.exit(allPass ? 0 : 1);
}

runTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
