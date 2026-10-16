"""Wave 9.8 L1 — Contract A tests.

Covers: the four-tier decision table in stamp_tier, the never-mutates-
badge/answer invariant, the method_only no-answer-digits guarantee,
POST /api/solve/check match/mismatch/unknown (mismatch never reveals
the number), and the surrender-first reveal with zero hints.
"""

import asyncio
import copy
import json
import os
import re
import sys

import pytest

sys.path.insert(0, os.path.join("D:\\", "platform", "deploy"))

from backend.its.solver.answer_pipeline import AuditTrail, PipelineResult
from backend.its.solver.tiered_response import (
    CHECK_ENDPOINT, best_available_payload, stamp_tier)
from backend.its.solver.modeling_layer import ModelResult


def _result(label="GUIDED", answer=None, numeric=None):
    return PipelineResult(label=label, answer=answer, numeric=numeric,
                          steps=["work"], audit=AuditTrail(lane="T"))


def _model(structure="SPEED_DIST_TIME", matched=True, numeric=50.0):
    return ModelResult(
        structure=structure, matched=matched, confidence=0.9,
        quantities={"d": 100.0, "t": 7200.0},
        governing_equation="speed = distance/time",
        numeric_answer=numeric, final_answer=f"{numeric:g} km/h",
        steps=["read givens", "speed = distance/time",
               f"= {numeric:g} km/h"])


class TestTierDecisionTable:
    def test_verified_badge_gives_verified_tier(self):
        r = _result("VERIFIED", answer="7", numeric=7.0)
        stamp_tier(r)
        assert r.answer_tier == "verified"
        assert r.trust["detail"] == "Re-derived two independent ways"
        assert r.method is None and r.similar is None
        assert r.check_endpoint is None

    def test_verified_variants_all_count(self):
        for label in ("VERIFIED_WITH_ASSUMPTIONS", "VERIFIED_OFFICIAL",
                      "VERIFIED_SEMANTIC"):
            r = _result(label, answer="1")
            stamp_tier(r)
            assert r.answer_tier == "verified", label

    def test_bank_hit_gives_bank_similar(self):
        r = _result("GUIDED")
        hit = {"stem": "A train covers 240 km in 4 h. Find its speed.",
               "solution_steps": ["speed = 240/4"], "answer": "60 km/h",
               "board": "CBSE", "year": 2019}
        stamp_tier(r, bank_hit=hit)
        assert r.answer_tier == "bank_similar"
        assert r.similar["stem"].startswith("A train")
        assert r.similar["answer"] == "60 km/h"
        assert r.similar["source"] == "CBSE 2019 paper"
        assert r.trust["detail"] == (
            "Same question type from a CBSE 2019 paper, fully solved")
        assert r.method is None and r.check_endpoint is None

    def test_bank_hit_unknown_source_fallback(self):
        r = _result("GUIDED")
        hit = {"stem": "q", "solution_steps": [], "answer": "x"}
        stamp_tier(r, bank_hit=hit)
        assert r.answer_tier == "bank_similar"
        assert r.similar["source"] == "board question bank"

    def test_modelled_gives_method_only(self):
        r = _result("GUIDED")          # verifier status na is fine
        stamp_tier(r, model=_model())
        assert r.answer_tier == "method_only"
        assert r.check_endpoint == CHECK_ENDPOINT == "/api/solve/check"
        assert r.method["formula"]
        assert r.method["steps"]       # ordered skeleton present
        assert "blanks" in r.method and "units" in r.method
        assert r.trust["detail"] == (
            "Method confirmed; final number not independently checked")
        assert r.similar is None

    def test_unrecognised_gives_guided(self):
        r = _result("GUIDED")
        stamp_tier(r, model=_model(structure="UNRECOGNIZED",
                                   matched=False))
        assert r.answer_tier == "guided"
        assert r.trust["detail"] == (
            "We could not verify this one — let's build it together")
        assert r.method is None and r.check_endpoint is None

    def test_bank_hit_beats_model(self):
        r = _result("GUIDED")
        stamp_tier(r, bank_hit={"stem": "q", "answer": "a"},
                   model=_model())
        assert r.answer_tier == "bank_similar"


class TestStampNeverMutates:
    def test_badge_answer_steps_refusal_untouched(self):
        for label, ans, num in (("VERIFIED", "7", 7.0),
                                ("GUIDED", None, None),
                                ("VERIFIED_OFFICIAL", "42", 42.0)):
            r = _result(label, answer=ans, numeric=num)
            r.refusal_reason = "kept"
            before = (r.label, r.answer, r.numeric, list(r.steps),
                      r.refusal_reason, r.socratic)
            stamp_tier(r, bank_hit={"stem": "s", "answer": "x"},
                       model=_model())
            after = (r.label, r.answer, r.numeric, list(r.steps),
                     r.refusal_reason, r.socratic)
            assert after == before

    def test_stamp_survives_garbage(self):
        r = _result("GUIDED")
        stamp_tier(r, bank_hit={"answer": None}, model=object())
        assert r.answer_tier == "guided"


class TestMethodPayloadNoAnswerDigits:
    def test_answer_digits_never_in_method(self):
        r = _result("GUIDED", answer=None, numeric=None)
        # the withheld family answer is 50 — it must not appear anywhere
        # in the method payload even though the model computed it
        stamp_tier(r, model=_model(numeric=50.0))
        blob = json.dumps(r.method)
        assert not re.search(r"(?<![\d.])50(?:\.0)?(?![\d])", blob), blob
        assert "km/h" not in blob or "50" not in blob

    def test_answer_text_scrubbed(self):
        r = _result("GUIDED", answer="150", numeric=150.0)
        stamp_tier(r, model=_model(structure="INTEREST", numeric=150.0))
        blob = json.dumps(r.method)
        assert "150" not in blob, blob


# --------------------------------------------------------------------------- #
# POST /api/solve/check
# --------------------------------------------------------------------------- #

class TestSolveCheck:
    Q = ("A car travels 100 km in 2 hours. Find its speed.")

    def _check(self, question, answer):
        from backend.api.solve_check import (SolveCheckRequest,
                                             solve_check)
        return asyncio.run(solve_check(
            SolveCheckRequest(question=question, answer=answer)))

    def test_correct_answer_matches(self):
        resp = self._check(self.Q, "50")
        assert resp.ok is True and resp.verdict == "match", resp

    def test_mismatch_never_leaks_the_number(self):
        resp = self._check(self.Q, "60")
        assert resp.verdict == "mismatch"
        assert resp.ok is False
        # the true answer is 50 — no digit sequence equal to it may
        # appear in the hint (nor the fully-qualified answer text)
        assert not re.search(r"(?<![\d.])50(?:\.0+)?(?![\d])",
                             resp.hint), resp.hint
        assert "50 km/h" not in resp.hint

    def test_unknown_family_returns_unknown(self):
        resp = self._check(
            "Describe the theme of the poem you read yesterday.", "42")
        assert resp.verdict == "unknown"
        assert resp.ok is True

    def test_route_under_expensive_rate_limit(self):
        from backend.middleware.rate_limiter import _EXPENSIVE_PATTERNS
        assert any("/api/solve/check".startswith(p)
                   for p in _EXPENSIVE_PATTERNS)


# --------------------------------------------------------------------------- #
# Surrender-first reveal
# --------------------------------------------------------------------------- #

class TestRevealPayload:
    def test_guided_fallback_labelled_unverified(self):
        # a stem no family and no bank row can serve -> guided, and the
        # payload is always explicitly unverified
        p = best_available_payload("Describe the mood of the stanza.")
        assert p["verified"] is False
        assert p["answer_tier"] in ("guided", "method_only", "bank_similar")
        assert set(p) >= {"answer_tier", "trust", "method", "similar",
                          "check_endpoint"}

    def test_known_family_gives_method_only_or_similar(self):
        p = best_available_payload(
            "A car travels 100 km in 2 hours. Find its speed.")
        assert p["verified"] is False
        assert p["answer_tier"] in ("method_only", "bank_similar")
        if p["answer_tier"] == "method_only":
            # the model computed 50 km/h — it must not appear
            blob = json.dumps(p["method"])
            assert not re.search(r"(?<![\d.])50(?:\.0+)?(?![\d])", blob), \
                blob
            assert p["check_endpoint"] == "/api/solve/check"


class TestEngineRevealZeroHints:
    """Surrender-first in the unified engine: zero attempts/hints must
    still reveal immediately (uses the real engine + bloom corpus)."""

    BLOOM_DIR = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(
            os.path.dirname(os.path.abspath(__file__)))))),
        "cbse_data", "bloom_enrichment")

    def test_zero_hint_surrender_returns_reveal(self):
        if not os.path.isdir(self.BLOOM_DIR) \
                or not os.listdir(self.BLOOM_DIR):
            pytest.skip("bloom_enrichment corpus absent")
        from backend.its.tutoring.unified_socratic_engine import (
            StudentState, TutoringState, UnifiedSocraticEngine)
        engine = UnifiedSocraticEngine(bloom_dir=self.BLOOM_DIR)
        node_id = "c11_phy_cbse_031"
        engine.start_session("w98-student", node_id)
        state = StudentState(
            student_id="w98-student", current_node_id=node_id,
            current_state=TutoringState.INTRODUCE,
            per_node_mastery={node_id: 0.1})
        engine.process_input(state, "ready")
        # ZERO attempts, ZERO hints — a first-time surrender plea must
        # reveal immediately (no ethics_block redirect, no rung gate)
        resp = engine.process_input(state, "i give up")
        assert resp.content["type"] == "reveal", resp.content["type"]
        assert resp.content["surrendered"] is True
        assert resp.content.get("verified") is False
        assert "answer" in resp.content


# --------------------------------------------------------------------------- #
# Legacy-field leak scrub (wave98 review: L2-flagged MEDIUM, confirmed live on
# dev :8030 — a bank_similar payload withheld `answer` yet shipped the computed
# "5/12" inside top-level `steps`, incl. a "Verification: ... reproduces 5/12"
# line, and inside socratic.board_steps).  On EVERY non-verified tier the
# withheld computed value must be blanked out of the legacy student-facing
# fields the same way method.steps already blanks it (____).
# --------------------------------------------------------------------------- #

class TestLegacyFieldsScrubbed:

    BANK_HIT = {"stem": "A box has 5 red, 8 blue and 7 green marbles.",
                "solution_steps": ["P(not blue) = 3/5"],
                "answer": "3/5", "board": "CBSE", "year": 2020}

    def _prob_model(self):
        # the live repro family: computed "5/12", verifier status na,
        # strict gate withheld answer/numeric — steps still carried it
        return ModelResult(
            structure="PROBABILITY_BASIC", matched=True, confidence=0.9,
            quantities={"favourable": 5.0},
            governing_equation="P = favourable/total",
            numeric_answer=5 / 12, final_answer="5/12",
            steps=["P = 5/12."])

    def _guided_with_leaky_steps(self):
        return PipelineResult(
            label="GUIDED_PRACTICE", answer=None, numeric=None,
            steps=["Method: P = favourable/total — the question asks for "
                   "the probability of the event.",
                   "Bag: total 12 balls, 5 red.",
                   "P = 5/12 = 5/12.",
                   "Verification: recomputing the closed form on the "
                   "same inputs reproduces 5/12.",
                   "Interpretation: for the given data, the probability "
                   "of the event is 5/12."],
            audit=AuditTrail(lane="B"))

    def test_bank_similar_steps_never_ship_the_fraction_answer(self):
        r = self._guided_with_leaky_steps()
        stamp_tier(r, bank_hit=dict(self.BANK_HIT),
                   model=self._prob_model())
        assert r.answer_tier == "bank_similar"
        blob = json.dumps(r.steps)
        assert "5/12" not in blob, blob
        assert "5 / 12" not in blob, blob
        # stated givens survive — only the computed token is blanked
        assert "12 balls" in blob and "5 red" in blob
        assert r.answer is None and r.numeric is None

    def test_guided_tier_steps_scrubbed_too(self):
        r = self._guided_with_leaky_steps()
        stamp_tier(r, model=self._prob_model(),
                   bank_hit=None)   # no bank hit -> method_only/guided
        assert r.answer_tier in ("method_only", "guided")
        assert "5/12" not in json.dumps(r.steps)

    def test_decimal_answer_scrubbed(self):
        r = PipelineResult(label="GUIDED_PRACTICE", answer=None,
                           numeric=None,
                           steps=["A = l * w = 1.5 * 0.5.",
                                  "Area = 0.75 m^2.",
                                  "So the answer is 0.75."],
                           audit=AuditTrail(lane="A"))
        m = ModelResult(structure="AREA", matched=True, confidence=0.9,
                        quantities={}, governing_equation="A = l*w",
                        numeric_answer=0.75, final_answer="0.75 m^2",
                        steps=[])
        stamp_tier(r, model=m)
        assert r.answer_tier == "method_only"
        assert "0.75" not in json.dumps(r.steps)

    def test_integer_answer_scrubbed(self):
        r = PipelineResult(label="GUIDED_PRACTICE", answer=None,
                           numeric=None,
                           steps=["speed = 100/2",
                                  "= 50 km/h",
                                  "Verification: reproduces 50."],
                           audit=AuditTrail(lane="A"))
        stamp_tier(r, model=_model(numeric=50.0))
        blob = json.dumps(r.steps)
        assert not re.search(r"(?<![\d.])50(?:\.0)?(?![\d])", blob), blob
        assert "100" in blob   # the stated given is not collateral

    def test_stray_answer_and_numeric_forced_null(self):
        # belt-and-braces: a non-verified result that still carried the
        # computed scalar fields must not ship them either
        r = PipelineResult(label="GUIDED_PRACTICE", answer="50 km/h",
                           numeric=50.0, steps=["= 50 km/h"],
                           audit=AuditTrail(lane="A"))
        stamp_tier(r, model=_model(numeric=50.0))
        assert r.answer is None and r.numeric is None
        assert "50" not in json.dumps(r.steps)

    def test_board_steps_and_extra_fields_scrubbed(self):
        r = self._guided_with_leaky_steps()
        r.socratic = {"board_steps": ["Given: favourable = 5.0",
                                      "Working:", "1. P = 5/12.",
                                      "∴ 5/12"],
                      "understood": {"givens": {"total": 12}}}
        r.working = "P = 5/12"
        r.solution = "hence 5/12"
        r.explanation = "the chance is 5/12"
        stamp_tier(r, bank_hit=dict(self.BANK_HIT),
                   model=self._prob_model())
        assert "5/12" not in json.dumps(r.socratic["board_steps"])
        for fname in ("working", "solution", "explanation"):
            assert "5/12" not in json.dumps(getattr(r, fname)), fname
        # the read-back card's stated givens are untouched
        assert r.socratic["understood"]["givens"]["total"] == 12

    def test_verified_tier_keeps_everything(self):
        r = PipelineResult(label="VERIFIED", answer="5/12",
                           numeric=5 / 12, steps=["P = 5/12."],
                           audit=AuditTrail(lane="B"))
        r.socratic = {"board_steps": ["∴ 5/12"]}
        stamp_tier(r, model=self._prob_model())
        assert r.answer_tier == "verified"
        assert "5/12" in json.dumps(r.steps)
        assert "5/12" in json.dumps(r.socratic["board_steps"])
        assert r.numeric == 5 / 12 and r.answer == "5/12"
