// Usage: node _extract.js <start> <count>
// Reads _worklist.txt, extracts COMMON_MISCONCEPTION from md_cache for nodes[start..start+count),
// writes _batch_src.json {nodeId: misconceptionText}
const fs = require('fs');
const DIR = 'D:/platform/frontend/components/sims_v2/tools/authored';
const MD = 'C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache';
const start = parseInt(process.argv[2], 10);
const count = parseInt(process.argv[3], 10);
const list = fs.readFileSync(DIR + '/_worklist.txt', 'utf8').split('\n').filter(Boolean);
const out = {};
let missing = [];
for (const id of list.slice(start, start + count)) {
  const p = MD + '/' + id + '.md';
  if (!fs.existsSync(p)) { missing.push(id); continue; }
  const t = fs.readFileSync(p, 'utf8');
  const m = t.match(/## COMMON_MISCONCEPTION\r?\n([\s\S]*?)(?=\r?\n## |\s*$)/);
  out[id] = m ? m[1].trim() : '';
}
fs.writeFileSync(DIR + '/_batch_src.json', JSON.stringify(out, null, 1));
console.log('extracted', Object.keys(out).length, 'missing files:', missing.length, missing.slice(0, 5));
const empty = Object.keys(out).filter(k => !out[k]);
console.log('empty fields:', empty.length, empty.slice(0, 5));
