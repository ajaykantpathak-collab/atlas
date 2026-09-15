// Quick test: load the learn-c68 page and check for runtime errors
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const errors = [];
  const consoleMessages = [];

  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleMessages.push(`CONSOLE ERROR: ${msg.text()}`);
    }
  });

  try {
    await page.goto('http://localhost:3000/learn-c68', { waitUntil: 'networkidle0', timeout: 60000 });

    // Wait a bit for client-side hydration
    await new Promise(r => setTimeout(r, 3000));

    // Check if the class selection screen rendered
    const hasClass6 = await page.evaluate(() => document.body.textContent.includes('Class 6'));
    console.log('Class 6 visible:', hasClass6);

    // Click Class 6
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const class6Btn = buttons.find(b => b.textContent.includes('Class 6'));
      if (class6Btn) class6Btn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    // Click Physics
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const physicsBtn = buttons.find(b => b.textContent.includes('Physics'));
      if (physicsBtn) physicsBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    // Click the Motion topic
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const motionBtn = buttons.find(b => b.textContent.includes('Motion'));
      if (motionBtn) motionBtn.click();
    });
    await new Promise(r => setTimeout(r, 2000));

    // Check if the simulation canvas appeared
    const hasCanvas = await page.evaluate(() => !!document.querySelector('canvas'));
    console.log('Canvas present:', hasCanvas);

    // Check if the Play phase is visible
    const hasPlayPhase = await page.evaluate(() => document.body.textContent.includes('Play and Explore'));
    console.log('Play phase visible:', hasPlayPhase);

    // Check for the simulation controls
    const hasSliders = await page.evaluate(() => document.querySelectorAll('input[type="range"]').length);
    console.log('Sliders present:', hasSliders);

    // Check for Run button
    const hasRunButton = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.some(b => b.textContent.includes('Run'));
    });
    console.log('Run button present:', hasRunButton);

  } catch(e) {
    console.log('Navigation error:', e.message.substring(0, 100));
  }

  console.log('\n--- Errors ---');
  if (errors.length === 0 && consoleMessages.length === 0) {
    console.log('No errors!');
  } else {
    errors.forEach(e => console.log(e));
    consoleMessages.forEach(m => console.log(m));
  }

  await browser.close();
})();
