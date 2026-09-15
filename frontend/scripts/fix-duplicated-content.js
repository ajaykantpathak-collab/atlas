// Fix duplicated content in backtick template literals
// Pattern: `Text...`Text...`,  (duplicated content with backtick in middle)
// Fix: `Text...`,
//
// This is a character-by-character parser that:
// 1. Tracks backtick string state
// 2. When a backtick is found inside a backtick string, checks if the content
//    after it duplicates the content before it
// 3. If so, removes the duplication

const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

let fixed = 0;
let totalFixes = 0;

function fixDuplicatedBacktickContent(content) {
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
      while (i < content.length && !(content[i] === '*' && content[i+1] === '/')) {
        result.push(content[i]); i++;
      }
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
      let stringContent = '';

      while (i < content.length) {
        if (content[i] === '\\') {
          stringContent += content[i] + (content[i+1] || '');
          i += 2;
          continue;
        }
        if (content[i] === '$' && content[i+1] === '{') {
          // Expression - output as-is
          result.push(stringContent);
          stringContent = '';
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
          // Check if this is a premature close (duplicated content)
          // Look ahead to see if the content after this backtick matches the start of stringContent
          let afterBacktick = content.substring(i + 1, Math.min(i + 1 + 200, content.length));

          // Get the first 100 chars of stringContent (skipping whitespace)
          let contentStart = stringContent.replace(/^\s+/, '').substring(0, 100);
          let afterStart = afterBacktick.replace(/^\s+/, '').substring(0, 100);

          // Check if the content after the backtick duplicates the start of the string
          if (contentStart.length > 20 && afterStart.length > 20 &&
              contentStart === afterStart) {
            // This is a duplicated content section - skip the backtick and the duplicated content
            // Find where the duplicated content ends (it should end with another backtick)
            let dupEnd = content.indexOf('`', i + 1);
            if (dupEnd !== -1 && dupEnd < i + 1 + stringContent.length + 100) {
              // Skip from current backtick to the end of the duplication
              i = dupEnd + 1; // Move past the closing backtick of the duplication
              fixes++;
              continue;
            }
          }

          // Real closing backtick
          result.push(stringContent);
          result.push(content[i]); i++;
          break;
        }
        stringContent += content[i];
        i++;
      }

      if (stringContent.length > 0) {
        result.push(stringContent);
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

    const { content: fixed_content, fixes } = fixDuplicatedBacktickContent(content);
    if (fixed_content !== content) {
      fs.writeFileSync(filePath, fixed_content, 'utf8');
      fixed++;
      if (fixes > 0) {
        console.log(`FIXED: ${dir}/${file} (${fixes} duplications)`);
      }
    }
  });
});

console.log(`\n=== Fixed ${fixed} files, ${totalFixes} duplications removed ===`);
