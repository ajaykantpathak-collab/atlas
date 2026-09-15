#!/usr/bin/env node
/**
 * sim-browser-test.mjs — consolidated Playwright smoke test for the sims
 * platform. Replaces the ad-hoc scripts in _shots/ (check.mjs, trace.mjs,
 * full2.mjs, fulltest.mjs).
 *
 *   node scripts/sim-browser-test.mjs                     # default suite
 *   node scripts/sim-browser-test.mjs --base :4000        # other port
 *   node scripts/sim-browser-test.mjs --viewport 375x800  # mobile pass
 *   node scripts/sim-browser-test.mjs /sims-v2/<id>?autotest=1  # ad-hoc routes
 *
 * Behaviour per route: collect console errors + pageerrors, screenshot to
 * _shots/, and on sim routes run a bounded autoplay driver (clicks CTAs,
 * picks options, fills blanks) until the results screen or ~60 steps.
 * `?autotest=1` makes teaching beats auto-satisfy so the robot can walk
 * the whole loop.
 *
 * Exit code: 0 = clean. 1 = at least one pageerror or nav failure.
 * Console errors are reported but do NOT fail the run (third-party noise).
 *
 * Playwright is NOT a package.json dep — it is resolved dynamically:
 *   1. PLAYWRIGHT_PATH env (file path or file:// URL to playwright index.mjs)
 *   2. local node_modules/playwright
 *   3. npm-cache/_npx/<hash>/node_modules/playwright (how `npx playwright` caches it)
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND = path.resolve(HERE, '..');
const SHOTS = path.join(FRONTEND, '_shots');

// ── playwright resolution ────────────────────────────────────────────
function resolvePlaywright() {
    const candidates = [];
    if (process.env.PLAYWRIGHT_PATH) candidates.push(process.env.PLAYWRIGHT_PATH);
    candidates.push(path.join(FRONTEND, 'node_modules', 'playwright', 'index.mjs'));
    const npxRoots = [
        process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'npm-cache', '_npx'),
        path.join(os.homedir(), 'AppData', 'Local', 'npm-cache', '_npx'),
        path.join(os.homedir(), '.npm', '_npx'),
    ].filter(Boolean);
    for (const root of npxRoots) {
        if (!fs.existsSync(root)) continue;
        for (const d of fs.readdirSync(root)) {
            candidates.push(path.join(root, d, 'node_modules', 'playwright', 'index.mjs'));
        }
    }
    for (const c of candidates) {
        if (c.startsWith('file://')) return c;
        if (fs.existsSync(c)) return pathToFileURL(c).href;
    }
    throw new Error(
        'playwright not found. Run `npx playwright` once to populate the npm cache, or set PLAYWRIGHT_PATH.'
    );
}

// ── args ─────────────────────────────────────────────────────────────
const ARGS = process.argv.slice(2);
const flag = (name) => ARGS.includes(name) ? ARGS[ARGS.indexOf(name) + 1] : null;
const BASE = (flag('--base') ?? process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
const [VW, VH] = (flag('--viewport') ?? '1440x900').split('x').map(Number);
const NO_PLAY = ARGS.includes('--no-play');
const EXTRA = ARGS.filter(a => !a.startsWith('--') && a !== flag('--base') && a !== flag('--viewport'));

// generated sim (v3) + wrapped master (v3w) — stable ids from SIM_INDEX
const DEFAULT_ROUTES = [
    { name: 'galaxy', path: '/galaxy' },
    { name: 'sandbox', path: '/sandbox' },
    { name: 'sims-v2', path: '/sims-v2' },
    { name: 'sim-gen', path: '/sims-v2/v3_c6_biology_ch06_p1?autotest=1', play: true },
    { name: 'sim-master', path: '/sims-v2/v3w_c6_biologyplantanimalcellsim?autotest=1', play: true },
];
const ROUTES = EXTRA.length
    ? EXTRA.map((r, i) => ({ name: `route${i}`, path: r, play: /sims-v2\//.test(r) }))
    : DEFAULT_ROUTES;

// ── autoplay driver (consolidated from trace.mjs / full2.mjs) ────────
async function autoplay(p, shot, settleMs) {
    for (let step = 0; step < 60; step++) {
        const t = await p.evaluate(() => document.body.innerText.slice(0, 900)).catch(() => '');
        if (/your mastery|who uses this|due for review|\bpoints\b/i.test(t)) { await shot('results'); return; }
        if (/common error|misconception|stuck idea|try the lab/i.test(t)) await shot('misconception');
        const inputs = p.locator('input[type="text"], input:not([type])');
        if (await inputs.count()) await inputs.first().fill('1.5').catch(() => { });
        const esc = p.locator('text=/show me this step|skip for now/i').first();
        if (await esc.count()) await esc.click().catch(() => { });
        const cta = p.locator('button:not([disabled])')
            .filter({ hasText: /Begin|Let|Continue|Next|Done|Check|Got it|Prove|Skip|learn|results|finish|Ready|Onward|Sure|Guessing|retry/i }).first();
        const opts = p.locator('button:not([disabled])').filter({ hasText: /\w{4,}/ });
        if (await cta.count()) await cta.click().catch(() => { });
        else if (await opts.count()) await opts.nth(0).click().catch(() => { });
        await p.waitForTimeout(settleMs);
    }
}

// ── run ──────────────────────────────────────────────────────────────
fs.mkdirSync(SHOTS, { recursive: true });
const pw = await import(resolvePlaywright());
const browser = await pw.chromium.launch();

const report = [];
let hardFails = 0;

for (const route of ROUTES) {
    const url = route.path.startsWith('http') ? route.path : BASE + route.path;
    const pageErrors = [], consoleErrors = [];
    const p = await browser.newPage({ viewport: { width: VW, height: VH } });
    p.on('pageerror', e => pageErrors.push(e.message.slice(0, 300)));
    p.on('console', m => {
        if (m.type() === 'error' && !/Hydrat|ERR_CONNECTION|favicon/i.test(m.text()))
            consoleErrors.push(m.text().slice(0, 300));
    });

    const hits = new Set();
    const shot = async (tag) => {
        if (hits.has(tag)) return;
        hits.add(tag);
        await p.screenshot({ path: path.join(SHOTS, `${route.name}_${tag}.png`) }).catch(() => { });
    };

    const navErr = await p.goto(url, { waitUntil: 'load', timeout: 90000 })
        .then(() => null).catch(e => 'NAV: ' + e.message);
    await p.waitForTimeout(6000);

    if (route.play && !NO_PLAY) await autoplay(p, shot, 1100);
    await shot('final');
    await p.close();

    const entry = { route: url, pageErrors, consoleErrors, nav: navErr, shots: [...hits] };
    report.push(entry);
    if (navErr || pageErrors.length) hardFails++;

    console.log(`\n■ ${route.name}  ${url}`);
    if (navErr) console.log('  NAV FAIL:', navErr);
    pageErrors.slice(0, 6).forEach(e => console.log('  PAGEERR:', e));
    consoleErrors.slice(0, 4).forEach(e => console.log('  console :', e));
    console.log(`  shots   : ${[...hits].map(t => `${route.name}_${t}.png`).join(', ')}`);
}

await browser.close();
fs.writeFileSync(path.join(SHOTS, 'sim-browser-test-report.json'), JSON.stringify(report, null, 2));
console.log(`\n${hardFails ? `FAIL — ${hardFails} route(s) with pageerrors/nav failures` : 'PASS — no pageerrors'} (report: _shots/sim-browser-test-report.json)`);
process.exit(hardFails ? 1 : 0);
