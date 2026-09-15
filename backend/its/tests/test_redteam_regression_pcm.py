"""Red-team regression: the 45-question PCM (class 11-12) corpus.

Contract: any answer the solver labels VERIFIED must numerically match
one of the true-answer values within 2% (mirroring
test_redteam_regression.py).  A VERIFIED answer that mismatches the
truth is a wrong-verified -- the exact failure class the 2026-09-12
attack wave exposed (unit-blind ns restated as the answer, mL volumes
added, determinant entries multiplied, anchor answers transferred
verbatim).  Honest refusals always pass.

The number extraction understands scientific notation in both of its
surface forms ("4.8e6", "2.43 x 10^3"), so a correct SI answer can
match a true answer written with a power of ten.
"""
import json
import os
import re
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

CORPUS = os.path.join(os.path.dirname(__file__), "..", "..", "..",
                      "redteam_attack", "questions.json")


def _numbers(s):
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
    data = json.load(open(CORPUS, encoding="utf-8"))
    qs = data["questions"] if isinstance(data, dict) else data
    out = []
    for q in qs:
        out.append({"id": q["id"],
                    "q": q.get("text") or q.get("q") or q.get("question"),
                    "true": q.get("true_answer") or q.get("true")})
    return [q for q in out if q["q"] and q["true"] is not None]


QS = _load()
IDS = [q["id"] for q in QS]


@pytest.mark.parametrize("q", QS, ids=IDS)
def test_never_wrong_verified(q):
    from backend.its.solver.answer_pipeline import answer
    r = answer(q["q"])
    if r.label not in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS",
                       "VERIFIED_OFFICIAL"):
        return  # honest refusal: always acceptable
    true_nums = _numbers(q.get("true"))
    got = r.numeric
    if got is None:
        ans_nums = _numbers(r.answer or "")
        got = ans_nums[0] if ans_nums else None
    if got is None:
        pytest.fail(f"{q['id']}: VERIFIED without a numeric answer")
    ok = any(abs(got - t) <= max(abs(t) * 0.02, 0.05) for t in true_nums)
    assert ok, (f"{q['id']} WRONG-VERIFIED: solver={got} "
                f"true={q['true']} steps={r.steps[:2]}")
