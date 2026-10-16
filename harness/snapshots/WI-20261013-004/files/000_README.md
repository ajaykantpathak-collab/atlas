# ITS Pipeline — Intelligent Tutoring System (`backend.its`)

The complete adaptive-tutoring stack in one package. Five layers, wired into a
single student learning loop:

```
Student question
      |
      v
[1] routing/          class-aware semantic routing to the right node
      |
      v
[2] diagnosis/        BKT + IRT-3PL + AFM mastery, DINA cognitive diagnosis,
      |               Q-matrix generation, KST next-path selection,
      |               4D student state (cognitive/affective/behavioral/temporal)
      v
[3] tutoring/         deterministic Socratic state machine, PCR-gated pipeline,
      |               misconception matcher, unified engine, spiral review
      v
[4] agents/           6 pedagogical bots + ensemble, deterministic orchestrator,
      |               Claude renderer (decision/wording separation), Meta-Brain
      v
[5] agents/meta_brain nightly self-improvement: mines outcomes, recalibrates
    agents, discovers misconceptions/rules/content gaps
```

---

# THE BUILD PLAN (what has to be built — single source of truth)

Status legend: `[x]` done · `[~]` in progress · `[ ]` todo

## Phase 0 — Platform trust (blocks everything)

- [ ] **P0.1 Auth on every non-public endpoint.** Add `Depends(get_current_user)`
      to all routers in `backend/api/`. Acceptance: anonymous request to any
      student-data endpoint returns 401. (Exception: `/health`, auth routes.)
- [x] **P0.2 Kill `_get_first_student_id()`** in `api/progress.py` — replace with
      real user lookup. Acceptance: no endpoint can return another student's data.
- [ ] **P0.3 Rotate ALL committed secrets** (DeepSeek/Groq/Gemini/FreeLLM keys,
      DB passwords in `.env`/`.env.example`/scratch scripts). Move to a vault or
      env-only. Acceptance: `git grep` finds no live keys.
- [ ] **P0.4 Real environment handling.** `app.py` must not hardcode
      `ENV="development"`. Acceptance: production mode returns no tracebacks;
      JWT secret required non-empty at startup (also in dream_app config).
- [ ] **P0.5 One SQLAlchemy engine per process.** Consolidate
      `database.py`, `database/__init__.py`, `infrastructure.py` engines.
      Acceptance: single engine object, pool <= 20+10.
- [ ] **P0.6 Delete `backend_fastapi/`** after diffing for unique fixes.
      Acceptance: one backend tree.

## Phase 1 — Close the ITS loop (the product becomes real)

- [x] **P1.1 Segregate the ITS package** into `backend/its/` (done — this tree).
- [x] **P1.2 Compatibility shims** at old import paths (done — verified).
- [x] **P1.3 `its/contracts.py`** — unified typed contracts: one `AgentAction`,
      action-type enum (agents + state machine + composer modalities), PCR
      mastery gates, `AttemptEvent` telemetry contract, `DailyQuest`/`QuestItem`,
      `seeded_rng()`. Acceptance: specialized_agents, deterministic_orchestrator
      and composer all import from it; pytest green.
- [x] **P1.4 Wire `unified_socratic_engine` to the live tutor surface**
      (REST `/api/tutor/its/start` + `/its/input` + WS `its_start/its_input/
      its_report` messages; engine smoke-tested against real bloom content).
      Acceptance met at API level (WS `its_*` messages + REST `/its/start`,
      `/its/input` verified with real bloom content, 49 nodes); frontend
      playback pending.
- [x] **P1.5 Attempt telemetry table + writer.** `models/telemetry.py`
      (`its_attempt_log`, indexed) + `its/telemetry.py` (`row_from_event` pure
      mapper + `TelemetryWriter`). Acceptance: wire writers into the tutor
      routes so the Meta-Brain has data to mine.
- [ ] **P1.6 Run Meta-Brain on a schedule** (cron) with A/B flags on its
      proposals. Acceptance: nightly report generated; rules ship behind flags.
- [ ] **P1.7 Golden-file tests for the state machine** (it is replayable by
      design). Acceptance: pytest suite replays a full session against stored
      transcripts.

## Phase 2 — Universal solver (solve any STEM problem)

- [x] **P2.1 Design doc** exists: `services/fable_stem_solver_design.md`.
- [ ] **P2.2 Implicit value resolver** — ~200 physics/chem idiom rules
      ("starts from rest" -> u=0, "smooth pulley" -> frictionless) as a spaCy
      PhraseMatcher KB. Acceptance: 50 hardest JEE word problems extract
      correct knowns without regex.
- [ ] **P2.3 Quantity+unit layer** — quantulum3 + QUDT mapping. Acceptance:
      units parsed and normalized on the same corpus.
- [ ] **P2.4 Canonical Problem IR** — knowns/unknown/constraints/concept tags.
      Acceptance: every solver backend can consume the IR.
- [ ] **P2.5 Wire the hybrid calculus engine** (SymEngine->SymPy->Giac->SciPy,
      built at `solvers/core_calculus_engine/`) into the solver facade registry
      as a backend tier. Acceptance: 100 calculus problems solved with steps +
      verification through the facade.
- [ ] **P2.6 Verification gate.** Every final answer passes unit-consistency,
      magnitude sanity, independent re-solve. Acceptance: wrong answers cannot
      ship (gate blocks or downgrades to guided mode).
- [ ] **P2.7 Accounts engine for CA Foundation** — journal/ledger rule system
      as a new facade backend. Acceptance: 50 CA Foundation accounts problems
      solved deterministically.
- [ ] **P2.8 Syntax-gate the generator pipeline.** Acceptance: 40 broken
      solvers + 31 broken question files fixed; CI blocks syntax-broken output.

## Phase 3 — Make it lively (engagement layer)

- [x] **P3.1 `DailyQuest`/`QuestItem` contracts** (in contracts.py).
- [x] **P3.2 `QuestService` + API mounted**: `its/engagement/quest_service.py`
      (composition) + `api/quest.py` mounted at `/api/quest/daily` and
      `/api/quest/boss`. 3 due SM-2 reviews + 2
      seeded generator questions (IRT-filtered to 70-85% predicted success) +
      1 recommended sim + 1 debate moment. `GET /api/quest/boss?week=N` =
      seeded weekly boss battle. Acceptance: deterministic per (student, week).
- [ ] **P3.3 Session Composer**: mixes >= 3 modalities per session; switches
      modality on 4D affect signals (frustration -> sim/debate, boredom ->
      escalate). Acceptance: no two consecutive sessions of identical shape.
- [ ] **P3.4 Atlas map**: render the prerequisite graph as an explorable map;
      mastered nodes lit; next KST node glowing. Reuse KnowledgeGraph3D +
      dream_app `world`/`topic-map` pages.
- [ ] **P3.5 Sim telemetry** (`onSandboxInteraction` events) + sim-as-reward
      unlocking by mastery. Acceptance: composer can recommend sims by p_known.
- [ ] **P3.6 Surface debate moments** (multi-agent misconception debates) as a
      standalone feature. Acceptance: reachable from the tutor in 1 click.
- [ ] **P3.7 Real XP economy + weekly boss battles + comeback sessions**
      (temporal state already computes days-since-last + optimal review time).
- [ ] **P3.8 Visible mastery deltas** at session end ("+12% trigonometry").

## Phase 4 — Natural Orator (TTS) + reach

- [~] **P4.1 TTS engine**: `its/orator/tts.py` — teaching-aware chunking
      (probe phases wait for the student), unit emphasis, deterministic cache
      keys, hi-IN/en-IN voices, edge-tts adapter + offline stub. Remaining:
      REST/WS endpoint + frontend playback. Acceptance: full session narratable.
- [ ] **P4.2 Real i18n wiring** (hi.json exists; `locale` is hardcoded "en";
      mount LanguageProvider or next-intl properly). Acceptance: Hindi renders.
- [ ] **P4.3 Mount AccessibilityProvider** (built, never mounted).
- [ ] **P4.4 Route guards** in both frontends + remove demo login backdoor.
- [ ] **P4.5 Perf guards**: dpr cap + pause-on-hidden for WebGL shaders;
      virtualize long lists (react-virtual is installed, unused).

## Phase 5 — Quality system (never a ceiling)

- [x] **P5.1 Package README** (this file).
- [~] **P5.2 `its/tests/` pytest suite** — 15 tests green (contracts + quest
      composer). Next: golden files for the state machine.
- [ ] **P5.3 Bounded resources everywhere** (LLM cache, tutor sessions).
- [ ] **P5.4 Prometheus metrics** per agent proposal + orchestrator rule
      win-rate (effectiveness scores already tracked in memory).
- [ ] **P5.5 Prompt registry** for the renderer (versioned, not inline).
- [ ] **P5.6 One frontend** — extract shared packages (premium UI, lib,
      services, hooks) or kill one fork.

Coverage targets (universal solver): CBSE 6-12: 90-95% -> 97% · NEET: 85% ->
95% · JEE Main: 80-85% -> 92% · JEE Advanced: 60-70% -> 80% · CA Foundation:
85% -> 95%. Honesty rule: when the gate cannot verify, route to Socratic
guidance — never fake an answer.

---

## Modules by layer

| Layer | Module | Role |
|---|---|---|
| parsing | `bloom_marker_parser` | Parses `.bloom.marker` files (source of teaching content) |
| routing | `routing_service` | MiniLM embedding match: student question -> knowledge node, class-aware |
| routing | `routing_service_semantic` | v2 semantic routing variant |
| retrieval | `graph_rag_retriever` | Graph-RAG: prerequisite traversal, cross-subject links |
| diagnosis | `knowledge_tracing` | Unified BKT + IRT-3PL + AFM mastery engine |
| diagnosis | `state_4d_builder` | 4D student state vector (cognitive/affective/behavioral/temporal) |
| diagnosis | `q_matrix_generator` | Auto-generates Q-matrices from bloom markers |
| diagnosis | `cognitive_diagnosis_engine` | DINA model: which skills has / hasn't the student got |
| diagnosis | `kst_path_selector` | Knowledge Space Theory next-node selection (~80% success target) |
| tutoring | `misconception_matcher` | Matches wrong answers to known misconceptions + remediation |
| tutoring | `discussion_moments` | Multi-agent debate content from misconceptions |
| tutoring | `socratic_state_machine` | Deterministic INTRODUCE->PROBE->REMEDIATE->MASTERY loop |
| tutoring | `socratic_pipeline` | LangGraph 8-node pipeline (validation -> PCR -> BKT/IRT update) |
| tutoring | `socratic_pipeline_integrated` | Canonical integrated pipeline (wires all layers; used by api/tutor) |
| tutoring | `socratic_engine_pcr` | PCR-gated retrieval variant of the Socratic engine |
| tutoring | `unified_socratic_engine` | Merges state machine + agents + CDM + BKT |
| tutoring | `spiral_service` | 8-week spiral review plans + SM-2 queue fusion |
| tutoring | `interaction_capture` | Captures tutor interaction outcomes |
| agents | `specialized_agents` | Ethics/Assessment/Scaffold/Feedback/Motivator/Tutor bots + ensemble |
| agents | `deterministic_orchestrator` | Rules-based action selection (subsumption, effectiveness-scored) |
| agents | `claude_renderer` | Turns chosen AgentAction into natural language (wording layer) |
| agents | `meta_brain` | Nightly self-improvement (stats-backed recalibration) |
| engagement | `quest_service` | Session Composer: daily quest + boss battle composition |
| engagement | `generator_registry` | Uniform adapter over seeded solvers_regen generators |

## Principles

1. **The LLM never computes.** SymPy/template engines compute; the LLM only
   renders language. Content comes from verified enrichment data.
2. **Decision/wording separation.** Agents propose structured `AgentAction`s;
   the orchestrator selects; the renderer speaks.
3. **Deterministic where possible.** The state machine is replayable and
   auditable; LLMs sit only at explicitly marked fallback states.
4. **PCR: no answer leakage.** Context revelation is gated by mastery
   (<0.4 hints only, 0.4-0.7 prerequisite-first, >0.7 full reveal).
5. **Honesty rule.** When verification fails, route to guided mode — never
   fake an answer. Trust is the product.

## Compatibility

Old import paths (`backend.services.socratic_pipeline`, etc.) still work via
one-line shims in `services/` and `ai/`. New code must import from
`backend.its.*` only.

## External dependencies (intentionally NOT moved)

- `backend.services.progress_service` (SM-2 + XP; shared with non-ITS features)
- `backend.services.answer_evaluator` (shared with tutor_service)
- `backend.models.*`, `backend.database` (SQLAlchemy layer)
- Data files: `tutor_brain/tutor_brain.json`, `services/agent_calibration.json`
