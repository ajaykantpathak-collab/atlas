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

    // Answer all 5 questions by trying each option
    for (let q = 1; q <= 5; q++) {
      console.log(`\n--- Question ${q} ---`);
      
      // Get the question text
      const qText = await page.evaluate(() => {
        const text = document.body.textContent;
        const match = text.match(/Question \d+ of \d+\s*\w*\s*(.+?)(?=A\.)/s);
        return match ? match[1].trim().substring(0, 100) : 'unknown';
      });
      console.log(`Question: ${qText}`);

      // Try each option A, B, C, D until one is correct
      let answered = false;
      for (const letter of ['A', 'B', 'C', 'D']) {
        if (answered) break;
        
        // Check if this button exists and is not disabled
        const exists = await page.evaluate((l) => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith(l + '.'));
          return btn && !btn.disabled;
        }, letter);
        
        if (!exists) continue;

        // Click the option
        await page.evaluate((l) => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith(l + '.'));
          if (btn) btn.click();
        }, letter);

        await new Promise(r => setTimeout(r, 800));

        // Check if it was correct
        const result = await page.evaluate(() => ({
          hasCorrect: document.body.textContent.includes('Correct!'),
          hasMisconception: document.body.textContent.includes('Common Misconception'),
        }));

        if (result.hasCorrect) {
          console.log(`  Option ${letter}: CORRECT!`);
          answered = true;
          // Wait for advancement (2s timeout in code)
          await new Promise(r => setTimeout(r, 2500));
        } else if (result.hasMisconception) {
          console.log(`  Option ${letter}: Wrong (misconception shown)`);
          // Click Try Again
          await page.evaluate(() => {
            const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Try Again'));
            if (btn) btn.click();
          });
          await new Promise(r => setTimeout(r, 500));
        } else {
          console.log(`  Option ${letter}: No feedback (unexpected)`);
        }
      }

      // Check if we moved to the next question or phase
      const currentState = await page.evaluate(() => ({
        questionNum: document.body.textContent.match(/Question (\d+) of/)?.[1],
        phase: document.body.textContent.includes('What You Just Learned') ? 'explain' : 'test',
      }));
      console.log(`  Current: Q${currentState.questionNum}, phase=${currentState.phase}`);

      if (currentState.phase === 'explain') {
        console.log('  Reached Explain phase!');
        break;
      }
    }

    // Check final state
    const finalState = await page.evaluate(() => ({
      phase: document.body.textContent.includes('What You Just Learned') ? 'explain' :
             document.body.textContent.includes('Apply It') ? 'transfer' :
             document.body.textContent.includes('Topic Complete') ? 'complete' : 'test',
      score: document.body.textContent.match(/Score:\s*(\d+)/)?.[1],
      correctCount: document.body.textContent.match(/✅\s*(\d+)/)?.[1],
      errorCount: document.body.textContent.match(/❌\s*(\d+)/)?.[1],
    }));
    console.log('\n=== Final State ===');
    console.log('Phase:', finalState.phase);
    console.log('Score:', finalState.score);
    console.log('Correct:', finalState.correctCount);
    console.log('Errors:', finalState.errorCount);

    if (finalState.phase === 'explain') {
      console.log('\nPASS: Reached Explain phase after answering all questions!');
    } else {
      console.log('\nFAIL: Did not reach Explain phase');
    }

  } catch(e) {
    console.log('Error:', e.message);
  }

  await browser.close();
})();
