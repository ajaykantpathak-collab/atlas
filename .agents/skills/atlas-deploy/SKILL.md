---
name: atlas-deploy
description: Deploy Atlas platform changes to production at D:\platform — build images, recreate containers, handle warm-up, restart nginx, and verify. Use whenever deploying Atlas code, rebuilding the frontend or backends, shipping fixes to :3001/:80, or when the user says ship/deploy/rebuild.
---

# Atlas Deploy

Ship changes from `deploy/` (the only build tree) to production. Every skipped
step in this sequence has previously caused a production incident.

## The sequence — run in order, never skip

```
1. PRECHECK   deploy/ tree is synced with the repo (diff changed files).
              Containers may hold newer hot-fixed code than the repo — diff
              container vs repo before building (MSYS_NO_PATHCONV=1 for docker exec).
2. BUILD      cd D:/platform/deploy
              docker compose --env-file .env.production -f docker-compose.prod.yml build <services>
              Background it (frontend ≈ 5-10 min). Do NOT build in parallel with
              other heavy work — CPU storms have wedged builds and dev servers.
3. RECREATE   docker compose … up -d
              Verify the recreate COMPLETED — containers can stick in "Created"
              state forever if interrupted. Re-run `up -d` until all show Up.
4. WARM-UP    Backends rebuild the 213MB index + preload models at boot (~2-5 min).
              `docker logs dream-backend-1` should show solver self-tests passing.
              Poll — never declare done while health says "starting".
5. NGINX      docker restart dream-nginx   ← MANDATORY, every time.
              nginx resolves upstream IPs at startup; a skipped restart = 502s
              for everyone while every container looks healthy.
6. VERIFY     curl http://localhost/api/health        (all services true)
              curl -o /dev/null -w "%{http_code}" http://localhost:3001/        (200)
              + one deep page per changed area (galaxy / story / pre-board)
```

## Service names
backend-1, backend-2, frontend, nginx, postgres, neo4j, redis, qdrant, clickhouse, db-init.
Backend-1 and backend-2 have SEPARATE build sections — build both.

## Rollback / recovery
- Stuck "Created" containers → re-run `up -d` until recreated.
- Backends unhealthy long after start → `docker logs dream-backend-1` and grep for
  NameError/Traceback. Boot progresses through solver self-tests when healthy.
- Frontend "unhealthy" while serving 200 → healthcheck probes /api, which fails
  while backends are down. Fix backends, not the frontend.

## Rules
- One build per batch of changes. Background builds and verify only after completion.
- Env file: always `--env-file .env.production`. PUBLIC_API_URL stays EMPTY
  (relative base — absolute values caused the CORS download-prompt incident).
- After frontend changes: Next compiles at build time — production only after a
  rebuild. Never tell the user "fixed" for :3001 until the rebuild shipped.
- NEVER run `next dev` without `NEXT_DIST_DIR` set (next.config.js supports it).
  A dev server writes into `.next` and DESTROYS the production build on disk
  while `next start :3001` keeps serving stale manifests — routes 500, chunks
  400, and one crash-loop restart kills the frontend entirely (this exact
  incident: 2026-10-04, reticle init started `npm run dev`, .next clobbered,
  4-5 min native rebuild + FE restart needed to recover).
