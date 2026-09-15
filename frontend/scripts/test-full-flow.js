// Comprehensive end-to-end test of the /learn-c68 flow
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  const errors = [];
  const consoleErrors = [];
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(`CONSOLE: ${msg.text().substring(0, 150)}`);
  });

  const results = [];
  const log = (msg) => { console.log(msg); results.push(msg); };

  try {
    // ─── 1. Load the page ────────────────────────────────────
    await page.goto('http://localhost:3000/learn-c68', { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2000));
    log('1. Page loaded');

    // Screenshot: class selection
    await page.screenshot({ path: 'screenshots/01-class-select.png' });

    // ─── 2. Verify class selection screen ────────────────────
    const classScreen = await page.evaluate(() => {
      const text = document.body.textContent;
      return {
        hasClass6: text.includes('Class 6'),
        hasClass7: text.includes('Class 7'),
        hasClass8: text.includes('Class 8'),
        hasAtlas: text.includes('Atlas') || text.includes('C6') || text.includes('Learn'),
      };
    });
    log(`2. Class screen: Class6=${classScreen.hasClass6} Class7=${classScreen.hasClass7} Class8=${classScreen.hasClass8}`);

    // ─── 3. Click Class 6 ────────────────────────────────────
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Class 6'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: 'screenshots/02-subject-select.png' });
    log('3. Clicked Class 6');

    // ─── 4. Verify subject selection screen ──────────────────
    const subjectScreen = await page.evaluate(() => {
      const text = document.body.textContent;
      return {
        hasPhysics: text.includes('Physics'),
        hasChemistry: text.includes('Chemistry'),
        hasBiology: text.includes('Biology'),
        hasMaths: text.includes('Maths') || text.includes('Math'),
      };
    });
    log(`4. Subjects: Physics=${subjectScreen.hasPhysics} Chemistry=${subjectScreen.hasChemistry} Biology=${subjectScreen.hasBiology} Maths=${subjectScreen.hasMaths}`);

    // ─── 5. Click Physics ────────────────────────────────────
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Physics'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: 'screenshots/03-topic-select.png' });
    log('5. Clicked Physics');

    // ─── 6. Verify topic selection screen ────────────────────
    const topicScreen = await page.evaluate(() => {
      const text = document.body.textContent;
      return {
        hasMotion: text.includes('Motion'),
        hasDemoLabel: text.includes('Demo') || text.includes('1 topic'),
      };
    });
    log(`6. Topics: Motion=${topicScreen.hasMotion} DemoLabel=${topicScreen.hasDemoLabel}`);

    // ─── 7. Click Motion topic ───────────────────────────────
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Motion'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'screenshots/04-play-phase.png' });
    log('7. Clicked Motion topic');

    // ─── 8. Verify PLAY phase ────────────────────────────────
    const playPhase = await page.evaluate(() => {
      const text = document.body.textContent;
      return {
        hasPlayLabel: text.includes('Play and Explore') || text.includes('Play'),
        hasELI5: text.includes('In simple words'),
        hasCanvas: !!document.querySelector('canvas'),
        hasSliders: document.querySelectorAll('input[type="range"]').length,
        hasRunButton: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Run')),
        hasResetButton: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Reset')),
      };
    });
    log(`8. Play phase: PlayLabel=${playPhase.hasPlayLabel} ELI5=${playPhase.hasELI5} Canvas=${playPhase.hasCanvas} Sliders=${playPhase.hasSliders} Run=${playPhase.hasRunButton} Reset=${playPhase.hasResetButton}`);

    // ─── 9. Press Run and verify cart moves ──────────────────
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Run'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: 'screenshots/05-cart-running.png' });

    const runningData = await page.evaluate(() => {
      const divs = Array.from(document.querySelectorAll('div'));
      const speedDiv = divs.find(d => d.children.length === 2 && d.textContent.includes('m/s') && !d.textContent.includes('Distance'));
      const distDiv = divs.find(d => d.children.length === 2 && d.textContent.includes('m') && !d.textContent.includes('m/s') && !d.textContent.includes('Time'));
      return {
        speed: speedDiv ? speedDiv.textContent.replace(/[^\d.]/g, '') : 'not found',
        distance: distDiv ? distDiv.textContent.replace(/[^\d.]/g, '') : 'not found',
      };
    });
    log(`9. After 3s running: Speed=${runningData.speed} m/s, Distance=${runningData.distance} m`);

    const speedNum = parseFloat(runningData.speed);
    if (speedNum > 0.1) {
      log('   PASS: Cart is moving!');
    } else {
      log('   FAIL: Cart is not moving');
    }

    // ─── 10. Press Pause ─────────────────────────────────────
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Pause'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 500));
    log('10. Clicked Pause');

    // ─── 11. Press Reset ─────────────────────────────────────
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Reset'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'screenshots/06-after-reset.png' });

    const resetData = await page.evaluate(() => {
      const divs = Array.from(document.querySelectorAll('div'));
      const speedDiv = divs.find(d => d.children.length === 2 && d.textContent.includes('m/s') && !d.textContent.includes('Distance'));
      return speedDiv ? speedDiv.textContent.replace(/[^\d.]/g, '') : 'not found';
    });
    log(`11. After reset: Speed=${resetData} (should be 0.00)`);

    // ─── 12. Click "Show Me What to Try" → Discover phase ────
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Show Me What to Try'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: 'screenshots/07-discover-phase.png' });

    const discoverPhase = await page.evaluate(() => {
      const text = document.body.textContent;
      return {
        hasDiscover: text.includes('Guided Discovery') || text.includes('discover'),
        hasStep1: text.includes('Step 1') || text.includes('step 1'),
        hasHint: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Hint')),
        hasNextStep: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Next Step')),
      };
    });
    log(`12. Discover phase: Discover=${discoverPhase.hasDiscover} Step1=${discoverPhase.hasStep1} Hint=${discoverPhase.hasHint} NextStep=${discoverPhase.hasNextStep}`);

    // ─── 13. Click through all discovery steps ───────────────
    for (let step = 1; step <= 4; step++) {
      await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next Step'));
        if (btn) btn.click();
      });
      await new Promise(r => setTimeout(r, 500));
    }
    await page.screenshot({ path: 'screenshots/08-discover-last-step.png' });

    const lastStep = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('I Understand'));
    });
    log(`13. After 4 Next Steps: hasTestMeButton=${lastStep}`);

    // ─── 14. Click "I Understand — Test Me" → Test phase ─────
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('I Understand'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: 'screenshots/09-test-phase.png' });

    const testPhase = await page.evaluate(() => {
      const text = document.body.textContent;
      return {
        hasQuestion: text.includes('Question 1'),
        hasOptions: document.querySelectorAll('button').length > 3, // multiple choice buttons
        hasBloomLevel: text.includes('recall') || text.includes('reasoning') || text.includes('evaluate'),
      };
    });
    log(`14. Test phase: Question1=${testPhase.hasQuestion} HasOptions=${testPhase.hasOptions} BloomLevel=${testPhase.hasBloomLevel}`);

    // ─── 15. Click a multiple choice answer ──────────────────
    const answerResult = await page.evaluate(() => {
      // Click the first option button (A, B, C, or D)
      const btn = Array.from(document.querySelectorAll('button')).find(b => 
        b.textContent.trim().startsWith('A.') || b.textContent.trim().startsWith('B.')
      );
      if (btn) {
        btn.click();
        return 'clicked';
      }
      return 'no button found';
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'screenshots/10-after-answer.png' });
    log(`15. Answer click: ${answerResult}`);

    const feedbackShown = await page.evaluate(() => {
      const text = document.body.textContent;
      return {
        hasCorrect: text.includes('Correct'),
        hasMisconception: text.includes('Misconception'),
        hasFeedback: text.includes('Correct') || text.includes('Misconception'),
      };
    });
    log(`   Feedback: Correct=${feedbackShown.hasCorrect} Misconception=${feedbackShown.hasMisconception}`);

    // ─── 16. Check for the phase indicator ───────────────────
    const phaseIndicator = await page.evaluate(() => {
      const text = document.body.textContent;
      return {
        hasPlay: text.includes('Play'),
        hasDiscover: text.includes('Discover'),
        hasTest: text.includes('Test'),
        hasExplain: text.includes('Explain'),
        hasTransfer: text.includes('Transfer'),
        hasComplete: text.includes('Complete'),
      };
    });
    log(`16. Phase indicators: Play=${phaseIndicator.hasPlay} Discover=${phaseIndicator.hasDiscover} Test=${phaseIndicator.hasTest} Explain=${phaseIndicator.hasExplain} Transfer=${phaseIndicator.hasTransfer} Complete=${phaseIndicator.hasComplete}`);

    // ─── Summary ─────────────────────────────────────────────
    log('\n=== SUMMARY ===');
    log(`Page errors: ${errors.length}`);
    log(`Console errors: ${consoleErrors.length}`);
    if (errors.length > 0) errors.forEach(e => log(`  ${e}`));
    if (consoleErrors.length > 0) consoleErrors.forEach(e => log(`  ${e}`));

    const allPassed = classScreen.hasClass6 && 
      subjectScreen.hasPhysics && 
      topicScreen.hasMotion && 
      playPhase.hasCanvas && 
      playPhase.hasSliders === 3 && 
      speedNum > 0.1 &&
      discoverPhase.hasDiscover &&
      testPhase.hasQuestion &&
      errors.length === 0;
    
    log(`\nOVERALL: ${allPassed ? 'ALL CHECKS PASSED' : 'SOME CHECKS FAILED'}`);

  } catch(e) {
    log(`FATAL ERROR: ${e.message.substring(0, 300)}`);
  }

  await browser.close();
})();
