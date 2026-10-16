"""test_release_calibration.py -- FLYWHEEL-L4 gate contract tests.

Covers the release_calibration service contract exactly as shipped:

  1. MISSING FILE      -> default-allow (is_release_allowed True for
                          everything; gated_families empty)
  2. CORRUPT FILE      -> default-allow
  3. FLOOR LOGIC       -> resistance >= floor allowed; < floor gated;
                          probes < min_probes allowed (insufficient
                          evidence); _meta floor/min_probes override the
                          defaults; the compact numeric entry form works
  4. GATED SUPPRESSION -> withhold_if_gated downgrades a MATCHED
                          ModelResult of a gated family to the
                          independent_verifier withholding convention
                          (matched=False, answers None, STEPS KEPT,
                          honest note) and leaves everything else --
                          unknown families, unmatched results, infra
                          exceptions -- untouched
  5. WIRING            -> modeling_layer.model_problem routes through
                          withhold_if_gated: with a gate file present the
                          gated family's verified answer is withheld
                          (falls through to guided) while an ungated
                          family still matches; with the file absent the
                          sweep is byte-for-byte the pre-L4 behavior.

The gate file location is overridden through RELEASE_CALIBRATION_PATH so
the real calibration never interferes with these tests.  Everything runs
in-process; no docker, no network.
"""
import json
import os
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, r"D:\platform\deploy")
import backend  # noqa: F401,E402  (singleton preload, deploy tree assert)

_DEPLOY_MARK = Path(r"D:\platform\deploy\backend")


class _SandboxBase(unittest.TestCase):
    """Each test gets its own calibration file + fresh cache."""

    def setUp(self):
        import importlib
        self._rc = importlib.import_module(
            "backend.services.release_calibration")
        self._tmp = tempfile.TemporaryDirectory()
        self.cal = Path(self._tmp.name) / "release_calibration.json"
        # the module resolves its path at import time; point the global
        # at the sandbox explicitly (env var alone would be ignored by
        # an already-imported module)
        self._orig_path = self._rc._calibration_path
        self._rc._calibration_path = str(self.cal)
        os.environ["RELEASE_CALIBRATION_PATH"] = str(self.cal)
        self._rc._cache = None                  # force a reload next call

    def tearDown(self):
        os.environ.pop("RELEASE_CALIBRATION_PATH", None)
        self._rc._calibration_path = self._orig_path
        self._rc._cache = None
        self._tmp.cleanup()

    def write_cal(self, doc):
        self.cal.write_text(json.dumps(doc), encoding="utf-8")
        self._rc._cache = None


class TestMissingFileDefaultAllow(_SandboxBase):
    def test_no_file_every_family_allowed(self):
        self.assertTrue(self._rc.is_release_allowed("ANY_FAMILY_XYZ"))
        self.assertTrue(self._rc.is_release_allowed("KINEMATICS_V_U_AT"))
        self.assertTrue(self._rc.is_release_allowed(""))
        self.assertEqual(self._rc.gated_families(), [])
        self.assertFalse(self._rc.status()["loaded"])

    def test_corrupt_file_default_allow(self):
        self.cal.write_text("{not json at all", encoding="utf-8")
        self._rc._cache = None
        self.assertTrue(self._rc.is_release_allowed("ANY_FAMILY_XYZ"))
        self.assertEqual(self._rc.gated_families(), [])

    def test_non_dict_file_default_allow(self):
        self.write_cal([1, 2, 3])
        self.assertTrue(self._rc.is_release_allowed("ANY_FAMILY_XYZ"))


class TestFloorLogic(_SandboxBase):
    def _cal(self, resistance, probes, floor=None, min_probes=None):
        meta = {}
        if floor is not None:
            meta["floor"] = floor
        if min_probes is not None:
            meta["min_probes"] = min_probes
        doc = {"_meta": meta,
               "families": {"WEAK_FAMILY": {"resistance": resistance,
                                            "probes": probes}}}
        self.write_cal(doc)

    def test_below_floor_with_enough_probes_gates(self):
        self._cal(0.45, 10)
        self.assertFalse(self._rc.is_release_allowed("WEAK_FAMILY"))
        self.assertEqual(self._rc.gated_families(), ["WEAK_FAMILY"])

    def test_at_floor_allowed(self):
        self._cal(0.70, 10)
        self.assertTrue(self._rc.is_release_allowed("WEAK_FAMILY"))

    def test_above_floor_allowed(self):
        self._cal(0.93, 10)
        self.assertTrue(self._rc.is_release_allowed("WEAK_FAMILY"))

    def test_insufficient_probes_allowed(self):
        self._cal(0.10, 3)                       # < default min_probes 4
        self.assertTrue(self._rc.is_release_allowed("WEAK_FAMILY"))
        self.assertEqual(self._rc.gated_families(), [])

    def test_min_probes_override(self):
        self._cal(0.10, 3, min_probes=2)
        self.assertFalse(self._rc.is_release_allowed("WEAK_FAMILY"))

    def test_floor_override(self):
        self._cal(0.80, 10, floor=0.9)
        self.assertFalse(self._rc.is_release_allowed("WEAK_FAMILY"))
        self._cal(0.95, 10, floor=0.9)
        self.assertTrue(self._rc.is_release_allowed("WEAK_FAMILY"))

    def test_compact_numeric_entry(self):
        self.write_cal({"families": {"WEAK_FAMILY": 0.2}})
        # compact form carries no probe count -> insufficient evidence
        self.assertTrue(self._rc.is_release_allowed("WEAK_FAMILY"))
        self.write_cal({"_meta": {"min_probes": 0},
                        "families": {"WEAK_FAMILY": 0.2}})
        self.assertFalse(self._rc.is_release_allowed("WEAK_FAMILY"))

    def test_unknown_family_allowed(self):
        self._cal(0.10, 10)
        self.assertTrue(self._rc.is_release_allowed("UNMEASURED_FAMILY"))

    def test_garbage_meta_values_fall_back_to_defaults(self):
        self.write_cal({"_meta": {"floor": "banana", "min_probes": None},
                        "families": {"WEAK_FAMILY": {"resistance": 0.1,
                                                     "probes": 9}}})
        self.assertFalse(self._rc.is_release_allowed("WEAK_FAMILY"))


class TestGatedSuppression(_SandboxBase):
    def _result(self):
        from backend.its.solver.modeling_layer import ModelResult
        return ModelResult(
            structure="WEAK_FAMILY", matched=True, confidence=0.95,
            quantities={"v": 42.0}, governing_equation="v = 42",
            final_answer="42", numeric_answer=42.0,
            steps=["Method: the rule", "Substitution: v = 42",
                   "Computation: 42", "Verification: holds",
                   "Interpretation: v is 42"], note="")

    def test_gated_family_withheld_but_teaches(self):
        self.write_cal({"families": {"WEAK_FAMILY": {"resistance": 0.3,
                                                     "probes": 9}}})
        out = self._rc.withhold_if_gated(self._result())
        self.assertFalse(out.matched)
        self.assertIsNone(out.final_answer)
        self.assertIsNone(out.numeric_answer)
        self.assertTrue(len(out.steps) >= 3)      # teaching steps survive
        self.assertIn("release calibration", out.note)
        self.assertIn("WEAK_FAMILY", out.note)

    def test_allowed_family_passes_through_untouched(self):
        self.write_cal({"families": {"SOME_OTHER_FAMILY": {
            "resistance": 0.1, "probes": 9}}})
        r = self._result()
        out = self._rc.withhold_if_gated(r)
        self.assertIs(out, r)                     # same object, no copy

    def test_unmatched_result_untouched(self):
        from backend.its.solver.modeling_layer import ModelResult
        self.write_cal({"families": {"WEAK_FAMILY": {"resistance": 0.3,
                                                     "probes": 9}}})
        miss = ModelResult(structure="WEAK_FAMILY", matched=False,
                           confidence=0.0, quantities={},
                           governing_equation="", note="no match")
        self.assertIs(self._rc.withhold_if_gated(miss), miss)

    def test_no_file_no_suppression(self):
        r = self._result()
        self.assertIs(self._rc.withhold_if_gated(r), r)


class TestModelProblemWiring(_SandboxBase):
    """model_problem inherits the gate (additive choke point)."""

    # a question the registry sweep answers deterministically
    Q = ("A car starts with a velocity of 5 m/s and accelerates "
         "uniformly at 2 m/s^2 for 10 s. Find its final velocity.")

    def _fired(self):
        from backend.its.solver.modeling_layer import model_problem
        r = model_problem(self.Q)
        self.assertTrue(r.matched, "sanity: sweep must fire on the probe")
        return r

    def test_gate_off_unchanged(self):
        r = self._fired()
        self.assertTrue(r.matched)
        self.assertIsNotNone(r.numeric_answer)

    def test_gate_on_withholds_fired_family_only(self):
        fired = self._fired()
        self.write_cal({"families": {fired.structure: {
            "resistance": 0.2, "probes": 9}}})
        from backend.its.solver.modeling_layer import model_problem
        r = model_problem(self.Q)
        self.assertFalse(r.matched)
        self.assertIsNone(r.numeric_answer)
        self.assertTrue(r.steps)                  # still teaches
        # a different family is untouched by WEAK_FAMILY's gate
        self.write_cal({"families": {"SOME_OTHER_FAMILY": {
            "resistance": 0.1, "probes": 9}}})
        r2 = model_problem(self.Q)
        self.assertTrue(r2.matched)

    def test_gate_infra_failure_never_blocks_solve(self):
        # a calibration file that makes withhold_if_gated raise must not
        # break the sweep (fail-safe contract)
        self.write_cal({"families": {"WEAK_FAMILY": []}})
        r = self._fired()
        self.assertTrue(r.matched)


if __name__ == "__main__":
    unittest.main(verbosity=2)
