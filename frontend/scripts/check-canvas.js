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
  await new Promise(r => setTimeout(r, 6000));
  const info = await p.evaluate(() => {
    return Array.from(document.querySelectorAll('canvas')).map(c => ({
      w: c.width, h: c.height,
      visible: c.offsetParent !== null,
      parentClass: c.parentElement?.className?.substring(0, 60)
    }));
  });
  console.log(JSON.stringify(info, null, 2));
  await b.close();
})();
