# ATLAS ENGINE COMPLETION — BUILD ORDER v2 (the "ice" plan)
*Owner directive: install the 5 hardening repos as permanent pipeline laws; use spaCy NER (not textcat retraining) for variable extraction; build one-by-one, properly, no parallel churn. Ship discipline and completion standard per AGENTS.md apply to every step.*

---

## PHASE 1 — HARDENING REPOS INSTALLED (the "ice")
*These become permanent pipeline infrastructure. Nothing else ships without them.*

### 1.1 Reticle — FE ship gate
- Install: `npm i -D @reticlehq/server` (or per docs.reticle.sh)
- Convert the FINAL-E2E 10-flow acceptance (login, dashboard opener, MissionFlow walk, lab, games, sandboxes, commerce, checkup, MCQ widgets, repair loop, 390px) into saved Reticle checks
- WIRE: the FE ship command runs `verify` — exit 0 or the ship is blocked
- **Done-evidence:** Reticle verify runs on :3001 and passes all saved checks; a deliberate break fails it

### 1.2 ui-skills (ibelick) — FE agent brief law
- Install the skill set into the repo's agent skills (`.agents/skills/` or per its install)
- Add to AGENTS.md + FE agent brief template: FE work uses ui-skills constraints (accessibility, motion, craft) and is reviewed against them
- **Done-evidence:** skills installed; FE brief template references them

### 1.3 auto-antislop / antislop-sampler — content scrub gate
- Install sam-paech's slop lists (JSON phrase lists) into the repo
- Build `deploy/backend/its/solver/slop_gate.py`: scans any student-facing generated string for slop patterns + the platform's own ban list ("Lane C", "variable binding", raw LaTeX, node IDs, "the student" third-person voice) → flags/replaces before serving
- Wire into the answer-pipeline output path (single choke point)
- **Done-evidence:** unit test with 20 known-slop strings caught; clean strings pass; wired into the serving path

### 1.4 Chisel (IronAdamant) — test impact mapping
- Install per IronAdamant/Chisel (`.chisel/` DB; maps code edits → impacted tests)
- Wire: the post-edit verification step for every batch (replaces "hope nothing broke")
- **Done-evidence:** after the next batch, chisel reports impacted tests and they pass

### 1.5 Agent skill audit — audit our own fleet
- Run an agent-skill audit tool over `.agents/skills/` + our agent brief templates
- Fix flags: unsafe defaults, scope creep, missing verification steps
- **Done-evidence:** audit report + fixes applied

---

## PHASE 2 — TRUST-KILLER P0s (council day-0 list)
*The fixes that protect the first 100 real users.*

### 2.1 Wrong-question grading root-cause (P0 trust-killer #1)
- Repro: practice feedback describes a different question than displayed (STUDENT fatal #7)
- Diagnose the session question-keying instability between submit and grade
- Fix + add an integration test asserting feedback.question == displayed.question (Chisel-mapped)
- **Done-evidence:** 50-submission loop with zero mismatches

### 2.2 Semantic lane default OFF + hardening
- `SEMANTIC_QA_LANE` default "1" → "0" (SKEPTIC: "default ON is a countdown")
- Word-twin mitigation: VERIFIED_SEMANTIC requires (a) matched qtype is fact-type, (b) same class, (c) digit subset (existing)
- Board field: index rebuild with board + refuse cross-board serves
- **Done-evidence:** lane OFF in config, gates in code, calibration harness green

### 2.3 Junk-graded-correct fix
- Strict junk detection on short subjective answers (no content words, repeated chars, non-sequitur → honest unverified, never correct)
- **Done-evidence:** the cert §7.8 repro now grades honestly

### 2.4 Machine-language scrub (student-facing strings)
- One render pass: "Needs variable binding (Lane C)", raw LaTeX, node IDs, "NaN%", 15-digit floats → student words (KaTeX or scrub)
- **Done-evidence:** the STUDENT report's 5 machine-language examples all render clean

### 2.5 Nav dead-end fixes
- Check-up tab 404 → point at /diagnostic; /games, /sims routed or removed
- **Done-evidence:** every nav tab opens a live route

---

## PHASE 3 — SPACY NER VARIABLE EXTRACTION (the owner's chosen path)
*TextCatBOW retraining is PAUSED. The spaCy budget goes to NER: quantity/variable extraction trained on silver labels from our own regex parser — this is the recompute-path foundation.*

### 3.1 Silver-label generation
- Run the existing regex quantity_parser over the 253k bank + node diagnostics
- Emit BIO-tagged tokens: {VALUE, UNIT, ROLE} spans where the parser is confident
- Hand-correct a 1-2k slice (the regression suite)
- **Done-evidence:** ≥100k labeled spans, 1k hand-verified slice

### 3.2 Train the NER (spaCy tok2vec + NER, CPU, ~40-60 min)
- Config: tok2vec + ner pipe, 22 subjects as metadata
- Eval on the hand-verified slice: target F ≥ 0.85 on VALUE spans
- **Done-evidence:** eval report; model saved to training/ner_model/

### 3.3 Serving module
- backend/services/variable_extractor.py: question text → {values: [{value, unit, role}], structure_hint} in ≤20ms warm
- Wire as the FIRST stage of the solve path (feeds quantity_binder before the regex parser's fallback)
- **Done-evidence:** 20 hand questions extract correctly; the regex parser's own regression suite passes

### 3.4 E2E recompute harness (prep for the post-test C8 lane)
- Leave-one-member-out recompute harness over bank clusters (SCIENTIST's design — measures per-family recompute accuracy; unlimited fixtures with ground truth)
- **Done-evidence:** harness runs; baseline recompute accuracy report per family

---

## PHASE 4 — TELEMETRY (the 14-day test's actual deliverable)
### 4.1 Per-answer truth label + derived llm_used (LLMGrader-aware — never hardcoded)
### 4.2 Routing-miss log (spaCy training set for free)
### 4.3 Thin-chapter + repeat-serve counter
**Done-evidence:** telemetry rows land for every answer in a 50-question test burst

---

## PHASE 5 — LAUNCH PREP (the 14-day closed test)
### 5.1 Ship-state reconciliation (verify containers == source, one batched cp + restart)
### 5.2 FE final build (/doubt, /privacy, /doubt hero card, UI polish, everything)
### 5.3 Cloudflare tunnel + laptop launch checklist (owner executes)
### 5.4 Controlled soak: 5 concurrent users × 30 min over the tunnel
### 5.5 Play bundle: privacy policy at /privacy, data-safety form, 20+ testers recruited

---

## PHASE 6 — DEFERRED (post-test, telemetry-driven)
- Solver synthesis mining: top-5 families the miss-queue names (hand-mined, full-bank verified before registry entry)
- Variable-masked recompute lane (C8): the ≥98% precision gate build (SCIENTIST's design)
- spaCy textcat retraining: only if real miss-rate >15% (TF-IDF baseline first)
- Hindi content wave, diagram tail: owner go
- Humanities scaffold: only if tester data shows humanities drop-off

---

## DEPENDENCY GRAPH
Phase 1 (ice) → can run entirely in parallel with Phase 2 start
Phase 2 (P0s) → Phase 5 requires 2.1-2.5 done
Phase 3 (NER) → independent; feeds Phase 6's recompute lane
Phase 4 (telemetry) → must be live BEFORE the 14-day test starts

## THE ICE GUARANTEE
Every Phase-1 install makes a failure class structurally impossible:
- Reticle: an FE ship without browser-verified flows cannot pass
- antislop: slop strings cannot reach students unflagged
- Chisel: a batch cannot ship without its impacted tests running
- skill-audit: an agent brief with unsafe defaults gets flagged
- ui-skills: FE agents build within craft constraints

This is "solidified in ice": the failures we lived cannot recur without deliberately breaking the ice.

---

## PHASE 2.5 — COUNCIL FINDINGS THE ORDER MISSED (15 items, all P0-P1)

*Found by cross-checking every council report line-by-line against the build order. None are optional.*

### 2.5.1 SOLVE-PERF residuals
- [x] Verify model_hub singleton is LIVE in both containers (SKEPTIC: solve-perf fix may be source-only)
- [x] Full-bank sweep runner: bounded memory (crashed at row 100 with MemoryError) — chunk per (subject,class) with process exit between chunks

### 2.5.2 Semantic lane residuals
- [x] Add board field to the semantic index payload + refuse cross-board serves (SKEPTIC: no board filter = contamination)
- [x] Sweep tally: reclassify SOFT_HIT and VERIFIED_NOKEY as non-verified classes (criterion 1 = EXACT_HIT only, honest accounting)

### 2.5.3 Practice selector
- [x] practice/start flat ~2.3s (5× IRT selector): parallelize the 4 secondary selections or cache them
- [x] Cross-subject leakage in topic-scoped sessions: derive subject from topic_ids, not request (FINAL-E2E found physics in history sessions)

### 2.5.4 WhatsApp digest — wire NOW for the 14-day test
- [x] Transport exists (whatsapp_service.py) but no designed digest is built or scheduled
- [x] Daily nudge + weekly growth digest + renewal notice + attempt-before-answer rate
- **Why P0:** without it, testers ghost by day 4 and the 14-day test produces no retention data

### 2.5.5 Pedagogy P0s (the teacher/parent voices)
- [x] Board answer-writing weekly limb: promote from Phase 5 to Phase 2 (a P0 for board students, not a post-launch feature)
- [x] Repair cap: never more than ~2 repair items or ~25% of a session (journey engine — add the session-level cap)
- [x] Teacher print-slip: generate Friday's 10-question repair slip from the repair queue as a printable page
- [x] Group-remediation: auto-group children by shared misconception ("six share the sign-flip trap — sit them together Tuesday")
- [x] Hindi persistence: onboarding हिंदी choice must persist app-wide (currently resets to English on the dashboard)

### 2.5.6 Student-facing rendering
- [x] KaTeX render pass for LaTeX in student-visible strings ($XY = 7\,\text{cm}$, \triangle, \leftrightarrow)
- [x] Canonical reward ledger: XP (6 vs 70), stars (0 vs 416), streak — one source of truth, no contradictions
- [x] Lesson detour: prerequisite jumps must return to the original lesson (currently loses context)
- [x] Authoring-voice scrub: "A student who says X is failing to recognize" → second person in ALL lesson content

---

*Every line above is a council finding that would surface in the 14-day test. The checklist IS the test's success condition: all boxes checked = the test was worth running.*
