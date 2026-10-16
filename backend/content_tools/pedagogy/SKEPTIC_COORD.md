# SKEPTIC-COORD — the coordinator's own tear-down (architecture/ship-risk lane)
*2026-10-06 · evidence-checked today; merges with SKEPTIC_BACKEND.md and SKEPTIC_PRODUCT.md*

## BREAKER-class (blocks launch or kills trust at first contact)

1. **Hosting platform cannot keep the app up.** Docker Desktop's engine died
   7× today (including mid-ship, mid-log-stream, twice mid-verification).
   Root cause: vhdx + pagefile on the 7200rpm HDD + 10GB WSL VM. A
   laptop-hosted 14-day test with 20 testers will suffer the same deaths —
   every daemon flake looks to testers like "the app is broken."
   → pagefile→SSD (owner, one click) or a VPS before the test. Non-negotiable.

2. **Verified-rate is measured on 0.7% of the bank.** Sweep: 1,750/253,903
   (0.3 rows/s, ETA 11 days). Every "engine verified" claim is a stratified
   sample, not a fact. An investor asks: "show me 100% of the bank" — we
   can't yet. Acceleration (sharding) exists but never ran to completion.

3. **Payments are a mock.** Razorpay keys: absent (configured:false
   everywhere; webhook idempotency code tested only with fakes). An investor
   opens /pricing and sees a stub. The revenue story is unproven end-to-end.

4. **No AAB exists** (capacitor/build absent). The Play Store closed-track
   (12 testers × 14 days) — the stated purpose of the 14-day test — cannot
   start. Either the AAB gets built or the test runs web-only.

## HIGH-class (breaks under load/time, not in demos)

5. **Two gunicorn workers × process-local state.** `_MEM_SESSIONS`,
   mastery_sync `_default_service`, per-worker Qdrant/MiniLM singletons:
   a session created on worker A 404s on worker B unless the DB row
   resolves — the demo-mode branch is worker-local by design. With
   `UVICORN_WORKERS: 2`, every no-DB fallback path is a latent
   "session not found" for ~50% of requests after a DB hiccup.
   Mitigation exists (sessions persist to DB when DB is up) but the
   fallback path is a real hole during exactly the incidents when it's used.

6. **Zero row locking.** `select_for_update` count across the codebase: 0.
   Two parallel submits to the same session (double-tap, retry) race the
   `questions_answered` counter and XP awards. XP double-pay is guarded by
   event_key (good) but session-state races are not.

7. **JWT refresh token in localStorage.** XSS → full account takeover;
   standard for MVP, flagged by every security review. No rotation
   invalidation story server-side (single-flight refresh exists client-side).

8. **Anonymous sessions are fully playable with no auth**, and `_MEM_SESSIONS`
   grows unbounded in no-DB mode (no eviction seen) — memory leak on a
   DB-outage Friday evening.

9. **No offsite backup.** Backups DO run daily (atlas_compliance + dream_app
   dumps through today, restore_drill.log exists) — but they live on the
   same physical disk as the database. HDD dies = everything dies. Zero
   lines mentioning cloud/S3/rclone in the backup script.

10. **Redis is decorative.** Wired into health checks and shutdown only —
    no caching, no rate limiting, no session store. Every hot read
    (mastery, next-step, dashboard) hits Postgres directly. Fine at 20
    testers; a scaling investor will discount the architecture accordingly.

11. **Dashboard = 23 sequential awaits** (progress_service). p95 under load
    will hurt; nobody has load-tested since the pre-hardening baseline.

## MED-class (quality/credibility debt)

12. **Ownerless-session visibility:** anonymous callers can play any
    ownerless session by UUID (by design for demo, but it's security
    review finding #1 every time).
13. **Rate limiting:** none found on auth or solve endpoints. A script
    kid can hammer /solve for free LLM-free compute; with SEMANTIC_QA_LANE
    enabled it'd be free GPU time.
14. **Semantic lane default-OFF** is honest, but an investor will ask "so
    the fancy AI feature is disabled in production?" — the enable story
    (calibration + load test) needs to be a dated plan, not a maybe.
15. **Orphan routes still routable** (parent-portal has a layout) — dead
    surface area for review.
16. **No monitoring beyond a watchdog toast** — no uptime history, no error
    aggregation (client-error log goes to Postgres only), no alerting when
    the daemon dies overnight.
17. **Test-suite honesty:** the ~240 green are real but single-worker,
    single-process, no concurrency tests, no restart-recovery tests, no
    soak. The suite proves correctness, not durability.
18. **`ENHANCED_NODES_FAST_FINGERPRINT` stale-pickle trap** still exists —
    documented, worked around by hand twice today. One missed step at ship
    = stale content served silently.

## What survives scrutiny (for fairness, briefly)
Auth ownership enforcement on session submit/skip/end is real (403 on
foreign sessions). XP exactly-once ledger is real. The digest-guarded
content pipeline is genuinely load-bearing. Boundaries wall is enforced by
test. Backups run daily with a restore drill log. None of this offsets the
BREAKERs above for an investor — they offset them for a user.
