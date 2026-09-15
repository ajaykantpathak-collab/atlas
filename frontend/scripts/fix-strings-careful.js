// Carefully fix ONLY broken single-quoted strings (those with unescaped apostrophes)
// Strategy: find 'text' patterns where text contains an apostrophe that breaks the string
// Convert ONLY those to double-quoted strings (escaping any double quotes inside)
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

let fixed = 0;
let totalFixes = 0;

function fixBrokenSingleQuotes(content) {
  // We need to find single-quoted strings that are broken by apostrophes
  // A broken string looks like: 'India's sovereignty is affirmed'
  // The parser sees: 'India' + s sovereignty is affirmed' (broken)
  
  // Strategy: scan character by character, track string state
  // When we find a single-quoted string that ends prematurely (followed by a letter),
  // we know it's broken. Extend to the next single quote and convert to double quotes.
  
  const result = [];
  let i = 0;
  let fixes = 0;
  
  while (i < content.length) {
    // Skip comments
    if (content[i] === '/' && content[i+1] === '/') {
      // Skip to end of line
      while (i < content.length && content[i] !== '\n') {
        result.push(content[i]);
        i++;
      }
      continue;
    }
    
    // Skip block comments
    if (content[i] === '/' && content[i+1] === '*') {
      result.push(content[i]); result.push(content[i+1]);
      i += 2;
      while (i < content.length && !(content[i] === '*' && content[i+1] === '/')) {
        result.push(content[i]);
        i++;
      }
      if (i < content.length) { result.push(content[i]); result.push(content[i+1]); i += 2; }
      continue;
    }
    
    // Skip double-quoted strings
    if (content[i] === '"') {
      result.push(content[i]);
      i++;
      while (i < content.length && content[i] !== '"') {
        if (content[i] === '\\') { result.push(content[i]); result.push(content[i+1]); i += 2; continue; }
        if (content[i] === '\n') break; // broken string, but not our problem
        result.push(content[i]);
        i++;
      }
      if (i < content.length && content[i] === '"') { result.push(content[i]); i++; }
      continue;
    }
    
    // Skip backtick strings (template literals)
    if (content[i] === '`') {
      result.push(content[i]);
      i++;
      while (i < content.length && content[i] !== '`') {
        if (content[i] === '\\') { result.push(content[i]); result.push(content[i+1]); i += 2; continue; }
        if (content[i] === '$' && content[i+1] === '{') {
          // Skip expression
          result.push(content[i]); result.push(content[i+1]); i += 2;
          let depth = 1;
          while (i < content.length && depth > 0) {
            if (content[i] === '{') depth++;
            if (content[i] === '}') depth--;
            result.push(content[i]);
            i++;
          }
          continue;
        }
        result.push(content[i]);
        i++;
      }
      if (i < content.length && content[i] === '`') { result.push(content[i]); i++; }
      continue;
    }
    
    // Handle single-quoted strings
    if (content[i] === "'") {
      // Find the end of the string
      let start = i;
      i++;
      let stringContent = '';
      let broken = false;
      
      while (i < content.length) {
        if (content[i] === '\\') {
          stringContent += content[i] + (content[i+1] || '');
          i += 2;
          continue;
        }
        if (content[i] === "'") {
          // Check if this is the real end or a premature end
          // If next char is a letter or space+letter, it might be broken
          // But we need to be careful - ' is valid end of string
          
          // Look ahead: if next non-space char is a letter, this might be an apostrophe
          let j = i + 1;
          while (j < content.length && content[j] === ' ') j++;
          
          if (j < content.length && /[a-zA-Z]/.test(content[j]) && stringContent.length > 0) {
            // This looks like an apostrophe inside a string (e.g., India's)
            // Treat it as part of the string
            stringContent += "'";
            i++;
            continue;
          } else {
            // This is the real end of the string
            break;
          }
        }
        if (content[i] === '\n') {
          // Newline in single-quoted string - definitely broken
          broken = true;
          break;
        }
        stringContent += content[i];
        i++;
      }
      
      if (i < content.length && content[i] === "'") {
        // Properly terminated string
        // Check if it contains apostrophes (which means it was a broken string that we extended)
        if (stringContent.includes("'")) {
          // Convert to double-quoted string
          // Escape any double quotes inside
          const escaped = stringContent.replace(/"/g, '\\"');
          result.push('"' + escaped + '"');
          fixes++;
        } else {
          result.push("'" + stringContent + "'");
        }
        i++;
      } else {
        // Broken string - just output as-is
        result.push("'" + stringContent);
        if (broken) result.push('\n');
      }
      
      continue;
    }
    
    result.push(content[i]);
    i++;
  }
  
  totalFixes += fixes;
  return { content: result.join(''), fixes };
}

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;
  
  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const { content: fixed_content, fixes } = fixBrokenSingleQuotes(content);
    if (fixed_content !== content) {
      fs.writeFileSync(filePath, fixed_content, 'utf8');
      fixed++;
      console.log(`FIXED: ${dir}/${file} (${fixes} strings)`);
    }
  });
});

console.log(`\n=== FIXED ${fixed} files, ${totalFixes} strings total ===`);
