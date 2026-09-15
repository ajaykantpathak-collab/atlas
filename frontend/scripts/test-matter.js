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

    // Navigate to simulation
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Class 6'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Physics'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Motion'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 2000));

    // Screenshot before running
    await page.screenshot({ path: 'screenshots/matter-before.png' });
    console.log('Screenshot: matter-before.png');

    // Click Run
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Run'));
      if (btn) btn.click();
    });
    console.log('Run clicked');

    // Wait 3 seconds
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: 'screenshots/matter-3s.png' });

    // Read data
    const data3 = await page.evaluate(() => {
      const text = document.body.textContent;
      const speedMatch = text.match(/(\d+\.\d+)\s*m\/s/);
      const distMatch = text.match(/(\d+\.\d+)\s*m\b/);
      return {
        speed: speedMatch ? speedMatch[1] : 'not found',
        distance: distMatch ? distMatch[1] : 'not found',
      };
    });
    console.log('After 3s: Speed:', data3.speed, 'm/s, Distance:', data3.distance, 'm');

    // Wait 7 more seconds
    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({ path: 'screenshots/matter-10s.png' });

    const data10 = await page.evaluate(() => {
      const text = document.body.textContent;
      const speedMatch = text.match(/(\d+\.\d+)\s*m\/s/);
      const distMatch = text.match(/(\d+\.\d+)\s*m\b/);
      return {
        speed: speedMatch ? speedMatch[1] : 'not found',
        distance: distMatch ? distMatch[1] : 'not found',
      };
    });
    console.log('After 10s: Speed:', data10.speed, 'm/s, Distance:', data10.distance, 'm');

    // Check if cart is still on screen (look for blue pixels)
    const pixelData = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return { found: false };
      const ctx = canvas.getContext('2d');
      const allData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let bluePixels = 0;
      let firstBlue = null;
      for (let i = 0; i < allData.data.length; i += 4) {
        const r = allData.data[i];
        const g = allData.data[i+1];
        const b = allData.data[i+2];
        // Blue cart: #2196f3 = rgb(33, 150, 243)
        if (r < 80 && g > 120 && b > 200) {
          bluePixels++;
          if (!firstBlue) {
            const px = (i/4) % canvas.width;
            const py = Math.floor((i/4) / canvas.width);
            firstBlue = { x: px, y: py };
          }
        }
      }
      return { found: true, bluePixels, firstBlue };
    });
    console.log('Blue pixels:', pixelData.bluePixels, 'at', JSON.stringify(pixelData.firstBlue));

    if (pixelData.bluePixels > 100) {
      console.log('PASS: Cart is visible on screen!');
    } else {
      console.log('FAIL: Cart not visible');
    }

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
