"""Hindi (Devanagari) questions must not normalize to empty strings.

Regression: _normalize_question stripped the Devanagari block, so every
Hindi concept text and question collapsed to "" and the embedder returned
identical vectors for all Hindi catalogs -- routing was blind.
"""
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..")))

from backend.its.solver.competency_engine import _normalize_question


def test_devanagari_survives_normalization():
    q = "5 - 3 ki vyakhya"  # ascii fallback sanity
    assert _normalize_question(q)

def test_hindi_question_not_empty():
    q = "\u092a\u093e\u0901\u091a \u092c\u0941\u0926\u094d\u0927\u093f\u092e\u093e\u0928 \u0935\u094d\u092f\u0915\u094d\u0924\u093f \u0915\u094c\u0928 \u0925\u0940?"  # "Who were the five wise men?"
    out = _normalize_question(q)
    assert out, "Hindi question normalized to empty string"
    assert any("\u0900" <= ch <= "\u097f" for ch in out), "Devanagari stripped"

def test_hindi_concept_text_distinct():
    a = _normalize_question("\u092d\u0915\u094d\u0924\u093f \u0915\u0947 \u092a\u0926")   # "pads of devotion"
    b = _normalize_question("\u0935\u0930\u094d\u0937\u093e \u0915\u0940 \u092e\u0939\u093f\u092e\u093e")  # "glory of rain"
    assert a and b and a != b, "distinct Hindi texts must not collapse together"

def test_numbers_still_masked_with_hindi():
    q = "\u0967\u0968 \u0915\u093e \u092f\u094b\u0917 12 \u0939\u0948"  # includes ASCII 12
    out = _normalize_question(q)
    assert "12" not in out  # ascii digits masked
    assert "#" in out

def test_ascii_behavior_unchanged():
    assert _normalize_question("2 + 3 = ?") == "# plus # equals"
    assert _normalize_question("Find x: 3x - 5 = 10") == "find x #x minus # equals #"
