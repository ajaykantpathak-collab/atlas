const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  try {
    await page.goto('http://localhost:3000/learn-c68', { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2000));

    // Navigate to test phase
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Class 6'))?.click(); });
    await new Promise(r => setTimeout(r, 1000));
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Physics'))?.click(); });
    await new Promise(r => setTimeout(r, 1000));
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Motion'))?.click(); });
    await new Promise(r => setTimeout(r, 2000));
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Show Me What to Try'))?.click(); });
    await new Promise(r => setTimeout(r, 1000));
    for (let i = 0; i < 4; i++) {
      await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next Step'))?.click(); });
      await new Promise(r => setTimeout(r, 500));
    }
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('I Understand'))?.click(); });
    await new Promise(r => setTimeout(r, 1500));

    // First, click a WRONG answer to see misconception feedback
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('A.'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    const wrongFeedback = await page.evaluate(() => ({
      hasMisconception: document.body.textContent.includes('Common Misconception'),
      hasTryAgain: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Try Again')),
      score: document.body.textContent.match(/Score:\s*(\d+)/)?.[1],
    }));
    console.log('After wrong answer:');
    console.log('  Misconception shown:', wrongFeedback.hasMisconception);
    console.log('  Try Again button:', wrongFeedback.hasTryAgain);
    console.log('  Score:', wrongFeedback.score);

    // Click Try Again
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Try Again'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Now click the CORRECT answer (D in this case)
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('D.'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    const correctFeedback = await page.evaluate(() => ({
      hasCorrect: document.body.textContent.includes('Correct!'),
      hasQuestion2: document.body.textContent.includes('Question 2'),
      correctCount: document.body.textContent.match(/✅\s*(\d+)/)?.[1],
    }));
    console.log('\nAfter correct answer:');
    console.log('  Correct shown:', correctFeedback.hasCorrect);
    console.log('  Moved to Q2:', correctFeedback.hasQuestion2);
    console.log('  Correct count:', correctFeedback.correctCount);

    // Wait for the 2s timeout to advance
    await new Promise(r => setTimeout(r, 2000));

    const afterAdvance = await page.evaluate(() => ({
      hasQuestion2: document.body.textContent.includes('Question 2'),
      questionText: document.body.textContent.match(/Question 2 of \d+[\s\S]{0,200}/)?.[0]?.substring(0, 100),
    }));
    console.log('\nAfter waiting 2s:');
    console.log('  On Q2:', afterAdvance.hasQuestion2);
    console.log('  Q2 text:', afterAdvance.questionText);

    await page.screenshot({ path: 'screenshots/test-correct-answer.png' });

    // Test: answer all 5 questions correctly to reach Explain phase
    console.log('\n--- Answering all remaining questions ---');
    for (let q = 2; q <= 5; q++) {
      // Find the correct option (the one that matches the answer text)
      const clicked = await page.evaluate(() => {
        // The correct answer should be the one that contains "change in the position" and "time"
        const buttons = Array.from(document.querySelectorAll('button'));
        // Try to find the correct one by looking for the one with green highlight (after feedback)
        // Or just click D (usually correct after shuffle)
        // Actually, let's click each option and see which one gives "Correct"
        // Better: look at the options and find the one that makes sense
        const options = buttons.filter(b => b.textContent.match(/^[A-D]\./));
        // For now, just click the last option (D) which is often correct
        if (options.length > 0) {
          options[options.length - 1].click();
          return options.length;
        }
        return 0;
      });
      await new Promise(r => setTimeout(r, 2500));
      
      const status = await page.evaluate(() => ({
        hasCorrect: document.body.textContent.includes('Correct!'),
        hasMisconception: document.body.textContent.includes('Misconception'),
        questionNum: document.body.textContent.match(/Question (\d+) of/)?.[1],
        phase: document.body.textContent.includes('What You Just Learned') ? 'explain' : 'test',
      }));
      console.log(`  Q${q}: correct=${status.hasCorrect} misconception=${status.hasMisconception} phase=${status.phase}`);
      
      if (status.phase === 'explain') {
        console.log('  Reached Explain phase!');
        break;
      }
    }

    await page.screenshot({ path: 'screenshots/test-explain-phase.png' });

    const explainPhase = await page.evaluate(() => ({
      hasExplain: document.body.textContent.includes('What You Just Learned'),
      hasDefinition: document.body.textContent.includes('Definition:'),
      hasMastery: document.body.textContent.includes('Mastery Criteria:'),
      hasTransferButton: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Transfer')),
    }));
    console.log('\nExplain phase:');
    console.log('  Has Explain:', explainPhase.hasExplain);
    console.log('  Has Definition:', explainPhase.hasDefinition);
    console.log('  Has Mastery:', explainPhase.hasMastery);
    console.log('  Has Transfer button:', explainPhase.hasTransferButton);

  } catch(e) {
    console.log('Error:', e.message);
  }

  await browser.close();
})();
