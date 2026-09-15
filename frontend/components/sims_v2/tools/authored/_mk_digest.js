const fs = require('fs');
const path = require('path');
const idx = JSON.parse(fs.readFileSync('D:/platform/frontend/components/sims_v2/SIM_INDEX.json', 'utf8'));
const cache = 'C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache';
const map = {};
for (const k of Object.keys(idx)) {
  const e = idx[k];
  if (!e.ch || !e.ch.startsWith('c12_')) continue;
  if (!map[e.ch]) map[e.ch] = { sims: [], nodes: [] };
  map[e.ch].sims.push({ t: e.t, d: e.d });
  (e.n || []).forEach(n => { if (!map[e.ch].nodes.includes(n)) map[e.ch].nodes.push(n); });
}
function field(txt, name) {
  const re = new RegExp('## ' + name + '\\r?\\n([\\s\\S]*?)(?=\\n## |$)');
  const m = txt.match(re);
  return m ? m[1].trim().replace(/\s+/g, ' ') : '';
}
const digest = {};
for (const ch of Object.keys(map)) {
  const e = map[ch];
  const title = e.sims[0].t.replace(/\s*·\s*Part.*$/, '');
  const d = { title, sub: e.sims[0].d, files: [] };
  for (const n of e.nodes.slice(0, 2)) {
    const fp = path.join(cache, n + '.md');
    if (fs.existsSync(fp)) {
      const txt = fs.readFileSync(fp, 'utf8');
      d.files.push({
        n,
        def: field(txt, 'DEFINITION').slice(0, 350),
        walk: field(txt, 'WALKTHROUGH').slice(0, 350),
        mis: field(txt, 'COMMON_MISCONCEPTION').slice(0, 350),
        dq1: field(txt, 'DIAGNOSTIC_QUESTION_1').slice(0, 300),
        da1: field(txt, 'DIAGNOSTIC_ANSWER_1').slice(0, 250),
        formula: field(txt, 'FORMULA').slice(0, 200)
      });
    }
  }
  digest[ch] = d;
}
fs.writeFileSync('D:/platform/frontend/components/sims_v2/tools/authored/_c12_digest.json', JSON.stringify(digest, null, 1));
const missing = Object.keys(digest).filter(c => digest[c].files.length === 0 || !digest[c].files[0].def);
console.log('digest written:', Object.keys(digest).length, 'empty:', missing.length, missing.slice(0, 10));
