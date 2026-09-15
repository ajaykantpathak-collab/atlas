const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  try {
    await page.goto('http://localhost:3000/learn-c68', { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2000));

    // Navigate to simulation
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Class 6'))?.click(); });
    await new Promise(r => setTimeout(r, 1000));
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Physics'))?.click(); });
    await new Promise(r => setTimeout(r, 1000));
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Motion'))?.click(); });
    await new Promise(r => setTimeout(r, 2000));

    // Go to discover phase
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Show Me What to Try'))?.click(); });
    await new Promise(r => setTimeout(r, 1000));

    // Click through all discovery steps
    for (let i = 0; i < 4; i++) {
      await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next Step'))?.click(); });
      await new Promise(r => setTimeout(r, 500));
    }

    // Click "I Understand — Test Me"
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('I Understand'))?.click(); });
    await new Promise(r => setTimeout(r, 1500));

    // Get the question and all option buttons
    const questionData = await page.evaluate(() => {
      const text = document.body.textContent;
      // Find all buttons that look like multiple choice options
      const allButtons = Array.from(document.querySelectorAll('button'));
      const options = allButtons.filter(b => b.textContent.match(/^[A-D]\./)).map(b => b.textContent.trim());
      return {
        questionText: text.substring(text.indexOf('Question 1'), text.indexOf('Question 1') + 500),
        options: options,
        allButtonTexts: allButtons.map(b => b.textContent.trim().substring(0, 60)),
      };
    });
    console.log('Question area:', questionData.questionText.substring(0, 300));
    console.log('\nOptions found:', questionData.options);
    console.log('\nAll buttons:', questionData.allButtonTexts);

    // Click option A
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('A.'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 2000));

    // Check what appeared after clicking
    const afterClick = await page.evaluate(() => {
      const text = document.body.textContent;
      const hasCorrect = text.includes('Correct!');
      const hasMisconception = text.includes('Misconception');
      const hasTryAgain = text.includes('Try Again');
      
      // Get any feedback divs
      const feedbackDivs = Array.from(document.querySelectorAll('div')).filter(d => {
        const t = d.textContent;
        return (t.includes('Correct') || t.includes('Misconception') || t.includes('Correction')) && d.children.length < 5;
      }).map(d => d.textContent.trim().substring(0, 200));
      
      // Check if we moved to question 2
      const hasQuestion2 = text.includes('Question 2');
      
      return { hasCorrect, hasMisconception, hasTryAgain, feedbackDivs, hasQuestion2 };
    });
    console.log('\nAfter clicking option A:');
    console.log('  Correct:', afterClick.hasCorrect);
    console.log('  Misconception:', afterClick.hasMisconception);
    console.log('  Try Again:', afterClick.hasTryAgain);
    console.log('  Moved to Q2:', afterClick.hasQuestion2);
    console.log('  Feedback divs:', afterClick.feedbackDivs);

    await page.screenshot({ path: 'screenshots/test-feedback.png' });

  } catch(e) {
    console.log('Error:', e.message);
  }

  await browser.close();
})();
