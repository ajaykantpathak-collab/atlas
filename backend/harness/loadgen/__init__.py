"""backend.harness.loadgen — asyncio load harness (Phase B, A5-HARDENING).

Measures the real student-facing surface of the platform:

  70%  content GETs      /api/content/nodes/{id} (+enrichment, +questions)
                         and /doodle_cards/class{N}/{id}.webp page assets
  15%  solve POSTs       POST /api/practice/deterministic/solve
                         (20 real corpus questions: numeric, bank-hit
                         English/history, prose)
  10%  tutor reply flow  signup/login probe -> POST /api/tutor/sessions
                         -> POST /api/tutor/sessions/{id}/reply
   5%  auth/progress     GET /api/auth/me, /api/progress/overview,
                         /api/progress/dashboard

Entry point (post-ship, run by the coordinator against the live stack):

  python -m backend.harness.loadgen.run --base http://localhost \
      --ramp 50 --seconds 600 --json backend/harness/load_baseline.json

Only stdlib + httpx — no app imports, so the generator can never load the
very code it is measuring.
"""
