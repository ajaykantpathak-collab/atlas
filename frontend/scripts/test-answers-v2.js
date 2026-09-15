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

    // Answer all 5 questions
    for (let q = 1; q <= 5; q++) {
      // Get the options and find the correct one
      const options = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('button'))
          .filter(b => b.textContent.match(/^[A-D]\./))
          .map(b => ({ text: b.textContent.trim(), letter: b.textContent.trim()[0] }));
      });
      console.log(`\nQ${q} options:`);
      options.forEach(o => console.log(`  ${o.text.substring(0, 80)}`));

      // The correct answer for motion questions contains "change in the position" and "time"
      // but NOT "no change" or "distance"
      const correctOption = options.find(o => 
        o.text.toLowerCase().includes('change in the position') && 
        o.text.toLowerCase().includes('time') &&
        !o.text.toLowerCase().includes('no change') &&
        !o.text.toLowerCase().includes('distance')
      ) || options.find(o => 
        o.text.toLowerCase().includes('motion') && 
        o.text.toLowerCase().includes('time') &&
        !o.text.toLowerCase().includes('no change')
      );

      if (correctOption) {
        console.log(`  -> Clicking: ${correctOption.letter}`);
        await page.evaluate((letter) => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith(letter + '.'));
          if (btn) btn.click();
        }, correctOption.letter);
      } else {
        // If we can't determine, click A
        console.log('  -> Could not determine correct answer, clicking A');
        await page.evaluate(() => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('A.'));
          if (btn) btn.click();
        });
      }

      await new Promise(r => setTimeout(r, 2500));

      const status = await page.evaluate(() => ({
        hasCorrect: document.body.textContent.includes('Correct!'),
        hasMisconception: document.body.textContent.includes('Common Misconception'),
        questionNum: document.body.textContent.match(/Question (\d+) of/)?.[1],
        phase: document.body.textContent.includes('What You Just Learned') ? 'explain' : 
               document.body.textContent.includes('Apply It') ? 'transfer' : 'test',
      }));
      console.log(`  Result: correct=${status.hasCorrect} misconception=${status.hasMisconception} phase=${status.phase}`);

      if (status.phase === 'explain' || status.phase === 'transfer') {
        console.log(`  Reached ${status.phase} phase!`);
        break;
      }

      // If misconception was shown, click Try Again and then try another option
      if (status.hasMisconception) {
        await page.evaluate(() => {
          const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Try Again'));
          if (btn) btn.click();
        });
        await new Promise(r => setTimeout(r, 500));
        
        // Try the next option
        const remainingOptions = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('button'))
            .filter(b => b.textContent.match(/^[A-D]\./))
            .map(b => ({ text: b.textContent.trim(), letter: b.textContent.trim()[0] }));
        });
        
        // Try each remaining option until one works
        for (const opt of remainingOptions) {
          if (opt.text.toLowerCase().includes('change in the position') && 
              opt.text.toLowerCase().includes('time') &&
              !opt.text.toLowerCase().includes('no change')) {
            console.log(`  -> Retrying with: ${opt.letter}`);
            await page.evaluate((letter) => {
              const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith(letter + '.'));
              if (btn) btn.click();
            }, opt.letter);
            await new Promise(r => setTimeout(r, 2500));
            
            const retryStatus = await page.evaluate(() => ({
              hasCorrect: document.body.textContent.includes('Correct!'),
              phase: document.body.textContent.includes('What You Just Learned') ? 'explain' : 'test',
              qNum: document.body.textContent.match(/Question (\d+) of/)?.[1],
            }));
            console.log(`  Retry result: correct=${retryStatus.hasCorrect} phase=${retryStatus.phase} qNum=${retryStatus.qNum}`);
            
            if (retryStatus.hasCorrect || retryStatus.phase === 'explain') {
              await new Promise(r => setTimeout(r, 2000));
              break;
            }
            
            if (retryStatus.hasCorrect) {
              // Wait for advancement
              await new Promise(r => setTimeout(r, 2000));
              break;
            }
          }
        }
      }
    }

    // Check final state
    await page.screenshot({ path: 'screenshots/test-final.png' });
    const finalState = await page.evaluate(() => ({
      phase: document.body.textContent.includes('What You Just Learned') ? 'explain' :
             document.body.textContent.includes('Apply It') ? 'transfer' :
             document.body.textContent.includes('Topic Complete') ? 'complete' : 'test',
      score: document.body.textContent.match(/Score:\s*(\d+)/)?.[1],
      correctCount: document.body.textContent.match(/✅\s*(\d+)/)?.[1],
    }));
    console.log('\n=== Final State ===');
    console.log('Phase:', finalState.phase);
    console.log('Score:', finalState.score);
    console.log('Correct count:', finalState.correctCount);

  } catch(e) {
    console.log('Error:', e.message);
  }

  await browser.close();
})();
