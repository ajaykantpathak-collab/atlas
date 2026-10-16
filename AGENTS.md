# Platform — Repo Rules

## Build source of truth

**`deploy/` is the ONLY tree Docker builds.** `docker-compose.prod.yml` has `context: .` (the deploy dir); `deploy/Dockerfile.backend` copies `deploy/backend/` + `deploy/content/` + `deploy/requirements.txt`; `deploy/Dockerfile.frontend` copies `deploy/frontend/`.

The root `backend/` and `frontend/` are dev copies. **Any change that must ship must be applied to `deploy/`** (or synced via `node scripts/sync-deploy.js`).

## Workflow

- Backend changes: edit `deploy/backend/**`, then `docker cp` the file into running containers (`dream-backend-1/2` → `/app/backend/...`) — no rebuild needed for .py changes.
- Frontend changes: edit `deploy/frontend/**`; a rebuild is required (Next.js compiles at build time).
- After ANY change, verify the running artifact — `curl` the served HTML/JSON or `docker exec` the file — never assume a build shipped what the source shows.
- One build per batch of changes. Do not rebuild per edit.

## Data boundaries

- `deploy/content/enhanced_nodes_md/` = the canonical CBSE corpus — **14,236 files** (Classes 6–12; includes `_comp` companion docs). Master copy: `C:\Users\Alesha4285\Desktop\enhanced_nodes\md_cache`. Class 9 Hindi is one book (`hin_ga`) per the 26-27 syllabus; Sanskrit/Urdu are out of scope. Classes 1–5 use the junior-games system, not this corpus.
- `deploy/content/cisce_nodes_v2/` = the canonical CISCE corpus — **9,431 files** (Classes 6–12, ICSE + ISC boards). Dual-corpus serving is live (the loader scans both dirs). Same master-copy rule applies.
- `D:\platform\runtime_data/` → mounted at `/app/cbse_data` in backends (solver engine files, embeddings, state).
- `board_questions` table: **253,456** node-derived questions across 115 class/subject combos.
- Node IDs (e.g. `c10_bio_cbse_01_001`) are internal-only — never expose in student-facing fields.
  **Owner decision (2026-09-29):** ids DO travel in API payloads/URLs as opaque fetch keys (same as
  `/learn/<id>` routes) — that is accepted-by-design. The rule is about *display text*: scrubs +
  audits enforce zero ids in visible strings. Do not "fix" payloads to remove ids.
- Corpus scope decision (2026-09-29): the dual-corpus loader serves BOTH `enhanced_nodes_md` (CBSE)
  and `cisce_nodes_v2` (ICSE/ISC, `_isc_` filenames parse). CBSE Hindi/English content-quality waves
  (micro-stubs, c9_hin_ga soup, English-in-Hindi, CJK, KrutiDev Q&A rows) are PARKED by owner decision
  — documented in `_cisce_build/pillar1/`, do not relaunch without an owner go.
- `deploy/content/` is **bind-mounted** to `/app/content` in backends — new/rewritten .md files are instantly visible to the container, no `docker cp` needed.

## Content reload gotchas (learned)

- After editing node .md files: `docker exec dream-backend-1 python -m backend.tools.load_cbse_enrichment` refreshes `enrichment_content` rows (titles, examples, graph ids).
- `/api/content/nodes/<id>/enrichment` reads definition/walkthrough/diagnostics from the **in-memory `load_index()` singleton**, not the DB — new files need an index rebuild.
- **Stale-cache trap:** `ENHANCED_NODES_FAST_FINGERPRINT=1` fingerprints the corpus by `{file_count, grade_map_bytes}` only. Same-count file rewrites (150 stubs → 150 authored) do NOT invalidate `backend/_cache/enhanced_nodes_index.json(.pickle)` — a plain restart just reloads the stale pickle (~1 min). Fix: `rm /app/backend/_cache/enhanced_nodes_index.json*` in the container, THEN restart; preload rebuilds from md. Apply to both backends (rolling restart keeps service up).

## Verification

- `curl http://localhost/api/health` — backend
- `curl http://localhost/` — frontend/nginx
- `docker ps` — all services healthy
- `npm run verify` in `deploy/frontend` (ICE 1.1) — replays the 10 saved Reticle
  flows against the running production build at :3001; exit 0 = shippable FE.
  An FE ship without this passing is a blocked ship.

## ICE HARDENING (owner law, 2026-10-04 — BUILD_ORDER.md Phase 1)

- **Reticle (FE ship gate):** saved flows live in `deploy/frontend/.reticle/flows/`
  (10 acceptance flows: login, dashboard opener, MissionFlow, lab, games,
  sandboxes, commerce, checkup, MCQ widgets, repair loop). Wire: `npm run verify`.
- **ui-skills (FE craft law, ICE 1.2):** every FE agent brief cites and reviews
  against the installed ui-skills constraints — `.agents/skills/baseline-ui`,
  `fixing-accessibility`, `fixing-motion-performance`, `improve-ui`
  (accessibility, motion, craft). Routing skill: `.agents/skills/ui-skills-root`.
  FE work that ignores these constraints is not done.
- **antislop gate (ICE 1.3):** `deploy/backend/its/solver/slop_gate.py` scrubs
  every student-facing solver string (antislop lists + platform ban list:
  "Lane C", "variable binding", raw LaTeX, node IDs, "the student" voice, NaN,
  15-digit floats). Wired at the `answer()` choke point; fail-open. Never bypass
  it for new serving paths — route them through `answer()`.
- **Chisel (test-impact, ICE 1.4):** `chisel diff-impact` (project dir
  `D:/platform/deploy`, DB in `deploy/.chisel/`) names the tests a batch
  impacts; they run before the batch ships. See `fleet-manager` skill.
- **Skill audit (ICE 1.5):** `semia` (offline baseline) audits `.agents/skills/`;
  run after adding or editing any agent skill.


## SHIP DISCIPLINE (owner law, 2026-10-03 — violating this caused 24h of churn)

1. **Build everything first. Test on the dev instance. ONE final ship to Docker.**
   - Dev/test surface: `deploy\scripts\dev_verify.cmd <port>` (native, no-reload, ~90s boot).
     Boot it ONCE per batch, leave it up, test everything against it.
   - Frontend: build+verify natively (`deploy\scriptse_build.cmd` + `fe_serve.cmd`, port 3001).
     The Docker frontend container is RETIRED.
2. **Zero Docker/container restarts mid-batch.** No docker-cp per fix, no manifest regen
   cycles, no restart-per-discovery. Ship = one batch: docker-cp all changed files + ONE
   manifest regen (launch_check --update) + one restart per backend, health-gated, only
   when the whole batch is green on the dev instance.
3. Agents never touch Docker or restart anything. Coordinator ships once per batch.
4. Frontend agents must use NEXT_DIST_DIR env (next.config.js supports it) so dev servers
   never clobber the production `.next`, and must kill dev servers after each verify burst.
5. Worker heavy jobs (content_reindex/embed_rebuild) run only in the 02:00-05:00 window
   (guarded in workers/main.py) — never enqueue-triggered on demand.

## AGENT COMPLETION STANDARD (owner law, 2026-10-03)

First pass is never final. Every agent iterates inside its session until the
deliverable is genuinely 10/10 by its own brief's definition: self-review,
fix everything flagged, re-verify, strengthen the weakest parts, and only
then report — with evidence. A report of repros without root causes, numbers
without a before/after fix, or a scaffold without edge-case hardening is not
accepted as complete.

## SUPERPOWERS DISCIPLINE (owner law, 2026-10-03)

Every agent and every batch uses the skills in D:\platform\.superpowers\skills\:
- **verification-before-completion** — no "should work" claims; prove it
- **test-driven-development** — write the test first, then the code
- **systematic-debugging** — root-cause analysis before fixing, never symptom-chasing
- **writing-plans** — no building without a plan; plans are written before code
- **dispatching-parallel-agents** — max 2 concurrent, disjoint file lanes, briefs are self-contained
- **receiving-code-review** — council feedback is acted on, not debated

These are not suggestions. The failures of 2026-10-03 (wrong-question grading, the
unshipped cross-subject fix, the half-wired semantic lane, three Docker engine
wedges, 15GB python RAM) are the direct result of skipping these steps.
