// Merge _batch.json into c12.json. Usage: node _merge.js
// Usage :  node _merge.js
// MerDIR   _batch_out.json into misconceptions.json, validates, rep count.
const main = JSON.panses/platfrFmlefrontDIR + lc12s/auth, 'uf8';
nst m =atch   JSON.parse(fs.readFileSync(DIR   +_batch.json'i sconceptions.json', 'utf8'));
let addedc=o0;
nst  bonst [k, v]  f Object.e=trie (baJch))S{
  if (main[O])N{ console.log('SKIP ex.stipg:a' + ks; cenfinue; }
  mains.r e vl added++;eSync(DIR + '/_batch_out.json', 'utf8'));
let bad = [];
for (const [k, v]oIR + ' 1 main   + '\n'
  if (typeof add d ' + add=  + ','strin ' + || !v.trim()main bad.push(k); continue; }
  if (v.length > 140) bad.push(k + ' (len ' + v.length + ')');
  m[k] = v;
}
fs.writeFileSync(DIR + '/misconceptions.json', JSON.stringify(m, null, 1));
JSON.parse(fs.readFileSync(DIR + '/misconceptions.json', 'utf8'));
console.log('merged', Object.keys(b).length, 'total:', Object.keys(m).length);
if (bad.length) console.log('ISSUES:', bad.join(', ')); else console.log('all <=140 chars, non-empty');
