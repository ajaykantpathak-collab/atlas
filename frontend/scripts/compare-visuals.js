const puppeteer = require('puppeteer');

async function compareVisuals() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  await page.goto('http://localhost:3000/test-sim', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // ─── Light Ray visual analysis ────────────────────────────
  console.log('=== LIGHT RAY (Tailwind) ===\n');

  const lightVisual = await page.evaluate(() => {
    const main = document.querySelector('[class*="max-w-5xl"]') || document.querySelector('.bg-slate-900');
    if (!main) return { found: false };

    const cs = window.getComputedStyle(main);
    const allElements = [...main.querySelectorAll('*')];

    // Get color palette used
    const colors = new Set();
    const bgs = new Set();
    allElements.forEach(el => {
      const s = window.getComputedStyle(el);
      if (s.color && s.color !== 'rgb(0, 0, 0)') colors.add(s.color);
      if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)') bgs.add(s.backgroundColor);
    });

    // Get border radius usage
    const radii = new Set();
    allElements.forEach(el => {
      const s = window.getComputedStyle(el);
      if (s.borderRadius && s.borderRadius !== '0px') radii.add(s.borderRadius);
    });

    // Get font sizes
    const fonts = new Set();
    allElements.forEach(el => {
      const s = window.getComputedStyle(el);
      if (s.fontSize) fonts.add(s.fontSize);
    });

    // Check for gradients
    const gradients = allElements.filter(el => {
      const s = window.getComputedStyle(el);
      return s.backgroundImage && s.backgroundImage.includes('gradient');
    }).length;

    // Check for shadows
    const shadows = allElements.filter(el => {
      const s = window.getComputedStyle(el);
      return s.boxShadow && s.boxShadow !== 'none';
    }).length;

    // Check for transitions/animations
    const transitions = allElements.filter(el => {
      const s = window.getComputedStyle(el);
      return s.transition && s.transition !== 'all 0s ease 0s';
    }).length;

    // Layout structure
    const grids = allElements.filter(el => el.className && el.className.includes && el.className.includes('grid')).length;
    const flexs = allElements.filter(el => el.className && el.className.includes && el.className.includes('flex')).length;

    return {
      found: true,
      mainBg: cs.backgroundColor,
      mainColor: cs.color,
      mainRadius: cs.borderRadius,
      mainPadding: cs.padding,
      colorCount: colors.size,
      bgCount: bgs.size,
      colors: [...colors].slice(0, 8),
      bgs: [...bgs].slice(0, 8),
      radii: [...radii].slice(0, 5),
      fontSizes: [...fonts].sort(),
      gradientCount: gradients,
      shadowCount: shadows,
      transitionCount: transitions,
      gridCount: grids,
      flexCount: flexs,
      totalElements: allElements.length,
    };
  });

  if (lightVisual.found) {
    console.log('Main container:');
    console.log('  Background:', lightVisual.mainBg);
    console.log('  Text color:', lightVisual.mainColor);
    console.log('  Border radius:', lightVisual.mainRadius);
    console.log('  Padding:', lightVisual.mainPadding);
    console.log('Unique colors:', lightVisual.colorCount);
    console.log('  ', lightVisual.colors.join(', '));
    console.log('Unique backgrounds:', lightVisual.bgCount);
    console.log('  ', lightVisual.bgs.join(', '));
    console.log('Border radii used:', lightVisual.radii.join(', '));
    console.log('Font sizes:', lightVisual.fontSizes.join(', '));
    console.log('Gradients:', lightVisual.gradientCount);
    console.log('Shadows:', lightVisual.shadowCount);
    console.log('Transitions:', lightVisual.transitionCount);
    console.log('Grid layouts:', lightVisual.gridCount);
    console.log('Flex layouts:', lightVisual.flexCount);
    console.log('Total elements:', lightVisual.totalElements);
  }

  // ─── Switch to Circuit Builder ────────────────────────────
  console.log('\n\n=== CIRCUIT BUILDER (Inline styles) ===\n');

  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Circuit Builder'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 3000));

  const circuitVisual = await page.evaluate(() => {
    // CircuitBuilder uses inline styles, so look for the main div
    const main = [...document.querySelectorAll('div')].find(d => {
      const s = window.getComputedStyle(d);
      return s.fontFamily && s.fontFamily.includes('system-ui') && d.children.length > 3;
    });
    if (!main) return { found: false };

    const cs = window.getComputedStyle(main);
    const allElements = [...main.querySelectorAll('*')];

    const colors = new Set();
    const bgs = new Set();
    allElements.forEach(el => {
      const s = window.getComputedStyle(el);
      if (s.color && s.color !== 'rgb(0, 0, 0)') colors.add(s.color);
      if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)') bgs.add(s.backgroundColor);
    });

    const radii = new Set();
    allElements.forEach(el => {
      const s = window.getComputedStyle(el);
      if (s.borderRadius && s.borderRadius !== '0px') radii.add(s.borderRadius);
    });

    const fonts = new Set();
    allElements.forEach(el => {
      const s = window.getComputedStyle(el);
      if (s.fontSize) fonts.add(s.fontSize);
    });

    const gradients = allElements.filter(el => {
      const s = window.getComputedStyle(el);
      return s.backgroundImage && s.backgroundImage.includes('gradient');
    }).length;

    const shadows = allElements.filter(el => {
      const s = window.getComputedStyle(el);
      return s.boxShadow && s.boxShadow !== 'none';
    }).length;

    const transitions = allElements.filter(el => {
      const s = window.getComputedStyle(el);
      return s.transition && s.transition !== 'all 0s ease 0s';
    }).length;

    return {
      found: true,
      mainBg: cs.backgroundColor,
      mainColor: cs.color,
      mainRadius: cs.borderRadius,
      mainPadding: cs.padding,
      colorCount: colors.size,
      bgCount: bgs.size,
      colors: [...colors].slice(0, 8),
      bgs: [...bgs].slice(0, 8),
      radii: [...radii].slice(0, 5),
      fontSizes: [...fonts].sort(),
      gradientCount: gradients,
      shadowCount: shadows,
      transitionCount: transitions,
      totalElements: allElements.length,
    };
  });

  if (circuitVisual.found) {
    console.log('Main container:');
    console.log('  Background:', circuitVisual.mainBg);
    console.log('  Text color:', circuitVisual.mainColor);
    console.log('  Border radius:', circuitVisual.mainRadius);
    console.log('  Padding:', circuitVisual.mainPadding);
    console.log('Unique colors:', circuitVisual.colorCount);
    console.log('  ', circuitVisual.colors.join(', '));
    console.log('Unique backgrounds:', circuitVisual.bgCount);
    console.log('  ', circuitVisual.bgs.join(', '));
    console.log('Border radii used:', circuitVisual.radii.join(', '));
    console.log('Font sizes:', circuitVisual.fontSizes.join(', '));
    console.log('Gradients:', circuitVisual.gradientCount);
    console.log('Shadows:', circuitVisual.shadowCount);
    console.log('Transitions:', circuitVisual.transitionCount);
    console.log('Total elements:', circuitVisual.totalElements);
  }

  // ─── Comparison ────────────────────────────────────────────
  console.log('\n\n=== COMPARISON ===\n');
  if (lightVisual.found && circuitVisual.found) {
    console.log('Metric              | LightRay (Tailwind) | CircuitBuilder (Inline)');
    console.log('--------------------|---------------------|------------------------');
    console.log(`Unique colors       | ${lightVisual.colorCount.toString().padEnd(19)} | ${circuitVisual.colorCount}`);
    console.log(`Unique backgrounds  | ${lightVisual.bgCount.toString().padEnd(19)} | ${circuitVisual.bgCount}`);
    console.log(`Border radii types  | ${lightVisual.radii.length.toString().padEnd(19)} | ${circuitVisual.radii.length}`);
    console.log(`Font sizes          | ${lightVisual.fontSizes.length.toString().padEnd(19)} | ${circuitVisual.fontSizes.length}`);
    console.log(`Gradients           | ${lightVisual.gradientCount.toString().padEnd(19)} | ${circuitVisual.gradientCount}`);
    console.log(`Shadows             | ${lightVisual.shadowCount.toString().padEnd(19)} | ${circuitVisual.shadowCount}`);
    console.log(`Transitions         | ${lightVisual.transitionCount.toString().padEnd(19)} | ${circuitVisual.transitionCount}`);
    console.log(`Total elements      | ${lightVisual.totalElements.toString().padEnd(19)} | ${circuitVisual.totalElements}`);
  }

  await browser.close();
}

compareVisuals().catch(err => { console.error('FATAL:', err.message); process.exit(1); });
