"""test_kinematics_uv_swap.py -- pinned nondeterminism regression.

Owner-pinned flip: "A car accelerates from rest to 20 m/s in 8 s. Find
the acceleration." served VERIFIED -1.5 (time token bound as final
velocity) nondeterministically against the correct +2.5.  Guards now in
physics_families._kin_handle:
  - "from rest" pins u = 0 (a mis-pin refuses the family outright)
  - 'accelerates ... from rest' with a computed negative acceleration
    refuses; 'decelerates/retards' with a positive one refuses
  - bare "to rest / decelerates ... to rest" now pins v = 0 so the
    deceleration case solves in-family instead of refusing
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
# deploy root ONLY (backend/ on sys.path forks the its.solver identity)

import pytest

from backend.its.solver.physics_families import model_physics_families


@pytest.mark.parametrize("q,expected", [
    # the exact pinned flip question
    ("A car accelerates from rest to 20 m/s in 8 s. Find the "
     "acceleration.", 2.5),
    # coordinator-required deceleration mirror
    ("A car decelerates from 20 m/s to rest in 8 s. Find the "
     "acceleration.", -2.5),
    # variant phrasings of both roles
    ("A car accelerates uniformly from rest and reaches a speed of 20 "
     "m/s in 8 s. Find the acceleration.", 2.5),
    ("A bike moving at 20 m/s comes to rest in 8 s. Find the "
     "acceleration.", -2.5),
    ("A bus accelerates from 10 m/s to 30 m/s in 10 s. Find the "
     "acceleration.", 2.0),
])
def test_acceleration_sign_and_roles(q, expected):
    for _ in range(3):  # the original bug flipped between runs
        r = model_physics_families(q)
        assert r is not None and r.matched, f"refused: {q[:60]}"
        assert r.numeric_answer is not None, (q, r.final_answer)
        assert abs(float(r.numeric_answer) - expected) < 0.01, \
            (q, r.numeric_answer)


def test_accelerates_from_rest_never_negative():
    # sign guard: a negative a under 'accelerates ... from rest' means a
    # u/v role swap -- the family must refuse, never ship it
    from backend.its.solver.physics_families import _kin_handle, _kin_parse
    # any question where the guard matters is refused at the family gate;
    # assert the invariant directly on the parse for the pinned form
    d, _notes = _kin_parse("A car accelerates from rest to 20 m/s in 8 s.")
    assert d.get("u") == 0.0, d
    assert d.get("v") == 20.0, d
    assert d.get("t") == 8.0, d


@pytest.mark.parametrize("q", [
    "A car accelerates from rest to 20 m/s in 8 s. Find the "
    "acceleration.",
])
def test_pipeline_level_flip(q):
    # pipeline level: whatever lane wins, a shipped answer must be 2.5
    from backend.its.solver.answer_pipeline import answer
    for _ in range(2):
        r = answer(q)
        if str(r.label).startswith("VERIFIED") and r.numeric is not None:
            assert abs(float(r.numeric) - 2.5) < 0.01, (r.label, r.answer)
