// Carefully undo ALL damage from fix scripts
// 1. Revert unknown back to any (undo the any-type fix)
// 2. Revert escaped apostrophes back to smart quotes (undo string fixes)
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

let fixed = 0;

function revertAll(content) {
  // 1. Revert unknown back to any
  content = content.replace(/:\s*unknown\[\]/g, ': any[]');
  content = content.replace(/:\s*unknown\b/g, ': any');
  content = content.replace(/<unknown>/g, '<any>');
  content = content.replace(/as unknown\b/g, 'as any');
  
  // 2. Revert escaped apostrophes \' back to '
  // (fix-broken-strings converted ' to ` then undo-backtick converted back to ' with escaped \')
  content = content.replace(/\\'/g, "'");
  
  return content;
}

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;
  
  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const fixed_content = revertAll(content);
    if (fixed_content !== content) {
      fs.writeFileSync(filePath, fixed_content, 'utf8');
      fixed++;
    }
  });
});

console.log(`\n=== REVERTED ${fixed} files ===`);
