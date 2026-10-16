# ATLAS — ONE-BATCH SHIP CHECKLIST (the "Docker is back" runbook)

*Everything below is STAGED in deploy/ and test-green natively. This is the
exact sequence for the single production push. Owner law: build everything,
test once, ONE batched ship — no mid-batch restarts.*

## 0. Preconditions
- [ ] Docker Desktop running; data tier up: `docker start dream-postgres dream-redis dream-neo4j dream-qdrant dream-clickhouse`
- [ ] Postgres accepting: `docker exec dream-postgres psql -U dream_user -d dream_app -t -c "SELECT count(*) FROM board_questions"` → 253,903

## 1. File upload (backends STOPPED for the cp — they are stopped now)
- [ ] Generate the changed-file list: files newer than the last ship marker
- [ ] `docker cp` each into dream-backend-1 AND dream-backend-2 (with the
      missing-parent-dir fallback: copy the parent dir when cp fails)
- [ ] PARITY CHECK: md5 every copied file in both containers vs source —
      must be 146/146-style ALL OK before proceeding
- [ ] Containers stopped? `docker cp` works on stopped containers.

Known staged waves to include (verify mtimes):
  backend: main.py (warm watchdog), workers/main.py (send window),
  harness/launch_check.py (heartbeat), api/practice.py (socratic seam +
  batch start), api/teacher.py, its/solver/{class6_families,neurolink,
  answer_pipeline,semantic_qa,deterministic_service,modeling_layer,
  physics_families,maths2_families}.py, services/{question_selector,
  solve_isolation,display_scrub,orchestrator,board_answer,whatsapp_digest,
  variable_extractor,enhanced_nodes}.py, routers/progress.py,
  routers/learnpath.py, modules/journey/engine.py, services/learnpath*
  (builder + router service), its/solver/socratic_moves.py,
  services/reward_ledger.py + all reward-routed files, content_tools/,
  tests/* (new suites), training/ (NER v3 if landed)
  frontend: built .next already served natively — no container step
  corpus: content/enhanced_nodes_md 150 authored files (bind-mount —
  visible on container start, no cp; but run the enrichment refresh in §4)

## 2. ONE start + health gate
- [ ] `docker start dream-backend-1` ONLY → poll `docker inspect --format '{{.State.Health.Status}}' dream-backend-1` until healthy (expect 15–25 min on the HDD; the gate now prints a heartbeat — watch `docker logs dream-backend-1`)
- [ ] A WARM STEP ABANDONED log line = degraded boot, app still serves — proceed, note it
- [ ] Then `docker start dream-backend-2` → healthy

## 3. Post-start data refreshes (once, no restarts)
- [ ] Enrichment refresh for the 150 authored lessons:
      `docker exec dream-backend-1 python -m backend.tools.load_cbse_enrichment`
- [ ] STALE-CACHE TRAP: if enhanced_nodes index fingerprint didn't move,
      `rm /app/backend/_cache/enhanced_nodes_index.json*` in BOTH containers
      then `docker restart dream-backend-1 dream-backend-2` (the ONE restart)
- [ ] Content reindex if needed — workers only, 02:00–05:00 window

## 4. Verify (the whole list, nothing skipped)
- [ ] `curl http://localhost:3001/api/health` → ok, all services true
- [ ] `npm run verify` in deploy/frontend (Reticle, 10 flows) → exit 0
- [ ] Smoke: practice/start (maths c10) → 10 questions <2s
- [ ] Smoke: deterministic solve "2x + 6 = 20" → VERIFIED 7
- [ ] Smoke: "The price of 2 kg of oranges is Rs 113. Find the price of 5 kg." → VERIFIED 282.5
- [ ] Smoke: nonsense attack → GUIDED (no answer)
- [ ] Smoke: wrong answer in practice → response carries `socratic` moves
- [ ] Smoke: GET /api/learnpath/chapter/10/biology/01 → 200, 12 lessons
- [ ] Smoke: GET /api/practice/board-answer/weekly?subject=physics&class=8 → 200
- [ ] Sweep resume (background, non-blocking): sweep_full_runner --resume

## 5. Ship rules (unchanged)
- NO sync-deploy.js until root↔deploy reconcile is re-verified
- Any failure mid-sequence: STOP, fix natively, re-run this checklist
  from step 1 — never a mid-batch fix push
