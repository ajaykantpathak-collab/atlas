/**
 * take-play-screenshot.js — captures the /play page.
 */
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });
  const page = await browser.newPage();

  // 1. Play page - subject selection
  console.log('1. Play page - subject selection...');
  await page.goto('http://localhost:3000/play', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join('screenshots', '09-play-subjects.png') });
  console.log('   Saved 09-play-subjects.png');

  // 2. Click a subject
  console.log('2. Play page - game list...');
  const subjectBtns = await page.$$('button');
  for (const btn of subjectBtns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Maths')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join('screenshots', '10-play-games.png') });
  console.log('   Saved 10-play-games.png');

  // 3. Click first game
  console.log('3. Play page - game loaded...');
  const gameBtns = await page.$$('button');
  for (const btn of gameBtns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Addition')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 5000));
  await page.screenshot({ path: path.join('screenshots', '11-play-game.png') });
  console.log('   Saved 11-play-game.png');

  // 4. Check for mascot and guided practice indicators
  console.log('4. Checking mascot and guided practice...');
  const info = await page.evaluate(() => {
    const canvases = document.querySelectorAll('canvas');
    const mascotDivs = document.querySelectorAll('[class*="pointer-events-none"]');
    const phaseIndicators = document.body.innerHTML.includes('Watch') || document.body.innerHTML.includes('We do') || document.body.innerHTML.includes('Your Turn');
    const riveLoading = document.body.innerHTML.includes('⏳');
    const emojiMascot = document.body.innerHTML.includes('🐶') || document.body.innerHTML.includes('🦉');
    return {
      canvasCount: canvases.length,
      mascotDivs: mascotDivs.length,
      hasPhaseIndicators: phaseIndicators,
      hasRiveLoading: riveLoading,
      hasEmojiMascot: emojiMascot,
    };
  });
  console.log('  Canvas count:', info.canvasCount);
  console.log('  Mascot divs:', info.mascotDivs);
  console.log('  Phase indicators:', info.hasPhaseIndicators);
  console.log('  Rive loading:', info.hasRiveLoading);
  console.log('  Emoji mascot:', info.hasEmojiMascot);

  await browser.close();
  console.log('\nDone.');
})();
