# Follow-Up Backlog — post close-batch (2026-10-03)

Owner-gated / non-blocking items collected during the 6-agent completion wave
and the close-batch deploy. Nothing here blocks the app; ordered roughly by
operational risk.

## OPS (do soon — cheap and prevents incidents)

1. **Worker `content_reindex` memory guard** — the job starved the 10GB WSL VM
   on 2026-10-03 and took the whole stack down for ~3 min (Docker engine
   wedged, 500s on the management pipe). Fixes: (a) run heavy jobs only when
   triggered off-hours (host cron enqueue at 04:00), (b) add a concurrency
   limit `WORKER_MAX_CONCURRENT_HEAVY=1` plus skip-if-host-busy logic, or
   (c) move reindex to the native side. Until then: keep dream-worker stopped
   during builds/verifies; re-enable with
   `docker update --restart=unless-stopped dream-worker && docker start dream-worker`.
2. **Docker engine wedge pattern** — twice in one day the engine 500'd
   (`docker-desktopLinuxEngine/_ping`) under VM memory pressure. Long term:
   raise `.wslconfig` memory above 10GB when the box allows, or move builds
   off-VM (native frontend build) — the phased-build workaround (stop
   backend-2 during `next build`) works but is manual.
3. **Backups / DR** — still nothing scheduled. pg_dump cron for dream_app +
   atlas_compliance + a restore drill. Highest-value reliability item.
4. **Monitoring** — `/metrics` serves (Prometheus text) but nothing scrapes or
   alerts. Minimum: host cron or worker job that scrapes and warns on 5xx-rate
   / p95 latency; wire ClickHouse analytics into an admin view.

## QA-accepted solver items (R1–R5 from tests/qa_solver_report.md)

- R1 computed-lane p95 ~4.2s (goal <3s): double registry sweep — `model_problem`
  re-runs all structures for the reasons string; reuse first pass.
- R2 LLM parse-assist fires inside the "deterministic" path
  (`competency_engine.py:752`, 3×15s remote calls) — OWNER DECISION: keep
  (better parsing) or force pure-deterministic (bounded latency).
- R3 chemistry coverage: bank sampled 0/3 served (honest refusals) — add
  authored chem answer keys / node bindings.
- R4 no plausibility veto for absurd premises ("500 km in 2 minutes" verified
  numerically) — add a domain sense-check layer; unit not normalized to ask.
- R5 re-run QA harness after every deploy to keep the gates pinned.

## Product polish (small)

- ClickHouse creds mismatch in `services/analytics_service.py` (dream_user /
  dream_ch_2024 rejected by local ClickHouse) — analytics emits silently fail;
  align creds or disable loudly.
- Dev CORS allowlist lacks dev-server ports (3005/3006/3007) — add for agent
  verification runs.
- ITS websocket `/api/tutor/its/ws` not mounted — /tutor falls back to HTTP
  chat with reconnect noise.
- Solver answers show raw sympy (`x**2*exp(x)`) — pretty-print layer.
- 17 frontend→backend literal-path mismatches documented by BE-2
  (socratic.service, offlineManager prefetch, /api/theme, public demo
  endpoints) — walk and fix or delete.
- `journey` signup commit-lag (fixed) — frontends should still tolerate one
  401 retry right after signup.

## Content arcs (owner-gated, PARKED by owner decision)

- Hindi wave: ~38k questions / 15 combos with no solver; needs an owner go.
- Diagram natural-set tail: ~4,900 nodes in `_diag_natural.json`.
- App-store builds + screenshots + review notes (compliance/mobile modules
  already live); parental-consent flow review for minors.
- CISCE parity verify-sweep.
