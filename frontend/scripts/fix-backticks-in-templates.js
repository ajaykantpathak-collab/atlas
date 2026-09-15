// Fix backticks that should be apostrophes inside template literals
// The smart-quote fix replaced U+2019 (smart right single quote) with regular apostrophe
// But in some cases, U+2019 was actually used as an apostrophe inside backtick strings
// and the replacement turned it into a backtick (code 96) which breaks the template literal
//
// Strategy: find backtick template literals, and inside them replace ` followed by a letter
// with ' followed by that letter (since backtick+letter inside a template literal is almost
// always a broken apostrophe)
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

let fixed = 0;
let totalFixes = 0;

function fixBackticksInTemplateLiterals(content) {
  const result = [];
  let i = 0;
  let fixes = 0;
  
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
    
    // Skip single-quoted strings
    if (content[i] === "'") {
      result.push(content[i]); i++;
      while (i < content.length && content[i] !== "'" && content[i] !== '\n') {
        if (content[i] === '\\') { result.push(content[i]); result.push(content[i+1] || ''); i += 2; continue; }
        result.push(content[i]); i++;
      }
      if (i < content.length && content[i] === "'") { result.push(content[i]); i++; }
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
    
    // Handle backtick template literals
    if (content[i] === '`') {
      result.push(content[i]); i++;
      let templateContent = '';
      
      while (i < content.length) {
        if (content[i] === '\\') {
          templateContent += content[i] + (content[i+1] || '');
          i += 2;
          continue;
        }
        if (content[i] === '$' && content[i+1] === '{') {
          // Expression inside template literal - output as-is
          result.push(templateContent);
          templateContent = '';
          result.push(content[i]); result.push(content[i+1]); i += 2;
          let depth = 1;
          while (i < content.length && depth > 0) {
            if (content[i] === '{') depth++;
            if (content[i] === '}') depth--;
            result.push(content[i]); i++;
          }
          continue;
        }
        if (content[i] === '`') {
          // Check if this is the real closing backtick or a broken apostrophe
          // If next char is a letter, it's likely a broken apostrophe
          // But we need to be careful - `text` is a valid template literal
          
          // Heuristic: if the backtick is followed by a letter and there's no whitespace
          // between the last word and the backtick, it's likely an apostrophe
          // e.g., "Brokers` Association" → "Brokers' Association"
          // But "some text`" at end of line is the real closing backtick
          
          let nextChar = content[i+1] || '';
          let prevChar = templateContent.length > 0 ? templateContent[templateContent.length - 1] : '';
          
          if (/[a-zA-Z]/.test(nextChar) && /[a-zA-Z]/.test(prevChar)) {
            // Backtick between two letters = broken apostrophe
            templateContent += "'";
            i++;
            fixes++;
            continue;
          } else {
            // Real closing backtick
            result.push(templateContent);
            result.push(content[i]); i++;
            break;
          }
        }
        if (content[i] === '\n') {
          templateContent += content[i];
          i++;
          continue;
        }
        templateContent += content[i];
        i++;
      }
      
      // If we exited the loop without finding closing backtick, output what we have
      if (templateContent.length > 0) {
        result.push(templateContent);
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
    
    const { content: fixed_content, fixes } = fixBackticksInTemplateLiterals(content);
    if (fixed_content !== content) {
      fs.writeFileSync(filePath, fixed_content, 'utf8');
      fixed++;
      console.log(`FIXED: ${dir}/${file} (${fixes} backticks)`);
    }
  });
});

console.log(`\n=== FIXED ${fixed} files, ${totalFixes} backticks total ===`);
