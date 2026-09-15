const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
  });
  const p = await b.newPage();
  await p.goto('http://localhost:3000/play', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  let btns = await p.$$('button');
  for (const btn of btns) {
    const t = await p.evaluate(el => el.textContent, btn);
    if (t && t.includes('Maths')) { await btn.click(); break; }
  }
  await new Promise(r => setTimeout(r, 2000));
  btns = await p.$$('button');
  for (const btn of btns) {
    const t = await p.evaluate(el => el.textContent, btn);
    if (t && t.includes('Addition')) { await btn.click(); break; }
  }
  await new Promise(r => setTimeout(r, 5000));

  const result = await p.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return { error: 'no canvas' };
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return { error: 'no webgl' };
    const w = canvas.width, h = canvas.height;
    const positions = [
      { x: 50, y: 50 }, { x: 360, y: 280 },
      { x: 670, y: 510 }, { x: 100, y: 100 },
      { x: 200, y: 200 }, { x: 500, y: 400 },
    ];
    const samples = positions.map(pos => {
      const px = new Uint8Array(4);
      gl.readPixels(pos.x, pos.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
      return { r: px[0], g: px[1], b: px[2] };
    });
    const colors = new Set(samples.map(s => `${s.r},${s.g},${s.b}`));
    return { samples, uniqueColors: colors.size, hasContent: colors.size > 1 };
  });
  console.log('Canvas with swiftshader:', JSON.stringify(result, null, 2));
  await b.close();
})();
