// Digest extractor: prints compact grounding for a list of chapter ids.
// Usage: node _digest.js ch1 ch2 ch3 ...
const fs = require('fs');
const path = require('path');
const idx = require('D:/platform/frontend/components/sims_v2/SIM_INDEX.json');
const CACHE = 'C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache';

const byCh = {};
for (const m of Object.values(idx)) {
  if (!byCh[m.ch]) byCh[m.ch] = { t: m.t, d: m.d, n: [] };
  byCh[m.ch].n.push(...m.n);
}

function grab(t, name) {
  const re = new RegExp('## ' + name + '\\r?\\n([\\s\\S]*?)(?=\\r?\\n## |$)');
  const m = t.match(re);
  return m ? m[1].trim().replace(/\s+/g, ' ') : '';
}

for (const ch of process.argv.slice(2)) {
  const info = byCh[ch];
  console.log('===== ' + ch + ' =====');
  if (!info) { console.log('[no index entry]'); continue; }
  console.log('TITLE: ' + info.t);
  const nodes = [...new Set(info.n)].slice(0, 2);
  for (const n of nodes) {
    let t;
    try { t = fs.readFileSync(path.join(CACHE, n + '.md'), 'utf8'); }
    catch (e) { console.log('-- ' + n + ' [missing file]'); continue; }
    console.log('-- ' + n);
    const def = grab(t, 'DEFINITION'); if (def) console.log('DEF: ' + def.slice(0, 350));
    const walk = grab(t, 'WALKTHROUGH'); if (walk) console.log('WALK: ' + walk.slice(0, 550));
    const dq2 = grab(t, 'DIAGNOSTIC_QUESTION_2'); if (dq2) console.log('DQ: ' + dq2.slice(0, 280));
    const da2 = grab(t, 'DIAGNOSTIC_ANSWER_2'); if (da2) console.log('DA: ' + da2.slice(0, 380));
    const dq3 = grab(t, 'DIAGNOSTIC_QUESTION_3'); if (dq3) console.log('DQ3: ' + dq3.slice(0, 240));
    const mc = grab(t, 'COMMON_MISCONCEPTION'); if (mc) console.log('MISCON: ' + mc.slice(0, 380));
  }
}
