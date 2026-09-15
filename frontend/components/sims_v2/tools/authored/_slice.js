const fs = require('fs');
const d = JSON.parse(fs.readFileSync('D:/platform/frontend/components/sims_v2/tools/authored/_c12_digest.json', 'utf8'));
const ks = JSON.parse(fs.readFileSync('D:/platform/frontend/components/sims_v2/tools/authored/_c12_keys.json', 'utf8'));
const start = parseInt(process.argv[2] || '0', 10);
const len = parseInt(process.argv[3] || '15', 10);
const out = {};
ks.slice(start, start + len).forEach(k => {
  const e = d[k];
  out[k] = {
    title: e.title,
    sub: e.sub,
    f: e.files.map(x => ({ def: x.def, walk: x.walk, mis: x.mis, dq1: x.dq1, formula: x.formula }))
  };
});
console.log(JSON.stringify(out, null, 1));
console.error('RANGE', start, '-', Math.min(start + len, ks.length), 'of', ks.length);
