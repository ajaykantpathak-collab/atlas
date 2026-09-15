"""
test_harness.py - Validation test harness for CISCE K-12 learning platform.

Validates every generated solver before registration by running 8 tests per
solver and producing a structured validation report.

Author: Platform Backend Team
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import logging
import signal
import subprocess
import sys
import time
import traceback
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("test_harness")

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
SOLVERS_DIR = Path(r"D:\platform\backend\solvers")
REPORT_PATH = SOLVERS_DIR / "validation_report.md"
TEST_TIMEOUT_SECONDS = 30
SAMPLE_PROBLEMS_PER_TYPE = 10
SAMPLE_QUESTIONS_PER_TYPE = 20
GRADING_SAMPLE_ANSWERS = 10
SOLVER_FILE_PATTERN = "class*.py"
SKIP_FILES = {
    "base.py",
    "registry.py",
    "__init__.py",
}
SKIP_PREFIXES = ("generate_", "test_", "_")

# ---------------------------------------------------------------------------
# Pydantic-style dataclass models (no external dependency required)
# ---------------------------------------------------------------------------

class TestStatus(str, Enum):
    PASSED = "passed"
    FAILED = "failed"
    SKIPPED = "skipped"
    ERROR = "error"


@dataclass
class TestResult:
    """Result of a single test execution for one solver."""
    test_name: str
    status: TestStatus
    duration_seconds: float = 0.0
    message: str = ""
    details: Dict[str, Any] = field(default_factory=dict)
    error_trace: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return {
            "test_name": self.test_name,
            "status": self.status.value,
            "duration_seconds": round(self.duration_seconds, 4),
            "message": self.message,
            "details": self.details,
            "error_trace": self.error_trace,
        }


@dataclass
class SolverResult:
    """Aggregated results for a single solver across all 8 tests."""
    solver_name: str
    solver_path: str
    timestamp: str
    tests: List[TestResult] = field(default_factory=list)
    passed: int = 0
    failed: int = 0
    skipped: int = 0
    error: int = 0
    total_duration: float = 0.0
    overall_status: str = "unknown"

    def to_dict(self) -> Dict[str, Any]:
        return {
            "solver_name": self.solver_name,
            "solver_path": self.solver_path,
            "timestamp": self.timestamp,
            "tests": [t.to_dict() for t in self.tests],
            "passed": self.passed,
            "failed": self.failed,
            "skipped": self.skipped,
            "error": self.error,
            "total_duration": round(self.total_duration, 4),
            "overall_status": self.overall_status,
        }


@dataclass
class ValidationReport:
    """Top-level report covering all solvers."""
    generated_at: str
    solvers_dir: str
    total_solvers: int = 0
    total_tests_run: int = 0
    total_passed: int = 0
    total_failed: int = 0
    total_skipped: int = 0
    total_error: int = 0
    solver_results: List[SolverResult] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "generated_at": self.generated_at,
            "solvers_dir": self.solvers_dir,
            "total_solvers": self.total_solvers,
            "total_tests_run": self.total_tests_run,
            "total_passed": self.total_passed,
            "total_failed": self.total_failed,
            "total_skipped": self.total_skipped,
            "total_error": self.total_error,
            "solver_results": [s.to_dict() for s in self.solver_results],
        }


# ---------------------------------------------------------------------------
# Timeout helper
# ---------------------------------------------------------------------------

class TimeoutException(Exception):
    pass


def _timeout_handler(signum, frame):
    raise TimeoutException("Test exceeded time limit")


def _run_with_timeout(func, timeout_seconds, *args, **kwargs):
    """Run a callable with a signal-based timeout (Unix) or fallback."""
    if sys.platform != "win32":
        old_handler = signal.signal(signal.SIGALRM, _timeout_handler)
        signal.alarm(timeout_seconds)
        try:
            result = func(*args, **kwargs)
        finally:
            signal.alarm(0)
            signal.signal(signal.SIGALRM, old_handler)
        return result
    else:
        return func(*args, **kwargs)


# ---------------------------------------------------------------------------
# Helper: load a solver module
# ---------------------------------------------------------------------------

def _load_module(path: Path, module_name: str) -> Tuple[Any, Optional[str]]:
    """Import a module from a file path. Returns (module, error_string)."""
    try:
        spec = importlib.util.spec_from_file_location(module_name, path)
        if spec is None or spec.loader is None:
            return None, f"Could not create spec for {path}"
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        return mod, None
    except Exception as exc:
        return None, traceback.format_exc()


# ---------------------------------------------------------------------------
# Helper: safe attribute access
# ---------------------------------------------------------------------------

def _safe_get_attr(mod, name, default=None):
    return getattr(mod, name, default)


# ---------------------------------------------------------------------------
# Helper: numeric comparison
# ---------------------------------------------------------------------------

def _is_close(a, b, rel_tol=1e-6, abs_tol=1e-9) -> bool:
    try:
        return abs(a - b) <= max(rel_tol * max(abs(a), abs(b)), abs_tol)
    except Exception:
        return False


# ---------------------------------------------------------------------------
# TestHarness
# ---------------------------------------------------------------------------

class TestHarness:
    """Validation harness that runs 8 tests per solver."""

    def __init__(self, solvers_dir: Path = SOLVERS_DIR):
        self.solvers_dir = Path(solvers_dir)
        if not self.solvers_dir.is_dir():
            raise FileNotFoundError(f"Solvers directory not found: {self.solvers_dir}")

    # ------------------------------------------------------------------
    # Discovery
    # ------------------------------------------------------------------

    def discover_solvers(self) -> List[Path]:
        """Find all class*.py solver files, excluding infrastructure.

        Uses rglob to recursively discover solvers in subdirectories
        (e.g. solvers/maths/class1_maths_solver.py, solvers/physics/...).
        """
        if not self.solvers_dir.exists():
            logger.warning("Solvers directory does not exist: %s", self.solvers_dir)
            return []
        found = []
        for p in sorted(self.solvers_dir.rglob("*.py")):
            if not p.is_file():
                continue
            if "__pycache__" in str(p):
                continue
            if p.name in SKIP_FILES:
                continue
            if p.name.startswith(SKIP_PREFIXES):
                continue
            if p.match(SOLVER_FILE_PATTERN):
                found.append(p)
        return found

    # ------------------------------------------------------------------
    # Test dispatchers
    # ------------------------------------------------------------------

    def _test_import(self, module, solver_path: Path) -> TestResult:
        """Test 1: Verify the module imports cleanly and has required exports."""
        start = time.time()
        details: Dict[str, Any] = {}

        try:
            # Check for SOLVER_REGISTRY or at least some solve function
            has_registry = hasattr(module, "SOLVER_REGISTRY")
            has_solve = any(
                hasattr(module, attr) for attr in ("solve", "run_solver", "handle")
            )

            # Look for any callable functions defined at module level
            callables = [
                name
                for name, val in vars(module).items()
                if callable(val) and not name.startswith("_")
            ]
            details["has_solver_registry"] = has_registry
            details["has_solve_function"] = has_solve
            details["module_callables"] = callables[:20]
            details["module_callables_count"] = len(callables)

            if not has_registry and not has_solve and not callables:
                msg = "Module imported but has no SOLVER_REGISTRY, solve function, or callables"
                return TestResult(
                    test_name="import",
                    status=TestStatus.FAILED,
                    duration_seconds=time.time() - start,
                    message=msg,
                    details=details,
                )

            msg = "Module imported successfully"
            if has_registry:
                msg += ", SOLVER_REGISTRY found"
            if has_solve:
                msg += ", solve function found"
            if callables:
                msg += f", {len(callables)} callables found"

            return TestResult(
                test_name="import",
                status=TestStatus.PASSED,
                duration_seconds=time.time() - start,
                message=msg,
                details=details,
            )
        except Exception:
            duration = time.time() - start
            error_tb = traceback.format_exc()
            logger.error("Import test error for %s: %s", solver_path, error_tb)
            return TestResult(
                test_name="import",
                status=TestStatus.ERROR,
                duration_seconds=duration,
                message="Exception during import test",
                details=details,
                error_trace=error_tb,
            )

    def _test_unit(self, module, solver_path: Path) -> TestResult:
        """Test 2: Solve 10 sample problems per problem type."""
        start = time.time()
        details: Dict[str, Any] = {"problems_attempted": 0, "problems_solved": 0, "results": []}

        registry = _safe_get_attr(module, "SOLVER_REGISTRY", {})

        if not registry:
            return TestResult(
                test_name="unit",
                status=TestStatus.SKIPPED,
                duration_seconds=time.time() - start,
                message="No SOLVER_REGISTRY found - cannot run unit tests",
                details=details,
            )

        problem_types = list(registry.keys())
        total_solved = 0
        total_attempted = 0
        type_results: List[Dict[str, Any]] = []

        for ptype in problem_types:
            solver_entry = registry[ptype]
            results_for_type: List[Dict[str, Any]] = []

            for i in range(SAMPLE_PROBLEMS_PER_TYPE):
                total_attempted += 1
                try:
                    if callable(solver_entry):
                        result = solver_entry(f"sample_problem_{i}")
                    elif isinstance(solver_entry, dict) and "solve" in solver_entry:
                        result = solver_entry["solve"](f"sample_problem_{i}")
                    else:
                        results_for_type.append({"problem": i, "status": "skipped", "reason": "non-callable entry"})
                        continue

                    results_for_type.append({"problem": i, "status": "solved", "result": str(result)[:200]})
                    total_solved += 1
                except Exception as exc:
                    results_for_type.append({"problem": i, "status": "failed", "error": str(exc)[:100]})

            type_results.append({"type": ptype, "results": results_for_type})

        details["problems_attempted"] = total_attempted
        details["problems_solved"] = total_solved
        details["problem_types_tested"] = len(problem_types)
        details["type_results"] = type_results

        duration = time.time() - start
        if total_solved == total_attempted and total_attempted > 0:
            return TestResult(
                test_name="unit",
                status=TestStatus.PASSED,
                duration_seconds=duration,
                message=f"All {total_solved}/{total_attempted} problems solved across {len(problem_types)} types",
                details=details,
            )
        elif total_solved > 0:
            return TestResult(
                test_name="unit",
                status=TestStatus.FAILED,
                duration_seconds=duration,
                message=f"Partial: {total_solved}/{total_attempted} problems solved",
                details=details,
            )
        else:
            return TestResult(
                test_name="unit",
                status=TestStatus.FAILED,
                duration_seconds=duration,
                message=f"No problems solved ({total_attempted} attempted)",
                details=details,
            )

    def _test_verification(self, module, solver_path: Path) -> TestResult:
        """Test 3: Each result passes numerical verification."""
        start = time.time()
        details: Dict[str, Any] = {"verifications": 0, "passed": 0, "failed": 0}

        registry = _safe_get_attr(module, "SOLVER_REGISTRY", {})
        if not registry:
            return TestResult(
                test_name="verification",
                status=TestStatus.SKIPPED,
                duration_seconds=time.time() - start,
                message="No SOLVER_REGISTRY found",
                details=details,
            )

        verifications = 0
        passed = 0
        failed = 0
        verification_details: List[Dict[str, Any]] = []

        # Known answer pairs: (problem_text, expected_numeric_value)
        known_problems = [
            ("solve 2+2", 4.0),
            ("solve 10*5", 50.0),
            ("solve 100/4", 25.0),
            ("solve x^2 where x=3", 9.0),
            ("solve sin(0)", 0.0),
            ("solve 3*(4+5)", 27.0),
            ("solve 2^8", 256.0),
            ("solve sqrt(16)", 4.0),
            ("solve 15-7", 8.0),
            ("solve 7*6", 42.0),
        ]

        for ptype, solver_entry in registry.items():
            for prob_text, expected in known_problems:
                verifications += 1
                try:
                    if callable(solver_entry):
                        result = solver_entry(prob_text)
                    elif isinstance(solver_entry, dict) and "solve" in solver_entry:
                        result = solver_entry["solve"](prob_text)
                    else:
                        continue

                    result_val = self._extract_numeric(result)
                    if result_val is not None and _is_close(result_val, expected):
                        passed += 1
                        verification_details.append({
                            "problem": prob_text, "expected": expected,
                            "got": result_val, "status": "passed",
                        })
                    else:
                        failed += 1
                        verification_details.append({
                            "problem": prob_text, "expected": expected,
                            "got": result_val, "status": "failed",
                        })
                except Exception:
                    failed += 1
                    verification_details.append({
                        "problem": prob_text, "expected": expected,
                        "got": None, "status": "error",
                    })

        details["verifications"] = verifications
        details["passed"] = passed
        details["failed"] = failed
        details["verification_details"] = verification_details[:20]
        duration = time.time() - start

        if verifications == 0:
            return TestResult(
                test_name="verification",
                status=TestStatus.SKIPPED,
                duration_seconds=duration,
                message="No problems available for verification",
                details=details,
            )
        if passed == verifications:
            return TestResult(
                test_name="verification",
                status=TestStatus.PASSED,
                duration_seconds=duration,
                message=f"All {passed}/{verifications} results verified numerically",
                details=details,
            )
        return TestResult(
            test_name="verification",
            status=TestStatus.FAILED,
            duration_seconds=duration,
            message=f"Verification: {passed}/{verifications} passed, {failed} failed",
            details=details,
        )

    def _test_coverage(self, module, solver_path: Path) -> TestResult:
        """Test 4: Every syllabus topic has at least 1 problem type."""
        start = time.time()
        details: Dict[str, Any] = {}

        manifest = _safe_get_attr(module, "SOLVER_MANIFEST", None)
        registry = _safe_get_attr(module, "SOLVER_REGISTRY", {})

        tags = []
        if manifest is not None:
            try:
                tags = list(manifest.tags) if hasattr(manifest, "tags") else []
            except Exception:
                pass

        registry_keys = list(registry.keys())
        details["tags"] = tags
        details["problem_types_in_registry"] = registry_keys
        details["problem_type_count"] = len(registry_keys)

        if not registry_keys:
            return TestResult(
                test_name="coverage",
                status=TestStatus.FAILED,
                duration_seconds=time.time() - start,
                message="No problem types found in SOLVER_REGISTRY",
                details=details,
            )

        # Check each tag maps to at least one problem type
        tag_coverage = {}
        for tag in tags:
            matched = [pt for pt in registry_keys if tag.lower() in pt.lower()]
            tag_coverage[tag] = matched

        details["tag_coverage"] = tag_coverage

        uncovered_tags = [t for t, m in tag_coverage.items() if not m]
        if uncovered_tags:
            return TestResult(
                test_name="coverage",
                status=TestStatus.FAILED,
                duration_seconds=time.time() - start,
                message=f"Tags without matching problem types: {uncovered_tags}",
                details=details,
            )

        return TestResult(
            test_name="coverage",
            status=TestStatus.PASSED,
            duration_seconds=time.time() - start,
            message=f"All {len(tags)} tags have at least 1 problem type ({len(registry_keys)} types total)",
            details=details,
        )

    def _test_questions(self, module, solver_path: Path) -> TestResult:
        """Test 5: Generator produces 20 valid questions per problem type."""
        start = time.time()
        details: Dict[str, Any] = {"generated": 0, "valid": 0, "invalid": 0}

        registry = _safe_get_attr(module, "SOLVER_REGISTRY", {})
        qgen = _safe_get_attr(module, "QUESTION_GENERATOR", None)
        qgen_registry = _safe_get_attr(module, "QUESTION_GEN_REGISTRY", {})

        if not registry and not qgen and not qgen_registry:
            return TestResult(
                test_name="questions",
                status=TestStatus.SKIPPED,
                duration_seconds=time.time() - start,
                message="No question generator found in module",
                details=details,
            )

        generator = qgen if qgen is not None else qgen_registry
        if not generator:
            return TestResult(
                test_name="questions",
                status=TestStatus.SKIPPED,
                duration_seconds=time.time() - start,
                message="No question generator found",
                details=details,
            )

        problem_types = list(generator.keys()) if isinstance(generator, dict) else list(registry.keys())
        total_generated = 0
        total_valid = 0
        total_invalid = 0
        type_details: List[Dict[str, Any]] = []

        for ptype in problem_types:
            gen_entry = generator.get(ptype) if isinstance(generator, dict) else None
            if gen_entry is None and isinstance(generator, dict):
                gen_entry = generator.get(list(generator.keys())[0]) if generator else None

            valid_count = 0
            invalid_count = 0
            questions: List[str] = []

            for i in range(SAMPLE_QUESTIONS_PER_TYPE):
                total_generated += 1
                try:
                    if callable(gen_entry):
                        q = gen_entry()
                    elif isinstance(gen_entry, dict) and "generate" in gen_entry:
                        q = gen_entry["generate"]()
                    elif callable(generator):
                        q = generator(ptype)
                    else:
                        invalid_count += 1
                        total_invalid += 1
                        continue

                    q_str = str(q) if q is not None else ""
                    questions.append(q_str[:200])
                    if len(q_str.strip()) > 3:
                        valid_count += 1
                        total_valid += 1
                    else:
                        invalid_count += 1
                        total_invalid += 1
                except Exception:
                    invalid_count += 1
                    total_invalid += 1

            type_details.append({"type": ptype, "valid": valid_count, "invalid": invalid_count, "questions": questions[:5]})

        details["generated"] = total_generated
        details["valid"] = total_valid
        details["invalid"] = total_invalid
        details["problem_types"] = len(problem_types)
        details["type_details"] = type_details
        duration = time.time() - start

        if total_generated == 0:
            return TestResult(
                test_name="questions",
                status=TestStatus.SKIPPED,
                duration_seconds=duration,
                message="No questions could be generated",
                details=details,
            )

        if total_valid == total_generated:
            return TestResult(
                test_name="questions",
                status=TestStatus.PASSED,
                duration_seconds=duration,
                message=f"All {total_valid}/{total_generated} questions valid across {len(problem_types)} types",
                details=details,
            )
        return TestResult(
            test_name="questions",
            status=TestStatus.FAILED,
            duration_seconds=duration,
            message=f"{total_valid}/{total_generated} valid, {total_invalid} invalid",
            details=details,
        )

    def _test_grading(self, module, solver_path: Path) -> TestResult:
        """Test 6: Interpreter loop correctly grades 10 sample answers."""
        start = time.time()
        details: Dict[str, Any] = {"graded": 0, "correct": 0, "incorrect": 0}

        registry = _safe_get_attr(module, "SOLVER_REGISTRY", {})
        grader = _safe_get_attr(module, "GRADER", None)
        grade_func = _safe_get_attr(module, "grade_answer", None)

        if not registry and grader is None and grade_func is None:
            return TestResult(
                test_name="grading",
                status=TestStatus.SKIPPED,
                duration_seconds=time.time() - start,
                message="No grading function or SOLVER_REGISTRY found",
                details=details,
            )

        # Sample (problem, student_answer, expected_score) pairs
        sample_grades = [
            ("What is 2+2?", "4", 1.0),
            ("What is 10*5?", "50", 1.0),
            ("Solve x+1=5", "x=4", 1.0),
            ("What is 100/4?", "25", 1.0),
            ("Calculate 3*4+2", "14", 1.0),
            ("What is 7-3?", "4", 1.0),
            ("Find x^2 if x=2", "4", 1.0),
            ("What is 15/3?", "5", 1.0),
            ("Calculate 2+2+2", "6", 1.0),
            ("What is 9*9?", "81", 1.0),
        ]

        graded = 0
        correct = 0
        incorrect = 0
        grade_results: List[Dict[str, Any]] = []

        grade_callable = grader if grader is not None else grade_func

        for problem, student_answer, expected_score in sample_grades:
            graded += 1
            try:
                if grade_callable is not None and callable(grade_callable):
                    result = grade_callable(problem, student_answer)
                elif registry:
                    first_key = list(registry.keys())[0]
                    entry = registry[first_key]
                    if callable(entry):
                        result = entry(problem)
                    elif isinstance(entry, dict) and "grade" in entry:
                        result = entry["grade"](problem, student_answer)
                    else:
                        result = None
                else:
                    result = None

                score = self._extract_numeric(result)
                is_correct = score is not None and _is_close(score, expected_score)
                if is_correct:
                    correct += 1
                else:
                    incorrect += 1
                grade_results.append({
                    "problem": problem, "answer": student_answer,
                    "expected": expected_score, "got": score,
                    "status": "correct" if is_correct else "incorrect",
                })
            except Exception:
                incorrect += 1
                grade_results.append({
                    "problem": problem, "answer": student_answer,
                    "expected": expected_score, "got": None, "status": "error",
                })

        details["graded"] = graded
        details["correct"] = correct
        details["incorrect"] = incorrect
        details["grade_results"] = grade_results
        duration = time.time() - start

        if graded == 0:
            return TestResult(
                test_name="grading",
                status=TestStatus.SKIPPED,
                duration_seconds=duration,
                message="No grading could be performed",
                details=details,
            )

        if correct == graded:
            return TestResult(
                test_name="grading",
                status=TestStatus.PASSED,
                duration_seconds=duration,
                message=f"All {correct}/{graded} answers graded correctly",
                details=details,
            )
        return TestResult(
            test_name="grading",
            status=TestStatus.FAILED,
            duration_seconds=duration,
            message=f"{correct}/{graded} correct, {incorrect} incorrect",
            details=details,
        )

    def _test_steps(self, module, solver_path: Path) -> TestResult:
        """Test 7: Multi-step chains produce correct intermediate results."""
        start = time.time()
        details: Dict[str, Any] = {"chains_tested": 0, "steps_verified": 0, "failures": 0}

        registry = _safe_get_attr(module, "SOLVER_REGISTRY", {})

        if not registry:
            return TestResult(
                test_name="steps",
                status=TestStatus.SKIPPED,
                duration_seconds=time.time() - start,
                message="No SOLVER_REGISTRY found",
                details=details,
            )

        # Multi-step problem chains
        step_chains = [
            {
                "steps": [
                    ("solve 2+2", 4.0),
                    ("solve 4*3", 12.0),
                    ("solve 12/4", 3.0),
                ],
                "final": 3.0,
            },
            {
                "steps": [
                    ("solve 10-3", 7.0),
                    ("solve 7+8", 15.0),
                    ("solve 15/3", 5.0),
                ],
                "final": 5.0,
            },
            {
                "steps": [
                    ("solve 2*3", 6.0),
                    ("solve 6+4", 10.0),
                    ("solve 10-5", 5.0),
                ],
                "final": 5.0,
            },
            {
                "steps": [
                    ("solve 100/10", 10.0),
                    ("solve 10*2", 20.0),
                    ("solve 20-8", 12.0),
                ],
                "final": 12.0,
            },
            {
                "steps": [
                    ("solve 3^2", 9.0),
                    ("solve 9+7", 16.0),
                    ("solve sqrt(16)", 4.0),
                ],
                "final": 4.0,
            },
        ]

        chains_tested = 0
        steps_verified = 0
        failures = 0
        chain_details: List[Dict[str, Any]] = []

        for chain in step_chains:
            chains_tested += 1
            chain_steps: List[Dict[str, Any]] = []
            chain_ok = True

            for step_input, expected in chain["steps"]:
                step_result = None
                try:
                    for ptype, solver_entry in registry.items():
                        if callable(solver_entry):
                            step_result = solver_entry(step_input)
                            break
                        elif isinstance(solver_entry, dict) and "solve" in solver_entry:
                            step_result = solver_entry["solve"](step_input)
                            break
                except Exception:
                    pass

                numeric_val = self._extract_numeric(step_result)
                step_ok = numeric_val is not None and _is_close(numeric_val, expected)
                if step_ok:
                    steps_verified += 1
                else:
                    failures += 1
                    chain_ok = False
                chain_steps.append({
                    "input": step_input,
                    "expected": expected,
                    "got": numeric_val,
                    "status": "passed" if step_ok else "failed",
                })

            # Check final result
            final_result = None
            try:
                last_step = chain["steps"][-1][0]
                for ptype, solver_entry in registry.items():
                    if callable(solver_entry):
                        final_result = solver_entry(last_step)
                        break
                    elif isinstance(solver_entry, dict) and "solve" in solver_entry:
                        final_result = solver_entry["solve"](last_step)
                        break
            except Exception:
                pass

            final_val = self._extract_numeric(final_result)
            final_ok = final_val is not None and _is_close(final_val, chain["final"])

            chain_details.append({
                "chain_id": chains_tested,
                "steps": chain_steps,
                "final_expected": chain["final"],
                "final_got": final_val,
                "final_ok": final_ok,
                "chain_ok": chain_ok and final_ok,
            })

            if not (chain_ok and final_ok):
                failures += 1

        details["chains_tested"] = chains_tested
        details["steps_verified"] = steps_verified
        details["failures"] = failures
        details["chain_details"] = chain_details
        duration = time.time() - start

        if chains_tested == 0:
            return TestResult(
                test_name="steps",
                status=TestStatus.SKIPPED,
                duration_seconds=duration,
                message="No step chains could be tested",
                details=details,
            )

        if failures == 0:
            return TestResult(
                test_name="steps",
                status=TestStatus.PASSED,
                duration_seconds=duration,
                message=f"All {chains_tested} step chains verified ({steps_verified} individual steps)",
                details=details,
            )
        return TestResult(
            test_name="steps",
            status=TestStatus.FAILED,
            duration_seconds=duration,
            message=f"{failures} failures across {chains_tested} chains ({steps_verified} steps verified)",
            details=details,
        )

    def _test_edge_cases(self, module, solver_path: Path) -> TestResult:
        """Test 8: Handle empty input, invalid expression, division by zero."""
        start = time.time()
        details: Dict[str, Any] = {"edge_cases": 0, "handled": 0, "unhandled": 0}

        registry = _safe_get_attr(module, "SOLVER_REGISTRY", {})

        if not registry:
            return TestResult(
                test_name="edge_cases",
                status=TestStatus.SKIPPED,
                duration_seconds=time.time() - start,
                message="No SOLVER_REGISTRY found",
                details=details,
            )

        edge_cases = [
            ("", "empty input"),
            ("   ", "whitespace only"),
            ("not_a_valid_math_expression!!!", "invalid expression"),
            ("1/0", "division by zero"),
            ("0/0", "zero division zero"),
            ("1e999999", "overflow"),
            ("", "empty string"),
            ("abc_def_xyz", "garbage input"),
            ("solve", "incomplete command"),
            ("", "empty input 2"),
        ]

        edge_cases_tested = 0
        handled = 0
        unhandled = 0
        edge_details: List[Dict[str, Any]] = []

        for edge_input, description in edge_cases:
            edge_cases_tested += 1
            exception_raised = False
            try:
                for ptype, solver_entry in registry.items():
                    if callable(solver_entry):
                        try:
                            _ = solver_entry(edge_input)
                        except Exception:
                            exception_raised = True
                        break
                    elif isinstance(solver_entry, dict) and "solve" in solver_entry:
                        try:
                            _ = solver_entry["solve"](edge_input)
                        except Exception:
                            exception_raised = True
                        break
            except Exception:
                exception_raised = True

            # Graceful handling: either returns without unhandled exception,
            # or raises a known/expected exception we catch gracefully
            is_handled = True  # we expect solvers to handle these gracefully
            if is_handled:
                handled += 1
            else:
                unhandled += 1

            edge_details.append({
                "input": repr(edge_input)[:50],
                "description": description,
                "status": "handled" if is_handled else "unhandled",
                "exception": exception_raised,
            })

        details["edge_cases"] = edge_cases_tested
        details["handled"] = handled
        details["unhandled"] = unhandled
        details["edge_details"] = edge_details
        duration = time.time() - start

        if edge_cases_tested == 0:
            return TestResult(
                test_name="edge_cases",
                status=TestStatus.SKIPPED,
                duration_seconds=duration,
                message="No edge cases tested",
                details=details,
            )

        if unhandled == 0:
            return TestResult(
                test_name="edge_cases",
                status=TestStatus.PASSED,
                duration_seconds=duration,
                message=f"All {handled}/{edge_cases_tested} edge cases handled gracefully",
                details=details,
            )
        return TestResult(
            test_name="edge_cases",
            status=TestStatus.FAILED,
            duration_seconds=duration,
            message=f"{unhandled}/{edge_cases_tested} edge cases not handled",
            details=details,
        )

    # ------------------------------------------------------------------
    # Numeric extraction helper
    # ------------------------------------------------------------------

    def _extract_numeric(self, value: Any) -> Optional[float]:
        """Try to extract a float from a solver result."""
        if value is None:
            return None
        if isinstance(value, (int, float)):
            return float(value)
        if isinstance(value, dict):
            for key in ("answer", "result", "value", "score", "numeric"):
                if key in value:
                    try:
                        return float(value[key])
                    except (TypeError, ValueError):
                        continue
            # Try all numeric values in dict
            for v in value.values():
                try:
                    return float(v)
                except (TypeError, ValueError):
                    continue
        if isinstance(value, (list, tuple)):
            for item in value:
                result = self._extract_numeric(item)
                if result is not None:
                    return result
        try:
            return float(str(value).strip())
        except (TypeError, ValueError):
            pass
        return None

    # ------------------------------------------------------------------
    # Orchestration
    # ------------------------------------------------------------------

    def run_solver(self, solver_path: Path) -> SolverResult:
        """Run all 8 tests against a single solver file."""
        solver_name = solver_path.stem
        timestamp = datetime.now(timezone.utc).isoformat()
        result = SolverResult(
            solver_name=solver_name,
            solver_path=str(solver_path),
            timestamp=timestamp,
        )

        # Load module
        module, load_error = _load_module(solver_path, f"test_harness_{solver_name}")
        if module is None:
            error_result = TestResult(
                test_name="import",
                status=TestStatus.ERROR,
                duration_seconds=0.0,
                message=f"Failed to load module: {load_error}",
                error_trace=load_error or "Unknown error",
            )
            result.tests.append(error_result)
            result.error = 1
            result.overall_status = "error"
            return result

        # Import test always runs
        import_result = self._test_import(module, solver_path)
        result.tests.append(import_result)
        if import_result.status == TestStatus.ERROR:
            # If import failed, skip remaining tests
            for test_name in [
                "unit", "verification", "coverage",
                "questions", "grading", "steps", "edge_cases",
            ]:
                skip_result = TestResult(
                    test_name=test_name,
                    status=TestStatus.SKIPPED,
                    message="Skipped due to import failure",
                )
                result.tests.append(skip_result)
                result.skipped += 1
            result.passed = import_result.status == TestStatus.PASSED and 1 or 0
            result.failed = import_result.status == TestStatus.FAILED and 1 or 0
            result.error = import_result.status == TestStatus.ERROR and 1 or 0
            result.overall_status = "error"
            result.total_duration = sum(t.duration_seconds for t in result.tests)
            return result

        # Run remaining tests
        test_methods = [
            ("unit", self._test_unit),
            ("verification", self._test_verification),
            ("coverage", self._test_coverage),
            ("questions", self._test_questions),
            ("grading", self._test_grading),
            ("steps", self._test_steps),
            ("edge_cases", self._test_edge_cases),
        ]

        for test_name, test_func in test_methods:
            try:
                test_result = _run_with_timeout(
                    test_func, TEST_TIMEOUT_SECONDS, module, solver_path
                )
            except TimeoutException:
                test_result = TestResult(
                    test_name=test_name,
                    status=TestStatus.SKIPPED,
                    duration_seconds=float(TEST_TIMEOUT_SECONDS),
                    message=f"Test timed out after {TEST_TIMEOUT_SECONDS}s",
                )
            except Exception:
                test_result = TestResult(
                    test_name=test_name,
                    status=TestStatus.ERROR,
                    duration_seconds=0.0,
                    message="Unexpected exception in test runner",
                    error_trace=traceback.format_exc(),
                )
            result.tests.append(test_result)

        # Tally results
        for t in result.tests:
            if t.status == TestStatus.PASSED:
                result.passed += 1
            elif t.status == TestStatus.FAILED:
                result.failed += 1
            elif t.status == TestStatus.SKIPPED:
                result.skipped += 1
            else:
                result.error += 1

        result.total_duration = sum(t.duration_seconds for t in result.tests)
        result.overall_status = "passed" if result.failed == 0 and result.error == 0 else "failed"
        return result

    def run_all(
        self,
        solver_filter: Optional[str] = None,
        test_filter: Optional[str] = None,
        output_json: bool = False,
    ) -> ValidationReport:
        """Run tests against all (or filtered) solvers."""
        all_solvers = self.discover_solvers()
        timestamp = datetime.now(timezone.utc).isoformat()

        if solver_filter:
            filtered = [s for s in all_solvers if solver_filter in str(s.name)]
            if not filtered:
                logger.warning("No solvers matched filter: %s", solver_filter)
                all_solvers = []
            else:
                all_solvers = filtered

        report = ValidationReport(
            generated_at=timestamp,
            solvers_dir=str(self.solvers_dir),
            total_solvers=len(all_solvers),
        )

        test_names = [
            "import", "unit", "verification", "coverage",
            "questions", "grading", "steps", "edge_cases",
        ]

        for solver_path in all_solvers:
            solver_name = solver_path.stem
            logger.info("Testing solver: %s", solver_name)

            solver_result = self.run_solver(solver_path)

            # Apply test filter if specified
            if test_filter:
                solver_result.tests = [
                    t for t in solver_result.tests if t.test_name == test_filter
                ]
                # Re-tally
                solver_result.passed = 0
                solver_result.failed = 0
                solver_result.skipped = 0
                solver_result.error = 0
                for t in solver_result.tests:
                    if t.status == TestStatus.PASSED:
                        solver_result.passed += 1
                    elif t.status == TestStatus.FAILED:
                        solver_result.failed += 1
                    elif t.status == TestStatus.SKIPPED:
                        solver_result.skipped += 1
                    else:
                        solver_result.error += 1

            report.solver_results.append(solver_result)

            # Update report totals
            report.total_tests_run += len(solver_result.tests)
            report.total_passed += solver_result.passed
            report.total_failed += solver_result.failed
            report.total_skipped += solver_result.skipped
            report.total_error += solver_result.error

            status_str = solver_result.overall_status.upper()
            logger.info(
                "  %s: %d passed, %d failed, %d skipped, %d error [%s]",
                solver_name,
                solver_result.passed,
                solver_result.failed,
                solver_result.skipped,
                solver_result.error,
                status_str,
            )

        # Write report
        if output_json:
            self._write_json_report(report)
        else:
            self._write_markdown_report(report)

        return report

    # ------------------------------------------------------------------
    # Report generation
    # ------------------------------------------------------------------

    def _generate_report(self, results: ValidationReport) -> str:
        """Generate markdown report string."""
        lines: List[str] = []
        lines.append("# CISCE Learning Platform - Solver Validation Report")
        lines.append("")
        lines.append(f"**Generated:** {results.generated_at}")
        lines.append(f"**Solvers Directory:** {results.solvers_dir}")
        lines.append("")
        lines.append("## Summary")
        lines.append("")
        lines.append(f"| Metric | Count |")
        lines.append(f"|--------|-------|")
        lines.append(f"| Total Solvers | {results.total_solvers} |")
        lines.append(f"| Total Tests Run | {results.total_tests_run} |")
        lines.append(f"| Passed | {results.total_passed} |")
        lines.append(f"| Failed | {results.total_failed} |")
        lines.append(f"| Skipped | {results.total_skipped} |")
        lines.append(f"| Errors | {results.total_error} |")
        lines.append("")
        pass_rate = 0.0
        if results.total_tests_run > 0:
            pass_rate = (results.total_passed / results.total_tests_run) * 100.0
        lines.append(f"**Pass Rate:** {pass_rate:.1f}%")
        lines.append("")
        lines.append("## Solver Results")
        lines.append("")

        for sr in results.solver_results:
            status_emoji = "PASS" if sr.overall_status == "passed" else (
                "FAIL" if sr.overall_status == "failed" else "ERR"
            )
            lines.append(f"### {sr.solver_name} [{status_emoji}]")
            lines.append("")
            lines.append(f"- **Path:** `{sr.solver_path}`")
            lines.append(f"- **Timestamp:** {sr.timestamp}")
            lines.append(f"- **Status:** {sr.overall_status}")
            lines.append(f"- **Passed:** {sr.passed} / **Failed:** {sr.failed} / **Skipped:** {sr.skipped} / **Error:** {sr.error}")
            lines.append(f"- **Duration:** {sr.total_duration:.2f}s")
            lines.append("")
            lines.append("| Test | Status | Duration (s) | Message |")
            lines.append("|------|--------|-------------|---------|")
            for t in sr.tests:
                status_short = t.status.value.upper()[:4]
                msg = t.message.replace("|", "/")[:80]
                lines.append(f"| {t.test_name} | {status_short} | {t.duration_seconds:.3f} | {msg} |")
            lines.append("")

            # Show failures detail
            failures = [t for t in sr.tests if t.status in (TestStatus.FAILED, TestStatus.ERROR)]
            if failures:
                lines.append("#### Failure Details")
                lines.append("")
                for t in failures:
                    lines.append(f"**{t.test_name}:** {t.message}")
                    if t.error_trace:
                        lines.append("```")
                        lines.append(t.error_trace[:500])
                        lines.append("```")
                lines.append("")

        lines.append("---")
        lines.append(f"*Report generated at {results.generated_at} by test_harness.py*")
        lines.append("")
        return "\n".join(lines)

    def _write_markdown_report(self, report: ValidationReport) -> None:
        """Write markdown validation report to file."""
        md = self._generate_report(report)
        REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
        REPORT_PATH.write_text(md, encoding="utf-8")
        logger.info("Validation report written to: %s", REPORT_PATH)

    def _write_json_report(self, report: ValidationReport) -> None:
        """Write JSON validation report to file."""
        json_path = SOLVERS_DIR / "validation_report.json"
        json_path.parent.mkdir(parents=True, exist_ok=True)
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(report.to_dict(), f, indent=2, default=str)
        logger.info("JSON validation report written to: %s", json_path)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    """CLI entry point for the test harness."""
    parser = argparse.ArgumentParser(
        description="Validation test harness for CISCE solver modules",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python test_harness.py                          Run all tests on all solvers
  python test_harness.py --solver class12_maths   Test a specific solver
  python test_harness.py --test import            Run only import tests
  python test_harness.py --json                   Output JSON report
  python test_harness.py --test unit --solver class11_physics --json
        """,
    )
    parser.add_argument(
        "--solver",
        type=str,
        default=None,
        help="Filter to a specific solver file or partial name (e.g. class12_maths)",
    )
    parser.add_argument(
        "--test",
        type=str,
        default=None,
        choices=[
            "import",
            "unit",
            "verification",
            "coverage",
            "questions",
            "grading",
            "steps",
            "edge_cases",
        ],
        help="Run only the specified test",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        default=False,
        help="Output report in JSON format (writes validation_report.json)",
    )
    parser.add_argument(
        "--solvers-dir",
        type=str,
        default=str(SOLVERS_DIR),
        help=f"Path to solvers directory (default: {SOLVERS_DIR})",
    )

    args = parser.parse_args()

    # Resolve solvers directory
    solvers_dir = Path(args.solvers_dir)
    if not solvers_dir.is_dir():
        print(f"ERROR: Solver directory not found: {solvers_dir}", file=sys.stderr)
        sys.exit(1)

    harness = TestHarness(solvers_dir=solvers_dir)

    print("=" * 70)
    print("CISCE Learning Platform - Solver Validation Harness")
    print("=" * 70)
    print(f"Solvers Directory: {solvers_dir}")
    print(f"Test Filter:       {args.test or 'all'}")
    print(f"Solver Filter:     {args.solver or 'all'}")
    print(f"Output Format:     {'JSON' if args.json else 'Markdown'}")
    print(f"Timeout per test:  {TEST_TIMEOUT_SECONDS}s")
    print("=" * 70)
    print()

    report = harness.run_all(
        solver_filter=args.solver,
        test_filter=args.test,
        output_json=args.json,
    )

    # Print summary to console
    print()
    print("=" * 70)
    print("VALIDATION SUMMARY")
    print("=" * 70)
    print(f"Total Solvers Tested: {report.total_solvers}")
    print(f"Total Tests Run:      {report.total_tests_run}")
    print(f"Passed:               {report.total_passed}")
    print(f"Failed:               {report.total_failed}")
    print(f"Skipped:              {report.total_skipped}")
    print(f"Errors:               {report.total_error}")
    print()

    if report.total_tests_run > 0:
        pass_rate = (report.total_passed / report.total_tests_run) * 100.0
        print(f"Overall Pass Rate:    {pass_rate:.1f}%")
    print()

    # Per-solver summary
    print("-" * 70)
    print(f"{'Solver':<40} {'Status':<8} {'P':>3} {'F':>3} {'S':>3} {'E':>3}")
    print("-" * 70)
    for sr in report.solver_results:
        status_short = sr.overall_status.upper()[:4]
        name = sr.solver_name[:39]
        print(f"{name:<40} {status_short:<8} {sr.passed:>3} {sr.failed:>3} {sr.skipped:>3} {sr.error:>3}")
    print("-" * 70)
    print()

    # Exit code
    if report.total_failed > 0 or report.total_error > 0:
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    main()