# ATLAS HANDOFF — 2026-10-10

Read this first. Everything below is the current true state of the platform and the
pending work batch. Repo rules live in `D:\platform\AGENTS.md` — they are law.

## 1. Deploy model (unchanged)

- `deploy/` is the ONLY Docker source of truth. Root `backend/`/`frontend/` are dev copies.
- Backend: edit `deploy/backend/**`, `docker cp` into `dream-backend-1/2` (`/app/backend/...`), .py needs no rebuild, needs restart.
- Frontend: edit `deploy/frontend/**`; **Next.js must rebuild** — nothing ships without a build.
- Production frontend: native `next start` on **:3001** (Docker FE container retired). Backends: nginx :80 → `dream-backend-1`/`2`.
- **SHIP LAW**: build everything → test on dev instance → ONE coordinated ship. Zero mid-batch restarts. Ask the owner before any restart.

## 2. Approved design direction (owner-approved 2026-10-10)

**"Cosmos for dreaming. Paper for doing."**

- WONDER layer (landing hero, galaxy, story, junior) stays dark cosmos.
- WORK layer (practice, examiner, chapter tests, dashboard cards) becomes **exam-paper**: cream sheet, red double-margin rule, `[marks]` boxes, ruled lines, handwriting answers, red-pen margin ticks, `VERIFIED` stamps, register ledgers, lettered steps `a. b. c.`.
- Full system documented: **`deploy/frontend/DESIGN.md`** — tokens, primitives, migration queue, non-negotiables. Read it before any FE work.
- New primitives: `deploy/frontend/components/paper/paper.css` + `PaperSheet.tsx` (margin-rule sheet container).
- **paper.css is imported in `app/layout.tsx`** (component-level imports do NOT hoist into the page's css link set — learned the hard way).

## 3. Staged batch — built, verified on dev, NOT SHIPPED

All in `.next-fix` (built clean, running preview on **:3006** — `NEXT_DIST_DIR=.next-fix next start -p 3006`):

| Change | Files | State |
|---|---|---|
| Landing folds | `app/page.tsx` + `components/landing/LandingFolds.tsx` | LIVE on :3006 — Lumen hero untouched, then paper ledger (real class counts), marked-answer proof card, lettered steps, cosmos close CTA |
| QuestionCard paper reskin | `components/assessment/QuestionCard.tsx` | compiled — exam sim/chapter tests get answer-book skin (margin qnum, `[marks]` box, lettered options, ruled textarea) |
| Hindi toggle | `app/dashboard/page.tsx` + `messages/en.json`/`hi.json` | 30 `dashboard.*` keys; all chrome now via `tHome()` — was the verify-sweep FAIL |
| Adaptive difficulty | `deploy/backend/api/practice.py` | **staged — needs backend restart to activate**. `_safe_difficulty` + serve-layer normalizer map corpus noise (`"** hard"`, `high`, `medium-hard`, glued blobs) → real labels. ~12k hard/easy questions were collapsing to "medium" — that's why steering looked invisible. Verified against live corpus values. |

Story mode was verified real (7 scenes, authored content on `/learn/<id>/story`) — the earlier "PARTIAL" was a shallow probe, not a defect.

## 4. Live production state (as of last verify)

- Both backends healthy; launch gate passes (353 routes, 20,797 corpus nodes, solver self-test 3/3).
- neo4j: 25,453 nodes / 161,099 edges (resynced — galaxy-relevant counts).
- `/api/content/subjects`: 214 combos (was stale 48).
- Practice submit: 4.6s (was 60s+ cold — compq lock+warm shipped).
- ClickHouse: authenticated.
- Reticle: **10/10 PASS** on :3001 (after hydration warm-up; cold starts flake).
- Latest verify sweep: 12 PASS / 2 PARTIAL / 1 FAIL — the FAIL was the Hindi toggle (now fixed, staged).

## 5. Known open problems (owner-flagged, next batch)

1. **Galaxy (`/my-galaxy`) looks cluttered** — signed-out state shows colliding subject labels behind the sign-in modal ("looking all rubbish"). Needs a design pass: label collision fix, calmer density, maybe the paper/cosmos treatment. Highest owner pain right now.
2. **Ledger links go to `/my-galaxy`** which immediately gates behind sign-in — decide a public-facing destination or accept the gate.
3. `easy` questions are scarce (654/40k competency) — adaptive can steer UP fine but steering DOWN runs out of easy material in many subjects. Content coverage issue, don't fabricate.
4. NIM content generation: was ~1,525 parts remaining (~2.5h) — check `deploy/content/supplements/` marker count before ship.
5. Paper migration queue (DESIGN.md): dashboard cards, examiner result view, `/solve` answer rendering.
6. Root dev tree has copies synced for practice.py/page.tsx/messages — LandingFolds/paper components were created in deploy only; mirror if root parity matters.

## 6. What NOT to do (recent scars)

- Never glob `_*` for cleanup — it matched `__init__.py` (66 package inits destroyed last time).
- Never trust a served page == new build: `curl | grep buildId` and compare to `.next-*/BUILD_ID`. Stale :3006/3001 processes have lied twice.
- Backend restart after corpus/index changes needs `rm backend/_cache/enhanced_nodes_index.json*` first (stale-pickle trap) AND triggers a ~45min one-time MiniLM re-embed if node count changed — cache lives in `runtime_data/node_embed_*.npy`.
- Compose needs `--env-file .env.production` (COMPLIANCE_DATABASE_URL etc.).
- Never weaken launch gates or Reticle to make a ship pass.
- tsc on the whole tree OOMs — build script is now `node --max-old-space-size=8192`; keep it.

## 7. Verify commands

```bash
npm run verify                        # Reticle 10-flow gate (from deploy/frontend)
curl http://localhost/api/health      # backend via nginx
curl -s http://localhost:3006/ | grep -oE 'buildId[^,]*'   # served build vs BUILD_ID
docker ps                             # container health
docker exec dream-backend-1 python -c "from backend.services.enhanced_nodes import load_index; print(len(load_index().nodes))"
```

## 8. Ship checklist for the staged batch (when owner says go)

1. Mirror deploy→root for new files (`components/paper/`, `components/landing/`, DESIGN.md).
2. Final `NEXT_DIST_DIR=.next-fix npx next build` (8GB heap) → swap `.next` → restart :3001 serve loop.
3. `docker cp deploy/backend/api/practice.py` → both backends → rolling restart (health-gated).
4. Re-probe: adaptive label spread on `/api/practice`, Hindi toggle visible diff on dashboard, fold renders on `/`.
5. Reticle `npm run verify` on :3001.
6. Append results to `BUGS.md`.

Screenshots of current staged state: `D:\platform\_work\fold_v3.png`, `fold_v3b.png`, `close_v3.png`, `galaxy_now.png` (the clutter complaint).
HTML design mocks the owner approved: `D:\platform\_work\design_preview.html`, `landing_preview.html` (serve `_work` via `python -m http.server 8787`).
