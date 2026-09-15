// Extract all string literals from a TSX file into JSON
// and create a template with placeholders
//
// Strategy:
// - Scan the file character by character
// - When we find a string start (', ", `), extract the string content
// - Replace the string with a placeholder __STR_N__
// - Save the strings as a JSON array
//
// The key insight: we don't need to parse TS — we just need to find strings
// For broken strings (mismatched quotes), we use heuristics to find the end

const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const OUTPUT_DIR = 'D:\\dream_app\\frontend\\extracted_data';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

function extractStrings(content) {
  const strings = [];
  let template = '';
  let i = 0;
  let line = 1;
  let col = 1;

  while (i < content.length) {
    const ch = content[i];

    // Skip line comments
    if (ch === '/' && content[i + 1] === '/') {
      while (i < content.length && content[i] !== '\n') {
        template += content[i];
        i++; col++;
      }
      continue;
    }

    // Skip block comments
    if (ch === '/' && content[i + 1] === '*') {
      template += '/*';
      i += 2; col += 2;
      while (i < content.length && !(content[i] === '*' && content[i + 1] === '/')) {
        template += content[i];
        if (content[i] === '\n') { line++; col = 1; } else { col++; }
        i++;
      }
      if (i < content.length) { template += '*/'; i += 2; col += 2; }
      continue;
    }

    // Handle single-quoted strings
    if (ch === "'") {
      let str = '';
      i++; col++;
      while (i < content.length) {
        if (content[i] === '\\') {
          str += content[i] + (content[i + 1] || '');
          i += 2; col += 2;
          continue;
        }
        if (content[i] === "'") {
          // Check if this is really the end
          // Look ahead: if next non-space char is a letter, it might be an apostrophe
          let j = i + 1;
          while (j < content.length && content[j] === ' ') j++;
          if (j < content.length && /[a-zA-Z]/.test(content[j]) && str.length > 0) {
            // This might be an apostrophe inside the string
            // But it could also be the real end followed by a property name
            // Heuristic: if the string is long (>20 chars), treat ' as end
            // If short, treat as apostrophe
            if (str.length > 30) {
              break; // Real end
            } else {
              str += "'";
              i++; col++;
              continue;
            }
          }
          break; // Real end
        }
        if (content[i] === '`') {
          // Backtick inside single-quoted string = broken apostrophe
          str += "'";
          i++; col++;
          continue;
        }
        if (content[i] === '\n') {
          // Newline in single-quoted string = broken string
          // Treat as end
          break;
        }
        str += content[i];
        i++; col++;
      }
      if (i < content.length && content[i] === "'") { i++; col++; }
      const idx = strings.length;
      strings.push(str);
      template += `__STR_${idx}__`;
      continue;
    }

    // Handle double-quoted strings
    if (ch === '"') {
      let str = '';
      i++; col++;
      while (i < content.length) {
        if (content[i] === '\\') {
          str += content[i] + (content[i + 1] || '');
          i += 2; col += 2;
          continue;
        }
        if (content[i] === '"') {
          break;
        }
        if (content[i] === '\n') {
          break;
        }
        str += content[i];
        i++; col++;
      }
      if (i < content.length && content[i] === '"') { i++; col++; }
      const idx = strings.length;
      strings.push(str);
      template += `__STR_${idx}__`;
      continue;
    }

    // Handle backtick strings (template literals)
    if (ch === '`') {
      let str = '';
      i++; col++;
      while (i < content.length) {
        if (content[i] === '\\') {
          str += content[i] + (content[i + 1] || '');
          i += 2; col += 2;
          continue;
        }
        if (content[i] === '$' && content[i + 1] === '{') {
          // Template expression — skip it but keep in template
          // For now, just include it in the string
          str += '${';
          i += 2; col += 2;
          let depth = 1;
          while (i < content.length && depth > 0) {
            if (content[i] === '{') depth++;
            if (content[i] === '}') depth--;
            str += content[i];
            i++; col++;
          }
          continue;
        }
        if (content[i] === '`') {
          break;
        }
        if (content[i] === '\n') {
          str += content[i];
          i++; col = 1; line++;
          continue;
        }
        str += content[i];
        i++; col++;
      }
      if (i < content.length && content[i] === '`') { i++; col++; }
      const idx = strings.length;
      strings.push(str);
      template += `__STR_${idx}__`;
      continue;
    }

    template += ch;
    if (ch === '\n') { line++; col = 1; } else { col++; }
    i++;
  }

  return { strings, template };
}

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

let totalFiles = 0;
let totalStrings = 0;

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;

  const outDir = path.join(OUTPUT_DIR, dir);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf8');

    const { strings, template } = extractStrings(content);

    const baseName = file.replace('.tsx', '');
    const jsonPath = path.join(outDir, baseName + '.json');
    const templatePath = path.join(outDir, baseName + '.template');

    fs.writeFileSync(jsonPath, JSON.stringify(strings, null, 2), 'utf8');
    fs.writeFileSync(templatePath, template, 'utf8');

    totalFiles++;
    totalStrings += strings.length;
  });
});

console.log(`Extracted ${totalStrings} strings from ${totalFiles} files`);
console.log(`Output: ${OUTPUT_DIR}`);
