import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const files = [];
(function walk(d) {
    for (const f of fs.readdirSync(d)) {
        const p = path.join(d, f);
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (f.endsWith('.ts')) files.push(p);
    }
})(ROOT);

let fixed = 0, still = [];
for (const f of files) {
    let t = fs.readFileSync(f, 'utf8');
    const src0 = ts.createSourceFile(f, t, ts.ScriptTarget.Latest, true);
    if (!(src0.parseDiagnostics || []).length) continue;

    let guard = 0, changed = false;
    while (guard++ < 60) {
        const src = ts.createSourceFile(f, t, ts.ScriptTarget.Latest, true);
        const errs = (src.parseDiagnostics || []);
        if (!errs.length) break;
        const lines = t.split('\n');
        let did = false;
        for (const e of errs) {
            const L = src.getLineAndCharacterOfPosition(e.start).line;
            const line = lines[L] ?? '';
            // doubled mission: validate: 'X:mission: { widget: 'X', validate: 'REAL'',
            const m = line.match(/validate: '([a-z_0-9]+):mission: \{ widget: '([a-z_0-9]+)', validate: '([^']+)''/);
            if (m) { lines[L] = line.replace(m[0], `validate: '${m[3]}'`); did = true; continue; }
            // unescaped apostrophes inside words
            if (/[a-zA-Z]'[a-zA-Z]/.test(line)) { lines[L] = line.replace(/([a-zA-Z])'([a-zA-Z])/g, "$1\\'$2"); did = true; continue; }
            // stray trailing backslash inside string: 'X\', -> 'X',
            if (/\\',/.test(line)) { lines[L] = line.replace(/([a-zA-Z ])\\',/g, "$1',"); did = true; }
        }
        if (!did) break;
        t = lines.join('\n'); changed = true;
    }
    if (changed) fs.writeFileSync(f, t);
    const src2 = ts.createSourceFile(f, t, ts.ScriptTarget.Latest, true);
    const left = (src2.parseDiagnostics || []).length;
    if (left) still.push({ f: path.basename(f), n: left });
    else if (changed) fixed++;
}
console.log('repaired:', fixed, '| still broken:', still.length);
still.slice(0, 20).forEach(s => console.log(' ', s.f, s.n));
fs.writeFileSync(new URL('./_still_broken2.json', import.meta.url), JSON.stringify(still, null, 1));
