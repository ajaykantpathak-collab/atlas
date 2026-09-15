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

    // ─── Q1: Multiple choice — try each option ───────────────
    console.log('--- Q1 (multiple choice, recall) ---');
    for (const letter of ['A', 'B', 'C', 'D']) {
      const exists = await page.evaluate((l) => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith(l + '.'));
        return btn && !btn.disabled;
      }, letter);
      if (!exists) continue;
      await page.evaluate((l) => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith(l + '.'))?.click(); }, letter);
      await new Promise(r => setTimeout(r, 1000));
      const correct = await page.evaluate(() => document.body.textContent.includes('Correct!'));
      if (correct) { console.log(`  ${letter}: CORRECT`); await new Promise(r => setTimeout(r, 2500)); break; }
      const wrong = await page.evaluate(() => document.body.textContent.includes('Common Misconception'));
      if (wrong) {
        console.log(`  ${letter}: Wrong`);
        await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Try Again'))?.click(); });
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // ─── Q2: Multiple choice — try each option ───────────────
    console.log('--- Q2 (multiple choice, reasoning) ---');
    for (const letter of ['A', 'B', 'C', 'D']) {
      const exists = await page.evaluate((l) => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith(l + '.'));
        return btn && !btn.disabled;
      }, letter);
      if (!exists) continue;
      await page.evaluate((l) => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith(l + '.'))?.click(); }, letter);
      await new Promise(r => setTimeout(r, 1000));
      const correct = await page.evaluate(() => document.body.textContent.includes('Correct!'));
      if (correct) { console.log(`  ${letter}: CORRECT`); await new Promise(r => setTimeout(r, 2500)); break; }
      const wrong = await page.evaluate(() => document.body.textContent.includes('Common Misconception'));
      if (wrong) {
        console.log(`  ${letter}: Wrong`);
        await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Try Again'))?.click(); });
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // ─── Q3: Free text — ACTUAL TYPING ───────────────────────
    console.log('--- Q3 (free text, evaluate) ---');
    
    // Check if textarea exists
    const textareaInfo = await page.evaluate(() => {
      const ta = document.querySelector('textarea');
      if (!ta) return { exists: false };
      return {
        exists: true,
        placeholder: ta.placeholder,
        disabled: ta.disabled,
        value: ta.value,
      };
    });
    console.log('  Textarea:', JSON.stringify(textareaInfo));

    if (textareaInfo.exists) {
      // Click on the textarea to focus it
      await page.click('textarea');
      await new Promise(r => setTimeout(r, 300));

      // Type character by character (real keyboard input)
      const answer = 'The statement is incorrect because rest and motion are relative. The building is at rest relative to the ground but in motion relative to the Sun because the Earth spins and revolves.';
      console.log(`  Typing: "${answer.substring(0, 60)}..."`);
      await page.type('textarea', answer, { delay: 10 });
      await new Promise(r => setTimeout(r, 500));

      // Verify the text was entered
      const typedValue = await page.evaluate(() => document.querySelector('textarea')?.value);
      console.log(`  Textarea value: "${typedValue?.substring(0, 60)}..."`);
      console.log(`  Value matches: ${typedValue === answer}`);

      // Check if Submit button is enabled
      const submitBtn = await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Submit Answer'));
        return btn ? { exists: true, disabled: btn.disabled } : { exists: false };
      });
      console.log(`  Submit button: ${JSON.stringify(submitBtn)}`);

      // Click Submit Answer
      if (submitBtn.exists && !submitBtn.disabled) {
        await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Submit Answer'))?.click(); });
        await new Promise(r => setTimeout(r, 2000));

        // Check feedback
        const feedback = await page.evaluate(() => ({
          hasCorrect: document.body.textContent.includes('Correct!'),
          hasMisconception: document.body.textContent.includes('Common Misconception'),
          hasTryAgain: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Try Again')),
          questionNum: document.body.textContent.match(/Question (\d+) of/)?.[1],
        }));
        console.log(`  Feedback: ${JSON.stringify(feedback)}`);
      } else {
        console.log('  Submit button not clickable!');
      }
    }

    // ─── Q4: Free text — ACTUAL TYPING ───────────────────────
    console.log('--- Q4 (free text, apply) ---');
    const ta4 = await page.evaluate(() => !!document.querySelector('textarea'));
    console.log(`  Textarea exists: ${ta4}`);
    if (ta4) {
      await page.click('textarea');
      await new Promise(r => setTimeout(r, 300));
      const ans4 = 'At rest relative to floor: blackboard, table, wall clock. In motion relative to floor: fan blade, pendulum, walking student. The reference point is the floor in each case.';
      await page.type('textarea', ans4, { delay: 10 });
      await new Promise(r => setTimeout(r, 500));
      const val4 = await page.evaluate(() => document.querySelector('textarea')?.value);
      console.log(`  Typed: "${val4?.substring(0, 60)}..."`);
      await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Submit Answer'))?.click(); });
      await new Promise(r => setTimeout(r, 2000));
      const fb4 = await page.evaluate(() => ({
        hasCorrect: document.body.textContent.includes('Correct!'),
        hasMisconception: document.body.textContent.includes('Common Misconception'),
        qNum: document.body.textContent.match(/Question (\d+) of/)?.[1],
      }));
      console.log(`  Feedback: ${JSON.stringify(fb4)}`);
    }

    // ─── Q5: Free text — ACTUAL TYPING ───────────────────────
    console.log('--- Q5 (free text, create) ---');
    const ta5 = await page.evaluate(() => !!document.querySelector('textarea'));
    console.log(`  Textarea exists: ${ta5}`);
    if (ta5) {
      await page.click('textarea');
      await new Promise(r => setTimeout(r, 300));
      const ans5 = 'Take a ball on a student palm while the student walks. Relative to the palm the ball is at rest. Relative to the classroom door the ball is in motion. Both are true at the same time.';
      await page.type('textarea', ans5, { delay: 10 });
      await new Promise(r => setTimeout(r, 500));
      const val5 = await page.evaluate(() => document.querySelector('textarea')?.value);
      console.log(`  Typed: "${val5?.substring(0, 60)}..."`);
      await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Submit Answer'))?.click(); });
      await new Promise(r => setTimeout(r, 2000));
      const fb5 = await page.evaluate(() => ({
        hasCorrect: document.body.textContent.includes('Correct!'),
        hasMisconception: document.body.textContent.includes('Common Misconception'),
        phase: document.body.textContent.includes('What You Just Learned') ? 'explain' : 'test',
      }));
      console.log(`  Feedback: ${JSON.stringify(fb5)}`);
    }

    // ─── Final state ─────────────────────────────────────────
    const final = await page.evaluate(() => ({
      phase: document.body.textContent.includes('What You Just Learned') ? 'explain' :
             document.body.textContent.includes('Apply It') ? 'transfer' :
             document.body.textContent.includes('Topic Complete') ? 'complete' : 'test',
      score: document.body.textContent.match(/Score:\s*(\d+)/)?.[1],
      correct: document.body.textContent.match(/✅\s*(\d+)/)?.[1],
      errors: document.body.textContent.match(/❌\s*(\d+)/)?.[1],
    }));
    console.log('\n=== FINAL ===');
    console.log('Phase:', final.phase, 'Score:', final.score, 'Correct:', final.correct, 'Errors:', final.errors);
    console.log('Page errors:', errors.length);

  } catch(e) {
    console.log('Error:', e.message);
  }

  await browser.close();
})();
