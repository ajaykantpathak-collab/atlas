# ARCHITECTURE.md -- The Honest Learning Machine

Single source of truth for the platform's solver + product architecture. This
document is the outcome of the September 2026 design convergence. Everything
below is buildable with assets that already exist. Read before building.

Platform rules still apply: English-only chat, LLM escrow-only, deterministic
solvers everywhere (see PLATFORM_RULES.md).

-------------------------------------------------------------------------------

## 1. Product thesis

Every tutoring app on the market either hallucinates answers (pure LLM tutors)
or caps out at a fixed question bank (practice apps). Neither can promise a
parent: "this app has never shown your child a wrong answer."

We can. The platform's core asset is not content volume or a clever model --
it is a TRUST architecture: answers are only ever produced by deterministic
computation or grounded in official marking schemes, and everything else is
honestly labeled. Correctness is by construction, not by probability.

The IIT open-book exam phenomenon is the proof of thesis: give students every
formula and they still fail, because the scarce skill is READING a problem
into a solvable model, not computing. So the product teaches the reading
(Socratic), verifies the computation (deterministic), and never confuses the
two.

## 2. Non-negotiable principles (the constitution)

1. ESCROW RULE: the LLM never computes a final answer. Ever. It may parse,
   structure, explain, and propose -- never compute what is shown as verified.
2. TRUTH TIERS: every answer the student sees carries one of exactly four
   labels -- VERIFIED (deterministic), VERIFIED-ANCHOR (reproduces official
   marking scheme), MODEL-ASSISTED (frontier parse, gates passed, no anchor),
   GUIDED PRACTICE (method only, student computes). No exceptions.
3. DAMPING OVER FAKE COVERAGE: an honest refusal is a feature. Coverage grows;
   correctness never degrades.
4. DETERMINISTIC means: fixed code, or frozen models (same input -> same
   output), or enumeration + executable checks. Never free-form generation on
   the answer path.
5. UNITS ARE TYPES: dimensional consistency is a first-class gate, not an
   afterthought.

## 3. The core insight: understanding = structure

A system has "understood" a question exactly when it holds a validated
structure (IR) of that question: every number grounded verbatim in the text,
every role bound, every relation executable, exactly one surviving reading.
Understanding is not a feeling the LLM has; it is an artifact we can check.

### The IR (intermediate representation)

One schema spoken by EVERY solver path (kernel families, forms, scenario
archetypes, canonical structures, LLM proposals):

    {
      "quantities": [{"value": 1200, "unit": "INR", "span": "Rs 1,200",
                      "role": "cost_price"}],
      "relations":  [{"type": "profit_percent_of_cost",   // whitelist key
                      "operands": ["profit", "cost_price"],
                      "formula": "profit_pct = profit / cost_price * 100"}],
      "target": "profit_pct",
      "confidence": 0.94,
      "provenance": "structure_registry | form_bank | grammar | frontier_llm",
      "anchor": "bank qid 4012 reproduced"          // optional
    }

The IR is what questions are MADE OF in this platform (author-first), not just
what we extract from them.

## 4. The solver ladder

Every quantitative question enters at the top and falls until it lands.
Each rung is cheaper and more trustworthy than the one below it.

    1. Banked verified parse  (retrieval + deterministic number re-binding)
          -- free, VERIFIED
    2. Canonical structure registry  (ant-on-rubber-band style closed families,
       modeling_layer.py pattern: triggers + extractor + model + solution)
          -- free, VERIFIED
    3. Relation grammar reader  (closed grammar of quantity constructions:
       comparatives, part-whole, rates, formula triggers; enumerate candidate
       readings, kill them with executable checks; units-as-types pruning)
          -- free, VERIFIED
    4. Ambiguous (2 readings survive gates) -> SOCRATIC CONFIRM
       ("did you mean profit on cost or on selling price?" -- 1 tap)
          -- 1 tap, VERIFIED, and the tap is free labeled training data
    5. Novel family -> FRONTIER MODEL PROPOSES IR -> same gates
          -- labeled MODEL-ASSISTED, captured for promotion
    6. Gates fail -> GUIDED PRACTICE  (the reading lesson: teach the parse,
       student computes; every failed sub-skill is a diagnostic data point)

Rungs 1-4 show answers. Rung 5 shows answers only under the MODEL-ASSISTED
label until it earns anchor or one-time human confirmation, then it is
promoted to the registry (rung 2) and every future variant of that family is
solved deterministically, forever, free.

## 5. The validator stack (build this FIRST)

The LLM parse and the grammar alike must survive, in order:

1. VERBATIM AUDIT: every number in the IR must match a literal span of the
   source text. A parser cannot invent figures.
2. WHITELIST: relation types must be canonical (or explicitly flagged new and
   routed to promotion review).
3. UNIT/DIMENSION CHECK: unit families must be consistent; a division is only
   legal where units cancel correctly (units-as-types).
4. PLAUSIBILITY GATES: probability in [0,1], radius >= 0, ages in range,
   magnitudes sane. (Already implemented at every acceptance point.)
5. ANCHOR REPRODUCTION: where the bank has a marking scheme (659 linked
   questions), the executed chain must reproduce the official answer.
6. UNIQUENESS: exactly one surviving reading -> answer; two -> Socratic
   confirm; zero or three+ -> guided practice.

The CAS is innocent and blind: SymEngine computes the wrong model perfectly.
Verification checks the MODEL against the QUESTION, never the arithmetic.

## 6. The capture flywheel

CAPTURE THE STRUCTURE, NOT THE ANSWER.

The frontier model's job for a novel problem is never "answer this" -- it is
"propose the IR of this." Gates validate; executor computes; if it also
reproduces a banked sibling (or a human approves once), the structure is
PROMOTED into the registry. LLM pays once per family; we own the family
deterministically thereafter. Coverage compounds with use instead of labor.
Student Socratic confirmations (rung 4) feed the same corpus and later
distill into a small local extractor (frozen, free, milliseconds) so the API
LLM shrinks to a recruiter for genuinely new families.

## 7. Three kernels (the product architecture)

The app is not a solver with subjects bolted on. It is one learning loop with
pluggable verification.

KERNEL 1 -- CONTENT: one schema for all subjects. Quantitative artifacts carry
the IR (author-first). Theory artifacts carry the RUBRIC GRAPH (official
marking points as a checkable DAG, parsed from marking schemes). Hindi
enrichment nodes, question bank, and future authored content all compile in.
Once a node's artifacts exist, unlimited practice falls out mechanically.

KERNEL 2 -- MASTERY: the student model. Per-node, per-skill evidence updated
by every interaction. This is the moat: it is CROSS-SUBJECT (the student who
cannot convert units fails it in physics AND maths; a connected skill graph
remediates once). The Socratic reading lesson's "first failed brick" feeds it
directly. It alone decides what the student sees next.

KERNEL 3 -- INTERACTION: the Socratic session engine (tutor_service phases,
guided practice, diagnostics). Identical loop in every subject: teach ->
practice -> diagnose -> remediate. The guided-practice scaffold is the
universal fallback for anything unverified.

## 8. Subject coverage map

    Subject type        Verify engine                      Status
    ------------------  ---------------------------------  -------------------
    Maths 1-12          solver ladder (all rungs)          rails exist (router)
    Physics numericals  ladder + units-as-types (strong)   equation graph live
    Chemistry numerical ladder (stoich/molarity/gas)       unit families live
    Accountancy         ladder (double entry = rules)      not built
    Economics numerical ladder (rate/percentage family)   not built
    History/Civics/Geo  rubric graph vs official scheme    MiniLM seed exists
    Bio theory/Psych    rubric graph                        not built
    Hindi/English       language loop + official keys       Hindi content live
    MCQ/AR (all)        deterministic checker               445+174 banked

Theory subjects never enter the solver path; they ride the rubric engine with
the same honesty labels ("official marking scheme says" is their ground
truth). There is no second-class subject: same loop, same UI.

## 9. What exists today (inventory mapped to rungs)

    Rung 1  form_transfer.py (4,286 forms; v2 number alignment TODO)
    Rung 2  modeling_layer.py (_STRUCTURES registry; 1 family + skeleton)
    Rung 3  quantity_parser, role_index, constraint_solver (generate-and-test
            + dimensional filter), equation_graph (379 eqs, BFS + cascade)
    Rung 4  tutor_service.py guided-practice state machine (needs real steps)
    Rung 5  NOT BUILT (frontier proposer + review queue)
    Rung 6  refusal path + plausibility gates (live)

    Bank:   8,867 questions, 659 marking-scheme-linked, 5,051 official
            SQP/MS/PQ; classes 10/12 official, 7-11 textbook, 1-6 GAP.
    MISSING BRIDGE: router.solve_text is not called by any API endpoint.
    Frontend has no verified/mode rendering. (Fixed in Phase 4.)

## 10. Build plan

Phase 0 -- HYGIENE (days)
    git init the workspace (currently unversioned!); regression eval harness
    wired to run on every change; freeze a sampled eval set of real board
    questions as the coverage benchmark.

Phase 1 -- IR + VALIDATOR (about 1 week, pure deterministic)
    IR schema; gate stack; compile the 659 marking-scheme chains into IR as
    the ground-truth corpus. No parser yet. This defines "safe parse."

Phase 2 -- REGISTRY RETROFIT (about 1 week)
    Convert ant structure + 3-5 families to IR; unify form-transfer output
    onto IR; reorder router to the ladder. All existing evals must stay green.

Phase 3 -- GRAMMAR READER SPIKE (about 2 weeks)
    Percentage/profit-loss family. Closed grammar (Roy et al. inventory) +
    enumerative disambiguation + unit-type pruning. MEASUREMENT GATE: report
    the unique-surviving-reading rate on bank questions; proceed only if it
    clears ~70 percent (tune with the eval harness).

Phase 4 -- THE BRIDGE + SOCRATIC (about 1 week)
    POST /api/tutor/solve exposing solve_text with truth-tier payload;
    frontend practice component (steps rendered, answer gated by tier);
    ambiguous parses -> one-tap confirm in the tutor flow; log confirmations.

Phase 5 -- FRONTIER RUNG (about 1 week)
    Contract-bound proposer (JSON IR only, never prose answers); gates;
    promotion review queue (auto-promote on anchor, human otherwise).

Phase 6 -- VERTICAL SLICE (2-3 weeks)
    Class 10 maths end-to-end excellent: content kernel populated, full
    ladder live, Socratic reading lesson, mastery graph driving remediation.
    SHIP THIS. It is the product proof.

Phase 7 -- REPLICATE SUBJECTS (weeks each, kernels are done)
    Physics numericals -> theory subjects via rubric engine -> languages.
    Mine NCERT 1-6 textbooks, Exemplar, CBSE CBQ banks for eval breadth.

Phase 8 -- DISTILLATION (optional, later)
    Local frozen extractor from rung-4/5 corpus; API LLM as recruiter only.

## 11. Labeling policy (UI truth rules)

    VERIFIED            green badge; answer + steps shown
    VERIFIED-ANCHOR     green badge + "matches official marking scheme"
    MODEL-ASSISTED      amber badge; clearly worded; never styled as verified
    GUIDED PRACTICE     method + scaffold; final answer withheld
Every verified answer expands to its AUDIT TRAIL (structure source, gates
passed, anchor). Trust is a visible feature, not a claim.

## 12. Honest boundaries (do not paper over these)

    Diagram-grounded questions: unreachable by the text reader until
        author-first rendering draws them (then native IR -- fine).
    Proofs / "show that": CAS can VERIFY a claimed identity; full proof
        discovery is not built.
    JEE-Advanced-style synthesis: lowest verified coverage by design; these
        get the reading lesson + isomorphic drill from the generator.
    OCR/handwritten input: garbage in, refusal out. Gates protect correctness,
        not yield.
    Rung 5 first-touch answers are model-assisted. That is the ceiling unless
        a human-standard verifier is built. Say so in the UI.

## 13. Beyond imagination -- the worth-multipliers

1. BOARD-EXAMINER MODE (build early; it is the emotional hook): student
   writes full solutions; the platform marks them like a CBSE examiner --
   step-wise partial credit against the official marking DAG. Uses the 659
   chains today, grows with every mined scheme. "Get marked like the
   examiner" is a sentence no LLM tutor can say honestly. Also the single
   richest source of error data (which step breaks, for whom).

2. THE READING LESSON as a named feature: "I will not give you the answer; I
   will teach you to read the problem" -- the Socratic parse-builder from the
   guided-practice rung, productized. No competitor teaches the reading.

3. COST MOAT AT SCALE: deterministic rails serve millions for pennies. The
   distilled local extractor + PWA caching makes low-bandwidth India viable
   where per-question LLM tutors bleed money. Distribution advantage, not
   just margin.

4. ERROR-CORPUS FLYWHEEL: every wrong student answer is labeled by which
   sub-skill broke. Over years this becomes the world's best dataset of HOW
   Indian students fail CBSE questions -- better remediation items, better
   distractors, and a data asset nobody can copy.

5. MARKING-SCHEME IR CORPUS: parsing schemes (telegraphic, formula-dense,
   far easier than prose) yields structure+answer pairs without solving the
   hard reading problem. Proprietary training corpus; mine it aggressively.

6. TEACHER / SCHOOL CHANNEL: the same mastery kernel renders a class
   dashboard. B2B2C adoption through schools; NEP-2020 competency alignment
   (competency items generated from verified archetypes) is the pitch
   principals already want to hear.

7. CROSS-SUBJECT SKILL GRAPH: remediate unit-conversion once, both subjects
   improve. Only possible because one mastery kernel serves every subject.

8. HINDI-MEDIUM PARITY: the phrasing grammar gets a Hindi register later;
   the Hindi content pipeline (537 enriched nodes) is already the deepest
   asset in the country for this.

9. VERSION THE IR BANK: every structure is an asset with provenance and
   regression coverage. Treat the registry like code (reviews, tests, no
   silent edits).

10. PARENT TRUST REPORT: weekly, mastery-grounded, jargon-free. Trust is the
    brand; make it visible weekly.

## 14. Research grounding (prior art to steal from)

    Zhang et al. 2020, "The Gap of Semantic Parsing" (SMU survey) -- the map
    Kushman et al. ACL 2014 -- template alignment (form-transfer ancestor)
    Hosseini et al. EMNLP 2014 (WATER) -- physics as proportional chains
    Shi et al. NAACL 2015 -- candidate enumeration + reasoning tables
    Roy, Vieira, Roth TACL 2015 -- the closed grammar of quantity language
    Roy & Roth, Unit Dependency Graphs -- units-as-types parsing constraint
    SVAMP 2021 -- robustness benchmark (use as perturbation eval)
    MathAI 2023 + Moxia 2026 -- LLM formalize + symbolic solve + verify
    Datasets: Math23K, ASDiv, MAWPS, SVAMP -- free training pairs for the
    distilled extractor

## 15. Gotchas (learned the hard way; keep honored)

    symengine solve: from symengine.lib.symengine_wrapper import solve,
    returns FiniteSet (use .args).
    sympy on float-heavy equations hangs -> rational=False, check=False,
    symengine-first always.
    quantulum3 needs pip install stemming; bare numbers misread as units.
    Form-transfer recursion -> router._FORM_TRANSFER_ACTIVE guard.
    Hindi agent waves: ~28 batches, single background agent, 7-11M tokens.
    Never let unverified stages show answers. Damping > fake coverage.

## 16. Experience elevators (post-architecture UX multipliers)

1. THE SUB-3-SECOND DOUBT: deterministic rails answer in milliseconds; make
   "nothing in the solve path takes longer than 3 seconds" a measured promise.
2. "ONE MORE LIKE THIS": after any mistake, regenerate the SAME verified
   structure with fresh numbers, slightly easier. Zero marginal cost, only
   this architecture can do it. The single most valuable button in the app.
3. TEACH-BACK MODE: student explains the solution in their own words; rubric
   matcher grades coverage of official marking points. Protege effect, plus
   the richest error data.
4. CONFIDENCE CALIBRATION: "how sure were you?" tap before reveal; track the
   sure-but-wrong student over time. Exam temperament, measured.
5. WEAKNESS RADAR + MARK PROJECTION: "the 12 marks you are most likely to
   lose and the 3 skills causing them"; trajectory line grounded in mastery
   evidence, honestly labeled as arithmetic over evidence.
6. THE DAILY 20: fixed 20-minute plan -- weakest node, 2 spiral items (SM-2
   already lives in tutor_service), 1 stretch. Anti-cramming; builds the
   daily habit.
7. VOICE-FIRST FOR CLASSES 1-6: questions read aloud (TTS endpoint wiring is
   pending), spoken/tapped answers. Juniors become the stickiest segment.
8. CHAPTER PACKS OFFLINE: per-chapter PWA bundles running the local
   extractor on-device. Two hours of Sunday wifi covers the week.
9. BILINGUAL ONE-TAP TOGGLE: same verified structure, English or Hindi
   surface. The Hindi content asset makes medium parity a wedge.
Build 1, 2, and 6 into the Phase 6 vertical slice.

## 17. Parsing playbook -- issue classes and deterministic handling

The architecture exists to read questions into IR. These are the actual
parsing problems in CBSE/CISCE material, with the technique for each. Every
rule added here MUST come with eval coverage; track fix rate per class.

S. STRATEGIC TECHNIQUES (apply above and across all issue classes)
  S1 MARKING-SCHEME-FIRST: parse the MS, not the question. Scheme text is
     telegraphic and formula-dense with the answer attached -- an order of
     magnitude easier, pre-verified. Then ALIGN the question text onto the
     known structure (alignment << extraction). Every mined scheme also
     yields a text+IR training pair. Highest-yield parsing move available.
  S2 OPTION FORENSICS (MCQ/AR): options are constraints -- correct option
     must pass all gates. Distractors usually encode the intended
     mis-readings, so they disambiguate the reading, auto-populate the
     ambiguity catalog (G1), and diagnose student errors. Turns MCQs into
     the EASIEST parsing class.
  S3 ROUND-TRIP RENDERING: re-render the IR back into plain English
     (deterministic templates) and require semantic equivalence with the
     original (frozen matcher). The compile check for natural language;
     the student-facing version IS the Socratic confirmation ("here is
     what I understood -- correct?").
  S4 CLOSURE / CONSERVATION OF QUANTITIES: a reading is complete only if
     every extracted quantity is used and every equation operand is filled
     -- no orphans, no holes. Catches mis-parses that pass local gates.
  S5 CONSTRAINT PROPAGATION: bind-and-propagate, never parse-then-check.
     Each binding immediately prunes later bindings (units, asymmetries,
     cross-part consistency). Makes enumeration tractable.
  S6 CROSS-PART CONSISTENCY: a preamble parse is accepted only if every
     sub-question is answerable under it. Parts constrain each other.
  S7 REGISTER FINITENESS MEASUREMENT: form mining found 4,286 forms in
     8,867 questions -- setters reuse phrasings. Run an n-gram coverage
     curve over the bank to measure how fast the phrasing space closes;
     this number is the evidence that the parsing war is winnable.

A. INPUT REPAIR (preprocessing, before any parsing)
  A1 Indian numbering: lakh/crore words, 1,50,000 grouping, Rs/rupee
     prefixes, Devanagari digits -- normalize to canonical value while
     KEEPING the original span for the verbatim audit. Regex pass.
  A2 OCR/PDF mangling: broken spacing ("1 , 2 , 1"), lost symbols (sqrt, ^2),
     ligature damage -- a repair grammar of common manglings; anything
     unrecoverable is detect-and-refuse. Never guess.
  A3 Spelled-out quantities: "three pens", "half", "twice", "dozen" -- closed
     lexicon, extended once.

B. QUANTITY AND UNIT ISSUES
  B1 Unit inheritance: "costs 400" after Rs was established -- nearest
     established unit within the paragraph; if two units compete, confirm.
  B2 Mixed unit systems (cm and m in one problem): convert to SI at IR build;
     unit-family gate blocks cross-family binds.
  B3 Compound units (km/h, g/cm3, N/m2): parse into base-dimension vectors so
     units-as-types cancellation works.
  B4 "per/every/each" rates: bind as ONE derived quantity, never two values.
  B5 Counts vs measured quantities: dimensionless family; blocks nonsense
     binds (3 pens is not 3 metres).

C. BINDING ISSUES
  C1 "respectively" ordered binding: "wires A and B of radii 0.5 mm and
     1 mm respectively" -- zip the two ordered lists deterministically.
     High frequency in physics; trivial rule, large win.
  C2 Entity-quantity table: track Ramesh/he/his across sentences; coref by
     recency + noun match. Board narratives are short; rules suffice.
  C3 Comparative reversal: "5 less than x" is x-5, never 5-x. Grammar rule.
     The single most common sign error in student AND parser output.
  C4 Ratio constructions: "3:2", "divided among", shares sum to whole
     (implicit default D1).
  C5 Distractor data: a bound-but-unused quantity is a flag, never silently
     ignored -- either justify, confirm, or refuse.

D. DEFAULTS AND WORLD KNOWLEDGE
  D1 Implicit defaults table, keyed by domain trigger, every application
     listed in the audit trail: depreciates -> annual rate; starts from
     rest -> u=0; comes to rest -> v=0; g=9.8 unless stated; bag contains ->
     parts sum to whole; unstated interest in classes 7-8 -> simple.
  D2 Constraint asymmetries as free gates: "sold at a loss" -> SP < CP;
     "just reaches" -> v=0. Narratives hand you extra plausibility checks.

E. TARGET ISSUES
  E1 Indirect asks: "which is better / should he / will she reach" -- decision
     questions compile to compare/inequality targets, not numeric ones.
  E2 Multi-target: "find the speed and the time" -- target list or sibling
     IRs.
  E3 "Show that" questions: THE ANSWER IS GIVEN. Treat as verification mode:
     parse the claim, require the executed chain to reproduce it. These are
     free self-anchored instances -- harvest them aggressively for the
     training corpus (claim + text + reproduced chain).

F. MULTI-PART / COMPETENCY STRUCTURE
  F1 Preamble + sub-question split: shared context, per-part targets,
     inherited quantity table. This is the NEP-2020 case-study format.
  F2 Chained parts: part (ii) consumes part (i)'s answer -- memoize VERIFIED
     answers back into the quantity table as derived quantities with
     provenance. Unverified upstream -> downstream degrades to guided.
  F3 OR-choice ("attempt any four"): parse all branches, execute the
     student's selection.

G. AMBIGUITY CATALOG (enumerate -> gates -> confirm)
  G1 The known ambiguity classes: profit base (cost vs selling price), simple
     vs compound unstated, "increased by 20%" vs "increased to 20", discount
     sequencing order, average speed vs average of speeds, at-least vs
     exactly in probability, "each" scope ("each box weighs 5 kg" -- per box
     or total).
  G2 Resolution is uniform: enumerate readings, executable gates kill, one
     survivor -> answer, two -> one-tap Socratic confirm, zero or three-plus
     -> guided practice. Log every confirm; the catalog grows from evidence.

H. DIAGRAMS AND INLINE FORMAL MATH
  H1 Diagram-carried data ("shown in figure", "the graph shows"): graceful
     route to author-first rendering; NEVER fabricate figure data from text.
  H2 Inline formal math in prose: repair (A2) then hand to the math kernel;
     mangled beyond repair -> refuse. The kernel stays the executor for
     anything already formal.

I. HINDI MEDIUM (later phase)
  I1 Same relation grammar, Hindi trigger lexicons; Devanagari digits already
     handled by A1. Start with the highest-frequency domains; the enriched
     Hindi nodes supply the register.

Standing rule for this playbook: a parsing issue is only "solved" when it has
a regression case in the eval harness. Every fix that survives contact with
the bank moves the coverage number that justifies the whole design.

## 18. Content licensing policy (binding for all miners)

### 18a. Surface policy v2 (2026-09, supersedes the CC-BY display rule)

DECISION: the website NEVER displays source text from ANY external
corpus -- including CC-BY OpenStax.  External corpora are internal
mining / eval / regression grounds only.  100 percent of the
student-facing surface is author-first rendered from IR structures
(surface_renderer), with Indian contexts and rupee denominations.

Rationale: CC-BY attribution obligations trigger on DISTRIBUTION of
the licensed expression.  Mined IR (facts, relations, methods) is not
copyrightable; our rendered surfaces are our own expression of those
facts.  Internal use needs no attribution; a provenance ledger is kept
in metadata anyway.

Consequences:
    - verified_practice._build_item: always renders (question_source
      == "rendered"); the original-cc-by path is removed
    - Try-It corpus: internal mining/eval/binding-prompt pool only;
      public Lane C prompts are rendered from verified structures or
      generated
    - renderer v2 (Indian contexts, natural wrappers) is now the
      quality-critical component for the practice surface
    - attribution: kept in corpus metadata (license + provenance),
      never in the student UI

The copyright line for this platform: mathematical STRUCTURE is fact and
method -- numbers, relations, formulas, solution chains -- and is not
copyrightable.  Surface TEXT (problem wording, narrative wrappers,
story contexts) is expression and IS copyrightable.  The pipeline
enforces this split mechanically.

    Source license        IR structure       Surface text
    --------------------  -----------------  ---------------------------
    CC BY 4.0 (OpenStax   keep              keep + attribute in product
    -OP renditions, the
    classes 6-11 track)
    CC BY-NC-SA (WEB      keep (internal     NEVER store, NEVER show;
    renditions; flagged    derivation of     regenerate via author-first
    in corpus metadata)    facts/methods)    renderer only (surface_policy
                                           = regenerate; scrubbed 2026-09)
    NCERT / CBSE / CISCE  keep (derived     re-render by default; verbatim
    (board-owned, not     structural        display ONLY in official
    openly licensed)      assets: forms,     practice mode with attribution
                          archetypes, IR)
    Authored by us        ours              ours (the default product path)

Rules:
1. Every mined artifact carries license + provenance in its metadata
   (openstax_examples/*.json['license'] pattern); no unattributed
   ingestion.
2. Scrubbing is one command and already applied: restricted-rendition
   corpus files hold {id, ir, anchor_verified} only -- zero words from
   the source.  The author-first renderer (section 13.1 / build Phase 6)
   supplies all student-visible wording for these.
3. Never copy narrative wrappers from restricted sources -- story
   contexts are the expressive part.  Ramesh's shop is ours; their
   story stays theirs.
4. One hour of IP counsel before commercial launch remains on the
   checklist for the board-content verbatim mode.  Structural
   derivation + regeneration is the low-risk default everywhere.

-------------------------------------------------------------------------------

ONE-LINE SUMMARY: teach the reading Socratically, compute deterministically,
label everything honestly, capture every structure, and make the mastery
kernel -- not the solver -- the center of the product. The app that has never
shown a wrong answer is the app India's parents choose.
