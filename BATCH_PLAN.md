## 3. Batch plan (4 batches, VERIFY EACH BATCH — AMENDED 2026-09-27)

> **Amendment 1 — "ONE rebuild at end" is retired.** Every batch ends with
> `npm run typecheck:gate` (112-error ratchet) **and a dev build**, plus
> `python -m pytest backend/tests` when it touches the backend. Deferring all
> verification to one final rebuild is what let 112 type errors and a 17.5GB
> image accumulate unseen; it also makes any failure un-bisectable.
> **Amendment 2 — backup scope:** `scripts/backup.sh` does not exist yet (item
> B2.5 is a spec, not a fix) and MUST cover both `content/cbse_nodes_md` and
> `content/cisce_nodes_*`: `deploy/` is wholesale gitignored (`.gitignore:70`,
> 0 tracked files), so `docker-compose.prod.yml`, `Dockerfile.*`, `nginx.conf`
> and `.env.production` are equally unbacked-up.
> **Amendment 3 — CISCE mount stays FROZEN** until corpus generation completes;
> do not mount or sync `cisce_nodes_v2` in any batch below.

### BATCH 1 — Hygiene + type-zero + tokens (2 days, zero visual change)
1. .gitignore: .next*, node_modules, *.log, _ts_errors*.txt, __pycache__, backend/_cache/*.pickle, *.tsbuildinfo. Move frontend/_*.js, _*.log, _shots/ → frontend/_archive/ untracked.
2. Burn _ts_errors.txt to 0 via scripts/check_types_baseline.mjs, then flip typescript.ignoreBuildErrors false. Don't touch sims_v2 generated types — fix imports only.
3. Lock brand/gold palette in tailwind.config.js, forbid rogue purple outside premium orbs.
4. CI: node scripts/sync-deploy.js --check must fail on drift.
5. Verify: npx tsc --noEmit, npm run build heap measure, git status <200 lines. **AMENDED: also `npm run typecheck:gate` + dev build + `python -m pytest backend/tests` (34 IDOR/guard tests, green as of 2026-09-27). No batch closes on "it will be checked at the end".**
5b. DONE 2026-09-27 — backend security pass: 3 IDORs + 1 anonymous write + 13 anonymous aggregates gated via `deps.require_self_or_staff`/`_require_staff`; `CLICKHOUSE_PASSWORD` default removed; `_safe_id` closes the ClickHouse f-string injection; all 11 `_ch_query*` call sites moved to `asyncio.to_thread` variants. New `pytest.ini` sets `-p no:faulthandler` — without it pytest dies with 0xc0000139 on the scipy import before collecting anything.
- Lumen/premium: NONE. Verify imports only.

### BATCH 2 — Backend to 10 (3 days, no API break)
1. Canonicalize config.py ↔ security.py: jwt_secret, jwt_algorithm, access_token_expire_minutes. Startup assert refuses default secret in prod.
2. Slim Dockerfile.backend multi-stage, content + hf_cache to volumes. Target <2.5GB (from 17.5GB).
3. Index: keep ATLAS_MASTER_WARM --preload, add Redis cache for /enrichment TTL 24h, pickle key = {file_count, sha1(grade_map), CACHE_VERSION} — fixes stale-pickle trap.
4. Auth: OtpSender protocol + Mock(dev) + Msg91/Twilio(prod). CORS lock to GET,POST,PUT,PATCH,DELETE. Add /api/auth/* 5r/s zone (keep 50r/s global).
5. Sentry + JSON logs + /metrics internal + scripts/backup.sh nightly (pg_dump + neo4j + qdrant → S3). **AMENDED — this item is still unwritten, so it is a spec, not a fix. Scope must be: pg_dump + neo4j + qdrant + BOTH content trees (`content/cbse_nodes_md`, `content/cisce_nodes_*`) + the whole `deploy/` config surface (`docker-compose.prod.yml`, `Dockerfile.*`, `nginx.conf`, `.env.production`), which is 0% git-tracked. Exclude nothing in deploy/ except `.env` secrets from any artifact that leaves the box.**
2b. **17.5GB image root cause is now known:** `Dockerfile.backend` runs `COPY content/ ./content/`, and `.dockerignore` excludes only `frontend/public/doodle_cards`. Item B2.2 (content + hf_cache to volumes) is therefore the fix, and it is a plain COPY-line change, not a redesign.
6. Fix: diagnostic _irt_select plan-exhausted 400, practice degenerate 1/5 pools → backfill from board_questions or honest insufficient-bank label.
7. Verify: pytest its/tests, curl health/stats, docker stats, p95 probe. **AMENDED: add `python -m pytest backend/tests` and a per-batch dev build; `curl` the newly gated endpoints expecting 401/403 anonymously and 200 with a staff token.**
8. **CISCE parser wiring (AMENDMENT 4 — new item).** CISCE is not "58% absent", it is **unparseable**: `_FILENAME_PATTERNS` in `backend/services/enhanced_nodes.py:107-114` match only `_cbse_`/`_ch`/`_u`, so CISCE names like `c10_bio_icse_01_001.md` match nothing, `parse_filename` returns `None`, and every file is skipped **silently**. 5,487 + 9,433 nodes exist on disk and have never been served. Needs: a board token (`_icse_`/`_isce_`), a chapter-token shape for the `NN_MM` suffix, and `get_md_dir()` (L759-760) turned into a LIST of dirs — one directory per board no longer holds. Also settle which dir is canonical: `deploy/content/cisce_nodes_v2` (deploy-only, same unrecoverable class as the 47 PNGs) vs `content/cisce_nodes_md`. Add a parse-count assertion so "0 files parsed" can never again report as success.


### BATCH 3 — Student feeding to 10 (4 days, biggest win)
1. StoryMode.tsx surgical: Feed-Up header (Objective from MASTERY_CRITERIA + Board proof count + Why matters), Overview collapsibles, KaTeX fix, timer off class<=8, confidence chips (localStorage, never graded — **note: `POST /api/intelligence/confidence` now requires a token and rejects a foreign `student_id` with 403 (B16 write-IDOR fix, 2026-09-27). Chips may only be sent for the logged-in student; keep the localStorage copy as the offline/anonymous fallback so anonymous sims still work.**), self-explain trap pick, stuck-rescue after 2 wrongs, interleave 2/5 Q from review queue, tier badge + audit expander.
2. Premium infusion (USE not duplicate): PremiumLoader routes, PremiumSkeleton cards, ScrollReveal beats, TiltCard+Spotlight worked example, AuroraBackground subtle behind /learn ONLY (never inside /lumen).
3. Lumen: keep engine, add ?static=1 + poster + next/font preload + captions + deep links (/review /exam-prep). FPS guard: <30fps 3s → static + toast.
4. Hindi + voice: messages/hi.json toggle, ELI5 Hindi fallback, edge-tts POST /api/tts cached.
5. Board-Examiner C10 maths first: grade_answer vs marking DAG + CopyWorthy diff (lib/boardAnswer.ts).
6. Verify: Playwright _audit_personal _livesim _juniorsweep on :3001 + Lighthouse.

### BATCH 4 — Landing + pay + launch (2 days)
1. / keep LumenCosmos + honesty band, build-time counts from /api/nodes/stats (no hardcoded drift), add /lumen teaser + Marquee + AnimatedCounter.
2. /premium keep, fix 500+ students claim → honest, ?plan=premium → Razorpay (already in requirements) → entitlement.
3. /lumen: OG + title + meta, Enter + View plans CTAs, FPS guard.
4. Delete app/atlas-v2, junior-simple, _archive (keep redirects), nginx gzip + static cache + TLS, keep output:standalone + INTERNAL_API_URL.
5. ONE rebuild: compose prod up --build, staggered warm, nginx restart mandatory, 14-point sweep + recall2/modelans probes, update ATLAS_PRODUCT_REVIEW scorecard.
6. Docs + tag v10.0.
