const fs = require('fs');
const path = require('path');
const nodes = fs.readFileSync('_nodelist.txt', 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
const dir = 'C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache/';
const out = {}; const missing = [];
for (const n of nodes) {
  try {
    const t = fs.readFileSync(path.join(dir, n + '.md'), 'utf8');
    const m = t.match(/## COMMON_MISCONCEPTION\r?\n([\s\S]*?)(?=\r?\n## |$)/);
    if (m && m[1].trim()) out[n] = m[1].trim(); else missing.push(n);
  } catch (e) { missing.push(n); }
}
fs.writeFileSync('_misc_raw.json', JSON.stringify(out));
fs.writeFileSync('_missing.txt', missing.join('\n'));
console.log('extracted:', Object.keys(out).length, 'missing:', missing.length);
