// Undo: convert letter`letter back to letter'letter
// (undoing the damage from undo-backtick-fix.js)
const fs = require('fs');
const path = require('path');

const FRONTEND = 'D:\\dream_app\\frontend\\components\\simulations';
const dirs = ['c9_12', 'c6_8', 'class1'];

let fixed = 0;

dirs.forEach(dir => {
  const dirPath = path.join(FRONTEND, dir);
  if (!fs.existsSync(dirPath)) return;
  
  fs.readdirSync(dirPath).filter(f => f.endsWith('.tsx')).forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;
    
    // Convert letter`letter back to letter'letter
    content = content.replace(/([a-zA-Z])`([a-zA-Z])/g, "$1'$2");
    
    if (content !== orig) {
      fs.writeFileSync(filePath, content, 'utf8');
      fixed++;
    }
  });
});

console.log(`Fixed ${fixed} files`);
