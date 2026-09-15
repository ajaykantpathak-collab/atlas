"""Scoreboard-derived root-cause batteries for slot extraction.

Every text below is a REAL mined Class 7 bank question that the
competency scoreboard measured as slot_gap (150-question sample, fixed
seed 20260908, baseline: 43 covered / 77 slot_gap).  TASK 1 diagnosed
all 77 by routing each text and recording why extract_slots returned
None.  Measured frequency table (slot_gap_diag, before fixes):

    56  H  routed concept has NO numeric template (no worked-example
           placeholders AND no canonical role set): activity/draw
           prompts, figure- and table-carried items, conceptual
           geometry, puzzles -- honest refusals, zero-wrong
     6  C  too-many-numbers guard (damaged multi-part / table texts)
     5  A  multi-part questions where whole-text alignment fails
     5  F  numbers present, concept has no role order
     4  E  too few numbers (0-1 numbers in text)
     1  D  labeled slot synonym-missed ("Ans:" fake label)
    16  (overlapping) embedded "Ans:"-tails poisoning pool + labels

What is FIXED where:
  - embedded tails: slot_extractor.strip_answer_tail (miner + DB
    cleanup + scoreboard pool) and tail-span blocking in extraction;
  - C (too-many-numbers): unit-aware disambiguation when exactly
    role-count numbers carry role-consistent units; flattened
    mixed-fraction triples ("3 3 4 ft") deliberately stay refusals;
  - D: synonym table additions ("cost", "parallel side(s)",
    "sum of money").

What is NOT fixable in the extractor (remaining gaps, by design):
  H/A/F/E rows route to concepts with no catalog executor (c8m*
  Ganita Prakash concepts, HCF/LCM, integer-expression evaluation) or
  carry unusable texts; honest refusal is the correct behavior there.

The batteries assert the HONEST outcome per real row: either the
extraction still refuses (zero-wrong) or -- for the fixed shapes --
the tail no longer poisons the reading.
"""
import json
import os

import pytest

from backend.its.solver.slot_extractor import (
    extract_slots,
    extract_slots_detailed,
    extract_list_slots,
    strip_answer_tail,
)

_COMPETENCY_DIR = os.path.normpath(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "competency"))


def _concept_for(cid: str) -> dict:
    chapter = cid.split(".")[0][3:]
    pattern = os.path.join(_COMPETENCY_DIR,
                           "catalog_class7_maths_ch%s_*.json" % chapter)
    import glob
    files = sorted(glob.glob(pattern))
    if not files:
        return {}
    with open(files[0], encoding="utf-8") as f:
        cat = json.load(f)
    return {c["id"]: c for c in cat["concepts"]}.get(cid, {})


def _routed_concept(text: str) -> dict:
    """The concept the competency router actually picks for this text
    (same call the scoreboard's diagnose() makes).  Skips the case if
    the router has moved on since the measurement."""
    from backend.its.solver.competency_engine import route_concept
    hit = route_concept(text)
    if hit is None:
        pytest.skip("router no longer routes this row")
    return hit[0]


# ------------------------------------------------------------------ #
# Real rows: embedded answer tails must not poison extraction
# ------------------------------------------------------------------ #

class TestScoreboardTailRows:
    ROW_50165 = ("Tinku weighed 35.75 kg in January and 34.50 kg in "
                 "February. Has he gained or lost weight? How much is "
                 "the change? Ans:  He has lost weight. The change in "
                 "the weight = 1.25 kg")
    ROW_50389 = ("A car runs 16 km using 1 litre of petrol. How far "
                 "will it go using 2 litres? Ans: 44 km.")
    ROW_50038 = ("Strike out 10 digits from the number "
                 "12345123451234512345 so that the remaining number is "
                 "as large as possible. Ans: 5534512345")

    def test_tail_stripped_before_extraction(self):
        cleaned = strip_answer_tail(self.ROW_50165)
        assert "Ans:" not in cleaned
        assert "1.25 kg" not in cleaned
        assert "35.75 kg" in cleaned

    def test_row_50389_extracts_from_clean_pool(self):
        # after the strip the question still refuses honestly on its
        # measured concept (c8m9.6.1 has no numeric template), but the
        # embedded answer "44 km" is gone from every pool
        from backend.its.solver.slot_extractor import _scan_numbers
        cleaned = strip_answer_tail(self.ROW_50389)
        vals = [n[0] for n in _scan_numbers(cleaned)]
        assert 44.0 not in vals
        assert extract_slots(cleaned, _routed_concept(cleaned)) is None

    def test_row_50038_answer_number_never_a_value(self):
        from backend.its.solver.slot_extractor import _scan_numbers
        cleaned = strip_answer_tail(self.ROW_50038)
        assert 5534512345.0 not in [n[0] for n in _scan_numbers(cleaned)]
        concept = _routed_concept(cleaned)
        assert extract_slots(cleaned, concept) is None

    def test_row_50165_still_refuses_without_tail(self):
        # 35.75 and 34.50 remain (real values) but the routed concept
        # has no weight-change role table: honest refusal
        cleaned = strip_answer_tail(self.ROW_50165)
        assert extract_slots(cleaned, _routed_concept(cleaned)) is None


# ------------------------------------------------------------------ #
# Real rows: honest refusals that must STAY refusals (zero-wrong)
# ------------------------------------------------------------------ #

class TestScoreboardHonestRefusals:
    def test_multi_part_with_embedded_answers_refuses(self):
        # 49988: "(a) Three thousand? 3 times (b) 10,000? ______" --
        # parts carry their own answers; whole-text slots would lie
        text = ("The Thoughtful Thousands only has a +1000 button. How "
                "many times should it be pressed to show: (a) Three "
                "thousand? 3 times (b) 10,000? ____________")
        assert extract_slots(text, _routed_concept(text)) is None

    def test_hcf_multi_part_refuses(self):
        # 50437: five parts, eleven numbers, no per-part role table
        text = ("Find the HCF of the following numbers: (a) 24, 180 "
                "(b) 42, 75, 24 (c) 240, 378 (d) 400, 2500 (e) 300, 800")
        assert extract_slots(text, _routed_concept(text)) is None

    def test_lcm_multi_part_refuses(self):
        # 50439
        text = ("Find the LCM of the following numbers: (a) 30, 72 "
                "(b) 36, 54 (c) 105, 195, 65 (d) 222, 370")
        assert extract_slots(text, _routed_concept(text)) is None

    def test_congruence_comparison_refuses(self):
        # 50404: two triangles side by side -- slot DSL has no reading
        text = ("Identify whether the triangles below are congruent. "
                "What conditions did you use to establish their "
                "congruence? 7 cm 5 cm 47 7 cm 5 cm 47")
        assert extract_slots(text, _routed_concept(text)) is None

    def test_longest_side_without_numbers_refuses(self):
        # 50644: figure-carried geometry, zero numbers in text
        text = ("Which is the longest side in the triangle PQR, "
                "right-angled at P?")
        assert extract_slots(text, _routed_concept(text)) is None

    def test_conceptual_angle_question_refuses(self):
        # 50633: conceptual, zero numbers
        text = ("Is the sum of any two angles of a triangle always "
                "greater than the third angle?")
        assert extract_slots(text, _routed_concept(text)) is None

    def test_figure_arrow_mark_refuses(self):
        # 50507: number line carried by a figure
        text = "Write the decimal number at the arrow mark:"
        assert extract_slots(text, _routed_concept(text)) is None
        assert extract_list_slots(text, _routed_concept(text)) is None

    def test_collect_data_activity_refuses(self):
        # 50522: no data exists in the text
        text = ("Try the activity above on your own. Collect data for "
                "7 or more attempts and find the average.")
        concept = _routed_concept(text)
        assert extract_slots(text, concept) is None
        assert extract_list_slots(text, concept) is None

    def test_damaged_fraction_conversion_refuses(self):
        # 50155 after tail-strip: the PDF lost the fraction numerators
        text = ("Convert the following fractions into decimals: "
                "(a) (b) (c) (d)")
        assert extract_slots(text, _routed_concept(text)) is None

    def test_number_line_divisions_refuse(self):
        # 50108: page artifact "9" + two numbers, 1 decimal role:
        # ambiguous -> refusal
        det = extract_slots_detailed(
            "Name all the divisions between 1 and 1.1 on the number "
            "line.", _routed_concept(
                "Name all the divisions between 1 and 1.1 on the "
                "number line."))
        assert det is not None and not det.values

    def test_flattened_mixed_fraction_row_refuses(self):
        # 50354: "3 3 4 ft" = 3-3/4 ft shorthand -- unusable, refuse
        text = ("Find the area of a rectangle of sides 3 3 4 ft and "
                "9 3 5 ft.")
        assert extract_slots(text, _routed_concept(text)) is None

    def test_flattened_mixed_fraction_hours_refuse(self):
        # 50368: "5 1 6 hours" = 5-1/6 hours
        text = ("Amritpal decides on a destination for his vacation. "
                "If he takes a train, it will take him 5 1 6 hours to "
                "get there.")
        assert extract_slots(text, _routed_concept(text)) is None

    def test_strike_out_puzzle_refuses(self):
        # 50038 cleaned: puzzle needs search, not slot filling
        text = ("Strike out 10 digits from the number "
                "12345123451234512345 so that the remaining number is "
                "as large as possible.")
        assert extract_slots(text, _routed_concept(text)) is None


# ------------------------------------------------------------------ #
# Clean rows measured covered must stay clean (no-fix regressions)
# ------------------------------------------------------------------ #

class TestScoreboardCleanRowsUnaffected:
    def test_clean_question_without_tail_unchanged(self):
        # 50088 minus its tail: the pool holds exactly the 8-weeks
        # scenario numbers (2, 8, 7)
        text = ("Melvin reads a two - page story every day except on "
                "Tuesdays and Saturdays. How many stories would he "
                "complete reading in 8 weeks?")
        assert strip_answer_tail(text) == text

    def test_probability_row_with_favourable_spelling_extracts(self):
        # synonym table carries both spellings (D-mode fix surface)
        slots = extract_slots(
            "favourable outcomes = 3, total outcomes = 6. find the "
            "probability.",
            _concept_for("c7m3.6.1"))
        assert slots == {"favorable": 3.0, "total": 6.0}
