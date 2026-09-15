const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
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
  await new Promise(r => setTimeout(r, 3000));
  // Check bottom-left area for mascot
  const info = await p.evaluate(() => {
    const allElements = Array.from(document.querySelectorAll('*'));
    const bottomLeft = allElements.filter(el => {
      const cls = el.className || '';
      return typeof cls === 'string' && cls.includes('bottom-2') && cls.includes('left-2');
    });
    return bottomLeft.map(el => ({
      tag: el.tagName,
      classes: el.className.substring(0, 80),
      children: el.children.length,
      innerHTML: el.innerHTML.substring(0, 200),
    }));
  });
  console.log('Bottom-left elements:', JSON.stringify(info, null, 2));
  await b.close();
})();
