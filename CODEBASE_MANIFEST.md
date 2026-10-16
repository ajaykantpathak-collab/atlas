# CODEBASE MANIFEST — what every file is, and what happens to it
# Single source of truth for the segregation. Machine-readable companion:
# manifest.json (target module map). Update BOTH when structure changes.

## 0. SOURCE-OF-TRUTH RULE (overrides everything)

| Tree | Role |
|---|---|
| `deploy/` | **THE product.** Only tree that builds images. Only tree edited. |
| `backend/`, `frontend/` (root) | Dev mirrors of deploy. Synced by `tools/ci_check_sync.py`. Never edited directly. |
| `_cisce_build/` | Generation workspaces. Quarantine after the wave: keep `*part*.json`, `CLAIM*`, `RESUME_STATE*`; delete staging/png/sheets/pycache. |
| root loose files (`_*.py`, `_*.json`, `_*.png`) | Coordinator scratch. Deleted at each wave close. |

---

## 1. BACKEND — `deploy/backend/`

### Core (KEEP — the shell these become)
| File | Is | Becomes |
|---|---|---|
| `main.py` | App assembly: middleware, 309 routes, lifespan, handlers | `core/app_factory.py` — shrinks to ~60 lines; route table moves to routers |
| `database.py` | Async + sync engines, pools, statement_timeout | `core/db.py` (unchanged behaviour) |
| `config.py` | Pydantic settings | `core/settings.py` |
| `observability.py` | JSON logging, request middleware | `core/observability.py` |
| `services/readiness.py` | liveness vs readiness | `core/readiness.py` |

### `its/solver/` — THE TRUTH ENGINE (KEEP ALL — do not touch without the gate)
| Group | Files | Role |
|---|---|---|
| Pipeline | `answer_pipeline.py` | The entry. Pre-routes: bank → proportion → substitution → signature → node → lanes |
| Contract | `contract.py`, `family_adapter.py` | SolverOutcome, fail-closed boundary — INVARIANT-TESTED |
| Exact math | `exact_kernels.py`, `math_kernel.py`, `canonical_equations.py`, `calculus_bridge.py` | rationals, substitution, proportion |
| Families | `physics_families.py`, `accountancy_families.py`, `chemistry*_families.py`, `biology_families.py`, `economics_families.py`, `commerce_families*.py`, `english_families.py`, `syllabus_families.py`, `maths2_families.py`, `class6/7/8_families.py`, `applied_maths_families.py`, `biotech_numeric_families.py`, `compapp_families.py`, `ar_solver.py`, `case_builder.py`, `biotech_numeric_families.py` | per-subject deterministic solvers (the 96.7% gate) |
| Routing | `dimensions.py`, `signature_resolver.py`, `multi_part.py`, `part_splitter.py`, `input_normalizer.py` | dimensional-signature + input shaping |
| Verification | `independent_verifier.py`, `answer_validator.py`, `modeling_layer.py`, `catalog_executor.py`, `binding_executor.py`, `chain_pipeline.py` | lanes B/C + registry sweep |
| Grounding | `bank_answer.py`, `node_answer.py` | official keys + authored-node answers |
| Support | `repertoire.py`, `solver_telemetry.py`, `competency_engine.py`, `competency_reader*.py`, `adoption.py`, `page_solve.py`, `flywheel_oracle.py`, `trap_grammar.py`, `case_builder.py` | attachments, metrics, flywheel |

### `services/` (KEEP — active)
`solve_isolation` (pool+budget), `enhanced_nodes` (20k index), `repertoire`,
`display_scrub`, `id_remapping`, `release_calibration`, `readiness`,
`misconception_*`, `question_selector`, `answer_evaluator`,
`cross_encoder_grader`, `problem_parser`, `exam_service`, `practice_service`,
`drill_service`, `homework*`, `tutor_service`, `intelligence_persistence`,
`mastery_*`, `llm` clients, `student_sync`.
MIGRATE (Phase D): anything running periodic loops → `workers/`.

### `ai/` — SPLIT (the only messy tree)
| File | Disposition |
|---|---|
| `model_hub.py`, `llm_client.py` | KEEP — model serving used by tutor/LLM tier |
| `generic_solver.py` | KEEP — concept index + formula lane (warmed at boot) |
| `input_converter.py`, `math_preprocessor.py`, `structural_patterns.py`, `_convert_hindi_devanagari.py` | KEEP — preprocessors (ReDoS-fixed 2026-10-02) |
| `pattern_solver.py` (165 broad excepts), `template_engine.py`, `socratic_solver.py`, `orchestrator_steps.py`, `solver_engine.py`, `math_solvers.py`, `core_calculus_engine/` | **QUARANTINE → `ai/legacy/`** behind `ENABLE_LEGACY_AI=0`. Tutor no longer routes through them. |
| `calc_engine`, `examiner_mode.py`, `worked_examples.py` | KEEP (assessment features) |

### `api/` + `routers/` — MERGE into one `routers/` (Phase C)
One tree, grouped by module; `main.py` becomes a factory. Route manifest
(`harness/routes_manifest.json`) proves route-for-route parity.

### `tools/` (KEEP — the gates)
`ci_check_sync.py`, `emit_solver_manifest.py`, `hardening_audit.py`,
`redo_finder.py`, `route_auth_audit.py`, `junk_route_audit.py`,
`build_doodle_content.py`, `load_cbse_enrichment.py`.

### `tests/` (KEEP — extend in Phase B/F)
`test_gate_failures.py` (planted 9), `test_family_adapter*.py` (12),
`test_bank_answer.py` (20), `test_node_answer.py` (6), `test_part_splitter.py`,
`test_deterministic_solver_service.py`.

---

## 2. FRONTEND — `deploy/frontend/` (KEEP ALL)
Next.js app; `public/sims|diagrams|doodle_cards` are SERVED CONTENT ( grown by
lanes, baked at build). `components/sims_v2/` = the sim engine + masters
(`CISCE_SIM_MAP.json`, `SIM_INDEX.json`, `SIM_FILE_MAP.json` — keep in
lockstep; merge via `_merge_parts.py`). Diagram URL consumer
(`DiagramImage.tsx`) reads `file` as-is → index rows MUST carry extensions.

---

## 3. DATA & ASSETS
| Path | Role |
|---|---|
| `deploy/content/enhanced_nodes_md/` (14,236) + `cisce_nodes_v2/` (9,432) | canonical corpus — bind-mounted live |
| `deploy/content/doodle_cards/`, `deploy/frontend/public/doodle_cards/` | doodle JSON + webp (3 mirrors; serving tree is truth) |
| `runtime_data/` → `/app/cbse_data` | embeddings, state, evolution stamps |

---

## 4. DELETE LIST (sweep after wave close)
- root scratch: `_bank_debug.py`, `_bank_diag.py`, `_bank_diff.py`,
  `_bank_e2e.py`, `_route_check.py`, `_shape_probe.py`, `_merge_probe.py`,
  `_qc_fresh_*.png`, `_mining_sample*.json`, `_hardening_report.json`,
  `_backend_build*.log`, `_compact_vdisk.txt`, `_diag_natural.py` (keep json)
- `_cisce_build/*/staging|png|sheets|__pycache__|gen_staging_*` (GBs)
- superseded patch scripts (`_patch_*.py`, `_patch_composer*.py`) after wave
- docker: build cache, superseded image tags (pruned 2026-10-02)

---

## 5. TARGET TREE (Phase F — outer shell first, modules migrate in)

```
deploy/backend/
├── core/            app_factory · db · settings · observability · readiness
├── harness/         launch_check · routes_manifest.json · boundaries · loadgen/
├── routers/         (merged api/ + routers/, grouped by module)
├── modules/
│   ├── solver/      ← its/solver (import boundary: via services/solver_facade)
│   ├── content/     ← enhanced_nodes, doodles, diagrams, sims serving
│   ├── tutor/       ← tutor_service, competency
│   ├── assessment/  ← practice, exams, diagnostics, chapter-tests
│   ├── progress/    ← mastery, achievements, analytics
│   └── accounts/    ← auth, users, roles
├── ai/              model_hub · llm_client · preprocessors  (+ ai/legacy/ QUARANTINE)
├── workers/         jobs consumer (Phase D container)
└── tools/ tests/
```

Build order (strangler, never big-bang):
1. Shell: factory + harness + core + ONE migrated route (health) — manifest
   parity gate proves identical route table
2. Migrate routers in batches (content → assessment → tutor → solver surface)
   — after each batch: manifest hash + verify sweep
3. Quarantine ai/legacy behind flag; delete kill list
4. Workers container; metrics; staging profile

## 6. LAUNCH HARNESS (the crash-proof contract)
`harness/launch_check.py` runs before gunicorn binds:
import · route-manifest hash · 5 dependency probes · content-index ≥19k ·
planted-attack self-test (9/9) → non-zero exit names the failing step.
CI runs it per build; Dockerfile CMD gates on it; /ready registers components.
