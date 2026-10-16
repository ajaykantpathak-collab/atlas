"""The shared sync engine bounds its connect so a slow Postgres connect
cannot stall a refusal past the bank-lookup budget."""
import ast
from pathlib import Path

DATABASE_PY = Path(__file__).resolve().parents[1] / "database.py"


def _sync_engine_call_kwargs() -> dict:
    tree = ast.parse(DATABASE_PY.read_text(encoding="utf-8"))
    fn = next(n for n in ast.walk(tree)
              if isinstance(n, ast.FunctionDef) and n.name == "get_sync_engine")
    for node in ast.walk(fn):
        if isinstance(node, ast.Call) and getattr(node.func, "id", "") == \
                "_create_sync_engine" and node.keywords:
            return {k.arg: k.value for k in node.keywords}
    raise AssertionError("no pooled _create_sync_engine call in get_sync_engine")


def test_sync_engine_connect_is_bounded():
    kwargs = _sync_engine_call_kwargs()
    assert "connect_args" in kwargs
    connect_args = ast.literal_eval(kwargs["connect_args"])
    assert connect_args == {"connect_timeout": 2}
