const puppeteer = require('puppeteer');

async function compareStructure() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  await page.goto('http://localhost:3000/test-sim', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // ─── Light Ray structure ──────────────────────────────────
  console.log('=== LIGHT RAY STRUCTURE ===\n');

  const lightStructure = await page.evaluate(() => {
    function getStructure(el, depth = 0) {
      if (depth > 2) return null;
      const children = [...el.children];
      return {
        tag: el.tagName,
        class: (el.className || '').substring(0, 60),
        text: el.textContent.trim().substring(0, 40),
        childCount: children.length,
        children: children.slice(0, 5).map(c => getStructure(c, depth + 1)).filter(Boolean),
      };
    }

    // Get section headings in order
    const headings = [...document.querySelectorAll('h1, h2, h3, h4')]
      .map(h => h.textContent.trim().substring(0, 50))
      .filter(t => t.length > 0);

    // Get all buttons in order
    const buttons = [...document.querySelectorAll('button')]
      .map(b => b.textContent.trim().substring(0, 30))
      .filter(t => t.length > 0);

    // Get all inputs
    const inputs = [...document.querySelectorAll('input, textarea')]
      .map(i => ({ type: i.type || 'textarea', placeholder: i.placeholder?.substring(0, 30) }))
      .filter(i => i.type !== 'hidden');

    // Check for tabs
    const hasTabs = document.body.textContent.includes('ELI5') && document.body.textContent.includes('Theory') && document.body.textContent.includes('Misconceptions');

    // Check for editable readouts
    const numberInputs = document.querySelectorAll('input[type="number"]').length;

    // Check for reset button
    const hasReset = !![...document.querySelectorAll('button')].find(b => b.textContent.includes('Reset'));

    // Check for min/max labels on sliders
    const hasMinMaxLabels = document.body.textContent.includes('(Top)') || document.body.textContent.includes('(Bottom)') || document.body.textContent.includes('(Dead)') || document.body.textContent.includes('(High');

    return { headings, buttons, inputs, hasTabs, numberInputs, hasReset, hasMinMaxLabels };
  });

  console.log('Section headings (in order):');
  lightStructure.headings.forEach((h, i) => console.log(`  ${i + 1}. ${h}`));
  console.log('\nButtons (in order):');
  lightStructure.buttons.forEach((b, i) => console.log(`  ${i + 1}. ${b}`));
  console.log('\nInputs:');
  lightStructure.inputs.forEach((inp, i) => console.log(`  ${i + 1}. type=${inp.type} placeholder="${inp.placeholder || ''}"`));
  console.log('\nHas tabs (ELI5/Theory/Misconceptions):', lightStructure.hasTabs);
  console.log('Number inputs (editable readouts):', lightStructure.numberInputs);
  console.log('Has Reset button:', lightStructure.hasReset);
  console.log('Has min/max slider labels:', lightStructure.hasMinMaxLabels);

  // ─── Switch to Circuit Builder ────────────────────────────
  console.log('\n\n=== CIRCUIT BUILDER STRUCTURE ===\n');

  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Circuit Builder'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 3000));

  const circuitStructure = await page.evaluate(() => {
    const headings = [...document.querySelectorAll('h1, h2, h3, h4')]
      .map(h => h.textContent.trim().substring(0, 50))
      .filter(t => t.length > 0);

    const buttons = [...document.querySelectorAll('button')]
      .map(b => b.textContent.trim().substring(0, 30))
      .filter(t => t.length > 0);

    const inputs = [...document.querySelectorAll('input, textarea')]
      .map(i => ({ type: i.type || 'textarea', placeholder: i.placeholder?.substring(0, 30) }))
      .filter(i => i.type !== 'hidden');

    const hasTabs = document.body.textContent.includes('ELI5') && document.body.textContent.includes('Theory') && document.body.textContent.includes('Misconceptions');
    const numberInputs = document.querySelectorAll('input[type="number"]').length;
    const hasReset = !![...document.querySelectorAll('button')].find(b => b.textContent.includes('Reset'));
    const hasMinMaxLabels = document.body.textContent.includes('(Dead)') || document.body.textContent.includes('(High');

    return { headings, buttons, inputs, hasTabs, numberInputs, hasReset, hasMinMaxLabels };
  });

  console.log('Section headings (in order):');
  circuitStructure.headings.forEach((h, i) => console.log(`  ${i + 1}. ${h}`));
  console.log('\nButtons (in order):');
  circuitStructure.buttons.forEach((b, i) => console.log(`  ${i + 1}. ${b}`));
  console.log('\nInputs:');
  circuitStructure.inputs.forEach((inp, i) => console.log(`  ${i + 1}. type=${inp.type} placeholder="${inp.placeholder || ''}"`));
  console.log('\nHas tabs (ELI5/Theory/Misconceptions):', circuitStructure.hasTabs);
  console.log('Number inputs (editable readouts):', circuitStructure.numberInputs);
  console.log('Has Reset button:', circuitStructure.hasReset);
  console.log('Has min/max slider labels:', circuitStructure.hasMinMaxLabels);

  // ─── Comparison ────────────────────────────────────────────
  console.log('\n\n=== STRUCTURE COMPARISON ===\n');
  console.log('Feature              | LightRay | CircuitBuilder');
  console.log('---------------------|----------|----------------');
  console.log(`Has tabs             | ${lightStructure.hasTabs}    | ${circuitStructure.hasTabs}`);
  console.log(`Number inputs        | ${lightStructure.numberInputs}        | ${circuitStructure.numberInputs}`);
  console.log(`Has Reset button     | ${lightStructure.hasReset}    | ${circuitStructure.hasReset}`);
  console.log(`Has min/max labels   | ${lightStructure.hasMinMaxLabels}    | ${circuitStructure.hasMinMaxLabels}`);
  console.log(`Heading count        | ${lightStructure.headings.length}        | ${circuitStructure.headings.length}`);
  console.log(`Button count         | ${lightStructure.buttons.length}        | ${circuitStructure.buttons.length}`);
  console.log(`Input count          | ${lightStructure.inputs.length}        | ${circuitStructure.inputs.length}`);

  await browser.close();
}

compareStructure().catch(err => { console.error('FATAL:', err.message); process.exit(1); });
