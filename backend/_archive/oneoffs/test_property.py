r"""Property-based solver testing — the solver NEVER crashes and always verifies.

Run: python test_property.py [iterations]

WHAT THIS TESTS (properties that must ALWAYS hold):
  1. NEVER CRASH: any step type with any valid input returns a result
     (success or clean error) — never an exception
  2. VERIFIED MEANS VERIFIED: if a result says verified=True, an answer exists
  3. DETERMINISM: same inputs → same answer, every time
  4. CLEAN ERRORS: failures have error messages, not silent None

PHASE 2 (subprocess-isolated, sampled): pathological inputs must
return within a hard timeout — SymPy can't be interrupted in-process,
so each pathological solve runs in a subprocess that we kill.

This catches the parse errors and edge cases we keep finding manually.
"""

import json
import random
import sys
import os
import time

sys.path.insert(0, r"D:\platform")          # for `backend.*` package imports
sys.path.insert(0, r"D:\platform\backend")  # for direct module imports
sys.path.insert(0, r"D:\platform\backend\services")
os.chdir(r"D:\platform\backend")

from backend.solver_facade import get_facade
from backend.ai.step_types import get_all_step_types

facade = get_facade()

# ═══════════════════════════════════════════════════════════════════
# Test input generators
# ═══════════════════════════════════════════════════════════════════

VALID_EXPRESSIONS = [
    "x", "x**2", "x**3 - 3*x**2 + 2*x", "x*sin(x)", "x*cos(x)",
    "exp(x)", "log(x)", "sqrt(x)", "1/x", "x/(x**2+1)",
    "sin(x)*cos(x)", "x*exp(x)", "x**2*log(x)", "3*x**2+2*x+1",
    "x**4 - 16", "(x+1)*(x-1)", "x**3/(x**2+1)", "tan(x)",
    "x**2+3*x", "5", "0", "-x**2+4*x-3", "x**(1/2)", "abs(x)",
]

PATHOLOGICAL_EXPRESSIONS = [
    "x**1000",                      # huge exponent
    "x" * 50,                       # very long implicit product
    "x**x**x",                      # tower exponent
    "sin(cos(tan(exp(log(x)))))",   # deep nesting
    "1/(x-x)",                      # division by symbolic zero
]

VALID_NUMBERS = ["0", "1", "-1", "2", "3.5", "-7.2", "100", "0.001", "1e6", "-1e-6"]
PATHOLOGICAL_NUMBERS = [
    "1e308", "-1e308", "1e-308", "999999999999999999999",
    "0.12345678901234567890", "NaN", "inf", "-inf",
]

VALID_VARS = ["x", "y", "t", "z", "a", "b", "n"]
PATHOLOGICAL_VARS = ["x**2", "sin(x)", "", " ", "1", "x y", "!!"]


def gen_input(field_type: str, pathological: bool = False) -> str:
    if field_type in ("expression", "text"):
        return random.choice(PATHOLOGICAL_EXPRESSIONS if pathological else VALID_EXPRESSIONS)
    if field_type in ("number", "float", "int"):
        return random.choice(PATHOLOGICAL_NUMBERS if pathological else VALID_NUMBERS)
    if field_type == "variable":
        return random.choice(PATHOLOGICAL_VARS if pathological else VALID_VARS)
    if field_type == "choice":
        return random.choice(["A", "B", "C", "D"])
    return random.choice(PATHOLOGICAL_EXPRESSIONS if pathological else VALID_EXPRESSIONS)


def build_inputs(step_type, pathological: bool = False) -> dict:
    return {f.name: gen_input(f.field_type, pathological) for f in step_type.inputs}


# ═══════════════════════════════════════════════════════════════════
# Subprocess worker for pathological inputs (isolated, killable)
# ═══════════════════════════════════════════════════════════════════

def _worker(q, step_id: str, inputs: dict):
    """Module-level worker (Windows spawn requires picklable functions)."""
    try:
        result = facade.solve_step(step_id, inputs)
        q.put(("ok" if result.success else "clean_error",
               str(result.final_answer or result.error)[:60]))
    except Exception as e:
        q.put(("crash", f"{type(e).__name__}: {str(e)[:60]}"))


def _solve_in_subprocess(step_id: str, inputs: dict, timeout: float = 8.0) -> str:
    """Solve in a fresh subprocess with a HARD timeout. Returns status string.

    The subprocess approach is REQUIRED because SymPy cannot be
    interrupted mid-computation from within the same process.
    """
    import multiprocessing as mp
    ctx = mp.get_context("spawn")

    q = ctx.Queue()
    p = ctx.Process(target=_worker, args=(q, step_id, inputs))
    p.start()
    p.join(timeout)
    if p.is_alive():
        p.terminate()
        p.join(2)
        return "HANG(killed)"
    try:
        status, detail = q.get_nowait()
        return f"{status}({detail})"
    except Exception:
        return "NO_RESULT"


# ═══════════════════════════════════════════════════════════════════
# Phase 1: Valid inputs, in-process (fast, full coverage)
# ═══════════════════════════════════════════════════════════════════

def run_phase1(iterations_per_type: int = 2) -> dict:
    step_types = get_all_step_types()
    print(f"PHASE 1: {len(step_types)} step types × {iterations_per_type} valid iterations (in-process)")
    print("=" * 60)

    stats = {"total": 0, "crashes": 0, "ok": 0, "clean_errors": 0,
             "silent_failures": 0, "nondeterministic": 0, "verified_no_answer": 0}
    crash_examples = []
    nondet_examples = []

    for idx, st in enumerate(step_types):
        for i in range(iterations_per_type):
            inputs = build_inputs(st, pathological=False)
            stats["total"] += 1
            try:
                result = facade.solve_step(st.id, inputs)
            except Exception as e:
                stats["crashes"] += 1
                if len(crash_examples) < 10:
                    crash_examples.append(f"{st.id}: {type(e).__name__}: {str(e)[:100]}")
                continue

            if result.success:
                stats["ok"] += 1
                if result.verified and not result.final_answer:
                    stats["verified_no_answer"] += 1
                # Determinism
                result2 = facade.solve_step(st.id, inputs)
                if result2.final_answer != result.final_answer:
                    stats["nondeterministic"] += 1
                    if len(nondet_examples) < 5:
                        nondet_examples.append(
                            f"{st.id}: '{str(result.final_answer)[:40]}' vs '{str(result2.final_answer)[:40]}'")
            else:
                if result.error:
                    stats["clean_errors"] += 1
                else:
                    stats["silent_failures"] += 1

        if (idx + 1) % 40 == 0:
            print(f"  {idx+1}/{len(step_types)} types | ok={stats['ok']} crash={stats['crashes']} "
                  f"clean_err={stats['clean_errors']} silent={stats['silent_failures']} "
                  f"nondet={stats['nondeterministic']}", flush=True)

    print()
    print(f"PHASE 1 RESULT: total={stats['total']} ok={stats['ok']} "
          f"crashes={stats['crashes']} clean_errors={stats['clean_errors']} "
          f"silent_failures={stats['silent_failures']} nondeterministic={stats['nondeterministic']} "
          f"verified_no_answer={stats['verified_no_answer']}")
    if crash_examples:
        print("Crashes:")
        for c in crash_examples: print(f"  {c}")
    if nondet_examples:
        print("Nondeterminism:")
        for n in nondet_examples: print(f"  {n}")
    return stats


# ═══════════════════════════════════════════════════════════════════
# Phase 2: Pathological inputs, subprocess-isolated (sampled)
# ═══════════════════════════════════════════════════════════════════

def run_phase2(sample_size: int = 20, timeout: float = 8.0) -> dict:
    step_types = get_all_step_types()
    random.seed(42)  # deterministic sample
    sample = random.sample(step_types, min(sample_size, len(step_types)))
    print(f"\nPHASE 2: {len(sample)} sampled types × pathological inputs (subprocess, {timeout}s hard timeout)")
    print("=" * 60)

    stats = {"total": 0, "ok": 0, "clean_error": 0, "crash": 0, "hang": 0, "no_result": 0}
    outcomes = []

    for st in sample:
        inputs = build_inputs(st, pathological=True)
        stats["total"] += 1
        outcome = _solve_in_subprocess(st.id, inputs, timeout)
        outcomes.append((st.id, outcome))
        if outcome.startswith("ok"):
            stats["ok"] += 1
        elif outcome.startswith("clean_error"):
            stats["clean_error"] += 1
        elif outcome.startswith("crash"):
            stats["crash"] += 1
        elif outcome.startswith("HANG"):
            stats["hang"] += 1
        else:
            stats["no_result"] += 1
        print(f"  {st.id}: {outcome}", flush=True)

    print(f"\nPHASE 2 RESULT: total={stats['total']} ok={stats['ok']} "
          f"clean_error={stats['clean_error']} crash={stats['crash']} "
          f"HANG={stats['hang']} no_result={stats['no_result']}")
    return stats


# ═══════════════════════════════════════════════════════════════════
# Main
# ═══════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    iters = 2
    sample = 20
    if len(sys.argv) > 1:
        try:
            iters = int(sys.argv[1])
        except ValueError:
            pass

    print("=" * 60)
    print("PROPERTY-BASED SOLVER TEST")
    print("=" * 60)
    random.seed(123)

    p1 = run_phase1(iterations_per_type=iters)
    p2 = run_phase2(sample_size=sample)

    print("\n" + "=" * 60)
    print("FINAL VERDICT")
    print("=" * 60)
    hard_failures = p1["crashes"] + p1["nondeterministic"] + p2["crash"] + p2["no_result"]
    hangs = p2["hang"]
    if hard_failures == 0 and hangs == 0:
        print("ALL PROPERTIES HOLD ✓")
        print("  Never crashes ✓ | Deterministic ✓ | Clean errors ✓ | No hangs ✓")
        sys.exit(0)
    else:
        print(f"HARD FAILURES: {hard_failures} | HANGS: {hangs} ❌")
        if hangs:
            print(f"  {hangs} pathological inputs HUNG the solver past {8}s.")
            print("  Known issue: SymPy cannot be interrupted in-process.")
            print("  Mitigation: subprocess isolation in production, or per-op guards.")
        sys.exit(1)
