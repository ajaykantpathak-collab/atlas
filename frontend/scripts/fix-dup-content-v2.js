// Fix duplicated content in backtick template literals
// Pattern: `Text...`Text...Text...,
// Fix: `Text...`,
//
// Strategy: Find backtick strings that have a premature close (backtick followed by
// the same text that starts the string). Remove everything from the premature close
// to the end of the duplicated content, and close with `,
//
// IMPORTANT: Only fix when the content after the premature backtick DUPLICATES
// the start of the string. This prevents false positives.

const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

let fixed = 0;
let totalFixes = 0;

function fixDuplicatedBacktick(content) {
  let fixes = 0;

  // Find all backtick string starts (property: ` or just `)
  // and check if they have duplicated content
  const regex = /(\w+:\s*)`([^\n]{20,})`([^\n]{20,})/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const prefix = match[1];
    const firstPart = match[2]; // content before premature close
    const afterClose = match[3]; // content after premature close

    // Check if afterClose starts with the same text as firstPart
    const firstPartStart = firstPart.substring(0, 50).trim();
    const afterCloseStart = afterClose.substring(0, 50).trim();

    if (firstPartStart === afterCloseStart && firstPartStart.length > 20) {
      // This is duplicated content
      // Find the end of the duplicated content (next `,` at end of line or next `.`)
      // Search forward from match.index for the end pattern

      // The duplicated content ends with `,` (possibly after more duplicated text)
      // Find the next `,` that's at the end of a line or after a period
      let searchStart = match.index + match[0].length;
      let endIdx = -1;

      // Look for patterns like: "text.," or "text,\n" that end the duplicated content
      // Search up to 5000 chars forward
      for (let i = searchStart; i < Math.min(searchStart + 10000, content.length); i++) {
        if (content[i] === ',' && (content[i+1] === '\n' || content[i+1] === ' ')) {
          endIdx = i;
          break;
        }
        // Also check for `.,` pattern (content ending with period then comma)
        if (content[i] === '.' && content[i+1] === ',') {
          endIdx = i;
          break;
        }
      }

      if (endIdx > -1) {
        // Replace from match.index to endIdx with: prefix + `firstPart` + ,
        const replacement = prefix + '`' + firstPart + '`,';
        content = content.substring(0, match.index) + replacement + content.substring(endIdx + 1);
        fixes++;

        // Adjust regex position
        regex.lastIndex = match.index + replacement.length;
      }
    }
  }

  totalFixes += fixes;
  return { content, fixes };
}

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;

  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const { content: fixed_content, fixes } = fixDuplicatedBacktick(content);
    if (fixed_content !== content) {
      fs.writeFileSync(filePath, fixed_content, 'utf8');
      fixed++;
      console.log(`FIXED: ${dir}/${file} (${fixes} duplications)`);
    }
  });
});

console.log(`\n=== Fixed ${fixed} files, ${totalFixes} duplications removed ===`);
