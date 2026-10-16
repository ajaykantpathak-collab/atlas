"""test_wsa_facade_contract.py -- WSA-P5: solver facade truth-contract tests.

Packet: _work/overhaul/WS-A_packet_plan.md section WSA-P5 (agent ovhA-p15).

Proves on ``backend.solver_facade`` (the /api/solver/solve/step surface,
6 FE call sites):
  1. student-facing strings of every facade exit are slop-gate SCRUBBED
     (final_answer, step descriptions, error) — fail-open, same law as
     answer();
  2. raw exception text NEVER reaches the student: backend failures
     surface a typed, scrubbed fallback message with error_code intact;
  3. honest truth labels: verified rides only when the winning backend
     actually verified (step_chainer symbolic check); everything else
     ships a method-only label — no verifier is invented here.

Run:  cd D:\\platform\\deploy\\backend
      python -m pytest tests/test_wsa_facade_contract.py -q
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from backend import solver_facade as sf  # noqa: E402
from backend.contracts import SolutionResult, SolutionStep  # noqa: E402

_NODE_ID_RX = re.compile(r"\bc\d{1,2}_[a-z0-9]+_[a-z0-9]+(?:_[a-z0-9]+)*\b", re.I)


# ------------------------------------------------------------------ #
# 1. scrub at the facade exit
# ------------------------------------------------------------------ #

def test_facade_scrubs_answer(monkeypatch):
    slop_answer = ("The area is 0.123456789012345 sq m (Lane C) — node "
                   "c10_bio_cbse_01_001 — the student uses variable binding")

    class SlopBackend(sf.SolverBackend):
        backend_id = "slop_probe"
        tier = sf.SolverTier.PATTERN
        priority = 5

        def solve_free_text(self, problem_text, **kwargs):
            return SolutionResult(
                success=True,
                final_answer=slop_answer,
                steps=[SolutionStep(
                    step_index=1,
                    description="**Step 1:** the student substitutes \\( x \\)",
                )],
                verified=False,
                solver_tier=self.tier,
                solver_path=[self.backend_id],
            )

    monkeypatch.setattr(sf, "get_registry", lambda: [SlopBackend()])
    result = sf.get_facade().solve_free_text("compute the area",
                                             subject="maths")

    assert result.success is True
    assert "Lane C" not in result.final_answer
    assert "variable binding" not in result.final_answer
    assert _NODE_ID_RX.search(result.final_answer) is None
    assert "0.123456789012345" not in result.final_answer
    assert "0.1235" in result.final_answer

    step = result.steps[0].description
    assert "**" not in step and step.startswith("Step 1:")
    assert "you" in step and "the student" not in step

    # honest labeling: unverified work ships a method-only label
    assert result.verified is False
    assert result.verification_msg.strip()


def test_facade_scrubs_solve_step_strings(monkeypatch):
    class SlopStepBackend(sf.SolverBackend):
        backend_id = "slop_step_probe"
        tier = sf.SolverTier.STRUCTURED
        priority = 5

        def solve_step(self, step_type_id, inputs):
            return SolutionResult(
                success=True,
                final_answer="x = 0.987654321098765 (Lane C)",
                steps=[SolutionStep(step_index=1,
                                    description="solve (variable binding) \\[ ok \\]")],
                verified=False,
                solver_tier=self.tier,
            )

    monkeypatch.setattr(sf, "get_registry", lambda: [SlopStepBackend()])
    result = sf.get_facade().solve_step("solve_linear", {"x": "1"})

    assert result.success is True
    assert "Lane C" not in result.final_answer
    assert "0.9877" in result.final_answer
    desc = result.steps[0].description
    assert "variable binding" not in desc and "\\[" not in desc


# ------------------------------------------------------------------ #
# 2. errors are typed, never raw internals
# ------------------------------------------------------------------ #

def test_facade_error_never_raw(monkeypatch):
    class ExplodingBackend(sf.SolverBackend):
        backend_id = "exploder"
        tier = sf.SolverTier.PATTERN
        priority = 5

        def solve_free_text(self, problem_text, **kwargs):
            raise Exception("secret /app/path disclosure")

    monkeypatch.setattr(sf, "get_registry", lambda: [ExplodingBackend()])
    result = sf.get_facade().solve_free_text("compute something",
                                             subject="maths")

    assert result.success is False
    assert result.error_code == "ALL_BACKENDS_FAILED"
    low = result.error.lower()
    assert "/app" not in low, "raw path leaked into student error"
    assert "secret" not in low, "raw exception text leaked"
    assert result.error.strip(), "error must carry typed text, not silence"


def test_facade_step_error_typed(monkeypatch):
    class BoomBackend(sf.SolverBackend):
        backend_id = "boom_step"
        tier = sf.SolverTier.STRUCTURED
        priority = 5

        def solve_step(self, step_type_id, inputs):
            raise RuntimeError(r"D:\platform\secret internals")

    monkeypatch.setattr(sf, "get_registry", lambda: [BoomBackend()])
    result = sf.get_facade().solve_step(
        "differentiate_at_point", {"expression": "x**2", "var": "x",
                                   "point": "2"})

    assert result.success is False
    assert result.error_code == "BACKEND_ERROR"
    low = result.error.lower()
    assert "d:\\platform" not in low and "platform" not in low
    assert "secret" not in low
    assert result.error.strip()


def test_facade_identify_error_typed(monkeypatch):
    import backend.ai.final_solver as fs_mod

    def _boom(question, class_level=None):
        raise RuntimeError("secret /app/path in identify")

    monkeypatch.setattr(fs_mod, "identify_question", _boom)
    result = sf.get_facade().identify("what is the area of a circle",
                                      class_level="10")

    assert result.success is False
    low = result.error.lower()
    assert "/app" not in low and "secret" not in low
    assert result.error.strip()
    assert result.question == "what is the area of a circle"


# ------------------------------------------------------------------ #
# 3. honest truth labels (labeling, not gating — no invented verifier)
# ------------------------------------------------------------------ #

def test_facade_verified_label_honest(monkeypatch):
    class VerifiedBackend(sf.SolverBackend):
        backend_id = "verified_step_probe"
        tier = sf.SolverTier.STRUCTURED
        priority = 5

        def solve_step(self, step_type_id, inputs):
            return SolutionResult(
                success=True, final_answer="6", verified=True,
                verification_msg="substitution check passed",
                solver_tier=self.tier,
            )

    monkeypatch.setattr(sf, "get_registry", lambda: [VerifiedBackend()])
    result = sf.get_facade().solve_step("multiply", {"a": "2", "b": "3"})

    assert result.verified is True
    # backend verification evidence is preserved, never overwritten
    assert result.verification_msg == "substitution check passed"


def test_facade_problem_unverified_stays_method_only(monkeypatch):
    class PlainBackend(sf.SolverBackend):
        backend_id = "plain_probe"
        tier = sf.SolverTier.DETERMINISTIC
        priority = 5

        def solve_problem(self, problem_type_id, step_inputs):
            return SolutionResult(
                success=True, final_answer="42", verified=False,
                solver_tier=self.tier,
            )

    monkeypatch.setattr(sf, "get_registry", lambda: [PlainBackend()])
    result = sf.get_facade().solve_problem("max_min", [{}])

    assert result.success is True
    assert result.verified is False
    assert "not" in result.verification_msg.lower() or \
        "method" in result.verification_msg.lower()
