# C12 Pipeline — Handoff: Failures & Fixes Needed

## Context
Goal: Generate 173 Class 12 simulation components for `D:\dream_app\frontend\components\simulations\c9_12\` using GLM-5.2 High via Devin CLI (`devin -p`). Pipeline script: `D:\dream_app\frontend\scripts\opus-c12-pipeline.js`.

Only ONE component was ever successfully generated: `C12_PhysicsEMWavesSim.tsx` (1586 lines, all checks pass). Everything else has failed.

---

## FAILURE 1: GLM explores instead of writes (EXPLORATION LOOP)

**Symptom:** GLM reads existing files in a loop for 10+ minutes, never writes the output file. Pipeline times out.

**Root cause:** In Devin CLI, read-only tools (read, grep, glob) are auto-approved in ALL permission modes (Normal, Accept-Edits, Bypass/Dangerous). Telling GLM "don't read files" in the prompt doesn't work — it ignores text instructions because reading is free and auto-approved.

**Attempted fixes that DID NOT work:**
- Adding "DO NOT READ OTHER FILES" to the prompt — GLM ignores it
- Switching to `accept-edits` mode — reads are still auto-approved in that mode
- Adding "Write the file NOW" — GLM still explores first

**Fix that SHOULD work (not yet verified):**
Use `--config` flag with a custom config file that has `deny` rules for reads:
```json
{
  "permissions": {
    "deny": ["Read(**)", "Exec(**)"],
    "allow": ["Write(components/simulations/c9_12/**)"]
  }
}
```
File created at: `D:\dream_app\frontend\scripts\c12-devin-config.json`
Deny rules always win, even in dangerous/bypass mode. This should force GLM to only write.

**Status:** FAILED. The `--config` deny-reads approach was tested at 11:40 on 2026-08-25 and STILL timed out. Devin logs at `%APPDATA%\devin\cli\logs\devin_20260825-113029_4132.log` reveal the REAL root cause:

### ACTUAL ROOT CAUSE (from Devin logs):

**1. Network connectivity issues to GLM API:**
```
WARN connect_rpc::stream: error=error decoding response body
  -> request or response body error
  -> error reading a body from connection
  -> peer closed connection without sending TLS close_notify
```
This happened at 11:05 and 11:11 — the GLM API server is dropping connections. Devin retries (attempt=1, attempt=2, max=3) but each retry takes 5-6 MINUTES because of the timeout.

**2. Unleash telemetry polling failures:**
```
WARN chisel_api::telemetry::unleash_sampling: unleash poll failed
  -> operation timed out
```
Devin can't reach `unleash.codeium.com` — this may be blocking or slowing startup.

**3. Write tool formatting failure (CONFIRMED):**
```
WARN affogato::agent::effects::tools: Tool validation failed for 'write':
  Failed to parse input: missing required fields 'file_path', 'content'
ERROR run_acp_server: chisel_agent::acp_server::agent_impl: ACP: failed to convert tool call
```
GLM DID eventually try to write the file (at 11:21, ~20 min after start) but used wrong parameter names. The deny-reads config did NOT prevent this.

### TIMELINE OF FAILURE:
- 11:30: Devin starts, creates session "forested-rumba"
- 11:00-11:05: Network errors connecting to GLM API (TLS connection dropped)
- 11:05-11:11: Retry attempt 1, waits 6 minutes, another network error
- 11:11-11:21: Retry attempt 2, waits 10 minutes
- 11:21: GLM finally responds, tries to write file, WRONG PARAMETER NAMES
- 11:21: "ACP: failed to convert tool call" — write fails
- Pipeline timeout kills the process

### THE REAL PROBLEMS ARE:
1. **GLM API is slow/unstable** — connections dropping, 5-10 min between retries
2. **GLM write tool formatting is broken** — uses wrong parameter names
3. **Devin CLI retries are very slow** — 5-10 min per retry, 3 max

### NEXT STEPS TO TRY:
1. **Bypass Devin CLI entirely** — call GLM-5.2 API directly (zhipuai.cn or openrouter). No SQLite, no CLI overhead, no tool formatting issues. Just send prompt, get code text back, write file ourselves.
2. **Use Devin REST API** (api.devin.ai/v3) — cloud sessions, no local SQLite
3. **Wait for Opus API quota reset** and use the original HTTP pipeline
4. **Fix network issues** — the TLS connection drops may be a proxy/firewall issue
5. **Try a smaller prompt** — the 513KB prompt may be causing the API to timeout. Test with a 4-node template first.

---

## FAILURE 2: GLM write tool call formatting (MALFORMED TOOL CALLS)

**Symptom:** GLM calls the `write` tool but with wrong parameter names. Error:
```
Tool 'write' validation failed: Failed to parse input: missing required fields 'file_path', 'content'
```

**Root cause:** GLM-5.2 sometimes uses `path`/`text` or `filename`/`code` instead of the required `file_path`/`content`.

**Attempted fixes:**
- Added explicit field name instructions to prompt: "The parameter names MUST be exactly `file_path` and `content`"
- Added stdout fallback extraction (if GLM dumps code as text, pipeline extracts and writes it)

**Status:** NOT VERIFIED. The one successful file (`C12_PhysicsEMWavesSim.tsx`) was written correctly, so GLM CAN format the call right — it's just unreliable.

---

## FAILURE 3: SQLite "database is locked" (PARALLEL WORKER CONFLICT)

**Symptom:** When running 10 parallel Devin CLI instances:
```
Error: database is locked
```

**Root cause:** Devin CLI uses a SQLite database at `C:\Users\Alesha4285\AppData\Roaming\devin\cli\sessions.db`. SQLite serializes writes. 10 parallel instances all try to write to the same DB file.

**Attempted fix:**
- Each worker gets its own APPDATA directory (via env var override)
- Credentials and config copied to worker dir
- DB files (.db, .db-wal, .db-shm) are NOT copied — each worker gets fresh DB
- Code in `getWorkerDataDir()` function in pipeline

**Status:** The isolation code exists but was never verified to work. The DB lock still happened because:
1. Leftover Devin processes from previous runs were holding locks
2. The `killLeftoverDevins()` function was added but uses `tasklist`/`taskkill` which may not work reliably from Node.js on Windows

**To verify:** Kill ALL devin processes manually first:
```
Get-Process -Name "devin*","Devin*" -ErrorAction SilentlyContinue | Stop-Process -Force
```
Then run with 1 worker to test, then scale to 10.

---

## FAILURE 4: Stale file read (OLD PARTIAL FILES)

**Symptom:** Pipeline reports "File written by Devin: 152 lines" but Devin never actually wrote anything. The 152 lines were from an OLD partial file from a previous failed run.

**Root cause:** Pipeline checked if the output file existed and read it — but didn't distinguish between "Devin just wrote this" and "this is an old stale file".

**Fix applied:**
- Pipeline now deletes the old file BEFORE calling Devin
- If file doesn't exist after Devin runs, it means Devin failed to write
- If file exists, it was definitely written by this run

**Status:** Fix is in the code (`fs.unlinkSync(outputPath)` before `callGLM`). Should work but not verified with a successful run.

---

## FAILURE 5: TypeScript check uses wrong config (FALSE TS ERRORS)

**Symptom:** TS check reports errors like:
```
Cannot find module '@/types'
error TS1259: Module can only be default-imported using the 'esModuleInterop' flag
```

**Root cause:** The `typeCheck()` function ran `tsc --noEmit --strict --skipLibCheck --jsx react-jsx <file>` on a SINGLE file without the project's tsconfig.json. This meant path aliases (`@/types`, `@/lib/...`) and `esModuleInterop` were not configured.

**Fix applied:**
- Changed to run `npx tsc --noEmit --pretty false` (full project check)
- Filter output to only errors mentioning the specific template file
- Other files' errors are ignored

**Status:** Fix is in the code. The project's tsconfig.json has correct `paths` and `esModuleInterop` settings, so this should resolve the false errors.

---

## FAILURE 6: Model name was wrong (SILENT FALLBACK TO SWE-1.7)

**Symptom:** Devin was using SWE-1.7 instead of GLM-5.2 High. No error, just wrong model generating code.

**Root cause:** The model identifier `glm-5.2-high` is invalid. The correct identifier is `glm-5-2` (hyphens, no "high" suffix). The label in the UI is "GLM-5.2 High" but the `model_uid` is `glm-5-2`.

**Fix applied:**
- `config.json`: changed `"model": "glm-5.2-high"` → `"model": "glm-5-2"`
- Pipeline: changed `--model glm-5.2-high` → `--model glm-5-2`
- Cleaned old worker temp dirs that had bad config

**Status:** FIXED. User confirmed GLM-5.2 High is now being used.

---

## FAILURE 7: Leftover Devin processes accumulate

**Symptom:** After each failed pipeline run, 10-15 Devin processes remain running, holding DB locks and consuming CPU.

**Root cause:** When the pipeline times out or errors, it doesn't kill the child Devin processes. The `exec()` call's child process is orphaned.

**Attempted fix:**
- `killLeftoverDevins()` function at pipeline startup uses `tasklist`/`taskkill`
- DB lock retry logic (3 retries with 5s/10s/15s delays)

**Status:** The kill function may not work reliably from Node.js on Windows. Manual killing is more reliable:
```
Get-Process -Name "devin*","Devin*" -ErrorAction SilentlyContinue | Stop-Process -Force
```

**Better fix needed:** Use `child_process.spawn` instead of `exec` so we can call `.kill()` on timeout. Or add `try { child.kill() } catch {}` in the timeout handler.

---

## FAILURE 8: Prompt is too large for some templates

**Symptom:** The largest template (`C12_CommManagementSim`, 18 nodes) generates a prompt of ~513KB / 1564 lines. This may exceed GLM-5.2's context window or cause slow/incomplete generation.

**Root cause:** The prompt includes full enrichment data for all nodes, all requirements, all import examples, etc.

**Status:** Not yet tested. The 513KB prompt file exists at `D:\dream_app\frontend\scripts\test_biggest_prompt.txt`. May need to trim enrichment data or split into multiple calls.

---

## WHAT NEEDS TO HAPPEN (in order)

1. **Kill all leftover Devin processes** manually:
   ```
   Get-Process -Name "devin*","Devin*" -ErrorAction SilentlyContinue | Stop-Process -Force
   ```

2. **Test single template with deny-reads config:**
   ```
   cd D:\dream_app\frontend; $env:C12_WORKERS=1; $env:C12_COUNT=1; node scripts/opus-c12-pipeline.js
   ```
   The `--config c12-devin-config.json` flag should prevent GLM from exploring. Check if:
   - GLM writes the file within 10 minutes
   - The file has 1000+ lines
   - The file passes structural checks
   - The file passes TS check

3. **If deny-reads config works, test with 10 workers:**
   ```
   cd D:\dream_app\frontend; $env:C12_WORKERS=10; node scripts/opus-c12-pipeline.js
   ```
   Check if DB isolation works and all 10 workers run in parallel.

4. **If deny-reads config does NOT work, try alternative approaches:**
   - Use `--config` with a project-level `.devin/config.json` in the frontend dir that denies reads
   - Use Devin's REST API (api.devin.ai/v3) instead of CLI — no SQLite, no CLI overhead
   - Wait for Opus API quota reset (was 3h50m as of last check) and use the HTTP pipeline
   - Call GLM-5.2 API directly (zhipuai.cn or openrouter) — no Devin CLI at all

5. **If write tool formatting fails, use stdout fallback:**
   The pipeline has fallback code to extract code from Devin's stdout if the write tool fails. Verify this works.

6. **After successful generation, manually inspect each file:**
   - Read the actual file content
   - Check that all nodes are genuinely taught (not just mentioned)
   - Check that BKT/SRS/mastery are actually used in logic (not just imported)
   - Check visualizations are substantive
   - Check that challenges progress pedagogically
   - Check that misconceptions match enrichment data

---

## KEY FILES

| File | Purpose |
|------|---------|
| `D:\dream_app\frontend\scripts\opus-c12-pipeline.js` | Main pipeline script |
| `D:\dream_app\frontend\scripts\c12-devin-config.json` | Custom Devin config (denies reads) |
| `D:\dream_app\frontend\scripts\c12-template-plan.js` | Template definitions (173 templates, node assignments) |
| `D:\dream_app\frontend\scripts\c12-platform-integration.js` | Registry/topic-map/misconception generator |
| `D:\dream_app\frontend\C9_12_STREAM_BENCHMARKS.md` | Quality standards for C12 components |
| `D:\dream_app\frontend\scripts\test_biggest_prompt.txt` | Largest prompt (513KB, 18-node template) |
| `C:\Users\Alesha4285\AppData\Roaming\devin\config.json` | Devin CLI config (model set to glm-5-2) |
| `D:\dream_app\frontend\components\simulations\c9_12\C12_PhysicsEMWavesSim.tsx` | The ONE successful file (reference for quality) |

## KEY FACTS

- Devin CLI version: 3000.3.27 (0becb483)
- Correct model name: `glm-5-2` (NOT `glm-5.2-high`)
- Devin CLI docs location: `C:\Users\Alesha4285\AppData\Local\Programs\Devin\resources\app\extensions\windsurf\devin\share\devin\docs\`
- Read tools are auto-approved in ALL permission modes — only `deny` rules in config can block them
- Deny rules always win, even in bypass/dangerous mode
- Opus API (api.opusmax.pro) was quota-locked and returning wrong model (claude-sonnet-4-6 instead of claude-opus-5)
- The one successful file was generated in `dangerous` mode with 10 parallel workers
- Existing C12 files in output dir: `C12_ChemistryTopicsSim.tsx` (old, 1044 lines, no BKT/SRS), `C12_PhysicsEMWavesSim.tsx` (good, 1586 lines), `C12_PhysicsRayOpticsSim.tsx` (unknown quality)
