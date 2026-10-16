"""release_calibration.py -- per-family calibrated RELEASE GATES (FLYWHEEL-L4).

The autonomous correctness flywheel measures every solver family's
resistance to adversarial traps (trap_grammar L1 generates paraphrase /
unit-swap / mutation / absurd-constant / polarity variants; flywheel_oracle
L2 grades them in-process).  This module turns those MEASUREMENTS into a
release decision at the promotion boundary:

    resistance = (passes + 0.5 * partials) / (pass + partial + fail)

A family whose measured resistance falls below the floor (default 0.70,
with a minimum evidence of 4 graded probes) is RELEASE-GATED: students
still get the GUIDED teaching path (the family's steps survive), but the
VERIFIED answer is withheld until the family is regenerated and its
resistance recovers in a recalibration.

FAIL-SAFE CONTRACT (zero behavior change without a calibration):
    * no calibration file  -> every family allowed (default-allow)
    * corrupt/unreadable   -> every family allowed
    * family absent from   -> allowed (only MEASURED-WEAK families gate)
      the file
    * any exception in this -> allowed; the solve path must never crash
      module
The ONLY thing that gates is: measured resistance below floor with
enough probes behind it.

Integration (single additive choke point): modeling_layer.model_problem
calls withhold_if_gated(best) right after the red-team guards, so every
promotion path that inherits the guards also inherits the gate.
"""

from __future__ import annotations

import json
import os
import re
import threading

# --------------------------------------------------------------------------- #
# calibration policy (defaults; the file's _meta block may override)
# --------------------------------------------------------------------------- #

DEFAULT_FLOOR = 0.70        # resistance below this -> gated
DEFAULT_MIN_PROBES = 4      # fewer graded probes -> not enough evidence

_META_FLOOR_KEY = "floor"
_META_MIN_PROBES_KEY = "min_probes"

_calibration_path = os.environ.get("RELEASE_CALIBRATION_PATH") or os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "release_calibration.json")

_lock = threading.Lock()
_cache: dict | None = None      # None = not loaded; {} = missing/corrupt


def calibration_path() -> str:
    """Where the calibration JSON is read from (env-overridable)."""
    return _calibration_path


def reload() -> dict:
    """(Re)load the calibration file.  Returns the families mapping
    (empty when the file is missing or corrupt -- the default-allow
    contract)."""
    global _cache
    with _lock:
        doc = None
        try:
            with open(_calibration_path, "r", encoding="utf-8") as fh:
                doc = json.load(fh)
        except FileNotFoundError:
            doc = None
        except Exception:
            doc = None                       # corrupt -> default-allow
        if not isinstance(doc, dict):
            _cache = {}
            return _cache
        fams = doc.get("families") if isinstance(doc.get("families"), dict) \
            else None
        meta = doc.get("_meta") if isinstance(doc.get("_meta"), dict) else {}
        _cache = {
            "families": fams or {},
            "floor": _as_float(meta.get(_META_FLOOR_KEY), DEFAULT_FLOOR),
            "min_probes": _as_int(meta.get(_META_MIN_PROBES_KEY),
                                  DEFAULT_MIN_PROBES),
        }
        return _cache


def _as_float(v, default: float) -> float:
    try:
        f = float(v)
    except (TypeError, ValueError):
        return default
    return f if f == f and f not in (float("inf"),) else default


def _as_int(v, default: int) -> int:
    try:
        return int(v)
    except (TypeError, ValueError):
        return default


def _load() -> dict:
    if _cache is None:
        return reload()
    return _cache


# --------------------------------------------------------------------------- #
# the release decision
# --------------------------------------------------------------------------- #

def entry_for(family_id: str) -> dict | None:
    """The calibration entry for a family, or None (unknown/uncalibrated)."""
    fams = _load().get("families", {})
    ent = fams.get(family_id)
    if isinstance(ent, dict):
        return ent
    if isinstance(ent, (int, float)):        # compact form: resistance only
        return {"resistance": float(ent)}
    return None


def is_release_allowed(family_id: str) -> bool:
    """True unless the family is MEASURED weak (resistance below floor
    on at least min_probes graded probes).  Fails safe to allow."""
    if not family_id:
        return True
    try:
        cal = _load()
        ent = entry_for(family_id)
        if ent is None:
            return True                      # unknown -> allow
        probes = _as_int(ent.get("probes", 0), 0)
        if probes < int(cal.get("min_probes", DEFAULT_MIN_PROBES)):
            return True                      # insufficient evidence -> allow
        resistance = _as_float(ent.get("resistance", 1.0), 1.0)
        return resistance >= float(cal.get("floor", DEFAULT_FLOOR))
    except Exception:
        return True                          # never crash the solve path


def gated_families() -> list:
    """Sorted family ids currently below the release floor."""
    try:
        cal = _load()
        floor = float(cal.get("floor", DEFAULT_FLOOR))
        min_probes = int(cal.get("min_probes", DEFAULT_MIN_PROBES))
        out = []
        for fid, ent in cal.get("families", {}).items():
            if not isinstance(ent, dict):
                continue
            if (_as_int(ent.get("probes", 0), 0) >= min_probes
                    and _as_float(ent.get("resistance", 1.0), 1.0) < floor):
                out.append(fid)
        return sorted(out)
    except Exception:
        return []


def withhold_if_gated(result):
    """Promotion-boundary hook (additive, fail-safe).

    Returns the ModelResult unchanged unless its family is release-gated;
    a gated result is DOWNGRADED following the independent_verifier
    withholding convention: matched=False, final/numeric answers
    suppressed, STEPS KEPT (the family still teaches, guided) and an
    honest note.  Any failure in here returns the input untouched.
    """
    try:
        structure = getattr(result, "structure", "") or ""
        if not structure or is_release_allowed(structure):
            return result
        if not getattr(result, "matched", False):
            return result
        note = getattr(result, "note", "") or ""
        downgraded = type(result)(
            structure=structure,
            matched=False,
            confidence=0.0,
            quantities=getattr(result, "quantities", {}) or {},
            governing_equation=getattr(result, "governing_equation", "") or "",
            final_answer=None,
            numeric_answer=None,
            steps=list(getattr(result, "steps", None) or []),
            note=(note + "; " if note else "")
            + f"release calibration: family '{structure}' is below the "
              f"trap-resistance floor -- answer withheld (guided)",
        )
        return downgraded
    except Exception:
        return result


def status() -> dict:
    """Operational snapshot for logs/health endpoints."""
    try:
        cal = _load()
        fams = cal.get("families", {})
        return {
            "path": _calibration_path,
            "loaded": bool(fams),
            "families_calibrated": len(fams),
            "floor": cal.get("floor", DEFAULT_FLOOR),
            "min_probes": cal.get("min_probes", DEFAULT_MIN_PROBES),
            "gated": gated_families(),
        }
    except Exception as exc:
        return {"path": _calibration_path, "loaded": False,
                "error": repr(exc)}
