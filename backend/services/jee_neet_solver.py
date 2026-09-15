import time
import json
import hashlib
import logging
import os
import sys
import textwrap
import traceback
from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional

logger = logging.getLogger("jee_neet_solver")

SOLVE_LOG_PATH = r"D:\platform\cbse_data\solve_log.json"


# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------

@dataclass
class SolveResult:
    problem_text: str = ""
    parsed_problem: dict = field(default_factory=dict)
    decomposition_plan: dict = field(default_factory=dict)
    sub_solutions: list = field(default_factory=list)
    final_answer: str = ""
    verification_result: dict = field(default_factory=dict)
    explanation: dict = field(default_factory=dict)
    confidence: float = 0.0
    solved: bool = False
    solving_time_ms: int = 0
    strategies_used: list = field(default_factory=list)
    concepts_tested: list = field(default_factory=list)
    error: str = ""


# ---------------------------------------------------------------------------
# Lazy component loader
# ---------------------------------------------------------------------------

class _LazyComponents:
    """Single shared namespace — all modules loaded on first attribute access."""

    _modules: dict = {}

    @classmethod
    def get(cls, name: str) -> Any:
        if name not in cls._modules:
            mod = cls._load(name)
            cls._modules[name] = mod
        return cls._modules[name]

    @staticmethod
    def _load(name: str) -> Any:
        try:
            if name == "problem_parser":
                try:
                    from services.problem_parser import ProblemParser, ParsedProblem  # noqa: F401
                except ImportError:
                    from problem_parser import ProblemParser, ParsedProblem  # noqa: F401
                return {"ProblemParser": ProblemParser, "ParsedProblem": ParsedProblem}

            elif name == "strategy_library":
                try:
                    from services.strategy_library import StrategyLibrary  # noqa: F401
                except ImportError:
                    from strategy_library import StrategyLibrary  # noqa: F401
                return {"StrategyLibrary": StrategyLibrary}

            elif name == "decomposition_engine":
                try:
                    from services.decomposition_engine import DecompositionEngine  # noqa: F401
                except ImportError:
                    from decomposition_engine import DecompositionEngine  # noqa: F401
                return {"DecompositionEngine": DecompositionEngine}

            elif name == "symbolic_solver":
                try:
                    from services.symbolic_solver import SymbolicSolver  # noqa: F401
                except ImportError:
                    from symbolic_solver import SymbolicSolver  # noqa: F401
                return {"SymbolicSolver": SymbolicSolver}

            elif name == "verification_engine":
                try:
                    from services.verification_engine import VerificationEngine  # noqa: F401
                except ImportError:
                    from verification_engine import VerificationEngine  # noqa: F401
                return {"VerificationEngine": VerificationEngine}

            elif name == "explanation_generator":
                try:
                    from services.explanation_generator import ExplanationGenerator  # noqa: F401
                except ImportError:
                    from explanation_generator import ExplanationGenerator  # noqa: F401
                return {"ExplanationGenerator": ExplanationGenerator}

            elif name == "interaction_capture":
                try:
                    from services.interaction_capture import InteractionCapture  # noqa: F401
                except ImportError:
                    from interaction_capture import InteractionCapture  # noqa: F401
                return {"InteractionCapture": InteractionCapture}

            else:
                raise ImportError(f"Unknown component: {name}")

        except ImportError as exc:
            raise ImportError(
                f"Cannot load component '{name}': {exc}. "
                "Ensure all engine modules are on PYTHONPATH."
            ) from exc


# ---------------------------------------------------------------------------
# Solver logging helpers
# ---------------------------------------------------------------------------

class SolveLogger:
    """Append-only JSONL-style log stored inside a JSON array file."""

    def __init__(self, path: str = SOLVE_LOG_PATH):
        self._path = Path(path)

    # ---- public API -------------------------------------------------------

    def log_attempt(
        self,
        *,
        problem_id: str,
        problem_text: str,
        subject: str,
        difficulty: str,
        concepts: list,
        strategy: str,
        success: bool,
        solving_time_ms: int,
        confidence: float,
        error: str = "",
        metadata: Optional[dict] = None,
    ) -> None:
        entry = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "problem_id": problem_id,
            "problem_text": problem_text,
            "subject": subject,
            "difficulty": difficulty,
            "concepts": concepts,
            "strategy": strategy,
            "success": success,
            "solving_time_ms": solving_time_ms,
            "confidence": confidence,
            "error": error,
            "metadata": metadata or {},
        }
        self._append(entry)
        logger.debug("Attempt logged: strategy=%s success=%s confidence=%.2f", strategy, success, confidence)

    # ---- stats ------------------------------------------------------------

    def get_stats(self) -> dict:
        records = self._read_all()
        if not records:
            return {"total": 0, "message": "No records yet."}

        total = len(records)
        success_count = sum(1 for r in records if r["success"])
        by_subject: dict[str, dict] = {}
        by_difficulty: dict[str, dict] = {}
        by_concept: dict[str, dict] = {}

        for r in records:
            subj = r.get("subject", "unknown")
            diff = r.get("difficulty", "unknown")
            concepts = r.get("concepts", [])

            for bucket, key in ((by_subject, subj), (by_difficulty, diff)):
                if key not in bucket:
                    bucket[key] = {"total": 0, "success": 0}
                bucket[key]["total"] += 1
                if r["success"]:
                    bucket[key]["success"] += 1

            for c in concepts:
                if c not in by_concept:
                    by_concept[c] = {"total": 0, "success": 0}
                by_concept[c]["total"] += 1
                if r["success"]:
                    by_concept[c]["success"] += 1

        avg_time = sum(r["solving_time_ms"] for r in records) / total
        avg_conf = sum(r["confidence"] for r in records) / total

        return {
            "total": total,
            "successful": success_count,
            "success_rate": round(success_count / total, 4),
            "avg_solving_time_ms": round(avg_time, 1),
            "avg_confidence": round(avg_conf, 4),
            "by_subject": by_subject,
            "by_difficulty": by_difficulty,
            "by_concept": by_concept,
        }

    def get_recent(self, n: int = 20) -> list:
        records = self._read_all()
        return records[-n:]

    # ---- internal ---------------------------------------------------------

    def _append(self, entry: dict) -> None:
        try:
            records = self._read_all()
            records.append(entry)
            self._path.parent.mkdir(parents=True, exist_ok=True)
            with open(self._path, "w", encoding="utf-8") as fh:
                json.dump(records, fh, indent=2, ensure_ascii=False)
        except Exception:
            logger.exception("Failed to write solve log.")

    def _read_all(self) -> list:
        try:
            if not self._path.exists():
                return []
            with open(self._path, "r", encoding="utf-8") as fh:
                content = fh.read().strip()
                if not content:
                    return []
                return json.loads(content)
        except Exception:
            logger.exception("Failed to read solve log; returning [].")
            return []


# ---------------------------------------------------------------------------
# K-12 integration helper
# ---------------------------------------------------------------------------

class K12Integration:
    """Lightweight bridge to the K-12 intelligence layer."""

    @staticmethod
    def calibrate_depth(explanation: dict, student_state: dict) -> dict:
        if not student_state:
            return explanation
        grade = student_state.get("grade_level", 10)
        mastery = student_state.get("mastery", {})
        concepts_tested = explanation.get("concepts", [])
        low_mastery = [c for c in concepts_tested if mastery.get(c, 0) < 0.4]
        if low_mastery:
            explanation["depth_mode"] = "foundational"
            explanation["note"] = (
                "Extra scaffolding provided due to gaps in: "
                + ", ".join(low_mastery)
            )
        elif grade >= 11:
            explanation["depth_mode"] = "advanced"
        else:
            explanation["depth_mode"] = "standard"
        return explanation

    @staticmethod
    def log_interaction(problem_text: str, result: SolveResult, student_state: dict) -> None:
        if not student_state:
            return
        try:
            capture_mod = _LazyComponents.get("interaction_capture")
            InteractionCapture = capture_mod["InteractionCapture"]
            ic = InteractionCapture()
            ic.log_problem_attempt(
                student_id=student_state.get("student_id", "anonymous"),
                problem_text=problem_text,
                answer=result.final_answer,
                correct=result.solved,
                confidence=result.confidence,
                strategies_used=result.strategies_used,
                concepts=result.concepts_tested,
            )
        except Exception:
            logger.debug("interaction_capture not available or failed; skipping.")

    @staticmethod
    def update_mastery(student_state: dict, concepts: list, solved: bool, confidence: float) -> None:
        if not student_state or not concepts:
            return
        try:
            mastery = student_state.setdefault("mastery", {})
            delta = (0.05 if solved else -0.03) * confidence
            for concept in concepts:
                mastery[concept] = max(0.0, min(1.0, mastery.get(concept, 0.5) + delta))
        except Exception:
            logger.debug("Mastery update skipped.")


# ---------------------------------------------------------------------------
# Main solver orchestrator
# ---------------------------------------------------------------------------

class JEENEETSolver:
    """Top-level orchestrator for JEE/NEET competitive exam problem solving."""

    def __init__(self) -> None:
        self._logger = SolveLogger()
        self._max_retries = 3
        self._min_confidence = 0.7
        logger.info("JEENEETSolver initialised; components loaded lazily.")

    # ---- public -----------------------------------------------------------

    def solve(
        self,
        problem_text: str,
        subject: Optional[str] = None,
        exam_type: Optional[str] = None,
        student_state: Optional[dict] = None,
    ) -> SolveResult:
        """
        Solve a single competitive-exam problem end-to-end.

        Pipeline: parse → identify strategies → decompose → solve sub-problems
        → synthesize → verify → [retry] → explain → return SolveResult.
        """
        t_start = time.perf_counter()
        problem_id = self._make_problem_id(problem_text)
        strategies_tried: list[str] = []
        result: Optional[SolveResult] = None
        error_msg = ""

        for attempt in range(1, self._max_retries + 1):
            try:
                result = self._attempt_solve(
                    problem_text=problem_text,
                    subject=subject,
                    exam_type=exam_type,
                    student_state=student_state,
                    previous_strategies=strategies_tried,
                )
                strategies_tried = result.strategies_used[:]
            except Exception as exc:
                error_msg = f"Attempt {attempt} raised: {exc}\n{traceback.format_exc()}"
                logger.warning("Attempt %d failed: %s", attempt, exc)
                if attempt == self._max_retries:
                    result = SolveResult(
                        problem_text=problem_text,
                        solved=False,
                        error=error_msg,
                        solving_time_ms=self._ms(time.perf_counter() - t_start),
                        strategies_used=strategies_tried,
                    )
                continue

            if result is None:
                continue

            elapsed_ms = self._ms(time.perf_counter() - t_start)
            result.solving_time_ms = elapsed_ms

            # Always log
            self._logger.log_attempt(
                problem_id=problem_id,
                problem_text=problem_text,
                subject=subject or "unknown",
                difficulty=self._infer_difficulty(result),
                concepts=result.concepts_tested,
                strategy=", ".join(str(s) if not isinstance(s, str) else s for s in result.strategies_used),
                success=result.solved,
                solving_time_ms=elapsed_ms,
                confidence=result.confidence,
                error=result.error,
            )

            # Accept if confidence >= threshold
            if result.solved and result.confidence >= self._min_confidence:
                break

            # Retry with different strategy if confidence too low
            if attempt < self._max_retries:
                logger.info(
                    "Confidence %.2f below threshold %.2f; retrying (attempt %d/%d).",
                    result.confidence, self._min_confidence, attempt + 1, self._max_retries,
                )
                continue

        if result is None:
            result = SolveResult(
                problem_text=problem_text,
                solved=False,
                error=error_msg or "All retry attempts exhausted.",
                solving_time_ms=self._ms(time.perf_counter() - t_start),
                strategies_used=strategies_tried,
            )

        # K-12 integration
        if student_state:
            K12Integration.log_interaction(problem_text, result, student_state)
            K12Integration.update_mastery(
                student_state, result.concepts_tested, result.solved, result.confidence
            )

        return result

    def solve_batch(self, problems: list) -> list[SolveResult]:
        results: list[SolveResult] = []
        total = len(problems)
        for idx, p in enumerate(problems, 1):
            if isinstance(p, str):
                problem_text = p
                subject = exam_type = student_state = None
            elif isinstance(p, dict):
                problem_text = p["text"]
                subject = p.get("subject")
                exam_type = p.get("exam_type")
                student_state = p.get("student_state")
            else:
                raise ValueError(f"Unsupported problem format: {type(p)}")

            logger.info("Batch progress: %d/%d", idx, total)
            results.append(
                self.solve(problem_text, subject=subject, exam_type=exam_type, student_state=student_state)
            )
        return results

    # ---- CLI --------------------------------------------------------------

    @staticmethod
    def run_cli() -> None:
        import argparse

        parser = argparse.ArgumentParser(
            description="JEE/NEET Competitive Exam Problem Solver",
            formatter_class=argparse.RawDescriptionHelpFormatter,
            epilog=textwrap.dedent("""\
                examples:
                  python jee_neet_solver.py --solve "A particle moves..." --subject physics
                  python jee_neet_solver.py --batch problems.json
                  python jee_neet_solver.py --stats
            """),
        )
        sub = parser.add_subparsers(dest="command")

        # --solve
        sp_solve = sub.add_parser("solve", help="Solve a single problem")
        sp_solve.add_argument("--solve", required=True, dest="problem_text", help="Problem text")
        sp_solve.add_argument("--subject", default=None)
        sp_solve.add_argument("--exam-type", default=None, dest="exam_type")
        sp_solve.add_argument("--student-state", default=None, help="JSON path to student state file")

        # --batch
        sp_batch = sub.add_parser("batch", help="Solve a batch of problems from a JSON file")
        sp_batch.add_argument("--batch", required=True, help="Path to JSON file with problems list")

        # --stats
        sub.add_parser("stats", help="Show aggregated solve statistics")

        args = parser.parse_args()
        if args.command is None:
            parser.print_help()
            sys.exit(0)

        solver = JEENEETSolver()
        student_state: Optional[dict] = None

        if args.command == "solve":
            if args.student_state:
                try:
                    with open(args.student_state, "r", encoding="utf-8") as fh:
                        student_state = json.load(fh)
                except Exception as exc:
                    logger.warning("Could not load student state: %s", exc)

            print("=" * 70)
            print(f"SOLVING  [{args.subject or 'any'}]")
            print("=" * 70)
            print(args.problem_text[:200])
            print("-" * 70)

            result = solver.solve(
                args.problem_text,
                subject=args.subject,
                exam_type=args.exam_type,
                student_state=student_state,
            )

            _print_result(result)

        elif args.command == "batch":
            try:
                with open(args.batch, "r", encoding="utf-8") as fh:
                    problems = json.load(fh)
            except Exception as exc:
                logger.error("Cannot read batch file: %s", exc)
                sys.exit(1)

            results = solver.solve_batch(problems)
            for i, r in enumerate(results, 1):
                print(f"\n{'='*70}")
                print(f"PROBLEM {i}/{len(results)}")
                print("=" * 70)
                _print_result(r)

        elif args.command == "stats":
            sl = SolveLogger()
            stats = sl.get_stats()
            print(json.dumps(stats, indent=2))

    # ---- internal core ----------------------------------------------------

    def _attempt_solve(
        self,
        problem_text: str,
        subject: Optional[str],
        exam_type: Optional[str],
        student_state: Optional[dict],
        previous_strategies: list[str],
    ) -> SolveResult:
        components = _LazyComponents
        solver = _LazyComponents

        # Step 1 ── Parse
        parser_mod = components.get("problem_parser")
        ProblemParser = parser_mod["ProblemParser"]
        parsed: Any = ProblemParser().parse(problem_text, subject=subject)
        parsed_dict = parsed.to_dict() if hasattr(parsed, "to_dict") else dict(parsed)

        # Step 2 ── Identify concepts + strategies
        strat_mod = components.get("strategy_library")
        StrategyLibrary = strat_mod["StrategyLibrary"]
        strategies = StrategyLibrary()
        concepts = parsed_dict.get("concepts", [])
        candidates = strategies.get_strategies_for_concepts(
            concepts, subject
        )
        candidates = [s for s in candidates if s not in previous_strategies]
        if not candidates:
            # Fallback: get all strategies for the subject's topics
            candidates = []
            for c in concepts:
                candidates.extend(strategies.get_strategies_by_topic(c))

        # Step 3 ── Decompose
        decomp_mod = components.get("decomposition_engine")
        DecompositionEngine = decomp_mod["DecompositionEngine"]
        decomp_engine = DecompositionEngine()
        decomposition = decomp_engine.decompose(parsed_dict, candidates)

        # Step 4 ── Solve sub-problems
        sym_mod = components.get("symbolic_solver")
        SymbolicSolver = sym_mod["SymbolicSolver"]
        symbolic_solver = SymbolicSolver()
        sub_solutions: list[dict] = []

        # Handle both dict and dataclass decomposition
        if hasattr(decomposition, "sub_problems"):
            sub_problems = decomposition.sub_problems
        elif isinstance(decomposition, dict):
            sub_problems = decomposition.get("sub_problems", [])
        else:
            sub_problems = []
        
        for sub in sub_problems:
            # Convert dataclass to dict if needed
            if hasattr(sub, "__dict__"):
                sub_dict = vars(sub)
            elif hasattr(sub, "to_dict"):
                sub_dict = sub.to_dict()
            else:
                sub_dict = sub if isinstance(sub, dict) else {"description": str(sub)}
            ss = symbolic_solver.solve_sub_problem(sub_dict)
            sub_solutions.append(ss)

        # Step 5 ── Synthesize
        final_answer = self._synthesize(sub_solutions, parsed_dict)

        # Step 6 ── Verify
        verif_mod = components.get("verification_engine")
        VerificationEngine = verif_mod["VerificationEngine"]
        verif_engine = VerificationEngine()
        verif_result = verif_engine.verify(parsed_dict, {"final_answer": final_answer, "sub_solutions": sub_solutions})
        if hasattr(verif_result, "confidence"):
            confidence = verif_result.confidence
            passed = verif_result.passed
        elif isinstance(verif_result, dict):
            confidence = verif_result.get("confidence", 0.0)
            passed = verif_result.get("passed", False)
        else:
            confidence = 0.5
            passed = False

        result = SolveResult(
            problem_text=problem_text,
            parsed_problem=parsed_dict,
            decomposition_plan=decomposition,
            sub_solutions=sub_solutions,
            final_answer=final_answer,
            verification_result=verif_result,
            confidence=confidence,
            solved=passed,
            strategies_used=[candidates[0]] if candidates else [],
            concepts_tested=concepts,
        )

        if not passed and confidence < self._min_confidence:
            # Retry with an alternative strategy
            try:
                alt = strategies.get_alternative_strategy(
                    concepts, candidates[0] if candidates else None, subject=subject
                )
            except:
                alt = None
            if alt and alt not in result.strategies_used:
                logger.info("Switching strategy: %s -> %s", result.strategies_used, alt)
                result.strategies_used.append(alt)
                # Re-run symbolic solve with new strategy hint
                sub_solutions_alt = []
                for sub in sub_problems:
                    if hasattr(sub, "__dict__"):
                        sub_dict = vars(sub)
                    else:
                        sub_dict = sub if isinstance(sub, dict) else {}
                    try:
                        ss = symbolic_solver.solve_sub_problem(sub_dict)
                        sub_solutions_alt.append(ss)
                    except:
                        sub_solutions_alt.append(ss)
                result.sub_solutions = sub_solutions_alt
                result.final_answer = self._synthesize(sub_solutions_alt, parsed_dict)
                verif_result2 = verif_engine.verify(parsed_dict, {"final_answer": result.final_answer, "sub_solutions": sub_solutions_alt})
                result.verification_result = verif_result2
                if hasattr(verif_result2, "confidence"):
                    result.confidence = verif_result2.confidence
                    result.solved = verif_result2.passed
                elif isinstance(verif_result2, dict):
                    result.confidence = verif_result2.get("confidence", 0.0)
                    result.solved = verif_result2.get("passed", False)

        # Step 7 ── Generate explanation
        if result.confidence >= self._min_confidence or result.solved:
            exp_mod = components.get("explanation_generator")
            ExplanationGenerator = exp_mod["ExplanationGenerator"]
            expl_gen = ExplanationGenerator()
            explanation = expl_gen.generate(
                parsed_problem=parsed_dict,
                decomposition=decomposition,
                sub_solutions=sub_solutions,
                final_answer=result.final_answer,
                verification=verif_result,
                depth=K12Integration.calibrate_depth({}, student_state or {}).get("depth_mode", "standard"),
            )
            if student_state:
                explanation = K12Integration.calibrate_depth(explanation, student_state)
            result.explanation = explanation

        return result

    # ---- static helpers ---------------------------------------------------

    @staticmethod
    def _synthesize(sub_solutions: list, parsed: dict) -> str:
        answers = []
        for s in sub_solutions:
            # Handle dataclass
            if hasattr(s, "symbolic_result"):
                val = s.symbolic_result or s.numerical_result or ""
                if val:
                    answers.append(str(val))
            elif hasattr(s, "numerical_result"):
                if s.numerical_result:
                    answers.append(str(s.numerical_result))
            elif isinstance(s, dict):
                val = s.get("answer", "") or s.get("symbolic_result", "") or s.get("numerical_result", "")
                if val:
                    answers.append(str(val))
        if not answers:
            return "Could not determine a solution."
        if len(answers) == 1:
            return answers[0]
        return " → ".join(answers)

    @staticmethod
    def _make_problem_id(text: str) -> str:
        return hashlib.md5(text.strip().encode()).hexdigest()[:12]

    @staticmethod
    def _infer_difficulty(result: SolveResult) -> str:
        if not result.solved:
            return "unknown"
        conf = result.confidence
        if conf >= 0.9:
            return "easy"
        if conf >= 0.7:
            return "medium"
        return "hard"

    @staticmethod
    def _ms(seconds: float) -> int:
        return int(seconds * 1000)


# ---------------------------------------------------------------------------
# Result pretty-printer
# ---------------------------------------------------------------------------

def _print_result(result: SolveResult) -> None:
    status = "✓ SOLVED" if result.solved else "✗ FAILED"
    print(f"Status      : {status}")
    print(f"Answer      : {result.final_answer}")
    print(f"Confidence  : {result.confidence:.2%}")
    print(f"Time        : {result.solving_time_ms} ms")
    print(f"Strategies  : {', '.join(result.strategies_used)}")
    print(f"Concepts    : {', '.join(result.concepts_tested)}")
    if result.error:
        print(f"Error       : {result.error[:300]}")

    if result.explanation:
        steps = result.explanation.get("steps", [])
        if steps:
            print("\n--- Solution Steps ---")
            for i, step in enumerate(steps, 1):
                print(f"  Step {i}: {step.get('description', '')}")
                if step.get("formula"):
                    print(f"          Formula: {step['formula']}")
                if step.get("calculation"):
                    print(f"          Calc   : {step['calculation']}")

        summary = result.explanation.get("summary", "")
        if summary:
            print(f"\n--- Summary ---\n{summary}")

        depth = result.explanation.get("depth_mode", "")
        if depth:
            print(f"(depth_mode: {depth})")

    verification = result.verification_result
    if verification:
        layers = verification.get("layers", {})
        if layers:
            print("\n--- Verification ---")
            for layer_name, layer_data in layers.items():
                status_l = "✓" if layer_data.get("passed") else "✗"
                print(f"  {status_l} {layer_name}: conf={layer_data.get('confidence', 0):.2f}")


# ---------------------------------------------------------------------------
# Entry-point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
    )
    JEENEETSolver.run_cli()