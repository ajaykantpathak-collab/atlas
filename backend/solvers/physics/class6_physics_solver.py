"""
Class 6 Physics — Deterministic Solver
Nodes: c6_phy_001 (Physical quantities & units)
       c6_phy_002 (Measurement of length)
       c6_phy_003 (Measurement of mass)
"""
from __future__ import annotations
import math, random
from dataclasses import dataclass, field
from typing import Optional, List, Tuple, Union
from enum import Enum, auto

# ── seed ────────────────────────────────────────────────────────────────────
DEFAULT_SEED = 42

def make_rng(seed: int = DEFAULT_SEED) -> random.Random:
    return random.Random(seed)

# ── data types ───────────────────────────────────────────────────────────────
@dataclass
class QDetail:
    node: str
    subtype: str
    prompt: str
    answer: str
    explanation: str
    steps: List[str] = field(default_factory=list)

@dataclass
class CheckResult:
    correct: bool
    expected: float
    got: float
    tolerance: float
    unit: str

# ══════════════════════════════════════════════════════════════════════════════
# NODE c6_phy_001 — Physical quantities and units
# ══════════════════════════════════════════════════════════════════════════════
class Node001:
    NODE = "c6_phy_001"

    # --- canonical knowledge map -------------------------------------------
    SI_UNITS = {
        "length":      ("metre",   "m"),
        "mass":        ("kilogram","kg"),
        "time":        ("second",  "s"),
        "temperature": ("kelvin",  "K"),
    }

    @staticmethod
    def solve_fill_in_blank(blank_type: str, seed: int = 0) -> QDetail:
        rng = make_rng(seed)
        qtype = rng.choice(["si_unit", "term_definition", "need_standard"])

        if qtype == "si_unit":
            q   = rng.choice(["length", "mass", "time", "temperature"])
            ans = Node001.SI_UNITS[q]
            prompt = (
                f"What is the SI unit of {q}? "
                f"Give the full name and its symbol."
            )
            expl   = (
                f"The SI (International System of Units) defines "
                f"'{ans[0]}' with symbol '{ans[1]}' as the standard unit "
                f"for {q}."
            )
            steps = [
                "Recall the four basic physical quantities: "
                "length, mass, time, temperature.",
                f"Match '{q}' with its SI unit from the standard table.",
                f"Answer: {ans[0]} ({ans[1]}).",
            ]
            return QDetail(Node001.NODE, "si_unit", prompt,
                           f"{ans[0]} ({ans[1]})", expl, steps)

        elif qtype == "term_definition":
            terms = {
                "measurement": "Comparison of an unknown quantity "
                               "with a known standard unit.",
                "physical quantity": "A property that can be measured "
                                     "and expressed as a number with a unit.",
                "unit": "A fixed quantity used as a standard of measurement.",
                "standard unit": "A unit that is universally accepted "
                                 "and does not vary from person to place.",
            }
            term = rng.choice(list(terms.keys()))
            prompt = f"Define '{term}'."
            ans   = terms[term]
            expl  = (
                "Definitions are fixed by international agreement "
                "(SI convention) to ensure uniform communication worldwide."
            )
            steps = [
                f"Recall textbook definition of '{term}'.",
                "Express it clearly in your own words.",
                f"Answer: {ans}",
            ]
            return QDetail(Node001.NODE, "term_definition", prompt,
                           ans, expl, steps)

        else:  # need_standard
            prompt = (
                "Why do we need a standard unit of measurement? "
                "Explain with one example."
            )
            ans = (
                "Body-based units (e.g. hand-span, cubit) vary from person "
                "to person. A standard unit like the metre is the same "
                "everywhere, so measurements are consistent and comparable."
            )
            expl = (
                "Example: If you measure a desk with your hand-span (say 4 "
                "spans) and a taller friend measures it (say 3 spans), the "
                "numbers differ — but the desk hasn't changed. A standard "
                "unit removes this confusion."
            )
            steps = [
                "Think of non-standard units: hand-span, foot, cubit.",
                "These vary with the person using them.",
                "A standard unit (metre) is fixed and agreed upon by everyone.",
                "This ensures the same measurement regardless of who measures.",
                "Answer: Standard units prevent variation; example given.",
            ]
            return QDetail(Node001.NODE, "need_standard", prompt,
                           ans, expl, steps)

    @staticmethod
    def verify(question_type: str, user_answer: str, expected: str) -> CheckResult:
        """Rough check for numeric/unit answers."""
        ua = user_answer.strip().lower()
        ex = expected.strip().lower()
        ok = (ua == ex or ex in ua)
        return CheckResult(ok, 0.0, 0.0, 0.0, "")

# ══════════════════════════════════════════════════════════════════════════════
# NODE c6_phy_002 — Measurement of length
# ══════════════════════════════════════════════════════════════════════════════
class Node002:
    NODE = "c6_phy_002"

    # conversion factors  (factor = target / source)
    CONV = {
        ("km","m"):  1_000,
        ("hm","m"):    100,
        ("dam","m"):    10,
        ("m","m"):       1,
        ("dm","m"):     0.1,
        ("cm","m"):    0.01,
        ("mm","m"):   0.001,
    }

    @staticmethod
    def convert_length(value: float, frm: str, to: str) -> Tuple[float, float]:
        """Convert value in 'frm' to 'to'. Returns (result_in_to, result_in_m)."""
        in_m = value * Node002.CONV.get((frm.lower(),"m"), Node002.CONV.get(("m","m"),1))
        if (to.lower(),"m") in Node002.CONV:
            factor = Node002.CONV[(to.lower(),"m")]
        else:
            factor = 1.0 / Node002.CONV[("m", to.lower())]
        return in_m / factor if factor != 0 else 0.0, in_m

    @staticmethod
    def solve_unit_conversion(value: float, frm: str, to: str,
                               seed: int = 0) -> QDetail:
        rng   = make_rng(seed)
        units = ["km","hm","dam","m","dm","cm","mm"]
        # ensure conversion is meaningful (not same unit)
        idx   = rng.randint(0, len(units)-1)
        jdx   = rng.randint(0, len(units)-1)
        while jdx == idx:
            jdx = rng.randint(0, len(units)-1)
        frm, to = units[idx], units[jdx]
        # generate a clean integer value
        value = rng.randint(1, 50)

        result, in_m = Node002.convert_length(value, frm, to)
        prompt = f"Convert {value} {frm} into {to}."
        expl   = (
            f"1 {frm} = {Node002.CONV.get((frm,'m'), 1/Node002.CONV[('m',frm)]):.3f} m  →  "
            f"{value} {frm} = {in_m:.3f} m\n"
            f"1 {to} = {Node002.CONV.get((to,'m'), 1/Node002.CONV[('m',to)]):.3f} m\n"
            f"∴ {value} {frm} = {in_m:.3f} / {Node002.CONV.get((to,'m'),1/Node002.CONV[('m',to)]):.3f} "
            f"= {result:.4f} {to}"
        )
        steps = [
            f"Step 1 — Convert {frm} to metres: "
            f"{value} × {Node002.CONV.get((frm,'m'), 1/Node002.CONV[('m',frm)])} "
            f"= {in_m:.3f} m",
            f"Step 2 — Convert metres to {to}: "
            f"{in_m:.3f} ÷ {Node002.CONV.get((to,'m'),1/Node002.CONV[('m',to)])} "
            f"= {result:.4f} {to}",
            f"Answer: {result:.4f} {to}  (≈ {round(result,2)} {to})",
        ]
        return QDetail(Node002.NODE, "unit_conversion", prompt,
                       f"{round(result,4)} {to}", expl, steps)

    @staticmethod
    def solve_addition(value1: float, frm1: str,
                       value2: float, frm2: str,
                       target: str, seed: int = 0) -> QDetail:
        rng = make_rng(seed)
        units = ["m","dm","cm","mm"]
        v1, u1 = value1, frm1
        v2, u2 = value2, frm2
        tgt    = target

        _, in1 = Node002.convert_length(v1, u1, "m")
        _, in2 = Node002.convert_length(v2, u2, "m")
        total_m = in1 + in2

        # convert total to target
        if (tgt.lower(),"m") in Node002.CONV:
            factor = Node002.CONV[(tgt.lower(),"m")]
        else:
            factor = 1.0 / Node002.CONV[("m", tgt.lower())]
        result = total_m / factor

        prompt = f"Add {v1} {u1} and {v2} {u2}. Give the answer in {tgt}."
        expl   = (
            f"{v1} {u1} = {in1:.4f} m\n"
            f"{v2} {u2} = {in2:.4f} m\n"
            f"Total = {total_m:.4f} m\n"
            f"1 {tgt} = {Node002.CONV.get((tgt,'m'),1/Node002.CONV[('m',tgt.lower())]):.4f} m\n"
            f"∴ {total_m:.4f} m = {result:.4f} {tgt}"
        )
        steps = [
            f"Convert both quantities to the same unit (metres):",
            f"  {v1} {u1} = {in1:.4f} m",
            f"  {v2} {u2} = {in2:.4f} m",
            f"Add: {total_m:.4f} m",
            f"Convert result to {tgt}: {total_m:.4f} ÷ "
            f"{Node002.CONV.get((tgt,'m'),1/Node002.CONV[('m',tgt.lower())]):.4f} "
            f"= {result:.4f} {tgt}",
            f"Answer: {round(result,3)} {tgt}",
        ]
        return QDetail(Node002.NODE, "addition", prompt,
                       f"{round(result,3)} {tgt}", expl, steps)

    @staticmethod
    def solve_curved_line(thread_len_cm: float,
                          seed: int = 0) -> QDetail:
        rng = make_rng(seed)
        length = round(thread_len_cm, 1)
        prompt = (
            "A curved line is measured by laying a thread along it and "
            f"straightening the thread against a ruler. The thread shows "
            f"{length} cm. What is the length of the curved line?"
        )
        ans    = f"{length} cm"
        expl   = (
            "When a thread is laid along a curve and then straightened, "
            "its length equals the actual length of the curve (by "
            "conservation of thread length)."
        )
        steps = [
            "Place thread along the curve without stretching.",
            "Mark the thread at the end point of the curve.",
            "Straighten the thread and measure against a ruler.",
            "The ruler reading = length of the curved line.",
            f"Answer: {length} cm",
        ]
        return QDetail(Node002.NODE, "curved_line", prompt, ans, expl, steps)

    @staticmethod
    def verify_unit_conversion(user_val: float, expected_val: float,
                                unit: str, tol: float = 0.5) -> CheckResult:
        return CheckResult(
            abs(user_val - expected_val) <= tol,
            expected_val, user_val, tol, unit
        )

# ══════════════════════════════════════════════════════════════════════════════
# NODE c6_phy_003 — Measurement of mass
# ══════════════════════════════════════════════════════════════════════════════
class Node003:
    NODE = "c6_phy_003"

    STANDARD_MASSES_G = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000]

    @staticmethod
    def solve_beam_balance(pan_a: List[Tuple[float,str]],
                            pan_b: List[Tuple[float,str]],
                            seed: int = 0) -> QDetail:
        """
        pan_a, pan_b: list of (mass_value, 'g'|'kg'|'mg')
        Beam balances when total_a_g == total_b_g (after conversion).
        Returns the QDetail describing the comparison.
        """
        rng = make_rng(seed)

        def to_g(v, u):
            if u == "kg":  return v * 1000
            if u == "mg":  return v / 1000
            return v

        total_a = sum(to_g(v,u) for v,u in pan_a)
        total_b = sum(to_g(v,u) for v,u in pan_b)
        balanced = abs(total_a - total_b) < 0.01

        a_str = " + ".join(f"{v} {u}" for v,u in pan_a)
        b_str = " + ".join(f"{v} {u}" for v,u in pan_b)
        prompt = (
            "A beam balance has the following masses:\n"
            f"  Left pan: {a_str}\n"
            f"  Right pan: {b_str}\n"
            "Will the beam balance be in equilibrium (horizontal)? "
            "Justify with calculations."
        )
        ans = (
            f"Left pan total = {total_a:.1f} g; "
            f"Right pan total = {total_b:.1f} g. "
            f"{'Balanced ✅' if balanced else 'Not balanced ❌'} — "
            f"difference = {abs(total_a-total_b):.1f} g."
        )
        expl = (
            "A beam balance works on the principle of moments: "
            "if the total mass on both pans is equal, the beam stays "
            "horizontal (equilibrium). The arm lengths are equal, "
            "so equal masses produce equal turning forces."
        )
        steps = [
            f"Step 1 — Convert all masses to the same unit (gram):",
            f"  Left pan ({a_str}) → {total_a:.1f} g",
            f"  Right pan ({b_str}) → {total_b:.1f} g",
            f"Step 2 — Compare totals: {total_a:.1f} g vs {total_b:.1f} g",
            f"Difference = {abs(total_a-total_b):.1f} g",
            f"{'The beam balances (equilibrium).' if balanced else 'The beam tips toward the heavier side.'}",
            f"Answer: {'Balanced' if balanced else 'Not balanced'}.",
        ]
        return QDetail(Node003.NODE, "beam_balance", prompt, ans, expl, steps)

    @staticmethod
    def solve_mass_conversion(value: float, frm: str, to: str,
                               seed: int = 0) -> QDetail:
        """Convert mass between mg, g, kg."""
        rng = make_rng(seed)
        units = ["mg","g","kg"]
        idx = rng.randint(0,2); jdx = rng.randint(0,2)
        while jdx == idx: jdx = rng.randint(0,2)
        frm, to = units[idx], units[jdx]
        value = rng.randint(1, 1000)

        factors = {"mg":0.001, "g":1.0, "kg":1000.0}
        in_g   = value * factors[frm]
        result = in_g / factors[to]

        prompt = f"Convert {value} {frm} to {to}."
        expl = (
            f"1 {frm} = {factors[frm]} g\n"
            f"{value} {frm} = {value} × {factors[frm]} = {in_g} g\n"
            f"1 {to} = {factors[to]} g\n"
            f"{in_g} g ÷ {factors[to]} = {result} {to}"
        )
        steps = [
            f"Use conversion factors: 1 kg = 1000 g, 1 g = 1000 mg",
            f"{value} {frm} = {value} × {factors[frm]} g = {in_g} g",
            f"{in_g} g in {to}: {in_g} ÷ {factors[to]} = {result} {to}",
            f"Answer: {result} {to}",
        ]
        return QDetail(Node003.NODE, "mass_conversion", prompt,
                       f"{result} {to}", expl, steps)

    @staticmethod
    def solve_beam_balance_vs_electronic(seed: int = 0) -> QDetail:
        rng = make_rng(seed)
        obj = rng.choice([
            "a pencil box", "an apple", "a geometry box",
            "a water bottle", "a book"
        ])
        prompt = (
            f"Your friend says: '{obj.capitalize()} weighs 500 g on a beam "
            "balance but shows 497 g on an electronic balance. Why are "
            "the readings different?' Give two reasons."
        )
        ans = (
            "1. Zero error — the beam balance may not be perfectly balanced "
            "at zero (pointer not at centre).\n"
            "2. Sensitivity/draft — the beam balance is affected by air "
            "currents; also calibration may differ slightly.\n"
            "3. Electronic balances auto-tare and convert to digital; beam "
            "balances read nearest standard mass slot."
        )
        expl = (
            "Electronic balances use strain gauges and are generally more "
            "precise (±0.1 g). Beam balances compare with standard masses "
            "and can have zero error or friction in the knife-edge pivot."
        )
        steps = [
            "Identify two possible causes for the difference.",
            "Reason 1: Zero error in the beam balance.",
            "Reason 2: Sensitivity / air drafts / calibration difference.",
            "State both clearly.",
            f"Answer: Two reasons given above.",
        ]
        return QDetail(Node003.NODE, "compare_instruments",
                       prompt, ans, expl, steps)

    @staticmethod
    def verify_beam_balance(user_total_g: float, expected_total_g: float,
                             tol: float = 0.5) -> CheckResult:
        return CheckResult(
            abs(user_total_g - expected_total_g) <= tol,
            expected_total_g, user_total_g, tol, "g"
        )

# ══════════════════════════════════════════════════════════════════════════════
# Master Solver — public interface
# ══════════════════════════════════════════════════════════════════════════════
NODE_MAP = {
    "c6_phy_001": Node001,
    "c6_phy_002": Node002,
    "c6_phy_003": Node003,
}

def solve(node_id: str, method: str, seed: int = 0, **kwargs) -> QDetail:
    """
    Solve a Class-6 Physics question.

    Parameters
    ----------
    node_id  : c6_phy_001 | c6_phy_002 | c6_phy_003
    method   : question subtype string (see class for available methods)
    seed     : random seed for deterministic output
    **kwargs : method-specific parameters

    Returns
    -------
    QDetail with prompt, answer, explanation, and step-by-step reasoning.
    """
    node = NODE_MAP.get(node_id)
    if node is None:
        raise ValueError(f"Unknown node: {node_id}")

    rng = make_rng(seed)

    # ── c6_phy_001 dispatcher ──────────────────────────────────────────────
    if node_id == "c6_phy_001":
        return Node001.solve_fill_in_blank(method, seed)

    # ── c6_phy_002 dispatcher ──────────────────────────────────────────────
    if node_id == "c6_phy_002":
        if method == "unit_conversion":
            u = rng.choice(["km","hm","dam","m","dm","cm","mm"])
            v = rng.randint(1, 50)
            return Node002.solve_unit_conversion(v, u, seed=seed)
        if method == "addition":
            v1, u1 = rng.randint(1,30), rng.choice(["m","dm","cm"])
            v2, u2 = rng.randint(1,30), rng.choice(["m","dm","cm"])
            tgt    = rng.choice(["m","dm","cm"])
            return Node002.solve_addition(v1,u1, v2,u2, tgt, seed)
        if method == "curved_line":
            val = round(rng.uniform(5.0, 100.0), 1)
            return Node002.solve_curved_line(val, seed)

    # ── c6_phy_003 dispatcher ──────────────────────────────────────────────
    if node_id == "c6_phy_003":
        if method == "beam_balance":
            # generate two random pans
            masses = [(rng.randint(1,500),"g") for _ in range(3)]
            # build two pans that may or may not balance
            pan_a = masses[:2]
            pan_b = masses[2:]
            # 50% chance make them equal
            if rng.random() < 0.5:
                pan_b[0] = (pan_a[0][0], pan_a[0][1])
            return Node003.solve_beam_balance(pan_a, pan_b, seed)
        if method == "mass_conversion":
            return Node003.solve_mass_conversion(0, "", "", seed)
        if method == "compare_instruments":
            return Node003.solve_beam_balance_vs_electronic(seed)

    raise ValueError(f"Unknown method '{method}' for node '{node_id}'")

def verify(node_id: str, method: str,
           user_val: float, expected_val: float,
           tol: float = 0.5, unit: str = "") -> CheckResult:
    """Verify a numeric answer against the expected value."""
    node = NODE_MAP.get(node_id)
    if node_id == "c6_phy_002" and method == "unit_conversion":
        return Node002.verify_unit_conversion(user_val, expected_val, unit, tol)
    if node_id == "c6_phy_003" and method == "beam_balance":
        return Node003.verify_beam_balance(user_val, expected_val, tol)
    return CheckResult(
        abs(user_val - expected_val) <= tol,
        expected_val, user_val, tol, unit
    )

# ══════════════════════════════════════════════════════════════════════════════
# Demo / self-test
# ══════════════════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    print("=" * 60)
    print("  CLASS 6 PHYSICS — SOLVER DEMO")
    print("=" * 60)

    for nid in ["c6_phy_001","c6_phy_002","c6_phy_003"]:
        print(f"\n── Node: {nid} ──")
        # run 2 solvers per node
        for seed in [10, 55]:
            d = solve(nid, method="auto", seed=seed)
            print(f"\n  [{d.subtype}] seed={seed}")
            print(f"  Q: {d.prompt}")
            print(f"  A: {d.answer}")
            print(f"  Steps:")
            for s in d.steps:
                print(f"    → {s}")

    print("\n── Verification demo ──")
    r = verify("c6_phy_002", "unit_conversion", 120.0, 120.0, tol=0.5, unit="cm")
    print(f"  120 vs 120 cm  → {'✅ PASS' if r.correct else '❌ FAIL'}")
    r = verify("c6_phy_002", "unit_conversion", 130.0, 120.0, tol=0.5, unit="cm")
    print(f"  130 vs 120 cm  → {'✅ PASS' if r.correct else '❌ FAIL'}")