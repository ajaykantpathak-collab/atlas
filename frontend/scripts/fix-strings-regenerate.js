// Fix corrupted strings in extracted JSON files
// Then regenerate TSX files from fixed JSON + templates
//
// Corruption patterns in strings:
// 1. Duplicated content: "text. text. text." (same content repeated 2-3x)
// 2. Extra quotes: "text'text" or "text`text" (from broken quote conversion)
// 3. Template expression issues: "${..." mangled

const fs = require('fs');
const path = require('path');

const DATA_DIR = 'D:\\dream_app\\frontend\\extracted_data';
const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1', 'class2', 'class3', 'class4', 'class5', 'maths'];

// Fix a single string
function fixString(str) {
  let fixed = str;
  let changed = false;

  // Fix 1: Replace backticks with apostrophes (backticks inside strings are always corruption)
  if (fixed.includes('`')) {
    fixed = fixed.replace(/`/g, "'");
    changed = true;
  }

  // Fix 2: Remove duplicated content
  // Pattern: "text. text" where "text" is repeated
  // Check if the string has duplicated paragraphs
  const trimmed = fixed.trim();
  if (trimmed.length > 100) {
    // Split into sentences/paragraphs and check for duplicates
    const sentences = trimmed.split(/\.\s+/);
    if (sentences.length > 3) {
      // Check if the first half matches the second half
      const half = Math.floor(sentences.length / 2);
      const firstHalf = sentences.slice(0, half).join('. ').trim();
      const secondHalf = sentences.slice(half).join('. ').trim();

      // If first 50 chars match, it's likely duplicated
      if (firstHalf.length > 30 && secondHalf.length > 30 &&
          firstHalf.substring(0, 50) === secondHalf.substring(0, 50)) {
        // Keep only the first half
        fixed = firstHalf + '.';
        changed = true;
      }

      // Also check for tripled content
      if (!changed && sentences.length > 6) {
        const third = Math.floor(sentences.length / 3);
        const first = sentences.slice(0, third).join('. ').trim();
        const second = sentences.slice(third, third * 2).join('. ').trim();
        const third_text = sentences.slice(third * 2).join('. ').trim();
        if (first.length > 30 && second.length > 30 &&
            first.substring(0, 50) === second.substring(0, 50)) {
          fixed = first + '.';
          changed = true;
        }
      }
    }
  }

  // Fix 3: Remove duplicated content by finding repeated substrings
  // More aggressive: find the longest repeated substring
  if (!changed && trimmed.length > 200) {
    // Check if the string contains a sentence that appears twice
    const words = trimmed.split(/\s+/);
    if (words.length > 50) {
      // Check if first 30 words appear again later
      const first30 = words.slice(0, 30).join(' ');
      const restIdx = trimmed.indexOf(first30, first30.length);
      if (restIdx > 0) {
        // Found duplication — keep everything before the second occurrence
        fixed = trimmed.substring(0, restIdx).trim();
        changed = true;
      }
    }
  }

  return { string: fixed, changed };
}

// Regenerate TSX from template + strings
function regenerate(template, strings) {
  let result = template;
  // Replace placeholders with strings
  // Need to handle quote type — for now, use single quotes and escape
  for (let i = strings.length - 1; i >= 0; i--) {
    let s = strings[i];
    // Determine quote type based on content
    let quote = "'";
    let escaped = s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

    // If string contains newlines or ${, use backtick
    if (s.includes('\n') || s.includes('${')) {
      quote = '`';
      escaped = s.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
    }
    // If string contains single quotes but no newlines, use double quotes
    else if (s.includes("'") && !s.includes('"')) {
      quote = '"';
      escaped = s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    }

    result = result.replace(`__STR_${i}__`, quote + escaped + quote);
  }
  return result;
}

let totalFiles = 0;
let totalFixed = 0;
let totalStringsFixed = 0;
let stillBroken = 0;

const parser = require('@babel/parser');

dirs.forEach(dir => {
  const dataDir = path.join(DATA_DIR, dir);
  const simDir = path.join(FRONTEND, dir);
  if (!fs.existsSync(dataDir) || !fs.existsSync(simDir)) return;

  fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).forEach(jsonFile => {
    const baseName = jsonFile.replace('.json', '');
    const jsonPath = path.join(dataDir, jsonFile);
    const templatePath = path.join(dataDir, baseName + '.template');
    const tsxPath = path.join(simDir, baseName + '.tsx');

    if (!fs.existsSync(templatePath) || !fs.existsSync(tsxPath)) return;

    const strings = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const template = fs.readFileSync(templatePath, 'utf8');

    // Fix strings
    let fixedCount = 0;
    const fixedStrings = strings.map(s => {
      const { string: fixed, changed } = fixString(s);
      if (changed) fixedCount++;
      return fixed;
    });

    if (fixedCount > 0) {
      // Regenerate TSX
      const newContent = regenerate(template, fixedStrings);

      // Verify with Babel
      let valid = false;
      try {
        parser.parse(newContent, {
          sourceType: 'module',
          plugins: ['jsx', 'typescript'],
          errorRecovery: true,
        });
        valid = true;
      } catch (e) {
        valid = false;
      }

      if (valid) {
        fs.writeFileSync(tsxPath, newContent, 'utf8');
        totalFixed++;
        totalStringsFixed += fixedCount;
        console.log(`FIXED: ${dir}/${baseName}.tsx (${fixedCount} strings)`);
      } else {
        // Still broken — write anyway, some fixes may have helped
        fs.writeFileSync(tsxPath, newContent, 'utf8');
        totalFixed++;
        totalStringsFixed += fixedCount;
        stillBroken++;
        console.log(`PARTIAL: ${dir}/${baseName}.tsx (${fixedCount} strings, still has parse errors)`);
      }
    }

    totalFiles++;
  });
});

console.log(`\n=== Processed: ${totalFiles}, Fixed: ${totalFixed}, Still broken: ${stillBroken}, Strings fixed: ${totalStringsFixed} ===`);
