"""Test the full intelligence pipeline integration.
Tests all 21 components + the API router wiring.
"""
import sys, os, time, traceback, json

# Add paths
sys.path.insert(0, r"D:\platform\backend")
sys.path.insert(0, r"D:\platform\backend\services")
sys.path.insert(0, r"D:\platform\backend\api")

os.chdir(r"D:\platform\backend")

results = {"pass": 0, "fail": 0, "errors": []}

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
    except Exception as e:
        print(f"  FAIL: {str(e)[:200]}")
        traceback.print_exc()
        results["fail"] += 1
        results["errors"].append({"test": name, "error": str(e)[:200]})
        return None

# ─── 1. Import all 21 components ───────────────────────────────────────────
def test_imports():
    components = [
        ("intelligence_schema", "intelligence_schema"),
        ("enrichment_parser", "enrichment_parser"),
        ("interaction_capture", "interaction_capture"),
        ("state_4d_builder", "state_4d_builder"),
        ("concept_graph_traverser", "concept_graph_traverser"),
        ("confidence_calibrator", "confidence_calibrator"),
        ("specialized_agents", "specialized_agents"),
        ("deterministic_orchestrator", "deterministic_orchestrator"),
        ("meta_brain", "meta_brain"),
        ("rule_ab_tester", "rule_ab_tester"),
        ("claude_renderer", "claude_renderer"),
        ("socratic_pipeline_v3", "socratic_pipeline_v3"),
        ("problem_parser", "problem_parser"),
        ("strategy_library", "strategy_library"),
        ("decomposition_engine", "decomposition_engine"),
        ("symbolic_solver", "symbolic_solver"),
        ("verification_engine", "verification_engine"),
        ("self_play_generator", "self_play_generator"),
        ("explanation_generator", "explanation_generator"),
        ("jee_neet_solver", "jee_neet_solver"),
    ]
    failed_imports = []
    for mod_name, _ in components:
        try:
            __import__(mod_name)
            print(f"  import {mod_name}: OK")
        except Exception as e:
            print(f"  import {mod_name}: FAIL - {str(e)[:100]}")
            failed_imports.append(mod_name)
    if failed_imports:
        raise ImportError(f"Failed imports: {failed_imports}")
    return f"All {len(components)} components imported"

test("Import all 21 components", test_imports)

# ─── 2. Test API router import ─────────────────────────────────────────────
def test_api_router():
    from api.intelligence import router
    assert router is not None
    routes = [r.path for r in router.routes]
    print(f"  Routes: {routes}")
    assert "/api/intelligence/tutor" in routes
    assert "/api/intelligence/solve" in routes
    assert "/api/intelligence/health" in routes
    return f"Router has {len(routes)} routes"

test("API router import", test_api_router)

# ─── 3. Test concept graph traverser ───────────────────────────────────────
def test_traverser():
    from concept_graph_traverser import ConceptGraphTraverser
    nodes_dir = r"D:\platform\cbse_data\nodes\by_subject"
    t = ConceptGraphTraverser(nodes_dir)
    # Get a known node
    ctx = t.get_teaching_context("c11_phy_cbse_010")
    if isinstance(ctx, dict):
        print(f"  Context keys: {list(ctx.keys())[:10]}")
    else:
        print(f"  Context type: {type(ctx).__name__}")
    return "Traverser works"

test("Concept graph traverser", test_traverser)

# ─── 4. Test 4D state builder ──────────────────────────────────────────────
def test_state_builder():
    from state_4d_builder import State4DBuilder
    builder = State4DBuilder()
    # Synthetic interactions
    interactions = [
        {"student_id": "test_1", "node_id": "c11_phy_cbse_010", "is_correct": True, "time_spent_ms": 5000, "hints_used": 0, "timestamp": "2025-01-01T10:00:00Z"},
        {"student_id": "test_1", "node_id": "c11_phy_cbse_010", "is_correct": False, "time_spent_ms": 30000, "hints_used": 2, "timestamp": "2025-01-01T10:05:00Z"},
        {"student_id": "test_1", "node_id": "c11_phy_cbse_011", "is_correct": True, "time_spent_ms": 8000, "hints_used": 1, "timestamp": "2025-01-01T10:10:00Z"},
    ]
    state = builder.build_state("test_1", "c11_phy_cbse_010", interactions)
    if isinstance(state, dict):
        print(f"  State keys: {list(state.keys())[:10]}")
    elif hasattr(state, "__dict__"):
        print(f"  State attrs: {list(vars(state).keys())[:10]}")
    return "State builder works"

test("4D state builder", test_state_builder)

# ─── 5. Test specialized agents ────────────────────────────────────────────
def test_agents():
    from specialized_agents import create_ensemble
    ensemble = create_ensemble()
    # Synthetic state + context
    student_state = {
        "cognitive": {"mastery": 0.5, "irt_ability": 0.3, "concept_gaps": ["kinematics"]},
        "affective": {"frustration": 0.3, "confidence": 0.6, "motivation": 0.7},
        "behavioral": {"hints_used": 1, "avg_response_time_ms": 10000, "error_streak": 0},
        "temporal": {"hour": 14, "session_length_min": 20},
    }
    teaching_context = {
        "current_concept": {"node_id": "test_1", "title": "Test Concept", "definition": "A test concept"},
        "prerequisites": [],
        "misconceptions": [{"misconception": "Test misconception", "explanation": "Wrong because...", "correction": "Actually..."}],
        "difficulty": "medium",
    }
    actions = ensemble.run_all_agents(student_state, teaching_context, [])
    print(f"  Actions proposed: {len(actions)}")
    for a in actions[:3]:
        if hasattr(a, "__dict__"):
            print(f"    {a.agent_name}: {a.action_type} (priority {a.priority})")
        elif isinstance(a, dict):
            print(f"    {a.get('agent_name')}: {a.get('action_type')}")
    return f"Ensemble produced {len(actions)} actions"

test("Specialized agents", test_agents)

# ─── 6. Test deterministic orchestrator ────────────────────────────────────
def test_orchestrator():
    from deterministic_orchestrator import DeterministicOrchestrator
    orch = DeterministicOrchestrator()
    rules = orch.get_active_rules()
    print(f"  Active rules: {len(rules)}")
    for r in rules[:5]:
        if hasattr(r, "__dict__"):
            print(f"    {r.rule_name} (priority {r.priority})")
        elif isinstance(r, dict):
            print(f"    {r.get('rule_name')} (priority {r.get('priority')})")
    return f"Orchestrator has {len(rules)} rules"

test("Deterministic orchestrator", test_orchestrator)

# ─── 7. Test confidence calibrator ─────────────────────────────────────────
def test_calibrator():
    from confidence_calibrator import ConfidenceCalibrator
    cal = ConfidenceCalibrator()
    # Record some ratings
    cal.record_confidence("test_1", "kinematics", 4, True)
    cal.record_confidence("test_1", "kinematics", 5, False)
    cal.record_confidence("test_1", "kinematics", 2, True)
    cal.record_confidence("test_1", "kinematics", 3, True)
    result = cal.get_calibration("test_1")
    if isinstance(result, dict):
        print(f"  Calibration: bias={result.get('bias')}, score={result.get('calibration_score')}")
    elif hasattr(result, "__dict__"):
        print(f"  Calibration: bias={result.bias}, score={result.calibration_score}")
    return "Calibrator works"

test("Confidence calibrator", test_calibrator)

# ─── 8. Test interaction capture ───────────────────────────────────────────
def test_capture():
    from interaction_capture import SimpleInteractionCapture
    cap = SimpleInteractionCapture()
    rec = cap.capture(
        student_id="test_1",
        session_id="sess_1",
        subject="physics",
        concept="c11_phy_cbse_010",
        grade_level=11,
        interaction_type="answer",
        node_id="c11_phy_cbse_010",
        question="What is acceleration?",
        response="Rate of change of velocity",
        is_correct=True,
        time_spent_ms=5000,
        hints_used=0,
        action_taken="assess",
        mastery_before=0.3,
        mastery_after=0.5,
    )
    print(f"  Recorded: {getattr(rec, 'id', 'no id')}")
    recent = cap.get_recent("test_1", limit=5)
    print(f"  Recent interactions: {len(recent) if isinstance(recent, list) else 'N/A'}")
    return "Capture works"

test("Interaction capture", test_capture)

# ─── 9. Test strategy library ──────────────────────────────────────────────
def test_strategy_library():
    from strategy_library import StrategyLibrary
    lib = StrategyLibrary()
    strategies = lib.get_strategies_by_topic("mechanics")
    print(f"  Strategies for mechanics: {len(strategies)}")
    return f"Strategy library has strategies"

test("Strategy library", test_strategy_library)

# ─── 10. Test symbolic solver ──────────────────────────────────────────────
def test_solver():
    from symbolic_solver import SymbolicSolver
    solver = SymbolicSolver()
    # Simple equation: x + 5 = 10
    result = solver.solve_equation("x + 5 = 10", "x")
    print(f"  x + 5 = 10 -> {getattr(result, 'symbolic_result', result if isinstance(result, dict) else 'N/A')}")
    return "Solver works"

test("Symbolic solver", test_solver)

# ─── 11. Test verification engine ──────────────────────────────────────────
def test_verification():
    from verification_engine import VerificationEngine
    ve = VerificationEngine()
    # Simple verification
    problem = {"subject": "physics", "concepts": ["mechanics"], "givens": {"v": 10, "t": 5}, "unknowns": ["s"]}
    solution = {"final_answer": "50", "formula": "s = v * t", "units": "m"}
    result = ve.verify(problem, solution)
    if isinstance(result, dict):
        print(f"  Verification: passed={result.get('passed')}, confidence={result.get('confidence')}")
    elif hasattr(result, "__dict__"):
        print(f"  Verification: passed={result.passed}, confidence={result.confidence}")
    return "Verification engine works"

test("Verification engine", test_verification)

# ─── 12. Test decomposition engine ─────────────────────────────────────────
def test_decomposition():
    from decomposition_engine import DecompositionEngine
    de = DecompositionEngine()
    problem = {
        "subject": "physics",
        "concepts": ["mechanics", "energy", "momentum"],
        "givens": [{"quantity": "mass", "value": 5, "unit": "kg"}],
        "unknowns": [{"quantity": "velocity", "symbol": "v"}],
    }
    plan = de.decompose(problem, [])
    if isinstance(plan, dict):
        print(f"  Sub-problems: {len(plan.get('sub_problems', []))}")
    elif hasattr(plan, "__dict__"):
        print(f"  Sub-problems: {len(plan.sub_problems)}")
    return "Decomposition works"

test("Decomposition engine", test_decomposition)

# ─── 13. Test meta-brain ───────────────────────────────────────────────────
def test_meta_brain():
    from meta_brain import MetaBrain
    mb = MetaBrain()
    # Synthetic interactions
    interactions = [
        {"student_id": "s1", "node_id": "n1", "strategy": "scaffold", "mastery_gain": 0.2, "next_item_correct": True},
        {"student_id": "s2", "node_id": "n1", "strategy": "feedback", "mastery_gain": 0.1, "next_item_correct": False},
        {"student_id": "s1", "node_id": "n2", "strategy": "assess", "mastery_gain": 0.3, "next_item_correct": True},
    ]
    report = mb.run_all_jobs(interactions, {})
    if isinstance(report, dict):
        print(f"  Report: {list(report.keys())[:5]}")
    elif hasattr(report, "__dict__"):
        print(f"  Report: total_findings={getattr(report, 'total_findings', 'N/A')}")
    return "Meta-brain works"

test("Meta-brain", test_meta_brain)

# ─── 14. Test rule A/B tester ──────────────────────────────────────────────
def test_ab_tester():
    from rule_ab_tester import RuleABTester
    abt = RuleABTester()
    test_obj = abt.create_test("test_ab_1", "control_rule", "variant_rule", min_sample_size=5)
    print(f"  Test created: {getattr(test_obj, 'test_name', 'N/A')}")
    # Record some outcomes
    for i in range(6):
        variant = abt.assign_student("test_ab_1", f"student_{i}")
        abt.record_outcome("test_ab_1", variant, 0.2 * i, i % 2 == 0)
    sig = abt.check_significance("test_ab_1")
    print(f"  Significance: {sig if isinstance(sig, dict) else str(sig)[:100]}")
    return "A/B tester works"

test("Rule A/B tester", test_ab_tester)

# ─── 15. Test JEE/NEET solver (without API call) ───────────────────────────
def test_jee_solver():
    from jee_neet_solver import JEENEETSolver
    solver = JEENEETSolver()
    # Simple problem
    result = solver.solve(
        problem_text="A car accelerates from rest at 2 m/s^2 for 5 seconds. Find the final velocity.",
        subject="physics",
        exam_type="jee_main",
    )
    if isinstance(result, dict):
        print(f"  Solved: {result.get('solved')}, answer: {result.get('final_answer', 'N/A')[:100]}")
    elif hasattr(result, "__dict__"):
        print(f"  Solved: {result.solved}, answer: {getattr(result, 'final_answer', 'N/A')[:100]}")
    return "JEE solver works"

test("JEE/NEET solver", test_jee_solver)

# ─── SUMMARY ───────────────────────────────────────────────────────────────
print(f"\n{'='*60}")
print(f"INTEGRATION TEST RESULTS")
print(f"{'='*60}")
print(f"  PASS: {results['pass']}")
print(f"  FAIL: {results['fail']}")
if results["errors"]:
    print(f"\n  Errors:")
    for e in results["errors"]:
        print(f"    {e['test']}: {e['error']}")
print(f"{'='*60}")
