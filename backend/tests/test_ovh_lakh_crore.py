"""Indian scale words: compound 'lakh crore' is one unit (10^12), never split."""
import pytest

from backend.its.solver.input_normalizer import normalize_input


@pytest.mark.parametrize("src,expected", [
    ("1.6 lakh crore", "1600000000000"),
    ("₹1.6 lakh crore", "Rs 1600000000000"),
    ("Rs 2 lakh crore", "Rs 2000000000000"),
    ("2.5 lakh", "250000"),
    ("1.5 crore", "15000000"),
    ("2 lakhs and 3 crores", "200000 and 30000000"),
])
def test_scale_words(src, expected):
    assert normalize_input(src) == expected
