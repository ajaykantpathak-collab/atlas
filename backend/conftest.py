"""deploy/backend/conftest.py — pin pytest to the SHIP tree.

Without this, pytest processes that inherit D:/platform from PYTHONPATH
or put '..' on sys.path silently import backend.* from the root dev
copy at D:/platform/backend (which is stale).  Every test then
"passes" against code that doesn't ship.  This file makes that
impossible: the deploy tree is always first on sys.path.
"""
import os
import sys

# Windows Python 3.13 Anaconda gmpy2 DLL entry point mismatch triggers 0xc0000139 fatal crash
os.environ.setdefault("MPMATH_NOGMPY", "1")
os.environ.setdefault("SYMPY_GROUND_TYPES", "python")

_deploy_backend = os.path.dirname(os.path.abspath(__file__))
_root_backend = os.path.normpath(os.path.join(
    os.path.dirname(_deploy_backend), "backend"))

# remove any path that would shadow the deploy tree's backend package
sys.path[:] = [
    p for p in sys.path
    if not (os.path.normpath(os.path.join(p or ".", "backend")) == _root_backend
            and p != _deploy_backend)
]

# the deploy tree is the canonical import source
if _deploy_backend not in sys.path:
    sys.path.insert(0, _deploy_backend)
