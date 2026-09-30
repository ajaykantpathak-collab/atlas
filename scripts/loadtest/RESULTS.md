# TIER3 Load Report — http://localhost (single host, load generator co-located)

Tool: autocannon 7.15.0 (via npm) + a dependency-free Node harness for the
chained practice flow. Profile: browse + practice submit + ask.
Scenarios: scripts/loadtest/{browse,practice,ask}.js

## Browse mix (70% / · 15% /login · 10% /api/health · 5% topic search)

Front door (nginx), POST-fix (static shells for /, /login, /homework,
/teacher-assignments):

| CCU | requests | errors | timeouts | p50 | p99 | rps |
|-----|----------|--------|----------|-----|-----|-----|
| 50  | 1947     | 0      | 0        | 565 ms | ~4.3 s | 65 |
| 200 | 1431     | 0      | 0        | 3.4 s  | ~8.8 s | 48 |

PRE-fix (same mix, SSR-per-request shells): 50 CCU 104 timeouts; 200 CCU
193 timeouts (10.5% error rate). Root cause: root layout sets
`dynamic = "force-dynamic"`, so EVERY page SSR'd per request. Fixed by
exporting `dynamic = 'force-static'` on the public/client-fetch pages
(all data loads client-side via react-query after auth; nothing lost).

## API tier, bypassing nginx limiter (direct to a backend :8001)

- GET /api/health: trivial (p50 single-digit ms).
- GET /api/nodes/search: ~1850 rps single backend before client/limiter
  saturation; p97_5 89 ms in isolation.

## nginx rate limiter (per client IP)

Was 10 r/s + burst 20 — a 30-student classroom behind ONE school NAT trips
this at idle page loads. Raised to 50 r/s + burst 100 nodelay
(deploy/nginx.conf). Single-IP load runs above that rate see fast 503s —
protective behavior working as designed, not backend failures.

## Practice write path (real pipeline: POST /start → /submit, 50 CCU)

72 completed cycles / 30 s (2.4 cycles/s), 31 failed, p50 17.1 s per full
cycle, p95 30.4 s. Single-cycle latency is ~1.0–1.6 s (IRT selector +
session insert + grading + Attempt/ActivityLog/XP/mastery writes); at 50
concurrent the per-worker DB pool (pool_size 5 + overflow 10) and the
CPU-bound selector queue it. HONEST CAPACITY: ~2–3 concurrent practice
cohorts per backend before latency degrades; failures at 50 CCU are
client-observed timeouts, not data corruption (all completed cycles wrote
complete rows).

## Ask (POST /api/tutor/ask, 10 CCU)

Every request answers in exactly ~10.1 s with the endpoint's own honest
timeout fallback ("taking longer than usual…"). In this deployment the
enrichment/embedding lookup does not complete inside the endpoint's 10 s
internal bound, so real ask traffic currently degrades to the fallback at
~0.1 rps per in-flight request. Capped by design; capacity fine at real
ask rates (a class asks a handful of questions per minute), but the
latency budget IS the fallback today.

## Environment caveats

- Load generator co-located with the stack (Windows host + Docker Desktop);
  200-CCU direct-to-published-port runs are bounded by Docker's userland
  proxy, not the app — front-door numbers via nginx are the honest ones.
- Other tiers' dev servers were active on the host during measurements.

Repro: `node browse.js 50 30`, `node browse.js 200 30`,
`node practice.js 50 30 http://localhost:8001`, `node ask.js 10 30`.
