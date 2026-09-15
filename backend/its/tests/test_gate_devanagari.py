"""validate_catalog must enforce title/grounding/copyright checks on
Devanagari content, not silently skip them (fabricated Hindi catalogs
passed the Latin-only gate)."""
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..")))

from backend.tools.bulk_catalog_generator import validate_catalog

# chapter opening: title + a line that repeats in the padding below
CH = ("adhyay do bhakti ke pad "
      "मीराबाई के पद "
      "भक्ति का सुंदर द्या देते हैं। "
      "सूरदास के पद भी प्रसिद्ध हैं। "
      + ("पाठ शब्द कथा व्याकरण " * 8))

TITLE = "भक्ति के पद"      # bhakti ke pad (in chapter)
FAKE_TITLE = "काल्पित शीर्षक"  # not in chapter
COPIED = ("भक्ति का "
          "सुंदर द्या "
          "देते हैं "
          "सूरदास के")     # verbatim from CH


def _concept(cid, title, definition):
    return {
        "id": cid, "title": title, "definition": definition,
        "formula": "-", "key_idea": "सारांश",
        "question_patterns": ["p1", "p2", "p3"],
        "solution_type": "verify_property",
        "solution_steps": [],
    }


def _cat(title, definition, n_concepts=3):
    filler = ("सूरदास "
              "मीराबाई "
              "प्रसिद्ध "
              "पद भक्ति "
              "भाव शृंगार "
              "लेखक काल")
    return {
        "class": 7, "subject": "hindi", "chapter": 2,
        "chapter_title": title,
        "concepts": [_concept("x.2.1", title, definition)] + [
            _concept(f"x.2.{i}", filler, filler) for i in range(2, 1 + n_concepts)
        ],
        "worked_examples": [{"q": "q", "a": "a"}],
        "exercises": [{"group": "g", "items": ["i1"]}],
    }


def test_copied_devanagari_run_fails():
    ok, probs = validate_catalog(_cat(
        TITLE,
        "यह पाठ " + COPIED +
        " से प्रेरित "
        "है।"), CH)
    assert not ok
    assert any("Devanagari verbatim run" in p for p in probs)


def test_fabricated_title_fails_preflight():
    ok, probs = validate_catalog(_cat(
        FAKE_TITLE,
        "लेखक पद गाते "
        "हैं भक्ति "
        "भाव मीराबाई "
        "सूरदास प्रसिद्ध "
        "पद्य"), CH)
    assert not ok
    assert any("does not match the file opening" in p for p in probs)


def test_ungrounded_devanagari_title_fails_grounding():
    ungrounded = "गोल गुम्बज"
    ok, probs = validate_catalog(_cat(
        ungrounded,
        "यह विधा " + ungrounded +
        " रखती है पद "
        "भक्ति भाव "
        "मीराबाई "
        "सूरदास "
        "प्रसिद्ध"), CH)
    assert not ok
    assert any("grounded" in p for p in probs)


def test_clean_hindi_catalog_passes():
    ok, probs = validate_catalog(_cat(
        TITLE,
        "मीराबाई के "
        "पद में साँये "
        "की प्रखर है "
        "और सूरदास की "
        "शृंगार प्रधान "
        "है प्रसिद्ध"), CH)
    assert ok, probs
