"""test_ovhF_telemetry.py — CL-06 route+stage on the persisted
answer-telemetry row (its_attempt_log / AttemptLog)."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))

import pytest


def test_attempt_log_model_has_route_and_stage():
    from backend.models.telemetry import AttemptLog
    cols = {c.name: c for c in AttemptLog.__table__.columns}
    assert "route" in cols and "stage" in cols
    # additive + nullable: no lock, no backfill
    assert cols["route"].nullable and cols["stage"].nullable
    assert cols["stage"].type.length == 64


def test_attempt_event_carries_route_stage():
    from backend.its.contracts import AttemptEvent
    ev = AttemptEvent(
        student_id="s1", node_id="n1", question_id=None, is_correct=True,
        route=["structure:PYTHAGORAS", "pal_xcheck:agree"],
        stage="structure:PYTHAGORAS")
    d = ev.to_dict()
    assert d["route"] == ["structure:PYTHAGORAS", "pal_xcheck:agree"]
    assert d["stage"] == "structure:PYTHAGORAS"
    # round-trip
    ev2 = AttemptEvent.from_dict(d)
    assert ev2.route == ev.route and ev2.stage == ev.stage
    # absent route/stage is fine (older producers)
    ev3 = AttemptEvent(student_id="s", node_id="n", question_id=None,
                       is_correct=False)
    assert ev3.route is None and ev3.stage is None


def test_row_from_event_populates_route_and_stage():
    from backend.its.contracts import AttemptEvent
    from backend.its.telemetry import row_from_event
    ev = AttemptEvent(
        student_id="s1", node_id="n1", question_id=None, is_correct=True,
        route=["structure:X", "verifier:Y"], stage="structure:X")
    row = row_from_event(ev)
    assert row["route"] == ["structure:X", "verifier:Y"]
    assert row["stage"] == "structure:X"
    # no route -> empty list, no stage -> None
    ev2 = AttemptEvent(student_id="s", node_id="n", question_id=None,
                       is_correct=False)
    row2 = row_from_event(ev2)
    assert row2["route"] == [] and row2["stage"] is None


def test_route_cap_truncation():
    from backend.its.contracts import AttemptEvent
    from backend.its.telemetry import row_from_event
    long_route = [f"stage_{i}" for i in range(60)]
    ev = AttemptEvent(student_id="s", node_id="n", question_id=None,
                      is_correct=True, route=long_route,
                      stage="stage_0")
    row = row_from_event(ev)
    assert len(row["route"]) == 32
    assert row["route"][0] == "stage_0" and row["route"][-1] == "stage_31"


def test_migration_renders_offline():
    """The additive migration exists and is well-formed (SQL render is
    proven offline via `alembic upgrade --sql` — see scratch_f/)."""
    import glob
    files = glob.glob(os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "db", "migrations", "versions", "*route_stage*.py"))
    assert files, "route/stage migration missing"
    src = open(files[0], encoding="utf-8").read()
    assert "op.add_column" in src and "nullable=True" in src
