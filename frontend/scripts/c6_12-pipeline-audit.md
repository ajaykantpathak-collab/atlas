# C6-C12 Pipeline — Issues Found During Audit

## STATUS: NOT READY TO RUN — 5 issues must be fixed first

---

## ISSUE 1: Enrichment loader is completely broken (CRITICAL)

**Problem:** The `loadEnrichment()` function in `gemini-c6-12-pipeline.js` looks for files named like `c12_phy_001_definition.marker` (per-node files). But the actual enrichment files are named `c12_physics_enrichment_part1.marker` and contain ALL nodes in one file, separated by `--- NODE c12_phy_001 ---` markers.

**Impact:** Zero enrichment data will be loaded. Gemini will generate components without definitions, ELI5 explanations, misconceptions, or diagnostic questions. Quality will be significantly lower.

**Fix needed:** Rewrite `loadEnrichment()` to:
1. Find all enrichment part files for the class+subject (e.g., `c12_physics_enrichment_part*.marker`)
2. Read each file
3. Parse the `--- NODE <nodeId> ---` sections
4. Extract only the sections matching the template's node IDs
5. Return the combined enrichment text

**File naming patterns discovered:**
- Physics: `c{class}_physics_enrichment_part{N}.marker`
- Biology: `c{class}_biology_enrichment_part{N}.marker`
- Chemistry: `c{class}_chemistry_enrichment_part{N}.marker`
- Maths: `c{class}_maths_enrichment_part{N}.marker`
- CS: `c{class}_cs_enrichment_part{N}.marker`
- Accountancy: `c{class}_acc_enrichment_part{NN}.marker`
- Economics: `c{class}_econ_enrichment_part{NN}.marker`
- History & Civics: `c{class}_histciv_enrichment_{NNN}.marker`
- etc. (pattern varies slightly by subject)

**Subject code to directory mapping needed:**
The enrichment files use full subject names (`physics`, `biology`, `chemistry`) while node IDs use short codes (`phy`, `bio`, `chem`). The mapping must handle this.

---

## ISSUE 2: Generated components won't be registered in the app (CRITICAL)

**Problem:** The `gameRegistry.ts` file has 136 registered games but NONE reference the `c6_8`, `c9_12`, or `c6_12` directories. The existing C6-8 and C9-12 simulations are NOT registered. Generated components will exist as files but won't be accessible in the app.

**Impact:** Users won't be able to access any generated C6-C12 components. They'll be dead files.

**Fix needed:** After generation, create a registry update script that:
1. Reads the master template plan
2. For each template, creates a dynamic import and GAMES array entry
3. Maps all node IDs to the component
4. Updates `gameRegistry.ts` (or creates a separate `c6_12-registry.ts`)

**Note:** The existing C6-8 and C9-12 simulations also need registration. This is a pre-existing problem, not caused by the new pipeline.

---

## ISSUE 3: SUBJECT_CONFIG is missing most subjects (MODERATE)

**Problem:** `SUBJECT_CONFIG` in `topicGraph.ts` only has 7 subjects: `maths`, `physics`, `chem`, `bio`, `evs`, `cs`, `geo`. But the template plan uses 24 subject codes. The generated components will import `SUBJECT_CONFIG[subject]` and get the fallback `{ name: subject, emoji: '📚', color: '#888888' }` for most subjects.

**Impact:** Components will work but with wrong subject names, generic emoji, and gray color. Not a breaking issue but visually wrong.

**Fix needed:** Either:
1. Add all 24 subjects to `SUBJECT_CONFIG` in `topicGraph.ts`, OR
2. Change the prompt to tell Gemini to use the fallback gracefully, OR
3. Map subject codes to the existing SUBJECT_CONFIG keys (e.g., `phy` → `physics`)

**Subject code mapping needed:**
- `phy` → `physics` ✓ (exists)
- `math` → `maths` ✓ (exists)
- `chem` → `chem` ✓ (exists)
- `bio` → `bio` ✓ (exists)
- `cs` → `cs` ✓ (exists)
- `evs` → `evs` ✓ (exists)
- `geo` → `geo` ✓ (exists)
- `acc`, `bs`, `econ`, `econapp`, `comm`, `commapp`, `commstud` → MISSING (commerce)
- `hist`, `histciv`, `pol`, `psy`, `soc`, `home`, `legal`, `massmedia` → MISSING (humanities)
- `biotech`, `appmath` → MISSING (science electives)

---

## ISSUE 4: Output directory strategy is unclear (MODERATE)

**Problem:** The pipeline writes to a NEW directory `c6_12/`. But existing C6-8 simulations are in `c6_8/` and C9-12 are in `c9_12/`. This creates three separate directories for C6-C12 content.

**Impact:** 
- The new `c6_12/` directory won't conflict with existing files (good)
- But the app may not know to look in `c6_12/` for components (bad)
- Existing C6-8 and C9-12 files won't be replaced (could be good or bad depending on quality)

**Options:**
1. **Use `c6_12/` (current plan):** Clean separation, no conflicts, but needs new registry entries
2. **Use `c6_8/` for C6-8 and `c9_12/` for C9-12:** Replaces existing files, uses existing directory structure, but may overwrite working components
3. **Use class-specific dirs (`c6/`, `c7/`, etc.):** Most organized but requires more registry work

**Recommendation:** Use `c6_12/` (current plan) and create proper registry entries. Don't overwrite existing working files.

---

## ISSUE 5: One template has only 1 node (MINOR)

**Problem:** `C10_AppliedMathsLogicReasoningPropositionsSim` has only 1 node. The generator should have merged it with adjacent templates, but there was no adjacent appmath template to merge with.

**Impact:** Minor — the component will be simpler but still valid. The prompt will be small and Gemini should handle it fine.

**Fix needed:** None critical. Could merge with C10 maths templates if desired, but not necessary.

---

## ISSUE 6: Import path depth must be verified (MINOR)

**Problem:** The prompt tells Gemini to use `../../../lib/srs` etc. This is correct for `c9_12/` depth. The new `c6_12/` directory is at the same depth (`components/simulations/c6_12/`), so the import paths should work.

**Status:** Verified — `c6_12/` is at the same directory depth as `c9_12/`. Import paths `../../../lib/...` are correct.

---

## ISSUE 7: Gemini API model name verification (MINOR)

**Problem:** The pipeline uses model name `gemini-3.7-flash`. The Google docs confirm this is the correct model code. The API endpoint `generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent` is the correct format for Google AI Studio API keys.

**Status:** Verified — model name and endpoint are correct.

---

## SUMMARY: What must be fixed before running

| # | Issue | Severity | Fix needed |
|---|-------|----------|------------|
| 1 | Enrichment loader broken | CRITICAL | Rewrite to parse part files |
| 2 | No registry for generated components | CRITICAL | Create registry update script |
| 3 | SUBJECT_CONFIG missing subjects | MODERATE | Add subjects or use mapping |
| 4 | Output directory strategy | MODERATE | Decide (c6_12/ is fine) |
| 5 | 1-node template | MINOR | No fix needed |
| 6 | Import paths | VERIFIED | No fix needed |
| 7 | Gemini API model name | VERIFIED | No fix needed |

**Bottom line: Issues 1 and 2 MUST be fixed before running. Issue 3 should be fixed for quality. Issues 4-7 are minor or already verified.**
