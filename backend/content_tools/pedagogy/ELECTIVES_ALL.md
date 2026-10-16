# ELECTIVES_ALL — CS + Accounts + BS + remaining electives, classes 11-12

Agent: ELECTIVES-ALL. Date started: 2026-10-07. Living report — updated continuously.

Mission: every elective subject (Computer Science, Accountancy, Business
Studies, Biotechnology, Applied Maths, Psychology, Legal Studies,
Sociology, Physical Education, Mass Media — classes 11-12) must work
honestly end-to-end: zero confident-wrong, honest refusal on anything
uncomputable, families built for deterministic coverage gaps.

Constraints honored: Docker OFF, Postgres DOWN (in-process), LLM off
(`SOLVER_LLM_MODE=off`), no touching STEM/language/socsci lanes.

## 1. Corpus map (found at probe time)

CBSE corpus `deploy/content/enhanced_nodes_md/` (class-11 + class-12 files):

| code | subject | c11 | c12 | total |
|------|---------|-----|-----|-------|
| cs | Computer Science | 150 | 288 | 438 |
| acc | Accountancy | 98 | 184 | 282 |
| bs | Business Studies | 115 | 216 | 331 |
| biotech | Biotechnology | 124 | 288 | 412 |
| app | Applied Maths (NCERT) | 81 | 98 | 179 |
| psy | Psychology | 86 | 166 | 252 |
| leg | Legal Studies | 90 | 84 | 174 |
| soc | Sociology | 106 | 326 | 432 |
| ip | Informatics Practices | 96 | 168 | 264 |
| ca | Computerised Accounting | 0 | 40 | 40 |
| stat | Statistics (econ side) | 84 | 0 | 84 |

CISCE corpus `deploy/content/cisce_nodes_v2/` electives (c11+c12):
cs 141+?, acc 118+151, bst 151+210, biotech 153+114, appmath 244+168,
legal 0+119, psy 0+128, ai 122+?, comm 113+112.

**Physical Education and Mass Media: NO corpus files exist for classes
11-12 in either corpus (verified by filename scan and content grep).
Nothing to audit; the honest behavior for any such question today is
the standard honest refusal. Documented, not fixable by an agent
(without content ingestion, which is out of scope).**

Question source: `## DIAGNOSTIC_QUESTION_n` sections of the node files
(answers in the corpus are blank — grading is examiner-side, not
answer-matching).

## 2. Baseline (before any fix)

Existing probe `tests/commerce_matrix_probe.py` (13 cases):
RESULT: 12/13 REFUSE (one accounts solve). Refusals include trivially
computable asks:
- "print(7 // 2)" Python output -> refused (no CS families exist)
- "Interest on partner's loan Rs 50,000 @ 6% p.a." -> refused
- goodwill years-purchase probe -> refused (family exists but trigger
  expected different surface: "goodwill is valued at 2 years' purchase
  of average profit" — checker needed)
- SQL clause / Python data-type asks -> refused

Baseline verdicts kept in tests/_electives_probe_*.jsonl (corpus
batteries) and the numbers in section 3.

## 2b. Files owned and changed (all additive; no landed rows clobbered)

- `its/solver/cs_families.py` (NEW, ~1,830 lines): taught-subset Python
  AST interpreter + SQL + data-structure families.
- `its/solver/accountancy_families.py`: +3 family rows
  (INTEREST_CAPITAL_PARTNER, INTEREST_PARTNER_LOAN,
  PROFIT_APPRIOPRIATION), +_dep_date_note (DEP_SLM consumes a stated
  purchase date), +_CONF bumps, +appropriation honesty gate.
- `its/solver/commerce_families.py`: +1 family row (NET_GST_PAYABLE).
- `its/solver/commerce_families2.py`: +appropriation gate on
  PARTNERSHIP_SHARE; +currency/rate guard on INTEREST_ON_CAPITAL's
  bare fallback (both P0 closures).
- `its/solver/independent_verifier.py`: +declarative rows
  (INTEREST_PARTNER_LOAN, NET_GST_PAYABLE, INTEREST_ON_CAPITAL via
  `_PHYSICS_DECL`), +hand-written verifiers for the irregular routes
  (PY_*, SQL_*, STACK/QUEUE/POSTFIX, INTEREST_CAPITAL_PARTNER,
  PROFIT_APPRIOPRIATION) — VERIFIER_ENGINE.md case 2, documented.
- `its/solver/answer_pipeline.py`: `_cs_fastpath` (verifier-gated,
  fail-safe) + `_CS_RAW` thread-local; no existing guard edited.
- `its/solver/modeling_layer.py`: +1 registration block (batch-22).
- `tests/electives_probe.py`, `tests/electives_e2e.py`,
  `tests/test_electives_all.py` (NEW).

## 3. Work log

- [x] Corpus mapped (both corpora), PE/Mass Media absence documented.
- [x] Probe harness: `tests/electives_probe.py` (DIAGNOSTIC extraction,
      chapter-spread sampling, in-process answer(), JSONL per lane).
- [x] CS built: `its/solver/cs_families.py` (NEW, 10 families:
      PY_TRACE / PY_EXPR / PY_TYPE via a strict taught-subset AST
      interpreter; SQL_CLAUSE / SQL_AGGR / SQL_JOIN on question-stated
      data with SQL NULL semantics; STACK_SIM / QUEUE_SIM / POSTFIX_EVAL).
- [x] CS verifiers registered in `independent_verifier.py` (second
      engine: restricted CPython exec for PY_*; independent re-derivation
      for SQL_* and the simulations). All additions, no existing
      registrations touched.
- [x] CS fast-path wired in `answer_pipeline.py` (`_cs_fastpath`,
      verifier-gated: serves ONLY when the independent verifier PASSES;
      any gate/FAIL/na falls through to the normal lanes). Runs on the
      RAW question surface via a thread-local (`_CS_RAW`) because the
      shared input normalizer collapses newlines and destroys code.
- [x] E2E: 9/9 corpus-shaped CS asks now ship VERIFIED end-to-end
      (print(7//2) -> 3; fenced x+y trace -> 13.5; type(3.14) -> float;
      WHERE clause fact; COUNT(DISTINCT CITY) with NULLs -> 3;
      LEFT JOIN with explicit rows -> NULL-padded row; CROSS JOIN
      10x5 -> 50; stack push/pop trace -> [10] top=10; postfix
      5 3 + 8 2 - * -> 48).
- [x] Accounts additive wave (`accountancy_families.py`, new rows only):
      INTEREST_CAPITAL_PARTNER (per-partner capitals: letter-amount,
      amount-(letter), named-partner surfaces; mid-year additional
      capital with pro-rata months), INTEREST_PARTNER_LOAN (statutory
      6% p.a. when the deed is silent — a CHARGE, not an appropriation),
      PROFIT_APPROPRIATION (net profit -> interest on capitals ->
      divisible -> ratio shares).  DEP_SLM date-note added so a stated
      purchase date ("on 1st April 2023") is consumed by the steps, not
      dropped (the data-coverage guard was refusing the corpus's own
      date-stamped stems).  Verifiers registered for all three new
      routes (second parse + recompute; appropriation checks ratio
      proportionality + re-addition invariants).  VERIFIER_ENGINE.md
      compliance: the two equation-shaped routes (INTEREST_PARTNER_LOAN,
      NET_GST_PAYABLE) are DECLARATIVE `_PHYSICS_DECL` data rows — the
      family binds its input slots (P/R/months, a_in/r_in/a_out/r_out)
      into quantities and the row rebuilds via the alternate relation;
      their hand-written drafts were removed.  The genuinely irregular
      routes stay hand-written per case 2: per-partner capital parsing
      (multi-entity), the appropriation chain (multi-step invariants),
      PY_* (second-engine restricted exec), SQL_* / simulations
      (algorithmic second engines).  Indian-numeral amounts
      ("5,00,000") are why these cannot be qvars regex rows.
- [x] BS additive wave (`commerce_families.py`, new row only):
      NET_GST_PAYABLE = output GST - input credit over both stated
      sides (the landed GST_CHAIN reads only one side and was silently
      downgraded by the strict-verified contract anyway).  Verifier
      registered; fastpath extended to try commerce rows after CS rows.
- [x] Regression: `tests/test_electives_all.py` 65/65 (interpreter
      cases incl. recursion/f-strings/comprehensions, out-of-subset
      refusal gates, dispatcher surfaces, verifier pass+FAIL tamper
      paths, landed-row controls: DEP_SLM clean stem, commerce BEP
      row).  Landed suites still green: test_commerce_golden.py,
      test_family_adapter.py, test_family_adapter_invariant.py
      (77 passed together with the electives file in one invocation).
- [x] Remaining electives audit (probe batteries in
      tests/_electives_probe_*.jsonl):
      - ip: 16 loose-computational, of which the true compute surface
        (Python snippets, SQL) is owned by cs_families; the rest are
        von Neumann / software-classification prose -> honest refusal.
      - ca (8), biotech (1), leg (0), psy (0), soc (0): conceptual
        lists/essays -> honest refusal is CORRECT (no computation ask).
      - stat (3): class-width ask is the only clean numeric gap;
        under three phrasings -> documented honest gap (biotech
        precedent), not a family.  Mean/median/mode numerics already
        owned by isc_stats_families (batch-20).
      - app (3): A.P. formula-recall and 0! essay -> honest refusal;
        A.P. numerics already owned by syllabus/extra families.
- [x] FINAL E2E TABLE (`tests/electives_e2e.py`, one process, LLM off,
      examiner keys): 15/16 ship VERIFIED with correct answers.

  | lane | asks | VERIFIED-correct | honest-refuse | wrong |
  |------|------|------------------|---------------|-------|
  | CS (c11+c12 corpus shapes) | 9 | 9 | 0 | 0 |
  | Accounts (c12 partnership + SLM) | 6 | 5 | 1 (see note) | 0 |
  | Business Studies (net GST) | 1 | 1 | 0 | 0 |
  | TOTAL | 16 | 15 | 1 | 0 |

  Baseline before this wave: 1/13 solved (the rest refused outright,
  including trivially computable asks; PARTNERSHIP_SHARE shipped an
  undeducted split VERIFIED on appropriation asks and GST_CHAIN read
  only the purchase side — both P0 wrong-answer classes now closed).

  The one honest refusal: the corpus's "(A) ... (B)" capital
  annotations are truncated by the SHARED input normalizer (it reads
  "(A) ... (B)" as an MCQ option block and cuts the stem at char 129,
  dropping partner B's capital).  The appropriation family now gates
  rather than ship an undeducted split; the untruncated surface passes
  (216,000 / 129,600 / 86,400 asserted in the regression).  Fixing the
  normalizer's option-marker heuristic is shared-infra work outside
  this lane's ownership -- flagged for the owner.

- [x] Wrong-answer classes found and closed (P0s):
  1. PARTNERSHIP_SHARE (commerce2 + commerce_readers) shipped
     "divisible = net profit" ignoring interest on capital, VERIFIED
     via PAL arithmetic agreement -> gated on appropriation context.
  2. INTEREST_ON_CAPITAL (commerce2) bound the RATE figure as the
     capital on truncated surfaces (12 x 12% = 1.44 VERIFIED) ->
     currency+rate guard on the bare fallback.
  3. GST_CHAIN computed purchase-side GST only, silently downgraded ->
     superseded by NET_GST_PAYABLE (verified both-side chain).

### CS guardrails learned (kept)
- Family dispatcher never execs; the verifier's restricted exec runs
  whitelisted builtins only, no imports/attrs, line-budget tracer.
- Interpreter subset refusals (import/input/classes/try) gate to honest
  refusal — never guessed output.
- Answers kept < 200 chars where the ask has no calculation verb, so
  the choke-point prose-essay guard does not bury a verified output.
