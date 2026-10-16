# ATLAS RCA PROMPT — why did fix-batch v1 partially fail? (1 agent, read-only)

Mission: root-cause every v1 failure mode so v2 doesn't repeat them.
Deliverable: `_work/fix_2026_10_15/RCA.md`. Evidence-first: every claim
cites file:line, log path, or a pasted command output. No fixes applied.

## Questions to answer, in order

1. **F2 (solver truth) — claimed everything, fixed nothing on the ledger.**
   Code artifacts exist (`tests/corpus/test_COR-000002..011`,
   `test_fixf2_solver_truth.py`, `f2/repro_after.json`, `floor_margins.json`).
   Determine: did the solver code changes actually land in `deploy/backend/its/**`?
   Do the pinned checks pass natively (LLM off)? If green → the failure is
   bookkeeping (no retag/report), not engineering. If red/incomplete → what
   exactly is missing and what blocked it (timebox? outage? complexity of
   the similarity floor?).
2. **F4 — files landed, zero retags.** Confirm each artifact on disk
   (compose limits, preroute guard + test, off-host wiring, runbook, pins)
   and check its test passes. Same bookkeeping-vs-engineering verdict.
3. **F6 — never dispatched.** No AFTER.md exists. From the coordinator
   trail (BUGS.md timestamps, file mtimes), establish why the verification
   gate never ran: sequence/timeout, or the outage eating the window?
4. **The outage — the biggest failure.** Docker daemon died ~20:35
   2026-10-15 (npipe gone), taking prod :80 + postgres down; FE survived
   (native). Reconstruct the timeline from logs/mtimes: what was running
   when it died (2 factory python workers at 7698s CPU-sec, a 3.1GB dev
   warm, F5's duplicate dev boot killed 20:25)? Root-cause hypotheses
   ranked with evidence: Docker Desktop resource starvation / vmmem crash /
   Windows update / manual close. Estimate blast radius: what was lost
   (in-flight containers state? data? — postgres volume is bind-mounted,
   verify intact once daemon returns).
5. **The audit's own false positives (process learning).** v1 disproved 2
   audit findings: onboarding CTA (advances fine — probe looked for wrong
   button text) and API drift 404s (bare-path probes; real FE callers match
   mounted routes). Also F5 found the "0 accountancy chapters" was a
   stale-container issue, and the bank metatext was 6,609 rows not 1. For
   each: what probe design flaw caused it, and what one-line rule prevents
   recurrence (e.g., "probe routes with required params", "verify container
   version before judging the tree").
6. **Coordination failures.** Handoffs dropped on the floor (clickhouse
   secret F1→F5, c1 bar F5→F3): why did no lane pick them up? Unclaimed
   pre-staged work ("guard pre-staged in tree at 17:50 by an unclaimed
   session") — who did that and does anything else in the tree lack provenance?

## Output format (RCA.md)
Table per failure: Symptom / Root cause (proximate + systemic) / Evidence /
Did it corrupt anything? / v2 prevention (one line each).
End with the 3 systemic fixes that would have saved the batch, ranked.
