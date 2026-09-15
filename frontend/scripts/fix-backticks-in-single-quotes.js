// Fix backticks that were incorrectly inserted inside single-quoted strings
// Process each file character by character, tracking string state
// When inside a single-quoted string, replace backticks with apostrophes
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

let fixed = 0;
let totalFixes = 0;

function fixBackticksInStrings(content) {
  const result = [];
  let i = 0;
  let fixes = 0;
  
  while (i < content.length) {
    // Skip line comments
    if (content[i] === '/' && content[i+1] === '/') {
      while (i < content.length && content[i] !== '\n') { result.push(content[i]); i++; }
      continue;
    }
    
    // Skip block comments
    if (content[i] === '/' && content[i+1] === '*') {
      result.push(content[i]); result.push(content[i+1]); i += 2;
      while (i < content.length && !(content[i] === '*' && content[i+1] === '/')) {
        result.push(content[i]); i++;
      }
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
    
    // Handle backtick template literals
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
      result.push(content[i]); i++;
      while (i < content.length && content[i] !== "'" && content[i] !== '\n') {
        if (content[i] === '\\') { result.push(content[i]); result.push(content[i+1] || ''); i += 2; continue; }
        // If we find a backtick inside a single-quoted string, replace it with an apostrophe
        if (content[i] === '`') {
          result.push("'");
          i++;
          fixes++;
          continue;
        }
        result.push(content[i]); i++;
      }
      if (i < content.length && content[i] === "'") { result.push(content[i]); i++; }
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
    
    const { content: fixed_content, fixes } = fixBackticksInStrings(content);
    if (fixed_content !== content) {
      fs.writeFileSync(filePath, fixed_content, 'utf8');
      fixed++;
    }
  });
});

console.log(`Fixed ${fixed} files, ${totalFixes} backticks replaced`);
