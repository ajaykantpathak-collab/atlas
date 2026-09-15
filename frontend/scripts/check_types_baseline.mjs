/**
 * check_types_baseline.mjs — the honest `npx tsc --noEmit` gate.
 *
 * Runs the exact same command CI runs, then applies a PINNED, documented
 * baseline of known-pre-existing errors. Any error NOT in the baseline
 * fails this script (exit 1). Used identically by:
 *   - .github/workflows/ci.yml  (frontend job)
 *   - backend/scripts/run_checks.bat  (local Windows runner)
 *
 * Baseline, as of 2026-09-14:
 *
 * 1. components/simulations/** — the bespoke c6_12 / c6_12_new sim
 *    corpus. tsconfig.json excludes components/simulations, but the
 *    files still get pulled in transitively via app/ page imports, so
 *    plain tsc reports them. They are a known, tracked debt (see
 *    frontend/components/sims_v2/ARCHITECTURE.md) — allowed BY PATH
 *    PREFIX, with the count printed on every run so drift stays
 *    visible. (831 errors at baseline.)
 *
 * 2. components/premium/KnowledgeGraph3DReal.tsx:316,317 (TS2352) —
 *    were pinned at baseline; FIXED on 2026-09-14 (as-unknown casts).
 *    Pins removed: any regression there now fails CI.
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FRONTEND_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Exact allowed premium errors: "file:line:code".
 * Empty since 2026-09-14 — the two baseline premium errors were fixed;
 * pins are only ever ADDED with a comment saying why and when. */
const PREMIUM_BASELINE = new Set([]);
const SIMS_BASELINE_PREFIX = "components/simulations/";

const ERROR_RE = /^(.+?)\((\d+),\d+\): error (TS\d+): /;

function runTsc() {
    return new Promise((resolve) => {
        const proc = spawn("npx", ["tsc", "--noEmit"], {
            cwd: FRONTEND_ROOT,
            shell: true,
        });
        let out = "";
        proc.stdout.on("data", (d) => { out += d; });
        proc.stderr.on("data", (d) => { out += d; });
        proc.on("close", () => resolve(out));
        proc.on("error", (err) => { out += String(err); resolve(out); });
    });
}

const output = await runTsc();

const newErrors = [];
let simsAllowed = 0;
const premiumFired = [];

for (const line of output.split(/\r?\n/)) {
    const m = ERROR_RE.exec(line);
    if (!m) continue;
    const [, file, lineNo, code] = m;
    const normFile = file.replace(/\\/g, "/");
    if (normFile.startsWith(SIMS_BASELINE_PREFIX)) {
        simsAllowed += 1;
        continue;
    }
    const key = `${normFile}:${lineNo}:${code}`;
    if (PREMIUM_BASELINE.has(key)) {
        premiumFired.push(key);
        continue;
    }
    newErrors.push(line.trim());
}

console.log("== typecheck baseline gate ==");
console.log(`allowed (sim corpus, by path prefix): ${simsAllowed}`);
console.log(`allowed (premium, pinned): ${premiumFired.length}/${PREMIUM_BASELINE.size}`);
if (premiumFired.length < PREMIUM_BASELINE.size) {
    for (const k of [...PREMIUM_BASELINE].filter(k => !premiumFired.includes(k))) {
        console.log(`NOTE: pinned baseline error no longer fires: ${k}`);
        console.log("      -> fix landed; REMOVE the pin from scripts/check_types_baseline.mjs");
    }
}

if (newErrors.length > 0) {
    console.error(`\nFAILED: ${newErrors.length} type error(s) outside the allowed baseline:\n`);
    for (const e of newErrors.slice(0, 50)) console.error("  " + e);
    if (newErrors.length > 50) console.error(`  ... and ${newErrors.length - 50} more`);
    console.error("\nFix the error(s). Baselines live in frontend/scripts/check_types_baseline.mjs");
    process.exit(1);
}

console.log("OK: no new type errors outside the documented baseline.");
