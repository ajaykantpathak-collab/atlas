"""emit_solver_manifest.py — generate backend/its/solver/solver_manifest.json.

The manifest is a MIRROR OF REALITY, never a hand-maintained document:
this script reads the live family modules (TABLE rows), the independent
verifier registry, and the on-disk test suites, and emits the manifest the
master plan (Phase 0.2) specifies.  CI regenerates and fails if the
committed manifest differs -- drift means someone added a family without
registering its verifier or tests.

Usage:
    python backend/tools/emit_solver_manifest.py [--check]
      --check  exit 1 if the committed manifest differs from the emitted
               one (CI drift gate); without it, write the file.
"""
from __future__ import annotations

import glob
import importlib
import json
import os
import sys

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SOLVER_DIR = os.path.join(REPO, "backend" if "backend" + os.sep + "its" in
                          os.path.abspath(__file__).replace("\\", "/")
                          else os.path.join(REPO, "backend"), "its", "solver")

# subject-family modules: module stem -> subject label (WS-B map: one
# subject file each; commerce2/biotech rows folded into commerce/biology,
# ISC stats folded into maths by step 1)
FAMILY_MODULES = {
    "accountancy_families": "accountancy",
    "biology_families": "biology",
    "chemistry_families": "chemistry",
    "commerce_families": "commerce",
    "economics_families": "economics",
    "english_families": "english",
    "maths_families": "maths",
    "physics_families": "physics",
}


def _table_rows(module) -> list:
    """Rows from the module's family TABLE (name, pattern, fn) tuples."""
    rows = []
    for name in ("TABLE", "_TABLE", "_TABLE_BOOKS2"):
        tbl = getattr(module, name, None)
        if isinstance(tbl, list):
            for entry in tbl:
                if isinstance(entry, tuple) and len(entry) >= 2:
                    rows.append(entry)
    return rows


def emit() -> dict:
    sys.path.insert(0, REPO)
    manifest: dict = {}
    verifier_count = 0
    try:
        from backend.its.solver import independent_verifier as iv
        verifier_count = len(getattr(iv, "VERIFIERS", {}))
    except Exception:
        pass

    for stem, subject in sorted(FAMILY_MODULES.items()):
        try:
            mod = importlib.import_module(f"backend.its.solver.{stem}")
        except Exception as exc:
            manifest.setdefault(subject, {}).setdefault(stem, {
                "status": "EXPERIMENTAL", "import_error": str(exc)[:120]})
            continue
        rows = _table_rows(mod)
        families = []
        for entry in rows:
            fid = entry[0]
            pattern = entry[1] if len(entry) > 1 and isinstance(entry[1], str) else ""
            families.append({
                "family": fid,
                "input_pattern": pattern[:80],
                "output_type": "numeric",
                "verifier": "registered" if verifier_count else "unknown",
            })
        manifest.setdefault(subject, {}).setdefault(stem, {
            "module": stem,
            "families": [f["family"] for f in families],
            "family_count": len(families),
            "verifier_required": True,
            "status": "active" if families else "EXPERIMENTAL",
        })

    tests = sorted(glob.glob(os.path.join(
        REPO, "backend", "tests", "test_*.py")) +
        glob.glob(os.path.join(REPO, "_cisce_build", "test_*.py")))
    fixture_note = {
        "test_files_on_disk": [os.path.basename(t) for t in tests],
        "independent_verifiers_registered": verifier_count,
    }
    return {"_meta": fixture_note, "subjects": manifest}


def main() -> int:
    check = "--check" in sys.argv
    out = emit()
    payload = json.dumps(out, indent=1, ensure_ascii=False)
    target = os.path.join(REPO, "backend", "its", "solver", "solver_manifest.json")
    if check:
        committed = ""
        if os.path.exists(target):
            committed = open(target, encoding="utf-8").read()
        if committed != payload:
            print("DRIFT: emitted manifest differs from committed "
                  "solver_manifest.json -- regenerate and commit.", file=sys.stderr)
            return 1
        print("manifest: no drift")
        return 0
    os.makedirs(os.path.dirname(target), exist_ok=True)
    with open(target, "w", encoding="utf-8") as fh:
        fh.write(payload)
    subjects = len(out.get("subjects", {}))
    print(f"manifest written: {target} ({subjects} subject groups)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
