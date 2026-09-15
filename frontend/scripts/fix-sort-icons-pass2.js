// fix-sort-icons-pass2.js — Fix prop assignments and syntax errors from pass 1

const fs = require('fs');
const path = require('path');

const class1Dir = 'D:\\dream_app\\frontend\\components\\simulations\\class1';

const files = fs.readdirSync(class1Dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(class1Dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Fix 1: Revert emoji={renderSortIcon(item.id, 48)} back to emoji={item.emoji}
  // These are prop assignments, not JSX rendering — the emoji prop expects a string
  if (content.includes('emoji={renderSortIcon(item.id, 48)}')) {
    content = content.replace(/emoji=\{renderSortIcon\(item\.id, 48\)\}/g, 'emoji={item.emoji}');
    modified = true;
  }
  if (content.includes('emoji={renderSortIcon(id, 48)}')) {
    content = content.replace(/emoji=\{renderSortIcon\(id, 48\)\}/g, 'emoji={emoji}');
    modified = true;
  }

  // Fix 2: Fix AirGame syntax — {renderSortIcon(id, 48)}} should be renderSortIcon(id, 48)}
  // (inside a ternary chain, no extra curly braces needed)
  if (content.includes('{renderSortIcon(id, 48)}}')) {
    content = content.replace(/\{renderSortIcon\(id, 48\)\}\}/g, 'renderSortIcon(id, 48)}');
    modified = true;
  }

  // Fix 3: ComputerBasicsGame — BookIcon doesn't exist, replace with MonitorIcon
  if (file === 'ComputerBasicsGame.tsx' && content.includes('BookIcon')) {
    content = content.replace(/BookIcon/g, 'MonitorIcon');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`FIXED: ${file}`);
  }
}
console.log('Done!');
