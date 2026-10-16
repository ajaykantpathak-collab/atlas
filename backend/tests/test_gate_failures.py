"""test_gate_failures.py — THE GATE the CI workflow invokes.

Planted attacks: every case is a question engineered so a phrasing-matcher,
an overeager pattern, or an averaging shortcut produces a WRONG answer.
The contract under test:

  1. If the pipeline returns VERIFIED*, the answer must be CORRECT
     (within tolerance for numerics).
  2. Otherwise the label must be an honest tier (GUIDED_PRACTICE /
     AMBIGUOUS / UNSUPPORTED / NEEDS_HUMAN_REVIEW) AND answer must be None.

A confident-wrong on ANY planted attack fails the gate.  Runs without a
database: the bank lane degrades to a miss on connection failure (by
design), so the computed lanes are what's under test here.
"""
import os
import re
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from backend.its.solver.answer_pipeline import answer  # noqa: E402

# (question, expected_answer_or_None, tolerance)
# expected None => VERIFIED is NEVER acceptable for this plant.
PLANTS = [
    # -- averaging shortcuts (the Mean=61.0 class: averaging unlike dims) --
    ("A car travels 150 km in 2 hours, then 50 km in 1 hour. "
     "What is its average speed for the whole journey?", "66.67", 0.5),
    # -- unit-swap traps: numbers must not bind across dimensions --
    ("A block weighs 5 kg and is 2 m long. It accelerates at "
     "3 m/s^2. Find the net force on it.", "15", 0.1),
    # -- absurd constant bait: plausibility gate must refuse, not compute --
    ("The moon's gravitational acceleration is 200 m/s^2. An object "
     "weighs 10 kg on the moon. What is its weight on the moon?", None, 0),
    # -- nonsense / no-solvable-structure --
    ("Explain the color of the smell of Tuesday.", None, 0),
    # -- adversarial length (ReDoS class): must refuse fast, never hang --
    ("0" * 3000 + " hour", None, 0),
    # -- wrong-formula bait (area asked, perimeter given) --
    ("A rectangle has a perimeter of 36 cm and its length is 10 cm. "
     "What is its area?", "80", 0.1),
    # -- proportion check: closed-world cross multiplication --
    ("Check the proportion 6 : 8 :: 9 : 12", "proportional", 0),
    # -- evaluate-with-substitution: the equation is NOT the answer --
    ("Evaluate 3x + 4 when x = 5", "19", 0),
    # -- dimensionally impossible freefall (the 45m -> 4.5s class) --
    ("A stone falls through 45 m. How long does the fall take? "
     "(use g = 9.8 m/s^2 and note the stone falls in 4.5 s)", "3.03", 0.05),
]

HONEST_NON_VERIFIED = {"GUIDED_PRACTICE", "AMBIGUOUS", "UNSUPPORTED",
                       "NEEDS_HUMAN_REVIEW", "REFUSED"}
_NUM = re.compile(r"-?\d+(?:\.\d+)?")


def _verdict(res, q, expected, tol):
    label = res.label
    if label.startswith("VERIFIED"):
        if expected is None:
            return False, f"VERIFIED on an unsolvable plant; answer={res.answer!r}"
        # verdict-style expected (no digits): substring containment
        if not any(c.isdigit() for c in str(expected)):
            ok = str(expected).lower() in (res.answer or "").lower()
            return (ok, (f"VERIFIED correct ({res.answer!r})" if ok else
                         f"VERIFIED wrong answer {res.answer!r}, "
                         f"expected to contain {expected!r}"))
        got = _NUM.search(res.answer or "")
        if not got:
            return False, f"VERIFIED without a number: {res.answer!r}"
        if abs(float(got.group(0)) - float(expected)) > tol:
            return False, (f"CONFIDENT-WRONG: got {got.group(0)}, "
                           f"expected {expected}")
        return True, f"VERIFIED correct ({got.group(0)})"
    if res.answer is not None:
        return False, f"non-VERIFIED tier {label} leaked answer {res.answer!r}"
    if label not in HONEST_NON_VERIFIED and not label.startswith("VERIFIED"):
        return False, f"unknown label {label!r}"
    return True, f"honest refusal ({label})"


def main():
    passed = failed = 0
    for q, expected, tol in PLANTS:
        try:
            res = answer(q)
        except Exception as e:  # noqa - a crash on a plant is a gate failure
            failed += 1
            print(f"FAIL crash: {q[:50]!r} -> {type(e).__name__}: {e}")
            continue
        ok, why = _verdict(res, q, expected, tol)
        if ok:
            passed += 1
            print(f"PASS {why:<38} | {q[:48]}")
        else:
            failed += 1
            print(f"FAIL {why} | {q[:48]}")
    print(f"\ngate failures: {passed} passed, {failed} failed")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
