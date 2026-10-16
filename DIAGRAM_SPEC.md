# DIAGRAM_SPEC — sourced open-licensed diagram images, format v2 (FROZEN)

Status: **FROZEN v2** (supersedes the v1 mermaid-section design, which was
never shipped — zero node md files were modified under it). v2 ships diagrams
as REAL open-licensed educational images (Wikimedia Commons / OpenStax), the
same family and quality bar as the platform's earlier diagram era
(`public/assets/diagrams/*.svg`), served through one uniform pipeline.

---

## 1. What a diagram is in v2

A per-node IMAGE ASSET + attribution record. The node markdown corpus stays
completely untouched. Content lives outside the corpus:

```
deploy/frontend/public/diagrams/class{N}/{node_id}.{svg|png|jpg}
deploy/frontend/public/diagrams/diagrams_index.json
deploy/frontend/public/diagrams/diagram_attributions.json
```

- `class{N}` = the node's syllabus class (c9 files → class9, c10 → class10 …).
- `diagrams_index.json` — `{ "<node_id>": { "file": "class10/c10_bio_cbse_01_003.png", "class": 10 } }`.
  Presence in the index is the ONLY signal a diagram exists; every surface
  renders honest absence for nodes not in it.
- `diagram_attributions.json` — `{ "<node_id>": { "title": <Commons file title>,
  "source_url": <file page>, "artist": <html-stripped>, "license": <short name>,
  "credit": <one-line display string> } }`. Attribution is REQUIRED for every
  entry — Wikimedia/CC licenses require it; no entry without it.

## 2. Quality bar (owner-mandated, matches the earlier Wikimedia SVG set)

1. **Textbook-standard depictions** — the standard labelled view an
   NCERT/CISCE book would print (e.g. sagittal brain, longitudinal heart
   section, ray diagram for a convex lens), NOT artistic/3D/novelty variants.
2. **SVG preferred** (crisp at any size); otherwise PNG/JPG at ≥ 700 px width.
3. **Legible labels**, English, no watermarks, not cropped-to-unrecognizable.
4. **Subject-true** — the image must actually depict THIS node's concept.
   Every candidate is eyeballed (Read on the image or a contact sheet)
   before acceptance; wrong-subject matches are rejected.
5. When two candidates tie, pick the one closest to the textbook depiction.

## 3. License policy

Allowed (Commons `LicenseShortName`): `Public domain` variants, `CC0`,
`CC BY 1.0–4.0`, `CC BY-SA 1.0–4.0`.
Rejected: anything `NC` (non-commercial), `ND` (no-derivatives), `UNKNOWN`,
default Flickr/YouTube imports without a clean license, fair-use images.
OpenStax figure pages (CC-BY) may be used where they match; same attribution
record, `source_url` = the figure page.

**Per-figure license exception (owner ruling 2026-09-29):** OpenStax book
pages carry a page-level `CC BY-NC-SA` banner, but individual figures whose
OWN attribution line names a non-NC license (e.g. `CC BY 4.0`) are governed
by that figure-level license and ARE allowed. Evidence required in the
attribution record: the figure's exact credit line + both licenses
(`page_banner: CC BY-NC-SA`, `figure_license: CC BY 4.0`). A figure whose
own credit line includes NC/ND remains rejected.

## 4. Sourcing pipeline (mechanical, repeatable)

`_cisce_build/diagtools/source_commons.py`:

1. Read the curated search-term map (`search_terms.json`: node_id → query,
   authored from the node's title + DEFINITION key terms).
2. Query Commons API `generator=search`, `gsrnamespace=6` (File:),
   `prop=imageinfo`, `iiprop=url|size|mime|extmetadata`, `iiurlwidth=1000`.
3. Filter: allowed license, mime svg/png/jpeg, width ≥ 700 (svg exempt).
4. Download top candidates to `_cisce_build/diagtools/staging/`.
5. Human (agent) eyeball pass via contact sheets + Read → accept/reject.
6. Accepted files copied to `public/diagrams/class{N}/{node_id}.{ext}`;
   index + attributions regenerated.

## 5. Existing-asset mapping (first duty, before any new sourcing)

Already-on-disk sets (pilot inventory, 2026-09):
- `public/assets/diagrams/*.svg` — 8 era-1 Wikimedia SVGs. AUDIT RESULT: 6 of
  the 8 files were corrupt on disk (Wikimedia 429 error pages saved as .svg —
  the earlier download used a non-compliant UA). Repaired during the pilot:
  heart + digestive re-fetched clean and mapped. Verified-clean and mapped:
  neuron, flower, heart, digestive. NOT mapped (honest): animal cell +
  plant cell (no whole-cell node in the c9/c10 pool) and the human-eye SVG
  (no eye node in the pool) — those three remain corrupt on disk and need
  re-fetching before any future use; the brain SVG's Commons title no longer
  exists, so it has no verifiable license and was excluded.
- `public/diagrams/*.{png,jpg}` (247) — the sims_v2 interactive-diagram
  registry (`components/sims_v2/engine/diagrams.ts`), keyed by topic slug,
  credit strings incomplete ("Wikimedia · "). They stay owned by the sims
  surface; where one matches a pilot node, the v2 pipeline re-sources the
  SAME Commons image fresh (clean provenance) rather than adopting an
  unattributable local copy. FOLLOW-UP: backfill that registry's credits
  from `diagram_attributions.json`-style records.

## 6. Serving contract

- Component: `components/renderers/DiagramImage.tsx` (DoodleCardImage
  pattern — image proves it exists via load/error before anything renders;
  nothing exists → nothing renders, ever).
  Renders: glass card, the image (click = full size), the attribution credit
  line. Same treatment for every image — one curated set, no era split.
- Learn page: rendered after the Walkthrough card when the node is in the
  index.
- Story Mode explore scene: when present, preferred over the engine timeline.
- Backend: the frontend reads the static index directly (fetch once,
  module-cached). NO backend/parser/md changes are required in v2 — the
  `story_diagram` enrichment field from v1 is NOT shipped.

## 7. Validation gate

`_cisce_build/diagtools/validate_diagrams.py` (rewritten for v2):

```
python validate_diagrams.py [--root deploy/frontend/public/diagrams]
```

Checks: every index file exists with an allowed extension; every index node
exists in the corpus with the right class folder; every index node has an
attribution record with an allowed license and non-empty source/artist;
no orphan image files outside the index; staging set ⊆ index (no unreviewed
leaks). Exit 1 on any violation.

## 8. Selection rule for waves (mechanical)

Pool = class-scoped subject prefixes (science + maths waves):
- Class 9 science: `c9_bio_*`, `c9_chem_*`, `c9_physics_*`
- Class 10 science: `c10_bio_cbse_*`, `c10_chem_cbse_*`, `c10_phy_cbse_*`
- Class 9 maths: `c9_math_ch*`; Class 10 maths: `c10_math_cbse_*`

Rank, take in order until the wave quota is met:
1. Every chapter-anchor node (c9 `..._chN_1`, c10 `..._NN_001`).
2. Nodes in the priority chapters (process/system-rich): c10 bio Life
   Processes / Control & Coordination / Reproduction; c10 chem Chemical
   Reactions / Acids-Bases / Carbon; c10 phy Light / Electricity / Magnetic
   Effects; c9 phy Motion / Force / Gravitation / Work-Energy / Sound;
   c9 chem Matter / Pure Substances / Atoms / Atomic Structure; c9 bio Cell /
   Tissues; c10 math Quadratics / Trigonometry / Coordinate Geometry /
   Circles / Surface Areas & Volumes / Statistics / Probability; c9 math
   Number Systems / Polynomials / Lines & Angles / Triangles / Surface Areas.
3. Remaining pool nodes by node number.

Nodes whose concept has no genuinely matching open image get NOTHING
(honest absence) — never force a match.

## 9. Editing hygiene

- Node md files: NEVER modified in v2. (Backups dir
  `_cisce_build/diag_pilot_backup/` exists for the pipeline; empty in v2.)
- All new files land in `deploy/frontend/**` AND root mirror `frontend/**`.
- No git commits; no docker builds (frontend rebuild ships later via
  coordinator; public/ assets are static and serve as soon as rebuilt).

## 10. Extension rules (v2.x candidates — NOT in v2)

- Hindi-labelled equivalents (Commons multilingual SVGs) as a locale layer.
- Zoom/pan + part-highlighting by reusing sims_v2's hotspot engine on the
  same assets.
- Class 6-8 + 11-12 waves reusing this exact pipeline.

---

## wave-T (2026-09-29) — NCERT textbook-figure recovery, SPEC-ONLY

Owner rulings during this wave (coordinator, 2026-09-29): **(1) the NCERT
page-extraction PNGs in `ncert_books/text_cache_new/diagrams/` are
NCERT-copyrighted expression and are NOT publishable** — no extraction file
may be copied into either public diagrams tree, ever; **(2) clean-room
protocol** — an NCERT figure may be used only as a TOPIC POINTER (what the
curriculum needs), never as a visual reference (no tracing / layout
imitation); original diagrams are created from the node's own
DEFINITION/WALKTHROUGH facts with independent layout, recorded as
`spec → creator → date` per diagram.

### What wave-T shipped

1. **Book-code map** (`_cisce_build/wavet_backup/bookcode_map.json`):
   `<class letter><3-letter subject><1NN>` — class letters f6 g7 h8 i9 j10
   k11 l12; subjects ebo=Biology, ech=Chemistry, eph=Physics, emh=Maths …;
   `1NN` → chapter NN. The wave's sources: kebo105 (c11 Bio ch5 Morphology),
   kebo108 (ch8 Cell), kebo117 (ch17 Locomotion), kebo118 (ch18 Neural).
2. **Figure spec** (`wavet_backup/figure_specs.json`, 150 extracted figures):
   per-figure {book, chapter, pdf/text page, fig_ref, concept, node_id,
   confidence, lab_status}. Page→figure alignment via the cached book text
   ("Figure C.N" mentions per PDF page; extraction page = text page − 1,
   verified on 10 exact `_figC_F_pP` anchors). 106/150 figures mapped to a
   node; 44 unmapped (cover art, photos, uncaptioned page debris) and
   fig 8.8 (chloroplast) has NO node in the ch8 pool (honest unmapped).
3. **Free equivalents published (19 nodes, all class 11, deployed + merged
   into `diagrams_index.json`, canonical v2 gate 0 errors on deploy)**:
   - Commons (14): flower parts 05_005, prokaryote 08_002 (LadyofHats PD),
     fluid mosaic 08_003, plant cell 08_005 (LadyofHats PD), mitochondrion
     08_006 (LadyofHats PD), ribosome 08_007 (CC0), animal cell/nucleus
     08_008 (LadyofHats PD), centrosome 08_009 (Kelvinsong CC BY 3.0),
     neuromuscular junction 17_004 (CC BY 4.0), skeleton 17_005 (LadyofHats
     PD), neuron 18_001 (LadyofHats PD), sagittal brain lobes 18_004
     (CC BY-SA 3.0), eye 18_008 (CC BY-SA 4.0), ear 18_009 (Chittka
     CC BY 2.5).
   - Original clean-room SVGs (5, CC0, provenance in
     `wavet_backup/original_diagrams.json`): leaf morphology 05_003,
     dicot/monocot seed 05_008, sarcomere sliding-filament 17_003, nerve
     impulse conduction 18_002, chemical synapse 18_003.
   - BioIcons (`assets/diagram_lab/bioicons_*`) was evaluated FIRST per the
     priority order; 19 candidates fetched from the pinned GitHub tree and
     eyeballed — all but `ear-label` are UNLABELLED icons, below the §2
     "legible labels" bar, so none were published; the ear slot went to the
     richer Commons CC BY 2.5 diagram.
4. **Honest absence (documented, nothing forced)**: 05_001 (already
   illustrated by wave B), 05_002 stem + 05_004 inflorescence + 05_007
   fruit + 05_009 floral formula + 05_010 (only unlabelled/non-English or
   numbered-legend candidates found), 08_001 cell theory, 08_004 cell wall,
   08_010 microbodies, 17_002 muscle tissue types (numbered worksheet only),
   17_006/17_007, 18_005–18_007, 18_008 eye figure never had a captured
   caption (spec entry is page-context, low confidence).
5. **Interactive exercises**: the lab's "41 PASS" is 41 figures that passed
   its classifier, of which only 6 carried REAL tap-exercise specs
   (4 with parts + 2 aestivation variants); all 44 lab .md files + report
   preserved at `_cisce_build/wavet_backup/exercises/` for the revival
   follow-up.
6. **Gates**: `diagtools_waveT/validate_diagrams.py` (part-file gate, both
   trees, license allow-list, orphan check vs waveB∪waveT claims, and a
   COPYRIGHT GATE rejecting any `kebo*/lebo*/ncert*` image in the served
   tree) → 0 errors; merged deploy tree passes the canonical v2 gate
   (188 nodes, 0 errors); waveB gate patched to accept waveT's class11
   claims → 0 errors. Root-mirror canonical gate has 7 PRE-EXISTING
   orphan errors from wave D (c6_* files misplaced in class7/ of the root
   mirror; deploy is correct) — left untouched, reported to coordinator.

Backups: `_cisce_build/wavet_backup/` (specs, merged index snapshots,
original-diagram provenance, exercises). Sourcing workdir:
`_cisce_build/diagtools_waveT/` (search terms, staging, bioicons staging,
picks, sheets).

## Quality bar for created diagrams (owner directive 2026-09-29)

Every created/generated diagram must meet the **LadyofHats/Kelvinsong
standard** (the free-redraw classics already in our collection) — not
programmer art:

1. **Judge at full size before accepting.** Programmer-art look (plain
   boxes, default arrows, cramped labels) = rework, up to 3 rounds.
   Rejecting your own work freely is correct; a missing diagram beats an
   ugly one.
2. **Drawn shapes, not boxes** — bezier paths, layered fills, subtle
   gradients. A heart has chamber-shaped paths; a nephron has the loop.
3. **Label discipline** — leader lines to exact structures, no overlap,
   font ≥14px at render size.
4. **Cohesive palette** (2-3 hues + neutrals) per diagram.
5. **Density = what the WALKTHROUGH teaches** — the labelled parts a board
   exam asks about, not 2 boxes.

If a concept can't be drawn well (complex 3D anatomy), prefer honest
absence — but exhaust rich-SVG first: paths + gradients + layers CAN look
world-class. This bar is retroactive to all created diagrams.
