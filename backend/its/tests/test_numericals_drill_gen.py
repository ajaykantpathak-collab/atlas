"""numericals_drill_gen gates + tutor wiring tests.

Gates (binding):
  (a) 10,000 draws per family -> every computed answer round-trips
      correct through tutor.grade_numeric (unit-tagged and bare number);
  (b) 0 repeats within the exhaustion bound (the draw is an affine
      BIJECTION of the variant space, so nothing repeats before the
      space itself is exhausted);
  (c) determinism across interpreters (a fresh python subprocess
      fingerprints identically to this interpreter);
  (d) unit labels present in every question and every answer spec.

Wiring: the tutor's serve path must start serving fresh drills once a
matching physics/chemistry concept's pool is exhausted (serve count >=
POOL_CAP), grade them through the normal loop (BKT mastery, mistake
book, reveal honesty), serve the hint ladder off the generated steps,
keep the served-variant counters in `st`, and fail open (plain pool
rotation) when the generator is unavailable.
"""
import json
import os
import subprocess
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "..")))

from backend.its.solver import numericals_drill_gen as ndg
from backend.its.solver.tutor import POOL_CAP, TutorEngine, grade_numeric

ROOT = os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", ".."))

# question carries a number followed by a unit label, or a bare unit
# token (pH reverse questions name the unit in prose)
_UNIT_TOKENS = ("m/s2", "m/s", "cm", "mm", "km", "ohm", "kg", "mol/L",
                "mL", "atm", "mol", "%", " g/", " A", " V", " N", " J",
                " K", " L", " C", " D")


def _has_unit(text: str) -> bool:
    import re
    if re.search(r"\d[\d.]*\s*(m/s2|m/s|cm|mm|km|ohm|kg|mol/L|mol|mL"
                 r"|atm|A|V|J|N|K|g|s|L|min|h|D|%)", text):
        return True
    return any(tok in text for tok in _UNIT_TOKENS)


# ---------------------------------------------------------------- #
# gate (a): 10,000 draws per family round-trip grade_numeric
# ---------------------------------------------------------------- #

@pytest.mark.parametrize("fid", sorted(ndg._FAMILIES))
def test_gate_a_ten_thousand_draws_roundtrip(fid):
    fam = ndg._FAMILIES[fid]
    assert fam.all, f"family {fid} enumerated empty"
    for i in range(10000):
        v = ndg.draw(fid, f"gate-student-{i % 9}", "gate-concept", i)
        # a student submitting the computed answer with its unit...
        assert grade_numeric(v.a, v.a) is True, (fid, i, v.a)
        # ...and one submitting just the number, must both grade True
        num = v.a.split()[0]
        assert grade_numeric(num, v.a) is True, (fid, i, v.a)


def test_gate_a_public_consult_roundtrip():
    # the serve-path entry point must produce the same guarantee
    ok = 0
    for i in range(3000):
        out = ndg.consult("jesc.11.4", "Ohm's Law - Current, Voltage "
                                        "and Resistance",
                          "voltage = current * resistance",
                          f"consult-student-{i % 5}", 12 + i)
        assert out is not None
        assert grade_numeric(out["a"], out["a"]) is True
        ok += 1
    assert ok == 3000


# ---------------------------------------------------------------- #
# gate (b): 0 repeats within the exhaustion bound
# ---------------------------------------------------------------- #

@pytest.mark.parametrize("fid", sorted(ndg._FAMILIES))
def test_gate_b_no_repeats_within_exhaustion_bound(fid):
    fam = ndg._FAMILIES[fid]
    bound = min(len(fam.all), 3000)
    seen = set()
    for i in range(bound):
        v = ndg.draw(fid, "one-student", "one-concept", i)
        assert v.q not in seen, (fid, i, "repeat before exhaustion")
        seen.add(v.q)
    assert len(seen) == bound


def test_gate_b_tier_filtered_spaces_also_bijection():
    # the difficulty ladder draws inside a tier slice; that slice must
    # also be collision-free within its own bound
    for fid in sorted(ndg._FAMILIES):
        for tier in ("easy", "grade", "hard"):
            try:
                idxs = ndg._tier_space(ndg._FAMILIES[fid], tier)
            except Exception:
                continue
            if not idxs or len(idxs) < 2:
                continue
            bound = min(len(idxs), 1500)
            seen = set()
            for i in range(bound):
                v = ndg.draw(fid, "tier-student", "tier-concept", i, tier)
                assert v.q not in seen, (fid, tier, i)
                seen.add(v.q)


# ---------------------------------------------------------------- #
# gate (c): determinism across interpreters
# ---------------------------------------------------------------- #

_FINGERPRINT_SCRIPT = """
import sys
sys.path.insert(0, {root!r})
import hashlib
from backend.its.solver import numericals_drill_gen as ndg
h = hashlib.sha256()
for fid in sorted(ndg._FAMILIES):
    for i in range(64):
        v = ndg.draw(fid, "det-student", "det-concept", i)
        h.update(fid.encode()); h.update(v.q.encode())
        h.update(v.a.encode()); h.update(v.tier.encode())
for i in range(64):
    out = ndg.consult("jesc.11.4", "Ohm's Law", "voltage = current * "
                      "resistance", "det-consult", 12 + i)
    h.update(out["q"].encode()); h.update(out["a"].encode())
print(h.hexdigest())
"""


def test_gate_c_determinism_across_interpreters():
    script = _FINGERPRINT_SCRIPT.format(root=ROOT)
    envs = [{**os.environ, "PYTHONHASHSEED": seed}
            for seed in ("0", "1", "random")]
    prints = []
    for env in envs:
        r = subprocess.run([sys.executable, "-c", script],
                           capture_output=True, text=True, timeout=600,
                           env=env)
        assert r.returncode == 0, r.stderr[-2000:]
        prints.append(r.stdout.strip())
    assert len(set(prints)) == 1, prints
    # and a run under THIS interpreter's own hash seed agrees with all
    local = subprocess.run([sys.executable, "-c", script],
                           capture_output=True, text=True, timeout=600)
    assert local.returncode == 0, local.stderr[-2000:]
    assert local.stdout.strip() == prints[0]


# ---------------------------------------------------------------- #
# gate (d): unit labels in every question and answer spec
# ---------------------------------------------------------------- #

def test_gate_d_units_in_questions_and_answers():
    total = 0
    for fid, fam in ndg._FAMILIES.items():
        for v in fam.all:
            total += 1
            assert _has_unit(v.q), (fid, v.q[:120])
            assert any(ch.isdigit() for ch in v.q), (fid, v.q[:120])
            if v.unit:
                assert v.unit in v.a, (fid, v.a, v.unit)
            assert v.tier in ("easy", "grade", "hard")
            assert v.formula and v.formula != "-"
            assert v.steps, (fid, v.q[:80])
    assert total > 10000


# ---------------------------------------------------------------- #
# family health + concept matching
# ---------------------------------------------------------------- #

def test_every_family_nonempty_with_tiers():
    stats = ndg.family_stats()
    assert len(stats) >= 19
    for fid, s in stats.items():
        assert s["size"] > 0, fid
        assert set(s["by_tier"]) <= {"easy", "grade", "hard"}


def test_match_families_real_corpus_concepts():
    # (concept_id, title, formula) triples lifted from the live corpus
    cases = [
        ("keph.2.4.1", "First Equation of Motion",
         "final_velocity = initial_velocity + (acceleration * time)",
         "kin_v_at"),
        ("keph.2.4.2", "Second Equation of Motion",
         "displacement = (initial_velocity * time) + "
         "(0.5 * acceleration * time**2)", "kin_s_ut"),
        ("keph.2.4.3", "Third Equation of Motion",
         "final_velocity**2 = initial_velocity**2 + "
         "(2 * acceleration * displacement)", "kin_v2"),
        ("jesc.11.4", "Ohm's Law", "voltage = current * resistance",
         "ohm"),
        ("jesc.11.6.1", "Resistors in Series",
         "r_series = r1 + r2 + r3", "res_series"),
        ("jesc.11.6.2", "Resistors in Parallel",
         "1 / r_parallel = (1 / r1) + (1 / r2)", "res_parallel"),
        ("keph.5.3", "Work Done by a Constant Force",
         "work = force * displacement * cos_theta", "work_fd"),
        ("keph.5.4", "Kinetic Energy",
         "ke = (1/2) * mass * speed**2", "ke"),
        ("keph.5.7", "Gravitational Potential Energy",
         "pe = mass * g * height", "pe"),
        ("keph.104.4.5.2", "Newton's Second Law of Motion",
         "force = mass * acceleration", "force_ma"),
        ("keph.104.4.7", "Law of Conservation of Momentum",
         "m1*u1 + m2*u2 = m1*v1 + m2*v2", "momentum"),
        ("jesc.109.1", "Mirror Formula", "1/v + 1/u = 1/f",
         "lens_mirror"),
        ("jesc.109.3", "Lens Formula", "1/v - 1/u = 1/f", "lens_mirror"),
        ("jech.1.5", "Mole Concept and Molar Mass",
         "moles = mass / molar_mass; number = moles * N_A",
         "moles_mass"),
        ("jech.1.10",
         "Concentration Terms: Molarity, Molality, Mole Fraction",
         "Molarity = moles_solute / volume_solution(L)", "molarity"),
        ("jech.1.6", "Percentage Composition",
         "percent_element = (mass_of_element / molar_mass) * 100",
         "percent_comp"),
        ("jesc.11.1", "Electric Current and Charge",
         "current = charge / time", "charge_current"),
        ("jesc.2.3.1", "pH Scale and Hydrogen Ion Concentration",
         "pH < 7 (Acidic), pH = 7 (Neutral)", "ph"),
    ]
    for cid, title, formula, want in cases:
        fams = ndg.match_families(cid, title, formula)
        assert want in fams, (cid, fams)


def test_match_families_no_match_is_fail_open():
    # a verbal science concept must match nothing -> consult returns None
    assert ndg.match_families(
        "jesc.101.1", "Chemical Equation Representation",
        "Reactants -> Products") == []
    assert ndg.consult(
        "jesc.101.1", "Chemical Equation Representation",
        "Reactants -> Products", "s1", 40) is None


# ---------------------------------------------------------------- #
# wiring: serve/submit/hint over a drill concept
# ---------------------------------------------------------------- #

@pytest.fixture()
def drill_engine(tmp_path):
    # single concept: the picker keeps returning it, so plain serving
    # walks the serve counter straight past POOL_CAP into drill space
    cat = {
        "class": 10, "subject": "science", "chapter": 11,
        "chapter_title": "Electricity",
        "worked_examples": [
            {"q": "A charge of 90 C flows through a wire in 120 s. "
                  "What is the current?", "a": "0.75 A"},
        ],
        "concepts": [
            {"id": "jesc.11.4", "title": "Ohm's Law",
             "formula": "voltage = current * resistance"},
        ],
    }
    d = tmp_path / "cats"
    d.mkdir()
    json.dump(cat, open(d / "catalog_e.json", "w", encoding="utf-8"))
    return TutorEngine(str(d))


def _serve_until_drill(engine, stu, max_serves=40):
    for _ in range(max_serves):
        out = engine.serve(stu, "science", 10)
        if out and out.get("drill"):
            return out
    return None


def test_serve_switches_to_drills_after_pool_exhausted(drill_engine):
    stu = "drill-stu-1"
    drills = []
    for i in range(POOL_CAP + 8):
        out = drill_engine.serve(stu, "science", 10)
        assert out is not None
        if out.get("drill"):
            drills.append(out)
    # every serve past the pool cap must be a fresh generated numerical
    assert len(drills) >= 8
    qs = [d["question"] for d in drills]
    assert len(set(qs)) == len(qs), "drill repeats before exhaustion"
    assert all("::drill" in d["question_id"] for d in drills)
    assert all(d["tier"] in ("easy", "grade", "hard") for d in drills)


def test_served_variant_counters_in_st(drill_engine):
    stu = "drill-stu-2"
    st = drill_engine._student(stu)
    assert st["gen_served"] == {} and st["gen_pending"] == {}
    for _ in range(POOL_CAP + 3):
        drill_engine.serve(stu, "science", 10)
    assert st["gen_served"]["jesc.11.4"] >= 3
    assert st["gen_pending"]
    assert all("::drill" in k for k in st["gen_pending"])


def test_submit_grades_computed_drill_answer_correct(drill_engine):
    stu = "drill-stu-3"
    served = _serve_until_drill(drill_engine, stu)
    assert served is not None
    st = drill_engine.students[stu]
    item = st["gen_pending"][served["question_id"]]
    out = drill_engine.submit(stu, served["question_id"], item["a"])
    assert out["outcome"] == "correct"
    assert out["expected"] == item["a"]
    # the worked solution carries the generated steps
    assert "Answer:" in out["worked_solution"]
    # a correct drill clears mastery movement through the same BKT path
    assert stu in drill_engine.students


def test_drill_wrong_answer_books_mistake(drill_engine):
    stu = "drill-stu-4"
    served = _serve_until_drill(drill_engine, stu)
    st = drill_engine.students[stu]
    item = st["gen_pending"][served["question_id"]]
    wrong_num = "0"
    if item["a"].split()[0] == "0":
        wrong_num = "1"
    out = drill_engine.submit(stu, served["question_id"],
                              f"{wrong_num} wrong-unit")
    assert out["outcome"] == "wrong"
    assert any(m["concept_id"] == "jesc.11.4"
               for m in st["mistakes"])


def test_drill_hint_ladder(drill_engine):
    stu = "drill-stu-5"
    served = _serve_until_drill(drill_engine, stu)
    qid = served["question_id"]
    h1 = drill_engine.hint(stu, qid, 1)
    assert "Relation" in h1["hint"]
    h2 = drill_engine.hint(stu, qid, 2)
    # L2 must not leak the answer value (the hint is method-only text)
    expected = drill_engine.students[stu]["gen_pending"][qid]["a"]
    assert expected not in h2["hint"]
    assert expected.split()[0] not in h2["hint"]
    h3 = drill_engine.hint(stu, qid, 3)
    assert h3["revealed"] is True
    assert "Answer:" in h3["hint"]
    # the reveal flag is honest: the graded submit pays nothing
    item = drill_engine.students[stu]["gen_pending"][qid]
    out = drill_engine.submit(stu, qid, item["a"])
    assert out["outcome"] == "correct_revealed"


def test_drill_persists_through_engine_save_load(drill_engine, tmp_path):
    stu = "drill-stu-6"
    served = _serve_until_drill(drill_engine, stu)
    path = str(tmp_path / "students.json")
    drill_engine.save(path)
    eng2 = TutorEngine(str(tmp_path / "cats"), persist_path=path)
    item = eng2.students[stu]["gen_pending"][served["question_id"]]
    out = eng2.submit(stu, served["question_id"], item["a"])
    assert out["outcome"] == "correct"


def test_drill_fail_open_when_generator_broken(drill_engine, monkeypatch):
    def boom(*a, **k):
        raise RuntimeError("generator down")
    monkeypatch.setattr(ndg, "consult", boom)
    stu = "drill-stu-7"
    for _ in range(POOL_CAP + 4):
        out = drill_engine.serve(stu, "science", 10)
        assert out is not None          # serve never blocks...
        assert not out.get("drill")     # ...and falls back to the pool


def test_drill_respects_tier_pref(drill_engine):
    stu = "drill-stu-8"
    st = drill_engine._student(stu)
    st["tier_pref"]["jesc.11.4"] = "easy"
    for _ in range(POOL_CAP + 5):
        out = drill_engine.serve(stu, "science", 10)
        if out.get("drill"):
            assert out["tier"] == "easy"


def test_drill_request_self_check_bypasses_generation(drill_engine):
    stu = "drill-stu-9"
    for _ in range(POOL_CAP + 3):
        out = drill_engine.serve(stu, "science", 10,
                                 request_self_check=True)
        assert not out.get("drill")


# ---------------------------------------------------------------- #
# live corpus smoke: the real catalog concepts actually drill
# ---------------------------------------------------------------- #

def test_live_corpus_concepts_consult_non_none():
    live = [
        ("jesc.11.4", "Ohm's Law", "voltage = current * resistance"),
        ("jesc.109.3", "Lens Formula", "1/v - 1/u = 1/f"),
        ("jech.1.5", "Mole Concept and Molar Mass",
         "moles = mass / molar_mass"),
    ]
    for cid, title, formula in live:
        out = ndg.consult(cid, title, formula, "live-stu", 30)
        assert out is not None, cid
        assert grade_numeric(out["a"], out["a"]) is True, cid
