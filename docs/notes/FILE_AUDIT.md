# FILE_AUDIT — 2026-09-15

## OK (36)
- ✅ backend/main.py
- ✅ backend/routers/__init__.py
- ✅ backend/api/student_sync.py
- ✅ backend/api/analytics.py
- ✅ backend/api/enhanced_nodes.py
- ✅ backend/_cache/tutor_students.json
- ✅ backend/_cache/enhanced_nodes_index.json
- ✅ backend/_cache/sim_index.json
- ✅ backend/its/questions/generated/mcq_humanities.json
- ✅ cbse_data/question_bank.db
- ✅ parsed_output/enrichment.jsonl
- ✅ frontend/lib/api.ts
- ✅ frontend/lib/nodeTitle.ts
- ✅ frontend/components/doodle/DoodleCardImage.tsx
- ✅ frontend/components/world/WorldMap3D.tsx
- ✅ frontend/components/prism/GoldenGalaxy.tsx
- ✅ frontend/next.config.js
- ✅ .env
- ✅ deploy/.env.production
- ✅ deploy/docker-compose.prod.yml
- ✅ deploy/backend/api/student_sync.py
- ✅ deploy/cbse_data/question_bank.db
- ✅ deploy/parsed_output/enrichment.jsonl
- ✅ backend/its/competency (2854 files)
- ✅ backend/its/questions/generated (9799 files)
- ✅ backend/its/solver (171 files)
- ✅ frontend/public/doodle_cards/class6 (420 files)
- ✅ content/enhanced_nodes_md (13398 files)
- ✅ organized (9754 files)
- ✅ deploy/organized (9754 files)
- ✅ frontend/components/sims_v2 (2654 files)
- ✅ doodle PNGs = 9010
- ✅ question bank rows = 59470
- ✅ backend python compiles clean (33 critical files ok)
- ✅ deploy/backend in sync with backend/
- ✅ routers/__init__ imports all resolve

## Issues (13)
- ⚠ MISSING file: backend/api/student_shim.py
- ⚠ question bank rows = 59470 (<50000)
- ⚠ COMPILE FAIL: backend\content_parsers\_pattern_math_solvers.py: SyntaxError: source code string cannot contain null bytes
- ⚠ COMPILE FAIL: backend\content_parsers\_pattern_problem_types.py: SyntaxError: source code string cannot contain null bytes
- ⚠ COMPILE FAIL: backend\content_parsers\_pattern_step_types.py: SyntaxError: source code string cannot contain null bytes
- ⚠ COMPILE FAIL: backend\solvers_regen\english\class12_english_questions.py: SyntaxError: invalid syntax. Perhaps you forgot a comma?
- ⚠ COMPILE FAIL: backend\solvers_regen\english\class12_english_solver.py: SyntaxError: unterminated string literal (detected at line 2591)
- ⚠ COMPILE FAIL: backend\solvers_regen\english\class6_english_questions.py: SyntaxError: f-string: expecting '}'
- ⚠ COMPILE FAIL: backend\solvers_regen\evs\class10_evs_solver.py: SyntaxError: f-string: newlines are not allowed in format specifiers for single quoted f-strings
- ⚠ COMPILE FAIL: backend\solvers_regen\evs\class6_evs_solver.py: SyntaxError: unterminated string literal (detected at line 291)
- ⚠ COMPILE FAIL: backend\solvers_regen\geo\class12_geo_questions.py: SyntaxError: '(' was never closed
- ⚠ COMPILE FAIL: backend\solvers_regen\geo\class12_geo_solver.py: SyntaxError: closing parenthesis ')' does not match opening parenthesis '[' on line 2304
- ⚠ INFO _trash holds 56030 files, incl: .env.example, .env.template, all_corrupted_sims.txt, buddy_preview.png, buddy_preview2.png, buddy_preview3.png, buddy_preview4.png, buddy_rive.png

## Verdict (post-audit actions)
- question_bank.db: HEALTHY (59,470 questions — audit-script bug flagged it wrongly)
- backend/api/student_shim.py: intentionally superseded by student_sync.py (audit list error, not an issue)
- 3 content_parsers/_pattern_*.py files had NULL BYTES (corrupted) and zero importers → quarantined to backend/_archive/broken_quarantine/
- 7 solvers_regen files (english/evs/geo) have broken syntax — these ARE referenced by the quest generator registry, so quest question generation for english-6, evs-6/10, geo-12, english-12 bands fails. Needs a solver-regen re-run (machine-generated files, do not hand-patch).
- _trash holds 56,030 files swept by the unknown cleanup tool — including .env templates, previews, and the old content/ copies. Needs owner decision: restore selectively or accept.
