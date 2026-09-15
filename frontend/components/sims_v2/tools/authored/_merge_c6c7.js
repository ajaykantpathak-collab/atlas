// Merge all _c6c7_frag_*.json into c6_c7.json and validate.
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const out = {};
for (const f of fs.readdirSync(dir).filter(f => /^_c6c7_frag_\d+\.json$/.test(f)).sort()) {
  const frag = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  for (const k of Object.keys(frag)) {
    if (out[k]) console.log('DUP key overwritten:', k, 'in', f);
    out[k] = frag[k];
  }
}
fs.writeFileSync(path.join(dir, 'c6_c7.json'), JSON.stringify(out, null, 1));
// validate against expected keys
const expected = new Set(
  [...new Set(Object.values(require('../../SIM_INDEX.json')).map(m => m.ch))]
    .filter(c => /^c[67]_/.test(c))
);
const have = Object.keys(out);
const missing = [...expected].filter(k => !out[k]);
const extra = have.filter(k => !expected.has(k));
const bad = have.filter(k => {
  const e = out[k];
  return !(e.discovery && e.discovery.question && Array.isArray(e.discovery.options) &&
    e.discovery.options.length === 4 && e.discovery.options.includes(e.discovery.answer) &&
    e.mission && e.finale);
});
console.log('written:', have.length, '| missing:', missing.length, '| extra:', extra.length, '| malformed:', bad.length);
if (missing.length) console.log('MISSING:', missing.join(','));
if (extra.length) console.log('EXTRA:', extra.join(','));
if (bad.length) console.log('BAD:', bad.join(','));
JSON.parse(fs.readFileSync(path.join(dir, 'c6_c7.json'), 'utf8'));
console.log('JSON ok, bytes:', fs.statSync(path.join(dir, 'c6_c7.json')).size);
