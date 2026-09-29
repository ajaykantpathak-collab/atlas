"""Tests for the strict solver result contract (backend/its/solver/contract.py)
and the central LLM-usage policy (config knobs gated in policy.py).

Covers:
  - ProblemIR shape (required vs optional fields)
  - SolverStatus mapping: verified / guided / unsupported (+ relaxed policy)
  - policy matrix: off blocks the fallback handler; parse_only allows slot
    extraction; SOLVER_REQUIRE_VERIFICATION forces UNSUPPORTED on unverified
    fallback results
  - sandbox promotion gate + serialization enforcement (final_answer only on
    VERIFIED)
  - solver_metrics structured log line carries the contract fields
"""

from __future__ import annotations

import asyncio
import json
import os
import sys
from types import SimpleNamespace

sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..")))

import pytest  # noqa: E402

from backend.its.solver.contract import (  # noqa: E402
    SOLVER_VERSION,
    ProblemIR,
    SolverOutcome,
    SolverStatus,
    emit_solver_metrics,
    outcome_from_pipeline,
    promotion_gate,
)
from backend.its.solver.modeling_layer import ModelResult  # noqa: E402
from backend.its.solver import policy  # noqa: E402
from backend.its.solver.policy import SolverLLMMode  # noqa: E402


# --------------------------------------------------------------------------- #
# helpers
# --------------------------------------------------------------------------- #

def _verified_mr() -> ModelResult:
    return ModelResult(
        structure="SPEED_TIME_DISTANCE", matched=True, confidence=0.92,
        quantities={"v_si_mps": 3e8, "t_si_s": 2e-9, "d_si_m": 0.6},
        governing_equation="distance = v x t (SI-true)",
        final_answer="0.6 m", numeric_answer=0.6,
        steps=["Convert units.", "ANSWER: 0.6 m"],
        note="speed-time-distance")


def _clear_policy_env(monkeypatch) -> None:
    for name in ("SOLVER_LLM_MODE", "PLATFORM_SOLVER_LLM_MODE",
                 "SOLVER_REQUIRE_VERIFICATION",
                 "PLATFORM_SOLVER_REQUIRE_VERIFICATION",
                 "SOLVER_ALLOW_UNVERIFIED_ANSWER",
                 "PLATFORM_SOLVER_ALLOW_UNVERIFIED_ANSWER",
                 "SOLVER_VERSION"):
        monkeypatch.delenv(name, raising=False)


# --------------------------------------------------------------------------- #
# ProblemIR
# --------------------------------------------------------------------------- #

class TestProblemIR:
    def test_required_fields_only(self):
        ir = ProblemIR(subject="physics", question_type="numeric")
        assert ir.entities == []
        assert ir.ambiguity_flags == []
        assert ir.to_dict()["subject"] == "physics"

    def test_missing_required_field_raises(self):
        with pytest.raises(TypeError):
            ProblemIR(subject="maths")  # question_type missing
        with pytest.raises(TypeError):
            ProblemIR(question_type="mcq")  # subject missing


# --------------------------------------------------------------------------- #
# Status mapping (from_model_result)
# --------------------------------------------------------------------------- #

class TestStatusMapping:
    def test_verified_sample_maps_verified_and_releases_answer(self):
        outcome = SolverOutcome.from_model_result(
            _verified_mr(), verified=True, route=["sandbox"])
        assert outcome.status is SolverStatus.VERIFIED
        assert outcome.answer == "0.6 m"
        assert outcome.answer_released is True
        assert outcome.proof["governing_equation"] == \
            "distance = v x t (SI-true)"
        assert outcome.solver_version == SOLVER_VERSION

    def test_guided_sample_withholds_answer(self):
        mr = _verified_mr()
        outcome = SolverOutcome.from_model_result(
            mr, verified=False, route=["sandbox"])
        assert outcome.status is SolverStatus.GUIDED_PRACTICE
        assert outcome.answer is None
        assert outcome.answer_released is False
        assert "verification" in (outcome.refusal_reason or "")

    def test_no_match_maps_unsupported_with_refusal_note(self):
        mr = ModelResult(structure="UNRECOGNIZED", matched=False,
                         confidence=0.0, quantities={},
                         governing_equation="",
                         note="no canonical structure matched")
        outcome = SolverOutcome.from_model_result(mr, verified=False)
        assert outcome.status is SolverStatus.UNSUPPORTED
        assert outcome.answer is None
        assert outcome.refusal_reason == "no canonical structure matched"

    def test_relaxed_policy_keeps_raw_answer_but_never_verified(
            self, monkeypatch):
        _clear_policy_env(monkeypatch)
        monkeypatch.setenv("SOLVER_REQUIRE_VERIFICATION", "false")
        monkeypatch.setenv("SOLVER_ALLOW_UNVERIFIED_ANSWER", "true")
        outcome = SolverOutcome.from_model_result(
            _verified_mr(), verified=False, source="fallback")
        assert outcome.status is SolverStatus.GUIDED_PRACTICE
        assert outcome.status is not SolverStatus.VERIFIED
        assert outcome.answer == "0.6 m"          # kept for internal use
        assert outcome.released_answer() is None  # gate still applies
        assert outcome.llm_used is True
        payload = outcome.to_payload()
        assert payload["answer"] is None
        assert payload["unverified_answer"] == "0.6 m"


class TestPipelineMapping:
    def _pipeline(self, label, answer=None, steps=(), refusal=None):
        audit = SimpleNamespace(
            lane="A", route=["kernel:exact"],
            gates_passed=["kernel_cascade"], assumptions=[],
            elapsed_ms=12.5, to_dict=lambda: {})
        return SimpleNamespace(label=label, answer=answer, numeric=None,
                               steps=list(steps), audit=audit,
                               socratic=None, refusal_reason=refusal)

    def test_verified_label_maps_verified(self):
        outcome = outcome_from_pipeline(
            self._pipeline("VERIFIED", answer="x = 4"))
        assert outcome.status is SolverStatus.VERIFIED
        assert outcome.released_answer() == "x = 4"
        assert outcome.latency_ms == 12.5

    def test_guided_label_maps_guided_and_withholds(self):
        outcome = outcome_from_pipeline(
            self._pipeline("GUIDED_PRACTICE", answer="must not ship",
                           refusal="No verified formal solution path"))
        assert outcome.status is SolverStatus.GUIDED_PRACTICE
        assert outcome.released_answer() is None
        assert outcome.refusal_reason == "No verified formal solution path"

    def test_official_key_maps_verified(self):
        outcome = outcome_from_pipeline(
            self._pipeline("VERIFIED_OFFICIAL", answer="option (b)"))
        assert outcome.status is SolverStatus.VERIFIED

    def test_llm_canonicalizer_footprint_surfaces_llm_used(self):
        outcome = outcome_from_pipeline(self._pipeline(
            "GUIDED_PRACTICE",
            steps=["competency:c6_n_arith via catalog steps "
                   "[slots llm-canonicalized]"]))
        assert outcome.llm_used is True


# --------------------------------------------------------------------------- #
# Sandbox promotion gate + serialization enforcement
# --------------------------------------------------------------------------- #

class TestSandboxGate:
    def test_gate_requires_matched_confident_answered(self):
        assert promotion_gate(_verified_mr()) is True
        low_conf = _verified_mr()
        low_conf.confidence = 0.5
        assert promotion_gate(low_conf) is False
        no_answer = _verified_mr()
        no_answer.final_answer = None
        no_answer.numeric_answer = None
        assert promotion_gate(no_answer) is False
        assert promotion_gate(ModelResult(
            structure="X", matched=False, confidence=0.9, quantities={},
            governing_equation="")) is False

    def test_serialize_hides_final_answer_off_verified_tier(self):
        from backend.routers.sandbox import _serialize
        outcome = SolverOutcome.from_model_result(
            _verified_mr(), verified=False, route=["maths"])
        resp = _serialize("maths", _verified_mr(), outcome)
        assert resp.final_answer == ""
        assert resp.numeric_answer is None
        assert resp.status == SolverStatus.GUIDED_PRACTICE.value
        assert resp.solver_version == SOLVER_VERSION
        # verified tier keeps everything
        outcome_v = SolverOutcome.from_model_result(
            _verified_mr(), verified=True, route=["maths"])
        resp_v = _serialize("maths", _verified_mr(), outcome_v)
        assert resp_v.final_answer == "0.6 m"
        assert resp_v.status == SolverStatus.VERIFIED.value


# --------------------------------------------------------------------------- #
# Policy matrix
# --------------------------------------------------------------------------- #

class TestPolicyMatrix:
    def test_default_mode_is_parse_only(self, monkeypatch):
        _clear_policy_env(monkeypatch)
        assert policy.llm_mode() is SolverLLMMode.PARSE_ONLY

    def test_invalid_mode_fails_closed(self, monkeypatch):
        monkeypatch.setenv("SOLVER_LLM_MODE", "not-a-mode")
        assert policy.llm_mode() is SolverLLMMode.OFF

    def test_parse_only_allows_extraction_gate(self):
        assert policy.llm_used_is_allowed(
            mode=SolverLLMMode.PARSE_ONLY, purpose="parse") is True
        assert policy.llm_used_is_allowed(
            mode=SolverLLMMode.PARSE_ONLY, purpose="compute") is False

    def test_off_blocks_canonicalize_without_client_call(
            self, monkeypatch):
        import backend.its.solver.competency_engine as ce
        import backend.services.llm_client as llm_client

        _clear_policy_env(monkeypatch)
        monkeypatch.setenv("SOLVER_LLM_MODE", "off")

        def _boom():
            raise AssertionError("LLM client must not be contacted in off mode")

        monkeypatch.setattr(llm_client, "get_llm_client", _boom)
        assert ce._llm_canonicalize(
            "a ball is thrown at 5 m/s", {"id": "concept_x"}) is None

    def test_fallback_handler_blocked_in_off_mode(self, monkeypatch):
        from backend.services.llm_fallback_handler import (
            LLMFallbackHandler, TRIGGER_NOVEL_PROBLEM)

        _clear_policy_env(monkeypatch)
        monkeypatch.setenv("SOLVER_LLM_MODE", "off")

        class _MustNotCall:
            def solver_fallback(self, **kwargs):  # pragma: no cover
                raise AssertionError("LLM must not run in off mode")

        handler = LLMFallbackHandler(client=_MustNotCall())
        res = asyncio.run(handler.handle("q", TRIGGER_NOVEL_PROBLEM))
        assert res["fallback_used"] is True
        assert res["success"] is False
        assert res.get("llm_error") is True
        assert res.get("policy_blocked") is True

    def test_fallback_handler_runs_in_fallback_mode(self, monkeypatch):
        from backend.services.llm_fallback_handler import (
            LLMFallbackHandler, TRIGGER_NOVEL_PROBLEM)

        _clear_policy_env(monkeypatch)
        monkeypatch.setenv("SOLVER_LLM_MODE", "fallback")

        class _StubClient:
            def __init__(self):
                self.calls = 0

            async def solver_fallback(self, **kwargs):
                self.calls += 1
                return {
                    "extraction": {"quantities": [], "target": "v",
                                   "concept_tags": ["kinematics"]},
                    "formula_candidates": ["v = u + at"],
                    "explanation_text": "identify the kinematics relation",
                    "confidence": 0.6,
                    "llm_error": False,
                }

        client = _StubClient()
        handler = LLMFallbackHandler(client=client)
        res = asyncio.run(handler.handle("q", TRIGGER_NOVEL_PROBLEM))
        assert client.calls == 1
        assert res["success"] is True
        assert res["fallback_used"] is True
        assert res["confidence"] <= 0.7  # LLM suggestions never high-confidence
        assert "disclosure" in res

    def test_require_verification_forces_unsupported_on_unverified_fallback(
            self, monkeypatch):
        _clear_policy_env(monkeypatch)
        monkeypatch.setenv("SOLVER_REQUIRE_VERIFICATION", "true")
        monkeypatch.setenv("SOLVER_ALLOW_UNVERIFIED_ANSWER", "false")
        outcome = SolverOutcome.from_model_result(
            _verified_mr(), verified=False, source="fallback")
        assert outcome.status is SolverStatus.UNSUPPORTED
        assert outcome.answer is None
        assert outcome.llm_used is True
        assert "SOLVER_REQUIRE_VERIFICATION" in outcome.refusal_reason

    def test_default_blocks_unverified_fallback_answer(self, monkeypatch):
        _clear_policy_env(monkeypatch)  # defaults: require=true, allow=false
        outcome = SolverOutcome.from_model_result(
            _verified_mr(), verified=False, source="fallback")
        assert outcome.status is SolverStatus.UNSUPPORTED

    def test_verification_helpers_defaults_and_fail_closed(
            self, monkeypatch):
        _clear_policy_env(monkeypatch)
        assert policy.require_verification() is True
        assert policy.allow_unverified_answer() is False
        monkeypatch.setenv("SOLVER_REQUIRE_VERIFICATION", "banana")
        assert policy.require_verification() is True   # fail closed
        monkeypatch.setenv("SOLVER_ALLOW_UNVERIFIED_ANSWER", "banana")
        assert policy.allow_unverified_answer() is False  # fail closed
        monkeypatch.setenv("SOLVER_ALLOW_UNVERIFIED_ANSWER", "1")
        assert policy.allow_unverified_answer() is True


# --------------------------------------------------------------------------- #
# solver_metrics structured logging
# --------------------------------------------------------------------------- #

class TestSolverMetricsLog:
    def test_metrics_line_carries_contract_fields(self, caplog):
        import logging
        outcome = SolverOutcome.from_model_result(
            _verified_mr(), verified=True,
            route=["sandbox", "SPEED_TIME_DISTANCE"],
            latency_ms=3.21)
        with caplog.at_level(logging.INFO, logger="solver.metrics"):
            emit_solver_metrics(outcome, lane="sandbox", subject="maths")
        records = [r for r in caplog.records
                   if r.name == "solver.metrics"]
        assert records, "expected one solver.metrics record"
        payload = json.loads(records[-1].getMessage())
        assert payload["event"] == "solver_metrics"
        for key in ("route", "solver_version", "status", "llm_used",
                    "latency_ms", "refusal_reason"):
            assert key in payload
        assert payload["status"] == SolverStatus.VERIFIED.value
        assert payload["route"] == ["sandbox", "SPEED_TIME_DISTANCE"]
        assert payload["llm_used"] is False
        assert payload["solver_version"] == SOLVER_VERSION

    def test_metrics_never_raises(self, monkeypatch):
        class _Boom:
            def info(self, *a, **k):
                raise RuntimeError("boom")

        monkeypatch.setattr("backend.its.solver.contract._metrics_logger",
                            _Boom())
        outcome = SolverOutcome.from_model_result(
            _verified_mr(), verified=True)
        emit_solver_metrics(outcome)  # must not raise
