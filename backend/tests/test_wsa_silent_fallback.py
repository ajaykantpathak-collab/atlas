"""WSA-P3 — silent-fallback tests: T1 fail-closed guards + T2 measurement.

TDD contract (map §9, packet WSA-P3):
  * T1: the three answer() choke-point guards (prose-essay, why-numeric,
    VERIFIED-badge) used to fail OPEN — a crash inside the guard let a
    possibly-wrong plain VERIFIED ship ungated.  After the fix an
    internal guard exception DOWNGRADES the plain VERIFIED badge to
    VERIFIED_WITH_ASSUMPTIONS (which the strict contract then withholds
    under default policy), stamps ``guard_error:<name>`` on the audit
    route, and records the crash via ``log_lane_exception``.  Every T1
    test here FAILS on the pre-fix tree (label stays VERIFIED, no stamp).
  * T2: silent handlers in the sweep scope keep their fail-open
    semantics but become MEASURED — each emits a stage-tagged
    ``log_lane_exception`` row (``<module>.<fn>.<tag>``).  The T2 tests
    force a handler and assert (a) the log fires with the right stage
    and (b) the observable semantics are UNCHANGED.

Hermetic: no memo file IO, no miss-queue append, no telemetry row, no
DB.  ``_answer_impl`` is stubbed so the tests exercise exactly the
choke-point section, not the lanes.
"""

import re as _re_mod
import sys
from types import SimpleNamespace

import pytest

from backend.its.solver import answer_pipeline as ap
from backend.its.solver import contract as ct


# --------------------------------------------------------------------------- #
# fixtures + stubs
# --------------------------------------------------------------------------- #

@pytest.fixture()
def hermetic(monkeypatch):
    """Keep answer() side-effect free: no memo file IO, no miss-queue
    append, no telemetry row."""
    monkeypatch.setattr(ap, "_ans_memo_get", lambda t: None)
    monkeypatch.setattr(ap, "_ans_memo_put", lambda t, r: None)
    monkeypatch.setattr(ap, "_queue_miss", lambda t, r: None)
    try:
        from backend.services import answer_telemetry as _tel
        monkeypatch.setattr(_tel, "record_solve",
                            lambda *a, **k: None)
    except Exception:
        pass


def _verified_stub(answer="42", numeric=42.0, route=None, socratic=None,
                   audit=None):
    """A PipelineResult carrying a plain VERIFIED badge, as a lane would
    hand it to the choke point."""
    if audit is None:
        audit = ap.AuditTrail(lane="A",
                              route=list(route or ["test:stub"]))
    return ap.PipelineResult(
        label=ap.VERIFIED, answer=answer, numeric=numeric,
        steps=["stub step"], audit=audit, socratic=socratic)


def _spy(monkeypatch, target_mod):
    """Replace log_lane_exception on target_mod with a recording spy.
    raising=False: on the PRE-fix tree the module may not import the
    helper yet — the spy then simply records nothing, and the T1
    assertions fail on the real pre-fix behaviour (ungated VERIFIED)."""
    calls = []

    def _rec(stage, exc, *a, **k):
        calls.append((stage, exc))

    monkeypatch.setattr(target_mod, "log_lane_exception", _rec,
                        raising=False)
    return calls


class _ReShim:
    """Stand-in for the `re` module inside answer_pipeline only: search
    raises for the ONE marked pattern (a targeted guard crash), every
    other call delegates to the real module."""

    def __init__(self, marker: str):
        self._marker = marker

    def __getattr__(self, name):
        return getattr(_re_mod, name)

    def search(self, pattern, string, flags=0):
        if self._marker in pattern:
            raise RuntimeError("synthetic guard regex crash (WSA-P3 T1)")
        return _re_mod.search(pattern, string, flags)


# --------------------------------------------------------------------------- #
# T1 — guard crash fails closed
# --------------------------------------------------------------------------- #

def test_prose_essay_guard_crash_fails_closed(hermetic, monkeypatch):
    """Crash the prose-essay guard regex: the plain VERIFIED must not
    ship ungated — downgrade + guard_error stamp + measured log."""
    monkeypatch.setattr(ap, "re", _ReShim("what\\s+is\\s+the\\s+value"))
    calls = _spy(monkeypatch, ap)
    monkeypatch.setattr(
        ap, "_answer_impl",
        lambda text, node_id=None: _verified_stub(
            answer="A long conceptual essay answer would sit here."))

    res = ap.answer("What is the value of g on Earth?")

    assert res.label != ap.VERIFIED, (
        "a crashed prose-essay guard must never leave a plain VERIFIED "
        "shipping ungated (pre-fix behaviour)")
    assert res.label in (ap.VERIFIED_ASSUMED, ap.GUIDED)
    assert any(r == "guard_error:prose_essay" for r in res.audit.route), (
        f"route must carry the guard_error stamp, got {res.audit.route}")
    assert calls and "prose_essay" in calls[0][0], (
        f"guard crash must be measured via log_lane_exception, got {calls}")
    assert calls[0][0].startswith("answer_pipeline.")


def test_prose_essay_guard_crash_withholds_under_strict(hermetic,
                                                        monkeypatch):
    """End-to-end fail-closed: with the default strict policy the
    downgraded badge is then withheld by the strict-verified contract —
    no answer text ships off a crashed guard."""
    monkeypatch.setattr(ap, "re", _ReShim("what\\s+is\\s+the\\s+value"))
    _spy(monkeypatch, ap)
    from backend.its.solver import policy as pol
    monkeypatch.setattr(pol, "allow_unverified_answer", lambda: False)
    monkeypatch.setattr(
        ap, "_answer_impl",
        lambda text, node_id=None: _verified_stub(answer="42",
                                                  numeric=42.0))

    res = ap.answer("What is the value of g on Earth?")

    assert res.label == ap.GUIDED
    assert res.answer is None and res.numeric is None
    assert any(str(r).startswith("badge:strict_unverified")
               for r in res.audit.route)


def test_why_numeric_guard_crash_fails_closed(hermetic, monkeypatch):
    """Crash the why-numeric guard regex: a numeric 'answer to a why'
    must not ride a plain VERIFIED badge past a crashed guard."""
    monkeypatch.setattr(ap, "re", _ReShim("what\\s+is\\s+the\\s+reason"))
    calls = _spy(monkeypatch, ap)
    monkeypatch.setattr(
        ap, "_answer_impl",
        lambda text, node_id=None: _verified_stub())

    res = ap.answer("Why do we stop listing multiples at the LCM?")

    assert res.label != ap.VERIFIED
    assert res.label in (ap.VERIFIED_ASSUMED, ap.GUIDED)
    assert any(r == "guard_error:why_numeric" for r in res.audit.route)
    assert calls and "why_numeric" in calls[0][0]


def test_badge_gate_crash_fails_closed(hermetic, monkeypatch):
    """Crash the independent verifier inside the badge gate: an
    unverified-by-anyone answer must not keep the plain VERIFIED badge
    (pre-fix: check_route raising shipped VERIFIED ungated)."""
    from backend.its.solver import independent_verifier as iv

    def _boom(*a, **k):
        raise RuntimeError("synthetic verifier crash (WSA-P3 T1)")

    monkeypatch.setattr(iv, "check_route", _boom)
    from backend.its.solver import pal_executor
    monkeypatch.setattr(pal_executor, "pal_compute", lambda t: None)
    calls = _spy(monkeypatch, ap)
    socratic = {"understood": {"structure": "NEWTON_SECOND_LAW",
                               "givens": {"m": 2.0, "a": 10.0}}}
    monkeypatch.setattr(
        ap, "_answer_impl",
        lambda text, node_id=None: _verified_stub(
            answer="20", numeric=20.0, socratic=socratic))

    res = ap.answer("A 2 kg body accelerates at 10 m/s^2. Find the force.")

    assert res.label != ap.VERIFIED
    assert res.label in (ap.VERIFIED_ASSUMED, ap.GUIDED)
    assert any(r == "guard_error:verified_badge_gate"
               for r in res.audit.route), (
        f"route must carry the guard_error stamp, got {res.audit.route}")
    assert calls and "verified_badge_gate" in calls[0][0]


def test_guard_crash_never_raises_even_without_audit(hermetic,
                                                     monkeypatch):
    """The fail-closed handler itself must be unbreakable: a result with
    audit=None and a crashing guard still returns (degraded), never
    blows up the answer path."""
    monkeypatch.setattr(ap, "re", _ReShim("what\\s+is\\s+the\\s+value"))
    _spy(monkeypatch, ap)
    monkeypatch.setattr(
        ap, "_answer_impl",
        lambda text, node_id=None: _verified_stub(audit=None))

    res = ap.answer("What is the value of g on Earth?")  # must not raise
    assert res.label in (ap.VERIFIED_ASSUMED, ap.GUIDED)


def test_guard_crash_never_upgrades_official_badges(hermetic, monkeypatch):
    """Only the plain VERIFIED tier is downgraded on a guard crash —
    VERIFIED_OFFICIAL (board key evidence) must not be re-badged, and a
    GUIDED result must stay GUIDED (monotonic downgrades only)."""
    monkeypatch.setattr(ap, "re", _ReShim("what\\s+is\\s+the\\s+value"))
    _spy(monkeypatch, ap)
    stub = _verified_stub()
    stub.label = ap.VERIFIED_OFFICIAL
    monkeypatch.setattr(ap, "_answer_impl",
                        lambda text, node_id=None: stub)

    res = ap.answer("What is the value of g on Earth?")
    assert res.label == ap.VERIFIED_OFFICIAL


# --------------------------------------------------------------------------- #
# T2 — silent handlers become measured (semantics unchanged)
# --------------------------------------------------------------------------- #

def test_llm_budget_reset_failure_measured(hermetic, monkeypatch):
    """answer()'s LLM-budget reset failure used to be a try/log/except/
    pass double-guard; the helper is called directly now and still
    never breaks the answer."""
    calls = _spy(monkeypatch, ap)
    monkeypatch.setitem(sys.modules,
                        "backend.its.solver.competency_engine", None)
    monkeypatch.setattr(
        ap, "_answer_impl",
        lambda text, node_id=None: ap.PipelineResult(
            label=ap.GUIDED, answer=None, numeric=None, steps=[],
            audit=ap.AuditTrail(lane="A")))

    res = ap.answer("anything at all")  # must not raise

    assert res.label == ap.GUIDED
    assert any("answer_pipeline.answer.llm_budget_reset" == c[0]
               for c in calls), f"expected stage-tagged log, got {calls}"


def test_pal_compute_loss_measured(hermetic, monkeypatch):
    """PAL rescue silently lost (map §9 ap:1549, T2): pal_compute
    crashing must log a stage tag AND keep the fail-open semantics
    (result continues to the strict contract, which withholds)."""
    from backend.its.solver import independent_verifier as iv
    from backend.its.solver import pal_executor

    def _boom(*a, **k):
        raise RuntimeError("pal exploded")

    monkeypatch.setattr(pal_executor, "pal_compute", _boom)
    calls = _spy(monkeypatch, ap)
    socratic = {"understood": {"structure": "UNREGISTERED_STRUCT_XYZ",
                               "givens": {}}}
    monkeypatch.setattr(
        ap, "_answer_impl",
        lambda text, node_id=None: _verified_stub(
            answer="20", numeric=20.0, socratic=socratic))

    res = ap.answer("Find the unknown quantity from the given values.")

    assert any("answer_pipeline.answer.pal_compute" == c[0]
               for c in calls), f"expected stage-tagged log, got {calls}"
    # semantics unchanged: PAL crash still fails open into the strict
    # contract (VERIFIED_ASSUMED -> withheld under default policy)
    assert res.label in (ap.VERIFIED_ASSUMED, ap.GUIDED)


def test_slop_gate_failure_still_fails_open_but_measured(hermetic,
                                                         monkeypatch):
    """ICE 1.3 slop gate is fail-open BY DESIGN (map §9 ap:1641, T3) —
    the gate failing must still serve the answer, but the event must be
    measured instead of a bare stderr print."""
    from backend.its.solver import slop_gate

    def _boom(result):
        raise RuntimeError("gate exploded")

    monkeypatch.setattr(slop_gate, "gate_result", _boom)
    calls = _spy(monkeypatch, ap)
    stub = _verified_stub()
    stub.label = ap.GUIDED  # avoid the strict contract entirely
    stub.answer = None
    monkeypatch.setattr(ap, "_answer_impl",
                        lambda text, node_id=None: stub)

    res = ap.answer("plain guided question")

    assert res is stub, (
        "slop-gate failure must fail OPEN: the same result object "
        "continues (semantics unchanged)")
    assert any("answer_pipeline.answer.slop_gate" == c[0] for c in calls)


def test_telemetry_failure_still_fails_open_but_measured(hermetic,
                                                         monkeypatch):
    from backend.services import answer_telemetry as tel

    def _boom(*a, **k):
        raise RuntimeError("telemetry exploded")

    monkeypatch.setattr(tel, "record_solve", _boom)
    calls = _spy(monkeypatch, ap)
    stub = _verified_stub()
    stub.label = ap.GUIDED
    stub.answer = None
    monkeypatch.setattr(ap, "_answer_impl",
                        lambda text, node_id=None: stub)

    res = ap.answer("plain guided question")

    assert res is stub
    assert any("answer_pipeline.answer.telemetry" == c[0] for c in calls)


def test_policy_config_read_failure_measured(monkeypatch):
    """policy knobs failing to read fall back to fail-closed defaults;
    the fallback must now be visible (map §9 policy:43/63/73)."""
    from backend.its.solver import policy as pol
    calls = _spy(monkeypatch, pol)

    class _Boom:
        def __getattr__(self, k):
            raise RuntimeError("settings exploded")

    monkeypatch.setattr(pol, "_env", lambda name: None)  # pin off env
    monkeypatch.setattr(pol, "_settings", lambda: _Boom())
    # semantics unchanged: fail-closed default still served
    assert pol._config_value("solver_llm_mode", "parse_only") == "parse_only"
    assert any("policy._config_value" in c[0] for c in calls)

    # _env_bool's own handler only fires when _config_value itself
    # raises (it normally catches internally) — force that path:
    def _cfg_boom(*a, **k):
        raise RuntimeError("config value exploded")

    monkeypatch.setattr(pol, "_config_value", _cfg_boom)
    assert pol._env_bool("SOLVER_REQUIRE_VERIFICATION", True) is True
    assert any("policy._env_bool" in c[0] for c in calls)


def test_policy_invalid_llm_mode_measured(monkeypatch):
    """Invalid SOLVER_LLM_MODE still fails closed to OFF (documented
    intent) — now with a stage-tagged row (map §9 policy:98/105)."""
    from backend.its.solver import policy as pol
    calls = _spy(monkeypatch, pol)
    monkeypatch.setattr(pol, "_env", lambda name: "yolo")
    from backend.its.solver.policy import SolverLLMMode
    assert pol.llm_mode() == SolverLLMMode.OFF
    assert any("policy.llm_mode" in c[0] for c in calls)


def test_chain_incomplete_reading_guard_crash_measured(monkeypatch):
    """chain_pipeline's incomplete-reading guard crashing silently
    disabled the guard (map §9 chain_pipeline:53, T2).  Fail-open stays,
    the crash becomes visible."""
    from backend.its.solver import chain_pipeline as cp
    calls = _spy(monkeypatch, cp)
    monkeypatch.setitem(sys.modules,
                        "backend.its.solver.hop_planner", None)
    monkeypatch.setattr(cp, "parse_chain_text", lambda t: {
        "keys": ["a", "b"], "linking_quantities": [], "values": [1.0, 2.0],
        "ops": [], "sentences": [], "seed": 0})
    monkeypatch.setattr(cp, "compose_chain_multi", lambda *a, **k: {
        "hops": [], "degradation": "stub", "steps": ["s"],
        "refusal_reason": "stub refusal", "answer": None})

    audit = ap.AuditTrail(lane="B")
    res = cp.try_chain("two hop narrative", audit)  # must not raise

    assert res is not None and res.label == ap.GUIDED, (
        "semantics unchanged: the chain still runs after the guard crash")
    assert any("chain_pipeline.try_chain" in c[0] for c in calls)


def test_math_kernel_model_crash_measured(monkeypatch):
    """A crashing MODELS entry in solve_math used to convert to
    r=None invisibly (map §9 math_kernel:1326, T2)."""
    from backend.its.solver import math_kernel as mk
    calls = _spy(monkeypatch, mk)

    def _boom(text):
        raise RuntimeError("model exploded")

    monkeypatch.setattr(mk, "MODELS", [_boom] + list(mk.MODELS))
    mk.solve_math("Solve for x: 5 * 6 = ?")  # must not raise

    assert any("math_kernel.solve_math.model" in c[0] for c in calls), (
        f"expected stage-tagged log, got {calls}")


def test_exact_kernel_arith_crash_measured(monkeypatch):
    """compute_exact's arithmetic stage crashing falls through silently
    (map §9 exact_kernels:547, T2); the fall-through must remain but be
    measured."""
    from backend.its.solver import exact_kernels as ek
    calls = _spy(monkeypatch, ek)

    def _boom(expr):
        raise RuntimeError("arith exploded")

    monkeypatch.setattr(ek, "_arithmetic_expr", _boom)
    out = ek.compute_exact("Calculate 9 * 7 into a number")

    assert out is None, (
        "semantics unchanged: crash still falls through to a decline")
    assert any("exact_kernels.compute_exact" in c[0] for c in calls)


def test_catalog_const_env_failure_measured(monkeypatch):
    """_const_env_for's context read failing still serves the default
    constant env, now measured (map §9 catalog_executor:117, T2)."""
    from backend.its.solver import catalog_executor as ce
    seen = []
    real_log = getattr(ce, "log_lane_exception", None)

    def _rec(stage, exc, *a, **k):
        seen.append(stage)
        if real_log is not None:
            real_log(stage, exc, *a, **k)

    monkeypatch.setattr(ce, "log_lane_exception", _rec, raising=False)

    class _BoomConcept(dict):
        def get(self, k, d=None):
            raise RuntimeError("concept read exploded")

    env = ce._const_env_for(_BoomConcept())

    assert env.get("sigma") == 5.67e-8, (
        "semantics unchanged: default env still served")
    assert any("catalog_executor._const_env_for" in s for s in seen)


# --------------------------------------------------------------------------- #
# logging-helper contract
# --------------------------------------------------------------------------- #

def test_log_lane_exception_never_raises(monkeypatch):
    """The T2 mechanism must itself be unbreakable: even with the JSON
    encoder blowing up, log_lane_exception swallows."""
    def _boom(*a, **k):
        raise RuntimeError("no json today")

    monkeypatch.setattr(ct.json, "dumps", _boom)
    ct.log_lane_exception("test.stage", RuntimeError("x"), q="v")
    ct.log_lane_exception("test.stage", ValueError("y"))  # no raise


def test_stage_tags_are_keyword_arguments():
    """Every log_lane_exception call inside THIS wave's carve passes
    ``stage=`` as a KEYWORD (the contract that makes the rows
    greppable/countable per module.function.tag).  Scope: the five
    fully-swept files + answer() in answer_pipeline (pre-existing
    positional calls in other sections belong to other lanes' carve)."""
    import ast
    from pathlib import Path

    solver_dir = Path(__file__).resolve().parents[1] / "its" / "solver"
    files = ["catalog_executor.py", "math_kernel.py", "exact_kernels.py",
             "chain_pipeline.py", "policy.py"]
    bad = []
    for fname in files:
        tree = ast.parse((solver_dir / fname).read_text(encoding="utf-8"))
        for node in ast.walk(tree):
            if isinstance(node, ast.Call) and \
                    isinstance(node.func, ast.Name) and \
                    node.func.id == "log_lane_exception":
                if not any(kw.arg == "stage" for kw in node.keywords):
                    bad.append(f"{fname}:{node.lineno}")

    # answer_pipeline: only the answer() choke-point function is in carve
    ap_src = (solver_dir / "answer_pipeline.py").read_text(encoding="utf-8")
    ap_tree = ast.parse(ap_src)
    for node in ast.walk(ap_tree):
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)) and \
                node.name == "answer":
            for sub in ast.walk(node):
                if isinstance(sub, ast.Call) and \
                        isinstance(sub.func, ast.Name) and \
                        sub.func.id == "log_lane_exception":
                    if not any(kw.arg == "stage" for kw in sub.keywords):
                        bad.append(f"answer_pipeline.py(answer):{sub.lineno}")
    assert not bad, (
        f"log_lane_exception calls missing stage= keyword: {bad}")
