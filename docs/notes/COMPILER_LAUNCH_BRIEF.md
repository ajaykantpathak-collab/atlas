# COMPILER LAUNCH BRIEF — fire the moment any of the 6 running agents lands

Launch with this exact prompt (add: "NOTE: other agents may be working in
backend/its/solver/maths_drill_gen.py, numericals_drill_gen.py,
api/teacher_analytics.py, id_resolution.py, class-10 sims — do not touch
their files"):

---
You are working in D:\platform (K-12 CBSE platform "Atlas"). Frontend at
D:\platform\frontend (dev :3000), backend at D:\platform\backend.

MISSION: Build the diagnostic-to-SimDef COMPILER — the machine that converts
every enhanced node's own authored teaching content into playable v2 SimDefs,
closing the depth gap for the ~5,140 MISSING + 1,838 PARTIAL nodes.

READ FIRST:
1. frontend/components/sims_v2/engine/types.ts — the SimDef schema (phases
   discover/teach/explore/predict/play/reflect/results; challenge types
   mcq/sort/order/count/interact/math_input/subpart; hint + misconception +
   workedExample per challenge; nodeIds[] + chapters[] on the SimDef)
2. frontend/components/sims_v2/engine/SimPlayer.tsx + generators.ts +
   lexgen.ts — how data-driven content renders; mirror their entry patterns
3. One subject sample each: frontend/components/sims_v2/class6/science.ts and
   class6/social.ts (real SimDefs to imitate)
4. The content source: backend/_cache/enhanced_nodes_index.json — 9,010 node
   dicts (node_id, class, subject, chapter, definition, walkthrough,
   diagnostics[5-6: {question, answer, misconception}], mastery_criteria)
5. The depth targets: backend/its/competency/CLASS6..12_NODE_DEPTH.json —
   per-node verdicts + uncovered_diagnostics (your priority queue)

COMPILER DESIGN (backend/its/competency/simdef_compiler.py, deterministic,
seeded by chapter cluster hash):
1. CLUSTER: group nodes by chapter (c6_math_ch05_*) → one SimDef per chapter
   cluster covering 5-15 nodes (a 5-8 min lesson)
2. PER NODE → CONTENT:
   - definition → 1-2 TeachingSlides (senior mode: KaTeX where formulas)
   - walkthrough steps → workedExample[] on the hardest challenge
   - diagnostics → PLAY challenges:
       q with numeric answer → math_input (tolerance matched)
       q with option-shaped key → mcq + 3 distractors via the MCQ
         synthesizer pattern (backend/its/solver/mcq_distractors.py logic —
         reuse, do not re-invent)
       q asking to order/classify/match → sort/order challenges built from
         the diagnostic's own terms
   - misconception field → the reveal on the wrong-answer path
3. FRAMING: one discover-hook line per cluster (curiosity question from the
   chapter title) — author-first, short; scenario block optional
4. PURITY GUARD: nodes with <3 usable diagnostics or ambiguous keys are
   SKIPPED and listed for human authoring (never force-generated)
5. OUTPUT: SimDefs as TS data modules in
   frontend/components/sims_v2/generated/<class>_<subject>_gen.ts exporting
   typed SimDef arrays + a GENERATED_INDEX.json (cluster → simId, nodeIds,
   coverage) + a review list REVIEW_NEEDED.json (skipped nodes + why)
6. WIRING: register the generated index so SimPlayer can route to them
   (follow how class1-6 index.ts files aggregate — create
   frontend/components/sims_v2/generated/index.ts; do NOT modify existing
   class files)

SCALE: run over ALL classes 6-12 (9,010 nodes; ~5,140 MISSING + 1,838
PARTIAL as priority order — MISSING first). Target: ~5,000 nodes covered as
compiled SimDefs (600-900 cluster SimDefs).

QUALITY BAR (the anti-boring rules):
- Content comes from the node's OWN diagnostics (authored, board-informed) —
  never generic template trivia
- Challenge type variety within every cluster (mcq + one sort/order + one
  math_input minimum where content allows)
- Deterministic (seeded cluster hash; byte-identical re-runs)
- Senior mode (KaTeX/math_input) for classes 9-12; junior mode for 1-5

GATES:
- `cd D:/platform/frontend && npx tsc --noEmit 2>&1 | grep -vE "premium/KnowledgeGraph3DReal|buddy-preview"` → only known/other-agent errors
- SimPlayer renders 3 sampled generated SimDefs without crash (import smoke)
- Coverage report: nodes before → after (playable via generated sims)
- Zero fabricated content: every challenge traceable to a node diagnostic

DO NOT TOUCH: existing class1-6 subject files, engine files (except reading),
three/, c6_12/, backend solver (except reading), other agents' files.

REPORT BACK: nodes covered (count), clusters emitted, skipped-for-review
list size + top reasons, typecheck result, 3 sample SimDef summaries.
---
