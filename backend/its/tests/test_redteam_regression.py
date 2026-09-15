"""Red-team regression: the 47-question adversarial corpus.

Contract: any answer the solver labels VERIFIED must numerically match
one of the true-answer values.  A VERIFIED answer that mismatches the
truth is a wrong-verified -- the exact failure class the 2026-09-11
attack wave exposed.  Honest refusals always pass.
"""
import json
import os
import re
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

CORPUS = os.path.join(os.path.dirname(__file__), "..", "..", "..",
                      "_redteam", "questions.json")


def _numbers(s):
    """Numbers in a true-answer string, scientific-notation aware.

    Understands both surface forms used across the corpora: "4.8e6" and
    "2.43 x 10^3".  Without the exponent forms a CORRECT SI answer
    ("4.8e+06 J") misjudges against the true "4.8e6 J" (parsed as 4.8
    and 6) -- a gate defect, not a solver defect.
    """
    txt = str(s).replace(",", "")
    vals = []
    for m in re.finditer(r"\d+(?:\.\d+)?(?:[eE][+-]?\d+)?", txt):
        try:
            vals.append(float(m.group(0)))
        except ValueError:
            pass
    for m in re.finditer(r"(\d+(?:\.\d+)?)\s*[x\u00d7]\s*10\s*(?:\^|\*\*)?"
                         r"\s*([+-]?\d+)", txt):
        vals.append(float(m.group(1)) * 10.0 ** int(m.group(2)))
    return vals


def _load():
    qs = json.load(open(CORPUS, encoding="utf-8"))
    return [q for q in qs if q.get("id") not in ("INT-03", "MOT-03")]


QS = _load()
IDS = [q["id"] for q in QS]


@pytest.mark.parametrize("q", QS, ids=IDS)
def test_never_wrong_verified(q):
    from backend.its.solver.answer_pipeline import answer
    r = answer(q["q"])
    if r.label != "VERIFIED":
        return  # honest refusal: always acceptable
    true_nums = _numbers(q.get("true"))
    got = r.numeric
    if got is None:
        ans_nums = _numbers(r.answer or "")
        got = ans_nums[0] if ans_nums else None
    if got is None:
        pytest.fail(f"{q['id']}: VERIFIED without a numeric answer")
    ok = any(abs(got - t) <= max(abs(t) * 0.02, 0.05)
             for t in true_nums)
    assert ok, (f"{q['id']} WRONG-VERIFIED: solver={got} "
                f"true={q['true']} steps={r.steps[:2]}")
