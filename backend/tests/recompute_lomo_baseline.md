# LOMO Recompute-Accuracy Baseline (C8 gate)

- Generated: 2026-10-05 20:39:31
- Bank source: **dump** -- nightly dump snapshot: D:\platform\backups\dream_app_20260920_0330.sql.zip (dream_app_20260920_0330.sql, built 2026-10-05 07:42:50)
  - The production stack was DOWN while this harness ran (watchdog: 99 consecutive down checks; docker VM stopped) and this agent is barred from Docker commands -- the nightly dump snapshot is the honest reachable bank. Its date is stamped above; rows added after it are not measured.
- Method: family identified on the train member via the production registry sweep + red-team guards + release gate (autobind lane as fallback); every other eligible member is a held-out recompute trial (Tier C: the row itself).
- Precision rule: matches / shipped (guard refusals, family non-matches, structure drift and no-numeric results are NOT shipped: coverage losses, never precision hits).
- C8 bar: **precision >= 98%** per family.

## Headline

**0.0% weighted recompute precision across 0 families** (0/0 shipped held-out recomputes matched the stored key; registry families only: 0.0% over 0 shipped).

- Held-out trials: 0 (exact-skeleton clusters: 0, relaxed template clusters: 0, singleton fixtures: 0)
- Clusters with >=3 members and no matching family: 15; singleton numeric rows with no matching family: 5,669 (honest non-coverage; no family to gate)
- Caveat: 0 trials used a multi-part stored key ("X = a; Y = b"), unscoreable against a single numeric recompute; 0 of the mismatches are these -- they inflate the mismatch count but no single-value lane could ever serve them.

## Clustering yield (an honest finding about the bank)

- Clusters with >=3 members formed from 89,257 scanned rows: exact-skeleton 15 eligible 15 (+0 low-eligible).
- The 2026-09-20 bank snapshot is authored **one question per node**: same-template numeric clusters are essentially absent, so SCIENTIST's 'unlimited verified fixtures from clusters' premise does not hold on this bank. The measurement therefore rests on Tier-C singleton fixtures (each numeric-key row is its own held-out recompute trial; the family program is fixed, hand-coded and never fitted to the row). Cluster-consistency signals (train-vs-member template agreement) exist only for the tiny Tier-A/B fixture set and are included where available.

## Per-family table (sorted by accuracy x coverage)

| family (registry fn) | kind | clusters | held-out members | shipped | matches | precision | coverage | median ms | top failure modes |
|---|---|---|---|---|---|---|---|---|---|

## The 98% bar (verdicts per registry family)

The C8 lane enables a family as a unit, so verdicts are per owning registry fn (dispatcher sub-structures merged; autobind gates stand alone). Families with >= 30 shipped recomputes get a verdict; smaller ones are listed as insufficient fixtures.

**AT OR ABOVE the 98% bar (C8 lane may enable):**

- none

**BELOW the 98% bar (C8 lane must NOT enable):**

- none

## Mismatch samples (first 3 per family)

## How to resume / re-report

```
cd D:\platform\deploy\backend
python tests\recompute_lomo_harness.py --resume
python tests\recompute_lomo_harness.py --report
```
