# SIMS TAGGING REPORT (final, post-wave)

## Registry state
- Wired into ALL_GAMES (student-facing library): 751 sims
  - c6_12/: 694 (manifest-driven, class+subject parsed from filenames)
  - c6_12_new/: 55 (CBSE-aligned sims found unwired - NOW WIRED)
  - maths/: 2 (Lever + Pulley simple machines - NOW WIRED, class 5 science)
- Deliberately NOT wired:
  - c6_12_chem_upgraded/: 56 variants whose filenames collide with wired
    originals (upgrades require per-file quality comparison before swap)
  - ROOT primitives: 4 (GameRenderer, InteractiveNumberLine, SVGBodyDiagram,
    VisualChallenge - infrastructure, imported directly by the engine)
  - _dedupe_archive/: 1 (pre-rule duplicate of C7_PhysicsElectricityCircuits)

## Tags per wired sim
Every registry entry carries: id (c{class}-{subject}-{topic}), display name,
emoji, color (subject-coded), nodeIds, subject, classLevel. Parsed from the
C{cls}_{Subject}{Topic}Sim.tsx convention; subjects normalised to the
canonical set (maths, science, physics, chemistry, biology, geography,
history, political_science, social_science, economics, computer_science,
informatics_practices, applied_maths, biotechnology, home_science,
accountancy, sociology, psychology).

## Regeneration command (idempotent)
1. python backend/tools/complete_sim_manifest.py   (adds unwired files)
2. python scripts/build_c6_12_registry.py          (rebuilds registry TS)
Verified: registry transpiles clean; /simulations page serves 200.

## Coverage after wave + wiring
- Chapters with solid sim coverage: 395/857 (was 310)
- Partial: 380 | Zero (in-scope): 40 (down from 136; remaining zero list
  = TRUE_SIM_GAPS.json, now dominated by class-11-12 electives)
- Out-of-scope zero coverage: 42 class-11 English-literature chapters
  (language policy) - now correctly subject-tagged "english" in the
  catalog corpus so they no longer pollute the in-scope counts.
