/**
 * take-screenshots.js — captures screenshots of key pages.
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = 'screenshots';
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR);

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });

  const page = await browser.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('  CONSOLE ERROR:', msg.text());
  });

  // 1. Welcome screen
  console.log('1. Welcome screen...');
  await page.goto('http://localhost:3000/welcome', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-welcome.png') });
  console.log('   Saved 01-welcome.png');

  // 2. Game test page
  console.log('2. Game test page...');
  await page.goto('http://localhost:3000/game-test', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-game-test.png') });
  console.log('   Saved 02-game-test.png');

  // 3. Select Class 1 and click first game
  console.log('3. Class 1 game list...');
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Class 1')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-class1-games.png') });
  console.log('   Saved 03-class1-games.png');

  // 4. Click first game and wait for teaching slide
  console.log('4. Teaching slide...');
  const gameButtons = await page.$$('button');
  for (const btn of gameButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.length > 5 && !text.includes('Class') && !text.includes('Atlas')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 4000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04-teaching-slide.png') });
  console.log('   Saved 04-teaching-slide.png');

  // 5. Click through slides to challenges
  console.log('5. Challenge view...');
  // Click next button a few times
  for (let i = 0; i < 6; i++) {
    const nextBtns = await page.$$('button');
    for (const btn of nextBtns) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && (text.includes('Next') || text.includes('Start') || text.includes('→'))) {
        await btn.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05-challenge.png') });
  console.log('   Saved 05-challenge.png');

  // 6. Living World
  console.log('6. Living World...');
  await page.goto('http://localhost:3000/my-world', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06-living-world.png') });
  console.log('   Saved 06-living-world.png');

  // 7. Topic Map
  console.log('7. Topic Map...');
  await page.goto('http://localhost:3000/topic-map', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07-topic-map.png') });
  console.log('   Saved 07-topic-map.png');

  // 8. Parent Dashboard
  console.log('8. Parent Dashboard...');
  await page.goto('http://localhost:3000/parent-dashboard', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08-parent-dashboard.png') });
  console.log('   Saved 08-parent-dashboard.png');

  await browser.close();
  console.log('\nAll screenshots saved to /screenshots/');
})();
