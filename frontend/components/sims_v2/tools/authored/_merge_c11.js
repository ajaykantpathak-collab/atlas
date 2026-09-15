const fs = require('fs');
const path = require('path');
const dir = 'D:/platform/frontend/components/sims_v2/tools/authored/';
const expected = Object.keys(require(dir + '_c11_map.json'));
const merged = {};
for (const f of fs.readdirSync(dir)) {
  if (/^c11_batch\d+\.js$/.test(f)) {
    const data = require(dir + f);
    for (const k of Object.keys(data)) {
      if (merged[k]) console.log('DUPLICATE KEY', k, 'in', f);
      merged[k] = data[k];
    }
  }
}
// validate
const missing = expected.filter(k => !merged[k]);
const extra = Object.keys(merged).filter(k => !expected.includes(k));
if (missing.length) console.log('MISSING:', missing.join(','));
if (extra.length) console.log('EXTRA:', extra.join(','));
for (const [k, v] of Object.entries(merged)) {
  for (const fld of ['discovery', 'mission', 'finale']) {
    if (!v[fld]) console.log('MISSING FIELD', k, fld);
  }
  const d = v.discovery || {};
  if (!d.question || !Array.isArray(d.options) || d.options.length !== 4 || !d.answer || !d.hook)
    console.log('BAD DISCOVERY', k);
  else if (!d.options.includes(d.answer)) console.log('ANSWER NOT IN OPTIONS', k);
}
fs.writeFileSync(dir + 'c11.json', JSON.stringify(merged, null, 2));
console.log('written', Object.keys(merged).length, 'entries,', fs.statSync(dir + 'c11.json').size, 'bytes');
