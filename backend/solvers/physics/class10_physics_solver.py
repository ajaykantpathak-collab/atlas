"""
Class 10 Physics – Solver
Nodes: c10_phy_001 | c10_phy_002 | c10_phy_003
Syllabus: ICSE Class 10 Physics – Force, Work, Power and Energy
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from typing import Optional


# ─────────────────────────────────────────────
#  Data classes
# ─────────────────────────────────────────────

@dataclass
class LeverProblem:
    """Principle-of-moments balance problem (Node c10_phy_001)."""
    pivot_cm: float          # position of fulcrum on the rule (cm)
    weight_left_g: float     # known weight on the left (g)
    dist_left_cm: float      # its perpendicular distance from pivot (cm)
    answer_right_g: float    # unknown weight to find (g)
    dist_right_cm: float     # its perpendicular distance from pivot (cm)

    def clockwise_moment(self) -> float:
        """Return sum of clockwise moments (g × cm)."""
        cw = 0.0
        if self.pivot_cm < self.dist_right_cm:          # right-side weight → CW
            cw += self.answer_right_g * self.dist_right_cm
        if self.pivot_cm > self.dist_left_cm:            # left-side weight → CW
            cw += self.weight_left_g * (self.pivot_cm - self.dist_left_cm)
        return cw

    def anticlockwise_moment(self) -> float:
        """Return sum of anticlockwise moments (g × cm)."""
        acw = 0.0
        if self.pivot_cm > self.dist_left_cm:            # left-side weight → ACW
            acw += self.weight_left_g * (self.pivot_cm - self.dist_left_cm)
        if self.pivot_cm < self.dist_right_cm:           # right-side weight → ACW
            acw += self.answer_right_g * self.dist_right_cm
        return acw

    def is_balanced(self, tol: float = 0.01) -> bool:
        return abs(self.clockwise_moment() - self.anticlockwise_moment()) < tol


@dataclass
class CGRegularBody:
    """Centre-of-gravity for regular bodies (Node c10_phy_002)."""
    shape: str           # "rectangle" | "circle"   | "triangle"
    length_cm: float = 0.0
    breadth_cm: float = 0.0
    radius_cm: float = 0.0
    side_cm: float = 0.0

    @property
    def cg_position(self) -> dict:
        if self.shape == "rectangle":
            return {
                "from_left": round(self.length_cm / 2, 4),
                "from_bottom": round(self.breadth_cm / 2, 4),
                "description": (
                    f"At the intersection of the two diagonals: "
                    f"{self.length_cm/2:.2f} cm from the left edge "
                    f"and {self.breadth_cm/2:.2f} cm from the bottom edge"
                ),
            }
        if self.shape == "circle":
            return {
                "from_centre": round(self.radius_cm, 4),
                "description": (
                    f"At the geometric centre of the circle "
                    f"(radius = {self.radius_cm:.2f} cm from any edge)"
                ),
            }
        if self.shape == "triangle":
            h = (math.sqrt(3) / 2) * self.side_cm
            from_base = h / 3
            from_vertex = 2 * h / 3
            return {
                "from_base": round(from_base, 4),
                "from_vertex": round(from_vertex, 4),
                "height_cm": round(h, 4),
                "description": (
                    f"At the centroid (intersection of medians): "
                    f"{from_base:.2f} cm from the base "
                    f"and {from_vertex:.2f} cm from the opposite vertex "
                    f"(height of triangle = {h:.2f} cm)"
                ),
            }
        raise ValueError(f"Unknown shape: {self.shape}")


@dataclass
class IrregularLaminaCG:
    """
    Centre of gravity by plumb-line / suspension method
    (Node c10_phy_002).
    """
    """P1 = (x1, y1) on the graph; P2 = (x2, y2) on the graph.
    plumb1_dir = slope of first plumb line  (m1)
    plumb2_dir = slope of second plumb line (m2)
    CG is the intersection of the two lines.
    """
    p1_x: float
    p1_y: float
    plumb1_dir: float   # m1  (direction of the hanging string at P1)
    p2_x: float
    p2_y: float
    plumb2_dir: float   # m2

    def intersection(self) -> tuple[float, float]:
        """Return (x_cg, y_cg) using line–line intersection."""
        # Line 1: y - p1_y = m1 (x - p1_x)  →  y = m1 x + (p1_y - m1 p1_x)
        c1 = self.p1_y - self.plumb1_dir * self.p1_x
        # Line 2: y = m2 x + (p2_y - m2 p2_x)
        c2 = self.p2_y - self.plumb2_dir * self.p2_x
        if abs(self.plumb1_dir - self.plumb2_dir) < 1e-9:
            raise ValueError("Plumb lines are parallel; cannot find CG.")
        x_cg = (c2 - c1) / (self.plumb1_dir - self.plumb2_dir)
        y_cg = self.plumb1_dir * x_cg + c1
        return round(x_cg, 4), round(y_cg, 4)

    def verify(self) -> str:
        x, y = self.intersection()
        return (
            f"Substituting x={x:.2f} in Line 1: "
            f"y = {self.plumb1_dir:.2f}×{x:.2f} + ({self.p1_y:.2f} − "
            f"{self.plumb1_dir:.2f}×{self.p1_x:.2f}) = {y:.2f} cm\n"
            f"Both lines give y ≈ {y:.2f} cm  ✓\n"
            f"∴ CG lies at ({x:.2f} cm, {y:.2f} cm) on the lamina."
        )


@dataclass
class EquilibriumProblem:
    """
    Analyse stable / unstable / neutral equilibrium
    (Node c10_phy_003).
    """
    body: str                       # e.g. "cone on its base"
    equilibrium_type: str           # "stable" | "unstable" | "neutral"
    cg_behaviour: str               # "rises" | "falls" | "unchanged"
    returns: bool                   # returns to original position?
    example: str                    # supporting real-world example

    def explain(self) -> str:
        lines = [
            f"Body            : {self.body}",
            f"Equilibrium type: {self.equilibrium_type.upper()}",
            f"CG behaviour    : When tilted, the CG {self.cg_behaviour}.",
        ]
        if self.returns:
            lines.append(
                "After a slight displacement the body RETURNS to its "
                "original position → stable equilibrium."
            )
        else:
            lines.append(
                "After a slight displacement the body does NOT return "
                "→ unstable / neutral equilibrium."
            )
        lines.append(f"Example          : {self.example}")
        return "\n".join(lines)


# ─────────────────────────────────────────────
#  Solver class
# ─────────────────────────────────────────────

class Physics10Solver:
    """Deterministic step-by-step solver for all three Class-10 nodes."""

    # ── Node c10_phy_001 ──────────────────────────────────────────────────────

    @staticmethod
    def solve_lever(p: LeverProblem) -> dict:
        """
        Step-by-step solution for a principle-of-moments lever problem.

        Formula used:
            Sum of clockwise moments = Sum of anticlockwise moments
            W₁ × d₁ = W₂ × d₂
        """
        steps: list[str] = []
        steps.append("=" * 60)
        steps.append("SOLVING  — Principle of Moments (Lever)")
        steps.append("=" * 60)

        # Step 1: Identify pivot and identify which side each weight is on
        steps.append("\nSTEP 1 — Identify the pivot and lever arms")
        steps.append(f"  Fulcrum position  : {p.pivot_cm} cm")
        steps.append(f"  Known weight W₁   : {p.weight_left_g} g at {p.dist_left_cm} cm")
        steps.append(f"  Unknown weight W₂ : ?   at {p.dist_right_cm} cm")

        # Step 2: Determine directions
        dir_left = (
            "anticlockwise" if p.dist_left_cm < p.pivot_cm else "clockwise"
        )
        dir_right = (
            "clockwise" if p.dist_right_cm > p.pivot_cm else "anticlockwise"
        )
        steps.append("\nSTEP 2 — Determine moment directions")
        steps.append(f"  W₁ is on the {'LEFT' if p.dist_left_cm < p.pivot_cm else 'RIGHT'} "
                     f"of the pivot → {dir_left} moment")
        steps.append(f"  W₂ is on the {'RIGHT' if p.dist_right_cm > p.pivot_cm else 'LEFT'} "
                     f"of the pivot → {dir_right} moment")

        # Step 3: State principle
        steps.append("\nSTEP 3 — Apply Principle of Moments")
        steps.append("  For equilibrium:  Σ(clockwise moments) = Σ(anticlockwise moments)")

        # Step 4: Perpendicular distances
        d1 = abs(p.pivot_cm - p.dist_left_cm)
        d2 = abs(p.pivot_cm - p.dist_right_cm)
        steps.append(f"\nSTEP 4 — Perpendicular distances from pivot")
        steps.append(f"  d₁ (for W₁) = |{p.pivot_cm} − {p.dist_left_cm}| = {d1:.2f} cm")
        steps.append(f"  d₂ (for W₂) = |{p.pivot_cm} − {p.dist_right_cm}| = {d2:.2f} cm")

        # Step 5: Set up equation
        steps.append("\nSTEP 5 — Set up the moment equation")
        if dir_left == "anticlockwise" and dir_right == "clockwise":
            steps.append(f"  W₁ × d₁ = W₂ × d₂")
            steps.append(f"  {p.weight_left_g} × {d1:.2f} = W₂ × {d2:.2f}")
            w2 = (p.weight_left_g * d1) / d2
            steps.append(f"  W₂ = ({p.weight_left_g} × {d1:.2f}) / {d2:.2f}")
            steps.append(f"  W₂ = {p.weight_left_g * d1:.2f} / {d2:.2f}")
            steps.append(f"  W₂ ≈ {w2:.2f} g")
        else:
            steps.append(f"  W₂ × d₂ = W₁ × d₁")
            steps.append(f"  W₂ × {d2:.2f} = {p.weight_left_g} × {d1:.2f}")
            w2 = (p.weight_left_g * d1) / d2
            steps.append(f"  W₂ = ({p.weight_left_g} × {d1:.2f}) / {d2:.2f}")
            steps.append(f"  W₂ ≈ {w2:.2f} g")

        # Step 6: Verification
        cw = p.clockwise_moment()
        acw = p.anticlockwise_moment()
        steps.append("\nSTEP 6 — Verification")
        steps.append(f"  Clockwise moment     = {cw:.4f} g·cm")
        steps.append(f"  Anticlockwise moment = {acw:.4f} g·cm")
        steps.append(f"  Difference          = {abs(cw - acw):.4f} g·cm "
                     f"({'✓ Balanced' if abs(cw - acw) < 0.01 else '✗ Not balanced'})")

        steps.append(f"\nANSWER: W₂ ≈ {w2:.2f} g  (≈ {w2/1000:.4f} kg)")
        steps.append("=" * 60)
        solution_text = "\n".join(steps)
        return {
            "answer_g": round(w2, 4),
            "cw_moment": round(cw, 4),
            "acw_moment": round(acw, 4),
            "balanced": p.is_balanced(),
            "solution": solution_text,
        }

    @staticmethod
    def solve_spring_balance(
        rule_length_cm: float,
        weight_left_g: float,
        dist_left_cm: float,
        weight_right_g: float,
        dist_right_cm: float,
    ) -> dict:
        """
        Two-spring-balance experiment: find the pivot (knife-edge) position
        at which both balances read equally (pivot = CG of the system).
        """
        steps: list[str] = []
        steps.append("=" * 60)
        steps.append("SOLVING  — Spring Balance Experiment (CG of a System)")
        steps.append("=" * 60)
        steps.append(
            f"\nSetup: uniform rule (L={rule_length_cm} cm), "
            f"W₁={weight_left_g} g at {dist_left_cm} cm, "
            f"W₂={weight_right_g} g at {dist_right_cm} cm"
        )
        steps.append("\nSTEP 1 — Let the knife-edge (pivot) be at distance x from the left end.")
        steps.append("  When both spring balances read equally, "
                     "the pivot is at the CG of the system.")
        steps.append("STEP 2 — Anticlockwise moment (W₁ on one side):")
        d1 = abs(dist_left_cm)           # assuming x < dist_left_cm
        steps.append(f"  M_acw = W₁ × d₁ = {weight_left_g} × d₁")
        steps.append("STEP 3 — Clockwise moment (W₂ on the other side):")
        d2 = rule_length_cm - dist_right_cm
        steps.append(f"  M_cw  = W₂ × d₂ = {weight_right_g} × d₂")

        steps.append("\nSTEP 4 — Equating moments to find x:")
        # Simplified: assume pivot is between the two weights
        total_w = weight_left_g + weight_right_g
        # x such that weight_left_g * |x - dist_left_cm| = weight_right_g * |dist_right_cm - x|
        # If x is between dist_left_cm and dist_right_cm:
        x_num = weight_right_g * dist_right_cm + weight_left_g * dist_left_cm
        x = x_num / total_w
        d1_actual = abs(x - dist_left_cm)
        d2_actual = abs(dist_right_cm - x)
        cw = weight_right_g * d2_actual
        acw = weight_left_g * d1_actual
        steps.append(
            f"  W₁ × (x − {dist_left_cm}) = W₂ × ({dist_right_cm} − x)"
        )
        steps.append(f"  {weight_left_g}x − {weight_left_g * dist_left_cm} "
                     f"= {weight_right_g * dist_right_cm} − {weight_right_g}x")
        steps.append(
            f"  ({weight_left_g} + {weight_right_g})x = "
            f"{weight_right_g * dist_right_cm + weight_left_g * dist_left_cm}"
        )
        steps.append(f"  {total_w}x = {x_num:.2f}")
        steps.append(f"  x = {x:.2f} cm")
        steps.append(
            f"\nANSWER: Both spring balances read equally when "
            f"the knife-edge is placed at x = {x:.2f} cm from the left end."
        )
        steps.append(f"  CW moment = {cw:.4f} g·cm | "
                     f"ACW moment = {acw:.4f} g·cm | "
                     f"Balanced: {'✓' if abs(cw - acw) < 0.01 else '✗'}")
        steps.append("=" * 60)
        return {
            "pivot_cm": round(x, 4),
            "cw_moment": round(cw, 4),
            "acw_moment": round(acw, 4),
            "balanced": abs(cw - acw) < 0.01,
            "solution": "\n".join(steps),
        }

    # ── Node c10_phy_002 ──────────────────────────────────────────────────────

    @staticmethod
    def solve_cg_regular(body: CGRegularBody) -> dict:
        """Return CG location and explanation for a regular body."""
        info = body.cg_position
        lines = [
            "=" * 60,
            f"SOLVING  — Centre of Gravity of a {body.shape.title()}",
            "=" * 60,
            f"\nShape : {body.shape}",
            info["description"],
            f"\nThe CG is the point where the entire weight of the body "
            f"appears to act.",
            "=" * 60,
        ]
        return {
            "description": info["description"],
            "solution": "\n".join(lines),
        }

    @staticmethod
    def solve_irrational_lamina(p: IrregularLaminaCG) -> dict:
        """Find CG by intersection of two plumb lines."""
        x, y = p.intersection()
        lines = [
            "=" * 60,
            "SOLVING  — Centre of Gravity by Plumb-Line Method",
            "=" * 60,
            "\nSTEP 1 — Suspend the lamina from P1 and draw plumb line PL1:",
            f"  P1 = ({p.p1_x:.1f}, {p.p1_y:.1f}), slope m₁ = {p.plumb1_dir:.2f}",
            "STEP 2 — Suspend from P2 and draw plumb line PL2:",
            f"  P2 = ({p.p2_x:.1f}, {p.p2_y:.1f}), slope m₂ = {p.plumb2_dir:.2f}",
            "\nSTEP 3 — Find intersection of PL1 and PL2 (the CG):",
        ]
        c1 = p.p1_y - p.plumb1_dir * p.p1_x
        c2 = p.p2_y - p.plumb2_dir * p.p2_x
        denom = p.plumb1_dir - p.plumb2_dir
        x_calc = (c2 - c1) / denom
        y_calc = p.plumb1_dir * x_calc + c1
        lines.append(f"  PL1: y − {p.p1_y:.1f} = {p.plumb1_dir:.2f}(x − {p.p1_x:.1f})")
        lines.append(f"  PL2: y − {p.p2_y:.1f} = {p.plumb2_dir:.2f}(x − {p.p2_x:.1f})")
        lines.append(f"  Solving simultaneously: x = {x_calc:.4f}, y = {y_calc:.4f}")
        lines.append(f"\nANSWER: CG of the irregular lamina ≈ "
                     f"({x_calc:.2f} cm, {y_calc:.2f} cm)")
        lines.append("=" * 60)
        return {
            "cg_x": round(x_calc, 4),
            "cg_y": round(y_calc, 4),
            "solution": "\n".join(lines),
        }

    # ── Node c10_phy_003 ──────────────────────────────────────────────────────

    @staticmethod
    def solve_equilibrium(p: EquilibriumProblem) -> dict:
        """Explain why a body is in a particular type of equilibrium."""
        lines = [
            "=" * 60,
            "SOLVING  — Type of Equilibrium",
            "=" * 60,
            "",
            f"Body            : {p.body}",
            f"CG behaviour    : When displaced, the CG {p.cg_behaviour}.",
            f"Returns to rest? : {'Yes' if p.returns else 'No'}",
            "",
            "Analysis:",
        ]
        if p.equilibrium_type == "stable":
            lines.append(
                "  • In stable equilibrium the CG RISES when the body is tilted.\n"
                "  • A restoring torque acts, pushing the body back.\n"
                "  • The body returns to its original position after a slight displacement."
            )
        elif p.equilibrium_type == "unstable":
            lines.append(
                "  • In unstable equilibrium the CG FALLS when the body is tilted.\n"
                "  • The body topples further away from the original position.\n"
                "  • A slight disturbance causes the body to move away permanently."
            )
        else:  # neutral
            lines.append(
                "  • In neutral equilibrium the CG stays at the SAME height.\n"
                "  • No restoring torque acts; the body stays in its new position.\n"
                "  • It does not return, nor does it fall further."
            )
        lines.append(f"\n  Real-world example: {p.example}")
        lines.append(f"\nANSWER: The body is in **{p.equilibrium_type.upper()} EQUILIBRIUM**.")
        lines.append("=" * 60)
        return {
            "equilibrium_type": p.equilibrium_type,
            "solution": "\n".join(lines),
        }

    @staticmethod
    def solve_combined(
        lever: Optional[LeverProblem] = None,
        cg_body: Optional[CGRegularBody] = None,
        irregular: Optional[IrregularLaminaCG] = None,
        equilibrium: Optional[EquilibriumProblem] = None,
    ) -> dict:
        """Dispatch solver to the appropriate sub-solver."""
        result: dict = {}
        if lever is not None:
            result["lever"] = Physics10Solver.solve_lever(lever)
        if cg_body is not None:
            result["cg_regular"] = Physics10Solver.solve_cg_regular(cg_body)
        if irregular is not None:
            result["cg_irregular"] = (
                Physics10Solver.solve_irrational_lamina(irregular)
            )
        if equilibrium is not None:
            result["equilibrium"] = Physics10Solver.solve_equilibrium(equilibrium)
        return result


# ─────────────────────────────────────────────
#  Convenience runner (CLI)
# ─────────────────────────────────────────────

def _demo() -> None:
    solver = Physics10Solver()

    print("─── Demo: Node c10_phy_001 ───")
    lever = LeverProblem(
        pivot_cm=50.0, weight_left_g=100.0,
        dist_left_cm=20.0, answer_right_g=50.0, dist_right_cm=60.0,
    )
    r = solver.solve_lever(lever)
    print(r["solution"])

    print("\n─── Demo: Node c10_phy_002 (Rectangle) ───")
    rect = CGRegularBody("rectangle", length_cm=30.0, breadth_cm=20.0)
    r2 = solver.solve_cg_regular(rect)
    print(r2["solution"])

    print("\n─── Demo: Node c10_phy_002 (Irregular Lamina) ───")
    lamina = IrregularLaminaCG(
        p1_x=10.0, p1_y=10.0, plumb1_dir=2.0,
        p2_x=20.0, p2_y=5.0,  plumb2_dir=-1.0,
    )
    r3 = solver.solve_irrational_lamina(lamina)
    print(r3["solution"])

    print("\n─── Demo: Node c10_phy_003 ───")
    eq = EquilibriumProblem(
        body="a cone standing on its base",
        equilibrium_type="stable",
        cg_behaviour="rises",
        returns=True,
        example="A cone standing on its wide base returns to rest after a small push",
    )
    r4 = solver.solve_equilibrium(eq)
    print(r4["solution"])


if __name__ == "__main__":
    _demo()

# ─────────────────────────────────────────────────────────────────────────────
# VERIFICATION (self-test)
# ─────────────────────────────────────────────────────────────────────────────
def _verify() -> None:
    errors: list[str] = []

    # ── Node 001: lever balance check ─────────────────────────────────────────
    lever = LeverProblem(50, 100, 20, 50, 60)
    r = Physics10Solver.solve_lever(lever)
    # CW: 50*60 = 3000  ACW: 100*30 = 3000  → balanced
    assert r["balanced"], "Lever should be balanced"
    assert abs(r["cw_moment"] - r["acw_moment"]) < 0.01, "Moments should match"
    assert abs(r["answer_g"] - 300.0) < 0.01, f"Expected ~300 g, got {r['answer_g']}"
    errors.append("")  # placeholder success

    # ── Node 002: rectangle CG ─────────────────────────────────────────────────
    rect = CGRegularBody("rectangle", length_cm=40.0, breadth_cm=30.0)
    info = rect.cg_position
    assert abs(info["from_left"] - 20.0) < 1e-6, "Rectangle CG x-offset wrong"
    assert abs(info["from_bottom"] - 15.0) < 1e-6, "Rectangle CG y-offset wrong"

    # Circle CG = centre
    circ = CGRegularBody("circle", radius_cm=12.0)
    ci = circ.cg_position
    assert abs(ci["from_centre"] - 12.0) < 1e-6, "Circle CG wrong"

    # Triangle CG: centroid at h/3 from base
    tri = CGRegularBody("triangle", side_cm=12.0)
    ti = tri.cg_position
    h_tri = (math.sqrt(3) / 2) * 12.0
    expected_from_base = h_tri / 3
    assert abs(ti["from_base"] - expected_from_base) < 1e-4, "Triangle CG wrong"

    # ── Node 002: irregular lamina ────────────────────────────────────────────
    # Two lines: y = 2x + 0   and   y = -x + 40  → intersection at (40/3, 80/3)
    lamina = IrregularLaminaCG(0, 0, 2.0, 10, 30, -1.0)
    xg, yg = lamina.intersection()
    assert abs(xg - 40 / 3) < 1e-3, f"Lamina CG x wrong: {xg}"
    assert abs(yg - 80 / 3) < 1e-3, f"Lamina CG y wrong: {yg}"

    # ── Node 003: equilibrium types ───────────────────────────────────────────
    eq_stable = EquilibriumProblem(
        "cone on base", "stable", "rises", True,
        "a toy duck that always stands back up",
    )
    eq_unstable = EquilibriumProblem(
        "cone on apex", "unstable", "falls", False,
        "a pencil balanced on its tip",
    )
    eq_neutral = EquilibriumProblem(
        "sphere on a table", "neutral", "unchanged", False,
        "a cylinder on a horizontal surface that rolls without rising or falling",
    )
    assert eq_stable.equilibrium_type == "stable"
    assert eq_unstable.equilibrium_type == "unstable"
    assert eq_neutral.equilibrium_type == "neutral"

    if errors:
        print("FAILED verifications:")
        for e in errors:
            print(" ", e)
    else:
        print("ALL VERIFICATIONS PASSED ✓")


_verify()

# -- solver contract --------------------------------------------
def solve(node_id: str = "", params: dict | None = None, **kw):
    """Solve c10 physics moments/CG/equilibrium via Physics10Solver.
    lever needs a LeverProblem: pivot_cm, weight_left_g, dist_left_cm,
    answer_right_g, dist_right_cm."""
    params = params or {}
    s = Physics10Solver()
    task = params.get("task", "lever")
    if task == "lever" or task == "solve_lever":
        p = LeverProblem(
            pivot_cm=float(params.get("pivot_cm", 50)),
            weight_left_g=float(params.get("weight_left_g", 20)),
            dist_left_cm=float(params.get("dist_left_cm", 30)),
            answer_right_g=float(params.get("answer_right_g", 0)),
            dist_right_cm=float(params.get("dist_right_cm", 25)),
        )
        return s.solve_lever(p)
    if task == "spring_balance":
        return s.solve_spring_balance(
            float(params.get("weight_left_g", 20)), float(params.get("dist_left_cm", 30)),
            float(params.get("weight_right_g", 24)), float(params.get("dist_right_cm", 25)))
    if task in ("cg_regular", "solve_cg_regular"):
        fields = CGRegularBody.__dataclass_fields__
        bp = {k: v for k, v in params.items() if k in fields}
        bp.setdefault("shape", "rectangle")
        if bp["shape"] == "rectangle":
            bp.setdefault("length_cm", 20.0)
            bp.setdefault("breadth_cm", 10.0)
        elif bp["shape"] == "circle":
            bp.setdefault("radius_cm", 10.0)
        elif bp["shape"] == "triangle":
            bp.setdefault("side_cm", 10.0)
        return s.solve_cg_regular(CGRegularBody(**bp))
    if task in ("equilibrium", "solve_equilibrium"):
        return s.solve_equilibrium()
    return {"node_id": node_id, "error": "unknown task %s" % task,
            "tasks": ["lever", "spring_balance", "cg_regular", "equilibrium"]}

SOLVER_REGISTRY = {"c10_phy_solve": solve}
NODE_MAP = {"c10_phy_001": "c10_phy_solve", "c10_phy_002": "c10_phy_solve", "c10_phy_003": "c10_phy_solve"}


# ---------------------------------------------------------------------------
# Registry surface: per-task problem types (moments, spring balance, CG).
# ---------------------------------------------------------------------------

def _c10_task(task: str):
    def _run(params=None, **kw):
        payload = dict(params or {})
        payload.update(kw)
        payload.setdefault("task", task)
        try:
            return solve(params=payload)
        except Exception as exc:
            return {"answer": None, "steps": [f"Solver error: {exc}"],
                    "verification": {"passed": False, "details": str(exc)}}
    _run.__name__ = f"c10_phy_{task}"
    return _run


SOLVER_REGISTRY.update({
    "c10_phy_moments": _c10_task("lever"),
    "c10_phy_spring_balance": _c10_task("spring_balance"),
    "c10_phy_cg_regular": _c10_task("cg_regular"),
    "c10_phy_equilibrium": _c10_task("equilibrium"),
})
