# SIM V3 SPEC — adaptive teaching sims (binding)

Owner goal: class 1-12 sims that TEACH through interaction, where every
student action feeds BKT. Slides are orientation only — the teaching lives
in instrumented activity beats. This file is the contract; SIM_V3_BUILD.md
is the execution order. Any sim or engine change that violates this spec
is a regression — fix or revert.

## 1. Core architecture

Three levels, strictly separated:

    WORLD   — one deep manipulable model (circuit bench, optics bench,
              cell explorer, mechanics sandbox, graph world). Rendered by
              the engine from a LabSpec/Scene. Hosts many nodes' missions.
              Persists across chapters — recurring instrument = the
              "interconnected" feel.
    NODE    — the teaching atom. One concept: its beats, diagnostics,
              misconceptions, remediation, edges. Maps 1:1 to an
              enhanced-node md (nodeId).
    GRAPH   — routing. BUILDS_ON / LEADS_TO / prereq edges walk the
              student across nodes and worlds. Lives in the engine,
              not inside any sim.

NEVER: one sim per subject (monolith, unfocused, unvalidatable).
NEVER: one sim per node (10.5k fragments, no transfer).
ALWAYS: one SimDef per chapter/concept-cluster, bound to a world, listing
the nodes it teaches.

## 2. TeachBeat — teaching is activity, not slides

`teaching` becomes an ordered list of beats. Six method types; the engine
renders each once, every sim inherits all:

| Beat     | What student DOES                    | Best for            | md source              |
|----------|--------------------------------------|---------------------|------------------------|
| mission  | Manipulate world to a validated goal | physics/chem/STEM   | WALKTHROUGH scenario   |
| scaffold | Worked-example fading (I→we→you→variant) | math, problem-solving | WORKED_EXAMPLE_* steps |
| case     | Branching decision + consequence     | history/civics/eco  | WALKTHROUGH + DIAGs    |
| dissect  | Zoom specimen → identify → predict   | biology             | DIAGs as identify-tasks|
| build    | Constrained construction (sentence/equation/diagram) | language/CS/geometry | DIAGs → error-spotting |
| drill    | Spaced retrieval, generated variants | facts/formulas      | generate.kind          |

Rules:
- Every beat emits telemetry (choice, attempts, ms). Teaching = signal.
- Slides survive ONLY as `orientation`: max 2 slides, ≤25 words each,
  shown once before the first beat. If a slide can be a beat, it must be.
- Beat selection per node is driven by the node's COMPUTATION_TYPE:
  conceptual→case/dissect, arithmetic/algebraic→scaffold+drill,
  geometric→build, linguistic→build, statistical→drill.

## 3. Challenges — misconception-keyed, not generic

- MCQ options carry `reveals` — the misconception a wrong pick exposes
  (authored from the node's DIAGNOSTIC_ANSWER "wrong answer reveals X").
- `interact` goals may target widgets OR labs — engine must render either
  and `validateGoal` checks live state.
- `subpart` parts get `options` (tap-to-answer) — typed exact-match is
  only for short numeric/one-word answers. Prose answers are FORBIDDEN.
- Every challenge carries `nodeId` + `difficulty` (foundation|standard|
  advanced) — mandatory, no silent default.
- `generate.kind` supplies retest variants. Where no generator exists,
  the sim must ship ≥2 alternate items per misconception (item pool).

## 4. Adaptive loop (engine)

After EVERY answer:
  bktUpdate(node) → getRecommendedDifficulty(pKnown) →
  bubble matching-tier challenge forward (exists — keep) →
  on wrong: misconception lookup → remediation branch:
      targeted mission/scaffold beat from that misconception →
      fresh retest item (generator or pool) →
      only then resume main line.
  pKnown < 0.3 → getAdaptivePath prereq check (exists) → surface the
  prereq node as a mini-loop, not a popup.

Mastery gate: node completes when its diagnostics pass at standard tier.
Forward edges unlock the next SimDef/node.

## 5. BKT upgrades

- Keep createBKTState/bktUpdate. Add:
  a. Priors by COGNITIVE_LEVEL (remember: pGuess higher; create: lower).
  b. Decay: pKnown decays with days-since-review — lib/srs sm2Update
     already exists; wire review items per nodeId at results.
  c. Edge propagation: evidence on a node updates prereq/successor
     pKnown at a damped weight (e.g. ×0.25 per edge hop).
- Confidence gate (sure/guessing) stays — it corrects pGuess/pSlip.

## 6. Content source of truth

`Desktop/enhanced_nodes/md_cache/*.md` → per node:
  DEFINITION        → orientation/beat text (never truncated mid-sentence)
  WALKTHROUGH       → mission/case scenario framing
  DIAGNOSTIC_Q+A    → challenges + per-distractor `reveals`
  COMMON_MISCONCEPTION + ON_FAILURE → remediation branch
  WORKED_EXAMPLE_*  → scaffold beat steps
  PREREQUISITE_*/FORWARD_* → edges
  COMPUTATION_TYPE  → beat selector

## 7. Quality gates (validator must check ALL)

Per SimDef, executed not eyeballed:
  [ ] every challenge answer ∈ options (or matchable per type rules)
  [ ] every interact validate string resolves to real widget/lab keys
  [ ] every referenced lab/widget/scene exists
  [ ] every nodeId resolves via /api/nodes (or md_cache index)
  [ ] every MCQ has ≥1 distractor with `reveals`; all reveals non-empty
      and distinct
  [ ] no string truncated mid-word; no 'Steps: N' placeholder answers
  [ ] generator kinds execute: run 200 seeds — zero ambiguous stems,
      zero duplicate options, zero degenerate outputs
  [ ] beats present: ≥1 method beat per node; orientation ≤2 slides
  [ ] observe + predict phases populated when a lab is bound
  [ ] senior sims (class≥6): ≥1 subpart or math_input or interact
  [ ] npx tsc --noEmit clean for sims_v2

## 8. File layout

  frontend/components/sims_v2/
    engine/        types.ts (+AdaptiveSimDef/TeachBeat/MCQOption.reveals)
                   SimPlayer.tsx (beat renderers, remediation branch)
                   canvasLab.tsx (world LabSpecs), widgets.tsx
                   generators.ts (+senior kinds), lexgen.ts, validate.ts?
    worlds/        NEW — world LabSpec/Scene defs shared across classes
    class1..class12/<subject>.ts — SimDef data
    tools/validate_sims.py — the gate runner
    SIM_V3_SPEC.md (this), SIM_V3_BUILD.md (order)

## 9. Anti-patterns (instant reject)

- Teaching conveyed only by text/slides.
- MCQ without misconception-keyed distractors.
- Fake interact (no validation), decorative controls, canned numbers.
- Per-sim bespoke React components when a world/beat suffices.
- Copy-pasted misconceptions across challenges.
- Any sim that fails the validator.
