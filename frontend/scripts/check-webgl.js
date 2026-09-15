const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
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

  // Check WebGL canvas content
  const result = await p.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return { error: 'no canvas' };
    
    // Try WebGL context
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return { error: 'no webgl', type: canvas.getContext('2d') ? '2d' : 'none' };
    
    // Read a few pixels from the center
    const w = canvas.width, h = canvas.height;
    const pixels = new Uint8Array(4);
    gl.readPixels(Math.floor(w/2), Math.floor(h/2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    
    // Read from a few positions
    const positions = [
      { x: 50, y: 50 },
      { x: Math.floor(w/2), y: Math.floor(h/2) },
      { x: w - 50, y: h - 50 },
      { x: 100, y: 100 },
    ];
    const samples = positions.map(pos => {
      const px = new Uint8Array(4);
      gl.readPixels(pos.x, pos.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
      return { x: pos.x, y: pos.y, r: px[0], g: px[1], b: px[2], a: px[3] };
    });
    
    // Check if all pixels are the same (blank) or varied (has content)
    const colors = new Set(samples.map(s => `${s.r},${s.g},${s.b}`));
    const hasContent = colors.size > 1;
    
    return {
      canvasSize: `${w}x${h}`,
      context: 'webgl',
      samples,
      uniqueColors: colors.size,
      hasContent,
    };
  });
  
  console.log('Canvas content check:', JSON.stringify(result, null, 2));
  await b.close();
})();
