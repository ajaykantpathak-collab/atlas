# INCORPORATION PLAN — Atlas engine, post-council

**Author:** INCORP (incorporation engineer). **Date:** 2026-10-04.
**Status:** PLAN-ONLY per owner redirect. Zero product code written; zero containers touched; zero dev servers booted. Working tree verified clean (`git status` on `deploy/backend` + `deploy/frontend` → empty).

**Inputs:** the five council reports (PRAGMATIST, SKEPTIC, SCIENTIST, PEDAGOGY, PARENT — session `sess_7c63673f`, Oct 4), plus my own read-only verification pass over `deploy/backend` and `deploy/frontend`. Every claim about existing code below carries a `file:line` citation I personally read this session. Claims taken from council reports that I did not independently verify are marked *(council, unverified)*.

---

## 0. Executive summary

The council converges on one structural verdict: **the engine is already good enough for the test; the launch vehicle and the observability are not.** Three moves dominate everything else:

1. **Stop the silent activation.** The semantic lane's gate defaults ON in source (`deploy/backend/its/solver/answer_pipeline.py:1099` — `os.environ.get("SEMANTIC_QA_LANE", "1") != "0"`). Any routine redeploy arms it with a documented wrong-answer mode (SKEPTIC F2; calibration note `semantic_qa.py:47-52`). Default OFF + four cheap guards is hours of work; skipping it risks the exact screenshot that kills the "never wrong" brand.
2. **Instrument before perfecting.** The refusal queue (`D:\platform\runtime_data\answer_queue.jsonl`, 859 rows today, format `ts/question/lane/label/refusal_reason`) proves the append-only pattern works. Extending it to per-answer telemetry + routing-miss logging converts the 14-day test from opinions into the prioritized backlog (PRAGMATIST §3.8; SKEPTIC missing #7).
3. **Ship the stragglers.** Two fixes sit in source but not in containers: the cross-subject serve leak (`services/question_selector.py` `_corpus_candidates`, ship note at `deploy/backend/tests/CERT_FINAL_2026-10-04.md:149-154`) and every other source-only wave since the last restart. One batch, one ship, verified by curl.

The kill list removes ~6 weeks of planned work (synthesis mining, humanities scaffolds, textcat training, full-bank sweep on the host, 20,411-node bespoke audit, latency cert document, zero-LLM proof document, FCM). The double-down list is ~5 working days of small, verified-value changes plus the WhatsApp/School-Test product loop the PARENT council would renew for.

---

## 1. Two facts that reorder everything

**F-a. The host is the budget.** Docker's WSL vhdx and the Windows pagefile both live on the 932GB 7200rpm HDD *(PRAGMATIST, verified by that agent against the host; I did not re-verify)*. The measured load ceiling is **5 concurrent users** — p95 9.7s, 19.2% solve errors, stop condition tripped (`deploy/backend/tests/perf_baseline_2026-10-03.md:47-68`), caused by `SOLVE_POOL_WORKERS=4 × 2 workers` CPU saturation. Every plan line that spends host CPU (sweeps, training, index rebuilds) competes with five kids at 8 PM.

**F-b. The engine is already certified at the product level.** CERT_FINAL (Oct 4): 12/12 browser flows, 25/27 API sweep (2 honest 503s on ICSE-only electives), 72-row serve-rate probe with **zero errors/refusals, 69% VERIFIED** (`CERT_FINAL_2026-10-04.md:11, 58-95`). The remaining risks are trust-killers, not capability gaps: junk graded correct 2/3 (§7.8), a source-only cross-subject fix (§5), an 8s client abort on cold start (§7.6), and an un-armed semantic lane.

**The owner's 8 engine criteria** — I could not find a single criteria document on disk; this reconstruction is from the council's own references and should be confirmed against the owner's original list:
| # | Criterion (as referenced by council) | Referenced at |
|---|---|---|
| C1 | Full-bank sweep: verified-or-honest-refusal, zero errors | SKEPTIC §5.1, F4 |
| C2 | Per-board serve rates (CBSE vs ICSE/ISC partition) | SKEPTIC F3, missing #4 |
| C3 | Node completeness over ~20,411 nodes | SKEPTIC §5.4, missing #8 |
| C4 | Router / lane-selection quality | SKEPTIC §5.6, F8 |
| C5 | Semantic QA lane live and hardened | SKEPTIC §5.3 |
| C6 | Zero-LLM proof / tripwires | SKEPTIC §5.1 |
| C7 | Latency p95 under load | SKEPTIC §5.2, F9 |
| C8 | Masked-recompute lane for changed-number paraphrases | SKEPTIC F6, §5.5 |

---

## 2. QUESTION 1 — THE KILL LIST (what we are building uselessly)

### K1. Solver synthesis mining / auto-registered families (Plan item A) — **CUT**
- **Was for:** closing pool-exhaustion refusals by inducing solver families from question clusters and auto-registering them into the VERIFIED-shipping registry.
- **Why kill:** SKEPTIC F5 — an induced formula verified on 3 held-out rows is a hypothesis with a confidence interval wired into the one registry that ships answers to children; there is no quarantine tier or rollback anchor. PRAGMATIST table: "research project with an unbounded QA surface — auto-generated content is the one thing a 'never hallucinates' brand cannot afford." And the demand signal is already masked: thin pools widen to subject by design (`question_selector.py:1320, 1390`), so a 15-min/day student never feels exhaustion.
- **Resurrection evidence:** telemetry (Phase 1) names the top-5 refusal families by real volume; each family is then hand-authored + full-bank-verified by the existing sweep harness (SKEPTIC's "reviewed additions with a full-bank verification run attached"). Induced-only registration stays dead permanently.

### K2. Humanities scaffold engine (Plan item B) — **DEFER**
- **Was for:** structured scaffolds for humanities answers.
- **Why defer:** CERT §4 shows humanities passing everything built (timeline/perspective/map flows, 5-item checkups); no documented user-visible failure. SKEPTIC F7 additionally shows the component it would build on is dead code: `its/solver/theory_rubric.py` has **zero production callers** (grep this session: only `its/tests/test_solver_expansion.py:161-219` imports it), and it grades rather than serves — wiring an uncalibrated grader (COVER_THRESHOLD=0.5, no calibration evidence) multiplies the cert §7.8 junk-passing failure.
- **Resurrection evidence:** tester session-length/repair-queue data showing humanities drop-off; or the marking-coach lane (`services/marking_coach.py`, called at `api/practice.py:1294-1296`) showing calibrated demand.

### K3. Variable-masked recompute as a full pre-launch lane (Plan item C) — **KEEP PARKED, honest NOT MET for C8 this cycle**
- **Was for:** answering changed-number paraphrases ("15% of 300" after learning "15% of 200").
- **Why park:** SKEPTIC F6 — the digit-subset guard (`semantic_qa.py:273-291`) refuses every different-numbers paraphrase *by construction*, so C8 needs a brand-new lane (mask → template match → `quantity_binder` rebind → recompute → consistency check); the pieces exist (`quantity_binder.py`, 861 lines, called from `catalog_executor.py:4476-4584`) but there is no harness, route, or precision gate. SCIENTIST §2 is right that skeleton+recompute is the *correct eventual architecture*, but it is a multi-week build with an index pass over 253k rows on the HDD host — exactly what F-a forbids pre-test.
- **Resurrection evidence:** the C8 gate itself — SKEPTIC's format: 500-row changed-number harness, ship only at ≥98% recompute precision; otherwise report **"C8: NOT MET, measured"** with the confusion matrix.

### K4. spaCy textcat router training (Plan item D) — **CUT the training line; kill the current model**
- **Was for:** subject routing of free-form doubts (criterion C4).
- **Why kill:** the training already ran and finished, and the result is poor — `deploy/backend/training/router_model_subject/model-best/meta.json` measured this session: **macro F = 0.569, micro F = 0.629** (SKEPTIC CLAIM 3 confirmed exactly). The corpus leaks non-subject labels into the model: `SUBJ_gram` and `SUBJ_ca` are live labels in `meta.json` (SCIENTIST §3.1 predicted this from `build_corpus.py` deriving `subject_cats` from an unsorted 2,000-row sample). SKEPTIC F8: wiring F=0.57 into the selector is a routing regression dressed as criterion work.
- **Resurrection evidence:** (a) post-test routing-miss log shows miss rate >15% *and* (b) a cheap TF-IDF+linear baseline (SKEPTIC's 1-hour alternative, trained on the existing 218k DocBins) beats F≥0.85 on the dev split; then shadow-mode only (SCIENTIST rec #8: evaluate at lane level, demote textcat to fallback). Subject is already a *function* of routed structure for anything that reaches a solver family — the router only owns the residual.

### K5. Full-bank 253k sweep run on the production host (Plan item F) — **CUT from the host; relocate, don't cancel** (see §5, contradiction #1)
- **Was for:** criterion C1 evidence.
- **Why cut *from the host*:** it already crashed there — `D:\platform\runtime_data\ops\sweep2_checkpoint.json` shows **offset 100 of 253,903** (EXACT_HIT 68, SOFT_HIT 8, SLOW_GUIDED 17, GUIDED 6, VERIFIED_NOKEY 1) and SKEPTIC quotes the log's `MemoryError` / `can't start new thread` / paging-file errors. Owner's own law bans heavy jobs outside 02:00-05:00 (AGENTS.md §5) → 3h/night × 35-70h = 12-23 nights of crash-prone compute competing with the closed test.
- **Resurrection evidence:** any non-host machine (or VPS) running the fixed runner to 253,903/253,903 with zero ERROR-class rows. The runner itself is good engineering — resumable checkpoint + order fingerprint (`tests/sweep_full_runner.py:221, 339` per SKEPTIC CLAIM 4) — it needs a `board` column in `fetch_rows` (lines 188-200 select no board today — verified this session) and SOFT_HIT/VERIFIED_NOKEY reclassified out of "verified" in `classify()` (lines 241-258: a SOFT_HIT is the served answer *disagreeing* with the stored key, currently counted in the verified figure).

### K6. Bespoke 20,411-node completeness audit framework (Plan item G) — **CONVERT to telemetry**
- **Was for:** criterion C3.
- **Why kill the bespoke version:** sweeps find gaps nobody opens (PRAGMATIST table: "instrument 'node opened → thin content' and fix live"). SKEPTIC's cut list already gives the cheap path: per-node file/sections/bank checks feeding the **existing** `answer_queue.jsonl` mechanism rather than a new framework.
- **Resurrection evidence:** post-test telemetry showing which class-bands real users occupy → sweep only those.

### K7. Latency certification document (Plan item I) — **REPLACE with a soak**
- **Was for:** criterion C7 evidence.
- **Why kill the document:** a synthetic cert on a quiet box measures the wrong thing — the box IS production (SKEPTIC F9), and the perf baseline's own top-3 causes (dedicated solve process, CAS-family timeout, NVMe/tmpfs for the node index that takes ~384s to first load) are largely unshipped. PRAGMATIST: replace with a half-day soak — 5 concurrent scripted users over the real tunnel on final hardware, measuring first-question time, practice/start p95, and "offline right now" fallback counts.
- **Resurrection evidence:** the soak report itself; a re-run of `perf_results/` only after the cause-fixes land.

### K8. Zero-LLM proof *document* (Plan item H) — **SHRINK to a log field now**
- **Was for:** the anti-Gauth moat claim.
- **Why:** PRAGMATIST — the full proof document is Play Store marketing collateral, not a launch blocker; one `llm_used` field per answer plus a weekly grep produces the artifact for free over 14 days. **Incorp finding the council missed:** `api/practice.py:1789-1826` (`_evaluate_answer`) routes prose answers through `services/llm_grader.py` `LLMGrader.grade()` — an LLM **in the grading path**. A telemetry row hardcoded `llm_used: false` would be a lie for prose grades. The field must be derived from the actual path (`llm_used = true` iff LLMGrader graded), and the marketing claim must be scoped to *answer serving* (the `answer()` pipeline, `answer_pipeline.py:785`, is deterministic by construction), not to grading.
- **Resurrection evidence:** n/a — the field is the resurrection (the document gets written from 14 days of rows later).

### K9. Push/FCM transport — **CUT for this cycle**
- **Why:** no FCM exists in `deploy/backend` (verified: services listing contains only `whatsapp_service.py`; PRAGMATIST confirmed the same) and building FCM mid-test is a 1-2 day detour with keys/review risk. `services/whatsapp_service.py` already carries `send_text`/`send_template_message`/`send_homework_notification` (lines 269, 359, 730, 776). PARENT confirms WhatsApp is the channel parents actually read.
- **Resurrection evidence:** WhatsApp digest engagement data showing channel exhaustion (unlikely at n≈20 testers).

### K10. Semantic-lane full index rebuild *right now* (board field in Qdrant payloads) — **DEFER to the skeleton wave**
- **Why:** `_bank_rows` selects no board and `build_index` payloads carry none (`semantic_qa.py:146-150, 188-196` — verified), so cross-board contamination is real (SKEPTIC F3; contrast `bank_answer.py:110,121` which filters `board = 'CBSE'`). But a full 253k re-embed is hours of the HDD host for a lane that should ship **OFF** anyway. The staged rollout gets a post-hoc board check via the existing `_full_question` pk-fetch pattern (`semantic_qa.py:112-126`) — 1ms per serve — and the payload gains `board` at the next rebuild (which the skeleton pipeline of Phase 4 requires regardless; SCIENTIST §2.1 computes skeletons on full text, killing the 600-char truncation at `semantic_qa.py:192` that forces these re-fetches at all).
- **Resurrection evidence:** n/a — scheduled work, not killed intent.

### K11. Re-implementing the MCQ backfill — **VERIFY, DON'T BUILD**
- **Incorp finding:** the P0-5 "backfill MCQ with text rows" appears **already present in source**: `services/question_selector.py:1404-1425` — "MCQ pool priority (2026-10-03) … keep the full corpus draw, mcq rows first", i.e. `rows = mcq_rows + [r for r in rows if r.id not in seen]`. The certification's under-fill finding ran against *containers* predating the 2026-10-03 wave (same ship-gap as §5). Write no new code until a container-state check proves the source is absent there.
- **Resurrection evidence:** a post-ship `e2e_mcq_per_subject.py` run (exists at `deploy/backend/tests/e2e_mcq_per_subject.py`) showing full requested counts with choice rows first.

---

## 3. QUESTION 2 — DOUBLE DOWN (highest verified-value-per-effort)

### D1. Ship-state reconciliation + kill-switch defaults — **0.5-1 day, day 0, blocking**
The cert's ship note says it plainly: the cross-subject fix "is in the source tree only … NOT in dream-backend-1/2 yet" (`CERT_FINAL_2026-10-04.md:149-154`). SKEPTIC missing #6: nobody's task list owns "verify containers match source."
- **Build:** one batch — `question_selector.py` cross-subject fix (source already contains it, `_corpus_candidates`), `answer_pipeline.py:1099` default `"1"`→`"0"`, plus any other source-only waves; one manifest regen; one health-gated restart per backend (SHIP DISCIPLINE §2).
- **Acceptance evidence:** `docker exec` grep transcripts showing shipped files match source; post-restart curl probes: (a) junk text → honest guided/unverified, (b) a real bank question → VERIFIED, (c) `SEMANTIC_QA_LANE` unset → **zero** `VERIFIED_SEMANTIC` serves in the log; `python -m py_compile` clean on all changed files.

### D2. Telemetry — the actual deliverable of the test — **1 day**
PRAGMATIST §3.8: "Without this the 14 days produce opinions, not data." SKEPTIC missing #7 independently demands the label-distribution monitor.
- **Build:** append-only JSONL (new `deploy/backend/its/telemetry.py` or extend the `answer_queue.jsonl` writer — same fail-safe pattern, 859 rows prove it survives). One row per `/solve` (`api/verified_practice.py:590` `solve_deterministic`) and per practice submit (`api/practice.py` submit handler, grading at line 1010): `{ts, anon_student_hash, subject, class_level, label, llm_used (derived — see K8), refusal_reason, latency_ms, route_taken, board}`. Routing-miss log: when `question_selector` widens below the requested count or serves a thin chapter (the widen branch at `question_selector.py:1390`), append `{type: routing_miss, requested, served, pool_size, topic_ids}` — the spaCy training set for free (PRAGMATIST cut D justification).
- **Acceptance evidence:** N requests → N rows; a daily one-liner (cron or on-boot) printing VERIFIED/GUIDED/VERIFIED_SEMANTIC/twin-refusal counts; `llm_used=true` observed on exactly the prose-graded submits.

### D3. Cold-start hardening — **0.5 day; mostly frontend, backend verified already-correct**
Cert §7.6: the page "aborts `/api/practice/start` after 8 s … tripped repeatedly on a cold backend." PRAGMATIST risk #2 calls first-session "Kuch gadbad" the highest-frequency real failure.
- **Build (frontend):** `deploy/frontend/app/(student)/practice/page.tsx:398` `AbortSignal.timeout(8000)` → 20000 with ONE automatic retry (honest copy exists — the loading screen already says it is preparing), and line 538 `AbortSignal.timeout(5000)` → 15000 for `/submit`.
- **Backend — verified, better than the council knew:** SKEPTIC CLAIM 6 called the warm "misleading" but the mechanism itself is sound this session: `main.py:158-165` `_warm_model` → `model_hub.preload()` (`ai/model_hub.py:74-79`) → `_load_sync()` sets the shared `_MODEL` (lines 29-61); `semantic_qa._st()` (`its/solver/semantic_qa.py:70-75`) loads through the *same* `model_hub.load_sync()` singleton, as do the solver-path embedders (model_hub docstring lines 42-46). `main.py:179-191` warms the CE + a full query. **No dead-instance fix needed.** The residual cold cost is the first-unique-text compute per worker (cert §7.4's 5.6s cold solve) — which the 20s client budget absorbs. The verification the SKEPTIC actually wants is operational: the canonical log line "MiniLM loaded (shared singleton)" (`model_hub.py:59`) must appear exactly once per worker after restart.
- **Acceptance evidence:** cold-boot the dev instance → first `/start` succeeds inside 20s; retry path exercised by killing the backend once mid-start; tsc clean; grep of boot logs shows one MiniLM line per worker.

### D4. Strict free-text grading during the test — **0.5-1 day**
Cert §7.8: "a junk paragraph … graded `is_correct=true` in 2 of 3 attempts." This poisons BKT mastery data (false positives promote nodes) and is a screenshot waiting to happen (PRAGMATIST risk #4).
- **Build:** in `api/practice.py` `_evaluate_answer` (line 1789): junk detector (no content words / repeated chars / non-sequitur heuristics) before the LLMGrader branch — junk → `False` with an honest framing (`feedback.explanation` variant: "unverified — the examiner would score this 0"), never `is_correct=true`. Genuine prose keeps the LLMGrader path (line 1817).
- **Acceptance evidence:** in-process probes — 3 junk paragraphs → all `is_correct=false` with the unverified framing; 3 real prose answers still grade as before; no regression in `e2e` grading suites.

### D5. Semantic lane hardening + staged rollout — **2-3 days, gated flip**
SKEPTIC missing #1/#3 + F2; the only P0 that touches a live wrong-answer mode.
- **Build (all in `its/solver/semantic_qa.py` + `answer_pipeline.py`):** default OFF (D1); a `VERIFIED_SEMANTIC` serve additionally requires (a) matched row's `question_type` ∈ FACT types (never numerical/long_answer — those belong to computable lanes), (b) same `class_level` (payload already carries it, `semantic_qa.py:194`), (c) the existing digit-subset guard (lines 283-291), and (d) board agreement via the post-hoc `_full_question` fetch (K10). Document the residual honestly in a comment: word-mutated twins with identical digits remain a known CE limitation (calibration note lines 47-52: 13/14 refused; the one miss mutated words).
- **Gate to flip ON:** calibration harnesses green (re-run `_calib_harness.py` / `_calib_neg_harness.py`, artifacts `_calib_results*.json`); a 10-user load probe with lane ON vs OFF against the 5-user ceiling (perf_baseline §2); 48h label-distribution monitor after flip. Daily log line: VERIFIED_SEMANTIC count, twin-refusal count, board-refusal count.
- **NOT MET path:** if the load probe degrades p95 past the stop condition or calibration regresses, ship the test with the lane **OFF** and report **"C5: NOT MET this cycle — lane hardened but load-gate not passed; measured numbers attached."** An honest guided fallback is strictly better than an unverified serve (the file's own fail-closed contract, `semantic_qa.py:13-14`).

### D6. Item-conditioned guess rate + constant unification — **0.5 day, post-test week 1**
SCIENTIST rec #5 — the highest-leverage parameter change: `g` fixed at 0.2 overstates evidence 2.5x on true/false and understates 4x on numericals; make `g = f(question_type)` in `services/mastery_sync.py`, and unify the duplicated constants (`bkt_p_learn` vs `bkt_p_transit`; journey prior 0.3 vs mastery 0.1).
- **Acceptance evidence:** unit tests pinning g per type; a grep proving one constant module; re-probe-survival unchanged or better over a week of attempts.

### D7. WhatsApp digest, for real — **0.5-1 day**
PARENT verdict #2: "a delivered WhatsApp message on Sunday evening is a retention tool" — the transport exists (`services/whatsapp_service.py`), only the digest composition is missing. Ship the designed one-per-week card **plus** the three verification additions PARENT names: today's one line, the attempt-before-answer rate, the school-test trend (empty until D8 feeds it). No guilt notifications, pause keyword, opt-in.
- **Acceptance evidence:** one real message to the tester group per week for the test's duration; the attempt-rate stat derivable from D2 rows.

### D8. The School-Test Loop — **the post-test feature build (2-3 days)**
PARENT verdict #1 — "the only feature that turns 'an app my child plays' into 'the thing that moved the report card'": score entry → error mapping via the existing 20-family misconception catalog (`its/solver/misconception_catalog.py`) → repair mission via existing Doubt-to-Mission machinery → next-test correlation in the digest. All engine parts exist; only the parent-facing loop and the 10-second score-entry ritual are missing. Also closes the "uska rank kya hai?" question (PARENT verdict #3) — the digest's growth line + band is the replacement answer.

### D9. Per-board numbers everywhere — **piggyback, no dedicated sprint**
SKEPTIC missing #4. Add `board` to `sweep_full_runner.fetch_rows` (lines 188-200) and to the semantic index payload at the next rebuild (K10); telemetry rows carry `board` from D2 onward. C2 becomes measurable for free.
- **Acceptance evidence:** sweep findings JSONL and telemetry rows both carry board; C2's per-board serve-rate table falls out of D2+D9 data.

---

## 4. QUESTION 3 — THE BEST 10/10 BUILD PATH

Sequencing principle: **trust-killers before capabilities; observability before optimization; host CPU only for the test, never against it.** Time boxes assume one engineer; wall-clock items marked ⟲ run unattended.

### Phase 0 — Stop the bleeding (Day 0-1; ~1 day)
| Step | Work | Done when (evidence) |
|---|---|---|
| 0.1 | `SEMANTIC_QA_LANE` default "1"→"0" (`answer_pipeline.py:1099`) | grep shows `"0"` default; lane-off probe returns no VERIFIED_SEMANTIC |
| 0.2 | Ship batch: `question_selector.py` fix + all source-only waves, one manifest regen, one health-gated restart per backend | docker-exec file diffs clean; `/api/health` green on both; curl triple (junk→guided, real→VERIFIED, semantic-off) |
| 0.3 | FE cold-start patch (D3) + tsc | first `/start` on cold backend succeeds ≤20s; one retry proven |
| 0.4 | Junk-grading guard (D4) | junk probes never `is_correct=true`; real prose unchanged |
| 0.5 | Boot-warm verification (D3 backend) | "MiniLM loaded (shared singleton)" exactly once per worker |

**Fails its gate if:** any container diff mismatches source after ship → the batch re-ships once; if junk still passes, the detector tightens before anything else proceeds (this is the trust core).

### Phase 1 — Instrument (Day 1-2; ~1 day, parallel with Phase 2)
| Step | Work | Done when |
|---|---|---|
| 1.1 | Telemetry rows on /solve + submit (D2) | N calls → N rows; fail-safe proven (DB down → rows still land) |
| 1.2 | Daily label-distribution line | one grep-able line/day: VERIFIED, GUIDED, VERIFIED_SEMANTIC, twin-refusals |
| 1.3 | Routing-miss log (D2) | thin-chapter widen events appear as rows |
| 1.4 | `board` in telemetry + sweep `fetch_rows` (D9) | both artifacts carry board |

**Fails its gate if:** telemetry emits <1 row/request or can throw into the request path — the writer must be fire-and-forget.

### Phase 2 — Semantic lane: harden → gate → flip ⟲ (Day 2-5; ~2-3 days + 48h monitor)
| Step | Work | Done when |
|---|---|---|
| 2.1 | Word-twin guards: qtype-FACT-only, class match, digit subset (exists), board check (D5) | twin probes (the 14 calib twins + role-permutation probes like "15% of 200" vs "200% of 15" — SCIENTIST §1's false-accept class) all refuse |
| 2.2 | Calibration re-run green | `_calib_results*.json` re-generated, gates unchanged |
| 2.3 | Load probe lane ON vs OFF at 10 users | p95 within stop-condition budget (perf_baseline §2) |
| 2.4 | Flip ON in prod; 48h monitor | daily line shows VERIFIED_SEMANTIC > 0, twin-refusals > 0, zero wrong-answer reports |

**NOT MET format (explicit):** "C5 NOT MET this cycle — lane default OFF; guards implemented; load gate measured at X p95 (> budget); calibration Y/60. Residual: word-mutated twins, documented `semantic_qa.py:47-52`." The test then runs with the lane off — honest, zero-error, criterion 5 re-gated post-test.

### Phase 3 — The test itself (14 days; ~1h/day operator time)
- Daily: WhatsApp digest (D7), refusal/thin-family triage from telemetry, fix top families **by hand** (PRAGMATIST "during the test" list).
- Weekly: `llm_used` grep (K8) — the zero-LLM claim's running proof (C6 evidence accumulates here, not in a document).
- **Never:** run the sweep, retraining, or index rebuilds on the host (K5, AGENTS.md §5). Also fold in the PRAGMATIST owner actions that are not code: host disk move to NVMe, Play Store track submitted this week, 20+ testers recruited, subject hygiene (hide the two zero-bank electives — owner decision, cert §7.1).

### Phase 4 — Post-test: the engine build (weeks 1-4 after)
| Step | Criterion | Time | Done when / NOT MET |
|---|---|---|---|
| 4.1 | C1+C2: fixed sweep on **non-host** machine ⟲ (chunked per (subject,class) with process exit between chunks — SKEPTIC §5.1; board column; SOFT_HIT/VERIFIED_NOKEY reclassified) | 2d setup + ~2.5-3 days continuous (or ~2 weeks of night windows) | findings JSONL at 253,903/253,903, zero ERROR-class rows, per-(subject,class,board) EXACT_HIT table. **NOT MET:** sweep not schedulable → C1 reported as "sampled-certified (72 rows, 0 errors) — full sweep pending", never inflated with SOFT_HIT (the F4 trap) |
| 4.2 | C8: skeleton-first pipeline prototype (SCIENTIST §2 — symmetric masking, skeleton-hash clustering, per-cluster program induction, recompute; reuse `bank_answer.digit_skeleton` + `quantity_binder`) with the leave-one-member-out harness (SCIENTIST rec #2) | 4d + eval ⟲ | 500-row changed-number harness confusion matrix; ship gate ≥98% precision else **"C8 NOT MET, measured"** and the lane downgrades to GUIDED-with-method (SKEPTIC §5.5) |
| 4.3 | C4: 1-hour TF-IDF+linear router on the existing 218k DocBins; shadow-mode only; corpus bugs fixed first (label set from full table, drop prose-labeled rows, remove `gram`/`ca` — SCIENTIST §3) | 1-2d | dev F ≥ 0.85 → shadow logs; else **"C4 NOT MET, F=X.XX measured"**, textcat model file quarantined so it can never be wired (SKEPTIC F8) |
| 4.4 | C3: node completeness scoped to the class-bands telemetry shows users occupied; misses → `answer_queue.jsonl` | 2d | per-gap report + queue triage |
| 4.5 | C7: cause-fixes (CAS-family timeout → honest GUIDED; dedicated solve process vs documented 5-user ceiling; NVMe for the node index), then the soak (K7) | 3d | soak report: first-question time, start p95, fallback count; **NOT MET** = documented 5-user ceiling with the mitigation chosen |
| 4.6 | C6: proof document written **from** the 30 days of telemetry rows | 0.5d | the artifact, generated not authored |
| 4.7 | Mastery upgrades: item-conditioned g (D6), IRT offline calibration (SCIENTIST rec #4 — canned `[0.3,0.5,0.7,…]` buckets make θ a random walk today), threshold A/B via `rule_ab_tester` (SCIENTIST rec #6), School-Test Loop (D8) | 5-7d | re-probe survival A/B result; calibrated b table per subject |

### Dependency graph
```
Phase 0 (ship + defaults) ──► Phase 1 (telemetry) ──► Phase 3 (14-day test)
        │                            │                      │
        └──► Phase 2 (semantic gate) ┘──► C5 flip decision  │
                                                            ▼
                              Phase 4: 4.1 (sweep, non-host) ⟲ independent
                                        4.2 (skeleton/C8) ← needs telemetry top-families
                                        4.3 (router/C4)   ← needs 1.3 miss logs
                                        4.4 (C3)          ← needs telemetry class-bands
                                        4.5 (C7 soak)     ← needs Phase 0 shipped
                                        4.6 (C6 proof)    ← needs 30 days of 1.1 rows
                                        4.7 (mastery)     ← independent of all above
```
Hard ordering rules: telemetry (1.1) before any post-test prioritization; the C5 flip before the test only if its gate passes, else the test runs with the lane OFF (2.4's NOT MET branch); the sweep never on the host, hence never blocking anything.

---

## 5. COUNCIL CONTRADICTIONS — both positions, my adjudication

**#1. The full-bank sweep.** PRAGMATIST: "CUT from pre-launch — and forbid running it on the host during the test" (self-sabotage on the HDD). SKEPTIC: "Fix the sweep and restart it — it IS criterion 1," 2d setup then wall-clock.
**Adjudication: both are right on different axes — separate the *where* from the *when*.** SKEPTIC is right that C1 is unprovable without it (the 72-row sample is a sample; the crash at row 100 is real — `sweep2_checkpoint.json` offset 100). PRAGMATIST is right that it cannot touch the host during the test. Resolution: fix the runner (board column, reclassification, chunking) now (~2d, no host compute), run it on a non-host machine during the test window, and treat host refusals-from-real-usage as the completeness signal meanwhile. If no second machine exists, C1 is reported honestly as sampled-certified, not inflated.

**#2. The semantic lane.** PRAGMATIST: "SHIP IT, or cut it — the worst state is the current one" (built, wired, delivering zero data). SKEPTIC: "default ON is a countdown" — default OFF, load gate, monitor first.
**Adjudication: SKEPTIC's rollout mechanics with PRAGMATIST's urgency.** The current state (default ON, waiting for an accidental deploy) genuinely is the worst state. But PRAGMATIST's "ship behind a kill-switch before day 1" underestimates F2's residual: a documented word-twin wrong-answer mode wearing a VERIFIED label. The 2-3 day hardening bundle (D5) is small and converts "ship or cut" into "ship when measured-green, else report NOT MET." Either terminal state is honest; the current limbo is not.

**#3. The router.** PRAGMATIST: CUT entirely, log misses, train spaCy post-test only if miss rate >15%. SKEPTIC: CUT the textcat line, but spend 1 hour on a TF-IDF baseline. SCIENTIST: demote textcat to fallback regardless; subject is a function of routed structure; fix the corpus bugs first.
**Adjudication: kill the training line (the bad model at F=0.569 proves the point), log misses now (free, D2), and the optional 1-hour TF-IDF baseline happens only post-test and only in shadow mode.** All three councils agree the criterion-4 spend is last in value; they differ only on whether a cheap baseline is worth an hour — defer it until telemetry shows the miss rate actually matters.

**#4. Recompute (C8).** Author's plan: "parked pending A/B harness." SKEPTIC: not parked — *structurally blocked* by the guard; a multi-day build being described as a line item. SCIENTIST: the full skeleton pipeline is *the* answer to the owner's core challenge, built as specified it would poison the harness (asymmetric masking, hand-authored A/B sets, silent binding).
**Adjudication: SCIENTIST owns the destination, SKEPTIC owns the timeline.** Adopt the skeleton+recompute architecture and the leave-one-member-out harness wholesale — but in Phase 4, with the ≥98% precision gate and the explicit "C8 NOT MET, measured" fallback. Nothing about the closed test needs C8; the digit-subset guard plus D5's FACT-type gate keeps the current lane safe until the real build lands.

**#5. Junk grading.** No contradiction — cert §7.8 (measured), PRAGMATIST risk #4, SKEPTIC F7 all converge. The only incorp addition: any `llm_used` telemetry must account for LLMGrader in the grading path (`api/practice.py:1808-1826`), or C6's proof inherits a lie (K8).

**#6. Cold start.** SKEPTIC CLAIM 6: mechanism shipped, "verified" claim overstated (today's cold solve measured 5.6s, cert §1). PRAGMATIST: it is the #1 launch risk and worth 3-4h.
**Adjudication: verified this session that the warm chain is genuinely singleton-correct** (`main.py:158-191` → `model_hub.py:74-79, 34-61`; `semantic_qa.py:70-75` loads the same instance), so no backend rework is needed — the residual is first-unique-text compute, which the frontend budget change (20s + one retry) absorbs. SKEPTIC's real demand — operational proof — becomes 0.5's one-log-line-per-worker check.

---

## 6. Deliberately NOT done from my original P0 brief (redirect status)

The owner redirect arrived before implementation; **zero of P0-1..P0-5 were coded.** Their disposition under this plan:
- **P0-1 (semantic staged rollout)** → D5 / Phase 2, fully specified above with file:line.
- **P0-2 (telemetry)** → D2 / Phase 1; with the K8 correction (`llm_used` derived, not hardcoded false).
- **P0-3 (cold start)** → D3; the backend half was verified already-correct this session — only the FE patch remains.
- **P0-4 (strict grading)** → D4 / Phase 0.
- **P0-5 (MCQ backfill)** → K11: appears already in source (`question_selector.py:1404-1425`); verify container state at Phase 0.2 rather than re-implementing.

Also deliberately not in this plan (owner-level, not code): the host disk/pagefile move, Play Store bundle submission, tester recruitment, and the hide-the-zero-bank-electives decision — all PRAGMATIST W0 items that need owner hands, listed in Phase 3 so they are not lost.

---

## 7. Appendix — verified-facts ledger (session citations)

| Fact | Citation |
|---|---|
| Semantic lane gate defaults ON | `deploy/backend/its/solver/answer_pipeline.py:1098-1099` |
| Lane fires only on GUIDED, fail-closed | `answer_pipeline.py:1087-1097` |
| Twin calibration residual (13/14, word-mutation miss) | `deploy/backend/its/solver/semantic_qa.py:47-52` |
| Digit-subset guard | `semantic_qa.py:273-291`; `_full_question` fetch `:112-126` |
| Index payload: no board; text truncated at 600 | `semantic_qa.py:188-196` (payload dict), `:192` (`q: r[1][:600]`) |
| bank_answer filters `board='CBSE'` (contrast) | `deploy/backend/its/solver/bank_answer.py:106-123` |
| Warm chain is shared-singleton-correct | `deploy/backend/main.py:158-191`; `deploy/backend/ai/model_hub.py:29-79`; `semantic_qa.py:70-75` |
| FE abort budgets 8s/5s | `deploy/frontend/app/(student)/practice/page.tsx:398, 538` |
| Junk graded correct 2/3 | `deploy/backend/tests/CERT_FINAL_2026-10-04.md:186-190` (§7.8) |
| Cross-subject fix source-only, ship note | `CERT_FINAL_2026-10-04.md:122-154` (§5) |
| Grading path: `_check_answer` → LLMGrader for prose | `deploy/backend/api/practice.py:1789-1826` (evaluate at `:1010`) |
| Router model macro F 0.569 / micro 0.629; `SUBJ_gram`, `SUBJ_ca` labels | `deploy/backend/training/router_model_subject/model-best/meta.json` (`performance.cats_*`) |
| Sweep dead at offset 100 of 253,903; class counts | `D:\platform\runtime_data\ops\sweep2_checkpoint.json` |
| Sweep `fetch_rows` selects no board; SOFT_HIT/NOKEY in classify | `deploy/backend/tests/sweep_full_runner.py:188-200, 241-258` |
| MCQ backfill present in source (mcq rows first) | `deploy/backend/services/question_selector.py:1404-1425`; lane docstring `:664-669`; widen-on-thin `:1390` |
| Refusal queue exists (859 rows, append-only) | `D:\platform\runtime_data\answer_queue.jsonl` |
| `theory_rubric.py` has zero production callers | grep: only `deploy/backend/its/tests/test_solver_expansion.py:161-219` |
| 5-user load ceiling, p95 9.7s, 19.2% err | `deploy/backend/tests/perf_baseline_2026-10-03.md:47-68` |
| WhatsApp transport exists (no FCM anywhere) | `deploy/backend/services/whatsapp_service.py:269, 359, 730, 776-843` |
| Serve-rate probe: 69% VERIFIED, 0 errors/72; 9 pairs n=0 | `CERT_FINAL_2026-10-04.md:83-95` (§3) |
| e2e suites present for verification | `deploy/backend/tests/e2e_mcq_per_subject.py`, `tests/e2e_serve_rate.py` |

*Working tree at report time: clean — no product code modified this session (verified via `git status` on `deploy/`).*
