const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('_misc_raw.json', 'utf8'));
const queue = fs.readFileSync('_queue.txt', 'utf8').split('\n').filter(Boolean);
const start = parseInt(process.argv[2] || '0', 10);
const count = parseInt(process.argv[3] || '30', 10);
for (let i = start; i < Math.min(start + count, queue.length); i++) {
  const n = queue[i];
  console.log('=== ' + i + ' ' + n + ' ===');
  console.log(raw[n].replace(/\s+/g, ' ').slice(0, 700));
}
