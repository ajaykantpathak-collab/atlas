"""Pinned corpus check COR-000001 — GREEN.

Formula plug-in family now matches textbook pattern without mandatory 'from this topic'
and verifies through registered _v_formula_plugin second path.
Pinned at: 2026-10-13
"""
import pytest
from backend.its.solver.answer_pipeline import answer


def test_corpus_case():
    q = "Using the formula A = l*w, calculate A when l=19, w=5."
    res = answer(q)
    print("\n[DEBUG] res:", res)
    print("[DEBUG] audit:", res.audit if hasattr(res, "audit") else None)
    print("[DEBUG] refusal_reason:", res.refusal_reason if hasattr(res, "refusal_reason") else None)
    assert res is not None
    assert res.label in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS", "VERIFIED_OFFICIAL", "VERIFIED_SEMANTIC")
    assert res.numeric == 95.0
    assert "95" in str(res.answer)
