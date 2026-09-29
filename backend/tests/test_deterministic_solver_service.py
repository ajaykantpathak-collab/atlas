"""Contract tests for the no-LLM truth-core service."""

from __future__ import annotations

from types import SimpleNamespace

from backend.its.solver import deterministic_service as service
from backend.its.solver.policy import SolverLLMMode, llm_mode


def test_empty_question_is_a_structured_refusal():
    result = service.solve_deterministically("   ", subject="maths")

    assert result["status"] == "unsupported"
    assert result["answer"] is None
    assert result["llm_used"] is False
    assert result["verification"]["verified"] is False


def test_verified_answer_is_preserved_and_marked_verified():
    audit = SimpleNamespace(
        gates_passed=["substitution"],
        anchor=None,
        to_dict=lambda: {"route": ["math_kernel"], "gates_passed": ["substitution"]},
    )
    fake = SimpleNamespace(
        label="VERIFIED",
        answer="4",
        steps=["2x + 8 = 16", "x = 4"],
        audit=audit,
        refusal_reason=None,
    )

    original = service.answer
    service.answer = lambda question: fake
    try:
        result = service.solve_deterministically("Solve for x: 2x + 8 = 16")
    finally:
        service.answer = original

    assert result["status"] == "verified"
    assert result["answer"] == "4"
    assert result["verification"]["verified"] is True
    assert result["llm_used"] is False


def test_unverified_result_never_carries_an_answer():
    audit = SimpleNamespace(
        gates_passed=[],
        anchor=None,
        to_dict=lambda: {"route": ["refused"], "gates_passed": []},
    )
    fake = SimpleNamespace(
        label="GUIDED_PRACTICE",
        answer="this must be removed",
        steps=["identify the relevant formula"],
        audit=audit,
        refusal_reason="No verified path",
    )

    original = service.answer
    service.answer = lambda question: fake
    try:
        result = service.solve_deterministically("novel question")
    finally:
        service.answer = original

    assert result["status"] == "guided_practice"
    assert result["answer"] is None
    assert result["verification"]["verified"] is False


def test_invalid_llm_policy_fails_closed(monkeypatch):
    monkeypatch.setenv("SOLVER_LLM_MODE", "not-a-mode")
    assert llm_mode() == SolverLLMMode.OFF
