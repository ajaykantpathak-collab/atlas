// Usage: node _add_entries.js <batchfile.js>
// batchfile must set module.exports = { "ch_key": {entry}, ... }
const fs = require('fs');
const path = 'D:/platform/frontend/components/sims_v2/tools/authored/c6_c7.json';
const batch = require(process.argv[2]);
let data = {};
if (fs.existsSync(path)) {
  data = JSON.parse(fs.readFileSync(path, 'utf8'));
}
for (const k of Object.keys(batch)) {
  if (data[k]) console.log('OVERWRITE', k);
  data[k] = batch[k];
}
fs.writeFileSync(path, JSON.stringify(data, null, 1));
JSON.parse(fs.readFileSync(path, 'utf8'));
console.log('ok — total keys:', Object.keys(data).length);
