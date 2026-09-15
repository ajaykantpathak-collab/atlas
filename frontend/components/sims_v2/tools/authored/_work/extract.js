// Usage: node extract.js <listfile.json> <start> <end>
// Dumps compact COMPETENCY_QUESTION material for chapters[start..end)
const fs = require('fs');
const W = 'D:/platform/frontend/components/sims_v2/tools/authored/_work/';
const MD = 'C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache/';
const [listfile, start, end] = process.argv.slice(2);
const list = JSON.parse(fs.readFileSync(W + listfile, 'utf8'));
const out = [];
for (const c of list.slice(+start, +end)) {
  let qs = [];
  for (const n of c.n) {
    const p = MD + n + '.md';
    if (!fs.existsSync(p)) continue;
    const t = fs.readFileSync(p, 'utf8');
    const secs = t.split(/## COMPETENCY_QUESTION_\d+/).slice(1);
    for (const s of secs) {
      if (qs.length >= 3) break;
      const qm = s.match(/QUESTION:\s*([\s\S]*?)\n\s*COMPETENCY:/);
      const am = s.match(/\n\s*ANSWER:\s*([\s\S]*?)\n\s*DIFFICULTY:/);
      if (qm && am) qs.push({ q: qm[1].replace(/\s+/g, ' ').trim().slice(0, 380), a: am[1].replace(/\s+/g, ' ').trim().slice(0, 300) });
    }
    if (qs.length) break;
  }
  out.push('### ' + c.k + ' | ' + c.t + ' | ' + c.s + '\n' + qs.map((x, i) => `Q${i + 1}: ${x.q}\nA${i + 1}: ${x.a}`).join('\n'));
}
console.log(out.join('\n\n'));
