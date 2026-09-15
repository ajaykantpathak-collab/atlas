"""test_mine_keys.py -- batteries for the Stage 6 official-key miner.

Covers the PURE functions of backend/tools/mine_keys.py only (no DB writes):
fingerprint stability, number masking, option-letter / roman / matching /
numeric+unit extraction, option parsing, alignment (hash, numeric, prefix,
fuzzy, ordinal offset), suspect detection, and the idempotence of the
progress planning logic.

Run:
    cd /d/platform && python -m pytest backend/its/tests/test_mine_keys.py -q
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "tools"))

import mine_keys as mk  # noqa: E402
from mine_keys import (  # noqa: E402
    Index,
    QuestionRow,
    canonical,
    canonical_hash,
    extract_answer,
    extract_segments,
    is_boilerplate,
    is_suspect,
    normalize_text,
    numeric_signature,
    option_text_match,
    parse_options,
    plan_docs,
    progress_after,
    session_ok,
    usable_target,
    validate_key,
    word_overlap,
    best_offset,
    align_by_fingerprint,
    score_offset,
    answer_lead,
)


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #

def _qrow(qid, doc_id, qno, text, doc_type="SQP", subject="maths",
          class_label="Class_X", session="2024-25", marks=1):
    r = QuestionRow(qid=qid, doc_id=doc_id, qno=qno, doc_type=doc_type,
                    subject=subject, class_label=class_label, session=session,
                    text=text, marks=marks)
    r.postprocess()
    return r


def _index(rows):
    idx = Index()
    for r in rows:
        idx.add(r)
    return idx


def _msrow(qid, doc_id, qno, text="", subject="maths", session="2024-25"):
    return _qrow(qid, doc_id, qno, text, doc_type="MS", subject=subject,
                 session=session)


# --------------------------------------------------------------------------- #
# Fingerprints
# --------------------------------------------------------------------------- #

class TestFingerprints:
    def test_stable_under_case_punct_whitespace(self):
        a = "Find the LCM of 12 and 18."
        b = "find the LCM of 12 and 18"
        c = "Find  the  LCM   of 12 and 18?!  "
        assert canonical_hash(a) == canonical_hash(b) == canonical_hash(c)

    def test_masks_numbers(self):
        # number tokens are masked: swapping VALUES keeps the fingerprint
        assert canonical_hash("Rs 8000 at 5% simple interest") == \
            canonical_hash("Rs 9000 at 7% simple interest")
        # wording variants that keep the same words still match
        assert canonical_hash("Rs 8000 at 5% simple interest") == \
            canonical_hash("rs 8000 at 5 % simple interest")

    def test_wording_changes_hash(self):
        assert canonical_hash("Find the LCM of 12 and 18") != \
            canonical_hash("Find the HCF of 12 and 18")

    def test_math_italic_letters_map_to_ascii(self):
        assert canonical_hash("find \U0001d465 equal to") == \
            canonical_hash("find x equal to")
        assert normalize_text("\U0001d44e\U0001d44f") == "ab"

    def test_unicode_digits_normalized(self):
        # values collapse to canonical floats: "5" == "5.0" == "05"
        sig = numeric_signature("value 5 cm")
        assert sig == numeric_signature("value 5.0 cm") == ("5.0",)
        # Odia digit one normalizes like ASCII one
        assert numeric_signature("answer is \u0b672 m") == \
            numeric_signature("answer is 12 m")

    def test_numeric_signature_multiset(self):
        assert numeric_signature("Rs 8000 at 5% for 2 years") == \
            numeric_signature("rate 5, principal 8000, time 2")
        assert numeric_signature("Rs 8000 at 5%") != numeric_signature("8000 at 6%")

    def test_canonical_number_mask_shape(self):
        assert canonical("Rs 8000 at 5%") == "rs # at #"


# --------------------------------------------------------------------------- #
# Extraction
# --------------------------------------------------------------------------- #

class TestExtraction:
    def test_leading_paren_letter(self):
        s = extract_answer("(C) 6cm AB+CD=AD+BC AB+4=3+7 AB=6cm")
        assert s.kind == "letter" and s.letter == "C" and s.tier == "high"
        assert s.answer_text.startswith("6cm")

    def test_leading_close_paren_letter(self):
        s = extract_answer("D) 8[pi/6 - sqrt3/4] cm2 Required Area")
        assert s.kind == "letter" and s.letter == "D"
        assert s.tier == "high"  # numeric+unit ending

    def test_leading_letter_full_option_text(self):
        s = extract_answer("(B) Setting up tele-centres to provide e-services")
        assert s.letter == "B"
        assert "tele-centres" in s.answer_text

    def test_bare_dot_letter_requires_uppercase(self):
        # "A. help spread..." is a sub-part label, not an option key
        s = extract_answer("A. help spread awareness about the issue.")
        assert s.letter is None and s.kind == "text"

    def test_ans_marker_roman(self):
        segs = extract_segments(
            "An electric______________________ \nAns. 2 (ii) \nW = pE (cos1 - cos2)")
        assert len(segs) == 1
        s = segs[0]
        assert s.roman == "ii" and s.letter == "B"
        assert s.stub.startswith("An electric")
        assert "pE" in s.answer_text

    def test_ans_marker_numbered(self):
        segs = extract_segments("Three Capacitors______ \nAns.4. (ii) series C1 C2 C3")
        assert segs[0].roman == "ii"
        assert segs[0].answer_text.startswith("series")

    def test_matching_pairs(self):
        s = extract_answer("(a) - (ii), (b) - (iii), (c) - (i), (d) - (iv)")
        assert s.kind == "matching" and s.tier == "high"
        assert ("A", "ii") in s.matching and s.letter is None

    def test_numeric_unit_tail_tiers_text_high(self):
        s = extract_answer("The total resistance is 6 ohm.")
        assert s.kind == "text" and s.tier == "high"
        plain = extract_answer("The current increases because temperature rises.")
        assert plain.kind == "text" and plain.tier == "medium"

    def test_arrow_answer(self):
        s = extract_answer("答案 \u279c ですから")
        assert s.kind == "arrow" and s.answer_text.strip() != ""

    def test_vi_split_produces_flagged_segment(self):
        row = ("(D) 8[pi/6 - sqrt3/4] cm2 Required Area=8 x segment area "
               "For Visually Impaired candidates: (D) 9pi cm2 area of circle")
        segs = extract_segments(row)
        assert len(segs) == 2
        assert segs[0].vi is False and segs[0].letter == "D"
        assert segs[1].vi is True
        assert not segs[1].answer_text.lower().startswith("candidates")

    def test_boilerplate_rows_skipped(self):
        s = extract_answer("This question paper contains 38 questions.")
        assert s.kind == "skip" and s.skip_reason == "boilerplate"

    def test_section_tail_and_mark_fractions_stripped(self):
        s = extract_answer("(A) 42 sq units (Section - B)")
        assert s.kind == "letter"
        assert not s.answer_text.lower().endswith("(section - b)")

    def test_short_garbage_skipped(self):
        s = extract_answer("I.")
        assert s.kind == "skip"

    def test_ans_label_row_skipped(self):
        # "ANS- <prev answer> <next question>" rows misattribute on
        # self-alignment; they must be skipped entirely
        s = extract_answer("ANS- D. Assam Theme - 8 Page 210 Which coins "
                           "were prevalent A. Gold B. Copper")
        assert s.kind == "skip" and s.skip_reason == "ans_label_row"
        # double-dash form too
        s2 = extract_answer("Ans--The Virupaksha temple was built over "
                            "centuries. While inscriptions suggest that the "
                            "earliest shrine dated to the ninth century.")
        assert s2.kind == "skip" and s2.skip_reason == "ans_label_row"
        # a row whose question comes first is fine
        segs = extract_segments("The state of exhaustion is known as_____. "
                                "Ans: c. Burnout")
        assert segs[0].stub and "burnout" in segs[0].answer_text.lower()

    def test_mark_dense_rows_not_usable_targets(self):
        note = ("1/2 mark for correct loops 1/2 for correct if statement "
                "1/2 mark for correctly incrementing counts 1/2 mark for "
                "displaying the correct output)")
        assert not usable_target(note)
        assert usable_target("Explain the mechanism of the reaction given "
                             "below with the help of suitable examples.")


# --------------------------------------------------------------------------- #
# Option parsing (question side)
# --------------------------------------------------------------------------- #

class TestParseOptions:
    INLINE = ("If a= 22 x 3x, b= 22 x 3 x 5, c= 22 x 3 x 7 and LCM(a, b, c)"
              " = 3780, then x is equal to "
              "(A) 1                 (B) 2                   (C) 3 (D) 0")

    def test_inline_options(self):
        stem, opts = parse_options(self.INLINE)
        assert opts == {"A": "1", "B": "2", "C": "3", "D": "0"}
        assert stem.startswith("If a=")
        assert "equal to" in stem and "(A)" not in stem

    def test_lowercase_letters(self):
        stem, opts = parse_options("The SI unit of force is "
                                   "(a) newton (b) joule (c) watt (d) pascal")
        assert opts["A"] == "newton" and opts["D"] == "pascal"
        assert "SI unit" in stem

    def test_no_options(self):
        stem, opts = parse_options("Prove that the diagonals of a rhombus "
                                   "bisect each other at right angles.")
        assert opts == {} and "rhombus" in stem


# --------------------------------------------------------------------------- #
# Alignment
# --------------------------------------------------------------------------- #

class TestAlignment:
    def _setup(self):
        q1 = _qrow(1, 100, 9, "If a= 22 and LCM(a,b,c)=3780 then x equals "
                              "(A) 1 (B) 2 (C) 3 (D) 0")
        q2 = _qrow(2, 100, 10, "The shortest distance of the point (2,3) from "
                               "y-axis is (A) 2 (B) 3 (C) 5 (D) 1")
        q3 = _qrow(3, 101, 30, "A quadrilateral ABCD is drawn to circumscribe "
                               "a circle. If BC=7cm, CD=4cm and AD=3cm, then "
                               "the length of AB is (A) 3cm (B) 4cm (C) 6cm (D) 7cm")
        return _index([q1, q2, q3])

    def test_hash_alignment_across_docs(self):
        idx = self._setup()
        seg = extract_answer("P(Vidhi drives) = 3/8 favourable outcomes HHT")
        # unrelated text must NOT align
        row, method = align_by_fingerprint(seg, idx, _msrow(9, 200, 30, ""))
        assert row is None and method == ""

    def test_numeric_signature_alignment(self):
        # same numbers, different wording -> numeric route
        q = _qrow(4, 100, 12, "A sum of Rs 8000 at 5 percent per year gives "
                              "simple interest of how much in 2 years?")
        idx = _index([q])
        seg = extract_answer("SI = Rs 8000 at 5 percent for 2 years = Rs 800")
        row, method = align_by_fingerprint(seg, idx, _msrow(9, 200, 12, ""))
        assert method in ("numeric", "hash", "fuzzy")
        assert row is not None and row.qid == 4

    def test_prefix_stub_alignment(self):
        q = _qrow(5, 300, 3, "An electric dipole of moment p is placed in a "
                             "uniform electric field E. Find the work done "
                             "when the dipole is rotated.", subject="physics")
        idx = _index([q])
        segs = extract_segments("An electric______________________ "
                                "\nAns. 2 (ii) \nW = pE (cos1 - cos2)")
        assert segs[0].stub
        row, method = align_by_fingerprint(segs[0], idx, _msrow(9, 400, 3,
                                                                subject="physics"))
        assert method == "prefix"
        assert row is not None and row.qid == 5

    def test_fuzzy_alignment_same_subject_only(self):
        q = _qrow(6, 500, 8, "Explain how bleaching action of chlorine happens "
                             "with example reactions in water treatment.")
        idx = _index([q])
        src = _msrow(9, 600, 8, subject="chemistry")
        seg = extract_answer("Chlorine bleaches by oxidation; Cl2 + H2O gives "
                             "HOCl which oxidises the dye molecules.")
        row, method = align_by_fingerprint(seg, idx, src)
        assert row is None  # same numbers of shared words too low -> no align

    def test_suspect_detection(self):
        # overlapping content words -> not suspect
        assert not is_suspect("A quadrilateral ABCD is drawn to circumscribe a circle",
                              "quadrilateral circle circumscribe sides given")
        # zero shared content words -> suspect
        assert is_suspect("A quadrilateral ABCD is drawn",
                          "compound interest rate annually principal")

    def test_validate_letter_key_option_match(self):
        target = _qrow(7, 100, 12, "A quadrilateral ABCD is circumscribed "
                                   "about a circle. If BC=7cm, CD=4cm and "
                                   "AD=3cm then AB is "
                                   "(A) 3cm (B) 4cm (C) 6cm (D) 7cm")
        seg = extract_answer("(C) 6cm AB+CD=AD+BC AB+4=3+7 AB=6cm")
        payload = validate_key(seg, target)
        assert payload is not None
        assert payload["letter"] == "C"
        assert payload["answer_text"] == "6cm"  # replaced by option text
        assert payload["tier"] == "high"

    def test_validate_rejects_wrong_letter(self):
        target = _qrow(8, 100, 12, "The unit of power is "
                                   "(A) watt (B) joule (C) newton (D) pascal")
        seg = extract_answer("(C) kilowatt hour meter reading")
        assert validate_key(seg, target) is None

    def test_validate_rejects_zero_overlap_alignments(self):
        target = _qrow(9, 100, 12, "Photosynthesis in green plants requires "
                                   "chlorophyll sunlight water and carbon dioxide")
        seg = extract_answer("The interest compounded yearly comes to 2662 rupees.")
        assert validate_key(seg, target) is None

    def test_validate_roman_requires_parsed_options(self):
        target = _qrow(10, 420, 6, "Which statement is true about the electric "
                                   "field over a Gaussian surface? "
                                   "(i) uniform (ii) discontinuous (iii) zero "
                                   "(iv) continuous and uniform")
        segs = extract_segments("Ans.6. (iv) All other statements except (iv) "
                                "are incorrect")
        payload = validate_key(segs[0], target)
        assert payload is not None and payload["letter"] == "D"
        assert payload["answer_text"] == "continuous and uniform"

    def test_validate_roman_rejected_without_options(self):
        target = _qrow(11, 420, 7, "Define electric flux through a surface.")
        segs = extract_segments("Ans.7. (iii) flux is zero")
        assert segs[0].roman == "iii"
        assert validate_key(segs[0], target) is None

    def test_parse_options_roman(self):
        stem, opts = parse_options("Which statement is true? "
                                   "(i) uniform (ii) zero (iii) discontinuous "
                                   "(iv) continuous and uniform")
        assert opts == {"A": "uniform", "B": "zero", "C": "discontinuous",
                        "D": "continuous and uniform"}
        assert "Which statement is true?" in stem


class TestOrdinalOffset:
    def _targets(self):
        rows = {}
        data = [
            (9, "If LCM(a,b,c)=3780 then x equals (A) 1 (B) 2 (C) 3 (D) 0"),
            (10, "The shortest distance of point (2,3) from y-axis is "
                 "(A) 2 (B) 3 (C) 5 (D) 1"),
            (11, "Probability of getting sum 8 with two dice is "
                 "(A) 5/36 (B) 1/9 (C) 31/36 (D) none"),
        ]
        for i, (qno, text) in enumerate(data):
            r = _qrow(20 + i, 100, qno, text)
            rows[qno] = r
        return rows

    def test_offset_found_and_scored(self):
        tgt = self._targets()
        # MS rows numbered by printed number = stored qno - 1; leads are
        # pre-normalized alnum strings (as the miner builds them)
        ms_rows = [(8, "C", mk.norm_lead("3")), (9, "A", mk.norm_lead("2")),
                   (10, "A", mk.norm_lead("5/36"))]
        best = best_offset(ms_rows, tgt)
        assert best == 1
        assert score_offset(ms_rows, tgt, 1) >= 5

    def test_offset_none_without_signal(self):
        tgt = self._targets()
        ms_rows = [(1, "B", "nothing like the options here at all")]
        assert best_offset(ms_rows, tgt) is None

    def test_option_text_match(self):
        assert option_text_match("6cm AB+CD", "6cm")
        assert option_text_match("2 As shortest", "2")
        assert not option_text_match("6cm AB+CD", "7cm")
        assert not option_text_match("", "6cm")


# --------------------------------------------------------------------------- #
# Idempotence / progress planning
# --------------------------------------------------------------------------- #

class TestProgressIdempotence:
    def test_plan_docs_skips_done(self):
        all_ids = [3, 1, 2, 5, 4]
        pending = plan_docs(all_ids, [1, 2])
        assert pending == [3, 5, 4]

    def test_plan_docs_rerun_is_empty(self):
        all_ids = [3, 1, 2, 5, 4]
        pending = plan_docs(all_ids, [])
        done = progress_after([], pending)
        assert plan_docs(all_ids, done) == []

    def test_progress_after_is_stable_and_deduped(self):
        once = progress_after([1, 2], [2, 3])
        twice = progress_after(once, [2, 3])
        assert once == twice == [1, 2, 3]

    def test_extraction_is_deterministic(self):
        row = "(C) 3 LCM(a, b, c) = 3780 then x = 3 (Section - B)"
        first = extract_segments(row)
        second = extract_segments(row)
        assert [(s.kind, s.letter, s.answer_text) for s in first] == \
            [(s.kind, s.letter, s.answer_text) for s in second]


# --------------------------------------------------------------------------- #
# Misc helpers
# --------------------------------------------------------------------------- #

class TestHelpers:
    def test_session_ok(self):
        assert session_ok("2023-24", "2024-25")
        assert session_ok("2020-2021", "2019-20")
        assert not session_ok("2020-21", "2024-25")
        assert session_ok("unknown", "unknown")
        assert not session_ok("unknown", "2024-25")

    def test_boilerplate(self):
        assert is_boilerplate("This question paper contains 38 questions")
        assert is_boilerplate("In Section A, Question numbers 1-18 are MCQs")
        assert not is_boilerplate("(A) Gathers in waist")
        assert not usable_target("Click Here to download")
        assert usable_target("Find the area of the circle of radius 7 cm")

    def test_answer_lead_cap(self):
        assert answer_lead("6cm AB+CD=AD+BC", 4) == "6cm "

    def test_word_overlap_bounds(self):
        assert word_overlap("", "abc") == 0.0
        assert word_overlap("alpha beta", "beta gamma") > 0
