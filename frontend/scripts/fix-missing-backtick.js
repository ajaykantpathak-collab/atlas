// Fix missing opening backtick on template literal strings
// Pattern: word: Text with apostrophe's...',
// Should be: word: `Text with apostrophe's...`,
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

let fixed = 0;
let totalFixes = 0;

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;

  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Pattern: word: CapitalLetter...apostrophe...',
    // The content must contain at least one apostrophe (which breaks single-quoted strings)
    // and must NOT start with a quote character
    // Use a simple regex: (\w+:\s+)([A-Z][^\n']*[^\n]*',)
    // But we need to be more careful - the content should contain an apostrophe
    
    // Match: property name, colon, spaces, then text starting with uppercase,
    // containing an apostrophe somewhere, ending with ',
    const regex = /(\w+:\s+)([A-Z][^\n]*?'[^\n]*?',)(?=\s)/g;
    let match;
    const replacements = [];
    while ((match = regex.exec(content)) !== null) {
      const prefix = match[1];
      let value = match[2];
      // Remove trailing ', and add backtick wrapper
      if (value.endsWith("',")) {
        value = value.slice(0, -2); // remove ',
        // Only fix if value doesn't already start with a quote
        if (!value.startsWith("'") && !value.startsWith('"') && !value.startsWith('`')) {
          // Check that value contains an apostrophe (confirming it should be a backtick string)
          if (value.includes("'")) {
            replacements.push({
              start: match.index,
              end: match.index + match[0].length,
              replacement: prefix + '`' + value + '`,'
            });
          }
        }
      }
    }
    
    // Apply replacements in reverse order to not mess up indices
    replacements.reverse();
    for (const r of replacements) {
      content = content.slice(0, r.start) + r.replacement + content.slice(r.end);
    }
    
    if (replacements.length > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      fixed++;
      totalFixes += replacements.length;
    }
  });
});

console.log(`Fixed ${fixed} files, ${totalFixes} strings`);
