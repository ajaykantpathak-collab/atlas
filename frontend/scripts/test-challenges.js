const puppeteer = require('puppeteer');

async function testChallenges() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  await page.goto('http://localhost:3000/test-sim', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // Helper: type into an input using keyboard (triggers React onChange)
  async function typeIntoInput(selector, text) {
    const input = await page.$(selector);
    if (!input) { console.log('  INPUT NOT FOUND:', selector); return false; }
    await input.click({ clickCount: 3 }); // select all
    await input.type(text, { delay: 50 });
    return true;
  }

  // Helper: click a button by text
  async function clickButton(text) {
    const clicked = await page.evaluate((t) => {
      const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes(t));
      if (btn) { btn.click(); return true; }
      return false;
    }, text);
    return clicked;
  }

  // Helper: get text content
  async function bodyText() {
    return page.evaluate(() => document.body.textContent);
  }

  // ─── Test Light Ray Challenge 1 ───────────────────────────
  console.log('=== LIGHT RAY: Challenge 1 (number input) ===\n');

  let bt = await bodyText();
  console.log('Formula visible:', bt.includes('∠i = ∠r'));
  console.log('Number input exists:', !!(await page.$('input[type="number"]')));

  // Type WRONG answer (50)
  console.log('\nTyping wrong answer: 50');
  await typeIntoInput('input[type="number"]', '50');
  await new Promise(r => setTimeout(r, 500));

  // Click Check Answer
  await clickButton('Check Answer');
  await new Promise(r => setTimeout(r, 1500));

  bt = await bodyText();
  console.log('After wrong answer:');
  console.log('  Shows misconception:', bt.includes('Misconception:'));
  console.log('  Shows formula:', bt.includes('∠i = ∠r'));
  console.log('  Shows "Given: ∠i = 25°":', bt.includes('Given: ∠i = 25°'));
  console.log('  Shows "Therefore":', bt.includes('Therefore'));

  // Type CORRECT answer (25)
  console.log('\nTyping correct answer: 25');
  await typeIntoInput('input[type="number"]', '25');
  await new Promise(r => setTimeout(r, 500));

  await clickButton('Check Answer');
  await new Promise(r => setTimeout(r, 1500));

  bt = await bodyText();
  console.log('After correct answer:');
  console.log('  Shows ✅ Correct:', bt.includes('✅ Correct!'));
  console.log('  Shows formula:', bt.includes('∠i = ∠r'));
  console.log('  Shows "Given: ∠i = 25°":', bt.includes('Given: ∠i = 25°'));
  console.log('  Shows "Therefore":', bt.includes('Therefore'));
  console.log('  Next button appears:', bt.includes('Next Challenge'));

  // ─── Move to Challenge 2 ──────────────────────────────────
  console.log('\n=== LIGHT RAY: Challenge 2 (mirror formula) ===\n');

  await clickButton('Next Challenge');
  await new Promise(r => setTimeout(r, 1500));

  bt = await bodyText();
  console.log('Question about concave mirror:', bt.includes('concave mirror has focal length f = 20 cm'));
  console.log('Formula 1/f = 1/u + 1/v visible:', bt.includes('1/f = 1/u + 1/v'));
  console.log('Number input present:', !!(await page.$('input[type="number"]')));

  // Type correct answer 30
  console.log('\nTyping correct answer: 30');
  await typeIntoInput('input[type="number"]', '30');
  await new Promise(r => setTimeout(r, 500));

  await clickButton('Check Answer');
  await new Promise(r => setTimeout(r, 1500));

  bt = await bodyText();
  console.log('After correct answer:');
  console.log('  Shows ✅ Correct:', bt.includes('✅ Correct!'));
  console.log('  Shows "Step 1: 1/v = 1/20":', bt.includes('Step 1: 1/v = 1/20'));
  console.log('  Shows "Step 2":', bt.includes('Step 2'));
  console.log('  Shows "Step 3":', bt.includes('Step 3'));
  console.log('  Shows "Step 4":', bt.includes('Step 4'));
  console.log('  Shows "REAL and INVERTED":', bt.includes('REAL and INVERTED'));

  // ─── Move to Challenge 3 (text input) ─────────────────────
  console.log('\n=== LIGHT RAY: Challenge 3 (text input) ===\n');

  await clickButton('Next Challenge');
  await new Promise(r => setTimeout(r, 1500));

  bt = await bodyText();
  console.log('Question about prism:', bt.includes('Prism mode'));
  console.log('Formula about refractive index:', bt.includes('Refractive index'));
  console.log('Textarea present:', !!(await page.$('textarea')));

  // Type an answer
  console.log('\nTyping answer about spread...');
  const textarea = await page.$('textarea');
  if (textarea) {
    await textarea.click();
    await textarea.type('The colors spread wider because higher refractive index bends light more, causing more dispersion between colors.', { delay: 30 });
  }
  await new Promise(r => setTimeout(r, 500));

  await clickButton('Check Answer');
  await new Promise(r => setTimeout(r, 1500));

  bt = await bodyText();
  console.log('After answer:');
  console.log('  Shows ✅ Correct or misconception:', bt.includes('✅ Correct!') || bt.includes('Misconception:'));
  console.log('  Shows working about DISPERSION:', bt.includes('DISPERSION'));

  // ─── Switch to Circuit Builder ────────────────────────────
  console.log('\n\n=== CIRCUIT BUILDER: Challenge 1 (Ohm\'s Law) ===\n');

  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Circuit Builder'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 3000));

  bt = await bodyText();
  console.log('Question about switch ON:', bt.includes('turn ON the switch'));
  console.log("Formula 'I = V / R' visible:", bt.includes('I = V / R'));
  console.log('Number input present:', !!(await page.$('input[type="number"]')));

  // Type correct answer 1.5
  console.log('\nTyping correct answer: 1.5');
  await typeIntoInput('input[type="number"]', '1.5');
  await new Promise(r => setTimeout(r, 500));

  await clickButton('Check Answer');
  await new Promise(r => setTimeout(r, 1500));

  bt = await bodyText();
  console.log('After correct answer:');
  console.log('  Shows ✅ Correct:', bt.includes('✅ Correct!'));
  console.log("  Shows 'Step 1: I = 6 / 4':", bt.includes('Step 1: I = 6 / 4'));
  console.log("  Shows 'Step 2: I = 1.5':", bt.includes('Step 2: I = 1.5'));

  // ─── Console errors ────────────────────────────────────────
  console.log('\n\n=== CONSOLE ERRORS ===');
  if (errors.length === 0) {
    console.log('None — clean console');
  } else {
    errors.forEach(e => console.log('  ERROR:', e));
  }

  await browser.close();
}

testChallenges().catch(err => { console.error('FATAL:', err.message); process.exit(1); });
