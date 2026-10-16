"""CL-16 regression: generated solver code runs through the restricted exec.

Stored solver source is LLM output and must never reach open/eval/import or
dunder introspection. Benign solvers keep working.
"""
import pytest

from backend.ai.generated_solvers import _exec_restricted

BENIGN = (
    "def solve(values):\n"
    "    return {\"steps\": [{\"step\": 1, \"description\": \"x\", "
    "\"success\": True, \"result\": values[\"a\"] * 2}]}\n"
)


def test_benign_solver_runs():
    ns = {}
    _exec_restricted(BENIGN, ns)
    assert ns["solve"]({"a": 3})["steps"][0]["result"] == 6


@pytest.mark.parametrize("src", [
    "import os\ndef solve(v):\n    return {}\n",
    "from os import system\ndef solve(v):\n    return {}\n",
    "def solve(v):\n    return ().__class__.__mro__\n",
    "def solve(v):\n    return open('/etc/passwd').read()\n",
    "def solve(v):\n    return eval('1')\n",
    "def solve(v):\n    return __import__('os')\n",
])
def test_escape_attempts_are_rejected(src):
    with pytest.raises(ValueError):
        _exec_restricted(src, {})


def test_builtins_are_whitelisted():
    ns = {}
    _exec_restricted("def solve(v):\n    return type(v)\n", ns)
    with pytest.raises(NameError):
        ns["solve"]({})
