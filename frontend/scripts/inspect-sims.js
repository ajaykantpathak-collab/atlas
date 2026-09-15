const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function inspectSims() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(String(err)));

  await page.goto('http://localhost:3000/test-sim', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // ─── Inspect Light Ray ─────────────────────────────────────
  console.log('=== LIGHT RAY SIMULATION ===\n');

  const lightInfo = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    if (!svg) return { found: false };

    const rects = svg.querySelectorAll('rect');
    const circles = svg.querySelectorAll('circle');
    const lines = svg.querySelectorAll('line');
    const paths = svg.querySelectorAll('path');
    const texts = svg.querySelectorAll('text');
    const animates = svg.querySelectorAll('animate, animateTransform, animateMotion');
    const gradients = svg.querySelectorAll('linearGradient, radialGradient');
    const defs = svg.querySelectorAll('defs');

    // Get all visible text content
    const allText = [...document.querySelectorAll('h1,h2,h3,h4,p,span,div,button,label')]
      .map(e => e.textContent.trim())
      .filter(t => t.length > 0 && t.length < 200)
      .slice(0, 40);

    // Get slider values
    const sliders = [...document.querySelectorAll('input[type="range"]')].map(s => ({
      min: s.min, max: s.max, value: s.value,
    }));

    // Get readout values (look for elements with units)
    const readouts = [...document.querySelectorAll('*')]
      .map(e => e.textContent.trim())
      .filter(t => /\d+(\.\d+)?\s*(°|degrees?|cm|m|kg|Hz|V|A|N|J|K|dB|mL)/.test(t))
      .slice(0, 15);

    return {
      found: true,
      svgSize: { width: svg.getAttribute('width'), height: svg.getAttribute('height') },
      elements: { rect: rects.length, circle: circles.length, line: lines.length, path: paths.length, text: texts.length },
      animations: animates.length,
      gradients: gradients.length,
      defs: defs.length,
      sliders,
      readouts,
      textContent: allText,
    };
  });

  console.log('SVG found:', lightInfo.found);
  if (lightInfo.found) {
    console.log('SVG size:', lightInfo.svgSize);
    console.log('SVG elements:', JSON.stringify(lightInfo.elements));
    console.log('Animations:', lightInfo.animations);
    console.log('Gradients:', lightInfo.gradients);
    console.log('Defs:', lightInfo.defs);
    console.log('Sliders:', JSON.stringify(lightInfo.sliders, null, 2));
    console.log('Readouts:', JSON.stringify(lightInfo.readouts, null, 2));
    console.log('Text content (first 20):');
    lightInfo.textContent.slice(0, 20).forEach(t => console.log('  -', t));
  }

  // Move slider and check if readouts change
  console.log('\n--- Moving slider ---');
  const beforeReadouts = await page.evaluate(() => {
    return [...document.querySelectorAll('*')]
      .map(e => e.textContent.trim())
      .filter(t => /\d+.*°|degrees?/.test(t))
      .slice(0, 5);
  });

  await page.evaluate(() => {
    const slider = document.querySelector('input[type="range"]');
    if (slider) {
      slider.value = 70;
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      slider.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  const afterReadouts = await page.evaluate(() => {
    return [...document.querySelectorAll('*')]
      .map(e => e.textContent.trim())
      .filter(t => /\d+.*°|degrees?/.test(t))
      .slice(0, 5);
  });

  console.log('Before slider move:', beforeReadouts);
  console.log('After slider move: ', afterReadouts);
  console.log('Readouts changed:', JSON.stringify(beforeReadouts) !== JSON.stringify(afterReadouts));

  // ─── Switch to Circuit Builder ─────────────────────────────
  console.log('\n\n=== CIRCUIT BUILDER SIMULATION ===\n');

  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Circuit Builder'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 3000));

  const circuitInfo = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    if (!svg) return { found: false };

    const rects = svg.querySelectorAll('rect');
    const circles = svg.querySelectorAll('circle');
    const lines = svg.querySelectorAll('line');
    const paths = svg.querySelectorAll('path');
    const texts = svg.querySelectorAll('text');
    const animates = svg.querySelectorAll('animate, animateTransform, animateMotion');
    const gradients = svg.querySelectorAll('linearGradient, radialGradient');

    const allText = [...document.querySelectorAll('h1,h2,h3,h4,p,span,div,button,label')]
      .map(e => e.textContent.trim())
      .filter(t => t.length > 0 && t.length < 200)
      .slice(0, 40);

    const sliders = [...document.querySelectorAll('input[type="range"]')].map(s => ({
      min: s.min, max: s.max, value: s.value,
    }));

    const readouts = [...document.querySelectorAll('*')]
      .map(e => e.textContent.trim())
      .filter(t => /\d+(\.\d+)?\s*(V|A|Ω|W|volts?|amps?|ohms?|watts?)/i.test(t))
      .slice(0, 15);

    return {
      found: true,
      svgSize: { width: svg.getAttribute('width'), height: svg.getAttribute('height') },
      elements: { rect: rects.length, circle: circles.length, line: lines.length, path: paths.length, text: texts.length },
      animations: animates.length,
      gradients: gradients.length,
      sliders,
      readouts,
      textContent: allText,
    };
  });

  console.log('SVG found:', circuitInfo.found);
  if (circuitInfo.found) {
    console.log('SVG size:', circuitInfo.svgSize);
    console.log('SVG elements:', JSON.stringify(circuitInfo.elements));
    console.log('Animations:', circuitInfo.animations);
    console.log('Gradients:', circuitInfo.gradients);
    console.log('Sliders:', JSON.stringify(circuitInfo.sliders, null, 2));
    console.log('Readouts:', JSON.stringify(circuitInfo.readouts, null, 2));
    console.log('Text content (first 20):');
    circuitInfo.textContent.slice(0, 20).forEach(t => console.log('  -', t));
  }

  // ─── Console errors ────────────────────────────────────────
  console.log('\n\n=== CONSOLE ERRORS ===');
  if (errors.length === 0) {
    console.log('None — clean console');
  } else {
    errors.forEach(e => console.log('  ERROR:', e));
  }

  await browser.close();
}

inspectSims().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
