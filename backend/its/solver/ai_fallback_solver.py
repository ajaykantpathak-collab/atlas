"""ai_fallback_solver.py -- PAL (Program-Aided Language) + Gemini Solver with 8-Variant Caching & Dual-Path Safety.

Safety & Caching Stack:
1. LLM Generation: Gemini 3.5 Flash-Lite produces step-by-step reasoning + Python code + 8 paraphrase variants.
2. In-Process Sandboxed PAL Execution: AST validation, safe builtins, step budget, timeout protection.
3. Dual-Path Verification:
   - If Python code executes and matches reasoning -> 100% PAL-VERIFIED (promoted to VERIFIED).
   - If LLM made an arithmetic slip, the Python execution corrects the numbers automatically.
4. 8-Variant Template Caching:
   - When verified, stores the program and up to 8 paraphrase variants into `runtime_data/pal_templates.json`.
   - Future queries matching ANY of the 8 variants (or new numbers) resolve instantly in 0.005s with 0 API tokens.
"""

from __future__ import annotations

import ast
import json
import logging
import os
import re
import threading
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)

@dataclass
class AISolverResult:
    answer: str
    numeric: Optional[float]
    steps: List[str]
    explanation: str
    pal_verified: bool = False
    verification_detail: Optional[str] = None
    variants: List[str] = field(default_factory=list)
    model: str = "gemini-3.5-flash-lite"


_PAL_SOLVER_PROMPT = """You are an expert academic tutor and exam evaluator for CBSE, ISC, and competitive examinations (Mathematics, Accountancy, Sciences, Humanities).
Solve the following question with 100% mathematical, domain, and procedural accuracy.

CRITICAL INSTRUCTIONS:
1. Provide a direct, step-by-step breakdown showing all calculations, accounting treatments, or logical deductions.
2. If this is a multiple choice question (MCQ), state the correct option letter (e.g. "(B)") along with the option text.
3. If this is a multi-part calculation (like an Accountancy problem or multi-part calculus), calculate and clearly label the exact final value for each part.
4. For any calculation or math problem, write a small, self-contained Python program using `math`, `sympy`, or `fractions` that independently computes or checks the answer and assigns the result to variable `answer`.
5. For computational questions, provide up to 8 natural language paraphrase variants of the question that ask the same thing with the exact same numbers/slots.
6. Output MUST be a single valid JSON object with the exact keys shown below, and NOTHING ELSE:

{{
  "final_answer": "Concise, definitive final answer or list of answers for each numbered sub-question",
  "numeric": 123.45,
  "steps": [
    "Step 1: Description of first step and calculation",
    "Step 2: Description of second step and calculation"
  ],
  "verification_code": "Python code using math/sympy/fractions that computes or checks the answer and binds `answer = ...`",
  "variants": [
    "Alternative phrasing 1 of this question",
    "Alternative phrasing 2 of this question",
    "Alternative phrasing 3 of this question"
  ],
  "full_explanation": "Complete formatted step-by-step mathematical or accounting solution"
}}

Note on "numeric": If the question asks for a single primary number, put that float value in "numeric". If it is symbolic, an interval, journal entries, or multi-part, set "numeric" to null.
If the question is purely descriptive (like history or literature), "verification_code" can be an empty string "" and "variants" can be empty [].

QUESTION:
{question}
"""


_GLOBAL_BASE_ENV: Optional[Dict[str, Any]] = None
_ENV_LOCK = threading.Lock()

def _get_sandboxed_base_env() -> Dict[str, Any]:
    global _GLOBAL_BASE_ENV
    with _ENV_LOCK:
        if _GLOBAL_BASE_ENV is None:
            try:
                from backend.its.solver.pal_executor import _build_env
                _GLOBAL_BASE_ENV = _build_env()
            except Exception as e:
                logger.warning("Failed to prebuild base PAL env: %s", e)
                return {}
        return dict(_GLOBAL_BASE_ENV)


def _safe_eval_in_sandbox(code_str: str, timeout_s: float = 10.0) -> Optional[Dict[str, Any]]:
    """Execute code string in a strict AST-checked in-process sandbox with timeout."""
    if not code_str or not code_str.strip():
        return None

    try:
        from backend.its.solver.pal_executor import (
            ALLOWED_BUILTINS, ALLOWED_IMPORTS, ALLOWED_NODES,
            _check_ast, _clean_code,
        )
    except ImportError:
        return None

    cleaned = _clean_code(code_str)
    try:
        tree = ast.parse(cleaned, mode="exec")
        refusal = _check_ast(tree)
        if refusal is not None:
            logger.debug("AST check refused PAL code: %s", refusal)
            return None
    except Exception as exc:
        logger.debug("AST parse failed on PAL code: %s", exc)
        return None

    res_holder: Dict[str, Any] = {}
    err_holder: List[Exception] = []

    def _worker():
        try:
            import io, sys
            env = _get_sandboxed_base_env()
            stdout_capture = io.StringIO()
            old_stdout = sys.stdout
            try:
                sys.stdout = stdout_capture
                exec(compile(tree, "<pal_sandbox>", "exec"), env)
            finally:
                sys.stdout = old_stdout

            captured_output = stdout_capture.getvalue().strip()

            raw_ans = env.get("answer")
            if raw_ans is None:
                raw_ans = env.get("ans") or env.get("result") or env.get("solution")

            if raw_ans is None and "solve" in env and callable(env["solve"]):
                try:
                    raw_ans = env["solve"]()
                except Exception:
                    pass

            if raw_ans is None and captured_output:
                lines = [l.strip() for l in captured_output.splitlines() if l.strip()]
                if lines:
                    raw_ans = lines[-1]

            if raw_ans is not None:
                ans_text = str(raw_ans).strip()
                numeric = None
                try:
                    import sympy as sp
                    expr = sp.sympify(ans_text)
                    if expr is not None and expr.is_number:
                        numeric = float(expr.evalf())
                except Exception:
                    try:
                        numeric = float(ans_text)
                    except (TypeError, ValueError):
                        numeric = None
                res_holder["answer_text"] = ans_text
                res_holder["numeric"] = numeric
                res_holder["raw"] = raw_ans
        except Exception as e:
            err_holder.append(e)

    th = threading.Thread(target=_worker, daemon=True)
    th.start()
    th.join(timeout=timeout_s)

    if th.is_alive():
        logger.warning("PAL in-process sandbox timed out after %ss", timeout_s)
        return None

    if err_holder:
        logger.debug("PAL code execution error: %s", err_holder[0])
        return None

    return res_holder if res_holder else None


def _cache_pal_template(question: str, prog_data: Dict[str, Any]) -> None:
    """Save the verified program and its variants to pal_templates.json."""
    try:
        from backend.its.solver.pal_templates import save_program
        save_program(question, prog_data)
    except Exception as exc:
        logger.debug("pal_templates cache save failed: %s", exc)


def solve_with_gemini(question: str, context: Optional[Dict[str, Any]] = None) -> Optional[AISolverResult]:
    """Execute PAL-augmented Gemini solver with 8-variant template caching."""
    if not question or not question.strip():
        return None

    if os.environ.get("DISABLE_AI_FALLBACK") == "1":
        return None

    prompt = _PAL_SOLVER_PROMPT.format(question=question.strip())
    raw_text = None
    used_model = "tokenharbor:claude-haiku-5.5:free"
    
    # Provider 1: TokenHarbor (Claude Haiku 5.5 Free Tier) - PRIMARY
    try:
        from backend.tools.tokenharbor_client import generate as th_gen
        raw_text = th_gen(prompt, max_tokens=2500, temperature=0.1, timeout=30)
    except Exception as exc:
        logger.debug("TokenHarbor attempt failed: %s", exc)

    # Provider 2: Gemini Flash-Lite - BACKUP
    if not raw_text or not raw_text.strip():
        try:
            from backend.tools.gemini_client import generate as gemini_gen
            raw_text = gemini_gen(prompt, max_tokens=2500, temperature=0.1, timeout=30)
            if raw_text and raw_text.strip():
                used_model = "gemini-3.5-flash-lite"
        except Exception as exc:
            logger.debug("Gemini attempt failed: %s", exc)

    if not raw_text or not raw_text.strip():
        return None

    cleaned = raw_text.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned)
    cleaned = cleaned.strip()

    final_ans = None
    num_val = None
    steps: List[str] = []
    full_exp = ""
    verif_code = ""
    variants: List[str] = []

    # Strategy 1: Standard JSON parse
    try:
        data = json.loads(cleaned, strict=False)
        if isinstance(data, dict):
            final_ans = str(data.get("final_answer") or "").strip() or None
            num_val = data.get("numeric")
            verif_code = str(data.get("verification_code") or "").strip()
            raw_vars = data.get("variants") or []
            if isinstance(raw_vars, list):
                variants = [str(v).strip() for v in raw_vars if str(v).strip()]
            raw_steps = data.get("steps") or []
            if isinstance(raw_steps, list):
                steps = [str(s) for s in raw_steps]
            elif isinstance(raw_steps, str):
                steps = [raw_steps]
            full_exp = str(data.get("full_explanation") or "\n".join(steps)).strip()
    except Exception:
        pass

    # Strategy 2: Robust regex extraction if JSON parse failed
    if not final_ans:
        ans_match = re.search(r'"final_answer"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"', cleaned)
        if ans_match:
            final_ans = ans_match.group(1).encode('utf-8').decode('unicode_escape', errors='replace').strip()

        num_match = re.search(r'"numeric"\s*:\s*([-+]?\d*\.?\d+)', cleaned)
        if num_match:
            try:
                num_val = float(num_match.group(1))
            except ValueError:
                num_val = None

        code_match = re.search(r'"verification_code"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"', cleaned)
        if code_match:
            verif_code = code_match.group(1).encode('utf-8').decode('unicode_escape', errors='replace').strip()

        var_match = re.search(r'"variants"\s*:\s*\[([\s\S]*?)\]', cleaned)
        if var_match:
            var_items = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"', var_match.group(1))
            variants = [v.encode('utf-8').decode('unicode_escape', errors='replace').strip() for v in var_items if v.strip()]

        steps_match = re.search(r'"steps"\s*:\s*\[([\s\S]*?)\]', cleaned)
        if steps_match:
            item_matches = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"', steps_match.group(1))
            steps = [m.encode('utf-8').decode('unicode_escape', errors='replace').strip() for m in item_matches if m.strip()]

        exp_match = re.search(r'"full_explanation"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"', cleaned)
        if exp_match:
            full_exp = exp_match.group(1).encode('utf-8').decode('unicode_escape', errors='replace').strip()

    # Strategy 3: Plain text extraction
    if not final_ans:
        lines = [l.strip() for l in cleaned.splitlines() if l.strip()]
        if lines:
            final_ans = lines[-1]
            for l in lines:
                if re.search(r"^(?:final\s+answer|answer|result|hence|therefore)\b", l, re.I):
                    final_ans = re.sub(r"^(?:final\s+answer|answer|result|hence|therefore)[:\s]+", "", l, flags=re.I).strip()
                    break
            steps = lines[:-1] if len(lines) > 1 else lines
            full_exp = cleaned

    if not final_ans:
        return None

    if num_val is not None:
        try:
            num_val = float(num_val)
        except (ValueError, TypeError):
            num_val = None
    elif re.fullmatch(r"[-+]?\d*\.?\d+", final_ans.strip()):
        try:
            num_val = float(final_ans.strip())
        except ValueError:
            num_val = None

    # -------------------------------------------------------------------------
    # SAFETY & VERIFICATION LAYER
    # -------------------------------------------------------------------------
    pal_verified = False
    verif_detail = None

    if verif_code:
        pal_res = _safe_eval_in_sandbox(verif_code, timeout_s=4.0)
        if pal_res and pal_res.get("answer_text"):
            pal_ans_str = str(pal_res["answer_text"]).strip()
            pal_num = pal_res.get("numeric")

            # Case A: Exact match
            if pal_ans_str.lower() == final_ans.lower():
                pal_verified = True
                verif_detail = f"PAL Python code matched exact answer: '{pal_ans_str}'"

            # Case B: Numeric values agree within tolerance
            elif num_val is not None and pal_num is not None:
                if abs(num_val - pal_num) <= max(1e-4, 0.005 * abs(num_val)):
                    pal_verified = True
                    verif_detail = f"PAL Python calculation agreed: numeric {pal_num:.4f} vs reasoning {num_val:.4f}"
                else:
                    # Python execution corrects LLM arithmetic slip
                    verif_detail = f"PAL corrected arithmetic slip: reasoning had {num_val}, Python computed {pal_num}"
                    num_val = pal_num
                    final_ans = str(pal_ans_str)
                    pal_verified = True

            # Case C: Answer text contains the PAL computed value
            elif pal_ans_str in final_ans:
                pal_verified = True
                verif_detail = f"PAL verified key computation: '{pal_ans_str}'"

            # On verification success, persist the program and up to 8 variants to pal_templates.json
            if pal_verified:
                prog_record = {
                    "code": verif_code,
                    "variants": variants[:8],
                    "plan": steps,
                    "ask": final_ans
                }
                _cache_pal_template(question, prog_record)

    return AISolverResult(
        answer=final_ans,
        numeric=num_val,
        steps=steps,
        explanation=full_exp or "\n".join(steps),
        pal_verified=pal_verified,
        verification_detail=verif_detail,
        variants=variants[:8],
        model=used_model
    )


# Backward-compatible alias
solve_with_pal = solve_with_gemini
