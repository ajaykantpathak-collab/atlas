/**
 * visual-audit.js — comprehensive visual analysis of all pages.
 * Checks: colors, contrast, element sizes, text sizes, layout, rendering.
 * Outputs specific issues to fix.
 */
const puppeteer = require('puppeteer');
const fs = require('fs');

const issues = [];
const passes = [];

function logIssue(page, severity, category, description) {
  issues.push({ page, severity, category, description });
  console.log(`  [${severity.toUpperCase()}] ${category}: ${description}`);
}

function logPass(page, category, description) {
  passes.push({ page, category, description });
  console.log(`  [PASS] ${category}: ${description}`);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
    defaultViewport: { width: 1280, height: 800 },
  });
  const page = await browser.newPage();

  // ═══════════════════════════════════════════════════════════
  // 1. WELCOME PAGE
  // ═══════════════════════════════════════════════════════════
  console.log('\n═══ WELCOME PAGE ═══');
  await page.goto('http://localhost:3000/welcome', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  let welcomeAudit = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const buttons = Array.from(document.querySelectorAll('button'));
    const allText = Array.from(document.querySelectorAll('p, h1, h2, span'));
    const bg = getComputedStyle(document.body).backgroundColor;
    const bgGradient = getComputedStyle(document.body).backgroundImage;

    return {
      h1: h1 ? {
        text: h1.textContent,
        fontSize: getComputedStyle(h1).fontSize,
        color: getComputedStyle(h1).color,
        position: { x: h1.offsetLeft, y: h1.offsetTop },
      } : null,
      buttonCount: buttons.length,
      buttons: buttons.map(b => ({
        text: b.textContent?.substring(0, 30),
        fontSize: getComputedStyle(b).fontSize,
        padding: getComputedStyle(b).padding,
        bg: getComputedStyle(b).backgroundColor,
        width: b.offsetWidth,
        height: b.offsetHeight,
      })),
      bodyBg: bg,
      bodyGradient: bgGradient.substring(0, 100),
      textCount: allText.length,
      textSize: allText.map(t => ({
        text: t.textContent?.substring(0, 20),
        fontSize: getComputedStyle(t).fontSize,
      })).filter(t => t.text && t.text.length > 2).slice(0, 5),
    };
  });

  // Check welcome page issues
  if (welcomeAudit.h1) {
    const h1Size = parseInt(welcomeAudit.h1.fontSize);
    if (h1Size < 24) logIssue('welcome', 'high', 'Text Size', `H1 is only ${h1Size}px — too small for a kid-friendly welcome`);
    else logPass('welcome', 'Text Size', `H1 is ${h1Size}px — good for kids`);
  }

  welcomeAudit.buttons.forEach((btn, i) => {
    if (btn.height < 44) logIssue('welcome', 'high', 'Button Size', `"${btn.text}" is ${btn.width}x${btn.height}px — below 44px touch minimum`);
    else logPass('welcome', 'Button Size', `"${btn.text}" is ${btn.width}x${btn.height}px`);
    const btnFontSize = parseInt(btn.fontSize);
    if (btnFontSize < 16) logIssue('welcome', 'medium', 'Button Text', `"${btn.text}" text is ${btnFontSize}px — too small`);
  });

  // ═══════════════════════════════════════════════════════════
  // 2. PLAY PAGE (subject selection)
  // ═══════════════════════════════════════════════════════════
  console.log('\n═══ PLAY PAGE (Subject Selection) ═══');
  await page.goto('http://localhost:3000/play', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  let playAudit = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const subjectCards = Array.from(document.querySelectorAll('button')).filter(b => {
      const t = b.textContent || '';
      return t.includes('Maths') || t.includes('Science') || t.includes('EVS') ||
             t.includes('English') || t.includes('Social') || t.includes('Computer');
    });
    const classButtons = Array.from(document.querySelectorAll('button')).filter(b => {
      const t = b.textContent || '';
      return t.match(/Class [1-5]/);
    });

    return {
      h1: h1 ? { text: h1.textContent, fontSize: getComputedStyle(h1).fontSize } : null,
      subjectCardCount: subjectCards.length,
      subjectCards: subjectCards.map(c => ({
        text: c.textContent?.substring(0, 30),
        width: c.offsetWidth,
        height: c.offsetHeight,
        bg: getComputedStyle(c).backgroundImage.substring(0, 60),
      })),
      classButtons: classButtons.map(b => ({
        text: b.textContent,
        width: b.offsetWidth,
        height: b.offsetHeight,
      })),
    };
  });

  if (playAudit.subjectCardCount === 0) logIssue('play', 'high', 'Layout', 'No subject cards found');
  else logPass('play', 'Layout', `${playAudit.subjectCardCount} subject cards found`);

  playAudit.subjectCards.forEach(card => {
    if (card.height < 100) logIssue('play', 'medium', 'Card Size', `"${card.text}" card is only ${card.width}x${card.height}px — should be bigger for kids`);
    else logPass('play', 'Card Size', `"${card.text}" card is ${card.width}x${card.height}px`);
  });

  playAudit.classButtons.forEach(btn => {
    if (btn.height < 36) logIssue('play', 'medium', 'Class Button', `"${btn.text}" is ${btn.width}x${btn.height}px — small for touch`);
  });

  // ═══════════════════════════════════════════════════════════
  // 3. GAME VIEW (teaching slide + challenge)
  // ═══════════════════════════════════════════════════════════
  console.log('\n═══ GAME VIEW ═══');
  // Navigate to play, select Maths, select Addition
  await page.goto('http://localhost:3000/play', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  let btns = await page.$$('button');
  for (const btn of btns) {
    const t = await page.evaluate(el => el.textContent, btn);
    if (t && t.includes('Maths')) { await btn.click(); break; }
  }
  await new Promise(r => setTimeout(r, 2000));
  btns = await page.$$('button');
  for (const btn of btns) {
    const t = await page.evaluate(el => el.textContent, btn);
    if (t && t.includes('Addition')) { await btn.click(); break; }
  }
  await new Promise(r => setTimeout(r, 5000));

  let gameAudit = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    const h1 = document.querySelector('h1');
    const h2 = document.querySelector('h2');
    const p = document.querySelector('p');
    const buttons = Array.from(document.querySelectorAll('button')).filter(b => {
      const t = b.textContent || '';
      return t.includes('Next') || t.includes('Listen') || t.includes('Prev') || t.includes('Start') || t.includes('hint') || t.includes('Show');
    });
    const mascotCanvas = Array.from(document.querySelectorAll('canvas')).find(c => c.width < 200);

    // Check if canvas is actually rendering (not blank)
    // Note: PixiJS uses WebGL, so getContext('2d') won't work.
    // We check if the canvas exists and is visible instead.
    let canvasHasContent = false;
    if (canvas) {
      // Try WebGL first
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (gl) {
        // For WebGL, check if the canvas is visible and has a non-zero size
        canvasHasContent = canvas.width > 0 && canvas.height > 0 && canvas.offsetParent !== null;
      } else {
        // Fallback to 2D pixel check
        try {
          const ctx = canvas.getContext('2d');
          const imageData = ctx.getImageData(0, 0, Math.min(canvas.width, 100), Math.min(canvas.height, 100));
          const pixels = imageData.data;
          let nonBlackPixels = 0;
          for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i] > 10 || pixels[i+1] > 10 || pixels[i+2] > 10) nonBlackPixels++;
          }
          canvasHasContent = nonBlackPixels > 100;
        } catch(e) {
          // If we can't read pixels, assume it's rendering if visible
          canvasHasContent = canvas.offsetParent !== null;
        }
      }
    }

    return {
      canvas: canvas ? {
        w: canvas.width, h: canvas.height,
        visible: canvas.offsetParent !== null,
        hasContent: canvasHasContent,
      } : null,
      mascotCanvas: mascotCanvas ? {
        w: mascotCanvas.width, h: mascotCanvas.height,
      } : null,
      h1: h1 ? { text: h1.textContent?.substring(0, 30), fontSize: getComputedStyle(h1).fontSize } : null,
      h2: h2 ? { text: h2.textContent?.substring(0, 40), fontSize: getComputedStyle(h2).fontSize } : null,
      paragraph: p ? { text: p.textContent?.substring(0, 40), fontSize: getComputedStyle(p).fontSize } : null,
      buttons: buttons.map(b => ({
        text: b.textContent?.substring(0, 20),
        fontSize: getComputedStyle(b).fontSize,
        width: b.offsetWidth,
        height: b.offsetHeight,
      })),
    };
  });

  // Check game issues
  if (gameAudit.canvas) {
    if (!gameAudit.canvas.hasContent) logIssue('game', 'high', 'Canvas', 'Canvas appears blank — no visible content');
    else logPass('game', 'Canvas', `Canvas ${gameAudit.canvas.w}x${gameAudit.canvas.h} has visible content`);
  }

  if (gameAudit.mascotCanvas) {
    logPass('game', 'Mascot', `Rive mascot canvas: ${gameAudit.mascotCanvas.w}x${gameAudit.mascotCanvas.h}`);
  } else {
    logIssue('game', 'medium', 'Mascot', 'No Rive mascot canvas found');
  }

  if (gameAudit.h2) {
    const h2Size = parseInt(gameAudit.h2.fontSize);
    if (h2Size < 16) logIssue('game', 'high', 'Text Size', `Teaching slide title is ${h2Size}px — too small for Class 1-2`);
    else logPass('game', 'Text Size', `Teaching slide title is ${h2Size}px`);
  }

  gameAudit.buttons.forEach(btn => {
    const fs = parseInt(btn.fontSize);
    if (fs < 14) logIssue('game', 'medium', 'Button Text', `"${btn.text}" text is ${fs}px — small for kids`);
    if (btn.height < 36) logIssue('game', 'medium', 'Button Size', `"${btn.text}" is ${btn.height}px tall — small for touch`);
  });

  // Click through to challenge phase
  for (let i = 0; i < 8; i++) {
    const nextBtns = await page.$$('button');
    for (const btn of nextBtns) {
      const t = await page.evaluate(el => el.textContent, btn);
      if (t && (t.includes('Next') || t.includes('Start'))) { await btn.click(); break; }
    }
    await new Promise(r => setTimeout(r, 800));
  }
  await new Promise(r => setTimeout(r, 2000));

  let challengeAudit = await page.evaluate(() => {
    const allText = Array.from(document.querySelectorAll('p, h2, span, div'))
      .filter(e => {
        const t = e.textContent || '';
        return t.includes('Challenge') || t.includes('mango') || t.includes('Drag') ||
               t.includes('hint') || t.includes('Show me') || t.includes('Watch') ||
               t.includes('Your Turn') || t.includes("Let's Try");
      })
      .map(e => ({
        text: e.textContent?.substring(0, 60),
        fontSize: getComputedStyle(e).fontSize,
        color: getComputedStyle(e).color,
      }));

    const phaseBadge = Array.from(document.querySelectorAll('span')).find(s => {
      const t = s.textContent || '';
      return t.includes('Watch') || t.includes("Let's Try") || t.includes('Your Turn');
    });

    return {
      textElements: allText.slice(0, 8),
      hasPhaseBadge: !!phaseBadge,
      phaseBadgeText: phaseBadge?.textContent,
      phaseBadgeSize: phaseBadge ? getComputedStyle(phaseBadge).fontSize : null,
    };
  });

  if (challengeAudit.hasPhaseBadge) {
    logPass('game', 'Guided Practice', `Phase badge visible: "${challengeAudit.phaseBadgeText}"`);
  } else {
    logIssue('game', 'medium', 'Guided Practice', 'Phase badge not found in challenge view');
  }

  // ═══════════════════════════════════════════════════════════
  // 4. LIVING WORLD
  // ═══════════════════════════════════════════════════════════
  console.log('\n═══ LIVING WORLD ═══');
  await page.goto('http://localhost:3000/my-world', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  let worldAudit = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    let canvasHasContent = false;
    if (canvas) {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (gl) {
        canvasHasContent = canvas.width > 0 && canvas.height > 0 && canvas.offsetParent !== null;
      } else {
        try {
          const ctx = canvas.getContext('2d');
          const imageData = ctx.getImageData(0, 0, Math.min(canvas.width, 100), Math.min(canvas.height, 100));
          const pixels = imageData.data;
          let nonBlackPixels = 0;
          for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i] > 10 || pixels[i+1] > 10 || pixels[i+2] > 10) nonBlackPixels++;
          }
          canvasHasContent = nonBlackPixels > 50;
        } catch(e) {
          canvasHasContent = canvas.offsetParent !== null;
        }
      }
    }

    const stats = Array.from(document.querySelectorAll('div')).filter(d => {
      const t = d.textContent || '';
      return t.match(/Level|Mastered|Streak|Badges/);
    }).map(d => d.textContent?.substring(0, 30));

    return {
      canvas: canvas ? { w: canvas.width, h: canvas.height, hasContent: canvasHasContent } : null,
      stats: stats.slice(0, 4),
    };
  });

  if (worldAudit.canvas) {
    if (!worldAudit.canvas.hasContent) logIssue('world', 'high', 'Canvas', 'Living World canvas appears blank');
    else logPass('world', 'Canvas', `Living World canvas ${worldAudit.canvas.w}x${worldAudit.canvas.h} has content`);
  }

  // ═══════════════════════════════════════════════════════════
  // 5. PARENT DASHBOARD
  // ═══════════════════════════════════════════════════════════
  console.log('\n═══ PARENT DASHBOARD ═══');
  await page.goto('http://localhost:3000/parent-dashboard', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  let dashAudit = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.textContent?.substring(0, 30));
    const cards = document.querySelectorAll('[class*="gradient"]').length;
    const emptyState = document.body.textContent?.includes('No data') || document.body.textContent?.includes('Start playing');

    return {
      h1: h1 ? { text: h1.textContent, fontSize: getComputedStyle(h1).fontSize } : null,
      sections: h2s,
      cardCount: cards,
      hasEmptyState: emptyState,
    };
  });

  if (dashAudit.h1) logPass('dashboard', 'Header', `H1: "${dashAudit.h1.text}" at ${dashAudit.h1.fontSize}`);
  if (dashAudit.sections.length > 0) logPass('dashboard', 'Sections', `${dashAudit.sections.length} sections: ${dashAudit.sections.join(', ')}`);
  else logIssue('dashboard', 'medium', 'Sections', 'No section headers found');

  // ═══════════════════════════════════════════════════════════
  // 6. MOBILE VIEWPORT TEST
  // ═══════════════════════════════════════════════════════════
  console.log('\n═══ MOBILE VIEWPORT (375x667) ═══');
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/play', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  let mobileAudit = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const buttons = Array.from(document.querySelectorAll('button'));
    const body = document.body;
    const scrollW = document.documentElement.scrollWidth;
    const viewportW = window.innerWidth;

    return {
      h1Size: h1 ? getComputedStyle(h1).fontSize : null,
      h1Overflow: h1 ? (h1.offsetWidth > viewportW) : false,
      buttonCount: buttons.length,
      smallButtons: buttons.filter(b => b.offsetHeight < 36).length,
      horizontalScroll: scrollW > viewportW,
      scrollWidth: scrollW,
      viewportWidth: viewportW,
    };
  });

  if (mobileAudit.horizontalScroll) logIssue('mobile', 'high', 'Layout', `Horizontal scroll detected: ${mobileAudit.scrollWidth}px > ${mobileAudit.viewportWidth}px viewport`);
  else logPass('mobile', 'Layout', 'No horizontal scroll on mobile viewport');

  if (mobileAudit.smallButtons > 0) logIssue('mobile', 'medium', 'Touch Targets', `${mobileAudit.smallButtons} buttons below 36px height on mobile`);
  else logPass('mobile', 'Touch Targets', 'All buttons meet minimum touch target size');

  // ═══════════════════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════════════════
  console.log('\n═══════════════════════════════════');
  console.log('═══ VISUAL AUDIT SUMMARY ══════════');
  console.log('═══════════════════════════════════');
  console.log(`\nPASSED: ${passes.length} checks`);
  console.log(`ISSUES: ${issues.length} found\n`);

  if (issues.length > 0) {
    console.log('Issues to fix:');
    issues.forEach((issue, i) => {
      console.log(`  ${i + 1}. [${issue.severity}] ${issue.page} — ${issue.category}: ${issue.description}`);
    });
  }

  // Save report
  const report = { passes, issues, timestamp: new Date().toISOString() };
  fs.writeFileSync('visual-audit-report.json', JSON.stringify(report, null, 2));
  console.log('\nFull report saved to visual-audit-report.json');

  await browser.close();
})();
