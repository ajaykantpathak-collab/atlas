"""ci_check_sync.py — CI drift gate: root backend/ vs deploy/backend/.

Fails (exit 1) when any PROTECTED file differs between the development
tree (root backend/) and the production tree (deploy/backend/) -- the
master plan's Phase 0.1: deploy is the build source, root is development,
and the two must never drift on solver-critical files.

Usage:
    python backend/tools/ci_check_sync.py [--verbose]
"""
from __future__ import annotations

import hashlib
import os
import sys

def _find_repo():
    """Walk up until a directory containing deploy/backend — works whether
    the script runs from the deploy tree or the root dev tree (CI runs the
    ROOT copy: `python backend/tools/ci_check_sync.py`)."""
    d = os.path.dirname(os.path.abspath(__file__))
    for _ in range(6):
        if os.path.isdir(os.path.join(d, "deploy", "backend")):
            return d
        d = os.path.dirname(d)
    return os.path.dirname(os.path.dirname(os.path.dirname(
        os.path.dirname(os.path.abspath(__file__)))))


REPO = _find_repo()

PROTECTED = [
    "its/solver/contract.py",
    "its/solver/family_adapter.py",
    "its/solver/bank_answer.py",
    "its/solver/signature_resolver.py",
    "its/solver/dimensions.py",
    "its/solver/node_answer.py",
    "its/solver/exact_kernels.py",
    "its/solver/math_kernel.py",
    "its/solver/physics_families.py",
    "its/solver/accountancy_families.py",
    "its/solver/chemistry_families.py",
    "its/solver/biology_families.py",
    "its/solver/economics_families.py",
    "its/solver/commerce_families.py",
    "its/solver/english_families.py",
    "its/solver/maths_families.py",
    "its/solver/independent_verifier.py",
    "its/solver/solver_telemetry.py",
    "its/solver/solve_isolation.py" if False else "services/solve_isolation.py",
    "services/solver_router.py" if False else "routers/solver.py",
    "its/solver/repertoire.py",
    "services/misconception_corrector.py",
    "services/release_calibration.py",
    "services/learnpath.py",
    "services/subject_pedagogy.py",
    "services/compq_bank.py",
    "api/verified_practice.py",
    "api/practice.py",
    "routers/paper_mode.py",
    "routers/compq.py",
    "routers/learnpath.py",
    "main.py",
    "config.py",
    "tools/emit_solver_manifest.py",
    "tools/ci_check_sync.py",
]


def _sha(path: str) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def main() -> int:
    verbose = "--verbose" in sys.argv
    drift = []
    missing_deploy = []
    for rel in PROTECTED:
        root_f = os.path.join(REPO, "backend", rel)
        dep_f = os.path.join(REPO, "deploy", "backend", rel)
        if not os.path.exists(dep_f):
            missing_deploy.append(rel)
            continue
        if not os.path.exists(root_f):
            drift.append((rel, "missing in root tree"))
            continue
        if _sha(root_f) != _sha(dep_f):
            drift.append((rel, "content differs"))
    if missing_deploy:
        for m in missing_deploy:
            print(f"DRIFT: missing in deploy tree: {m}")
        return 1
    for rel, why in drift:
        print(f"DRIFT: {rel}: {why}")
    if drift:
        print(f"\n{len(drift)} protected file(s) drifted -- sync root <-> "
              f"deploy before merge.", file=sys.stderr)
        return 1
    if verbose:
        print(f"sync OK: {len(PROTECTED)} protected files identical")
    return 0


if __name__ == "__main__":
    sys.exit(main())
