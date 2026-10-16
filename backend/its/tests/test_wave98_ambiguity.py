"""Wave 9.8 hardening — family-ambiguity cross-check.

Residual risk from review: the same parse that routes also supplies the
method — a stem that mis-parses into the wrong family shows a
correct-looking but wrong method (SI stem -> CI method).  The registry
sweep already runs every family; the winner's rivals used to be thrown
away.  They now ride ModelResult.alternates, and:

  * stamp_tier / best_available_payload: a confident rival family whose
    expected answer DIFFERS from the winner's fails the tier closed to
    "guided" — never show one plausible method while a second reading
    exists.
  * POST /api/solve/check: a student submission consistent with the
    alternate reading (or correct under the primary while a rival lives)
    gets verdict "ambiguous" — never a silent match/mismatch on a stem
    that genuinely parses two ways.
"""

import asyncio
import json
import os
import re
import sys
import types

import pytest

sys.path.insert(0, os.path.join("D:\\", "platform", "deploy"))

from backend.its.solver.answer_pipeline import AuditTrail, PipelineResult
from backend.its.solver.modeling_layer import ModelResult
from backend.its.solver.tiered_response import (
    best_available_payload, expected_answer_key, family_ambiguity,
    stamp_tier)


def _result(label="GUIDED", answer=None, numeric=None):
    return PipelineResult(label=label, answer=answer, numeric=numeric,
                          steps=["work"], audit=AuditTrail(lane="T"))


def _model(structure="SIMPLE_INTEREST", numeric=1000.0, conf=0.9,
           alternates=None):
    m = ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities={"p": 5000.0, "r": 10.0, "t": 2.0},
        governing_equation="SI = PRT/100",
        numeric_answer=numeric, final_answer=f"{numeric:g}",
        steps=["read givens", "SI = PRT/100", f"= {numeric:g}"])
    m.alternates = list(alternates or [])
    return m


def _rival(structure="COMPOUND_INTEREST", numeric=1050.0, conf=0.9):
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities={"p": 5000.0}, governing_equation="CI = P(1+r)^t - P",
        numeric_answer=numeric, final_answer=f"{numeric:g}",
        steps=["CI = P(1+r)^t - P", f"= {numeric:g}"])


# --------------------------------------------------------------------------- #
# alternates surface on the parse itself
# --------------------------------------------------------------------------- #

class TestAlternatesSurface:
    def test_model_result_has_alternates_field(self):
        m = ModelResult(structure="X", matched=True, confidence=0.9,
                        quantities={}, governing_equation="")
        assert m.alternates == []

    def test_real_sweep_carries_alternates_list(self):
        # any real stem: the attribute must exist and be a list on the
        # memoized path too (deepcopy-safe)
        from backend.its.solver.modeling_layer import model_problem
        m = model_problem(
            "A car travels 100 km in 2 hours. Find its speed.")
        assert hasattr(m, "alternates")
        assert isinstance(m.alternates, list)

    def test_deepcopy_keeps_alternates(self):
        import copy
        m = _model(alternates=[_rival()])
        m2 = copy.deepcopy(m)
        assert len(m2.alternates) == 1
        assert m2.alternates[0].structure == "COMPOUND_INTEREST"


# --------------------------------------------------------------------------- #
# expected_answer_key / family_ambiguity units
# --------------------------------------------------------------------------- #

class TestExpectedAnswerKey:
    def test_numeric_preferred(self):
        k = expected_answer_key(_model(numeric=1000.0))
        assert k[0] == "num" and k[1] == 1000.0

    def test_unit_extracted_from_numeric_key(self):
        m = _model(numeric=50.0)
        m.final_answer = "50 km/h"
        assert expected_answer_key(m) == ("num", 50.0, "km/h")

    def test_text_key_when_no_numeric(self):
        m = _model()
        m.numeric_answer = None
        m.final_answer = "  Delhi is the capital "
        assert expected_answer_key(m) == ("txt", "delhi is the capital",
                                          "")

    def test_none_when_no_answer(self):
        m = _model()
        m.numeric_answer = None
        m.final_answer = None
        assert expected_answer_key(m) is None


class TestFamilyAmbiguity:
    def test_confident_rival_different_answer_is_ambiguous(self):
        m = _model(alternates=[_rival(numeric=1050.0, conf=0.9)])
        r = family_ambiguity(m)
        assert r is not None and r.structure == "COMPOUND_INTEREST"

    def test_rival_same_answer_not_ambiguous(self):
        m = _model(alternates=[_rival(numeric=1000.0, conf=0.9)])
        assert family_ambiguity(m) is None

    def test_rival_within_tolerance_not_ambiguous(self):
        m = _model(alternates=[_rival(numeric=1005.0, conf=0.9)])
        assert family_ambiguity(m) is None

    def test_weak_rival_not_ambiguous(self):
        m = _model(alternates=[_rival(numeric=1050.0, conf=0.5)])
        assert family_ambiguity(m) is None

    def test_rival_far_below_winner_not_ambiguous(self):
        m = _model(conf=0.98, alternates=[_rival(numeric=1050.0,
                                                 conf=0.80)])
        assert family_ambiguity(m) is None

    def test_same_structure_rival_not_ambiguous(self):
        m = _model(alternates=[_rival(structure="SIMPLE_INTEREST",
                                      numeric=1050.0)])
        assert family_ambiguity(m) is None

    def test_unit_variant_rival_not_ambiguous(self):
        # 50 km/h and 13.888... m/s are the SAME quantity — a units
        # convention difference is not a different expected answer
        m = _model(numeric=50.0)
        m.final_answer = "50 km/h"
        r = _rival(numeric=13.8889, conf=0.9,
                   structure="SPEED_FROM_DISTANCE_TIME")
        r.final_answer = "13.8889 m/s"
        assert family_ambiguity(m) is None

    def test_convertible_but_wrong_value_is_ambiguous(self):
        # 60 km/h is NOT 13.9 m/s — same dimension, different quantity
        m = _model(numeric=50.0)
        m.final_answer = "50 km/h"
        r = _rival(numeric=60.0, conf=0.9)
        r.final_answer = "60 km/h"
        m.alternates = [r]
        assert family_ambiguity(m) is not None

    def test_real_speed_stem_units_agree(self):
        # the regression case: two families fire on the same stem with
        # km/h vs m/s readings — dimensional agreement, NOT ambiguity
        from backend.its.solver.modeling_layer import model_problem
        m = model_problem(
            "A car travels 100 km in 2 hours. Find its speed.")
        if not m.matched:
            pytest.skip("stem did not match a family in this build")
        assert family_ambiguity(m) is None

    def test_no_alternates_not_ambiguous(self):
        assert family_ambiguity(_model()) is None

    def test_unmatched_model_not_ambiguous(self):
        m = _model()
        m.matched = False
        assert family_ambiguity(m) is None

    def test_rival_without_answer_key_skipped(self):
        r = _rival()
        r.numeric_answer = None
        r.final_answer = None
        assert family_ambiguity(_model(alternates=[r])) is None


# --------------------------------------------------------------------------- #
# stamp_tier fail-closed
# --------------------------------------------------------------------------- #

class TestStampTierAmbiguity:
    def test_ambiguous_model_fails_closed_to_guided(self):
        r = _result("GUIDED")
        stamp_tier(r, model=_model(alternates=[_rival()]))
        assert r.answer_tier == "guided"
        assert r.method is None and r.check_endpoint is None
        assert r.trust["label"] == "Let's build it together"

    def test_ambiguity_records_audit_route(self):
        r = _result("GUIDED")
        stamp_tier(r, model=_model(alternates=[_rival()]))
        assert any("tier_ambiguity" in str(x) for x in r.audit.route)

    def test_unambiguous_model_still_method_only(self):
        r = _result("GUIDED")
        stamp_tier(r, model=_model(alternates=[_rival(numeric=1000.0)]))
        assert r.answer_tier == "method_only"
        assert r.check_endpoint == "/api/solve/check"

    def test_no_alternates_still_method_only(self):
        r = _result("GUIDED")
        stamp_tier(r, model=_model())
        assert r.answer_tier == "method_only"

    def test_bank_hit_untouched_by_ambiguity(self):
        # the served answer is the BANK's key — a rival family reading
        # does not change what the row says; decision order unchanged.
        r = _result("GUIDED")
        stamp_tier(r, bank_hit={"stem": "q", "answer": "x"},
                   model=_model(alternates=[_rival()]))
        assert r.answer_tier == "bank_similar"

    def test_ambiguous_guided_still_scrubs_answer(self):
        # fail-closed tier must still blank the leaked computed answer
        r = PipelineResult(label="GUIDED", answer=None, numeric=None,
                           steps=["SI = 1000."], audit=AuditTrail("T"))
        stamp_tier(r, model=_model(alternates=[_rival()]))
        assert r.answer_tier == "guided"
        assert "1000" not in json.dumps(r.steps)


class TestRevealAmbiguity:
    def test_reveal_ambiguous_model_stays_guided(self, monkeypatch):
        from backend.its.solver import bank_answer, modeling_layer
        monkeypatch.setattr(bank_answer, "similar",
                            lambda *a, **k: None)
        monkeypatch.setattr(modeling_layer, "model_problem",
                            lambda q: _model(alternates=[_rival()]))
        p = best_available_payload("ambiguous stem")
        assert p["answer_tier"] == "guided"
        assert p["method"] is None and p["check_endpoint"] is None

    def test_reveal_unambiguous_model_method_only(self, monkeypatch):
        from backend.its.solver import bank_answer, modeling_layer
        monkeypatch.setattr(bank_answer, "similar",
                            lambda *a, **k: None)
        monkeypatch.setattr(modeling_layer, "model_problem",
                            lambda q: _model())
        p = best_available_payload("clean stem")
        assert p["answer_tier"] == "method_only"
        assert p["check_endpoint"] == "/api/solve/check"


# --------------------------------------------------------------------------- #
# /api/solve/check ambiguity signal
# --------------------------------------------------------------------------- #

class TestSolveCheckAmbiguity:
    """check_student_answer: the served verdict must go honest-ambiguous
    when a rival family reading exists with a different expected answer."""

    def _run(self, question, answer, model, ref):
        from backend.its.solver import guided_compute, modeling_layer
        guided_compute.compute_solution = (
            lambda q, context=None: ref)
        modeling_layer.model_problem = lambda q: model
        return asyncio.run(
            guided_compute.check_student_answer(question, answer))

    @pytest.fixture(autouse=True)
    def _patch(self, monkeypatch):
        from backend.its.solver import guided_compute, modeling_layer
        self._orig_cs = guided_compute.compute_solution
        self._orig_mp = modeling_layer.model_problem
        yield
        guided_compute.compute_solution = self._orig_cs
        modeling_layer.model_problem = self._orig_mp

    REF = {"ok": True, "verdict": "computed", "answer": "1000",
           "numeric": 1000.0, "steps": ["SI = PRT/100"], "method": None,
           "source": "test"}

    Q = "Find the interest on Rs 5000 at 10% per annum for 2 years."

    def test_student_matches_rival_reading_is_ambiguous(self):
        # student answered 1050 (the CI reading); primary expects 1000 —
        # a bare "mismatch" would be a confident-wrong verdict
        res = self._run(self.Q, "1050",
                        _model(alternates=[_rival(numeric=1050.0)]),
                        dict(self.REF))
        assert res["verdict"] == "ambiguous"
        assert res["ok"] is True
        assert "1050" not in res["hint"] and "1000" not in res["hint"]

    def test_student_matches_primary_but_rival_lives(self):
        # right under the served reading: match stands, but the verdict
        # is not SILENT — the hint discloses the second reading
        res = self._run(self.Q, "1000",
                        _model(alternates=[_rival(numeric=1050.0)]),
                        dict(self.REF))
        assert res["verdict"] == "match"
        assert "second" in res["hint"].lower() or "reading" in res["hint"].lower()

    def test_student_matches_neither_stays_mismatch(self):
        res = self._run(self.Q, "777",
                        _model(alternates=[_rival(numeric=1050.0)]),
                        dict(self.REF))
        assert res["verdict"] == "mismatch"

    def test_no_rival_normal_match(self):
        res = self._run(self.Q, "1000", _model(), dict(self.REF))
        assert res["verdict"] == "match"

    def test_no_rival_normal_mismatch(self):
        res = self._run(self.Q, "1050", _model(), dict(self.REF))
        assert res["verdict"] == "mismatch"
        assert "1000" not in res["hint"]
