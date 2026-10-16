# COUNCIL FINAL VERDICT — the merged build order
*All 6 council voices: Pragmatist (launch), Skeptic (claims audit), Scientist (methods), Pedagogy (classroom), Parent (trust/retention), Student (the 15-minute truth). This document merges their agreements, contradictions, and the corrected build order. Owner go/no-go required.*

---

## THE VERDICT IN ONE PARAGRAPH

The engine's bones are certified (12/12 browser flows, 25/27 subjects, 69% deterministic serve-rate, fail-closed contract holds) — but the council found what no engineering metric would: a **trust-killer class of user-facing defects** (practice grades the wrong question; machine language on student screens; Hindi choice forgotten; correct answers marked wrong), one **live wrong-answer hole** (role-permuted digits pass the semantic guard today), and a **launch vehicle that fails before the engine is tested** (HDD-hosted stack, cold-start first impressions, no re-engagement channel). The corrected priority: **stop the trust-killers first, ship the pending batch, launch the closed test — then build the recompute engine the council designed.**

---

## P0 — TRUST-KILLERS (every voice, day 0-1, before any tester)

| # | Defect | Found by | Fix |
|---|---|---|---|
| 1 | **Practice grades the wrong question** — feedback describes a triangle when the student answered dice; correct answers marked wrong; checkup "couldn't save" | STUDENT (fatal) | Root-cause the session question-keying instability between submit and grade; add an integration test that asserts feedback.question == displayed.question |
| 2 | **Semantic lane wrong-answer mode** — role-permuted digits ("15% of 200" vs "200% of 15") pass the subset guard and ship as VERIFIED; word-mutated twins pass too | SKEPTIC (file:line) + SCIENTIST (live hole) | `SEMANTIC_QA_LANE` default OFF; word-twin mitigation (qtype + subject/class agreement gates); ship only behind the load gate |
| 3 | **Junk graded correct** — free-text garbage passed 2/3 | CERT §7.8 + STUDENT | Strict junk detection on the short-answer path; honest "unverified" framing |
| 4 | **Machine language on student screens** — "Needs variable binding (Lane C)", "UNLOCKS NEXT: c6_math_ch03_040", raw LaTeX `\triangle ABC`, "Mastery: NaN%", "11.232899999999999%" | STUDENT | One render/scrub pass: internal messages → student words; KaTeX render or data scrub; float rounding to integers; NaN guards |
| 5 | **Ship-state reconciliation** — the cross-subject fix, health fix, and lane code exist in source but containers run older code; nobody owned verifying it | SKEPTIC #0 + PRAGMATIST day-0 | One batched ship: all changed files + manifest regen + one restart per backend; docker-exec transcript proves containers match source |

## P1 — THE 14-DAY TEST MAKERS (day 1-3)

| # | Item | Source | Fix |
|---|---|---|---|
| 1 | **First-session cold start** — 8s client abort + idle-evening backends = "Kuch gadbad" on every tester's first night | PRAGMATIST risk #2 + STUDENT (10.8s first load) | Boot preload verified + 20s client timeout + one auto-retry + "preparing your session" state |
| 2 | **Disk** — Docker vhdx + pagefile both on the 7200rpm HDD | PRAGMATIST + PERF | vhdx + pagefile to NVMe/SSD (owner admin click); NVMe upgrade option ₹4-6k |
| 3 | **No re-engagement** — no FCM exists; testers ghost by day 4 | PRAGMATIST + PARENT | WhatsApp daily nudge via the existing service + the digest (below); FCM is post-test |
| 4 | **Dead subjects at onboarding** — commstud/econapp 503, 7 subjects with 0 checkup items | PRAGMATIST + STUDENT | Hide zero-bank subjects from the picker for the test (owner decision documented) |
| 5 | **Nav dead ends** — Check-up tab 404s (real page at /diagnostic); /games, /sims 404 | STUDENT | Point the tab at the real route; route or remove the dead links |
| 6 | **Hindi doesn't persist** — onboarding हिंदी → all-English dashboard | STUDENT + PEDAGOGY #5 + PARENT | Persist the choice app-wide; translate the bottom nav; this is the floor for the struggling segment |

## P2 — THE LAUNCH-KILLER BUILDS (week 1, per the merged plan)

1. **Telemetry day** (PRAGMATIST: "the actual deliverable of the test"): per-answer truth label + derived llm_used (INCORP's find — hardcoding it would fake the zero-LLM proof) + refusal log + routing-miss log + thin-chapter counter. Without this, 14 days produce opinions, not data.
2. **WhatsApp digest for real** (PARENT #2 + PRAGMATIST): one weekly message — today's one line, attempt-before-answer rate, school-test trend, renewal notice inside it. The transport exists.
3. **The School-Test Loop** (PARENT #1 — the highest-value feature named by the council): photo the school paper → error map in parent language → repair mission → next-test correlation. Engine parts all exist; the parent-facing loop is the build.
4. **Board answer-writing limb** (PEDAGOGY #1): one timed 3-mark + 5-mark written answer per subject per week, examiner-graded on marking points, presentation habits taught. The engine exists (marking points + CopyWorthy diff).
5. **Repair cap** (PEDAGOGY #2): never more than ~2 repair items or ~25% of a session; every day contains one win from the current chapter. A 35% child on a 40-topic chain quits.
6. **Strict free-text + MCQ backfill** — verify container state first (INCORP: backfill exists in source).

## DEFERRED — post-test, telemetry-driven (the council's cuts, adopted)

- **Solver synthesis mining** — CUT pre-launch (SKEPTIC F5: induced formulas into a VERIFIED registry attack the trust contract; PRAGMATIST: no demand signal yet). Post-test: hand-mine only the top-5 families telemetry names. Clustering stays as an analysis artifact feeding the recompute lane.
- **spaCy router** — DEMOTED (SKEPTIC: the trained model is bad, F=0.57; SCIENTIST: subject is a function of the routed family). Post-test: TF-IDF + linear baseline on real miss logs if miss-rate >15%; spaCy NER for quantity extraction when the recompute lane is built. The 218k corpus is preserved — it's the training asset.
- **Humanities scaffold engine** — DEFER (no documented user-visible failure; theory_rubric.py has zero production callers). Revisit if tester data shows humanities drop-off.
- **Variable-masked recompute** — PARKED pending the council-designed pipeline (SCIENTIST's skeleton-first architecture: symmetric masking at index+query, skeleton-hash clustering, per-cluster program induction verified by leave-one-out re-execution, ≥98% precision gate or it downgrades to guided). Reported as "NOT MET, measured" until proven.
- **Full-bank sweep** — runs on a NON-HOST machine in nightly windows (SKEPTIC: it crashed at row 100 on the host, MemoryError; PRAGMATIST: forbidden during the test). The stratified sample already gives ±1-2% per-subject confidence.

## PEDAGOGY ADOPTIONS (into LEARNING_DESIGN v2)

1. Board answer-writing weekly limb (above)
2. Repair cap + teach-forward (above)
3. PYQ ladders: chapterwise last-10-year questions tagged with year, at the end of every node's TRY ladder
4. The revision artifact: OWN state compiles the child's own repairs/steps/marking points into a one-pager per chapter — the exam-eve ritual, built from retrieval
5. Teacher assign/print/group: push check-ups to a class, print Friday's repair slip as a 10-question slip, group children by shared misconception ("six children share the sign-flip trap — sit them together Tuesday"), teacher can pin priorities
6. Parent: school-test loop (above) + the dinner-table teach question + "Atlas gives the phone back" session-end ritual + never a bare mastery % without its trend
7. Topper honesty: Atlas owns the verified doubt, the PYQ ladder, and the misconception hunt — not the coaching main course; say it in the design
8. Board Barometer: parent-only, delta-framed, never shown to low-band students as a static %

## WHAT THE COUNCIL CONFIRMED AS STRONG (protect these)

- The fail-closed contract (verified-or-refused — SKEPTIC verified the bank repair and gates in code)
- The repair-first instinct, rescue card, kind failure tone (STUDENT: "the scaffolds actually taught")
- Lumen, the galaxy, streak copy, diagnostic framing (STUDENT: "magic", "a friend")
- The anti-scariness contract (PEDAGOGY: "closer to how a good teacher treats a weak child than anything in PW or Gauth")
- The two-stage retrieval as RECALL (SCIENTIST: right architecture, wrong decision layer)
- Ops: nightly backups + proven restore + SSD second copy + watchdog self-heal

## THE BUILD ORDER (merged, sequenced)

**Day 0-1 (P0):** ship-state reconciliation ship (all files + manifest + one restart per backend) + trust-killer fixes 1, 3, 4 + semantic lane default OFF + word-twin gates
**Day 1-3 (P1):** cold-start hardening + nav fixes + Hindi persistence + disk move (owner click) + WhatsApp digest v1 + subject hygiene
**Day 3-5 (P2):** telemetry day + School-Test Loop v1 + board answer-writing limb + repair cap + Play bundle submission (review wait = free calendar)
**Day 5-14:** the closed test — daily WhatsApp, telemetry triage, fix what real users hit
**Post-test:** skeleton recompute lane (SCIENTIST's design, ≥98% precision gate) + solver synthesis on telemetry-named families + TF-IDF router shadow + full sweep on non-host

## WHAT "COMPLETE" MEANS NOW (the council's definition)

Engine 10/10 = the 8 criteria, certified by the sweeps (2 verified, 2 in flight, 2 gated with honest NOT-MET reports, router demoted).
App 10/10 = a struggling student finishes their 15 minutes with zero quit-points and one real understanding moment; a parent renews because the school test went up; a teacher assigns Friday's slip from the repair queue. That is measured by the 14-day test, not by us.
