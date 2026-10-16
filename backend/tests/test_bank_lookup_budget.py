"""Wall-clock budget on the bank lookup: an overrun falls through (None)
instead of holding the request; a fast lookup returns its value."""
import sys
import time
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "deploy"))

from backend.its.solver import bank_answer  # noqa: E402


@pytest.fixture
def budget(monkeypatch):
    monkeypatch.setenv("BANK_LOOKUP_BUDGET_S", "0.1")


def test_slow_lookup_falls_through_within_budget(monkeypatch, budget):
    def slow(_q):
        time.sleep(1.0)
        return {"answer": "late"}

    monkeypatch.setattr(bank_answer, "_lookup_impl", slow)
    t0 = time.perf_counter()
    assert bank_answer.lookup("A question long enough to look up here?") is None
    assert (time.perf_counter() - t0) < 0.5


def test_fast_lookup_returns_value(monkeypatch, budget):
    monkeypatch.setattr(bank_answer, "_lookup_impl",
                        lambda _q: {"answer": "ok"})
    assert bank_answer.lookup("A question long enough to look up here?") == {
        "answer": "ok"}


def test_lookup_error_degrades_to_none(monkeypatch, budget):
    def boom(_q):
        raise RuntimeError("db down")

    monkeypatch.setattr(bank_answer, "_lookup_impl", boom)
    assert bank_answer.lookup("A question long enough to look up here?") is None


def test_budget_env_is_bounded(monkeypatch):
    monkeypatch.setenv("BANK_LOOKUP_BUDGET_S", "not-a-number")
    assert bank_answer._budget_s() == 0.5
    monkeypatch.setenv("BANK_LOOKUP_BUDGET_S", "0")
    assert bank_answer._budget_s() == 0.05
