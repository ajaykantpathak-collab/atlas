const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

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
    await page.screenshot({ path: 'screenshots/before-run.png' });
    console.log('Screenshot 1: before-run.png');

    // Click Run
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Run'));
      if (btn) btn.click();
    });

    // Wait 3 seconds
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: 'screenshots/after-3s.png' });
    console.log('Screenshot 2: after-3s.png');

    // Wait 7 more seconds
    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({ path: 'screenshots/after-10s.png' });
    console.log('Screenshot 3: after-10s.png');

    // Check canvas pixel data at various positions
    const pixelData = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return null;
      const ctx = canvas.getContext('2d');
      const results = [];
      // Sample the cart area (x=170-230, y=50-100)
      for (let y = 50; y < 100; y += 10) {
        for (let x = 170; x < 230; x += 10) {
          const pixel = ctx.getImageData(x, y, 1, 1).data;
          results.push({ x, y, r: pixel[0], g: pixel[1], b: pixel[2] });
        }
      }
      // Also check the full canvas for any blue pixels
      const allData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let bluePixels = 0;
      let firstBlue = null;
      for (let i = 0; i < allData.data.length; i += 4) {
        const r = allData.data[i];
        const g = allData.data[i+1];
        const b = allData.data[i+2];
        if (r < 100 && g > 100 && b > 200) {
          bluePixels++;
          if (!firstBlue) {
            const px = (i/4) % canvas.width;
            const py = Math.floor((i/4) / canvas.width);
            firstBlue = { x: px, y: py, r, g, b };
          }
        }
      }
      return { samplePixels: results, bluePixelCount: bluePixels, firstBluePixel: firstBlue };
    });
    console.log('Pixel data:', JSON.stringify(pixelData, null, 2));

  } catch(e) {
    console.log('Error:', e.message);
  }

  await browser.close();
})();
