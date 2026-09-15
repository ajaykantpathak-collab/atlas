// Complete revert: restore smart quotes to undo all damage
// We can't restore the exact original bytes, but we can:
// 1. Convert regular apostrophes back to smart quotes (U+2019) in contexts where they break strings
// 2. Only do this for apostrophes that are inside single-quoted strings and would break them

const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

let fixed = 0;

function restoreSmartQuotes(content) {
  // Strategy: find single-quoted strings that contain apostrophes
  // and convert those apostrophes to U+2019 (smart right single quote)
  // This restores the original state where smart quotes were used inside single-quoted strings
  
  const result = [];
  let i = 0;
  
  while (i < content.length) {
    // Skip comments
    if (content[i] === '/' && content[i+1] === '/') {
      while (i < content.length && content[i] !== '\n') { result.push(content[i]); i++; }
      continue;
    }
    if (content[i] === '/' && content[i+1] === '*') {
      result.push(content[i]); result.push(content[i+1]); i += 2;
      while (i < content.length && !(content[i] === '*' && content[i+1] === '/')) { result.push(content[i]); i++; }
      if (i < content.length) { result.push(content[i]); result.push(content[i+1]); i += 2; }
      continue;
    }
    
    // Skip double-quoted strings
    if (content[i] === '"') {
      result.push(content[i]); i++;
      while (i < content.length && content[i] !== '"' && content[i] !== '\n') {
        if (content[i] === '\\') { result.push(content[i]); result.push(content[i+1] || ''); i += 2; continue; }
        result.push(content[i]); i++;
      }
      if (i < content.length && content[i] === '"') { result.push(content[i]); i++; }
      continue;
    }
    
    // Skip backtick strings
    if (content[i] === '`') {
      result.push(content[i]); i++;
      while (i < content.length && content[i] !== '`') {
        if (content[i] === '\\') { result.push(content[i]); result.push(content[i+1] || ''); i += 2; continue; }
        if (content[i] === '$' && content[i+1] === '{') {
          result.push(content[i]); result.push(content[i+1]); i += 2;
          let depth = 1;
          while (i < content.length && depth > 0) {
            if (content[i] === '{') depth++;
            if (content[i] === '}') depth--;
            result.push(content[i]); i++;
          }
          continue;
        }
        result.push(content[i]); i++;
      }
      if (i < content.length && content[i] === '`') { result.push(content[i]); i++; }
      continue;
    }
    
    // Handle single-quoted strings
    if (content[i] === "'") {
      let start = i;
      i++;
      let stringContent = '';
      
      while (i < content.length) {
        if (content[i] === '\\') {
          stringContent += content[i] + (content[i+1] || '');
          i += 2;
          continue;
        }
        if (content[i] === "'") {
          // Check if this is the real end or an apostrophe
          let nextChar = content[i+1] || '';
          let prevChar = stringContent.length > 0 ? stringContent[stringContent.length - 1] : '';
          
          if (/[a-zA-Z]/.test(nextChar) && /[a-zA-Z]/.test(prevChar)) {
            // This is an apostrophe inside the string — restore as smart quote
            stringContent += '\u2019';
            i++;
            continue;
          } else {
            break;
          }
        }
        if (content[i] === '\n') break;
        stringContent += content[i];
        i++;
      }
      
      if (i < content.length && content[i] === "'") {
        result.push("'" + stringContent + "'");
        i++;
      } else {
        result.push("'" + stringContent);
      }
      continue;
    }
    
    result.push(content[i]);
    i++;
  }
  
  return result.join('');
}

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;
  
  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const fixed_content = restoreSmartQuotes(content);
    if (fixed_content !== content) {
      fs.writeFileSync(filePath, fixed_content, 'utf8');
      fixed++;
    }
  });
});

console.log(`Fixed ${fixed} files`);
