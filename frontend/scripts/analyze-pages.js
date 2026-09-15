/**
 * analyze-pages.js — detailed analysis of what's rendering on each page.
 */
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });
  const page = await browser.newPage();

  // 1. Welcome screen analysis
  console.log('=== WELCOME SCREEN ===');
  await page.goto('http://localhost:3000/welcome', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  const welcomeInfo = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim());
    const headings = Array.from(document.querySelectorAll('h1,h2')).map(h => h.textContent?.trim());
    const inputs = Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, placeholder: i.placeholder }));
    const riveCanvas = document.querySelectorAll('canvas').length;
    const mascotDiv = document.querySelector('[class*="pointer-events-none"]');
    return { buttons, headings, inputs, riveCanvas, hasMascot: !!mascotDiv };
  });
  console.log('  Buttons:', welcomeInfo.buttons);
  console.log('  Headings:', welcomeInfo.headings);
  console.log('  Inputs:', welcomeInfo.inputs);
  console.log('  Canvas count:', welcomeInfo.riveCanvas);
  console.log('  Has mascot div:', welcomeInfo.hasMascot);

  // 2. Game test page
  console.log('\n=== GAME TEST PAGE ===');
  await page.goto('http://localhost:3000/game-test', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  const gameTestInfo = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim().substring(0, 40));
    return { buttonCount: buttons.length, buttons: buttons.slice(0, 10) };
  });
  console.log('  Button count:', gameTestInfo.buttonCount);
  console.log('  First 10 buttons:', gameTestInfo.buttons);

  // 3. Select Class 1
  console.log('\n=== CLASS 1 GAMES ===');
  const btns = await page.$$('button');
  for (const btn of btns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Class 1')) { await btn.click(); break; }
  }
  await new Promise(r => setTimeout(r, 2000));
  const class1Info = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim().substring(0, 40));
    return { buttonCount: buttons.length, buttons: buttons.slice(0, 25) };
  });
  console.log('  Game count:', class1Info.buttonCount);
  console.log('  Games:', class1Info.buttons);

  // 4. Click first game and check teaching slide
  console.log('\n=== TEACHING SLIDE ===');
  const gameBtns = await page.$$('button');
  for (const btn of gameBtns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.length > 5 && !text.includes('Class') && !text.includes('Atlas')) {
      await btn.click(); break;
    }
  }
  await new Promise(r => setTimeout(r, 4000));
  const slideInfo = await page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim();
    const h2 = document.querySelector('h2')?.textContent?.trim();
    const p = document.querySelector('p')?.textContent?.trim();
    const canvas = document.querySelector('canvas');
    const buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim().substring(0, 30));
    const loadingVisible = !!document.querySelector('[class*="Loading"]');
    return {
      h1, h2, paragraph: p?.substring(0, 100),
      canvasSize: canvas ? `${canvas.width}x${canvas.height}` : 'none',
      buttons, loadingVisible
    };
  });
  console.log('  H1:', slideInfo.h1);
  console.log('  H2:', slideInfo.h2);
  console.log('  Paragraph:', slideInfo.paragraph);
  console.log('  Canvas:', slideInfo.canvasSize);
  console.log('  Buttons:', slideInfo.buttons);
  console.log('  Loading visible:', slideInfo.loadingVisible);

  // 5. Click through to challenge
  console.log('\n=== CHALLENGE VIEW ===');
  for (let i = 0; i < 8; i++) {
    const nextBtns = await page.$$('button');
    for (const btn of nextBtns) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && (text.includes('Next') || text.includes('Start') || text.includes('→'))) {
        await btn.click(); break;
      }
    }
    await new Promise(r => setTimeout(r, 800));
  }
  await new Promise(r => setTimeout(r, 2000));
  const challengeInfo = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    const allText = Array.from(document.querySelectorAll('p, h1, h2, h3, span, div'))
      .map(e => e.textContent?.trim())
      .filter(t => t && t.length > 10 && t.length < 200)
      .slice(0, 10);
    const buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim().substring(0, 30));
    const mascotImg = document.querySelector('img[src*="rive"], canvas[class*="rive"]');
    return {
      canvasSize: canvas ? `${canvas.width}x${canvas.height}` : 'none',
      canvasVisible: canvas ? canvas.offsetParent !== null : false,
      textElements: allText,
      buttons,
      hasMascot: !!mascotImg
    };
  });
  console.log('  Canvas:', challengeInfo.canvasSize, 'visible:', challengeInfo.canvasVisible);
  console.log('  Text:', challengeInfo.textElements);
  console.log('  Buttons:', challengeInfo.buttons);
  console.log('  Has mascot element:', challengeInfo.hasMascot);

  // 6. Living World
  console.log('\n=== LIVING WORLD ===');
  await page.goto('http://localhost:3000/my-world', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  const worldInfo = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    const text = document.body.textContent?.substring(0, 200);
    return {
      canvasSize: canvas ? `${canvas.width}x${canvas.height}` : 'none',
      canvasVisible: canvas ? canvas.offsetParent !== null : false,
      text: text?.replace(/\s+/g, ' ').trim()
    };
  });
  console.log('  Canvas:', worldInfo.canvasSize, 'visible:', worldInfo.canvasVisible);
  console.log('  Text:', worldInfo.text);

  // 7. Parent Dashboard
  console.log('\n=== PARENT DASHBOARD ===');
  await page.goto('http://localhost:3000/parent-dashboard', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  const dashInfo = await page.evaluate(() => {
    const h1 = document.querySelector('h1')?.textContent?.trim();
    const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.textContent?.trim());
    const tables = document.querySelectorAll('table').length;
    const statCards = document.querySelectorAll('[class*="gradient"]').length;
    return { h1, h2s, tables, statCards };
  });
  console.log('  H1:', dashInfo.h1);
  console.log('  Sections:', dashInfo.h2s);
  console.log('  Tables:', dashInfo.tables);
  console.log('  Stat cards:', dashInfo.statCards);

  await browser.close();
  console.log('\nDone.');
})();
