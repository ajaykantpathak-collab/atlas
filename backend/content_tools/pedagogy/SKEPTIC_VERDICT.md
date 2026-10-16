# THE SCEPTIC VERDICT — consolidated tear-down (3 investigators, 2026-10-06)

*Sources: SKEPTIC_COORD.md (architecture/ship, 18) + SKEPTIC_BACKEND.md
(backend/engine, 31) + SKEPTIC_PRODUCT.md (product/commercial, 26).
Deduplicated, ranked by "would kill the deal". 75 findings total.*

## DEALBREAKERS (12 — an investor walks on these alone)

**Revenue & launch mechanics**
1. The paywall does not exist — `is_premium` is never set True anywhere;
   entitlements activate nothing; the 3-missions/day free limit has zero
   callers. Paying unlocks nothing. [S2]
2. Measured uptime 14.8% — the watchdog's own health_log: 91/613 probes up
   since Oct 3; Oct 5 had ZERO up-probes all day. [S2]
3. No AAB — gradlew can't build on this machine; store track can't start;
   the "store app" is a WebView shell with self-documented
   Minimum-Functionality risk. [S2+S1]
4. Load evidence is fictional — load_baseline.json is an all-zeros
   placeholder; the post-ship loadgen never ran; stack already OOM-killed
   at 4 workers. [S1]
5. Committed secrets — placeholder JWT secret in deploy/.env; compose
   hardcodes default DB passwords; compliance password in source. [S1]
6. Teacher suite can't onboard a real class — no create-class or
   enroll-student endpoint; real teachers see "No classes assigned yet"
   forever while the landing page sells it as a pillar. [S2]

**Trust & safety**
7. Unauthenticated solver DoS — /solve absent from rate limits; solve pool
   can't cancel sympy ("tens of minutes" per its own docstring); 8 crafted
   questions saturate solving for everyone. [S1]
8. Tutor WebSocket has zero auth — client-supplied user_id, free LLM spend
   on platform keys, bypasses rate limiters and the scrub. [S1]
9. Practice isolation best-effort — anonymous read/submit/end on any
   session by id; /review/{student_id} has no auth; shared demo row pools
   all anonymous identities. [S1+S2]
10. CI tests the wrong tree — pytest runs on root dev copy; production
    ships deploy/backend; solver test trees have diverged; 4,106
    uncommitted changes. Green CI certifies code that doesn't ship. [S1]
11. No DPDP parental-consent field anywhere in signup — a minors' product. [S2]
12. Verified-rate measured on 0.7% of the bank; ROUTER_TIME_BUDGET differs
    between tests (60s) and prod (5s) — the certified number isn't the
    production number. [COORD+S1]

## HIGH (17 — material, ordered)
- Backups are theater-adjacent: daily runs exist but today's dumps are 0
  bytes (daemon down), "verified" as 0=0, no offsite copy. [S2]
- Hosting: daemon died 7× today; 15-25 min boots; pagefile+vhdx on HDD. [COORD+S2]
- Worker-local state with 2 gunicorn workers (_MEM_SESSIONS, mastery
  singletons): fallback sessions 404 cross-worker; unbounded growth. [COORD+S1]
- Zero row locking: parallel submits race session state. [COORD]
- Mastery dual-writes (ORM + asyncpg paths) with no reconciliation. [S1]
- Replay submits advance session counters unguarded. [S1]
- answer_memo JSON rewritten non-atomically by 2 workers. [S1]
- Semantic lane: default OFF; when ON, context-blind (cross-class serves
  possible); calibrated on n≈106. [S1]
- Paying-parent UX: payments configured:false is the only state that has
  ever existed. [S2]
- Parent linking needs the child's internal UUID no surface displays;
  4 parent portals + 2 contradicting role-redirect maps. [S2]
- Demo-account button mints a token the backend rejects (ghost session). [S2]
- Qdrant health probe blocks the event loop synchronously. [S1]
- Redis decorative; dashboard = 23 sequential awaits; no load test. [COORD]
- ~20% of CBSE corpus (Hindi lane incl. c9_hin_ga word salad) unusable
  for a real demographic; CISCE sims 9.4%, ISC 0%, while copy sells
  "CBSE & CISCE 6-12". [S2]
- ICSE GST node teaches the ABOLISHED slabs — factual error in board
  content. [S2]
- GUIDED refusal ships the same 4 generic steps for every subject. [S2]
- localStorage refresh token, no rotation invalidation. [COORD]

## MED (selected)
- Socratic teacher: 20 families/~40 Q&As across 11,009 CBSE nodes — depth
  is a seed, not a feature. [S2]
- /exam and /offline hard-locked contradicting the pricing FAQ. [S2]
- Orphan routes routable; no monitoring/error aggregation; stale-pickle
  trap manual; no concurrency/restart/soak tests; client-error log only
  in Postgres; the 14-day plan assumes uptime the platform has never
  demonstrated.

## THE INVESTOR'S ONE-LINE VERDICT
"The pedagogy engine is genuinely differentiated (verified-or-refused
determinism, misconception-driven Socratic loop, digest-guarded authored
corpus) — but the product cannot take money, cannot stay up, cannot pass a
security review, and has never been load-tested. Come back when uptime is
measured in weeks, the paywall exists, and the store build is real."

## FIX ORDER (what I'd do, ranked by unblock value)
1. Pagefile→SSD + one calm ship (everything else is staged) → uptime.
2. Paywall + teacher class-onboarding (the two missing features).
3. Auth wall: /solve rate limit, tutor WS auth, /review auth, demo-row
   isolation, secrets rotation.
4. Load test (real) + sweep sharding to 100% bank coverage.
5. AAB build + DPDP consent field + CI-on-deploy-tree fix.
6. Then the pedagogy design build (relaunch the 2 pedagogy agents).
