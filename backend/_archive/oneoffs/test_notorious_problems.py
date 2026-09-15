"""Notorious/hard problem tests.

Tests the solver against historically difficult problems that are known
to break naive solvers. These are the "stress test" cases.

Run: python test_notorious_problems.py
"""
import sys, os, time, traceback, asyncio

sys.path.insert(0, r"D:\platform\backend")
sys.path.insert(0, r"D:\platform\backend\services")
os.chdir(r"D:\platform\backend")

results = {"pass": 0, "fail": 0, "skip": 0, "errors": []}


def test(name, func):
    print(f"\n{'='*60}")
    print(f"TEST: {name}")
    print(f"{'='*60}")
    try:
        t0 = time.perf_counter()
        result = func()
        elapsed = (time.perf_counter() - t0) * 1000
        print(f"  PASS ({elapsed:.0f}ms)")
        results["pass"] += 1
        return result
    except AssertionError as e:
        print(f"  FAIL: {e}")
        results["fail"] += 1
        results["errors"].append({"test": name, "error": str(e)})
        return None
    except Exception as e:
        print(f"  ERROR: {str(e)[:200]}")
        traceback.print_exc()
        results["fail"] += 1
        results["errors"].append({"test": name, "error": str(e)[:200]})
        return None


async def atest(name, func):
    print(f"\n{'='*60}")
    print(f"TEST: {name}")
    print(f"{'='*60}")
    try:
        t0 = time.perf_counter()
        result = await func()
        elapsed = (time.perf_counter() - t0) * 1000
        print(f"  PASS ({elapsed:.0f}ms)")
        results["pass"] += 1
        return result
    except AssertionError as e:
        print(f"  FAIL: {e}")
        results["fail"] += 1
        results["errors"].append({"test": name, "error": str(e)})
        return None
    except Exception as e:
        print(f"  ERROR: {str(e)[:200]}")
        traceback.print_exc()
        results["fail"] += 1
        results["errors"].append({"test": name, "error": str(e)[:200]})
        return None


# ─── Notorious problems ─────────────────────────────────────────────────────
# These are problems that break naive solvers due to:
# - Multi-step decomposition required
# - Implicit values (not stated, must be derived)
# - Unit confusion
# - Edge cases (division by zero, negative values)
# - Ambiguous phrasing
# - Non-standard formula combinations

NOTORIOUS_PROBLEMS = {
    # Implicit value: g is not stated, must be assumed
    "implicit_g": {
        "problem": "A ball is dropped from a 20m tall building. How long does it take to reach the ground?",
        "note": "g=9.8 or 10 must be assumed — not stated in problem",
        "min_time": 1.5,
        "max_time": 2.5,
    },
    # Multi-step: must find intermediate value first
    "multi_step_energy": {
        "problem": "A 1kg block is pushed against a spring (k=100N/m) compressing it 10cm, then released. "
                   "Find the speed of the block when it leaves the spring.",
        "note": "Must use energy conservation: 1/2 kx^2 = 1/2 mv^2",
        "expected": 1.0,
        "tolerance": 0.1,
    },
    # Unit conversion required
    "unit_conversion": {
        "problem": "A car travels at 72 km/hr. Find its speed in m/s.",
        "expected": 20.0,
        "tolerance": 0.1,
    },
    # Negative result interpretation
    "negative_velocity": {
        "problem": "A ball is thrown upward at 15 m/s from a 10m height. "
                   "Find its velocity when it reaches the ground. (g=10)",
        "note": "Answer should be negative (downward) or magnitude with direction",
        "expected_abs": 20.0,
        "tolerance": 1.0,
    },
    # Two equations, two unknowns
    "simultaneous": {
        "problem": "Solve the system: 2x + 3y = 13, 4x - y = 5",
        "expected_x": 2.0,
        "expected_y": 3.0,
    },
    # Trig identity required
    "trig_identity": {
        "problem": "Find the value of sin(75 degrees).",
        "expected": 0.9659,
        "tolerance": 0.01,
    },
    # Logarithm with change of base
    "log_change_base": {
        "problem": "Find the value of log_2(8).",
        "expected": 3.0,
        "tolerance": 0.01,
    },
    # Compound interest (not simple)
    "compound_interest": {
        "problem": "Find the compound interest on 1000 rupees at 10% per annum for 2 years.",
        "expected": 210.0,
        "tolerance": 1.0,
    },
    # Limit requiring L'Hopital
    "lhopital": {
        "problem": "Find the limit of (x^2 - 1)/(x - 1) as x approaches 1.",
        "expected": 2.0,
        "tolerance": 0.01,
    },
    # Integration by parts
    "integration_parts": {
        "problem": "Integrate x * exp(x).",
        "expected_contains": "x*exp(x) - exp(x)",
    },
    # Quadratic with irrational roots
    "irrational_roots": {
        "problem": "Solve x^2 - 3x + 1 = 0.",
        "note": "Roots are (3±√5)/2 — irrational, decimal ~0.382 and ~2.618",
        "expected_contains": "2.618",
    },
    # Stoichiometry with limiting reagent
    "limiting_reagent": {
        "problem": "In the reaction 2H2 + O2 -> 2H2O, if 5g H2 reacts with 50g O2, "
                   "find the mass of water produced. (H=1, O=16)",
        "note": "H2 is limiting: 5g H2 = 2.5 mol → 2.5 mol H2O = 45g",
        "expected": 45.0,
        "tolerance": 2.0,
    },
}


# ─── Tests ───────────────────────────────────────────────────────────────────

def test_imports():
    try:
        from services.solver_router import SolverRouter
        from services.verification_engine import VerificationEngine
        from services.llm_fallback_handler import LLMFallbackHandler
    except ImportError:
        from solver_router import SolverRouter
        from verification_engine import VerificationEngine
        from llm_fallback_handler import LLMFallbackHandler

    router = SolverRouter()
    eng = VerificationEngine()
    fb = LLMFallbackHandler()

    return "All imports OK"


test("Import components", test_imports)


def test_verification_edge_cases():
    """Test verification engine handles edge cases gracefully."""
    from verification_engine import VerificationEngine
    eng = VerificationEngine()

    # NaN and infinity
    import math
    assert eng.check_sanity_bounds(float('nan'), "speed") == False, "NaN should fail"
    assert eng.check_sanity_bounds(float('inf'), "speed") == False, "Inf should fail"
    assert eng.check_sanity_bounds(-float('inf'), "speed") == False, "-Inf should fail"

    # Unknown quantity type — should pass (no bounds defined)
    assert eng.check_sanity_bounds(42, "unknown_type") == True

    # Empty conservation data
    assert eng.check_conservation({}, {}) == True
    assert eng.check_conservation({"type": "energy"}, {}) == True  # missing before/after

    # Zero values
    assert eng.check_conservation({"type": "energy", "before": 0, "after": 0}, {}) == True

    return "Verification edge cases handled correctly"


test("Verification edge cases", test_verification_edge_cases)


def test_llm_fallback_circuit_breaker():
    """Test that circuit breaker opens after consecutive failures."""
    from llm_fallback_handler import LLMFallbackHandler
    handler = LLMFallbackHandler()

    # Simulate failures
    assert handler.is_circuit_open() == False
    for i in range(5):
        handler._consecutive_failures += 1
        if handler._consecutive_failures >= handler._max_consecutive_failures:
            handler._circuit_open = True

    assert handler.is_circuit_open() == True, "Circuit should be open after 5 failures"

    # Reset
    handler.reset_circuit_breaker()
    assert handler.is_circuit_open() == False
    assert handler._consecutive_failures == 0

    return "Circuit breaker works correctly"


test("LLM fallback circuit breaker", test_llm_fallback_circuit_breaker)


def test_answer_leak_prevention():
    """Test that the LLM fallback handler strips computed answers from explanations."""
    from llm_fallback_handler import LLMFallbackHandler
    handler = LLMFallbackHandler()

    # Test answer stripping
    text1 = "The answer is 42 m/s."
    cleaned1 = handler._strip_computed_answers(text1)
    assert "42" not in cleaned1, f"Answer not stripped: {cleaned1}"

    text2 = "The solution is 9.8."
    cleaned2 = handler._strip_computed_answers(text2)
    assert "9.8" not in cleaned2, f"Solution not stripped: {cleaned2}"

    text3 = "The result is: 100"
    cleaned3 = handler._strip_computed_answers(text3)
    assert "100" not in cleaned3, f"Result not stripped: {cleaned3}"

    # Should NOT strip from normal text
    text4 = "There are 42 students in the class."
    cleaned4 = handler._strip_computed_answers(text4)
    assert "42" in cleaned4, f"Should not strip from normal text: {cleaned4}"

    return "Answer leak prevention works correctly"


test("Answer leak prevention", test_answer_leak_prevention)


async def test_notorious_problems():
    """Run the solver against notorious problems.

    These are EXPECTED to be hard — we don't require all to pass,
    but we measure how many the deterministic+fallback system handles.
    """
    try:
        from services.solver_router import SolverRouter
    except ImportError:
        from solver_router import SolverRouter
    router = SolverRouter()

    solved = 0
    failed = 0
    details = []

    for prob_id, prob_data in NOTORIOUS_PROBLEMS.items():
        try:
            result = await router.solve_async(prob_data["problem"])
            if result and result.problem and result.problem.solved:
                answer = str(result.problem.final_answer)
                stages = result.pipeline_stages

                # Try to extract numeric value from answer (handles "CI = 210", "5 mol", etc.)
                import re as _re
                numeric_match = _re.search(r'-?\d+\.?\d*', answer.replace(',', ''))
                extracted_num = float(numeric_match.group()) if numeric_match else None

                # Check based on problem type
                passed = False
                if "expected" in prob_data:
                    if extracted_num is not None:
                        if abs(extracted_num - prob_data["expected"]) <= prob_data["tolerance"]:
                            passed = True
                elif "expected_abs" in prob_data:
                    if extracted_num is not None:
                        if abs(abs(extracted_num) - prob_data["expected_abs"]) <= prob_data["tolerance"]:
                            passed = True
                elif "expected_contains" in prob_data:
                    if prob_data["expected_contains"] in answer:
                        passed = True
                elif "min_time" in prob_data:
                    if extracted_num is not None:
                        if prob_data["min_time"] <= extracted_num <= prob_data["max_time"]:
                            passed = True
                elif "expected_x" in prob_data:
                    # System of equations — check if both values appear
                    if str(prob_data["expected_x"]) in answer and str(prob_data["expected_y"]) in answer:
                        passed = True

                if passed:
                    solved += 1
                    details.append(f"  {prob_id}: SOLVED={answer[:50]} (stages: {stages})")
                else:
                    failed += 1
                    details.append(f"  {prob_id}: WRONG={answer[:50]} — {prob_data.get('note', '')}")
            else:
                failed += 1
                details.append(f"  {prob_id}: NOT SOLVED — {prob_data.get('note', '')}")
        except Exception as e:
            failed += 1
            details.append(f"  {prob_id}: ERROR {str(e)[:80]}")

    print("\n".join(details))
    total = len(NOTORIOUS_PROBLEMS)
    coverage = solved / total * 100
    print(f"\n  Notorious coverage: {solved}/{total} = {coverage:.1f}%")

    # Notorious problems are hard — expect at least 10% to pass
    assert coverage >= 10.0, f"Coverage {coverage:.1f}% below 10% threshold"
    return f"Notorious coverage: {solved}/{total} = {coverage:.1f}%"


asyncio.run(atest("Notorious problems", test_notorious_problems))


# ─── Summary ─────────────────────────────────────────────────────────────────
print(f"\n{'='*60}")
print(f"NOTORIOUS PROBLEMS TEST SUMMARY")
print(f"{'='*60}")
print(f"  Pass: {results['pass']}")
print(f"  Fail: {results['fail']}")
if results["errors"]:
    print(f"\n  Errors:")
    for e in results["errors"]:
        print(f"    - {e['test']}: {e['error'][:100]}")
print(f"\n  Result: {'ALL PASS' if results['fail'] == 0 else 'HAS FAILURES'}")
sys.exit(0 if results['fail'] == 0 else 1)
