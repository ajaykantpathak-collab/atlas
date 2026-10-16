"""WSA-P3 — AST guard: no silent ``except: pass`` in the sweep scope.

Packet WSA-P3 (silent-fallback observability sweep) stage-tags every
bare ``except Exception: pass`` in the P3 files.  This test is the
ratchet that keeps them from coming back: it AST-scans the in-scope
files and asserts that every ``ExceptHandler`` whose body is ONLY a
``Pass`` statement is one of the explicitly allowlisted
(function, exception-type) sites, and that the per-file totals equal
the pinned counts.

Properties:
  * a NEW bare ``except: pass`` anywhere in scope -> Counter mismatch
    -> FAIL (the contributor must stage-tag it with
    ``log_lane_exception(stage=...)`` or argue a reasoned allowlist
    entry here),
  * the follow-up mini-sweep packets shrinking the remainder -> allowlist
    + pin updated DOWN together (the count may only go down),
  * line-number drift is harmless: keys are (function, exc-type), not
    line numbers,
  * multiplicity is counted: three bare passes in one helper need a
    count-3 entry; removing one without editing the entry fails.

Allowlist discipline: every entry carries a reason naming the owner or
the queued packet.  The ovhA-p4r-owned memo/official-key entries are
expected to disappear when that wave lands; the lane-plumbing /
pre-route entries are queued for the P3 mini-sweep packet (neurolink,
bank_answer, independent_verifier + the answer_pipeline remainder).
"""

import ast
from collections import Counter
from pathlib import Path

import pytest

_SOLVER_DIR = Path(__file__).resolve().parents[1] / "its" / "solver"

# Files this packet owns (map §9 scope, minus this wave's exclusions:
# neurolink.py + bank_answer.py = ovhA-p4r lane; independent_verifier.py
# = WS-B merge retarget; deterministic_service.py + solver_facade.py =
# ovhA-p15 stage-tagging already landed).
SCOPE_FILES = (
    "answer_pipeline.py",
    "catalog_executor.py",
    "math_kernel.py",
    "exact_kernels.py",
    "chain_pipeline.py",
    "policy.py",
)

# Per-file allowlist: (function_qualname, exception_type, count, reason).
# answer_pipeline.py: ONLY the answer() choke-point section was in this
# wave's carve (T1 guards + choke-point plumbing — swept to zero);
# every remaining bare pass below lives OUTSIDE that carve.
ALLOWLIST: dict = {
    "answer_pipeline.py": [
        # -- lane plumbing helpers (queued P3 mini-sweep packet) --------
        ("_coverage_refuse", "Exception", 1,
         "coverage-refusal probe, fail-open lane plumbing; mini-sweep"),
        ("_kernel_formula_mass_mismatch", "Exception", 1,
         "inner pass of a log double-guard; mini-sweep"),
        ("_lane_a", "Exception", 1,
         "lane-A plumbing probe; mini-sweep"),
        # -- memo IO (ovhA-p4r lane; the official-key + memo_get/put
        #    sites were swept away by the 2026-10-13 in-flight session —
        #    their stale entries removed fix_2026_10_15, pin 19 -> 10) --
        ("_ans_memo_merge_file", "Exception", 1,
         "memo IO; ovhA-p4r lane"),
        # -- _answer_impl / _answer_core lanes (p2 pre-routes landed;
        #    queued P3 mini-sweep packet) --------------------------------
        ("_answer_impl", "Exception", 5,
         "lane/pre-route plumbing inside _answer_impl; mini-sweep"),
        ("_answer_core", "Exception", 1,
         "lane plumbing inside _answer_core; mini-sweep"),
    ],
    # Fully swept this wave: zero bare passes allowed.
    "catalog_executor.py": [],
    "math_kernel.py": [],
    "exact_kernels.py": [],
    "chain_pipeline.py": [],
    "policy.py": [],
}

# Post-sweep per-file bare-pass totals.  May only ever go DOWN; update
# together with ALLOWLIST (mini-sweep packets shrink both).
PIN_TOTALS: dict = {
    "answer_pipeline.py": 10,
    "catalog_executor.py": 0,
    "math_kernel.py": 0,
    "exact_kernels.py": 0,
    "chain_pipeline.py": 0,
    "policy.py": 0,
}


def _exc_type_name(node) -> str:
    if node is None:
        return "<bare>"
    if isinstance(node, ast.Name):
        return node.id
    if isinstance(node, ast.Attribute):
        return node.attr
    if isinstance(node, ast.Tuple):
        return ",".join(_exc_type_name(e) for e in node.elts)
    return "<complex>"


def _bare_passes(source: str):
    """Yield (function_qualname, exc_type) for every ExceptHandler whose
    body is exactly one Pass statement."""
    tree = ast.parse(source)
    found = []

    def visit(node, stack):
        for child in ast.iter_child_nodes(node):
            if isinstance(child, (ast.FunctionDef, ast.AsyncFunctionDef,
                                  ast.ClassDef)):
                visit(child, stack + [child.name])
            elif isinstance(child, ast.ExceptHandler):
                if len(child.body) == 1 and isinstance(child.body[0],
                                                       ast.Pass):
                    found.append((".".join(stack) or "<module>",
                                  _exc_type_name(child.type)))
                visit(child, stack)
            else:
                visit(child, stack)

    visit(tree, [])
    return found


def _allowed_counter(fname: str) -> Counter:
    return Counter({
        (fn, exc): count
        for fn, exc, count, _reason in ALLOWLIST[fname]
    })


@pytest.mark.parametrize("fname", SCOPE_FILES)
def test_no_new_bare_pass(fname):
    source = (_SOLVER_DIR / fname).read_text(encoding="utf-8")
    found = Counter(_bare_passes(source))
    allowed = _allowed_counter(fname)

    unexpected = found - allowed
    assert not unexpected, (
        f"{fname}: NEW silent `except: pass` site(s) without an "
        f"allowlist entry: {dict(unexpected)}. Stage-tag them with "
        f"log_lane_exception(stage='<module>.<fn>.<tag>', ...) or add a "
        f"reasoned allowlist entry in tests/test_wsa_no_silent_pass.py.")

    stale = allowed - found
    assert not stale, (
        f"{fname}: allowlist entries no longer present in the tree: "
        f"{dict(stale)}. Shrink ALLOWLIST and PIN_TOTALS.")


@pytest.mark.parametrize("fname", SCOPE_FILES)
def test_bare_pass_totals_pinned(fname):
    source = (_SOLVER_DIR / fname).read_text(encoding="utf-8")
    n = len(_bare_passes(source))
    assert n == PIN_TOTALS[fname], (
        f"{fname}: bare-pass count {n} != pinned {PIN_TOTALS[fname]}. "
        f"The count may only go DOWN (mini-sweep packets shrink the pin); "
        f"an increase means a new silent handler was added.")
