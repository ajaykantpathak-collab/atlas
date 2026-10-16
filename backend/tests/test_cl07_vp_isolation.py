"""CL-07 (H1): verified_practice image/voice solves ride solve_isolation.

Before: /solve-image, /grade-work and /solve-voice used a bare
asyncio.to_thread, so a slow solve blocked a worker with no budget, no
cache lane and no saturation honesty.  After: they share the isolation
pool like /solve and /solve-page, and the multi-question gather is capped.
"""
import ast
import pathlib

SRC = (pathlib.Path(__file__).resolve().parents[1]
       / "api" / "verified_practice.py")


def _fn_src(name: str) -> str:
    text = SRC.read_text(encoding="utf-8")
    tree = ast.parse(text)
    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)) \
                and node.name == name:
            return ast.get_source_segment(text, node)
    raise AssertionError(f"{name} not found")


def test_solve_image_has_no_bare_to_thread():
    assert "asyncio.to_thread" not in _fn_src("solve_image")
    assert "_aio.to_thread" not in _fn_src("solve_image")


def test_solve_image_gather_is_capped():
    body = _fn_src("solve_image")
    assert "_IMAGE_SOLVE_FANOUT" in body


def test_grade_work_canonical_solve_uses_isolation():
    body = _fn_src("grade_work")
    assert "to_thread" not in body
    assert "run_async" in body


def test_solve_voice_routes_through_isolation():
    body = _fn_src("solve_voice")
    assert "to_thread" not in body
    assert "run_async" in body


def test_fanout_constant_is_bounded():
    text = SRC.read_text(encoding="utf-8")
    tree = ast.parse(text)
    vals = {}
    for node in tree.body:
        if isinstance(node, ast.Assign) and len(node.targets) == 1 \
                and isinstance(node.targets[0], ast.Name):
            if isinstance(node.value, ast.Constant):
                vals[node.targets[0].id] = node.value.value
    assert 1 <= vals.get("_IMAGE_SOLVE_FANOUT", 0) <= 12
