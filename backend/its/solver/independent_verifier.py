"""independent_verifier.py -- SECOND-PATH verification at the solve boundary.

The family modules (physics_families, maths2_families, ...) each carry a
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

import math
import re
from typing import Any, Callable, Dict, List, Optional, Tuple

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


# --------------------------------------------------------------------------- #
# verifier context
# --------------------------------------------------------------------------- #

class _Ctx:
    """Everything a verifier may read: question text, the family's
    quantities record, and the claimed numeric answer."""

    def __init__(self, route: str, question: str, result: Any):
        self.route = route
        self.question = question or ""
        q = getattr(result, "quantities", None)
        self.q: Dict[str, float] = dict(q) if isinstance(q, dict) else {}
        self.claim: Optional[float] = _claim_number(result)

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


# --------------------------------------------------------------------------- #
# VERIFIERS -- maths (maths2_families routes)
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
    if a is None or r is None:
        return None
    if infinite:
        return (a, r)
    n = _fnum(q, r"first\s+([\d.]+)\s+terms?")
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
    r = _fnum(q, r"at\s+([\d.]+)\s*%")
    t = _fnum(q, r"for\s+([\d.]+)\s*years?")
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
    if _close(s_area, s_algebra):
        return (PASS, f"average-velocity check: displacement by area "
                      f"(u+v)/2 x t = {s_area:.6g} m equals displacement "
                      f"by u t + 1/2 a t^2 = {s_algebra:.6g} m -- both "
                      "constant-acceleration paths agree")
    return (FAIL, f"average-velocity check failed: (u+v)/2 x t = "
                  f"{s_area:.6g} != u t + 1/2 a t^2 = {s_algebra:.6g}")


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
    if _close(lhs, rhs):
        return (PASS, f"equation-composition check: v = u + a t = "
                      f"{v_pred:.6g} m/s gives v^2 = {lhs:.6g} = "
                      f"u^2 + 2 a s = {rhs:.6g} -- the third equation "
                      "closes")
    return (FAIL, f"equation-composition check failed: (u + a t)^2 = "
                  f"{lhs:.6g} != u^2 + 2 a s = {rhs:.6g}")


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
    if _close(s_alt, s):
        return (PASS, f"equation-composition check: t = (v-u)/a = "
                      f"{t:.6g} s gives u t + 1/2 a t^2 = {s_alt:.6g} m "
                      f"= s = {s:.6g} m -- the second equation closes")
    return (FAIL, f"equation-composition check failed: u t + 1/2 a t^2 = "
                  f"{s_alt:.6g} != s = {s:.6g}")


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


def _v_ohms_law(c: _Ctx) -> Verdict:
    """OHMS_LAW_ANY / ohm_resistance / ohm_current: family used
    V = I R (rearranged).  Independent: Joule-power consistency -- the
    power relations P = V I, P = I^2 R, P = V^2/R must ALL agree on the
    recorded V, I, R.  The claim fills the SOLVED variable's slot (the
    ask word names it)."""
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
    rupees must close against the SI-rebuilt units."""
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


# --------------------------------------------------------------------------- #
# VERIFIERS -- commerce + accountancy
# --------------------------------------------------------------------------- #

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
# The registry: route id (family structure id) -> independent verifier.
# Registered ONLY where the alternate relation is provable from the
# corpus formulas AND the family provably emits what the check needs.
# --------------------------------------------------------------------------- #

VERIFIERS: Dict[str, VerifierFn] = {
    # maths
    "QUADRATIC_ROOTS": _v_quad_roots,
    "LINEAR_SOLVE": _v_linear_solve,
    "AP_SUM": _v_ap_sum,
    "AP_NTH": _v_ap_nth,
    "GP_SUM": _v_gp_sum,
    "GP_SUM_INFINITE": _v_gp_sum_infinite,
    "CIRCLE_AREA": _v_circle_area,
    "CIRCLE_CIRCUMFERENCE": _v_circle_circumference,
    "CIRCLE_SECTOR_AREA": _v_sector_area,
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
    # chemistry
    "HALF_LIFE_FIRST_ORDER": _v_half_life,
    "REMAINING_AFTER_HALFLIVES": _v_remaining_halflives,
    "AVG_ATOMIC_MASS": _v_avg_atomic_mass,
    # biology
    "ENERGY_FLOW_10_PERCENT": _v_energy_flow,
    "POP_DOUBLING": _v_pop_doubling,
    "CELL_DIVISION_COUNT": _v_cell_division,
    # economics
    "FISHER_REAL_RATE": _v_fisher,
    "MONEY_MULTIPLIER": _v_money_multiplier,
    "DEPOSIT_CREATION_CHAIN": _v_deposit_chain,
    "INVESTMENT_MULTIPLIER": _v_investment_multiplier,
    "APC_APS_IDENTITIES": _v_apc_aps,
    # commerce + accountancy
    "BEP_UNITS": _v_bep_units,
    "BEP_SALES": _v_bep_sales,
    "TRIAL_BALANCE_DIFF": _v_trial_balance,
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
}

# the confidence bump a second-path PASS earns (post-selection, so it
# never re-orders the family race; it strengthens the promoted result)
_CONF_BUMP = 0.02
_CONF_CAP = 0.99


# --------------------------------------------------------------------------- #
# Public API
# --------------------------------------------------------------------------- #

def check_route(route: str, question: str, result: Any) -> Verdict:
    """Three-state core: (status in {pass, fail, na}, proof)."""
    fn = VERIFIERS.get(route)
    if fn is None:
        return _na("route not registered for independent verification")
    ctx = _Ctx(route, question, result)
    if ctx.claim is None:
        return _na("result carries no numeric claim")
    try:
        status, proof = fn(ctx)
    except Exception as exc:  # a bug in OUR check is not evidence
        return (NA, f"verifier error (treated as not-applicable): {exc}")
    if status not in (PASS, FAIL, NA):  # defensive: malformed verdict
        return _na("verifier returned an unknown status")
    return (status, proof)


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
        except Exception:
            pass  # frozen dataclass: proof already in steps fallback
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
    if structure not in VERIFIERS:
        return result
    try:
        note = getattr(result, "note", "") or ""
        result.note = (note + "; " if note else "") + \
            f"independent second-path check not applicable ({proof})"
    except Exception:
        pass
    return result


def verified_model_problem(text: str) -> Any:
    """model_problem + independent verification, for solve-boundary
    callers (answer_pipeline sweeps, router stage 1).  Unregistered
    routes and refusals pass through untouched."""
    from backend.its.solver.modeling_layer import model_problem
    return apply_to_model_result(model_problem(text), text)


def registered_routes() -> List[str]:
    return sorted(VERIFIERS)
