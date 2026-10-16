"""test_release_calibration.py -- FLYWHEEL-L4 per-family release gates.

Covers, by contract:
  * floor logic: resistance at/above floor releases, below floors;
    partials count 0.5; families without enough probed evidence never
    gate (default-allow on thin data);
  * missing-file / corrupt-file default-allow (ZERO behavior change
    without a calibration);
  * unknown families default-allow;
  * gated suppression END-TO-END at the promotion boundary: a gated
    family's ModelResult loses final/numeric answers, keeps its steps
    (still teaches), and the pipeline serves GUIDED_PRACTICE instead of
    a verified answer; the same question releases again once the
    family's resistance recovers (calibration updated).

Run: python D:/platform/deploy/backend/its/tests/test_release_calibration.py
"""
import json
import os
import sys
import tempfile

sys.path.insert(0, r"D:\platform\deploy")
os.environ.setdefault("CBSE_DATA_DIR", os.path.join(
    tempfile.gettempdir(), "flywheel_l4_test_scratch"))
os.makedirs(os.environ["CBSE_DATA_DIR"], exist_ok=True)
import backend  # noqa: E402,F401
assert backend.__file__.startswith(r"D:\platform\deploy"), backend.__file__

from backend.services import release_calibration as rc  # noqa: E402
from backend.its.solver.modeling_layer import ModelResult, model_problem  # noqa: E402

_OHM_SEED = ("Find the current when the voltage is 12 V and the "
             "resistance is 4 ohm.")
_GP_SEED = ("Find the sum of the infinite GP 8 + 4 + 2 + ... "
            "with common ratio 0.5.")

_passed = 0
_failed = 0


def _check(name: str, cond: bool, extra: str = "") -> None:
    global _passed, _failed
    if cond:
        _passed += 1
        print(f"  PASS {name}")
    else:
        _failed += 1
        print(f"  FAIL {name} {extra}")


class _Cal:
    """Temp calibration file swap with automatic restore."""

    def __enter__(self):
        self.fd, self.path = tempfile.mkstemp(suffix=".json",
                                              prefix="relcal_")
        os.close(self.fd)
        self.orig_path = rc.calibration_path()
        rc._calibration_path = self.path
        rc.reload()
        return self

    def write(self, families: dict, floor=None, min_probes=None) -> None:
        meta = {"generated": "test"}
        if floor is not None:
            meta[rc._META_FLOOR_KEY] = floor
        if min_probes is not None:
            meta[rc._META_MIN_PROBES_KEY] = min_probes
        with open(self.path, "w", encoding="utf-8") as fh:
            json.dump({"_meta": meta, "families": families}, fh)
        rc.reload()

    def __exit__(self, *exc):
        rc._calibration_path = self.orig_path
        rc.reload()
        try:
            os.unlink(self.path)
        except OSError:
            pass
        return False


# --------------------------------------------------------------------------- #
# 1. missing / corrupt calibration -> default-allow
# --------------------------------------------------------------------------- #
def test_missing_file_default_allow():
    with _Cal() as cal:
        if os.path.exists(cal.path):
            os.unlink(cal.path)
        rc.reload()
        _check("missing file: unknown family allowed",
               rc.is_release_allowed("SOME_NEVER_CALIBRATED_FAMILY"))
        _check("missing file: gated list empty", rc.gated_families() == [])


def test_corrupt_file_default_allow():
    with _Cal() as cal:
        with open(cal.path, "w", encoding="utf-8") as fh:
            fh.write("{ this is not json !!!")
        rc.reload()
        _check("corrupt file: family allowed",
               rc.is_release_allowed("MEDIAN"))
        _check("corrupt file: status not loaded", rc.status()["loaded"] is False)


# --------------------------------------------------------------------------- #
# 2. floor logic (+ partials 0.5, thin evidence never gates)
# --------------------------------------------------------------------------- #
def test_floor_logic():
    with _Cal() as cal:
        # 3F/1P out of 8 graded: (4 + 0.5) / 8 = 0.5625 < 0.70 -> gated
        cal.write({"WEAK": {"resistance": 0.5625, "probes": 8, "fails": 3,
                            "partials": 1, "passes": 4}})
        _check("weak family gated", not rc.is_release_allowed("WEAK"))
        _check("weak family in gated list",
               rc.gated_families() == ["WEAK"])

        # exactly at the floor -> released (floor is inclusive)
        cal.write({"EDGE": {"resistance": 0.70, "probes": 10, "fails": 3,
                            "partials": 0, "passes": 7}})
        _check("resistance at floor releases", rc.is_release_allowed("EDGE"))

        # strong family releases
        cal.write({"STRONG": {"resistance": 0.95, "probes": 20, "fails": 1,
                              "partials": 0, "passes": 19}})
        _check("strong family releases", rc.is_release_allowed("STRONG"))

        # thin evidence: below floor but < min_probes -> default-allow
        cal.write({"THIN": {"resistance": 0.25, "probes": 3, "fails": 3,
                            "partials": 0, "passes": 1}})
        _check("thin evidence never gates", rc.is_release_allowed("THIN"))
        _check("thin evidence not in gated list", rc.gated_families() == [])

        # compact numeric form (resistance only) still gates on evidence
        cal.write({"COMPACT": 0.5})
        _check("compact entry without probes defaults allow",
               rc.is_release_allowed("COMPACT"))


# --------------------------------------------------------------------------- #
# 3. unknown families default-allow even when others are gated
# --------------------------------------------------------------------------- #
def test_unknown_family_allow():
    with _Cal() as cal:
        cal.write({"WEAK": {"resistance": 0.4, "probes": 9, "fails": 5,
                            "partials": 1, "passes": 3}})
        _check("gated family really gated", not rc.is_release_allowed("WEAK"))
        _check("unknown sibling family allowed",
               rc.is_release_allowed("UNRELATED_FAMILY"))


# --------------------------------------------------------------------------- #
# 4. withholding at the ModelResult boundary (steps kept, answers gone)
# --------------------------------------------------------------------------- #
def _fake_result(fid: str) -> ModelResult:
    return ModelResult(
        structure=fid, matched=True, confidence=0.95,
        quantities={"a": 12.0}, governing_equation=fid,
        final_answer="3", numeric_answer=3.0,
        steps=["Method: V=IR", "Given: V=12, R=4", "I = 12/4 = 3"])


def test_withhold_if_gated_keeps_teaching():
    with _Cal() as cal:
        cal.write({"OHM_CURRENT": {"resistance": 0.5, "probes": 6,
                                   "fails": 3, "partials": 0, "passes": 3}})
        gated_res = _fake_result("OHM_CURRENT")
        out = rc.withhold_if_gated(gated_res)
        _check("gated: unmatched", out.matched is False)
        _check("gated: final answer suppressed", out.final_answer is None)
        _check("gated: numeric answer suppressed", out.numeric_answer is None)
        _check("gated: steps kept (still teaches)",
               len(out.steps) == 3 and "12/4" in out.steps[-1])
        _check("gated: honest note",
               "withheld" in (out.note or "")
               and "release calibration" in (out.note or ""))

        allowed_res = _fake_result("MEDIAN")
        _check("allowed family returned unchanged",
               rc.withhold_if_gated(allowed_res) is allowed_res)

        # resistance recovery: update the calibration -> releases again
        cal.write({"OHM_CURRENT": {"resistance": 0.92, "probes": 12,
                                   "fails": 1, "partials": 0, "passes": 11}})
        recovered = rc.withhold_if_gated(_fake_result("OHM_CURRENT"))
        _check("recovered family releases again", recovered.matched is True)


# --------------------------------------------------------------------------- #
# 5. promotion path, end to end through model_problem (no calibration)
# --------------------------------------------------------------------------- #
def test_no_calibration_zero_behavior_change():
    with _Cal() as cal:
        if os.path.exists(cal.path):
            os.unlink(cal.path)
        rc.reload()
        res = model_problem(_OHM_SEED)
        _check("no calibration: family still matched",
               res.matched and bool(res.structure),
               f"(structure={res.structure!r} matched={res.matched})")
        _check("no calibration: answer intact", res.numeric_answer == 3.0,
               f"(numeric={res.numeric_answer!r})")


# --------------------------------------------------------------------------- #
# 6. promotion path, end to end: gated family -> guided, not verified
# --------------------------------------------------------------------------- #
def test_gated_family_serves_guided_not_verified():
    with _Cal() as cal:
        res = model_problem(_OHM_SEED)
        # gate the family routing ACTUALLY fires (ids evolve; never
        # hardcode one -- the same lesson the deploy/backend/tests copy
        # learned first)
        _check("ohm seed reaches a registered family",
               res.matched and bool(res.structure),
               f"(structure={res.structure!r})")
        fired = res.structure
        cal.write({fired: {"resistance": 0.45, "probes": 8,
                           "fails": 4, "partials": 1, "passes": 3}})
        res2 = model_problem(_OHM_SEED)
        _check("gated: model_problem downgrades",
               res2.matched is False and res2.numeric_answer is None
               and res2.final_answer is None)

        from backend.its.solver.answer_pipeline import answer
        served = answer(_OHM_SEED)
        verified = served.label in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS",
                                    "VERIFIED_OFFICIAL")
        _check("gated: pipeline serves NO verified answer", not verified,
               f"(label={served.label!r} answer={served.answer!r})")
        _check("gated: pipeline serves the guided tier",
               served.label == "GUIDED_PRACTICE", f"(label={served.label!r})")

        # recovery: same question releases after recalibration
        cal.write({fired: {"resistance": 0.9, "probes": 10,
                           "fails": 1, "partials": 0, "passes": 9}})
        served2 = answer(_OHM_SEED)
        _check("recovered: pipeline verifies again",
               served2.label in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS"),
               f"(label={served2.label!r})")


if __name__ == "__main__":
    for fn in [test_missing_file_default_allow,
               test_corrupt_file_default_allow,
               test_floor_logic,
               test_unknown_family_allow,
               test_withhold_if_gated_keeps_teaching,
               test_no_calibration_zero_behavior_change,
               test_gated_family_serves_guided_not_verified]:
        print(fn.__name__)
        try:
            fn()
        except Exception as exc:
            _failed += 1
            import traceback
            print(f"  ERROR {exc!r}")
            traceback.print_exc()
    print(f"\n{_passed} passed, {_failed} failed")
    sys.exit(1 if _failed else 0)
