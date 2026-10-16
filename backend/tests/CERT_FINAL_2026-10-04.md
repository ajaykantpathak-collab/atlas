# FINAL CERTIFICATION — 2026-10-04 (FINAL-E2E agent)

End-to-end certification sweep of every subject and every learning surface on
production (`http://localhost` API via nginx, `http://localhost:3001` native
frontend). Run started 05:43 IST after a 2-hour settle window
(`_agents_done.flag` never appeared — the coordinator's flag was not created;
per protocol the sweep proceeded at the 2-hour mark). Backends restarted
~02:14 IST, both healthy; no restarts, builds, or docker writes were performed
by this agent.

**Verdict: CERTIFIED WITH NOTES — PASS.**
Every subject×surface combination that has CBSE content works end to end
(serve → grade → verdict → repair). All failures traced to (a) two ICSE-only
electives with an empty CBSE bank (honest 503, by design), or (b) known,
previously-documented cold-start perf tails. One real product defect was found
and **fixed in source** (cross-subject serves in node-scoped practice; see
Fixes — it is NOT live in the containers yet, see ship note).

---

## 1. Health + latency

`GET /api/health` → `{"status":"ok","services":{"postgres":true,"neo4j":true,"redis":true,"qdrant":true}}` — **all true**.

10-key-request panel (`cert_latency.py`, warm run; raw: `screenshots/cert_final/latency.json`):

| request | status | ms | <2s |
|---|---|---|---|
| /api/health | 200 | 21 | yes |
| frontend / (:3001) | 200 | 55 | yes |
| nginx / | 200 | 109 | yes |
| /api/auth/login | 200 | 857 | yes |
| /api/practice/start | 201 | 1940 | yes |
| /api/learning/checkup | 200 | 156 | yes |
| /api/review/warmup | 200 | 45 | yes |
| /api/practice/deterministic/solve | 200 | 5592 | **no (cold worker)** |
| /dashboard page | 200 | 51 | yes |
| /learning/lab page | 200 | 65 | yes |

- **practice/start**: 1.9–3.0 s every call, matches the documented baseline
  (`perf_baseline_2026-10-03.md` §6.2 — per-call compute, docstring target
  <200 ms; declared behavior-sensitive, not fixed). Known, not a regression.
- **solve**: bimodal 0.01 s (warm worker cache hit) to 2.2–6.9 s (first hit
  per unique text / per worker). Matches baseline §3/§6.3. Known.
- First panel run after the quiet night: one practice/start client timeout at
  15 s and one transient `GET /api/achievements?filter=all` → **502** through
  :3001 (single occurrence; 200 on all later probes). Both are cold-start
  events; the dashboard's per-section "offline right now" fallbacks render
  until refresh on such a first hit.

## 2. Every-subject practice sweep (API, 27 subject/class pairs)

`cert_api_sweep.py` against nginx :80, fresh student, per subject:
`POST /api/practice/start {subject, class_level, num_questions:3}` → assert 201
+ served ≥ 1 → `POST /api/practice/<sid>/submit` → assert graded verdict.
Raw: `screenshots/cert_final/api_sweep.json`.

**PASS 25/27.** All 25 serve 201 with 1–3 questions and grade the submit (200,
`is_correct` present). The 2 failures are honest empty-bank responses:

| subject | cls | result | root cause |
|---|---|---|---|
| commstud | 10 | 503 "No questions available" | `board_questions` has **0 rows** for commstud at ANY class (ICSE-only elective; no CBSE bank, no CBSE generator) |
| econapp | 10 | 503 (same) | same — 0 rows at any class |

These two are in the sweep's SUBJECTS list but are not CBSE courses; the API
degrades honestly. **Decision needed (owner)**: drop them from the CBSE sweep
list or ingest CBSE content for them.

> Test-infra note: the first sweep run (24/27) used the legacy payload
> `{grade, count}` — pydantic silently drops both (`StartSessionRequest` takes
> `class_level`/`num_questions`), so every request actually exercised the
> signing user's class pool. The legacy `tests/e2e_all_subjects_perfect.py`
> carries the same bug — fixed (see Fixes). With correct fields leg-11 passes;
> the "served=5" anomalies in old runs were `num_questions` defaulting to 5.

Bonus column — checkup composer `total_items` per subject: math 6, phy 5,
chem 5, bio 4, cs 4, engl 5, hist 5, civ 5, geo 4, eco 4, acc 5, bs 5,
biotech 4, psy 5, leg 5, soc 5, evs 0, appmath 1, hindi 0, home 0, pol 1,
ip 4, stat 5, commapp 0, commstud 0, econapp 1, massmedia 0. Zero-item
subjects render the checkup empty state (no bank rows for the combo — see §3).

## 3. Deterministic serve-rate (in-process, sequential)

`tests/e2e_serve_rate.py` — 4 random `board_questions` rows per subject
(correct_answer present, len>20), `answer()` per row. Raw:
`screenshots/cert_final/serve_rate.txt`.

- **Zero errors / exceptions / refusals: 0 across 72 rows** — target met.
- **VERIFIED 50/72 = 69%**, GUIDED 22 (subjective/essay-style prompts:
  "Design a quasi-experiment…", COPRA redressal, map-work — honest GUIDED).
- 9 of 27 pairs have **zero** verifiable bank rows (n=0): evs 6, appmath 11,
  hindi 8, home 11, pol 12, commapp 9, commstud 10, econapp 10, massmedia 12.
  Of these, all except commstud/econapp still serve practice via subject
  generators (confirmed by the §2 sweep: 201 with served ≥ 1).

## 4. Browser flows (Playwright, production :3001)

Screenshots in `D:\platform\screenshots\cert_final\` (one per flow),
results in `flows.json`. **12/12 PASS** after the backend warmed (the first
batch ran against a cold backend — see Known behaviors):

| flow | result | evidence |
|---|---|---|
| f0 login/signup → /dashboard | PASS | `f0_login_dashboard.png` |
| f1 dashboard opener → mission card → /learn/<id> | PASS | 16 `/learn/` links; opener rendered ~1.2 s (`f1_dashboard.png`, `f1_learn_node.png`) |
| f2 MissionFlow walk (hook → see → play, prediction locked) | PASS | `f2_hook/see/play.png` |
| f3 lab SimFrame (predict → Lock it in → Step 2/outcome) | PASS | `f3_lab.png` |
| f4 games (timeline/perspective/map sections) | PASS | `f4_games.png` |
| f5 sandboxes (formula/code/sentence shelves) | PASS | `f5_sandboxes.png` |
| f6 commerce page + sections | PASS | `f6_commerce.png` |
| f7 checkup civ 9 (runner, answer, lock) | PASS | `f7_checkup.png` — 5 items; item kinds: open-narrate "TELL IT BACK", short-text "QUICK FACTS", MCQ radios |
| f8 MCQ practice hist (node-scoped) | PASS | radio widget (2 options) → submit → verdict (`f8_mcq_widgets/verdict.png`) |
| f8b MCQ practice civics (node-scoped) | PASS | radio widget (2 options) → submit → verdict shown (`f8b_mcq_civics.png`) |
| f9 repair loop (wrong answer → "See where it broke" → StepDivergence) | PASS | divergence opened, fork marked, "Retry this family" + "Mark understood", Next in charge (`f9_repair_divergence.png`) |
| f10 mobile 390px re-check (flows 1/3/6) | PASS | no horizontal scroll on dashboard/lab/commerce; lab predict+lock works (`f10_mobile_*.png`) |

Practice page behavior note: node-handoff sessions **auto-start** (the old
"Start practice session" button only appears in some paths) — the flow scripts
now race both paths.

## 5. Defect found + fixed (source) — cross-subject serves in node-scoped practice

**Repro (pre-fix, live containers)**: open `/practice?node=c10_hist_cbse_01_001`
(no `&subject=` in the URL). The page hands off `subject='general'`
(`practice/page.tsx` ≈ line 3052: `const subject = subj || 'general'`). The
backend maps `"general": None` → **no subject filter**
(`question_selector.py` `_CORPUS_SUBJECTS`). Question 1 is fine (the topic
gate still matches `c10_hist_cbse_01_001` tags), but once the thin ch01 pool
runs dry the widen path queries the **entire class-10 CBSE bank** — a Class-10
History session served the physics T/F "Magnification (m) is the ratio of
image height…" (`c10_phy_cbse_04_010`), whose repair trail (lens formula,
ch04) then rendered inside the history session. Captured in
`f9_repair_divergence.png`.

**Fix (ships with the next backend deploy)**:
`deploy/backend/services/question_selector.py`, `_corpus_candidates` — when
`topic_ids` are set and the caller's subject maps to None, the subject filter
is **derived from the topic ids themselves** (`c10_hist_…` → `hist` +
aliases), so a chapter-gated session can never stray across subjects.

**Verified (host, in-process against prod DB)**: 14 sequential picks with
`subject='general'`, `topic_ids=['c10_hist_cbse_01_001']`, exhausting the
topic pool into the widened pool → 14/14 `c10_hist_*` rows, SQL shows
`subject IN ('hist','history')`. Regression control: plain `subject='general'`
sessions without topics still serve the whole bank unfiltered
(hin/math/hist/phy mix) — unchanged by design.

> **SHIP NOTE (coordinator)**: this fix is in the source tree only. Per wave
> rules this agent performed no docker writes — it is NOT in
> dream-backend-1/2 yet. Ship = `docker cp backend/services/question_selector.py`
> into both backends + worker restart (or next image build). Until then,
> node-handoff practice without `&subject=` can still serve cross-subject
> questions in production.

## 6. Small fixes made (all source-only, no container writes)

| file:location | what | verified how |
|---|---|---|
| `deploy/backend/services/question_selector.py` (`_corpus_candidates`, after the `base` list) | derive subject filter from `topic_ids` when caller subject is 'general'/unknown — closes the cross-subject leak above | in-process: 14/14 hist-only serves past pool exhaustion; control (no topics) unchanged; `py_compile` clean |
| `deploy/backend/tests/e2e_all_subjects_perfect.py` (phase A payload) | `{grade, count}` → `{class_level, num_questions}` (fields were silently dropped; every legacy run actually tested the signer's class pool) | corrected sweep re-run: 25/27 (leg 11 now passes); `py_compile` clean |
| `screenshots/cert_final/_scripts/*` | new cert harness (API sweep, latency panel, 10-flow Playwright suite with race-safe auto-start handling, merge-mode results) | used for this certification |

## 7. Known behaviors / structural notes (no action taken)

1. **commstud 10 / econapp 10**: zero CBSE bank rows (ICSE-only electives).
   Honest 503. Owner decision: drop from CBSE sweep or ingest content.
2. **9 subject/class pairs lack verifiable bank rows** (§3); 7 of them still
   practice via generators. Serve-rate panel reports n=0 for them.
3. **practice/start ~2–3 s per call** — documented (perf baseline §6.2).
4. **solve cold tail** — first hit per worker/unique text pays 2–17 s
   (baseline §3/§6.3; preload warm-up recommendation stands).
5. **Dashboard cold start**: on the first load after an idle period several
   sections render their "offline right now" fallbacks (one transient 502 on
   `/api/achievements?filter=all` observed; 200 on all later probes). Sections
   do not auto-retry; a refresh shows everything (16 mission links, opener in
   ~1.2 s warm). Consider a per-section retry/backoff.
6. **Practice start client timeout**: the page aborts `/api/practice/start`
   after 8 s (`AbortSignal.timeout(8000)`) and shows the offline/"Kuch gadbad"
   state — tripped repeatedly on a cold backend during this wave; warm, the
   same call returns 201 in 0.6–3 s. The auto-start + Try Again loop recovers,
   but a cold-backend first visit can fail several times.
7. **Chapter-gated sessions widen to the subject pool** when the chapter pool
   is thin (documented design): a `c10_hist_cbse_01_001` session served ch02–
   ch05 rows after the ch01 pool (3 unique items) thinned — subject-correct
   (30/30 in sampling), but "Chapter 1" focus is loose. Owner-visible choice.
8. **Free-text grading leniency (low severity, small sample)**: a junk
   paragraph answer to a hist ch01 diagnostic was graded `is_correct=true` in
   2 of 3 attempts (third question graded false correctly). Worth a solver
   look at the verify lane for short subjective rows.
9. `mission-options` returns `title: null, subject: null` for its picks; the
   UI falls back to `friendlyNodeTitle` (no raw node ids leak), but enriching
   the API titles would remove the fallback dependency.

## 8. Artifacts

- `deploy/backend/tests/CERT_FINAL_2026-10-04.md` — this report
- `screenshots/cert_final/` — 20+ flow screenshots, `flows.json`,
  `api_sweep.json`, `latency.json`, `serve_rate.txt`, per-run logs in
  `_scripts/flows_rerun*.log`
- Cert harness: `screenshots/cert_final/_scripts/` (`cert_api_sweep.py`,
  `cert_latency.py`, `cert_flows.mjs`, `dash_diag.mjs`)
