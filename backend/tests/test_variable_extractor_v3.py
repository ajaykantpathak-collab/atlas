"""test_variable_extractor_v3.py — gate for the NER V3 retrain (gen v3).

Same 20-question out-of-domain hand set as test_variable_extractor.py
(expectations unchanged, for a strict old-vs-new comparison), but the
five documented V2 silver-label blind spots are now ACCEPTANCE cases —
no xfail:

  1. 'newtons' (force unit)          — V2: 0 silver occurrences
  2. '15% of 250' (percent-of BASE)  — V2: only 8 BASE examples
  3. bare counts ('68 out of 80')    — V2: untagged by design; V3 tags
    them natively (coherent with serving: the binder never re-runs the
    regex parser when the NER stage returns values, and phantom
    dimensionless values are filtered)
  4. 'square metres' (area/volume compounds)
  5. currency amounts                — V2 learned to SKIP them (66
    negatives); V3 must tag Rs/₹/INR + Indian comma groups NATIVELY
    (proved by direct-model probes below, not via the glue scanner)

The model under test is training/ner_model_v3/model-best, selected via
NER_MODEL_PATH (env is set/restored module-scoped so the V2 test file
in the same pytest session is unaffected).

Pure unit tests: no database, no Docker, no LLM calls.
"""

from __future__ import annotations

import os
import statistics
import sys
import time
from pathlib import Path

import pytest

_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

from backend.services import variable_extractor as vx

_V3_MODEL_DIR = (Path(_ROOT) / "backend" / "training" /
                 "ner_model_v3" / "model-best")

# roles the binder can actually consume (anything else is filtered by
# quantity_binder, so phantom bare numbers are tolerated, phantom
# unit-bearing values are not)
_BINDER_RELEVANT = {"dimensionless", "base"}


@pytest.fixture(scope="module", autouse=True)
def _v3_model_env():
    """Point the extractor at the V3 model for this module only."""
    assert _V3_MODEL_DIR.exists(), f"v3 model missing: {_V3_MODEL_DIR}"
    old = os.environ.get("NER_MODEL_PATH")
    os.environ["NER_MODEL_PATH"] = str(_V3_MODEL_DIR)
    saved = (vx._model, vx._model_failed, vx._infer_failures)
    vx._reset_for_tests()
    yield
    vx._model, vx._model_failed, vx._infer_failures = saved
    if old is None:
        os.environ.pop("NER_MODEL_PATH", None)
    else:
        os.environ["NER_MODEL_PATH"] = old


@pytest.fixture(autouse=True)
def _guard_singleton():
    """Snapshot/restore the module singleton so failure tests cannot
    poison the shared model object for other tests."""
    saved = (vx._model, vx._model_failed, vx._infer_failures)
    yield
    vx._model, vx._model_failed, vx._infer_failures = saved


# --------------------------------------------------------------------------- #
# a. the out-of-domain hand set (identical 20 questions + expectations
#    to test_variable_extractor.py — the five V2 xfails are now gates)
# --------------------------------------------------------------------------- #

HAND_SET = [
    # (id, question, expected (value, role) pairs, xfail-why-or-None)
    (" cyclist rates mid-sentence",
     "A cyclist covers 26 km in 90 minutes, pedalling at a steady "
     "17 km per hour along the canal towpath.",
     {(26.0, "length"), (90.0, "time"), (17.0, "velocity")},
     None),
    ("two speeds",
     "The express train slows from 95 km/h to 62 km/h as it nears "
     "the station.",
     {(95.0, "velocity"), (62.0, "velocity")},
     None),
    ("currency Rs amounts",
     "Meera bought a tabla for Rs 8,450 and a dholak for Rs 2,300 "
     "from the same shop.",
     {(8450.0, "money"), (2300.0, "money")},
     None),
    ("Indian comma lakh-scale",
     "Anil deposits Rs 1,20,000 in a fixed deposit that matures "
     "before the festive season.",
     {(120000.0, "money")},
     None),
    ("percent word",
     "The shopkeeper announces a festive discount of 12 percent on "
     "all silk sarees.",
     {(12.0, "percentage")},
     None),
    # V2 GAP 2 (was xfail: only 8 BASE silver examples)
    ("percent-of frame",
     "Solve this: 15% of 250 is what number?",
     {(15.0, "percentage"), (250.0, "base")},
     None),
    ("decimal seconds",
     "The graphics card takes 4.5 seconds to render a single frame "
     "of the animation.",
     {(4.5, "time")},
     None),
    ("two durations",
     "Ravi revised fractions for 2 hours in the morning and again "
     "for 30 minutes before dinner.",
     {(2.0, "time"), (30.0, "time")},
     None),
    ("mixed length units",
     "A tailor cuts 3.4 metres of ribbon; the longest piece measures "
     "120 cm.",
     {(3.4, "length"), (120.0, "length")},
     None),
    ("grouped mass",
     "The adult elephant weighs 4,200 kg while the newborn calf "
     "weighs 310 kg.",
     {(4200.0, "mass"), (310.0, "mass")},
     None),
    ("temperature range",
     "The kettle warmed the water from 24 \u00b0C to 88 \u00b0C "
     "within a few minutes.",
     {(24.0, "temperature"), (88.0, "temperature")},
     None),
    ("volume flow rate",
     "A rooftop tank stores 2,500 litres while the garden tap "
     "releases 15 litres per minute.",
     {(2500.0, "volume"), (15.0, "flow_rate")},
     None),
    # V2 GAP 1 (was xfail: 'newtons' had 0 silver occurrences)
    ("force word unit",
     "A labourer pushes a heavy crate with a steady force of 65 "
     "newtons across the warehouse floor.",
     {(65.0, "force")},
     None),
    ("unit before noun",
     "Place a 5 kg brick on the shelf and a 750 g jar of spices "
     "beside it.",
     {(5.0, "mass"), (750.0, "mass")},
     None),
    ("percent glyph",
     "The price of cooking oil rose by 8% within a single month.",
     {(8.0, "percentage")},
     None),
    # V2 GAP 3 (was xfail: bare counts untagged by design; V3 tags them
    # natively — the binder never re-runs regex when NER has values)
    ("bare counts",
     "Sunil answered 68 questions correctly out of 80 in the "
     "geometry test.",
     {(68.0, "dimensionless"), (80.0, "dimensionless")},
     None),
    ("rupees word",
     "A second-hand camera costs 15,000 rupees after a price cut of "
     "2,500 rupees.",
     {(15000.0, "money"), (2500.0, "money")},
     None),
    ("spelled speed unit",
     "Sound races through the air at roughly 343 metres per second "
     "on a warm afternoon.",
     {(343.0, "velocity")},
     None),
    # V2 GAP 4 (was xfail: 'square metres' unlabeled — unit list had m2)
    ("area unit spelled",
     "One wall of the hall measures 24 square metres and needs 6 "
     "litres of paint.",
     {(24.0, "area"), (6.0, "volume")},
     None),
    ("loan percent",
     "A loan of Rs 40,000 from the co-operative bank carries 7.5% "
     "interest each year.",
     {(40000.0, "money"), (7.5, "percentage")},
     None),
]


def _pairs(result):
    return {(v["value"], v["role"]) for v in result["values"]}


def _assert_extraction(text, expected):
    res = vx.extract(text)
    assert res["source"] == "ner", res
    got = _pairs(res)
    missing = expected - got
    assert not missing, f"missing {missing}; got {sorted(got)}"
    relevant = {p for p in got if p[1] not in _BINDER_RELEVANT}
    extra = relevant - expected
    assert not extra, f"phantom unit-bearing values {extra}; got {sorted(got)}"


@pytest.mark.parametrize("name,text,expected,_why",
                         [(h[0], h[1], h[2], h[3]) for h in HAND_SET],
                         ids=[h[0].strip() for h in HAND_SET])
def test_out_of_domain_hand_set(name, text, expected, _why):
    if _why:
        pytest.xfail(_why)
    _assert_extraction(text, expected)


# --------------------------------------------------------------------------- #
# a2. NATIVE tagging proof: the MODEL (not the serving glue) must own
#     the five former gap families.  _glue_values returns [] when the
#     NER spans already cover the currency/percent matches, so we probe
#     doc.ents directly.
# --------------------------------------------------------------------------- #

def _ner_ents(text):
    nlp = vx._load_model()
    assert nlp is not None
    return [(e.text, e.label_) for e in nlp(text).ents]


def test_native_currency_prefix_tagged_by_model():
    ents = _ner_ents("Anil deposits Rs 1,20,000 in a fixed deposit.")
    assert ("Rs", "UNIT") in ents, ents
    assert ("1,20,000", "VALUE") in ents, ents


def test_native_rupee_glyph_tagged_by_model():
    ents = _ner_ents("The ticket costs \u20b91,20,000 per person.")
    assert ("\u20b9", "UNIT") in ents, ents
    assert ("1,20,000", "VALUE") in ents, ents


def test_native_newtons_tagged_by_model():
    ents = _ner_ents("A force of 65 newtons acts on the crate.")
    assert any(t == "newtons" and l == "UNIT" for t, l in ents), ents
    assert any(t == "65" and l == "VALUE" for t, l in ents), ents


def test_native_square_metres_tagged_by_model():
    ents = _ner_ents("The hall floor measures 24 square metres.")
    assert any("square metre" in t and l == "UNIT" for t, l in ents), ents
    assert any(t == "24" and l == "VALUE" for t, l in ents), ents


def test_native_bare_counts_tagged_by_model():
    ents = _ner_ents("Sunil answered 68 questions correctly out of 80.")
    tagged = {t for t, l in ents if l == "VALUE"}
    assert "68" in tagged and "80" in tagged, ents


def test_native_percent_of_base_tagged_by_model():
    ents = _ner_ents("What is 15% of 250?")
    labs = {(t, l) for t, l in ents}
    assert ("15", "PERCENT") in labs, ents
    assert ("250", "BASE") in labs, ents


# --------------------------------------------------------------------------- #
# b. contract shape + safe inputs
# --------------------------------------------------------------------------- #

def test_contract_shape():
    res = vx.extract("A bus travels 180 km in 2 hours.")
    assert set(res) == {"values", "structure_hint", "source"}
    for v in res["values"]:
        assert set(v) == {"value", "unit", "role", "raw"}
        assert isinstance(v["value"], float)
        assert isinstance(v["unit"], str)
        assert isinstance(v["role"], str)
        assert isinstance(v["raw"], str)


def test_empty_and_safe_inputs():
    for t in ("", "   ", None):
        res = vx.extract(t)
        assert res["values"] == []
        assert res["source"] == "ner"
    assert vx.extract("hello world")["values"] == []
    assert vx.extract("hello world")["structure_hint"] is None


def test_percent_of_frame_entities():
    """The V3 model detects the X%-of-Y frame natively: PERCENT and BASE
    operands are both tagged (that is what the hand-set 'percent-of
    frame' case proves via roles percentage + base).

    KNOWN SERVING LIMITATION (documented, not a model gap): the
    structure_hint glue requires the raw text between the PERCENT and
    BASE spans to be whitespace + optional 'of', but the '%' glyph (or
    the word 'percent') always sits between them, so the hint stays None
    for every glyph/word frame.  The silver convention CANNOT fix this
    from the model side: tagging '15%' as PERCENT would make serving's
    _parse_value_text('15%') return None and DROP the value.  The hint
    was equally dead for V2 (the V2 gate had no such test).  Serving
    switch is the coordinator's call; flagging it in the v3 report.
    """
    res = vx.extract("Solve this: 15% of 250 is what number?")
    got = {(v["value"], v["role"]) for v in res["values"]}
    assert {(15.0, "percentage"), (250.0, "base")} <= got, res
    assert res["structure_hint"] is None, res


def test_currency_not_double_counted():
    """V3 tags currency natively AND the glue scanner must defer to the
    model on overlap — exactly two money values, no duplicates."""
    res = vx.extract("Meera bought a tabla for Rs 8,450 and a dholak "
                     "for Rs 2,300 from the same shop.")
    money = [v["value"] for v in res["values"] if v["role"] == "money"]
    assert sorted(money) == [2300.0, 8450.0], res


# --------------------------------------------------------------------------- #
# c. warm latency <= 20 ms (median of 50)
# --------------------------------------------------------------------------- #

_LAT_TEXTS = [
    "A cyclist covers 26 km in 90 minutes, pedalling at 17 km per hour.",
    "A principal of Rs 45,000 is lent at 8% per annum for 3 years.",
    "The tank stores 2,500 litres while the tap releases 15 litres "
    "per minute.",
    "A force of 65 newtons acts on a mass of 12 kg.",
    "The kettle warmed the water from 24 \u00b0C to 88 \u00b0C.",
]


def test_warm_latency_median_of_50():
    assert vx.extract(_LAT_TEXTS[0])["source"] == "ner"   # warm-up
    timings = []
    for i in range(50):
        t = _LAT_TEXTS[i % len(_LAT_TEXTS)]
        t0 = time.perf_counter()
        vx.extract(t)
        timings.append((time.perf_counter() - t0) * 1000.0)
    median = statistics.median(timings)
    assert median <= 20.0, f"median {median:.2f} ms > 20 ms " \
                           f"(min {min(timings):.2f}, max {max(timings):.2f})"


# --------------------------------------------------------------------------- #
# d. soft-fail: the solve path must survive a dead model
# --------------------------------------------------------------------------- #

def test_broken_model_path_returns_unavailable(monkeypatch):
    monkeypatch.setattr(vx, "_load_model",
                        lambda: (_ for _ in ()).throw(
                            RuntimeError("model dir missing")))
    res = vx.extract("A train travels 120 km in 2 hours.")
    assert res == {"values": [], "structure_hint": None,
                   "source": "ner_unavailable"}
    assert vx.extract("Rs 500")["source"] == "ner_unavailable"


def test_real_missing_model_dir_soft_fails(monkeypatch):
    monkeypatch.setenv("NER_MODEL_PATH", "Z:/definitely/not/a/model")
    vx._reset_for_tests()
    res = vx.extract("A train travels 120 km in 2 hours.")
    assert res["source"] == "ner_unavailable"
    assert res["values"] == []


# --------------------------------------------------------------------------- #
# e. regression: classic binder questions with the V3 NER stage in front
# --------------------------------------------------------------------------- #

_SPEED_CONCEPT = {
    "id": "c_test_speed",
    "formula": "distance = speed * time",
    "solution_steps": [],
}
_ACC_CONCEPT = {
    "id": "c_test_acc",
    "formula": "acceleration = force / mass",
    "solution_steps": [],
}
_AREA_CONCEPT = {
    "id": "c_test_area",
    "formula": "area = length * breadth",
    "solution_steps": [],
}
_SI_CONCEPT = {
    "id": "c_test_si",
    "formula": "interest = principal * rate * time / 100",
    "solution_steps": [],
}

# V2 carried a strict-xfail on the acceleration case ('newtons' silver
# blind spot lost the force quantity).  V3 must clear it — no xfail.
_REGRESSION_BATTERY = [
    pytest.param(_SPEED_CONCEPT,
                 "A car travels at 60 km/h for 3 hours. Find the speed.",
                 id="distance = speed * time"),
    pytest.param(_ACC_CONCEPT,
                 "A force of 12 newtons acts on a mass of 3 kg. Find the "
                 "acceleration.",
                 id="acceleration = force / mass"),
    pytest.param(_AREA_CONCEPT,
                 "Find the area of a rectangle of length 12 cm and "
                 "breadth 8 cm.",
                 id="area = length * breadth"),
    pytest.param(_SI_CONCEPT,
                 "A principal of Rs 5,000 is lent at 8% per annum for 2 "
                 "years. Find the simple interest.",
                 id="interest = principal * rate * time / 100"),
]


def _binding_pairs(concept, text):
    """Union of (var, value) pairs over all candidate bindings."""
    from backend.its.solver.quantity_binder import bind_quantities
    out = bind_quantities(text, concept)
    pairs = set()
    for b in out:
        pairs.update(b.items())
    return pairs


@pytest.mark.parametrize("concept,text", _REGRESSION_BATTERY)
def test_regex_bindings_survive_ner_stage(concept, text, monkeypatch):
    """Every (var, value) binding the regex path can make must still be
    achievable with the NER stage in front (NER may only add)."""
    monkeypatch.setattr(vx, "extract",
                        lambda t: {"values": [], "structure_hint": None,
                                   "source": "ner_unavailable"})
    regex_pairs = _binding_pairs(concept, text)
    monkeypatch.undo()
    ner_pairs = _binding_pairs(concept, text)
    assert regex_pairs, "regex path produced no bindings (setup broke)"
    missing = regex_pairs - ner_pairs
    assert not missing, (
        f"NER stage regressed the binder: regex pairs {sorted(regex_pairs)} "
        f"lost; NER-only pairs {sorted(ner_pairs)}")


def test_ner_stage_binds_money_family():
    """The family the NER+glue stage ADDS over the regex parser:
    currency amounts land on money-family variables."""
    from backend.its.solver.quantity_binder import bind_quantities
    out = bind_quantities(
        "A principal of Rs 5,000 is lent at 8% per annum for 2 years. "
        "Find the simple interest.",
        _SI_CONCEPT)
    assert any(b.get("principal") == 5000.0 and b.get("rate") == 8.0
               and b.get("time") == 2.0 for b in out), out


def test_ner_stage_binds_force_family():
    """V3 addition: spelled-out newtons bind to the force variable."""
    from backend.its.solver.quantity_binder import bind_quantities
    out = bind_quantities(
        "A force of 12 newtons acts on a mass of 3 kg. Find the "
        "acceleration.",
        _ACC_CONCEPT)
    assert any(b.get("force") == 12.0 and b.get("mass") == 3.0
               for b in out), out
