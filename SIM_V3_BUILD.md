# SIM V3 BUILD — execution order (follow top to bottom, no skips)

Spec: SIM_V3_SPEC.md (binding). This file is the command loop: build in
order, run the gate at each checkpoint, do not proceed on a red gate.

## STATUS (autonomous pass 1 — done)

| Step | Result |
|---|---|
| Engine: types + interact→lab + misconception branch + subpart options + BeatsRunner (6 beat types render) | ✅ tsc clean |
| BKT: COGNITIVE_LEVEL priors + propagateEvidence (edge-weighted) | ✅ lib/bkt.ts |
| Validator `tools/validate_sims.mjs` (executes all SimDefs, §7 gates) | ✅ runs all 12 classes |
| Generator audit bugs | ✅ already fixed upstream (verified) |
| `build_simdefs.mjs` — md→SimDef per chapter | ✅ 801 sims, classes 6-12 |
| `wrap_masters.mjs` — masters in v3 shell w/ real diagnostics | ✅ 617 sims (163 unmapped skipped) |
| Registry `sims_v2/index.ts` + route `/sims-v2/[id]` | ✅ mounted, senior mode ≥6 |
| Node coverage 6-12 | ✅ ~99% of parseable corpus (8,967/9,010); 4 chapters skipped — placeholder-only source diagnostics |
| Gate: `validate_sims.mjs --new-only` | ✅ 0 errors on 1,714 sims |

## STATUS (autonomous pass 2 — manual fixes, no LLM)

| Fix | Result |
|---|---|
| All-node challenge coverage (was capped at 8) + `sampleChallenges` rotation for long chapters | ✅ every node's diagnostics emitted |
| Mission beats wherever a lab binds | ✅ 231 lab-bound chapters get do-first missions |
| Senior generators: percent, ratio, si, exponent, linear2 | ✅ +5 kinds; validator caught collisions, fixed to Set-guarded uniqueness — 0 bad/200 seeds × 20 kinds |
| Telemetry: route `onEvent` → `POST /api/intelligence/interaction` | ✅ wired, fail-safe |
| Subject normalisation (phy→physics etc.) | ✅ canonical names, verified no cross-subject mixing |
| Skipped chapters | ✅ 3 of 4 recovered via new wrong-answer extraction patterns; `c7_hist_ch08` (10 nodes) left uncovered — prose-only answers can't be honestly tap-answered |

## RUN-BOOK (regenerate everything, no intervention)

```
node components/sims_v2/tools/build_simdefs.mjs          # md → chapter sims
node components/sims_v2/tools/wrap_masters.mjs           # masters → wrapped
node components/sims_v2/tools/validate_sims.mjs --new-only   # gate — must be 0 errors
node components/sims_v2/tools/score_sims.mjs --new-only      # quality score — target ≥9.5
npx tsc --noEmit                                         # compile gate
```

## SCORE HISTORY (tools/score_sims.mjs --new-only)

| pass | mean | what moved it |
|---|---|---|
| baseline | 6.41 | scorer introduced — deficits measured, not guessed |
| +remediation/discovery/nodeId fixes | 8.37 | ON_FAILURE prose→steps, discovery extraction over all nodes, w_* nodeIds |
| +beats on wrapped masters | 8.87 | scaffold/case beats on v3w, retest variants |
| +variety fallbacks + flow/timeline scenes | 9.49 | dissect/build/case fallback chain; 11 new canvas scenes (efield, lens, wave, graph, gas, titrate, emag, vector, equilibrium, timeline, flow) |
| +subject-level world fallback | **9.93** | 797/804 chapters world-bound; w_* dupes dropped (v3w supersedes) |

## REMAINING

1. c7_hist_ch08 (10 nodes) — needs authored content, not extraction.
2. Legacy debt — 359 errors in old deep.ts-family sims; regenerate through
   the v3 builder or quarantine.
3. SRS surface — sm2 items update in-session; expose "review due".
4. Browser smoke — open /sims-v2/v3_c6_physics_ch11 and one wrapped master
   to eyeball beats + remediation firing.


## Phase 0 — engine groundwork (unblocks everything)

| # | Task | Gate |
|---|------|------|
| 0.1 | types.ts: add `TeachBeat` (mission/scaffold/case/dissect/build/drill), `MCQOption {text, reveals}`, `SubPart.options`, `Challenge.remediation` | tsc clean |
| 0.2 | SimPlayer: interact challenges render CanvasLab when `interactGoal.widget` is a LABS key | interact vs lab validates |
| 0.3 | SimPlayer: MCQ wrong-pick → misconception lookup → remediation beat → retest item (generator or pool) → resume | branch fires on seeded wrong |
| 0.4 | SimPlayer: subpart `options` variant (tap-answer) | tsc clean |
| 0.5 | generators.ts: fix 4 audit bugs — genPlace ambiguity, genArea/Perimeter dup options, genMoney zero-change, lex sort degenerate | 200-seed run per kind, 0 bad |
| 0.6 | bkt: priors by COGNITIVE_LEVEL; sm2 review item per nodeId at results; edge propagation ×0.25 | unit smoke |

## Phase 1 — validator (the perfection mechanism)

`tools/validate_sims.py` (or .ts runner): imports every SimDef, executes
every check in SPEC §7, prints per-sim PASS/FAIL + corpus score.
Gate: it must FAIL current sims_v2 where they deserve to fail (deep.ts
truncation, prose subpart answers, missing reveals). If it passes garbage,
the validator is wrong — fix the validator first.

## Phase 2 — class 1 (prove the loop on the strongest corpus)

- 2.1 Exemplar: upgrade ONE c1 sim to full spec (orientation ≤2, ≥1 beat,
  observe+predict, ≥3 misconception-keyed MCQs, 1 interact, reflect).
  Show before/after. Gate: validator PASS + eyeball on screen.
- 2.2 Batch: remaining ~28 class-1 sims upgraded the same way.
  Content per sim: 1 discovery, ≤2 orientation, 1-3 beats, explore,
  observe, predict, 6-9 challenges (mixed types, all with nodeId+tier),
  reflect. Gate: corpus score 100%, tsc clean.

## Phase 3 — classes 2-5 (same loop, ~97 sims)

Same per-sim content budget. Junior mode keeps mascot+speech; beats adapt
(mission→guided tap tasks, scaffold→simple fading, case→pick-and-see).
Gate per class: validator 100%, spot-check 3 sims rendered.

## Phase 4 — classes 6-12 (~1,000 chapters)

- 4.1 Worlds: extend LABS/SCENES toward ~40 covering the highest-node-count
  clusters first (circuit, optics, mechanics, graph, cell, reaction,
  titration, field, wave, function-transform).
- 4.2 Wrap masters: c6_12 rich sims mount via `explore.component`
  (C6_WRAPPED pattern). Each gets a v3 shell SimDef: beats + misconception-
  keyed challenges + nodeIds from SIM_NODE_MAP. NEVER rewrite a master
  (SPEC protect rule).
- 4.3 Generate: per chapter with no master, Gemini pipeline (39-key pool,
  grounded on that chapter's md files) emits the SimDef. Order by
  world-fit × node count × STRUGGLE_MAP frequency.
- 4.4 Every generated file MUST pass the validator before commit.

## Per-sim content budget (all classes)

orientation ≤2 slides · 1-6 beats (1 per node or node-cluster) ·
discovery 1 · observe 1 · predict 1 (when lab bound) · challenges 6-12:
≥2 interact where a world/widget exists, ≥3 misconception-keyed MCQ,
≥1 subpart/math_input (senior), generator or ≥2 alternates per
misconception · reflect 1 · real nodeIds, real chapters.

## Standing rules

- After each phase: update this file's status + SIMS_V2_QUALITY.json re-run.
- Never drop a mechanism to ship faster — a sim missing beats/reveals is
  a failed sim, not a partial one.
- Masters are wrapped, never rewritten. Line-count drop = regression.
