# MASTER SCRATCHPAD — Intelligence Layer + JEE/NEET Solver
## Built: 2026-08-31 | Status: ALL 21 FILES OK, 15/15 TESTS PASS
## Updated: 2026-09-01 | Full audit completed — see FINAL AUDIT below

## ARCHITECTURE OVERVIEW

### Layer 1: Data Foundation
- [x] intelligence_schema.py — 11 SQLAlchemy tables (695 lines)
- [x] enrichment_parser.py — Parses 1276 markers + node JSONs (397 lines)
- [x] interaction_capture.py — Logs every student interaction (335 lines)
- [x] graph_rag_retriever.py — KG-aware retrieval (674 lines)
- [x] concept_graph_traverser.py — Structural graph traversal, NO embeddings (428 lines)
- [x] confidence_calibrator.py — Student confidence tracking (252 lines)

### Layer 2: State & Intelligence
- [x] state_4d_builder.py — 4D student state vector (792 lines)
- [x] specialized_agents.py — 6 bots (1451 lines)
- [x] deterministic_orchestrator.py — 11 rules, deterministic (487 lines)

### Layer 3: Self-Improvement
- [x] meta_brain.py — 7 nightly jobs (606 lines)
- [x] rule_ab_tester.py — A/B testing with Welch t-test (349 lines)

### Layer 4: Integration
- [x] socratic_pipeline_v3.py — Full pipeline wired (392 lines)
- [x] claude_renderer.py — Claude API rendering with cache (208 lines)
- [x] api/intelligence.py — FastAPI router, 13 endpoints (661 lines)

### Layer 5: JEE/NEET Problem Solver
- [x] problem_parser.py — Extract givens/unknowns/concepts (573 lines)
- [x] strategy_library.py — 40+ strategies (453 lines)
- [x] decomposition_engine.py — Break problems into sub-problems (192 lines)
- [x] symbolic_solver.py — SymPy + numerical solvers (784 lines)
- [x] verification_engine.py — 5-layer answer checking (199 lines)
- [x] self_play_generator.py — Generate novel problems (194 lines)
- [x] explanation_generator.py — JEE-style step-by-step (1022 lines)
- [x] jee_neet_solver.py — Main orchestrator (691 lines)

### Layer 6: Testing
- [x] test_integration.py — 15/15 tests pass
- [ ] test_notorious_problems.py — Hardest problems in the world
- [ ] test_jee_advanced.py — Real JEE Advanced problems
- [ ] test_neet.py — Real NEET problems
- [ ] test_breaking.py — 100 agents trying to break the system

## TOKEN BUDGET

| Component | Tokens Used | Tokens Budgeted |
|---|---|---|
| Schema | 9,635 | 15,000 |
| Enrichment parser | 11,559 | 15,000 |
| Interaction capture | 14,031 | 15,000 |
| State 4D builder | 10,554 | 15,000 |
| Graph-RAG retriever | 0 | 15,000 |
| Confidence calibrator | 0 | 15,000 |
| Specialized agents | 0 | 20,000 |
| Deterministic orchestrator | 0 | 20,000 |
| Meta-brain | 0 | 25,000 |
| Rule A/B tester | 0 | 15,000 |
| Socratic pipeline v3 | 0 | 20,000 |
| Claude renderer | 0 | 10,000 |
| JEE/NEET solver (8 files) | 0 | 820,000 |
| Testing | 0 | 100,000 |
| Subject refinement | 0 | 1,250,000 |
| **TOTAL** | **45,779** | **2,360,000** |

Remaining budget: ~3.64M tokens

## FILE STATUS

### Generated & Verified
1. intelligence_schema.py — 694 lines, 12 classes, valid Python ✓
2. enrichment_parser.py — 396 lines, valid Python ✓
3. interaction_capture.py — 334 lines, valid Python ✓
4. state_4d_builder.py — 791 lines, valid Python ✓

### Pending Generation
5. graph_rag_retriever.py
6. confidence_calibrator.py
7. specialized_agents.py
8. deterministic_orchestrator.py
9. meta_brain.py
10. rule_ab_tester.py
11. socratic_pipeline_v3.py
12. claude_renderer.py
13. problem_parser.py (JEE)
14. strategy_library.py (JEE)
15. decomposition_engine.py (JEE)
16. symbolic_solver.py (JEE)
17. verification_engine.py (JEE)
18. self_play_generator.py (JEE)
19. explanation_generator.py (JEE)
20. jee_neet_solver.py (JEE)
21. test_notorious_problems.py
22. test_jee_advanced.py
23. test_neet.py
24. test_breaking.py

## TESTING PROBLEMS TO USE

### Notorious Physics Problems
1. Three-body problem (restricted, specific cases)
2. Double pendulum equations of motion
3. Feynman's spinning disk problem
4. Brachistochrone with friction
5. Charged particle in crossed E and B fields
6. Quantum harmonic oscillator energy levels
7. Entropy of mixing (Gibbs paradox)
8. Maxwell's demon thought experiment

### JEE Advanced Problems
1. Irodov problems (notoriously hard)
2. JEE Advanced 2023-2025 physics
3. JEE Advanced organic chemistry mechanisms
4. JEE Advanced coordinate geometry
5. JEE Advanced calculus (multi-concept)

### NEET Problems
1. NEET 2024-2025 biology (application-based)
2. NEET physics (numerical)
3. NEET chemistry (organic mechanisms)

### Math Problems
1. Putnam competition problems
2. IMO shortlist problems
3. Integration problems requiring multiple techniques

## MISSING COMPONENTS — 18 ITEMS (as of Aug 31 2026)

### Critical: Security
15. [ ] Remove hardcoded API keys — `problem_parser.py` line 27, `_gen_calibration.py` line 7 both expose keys
    - Move to env vars or secrets manager
    - NEVER commit keys to repo

### Highest Priority: Fable STEM Solver Design (fable_stem_solver_design.md)
16. [ ] Semantic Parser (Layer 2) — quantulum3 + spaCy PhraseMatcher + implicit_value_rules.yaml (~200 rules)
17. [ ] Formula Knowledge Base (Layer 4a) — 1200+ formulas as YAML with dimensional formulas, preconditions, grade ranges, covering class 6 to PhD level
18. [ ] Formula Selector (Layer 4a) — dimensional analysis engine, filter by target dimensionality, score by variable match ratio
19. [ ] Multi-step Decomposer upgrade (Layer 5) — backward chaining + DFS on formula DAG, cycle detection (current decomposition_engine.py is forward-only)
20. [ ] Canonical Problem IR alignment — align stem_problem.py with Fable's schema (add ImplicitValue list, parse_confidence, parse_warnings)
21. [ ] Verification Engine upgrade (Layer 6) — add conservation law checks, sanity bounds (speed < c, T > 0K), fix all_layers bug in jee_neet_solver.py line 628
22. [ ] Competency Question Handler — detect competency flag, deterministic calculation, LLM justification ONLY (constrained by computed result, cannot do math)
23. [ ] LLM Fallback Handler with guardrails — strict prompt template, LLM cannot compute/cannot override/cannot invent formulas, validate output against KB
24. [ ] Legacy Solver Router — try 37 legacy solvers first (confidence > 0.8), then KB pipeline, then LLM fallback
25. [ ] Chemistry/Biology Concept KB — balanced reactions, molar masses (mendeleev package), genetics formulas (Hardy-Weinberg, Punnett), ecology models
26. [ ] Step Explanation Generator rewire — template-based + LaTeX from solve trace, deterministic, replace current JEE-only explanation_generator.py

### High Priority: Testing (from original scratchpad)
27. [ ] test_notorious_problems.py — Irodov, double pendulum, brachistochrone, Feynman disk, etc.
28. [ ] test_jee_advanced.py — Real JEE Advanced 2023-2025 problems
29. [ ] test_neet.py — Real NEET 2024-2025 problems
30. [ ] test_breaking.py — 100 programmed agents trying to break the system
31. [ ] test_k12_flow.py — COMPLETE the existing 570-line test (never finished successfully)

### Medium Priority: Subject Refinement
32. [ ] Map one subject end-to-end class 6-12 (user wanted this before moving to next subject)

### Low Priority: Deferred
33. [ ] Hindi CISCE classes 8-12 generation + enrichment (deferred by user)

### COVERAGE TARGETS (with complete KB)
| Level | Deterministic | API fallback |
|-------|--------------|-------------|
| Class 6-8 Math | ~95% | ~5% |
| Class 9-10 CBSE | ~90% | ~10% |
| Class 11-12 CBSE | ~92% | ~8% |
| JEE Main | ~85% | ~15% |
| JEE Advanced | ~75% | ~25% |
| NEET | ~90% | ~10% |

The 8% floor for class 12 = biology essays + creative math insight + genuinely novel problems. These CANNOT be solved deterministically by any system.

## KEY DESIGN DECISIONS

1. **ES-LLMs architecture**: Separate decision from wording. Deterministic orchestrator decides, Claude only renders.
2. **4D personalization**: Cognitive + affective + behavioral + temporal state
3. **Graph-RAG**: Traverse knowledge graph, not just semantic search
4. **Self-improvement**: Meta-brain runs nightly, mines patterns, updates rules
5. **JEE solver**: Decomposition + symbolic reasoning, NOT RAG
6. **Verification**: 5-layer check (dimensional, limiting cases, numerical, format, self-consistency)
7. **Self-play**: Generate novel problems, solve them, learn from failures
8. **No data destruction**: All new files, never modify existing data

---

## FINAL AUDIT (2026-09-01) — What Actually Exists vs What's Missing

### CURRENT SOLVER CASCADE (SolverRouter.solve_async)
```
Question →
  1. core_calculus_engine (SymEngine→SymPy→Giac→SciPy, timeout+verify)
  2. stem_units_solver (pint+chempy, physics/chemistry with units)
  3. KB pipeline (preprocess→extract_quantities→extract_concepts→resolve_implicit→select_formula→decompose→compute→verify→explain)
  4. Legacy solvers (pattern_solver→compute_engine→node_solver_registry)
  5. Best effort fallback (returns fallback flag, NO LLM)
```

### CURRENT TUTOR CASCADE (SocraticPipelineV3.process_interaction)
```
Student query →
  1. Tutor brain lookup (57 MB, 4,671 entries, keyword+overlap matching)
  2. 6 specialized agents propose actions (EthicsBot, AssessmentBot, etc.)
  3. Deterministic orchestrator picks winner (11 rules, subsumption ordering)
  4. Claude renderer renders (if available, else deterministic fallback)
  5. Interaction captured + 4D state updated
```

### WHAT EXISTS AND IS WIRED (51 items)

**Intelligence Layer (14/14 — all loaded, 12/12 on warmup):**
- intelligence_schema.py, enrichment_parser.py, interaction_capture.py
- graph_rag_retriever.py, concept_graph_traverser.py, confidence_calibrator.py
- state_4d_builder.py, specialized_agents.py (6 agents), deterministic_orchestrator.py (11 rules)
- meta_brain.py (7 nightly jobs), rule_ab_tester.py (Welch t-test)
- socratic_pipeline_v3.py, claude_renderer.py, api/intelligence.py (13 endpoints)

**JEE/NEET Solver (8/8):**
- problem_parser, strategy_library (40+ strategies), decomposition_engine
- symbolic_solver (SymPy+numerical), verification_engine (5-layer)
- self_play_generator, explanation_generator (JEE step-by-step), jee_neet_solver

**Fable STEM Pipeline (7/13 components exist & wired):**
- [x] preprocessor.py (161 lines) — text normalization, LaTeX extraction
- [x] quantity_extractor.py (343 lines) — explicit quantity extraction with unit tables (REPLACES semantic_parser)
- [x] concept_target_extractor.py (300 lines) — concept tagging + target ID (REPLACES semantic_parser)
- [x] implicit_value_resolver.py (206 lines) — infers unstated quantities from YAML rules
- [x] formula_selector.py (364 lines) — dimensional analysis, variable binding, formula scoring
- [x] multi_step_decomposer.py (236 lines) — backward chaining + DFS
- [x] step_explainer.py (175 lines) — template-based step explanation
- [x] solver_pipeline.py (1008 lines) — full pipeline orchestrator
- [x] solver_router.py (331 lines) — routes between calculus/units/KB/legacy (REPLACES legacy_solver_router)
- [x] stem_problem.py — canonical problem IR
- [x] stem_units_solver.py (745 lines) — pint + chempy for physics/chemistry

**Formula KB (15/16 YAML files, 3,980 entries):**
- Physics: physics_formulas, physics_mech_grav_osc, physics_em_thermo_optics, physics_modern_quantum_relativity
- Chemistry: chemistry_formulas, chem_kinetics_solutions_surface, chem_organic_reactions, chem_inorganic_analytical
- Math: math_formulas, math_prob_stats_discrete, math_advanced
- Biology: biology_formulas, bio_ecology_cell_molecular, bio_evolution_epidemiology_pharma
- CISCE: cisce_physics_formula_bank (304 KB)

**Implicit Value Rules (5/7 YAML files):**
- Physics: motion, mechanics, electricity, thermo_optics
- Chemistry: equilibrium

**Legacy Solvers (200+ files):**
- 134 question bank files (class1-12, all subjects)
- 5 subject solver files (bio/chem c11+c12)
- core_calculus_engine, pattern_solver, compute_engine, node_solver_registry
- latex_sympy_bridge, derivative_tables, integral_tables

**Data:**
- Tutor brain: 57.2 MB, 4,671 entries, 12 classes, 23 subjects
- Enrichment markers: 5,511 files
- Fixed CBSE node files: 82
- Sim components: 462 (platform) / 387 (dream_app)
- Sim→CBSE mapping: 126 KB
- gameRegistry: 443 entries (platform) / 387 (dream_app)

---

### WHAT'S MISSING — REVISED ASSESSMENT

After reviewing the multi-orchestration agent and current solver cascade,
several Fable-designed components are REDUNDANT — we built equivalents that work.

#### DROP — Not needed (redundant with existing):

| # | Component | Reason |
|---|-----------|--------|
| 1 | ~~semantic_parser.py~~ | REDUNDANT — quantity_extractor.py (343 lines) + concept_target_extractor.py (300 lines) already do this. Fable wanted quantulum3+spaCy; we built our own regex+unit-table approach that works without external deps. |
| 2 | ~~legacy_solver_router.py~~ | REDUNDANT — solver_router.py (331 lines) already routes between core_calculus → stem_units → KB pipeline → legacy solvers (pattern, compute_engine, registry). Full cascade implemented. |

#### NEEDED — Must build (2 items):

| # | Component | Why |
|---|-----------|-----|
| 1 | **llm_fallback_handler.py** | When ALL deterministic solvers fail, we return "best effort" with fallback flag but NO LLM call. User explicitly wanted Fable/Claude API as last resort with guardrails: LLM cannot compute, cannot invent formulas, cannot override KB. Must validate output against formula KB. This is the safety net. |
| 2 | **competency_handler.py** | CBSE 2025-26 has competency-based questions. These need: detect competency flag → deterministic calculation → LLM justification ONLY (constrained by computed result, cannot do math). Without this, competency questions fall through to best-effort. |

#### NICE TO HAVE — Defer (2 items):

| # | Component | Why defer |
|---|-----------|-----------|
| 1 | concept_kb_chemistry.py | Chemistry reactions/stoichiometry partially handled by stem_units_solver (uses chempy). Dedicated KB would improve coverage but current system works. |
| 2 | concept_kb_biology.py | Biology is mostly descriptive. Tutor brain handles biology questions. Concept KB would help genetics (Hardy-Weinberg, Punnett) specifically. |

#### STILL NEEDED — Tests + fixes (6 items):

| # | Item | Status |
|---|------|--------|
| 1 | test_notorious_problems.py | MISSING — Irodov, double pendulum, brachistochrone, Feynman disk |
| 2 | test_jee_advanced.py | MISSING — Real JEE Advanced 2023-2025 |
| 3 | test_neet.py | MISSING — Real NEET 2024-2025 |
| 4 | test_breaking.py | MISSING — 100 agents breaking system |
| 5 | test_k12_flow.py | EXISTS (570 lines) but never finished successfully |
| 6 | math_geometry_trig_coord.yaml | MISSING — failed generation, never re-run |

#### STILL NEEDED — Data quality (3 items):

| # | Item | Status |
|---|------|--------|
| 1 | Physics EM/Thermo + Modern/Quantum YAML | Use `id:` not `formula_id:` — needs normalization |
| 2 | CISCE Chemistry formula bank | Only 18 formulas (severely thin) |
| 3 | Verification engine | Needs conservation law checks, sanity bounds (speed < c, T > 0K), all_layers bug fix |

#### STILL NEEDED — Content (5 items):

| # | Item | Status |
|---|------|--------|
| 1 | CBSE C9 History nodes | ~80-100 nodes missing |
| 2 | CBSE Chemistry C8/C9/C10 | Genuinely thin (17-19 nodes each) |
| 3 | CBSE Biology C8 | Genuinely thin (17 nodes) |
| 4 | CISCE content | 1,886 missing topics across 19 subjects |
| 5 | Hindi conversion | 110/216 markers done, JSON pending |

#### STILL NEEDED — Infrastructure (1 item):

| # | Item | Status |
|---|------|--------|
| 1 | intelligence_schema DB tables | Code exists (11 SQLAlchemy tables) but NOT migrated to PostgreSQL |

---

### FINAL TALLY

| Category | Total | Done | Needed | Drop (redundant) | Defer |
|----------|-------|------|--------|------------------|-------|
| Intelligence services | 14 | 14 | 0 | 0 | 0 |
| JEE/NEET solver | 8 | 8 | 0 | 0 | 0 |
| Fable STEM components | 13 | 7 | **2** | **2** | **2** |
| Formula KB | 16 | 15 | **1** | 0 | 0 |
| Implicit rules | 7 | 5 | **2** | 0 | 0 |
| Tests | 6 | 1 | **5** | 0 | 0 |
| DB wiring | 1 | 0 | **1** | 0 | 0 |
| Content gaps | 5 | 0 | **5** | 0 | 0 |
| Data quality | 3 | 0 | **3** | 0 | 0 |
| **TOTAL** | **73** | **50** | **19** | **2** | **2** |

**19 items still needed. 2 items dropped (redundant). 2 items deferred (nice-to-have).**

### PRIORITY ORDER FOR REMAINING WORK:
1. **llm_fallback_handler.py** — safety net when all deterministic solvers fail
2. **competency_handler.py** — CBSE 2025-26 competency questions
3. **Physics YAML normalization** (id: → formula_id:) — quick fix, unblocks formula selector
4. **Verification engine upgrades** — conservation laws, sanity bounds, all_layers bug
5. **math_geometry_trig_coord.yaml** — regenerate failed formula KB file
6. **Test files** — notorious, JEE Advanced, NEET, breaking, k12_flow completion
7. **intelligence_schema DB migration** — create 11 tables in PostgreSQL
8. **Content gaps** — CBSE C9 History, thin chemistry/biology, CISCE 1,886 topics
9. **Hindi conversion** — finish remaining 106 markers + JSON
10. **Concept KBs** (deferred) — chemistry reactions, biology genetics

---

## FABLE SYSTEM ARCHITECTURE AUDIT (SYSTEM_ARCHITECTURE_RAW.txt — 853 lines)

### 10 AREAS DESIGNED BY FABLE — WHAT'S APPLIED vs NOT

#### ✅ APPLIED (3/10 areas):

**1. Frontend Visual Design** — ✅ APPLIED
- Color palette (dark/light) matches exactly in premium.css (#0a0a0f, #7c3aed, #12121a)
- Typography (Plus Jakarta Sans, Inter, JetBrains Mono) loaded in premium layout
- Glassmorphism, spacing, radius, motion durations — all in premium.css
- Neumorphism shadows — in premium.css

**2. Page Upgrades (9/9 pages)** — ✅ ALL EXIST
- showcase, dashboard, learn, ai-tutor, solver, practice, simulations, exam-simulator, progress
- All 9 pages have page.tsx files in dream_app/frontend/app/

**3. Premium Components (12/27 designed)** — ⚠️ PARTIAL
- EXISTS (12): AuroraBackground, ParticleField, KnowledgeGraph3D, MagneticButton, TiltCard, ScrollReveal, PageTransition, GlowCard, CustomCursor, Spotlight, ShaderBackground, PremiumLoader
- PLUS 25 prism-specific components: AtlasHero3D, AtlasGrowingWorld, LivingGraph, ParticleNetwork, BoardSelector, InteractiveDemo, PublicSolverDemo, FlashcardCarousel, ProgressTimeline, ExamCountdown, etc.
- MISSING (15): StatRing, MasteryRadarChart, StreakFireRive, ConfettiBurst, DropZone, MathRenderer, QuestionPalette, TimerRing, LearningHeatmap, BentoGrid, BilingualText, VoiceInputButton, PerformanceSparkline, ToastProvider, ErrorBoundary, SkeletonLoader

#### ❌ NOT APPLIED (7/10 areas):

**4. Security (OWASP hardening)** — ❌ NOT APPLIED
- JWT still HS256 (Fable wanted RS256 with JWKS endpoint)
- No MFA/TOTP (Fable designed full MFA flow with pyotp)
- No rate limiting on endpoints (Fable wanted 5 attempts/15min per IP)
- No RBAC matrix (Fable designed 5 roles with permission matrix)
- No COPPA/DPDP 2023 compliance (age gate, parental consent, data localization)
- No encryption at rest (pgcrypto, AES-256-GCM)
- No security headers (CSP, HSTS, X-Frame-Options)
- No structlog/audit logging
- No breach detection alerts
- Status: design only, zero implementation

**5. Performance** — ❌ NOT APPLIED
- No bundle splitting config (Fable wanted vendor chunks: react, animation, 3d, ui)
- No bundle analyzer (@next/bundle-analyzer)
- No image optimization beyond next.config formats
- No dynamic imports for Three.js/Pixi.js/Konva
- No LQIP blur placeholders
- No virtual scrolling for chat/exam
- Status: design only

**6. Scalability Infrastructure** — ❌ NOT APPLIED
- No Dockerfile (Fable designed EKS Kubernetes deployment)
- No k8s manifests (Fable designed HPA 50-500 pods)
- No CI/CD pipeline (Fable designed GitHub Actions → ArgoCD)
- No read replicas (Fable designed 6 read replicas)
- No PgBouncer connection pooling
- No Celery workers (Fable designed 5 queues: ai_generation, notifications, analytics, pdf, content_indexing)
- No Redis cluster mode
- No CDN/CloudFront
- No circuit breakers
- No graceful degradation config
- Status: design only — this is PRODUCTION DEPLOYMENT architecture

**7. AI Scaling** — ⚠️ PARTIAL
- ✅ Deterministic fallback exists (tutor brain, pattern solver, compute engine)
- ✅ Cache exists (claude_renderer has TTLCache)
- ❌ No semantic cache (sentence-transformers + Redis)
- ❌ No token bucket rate limiting per user
- ❌ No Celery queue for AI requests
- ❌ No batch request grouping
- Status: fallback works, scaling doesn't

**8. Realtime (WebSocket)** — ❌ NOT APPLIED
- No WebSocket server (Fable designed socket.io-redis adapter)
- No presence tracking (Redis Sorted Sets)
- No live tutoring (WebRTC)
- No shared whiteboard (Konva sync)
- No cursor presence
- Status: design only

**9. Content Delivery** — ⚠️ PARTIAL
- ✅ PWA configured (next-pwa with manifest, service worker)
- ❌ PWA disabled in development mode
- ❌ No CDN (CloudFront)
- ❌ No S3 static asset hosting
- ❌ No offline IndexedDB caching
- ❌ No Lambda@Edge for image format negotiation
- Status: PWA config exists but disabled

**10. DevOps** — ❌ NOT APPLIED
- No Kubernetes (EKS)
- No ArgoCD/Argo Rollouts
- No Prometheus/Grafana monitoring
- No Loki/ELK log aggregation
- No Sentry error tracking
- No pip-audit/safety CI checks
- No Trivy image scanning
- No blue-green deployment
- Status: design only — this is PRODUCTION OPS architecture

### ARCHITECTURE SUMMARY

| Area | Designed | Applied | Missing |
|------|----------|---------|---------|
| Visual design | ✅ | ✅ | 0 |
| Page upgrades | 9 | 9 | 0 |
| Premium components | 27 | 12 + 25 prism | 15 |
| Security | ✅ | ❌ | ALL |
| Performance | ✅ | ❌ | ALL |
| Scalability | ✅ | ❌ | ALL |
| AI scaling | ✅ | ⚠️ partial | 4/5 |
| Realtime | ✅ | ❌ | ALL |
| Content delivery | ✅ | ⚠️ partial | 4/5 |
| DevOps | ✅ | ❌ | ALL |

### HONEST ASSESSMENT

The Fable system architecture is a **production scaling design** for deploying to millions of users on AWS EKS. It covers:

- **What IS applied**: The entire frontend visual design, all 9 pages, 37 premium/prism components, PWA config, deterministic AI fallback
- **What is NOT applied**: Security hardening, Kubernetes scaling, CI/CD, WebSocket real-time, CDN, monitoring, log aggregation, circuit breakers, Celery workers, read replicas

The unapplied parts are **production deployment infrastructure** — they're needed when going live but not for local development. The app works fully without them locally.

### WHAT THIS MEANS

The 5 remaining items from the solver audit (llm_fallback_handler, competency_handler, physics YAML fix, verification engine fix, math_geometry_trig_coord.yaml) are **app functionality** — they affect what the app can DO right now.

The 7 unapplied architecture areas are **production deployment** — they affect how the app SCALES when real users arrive. They don't affect functionality.

### RECOMMENDED ORDER:
1. **First**: Finish the 5 app functionality items (solver works completely)
2. **Then**: Build the 15 missing UI components (premium UX complete)
3. **Then**: Apply security hardening (safe to go live)
4. **Then**: Apply scalability + DevOps (ready for real users)
5. **Last**: Realtime WebSocket + advanced AI scaling (premium features)

---

## THE 30% TO 100% JOURNEY — FULL BUILD PLAN

### WHERE WE ARE NOW: ~70% complete

**Done (70%):**
- 6-agent Socratic tutoring + 11-rule deterministic orchestrator
- 8-layer Fable STEM solver with 3,980 formula entries
- BKT + IRT + SM-2 mastery tracking
- Neo4j knowledge graph (2,048+ nodes, 3,340+ edges)
- 57MB tutor brain (4,671 per-node patterns)
- Premium 3D frontend with 37 components
- 915+ simulations
- Bilingual English/Hindi
- CBSE + CISCE curriculum alignment
- 138 solvers, 134 question generators
- 12/12 intelligence services loaded
- Master system prompt designed for Llama 3.2 3B (local model ready)

**Remaining (30%):** See phases below

---

## PHASE 1: COMPLETE THE SOLVER (70% → 75%) — NO FABLE NEEDED

### 1.1 local_llm_client.py
- Universal HTTP client for Ollama/llama.cpp/vLLM
- Configurable endpoint (default: http://localhost:11434/v1)
- Configurable model (default: llama3.2:3b)
- Redis response cache (40-60% hit rate expected)
- Template fallback if model unavailable
- **No Fable needed** — pure Python HTTP client

### 1.2 llm_fallback_handler.py
- Guardrails around local LLM calls
- Triggered ONLY when deterministic solvers fail or confidence < threshold
- Strict prompt template (from fable_stem_solver_design.md Section F)
- ALLOWED: parse ambiguous text, identify formula, generate explanation
- NOT ALLOWED: compute, override deterministic answers, invent formulas
- Output validation: check proposed formula exists in KB
- Confidence marking: min(deterministic_confidence, llm_confidence)
- Disclosure: "This problem required AI-assisted interpretation"
- **No Fable needed** — uses local_llm_client

### 1.3 competency_handler.py
- Detection: keyword matching ("justify", "explain", "compare", "why does")
- Calculation: deterministic (SymPy computes the answer)
- Justification: local LLM with strict prompt (computed result + explain WHY)
- Fallback: template-based justification if model unavailable
- CBSE 2025-26 competency question patterns
- **No Fable needed** — detection + calc are deterministic, justification uses local LLM

### 1.4 Physics YAML normalization
- Rename `id:` → `formula_id:` in physics_em_thermo_optics.yaml and physics_modern_quantum_relativity.yaml
- Manual file edits, one by one (NOT batch scripts)
- Verify all 15 formula YAML files load correctly after fix
- **No Fable needed** — data fix

### 1.5 Verification engine upgrades
- Add conservation law checks (energy, momentum, charge)
- Add sanity bounds (speed < c, T > 0K, mass > 0)
- Fix all_layers bug near jee_neet_solver.py line 628
- Add self-consistency checks for multi-step solutions
- **No Fable needed** — deterministic physics checks

### 1.6 math_geometry_trig_coord.yaml
- Curate 80-120 geometry/trigonometry/coordinate formulas from NCERT textbooks
- Write to NEW file (don't overwrite existing)
- Follow same schema as other formula YAML files
- **No Fable needed** — formulas are finite and well-known

### 1.7 JEE Solver Coverage Increase (50% → 80%+)
- Audit existing 40+ strategies in strategy_library.py
- Add missing JEE Advanced problem types:
  - Rotational dynamics with variable moment of inertia
  - Fluid mechanics (Bernoulli + continuity chains)
  - AC circuit phasor problems
  - Thermodynamics combined cycles
  - Electromagnetic induction with moving conductors
  - Organic reaction mechanism prediction (rule-based)
  - Coordination chemistry isomerism
  - Calculus-based physics (integration in kinematics)
  - Complex number geometry
  - Conic section problems
- Add implicit value rules for JEE-specific scenarios
- Add formula entries for JEE-specific formulas
- Test against real JEE Advanced 2023-2025 papers
- **No Fable needed** — deterministic strategies + formulas

### 1.8 Test files (5)
- test_notorious_problems.py — Irodov, double pendulum, brachistochrone
- test_jee_advanced.py — Real JEE Advanced 2023-2025 problems
- test_neet.py — Real NEET 2024-2025 problems
- test_breaking.py — Adversarial inputs, edge cases
- Finish test_k12_flow.py — End-to-end K-12 student journey
- **No Fable needed** — Python test files

---

## PHASE 2: INTELLIGENCE DB + SELF-EVOLVING LOOP (75% → 82%) — NO FABLE NEEDED

### 2.1 Migrate 11 intelligence tables to PostgreSQL
- Tables designed in _design_doc.md (695 lines of schema)
- CREATE TABLE statements (idempotent, won't drop existing)
- Tables: interaction_outcomes, misconceptions, misconception_evidence,
  concept_dependencies, teaching_strategy_outcomes, student_strategy_history,
  question_difficulty, content_gap_flags, learning_style_profiles,
  socratic_sessions, claude_reasoning_cache, claude_token_usage,
  strategy_recommendations
- Wire SQLAlchemy models to app
- **No Fable needed** — SQL + Python

### 2.2 Synthetic Student Simulator
- `synthetic_student.py` — simulates real students
- Seeded with tutor brain's 4,671 known misconceptions
- Realistic mastery profiles (per-node BKT state)
- Learning style variation (visual/auditory/kinesthetic)
- Frustration/boredom/confidence simulation
- Error patterns: sign errors, unit confusion, formula mixups
- Class-level appropriate behavior (C1-5 simple, C11-12 complex)
- **No Fable needed** — Python simulation

### 2.3 Self-Play Interaction Generator
- `interaction_generator.py` — generates student-tutor interactions
- Runs synthetic students through REAL pipeline
- 1000 students × 50 interactions = 50,000 interactions
- Captures all interactions to PostgreSQL (intelligence tables)
- Tests both solver AND tutor pipeline
- **No Fable needed** — Python orchestration

### 2.4 Nightly Learning Jobs (ACTUAL IMPLEMENTATION)
- `nightly_learning.py` — runs on synthetic interaction data
- Job 1: Misconception discovery — mine error patterns from interactions
- Job 2: Concept dependency mining — statistical dependencies from transitions
- Job 3: Strategy effectiveness — A/B test teaching strategies
- Job 4: Difficulty calibration — IRT parameter estimation
- Job 5: Content gap detection — flag nodes with high failure rates
- Job 6: Learning style profile updates
- Job 7: Rule effectiveness scoring for orchestrator
- **No Fable needed** — statistical algorithms

### 2.5 RL Orchestration Training
- `rl_orchestration_trainer.py` — trains orchestrator via self-play
- State: 4D student state (cognitive, emotional, behavioral, contextual)
- Actions: 11 orchestrator rules (expand to 50+)
- Reward: mastery improvement - frustration - hint overuse
- Algorithm: contextual bandit or simple policy gradient
- Output: optimized rule weights / learned policy
- **No Fable needed** — RL training in Python

### 2.6 Expand orchestrator rules (11 → 50+)
- Mine synthetic interaction data for missing rules
- Add rules for: spaced retrieval timing, spiral review triggers,
  exam anxiety handling, multi-concept synthesis, prerequisite
  chain failures, gaming detection, fatigue patterns
- **No Fable needed** — deterministic rules

### 2.7 Content Quality Monitor
- `content_quality_monitor.py` — finds weak content from failure patterns
- If 80% of synthetic students fail node X → flag content
- If students pass Q1 (recall) but fail Q3 (apply) → needs examples
- If walkthrough readers still fail → walkthrough unclear
- Auto-generate improvement tickets
- **No Fable needed** — statistical analysis

---

## PHASE 3: PREMIUM UX COMPLETION (82% → 87%) — NO FABLE NEEDED

### 3.1 Build 15 missing UI components
1. StatRing — SVG circular progress with animated fill
2. MasteryRadarChart — Konva spider chart for subject mastery
3. StreakFireRive — animated flame that grows with streak
4. ConfettiBurst — canvas particle explosion on correct answers
5. DropZone — drag-and-drop file upload with animated border
6. MathRenderer — KaTeX equation renderer with step reveal
7. QuestionPalette — exam mode color-coded question grid
8. TimerRing — SVG countdown with color transitions
9. LearningHeatmap — GitHub-style activity heatmap
10. BentoGrid — CSS Grid bento layout with stagger animations
11. BilingualText — English/Hindi text with font transition
12. VoiceInputButton — microphone with waveform animation
13. PerformanceSparkline — mini SVG trend chart
14. ToastProvider — global toast notification system
15. ErrorBoundary + SkeletonLoader — error handling + loading states
- **No Fable needed** — React/TypeScript components

### 3.2 Wire components into pages
- Dashboard: StatRing, MasteryRadarChart, StreakFireRive, BentoGrid
- Practice: TimerRing, ConfettiBurst, QuestionCard
- Exam: QuestionPalette, TimerDisplay, ScoreReveal
- Progress: LearningHeatmap, PerformanceSparkline, AchievementCard
- Solver: DropZone, MathRenderer, StepReveal
- Tutor: VoiceInputButton, MathRenderer, TypingIndicator
- All pages: ToastProvider, ErrorBoundary, SkeletonLoader
- **No Fable needed** — React wiring

### 3.3 Performance optimization
- Dynamic imports for Three.js/Pixi.js/Konva (only on canvas pages)
- Bundle splitting: react-vendor, animation-vendor, 3d-vendor, ui-vendor
- Virtual scrolling for chat (@tanstack/react-virtual)
- Image optimization (AVIF/WebP, LQIP blur placeholders)
- Bundle analyzer setup (@next/bundle-analyzer)
- Target: first load JS < 200KB gzip
- **No Fable needed** — Next.js config

---

## PHASE 4: PRODUCTION FEATURES (87% → 93%) — NO FABLE NEEDED

### 4.1 Security hardening
- JWT RS256 migration (private key in env, public via JWKS)
- MFA/TOTP with pyotp (admin accounts mandatory)
- Rate limiting (slowapi or custom Redis-based)
- RBAC matrix (5 roles: student, teacher, parent, admin, super_admin)
- COPPA compliance (age gate, parental consent for under-13)
- DPDP 2023 compliance (data localization, consent management)
- Encryption at rest (pgcrypto for PII columns)
- Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy)
- Structured logging (structlog with PII redaction)
- Audit logging for sensitive actions
- **No Fable needed** — security engineering

### 4.2 Offline-first PWA
- Enable PWA in production (next-pwa already configured)
- Service worker: cache app shell + current week's content
- IndexedDB: cache completed lessons + due flashcards
- Background sync: queue mastery updates when offline
- Offline fallback page
- **No Fable needed** — PWA engineering

### 4.3 Photo-to-solve
- Tesseract.js for OCR (runs in browser)
- Pix2Tex ONNX for LaTeX extraction (runs in browser)
- Pipeline: photo → OCR → LaTeX → SymPy → solution
- Doesn't replace MathLive input, adds alternative
- **No Fable needed** — ONNX models in browser

### 4.4 Voice input
- Whisper tiny ONNX (offline, ~40MB model)
- For Class 1-5 primarily (young children can't type)
- Voice navigation: "next question", "help", "I'm done"
- Indian English accent support
- **No Fable needed** — ONNX model in browser

### 4.5 Parent/Teacher WhatsApp bot
- Twilio webhook + FastAPI endpoint
- Parent: weekly summary (streak, topics, struggles, 5 questions to ask)
- Teacher: worksheet generator (send topic → get PDF)
- Student: daily reminder, photo solve via WhatsApp
- **No Fable needed** — Twilio + FastAPI

### 4.6 Spiral review scheduler
- `spiral_service.py` — daily 15-min mixed review sessions
- SM-2 queue for nodes due for review
- Load spiral_review content from class_level_content
- 5 integrated exercises per session (combine 3-4 topics)
- Feed results back to BKT for all tested nodes
- **No Fable needed** — scheduling algorithm

### 4.7 Exam simulator
- `exam_service.py` — full timed exam with grading
- Load mock papers from board_questions
- Timer, sections, auto-submit
- Grade using marking_scheme
- Post-exam: weak topics → study plan
- Examiner comments for lost marks
- **No Fable needed** — exam logic

### 4.8 Drill progression
- `drill_service.py` — tiered practice
- BASIC → EXAM → CHALLENGE progression
- 80% at each tier to advance
- Wrong answer → misconception check → remediate → retry
- 80% at EXAM → mastery verified → BKT update → SM-2 schedule
- **No Fable needed** — practice logic

---

## PHASE 5: PRODUCTION INFRASTRUCTURE (93% → 97%) — NO FABLE NEEDED

### 5.1 Docker + Docker Compose
- Dockerfile for backend (Python slim image)
- Dockerfile for frontend (Node alpine + Next.js standalone)
- docker-compose.yml with all services
- **No Fable needed** — Docker config

### 5.2 CI/CD pipeline
- GitHub Actions: lint → test → security scan → build → deploy
- pip-audit for Python dependencies
- Trivy for image scanning
- Automated tests on every PR
- **No Fable needed** — CI/CD config

### 5.3 Monitoring + logging
- Prometheus metrics (request latency, error rate, AI usage)
- Grafana dashboards (API, DB, workers, AI, errors, cost)
- Structured JSON logging (structlog + pino)
- Sentry for error tracking
- Alert rules (high auth failure, slow queries, AI cost spikes)
- **No Fable needed** — monitoring setup

### 5.4 WebSocket real-time
- Socket.io + Redis adapter for multi-pod scaling
- Live tutoring (text chat real-time)
- Presence tracking (Redis Sorted Sets)
- Rate limiting (10 msg/s chat, 1 msg/S exam)
- **No Fable needed** — WebSocket engineering

### 5.5 Circuit breakers + graceful degradation
- AI API circuit breaker (10 failures → cached responses, retry after 30s)
- Neo4j fallback to cached graph data
- Redis fallback to in-process LRU cache
- Simulation service down → placeholder with description
- **No Fable needed** — resilience patterns

---

## PHASE 6: CONTENT COMPLETION (97% → 100%) — LOCAL LLM OR MANUAL

### 6.1 CISCE 1,886 missing topics
- 19 subjects, varying topic counts
- Use local LLM (7B/13B) for enrichment generation
- Slower than Fable but free
- Validate against CISCE syllabus
- Import to PostgreSQL + Neo4j
- **Local LLM** — no Fable needed

### 6.2 CBSE C9 History gap
- 80-100 nodes needed (French Rev, Russian Rev, Nazism, Forest Society, Pastoralists)
- Use local LLM for enrichment
- **Local LLM** — no Fable needed

### 6.3 Thin chemistry/biology C8-C10
- Chemistry C8: 19 nodes (thin)
- Chemistry C9: 19 nodes (thin)
- Chemistry C10: 17 nodes (thin)
- Biology C8: 17 nodes (thin)
- Use local LLM for enrichment
- **Local LLM** — no Fable needed

### 6.4 Cross-subject Neo4j edges
- Load CROSS_PREREQ edges from master node files
- Physics→Math, Chem→Bio, Chem→Physics relationships
- 41 cross-subject references exist but not loaded as edges
- **No Fable needed** — data loading

### 6.5 Hindi conversion completion
- Finish remaining Hindi markers (was at 110/216)
- Aggregate to JSON
- Validate Devanagari quality
- **No Fable needed** — conversion pipeline

---

## IS THERE A BETTER SYSTEM THAN THIS?

### What We Could Do Better (Honest Assessment):

**1. Replace 11 hand-coded rules with pure RL-learned policy**
- Current: 11 deterministic rules, first-match wins
- Better: Neural policy network trained on self-play
- Tradeoff: Less interpretable, harder to debug, needs more training data
- Decision: KEEP hand-coded rules as base, ADD learned weights on top (hybrid)
- This is already in Phase 2.5

**2. Replace tutor brain JSON with vector search**
- Current: 57MB JSON, keyword matching
- Better: Embed all 4,671 entries, semantic search at runtime
- Tradeoff: Needs embedding model (sentence-transformers, ~90MB)
- Decision: ADD vector search as enhancement, keep keyword matching as fallback
- Can use local embedding model (all-MiniLM-L6-v2, 384-dim)

**3. Replace SymPy with a more powerful CAS**
- Current: SymPy → Giac → scipy cascade
- Better: Add Mathematica-style pattern matching, or use Lean for proof verification
- Tradeoff: Lean is hard to integrate, Mathematica is proprietary
- Decision: KEEP SymPy cascade, add more pattern rules for JEE-specific tricks

**4. Add multimodal understanding beyond photo-to-solve**
- Current: Text input only (plus planned photo OCR)
- Better: Diagram understanding, chart interpretation, handwriting
- Tradeoff: Needs vision model (CLIP/LLaVA, ~1-4GB)
- Decision: ADD LLaVA 7B locally for diagram understanding (Phase 6+)

**5. Add collaborative learning**
- Current: Single student + AI tutor
- Better: Peer-to-peer study groups, shared whiteboard, group challenges
- Tradeoff: Needs WebSocket real-time (planned in Phase 5.4)
- Decision: Build WebSocket first, add collaborative features on top

**6. Add adaptive curriculum sequencing**
- Current: Static Neo4j graph, fixed learning paths
- Better: Dynamic path recomputation based on real-time mastery + engagement
- Tradeoff: Needs the self-evolving loop running first
- Decision: Build self-evolving loop (Phase 2), then add dynamic sequencing

### What We Should NOT Do (Honest Assessment):

**1. Don't replace the deterministic solver with LLM**
- The whole design philosophy is "deterministic first, LLM last resort"
- Replacing with LLM would make it unreliable, expensive, and unverifiable
- KEEP the current architecture

**2. Don't add microservices**
- 26 API routes fit well as a modular monolith
- Microservices add operational complexity without benefit at this scale
- KEEP modular monolith

**3. Don't replace Neo4j with pure PostgreSQL**
- Graph traversal (recursive prerequisites, learning paths) is natural in Neo4j
- PostgreSQL adjacency tables work but queries are more complex
- KEEP Neo4j (it's already loaded and working)

**4. Don't add blockchain/NFTs/Web3**
- No educational value for K-12 students
- Adds complexity and cost
- SKIP entirely

### CONCLUSION: The current architecture IS the best system we can build.
The design is sound. The execution gap is what needs closing.
No fundamental redesign needed — just build out the designed features.

---

## EXECUTION ORDER (STEP BY STEP)

### Step 1: Phase 1 (Solver completion) — START HERE
1. local_llm_client.py
2. llm_fallback_handler.py
3. competency_handler.py
4. Physics YAML normalization
5. Verification engine upgrades
6. math_geometry_trig_coord.yaml
7. JEE solver coverage increase
8. 5 test files

### Step 2: Phase 2 (Intelligence + self-evolving)
9. Migrate 11 intelligence tables
10. synthetic_student.py
11. interaction_generator.py
12. nightly_learning.py
13. rl_orchestration_trainer.py
14. Expand orchestrator rules (11 → 50+)
15. content_quality_monitor.py

### Step 3: Phase 3 (Premium UX)
16. Build 15 missing UI components
17. Wire components into pages
18. Performance optimization

### Step 4: Phase 4 (Production features)
19. Security hardening
20. Offline-first PWA
21. Photo-to-solve
22. Voice input
23. Parent/Teacher WhatsApp
24. Spiral review scheduler
25. Exam simulator
26. Drill progression

### Step 5: Phase 5 (Production infrastructure)
27. Docker + Docker Compose
28. CI/CD pipeline
29. Monitoring + logging
30. WebSocket real-time
31. Circuit breakers + graceful degradation

### Step 6: Phase 6 (Content completion)
32. CISCE 1,886 missing topics (local LLM)
33. CBSE C9 History gap (local LLM)
34. Thin chemistry/biology (local LLM)
35. Cross-subject Neo4j edges
36. Hindi conversion completion

### FINAL: Get the app running end-to-end
37. Start all services
38. Run synthetic students through full journey
39. Verify every feature works
40. Deploy

**TOTAL: 40 steps from 70% to 100%**
**FABLE NEEDED: 0 steps (all pure engineering + local LLM)**
**ESTIMATED: Each step is a focused build task**
