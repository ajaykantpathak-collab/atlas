/**
 * check-mascot.js — checks if Rive mascot renders in game.
 */
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });
  const page = await browser.newPage();

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('requestfailed', (req) => {
    if (req.url().includes('.riv')) errors.push('RIVE FAIL: ' + req.url());
  });

  await page.goto('http://localhost:3000/game-test', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForSelector('button', { timeout: 10000 });

  // Select Class 1
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Class 1')) { await btn.click(); break; }
  }
  await new Promise(r => setTimeout(r, 2000));

  // Click first game
  const gameButtons = await page.$$('button');
  for (const btn of gameButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.length > 5 && !text.includes('Class') && !text.includes('Atlas')) {
      await btn.click(); break;
    }
  }
  await new Promise(r => setTimeout(r, 5000));

  // Check for mascot
  const mascotInfo = await page.evaluate(() => {
    const allCanvas = Array.from(document.querySelectorAll('canvas'));
    const riveCanvas = allCanvas.filter(c => c.width < 200 && c.height < 200);
    const owlEmoji = document.body.innerHTML.includes('🦉');
    const dogEmoji = document.body.innerHTML.includes('🐶');
    const mascotDivs = document.querySelectorAll('[class*="pointer-events-none"]').length;
    const bottomLeft = document.querySelector('[class*="bottom-2"][class*="left-2"]');
    return {
      totalCanvas: allCanvas.length,
      smallCanvas: riveCanvas.length,
      smallCanvasSizes: riveCanvas.map(c => `${c.width}x${c.height}`),
      hasOwlEmoji: owlEmoji,
      hasDogEmoji: dogEmoji,
      mascotDivs,
      hasBottomLeftMascot: !!bottomLeft,
    };
  });

  console.log('=== Mascot Info ===');
  console.log('  Total canvas:', mascotInfo.totalCanvas);
  console.log('  Small canvas (mascot):', mascotInfo.smallCanvas);
  console.log('  Small canvas sizes:', mascotInfo.smallCanvasSizes);
  console.log('  Has owl emoji fallback:', mascotInfo.hasOwlEmoji);
  console.log('  Has dog emoji:', mascotInfo.hasDogEmoji);
  console.log('  Mascot divs:', mascotInfo.mascotDivs);
  console.log('  Has bottom-left mascot:', mascotInfo.hasBottomLeftMascot);
  console.log('  Errors:', errors);

  await browser.close();
})();
