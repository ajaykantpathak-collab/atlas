const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  const screenshotDir = path.join(__dirname, 'screenshots');
  fs.mkdirSync(screenshotDir, { recursive: true });

  // Navigate to test page
  console.log('Navigating to http://localhost:3000/test-sim ...');
  await page.goto('http://localhost:3000/test-sim', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000)); // wait for animations

  // Screenshot 1: Light Ray (default)
  console.log('Screenshot 1: Light Ray Simulation');
  await page.screenshot({ path: path.join(screenshotDir, '01-lightray.png'), fullPage: false });

  // Check for SVG
  const hasSvgLight = await page.$('svg');
  console.log('  SVG found:', !!hasSvgLight);

  // Check for sliders
  const slidersLight = await page.$$('input[type="range"]');
  console.log('  Sliders found:', slidersLight.length);

  // Check for buttons
  const buttonsLight = await page.$$('button');
  console.log('  Buttons found:', buttonsLight.length);

  // Try moving a slider
  if (slidersLight.length > 0) {
    await slidersLight[0].evaluate(el => {
      el.value = 60;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(screenshotDir, '02-lightray-slider-moved.png'), fullPage: false });
    console.log('  Screenshot 2: slider moved to 60');
  }

  // Switch to Circuit Builder
  console.log('\nSwitching to Circuit Builder...');
  const circuitButton = await page.evaluateHandle(() => {
    return [...document.querySelectorAll('button')].find(b => b.textContent.includes('Circuit Builder'));
  });
  if (circuitButton) {
    await circuitButton.click();
    await new Promise(r => setTimeout(r, 3000)); // wait for render + animations

    await page.screenshot({ path: path.join(screenshotDir, '03-circuit.png'), fullPage: false });
    console.log('Screenshot 3: Circuit Builder');

    const hasSvgCircuit = await page.$('svg');
    console.log('  SVG found:', !!hasSvgCircuit);

    const slidersCircuit = await page.$$('input[type="range"]');
    console.log('  Sliders found:', slidersCircuit.length);

    const buttonsCircuit = await page.$$('button');
    console.log('  Buttons found:', buttonsCircuit.length);

    // Scroll down to see more
    await page.evaluate(() => window.scrollBy(0, 400));
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(screenshotDir, '04-circuit-scrolled.png'), fullPage: false });
    console.log('Screenshot 4: Circuit scrolled down');
  }

  // Full page screenshots
  console.log('\nTaking full page screenshots...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));

  // Switch back to Light Ray for full page
  const lightButton = await page.evaluateHandle(() => {
    return [...document.querySelectorAll('button')].find(b => b.textContent.includes('Light Ray'));
  });
  if (lightButton) {
    await lightButton.click();
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(screenshotDir, '05-lightray-full.png'), fullPage: true });
    console.log('Screenshot 5: Light Ray full page');
  }

  // Console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('  CONSOLE ERROR:', msg.text());
    }
  });

  await browser.close();
  console.log('\nScreenshots saved to:', screenshotDir);
  console.log('Files:', fs.readdirSync(screenshotDir).join(', '));
}

takeScreenshots().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
