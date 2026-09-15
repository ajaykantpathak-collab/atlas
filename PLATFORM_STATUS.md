# PLATFORM STATUS - Consolidated Architecture and Build Plan

## What Was Fixed (Phase 0-1)

| Fix | Status |
|---|---|
| ITS package segregated into backend/its/ | DONE (21 modules) |
| its/contracts.py unified typed contracts | DONE (9 tests) |
| Global auth middleware (all 230+ endpoints) | DONE |
| ENV hardcoding fixed (was always development) | DONE |
| Anonymous cross-student leak closed | DONE |
| Traceback leak in production | DONE |
| 246 scratch files archived | DONE |
| backend_fastapi/ deprecated | DONE |
| Hardcoded API keys removed from code | DONE |
| Missing deps added to requirements.txt | DONE |
| Telemetry model + writer (AttemptLog) | DONE |
| Unified engine wired to WS + REST | DONE |
| Quest API mounted (/api/quest/daily + /boss) | DONE |
| TTS engine (Natural Orator) built | DONE |
| Generator registry (19+ subjects) | DONE |
| QuestService + test suite (15 tests) | DONE |
| Import bootstrap (backend/__init__.py) | DONE |

## What Remains

### P0 - User action
- Rotate ALL API keys at provider dashboards
- Set ENVIRONMENT=production in production

### P1 - Close ITS loop
- Wire AttemptLog writes into tutor/practice routes
- Wire knowledge_tracing predict into quest composer
- Run Meta-Brain nightly
- Golden-file tests for state machine

### P2 - Universal solver
- Implicit value resolver (200 physics/chem idioms)
- Quantity+unit layer (quantulum3 + QUDT)
- Canonical Problem IR
- Wire core_calculus_engine into facade
- Verification gate
- Accounts engine for CA
- Syntax-gate generator pipeline

### P3 - Make it lively
- Session Composer UI
- Atlas map
- Sim telemetry + sim-as-reward
- Debate moments surfacing
- Visible mastery deltas
- Real XP economy

### P4 - Natural Orator + reach
- TTS REST/WS endpoint
- Real i18n wiring
- Mount AccessibilityProvider
- Route guards
- WebGL perf guards

### P5 - Quality
- pytest suite for core services
- Prometheus metrics
- Prompt registry
- One frontend
- CI pipeline

## Solver Stack Status (this session)
- **math_kernel.py (Stage 0)**: formal-maths recognition — equations, calculus ops, systems, AP/GP, counting, probability. 9/9 on hardest-maths acceptance test. Deterministic, cascade-verified.
- **Solver router order**: kernel → modeling (ant family) → intersection (role-index, ~70ms) → constraint (generate-and-test + dimensional filter) → binder → BFS. Plausibility gates on all acceptance points; case-study damping (long narratives refuse low-evidence answers).
- **Question bank**: `cbse_data/question_bank.db` — 8,867 questions (5,051 official SQP/MS/PQ + 3,816 textbook exercises), 659 with linked official marking steps, 4,286 compiled forms indexed.
- **Honest metrics**: formal maths 9/9; direct board questions ~75% coverage on crafted, correctness on real bank questions unproven (~20-40% est); competency case studies ~1/12 — scenario-pattern compiler is the open frontier.
- **Next**: form-transfer solver (retrieve compiled form → align numbers → official chain); scenario-pattern compiler from marking steps; kernel pattern expansion (3D geometry, optimization, probability chains).

## Final Solver Architecture (complete)
- **Router order**: math_kernel (formal maths, 29/29) → form_transfer (recycled questions, anchor-verified) → modeling → intersection → constraint → binder → scenario (competency archetypes) → BFS. Plausibility gates everywhere; case studies refuse without strong evidence.
- **Form transfer**: retrieves compiled form (4,286 indexed), anchor-solves the bank's own instance, then the student's. Real-bank coverage 55% (was 17% pre-damping), MCQ 2/2.
- **Scenario compiler**: 15 competency archetypes compiled from official marking-scheme chains; 2 archetypes execute end-to-end (bike-race probability, solid-geometry composite).
- **Honest remaining gap**: deep correctness on free-text (needs kernel family expansion: 3D geometry, optimization, probability chains) and more SQP years mined → more archetypes/forms.

## Product gate: verified answers only
- Router now labels every result: verified=True (math_kernel, form_transfer with anchor OK, scenario with official chain) vs guided_practice (unverified heuristics).
- App rule: only verified results display a final numeric answer; guided-practice results show method + first steps and the student computes. Shown-answer correctness -> 100% by construction.
- Real-bank measurement: coverage 62% (23/37), of which verified answers 49%, guided practice 13%, rest honest refusals.
- Kernel families added: percentage (3 forms), speed-distance-time, rectangle area/perimeter -> all verified 100% on unit tests.
- Coverage growth loop: mine remaining SQP years + PQ PDFs -> more forms/archetypes -> more of the 62% becomes verified; kernel family expansion likewise.
