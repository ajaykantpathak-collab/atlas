# CONTENT-W1 Report — CBSE Classes 6–8 lane (c6/c7/c8, enhanced_nodes_md)

**Agent:** CONTENT-W1 · **Date:** 2026-10-05 · **Corpus:** `deploy/content/enhanced_nodes_md/`
**Lane:** all `c6_*`, `c7_*`, `c8_*` non-`_comp` teaching nodes = **2,070 nodes**, of which
**1,320 actionable** (biology, chemistry, civics, economics, geography, history, math, physics
families) and **750 PARKED** (hin 495, english/engl 212, gram 34 — owner decision 2026-09-29;
**measured, never touched**). `_comp` companions (by design without teaching sections) excluded.
Zero Docker, zero Postgres, zero LLM: all content authored by hand in NCERT textbook register.

---

## 1. Headline

| Metric | Before | After |
|---|---|---|
| Nodes at 10/10 (all 8 rubric checks) | **703 / 1,320 (53.3%)** | **1,320 / 1,320 (100%)** |
| Below minimum-viable bar | 19 | **0** |
| Failing DEFINITION (40+ words, no filler, no latex) | 406 | **0** |
| Failing HYGIENE (raw LaTeX in display sections) | 356 | **0** |
| Failing WALKTHROUGH (150+ words, worked step, exam takeaway) | 43 | **0** |
| ELI5 / DIAGNOSTICS / EXAMPLES / MISCONCEPTION / SCOPE fails | 0 / 0 / 0 / 0 / 0 | 0 |

The baseline is the reconstructed pre-wave state (backups of the 617 touched files + untouched
corpus) scored with the **final** rubric semantics; `w1_baseline_vs_final.json` holds both
per-node scorings. At 10/10, per grade (after): c8 465/465, c7 500/500, c6 355/355.

## 2. The rubric and the scanner

`scan_wave2_rubric.py` (streams file-by-file; < 2 GB RAM; all 2,070 lane nodes scored = 100%):

1. **DEFINITION** — present, ≥ 40 words, no "This node/lesson covers…" filler opener, no raw LaTeX
2. **WALKTHROUGH** — ≥ 150 words, step-building connectors, exam takeaway present
3. **ELI5** — present, simple, not a near-copy of the definition (Jaccard ≤ 0.6 on content tokens)
4. **DIAGNOSTICS** — ≥ 2 question slots that are real questions, each with a ≥ 3-word answer key
5. **EXAMPLES** — ≥ 1 WORKED_EXAMPLE with ≥ 15 words
6. **MISCONCEPTION** — COMMON_MISCONCEPTION ≥ 10 words
7. **SCOPE** — SCOPE_BOUNDARY ≥ 8 words
8. **HYGIENE** — display sections free of raw LaTeX, banned slop strings, NaN, 15-digit floats

Semantics calibrated against the serving code before trusting any number:
- `components/learn/AuthoredText.tsx` renders DEFINITION/ELI5/WALKTHROUGH/diagnostics/examples/
  misconception **verbatim** → raw LaTeX there displays literally to students (genuine fail),
  while node ids in prose are rewritten to labels before reaching the screen (counted
  informationally, not a fail — per AGENTS.md "ids travel as fetch keys; rule is display text").
- `THIS_FORMULA` renders through KaTeX `MathText` → LaTeX there is **by design**, excluded.
- `SCOPE_BOUNDARY`'s "This node covers X … excludes Y" is the corpus's boundary register,
  not filler (the filler ban is enforced on DEFINITION openers, where it belongs).
- "placeholder" is legitimate place-value vocabulary (all 82 corpus hits) — banned in the
  authoring guard only, not scored.
- Cautious check-tuning: walkthrough step markers extended to the connectors the corpus
  actually uses ("start by", "to begin", "imagine", "finally"…); Q-shape heuristic extended to
  imperative stems ("Design…", "Create…", "Evaluate…").

## 3. What was edited (all digest-guarded, all backed up)

| Operation | Files | Detail |
|---|---|---|
| LaTeX → plain-text sweep (4 passes) | 356 | **4,251 sections** converted, ~35,434 atomic replacements (`\frac{a}{b}` → a/b, `\times` → ×, `\(n\)` → n, `$90^\circ$` → 90°, `\begin{array}` column layouts inlined by hand, `\xrightarrow{heat}` → —heat→, `\mathbb{Z}` → ℤ …). A section ships only if the digit-multiset invariant holds and zero residue remains; everything else left untouched for hand repair. Fixed one converter bug found this way (`^\circ` pre-substitution was eating a closing brace). |
| Hand repairs | 3 | 2 column-arithmetic `\begin{array}` blocks inlined (c7_math_ch01_001, c7_math_ch03_003); 1 **source-truncated line** completed — c8_eco_ch3_4 WORKED_EXAMPLE_1 had `$$U_{2011} = \left( \frac{300,000 \text{` cut mid-`\text{` in the original file; completed as `U₂₀₁₁ = (300,000 urban / 1,000,000 total) × 100 = 30%.` (numbers cross-checked against the node's own ANSWER block); also repaired its doubled `ANSWER: ANSWER:` prefix. |
| Definition rewrites/expansions | 294 (+19 filler-opener rewrites inside the 294) | Every node < 40 words expanded to 55–100 words in textbook register, preserving all original claims; the 19 "This topic explores…" filler openers (c7 hist/geo — the entire below-min-bar set) rewritten to open with the concept itself. All facts authored against standard NCERT content for the node's named topic. |
| Walkthrough continuations | 43 | House-style append (**Worked step / In the exam / Check yourself**) with numeric worked steps (all arithmetic hand-verified) — never replacing or weakening existing text. |

**Totals: 617 unique files touched, 772 manifest rows, zero failures at apply time.**

## 4. Verification (evidence)

- **Digest guard (per edit):** `apply_wave2.py` re-imports the house `apply_content_depth.py`
  guards (digest_except, banned strings, backups) and refuses any write whose non-edited regions
  change — every batch reported applied = N, failed = 0.
- **Post-hoc full verification:** for all **617 files**, content outside the union of edited
  sections is byte-identical between the pre-wave backup and the current file — **617/617, 0
  mismatches**; section order/count identical to backup — **0 structural diffs**.
- **Authored-text hygiene:** all 337 authored bodies + 3 hand sections scanned — **0 banned
  strings, 0 node ids, 0 raw LaTeX, 0 long floats**.
- **Re-scan:** final rubric pass = **1,320/1,320 at 10/10**, 0 below min-bar (output in §1).
- **Spot-reads:** edited files re-read in context (e.g. c8_chem_ch3_11, c7_hist_ch04_002) —
  appends land cleanly inside the existing register.

## 5. Parked lanes (measured, untouched — owner decision 2026-09-29)

750 nodes (hin/english/engl/gram, c6–c8). Failing checks at final scan: WALKTHROUGH 697,
DIAGNOSTICS 305, DEFINITION 139, ELI5 57, MISCONCEPTION 6, HYGIENE 3; only 41/750 currently
10/10. Per the corpus-scope decision these are **not** relaunchable without an owner go; they
are itemised in `w1_scores.jsonl` (`"parked": true`).

## 6. What remains missing for *true* perfection in the actionable lane — and why

The 8-check rubric is at 100%, so the remainder is **beyond-rubric debt**, honestly stated:

1. **Legacy diagnostic slot artifacts (≈ 749 nodes carry at least one suspect slot).**
   Kinds: 833 question slots not shaped as questions (legacy text ending without a stem),
   **43 hard slot-swaps** (answer text sitting in the QUESTION slot — student-visible on the
   learn page's quick quiz, since `servableDiagnostics` renders any non-null question),
   1,255 answer keys of ≤ 2 words (most are **by-design fill-in-the-blank one-worders**,
   a minority genuinely thin), 5 too-short slots.
   **Why remains:** rubric point 4 only demands ≥ 2 valid pairs (satisfied everywhere, most
   nodes carry 6–11 pairs); repairing the swaps properly means authoring ~900 question stems
   whose original text is lost from the files — a real authoring wave (~2–3 days), not a
   mechanical fix. Recommended as the next lane task.
2. **1,907 node-id references inside prose** (e.g. "Review c7_physics_ch04_003 …").
   **Why remains:** not a display violation — AuthoredText rewrites every id to a label before
   render (installed corpus-wide for exactly this register), and AGENTS.md accepts ids in
   payloads. Zero ids were **added** by this wave. A prose-de-id pass (id → chapter title)
   would be mechanical but churns ~840 files for zero on-screen change.
3. **Needs-diagram:** none identified in the actionable lane — no rubric gap required a figure.
4. **Needs-sim:** none — no rubric gap required an interactive.
5. **Parked:** the entire §5 list — requires owner go, not authoring effort.

## 7. Artifacts

| File | Purpose |
|---|---|
| `wave2/scan_wave2_rubric.py` | 8-check 10/10 scanner (streams; final semantics) |
| `wave2/w1_scores.jsonl` | Final per-node scoring, all 2,070 lane nodes (parked flagged) |
| `wave2/w1_baseline_vs_final.json` | Reconstructed BEFORE vs AFTER per-node scorings |
| `wave2/apply_wave2.py` | Digest-guarded applier (reuses house guards; latex_sweep / set_sections / set_diag ops) |
| `wave2/latex_to_text.py` | Verified LaTeX→Unicode converter (digit-multiset + residue invariants) |
| `wave2/repair_special_sections.py`, `wave2/diag_residue.py`, `wave2/verify_authored_text.py`, `wave2/reconstruct_baseline.py` | Repair + verification tooling |
| `wave2/backups_w1/` | Pre-edit copies of all 617 touched files |
| `wave2/apply_manifest.jsonl` + `wave2/authoring/apply_manifest_w1.jsonl` | 772 edit rows with untouched-region digests |
| `wave2/authoring/batch_*.json` (c6/c7/c8/final4), `authoring_hand_special.json` | 337 authored payloads + 3 hand repairs |
| `wave2/w1_worklist.json`, `w1_authoring_worksheet.jsonl`, `w1_worksheet_v2.jsonl` | Worklists used during the wave |

**DB note:** all changes are `.md`-only. Downstream refresh when containers return:
`load_cbse_enrichment`, then the in-memory index rebuild (watch the
`ENHANCED_NODES_FAST_FINGERPRINT` stale-pickle trap — delete `_cache/enhanced_nodes_index.json*`
before restart). Content dir is bind-mounted, so files are already visible to running backends.
