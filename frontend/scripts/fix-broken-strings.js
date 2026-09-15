// Fix broken string literals caused by smart-quote replacement
// Finds single-quoted strings with unescaped apostrophes and converts to backtick strings
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

let fixed = 0;

function fixBrokenStrings(content) {
  // Match single-quoted strings that contain apostrophes (broken by encoding fix)
  // Pattern: 'text with apostrophe's here'  →  `text with apostrophe's here`
  // We need to find lines where a single-quoted string is broken by an inner apostrophe
  
  const lines = content.split('\n');
  const fixedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Skip import lines and comments
    if (line.trim().startsWith('//') || line.trim().startsWith('import ')) {
      fixedLines.push(line);
      continue;
    }
    
    // Find single-quoted strings with apostrophes inside
    // Pattern: '...word's...' where the apostrophe breaks the string
    // Replace: convert the string to backtick-quoted
    
    // Match: 'text' where text contains an unescaped apostrophe
    // This is tricky - we need to find broken strings
    
    // Strategy: find all single-quoted string segments on the line
    // A broken string looks like: 'Boyle's Law in action...'
    // Where the first ' opens, the ' in Boyle's closes, and the rest is invalid
    
    // Simple approach: replace 'X's Y' patterns with `X's Y`
    // Match: opening ' ... 's ... ' (where middle ' breaks string)
    
    // More robust: find 'word's and convert enclosing quotes to backticks
    line = line.replace(/'([^']*)'s\s/g, "`$1's ");
    
    // Also handle: 'word's at end of string
    line = line.replace(/'([^']*)'s'/g, "`$1's`");
    
    // Handle possessives and contractions in single-quoted strings
    // Pattern: '...text's...'  →  `...text's...`
    // Find single-quoted strings where content has apostrophe followed by letter
    const stringMatch = line.match(/^(\s*.*?)'([^'\n]*'[^'\n]*?)'(.*)$/);
    if (stringMatch) {
      // Check if the inner content has an odd number of apostrophes (broken)
      const inner = stringMatch[2];
      const apostropheCount = (inner.match(/'/g) || []).length;
      if (apostropheCount % 2 === 1) {
        // Odd number = broken string, convert to backticks
        line = stringMatch[1] + '`' + inner + '`' + stringMatch[3];
      }
    }
    
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
    
    const fixed_content = fixBrokenStrings(content);
    if (fixed_content !== content) {
      fs.writeFileSync(filePath, fixed_content, 'utf8');
      fixed++;
      console.log(`FIXED: ${dir}/${file}`);
    }
  });
});

console.log(`\n=== FIXED ${fixed} files ===`);
