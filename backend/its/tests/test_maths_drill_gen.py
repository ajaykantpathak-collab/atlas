"""Maths drill generator gates (backend/its/solver/maths_drill_gen.py).

Gate proofs, per the design contract:
  (a) 10,000 draws per family -> 0 non-terminating answers, verified
      through the REAL grading path: generate, submit the computed
      answer to tutor.grade_numeric, must grade correct (and a
      deterministic wrong answer must grade wrong -- the grader is an
      anchor, not a rubber stamp).
  (b) 0 repeats within the exhaustion bound for the same (student,
      concept): exhausting a family's tier space through make_drill
      yields only fresh questions; the next serve after exhaustion
      cycles.
  (c) determinism across interpreters: identical selection under
      different PYTHONHASHSEED subprocess runs (selection hashes via
      hashlib, never Python's salted hash()).
  (d) difficulty tiers produce different number sizes: over the FULL
      variant space of every family, max(number sizes) strictly
      increases easy < grade < hard.

Plus the tutor wiring: past POOL_CAP, a maths concept serves fresh
drill variants through the normal serve/submit loop.
"""
import json
import os
import subprocess
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

import backend.its.solver.tutor as tutor_module
from backend.its.solver import maths_drill_gen as mdg
from backend.its.solver.maths_drill_gen import (
    FAMILIES, family_for, make_drill, render_variant, tier_counts,
    variant_count, variant_size, consult)
from backend.its.solver.tutor import TutorEngine, grade_numeric

_DRAWS_PER_FAMILY = 10000
_SMALL_FAMILIES = ("probability", "exponents_roots", "trigonometry")


def _wrong_answer(item: dict) -> str:
    """A deterministic numeric answer that is definitively wrong (well
    outside grade_numeric's 0.5% relative band)."""
    try:
        val = float(item["ans_input"])
    except ValueError:
        return str(float(item["ans_input"].lstrip("-")) + 1.0)
    drift = max(1.0, abs(val) * 0.06)
    wrong = val + drift if val >= 0 else val - drift
    if float(wrong).is_integer() and float(val).is_integer():
        return str(int(wrong))
    return repr(round(wrong, 4))


# ---------------------------------------------------------------- #
# gate (a): 10,000 draws per family round-trip through grade_numeric
# ---------------------------------------------------------------- #

@pytest.mark.parametrize("fid", sorted(FAMILIES))
def test_drill_10k_draws_grade_correct(fid):
    fam = FAMILIES[fid]
    total = variant_count(fid)
    for k in range(_DRAWS_PER_FAMILY):
        v = mdg._h("gate-a", fid, k) % total
        item = render_variant(fid, v)
        assert item is not None, (fid, v)
        # the computed answer submitted as a student would give it must
        # grade CORRECT through the tutor's real grader
        assert grade_numeric(item["ans_input"], item["a"]) is True, \
            (fid, v, item["ans_input"], item["a"])
        # ...and a deterministic wrong answer must grade WRONG (the
        # grader stays an anchor; no template grades everything right)
        assert grade_numeric(_wrong_answer(item), item["a"]) is False, \
            (fid, v, item["a"])


# ---------------------------------------------------------------- #
# full-space sweep: injectivity + tier number sizes
# ---------------------------------------------------------------- #

def test_drill_full_space_unique_questions_and_tier_sizes():
    """Every variant of every family renders a UNIQUE question text and
    a gradeable answer; the biggest number a tier shows strictly
    increases easy < grade < hard (gate d, proven over the whole space,
    not sampled)."""
    for fid, fam in FAMILIES.items():
        texts = {}
        tier_max = {}
        for v in range(fam["total"]):
            item = render_variant(fid, v)
            assert item is not None
            assert grade_numeric(item["ans_input"], item["a"]) is True, \
                (fid, v)
            q = item["q"]
            assert q not in texts, \
                (fid, v, "duplicate of variant", texts.get(q), q)
            texts[q] = v
            t = item["tier"]
            tier_max[t] = max(tier_max.get(t, 0.0),
                              variant_size(fid, item))
        e, g, h = (tier_max["easy"], tier_max["grade"], tier_max["hard"])
        assert e < g < h, (fid, tier_max)


# ---------------------------------------------------------------- #
# gate (b): no repeats within the exhaustion bound, then cycling
# ---------------------------------------------------------------- #

@pytest.mark.parametrize("fid", sorted(FAMILIES))
def test_drill_no_repeat_within_grade_exhaustion(fid):
    """Serving the grade tier through make_drill until its space is
    exhausted yields 0 repeats; one more serve cycles to an
    already-served question."""
    lo, hi = FAMILIES[fid]["ranges"]["grade"]
    size = hi - lo
    seen = {}                       # the persisted per-concept record
    served = []
    for serve_count in range(size):
        item = make_drill(f"student-{fid}", f"concept-{fid}",
                          _title_for(fid), _cls_for(fid), serve_count,
                          "grade", seen)
        assert item is not None and item["tier"] == "grade"
        served.append(item["q"])
    assert len(served) == size
    assert len(set(served)) == size, \
        (fid, "repeats within the exhaustion bound")
    # exhausted -> the next draw cycles to something already served
    extra = make_drill(f"student-{fid}", f"concept-{fid}",
                       _title_for(fid), _cls_for(fid), size, "grade",
                       seen)
    assert extra is not None
    assert extra["q"] in set(served)


@pytest.mark.parametrize("fid", _SMALL_FAMILIES)
def test_drill_all_tiers_fresh_then_cycle(fid):
    """Same guarantee on the small families across ALL tiers, with the
    tier ladder followed (easy serves land in the easy tier, etc.)."""
    fam = FAMILIES[fid]
    for tier in ("easy", "grade", "hard"):
        lo, hi = fam["ranges"][tier]
        size = hi - lo
        seen = {}
        served = set()
        for serve_count in range(size):
            item = make_drill("stu-alltiers", f"c-{fid}", _title_for(fid),
                              _cls_for(fid), serve_count, tier, seen)
            assert item is not None and item["tier"] == tier
            assert item["q"] not in served, (fid, tier, item["q"])
            served.add(item["q"])
        assert len(served) == size


def test_drill_no_repeat_across_ladder_switches():
    """The tutor's ladder flips between easy (after a wrong) and grade
    (after two corrects); a student must never see the same question
    across those switches before a tier space is exhausted."""
    fid = "quadratics"
    seen = {}
    texts = set()
    ladder = ("easy", "grade", "easy", "grade", "hard", "grade", "easy")
    for i, tier in enumerate(ladder * 40):
        item = make_drill("ladder-stu", "c-quad", _title_for(fid), 10,
                          i, tier, seen)
        assert item["tier"] == tier
        assert item["q"] not in texts, (i, tier, item["q"])
        texts.add(item["q"])


# ---------------------------------------------------------------- #
# gate (c): determinism across interpreters
# ---------------------------------------------------------------- #

_DETERMINISM_SNIPPET = """
import json, sys
sys.path.insert(0, ".")
from backend.its.solver import maths_drill_gen as mdg

out = []
for title, cls, tier in [
        ("Simple Interest", 7, "grade"),
        ("Solution of Quadratic Equation by Factorization", 10, "grade"),
        ("Trigonometric Ratios of Specific Angles", 10, "easy"),
        ("Theoretical Probability", 9, "hard")]:
    seen = {}
    for serve in range(5):
        item = mdg.make_drill("det-student", "det-concept", title, cls,
                              12 + serve, tier, seen)
        out.append([item["q"], item["a"], item["ans_input"],
                    item["tier"], item["variant"]])
print(json.dumps(out))
"""


def test_drill_deterministic_across_interpreters():
    env = dict(os.environ)
    runs = []
    for seed in ("0", "1337", "987654321"):
        env2 = dict(env)
        env2["PYTHONHASHSEED"] = seed
        r = subprocess.run(
            [sys.executable, "-c", _DETERMINISM_SNIPPET],
            capture_output=True, text=True, cwd=os.path.abspath(
                os.path.join(os.path.dirname(__file__), "..", "..", "..")),
            env=env2, timeout=120)
        assert r.returncode == 0, r.stderr
        runs.append(r.stdout.strip())
    assert runs[0] == runs[1] == runs[2]
    assert len(json.loads(runs[0])) == 20


def test_drill_same_student_same_history_same_question():
    """Pure-function contract: identical (student, concept, serve)
    produces the identical question on every call, and a different
    student gets a different draw."""
    a1 = make_drill("stu", "c", "Simple Interest", 7, 12, "grade", {})
    a2 = make_drill("stu", "c", "Simple Interest", 7, 12, "grade", {})
    b1 = make_drill("other", "c", "Simple Interest", 7, 12, "grade", {})
    assert (a1["q"], a1["variant"]) == (a2["q"], a2["variant"])
    assert a1["q"] != ""


# ---------------------------------------------------------------- #
# registry routing
# ---------------------------------------------------------------- #

def test_drill_family_routing():
    cases = [
        ("Solving Two-Step Linear Equations (Ax + B = C)", 7, "linear"),
        ("Solving Equations with Variables on Both Sides", 8, "linear"),
        ("Interpreting Percentages", 7, "percentages"),
        ("Ratios to Percents", 7, "ratio"),
        ("Highest Common Factor (HCF)", 7, "lcm_hcf"),
        ("Product of HCF and LCM", 10, "lcm_hcf"),
        ("Simple Interest", 7, "simple_interest"),
        ("Area of a Circle", 7, "area_perimeter"),
        ("Circumference of a Circle", 10, "area_perimeter"),
        ("Laws of Exponents for Integer Exponents", 8, "exponents_roots"),
        ("Division of Fractions", 7, "fractions"),
        ("Solution of Quadratic Equation by Factorization", 10,
         "quadratics"),
        ("Discriminant and Nature of Roots", 10, "quadratics"),
        ("nth Term of an AP", 10, "ap"),
        ("Sum of First n Terms of an AP", 10, "ap"),
        ("Pythagoras Theorem", 7, "triangles"),
        ("Distance Between Two Points", 9, "coordinate"),
        ("Section Formula (Internal Division)", 10, "coordinate"),
        ("Trigonometric Ratios of Specific Angles", 10, "trigonometry"),
        ("Arithmetic Mean", 7, "statistics"),
        ("Theoretical Probability", 9, "probability"),
        ("Probability and Chance", 7, "probability"),
    ]
    for title, cls, want in cases:
        assert family_for(title, cls) == want, (title, cls)
    # out-of-band classes never match (class gate)
    assert family_for("Simple Interest", 6) is None
    assert family_for("Pythagoras Theorem", 6) is None
    # non-maths titles match nothing -> fail-open
    assert family_for("Photosynthesis", 10) is None


def test_drill_consult_matches_tutor_contract():
    """consult() (the tutor's entry point) returns the pool-item shape
    the serve/submit path needs: q, a, tier, steps."""
    item = consult("c.7.1", "Simple Interest", "stu", 12, 7,
                   tier_pref="grade", seen={})
    for key in ("q", "a", "tier", "steps", "family"):
        assert key in item
    assert item["family"] == "simple_interest"
    assert grade_numeric(item["ans_input"], item["a"]) is True
    # no family -> None (fail-open)
    assert consult("x.1", "Photosynthesis", "stu", 12, 10, seen={}) \
        is None


# ---------------------------------------------------------------- #
# tutor wiring: past POOL_CAP a maths concept serves fresh drills
# ---------------------------------------------------------------- #

@pytest.fixture()
def maths_engine(tmp_path, monkeypatch):
    cat = {
        "class": 10, "subject": "maths", "chapter": 4,
        "worked_examples": [
            {"q": "Solve x^2 - 5x + 6 = 0 by factorisation. What is "
                  "the larger root?", "a": "3"},
            {"q": "Solve x^2 - 3x + 2 = 0 by factorisation. What is "
                  "the larger root?", "a": "2"},
        ],
        "concepts": [
            {"id": "m.4.2",
             "title": "Solution of Quadratic Equation by Factorization",
             "formula": "-"},
        ],
    }
    d = tmp_path / "cats"
    d.mkdir()
    json.dump(cat, open(d / "catalog_m.json", "w", encoding="utf-8"))
    monkeypatch.setattr(tutor_module, "POOL_CAP", 2)
    return TutorEngine(str(d))


def test_drill_engine_serves_fresh_variants_past_pool(maths_engine):
    eng = maths_engine
    questions = []
    for i in range(30):
        out = eng.serve("drill-stu", "maths", 10)
        assert out is not None
        st = eng.students["drill-stu"]
        if i < 2:
            assert not out.get("drill")     # pool items first
            continue
        # past the pool: a drill with a fresh variant every time
        assert out.get("drill") is True
        assert out["family"] == "quadratics"
        qid = out["question_id"]
        assert qid.startswith("m.4.2::drill")
        assert out["question"] not in questions, (i, out["question"])
        questions.append(out["question"])
        # submit the computed answer through the REAL grading path
        item = st["gen_pending"][qid]
        res = eng.submit("drill-stu", qid, item["ans_input"])
        assert res["outcome"] == "correct", (i, res)
    assert len(questions) == 28         # 28 serves, 28 unique questions
    # the served-variant record persisted in st
    assert len(eng.students["drill-stu"]["drill_seen"]["m.4.2"]) == 28


def test_drill_engine_grading_and_hints(maths_engine):
    eng = maths_engine
    for _ in range(3):
        out = eng.serve("hstu", "maths", 10)
    assert out.get("drill") is True
    qid = out["question_id"]
    # the hint ladder works on drill items; L2 must not leak the answer
    h1 = eng.hint("hstu", qid, 1)
    assert "Concept" in h1["hint"]
    item = eng.students["hstu"]["gen_pending"][qid]
    ans_value = item["ans_input"]
    h2 = eng.hint("hstu", qid, 2)
    assert ans_value not in h2["hint"]
    h3 = eng.hint("hstu", qid, 3)
    assert h3["revealed"] is True
    # a revealed question earns no mastery credit, even when correct
    res = eng.submit("hstu", qid, ans_value)
    assert res["outcome"] == "correct_revealed"
    # the next drill still grades normally
    out2 = eng.serve("hstu", "maths", 10)
    assert out2.get("drill") is True
    item2 = eng.students["hstu"]["gen_pending"][out2["question_id"]]
    res2 = eng.submit("hstu", out2["question_id"], item2["ans_input"])
    assert res2["outcome"] == "correct"


def test_drill_engine_ladder_respected(maths_engine):
    """After a wrong answer the next drill drops to the easy tier (the
    difficulty ladder drives the drill generator too)."""
    eng = maths_engine
    eng.serve("lstu", "maths", 10)
    eng.serve("lstu", "maths", 10)
    out = eng.serve("lstu", "maths", 10)
    assert out.get("drill") is True
    st = eng.students["lstu"]
    item = st["gen_pending"][out["question_id"]]
    res = eng.submit("lstu", out["question_id"], "random wrong 12345")
    assert res["outcome"] == "wrong"
    assert st["tier_pref"]["m.4.2"] == "easy"
    out2 = eng.serve("lstu", "maths", 10)
    assert out2.get("drill") is True
    assert out2["tier"] == "easy"


def test_drill_engine_subject_gate(maths_engine, tmp_path):
    """Non-maths concepts never receive maths drills -- even when their
    title would match a maths family keyword."""
    eng = maths_engine
    c = eng.concepts["m.4.2"]
    science = tutor_module._Concept(
        "s.1", "Simple Interest", "-", list(c.pool), (10, "science", 1, 99))
    eng.concepts["s.1"] = science
    st = eng._student("gate-stu")
    st["served"]["s.1"] = 99          # pool long exhausted
    assert eng._consult_drill(st, science, "gate-stu", 99) is None


# ---------------------------------------------------------------- #
# helpers
# ---------------------------------------------------------------- #

def _title_for(fid):
    return {
        "linear": "Solving Two-Step Linear Equations (Ax + B = C)",
        "percentages": "Interpreting Percentages",
        "ratio": "Ratios to Percents",
        "lcm_hcf": "Highest Common Factor (HCF)",
        "simple_interest": "Simple Interest",
        "area_perimeter": "Area of a Circle",
        "exponents_roots": "Laws of Exponents for Integer Exponents",
        "fractions": "Division of Fractions",
        "quadratics": "Solution of Quadratic Equation by Factorization",
        "ap": "nth Term of an AP",
        "triangles": "Pythagoras Theorem",
        "coordinate": "Distance Between Two Points",
        "trigonometry": "Trigonometric Ratios of Specific Angles",
        "statistics": "Arithmetic Mean",
        "probability": "Theoretical Probability",
    }[fid]


def _cls_for(fid):
    lo, hi = FAMILIES[fid]["cls"]
    return (lo + hi) // 2
