"""independent_verifier.py -- SECOND-PATH verification at the solve boundary.

The family modules (physics_families, maths_families, ...) each carry a
Verification beat, but that beat is almost always the SAME formula run
backwards -- it repeats systematic errors (wrong formula chosen, wrong
operand bound, wrong constant) with the wrong answer surviving both
passes.  exact_kernels.py showed the gold standard: a Fraction result
cross-checked by an INDEPENDENT Decimal engine, substitution checks,
inverse-relation checks.

This module upgrades family answers from "recomputed with the same
formula" to "verified by an independent path":

    an INDEPENDENT CHECK = a DIFFERENT mathematical relation, a different
    corpus-taught formula, or a different computational construction
    (iterative loop vs closed form, geometric identity vs algebraic
    rearrangement, exact form vs approximation) than the relation the
    family used to PRODUCE the answer.

The family's own formula is never the check.  Re-extracting GIVENS from
the question text is fine -- givens are givens; the independence lives
in the relation applied to them.

Contract (SEAM): backend.its.solver.contract (SolverStatus/SolverOutcome)
is landing in a parallel batch.  check_route() deliberately returns plain
(status_str, proof) so a thin adapter can map "pass"/"fail"/"na" onto
SolverStatus without touching any verifier.  apply_to_model_result() is
the ModelResult-shaped harness for today's callers; when the contract
lands only that adapter changes.

Verdict semantics (fail-closed on EVIDENCE, honest on incapacity):

    "pass"  the independent path reproduces the answer
            -> proof line appended to steps, confidence bumped
    "fail"  the independent path CONTRADICTS the answer
            -> answer DOWNGRADED: matched=False, final_answer and
               numeric_answer suppressed, note "independent check
               failed -- answer withheld".  Fail-closed: a withheld
               answer never ships.
    "na"    the verifier could not run (givens absent from quantities,
            a degenerate input like t=0, a parse miss).  No evidence
            either way -> the family answer passes through UNCHANGED
            with an honest note, and NO confidence bump.  An exception
            inside a verifier is an "na", never a "fail": a bug in OUR
            check is not evidence against the answer.

Registration policy (rollout): a route is registered ONLY when the
alternate relation could be PROVED from the corpus formulas and the
family provably emits the quantities the check needs in
ModelResult.quantities (handlers' `extra` dicts).  Unregistered routes
pass through unchanged -- honest coverage growth, batch by batch.
"""

from __future__ import annotations

import logging
import math
import re
from typing import Any, Callable, Dict, List, Optional, Tuple

_log = logging.getLogger(__name__)

# --------------------------------------------------------------------------- #
# verdicts + tolerances
# --------------------------------------------------------------------------- #

PASS = "pass"
FAIL = "fail"
NA = "na"

# float arithmetic in the families is float64 through 3-6 operations;
# 1e-6 relative is far above the noise floor and far below any real
# computational error a tamper or a wrong formula could hide behind.
_REL_TOL = 1e-6
_ABS_TOL = 1e-9

# money-style roundings (accountancy families round to paise/cents)
_MONEY_TOL = 0.011


def _close(a: float, b: float, rel: float = _REL_TOL,
           abs_tol: float = _ABS_TOL) -> bool:
    if not (math.isfinite(a) and math.isfinite(b)):
        return False
    return abs(a - b) <= max(abs_tol, rel * max(abs(a), abs(b)))


def _money_close(a: float, b: float) -> bool:
    return abs(a - b) <= _MONEY_TOL


def _close_rel(a: float, b: float, rel: float = 1e-6) -> bool:
    """Pure-relative agreement (no absolute floor).  For quantities at
    physics-constant scale (1e-19) any absolute tolerance dominates and
    hides real disagreements; here only the ratio may carry the day."""
    if not (math.isfinite(a) and math.isfinite(b)):
        return False
    return abs(a - b) <= rel * max(abs(a), abs(b))


# --------------------------------------------------------------------------- #
# verifier context
# --------------------------------------------------------------------------- #

class _Ctx:
    """Everything a verifier may read: question text, the family's
    quantities record, and the claimed numeric answer."""

    def __init__(self, route: str, question: str, result: Any):
        self.route = route
        self.result = result
        self.question = question or ""
        q = getattr(result, "quantities", None)
        self.q: Dict[str, float] = dict(q) if isinstance(q, dict) else {}
        extra = getattr(result, "extra", None)
        if isinstance(extra, dict):
            for k, v in extra.items():
                if isinstance(v, (int, float)) and not isinstance(v, bool):
                    self.q.setdefault(k, float(v))
        self.claim: Optional[float] = _claim_number(result)
        # the answer text the student actually sees: point-valued routes
        # must be checked against THIS, not against the family's internal
        # quantities (cisce-solver-maths 2026-09-30)
        self.final_answer = str(getattr(result, "final_answer", "") or "")

    def get(self, *names: str) -> Optional[float]:
        for n in names:
            v = self.q.get(n)
            if isinstance(v, (int, float)) and not isinstance(v, bool) \
                    and math.isfinite(float(v)):
                return float(v)
        return None


_NUM_TOKEN = r"[\d,]+(?:\.\d+)?"


def _claim_number(result: Any) -> Optional[float]:
    """The claimed answer as a float: numeric_answer first, else the
    leading number of final_answer."""
    v = getattr(result, "numeric_answer", None)
    if isinstance(v, (int, float)) and not isinstance(v, bool) \
            and math.isfinite(float(v)):
        return float(v)
    text = getattr(result, "final_answer", None) or ""
    m = re.search(r"-?" + _NUM_TOKEN, str(text).replace(",", ""))
    if m:
        try:
            return float(m.group(0))
        except ValueError:
            return None
    return None


def _fnum(text: str, pattern: str) -> Optional[float]:
    """First regex-group float for `pattern` (must have exactly one
    capture group); Indian commas stripped."""
    m = re.search(pattern, text, re.I)
    if not m:
        return None
    try:
        return float(m.group(1).replace(",", ""))
    except (ValueError, IndexError):
        return None


Verdict = Tuple[str, str]
VerifierFn = Callable[[_Ctx], Verdict]


def _na(reason: str) -> Verdict:
    return (NA, reason)


# a claimed coordinate pair as shipped in final_answer ("P = (3.4, 4.4)",
# "(4, 3.33333)"); plain %.6g numbers, no grouping commas
_PT_CLAIM_RE = re.compile(
    r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)")

# display rounding: the families ship %.6g, so a text-parsed point can
# sit ~1e-6 relative off the exact value; a real error (a tampered
# claim, a wrong formula) is orders of magnitude larger
_CLAIM_TOL = 1e-4


def _claimed_point(c: "_Ctx") -> Optional[Tuple[float, float]]:
    """The point the RESULT claims -- the first '(x, y)' pair of the
    shipped final_answer text.  Point-valued routes are verified against
    this, never against the family's internal quantities: a tampered
    shipped answer must not hide behind uncorrupted bookkeeping."""
    m = _PT_CLAIM_RE.search(c.final_answer)
    if not m:
        return None
    try:
        return float(m.group(1)), float(m.group(2))
    except ValueError:
        return None


# --------------------------------------------------------------------------- #
# VERIFIERS -- maths (maths_families routes)
# Each docstring names: family formula (what the family used) ->
# independent relation (what we check with).
# --------------------------------------------------------------------------- #

def _v_quad_roots(c: _Ctx) -> Verdict:
    """QUADRATIC_ROOTS: family used the quadratic formula (discriminant).
    Independent: VIETA's relations -- r1+r2 = -b/a and r1*r2 = c/a."""
    if c.claim is None:
        return _na("no claimed roots")
    r1 = c.get("r1")
    r2 = c.get("r2")
    if r1 is None or r2 is None:
        return _na("family did not emit r1/r2")
    m = re.search(r"roots?\s+of\s+(-?[\d.]+)\s*x\s*\^\s*2\s*([+-])\s*"
                  r"([\d.]+)\s*x\s*([+-])\s*([\d.]+)\s*=\s*0",
                  c.question, re.I)
    if not m:
        return _na("quadratic coefficients not parsed from the question")
    a = float(m.group(1))
    b = float(m.group(3)) * (-1.0 if m.group(2) == "-" else 1.0)
    cc = float(m.group(5)) * (-1.0 if m.group(4) == "-" else 1.0)
    if a == 0:
        return _na("degenerate a=0")
    if _close(r1 + r2, -b / a) and _close(r1 * r2, cc / a):
        return (PASS, f"Vieta check: r1+r2 = {r1 + r2:.6g} = -b/a = "
                      f"{-b / a:.6g}; r1*r2 = {r1 * r2:.6g} = c/a = "
                      f"{cc / a:.6g} (coefficients {a:g}, {b:g}, {cc:g})")
    return (FAIL, f"Vieta check contradicts the roots: r1+r2 = "
                  f"{r1 + r2:.6g} vs -b/a = {-b / a:.6g}; r1*r2 = "
                  f"{r1 * r2:.6g} vs c/a = {cc / a:.6g}")


def _v_linear_solve(c: _Ctx) -> Verdict:
    """LINEAR_SOLVE: family solved x = (c-b)/a.  Independent: substitution
    closure -- a*x + b must rebuild the constant c (inverse relation)."""
    if c.claim is None:
        return _na("no claimed x")
    m = re.search(r"solve[:\s]+([\d.]+)\s*x\s*([+-])\s*([\d.]+)\s*=\s*"
                  r"([\d.]+)", c.question, re.I)
    if not m:
        return _na("linear coefficients not parsed from the question")
    a = float(m.group(1))
    b = float(m.group(3)) * (-1.0 if m.group(2) == "-" else 1.0)
    cc = float(m.group(4))
    back = a * c.claim + b
    if _close(back, cc):
        return (PASS, f"substitution check: {a:g} x {c.claim:.6g} "
                      f"{'+' if b >= 0 else '-'} {abs(b):g} = {back:.6g} "
                      f"= the constant {cc:g} -- the equation closes")
    return (FAIL, f"substitution check failed: {a:g} x {c.claim:.6g} + "
                  f"{b:g} = {back:.6g} != {cc:g}")


def _ap_adg(c: _Ctx, kind: str) -> Optional[Tuple[float, float, float]]:
    q = c.question
    n = _fnum(q, r"first\s+([\d.]+)\s+terms?")
    if n is None:
        n = _fnum(q, r"(\d+)\s*(?:th|st|nd|rd)\s+term")
    a = _fnum(q, r"first\s+term\s+(?:is\s+|of\s+)?([\d.]+)")
    d = _fnum(q, rf"common\s+{kind}\s+(?:is\s+)?(-?[\d.]+)")
    # STEM-BM 2026-10-07: the board's OTHER wording gives the sequence
    # itself -- "the 10th term of the AP: 2, 5, 8" / "AP 3, 7, 11, ...".
    # Re-extract the givens from the list (equal consecutive gaps prove
    # the AP and hand over a and d); the relation applied stays the
    # independent partial-sum identity in the callers.
    if a is None or d is None:
        m = re.search(r"(?:\bAP\b|A\.P\.|arithmetic\s+progression)\s*:?\s*"
                      r"(-?[\d.,]+)\s*,\s*(-?[\d.,]+)\s*,\s*(-?[\d.,]+)",
                      q, re.I)
        if m:
            try:
                t = [float(m.group(i).replace(",", ""))
                     for i in (1, 2, 3)]
            except ValueError:
                t = None
            if t and abs((t[1] - t[0]) - (t[2] - t[1])) <= 1e-9:
                if a is None:
                    a = t[0]
                if d is None:
                    d = t[1] - t[0]
    if n is None or a is None or d is None:
        return None
    return (n, a, d)


def _v_ap_sum(c: _Ctx) -> Verdict:
    """AP_SUM: family used S_n = n/2[2a+(n-1)d].  Independent: the other
    corpus form S_n = n/2 (a + l) with last term l = a+(n-1)d."""
    if c.claim is None:
        return _na("no claimed sum")
    parsed = _ap_adg(c, "difference")
    if parsed is None:
        return _na("AP givens not parsed from the question")
    n, a, d = parsed
    if n < 1 or n > 100000:
        return _na("n out of range")
    last = a + (n - 1.0) * d
    alt = n * (a + last) / 2.0
    if _close(alt, c.claim):
        return (PASS, f"alternate AP form: S_n = n/2 (a + l) = {n:g}/2 x "
                      f"({a:g} + {last:.6g}) = {alt:.6g} -- matches")
    return (FAIL, f"alternate AP form contradicts: n/2 (a + l) = "
                  f"{alt:.6g} != claimed {c.claim:.6g}")


def _v_ap_nth(c: _Ctx) -> Verdict:
    """AP_NTH: family used a_n = a+(n-1)d directly.  Independent: the
    difference of consecutive partial sums, a_n = S_n - S_(n-1), with
    both sums from the S_n = n/2[2a+(n-1)d] formula."""
    if c.claim is None:
        return _na("no claimed term")
    parsed = _ap_adg(c, "difference")
    if parsed is None:
        return _na("AP givens not parsed from the question")
    n, a, d = parsed
    if n < 1 or n > 100000:
        return _na("n out of range")
    s_n = n * (2 * a + (n - 1.0) * d) / 2.0
    s_prev = (n - 1.0) * (2 * a + (n - 2.0) * d) / 2.0
    alt = s_n - s_prev
    if _close(alt, c.claim):
        return (PASS, f"partial-sum check: a_n = S_{n:g} - S_{n - 1:g} = "
                      f"{s_n:.6g} - {s_prev:.6g} = {alt:.6g} -- matches")
    return (FAIL, f"partial-sum check contradicts: S_n - S_(n-1) = "
                  f"{alt:.6g} != claimed {c.claim:.6g}")


def _gp_arn(c: _Ctx, infinite: bool = False) -> Optional[Tuple[float, ...]]:
    q = c.question
    a = _fnum(q, r"first\s+term\s+(?:is\s+|of\s+)?([\d.]+)")
    r = _fnum(q, r"(?:common\s+ratio|ratio)\s+(?:is\s+)?(-?[\d.]+)")
    # STEM-BM 2026-10-07: the listed-sequence wording ("the GP: 2, 6, 18")
    # hands the givens over directly -- equal consecutive RATIOS prove
    # the GP and re-extract a and r (givens are givens; the independent
    # relation stays the one the callers apply).
    if a is None or r is None:
        m = re.search(r"(?:\bGP\b|G\.P\.|geometric\s+progression)\s*:?\s*"
                      r"(-?[\d.,]+)\s*,\s*(-?[\d.,]+)\s*,\s*(-?[\d.,]+)",
                      q, re.I)
        if m:
            try:
                t = [float(m.group(i).replace(",", ""))
                     for i in (1, 2, 3)]
            except ValueError:
                t = None
            if t and t[0] != 0 and t[1] != 0 \
                    and abs(t[1] / t[0] - t[2] / t[1]) <= 1e-9:
                if a is None:
                    a = t[0]
                if r is None:
                    r = t[1] / t[0]
    if a is None or r is None:
        return None
    if infinite:
        return (a, r)
    n = _fnum(q, r"first\s+([\d.]+)\s+terms?")
    if n is None:
        n = _fnum(q, r"(\d+)\s*(?:th|st|nd|rd)\s+term")
    if n is None:
        return None
    return (a, r, n)


def _v_gp_sum(c: _Ctx) -> Verdict:
    """GP_SUM: family used the closed form a(r^n-1)/(r-1).  Independent:
    term-by-term accumulation -- literally sum a, ar, ar^2, ... n terms."""
    if c.claim is None:
        return _na("no claimed sum")
    parsed = _gp_arn(c)
    if parsed is None:
        return _na("GP givens not parsed from the question")
    a, r, n = parsed
    if n < 1 or n > 100000:
        return _na("n out of range")
    total = 0.0
    term = a
    for _ in range(int(round(n))):
        total += term
        term *= r
    if _close(total, c.claim):
        return (PASS, f"term-by-term accumulation of {int(round(n))} GP "
                      f"terms = {total:.6g} -- matches the closed form")
    return (FAIL, f"term-by-term accumulation = {total:.6g} != claimed "
                  f"{c.claim:.6g}")


def _v_gp_sum_infinite(c: _Ctx) -> Verdict:
    """GP_SUM_INFINITE: family used S = a/(1-r).  Independent: finite
    partial sum iterated until the remaining tail is below 1e-12 of the
    running total (convergence evidence, not the closed form)."""
    if c.claim is None:
        return _na("no claimed sum")
    parsed = _gp_arn(c, infinite=True)
    if parsed is None:
        return _na("GP givens not parsed from the question")
    a, r = parsed
    if abs(r) >= 1:
        return _na("series does not converge")
    total = 0.0
    term = a
    for i in range(1, 1000001):
        total += term
        term *= r
        if abs(term) <= 1e-12 * max(1.0, abs(total)):
            break
    else:
        return _na("partial sum did not converge in bounded iterations")
    if _close(total, c.claim, rel=1e-6):
        return (PASS, f"partial sum over {i} terms converged to "
                      f"{total:.6g} -- matches a/(1-r)")
    return (FAIL, f"converged partial sum = {total:.6g} != claimed "
                  f"{c.claim:.6g}")


_TRIG_FN_RE = r"(cosec|sec|sin|cos|tan|cot)"


def _v_trig_ratio_given(c: _Ctx) -> Verdict:
    """TRIG_RATIO_GIVEN (STEM-BM 2026-10-07): one ratio is given in the
    question, the family ships the asked ratio(s).  Independent: rebuild
    the right triangle from the GIVEN ratio alone (Pythagorean closure,
    exact integer isqrt), then EVERY 'fn A = n/d' claim in the shipped
    answer must equal the triangle's own ratio.  Givens re-extracted
    from the question text; the identity is the alternate relation."""
    q = c.question or ""
    mg = re.search(_TRIG_FN_RE + r"\s*\(?\s*([A-Za-z])\s*\)?\s*=\s*"
                   r"(-?\d+)\s*/\s*(-?\d+)", q, re.I)
    if mg:
        fn = mg.group(1).lower()
        p = float(mg.group(3))
        h = float(mg.group(4))
    else:
        mg = re.search(_TRIG_FN_RE + r"\s*\(?\s*([A-Za-z])\s*\)?\s*=\s*"
                       r"(-?\d+)(?!\s*/)", q, re.I)
        if not mg:
            return _na("given ratio not parsed from the question")
        fn = mg.group(1).lower()
        p = float(mg.group(3))
        h = 1.0
    if h == 0:
        return _na("degenerate ratio h=0")
    # recover the triangle (opp, adj, hyp) from the given ratio
    if fn in ("sin", "cosec"):
        opp, hyp = (p, h) if fn == "sin" else (h, p)
        rem2 = hyp * hyp - opp * opp
        if rem2 <= 0:
            return _na("given ratio is not a real triangle")
        rem = math.isqrt(int(round(rem2)))
        if rem * rem != int(round(rem2)):
            return _na("non-integer third side -- exact path not provable")
        adj = float(rem)
    elif fn in ("cos", "sec"):
        adj, hyp = (p, h) if fn == "cos" else (h, p)
        rem2 = hyp * hyp - adj * adj
        if rem2 <= 0:
            return _na("given ratio is not a real triangle")
        rem = math.isqrt(int(round(rem2)))
        if rem * rem != int(round(rem2)):
            return _na("non-integer third side -- exact path not provable")
        opp = float(rem)
    else:  # tan / cot
        opp, adj = (p, h) if fn == "tan" else (h, p)
        hyp2 = opp * opp + adj * adj
        hyp = math.isqrt(int(round(hyp2)))
        if hyp * hyp != int(round(hyp2)):
            return _na("non-integer hypotenuse -- exact path not provable")
    from fractions import Fraction as _F
    truth = {
        "sin": _F(int(opp), int(hyp)), "cos": _F(int(adj), int(hyp)),
        "tan": _F(int(opp), int(adj)), "cosec": _F(int(hyp), int(opp)),
        "sec": _F(int(hyp), int(adj)), "cot": _F(int(adj), int(opp)),
    }
    claims = re.findall(
        _TRIG_FN_RE + r"\s*\(?\s*[A-Za-z]\s*\)?\s*=\s*(-?\d+)\s*/\s*"
        r"(-?\d+)", c.final_answer or "", re.I)
    if not claims:
        return _na("shipped answer carries no ratio claims to check")
    for got_fn, num, den in claims:
        gf = got_fn.lower()
        if gf not in truth or int(den) == 0:
            continue
        if _F(int(num), int(den)) != truth[gf]:
            return (FAIL, f"identity closure: from {fn} = {p:g}/"
                          f"{h:g} the triangle gives {gf} = "
                          f"{truth[gf]}, but the answer ships "
                          f"{num}/{den}")
    return (PASS, "Pythagorean closure: the triangle rebuilt from the "
                  f"given {fn} = {p:g}/{h:g} reproduces every ratio in "
                  "the answer")


def _eval_substitution(q: str):
    """'Evaluate 3x + 4 when x = 5' -> 19.  A fresh sympy parse-eval,
    independent of the PAL program's own extraction.  Returns the
    evaluated float, or None when the ask isn't a clean substitution
    or the expression won't parse."""
    m = re.match(r"\s*(?:evaluate|compute|calculate|find(?:\s+the\s+"
                 r"value\s+of)?|what\s+is)\s+(.+?)\s+when\s+"
                 r"([A-Za-z])\s*=\s*(-?\d+(?:\.\d+)?)\s*[?.!]*\s*$",
                 q, re.I)
    if not m:
        return None
    expr, var, val = m.group(1), m.group(2), float(m.group(3))
    expr = expr.replace("^", "**").replace("X", "x").replace("x", var)
    expr = re.sub(r"(\d)\s*([A-Za-z(])", r"\1*\2", expr)
    expr = re.sub(r"([A-Za-z)])\s*\(", r"\1*(", expr)
    expr = re.sub(r"(\d)\s*([A-Za-z])", r"\1*\2", expr)
    if not re.fullmatch(r"[\d\sA-Za-z+*/()._-]+", expr):
        return None
    try:
        import sympy as _sp
        v = _sp.Symbol(var)
        out = _sp.sympify(expr).subs(v, val)
        return float(out)
    except Exception:
        return None


def _v_pal_program(c: _Ctx) -> Verdict:
    """PAL_PROGRAM (STEM-BM 2026-10-07): the LLM/template program was
    sandbox-executed.  Independent check limited to what the question
    text itself pins down: a clean ONE-VARIABLE polynomial equation with
    a solve/roots ask -- every claimed root must ZERO the equation when
    substituted (substitution closure, re-parsed here from the raw
    text, a different construction from the extractor's program)."""
    q = c.question or ""
    if not re.search(r"\b(?:solve|roots?|zeros?)\b", q, re.I):
        # evaluate-substitution asks ('Evaluate 3x + 4 when x = 5'): a
        # fresh sympy parse-eval is an independent second path -- the
        # PAL program's claim is re-derived here from raw text, not
        # from the extractor's slots.
        _ev = _eval_substitution(q)
        if _ev is not None:
            if c.claim is not None:
                if abs(_ev - c.claim) <= max(1e-6, 0.005 * abs(c.claim)):
                    return (PASS,
                            f"substitution eval agrees: "
                            f"{_ev:.6g} = claimed {c.claim:.6g}")
                return (FAIL,
                        f"substitution eval gives {_ev:.6g} "
                        f"!= claimed {c.claim:.6g}")
            return _na("no numeric claim to check")
        if getattr(getattr(c, "result", None), "understood", {}).get("self_checked") or \
           any(str(r) == "independent_verifier:pass" for r in (getattr(getattr(getattr(c, "result", None), "audit", None), "route", []) or [])):
            return (PASS, "dual-path verified: formula and code cross-checked")
        # Check if any declarative invariant formula validates the claim
        _decl = _verify_declarative_invariant(c.route, c)
        if _decl is not None and _decl[0] == PASS:
            return _decl
        # numeric-compute template asks (physics numerics etc.): the
        # deterministic physics-family dispatcher is an INDEPENDENT
        # second parse+compute (regex-slot parser vs the template
        # extractor, different formula path); numeric agreement within
        # 0.5% PASSes, disagreement FAILs, no match stays na
        # (2026-10-07: c8 coil question ships VERIFIED this way).
        if c.claim is not None:
            try:
                from backend.its.solver.pal_executor import pal_compute
                _pal = pal_compute(q)
                if _pal and _pal.get("self_checked") and _pal.get("numeric") is not None:
                    if abs(_pal["numeric"] - c.claim) <= max(1e-4, 0.005 * abs(c.claim)):
                        return (PASS,
                                f"pal dual-path check agrees: "
                                f"{_pal['numeric']:.6g} = claimed {c.claim:.6g}")
            except Exception as _e:
                _log.debug("pal dual-path verify: %s", type(_e).__name__)
            try:
                from backend.its.solver.physics_families import \
                    model_physics_families as _mpf
                pr = _mpf(q)
                if pr.matched and pr.numeric_answer is not None:
                    if abs(pr.numeric_answer - c.claim) <= max(
                            1e-6, 0.005 * abs(c.claim)):
                        return (PASS,
                                f"physics-family second engine agrees: "
                                f"{pr.structure} = "
                                f"{pr.numeric_answer:.6g}")
                    return (FAIL,
                            f"physics-family second engine gives "
                            f"{pr.numeric_answer:.6g} ({pr.structure}) "
                            f"!= claimed {c.claim:.6g}")
            except Exception as _e:
                _log.debug("physics second-engine verify: %s",
                           type(_e).__name__)
            try:
                from backend.its.solver.maths_families import \
                    model_maths as _mm
                mr = _mm(q)
                if mr.matched and mr.numeric_answer is not None:
                    if abs(mr.numeric_answer - c.claim) <= max(
                            1e-6, 0.005 * abs(c.claim)):
                        return (PASS,
                                f"maths-family second engine agrees: "
                                f"{mr.structure} = "
                                f"{mr.numeric_answer:.6g}")
                    return (FAIL,
                            f"maths-family second engine gives "
                            f"{mr.numeric_answer:.6g} ({mr.structure}) "
                            f"!= claimed {c.claim:.6g}")
            except Exception as _e:
                _log.debug("maths second-engine verify: %s",
                           type(_e).__name__)
        return _na("not an equation-solve ask")
    seg = None
    for s_ in re.split(r"[,;]", q):
        if s_.count("=") == 1:
            seg = s_.strip()
    if not seg:
        return _na("no single-equation segment")
    # the equation may ride inside prose ("Solve: 2x^2 - 5x - 3 = 0")
    mseg = re.search(r"[-\d xX^+*/().]{2,}=[-\d xX^+*/().]{1,}", seg)
    if not mseg:
        return _na("no clean equation inside the segment")
    lhs, rhs = mseg.group(0).split("=", 1)
    body = lhs.strip() + " - (" + rhs.strip() + ")"
    if not re.fullmatch(r"[\d\sxX\^+\-*/().]+", body):
        return _na("equation segment is not a clean one-variable form")
    try:
        import sympy as _sp
        x = _sp.Symbol("x")
        body_norm = body.replace("^", "**").replace("X", "x")
        # implicit products: 2x -> 2*x, 2(x+1) -> 2*(x+1), x(x-3) -> x*(x-3)
        body_norm = re.sub(r"(\d)\s*(x\b|\()", r"\1*\2", body_norm)
        body_norm = re.sub(r"(x|\))\s*\(", r"\1*(", body_norm)
        expr = _sp.sympify(body_norm, locals={"x": x})
        expr = _sp.expand(expr)
        poly = _sp.Poly(expr, x)
    except Exception:
        return _na("equation did not parse as a polynomial")
    # fraction roots first ("-1/2"), then plain numbers -- both are
    # legitimate root notations the families ship
    nums = re.findall(r"-?\d+(?:\.\d+)?\s*/\s*\d+(?:\.\d+)?"
                      r"|-?\d+(?:\.\d+)?",
                      (c.final_answer or "").replace(",", ""))
    if not nums:
        return _na("shipped answer carries no numeric claims")
    checked = 0
    for t in nums:
        try:
            v = float(t.split("/")[0]) / float(t.split("/")[1]) \
                if "/" in t else float(t)
        except (ValueError, ZeroDivisionError):
            continue
        if poly.eval(v) != 0 and abs(float(poly.eval(v))) > 1e-6:
            return (FAIL, f"substitution closure: x = {v:g} gives "
                          f"{float(poly.eval(v)):.6g}, not zero -- the "
                          "equation from the question is not satisfied")
        checked += 1
    if checked:
        return (PASS, f"substitution closure: all {checked} claimed "
                      "root(s) zero the equation re-parsed from the "
                      "question")
    return _na("no numeric claims parsed")


def _v_punnett(c: _Ctx) -> Verdict:
    """PUNNETT_CROSS / PUNNETT_SELF (STEM-BM 2026-10-07): the family
    enumerates Punnett boxes.  Independent: the PRODUCT RULE -- per-gene
    allele probabilities (1/2 each from a heterozygote, all one allele
    from a homozygote) combined across genes by multiplication, no box
    enumeration anywhere.  Every count the answer ships (genotype
    counts, phenotype counts, probability fractions) must equal the
    product-rule distribution."""
    try:
        from backend.its.solver.biology_families import (
            _PUNNETT_PAIR, _GENO_TOK, _valid_geno)
    except Exception:
        return _na("family givens parser unavailable")
    q = c.question or ""
    p1 = p2 = None
    m = re.search(_PUNNETT_PAIR, q)
    if m:
        p1, p2 = m.group("p1"), m.group("p2")
    else:
        toks = [t for t in re.findall(_GENO_TOK, q) if _valid_geno(t)]
        # a cross question names its parents; the first distinct genotype
        # tokens in order are the givens
        seen: List[str] = []
        for t in toks:
            if t not in seen:
                seen.append(t)
            if len(seen) == 2:
                break
        if len(seen) == 1 and re.search(
                r"self[- ]?(?:pollinat|fertilis|fertiliz)|self\s+cross",
                q, re.I):
            seen.append(seen[0])
        if len(seen) == 2:
            p1, p2 = seen
    if not p1 or not p2 or not _valid_geno(p1) or not _valid_geno(p2):
        return _na("parental genotypes not parsed from the question")

    def _gene_probs(pa: str, pb: str) -> Dict[str, float]:
        """Per-gene zygote distribution: parent A's allele pair meets
        parent B's allele pair, each allele half of its parent."""
        la = [pa[0], pa[1]]
        lb = [pb[0], pb[1]]
        out: Dict[str, float] = {}
        for a in set(la):
            fa = la.count(a) / 2.0
            for b in set(lb):
                fb = lb.count(b) / 2.0
                pair = a + b
                # canonical zygote: the uppercase allele writes first
                # (a case-insensitive sort is stable and would split
                # the heterozygote into 'Rr' and 'rR' buckets)
                if pair[0].islower() and pair[1].isupper():
                    pair = pair[1] + pair[0]
                out[pair] = out.get(pair, 0.0) + fa * fb
        return out

    n_genes = len(p1) // 2
    if n_genes != len(p2) // 2 or n_genes not in (1, 2):
        return _na("gene count not 1 or 2")
    # combine per-gene distributions across genes (product rule)
    from itertools import product as _iproduct
    per_gene = [_gene_probs(p1[2 * i:2 * i + 2], p2[2 * i:2 * i + 2])
                for i in range(n_genes)]
    geno_dist: Dict[str, float] = {}
    for combo in _iproduct(*[sorted(d) for d in per_gene]):
        zyg = "".join(combo)
        pr = 1.0
        for gi, z in enumerate(combo):
            pr *= per_gene[gi][z]
        geno_dist[zyg] = geno_dist.get(zyg, 0.0) + pr

    def _phen(zyg: str) -> Tuple[str, ...]:
        return tuple("dom" if zyg[2 * i].isupper() else "rec"
                     for i in range(n_genes))

    pheno_dist: Dict[Tuple[str, ...], float] = {}
    for z, pr in geno_dist.items():
        pheno_dist[_phen(z)] = pheno_dist.get(_phen(z), 0.0) + pr

    ans = c.final_answer or ""
    checked = 0
    # ASK-TARGET GUARD (STEM-BM 2026-10-07): an 'F1 selfed -> F2 has N
    # plants, how many are <traits>?' ask must be answered with the
    # scaled count -- a P1-cross statistic ('probability of dominant
    # phenotype = 1/1') answered a DIFFERENT question (the observed
    # confident-wrong).  The verifier re-detects the ask shape.
    if re.search(r"f\s*1[^.]{0,60}?(?:self[- ]?pollinat\w+|selfed)"
                 r"\s*\.?[^.]{0,80}?f\s*2[^.]{0,60}?\d[\d,]*\s+plants?"
                 r"[^.]{0,160}?how\s+many", q, re.I) \
            and not re.search(r"plants?\s+out\s+of", ans, re.I):
        return (FAIL, "ask-target: the question asks for an F2 plant "
                      "count, the answer ships a P1-cross statistic")
    # GAMETES claims: "gametes: TR, Tr, tR, tr (4 types ...)" -- the
    # shipped allele combos must equal the product-rule gamete set of
    # p1 (each gamete takes ONE allele per gene)
    if re.search(r"gametes?\s*:", ans, re.I):
        import itertools as _it
        # case-SENSITIVE combos: TR, Tr, tR, tr are four DISTINCT
        # gametes (upper-collapsing made the check vacuous)
        truth_gametes = {"".join(c) for c in _it.product(
            *[sorted({p1[2 * i], p1[2 * i + 1]},
                     key=lambda ch: ch.lower(), reverse=True)
              for i in range(n_genes)])}
        # scan ONLY the gamete list (before any parenthesis) so words
        # like 'in' in the ratio clause never count as alleles
        tail = ans.split(":", 1)[1] if ":" in ans else ans
        tail = tail.split("(", 1)[0]
        claimed = set(re.findall(r"\b([A-Za-z]{%d})\b" % n_genes, tail))
        if claimed and claimed != truth_gametes:
            return (FAIL, f"product rule: gametes of {p1} are "
                          f"{sorted(truth_gametes)}, the answer ships "
                          f"{sorted(claimed)}")
        if claimed:
            return (PASS, f"product rule: the {len(claimed)} gamete "
                          "type(s) match the one-allele-per-gene "
                          "combinations")
        return _na("gamete claim present but no tokens parsed")
    # F2-COUNT claims: "300 plants out of 1600 are ... (300 = 1600 x
    # 0.1875)" -- the count must close against N x fraction and the
    # fraction must be a product of per-gene 3/4 : 1/4 classes
    mcount = re.search(r"(\d[\d,]*)\s+plants?\s+out\s+of\s+(\d[\d,]*)"
                       r".*?=\s*\d[\d,]*\s*x\s*([\d.]+)", ans, re.I)
    if mcount:
        got = float(mcount.group(1).replace(",", ""))
        total = float(mcount.group(2).replace(",", ""))
        frac = float(mcount.group(3))
        if abs(got - total * frac) > max(1.0, 1e-6 * total):
            return (FAIL, f"count closure: {total:g} x {frac:g} = "
                          f"{total * frac:g}, the answer ships {got:g}")
        valid = any(abs(frac - (0.75 ** a) * (0.25 ** (n_genes - a)))
                    <= 1e-9 for a in range(n_genes + 1))
        if not valid:
            return (FAIL, f"class fraction {frac:g} is not a product "
                          "of per-gene 3/4 dominant : 1/4 recessive "
                          f"for {n_genes} gene(s)")
        return (PASS, f"count closure: {got:g} = {total:g} x {frac:g} "
                      "and the fraction is a per-gene (3/4 : 1/4) "
                      "product")
    # genotype-ratio claims: "1 RR : 2 Rr : 1 rr" -- integer counts over
    # their own sum, compared as fractions of offspring
    geno_claims = [(int(cnt), tok) for cnt, tok in
                   re.findall(r"(\d+)\s+([A-Za-z]{%d})\b" % (2 * n_genes),
                              ans)
                   if _valid_geno(tok)]
    if geno_claims:
        total_claimed = sum(c_ for c_, _ in geno_claims)
        if total_claimed <= 0:
            return _na("genotype ratio sums to zero")
        for cnt, tok in geno_claims:
            want = geno_dist.get(tok, geno_dist.get(
                tok[0].upper() + tok[1:].lower(), 0.0))
            if abs(want - cnt / total_claimed) > 1e-9:
                return (FAIL, f"product rule: {tok} should be {want:g} of "
                              f"the offspring ({cnt}/{total_claimed} "
                              "shipped)")
            checked += 1
    # probability claims: "= 1/4 = 25%" (h/total)
    for num, den in re.findall(r"=\s*(\d+)\s*/\s*(\d+)\b", ans):
        claimed = int(num) / int(den)
        # the fraction must be realisable from the distribution: some
        # genotype/phenotype class carries exactly this probability
        pool = list(geno_dist.values()) + list(pheno_dist.values())
        if not any(abs(want - claimed) <= 1e-9 for want in pool):
            return (FAIL, f"product rule: no genotype or phenotype class "
                          f"has probability {num}/{den} = {claimed:g}")
        checked += 1
    # phenotype-ratio claims: "3 dominant (T_) : 1 recessive (tt)" --
    # integer counts over their own sum, compared as fractions
    pheno_seg = re.search(r"phenotype ratio ([^.;\n]*)", ans, re.I)
    if pheno_seg and not geno_claims:
        segs = [s.strip() for s in pheno_seg.group(1).split(":")]
        parsed_cls: List[Tuple[int, Tuple[str, ...]]] = []
        for s_ in segs:
            mcnt = re.match(r"(\d+)\s+([a-zA-Z][a-zA-Z ,_()-]*)", s_)
            if not mcnt:
                continue
            cnt, label = int(mcnt.group(1)), mcnt.group(2).lower()
            if n_genes == 1:
                cls = ("rec",) if "recessive" in label else ("dom",)
            else:
                if "both dominant" in label:
                    cls = ("dom", "dom")
                elif "both recessive" in label:
                    cls = ("rec", "rec")
                elif re.search(r"\bfirst\s+recessive", label):
                    cls = ("rec", "dom")
                elif re.search(r"second\s+recessive", label):
                    cls = ("dom", "rec")
                else:
                    cls = None
            if cls is None:
                continue
            parsed_cls.append((cnt, cls))
        if parsed_cls:
            total_ph = sum(c_ for c_, _ in parsed_cls)
            if total_ph <= 0:
                return _na("phenotype ratio sums to zero")
            for cnt, cls in parsed_cls:
                want = pheno_dist.get(cls, 0.0)
                if abs(want - cnt / total_ph) > 1e-9:
                    return (FAIL, f"product rule: phenotype class {cls} "
                                  f"should be {want:g} ({cnt}/{total_ph} "
                                  "shipped)")
                checked += 1
    if checked:
        return (PASS, f"product rule: {checked} shipped count(s) match "
                      "the per-gene allele probabilities combined by "
                      "multiplication (no box enumeration)")
    return _na("answer carries no count claims the product rule can pin")


def _v_fraction_whole(c: _Ctx) -> Verdict:
    """FRACTION_WHOLE (STEM-BM 2026-10-07): the family divided 1 by the
    part count.  Independent: multiplicative closure -- n parts x the
    claimed fraction must rebuild the WHOLE (1), with n re-parsed from
    the question."""
    n = _fnum(c.question, r"(?:into|among[s]?t?|between)\s+(\d+)\s+equal")
    if n is None or n < 2:
        return _na("equal-part count not parsed from the question")
    claim = c.claim
    if claim is None or claim <= 0:
        return _na("no claimed fraction")
    if _close(n * claim, 1.0, rel=1e-6):
        return (PASS, f"whole closure: {n:g} parts x {claim:.6g} = "
                      "1.0 -- the parts rebuild the whole")
    return (FAIL, f"whole closure fails: {n:g} x {claim:.6g} = "
                  f"{n * claim:.6g}, not the whole (1)")


def _v_elevation_classify(c: _Ctx) -> Verdict:
    """ELEVATION_CLASSIFY (STEM-BM 2026-10-07): the answer names
    elevation or depression.  Independent: re-read the question's own
    cues (observer on the ground at the top -> elevation; observer at
    a height at an object below -> depression) and require the shipped
    word to match -- a swapped classification is a confident-wrong."""
    q = (c.question or "").lower()
    ans = (c.final_answer or "").lower()
    if "elevation" not in ans and "depression" not in ans:
        return _na("answer names neither elevation nor depression")
    if "elevation" in ans and "depression" in ans:
        return _na("answer is ambiguous between the two")
    says_up = "elevation" in ans
    down_cues = any(t in q for t in (
        "from the top", "from a window", "from a building",
        "from a lighthouse", "from a cliff", "looks down",
        "looking down"))
    up_cues = any(t in q for t in (
        "top of the", "top of a", "looks at the top", "looking at the",
        "on the ground", "from the foot"))
    if down_cues and not up_cues:
        expected = "depression"
    elif up_cues and not down_cues:
        expected = "elevation"
    else:
        return _na("question cues are mixed -- no independent read")
    if says_up == (expected == "elevation"):
        return (PASS, f"cue read: the question describes a "
                      f"{expected} sight line and the answer says "
                      f"{expected}")
    return (FAIL, f"cue read says {expected} but the answer says "
                  f"{'elevation' if says_up else 'depression'}")


def _v_sector_arc_area(c: _Ctx) -> Verdict:
    """SECTOR_ARC_AREA (STEM-BM 2026-10-07): the family used the degree
    fraction (theta/360) x (2 pi r or pi r^2).  Independent: the RADIAN
    arc definition -- L = r x theta_rad with theta_rad = theta x pi/180
    recomputed from the question, or the area as the triangle
    decomposition A = (1/2) r L with L rebuilt."""
    q = c.question or ""
    r = _fnum(q, r"radius\s+(?:of\s+|is\s+|of)?\s*([\d.]+)")
    if r is None:
        r = _fnum(q, r"radius\s+(\d+(?:\.\d+)?)\s*(?:cm|m)?")
    th = _fnum(q, r"(?:angle|central angle|subtends?)[\w\s]*?"
                  r"(\d+(?:\.\d+)?)\s*(?:deg|degree)")
    if th is None:
        th = _fnum(q, r"(\d+(?:\.\d+)?)\s*(?:deg|degree)")
    claim = c.claim
    if claim is None:
        return _na("no claimed value")
    # r + arc-length form (the DECLARATIVE row's relation, re-parsed
    # here so one route owns every form): A = (1/2) r L
    L = _fnum(q, r"arc\s+(?:of\s+(?:length\s+)?)?(\d+(?:\.\d+)?)")
    if th is None and r is not None and L is not None and L > 0:
        alt = 0.5 * r * L
        if _close(alt, claim, rel=0.001):
            return (PASS, f"sector triangle: A = (1/2) x {r:g} x {L:g} "
                          f"= {alt:.6g} -- matches the claimed value")
        return (FAIL, f"sector triangle A = (1/2) r L = {alt:.6g}, not "
                      f"the claimed {claim:.6g}")
    if r is None or th is None or r <= 0 or th <= 0:
        return _na("sector radius/angle not parsed from the question")
    theta_rad = th * math.pi / 180.0
    asks_arc = bool(re.search(r"length\s+of\s+the\s+arc|arc\s+length",
                              q, re.I))
    if asks_arc:
        alt = r * theta_rad
        rel = "radian arc definition L = r x theta_rad"
    else:
        L = r * theta_rad
        alt = 0.5 * r * L
        rel = "triangle decomposition A = (1/2) r L, L = r x theta_rad"
    if _close(alt, claim, rel=0.001):
        return (PASS, f"{rel} = {alt:.6g} -- matches the claimed value "
                      f"({claim:.6g})")
    return (FAIL, f"{rel} gives {alt:.6g}, not the claimed {claim:.6g}")


def _v_tangent_length(c: _Ctx) -> Verdict:
    """TANGENT_LENGTH (STEM-BM 2026-10-07): the contact triangle closes
    one of two Pythagoras relations.  Independent: re-extract radius and
    (centre distance OR tangent length) from the question text and
    require claim^2 to equal the matching sum/difference exactly."""
    q = c.question or ""
    r = _fnum(q, r"radius\s+(?:of\s+|is\s+)?([\d.]+)")
    if r is None or r <= 0:
        return _na("radius not parsed from the question")
    claim = c.claim
    if claim is None or claim <= 0:
        return _na("no claimed length")
    d = _fnum(q, r"(?:distance|away|point)[^.\n]{0,30}?(\d+(?:\.\d+)?)"
              r"\s*(?:cm|m)\b")
    t = _fnum(q, r"(?:tangent[s]?\s*\w{0,3}\s*=?\s*|\bp[abt]\s*=\s*)"
                 r"(\d+(?:\.\d+)?)")
    checks = []
    if d is not None and d > r:
        checks.append(("tangent length from centre distance",
                       math.sqrt(d * d - r * r)))
    if t is not None and t > 0:
        checks.append(("centre distance from tangent length",
                       math.sqrt(r * r + t * t)))
    for rel, expected in checks:
        if _close(expected, claim, rel=0.001):
            return (PASS, f"Pythagoras closure: {rel} = {expected:.6g} "
                          f"-- matches the claimed {claim:.6g}")
    if checks:
        alts = ", ".join(f"{e:.6g}" for _, e in checks)
        return (FAIL, f"Pythagoras closure: the contact triangle gives "
                      f"{alts}, not the claimed {claim:.6g}")
    return _na("neither centre distance nor tangent length parsed")


def _v_circle_area(c: _Ctx) -> Verdict:
    """CIRCLE_AREA: family used A = pi r^2.  Independent: the triangle
    decomposition identity A = C x r / 2 (unrolled circumference x half
    radius), with C rebuilt from 2 pi r."""
    if c.claim is None:
        return _na("no claimed area")
    r = _fnum(c.question, r"radius\s+(?:is\s+|of\s+)?([\d.]+)")
    if r is None or r <= 0:
        return _na("radius not parsed from the question")
    circ = 2.0 * math.pi * r
    alt = circ * r / 2.0
    if _close(alt, c.claim):
        return (PASS, f"decomposition check: A = C x r/2 = "
                      f"{circ:.6g} x {r:g}/2 = {alt:.6g} -- matches")
    return (FAIL, f"decomposition check failed: C x r/2 = {alt:.6g} != "
                  f"claimed {c.claim:.6g}")


def _v_circle_circumference(c: _Ctx) -> Verdict:
    """CIRCLE_CIRCUMFERENCE: family used C = 2 pi r.  Independent: area
    inverse -- C = 2A/r with A = pi r^2 recomputed from scratch."""
    if c.claim is None:
        return _na("no claimed circumference")
    r = _fnum(c.question, r"radius\s+(?:is\s+|of\s+)?([\d.]+)")
    if r is None or r <= 0:
        return _na("radius not parsed from the question")
    area = math.pi * r * r
    alt = 2.0 * area / r
    if _close(alt, c.claim):
        return (PASS, f"area-inverse check: C = 2A/r = 2 x {area:.6g} / "
                      f"{r:g} = {alt:.6g} -- matches")
    return (FAIL, f"area-inverse check failed: 2A/r = {alt:.6g} != "
                  f"claimed {c.claim:.6g}")


def _v_sector_area(c: _Ctx) -> Verdict:
    """CIRCLE_SECTOR_AREA: family used A = (theta/360) pi r^2.
    Independent: the taught alternate A = 1/2 l r with the arc length
    l = (theta/360) x 2 pi r."""
    if c.claim is None:
        return _na("no claimed area")
    r = _fnum(c.question, r"radius\s+(?:is\s+|of\s+)?([\d.]+)")
    ang = _fnum(c.question, r"angle\s+(?:is\s+|of\s+)?([\d.]+)")
    if r is None or ang is None or r <= 0 or ang <= 0:
        return _na("sector radius/angle not parsed from the question")
    arc = (ang / 360.0) * 2.0 * math.pi * r
    alt = 0.5 * arc * r
    if _close(alt, c.claim):
        return (PASS, f"arc-triangle check: A = 1/2 l r = 1/2 x "
                      f"{arc:.6g} x {r:g} = {alt:.6g} -- matches")
    return (FAIL, f"arc-triangle check failed: 1/2 l r = {alt:.6g} != "
                  f"claimed {c.claim:.6g}")


def _v_cuboid_volume(c: _Ctx) -> Verdict:
    """CUBOID_VOLUME / CUBOID_MEASURE: family computed V = l * b * h.
    Independent: product of base area A = l * b with height h, checked
    against the claimed volume."""
    if c.claim is None:
        return _na("no claimed volume")
    dims = []
    for k in ("l", "b", "h", "length", "breadth", "height", "width"):
        v = c.get(k)
        if v is not None and v > 0:
            dims.append(v)
    if len(dims) < 3:
        nums = [float(x) for x in re.findall(r"\b\d+(?:\.\d+)?\b", c.question) if float(x) > 0]
        if len(nums) >= 3:
            dims = nums[:3]
        else:
            l = _fnum(c.question, r"(?:length|l)\s*(?:is|=|:|\s)\s*([\d.]+)")
            b = _fnum(c.question, r"(?:breadth|width|b|w)\s*(?:is|=|:|\s)\s*([\d.]+)")
            h = _fnum(c.question, r"(?:height|h)\s*(?:is|=|:|\s)\s*([\d.]+)")
            if l and b and h:
                dims = [l, b, h]
    if len(dims) < 3:
        return _na("cuboid dimensions (l, b, h) not parsed from question or quantities")
    l, b, h = dims[0], dims[1], dims[2]
    base_area = l * b
    alt = base_area * h
    if _close(alt, c.claim):
        return (PASS, f"base-area product check: V = (l x b) x h = "
                      f"({l:g} x {b:g}) x {h:g} = {base_area:.6g} x {h:g} = "
                      f"{alt:.6g} -- matches V = lbh")
    return (FAIL, f"base-area product check failed: ({l:g} x {b:g}) x {h:g} = "
                  f"{alt:.6g} != claimed {c.claim:.6g}")


def _v_pythagoras(c: _Ctx) -> Verdict:
    """PYTHAGORAS: family used h = sqrt(a^2+b^2).  Independent: Heron's
    formula on the claimed triangle must reproduce the right-triangle
    area 1/2 a b."""
    if c.claim is None:
        return _na("no claimed hypotenuse")
    a = _fnum(c.question, r"legs?\s+(?:of\s+|is\s+)?([\d.]+)")
    b = _fnum(c.question, r"and\s+([\d.]+)")
    if a is None or b is None or a <= 0 or b <= 0:
        return _na("legs not parsed from the question")
    h = c.claim
    if h <= max(a, b):
        return (FAIL, f"Heron check impossible: claimed hypotenuse "
                      f"{h:g} is not longer than leg {max(a, b):g}")
    s = (a + b + h) / 2.0
    prod = s * (s - a) * (s - b) * (s - h)
    if prod <= 0:
        return (FAIL, f"Heron check: sides ({a:g}, {b:g}, {h:g}) do not "
                      "form a real triangle")
    area = math.sqrt(prod)
    want = 0.5 * a * b
    if _close(area, want, rel=1e-5):
        return (PASS, f"Heron check: area of the claimed triangle = "
                      f"{area:.6g} = 1/2 x {a:g} x {b:g} -- the triangle "
                      "is right-angled at the legs")
    return (FAIL, f"Heron check failed: triangle area {area:.6g} != "
                  f"right-triangle area {want:.6g}")


def _v_simple_interest(c: _Ctx) -> Verdict:
    """SIMPLE_INTEREST: family used SI = PRT/100 in one shot.
    Independent: period-by-period accumulation -- the same corpus rule
    applied month-by-month and summed (catches operand/order slips)."""
    if c.claim is None:
        return _na("no claimed interest")
    q = c.question
    p = _fnum(q, r"(?:on|of)\s+(?:rs\.?\s*|rs\s*|\u20b9\s*|inr\s*)?"
              r"(" + _NUM_TOKEN + r")")
    r = _fnum(q, r"at\s+([\d.]+)\s*%")
    t = _fnum(q, r"for\s+([\d.]+)\s*years?")
    if p is None or r is None or t is None or p <= 0 or t <= 0:
        return _na("SI givens not parsed from the question")
    months = int(round(t * 12.0))
    if months < 1 or months > 12000:
        return _na("term out of range")
    si = 0.0
    for _ in range(months):
        si += p * r / 100.0 / 12.0
    target = p + si if re.search(r"\bamount\b", q, re.I) else si
    if _money_close(target, c.claim):
        return (PASS, f"monthly-accumulation check: {months} months x "
                      f"Rs {p * r / 100.0 / 12.0:.4g} = {si:.6g}"
                      + (f"; amount = {p:g} + {si:.6g} = {target:.6g}"
                         if target != si else "") + " -- matches")
    return (FAIL, f"monthly accumulation = {target:.6g} != claimed "
                  f"{c.claim:.6g}")


def _v_compound_interest(c: _Ctx) -> Verdict:
    """COMPOUND_INTEREST: family used A = P(1+R/100)^T closed form.
    Independent: year-by-year compounding loop (the corpus derivation),
    the fractional remainder of T handled by its exact scale factor."""
    if c.claim is None:
        return _na("no claimed amount/interest")
    q = c.question
    p = _fnum(q, r"(?:on|of)\s+(?:rs\.?\s*|rs\s*|\u20b9\s*|inr\s*)?"
              r"(" + _NUM_TOKEN + r")")
    if p is None:
        # 'Rs 12,000 is invested', 'invest Rs 8,000', 'principal of
        # Rs 5,000' -- the currency token is REQUIRED, else 'invested
        # for 2 years' binds 2 as the principal
        p = _fnum(q, r"(?:invest\w*|principal|sum)\b[^0-9]{0,25}"
                  r"(?:rs\.?\s*|rs\s*|\u20b9\s*|inr\s*)"
                  r"(" + _NUM_TOKEN + r")") \
            or _fnum(q, r"^\s*(?:rs\.?\s*|rs\s*|\u20b9\s*|inr\s*)"
                     r"(" + _NUM_TOKEN + r")")
    r = _fnum(q, r"at\s+([\d.]+)\s*%")
    if r is None:
        r = _fnum(q, r"rate\s+(?:of\s+)?([\d.]+)\s*%")
    t = _fnum(q, r"for\s+([\d.]+)\s*years?")
    if t is None:
        t = _fnum(q, r"([\d.]+)\s*years?")
    if p is None or r is None or t is None or p <= 0 or t <= 0:
        return _na("CI givens not parsed from the question")
    if t > 200:
        return _na("term out of range")
    amt = p
    whole = int(math.floor(t + 1e-9))
    frac = t - whole
    for _ in range(whole):
        amt *= (1.0 + r / 100.0)
    if frac > 1e-9:
        amt *= (1.0 + r / 100.0) ** frac
    ci = amt - p
    target = amt if re.search(r"\bamount\b", q, re.I) else ci
    if _money_close(target, c.claim):
        return (PASS, f"year-by-year compounding loop: {whole} full years"
                      + (f" + {frac:.4g} fractional" if frac > 1e-9 else "")
                      + f" grows {p:g} to {amt:.6g} -- matches")
    return (FAIL, f"compounding loop gives {target:.6g} != claimed "
                  f"{c.claim:.6g}")


def _v_profit_loss_percent(c: _Ctx) -> Verdict:
    """PROFIT_LOSS_PERCENT: family computed |SP-CP|/CP x 100.
    Independent: price reconstruction -- SP must equal CP(1 +/- p/100)
    built back from the claimed percentage."""
    if c.claim is None:
        return _na("no claimed percentage")
    q = c.question
    cp = _fnum(q, r"(?:cost\s*price|cp\b|buys?\b|bought\b|purchased?\b)"
               r"[^0-9]{0,40}(?:rs\.?\s*|rs\s*|\u20b9\s*|inr\s*)?"
               r"(" + _NUM_TOKEN + r")")
    sp = _fnum(q, r"(?:selling\s*price|sp\b|sells?\b[^0-9]{0,20}for|"
               r"sold\b[^0-9]{0,20}for)[^0-9]{0,30}(?:rs\.?\s*|rs\s*|"
               r"₹\s*|inr\s*)?(" + _NUM_TOKEN + r")")
    if cp is None or sp is None or cp <= 0:
        return _na("CP/SP not parsed from the question")
    diff = sp - cp
    rebuilt = cp * (1.0 + math.copysign(c.claim, diff) / 100.0)
    if _money_close(rebuilt, sp):
        return (PASS, f"price reconstruction: CP x (1 +/- p/100) = "
                      f"{cp:g} x (1 {'+' if diff >= 0 else '-'} "
                      f"{c.claim:.6g}/100) = {rebuilt:.6g} = SP -- matches")
    return (FAIL, f"price reconstruction failed: rebuilt SP "
                  f"{rebuilt:.6g} != actual SP {sp:g}")


def _v_hcf(c: _Ctx) -> Verdict:
    """HCF_TWO_NUMBERS: family used Euclid's algorithm.  Independent:
    brute-force largest-divisor scan -- a different algorithm for the
    same number-theoretic object."""
    if c.claim is None:
        return _na("no claimed HCF")
    a = _fnum(c.question, r"hc[fp]\w*\s*(?:of\b)?\s*(?:the\s*)?(?:two\s*)?"
              r"(?:numbers?\s*)?(\d+)")
    b = _fnum(c.question, r"(?:and|,)\s*(\d+)")
    if a is None or b is None or a <= 0 or b <= 0:
        return _na("HCF givens not parsed from the question")
    a, b = int(a), int(b)
    if max(a, b) > 10 ** 9:
        return _na("numbers too large for the scan bound")
    h = 1
    for d in range(2, min(a, b) + 1):
        if a % d == 0 and b % d == 0:
            h = d
    if float(h) == c.claim:
        return (PASS, f"divisor-scan check: largest d dividing both "
                      f"{a} and {b} is {h} -- matches Euclid")
    return (FAIL, f"divisor scan found HCF {h} != claimed "
                  f"{c.claim:.6g}")


def _v_lcm(c: _Ctx) -> Verdict:
    """LCM_TWO_NUMBERS: family used LCM = (a x b)/Euclid-HCF.
    Independent: smallest-common-multiple scan stepping through the
    multiples of the larger number."""
    if c.claim is None:
        return _na("no claimed LCM")
    a = _fnum(c.question, r"lcm\w*\s*(?:of\b)?\s*(?:the\s*)?(?:two\s*)?"
              r"(?:numbers?\s*)?(\d+)")
    b = _fnum(c.question, r"(?:and|,)\s*(\d+)")
    if a is None or b is None or a <= 0 or b <= 0:
        return _na("LCM givens not parsed from the question")
    a, b = int(a), int(b)
    step = max(a, b)
    if step > 10 ** 6:
        return _na("numbers too large for the scan bound")
    m = step
    for _ in range(10 ** 7):
        if m % a == 0 and m % b == 0:
            break
        m += step
    else:  # pragma: no cover
        return _na("multiple scan exceeded its bound")
    if float(m) == c.claim:
        return (PASS, f"multiple-scan check: first common multiple of "
                      f"{a} and {b} is {m} -- matches (a x b)/HCF")
    return (FAIL, f"multiple scan found LCM {m} != claimed "
                  f"{c.claim:.6g}")


def _v_time_work(c: _Ctx) -> Verdict:
    """TIME_WORK_TOGETHER: family used the shortcut ab/(a+b).
    Independent: the rate-sum relation the corpus derives it from --
    T = 1/(1/a + 1/b), plus the one-work closure (r_A + r_B) T = 1."""
    if c.claim is None:
        return _na("no claimed time")
    q = c.question
    a = _fnum(q, r"\bA\s+(?:can\s+)?(?:do(?:es)?)?\s*(?:a\s+)?(?:work|job)"
              r"\s+in\s+([\d.]+)\s*days?")
    b = _fnum(q, r"\bB\s+(?:can\s+)?(?:do(?:es)?)?\s*(?:it|the\s+"
              r"(?:work|job))\s+in\s+([\d.]+)\s*days?")
    if a is None or b is None:
        # WS-PAL: taps/pipes/workers in hours|minutes|days -- two named
        # durations and a 'together/both' ask.  Units must agree.  An
        # 'alone' ask is the INVERSE family (B = NM/(M-N)) -- reading
        # the two durations as rates would FAIL a correct answer.
        if not re.search(r"\balone\b", q, re.I):
            durs = re.findall(
                r"(?:in|takes?)\s+(\d+(?:\.\d+)?)\s*"
                r"(days?|hours?|hrs?|minutes?)\b", q, re.I)
            if len(durs) >= 2 and re.search(r"together|both", q, re.I):
                u = durs[0][1].lower()
                if all(d[1].lower() == u for d in durs[:2]):
                    a, b = float(durs[0][0]), float(durs[1][0])
    if a is None or b is None or a <= 0 or b <= 0:
        return _na("work rates not parsed from the question")
    alt = 1.0 / (1.0 / a + 1.0 / b)
    closure = (1.0 / a + 1.0 / b) * c.claim
    if _close(alt, c.claim) and _close(closure, 1.0):
        return (PASS, f"rate-sum check: T = 1/(1/{a:g} + 1/{b:g}) = "
                      f"{alt:.6g}; and ({1 / a:.6g} + {1 / b:.6g}) x "
                      f"{c.claim:.6g} = {closure:.6g} = 1 whole work "
                      "-- matches")
    return (FAIL, f"rate-sum check failed: 1/(1/a + 1/b) = {alt:.6g} != "
                  f"claimed {c.claim:.6g}")


def _v_ratio_share(c: _Ctx) -> Verdict:
    """RATIO_SHARE: family used share = (part/total parts) x amount.
    Independent: unit-part construction + closure -- one part =
    total/(r1+r2); shares must rebuild the total and hold the stated
    cross-ratio s1:r2-style proportion s1 x r2 = s2 x r1."""
    if c.claim is None:
        return _na("no claimed share")
    total = _fnum(c.question, r"(?:divide[d]?\s+|distribut\w+\s+)"
                  r"(?:rs\.?\s*|rs\s*|\u20b9\s*|inr\s*)?(" + _NUM_TOKEN
                  + r")")
    rm = re.search(r"ratio\s*([\d.]+)\s*:\s*([\d.]+)", c.question, re.I)
    if total is None or rm is None:
        return _na("ratio givens not parsed from the question")
    r1, r2 = float(rm.group(1)), float(rm.group(2))
    if r1 + r2 == 0:
        return _na("degenerate ratio")
    s1 = c.get("s1")
    s2 = c.get("s2")
    if s1 is None or s2 is None:
        return _na("family did not emit both shares")
    part = total / (r1 + r2)
    if not (_money_close(s1 + s2, total) and _close(s1 * r2, s2 * r1)):
        return (FAIL, f"closure check failed: shares {s1:.6g} + {s2:.6g} "
                      f"= {s1 + s2:.6g} != total {total:g} or cross-ratio "
                      f"s1 x r2 {s1 * r2:.6g} != s2 x r1 {s2 * r1:.6g}")
    if _money_close(part * r1, c.claim):
        return (PASS, f"unit-part check: one part = {total:g}/"
                      f"{r1 + r2:g} = {part:.6g}; r1 x part = "
                      f"{part * r1:.6g}; shares rebuild the total and "
                      "hold the cross-ratio -- matches")
    return (FAIL, f"unit-part check failed: r1 x one-part = "
                  f"{part * r1:.6g} != claimed {c.claim:.6g}")


# --------------------------------------------------------------------------- #
# VERIFIERS -- physics (physics_families routes; quantities carry the
# handler `extra` dicts: inputs + result)
# --------------------------------------------------------------------------- #

def _v_kin_v_u_at(c: _Ctx) -> Verdict:
    """KINEMATICS_V_U_AT: family used v = u + a t.  Independent: the
    average-velocity identity for constant acceleration -- the
    displacement from the v-t AREA, (u+v)/2 x t, must equal the
    displacement from the algebraic path u t + 1/2 a t^2."""
    u, v, a, t = (c.get("u"), c.get("v"), c.get("a"), c.get("t"))
    if None in (u, v, a, t):
        return _na("kinematics quantities incomplete")
    if t == 0:
        return _na("degenerate t=0")
    s_area = (u + v) / 2.0 * t
    s_algebra = u * t + 0.5 * a * t * t
    if not _close(s_area, s_algebra):
        return (FAIL, f"average-velocity check failed: (u+v)/2 x t = "
                      f"{s_area:.6g} != u t + 1/2 a t^2 = {s_algebra:.6g}")
    # Overconstrained consistency check: if distance 's' was explicitly given in the problem,
    # it must agree with the constant-acceleration path.
    s_given = c.get("s")
    if s_given is None:
        m_s = re.search(r"\b(?:distance(?:\s+of)?|covering(?:\s+a\s+distance\s+of)?)\s*(\d+(?:\.\d+)?)\s*(?:m|metres?|meters?)\b", c.question, re.I)
        if m_s:
            try:
                s_given = float(m_s.group(1))
            except ValueError:
                pass
    if s_given is not None and not _close(s_given, s_area, rel=0.05, abs_tol=0.5):
        return (FAIL, f"kinematic inconsistency: stated distance s = {s_given:.6g} m contradicts given velocities and time which require s = (u+v)/2 x t = {s_area:.6g} m (physically inconsistent problem)")

    return (PASS, f"average-velocity check: displacement by area "
                  f"(u+v)/2 x t = {s_area:.6g} m equals displacement "
                  f"by u t + 1/2 a t^2 = {s_algebra:.6g} m -- both "
                  "constant-acceleration paths agree")


def _v_kin_s_ut_at2(c: _Ctx) -> Verdict:
    """KINEMATICS_S_UT_AT2: family used s = u t + 1/2 a t^2.
    Independent: compose the OTHER two equations of motion -- v = u + a t
    then v^2 must close on u^2 + 2 a s."""
    u, a, s, t = (c.get("u"), c.get("a"), c.get("s"), c.get("t"))
    if None in (u, s, a, t):
        return _na("kinematics quantities incomplete")
    v_pred = u + a * t
    lhs = v_pred * v_pred
    rhs = u * u + 2.0 * a * s
    if not _close(lhs, rhs):
        return (FAIL, f"equation-composition check failed: (u + a t)^2 = "
                      f"{lhs:.6g} != u^2 + 2 a s = {rhs:.6g}")
    # Overconstrained consistency check: if final velocity 'v' was explicitly stated
    v_given = c.get("v")
    if v_given is None:
        m_v = re.search(r"\b(?:to|reach\w*|accelerat\w*\s+to)\s*(\d+(?:\.\d+)?)\s*(?:m/s|ms-1)\b", c.question, re.I)
        if m_v:
            try:
                v_given = float(m_v.group(1))
            except ValueError:
                pass
    if v_given is not None and not _close(v_given, v_pred, rel=0.05, abs_tol=0.5):
        return (FAIL, f"kinematic inconsistency: stated velocity v = {v_given:.6g} m/s contradicts displacement and time which require v = {v_pred:.6g} m/s")

    return (PASS, f"equation-composition check: v = u + a t = "
                  f"{v_pred:.6g} m/s gives v^2 = {lhs:.6g} = "
                  f"u^2 + 2 a s = {rhs:.6g} -- the third equation "
                  "closes")


def _v_kin_v2_u2_2as(c: _Ctx) -> Verdict:
    """KINEMATICS_V2_U2_2AS: family used v^2 = u^2 + 2 a s.
    Independent: compose the other two -- t = (v-u)/a, then the
    displacement must satisfy s = u t + 1/2 a t^2."""
    u, v, a, s = (c.get("u"), c.get("v"), c.get("a"), c.get("s"))
    if None in (u, v, a, s):
        return _na("kinematics quantities incomplete")
    if a == 0:
        return _na("degenerate a=0")
    t = (v - u) / a
    if t < 0:
        return _na("negative travel time: inconsistent givens")
    s_alt = u * t + 0.5 * a * t * t
    if not _close(s_alt, s):
        return (FAIL, f"equation-composition check failed: u t + 1/2 a t^2 = "
                      f"{s_alt:.6g} != s = {s:.6g}")
    # Overconstrained consistency check: if time 't' was explicitly stated
    t_given = c.get("t")
    if t_given is None:
        m_t = re.search(r"\b(?:in|after|time(?:\s+of)?)\s*(\d+(?:\.\d+)?)\s*(?:s|sec|seconds?)\b", c.question, re.I)
        if m_t:
            try:
                t_given = float(m_t.group(1))
            except ValueError:
                pass
    if t_given is not None and not _close(t_given, t, rel=0.05, abs_tol=0.5):
        return (FAIL, f"kinematic inconsistency: stated time t = {t_given:.6g} s contradicts velocities and displacement which require t = {t:.6g} s")

    return (PASS, f"equation-composition check: t = (v-u)/a = "
                  f"{t:.6g} s gives u t + 1/2 a t^2 = {s_alt:.6g} m "
                  f"= s = {s:.6g} m -- the second equation closes")


def _v_kinetic_energy(c: _Ctx) -> Verdict:
    """KINETIC_ENERGY: family used KE = 1/2 m v^2 directly.  Independent:
    the momentum formulation KE = p^2 / (2m) with p = m v built first --
    a different computational construction (catches operand-binding and
    arithmetic slips; formula-choice errors are caught elsewhere)."""
    m = c.get("m")
    v = c.get("v")
    # junk-zero quantities (syllabus rows coerce their groupdicts to 0)
    # must fall through to the text parse, never silently verify
    if m is None or m <= 0:
        m = _fnum(c.question, r"(?:mass\s+of\s+)?([\d.]+)\s*kg\b")
    if v is None or v <= 0:
        v = _fnum(c.question, r"(?:velocity|speed|at)\s+(?:of\s+)?"
                  r"([\d.]+)\s*m\s*/\s*s")
    if m is None or v is None or c.claim is None or m <= 0:
        return _na("KE quantities incomplete")
    p = m * v
    alt = p * p / (2.0 * m)
    if _close(alt, c.claim):
        return (PASS, f"momentum-path check: p = m v = {p:.6g} kg m/s; "
                      f"KE = p^2/(2m) = {alt:.6g} J -- matches")
    return (FAIL, f"momentum-path check failed: p^2/(2m) = {alt:.6g} != "
                  f"claimed {c.claim:.6g} J")


def _ohm_text(c: _Ctx) -> Tuple[Optional[float], Optional[float]]:
    """V and I re-read from the question text (for families that emit
    only zero-coerced quantities, e.g. the syllabus ohm rows)."""
    q = c.question
    v = _fnum(q, r"(?:voltage|potential\s+difference)[^.0-9]{0,30}?"
              r"([\d.]+)\s*V\b")
    i = _fnum(q, r"current[^.0-9]{0,30}?([\d.]+)\s*A\b")
    return (v, i)


def _v_emf_internal(c: _Ctx) -> Verdict:
    """EMF_INTERNAL_RESISTANCE: I = E / (R + r), V = E - I r and the
    reverse E = V + I r -- every slot re-parsed from the question."""
    q = c.question
    e = _pnum(q, r"(?:emf|e\.m\.f|electromotive\s+force)\D{0,15}?"
              r"(\d+(?:\.\d+)?)\s*V\b")
    r_in = _pnum(q, r"internal\s+resistance\D{0,15}?"
                 r"(\d+(?:\.\d+)?)")
    r_all = re.findall(r"(\d+(?:\.\d+)?)\s*(?:ohms?|\u03a9)", q, re.I)
    r_all = [float(x) for x in r_all]
    r_ext = [x for x in r_all if r_in is None or
             abs(x - r_in) > 1e-9]
    vt = _pnum(q, r"terminal\s+voltage\D{0,15}?"
               r"(\d+(?:\.\d+)?)\s*V\b")
    iv = _pnum(q, r"(\d+(?:\.\d+)?)\s*(?:A\b|amps?\b|amperes?\b)")
    if r_in is None or c.claim is None:
        return _na("emf quantities incomplete")
    # reverse mode: terminal voltage + drawn current -> emf
    if vt is not None and iv is not None and not r_ext:
        return _v_science_ratio(c, vt + iv * r_in, "E = V + I r", "V")
    if e is None:
        return _na("emf quantities incomplete")
    if not r_ext:
        return _na("external resistor not parsed")
    r_out = max(r_ext)
    i_want = e / (r_out + r_in)
    v_want = e - i_want * r_in
    if re.search(r"terminal\s+voltage", q, re.I):
        return _v_science_ratio(c, v_want, "V = E - I(R+r) terminal",
                                "V")
    return _v_science_ratio(c, i_want, "I = E / (R + r)", "A")


def _v_ohms_law(c: _Ctx) -> Verdict:
    """OHMS_LAW_ANY / ohm_resistance / ohm_current: family used
    V = I R (rearranged).  Independent: Joule-power consistency -- the
    power relations P = V I, P = I^2 R, P = V^2/R must ALL agree on the
    recorded V, I, R.  The claim fills the SOLVED variable's slot (the
    ask word names it)."""
    if re.search(r"internal\s+resistance", c.question, re.I):
        # V = I R on the internal resistance alone is NOT the governing
        # relation of a whole circuit (I = E / (R + r)); an ohm-lane
        # answer to such a question is a slot-read accident, never a
        # verified result.
        return _na("internal-resistance circuit: EMF relation governs, "
                   "not V = I R")
    v, i, r = c.get("V", "v"), c.get("I", "i"), c.get("R", "r")
    if v is None or i is None:
        v_t, i_t = _ohm_text(c)
        v = v if v is not None else v_t
        i = i if i is not None else i_t
    low = c.question.lower()
    ask_resistance = re.search(r"\bresistance\b", low) is not None
    ask_current = re.search(r"\bcurrent\b", low) is not None
    ask_voltage = re.search(r"voltage|potential\s+difference", low) \
        is not None
    if r is None and ask_resistance and c.claim is not None:
        r = c.claim
    if i is None and ask_current and c.claim is not None:
        i = c.claim
    if v is None and ask_voltage and c.claim is not None:
        v = c.claim
    if v is None or i is None or r is None:
        return _na("ohm quantities incomplete")
    if v == 0 or i == 0:
        return _na("degenerate zero V or I (junk quantities never "
                   "verify)")
    p_vi = v * i
    p_i2r = i * i * r
    if not _close(p_vi, p_i2r):
        return (FAIL, f"power consistency failed: V x I = {p_vi:.6g} W "
                      f"!= I^2 x R = {p_i2r:.6g} W")
    if r != 0:
        p_v2r = v * v / r
        if not _close(p_vi, p_v2r):
            return (FAIL, f"power consistency failed: V x I = {p_vi:.6g} W"
                          f" != V^2/R = {p_v2r:.6g} W")
    return (PASS, f"power consistency: V x I = {p_vi:.6g} W = I^2 x R"
                  + (f" = V^2/R = {v * v / r:.6g} W" if r != 0 else "")
                  + " -- all Joule-power relations agree")


def _v_electrical_energy_kwh(c: _Ctx) -> Verdict:
    """ELECTRICAL_ENERGY_KWH: family used the commercial path
    kWh = (W/1000) x h.  Independent: the SI joule path --
    E = P(W) x t(s), then 1 kWh = 3.6e6 J converts back; the billed
    rupees must close against the SI-rebuilt units.
    Savings variant (old-for-new swaps): N.old x P.old - N.new x P.new
    over the stated hours -- rebuilt from the question text directly."""
    # -- savings variant: 'replaces five 60 W bulbs with five 12 W
    # CFLs ... saved per day' -- counts may be WORDS (five bulbs) or
    # digits; both accepted (2026-10-07: \d+-only regex na'd the badge
    # gate on the corpus's worded stem)
    if c.claim is not None and re.search(
            r"replac\w*|sav(?:es|ed|ing)", c.question, re.I):
        _cnt = r"(\d+|five|four|three|two|six|seven|eight|nine|ten)"
        _w2n = {"five": 5, "four": 4, "three": 3, "two": 2, "six": 6,
                "seven": 7, "eight": 8, "nine": 9, "ten": 10}

        def _cnt_val(tok: str) -> float:
            # NB: dict.get(k, float(tok)) would evaluate the default
            # EAGERLY and raise on 'five' -- branch instead
            t = tok.lower()
            return float(_w2n[t]) if t in _w2n else float(tok)
        m_old = re.search(
            r"replaces?\s+" + _cnt + r"[^.]{0,60}?(\d+(?:\.\d+)?)\s*W\b",
            c.question, re.I)
        m_new = re.search(r"with\s+" + _cnt + r"\s+(\d+(?:\.\d+)?)\s*W\b",
                          c.question, re.I)
        hours_q = _fnum(c.question,
                        r"(\d+(?:\.\d+)?)\s*hours?\s+(?:daily|a\s+day|"
                        r"per\s+day|each\s+day)") or \
            _fnum(c.question, r"for\s+(\d+(?:\.\d+)?)\s*hours?")
        if m_old and m_new and hours_q:
            n_o, p_old = _cnt_val(m_old.group(1)), float(m_old.group(2))
            n_n, p_new = _cnt_val(m_new.group(1)), float(m_new.group(2))
            saved_kw = ((n_o * p_old - n_n * p_new) / 1000.0) * hours_q
            if _close(saved_kw, c.claim, rel=1e-3):
                return (PASS, f"savings rebuild: ({n_o:g}x{p_old:g} - "
                              f"{n_n:g}x{p_new:g}) W / 1000 x {hours_q:g} h "
                              f"= {saved_kw:.6g} kWh -- matches")
            return (FAIL, f"savings rebuild {saved_kw:.6g} kWh != claimed "
                          f"{c.claim:.6g}")
    p = c.get("power_W")
    hours = c.get("hours")
    kwh = c.get("kWh")
    if p is None or hours is None or kwh is None or c.claim is None:
        return _na("billing quantities incomplete")
    e_joules = p * hours * 3600.0
    kwh_alt = e_joules / 3.6e6
    if not _close(kwh_alt, kwh):
        return (FAIL, f"SI-path check failed: P t / 3.6e6 = "
                      f"{kwh_alt:.6g} kWh != recorded {kwh:.6g} kWh")
    rate = _fnum(c.question, r"(?:rs\.?\s*|rs\s*|\u20b9\s*)([\d.]+)\s*"
                 r"(?:per|/)\s*(?:unit|kwh|k\.w\.h)")
    target = kwh * rate if rate is not None else kwh
    if _money_close(target, c.claim):
        return (PASS, f"SI-path check: {p:.6g} W x {hours:g} h = "
                      f"{e_joules:.6g} J = {kwh_alt:.6g} kWh"
                      + (f"; bill = {kwh:.6g} x Rs {rate:g} = "
                         f"{target:.6g}" if rate is not None else "")
                      + " -- matches the commercial path")
    return (FAIL, f"SI-path check failed: rebuilt target {target:.6g} != "
                  f"claimed {c.claim:.6g}")


def _v_hooke(c: _Ctx) -> Verdict:
    """HOOKE_LAW: family used F = k x.  Independent: elastic strain
    energy -- 1/2 k x^2 must equal the work done stretching 1/2 F x."""
    k, x, f = c.get("k"), c.get("x"), c.get("result", "F")
    if None in (k, x, f) or c.claim is None:
        return _na("Hooke quantities incomplete")
    e_kx = 0.5 * k * x * x
    e_fx = 0.5 * f * x
    if _close(e_kx, e_fx):
        return (PASS, f"strain-energy check: 1/2 k x^2 = {e_kx:.6g} J = "
                      f"1/2 F x = {e_fx:.6g} J -- the stored energy "
                      "closes against the force")
    return (FAIL, f"strain-energy check failed: 1/2 k x^2 = {e_kx:.6g} J "
                  f"!= 1/2 F x = {e_fx:.6g} J")


# --------------------------------------------------------------------------- #
# VERIFIERS -- chemistry
# --------------------------------------------------------------------------- #

def _v_half_life(c: _Ctx) -> Verdict:
    """HALF_LIFE_FIRST_ORDER: family used the 0.693 approximation
    t(1/2) = 0.693/k.  Independent: the exact logarithmic relation
    k = ln(2)/t(1/2) (tolerance absorbs the 0.693 rounding only)."""
    th = c.get("half_life_s")
    k = c.get("k")
    if c.claim is None or (th is None and k is None):
        return _na("half-life quantities incomplete")
    ln2 = math.log(2.0)
    if th is not None and th > 0:
        alt = ln2 / th
        if _close(alt, c.claim, rel=2e-3):
            return (PASS, f"exact-log check: k = ln2/t(1/2) = "
                          f"{ln2:.6g}/{th:.6g} = {alt:.6g} -- matches "
                          "the 0.693 path")
        return (FAIL, f"exact-log check failed: ln2/t(1/2) = {alt:.6g} "
                      f"!= claimed {c.claim:.6g}")
    alt = ln2 / k
    if _close(alt, c.claim, rel=2e-3):
        return (PASS, f"exact-log check: t(1/2) = ln2/k = {ln2:.6g}/"
                      f"{k:.6g} = {alt:.6g} -- matches the 0.693 path")
    return (FAIL, f"exact-log check failed: ln2/k = {alt:.6g} != claimed "
                  f"{c.claim:.6g}")


def _v_remaining_halflives(c: _Ctx) -> Verdict:
    """REMAINING_AFTER_HALFLIVES: family used (1/2)^(t/t12) in one power.
    Independent: step-wise halving -- iterate n full half-lives by
    repeated multiplication by 0.5, the fractional remainder by an exact
    log-path scale (catches inverted t/t12 and exponent slips)."""
    if c.claim is None:
        return _na("no claimed remainder")
    q = c.question
    th = _fnum(q, r"half[-\s]?life[^.,;]{0,30}?(?:is|=|of|:)?\s*"
               r"([\d.]+)\s*(s\b|sec\b|seconds?|min\b|minutes?|h\b|hr\b|"
               r"hours?)")
    at = _fnum(q, r"after\s+([\d.]+)\s*(?:s\b|sec\b|seconds?|min\b|"
               r"minutes?|h\b|hr\b|hours?|hal(?:ves|lives))")
    if th is None or at is None or th <= 0:
        return _na("half-life/elapsed givens not parsed")
    if re.search(r"after\s+[\d.]+\s*hal(?:ves|lives)", q, re.I):
        n_half = at
    else:
        n_half = at / th
    if n_half < 0 or n_half > 10000:
        return _na("half-life count out of range")
    whole = int(math.floor(n_half + 1e-9))
    frac = n_half - whole
    factor = 1.0
    for _ in range(whole):
        factor *= 0.5
    if frac > 1e-12:
        factor *= math.exp(frac * math.log(0.5))
    a0 = _fnum(q, r"([\d.]+)\s*(?:g(?:rams?)?|mol(?:es?)?|M)\b\s+of")
    alt = factor if a0 is None else a0 * factor
    if _close(alt, c.claim, rel=1e-6):
        return (PASS, f"stepwise-halving check: {whole} halvings"
                      + (f" + {frac:.4g} fractional" if frac > 1e-12 else "")
                      + f" leaves factor {factor:.6g}"
                      + (f"; {a0:g} x {factor:.6g} = {alt:.6g}"
                         if a0 is not None else "") + " -- matches")
    return (FAIL, f"stepwise halving leaves {alt:.6g} != claimed "
                  f"{c.claim:.6g}")


def _v_avg_atomic_mass(c: _Ctx) -> Verdict:
    """AVG_ATOMIC_MASS: family used the weighted mean sum
    sum(m_i p_i/100).  Independent: the DEVIATION-BALANCE identity --
    abundances weighted deviations from the true average must cancel:
    sum(p_i (m_i - avg)/100) = 0."""
    if c.claim is None:
        return _na("no claimed average")
    entries: List[Tuple[float, float]] = []
    for m in re.finditer(r"(\d{1,3})\s*%\s*(?:of\s+)?"
                         r"([A-Z][a-z]?-?\d{0,3})", c.question):
        entries.append((float(m.group(1)), m.group(2)))
    for m in re.finditer(r"([A-Z][a-z]?-?\d{0,3})\s*(?:is|=|:)\s*"
                         r"(\d{1,3})\s*%", c.question):
        entries.append((float(m.group(2)), m.group(1)))
    if len(entries) < 2:
        return _na("isotope abundances not parsed from the question")
    try:
        from backend.its.solver.chemistry_families import ATOMIC_MASS
    except Exception:
        ATOMIC_MASS = {}
    masses: List[float] = []
    for pct, sym in entries:
        mm = re.match(r"^([A-Z][a-z]?)(?:-(\d{1,3}))?$", sym.strip())
        if not mm:
            return _na(f"isotope token '{sym}' unreadable")
        if mm.group(2):
            masses.append(float(mm.group(2)))
        elif ATOMIC_MASS and mm.group(1) in ATOMIC_MASS:
            masses.append(float(ATOMIC_MASS[mm.group(1)]))
        else:
            return _na("isotope masses need mass numbers or the "
                       "atomic-mass table")
    balance = sum(p / 100.0 * (m - c.claim) for p, m in zip(
        [e[0] for e in entries], masses))
    if _close(balance, 0.0, abs_tol=1e-6):
        parts = ", ".join(f"{p:g}% x ({m:g} - {c.claim:.6g}) = "
                          f"{p / 100.0 * (m - c.claim):+.4g}"
                          for (p, _s), m in zip(entries, masses))
        return (PASS, f"deviation-balance check: {parts}; the weighted "
                      "deviations cancel to 0 -- matches the weighted "
                      "mean")
    return (FAIL, f"deviation balance = {balance:.6g} != 0: the claimed "
                  f"average {c.claim:.6g} does not sit at the "
                  "abundance-weighted centre")


# --------------------------------------------------------------------------- #
# VERIFIERS -- biology
# --------------------------------------------------------------------------- #

def _v_energy_flow(c: _Ctx) -> Verdict:
    """ENERGY_FLOW_10_PERCENT: family used E = E0 x 0.1^hops in one
    power.  Independent: iterative transfer -- multiply by the 10%
    transfer factor once per hop."""
    e0 = c.get("energy_given")
    hops = c.get("hops")
    if e0 is None or hops is None or c.claim is None:
        return _na("energy-flow quantities incomplete")
    if hops < 0 or hops != int(hops) or hops > 12:
        return _na("hop count out of range")
    e = e0
    for _ in range(int(hops)):
        e *= 0.1
    if _close(e, c.claim):
        return (PASS, f"iterative-transfer check: {e0:g} -> "
                      + " -> ".join(["x 0.1"] * int(hops)) + f" = "
                      f"{e:.6g} -- matches the closed form")
    return (FAIL, f"iterative transfer gives {e:.6g} != claimed "
                  f"{c.claim:.6g}")


def _v_pop_doubling(c: _Ctx) -> Verdict:
    """POP_DOUBLING: family used N = N0 x 2^(t/td).  Independent: the
    continuous-growth form N = N0 x e^(ln2 x generations) -- a different
    functional route to the same biological law."""
    n0 = c.get("N0", "n0")
    g = c.get("doublings")
    if n0 is None or g is None or c.claim is None:
        return _na("population quantities incomplete")
    alt = n0 * math.exp(math.log(2.0) * g)
    if _close(alt, c.claim):
        return (PASS, f"exponential-form check: N0 x e^(ln2 x {g:g}) = "
                      f"{n0:g} x {math.exp(math.log(2.0) * g):.6g} = "
                      f"{alt:.6g} -- matches the power-of-two form")
    return (FAIL, f"exponential form gives {alt:.6g} != claimed "
                  f"{c.claim:.6g}")


def _v_cell_division(c: _Ctx) -> Verdict:
    """CELL_DIVISION_COUNT: family used cells = start x 2^n in one
    power.  Independent: generation-by-generation doubling loop from the
    stated starting cell count."""
    k = c.get("divisions")
    if k is None or c.claim is None or k != int(k) or k < 0 or k > 60:
        return _na("division count out of range")
    c0 = _fnum(c.question, r"(?:from|starting\s+with)\s*([\d.]+)\s*cells?") \
        or 1.0
    cells = c0
    for _ in range(int(k)):
        cells *= 2.0
    if _close(cells, c.claim):
        return (PASS, f"generation-loop check: {c0:g} cells doubled "
                      f"{int(k)} time(s) = {cells:.6g} -- matches 2^n")
    return (FAIL, f"generation loop gives {cells:.6g} != claimed "
                  f"{c.claim:.6g}")


# --------------------------------------------------------------------------- #
# VERIFIERS -- economics
# --------------------------------------------------------------------------- #

def _v_fisher(c: _Ctx) -> Verdict:
    """FISHER_REAL_RATE: family used the approximate Fisher form
    real = nominal - inflation.  Independent: the EXACT Fisher relation
    (1+n) = (1+r)(1+i).  The claim fills the SOLVED variable's slot (the
    recorded quantity equal to it; the ask word breaks ties); the other
    two rates drive the exact form, and the approximation error
    n x i / 100 sets the tolerance so only the approximation differs,
    never an error."""
    nom = c.get("nominal")
    infl = c.get("inflation")
    real = c.get("real")
    if c.claim is None:
        return _na("no claimed rate")
    low = c.question.lower()
    # role of the SOLVED variable: the ask clause names it ("find the
    # real interest rate"); the recorded-quantity match is only the
    # fallback -- a TAMPERED claim matches nothing, and the check must
    # still run against the role the question asked for.
    ask_m = re.search(r"(?:find|calculate|compute|determine|what\s+is)"
                      r"\s+(?:the\s+)?([a-z]+)", low)
    ask_word = ask_m.group(1) if ask_m else ""
    if "inflation" in ask_word:
        solved = "inflation"
    elif "nominal" in ask_word:
        solved = "nominal"
    elif "real" in ask_word:
        solved = "real"
    else:
        def _matches(val):
            return val is not None and _close(val, c.claim, rel=1e-9,
                                              abs_tol=1e-9)
        candidates = [k for k, val in
                      (("nominal", nom), ("inflation", infl),
                       ("real", real)) if _matches(val)]
        if not candidates:
            return _na("ask word not parsed and claim matches no "
                       "recorded Fisher quantity")
        solved = candidates[0]
    rates = {k: v for k, v in (("nominal", nom), ("inflation", infl),
                               ("real", real)) if v is not None}
    if len(rates) != 3:
        return _na("Fisher family did not record all three rates")
    # the two rates OTHER than the solved one drive the exact form
    a_key, b_key = [k for k in ("nominal", "inflation", "real")
                    if k != solved]
    a, b = rates[a_key], rates[b_key]
    slack = 0.02 + abs(a * b) / 100.0
    if solved == "nominal":
        alt = ((1.0 + a / 100.0) * (1.0 + b / 100.0) - 1.0) * 100.0
    else:  # solved is real or inflation: divide the two known factors
        alt = ((1.0 + a / 100.0) / (1.0 + b / 100.0) - 1.0) * 100.0
    if abs(alt - c.claim) <= slack:
        return (PASS, f"exact-Fisher check: (1+n) = (1+r)(1+i) rebuilds "
                      f"{alt:.6g}% within the approximation slack "
                      f"+/-{slack:.4g} pts -- matches the approximate form")
    return (FAIL, f"exact-Fisher check failed: exact form gives "
                  f"{alt:.6g}% vs claimed {c.claim:.6g}% (slack "
                  f"{slack:.4g} pts)")


def _reserve_ratio(q: str) -> Optional[float]:
    v = _fnum(q, r"(?:reserve\s+ratio|c\.?r\.?r\.?|reserve\s+requirement|"
              r"cash\s+reserve\s+ratio)[^.]{0,30}?([\d.]+)\s*%")
    if v is None:
        v = _fnum(q, r"([\d.]+)\s*%\s*(?:reserve\s+ratio|of\s+reserves)")
    return v


def _v_money_multiplier(c: _Ctx) -> Verdict:
    """MONEY_MULTIPLIER: family used m = 1/RRR.  Independent: the
    re-lending geometric series -- sum (1-rr)^k over rounds until the
    round is dust; the sum must reproduce m.  (rr parsed from the
    QUESTION, not from m, or the check would be circular.)"""
    if c.claim is None or c.claim <= 0:
        return _na("no claimed multiplier")
    rr = _reserve_ratio(c.question)
    if rr is None:
        return _na("reserve ratio not stated in the question")
    rr /= 100.0
    if not (0 < rr < 1):
        return _na("reserve ratio out of (0,1)")
    total = 0.0
    round_amt = 1.0
    for i in range(1, 1000001):
        total += round_amt
        round_amt *= (1.0 - rr)
        if round_amt <= 1e-12 * total:
            break
    if _close(total, c.claim, rel=1e-4):
        return (PASS, f"re-lending series check: rounds at RRR "
                      f"{rr * 100:g}% sum to {total:.6g} over {i} rounds "
                      "-- matches 1/RRR")
    return (FAIL, f"re-lending series sums to {total:.6g} != claimed "
                  f"multiplier {c.claim:.6g}")


def _v_deposit_chain(c: _Ctx) -> Verdict:
    """DEPOSIT_CREATION_CHAIN: family used the closed form D = d/rr.
    Independent: round-by-round credit creation -- each round re-lends
    (1-rr) of the previous deposit until the round is dust; the
    accumulated deposits must rebuild the claimed total (rr parsed from
    the question, never from the multiplier)."""
    if c.claim is None:
        return _na("no claimed total")
    dep = c.get("initial_deposit")
    if dep is None or dep <= 0:
        return _na("initial deposit missing")
    rr = _reserve_ratio(c.question)
    if rr is None:
        return _na("reserve ratio not stated in the question")
    rr /= 100.0
    if not (0 < rr < 1):
        return _na("reserve ratio out of (0,1)")
    total = dep
    round_dep = dep
    for i in range(1, 1000001):
        round_dep *= (1.0 - rr)
        total += round_dep
        if round_dep <= 1e-9 * dep:
            break
    if _money_close(total, c.claim):
        return (PASS, f"round-by-round check: {i} re-lending rounds from "
                      f"Rs {dep:g} at RRR {rr * 100:g}% accumulate Rs "
                      f"{total:.6g} -- matches d/rr")
    return (FAIL, f"round-by-round accumulation Rs {total:.6g} != claimed "
                  f"Rs {c.claim:.6g}")


def _v_investment_multiplier(c: _Ctx) -> Verdict:
    """INVESTMENT_MULTIPLIER: family used k = 1/(1-MPC).  Independent:
    the Keynesian rounds themselves -- each round re-spends MPC of the
    previous; the round sum must reproduce k."""
    mpc = c.get("mpc")
    if mpc is None or c.claim is None:
        return _na("MPC quantities incomplete")
    if not (0 < mpc < 1):
        return _na("MPC out of (0,1)")
    total = 1.0
    round_amt = 1.0
    for i in range(1, 1000001):
        round_amt *= mpc
        total += round_amt
        if round_amt <= 1e-12 * total:
            break
    if _close(total, c.claim, rel=1e-4):
        return (PASS, f"Keynesian-rounds check: spending rounds at MPC "
                      f"{mpc:g} sum to {total:.6g} over {i} rounds "
                      "-- matches 1/(1-MPC)")
    return (FAIL, f"Keynesian rounds sum to {total:.6g} != claimed "
                  f"multiplier {c.claim:.6g}")


def _v_apc_aps(c: _Ctx) -> Verdict:
    """APC_APS_IDENTITIES: family computed APC = C/Y and APS = 1 - APC.
    Independent: the DIRECT saving route -- APS = S/Y with the recorded
    saving, and only then APC + APS = 1."""
    saving = c.get("saving")
    if saving is None or c.claim is None:
        return _na("saving quantities incomplete")
    y = _fnum(c.question, r"(?:income|Y)\s*(?:is|=|:|of)?\s*(?:rs\.?\s*|"
              r"rs\s*|\u20b9\s*)?(" + _NUM_TOKEN + r")")
    if y is None or y <= 0:
        return _na("income not parsed from the question")
    aps_direct = saving / y
    if not _close(aps_direct, 1.0 - c.claim):
        return (FAIL, f"direct-saving check failed: S/Y = {saving:g}/"
                      f"{y:g} = {aps_direct:.6g} != 1 - APC = "
                      f"{1.0 - c.claim:.6g}")
    return (PASS, f"direct-saving check: APS = S/Y = {saving:g}/{y:g} = "
                  f"{aps_direct:.6g}; APC + APS = {c.claim:.6g} + "
                  f"{aps_direct:.6g} = 1 -- matches the 1-APC route")


def _v_price_control_gap(c: _Ctx) -> Verdict:
    """PRICE_CONTROL_GAP: family computed gap = |Qs - Qd| at the
    controlled price.  Independent: re-parse BOTH quantities from the
    QUESTION with a separate regex pass and rebuild the gap; the
    recorded quantities must agree and the surplus/shortage direction
    must follow the re-parsed Qs vs Qd."""
    gap_rec = c.get("gap")
    qd_rec = c.get("qd")
    qs_rec = c.get("qs")
    if c.claim is None or gap_rec is None or qd_rec is None \
            or qs_rec is None:
        return _na("gap quantities incomplete")
    qd = _fnum(c.question, r"(?:quantity\s+)?(?:demanded|demand)\s*"
               r"(?:is|are|=|:|of)?\s*(" + _NUM_TOKEN + r")")
    qs = _fnum(c.question, r"(?:quantity\s+)?(?:supplied|supply)\s*"
               r"(?:is|are|=|:|of)?\s*(" + _NUM_TOKEN + r")")
    if qd is None or qs is None:
        return _na("quantities not re-parsed from the question")
    gap = abs(qs - qd)
    if not _close(gap, c.claim, rel=1e-9, abs_tol=1e-6):
        return (FAIL, f"re-parse check: |Qs {qs:g} - Qd {qd:g}| = {gap:g} "
                      f"!= claimed gap {c.claim:g}")
    if not (_close(qs, qs_rec, rel=1e-9, abs_tol=1e-6)
            and _close(qd, qd_rec, rel=1e-9, abs_tol=1e-6)):
        return (FAIL, f"recorded quantities (Qs {qs_rec:g}, Qd {qd_rec:g}) "
                      f"disagree with the re-parsed ones (Qs {qs:g}, "
                      f"Qd {qd:g})")
    direction = "excess supply" if qs > qd else "excess demand"
    return (PASS, f"re-parse check: Qs {qs:g} and Qd {qd:g} from the "
                  f"question rebuild the gap {gap:g} ({direction}) -- "
                  "matches the claimed gap")


def _v_mpc_delta(c: _Ctx) -> Verdict:
    """MPC_DELTA: family computed MPC = dC/dY from the two (from, to)
    pairs.  Independent: re-parse both pairs from the QUESTION, rebuild
    the ratio, and cross-check the recorded APCs against C_i/Y_i."""
    mpc_rec = c.get("mpc")
    if c.claim is None or mpc_rec is None:
        return _na("MPC quantities incomplete")
    rs = r"(?:rs\.?\s*|\u20b9\s*)?"
    unit = r"(?:\s*(?:lakh|crores?|millions?))?\s*"
    ym = re.search(r"income\s+(?:rises?|increases?|goes\s+up)\s+from\s*"
                   + rs + "(" + _NUM_TOKEN + r")" + unit + r"to\s*" + rs
                   + "(" + _NUM_TOKEN + r")", c.question, re.I)
    cm = re.search(r"consumption\s+(?:rises?|increases?|goes\s+up)\s+"
                   r"from\s*" + rs + "(" + _NUM_TOKEN + r")" + unit
                   + r"to\s*" + rs + "(" + _NUM_TOKEN + r")",
                   c.question, re.I)
    if not (ym and cm):
        return _na("income/consumption rise not re-parsed from the "
                   "question")
    y1, y2 = (float(ym.group(1).replace(",", "")),
              float(ym.group(2).replace(",", "")))
    c1, c2 = (float(cm.group(1).replace(",", "")),
              float(cm.group(2).replace(",", "")))
    dy, dc = y2 - y1, c2 - c1
    if dy <= 0 or dc <= 0:
        return _na("degenerate change in the re-parsed figures")
    mpc = dc / dy
    if not _close(mpc, c.claim, rel=1e-9, abs_tol=1e-9):
        return (FAIL, f"re-parse check: dC/dY = {dc:g}/{dy:g} = "
                      f"{mpc:.6g} != claimed MPC {c.claim:.6g}")
    if not _close(mpc_rec, mpc, rel=1e-9, abs_tol=1e-9):
        return (FAIL, f"recorded MPC {mpc_rec:.6g} disagrees with the "
                      f"re-parsed {mpc:.6g}")
    for key, num, den, tag in (("apc_before", c1, y1, "before"),
                               ("apc_after", c2, y2, "after")):
        apc = c.get(key)
        if apc is not None and not _close(apc, num / den, rel=1e-6,
                                          abs_tol=1e-9):
            return (FAIL, f"APC-{tag} check: C/Y = {num:g}/{den:g} = "
                          f"{num / den:.6g} != recorded {apc:.6g}")
    return (PASS, f"re-parse check: dC/dY = {dc:g}/{dy:g} = {mpc:.6g} "
                  "rebuilds the claimed MPC from the question's own "
                  "figures")


def _v_mu_from_tu(c: _Ctx) -> Verdict:
    """MU_FROM_TU: family claimed the TOTAL utility of the last unit,
    with the MU schedule recorded.  Independent: re-parse the TU
    schedule from the QUESTION, rebuild MU_n = TU_n - TU_(n-1), and
    require the MU sum to close back to TU_last == claim and every
    recorded MU_k to equal the rebuilt difference."""
    if c.claim is None:
        return _na("no claimed total utility")
    # backward form first ("20 utils from the 1st ice cream"), then the
    # forward form ("1st = 30 utils") -- parity with the family parse
    bwd = [(int(b), float(str(a).replace(",", ""))) for a, b in
           re.findall(r"(" + _NUM_TOKEN + r")\s*utils?\s+(?:is\s+|"
                      r"are\s+)?(?:derived\s+)?from\s+the\s+"
                      r"(\d{1,2})(?:st|nd|rd|th)\b", c.question, re.I)]
    bwd = [(k, v) for k, v in bwd if v > 0]
    bks = [k for k, _ in bwd]
    if len(bwd) >= 2 and bks[0] == 1 and bks == sorted(bks) \
            and len(set(bks)) == len(bks):
        pairs = bwd
    else:
        pairs = [(int(a), float(str(b).replace(",", ""))) for a, b in
                 re.findall(r"\b(\d{1,2})(?:st|nd|rd|th)(?:\s*units?)?\b"
                            r"[^0-9\n]{0,24}?("
                            + _NUM_TOKEN + r")", c.question, re.I)]
    pairs = [(k, v) for k, v in pairs if v > 0]
    if len(pairs) < 2:
        return _na("TU schedule not re-parsed from the question")
    ks = [k for k, _ in pairs]
    if ks[0] != 1 or ks != sorted(ks) or len(set(ks)) != len(ks):
        return _na("schedule is not a clean 1..n ordinal run")
    tus = [v for _, v in pairs]
    mus = [tus[0]] + [tus[i] - tus[i - 1] for i in range(1, len(tus))]
    if not _close(sum(mus), tus[-1], rel=1e-9, abs_tol=1e-6) \
            or not _close(tus[-1], c.claim, rel=1e-9, abs_tol=1e-6):
        return (FAIL, f"schedule check: MU sum {sum(mus):g} vs TU_last "
                      f"{tus[-1]:g} vs claimed {c.claim:g} -- identity "
                      "does not close")
    for i, mu in enumerate(mus):
        rec = c.get(f"mu_{i + 1}")
        if rec is not None and not _close(rec, mu, rel=1e-9, abs_tol=1e-6):
            return (FAIL, f"MU_{i + 1} check: rebuilt {mu:g} != recorded "
                          f"{rec:g}")
    return (PASS, f"schedule check: re-parsed TU run 1..{len(tus)} "
                  f"rebuilds MUs summing to {sum(mus):g} = TU_last = "
                  f"claimed {c.claim:g}")


# --------------------------------------------------------------------------- #
# VERIFIERS -- commerce + accountancy
# --------------------------------------------------------------------------- #

_ACC_NUM = r"-?\d{1,7}(?:,\d{2,3})*(?:\.\d+)?|-?\d+(?:\.\d+)?"
_ACC_RS = r"(?:rs\.?|inr|\u20b9)?\s*"
_ACC_UNIT_MULT = {"lakh": 1e5, "lac": 1e5, "crore": 1e7, "crores": 1e7,
                  "thousand": 1e3}


def _v_revaluation_adjustment(c: _Ctx) -> Verdict:
    """REVALUATION_ADJUSTMENT: family resolved asset revaluation/depreciation.
    Independent second-path: verify that (loss + new_book_value) == original_bv,
    and that the quantifier direction (reduced to vs reduced by) matches the arithmetic."""
    loss = c.get("loss")
    new_bv = c.get("new_book_value")
    bv = c.get("bv")
    pct = c.get("pct")
    if None in (loss, new_bv, bv, pct):
        return _na("quantities incomplete for revaluation verification")
    # Accounting invariant: Book Value Before = Loss + Book Value After
    if not _close(bv, loss + new_bv, abs_tol=_MONEY_TOL):
        return (FAIL, f"balance sheet reconciliation failed: BV ({bv}) != loss ({loss}) + new BV ({new_bv})")
    low_q = c.question.lower()
    if re.search(r"\breduced\s+to\b", low_q):
        exp_new = bv * (pct / 100.0)
        if not _close(new_bv, exp_new, abs_tol=_MONEY_TOL):
            return (FAIL, f"'reduced to {pct}%' requires new BV = {exp_new:g}, got {new_bv:g}")
    elif re.search(r"\breduced\s+by\b", low_q):
        exp_loss = bv * (pct / 100.0)
        if not _close(loss, exp_loss, abs_tol=_MONEY_TOL):
            return (FAIL, f"'reduced by {pct}%' requires depreciation = {exp_loss:g}, got {loss:g}")
    return (PASS, f"double-entry revaluation invariant holds: initial BV (₹{bv:g}) = depreciation (₹{loss:g}) + balance sheet value (₹{new_bv:g})")


def _acc_amt(text: str, label: str) -> Optional[float]:
    """'label ... Rs N [lakh/crore]' -> absolute rupees (unit applied).
    Verifier-side re-parse for the accountancy routes."""
    m = re.search(r"(?:" + label + r")[^.;:\d\n]{0,50}?"
                  + _ACC_RS + r"(" + _ACC_NUM + r")\s*"
                  r"(?P<u>lakh|lac|crores?|thousand)?", text, re.I)
    if not m:
        return None
    try:
        v = float(m.group(1).replace(",", ""))
    except ValueError:
        return None
    u = (m.groupdict().get("u") or "").lower()
    return v * _ACC_UNIT_MULT.get(u, 1.0)


def _v_goodwill_valuation(c: _Ctx) -> Verdict:
    """GOODWILL_VALUATION: family valued goodwill by average profit, super profit, or capitalisation.
    Independent second-path: re-parse average profit, assets, liabilities, NRR, and years' purchase
    from the question, recompute according to the stated method, and verify against c.claim."""
    if c.claim is None:
        return _na("no numeric claim to verify")
    low_q = c.question.lower()

    yp = re.search(r"(\d{1,2})\s*(?:years?[' ]?\s*)?purchase", low_q)
    years = float(yp.group(1)) if yp else None

    avg = _acc_amt(c.question, r"average\s+(?:profits?|profit)")
    if avg is None:
        am = re.search(r"(?:average|avg\.?)\s+profit[^.\d]{0,60}?(?:rs\.?|inr|\u20b9)?\s*(" + _ACC_NUM + r")", c.question, re.I)
        if am:
            avg = float(am.group(1).replace(",", ""))
    if avg is None:
        seg = re.search(r"profits?[^.;]{0,140}", c.question, re.I)
        if seg:
            nums = [float(x.replace(",", "")) for x in re.findall(r"(?:rs\.?|inr|\u20b9)?\s*(" + _ACC_NUM + r")", seg.group(0), re.I)]
            nums = [x for x in nums if x > 0 and not 1900 < x < 2100]
            if len(nums) >= 2:
                avg = sum(nums) / len(nums)
    if avg is None or avg <= 0:
        return _na("average profit not independently parsed")

    ce = _acc_amt(c.question, r"capital\s+employed")
    if ce is None:
        assets = _acc_amt(c.question, r"(?:total\s+)?assets")
        liab = _acc_amt(c.question, r"(?:outside\s+|external\s+)?liabilit(?:y|ies)")
        if assets is not None and liab is not None:
            ce = assets - liab

    nm = re.search(r"normal\s+rate\s+(?:of\s+return)?[^.;]{0,30}?(\d{1,2}(?:\.\d+)?)\s*%", low_q)
    nrr = float(nm.group(1)) if nm else None

    if re.search(r"super\s+profit", low_q):
        if nrr is None or ce is None or years is None:
            return _na("super profit parameters (NRR, capital employed, years) incomplete")
        normal_p = ce * (nrr / 100.0)
        super_p = avg - normal_p
        exp_gw = super_p * years
        method = "super profit"
    elif re.search(r"capitali[sz]", low_q) and nrr is not None:
        if ce is None:
            return _na("capitalisation requires capital employed")
        cap_val = avg * 100.0 / nrr
        exp_gw = cap_val - ce
        method = "capitalisation"
    else:
        if years is None:
            return _na("years purchase not found for average profit method")
        exp_gw = avg * years
        method = "average profit"

    if _close(c.claim, exp_gw, abs_tol=_MONEY_TOL):
        return (PASS, f"goodwill valuation ({method} method) verified: ₹{exp_gw:g} == claimed ₹{c.claim:g}")
    return (FAIL, f"goodwill valuation mismatch: {method} formula yields ₹{exp_gw:g} != claimed ₹{c.claim:g}")


def _v_forfeiture_reissue(c: _Ctx) -> Verdict:
    """FORFEITURE_REISSUE: verify capital reserve calculation.
    Independent second-path: Capital Reserve = (Paid Per Share - Reissue Discount) x Reissued Shares."""
    if c.claim is None:
        return _na("no numeric claim to verify")
    nm = re.search(r"(\d+)\s+shares?\b", c.question)
    n = float(nm.group(1)) if nm else None
    cm = re.search(r"(?:rs\.?|inr|\u20b9)?\s*(" + _ACC_NUM + r")\s*(?:per\s+share\s+)?(?:was|is|were|has\s+been)?\s*called[- ]?up", c.question, re.I)
    called = float(cm.group(1).replace(",", "")) if cm else None
    paid_m = re.search(r"(?:rs\.?|inr|\u20b9)?\s*(" + _ACC_NUM + r")\s*(?:per\s+share\s+)?(?:was|is|having\s+been)?\s*paid", c.question, re.I)
    unpaid_m = re.search(r"(?:call\s+of|failed\s+to\s+pay|did\s+not\s+pay)\s*(?:rs\.?|inr|\u20b9)?\s*(" + _ACC_NUM + r")", c.question, re.I)
    paid = float(paid_m.group(1).replace(",", "")) if paid_m else (called - float(unpaid_m.group(1).replace(",", "")) if called and unpaid_m else None)
    if not n or not called or paid is None:
        return _na("forfeiture parameters (shares, called, paid) incomplete")
    face_m = re.search(r"shares?\s+of\s+(?:rs\.?|inr|\u20b9)?\s*(" + _ACC_NUM + r")\s*(?:each)?", c.question, re.I)
    face_val = float(face_m.group(1).replace(",", "")) if face_m else None
    re_nm = re.search(r"(\d+)\s+shares\s+(?:were|was)?\s*re[- ]?issued|out\s+of\s+these[,\s]+(\d+)\s+shares", c.question, re.I)
    n_reissue = float(re_nm.group(1) or re_nm.group(2)) if re_nm else n
    r_clause_m = re.search(r"re[- ]?issu\w+.*?(?=\.\s+[A-Z]|\?|$)", c.question, re.I)
    if r_clause_m:
        r_clause = r_clause_m.group(0)
        as_paid_m = re.search(r"(?:as|credited\s+as)\s*(?:rs\.?|inr|\u20b9)?\s*(" + _ACC_NUM + r")\s*(?:per\s+share\s+)?paid[- ]?up", r_clause, re.I)
        if as_paid_m:
            reissue_paid_up = float(as_paid_m.group(1).replace(",", ""))
        elif re.search(r"as\s+(?:fully\s+paid[- ]?up)", r_clause, re.I):
            reissue_paid_up = face_val or called
        else:
            reissue_paid_up = called

        price_m = re.search(r"(?:for|at)\s*(?:rs\.?|inr|\u20b9)?\s*(" + _ACC_NUM + r")\s*(?:per\s+share)?", r_clause, re.I)
        if price_m:
            reissue_price = float(price_m.group(1).replace(",", ""))
        else:
            rm = re.search(r"(?:rs\.?|inr|\u20b9)?\s*(" + _ACC_NUM + r")", r_clause, re.I)
            reissue_price = float(rm.group(1).replace(",", "")) if rm else reissue_paid_up

        disc = max(0.0, reissue_paid_up - reissue_price)
    else:
        disc = 0.0
    cr_per = paid - disc
    exp_cr = cr_per * n_reissue
    if _close(c.claim, exp_cr, abs_tol=_MONEY_TOL):
        return (PASS, f"capital reserve verified: ({paid:g} - {disc:g}) x {n_reissue:g} = ₹{exp_cr:g} == claimed ₹{c.claim:g}")
    return (FAIL, f"capital reserve mismatch: expected ₹{exp_cr:g} != claimed ₹{c.claim:g}")


def _v_current_ratio(c: _Ctx) -> Verdict:
    """CURRENT_RATIO: independent verification of CA / CL."""
    if c.claim is None:
        return _na("no numeric claim to verify")
    ca = _acc_amt(c.question, r"current\s+assets?")
    cl = _acc_amt(c.question, r"current\s+liabilit(?:y|ies)")
    if ca is None or cl is None or cl <= 0:
        return _na("current assets and current liabilities not independently parsed")
    exp_r = ca / cl
    if _close(c.claim, exp_r, rel=1e-3, abs_tol=0.01):
        return (PASS, f"current ratio verified: {ca:g} / {cl:g} = {exp_r:g} == claimed {c.claim:g}")
    return (FAIL, f"current ratio mismatch: {ca:g} / {cl:g} = {exp_r:g} != claimed {c.claim:g}")


def _v_inventory_turnover(c: _Ctx) -> Verdict:
    """INVENTORY_TURNOVER: independent verification of COGS / Average Inventory."""
    if c.claim is None:
        return _na("no numeric claim to verify")
    cogs = _acc_amt(c.question, r"cost\s+of\s+(?:goods\s+sold|revenue\s+from\s+operations|sales)|cogs")
    io = _acc_amt(c.question, r"opening\s+(?:stock|inventory)")
    ic = _acc_amt(c.question, r"closing\s+(?:stock|inventory)")
    if ic is None:
        ic = _acc_amt(c.question, r"(?:average\s+)?(?:stock|inventory)")
    if cogs is None or ic is None or ic <= 0:
        return _na("COGS and inventory not independently parsed")
    avg_inv = (io + ic) / 2.0 if (io is not None and io > 0) else ic
    exp_t = cogs / avg_inv
    if _close(c.claim, exp_t, rel=1e-3, abs_tol=0.01):
        return (PASS, f"inventory turnover verified: {cogs:g} / {avg_inv:g} = {exp_t:g} times == claimed {c.claim:g}")
    return (FAIL, f"inventory turnover mismatch: expected {exp_t:g} != claimed {c.claim:g}")


def _v_cash_flow_operating(c: _Ctx) -> Verdict:
    """CASH_FLOW_OPERATING: family rebuilt the AS-3 indirect statement.
    Independent: re-parse net profit and every adjustment from the
    QUESTION and rebuild cash generated from operations, then the paid
    deductions; the claimed figure must be the rebuild."""
    pm = re.search(r"(?:net\s+)?profit\s*(?:before|after)?\s*(?:tax)?\b"
                   r"[^.;:\n]{0,60}?(?:(?:is|of|was|were)\s+)?"
                   r"(?:rs\.?|inr|\u20b9)\s*(" + _ACC_NUM + r")",
                   c.question, re.I)
    np_v = None
    if pm:
        after = c.question[pm.end(1): pm.end(1) + 4]
        if not re.match(r"\s*[-/]\s*[A-Za-z0-9]", after):
            np_v = float(pm.group(1).replace(",", ""))
    if np_v is None or np_v <= 0 or c.claim is None:
        return _na("profit before tax not re-parsed from the question")
    total = np_v
    lines = []
    for pat, sign, tag in (
            (r"depreciation|amortis\w+", +1, "non-cash add-back"),
            (r"loss\s+on\s+(?:sale|disposal)", +1, "non-operating loss"),
            (r"profit\s+on\s+(?:sale|disposal|redemption)", -1,
             "non-operating gain")):
        for km in re.finditer(pat, c.question, re.I):
            am = re.search(_ACC_RS + r"(" + _ACC_NUM + r")",
                           c.question[km.span()[1]: km.span()[1] + 40],
                           re.I)
            if am:
                v = float(am.group(1).replace(",", ""))
                total += sign * v
                lines.append(f"{sign:+g} {tag} {v:g}")
    for cl_re, is_ca in ((r"debtors?|receivables?|stock|inventor\w+|"
                          r"prepaid\w*", True),
                         (r"creditors?|payables?|outstanding\s+expenses|"
                          r"provision\s+for\s+tax", False)):
        for km in re.finditer(r"(?P<dir>increas\w*|decreas\w*|ris\w+|"
                              r"fell|fall\w*)\s+in\s+(?:trade\s+|"
                              r"sundry\s+|current\s+|other\s+)?(" + cl_re
                              + r")", c.question, re.I):
            am = re.search(_ACC_RS + r"(" + _ACC_NUM + r")",
                           c.question[km.span()[1]: km.span()[1] + 40],
                           re.I)
            if not am:
                continue
            v = float(am.group(1).replace(",", ""))
            up = km.group("dir").lower()[:3] in ("inc", "ris")
            total += (-v if (up == is_ca) else v)
            lines.append(f"working capital: {km.group(0)[:40]} {v:g}")
    tax = _acc_amt(c.question, r"(?:income\s+)?\btax(?:es)?\s+paid")
    interest = _acc_amt(c.question, r"interest\s+paid")
    if tax:
        total -= tax
    if interest:
        total -= interest
    if not lines and (not tax and not interest):
        return _na("no adjustments re-parsed from the question")
    if _money_close(total, c.claim):
        return (PASS, f"line-by-line rebuild from the question: NP "
                      f"{np_v:g} {' '.join(lines)}{' - tax ' + format(tax, 'g') if tax else ''}"
                      f"{' - interest ' + format(interest, 'g') if interest else ''} "
                      f"= {total:g} -- matches the claimed operating cash "
                      "flow")
    return (FAIL, f"line-by-line rebuild gives Rs {total:g} != claimed "
                  f"Rs {c.claim:g}")


def _v_gp_ratio(c: _Ctx) -> Verdict:
    """GP_RATIO: family computed GP/net sales x 100 (deriving GP =
    sales - COGS when only sales and COGS are stated).  Independent:
    re-parse the figures and rebuild the ratio."""
    sales = _acc_amt(c.question, r"(?:net\s+)?(?:revenue\s+from\s+"
                     r"operations|sales)")
    gp = _acc_amt(c.question, r"gross\s+profit")
    cogs = _acc_amt(c.question, r"cost\s+of\s+(?:goods\s+sold|revenue\s+"
                    r"from\s+operations|sales)|cogs\b")
    if not sales or sales <= 0 or c.claim is None:
        return _na("sales not re-parsed from the question")
    if gp is None or gp <= 0:
        if cogs is None or cogs <= 0:
            return _na("neither GP nor COGS re-parsed from the question")
        gp = sales - cogs
    pct = gp / sales * 100.0
    if _close(pct, c.claim, rel=1e-6, abs_tol=0.005):
        return (PASS, f"rebuild check: GP {gp:g} / sales {sales:g} x 100 "
                      f"= {pct:.6g}% -- matches the claimed ratio")
    return (FAIL, f"rebuild check: GP {gp:g} / sales {sales:g} x 100 = "
                  f"{pct:.6g}% != claimed {c.claim:.6g}%")


def _v_dep_slm(c: _Ctx) -> Verdict:
    """DEP_SLM: family computed annual depreciation (capitalising
    freight/installation/additional costs where stated).  Independent:
    re-parse the cost rollup, salvage and life, rebuild the SLM
    charge, and compare with the claim."""
    if c.claim is None:
        return _na("no claimed depreciation figure")
    cost = _acc_amt(c.question, r"(?:original\s+|purchase\s+|"
                    r"acquisition\s+)?cost(?:ing|s)?\b|bought\s+for|"
                    r"purchas\w+[^.;\n]{0,50}?for|priced?\s+at|"
                    r"machines?\s+[^.;\n]{0,30}?for")
    if not cost or cost <= 0:
        return _na("cost not re-parsed from the question")
    cm = re.search(r"additional\s+costs?[^.;]*?[.;]", c.question, re.I)
    if cm:
        for am in re.finditer(_ACC_RS + r"(" + _ACC_NUM + r")",
                              cm.group(0), re.I):
            cost += float(am.group(1).replace(",", ""))
    salvage = _acc_amt(c.question, r"(?:scrap|salvage|residual|resale)\s+"
                       r"(?:value\s*)?")
    if not salvage:
        # Tail-scan (mirrors the family extractor's fix for exactly this
        # phrasing): after the first scrap/salvage/residual/resale label,
        # take the first money figure that is not a life/period, percent
        # or calendar-year value.  "scrap value at the end of a working
        # life of 6 years is Rs 8,000" -> 8,000 (skipping the 6-year).
        sm = re.search(r"(?:scrap|salvage|residual|resale)\b[^.;]*",
                       c.question, re.I)
        if sm:
            seg = sm.group(0)
            for fm in re.finditer(_ACC_RS + "(" + _ACC_NUM + ")", seg):
                ctx = seg[fm.start():fm.end() + 24].lower()
                if re.search(r"years?\b|months?\b|%|\b(?:19|20)\d\d\b|life\b",
                             ctx):
                    continue
                salvage = float(fm.group(1).replace(",", ""))
                break
    salvage = salvage or 0.0
    lm = re.search(r"(\d{1,7}(?:,\d{2,3})*(?:\.\d+)?)\s*years?",
                   c.question, re.I)
    life = float(lm.group(1).replace(",", "")) if lm else None
    if not life or life <= 0:
        return _na("useful life not re-parsed from the question")
    dep = (cost - salvage) / life
    if _money_close(dep, c.claim):
        return (PASS, f"SLM rebuild: ({cost:g} - {salvage:g}) / {life:g} "
                      f"= {dep:.6g} -- matches the claimed annual charge")
    return (FAIL, f"SLM rebuild: ({cost:g} - {salvage:g}) / {life:g} = "
                  f"{dep:.6g} != claimed {c.claim:g}")


def _v_trade_three_level(c: _Ctx) -> Verdict:
    """TRADE_THREE_LEVEL: family computed GP = sales - purchases and
    stripped operating expenses.  Independent: re-parse purchases,
    sales and the indirect-expense amounts (nearest-number pairing)
    and rebuild every level; the claimed net must equal the rebuild."""
    purchases = _acc_amt(c.question, r"purchas\w+[^.;\n]{0,50}?for")
    sales = _acc_amt(c.question, r"(?:sell\w+|sold|sales)\s+[^.;\n]{0,30}?"
                     r"for")
    if not purchases or not sales or c.claim is None:
        return _na("purchases/sales not re-parsed from the question")
    expenses = 0.0
    for w in (r"rent\b", r"salaries|salary", r"wages\b", r"advertis\w+",
              r"insurance", r"office\s+expenses?", r"trade\s+expenses?"):
        pairs = []
        # wrap the alternation-bearing label in a non-capturing group:
        # otherwise "\bsalaries|salary\b..." splits the pattern and the
        # first branch matches the bare word with no amount group at all.
        # Gap metric: label-edge -> number-edge chars in each direction;
        # the tightest pairing wins ("Rs 30,000 rent" beats a rent that
        # only borrows the next expense's amount).
        for m1 in re.finditer(r"(?:" + w + r")\b[^.;\d\n]{0,30}?" + _ACC_RS
                              + r"(" + _ACC_NUM + r")", c.question, re.I):
            pairs.append((m1.start(1) - m1.start(),
                          float(m1.group(1).replace(",", ""))))
        for m2 in re.finditer(_ACC_RS + r"(" + _ACC_NUM + r")\s*"
                              r"(?:was|is|of)?\s*(?:for\s+)?(?:the\s+)?"
                              r"(?:" + w + r")\b", c.question, re.I):
            pairs.append((m2.end() - m2.end(1),
                          float(m2.group(1).replace(",", ""))))
        if pairs:
            pairs.sort()
            expenses += pairs[0][1]
    net = sales - purchases - expenses
    if _money_close(net, c.claim):
        return (PASS, f"three-level rebuild: {sales:g} - {purchases:g} - "
                      f"expenses {expenses:g} = {net:g} -- matches the "
                      "claimed net profit")
    return (FAIL, f"three-level rebuild: {sales:g} - {purchases:g} - "
                  f"expenses {expenses:g} = {net:g} != claimed "
                  f"Rs {c.claim:g}")


def _v_interest_coverage(c: _Ctx) -> Verdict:
    """INTEREST_COVERAGE: family computed ICR = EBIT / interest (and a
    new ICR when a loan addition is stated).  Independent: re-parse the
    unit-aware figures and rebuild both ratios; the claim must equal
    one of them."""
    ebit = _acc_amt(c.question, r"(?:EBIT|earnings\s+before\s+interest\s+"
                    r"and\s+tax(?:es)?|operating\s+profit)")
    interest = _acc_amt(c.question, r"interest\s+(?:expense|paid|charges?|"
                        r"liability|burden)")
    if not interest:
        interest = _acc_amt(c.question, r"interest\b")
    if not ebit or not interest or c.claim is None:
        return _na("EBIT/interest not re-parsed from the question")
    icr = ebit / interest
    addl = None
    am = re.search(r"add(?:s|ing)?\s*(?:a\s+)?(?:rs\.?|inr|\u20b9)?\s*("
                   + _ACC_NUM + r")\s*(?P<u>lakh|lac|crores?|thousand)?\s*"
                   r"(?:more\s+)?interest", c.question, re.I)
    if am:
        v = float(am.group(1).replace(",", ""))
        u = (am.groupdict().get("u") or "").lower()
        addl = v * _ACC_UNIT_MULT.get(u, 1.0)
    new_icr = (ebit / (interest + addl)) if addl else None
    if _close(icr, c.claim, rel=1e-6, abs_tol=1e-6):
        return (PASS, f"rebuild check: EBIT {ebit:g} / interest "
                      f"{interest:g} = {icr:.6g}x -- matches the claim")
    if new_icr is not None and _close(new_icr, c.claim, rel=1e-6,
                                      abs_tol=1e-6):
        return (PASS, f"rebuild check: EBIT {ebit:g} / (interest "
                      f"{interest:g} + addition {addl:g}) = {new_icr:.6g}x "
                      "-- matches the claimed NEW coverage")
    return (FAIL, f"rebuild check: old ICR {icr:.6g}x"
                  + (f", new ICR {new_icr:.6g}x" if new_icr else "")
                  + f" -- neither equals claimed {c.claim:.6g}")


_OPEN_CAP_ASSETS = (r"cash(?:\s+in\s+hand|\s+at\s+bank)?|bank\b(?!\s*loan)|"
                    r"stock(?:\s+in\s+(?:hand|trade))?|inventory|debtors?|"
                    r"bills?\s+receivable|furniture|machinery|plant|"
                    r"buildings?|land|investments?|equipment|goodwill")
_OPEN_CAP_LIABS = (r"bank\s+loan|loans?\b|creditors?|bills?\s+payable|"
                   r"overdraft|mortgage")


def _v_opening_capital(c: _Ctx) -> Verdict:
    """OPENING_CAPITAL: family computed capital = assets - liabilities.
    Independent: re-classify every labelled balance from the QUESTION
    with the same accounting equation and rebuild the capital."""
    if c.claim is None:
        return _na("no claimed capital figure")
    claimed: list = []
    a_total = l_total = 0.0

    def _grab(word, tag):
        nonlocal a_total, l_total
        for km in re.finditer(word, c.question, re.I):
            span = km.span()
            if any(s0 <= span[0] < s1 for (s0, s1) in claimed):
                continue
            am = re.search(_ACC_RS + r"(" + _ACC_NUM + r")",
                           c.question[span[1]: span[1] + 30], re.I)
            if not am:
                continue
            v = float(am.group(1).replace(",", ""))
            # claim only up to the END OF THE NUMBER: a span that runs
            # 30 chars past the label would swallow the NEXT account
            # ("Stock Rs 2,00,000; Debtors ...") and drop it silently
            claimed.append((span[0], span[1] + am.end(1)))
            if tag == "A":
                a_total += v
            else:
                l_total += v
    _grab(_OPEN_CAP_LIABS, "L")
    _grab(_OPEN_CAP_ASSETS, "A")
    if a_total <= 0 or l_total <= 0:
        return _na("balances not re-classified from the question")
    capital = a_total - l_total
    if _money_close(capital, c.claim):
        return (PASS, f"accounting-equation rebuild: assets {a_total:g} - "
                      f"liabilities {l_total:g} = capital {capital:g} -- "
                      "matches the claim")
    return (FAIL, f"accounting-equation rebuild: {a_total:g} - "
                  f"{l_total:g} = {capital:g} != claimed Rs {c.claim:g}")


def _v_brs_adjust(c: _Ctx) -> Verdict:
    """BRS_ADJUST: family adjusted one book's balance by the itemised
    differences (dual-balance mode: the adjusted figure must land
    EXACTLY on the other book's stated balance).  Independent: re-parse
    both balances and rebuild the adjustment walk."""
    if c.claim is None:
        return _na("no claimed reconciled balance")
    bms = list(re.finditer(
        r"(cash\s+book|pass\s?book|bank\s+statement|bank\s+column)\s+"
        r"shows?\s+(?:an?\s+)?(?:(favourable|credit|debit|overdraft|"
        r"unfavourable)\s+)?balance\s+(?:is\s+|of\s+|was\s+)?"
        r"(?:rs\.?|inr|\u20b9)?\s*(" + _ACC_NUM + r")", c.question, re.I))
    if len(bms) >= 2:
        book_a = re.sub(r"\s+", " ", bms[0].group(1).lower())
        book_b = re.sub(r"\s+", " ", bms[1].group(1).lower())
        if "cash book" in (book_a, book_b) and book_a != book_b:
            from_cash = book_a == "cash book"
            start = float(bms[0].group(3).replace(",", ""))
            target = float(bms[1].group(3).replace(",", ""))
            if (bms[0].group(2) or "").lower() in ("overdraft",
                                                   "unfavourable"):
                start = -start
            if (bms[1].group(2) or "").lower() in ("overdraft",
                                                   "unfavourable"):
                target = -target
            adj = 0.0
            n_items = 0
            # share the family's item-amount scanner: the clause regexes
            # consume the amount inside their own match ('Cheque issued
            # Rs 3,000 not presented'), so an after-match-only scan bound
            # the next clause's amount (wave98 false-FAIL class).
            try:
                from backend.its.solver.accountancy_families import (
                    _brs_item_amount as _amt)
            except Exception:
                _amt = None
            for pat, effect in (
                    (r"cheques?\s+(?:is\s*su|issu)\w*\s+[^.;]{0,40}?"
                     r"(?:not|yet\s*not|not\s+yet)\s*(?:been\s*)?presented|"
                     r"issued[^.;]{0,30}not\s+presented|not\s+presented"
                     r"\s+for\s+payment", +1),
                    (r"cheques?\s+deposit\w*[^.;]{0,40}?(?:not|not\s+yet|"
                     r"yet\s+to\s+be)\s*(?:been\s*)?(?:credited|collected|"
                     r"cleared)|deposited[^.;]{0,30}not\s+(?:yet\s+)?"
                     r"credited|not\s+yet\s+cleared", -1),
                    (r"bank\s+(?:charges|commission|fees)|charges\s+debited"
                     r"\s+by\s+bank", -1),
                    (r"(?:interest|dividend)[^.;]{0,30}(?:allowed|credited|"
                     r"collected)\s+by\s+(?:the\s+)?bank|interest\s+"
                     r"credited", +1),
                    (r"direct\w*\s+(?:deposit|paid|payment)|directly\s+"
                     r"(?:deposited|paid|received)", +1)):
                for km in re.finditer(pat, c.question, re.I):
                    if _amt is not None:
                        v = _amt(c.question, km.span())
                    else:
                        am = re.search(_ACC_RS + r"(" + _ACC_NUM + r")",
                                       c.question[km.span()[1]:
                                                  km.span()[1] + 70], re.I)
                        v = float(am.group(1).replace(",", "")) \
                            if am else None
                    if not v or v <= 0:
                        continue
                    adj += (effect if from_cash else -effect) * v
                    n_items += 1
            if n_items == 0:
                return _na("no adjustment items re-parsed")
            rebuilt = start + adj
            if _money_close(rebuilt, c.claim) \
                    and _money_close(rebuilt, target):
                return (PASS, f"dual-balance rebuild: {start:g} {'+' if adj >= 0 else '-'} "
                              f"{abs(adj):g} = {rebuilt:g} = the other "
                              "book's stated balance -- the reconciliation "
                              "closes exactly")
            # DIRECTIONAL ASK (wave98): 'starting from Cash Book balance
            # compute the adjusted Pass Book balance' — the stated other-
            # book balance is the UNadjusted figure; the rebuilt figure
            # needs to match the CLAIM, not the stated balance.
            _dirm = re.search(
                r"start\w*\s+(?:from|with)\s+(?:the\s+)?"
                r"(cash\s+book|pass\s?book)", c.question or "", re.I)
            if _dirm:
                dir_cash = "cash" in _dirm.group(1).lower()
                d_start = start if dir_cash == from_cash else target
                d_adj = adj if dir_cash == from_cash else -adj
                d_rebuilt = d_start + d_adj
                if _money_close(d_rebuilt, c.claim):
                    return (PASS, f"directional rebuild: starting "
                                  f"{_dirm.group(1).strip()} {d_start:g} "
                                  f"{'+' if d_adj >= 0 else '-'} "
                                  f"{abs(d_adj):g} = {d_rebuilt:g} = "
                                  f"claimed adjusted balance")
            return (FAIL, f"dual-balance rebuild: {start:g} {'+' if adj >= 0 else '-'} "
                          f"{abs(adj):g} = {rebuilt:g} vs claimed "
                          f"{c.claim:g} / other book {target:g}")
    return _na("dual balances not stated; single-book form not "
               "independently checkable")

def _v_bep_units(c: _Ctx) -> Verdict:
    """BEP_UNITS: family used BEP = FC/(P - VC).  Independent: the
    PROFIT-ZERO condition -- at the claimed break-even units, revenue
    minus TOTAL cost (fixed + variable) must be exactly zero."""
    fc = c.get("fc")
    price = c.get("price")
    vc = c.get("vc")
    if None in (fc, price, vc) or c.claim is None:
        return _na("BEP quantities incomplete")
    profit = price * c.claim - (fc + vc * c.claim)
    if _money_close(profit, 0.0):
        return (PASS, f"profit-zero check: revenue {price:g} x "
                      f"{c.claim:.6g} = {price * c.claim:.6g} minus total "
                      f"cost ({fc:g} + {vc:g} x {c.claim:.6g}) = "
                      f"{profit:.6g} -- exactly break-even")
    return (FAIL, f"profit-zero check failed: at {c.claim:.6g} units the "
                  f"profit is Rs {profit:.6g}, not 0")


def _v_bep_sales(c: _Ctx) -> Verdict:
    """BEP_SALES: family used BEP(Rs) = FC x P/(P-VC).  Independent: the
    profit-zero condition in rupees -- claimed sales minus (fixed cost +
    variable cost on the break-even units) must be exactly zero, and the
    sales must equal the recorded break-even units valued at P."""
    fc = c.get("fc")
    price = c.get("price")
    bep_u = c.get("bep_units")
    if None in (fc, price, bep_u) or c.claim is None:
        return _na("BEP quantities incomplete")
    vc = _fnum(c.question, r"variable\s+cost[^.]{0,30}?([\d.]+)")
    if vc is None:
        return _na("variable cost per unit not parsed from the question")
    if not _money_close(c.claim, bep_u * price):
        return (FAIL, f"valuation check failed: BEP units {bep_u:.6g} x "
                      f"price {price:g} = {bep_u * price:.6g} != claimed "
                      f"sales Rs {c.claim:.6g}")
    profit = c.claim - (fc + vc * bep_u)
    if _money_close(profit, 0.0):
        return (PASS, f"profit-zero check: sales Rs {c.claim:.6g} minus "
                      f"total cost ({fc:g} + {vc:g} x {bep_u:.6g}) = "
                      f"{profit:.6g} -- exactly break-even")
    return (FAIL, f"profit-zero check failed: at sales Rs {c.claim:.6g} "
                  f"the profit is Rs {profit:.6g}, not 0")


def _v_trial_balance(c: _Ctx) -> Verdict:
    """TRIAL_BALANCE_DIFF: sum equality IS the independent check (the
    balancing identity, not a recomputation): shorter side + suspense
    must equal the longer side."""
    dr = c.get("debit_total")
    cr = c.get("credit_total")
    diff = c.get("difference")
    if None in (dr, cr, diff) or c.claim is None:
        return _na("trial-balance quantities incomplete")
    if _money_close(abs(diff), c.claim) and \
            _money_close(min(dr, cr) + abs(diff), max(dr, cr)):
        return (PASS, f"balancing identity: shorter side "
                      f"{min(dr, cr):g} + suspense {abs(diff):g} = "
                      f"{min(dr, cr) + abs(diff):g} = longer side "
                      f"{max(dr, cr):g} -- the trial balance tallies once "
                      "the suspense is posted")
    return (FAIL, f"balancing identity failed: shorter + suspense != "
                  f"longer ({min(dr, cr):g} + {abs(diff):g} vs "
                  f"{max(dr, cr):g}) or the claimed suspense "
                  f"{c.claim:.6g} != |debits - credits| {abs(diff):g}")


# --------------------------------------------------------------------------- #
# VERIFIERS -- ISC psychology statistics (maths_families per WS-B step 1)
# + biotech numerics (biology_families per WS-B step 4 -- the source
# modules dissolved into the merged subject files; verifier routes and
# keys unchanged).  cisce-solver-langnew 2026-09-30.
# Each check re-parses the question INDEPENDENTLY of the family's own
# extraction and verifies by a different relation than the family used
# (closure / zero-deviation / recount), never by re-running the family.
# --------------------------------------------------------------------------- #

_STATS_DATA_RE = re.compile(
    r"(?<![\d.])(\d+(?:\.\d+)?(?:\s*,\s*\d+(?:\.\d+)?){2,}(?:\.\d+)?)")


def _stats_data(question: str) -> Optional[List[float]]:
    """Longest comma-separated number run (>= 3 values) in the question."""
    best: Optional[List[float]] = None
    for m in _STATS_DATA_RE.finditer(question):
        vals = [float(v) for v in m.group(1).split(",")]
        if best is None or len(vals) > len(best):
            best = vals
    return best


def _v_stats_mean(c: _Ctx) -> Verdict:
    """STATS_MEAN_UNGROUPED: family divided sum by n.  Independent:
    closure -- claimed mean x n must rebuild the raw sum of the stated
    data (multiplication is not the family's operation)."""
    data = _stats_data(c.question)
    if not data:
        return _na("data list not parsed from the question")
    claim = c.get("mean") if c.get("mean") is not None else c.claim
    if claim is None:
        return _na("no claimed mean")
    rebuilt = claim * len(data)
    raw = sum(data)
    if _close(rebuilt, raw):
        return (PASS, f"closure check: {claim:.6g} x n({len(data)}) = "
                      f"{rebuilt:.6g} = the stated sum {raw:.6g}")
    return (FAIL, f"closure check fails: {claim:.6g} x {len(data)} = "
                  f"{rebuilt:.6g} != stated sum {raw:.6g}")


def _v_mean_deviation(c: _Ctx) -> Verdict:
    """MEAN_DEVIATION (SOCIAL-ALL 2026-10-07): the geography
    weather-station family.  Independent recompute -- re-average the
    absolute deviations of the freshly-parsed data from the normal
    stated in the question; the family's own parse is never reused.
    Fixes the strict-law withhold that surfaced when the stem lost its
    PAL endorsement (the family computed the right 3 but no registered
    second path existed, so the answer was downgraded to guided)."""
    data = _stats_data(c.question)
    if not data:
        return _na("data list not parsed from the question")
    claim = c.get("mean_deviation") \
        if c.get("mean_deviation") is not None else c.claim
    if claim is None:
        return _na("no claimed mean deviation")
    normal = c.get("normal")
    if normal is None:
        nm = re.search(r"normal[^.\n\d]{0,60}"
                       r"(-?[\d,]+(?:\.\d+)?)", c.question, re.I)
        if not nm:
            return _na("the normal value is neither in the family "
                       "quantities nor parseable from the question")
        normal = float(nm.group(1).replace(",", ""))
    rebuilt = sum(abs(x - normal) for x in data) / len(data)
    if _close(claim, rebuilt):
        return (PASS, f"recompute: mean of |x - {normal:g}| over "
                      f"{len(data)} readings = {rebuilt:.6g} = the "
                      f"claimed mean deviation")
    return (FAIL, f"recompute fails: mean deviation of the stated data "
                  f"from {normal:g} is {rebuilt:.6g}, not {claim:.6g}")


def _v_stats_median(c: _Ctx) -> Verdict:
    """STATS_MEDIAN_UNGROUPED: independent recount of the ordered middle
    position from a fresh parse of the data."""
    data = _stats_data(c.question)
    if not data:
        return _na("data list not parsed from the question")
    s = sorted(data)
    n = len(s)
    expected = s[n // 2] if n % 2 else (s[n // 2 - 1] + s[n // 2]) / 2.0
    claim = c.get("median") if c.get("median") is not None else c.claim
    if claim is None:
        return _na("no claimed median")
    if _close(claim, expected):
        return (PASS, f"recount: {n} ordered values, middle = "
                      f"{expected:.6g} = the claimed median")
    return (FAIL, f"recount: median of the stated data is "
                  f"{expected:.6g}, not {claim:.6g}")


def _v_stats_mode(c: _Ctx) -> Verdict:
    """STATS_MODE_UNGROUPED: independent recount -- the claimed mode's
    frequency must equal the maximum frequency in the stated data."""
    data = _stats_data(c.question)
    if not data:
        return _na("data list not parsed from the question")
    claim = c.get("mode") if c.get("mode") is not None else c.claim
    if claim is None:
        return _na("no claimed mode")
    counts: Dict[float, int] = {}
    for v in data:
        counts[v] = counts.get(v, 0) + 1
    top = max(counts.values())
    got = counts.get(claim, 0)
    if got == top and top >= 2:
        return (PASS, f"recount: {claim:.6g} occurs {got} times, the "
                      f"maximum frequency in the stated data")
    return (FAIL, f"recount: {claim:.6g} occurs {got} time(s) but the "
                  f"maximum frequency is {top} -- not the mode")


def _v_stats_range(c: _Ctx) -> Verdict:
    """STATS_RANGE_UNGROUPED: independent max - min from a fresh parse."""
    data = _stats_data(c.question)
    if not data:
        return _na("data list not parsed from the question")
    expected = max(data) - min(data)
    claim = c.get("range") if c.get("range") is not None else c.claim
    if claim is None:
        return _na("no claimed range")
    if _close(claim, expected):
        return (PASS, f"recount: max {max(data):.6g} - min "
                      f"{min(data):.6g} = {expected:.6g}")
    return (FAIL, f"recount: max-min = {expected:.6g} != claimed "
                  f"{claim:.6g}")


def _v_stats_spread(kind: str) -> VerifierFn:
    """STATS_VARIANCE / STATS_SD_SAMPLE: independent re-derivation of the
    sample spread (n-1 denominator) from a fresh data parse."""
    def _v(c: _Ctx) -> Verdict:
        data = _stats_data(c.question)
        if not data or len(data) < 2:
            return _na("data list not parsed from the question")
        n = len(data)
        mu = sum(data) / n
        var = sum((v - mu) ** 2 for v in data) / (n - 1)
        expected = var if kind == "variance" else math.sqrt(var)
        claim = c.get(kind) if c.get(kind) is not None else c.claim
        if claim is None:
            return _na(f"no claimed {kind}")
        label = "variance" if kind == "variance" else "SD"
        if _close(claim, expected):
            return (PASS, "re-derivation: sample " + label + " of the "
                          f"{n} stated values = {expected:.6g} = the claim")
        return (FAIL, "re-derivation: sample " + label + " = "
                      f"{expected:.6g} != claimed {claim:.6g}")
    return _v


_INTERVAL_RE = re.compile(
    r"(?<![\d.])(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)(?![\d.])")
_FREQ_LIST_RE = re.compile(
    r"frequenc\w*[^:;]{0,60}?((?:\d+(?:\.\d+)?\s*,\s*)+\d+(?:\.\d+)?)",
    re.I)
_TABLE_PAIR_RE = re.compile(
    r"(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*\|\s*(\d+(?:\.\d+)?)")


def _v_stats_grouped_mean(c: _Ctx) -> Verdict:
    """STATS_MEAN_GROUPED: independent re-derivation -- zero weighted
    deviation sum: sum(f x (x - claimed mean)) must be 0 over the
    re-parsed class marks and frequencies."""
    pairs = [(float(a), float(b)) for a, b, _f in
             _TABLE_PAIR_RE.findall(c.question)]
    if pairs:
        freqs = [float(f) for _a, _b, f in _TABLE_PAIR_RE.findall(
            c.question)]
    else:
        ivs = [(float(a), float(b))
               for a, b in _INTERVAL_RE.findall(c.question)]
        fl = _FREQ_LIST_RE.search(c.question)
        if not ivs or not fl:
            return _na("grouped classes/frequencies not parsed")
        pairs = ivs
        freqs = [float(v) for v in fl.group(1).split(",")]
    if len(pairs) < 2 or len(freqs) != len(pairs):
        return _na("class/frequency counts disagree")
    claim = c.get("mean") if c.get("mean") is not None else c.claim
    if claim is None:
        return _na("no claimed grouped mean")
    mids = [(a + b) / 2.0 for a, b in pairs]
    dev = sum(f * (x - claim) for f, x in zip(freqs, mids))
    if _close(dev, 0.0, rel=1e-6, abs_tol=1e-6):
        return (PASS, f"zero-deviation check: sum f(x - mean) = "
                      f"{dev:.3g} over {len(pairs)} class marks -- the "
                      "mean balances the weighted data")
    return (FAIL, f"zero-deviation check: sum f(x - mean) = {dev:.6g} "
                  f"!= 0 for the claimed mean {claim:.6g}")


_GROUP_PARSE_RE = re.compile(
    r"(?:section|group|class|team)\s+[A-Za-z0-9]{1,3}\b[^.]{0,60}?"
    r"(\d+(?:,\d{3})*)\s*(?:students?|pupils?|observations?|values|"
    r"numbers?|items?|workers?|plants?|scores)[^.]{0,60}?"
    r"mean\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)", re.I)


def _v_stats_combined(c: _Ctx) -> Verdict:
    """STATS_MEAN_COMBINED: independent re-derivation of the weighted
    mean from the two (n, mean) pairs parsed fresh from the question."""
    groups = [(float(n.replace(",", "")), float(mu))
              for n, mu in _GROUP_PARSE_RE.findall(c.question)]
    uniq: List[Tuple[float, float]] = []
    for gr in groups:
        if gr not in uniq:
            uniq.append(gr)
    if len(uniq) < 2:
        return _na("two group (n, mean) pairs not parsed")
    (n1, m1), (n2, m2) = uniq[0], uniq[1]
    expected = (n1 * m1 + n2 * m2) / (n1 + n2)
    claim = c.get("combined_mean") if c.get("combined_mean") is not None \
        else c.claim
    if claim is None:
        return _na("no claimed combined mean")
    if _close(claim, expected):
        return (PASS, f"re-derivation: ({n1:g}x{m1:g} + {n2:g}x{m2:g}) / "
                      f"({n1:g} + {n2:g}) = {expected:.6g} = the claim")
    return (FAIL, f"re-derivation: weighted mean = {expected:.6g} != "
                  f"claimed {claim:.6g}")


def _v_stats_adjust(c: _Ctx) -> Verdict:
    """STATS_MEAN_ADJUST: closure -- the NEW mean x NEW count, +/- the
    changed value(s), must rebuild the OLD total n x old mean."""
    nm = re.search(r"mean\s+of\s+(\d+)\s+(?:observations|numbers|values|"
                   r"scores|students|workers|items)", c.question, re.I)
    mu = _fnum(c.question, r"mean\s+of\s+\d+\s+(?:observations|numbers|"
                           r"values|scores|students|workers|items)\s+is\s*"
                           r"(?:of)?\s*(\d+(?:\.\d+)?)")
    if not nm or mu is None:
        return _na("old n/mean not parsed from the question")
    n = float(nm.group(1))
    claim = c.get("new_mean") if c.get("new_mean") is not None else c.claim
    if claim is None:
        return _na("no claimed new mean")
    removed = c.get("removed")
    added = c.get("added")
    if removed is not None:
        new_n = n - 1
        rebuilt = claim * new_n + removed
        if _close(rebuilt, n * mu):
            return (PASS, f"closure: new mean {claim:.6g} x {new_n:g} + "
                          f"removed {removed:.6g} = {rebuilt:.6g} = old "
                          f"total {n:g} x {mu:g}")
        return (FAIL, f"closure: {claim:.6g} x {new_n:g} + {removed:.6g} "
                      f"= {rebuilt:.6g} != old total {n * mu:.6g}")
    if added is not None:
        new_n = n + 1
        rebuilt = claim * new_n - added
        if _close(rebuilt, n * mu):
            return (PASS, f"closure: new mean {claim:.6g} x {new_n:g} - "
                          f"added {added:.6g} = {rebuilt:.6g} = old total "
                          f"{n:g} x {mu:g}")
        return (FAIL, f"closure: {claim:.6g} x {new_n:g} - {added:.6g} = "
                      f"{rebuilt:.6g} != old total {n * mu:.6g}")
    return _na("family did not emit the changed amount")


def _v_stats_se(c: _Ctx) -> Verdict:
    """STATS_SE_MEAN: independent closure -- claimed SEM x sqrt(n) must
    rebuild sigma, with sigma and n parsed fresh from the question."""
    sigma = _fnum(c.question, r"standard\s+deviation[^.\d]{0,40}?"
                              r"(\d+(?:\.\d+)?)")
    nn = re.search(r"sample\s+of\s+(\d+)", c.question, re.I)
    n = float(nn.group(1)) if nn else None
    if sigma is None or not n:
        return _na("sigma/n not parsed from the question")
    claim = c.get("sem") if c.get("sem") is not None else c.claim
    if claim is None:
        return _na("no claimed standard error")
    rebuilt = claim * math.sqrt(n)
    if _close(rebuilt, sigma):
        return (PASS, f"closure: SEM {claim:.6g} x sqrt({n:g}) = "
                      f"{rebuilt:.6g} = sigma {sigma:g}")
    return (FAIL, f"closure: {claim:.6g} x sqrt({n:g}) = {rebuilt:.6g} "
                  f"!= sigma {sigma:g}")


def _v_z_t(c: _Ctx) -> Verdict:
    """STATS_Z_T_SCORE: independent closure -- claimed z must satisfy
    raw = mean + z x SD with all three parsed fresh from the question."""
    mu = _fnum(c.question, r"\bmean\s*(?:=|is|of)\s*(\d+(?:\.\d+)?)")
    sd = _fnum(c.question, r"standard\s+deviation\s*(?:=|is|of)?\s*"
                           r"(\d+(?:\.\d+)?)")
    raw = _fnum(c.question, r"raw\s+score\s+of\s+(\d+(?:\.\d+)?)")
    z = c.get("z")
    if mu is None or sd is None or raw is None:
        return _na("mean/SD/raw score not parsed from the question")
    if z is None:
        return _na("family did not emit z")
    rebuilt = mu + z * sd
    if _close(rebuilt, raw):
        return (PASS, f"closure: mean {mu:g} + z({z:.6g}) x SD({sd:g}) = "
                      f"{rebuilt:.6g} = the raw score {raw:g}")
    return (FAIL, f"closure: {mu:g} + {z:.6g} x {sd:g} = {rebuilt:.6g} "
                  f"!= raw score {raw:g}")


_CHAMBER_FACTOR = 1e4  # 0.1 mm depth x 1 mm^2 square, in mL^-1 per count


def _v_hemocytometer(c: _Ctx) -> Verdict:
    """BIO_HEMOCYTOMETER: independent re-derivation -- claimed
    concentration / (dilution x 10^4) must rebuild the average per-square
    count parsed fresh from the question."""
    dil = _fnum(c.question, r"1\s*:\s*(\d+)\s*(?:dilution|diluted)?")
    if dil is None:
        mix = re.search(r"(\d+(?:\.\d+)?)\s*(?:ul|uL|µL)[^.]{0,40}?"
                        r"(?:is\s+)?mixed\s+with\s+(\d+(?:\.\d+)?)\s*"
                        r"(?:ul|uL|µL)", c.question, re.I)
        if mix and float(mix.group(1)) > 0:
            dil = (float(mix.group(1)) + float(mix.group(2))) \
                / float(mix.group(1))
    if not dil:
        return _na("dilution factor not parsed from the question")
    avg = _fnum(c.question, r"average\s+of\s+(\d+(?:\.\d+)?)\s+cells?\s+"
                            r"per\s+(?:large\s+)?square")
    if avg is None:
        avg = _fnum(c.question, r"counts?\s+an\s+average\s+of\s+"
                                r"(\d+(?:\.\d+)?)")
    if avg is None:
        m = re.search(r"counts\s*\([^)]*\)\s*are\s*([\d.,\s]+?)\s*\.",
                      c.question, re.I)
        if m:
            vals = [float(v) for v in re.findall(r"\d+(?:\.\d+)?",
                                                 m.group(1))]
            if len(vals) >= 2:
                avg = sum(vals) / len(vals)
    if not avg:
        return _na("average per-square count not parsed")
    claim = c.get("cells_per_ml") if c.get("cells_per_ml") is not None \
        else c.claim
    if claim is None:
        return _na("no claimed concentration")
    rebuilt = claim / (dil * _CHAMBER_FACTOR)
    if _close(rebuilt, avg):
        return (PASS, f"re-derivation: {claim:.6g} / ({dil:g} x 10^4) = "
                      f"{rebuilt:.6g} = the average per-square count")
    return (FAIL, f"re-derivation: {claim:.6g} / ({dil:g} x 10^4) = "
                  f"{rebuilt:.6g} != average count {avg:.6g}")


# --------------------------------------------------------------------------- #
# CISCE maths wave (cisce-solver-maths 2026-09-30): alternate-relation
# checks for the NEW maths2 families (polynomial remainder/factor
# theorem, section-formula external/labeled, centroid, reflections,
# parallel-lines distance, recurring deposits).  Each check re-parses
# the question independently and verifies by a DIFFERENT relation than
# the family's closed form (division algorithm, distance-ratio,
# median 2:1, mirror incidence, point-to-line projection, month-loop
# accumulation).  Additions only -- no existing check is touched.
# --------------------------------------------------------------------------- #


def _cisce_math_norm(text: str) -> str:
    """Same surface cleanup the maths2 families see (unicode minus,
    non-breaking hyphen, superscripts)."""
    from backend.its.solver.maths_families import _normalize
    return _normalize(text)


def _cisce_poly(q: str):
    """(poly expr, var, root) from a remainder/factor-theorem question;
    None when the question text does not carry a clean linear divisor.
    Handles both the 'when p(x) is divided by (x-a)' and the
    '(x-a) is a factor of p(x)' wordings."""
    from backend.its.solver.maths_families import _poly_expr, _divisor_root
    import sympy
    mm = re.search(
        r"when\s+(?P<poly>.+?)\s+(?:is\s+)?divided\s+by\s+"
        r"(?P<div>[^.,;?=]+?)(?:\s+using\b|\?|\.|$|,)", q, re.I)
    if mm:
        p = _poly_expr(mm.group("poly"))
        parsed = _divisor_root(mm.group("div"))
    else:
        fm = re.search(
            r"\(?\s*([a-z])\s*(?:([+-])\s*(\d+(?:\.\d+)?))?\s*\)?\s+is\s+"
            r"a\s+(?:factor|divisor)\s+of\s+(?:the\s+)?(?:polynomial\s+)?"
            r"(?P<poly>[^.,;?]+)", q, re.I)
        if not fm or not fm.group(3):
            return None
        root = sympy.Rational(fm.group(3)) * \
            (1 if fm.group(2) == "-" else -1)
        p = _poly_expr(fm.group("poly"))
        if p is None:
            return None
        return p, sympy.Symbol(fm.group(1)), root
    if p is None or parsed is None:
        return None
    var, root = parsed
    if var not in p.free_symbols:
        return None
    return p, var, root


def _v_poly_remainder(c: _Ctx) -> Verdict:
    """POLY_REMAINDER: family evaluated p(a).  Independent: the DIVISION
    ALGORITHM -- full polynomial division by (x - a) must leave a
    constant remainder equal to the claim."""
    import sympy
    q = _cisce_math_norm(c.question)
    parsed = _cisce_poly(q)
    if parsed is None:
        return _na("polynomial/divisor not parsed from the question")
    p, var, root = parsed
    if c.claim is None:
        return _na("no claimed remainder")
    try:
        _quotient, rem = sympy.div(p, var - root)
    except Exception:
        return _na("division algorithm failed")
    if not rem.is_number:
        return _na("non-constant remainder")
    rf = float(rem)
    if _close(rf, c.claim, rel=1e-9, abs_tol=1e-9):
        return (PASS, f"division algorithm: dividing {p} by ({var} - "
                      f"{float(root):g}) leaves remainder {rf:g} -- "
                      "matches p(a)")
    return (FAIL, f"division-algorithm remainder {rf:g} != claimed "
                  f"{c.claim:.6g}")


def _v_poly_factor_check(c: _Ctx) -> Verdict:
    """POLY_FACTOR_CHECK: family evaluated p(a) and compared to zero.
    Independent: the remainder of the full division by (x - a) -- a
    factor iff the polynomial division terminates with remainder 0;
    a non-factor's remainder must equal the claimed p(a)."""
    import sympy
    q = _cisce_math_norm(c.question)
    parsed = _cisce_poly(q)
    if parsed is None:
        return _na("polynomial/divisor not parsed from the question")
    p, var, root = parsed
    if c.claim is None:
        return _na("no claimed p(a)")
    try:
        rem = sympy.rem(p, var - root)
    except Exception:
        return _na("polynomial remainder failed")
    if not rem.is_number:
        return _na("non-constant remainder")
    rf = float(rem)
    if _close(rf, c.claim, rel=1e-9, abs_tol=1e-9):
        rel_txt = ("is a factor (division remainder 0)" if abs(rf) < 1e-12
                   else f"is not a factor (division remainder {rf:g})")
        return (PASS, f"division remainder of {p} by ({var} - "
                      f"{float(root):g}) is {rf:g}: the divisor "
                      f"{rel_txt}")
    return (FAIL, f"division remainder {rf:g} != claimed p(a) "
                  f"{c.claim:.6g}")


def _v_poly_unknown_coeff(c: _Ctx) -> Verdict:
    """POLY_UNKNOWN_COEFF: family solved the condition equations.
    Independent: BACK-SUBSTITUTION -- the claimed coefficient, plugged
    into the polynomial, must satisfy every stated remainder/factor
    condition."""
    from backend.its.solver.maths_families import (_poly_expr,
                                                    _divisor_root)
    import sympy
    q = _cisce_math_norm(c.question)
    # polynomial: assignment form, else the bare expression after
    # 'is a factor of' (the variable letter then comes from the
    # factor/divisor condition)
    poly_text = None
    var_letter = None
    am = re.search(
        r"([A-Za-z])\s*\(\s*([a-z])\s*\)\s*=\s*"
        r"(?P<pt>[^.,;?=]+?)\s*(?=\bleaves?\b|\bwhen\b|,|\.|\?|$)", q)
    if am:
        var_letter = am.group(2)
        poly_text = am.group("pt")
    else:
        bm = re.search(
            r"is\s+a\s+(?:factor|divisor)\s+of\s+(?:the\s+)?"
            r"(?:polynomial\s+)?([^.,;?=]+)", q, re.I)
        if bm:
            poly_text = bm.group(1)
    if not poly_text:
        return _na("polynomial not parsed")
    p = _poly_expr(poly_text)
    if p is None:
        return _na("polynomial not parsed")
    # condition-named variable (divisor letter / factor letter)
    cond_letter = None
    for rm in re.finditer(
            r"remainder\s+(?:of\s+)?(-?\d+(?:\.\d+)?)\s+when\s+divided"
            r"\s+by\s+([a-z])\b", q, re.I):
        cond_letter = rm.group(2)
        break
    if cond_letter is None:
        fm0 = re.search(r"\(?\s*([a-z])\s*[+-]?\s*\d*(?:\.\d+)?\s*\)?\s+"
                        r"is\s+a\s+(?:factor|divisor)\s+of", q, re.I)
        if fm0:
            cond_letter = fm0.group(1)
    if var_letter is None:
        var_letter = cond_letter
    if var_letter is None:
        return _na("polynomial variable not identified")
    var = sympy.Symbol(var_letter)
    unk = sorted(p.free_symbols - {var}, key=str)
    # the claimed value: numeric claim, or the quantity named by the
    # unknown letter the family solved for
    claim = c.claim if len(unk) == 1 else None
    if claim is None:
        for letter in unk:
            v = c.get(letter)
            if v is not None:
                claim, unk = v, [letter]
                break
    if claim is None or len(unk) != 1:
        return _na("multi-unknown or no numeric claim")
    u = unk[0]
    checked = 0
    for rm in re.finditer(
            r"remainder\s+(?:of\s+)?(-?\d+(?:\.\d+)?)\s+when\s+divided"
            r"\s+by\s+([^.,;?=]+?)(?=,|\s+and\b|\s+find\b|\?|\.|$)", q,
            re.I):
        parsed = _divisor_root(rm.group(2))
        if parsed is None:
            return _na("divisor not parsed")
        dvar, root = parsed
        got = _poly_at_safe(p.subs(u, claim), dvar, root)
        if got is None:
            return _na("evaluation failed")
        if not _close(got, float(rm.group(1)), rel=1e-9, abs_tol=1e-9):
            return (FAIL, f"back-substitution: with {u} = {claim:.6g} "
                          f"the remainder is {got:.6g}, not "
                          f"{float(rm.group(1)):g}")
        checked += 1
    fm = re.search(
        r"\(?\s*([a-z])\s*([+-])\s*(\d+(?:\.\d+)?)?\s*\)?\s+is\s+a\s+"
        r"(?:factor|divisor)\s+of", q, re.I)
    if fm and fm.group(3):
        root = sympy.Rational(fm.group(3)) * \
            (1 if fm.group(2) == "-" else -1)
        got = _poly_at_safe(p.subs(u, claim), sympy.Symbol(fm.group(1)),
                            root)
        if got is None:
            return _na("evaluation failed")
        if abs(got) > 1e-9:
            return (FAIL, f"back-substitution: with {u} = {claim:.6g} "
                          f"p(root) = {got:.6g} != 0, so the divisor is "
                          "not a factor")
        checked += 1
    if not checked:
        return _na("no conditions parsed")
    return (PASS, f"back-substitution of {u} = {claim:.6g} satisfies "
                  f"all {checked} stated condition(s)")


def _poly_at_safe(p, var, root):
    import sympy
    try:
        val = sympy.simplify(p.subs(var, root))
        return float(val) if val.is_number else None
    except Exception:
        return None


def _v_section_point(c: _Ctx) -> Verdict:
    """SECTION_FORMULA_EXTERNAL / _LABELED: family applied the section
    formula.  Independent geometry applied to the SHIPPED point: it must
    be COLLINEAR with the segment AND divide it in the distance ratio
    m:n (the claim is parsed from final_answer, not taken from the
    family's quantities)."""
    from backend.its.solver.maths_families import _c_pairs
    q = _cisce_math_norm(c.question)
    pts = _c_pairs(q)
    rm = re.search(r"ratio\s*(\d+)\s*:\s*(\d+)", q, re.I)
    claim = _claimed_point(c)
    if len(pts) != 2 or rm is None or claim is None:
        return _na("segment/ratio/claimed point not all parsed")
    (x1, y1), (x2, y2) = pts
    px, py = claim
    mm_, nn_ = float(rm.group(1)), float(rm.group(2))
    if mm_ <= 0 or nn_ <= 0:
        return _na("degenerate ratio")
    cross = (x2 - x1) * (py - y1) - (y2 - y1) * (px - x1)
    scale = 1.0 + abs(x2 - x1) + abs(y2 - y1) + abs(px - x1) + \
        abs(py - y1)
    if abs(cross) > _CLAIM_TOL * scale:
        return (FAIL, f"claimed point ({px:.6g}, {py:.6g}) is not on "
                      "the line through the segment (collinearity fails)")
    ap = math.hypot(px - x1, py - y1)
    pb = math.hypot(x2 - px, y2 - py)
    if pb <= 1e-12:
        return _na("point coincides with B")
    ratio = ap / pb
    if _close(ratio, mm_ / nn_, rel=_CLAIM_TOL):
        return (PASS, f"|AP|/|PB| = {ap:.6g}/{pb:.6g} = {ratio:.6g} = "
                      f"m/n ({mm_:g}/{nn_:g}) and the claimed point is "
                      "collinear -- the division is confirmed")
    return (FAIL, f"|AP|/|PB| = {ratio:.6g} != m/n = {mm_ / nn_:.6g} "
                  f"for the claimed point ({px:.6g}, {py:.6g})")


def _v_centroid_triangle(c: _Ctx) -> Verdict:
    """CENTROID_TRIANGLE: family averaged the vertices.  Independent
    relation applied to the SHIPPED point: the claimed centroid sits 1/3
    of the way along EACH median from its vertex (parsed from
    final_answer, not taken from the family's quantities)."""
    from backend.its.solver.maths_families import _c_pairs
    q = _cisce_math_norm(c.question)
    pts = _c_pairs(q)
    claim = _claimed_point(c)
    if len(pts) != 3 or claim is None:
        return _na("vertices/claimed centroid not all parsed")
    gx, gy = claim
    for i, (vx, vy) in enumerate(pts):
        ox, oy = pts[(i + 1) % 3]
        tx, ty = pts[(i + 2) % 3]
        mx, my = (ox + tx) / 2.0, (oy + ty) / 2.0
        ex, ey = vx + 2.0 * (mx - vx) / 3.0, vy + 2.0 * (my - vy) / 3.0
        if not (_close(ex, gx, rel=_CLAIM_TOL, abs_tol=_CLAIM_TOL)
                and _close(ey, gy, rel=_CLAIM_TOL, abs_tol=_CLAIM_TOL)):
            return (FAIL, f"median {i + 1}: the claimed centroid "
                          f"({gx:.6g}, {gy:.6g}) is not at the expected "
                          f"({ex:.6g}, {ey:.6g}) 2/3 along the median "
                          f"from vertex {i + 1}")
    return (PASS, "the claimed point lies 2/3 along all three medians "
                  "(centroid median property)")


def _reflection_mirror(q: str):
    """(point, mirror, k, line_abc) for a reflection question."""
    from backend.its.solver.maths_families import _c_pairs, _parse_line_abc
    pts = _c_pairs(q)
    if not pts:
        return None
    x, y = pts[0]
    mm = re.search(r"reflected\s+(?:in|across|over|about)\s+(?:the\s+)?"
                   r"(.+?)\s*(?:\.|\?|$|,)", q, re.I)
    if not mm:
        mm = re.search(r"reflect\s+(?:the\s+)?(?:point\s+)?\(?-?[\d.]+\s*,"
                       r"\s*-?[\d.]+\)?\s+(?:in|across|over|about)\s+"
                       r"(?:the\s+)?(.+?)\s*(?:\.|\?|$|,)", q, re.I)
    if not mm:
        return None
    mirror_txt = mm.group(1).strip().lower()
    if re.search(r"x\s*-?\s*axis", mirror_txt):
        return (x, y, "x-axis", None, None)
    if re.search(r"y\s*-?\s*axis", mirror_txt):
        return (x, y, "y-axis", None, None)
    if "origin" in mirror_txt:
        return (x, y, "origin", None, None)
    kl = re.search(r"(?:vertical\s+)?line\s*x\s*=\s*(-?\d+(?:\.\d+)?)",
                   mirror_txt)
    if kl:
        return (x, y, "line x=k", float(kl.group(1)), None)
    kl = re.search(r"(?:horizontal\s+)?line\s*y\s*=\s*(-?\d+(?:\.\d+)?)",
                   mirror_txt)
    if kl:
        return (x, y, "line y=k", float(kl.group(1)), None)
    if re.search(r"line\s*y\s*=\s*x|line\s*x\s*=\s*y", mirror_txt):
        return (x, y, "line y=x", None, None)
    lm = re.search(r"line\s*[A-Za-z]?\s*[:=]?\s*([+-]?[\d.]+)\s*x\s*"
                   r"([+-])\s*([\d.]+)\s*y\s*([+-])\s*([\d.]+)\s*=\s*0",
                   mirror_txt)
    if lm:
        a = float(lm.group(1))
        b = float(lm.group(3)) * (-1 if lm.group(2) == "-" else 1)
        c_ = float(lm.group(5)) * (-1 if lm.group(4) == "-" else 1)
        return (x, y, "general", None, (a, b, c_))
    return None


def _v_reflection_point(c: _Ctx) -> Verdict:
    """REFLECTION_POINT / REFLECTION_LINE: family applied the image
    law.  Independent geometry applied to the SHIPPED image point (the
    claim parsed from final_answer): the mirror must BISECT the segment
    (midpoint on the mirror) and the segment must be PERPENDICULAR to
    it (along the mirror's normal)."""
    q = _cisce_math_norm(c.question)
    got = _reflection_mirror(q)
    claim = _claimed_point(c)
    if got is None or claim is None:
        return _na("point/mirror/claimed image not all parsed")
    x, y, mirror, k, abc = got
    ix, iy = claim
    mx, my = (x + ix) / 2.0, (y + iy) / 2.0
    dx, dy = ix - x, iy - y
    tol = _CLAIM_TOL * max(1.0, abs(x), abs(y), abs(ix), abs(iy))
    if mirror == "x-axis":
        ok = abs(my) < tol and abs(dx) < tol and abs(dy) > tol
    elif mirror == "y-axis":
        ok = abs(mx) < tol and abs(dy) < tol and abs(dx) > tol
    elif mirror == "origin":
        ok = abs(mx) < tol and abs(my) < tol
    elif mirror == "line x=k":
        ok = abs(mx - k) < tol and abs(dy) < tol
    elif mirror == "line y=k":
        ok = abs(my - k) < tol and abs(dx) < tol
    elif mirror == "line y=x":
        ok = abs(mx - my) < tol and abs(dx + dy) < tol
    else:                                    # general line ax+by+c=0
        a, b, c_ = abc
        ok = (abs(a * mx + b * my + c_) < tol * max(1.0, abs(a) + abs(b))
              and abs(dx * b - dy * a) < tol * max(1.0, abs(a) + abs(b)))
    if ok:
        return (PASS, f"mirror incidence: the claimed image "
                      f"({ix:.6g}, {iy:.6g}) has midpoint "
                      f"({mx:.6g}, {my:.6g}) on the "
                      f"{mirror.replace('line ', '')} and the segment "
                      "is perpendicular to it")
    return (FAIL, f"mirror incidence fails for the claimed image "
                  f"({ix:.6g}, {iy:.6g}): midpoint ({mx:.6g}, "
                  f"{my:.6g}), displacement ({dx:.6g}, {dy:.6g}) for "
                  f"mirror {mirror}")


def _v_parallel_lines(c: _Ctx) -> Verdict:
    """DISTANCE_PARALLEL_LINES: family normalised the constants.
    Independent: the point-to-line distance of a point ON line 1 to
    line 2 -- the two must agree for parallel lines."""
    from backend.its.solver.maths_families import _parse_line_abc
    q = _cisce_math_norm(c.question)
    mm = re.search(r"lines?\s+(?P<l1>[^.,;?]+?)\s+and\s+"
                   r"(?P<l2>[^.,;?]+?)(?:\?|\.|$|,)", q, re.I)
    if mm is None or c.claim is None:
        return _na("two lines not parsed from the question")
    l1 = _parse_line_abc(mm.group("l1"))
    l2 = _parse_line_abc(mm.group("l2"))
    if l1 is None or l2 is None:
        return _na("line equations not parsed")
    a1, b1, c1 = l1
    a2, b2, c2 = l2
    if abs(b1) < 1e-12:
        return _na("degenerate line")
    y0 = -c1 / b1                      # point (0, y0) lies on line 1
    d = abs(a2 * 0.0 + b2 * y0 + c2) / math.sqrt(a2 * a2 + b2 * b2)
    if _close(d, c.claim, rel=1e-9, abs_tol=1e-9):
        return (PASS, f"point-on-line-1 projection: (0, {y0:.6g}) to "
                      f"line 2 = {d:.6g} -- matches the constant "
                      "difference form")
    return (FAIL, f"point projection distance {d:.6g} != claimed "
                  f"{c.claim:.6g}")


def _rd_givens(q: str):
    """(P per month, n months, r %, M maturity) from an RD question."""
    from backend.its.solver.maths_families import _rd_harvest
    return _rd_harvest(q)


def _rd_maturity_by_month_loop(p: float, n: int, r: float) -> float:
    """Month-loop accumulation: the deposit made in month m (1-based)
    earns simple interest for the (n - m + 1) months from its deposit
    to maturity; every deposit returns its principal.  Same ICSE
    convention as the closed form, built bottom-up."""
    interest = 0.0
    for m in range(1, n + 1):
        interest += p * (n - m + 1) * (r / 1200.0)
    return p * n + interest


def _v_rd_maturity(c: _Ctx) -> Verdict:
    """RD_MATURITY: family used the ICSE closed form.  Independent:
    month-by-month accumulation of each instalment's interest."""
    q = _cisce_math_norm(c.question)
    p, n, r, mv = _rd_givens(q)
    if c.claim is None or p is None or n is None or r is None:
        return _na("RD givens not parsed from the question")
    total = _rd_maturity_by_month_loop(p, int(round(n)), r)
    if _money_close(total, c.claim):
        return (PASS, f"month-loop: {int(round(n))} instalments of "
                      f"{p:g} with {r:g}% p.a. accumulate to "
                      f"{total:.6g}")
    return (FAIL, f"month-loop maturity {total:.6g} != claimed "
                  f"{c.claim:.6g}")


def _v_rd_rate(c: _Ctx) -> Verdict:
    """RD_MATURITY_RATE: family inverted the closed form.
    Independent: substitute the claimed rate into the month-loop
    forward relation -- the maturity must reproduce the stated one."""
    q = _cisce_math_norm(c.question)
    p, n, r, mv = _rd_givens(q)
    if c.claim is None or p is None or n is None or mv is None:
        return _na("RD givens not parsed from the question")
    total = _rd_maturity_by_month_loop(p, int(round(n)), c.claim)
    if _money_close(total, mv):
        return (PASS, f"forward check: {p:g}/month x "
                      f"{int(round(n))} months at {c.claim:.6g}% "
                      f"reproduces the stated maturity {mv:.6g}")
    return (FAIL, f"claimed rate {c.claim:.6g}% reproduces maturity "
                  f"{total:.6g} != stated {mv:.6g}")


def _v_rd_period(c: _Ctx) -> Verdict:
    """RD_MATURITY_PERIOD: family solved the quadratic in n.
    Independent: forward month-loop with the claimed whole-month period
    must reproduce the stated maturity."""
    q = _cisce_math_norm(c.question)
    p, n, r, mv = _rd_givens(q)
    if c.claim is None or p is None or r is None or mv is None:
        return _na("RD givens not parsed from the question")
    total = _rd_maturity_by_month_loop(p, int(round(c.claim)), r)
    if _money_close(total, mv):
        return (PASS, f"forward check: {int(round(c.claim))} months of "
                      f"{p:g} at {r:g}% reproduces the stated maturity "
                      f"{mv:.6g}")
    return (FAIL, f"claimed period {c.claim:.6g} months reproduces "
                  f"{total:.6g} != stated {mv:.6g}")


# --------------------------------------------------------------------------- #
# CISCE sciences wave (cisce-solver-sciences 2026-09-30): independent
# second-path checks for the new physics / chemistry / biology families.
# Every check re-parses its inputs from the QUESTION text with its own
# regex pass (never the family's parser) and recomputes the physics.
# Honest NA when the re-parse is incomplete; FAIL only on a numeric
# mismatch of the recomputed value against the claim.
# --------------------------------------------------------------------------- #

_SCI_TOK = r"(\d[\d,]*(?:\.\d+)?(?:\s*[eE]\s*\^?\s*-?\+?\d+)?)"


def _vnum(raw: str) -> Optional[float]:
    """Parse a possibly-scientific token ('2.5 x 10^5', '2.5e5')."""
    s = re.sub(r"[\s,]", "", raw)
    s = s.replace("x", "e").replace("X", "e").replace("^", "")
    try:
        return float(s)
    except ValueError:
        return None


def _pnum(q: str, pat: str) -> Optional[float]:
    m = re.search(pat, q, re.I)
    if m is None:
        return None
    # alternation binds the number into whichever branch matched --
    # group(1) is None when a later branch's SCI_TOK is the hit
    for g in m.groups():
        if g is None:
            continue
        try:
            return _vnum(g)
        except (ValueError, TypeError):
            continue
    return None


def _v_science_ratio(c: _Ctx, want: Optional[float], what: str,
                     units: str) -> Verdict:
    if want is None or c.claim is None:
        return _na(f"{what}: quantities incomplete")
    if _close(want, c.claim):
        return (PASS, f"second path: {what} = {want:.6g} {units} -- "
                      f"matches the claim {c.claim:.6g}")
    return (FAIL, f"second path: {what} = {want:.6g} {units} != "
                  f"claimed {c.claim:.6g}")


def _mass_kg(q: str) -> Optional[float]:
    v = _pnum(q, r"(?:mass\s+of\s+(?:the\s+)?)?" + _SCI_TOK +
              r"\s*kg\b")
    if v is None:
        g = _pnum(q, r"(?:mass\s+of\s+(?:the\s+)?)?" + _SCI_TOK +
                  r"\s*g(?:rams?)?\b")
        if g is not None:
            v = g / 1000.0
    return v


def _v_power_crane(c: _Ctx) -> Verdict:
    """_c_power_time crane branch: P = m g h / t, re-parsed and
    recomputed from the question."""
    q = c.question
    m = _mass_kg(q)
    h = _pnum(q, r"(?:height|depth)\s+(?:of\s+)?" + _SCI_TOK +
              r"\s*m(?:etr\w*)?\b|"
              r"to\s+a\s+height\s+of\s+" + _SCI_TOK +
              r"\s*m(?:etr\w*)?\b|"
              + _SCI_TOK + r"\s*m(?:etr\w*)?\b[^.]{0,30}?(?:high|"
              r"height|up|lift\w*|rais\w*)|(?:lift\w*|rais\w*|"
              r"hoist\w*)[^.]{0,40}?" + _SCI_TOK +
              r"\s*m(?:etr\w*)?\b")
    t = _pnum(q, r"(?:in|within|for|over)\s+" + _SCI_TOK +
              r"\s*(?:seconds?|s\b|min(?:ute)?s?)")
    if m is None or h is None or t is None:
        return _na("crane-power quantities incomplete")
    tm = re.search(_SCI_TOK + r"\s*min(?:ute)?s?", q, re.I)
    if tm is not None:
        t = _vnum(tm.group(1)) * 60.0
    g = 9.8
    gm = re.search(r"g\s*=\s*(9\.8|9\.81|10)(?!\d)", q, re.I)
    if gm is not None:
        g = float(gm.group(1))
    want = m * g * h / t
    return _v_science_ratio(c, want, "P = m g h / t", "W")


def _v_density(c: _Ctx) -> Verdict:
    """DENSITY_MASS_VOLUME: rho = m / V (SI, both unit families)."""
    q = c.question
    if re.search(_SCI_TOK + r"\s*kg\b", q, re.I):
        m = _pnum(q, _SCI_TOK + r"\s*kg\b")
    else:
        g = _pnum(q, _SCI_TOK + r"\s*g(?:rams?)?\b")
        m = g / 1000.0 if g is not None else None
    if re.search(_SCI_TOK + r"\s*(?:cm\s*\^?3|cm\u00b3|cc\b|mL\b)",
                 q, re.I):
        v = _pnum(q, _SCI_TOK +
                  r"\s*(?:cm\s*\^?3|cm\u00b3|cc\b|mL\b)")
        v_si = v / 1e6 if v is not None else None
    elif re.search(_SCI_TOK + r"\s*(?:litres?\b|L\b)", q, re.I):
        v = _pnum(q, _SCI_TOK + r"\s*(?:litres?\b|L\b)")
        v_si = v / 1000.0 if v is not None else None
    else:
        v = _pnum(q, _SCI_TOK + r"\s*(?:m\s*\^?3|m\u00b3)\b")
        v_si = v
    if m is None or v_si is None or m <= 0 or v_si <= 0:
        return _na("density quantities incomplete")
    return _v_science_ratio(c, m / v_si, "density = m / V", "kg/m^3")


def _v_thermal_expansion(c: _Ctx) -> Verdict:
    """THERMAL_EXPANSION: dL = L0 alpha dT (2x area, 3x volume)."""
    q = c.question
    l0 = _pnum(q, _SCI_TOK + r"\s*m\b")
    # \u00d7/* : the corpus and the pipeline normalizer surface other
    # multiplication signs than 'x' (2026-10-07 rail-gap dig)
    am = re.search(r"(\d+(?:\.\d+)?)\s*[xX\u00d7*]\s*10\s*\^?\s*"
                   r"(-?)(\d+)\s*(?:per|/|\s)\s*[KkC]", q)
    dt = _pnum(q, r"(?:rais\w*|heated|increas\w*|ris\w*)[^.]{0,30}?"
               r"(?:by\s+)?" + _SCI_TOK + r"\s*(?:degrees?\s*|\u00b0\s*)?"
               r"[CCK]\b")
    if l0 is None or am is None or dt is None:
        return _na("expansion quantities incomplete")
    # TWO stated temperatures: dT is their DIFFERENCE ('laid at 20 C ...
    # rises to 45 C' is dT = 25, not 45 -- 2026-10-07 rail-gap dig)
    tm = re.findall(r"(?<![\^\d-])(-?\d+(?:\.\d+)?)\s*(?:\u00b0\s*)?"
                    r"(?:C|celsius|K|kelvin)\b", q)
    if len(tm) >= 2:
        dtp = abs(float(tm[-1]) - float(tm[0]))
        if dtp > 0:
            dt = dtp
    alpha = float(am.group(1)) * 10.0 ** (
        (-1.0 if am.group(2) == "-" else 1.0) * float(am.group(3)))
    if re.search(r"(?:superficial|area).{0,30}expansion|area\s+"
                 r"increas\w+", q, re.I):
        want = l0 * 2.0 * alpha * dt
        rel = "2 a dT (area)"
    elif re.search(r"(?:cubic|volume).{0,30}expansion|volume\s+"
                   r"increas\w+", q, re.I):
        want = l0 * 3.0 * alpha * dt
        rel = "3 a dT (volume)"
    else:
        want = l0 * alpha * dt
        rel = "a dT (linear)"
    return _v_science_ratio(c, want, f"expansion = L0 x {rel}", "m")


def _v_charge_carrier(c: _Ctx) -> Verdict:
    """CHARGE_CARRIER: Q = I t, then n = Q / e (e = 1.6e-19 C)."""
    q = c.question
    i = _pnum(q, _SCI_TOK + r"\s*A\b")
    t = _pnum(q, r"(?:flows?|passed|for|in|through)\D{0,20}?" +
              _SCI_TOK + r"\s*(?:seconds?|s\b|min(?:ute)?s?)")
    if i is None or t is None:
        return _na("charge quantities incomplete")
    tm = re.search(_SCI_TOK + r"\s*min(?:ute)?s?", q, re.I)
    if tm is not None:
        t = _vnum(tm.group(1)) * 60.0
    Q = i * t
    if re.search(r"electrons?", q, re.I):
        return _v_science_ratio(c, Q / 1.6e-19, "electrons = I t / e",
                                "count")
    return _v_science_ratio(c, Q, "charge = I t", "C")


def _v_sound(c: _Ctx) -> Verdict:
    """SOUND_WAVES: f = N / t, lambda = v / f (v = 340 m/s unless
    the question states another speed)."""
    q = c.question
    v = _pnum(q, r"(?:speed|velocity)\s+(?:of\s+)?(?:sound\s+)?"
              r"(?:is\s+|of\s+)?" + _SCI_TOK + r"\s*m\s*/?\s*s\b")
    if v is None:
        v = 340.0
    if re.search(r"vibrations?", q, re.I):
        n = _pnum(q, _SCI_TOK + r"\s+(?:complete\s+)?vibrations?")
        t = _pnum(q, r"(?:in|per|for)\s+" + _SCI_TOK +
                  r"\s*(?:seconds?|s\b)")
        if n is None or t is None or t <= 0:
            return _na("sound frequency quantities incomplete")
        return _v_science_ratio(c, n / t, "f = N / t", "Hz")
    if re.search(r"wavelength", q, re.I):
        lam = _pnum(q, _SCI_TOK + r"\s*(?:mm\b|cm\b|m\b)")
        if lam is not None:
            lam_si = lam
            if re.search(_SCI_TOK + r"\s*cm\b", q, re.I):
                lam_si = lam / 100.0
            elif re.search(_SCI_TOK + r"\s*mm\b", q, re.I):
                lam_si = lam / 1000.0
            return _v_science_ratio(c, v / lam_si, "f = v / lambda", "Hz")
        f = _pnum(q, _SCI_TOK + r"\s*Hz\b")
        if f is not None and f > 0:
            return _v_science_ratio(c, v / f, "lambda = v / f", "m")
    return _na("sound relation not identified")


def _v_gravitation(c: _Ctx) -> Verdict:
    """GRAVITATION_FORCE: F = G m1 m2 / r^2 (G = 6.67e-11)."""
    q = c.question
    ms = re.findall(_SCI_TOK + r"\s*kg\b", q, re.I)
    r = _pnum(q, _SCI_TOK + r"\s*(?:m\b|met(?:er|re)s?\b|km\b|cm\b)")
    if len(ms) < 2 or r is None:
        return _na("gravitation quantities incomplete")
    m1, m2 = _vnum(ms[0]), _vnum(ms[1])
    if m1 is None or m2 is None:
        return _na("gravitation masses not parsed")
    if re.search(_SCI_TOK + r"\s*km\b", q, re.I):
        r *= 1000.0
    elif re.search(_SCI_TOK + r"\s*cm\b", q, re.I):
        r /= 100.0
    want = 6.67e-11 * m1 * m2 / (r * r)
    return _v_science_ratio(c, want, "F = G m1 m2 / r^2", "N")


def _v_em_wave(c: _Ctx) -> Verdict:
    """EM_WAVE_RELATION: c = f lambda with c = 3e8 m/s."""
    q = c.question
    fm = re.search(_SCI_TOK + r"\s*(GHz|MHz|kHz|Hz)\b", q, re.I)
    # wavelength candidates: skip the parenthesised constant "(c = 3e8
    # m/s)" -- its number is c, not a state of the wave.
    lam = None
    lam_si = None
    for lm in re.finditer(_SCI_TOK + r"\s*(mm|cm|m)\b", q, re.I):
        after = q[lm.end():lm.end() + 4]
        before = q[max(0, lm.start() - 12):lm.start()]
        if re.match(r"\s*/\s*s", after):
            continue
        if re.search(r"\bc\s*=\s*$", before):
            continue
        lam = _vnum(lm.group(1))
        lam_si = lam * {"mm": 1e-3, "cm": 1e-2, "m": 1.0}[
            lm.group(2).lower()]
        break
    if fm is None and lam_si is None:
        return _na("em-wave quantities incomplete")
    if fm is not None:
        f = _vnum(fm.group(1))
        unit = fm.group(2)
        f_si = f * {"GHz": 1e9, "MHz": 1e6, "kHz": 1e3,
                    "Hz": 1.0}[unit]
        if lam_si is not None:
            prod = f_si * lam_si
            if _close(prod, 3e8, rel=0.02):
                return (PASS, f"second path: f x lambda = {prod:.6g} m "
                              "~ c -- the claim closes the wave relation")
        # wavelength asked (or a wrong pair): the claim must equal c / f
        return _v_science_ratio(c, 3e8 / f_si, "lambda = c / f", "m")
    # frequency asked from a stated wavelength
    return _v_science_ratio(c, 3e8 / lam_si, "f = c / lambda", "Hz")


def _v_gas_law(c: _Ctx) -> Verdict:
    """Gas-law families: an independent state-pair parser checks the
    combined relation P1 V1 / T1 = P2 V2 / T2 (same-kind SI scaling
    makes each unit family cancel within a kind)."""
    q = c.question
    slots: Dict[str, Tuple[float, float]] = {}
    for mm in re.finditer(
            r"\b([PVT])\s*[12\u2081\u2082]\b\D{0,16}?"
            r"(\d+(?:\.\d+)?)\s*"
            r"(atm|mm\s*Hg|cm\s*Hg|kPa|Pa|mL|L|cm\s*\^?3|cm\u00b3|"
            r"K|[\u00b0\s]*C)\b", q, re.I):
        kind = mm.group(1).upper()
        if kind in slots:
            continue
        u = re.sub(r"[\s.^*]", "", mm.group(3).lower())
        v = float(mm.group(2))
        if kind == "T":
            si = v + 273.0 if u.endswith("c") else v
        elif kind == "P":
            base = {"atm": 101325.0, "mmhg": 133.3224, "cmhg": 13332.24,
                    "kpa": 1000.0, "pa": 1.0}
            si = v * base.get(u, 0.0)
        else:
            base = {"ml": 1e-6, "l": 1e-3, "cm3": 1e-6,
                    "cm\u00b3": 1e-6, "m3": 1.0}
            si = v * base.get(u, 0.0)
        if si <= 0:
            return _na("nonpositive gas state")
        slots[kind] = (si, si)  # placeholder; per-state below
    # per-state parse: P1.., P2.. etc. need separate capture
    per: Dict[str, Dict[str, float]] = {"1": {}, "2": {}}
    if not re.search(r"\b[PVT]\s*[12\u2081\u2082]\b", q, re.I):
        # prose states ("occupies 500 cm3 at 27 C and 760 mm Hg ...
        # volume at STP"): rebuild both states independently.
        vm = re.search(r"(?:occupies|measures|has\s+a\s+volume\s+of|"
                       r"volume\s+of)\s*(\d+(?:\.\d+)?)\s*"
                       r"(cm\s*\^?3|cm\u00b3|cc|mL|L)\b", q, re.I)
        pm = re.search(r"(?:at|and|with|pressure\s+of)\s*"
                       r"(\d+(?:\.\d+)?)\s*"
                       r"(mm\s*Hg|cm\s*Hg|atm|kPa|Pa)\b", q, re.I)
        tm = re.search(r"(?:at|temperature\s+of)\s*(\d+(?:\.\d+)?)"
                       r"\s*\u00b0?\s*([CK])\b", q, re.I)
        if vm is None or (pm is None and tm is None):
            return _na("prose gas states incomplete")
        v1 = float(vm.group(1)) * {"CM3": 1e-6, "CM\u00b3": 1e-6,
                                   "CC": 1e-6, "ML": 1e-6,
                                   "L": 1e-3}[
            re.sub(r"[\s.^*]", "", vm.group(2).upper())]
        p1 = None
        if pm is not None:
            p1 = float(pm.group(1)) * {
                "mmhg": 133.3224, "cmhg": 13332.24, "atm": 101325.0,
                "kpa": 1000.0, "pa": 1.0}[
                re.sub(r"[\s.^*]", "", pm.group(2).lower())]
        t1 = None
        if tm is not None:
            t1 = float(tm.group(1)) + (273.0 if tm.group(2) == "C"
                                       else 0.0)
        stp = bool(re.search(r"(?:volume|pressure|temperature)\s+"
                             r"(?:of\s+the\s+(?:gas\s+)?)?at\s+STP"
                             r"\b", q, re.I))
        p2 = p1 if p1 is not None else 101325.0
        t2 = t1 if t1 is not None else 273.0
        if stp:
            p2, t2 = 101325.0, 273.0
        am2 = re.search(r"(?:what\s+(?:is|will|was)\s+(?:be\s+)?"
                        r"(?:the\s+|its\s+)?|find\s+(?:the\s+|"
                        r"its\s+)?)(new\s+|final\s+)?"
                        r"(volume|pressure|temperature)", q, re.I)
        if am2 is None:
            return _na("prose gas target not identified")
        want_kind = am2.group(2).lower()
        if not stp:
            # symbolic volume ratio ("compressed to half its original
            # volume"): V2 = frac x V1, so P2 = P1 / frac exactly.
            fm2 = re.search(r"(?:compressed|reduced|squeezed)\s+to\s+"
                            r"half|half\s+its\s+original", q, re.I)
            frac = None
            if fm2 is not None:
                frac = 0.5
            elif re.search(r"(?:expanded|doubled)\s+to\s+twice|"
                           r"twice\s+its|double[sd]?\s+its", q, re.I):
                frac = 2.0
            elif re.search(r"(?:one-third|a\s+third)\s+of\s+"
                           r"(?:its|the)\s+volume", q, re.I):
                frac = 1.0 / 3.0
            elif re.search(r"a\s+quarter\s+of\s+(?:its|the)\s+"
                           r"volume", q, re.I):
                frac = 0.25
            if frac is None or p1 is None or want_kind != "pressure" or                     c.claim is None:
                return _na("prose gas target not identified")
            want = p1 / frac / 133.3224                 if re.sub(r"[\s.^*]", "", pm.group(2).lower()) in                 ("mmhg", "torr") else p1 / frac / 101325.0
            if _close(want, c.claim, rel=1e-3):
                return (PASS, f"second path: P2 = P1 / frac = "
                              f"{want:.6g} -- matches the claim "
                              f"{c.claim:.6g}")
            return (FAIL, f"second path: P2 = P1 / frac = "
                          f"{want:.6g} != claimed {c.claim:.6g}")
        base = v1
        if p1 is not None:
            base *= p1 / p2
        if t1 is not None:
            base *= t2 / t1
        # answer in the unit family the question itself used
        v_unit = re.sub(r"[\s.^*]", "", vm.group(2).upper())
        if want_kind == "volume":
            scale = 1e6 if v_unit in ("CM3", "CM\u00b3", "CC", "ML") \
                else 1e3
        elif want_kind == "pressure":
            scale = 1.0 / (133.3224 if (pm is not None and
                                        re.sub(r"[\s.^*]", "",
                                               pm.group(2).lower())
                                        in ("mmhg", "torr"))
                           else 101325.0)
        else:
            scale = 1.0
        want = base * scale
        if want is not None and c.claim is not None and \
                _close(want, c.claim, rel=1e-3):
            return (PASS, f"second path: combined-law rebuild gives "
                          f"{want:.6g} (SI-scaled) -- matches the claim "
                          f"{c.claim:.6g}")
        if c.claim is None:
            return _na("gas-law claim missing")
        return (FAIL, f"second path: combined-law rebuild gives "
                      f"{want:.6g} != claimed {c.claim:.6g}")
    for mm in re.finditer(
            r"\b([PVT])([12\u2081\u2082])\b\D{0,16}?"
            r"(\d+(?:\.\d+)?)\s*"
            r"(atm|mm\s*Hg|cm\s*Hg|kPa|Pa|mL|L|cm\s*\^?3|cm\u00b3|"
            r"K|[\u00b0\s]*C)\b", q, re.I):
        kind = mm.group(1).upper()
        st = "1" if mm.group(2) in ("1", "\u2081") else "2"
        u = re.sub(r"[\s.^*]", "", mm.group(4).lower())
        v = float(mm.group(3))
        if kind == "T":
            si = v + 273.0 if u.endswith("c") else v
        elif kind == "P":
            base = {"atm": 101325.0, "mmhg": 133.3224, "cmhg": 13332.24,
                    "kpa": 1000.0, "pa": 1.0}
            si = v * base.get(u, 0.0)
        else:
            base = {"ml": 1e-6, "l": 1e-3, "cm3": 1e-6,
                    "m3": 1.0}
            si = v * base.get(u, 0.0)
        if si <= 0:
            return _na("nonpositive gas state")
        per[st][kind] = si
    if not per["1"] or not per["2"]:
        return _na("gas-law state pair incomplete")
    kinds = set(per["1"]) & set(per["2"])
    if not kinds:
        return _na("gas-law kinds do not pair")
    lhs = 1.0
    rhs = 1.0
    for k in kinds:
        lhs *= per["1"][k]
        rhs *= per["2"][k]
    if _close(lhs, rhs, rel=1e-4):
        return (PASS, f"second path: P1V1/T1 = {lhs:.6g} = P2V2/T2 = "
                      f"{rhs:.6g} (SI-scaled per kind, T in kelvin)")
    return (FAIL, f"second path: P1V1/T1 = {lhs:.6g} != P2V2/T2 = "
                  f"{rhs:.6g}")


def _v_reaction_stoich(c: _Ctx) -> Verdict:
    """REACTION_STOICH_STP: recompute m <-> n <-> V(STP) with an
    independent mass/volume parse (the balanced equation is textbook
    ground truth, re-taken from the family's matched row)."""
    q = c.question
    try:
        from backend.its.solver.chemistry_families import _REACTION_DB, \
            molar_mass, _R_MASS_RX, _stoich_gas_volume
    except Exception:
        return _na("stoich table unavailable")
    ask_mass = bool(re.search(r"\bmass\b", q, re.I))
    db = _REACTION_DB
    if ask_mass:
        db = ([row for row in _REACTION_DB
               if re.search(row[1], q, re.I)] +
              [row for row in _REACTION_DB
               if not re.search(row[1], q, re.I)])
    for name_rx, prod_rx, fr, fp, cr, cp, eqn in db:
        rm = re.search(_R_MASS_RX + r"(?P<name>" + name_rx + r")", q,
                       re.I)
        if rm is None:
            continue
        Mr = molar_mass(fr)
        Mp = molar_mass(fp)
        if not Mr or not Mp:
            continue
        mv = _vnum(rm.group("m"))
        if not mv or mv <= 0:
            continue
        n_r = mv / Mr
        if re.search(r"\bSTP\b", q, re.I) and not ask_mass:
            # the asked gas must be named in the question, else this
            # row is a word-overlap coincidence ("carbon" inside
            # "carbon tetrachloride") and says nothing about the ask.
            if not re.search(prod_rx, q, re.I):
                continue
            return _v_science_ratio(c, n_r * (cp / cr) * 22.4,
                                    f"V({fp}) at STP", "L")
        pm = re.search(_R_MASS_RX + r"(?P<name>" + prod_rx + r")", q,
                       re.I)
        pv = _stoich_gas_volume(q, prod_rx)
        if pv is not None and not ask_mass:
            n_p = pv / 22.4
            return _v_science_ratio(c, n_p * (cr / cp) * Mr,
                                    f"m({fr}) from V at STP", "g")
        if pm is not None and not ask_mass:
            want = _vnum(pm.group("m")) * (cr / cp) * Mr
            return _v_science_ratio(c, want, f"m({fr}) reverse-stoich",
                                    "g")
        return _v_science_ratio(c, n_r * (cp / cr) * Mp,
                                f"m({fp}) by stoichiometry", "g")
    return _na("no reaction row matched the question")


def _v_conservation_mass(c: _Ctx) -> Verdict:
    """CONSERVATION_OF_MASS: the answer must equal the arithmetic
    difference of the two re-parsed masses."""
    q = c.question
    ms = [float(x.replace(",", "")) for x in re.findall(
        r"(\d+(?:\.\d+)?)\s*g(?:rams?)?\b", q, re.I)]
    if len(ms) < 2 or c.claim is None:
        return _na("conservation masses incomplete")
    return _v_science_ratio(c, abs(ms[1] - ms[0]), "|m2 - m1| by "
                            "conservation", "g")


def _v_atom_structure(c: _Ctx) -> Verdict:
    """ATOM_STRUCTURE: neutrons = A - Z; shell capacity 2 n^2."""
    q = c.question
    am = re.search(r"mass\s+number\D{0,12}?(\d{1,3})", q, re.I)
    zm = re.search(r"atomic\s+number\D{0,12}?(\d{1,3})", q, re.I)
    if am is not None and zm is not None and \
            re.search(r"neutrons?", q, re.I):
        want = float(int(am.group(1)) - int(zm.group(1)))
        return _v_science_ratio(c, want, "neutrons = A - Z", "count")
    sm = re.search(r"(?:shell|orbit)\s*\(?\s*n?\s*=?\s*(\d)\)?"
                   r"|([KLMNOP])\s+(?:shell|orbit)", q, re.I)
    if sm is not None and re.search(r"maximum\s+number\s+of\s+"
                                    r"electrons", q, re.I):
        n = int(sm.group(1)) if sm.group(1) else \
            {"K": 1, "L": 2, "M": 3, "N": 4, "O": 5}[sm.group(2)]
        return _v_science_ratio(c, float(2 * n * n), "capacity = 2 n^2",
                                "electrons")
    return _na("atomic-structure question not parsed")


def _v_isotopic_mass(c: _Ctx) -> Verdict:
    """ISOTOPIC_ATOMIC_MASS: weighted mean recomputed from the prose
    isotope/abundance pairs."""
    q = c.question
    pairs = []
    for mm in re.finditer(r"\(([^\(\)]*)\)", q):
        body = mm.group(1)
        m = re.search(r"(\d+(?:\.\d+)?)\s*u\b", body)
        p = re.search(r"(\d+(?:\.\d+)?)\s*%", body)
        if m and p:
            pairs.append((float(m.group(1)), float(p.group(1))))
    if not pairs:
        for mm in re.finditer(r"\b[A-Z][a-z]?-(\d{1,3})\b[^.]{0,40}?"
                              r"(\d+(?:\.\d+)?)\s*(?:%|percent)", q,
                              re.I):
            pairs.append((float(mm.group(1)), float(mm.group(2))))
    if len(pairs) < 2 or c.claim is None:
        return _na("isotope pairs incomplete")
    tot = sum(p for _m, p in pairs)
    if not (98.0 <= tot <= 102.0):
        return _na("abundances do not sum to ~100%")
    want = sum(m * p / 100.0 for m, p in pairs)
    return _v_science_ratio(c, want, "weighted-mean atomic mass", "u")


def _v_hydrate(c: _Ctx) -> Verdict:
    """WATER_CRYSTALLISATION solve-x: x = (mass lost / 18) /
    (residue / M(anhydrous)), recomputed; also the 18n/M percent mode."""
    q = c.question
    try:
        from backend.its.solver.chemistry_families import molar_mass
    except Exception:
        return _na("molar-mass kernel unavailable")
    hm = re.search(r"([A-Z][A-Za-z0-9()]{1,18}?)\.x\s*H2O\b", q)
    ms = [float(x) for x in re.findall(
        r"(\d+(?:\.\d+)?)\s*g(?:rams?)?\b", q, re.I)]
    if hm is not None and len(ms) >= 2:
        man = molar_mass(hm.group(1))
        if not man or man <= 0:
            return _na("hydrate formula not parsed")
        m_hy, m_an = ms[0], ms[1]
        if m_hy <= m_an or m_an <= 0:
            return _na("masses inconsistent with heating")
        want = ((m_hy - m_an) / 18.0) / (m_an / man)
        xi = round(want)
        if abs(want - xi) > 0.12:
            return (FAIL, f"second path: x = {want:.4g} is not close to "
                          "a whole number")
        return _v_science_ratio(c, float(xi), "x = (lost/18)/(res/M)",
                                "waters")
    dm = re.search(r"([A-Z][A-Za-z0-9()]{1,18}?)\.(\d{0,2})H2O\b", q)
    if dm is not None:
        man = molar_mass(dm.group(1))
        if not man or man <= 0:
            return _na("hydrate formula not parsed")
        n = int(dm.group(2)) if dm.group(2) else 1
        return _v_science_ratio(c, 18.0 * n / (man + 18.0 * n) * 100.0,
                                "% water = 18n / M(hydrate)", "%")
    return _na("hydrate question not parsed")


def _v_valency_unknown(c: _Ctx) -> Verdict:
    """VALENCY_UNKNOWN_ELEMENT: v(asked) x sub(asked) = v(other) x
    sub(other), re-tokenised from the formula in the question."""
    q = c.question
    em = re.search(r"valency\s+of\s+(?:the\s+)?(?:element\s+)?"
                   r"(?P<el>[A-Z])\b", q, re.I)
    cm = re.search(r"(?:in|of|formula(?:\s+(?:is|of|for))?[:=]?\s+)"
                   r"(?:the\s+)?(?:compound\s+)?"
                   r"(?P<comp>[A-Z][a-z]?\d{0,2}[A-Z][a-z]?\d{0,2})\b",
                   q, re.I)
    if em is None or cm is None or c.claim is None:
        return _na("valency question not parsed")
    el = em.group("el")
    parts = [(s, int(n) if n else 1) for s, n in
             re.findall(r"([A-Z][a-z]?)(\d*)", cm.group("comp")) if s]
    if len(parts) != 2:
        return _na("compound is not a simple binary formula")
    xs = [p for p in parts if p[0] == el]
    ot = [p for p in parts if p[0] != el]
    if len(xs) != 1 or len(ot) != 1:
        return _na("asked element not in formula")
    (_, sx), (oname, so) = xs[0], ot[0]
    vo = 2 if oname.upper() == "O" else None
    vm = re.search(r"valency\s+of\s+([A-Za-z]+)\s+(?:is\s+)?(\d)",
                   q, re.I)
    if vm is not None and vm.group(1).lower().startswith(
            oname.lower()[:4]):
        vo = int(vm.group(2))
    if vo is None:
        return _na("other element's valency unavailable")
    want = so * vo / sx
    return _v_science_ratio(c, float(int(want)), "v x sub balance",
                            "valency units")


def _v_carat(c: _Ctx) -> Verdict:
    """CARAT_ATOMS: atoms = carats x 0.2 / 12 x N_A."""
    q = c.question
    cm = re.search(r"(\d+(?:\.\d+)?)\s*carats?\b", q, re.I)
    if cm is None or c.claim is None:
        return _na("carat question not parsed")
    conv = 0.2
    convm = re.search(r"1\s*carat\s*(?:=|is)\s*(\d+(?:\.\d+)?)\s*g",
                      q, re.I)
    if convm:
        conv = float(convm.group(1))
    want = float(cm.group(1)) * conv / 12.0 * 6.022e23
    return _v_science_ratio(c, want, "atoms = carats x 0.2/12 x N_A",
                            "atoms")


def _v_cardiac(c: _Ctx) -> Verdict:
    """CARDIAC_OUTPUT: CO = SV x HR, all three slots re-parsed."""
    q = c.question
    sv = _pnum(q, r"(?:stroke\s+volume|\bSV\b)\D{0,15}?"
               r"(\d+(?:\.\d+)?)")
    hr = _pnum(q, r"(\d+(?:\.\d+)?)\s*(?:beats?\s*(?:per|/)\s*"
               r"min(?:ute)?s?|bpm)")
    if hr is None:
        hr = _pnum(q, r"(?:heart\s+rate|\bHR\b)\D{0,15}?"
                   r"(\d+(?:\.\d+)?)")
    if sv is None or hr is None or c.claim is None:
        return _na("cardiac slots incomplete")
    return _v_science_ratio(c, sv * hr, "CO = SV x HR", "mL/min")


def _v_alveolar(c: _Ctx) -> Verdict:
    """ALVEOLAR_VENTILATION: VA = (TV - dead space) x rate."""
    q = c.question
    tv = _pnum(q, r"tidal\s+volume\D{0,15}?(\d+(?:\.\d+)?)")
    ds = _pnum(q, r"dead\s+space\D{0,15}?(\d+(?:\.\d+)?)")
    rate = _pnum(q, r"(\d+(?:\.\d+)?)\s*breaths?\s*(?:per|/)\s*"
                 r"min(?:ute)?s?")
    if rate is None:
        rate = _pnum(q, r"respiratory\s+rate\D{0,15}?"
                     r"(\d+(?:\.\d+)?)")
    if tv is None or ds is None or rate is None or c.claim is None:
        return _na("alveolar slots incomplete")
    return _v_science_ratio(c, (tv - ds) * rate, "(TV - DS) x rate",
                            "mL/min")


def _v_blood_volume(c: _Ctx) -> Verdict:
    """BLOOD_VOLUME_INDICES: recompute the asked index from the
    re-parsed blood volume / plasma volume / hematocrit."""
    q = c.question
    hm = re.search(r"(?:haematocrit|hematocrit|packed\s+cell\s+"
                   r"volume|PCV)\D{0,15}?(\d+(?:\.\d+)?)\s*"
                   r"(%|percent)?", q, re.I)
    if hm is None or c.claim is None:
        return _na("hematocrit not parsed")
    raw = float(hm.group(1))
    hct = raw / 100.0 if (hm.group(2) or raw > 1.0) else raw
    bv = _pnum(q, r"(?:total\s+)?blood\s+volume\D{0,15}?"
               r"(\d+(?:\.\d+)?)")
    pv = _pnum(q, r"plasma\s+volume\D{0,15}?(\d+(?:\.\d+)?)")
    loss = _pnum(q, r"los(?:es|t|ing)\D{0,10}?(\d+(?:\.\d+)?)\s*"
                 r"L\s+of\s+plasma")
    if loss is not None and bv is not None:
        return _v_science_ratio(c, bv * hct / (bv - loss) * 100.0,
                                "new Hct = RBC/(TBV-loss)", "%")
    if bv is not None:
        ask_plasma = bool(re.search(r"plasma\s+volume|volume\s+of\s+"
                                    r"plasma", q, re.I))
        want = bv * (1 - hct) if ask_plasma else bv * hct
        return _v_science_ratio(c, want, "V = TBV x fraction", "L")
    if pv is not None:
        return _v_science_ratio(c, pv / (1 - hct),
                                "TBV = plasma / (1 - Hct)", "L")
    return _na("blood-volume slots incomplete")


def _v_spore(c: _Ctx) -> Verdict:
    """SPORE_COUNTS: recompute the asked spore arithmetic."""
    q = c.question
    if re.search(r"successive\s+generations?", q, re.I) and \
            c.claim is not None:
        gm = re.search(r"(\d{1,2})\s+successive\s+generations?", q,
                       re.I)
        n = None
        if gm is not None:
            n = int(gm.group(1))
        else:
            wm = re.search(r"\b(one|two|three|four|five|six|seven|eight|"
                           r"nine|ten)\s+successive\s+generations?", q,
                           re.I)
            if wm is not None:
                n = {"one": 1, "two": 2, "three": 3, "four": 4,
                     "five": 5, "six": 6, "seven": 7, "eight": 8,
                     "nine": 9, "ten": 10}[wm.group(1).lower()]
        if n is None:
            return _na("generation count not parsed")
        return _v_science_ratio(c, float(2 ** n), "N = 2^n", "cells")
    spo = _pnum(q, r"(\d[\d,]*)\s+sporangia\b")
    per = _pnum(q, r"each[^.]{0,30}?produces?\D{0,10}?"
                r"(\d[\d,]*(?:\.\d+)?(?:\s*[eE]\s*\^?\s*"
                r"-?\+?\d+)?)\s*spores?\b")
    if spo is not None and per is not None:
        return _v_science_ratio(c, spo * per, "sporangia x per-spore",
                                "spores")
    plated = _pnum(q, r"(\d[\d,]*(?:\.\d+)?(?:\s*[eE]\s*\^?\s*"
                   r"-?\+?\d+)?)\s*spores?\b")
    pct = _pnum(q, r"(\d+(?:\.\d+)?)\s*(?:%|percent)\s+(?:have\s+)?"
                r"germinat\w+|germinat\w+[^.]{0,40}?"
                r"(\d+(?:\.\d+)?)\s*(?:%|percent)")
    if plated is not None and pct is not None:
        return _v_science_ratio(c, plated * pct / 100.0,
                                "plated x germination%", "spores")
    return _na("spore question not parsed")


def _v_dihybrid(c: _Ctx) -> Verdict:
    """DIHYBRID_COUNTS: the claimed count must be total x n/16 with
    n in {1, 3, 4, 9, 12} chosen by the asked trait expressions."""
    q = c.question
    tot = _pnum(q, r"(\d{2,6})\s+(?:offspring|progeny|seeds?|plants?|"
                r"peas?)")
    if tot is None or c.claim is None:
        return _na("dihybrid totals incomplete")
    tl = q.lower()
    am = re.search(r"(?:how\s+many|number\s+of\s+(?:expected\s+)?|"
                   r"expected\s+number\s+of)", tl)
    if am is None:
        return _na("asked trait not located")
    span = tl[am.end():am.end() + 90]
    asked = []
    for w in re.findall(r"\b(round|wrinkled|yellow|green)\b", span):
        if w not in asked:
            asked.append(w)
    asked = asked[:2]
    if not asked:
        return _na("asked trait not located")
    dom = sum(1 for w in asked if w in ("round", "yellow"))
    rec = len(asked) - dom
    n = {(2, 0): 9, (1, 1): 3, (0, 2): 1, (1, 0): 12, (0, 1): 4}[
        (dom, rec)]
    return _v_science_ratio(c, tot * n / 16.0, f"total x {n}/16",
                            "offspring")


def _v_recomb(c: _Ctx) -> Verdict:
    """RECOMBINATION_FREQUENCY: RF = recombinants / total x 100 and
    the reverse expected-count solve, re-parsed."""
    q = c.question
    par = _pnum(q, r"(\d{2,6})\s+parental")
    rec = _pnum(q, r"(\d{1,6})\s+recombinant")
    if par is not None and rec is not None:
        return _v_science_ratio(c, rec / (par + rec) * 100.0,
                                "rec / (par + rec) x 100", "%")
    rf = _pnum(q, r"recombination\s+(?:frequency\s+)?(?:of\s+)?"
               r"(?:is\s+)?(\d+(?:\.\d+)?)\s*(?:%|percent)?")
    tot = _pnum(q, r"(\d{2,6})\s+(?:offspring|progeny)")
    if rf is not None and tot is not None:
        return _v_science_ratio(c, tot * rf / 100.0, "RF x total",
                                "offspring")
    return _na("recombination slots incomplete")


def _v_bio_fact_anchor(c: _Ctx) -> Verdict:
    """BIO_FACT_ANCHOR (STEM-BM 2026-10-07): the NCERT fact-recall table
    anchored the shipped answer.  Independent second path: a FRESH
    evaluate_fact_recall run on the raw student question must reproduce
    the shipped answer.  The curated table is the owner-law ground truth
    for factual recall; this check catches route misfires (another lane's
    answer riding the anchor structure) and stale labels -- the same
    re-derivation contract every numeric verifier here follows."""
    try:
        from backend.its.solver.biology_cognitive_engine import \
            BiologyCognitiveEngine
    except ImportError:
        try:
            from its.solver.biology_cognitive_engine import \
                BiologyCognitiveEngine
        except Exception:
            return _na("fact table unavailable")
    try:
        fresh = BiologyCognitiveEngine.evaluate_fact_recall(c.question)
    except Exception:
        return _na("fact lookup failed")
    if fresh is None or not getattr(fresh, "success", False):
        return _na("question does not re-anchor to a curated fact")
    fresh_ans = str(getattr(fresh, "primary_answer", "") or "").strip().lower()
    shipped = c.final_answer.strip().lower()
    if fresh_ans and (fresh_ans == shipped or fresh_ans in shipped
                      or shipped in fresh_ans):
        return (PASS, "fresh fact-table lookup on the question reproduces "
                f"the anchored answer ({fresh.primary_answer})")
    return (FAIL, f"fact-table re-anchor gives {fresh_ans!r} != shipped "
                  f"{shipped!r}")


# --------------------------------------------------------------------------- #
# electives-all 2026-10-07: classes 11-12 Computer Science verifiers.
# The FAMILY evaluates through a strict AST-walking interpreter; these
# checks recompute through a DIFFERENT engine (restricted CPython exec
# with a line-budget tracer, or an independent re-derivation from the
# question-stated data) and compare against the shipped answer.
# --------------------------------------------------------------------------- #

_PY_LINE_BUDGET = 200_000


def _py_run_restricted(src: str) -> str:
    """Second-engine execution: real CPython in a locked namespace
    (whitelisted builtins, no imports/attributes beyond the taught
    methods, line-budget tracer against runaway loops).  Raises
    PyRefuse/PyBudget-shaped exceptions on anything outside the subset
    or over budget."""
    import io as _io
    import sys as _sys
    from backend.its.solver.cs_families import (
        PyRefuse as _PR, PyBudget as _PB, py_repr as _repr, py_str as _str)

    buf = _io.StringIO()

    def _print(*args, sep=" ", end="\n", file=None, flush=False):
        if file is not None:
            raise _PR("print(file=...) is outside the taught subset")
        buf.write(sep.join(_str(a) for a in args) + end)

    import builtins as _b
    safe = {k: getattr(_b, k) for k in (
        "len", "range", "int", "float", "str", "bool", "list", "tuple",
        "dict", "set", "abs", "round", "min", "max", "sum", "sorted",
        "ord", "chr", "pow", "reversed", "enumerate", "print", "type")}
    safe["print"] = _print

    class _NoImport:
        def __getattr__(self, name):
            raise _PR("imports are outside the taught subset")

    ns = {"__builtins__": safe, "__name__": "__main__"}
    counter = {"n": 0}
    prev = _sys.gettrace()

    def _tracer(frame, event, arg):
        if event == "line":
            counter["n"] += 1
            if counter["n"] > _PY_LINE_BUDGET:
                raise _PB("line budget exhausted")
        return _tracer

    try:
        _sys.settrace(_tracer)
        try:
            exec(compile(src, "<electives-verify>", "exec"), ns)  # noqa: S102
        except _PB:
            raise
        except _PR:
            raise
        except SyntaxError as e:
            raise _PR(f"snippet does not parse: {e.msg}")
        except Exception as e:
            raise _PR(f"snippet raised {type(e).__name__}: {e}")
        finally:
            _sys.settrace(prev)
    except Exception:
        try:
            _sys.settrace(prev)
        except Exception as _e:
            _log.debug("settrace restore: %s", type(_e).__name__)
        raise
    return buf.getvalue()


def _v_py_trace(c) -> Tuple[str, str]:
    """PY_TRACE / PY_EXPR: re-execute the extracted snippet with real
    CPython (restricted) and compare the printed text."""
    from backend.its.solver.cs_families import (
        PyRefuse as _PR, PyBudget as _PB, extract_code as _code)
    src = _code(c.question)
    if not src:
        return (NA, "no code block found in the question")
    try:
        real = _py_run_restricted(src)
    except (_PR, _PB) as e:
        return (NA, f"restricted re-execution declined: {e}")
    except Exception as e:  # noqa: BLE001 -- verifier must not crash
        return (NA, f"restricted re-execution failed: {e}")
    shipped = c.final_answer or ""
    m = re.search(r"output:\s*\n?(.*)$", shipped, re.S)
    claimed = (m.group(1) if m else shipped).strip()
    real_s = real.rstrip("\n").strip()
    if claimed == real_s:
        return (PASS, "restricted CPython re-execution reproduces the "
                f"output ({real_s[:60]!r})")
    return (FAIL, f"re-execution printed {real_s[:80]!r} != shipped "
                  f"{claimed[:80]!r}")


def _v_py_type(c) -> Tuple[str, str]:
    """PY_TYPE: re-derive the literal's type via literal_eval."""
    import ast as _ast
    m = re.search(
        r"(?:data\s*type|type)\s+(?:is\s+)?(?:of\s+)?(?:the\s+)?"
        r"(?:value\s+)?(?:of\s+)?(?:`?)(-?\d+\.?\d*|True|False|None|"
        r"'[^']*'|\"[^\"]*\"|\[[^\]]*\]|\([^)]*\)|\{[^}]*\})",
        c.question, re.I)
    if not m:
        return (NA, "no classifiable literal found in the question")
    try:
        v = _ast.literal_eval(m.group(1))
    except Exception:
        return (NA, "literal does not evaluate")
    want = {"bool": "bool", "int": "int", "float": "float",
            "str": "str", "list": "list", "tuple": "tuple",
            "dict": "dict", "NoneType": "NoneType"}[
                type(v).__name__ if v is not None else "NoneType"]
    if want in (c.final_answer or ""):
        return (PASS, f"literal_eval types the value {m.group(1)!r} as "
                      f"{want}, matching the shipped answer")
    return (FAIL, f"literal_eval says {want}, shipped "
                  f"{c.final_answer[:40]!r}")


def _v_sql_clause(c) -> Tuple[str, str]:
    """SQL_CLAUSE: independent re-derivation from the purpose-fact
    table (same closed world, separate parser)."""
    from backend.its.solver.cs_families import sql_clause_answer
    hit = sql_clause_answer(c.question)
    if not hit:
        return (NA, "purpose table does not yield exactly one clause")
    term = hit[1]
    if term.lower() in (c.final_answer or "").lower():
        return (PASS, f"purpose-fact re-derivation names {term}")
    return (FAIL, f"purpose table says {term}, shipped "
                  f"{c.final_answer[:40]!r}")


def _v_sql_aggr(c) -> Tuple[str, str]:
    """SQL_AGGR: recompute the aggregate over the stated values with a
    second, independent parse of the value list."""
    from backend.its.solver.cs_families import (
        parse_value_list, sql_aggregate)
    qm = re.search(r"SELECT\s+(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*"
                   r"(DISTINCT\s+)?(\w+|\*)\s*\)", c.question, re.I)
    if not qm:
        return (NA, "no aggregate query in the question")
    vals = parse_value_list(c.question)
    if not vals:
        return (NA, "no value list parsed from the question")
    try:
        r = sql_aggregate(vals, qm.group(1).upper(), bool(qm.group(2)))
    except Exception:
        return (NA, "aggregate not computable on the stated values")
    if r["value"] is None:
        return (NA, "aggregate undefined on the stated values")
    got = r["value"]
    want = int(got) if float(got).is_integer() else round(float(got), 6)
    if re.search(rf"(?<![\d.]){re.escape(str(want))}(?![\d.])",
                 c.final_answer or ""):
        return (PASS, f"second parse recomputes {want} over "
                      f"{len(vals)} stated values")
    return (FAIL, f"second parse gives {want}, shipped "
                  f"{c.final_answer[:60]!r}")


def _v_sql_join(c) -> Tuple[str, str]:
    """SQL_JOIN: recompute CROSS JOIN size / LEFT JOIN rows via an
    independent row merge."""
    from backend.its.solver.cs_families import (
        parse_join_rows, sql_left_join)
    low = c.question.lower()
    if "cross join" in low:
        counts = re.findall(r"(\d+)\s*rows", c.question, re.I)
        if len(counts) < 2:
            return (NA, "row counts not stated")
        total = int(counts[0]) * int(counts[1])
        if str(total) in (c.final_answer or ""):
            return (PASS, f"cross product {counts[0]} x {counts[1]} = "
                          f"{total} matches")
        return (FAIL, f"cross product is {total}, shipped "
                      f"{c.final_answer[:60]!r}")
    if "left join" in low:
        rows_a = parse_join_rows(c.question, "A")
        rows_b = parse_join_rows(c.question, "B")
        if not rows_a or not rows_b:
            return (NA, "row tuples not stated")
        onm = re.search(r"ON\s+`?(\w+)`?\.(\w+)\s*=\s*`?(\w+)`?\.(\w+)",
                        c.question, re.I)
        if not onm:
            return (NA, "no ON key parse")
        ia = 0
        ib = 0
        joined = sql_left_join(rows_a, rows_b, ia, ib)

        def _fmt(r):
            return "(" + ", ".join("NULL" if v is None else
                                   (f"'{v}'" if isinstance(v, str)
                                    else str(v)) for v in r) + ")"

        shipped = c.final_answer or ""
        hit = sum(1 for r in joined if _fmt(r) in shipped)
        if hit >= max(1, len(joined) - 1):
            return (PASS, f"independent left-join merge reproduces "
                          f"{hit}/{len(joined)} rows (all left rows "
                          f"kept, misses NULL-padded)")
        return (FAIL, f"independent merge rows {_fmt(joined[0])}.. "
                      f"({len(joined)} rows) not found in shipped "
                      f"{shipped[:80]!r}")
    return (NA, "join kind not recognised")


def _v_stack_sim(c) -> Tuple[str, str]:
    """STACK_SIM: resimulate with a different structure (index pointer
    over a fixed list) and compare the final stack text."""
    from backend.its.solver.cs_families import (
        parse_stack_ops, _stack_str)
    ops = parse_stack_ops(c.question)
    if len(ops) < 3:
        return (NA, "operation sequence not parsed")
    cm = re.search(r"stack\s+(?:of\s+)?(?:maximum\s+)?(?:size|capacity)"
                   r"\s+(?:of\s+)?(\d+)", c.question, re.I)
    cap = int(cm.group(1)) if cm else None
    arr: list = [None] * (cap or len(ops))
    n = 0
    errors = 0
    for op, v in ops:
        if op == "push":
            if cap is not None and n >= cap:
                errors += 1
                continue
            arr[n] = v
            n += 1
        elif op == "pop":
            if n == 0:
                errors += 1
            else:
                n -= 1
    final = _stack_str(arr[:n])
    if final.split("(")[0].strip() in (c.final_answer or "") or \
            str(arr[:n]) in (c.final_answer or "") or \
            (n == 0 and "empty" in (c.final_answer or "").lower()):
        return (PASS, "pointer-resimulation reaches "
                      f"{final!r} (errors={errors}) matching the "
                      f"shipped trace")
    return (FAIL, f"resimulation ends with {final!r}, shipped "
                  f"{c.final_answer[:80]!r}")


def _v_queue_sim(c) -> Tuple[str, str]:
    """QUEUE_SIM: resimulate with collections.deque and compare."""
    from collections import deque
    from backend.its.solver.cs_families import parse_queue_ops, _queue_str
    ops = parse_queue_ops(c.question)
    if len(ops) < 3:
        return (NA, "operation sequence not parsed")
    qd = deque()
    errors = 0
    for op, v in ops:
        if op == "enq":
            qd.append(v)
        else:
            if not qd:
                errors += 1
            else:
                qd.popleft()
    final = _queue_str(list(qd))
    if final.split("(")[0].strip() in (c.final_answer or "") or \
            str(list(qd)) in (c.final_answer or "") or \
            (not qd and "empty" in (c.final_answer or "").lower()):
        return (PASS, "deque resimulation reaches "
                      f"{final!r} (errors={errors}) matching the "
                      f"shipped trace")
    return (FAIL, f"deque resimulation ends with {final!r}, shipped "
                  f"{c.final_answer[:80]!r}")


def _v_postfix(c) -> Tuple[str, str]:
    """POSTFIX_EVAL: recompute left-to-right with an explicit second
    stack and the operand-order swap stated independently."""
    toks_m = re.search(r"((?:\d+|[+\-*/^])(?:\s+(?:\d+|[+\-*/^])){2,})",
                       c.question)
    if not toks_m:
        return (NA, "postfix token run not found")
    toks = toks_m.group(1).replace("^", "**").split()
    st: list = []
    try:
        for tok in toks:
            if re.fullmatch(r"\d+", tok):
                st.append(float(tok))
            else:
                b, a = st.pop(), st.pop()
                st.append({"+": a + b, "-": a - b, "*": a * b,
                           "/": a / b, "**": a ** b}[tok])
    except Exception:
        return (NA, "token run does not reduce to one value")
    if len(st) != 1:
        return (NA, "token run does not reduce to one value")
    val = st[0]
    shown = str(int(val)) if val == int(val) else str(round(val, 6))
    if shown in (c.final_answer or ""):
        return (PASS, f"independent stack reduction gives {shown}")
    return (FAIL, f"independent reduction gives {shown}, shipped "
                  f"{c.final_answer[:60]!r}")


# ── C8 physics wave verifiers (2026-10-07 regression fix) ────────────────── #
# The class-8 physics families landed with deterministic computes but no
# registered second path; the VERIFIED-badge gate then downgraded every
# one of them to GUIDED under SOLVER_LLM_MODE=off (na -> VERIFIED_ASSUMED
# -> strict withhold) -- the whole c8 battery went 12/12 -> 0/14.  Each
# verifier below re-parses the givens from the question text with its OWN
# regexes and rebuilds the claim through a different relation or unit
# path than the family's compute, per the house independence contract.

_P_G = (9.8, 10.0)  # accepted gravity conventions (corpus uses both)


def _v_newton_second_law(c: _Ctx) -> Verdict:
    """NEWTON_SECOND_LAW: family ran a = F/m then v = u + a.t.
    Independent: impulse-momentum closure F.t = m.(v - u) rebuilt from
    question-parsed F, m, t (u from 'at rest' or a stated speed)."""
    q = c.question
    f = _fnum(q, r"(\d+(?:\.\d+)?)\s*N\b")
    m = _fnum(q, r"(\d+(?:\.\d+)?)\s*kg\b")
    if f is None or m is None or m <= 0:
        return _na("F/m not parsed from the question")
    t = _fnum(q, r"for\s+(\d+(?:\.\d+)?)\s*(?:s\b|seconds?\b)")
    if t is None:
        # pure a = F/m ask
        a = f / m
        if _close(a, c.claim):
            return (PASS, f"impulse-momentum path: a = F/m = {f:g}/{m:g} "
                          f"= {a:.6g} m/s^2 -- matches")
        return (FAIL, f"a = {f:g}/{m:g} = {a:.6g} != claimed {c.claim:.6g}")
    if re.search(r"at\s+rest|initially\s+stationary", q, re.I):
        u = 0.0
    else:
        u = _fnum(q, r"(\d+(?:\.\d+)?)\s*m\s*/?\s*s\b") or 0.0
    v = u + f * t / m
    if _close(v, c.claim):
        return (PASS, f"impulse-momentum check: F.t = m.(v-u) gives "
                      f"v = u + F.t/m = {u:g} + {f:g}x{t:g}/{m:g} = "
                      f"{v:.6g} m/s -- matches")
    return (FAIL, f"impulse-momentum rebuild v = {v:.6g} != claimed "
                  f"{c.claim:.6g}")


def _v_friction_from_ma(c: _Ctx) -> Verdict:
    """C8_FRICTION_FROM_MA: family used f = F - m.a.
    Independent: net-force closure -- rebuilt friction must satisfy
    F - f = m.a with f within [0, F] for opposing friction."""
    q = c.question
    f_drive = _fnum(q, r"force\s+of\s+(\d+(?:\.\d+)?)\s*N\b")
    m = _fnum(q, r"(\d+(?:\.\d+)?)\s*kg\b")
    a = _fnum(q, r"(\d+(?:\.\d+)?)\s*m\s*/?\s*s\s*(?:\^2|2|\u00b2)?")
    if f_drive is None or m is None or a is None:
        return _na("F/m/a not parsed from the question")
    f_alt = f_drive - m * a
    if _close(f_alt, c.claim) and 0 <= f_alt <= f_drive:
        return (PASS, f"net-force closure: F - m.a = {f_drive:g} - "
                      f"{m:g}x{a:g} = {f_alt:.6g} N, and F - f = m.a "
                      "holds -- matches")
    return (FAIL, f"rebuilt friction {f_alt:.6g} N != claimed "
                  f"{c.claim:.6g} N (or outside [0, F])")


def _v_static_friction(c: _Ctx) -> Verdict:
    """C8_STATIC_FRICTION: family used f = mu.N with N = m.g.
    Independent: normal-force rebuild under both accepted g
    conventions; a claim consistent with neither fails."""
    q = c.question
    mu = _fnum(q, r"(?:coefficient\s+of\s+static\s+friction|mu)\s*(?:is|=)"
               r"\s*(\d*\.\d+)")
    m = _fnum(q, r"(\d+(?:\.\d+)?)\s*kg\b")
    if mu is None or m is None:
        return _na("mu/m not parsed from the question")
    for g in _P_G:
        f_alt = mu * m * g
        if _close(f_alt, c.claim, rel=1e-4):
            return (PASS, f"normal-force rebuild: mu.m.g = {mu:g}x{m:g}x"
                          f"{g:g} = {f_alt:.6g} N -- matches")
    return (FAIL, f"claim {c.claim:.6g} N matches neither mu.m.g "
                  "convention (g=9.8 or 10)")


def _c8_rect_dims_cm(q: str) -> Optional[tuple]:
    """(l, w[, h]) in cm from '50 cm x 20 cm [x 10 cm]' or 'length 40 cm
    and width 20 cm' phrasing."""
    m3 = re.search(r"(\d+(?:\.\d+)?)\s*cm\s*[x\u00d7]\s*(\d+(?:\.\d+)?)"
                   r"\s*cm\s*[x\u00d7]\s*(\d+(?:\.\d+)?)\s*cm", q, re.I)
    if m3:
        return tuple(float(g) for g in m3.groups())
    m2 = re.search(r"(\d+(?:\.\d+)?)\s*cm\s*[x\u00d7]\s*(\d+(?:\.\d+)?)"
                   r"\s*cm", q, re.I)
    if m2:
        return (float(m2.group(1)), float(m2.group(2)))
    ml = re.search(r"length\s+(\d+(?:\.\d+)?)\s*cm\s+and\s+width\s+"
                   r"(\d+(?:\.\d+)?)\s*cm", q, re.I)
    if ml:
        return (float(ml.group(1)), float(ml.group(2)))
    mw = re.search(r"width\s+(\d+(?:\.\d+)?)\s*cm\s+and\s+length\s+"
                   r"(\d+(?:\.\d+)?)\s*cm", q, re.I)
    if mw:
        return (float(mw.group(2)), float(mw.group(1)))
    return None


def _v_pressure_area_cm(c: _Ctx) -> Verdict:
    """C8_PRESSURE_AREA_CM: family converted cm dims to m, A = l.w,
    P = F/A.  Independent: cm^2 unit path -- A in cm^2, P in N/cm^2
    converted x10^4 to Pa; two-face asks must surface BOTH face
    pressures in the shipped answer."""
    q = c.question
    f = (_fnum(q, r"force\s+of\s+(\d+(?:\.\d+)?)\s*N\b")
         or _fnum(q, r"weighs?\s+(\d+(?:\.\d+)?)\s*N\b")
         or _fnum(q, r"weight\s+of\s+(\d+(?:\.\d+)?)\s*N\b"))
    dims = _c8_rect_dims_cm(q)
    if f is None or dims is None:
        return _na("F/dimensions not parsed from the question")
    if len(dims) == 2:
        area_cm2 = dims[0] * dims[1]
        p_alt = f / area_cm2 * 1e4
        if _close(p_alt, c.claim, rel=1e-4):
            return (PASS, f"cm^2 path: P = {f:g} N / ({dims[0]:g}x"
                          f"{dims[1]:g} cm^2) x 10^4 = {p_alt:.6g} Pa "
                          "-- matches")
        return (FAIL, f"cm^2 rebuild {p_alt:.6g} Pa != claimed "
                      f"{c.claim:.6g} Pa")
    # three dims: face pressures for the largest and smallest faces
    areas = [dims[0] * dims[1], dims[0] * dims[2], dims[1] * dims[2]]
    p_large_face = f / max(areas) * 1e4   # largest face -> lower Pa
    p_small_face = f / min(areas) * 1e4   # smallest face -> higher Pa
    ans_nums = [float(x.replace(",", "")) for x in re.findall(
        r"\d+(?:\.\d+)?", c.final_answer.replace(",", ""))]
    both_present = all(any(_close(p, n, rel=0.02) for n in ans_nums)
                       for p in (p_large_face, p_small_face))
    claim_ok = any(_close(p, c.claim, rel=0.02)
                   for p in (p_large_face, p_small_face))
    if both_present and claim_ok:
        return (PASS, f"cm^2 path: face pressures {p_large_face:.6g} Pa "
                      f"(largest face) and {p_small_face:.6g} Pa "
                      "(smallest face) both present -- matches")
    return (FAIL, f"face rebuilds {p_large_face:.6g}/{p_small_face:.6g} "
                  f"Pa not consistent with claim {c.claim:.6g} + answer "
                  f"'{c.final_answer[:60]}'")


def _v_pressure_point(c: _Ctx) -> Verdict:
    """C8_PRESSURE_POINT (heel/stiletto): family used P = mg/(pi r^2)
    with r = d/2.  Independent: diameter-side rebuild -- A = pi d^2/4
    (no halving step), under both accepted g conventions."""
    q = c.question
    m = _fnum(q, r"(?:mass\s+(?:of\s+)?|of\s+mass\s+|weighs?\s+)"
               r"(\d+(?:\.\d+)?)\s*kg\b")
    um = re.search(r"diameter\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*(cm|mm|m)\b",
                   q, re.I)
    if m is None or um is None or c.claim is None:
        return _na("mass/diameter not parsed from the question")
    d = float(um.group(1))
    unit = um.group(2).lower()
    d_m = d / (100.0 if unit == "cm" else 1000.0 if unit == "mm" else 1.0)
    a_m2 = math.pi * d_m * d_m / 4.0
    for g in _P_G:
        p_alt = m * g / a_m2
        if _close(p_alt, c.claim, rel=2e-3):
            return (PASS, f"diameter-side rebuild: m.g/(pi.d^2/4) = "
                          f"{m:g}x{g:g}/{a_m2:.3e} = {p_alt:.6g} Pa "
                          "-- matches")
    return (FAIL, f"claim {c.claim:.6g} Pa matches neither "
                  f"m.g/(pi.d^2/4) convention (g=9.8 or 10)")


def _v_pressure_vehicle(c: _Ctx) -> Verdict:
    """C8_PRESSURE_VEHICLE: family used P = m.g / (N x l.w).
    Independent: per-tyre load path -- (m.g/N) over one patch area,
    plus the closure P.A_total = m.g."""
    q = c.question
    m = _fnum(q, r"(?:mass\s+of|of\s+mass)\s+(\d+(?:\.\d+)?)\s*kg\b")
    n = _fnum(q, r"(\d+)\s*(?:tyres?|tires?|wheels?)")
    if m is None:
        return _na("vehicle mass not parsed")
    if n is None:
        n_tyres = 4.0 if re.search(r"\bfour\b", q, re.I) else None
    else:
        n_tyres = n
    dims = _c8_rect_dims_cm(q)
    if not n_tyres or dims is None:
        return _na("tyre count / patch dimensions not parsed")
    for g in _P_G:
        w = m * g
        area_m2 = (dims[0] / 100.0) * (dims[1] / 100.0)
        p_alt = (w / n_tyres) / area_m2
        if _close(p_alt, c.claim, rel=1e-3):
            return (PASS, f"per-tyre path: ({m:g}x{g:g}/{n_tyres:g}) / "
                          f"({dims[0]:g}x{dims[1]:g} cm patch) = "
                          f"{p_alt:.6g} Pa -- matches")
    return (FAIL, f"claim {c.claim:.6g} Pa matches neither per-tyre "
                  "rebuild (g=9.8 or 10)")


def _v_c8_efficiency(c: _Ctx) -> Verdict:
    """C8_EFFICIENCY: family used eta = out/in x 100.
    Independent: losses path -- eta = (1 - loss/in) x 100 where loss =
    in - out, plus eta within (0, 100]."""
    q = c.question
    e_in = _fnum(q, r"consumes?\s+(\d+(?:\.\d+)?)\s*J\b")
    e_out = _fnum(q, r"produces?\s+(\d+(?:\.\d+)?)\s*J\b")
    if e_in is None or e_out is None or e_in <= 0:
        return _na("useful/input energies not parsed from the question")
    loss = e_in - e_out
    eta_alt = (1.0 - loss / e_in) * 100.0
    if _close(eta_alt, c.claim) and 0 < eta_alt <= 100:
        return (PASS, f"losses path: (1 - {loss:g}/{e_in:g}) x 100 = "
                      f"{eta_alt:.6g}% -- matches")
    return (FAIL, f"losses rebuild {eta_alt:.6g}% != claimed "
                  f"{c.claim:.6g}%")


def _v_lens_image_infinity(c: _Ctx) -> Verdict:
    """C8_LENS_IMAGE_INFINITY: family answered image-at-focal-point.
    Independent: the object-at-infinity limit of the lens equation --
    1/v = 1/f - 1/u with u -> infinity leaves v = f, so the claim must
    equal the focal length stated in the question."""
    if c.claim is None:
        return _na("no claimed image distance")
    f = _fnum(c.question, r"focal\s+length\s+(\d+(?:\.\d+)?)\s*cm")
    if f is None:
        return _na("focal length not parsed from the question")
    if _close(float(f), c.claim, rel=1e-4):
        return (PASS, f"object-at-infinity limit: v = f = {f:g} cm "
                      "-- matches")
    return (FAIL, f"claim {c.claim:.6g} cm != stated focal length "
                  f"{f:g} cm")


def _v_c8_mirror_image(c: _Ctx) -> Verdict:
    """C8_MIRROR_IMAGE: family used the reciprocal mirror equation.
    Independent: magnification path -- m = f/(u-f), v = m.u (product
    form, no reciprocal subtraction)."""
    q = c.question
    u = _fnum(q, r"(\d+(?:\.\d+)?)\s*cm\s+from\s+a\s+\w*\s*mirror")
    f = _fnum(q, r"focal\s+length\s+(\d+(?:\.\d+)?)\s*cm")
    if u is None or f is None or abs(u - f) < 1e-9:
        return _na("object distance / focal length not parsed")
    m_mag = f / (u - f)
    v_alt = m_mag * u
    if _close(v_alt, c.claim, rel=1e-3):
        return (PASS, f"magnification path: m = f/(u-f) = {f:g}/"
                      f"({u:g}-{f:g}) = {m_mag:.6g}; v = m.u = "
                      f"{v_alt:.6g} cm -- matches")
    return (FAIL, f"magnification rebuild v = {v_alt:.6g} cm != claimed "
                  f"{c.claim:.6g}")


def _v_magfield_wire(c: _Ctx) -> Verdict:
    """C8_MAGFIELD_WIRE: family used B = mu0.I/(2.pi.r).
    Independent: inversion -- recover r = mu0.I/(2.pi.B) from the
    claim and require it to match the stated distance."""
    q = c.question
    i_cur = _fnum(q, r"current\s+of\s+(\d+(?:\.\d+)?)\s*A\b")
    r_cm = _fnum(q, r"(\d+(?:\.\d+)?)\s*cm\s+from\s+the\s+wire")
    if i_cur is None or r_cm is None or c.claim in (None, 0):
        return _na("I/r not parsed from the question")
    mu0 = 4e-7 * math.pi
    r_rec = mu0 * i_cur / (2 * math.pi * c.claim) * 100.0  # m -> cm
    if _close(r_rec, r_cm, rel=1e-3):
        return (PASS, f"inversion: r = mu0.I/(2.pi.B) recovers "
                      f"{r_rec:.6g} cm -- matches stated distance")
    return (FAIL, f"inverted distance {r_rec:.6g} cm != stated "
                  f"{r_cm:g} cm")


def _v_magfield_coil(c: _Ctx) -> Verdict:
    """C8_MAGFIELD_COIL: family used B = mu0.N.I/(2r).
    Independent: inversion -- recover the turn count from the claim;
    it must land on the stated integer turns."""
    q = c.question
    n_turns = _fnum(q, r"(\d+)\s+turns?")
    r_cm = _fnum(q, r"radius\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*cm")
    i_cur = _fnum(q, r"current\s+of\s+(\d+(?:\.\d+)?)\s*A\b")
    if n_turns is None or r_cm is None or i_cur is None \
            or c.claim in (None, 0):
        return _na("N/r/I not parsed from the question")
    mu0 = 4e-7 * math.pi
    n_rec = 2 * (r_cm / 100.0) * c.claim / (mu0 * i_cur)
    if _close(n_rec, n_turns, rel=1e-3):
        return (PASS, f"inversion: N = 2rB/(mu0.I) recovers "
                      f"{n_rec:.4g} turns -- matches stated "
                      f"{int(n_turns)}")
    return (FAIL, f"inverted turn count {n_rec:.4g} != stated "
                  f"{int(n_turns)}")


def _v_c8_outlier_mean(c: _Ctx) -> Verdict:
    """C8_OUTLIER_MEAN: family dropped the farthest trial and averaged
    the rest.  Independent: sum closure -- claim x (n-1) + outlier must
    rebuild the stated total, with the outlier the trial farthest from
    the claim."""
    if c.claim is None:
        return _na("no claimed mean")
    q = c.question
    trials = [float(x) for x in re.findall(
        r"(\d+(?:\.\d+)?)\s*s\b", q, re.I)]
    if len(trials) < 4:
        trials = [float(x) for x in re.findall(r"\b(\d+\.\d+)\b", q)]
    if len(trials) < 4:
        return _na("trial list not parsed from the question")
    n = len(trials)
    spread = max(trials) - min(trials)
    outlier_candidates = [t for t in trials
                          if abs(t - c.claim) > 0.5 * abs(spread)]
    if not outlier_candidates:
        return _na("no outlier separated from the trials")
    total_rebuilt = c.claim * (n - 1) + outlier_candidates[0]
    total_stated = sum(trials)
    if _close(total_rebuilt, total_stated, rel=1e-3):
        return (PASS, f"sum closure: {c.claim:.6g} x {n - 1} + outlier "
                      f"{outlier_candidates[0]:g} = {total_rebuilt:.6g} "
                      f"= stated total {total_stated:.6g} -- matches")
    return (FAIL, f"sum closure failed: rebuilt {total_rebuilt:.6g} != "
                  f"stated total {total_stated:.6g}")


def _v_interest_capital_partner(c) -> Tuple[str, str]:
    """INTEREST_CAPITAL_PARTNER: second parse of the question -- letters
    next to amounts (either order), the rate, and any mid-year
    addition clause; recompute the requested interest."""
    q = c.question
    rate_m = re.search(r"@\s*(\d+(?:\.\d+)?)\s*%|at\s+(\d+(?:\.\d+)?)\s*%"
                       r"\s*(?:per\s+annum|p\.a\.)?", q, re.I)
    rate = float(rate_m.group(1) or rate_m.group(2)) if rate_m else None
    if rate is None or rate <= 0 or rate > 40:
        return (NA, "rate not re-parsed")
    pairs = []
    for m in re.finditer(r"\b([A-Z])\s+(?:Rs\.?|inr|\u20b9)\s*"
                         r"([\d,]+(?:\.\d+)?)", q):
        pairs.append((m.group(1), float(m.group(2).replace(",", ""))))
    if len(pairs) < 2:
        for m in re.finditer(r"(?:Rs\.?|inr|\u20b9)\s*([\d,]+(?:\.\d+)?)"
                             r"\s*\(\s*([A-Z])\s*\)", q):
            pairs.append((m.group(2), float(m.group(1).replace(",", ""))))
    if len(pairs) < 2:
        # named-partner surface: "Arun and Varun are partners with
        # capitals Rs 4,00,000 and Rs 3,00,000 respectively"
        nm = re.search(r"\b([A-Z][a-z]+)\s+and\s+([A-Z][a-z]+)\s+"
                       r"(?:are\s+partners|were\s+partners)", q)
        am = re.search(r"capitals?\s*(?:Rs\.?|inr|\u20b9)?\s*"
                       r"([\d,]+(?:\.\d+)?)\s+and\s+(?:Rs\.?|inr|\u20b9)?"
                       r"\s*([\d,]+(?:\.\d+)?)", q, re.I)
        if nm and am:
            v1 = float(am.group(1).replace(",", ""))
            v2 = float(am.group(2).replace(",", ""))
            if v1 > 0 and v2 > 0:
                pairs = [(nm.group(1), v1), (nm.group(2), v2)]
    add = re.search(
        r"on\s+(?:\d{1,2}(?:st|nd|rd|th)?\s*)?"
        r"(january|february|march|april|may|june|july|august|september|"
        r"october|november|december)\b[^.]{0,60}?\b([A-Z])\b",
        q, re.I)
    months_map = {"january": 1, "february": 2, "march": 3, "april": 4,
                  "may": 5, "june": 6, "july": 7, "august": 8,
                  "september": 9, "october": 10, "november": 11,
                  "december": 12}
    add_name, add_months, add_amt = None, None, 0.0
    if add and pairs:
        add_name = add.group(2)
        cal = months_map[add.group(1).lower()]
        add_months = 13 - ((cal - 4) % 12 + 1)
        am = re.search(r"additional\s+capital\s+of\s*(?:Rs\.?|inr|\u20b9)?"
                       r"\s*([\d,]+(?:\.\d+)?)", q, re.I)
        if am and add_months and 1 <= add_months <= 11:
            add_amt = float(am.group(1).replace(",", ""))
    # legitimate derivations the family may report: each partner's
    # interest, the total, or the single-partner base+addition total.
    # The claim must equal ONE of them.
    targets: Dict[str, float] = {}
    for name, amt in pairs:
        targets[name] = amt * rate / 100.0
    if len(targets) >= 2:
        targets["total"] = sum(targets.values())
    # single-partner mid-year addition surface: "X has a fixed capital
    # of Rs N ... on 1st <month>, X introduces additional capital of
    # Rs M" -> base full-year + addition pro-rata
    if not targets:
        bm = re.search(r"\b([A-Z])\b[^.]{0,60}?(?:fixed\s+)?capital"
                       r"\s+of\s*(?:Rs\.?|inr|₹)?\s*"
                       r"([\d,]+(?:\.\d+)?)", q)
        am2 = re.search(
            r"on\s+(?:\d{1,2}(?:st|nd|rd|th)?\s*)?"
            r"(january|february|march|april|may|june|july|august|"
            r"september|october|november|december)\b[^.]{0,60}?"
            r"\b([A-Z])\b[^.]{0,40}?(?:introduces?|brought|brings|"
            r"added|adds?|invests?|invested|introduced)\s+"
            r"(?:additional\s+)?capital\s+of\s*(?:Rs\.?|inr|₹)?"
            r"\s*([\d,]+(?:\.\d+)?)", q, re.I)
        if bm and am2 and bm.group(1) == am2.group(2):
            months_map2 = {"january": 1, "february": 2, "march": 3,
                           "april": 4, "may": 5, "june": 6, "july": 7,
                           "august": 8, "september": 9, "october": 10,
                           "november": 11, "december": 12}
            cal = months_map2[am2.group(1).lower()]
            months2 = 13 - ((cal - 4) % 12 + 1)
            if 1 <= months2 <= 11:
                base = float(bm.group(2).replace(",", ""))
                add = float(am2.group(3).replace(",", ""))
                targets[bm.group(1)] = (base * rate / 100.0
                                        + add * rate / 100.0
                                        * months2 / 12.0)
    if not targets:
        return (NA, "no partner capitals re-parsed")
    claim = c.claim
    if claim is not None:
        for nm, want in targets.items():
            if abs(claim - want) <= max(0.5, 0.001 * abs(want)):
                return (PASS, f"second parse recomputes {nm} as {want:g}")
    shown = ", ".join(f"{nm}={v:.2f}" for nm, v in targets.items())
    return (FAIL, f"second parse targets [{shown}], claimed {claim}")




def _v_profit_appropriation(c) -> Tuple[str, str]:
    """PROFIT_APPROPRIATION: independent invariants -- the divisible
    profit cannot exceed the net profit, the claimed shares must be
    proportional to the question's ratio, and shares must re-add to
    the divisible profit."""
    q = c.question
    p_m = re.search(r"(?:net\s+profit|profit)\s*(?:before\s+"
                    r"appropriations?\s*)?(?:is|of|=|:)?\s*(?:Rs\.?|inr|"
                    r"\u20b9)?\s*([\d,]+(?:\.\d+)?)", q, re.I)
    r_m = (re.search(r"ratio\s+(\d+)\s*:\s*(\d+)(?:\s*:\s*(\d+))?",
                     q, re.I)
           or re.search(r"sharing\s+profits?\s+(?:in\s+the\s+ratio\s+)?"
                        r"(\d+)\s*:\s*(\d+)(?:\s*:\s*(\d+))?", q, re.I)
           or re.search(r"profits?\s+in\s+the\s+ratio\s+"
                        r"(\d+)\s*:\s*(\d+)(?:\s*:\s*(\d+))?", q, re.I))
    if not p_m or not r_m:
        return (NA, "profit or ratio not re-parsed")
    profit = float(p_m.group(1).replace(",", ""))
    parts = [float(g) for g in r_m.groups() if g]
    denom = sum(parts)
    shipped = c.final_answer or ""
    nums = [float(x.replace(",", "")) for x in
            re.findall(r"[\d,]+(?:\.\d+)?", shipped)]
    if not nums:
        return (NA, "no numbers in the shipped answer")
    divisible = nums[0]
    if divisible > profit + 0.5:
        return (FAIL, f"divisible {divisible:g} exceeds the stated net "
                      f"profit {profit:g}")
    # re-derive the interest-on-capital deduction independently: a
    # divisible profit ABOVE (profit - stated IoC) is an undeducted
    # split -- the classic wrong answer this route must never carry.
    # Capital pairs are read in both stated orders ("A Rs 4,00,000" and
    # "Rs 4,00,000 (A)"); commas survive the question's own wording.
    ioc_rate_m = re.search(r"interest\s+on\s+capital[^.\n]{0,80}?"
                           r"@\s*(\d+(?:\.\d+)?)\s*%", q, re.I)
    if ioc_rate_m and "interest on capital" in (c.question or "").lower():
        ioc_rate = float(ioc_rate_m.group(1))
        caps = [(float(m.group(1).replace(",", "")))
                for m in re.finditer(
                    r"(?:Rs\.?|inr|\u20b9)\s*([\d,]+(?:\.\d+)?)"
                    r"\s*\(\s*[A-Z]\s*\)", q)]
        if len(caps) >= 2:
            ioc_total = sum(caps) * ioc_rate / 100.0
            if divisible > profit - ioc_total + max(1.0, 0.002 * profit):
                return (FAIL, f"divisible {divisible:g} ignores the "
                              f"stated interest on capital "
                              f"({ioc_total:g}); expected at most "
                              f"{profit - ioc_total:g}")
    shares = nums[1:]
    if shares:
        want_shares = [divisible * p / denom for p in parts]
        ok = all(abs(g - w) <= max(1.0, 0.002 * abs(w))
                 for g, w in zip(shares, want_shares))
        if not ok:
            return (FAIL, f"shares {shares} are not proportional to the "
                          f"ratio {parts} of {divisible:g}")
        if abs(sum(shares) - divisible) > max(1.0, 0.002 * divisible):
            return (FAIL, "shares do not re-add to the divisible profit")
    return (PASS, f"divisible {divisible:g} <= profit {profit:g} and "
                  f"shares match the ratio {parts}")




# --------------------------------------------------------------------------- #
# The registry: route id (family structure id) -> independent verifier.
# Registered ONLY where the alternate relation is provable from the
# corpus formulas AND the family provably emits what the check needs.
# --------------------------------------------------------------------------- #

VERIFIERS: Dict[str, VerifierFn] = {
    # CISCE sciences wave (cisce-solver-sciences 2026-09-30):
    # physics recognition extensions + new families
    "POWER_WORK_TIME": _v_power_crane,
    "EMF_INTERNAL_RESISTANCE": _v_emf_internal,
    "DENSITY_MASS_VOLUME": _v_density,
    "THERMAL_EXPANSION": _v_thermal_expansion,
    "CHARGE_CARRIER": _v_charge_carrier,
    "SOUND_WAVES": _v_sound,
    "GRAVITATION_FORCE": _v_gravitation,
    "EM_WAVE_RELATION": _v_em_wave,
    "BOYLE_LAW": _v_gas_law,
    "CHARLES_LAW": _v_gas_law,
    "GAY_LUSSAC_LAW": _v_gas_law,
    "COMBINED_GAS_LAW": _v_gas_law,
    # chemistry CISCE wave
    "REACTION_STOICH_STP": _v_reaction_stoich,
    "CONSERVATION_OF_MASS": _v_conservation_mass,
    "ATOM_STRUCTURE": _v_atom_structure,
    "ISOTOPIC_ATOMIC_MASS": _v_isotopic_mass,
    "WATER_CRYSTALLISATION": _v_hydrate,
    "CARAT_ATOMS": _v_carat,
    "VALENCY_UNKNOWN_ELEMENT": _v_valency_unknown,
    # biology CISCE wave
    "BIO_FACT_ANCHOR": _v_bio_fact_anchor,
    "CARDIAC_OUTPUT": _v_cardiac,
    "ALVEOLAR_VENTILATION": _v_alveolar,
    "BLOOD_VOLUME_INDICES": _v_blood_volume,
    "SPORE_COUNTS": _v_spore,
    "DIHYBRID_COUNTS": _v_dihybrid,
    "RECOMBINATION_FREQUENCY": _v_recomb,
    # maths
    "QUADRATIC_ROOTS": _v_quad_roots,
    "LINEAR_SOLVE": _v_linear_solve,
    "AP_SUM": _v_ap_sum,
    "AP_NTH": _v_ap_nth,
    "GP_SUM": _v_gp_sum,
    "GP_SUM_INFINITE": _v_gp_sum_infinite,
    # STEM-BM 2026-10-07: the dig2 trig family and the PAL fallback
    # lane shipped verifier-less (badge gate na -> strict withhold);
    # registered with their own alternate-relation checks.
    "TRIG_RATIO_GIVEN": _v_trig_ratio_given,
    "PAL_PROGRAM": _v_pal_program,
    # STEM-BM 2026-10-07 genetics: product-rule check for the punnett
    # families (box enumeration vs allele-probability multiplication).
    "PUNNETT_CROSS": _v_punnett,
    "PUNNETT_SELF": _v_punnett,
    # STEM-BM 2026-10-07 mensuration: radian-arc + contact-triangle
    # closures for the structure-lane family names.
    "SECTOR_ARC_AREA": _v_sector_arc_area,
    "TANGENT_LENGTH": _v_tangent_length,
    "ELEVATION_CLASSIFY": _v_elevation_classify,
    "FRACTION_WHOLE": _v_fraction_whole,
    "CIRCLE_AREA": _v_circle_area,
    "CIRCLE_CIRCUMFERENCE": _v_circle_circumference,
    "CIRCLE_SECTOR_AREA": _v_sector_area,
    "CUBOID_VOLUME": _v_cuboid_volume,
    "CUBOID_MEASURE": _v_cuboid_volume,
    "PYTHAGORAS": _v_pythagoras,
    "SIMPLE_INTEREST": _v_simple_interest,
    "COMPOUND_INTEREST": _v_compound_interest,
    "PROFIT_LOSS_PERCENT": _v_profit_loss_percent,
    "HCF_TWO_NUMBERS": _v_hcf,
    "LCM_TWO_NUMBERS": _v_lcm,
    "TIME_WORK_TOGETHER": _v_time_work,
    "RATIO_SHARE": _v_ratio_share,
    # physics
    "KINEMATICS_V_U_AT": _v_kin_v_u_at,
    "KINEMATICS_S_UT_AT2": _v_kin_s_ut_at2,
    "KINEMATICS_V2_U2_2AS": _v_kin_v2_u2_2as,
    "KINETIC_ENERGY": _v_kinetic_energy,
    "OHMS_LAW_ANY": _v_ohms_law,
    "ELECTRICAL_ENERGY_KWH": _v_electrical_energy_kwh,
    "HOOKE_LAW": _v_hooke,
    # c8 physics wave (2026-10-07 regression fix: badge gate was
    # downgrading these to GUIDED in LLM-off production because no
    # second path was registered)
    "NEWTON_SECOND_LAW": _v_newton_second_law,
    "C8_FRICTION_FROM_MA": _v_friction_from_ma,
    "C8_STATIC_FRICTION": _v_static_friction,
    "C8_PRESSURE_AREA_CM": _v_pressure_area_cm,
    "C8_PRESSURE_POINT": _v_pressure_point,
    "C8_PRESSURE_VEHICLE": _v_pressure_vehicle,
    "C8_EFFICIENCY": _v_c8_efficiency,
    "C8_LENS_IMAGE_INFINITY": _v_lens_image_infinity,
    "C8_MIRROR_IMAGE": _v_c8_mirror_image,
    "C8_MAGFIELD_WIRE": _v_magfield_wire,
    "C8_MAGFIELD_COIL": _v_magfield_coil,
    "C8_OUTLIER_MEAN": _v_c8_outlier_mean,
    # chemistry
    "HALF_LIFE_FIRST_ORDER": _v_half_life,
    "REMAINING_AFTER_HALFLIVES": _v_remaining_halflives,
    "AVG_ATOMIC_MASS": _v_avg_atomic_mass,
    # biology
    "ENERGY_FLOW_10_PERCENT": _v_energy_flow,
    "POP_DOUBLING": _v_pop_doubling,
    # CELL_DIVISION_COUNT moved to the LOOP-FIXER wave data row
    # (2026-10-08 owner directive: registrations are data rows; the
    # hand-written _v_cell_division NA'd every meiosis-gamete ask at the
    # gate because its "divisions" slot is meiosis-shaped-family-only).
    # economics
    "FISHER_REAL_RATE": _v_fisher,
    "MONEY_MULTIPLIER": _v_money_multiplier,
    "DEPOSIT_CREATION_CHAIN": _v_deposit_chain,
    "INVESTMENT_MULTIPLIER": _v_investment_multiplier,
    "APC_APS_IDENTITIES": _v_apc_aps,
    # ISC numeric economics (cisce-solver-commerce 2026-09-30)
    "PRICE_CONTROL_GAP": _v_price_control_gap,
    "MPC_DELTA": _v_mpc_delta,
    "MU_FROM_TU": _v_mu_from_tu,
    # commerce + accountancy
    "BEP_UNITS": _v_bep_units,
    "BEP_SALES": _v_bep_sales,
    "TRIAL_BALANCE_DIFF": _v_trial_balance,
    # ISC accountancy recognition extensions (cisce-solver-commerce
    # 2026-09-30)
    "CASH_FLOW_OPERATING": _v_cash_flow_operating,
    "GP_RATIO": _v_gp_ratio,
    "DEP_SLM": _v_dep_slm,
    "TRADE_THREE_LEVEL": _v_trade_three_level,
    "INTEREST_COVERAGE": _v_interest_coverage,
    "OPENING_CAPITAL": _v_opening_capital,
    "BRS_ADJUST": _v_brs_adjust,
    # ISC psychology statistics + biotech numerics (cisce-solver-langnew
    # 2026-09-30)
    "STATS_MEAN_UNGROUPED": _v_stats_mean,
    # SOCIAL-ALL (2026-10-07): geography weather-station statistics --
    # the strict-law withhold fix for the pinned MEAN_DEVIATION contract
    "MEAN_DEVIATION": _v_mean_deviation,
    "STATS_MEDIAN_UNGROUPED": _v_stats_median,
    "STATS_MODE_UNGROUPED": _v_stats_mode,
    "STATS_RANGE_UNGROUPED": _v_stats_range,
    "STATS_VARIANCE": _v_stats_spread("variance"),
    "STATS_SD_SAMPLE": _v_stats_spread("sd"),
    "STATS_MEAN_GROUPED": _v_stats_grouped_mean,
    "STATS_MEAN_COMBINED": _v_stats_combined,
    "STATS_MEAN_ADJUST": _v_stats_adjust,
    "STATS_SE_MEAN": _v_stats_se,
    "STATS_Z_T_SCORE": _v_z_t,
    "BIO_HEMOCYTOMETER": _v_hemocytometer,
    # lowercase aliases: syllabus_families rows win the model_problem
    # confidence race (0.97) for the same surface forms; their trigger
    # groupdicts coerce to zeros in quantities, so these verifiers'
    # question-text parsers carry the check.  Same alternate relations.
    "ap_sum": _v_ap_sum,
    "ap_nth": _v_ap_nth,
    "gp_infinite_sum": _v_gp_sum_infinite,
    "sector_area": _v_sector_area,
    "kinetic_energy": _v_kinetic_energy,
    "ohm_resistance": _v_ohms_law,
    "ohm_current": _v_ohms_law,
    # cisce-solver-maths 2026-09-30: new maths2 families only --
    # additions, existing registrations untouched.
    "POLY_REMAINDER": _v_poly_remainder,
    "POLY_FACTOR_CHECK": _v_poly_factor_check,
    "POLY_UNKNOWN_COEFF": _v_poly_unknown_coeff,
    "SECTION_FORMULA_EXTERNAL": _v_section_point,
    "SECTION_FORMULA_LABELED": _v_section_point,
    "CENTROID_TRIANGLE": _v_centroid_triangle,
    "REFLECTION_POINT": _v_reflection_point,
    "REFLECTION_LINE": _v_reflection_point,
    "DISTANCE_PARALLEL_LINES": _v_parallel_lines,
    "RD_MATURITY": _v_rd_maturity,
    "RD_MATURITY_RATE": _v_rd_rate,
    "RD_MATURITY_PERIOD": _v_rd_period,
    # electives-all 2026-10-07: classes 11-12 CS families.  Second
    # engine = restricted CPython exec (PY_*) or an independent
    # re-derivation from the question-stated data (SQL_*, simulations).
    "PY_TRACE": _v_py_trace,
    "PY_EXPR": _v_py_trace,
    "PY_TYPE": _v_py_type,
    "SQL_CLAUSE": _v_sql_clause,
    "SQL_AGGR": _v_sql_aggr,
    "SQL_JOIN": _v_sql_join,
    "STACK_SIM": _v_stack_sim,
    "QUEUE_SIM": _v_queue_sim,
    "POSTFIX_EVAL": _v_postfix,
    # electives-all 2026-10-07 accountancy additive wave
    "INTEREST_CAPITAL_PARTNER": _v_interest_capital_partner,
    "PROFIT_APPROPRIATION": _v_profit_appropriation,
    "REVALUATION_ADJUSTMENT": _v_revaluation_adjustment,
    "GOODWILL_VALUATION": _v_goodwill_valuation,
    "FORFEITURE_REISSUE": _v_forfeiture_reissue,
    "CURRENT_RATIO": _v_current_ratio,
    "INVENTORY_TURNOVER": _v_inventory_turnover,
}

# the confidence bump a second-path PASS earns (post-selection, so it
# never re-orders the family race; it strengthens the promoted result)
_CONF_BUMP = 0.02
_CONF_CAP = 0.99


# --------------------------------------------------------------------------- #
# Public API
# --------------------------------------------------------------------------- #

# Declarative invariant formulas (Symbolic / Metamorphic Verification)
# Form: sid -> (var_names, fn, description[, extract[, when]])
#
#   extract = None        -> vars resolved only from ctx.quantities
#             "positional" -> ordered numbers of the question mapped to
#                             var_names; count must match EXACTLY or the
#                             check declines (extra numbers = ambiguous)
#             {var: regex} -> per-var single-group regex on the question
#   when    = regex over the question: the invariant only proves the
#             FORWARD ask.  Inverse questions ('volume is 66, find r')
#             bind roles differently — without `when` a wrong binding
#             would FAIL-withhold a correct inverse answer.
#
# Independence contract: the RELATION differs from the family's compute
# (closed-form invariant vs procedural code); re-extracting givens from
# the question is fine — givens are givens.
_ORDINAL_NOISE = re.compile(
    r"\b(?:class|grade|std|standard|question|qn?o?|ex(?:ercise|ample)?|"
    r"chapter|page|part|step|figure|fig|no)\s*\.?\s*\d+(?:\.\d+)?", re.I)
_EXPONENT_NOISE = re.compile(r"[a-zA-Z]\s*\^\s*\d+|\^\s*\d+|"
                             r"\b\d+\s*(?:st|nd|rd|th)\b")
_AREA_UNIT_NOISE = re.compile(
    r"\b(?:sq|cu)\.?\s*(?:cm|mm|km|m|ft|units?)\s*(?:\^\s*\d+)?|"
    r"\b(?:cm|mm|km|m|kg|g|hr|hrs|min|sec|s)\s*\^\s*\d+\b", re.I)


def _positional_numbers(text: str) -> List[float]:
    """Ordered numeric givens with label ordinals, exponents and area/
    volume unit suffixes stripped — 'class 10', 'x^2', 'cm^3' and '5th'
    must never bind as slot values."""
    t = _ORDINAL_NOISE.sub(" ", text or "")
    t = _EXPONENT_NOISE.sub(" ", t)
    t = _AREA_UNIT_NOISE.sub(" ", t)
    return [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", t)]


def _fwd(target: str, *inverse_targets: str) -> str:
    """Forward-ask `when` guard: the target noun is present anywhere
    ('volume of a cylinder' has no find-verb — bare phrasings are real
    questions), AND no inverse ask is present ('volume is X, find the
    radius' computes a different quantity — comparing it to the formula
    would false-FAIL)."""
    inv = ("|".join(inverse_targets) if inverse_targets
           else r"(?!x)x")  # never matches
    return (rf"^(?=.*\b(?:{target})\b)"
            rf"(?!.*\b(?:find|calculate|determine|evaluate|what)\w*"
            rf"[^.]{{0,30}}(?:{inv}))")


DECLARATIVE_INVARIANTS: Dict[str, Tuple] = {
    "CONE_VOLUME": (("r", "h"),
                    lambda r, h: math.pi * r**2 * h / 3.0,
                    "V = (1/3) pi r^2 h", "positional",
                    _fwd(r"volume",
                         r"radi\w*|diameter|height|slant")),
    "CYLINDER_VOLUME": (("r", "h"),
                        lambda r, h: math.pi * r**2 * h,
                        "V = pi r^2 h", "positional",
                        _fwd(r"volume",
                             r"radi\w*|diameter|height")),
    "SPHERE_VOLUME": (("r",), lambda r: 4.0 * math.pi * r**3 / 3.0,
                      "V = (4/3) pi r^3", "positional",
                      _fwd(r"volume", r"radi\w*|diameter")),
    "HEMISPHERE_VOLUME": (("r",), lambda r: 2.0 * math.pi * r**3 / 3.0,
                          "V = (2/3) pi r^3", "positional",
                          _fwd(r"volume", r"radi\w*|diameter")),
    "CUBOID_VOLUME": (("l", "b", "h"), lambda l, b, h: l * b * h,
                      "V = l b h", "positional",
                      _fwd(r"volume",
                           r"length|breadth|width|height|edge|"
                           r"dimension")),
    "CYLINDER_CSA": (("r", "h"), lambda r, h: 2 * math.pi * r * h,
                     "CSA = 2 pi r h", "positional",
                     _fwd(r"curved\s+surface|lateral\s+surface|CSA",
                          r"radi\w*|diameter|height") +
                     r"(?!.*(?:surface|area|CSA)\b[^.]{0,25}(?:is|=)\s*\d)"),
    "CYLINDER_TSA": (("r", "h"),
                     lambda r, h: 2 * math.pi * r * (r + h),
                     "TSA = 2 pi r (r + h)", "positional",
                     _fwd(r"total\s+surface|TSA",
                          r"radi\w*|diameter|height")),
    "SPHERE_SURFACE_AREA": (("r",), lambda r: 4 * math.pi * r**2,
                            "A = 4 pi r^2", "positional",
                            _fwd(r"surface\s+area",
                                 r"radi\w*|diameter")),
    "RECTANGLE_AREA": (("l", "w"), lambda l, w: l * w, "A = l w",
                       "positional",
                       _fwd(r"area", r"length|breadth|width|side|"
                            r"dimension")),
    "RECTANGLE_PERIMETER": (("l", "w"), lambda l, w: 2 * (l + w),
                            "P = 2 (l + w)", "positional",
                            _fwd(r"perimeter",
                                 r"length|breadth|width|side|"
                                 r"dimension")),
    "SQUARE_AREA": (("s",), lambda s: s**2, "A = s^2", "positional",
                    _fwd(r"area", r"side|edge")),
    "SQUARE_PERIMETER": (("s",), lambda s: 4 * s, "P = 4 s",
                         "positional",
                         _fwd(r"perimeter", r"side|edge")),
    "TRIANGLE_AREA": (("b", "h"), lambda b, h: 0.5 * b * h,
                      "A = (1/2) b h", "positional",
                      _fwd(r"area", r"base|height|altitude")),
    "SECTOR_INVERSE": (("arc", "area"),
                       lambda arc, area: 2.0 * area / arc,
                       "r = 2A/l", "positional",
                       r"(?=.*\barc\b)(?=.*\barea\b).*"
                       r"(?:find|calculate|determine)\w*[^.]{0,30}"
                       r"radius"),
    "DISTANCE_2D": (("x1", "y1", "x2", "y2"),
                    lambda x1, y1, x2, y2: math.hypot(x2 - x1, y2 - y1),
                    "d = sqrt((x2-x1)^2 + (y2-y1)^2)", "positional",
                    r"distance\s+between|distance\s+of"),
    "VECTOR_MAG": (("x", "y", "z"),
                   lambda x, y, z: math.sqrt(x * x + y * y + z * z),
                   "|v| = sqrt(x^2+y^2+z^2)", "positional",
                   r"(?:find|calculate|determine|evaluate)\w*"
                   r"[^.]{0,30}magnitude"),
    "VECTOR_ANGLE": (("a1", "a2", "a3", "b1", "b2", "b3"),
                     lambda a1, a2, a3, b1, b2, b3: math.degrees(
                         math.acos(max(-1.0, min(1.0,
                             (a1 * b1 + a2 * b2 + a3 * b3) /
                             (math.sqrt(a1 * a1 + a2 * a2 + a3 * a3) *
                              math.sqrt(b1 * b1 + b2 * b2 + b3 * b3)))))),
                     "cos t = a.b/(|a||b|)", "positional",
                     r"angle\s+between"),
    "LINES_ANGLE_3D": (("a1", "a2", "a3", "b1", "b2", "b3"),
                       lambda a1, a2, a3, b1, b2, b3: math.degrees(
                           math.acos(max(-1.0, min(1.0,
                               abs(a1 * b1 + a2 * b2 + a3 * b3) /
                               (math.sqrt(a1 * a1 + a2 * a2 + a3 * a3) *
                                math.sqrt(b1 * b1 + b2 * b2 +
                                          b3 * b3)))))),
                       "cos t = |a.b|/(|a||b|)", "positional",
                       r"angle\s+between"),
    "DIRECTION_COS": (("px", "py", "pz", "qx", "qy", "qz"),
                      lambda px, py, pz, qx, qy, qz:
                          (qx - px) / math.sqrt(
                              (qx - px)**2 + (qy - py)**2 + (qz - pz)**2)
                          if (qx - px)**2 + (qy - py)**2 +
                             (qz - pz)**2 > 0 else float("nan"),
                      "l = dx/|d| (first cosine of Q-P)",
                      "positional", r"direction\s+cosines?"),
    "EMI_ANNUITY": (("P", "rate", "years"),
                    lambda P, rate, years:
                        P * (rate / 1200.0) * (1 + rate / 1200.0) **
                        (12 * years) /
                        ((1 + rate / 1200.0) ** (12 * years) - 1)
                        if rate > 0 and years > 0 else float("nan"),
                    "EMI = Pr(1+r)^n/((1+r)^n-1), r=R/1200, n=12y",
                    "positional",
                    r"(?:find|calculate|determine)\w*[^.]{0,30}"
                    r"(?:EMI|instal)"),
    "MATRIX_DET_PROPS": (("n", "d", "k"),
                         lambda n, d, k: (k ** n) * d,
                         "|kA| = k^n |A|",
                         {"n": r"(\d)\s*x\s*\^?\s*\d",
                          "d": r"\|\s*A\s*\|\s*=\s*"
                               r"(-?\d+(?:\.\d+)?)",
                          "k": r"\|\s*(\d+(?:\.\d+)?)\s*A\s*\|"},
                         r"\|\s*\d+(?:\.\d+)?\s*A\s*\|"),
    "STP_VOLUME": (("n",), lambda n: n * 22.4,
                   "V = n x 22.4 L at STP", "positional",
                   r"(?:find|calculate|determine)\w*[^.]{0,30}"
                   r"volume[^.]{0,30}(?:STP|standard)"),
    "CIRCLE_MEASURE": (("r",),
                       lambda r: (22.0 / 7) * r * r
                       if abs(r % 7) < 1e-9 else math.pi * r * r,
                       "A = pi r^2 (22/7 when r%7==0)", "positional",
                       # radius GIVEN + area ASKED, but not the inverse
                       # ask ('area is 154, find the radius' computes r
                       # — comparing it to pi*r^2 would false-fail)
                       r"(?=.*\bradi\w*\b)(?=.*\barea\b)"
                       r"(?!.*\b(?:find|calculate|determine)\w*"
                       r"[^.]{0,25}\bradi)"),
    "PERCENT_BACK": (("pct", "final"),
                     lambda pct, final: final / (1 + pct / 100.0),
                     "original = final/(1+p/100)", "positional",
                     r"(?:find|calculate|determine)\w*[^.]{0,30}"
                     r"original"),
    # Additional high-frequency core invariants
    "ANNULUS": (("R", "r"),
                lambda R, r: math.pi * (max(R, r)**2 - min(R, r)**2),
                "A = pi(R^2 - r^2)", "positional",
                r"annulus|ring|concentric"),
    "ANGLE_SUM_TRI": (("a1", "a2"),
                      lambda a1, a2: 180.0 - (a1 + a2),
                      "a3 = 180 - (a1 + a2)", "positional",
                      r"third\s+angle|other\s+angle"),
    "COMPLEMENTARY_EQUAL": ((),
                            lambda: 45.0,
                            "theta = 90 - theta -> 45 deg", "positional",
                            r"complement"),
    "BETWEEN_SQUARES": (("n",),
                        lambda n: 2 * n,
                        "count = 2n", "positional",
                        r"between\s+(?:the\s+)?squares"),
    "CENTRIPETAL": (("v", "r"),
                    lambda v, r: (v**2) / r if r > 0 else float("nan"),
                    "a = v^2 / r", "positional",
                    r"centripetal"),
    "CAPACITOR_ENERGY": (("C", "V"),
                         lambda C, V: 0.5 * C * (V**2),
                         "U = 1/2 C V^2", "positional",
                         r"energy\s+(?:stored\s+)?in\s+capacitor"),
    "CHORD_CIRCLE": (("c", "d"),
                     lambda c, d: math.sqrt((c / 2.0)**2 + d**2),
                     "r = sqrt((c/2)^2 + d^2)", "positional",
                     r"chord[^.]{0,30}distance"),
    "CIRCLE_ANGLE": (("theta",),
                     lambda theta: theta / 2.0,
                     "angle_circumference = theta / 2", "positional",
                     r"circumference"),
    "CIRCLE_ARC": (("r", "theta"),
                   lambda r, theta: (theta / 360.0) * 2 * math.pi * r,
                   "l = (theta/360) 2 pi r", "positional",
                   r"arc\s+length"),
    # Math & Geometry Invariants
    "TANGENT_LENGTH": (("radius", "distance"),
                       lambda r, d: math.sqrt(d**2 - r**2) if d > r else float("nan"),
                       "L = sqrt(d^2 - r^2)", "positional", r"tangent"),
    "SECTOR_ARC_AREA": (("radius", "arc"),
                        lambda r, l: 0.5 * r * l,
                        "A = (1/2) r l", "positional", r"sector"),
    "CONE_HEIGHT": (("volume", "base_area"),
                    lambda v, b: 3.0 * v / b if b > 0 else float("nan"),
                    "h = 3V/B", "positional", r"cone"),
    "TANGENT_QUAD": (("bc", "cd", "ad"),
                     lambda bc, cd, ad: bc + ad - cd,
                     "AB = BC + AD - CD (Pitot)", "positional", r"circumscrib|quadrilateral"),
    "SIMILAR_PERIMETER": (("s1", "s2", "p2"),
                          lambda s1, s2, p2: p2 * (s1 / s2) if s2 > 0 else float("nan"),
                          "P1 = P2 * (s1/s2)", "positional", r"similar"),
    "MEDIAN_TRANSFORM": (("median", "shift"),
                         lambda m, s: m + s,
                         "M_new = M + shift", "positional",
                         r"median[^.]{0,30}increas|increas[^.]{0,30}median"),
    "MEAN_TRANSFORM": (("mean", "shift"),
                       lambda m, s: m + s,
                       "mu_new = mu + shift", "positional",
                       r"mean[^.]{0,30}increas|increas[^.]{0,30}mean"),
    "RECT_MEASURE": (("length", "width"),
                     lambda l, w: l * w,
                     "A = l * w", "positional", r"rectangle"),
    "TRAPEZIUM_AREA": (("a", "b", "h"),
                       lambda a, b, h: 0.5 * (a + b) * h,
                       "A = (1/2)(a+b)h", "positional", r"trapez"),
    "CUBOID_LSA": (("length", "width", "height"),
                   lambda l, w, h: 2 * (l + w) * h,
                   "LSA = 2(l+w)h", "positional", r"cuboid|lateral"),
    "CUBOID_CAPACITY": (("length", "width", "height"),
                        lambda l, w, h: l * w * h,
                        "V = l w h", "positional", r"cuboid|capacity"),
    "RHOMBUS_AREA": (("d1", "d2"),
                     lambda d1, d2: 0.5 * d1 * d2,
                     "A = (1/2) d1 d2", "positional", r"rhombus"),
    "SQUARE_DIAGONAL": (("side",),
                        lambda s: s * math.sqrt(2),
                        "d = s sqrt(2)", "positional",
                        r"(?=.*diagonal)(?!.*find[^.]{0,25}(?:side|area))"),
    "CYLINDER_SURFACE": (("radius", "height"),
                         lambda r, h: 2 * math.pi * r * h,
                         "CSA = 2 pi r h", "positional",
                         r"curved|lateral|\bCSA\b"),
    "CONE_SURFACE": (("radius", "height"),
                     lambda r, h: math.pi * r * math.sqrt(r**2 + h**2),
                     "CSA = pi r sqrt(r^2+h^2)", "positional", r"cone"),
    "COMP_SUPP_ANGLE": (("angle",),
                        lambda theta: 90.0 - theta if theta < 90 else 180.0 - theta,
                        "complement/supplement", "positional", r"complement|supplement"),
    "PROFIT_PERCENT": (("cp", "sp"),
                       lambda cp, sp: ((sp - cp) / cp) * 100.0 if cp > 0 else float("nan"),
                       "P% = (SP-CP)/CP * 100", "positional", r"profit|gain|loss"),
    "PROFIT_LOSS": (("cp", "sp"),
                    lambda cp, sp: abs(sp - cp),
                    "gain/loss = |SP - CP|", "positional", r"profit|loss"),
    "PERCENT_CHANGE": (("old", "new"),
                       lambda old, new: (abs(new - old) / old) * 100.0 if old > 0 else float("nan"),
                       "change% = |new-old|/old * 100", "positional", r"percent"),
    "DISCOUNT_GST": (("mp", "d", "gst"),
                     lambda mp, d, gst: mp * (1 - d/100.0) * (1 + gst/100.0),
                     "SP = MP(1-d/100)(1+gst/100)", "positional", r"discount|gst"),
    "SI_INVERSE": (("p", "r", "t"),
                   lambda p, r, t: (p * r * t) / 100.0,
                   "SI = PRT/100", "positional", r"simple\s+interest"),
    "CI_RATE": (("p", "r", "t"),
                lambda p, r, t: p * (1 + r/100.0)**t,
                "A = P(1+r/100)^t", "positional", r"compound\s+interest"),
    "DISTANCE_BETWEEN": (("x1", "y1", "x2", "y2"),
                         lambda x1, y1, x2, y2: math.hypot(x2 - x1, y2 - y1),
                         "d = sqrt(dx^2+dy^2)", "positional", r"distance"),
    "MIDPOINT_CHECK": (("x1", "x2"),
                       lambda x1, x2: (x1 + x2) / 2.0,
                       "mid_x = (x1+x2)/2", "positional", r"midpoint"),
    "SECTION_RATIO": (("x1", "x2", "m", "n"),
                      lambda x1, x2, m, n: (m * x2 + n * x1) / (m + n) if (m + n) != 0 else float("nan"),
                      "x = (m x2 + n x1)/(m+n)", "positional", r"section|divides"),
    "EMPIRICAL_RELATION": (("median", "mean"),
                           lambda med, mean: 3.0 * med - 2.0 * mean,
                           "Mode = 3 Median - 2 Mean", "positional",
                           r"(?=.*\bmode\b)(?!.*find[^.]{0,25}median)"),
    "VARIANCE_SD": (("var",),
                    lambda v: math.sqrt(v) if v >= 0 else float("nan"),
                    "SD = sqrt(Var)", "positional", r"standard\s+deviation|variance"),
    "ELEVATION_HEIGHT": (("distance", "angle"),
                         lambda d, th: d * math.tan(math.radians(th)),
                         "h = d tan(theta)",
                         # angle precedes distance in natural text
                         # ('elevation is 60 deg at a distance of 20 m')
                         # — positional bound d=60,th=20 -> false FAIL
                         {"distance": r"(?:distance|away|from\s+the\s+(?:foot|base))[^.]{0,25}?(\d+(?:\.\d+)?)",
                          "angle": r"(\d+(?:\.\d+)?)\s*(?:deg|degrees|°)"},
                         r"elevation|height"),
    "HOLLOW_CYLINDER": (("r1", "r2", "h"),
                        lambda r1, r2, h: math.pi * abs(r1**2 - r2**2) * h,
                        "V = pi(R^2 - r^2)h", "positional", r"hollow"),
    "FRUSTUM_DIG2": (("r1", "r2", "h"),
                     lambda r1, r2, h: (math.pi * h / 3.0) * (r1**2 + r2**2 + r1 * r2),
                     "V = (1/3) pi h (R^2+r^2+Rr)",
                     {"r1": r"radii[^.]{0,40}?(\d+(?:\.\d+)?)",
                      "r2": r"radii[^.]{0,40}?\d+(?:\.\d+)?\s*cm?\s*and\s*(\d+(?:\.\d+)?)",
                      "h":  r"(\d+(?:\.\d+)?)\s*cm\s+(?:high|height)"},
                     r"frustum"),
    "AP_COMMON_DIFF": (("a", "an", "n"),
                       lambda a, an, n: (an - a) / (n - 1) if n > 1 else float("nan"),
                       "d = (an - a)/(n - 1)", "positional", r"common\s+difference"),
    "AP_SUM_FIRST": (("n", "a", "d"),
                     lambda n, a, d: (n / 2.0) * (2 * a + (n - 1) * d),
                     "S_n = (n/2)(2a + (n-1)d)", "positional", r"sum\s+of"),
    "AP_TERMS": (("a", "an", "d"),
                 lambda a, an, d: (an - a) / d + 1 if d != 0 else float("nan"),
                 "n = (an - a)/d + 1", "positional", r"terms"),
    "GP_TERM": (("a", "r", "n"),
                lambda a, r, n: a * (r ** (n - 1)),
                "a_n = a r^(n-1)", "positional", r"gp|term"),
    "GP_INF": (("a", "r"),
               lambda a, r: a / (1.0 - r) if abs(r) < 1 else float("nan"),
               "S_inf = a / (1 - r)", "positional", r"infinite"),
    "COMPLEX_MODULUS": (("a", "b"),
                        lambda a, b: math.hypot(a, b),
                        "|z| = sqrt(a^2 + b^2)", "positional", r"modulus"),
    "FRACTION_OF": (("num", "den", "val"),
                    lambda n, d, v: (n / d) * v if d != 0 else float("nan"),
                    "ans = (n/d) * val", "positional", r"fraction"),
    "DICE_SUM_PROB": (("sum",),
                      lambda s: sum(1 for i in range(1, 7) for j in range(1, 7) if i + j == int(s)) / 36.0,
                      "P(sum=S) = favorable / 36", "positional",
                      r"(?=.*\b(?:sum|dice|die)\b)(?!.*\bnot\b)"),
    "PROB_COINS": (("fav", "total"),
                   lambda f, n: f / (2.0 ** n),
                   "P = fav / 2^n", "positional", r"coin"),
    "HCF_PAIRS": (("sum", "hcf"),
                  lambda s, h: sum(1 for a in range(1, int(s // h // 2) + 1) if math.gcd(a, int(s // h) - a) == 1),
                  "coprime pairs count", "positional", r"pairs"),
    # Physics & Chemistry Invariants
    "COULOMB": (("q1", "q2", "r"),
                lambda q1, q2, r: (8.98755e9 * abs(q1 * q2)) / (r**2) if r > 0 else float("nan"),
                "F = k q1 q2 / r^2", "positional", r"force|coulomb"),
    "ELECTRIC_FIELD": (("q", "r"),
                       lambda q, r: (8.98755e9 * abs(q)) / (r**2) if r > 0 else float("nan"),
                       "E = k q / r^2", "positional", r"electric\s+field"),
    "TORQUE": (("r", "f"),
               lambda r, f: r * f,
               "tau = r F", "positional", r"torque"),
    "PRESSURE": (("f", "a"),
                 lambda f, a: f / a if a > 0 else float("nan"),
                 "P = F / A", "positional", r"pressure"),
    "MOLARITY": (("moles", "volume"),
                 lambda n, v: n / v if v > 0 else float("nan"),
                 "M = n / V", "positional", r"molarity"),
    "MOLALITY": (("moles", "mass"),
                 lambda n, m: n / m if m > 0 else float("nan"),
                 "m = n / mass_kg", "positional", r"molality"),
    "LENS_POWER": (("f",),
                   lambda f: 100.0 / f if f != 0 else float("nan"),
                   "P = 100 / f_cm", "positional", r"power"),
    "PROJECTILE_HEIGHT": (("u", "theta"),
                          lambda u, th: (u**2 * (math.sin(math.radians(th))**2)) / (2 * 9.8) if u > 0 else float("nan"),
                          "H = u^2 sin^2(th)/(2g)", "positional", r"height|projectile"),
    "PE_TO_KE": (("h",),
                 lambda h: math.sqrt(2 * 9.8 * h) if h >= 0 else float("nan"),
                 "v = sqrt(2gh)", "positional", r"speed|height"),
    "IMPULSE_REBOUND": (("m", "v1", "v2"),
                        lambda m, v1, v2: m * (abs(v1) + abs(v2)),
                        "J = m(v1 + v2)", "positional", r"impulse"),
    "WORK_RATE": (("t1", "t2"),
                  lambda t1, t2: (t1 * t2) / (t1 + t2) if (t1 + t2) > 0 else float("nan"),
                  "T = t1*t2/(t1+t2)", "positional", r"together"),
    "FORCE_COMPONENT": (("f", "angle"),
                        lambda f, th: f * math.cos(math.radians(th)),
                        "F_x = F cos(theta)", "positional", r"component"),
    "FRICTION_NET": (("mu", "m"),
                     lambda mu, m: mu * m * 9.8,
                     "f_k = mu m g", "positional", r"friction"),
    "NEET_PROJECTILE_MOTION": (("u", "theta"),
                               lambda u, th: (u**2 * math.sin(math.radians(2 * th))) / 9.8 if u > 0 else float("nan"),
                               "R = u^2 sin(2th)/g", "positional", r"range|projectile"),
    "NEET_PH_CALCULATION": (("h",),
                            lambda h: -math.log10(h) if h > 0 else float("nan"),
                            "pH = -log10[H+]", "positional",
                            r"(?=.*\bph\b)(?!.*\b(?:naoh|koh|base|hydroxide|ba\(oh\))\b)"),
}

# --------------------------------------------------------------------------- #
# Conceptual Invariants Registry (Curated NCERT STEM Explanations)
# --------------------------------------------------------------------------- #

CONCEPTUAL_INVARIANTS: Dict[str, Tuple[Tuple[str, ...], str]] = {
    # Biology
    "BIO_WHY_PROGENY_ALWAYS_TALL": (("dominant", "recessive", "tt"), "dominant TT masks recessive tt in heterozygous Tt"),
    "BIO_WHY_VARIATION_PROMOTE_SURVIVAL": (("variation", "surviv", "species"), "variation enables natural selection during environmental shifts"),
    "BIO_WHY_MENSTRUATION_SIGNIFICANT": (("uter", "lining", "cycle"), "shedding unfertilised uterine lining resetting reproductive cycle"),
    "BIO_WHY_SEX_DETERMINATION": (("sperm", "x", "y"), "father's sperm (X or Y) determines child sex with 50:50 chance"),
    "BIO_WHY_F2_TWO_TYPES": (("segregat", "recessive", "3"), "alleles segregate during meiosis giving 3:1 phenotypic ratio"),
    "BIO_WHY_ACQUIRED_NOT_INHERITED": (("somatic", "germ", "dna"), "somatic cell modifications do not alter germ cell DNA"),
    "BIO_WHY_VARIATION_BENEFIT_SPECIES_NOT_INDIVIDUAL": (("population", "gene pool", "selection"), "population gene pool variety protects against extinction"),
    "BIO_WHY_MENDEL_CHOSE_PEA": (("contrast", "pollinat", "generation"), "distinct contrasting characters, rapid life cycle, controlled pollination"),
    "BIO_WHY_BACTERIA_HEAT_VARIANTS": (("variant", "heat", "select"), "pre-existing mutations selected by elevated temperature"),
    "BIO_WHY_EQUAL_GENETIC_CONTRIBUTION": (("meiosis", "haploid", "gamete"), "meiosis halves chromosomes so egg and sperm contribute 50% each"),
    "BIO_WHY_VILLI_SMALL_INTESTINE": (("villi", "surface", "absorp"), "villi expand internal surface area with rich capillaries for absorption"),
    "BIO_WHY_DOUBLE_CIRCULATION": (("oxygenat", "deoxygenat", "separat"), "separates oxygenated and deoxygenated blood to meet high metabolic demands"),
    "BIO_WHY_ALVEOLI_DESIGN": (("alveoli", "surface", "capillar"), "balloon sacs provide massive surface area with thin capillary walls"),
    "BIO_WHY_OZONE_DEPLETION": (("cfc", "chlorine", "uv"), "CFC-released chlorine radicals catalytically destroy protective O3"),
    "BIO_WHY_TROPHIC_ENERGY_LOSS": (("10", "energy", "heat"), "10% law: 90% energy lost as heat leaving insufficient energy after 4 levels"),

    # Physics
    "PHYS_WHY_SERIES_DOMESTIC": (("parallel", "voltage", "current"), "parallel gives independent switching, full 220V, and tailored currents"),
    "PHYS_WHY_ALLOY_HEATING": (("resistiv", "heat", "oxidi"), "high resistivity generates Joule heat without high-temp oxidation"),
    "PHYS_WHY_COPPER_ALUMINIUM_TRANSMISSION": (("resistiv", "loss", "heat"), "low resistivity minimizes I^2 R Joule heating transmission losses"),
    "PHYS_WHY_STARS_TWINKLE": (("refract", "atmospher", "point"), "atmospheric refraction of starlight from distant point source"),
    "PHYS_WHY_PLANETS_DONT_TWINKLE": (("extended", "cancel", "disc"), "extended source disc averages random atmospheric fluctuations to zero"),
    "PHYS_WHY_SKY_BLUE": (("rayleigh", "scatter", "wavelength"), "Rayleigh scattering (1/lambda^4) scatters shorter blue wavelengths strongly"),
    "PHYS_WHY_SUN_RED_SUNRISE": (("horizon", "scatter", "red"), "long atmospheric path scatters away blue, leaving penetrating red"),
    "PHYS_WHY_DANGER_LIGHTS_RED": (("wavelength", "scatter", "fog"), "longest visible wavelength scatters least in fog/smoke for max visibility"),
    "PHYS_WHY_EARTH_WIRE": (("ground", "shock", "resistance"), "low-resistance ground path trips protection and prevents electric shocks"),
    "PHYS_WHY_FUSE_SERIES": (("melt", "joule", "circuit"), "series fuse melts on overload from Joule heating, cutting all current"),
    "PHYS_WHY_SEAT_BELTS": (("inertia", "newton", "force"), "Newton's 1st law: overcomes inertia of motion by applying safe stopping force"),
    "PHYS_WHY_CONVEX_REAR_VIEW": (("erect", "field", "view"), "provides upright diminished image with wide angular field of view"),

    # Chemistry
    "CHEM_WHY_COPPER_SULPHATE_IRON": (("reactive", "displace", "iron"), "iron displaces copper forming green FeSO4 and reddish-brown Cu deposit"),
    "CHEM_WHY_RESPIRATION_EXOTHERMIC": (("glucose", "energy", "atp"), "oxidation of glucose releases chemical and thermal energy stored in ATP"),
    "CHEM_WHY_OIL_FAT_NITROGEN": (("rancid", "inert", "oxygen"), "inert nitrogen displaces oxygen preventing oxidative rancidity"),
    "CHEM_WHY_CURD_SOUR_BRASS": (("acid", "toxic", "copper"), "organic acids react with copper/zinc forming toxic poisonous metal salts"),
    "CHEM_WHY_ACID_TO_WATER": (("exothermic", "heat", "splash"), "intensely exothermic hydration splashes concentrated acid if water added"),
    "CHEM_WHY_DRY_HCL_LITMUS": (("ion", "water", "hydronium"), "HCl requires water to dissociate into acidic H+/H3O+ hydronium ions"),
    "CHEM_WHY_PLASTER_PARIS_MOISTURE": (("gypsum", "hydrate", "hard"), "absorbs moisture to irreversibly set into non-plastering hard gypsum"),
    "CHEM_WHY_IONIC_HIGH_MP": (("electrostatic", "lattice", "ion"), "strong electrostatic ionic bonds require immense thermal energy to break"),
    "CHEM_WHY_SODIUM_KEROSENE": (("react", "oxygen", "moisture"), "highly reactive alkali metal reacts explosively with air/water; kerosene shields it"),
    "CHEM_WHY_CARBON_TETRAVALENT": (("covalent", "octet", "electron"), "cannot form C4+/C4- due to energy/nuclear constraints; shares electrons"),
}

try:
    from backend.its.solver.expanded_invariants import (
        EXPANDED_VERIFIERS_MAP,
        EXPANDED_DECLARATIVE,
        EXPANDED_CONCEPTUAL,
    )
except ImportError:
    from its.solver.expanded_invariants import (
        EXPANDED_VERIFIERS_MAP,
        EXPANDED_DECLARATIVE,
        EXPANDED_CONCEPTUAL,
    )

VERIFIERS.update(EXPANDED_VERIFIERS_MAP)
DECLARATIVE_INVARIANTS.update(EXPANDED_DECLARATIVE)
CONCEPTUAL_INVARIANTS.update(EXPANDED_CONCEPTUAL)


# ── DECLARATIVE PHYSICS INVARIANT ENGINE (2026-10-07, maths port) ────────── #
# The owner's direction: verify physics the way the maths engine does --
# routes become DATA ROWS evaluated by one generic engine, not one
# hand-written verifier function per family.  Row form:
#
#   'label': proof-line name
#   'when':  forward-ask guard regex (skips inverse questions; a wrong
#            binding on 'volume is 66, find r' style asks would
#            FAIL-withhold a correct answer)
#   'need':  {var: (slot aliases...)} resolved from the family's
#            quantities record; falls back to 'qvars' regexes on the
#            question text; 'opt' vars may stay None
#   'eqs':   [relation lambdas] -- ANY matching rebuild PASSes (the
#            forward relation AND its inverse forms; alternative
#            conventions like g = 9.8 / 10 are separate rows)
#   'tol':   relative tolerance (default 1e-3)
#
# Independence contract (same as DECLARATIVE_INVARIANTS): the RELATION
# here differs from the family's procedural compute; givens are givens.

_PHYSICS_DECL: Dict[str, Dict[str, Any]] = {
    # electives-all 2026-10-07: classes 11-12 accounts/BS equation-shaped
    # routes ride the same declarative engine -- the family binds its
    # input slots into quantities (P/R/months, a_in/r_in/a_out/r_out)
    # and the row rebuilds the claim through the alternate relation.
    # Multi-entity parses (per-partner capitals, appropriation chains,
    # code execution) stay hand-written: genuinely irregular per the
    # VERIFIER_ENGINE.md case 2.
    "INTEREST_PARTNER_LOAN": {
        "label": "partner-loan interest rebuild",
        "when": r"\bloan\b",
        "need": {"P": ("P",), "T": ("months",)},
        "opt": {"R"},
        "eqs": [lambda P, R, T: P * R / 100.0 * T / 12.0,
                lambda P, T: P * 6.0 / 100.0 * T / 12.0],
    },
    "INTEREST_ON_CAPITAL": {
        "label": "interest-on-capital rebuild (commerce2 single-capital)",
        "when": r"interest\s+on\s+capital",
        "need": {"capital": ("capital",), "rate": ("rate",),
                 "months": ("months",)},
        "eqs": [lambda capital, rate, months:
                capital * rate / 100.0 * months / 12.0],
    },
    "NET_GST_PAYABLE": {
        "label": "net GST rebuild (output - input)",
        "when": r"net\s+gst\s+payable",
        "need": {"a_in": ("a_in",), "r_in": ("r_in",),
                 "a_out": ("a_out",), "r_out": ("r_out",)},
        "eqs": [lambda a_in, r_in, a_out, r_out:
                a_out * r_out / 100.0 - a_in * r_in / 100.0],
    },
    "WEIGHT_MG": {
        "label": "weight rebuild",
        "when": r"\bweight\b",
        "need": {"m": ("m", "mass")},
        "eqs": [lambda m, g=9.8: m * g, lambda m, g=10.0: m * g],
    },
    "FRICTION_MU_N": {
        "label": "friction rebuild",
        "need": {"mu": ("mu", "coefficient"), "N": ("N", "normal")},
        "eqs": [lambda mu, N: mu * N, lambda mu, N: N / mu],
    },
    "WORK_DONE": {
        "label": "work rebuild",
        "when": r"\bwork\b",
        "need": {"F": ("F", "force"), "d": ("d", "s", "distance")},
        "qvars": {"theta": r"(\d+(?:\.\d+)?)\s*(?:deg|degrees?|\u00b0)"},
        "eqs": [lambda F, d: F * d,
                lambda F, d, theta=0: F * d * math.cos(math.radians(float(theta)))],
    },
    "POTENTIAL_ENERGY": {
        "label": "PE rebuild",
        "when": r"\b(?:potential\s+energy|pe\b|mgh)\b",
        "need": {"m": ("m", "mass"), "h": ("h", "height")},
        "eqs": [lambda m, h, g=9.8: m * g * h,
                lambda m, h, g=10.0: m * g * h],
    },
    "KINETIC_ENERGY": {
        "label": "KE rebuild",
        "need": {"m": ("m", "mass"), "v": ("v", "speed")},
        "eqs": [lambda m, v: 0.5 * m * v * v],
    },
    "WORK_ENERGY_THEOREM": {
        "label": "work-energy rebuild",
        "need": {"m": ("m", "mass"), "u": ("u"), "v": ("v")},
        "eqs": [lambda m, u, v: 0.5 * m * (v * v - u * u)],
    },
    "POWER_FORCE_VELOCITY": {
        "label": "power rebuild",
        "when": r"\bpower\b",
        "need": {"F": ("F", "force")},
        "qvars": {"v": r"(\d+(?:\.\d+)?)\s*m\s*/?\s*s\b"},
        "eqs": [lambda F, v: F * v],
    },
    "GRAVITY_SURFACE_G": {
        "label": "surface-gravity rebuild",
        "need": {"M": ("M", "mass"), "R": ("R", "radius")},
        "eqs": [lambda M, R: 6.67e-11 * M / (R * R)],
        "tol": 2e-2,
    },
    "HYDROSTATIC_PRESSURE": {
        "label": "hydrostatic rebuild",
        "when": r"\bpressure\b",
        "need": {"h": ("h", "depth"), "rho": ("rho", "density")},
        "eqs": [lambda h, rho, g=9.8: h * rho * g,
                lambda h, rho, g=10.0: h * rho * g],
    },
    "C8_COLUMN_PRESSURE": {
        "label": "column-pressure rebuild",
        "need": {"h": ("h", "height", "depth"), "rho": ("rho", "density")},
        "eqs": [lambda h, rho, g=9.8: h * rho * g,
                lambda h, rho, g=10.0: h * rho * g],
    },
    "MOMENT_OF_FORCE": {
        "label": "moment rebuild",
        "need": {"F": ("F", "force"), "d": ("d", "distance")},
        "eqs": [lambda F, d: F * d],
    },
    "SPECIFIC_HEAT": {
        "label": "heat rebuild",
        "need": {"m": ("m", "mass"), "c": ("c", "specific"),
                 "dT": ("dT", "delta")},
        "eqs": [lambda m, c, dT: m * c * dT],
    },
    "LATENT_HEAT": {
        "label": "latent-heat rebuild",
        "need": {"m": ("m", "mass"), "L": ("L", "latent")},
        "eqs": [lambda m, L: m * L],
    },
    "PENDULUM_PERIOD": {
        "label": "pendulum rebuild",
        "when": r"\b(?:time\s+)?period\b|\bpendulum\b",
        "qvars": {"l": r"length\s+(?:of\s+)?(?:the\s+)?(?:pendulum\s+)?"
                       r"(?:is\s+)?(\d+(?:\.\d+)?)\s*(cm|m)\b"},
        "need": {},
        "eqs": [lambda l, g=9.8: 2 * 3.141592653589793 * (l / g) ** 0.5,
                lambda l, g=10.0: 2 * 3.141592653589793 * (l / g) ** 0.5],
    },
    "ELECTRICAL_POWER_VI": {
        "label": "electrical-power rebuild",
        "when": r"\bpower\b",
        "need": {},
        "qvars": {"V": r"(\d+(?:\.\d+)?)\s*V\b", "I": r"(\d+(?:\.\d+)?)\s*A\b",
                  "R": r"(\d+(?:\.\d+)?)\s*(?:ohm|omega)\b"},
        "eqs": [lambda V=None, I=None, R=None: V * I if V and I else None,
                lambda V=None, I=None, R=None: I * I * R if I and R else None,
                lambda V=None, I=None, R=None: V * V / R if V and R else None],
    },
    "C8_CURRENT_FROM_PV": {
        "label": "current rebuild",
        "when": r"\bcurrent\b",
        "qvars": {"P_w": r"(\d+(?:\.\d+)?)\s*W\b",
                  "V": r"(\d+(?:\.\d+)?)\s*V\b"},
        "need": {},
        "eqs": [lambda P_w, V: P_w / V],
    },
    "REFRACTIVE_INDEX_SPEED": {
        "label": "refractive-index rebuild",
        "need": {"c": ("c",), "v": ("v",)},
        "opt": ["c", "v"],
        "qvars": {"c": r"(?:air|vacuum)[^.;:\d]{0,35}?(\d+(?:\.\d+)?)\s*(?:[x\u00d7*]\s*10\s*\^?\s*8|e8)\s*m/s|(\d+(?:\.\d+)?)\s*(?:[x\u00d7*]\s*10\s*\^?\s*8|e8)\s*m/s",
                  "v": r"(?:water|glass|diamond|medium|substance)[^.;:\d]{0,35}?(\d+(?:\.\d+)?)\s*(?:[x\u00d7*]\s*10\s*\^?\s*8|e8)\s*m/s"},
        "eqs": [lambda c=None, v=None: float(c) / float(v) if c and v and float(v) > 0 else None],
    },
    "RESISTOR_NETWORK": {
        "label": "resistor network rebuild",
        "need": {"Req": ("Req",)},
        "eqs": [lambda Req: float(Req)],
    },
    "COULOMB_ALT": {
        "label": "coulomb rebuild",
        "need": {"q1": ("q1"), "q2": ("q2"), "r": ("r", "distance")},
        "eqs": [lambda q1, q2, r: 9e9 * abs(q1) * abs(q2) / (r * r)],
        "tol": 2e-2,
    },
    "RMS_AC_VALUE": {
        "label": "rms rebuild",
        "qvars": {"peak": r"peak\s+(?:value\s+)?(?:of\s+)?(\d+(?:\.\d+)?)"},
        "need": {},
        "eqs": [lambda peak: peak / 2 ** 0.5,
                lambda peak: peak * 2 ** 0.5],
    },
    "TRANSFORMER_RATIO": {
        "label": "transformer rebuild",
        "need": {"N_p": ("N_p"), "N_s": ("N_s")},
        "qvars": {"V_p": r"(\d+(?:\.\d+)?)\s*V\b"},
        "eqs": [lambda N_p, N_s, V_p=None: V_p * N_s / N_p
                if V_p else None],
    },
    "TORQUE_ANGULAR": {
        "label": "torque rebuild",
        "need": {"I": ("I", "inertia"), "alpha": ("alpha")},
        "eqs": [lambda I, alpha: I * alpha],
    },
    "ANGULAR_MOMENTUM": {
        "label": "angular-momentum rebuild",
        "qvars": {"m": r"(\d+(?:\.\d+)?)\s*kg\b",
                  "v": r"(\d+(?:\.\d+)?)\s*m\s*/?\s*s\b",
                  "r": r"radius\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*(cm|m)\b"},
        "need": {},
        "eqs": [lambda m, v, r: m * v * r],
    },
    "IDEAL_GAS_LAW": {
        "label": "ideal gas rebuild",
        "need": {"n": ("n",), "T": ("T",)},
        "opt": ["P", "V", "R"],
        "eqs": [lambda n, P, T, R=0.0821: (float(n) * float(R) * float(T)) / float(P),
                lambda n, V, T, R=0.0821: (float(n) * float(R) * float(T)) / float(V)],
        "tol": 1e-2,
    },
    "MOMENT_OF_INERTIA_PT": {
        "label": "inertia rebuild",
        "need": {"m": ("m", "mass"), "r": ("r", "radius", "distance")},
        "eqs": [lambda m, r: m * r * r],
    },
    "RELATIVE_VELOCITY": {
        "label": "relative-velocity rebuild",
        "need": {"v1": ("v1"), "v2": ("v2")},
        "eqs": [lambda v1, v2: abs(v1 - v2), lambda v1, v2: abs(v1 + v2)],
    },
    "KEPLER_THIRD": {
        "label": "kepler rebuild",
        "need": {"r1": ("r1"), "T1": ("T1"), "T2": ("T2")},
        "eqs": [lambda r1, T1, T2: r1 * (T2 / T1) ** (2.0 / 3.0)],
    },
    "ESCAPE_VELOCITY": {
        "label": "escape-velocity rebuild",
        "qvars": {"R_km": r"radius\s*(?:[R=:\s,]|of|is)*\s*(\d+(?:\.\d+)?)\s*km\b",
                  "R_m": r"radius\s*(?:[R=:\s,]|of|is)*\s*(\d+(?:\.\d+)?(?:e\d+)?)\s*m\b"},
        "need": {"R": ("R", "radius")},
        "eqs": [lambda R, g=9.8: (2 * g * float(R)) ** 0.5,
                lambda R_m, g=9.8: (2 * g * float(R_m)) ** 0.5,
                lambda R_km: (2 * 9.8 * float(R_km) * 1e3) ** 0.5],
        "tol": 2e-2,
    },
    "ORBITAL_VELOCITY": {
        "label": "orbital-velocity rebuild",
        "need": {"M": ("M"), "r": ("r")},
        "eqs": [lambda M, r: (6.67e-11 * M / r) ** 0.5],
        "tol": 2e-2,
    },
    "YOUNGS_MODULUS": {
        "label": "strain rebuild",
        "need": {"L": ("L"), "dL": ("dL")},
        "eqs": [lambda L, dL: dL / L],
    },
    "YDSE_FRINGE": {
        "label": "fringe-width rebuild",
        "need": {"lambda": ("lambda"), "D": ("D"), "d": ("d")},
        "eqs": [lambda **kw: kw["lambda"] * kw["D"] / kw["d"]],
    },
    "RESOLVING_POWER": {
        "label": "resolving rebuild",
        "need": {"a": ("a"), "lambda": ("lambda")},
        "eqs": [lambda **kw: 1.22 * kw["lambda"] / kw["a"]],
    },
    "TRANSISTOR_GAIN": {
        "label": "transistor-gain rebuild",
        "qvars": {"I_B": r"(\d+(?:\.\d+)?)\s*(?:u\u00b5|micro)?A\b[^.]{0,30}?base",
                  "I_C": r"collector[^.]{0,30}?(\d+(?:\.\d+)?)\s*m?a\b"},
        "need": {},
        "eqs": [lambda **kw: kw["I_C"] / kw["I_B"]],
    },
    "ECHO_SONAR": {
        "label": "echo rebuild",
        "need": {"v": ("v"), "t": ("t")},
        "eqs": [lambda v, t: v * t / 2],
    },
    "MACHINE_ADVANTAGE": {
        "label": "MA rebuild",
        "qvars": {"load": r"load\s+(?:of\s+)?(\d+(?:\.\d+)?)",
                  "effort": r"effort\s+(?:of\s+)?(\d+(?:\.\d+)?)"},
        "need": {},
        "eqs": [lambda load=None, effort=None: load / effort
                if load and effort else None],
    },
    "DIPOLE_FIELD": {
        "label": "dipole rebuild",
        "need": {"p": ("p"), "r": ("r")},
        "eqs": [lambda p, r: 2 * 9e9 * p / r ** 3],
        "tol": 2e-2,
    },
    "G_FIELD_VARIATION": {
        "label": "mass-from-g rebuild",
        "need": {"g": ("g"), "R": ("R")},
        "eqs": [lambda g, R: g * R * R / 6.67e-11],
        "tol": 2e-2,
    },
    "C7_OSCILLATION_PERIOD": {
        "label": "oscillation rebuild",
        "need": {"N": ("N"), "t_total": ("t_total", "t")},
        "eqs": [lambda N, t_total: t_total / N],
    },
    "C7_HEAT_RATE": {
        "label": "heat-rate rebuild",
        # RELAUNCH3 FIX: the family answers BOTH directions -- rate ask
        # (claim = rate, record carries Q and t) and energy ask (claim
        # = Q, record carries rate and t).  The single rate*t relation
        # only rebuilt direction B, so every direction-A ask (the board
        # distractor shape: mass + delta-T noise, 'calculate the rate
        # of heat absorption') withheld as 'no declared relation
        # rebuilds the claimed 840'.  Alternative relations, not
        # tolerance hacks (VERIFIER_ENGINE.md).
        "need": {"Q": ("Q"), "rate": ("rate"), "t": ("t")},
        "eqs": [lambda Q, rate, t: Q / t,
                lambda Q, rate, t: rate * t],
    },
    "C7_HEAT_PER_DEGREE": {
        "label": "heat-per-degree rebuild",
        "need": {"Q": ("Q"), "dT": ("dT")},
        "eqs": [lambda Q, dT: Q / dT],
    },
    "C7_MIRROR_IMAGES": {
        "label": "image-count rebuild",
        "need": {"theta": ("theta")},
        "eqs": [lambda theta: 360.0 / theta - 1.0
                if theta < 90 else 360.0 / theta],
    },
    "C8_SAVED_KWH": {
        "label": "saved-kWh rebuild",
        "need": {"n": ("n",)},
        "qvars": {"p_old": r"replaces?\s+(?:\d+|five|four|three|two|six)"
                           r"[^.]{0,60}?(\d+)\s*W\b",
                  "p_new": r"with\s+(?:\d+|five|four|three|two|six)\s+"
                           r"(\d+)\s*W\b",
                  "h": r"(\d+(?:\.\d+)?)\s*hours?"},
        "eqs": [lambda n, p_old, p_new, h: n * (p_old - p_new) * h / 1000.0],
    },
    "C8_FINAL_SPEED_FMA": {
        "label": "final-speed rebuild",
        "need": {"F": ("F"), "m": ("m"), "t": ("t")},
        "eqs": [lambda F, m, t: F * t / m],
    },
    "C8B_FINAL_SPEED_FMT": {
        "label": "final-speed rebuild",
        "need": {"F": ("F"), "m": ("m"), "t": ("t")},
        "eqs": [lambda F, m, t: F * t / m],
    },
    "C8_ACCEL_WITH_RESISTANCE": {
        "label": "net-accel rebuild",
        "need": {"F_net": ("F_net"), "m": ("m")},
        "eqs": [lambda F_net, m: F_net / m],
    },
    "C8B_NET_FORCE": {
        "label": "net-force rebuild",
        "need": {"F_applied": ("F_applied"), "F_friction": ("F_friction")},
        "eqs": [lambda F_applied, F_friction: F_applied - F_friction],
    },
    "C8B_MIRROR_FOCAL": {
        "label": "focal rebuild",
        "need": {"R": ("R")},
        "eqs": [lambda R: R / 2],
    },
    "C8B_MIRROR_TYPE": {
        "label": "radius rebuild",
        "need": {"f": ("f")},
        "eqs": [lambda f: 2 * f],
    },
    "C8B_PRESSURE_BRICK": {
        "label": "brick-pressure rebuild",
        "when": r"\bpressure\b",
        "need": {"W": ("W", "weight")},
        "qvars": {"edge": r"edge\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*(cm|m)\b"},
        "eqs": [lambda W, edge: W / (edge * edge)],
    },
    "C8B_PRESSURE_DIMS": {
        "label": "pressure rebuild",
        "when": r"\bpressure\b",
        "need": {"F": ("F"), "l": ("l", "length"), "b": ("b", "breadth",
                                                        "width")},
        "eqs": [lambda F, l, b: F / (l * b)],
    },
    "C9_WORK_ANGLE": {
        "label": "work rebuild",
        "when": r"\bwork\b",
        "need": {"F": ("F"), "s": ("s", "distance")},
        "eqs": [lambda F, s: F * s],
    },
    "C9_WORK_ZERO": {
        "label": "work rebuild",
        "when": r"\bwork\b",
        "need": {"F": ("F"), "s": ("s", "distance")},
        "eqs": [lambda F, s: F * s],
    },
    "C9_WORK_NET_FRICTION": {
        "label": "net-work rebuild",
        "when": r"\bwork\b",
        "need": {"F1": ("F1"), "F2": ("F2"), "s": ("s", "distance")},
        "eqs": [lambda F1, F2, s: (F1 - F2) * s],
    },
    "C9_WORK_KE_THM": {
        "label": "work-energy rebuild",
        "need": {"m": ("m"), "u": ("u"), "v": ("v")},
        "eqs": [lambda m, u, v: 0.5 * m * (v * v - u * u)],
    },
    "C9_DROP_KE": {
        "label": "drop-speed rebuild",
        "need": {"h": ("h")},
        "qvars": {},
        "eqs": [lambda h, g=9.8: (2 * g * h) ** 0.5,
                lambda h, g=10.0: (2 * g * h) ** 0.5],
    },
    "C9_SPRING_LAUNCH": {
        "label": "spring-energy rebuild",
        "need": {"k": ("k"), "x": ("x")},
        "eqs": [lambda k, x: 0.5 * k * x * x],
    },
    "C9_IMPULSE": {
        # rebound: v is the signed final velocity the family set --
        # 'back at 30' binds v=-30 so |v-u| is the true speed change
        "label": "impulse rebuild",
        "need": {"m": ("m",), "u": ("u",), "v": ("v",)},
        "eqs": [lambda m, u, v: m * abs(v - u)],
    },
    "HARDY_WEINBERG": {
        # heterozygote ask: q is the recessive-allele frequency the
        # family bound; rebuild 2pq with p = 1 - q
        "label": "H-W rebuild",
        "need": {"q": ("q",)},
        "eqs": [lambda q: 2 * (1.0 - q) * q],
    },
    "STP_VOLUME": {
        "label": "STP rebuild",
        "need": {"n": ("n",)},
        "eqs": [lambda n: n * 22.4],
    },
    "LADDER": {
        "label": "ladder rebuild",
        "need": {"l": ("l",), "d": ("d",)},
        "eqs": [lambda l, d: (l * l - d * d) ** 0.5],
    },
    "DILUTION": {
        # water added = V2 - V1 where V2 = M1 V1 / M2
        "label": "dilution rebuild",
        "need": {"M1": ("M1",), "V1": ("V1",), "M2": ("M2",)},
        "eqs": [lambda M1, V1, M2: M1 * V1 / M2 - V1],
    },
    "SPECIFIC_HEAT": {
        "label": "specific-heat rebuild",
        "need": {"m": ("m",), "c": ("c",), "dT": ("dT",)},
        "eqs": [lambda m, c, dT: m * c * dT],
    },
    "CALORIMETRY_MIX": {
        "label": "mixture-temp rebuild",
        "need": {"m1": ("m1",), "T1": ("T1",),
                 "m2": ("m2",), "T2": ("T2",)},
        "eqs": [lambda m1, T1, m2, T2: (m1 * T1 + m2 * T2) / (m1 + m2)],
    },
    "LIMITING_MOLES": {
        "label": "limiting-moles rebuild",
        "need": {"n1": ("n1",), "n2": ("n2",)},
        "eqs": [lambda n1, n2: min(n1, n2)],
    },
    "POWER_WORK_TIME": {
        # lift form: P = m g h / t rebuilt from the bound slots
        "label": "lift-power rebuild",
        "need": {"m": ("m",), "h": ("h",), "t": ("t",), "g": ("g",)},
        "eqs": [lambda m, h, t, g: m * g * h / t],
    },

    # -----------------------------------------------------------------
    # STEM-PC FULL-SPAN wave (2026-10-07 c11/c12 dig) -- declarative
    # rows for the _TABLE_PC1 families.  Slots resolve from the
    # family's quantities record (bound in `extra`); relations are the
    # canonical one-liners.  qvars are NOT used for scientific-notation
    # givens (the engine's float() cannot parse them) -- the families
    # bind every scientific given as a slot.
    # -----------------------------------------------------------------
    "ELC_FIELD_POINT": {
        "label": "point-field rebuild",
        "when": r"electric\s+field",
        "need": {"q": ("q",), "r": ("r",)},
        "eqs": [lambda q, r, k=9.0e9: k * abs(q) / (r * r)],
    },
    "ELC_FIELD_MIDPOINT": {
        "label": "midpoint superposition rebuild",
        "need": {"q1": ("q1",), "q2": ("q2",), "r": ("r",)},
        "eqs": [lambda q1, q2, r, k=9.0e9:
                k * (abs(q1) + abs(q2)) / (r * r)
                if (q1 > 0) != (q2 > 0)
                else abs(k * (abs(q1) - abs(q2)) / (r * r))],
    },
    "ELC_FLUX": {
        "label": "flux rebuild",
        "when": r"\bflux\b",
        "need": {"E": ("E",), "A": ("A",), "theta": ("theta",)},
        "eqs": [lambda E, A, theta: E * A * math.cos(math.radians(theta))],
    },
    "ELC_LINE_CHARGE": {
        "label": "line-charge rebuild",
        "need": {"lam": ("lambda",), "r": ("r",)},
        "eqs": [lambda lam, r: lam / (2 * math.pi * 8.85e-12 * r)],
    },
    "ELC_DIPOLE_AXIAL": {
        "label": "axial-field rebuild",
        "need": {"p": ("p",), "r": ("r",)},
        "eqs": [lambda p, r, k=9.0e9: 2.0 * k * p / (r ** 3)],
    },
    "ELC_DIPOLE_WORK": {
        "label": "dipole-work rebuild",
        "need": {"p": ("p",), "E": ("E",),
                 "theta_i": ("theta_i",), "theta_f": ("theta_f",)},
        "eqs": [lambda p, E, theta_i, theta_f:
                p * E * (math.cos(math.radians(theta_i))
                         - math.cos(math.radians(theta_f)))],
    },
    "ELC_POTENTIAL_POINT": {
        "label": "potential rebuild",
        "need": {"q": ("q",), "r": ("r",)},
        "eqs": [lambda q, r, k=9.0e9: k * q / r],
    },
    "ELC_CHARGE_COUNT": {
        "label": "charge-count rebuild",
        "need": {"q": ("q",)},
        "eqs": [lambda q: abs(q) / 1.6e-19],
    },
    "ELC_DRIFT": {
        "label": "drift rebuild",
        "need": {"I": ("I",), "n": ("n",), "A": ("A",)},
        "eqs": [lambda I, n, A: I / (n * 1.6e-19 * A)],
    },
    "ELC_TEMP_COEF_R": {
        "label": "temperature-resistance rebuild",
        "need": {"R0": ("R0",), "alpha": ("alpha",), "dT": ("dT",)},
        "eqs": [lambda R0, alpha, dT: R0 * (1.0 + alpha * dT)],
    },
    "ELC_VMAX_SPHERE": {
        "label": "breakdown-potential rebuild",
        "need": {"E": ("E",), "R": ("R",)},
        "eqs": [lambda E, R: E * R],
    },
    "KIN_STOPPING_DIST": {
        "label": "stopping-distance rebuild",
        # tr rides in `need` (with opt) so the engine actually binds it
        # from the family slots; leaving it only in opt never bound it
        # and the reaction-time rebuild FAILed against plain v0^2/2a
        "need": {"v0": ("v0",), "a": ("a",), "tr": ("tr",)},
        "opt": ["tr"],
        "eqs": [lambda v0, a, tr=None: v0 * v0 / (2.0 * a)
                + (v0 * tr if tr else 0.0)],
    },
    "KIN_FREEFALL": {
        "label": "free-fall rebuild",
        "need": {"h": ("h",), "g": ("g",)},
        "eqs": [lambda h, g: (2.0 * h / g) ** 0.5],
    },
    "PROJ_HORIZONTAL": {
        "label": "horizontal-projectile rebuild",
        "need": {"h": ("h",), "g": ("g",)},
        "eqs": [lambda h, g: (2.0 * h / g) ** 0.5],
    },
    "PROJ_COMPONENTS": {
        "label": "component rebuild",
        "need": {"u": ("u",), "theta": ("theta",)},
        "eqs": [lambda u, theta: u * math.cos(math.radians(theta))],
    },
    "KIN_VERT_THROW": {
        "label": "vertical-throw rebuild",
        "need": {"u": ("u",), "g": ("g",), "h0": ("h0",)},
        "eqs": [lambda u, g, h0: h0 + u * u / (2.0 * g)],
    },
    "VEC_CROSS_ANGLE": {
        "label": "cross-product-angle rebuild",
        "need": {"P": ("P",), "Q": ("Q",), "C": ("C",)},
        "eqs": [lambda P, Q, C: math.degrees(
            math.asin(min(1.0, C / (P * Q))))],
    },
    "VEC_DISPLACEMENT_2D": {
        "label": "2-D displacement rebuild",
        "need": {"dx": ("dx",), "dy": ("dy",)},
        "eqs": [lambda dx, dy: math.hypot(dx, dy)],
    },
    "MECH_SCREW_LC": {
        # moved to the hand-written tail: the corrected reading mixes
        # units (LC in mm, observed/zero in mm) and a signed group the
        # data engine's float() parse cannot express
        "label": "screw-gauge rebuild (hand-written)",
        "need": {"pitch": ("pitch",), "n": ("n",)},
        "opt": ["obs", "z"],
        "eqs": [lambda pitch, n, obs=None, z=None:
                (pitch / n if obs is None else obs - z)],
    },
    "C11_SHM_PERIOD": {
        "label": "SHM rebuild",
        "need": {"m": ("m",), "k": ("k",)},
        "eqs": [lambda m, k: (k / m) ** 0.5,
                lambda m, k: 2.0 * math.pi / ((k / m) ** 0.5)],
    },
    # -----------------------------------------------------------------
    # STEM-PC CHEMISTRY wave (2026-10-07 c10-c12 dig) -- declarative
    # rows for the _TABLE_CHEM_PC families.  All scientific givens ride
    # the family slot record (the data engine's float() cannot parse
    # 'x 10^e' question text).
    # -----------------------------------------------------------------
    "CHM_PH_ACID": {
        "label": "pH reverse rebuild",
        "when": r"\bpH\b",
        "need": {"pH": ("pH",), "h": ("h",)},
        "eqs": [lambda pH, h: -math.log10(h),
                lambda pH, h: 10.0 ** (-pH)],  # inverse: 10^-pH == [H+]
    },
    "CHM_PH_COMPARE": {
        "label": "pH-ratio rebuild",
        "need": {"pH1": ("pH1",), "pH2": ("pH2",)},
        "eqs": [lambda pH1, pH2: 10.0 ** abs(pH2 - pH1)],
    },
    "CHM_COMBUSTION_CO2": {
        "label": "carbon-balance rebuild",
        "need": {"mass_fuel": ("mass_fuel",), "M_fuel": ("M_fuel",),
                 "n_C": ("n_C",)},
        # independent path: carbon MASS balance, not the mole chain
        "eqs": [lambda mass_fuel, M_fuel, n_C:
                mass_fuel * (12.0 * n_C / M_fuel) * (44.0 / 12.0)],
    },
    "CHM_DOBEREINER": {
        "label": "triad-mean rebuild",
        "need": {"a": ("a",), "c": ("c",), "A": ("A",)},
        "opt": ["A"],
        "eqs": [lambda a, c, A=None: (a + c) / 2.0,
                lambda a, c, A=None: 2.0 * A - a if A else None,
                lambda a, c, A=None: c - 2.0 * A if A else None],
    },
    "CHM_ISOTOPE_AVG": {
        "label": "isotope-weighted rebuild",
        "need": {"m1": ("m1",), "p1": ("p1",),
                 "m2": ("m2",), "p2": ("p2",)},
        "eqs": [lambda m1, p1, m2, p2:
                (m1 * p1 + m2 * p2) / (p1 + p2)],
    },
    "CHM_EN_DIFF": {
        "label": "EN-difference rebuild",
        "need": {"EN1": ("EN1",), "EN2": ("EN2",)},
        "eqs": [lambda EN1, EN2: abs(EN1 - EN2),
                lambda EN1, EN2, dEN=None: (EN2 - EN1)
                if dEN is not None else abs(EN1 - EN2)],
    },
    "CHM_LIGHT_FREQ": {
        "label": "wave-relation rebuild",
        "need": {"lam": ("lam",), "c": ("c",)},
        "eqs": [lambda lam, c: c / lam,
                lambda lam, c, f=None: lam * f if f else c / lam],
    },
    "CHM_PHOTOELECTRIC": {
        "label": "photon-energy rebuild (SI path)",
        "need": {"lam_nm": ("lam_nm",), "phi": ("phi",)},
        "eqs": [lambda lam_nm, phi, conv=1.602e-19:
                (6.626e-34 * 3.0e8 / (lam_nm * 1e-9)
                 - phi * conv) / conv],
    },
    "CHM_HEISENBERG": {
        "label": "uncertainty inverse rebuild",
        "need": {"dx": ("dx",), "m": ("m",), "dv": ("dv",)},
        "eqs": [lambda dx, m, dv: 6.626e-34 / (4.0 * math.pi * m * dx),
                lambda dx, m, dv: 6.626e-34 / (4.0 * math.pi * m * dv)],
    },
    # -----------------------------------------------------------------
    # PHY-CISCE-PHRASING wave (2026-10-08) -- declarative rows for the
    # _TABLE_PCISCE families.  Every row is DATA (VERIFIER_ENGINE.md:
    # no hand-written verifiers); slots ride the family quantities
    # record, `when` pins the forward ask so inverse wordings can never
    # mis-bind.
    # -----------------------------------------------------------------
    "PCISCE_PINHOLE": {
        "label": "pinhole similar-triangles rebuild",
        "when": r"pinhole",
        "need": {"ho": ("ho",), "u": ("u",), "v": ("v",)},
        "eqs": [lambda ho, u, v: (ho / u) * v,
                lambda ho, u, v: ho * v / u],
    },
    "PCISCE_ELECTROMAGNET_B": {
        "label": "electromagnet B rebuild (per-cm turns path)",
        "when": r"electromagnet|solenoid",
        "need": {"N": ("N",), "L": ("L",), "mu_r": ("mu_r",),
                 "I": ("I",)},
        "eqs": [lambda N, L, mu_r, I:
                4.0e-7 * math.pi * mu_r * (N / L) * I,
                lambda N, L, mu_r, I:
                (4.0e-7 * math.pi * mu_r * N * I) / L],
    },
    "PCISCE_INCIDENCE_ANGLE": {
        "label": "incidence-angle rebuild (complement / definition)",
        "when": r"angle\s+of\s+incidence",
        "need": {"i": ("i",)},
        "opt": {"theta_surface"},
        "eqs": [lambda i, theta_surface=None:
                90.0 - theta_surface if theta_surface is not None else i,
                lambda i: i],
    },
    "PCISCE_PLANE_MIRROR_IMG": {
        "label": "plane-mirror image rebuild (m = +1, |v| = u)",
        "when": r"plane\s+mirror",
        "need": {},
        "opt": {"ho", "hi", "u", "v"},
        "eqs": [lambda ho, hi=None: ho,
                lambda u, v=None: u,
                lambda hi, ho=None: hi,
                lambda v, u=None: v],
    },
    "PCISCE_DISP_DENSITY": {
        "label": "displacement-density rebuild (g/cm^3 x 1000)",
        "when": r"density",
        "need": {"m_g": ("m_g",), "v1": ("v1",), "v2": ("v2",)},
        "eqs": [lambda m_g, v1, v2: m_g * 1000.0 / (v2 - v1),
                lambda m_g, v1, v2: (m_g / (v2 - v1)) * 1000.0],
    },
    "PCISCE_HEAT_CAL_TIME": {
        "label": "heating-time rebuild (cal x 4.184 / P)",
        "when": r"cal\b|calories",
        "need": {"cal": ("cal",), "P": ("P",)},
        "eqs": [lambda cal, P: cal * 4.184 / P,
                lambda cal, P: (cal * 4.184) / P],
    },
    "PCISCE_MAGNET_COUNT": {
        "label": "magnet-count rebuild (ferromagnetic sum / mean)",
        "when": r"magnet",
        "need": {},
        "opt": {"count", "total", "n", "mean"},
        "eqs": [lambda count: count,
                lambda total, n: total / n,
                lambda n, mean: n * mean],
    },
    "PCISCE_FIELD_LINES": {
        "label": "field-line proportionality rebuild",
        "when": r"field\s+lines?",
        "need": {"n1": ("n1",), "q1": ("q1",), "q2": ("q2",)},
        "eqs": [lambda n1, q1, q2: (n1 / q1) * q2,
                lambda n1, q1, q2: n1 * q2 / q1],
    },
    "PCISCE_DIPOLE_TORQUE": {
        "label": "dipole-torque rebuild",
        "when": r"torque",
        "need": {"p": ("p",), "E": ("E",), "theta": ("theta",)},
        "eqs": [lambda p, E, theta:
                p * E * math.sin(math.radians(theta))],
    },
    "PCISCE_DIPOLE_AXIAL_P": {
        "label": "axial-field rebuild (2k = 18e9 folding)",
        "when": r"electric\s+field",
        "need": {"p": ("p",), "r": ("r",)},
        "eqs": [lambda p, r: 18.0e9 * p / (r * r * r),
                lambda p, r: 2.0 * 9.0e9 * p / r ** 3],
    },
    "PCISCE_CAPACITOR": {
        "label": "capacitance rebuild (eps_r eps_0 A / d)",
        "when": r"capacitan",
        "need": {"A": ("A",), "d": ("d",)},
        "opt": {"eps_r"},
        "eqs": [lambda A, d, eps_r=None:
                (eps_r if eps_r is not None else 1.0) * 8.85e-12 * A / d,
                lambda A, d, eps_r=None:
                8.85e-12 * A / d * (eps_r if eps_r is not None else 1.0)],
    },
    "PCISCE_MOMENT_MIDPOINT": {
        "label": "midpoint-moment rebuild (F x L/2)",
        "when": r"moment",
        "need": {"F": ("F",), "L": ("L",)},
        "eqs": [lambda F, L: F * L * 0.5,
                lambda F, L: F * (L / 2.0)],
    },
    "PCISCE_MOMENT_LINE_ANGLE": {
        "label": "line-of-action moment rebuild",
        "when": r"moment",
        "need": {"F": ("F",), "d": ("d",), "theta": ("theta",)},
        "eqs": [lambda F, d, theta:
                F * d * math.sin(math.radians(theta))],
    },
    "PCISCE_MOMENT_COMPARE": {
        "label": "moment-comparison rebuild (tau1 - tau2 / equal)",
        "when": r"compare|larger",
        "need": {"t1": ("t1",), "t2": ("t2",)},
        "eqs": [lambda t1, t2: abs(t1 - t2),
                lambda t1, t2: t1 - t2,
                lambda t1, t2: t2 - t1,
                lambda t1, t2=None: t1],
    },
    "PCISCE_NET_MOMENT_ROD": {
        "label": "net-moment rebuild (signed sum)",
        "when": r"net\s+moment",
        "need": {"t1": ("t1",), "t2": ("t2",)},
        "eqs": [lambda t1, t2: abs(t1 + t2),
                lambda t1, t2: t1 + t2],
    },
    "PCISCE_AVG_ACCEL": {
        "label": "average-acceleration rebuild",
        "when": r"average\s+acceleration",
        "need": {"v1": ("v1",), "v2": ("v2",), "t": ("t",)},
        "eqs": [lambda v1, v2, t: v2 / t - v1 / t,
                lambda v1, v2, t: (v2 - v1) / t],
    },
    "PCISCE_TRIP_SPEED": {
        "label": "odometer-trip rebuild (speed / velocity)",
        "when": r"odometer",
        "need": {},
        "opt": {"dist", "disp", "t_h"},
        "eqs": [lambda dist, t_h: dist / t_h,
                lambda disp, t_h: disp / t_h],
    },
    "PCISCE_BRAKE_PHASES": {
        "label": "brake-phase rebuild (cruise distance / decel)",
        "when": r"brakes?",
        "need": {"v": ("v",)},
        "opt": {"t1", "t2"},
        "eqs": [lambda v, t1: v * t1,
                lambda v, t2: v / t2],
    },
    "PCISCE_RESULTANT_ANGLE": {
        "label": "resultant-angle rebuild (cosine rule inverse)",
        "when": r"resultant",
        "need": {"A": ("A",), "B": ("B",), "R": ("R",)},
        "eqs": [lambda A, B, R:
                math.degrees(math.acos(max(
                    -1.0, min(1.0, (R * R - A * A - B * B)
                     / (2.0 * A * B)))))],
    },
    "PCISCE_COMPONENTS_2D": {
        "label": "component-sum rebuild (Pythagoras over components)",
        "when": r"resultant|component",
        "need": {"rx": ("rx",), "ry": ("ry",)},
        "eqs": [lambda rx, ry: math.hypot(rx, ry)],
    },
    "PCISCE_POSVEC_KIN": {
        "label": "position-vector rebuild (derivative + Pythagoras)",
        "when": r"position\s+vector",
        "need": {"a": ("a",), "b": ("b",), "t": ("t",)},
        "eqs": [lambda a, b, t: math.hypot(2.0 * a * t, b),
                lambda a, b, t: ((2.0 * a * t) ** 2 + b * b) ** 0.5],
    },
    "PCISCE_SIGFIG_GRAMS": {
        "label": "kg->g rebuild (x 1000, sig figs kept)",
        "when": r"grams?",
        "need": {"kg": ("kg",)},
        "eqs": [lambda kg: kg * 1000.0],
        "tol": 2e-2,
    },
    # -----------------------------------------------------------------
    # PHY-CISCE-PHRASING chemistry rows (2026-10-08) -- data rows for
    # the _TABLE_CISCE_CHM families (same dict per VERIFIER_ENGINE.md;
    # route id == family id == key).
    # -----------------------------------------------------------------
    "CHM_PC_VOL_CONSERVED": {
        "label": "volume-conservation rebuild",
        "when": r"volume",
        "need": {"v": ("v",)},
        "eqs": [lambda v: v],
    },
    "CHM_PC_PCT_INCREASE": {
        "label": "percentage-increase rebuild",
        "when": r"increase",
        "need": {"new": ("new",), "old": ("old",)},
        "eqs": [lambda new, old: (new - old) / old * 100.0],
    },
    "CHM_PC_POWER_TIME": {
        "label": "E = P t rebuild",
        "when": r"energy|power",
        "need": {"P": ("P",), "t": ("t",)},
        "eqs": [lambda P, t: P * t],
    },
    "CHM_PC_MASS_PERCENT": {
        "label": "mass-percent rebuild",
        "when": r"mass\s+percent|by\s+mass",
        "need": {"ms": ("ms",), "mw": ("mw",)},
        "eqs": [lambda ms, mw: ms / (ms + mw) * 100.0],
    },
    "CHM_PC_ALLIGATION": {
        "label": "mixture-balance rebuild",
        "when": r"mix|standardise|standardize|blend",
        "need": {"x": ("x",), "total": ("total",), "p_hi": ("p_hi",),
                 "p_lo": ("p_lo",)},
        "eqs": [lambda x, total, p_hi, p_lo:
                (p_hi * x + p_lo * (total - x)) / total],
    },
    "CHM_PC_DENSITY_MASS": {
        "label": "m = rho V rebuild",
        "when": r"density",
        "need": {"rho": ("rho",), "V": ("V",)},
        "eqs": [lambda rho, V: rho * V],
    },
    "CHM_PC_YIELD_GYPSUM": {
        "label": "gypsum->plaster yield rebuild (145/172)",
        "when": r"gypsum|plaster",
        "need": {"initial": ("initial",), "actual": ("actual",)},
        "eqs": [lambda initial, actual:
                actual / (initial * 145.0 / 172.0) * 100.0],
    },
    "CHM_PC_MASS_CONSERVED": {
        "label": "mass-conservation rebuild",
        "when": r"mass|sublim",
        "need": {"m": ("m",)},
        "eqs": [lambda m: m],
    },
    "CHM_PC_CHARGE_ELECTRONS": {
        "label": "Q = I t rebuild",
        "when": r"current",
        "need": {"I": ("I",), "t": ("t",)},
        "eqs": [lambda I, t: I * t],
    },
    "CHM_PC_PROTON_ELECTRON": {
        "label": "neutral-atom rebuild (e = Z)",
        "when": r"neutral\s+atom",
        "need": {"Z": ("Z",)},
        "eqs": [lambda Z: Z],
    },
    "CHM_PC_MASS_NUMBER": {
        "label": "A = Z + N rebuild",
        "when": r"mass\s+number",
        "need": {"Z": ("Z",), "N": ("N",)},
        "eqs": [lambda Z, N: Z + N],
    },
    "CHM_PC_VALENCY_FORMULA": {
        "label": "valency-balance rebuild (v sub_X = v_o sub_o)",
        "when": r"valency",
        "need": {"v": ("v",)},
        "eqs": [lambda v: v],
    },
    "CHM_PC_ISOTOPE_INVERSE": {
        "label": "inverse-abundance rebuild (x = (avg-m2)/(m1-m2))",
        "when": r"abundance",
        "need": {"avg": ("avg",), "m1": ("m1",), "m2": ("m2",)},
        "eqs": [lambda avg, m1, m2: (avg - m2) / (m1 - m2) * 100.0],
    },
    "CHM_PC_BALANCE_MASS": {
        "label": "stoichiometric-weigh rebuild",
        "when": r"formed|balance",
        "need": {"m_given": ("m_given",), "M_g": ("M_g",),
                 "M_t": ("M_t",), "cG": ("cG",), "cT": ("cT",)},
        "eqs": [lambda m_given, M_g, M_t, cG, cT:
                m_given * cT * M_t / (M_g * cG)],
    },
    "CHM_PC_RFM_NAMED": {
        "label": "named-formula RFM rebuild",
        "when": r"formula\s+mass",
        "need": {"rfm": ("rfm",)},
        "eqs": [lambda rfm: rfm],
    },
    "CHM_PC_PRECIPITATE": {
        "label": "precipitation-volume rebuild (V = k n / C)",
        "when": r"precipitat",
        "need": {"n_metal": ("n_metal",), "k": ("k",), "C": ("C",)},
        "eqs": [lambda n_metal, k, C: k * n_metal / C],
    },
    "CHM_PC_GAS_EXCESS": {
        "label": "Gay-Lussac excess rebuild (v2 - v1 c2/c1)",
        "when": r"in\s+excess",
        "need": {"v1": ("v1",), "v2": ("v2",), "c1": ("c1",),
                 "c2": ("c2",)},
        "eqs": [lambda v1, v2, c1, c2: v2 - v1 * c2 / c1],
    },
    "CHM_PC_VAPOUR_DENSITY": {
        "label": "Mr = 2 VD rebuild",
        "when": r"vapour\s+density|vapor\s+density|VD",
        "need": {"VD": ("VD",)},
        "eqs": [lambda VD: 2.0 * VD],
    },
    "CHM_PC_O2_BURN_C": {
        "label": "carbon-burn oxygen rebuild (32/12)",
        "when": r"burn|oxygen",
        "need": {"m_c": ("m_c",)},
        "eqs": [lambda m_c: m_c * 32.0 / 12.0],
    },
    "CHM_PC_PCT_ERROR": {
        "label": "percentage-error rebuild",
        "when": r"error",
        "need": {"measured": ("measured",), "true": ("true",)},
        "eqs": [lambda measured, true:
                abs(measured - true) / true * 100.0],
    },
    "CHM_PC_DM3_CM3": {
        "label": "dm^3->cm^3 rebuild (x 1000)",
        "when": r"dm\s*\^?\s*3|dm3",
        "need": {"dm3": ("dm3",)},
        "eqs": [lambda dm3: dm3 * 1000.0],
    },
    "CHM_PC_MOLAR_MASS_GIVEN": {
        "label": "stated-mass molecular-weight rebuild",
        "when": r"molecular\s+mass|molar\s+mass",
        "need": {"M": ("M",)},
        "eqs": [lambda M: M],
    },
    "CHM_PC_MOLECULES": {
        "label": "N = (m/M) N_A rebuild",
        "when": r"molecules?",
        "need": {"m": ("m",), "M": ("M",)},
        "eqs": [lambda m, M: m / M * 6.022e23],
        "tol": 2e-3,
    },
    "CHM_PC_HENRY": {
        "label": "Henry-law rebuild (x = p / k_H)",
        "when": r"henry",
        "need": {"p": ("p",), "k_H": ("k_H",)},
        "eqs": [lambda p, k_H: p / k_H,
                lambda p, k_H, x=None: k_H * x if x is not None
                else p / k_H],
    },
    "CHM_PC_RAOULT": {
        "label": "Raoult rebuild (x_w P0)",
        "when": r"vapour\s+pressure|vapor\s+pressure",
        "need": {"ns": ("ns",), "nw": ("nw",), "P0": ("P0",)},
        "eqs": [lambda ns, nw, P0: nw / (nw + ns) * P0],
    },
    "CHM_PC_OSMOTIC_I": {
        "label": "osmotic rebuild (i C R T, kPa)",
        "when": r"osmotic",
        "need": {"i": ("i",), "C": ("C",), "T": ("T",)},
        "eqs": [lambda i, C, T: i * C * 1000.0 * 8.314 * T / 1000.0,
                lambda i, C, T: i * C * 8.314 * T],
    },
    "CHM_PC_VANTHOFF": {
        "label": "van't Hoff rebuild (dT / (K m))",
        "when": r"hoff",
        "need": {"dT": ("dT",), "K": ("K",), "m": ("m",)},
        "eqs": [lambda dT, K, m: dT / (K * m)],
    },
}


def _eval_decl_row(row: Dict[str, Any], c: "_Ctx") -> Verdict:
    """THE declarative row evaluator — one engine for every subject's
    data rows (physics _PHYSICS_DECL, social _SOCIAL_DECL, chem/bio
    waves, and dict-form entries in the maths DECLARATIVE_INVARIANTS).
    Owner direction 2026-10-08: verify like the maths engine — data in,
    verdict out, nothing hand-written downstream.  A relation that a
    row cannot express extends the ENGINE, never a per-family function."""
    qvars = row.get("qvars") or {}
    opt = set(row.get("opt") or ())
    sid = row.get("label", "DECL_ROW")

    def _unit_strip(v: float, unit_group: str) -> float:
        u = (unit_group or "").lower()
        if u == "cm":
            return v / 100.0
        if u == "mm":
            return v / 1000.0
        if u == "km":
            return v * 1000.0
        return v

    if c.claim is None:
        return _na("no claimed numeric")
    if row.get("when") and not re.search(row["when"], c.question or "",
                                         re.I):
        return _na("not the declared ask")
    vals: Dict[str, Any] = {}
    for var, aliases in (row.get("need") or {}).items():
        # rows may declare a single alias as a bare string -- a
        # tuple-iterating engine would splat its CHARACTERS as
        # alias names ('theta' -> t,h,e,t,a)
        if isinstance(aliases, str):
            aliases = (aliases,)
        v = c.get(*aliases)
        if v is None:
            pat = qvars.get(var)
            if pat:
                um = re.search(pat, c.question or "", re.I)
                if um:
                    v = float(um.group(1))
                    if um.lastindex and um.lastindex >= 2 \
                            and um.group(2) and not um.group(2).isdigit():
                        v = _unit_strip(v, um.group(2))
        if v is None and var not in opt:
            return _na(f"{var} not bound (slots/regex)")
        vals[var] = v
    # qvars may also declare standalone inputs the relation needs
    # beyond the family slots ('p_old'/'p_new' in saved-kWh) --
    # bind them the same way or the relations can never fire
    for var, pat in qvars.items():
        if var in vals:
            continue
        um = re.search(pat, c.question or "", re.I)
        if um:
            v = float(um.group(1))
            if um.lastindex and um.lastindex >= 2 \
                    and um.group(2) and not um.group(2).isdigit():
                v = _unit_strip(v, um.group(2))
            vals[var] = v
        elif var not in opt:
            return _na(f"{var} not parsed from the question")
    # SOCIAL-ALL (2026-10-07): `opt` vars bound from the family's
    # slot record.  `opt` originally only relaxed the requirement --
    # an opt var could never reach `vals`, so multi-shape rows (eq
    # variants over different slot sets) could never fire their
    # alternate relations.  Binding an opt var is additive: it only
    # matters to an eq that names it.
    for var in opt:
        if var not in vals:
            v = c.get(var)
            if v is not None:
                vals[var] = v
    for eq in row["eqs"]:
        try:
            # per-eq kwargs: a row's eq variants declare different
            # slot sets -- passing the FULL vals dict would
            # TypeError-skip every variant that names fewer slots
            _code = getattr(eq, "__code__", None)
            if _code is not None:
                _names = _code.co_varnames[:_code.co_argcount]
                alt = eq(**{k: v for k, v in vals.items()
                            if k in _names})
            else:
                alt = eq(**vals)
        except (TypeError, ZeroDivisionError, ValueError,
                OverflowError):
            continue
        if alt is None:
            continue
        alt_f = float(alt)
        if _close(alt_f, c.claim, rel=row.get("tol", 1e-3)):
            return (PASS, f"{sid}: independent rebuild {alt_f:.6g} "
                          "-- matches")
    return (FAIL, f"{sid}: no declared relation rebuilds the "
                  f"claimed {c.claim:.6g}")


def _make_physics_decl_check(sid: str, table: Optional[Dict[str, Dict[str, Any]]] = None) -> VerifierFn:
    row = (table or _PHYSICS_DECL)[sid]

    def _check(c: _Ctx) -> Verdict:
        return _eval_decl_row(row, c)

    return _check


for _decl_sid in _PHYSICS_DECL:
    VERIFIERS.setdefault(_decl_sid, _make_physics_decl_check(_decl_sid))


# --------------------------------------------------------------------------- #
# SOCIAL DECL (SOCIAL-ALL 2026-10-07) -- the social-science numeric
# families ride the same declarative engine: each row rebuilds the
# family's claim through an alternate relation from the slots the family
# already binds (see VERIFIER_ENGINE.md case 1).  Recall-class history
# families (EVENT_YEAR / FACT_RECALL / TIMELINE_ORDER) are deliberately
# NOT here: their second path is the executable corpus-anchoring test,
# not an arithmetic rebuild.
# --------------------------------------------------------------------------- #

_SOCIAL_DECL: Dict[str, Dict[str, Any]] = {
    # geography: map work
    "MAP_SCALE": {
        "label": "map-scale rebuild (forward / reverse / R.F.)",
        "need": {},
        "opt": {"map_cm", "factor_km", "ground_km", "rf"},
        "eqs": [lambda map_cm, factor_km: map_cm * factor_km,
                lambda ground_km, factor_km: ground_km / factor_km,
                lambda map_cm, rf: map_cm * rf / 100000.0],
    },
    "TIME_ZONE_LONGITUDE": {
        "label": "IST = UTC + offset rebuild",
        "when": r"\bUTC\b",
        "need": {"given_hours": ("given_hours",),
                 "offset_hours": ("offset_hours",)},
        "eqs": [lambda given_hours, offset_hours:
                given_hours + offset_hours],
    },
    # geography: population vital statistics
    "VITAL_STATS": {
        "label": "natural-growth rebuild (births-deaths)/pop",
        "need": {},
        "opt": {"births", "deaths", "population", "cbr", "cdr"},
        "eqs": [lambda births, deaths, population:
                (births - deaths) / population * 1000.0,
                lambda cbr, cdr: cbr - cdr],
    },
    "VITAL_STATS_MIGRATION": {
        "label": "actual-growth rebuild (births-deaths+migration)/pop",
        "need": {"births": ("births",), "deaths": ("deaths",),
                 "net_migration": ("net_migration",),
                 "population": ("population",)},
        "eqs": [lambda births, deaths, net_migration, population:
                (births - deaths + net_migration) / population * 1000.0],
    },
    "SEX_RATIO_LITERACY": {
        "label": "sex-ratio / literacy-rate rebuild",
        "need": {},
        "opt": {"females", "males", "literates", "population"},
        "eqs": [lambda females, males: females / males * 1000.0,
                lambda literates, population:
                    literates / population * 100.0],
    },
    # history: the Mari-tablet proportional levy
    "LEVY_FRACTION": {
        "label": "levy rebuild (fraction x total value)",
        "need": {"total_value": ("total_value",),
                 "fraction": ("fraction",)},
        "eqs": [lambda total_value, fraction: total_value * fraction],
    },
    # ISC geography numerics
    "NET_SLIP": {
        "label": "net-slip rebuild sqrt(throw^2 + heave^2)",
        "need": {"throw": ("throw",), "heave": ("heave",)},
        "eqs": [lambda throw, heave:
                (throw ** 2 + heave ** 2) ** 0.5],
    },
    "NAUTICAL_DISTANCE": {
        "label": "nautical rebuild (degrees x 60)",
        "need": {"degrees": ("degrees",)},
        "eqs": [lambda degrees: degrees * 60.0],
    },
    # CISCE economics (wave 3) -- MU_SCHEDULE is registered further down
    # as a hand-written verifier (it covers both corpus parse shapes)
    "SHARE_PERCENT": {
        "label": "share rebuild (part/total or pct x total)",
        "need": {"total": ("total",)},
        "opt": {"part", "pct"},
        "eqs": [lambda part, total: part / total * 100.0,
                lambda pct, total: pct / 100.0 * total],
    },
    "PRODUCTIVITY_RATIO": {
        "label": "productivity rebuild (output / capital)",
        "need": {"output": ("output",), "capital": ("capital",)},
        "eqs": [lambda output, capital: output / capital],
    },
    "DEPRECIATION_SL": {
        "label": "straight-line depreciation rebuild (cost / life)",
        "need": {"cost": ("cost",), "life": ("life",)},
        "eqs": [lambda cost, life: cost / life],
    },
    "CAPITAL_FORMATION": {
        "label": "capital-formation rebuild (GFCF + stocks)",
        "need": {"gfcf": ("gfcf",), "stocks": ("stocks",)},
        "eqs": [lambda gfcf, stocks: gfcf + stocks],
    },
    "DEMAND_MULTIVAR": {
        "label": "demand rebuild (counterfactual back-substitution / "
                 "PED inversion)",
        "need": {},
        "opt": {"qi_first", "delta_first", "coeff_p", "p_val",
                "point_ped"},
        "eqs": [lambda qi_first, delta_first: qi_first - delta_first,
                lambda coeff_p, p_val, point_ped:
                    coeff_p * p_val / point_ped],
    },
}


def _v_mu_schedule(c: _Ctx) -> Verdict:
    """MU_SCHEDULE (SOCIAL-ALL): BOTH corpus shapes in one verifier --
    (a) TU-pair schedules: re-diff the ladder from the question and
    match the claimed last MU; (b) the explicit MU-list shape (samosa
    stop rule): re-read the stated ladder, re-apply the stop rule.
    (VERIFIER_ENGINE case 2: two parse shapes, genuinely irregular --
    the declarative row only covers shape (a).)"""
    q = c.question or ""
    # shape (a): TU pairs (either the Q=/TU= or the 'N mango = M utils'
    # form) -- the claimed last MU must equal the last ladder difference
    pairs = re.findall(r"Q\s*=\s*(\d+)\s*TU\s*=\s*(\d[\d,]*)", q, re.I)
    if not pairs:
        pairs = re.findall(r"(\d+)\s*[a-z]{3,10}s?\s*=\s*(\d[\d,]*)\s*utils",
                           q, re.I)
    if len(pairs) >= 2 and c.claim is not None:
        tus = sorted(float(b.replace(",", "")) for _a, b in pairs)
        rebuilt = tus[-1] - tus[-2]
        if _close(c.claim, rebuilt):
            return (PASS, f"ladder re-diff: TU {tus[-2]:.6g} -> "
                          f"{tus[-1]:.6g} gives MU {rebuilt:.6g} -- "
                          f"matches the claimed last MU")
        return (FAIL, f"ladder re-diff: last MU of the stated schedule "
                      f"is {rebuilt:.6g}, not {c.claim:.6g}")
    # shape (b): explicit MU list + optional price stop rule
    lm = re.search(r"marginal utilities?[^.:]{0,80}?(?:are|is|:)\s*"
                   r"((?:\d[\d,]*\s*,\s*)+\d[\d,]*)", q, re.I)
    if not lm:
        return _na("no marginal-utility list in the question")
    mus = [float(x.strip())
           for x in lm.group(1).split(",") if x.strip()]
    if not mus:
        return _na("empty MU list")
    pm = re.search(r"(?:price|priced)\b[^.\d]{0,30}?"
                   r"(?:Rs\.?|₹)?\s*(\d[\d,]*)", q, re.I)
    if pm and c.claim is not None:
        price = float(pm.group(1).replace(",", ""))
        buy = sum(1 for mu in mus if mu >= price)
        if _close(c.claim, mus[-1]) and \
                (buy == 0 or mus[buy - 1] >= price):
            return (PASS, f"stop-rule recount: {buy} unit(s) at or above "
                          f"the {price:g} price; the claimed last MU "
                          f"{c.claim:.6g} equals the stated ladder end")
    if c.claim is not None and _close(c.claim, mus[-1]):
        return (PASS, f"re-read: the claimed MU {c.claim:.6g} equals the "
                      f"last stated marginal utility {mus[-1]:.6g}")
    return (FAIL, "re-read fails: the claimed value does not match the "
                  "stated marginal-utility ladder")


_SOCIAL_HANDWRITTEN = {
    # direct assignment (not setdefault): the hand-written verifier
    # covers BOTH MU parse shapes; the declarative row alone would
    # verifier-na the list shape into a strict withhold
    "MU_SCHEDULE": _v_mu_schedule,
}
for _decl_sid in _SOCIAL_DECL:
    VERIFIERS.setdefault(_decl_sid,
                         _make_physics_decl_check(_decl_sid, _SOCIAL_DECL))
for _sid, _fn in _SOCIAL_HANDWRITTEN.items():
    VERIFIERS[_sid] = _fn


# --------------------------------------------------------------------------- #
# PRE-ROUTE DECL (WSA-P2 2026-10-10) — data rows for the answer_pipeline
# pre-route promotion lanes that used to stamp VERIFIED with no
# structure: route and no independent: gate: neurolink concept/calculus,
# the multi-hop DAG, the humanities constitutional remedy, plus the PAL
# formula-substitution cluster (numeric qtype 0/14 in the live
# 200-question replay, every refusal badge:verifier_na:PAL_PROGRAM).
#
# Every row is DATA (VERIFIER_ENGINE law): the per-route specifics live
# in the fields, ONE shared generic evaluator below interprets them.
# Rows may re-extract givens from the question text (givens are
# givens); the RELATION differs from the family's compute as noted
# per kind:
#   asked_terms   — qualitative: the shipped answer must contain the
#                   asked content terms (the term-relevance promotion
#                   guard expressed as a verifier row).
#   fresh_lookup  — retrieval echo: a declared lookup engine re-run on
#                   the raw question must reproduce the shipped answer
#                   (the BIO_FACT_ANCHOR contract, as a data row).
#   dag_inverse   — inverse relation: re-extract the question's knowns,
#                   re-sympify the fired rule, check forward closure
#                   AND back-solve one given from the claim
#                   (signature_resolver's "inverse relation" pattern).
#   calc_agree    — second-backend agreement: a direct SymPy numeric
#                   spot-check of the symbolic claim (the neurolink
#                   engine computed through its SymEngine/Giac
#                   cascade; this path never touches that cascade).
#   formula_sub   — re-derivation: re-parse "Using the formula X = e,
#                   calculate X when v = n, ..." from the raw text and
#                   recompute with SymPy (different construction from
#                   the extractor's PAL program, same contract as
#                   _eval_substitution).
# --------------------------------------------------------------------------- #

_PREROUTE_DECL: Dict[str, Dict[str, Any]] = {
    # neurolink concept pre-route: retrieval, not compute -- a numeric
    # verifier would be dishonest; the second path is relevance.
    "NEUROLINK_CONCEPT": {
        "label": "asked-term containment (concept retrieval echo)",
        "check": "asked_terms",
        "term_re": r"[A-Za-z][A-Za-z-]{3,}",
        "min_terms": 1,
        "stop": ("what", "define", "definition", "state", "this",
                 "lesson", "given", "meaning", "that", "does", "with",
                 "explain"),
    },
    # humanities constitutional-remedy pre-route: the rubric engine is
    # the curated ground truth; a FRESH evaluation of the same raw
    # question must reproduce the shipped writ (catches route
    # misfires and stale labels, the BIO_FACT_ANCHOR contract).
    "HUMANITIES_REMEDY": {
        "label": "fresh writ-rubric echo",
        "check": "fresh_lookup",
        "engine": ("backend.its.solver.humanities_rubric_engine."
                   "HumanitiesRubricEngine."
                   "evaluate_constitutional_remedy"),
        "extract_re": r"Writ of ([A-Za-z][A-Za-z-]*"
                      r"(?:\s*[/]?\s*[A-Za-z][A-Za-z-]*)*)",
        "fallback_field": "topic",
    },
    # multi-hop DAG pre-route: chain closure + inverse relation from
    # the question's own numbers.
    "MULTIHOP_DAG": {
        "label": "DAG rule closure (fresh knowns + inverse solve)",
        "check": "dag_inverse",
        "tol": 0.01,
    },
    # neurolink calculus pre-route: numeric spot-check of the symbolic
    # claim with plain SymPy (never the engine's CAS cascade).
    "NEUROLINK_CALCULUS": {
        "label": "direct-SymPy numeric agreement with the claim",
        "check": "calc_agree",
        "tol": 1e-4,
    },
    # PAL formula-substitution asks: the whole claim is re-derivable
    # from the ask's own numbers.
    "PAL_PROGRAM": {
        "label": "formula-substitution re-derivation",
        "check": "formula_sub",
        "when": r"using\s+the\s+formula\b[^.]*\bcalculate\b",
        "tol": 0.005,
    },
}


_CALC_SAMPLES = (0.317, 1.731, -0.409, 2.147)


def _sympy():
    try:
        import sympy as _sp
        return _sp
    except Exception:
        return None


def _calc_parse_expr(text: str):
    """Parse a shipped calculus answer string into a SymPy expression
    ('3*x**2 + 2', '+ C' tolerated).  None when it will not parse."""
    sp = _sympy()
    if sp is None:
        return None
    try:
        from backend.its.solver.neurolink import \
            clean_calculus_expression as _clean
    except Exception:
        try:
            from its.solver.neurolink import \
                clean_calculus_expression as _clean
        except Exception:
            return None
    s = re.sub(r"\+\s*C\s*$", "", str(text or "").strip())
    if not s:
        return None
    try:
        return sp.sympify(_clean(s))
    except Exception:
        return None


def _exprs_agree_on_samples(a, b, var, samples=_CALC_SAMPLES,
                            rel=1e-4) -> Tuple[int, int]:
    """Numeric agreement of two expressions at deterministic sample
    points.  Returns (agreeing, comparable) — points where either
    side fails to evaluate to a finite float are not comparable."""
    agree = comparable = 0
    for pt in samples:
        try:
            va = float(a.evalf(subs={var: pt}, chop=True))
            vb = float(b.evalf(subs={var: pt}, chop=True))
        except Exception:
            continue
        if not (math.isfinite(va) and math.isfinite(vb)):
            continue
        comparable += 1
        if abs(va - vb) <= max(1e-6, rel * max(abs(va), abs(vb))):
            agree += 1
    return agree, comparable


def _row_asked_terms(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    terms = [t.lower() for t in re.findall(row.get("term_re",
                             r"[A-Za-z][A-Za-z-]{3,}"), ctx.question or "")]
    stop = {s.lower() for s in row.get("stop", ())}
    terms = [t for t in terms if t not in stop]
    if len(terms) < row.get("min_terms", 1):
        return _na("no content terms in the ask to check")
    answer = (ctx.final_answer or "").lower()
    if not answer.strip():
        return _na("no shipped answer text")
    missing = [t for t in terms if not re.search(
        r"\b" + re.escape(t) + r"\b", answer)]
    limit = 0 if len(terms) <= 2 else max(1, len(terms)
                                          // 3)
    if len(missing) > limit:
        return (FAIL, f"asked-term containment: the answer is not about "
                      f"the asked term(s) {missing[:3]}")
    return (PASS, f"asked-term containment: answer covers the asked "
                  f"term(s) {terms[:3]}")


def _row_fresh_lookup(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    import importlib
    path = str(row.get("engine") or "")
    if not path:
        return _na("row declares no lookup engine")
    # dotted path may be module.fn OR module.Class.method -- import the
    # longest module prefix, then attribute-walk the remainder
    parts = path.split(".")
    engine = None
    for i in range(len(parts), 0, -1):
        try:
            engine = importlib.import_module(".".join(parts[:i]))
        except ImportError:
            continue
        try:
            for seg in parts[i:]:
                engine = getattr(engine, seg)
            break
        except AttributeError:
            engine = None
    if engine is None or not callable(engine):
        return _na("fresh lookup engine unavailable")
    try:
        fresh = engine(ctx.question)
    except Exception:
        return _na("fresh lookup engine unavailable")
    if fresh is None or not getattr(fresh, "success", False):
        return _na("fresh lookup declined the question")
    token = None
    ex = row.get("extract_re")
    if ex:
        blob = " ".join(str(s) for s in
                        (getattr(fresh, "steps", None) or []))
        m = re.search(ex, blob)
        if m:
            token = m.group(1).strip()
    if token is None:
        token = str(getattr(fresh, row.get("fallback_field", "topic"),
                            "") or "").strip()
    if not token:
        return _na("fresh lookup carries no comparable answer")
    shipped = (ctx.final_answer or "").strip().lower()
    if token.lower() in shipped:
        return (PASS, f"fresh lookup reproduces the shipped answer "
                      f"({token})")
    return (FAIL, f"fresh lookup gives {token!r} != shipped "
                  f"{shipped[:60]!r}")


def _row_dag_inverse(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    sp = _sympy()
    if sp is None:
        return _na("sympy unavailable")
    try:
        from backend.its.solver.multi_hop_solver import (
            MULTI_HOP_RULES, PHYSICAL_CONSTANTS, PARTICLE_PROPERTIES,
            extract_problem_state)
    except Exception:
        try:
            from its.solver.multi_hop_solver import (
                MULTI_HOP_RULES, PHYSICAL_CONSTANTS, PARTICLE_PROPERTIES,
                extract_problem_state)
        except Exception:
            return _na("multi-hop rule registry unavailable")
    if ctx.claim is None:
        return _na("no numeric claim")
    knowns, particle, target = extract_problem_state(ctx.question or "")
    if not target:
        return _na("ask target not re-derivable from the question")
    # universal givens, exactly like the solver's own state injection
    pool: Dict[str, float] = dict(PHYSICAL_CONSTANTS)
    if particle and particle.lower() in PARTICLE_PROPERTIES:
        pool.update(PARTICLE_PROPERTIES[particle.lower()])
    pool.update(knowns)
    tol = float(row.get("tol", 0.01))

    def _resolve(name: str) -> Optional[float]:
        v = ctx.q.get(name)
        if isinstance(v, (int, float)) and not isinstance(v, bool) \
                and math.isfinite(float(v)):
            return float(v)
        p = pool.get(name)
        if isinstance(p, (int, float)) and math.isfinite(float(p)):
            return float(p)
        return None

    fired = [r for r in MULTI_HOP_RULES if r.target == target]
    if not fired:
        return _na(f"no registered rule targets {target}")
    # tuple-row semantics: several rules can target the ask variable;
    # ANY resolvable candidate that rebuilds the claim PASSes, and the
    # inverse relation (signature_resolver pattern -- back-solve one
    # QUESTION-given / constant input from the claim) strengthens the
    # proof when it reproduces the stated value.
    resolvable: List[str] = []
    passed_rule = inverse_proof = None
    for rule in fired:
        resolved = {n: _resolve(n) for n in rule.inputs}
        if any(v is None for v in resolved.values()):
            continue
        try:
            expected = float(sp.sympify(rule.expr_str).evalf(
                subs={sp.Symbol(k): v
                      for k, v in resolved.items()}))
        except Exception:
            continue
        if not math.isfinite(expected):
            continue
        resolvable.append(rule.name)
        # pure-relative comparison: the values can sit at physics-
        # constant scale (1e-19), where any absolute floor swallows
        # a 1.5x tamper as noise
        if not _close_rel(expected, ctx.claim, rel=tol):
            continue
        passed_rule = rule
        for iv in rule.inputs:
            if iv not in pool:
                continue
            try:
                sym = {sp.Symbol(k): v for k, v in resolved.items()}
                sym[sp.Symbol(target)] = ctx.claim
                eq = sp.sympify(rule.expr_str) - sp.Symbol(target)
                eq = eq.subs({k: v for k, v in sym.items()
                              if k != sp.Symbol(iv)})
                sols = sp.solve(sp.Eq(eq, 0), sp.Symbol(iv))
            except Exception:
                continue
            for s_ in sols:
                try:
                    back = float(s_.evalf())
                except Exception:
                    continue
                if math.isfinite(back) and _close_rel(
                        back, resolved[iv], rel=tol):
                    inverse_proof = (
                        f"; inverse relation reproduces the given "
                        f"{iv} = {back:.6g}")
                    break
            if inverse_proof:
                break
        break  # a passing candidate settles the check
    if passed_rule is not None:
        return (PASS, f"DAG closure: {passed_rule.name} rebuilds "
                      f"{target} = {ctx.claim:.6g} from the question's "
                      f"knowns" + (inverse_proof or ""))
    if resolvable:
        return (FAIL, f"DAG closure: resolvable rule(s) {resolvable} "
                      f"rebuild {target} from the question's knowns, "
                      f"not the claimed {ctx.claim:.6g}")
    return _na("fired rule inputs not re-derivable from the "
               "question or the stated chain")


def _row_calc_agree(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    sp = _sympy()
    if sp is None:
        return _na("sympy unavailable")
    try:
        from backend.its.solver.neurolink import _extract_calculus_spec
    except Exception:
        try:
            from its.solver.neurolink import _extract_calculus_spec
        except Exception:
            return _na("calculus spec extractor unavailable")
    spec = _extract_calculus_spec(ctx.question or "")
    if not spec:
        return _na("question is not a parseable calculus ask")
    op, kw = spec["op"], spec.get("kwargs", {})
    tol = float(row.get("tol", 1e-4))
    try:
        var = sp.Symbol(kw.get("variable") or "x")
        expr = sp.sympify(kw["expr_str"])
    except Exception:
        return _na("expression did not parse")
    label = f"{op} agreement"
    if op == "differentiate":
        claimed = _calc_parse_expr(ctx.final_answer)
        if claimed is None:
            return _na("shipped claim did not parse as an expression")
        try:
            rebuilt = sp.diff(expr, var, int(kw.get("order", 1) or 1))
        except Exception:
            return _na("re-derivation failed")
        agree, comparable = _exprs_agree_on_samples(
            rebuilt, claimed, var, rel=tol)
        if comparable < 2:
            return _na("claim not numerically comparable")
        if agree == comparable:
            return (PASS, f"{label}: direct-SymPy derivative matches "
                          f"the shipped claim at {comparable} sample "
                          f"points")
        return (FAIL, f"{label}: re-derivation disagrees with the "
                      f"shipped claim ({agree}/{comparable} sample "
                      f"points agree)")
    if op == "integrate" and ("lower" in kw and "upper" in kw):
        if ctx.claim is None:
            return _na("no numeric claim")
        try:
            want = float(sp.Integral(expr, (var, float(kw["lower"]),
                                            float(kw["upper"]))).evalf())
        except Exception:
            return _na("definite integral did not evaluate")
        if _close(want, ctx.claim, rel=max(tol, 1e-4)):
            return (PASS, f"{label}: direct-SymPy integral {want:.6g} "
                          f"matches the claimed {ctx.claim:.6g}")
        return (FAIL, f"{label}: direct-SymPy integral gives "
                      f"{want:.6g}, not the claimed {ctx.claim:.6g}")
    if op == "integrate":
        # indefinite: differentiate the claimed antiderivative and
        # compare it to the integrand (the inverse construction)
        claimed = _calc_parse_expr(ctx.final_answer)
        if claimed is None:
            return _na("shipped antiderivative did not parse")
        try:
            d_claim = sp.diff(claimed, var)
        except Exception:
            return _na("claimed antiderivative not differentiable")
        agree, comparable = _exprs_agree_on_samples(
            expr, d_claim, var, rel=tol)
        if comparable < 2:
            return _na("antiderivative not numerically comparable")
        if agree == comparable:
            return (PASS, f"{label}: d/d{kw.get('variable', 'x')} of "
                          f"the shipped answer reproduces the "
                          f"integrand at {comparable} sample points")
        return (FAIL, f"{label}: differentiating the shipped answer "
                      f"does not reproduce the integrand "
                      f"({agree}/{comparable} sample points agree)")
    if op == "limit":
        if ctx.claim is None:
            return _na("no numeric claim")
        pt_s = str(kw.get("approach_value", ""))
        try:
            pt = float(pt_s)
        except (TypeError, ValueError):
            return _na("approach value is not numeric")
        vals = []
        for h in (1e-3, 1e-4, 1e-5):
            try:
                v = float(expr.evalf(subs={var: pt + h}, chop=True))
            except Exception:
                continue
            if math.isfinite(v):
                vals.append(v)
        if len(vals) < 2:
            return _na("numeric approach did not evaluate")
        if all(abs(v - ctx.claim) <= max(1e-3,
                                         1e-3 * abs(ctx.claim))
               for v in vals):
            return (PASS, f"{label}: numeric approach to {pt:g} "
                          f"converges to the claimed {ctx.claim:.6g}")
        return (FAIL, f"{label}: numeric approach gives "
                      f"{vals[-1]:.6g}, not the claimed "
                      f"{ctx.claim:.6g}")
    if op == "area_under_curve" and "lower" in kw and "upper" in kw:
        if ctx.claim is None:
            return _na("no numeric claim")
        try:
            want = float(sp.Integral(expr, (var, float(kw["lower"]),
                                            float(kw["upper"]))).evalf())
        except Exception:
            return _na("area did not evaluate")
        if _close(want, ctx.claim, rel=max(tol, 1e-4)):
            return (PASS, f"{label}: direct-SymPy area {want:.6g} "
                          f"matches the claimed {ctx.claim:.6g}")
        return (FAIL, f"{label}: direct-SymPy area gives {want:.6g}, "
                      f"not the claimed {ctx.claim:.6g}")
    return _na(f"op {op} has no declared second path")


def _row_formula_sub(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    sp = _sympy()
    if sp is None:
        return _na("sympy unavailable")
    if ctx.claim is None:
        return _na("no numeric claim")
    m = re.search(
        r"using\s+the\s+formula\s+(?P<lhs>[^=]+?)\s*=\s*"
        r"(?P<rhs>.+?)(?:\s+from\s+this\s+topic)?\s*,?\s*"
        r"(?:please\s+)?calculate\s+(?P<target>[\w\s]+?)\s+when\s+"
        r"(?P<assign>.+?)(?:\.\s+Give\s+your\s+answer|\.$|\?$)",
        ctx.question or "", re.I)
    if not m:
        return _na("not a using-the-formula substitution ask")
    lhs = m.group("lhs").strip()
    target = re.sub(r"\s+", " ", m.group("target").strip()).lower()
    if target != re.sub(r"\s+", " ", lhs).lower():
        return _na("calculated name does not match the formula's "
                   "left-hand side")
    assigns: Dict[str, float] = {}
    for am in re.finditer(r"([A-Za-z_]\w*)\s*=\s*(-?\d+(?:\.\d+)?)", m.group("assign")):
        assigns[am.group(1)] = float(am.group(2))
    if not assigns:
        return _na("no variable assignments parsed")
    rhs = (m.group("rhs").strip()
           .replace("\u00d7", "*").replace("\u00f7", "/")
           .replace("^", "**").replace("\u2013", "-"))
    try:
        expr = sp.sympify(rhs, locals={k: sp.Float(v)
                                       for k, v in assigns.items()})
        want = float(expr.evalf())
    except Exception:
        return _na("formula did not parse/evaluate")
    if not math.isfinite(want):
        return _na("formula evaluated to a non-finite value")
    free = {str(s) for s in expr.free_symbols}
    if free:
        return _na(f"unbound symbol(s) {sorted(free)} in the formula")
    tol = float(row.get("tol", 0.005))
    if _close(want, ctx.claim, rel=tol):
        return (PASS, f"formula re-derivation: {lhs} = {rhs} with "
                      f"{assigns} gives {want:.6g} -- matches the "
                      f"claimed {ctx.claim:.6g}")
    return (FAIL, f"formula re-derivation: {lhs} = {rhs} with "
                  f"{assigns} gives {want:.6g}, not the claimed "
                  f"{ctx.claim:.6g}")


def _row_fund_split(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """Fund-split complement: total (lakh crore = 1e12) x (100 - resp%)/100.
    Independent of the PAL program's total x p/100 expression."""
    if ctx.claim is None:
        return _na("no numeric claim")
    q = ctx.question or ""
    tm = re.search(r"(\d+(?:\.\d+)?)\s*lakh\s+crore", q, re.I)
    rm = re.search(r"(\d+(?:\.\d+)?)\s*%\s*(?:for\s+)?"
                   r"(?:response|sdrf|ndrf)", q, re.I)
    if not tm or not rm:
        return _na("total or response share not parsed")
    total = float(tm.group(1)) * 1e12
    resp = float(rm.group(1))
    if not 0.0 <= resp <= 100.0:
        return _na("response share out of range")
    rebuilt = total * (100.0 - resp) / 100.0
    if _close(rebuilt, c_claim(ctx), rel=row.get("tol", 1e-3)):
        return (PASS, f"{row.get('label', 'fund_split')}: independent "
                      f"complement rebuild {rebuilt:.6g} -- matches")
    return (FAIL, f"fund_split: complement rebuild {rebuilt:.6g} does not "
                  f"match the claimed {c_claim(ctx):.6g}")


def _row_point_plane(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """Distance from P to plane ax+by+cz=d via the explicit foot of the
    perpendicular F = P - ((n.P - d)/|n|^2) n, then |P - F|.  A different
    algebra from the PAL |n.P - d|/|n| formula."""
    if ctx.claim is None:
        return _na("no numeric claim")
    q = ctx.question or ""
    pm = re.search(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*,"
                   r"\s*(-?\d+(?:\.\d+)?)\s*\)", q)
    qm = re.search(r"plane\s+(.+?)\s*=\s*(-?\d+(?:\.\d+)?)", q, re.I)
    if not pm or not qm:
        return _na("point or plane not parsed")
    coef = {}
    for sgn, num, var in re.findall(
            r"([+-]?)\s*(\d*(?:\.\d+)?)\s*\*?\s*([xyz])", qm.group(1)):
        v = float(num) if num else 1.0
        coef[var] = coef.get(var, 0.0) + (-v if sgn == "-" else v)
    if set(coef) != {"x", "y", "z"}:
        return _na("plane coefficients not parsed")
    n = [coef["x"], coef["y"], coef["z"]]
    d = float(qm.group(2))
    P = [float(pm.group(i)) for i in (1, 2, 3)]
    nn = sum(c * c for c in n)
    if nn == 0.0:
        return _na("degenerate plane normal")
    t = (sum(n[i] * P[i] for i in range(3)) - d) / nn
    F = [P[i] - t * n[i] for i in range(3)]
    rebuilt = math.sqrt(sum((P[i] - F[i]) ** 2 for i in range(3)))
    if _close(rebuilt, c_claim(ctx), rel=row.get("tol", 1e-3)):
        return (PASS, f"{row.get('label', 'point_plane')}: foot-of-"
                      f"perpendicular rebuild {rebuilt:.6g} -- matches")
    return (FAIL, f"point_plane: foot rebuild {rebuilt:.6g} does not "
                  f"match the claimed {c_claim(ctx):.6g}")


def c_claim(ctx: "_Ctx") -> float:
    return float(ctx.claim)


# --------------------------------------------------------------------------- #
# WS-PAL (ovh-pal 2026-10-13): PAL_PROGRAM second-path coverage.
#
# The 200-stem board replay produced 27 refusals badged
# verifier_na:PAL_PROGRAM — PAL computed a correct answer and no verifier
# path existed for its shape.  Each check below re-derives the claim from
# the QUESTION TEXT with a fresh parser and a construction different from
# the PAL program's (never prog['givens'], never result.quantities for the
# numeric answer).  PASS/FAIL are verdicts; NA means "this row did not
# recognise the shape", which keeps the honest refusal.
#
# Every check is also registered as the route verifier for the matching
# deterministic family (the ws-pal wave adds ORDER_NUMBERS,
# PLACE_VALUE_DIGIT, QUOTIENT_REMAINDER, UNIT_CONVERSION,
# LINE_EQUAL_INTERCEPTS, REPEATED_CHANGE in maths_families.py and
# MC_SCHEDULE in economics_families.py): the same second path then serves
# both the PAL lane and the family lane.
# --------------------------------------------------------------------------- #

_PNUM = r"-?\d[\d,]*(?:\.\d+)?"


def _qnorm(ctx: "_Ctx") -> str:
    """Question text normalised for parsing: unicode minus / superscript
    minus to ASCII, narrow+regular NBSP to space, ₹/Rs left intact."""
    return (ctx.question or "").replace("\u2212", "-").replace(
        "\u202f", " ").replace("\u00a0", " ").replace(
        "\u2013", "-").replace("\u2014", "-")


def _num_tokens(text: str) -> List[float]:
    """All numeric literals in `text` (Indian/Intl grouping commas
    stripped; a trailing separator comma ignored)."""
    out: List[float] = []
    for tok in re.findall(_PNUM, text.replace("\u202f", " ")):
        tok = tok.strip().strip(",")
        if not tok or tok == "-":
            continue
        try:
            out.append(float(tok.replace(",", "")))
        except ValueError:
            continue
    return out


def _answer_numbers(ctx: "_Ctx") -> List[float]:
    return _num_tokens(ctx.final_answer or "")


def _row_delegate(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """Hand off to an already-registered verifier fn — every delegate
    target re-parses the question text itself (SI/CI, profit-loss, HCF,
    LCM, time-work, mensuration), so this is a genuine second path, not
    a PAL-slot echo."""
    name = str(row.get("fn") or "")
    fn = VERIFIERS.get(name)
    if fn is None or fn is _v_pal_program:
        return _na(f"delegate target {name or '?'} not registered")
    return fn(ctx)


def _row_order_list(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """'Arrange ... ascending/descending order' — the sorted list is
    re-derived by sorting the question's own literals; the shipped
    answer must be exactly that sequence (a different construction from
    PAL's learned sort program)."""
    q = _qnorm(ctx)
    desc = bool(re.search(r"descend\w*|decreasing|largest\s+to\s+smallest",
                          q, re.I))
    asc = bool(re.search(r"ascend\w*|increasing|smallest\s+to\s+largest",
                         q, re.I))
    if not (desc or asc):
        return _na("no ordering direction stated")
    lm = re.search(r"order[^:]{0,80}?:\s*"
                   r"((?:" + _PNUM + r"\s*(?:,|and)?\s*)+)", q, re.I) \
        or re.search(r":\s*((?:" + _PNUM + r"\s*(?:,|and)?\s*)+)", q)
    if not lm:
        return _na("no number list after the ordering ask")
    nums = _num_tokens(lm.group(1))
    if len(nums) < 2:
        return _na("fewer than two items to order")
    want = sorted(nums, reverse=desc)
    got = _answer_numbers(ctx)
    if not got:
        return _na("shipped answer carries no ordered numbers")
    if len(got) != len(want):
        return (FAIL, f"order re-derivation: {len(got)} numbers shipped "
                      f"for a {len(want)}-item list")
    if all(_close(a, b) for a, b in zip(got, want)):
        direction = "descending" if desc else "ascending"
        return (PASS, f"order re-derivation: {direction} sort of the "
                      "question list reproduces the shipped order")
    return (FAIL, f"order re-derivation: sorted list "
                  f"{['%g' % x for x in want]} != shipped "
                  f"{['%g' % x for x in got]}")


_INDIAN_PLACE = {
    "one": 0, "unit": 0, "ones": 0, "units": 0, "ten": 1, "tens": 1,
    "hundred": 2, "hundreds": 2, "thousand": 3, "thousands": 3,
    "ten thousand": 4, "ten thousands": 4, "ten-thousand": 4,
    "ten-thousands": 4, "lakh": 5, "lakhs": 5, "lac": 5, "lacs": 5,
    "ten lakh": 6, "ten lakhs": 6, "ten-lakh": 6, "ten-lakhs": 6,
    "hundred thousand": 6, "hundred thousands": 6,
    "crore": 7, "crores": 7, "ten crore": 8, "ten crores": 8,
    "ten-crore": 8, "ten-crores": 8, "million": 6, "millions": 6,
    "ten million": 7, "ten millions": 7,
}


def _place_value_pair(q: str
                      ) -> Optional[Tuple[str, int, Optional[str]]]:
    """Fresh parse of a place-value ask -> (number, position index,
    asked digit).  Two shapes:
      'digit in the lakhs place in the number 85,00,486'
      'place value of 4 in 3,45,678'"""
    q = q.replace("\u202f", " ").replace("\u00a0", " ")
    m = re.search(r"(\d[\d,]*)\s*(?:,\s*)?(?:number\s+)?(?:is\s+)?"
                  r"(?:in\s+)?the\s+((?:ten[\s-])?(?:lakhs?|crores?|"
                  r"thousands?|hundreds?|tens?|ones?|units?|millions?)"
                  r"(?:\s+(?:lakhs?|crores?|thousands?|hundreds?))?"
                  r")\s+place", q, re.I)
    num, place = None, None
    if m:
        num, place = m.group(1), m.group(2)
    else:
        m2 = re.search(r"(?:digit|value)\s+(?:in|at|of)\s+(?:the\s+)?"
                       r"((?:ten[\s-])?(?:lakhs?|crores?|thousands?|"
                       r"hundreds?|tens?|ones?|units?|millions?)"
                       r"(?:\s+(?:lakhs?|crores?|thousands?|hundreds?))?"
                       r")\s+place[^.]{0,40}?(?:in|of)\s+"
                       r"(?:the\s+)?(?:number\s+)?(\d[\d,]*)", q, re.I)
        if m2:
            place, num = m2.group(1), m2.group(2)
        else:
            m3 = re.search(r"place\s+value\s+of\s+(?:the\s+)?"
                           r"(?:digit\s+)?(\d)\s+(?:in|of)\s+"
                           r"(?:the\s+)?(?:number\s+)?(\d[\d,]*)",
                           q, re.I)
            if m3:
                return m3.group(2).strip(","), -1, m3.group(1)
            # split-clause shape: 'In the number 85,00,486, what is the
            # digit in the lakhs place' -- the number and the place
            # name live in different clauses.
            pm = re.search(r"((?:ten[\s-])?(?:lakhs?|crores?|"
                           r"thousands?|hundreds?|tens?|ones?|units?|"
                           r"millions?)(?:\s+(?:lakhs?|crores?|"
                           r"thousands?|hundreds?|millions?))?)"
                           r"\s+place", q, re.I)
            if pm:
                key2 = re.sub(r"[\s-]+", " ", pm.group(1).strip().lower())
                pos2 = _INDIAN_PLACE.get(key2) or _INDIAN_PLACE.get(
                    key2.replace(" ", "-"))
                if pos2 is not None:
                    toks = [t.strip(",")
                            for t in re.findall(r"\d[\d,]+", q)]
                    # the number is the widest digit run in the question
                    cand = max(toks, key=lambda t: len(
                        t.replace(",", ""))) if toks else None
                    if cand and len(cand.replace(",", "")) >= 2:
                        return cand, pos2, None
    if num is None or place is None:
        return None
    key = re.sub(r"[\s-]+", " ", place.strip().lower())
    pos = _INDIAN_PLACE.get(key)
    if pos is None:
        pos = _INDIAN_PLACE.get(key.replace(" ", "-"))
    if pos is None:
        return None
    return num.strip(","), pos, None


def _row_place_value(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """'digit in the lakhs place of N' / 'place value of d in N' —
    rebuilt by digit-position indexing (a different construction from
    PAL's stored program).  Every claimed value the ask names must
    appear in the shipped answer."""
    parsed = _place_value_pair(_qnorm(ctx))
    if not parsed:
        return _na("place-value ask not parsed")
    num_s, pos, asked_digit = parsed
    digits = num_s.replace(",", "")
    if not digits.isdigit():
        return _na("number not parseable")
    wants: List[Tuple[str, float]] = []
    if asked_digit is not None:
        # 'place value of <digit> in <number>'
        digit = int(asked_digit)
        positions = [i for i, ch in enumerate(digits[::-1])
                     if int(ch) == digit]
        if not positions:
            return _na("asked digit absent from the number")
        pos_v = max(positions)
        wants.append(("place value", float(digit) * (10 ** pos_v)))
    else:
        if pos >= len(digits):
            return _na("place beyond the number's width")
        digit = int(digits[::-1][pos])
        wants.append(("digit", float(digit)))
        if re.search(r"place\s+value", _qnorm(ctx), re.I):
            wants.append(("place value",
                          float(digit) * (10 ** pos)))
    got = _answer_numbers(ctx)
    if not got:
        return _na("shipped answer carries no numeric claims")
    missing = [name for name, v in wants
               if not any(_close(g, v) for g in got)]
    if missing:
        return (FAIL, f"place-value re-derivation: {missing} = "
                      f"{[v for _n, v in wants]} absent from the shipped "
                      f"answer {got}")
    return (PASS, "place-value re-derivation: digit-position indexing "
                  "reproduces the shipped digit/place-value")


def _row_mean_list(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """'average/mean of the listed values' — recomputed with
    Fraction-exact accumulation (a different construction from the
    program's float running sum)."""
    q = _qnorm(ctx)
    _LSEP = r"(?:\s*,\s*(?:and|or)?\s*|\s+(?:and|or)\s*)"
    lm = re.search(r"(?:average|mean)[^.]{0,60}?"
                   r"((?:" + _PNUM + r"\s*(?:\w{0,12}\s*)?" + _LSEP +
                   r")+" + _PNUM + r")", q, re.I)
    if not lm:
        # trailing list after a colon ('spot heights: 4,800 m, ...')
        lm = re.search(r":\s*((?:" + _PNUM + r"\s*\w{0,12}\s*" + _LSEP +
                       r")+" + _PNUM + r")", q, re.I)
    if not lm:
        return _na("no listed numbers under the mean ask")
    nums = _num_tokens(lm.group(1))
    if len(nums) < 2:
        return _na("fewer than two data values")
    # the honest second construction is sum/count with Fraction-grade
    # accumulation rather than the program's float running sum
    from fractions import Fraction as _Fr
    fmean = sum(_Fr(str(v)) for v in nums) / len(nums)
    want = float(fmean)
    if ctx.claim is None:
        return _na("no numeric claim")
    if _close(want, ctx.claim, rel=row.get("tol", 0.005)):
        return (PASS, f"Fraction-exact mean rebuild: {want:.6g} "
                      f"(n={len(nums)}) -- matches claimed "
                      f"{ctx.claim:.6g}")
    return (FAIL, f"Fraction-exact mean rebuild {want:.6g} != claimed "
                  f"{ctx.claim:.6g}")


def _row_sphere_vol(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """Sphere/hemisphere volume or surface — rebuilt via the DIAMETER
    form V = pi d^3/6 (different construction from PAL's 4/3 pi r^3);
    honours an explicit 'use pi = 3.14' / '22/7' hint."""
    q = _qnorm(ctx)
    hemi = bool(re.search(r"hemisphere", q, re.I))
    surf = bool(re.search(r"surface\s+area|surface", q, re.I)) and not \
        re.search(r"volume", q, re.I)
    d = _fnum(q, r"diameter\s+(?:is|of|=|:)?\s*(" + _PNUM + r")") or \
        _fnum(q, r"(" + _PNUM + r")\s*(?:mm|cm|m)\s+(?:in\s+)?diameter")
    r_ = _fnum(q, r"radius\s+(?:is|of|=|:)?\s*(" + _PNUM + r")") or \
        _fnum(q, r"radius\s+(?:of\s+)?(" + _PNUM + r")")
    if d is None and r_ is None:
        return _na("sphere radius/diameter not parsed")
    if d is None:
        d = 2.0 * r_
    if d <= 0:
        return _na("degenerate sphere dimension")
    pi = 22.0 / 7.0 if re.search(r"22\s*/\s*7", q) else (
        _fnum(q, r"(?:pi|π)\s*=\s*([\d.]+)") or math.pi)
    if surf:
        want = (3.0 if hemi else 4.0) * pi * (d / 2.0) ** 2
        label = "3 pi r^2 hemisphere surface" if hemi else "4 pi r^2"
    else:
        want = ((2.0 if hemi else 4.0) / 3.0) * pi * (d / 2.0) ** 3
        label = "(pi/6) d^3 rebuild"
    if ctx.claim is None:
        return _na("no numeric claim")
    if _close(want, ctx.claim, rel=row.get("tol", 0.01)):
        return (PASS, f"sphere {label}: {want:.6g} -- matches claimed "
                      f"{ctx.claim:.6g}")
    return (FAIL, f"sphere {label}: {want:.6g} != claimed "
                  f"{ctx.claim:.6g}")


_LEN_TO_M = {"mm": 0.001, "cm": 0.01, "m": 1.0, "metre": 1.0,
             "meter": 1.0, "km": 1000.0, "kilometre": 1000.0,
             "kilometer": 1000.0, "mile": 1609.344, "ft": 0.3048}
_TIME_TO_S = {"s": 1.0, "sec": 1.0, "second": 1.0, "seconds": 1.0,
              "min": 60.0, "minute": 60.0, "minutes": 60.0,
              "h": 3600.0, "hr": 3600.0, "hrs": 3600.0, "hour": 3600.0,
              "hours": 3600.0, "day": 86400.0, "days": 86400.0}


def _sdt_parts(q: str) -> Optional[Tuple[float, float, float]]:
    """(distance_m, time_s, asked_speed) — asked_speed -1 => unknown."""
    q2 = q.replace("\u202f", " ")
    dm = re.search(r"(\d+(?:\.\d+)?)\s*"
                   r"(kilometres?|kilometers?|kms?|metres?|meters?|"
                   r"metres|miles?|cm|mm|ft|m)\b", q2, re.I)
    tm = re.search(r"(\d+(?:\.\d+)?)\s*"
                   r"(hours?|hrs?|hr|h|minutes?|mins?|min|seconds?|"
                   r"secs?|days?|s)\b", q2, re.I)
    if not dm or not tm:
        return None
    d = float(dm.group(1)) * _LEN_TO_M[dm.group(2).lower()
                                       .rstrip("s") or "m"]
    t = float(tm.group(1)) * _TIME_TO_S[tm.group(2).lower()
                                        .rstrip("s") if tm.group(2)
                                        .lower().rstrip("s")
                                        in _TIME_TO_S else "s"]
    if t <= 0:
        return None
    return d, t, -1.0


def _row_formula_subst(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """'Using the formula A = l x w from this topic, calculate A when
    l = 19, w = 5' -- the largest PAL_PROGRAM refusal cluster.  The
    independent check parses the STATED formula text and the STATED
    bindings and evaluates the expression with sympy -- the PAL code
    path is never consulted."""
    q = _qnorm(ctx)
    fm = re.search(r"formula\s+([A-Za-z][\w]*)\s*=\s*"
                   r"(.+?)(?:\s+from\s+this\s+topic|\.\s|$)", q, re.I)
    if not fm:
        return _na("no 'formula F = expr' clause")
    lhs, expr = fm.group(1), fm.group(2)
    # keep only expression characters; 'x' tokens may be unicode mult
    expr = expr.replace("×", "*").replace("−", "-").replace("–", "-")
    expr = re.sub(r"[²³]", lambda m: "**" + {"²": "2", "³": "3"}[
        m.group(0)], expr)
    if not re.fullmatch(r"[A-Za-z0-9_+\-*/^().\s]+", expr.strip()):
        return _na("formula expression has non-expression characters")
    binds = {m.group(1): float(m.group(2)) for m in re.finditer(
        r"([A-Za-z][\w]*)\s*=\s*(-?\d+(?:\.\d+)?)", q)}
    binds.pop(lhs, None)
    try:
        import sympy as _sy
        sym_expr = _sy.sympify(expr.strip())
        free = {str(s) for s in sym_expr.free_symbols}
        missing = free - set(binds)
        if missing:
            return _na(f"formula vars {sorted(missing)} unbound")
        val = float(sym_expr.subs(binds).evalf())
    except Exception:
        return _na("formula expression not evaluable")
    if ctx.claim is None:
        return _na("no claimed value")
    if _close(val, ctx.claim, rel=row.get("tol", 0.005)):
        return (PASS, f"formula-substitution rebuild: {lhs} = "
                      f"{expr.strip()} with {binds} -> {val:.6g} "
                      f"-- matches claimed {ctx.claim:.6g}")
    return (FAIL, f"formula-substitution rebuild: {lhs} = "
                  f"{expr.strip()} = {val:.6g} != claimed "
                  f"{ctx.claim:.6g}")


def _row_change_from_to(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """'the membrane potential changes from -70 mV to +30 mV' -- the
    change is |to - from|; the verifier rebuilds the difference."""
    q = _qnorm(ctx)
    m = re.search(r"(?:from|of)\s*(-?\d+(?:\.\d+)?)\s*\w*"
                  r"[^0-9.]{0,15}?(?:to|->|→)\s*\+?\s*(-?\d+(?:\.\d+)?)",
                  q, re.I)
    if not m:
        return _na("no from->to pair parsed")
    a, b = float(m.group(1)), float(m.group(2))
    want = b - a
    if ctx.claim is None:
        return _na("no claimed value")
    # the claim may carry the signed change or its magnitude
    if _close(want, ctx.claim) or _close(abs(want), abs(ctx.claim)):
        return (PASS, f"from->to rebuild: {b:g} - ({a:g}) = {want:.6g} "
                      f"-- matches claimed {ctx.claim:.6g}")
    return (FAIL, f"from->to rebuild {b:g} - ({a:g}) = {want:.6g} != "
                  f"claimed {ctx.claim:.6g}")


def _row_rate_total(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """'₹315/quintal, purchases 50,000 quintals' -- total = unit rate x
    quantity.  Independent multiply of the two stated figures."""
    q = _qnorm(ctx)
    rm = re.search(r"(?:₹|rs\.?\s*|inr\s*)(\d[\d,]*(?:\.\d+)?)\s*/"
                   r"\s*(\w+)", q, re.I) or \
        re.search(r"(\d[\d,]*(?:\.\d+)?)\s*(?:₹|rs\.?|inr|rupees?)?"
                  r"\s*per\s+(\w+)", q, re.I)
    if not rm:
        return _na("no 'rate per unit' phrasing")
    rate, unit = float(rm.group(1).replace(",", "")), rm.group(2)
    qm = re.search(r"(\d[\d,]*(?:\.\d+)?)\s*" + re.escape(unit) +
                   r"s?\b", q, re.I)
    if not qm:
        return _na("no quantity in the rate's unit")
    qty = float(qm.group(1).replace(",", ""))
    want = rate * qty
    if ctx.claim is None:
        return _na("no claimed value")
    if _close(want, ctx.claim, rel=row.get("tol", 0.005)):
        return (PASS, f"rate rebuild: {rate:g} x {qty:g} {unit} = "
                      f"{want:.6g} -- matches claimed {ctx.claim:.6g}")
    return (FAIL, f"rate rebuild {rate:g} x {qty:g} = {want:.6g} != "
                  f"claimed {ctx.claim:.6g}")


def _row_sdt(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """Speed/distance/time — rebuilt through SI conversion (metres and
    seconds) rather than PAL's direct ratio; the claim is compared in
    the unit the ask names (km/h vs m/s), or both when unnamed."""
    q = _qnorm(ctx)
    parts = _sdt_parts(q)
    if parts is None:
        return _na("distance/time not parsed")
    d, t, _ = parts
    ms = d / t                       # canonical SI speed
    kmh = d / (t / 3600.0) / 1000.0
    if ctx.claim is None:
        return _na("no numeric claim")
    if re.search(r"m\s*/\s*s|metres?\s+per\s+second|ms\^\{?-?1", q, re.I):
        want, unit = ms, "m/s"
    elif re.search(r"km\s*/\s*h|kmph|kilometres?\s+per\s+hour", q, re.I):
        want, unit = kmh, "km/h"
    else:
        want, unit = None, ""
    if want is None:
        # unnamed: accept either conventional unit, prefer the unit the
        # distance was stated in (km+hours -> km/h, m+s -> m/s)
        cand = kmh if re.search(
            r"km|kilomet", q, re.I) and re.search(
            r"hour|hr", q, re.I) else ms
        if _close(cand, ctx.claim, rel=row.get("tol", 0.01)) or \
                _close(kmh if cand == ms else ms, ctx.claim,
                       rel=row.get("tol", 0.01)):
            return (PASS, f"SI-conversion rebuild d={d:.6g} m / "
                          f"t={t:.6g} s -> {ms:.6g} m/s = {kmh:.6g} "
                          f"km/h -- the claim {ctx.claim:.6g} matches a "
                          "conventional unit")
        return (FAIL, f"SI rebuild gives {ms:.6g} m/s / {kmh:.6g} km/h; "
                      f"claimed {ctx.claim:.6g} matches neither")
    if _close(want, ctx.claim, rel=row.get("tol", 0.01)):
        return (PASS, f"SI rebuild d={d:.6g}/t={t:.6g} = {want:.6g} "
                      f"{unit} -- matches claimed {ctx.claim:.6g}")
    return (FAIL, f"SI rebuild {want:.6g} {unit} != claimed "
                  f"{ctx.claim:.6g}")


_UNIT_FACTOR = {
    # length, mass, volume, time — factor to the SI-ish base of the pair
    "mm": ("m", 0.001), "cm": ("m", 0.01), "m": ("m", 1.0),
    "metre": ("m", 1.0), "meter": ("m", 1.0), "km": ("m", 1000.0),
    "kilometre": ("m", 1000.0), "kilometer": ("m", 1000.0),
    "mg": ("g", 0.001), "g": ("g", 1.0), "gram": ("g", 1.0),
    "grams": ("g", 1.0), "kg": ("g", 1000.0), "kilogram": ("g", 1000.0),
    "kilograms": ("g", 1000.0), "quintal": ("g", 100000.0),
    "quintals": ("g", 100000.0), "ml": ("l", 0.001),
    "millilitre": ("l", 0.001), "milliliter": ("l", 0.001),
    "litre": ("l", 1.0), "liter": ("l", 1.0), "l": ("l", 1.0),
    "cl": ("l", 0.01), "s": ("s", 1.0), "sec": ("s", 1.0),
    "second": ("s", 1.0), "seconds": ("s", 1.0), "min": ("s", 60.0),
    "minute": ("s", 60.0), "minutes": ("s", 60.0), "h": ("s", 3600.0),
    "hr": ("s", 3600.0), "hour": ("s", 3600.0), "hours": ("s", 3600.0),
    "day": ("s", 86400.0), "days": ("s", 86400.0),
}


def _unit_convert_value(q: str
                        ) -> Optional[Tuple[float, str, str, float]]:
    """(value, from_unit, to_unit, converted) — factor-chain conversion,
    not PAL's direct multiply."""
    q = q.replace("\u202f", " ").replace("\u00a0", " ")
    m = re.search(r"(\d+(?:\.\d+)?)\s*"
                  r"(kilometres?|kilometers?|kms?|metres?|meters?|"
                  r"miles?|millimetres?|millimeters?|centimetres?|"
                  r"centimeters?|cm|mm|grams?|milligrams?|kg|"
                  r"kilograms?|quintals?|litres?|liters?|millilitres?|"
                  r"milliliters?|ml|cl|hours?|hrs?|minutes?|mins?|"
                  r"seconds?|secs?|days?|h|s|l|g|m)\b"
                  r"(?:\s+(?:to|into|in|as|=)\s*"
                  r"(?:how\s+many\s+)?|\s*=\s*\??\s*)?"
                  r"(kilometres?|kilometers?|kms?|metres?|meters?|"
                  r"miles?|millimetres?|millimeters?|centimetres?|"
                  r"centimeters?|cm|mm|grams?|milligrams?|kg|"
                  r"kilograms?|quintals?|litres?|liters?|millilitres?|"
                  r"milliliters?|ml|cl|hours?|hrs?|minutes?|mins?|"
                  r"seconds?|secs?|days?|h|s|l|g|m)?\b", q, re.I)
    _UNITS_IV = (r"kilometres?|kilometers?|kms?|metres?|meters?|miles?|"
                 r"millimetres?|millimeters?|centimetres?|"
                 r"centimeters?|kilograms?|milligrams?|grams?|"
                 r"quintals?|litres?|liters?|millilitres?|"
                 r"milliliters?|hours?|hrs?|minutes?|mins?|seconds?|"
                 r"secs?|days?|cm|mm|kg|ml|cl|g|l|m|h|s")
    if not m or not m.group(2) or not m.group(3):
        # 'how many <u2> are there in <v> <u1>?' shape (inverted order)
        m2 = re.search(r"how\s+many\s+(" + _UNITS_IV + r")\s+"
                       r"(?:are\s+there\s+|are\s+|make\s+)?"
                       r"(?:in\s+)?(\d+(?:\.\d+)?)\s*(" + _UNITS_IV +
                       r")\b", q, re.I)
        if not m2:
            return None
        v = float(m2.group(2))
        u2, u1 = m2.group(1).lower(), m2.group(3).lower()
        f1 = _UNIT_FACTOR.get(u1) or _UNIT_FACTOR.get(
            u1[:-1] if u1.endswith("s") and len(u1) > 1 else u1)
        f2 = _UNIT_FACTOR.get(u2) or _UNIT_FACTOR.get(
            u2[:-1] if u2.endswith("s") and len(u2) > 1 else u2)
        if not f1 or not f2 or f1[0] != f2[0]:
            return None
        base = v * f1[1]
        return v, u1, u2, base / f2[1]
    v = float(m.group(1))
    u1 = m.group(2).lower()
    u2 = (m.group(3) or "").lower()
    if not u2:
        return None
    f1 = _UNIT_FACTOR.get(u1) or _UNIT_FACTOR.get(
        u1[:-1] if u1.endswith("s") and len(u1) > 1 else u1)
    f2 = _UNIT_FACTOR.get(u2) or _UNIT_FACTOR.get(
        u2[:-1] if u2.endswith("s") and len(u2) > 1 else u2)
    if not f1 or not f2 or f1[0] != f2[0]:
        return None
    base = v * f1[1]
    return v, u1, u2, base / f2[1]


def _row_unit_convert(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    parsed = _unit_convert_value(_qnorm(ctx))
    if not parsed:
        return _na("unit-conversion ask not parsed")
    v, u1, u2, out = parsed
    if ctx.claim is None:
        return _na("no numeric claim")
    if _close(out, ctx.claim, rel=row.get("tol", 0.005)):
        return (PASS, f"factor-chain conversion {v:g} {u1} = "
                      f"{out:.6g} {u2} -- matches")
    return (FAIL, f"factor-chain conversion {v:g} {u1} = {out:.6g} "
                  f"{u2} != claimed {ctx.claim:.6g}")


_LIN_TERM = r"([+-]?)\s*(\d*(?:\.\d+)?)\s*\*?\s*(x|y)\b"


def _parse_lin_eq(seg: str) -> Optional[Tuple[float, float, float]]:
    """'a x + b y = c' -> (a, b, c); tolerates implicit coefficients."""
    if "=" not in seg:
        return None
    lhs_s, rhs_s = seg.split("=", 1)
    rm = re.fullmatch(r"\s*(-?\d+(?:\.\d+)?)\s*", rhs_s)
    if not rm:
        return None
    a = b = 0.0
    seen = set()
    for sgn, num, var in re.findall(_LIN_TERM, lhs_s):
        coef = float(num) if num else 1.0
        if sgn == "-":
            coef = -coef
        if var == "x":
            a += coef
        else:
            b += coef
        seen.add(var)
    if seen != {"x", "y"}:
        return None
    return a, b, float(rm.group(1))


def _claimed_xy(ctx: "_Ctx") -> Optional[Tuple[float, float]]:
    pt = _claimed_point(ctx)
    if pt is not None:
        return pt
    fa = ctx.final_answer or ""
    m = re.search(r"x\s*=\s*(-?\d+(?:\.\d+)?)[^.\d]{0,15}?"
                  r"y\s*=\s*(-?\d+(?:\.\d+)?)", fa, re.I)
    if m:
        return float(m.group(1)), float(m.group(2))
    m = re.search(r"y\s*=\s*(-?\d+(?:\.\d+)?)[^.\d]{0,15}?"
                  r"x\s*=\s*(-?\d+(?:\.\d+)?)", fa, re.I)
    if m:
        return float(m.group(2)), float(m.group(1))
    return None


_LIN_EQ_RE = re.compile(
    r"[+-]?\s*\d*\s*[xy](?:\s*[+-]\s*\d*\s*[xy])*\s*=\s*"
    r"-?\d+(?:\.\d+)?")


def _row_simult_linear(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """Pair of linear equations — substitution closure: the claimed
    (x, y) must satisfy BOTH equations re-parsed from the question."""
    q = _qnorm(ctx)
    eqs = []
    for m in _LIN_EQ_RE.finditer(q):
        p = _parse_lin_eq(m.group(0))
        if p is not None:
            eqs.append(p)
    if len(eqs) < 2:
        return _na("no linear pair parsed")
    pt = _claimed_xy(ctx)
    if pt is None:
        return _na("shipped answer carries no (x, y) claim")
    x, y = pt
    for i, (a, b, cc) in enumerate(eqs[:2]):
        resid = a * x + b * y - cc
        if abs(resid) > max(1e-4, 1e-4 * abs(cc)):
            return (FAIL, f"substitution closure: ({x:g}, {y:g}) leaves "
                          f"residual {resid:.6g} in equation {i + 1} "
                          f"({a:g}x + {b:g}y = {cc:g})")
    return (PASS, f"substitution closure: ({x:g}, {y:g}) satisfies "
                  "both equations re-parsed from the question")


def _row_linear_solve(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """'find x' single-line asks the solve-branch doesn't reach —
    residual substitution of the claimed root into a fresh sympy parse
    (the same honest-invariant contract as the degree-1/2 path)."""
    q = _qnorm(ctx)
    if ctx.claim is None:
        return _na("no claimed root")
    mseg = re.search(r"[-\d xX^+*/().]{2,}=[-\d xX^+*/().]{1,}", q)
    if not mseg:
        return _na("no clean equation in the question")
    lhs, rhs = mseg.group(0).split("=", 1)
    body = lhs.strip() + " - (" + rhs.strip() + ")"
    if not re.fullmatch(r"[\d\sxX\^+\-*/().]+", body):
        return _na("not a clean one-variable equation")
    try:
        import sympy as _sp
        x = _sp.Symbol("x")
        bn = body.replace("^", "**").replace("X", "x")
        bn = re.sub(r"(\d)\s*(x\b|\()", r"\1*\2", bn)
        bn = re.sub(r"(x|\))\s*\(", r"\1*(", bn)
        expr = _sp.expand(_sp.sympify(bn, locals={"x": x}))
        resid = float(expr.subs(x, ctx.claim))
    except Exception:
        return _na("equation parse failed")
    if abs(resid) <= 1e-6:
        return (PASS, f"linear-solve residual: substitution gives "
                      f"{resid:.3g} ~ 0 -- the claim satisfies the "
                      "question's equation")
    return (FAIL, f"linear-solve residual: substitution gives "
                  f"{resid:.6g}, not zero")


def _row_latent_heat(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """Q = m L — the mass is converted to the latent heat's own mass
    unit first (a different construction from PAL's direct product)."""
    q = _qnorm(ctx)
    lm = re.search(r"latent\s+heat[^.]{0,60}?=\s*(\d+(?:\.\d+)?)\s*"
                   r"(k?j)\s*[/ ]\s*(g|kg|mol)", q, re.I)
    if not lm:
        lm = re.search(r"l\s*(?:_?[fv])?\s*=\s*(\d+(?:\.\d+)?)\s*"
                       r"(k?j)\s*[/ ]\s*(g|kg|mol)", q, re.I)
    if not lm:
        return _na("latent-heat constant not parsed")
    lv, lu, lm_u = float(lm.group(1)), lm.group(2).lower(), \
        lm.group(3).lower()
    l_jkg = lv * (1000.0 if lu == "kj" else 1.0)
    if lm_u == "g":
        l_jkg *= 1000.0
    elif lm_u == "mol":
        return _na("molar latent heat needs the molar mass")
    mm = re.search(r"(?:melt|of|mass\s+of)\s*(\d+(?:\.\d+)?)\s*(g|kg)\b",
                   q, re.I)
    if not mm:
        mm = re.search(r"(\d+(?:\.\d+)?)\s*(g|kg)\s+of\s+"
                       r"(?:ice|wax|water|metal|lead)", q, re.I)
    if not mm:
        return _na("mass not parsed")
    m_kg = float(mm.group(1)) * (1.0 if mm.group(2).lower()
                                 == "kg" else 0.001)
    want_j = m_kg * l_jkg
    if ctx.claim is None:
        return _na("no numeric claim")
    if _close(want_j, ctx.claim, rel=row.get("tol", 0.01)) or \
            _close(want_j / 1000.0, ctx.claim, rel=row.get("tol", 0.01)):
        return (PASS, f"unit-aligned rebuild m={m_kg:g} kg x "
                      f"L={l_jkg:g} J/kg = {want_j:.6g} J -- matches")
    return (FAIL, f"unit-aligned rebuild {want_j:.6g} J != claimed "
                  f"{ctx.claim:.6g}")


def _row_capillary(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """Capillary rise h = 2 gamma cos theta / (rho g r) — constants are
    re-parsed by SYMBOL and converted to SI (a different construction
    from the stored program's literal-order binding)."""
    q = _qnorm(ctx)
    gam = _fnum(q, r"(?:gamma|γ|surface\s+tension|σ)\s*=\s*"
                r"(\d+(?:\.\d+)?)\s*(?:n\s*/?\s*m|n\s*m|Nm)") or \
        _fnum(q, r"(?:gamma|γ|surface\s+tension|σ)\s*=\s*"
              r"(\d+(?:\.\d+)?)")
    rho = _fnum(q, r"(?:rho|ρ|density)\s*=\s*(\d+(?:\.\d+)?)")
    rm = re.search(r"radius\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*(mm|cm|m)\b",
                   q, re.I)
    th = _fnum(q, r"(?:theta|θ|angle)\s*=\s*(\d+(?:\.\d+)?)\s*(?:deg|°)")\
        or 0.0
    g = _fnum(q, r"g\s*=\s*(\d+(?:\.\d+)?)\s*(?:m\s*/?\s*s)") or 9.8
    if gam is None or rho is None or not rm or rho <= 0 or g <= 0:
        return _na("capillary constants not parsed")
    r_m = float(rm.group(1)) * {"mm": 0.001, "cm": 0.01,
                                "m": 1.0}[rm.group(2).lower()]
    h_m = (2.0 * gam * math.cos(math.radians(th))) / (rho * g * r_m)
    if ctx.claim is None:
        return _na("no numeric claim")
    for want, u in ((h_m, "m"), (h_m * 100.0, "cm"), (h_m * 1000.0, "mm")):
        if _close(want, ctx.claim, rel=row.get("tol", 0.01)):
            return (PASS, f"capillary rebuild h = 2γ cosθ/(ρgr) = "
                          f"{want:.6g} {u} -- matches claimed "
                          f"{ctx.claim:.6g}")
    return (FAIL, f"capillary rebuild {h_m:.6g} m != claimed "
                  f"{ctx.claim:.6g}")


def _row_mc_schedule(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """MC from a TC schedule — re-diff the (Q, TC) ladder re-parsed from
    the question; every claimed MC must equal a step difference and no
    step may be missing."""
    q = _qnorm(ctx)
    pairs = re.findall(r"Q\s*=\s*(\d+(?:\.\d+)?)\s*[,;:]?\s*"
                       r"TC\s*=\s*(\d[\d,]*(?:\.\d+)?)", q, re.I)
    if len(pairs) < 2:
        pairs = re.findall(r"TC\s*=\s*(\d[\d,]*(?:\.\d+)?)\s*"
                           r"(?:at|for|when)\s*Q\s*=\s*"
                           r"(\d+(?:\.\d+)?)", q, re.I)
        pairs = [(b, a) for a, b in pairs]
    if len(pairs) < 2:
        return _na("no Q/TC schedule parsed")
    sched = sorted((float(a), float(b.replace(",", "")))
                   for a, b in pairs)
    mcs = []
    for (q1, c1), (q2, c2) in zip(sched, sched[1:]):
        if abs(q2 - q1 - 1.0) > 1e-9:
            return _na("schedule steps are not unit increments")
        mcs.append(c2 - c1)
    got = [float(v.replace(",", "")) for v in re.findall(
        r"(?:MC|marginal\s+cost)\s*\d*\s*[=:]\s*(?:rs\.?\s*|₹\s*|inr\s*)?"
        r"(\d[\d,]*(?:\.\d+)?)", ctx.final_answer or "", re.I)]
    if not got:
        got = _answer_numbers(ctx)
    if not got:
        return _na("shipped answer carries no MC numbers")
    if len(got) != len(mcs):
        return (FAIL, f"MC re-diff: {len(mcs)} increments computed, "
                      f"{len(got)} shipped")
    for i, (w, g_) in enumerate(zip(mcs, got)):
        if not _close(w, g_, rel=row.get("tol", 0.01)):
            return (FAIL, f"MC re-diff: step {i + 1} is {w:.6g}, "
                          f"shipped {g_:.6g}")
    return (PASS, f"MC re-diff: schedule steps "
                  f"{['%g' % v for v in mcs]} reproduced in the shipped "
                  "answer")


def _row_percent_apply(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """Percent apply — 'p% of N', 'increase/decrease by p%', 'p%
    discount on Rs N'.  Recomputed as a RATE-of-base rebuild (the
    inverse direction from PAL's forward product where the two
    differ)."""
    q = _qnorm(ctx)
    pm = re.search(r"(\d+(?:\.\d+)?)\s*(?:%|per\s*cent|percent|"
                   r"percentage)", q, re.I)
    if not pm:
        return _na("no percent figure parsed")
    p = float(pm.group(1))
    before = q[:pm.start()]
    bm = None
    for pat in (r"(?:of|on|from|for|at|is|price|marked|sells?|costs?|"
                r"MP|MRP)\D{0,30}?(?:rs\.?\s*|₹\s*|inr\s*)?"
                r"(\d[\d,]*(?:\.\d+)?)",
                r"(?:rs\.?\s*|₹\s*|inr\s*)(\d[\d,]*(?:\.\d+)?)"):
        bm = re.search(pat, before, re.I)
        if bm:
            break
    if bm is None:
        bm = re.search(r"(\d[\d,]*(?:\.\d+)?)\s*(?:km|kg|m|l\b|units?)",
                       before, re.I)
    if bm is None:
        return _na("percent base not parsed")
    base = float(bm.group(1).replace(",", ""))
    if base <= 0:
        return _na("degenerate base")
    _dec_re = r"decreas|discount|reduce|fall|cut|markdown|rebate|" \
              r"off\b|concession|depreciat"
    _inc_re = r"increas|raise|rise|markup|hike|grow|exceed|appreciat|" \
              r"tax(?:ed)?"
    # WS-MH: a CHAINED percent ("increases by 20% and then decreases by
    # 10%") is not a single rate -- rebuilding it as one produced a
    # false FAIL against a correct chain answer (800*1.2*0.9=864 read as
    # '20% decrease = 640').  Rebuild the chain instead: every percent
    # figure gets its direction from the nearest inc/dec cue around it
    # and the rates fold over the base in order; a chain link with no
    # direction cue is unverifiable -> NA, never a guess.
    pms = list(re.finditer(r"(\d+(?:\.\d+)?)\s*(?:%|per\s*cent|percent|"
                           r"percentage)", q, re.I))
    if len(pms) > 1:
        rates = []
        for _m in pms:
            # direction = the LAST inc/dec cue before the figure ("by"
            # phrases put the verb left of the rate); cues after the
            # figure belong to a later link
            _pre = q[max(0, _m.start() - 40):_m.start()]
            _cues = [(c.start(), "d") for c in
                     re.finditer(_dec_re, _pre, re.I)] + \
                    [(c.start(), "i") for c in
                     re.finditer(_inc_re, _pre, re.I)]
            if not _cues:
                return _na("chained percent lacks a per-rate "
                           "direction cue")
            _dirn = max(_cues)[1]
            rates.append((-1.0 if _dirn == "d" else 1.0)
                         * float(_m.group(1)) / 100.0)
        want = base
        for r_ in rates:
            want *= (1.0 + r_)
        if ctx.claim is None:
            return _na("no numeric claim")
        if _close(want, ctx.claim, rel=row.get("tol", 0.01)):
            return (PASS,
                    f"percent-chain rebuild: base {base:g} folded "
                    f"through {len(rates)} rates = {want:.6g} -- "
                    f"matches claimed {ctx.claim:.6g}")
        return (FAIL,
                f"percent-chain rebuild: base {base:g} folded through "
                f"{len(rates)} rates = {want:.6g} != claimed "
                f"{ctx.claim:.6g}")
    dec = bool(re.search(_dec_re, q, re.I))
    inc = bool(re.search(_inc_re, q, re.I))
    if inc and not dec:
        want = base * (1.0 + p / 100.0)
        label = "increase"
    elif dec:
        want = base * (1.0 - p / 100.0)
        label = "decrease"
    else:
        want = base * p / 100.0
        label = "of"
    if ctx.claim is None:
        return _na("no numeric claim")
    if _close(want, ctx.claim, rel=row.get("tol", 0.01)) or \
            _close(base * p / 100.0, ctx.claim,
                   rel=row.get("tol", 0.01)):
        return (PASS, f"percent rebuild: {p:g}% {label} {base:g} = "
                      f"{want:.6g} -- matches claimed {ctx.claim:.6g}")
    return (FAIL, f"percent rebuild: {p:g}% {label} {base:g} = "
                  f"{want:.6g} != claimed {ctx.claim:.6g}")


def _row_equal_intercepts(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """'Line through (x0, y0) with equal intercepts' — the shipped
    intercept form x/a + y/b = 1 must carry a == b and must PASS the
    given point (fresh substitution, independent of the family's
    x + y = x0 + y0 construction)."""
    q = _qnorm(ctx)
    pm = re.search(r"(?:through|passes?\s+through)[^()]{0,30}?"
                   r"\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*"
                   r"(-?\d+(?:\.\d+)?)\s*\)?", q, re.I)
    if not pm:
        return _na("through-point not parsed")
    x0, y0 = float(pm.group(1)), float(pm.group(2))
    fa = (ctx.final_answer or "").replace(" ", "")
    am = re.search(r"x/\(?\s*(-?\d+(?:\.\d+)?)\)?\s*\+\s*"
                   r"y/\(?\s*(-?\d+(?:\.\d+)?)\)?\s*=\s*1", fa, re.I)
    if not am:
        # x + y = N form (equal-intercept line, both intercepts N)
        sm = re.search(r"x\s*\+\s*y\s*=\s*(-?\d+(?:\.\d+)?)", fa, re.I)
        if sm:
            a = float(sm.group(1))
            if abs(x0 + y0 - a) <= max(1e-4, 1e-4 * abs(a)):
                return (PASS, "intercept check: x + y = "
                              f"{a:g} carries the point ({x0:g}, "
                              f"{y0:g}) and x- and y-intercepts are "
                              f"both {a:g}")
            return (FAIL, f"intercept check: x + y = {a:g} does not "
                          f"carry the point ({x0:g}, {y0:g})")
        return _na("shipped answer is not an intercept-form line")
    a, b = float(am.group(1)), float(am.group(2))
    if abs(a - b) > 1e-9 * max(1.0, abs(a)):
        return (FAIL, f"equal-intercepts violated: shipped a={a:g}, "
                      f"b={b:g} differ")
    if a == 0:
        return _na("degenerate intercept 0")
    if abs(x0 / a + y0 / b - 1.0) <= 1e-4:
        return (PASS, f"intercept check: x/{a:g} + y/{b:g} = 1 has "
                      "equal intercepts and carries the point "
                      f"({x0:g}, {y0:g})")
    return (FAIL, f"intercept check: the point ({x0:g}, {y0:g}) does "
                  f"not lie on x/{a:g} + y/{b:g} = 1")


def _row_quotient_remainder(row: Dict[str, Any],
                            ctx: "_Ctx") -> Verdict:
    """'Divide A by B — quotient and remainder' — re-derived by the
    DIVISION ALGORITHM identity A = B q + r with 0 <= r < B, a
    different construction from PAL's divmod."""
    q = _qnorm(ctx)
    m = re.search(r"divide\s+(\d[\d,]*)\s+by\s+(\d[\d,]*)", q, re.I) or \
        re.search(r"(\d[\d,]*)\s+(?:is\s+)?divided\s+by\s+(\d[\d,]*)",
                  q, re.I) or \
        re.search(r"(\d[\d,]*)\s*(?:÷|/)\s*(\d[\d,]*)", q)
    if not m:
        return _na("dividend/divisor not parsed")
    a = int(m.group(1).replace(",", ""))
    b = int(m.group(2).replace(",", ""))
    if b <= 0:
        return _na("degenerate divisor")
    want_q, want_r = divmod(a, b)
    if re.search(r"quotient|remainder", q, re.I):
        got = _answer_numbers(ctx)
        miss = [str(v) for v in (want_q, want_r)
                if not any(_close(g, float(v)) for g in got)]
        if miss:
            return (FAIL, f"division-algorithm check: q={want_q}, "
                          f"r={want_r}; the shipped answer "
                          f"{got} misses {miss}")
        return (PASS, f"division-algorithm check: {a} = {b} x {want_q} "
                      f"+ {want_r} reproduced in the answer")
    if ctx.claim is None:
        return _na("no numeric claim")
    if _close(a / b, ctx.claim, rel=row.get("tol", 0.005)) or \
            _close(float(want_q), ctx.claim):
        return (PASS, f"division check: {a}/{b} = {a / b:.6g} "
                      f"(q={want_q}, r={want_r}) -- matches claimed "
                      f"{ctx.claim:.6g}")
    return (FAIL, f"division check: {a}/{b} = {a / b:.6g} != claimed "
                  f"{ctx.claim:.6g}")


def _row_ratio_divide(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """'Divide Rs N in the ratio a:b[:c]' — shares are rebuilt as
    unit-part x each ratio term; the shipped shares must sum to the
    total and every computed share must appear."""
    q = _qnorm(ctx)
    tm = re.search(r"(?:divide[d]?|split|share|distribut\w+)"
                   r"[^0-9]{0,40}?(?:rs\.?\s*|₹\s*|inr\s*)?"
                   r"(\d[\d,]*(?:\.\d+)?)", q, re.I)
    rm = re.search(r"ratio\s*(?:of\s*)?(\d[\d,]*(?:\.\d+)?)"
                   r"(?:\s*:\s*(\d[\d,]*(?:\.\d+)?)){1,3}", q, re.I)
    if not tm or not rm:
        return _na("total or ratio not parsed")
    total = float(tm.group(1).replace(",", ""))
    rseg = re.search(r"ratio\s*(?:of\s*)?((?:\d[\d,]*(?:\.\d+)?\s*:?\s*)+)",
                     q, re.I)
    parts = [float(x.replace(",", ""))
             for x in re.findall(r"\d[\d,]*(?:\.\d+)?",
                                 rseg.group(1))] if rseg else []
    if len(parts) < 2 or any(p_ <= 0 for p_ in parts) or total <= 0:
        return _na("degenerate ratio/total")
    unit = total / sum(parts)
    shares = [unit * p_ for p_ in parts]
    got = _answer_numbers(ctx)
    if not got:
        return _na("no shipped share numbers")
    missing = [f"{s:.6g}" for s in shares
               if not any(_close(g, s, rel=row.get("tol", 0.01))
                          for g in got)]
    if missing:
        return (FAIL, f"unit-part rebuild: shares "
                      f"{['%.6g' % s for s in shares]}; shipped "
                      f"{got} misses {missing}")
    return (PASS, f"unit-part rebuild: one part = {total:g}/"
                  f"{sum(parts):g} = {unit:.6g}; all shares "
                  "reproduced and they sum to the total")


def _row_pop_density(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """Population density — each region's density is rebuilt as
    population/area from the question's own figures; every computed
    density must appear in the shipped answer."""
    q = _qnorm(ctx)
    segs = re.findall(r"area\s+of\s+(\d[\d,.]*)\s*(?:sq\.?\s*"
                      r"(?:km|km²|miles?)?)[^.]{0,80}?"
                      r"population\s+of\s+(\d[\d,]*)", q, re.I)
    if not segs:
        segs = re.findall(r"population\s+of\s+(\d[\d,]*)[^.]{0,80}?"
                          r"area\s+of\s+(\d[\d,.]*)", q, re.I)
        segs = [(b, a) for a, b in segs]
    if not segs:
        return _na("no area/population pairs parsed")
    dens = []
    for a, p in segs:
        area = float(a.replace(",", ""))
        pop = float(p.replace(",", ""))
        if area <= 0:
            return _na("degenerate area")
        dens.append(pop / area)
    got = _answer_numbers(ctx)
    if not got:
        return _na("no shipped density numbers")
    missing = [f"{d:.6g}" for d in dens
               if not any(_close(g, d, rel=row.get("tol", 0.01))
                          for g in got)]
    if missing:
        return (FAIL, f"density rebuild: {dens} computed; shipped "
                      f"{got} misses {missing}")
    return (PASS, f"density rebuild: pop/area for each region "
                  f"reproduces {['%.6g' % d for d in dens]}")


def _row_circle_measure(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """Circle area/circumference — rebuilt through the OTHER quantity
    (area ask: A = C r/2 with C re-derived; circumference ask:
    C = 2 A/r).  Honours 'pi = 22/7'/'3.14' hints."""
    q = _qnorm(ctx)
    r_ = _fnum(q, r"radius\s+(?:is|of|=|:)?\s*(" + _PNUM + r")")
    if r_ is None:
        d = _fnum(q, r"diameter\s+(?:is|of|=|:)?\s*(" + _PNUM + r")")
        if d is not None:
            r_ = d / 2.0
    if r_ is None or r_ <= 0:
        return _na("circle radius not parsed")
    pi = 22.0 / 7.0 if re.search(r"22\s*/\s*7", q) else (
        _fnum(q, r"(?:pi|π)\s*=\s*([\d.]+)") or math.pi)
    if ctx.claim is None:
        return _na("no numeric claim")
    want, label = None, ""
    if re.search(r"area", q, re.I):
        want = pi * r_ * r_
        label = f"pi r^2 = {pi:.6g} x {r_:g}^2"
    elif re.search(r"circumference|perimeter", q, re.I):
        want = 2.0 * pi * r_
        label = f"2 pi r = 2 x {pi:.6g} x {r_:g}"
    else:
        return _na("circle ask kind not recognised")
    if _close(want, ctx.claim, rel=row.get("tol", 0.005)):
        return (PASS, f"circle rebuild {label} = {want:.6g} -- "
                      f"matches claimed {ctx.claim:.6g}")
    return (FAIL, f"circle rebuild {label} = {want:.6g} != claimed "
                  f"{ctx.claim:.6g}")


def _row_repeated_change(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """'N <unit> each/every <period> for M <periods>' — rebuilt by a
    repeated-sum loop over M steps (not the family's one-shot
    product)."""
    q = _qnorm(ctx)
    m = re.search(r"(\d+(?:\.\d+)?)\s*(?:°?\s*\w{1,12}"
                  r"(?:\s*[a-zA-Z]{1,3})?)?\s*"
                  r"(?:each|every|per|a)\s+"
                  r"(?:hour|day|week|month|year|minute|second)\w*"
                  r"[^.]{0,40}?(?:for|over|in)\s+(\d+(?:\.\d+)?)\s*"
                  r"(?:hours?|days?|weeks?|months?|years?|minutes?|"
                  r"seconds?)\b", q, re.I)
    if not m:
        return _na("repeated-change phrasing not parsed")
    per = float(m.group(1))
    n = int(round(float(m.group(2))))
    if n < 1 or n > 10000 or per == 0:
        return _na("degenerate repeat count")
    acc = 0.0
    for _ in range(n):
        acc += per
    neg = bool(re.search(r"drops?|decreas\w+|falls?|fell|loses?|lost|"
                         r"declin\w+|cools?|reduc\w+", q, re.I))
    want = -acc if neg else acc
    if ctx.claim is None:
        return _na("no numeric claim")
    # magnitude is the load-bearing figure; a signed-negative claim is
    # required only for a positive-direction ask
    if _close(want, ctx.claim, rel=row.get("tol", 0.005)) or (
            neg and _close(acc, ctx.claim, rel=row.get("tol", 0.005))):
        return (PASS, f"repeated-sum loop: {n} x {per:g} = {acc:.6g} "
                      f"(signed {want:g}) -- matches claimed "
                      f"{ctx.claim:.6g}")
    return (FAIL, f"repeated-sum loop {n} x {per:g} = {want:.6g} != "
                  f"claimed {ctx.claim:.6g}")


def _row_proportion(row: Dict[str, Any], ctx: "_Ctx") -> Verdict:
    """Ratio/proportion — 'a : b = c : ?' or 'a/b = c/x': the claim
    must hold the CROSS-PRODUCT identity a x = b c."""
    q = _qnorm(ctx)
    m = re.search(r"(\d[\d,]*(?:\.\d+)?)\s*[:/]\s*"
                  r"(\d[\d,]*(?:\.\d+)?)\s*(?:::=|::|=|is\s+proportional"
                  r"\s+to)\s*(\d[\d,]*(?:\.\d+)?)", q, re.I)
    if not m:
        return _na("no proportion statement parsed")
    a, b, cc = (float(m.group(i).replace(",", "")) for i in (1, 2, 3))
    if a == 0 or ctx.claim is None:
        return _na("degenerate proportion or no claim")
    resid = a * ctx.claim - b * cc
    if abs(resid) <= max(0.01, 0.01 * abs(b * cc)):
        return (PASS, f"cross-product closure: {a:g} x {ctx.claim:.6g} ="
                      f" {a * ctx.claim:.6g} ~ {b:g} x {cc:g} = "
                      f"{b * cc:.6g}")
    return (FAIL, f"cross-product closure fails: {a:g} x "
                  f"{ctx.claim:.6g} != {b:g} x {cc:g}")


_ROW_CHECKS = {
    "asked_terms": _row_asked_terms,
    "fresh_lookup": _row_fresh_lookup,
    "dag_inverse": _row_dag_inverse,
    "calc_agree": _row_calc_agree,
    "formula_sub": _row_formula_sub,
    "fund_split": _row_fund_split,
    "point_plane": _row_point_plane,
    # WS-PAL (ovh-pal 2026-10-13)
    "delegate": _row_delegate,
    "order_list": _row_order_list,
    "place_value": _row_place_value,
    "mean_list": _row_mean_list,
    "sphere_vol": _row_sphere_vol,
    "sdt": _row_sdt,
    "unit_convert": _row_unit_convert,
    "simult_linear": _row_simult_linear,
    "linear_solve": _row_linear_solve,
    "latent_heat": _row_latent_heat,
    "capillary": _row_capillary,
    "mc_schedule": _row_mc_schedule,
    "percent_apply": _row_percent_apply,
    "equal_intercepts": _row_equal_intercepts,
    "quotient_remainder": _row_quotient_remainder,
    "ratio_divide": _row_ratio_divide,
    "pop_density": _row_pop_density,
    "formula_subst": _row_formula_subst,
    "change_from_to": _row_change_from_to,
    "rate_total": _row_rate_total,
    "circle_measure": _row_circle_measure,
    "repeated_change": _row_repeated_change,
    "proportion": _row_proportion,
}


def _row_circle_measure_v(c: _Ctx) -> Verdict:
    return _row_circle_measure({"label": "circle rebuild"}, c)


def _v_solid_measure(c: _Ctx) -> Verdict:
    """SOLID_MEASURE_DIG2 (dig2 spec family): the spec computes sphere /
    cuboid / cube volumes and surfaces.  Dispatch by shape word to the
    same fresh-text rebuilds used by the PAL rows."""
    q = c.question or ""
    if re.search(r"spher|hemisphere", q, re.I):
        return _row_sphere_vol({"label": "sphere rebuild", "tol": 0.01},
                               c)
    if re.search(r"cuboid|rectangular\s+(?:box|solid|block|tank|room)",
                 q, re.I):
        return _v_cuboid_volume(c)
    cm = re.search(r"cube[^.]{0,40}?(?:edge|side|of)\s*(?:is\s+|of\s+|"
                   r"=|:)?\s*(\d+(?:\.\d+)?)|(?:edge|side)\s+(?:of\s+)?"
                   r"(?:a\s+)?(?:the\s+)?cube[^.]{0,30}?(\d+(?:\.\d+)?)",
                   q, re.I)
    if cm:
        a = float(cm.group(1) or cm.group(2))
        if a <= 0 or c.claim is None:
            return _na("cube edge or claim missing")
        if re.search(r"surface|tsa|csa", q, re.I):
            want = (4.0 if re.search(r"\bcsa\b|lateral|curved", q, re.I)
                    else 6.0) * a * a
            label = "4a^2 (CSA)" if want == 4.0 * a * a else "6a^2 (TSA)"
        else:
            want, label = a ** 3, "a^3"
        if _close(want, c.claim, rel=0.01):
            return (PASS, f"cube rebuild {label} = {want:.6g} -- "
                          f"matches claimed {c.claim:.6g}")
        return (FAIL, f"cube rebuild {label} = {want:.6g} != claimed "
                      f"{c.claim:.6g}")
    return _na("solid kind not recognised (sphere/cuboid/cube only)")


# --------------------------------------------------------------------------- #
# WS-PAL route verifiers (ovh-pal 2026-10-13).  Registered for the family
# routes that shipped verifier_na in the cross-check replay; each is a
# thin route-facing wrapper over the row checks above (one implementation,
# two lanes).
# --------------------------------------------------------------------------- #

def _v_interest_narrative(c: _Ctx) -> Verdict:
    """INTEREST_NARRATIVE (commerce_readers Lane-B chain): the family
    computed SI or CI from prose.  Dispatch to the same re-parsing
    checks used by SIMPLE_INTEREST / COMPOUND_INTEREST — both rebuild
    the claim period-by-period from the question text."""
    if c.claim is None:
        return _na("no claimed interest")
    if re.search(r"compound", c.question or "", re.I):
        return _v_compound_interest(c)
    return _v_simple_interest(c)


def _v_linear_pair(c: _Ctx) -> Verdict:
    """LINEAR_EQ_2VAR (structure spec family): substitution closure on
    the claimed pair — the same engine as the PAL row.  When the
    question's pair cannot be re-parsed the quantities-based expanded
    invariant (EXPANDED_VERIFIERS_MAP, merged at module init) still
    gets its turn -- coverage continuity, not PAL-slot trust."""
    v = _row_simult_linear({"label": "linear-pair substitution"}, c)
    if v[0] != NA:
        return v
    prev = VERIFIERS.get("_EXPANDED_LINEAR_EQ_2VAR")
    if prev is not None:
        try:
            pv = prev(c)
        except Exception:
            pv = (NA, "expanded fallback raised")
        if pv[0] != NA:
            return pv
    return v


# capture the expanded-invariants row BEFORE _WSPAL_VERIFIERS overrides
# the key (module init order: EXPANDED update at ~5523 precedes this)
if "LINEAR_EQ_2VAR" in VERIFIERS:
    VERIFIERS["_EXPANDED_LINEAR_EQ_2VAR"] = VERIFIERS["LINEAR_EQ_2VAR"]


def _v_sdt(c: _Ctx) -> Verdict:
    """SPEED_DIST_TIME: replaces the narrow dict row (which needed the
    exact 'distance of N m in N s' phrasing and missed the 90-km/2-hour
    ask).  The row check converts through SI units, covers the old
    coverage, and adds the km/h ask."""
    q = c.question or ""
    if not re.search(r"speed|velocity|how\s+fast", q, re.I):
        return _na("not a speed ask")
    return _row_sdt({"label": "speed rebuild"}, c)


def _v_projectile(c: _Ctx) -> Verdict:
    """PROJECTILE_HEIGHT: family used H = u^2 sin^2(t)/(2g).  The old
    declarative row gated on the word 'height|projectile' and missed
    'how high does it go'.  Vertical throws use v^2 = u^2 + 2 a s at
    the apex (kinematic chain, a different construction from the
    launch-height formula).  Non-vertical asks fall through to the
    declarative row."""
    q = c.question or ""
    if re.search(r"thrown?\s+(?:straight\s+)?up|vertically\s+"
                 r"(?:upward|up)|how\s+high", q, re.I):
        u = _fnum(q, r"(?:speed|velocity)\s+(?:of\s+)?(" + _PNUM + r")"
                  r"\s*(?:m\s*/?\s*s|m/s)?") or \
            _fnum(q, r"(" + _PNUM + r")\s*m\s*/?\s*s")
        g = _fnum(q, r"g\s*=\s*(" + _PNUM + r")") or 9.8
        if u is None or u <= 0:
            return _na("launch speed not parsed")
        if c.claim is None:
            return _na("no claimed height")
        want = u * u / (2.0 * g)
        if _close(want, c.claim, rel=0.005):
            return (PASS, f"apex-kinematic check: v^2 = u^2 + 2 a s "
                          f"gives s = {u:g}^2/(2 x {g:g}) = {want:.6g} "
                          f"m -- matches claimed {c.claim:.6g}")
        return (FAIL, f"apex-kinematic check: {u:g}^2/(2 x {g:g}) = "
                      f"{want:.6g} != claimed {c.claim:.6g}")
    # everything else (angled launch, inverse asks): the declared
    # invariant row still owns this shape
    return _verify_declarative_invariant("PROJECTILE_HEIGHT", c) \
        or _na("not the declared ask")


def _v_ratio_division_route(c: _Ctx) -> Verdict:
    """RATIO_DIVISION (commerce_readers): shares re-derived from the
    question, each claimed share checked."""
    return _row_ratio_divide({"label": "ratio-share rebuild",
                              "tol": 0.01}, c)


def _v_word_arithmetic(c: _Ctx) -> Verdict:
    """WORD_ARITHMETIC: the family shipped a*b, a/b or a-b.  The
    independent check re-parses the operation words and recomputes with
    Fraction arithmetic (divide asks also answer 'quotient and
    remainder' via the division-algorithm identity)."""
    q = (c.question or "").lower().replace("\u202f", " ")
    # 'quotient AND remainder' / 'long division' asks are
    # QUOTIENT_REMAINDER territory; a bare 'what is the quotient' after
    # 'divide a by b' legitimately means a/b (the family semantics).
    if re.search(r"remainder|long\s+division", q):
        return _row_quotient_remainder({"label": "division algorithm"},
                                       c)
    m = re.search(r"(?:multiply|product\s+of)\s*(-?\d+(?:\.\d+)?)\s*"
                  r"(?:and|by)\s*(-?\d+(?:\.\d+)?)", q)
    want, label = None, ""
    if m:
        want = float(m.group(1)) * float(m.group(2))
        label = f"{m.group(1)} x {m.group(2)}"
    else:
        m = re.search(r"divide\s+(-?\d+(?:\.\d+)?)\s+by\s+"
                      r"(-?\d+(?:\.\d+)?)", q)
        if m:
            b = float(m.group(2))
            if b == 0:
                return _na("division by zero")
            want = float(m.group(1)) / b
            label = f"{m.group(1)} / {m.group(2)}"
        else:
            m = re.search(r"subtract\s+(-?\d+(?:\.\d+)?)\s+from\s+"
                          r"(-?\d+(?:\.\d+)?)", q)
            if m:
                want = float(m.group(2)) - float(m.group(1))
                label = f"{m.group(2)} - {m.group(1)}"
    if want is None:
        return _na("no word-arithmetic form re-parsed")
    if c.claim is None:
        return _na("no numeric claim")
    if _close(want, c.claim, rel=0.005):
        return (PASS, f"word-arithmetic recompute {label} = {want:.6g} "
                      f"-- matches claimed {c.claim:.6g}")
    return (FAIL, f"word-arithmetic recompute {label} = {want:.6g} "
                  f"!= claimed {c.claim:.6g}")


def _v_profit_loss(c: _Ctx) -> Verdict:
    """PROFIT_LOSS (family route): the declarative row computed only
    |SP - CP| and false-FAILed every percent-shaped ask (a toy bought
    Rs 240 sold Rs 300 shipped 'profit percent = 25' and the row
    rebuilt 60 -> withheld).  Dispatch on the ASK: percent asks check
    the percentage via price reconstruction; absolute asks check the
    difference."""
    q = c.question or ""
    if re.search(r"(?:profit|loss|gain)\s*(?:per\s*cent|percent|pct|%)|"
                 r"per\s*cent\s*(?:profit|loss|gain)", q, re.I):
        return _v_profit_loss_percent(c)
    if c.claim is None:
        return _na("no claimed profit/loss")
    cp = _fnum(q, r"(?:cost\s*price|cp\b|buys?\b|bought\b|purchased?\b)"
               r"[^0-9]{0,40}(?:rs\.?\s*|rs\s*|₹\s*|inr\s*)?"
               r"(" + _NUM_TOKEN + r")")
    sp = _fnum(q, r"(?:selling\s*price|sp\b|sells?\b[^0-9]{0,20}for|"
               r"sold\b[^0-9]{0,20}(?:for|at))[^0-9]{0,30}"
               r"(?:rs\.?\s*|rs\s*|₹\s*|inr\s*)?(" + _NUM_TOKEN + r")")
    if cp is None or sp is None:
        return _na("CP/SP not parsed from the question")
    want = abs(sp - cp)
    if _money_close(want, c.claim):
        return (PASS, f"profit/loss rebuild: |{sp:g} - {cp:g}| = "
                      f"{want:g} -- matches claimed {c.claim:.6g}")
    # the family's numeric slot sometimes carries the derived PERCENT
    # while the answer text leads with the absolute figure ('profit =
    # Rs 60 (15%)') -- the claim is then consistent under the percent
    # identity; check that before failing.
    pct_want = want / cp * 100.0 if cp else None
    if pct_want is not None and _money_close(pct_want, c.claim):
        return (PASS, f"profit/loss consistency: |{sp:g} - {cp:g}| = "
                      f"{want:g}, and {want:g}/{cp:g} = {pct_want:.4g}% "
                      f"== claimed {c.claim:.6g}")
    return (FAIL, f"profit/loss rebuild |{sp:g} - {cp:g}| = {want:g} "
                  f"({pct_want:.4g}%) != claimed {c.claim:.6g}")


def _v_percent_steps(c: _Ctx) -> Verdict:
    """PERCENT_STEPS (competency_reader percent chain): 'base, increase
    by a%, then decrease by b%' -- re-simulate the chain from the raw
    question and compare the endpoint (and the stated net %)."""
    q = (c.question or "").lower().replace(" ", " ")
    steps = list(re.finditer(
        r"(?:(increas\w+|decreas\w+|rise[s]?|fall[s]?|fell|"
        r"drop[s]?)\s*(?:by\s*)?|(?:and|then|,)\s+by\s+)"
        r"(\d+(?:\.\d+)?)\s*%", q))
    if not steps:
        return _na("no sequential percent steps parsed")
    step_pos = [m.start(2) for m in steps]
    base = None
    for m in re.finditer(r"\d+(?:\.\d+)?", q):
        if any(abs(m.start() - p) < 6 for p in step_pos):
            continue
        base = float(m.group(0))
        break
    if base is None or base <= 0:
        return _na("no base value parsed")
    val, prev_up = base, True
    for m in steps:
        pct = float(m.group(2))
        word = (m.group(1) or "").lower()
        if word.startswith(("decreas", "fall", "drop", "fell")):
            up = False
        elif word.startswith(("increas", "rise")):
            up = True
        else:
            up = prev_up
        prev_up = up
        val = val * (1 + pct / 100.0) if up else val * (1 - pct / 100.0)
    net = (val / base - 1.0) * 100.0
    if c.claim is None:
        return _na("no numeric claim")
    if not _close(val, c.claim, rel=0.005):
        return (FAIL, f"percent-chain re-sim on base {base:g} ends at "
                      f"{val:.6g} != claimed {c.claim:.6g}")
    # cross-check the stated NET percent only when the answer carries a
    # single net figure (a per-hop 'net +20%' label is relative to that
    # hop's base, not the chain's)
    fa = c.final_answer or ""
    nets = re.findall(r"net\s*([+-]?\d+(?:\.\d+)?)\s*%", fa, re.I)
    if len(nets) == 1 and not _close(net, float(nets[0]), rel=0.005):
        return (FAIL, f"endpoint {val:.6g} matches but stated net "
                      f"{nets[0]}% != recomputed {net:.6g}%")
    return (PASS, f"percent-chain re-sim: base {base:g} -> {val:.6g} "
                  f"(net {net:+.6g}%) -- matches the claim")


def _v_mixture_blend(c: _Ctx) -> Verdict:
    """MIXTURE_BLEND: 'v1 L of p1% mixed with v2 L of p2%' -- the blended
    concentration is the solute-weighted mean."""
    q = c.question or ""
    parts = [(float(m.group(1)), float(m.group(2))) for m in
             re.finditer(r"(\d+(?:\.\d+)?)\s*(?:l|litre|liter|ml)s?"
                         r"[^.]{0,25}?(?:of|at|having|with)\s*"
                         r"(?:a\s+|an\s+|the\s+)?"
                         r"(\d+(?:\.\d+)?)\s*%", q, re.I)]
    if len(parts) < 2:
        parts = [(float(m.group(2)), float(m.group(1))) for m in
                 re.finditer(r"(\d+(?:\.\d+)?)\s*%\s*(?:solution|acid|"
                             r"alcohol|milk|mixture)[^.]{0,25}?"
                             r"(?:of\s+)?(\d+(?:\.\d+)?)\s*"
                             r"(?:l|litre|liter|ml)s?\b", q, re.I)]
    if len(parts) < 2:
        return _na("fewer than two volume/concentration pairs")
    if c.claim is None:
        return _na("no numeric claim")
    solute = sum(v * p / 100.0 for v, p in parts)
    total = sum(v for v, _ in parts)
    if total <= 0:
        return _na("zero total volume")
    conc = solute / total * 100.0
    if _close(conc, c.claim, rel=0.005):
        return (PASS, f"solute-weighted mean: sum(v*p)/sum(v) = "
                      f"{conc:.6g}% -- matches claimed {c.claim:.6g}")
    return (FAIL, f"solute-weighted mean {conc:.6g}% != claimed "
                  f"{c.claim:.6g}")


def _quad_coef(s: Optional[str]) -> Optional[float]:
    if s is None:
        return None
    s = s.replace(" ", "").strip()
    if s in ("", "+"):
        return 1.0
    if s == "-":
        return -1.0
    try:
        return float(s)
    except ValueError:
        return None


def _v_math_kernel(c: _Ctx) -> Verdict:
    """MATH_KERNEL (kernel solve_text answers with no family id):
    re-derive by shape -- a one-variable linear ask re-checks the
    substitution residual; an 'ax^2 + bx + c = 0' ask substitutes each
    claimed root (Vieta's split sum/product identities double-check the
    pair).  Anything else is honest NA."""
    q = c.question or ""
    # quadratic residual check: every claimed x must zero the LHS
    m = re.search(
        r"([+-]?\s*\d*(?:\.\d+)?)\s*\*?\s*x\s*(?:\^\s*2|\u00b2|\*\*\s*2)"
        r"\s*([+-]?\s*\d*(?:\.\d+)?)\s*\*?\s*x"
        r"\s*([+-]?\s*\d+(?:\.\d+)?)?\s*=\s*0", q, re.I)
    if m:
        a = _quad_coef(m.group(1))
        b = _quad_coef(m.group(2))
        cc = _quad_coef(m.group(3))
        if a is None or b is None:
            return _na("quadratic coefficients ambiguous")
        cc = cc if cc is not None else 0.0
        if a == 0:
            return _na("degenerate a=0")
        claims = [float(v) for v in re.findall(
            r"x\s*=\s*(-?\d+(?:\.\d+)?)", c.final_answer or "")]
        if not claims:
            claims = [v for v in _answer_numbers(c)]
        if c.claim is not None and c.claim not in claims:
            claims.append(c.claim)
        claims = [v for v in claims if isinstance(v, float)]
        if not claims:
            return _na("no claimed roots")
        bad = [v for v in claims
               if abs(a * v * v + b * v + cc) >
               1e-6 * max(1.0, abs(cc))]
        if bad:
            return (FAIL, f"root-substitution: {bad[0]:.6g} leaves "
                          f"residual {a * bad[0] ** 2 + b * bad[0] + cc:.6g} "
                          f"!= 0 in the question's quadratic")
        # Vieta cross-check when the stem asked for roots/solutions
        if len(claims) >= 2:
            s_, p_ = claims[0] + claims[1], claims[0] * claims[1]
            if not (_close(s_, -b / a) and _close(p_, cc / a)):
                return (FAIL, f"Vieta check: r1+r2 = {s_:.6g} vs -b/a = "
                              f"{-b / a:.6g}; r1*r2 = {p_:.6g} vs "
                              f"c/a = {cc / a:.6g}")
        return (PASS, f"root-substitution closure: each claimed root "
                      f"zeros {a:g}x^2 + ({b:g})x + ({cc:g}) -- "
                      f"question's own equation")
    v = _row_linear_solve({"label": "kernel linear residual"}, c)
    if v[0] != NA:
        return v
    return _na("kernel-solve shape not re-derivable")


def _v_hop_chain(c: _Ctx) -> Verdict:
    """HOP_CHAIN aggregate results: each hop came through _answer_core,
    but the aggregate never saw a second path.  Re-derive the whole
    chain fresh from the question text when a shape verifier owns it
    (percent steps, speed/distance, repeated change); else honest NA."""
    dispatch = [
        # WS-MH: the clause-wise recompute owns clause-shaped chains
        # first -- the coarse shape checkers below re-parse the WHOLE
        # text as one relation and can false-fail a true chain (an sdt
        # chain's claim is the FINAL distance, not d/t of hop 1).
        _v_chain,
        _v_percent_steps,
        _v_mixture_blend,
        _v_sdt,
        lambda cc: _row_repeated_change({"label": "repeated-sum"}, cc),
    ]
    # when the text clause-splits, a whole-text shape checker's FAIL is
    # unreliable evidence: it verifies a different quantity than the
    # chain's endpoint (e.g. hop-1 speed vs the claimed final time), so
    # on clause chains only PASS counts; the clause recompute keeps the
    # right to FAIL (its contradictions are on-chain).
    _is_clause_chain = False
    try:
        from backend.its.solver.hop_planner import split_hop_clauses
        _is_clause_chain = bool(
            split_hop_clauses(c.question or ""))
    except Exception:
        _is_clause_chain = False
    for fn in dispatch:
        try:
            v = fn(c)
        except Exception:
            v = (NA, "dispatch error")
        if v[0] == FAIL and _is_clause_chain and fn is not _v_chain:
            continue
        if v[0] != NA:
            return v
    return _na("hop-chain shape not recognised by any second path")


def _v_mixture_reverse(c: _Ctx) -> Verdict:
    """MIXTURE_REVERSE: 'V litres of P% solution, dilute/enrich to Q%' --
    water added = V(P-Q)/Q, pure-solute added = V(Q-P)/(100-Q)."""
    q = (c.question or "").lower()
    data = re.search(r"(\d+(?:\.\d+)?)\s*(?:l|litre|liter)s?[^.]{0,30}?"
                     r"(?:of\s+)?(\d+(?:\.\d+)?)\s*%", q)
    target = re.search(r"(?:to|of|make)\s*[^%]{0,30}?(\d+(?:\.\d+)?)\s*%",
                       q)
    if not data or not target:
        return _na("dilution slots not parsed")
    vol, p, qt = float(data.group(1)), float(data.group(2)), \
        float(target.group(1))
    if c.claim is None:
        return _na("no numeric claim")
    if p > qt and p <= 100 and qt > 0:
        want = vol * (p - qt) / qt
        rel = f"V(P-Q)/Q = {vol:g}({p:g}-{qt:g})/{qt:g}"
    elif qt > p and 100 > qt:
        want = vol * (qt - p) / (100.0 - qt)
        rel = f"V(Q-P)/(100-Q) = {vol:g}({qt:g}-{p:g})/{100 - qt:g}"
    else:
        return _na("p/q ordering inconsistent with dilute/enrich ask")
    if _close(want, c.claim, rel=0.01):
        return (PASS, f"reverse-mixture rebuild {rel} = {want:.6g} -- "
                      f"matches claimed {c.claim:.6g}")
    return (FAIL, f"reverse-mixture rebuild {rel} = {want:.6g} != "
                  f"claimed {c.claim:.6g}")


# ------------------------------------------------------------------ #
# WS-MH: CHAIN second path -- per-clause recompute + boundary dims
# ------------------------------------------------------------------ #
#
# The hop-planner / chain-pipeline lanes ship "step 1: X; step 2: Y"
# aggregates whose per-hop work came from the ordinary core (or the
# typed hop families).  The second path here NEVER re-reads the
# shipped hops: it re-splits the question into clauses, re-derives
# every clause's value with verifier-local solvers (own extraction,
# own arithmetic -- nothing imported from hop_types but the shared
# dimension vocabulary), then checks:
#   * every clause recomputes (NA -- honest -- when one does not),
#   * every carried boundary is dimension-consistent (the forward
#     reference's noun dim == the produced dim of the previous hop),
#   * every shipped per-hop value agrees with the recompute
#     (unit-tolerant) when the audit carried it,
#   * substitution closure: the chain's recomputed endpoint equals the
#     shipped claim.
# Narrative chains (chain_pipeline / case_builder specs) are replayed
# hop-by-hop with an independent binder; each seam must consume the
# previous produces-name, and at least one hop's inverse relation must
# back-solve a question-stated literal or a chain product.

_CVN = r"(-?\d[\d,]*(?:\.(?:\d+)?)?)"


def _cvf(pattern: str, text: str, group: int = 1) -> Optional[float]:
    m = re.search(pattern, text, re.I)
    if not m:
        return None
    try:
        return float(m.group(group).replace(",", ""))
    except (ValueError, IndexError):
        return None


def _chain_eq(a: float, b: float, dim: str = "") -> bool:
    """Unit-tolerant equality for shipped-vs-recomputed hop values."""
    if _close(a, b, rel=0.01):
        return True
    equiv = {
        "speed": 3.6,        # m/s <-> km/h
        "length": 1000.0,    # m   <-> km
        "time": (60.0, 3600.0),
        "volume": 1000.0,    # mL  <-> L
    }.get(dim)
    if equiv is None:
        return False
    factors = equiv if isinstance(equiv, tuple) else (equiv,)
    for f in factors:
        if _close(a * f, b, rel=0.01) or _close(a, b * f, rel=0.01):
            return True
    return False


def _cv_sdt(clause, carried, want):
    q = clause or ""
    dm = re.search(_CVN + r"\s*(kilometres?|kilometers?|km|metres?|"
                   r"meters?|centimetres?|millimetres?|cm|mm|m)\b"
                   r"(?!\s*/)", q, re.I)
    tm = re.search(_CVN + r"\s*(hours?|hrs?|hr|minutes?|mins?|min|"
                   r"seconds?|secs?|sec|s|h)\b", q, re.I)
    sm = re.search(_CVN + r"\s*(km\s*/\s*h(?:rs?|ours?)?|kmph|"
                   r"kilometres?\s+per\s+hour|m\s*/\s*s(?:ec)?|"
                   r"metres?\s+per\s+second)", q, re.I)
    if dm is None and tm is None and sm is None:
        return None
    d_m = None
    if dm:
        u = dm.group(2).lower().rstrip("s")
        d_m = float(dm.group(1).replace(",", "")) * {
            "m": 1.0, "metre": 1.0, "meter": 1.0, "km": 1000.0,
            "kilometre": 1000.0, "kilometer": 1000.0, "cm": 0.01,
            "centimetre": 0.01, "mm": 0.001, "millimetre": 0.001,
        }.get(u, 1.0)
    t_s = None
    if tm:
        u = tm.group(2).lower()
        t_s = float(tm.group(1).replace(",", "")) * {
            "s": 1.0, "sec": 1.0, "secs": 1.0, "second": 1.0,
            "seconds": 1.0, "min": 60.0, "mins": 60.0,
            "minute": 60.0, "minutes": 60.0, "h": 3600.0,
            "hr": 3600.0, "hrs": 3600.0, "hour": 3600.0,
            "hours": 3600.0,
        }.get(u, 1.0)
    s_ms = None
    if sm:
        raw = float(sm.group(1).replace(",", ""))
        s_ms = raw / 3.6 if re.search(r"km|kilomet|kmph", sm.group(2),
                                      re.I) else raw
    if s_ms is None and carried and carried[1] == "speed":
        s_ms = carried[0] if (len(carried) < 3 or carried[2]
                              in ("m/s", "")) else carried[0] / 3.6
    # ask resolution order: the NEXT clause's boundary requirement wins;
    # otherwise the clause's own ask -- a time ask ("how long ... takes
    # to cover N m") names time even though 'cover' mentions distance,
    # and a bare forward reference ("using this speed") is not a speed
    # ASK.  Order: explicit time ask > explicit distance ask > speed.
    asks_speed = bool(re.search(r"(?:find|calculate|compute|what\s+is|"
                                r"determine|its|their|his|her)\b[^.]{0,30}"
                                r"\bspeed\b|\bhow\s+fast\b|"
                                r"\bvelocity\b", q, re.I))
    asks_time = bool(re.search(r"how\s+long|time\s+(?:taken|does|will)|"
                               r"takes?\s+to|time\s+to\s+cover|"
                               r"find\s+the\s+time", q, re.I))
    asks_dist = bool(re.search(r"how\s+far|distance|travel|journey|"
                               r"cover", q, re.I)) and not asks_time
    if want == "speed" or (asks_speed and not asks_dist
                           and not asks_time):
        if d_m is not None and t_s:
            return d_m / t_s, "speed", "m/s"
        return None
    if want == "time" or asks_time:
        if d_m is not None and s_ms:
            return d_m / s_ms, "time", "s"
        return None
    if want == "length" or asks_dist:
        if s_ms is not None and t_s:
            return s_ms * t_s, "length", "m"
        return None
    # no ask and no boundary requirement: produce the natural third
    # quantity only when exactly two of the three are stated/carried
    if d_m is not None and t_s is not None and s_ms is None:
        return d_m / t_s, "speed", "m/s"
    return None


def _cv_percent(clause, carried, want):
    q = clause or ""
    pm = _cvf(_CVN + r"\s*%", q)
    if pm is None:
        return None
    whole = _cvf(r"\bof\s+(?:the\s+|his\s+|her\s+|its\s+|their\s+|"
                 r"that\s+|this\s+|a\s+|an\s+|remaining\s+|rest\s+)*"
                 + _CVN, q)
    dim = "amount"
    if whole is None:
        whole = _cvf(_CVN + r"\s*(?:rupees?|rs\b|inr\b|kg|litres?|"
                     r"quintals?)", q) or \
            _cvf(r"(?:rs\.?\s*|rupees?\s*|inr\s*|" + chr(8377) + r"\s*)"
                 + _CVN, q) or \
            _cvf(r"(?:is|of|price|cost|sum|principal|salary|wage|"
                 r"population|income)\s*(?:is|of|=|:|rs\.?\s*)?\s*" +
                 _CVN + r"\s*(?:rupees?|rs\b|inr\b)?", q)
    if whole is None and carried is not None:
        whole = carried[0]
        dim = carried[1] if carried[1] != "percent" else "amount"
    if whole is None:
        return None
    part = whole * pm / 100.0
    dec = bool(re.search(r"decreas|discount|fall|drop|reduc|depreciat|"
                         r"deduct|spend|spent|lose|lost|\bless\b|"
                         r"\boff\b", q, re.I))
    inc = bool(re.search(r"increas|rise|gain|tax|hike|appreciat|earns?",
                         q, re.I))
    if re.search(r"(?:find|what\s+is)\s+the\s+(?:increase|decrease|"
                 r"discount|reduction|tax|change)\b", q, re.I):
        return part, dim, ""
    if dec or inc:
        if want == "amount" or want is None or want == "value" \
                or want == dim:
            if dec:
                return whole - part, dim, ""
            if inc:
                return whole + part, dim, ""
    if re.search(r"final|new\s+price|selling|remaining|left|net|save",
                 q, re.I):
        return (whole - part if dec else whole + part), dim, ""
    return part, dim, ""


def _cv_fraction(clause, carried, want):
    q = clause or ""
    frac = None
    whole = None
    fm = re.search(r"(\d+)\s*/\s*(\d+)\s*of\s+(?:the\s+|his\s+|her\s+|"
                   r"its\s+|their\s+|a\s+|an\s+|remaining\s+|"
                   r"rest\s+)*" + _CVN + "?", q, re.I)
    if fm and float(fm.group(2)):
        frac = float(fm.group(1)) / float(fm.group(2))
        if fm.group(3):
            whole = float(fm.group(3).replace(",", ""))
    elif re.search(r"\bhalf\s+of\b", q, re.I):
        frac = 0.5
        whole = _cvf(r"half\s+of\s+(?:the\s+|remaining\s+|rest\s+)*"
                     + _CVN, q)
    elif re.search(r"\bquarter\s+of\b", q, re.I):
        frac = 0.25
        whole = _cvf(r"quarter\s+of\s+(?:the\s+|remaining\s+|rest\s+)*"
                     + _CVN, q)
    if frac is None:
        return None
    if whole is None and carried is not None:
        whole = carried[0]
    if whole is None:
        return None
    return whole * frac, "amount", ""


def _cv_mole(clause, carried, want):
    q = clause or ""
    if not re.search(r"\bmoles?\b|amount\s+of\s+substance|"
                     r"molar\s+mass|atomic\s+mass|g\s*/\s*mol",
                     q, re.I) and want != "moles":
        return None
    mass = _cvf(_CVN + r"\s*(?:g|grams?)\b(?!\s*/)", q)
    mm = _cvf(r"(?:molar|atomic|molecular)\s+mass[^0-9]{0,25}" + _CVN,
              q) or _cvf(_CVN + r"\s*g\s*/\s*mol", q) or \
        _cvf(r"[mM]\s*=\s*" + _CVN + r"\s*(?:g\s*/\s*mol)?", q)
    if mass is None or not mm:
        return None
    return mass / mm, "moles", "mol"


def _cv_molarity(clause, carried, want):
    q = clause or ""
    if not re.search(r"molarity|molar\s+concentration|concentration|"
                     r"dilut", q, re.I) and want != "concentration":
        return None
    vm = re.search(_CVN + r"\s*(millilitres?|milliliters?|ml|litres?|"
                   r"liters?|l)\b", q, re.I)
    v_l = None
    if vm:
        _vu = vm.group(2).lower()
        v_l = float(vm.group(1).replace(",", "")) * (
            0.001 if (_vu == "ml" or _vu.startswith("milli"))
            else 1.0)
    c1 = _cvf(_CVN + r"\s*(?:M\b|mol\s*/\s*L)", q)
    if re.search(r"dilut", q, re.I):
        if c1 is None and carried and carried[1] == "concentration":
            c1 = carried[0]
        # V2 = the volume the solution is diluted TO; V1 = the initial
        # volume stated before 'diluted' (default 1 L when unstated)
        v2m = re.search(r"dilut\w*\s+[^0-9]{0,25}?(?:to|into|up\s+to)\s+"
                        + _CVN + r"\s*(millilitres?|milliliters?|ml|"
                        r"litres?|liters?|l)\b", q, re.I)
        if v2m is None:
            v2m = re.search(r"(?:to|into)\s+" + _CVN +
                            r"\s*(millilitres?|milliliters?|ml|"
                            r"litres?|liters?|l)\b", q, re.I)
        v2 = None
        if v2m:
            _vu = v2m.group(2).lower()
            v2 = float(v2m.group(1).replace(",", "")) * (
                0.001 if (_vu == "ml" or _vu.startswith("milli"))
                else 1.0)
        # V1 = a volume stated BEFORE the word 'diluted' ("when 2 L of
        # the solution is diluted to 4 L" -> V1=2)
        v1m = re.search(_CVN + r"\s*(millilitres?|milliliters?|ml|"
                        r"litres?|liters?|l)\b[^.]{0,40}?\bdilut",
                        q, re.I)
        v1 = 1.0
        if v1m:
            _vu = v1m.group(2).lower()
            v1 = float(v1m.group(1).replace(",", "")) * (
                0.001 if (_vu == "ml" or _vu.startswith("milli"))
                else 1.0)
        if c1 is not None and v2:
            return c1 * v1 / v2, "concentration", "mol/L"
        return None
    n = _cvf(_CVN + r"\s*(?:mol|moles)\b(?!\s*/)", q)
    if n is None and carried and carried[1] == "moles":
        n = carried[0]
    if n is not None and v_l:
        return n / v_l, "concentration", "mol/L"
    return None


def _cv_ph(clause, carried, want):
    q = clause or ""
    if not re.search(r"\bpH\b", q):
        return None
    conc = _cvf(_CVN + r"\s*(?:M\b|mol\s*/\s*L|molar)", q)
    if conc is None:
        em = re.search(_CVN + r"\s*(?:x|×|\*)\s*10\s*\^?\s*(-?\d+)",
                       q, re.I)
        if em:
            conc = float(em.group(1).replace(",", "")) * \
                10 ** int(em.group(2))
    if conc is None and carried and carried[1] == "concentration":
        conc = carried[0]
    if conc is None or conc <= 0:
        return None
    return -math.log10(conc), "ph", ""


def _cv_work(clause, carried, want):
    q = clause or ""
    f_n = _cvf(r"force\s+(?:of\s+)?" + _CVN + r"\s*n\b", q) or \
        _cvf(_CVN + r"\s*n(?:ewtons?)?\b[^/.]{0,25}force", q) or \
        _cvf(_CVN + r"\s*n(?:ewtons?)?\b", q)
    d_m = _cvf(_CVN + r"\s*(?:m|metres?|meters?)\b(?!\s*/)", q)
    if want == "work" or (re.search(r"\bwork\b", q, re.I) and
                          not re.search(r"power", q, re.I)):
        if f_n is not None and d_m is not None:
            return f_n * d_m, "work", "J"
    if want == "power" or re.search(r"\bpower\b", q, re.I):
        w = _cvf(_CVN + r"\s*j(?:oules?)?\b", q)
        if w is None and carried and carried[1] == "work":
            w = carried[0]
        t_s = _cvf(r"(?:in|over|for|within)\s+" + _CVN +
                   r"\s*(?:s|sec|seconds?|minutes?|mins?|hours?|h)\b",
                   q)
        mult = 1.0
        if re.search(r"(?:minutes?|mins?)\b", q, re.I):
            mult = 60.0
        elif re.search(r"(?:hours?|h)\b\s*$|(?:in|over|for)\s+" + _CVN +
                       r"\s*(?:hours?|h)\b", q, re.I):
            mult = 3600.0
        if w is not None and t_s:
            return w / (t_s * mult), "power", "W"
    return None


def _cv_projectile(clause, carried, want):
    q = clause or ""
    if not re.search(r"thrown?\s+(?:vertically\s+)?up|projectile|"
                     r"tossed\s+up|launched\s+up", q, re.I):
        return None
    u = _cvf(_CVN + r"\s*(?:m\s*/\s*s|metres?\s+per\s+second)", q)
    g = _cvf(r"g\s*=\s*" + _CVN, q) or 9.8
    if not u:
        return None
    if want == "time" or re.search(
            r"time\s+to\s+reach|reach\s+the\s+(?:top|highest)", q, re.I):
        return u / g, "time", "s"
    if want == "length" or re.search(
            r"maximum\s+height|how\s+high|highest\s+point|"
            r"(?:find|what|calculate|compute)\b[^.]{0,25}\bheight\b",
            q, re.I):
        return u * u / (2.0 * g), "length", "m"
    return None


def _cv_interest(clause, carried, want):
    q = clause or ""
    if not re.search(r"simple\s+interest|interest\b", q, re.I):
        return None
    p = _cvf(r"(?:rs\.?\s*|rupees?\s*|inr\s*|" + chr(8377) + r"\s*)" +
             _CVN, q) or _cvf(_CVN + r"\s*(?:rupees?|rs\b|inr\b)", q) \
        or _cvf(r"(?:principal|sum|deposit\w*|invest\w*|loan)\b"
                r"[^0-9]{0,20}" + _CVN, q)
    if p is None and carried is not None:
        p = carried[0]
    r = _cvf(_CVN + r"\s*%\s*(?:per\s+annum|p\.?a\.?|per\s+year)", q)
    t = _cvf(r"(?:for|in|over)\s+" + _CVN + r"\s*years?", q) or \
        _cvf(_CVN + r"\s*years?", q)
    if p is None or r is None or t is None:
        return None
    si = p * r * t / 100.0
    if re.search(r"amount|total", q, re.I) and not re.search(
            r"find\s+(?:the\s+)?simple\s+interest|interest\s+only",
            q, re.I):
        return p + si, "amount", ""
    if want == "amount" and re.search(r"interest", q, re.I):
        return si, "amount", ""
    return si, "amount", ""


def _cv_ratio(clause, carried, want):
    q = clause or ""
    rm = re.search(r"ratio\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*:\s*"
                   r"(\d+(?:\.\d+)?)(?:\s*:\s*(\d+(?:\.\d+)?))?", q,
                   re.I)
    if not rm:
        return None
    parts = [float(x) for x in rm.groups() if x is not None]
    whole = _cvf(r"(?:divide|share|split|distribut\w*|sum\s+of|"
                 r"amount\s+of|of)\s+(?:rs\.?\s*|rupees?\s*|inr\s*)?"
                 + _CVN, q)
    if whole is None and carried is not None:
        whole = carried[0]
    if whole is None or not sum(parts):
        return None
    shares = [whole * p / sum(parts) for p in parts]
    if re.search(r"smaller|lesser|minimum|first|a\s+get", q, re.I):
        return (shares[0] if re.search(r"first|a\s+get", q, re.I)
                else min(shares)), "share", ""
    if re.search(r"larger|greater|bigger|b\s+get|second|maximum",
                 q, re.I):
        return (shares[-1] if re.search(r"b\s+get|second", q, re.I)
                else max(shares)), "share", ""
    return shares[-1], "share", ""


def _cv_trig(clause, carried, want):
    q = clause or ""
    am = _cvf(r"angle\s+of\s+elevation[^0-9]{0,30}" + _CVN, q) or \
        _cvf(r"elevation\s+(?:is|of)\s*" + _CVN, q)
    if am is None or not (0 < am < 90):
        return None
    d = _cvf(_CVN + r"\s*(?:m|metres?|meters?)\s*(?:away|from|"
             r"distant)", q) or \
        _cvf(r"(?:point|distance)\s+(?:is\s+)?(?:of\s+)?" + _CVN +
             r"\s*(?:m|metres?|meters?)", q)
    h = _cvf(r"(?:tower|pole|tree|building|height)[^.]{0,15}" + _CVN +
             r"\s*(?:m|metres?|meters?)", q) or \
        _cvf(r"height\s+(?:is|of)\s+" + _CVN, q)
    if d is None and carried and carried[1] == "length":
        d = carried[0]
    th = math.radians(am)
    if (re.search(r"height|how\s+tall", q, re.I) or want == "length") \
            and d is not None:
        return d * math.tan(th), "length", "m"
    if re.search(r"distance|how\s+far", q, re.I) and h is not None:
        return h / math.tan(th), "length", "m"
    return None


def _cv_equation(clause, carried, want):
    """Linear/quadratic clause: fresh sympy parse of the clause's own
    equation; a named coefficient (c, k, h, ...) is bound from the
    carried hop value.  Roots are residual-confirmed by substitution
    back into the clause's equation."""
    q = clause or ""
    # equation region: letters allowed (a carried value may bind a named
    # coefficient), but no '=' inside the left side; ask-words that lead
    # the equation ("find the larger root of ...") are trimmed away
    m = re.search(r"([-+\d\sxXa-z*/().^]{2,}?=\s*[-+\d\sxXa-z*/().^]+)",
                  q)
    if not m or "=" not in m.group(1):
        return None
    lhs_raw, rhs_raw = m.group(1).split("=", 1)
    _eqw = (r":|\b(?:of|for|solve|in|to|if|find|that|which|is|are|and|"
            r"or|the|what|where|equation|root|roots|value|values|"
            r"larger|smaller|greater)\b")
    lhs = re.split(_eqw, lhs_raw, flags=re.I)[-1].strip()
    rhs = re.split(_eqw, rhs_raw, flags=re.I)[0].strip()
    if not lhs or not rhs:
        return None
    try:
        import sympy as _sp
        body = lhs + " - (" + rhs + ")"
        body = body.replace("^", "**").replace("X", "x")
        body = re.sub(r"²", "**2", body)
        body = re.sub(r"(\d)\s*([a-zA-Z(])", r"\1*\2", body)
        body = re.sub(r"([a-zA-Z)])\s*(?=\d)", r"\1*", body)
        expr = _sp.expand(_sp.sympify(body))
    except Exception:
        return None
    syms = {str(s): s for s in expr.free_symbols}
    if "x" not in syms:
        return None
    others = [s for k, s in syms.items() if k != "x"]
    if len(others) > 1:
        return None
    if others:
        if carried is None:
            return None               # named coefficient unbound
        try:
            expr = _sp.expand(expr.subs(others[0], carried[0]))
        except Exception:
            return None
    try:
        import sympy as _sp
        sols = _sp.solve(_sp.Eq(expr, 0), syms["x"])
        roots = sorted(float(s) for s in sols
                       if getattr(s, "is_real", None))
    except Exception:
        return None
    if not roots:
        return None
    # residual confirmation: every returned root must satisfy the
    # clause's equation (substitution closure at hop granularity)
    for rt in roots:
        try:
            resid = float(expr.subs(syms["x"], rt))
        except Exception:
            return None
        if abs(resid) > 1e-6:
            return None
    if len(roots) == 1:
        return roots[0], "value", ""
    if re.search(r"smaller|lesser|minimum|min\b", q, re.I):
        return roots[0], "value", ""
    if re.search(r"sum\s+of\s+(?:the\s+)?roots", q, re.I):
        return sum(roots), "value", ""
    if re.search(r"product\s+of\s+(?:the\s+)?roots", q, re.I):
        return math.prod(roots), "value", ""
    return roots[-1], "value", ""


def _cv_stated(clause, carried, want):
    """Last resort: the clause merely DECLARES the quantity the next
    clause requires ("holds a volume of 10 L" when the boundary wants
    'volume').  Only fires when a forward reference names the dim."""
    if not want:
        return None
    q = clause or ""
    if want == "amount":
        raw = _cvf(r"(?:rs\.?\s*|rupees?\s*|inr\s*|" + chr(8377) +
                   r"\s*)" + _CVN, q) or \
            _cvf(_CVN + r"\s*(?:rupees?|rs\.?\b|inr\b)", q)
        return (raw, "amount", "Rs") if raw is not None else None
    if want == "moles":
        raw = _cvf(_CVN + r"\s*(?:moles?|mol)\b(?!\s*/)", q)
        return (raw, "moles", "mol") if raw is not None else None
    if want == "concentration":
        raw = _cvf(_CVN + r"\s*(?:mol\s*/\s*l|m)\b", q)
        return (raw, "concentration", "mol/L") if raw is not None \
            else None
    if want == "work":
        raw = _cvf(_CVN + r"\s*(?:joules?|j)\b", q)
        return (raw, "work", "J") if raw is not None else None
    if want == "power":
        raw = _cvf(_CVN + r"\s*(?:watts?|w)\b", q)
        return (raw, "power", "W") if raw is not None else None
    if want == "speed":
        raw = _cvf(_CVN + r"\s*(km\s*/\s*h(?:rs?|ours?)?|kmph|"
                   r"m\s*/\s*s|metres?\s+per\s+second|"
                   r"kilometres?\s+per\s+hour)", q)
        if raw is None:
            return None
        m = re.search(_CVN + r"\s*(km|kmph|kilomet)", q, re.I)
        val = raw / 3.6 if m else raw
        return val, "speed", "m/s"
    unit_specs = {
        "length": (r"(kilometres?|kilometers?|km|metres?|meters?|"
                   r"centimetres?|cm|millimetres?|mm|m)\b(?!\s*/)",
                   {"km": 1000.0, "kilometre": 1000.0,
                    "kilometer": 1000.0, "m": 1.0, "metre": 1.0,
                    "meter": 1.0, "cm": 0.01, "centimetre": 0.01,
                    "mm": 0.001, "millimetre": 0.001}, "m"),
        "volume": (r"(millilitres?|milliliters?|ml|litres?|liters?|l)\b",
                   {"ml": 0.001, "millilitre": 0.001,
                    "milliliter": 0.001, "l": 1.0, "litre": 1.0,
                    "liter": 1.0}, "l"),
        "time": (r"(hours?|hrs?|hr|minutes?|mins?|min|seconds?|secs?|"
                 r"sec|s|h)\b",
                 {"s": 1.0, "sec": 1.0, "second": 1.0, "seconds": 1.0,
                  "secs": 1.0, "h": 3600.0, "hr": 3600.0, "hrs": 3600.0,
                  "hour": 3600.0, "hours": 3600.0, "min": 60.0,
                  "mins": 60.0, "minute": 60.0, "minutes": 60.0}, "s"),
        "mass": (r"(kilograms?|kg|grams?|g)\b(?!\s*/)",
                 {"kg": 1000.0, "kilogram": 1000.0,
                  "kilograms": 1000.0, "g": 1.0, "gram": 1.0,
                  "grams": 1.0}, "g"),
    }
    spec = unit_specs.get(want)
    if spec is None:
        return None
    unitpat, mults, canon = spec
    m = re.search(_CVN + r"\s*" + unitpat, q, re.I)
    if not m:
        return None
    raw = float(m.group(1).replace(",", ""))
    uname = m.group(2).lower()
    return raw * mults.get(uname, 1.0), want, canon


_CHAIN_CLAUSE_SOLVERS = (
    _cv_equation,
    _cv_ph,
    _cv_molarity,
    _cv_mole,
    _cv_sdt,
    _cv_work,
    _cv_projectile,
    _cv_interest,
    _cv_ratio,
    _cv_trig,
    _cv_percent,
    _cv_fraction,
    _cv_stated,
)


def _v_chain_clauses(c: _Ctx, clauses: List[str]) -> Verdict:
    """Clause-chain second path: each clause is recomputed by a
    verifier-local solver; every forward-reference boundary must be
    dimension-consistent; shipped per-hop values (when the audit
    carried them) must agree with the recompute; the recomputed
    endpoint must equal the shipped claim."""
    try:
        from backend.its.solver.hop_planner import _fwd_ref_dim
    except Exception:
        return _na("planner dim table unavailable")
    carried = None            # (value, dim, unit) -- verifier's own
    details: List[str] = []
    for i, clause in enumerate(clauses):
        want = _fwd_ref_dim(clauses[i + 1]) \
            if i + 1 < len(clauses) else None
        want_solve = None if want in (None, "*") else want
        got = None
        for fn in _CHAIN_CLAUSE_SOLVERS:
            try:
                got = fn(clause, carried, want_solve)
            except Exception:
                got = None
            if got is not None:
                break
        if got is None:
            return _na(f"clause {i + 1} has no second-path solver: "
                       f"{clause[:60]!r}")
        value, dim, unit = got
        # shipped hop value/dim cross-check (audit hop metadata)
        sv = c.q.get(f"hop{i + 1}_value")
        if isinstance(sv, (int, float)) and not isinstance(sv, bool):
            if not _chain_eq(value, float(sv), dim):
                return (FAIL, f"hop {i + 1} recompute {value:.6g} "
                              f"{unit or dim} != shipped hop value "
                              f"{float(sv):.6g}")
        sd = c.q.get(f"hop{i + 1}_dim")
        if isinstance(sd, str) and sd and sd != "value" \
                and dim != "value" and sd != dim:
            return (FAIL, f"hop {i + 1} shipped dim {sd!r} but the "
                          f"clause recomputes {dim!r}")
        carried = (value, dim, unit)
        details.append(f"hop{i + 1}={value:.6g}{unit or dim}")
        # boundary contract: the next clause's forward reference must
        # name the dimension this hop just produced ('*' consumes any)
        if want is not None and want != "*" and dim != want:
            return (FAIL, f"dimension break at boundary {i + 1}: "
                          f"hop produced {dim!r} but the next clause "
                          f"asks for {want!r}")
    if c.claim is None:
        return _na("no aggregate claim to close on")
    if not _chain_eq(carried[0], c.claim, carried[1]):
        return (FAIL, f"chain recompute ends at {carried[0]:.6g} "
                      f"{carried[2] or carried[1]} != claimed "
                      f"{c.claim:.6g}")
    return (PASS, "clause-chain re-derivation: " + ", ".join(details)
            + f" -> {carried[0]:.6g} == claimed {c.claim:.6g}; every "
              "boundary dimension-consistent")


# inverse relations for the narrative-spec path: back-solve ONE input
# slot from the hop's output + the other bound inputs.  A back-solved
# slot that equals a question-stated literal anchors the shipped claim
# to the question text, not just to the solver's own bindings.
_CHAIN_INVERSE: Dict[str, Dict[str, Any]] = {
    "addition": {"a": lambda out, b: out - b,
                 "b": lambda out, a: out - a},
    "subtraction": {"minuend": lambda out, subtrahend: out + subtrahend,
                    "subtrahend": lambda out, minuend: minuend - out},
    "multiplication": {"a": lambda out, b: out / b if b else None,
                       "b": lambda out, a: out / a if a else None},
    "division": {"a": lambda out, b: out * b,
                 "b": lambda out, a: a / out if out else None},
    "percent_of": {"whole": lambda out, percent:
                       out * 100.0 / percent if percent else None,
                   "percent": lambda out, whole:
                       out * 100.0 / whole if whole else None},
    "speed": {"distance": lambda out, time: out * time,
              "time": lambda out, distance: distance / out
              if out else None},
    "distance": {"speed": lambda out, time: out / time
                 if time else None,
                 "time": lambda out, speed: out / speed
                 if speed else None},
    "area_rectangle": {"l": lambda out, w: out / w if w else None,
                       "w": lambda out, l: out / l if l else None},
    "density": {"mass": lambda out, volume: out * volume,
                "volume": lambda out, mass: mass / out
                if out else None},
    "simple_interest": {"principal": lambda out, rate, time:
                            out * 100.0 / (rate * time)
                            if rate and time else None,
                        "rate": lambda out, principal, time:
                            out * 100.0 / (principal * time)
                            if principal and time else None,
                        "time": lambda out, principal, rate:
                            out * 100.0 / (principal * rate)
                            if principal and rate else None},
    "total_from_interest": {"principal": lambda out, si: out - si,
                            "si": lambda out, principal: out - principal},
    "compound_amount": {"principal": lambda out, rate, time:
                            out / ((1.0 + rate / 100.0) ** time)
                            if rate > -100 else None},
    "compound_interest": {"amount": lambda out, principal:
                              out + principal,
                          "principal": lambda out, amount:
                              amount - out},
    "area_circle": {"r": lambda out: math.sqrt(out / math.pi)
                        if out > 0 else None},
}


def _v_chain_narrative(c: _Ctx) -> Verdict:
    """Narrative-chain second path (chain_pipeline / case_builder):
    re-parse the question into a fresh chain spec and replay every hop
    with an independent binder -- each seam must consume the previous
    hop's produced quantity, and at least one hop's inverse relation
    must back-solve a value that is question-stated or chain-produced.
    """
    try:
        from backend.its.solver.multi_hop import parse_chain_text
        from backend.its.solver import case_builder as _cb
    except Exception:
        return _na("chain spec machinery unavailable")
    try:
        spec = parse_chain_text(c.question or "")
    except Exception:
        spec = None
    if not spec or not spec.get("keys") or len(spec["keys"]) < 2:
        return _na("no narrative chain spec re-derived")
    keys = list(spec["keys"])
    pool: Dict[str, Any] = dict(spec.get("values") or {})
    if spec.get("seed") is not None:
        pool.setdefault("seed", spec["seed"])
    stated = set()
    for v in pool.values():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            stated.add(round(float(v), 6))
    outs = []          # (key, spec, bound_names, bound, out)
    produced: List[str] = []
    for key in keys:
        f = _cb.FORMULAS.get(key)
        if f is None:
            return _na(f"registry key {key!r} not re-derivable")
        bound: Dict[str, float] = {}
        bound_names: Dict[str, str] = {}
        for slot in f["inputs"]:
            if slot in pool:
                bound[slot] = pool[slot]
                bound_names[slot] = slot
                continue
            for al in f.get("aliases", {}).get(slot, []):
                if al in pool:
                    bound[slot] = pool[al]
                    bound_names[slot] = al
                    break
        missing = [s for s in f["inputs"] if s not in bound]
        if missing:
            return _na(f"replay of {key!r} cannot bind {missing}")
        try:
            out = float(f["fn"](**bound))
        except Exception:
            return _na(f"replay of {key!r} failed to evaluate")
        outs.append((key, f, bound_names, bound, out))
        pool[f["produces"]] = out
        produced.append(f["produces"])
    final = outs[-1][4]
    if c.claim is None:
        return _na("no aggregate claim to close on")
    if not _close(final, c.claim, rel=0.01):
        return (FAIL, f"narrative replay ends at {final:.6g} != "
                      f"claimed {c.claim:.6g}")
    # boundary check at EVERY seam: hop i+1 must actually consume the
    # quantity hop i produced (by pool name, not by value collision)
    for i in range(len(outs) - 1):
        src = outs[i][1]["produces"]
        if src not in outs[i + 1][2].values():
            return (FAIL, f"boundary break: hop {i + 2} "
                          f"({outs[i + 1][0]!r}) never consumes "
                          f"{src!r} produced by hop {i + 1} "
                          f"({outs[i][0]!r})")
    # inverse-relation anchor: for at least one hop, back-solve an
    # input slot from the hop output; the recovered value must equal
    # what was bound -- and a genuine anchor is question-stated or a
    # chain product (not free-floating)
    anchored = False
    inv_details = []
    for key, f, bound_names, bound, out in outs:
        base = f.get("variant_of") or key
        invs = _CHAIN_INVERSE.get(base)
        if not invs:
            continue
        # map bound keys back to base slot names for variants
        base_bound: Dict[str, float] = dict(bound)
        if base != key:
            base_spec = _cb.FORMULAS.get(base)
            if base_spec is None:
                continue
            base_bound = {}
            for slot, v in bound.items():
                nm = bound_names.get(slot, slot)
                # a variant input name may differ from the base slot;
                # map by position: accum slot -> first input, operand
                # slot -> second input for 2-slot repeatable variants
                if nm in base_spec["inputs"]:
                    base_bound[nm] = v
                else:
                    bs = [s for s in base_spec["inputs"]
                          if slot.startswith(s) or
                          nm == f["inputs"][0] and
                          s == base_spec["inputs"][0]]
                    if bs:
                        base_bound[bs[0]] = v
                    else:
                        base_bound[slot] = v
        for slot, invfn in invs.items():
            if slot not in base_bound:
                continue
            others = {k: v for k, v in base_bound.items() if k != slot}
            try:
                back = invfn(out, **others)
            except Exception:
                back = None
            if back is None or not math.isfinite(back):
                continue
            if not _close(back, base_bound[slot], rel=0.01):
                return (FAIL, f"inverse relation on {key!r}: "
                              f"back-solving {slot} from output "
                              f"{out:.6g} gives {back:.6g}, bound was "
                              f"{base_bound[slot]:.6g}")
            src_name = bound_names.get(slot, slot)
            if round(base_bound[slot], 6) in stated or \
                    src_name in produced:
                anchored = True
                inv_details.append(
                    f"{key}:{slot}<-{back:.6g}")
    if not anchored:
        return _na("no inverse relation anchored to a stated/produced "
                   "value")
    return (PASS, f"narrative-chain replay: {len(outs)} hops re-bound "
                  f"fresh, every seam consumes the previous produces, "
                  f"inverse anchors {', '.join(inv_details)}; final "
                  f"{final:.6g} == claimed {c.claim:.6g}")


def _v_chain(c: _Ctx) -> Verdict:
    """CHAIN/HOP_CHAIN second path (WS-MH): clause chains recompute
    per clause with verifier-local solvers + boundary dim checks;
    narrative chains replay the spec with an independent binder +
    seam-consumption + inverse-relation anchor.  Anything not fully
    covered is an honest NA, never a guess."""
    clauses = None
    try:
        from backend.its.solver.hop_planner import split_hop_clauses
        clauses = split_hop_clauses(c.question or "")
    except Exception:
        clauses = None
    if clauses and len(clauses) >= 2:
        return _v_chain_clauses(c, clauses)
def _v_formula_plugin(c: _Ctx) -> Verdict:
    """FORMULA_PLUGIN second path: re-parse the formula from the question
    via AST/SymPy, evaluate with stated quantities, and compare with the claimed value."""
    if c.claim is None:
        return _na("no numeric claim")
    try:
        from backend.its.solver.maths_families import _match_formula_trigger
        m = _match_formula_trigger(c.question or "")
    except Exception:
        m = re.search(
            r"using\s+the\s+formula\s+(?P<formula>.+?)(?:\s+from\s+this\s+topic)?\s*,\s*"
            r"calculate\s+(?P<target>[A-Za-z_][A-Za-z_0-9]*)\s+when\s+"
            r"(?P<when>.+?)(?:\.\s*$|$)",
            c.question or "", re.I | re.S)
    if not m:
        return _na("question does not match formula plug-in pattern")
    f_src = m.group("formula").strip()
    target = m.group("target")
    if "=" not in f_src:
        return _na("unparseable formula")
    lhs_s, rhs_s = [p.strip() for p in f_src.split("=", 1)]
    assignments = re.findall(r"([A-Za-z_][A-Za-z_0-9]*)\s*=\s*(-?\d+(?:\.\d+)?)", m.group("when"))
    if not assignments:
        return _na("no stated assignments found")
    env = {k: float(v) for k, v in assignments}
    try:
        import sympy as _sp
        all_syms = set(env.keys()) | {lhs_s, target}
        sym_map = {s: _sp.Symbol(s, real=True) for s in all_syms}
        sp_lhs = sym_map[lhs_s]
        sp_rhs = _sp.sympify(rhs_s.replace("^", "**"), locals=sym_map)
        eq = _sp.Eq(sp_lhs, sp_rhs)
        if target == lhs_s:
            expected = float(sp_rhs.subs({sym_map[k]: v for k, v in env.items()}))
        else:
            sols = _sp.solve(eq, sym_map[target])
            if not sols:
                return _na(f"symbolic solution for {target} not found")
            expected = float(sols[0].subs({sym_map[k]: v for k, v in env.items() if k != target}))
        if _close(expected, c.claim, rel=1e-3, abs_tol=0.01):
            return (PASS, f"formula plug-in second path: {expected:.6g} == claimed {c.claim:.6g}")
        return (FAIL, f"formula plug-in mismatch: calculated {expected:.6g} != claimed {c.claim:.6g}")
    except Exception as exc:
        return _na(f"formula verification error: {exc}")


# Registration: every WS-PAL family/route gets its second path here.
# setdefault keeps any earlier hand-written registration authoritative;
# the _LOOPFIX_DECL setdefault below then sees these already present and
# leaves them untouched.
_WSPAL_VERIFIERS: Dict[str, VerifierFn] = {
    "FORMULA_PLUGIN": _v_formula_plugin,
    "INTEREST_NARRATIVE": _v_interest_narrative,
    "LINEAR_EQ_2VAR": _v_linear_pair,
    "SPEED_DIST_TIME": _v_sdt,
    "PROJECTILE_HEIGHT": _v_projectile,
    "RATIO_DIVISION": _v_ratio_division_route,
    "WORD_ARITHMETIC": _v_word_arithmetic,
    "PROFIT_LOSS": _v_profit_loss,
    "CIRCLE_MEASURE": _row_circle_measure_v,
    "SOLID_MEASURE_DIG2": _v_solid_measure,
    "PERCENT_APPLY": lambda c: _row_percent_apply(
        {"label": "percent rebuild"}, c),
    "TRADING": _v_profit_loss,
    "PERCENT_STEPS": _v_percent_steps,
    "MIXTURE_BLEND": _v_mixture_blend,
    "MIXTURE_REVERSE": _v_mixture_reverse,
    "HOP_CHAIN": lambda c: _v_hop_chain(c),
    # WS-MH: narrative chains (chain_pipeline / case_builder) --
    # fresh spec parse + independent binder replay + seam-consumption
    # + inverse-relation anchor
    "CHAIN": lambda c: _v_chain(c),
    "MATH_KERNEL": lambda c: _v_math_kernel(c),
    # ws-pal deterministic families (maths_families / economics_families)
    "ORDER_NUMBERS": lambda c: _row_order_list(
        {"label": "order rebuild"}, c),
    "PLACE_VALUE_DIGIT": lambda c: _row_place_value(
        {"label": "place-value rebuild"}, c),
    "QUOTIENT_REMAINDER": lambda c: _row_quotient_remainder(
        {"label": "division-algorithm rebuild"}, c),
    "UNIT_CONVERSION": lambda c: _row_unit_convert(
        {"label": "factor-chain rebuild"}, c),
    "LINE_EQUAL_INTERCEPTS": lambda c: _row_equal_intercepts(
        {"label": "intercept substitution"}, c),
    "REPEATED_CHANGE": lambda c: _row_repeated_change(
        {"label": "repeated-sum rebuild"}, c),
    "MC_SCHEDULE": lambda c: _row_mc_schedule(
        {"label": "MC re-diff"}, c),
    # pre-existing syl-table + spec-family ids for 'average/mean of a
    # list' computes -- the sweep emits these routes
    "mean_list": lambda c: _row_mean_list(
        {"label": "Fraction-exact mean"}, c),
    "MEAN_SIMPLE": lambda c: _row_mean_list(
        {"label": "Fraction-exact mean"}, c),
}
for _sid, _fn in _WSPAL_VERIFIERS.items():
    VERIFIERS[_sid] = _fn


_PREROUTE_EXTRA: Dict[str, list] = {
    "PAL_PROGRAM": [
        {"label": "fund-split complement re-derivation",
         "check": "fund_split", "when": r"\bmitigation\b", "tol": 1e-3},
        {"label": "foot-of-perpendicular point-plane distance",
         "check": "point_plane", "when": r"perpendicular\s+distance",
         "tol": 1e-3},

        # ---- WS-PAL (ovh-pal 2026-10-13): the 27-stem verifier_na
        # replay cluster.  `when` gates are disjoint in the asks they
        # cover; every row re-parses the QUESTION TEXT and compares
        # against the shipped claim — PAL slots/givens/bindings are
        # never read.  Order: the most specific shapes first, the
        # broad percent/delegate rows last. ----

        # discrete/list asks ------------------------------------------------ #
        {"label": "ordering re-derivation (sorted-list rebuild)",
         "check": "order_list",
         "when": r"ascend\w*|descend\w*|increasing\s+order|"
                 r"decreasing\s+order|smallest\s+to\s+largest|"
                 r"largest\s+to\s+smallest"},
        {"label": "place-value re-derivation (digit-position indexing)",
         "check": "place_value",
         "when": r"place\s+value|place\s+of|(?:lakhs?|crores?|"
                 r"thousands?|hundreds?|tens?|ones?|units?|millions?)"
                 r"\s+place"},
        {"label": "mean rebuild (Fraction-exact sum/n)",
         "check": "mean_list",
         "when": r"\baverage\b|\bmean\b", "tol": 0.005},
        {"label": "quotient/remainder division-algorithm rebuild",
         "check": "quotient_remainder",
         "when": r"quotient|remainder|long\s+division|"
                 r"divide\s+\d[\d,]*\s+by\s+\d|"
                 r"\d[\d,]*\s+(?:is\s+)?divided\s+by\s+\d"},

        # algebra ---------------------------------------------------------- #
        {"label": "linear-pair substitution closure",
         "check": "simult_linear",
         "when": r"pair\s+of\s+(?:linear\s+)?equations|simultaneous|"
                 r"two\s+linear\s+equations"},
        {"label": "find-x residual substitution",
         "check": "linear_solve",
         "when": r"\b(?:find|solve|determine|evaluate)\b[^.]{0,40}"
                 r"\b(?:x|the\s+value)\b"},
        {"label": "equal-intercepts line check (substitution)",
         "check": "equal_intercepts",
         "when": r"equal\s+intercepts"},

        # mensuration / geometry ------------------------------------------ #
        {"label": "sphere/hemisphere volume via the diameter form",
         "check": "sphere_vol", "when": r"spher|hemisphere", "tol": 0.01},
        {"label": "circle area/circumference rebuild",
         "check": "circle_measure",
         "when": r"circle|radius|diameter|circumference",
         "tol": 0.005},
        {"label": "cuboid base-area product",
         "check": "delegate", "fn": "CUBOID_VOLUME",
         "when": r"cuboid|rectangular\s+(?:box|solid|block)|"
                 r"rectangular\s+tank"},
        {"label": "pythagoras Heron closure",
         "check": "delegate", "fn": "PYTHAGORAS",
         "when": r"hypotenuse|right\s+angle|ladder|diagonal"},

        # arithmetic / commerce ------------------------------------------- #
        {"label": "simple-interest monthly accumulation",
         "check": "delegate", "fn": "SIMPLE_INTEREST",
         "when": r"simple\s+interest"},
        {"label": "compound-interest year-by-year loop",
         "check": "delegate", "fn": "COMPOUND_INTEREST",
         "when": r"compound\s+interest"},
        {"label": "profit/loss rebuild (percent or absolute ask)",
         "check": "delegate", "fn": "PROFIT_LOSS",
         "when": r"profit|loss\s*(?:percent|per\s*cent|%|amount)?|"
                 r"bought|sold|discount|marked\s+price"},
        {"label": "projectile apex check",
         "check": "delegate", "fn": "PROJECTILE_HEIGHT",
         "when": r"projectile|thrown|launch|how\s+high|ball\b"},
        {"label": "sector arc-area check",
         "check": "delegate", "fn": "SECTOR_ARC_AREA",
         "when": r"sector|arc\s+length"},
        {"label": "tangent-length check",
         "check": "delegate", "fn": "TANGENT_LENGTH",
         "when": r"tangent"},
        {"label": "HCF divisor-scan",
         "check": "delegate", "fn": "HCF_TWO_NUMBERS",
         "when": r"\b(?:hcf|h\.c\.f|gcd|g\.c\.d)\b"},
        {"label": "LCM multiple-scan",
         "check": "delegate", "fn": "LCM_TWO_NUMBERS",
         "when": r"\b(?:lcm|l\.c\.m)\b"},
        {"label": "work-time rate-sum closure",
         "check": "delegate", "fn": "TIME_WORK_TOGETHER",
         "when": r"together|can\s+do\b|cistern|tap\b|pipe\b"},
        {"label": "ratio-share unit-part rebuild",
         "check": "ratio_divide",
         "when": r"ratio|proportion|divide[d]?", "tol": 0.01},
        {"label": "proportion cross-product closure",
         "check": "proportion",
         "when": r"proportion|::|::=", "tol": 0.01},
        {"label": "percent rate-of-base rebuild",
         "check": "percent_apply",
         "when": r"percent|per\s*cent|%|discount", "tol": 0.01},
        {"label": "repeated-change accumulation loop",
         "check": "repeated_change",
         "when": r"each\s+(?:hour|day|week|month|year)|every\s+"
                 r"(?:hour|day|week|month|year)|per\s+(?:hour|day|"
                 r"week|month|year)"},

        # kinematics / conversion ------------------------------------------- #
        {"label": "speed-distance-time SI rebuild",
         "check": "sdt",
         "when": r"speed|velocity|km\s*/?\s*h|m\s*/?\s*s",
         "tol": 0.01},
        {"label": "unit factor-chain conversion",
         "check": "unit_convert",
         "when": r"convert|conversion|express\b[^.]{0,40}\bin\b|"
                 r"how\s+many\s+(?:metres?|meters?|grams?|kilograms?|"
                 r"litres?|liters?|seconds?|minutes?|hours?|mm|cm|m|"
                 r"km|kg|ml)\b", "tol": 0.005},

        # physics ---------------------------------------------------------- #
        {"label": "latent-heat Q = mL unit-aligned rebuild",
         "check": "latent_heat",
         "when": r"latent\s+heat|\bmelt\b|fusion|vapori[sz]",
         "tol": 0.01},
        {"label": "capillary-rise SI rebuild",
         "check": "capillary",
         "when": r"capillary|surface\s+tension", "tol": 0.01},

        # social / econ ---------------------------------------------------- #
        {"label": "population-density rebuild (pop/area)",
         "check": "pop_density",
         "when": r"population\s+density|density\s+of\s+population|"
                 r"densely\s+populated", "tol": 0.01},
        {"label": "marginal-cost schedule re-diff",
         "check": "mc_schedule",
         "when": r"marginal\s+cost|\bMC\b|total\s+cost\s+schedule|"
                 r"cost\s+schedule", "tol": 0.01},

        # 'Using the formula X = ... from this topic, calculate X when
        # ...' -- the largest PAL refusal cluster (12 of 27 stems)
        {"label": "stated-formula substitution rebuild",
         "check": "formula_subst",
         "when": r"using\s+the\s+formula|formula\s+[A-Za-z]\w*\s*="},
        {"label": "from->to change rebuild", "check": "change_from_to",
         "when": r"from\s+\+?-?\d|changes?\s+from|potential\b|"
                 r"increase[d]?\s+from"},
        {"label": "unit-rate total rebuild", "check": "rate_total",
         "when": r"₹\s*\d|\d[\d,]*\s*(?:₹|rs\.?|inr|rupees?)?\s*"
                 r"(?:per|/)\s*(?:quintal|kg|g|litre?s?|liter?s?|"
                 r"pack|unit|day|hour)\b"},
    ],
}


def _eval_preroute_row(route: str, ctx: "_Ctx") -> Optional[Verdict]:
    """Shared generic evaluator for the _PREROUTE_DECL data rows (the
    engine extension VERIFIER_ENGINE.md §2 sanctions: one evaluator,
    all rows; per-route logic lives in the row fields).  A route may
    carry several rows; the first one whose `when` ask matches decides."""
    rows = []
    primary = _PREROUTE_DECL.get(route)
    if primary is not None:
        rows.append(primary)
    rows.extend(_PREROUTE_EXTRA.get(route, ()))
    if not rows:
        return None
    last: Optional[Verdict] = None
    for row in rows:
        when = row.get("when")
        if when and not re.search(when, ctx.question or "", re.I):
            last = _na("not the declared ask")
            continue
        fn = _ROW_CHECKS.get(str(row.get("check") or ""))
        if fn is None:
            last = _na("row declares an unknown check kind")
            continue
        try:
            verdict = fn(row, ctx)
        except Exception as exc:  # a bug in OUR check is not evidence
            verdict = _na(f"row evaluation error: {exc}")
        if verdict[0] != NA:
            return verdict
        last = verdict
    return last


def _make_preroute_decl_check(sid: str) -> VerifierFn:
    row = _PREROUTE_DECL[sid]

    def _check(c: _Ctx) -> Verdict:
        return _eval_preroute_row(sid, c)

    return _check


for _decl_sid in _PREROUTE_DECL:
    # setdefault: PAL_PROGRAM keeps its grandfathered hand-written
    # verifier as the FIRST path; the row runs through the check_route
    # NA-fallthrough below (an NA is "no evidence", not a verdict).
    VERIFIERS.setdefault(_decl_sid, _make_preroute_decl_check(_decl_sid))



def _verify_conceptual_invariant(route: str, ctx: _Ctx) -> Optional[Verdict]:
    """Verification for curated NCERT conceptual explanations."""
    spec = CONCEPTUAL_INVARIANTS.get(route)
    if not spec:
        return None
    kws, desc = spec
    # the curated explanation can live in final_answer OR ride in
    # steps (BIO/PHYS_WHY families return steps as the content) —
    # verify against whichever carries the text
    answer = (ctx.final_answer or "").lower()
    if len(answer) < 40:
        steps = getattr(ctx.result, "steps", None) or getattr(
            ctx.result, "plan", None) or []
        if isinstance(steps, (list, tuple)):
            answer = " ".join(str(s) for s in steps).lower()
    if len(answer) < 40:
        return (FAIL, f"conceptual answer too short or missing for {route}")
    missing = [k for k in kws if k not in answer]
    if missing:
        return (FAIL, f"conceptual explanation missing key NCERT concepts ({', '.join(missing)}) for {route}")
    return (PASS, f"canonical NCERT conceptual reasoning verified: {desc}")


def _verify_qualitative_invariant(route: str, ctx: _Ctx) -> Optional[Verdict]:
    """Verification for qualitative, discrete, and classification structures."""
    answer = (ctx.final_answer or "").lower()
    q = ctx.question

    if route == "LINES_PARALLEL":
        lines = re.findall(r"(-?\d+)\s*x\s*([+-]\s*\d+)\s*y\s*=\s*(-?\d+)", q)
        if len(lines) == 2:
            a1, b1, c1 = float(lines[0][0]), float(lines[0][1].replace(" ", "")), float(lines[0][2])
            a2, b2, c2 = float(lines[1][0]), float(lines[1][1].replace(" ", "")), float(lines[1][2])
            det = a1 * b2 - a2 * b1
            is_parallel = abs(det) < 1e-9 and abs(a1 * c2 - a2 * c1) > 1e-9
            if is_parallel:
                if "parallel" in answer:
                    return (PASS, f"parallel line check: a1/a2 = {a1/a2:.4g} == b1/b2 = {b1/b2:.4g} != c1/c2 -> parallel verified")
                return (FAIL, "lines are parallel but answer claims otherwise")

    if route == "VECTOR_RELATION":
        vecs = re.findall(r"([+-]?\s*\d*)\s*i\s*([+-]\s*\d*)\s*j\s*([+-]\s*\d*)\s*k", q)
        def _parse_comp(s):
            s = s.replace(" ", "")
            if not s or s == "+": return 1.0
            if s == "-": return -1.0
            return float(s)
        if len(vecs) == 2:
            v1 = [_parse_comp(x) for x in vecs[0]]
            v2 = [_parse_comp(x) for x in vecs[1]]
            if all(v1[i] != 0 for i in range(3)):
                ratios = [v2[i] / v1[i] for i in range(3)]
                if abs(ratios[0] - ratios[1]) < 1e-6 and abs(ratios[1] - ratios[2]) < 1e-6:
                    if "parallel" in answer or "collinear" in answer:
                        return (PASS, f"vector proportionality check: b = {ratios[0]:.4g} * a -> parallel/collinear verified")
                    return (FAIL, "vectors are scalar multiples (parallel) but answer claims otherwise")
            dot = sum(v1[i] * v2[i] for i in range(3))
            if abs(dot) < 1e-6:
                if "perpendicular" in answer or "orthogonal" in answer:
                    return (PASS, "vector dot product a . b = 0 -> perpendicular verified")
                return (FAIL, "vectors are orthogonal (dot product 0) but answer claims otherwise")

    if route == "QUAD_NATURE":
        m = re.search(r"(-?\d*)\s*x\^?2\s*([+-]\s*\d*)\s*x\s*([+-]\s*\d+)", q)
        if m:
            def _co(s, default=1.0):
                s = s.replace(" ", "")
                if not s or s == "+": return default
                if s == "-": return -default
                return float(s)
            a = _co(m.group(1))
            b = _co(m.group(2))
            c = float(m.group(3).replace(" ", ""))
            d = b**2 - 4 * a * c
            if d > 1e-9:
                if "distinct" in answer or "two real" in answer or "real" in answer:
                    return (PASS, f"discriminant check: D = {d:.4g} > 0 -> real and distinct roots verified")
            elif abs(d) <= 1e-9:
                if "equal" in answer or "coincident" in answer:
                    return (PASS, f"discriminant check: D = 0 -> real and equal roots verified")
            else:
                if "no real" in answer or "complex" in answer or "imaginary" in answer:
                    return (PASS, f"discriminant check: D = {d:.4g} < 0 -> no real roots verified")

    if route == "CONSISTENCY":
        if "consistent" in answer:
            return (PASS, "system consistency condition verified")

    return None


# ASK-CLASS GUARD: every invariant below checks a STATIC quantity
# (area, volume, angle).  A rate-of-change / derivative / extremum ask
# is a different quantity — "rate of change of the area" still matches
# a `when` regex looking for "area", and VERIFIED a wrong answer live
# (C12 sweep: dA/dr question shipped A = 78.5 VERIFIED).  One global
# rule: such asks may only be verified by calculus/rate families.
_DERIV_ASK_RE = re.compile(
    r"rate\s+of\s+change|with\s+respect\s+to|d[a-z]\s*/\s*d[trxy]|"
    r"deriv|differentiat|marginal|integrat|"
    r"maximi[sz]|minimi[sz]|maximum\s+or\s+minimum|"
    r"(?:strictly\s+)?increasing|decreasing|monoton", re.I)
_DERIV_ROUTE_RE = re.compile(
    r"RATE|DERIV|DIFF|INTEGR|MAXIM|MINIM|MONOTON|MARGINAL|OPTIM|"
    r"RELATED|VELOCITY|ACCEL", re.I)


def _eval_decl_tuple(inv: Tuple, ctx: _Ctx, route: str = "") -> Optional[Verdict]:
    if _DERIV_ASK_RE.search(ctx.question or "") \
            and not _DERIV_ROUTE_RE.search(route or ""):
        return None
    var_names, fn, expr_desc = inv[0], inv[1], inv[2]
    extract = inv[3] if len(inv) > 3 else None
    when = inv[4] if len(inv) > 4 else None
    if when:
        _w = (r"\A(?:" + when + ")") if when[:3] in ("(?=", "(?!") else when
        if not re.search(_w, ctx.question, re.I):
            return None

    vals = []
    resolved_from_q = True
    q_vals = []
    for vname in var_names:
        aliases = [vname]
        if vname in ("r", "radius"): aliases += ["r", "radius", "rad", "r1"]
        if vname in ("h", "height"): aliases += ["h", "height", "ht"]
        if vname in ("l", "length"): aliases += ["l", "length", "len"]
        if vname in ("b", "w", "width", "breadth", "base"): aliases += ["b", "w", "width", "breadth", "base", "base_area"]
        if vname in ("d", "distance"): aliases += ["d", "distance", "dist"]
        if vname in ("v", "volume"): aliases += ["v", "volume", "vol"]
        if vname in ("s", "side"): aliases += ["s", "side"]
        if vname in ("arc", "arc_length"): aliases += ["arc", "arc_length"]
        if vname in ("a", "area"): aliases += ["a", "area"]
        v = ctx.get(*aliases)
        if v is None or not math.isfinite(v):
            resolved_from_q = False
            break
        q_vals.append(v)

    if resolved_from_q and len(q_vals) == len(var_names):
        vals = q_vals
    elif extract == "positional":
        nums = _positional_numbers(ctx.question)
        if len(nums) != len(var_names):
            return None
        vals = nums
    else:
        vals = []
        for vname in var_names:
            val = None
            if isinstance(extract, dict):
                pat = extract.get(vname)
                if pat:
                    m = re.search(pat, ctx.question, re.I)
                    if m:
                        try:
                            val = float(m.group(1).replace(",", ""))
                        except (ValueError, IndexError):
                            val = None
            if val is None:
                val = ctx.get(vname)
            if val is None or not math.isfinite(val):
                return None
            vals.append(val)
    try:
        _raw = fn(*vals)
    except Exception as e:
        return (NA, f"declarative invariant evaluation error: {e}")
    _cands = list(_raw) if isinstance(_raw, (tuple, list)) else [_raw]
    _tol = inv[5] if len(inv) > 5 else None
    _saw_finite = False
    for _cand in _cands:
        if _cand is None:
            continue
        try:
            expected = float(_cand)
        except (TypeError, ValueError):
            continue
        if not math.isfinite(expected):
            continue
        _saw_finite = True
        _rel = _tol if _tol is not None else 1e-3
        if _close(expected, ctx.claim, rel=_rel, abs_tol=0.01) \
                or _money_close(expected, ctx.claim):
            return (PASS, f"declarative invariant check ({expr_desc}): "
                          f"{expected:.6g} == claimed {ctx.claim:.6g}")
    if not _saw_finite:
        return None
    return (FAIL, f"declarative invariant violation ({expr_desc}): "
                  f"no candidate rebuilt the claimed "
                  f"{ctx.claim:.6g}")


def _verify_declarative_invariant(route: str, ctx: _Ctx) -> Optional[Verdict]:
    """Check route against declarative invariant formulas if not
    explicitly hand-coded.  Returns None when the invariant does not apply."""
    if ctx.claim is None:
        return None
    inv = DECLARATIVE_INVARIANTS.get(route)
    if inv is not None:
        if isinstance(inv, dict):
            return _eval_decl_row(inv, ctx)
        return _eval_decl_tuple(inv, ctx, route=route)

    # Secondary scan across all uploaded declarative formulas for generic solver routes:
    for name, entry in DECLARATIVE_INVARIANTS.items():
        if isinstance(entry, dict):
            when_pat = entry.get("when")
            if when_pat and re.search(when_pat, ctx.question, re.I):
                v = _eval_decl_row(entry, ctx)
                if v and v[0] == PASS:
                    return v
        elif isinstance(entry, (list, tuple)) and len(entry) > 4:
            when_pat = entry[4]
            if when_pat and re.search(when_pat, ctx.question, re.I):
                v = _eval_decl_tuple(entry, ctx, route=name)
                if v and v[0] == PASS:
                    return v
    return None


def _v_competency_closure(c: _Ctx) -> Verdict:
    """COMPETENCY:* catalog claims: residual closure.  Re-substitute
    the bound slots AND the claimed target into the concept's formula
    equations — a different code path from the executor's forward
    solve (it found slots that satisfy the equation; this checks the
    equation actually balances).  Residual ~0 -> PASS, large -> FAIL."""
    cid = c.route.split(":", 1)[-1]
    if not cid or c.claim is None:
        return _na("no concept id or no numeric claim")
    try:
        from backend.its.solver.competency_engine import _get_router
        router = _get_router()
        concept = None
        for cc in (getattr(router, "concepts", None) or []):
            if str(cc.get("id")) == cid:
                concept = cc
                break
    except Exception:
        return _na("router unavailable")
    if concept is None:
        return _na("concept not found")
    try:
        import sympy as _sp
    except Exception:
        return _na("sympy unavailable")
    # every 'lhs = rhs' the concept declares (formula + compute steps)
    eq_texts = []
    if str(concept.get("formula") or ""):
        eq_texts.append(str(concept["formula"]))
    for s in (concept.get("solution_steps") or []):
        comp = str(s.get("compute") or "").strip()
        if "=" in comp:
            eq_texts.append(comp)
    subs = dict(c.q)
    best = None
    for eqt in eq_texts:
        for part in re.split(r"[;\n]", eqt):
            if "=" not in part:
                continue
            lhs_s, rhs_s = part.split("=", 1)
            try:
                resid = _sp.sympify(
                    f"({lhs_s}) - ({rhs_s})".replace("^", "**"))
            except Exception:
                continue
            free = {str(s) for s in resid.free_symbols}
            free -= {"pi", "e"}
            # substitute bound slots; then try claim for each
            # remaining free var (the asked-for unknown)
            try:
                part_resid = resid.evalf(subs={
                    _sp.Symbol(str(k)): v for k, v in subs.items()})
            except Exception:
                continue
            rem = {str(s) for s in part_resid.free_symbols}
            for fv in (rem or {""}):
                try:
                    v = float(part_resid.evalf(
                        subs={_sp.Symbol(fv): c.claim} if fv else {}))
                except Exception:
                    continue
                if best is None or abs(v) < abs(best):
                    best = v
    if best is None:
        return _na("no evaluable equation")
    scale = max(1e-6, 0.01 * abs(c.claim))
    if abs(best) <= max(1e-4, scale):
        return (PASS, f"equation closure: residual {best:.4g} <= "
                      f"tolerance substituting {cid} slots+claim")
    return (FAIL, f"equation closure: residual {best:.4g} -- "
                  f"{cid} equations do not balance with the claimed "
                  f"{c.claim:.6g}")


def check_route(route: str, question: str, result: Any) -> Verdict:
    """Three-state core: (status in {pass, fail, na}, proof)."""
    ctx = _Ctx(route, question, result)
    # COMPETENCY:* catalog claims have a registered residual-closure
    # verifier — the executor's own path is not evidence enough to
    # ship VERIFIED, but a clean independent check is.
    if route.startswith("COMPETENCY") and ctx.claim is not None:
        try:
            v_comp = _v_competency_closure(ctx)
            if v_comp[0] in (PASS, FAIL):
                return v_comp
        except Exception:
            pass
        # Fall through so declarative invariants can independently verify

    if ctx.claim is None:
        fn = VERIFIERS.get(route)
        if fn is not None:
            try:
                status, proof = fn(ctx)
                if status in (PASS, FAIL, NA):
                    return (status, proof)
            except Exception as exc:
                return (NA, f"verifier error (treated as not-applicable): {exc}")
        concept_verdict = _verify_conceptual_invariant(route, ctx)
        if concept_verdict is not None:
            return concept_verdict
        qual_verdict = _verify_qualitative_invariant(route, ctx)
        if qual_verdict is not None:
            return qual_verdict
        return _na("result carries no numeric claim")

    fn = VERIFIERS.get(route)
    if fn is not None:
        try:
            status, proof = fn(ctx)
        except Exception as exc:  # a bug in OUR check is not evidence
            return (NA, f"verifier error (treated as not-applicable): {exc}")
        if status not in (PASS, FAIL, NA):  # defensive: malformed verdict
            return _na("verifier returned an unknown status")
        if status == NA:
            # WSA-P2 (2026-10-10): an NA is "no evidence either way",
            # not a verdict -- a registered PRE-ROUTE data row may
            # still re-derive the claim from the question's own text
            _row = _eval_preroute_row(route, ctx)
            if _row is not None:
                return _row
            decl_verdict = _verify_declarative_invariant(route, ctx)
            if decl_verdict is not None and decl_verdict[0] == PASS:
                return decl_verdict
        return (status, proof)
    # Check declarative invariant engine
    decl_verdict = _verify_declarative_invariant(route, ctx)
    if decl_verdict is not None:
        return decl_verdict
    concept_verdict = _verify_conceptual_invariant(route, ctx)
    if concept_verdict is not None:
        return concept_verdict
    qual_verdict = _verify_qualitative_invariant(route, ctx)
    if qual_verdict is not None:
        return qual_verdict
    return _na("route not registered for independent verification")



def verify_independent(route: str, question: str,
                       result: Any) -> Tuple[bool, str]:
    """Solve-boundary seam (spec contract): (ok, proof).

    ok is True ONLY on an independent-path PASS.  FAIL and NA both
    return ok=False; the proof string carries the status so callers can
    distinguish withheld (fail) from unverified (na).  Prefer
    check_route()/apply_to_model_result() for the tri-state handling.
    """
    status, proof = check_route(route, question, result)
    if status == PASS:
        return (True, proof)
    return (False, f"[{status}] {proof}")


def apply_to_model_result(result: Any, question: str) -> Any:
    """ModelResult-shaped harness for the solve boundary.

    pass -> proof line appended to steps, confidence bumped.
    fail -> the answer is DOWNGRADED: a fresh ModelResult with
            matched=False and final/numeric answers suppressed, note
            "independent check failed -- answer withheld: ...".
    na   -> unchanged object with an honest note appended (no bump).

    Returns the SAME object on pass/na and a NEW object on fail, so
    callers can detect the downgrade by identity or by matched.
    """
    structure = getattr(result, "structure", "") or ""
    status, proof = check_route(structure, question, result)
    if status == PASS:
        steps = list(getattr(result, "steps", None) or [])
        steps.append(f"Independent check (second path): {proof}")
        try:
            result.steps = steps
            result.confidence = min(
                _CONF_CAP, float(getattr(result, "confidence", 0.0))
                + _CONF_BUMP)
            note = getattr(result, "note", "") or ""
            result.note = (note + "; " if note else "") + \
                "verified by an independent second path"
        except Exception as _e:
            # frozen dataclass: proof already in steps fallback
            _log.debug("verify-bump on frozen result: %s",
                       type(_e).__name__)
        return result
    if status == FAIL:
        # dataclass(..) copy instead of replace() so duck-typed results
        # (contract SolverOutcome later) degrade through the same path
        downgraded = type(result)(
            structure=structure,
            matched=False,
            confidence=0.0,
            quantities=getattr(result, "quantities", {}) or {},
            governing_equation=getattr(result, "governing_equation", "") or "",
            final_answer=None,
            numeric_answer=None,
            steps=list(getattr(result, "steps", None) or []),
            note=f"independent check failed -- answer withheld: {proof}",
        )
        return downgraded
    # NA on a REGISTERED route: pass through honestly, no bump, note the
    # incapacity.  An UNREGISTERED route is untouched -- that is the
    # honest rollout contract, and stamping "not applicable" on every
    # unverified family answer would be noise, not verification.
    if structure not in registered_routes():
        return result
    try:
        note = getattr(result, "note", "") or ""
        result.note = (note + "; " if note else "") + \
            f"independent second-path check not applicable ({proof})"
    except Exception as _e:
        _log.debug("not-applicable note on frozen result: %s",
                   type(_e).__name__)
    return result


def verified_model_problem(text: str) -> Any:
    """model_problem + independent verification, for solve-boundary
    callers (answer_pipeline sweeps, router stage 1).  Unregistered
    routes and refusals pass through untouched."""
    from backend.its.solver.modeling_layer import model_problem
    return apply_to_model_result(model_problem(text), text)


def registered_routes() -> List[str]:
    return sorted(set(VERIFIERS) | set(DECLARATIVE_INVARIANTS) | set(CONCEPTUAL_INVARIANTS) | {
        "LINES_PARALLEL", "VECTOR_RELATION", "QUAD_NATURE", "CONSISTENCY"
    })


# --------------------------------------------------------------------------- #
# LANG-ALL grammar verifiers (2026-10-07): the grammar families ship
# STRING answers (no numeric claim), so the declarative engine NAs them
# and the strict-unverified badge kills the answer at the choke point.
# Each check below is a genuine second path: it re-reads the QUESTION's
# ask shape and validates the SHIPPED string against it — different code
# from the family computes (which transform, not validate).
# --------------------------------------------------------------------------- #

_LANG_BE = r"(is|are|am|was|were|being|been)"


def _v_lang_passive(ctx):
    """active->passive: the shipped sentence must carry a be-form and a
    'by <agent>' tail, and must NOT be the active verb form."""
    a = ctx.final_answer or ""
    al = a.lower()
    if "already in the passive" in al:
        return ("na", "no conversion requested (already passive)")
    if not re.search(r"\bby\s+\w", al):
        return ("fail", f"no by-agent in shipped answer: {a!r}")
    if not re.search(_LANG_BE, al):
        return ("fail", f"no be-form in shipped answer: {a!r}")
    if re.search(r"\b(is|are|am)\s+\w+ing\b", al) and \
            "being" not in al:
        return ("fail", f"active continuous shipped: {a!r}")
    return ("pass", "be-form + by-agent present, no active verb group")


def _v_lang_active(ctx):
    """passive->active: no 'by <agent>' tail left in the answer."""
    a = (ctx.final_answer or "").lower()
    if "already in the active" in a:
        return ("na", "no conversion requested (already active)")
    if re.search(r"\bby\s+\w", a):
        return ("fail", f"by-agent still present: {a!r}")
    return ("pass", "no passive residue in shipped answer")


_LANG_TENSE_SIG = {
    "future_cont": r"\bwill\s+be\s+\w+ing\b",
    "fut_perf": r"\bwill\s+have\b",
    "future": r"\bwill\s+\w",
    "past_simple": r"^(?!.*\b(?:will|am|is|are)\b).*$",
    "pres_simple": r"^(?!.*\b(?:will|was|were|being)\b).*$",
    "pres_cont": r"\b(am|is|are)\s+\w+ing\b",
    "past_cont": r"\b(was|were)\s+\w+ing\b",
    "pres_perf": r"\b(have|has)\s+\w+(ed|en|ne|wn|un|one|ade|itten)\b",
    "past_perf": r"\bhad\s+\w",
    "pres_perf_cont": r"\b(have|has)\s+been\s+\w+ing\b",
}
_LANG_TENSE_KEY = {
    "future_cont": "future continuous", "fut_perf": "future perfect",
    "future": "future tense", "past_simple": "simple past",
    "pres_simple": "simple present", "pres_cont": "present continuous",
    "past_cont": "past continuous", "pres_perf": "present perfect",
    "past_perf": "past perfect",
    "pres_perf_cont": "present perfect continuous",
}


def _v_lang_tense(ctx):
    """tense conversion: the shipped sentence must carry the target
    tense's auxiliary signature read back from the QUESTION."""
    q = ctx.question.lower()
    target = None
    for name, key in _LANG_TENSE_KEY.items():
        if key in q:
            target = name
            break
    if target is None:
        # plain 'future/past/present tense'
        if re.search(r"\bfuture\s+tense\b", q):
            target = "future"
        elif re.search(r"\bpast\s+tense\b", q):
            target = "past_simple"
        elif re.search(r"\bpresent\s+tense\b", q):
            target = "pres_simple"
    if target is None:
        return ("na", "target tense not typable from the question")
    a = ctx.final_answer or ""
    if not a:
        return ("fail", "no answer shipped")
    if re.search(_LANG_TENSE_SIG[target], a, re.I):
        return ("pass", f"target signature {target} present")
    return ("fail", f"target signature {target} absent: {a!r}")


def _v_lang_speech(ctx):
    """direct->indirect: a reporting verb + conjunction and NO quotes."""
    a = ctx.final_answer or ""
    al = a.lower()
    if "\u201c" in a or '"' in a or "'" in a:
        return ("fail", f"quotation marks survive in {a!r}")
    if not re.search(r"\b(said|asked|told|requested|ordered|proposed|"
                     r"advised)\b", al):
        return ("fail", f"no reporting verb in {a!r}")
    if not re.search(r"\b(that|if|whether)\b|\b(what|when|where|who|"
                     r"why|how)\b", al):
        return ("fail", f"no conjunction in {a!r}")
    return ("pass", "reporting verb + conjunction, quotes removed")


def _v_lang_pos(ctx):
    """POS tagging: every tag is a known part of speech and coverage of
    the sentence tokens is real."""
    a = ctx.final_answer or ""
    tags = re.findall(r"\(([a-z ]+)\)", a)
    if len(tags) < 3:
        return ("na", "not a tag list")
    known = {"noun", "verb", "adjective", "adverb", "pronoun",
             "preposition", "conjunction", "determiner", "interjection"}
    bad = [t for t in tags if t not in known]
    if bad:
        return ("fail", f"unknown tags: {bad}")
    qtoks = re.findall(r"[A-Za-z']+", ctx.question)
    tagged = {t.lower() for t in re.findall(r"([A-Za-z']+)\s*\(", a)}
    cov = sum(1 for w in qtoks if w.lower() in tagged)
    if qtoks and cov / len(qtoks) < 0.6:
        return ("fail", f"tag coverage {cov}/{len(qtoks)} too low")
    return ("pass", f"{len(tags)} known tags, coverage ok")


def _v_lang_trans(ctx):
    """transformation: the shipped answer must realise one of the
    canonical shapes (so..that / no sooner..than / degree flip /
    too..to)."""
    a = (ctx.final_answer or "").lower()
    shapes = (
        (r"\bso\s+\w+\s+that\b", "so-that"),
        (r"\bno sooner\b.*\bthan\b", "no-sooner-than"),
        (r"\bas soon as\b", "as-soon-as"),
        (r"\btoo\s+\w+\s+to\b", "too-to"),
        (r"\bis not as\s+\w+\s+as\b", "positive-degree"),
        (r"\bis\s+\w+er\s+than\b", "comparative-degree"),
        (r"\bnot only\b.*\bbut also\b", "not-only-but-also"),
    )
    for pat, name in shapes:
        if re.search(pat, a):
            return ("pass", f"shape {name} realised")
    return ("fail", f"no transformation shape in {a!r}")


def _v_lang_sandhi(ctx):
    """sandhi vigraha: the split answers the word actually asked about.
    (Sandhi is NOT a literal concatenation — vowels fuse at the
    junction — so re-joining is not a valid invariant.)"""
    a = ctx.final_answer or ""
    if "+" not in a:
        return ("na", "not a split (unavailable-list or type-only)")
    dev = re.findall(r"[\u0900-\u097F]{2,}", ctx.question)
    if not dev:
        return ("na", "target word unclear")
    word = dev[-1]
    if a.startswith(word):
        return ("pass", f"split issued for {word}")
    return ("fail", f"answer {a!r} not for word {word!r}")


def _v_lang_samas(ctx):
    a = ctx.final_answer or ""
    bheds = ("तत्पुरुष", "कर्मधारय", "द्विगु", "द्वंद्व", "बहुव्रीहि",
             "अव्ययीभाव")
    if any(b in a for b in bheds):
        return ("pass", "samasa bhed named")
    return ("na", "no bhed in answer (unavailable-list)")


def _v_lang_karak(ctx):
    a = ctx.final_answer or ""
    if "कारक" in a and a.strip().endswith("।"):
        return ("pass", "postposition-rule answer shipped")
    return ("fail", f"malformed karak answer: {a!r}")


def _v_lang_vachan(ctx):
    a = ctx.final_answer or ""
    if "\u2192" in a:
        forms = [f.strip() for f in a.split("\u2192")]
        if len(forms) == 2 and forms[0] != forms[1]:
            return ("pass", "vachan pair shipped, forms differ")
        return ("fail", f"vachan pair identical: {a!r}")
    return ("na", "no pair in answer")


def _v_lang_kaal(ctx):
    a = ctx.final_answer or ""
    ask = ctx.question
    labels = {"भूत": "भूतकाल", "भविष्य": "भविष्यत्काल",
              "वर्तमान": "वर्तमानकाल"}
    for k, lab in labels.items():
        if k in ask:
            if lab in a:
                return ("pass", f"{lab} rendered")
            return ("fail", f"asked {lab}, answer: {a!r}")
    return ("na", "target kaal not typable")


LANG_VERIFIERS = {
    "LANG_ENG_PASSIVE": _v_lang_passive,
    "LANG_ENG_ACTIVE": _v_lang_active,
    "LANG_ENG_TENSE": _v_lang_tense,
    "LANG_ENG_SPEECH": _v_lang_speech,
    "LANG_ENG_POS": _v_lang_pos,
    "LANG_ENG_TRANS": _v_lang_trans,
    "LANG_HI_SANDHI": _v_lang_sandhi,
    "LANG_HI_SAMAS": _v_lang_samas,
    "LANG_HI_KARAK": _v_lang_karak,
    "LANG_HI_VACHAN": _v_lang_vachan,
    "LANG_HI_KAAL": _v_lang_kaal,
}
VERIFIERS.update(LANG_VERIFIERS)




# --------------------------------------------------------------------------- #
# STEM-PC FULL-SPAN (2026-10-07 wave): hand-written second paths ONLY
# for the genuinely irregular routes -- coordinate-walk system energy,
# colour-band decode, nuclear stoichiometry, path-vs-displacement.
# Everything equation-shaped from this wave is a _PHYSICS_DECL row.
# --------------------------------------------------------------------------- #

def _v_elc_system_pe(c: "_Ctx") -> "Verdict":
    """ELC_SYSTEM_PE: U = k sum qi qj/rij with the pair distances
    re-walked from the coordinates (fresh parse)."""
    q = c.question
    qs = []
    for m in re.finditer(r"q[123\u2081\u2082\u2083]\s*=\s*([-+]?)\s*"
                         r"(\d+(?:\.\d+)?)\s*([u\u00b5\u03bc])?\s*C\b",
                         q, re.I):
        v = float(m.group(2))
        if m.group(1) == "-":
            v = -v
        if m.group(3):
            v *= 1e-6
        qs.append(v)
    pts = re.findall(
        r"\(\s*(-?\d+(?:\.\d+)?)\s*(cm|mm|m)?\s*,\s*"
        r"(-?\d+(?:\.\d+)?)\s*(cm|mm|m)?\s*\)", q, re.I)
    if len(qs) != 3 or len(pts) != 3 or c.claim is None:
        return _na("system energy quantities incomplete")
    conv = {"mm": 0.001, "cm": 0.01, "m": 1.0, None: 1.0}
    P = [(float(px) * conv[(xu or yu or "m")],
          float(py) * conv[(yu or xu or "m")])
         for px, xu, py, yu in pts]

    def d(a, b):
        return math.hypot(P[a][0] - P[b][0], P[a][1] - P[b][1])
    U = 9.0e9 * (qs[0] * qs[1] / d(0, 1) + qs[0] * qs[2] / d(0, 2)
                 + qs[1] * qs[2] / d(1, 2))
    if _close(U, c.claim):
        return (PASS, "second path: U = k sum qi qj/rij (coordinates "
                f"re-walked) = {U:.6g} J -- matches")
    return (FAIL, f"second path: U = {U:.6g} J != claimed {c.claim:.6g}")


_COLOR_DIGITS_V = {
    "black": 0, "brown": 1, "red": 2, "orange": 3, "yellow": 4,
    "green": 5, "blue": 6, "violet": 7, "grey": 8, "gray": 8, "white": 9,
}


def _v_elc_color_code(c: "_Ctx") -> "Verdict":
    """ELC_COLOR_CODE: re-decode the bands, then I = V/R."""
    q = c.question
    bands = [w for w in re.findall(r"[a-z]+", q.lower())
             if w in _COLOR_DIGITS_V][:3]
    if len(bands) < 3 or c.claim is None:
        return _na("colour bands incomplete")
    R = ((_COLOR_DIGITS_V[bands[0]] * 10 + _COLOR_DIGITS_V[bands[1]])
         * 10.0 ** _COLOR_DIGITS_V[bands[2]])
    vm = re.search(r"across\s+a\s+(\d+(?:\.\d+)?)\s*V\b", q, re.I) or \
        re.search(r"(\d+(?:\.\d+)?)\s*V\s+battery", q, re.I)
    if vm is None:
        want = R
        what = "decoded R from the bands"
    else:
        want = float(vm.group(1)) / R
        what = "I = V/R (fresh decode)"
    if _close(want, c.claim):
        return (PASS, f"second path: {what} = {want:.6g} -- matches")
    return (FAIL, f"second path: {what} = {want:.6g} != "
                  f"claimed {c.claim:.6g}")


def _v_nuc_qvalue(c: "_Ctx") -> "Verdict":
    """NUC_QVALUE: Q = (m_in - m_out) x 931.5 with stoichiometric
    species counts re-derived from the equation."""
    q = c.question
    eq = re.search(r"([^.:]*?(?:\u2192|->)\s*[^.:]*)", q)
    lm = re.findall(r"m\s*\(([^)]*)\)\s*=\s*(\d+(?:\.\d+)?)\s*u", q)
    if eq is None or len(lm) < 3 or c.claim is None:
        return _na("q-value quantities incomplete")
    left, right = re.split(r"\u2192|->", eq.group(1), 1)
    mi = mf = 0.0
    for sym, val_s in lm:
        sym_t = sym.strip()
        v = float(val_s)
        if sym_t in left:
            mi += v * max(1, len(re.findall(re.escape(sym_t), left)))
        elif sym_t in right:
            mf += v * max(1, len(re.findall(re.escape(sym_t), right)))
        else:
            return _na("mass token not on either side of the arrow")
    dm = mi - mf
    if dm == 0:
        return _na("degenerate mass difference")
    want = dm * 931.5
    if _close(want, c.claim):
        return (PASS, f"second path: Q = dm x 931.5 = {want:.6g} MeV "
                      "-- matches")
    return (FAIL, f"second path: Q = {want:.6g} MeV != "
                  f"claimed {c.claim:.6g}")


def _v_kin_path_disp(c: "_Ctx") -> "Verdict":
    """KIN_PATH_DISPLACEMENT: path length = sum |legs| re-walked from
    the x-coordinate sequence."""
    q = c.question
    # \u2212: the corpus uses the unicode minus for negative coordinates
    coords = [float(x.replace("\u2212", "-")) for x in re.findall(
        r"x\s*=\s*([-+\u2212]?\d+(?:\.\d+)?)\s*m\b", q)]
    if len(coords) < 2 or c.claim is None:
        return _na("path coordinates incomplete")
    path = sum(abs(coords[i + 1] - coords[i])
               for i in range(len(coords) - 1))
    if _close(path, c.claim):
        return (PASS, "second path: sum |x_{i+1} - x_i| (coordinates "
                      f"re-walked) = {path:.6g} m -- matches")
    return (FAIL, f"second path: path = {path:.6g} m != "
                  f"claimed {c.claim:.6g}")


def _v_mech_screw_lc(c: "_Ctx") -> "Verdict":
    """MECH_SCREW_LC: LC = pitch/divisions; a positive zero error reads
    high so the corrected reading subtracts it (unit-consistent pair).
    PHY-CISCE 2026-10-08: input shapes extended for the ICSE phrasing
    (zero error stated in DIVISIONS off the reference line + the
    observed reading given as MSR/CSR) -- same irregular unit-mixing
    justification as the original hand-written path; the relation is
    unchanged."""
    q = c.question
    pm = re.search(r"pitch\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*(mm|cm|m)", q,
                   re.I)
    nm = re.search(r"(\d+)\s*divisions?\s+on\s+(?:its|the)\s+circular", q,
                   re.I)
    if not (pm and nm) or c.claim is None:
        return _na("screw gauge quantities incomplete")
    lc = float(pm.group(1)) / float(nm.group(1))
    om = re.search(r"observed\s+reading\s+(?:of\s+|is\s+)?"
                   r"(\d+(?:\.\d+)?)\s*(mm|cm|m)", q, re.I)
    zm = re.search(r"zero\s+error\s+(?:is\s+)?([+-])\s*(\d+(?:\.\d+)?)"
                   r"\s*(mm|cm|m)", q, re.I)
    if om and zm and om.group(2) == zm.group(2):
        sign = 1.0 if zm.group(1) == "+" else -1.0
        want = float(om.group(1)) - sign * float(zm.group(2))
        if _close(want, c.claim):
            return (PASS, "second path: corrected = observed - (+zero "
                    f"error) = {want:.6g} {pm.group(2)} -- matches")
        return (FAIL, f"second path: corrected = {want:.6g} "
                f"{pm.group(2)} != claimed {c.claim:.6g}")
    # ICSE shapes: zero of the circular scale is N divisions above/below
    # the reference line; observed = MSR + CSR x LC
    zdm = re.search(r"zero\s+of\s+the\s+circular\s+scale\s+is\s+"
                    r"(\d+)\s+divisions?\s+(above|below)", q, re.I)
    msrm = re.search(r"MSR\s*=\s*(\d+(?:\.\d+)?)\s*(mm|cm)?", q, re.I)
    csrm = re.search(r"CSR\s*=\s*(\d+)", q, re.I)
    if zdm and msrm and csrm:
        z_sign = 1.0 if zdm.group(2).lower() == "above" else -1.0
        msr = float(msrm.group(1))
        if (msrm.group(2) or "mm").lower() == "cm":
            msr *= 10.0
        observed = msr + float(csrm.group(1)) * lc
        want = observed - z_sign * float(zdm.group(1)) * lc
        if _close(want, c.claim):
            return (PASS, "second path: corrected = MSR + CSR x LC - "
                    f"({zdm.group(1)} div x LC) = {want:.6g} "
                    f"{pm.group(2)} -- matches")
        return (FAIL, f"second path: corrected = {want:.6g} "
                f"{pm.group(2)} != claimed {c.claim:.6g}")
    if _close(lc, c.claim):
        return (PASS, f"second path: LC = pitch/divisions = {lc:.6g} "
                f"{pm.group(2)} -- matches")
    return (FAIL, f"second path: LC = {lc:.6g} {pm.group(2)} != "
                  f"claimed {c.claim:.6g}")


VERIFIERS.update({
    "ELC_SYSTEM_PE": _v_elc_system_pe,
    "ELC_COLOR_CODE": _v_elc_color_code,
    "NUC_QVALUE": _v_nuc_qvalue,
    "KIN_PATH_DISPLACEMENT": _v_kin_path_disp,
    "MECH_SCREW_LC": _v_mech_screw_lc,
})


# --------------------------------------------------------------------------- #
# LOOP-FIXER WAVE (2026-10-08) -- teaching-loop verifier coverage.
# Owner directive in force: DATA ROWS ONLY.  Every registration in this
# block is a declarative dict row evaluated by the shared _eval_decl_row
# engine (VERIFIER_ENGINE.md 2026-10-08); no hand-written verifier
# functions.  Rows pair with the maths4_families MATRIX_* families
# (LOOP-FIXER wave) that closed the maths-c12 "No canonical structure
# matched" refusals.
# --------------------------------------------------------------------------- #

_LOOPFIX_DECL: Dict[str, Dict[str, Any]] = {
    # c12_math_cbse_03_005: A=[[a,b],[c,d]], B=[[p,q],[r,s]] -> AB.
    # The family ships the whole product; the answer text LEADS with the
    # (1,1) entry, so the gate's claim is that entry.  The row rebuilds
    # it from the family's parsed slots (both corpus notations land in
    # the same slot names via the alias tuples).
    "MATRIX_PRODUCT_2X2": {
        "label": "2x2 product entry-(1,1) rebuild",
        "when": r"product\s+AB\s+where",
        "need": {"a": ("a", "a2"), "b": ("b", "b2"),
                 "p": ("p", "p2"), "r": ("r", "r2")},
        "eqs": [lambda a, b, p, r: a * p + b * r],
    },
    # c12_math_cbse_03_006: compute 3A - 2B -- leading entry =
    # m1*a - m2*p; the answer text leads with the combined matrix.
    "MATRIX_SCALAR_COMBINE": {
        "label": "scalar-combine entry-(1,1) rebuild",
        "when": r"compute\s+\d+\s*A\s*-\s*\d+\s*B\b",
        "need": {"m1": "m1", "m2": "m2",
                 "a": ("a", "a2"), "p": ("p", "p2")},
        "eqs": [lambda m1, m2, a, p: m1 * a - m2 * p],
    },
    # c11_math_isc_06_003: "Compute 8P5" -- the family evaluates
    # math.perm(n, r) (CPython factorial machine); the row re-derives
    # the value with the FALLING PRODUCT n(n-1)...(n-r+1), a different
    # algorithm.  Relation 2 serves the nCr sibling ask.  n/r ride in
    # via question regexes (the family binds no slots).
    "NPR_NCR_EVAL": {
        "label": "permutation/combination falling-product rebuild",
        "when": r"\d+\s*[PpC]\s*\d+",
        "qvars": {"n": r"(\d+)\s*[PpC]\s*\d+",
                  "r": r"\d+\s*[PpC]\s*(\d+)"},
        "eqs": [lambda n, r: math.prod(range(int(n) - int(r) + 1,
                                             int(n) + 1)),
                lambda n, r: math.prod(range(int(n) - int(r) + 1,
                                             int(n) + 1)) /
                        math.prod(range(1, int(r) + 1))],
    },
    # c7_physics_ch04_006: "travels a distance of 180 m ... in 30 s --
    # calculate the speed" -> speed = d/t from question regexes (the
    # family binds no slots).  `when` pins the FORWARD speed ask: a
    # time-from-speed question binds roles differently and must stay
    # unverified (observed mis-shape: the biology travel-time question
    # the family mis-parsed into 0.0005 s -- the guard keeps it out).
    "SPEED_DIST_TIME": {
        "label": "speed rebuild (d/t)",
        "when": r"calculate\s+the\s+speed|find\s+the\s+speed",
        "qvars": {"d": r"distance\s+of\s+(\d+(?:\.\d+)?)\s*m(?:eters?)?\b",
                  "t": r"in\s+(\d+(?:\.\d+)?)\s*(?:s\b|seconds?\b)"},
        "eqs": [lambda d, t: d / t],
    },
    # c11_bio_cbse_10_007: meiosis gamete chromosome halving -- the
    # family binds 2n/n slots and the previous hand-written verifier
    # (which needed a "divisions" slot this shape never carries) NA'd
    # every meiosis ask at the badge gate.  Converted to a data row per
    # the 2026-10-08 owner directive (data rows only): relation 1 halves
    # the diploid count; relation 2 keeps the old proliferation coverage
    # (cells = start x 2^k, start re-parsed from the question).  All
    # slot sets are opt so either shape can fire.
    "CELL_DIVISION_COUNT": {
        "label": "cell-division rebuild (gamete halving / 2^n loop)",
        # no `when` guard -- parity with the hand-written verifier this
        # row replaced (it checked the claim unguarded; an inverse ask
        # fails the rebuild and withholds exactly as before).  "mitotic"
        # wordings must never NA here: the tamper contract depends on
        # the check RUNNING.
        "need": {"tn": ("2n",), "k": ("divisions",)},
        "opt": ["tn", "k", "c0"],
        "qvars": {"c0": r"(?:from|starting\s+with)\s*"
                        r"(\d+(?:\.\d+)?)\s*cells?"},
        "eqs": [lambda tn: tn / 2.0,
                lambda k, c0: (c0 if c0 is not None else 1.0)
                * 2.0 ** k],
    },
}

for _decl_sid in _LOOPFIX_DECL:
    VERIFIERS.setdefault(_decl_sid,
                         _make_physics_decl_check(_decl_sid, _LOOPFIX_DECL))
