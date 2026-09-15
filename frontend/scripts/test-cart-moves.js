// Test that the cart actually moves when Run is pressed
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  const errors = [];
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));

  try {
    await page.goto('http://localhost:3000/learn-c68', { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2000));

    // Click Class 6
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Class 6'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    // Click Physics
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Physics'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    // Click Motion topic
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Motion'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 2000));

    // Read the initial speed from the data readout
    const initialData = await page.evaluate(() => {
      const divs = Array.from(document.querySelectorAll('div'));
      const speedDiv = divs.find(d => d.textContent.includes('m/s') && d.textContent.match(/\d+\.\d+/));
      return document.body.textContent;
    });
    
    // Check if Run button exists and click it
    const hasRun = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Run'));
      if (btn) { btn.click(); return true; }
      return false;
    });
    console.log('Run button clicked:', hasRun);

    // Wait 3 seconds for physics to run
    await new Promise(r => setTimeout(r, 3000));

    // Read the speed after 3 seconds
    const afterData = await page.evaluate(() => {
      // Find the speed readout div
      const allText = document.body.textContent;
      const speedMatch = allText.match(/(\d+\.\d+)\s*m\/s/);
      const distMatch = allText.match(/(\d+\.\d+)\s*m\b/);
      const timeMatch = allText.match(/(\d+\.\d+)\s*s\b/);
      return {
        speed: speedMatch ? speedMatch[1] : 'not found',
        distance: distMatch ? distMatch[1] : 'not found',
        time: timeMatch ? timeMatch[1] : 'not found',
      };
    });

    console.log('After 3 seconds of running:');
    console.log('  Speed:', afterData.speed, 'm/s');
    console.log('  Distance:', afterData.distance, 'm');
    console.log('  Time:', afterData.time, 's');

    // Check if the cart is actually moving
    const speedNum = parseFloat(afterData.speed);
    if (speedNum > 0.5) {
      console.log('PASS: Cart is moving! Speed > 0.5 m/s');
    } else if (speedNum > 0.01) {
      console.log('WARN: Cart is barely moving. Speed =', speedNum);
    } else {
      console.log('FAIL: Cart is not moving. Speed =', speedNum);
    }

    // Expected: with 20N force, 5kg mass, friction 0.1
    // a = (F - friction*mass*g) / mass = (20 - 0.1*5*10) / 5 = (20-5)/5 = 3 m/s²
    // After 3 seconds: v = 3 * 3 = 9 m/s (approximately)
    console.log('  Expected speed ~3-9 m/s (F=20N, m=5kg, friction=0.1)');

  } catch(e) {
    console.log('Error:', e.message.substring(0, 200));
  }

  console.log('\n--- Page Errors ---');
  if (errors.length === 0) {
    console.log('No page errors!');
  } else {
    errors.forEach(e => console.log(e));
  }

  await browser.close();
})();
