# Content Depth Report — CBSE enhanced_nodes_md corpus

**Agent:** CONTENT-DEPTH · **Date:** 2026-10-05 · **Corpus:** `deploy/content/enhanced_nodes_md/` (CBSE, Classes 6–12)
**Scope of work:** measure teaching depth of every teaching node, author-fill the 150 worst non-parked nodes, verify format-preserving edits.

---

## 1. What was measured

Every `.md` teaching node was scored by **composition**, not file length (scanner: `scan_depth_v2.py`, streams file-by-file, no full-corpus load):

| Component | Thin signal (penalty) |
|---|---|
| DEFINITION | missing (+30) / <20w (+26) / <25w (+16) / <35w (+9) / <50w (+4) / filler opener "This node..." (+8) |
| WALKTHROUGH | missing (+28) / <40w (+24) / <80w (+18) / <120w (+9) / <160w (+4) |
| ELI5 | missing (+10) / <15w (+4) |
| DIAGNOSTIC Q/A | none (+14) / <2 (+8) / avg answer <10w (+7) / <15w (+3) |
| WORKED_EXAMPLE | none (+5) / only 1 (+2) |
| COMMON_MISCONCEPTION | missing (+5) / <15w (+2) |

Score 0 = fully authored; higher = thinner. Thin threshold used throughout: **score ≥ 10**.

**Corpus facts found during the scan:** 14,266 `.md` files in the directory (AGENTS.md canonical figure: 14,236) = **11,009 teaching nodes** + **3,257 `_comp` companion docs** (excluded from teaching-depth ranking by design — they are cross-node question companions with no teaching sections) + 43 files parked in `_quarantine_wronggrade/`. Every one of the 11,009 nodes has DEFINITION, ELI5, WALKTHROUGH, ≥6 diagnostic Q/A pairs, misconception and worked examples — the corpus has no empty-section stubs. Thinness lives entirely in *length and quality of definitions/walkthroughs*.

**Owner-parked lanes excluded from authoring:** Hindi/English content-quality waves (`hin`, `eng`, `engl`, `english`, `gram` subjects, incl. `c9_hin_ga`) per the 2026-09-29 corpus-scope decision in AGENTS.md. These are measured but not touched. Sanskrit/Urdu: out of scope, none present.

## 2. Depth histogram — BEFORE the authoring wave

| Thinness bucket | Nodes |
|---|---|
| 0–4 (deep) | 9,744 |
| 5–9 (mildly thin) | 918 |
| 10–14 (thin) | 277 |
| 15–19 | 55 |
| 20–24 | 7 |
| 25–29 | 7 |
| 30–34 | 1 |

**Thin (≥10): 347 nodes — of which 245 in owner-parked Hindi/English lanes, 102 actionable (non-parked).**

## 3. What was authored (150 nodes)

Priority applied: (a) class 9–10 first, (b) core subjects (maths/science) first, (c) highest thinness score. All picks were standard CBSE-textbook topics; **zero topics required skipping** — every authored node was within standard NCERT syllabus content for its named topic.

| Grade | Nodes | Subjects |
|---|---|---|
| 9 | 62 | chem 19, math 10, geo 10, eco 7, civ 6, bio 5, hist 5 |
| 10 | 2 | math 1, bio 1 |
| 11 | 39 | cs 31, bio 3, biotech 3, acc 1, leg 1 |
| 12 | 42 | geo 32, hist 7, chem 1, bio 1, soc 1 |
| 7–8 | 5 | math 2, hist 2, eco 1 |
| **Total** | **150** | |

Edits applied per node (format-preserving; house style):
- **109 DEFINITION upgrades** — expanded to 2–4 sentence textbook-register definitions (median 45 → 90 words). 8 of these also removed banned filler openers ("This node covers...") and 1 removed raw LaTeX from a definition.
- **127 WALKTHROUGH extensions** — appended a continuation (concrete worked step, exam takeaway, self-check drill) taking walkthroughs from a median 110 → 229 words; every node now lands in the 150–300-word band.
- ELI5, all diagnostic Q/As, misconceptions, worked examples, graph/link sections: untouched (every node already had ≥6 diagnostic Q/As with answers, satisfying the ≥2 bar many times over).

Authored text was written by hand (no LLM generation step) in the corpus house register; the appended text contains **zero node IDs, zero banned platform strings, zero raw LaTeX** (verified below).

## 4. After the wave — measured results

| Metric | Before | After |
|---|---|---|
| Median thinness of the 150 | 13 | **0** |
| Mean thinness of the 150 | 12.0 | 0.2 |
| Improved (score dropped) | — | **150 / 150** |
| Walkthrough in 150–300w band | 23 / 150 | **150 / 150** |
| Definition ≥ 50 words | 36 / 150 | **150 / 150** |
| Corpus histogram 0–4 bucket | 9,744 | **9,890** |
| Corpus histogram 10–14 bucket | 277 | **186** |
| Corpus thin ≥10 total | 347 | **245** |
| **Corpus thin ≥10, non-parked** | **102** | **0** |

Sample movers: `c9_math_ch12_4` 18→0 (def 34→90w, walk 112→240w); `c11_cs_cbse_04_001` 18→0 (28→76w, 92→219w); `c12_geo_cbse_07_010` 18→0 (walk 77→179w).

## 5. Verification (evidence, not claims)

- **Format preservation:** for all 150 files, the post-edit file was diffed section-by-section against the pre-edit backup (`content_tools/backups/`): **150/150 have ONLY the DEFINITION and/or WALKTHROUGH bodies changed; every other section is byte-identical.** Section sets unchanged; no reordering. The apply tool (`apply_content_depth.py`) also refuses any write whose non-edited-region digest changes.
- **Slop scan:** banned platform strings ("Lane C", "variable binding", filler openers, TBD/placeholder) and node-ID patterns searched across all 150 authored texts: **0 hits in appended/replaced text**. (Pre-existing node-ID references in original walkthrough text were preserved untouched, as house style.) Raw LaTeX in authored text: 0 (one pre-existing LaTeX definition was replaced with plain text).
- **Fact discipline:** only standard CBSE/NCERT textbook content for each node's named topic; every numeric example in authored text was verified while writing (e.g. glucose 180 u, ₹10,000 @10% 2-yr SI vs CI = 12,000 vs 12,100, 50-30-20 on ₹5,000).
- **Re-scan:** `scan_depth_v2.py` re-run over the full corpus produced the AFTER histogram above (data: `depth_scores_v2.jsonl`; before-state kept at `depth_scores_v2_before.jsonl`; per-node before/after at `before_after_150.json`).

## 6. The honest total

**0 of 14,236 canonical CBSE teaching nodes remain thin-and-actionable (score ≥10 outside parked lanes). 245 nodes (1.7%) remain thin, all in the Hindi/English lanes PARKED by owner decision (2026-09-29) — they are listed in `depth_scores_v2.jsonl` and must not be relaunched without an owner go.**

**Next wave should cover (in order):**
1. **The score-9 tier: 150 non-parked nodes, mildly thin** (definitions ~50–80w, walkthroughs ~120–160w). Composition: **c12 geography 87, c12 history 26, c11 CS 19**, c12 CS 5, c11 psychology 3, remainder singletons (c11 hist/leg/stat/biotech, c12 app/biotech/hs/ip/psy). List: `depth_pick_150.json` (regenerated post-wave).
2. **The 874-node score 5–9 band** beyond that tier — mostly single short-dimension nodes (short definition OR short walkthrough, not both).
3. **Diagnostics depth:** average diagnostic-answer length in c11_cs / c12_geo runs 34–48 words vs ~60–110 elsewhere; a later wave could enrich answers there.
4. `_comp` companion docs (3,257) were excluded by design and remain unmeasured by this rubric.

**DB note:** per instructions, all changes are in the `.md` files only. Downstream refresh when containers return: `load_cbse_enrichment` + in-memory index rebuild (watch the `ENHANCED_NODES_FAST_FINGERPRINT` stale-pickle trap — delete `_cache/enhanced_nodes_index.json*` before restart).

## 7. Artifacts

| File | Purpose |
|---|---|
| `content_tools/scan_content_depth.py` | v1 scanner (structural coverage audit) |
| `content_tools/scan_depth_v2.py` | v2 scanner: composition scoring, histogram, pick, worksheet |
| `content_tools/apply_content_depth.py` | format-preserving editor (digest-guarded, banned-string guarded) |
| `content_tools/authoring/batch01..07*.json` | authored payloads (7 batches, 150 nodes) |
| `content_tools/authoring/apply_manifest.jsonl` | per-file edit manifest with untouched-region digests |
| `content_tools/backups/` | pre-edit copies of all 150 files |
| `content_tools/depth_scores_v2_before.jsonl` | full-corpus BEFORE scores (11,009 nodes) |
| `content_tools/depth_scores_v2.jsonl` | full-corpus AFTER scores |
| `content_tools/depth_pick_150_ORIGINAL.json` | the wave-1 pick (150 nodes) |
| `content_tools/depth_pick_150.json` | next-wave pick (post-wave 150 thinnest non-parked) |
| `content_tools/before_after_150.json` | per-node before/after metrics |
