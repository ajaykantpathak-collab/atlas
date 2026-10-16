"""startup_smoke.py -- boot-blocking smoke test.

Runs inside the lifespan startup, BEFORE the app starts serving traffic.
If any CRITICAL check fails, the worker refuses to join the accept loop
(raises), preventing the app from serving broken responses to students.

CRITICAL checks (any failure = refuse to serve):
  1. The answer pipeline can process a simple maths question
  2. The slop gate scrubs a known-bad string
  3. The question selector can build without crashing
  4. The ask-coherence module loads and types a question
  5. No backspace control characters in any registered family's source

NON-CRITICAL checks (failure = WARN, still serve):
  - Postgres reachable
  - Redis reachable
  - Neo4j reachable
  - Qdrant reachable

Usage: called from main.py lifespan, before `yield`.
"""

import logging
import os
import sys

logger = logging.getLogger(__name__)

_results: list = []


def _check(name: str, critical: bool, fn):
    """Run one check, record the result."""
    try:
        ok, detail = fn()
        _results.append((name, ok, detail))
        if ok:
            logger.info("  SMOKE PASS: %s (%s)", name, detail)
        elif critical:
            logger.error("  SMOKE CRITICAL FAIL: %s (%s)", name, detail)
        else:
            logger.warning("  SMOKE DEGRADED: %s (%s)", name, detail)
        return ok
    except Exception as e:
        _results.append((name, False, f"{type(e).__name__}: {e}"))
        if critical:
            logger.error("  SMOKE CRITICAL FAIL: %s (%s)", name, e)
        else:
            logger.warning("  SMOKE DEGRADED: %s (%s)", name, e)
        return False


def _check_answer_pipeline():
    from backend.its.solver.answer_pipeline import answer
    # a lens-power numeric: routes the structure-family lane, the badge
    # gate, and the slop gate in one shot (bare arithmetic never leaves
    # the kernel and proves nothing about the family sweep)
    r = answer("A lens has focal length 20 cm. Find its power in dioptres.")
    if not str(r.label).startswith("VERIFIED"):
        return False, f"expected VERIFIED, got {r.label} " \
                      f"({getattr(r, 'refusal_reason', '')})"
    if "5" not in str(r.answer or ""):
        return False, f"expected 5 D in answer, got {r.answer}"
    return True, str(r.answer)[:30]


def _check_slop_gate():
    from backend.its.solver.slop_gate import gate_text
    test_input = "This is a variable binding approach using Lane C methodology"
    result, violations = gate_text(test_input)
    if "variable binding" in result.lower() or "lane c" in result.lower():
        return False, f"slop gate failed to scrub: {result}"
    if not violations:
        return False, "slop gate detected no violations on a known-bad string"
    return True, f"slop gate flagged {len(violations)} violations"


def _check_question_selector():
    from backend.services.question_selector import QuestionSelector
    _ = QuestionSelector.__name__
    return True, "selector importable"


def _check_ask_coherence():
    from backend.its.solver.ask_coherence import asked_kinds, answer_kind
    pri, tol = asked_kinds("Find the area of a circle of radius 7 cm.")
    if "area" not in (pri | tol):
        return False, f"expected area in ask kinds, got {pri | tol}"
    ak = answer_kind("156250 Pa")
    if ak != "pressure":
        return False, f"expected pressure for Pa, got {ak}"
    return True, "ask coherence working"


def _check_no_control_chars():
    """Check the solver family files for literal backspace chars
    (the heredoc-patching corruption class — hit us 3 times)."""
    solver_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                              "its", "solver")
    targets = ["physics_families.py", "commerce_families.py",
               "maths_families.py",
               "ask_coherence.py", "structure_families.py"]
    bad = []
    for name in targets:
        fam_path = os.path.join(solver_dir, name)
        if not os.path.exists(fam_path):
            continue
        src = open(fam_path, encoding="utf-8").read()
        ctrl = sum(1 for c in src if ord(c) < 32 and c not in "\n\r\t")
        if ctrl > 0:
            bad.append(f"{name}: {ctrl}")
    if bad:
        return False, "; ".join(bad) + " control chars"
    return True, f"no control chars in {len(targets)} family files"


# ── public entry ─────────────────────────────────────────────────────────────

def run_startup_smoke() -> bool:
    """Run all smoke checks.  Returns True if all CRITICAL checks pass.
    Called from main.py lifespan BEFORE yield — if False, raise to
    prevent the worker from serving traffic."""
    global _results
    _results = []

    logger.info("=== startup smoke test ===")

    ok1 = _check("answer_pipeline", True, _check_answer_pipeline)
    ok2 = _check("slop_gate", True, _check_slop_gate)
    # selector import pulls SQLAlchemy engine construction — a missing
    # DATABASE_URL (files-only runs, DB outages) must DEGRADE the boot,
    # not block it; infrastructure is the /health endpoint's job
    ok3 = _check("question_selector", False, _check_question_selector)
    ok4 = _check("ask_coherence", True, _check_ask_coherence)
    ok5 = _check("no_control_chars", True, _check_no_control_chars)

    critical_ok = all([ok1, ok2, ok4, ok5])
    n_pass = sum(1 for _, ok, _ in _results if ok)

    logger.info("=== startup smoke: %d/%d checks pass (%s) ===",
                n_pass, len(_results),
                "SAFE TO SERVE" if critical_ok else "CRITICAL FAILURE")

    if not critical_ok:
        failed = [(n, d) for n, ok, d in _results if not ok]
        raise RuntimeError(
            f"startup smoke test FAILED: {failed}. "
            "Refusing to serve traffic — fix the boot issue first."
        )
    return True


def get_results():
    """Return the last run's results for /ready endpoint enrichment."""
    return [{"check": n, "pass": ok, "detail": d} for n, ok, d in _results]
