# W5 Report — CISCE Classes 6–10 (ICSE) content-depth wave

Agent: CONTENT-W5 · Date: 2026-10-05 · Zero Docker, zero Postgres, zero LLM
authoring (all fixes deterministic tooling + hand-written English).

## Lane

`deploy/content/cisce_nodes_v2`, files `c6..c10 *_icse_*.md`.

| Class | Total | Parked (hin+eng) | Actionable | Pass after wave |
|---|---|---|---|---|
| c6 | 557 | 34 | 523 | 523/523 |
| c7 | 587 | 35 | 552 | 552/552 |
| c8 | 607 | 50 | 557 | 557/557 |
| c9 | 916 | 143 | 773 | 773/773 |
| c10 | 1,141 | 301 | 840 | 840/840 |
| **lane** | **3,808** | **563** | **3,245** | **3,245 (100%)** |

Format findings: the CISCE corpus uses the same `## SECTION` scheme as CBSE
but two legal local conventions, both preserved: scope sections are written
`Covered: … / NOT covered: …` (not CBSE's `TEACH:`/`DO NOT TEACH:`), and
worked examples use `**Problem:**/**Solution:**/**Answer:**` (title case).
The scanner accepts both; format was never flattened to CBSE style.

## 10/10 rubric — min-viable pass before → after (actionable nodes)

| Gate | Before | After |
|---|---|---|
| R1 DEFINITION ≥40w | 3,245 | 3,245 |
| R2 WALKTHROUGH ≥150w | 3,235 | 3,245 |
| R3 ELI5 genuine | 3,244 | 3,245 |
| R4 DIAGNOSTICS ≥2 with keys | 3,245 | 3,245 |
| R5 ≥1 worked example | 3,245* | 3,245 |
| R6 MISCONCEPTION note | 3,245 | 3,245 |
| R7 SCOPE present | 3,245* | 3,245 |
| R8 HYGIENE (no raw LaTeX/$…$/NaN-in-prose/mojibake/long floats) | 3,080 | 3,245 |

\* initial scan showed inflated numbers due to checker miscalibration (below);
adjudicated by hand-reading samples before any fix.

Corpus averages after: definition 231 w, walkthrough 379 w, ELI5 78 w,
11 diagnostic questions/node, ≥2 worked examples in 100% of nodes.

## Gap adjudication (what was real vs checker false positive)

- **R8 raw LaTeX — REAL, the big one.** 170 files (143 bare commands + 18
  `$…$` delimited + overlap) carried LaTeX that reaches students verbatim:
  the learn page renders corpus bodies through `AuthoredText`
  (verbatim, no KaTeX; `MathText` is used only for titles/formulas). ~15,000
  occurrences, concentrated in c9/c10 math/phy/chem (board years).
- **R7 scope — checker FP.** All 70 flags were the CISCE `Covered/NOT
  covered` convention; content was substantive. Scanner taught the convention.
- **R5 worked examples — mostly FP.** 23 word-based flags were complete
  step-by-step examples compressed by math notation; a structural check was
  added instead (markers any-case, or a visible derivation chain) — catches
  genuine stubs, ignores marker style.
- **NaN — FP in CS subjects.** 10 compapp files teach `Double.NaN` /
  `Math.sqrt(-1)` as ICSE Java syllabus content; NaN is banned as a solver-
  output leak (slop_gate), not as course vocabulary. Check now skips code
  spans and CS subjects.
- **R2 walkthrough <150 w — REAL (10 files, all c10).** Extended by hand.
- **R3 ELI5 machine-voice — REAL (1 file).** `c10_phy_icse_06_008` opened
  "This node serves as a comprehensive toolkit…"; rewritten as a genuine
  popcorn-analogy ELI5 in second person.

## Fixes applied

1. **LaTeX → Unicode scrub** (`wave2/w5_latex_scrub.py`): deterministic
   transcoder following the platform convention (CBSE corpus carries zero
   LaTeX; slop_gate normalises LaTeX→Unicode). Handles `\frac/\sqrt` (nested,
   brace-less args), Greek, operators, super/subscripts (with a prose guard:
   `MARKING_POINTS` untouched, `F_b` → F_(b) context rules), matrix/cases
   environments → `(rows ; cols)` plain-text form, delimiters stripped, and
   code-fence / indented-code / inline-backtick protection (Java
   `split("\\s+")` strings verified intact; Windows paths `C:\…` whitelisted).
   170 files rewritten; zero leftovers on post-check.
2. **Authoring pass** (`wave2/w5_authoring_apply.py`): 10 c10 walkthroughs
   deepened 106–147 w → 237–275 w (original text preserved by construction;
   three files additionally de-mechanised: repeated "Supporting this," / the
   duplicated relay bullet) and 1 ELI5 rewritten. Every append carries an
   ICSE exam takeaway (mark-scheme structure, confusable-pair distinctions,
   board-question patterns; facts checked: 44th Amendment, FAME II, E-Waste
   Rules, Zn/Al NH₄OH discrimination, RBI band, PEEL, 1885 Congress anchors).
3. **Safety:** pre-edit backups (`wave2/backups/W5_latex/` = 170 files,
   `wave2/backups/W5_authoring/` = 11), digest-guard over non-edited text,
   backup read-back + write-back verification per file (both runs exited
   clean). One real bug was caught by this discipline mid-wave (header
   `\s*$` regex swallowed the newline after `## WALKTHROUGH`), repaired by
   restoring from backup and re-applying with a fixed anchor; corpus-wide
   glued-header grep = 0.
4. **Scanner** (`wave2/scan_w5_cisce.py`, adapted from CBSE
   `scan_depth_v2.py`): full lane rubric scanner; outputs `w5_scores.jsonl`
   (3,808 rows) and `w5_gaps.json` (0 after).

## Parked families (measured, untouched — owner decision 2026-09-29)

563 files (`*_hin_icse_*` 278, `*_eng_icse_*` 285):

- **hin:** 60 below min-viable — c10_hin 31 (28 missing worked-example
  structure, 4 short walkthroughs), c6_hin 18 (scope bodies without any
  Covered/TEACH markers), c7_hin 5, c8_hin 5, c9_hin 1 (all R5 structure).
  Definitions/walkthroughs are otherwise deep (min def 72 w, min walk 134 w).
- **eng:** 4 below min-viable — all c10_eng walkthroughs 98–149 w.
- No hygiene violations in either family.

## What is still missing for a true 10/10 (honesty section)

1. **Walkthrough "exam takeaway" density:** 1,542/3,245 (47.5%) contain an
   explicit exam/board/marks signal in the walkthrough; the rest teach to
   depth without a literal takeaway line. Min-viable is met everywhere; the
   100%-explicit-takeaway bar needs another authored pass, not tooling.
2. **Parked families (64 nodes below min-viable)** stay as measured per
   owner decision; relaunching that work needs an owner go.
3. **Master-copy sync:** AGENTS.md says the master-copy rule applies to
   `cisce_nodes_v2`, but no file-level master mirror exists (Desktop/cisce is
   a planning workspace). The 181 mutated files exist only in deploy/ +
   `wave2/backups/`. Coordinator decision needed: establish/sync a CISCE
   master copy.
4. **Render verification:** the unicode math renders correctly as plain text
   by construction, but an end-to-end ICE visual pass (`npm run verify` /
   Reticle flows) of a scrubbed c10 math node on :3001 was not run here
   (zero-Docker mandate; FE surface unchanged).
5. **Content reload:** files are bind-mounted (`/app/content`), but the
   enrichment index / fingerprint cache rules mean the coordinator should
   treat this wave like any corpus rewrite (stale-cache trap on same-count
   fingerprints) at the next ship window.

## Artifacts

- Scanner: `deploy/backend/content_tools/wave2/scan_w5_cisce.py`
- Scrubber: `deploy/backend/content_tools/wave2/w5_latex_scrub.py`
- Authoring: `deploy/backend/content_tools/wave2/w5_authoring_apply.py`
- Scores: `deploy/backend/content_tools/wave2/w5_scores.jsonl`,
  `w5_gaps.json` (empty = green)
- Backups: `deploy/backend/content_tools/wave2/backups/W5_latex/` (170),
  `…/backups/W5_authoring/` (11)
- Audit helpers: `w5_latex_audit.py`, `w5_leftover_audit.py`,
  `w5_preservation_check.py`, `w5_report_stats.py`, `w5_inspect.py`,
  `w5_probe*.py`
