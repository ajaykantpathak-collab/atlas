# CANDIDATE AUDIT — 7 data assets reviewed before wiring

Generated: 2026-09-15. Read-only audit; the only file written is this report.
Reference corpus: `backend/_cache/enhanced_nodes_index.json` = **9,010 official nodes**, 245 id
families, shapes `c6_math_ch01_*`, `c10_bio_cbse_01_*`, `c#_geo_cbse_*` etc. Sims catalog:
`frontend/components/sims_v2/SIM_INDEX.json` = **3,018 sims** (1,764 `v3_*`, 610 `v3w_*`, 644 `gen_*`),
each with `n:` arrays of **official** node ids.

**Headline:** the owner's three suspicions resolve as follows —
1. *Mapping files are risky* → **CONFIRMED, worse than feared** (0% of mapped CBSE ids exist in the official corpus; 58% cross-class).
2. *Books may be old-syllabus* → **REFUTED** for classes 6-12 (new NCF editions present and verified); only 1 explicitly-old book found; classes 1-5 are empty.
3. *Diagrams may duplicate sims* → **REFUTED as duplication** (they are static SVG-generation specs, not interactive sims) — but their node linkage is broken (0% exact id match).

A material side-finding: **SIMS_COVERAGE.md (2026-09-09) is stale.** Its "136 orphans" no longer matches
the registries on disk; the true unwired count today is ~62.

---

## Candidate 1 — "136 orphaned sims"

**Evidence files:** `SIMS_COVERAGE.md` (repo root), machine-readable matrix at `_trash/SIMS_COVERAGE.json`,
baseline at `_trash/SIMS_BASELINE.json` (path→mtime only; **not** orphan evidence — it is a timestamp snapshot).

**Verified state (recomputed from disk + registries today, not from the doc):**
- 1,029 `.tsx` simulation components on disk (`frontend/components/simulations/`, excl. `_dedupe_archive`); all 680 healthy per the coverage audit; 0 stubs.
- `frontend/lib/gameRegistry.ts` + `frontend/lib/c6_12_gameRegistry.ts` now reference **919** of them.
- **Current true orphans ≈ 62, not 136:**
  - **56** in `c6_12_chem_upgraded/` — classes 10-12 chemistry (still unwired).
  - **3** in `c6_12/`: `C11_HomeScienceFabricCareSim`, `C11_PsychologyMethodsEnquirySim`, `C6_MathsLinesAndAnglesSim`.
  - **3** in `class1/`: `BiologyFoundationsSimulation.tsx` (47 KB), `ComputerSkillsC1_5Sim.tsx` (49 KB), `PhysicsWorldSim.tsx` (48 KB).
  - 4 root primitives (`GameRenderer` etc.) — already imported by `lib/game-engine/`; 44 `three/` sims — wired via `app/3d-lab/simLoaders.tsx` (not orphans).
- The 55 `c6_12_new/` files the doc lists as orphans are **now wired** (all 55 appear as `lazySim` imports + `C6_12_GAMES` entries, e.g. `Sim0363 = C11_BiologyPlantGrowthCBSESim`, id `c11_biologyplantgrowthcbse`).

**Class split:** orphans are almost all class 6-12 (chemistry 56, physics/biology/geo/psy in c6_12 remainder). Only 3 are junior (class 1). A junior serving route exists (`gameRegistry.ts` → living world + `/simulations` page, class 1-5 mode in SimPlayer), so wiring the 3 class-1 strays is trivial. **Sample of 10 components opened** (2 class1, 3 chem_upgraded, 3 c6_12_new, 2 c6_12): every import resolves on disk — `lib/sim-engine` (audio/speech/feedback), `lib/srs.ts`, `lib/bkt.ts`, `lib/masteryStore.ts`, `lib/topicGraph.ts`, `components/sim-primitives/Draggable.tsx` all exist; all files carry typed challenge interfaces, BKT/SRS hooks and multi-challenge flows (75-108 KB each).
- Key insight: the wired `c6_12/C10_ChemistryAlkanes...Sim.tsx` is now a **9 KB slim rebuild (Sep 13)**, while `c6_12_chem_upgraded/` holds the **93 KB rich original (Sep 15)** — the "orphans" are *newer and richer* than what is wired. sims_v2's `v3w_*` wrappers import the **c6_12** (slim) copies, and SIM_INDEX already routes those topics to official ids (`v3w_c10_chemistryalkanes… → c10_chem_cbse_04_*`).
- **Quality ratings:** `SIMS_V2_QUALITY.json` (2026-09-13) covers only the 176 class 1-6 generator sims (106 PERFECT / 70 GOOD / 0 THIN / 0 BROKEN; `tsc --noEmit` gate = 0 errors) — **no quality file exists for the orphaned v1 components**; my 10-file sample passes import-resolution but has not been type-checked as a set.

**Verdict: PILOT(50).** Swap the 56 `chem_upgraded` rich copies in (regenerate v3w wrappers + `tsc` gate) and wire the 6 strays; the components are healthy, but none of them carries official node ids itself — routing must come from SIM_INDEX, whose c10-chem wrapper subtitles are already misaligned (alkanes wrapper subtitle talks about soaps/detergents), so verify per-sim before full rollout.

---

## Candidate 2 — `parsed_output/diagnostics.jsonl`

**Verified counts:** 4,124 lines (claimed 4,124 — exact). 4.8 MB. Parser `diagnostics_v1`; sources `D:\cisce\...` (CISCE-derived, not CBSE).

**Schema (all 18 keys, per-line):** `record_id` (unique md5-style), `content_type`, `source_file`, `source_format`, `parser_id/version`, `class_level`, `subject`, `target_nodes[]`, `diagnostic_id`, `question_text`, `correct_answer`, `wrong_answers[{answer, analysis}]`, `concept_trap`, `remediation`, `scoring`, `cognitive_level`, `topic_tag`.

**Node coverage:** 3,540 `target_nodes` refs → **1,088 distinct ids; 0 (0.0%) exist in the official 9,010** (exact match, owner's rule). Ids are the old CISCE chapter-scheme (`c12_chem_053`, `c10_phy_035`); the official scheme is `c12_chem_cbse_*`/`c10_phy_cbse_*_NNN`. 1,127 records (27.3%) have **no target_nodes at all**; the literal string `UNMAPPED` appears 32 times. Legacy ids do still resolve inside `backend/ai/_question_index.json` and `tutor_brain.json`, so a remap path exists but is not wired.

**Duplicates:** 2,508 distinct `diagnostic_id`s (179 ids reused); only 47 near-duplicate question texts — content is largely unique.

**Answer-key quality (10 spot-read):** strong on STEM. Correct: amine basicity in water `(c) (CH3)2NH`; mean of first 7 naturals from Σx²=140 → 20; photon ionization λ = 9.1e-8 m. Weak spots: 177/4,124 (4.3%) have empty `correct_answer` (e.g. "7. What was the Kashmir dispute? (Open-ended)" with blank answer); only 597 records carry `wrong_answers`, and their `answer` field is usually `null` (analysis text only — no real distractors).

**Verdict: PILOT(50).** Content is genuinely good diagnostics; but 0% id hit-rate + CISCE origin + 177 empty keys means: remap ids via tutor_brain/legacy catalogs, drop or fill empty-answer rows, and gate 50 through review before scaling.

---

## Candidate 3 — `parsed_output/misconceptions.jsonl`

**Verified counts:** 7,034 lines (claimed 7,034 — exact). 9.0 MB. Parser `misconceptions_v1`; sources `D:\cisce\...`.

**Schema (19 keys):** adds `misconception_text`, `correction`, `why_wrong`, `diagnostic_question`/`diagnostic_answer`, `frequency`, `topic`, `source_ref` to the common envelope.

**Node coverage:** 4,442 refs → **535 distinct ids; 0 (0.0%) in the official corpus** (same CISCE chapter-scheme). **3,312 records (47.1%) have no target_nodes** and **4,001 (56.9%) have `class_level: null`** — half the file is only subject+text.

**Duplicates:** severe — 1,077 distinct `misconception_id`s but `misconception_1` alone repeats 255×; **2,335 records (33%) duplicate an existing misconception_text** (per-subject files repeat the same classic errors). All 7,034 have a `correction` (no blanks); 3,773 carry a diagnostic question; 3,055 carry a frequency.

**Quality (10 spot-read):** factually clean — "large intestine absorbs nutrients" → corrected to small intestine; pendulum amplitude ≠ longer period (isochronism, correct caveat for large angles); ultrasound reflection/refraction correct; LHL/RHL continuity procedure correct; section-formula sign error realistic. Language is exam-aware and India-contextualised.

**Verdict: PILOT(50).** High-value, low-risk content if wired as **topic/keyword-keyed enrichment** (not node-id-keyed): dedupe texts, backfill class via subject+topic, and route by title match to official nodes.

---

## Candidate 4 — `cbse_data/content/diagrams/diagrams_index.json`

**Verified counts:** 5,402 entries (claimed 5,402 — exact). **Non-Hindi = 4,480 (claimed ~4,480 — exact); Hindi-family = 922.**

**Schema:** `node_id` (5,402), `diagram_type` (5,402; `svg` 5,264 + flowchart/timeline/map/mind_map…), `title` (5,399), `svg_description` (5,402), `hotspots` (5,401), `alt_text` (5,401), `_chapter_code` (5,402, NCERT PDF codes like `fegp101`). **There is no image-path field — these are SVG *generation specs*, not image files** ("spot-open 10 images" is N/A: zero referenced files exist). **Hotspots: 24,763 total, mean 4.6/entry, 19 entries with none; 24,762/24,763 coordinate pairs are numeric and in-range.**

**Node linkage:** 1,795 distinct `node_id`s → **0 (0.0%) exist in the official corpus.** The file uses a third id scheme, chapter-level `c6_math_cbse_002` (the official corpus has **zero** ids of that shape; its chapter-level ids are `c6_math_ch01` with per-node suffixes). Only 32/81 families (2,211 rows, 40.9%) even share a family prefix with the official corpus; **3,191 rows (59.1%) point to families that don't exist at all** (`c8_hin_cbse`, `c7_histciv_cbse`, `c11_bt_cbse`, `c12_ai_cbse`…). Linkage must be rebuilt from `_chapter_code` + title.

**Samples (10 read):** content quality is good and often *new*-syllabus: `c6_math_cbse_002` "Key Number Sequences" (Virahanka/Fibonacci — Ganita Prakash ch. "Patterns in Mathematics"); class-7 fraction division model; class-12 debenture decision tree; Blakes's Songs of Innocence/Experience Venn; Hindi entry on Mohenjo-daro drainage is well-formed Devanagari. **One currency flag:** `c10_hist_cbse_007` consumer-commission pyramid says "District: claims up to Rs 1 crore" — the 2021 revision of CPA-2019 rules moved the District limit to Rs 50 lakh; verify before serving.

**Verdict: PILOT(50).** Real interactive value (hotspot specs, alt text) and not sim-duplicates, but 0% id compatibility means a chapter-code/title-based remapper must be built and validated on a 50-diagram pilot first.

---

## Candidate 5 — Study-pack corpus (supporting files)

**Verified inventory (2,814 files, all readable text — zero binary junk):**
| Location | Files | Format | Coverage |
|---|---|---|---|
| `parsed_output/cbse_supporting_files_topicwise/` | **880** `.md`, 49.6 MB | markdown | classes 6-12; 10 fixed types: quote_bank, character_maps, drill_banks, glossary, literary_devices, model_answers, question_bank, revision_sheets, theme_trackers, worked_examples; per class: c6 56, c7 96, c8 98, c9 52, c10 142, c11 208, c12 228 |
| `parsed_output/english_supporting_files/` | 964 `.txt` | plain text, `<<<CHARACTER>>>`-style tagged | `eng/` 512 (per-chapter c10), `engelec/` 226 (c11 elective drama), `engmod/` 226 (Pygmalion etc.) |
| `parsed_output/hindi_supporting_files/` | 881 `.txt` | valid UTF-8 Devanagari | c10 Hindi lang, per-chapter (drill/glossary/question-bank/revision/worked examples) |
| `parsed_output/english_c1_8_supporting_files/` | 85 `.md` | markdown | **actually only classes 7-8**, and **56/85 files self-label ICSE/ISC** (sample header: "English (Class 7, ICSE)") |
| `parsed_output/cbse_supporting_files/` | 4 `.md` | markdown | c6 English quote banks only |

**Samples (15 read across types):** uniformly high quality, exam-formatted. Quote bank (c10 Literature p1, 85 KB): First Flight "A Letter to God" quotes with Speaker/Context/Literal/Reveals/Themes/Exam-Use tables. Character map (c10 Language): Gavin Maxwell/Mijbil with arc + mark-weighted exam angles. Model answers (c12 maths): paired Weak(1/4)/Strong(4/4) answers with marking rationale and LaTeX. Physics bank (c12): mark-scheme headers per 1-mark item. Hindi revision sheet: निबंध-लेखन structure table (250-शब्द split) — clean UTF-8, no mojibake. `engmod` Pygmalion character card: act-by-act arc + keyed quotes.

**Syllabus-currency evidence:** 767/880 topicwise files self-label CBSE; chapter structures follow **new** NCERT where it counts — c7 science drill is "Exploring Substances: Acidic, Basic, and Neutral" (Curiosity 7, 2025); c6 maths revision is "Data Handling and Presentation" (Ganita Prakash); c12 physics starts "Electric Charges and Fields"; c10 English is First Flight/Footprints post-rationalisation. No explicit "rationalized/NEP" markers in text; chapter numbers inside packs are pack-internal ("topicwise"), not always NCERT chapter numbers — title-match, don't trust numbering. **The ICSE-labelled `english_c1_8_supporting_files` (85 files) fails the new-syllabus-only rule for CBSE routing.**

**Verdict: ADD** (classes 6-12 CBSE packs, 2,729 files) — highest-quality, cheapest-to-wire asset; route by title/topic match to official nodes. Split out the ICSE c1-8 pack for separate board-gated use.

---

## Candidate 6 — `cbse_data/cross_board/mappings/` (4,723 mappings)

**Files:** `board_routing_map.json` and `board_routing_map_v2.json` (both **4,723 entries**; identical shape, v2 has revised targets), plus `subject_corrections.json` (357), `subject_corrections_v2.json` (2,267), `cisce_missing_chapters.json`, `subject_mapping.json` (22).

**Schema / direction:** key = CISCE world-node id (`c6_bio_001`); value = `{source: cisce|cbse, cisce_node_id, cbse_node_id|null, reason, class, subject}`. Direction is **CISCE → CBSE**. Reasons: `concept_match` 3,534 · `no_cbse_subject` 551 · `no_concept_match` 616 · `language_subject_no_match` 22. **1,189 (25.2%) have no CBSE target at all.**

**Measured risk rate (the number the owner asked for):** of the 3,534 routed targets —
- **0 of 3,534 (0.0%) `cbse_node_id`s exist in the official 9,010** (0/1,084 distinct). Every routing target is an id from the defunct chapter-level scheme (`c7_phy_cbse_007`), which no live node carries.
- **Class consistency: 58.0% mismatch** (2,050/3,534 route a class-N topic to a class-M target): c6 bio → c11 bio; c7 "Buoyancy" → c11 physics; c12 "Raoult's law" → **c11** chem; c9 "Equal intercept theorem" → **c7** maths; c1 "Day and night" → **c9** geography; c12 applied-maths graphs → c11 maths.
- **Spot-verify 15 (both-side titles):** 4/15 plausible (c11 impulse→c11 physics; c12 point-charge field→c12 physics; c11 accounts COGS→c11 acc; c11 BS stores→c11 bs), **11/15 wrong on topic, class, or both**, e.g.: "Leaf structure and types" (c6 bio) → `c6_phy_cbse_002` = *"Garbage in, Garbage out — Landfills"*; "Money — Barter System" (c10 econ) → *Consumer Rights / Forms of Consumer Exploitation*.
- Where `subject_corrections_v2` can check subjects (466/3,534), **159 (34%) still have a subject mismatch** — the corrections file exists precisely because the target ids were minted with wrong subject tokens (`c6_phy_cbse_001` is actually biology "Food: Where Does It Come From?").

**Verdict: DROP.** The owner's skepticism is fully vindicated: this is not a risky mapping, it is a broken one — 0% valid targets, 58% cross-class, ~1/3 mislabelled subjects. Anything routed through it violates the zero-wrong rule by construction. (Keep `subject_corrections_v2.json` as metadata if the chapter-level id scheme is ever rebuilt.)

---

## Candidate 7 — NCERT PDF library (`ncert_books/`)

**Verified inventory:** 1,101 files, **6.3 GB** (claimed 6.3 GB — exact); **983 PDFs** + 103 zip archives (unpacked twins of the same books) + 14 images/1 txt. Book dirs per class: c6 5, c7 7, c8 8, c9 5, c10 10, c11 28, c12 34, applied_maths 26 chapters + 1 official, **classes 1-5: 0 books**.

**Edition evidence (filenames use NCERT's own edition codes; verified by opening PDFs):**
- **Class 6 = new 2024 NCF books:** `fecu1_Science` (Curiosity), `fegp1_Maths` (Ganita Prakash), `fepr1_English` (Poorvi), `fhml1_Hindi` (Malhar), `fees1` (Exploring Society).
- **Class 7 = new 2025 books:** `gecu1_Science` — opened PDF: *"Curiosity, Textbook of Science, Grade 7 … you enjoyed your adventures with Curiosity in Grade 6"* (decisive); `gegp1/2` Ganita Prakash 7, `gepr1` Poorvi 7, `ghml1` Malhar 7.
- **Class 8:** new books (`hecu1` Curiosity 8, `hees1/2`, `hegp1/2`, `hepr1`, `hhml1`) **plus one explicitly old book: `hemh1_Maths_old/` + `.zip`** — the only old-syllabus item found by name.
- **Class 9 = new 2025 set:** `iebe1_English_Kaveri`, `ihga1_Hindi_Ganga`, `iest1` Exploring Society; `iemh1_Maths`, `iesc1_Science` are the current editions.
- **Classes 10-12 = current rationalized NCERT** (je*/ke*/le* codes: `jesc1` Science, `jemh1` Maths, First Flight/Footprints; ke* Hornbill/Themes…; le* Flamingo/Vistas, 4 Hindi books, Kaleidoscope, CAS). New class 11-12 NCF books do not exist yet, so these **are** the new-syllabus books as of 2026-09 and match the official corpus's chapter structure (the diagrams' `fegp101`-style chapter codes tie back to these same books).

**Owner's belief "books are old syllabus": REFUTED** except for the single `hemh1_Maths_old` (remove it) — and the real gap is the opposite: **classes 1-5 have no books at all**, so the junior corpus can't be sourced from this library.

**Verdict: ADD.** Authoritative, current-edition source PDFs for every served class 6-12; delete/quarantine `hemh1_Maths_old` (+zip), and note the 1-5 gap before promising junior book-text features.

---

## Ranked recommendation

| # | Candidate | Verdict | One-line reasoning |
|---|---|---|---|
| 1 | **Study-pack corpus** (2,729 CBSE files, classes 6-12) | **ADD** | Best text quality in the repo, verified new-syllabus alignment, zero id-risk when routed by title; exclude the 85 ICSE-labelled c1-8 files. |
| 2 | **NCERT PDF library** (983 PDFs, 6.3 GB) | **ADD** | Owner's old-syllabus fear is disproved by NCERT's own codes and opened pages (Curiosity 7 / Ganita Prakash / Poorvi); only purge `hemh1_Maths_old`; classes 1-5 missing. |
| 3 | **Orphaned sims** (true count 62, not 136) | **PILOT(50)** | Components are healthy and import-clean, and chem_upgraded copies are *newer/richer* than what's wired — but no official ids inside, so wire via regenerated v3w wrappers behind a tsc + spot-play gate. |
| 4 | **Misconceptions.jsonl** (7,034) | **PILOT(50)** | Factually clean, exam-aware corrections — but 0% node-id match, 47% unlinked, 33% duplicate texts: wire as deduped topic-keyed enrichment, not id-keyed. |
| 5 | **Diagrams_index.json** (5,402 SVG specs) | **PILOT(50)** | Great hotspot/alt-text content, not sim-duplicates — but a third id scheme (0% exact, 59% families nonexistent) demands a chapter-code remapper validated on 50 diagrams; fix the Rs 1-crore consumer-tier currency error first. |
| 6 | **Diagnostics.jsonl** (4,124) | **PILOT(50)** | STEM answer keys mostly correct, but 0% id match, CISCE-origin questions, 177 empty answers, and distractors missing on 85% — remap + clean before scaling. |
| 7 | **Cross_board/mappings** (4,723) | **DROP** | Zero routed targets exist in the official corpus, 58% cross-class, ~34% subject-mismatch, spot-checks fail 11/15 — wiring any of it guarantees wrong routing; owner's skepticism fully vindicated. |

**Cross-cutting note for the owner:** candidates 2-7 all share one root defect — they were keyed to the **legacy CISCE/chapter-level id schemes**, not to the 9,010 official ids. A single id-remapping service (legacy id → official node, seeded from `tutor_brain.json` titles + `subject_corrections_v2` + chapter codes) would unlock candidates 2, 4, 5 and 6 at once; candidate 7 should not be used as input to it.
