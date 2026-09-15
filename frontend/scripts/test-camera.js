// Test that the cart stays on screen and doesn't fall off
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

    // Navigate to the simulation
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

    // Click Run
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Run'));
      if (btn) btn.click();
    });
    console.log('Run clicked');

    // Wait 5 seconds for the cart to move
    await new Promise(r => setTimeout(r, 5000));

    // Read the speed and distance
    const data1 = await page.evaluate(() => {
      const text = document.body.textContent;
      const speedMatch = text.match(/(\d+\.\d+)\s*m\/s/);
      const distMatch = text.match(/(\d+\.\d+)\s*m\b/);
      return {
        speed: speedMatch ? speedMatch[1] : 'not found',
        distance: distMatch ? distMatch[1] : 'not found',
      };
    });
    console.log('After 5 seconds:');
    console.log('  Speed:', data1.speed, 'm/s');
    console.log('  Distance:', data1.distance, 'm');

    // Wait another 5 seconds
    await new Promise(r => setTimeout(r, 5000));

    const data2 = await page.evaluate(() => {
      const text = document.body.textContent;
      const speedMatch = text.match(/(\d+\.\d+)\s*m\/s/);
      const distMatch = text.match(/(\d+\.\d+)\s*m\b/);
      return {
        speed: speedMatch ? speedMatch[1] : 'not found',
        distance: distMatch ? distMatch[1] : 'not found',
      };
    });
    console.log('After 10 seconds:');
    console.log('  Speed:', data2.speed, 'm/s');
    console.log('  Distance:', data2.distance, 'm');

    // Check if the canvas still has content (cart is visible)
    const canvasInfo = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return { found: false };
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // Check if there are non-white pixels in the cart area (around x=200)
      let hasContent = false;
      for (let y = 0; y < canvas.height; y += 10) {
        for (let x = 190; x < 220; x += 5) {
          const idx = (y * canvas.width + x) * 4;
          const r = imageData.data[idx];
          const g = imageData.data[idx + 1];
          const b = imageData.data[idx + 2];
          // Check for blue cart color (33, 150, 243)
          if (r < 100 && g > 100 && b > 200) {
            hasContent = true;
            break;
          }
        }
        if (hasContent) break;
      }
      return { found: true, width: canvas.width, height: canvas.height, hasCart: hasContent };
    });
    console.log('Canvas info:', JSON.stringify(canvasInfo));

    if (canvasInfo.hasCart) {
      console.log('PASS: Cart is still visible on screen after 10 seconds!');
    } else {
      console.log('FAIL: Cart is not visible at expected position');
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
