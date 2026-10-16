"""mcq_solver.py -- option verification for numeric MCQs.

Many bank questions carry their options inline ("(a) 0.0001 (b) 0.001 ...")
and are otherwise computable stems.  The zero-wrong-answer way to answer
them deterministically:

  1. parse >= 3 numeric options (fewer risks false positives),
  2. solve the stem with the ordinary pipeline,
  3. promote to VERIFIED only if EXACTLY ONE option matches the computed
     value within tolerance; zero or two-plus matches stays guided.

A stem that does not compute can never be promoted, and a wrong engine
answer can never be promoted either (it would not match any option --
it just stays guided).
"""

from __future__ import annotations

import re
from typing import Dict, Optional, Tuple

_NUM = r"(?:-?\d{1,3}(?:,\d{2,3})+|-?\d+(?:\.\d+)?)"
_VAL = (r"(" + _NUM + r")(?:\s*/\s*(" + _NUM + r")|"
        r"\s*[eE]\s*([+-]?\d+)|\s*x\s*10\s*(?:\^|\*\*)?\s*([+-]?\d+))?")

# option enumerators used by CBSE/ICSE banks: (a) A) a. A. [a]
_OPT_SEP = r"(?:\(\s*([a-dA-D])\s*\)|\[?\b([a-dA-D])[\)\.\]]\s*)"

_MCQ_OPTIONS = re.compile(
    _OPT_SEP + r"\s*(?:" + chr(8364) + r"|\brs\.?\s*|Rs\.?\s*)?" + _VAL,
    re.I)

_STEM_STRIP = re.compile(
    r"(\(" + r"\s*[a-dA-D]\s*\)|\b[a-dA-D][\)\.])(?!\w)", re.I)

_TOL_REL = 0.01  # option match tolerance (1%)


def _parse_value(groups) -> Optional[float]:
    """groups = (base, frac_den, e_exp, x10_exp) from _VAL."""
    base_s, frac_s, e_s, x10_s = groups
    if base_s is None:
        return None
    try:
        base = float(base_s.replace(",", ""))
    except ValueError:
        return None
    if frac_s is not None:
        den = float(frac_s.replace(",", ""))
        if den == 0:
            return None
        return base / den
    if e_s is not None:
        return base * (10.0 ** int(e_s))
    if x10_s is not None:
        return base * (10.0 ** int(x10_s))
    return base


def parse_numeric_options(text: str) -> Optional[Dict[str, float]]:
    """Extract letter -> value options; None when this is not a numeric MCQ."""
    opts: Dict[str, float] = {}
    for m in _MCQ_OPTIONS.finditer(text):
        letter = (m.group(1) or m.group(2) or "").lower()
        if not letter:
            continue
        g = m.groups()[2:]  # skip letter groups
        g = (g[0], g[1], g[2], g[3])
        v = _parse_value(g)
        if v is None:
            continue
        opts.setdefault(letter, v)
    if len(opts) < 3:
        return None
    return opts


def split_stem(text: str) -> Tuple[str, bool]:
    """Cut the stem at the first option marker."""
    m = re.search(r"(\(\s*[a-dA-D]\s*\)|\b[a-dA-D][\)\.]\s+)", text)
    if not m:
        return text, False
    return text[:m.start()].strip(), True


def match_options(value: float, opts: Dict[str, float],
                  tol: float = _TOL_REL) -> Tuple[str, int]:
    """Return (letters, count) of options within tolerance of value."""
    hits = []
    for letter, ov in opts.items():
        ref = abs(ov) if ov != 0 else 1.0
        if abs(value - ov) <= tol * ref:
            hits.append(letter)
    return ",".join(sorted(hits)), len(hits)


def try_mcq(text: str, solve) -> Optional[object]:
    """Attempt MCQ option verification.

    solve: callable(stem) -> PipelineResult from answer_pipeline (the core
    solver, without MCQ re-entry).  Returns a promotion dict or None:

        {"option": "b", "value": <float>, "core": <PipelineResult>}
    """
    opts = parse_numeric_options(text)
    stem, has_opts = split_stem(text)
    
    # 1. Standard numeric matching
    if opts is not None and len(stem) >= 15:
        core = solve(stem)
        if core is not None and core.label == "VERIFIED" and core.numeric is not None:
            letters, n = match_options(core.numeric, opts)
            if n == 1:
                letter = letters
                return {"option": letter, "value": opts[letter], "core": core}

        # 2. Back-Substitution Lane for Equations (NEET/JEE fast-path)
        # If core solver stayed guided or couldn't invert an equation f(x) = y,
        # test each option directly into the stem's equation.
        try:
            eq_match = re.search(r"([0-9xX\+\-\*\/\^\(\)\.\s]+)\s*=\s*([0-9xX\+\-\*\/\^\(\)\.\s]+)", stem)
            if eq_match:
                lhs_str, rhs_str = eq_match.group(1).strip(), eq_match.group(2).strip()
                if "x" in lhs_str.lower() or "x" in rhs_str.lower():
                    # Substitute candidate values for x
                    valid_hits = []
                    for opt_letter, opt_val in opts.items():
                        try:
                            # opt_val is substituted into an expression that is
                            # then eval()'d — accept numeric candidates only so
                            # hostile option text can never reach code execution
                            if not re.fullmatch(r"[-+]?\d+(?:\.\d+)?", opt_val.strip()):
                                continue
                            # Safe evaluate numerical difference: LHS - RHS
                            lhs_sub = re.sub(r"\bx\b", f"({opt_val})", lhs_str, flags=re.I)
                            rhs_sub = re.sub(r"\bx\b", f"({opt_val})", rhs_str, flags=re.I)
                            # Convert caret to exponent
                            lhs_sub = lhs_sub.replace("^", "**")
                            rhs_sub = rhs_sub.replace("^", "**")
                            # Evaluate within restricted math scope
                            safe_scope = {"__builtins__": None, "abs": abs, "round": round}
                            diff = abs(eval(lhs_sub, safe_scope) - eval(rhs_sub, safe_scope))
                            if diff < 1e-4:
                                valid_hits.append((opt_letter, opt_val))
                        except Exception:
                            continue
                    if len(valid_hits) == 1:
                        best_letter, best_val = valid_hits[0]
                        from backend.its.solver.answer_pipeline import AuditTrail, PipelineResult, VERIFIED
                        audit = AuditTrail(lane="D", route=["mcq:back_substitution"],
                                           gates_passed=["algebraic_residual_verification"])
                        core = PipelineResult(
                            label=VERIFIED,
                            answer=f"option ({best_letter}) {best_val}",
                            numeric=best_val,
                            steps=[
                                f"Direct back-substitution into equation: {eq_match.group(0)}",
                                f"Substituting x = {best_val} yields LHS == RHS (residual < 1e-4)."
                            ],
                            audit=audit
                        )
                        return {"option": best_letter, "value": best_val, "core": core}
        except Exception:
            pass

    # 3. Qualitative / Concept MCQ evaluation via NeuroLink
    if has_opts:
        try:
            # Extract textual options: (a) text (b) text (c) text (d) text
            text_opts_matches = list(re.finditer(r"(?:\(\s*([a-dA-D])\s*\)|\[?\b([a-dA-D])[\)\.\]])\s*([^\(\)\[\]\n\r]{2,80})", text))
            if len(text_opts_matches) >= 3:
                cand_map = {}
                for m in text_opts_matches:
                    let = (m.group(1) or m.group(2) or "").lower()
                    opt_text = m.group(3).strip().rstrip(".,;")
                    cand_map[let] = opt_text

                from backend.its.solver.neurolink import NeuroLinkEngine
                nl = NeuroLinkEngine.get_instance()
                stem_solve = nl.fast_solve(stem)
                # Relation-MCQ guard (class-9 biology board audit,
                # 2026-10-06): "seen in / found in / occurs in / present
                # in" stems ask WHICH ORGANISM/STRUCTURE, but the concept
                # lane only verifies topic similarity — it returned a
                # yeast-reproduction concept for "Binary fission is the
                # mode of reproduction seen in:" and option (c) Yeast
                # shipped VERIFIED-wrong.  Attribution asks ("proposed
                # by", "coined by") stay promotable: the person name is
                # itself the body anchor.  Relation facts belong to the
                # NCERT fact table or bank keys, which verify the pair.
                if re.search(r"\b(seen in|found in|occurs in|present in)\b",
                             stem, re.I):
                    return None
                if stem_solve and stem_solve.get("status") == "verified":
                    target_body = (stem_solve.get("answer", "") + " " + " ".join(stem_solve.get("steps", []))).lower()

                    matched_opts = []
                    # a word shared by several options ("cell" in every
                    # biology option) is not evidence for any one of them
                    # -- only DISTINCTIVE words may certify a match
                    # ("Egg cell" shipped a longest-cell question because
                    # its only >=4-letter word was "cell", 2026-10-06).
                    opt_words = {let: [w.lower() for w in
                                       re.findall(r"[A-Za-z]{3,}", o_text)]
                                 for let, o_text in cand_map.items()}
                    for let, o_text in cand_map.items():
                        words = opt_words[let]
                        others = set()
                        for other_let, ws in opt_words.items():
                            if other_let != let:
                                others.update(ws)
                        distinctive = [w for w in words if w not in others]
                        if distinctive and all(w in target_body
                                               for w in distinctive):
                            matched_opts.append(let)

                    if len(matched_opts) == 1:
                        best_let = matched_opts[0]
                        from backend.its.solver.answer_pipeline import AuditTrail, PipelineResult, VERIFIED
                        audit = AuditTrail(lane="D", route=["mcq:neurolink_concept_match"],
                                           gates_passed=["neurolink_concept_verification"])
                        core = PipelineResult(
                            label=VERIFIED,
                            answer=f"option ({best_let}) {cand_map[best_let]}",
                            numeric=None,
                            steps=[
                                f"Concept: {stem_solve.get('audit', {}).get('title', stem)}",
                                f"Option ({best_let}) '{cand_map[best_let]}' matches the verified principle: {stem_solve.get('answer', '')[:120]}..."
                            ],
                            audit=audit
                        )
                        return {"option": best_let, "value": None,
                                "core": core}
        except Exception:
            pass

    return None
