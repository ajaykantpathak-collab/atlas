# SOLVER STEP CONTRACT — the written standard every solver family must meet

> This closes the third enforcement gap. Agents can no longer self-report depth:
> the contract is asserted by each subject's test harness (a thin family = a RED
> test, not an opinion) and re-checked by the independent auditor
> (`_cisce_build/audit_families_contract.py`) which never trusts the agent.

## The 5 beats — every family's `steps` output, in order

1. **Method line** — names the law / formula / rule / identity and WHY it applies
   to this question. ("Law of conservation of mass: atoms in = atoms out, so we
   balance each element.")
2. **Substitution line(s)** — the given values substituted INTO the relation,
   WITH UNITS wherever units exist.
3. **Computation line(s)** — the arithmetic, shown, not skipped.
4. **Verification line** — substitute the answer back / sanity-check / tally
   (trial balance tallies, atoms balance, identity closes).
5. **Interpretation line** — one sentence on what the answer MEANS in context.

## Minimums

| Family class | Steps | Total chars |
|---|---|---|
| Standard (multi-concept) | ≥ 3 | ≥ 150 |
| Atomic (one arithmetic op, e.g. "15% of 240") | ≥ 2 | ≥ 80 |

Biology's own bar is higher (≥ 3 steps, ≥ 200 chars) — it set the gold standard
with 9-step Punnett output; others must rise to the standard, biology never
lower to theirs.

## Structured payload

- `method` (technique name) must travel in the result payload/`extra` where the
  module supports it.
- Where the authored corpus flags a classic trap for the topic, the family
  notes that trap (misconception) — sourced from corpus diagnostics, never
  invented.

## Negative requirement

Every family must DECLINE on at least one other-subject probe (gates or
no-match). Cross-subject misfires are test failures.

## Enforcement

1. **Per-subject harness assertions** — `test_families.py`,
   `test_physics_families.py`, `test_chemistry_families.py`,
   `test_biology_families.py`, `test_accountancy_families.py`,
   `test_economics_families.py` each assert the contract on every probe case.
2. **Independent audit** — `_cisce_build/audit_families_contract.py` re-imports
   the modules, re-fires the probes itself, re-measures steps/chars/beats, and
   checks root↔deploy tree drift. Its verdict is the acceptance gate; agent
   self-reports are not evidence.
3. **Definition of done** per subject: full suite green + auditor zero hard
   violations + tree drift zero.
