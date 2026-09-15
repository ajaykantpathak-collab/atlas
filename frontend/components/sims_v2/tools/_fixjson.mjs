import fs from 'fs';
const p = process.argv[2];
const s = fs.readFileSync(p, 'utf8');
let d = 0, inStr = false, esc = false, line = 1;
for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '\n') line++;
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) { console.log('root closed at line', line); console.log('trailing:', JSON.stringify(s.slice(i + 1, i + 120))); process.exit(0); } }
    else if (c === ']' && d === 0) { console.log('bad ] at line', line); process.exit(1); }
}
console.log('EOF reached, depth =', d);
