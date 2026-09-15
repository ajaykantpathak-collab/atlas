const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('_misc_raw.json', 'utf8'));
const done = JSON.parse(fs.readFileSync('components/sims_v2/tools/authored/misconceptions.json', 'utf8'));
const nodes = fs.readFileSync('_nodelist.txt', 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
const pri = n => n.startsWith('c11_') || n.startsWith('c12_') ? 0 : n.startsWith('c9_') || n.startsWith('c10_') ? 1 : 2;
const queue = nodes.filter(n => raw[n] && !done[n]).sort((a, b) => pri(a) - pri(b) || a.localeCompare(b));
fs.writeFileSync('_queue.txt', queue.join('\n'));
console.log('queue:', queue.length, 'already done:', Object.keys(done).length);
