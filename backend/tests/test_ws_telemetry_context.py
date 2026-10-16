"""TDD: the /solver/v3/deterministic path must bind subject/class for telemetry.

Root cause (systematic-debugging): routers/solver.py deterministic_solve()
passes subject/class_level into run_sync but never calls
answer_telemetry.bind(), so every solve row written by answer() carries
subject=null and class=null.
"""
import ast
import pathlib

ROUTER = pathlib.Path(__file__).resolve().parents[1] / "routers" / "solver.py"


def _deterministic_solve_body_source() -> str:
    tree = ast.parse(ROUTER.read_text(encoding="utf-8"))
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef) and node.name == "deterministic_solve":
            return ast.get_source_segment(ROUTER.read_text(encoding="utf-8"), node)
    raise AssertionError("deterministic_solve not found")


def test_deterministic_solve_binds_telemetry_context_before_run():
    body = _deterministic_solve_body_source()
    assert "bind(" in body, "deterministic_solve must call answer_telemetry.bind()"
    bind_pos = body.index("bind(")
    run_pos = body.index("run_sync(")
    assert bind_pos < run_pos, "bind() must run before run_sync() so the pool inherits it"


def test_bind_receives_subject_and_class_from_request():
    body = _deterministic_solve_body_source()
    bind_start = body.index("bind(")
    bind_call = body[bind_start:body.index(")", bind_start) + 1]
    assert "subject=req.subject" in bind_call
    assert "class_level=req.class_level" in bind_call


def test_bind_sets_context_visible_to_record_solve(monkeypatch):
    from backend.services import answer_telemetry as tel

    captured = {}

    def fake_emit(row):
        captured.update(row)

    monkeypatch.setattr(tel, "_emit", fake_emit)
    tel._ctx.set({})
    tel.bind(subject="physics", class_level="12", surface="solver/v3")

    class _R:
        label = "VERIFIED"
        refusal_reason = None
        audit = None

    tel.record_solve("q", _R(), 12.0)
    assert captured["subject"] == "physics"
    assert captured["class"] == "12"
