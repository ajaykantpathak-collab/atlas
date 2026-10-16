"""test_family_audit.py -- exemplar-level verifier audit as a pytest gate.

Owner law (2026-10-07): every solver family invariant must be
self-consistent with the family's own exemplars BEFORE ship.  History:
an expanded-invariants batch shipped 19 false-FAILs (wrong verifiers
withholding CORRECT answers) because nothing ran the registry against
its own families.  This test is that gate.

Rules enforced:
  1. No verifier may return FAIL on a family's own exemplar output.
     (A false-fail withholds a correct answer — worse than no verifier.)
  2. Verifier coverage is reported but not asserted — families that
     never compute (prose/proof exemplars) are legitimately uncovered.
  3. Computes must not crash on their own exemplars.
"""

from __future__ import annotations

import math

import pytest

from backend.its.solver.structure_families import STRUCTURE_SPECS
from backend.its.solver.independent_verifier import (
    check_route, DECLARATIVE_INVARIANTS, VERIFIERS, CONCEPTUAL_INVARIANTS,
)


class _FakeResult:
    """Minimal result surface check_route needs."""

    def __init__(self, out):
        num, steps, ans = out[0], out[1], (out[2] if len(out) > 2 else None)
        self.numeric_answer = num
        self.final_answer = str(ans if ans is not None else (num or ""))
        self.quantities = {}
        self.steps = list(steps) if steps else []
        self.plan = []


def _iter_exemplar_checks():
    for sid in sorted(STRUCTURE_SPECS):
        spec = STRUCTURE_SPECS[sid]
        compute = spec.get("compute")
        if not callable(compute):
            continue
        for ex in spec.get("exemplars") or []:
            try:
                out = compute({}, ex)
            except Exception:
                # a crash on an OWN exemplar is a family bug, surfaced
                # separately from verifier verdicts
                yield sid, ex, "crash"
                continue
            if not out:
                continue  # compute declined -> nothing to verify
            try:
                verdict = check_route(sid, ex, _FakeResult(out))
            except Exception:
                yield sid, ex, "verifier-crash"
                continue
            yield sid, ex, verdict


def test_no_verifier_false_fails_on_own_exemplars():
    fails = []
    crashes = []
    for sid, ex, verdict in _iter_exemplar_checks():
        if verdict == "crash":
            crashes.append(f"{sid}: compute crashed on <<{ex[:60]}>>")
        elif verdict == "verifier-crash":
            crashes.append(f"{sid}: verifier crashed on <<{ex[:60]}>>")
        elif verdict and verdict[0] == "fail":
            fails.append(f"{sid}: {verdict[1][:90]} | <<{ex[:55]}>>")

    assert not crashes, "family computes crashed on their own exemplars:\n" + \
        "\n".join(crashes)
    assert not fails, (
        "verifier FAILs on own exemplar output — a false-fail withholds "
        "a CORRECT answer. Fix the invariant's binding/when guard, scope "
        "the ask, or remove the invariant (a wrong verifier is worse "
        "than none):\n" + "\n".join(fails))


def test_verifier_coverage_report(capsys):
    """Report-only: how many families carry a verifier route."""
    covered = sum(
        1 for sid in STRUCTURE_SPECS
        if sid in VERIFIERS or sid in DECLARATIVE_INVARIANTS
        or sid in CONCEPTUAL_INVARIANTS)
    total = len(STRUCTURE_SPECS)
    print(f"\nverifier coverage: {covered}/{total} "
          f"({100.0 * covered / total:.1f}%)")
    assert covered > 0


def test_invariant_entries_are_sane():
    """Every declarative entry: vars tuple, callable lambda, desc,
    extract mode ('positional' or dict), optional when-regex compiles."""
    import re
    for sid, inv in DECLARATIVE_INVARIANTS.items():
        assert len(inv) >= 4, f"{sid}: invariant tuple too short"
        var_names, fn, _desc, extract = inv[0], inv[1], inv[2], inv[3]
        assert callable(fn), f"{sid}: lambda not callable"
        assert isinstance(var_names, tuple), f"{sid}: vars not a tuple"
        assert extract == "positional" or isinstance(extract, dict), \
            f"{sid}: bad extract mode {extract!r}"
        if len(inv) > 4 and inv[4]:
            re.compile(inv[4])  # when-regex must compile
        # arity sanity: lambda must accept the declared vars
        argc = fn.__code__.co_argcount
        assert argc == len(var_names), \
            f"{sid}: lambda arity {argc} != vars {len(var_names)}"
