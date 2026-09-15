const fs = require('fs');
// usage: node _merge.js _batch1.json [_batch2.json ...]
const target = 'components/sims_v2/tools/authored/misconceptions.json';
const data = JSON.parse(fs.readFileSync(target, 'utf8'));
let added = 0;
for (const f of process.argv.slice(2)) {
  const b = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const [k, v] of Object.entries(b)) {
    if (!data[k]) { data[k] = v; added++; }
  }
}
fs.writeFileSync(target, JSON.stringify(data, null, 2) + '\n');
console.log('added:', added, 'total:', Object.keys(data).length);
