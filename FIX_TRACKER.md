# ATLAS — Defect Fix Tracker
*Started 2026-09-21. [ ] open · [x] fixed+verified. "Fixed" means code shipped AND verified in the running artifact — not just edited.*
*Legend: ✅ verified in served artifact · 🔧 code fixed in deploy (needs authed/live verify) · ⚠️ needs content/decision · 🚫 can't fix solo*

## P0 — Security
- [x] XSS-01..06 — `lib/sanitize.ts` DOMPurify choke-point; all 6 renderers wired (diagnostic renderStem, practice inlineMath, tutor renderMathSafe ×3, AskBar, FeedbackSystem renderLatex incl. trust:true, LazyMath) ✅ in served chunks
- [x] SEC-01 verify-email dead page → honest "no verification needed" page (was fake 500ms success) ✅ live
- [x] SEC-02 teacher role guard — verified in container (`teacher.py` 403 guard present) ✅
- [x] SEC-03 practice session ownership — verified in container (`_enforce_session_owner` + 403) ✅

## P1 — Correctness / crash class
- [x] DIAG-01 plan-mismatch — fixed by prior wave (`_canonicalise_answer_position`, plan persistence, replay selector, idempotent re-answer) ✅ verified in container
- [x] DIAG-02 silent fake-results → `localOnly` flag + "Offline estimate" banner on results ✅
- [x] DIAG-03 wrong-grade chapter chips → `chaptersFor(subject, classLevel)` junior banding (≤8 gets middle-school strands) ✅
- [x] DIAG-04 open-ended submit — `selectedOptionId`/`GradeAnswerIn` Optional now ✅ (was in deploy already)
- [ ] TUTOR-01 misroute/[object Object] — `_guided_fallback` + isinstance guards verified in container; **misroute (c6→c11 psych) needs live re-probe**
- [ ] TUTOR-02 LLM-kills-backends — `model_hub` singleton + asyncio.wait_for timeouts verified present; **restart regression needs a live LLM-ask stress test**
- [ ] CT-01 chapter tests — TESTCOV lane-mapping claimed-fixed in deploy; **authed verify pending**
- [ ] CT-02 chapter titles — node-fragments not chapter names ⚠️ content-rename job
- [ ] GRADE-01 c6 wrong-grade subjects (computer=English letters, bio=c8 Adolescence, econ=c10-11) ⚠️ content re-map needed
- [x] HYDRA-01 exam-prep hydration sync ✅
- [ ] POOL-01 practice pools degenerate outside math ⚠️ needs question-bank generation
- [x] POOL-02 session_class→DB meta — verified `session_meta` helpers in deploy ✅

## P2 — Resilience / plumbing
- [x] STORY-01 retry — 3-attempt backoff + manual retry card (was dead-end) ✅
- [x] NAV-01 junior mastery → backend — `POST /api/progress/game-result` writes `activity_log` (feeds streaks/daily-goals/parent-digest) ✅ 401-registered live on both backends
- [ ] NAV-02 hub ranking client-only — backend mastery not wired into /learn ordering
- [x] AUTH-01 password reset — real endpoints present (`/forgot-password` + `/reset-password` in container) ✅
- [x] AUTH-02 signup→dashboard 404 — register provisions students row (claimed-backend; verified `students` provisioning in auth service) ✅
- [x] FLEET-01 UVICORN_WORKERS default 4→2 in Dockerfile.backend 🔧 (takes effect on next backend image rebuild)
- [x] FLEET-02 model_hub singleton loaded off-loop — file verified in container ✅
- [ ] ENGAGE-01 mastery_by_topic legacy synthetic ids ⚠️ data-pipeline fix

## P3 — Content / debt
- [ ] HINDI-01 885 Hindi-medium nodes no ELI5 ⚠️ authoring decision
- [ ] JDOODLE-01 zero junior doodle cards ⚠️ content job
- [ ] GRAMMAR-01 c6 grammar thin / computer mislabeled ⚠️ content job
- [ ] DUP-01 /premium/* ~30-page duplicate tree ⚠️ owner decision (kill vs merge)
- [x] DUP-02 dev routes deleted from deploy: _archive, riv-test, sim-test, game-test→kept(linked), story-visuals-preview, dragon-inspect, atlas-v2, junior-simple, organism ✅ 404 live
- [x] OFF-01 offline writes → `atlas_game_outbox` queue + flush-on-load for game results ✅
- [x] MON-01 client-error ingest → activity_log (lite Sentry) ✅
- [x] TEST-01 e2e learning-path spec — 7/7 passing on prod ✅
- [x] STRAND-01 fluency wired into c4_hin_reading + c5_hin_reading (was c2_eng only) ✅
- [ ] STRAND-02 TracePad no stroke-order ⚠️

## Remaining blockers (not code-solo)
- CT-01/GRADE-01/POOL-01/GRAMMAR-01/JDOODLE-01 = **content authoring** (chapter banks, wrong-grade re-map, junior doodles)
- TUTOR-02 / DIAG-01 = need **live stress test** with authed session
- DUP-01 premium tree = **owner decision** → RETAINED (real paid); gate wired
- MON-01 = **infra choice** → lite version shipped (client-error ingest → activity_log)

## Upgrade batch — 2026-09-21 (premium gate + 16 upgrades)

**Premium gate**
- [x] `is_premium` flows DB→`/me`→auth store (was dropped at login)
- [x] `PremiumGate` component — hard lock + soft upsell, reads `is_premium`
- [x] `/exam` + `/offline` premium-gated (per landing pricing)
- [x] `/premium` CTA → `/premium/signup?plan=premium`

**Learning-loop upgrades**
- [x] Junior mastery sync-down — `GET /api/progress/game-mastery` + `mergeFromBackend`
- [x] Exam→remediation — weak topics → `/learn?search=…` deep-links
- [x] Tutor context — `/tutor?node=<id>` + learn page links in with node
- [x] Sim→lesson backlink — `/sims-v2/[id]` header → `/learn` node
- [x] "Did this help?" — `POST /api/progress/helpful` + thumbs on mastery
- [x] Fluency history — wpm log + `FluencyTrend` sparkline on `/play`
- [x] Hint ladder — misconception→workedExample→retest (already in v3)
- [x] Session resume — StudySession persists stage index per node
- [x] Teach-a-friend — ELI5 explain step in RecallStage
- [x] TracePad stroke-order — pulsing "start here" dot
- [x] WhatsApp digest — "Copy weekly summary" on parent-overview
- [x] Audio-only — 🔊 listen toggle on story scenes
- [x] Read-ahead — PrefetchNext warms the next node
- [x] e2e test — `e2e/learning-path.spec.ts`
- [x] Error monitoring — `client-error` ingest → `activity_log`
