// Usage: node merge.js <fragfile> — merges fragment into apply.json and validates
const fs = require('fs');
const A = 'D:/platform/frontend/components/sims_v2/tools/authored/apply.json';
const frag = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
let db = {};
if (fs.existsSync(A)) db = JSON.parse(fs.readFileSync(A, 'utf8'));
let added = 0, errs = [];
for (const [k, v] of Object.entries(frag)) {
  const o = v.options || [];
  const nc = o.filter(x => x.correct === true).length;
  if (nc !== 1) errs.push(k + ': correct count=' + nc);
  for (const x of o) if (x.correct !== true && !x.reveals) errs.push(k + ': wrong opt missing reveals');
  if (!v.scenario || !v.prompt || o.length < 2 || o.length > 4) errs.push(k + ': field/option count problem');
  db[k] = v; added++;
}
fs.writeFileSync(A, JSON.stringify(db, null, 1));
// re-parse to verify
JSON.parse(fs.readFileSync(A, 'utf8'));
console.log('added', added, 'total', Object.keys(db).length, errs.length ? 'ERRORS:\n' + errs.join('\n') : 'ok');
