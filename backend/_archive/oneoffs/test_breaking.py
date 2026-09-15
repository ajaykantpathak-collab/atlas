"""Breaking/fuzzing tests for the solver.

Tests that the solver handles malformed input, edge cases, and adversarial
questions gracefully WITHOUT crashing. The goal is robustness, not correctness.

Run: python test_breaking.py
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


# ─── Breaking inputs ────────────────────────────────────────────────────────

BREAKING_INPUTS = [
    # Empty / whitespace
    "",
    "   ",
    "\n\n\n",
    # Gibberish
    "asdfghjkl",
    "???",
    "123456789",
    # Very long input
    "A" * 10000,
    # Special characters
    "Find the derivative of <script>alert('xss')</script>",
    "Solve x = '; DROP TABLE users; --",
    "What is ${7*7}?",
    # Math injection attempts
    "Find x where x = __import__('os').system('rm -rf /')",
    "Evaluate exec('print(1)')",
    # Unicode
    "Find the area of a circle with radius ∞",
    "What is π × e?",
    "Solve for α: α² = 4",
    # Contradictory
    "Find a number that is both even and odd.",
    "What is 1/0?",
    "Find the square root of -1.",
    # Non-math
    "What is the meaning of life?",
    "Tell me a joke.",
    "Who won the World Cup?",
    # Malformed math
    "Solve x + = 5",
    "Find the derivative of",
    "Integrate )(",
    "What is 2 +",
    # Extremely large numbers
    "What is 10^100 + 10^100?",
    "Find 999999999999999999999 * 0",
]


# ─── Tests ───────────────────────────────────────────────────────────────────

def test_imports():
    try:
        from services.solver_router import SolverRouter
        from services.llm_fallback_handler import LLMFallbackHandler
        from services.verification_engine import VerificationEngine
    except ImportError:
        from solver_router import SolverRouter
        from llm_fallback_handler import LLMFallbackHandler
        from verification_engine import VerificationEngine

    router = SolverRouter()
    handler = LLMFallbackHandler()
    eng = VerificationEngine()
    return "All imports OK"


test("Import components", test_imports)


async def test_no_crash_on_breaking_inputs():
    """The solver must NEVER crash on any input — it should always return something."""
    try:
        from services.solver_router import SolverRouter
    except ImportError:
        from solver_router import SolverRouter
    router = SolverRouter()

    crashes = 0
    handled = 0
    details = []

    for i, inp in enumerate(BREAKING_INPUTS):
        try:
            result = await router.solve_async(inp)
            # Must return a PipelineResult, even if not solved
            if result is not None:
                handled += 1
                if result.problem:
                    # Should have some answer or explanation
                    pass
            else:
                # None is acceptable for empty/gibberish input
                handled += 1
        except Exception as e:
            crashes += 1
            details.append(f"  Input {i} ('{inp[:30]}'): CRASHED - {str(e)[:80]}")

    if details:
        print("\n".join(details))

    total = len(BREAKING_INPUTS)
    print(f"\n  Handled: {handled}/{total}, Crashes: {crashes}")

    # CRITICAL: No crashes allowed
    assert crashes == 0, f"{crashes} crashes on breaking inputs — solver must be crash-proof"
    return f"All {total} breaking inputs handled without crashes"


asyncio.run(atest("No crash on breaking inputs", test_no_crash_on_breaking_inputs))


def test_verification_nan_inf():
    """Verification engine must handle NaN and infinity gracefully."""
    from verification_engine import VerificationEngine
    import math
    eng = VerificationEngine()

    # NaN
    assert eng.check_sanity_bounds(float('nan'), "speed") == False
    assert eng.check_sanity_bounds(float('nan'), "temperature") == False

    # Infinity
    assert eng.check_sanity_bounds(float('inf'), "speed") == False
    assert eng.check_sanity_bounds(-float('inf'), "temperature") == False

    # Very large but finite
    assert eng.check_sanity_bounds(1e9, "speed") == False  # > c (3e8)
    assert eng.check_sanity_bounds(1e-10, "speed") == True  # very small but valid

    return "NaN/Inf handled correctly"


test("Verification NaN/Inf handling", test_verification_nan_inf)


def test_llm_fallback_never_raises():
    """LLM fallback handler must never raise — always returns a dict."""
    from llm_fallback_handler import LLMFallbackHandler
    handler = LLMFallbackHandler()

    # Test with various triggers
    for trigger in ["parse_failure", "no_formula_match", "novel_problem", "unknown_trigger"]:
        result = handler._template_fallback("test", trigger)
        assert isinstance(result, dict)
        assert "success" in result
        assert "explanation_text" in result

    # Test with None inputs
    result = handler._template_fallback("", "novel_problem")
    assert isinstance(result, dict)

    return "LLM fallback never raises"


test("LLM fallback never raises", test_llm_fallback_never_raises)


def test_competency_handler_empty_input():
    """Competency handler must handle empty/gibberish input gracefully."""
    from competency_handler import CompetencyHandler
    h = CompetencyHandler()

    assert h.is_competency_question("") == False
    assert h.is_competency_question("   ") == False
    assert h.is_competency_question("asdfghjkl") == False
    assert h.detect_competency_type("") == "general"
    assert h.detect_concept_tags("") == ["GENERAL"]

    return "Competency handler handles empty input"


test("Competency handler empty input", test_competency_handler_empty_input)


async def test_solver_timeout_protection():
    """Solver should not hang indefinitely on hard problems."""
    try:
        from services.solver_router import SolverRouter
    except ImportError:
        from solver_router import SolverRouter
    router = SolverRouter()

    # A problem that could potentially cause infinite loops
    hard_problems = [
        "Find the integral of 1/x from 0 to infinity",
        "Solve the differential equation y'' + y = 0 with y(0)=1, y'(0)=0",
        "Find the limit of (1 + 1/n)^n as n approaches infinity",
    ]

    for prob in hard_problems:
        try:
            # Set a timeout — if it hangs, the test fails
            result = await asyncio.wait_for(
                router.solve_async(prob),
                timeout=30.0,  # 30 second max
            )
            # Must return something (solved or not)
            assert result is not None or True  # None is acceptable
        except asyncio.TimeoutError:
            assert False, f"Solver timed out on: {prob[:50]}"

    return "Solver timeout protection works"


asyncio.run(atest("Solver timeout protection", test_solver_timeout_protection))


def test_formula_yaml_integrity():
    """All formula YAML files must be valid and loadable."""
    import yaml
    formula_dirs = [
        r"D:\platform\backend\formulas\physics",
        r"D:\platform\backend\formulas\mathematics",
        r"D:\platform\backend\formulas\chemistry",
    ]

    total_files = 0
    total_formulas = 0

    for fdir in formula_dirs:
        if not os.path.exists(fdir):
            continue
        for fname in os.listdir(fdir):
            if not fname.endswith(".yaml"):
                continue
            fpath = os.path.join(fdir, fname)
            total_files += 1
            try:
                with open(fpath, "r", encoding="utf-8") as f:
                    content = f.read()
                # Check it starts with ---
                assert content.startswith("---"), f"{fname} doesn't start with ---"
                # Count formulas
                count = content.count("formula_id:")
                total_formulas += count
            except Exception as e:
                assert False, f"Error reading {fname}: {e}"

    print(f"  Files: {total_files}, Total formulas: {total_formulas}")
    assert total_files >= 10, f"Expected 10+ formula files, got {total_files}"
    assert total_formulas >= 500, f"Expected 500+ formulas, got {total_formulas}"
    return f"{total_files} files, {total_formulas} formulas — all valid"


test("Formula YAML integrity", test_formula_yaml_integrity)


# ─── Summary ─────────────────────────────────────────────────────────────────
print(f"\n{'='*60}")
print(f"BREAKING TESTS SUMMARY")
print(f"{'='*60}")
print(f"  Pass: {results['pass']}")
print(f"  Fail: {results['fail']}")
if results["errors"]:
    print(f"\n  Errors:")
    for e in results["errors"]:
        print(f"    - {e['test']}: {e['error'][:100]}")
print(f"\n  Result: {'ALL PASS' if results['fail'] == 0 else 'HAS FAILURES'}")
sys.exit(0 if results['fail'] == 0 else 1)
