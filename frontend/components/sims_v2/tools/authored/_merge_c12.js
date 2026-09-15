// Merge a batch fragment file into c12.json and validate.
// usage: node _merge_c12.js <fragmentFile>
const fs = require('fs');
const path = __dirname + '/c12.json';
const fragFile = process.argv[2];
const frag = JSON.parse(fs.readFileSync(fragFile, 'utf8'));
let cur = {};
if (fs.existsSync(path)) cur = JSON.parse(fs.readFileSync(path, 'utf8'));
let added = 0;
for (const [k, v] of Object.entries(frag)) {
  if (!v.discovery || !v.mission || !v.finale) {
    console.log('SKIP (missing required fields):', k);
    continue;
  }
  cur[k] = v;
  added++;
}
fs.writeFileSync(path, JSON.stringify(cur, null, 1));
// verify
JSON.parse(fs.readFileSync(path, 'utf8'));
console.log('merged', added, 'entries; total:', Object.keys(cur).length);
