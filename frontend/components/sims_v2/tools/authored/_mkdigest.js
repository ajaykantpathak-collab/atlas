const fs = require('fs');
const m = JSON.parse(fs.readFileSync('D:/platform/frontend/components/sims_v2/tools/authored/_chmap.json', 'utf8'));
const dir = 'C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache/';

function grab(txt, key, max) {
  const re = new RegExp('## ' + key + '\\r?\\n([\\s\\S]*?)(?=\\r?\\n## |$)');
  const mt = txt.match(re);
  return mt ? mt[1].trim().slice(0, max) : '';
}

const chs = Object.keys(m).sort();
const perBatch = Math.ceil(chs.length / 8);
for (let b = 0; b < 8; b++) {
  const batch = chs.slice(b * perBatch, (b + 1) * perBatch);
  let out = '';
  for (const ch of batch) {
    out += '\n########## ' + ch + ' | ' + m[ch].titles[0] + '\n';
    const nodes = m[ch].nodes.slice(0, 2);
    for (const n of nodes) {
      const p = dir + n + '.md';
      if (!fs.existsSync(p)) { out += '[missing ' + n + ']\n'; continue; }
      const txt = fs.readFileSync(p, 'utf8');
      out += '-- ' + n + ' --\n';
      out += 'DEF: ' + grab(txt, 'DEFINITION', 350) + '\n';
      out += 'WALK: ' + grab(txt, 'WALKTHROUGH', 450) + '\n';
      out += 'MISC: ' + grab(txt, 'COMMON_MISCONCEPTION', 320) + '\n';
      out += 'DQ1: ' + grab(txt, 'DIAGNOSTIC_QUESTION_1', 160) + '\n';
      out += 'CQ1: ' + grab(txt, 'COMPETENCY_QUESTION_1', 350) + '\n';
    }
  }
  fs.writeFileSync('D:/platform/frontend/components/sims_v2/tools/authored/_batch' + b + '.txt', out);
  console.log('batch' + b, batch.length, 'chs', out.length, 'chars', batch[0], '->', batch[batch.length - 1]);
}
