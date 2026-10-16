"""TDD for the lakh/crore input normalizer (CLOSURE_LIST item 4).

Probes the real normalizer output so the bug is reproduced before any fix.
"""
import pytest

from backend.its.solver import input_normalizer as n


def _norm(text: str) -> str:
    fn = getattr(n, "normalize_input", None) or getattr(n, "normalize", None)
    if fn is None:
        pytest.skip("no public normalize entry point")
    out = fn(text)
    return out if isinstance(out, str) else (out.get("text") or out.get("normalized") or str(out))


@pytest.mark.parametrize("src,expect", [
    ("2.5 lakh", "250000"),
    ("1.5 crore", "15000000"),
    ("2 lakhs", "200000"),
])
def test_lakh_crore_expand_to_absolute(src, expect):
    assert expect in _norm(src)


def test_indian_grouping_then_scale_does_not_double_count():
    # "1,50,000" is already absolute; must not be scaled again
    out = _norm("price is 1,50,000 rupees")
    assert "150000" in out and "15000000000" not in out
