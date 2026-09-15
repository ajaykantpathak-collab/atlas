const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  try {
    await page.goto('http://localhost:3000/learn-c68', { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2000));

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

    // Wait 3 seconds
    await new Promise(r => setTimeout(r, 3000));

    // Read ALL the text content with m/s
    const allText = await page.evaluate(() => {
      // Get all text nodes that contain "m/s"
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const texts = [];
      let node;
      while (node = walker.nextNode()) {
        if (node.textContent.includes('m/s') || node.textContent.includes('m') || node.textContent.includes('Speed')) {
          texts.push({ text: node.textContent.trim(), parent: node.parentElement?.tagName });
        }
      }
      return texts;
    });
    console.log('Text nodes with speed/distance:');
    allText.forEach(t => console.log('  ', t.parent, ':', t.text));

    // Also get the readout divs specifically
    const readouts = await page.evaluate(() => {
      const divs = Array.from(document.querySelectorAll('div'));
      return divs.filter(d => {
        const t = d.textContent;
        return t && (t.includes('Speed') || t.includes('Distance') || t.includes('Time') || t.includes('Acceleration'));
      }).map(d => ({ text: d.textContent.trim().substring(0, 50), children: d.children.length }));
    });
    console.log('\nReadout divs:');
    readouts.forEach(r => console.log('  ', r.text, '(children:', r.children, ')'));

  } catch(e) {
    console.log('Error:', e.message);
  }

  await browser.close();
})();
