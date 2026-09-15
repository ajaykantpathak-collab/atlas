// Undo the damage from fix-broken-strings.js
// Convert backtick strings WITHOUT ${} expressions back to single quotes
// Then escape apostrophes inside those strings
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

let fixed = 0;

function undoBacktickConversion(content) {
  const lines = content.split('\n');
  const fixedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Skip import lines
    if (line.trim().startsWith('import ')) {
      fixedLines.push(line);
      continue;
    }
    
    // Find backtick strings that DON'T contain ${} (these were likely converted from single quotes)
    // Convert them back to single quotes, escaping any apostrophes inside
    // Be very careful: only convert backtick strings that:
    // 1. Don't contain ${ 
    // 2. Don't contain backticks inside
    // 3. Were likely single-quoted before (contain apostrophes)
    
    // Match `text with apostrophe's` but NOT `text with ${expr}`
    line = line.replace(/`([^`${\n]*'[^`${\n]*)`/g, (match, inner) => {
      // Only convert if it contains an apostrophe (which is why it was converted)
      if (inner.includes("'")) {
        // Escape the apostrophes
        const escaped = inner.replace(/'/g, "\\'");
        return "'" + escaped + "'";
      }
      return match; // Keep as backtick if no apostrophe
    });
    
    fixedLines.push(line);
  }
  
  return fixedLines.join('\n');
}

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;
  
  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const fixed_content = undoBacktickConversion(content);
    if (fixed_content !== content) {
      fs.writeFileSync(filePath, fixed_content, 'utf8');
      fixed++;
    }
  });
});

console.log(`\n=== UNDONE backtick conversion in ${fixed} files ===`);
