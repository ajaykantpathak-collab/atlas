# SKEPTIC_BACKEND — hostile due-diligence tear-down (2026-10-06)

Scope: backend architecture, deterministic engine, AI tutor, teaching loop, data
integrity, security, scalability. Method: static read of the shipped tree
(`deploy/backend/**`) + deploy config + CI + test artefacts. No docker, no
servers, no live HTTP. Every finding names file:line and the condition under
which it breaks. 31 findings. Ranked BREAKER → HIGH → MED.

---

## BREAKERS (any one of these can kill the investment case on its own)

### 1. The scalability evidence does not exist — the load baseline is a placeholder file
- **file:** `deploy/backend/harness/load_baseline.json:1-2`
- **what breaks:** The file's own `_comment` says "Placeholder — A5-HARDENING
  2026-10-02. This file is OVERWRITTEN by the post-ship loadgen run" — every
  number in it is 0 (`requests_total: 0`, `p99_ms: 0.0`). The post-ship loadgen
  run never happened.
- **when it breaks:** First real cohort. There is no measured p95/p99, no
  concurrency ceiling, no memory-under-load curve for a stack already observed
  OOM-killed at 4 workers (see #13).
- **evidence:** `grep '"requests_total"' load_baseline.json` → 0; the loadgen
  tooling exists (`harness/loadgen/`) but its output artefact was never
  produced. The 10x10 plan's §3 "load" item is unexecuted.

### 2. The green test suite tests a different tree than the one that ships
- **file:** `.github/workflows/ci.yml:43` (`working-directory: backend`) vs
  `AGENTS.md` ("deploy/ is the ONLY tree Docker builds"; root `backend/` is the
  dev copy)
- **what breaks:** CI runs `pytest its/tests` against the **root dev copy**.
  The dev and deploy solver test trees have already diverged:
  `test_provenance_no_leak.py` exists only in root, `test_release_calibration.py`
  only in deploy. A green CI run certifies code that is not what serves
  students. On top of that, CI pins Python **3.13** while `Dockerfile.backend:6`
  builds on **3.12**.
- **when it breaks:** Continuously — every "tests are green" claim is about the
  wrong artifact; a deploy-only regression (or a sync-deploy miss) never sees CI.
- **evidence:** `diff <(ls backend/its/tests) <(ls deploy/backend/its/tests)`
  shows the two renamed files; `git status --porcelain | wc -l` → **4,106
  uncommitted changes** in the working tree, so even the deploy tree is not
  pinned by version control.

### 3. Unauthenticated self-DoS of the solver: the heaviest endpoint is not rate-limited and its pool cannot be drained
- **file:** `deploy/backend/observability.py:207-210` vs
  `deploy/backend/services/solve_isolation.py:1-50,156,182-194`
- **what breaks:** The strict per-IP limiter covers exactly three paths
  (`paper-generator/generate`, `sandbox/solve`, `tutor/ask`).
  `POST /api/practice/deterministic/solve` — the endpoint that runs the full
  answer pipeline — is guarded only by the loose global per-worker limiter.
  The solve pool is 8 threads (`SOLVE_POOL_WORKERS: "8"` in compose) with
  queue cap 64, and its own docstring says a pathological input can "spin
  sympy for tens of minutes" and that background compute is **NOT cancelled**
  at the 60s budget.
- **when it breaks:** An unauthenticated client submits ~8 distinct crafted
  questions once; every pool thread is occupied for minutes; every subsequent
  student solve for the whole platform queues to 64 then receives the
  "solver busy" guided response. Repeatable by one laptop, day one.
- **evidence:** `HEAVY_RATE_LIMITS` dict contents; `SOLVE_MAX_QUEUE: "64"`;
  `solve_isolation.py:21-26` ("BACKGROUND — the in-flight compute is NOT
  cancelled").

### 4. The tutor WebSocket has no authentication at all — free LLM spend and identity spoofing
- **file:** `deploy/backend/api/tutor.py:474-530`
- **what breaks:** `tutor_websocket` accepts any connection, then trusts the
  client-supplied `user_id`/`student_id` (`data.get("user_id", "guest")`) for
  every `ask`/`hint`/`its_*` message, and fires real LLM calls
  (`_get_llm().explain_step_simpler`, the unified engine) on the platform's
  API key. The rate-limit and display-boundary middlewares are HTTP-only —
  websocket frames bypass both.
- **when it breaks:** Any script connects to `/api/tutor/ws` and (a) spends the
  Gemini/FreeLLM quota at line rate, (b) writes tutor-session history and
  mastery effects under any student id it names.
- **evidence:** no token check in the handler; `api/tutor.py:101`
  `_session_meta: dict = {}` also grows unbounded per process.

### 5. Practice data isolation is "best effort" — anonymous cross-student access and a shared demo identity sink
- **file:** `deploy/backend/api/practice.py:125-140` (`_enforce_session_owner`),
  `:241-300` (`_resolve_student_async`), `:1910-1946` (`get_due_reviews`)
- **what breaks:**
  - `_enforce_session_owner` only rejects when the caller is authenticated AND
    the session carries an `auth_user_id` stamp. Anonymous callers pass for
    every session (read state, submit answers, end sessions) — the session UUID
    is the only secret.
  - `_resolve_student_async` lets an anonymous caller pass **any other
    student's UUID** and start sessions / write attempts / move mastery under
    that student. No ownership check exists on the write path.
  - Non-UUID identities (`"demo"`, `"guest"`, free text) all resolve to ONE
    shared row (`_DEMO_STUDENT_NAME = "Practice Demo (shared)"`, keyed by name
    + class "demo") — every demo user's attempts and BKT history are one
    blob, permanently.
  - `GET /api/practice/review/{student_id}` has **no auth dependency
    whatsoever** — it enumerates any student's topics, mastery levels and
    inactivity ages (a stalking/PII-adjacent surface for minors).
- **when it breaks:** Any 2-minute curl session; no exploit skill required
  once a session id or student UUID leaks (logs, telemetry JSONL, referers).

### 6. Committed secrets: the deploy env carries a self-declared "not-for-prod" JWT key and the compose file hardcodes service passwords
- **file:** `deploy/.env:1` (`PLATFORM_JWT_SECRET=local-test-secret-not-for-prod-0123456789abcdef`),
  `deploy/docker-compose.prod.yml:107-130`, `deploy/backend/modules/compliance/db.py:18-20`
- **what breaks:**
  - The deploy `.env` (a gitignored-but-present artifact pattern) contains a
    JWT secret literally labelled not-for-prod. The strong-secret validator
    (`config.py:319-330`) only fires when `PLATFORM_ENV=production`; the
    compose file sets it, but every non-compose run mode the repo itself
    documents (`dev_verify.cmd`, worker container, bare uvicorn debugging)
    boots on a repo-committed key that forges student/parent/teacher JWTs.
  - `docker-compose.prod.yml` defaults: `POSTGRES_PASSWORD:-dream_secure_2024`,
    `NEO4J_PASSWORD:-dream_neo4j_2024`, Redis password inline
    (`at_mj93IR9URGYEIPaXGikkewwxkUBBiFBW`), and the compliance DB password
    `cmp_9f4k2Lw8Qz5tR1xV` is hardcoded a second time **in source**
    (`compliance/db.py:_DEFAULT`). Anyone with repo read owns the data tier.
- **when it breaks:** Day one of due diligence — this is the first thing an
  acquirer's security review flags.

---

## HIGH

### 7. `answer_memo.json`: concurrent, non-atomic, cross-process read-modify-write of the answer cache
- **file:** `deploy/backend/its/solver/answer_pipeline.py:950-976` (`_ans_memo_put`)
- **what breaks:** `_ANS_MEMO` is a module global; `_ans_memo_put` rewrites the
  **entire JSON file** (`json.dump` straight to the final path — no tmp +
  rename, no lock) on *every* verified solve. Two solver-pool threads inside
  one worker race the dict; two gunicorn workers race the file
  (`/app/cbse_data/answer_memo.json` is a shared volume). A torn write leaves
  a truncated JSON that `_ans_memo_load` silently swallows (`except Exception
  → empty memo`) — the cache silently disables and every solve re-runs at full
  cost until a clean rewrite wins. The memo also grows unbounded on a small VM.
- **when it breaks:** Under load, exactly when the memo is needed; and after
  any mid-write crash.

### 8. Global sqlite3 connection shared across threads (`check_same_thread=False`, no serialization)
- **file:** `deploy/backend/its/solver/answer_pipeline.py:802-847` (`_KEY_CONN`)
- **what breaks:** `_official_key_lookup` lazily opens one sqlite connection
  into a global and uses it from all 8 solve-pool threads. sqlite3
  connections are not thread-safe for concurrent use even with the check
  disabled — concurrent `execute` can raise `ProgrammingError`/corrupt reads.
  The `except Exception: return None` swallows it, so the official-key lane
  silently stops matching under load — degrading VERIFIED_OFFICIAL coverage
  with no signal.
- **when it breaks:** Two concurrent solves that both reach the key lane.

### 9. Practice idempotency is check-then-act, and replays still advance the session
- **file:** `deploy/backend/api/practice.py:1092-1112` (replay probe) vs
  `:1267-1272` (`_meta_inc` counters)
- **what breaks:**
  - The replay guard SELECTs for a prior `Attempt` then decides — two
    concurrent submits of the same question both miss the row and both apply
    side effects (the mastery-ledger token saves mastery; XP relies on the
    `reward_event_log` UNIQUE insert, which is fine — but the attempt row,
    analytics emit and intelligence-bus signals all double).
  - Worse: the session counters (`answered_count`, `current_index`,
    `correct_count`) increment **outside** the replay guard. A double-tap
    replay inflates `answered_count`, can mark the session complete early,
    and selects+issues an extra question. The response even logs "side
    effects skipped" while mutating session state.
- **when it breaks:** Flaky-network retries and double taps — the exact
  scenario the guard was built for (offline flush racing a live retry).

### 10. "One record rule" is dual-write without a transaction — the two mastery stores diverge by design
- **file:** `deploy/backend/services/mastery_ledger.py:189-265`
- **what breaks:** `record_assessment` writes `mastery_records` inside the
  caller's ORM transaction (SAVEPOINT) and `mastery_state` through a separate
  asyncpg pool connection that commits independently. Any crash/rollback
  between the two leaves them permanently inconsistent, and there is no
  reconciliation job. Additionally the FK-safe guard (lines 205-227) skips the
  ORM write whenever no `users` row exists while still updating `mastery_state`
  — an intentional, silent divergence the dashboard/selector will disagree on.
- **when it breaks:** Any DB blip mid-submit, any demo-session mastery write
  (demo row has no users parent), and it compounds for the life of the row.

### 11. BKT and streak updates are unsynchronized read-modify-writes on tables with no unique constraint
- **file:** `deploy/backend/services/progress_service.py:567-660`
  (`update_mastery_bkt`), `deploy/backend/services/reward_ledger.py:370-465`
  (`update_streak`)
- **what breaks:** `update_mastery_bkt` SELECTs the row(s), collapses "legacy
  duplicates" by deleting extras (the docstring admits "the table has no
  unique constraint"), then writes the posterior. Two concurrent submits on
  the same node: lost BKT update, wrong `attempts` count, and both requests
  can try to delete the same duplicate row. `update_streak` does the same
  RMW on `users.streak_days` and a SELECT-then-increment on
  `streak_records.activities_count`. No `with_for_update` anywhere in either.
- **when it breaks:** Any double-fire of the same submit (see #9) or two
  devices practicing simultaneously — the one-record rule silently isn't one.

### 12. XP exactly-once degrades to XP inflation on DB trouble, by design
- **file:** `deploy/backend/services/reward_ledger.py:352-356`
- **what breaks:** If `reward_event_log` is unavailable, the code logs
  "award applied without dedup" and pays anyway ("availability over
  exactly-once"). Combined with #9's unguarded counters, any DB flap during
  retries mints XP. There is no audit or reconciliation; XP feeds level,
  streaks and the parent digest.
- **when it breaks:** Every Redis/Postgres hiccup that coincides with a retry.

### 13. Memory: the 10GB VM is already operating past its margin, and every worker leaks monotonically
- **files:** `deploy/backend/services/enhanced_nodes.py:1053-1057` (213MB JSON
  index → in-memory Python object graph, realistically 0.5-1GB/worker),
  `deploy/backend/main.py:229-241` + `deploy/backend/its/solver/semantic_qa.py:768-780`
  (cross-encoder + Qdrant client loaded at **every boot** by `_warm_semantic_qa`
  even though the lane is default-OFF — `SEMANTIC_QA_LANE` unset),
  `deploy/backend/api/practice.py:85` (`_MEM_SESSIONS` — never evicted, no
  cap; every DB-failure demo session leaks), `deploy/backend/services/mastery_sync.py:389-493`
  (`_states` dict — every (student, topic) touched is cached per worker with
  no eviction), `deploy/backend/main.py:243-248` (compq bank ~420MB lazy per
  worker)
- **what breaks:** Per worker ≈ 1-2GB RSS before request traffic; ×2 workers
  plus neo4j (1G heap), redis (256MB), qdrant (250k × 384-dim ≈ 380MB+),
  clickhouse, the worker container, and Postgres. Compose sets **no memory
  limits** on the backends and the compose comment already records the
  observed failure mode: "4 workers spike past available RAM during boot
  (exit-137 observed)". Unbounded `_states`/`_MEM_SESSIONS` guarantee the
  RSS ratchet never comes down.
- **when it breaks:** Time + scale: a slow bleed during normal days, sudden
  OOM-kill of a worker (or the host) under any spike.

### 14. Boot fragility: the healthcheck window is shorter than the documented cold-boot, and abandoned warm threads keep loading underneath live traffic
- **files:** `deploy/Dockerfile.backend` (HEALTHCHECK `--start-period=300s`),
  `deploy/backend/main.py:219-241` (`WARM_NODES_TIMEOUT_S` default **1800s**;
  comment: "HDD index rebuild ~17min"), `main.py:184-217` (abandoned warm
  steps are daemon threads that are **not** killed)
- **what breaks:** On a cold HDD cache the nodes index alone can exceed the
  300s start-period; uvicorn binds only after the lifespan finishes, so
  healthcheck curl fails, and after `--retries=3` the container is restarted
  mid-warm — a restart loop on exactly the machines (slow disks) that need
  the longest boot. Meanwhile the "FOOLPROOF-BOOT" abandonment leaves the
  wedged loader thread running: the worker starts serving while the daemon
  thread continues parsing 14k+9k files, stealing CPU/page-cache from
  request handling (and holding the `_LOCK` for anyone who calls
  `load_index()` again — e.g. `/api/warm-status`, which the FE polls).
- **when it breaks:** Docker daemon flakes mid-boot (the known 30-60min boot
  regime), any restart after a host hiccup; quantified cascade: cold boot
  17-30 min vs 5-min healthcheck grace → guaranteed restart-loop wedge.

### 15. The semantic lane is not production-ready: dark by default, context-blind when enabled, calibrated on n≈106
- **file:** `deploy/backend/its/solver/semantic_qa.py:70-79` (lane OFF unless
  explicitly enabled), `deploy/backend/its/solver/answer_pipeline.py:1500-1503`
  (`get_matcher().query(text)` — subject/class_level/board all default empty),
  `semantic_qa.py:33-66` (calibration: 60 POS paraphrases, 26+6+14 negatives,
  single run, CPU)
- **what breaks:**
  - When enabled, the call passes no subject/class/board, so
    `_context_conflict` is inert (empty context imposes no constraint) — a
    class-6 bank row can serve a class-12 ask, and CBSE/ICSE rows are
    interchangeable, provided the CE scores ≥3.0.
  - The cross-encoder cannot separate word-mutated twins (1 of 14 mutated
    twins *ships a wrong answer* by the calibration's own table), same-type
    digit swaps are documented invisible, and the residual is acknowledged
    in the source rather than fixed.
  - Warm query is 0.9-1.77s CPU per GUIDED-leaning solve inside the 60s
    budget — under load this lane alone can dominate worker CPU.
- **when it breaks:** The moment the gate is flipped to "1" (which the code
  itself says must wait for a load test that has never run — see #1).

### 16. The verified-rate claims are self-graded on tiny, time-inflated samples
- **files:** `deploy/backend/tests/CERT_FINAL_2026-10-04.md:90`
  ("VERIFIED 50/72 = 69%"), per-subject sweeps of **3 questions × 27 pairs**,
  `deploy/backend/its/tests/conftest.py:11-15`
- **what breaks:** Three independent inflators:
  1. Test runs set `ROUTER_TIME_BUDGET=60.0` while production default is
     **5.0** — stages that time out (and honestly refuse) in prod are
     fully executed in the harness, so measured verified rates are
     structurally higher than served reality.
  2. The sweep questions are authored by the same team that authored the
     families — in-distribution by construction, no held-out corpus/
     board-paper sample is reported.
  3. Memo hits return before telemetry (`answer_pipeline.py:1003-1006`), so
     the served latency/label mix reported by `answer_telemetry.jsonl`
     systematically undercounts the memo path.
  The cert itself records 1.9-3.0s practice/start against a "<200ms"
  docstring target and 2.2-6.9s cold solves — and declares them "known, not
  a regression."
- **when it breaks:** The first independent evaluation (i.e., a customer's
  or investor's own red-team on unseen board questions).

### 17. The "zero machine-language in student strings" law is fail-open at two layers
- **files:** `deploy/backend/its/solver/answer_pipeline.py:1029-1037`
  (slop gate: "fail-open by design" — a gate exception `print`s to stderr and
  ships the raw result), `deploy/backend/services/display_scrub.py:692,805`
  (bodies >12MB and any middleware exception pass through unscrubbed)
- **what breaks:** The ICE 1.3 guarantee ("scrubs every student-facing
  solver string") is probabilistic, not enforced: any exception inside
  `gate_result`/the boundary ships raw LaTeX, node IDs, "Lane C" jargon to
  students. There is no metric alert wired to `scrub_errors`/fail-open
  counters in the serving path.
- **when it breaks:** Precisely on the weird inputs that break the gate —
  the moments most likely to contain machine-language content.

### 18. "Separate compliance database" is the same Postgres instance with the password in source
- **file:** `deploy/backend/modules/compliance/db.py:14-20`,
  `deploy/backend/modules/compliance/fulfilment.py:124-130`
- **what breaks:** "Isolated BY CONSTRUCTION" means a second database on the
  same postgres server, reachable with `atlas_compliance:cmp_9f4k2Lw8Qz5tR1xV`
  — committed in source *and* duplicated in compose. Data-subject exports
  (full PII JSON) are written unencrypted to `/app/cbse_data/compliance_exports`
  on the shared runtime_data mount readable by every container and the host.
- **when it breaks:** Any repo leak, any container compromise, any audit.

### 19. Payments: careful code, zero production mileage — the idempotency claim is unexercised
- **file:** `deploy/backend/modules/payments/router.py:250-330`, `service.py:1-20`
- **what breaks:** The module 503s without Razorpay keys ("TEST mode
  scaffold" per main.py:585-597). The webhook event-id PK claim,
  commit-before-ack and HMAC gates are well built — but no real delivery has
  ever hit them; the entitlement status machine has never processed a real
  payment, a real refund, or a real Razorpay retry storm. Treating
  "payments: done" based on this module is selling an unflown plane.
- **when it breaks:** The first live transaction (mode flip, key rotation,
  clock skew, refund flow) — all untested paths.

---

## MED

### 20. `check_qdrant()` is a synchronous HTTP call inside the async health handler — event-loop blocking
- **file:** `deploy/backend/main.py:704-712`, `deploy/backend/database/qdrant.py:17-23`
- **what breaks:** Postgres/neo4j/redis probes are gathered with a 5s
  `wait_for`; the qdrant probe is called **inline and synchronously** with no
  timeout wrapper. A qdrant outage with slow TCP timeouts blocks that
  worker's event loop for the client timeout on every health probe —
  amplifying an outage of a side service into an outage of the whole worker.
- **when it breaks:** Qdrant restart/hang while traffic flows.

### 21. The nightly "self-evolution" claim protocol is a non-atomic read-then-write stamp
- **file:** `deploy/backend/main.py:347-406` (`_evolution_loop`)
- **what breaks:** Both workers read `evolution_last_run.txt`, see >22h, and
  write the stamp before running MetaBrain — the "claim BEFORE running"
  comment is a TOCTOU, not a lock (no `O_EXCL`, no rename). Two concurrent
  MetaBrain runs read/append `interactions.json` on the shared volume while
  the request path also appends to it. Low probability per boot, but this
  loop fires for the life of the deployment and re-rolls the dice daily.
- **when it breaks:** The first boot where both workers finish their 15-min
  grace within the same poll cycle — i.e., a normal simultaneous restart.

### 22. Grading edge: percent/decimal answers don't fold, and the LLM prose verdict is a half-marks binary
- **files:** `deploy/backend/api/practice.py:2140-2240` (`_check_answer`,
  `_fold_numeric_with_unit`), `:2101-2125` (LLM verdict rule)
- **what breaks:** `_fold_numeric_with_unit` compares magnitudes, so a
  student answering `0.5` to a `50%` key is graded wrong (50 ≠ 0.5; the
  unit-class logic exists for the semantic lane but not for grading), and
  tolerance is absolute (1e-3) regardless of magnitude. Prose answers go to
  `LLMGrader` with `verdict = marks >= max_marks//2` — a 3-mark question is
  "correct" at 2 rubric marks, and the keyword fallback can pass flabby
  prose. Correctness asymmetry: deterministic lane is strict, LLM lane is
  generous, both labelled identically in the UI.
- **when it breaks:** Every numeric-with-percent item and every long-answer
  item — i.e., the higher classes the product targets.

### 23. Telemetry and queue writes are synchronous file I/O on the request path, to the mount already documented to stall
- **files:** `deploy/backend/api/practice.py:1472-1490` (`record_practice`
  inline in the async handler), `answer_pipeline.py:1044-1050` (`record_solve`
  inside the solve pool), `main.py:243-248` ("~420MB ... through the Windows
  bind mount, which is I/O-bound and stalled BOTH workers' lifespan for 90+
  minutes")
- **what breaks:** Every submit appends JSONL on the event loop; every solve
  appends from a pool thread — both to `runtime_data/ops/` on the same
  Windows bind mount that has a documented 90-minute stall incident. A
  stalled mount converts a telemetry write into a stuck request/worker.
  `answer_telemetry.jsonl` is already 3.4MB after ~2 days with unbounded
  growth and no rotation.
- **when it breaks:** Any repeat of the bind-mount stall (antivirus scan,
  disk hiccup) — the failure mode is documented as having happened.

### 24. Worker: two unkillable handlers permanently saturate the 2-thread pool
- **file:** `deploy/backend/workers/main.py:44-47,478,505-529`
- **what breaks:** "Python threads cannot be killed" — the module's own
  comment. `ThreadPoolExecutor(max_workers=2)`: two wedged heavy jobs
  (`content_reindex` over 23k files on HDD is the obvious candidate) occupy
  both threads forever; every later job is submitted, times out at 600s, is
  marked failed with backoff — and then silently executes anyway when a
  thread frees (state says failed, work actually happened). Heavy-window
  gating does not protect against a job that starts inside the window and
  never finishes.
- **when it breaks:** The second HDD-stall event; the nightly digest/nudge
  jobs then starve indefinitely behind the wedge.

### 25. The solver architecture is an archaeology of past wrong answers, not an invariant
- **file:** `deploy/backend/its/solver/answer_pipeline.py` (60+ inline guards:
  theory-ask, data-table, formula-mass, polarity ×3, energy-kind, coverage,
  answer-shape, proof-ask, non-computable, construction, figure-ref,
  hop-overrun…)
- **what breaks:** Nearly every guard carries a date and an "observed live"
  comment (`"observed live: 's - 17.9 = 0 -> 17.9' shipped VERIFIED on a
  pendulum data table"`, `"observed live: 'Design a short worksheet' ->
  VERIFIED '1/x'"`). The VERIFIED label's meaning is "no wrong-answer class
  from previous red-team waves fires on this input" — i.e., trust is bounded
  by the last attack, not by construction. Each new family added to the
  registry re-opens the surface (the polarity guard's own comment: "the
  registry gains families every batch, so the promotion gate itself must
  enforce the invariant").
- **when it breaks:** Every content wave; the correct-answer rate is a
  function of ongoing security-labour, not a stable property.

### 26. `semantic_qa._bank_rows` reads the DB password from a hardcoded Windows path
- **file:** `deploy/backend/its/solver/semantic_qa.py:519-526`
- **what breaks:** `open(r"D:\platform\deploy\.env")` — the index builder
  cannot run inside the Linux container at all, and the "resumable index"
  operational story depends on a host-shell ritual. A drive-letter path in
  shipped backend code is also a marker of the deploy/dev split problem (#2).
- **when it breaks:** The first attempt to rebuild the qa_semantic index
  from the worker/container (e.g., after a corpus change), which is the only
  context in which it would ever need to run.

### 27. Session-state advance race on `session_meta` JSONB
- **file:** `deploy/backend/api/practice.py:55-71` (`_meta_set`), `:929-938`
- **what breaks:** All session state (question store, counters, status) lives
  in one JSONB column read into Python, mutated, and written back as a fresh
  dict on the request's transaction. Two concurrent submits read the same
  `questions` store and both write back — last committer wins, the other's
  issued question/counter vanishes. The `_meta_set` docstring documents that
  SQLAlchemy change detection requires the fresh dict, which is exactly what
  makes concurrent writers clobber each other.
- **when it breaks:** Double-tap / retry races again — same trigger as #9,
  different corruption (state loss instead of double-count).

### 28. Anonymous-caller hardening exists only on `/start`; the rest of the surface trusts the world
- **file:** `deploy/backend/api/practice.py:763-769` vs every other endpoint
- **what breaks:** The B12/B20 regression fix requires a student_id or JWT
  only for `POST /start`. `marking-evaluate`, `grade-answer`, `board-answer`,
  `board-answer/weekly`, `socratic/*`, `skip`, `submit` (with a known session
  id) and `review/{student_id}` all run with no auth dependency. The
  `nightly_selfprobe` suite (`workers/main.py:219-228`) checks exactly three
  auth surfaces — compliance consent, data-request, `/auth/me` — and none of
  the practice leaks.
- **when it breaks:** Any scan of the API surface; the internal probe suite
  was written to pass, not to find this.

### 29. No restart-recovery, concurrency, or soak test exists for the write paths
- **files:** `deploy/backend/tests/` (147 test files), `deploy/backend/workers/main.py:42-43`
- **what breaks:** The suite is strong on pure functions (streak math, BKT
  formulas, skeleton gates, slop lists) and single-request flows. Zero tests
  cover: two concurrent submits to one session (#9/#27/#11), a worker crash
  between the two mastery stores (#10), restart with a stale pickle cache
  (the documented `ENHANCED_NODES_FAST_FINGERPRINT` trap in AGENTS.md is a
  manual `rm` ritual, not code), the 14-day soak the platform's retention
  promises require, or the Docker-daemon-flake boot cascade (#14). The
  worker's "Tested in backend/tests/test_worker_jobs.py" covers graceful
  SIGTERM only.
- **when it breaks:** The claims these gaps back (durability, continuity,
  "cross-device") are unverifiable — and per #2, even the tests that do
  exist run against a different tree.

### 30. `_caller_sub` accepts any structurally-valid JWT without re-checking the user, and the global limiter is per-process
- **files:** `deploy/backend/api/practice.py:93-103`, `deploy/backend/observability.py:86-91`
- **what breaks:** A JWT signed with the repo's dev secret (#6) — or any
  token whose `sub` names a deleted user — is treated as an authenticated
  caller for ownership checks (`_enforce_session_owner` compares the sub
  string, no DB lookup). Separately, the global limiter's own comment
  admits its "effective ceiling is N * rps" across workers — the loose
  layer that is the only protection for all-but-three endpoints.
- **when it breaks:** Any forged-token campaign (see #6) hits every practice
  surface at 2× the per-worker limit.

### 31. misc hygiene that signals review depth: duplicated dict key and duplicated constant
- **files:** `deploy/backend/api/practice.py:913-914` (`"class_level":
  session_class` twice in the same dict literal),
  `its/solver/answer_pipeline.py:42-44` (`VERIFIED_OFFICIAL` assigned twice)
- **what breaks:** Nothing directly — but these survive in the two most
  security-audited files of the codebase, which calibrates how much review
  the surrounding 3,000-line handlers actually received.

---

## What the ~240 green tests are actually load-bearing for (skeptic's ledger)

**Load-bearing:** `test_boundaries.py` (30 tests — the import-wall lint),
`test_slop_gate.py`, `test_display_cleanliness.py`, `test_idor_guards.py`,
`test_worker_jobs.py` (graceful shutdown), the pure math tests (streak/BKT/
skeleton/role guards), `test_family_adapter_invariant.py`.
**Theater-by-skew:** every verified-rate claim (budget 60s vs 5s, in-sample
questions, #16), every "end-to-end" test that imports root `backend/` rather
than `deploy/backend/` (#2), every claim touching concurrency, restart
recovery, or soak (#29), the load baseline (#1), payments E2E (#19).

**Honest count:** 31 findings — 6 BREAKER, 13 HIGH, 12 MED. Nothing here
should be read as "and the rest is fine": #1, #2, #3 and #5 are individually
sufficient to fail a pre-term-sheet technical audit.

---
---

# PART 2 — EMPIRICAL PHYSICS DIG + FIX WAVE (2026-10-06/07, same skeptic lane)

Method (owner-directed, supersedes static-only): one class at a time,
physics-adjacent families only (maths is the owner's), REAL questions pulled
verbatim from `deploy/content/enhanced_nodes_md/c*_physics_*.md`
(DIAGNOSTIC/WORKED_EXAMPLE/COMPETENCY sections) plus the mined NCERT board
bank (`question_bank.db`, SQLite — works with Postgres down). Every question
run in-process through `backend.its.solver.answer_pipeline.answer`,
deterministic-only (`SOLVER_LLM_MODE=off`, LLM extractor/PAL writer
monkeypatched off = the network-down production reality), graded like an
examiner against the corpus's own worked answers + hand computation.
Zero docker, zero servers. Reproducer: `D:\platform\_skeptic_scratch\`
(harness `run_battery.py`, cases `c{7,8,9,10}_cases.json`, results
`*_results*.json`, probes, owner's sweep ledger at
`deploy/backend/tests/_physics_corpus_sweep.jsonl`).

Context: SOLVER-DIG-1 (parallel lane) landed `_TABLE_C7` in
`physics_families.py` mid-dig; class-7 rows were graded on the pre-C7 engine
and my fix wave builds on C7. Postgres was taken down by the owner mid-dig:
all bank/DB-lane dependent verdicts are marked **pending live re-check**.

## The one-paragraph verdict (empirical)

Where a deterministic family exists, the engine is genuinely good (E=Pt, Q=It,
T=t/N, R=V/I, internal-resistance two-parters all verify exactly). But
coverage on its own corpus is 13-32% per class, and before this dig **every
attempted answer in the class-8 battery was wrong (10/10)** — 5/9 wrong in
class 9, 2/9 in class 7. The wrong-verify mechanism is structural: five
overlapping solving layers (math_kernel, canonical lane A, structure lane S,
catalog concept chains, modeling families) each own a partial, wrong-capable
implementation of the same physics and the first to claim wins. The
platform's guarantee instruments are hollow (see D1-D3 below). Post-fix,
class 8 stands at 12-of-14 attempts fully correct; the residual wrong is
pinned by an xfail test with file:line.

## E1. Class 7 (48 questions + 15 probes, pre-C7 grading)

| Bug class | Examples | Status |
|---|---|---|
| Chain variable misbinding, deterministic | t4/p7 water clocks: `minuend=2.0, subtrahend=200` -> **-648 mL/min** VERIFIED (expected: B faster by 10 mL/min), route `chain:2hops` | CRITICAL — fixed by SOLVER-DIG-1 `C7_SPEED_COMPARE` (pending re-run) |
| Unit-stamping: m/s computed, "degrees" stamped | r4 globe 180 deg/12 s -> "0.025 degrees" VERIFIED (expected 15 deg/s); verifier + slop gate both passed it | CRITICAL — ask-blindness class, root-fixed via LENS_POWER guard + C8 families; angular-speed family still missing (honest refusal now) |
| Series-EMF not summed | p1 "two cells in series, 1.5 V each, R=6" -> 0.25 A VERIFIED (= 1.5/6) | CONFIRMED — open (series/parallel EMF family) |
| Two-part ask, one part answered | t8/p14 NCERT "time period AND frequency" -> frequency only | CONFIRMED — open (composite-ask dispatch) |
| Heat computation absent (pre-C7) | h1-h8 + probes: 0/14 (Q=mc dT, Q=Pt, P=Q/t all refuse) | FIXED by C7 wave |
| Coverage 19% pre-fix: flow rate, proportion, shadow, Pythagoras, I=Q/t, angular speed all refuse minimal phrasings | p6/p8/p9/p11/p12/p13 | PARTIALLY FIXED (C8 adds pressure/magfield/lens/mirror; flow-rate + proportion still open) |
| Corpus OCR commas ("1.5,V", "6,Ohm") break parsing; comma-free rephrase solves-but-wrong | e2 vs p1 | CONFIRMED — corpus data-integrity + parser tolerance, open |
| Conceptual physics 0/11 (NCERT prose) | e7-e10, t10, t11, l7-l9, r8 | CONFIRMED — pending live re-check (bank lane needs Postgres) |
| Verifier validates its own intermediate, never the ask | t4, r4 steps show substitute-back "closes" on the wrong quantity | CRITICAL, structural — every wrong-verified below inherits this |
| Equal-result comparison trap refuses | e6 (both cells 20 C) | CONFIRMED (minor) |

Score: 9/48 VERIFIED, 6 correct, 1 partial, 2 wrong.

## E2. Class 8 (28 questions) — before/after the fix wave

Before: 10 VERIFIED, **0 fully correct**, 10 wrong, 17 refusals.

| Bug class | Examples | Root cause (file:line) | Status |
|---|---|---|---|
| Diopter family: any "focal length" question -> P=1/f | o2 "How far from the lens..." -> **"10 D"** VERIFIED; o3 -> 6.66667 D; o5 -> 10 D. 9 wrong-verified across classes 8-10, incl. mirrors | `structure_families.py:1502` — guard `re.search(r"power\|dioptre\|diopter\|D\b", re.I)`: under IGNORECASE `D\b` matches any word ending in "d" ("held", "should"); the guard could never fire | **FIXED** (ask-gate rewritten) |
| Ask-blindness (intermediate as final) | f1 "final speed?" -> "acceleration = 2.5"; f6 braking ask -> "weight = 15000 N"; m3 kWh+efficiency -> "864000 J" | `_c_newton2` ask-word list; `WEIGHT_MG` trigger | **FIXED** (handoff+gates) |
| Multiplier blindness | m2 five-bulb swap -> 0.3 kWh (vs 1.2); p5 -> "area = 40 * 20 = 800" (raw cm, no force) vs 156250 Pa | count regex + maths-kernel rectangle model | **FIXED** (replace-verb anchored count surviving the S0 "five"->"5" normalizer; `_model_rectangle` physics gate) |
| Trivial-identity echo | f5 "coefficient ... 0.4 ... where mu = 0.08" -> "mu - 0.08 = 0 -> 0.08" VERIFIED (coefficient, not the 8 N force) | math_kernel generic solve | **FIXED** (solve_math physics-ownership gate) -> 8 N / 1.6 N correct |
| Pressure family absent | p1-p4, p6, p7 refused; p5 wrong | no family | **FIXED** for numeric forms (2500 Pa, 7.64e6 Pa, 1200/6000 Pa, 156250 Pa all verify); compare-asks still half (p7 elephant-only) |
| `[ ^ .]{0,N}` spans break on decimals ("1.0 cm") and sentence dots ("4 hours. It") — silently | p3/p5 triggers never matched their own questions | idiom used across all family tables | **FIXED in C8** (`_SPAN` tolerant class) — SYSTEMIC: same idiom in hundreds of triggers repo-wide |
| S0 normalizer rewrites "five"->"5" before modeling reads the text | m2 count became 1 (0.24 vs 1.2 kWh) | layering | **FIXED in C8** (`_WORD_N` + verb anchoring) — SYSTEMIC for number-word triggers |
| Silent gate swallowing | my own first `_c8_efficiency` had `_fmt(eff)/100` TypeError -> dispatcher `except: continue` hid it as a "refusal" | dispatcher contract | CONFIRMED SYSTEMIC — family crashes are indistinguishable from refusals; needs import-time smoke gate |
| Catalog concept chain misbinds multi-force slots | f2 (15/12/4 N) -> **1.25** VERIFIED, route `modeling:lane_a_sweep`, emitter `catalog_executor.py:2077` step chain | slot binding has no force-role semantics | OPEN — xfail-pinned in `its/tests/test_c8_physics_corpus.py` |

After fix waves: 14 VERIFIED — **12 fully correct**, 1 half, 1 wrong (f2),
14 honest refusals. Wrong-verified rate on attempts: 100% -> 7%.

## E3. Class 9 (28 questions, pre-fix run)

| Bug class | Examples | Status |
|---|---|---|
| Diopter family on MIRRORS (mirror formula has no power at all) | o2 NCERT "4 cm object, 25 cm, concave mirror f=15" -> **"6.66667 D"** VERIFIED (expected v=-37.5 cm, m=-1.5, h'=-6 cm); o3/o4 same | Root-caused + guarded this dig; `C8_MIRROR_IMAGE` now answers the shape (pending re-run) |
| Symbol-crunched garbage verified | s2 number line -> "solved system for A: {A: 0, m: 0, x: 0}" -> **"0"** VERIFIED (expected distance 16 m / displacement 1 m) | CONFIRMED — lane A canonical, open |
| Intermediate as final | f4 resultant-force ask -> "friction = 10 N" VERIFIED | CONFIRMED — open |
| Wrong number read from the question | w2 "moves **25** m" -> "W = 120 x **5** = 600 J" VERIFIED (expected 3000 J); verifier "consistent with the givens" | CONFIRMED — same class as t4, open |
| Real NCERT electricity numericals refuse | e1 (300 C), e2 (bulb+geyser), e3 (24-ohm series) | CONFIRMED — pending live re-check (Postgres) |
| Works | w6 = 24 J, q1 = 60 Hz exact;
---
---

# PART 2 — EMPIRICAL PHYSICS DIG + FIX WAVE (2026-10-06/07, same skeptic lane)

Method (owner-directed, supersedes static-only): one class at a time,
physics-adjacent families only (maths is the owner's), REAL questions pulled
verbatim from `deploy/content/enhanced_nodes_md/c*_physics_*.md`
(DIAGNOSTIC/WORKED_EXAMPLE/COMPETENCY sections) plus the mined NCERT board
bank (`question_bank.db`, SQLite — works with Postgres down). Every question
run in-process through `backend.its.solver.answer_pipeline.answer`,
deterministic-only (`SOLVER_LLM_MODE=off`, LLM extractor/PAL writer
monkeypatched off = the network-down production reality), graded like an
examiner against the corpus's own worked answers + hand computation.
Zero docker, zero servers. Reproducer: `D:\platform\_skeptic_scratch\`
(harness `run_battery.py`, cases `c{7,8,9,10}_cases.json`, results
`*_results*.json`, probes, owner's sweep ledger at
`deploy/backend/tests/_physics_corpus_sweep.jsonl`).

Context: SOLVER-DIG-1 (parallel lane) landed `_TABLE_C7` in
`physics_families.py` mid-dig; class-7 rows were graded on the pre-C7 engine
and my fix wave builds on C7. Postgres was taken down by the owner mid-dig:
all bank/DB-lane dependent verdicts are marked **pending live re-check**.

## The one-paragraph verdict (empirical)

Where a deterministic family exists, the engine is genuinely good (E=Pt, Q=It,
T=t/N, R=V/I, internal-resistance two-parters all verify exactly). But
coverage on its own corpus is 13-32% per class, and before this dig **every
attempted answer in the class-8 battery was wrong (10/10)** — 5/9 wrong in
class 9, 2/9 in class 7. The wrong-verify mechanism is structural: five
overlapping solving layers (math_kernel, canonical lane A, structure lane S,
catalog concept chains, modeling families) each own a partial, wrong-capable
implementation of the same physics and the first to claim wins. The
platform's guarantee instruments are hollow (see E7/D1-D3 below). Post-fix,
class 8 stands at 12-of-14 attempts fully correct; the residual wrong is
pinned by an xfail test with file:line.

## E1. Class 7 (48 questions + 15 probes, pre-C7 grading)

| Bug class | Examples | Status |
|---|---|---|
| Chain variable misbinding, deterministic | t4/p7 water clocks: `minuend=2.0, subtrahend=200` -> **-648 mL/min** VERIFIED (expected: B faster by 10 mL/min), route `chain:2hops` | CRITICAL — fixed by SOLVER-DIG-1 `C7_SPEED_COMPARE` (pending re-run) |
| Unit-stamping: m/s computed, "degrees" stamped | r4 globe 180 deg/12 s -> "0.025 degrees" VERIFIED (expected 15 deg/s); verifier + slop gate both passed it | CRITICAL — ask-blindness class, root-fixed via LENS_POWER guard + C8 families; angular-speed family still missing (honest refusal now) |
| Series-EMF not summed | p1 "two cells in series, 1.5 V each, R=6" -> 0.25 A VERIFIED (= 1.5/6) | CONFIRMED — open (series/parallel EMF family) |
| Two-part ask, one part answered | t8/p14 NCERT "time period AND frequency" -> frequency only | CONFIRMED — open (composite-ask dispatch) |
| Heat computation absent (pre-C7) | h1-h8 + probes: 0/14 (Q=mc dT, Q=Pt, P=Q/t all refuse) | FIXED by C7 wave |
| Coverage 19% pre-fix: flow rate, proportion, shadow, Pythagoras, I=Q/t, angular speed all refuse minimal phrasings | p6/p8/p9/p11/p12/p13 | PARTIALLY FIXED (C8 adds pressure/magfield/lens/mirror; flow-rate + proportion still open) |
| Corpus OCR commas ("1.5,V", "6,Ohm") break parsing; comma-free rephrase solves-but-wrong | e2 vs p1 | CONFIRMED — corpus data-integrity + parser tolerance, open |
| Conceptual physics 0/11 (NCERT prose) | e7-e10, t10, t11, l7-l9, r8 | CONFIRMED — pending live re-check (bank lane needs Postgres) |
| Verifier validates its own intermediate, never the ask | t4, r4 steps show substitute-back "closes" on the wrong quantity | CRITICAL, structural — every wrong-verified below inherits this |
| Equal-result comparison trap refuses | e6 (both cells 20 C) | CONFIRMED (minor) |

Score: 9/48 VERIFIED, 6 correct, 1 partial, 2 wrong.

## E2. Class 8 (28 questions) — before/after the fix wave

Before: 10 VERIFIED, **0 fully correct**, 10 wrong, 17 refusals.

| Bug class | Examples | Root cause (file:line) | Status |
|---|---|---|---|
| Diopter family: any "focal length" question -> P=1/f | o2 "How far from the lens..." -> **"10 D"** VERIFIED; o3 -> 6.66667 D; o5 -> 10 D. 9 wrong-verified across classes 8-10, incl. mirrors | `structure_families.py:1502` — guard `re.search(r"power\|dioptre\|diopter\|D\b", re.I)`: under IGNORECASE `D\b` matches any word ending in "d" ("held", "should"); the guard could never fire | **FIXED** (ask-gate rewritten) |
| Ask-blindness (intermediate as final) | f1 "final speed?" -> "acceleration = 2.5"; f6 braking ask -> "weight = 15000 N"; m3 kWh+efficiency -> "864000 J" | `_c_newton2` ask-word list; `WEIGHT_MG` trigger | **FIXED** (handoff+gates) |
| Multiplier blindness | m2 five-bulb swap -> 0.3 kWh (vs 1.2); p5 -> "area = 40 * 20 = 800" (raw cm, no force) vs 156250 Pa | count regex + maths-kernel rectangle model | **FIXED** (replace-verb anchored count surviving the S0 "five"->"5" normalizer; `_model_rectangle` physics gate) |
| Trivial-identity echo | f5 "coefficient ... 0.4 ... where mu = 0.08" -> "mu - 0.08 = 0 -> 0.08" VERIFIED (the coefficient, not the 8 N force) | math_kernel generic solve | **FIXED** (solve_math physics-ownership gate) -> 8 N / 1.6 N correct |
| Pressure family absent | p1-p4, p6, p7 refused; p5 wrong | no family | **FIXED** for numeric forms (2500 Pa, 7.64e6 Pa, 1200/6000 Pa, 156250 Pa all verify); compare-asks still half (p7 elephant-only) |
| `[ ^ .]{0,N}` spans break on decimals ("1.0 cm") and sentence dots ("4 hours. It") — silently | p3/p5 triggers never matched their own questions | idiom used across all family tables | **FIXED in C8** (`_SPAN` tolerant class) — SYSTEMIC: same idiom in hundreds of triggers repo-wide |
| S0 normalizer rewrites "five"->"5" before modeling reads the text | m2 count became 1 (0.24 vs 1.2 kWh) | layering | **FIXED in C8** (`_WORD_N` + verb anchoring) — SYSTEMIC for number-word triggers |
| Silent gate swallowing | my own first `_c8_efficiency` had `_fmt(eff)/100` TypeError -> dispatcher `except: continue` hid it as a "refusal" | dispatcher contract | CONFIRMED SYSTEMIC — family crashes are indistinguishable from refusals; needs import-time smoke gate |
| Catalog concept chain misbinds multi-force slots | f2 (15/12/4 N) -> **1.25** VERIFIED, route `modeling:lane_a_sweep`, emitter `catalog_executor.py:2077` step chain | slot binding has no force-role semantics | OPEN — xfail-pinned in `its/tests/test_c8_physics_corpus.py` |

After fix waves: 14 VERIFIED — **12 fully correct**, 1 half, 1 wrong (f2),
14 honest refusals. Wrong-verified rate on attempts: 100% -> 7%.

## E3. Class 9 (28 questions, pre-fix run)

| Bug class | Examples | Status |
|---|---|---|
| Diopter family on MIRRORS (mirror formula has no power at all) | o2 NCERT "4 cm object, 25 cm, concave mirror f=15" -> **"6.66667 D"** VERIFIED (expected v=-37.5 cm, m=-1.5, h'=-6 cm); o3/o4 same | Root-caused + guarded this dig; `C8_MIRROR_IMAGE` now answers the shape (pending re-run) |
| Symbol-crunched garbage verified | s2 number line -> "solved system for A: {A: 0, m: 0, x: 0}" -> **"0"** VERIFIED (expected distance 16 m / displacement 1 m) | CONFIRMED — lane A canonical, open |
| Intermediate as final | f4 resultant-force ask -> "friction = 10 N" VERIFIED | CONFIRMED — open |
| Wrong number read from the question | w2 "moves **25** m" -> "W = 120 x **5** = 600 J" VERIFIED (expected 3000 J); verifier "consistent with the givens" | CONFIRMED — same class as t4, open |
| Real NCERT electricity numericals refuse | e1 (300 C), e2 (bulb+geyser), e3 (24-ohm series) | CONFIRMED — pending live re-check (Postgres) |
| Works | w6 = 24 J, q1 = 60 Hz exact; s4 centripetal value-correct (units/direction omitted) | — |

Score: 9 VERIFIED, 2 correct, 1 half, 1 value-only, 5 wrong (56% of attempts).
Board-realistic numericals: 1/12.

## E4. Class 10 (24 questions, pre-fix run)

| Bug class | Examples | Status |
|---|---|---|
| Diopter family, third class running | o5 -> "10 D"; o7 dentist mirror -> "(a) 12.5 D; (b) 12.5 D; (c) 12.5 D"; b1 NCERT -> "5 D" | Same root cause — guarded; C8 families cover |
| One quantity repeated for (a)(b)(c) | x8 oven: charge/power/energy ask -> "resistance = 22" three times VERIFIED | CONFIRMED — open |
| Correct value, wrong ask | b2 benzene: 2e8 m/s computed (right), ask was "% reduction" | CONFIRMED — open |
| Magnetism 0/3 pre-fix | m1-m3 refused | FIXED in C8 (`C8_MAGFIELD_WIRE`/`_COIL`, direct-compute verified) |
| Works | x5 48.89 ohm; x6 "I = 1.5 A; terminal voltage = 8.4 V" (two-part, exact) | — |

Score: 7 VERIFIED, 2 correct, 1 half, 4 wrong, 58% refusals.

## E5. Owner's corpus-sweep instrument: shipped unrunnable

`tests/physics_corpus_sweep.py:91` calls `time.time()` with **no
`import time`** — every row would land in the CRASH handler as NameError.
Fixed (1-line import) and run (PER_CLASS=6, classes 6-12): 38 questions,
SOLVE=5 (13%), WRONG=4, VERIFY_SOFT=4, REFUSE_NUM=5, REFUSE_OK=24, CRASH=0.
Two of the 4 WRONGs are the instrument's own grader (first-number-in-key
matching): c10 "48.8889 ohm" matches its key — false WRONG. Grader is also
quantity-blind (a "10 D" answer passes when the number matches). Real finds:
outlier-mean answered 0.47619 vs 2.15 (fixed: `C8_OUTLIER_MEAN`) and an
SI-units question answered **"3 million"** VERIFIED (lane A garbage binding,
open — same class as c9-s2). Ledger kept at
`deploy/backend/tests/_physics_corpus_sweep.jsonl`.

## E6. Fix ledger (this lane's edits; files-only, in-process verified)

| File:Line | Change |
|---|---|
| `its/solver/structure_families.py:1489` `_c_lens_power` | ask-gate rewritten (power/dioptre word or standalone uppercase D) — kills the 9-count diopter class |
| `its/solver/physics_families.py` `_TABLE_C8` (new, 14 gated families) + dispatcher scan order | EFFICIENCY, SAVED_KWH, FINAL_SPEED_FMA, ACCEL_WITH_RESISTANCE, FRICTION_FROM_MA, STATIC_FRICTION, PRESSURE_AREA_CM, PRESSURE_POINT, PRESSURE_VEHICLE, MAGFIELD_WIRE, MAGFIELD_COIL, LENS_IMAGE_INFINITY, MIRROR_IMAGE, OUTLIER_MEAN |
| `_c_newton2` | final-speed handoff + net-force gate (2 forces + resistance words) |
| `_c_weight` | friction-coefficient gate (no more bare W=mg on braking asks) |
| `_c_kwh` / `_c_power_time` | handoffs to SAVED_KWH / composite EFFICIENCY |
| `math_kernel.py` `solve_math` + `_model_rectangle` | physics-ownership gates (coefficient/pressure/tyres contexts refused by the maths kernel) |
| `physics_corpus_sweep.py:16` | missing `import time` (instrument crash) |
| `its/tests/test_c8_physics_corpus.py` (new) | 15 must-verify + never-wrong-verified + diopter regression + 1 xfail (catalog misbind, file:line pinned) |

Residuals (open, documented): f2 catalog misbind (xfail), p2/p7 comparison
asks (half), series-EMF family, angular-speed family, flow-rate/proportion
families, conceptual-physics answering (pending live re-check), m3 rounding
(13% vs 13.33%).

## E7. New systemic evidence found by running the engine (adds to Part 1)

- **D1 (BREAKER-adjacent).** The strongest correctness test in the repo,
  `its/tests/test_redteam_regression_pcm.py::test_never_wrong_verified`,
  loads its corpus from `deploy/redteam_attack/questions.json` — **the
  directory does not exist in the deploy tree**; the only copies are in
  `D:\platform\_trash\redteam_attack\`. In a clean deploy checkout the test
  cannot collect. The launch gate's solver self-test
  (`harness/launch_check.py:181`) is 3 planted cases. Everything in this
  report sailed through both.
- **D2 (HIGH).** `release_calibration.json` (the "verified-rate" evidence):
  declares `min_probes: 4` yet contains families with 2 probes;
  144/555 families skipped `no_control`; probes are family-shaped (own
  trigger, own ask) so real-board asks are never measured. Part 1 #16's
  budget-skew (60 s vs 5 s) compounds this.
- **D3 (HIGH).** PAL lane is dead in production: `pal_templates.py:50` loads
  from CBSE_DATA_DIR (= `/app/cbse_data` = the runtime_data mount, compose
  line 184) but `pal_templates.json` exists only at
  `deploy/cbse_data/pal_templates.json` — FileNotFoundError logged 3x per
  solve, lane always-off. All battery numbers above are prod-faithful.
- **D4 (MED).** ~5.6 s/question warm in-process; 9-16 s on guided/semantic
  routes. The 60 s solve budget holds, but latency is a product question.
- Cross-references to Part 1: demo-student sink (#5), `_MEM_SESSIONS` (#13),
  XP fail-open (#12), committed creds (#6/#18) — all re-confirmed by code
  read during this dig; no contradictions found.

## E8. CLASS 9 FULL-DEPTH SWEEP + P11 (2026-10-07, same lane)

Owner's instrument extended to class 9 at full depth (every c9_physics file,
81 diagnostic pairs; `D:\platform\_skeptic_scratch\c9_sweep.py`,
`c9_full_sweep.jsonl`). Post-fix tallies: SOLVE=3, WRONG=15, VERIFY_SOFT=1,
REFUSE_NUM=13, REFUSE_OK=49 (pre-fix: SOLVE=9, WRONG=17). The SOLVE drop and
REFUSE_OK rise are the intended trade from the prose-essay guard: wrong-node
essays and soft keyword matches became honest refusals.

Grader honesty note: of the 15 WRONG rows, at least 5 are artifacts of the
instrument's first-number matching on two-part/error-evaluation asks
(e.g. "work = 48 J" flagged against a key whose first number differs;
"3 units (kWh)" flagged vs a joules-first key). The REAL residual classes:

| Bug class | Examples | Status |
|---|---|---|
| Number-line distance/displacement -> symbol-crunched "0" | ch2_1 x2 (incl. the error-evaluation ask) | OPEN — lane A canonical garbage binding (s2 class) |
| Unit-of-ask mismatch | "average speed in m/s" -> "80 km/h" VERIFIED | OPEN — answer-shape gate knows ask units for some families only |
| Multi-part asks served half | ch2_10 (direction missing), ch2_11 (b) missing, ch4_8 KE missing, Arjun/Meera compare = 400 J half | OPEN — systematic multi-part dispatch gap |
| Work-energy theorem asked, acceleration answered | ch4_11 | **FIXED this pass** (`_c_newton2` work-ask gate + WET trigger) |
| Friction-work sign + **corpus key arithmetic error** | ch4_11: engine 54 J, corpus key -27 J, physics -54 J. The key's own line "(1/2)(3)(6^2) = 27" is wrong: it is 54. Corpus defect recorded | engine magnitude now correct; sign pinned via rest-binding (`_c_work_energy_theorem`) |
| Wrong-node model answers served VERIFIED | ch5_9 ultrasound -> frequency-node text; ch6_9 series circuit -> class-12 LCR essay | **FIXED** (`ask_shape:prose_essay_refused` at the `answer()` choke point — the wrapper path carried an EMPTY audit route, so `_answer_core`'s guards never saw it) |
| Stated-g ignored by the slot-schema lane | PE ask with "(Take g = 10)" -> 29.4 J (g=9.8) | **FIXED** (`slot_schema.py` POTENTIAL_ENERGY honours stated g -> 30 J; default-g case still 29.4 J) |
| Unit-prefix parse: "10 m/s^2" read as v = 10 m/s | PE ask answered KE = 100 J via multi-hop `kinetic_energy_from_velocity` | **FIXED** (`multi_hop_solver.py:_UNIT_PATTERNS` negative lookahead on `^`; same class as DIG-1's sci-notation drop) |

### P11 ROUTING GAP — root cause + fix (handed over by DIG-1, closed here)

Signature: the dispatcher computes (`model_physics_families` matches, e.g.
`C8_MAGFIELD_COIL` 0.000157 T, `C8_PRESSURE_VEHICLE` 156250 Pa,
`C8_MIRROR_IMAGE` 60 cm) but `answer()` serves GUIDED — the in-pipeline
lane never routes to the registry. Root cause: `_lane_b`'s reader stack
(`competency_reader.read_narrative` et al.) returns GUIDED ("Narrative needs
reading support") and `_reader_result`'s rescue consulted only the
auto-binders — never the structure registry. Fix: the rescue now runs
`_independent_sweep` with the same promotion gate as the lane-A sweep
(`answer_pipeline.py`, `reader:registry_rescue` route tag). Verified
end-to-end: magnetic coil, tractor pressure, mirror formula, outlier mean,
heater current, mercury column all serve VERIFIED through `answer()`.

Coverage gaps handed over by DIG-1 — closed:
- heater current from P/V -> `C8_CURRENT_FROM_PV` (1500 W at 220 V -> 6.82 A)
- mercury column P = h*rho*g -> `C8_COLUMN_PRESSURE` (76 cm, 13600 kg/m^3
  -> 103360 Pa)

### Regression status (this lane's test file)

`its/tests/test_c8_physics_corpus.py`: 31 passed, 1 failed, 1 xfailed.
The one failure (pressure vehicle through the FULL `answer()` wrapper) is a
genuine open item: every layer beneath the wrapper verifies correctly
(dispatcher, model_problem, `_lane_b`, multi-part, multi-hop all return
156250 Pa) while the top-level wrapper still loses it with an empty audit
route — the next tracing session starts at `_answer_impl`'s wrapper
dispatch. The failing test is the documentation, deliberately left red.
