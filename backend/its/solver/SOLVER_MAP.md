# SOLVER_MAP.md — the unified map of its/solver/

*160 files, 132k lines. This document is the single reference for
what lives where, what owns what, and what the unification plan is.*

## Architecture: the answer pipeline

```
question text
  → input_normalizer.py        (cleanup, unicode, LaTeX→plain)
  → answer_pipeline.py         (THE orchestrator — routes through lanes)
      ├─ Lane A: catalog_executor.py     (node-grounded: matches corpus
      │           + structure_families.py (the family registry))
      ├─ Lane B: chain_pipeline.py       (multi-step, chain routing)
      │           + chain resolvers: signature_resolver.py,
      │             slot_extractor.py, structure_extractor.py
      ├─ Lane C: bank_answer.py          (bank question matching)
      ├─ Lane D: neurolink.py            (concept recall — GATED)
      ├─ fallback_all: full registry sweep (all families)
      └─ kernel: math_kernel.py          (sympy/CAS compute)
  → independent_verifier         (checks every numeric answer)
  │            READ VERIFIER_ENGINE.md BEFORE adding a family —
  │            a route without a registered verifier is a GUIDED
  │            refusal in production (strict badge contract).
  → slop_gate.py                 (anti-slop scrub on student strings)
  → ask_coherence.py             (ask-kind vs answer-kind gate)
```

## The family registry (25+ files, ~150 families)

Every family: trigger regex → slot extraction → deterministic compute →
gated by ask_coherence.py (ask-kind vs answer-kind match).

| Module | Subject | Families | Status |
|---|---|---|---|
| structure_families.py | core/mixed | ~100 | STABLE (the main registry) |
| structure_families_waves.py | waves (batch adds) | ~50 | STABLE |
| structure_families_dig2.py | dig wave 2 additions | ~12 | NEW (2026-10-06) |
| physics_families.py | physics | ~30 + C7/C8/C9/C10 blocks | ACTIVE (fixes landing) |
| chemistry_families.py | chemistry | ~15 | ACTIVE (CHEM-ADV fixes landed) |
| chemistry2_families.py | chemistry (older) | ~10 | STABLE |
| chemistry3_families.py | chemistry (newest) | ~8 | STABLE |
| biology_families.py | biology | ~10 | STABLE (F6a-c + fact-recall landed) |
| maths2_families.py | maths | ~15 | STABLE (speed/dist + percent fixed) |
| class6_families.py | class 6 maths | ~8 | STABLE (unitary fixed) |
| class7_families.py | class 7 maths/physics | ~8 | ACTIVE (angle-sum fixed) |
| class7_families2.py | class 7 extension | ~5 | STABLE |
| class8_families.py | class 8 physics | ~10 | ACTIVE (C8 wave landed) |
| commerce_families.py | commerce | ~10 | STABLE (goodwill/profit landed) |
| commerce_families2.py | commerce extension | ~5 | STABLE |
| accountancy_families.py | accounts | ~20 | STABLE (value-ask gate landed) |
| accounting_ledger_matrix.py | ledger | ~5 | STABLE |
| economics_families.py | economics | ~8 | NEW (SOCIAL-GOLDEN landed) |
| english_families.py | english | ~3 | NEW (LANG-ALL landing) |
| applied_maths_families.py | applied maths | ~5 | STABLE |
| biotech_numeric_families.py | biotech | ~3 | STABLE |
| compapp_families.py | computer apps | ~3 | STABLE |
| circle_locus_families.py | circle locus | ~2 | NEW (DIG-1 landed) |
| isc_stats_families.py | ISC statistics | ~3 | STABLE |
| jee_families.py | JEE-level | ~5 | STABLE |
| extra_families.py | misc | ~3 | STABLE |
| extra_families2.py | misc extension | ~2 | STABLE |
| formula_plugin_families.py | formula plugins | ~3 | STABLE |
| hindi_families.py | hindi | ~2 | NEW (LANG-ALL landing) |

## The engines (specialised compute, not family-table driven)

| Module | Purpose |
|---|---|
| math_kernel.py | sympy/CAS evaluation |
| chempy_engine.py | ChemPy chemistry evaluation |
| biology_cognitive_engine.py | bio concept + fact recall |
| competency_engine.py | competency graph routing |
| chemistry_mechanism_engine.py | organic chemistry mechanisms |
| circuit_and_optics_engine.py | circuits + optics |
| humanities_rubric_engine.py | humanities rubric grading |
| pint_physics_engine.py | pint-based physics units |
| asymptotic_engine.py | asymptotic analysis |
| exact_kernels.py | exact arithmetic kernels |
| canonical_equations.py | canonical equation forms |
| calculus_bridge.py | calculus bridge (SymPy ↔ custom) |
| equation_graph.py | equation dependency graph |
| constraint_solver.py | constraint satisfaction |
| binding_executor.py | Lane C: bound-variable execution |

## The readers (input parsing)

| Module | Purpose |
|---|---|
| structure_extractor.py | LLM-led slot extraction (disk-cached PAL) |
| slot_extractor.py | deterministic slot extraction |
| signature_resolver.py | signature-based family resolution |
| intent_extractor.py | question intent classification |
| slm_extractor.py | SLM-led extraction |
| chemistry_reader.py | chemistry formula parsing |
| commerce_readers.py | commerce transaction parsing |
| competency_reader.py + 2 | competency graph reading |

## The infrastructure

| Module | Purpose |
|---|---|
| answer_pipeline.py | THE orchestrator (~2,000 lines) |
| deterministic_service.py | /solve endpoint service |
| slop_gate.py | anti-slop scrub (ICE 1.3) |
| dimensional_guardrails.py | unit/dimension checking |
| dimensional_analysis.py | dimensional analysis |
| board_format.py | CBSE vs CISCE answer formatting |
| board_canon.py | board canonical forms |
| board_stem.py | board stem extraction |
| contract.py | type contracts |
| ask_coherence.py | ask-kind vs answer-kind gate (NEW) |
| formula_registry.py | formula lookup |
| unit_registry.py | unit definitions |
| variable_registry.py | variable definitions |
| bank_answer.py | bank question matching |
| neurolink.py | concept recall (GATED: loose-match fixed) |
| adoption.py | solver adoption tracking |

## Known scattered/duplicated pieces (unification targets)

1. **Three chemistry family files** (chemistry_families, chemistry2,
   chemistry3) — merge into one subject file
2. **Two commerce family files** (commerce_families, commerce_families2)
   — merge
3. **Two class7 family files** (class7_families, class7_families2)
   — merge
4. **Two competency reader files** (competency_reader,
   competency_reader2) — merge
5. **Two extra family files** (extra_families, extra_families2)
   — merge
6. **_dig1_battery.py, _dig_c*.py** — dig-scratch files, should move
   to tests/ or archive
7. **Root tree (D:\platform\backend) vs deploy tree** — sys.path
   shadowing: in-process tests import from ROOT when '..' is on
   sys.path before the deploy path. Fix: pin sys.path in conftest.py
8. **neurolink.py** — the concept-recall lane; the twin-key bug is
   fixed but the module needs its own ask_coherence integration

## Unification plan (AFTER the current agent fleet lands)

Phase 1: sys.path pinning (conftest.py sets deploy/backend first,
removes shadowing)
Phase 2: merge duplicated family files (chem×3 → chem, commerce×2
→ commerce, class7×2 → class7)
Phase 3: move dig-scratch files to tests/
Phase 4: archive _trash/ redteam corpus to its proper home
Phase 5: merge competency_reader + competency_reader2
Phase 6: delete root-tree backend/its/solver (dev copies that
shadow the deploy tree)
