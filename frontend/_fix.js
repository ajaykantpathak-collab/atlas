const fs = require('fs');
// usage: node _fix.js _fixes.json  (overwrites existing keys)
const target = 'components/sims_v2/tools/authored/misconceptions.json';
const data = JSON.parse(fs.readFileSync(target, 'utf8'));
let fixed = 0;
for (const f of process.argv.slice(2)) {
  const b = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const [k, v] of Object.entries(b)) {
    if (!data[k]) throw new Error('fix key not present: ' + k);
    if (v.length > 140) throw new Error('fix too long: ' + k + ' ' + v.length);
    if (!/check/i.test(v)) throw new Error('fix missing check: ' + k);
    data[k] = v; fixed++;
  }
}
fs.writeFileSync(target, JSON.stringify(data, null, 2) + '\n');
console.log('fixed:', fixed, 'total:', Object.keys(data).length);
