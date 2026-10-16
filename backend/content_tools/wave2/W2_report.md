# W2 Report — CBSE Class 9 (board year) node-by-node rubric wave

**Agent:** CONTENT-W2 · **Date:** 2026-10-05/06 · **Corpus:** `deploy/content/enhanced_nodes_md/`
**Lane:** `c9_*` teaching nodes (no `_comp` present in class 9) = **694 files measured**

---

## 1. Lane definition and the parked interpretation

| Group | Files | Treatment |
|---|---|---|
| bio 45, chem 31, civ 29, eco 33, geo 36, hist 45, math 131, physics 64 | **414** | Actionable — scored, authored, verified |
| hin 180, engl 83, gram 17 | **280** | PARKED — measured, never touched (AGENTS.md 2026-09-29; house scanner `PARKED_SUBJECTS` agrees) |

The brief's "eng_h, eng_f" do not exist under the `c9_` prefix; the English lanes present are
`c9_engl_*` and `c9_gram_*`, both parked by the same owner decision (and by wave-1's scanner).
They are measured, not edited.

## 2. Rubric and scanner

Scanner: `wave2/w2_scan.py` — all 8 rubric checks per node, lane-wide JSONL at
`wave2/w2_scores.jsonl`. It reuses the house parser conventions from
`scan_depth_v2.py` and adds the W2 checks (walkthrough step/takeaway cues,
worked-example quality, hygiene, scope).

Calibration decisions (each verified against the frontend before adoption):

1. **Node ids in prose = accepted by design.** AGENTS.md 2026-09-29: ids travel as fetch keys;
   "Do not fix payloads to remove ids." `AuthoredText.tsx` converts every id in rendered corpus
   prose to a label. Ids are therefore counted, not scrubbed (456 id-bearing facing sections
   measured pre-wave; zero ids were authored BY this wave, house style).
2. **`$...$` LaTeX in prose = raw on the student's screen.** The learn page renders
   definition/eli5/walkthrough/diagnostics/misconception/examples/mastery/scope via
   `AuthoredText` (verbatim span). Only `THIS_FORMULA`/symbols go through KaTeX (`MathText`).
   So prose LaTeX is a real hygiene violation and was scrubbed (see §4).
3. **CJK ratio rule.** A history node on Chinese writing legitimately cites 馬/嗎 — CJK is only
   flagged when >20% of a section's characters (wrong-language row), so scholarly citations pass.
4. **Walkthrough cues calibrated against real corpus register.** First strict pass scored the
   lane 23/414 (regex too narrow — missed "Observe…/Recall…/Ask:/Examples:" step pedagogy and
   "The key insight:" register). Final cues score the pre-wave state 323/414.

## 3. Scores before → after (final policy; before measured from pre-edit backups)

| Metric | Before | After |
|---|---|---|
| Actionable nodes scoring 10/10 | 323 / 414 | **414 / 414** |
| Actionable nodes below minimum-viable (def+walk+2 diag+ELI5) | 84 | **0** |
| Definitions failing (short <40w / LaTeX / banned filler) | 42 | **0** |
| Walkthroughs failing (short <150w / no takeaway / no step) | 49 | **0** |
| Files with raw LaTeX in student-facing prose | 40 (715 sections) | **0 (0 sections)** |
| ELI5 / diagnostics / misconception / scope failures | 0 | 0 (already corpus-deep) |
| Authored-text hygiene violations (this wave's own text) | — | **0** (banned strings, ids, LaTeX all absent) |
| Parked lane (measure-only) | 10/280 perfect, 270 below min | unchanged, 0 files touched |

Parked detail (for the next owner go): `c9_hin` 0/180 perfect (walk 180, worked-example 178,
misconception 153, ELI5 31 fail) · `c9_engl` 1/83 (walk 82, def 16) · `c9_gram` 9/17 (def 6, walk 2).

## 4. What was authored (106 files, digest-guarded, all batches applied with 0 failures)

House tools: `apply_content_depth.py` (batches 1–4) and `wave2/apply_w2.py`, which imports the
house `split_sections/digest_except/check_banned` and adds a whitelist-guarded
`sections_replace` (prose sections only; formula-family and id-list sections REFUSED by the tool).

| Batch | Files | Edits |
|---|---|---|
| 1 — 13 short definitions extended to 55–95 words, NCERT register | 13 | definition replace |
| 2 — 29 LaTeX-carrying definitions rewritten in plain-text math (x², √( ), π, °, Unicode sub/superscripts) | 29 | definition replace |
| 3 — 29 short walkthroughs: appended "Board takeaway + Self-check" continuations (→190–240 words) | 29 | walkthrough append |
| 4 — 16 no-takeaway walkthroughs: appended board-exam takeaway + drill | 16 | walkthrough append |
| 5 — LaTeX scrub of 728 prose sections (715 in flagged files + 13 sweep + repairs) | 106 | section replace via apply_w2 |
| — incl. 9 SCOPE sections whose banned opener "This node covers" was rephrased (house ban list caught them) | 9 | |
| — incl. 5 PREREQUISITE_REASONS sections with pre-existing truncated lines (cut mid-formula + boilerplate), hand-repaired | 5 | |

Math accuracy in authored text was verified while writing (e.g. 3-4-5 and 5-12-13 triples,
(4/3)π·1.5³ ≈ 14.14 m³, 2HgO: 434 = 402+32, AP 10th term 39, series 1+2+3 Ω @ 6 V).

## 5. Verification (evidence)

`wave2/verify_w2.py`:

1. **Format preservation 106/106** — for every edited file, section set/order/headers identical
   to the pre-edit backup; ONLY manifest-listed sections differ. (The digest guard refused 0
   writes; the applier's own pre/post digest check passed on every apply.)
2. **Parked integrity** — 0 `c9_hin/engl/gram` files in any payload, manifest, or backup.
3. **Authored-text hygiene** — 0 banned strings, 0 node ids, 0 LaTeX in every body this wave wrote.
4. **Re-scan** — 414/414 perfect, 0 below minimum-viable.

Note: `wave2/backups/` also holds copies dropped by a sibling agent (W5) for other classes;
verification is scoped to this wave's 106 manifest files. Zero Docker, zero Postgres, no restarts.

## 6. The honest gap report — what is still missing for a deeper 10/10

- **Needs owner go (parked):** 270 parked class-9 files below minimum-viable
  (Hindi is the deep hole: worked examples and misconceptions missing corpus-wide).
  Authoring work, blocked only by the parking decision.
- **Needs-diagram:** several geometry/physics walkthroughs say "in the diagram/draw the figure";
  quality there depends on the figure assets, which this wave did not audit or author.
  Not counted as text gaps; a diagram-availability audit is a separate wave.
- **Needs-sim:** none in this lane — nothing in the 414 nodes required a simulation to hit the rubric.
- **Authoring (remaining, optional depth):**
  - Pre-existing numeric oddity spotted but not silently altered: `c9_physics_ch4_5.md`
    WORKED_EXAMPLE/diagnostic "wrong answer" illustration says 432,000 J for the no-conversion
    error (plausibly v-in-m/min); worth one authored pass in a future quality wave.
  - Definitions/walkthroughs now meet the rubric floor everywhere, but a sentence-level
    accuracy re-read of all 414 nodes (beyond the ~160 touched) was not in scope.
- **By design, not gaps:** `THIS_FORMULA`/`FORMULA_VARIABLES`/`FORMULA_UNITS` keep LaTeX
  (rendered by KaTeX via `MathText`); `CROSS_SUBJECT` is a pipe-delimited machine field and was
  deliberately left untouched (parser risk), while its display sibling `CROSS_SUBJECT_REASONS`
  was cleaned. Core rubric sections carry **zero** LaTeX lane-wide (verified).

## 7. DB/serving note (for the coordinator)

All changes are `.md`-only under `deploy/content/enhanced_nodes_md/` (bind-mounted, instantly
visible to running backends). To serve enriched fields from DB/in-memory index, run
`load_cbse_enrichment` + rebuild the enhanced-nodes index — and mind the
`ENHANCED_NODES_FAST_FINGERPRINT` stale-pickle trap (delete `_cache/enhanced_nodes_index.json*`
before restart). Not executed here (zero-Docker rule).

## 8. Artifacts

| File | Purpose |
|---|---|
| `wave2/w2_scan.py` | 8-point rubric scanner (lane-wide, final policy) |
| `wave2/w2_scores.jsonl` | per-node scores, all 694 lane files |
| `wave2/apply_w2.py` | whitelist-guarded sections editor (imports house digest/ban functions) |
| `wave2/de_latex.py` + `test_de_latex.py` | brace-aware LaTeX→plain-text converter + 34 regression cases |
| `wave2/verify_w2.py` | the 4-gate verification printed above |
| `wave2/authoring/batch1..5e*.json` | authored payloads (7 payloads, 106 files) |
| `wave2/authoring/apply_manifest.jsonl` | per-file edit manifest with untouched-region digests |
| `wave2/backups/*.md` (c9_ flat files only) | pre-edit copies of all 106 edited files |
| `wave2/residuals.txt` | hand-fix queue (empty at close) |
