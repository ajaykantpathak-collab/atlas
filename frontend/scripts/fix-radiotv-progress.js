// Fix RadioTVSim.tsx - remove duplicated PROGRESS section and fix the remaining one
const fs = require('fs');
const filePath = 'D:\\dream_app\\frontend\\components\\simulations\\c9_12\\RadioTVSim.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find both PROGRESS sections
const idx1 = content.indexOf('// PROGRESS & LOCAL STORAGE');
const idx2 = content.indexOf('// PROGRESS & LOCAL STORAGE', idx1 + 1);

if (idx1 === -1 || idx2 === -1) {
  console.log('Could not find both PROGRESS sections');
  process.exit(1);
}

// Find the start of the first section (the // === line before it)
const section1Start = content.lastIndexOf('// ==========================================', idx1);
// Find the start of the second section
const section2Start = content.lastIndexOf('// ==========================================', idx2);

console.log('Section 1 starts at:', section1Start);
console.log('Section 2 starts at:', section2Start);

// Find the end of the second section (the // === line before GUIDED DISCOVERY LOGIC)
const discoveryIdx = content.indexOf('// GUIDED DISCOVERY LOGIC', section2Start);
const section2End = content.lastIndexOf('// ==========================================', discoveryIdx);

console.log('Section 2 ends at:', section2End);
console.log('Discovery starts at:', discoveryIdx);

// Remove everything from section1Start to section2Start (the first corrupted section)
const before = content.substring(0, section1Start);
const secondSection = content.substring(section2Start, section2End);
const after = content.substring(section2End);

// Now fix the second section's broken template literals
let fixedSecond = secondSection
  // Fix: localStorage.getItem(c912_mastery_${nodeId}`) → localStorage.getItem(`c912_mastery_${nodeId}`)
  .replace(/localStorage\.getItem\(c912_mastery_\$\{nodeId\}`\)/g, "localStorage.getItem(`c912_mastery_${nodeId}`)")
  // Fix: localStorage.getItem(`); → remove broken line
  .replace(/localStorage\.getItem\(`\);/g, '')
  // Fix: localStorage.getItem(c912_review_${nodeId}`) → localStorage.getItem(`c912_review_${nodeId}`)
  .replace(/localStorage\.getItem\(c912_review_\$\{nodeId\}`\)/g, "localStorage.getItem(`c912_review_${nodeId}`)")
  // Fix: localStorage.setItem(`); → remove broken line
  .replace(/localStorage\.setItem\(`\);/g, '')
  // Fix: localStorage.setItem(c912_mastery_${nodeId}`) → localStorage.setItem(`c912_mastery_${nodeId}`)
  .replace(/localStorage\.setItem\(c912_mastery_\$\{nodeId\}`\)/g, "localStorage.setItem(`c912_mastery_${nodeId}`")
  // Fix: reviewDate.toLocaleDateString(`, JSON.stringify(masteryData)); → remove broken line
  .replace(/reviewDate\.toLocaleDateString\(`, JSON\.stringify\(masteryData\)\);/g, '')
  // Fix: reviewDate.toLocaleDateString(en-IN', { day: `numeric`, month: 'short', year: 'numeric' });
  .replace(/reviewDate\.toLocaleDateString\(en-IN', \{ day: `numeric`, month: 'short', year: 'numeric' \}\);/g, "reviewDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });")

// Remove any leftover broken lines (empty lines that had broken code)
fixedSecond = fixedSecond.replace(/\n\s*\n\s*if \(savedMastery\) \{/g, '\n    if (savedMastery) {');
fixedSecond = fixedSecond.replace(/\n\s*\n\s*setNextReviewDate\(savedReview\);\n\s*\}\n\s*\}, \[nodeId\]\);/g, '\n    setNextReviewDate(savedReview);\n  }, [nodeId]);');
fixedSecond = fixedSecond.replace(/\n\s*\n\s*const saveMasteryProgress/g, '\n\n  const saveMasteryProgress');
fixedSecond = fixedSecond.replace(/\n\s*\n\s*setMasteryScore\(finalScore\);/g, '\n    setMasteryScore(finalScore);');
fixedSecond = fixedSecond.replace(/\n\s*\n\s*\/\/ Spaced Repetition calculation/g, '\n\n    // Spaced Repetition calculation');
fixedSecond = fixedSecond.replace(/\n\s*\n\s*const reviewDate = new Date\(\);/g, '\n    const reviewDate = new Date();');

content = before + fixedSecond + after;

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed RadioTVSim.tsx PROGRESS section');
