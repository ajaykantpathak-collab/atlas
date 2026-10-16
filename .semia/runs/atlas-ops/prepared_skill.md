---
name: atlas-ops
description: Deploy, restart, and operate the Atlas CBSE platform at D:\platform — production builds, container restarts, agent fleet management, verification sweeps, and outage recovery. Use whenever deploying Atlas changes, restarting services, launching agent build waves, diagnosing 502s or unhealthy containers, or running acceptance checks on :3001.
---

# Atlas Ops — deploy, fleet, verify

The platform: FastAPI backends (dream-backend-1/2, docker-cp workflow), Next.js
frontend (dream-frontend, rebuild-to-ship), nginx (dream-nginx), postgres/neo4j/
redis/qdrant/clickhouse. Dev server: :3000. Production: :80 and :3001.
Source of truth: `deploy/` — **always build from deploy, never recreate from
stale images.**

## Deploy SOP (every deployment, no skipped steps)

1. `docker compose --env-file .env.production -f deploy/docker-compose.prod.yml build <services>` (background it; frontend ≈ 5-10 min, backends ≈ cache-fast)
2. `docker compose … up -d <services>` — then **verify the recreate completed** (containers can stick in "Created" — re-run `up -d` if so)
3. `docker restart dream-nginx` — MANDATORY after any backend restart (nginx resolves upstreams at startup; skipping this = fleet-wide 502)
4. Warm-up wait: backends rebuild the 213MB index + load models at boot — health flips to healthy after ~2-5 min. Poll, don't guess.
5. Verify: `curl http://localhost/api/health` (all-true), landing 200, one deep page (galaxy/story/pre-board) 200.
6. Clear the restart lock in BUGS.md ## OPS.

## Backend hot-fix workflow (no rebuild)

Edit → `docker cp` into BOTH backends → restart both → nginx → verify → mirror
to deploy. Before docker cp: **diff repo vs container file** (`docker exec
dream-backend-1 diff …`, with `MSYS_NO_PATHCONV=1` in Git Bash) — stale repo
copies have reverted live fixes. If container is newer, pull container→repo first.
Batch changes; ONE restart per batch, under a restart lock (below).

## Agent fleet discipline

- **Max 6 concurrent agents.** Never launch beyond the cap.
- Every fixer claims work in `BUGS.md` before touching it (`[claimed-<tag>]`);
  done = `[fixed-<tag>]` with live-verification evidence. Failed Edit = someone
  claimed first — re-read, take another item.
- Backend restarts require appending `- [restart-lock <tag> <HH:MM>]` under
  `## OPS` first; remove when healthy. Never restart with a foreign lock open.
- Time-box agents: a workstream that exceeds ~6h is runaway — stop it, audit its
  leftovers, relaunch tight-scoped.
- Auditors find; fixers fix. Never let an auditor "just also fix" a claimed item.

## Verification harness

- Full capture: `frontend/_audit_personal.js` (17 surfaces, 2 viewports, 3 personas)
- Health: `curl http://localhost/api/health` (all-true) + landing/galaxy/story/pre-board 200s
- NEVER verify pages via curl alone — SSR shells return 200 while the app is broken.
  Use Playwright (frontend/node_modules) with hydration waits + console-error capture.
- Fair-use: tasks/user, no fabricated data anywhere, zero-wrong content rule
  (never invent facts; derive extractively or mark gaps honestly).

## Known failure modes (all previously hit — recognize fast)

| Symptom | Cause | Fix |
|---|---|---|
| 502 on :80/:3001 after backend restart | nginx stale upstreams | restart nginx |
| Page downloads instead of rendering | poisoned SW navigation cache | clear site data; SW version-bump |
| Backend unhealthy 5+ min after start | boot warm-up (index+model) — OR crash; check `docker logs` for NameError/Traceback | wait if progressing; fix code if Traceback |
| 401 on authed endpoints after login | token never persisted / fetch missing auth header | check localStorage keys (token, dream-auth.state.token) |
| Empty question pools | subject alias missing in `_CORPUS_SUBJECTS` or class-gate leak | alias map + class gating |
| Dev :3000 hollow (200 but no JS) | stale .next | `rm -rf .next`, restart dev server |
