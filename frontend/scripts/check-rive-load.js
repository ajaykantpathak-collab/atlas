const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  const errors = [];
  const warnings = [];
  p.on('console', m => {
    if (m.type() === 'error') errors.push(m.text());
    if (m.type() === 'warning') warnings.push(m.text().substring(0, 100));
  });
  p.on('requestfailed', r => {
    if (r.url().includes('rive') || r.url().includes('wasm')) errors.push('REQ FAIL: ' + r.url());
  });

  await p.goto('http://localhost:3000/play', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  const btns = await p.$$('button');
  for (const btn of btns) {
    const t = await p.evaluate(el => el.textContent, btn);
    if (t && t.includes('Maths')) { await btn.click(); break; }
  }
  await new Promise(r => setTimeout(r, 2000));
  const gbtns = await p.$$('button');
  for (const btn of gbtns) {
    const t = await p.evaluate(el => el.textContent, btn);
    if (t && t.includes('Addition')) { await btn.click(); break; }
  }
  // Wait 12 seconds for Rive to load
  await new Promise(r => setTimeout(r, 12000));

  const info = await p.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas')).map(c => ({
      w: c.width, h: c.height,
      parentClass: c.parentElement?.className?.substring(0, 60)
    }));
    const riveCanvases = document.querySelectorAll('canvas').length;
    const hasEmoji = document.body.innerHTML.includes('🐶') || document.body.innerHTML.includes('🦉');
    const hasHourglass = document.body.innerHTML.includes('⏳');
    return { canvases, riveCanvases, hasEmoji, hasHourglass };
  });

  console.log('Canvas info:', JSON.stringify(info, null, 2));
  console.log('Errors:', errors);
  console.log('Warnings (first 5):', warnings.slice(0, 5));

  await b.close();
})();
