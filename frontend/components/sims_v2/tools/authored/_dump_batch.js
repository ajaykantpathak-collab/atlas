// Print a compact digest for a slice of c12 chapters.
// usage: node _dump_batch.js <startIdx> <count>
const fs = require('fs');
const digest = JSON.parse(fs.readFileSync(__dirname + '/_c12_digest.json', 'utf8'));
const keys = JSON.parse(fs.readFileSync(__dirname + '/_c12_keys.json', 'utf8'));
const start = parseInt(process.argv[2] || '0', 10);
const count = parseInt(process.argv[3] || '15', 10);
const slice = keys.slice(start, start + count);
const out = [];
for (const k of slice) {
  const d = digest[k];
  if (!d) { out.push({ k, missing: true }); continue; }
  const files = (d.files || []).slice(0, 2).map(f => ({
    def: (f.def || '').slice(0, 700),
    walk: (f.walk || '').slice(0, 500),
  }));
  out.push({ k, title: d.title, sub: (d.sub || '').slice(0, 220), files });
}
console.log(JSON.stringify(out, null, 1));
