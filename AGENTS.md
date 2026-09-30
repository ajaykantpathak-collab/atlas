# Platform — Repo Rules

## Build source of truth

**`deploy/` is the ONLY tree Docker builds.** `docker-compose.prod.yml` has `context: .` (the deploy dir); `deploy/Dockerfile.backend` copies `deploy/backend/` + `deploy/content/` + `deploy/requirements.txt`; `deploy/Dockerfile.frontend` copies `deploy/frontend/`.

The root `backend/` and `frontend/` are dev copies. **Any change that must ship must be applied to `deploy/`** (or synced via `node scripts/sync-deploy.js`).

## Workflow

- Backend changes: edit `deploy/backend/**`, then `docker cp` the file into running containers (`dream-backend-1/2` → `/app/backend/...`) — no rebuild needed for .py changes.
- Frontend changes: edit `deploy/frontend/**`; a rebuild is required (Next.js compiles at build time).
- After ANY change, verify the running artifact — `curl` the served HTML/JSON or `docker exec` the file — never assume a build shipped what the source shows.
- One build per batch of changes. Do not rebuild per edit.

## Data boundaries

- `deploy/content/enhanced_nodes_md/` = the canonical CBSE corpus — **14,236 files** (Classes 6–12; includes `_comp` companion docs). Master copy: `C:\Users\Alesha4285\Desktop\enhanced_nodes\md_cache`. Class 9 Hindi is one book (`hin_ga`) per the 26-27 syllabus; Sanskrit/Urdu are out of scope. Classes 1–5 use the junior-games system, not this corpus.
- `deploy/content/cisce_nodes_v2/` = the canonical CISCE corpus — **9,431 files** (Classes 6–12, ICSE + ISC boards). Dual-corpus serving is live (the loader scans both dirs). Same master-copy rule applies.
- `D:\platform\runtime_data/` → mounted at `/app/cbse_data` in backends (solver engine files, embeddings, state).
- `board_questions` table: **253,456** node-derived questions across 115 class/subject combos.
- Node IDs (e.g. `c10_bio_cbse_01_001`) are internal-only — never expose in student-facing fields.
  **Owner decision (2026-09-29):** ids DO travel in API payloads/URLs as opaque fetch keys (same as
  `/learn/<id>` routes) — that is accepted-by-design. The rule is about *display text*: scrubs +
  audits enforce zero ids in visible strings. Do not "fix" payloads to remove ids.
- Corpus scope decision (2026-09-29): the dual-corpus loader serves BOTH `enhanced_nodes_md` (CBSE)
  and `cisce_nodes_v2` (ICSE/ISC, `_isc_` filenames parse). CBSE Hindi/English content-quality waves
  (micro-stubs, c9_hin_ga soup, English-in-Hindi, CJK, KrutiDev Q&A rows) are PARKED by owner decision
  — documented in `_cisce_build/pillar1/`, do not relaunch without an owner go.
- `deploy/content/` is **bind-mounted** to `/app/content` in backends — new/rewritten .md files are instantly visible to the container, no `docker cp` needed.

## Content reload gotchas (learned)

- After editing node .md files: `docker exec dream-backend-1 python -m backend.tools.load_cbse_enrichment` refreshes `enrichment_content` rows (titles, examples, graph ids).
- `/api/content/nodes/<id>/enrichment` reads definition/walkthrough/diagnostics from the **in-memory `load_index()` singleton**, not the DB — new files need an index rebuild.
- **Stale-cache trap:** `ENHANCED_NODES_FAST_FINGERPRINT=1` fingerprints the corpus by `{file_count, grade_map_bytes}` only. Same-count file rewrites (150 stubs → 150 authored) do NOT invalidate `backend/_cache/enhanced_nodes_index.json(.pickle)` — a plain restart just reloads the stale pickle (~1 min). Fix: `rm /app/backend/_cache/enhanced_nodes_index.json*` in the container, THEN restart; preload rebuilds from md. Apply to both backends (rolling restart keeps service up).

## Verification

- `curl http://localhost/api/health` — backend
- `curl http://localhost/` — frontend/nginx
- `docker ps` — all services healthy
