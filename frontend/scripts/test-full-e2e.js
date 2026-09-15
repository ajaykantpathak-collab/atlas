const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  const errors = [];
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));

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

    for (let q = 1; q <= 5; q++) {
      console.log(`\n--- Question ${q} ---`);

      // Check if this is a multiple choice or free-text question
      const qInfo = await page.evaluate(() => {
        const mcButtons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.match(/^[A-D]\./));
        const textarea = document.querySelector('textarea');
        const bloomLevel = document.body.textContent.match(/(recall|reasoning|evaluate|apply|create)/)?.[1];
        return {
          isMultipleChoice: mcButtons.length > 0,
          isFreeText: !!textarea,
          bloomLevel,
          mcButtonCount: mcButtons.length,
        };
      });
      console.log(`  Type: ${qInfo.isMultipleChoice ? 'multiple choice' : 'free text'} (bloom: ${qInfo.bloomLevel})`);

      if (qInfo.isMultipleChoice) {
        // Try each option until correct
        for (const letter of ['A', 'B', 'C', 'D']) {
          const exists = await page.evaluate((l) => {
            const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith(l + '.'));
            return btn && !btn.disabled;
          }, letter);
          if (!exists) continue;

          await page.evaluate((l) => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith(l + '.'))?.click();
          }, letter);
          await new Promise(r => setTimeout(r, 800));

          const result = await page.evaluate(() => ({
            hasCorrect: document.body.textContent.includes('Correct!'),
            hasMisconception: document.body.textContent.includes('Common Misconception'),
          }));

          if (result.hasCorrect) {
            console.log(`  Option ${letter}: CORRECT!`);
            await new Promise(r => setTimeout(r, 2500));
            break;
          } else if (result.hasMisconception) {
            console.log(`  Option ${letter}: Wrong`);
            await page.evaluate(() => {
              Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Try Again'))?.click();
            });
            await new Promise(r => setTimeout(r, 500));
          }
        }
      } else if (qInfo.isFreeText) {
        // Free-text question: type an answer and submit
        // Use a reasonable answer based on the question
        const answer = 'Motion is the change in position with respect to time. A reference point is needed to determine if an object is at rest or in motion. The same object can be at rest relative to one reference point and in motion relative to another.';
        
        await page.evaluate((ans) => {
          const ta = document.querySelector('textarea');
          if (ta) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
            nativeInputValueSetter.call(ta, ans);
            ta.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }, answer);
        await new Promise(r => setTimeout(r, 300));

        // Click Submit Answer
        await page.evaluate(() => {
          Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Submit Answer'))?.click();
        });
        await new Promise(r => setTimeout(r, 2000));

        const result = await page.evaluate(() => ({
          hasCorrect: document.body.textContent.includes('Correct!'),
          hasMisconception: document.body.textContent.includes('Common Misconception'),
        }));
        console.log(`  Free-text answer: correct=${result.hasCorrect} misconception=${result.hasMisconception}`);

        if (result.hasCorrect) {
          await new Promise(r => setTimeout(r, 2500));
        } else if (result.hasMisconception) {
          // Click Try Again and try a different answer
          await page.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Try Again'))?.click();
          });
          await new Promise(r => setTimeout(r, 500));
          
          // Try a longer, more detailed answer
          const betterAnswer = 'The statement is incorrect because rest and motion are relative, not absolute. The building is at rest relative to the ground, but the Earth spins and revolves around the Sun, so the building is in motion relative to the Sun. An object can be at rest relative to one reference point and in motion relative to another at the same time.';
          await page.evaluate((ans) => {
            const ta = document.querySelector('textarea');
            if (ta) {
              const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
              setter.call(ta, ans);
              ta.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }, betterAnswer);
          await new Promise(r => setTimeout(r, 300));
          await page.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Submit Answer'))?.click();
          });
          await new Promise(r => setTimeout(r, 2000));
          console.log('  Retried with longer answer');
        }
      }

      // Check current state
      const state = await page.evaluate(() => ({
        questionNum: document.body.textContent.match(/Question (\d+) of/)?.[1],
        phase: document.body.textContent.includes('What You Just Learned') ? 'explain' : 'test',
      }));
      console.log(`  State: Q${state.questionNum}, phase=${state.phase}`);

      if (state.phase === 'explain') {
        console.log('  Reached Explain phase!');
        break;
      }
    }

    // Final state
    const finalState = await page.evaluate(() => ({
      phase: document.body.textContent.includes('What You Just Learned') ? 'explain' :
             document.body.textContent.includes('Apply It') ? 'transfer' :
             document.body.textContent.includes('Topic Complete') ? 'complete' : 'test',
      score: document.body.textContent.match(/Score:\s*(\d+)/)?.[1],
      correct: document.body.textContent.match(/✅\s*(\d+)/)?.[1],
      errors: document.body.textContent.match(/❌\s*(\d+)/)?.[1],
    }));
    console.log('\n=== FINAL ===');
    console.log('Phase:', finalState.phase);
    console.log('Score:', finalState.score, 'Correct:', finalState.correct, 'Errors:', finalState.errors);
    console.log('Page errors:', errors.length);
    
    if (errors.length === 0 && finalState.phase === 'explain') {
      console.log('\nALL TESTS PASSED');
    } else {
      console.log('\nISSUES FOUND');
    }

  } catch(e) {
    console.log('Error:', e.message);
  }

  await browser.close();
})();
