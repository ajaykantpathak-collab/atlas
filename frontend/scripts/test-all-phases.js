const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));

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

    // Answer all 5 questions (try each MC option, type for free-text)
    for (let q = 1; q <= 5; q++) {
      const isMC = await page.evaluate(() => Array.from(document.querySelectorAll('button')).some(b => b.textContent.match(/^[A-D]\./) && !b.disabled));
      
      if (isMC) {
        for (const letter of ['A', 'B', 'C', 'D']) {
          const exists = await page.evaluate((l) => {
            const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith(l + '.'));
            return btn && !btn.disabled;
          }, letter);
          if (!exists) continue;
          await page.evaluate((l) => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith(l + '.'))?.click(); }, letter);
          await new Promise(r => setTimeout(r, 800));
          const correct = await page.evaluate(() => document.body.textContent.includes('Correct!'));
          if (correct) { await new Promise(r => setTimeout(r, 2500)); break; }
          const wrong = await page.evaluate(() => document.body.textContent.includes('Common Misconception'));
          if (wrong) {
            await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Try Again'))?.click(); });
            await new Promise(r => setTimeout(r, 500));
          }
        }
      } else {
        // Free text
        await page.evaluate(() => {
          const ta = document.querySelector('textarea');
          if (ta) {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
            setter.call(ta, 'Motion is the change in position with respect to time. Reference point determines rest or motion. An object can be at rest relative to one point and in motion relative to another.');
            ta.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
        await new Promise(r => setTimeout(r, 300));
        await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Submit Answer'))?.click(); });
        await new Promise(r => setTimeout(r, 2500));
      }
    }

    // ─── Check Explain phase ─────────────────────────────────
    const explain = await page.evaluate(() => ({
      hasExplain: document.body.textContent.includes('What You Just Learned'),
      hasDefinition: document.body.textContent.includes('Definition:'),
      hasMastery: document.body.textContent.includes('Mastery Criteria:'),
      hasTransferBtn: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Transfer')),
    }));
    console.log('Explain phase:', JSON.stringify(explain));
    await page.screenshot({ path: 'screenshots/11-explain.png' });

    // Click Continue to Transfer
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Transfer'))?.click(); });
    await new Promise(r => setTimeout(r, 2000));

    // ─── Check Transfer phase ────────────────────────────────
    const transfer = await page.evaluate(() => ({
      hasTransfer: document.body.textContent.includes('Apply It'),
      hasRocket: document.body.textContent.includes('rocket') || document.body.textContent.includes('Rocket'),
      hasCanvas: !!document.querySelector('canvas'),
      hasCompleteBtn: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Complete Topic')),
    }));
    console.log('Transfer phase:', JSON.stringify(transfer));
    await page.screenshot({ path: 'screenshots/12-transfer.png' });

    // Click Complete Topic
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Complete Topic'))?.click(); });
    await new Promise(r => setTimeout(r, 1500));

    // ─── Check Complete phase ────────────────────────────────
    const complete = await page.evaluate(() => ({
      hasComplete: document.body.textContent.includes('Topic Complete'),
      hasScore: document.body.textContent.match(/(\d+)\/100/)?.[1],
      hasMastery: document.body.textContent.includes('What you mastered'),
      hasBackBtn: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Back to Topics')),
    }));
    console.log('Complete phase:', JSON.stringify(complete));
    await page.screenshot({ path: 'screenshots/13-complete.png' });

    // Click Back to Topics
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Back to Topics'))?.click(); });
    await new Promise(r => setTimeout(r, 1500));

    // ─── Check we're back at topic selection ─────────────────
    const backAtTopics = await page.evaluate(() => ({
      hasMotion: document.body.textContent.includes('Motion'),
      hasClass6: document.body.textContent.includes('Class 6'),
    }));
    console.log('Back at topics:', JSON.stringify(backAtTopics));

    // ─── Summary ─────────────────────────────────────────────
    console.log('\n=== FULL FLOW SUMMARY ===');
    console.log('Page errors:', errors.length);
    
    const allPassed = explain.hasExplain && explain.hasDefinition && explain.hasMastery &&
      transfer.hasTransfer && transfer.hasCanvas && transfer.hasCompleteBtn &&
      complete.hasComplete && complete.hasScore && complete.hasBackBtn &&
      backAtTopics.hasMotion && errors.length === 0;
    
    console.log(allPassed ? 'ALL PHASES PASSED' : 'SOME PHASES FAILED');

  } catch(e) {
    console.log('Error:', e.message);
  }

  await browser.close();
})();
