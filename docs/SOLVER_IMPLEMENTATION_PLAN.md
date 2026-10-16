# Atlas Solver Implementation Plan

Updated: 2026-10-01

## 1. Product requirement: no dead-end refusals

Atlas must not stop at "unsupported" when its deterministic solvers cannot
answer. A deterministic miss, timeout, ambiguity, or failed check triggers an
LLM-assisted recovery workflow. The student receives an answer and explanation
whenever one can responsibly be produced, or a precise clarification when
essential information is missing. An unavailable provider gets an honest retry
state, not an invented answer.

This is a product requirement, not a claim that every possible question is
solvable or that LLM output is automatically correct. Safety and privacy rules
continue to apply. Verification labels must describe checks actually performed.

**Canonical flow:**

```text
Question / image
  -> normalize, identify subject, extract givens and target
  -> exact cache or approved reusable family
  -> existing deterministic solver
  -> if solved: verify and display
  -> otherwise: ask LLM for answer, reasoning, and structured solution proposal
  -> execute/check that proposal through Atlas solvers
  -> on disagreement: repair the proposal and check again
  -> display answer with its actual verification status
  -> store solution evidence and a candidate reusable family
  -> promote the family only after regression and adversarial validation
```

"No dead end" must not be implemented as unconditional VERIFIED status.
Passing a proposed answer through a solver is not itself verification: the
solver must check the original question, its interpretation, and its constraints.

## 2. Answer states and UI behavior

Separate answer availability, provenance, and verification. Do not overload
one status enum to represent all three.

| State | Student experience | Eligible for trusted family reuse? |
|---|---|---|
| VERIFIED_DETERMINISTIC | Answer, steps, and check evidence | Yes, after family tests |
| VERIFIED_LLM_ASSISTED | Answer, steps, LLM-assistance disclosure, check evidence | Yes, after family tests |
| SOURCE_SUPPORTED | Factual explanation with checked source references | Only within source/version scope |
| INTERPRETIVE | Suggested essay/explanation, assumptions, rubric feedback | Not as a unique correct-answer key |
| LLM_BEST_EFFORT | Answer clearly labelled "AI-assisted; not independently verified" | No |
| NEEDS_CLARIFICATION | Specific question about missing units, diagram, or ambiguous wording | No |
| TEMPORARILY_UNAVAILABLE | Preserve the question and offer retry | No |

Legacy UNSUPPORTED/GUIDED/refusal results remain useful INTERNAL routing signals.
They must trigger recovery rather than being the normal terminal student screen.
If checks contradict a candidate, repair it; do not display that known-invalid
candidate unchanged. If a useful best-effort answer remains, disclose unresolved
assumptions rather than attaching a verification badge.

## 3. One orchestrator across every entry point

Implement a shared orchestrator and use it from text solving, tutor questions,
practice help, multipart solving, and image/page solving. Avoid separate fallback
implementations with inconsistent policy.

Suggested module: `backend/its/solver/solve_orchestrator.py`.

Keep `/api/solver/v3/deterministic` genuinely deterministic-only for tests and
internal use. Add a separately named adaptive endpoint or use the orchestrator
behind the existing student-facing endpoint. Do not silently change the meaning
of an endpoint advertised as no-LLM.

The orchestrator performs:
1. Input validation and subject/grade/board scoping.
2. Exact solved-question lookup and approved-family selection.
3. Deterministic execution with resource budgets.
4. Independent verification.
5. LLM fallback on a miss, timeout, ambiguous parse, or failed verification.
6. Candidate repair using structured verifier feedback.
7. Honest answer publication, telemetry, and candidate-family storage.

## 4. ProblemIR and LLM proposal contract

Build on `backend/its/solver/contract.py` and reconcile it with existing IR types.
Preserve source spans; never silently discard meaningful givens.

ProblemIR includes:
- Original and normalized question, subject, class, board, language.
- Entities, quantities, exact values, units, source spans, assumptions.
- Constraints, requested output, answer shape, and interpretation alternatives.
- Referenced diagram/image and extraction uncertainty.

The LLM returns schema-validated JSON containing:
- Proposed answer and explanation.
- Its interpretation of the original question.
- Givens and target mapped to ProblemIR.
- Proposed equations or a restricted step graph.
- Assumptions and missing information.
- Existing family ID, or a candidate family specification.
- Source references for factual claims where available.

Ask the LLM to select from approved operations and relations. Arbitrary Python,
SQL, shell commands, imports, or executable code must never run in the API process.
Reject extra fields and enforce size, nesting, numeric, and operation limits.

## 5. Verification and repair

For computational subjects, execute the proposal independently of its claimed
answer. Compare exact symbolic values or documented numerical tolerances.

Required checks, where applicable:
- Givens and target match the original question, not merely the LLM rewrite.
- Equation/model relevance, units, dimensions, and domain constraints.
- All requested parts answered; irrelevant data explicitly accounted for.
- Back-substitution, conservation laws, inverse relations, root completeness.
- Independent computational path for high-confidence verification.
- Displayed answer, units, rounding, and explanation agree with checked results.

When checks fail, return structured feedback to the LLM, for example
UNIT_MISMATCH, UNUSED_GIVEN, WRONG_TARGET, INVALID_ROOT, or SOURCE_CONFLICT.
Allow at most two repair attempts by default, under a total request budget.
Do not use majority agreement between models as mathematical proof.

For biology/humanities, validate claims against approved, versioned sources.
For languages and essays, use grammar checks and rubrics; multiple defensible
answers are expected. A numeric solver cannot certify an interpretive response.

## 6. Store answers AND learn reusable families

These are different storage objects:

### Solved-question cache

Store the original problem fingerprint, scoped context, normalized ProblemIR,
answer, verification state, assumptions, proof trace, solver version, provider
provenance, and source/curriculum version. Do not persist credentials or raw
student identifiers in a shared learning corpus.

Cache keys must include every answer-changing input: quantities, units, requested
target, constraints, options, image digest, subject, grade/board when relevant,
and solver/source version. Similar wording alone is not sufficient for reuse.

Store best-effort outputs separately with short expiry. They must never be
served later as verified answers or used as ground-truth grading keys.

### Candidate reusable family

A family is a parameterized method, NOT one saved question/answer pair.
Store:
- Family ID/version, subject, scope, and provenance.
- Recognition rules, input schema, required givens, units, domain constraints.
- Restricted executable step graph or reviewed implementation.
- Independent verifier and supported answer shapes.
- Positive, negative, boundary, and adversarial fixtures.
- Validation results, ownership/review state, and rollback version.

Example: "180 km in 3 h gives 60 km/h" becomes a speed family with distance and
time inputs. A later 240 km / 4 h problem must be recomputed, not answered by
retrieving the earlier number.

Family lifecycle:

```text
candidate -> quarantined -> validated -> shadow -> approved -> deprecated
```

1. Save each useful LLM solution as a candidate with its evidence.
2. Deduplicate against existing families; repair the parser before inventing a
   duplicate family when the mathematics is already supported.
3. Generate varied cases and obtain expected answers independently of the LLM
   that proposed the family. Include units, signs, missing data, and ambiguity.
4. Validate the method AND its recognizer: a correct formula with a bad trigger
   can answer an unrelated question incorrectly.
5. Shadow-test the candidate without allowing it to override trusted results.
6. Approve narrowly scoped declarative families only after release gates pass.
   Novel executable code and broad semantic changes require review.
7. Monitor canary performance; disable or roll back on contradiction/regression.

Never promote from one successful example. Never hot-write model-generated
Python into active solver modules. Failed promotion does not stop student help:
the LLM-assisted route remains available while the candidate is improved.

## 7. Execution and service reliability

- Run expensive/untrusted computation in killable worker processes with CPU,
  memory, wall-clock, and queue limits. Disable network and restrict filesystem.
- A request timeout must not leave unlimited background work consuming capacity.
- Coalesce identical in-flight requests; retries must not duplicate computation.
- Bound LLM attempts, provider cost, and total wall-clock time separately.
- Use circuit breakers for provider failure, with honest retry/clarification UI.
- Keep API health checks responsive while all solver workers are busy.
- Treat question text, OCR, retrieved documents, and LLM proposals as untrusted
  data. They cannot override execution policy, access files, or reveal secrets.
- Minimize student data sent to providers; document retention and consent rules.

## 8. Configuration to implement

These are target settings, not a claim that all are implemented today:

```dotenv
SOLVER_LLM_MODE=fallback
SOLVER_REQUIRE_VERIFICATION=true
SOLVER_DISPLAY_BEST_EFFORT=true
SOLVER_TRUSTED_CACHE_REQUIRE_VERIFICATION=true
SOLVER_FAMILY_REQUIRE_VALIDATION=true
SOLVER_MAX_REPAIR_ATTEMPTS=2
SOLVER_VERSION=<release-commit-sha>
```

Here REQUIRE_VERIFICATION controls verified status and trusted promotion;
DISPLAY_BEST_EFFORT separately allows a clearly labelled assistant answer when
verification is unavailable. Update existing policy semantics explicitly rather
than relying on conflicting flags. Keep the existing
SOLVER_ALLOW_UNVERIFIED_ANSWER legacy setting out of this flow until its adapters
are reconciled with the new publication contract.

Track actual provider calls in request-scoped state. Do not infer `llm_used`
from words appearing in explanation text. Record parser, answer, repair, and
explanation calls separately.

## 9. Migrate existing solver groups

Inventory ACTIVE / ADAPTER / GENERATED / EXPERIMENTAL / ARCHIVED modules first.
Route active families through the same orchestrator and output contract.

| Group | Execution and validation work |
|---|---|
| Maths | Exact arithmetic, algebra, geometry, statistics, probability, calculus; substitution and domain/completeness checks |
| Physics | Unit-aware equations, conservation laws, explicit constants and assumptions |
| Chemistry | Stoichiometry, balance of atoms/charge, concentration, limiting reagents, equilibrium assumptions |
| Accountancy | Journal/ledger model, debit-credit equality, cash-flow reconciliation, consistent currency/rounding |
| Economics | Formula and graph models with explicit conventions, domain bounds, scenario interpretation |
| Computer science | Restricted execution sandbox, input/output tests, trace checks, no network/file access |
| Biology and factual humanities | Source-supported retrieval and claim checks; separate quantitative families |
| English/Hindi and interpretive subjects | Grammar/rubric checks, source fidelity, transparent interpretation rather than unique-answer claims |
| Images/pages/multipart | Extraction confirmation, inherited context, separate verdict per part, no partial-to-whole verification promotion |

Use adapters to preserve existing investment. Retire duplicate implementations
only after comparison tests establish equivalent or better behavior.

## 10. Test and release gates

Required tests:
1. Deterministic hit -> correct answer with zero provider calls.
2. Deterministic miss -> LLM proposal -> solver validation -> answer displayed.
3. Incorrect LLM answer -> verifier disagreement -> repaired answer.
4. Still-unverifiable answer -> labelled best-effort, not trusted-cache promotion.
5. Missing essential data -> targeted clarification, no invented givens.
6. Provider outage/rate limit -> bounded retry state, no fabricated solution.
7. Injection, resource exhaustion, malformed JSON, and cross-student data guards.
8. Approved family handles new numbers/units without another LLM call.
9. Candidate family stays quarantined after a false positive or failed check.
10. Version invalidation, concurrent promotion, rollback, and cache isolation.
11. Each subject: canonical, paraphrase, held-out, boundary, and adversarial cases.
12. UI/API journey: question -> answer -> check explanation -> save -> future reuse.

Report answer availability, verified accuracy, unsupported-family coverage,
clarification rate, LLM-call rate, repair success, cost per solved question,
p50/p95 latency, candidate promotion failures, and wrong-family matches.
Report best-effort and verified accuracy separately. Do not treat passing
generated fixtures as proof of universal novel-question competence.

## 11. Implementation sequence and completion criteria

### Milestone A: inventory and contract
Map active routes/families; reconcile root/deploy copies; add answer provenance
and verification states; CI covers master/main/develop and both backend suites.

### Milestone B: fallback answer loop
Implement orchestrator, schema-validated LLM proposal, deterministic execution,
bounded repair, transparent publication, and request-scoped provider telemetry.

### Milestone C: safe reuse
Add scoped exact cache, candidate-family registry, independent fixtures,
quarantine, shadow evaluation, approval, versioning, and rollback.

### Milestone D: subject migration
Migrate maths/units first, then physics/chemistry, commerce/CS, and source/rubric
subjects. Integrate image and multipart routes using per-part evidence.

### Milestone E: production validation
Test killable workers under saturation; fix readiness and Qdrant production
probes; require image/solver release versions; verify deployed artifacts;
pilot with students and teachers on unseen questions.

A family is complete when it has a scoped recognizer, input contract, validated
method, appropriate verifier, held-out/adversarial tests, telemetry, versioned
deployment, and an LLM recovery path for questions outside its scope.

**Success means fewer repeat LLM calls as validated coverage grows, while the
student always has a useful next step. It does not mean claiming every answer
is verified or automatically trusting everything the LLM teaches the system.**
