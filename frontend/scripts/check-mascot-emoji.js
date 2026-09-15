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
  const info = await p.evaluate(() => {
    const allDivs = Array.from(document.querySelectorAll('div'));
    const mascotElements = allDivs.filter(d => {
      const text = d.textContent || '';
      return text.length < 10 && text.match(/🐶|🦉|⏳|😢|🤔|🎉/);
    });
    return mascotElements.map(e => ({
      text: e.textContent,
      size: e.offsetWidth + 'x' + e.offsetHeight,
      classes: e.className.substring(0, 60),
    }));
  });
  console.log('Mascot elements:', JSON.stringify(info, null, 2));
  await b.close();
})();
