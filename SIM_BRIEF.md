# SIM BRIEF -- how to build world-class simulations (binding)

## Mission
One sim = one chapter concept, made touchable. A class-N student opens it
and UNDERSTANDS through manipulation, not reading. Every sim must feel
alive, respond instantly, and be numerically truthful.

## Component contract (non-negotiable)
- Location: frontend/components/simulations/c6_12/<SuggestedName>.tsx
- Named export + `export default`; React function component; no external
  deps beyond react + tailwind classes; self-contained.
- DEPTH STANDARD (revised after owner review): match the richness of the
  best existing sims — the 1,500-2,500 line masters (e.g.
  C10_ChemistryAlloysandamalgamsSim.tsx). A new sim should have multiple
  panels/views, layered controls (basic + advanced), rich numeric readouts,
  animated state transitions, a guided "What to try" section and a
  misconception killer. Typical depth: 800-2,500 lines. A 200-line sim is
  a STARTING POINT, never a finished sim — deepen it or do not ship it.
- Read 2 reference sims before your first file (a c6_12 sim + one you
  wrote yourself for consistency).
- Every file MUST pass the typescript transpile check with ZERO
  diagnostics before you move on. NEVER write via shell heredocs
  (transport corrupts backslash sequences) -- Write/Edit tools only.

## Pedagogy (what makes it 9.5/10)
1. ONE concept per sim. Depth over coverage.
2. Exploration-first: the student changes something and OBSERVES the
   consequence before any text explains it. Lead with the control.
3. Real numerics: the physics/math must be correct (right formulas,
   right units, plausible ranges). A sim that lies teaches wrong.
4. Show the quantity: label live values (speed, angle, concentration)
   with units next to the visualization, updating as the student plays.
5. Guided discovery: a "What to try" footer with exactly 2 challenges
   ("Set the angle to 45 degrees -- what happens to the range?").
6. Misconception killer: include the ONE thing students get wrong about
   this concept (e.g. "heavier objects fall faster" -- show they don't).

## Interaction requirements
- At least 3 distinct controls: sliders (input range), buttons, toggles,
  dropdowns, or click/drag on the SVG/canvas itself.
- State transitions animated: CSS transitions on numeric-driven styles,
  requestAnimationFrame for continuous motion (waves, projectiles,
  orbits). Nothing jumps discretely when it should flow.
- Immediate feedback: every control changes the picture within one frame.
- A reset button.

## Design system (match the app)
- Tailwind classes; slate-950/900 surfaces, slate-100 text, indigo/violet
  accents, emerald for correct, rose for wrong, amber for hints.
- rounded-2xl/3xl cards, border border-slate-800, bg-slate-900/70.
- Touch-friendly: controls min-h-11 (44px). Responsive: single column,
  SVG viewBox scaling (preserveAspectRatio), no fixed pixel widths.
- Text: short sentences. Labels on everything. No walls of text -- max
  3 lines of explanation before the student touches something.

## Protect rule (binding, added after the C10 alloys regression)
NEVER shrink, simplify, or rewrite an EXISTING working sim to make it
match this brief. If an existing file is longer or richer than the
contract above (some are 1,500-2,500 lines), that richness is the
product -- improve IN PLACE: fix bugs, add controls, deepen numerics,
but preserve every existing interactive element, panel, and animation.
A line-count drop vs the current file is a regression: halt, restore
from the latest backup (e.g. chem_upgraded/), and re-plan. Check
`git diff --stat` (or line counts before/after) before declaring done.

## Anti-patterns (instant reject)
- Decorative controls that change nothing. Fake data. Lorem text.
- Hardcoded result numbers instead of computing them from inputs.
- Dense paragraphs. External image/network assets. setTimeout-driven
  logic that desyncs from state.

## Self-review checklist (per file, before transpile check)
[ ] Does the visualization update on EVERY control change?
[ ] Are units shown next to every live number?
[ ] Is the math/physics correct? (derive once by hand)
[ ] 2 challenges in the footer? 3+ controls? Reset button?
[ ] Would a 13-year-old know what to touch first?
