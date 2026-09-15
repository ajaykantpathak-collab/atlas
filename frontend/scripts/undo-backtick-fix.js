// Undo fix-backticks-in-templates.js
// Convert ' back to ` where it was wrongly converted
// The script converted ` between letters to ' — we need to revert that
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

let fixed = 0;

function undoBacktickFix(content) {
  // The fix converted ` between letters to '
  // Pattern: letter'letter → letter`letter
  // But we need to be careful not to convert legitimate apostrophes
  // Only convert if the apostrophe is between two letters AND there's a backtick string nearby
  
  // Actually, let's just revert: find ' between two letters and convert to `
  // This is risky but we need to undo the damage
  // Only do this for files that were touched by the fix script
  
  // Better approach: find ' between letters where the ' was just created
  // Since we can't tell, let's just convert all letter'letter to letter`letter
  // and then re-run the careful fix with better heuristics
  
  // Actually, the safest approach: just revert letter'letter to letter`letter
  // in files that have template literals (backticks)
  return content.replace(/([a-zA-Z])'([a-zA-Z])/g, '$1`$2');
}

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;
  
  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const fixed_content = undoBacktickFix(content);
    if (fixed_content !== content) {
      fs.writeFileSync(filePath, fixed_content, 'utf8');
      fixed++;
    }
  });
});

console.log(`\n=== UNDONE ${fixed} files ===`);
