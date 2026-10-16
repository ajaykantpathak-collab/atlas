# Runtime Data Manifest — needs-first

What the app requires → where the data lives → mount target.
NCERT/past-paper material is **reference-only** (solver inputs); it is
never mounted or shipped — only solver-*generated* original questions are.

## 1. Knowledge graph — spine
- **Need:** node per concept + prereq/forward/cross-subject edges + quality tier
- **Source:** `deploy/content/enhanced_nodes_md` (9,099 nodes, 12,356 files)
  → already loaded into Neo4j + `backend/_cache/enhanced_nodes_index.json`
- **Mount:** in image + `deploy/content` bind; Neo4j holds graph

## 2. Teaching content per node
- **Need:** definition, walkthrough, scope, mastery, 5 diagnostic qs,
  misconceptions — EN + Hindi
- **Source:** `deploy/content/enhanced_nodes_md` (baked in image);
  `cbse_data/enrichment` + `cbse_data/hindi_cisce` (Hindi variants)
- **Mount:** `deploy/content` → `/app/content`; cbse_data subdirs

## 3. Practice questions
- **Need:** per-node MCQ+free-text, worked steps, marks, difficulty —
  solver-*generated* originals (papers are reference only)
- **Source:** `backend/ai/_question_bank_cache.json` (8.5k, in image);
  `cbse_data/question_bank.db` (39MB sqlite — solver fingerprints);
  Postgres `board_questions` (26k, seeded from `D:/cisce` markers)
- **Mount:** cbse_data files → `/app/cbse_data`; cisce → `/app/cisce`

## 4. Interactive sims
- **Need:** sim per node + COVERS map
- **Source:** `frontend/components/sims_v2` (2,546, in image);
  `dream_sims` (37 English sims, graph-loaded); sim indexes → Neo4j
- **Mount:** frontend image + Neo4j

## 5. Visual cards
- **Need:** one doodle card per node, indexed by class
- **Source:** `deploy/frontend/public/doodle_cards` (4.8GB, 9,024 imgs)
- **Mount:** `→ /app/public/doodle_cards:ro` ✅ already live

## 6. Exam-facing (solver-derived, NOT papers)
- **Need:** original exam-style questions + stepwise marking-rubric answers
- **Source:** solvers generate; `question_bank.db` + `rubric_generator`
  + `backend/_cache/marking_scheme_remap` — papers stay reference-only
- **Mount:** cbse_data files

## 7. Solver / verification data
- **Need:** fingerprint DB, worked examples, concept embeddings, lexicon
- **Source (cbse_data):** `question_bank.db`, `openstax_examples`,
  `openstax_tryits`, `concept_embed_*.npy` (7×12MB), `form_index.npz`,
  `provisional_lexicon.json`, `intent_dictionary.json`
- **Mount:** → `/app/cbse_data`

## 8. Intelligence / learning-state (writable)
- **Need:** interactions, intelligence updates, synthetic students, state files
- **Source (cbse_data):** `interactions.json`, `intelligence_updates/`,
  `synthetic_students/`, `tutor_students.json`, `confidence_data.json`,
  `solve_log.json`, `practice_map.json`, `adoption_ledger.json`,
  `agent_calibration_data.json`, `ab_tests.json`, `synonym_proposals.json`,
  `enrichment_parsed.json`, `upper_primary_themes.json`,
  `register_coverage_*.json`
- **Mount:** → `/app/cbse_data` (rw)

## 9. Optional depth
- **Source (cbse_data):** `nodes/by_subject` (41MB), `nodes/by_class/split/final_repaired`
  (142MB), `prereqs/` (15MB), `bloom_enrichment/`, `cross_board/`,
  `upper_primary_text/`, `generated/`, `simulations/`, `content/`,
  `reports/`, `solution_cache/`
- **Mount:** → `/app/cbse_data`

## Excluded — scratch/bulk (never mounted)
`zcode_projects` (307MB), `nodes/by_class` rest (~1GB),
`nodes/consolidated` (183MB), `nodes/graph` (239MB), `nodes/index`,
`prereqs_backup_*`, logs, handoffs, benchmark/scratchpad jsonl

## Staged location
`D:\platform\runtime_data\` → `/app/cbse_data` (junctions + copied files)
