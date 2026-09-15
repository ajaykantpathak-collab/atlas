const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.goto('http://localhost:3000/play', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  const btns = await p.$$('button');
  for (const btn of btns) {
    const t = await p.evaluate(el => el.textContent, btn);
    if (t && t.includes('Maths')) { await btn.click(); break; }
  }
  await new Promise(r => setTimeout(r, 2000));
  const gbtns = await p.$$('button');
  for (const btn of gbtns) {
    const t = await p.evaluate(el => el.textContent, btn);
    if (t && t.includes('Addition')) { await btn.click(); break; }
  }
  await new Promise(r => setTimeout(r, 4000));
  // Click through teaching slides
  for (let i = 0; i < 8; i++) {
    const nextBtns = await p.$$('button');
    for (const btn of nextBtns) {
      const t = await p.evaluate(el => el.textContent, btn);
      if (t && (t.includes('Next') || t.includes('Start'))) { await btn.click(); break; }
    }
    await new Promise(r => setTimeout(r, 800));
  }
  await new Promise(r => setTimeout(r, 2000));
  // Check for guided practice indicators
  const info = await p.evaluate(() => {
    const body = document.body.innerHTML;
    return {
      hasWatch: body.includes('Watch'),
      hasWeDo: body.includes("Let's Try") || body.includes('We do'),
      hasYouDo: body.includes('Your Turn'),
      hasPhaseEmoji: body.includes('👀') || body.includes('🤝') || body.includes('🌟'),
      hasChallenge: body.includes('Challenge'),
      hasErrorFeedback: body.includes('So close') || body.includes('Good try'),
      hasAdaptiveEasier: body.includes('Easier mode'),
    };
  });
  console.log('Guided practice info:', JSON.stringify(info, null, 2));
  await b.close();
})();
