const fs = require('fs');
const map = require('D:/platform/frontend/components/sims_v2/tools/authored/_c11_map.json');
const dir = 'C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache/';
function get(f, name) {
  const m = f.match(new RegExp('## ' + name + '\\r?\\n([\\s\\S]*?)(?=\\r?\\n## )'));
  return m ? m[1].trim() : '';
}
const out = {};
for (const ch of Object.keys(map)) {
  const title = map[ch][0].t.replace(/ · Part.*$/, '');
  const node = map[ch][0].n[0] + '.md';
  let def = '', mis = '', dq = '';
  try {
    const f = fs.readFileSync(dir + node, 'utf8');
    def = get(f, 'DEFINITION').replace(/\s+/g, ' ').slice(0, 420);
    mis = get(f, 'COMMON_MISCONCEPTION').replace(/\s+/g, ' ').slice(0, 350);
    dq = get(f, 'DIAGNOSTIC_QUESTION_1').replace(/\s+/g, ' ').slice(0, 260);
  } catch (e) { def = 'NOFILE ' + node; }
  out[ch] = { title, def, mis, dq };
}
fs.writeFileSync('D:/platform/frontend/components/sims_v2/tools/authored/_c11_ground.json', JSON.stringify(out, null, 1));
let empty = 0;
for (const k of Object.keys(out)) if (!out[k].def || out[k].def.length < 10) empty++;
console.log('done', Object.keys(out).length, 'empty:', empty);
