# D:\platform — Data & File Inventory

> **Purpose:** Single source of truth for what lives where, what's canonical, what's safe to archive, and what each system uses at runtime.
>
> **Last updated:** 2025-11-23

---

## 1. Canonical Node Data (DO NOT ARCHIVE — this is the live data)

### `cbse_data\nodes\by_class\split\` — **THE canonical node dataset**

- **93 JSON files** across 7 class directories (`class_6` through `class_12`)
- **21,518 nodes** total
- Each file is one class + one subject (e.g. `class_11\class_11_physics.json`)
- Fully audited: 0 structural issues, 0 dangling refs, 0 malformed content fields
- **This is what Gemini should read for depth_reasons authoring**
- **This is what any future pipeline should consume**

```
cbse_data\nodes\by_class\split\
├── class_6\   (10 files)
├── class_7\   (10 files)
├── class_8\   (10 files)
├── class_9\   (11 files)
├── class_10\  (10 files)
├── class_11\  (21 files)
└── class_12\  (21 files)
```

**Note:** `class_6\class_6_physics_with_depth.json` is a supplementary file with depth reasons already filled in for Class 6 Physics. The base `class_6_physics.json` is the canonical one.

---

## 2. Aggregated Class Files (secondary — derived from split/)

### `cbse_data\nodes\by_class\perfect\` — per-class aggregates

- 7 files: `class_6.json` through `class_12.json` (one per class, all subjects merged)
- 2 report files: `repair_report_all.json`, `restored_refs_report.json`
- **52 MB total**
- These are merged aggregates of the split/ files, post-repair
- Useful as a quick single-file-per-class reference
- **If split/ is updated, these should be regenerated**

### `cbse_data\nodes\by_subject\` — per-subject aggregates (all classes merged)

- 25 files: `maths.json`, `physics.json`, `chemistry.json`, `biology.json`, etc.
- **41 MB total**
- **Still referenced by backend code** (`backend\calibrate_system.py`, `backend\apply_calibration.py`, `backend\content_parsers\*.py`)
- These are the OLD format (pre-split) — the backend hasn't been migrated to use split/ yet
- **Do NOT archive until backend is updated to read from split/**

---

## 3. Graph & Index Data

### `cbse_data\nodes\graph\` — prerequisite graph, embeddings, API results

| File | Size | Purpose |
|------|------|---------|
| `prereq_graph_final.json` | 29.4 MB | **Final prerequisite graph** (used by backend) |
| `prereq_graph.json` | 5.1 MB | Older version of prereq graph |
| `node_index.json` | 1.5 MB | Node ID → metadata mapping |
| `node_metadata.json` | 12.5 MB | Full node metadata for graph operations |
| `node_embeddings.npy` | 31.4 MB | Embedding vectors for semantic matching |
| `edges_for_api.jsonl` | 64.2 MB | All candidate edges sent to API for scoring |
| `scored_pairs.json` | 34.7 MB | API-scored prerequisite candidate pairs |
| `candidate_pairs.json` | 15.9 MB | Pre-scoring candidate pairs |
| `api_results.jsonl` | 18.7 MB | Raw API results (prereq scoring) |
| `api_results_unified.jsonl` | 13.1 MB | Unified API results |
| `api_results_retry.jsonl` | 0.3 MB | Retry batch results |
| `api_progress*.json` | ~0 MB | Progress tracking for API calls |
| `depth_reasons_generated.json` | 11.4 MB | **Gemini-generated depth reasons** (partially complete) |
| `depth_reasons_c6_physics.json` | ~0 MB | Depth reasons for Class 6 Physics only |

- **238 MB total** — most of this is intermediate pipeline data
- **Essential:** `prereq_graph_final.json`, `node_index.json`, `node_metadata.json`, `node_embeddings.npy`, `depth_reasons_generated.json`
- **Archive candidates:** `edges_for_api.jsonl`, `scored_pairs.json`, `candidate_pairs.json`, `api_results*.jsonl`, `api_progress*.json` (intermediate pipeline artifacts, can be regenerated)

### `cbse_data\nodes\index\` — master index

| File | Size | Purpose |
|------|------|---------|
| `master_index.json` | 5.5 MB | Master node index (all classes) |
| `coverage_summary.json` | ~0 MB | Coverage summary stats |

- **Keep both** — small and useful

---

## 4. Archive Candidates in `cbse_data\nodes\by_class\`

### `archive_old_aggregate\` — **52 files, 874.5 MB**

- Old pre-split aggregate files (`class_6.json`, `class_6_complete.json`, `class_6_fixed.json`, etc.)
- Old per-subject work files (`class_12_bt_final.json`, `class_12_hindi_b1.json`, etc.)
- Old backups (`class_12_backup_20260901.json`, `class_6_backup_20260901.json`)
- Archived non-syllabus content (`c12_economics_archived_microeconomics.json`, etc.)
- **Safe to archive — superseded by split/**

### `scratchpad_old_imperfect\` — **26 files, 239.8 MB**

- Intermediate work files from the build pipeline
- Various `_done`, `_final`, `_reclassified`, `_enriched` versions
- **Safe to archive — superseded by split/ and perfect/**

### `class_12.json.bak_pre_official_fix` — **17.7 MB**

- Single backup file from before the official fix
- **Safe to archive**

---

## 5. `cbse_data\` Subdirectories

| Directory | Files | Size | Status | Notes |
|-----------|-------|------|--------|-------|
| `enrichment/` | 1,570 | 116.4 MB | **Keep** | Enrichment marker files — referenced by backend |
| `prereqs/` | 731 | 13.2 MB | **Keep** | Prerequisite pipeline output — referenced by backend |
| `content/` | 3,263 | 12.5 MB | **Keep** | Parsed textbook content |
| `hindi_cisce/` | 84 | 3.5 MB | **Keep** | Hindi CISCE content |
| `generated/` | 98 | 1.5 MB | **Keep** | Generated chapter nodes — referenced by `bloom_enrichment_generator.py` |
| `upper_primary_text/` | 12 | 1.7 MB | **Keep** | Source text for upper primary |
| `cross_board/` | 6 | 2.7 MB | **Keep** | Cross-board comparison data |
| `bloom_enrichment/` | 49 | 0.9 MB | **Keep** | Bloom taxonomy enrichment — referenced by backend |
| `c8_history_full/` | 9 | 0.7 MB | **Keep** | Class 8 History full content |
| `intelligence_updates/` | 3 | 0.6 MB | **Keep** | Intelligence system updates |
| `simulations/` | 3 | 0.5 MB | **Keep** | Simulation configs |
| `synthetic_students/` | 2 | 0.7 MB | **Keep** | Synthetic student data for testing |
| `solution_cache/` | 1 | 0.1 MB | **Keep** | Cached solutions |
| `reports/` | 7 | 0.1 MB | **Keep** | Audit reports |
| `bloom_test_batch2/` | 3 | 0.1 MB | Review | Test batch — may be archive-worthy |
| `curriculum/` | 1 | ~0 MB | **Keep** | Curriculum reference |
| `prereqs_backup_all/` | 268 | 9.3 MB | **Archive** | Backup of prereqs before rerun |
| `prereqs_backup_pre_rerun/` | 178 | 5.9 MB | **Archive** | Another prereqs backup |
| `analytics/` | 0 | 0 MB | Empty | Can remove |
| `diagnostics/` | 0 | 0 MB | Empty | Can remove |
| `practice/` | 0 | 0 MB | Empty | Can remove |
| `questions/` | 0 | 0 MB | Empty | Can remove |
| `solvers/` | 0 | 0 MB | Empty | Can remove |
| `tutoring/` | 0 | 0 MB | Empty | Can remove |

### `cbse_data\` root files

| File | Size | Status | Notes |
|------|------|--------|-------|
| `README.md` | 2.5 KB | **Keep** | Data readme |
| `interactions.json` | 1.0 MB | **Keep** | Student interaction logs |
| `agent_calibration_data.json` | 191 KB | **Keep** | Agent calibration |
| `confidence_data.json` | 108 KB | **Keep** | Confidence scoring data |
| `solve_log.json` | 82 KB | **Keep** | Solution log |
| `ab_tests.json` | 2.3 KB | **Keep** | A/B test config |
| `its_test_results.json` | 7.1 KB | **Keep** | ITS test results |
| `upper_primary_themes.json` | 1.8 KB | **Keep** | Theme mapping |
| `AUDIT_SCRATCHPAD.md` | 40 KB | **Archive** | Old audit notes |
| `CLASS_11_AUDIT.md` | 7.6 KB | **Archive** | Old class 11 audit |
| `MASTER_AUDIT_REPORT.md` | 13 KB | **Archive** | Old master audit |
| `NODE_ID_NORMALIZATION_SCRATCHPAD.md` | 5.2 KB | **Archive** | Old scratchpad |
| `SIM_GAP_SCRATCHPAD.md` | 3.6 KB | **Archive** | Old scratchpad |
| `SPLIT_REORGANIZATION_NOTE.md` | 4.6 KB | **Archive** | Old reorg note |
| `prereqs_pipeline.log` | 98 KB | **Archive** | Old pipeline log |

---

## 6. Platform Root — Code & Config (KEEP)

| Path | Type | Notes |
|------|------|-------|
| `backend/` | Code | FastAPI backend — **essential** |
| `backend_fastapi/` | Code | Alternative backend — review if still used |
| `frontend/` | Code | Next.js frontend — **essential** |
| `tutor-brain/` | Code | Tutor brain service — **essential** |
| `mcp_servers/` | Code | MCP server integrations — **essential** |
| `scripts/` | Code | Pipeline & audit scripts — **keep `audit_all.py`** |
| `.devin/` | Config | Devin CLI configuration — **keep** |
| `.github/` | Config | GitHub workflows — **keep** |
| `docs/` | Docs | Project documentation — **keep** |
| `.env` | Config | Environment variables — **essential** |
| `.env.example` | Config | Env template — **keep** |
| `requirements.txt` | Config | Python deps — **essential** |
| `docker-compose.yml` | Config | Docker config — **essential** |
| `docker-compose.prod.yml` | Config | Prod Docker — **keep** |
| `Dockerfile.backend` | Config | Backend Dockerfile — **essential** |
| `Dockerfile.frontend` | Config | Frontend Dockerfile — **essential** |
| `nginx.conf` | Config | Nginx config — **essential** |
| `alembic.ini` | Config | Database migration config — **essential** |
| `start_all.bat` | Script | Startup script — **keep** |
| `start_backend.bat` | Script | Startup script — **keep** |
| `start_frontend.bat` | Script | Startup script — **keep** |

---

## 7. Platform Root — Archive Candidates

### One-off scripts (root level) — ~150+ files

All `fix_*.py`, `check_*.py`, `_*.py`, `generate_batch*.py`, `gen_*.py`, `regen_*.py`, `find_*.py`, `show_*.py`, `classify_*.py`, `extract_*.py`, `clean_*.py`, `consolidate_*.py`, `organize_*.py`, `parse_*.py`, `improve_*.py`, `diagnose_*.py`, `hindi_pipeline*.py`, `master_pipeline*.py`, `completeness_audit.py`, `fable_*.py` files at the root.

These were one-off scripts used during development. They are NOT imported by any module. **Safe to archive.**

### Old logs (root level)

- `backend_server.log` (36 KB)
- `dev_server.log` (15 KB)
- `dev_server2.log` (24 KB)
- `frontend_server.log` (0.6 KB)

**Safe to archive.**

### Old markdown docs (root level)

- `HANDOFF.md` (45 KB) — old handoff doc
- `MASTER_SCRATCHPAD.md` (43 KB) — old scratchpad
- `FABLE_PIPELINE_TRACKER.md` (6.3 KB) — old tracker
- `CBSE_SIM_SCRATCHPAD.md` (14 KB) — old scratchpad
- `BACKEND_SOP.md` (16 KB) — may still be useful, review
- `ENGLISH_HINDI_PLAN.md` (60 KB) — old plan
- `FINAL_BUILD_PLAN.md` (9.2 KB) — old plan
- `FINAL_AUDIT_REPORT.txt` (42 KB) — old audit
- `MASTER_AUDIT_REPORT.txt` (20 KB) — old audit
- `SYSTEM_ARCHITECTURE_RAW.txt` (62 KB) — may still be useful
- `WORLD_CLASS_BUILD_PLAN.md` (39 KB) — old plan
- `WORLD_CLASS_BUILD_PLAN_IMPROVED.md` (40 KB) — old plan
- `CISCE_*.md`, `CISCE_*.json` (multiple) — CISCE comparison docs

**Safe to archive** (except review `BACKEND_SOP.md` and `SYSTEM_ARCHITECTURE_RAW.txt`).

### Old data files (root level)

- `all_corrupted_sims.txt` (16 KB)
- `sims_canvas.txt` (38 KB)
- `sims_svg.txt` (22 KB)
- `sims_threejs.txt` (0.3 KB)
- `sim_corruption_types.txt` (5.6 KB)
- `sim_errors.txt` (3.8 KB)
- `eng_classification.json` (8 KB)

**Safe to archive.**

### Large data directories (root level)

| Directory | Files | Size | Status | Notes |
|-----------|-------|------|--------|-------|
| `content/` | 8,778 | 720 MB | Review | Source content — may be needed for re-parsing |
| `organized/` | 9,754 | 218 MB | **Archive** | Organized output — superseded |
| `parsed_output/` | 3,320 | 255 MB | **Archive** | Parsed output — superseded by cbse_data |
| `_external/` | 2,827 | 110 MB | Review | External reference data |
| `cbse_coverage_output/` | 2,366 | 83 MB | **Archive** | Old coverage analysis |
| `cbse_coverage_output_fixed/` | 82 | 51 MB | **Archive** | Fixed coverage analysis |
| `hindi/` | 417 | 34 MB | Review | Hindi source files |
| `hindi_devanagari/` | 418 | 18 MB | Review | Hindi Devanagari source |
| `pipeline_output/` | 298 | 6.5 MB | **Archive** | Old pipeline output |
| `refs/` | 73 | 11 MB | Review | Reference documents |
| `screenshots/` | 15 | 1.9 MB | **Archive** | Debug screenshots |
| `load_tests/` | 15 | 0.1 MB | **Keep** | Load test scripts |
| `backups/` | 1 | ~0 MB | Review | Check what's here |
| `__pycache__/` | 1 | ~0 MB | **Remove** | Python cache |

---

## 8. `scripts/` Directory

### Keep (actively used)

- `audit_all.py` — **the main audit script** (run after any data changes)
- `audit_report.txt` — latest audit output
- `01_build_node_index.py` through `10_merge_tutor_brain.py` — numbered pipeline steps
- `build_graph_step*.py` — graph building pipeline
- `graph_api_step*.py` — graph API pipeline
- `split_by_subject.py` — the script that created the split/ directory

### Archive candidates (~250+ files)

All `_*.py` prefixed investigation scripts (one-off audit/investigation scripts from the recent audit work and earlier). These include:
- `_check_*.py`, `_audit_*.py`, `_verify_*.py`, `_inspect_*.py`, `_study_*.py`, `_find_*.py`, `_dump_*.py`, `_scan_*.py`, `_fix_*.py`, `_compare_*.py`, `_count_*.py`, `_recheck.py`, `_final_check.py`
- `add_depth_*.py`, `add_enrichment_*.py` — old depth/enrichment scripts
- `fix_c12_*.py`, `fix_c11_*.py`, `fix_c6_*.py`, `fix_c8_*.py` — old fix scripts
- `check_*.py` (non-underscore) — old check scripts
- `hindi_batch*.py`, `gen_hindi_*.py` — old Hindi pipeline scripts
- Various `.json`, `.txt` data files in scripts/ that were temporary

**Rule of thumb:** If it starts with `_` or matches `fix_*`, `check_*`, `verify_*`, `inspect_*`, `study_*`, `show_*`, `dump_*`, `find_*`, `count_*` — it's a one-off and can be archived.

---

## 9. Quick Reference — What to Use

| If you need... | Use this path |
|----------------|---------------|
| Canonical node data | `cbse_data\nodes\by_class\split\` |
| Per-class aggregate | `cbse_data\nodes\by_class\perfect\class_N.json` |
| Per-subject aggregate (all classes) | `cbse_data\nodes\by_subject\{subject}.json` |
| Prerequisite graph | `cbse_data\nodes\graph\prereq_graph_final.json` |
| Node index | `cbse_data\nodes\index\master_index.json` |
| Node embeddings | `cbse_data\nodes\graph\node_embeddings.npy` |
| Depth reasons (partial) | `cbse_data\nodes\graph\depth_reasons_generated.json` |
| Enrichment markers | `cbse_data\enrichment\` |
| Prerequisite pipeline output | `cbse_data\prereqs\` |
| Run audit | `python scripts\audit_all.py` |
| Backend code | `backend\` |
| Frontend code | `frontend\` |
| Environment config | `.env` |

---

## 10. Summary — Archive Plan

### Move to `D:\platform\_archive\`:

**From `cbse_data\nodes\by_class\`:**
- `archive_old_aggregate\` (874.5 MB)
- `scratchpad_old_imperfect\` (239.8 MB)
- `class_12.json.bak_pre_official_fix` (17.7 MB)

**From `cbse_data\nodes\graph\`:**
- `edges_for_api.jsonl` (64.2 MB)
- `scored_pairs.json` (34.7 MB)
- `candidate_pairs.json` (15.9 MB)
- `api_results.jsonl` (18.7 MB)
- `api_results_unified.jsonl` (13.1 MB)
- `api_results_retry.jsonl` (0.3 MB)
- `api_progress*.json` (3 files)

**From `cbse_data\`:**
- `prereqs_backup_all\` (9.3 MB)
- `prereqs_backup_pre_rerun\` (5.9 MB)
- Empty dirs: `analytics\`, `diagnostics\`, `practice\`, `questions\`, `solvers\`, `tutoring\`
- Old markdown: `AUDIT_SCRATCHPAD.md`, `CLASS_11_AUDIT.md`, `MASTER_AUDIT_REPORT.md`, `NODE_ID_NORMALIZATION_SCRATCHPAD.md`, `SIM_GAP_SCRATCHPAD.md`, `SPLIT_REORGANIZATION_NOTE.md`
- `prereqs_pipeline.log`

**From platform root:**
- All one-off scripts (~150+ `fix_*.py`, `check_*.py`, `_*.py`, etc.)
- All `.log` files
- Old markdown docs (except `BACKEND_SOP.md`, `SYSTEM_ARCHITECTURE_RAW.txt` — review first)
- Old data/text files (`all_corrupted_sims.txt`, `sims_*.txt`, `sim_*.txt`, `eng_classification.json`)
- `organized\`, `parsed_output\`, `cbse_coverage_output\`, `cbse_coverage_output_fixed\`, `pipeline_output\`, `screenshots\`, `__pycache__\`

**From `scripts\`:**
- All `_*.py` one-off investigation scripts
- All `fix_*.py`, `check_*.py`, `verify_*.py`, `inspect_*.py`, `study_*.py`, `show_*.py`, `dump_*.py`, `find_*.py`, `count_*.py` scripts
- Old `add_depth_*.py`, `add_enrichment_*.py`, `hindi_batch*.py` scripts
- Temporary `.json` and `.txt` data files

### Estimated space freed: ~1.7+ GB

### DO NOT ARCHIVE:
- `cbse_data\nodes\by_class\split\` — **canonical data**
- `cbse_data\nodes\by_class\perfect\` — useful aggregates
- `cbse_data\nodes\by_subject\` — **still used by backend**
- `cbse_data\nodes\graph\` essential files (graph, index, embeddings, depth reasons)
- `cbse_data\nodes\index\`
- `cbse_data\enrichment\`, `cbse_data\prereqs\`, `cbse_data\content\`
- `backend\`, `frontend\`, `tutor-brain\`, `mcp_servers\`
- `scripts\audit_all.py` and numbered pipeline scripts
- All config files (`.env`, `docker-compose*.yml`, `Dockerfile*`, `nginx.conf`, etc.)
