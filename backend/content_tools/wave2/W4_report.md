# W4 Report — CBSE Classes 11–12 Lane (content wave 2)

**Agent:** CONTENT-W4 · **Date:** 2026-10-05 · **Lane:** `deploy/content/enhanced_nodes_md` files `c11_*_cbse_*` and `c12_*_cbse_*`, excluding `_comp` (7,146 files = 4,669 actionable + 2,477 parked).
**Scanner:** `wave2/scan_lane_w4.py` — reuses the house core (`scan_depth_v2.parse_sections/depth_metrics`) and adopts the **exact W3 rubric convention** (`scan_w3_rubric.py`) so cross-wave numbers are comparable.
**Rules honoured:** zero Docker, zero Postgres, zero LLM authoring (all text hand-written), house appliers with digest-guard discipline, backups before every mutation, parked lanes (`eng`, `hin`, `gram`, `engl`) measured and never edited.

---

## 1. The 10/10 rubric and how it was scored

R1 DEFINITION ≥40 words, no filler opener, no raw LaTeX · R2 WALKTHROUGH ≥150 words AND worked/derivation step AND exam takeaway · R3 ELI5 ≥15 words · R4 ≥2 diagnostics with answer keys · R5 ≥1 worked example · R6 misconception ≥10 words · R7 scope ≥5 words · R8 prose hygiene (no node-IDs, no banned strings, no raw LaTeX in student-read sections; meta sections SCOPE/CHAIN/PREREQ/FORWARD/CROSS are accepted-by-design id carriers per AGENTS.md 2026-09-29).

**Baseline (before the wave, full lane scored 100%):**

| | actionable c11+c12 |
|---|---|
| 8/8 | 1,006 |
| 7/8 | 2,132 |
| 6/8 | 1,469 |
| 5/8 | 62 |
| thin ≥10 (house metric) | **0** |

Misses by criterion: **R2 2,707 · R8 2,072 · R1 475 · R3 2** — R4/R5/R6/R7 had **zero** misses lane-wide (previous waves and the build pipeline had already covered structure; the corpus has no empty-section stubs).

**After the wave (final re-scan):**

| | actionable c11+c12 |
|---|---|
| 8/8 | **1,309** (+303) |
| 7/8 | 2,303 |
| 6/8 | 1,057 |
| 5/8 | **0** |

Misses by criterion: **R2 2,514 · R8 1,903 · R1 0 · R3 0** — R4/R5/R6/R7 still zero.

Parked lanes: 2,477 nodes scored both times (24 remain thin ≥10 — unchanged, untouched, per the 2026-09-29 owner decision; relaunching them requires an owner go).

## 2. What was fixed (975 unique files, every edit backed up)

| Work item | Files | How |
|---|---|---|
| **R8: raw LaTeX removed from all prose** (learn page renders definition/walkthrough/eli5/misconception/diagnostics/worked-examples via `AuthoredText.tsx` with **no math renderer**; LaTeX reached students as literal `\(\frac{a}{b}\)` and leaked into TTS) | **355** (auto, digest/revert-guarded de-LaTeX converter, `wave2/delatex_w4.py`) + 3 hand | `\(...\)`/`$...$` unwrapped, `\frac`→`(a)/(b)`, `\times`→×, `^{\circ}`→°, `\begin{cases}`→"…if…; …if…", matrices→`[a b; c d]`, ℝ ℚ ℤ ℕ, symbol tables; unit-tested on real corpus fragments (`test_delatex_w4.py`); currency `$50,000`/`₹83/$` spans deliberately preserved (verified 0 real LaTeX left: `check_truly_w4.py`) |
| **R1: definitions** (207 short, 10 filler-opener, 1 latex) | **218** | hand-authored to 55–110 words in NCERT register, 10 subject batches (`wave2/authoring/w4_batch01..T2`), applied via the house `apply_content_depth.py` (digest-guarded) |
| **R2 tier A: walkthroughs under 150 words** (geo 172, hist 101, cs 100, biotech 6) | **379** | hand-authored per-node appends (~60–95 words each): a concrete worked check/case + an exam-takeaway sentence; 16 batches |
| **R2 tier C: walkthroughs missing the exam takeaway** | **53** | hand-authored takeaway appends ("For the board examination, …") |
| **R3: broken/truncated ELI5** (13 and 7 words) | **2** | complete genuine ELI5s written |
| **Slop phrases** (owner ban list) | **4 files** | "This node covers…" definitions rewritten (2), "variable binding"→"name binding / how variables bind to values" (3 occurrences, exact-replace, guarded) |

**Authored-text hygiene:** 656 authored texts scanned — 0 banned strings, 0 node-IDs, 0 raw LaTeX (`verify_w4.py` §4).

## 3. What was measured and deliberately NOT edited (with evidence)

- **Node-IDs inside prose (1,750–1,903 files in the R8 count).** The learn page renders all corpus prose through `components/learn/AuthoredText.tsx`, which intercepts every id (`c\d+_…`) and displays `nodeRefLabel()` — "Raw node ids must never reach the screen" — and `PrereqFixList.tsx` turns the same ids into review **links**. Under the owner decision of 2026-09-29 (ids travel as opaque fetch keys; the ban is on *visible* ids), these refs are **sanctioned by design**. Mass-stripping ~3,900 id tokens would churn ~1,800 files and destroy working remediation links. Decision: measured, scored per the W3 convention, **not edited**. The count is therefore a scanner-level flag, not a student-facing failure.
- **Currency `$…$` spans (136 files still flagged by the naive LATEX_RE).** Verified zero real LaTeX: the spans are USD amounts (`$50,000 … ₹83/$`) that must stay. The authoritative masked check (`check_truly_w4.py`) reports **0** files with real LaTeX.
- **The word "placeholder" (33 files).** Every hit is legitimate English in context — "a temporary placeholder for the trial-balance difference" (accountancy), "parameters act as placeholders" (CS/IP teaching HTML and SQL), "a placeholder zero by 300 BCE" (history). The ban targets stub slop; rewriting correct pedagogy to dodge a substring would damage content. My own authored text uses none of the banned words.

## 4. The honest gap report — what is still missing for 10/10 and why

**3,360 actionable nodes remain below 8/8**, every one for one of three reasons:

1. **R2 step-leg heuristic (2,514 nodes, 6/8).** These all have ≥150-word walkthroughs AND an exam takeaway, but contain none of the strict markers `= ≥ ≤ → Step-n Example hence therefore substitut derivation solving`. A 12-file random sample across 12 subjects found **12/12 with concrete worked content** (figures, worked cases, classification drills) that the equation-centric regex cannot see — e.g. accountancy classification drills with ₹ figures, history questions worked through sources. Substantively these are taught walkthroughs; by the strict letter of the heuristic they fail. **Remedy if the owner wants literal 8/8:** either (a) a marker-normalisation wave appending explicit "Step:" scaffolding to ~2,500 walkthroughs (mechanical but risks template spam), or (b) a content-type-aware step detector (STEM: equation required; humanities: numeric worked case accepted) agreed across wave agents so the rubric measures pedagogy rather than punctuation. I did not unilaterally rewrite the shared rubric mid-wave.
2. **R8 id-refs in prose (~1,750 nodes).** Sanctioned-by-design (Section 3). Becomes actionable only if the owner rules that corpus-side prose must be id-free even though the display layer sanitises it — then a title-map substitution pass is needed, ideally corpus-wide across all lanes in one decision, not per-lane.
3. **Scanner false positives (≤171 nodes):** currency `$…$` spans and the legit-English "placeholder" hits above. These need no content change — only the shared scanner's LATEX_RE and BANNED check refined (word-boundary already fixed for the applier; the naive scanners of all wave agents still over-count).

**Also measured, not fixed (owner-parked):** `eng`/`hin`/`gram`/`engl` lanes — 2,477 nodes, 24 still thin ≥10. Untouched.

## 5. Verification (evidence, not claims)

- **Parked lanes untouched:** 0 of 1,303 manifest edit entries belong to a parked subject; parked thin-10 count identical before/after (24).
- **Digest/revert guards:** the de-LaTeX tool refuses any write unless reverting the edited bodies reproduces the original bytes exactly (one guard bug — a boundary-newline attribution artifact — was found and fixed by strengthening the invariant to that exact revert-check); the house `apply_content_depth.py` digest-guard passed on all 44 authoring payloads (0 failures across 646 applies; 1 pre-apply refusal of "NaN" in a Pandas definition, correctly rephrased).
- **Spot-check backup-vs-current (6 files):** only prose sections (DEFINITION/WALKTHROUGH/ELI5/DIAGNOSTIC_*/WORKED_EXAMPLE_*/COMPETENCY_*/COMMON_MISCONCEPTION) differ; section sets and ordering byte-identical; no meta/graph section touched.
- **Backups:** every edited file copied before first edit — house dir `content_tools/backups/` (787 files incl. wave 1) and `wave2/backups_w4/` (356). The two spot-check files reported "no backup" in wave2 are present in the house dir.
- **Authored text:** 656 texts, zero banned strings / node-IDs / LaTeX.
- **Re-scan:** full-lane re-run of `scan_lane_w4.py` produced the AFTER table; per-node scores in `wave2/w4_lane_scores.jsonl`.

## 6. Artifacts

| File | Purpose |
|---|---|
| `wave2/scan_lane_w4.py` | lane scanner, W3-convention rubric, c11+c12, parked-aware |
| `wave2/w4_lane_scores.jsonl` | per-node rubric scores, full lane (7,146) — final state |
| `wave2/delatex_w4.py` + `test_delatex_w4.py` | guarded de-LaTeX pass + its unit tests |
| `wave2/worklists_w4.py`, `worklist_*.json`, `ws_*.jsonl` | worklists and authoring worksheets |
| `wave2/authoring/w4_batch*.json` + `authoring/w4_apply_manifest.jsonl` | 46 hand-authored payloads + per-file edit manifest (untouched-region digests) |
| `wave2/backups_w4/`, `content_tools/backups/` | pre-edit copies of every edited file |
| `wave2/verify_w4.py` | final verification battery (guards, slop scan, parked check, sampling) |
| `wave2/check_truly_w4.py` | authoritative residual-LaTeX check (0) |

## 7. Bottom line

**Lane scored 100%.** Every actionable node below rubric minimum was fixed worst-first: all 475 definitions, all 379 thin walkthroughs, all 53 missing takeaways, both broken ELI5s, all real slop, and — the lane's one genuinely student-damaging hygiene failure — every raw LaTeX expression in student-read prose (355 files + 3 hand). 975 files edited, all backed up, all guards green, parked lanes untouched.

**8/8 rose from 1,006 to 1,309 (+30%).** The remaining 3,360 below-perfect nodes are fully accounted for: 2,514 by an equation-centric step heuristic that a 12-file sample shows is stricter than the content (each documented with its remediation option), ~1,750 by display-sanctioned id refs, and ~171 by scanner false positives or legitimate English. Nothing actionable-and-genuine remains unaddressed; the three follow-ups above are owner decisions (rubric recalibration across wave agents, id-policy, scanner refinement), not agent work left undone.
