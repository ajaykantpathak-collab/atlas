const fs = require('fs');
const path = require('path');
const cache = 'C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache';
const map = JSON.parse(fs.readFileSync('D:/platform/frontend/components/sims_v2/tools/authored/_ch_nodes.json', 'utf8'));
function field(txt, name) {
  const re = new RegExp('## ' + name + '\\r?\\n([\\s\\S]*?)(?=\\r?\\n## |$)');
  const m = txt.match(re);
  return m ? m[1].trim().replace(/\r?\n/g, ' ') : '';
}
const chs = Object.keys(map).sort();
const BATCH = 14;
let bi = 0;
for (let i = 0; i < chs.length; i += BATCH) {
  const lines = [];
  for (const ch of chs.slice(i, i + BATCH)) {
    lines.push('===== ' + ch + ' =====');
    for (const n of map[ch].slice(0, 2)) {
      let t = '';
      try { t = fs.readFileSync(path.join(cache, n + '.md'), 'utf8'); } catch (e) { continue; }
      lines.push('-- ' + n);
      const f = (k, l) => { const v = field(t, k).slice(0, l); if (v) lines.push(k + ': ' + v); };
      f('DEFINITION', 350);
      f('WALKTHROUGH', 450);
      f('COMMON_MISCONCEPTION', 400);
      f('COMPETENCY_QUESTION_1', 400);
      f('WORKED_EXAMPLE_1', 350);
      f('THIS_FORMULA', 120);
    }
    lines.push('');
  }
  const p = 'D:/platform/frontend/components/sims_v2/tools/authored/_batch_' + String(bi).padStart(2, '0') + '.txt';
  fs.writeFileSync(p, lines.join('\n'));
  bi++;
}
console.log('batches', bi);
