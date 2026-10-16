"""test_slop_gate.py -- unit tests for the antislop scrub gate (ICE 1.3).

Run:  cd D:\\platform\\deploy\\backend
      python -m pytest tests/test_slop_gate.py -q
  or  python -m unittest backend.tests.test_slop_gate -v

Contract under test (BUILD_ORDER 1.3):
  - 20 known-slop strings are FLAGGED (antislop lists + platform ban list)
  - 20 clean student-facing strings pass with zero flags
  - the gate is wired into answer_pipeline.answer() (single choke point)
  - the gate fails open (an internal error never breaks the answer path)
"""

import sys
import unittest
from unittest import mock

sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

from backend.its.solver.slop_gate import gate_text, gate_result  # noqa: E402
from backend.its.solver.answer_pipeline import (  # noqa: E402
    AuditTrail, PipelineResult, VERIFIED)

# --------------------------------------------------------------------------- #
# 20 known-slop strings: real antislop list entries + platform ban patterns
# --------------------------------------------------------------------------- #

SLOP_EXAMPLES = [
    # antislop phrases (sampler list, verbatim)
    "She took a deep breath and began the derivation.",
    "His voice barely above a whisper, he stated the theorem.",
    "I couldn't help but feel that the answer was near.",
    "Casting long shadows, the lamppost lit the street we measured.",
    "She couldn't shake the feeling that the answer was wrong.",
    "A testament to their resilience, the students passed.",
    "It sent shivers down her spine.",
    "The air was thick with anticipation in the lab.",
    # antislop words (verbatim list entries)
    "Elara nodded at the result and wrote it down.",
    "His gaze drifted across the graph as he solved it.",
    "She whispered the formula under her breath.",
    "The candlelight cast a faint glow over the ledger.",  # glow + faint
    "He stared at the numbers, trembling at the result.",
    # platform ban list: machine-language + voice
    "Needs variable binding (Lane C) or use guided practice.",
    "The student should substitute the values before solving.",
    r"In \triangle ABC, apply the sine rule to find angle B.",
    r"The area is \[A = \pi r^2\] for the given circle.",
    "Full derivation at c10_phy_cbse_04_010 in the corpus.",
    "The limit evaluates to NaN for this input.",
    "The computed value is 3.14159265358979311600 exactly.",
    "Serialise the output id as 123456789012345 for the audit row.",
]

# --------------------------------------------------------------------------- #
# 20 clean student-facing strings (educational prose; zero expected flags)
# --------------------------------------------------------------------------- #

CLEAN_EXAMPLES = [
    "To find the area of a rectangle, multiply its length by its breadth.",
    "Divide both sides by 4 to isolate x.",
    "Water boils at 100 degrees Celsius at sea level.",
    "Mitochondria are the site of aerobic respiration in the cell.",
    "Photosynthesis converts carbon dioxide and water into glucose.",
    "Substitute the value a = 5 into the equation.",
    "The HCF of 12 and 18 is 6.",
    "A parallelogram has two pairs of parallel sides.",
    "Ionic bonds form when electrons transfer from a metal to a non-metal.",
    "The Revolt of 1857 began at Meerut.",
    "Demand curves slope downward because of the law of demand.",
    "Add the coefficients of like terms to simplify the expression.",
    "Ohm's law states that current equals voltage divided by resistance.",
    "The SI unit of force is the newton.",
    "Factorise the quadratic by finding two numbers with product 6 and sum 5.",
    "Rain forms when water vapour condenses high in the atmosphere.",
    "Mark the midpoint of the line segment with your compass.",
    "The value of g on Earth is approximately 9.8 metres per second squared.",
    "Ledger accounts are balanced at the end of the financial year.",
    "Neutralisation of an acid with a base produces salt and water.",
]


def _has_signal(flags):
    """True when any flag is a real slop/ban hit (degradation notes ignored)."""
    return any(f["kind"] != "gate_lists_degraded" for f in flags)


class TestSlopCaught(unittest.TestCase):
    def test_twenty_slop_examples_flagged(self):
        missed = []
        for s in SLOP_EXAMPLES:
            _clean, flags = gate_text(s)
            if not _has_signal(flags):
                missed.append(s)
        self.assertEqual(missed, [], f"slop examples that slipped through: {missed}")

    def test_each_slop_example_flags_individually(self):
        for i, s in enumerate(SLOP_EXAMPLES):
            _clean, flags = gate_text(s)
            self.assertTrue(_has_signal(flags), f"example {i} unflagged: {s}")


class TestCleanPasses(unittest.TestCase):
    def test_twenty_clean_examples_pass(self):
        false_positives = {}
        for s in CLEAN_EXAMPLES:
            _clean, flags = gate_text(s)
            real = [f for f in flags if f["kind"] != "gate_lists_degraded"]
            if real:
                false_positives[s] = real
        self.assertEqual(false_positives, {},
                         f"clean examples wrongly flagged: {false_positives}")

    def test_clean_text_unchanged(self):
        for s in CLEAN_EXAMPLES:
            clean, _flags = gate_text(s)
            self.assertEqual(clean, s)


class TestRewrites(unittest.TestCase):
    def test_ban_items_rewritten(self):
        # 2026-10-04 contract: normalize_student_text runs FIRST (whole-
        # sentence recasts + NaN -> em dash + "the student" -> "you"), the
        # ban scan below is the safety net; node ids still flag ban_node_id.
        clean, flags = gate_text(
            "The student got NaN for c10_bio_cbse_01_001 (Lane C).")
        kinds = {f["kind"] for f in flags}
        self.assertIn("ban_node_id", kinds)
        self.assertNotIn("The student", clean)
        self.assertNotIn("NaN", clean)
        self.assertNotIn("c10_bio_cbse_01_001", clean)
        self.assertNotIn("Lane C", clean)
        self.assertTrue(clean.startswith("You got"))

    def test_floats_rounded(self):
        clean, flags = gate_text("The value is 2.71828182845904523536 exactly.")
        self.assertIn("2.7183", clean)
        self.assertNotEqual(clean, "The value is 2.71828182845904523536 exactly.")
        self.assertTrue(any(f["rewritten"] for f in flags))

    def test_internal_audience_flags_only(self):
        s = "The student got NaN."
        clean, flags = gate_text(s, audience="internal")
        self.assertEqual(clean, s)  # no rewrite for internal audience
        self.assertTrue(_has_signal(flags))


class TestWiring(unittest.TestCase):
    """The gate must sit on answer_pipeline.answer()'s output path."""

    def _dirty_result(self):
        return PipelineResult(
            label=VERIFIED, answer="The student got NaN.",
            numeric=None, steps=["The student took a deep breath."],
            audit=AuditTrail(lane="A"))

    def test_answer_applies_gate(self):
        import backend.its.solver.answer_pipeline as ap
        dirty = self._dirty_result()
        with mock.patch.object(ap, "_answer_impl", return_value=dirty), \
                mock.patch.object(ap, "_queue_miss"):
            out = ap.answer("test question")
        self.assertEqual(out.answer, "You got —.")  # NaN -> em dash
        self.assertEqual(out.steps, ["You took a deep breath."])
        self.assertTrue(getattr(out.audit, "slop_flags", None))

    def test_clean_answer_records_gate_pass(self):
        import backend.its.solver.answer_pipeline as ap
        clean_res = PipelineResult(
            label=VERIFIED, answer="Divide both sides by 4.",
            numeric=None, steps=[], audit=AuditTrail(lane="A"))
        with mock.patch.object(ap, "_answer_impl", return_value=clean_res), \
                mock.patch.object(ap, "_queue_miss"):
            out = ap.answer("test question")
        self.assertIn("slop_gate", out.audit.gates_passed)

    def test_gate_failure_fails_open(self):
        import backend.its.solver.answer_pipeline as ap
        import backend.its.solver.slop_gate as sg
        dirty = self._dirty_result()
        with mock.patch.object(ap, "_answer_impl", return_value=dirty), \
                mock.patch.object(ap, "_queue_miss"), \
                mock.patch.object(sg, "gate_result",
                                  side_effect=RuntimeError("gate down")):
            out = ap.answer("test question")
        # original strings survive untouched -- the gate never blocks serving
        self.assertEqual(out.answer, "The student got NaN.")
        self.assertEqual(out.steps, ["The student took a deep breath."])

    def test_gate_result_never_raises(self):
        class Boom:
            audit = None

            @property
            def answer(self):
                raise RuntimeError("boom")
        out = gate_result(Boom())
        self.assertIsInstance(out, Boom)  # returned untouched


if __name__ == "__main__":
    unittest.main(verbosity=2)
