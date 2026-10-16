"""CL-06: solve telemetry rows carry the audit route and the deciding stage."""
from backend.services import answer_telemetry as tel


class _Audit:
    lane = "A"
    route = ["kernel:linear_exact", "shape:kernel_answer", "independent_verifier:pass"]


class _R:
    label = "VERIFIED"
    refusal_reason = None
    audit = _Audit()


def _capture(monkeypatch):
    captured = {}
    monkeypatch.setattr(tel, "_emit", lambda row: captured.update(row))
    tel._ctx.set({})
    return captured


def test_solve_row_carries_route_list(monkeypatch):
    captured = _capture(monkeypatch)
    tel.record_solve("q", _R(), 5.0)
    assert captured["route"] == _Audit.route


def test_solve_row_stage_is_first_stage_prefixed_entry(monkeypatch):
    captured = _capture(monkeypatch)
    tel.record_solve("q", _R(), 5.0)
    assert captured["stage"] == "kernel:linear_exact"


def test_solve_row_route_is_capped_and_copied(monkeypatch):
    captured = _capture(monkeypatch)

    class _Long(_R):
        class audit:
            lane = "A"
            route = [f"x:{i}" for i in range(100)]

    tel.record_solve("q", _Long(), 5.0)
    assert len(captured["route"]) == tel.ROUTE_CAP
    assert captured["route"] is not _Long.audit.route


def test_solve_row_without_audit_has_null_route_and_stage(monkeypatch):
    captured = _capture(monkeypatch)

    class _NoAudit:
        label = "GUIDED_PRACTICE"
        refusal_reason = "x"
        audit = None

    tel.record_solve("q", _NoAudit(), 5.0)
    assert captured["route"] == []
    assert captured["stage"] is None
