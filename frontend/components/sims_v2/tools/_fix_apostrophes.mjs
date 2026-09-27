import ts from 'typescript';
import fs from 'node:fs';

const still = JSON.parse(fs.readFileSync(new URL('./_still_broken.json', import.meta.url), 'utf8'));
for (const s of still) {
    let t = fs.readFileSync(s.f, 'utf8'), guard = 0;
    while (guard++ < 30) {
        const src = ts.createSourceFile(s.f, t, ts.ScriptTarget.Latest, true);
        const errs = (src.parseDiagnostics || []);
        if (!errs.length) break;
        const L = src.getLineAndCharacterOfPosition(errs[0].start).line;
        const lines = t.split('\n');
        // escape bare apostrophes inside words: hydrogen's -> hydrogen\'s
        lines[L] = lines[L].replace(/([a-zA-Z])'([a-zA-Z])/g, "$1\\'$2");
        t = lines.join('\n');
    }
    fs.writeFileSync(s.f, t);
    const src2 = ts.createSourceFile(s.f, t, ts.ScriptTarget.Latest, true);
    console.log(s.f.split('/').pop(), 'errors left:', (src2.parseDiagnostics || []).length);
}
