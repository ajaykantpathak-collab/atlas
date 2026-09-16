# PENDING.md -- what remains for end-to-end competency + MCQ coverage

Status line for this file's baseline (updated 2026-09-08, after the
symbolic channel + multi-part splitter + round-3 families landed):

- Full suite: 755 passed, 0 failed. Corruption scan clean.
- Dev benchmark (363/400 frozen items): 49.6% raw verified, ~66%
  solver-scope adjusted, ZERO wrong answers.  The last 37 items complete
  automatically on a stable runtime via the resume command in
  `backend/tools/competency90_benchmark.py` (poison-item quarantine is
  built in).
- Held-out gate (2,416 sealed questions) NOT yet run -- it runs only
  after the pool definition is frozen and dev is >= 90%.

---

## A. MISSING FOR END-TO-END COMPETENCY / MCQ ANSWERING

### A1. Official-key coverage at scale (biggest lever, no math needed)
The honest answer to a conceptual MCQ is the BOARD'S KEY, not a guess.
`official_answers` table holds 535 rows; the bank holds 48k+ questions.
- [ ] Mine marking schemes (MS docs, cbse_ms_*) into
      `official_answers` with question fingerprinting:
      normalized stem hash + option-value fingerprint.
- [ ] Fingerprint matcher: incoming MCQ -> lookup key -> VERIFIED_OFFICIAL.
      Deterministic, zero-wrong, covers ALL conceptual MCQs with keys.
- [ ] Key-coverage metric: % of bank MCQs with a matched key
      (target: > 90% of served MCQs).

### A2. MCQ stem/option normalization
PDF options arrive mangled: `(a) 0.0001`, `A. ...`, missing markers,
merged lines, Devanagari MCQs.
- [ ] Extend `mcq_solver.parse_numeric_options` to: markerless options,
      A./B./C. with period-splits, image-placeholder options (refuse
      honestly), roman-numeral options.
- [ ] Stem cleanup: drop trailing option blocks before family matching
      (today only the guided path benefits; stems should be clean
      BEFORE classify).

### A3. Structural MCQ solvers (deterministic, no keys needed)
Generators exist (`question_types.py`) but SOLVERS for the formats don't:
- [ ] Assertion-Reason solver: evaluate A and R independently through the
      pipeline, then the standard 4-option logic (both true, R explains A).
- [ ] Statement-based (I, II, III correct?) solver: evaluate each statement,
      map true-set to the option combination.
- [ ] Match-the-following solver: evaluate each pair, map to option codes.
- [ ] "Which of the following is NOT correct" negation handling (compute
      each option, select the odd one) -- today only exact-value matching
      exists in `mcq_solver`.

### A4. Conceptual-MCQ escrow path (LLM proposes, key disposes)
For conceptual MCQs WITHOUT keys: an LLM may PROPOSE an answer, but the
label stays AMBIGUOUS/QUEUE until a key or human confirms (escrow rule).
- [ ] Proposal pipeline writing to the adoption queue (`adoption.py`),
      never surfacing unconfirmed LLM output as VERIFIED.

### A5. Figure/Diagram MCQs (currently honest refusals)
- [ ] Vision ingest: figure -> structured values (labelled diagram OCR),
      gated the same way: values extracted deterministically, else refuse.
- [ ] Then lift the H1 figure short-circuit for questions whose figures
      were successfully structured.

### A6. Hindi/ bilingual MCQs
- [ ] Devanagari normalization + a Hindi intent lexicon; numeric MCQs in
      Hindi should route through the same slot/mcq gates.

### A7. Runtime + benchmark hygiene
- [ ] Fix the ML runtime (torch/sklearn native segfaults at warm-up):
      clean reinstall / pinned CPU wheels. Currently retries + poison
      quarantine mask it.
- [ ] Freeze the pool definition (solver-scope vs raw) BEFORE the final
      held-out run; record the decision in the benchmark header.
- [ ] Complete the 400-item dev sample; then run the held-out gate.

---

## B. REMOVING THE REGEX DEPENDENCY

Current state: computation is real (CAS + closed forms + linear solves),
but TRIGGERING is sentence-pattern matching (one regex per family) plus a
slot-schema v1 (`slot_schema.py`, 17 dimension signatures) that already
matches by STRUCTURE instead of phrasing.

### The target architecture
A question is understood as DATA, not text:
1. EXTRACT: quantities with units (`unit_registry`), entities (species,
   shapes, components), the ASK (dimension + requested output unit),
   relations (A depends on B), context words (cylinder, dice, AP...).
2. MATCH: family = schema {required dims/slots, context, formula}.
   A question matches when its extracted slots SATISFY the schema --
   never because the sentence matched a pattern.
3. SOLVE: whichever slot is missing is the unknown; binder solves
   (linear solve, CAS, or closed form). Zero-wrong gates unchanged.

Regex then shrinks to exactly two narrow jobs: tokenizer edge cases and
fast-path pre-filters -- both removable once the extractor is trusted.

### Phases
- [ ] B1. Slot extractor v2 (`slot_extractor.py`): full quantity scan
      (done for slot_schema v1), PLUS: named entities (element names,
      shapes, "dice", "AP", "median"), negation/absence guards, and
      multi-sentence givens. Deterministic, testable, no ML required.
- [ ] B2. Schema-ify the families: each registered family declares a
      machine-readable SCHEMA (dims, slots, context, formula id) beside
      its regex. Registry matching becomes: schema-satisfies OR
      regex-fires (both paths, regex as fast path). Ship per batch of
      families; batteries already protect each one.
- [ ] B3. Embedding shortlister (MiniLM, already loaded): retrieve top-k
      candidate schemas per question; run deterministic slot-binding on
      that shortlist. Kills the O(N) sweep and the last-scaling regex
      need; retrieval errors fail SAFE (shortlist misses -> refusal).
- [ ] B4. Dependency-parse construction reader (spaCy): subject-verb-object
      relations for narrative word problems ("A buys... spends... remains")
      -> relation_binder schemas generalize from 2 commerce schemas to the
      full narrative family set. This is the old "grammar reader" scope.
- [ ] B5. Retirement: per-family regexes become optional fast paths; a
      family is "regex-free" when its schema coverage matches its regex
      coverage on the dev benchmark (measure per family). No big-bang
      cutover; the benchmark holds the line.

### Guardrails that never change
- Escrow: nothing enters VERIFIED without deterministic computation or an
  official key. Extraction may be fuzzy; computation may not.
- Every schema change lands with batteries; held-out stays sealed.
- Refusal is always the honest fallback; the pipeline never guesses.

---

## THE BUILD PLAN v2 -- competency engine, stage by stage
(Each stage solves ONE named problem and has a named honest fallback.
Stop-doing: wording patches inside family regexes -- variants land in
Stage 0 or the concept router, never per-family.)

  S0 NORMALIZE        solve: wording variants (percent/%, SI/interest,
                      raised-to-power/^, lakh/crore, unicode, OCR mangling).
                      One shared pass, one regression test per rule.
                      fail -> detect-and-refuse, never guess.
  S1 ROUTE            solve: WHICH concept, phrasing-invariantly
                      (competency ARCHITECTURE.md stages 1-3: spaCy
                      features + keyword overrides + MiniLM, numbers
                      masked, all chapters).  fail -> generic lanes still run.
  S2 EXTRACT SLOTS    solve: sentence -> DATA for the matched concept
                      ({base:2, exp:6}; roles: cost vs selling price) via
                      worked_examples/extracted_variables templates.
                      fail -> ambiguous-or-refuse path.
  S3 VALIDATE         solve: wrong-answer prevention BEFORE compute:
                      verbatim audit, whitelist relations, units-as-types,
                      plausibility, uniqueness (1 reading=answer,
                      2=SOCRATIC CONFIRM one-tap, 0/3+=guided).
  S4 EXECUTE          solve: the math. Priority: bound family (38
                      structures) -> slot_schema signature -> catalog
                      solution_steps executor -> CAS kernel. No LLM.
  S5 LABEL            solve: truth in the UI. VERIFIED / VERIFIED-OFFICIAL
                      (key) / SOCRATIC / GUIDED-with-concept-steps (teach
                      the parse). Unverified never carries an answer.
  S6 GROW COVERAGE    solve: the long tail over TIME. MS-first (keys +
                      IR/answer pairs), Socratic taps + LLM-proposed IRs
                      gated and promoted (flywheel), S7 register-finiteness
                      measurement to know when the war is won.

Assets already in place per stage: S0 partial (unicode/exponent repair),
S1 built (competency_engine router, 121 concepts), S2 missing (next build),
S3 partial (units, plausibility, guards; missing verbatim/whitelist/
socratic), S4 strong (38 families + slot_schema + kernel), S5 partial
(labels exist; guided-with-method missing), S6 missing (the A1 lever).

Build order + size: S0 (small, kills the treadmill) -> S2 (medium, the
core missing piece) -> S3 socratic + verbatim (medium) -> S6 MS-first
(big, data ops) -> S4 executor gap closure (catalog solution_steps ->
executor for unbound compute concepts) -> held-out gate.

## Suggested next session order
1. A1 (key mining + fingerprint matcher) -- biggest coverage jump.
2. A3 (A-R / statement / match solvers) -- pure logic, no new data.
3. B1+B2 (extractor v2 + schema-ify first 20 families).
4. A7 runtime fix, freeze pool, complete dev sample, run held-out.
