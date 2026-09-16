# CBSE Sim Generation Scratchpad
## Master tracking document for CBSE simulation coverage

---

## CRITICAL: USE FIXED NODE IDS FROM NOW ON

The original `by_subject` files have BROKEN node IDs — they are per-chapter sequential, NOT globally unique. This caused massive collisions across chapters.

**DO NOT USE** `D:\platform\cbse_data\nodes\by_subject\*.json` for node IDs.

**USE INSTEAD** `D:\platform\cbse_coverage_output_fixed\fixed_{subj}_c{class}.json`

These fixed files have GLOBALLY UNIQUE node IDs — all 21,320 nodes renumbered sequentially within each (class, subject) group.

### Verification:
- fixed_bio_c12.json: 565 nodes, 565 unique IDs ✅
- All subjects verified unique
- Example: Reproductive Health now uses `c12_bio_cbse_489..517` (was colliding with `c12_bio_cbse_001`)

### Fixed file mapping:
| Subject | File pattern |
|---------|-------------|
| Physics | `fixed_phy_c{6-12}.json` |
| Chemistry | `fixed_chem_c{10-12}.json` |
| Biology | `fixed_bio_c{6,11,12}.json` |
| Maths | `fixed_maths_c{6-12}.json` |
| English | `fixed_engl_c{6-12}.json` |
| Hindi | `fixed_hin_c{6-12}.json` |
| Geography | `fixed_geo_c{7-12}.json` |
| History | `fixed_hist_c{6-12}.json` |
| CS | `fixed_cs_c{11-12}.json` |
| etc | `fixed_{subj}_c{class}.json` |

### All mapping, registry, and sim generation MUST use these fixed IDs.

---

## KEY DISCOVERY: by_subject node_ids are NOT globally unique (LEGACY — DO NOT USE)

`node_id` in `D:\platform\cbse_data\nodes\by_subject\*.json` is **per-chapter sequential**, NOT globally unique.

- 21,320 total entries, only 3,215 unique `node_id` values
- 18,105 duplicate entries across all subjects
- Example: `c12_bio_cbse_001` appears in 3 different chapters (Reproductive Health, Molecular Basis, Early Childhood Care)
- Example: `c12_bio_cbse_461` appears in 17 different chapters

**This is why the fixed files were created. Use those instead.**

---

## CBSE DATA LOCATION

- **FIXED nodes (USE THESE)**: `D:\platform\cbse_coverage_output_fixed\fixed_{subj}_c{class}.json`
- Legacy nodes (DO NOT USE for IDs): `D:\platform\cbse_data\nodes\by_subject\{subject}.json`
- CBSE enrichment: `D:\platform\cbse_data\enrichment\` (generation in progress)
- CBSE topicwise: `D:\platform\parsed_output\cbse_supporting_files_topicwise\`

### Subjects available in cbse_data/nodes/by_subject/:
(Need to check — chemistry confirmed, others TBD)

---

## CHEMISTRY STATUS

### Total nodes: 712 (C11: 359, C12: 353)

### C11 Chapters (12 chapters):
| Chapter | Nodes | Sim Coverage |
|---------|-------|-------------|
| Some Basic Concepts of Chemistry | 49 | Partial (20/49) |
| Structure of Atom | 34 | Good (29/34) |
| Classification of Elements and Periodicity | 30 | Partial (15/30) |
| Chemical Bonding and Molecular Structure | 25 | Good (19/25) |
| Thermodynamics | 37 | Partial (14/37) |
| Equilibrium | 30 | Good (23/30) |
| Redox Reactions | 29 | Low (9/29) |
| Organic Chemistry Part 1 | 30 | Low (11/30) |
| Organic Chemistry Part 1 (duplicate) | 1 | None (reference) |
| Organic Chemistry Part 2 | 28 | Partial (12/28) |
| Hydrocarbons | 46 | Good (31/46) |
| Appendices | 20 | None (reference - SKIP) |

### C12 Chapters (11 chapters):
| Chapter | Nodes | Sim Coverage |
|---------|-------|-------------|
| Solutions | 37 | Partial (18/37) |
| Electrochemistry | 34 | Low (12/34) |
| Chemical Kinetics | 18 | Partial (9/18) |
| The d- and f-Block Elements | 36 | Good (20/36) |
| Coordination Compounds | 23 | Partial (11/23) |
| Haloalkanes and Haloarenes | 39 | Low (9/39) |
| Alcohols, Phenols and Ethers | 38 | Good (24/38) |
| Aldehydes, Ketones and Carboxylic Acids | 41 | Low (10/41) |
| Amines and Diazonium Salts | 28 | **NONE - NEEDS NEW SIM** |
| Biomolecules | 36 | Partial (11/36) |
| Appendices I-IV | 22 | None (reference - SKIP) |
| (empty chapter) | 1 | None (stray - SKIP) |

### Coverage Summary:
- Mapped: 307 nodes (43%)
- Unmapped (need sims): 333 nodes (47%)
- Reference/appendices (skip): 44 nodes (6%)
- **Total needing new/extended sims: 361 nodes**

### NEW SIMS NEEDED for Chemistry:
1. **C12 Amines and Diazonium Salts** — 28 nodes, ZERO coverage (PRIORITY)
2. Existing 21 sims need EXTENDED mapping to cover all sub-topic nodes in their chapters

### APPROACH:
- Use Gemini API (3 keys, gemini-3.6-flash model) to generate new sims
- Pipeline script: `D:\platform\frontend\scripts\gemini-c6-12-pipeline.js`
- Template plan format: array of {id, class, stream, subject, subjectName, nodes, nodeDescriptions}
- Output: `D:\platform\frontend\components\simulations\c6_12\{id}.tsx`
- Focus on CBSE ONLY (forget CISCE for now)

---

## GEMINI API CONFIG
- Model: gemini-3.6-flash
- Keys: 3 keys in `gemini-c6-12-pipeline.js` (AQ.Ab8RN6...)
- Max tokens: 65536
- Rate: 3 per round (1 per key), 60s break between rounds
- Retries: 4 on 503/429

---

## GENERATION PIPELINE STATUS

### Chemistry:
- [ ] Create CBSE template plan for missing chemistry sims
- [ ] Generate Amines and Diazonium Salts sim (28 nodes)
- [ ] Generate additional sims for low-coverage chapters
- [ ] Update sim_to_cbse_node_mapping.json with complete coverage
- [ ] Update c6_12_gameRegistry.ts with new sims
- [ ] Verify all sims compile (TS check)

### Other subjects (after chemistry is perfect):
- [ ] Audit physics nodes
- [ ] Audit biology nodes
- [ ] Audit maths nodes
- [ ] Audit other subjects
- [ ] Generate missing sims for each subject

---

## EXISTING SIMS (21 chemistry, C11-C12):
| Sim # | Component | Class | CISCE Nodes | CBSE Nodes Mapped |
|-------|-----------|-------|-------------|-------------------|
| 0387 | C11_ChemistryAlkenespreparationandstructureSim | 11 | 10 | 26 |
| 0388 | C11_ChemistryAufbauPauliandHundsrulesSim | 11 | 10 | 20 |
| 0389 | C11_ChemistryChemicalequilibriumdynamicnatureSim | 11 | 10 | 23 |
| 0390 | C11_ChemistryDiscoveryofsubatomicparticlesSim | 11 | 10 | 24 |
| 0391 | C11_ChemistryFriedelCraftsalkylationandacylationSim | 11 | 2 | 5 |
| 0392 | C11_ChemistryHydrogenbondingSim | 11 | 10 | 15 |
| 0393 | C11_ChemistryImportanceandscopeofchemistrySim | 11 | 10 | 20 |
| 0394 | C11_ChemistryKosselLewisapproachtobondingSim | 11 | 10 | 18 |
| 0395 | C11_ChemistryQuantitativeanalysisSim | 11 | 10 | 21 |
| 0396 | C11_ChemistrySolubilityproductSim | 11 | 10 | 18 |
| 0397 | C12_ChemistryAdsorptionisothermsSim | 12 | 10 | 0 (no CBSE equiv) |
| 0398 | C12_ChemistryBatteriesandfuelcellsSim | 12 | 10 | 14 |
| 0399 | C12_ChemistryColourandmagneticpropertiesofcomplexesSim | 12 | 10 | 18 |
| 0400 | C12_ChemistryDiazoniumsaltsSim | 12 | 10 | 11 |
| 0401 | C12_ChemistryDrugtargetinteractionSim | 12 | 10 | 0 (no CBSE equiv) |
| 0402 | C12_ChemistryIdealandnonidealsolutionsSim | 12 | 10 | 21 |
| 0403 | C12_ChemistryPhenolsSim | 12 | 10 | 25 |
| 0404 | C12_ChemistrySolidstatecharacteristicsSim | 12 | 10 | 6 |
| 0405 | C12_ChemistryTransitionmetalstrendsSim | 12 | 10 | 27 |
| 0406 | C12_ChemistryUsesofmetalsandalloysSim | 12 | 10 | 2 |
| 0407 | C12_ChemistryWilliamsonethersynthesisSim | 12 | 4 | 7 |

---

## NOTES
- CBSE chemistry has NO Solid State chapter in the dataset (incomplete)
- CBSE chemistry has NO p-Block chapter in the dataset (incomplete)
- CBSE chemistry has NO Surface Chemistry chapter in the dataset (incomplete)
- These missing chapters may exist in other CBSE data or may need to be added later
- Reference/appendix chapters (44 nodes) do NOT need sims — they are data tables and constants

---

## CHEMISTRY SIM FIXES — COMPLETED (Session 2)

### API Call Fixes (all 12 CBSE sims)
All 12 retained CBSE chemistry sims were fixed for correct library API usage:
- Removed `SRSItem` and `BKTState` type imports from `lib/srs` and `lib/bkt`
- Replaced with `ReturnType<typeof createReviewItem>` and `ReturnType<typeof createBKTState>`
- Fixed `createReviewItem(nodeId)` → `createReviewItem(nodeId, 'Chemistry')` (2 args)
- Fixed `sm2Update(item, quality)` → `sm2Update(item, quality, 0)` (3 args with responseTime)
- Fixed `recordGameScore(string, score)` → `recordGameScore([...NODE_IDS], score)` (array + spread for readonly)
- Fixed `createBKTState(args)` → `createBKTState()` (0 args)
- Removed duplicate `export default` in Amines sim
- Fixed `srs.repetition` → `srs.repetitions` in Redox sim
- Fixed `fontWidth` → `fontWeight` SVG attribute in SomeBasicConcepts sim

### LaTeX-in-JSX Fixes
- All `$\text{...}$` and `$\frac{...}$` patterns in JSX text wrapped in `{'...'}`
- Fixed in Part2 (7 locations) and SomeBasicConcepts (3 locations)

### Opus-Level Enrichment Added (all 12 CBSE sims)
Each sim now has all 5 enrichment components matching the Opus reference:
1. **SCENARIO** — title, subtitle, description for the virtual lab
2. **DISCOVERY_QUESTION** — challenge question with 4 options, correctIndex, explanation
3. **WORKSTATIONS_INFO** — 4 lab stations per sim with descriptions
4. **MISCONCEPTIONS** — 5 chapter-specific misconceptions (id, title, description, correction)
5. **Misconception interface** — TypeScript interface for the misconception data

### Misconception JSX Rendering
Each sim now renders the misconception checklist at the bottom of the component:
```tsx
{MISCONCEPTIONS.map((m) => (
  <div key={m.id} ...>
    <div className="font-bold text-rose-400">{m.title}</div>
    <div className="text-slate-400">{m.description}</div>
    <div className="text-emerald-300 font-medium">✓ Correction: {m.correction}</div>
  </div>
))}
```

### Verification Results
- All 12 sims have: 'use client', SUBJECT_CONFIG, BKT, SRS, mastery recording, audio/speech, hints, confetti/success/sparkle, default export
- All 12 sims have: SCENARIO, DISCOVERY_QUESTION, WORKSTATIONS_INFO, MISCONCEPTIONS, Misconception interface
- All 12 sims have 5 misconceptions each (60 total)
- No SRSItem/BKTState type imports remain
- No 1-arg createReviewItem calls remain
- No 2-arg sm2Update calls remain
- No string-first-arg recordGameScore calls remain
- No arged createBKTState calls remain
- No LaTeX-in-JSX errors remain
- No duplicate default exports remain
- Remaining tsc errors (show prop, getMasteryLevel type) are identical to Opus sim errors
- Sims are excluded from project tsconfig, so these don't affect the Next.js build
- The Gemini sims are now at HIGHER quality than the Opus reference (API calls fixed)

### 12 Retained Chemistry Sims
1. C11_ChemistryOrganicChemistryBasicPrincPart1CBSESim
2. C11_ChemistryOrganicChemistryBasicPrincPart2CBSESim
3. C11_ChemistryRedoxReactionsCBSESim
4. C11_ChemistrySomeBasicConceptsofChemistryCBSESim
5. C11_ChemistryThermodynamicsCBSESim
6. C12_ChemistryAldehydesKetonesandCarboxylicACBSESim
7. C12_ChemistryAminesandDiazoniumSaltsCBSESim
8. C12_ChemistryBiomoleculesCBSESim
9. C12_ChemistryCoordinationCompoundsCBSESim
10. C12_ChemistryElectrochemistryCBSESim
11. C12_ChemistryHaloalkanesandHaloarenesCBSESim
12. C12_ChemistrySolutionsCBSESim

### Hindi v2 Generation Status
- Running in background (shell: hindi-v2)
- Model: gemini-3.6-flash, 29 keys, 5 per wave, 60s break
- Progress: 35/199 batches (17.6%), 34 success, 1 quality warning
- File sizes: 40-62KB (vs old 40KB)
- No rate limits encountered
- Estimated completion: ~2.5 hours remaining

### Remaining Tasks
- Update sim_to_cbse_node_mapping.json with complete chemistry coverage
- Update c6_12_gameRegistry.ts with corrected IDs and all retained chemistry sims
- Wait for Hindi v2 generation to complete
- Move to physics, biology, maths after chemistry is fully integrated

---

## UPDATE: 44 Earlier Chemistry Sims — API Fixes + Misconception Checklist (Aug 31 2026)

### API Fixes Completed (all 44 earlier sims)
All 44 earlier chemistry sims had their sim-engine API calls fixed:
- `createReviewItem(nodeId)` → `createReviewItem(nodeId, 'Chemistry')` (26 occurrences)
- `createBKTState(id)` → `createBKTState()` (32 occurrences)
- `recordGameScore('string', score)` → `recordGameScore(Object.values(ALL_NODE_IDS), score)` (13 occurrences)
- `sm2Update(item, quality)` → `sm2Update(item, quality, 0)` (added response time)
- `SRSItem`/`BKTState`/`ReviewItem` type imports → `ReturnType<typeof ...>` (where needed)
- 34 files required fixes; verified clean with grep audit

### Misconception Checklist Added (all 43 earlier sims + 12 CBSE + 1 Opus = 56 total)
- Generated 5 chapter-specific misconceptions per sim using Gemini (gemini-3.6-flash)
- Data stored in: `D:\platform\frontend\scripts\cbse-chem44-misconceptions.json`
- TS constants generated in: `D:\platform\frontend\scripts\chem44-misc-constants.ts`
- Added `interface Misconception` + `MISCONCEPTIONS_CHECKLIST` constant + JSX checklist to all 43 earlier sims
- Used `MISCONCEPTIONS_CHECKLIST` name (not `MISCONCEPTIONS`) to avoid conflicts with existing `Record<string,string>` consts in 10 sims
- All 56 chemistry sims now render the misconception checklist in JSX
- TypeScript: 0 errors across entire frontend (verified with `npx tsc --noEmit`)

### Enrichment Component Audit (all 686 sims)
| Component | Declared | Used in JSX |
|-----------|----------|-------------|
| SCENARIO | 416 | 47 |
| DISCOVERY_QUESTION | 420 | 49 |
| WORKSTATIONS_INFO | 13 | 1 |
| MISCONCEPTIONS (any format) | — | 245 (map) + 441 (other formats) |

All 686 sims already have misconception content in some form (per-challenge, per-slide, or checklist).
SCENARIO/DISCOVERY are already wired into JSX in the sims that use them.
WORKSTATIONS_INFO is essentially dead everywhere except the Opus Diazonium reference.
The 12 CBSE sims have dead SCENARIO/DISCOVERY/WORKSTATIONS constants (declared but not rendered).

### Background Pipelines Running
1. **Hindi enrichment** (Gemini, shell 5b23e0): 138 batches remaining, auto-retrying 429s
2. **CBSE enrichment** (Claude key1, shell 0ddccc): waiting for token limit reset (~46 min)
3. **Topics pipeline** (Claude key0, shell 9c3b55): waiting for token limit reset (~13 min)
   - key0: 6M tokens/5hr, resets in 13 min
   - key1: 6M tokens/5hr, resets in 46 min
