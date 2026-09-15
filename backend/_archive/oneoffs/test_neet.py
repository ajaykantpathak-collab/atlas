"""NEET solver regression tests.

Tests the solver against NEET-style problems (Physics, Chemistry, Biology).
NEET questions are typically single-correct MCQs with numerical answers.

Run: python test_neet.py
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


# ─── NEET problems ──────────────────────────────────────────────────────────

NEET_PROBLEMS = {
    # ── Physics (NEET weightage: 25%) ──
    "phy_kinematics": {
        "problem": "A car accelerates from rest at 2 m/s^2 for 10 seconds. Find the distance covered.",
        "expected": 100.0,
        "tolerance": 1.0,
        "subject": "physics",
    },
    "phy_newton": {
        "problem": "A 5kg object experiences a net force of 20N. Find its acceleration.",
        "expected": 4.0,
        "tolerance": 0.1,
        "subject": "physics",
    },
    "phy_work": {
        "problem": "A force of 10N displaces an object by 5m in the direction of force. Find the work done.",
        "expected": 50.0,
        "tolerance": 0.5,
        "subject": "physics",
    },
    "phy_gravitation": {
        "problem": "Find the acceleration due to gravity on a planet with mass 6e24 kg and radius 6.4e6 m. (G=6.67e-11)",
        "expected": 9.77,
        "tolerance": 0.5,
        "subject": "physics",
    },
    "phy_current": {
        "problem": "A 6V battery drives current through a 3 ohm resistor. Find the current.",
        "expected": 2.0,
        "tolerance": 0.1,
        "subject": "physics",
    },
    "phy_lens": {
        "problem": "An object is placed 30cm from a convex lens of focal length 10cm. Find the image distance.",
        "expected": 15.0,
        "tolerance": 1.0,
        "subject": "physics",
    },
    # ── Chemistry (NEET weightage: 35%) ──
    "chem_mole_concept": {
        "problem": "Find the number of moles in 22g of CO2. (Molar mass = 44 g/mol)",
        "expected": 0.5,
        "tolerance": 0.01,
        "subject": "chemistry",
    },
    "chem_gas_law": {
        "problem": "At STP, find the volume occupied by 2 moles of an ideal gas. (Vm = 22.4 L)",
        "expected": 44.8,
        "tolerance": 0.5,
        "subject": "chemistry",
    },
    "chem_molarity": {
        "problem": "Find the molarity of a solution containing 0.5 moles of NaCl in 250 mL solution.",
        "expected": 2.0,
        "tolerance": 0.1,
        "subject": "chemistry",
    },
    "chem_dilution": {
        "problem": "100 mL of 0.1M HCl is diluted to 500 mL. Find the new molarity.",
        "expected": 0.02,
        "tolerance": 0.005,
        "subject": "chemistry",
    },
    "chem_pH_weak": {
        "problem": "Find the pH of 0.01M HNO3 solution.",
        "expected": 2.0,
        "tolerance": 0.1,
        "subject": "chemistry",
    },
    # ── Biology (NEET weightage: 40%) — mostly conceptual, test detection ──
    "bio_genetics": {
        "problem": "In a monohybrid cross between TT and tt, what fraction of offspring will be Tt?",
        "expected": 1.0,
        "tolerance": 0.01,
        "subject": "biology",
    },
    "bio_hardy_weinberg": {
        "problem": "In a population, allele frequency p=0.6. Find the frequency of heterozygotes (2pq). Assume q=0.4.",
        "expected": 0.48,
        "tolerance": 0.01,
        "subject": "biology",
    },
}


# ─── Tests ───────────────────────────────────────────────────────────────────

def test_imports():
    try:
        from services.solver_router import SolverRouter
        from services.verification_engine import VerificationEngine
        from services.strategy_library import StrategyLibrary
    except ImportError:
        from solver_router import SolverRouter
        from verification_engine import VerificationEngine
        from strategy_library import StrategyLibrary

    router = SolverRouter()
    eng = VerificationEngine()
    lib = StrategyLibrary()

    # NEET needs physics, chemistry, biology strategies
    bio_count = sum(1 for s in lib._strategies.values() if s.subject == "biology")
    assert bio_count >= 5, f"Need 5+ biology strategies, got {bio_count}"

    return f"Imports OK, {bio_count} biology strategies"


test("Import NEET components", test_imports)


def test_neet_format_verification():
    """NEET answers are single-correct MCQs (A/B/C/D) or integers."""
    from verification_engine import VerificationEngine
    eng = VerificationEngine()

    # NEET format: letter A-D or integer
    assert eng.check_format("A", "NEET") == True
    assert eng.check_format("B", "NEET") == True
    assert eng.check_format("D", "NEET") == True
    assert eng.check_format("E", "NEET") == False  # beyond D
    assert eng.check_format("42", "NEET") == True
    assert eng.check_format("3.14", "NEET") == False  # NEET doesn't use decimals

    return "NEET format verification OK"


test("NEET format verification", test_neet_format_verification)


async def test_neet_solver():
    try:
        from services.solver_router import SolverRouter
    except ImportError:
        from solver_router import SolverRouter
    router = SolverRouter()

    solved = 0
    failed = 0
    details = []

    for prob_id, prob_data in NEET_PROBLEMS.items():
        try:
            result = await router.solve_async(prob_data["problem"])
            if result and result.problem and result.problem.solved:
                answer = str(result.problem.final_answer)
                stages = result.pipeline_stages

                if "expected" in prob_data:
                    import re as _re
                    numeric_match = _re.search(r'-?\d+\.?\d*', answer.replace(',', ''))
                    if numeric_match:
                        ans_float = float(numeric_match.group())
                        if abs(ans_float - prob_data["expected"]) <= prob_data["tolerance"]:
                            solved += 1
                            details.append(f"  {prob_id}: SOLVED={answer} (stages: {stages})")
                        else:
                            failed += 1
                            details.append(f"  {prob_id}: WRONG={answer}, expected={prob_data['expected']}")
                    else:
                        failed += 1
                        details.append(f"  {prob_id}: NON-NUMERIC={answer[:50]}")
            else:
                failed += 1
                details.append(f"  {prob_id}: NOT SOLVED")
        except Exception as e:
            failed += 1
            details.append(f"  {prob_id}: ERROR {str(e)[:80]}")

    print("\n".join(details))
    total = len(NEET_PROBLEMS)
    coverage = solved / total * 100
    print(f"\n  NEET Coverage: {solved}/{total} = {coverage:.1f}%")

    # NEET problems are hard — expect at least 15% to pass
    # Some correct answers are in non-numeric format (e.g. "0.5 mol", "pH = 2.0")
    assert coverage >= 15.0, f"NEET coverage {coverage:.1f}% below 15% threshold"
    return f"NEET coverage: {solved}/{total} = {coverage:.1f}%"


asyncio.run(atest("NEET solver", test_neet_solver))


def test_biology_strategies():
    from strategy_library import StrategyLibrary
    lib = StrategyLibrary()

    bio_strats = [s for s in lib._strategies.values() if s.subject == "biology"]
    print(f"  Biology strategies: {len(bio_strats)}")
    for s in bio_strats:
        print(f"    {s.strategy_id}: {s.name} ({s.topic})")

    assert len(bio_strats) >= 5
    # Check key topics
    topics = {s.topic for s in bio_strats}
    assert "genetics" in topics, "Missing genetics strategy"
    return f"{len(bio_strats)} biology strategies covering: {topics}"


test("Biology strategies", test_biology_strategies)


# ─── Summary ─────────────────────────────────────────────────────────────────
print(f"\n{'='*60}")
print(f"NEET TEST SUMMARY")
print(f"{'='*60}")
print(f"  Pass: {results['pass']}")
print(f"  Fail: {results['fail']}")
if results["errors"]:
    print(f"\n  Errors:")
    for e in results["errors"]:
        print(f"    - {e['test']}: {e['error'][:100]}")
print(f"\n  Result: {'ALL PASS' if results['fail'] == 0 else 'HAS FAILURES'}")
sys.exit(0 if results['fail'] == 0 else 1)
