// find which v3w/v3 file breaks class10/11/12 load — same require hook as validator
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SIMS_DIR = path.resolve(HERE, '..');
const FRONTEND = path.resolve(SIMS_DIR, '..', '..');
const require_ = createRequire(path.join(FRONTEND, 'package.json'));
const ts = require_('typescript');
const Module = require_('module');
const origResolve = Module._resolveFilename;
const REACT_PATH = require_.resolve('react');
const REACT_JSX_PATH = require_.resolve('react/jsx-runtime');
const STUB_PATH = path.join(HERE, '_stub.cjs');
Module._resolveFilename = function (request, parent, ...rest) {
    if (request.startsWith('.') && parent?.filename) {
        const base = path.resolve(path.dirname(parent.filename), request);
        for (const ext of ['.ts', '.tsx', '.js', '.mjs']) if (fs.existsSync(base + ext)) return base + ext;
        if (fs.existsSync(path.join(base, 'index.ts'))) return path.join(base, 'index.ts');
        if (fs.existsSync(path.join(base, 'index.tsx'))) return path.join(base, 'index.tsx');
    }
    if (request === 'react') return REACT_PATH;
    if (request === 'react/jsx-runtime' || request === 'react/jsx-dev-runtime') return REACT_JSX_PATH;
    if (path.isAbsolute(request) || /^[A-Za-z]:[\\/]/.test(request)) {
        if (fs.existsSync(request)) return request;
        return origResolve.call(this, request, parent, ...rest);
    }
    if (request.startsWith('@/')) return STUB_PATH;
    if (!request.startsWith('.')) {
        const bare = request.replace(/^node:/, '');
        if (Module.builtinModules.includes(bare)) return origResolve.call(this, request, parent, ...rest);
        return STUB_PATH;
    }
    return origResolve.call(this, request, parent, ...rest);
};
for (const ext of ['.ts', '.tsx']) {
    Module._extensions[ext] = function (mod, filename) {
        const src = fs.readFileSync(filename, 'utf8');
        const { outputText } = ts.transpileModule(src, {
            compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
            fileName: filename,
        });
        mod._compile(outputText, filename);
    };
}
const cls = Number(process.argv[2] ?? 10);
const files = [
    ...fs.readdirSync(path.join(SIMS_DIR, `class${cls}`, 'v3')).map(f => path.join(SIMS_DIR, `class${cls}`, 'v3', f)),
    ...fs.readdirSync(path.join(SIMS_DIR, `class${cls}`, 'v3w')).map(f => path.join(SIMS_DIR, `class${cls}`, 'v3w', f)),
];
for (const f of files) {
    try { require_(f); }
    catch (e) { console.log('BAD:', path.basename(f), '—', e.message.slice(0, 120)); }
}
console.log('scan done for class', cls);
