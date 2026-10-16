"""Skeleton normalization + slot-gate tests (semantic QA lane).

The SCIENTIST-council fix for the role-permuted-digit hole: every number
is replaced by a TYPED placeholder (<PCT>/<CUR>/<UNIT:kg>/<INT>/<DEC>)
and a serve-time gate requires every typed slot the ask states to be
CONTAINED in the matched question's slot multiset — order-insensitive
(a rewording that moves "2 hours" still accepts, and the core of a long
multi-part bank row may quote), role-sensitive ("120 km in 2 hours" vs
"2 km in 120 hours" refuses).  Fail-closed: any trouble in the gate
refuses.

Pure-function tests only — no models, Qdrant, or DB (the lane is
deterministic; the CE-threshold side is calibrated by _calib_harness /
_calib_neg_harness on the real 250k-pt index).
"""
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from backend.its.solver import semantic_qa as sq  # noqa: E402
from backend.its.solver.semantic_qa import (  # noqa: E402
    _slot_gate_allows,
    _slots_conflict,
    _twin_refusal,
    _word_tokens,
    normalize_skeleton,
)


# --------------------------------------------------------------------- #
# normalize_skeleton — typing of the placeholders
# --------------------------------------------------------------------- #

def test_percent_symbol_and_word_tag_pct():
    for text in ("Find 15% of 200", "Find 15 percent of 200",
                 "Find 15 per cent of 200"):
        sk, slots = normalize_skeleton(text)
        assert "<PCT>" in sk, text
        assert slots == [("pct", "15"), ("int", "200")], (text, slots)


def test_currency_prefix_and_suffix_tag_cur():
    for text in ("Rs 50", "Rs. 50", "₹50", "₹ 50", "$50", "INR 50",
                 "50 rupees", "50 Rs"):
        _sk, slots = normalize_skeleton(text)
        assert slots == [("cur", "50")], (text, slots)


def test_unit_quantity_tagged_with_class():
    sk, slots = normalize_skeleton("A train covers 120 km in 2 hours")
    assert "<UNIT:km>" in sk and "<UNIT:hour>" in sk
    assert slots == [("unit:km", "120"), ("unit:hour", "2")]


def test_single_letter_units_stay_untagged():
    # Owner law (comment above _UNIT_CLASS): m/g/l sit next to exponent
    # digits and render as \text{m}^2 in the bank — tagging them invents
    # disagreements that have nothing to do with a permutation.
    sk, slots = normalize_skeleton("The object weighs 5 g and is 5 m long")
    assert "<UNIT" not in sk
    assert slots == [("int", "5"), ("int", "5")]


def test_bare_int_and_dec():
    _sk, slots = normalize_skeleton("Add 42 and 2.5")
    assert slots == [("int", "42"), ("dec", "2.5")]


def test_integral_float_collapses_to_int():
    _sk, slots = normalize_skeleton("a speed of 80.0 kmph")
    assert slots == [("unit:kmph", "80")]


def test_comma_thousands_normalized():
    _sk, slots = normalize_skeleton("Rs 1,200 and 12,00,000 people")
    assert slots == [("cur", "1200"), ("int", "1200000")]


def test_latex_text_wrapper_stripped():
    _sk, slots = normalize_skeleton(r"The mass is \text{5 kg} exactly")
    assert slots == [("unit:kg", "5")]


def test_latex_and_plain_sci_notation_reduce_identically():
    latex = r"\( 2.0 \times 10^{-3} \, \text{m}^2 \)"
    plain = "2.0 x 10^-3 m^2"
    assert normalize_skeleton(latex)[1] == normalize_skeleton(plain)[1]


def test_words_preserved_lowercase_in_skeleton():
    sk, _slots = normalize_skeleton("A Train Covers 120 km")
    assert "train" in sk and "covers" in sk
    assert "120" not in sk


def test_no_numbers_empty_slots():
    sk, slots = normalize_skeleton("What is photosynthesis?")
    assert slots == []
    assert "photosynthesis" in sk


# --------------------------------------------------------------------- #
# The gate — role permutation refuses, reorder accepts
# --------------------------------------------------------------------- #

_TRAIN_ORIG = "A train covers 120 km in 2 hours. Find its average speed."
_TRAIN_PERMUTED = "A train covers 2 km in 120 hours. Find its average speed."
_TRAIN_REORDERED = "In 2 hours, a train covers 120 km. Find its average speed."


def test_role_permutation_refuses():
    assert _slots_conflict(normalize_skeleton(_TRAIN_PERMUTED)[1],
                           normalize_skeleton(_TRAIN_ORIG)[1]) is True
    # symmetric: whichever side is the twin, the pair disagrees
    assert _slots_conflict(normalize_skeleton(_TRAIN_ORIG)[1],
                           normalize_skeleton(_TRAIN_PERMUTED)[1]) is True


def test_reorder_accepts():
    assert _slots_conflict(normalize_skeleton(_TRAIN_REORDERED)[1],
                           normalize_skeleton(_TRAIN_ORIG)[1]) is False


def test_partial_quote_of_multi_part_row_accepts():
    # Lane contract (same as the digit-subset guard): a student may ask
    # the CORE of a long multi-part bank row; the row's extra part-(b)/(c)
    # numbers must not refuse the serve.  Containment, not equality.
    core = "A courier company charges Rs 50 for the first kg and " \
           "Rs 20 for each additional kg. Write a function."
    full_row = ("A courier company charges Rs 50 for the first kilogram "
                "and Rs 20 for each additional kilogram. Write the "
                "function, then calculate the charge for (a) a 3 kg "
                "parcel, (b) a 5 kg parcel at a Rs 40 promotional rate, "
                "and (c) a 2 kg parcel at Rs 60.")
    assert _slots_conflict(normalize_skeleton(core)[1],
                           normalize_skeleton(full_row)[1]) is False


def test_permutation_hidden_in_multi_part_row_still_refuses():
    # Containment must not reopen the hole: a long bank row whose CORE
    # is the role-permuted twin (plus extra part numbers) does not
    # CONTAIN the ask's original (unit:km, 120) pair -> refuses.
    ask = "A train covers 120 km in 2 hours. Find its average speed."
    twin_row = ("A train covers 2 km in 120 hours, then (a) 5 km more and "
                "(b) 7 kg of freight. Find its average speed.")
    assert _slots_conflict(normalize_skeleton(ask)[1],
                           normalize_skeleton(twin_row)[1]) is True


def test_pct_base_permutation_refuses():
    orig = normalize_skeleton("Find 15% of 200")[1]
    twin = normalize_skeleton("Find 200% of 15")[1]
    assert _slots_conflict(twin, orig) is True


def test_empty_ask_imposes_no_constraint():
    assert _slots_conflict([], [("int", "5")]) is False


def test_value_mutation_refuses():
    assert _slots_conflict(normalize_skeleton("120 km in 2 hours")[1],
                           normalize_skeleton("130 km in 2 hours")[1]) is True


# --------------------------------------------------------------------- #
# Fail-closed behaviour of the serve-time wrapper
# --------------------------------------------------------------------- #

def test_gate_uses_payload_slots_when_present():
    slots_json = json.dumps([["unit:km", "120"], ["unit:hour", "2"]])
    assert _slot_gate_allows(_TRAIN_ORIG, "irrelevant", slots_json) is True
    # payload slots from the PERMUTED twin must refuse the ask
    bad_json = json.dumps([["unit:km", "2"], ["unit:hour", "120"]])
    assert _slot_gate_allows(_TRAIN_ORIG, "irrelevant", bad_json) is False


def test_gate_computes_from_matched_text_when_payload_missing():
    assert _slot_gate_allows(_TRAIN_ORIG, _TRAIN_ORIG, None) is True
    assert _slot_gate_allows(_TRAIN_ORIG, _TRAIN_PERMUTED, None) is False


def test_gate_fail_closed_on_malformed_payload_json():
    assert _slot_gate_allows(_TRAIN_ORIG, _TRAIN_ORIG, "{not json") is False
    assert _slot_gate_allows(_TRAIN_ORIG, _TRAIN_ORIG, "[1, 2]") is False


def test_gate_fail_closed_on_normalize_exception(monkeypatch):
    def _boom(_text):
        raise RuntimeError("injected")
    monkeypatch.setattr(sq, "normalize_skeleton", _boom)
    assert _slot_gate_allows(_TRAIN_ORIG, _TRAIN_ORIG, None) is False


def test_gate_allows_numberless_ask():
    assert _slot_gate_allows("What is photosynthesis?",
                             "A train covers 120 km", None) is True


def test_payload_slots_roundtrip_and_fallback():
    _sk, slots = normalize_skeleton(_TRAIN_ORIG)
    decoded = sq._payload_slots({"slots": json.dumps(slots)}, "")
    assert decoded == [("unit:km", "120"), ("unit:hour", "2")]
    # old point without the payload keys: computed from the stored text
    fallback = sq._payload_slots({}, _TRAIN_ORIG)
    assert fallback == decoded


# --------------------------------------------------------------------- #
# Word-twin ceiling untouched (defect class #2: word-mutated twins)
# --------------------------------------------------------------------- #

def test_word_overlap_ceiling_still_refuses_word_twins():
    ask = "How do you find the area of a circle with radius 7 cm?"
    twin = "How do you find the circumference of a circle with radius 7 cm?"
    ask_words, twin_words = _word_tokens(ask), _word_tokens(twin)
    digits = sq._digit_tokens(ask)
    assert _twin_refusal(ask_words, twin_words, digits, digits) is True
    # the slot gate by itself does NOT catch this twin (digits + roles
    # identical) — the ceiling is the defence, and it is unchanged
    assert _slots_conflict(normalize_skeleton(ask)[1],
                           normalize_skeleton(twin)[1]) is False
    assert sq._WORD_TWIN_OVERLAP == 0.85


# --------------------------------------------------------------------- #
# Synthetic calibration: 30 hand-written twin pairs
#   PARAPHRASE  — reworded, same numbers/roles  -> gate must ACCEPT
#   PERMUTED    — roles of two numbers swapped  -> gate must REFUSE
#   REORDERED   — clauses moved around          -> gate must ACCEPT
# --------------------------------------------------------------------- #

_PARAPHRASE_TWINS = [
    ("A train covers 120 km in 2 hours. Find its average speed.",
     "A train travels 120 km in 2 hours. What is its mean speed?"),
    ("Find 15% of 200.",
     "Calculate 15 percent of 200."),
    ("A shopkeeper buys goods worth Rs 500 and sells them for Rs 650. "
     "Find his profit percent.",
     "A trader purchases items for Rs 500 and sells them for Rs 650. "
     "Compute the profit percentage."),
    ("A car runs at 60 km per hour for 5 hours. How far does it go?",
     "A car moves at 60 km/h for 5 hours. What distance does it cover?"),
    ("A packet weighs 2.5 kg and costs Rs 80. Find the cost of 10 kg.",
     "A packet has a weight of 2.5 kg and its price is Rs 80. "
     "What is the price of 10 kg?"),
    ("A rectangular sheet is 12 cm long and 8 cm wide. Find its perimeter.",
     "A sheet measures 12 cm in length and 8 cm in width. "
     "What is its perimeter?"),
    ("A water tank fills in 3 hours 30 minutes. How many minutes "
     "does it take?",
     "A tank takes 3 hours and 30 minutes to fill. How long does it "
     "take in minutes?"),
    ("A student scores 45 marks out of 60 in maths and 40 out of 50 "
     "in science. Find the total.",
     "A student got 45 out of 60 marks in maths and 40 out of 50 in "
     "science. What is the total score?"),
    ("A wire of length 88 cm is bent into a circle. Find its radius. "
     "(Use pi = 22/7)",
     "An 88 cm wire is bent to form a circle. What is the radius? "
     "(take pi as 22/7)"),
    ("The price of a book increased from Rs 250 to Rs 300. "
     "Find the increase.",
     "A book's price rose from Rs 250 to Rs 300. By how much did it "
     "increase?"),
]

_PERMUTED_TWINS = [
    ("A train covers 120 km in 2 hours. Find its average speed.",
     "A train covers 2 km in 120 hours. Find its average speed."),
    ("Find 15% of 200.",
     "Find 200% of 15."),
    # NOTE the documented residual: swapping two numbers of the SAME
    # type ("Rs 50 for the first kg and Rs 20 for each additional kg" ->
    # "Rs 20 ... Rs 50 ...") is invisible to an ORDER-INSENSITIVE
    # multiset — and must stay invisible, because the same
    # order-insensitivity is what lets reworded clauses accept.  Such
    # twins are the word-overlap ceiling's job (identical wording +
    # differing structure).  The pairs below all swap numbers across
    # DIFFERENT types, which is what the gate exists for.
    ("A worker earns Rs 900 in 12 days. Find his daily wage.",
     "A worker earns Rs 12 in 900 days. Find his daily wage."),
    ("A car runs at 60 km per hour for 5 hours. How far does it go?",
     "A car runs at 5 km per hour for 60 hours. How far does it go?"),
    ("A tank fills 300 litres in 15 minutes. Find the flow rate.",
     "A tank fills 15 litres in 300 minutes. Find the flow rate."),
    ("A shop sold 40 pens for Rs 120. Find the price per pen.",
     "A shop sold 120 pens for Rs 40. Find the price per pen."),
    ("A 5 kg bag of rice costs Rs 350. Find the cost of 1 kg.",
     "A 350 kg bag of rice costs Rs 5. Find the cost of 1 kg."),
    ("A boat travels 45 km downstream in 3 hours. Find its downstream "
     "speed.",
     "A boat travels 3 km downstream in 45 hours. Find its downstream "
     "speed."),
    ("Rahul bought 12 notebooks for Rs 96. Find the cost of one notebook.",
     "Rahul bought 96 notebooks for Rs 12. Find the cost of one notebook."),
    ("Find the simple interest on Rs 500 at 8% per year for 3 years.",
     "Find the simple interest on Rs 8 at 500% per year for 3 years."),
]

_REORDERED_TWINS = [
    ("A train covers 120 km in 2 hours. Find its average speed.",
     "In 2 hours, a train covers 120 km. Find its average speed."),
    ("A packet weighs 2.5 kg and costs Rs 80.",
     "Rs 80 is the cost of a packet that weighs 2.5 kg."),
    ("She scored 45 marks out of 60 in maths and 40 out of 50 in science.",
     "In science she scored 40 out of 50, and in maths 45 out of 60."),
    ("The tank fills 300 litres in 15 minutes.",
     "In 15 minutes the tank fills 300 litres."),
    ("A wire of length 88 cm is bent into a circle with pi = 22/7.",
     "Taking pi as 22/7, a circle is formed from a wire of length 88 cm."),
    ("A car runs at 60 km per hour for 5 hours.",
     "For 5 hours a car runs at 60 km per hour."),
    ("A shop sold 40 pens for Rs 120.",
     "For Rs 120 a shop sold 40 pens."),
    ("An exam has 20 questions worth 5 marks each. Find the maximum "
     "score.",
     "Find the maximum score of an exam worth 5 marks each for its "
     "20 questions."),
    ("A tap runs for 3 hours 30 minutes.",
     "For 3 hours and 30 minutes the tap runs."),
    ("A rectangle is 12 cm long and 8 cm wide.",
     "8 cm wide and 12 cm long is a rectangle."),
]


def test_calibration_paraphrase_twins_accept():
    for orig, para in _PARAPHRASE_TWINS:
        a, b = normalize_skeleton(orig)[1], normalize_skeleton(para)[1]
        assert not _slots_conflict(a, b), (orig, para, a, b)
        assert not _slots_conflict(b, a), (orig, para, a, b)


def test_calibration_permuted_twins_refuse():
    for orig, twin in _PERMUTED_TWINS:
        a, b = normalize_skeleton(orig)[1], normalize_skeleton(twin)[1]
        assert _slots_conflict(a, b), (orig, twin, a, b)
        assert _slots_conflict(b, a), (orig, twin, a, b)


def test_calibration_reordered_twins_accept():
    for orig, reorder in _REORDERED_TWINS:
        a, b = normalize_skeleton(orig)[1], normalize_skeleton(reorder)[1]
        assert not _slots_conflict(a, b), (orig, reorder, a, b)
        assert not _slots_conflict(b, a), (orig, reorder, a, b)


def test_gate_end_to_end_on_twin_populations():
    # Same populations through the fail-closed wrapper, payload slots as
    # index time would store them.
    for orig, para in _PARAPHRASE_TWINS + _REORDERED_TWINS:
        payload = json.dumps(normalize_skeleton(orig)[1])
        assert _slot_gate_allows(para, "unused", payload), (orig, para)
    for orig, twin in _PERMUTED_TWINS:
        payload = json.dumps(normalize_skeleton(orig)[1])
        assert not _slot_gate_allows(twin, "unused", payload), (orig, twin)
