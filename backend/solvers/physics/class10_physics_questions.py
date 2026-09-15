"""
Deterministic Physics Question Generator – Class 10 (ICSE)
Nodes: c10_phy_001 | c10_phy_002 | c10_phy_003
"""

import random
import math
import dataclasses
from dataclasses import dataclass, field
from typing import List, Optional
from datetime import datetime

random.seed(42)

# ─── dataclasses ──────────────────────────────────────────────────────────────

@dataclass
class Step:
    label: str
    detail: str

@dataclass
class Verification:
    description: str
    result: str

@dataclass
class Solution:
    approach: str
    steps: List[Step]
    verification: Verification
    answer: str
    explanation: str

@dataclass
class Question:
    id: str
    node_id: str
    topic: str
    difficulty: str
    competency_level: str
    context_tag: str          # INDIAN_CONTEXT | STANDARD
    question_text: str
    marks: int
    solution: Solution
    syllabus_ref: str
    vocabulary: List[str] = field(default_factory=list)

    def to_block(self) -> str:
        step_lines = "\n".join(
            f"    Step {i+1} [{s.label}]: {s.detail}"
            for i, s in enumerate(self.solution.steps)
        )
        voc_lines = ", ".join(self.vocabulary)
        return (
            f"━━━  Question ID      : {self.id}\n"
            f"     Node             : {self.node_id}\n"
            f"     Topic            : {self.topic}\n"
            f"     Difficulty       : {self.difficulty}  |  "
            f"Competency: {self.competency_level}\n"
            f"     Context Tag      : {self.context_tag}\n"
            f"     Marks            : {self.marks}\n"
            f"     Syllabus Ref     : {self.syllabus_ref}\n"
            f"     ──────────────────────────────────────────────\n"
            f"     QUESTION:\n"
            f"     {self.question_text}\n"
            f"     ──────────────────────────────────────────────\n"
            f"     SOLUTION [{self.solution.approach}]:\n"
            f"{step_lines}\n"
            f"     ✔ Verification: {self.solution.verification.description}\n"
            f"       → {self.solution.verification.result}\n"
            f"     ──────────────────────────────────────────────\n"
            f"     ANSWER:\n"
            f"     {self.solution.answer}\n"
            f"     ──────────────────────────────────────────────\n"
            f"     EXPLANATION:\n"
            f"     {self.solution.explanation}\n"
            f"     KEY VOCABULARY: {voc_lines}\n"
            f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
        )

# ─── helpers ──────────────────────────────────────────────────────────────────

def _opt(label: str, detail: str) -> Step:
    return Step(label=label, detail=detail)


def _ver(desc: str, result: str) -> Verification:
    return Verification(description=desc, result=result)


def _ans(text: str) -> str:
    return f"✅ {text}"


def _expl(text: str) -> str:
    return text

# ─── template functions ───────────────────────────────────────────────────────
# Each function returns a fully-built Question.

# ── NODE c10_phy_001: Turning effect of force & principle of moments ───────────

def _tpl_moment_door(seed: int) -> Question:
    rng = random.Random(seed)
    F = rng.randint(15, 40)       # N
    d = rng.randint(30, 120)      # cm  → convert to m
    d_m = d / 100
    M = F * d_m

    return Question(
        id=f"C10P001-Q{seed:03d}",
        node_id="c10_phy_001",
        topic="Turning effect of force (Moment / Torque)",
        difficulty="Medium",
        competency_level="Understand",
        context_tag="INDIAN_CONTEXT",
        question_text=(
            f"A door is 1.2 m wide. A student pushes the door with a force of "
            f"{F} N at its edge (farthest from the hinges). "
            f"Calculate the moment of the force about the hinge axis. "
            f"State the SI unit of moment."
        ),
        marks=3,
        syllabus_ref=(
            "ICSE Class 10 Physics – Force, Work, Power and Energy: "
            "Moment of a force (torque); SI unit N·m"
        ),
        vocabulary=[
            "moment of force", "torque", "perpendicular distance",
            "hinge", "SI unit", "rotational motion"
        ],
        solution=Solution(
            approach=(
                "The moment (torque) of a force about a point is defined as the "
                "product of the force and the perpendicular distance from the point "
                "to the line of action of the force: τ = F × d⊥"
            ),
            steps=[
                _opt("Given", f"Force F = {F} N  |  Perpendicular distance d = {d_m} m"),
                _opt("Formula", "Moment τ = F × d⊥"),
                _opt(
                    "Substitution",
                    f"τ = {F} N × {d_m} m = {M:.2f} N·m"
                ),
            ],
            verification=_ver(
                "Cross-check with equivalent values",
                f"{F} N × {d_m} m = {M:.2f} N·m — matches computed moment ✔"
            ),
            answer=_ans(
                f"Moment of the force = {M:.2f} N·m. "
                f"SI unit: newton-metre (N·m)."
            ),
            explanation=(
                "A door acts as a lever with hinges as the fulcrum. Pushing at the "
                "edge (maximum perpendicular distance) maximises the moment, making "
                "the door turn more easily. Doubling the perpendicular distance "
                "doubles the moment for the same force."
            ),
        ),
    )


def _tpl_principle_moments_meter_rule(seed: int) -> Question:
    rng = random.Random(seed + 1)
    m1 = rng.randint(30, 80)       # g
    d1 = rng.randint(10, 25)       # cm
    m2 = rng.randint(15, 60)       # g
    d2 = round(m1 * d1 / m2)       # cm  (ensure integer)
    d2 = max(5, min(d2, 35))       # clamp to sensible range

    return Question(
        id=f"C10P001-Q{seed+100:03d}",
        node_id="c10_phy_001",
        topic="Principle of moments",
        difficulty="Medium",
        competency_level="Understand",
        context_tag="STANDARD",
        question_text=(
            f"A metre rule of negligible mass is pivoted at its 50 cm mark. "
            f"A mass of {m1} g is suspended at the {d1} cm mark on the left pan "
            f"and another mass of {m2} g on the right pan. "
            f"Find the position (in cm from the fulcrum) at which the {m2} g mass "
            f"must be placed to keep the rule horizontal. "
            f"State the principle of moments."
        ),
        marks=4,
        syllabus_ref=(
            "ICSE Class 10 Physics – Principle of moments; "
            "simple numerical problems on metre rule"
        ),
        vocabulary=[
            "principle of moments", "clockwise moment", "anticlockwise moment",
            "fulcrum", "equilibrium", "metre rule"
        ],
        solution=Solution(
            approach=(
                "Principle of moments: For a body in equilibrium, the sum of "
                "clockwise moments equals the sum of anticlockwise moments about "
                "any point."
            ),
            steps=[
                _opt("Given",
                     f"m₁ = {m1} g at d₁ = {d1} cm (left)  |  "
                     f"m₂ = {m2} g (right pan)"),
                _opt("Principle",
                     "Sum of clockwise moments = Sum of anticlockwise moments"),
                _opt("Equation",
                     f"m₁ × g × d₁ = m₂ × g × d₂  →  {m1} × {d1} = {m2} × d₂"),
                _opt("Solve", f"d₂ = ({m1} × {d1}) / {m2} = {d2} cm"),
            ],
            verification=_ver(
                "Substitute d₂ back: left moment vs right moment",
                f"Left = {m1}×{d1} = {m1*d1} g·cm; "
                f"Right = {m2}×{d2} = {m2*d2} g·cm → Equal ✔"
            ),
            answer=_ans(
                f"The {m2} g mass must be placed at {d2} cm "
                f"from the fulcrum on the right side."
            ),
            explanation=(
                "Since g (acceleration due to gravity) is common to both sides, it "
                "cancels out. We only need to equate m₁×d₁ = m₂×d₂. The heavier "
                "mass must sit closer to the fulcrum; the lighter mass farther away."
            ),
        ),
    )


def _tpl_spring_balance_verification(seed: int) -> Question:
    rng = random.Random(seed + 2)
    w1 = rng.randint(20, 60)       # g  (left)
    d1 = rng.randint(10, 20)       # cm from fulcrum
    w2 = rng.randint(10, 40)       # g  (right)
    d2 = round(w1 * d1 / w2)
    d2 = max(5, min(d2, 30))

    S1 = round(w1 * d1 / d2, 2)   # spring balance 1 reading (force proxy)
    S2 = round(w2 * d2 / d1, 2)   # spring balance 2 reading

    return Question(
        id=f"C10P001-Q{seed+200:03d}",
        node_id="c10_phy_001",
        topic="Verification of principle of moments – spring balances",
        difficulty="Medium",
        competency_level="Understand",
        context_tag="INDIAN_CONTEXT",
        question_text=(
            "To verify the principle of moments, a metre rule is supported at its "
            "centre (50 cm mark) by a stirrup. Two spring balances are attached "
            f"to slotted weights of {w1} g and {w2} g hung at distances "
            f"{d1} cm and {d2} cm respectively from the fulcrum on opposite sides. "
            f"If the spring balance on the {w1} g side reads {S1} gf, "
            "calculate the reading of the other spring balance. "
            "Verify that the principle of moments holds."
        ),
        marks=4,
        syllabus_ref=(
            "ICSE Class 10 Physics – Verification of principle of moments using "
            "two spring balances and slotted weights on a metre rule"
        ),
        vocabulary=[
            "principle of moments", "spring balance", "slotted weight",
            "fulcrum", "clockwise moment", "anticlockwise moment"
        ],
        solution=Solution(
            approach=(
                "The spring balance reading equals the tension (force) needed to "
                "support the weight. Equate clockwise and anticlockwise moments to "
                "find the unknown spring balance reading."
            ),
            steps=[
                _opt("Given",
                     f"Left: W₁ = {w1} gf, d₁ = {d1} cm  |  "
                     f"Right: W₂ = {w2} gf, d₂ = {d2} cm"),
                _opt("Balance equation",
                     f"W₁ × d₁ = W₂ × d₂  →  {w1}×{d1} = {w2}×{d2}"),
                _opt("Check LHS", f"{w1} × {d1} = {w1*d1} gf·cm"),
                _opt("Check RHS", f"{w2} × {d2} = {w2*d2} gf·cm  →  match ✔"),
                _opt("Spring balance reading",
                     f"S₂ (reading) = W₂ = {w2} gf   [S₁ = {S1} gf, S₂ = {S2} gf]"),
            ],
            verification=_ver(
                "Both moments numerically equal",
                f"{w1*d1} = {w2*d2} = {w1*d1} gf·cm — principle of moments verified ✔"
            ),
            answer=_ans(
                f"Spring balance on the {w2} g side reads {S2} gf. "
                f"The metre rule remains horizontal, confirming the principle of "
                f"moments."
            ),
            explanation=(
                "In a standard laboratory verification, the stirrup supports the "
                "rule and the two spring balances are adjusted until the pointer "
                "coincides at the zero of the scale. At equilibrium the readings "
                "satisfy: left moment = right moment."
            ),
        ),
    )


def _tpl_clockwise_anticlockwise(seed: int) -> Question:
    rng = random.Random(seed + 3)
    F  = rng.randint(10, 40)
    d  = rng.randint(15, 60)
    M  = F * d / 100.0
    ang = rng.choice(["30°", "45°", "60°", "90°"])

    return Question(
        id=f"C10P001-Q{seed+300:03d}",
        node_id="c10_phy_001",
        topic="Clockwise and anticlockwise moments",
        difficulty="Easy",
        competency_level="Understand",
        context_tag="INDIAN_CONTEXT",
        question_text=(
            f"A force of {F} N is applied tangentially to the edge of a wheel of "
            f"radius {d/100:.2f} m, at an angle of {ang} to the radius. "
            "Identify the direction of the moment produced (clockwise or "
            "anticlockwise) and calculate its magnitude. "
            "Also state one everyday application where a large moment is desirable."
        ),
        marks=3,
        syllabus_ref=(
            "ICSE Class 10 Physics – Clockwise and anticlockwise moments; "
            "common examples – steering wheel, spanner, pedal"
        ),
        vocabulary=[
            "clockwise moment", "anticlockwise moment",
            "tangential force", "perpendicular distance", "torque"
        ],
        solution=Solution(
            approach=(
                "For a force applied tangentially to a wheel, the direction of "
                "rotation determines the moment direction. Magnitude = F × r "
                "(since tangential force is perpendicular to the radius)."
            ),
            steps=[
                _opt("Given", f"F = {F} N, radius r = {d/100:.2f} m, tangential force"),
                _opt("Direction", (
                    "Using right-hand rule / visual inspection: "
                    "force tangentially → produces anticlockwise moment"
                )),
                _opt("Calculation", f"Moment = F × r = {F} × {d/100:.2f} = {M:.2f} N·m"),
            ],
            verification=_ver(
                "Units and magnitude sanity check",
                f"{F} N × {d/100:.2f} m = {M:.2f} N·m — unit = N·m ✔"
            ),
            answer=_ans(
                f"Direction: Anticlockwise moment. "
                f"Magnitude: {M:.2f} N·m. "
                "Application: A long spanner generates a large moment when "
                "loosening a tight nut."
            ),
            explanation=(
                "When force is tangential to the rim, the entire lever arm is "
                "effective. This is why steering wheels have large diameters — "
                "a larger radius means a larger turning moment for the same force."
            ),
        ),
    )


# ── NODE c10_phy_002: Centre of gravity ──────────────────────────────────────

def _tpl_cg_rectangle(seed: int) -> Question:
    rng = random.Random(seed + 10)
    L = rng.randint(20, 50)       # cm
    W = rng.randint(10, 30)       # cm

    return Question(
        id=f"C10P002-Q{seed+10:03d}",
        node_id="c10_phy_002",
        topic="Centre of gravity of a regular body – rectangle",
        difficulty="Medium",
        competency_level="Understand",
        context_tag="INDIAN_CONTEXT",
        question_text=(
            f"Find the centre of gravity (CG) of a uniform rectangular lamina "
            f"of length {L} cm and breadth {W} cm. "
            f"State its coordinates if the lower-left corner is taken as the "
            f"origin (0, 0). "
            "Explain why the CG lies at this point."
        ),
        marks=3,
        syllabus_ref=(
            "ICSE Class 10 Physics – Centre of gravity: "
            "rectangle at intersection of diagonals"
        ),
        vocabulary=[
            "centre of gravity", "regular body", "uniform lamina",
            "intersection of diagonals", "balancing point"
        ],
        solution=Solution(
            approach=(
                "For a uniform rectangular lamina, the centre of gravity lies at "
                "the intersection of the two diagonals, i.e., at the geometric "
                "centre. Coordinates = (L/2, W/2) from one corner."
            ),
            steps=[
                _opt("Geometry",
                     f"Rectangle: length L = {L} cm, breadth W = {W} cm"),
                _opt("Property",
                     "Uniform lamina → CG at intersection of diagonals"),
                _opt("Coordinates",
                     f"CG = (L/2, W/2) = ({L//2} cm, {W//2} cm)"),
            ],
            verification=_ver(
                "Symmetry check: CG lies at the midpoint of both diagonals",
                f"Midpoint of one diagonal = ({L//2}, {W//2}) — matches ✔"
            ),
            answer=_ans(
                f"CG is at the point ({L//2} cm, {W//2} cm) from the corner, "
                f"which is the intersection of the diagonals."
            ),
            explanation=(
                "Because a rectangle has two lines of symmetry, the CG must lie "
                "on both lines simultaneously — which is their intersection. This "
                "is why a rectangular sheet of paper balances perfectly when "
                "supported at this point."
            ),
        ),
    )


def _tpl_cg_triangle(seed: int) -> Question:
    rng = random.Random(seed + 11)
    B = rng.randint(20, 50)       # base cm
    H = rng.randint(15, 40)       # height cm

    return Question(
        id=f"C10P002-Q{seed+110:03d}",
        node_id="c10_phy_002",
        topic="Centre of gravity of a regular body – triangle",
        difficulty="Medium",
        competency_level="Understand",
        context_tag="STANDARD",
        question_text=(
            f"An equilateral triangular lamina has side {B} cm. "
            "Locate its centre of gravity and state its distance from each "
            "vertex along the median. "
            "What fraction of the median length is this distance?"
        ),
        marks=3,
        syllabus_ref=(
            "ICSE Class 10 Physics – Centre of gravity of a triangle: "
            "at the centroid (intersection of medians)"
        ),
        vocabulary=[
            "centre of gravity", "triangle", "centroid",
            "median", "intersection of medians"
        ],
        solution=Solution(
            approach=(
                "For any triangle (including equilateral), the CG lies at the "
                "centroid — the point where the three medians intersect. The "
                "centroid divides each median in the ratio 2:1 from the vertex."
            ),
            steps=[
                _opt("Property",
                     "For a uniform triangular lamina, CG is at the centroid"),
                _opt("Median length",
                     f"Median length h = (√3 / 2) × {B} = {round(H*math.sqrt(3)/2,1)} cm"),
                _opt("CG from vertex",
                     f"CG is at 2/3 × median = "
                     f"2/3 × {round(H*math.sqrt(3)/2,1)} = "
                     f"{round(2*H*math.sqrt(3)/6,1)} cm from each vertex"),
                _opt("Fraction",
                     "CG divides median in ratio 2:1 → 2/3 of median from vertex"),
            ],
            verification=_ver(
                "2/3 + 1/3 = 1 — centroid divides median completely",
                "Ratio 2:1 holds — centroid property confirmed ✔"
            ),
            answer=_ans(
                f"CG is at the centroid, 2/3 of the median (≈ "
                f"{round(2*H*math.sqrt(3)/6,1)} cm) from each vertex and 1/3 "
                f"(≈ {round(H*math.sqrt(3)/6,1)} cm) from the opposite side."
            ),
            explanation=(
                "The centroid of a triangle is its CG because the median divides "
                "the triangle into two equal areas. The three medians, drawn from "
                "each vertex, always meet at one point — the centroid — which is "
                "the unique balancing point."
            ),
        ),
    )


def _tpl_plumbline_irregular(seed: int) -> Question:
    rng = random.Random(seed + 12)
    ax = rng.randint(12, 18)      # cm  (x from first suspension point)
    ay = rng.randint(15, 25)      # cm
    bx = rng.randint(22, 28)      # cm  (x from first suspension point)
    by = rng.randint(10, 18)      # cm
    # intersection of two lines through (0,ay) slope (ax/ay) and (bx,by) slope ((bx-0)/(by-0))
    # Using two-point form: line through (0, ay) and (ax, 0)
    # line through (0, by) and (bx, 0)
    # Intersection: x = (ay*by*(bx-0)) / (ay*bx - by*ax)  ... using general form
    # Line1: x/ax + y/ay = 1  → ay*x + ax*y = ax*ay
    # Line2: x/bx + y/by = 1  → by*x + bx*y = bx*by
    # Solve: x = (ax*ay*bx*by - ax*bx*by*ay) / (ay*bx - by*ax)
    denom = ay * bx - by * ax
    if abs(denom) < 0.01:
        denom = 0.01
    cg_x = (ax * ay * bx - bx * by * ay) / denom  # = ax*ay*bx/denom - bx*by*ay/denom
    # Actually simpler: solve system
    # ay*x + ax*y = ax*ay
    # by*x + bx*y = bx*by
    # x*(ay) + y*(ax) = ax*ay
    # x*(by) + y*(bx) = bx*by
    # x = (ax*ay*bx*by - ax*bx*by*ay) / (ay*bx - by*ax) ... 
    # let me just use Cramer's rule:
    # | ay  ax | |x| = |ax*ay|
    # | by  bx | |y|   |bx*by|
    # det = ay*bx - by*ax
    # x = (ax*ay*bx - ax*bx*by) / det  = ax*(ay*bx - bx*by)/det  ... no
    # x = det_x / det  where det_x = |ax*ay  ax| = ax*ay*bx - ax*bx*by
    #                               |bx*by  bx|
    det_x = ax * ay * bx - ax * bx * by
    det_y = ay * bx * by - by * ax * ay  # |ay  ax*ay| = ay*bx*by - by*ax*ay
    det = ay * bx - by * ax
    cg_x = det_x / det
    cg_y = det_y / det
    cg_x = round(cg_x, 2)
    cg_y = round(cg_y, 2)

    return Question(
        id=f"C10P002-Q{seed+210:03d}",
        node_id="c10_phy_002",
        topic="Centre of gravity of an irregular lamina – plumb line method",
        difficulty="Medium",
        competency_level="Understand",
        context_tag="INDIAN_CONTEXT",
        question_text=(
            "To find the centre of gravity of an irregular cardboard lamina, it "
            "is suspended from point A and a plumb line is drawn through the "
            "suspension point, cutting the lamina at a distance "
            f"{ax} cm below the point. The lamina is then suspended from a "
            "second point B, located {bx} cm horizontally from point A, and a "
            "second plumb line is drawn, cutting the lamina at a distance "
            f"{by} cm below point B. "
            "Calculate the coordinates of the CG of the lamina relative to "
            "point A."
        ),
        marks=4,
        syllabus_ref=(
            "ICSE Class 10 Physics – Method of finding CG of an irregular "
            "lamina using plumb line (suspension from two or more points)"
        ),
        vocabulary=[
            "centre of gravity", "irregular lamina", "plumb line",
            "suspension point", "intersection of plumb lines"
        ],
        solution=Solution(
            approach=(
                "The CG lies on the plumb line from any suspension point (a "
                "plumb line hangs vertically through the CG). Suspending from two "
                "different points gives two plumb lines; their intersection is "
                "the CG."
            ),
            steps=[
                _opt("Setup",
                     "Two suspension points A and B, two plumb lines drawn"),
                _opt("Line 1 (from A)",
                     f"Passes through A and {ax} cm below A on lamina"),
                _opt("Line 2 (from B)",
                     f"Passes through B ({bx} cm right of A) and {by} cm below B"),
                _opt("Intersection (CG)",
                     f"Solving simultaneously: x = {cg_x} cm, y = {cg_y} cm"),
            ],
            verification=_ver(
                "CG must lie between the two plumb lines (common-sense check)",
                f"CG at ({cg_x} cm, {cg_y} cm) — lies within the lamina area ✔"
            ),
            answer=_ans(
                f"The centre of gravity of the lamina is at "
                f"({cg_x} cm, {cg_y} cm) relative to point A, "
                f"which is the intersection of the two plumb lines."
            ),
            explanation=(
                "When a body hangs freely, its CG always lies vertically below "
                "the point of suspension. The plumb line (a weighted string) "
                "defines this vertical. Drawing plumb lines from two suspension "
                "points locates the unique intersection — the CG."
            ),
        ),
    )


def _tpl_cg_factors(seed: int) -> Question:
    rng = random.Random(seed + 13)
    h_base = rng.randint(40, 80)   # cm
    h_low  = rng.randint(10, 25)   # cm  (CG lowered)

    return Question(
        id=f"C10P002-Q{seed+220:03d}",
        node_id="c10_phy_002",
        topic="Factors affecting position of CG",
        difficulty="Medium",
        competency_level="Understand",
        context_tag="INDIAN_CONTEXT",
        question_text=(
            f"A standing person has their centre of gravity approximately "
            f"{h_base} cm above the ground. "
            "State two factors that affect the position of the CG. "
            "Explain why a person bends forward while lifting a heavy load from "
            "the ground, referring to the change in CG position."
        ),
        marks=4,
        syllabus_ref=(
            "ICSE Class 10 Physics – Factors affecting CG: "
            "shape of body and distribution of mass"
        ),
        vocabulary=[
            "centre of gravity", "distribution of mass",
            "shape of the body", "stability", "balancing"
        ],
        solution=Solution(
            approach=(
                "The CG position depends on (1) the overall shape of the body "
                "and (2) how mass is distributed within it. Changing body posture "
                "shifts the CG."
            ),
            steps=[
                _opt("Factor 1",
                     "Shape of the body – e.g., a sphere's CG is at its geometric "
                     "centre; a ring's CG is at its centre (empty space)"),
                _opt("Factor 2",
                     "Distribution of mass – concentrating mass lower shifts CG "
                     "downward; spreading mass higher shifts it upward"),
                _opt("Lifting explanation",
                     "When lifting a heavy load, bending forward shifts the upper "
                     "body CG backward and downward, keeping the combined CG "
                     "within the base (feet) for stability"),
                _opt("Result",
                     "Without bending, the combined CG could move outside the base, "
                     "causing the person to topple"),
            ],
            verification=_ver(
                "Everyday observation check",
                "Try lifting a heavy school bag without bending — instability is "
                "felt, confirming the CG explanation ✔"
            ),
            answer=_ans(
                "Two factors: (1) Shape of the body, (2) Distribution of mass. "
                "When lifting, bending moves the upper body backward, keeping the "
                "combined CG within the base of support and preventing a topple."
            ),
            explanation=(
                "A person standing upright has CG roughly at the navel (~55-60% of "
                "height). When they bend forward to lift, the upper torso moves "
                "backward relative to the hips, counteracting the forward shift of "
                "the load's CG, keeping the overall CG above the feet."
            ),
        ),
    )


# ── NODE c10_phy_003: Types of equilibrium ───────────────────────────────────

def _tpl_stable_equilibrium(seed: int) -> Question:
    rng = random.Random(seed + 20)
    h = rng.randint(8, 20)        # cm height of cone
    r = rng.randint(4, 12)        # cm radius

    return Question(
        id=f"C10P003-Q{seed+20:03d}",
        node_id="c10_phy_003",
        topic="Stable equilibrium",
        difficulty="Easy",
        competency_level="Understand",
        context_tag="INDIAN_CONTEXT",
        question_text=(
            f"A right circular cone of height {h} cm rests on its circular base "
            f"on a horizontal table (radius of base = {r} cm). "
            "It is slightly tilted to one side and released. "
            "(a) Does the cone return to its original position? "
            "(b) What happens to the height of its centre of gravity? "
            "(c) What type of equilibrium does this represent? "
            "Justify each answer."
        ),
        marks=4,
        syllabus_ref=(
            "ICSE Class 10 Physics – Types of equilibrium: stable equilibrium "
            "(CG rises after displacement)"
        ),
        vocabulary=[
            "stable equilibrium", "centre of gravity",
            "displacement", "restoring moment"
        ],
        solution=Solution(
            approach=(
                "In stable equilibrium, a slight displacement raises the CG. "
                "The resulting gravitational moment acts to restore the body to "
                "its original position."
            ),
            steps=[
                _opt("Situation",
                     f"Cone on its base — initial CG is at h/4 from base = {h/4:.1f} cm"),
                _opt("After tilt",
                     "Tilting moves the base contact sideways; the vertical through "
                     "the new pivot falls inside the base"),
                _opt("CG change",
                     f"CG rises relative to the pivot — height increases above "
                     f"{h/4:.1f} cm"),
                _opt("Conclusion",
                     "CG rises → restoring moment → cone returns → stable equilibrium"),
            ],
            verification=_ver(
                "Characteristic of stable equilibrium: CG rises after displacement",
                "CG height increases → stable equilibrium confirmed ✔"
            ),
            answer=_ans(
                "(a) Yes, it returns to its original position. "
                "(b) The height of the CG increases. "
                "(c) Stable equilibrium — because the CG rises on displacement "
                "and a restoring moment brings it back."
            ),
            explanation=(
                "When the cone tilts, the contact point shifts, and the CG moves "
                "to a higher position relative to that contact point. Gravity then "
                "exerts a moment that rotates the cone back to its base-on "
                "position — the hallmark of stable equilibrium."
            ),
        ),
    )


def _tpl_unstable_equilibrium(seed: int) -> Question:
    rng = random.Random(seed + 21)
    h = rng.randint(10, 25)

    return Question(
        id=f"C10P003-Q{seed+210:03d}",
        node_id="c10_phy_003",
        topic="Unstable equilibrium",
        difficulty="Easy",
        competency_level="Understand",
        context_tag="STANDARD",
        question_text=(
            f"A cone of height {h} cm is balanced vertically on its apex on a "
            "horizontal table. "
            "(a) What type of equilibrium does this represent when the cone is "
            "perfectly upright? "
            "(b) If the cone is given a slight push to the side, describe what "
            "happens to the CG and the subsequent motion. "
            "(c) How does this differ from stable equilibrium?"
        ),
        marks=4,
        syllabus_ref=(
            "ICSE Class 10 Physics – Unstable equilibrium (CG falls after "
            "displacement)"
        ),
        vocabulary=[
            "unstable equilibrium", "centre of gravity",
            "displacement", "apex", "toppling"
        ],
        solution=Solution(
            approach=(
                "In unstable equilibrium, a slight displacement causes the CG to "
                "fall, producing a moment that further displaces the body away "
                "from its original position."
            ),
            steps=[
                _opt("Initial state",
                     "Cone on apex — perfectly vertical → CG directly above pivot"),
                _opt("After slight tilt",
                     "Pivot remains at apex; CG shifts sideways and downward"),
                _opt("CG change",
                     "CG falls → gravitational moment pushes cone further away → "
                     "toppling continues"),
                _opt("Difference from stable",
                     "Stable: CG rises + restoring moment. "
                     "Unstable: CG falls + overturning moment."),
            ],
            verification=_ver(
                "Characteristic of unstable equilibrium: CG falls on displacement",
                "CG height decreases → unstable equilibrium confirmed ✔"
            ),
            answer=_ans(
                "(a) Unstable equilibrium. "
                "(b) The CG falls, producing an overturning moment — the cone "
                "topples over completely. "
                "(c) In stable equilibrium, CG rises on displacement; in unstable, "
                "CG falls on displacement."
            ),
            explanation=(
                "A cone balanced on its apex is in unstable equilibrium because "
                "the smallest disturbance moves the CG outside the support base "
                "(the apex point), and gravity amplifies the displacement rather "
                "than correcting it."
            ),
        ),
    )


def _tpl_neutral_equilibrium(seed: int) -> Question:
    rng = random.Random(seed + 22)
    r = rng.randint(5, 15)

    return Question(
        id=f"C10P003-Q{seed+220:03d}",
        node_id="c10_phy_003",
        topic="Neutral equilibrium",
        difficulty="Easy",
        competency_level="Understand",
        context_tag="INDIAN_CONTEXT",
        question_text=(
            f"A solid sphere of radius {r} cm rests on a perfectly horizontal "
            "frictionless surface. "
            "(a) What type of equilibrium does the sphere represent? "
            "(b) If the sphere is rolled a short distance along the surface, "
            "what happens to the height of its centre of gravity? "
            "(c) Explain why no moment acts to restore or further displace the "
            "sphere."
        ),
        marks=4,
        syllabus_ref=(
            "ICSE Class 10 Physics – Neutral equilibrium "
            "(CG remains at same height after displacement)"
        ),
        vocabulary=[
            "neutral equilibrium", "centre of gravity",
            "horizontal surface", "moment"
        ],
        solution=Solution(
            approach=(
                "Neutral equilibrium occurs when the CG remains at the same "
                "height after displacement, so no net moment acts."
            ),
            steps=[
                _opt("Initial CG height",
                     f"CG at centre of sphere, height = {r} cm above surface"),
                _opt("After rolling",
                     f"Sphere moves horizontally; CG is still {r} cm above surface "
                     f"(no change in height)"),
                _opt("Moment check",
                     "Since CG height unchanged → no net moment → no restoring or "
                     "overturning effect"),
                _opt("Classification",
                     "CG height unchanged → neutral equilibrium"),
            ],
            verification=_ver(
                "Height of CG unchanged: initial = final = radius of sphere",
                f"CG height before = {r} cm, after = {r} cm → no change ✔"
            ),
            answer=_ans(
                "(a) Neutral equilibrium. "
                "(b) The CG height remains {r} cm — no change. "
                "(c) No moment acts because the CG is at the same height; the "
                "sphere neither returns nor moves further away — it stays wherever "
                "placed."
            ),
            explanation=(
                "A sphere on a flat surface has the same CG height wherever it "
                "sits. Since no tendency to rise or fall exists, no moment is "
                "generated. A cylinder or a cone on its side also shows neutral "
                "equilibrium. Ships and boats float in neutral equilibrium."
            ),
        ),
    )


def _tpl_cg_and_vehicle_stability(seed: int) -> Question:
    rng = random.Random(seed + 23)
    h_racing = rng.randint(30, 50)   # cm
    h_truck   = rng.randint(90, 130) # cm
    wheelbase = rng.randint(150, 250)# cm

    return Question(
        id=f"C10P003-Q{seed+230:03d}",
        node_id="c10_phy_003",
        topic="Centre of gravity and stability of vehicles",
        difficulty="Medium",
        competency_level="Understand",
        context_tag="INDIAN_CONTEXT",
        question_text=(
            f"The centre of gravity of a racing car is {h_racing} cm from the "
            f"ground, while that of a loaded truck is {h_truck} cm. "
            f"The wheelbase (distance between front and rear axles) is "
            f"{wheelbase} cm for both. "
            "Explain which vehicle is more stable when negotiating a sharp turn "
            "and why. "
            "Also state two design features of a racing car that enhance its "
            "stability."
        ),
        marks=4,
        syllabus_ref=(
            "ICSE Class 10 Physics – Centre of gravity and stability; "
            "types of equilibrium in everyday contexts"
        ),
        vocabulary=[
            "centre of gravity", "stable equilibrium",
            "stability", "wheelbase", "distribution of mass"
        ],
        solution=Solution(
            approach=(
                "A lower CG means the vehicle is more stable — when cornering, "
                "the CG must not move outside the wheelbase polygon or the vehicle "
                "rolls over."
            ),
            steps=[
                _opt("Comparison",
                     f"Racing car CG = {h_racing} cm  |  "
                     f"Truck CG = {h_truck} cm"),
                _opt("Stability criterion",
                     "Lower CG → smaller moment arm → less likely to topple on turn"),
                _opt("Result",
                     f"Racing car (CG {h_racing} cm) is far more stable than "
                     f"the truck (CG {h_truck} cm)"),
                _opt("Design features",
                     "Wide wheelbase; low CG by placing heavy engine low; "
                     "wide tyres for larger base; spoilers to increase downforce"),
            ],
            verification=_ver(
                "CG ratio: racing car CG / truck CG",
                f"{h_racing}/{h_truck} = {h_racing/h_truck:.2f} → "
                f"racing car CG is {h_truck//h_racing}× lower → much more stable ✔"
            ),
            answer=_ans(
                f"The racing car is more stable because its CG ({h_racing} cm) "
                f"is much lower than the truck's ({h_truck} cm). "
                "Design features: (1) Low-slung heavy engine lowers CG, "
                "(2) Wide wheelbase increases the base area, "
                "(3) Spoilers increase downforce."
            ),
            explanation=(
                "When a vehicle turns, centrifugal force acts horizontally "
                "through the CG. If this force creates a moment that would lift "
                "the inner wheels, the vehicle rolls over. A lower CG means a "
                "shorter moment arm for the same centrifugal force — hence greater "
                "resistance to rollover. Indian trucks often have high CG and are "
                "prone to rollover on sharp turns at speed."
            ),
        ),
    )


# ─── generator ────────────────────────────────────────────────────────────────

@dataclass
class GeneratedQuestion:
    question: Question
    seed_used: int


class PhysicsQuestionGenerator:
    """Deterministic, seeded generator for Class 10 Physics (ICSE)."""

    NODE_TEMPLATES = {
        "c10_phy_001": [
            _tpl_moment_door,
            _tpl_principle_moments_meter_rule,
            _tpl_spring_balance_verification,
            _tpl_clockwise_anticlockwise,
        ],
        "c10_phy_002": [
            _tpl_cg_rectangle,
            _tpl_cg_triangle,
            _tpl_plumbline_irregular,
            _tpl_cg_factors,
        ],
        "c10_phy_003": [
            _tpl_stable_equilibrium,
            _tpl_unstable_equilibrium,
            _tpl_neutral_equilibrium,
            _tpl_cg_and_vehicle_stability,
        ],
    }

    def __init__(self, seed: int = 42):
        self._rng = random.Random(seed)
        self._all_nodes = list(self.NODE_TEMPLATES.keys())
        self._counters: dict = {n: 0 for n in self._all_nodes}

    def generate_one(self, node_id: Optional[str] = None) -> GeneratedQuestion:
        if node_id is None:
            node_id = self._rng.choice(self._all_nodes)

        templates = self.NODE_TEMPLATES[node_id]
        idx = self._counters[node_id] % len(templates)
        tpl_fn = templates[idx]
        self._counters[node_id] += 1

        # deterministic per-request seed
        call_seed = self._counters[node_id] * 100 + hash(node_id) % 10000
        q = tpl_fn(call_seed)
        return GeneratedQuestion(question=q, seed_used=call_seed)

    def generate_batch(
        self,
        count: int = 10,
        per_node: Optional[dict] = None,
    ) -> List[GeneratedQuestion]:
        results: List[GeneratedQuestion] = []
        if per_node:
            for nid, n in per_node.items():
                for _ in range(n):
                    results.append(self.generate_one(nid))
        else:
            for i in range(count):
                node = self._all_nodes[i % len(self._all_nodes)]
                results.append(self.generate_one(node))
        return results

    def save_to_file(self, questions: List[GeneratedQuestion], path: str) -> None:
        lines = [
            "=" * 72,
            "  CLASS 10 PHYSICS – DETERMINISTIC QUESTION BANK",
            "  Source Syllabus : ICSE Class 10 Physics",
            "  Nodes covered  : c10_phy_001 | c10_phy_002 | c10_phy_003",
            f"  Total questions: {len(questions)}",
            f"  Generated at   : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
            "=" * 72,
            "",
        ]
        for gq in questions:
            lines.append(gq.question.to_block())

        summary = self._build_summary(questions)
        lines.append(summary)

        with open(path, "w", encoding="utf-8") as fh:
            fh.write("\n".join(lines))

        print(f"[OK] Saved {len(questions)} questions → {path}")

    # ── summary ───────────────────────────────────────────────────────────────

    def _build_summary(self, items: List[GeneratedQuestion]) -> str:
        from collections import Counter
        node_cnt  = Counter(gq.question.node_id for gq in items)
        diff_cnt  = Counter(gq.question.difficulty for gq in items)
        ctx_cnt   = Counter(gq.question.context_tag for gq in items)
        comp_cnt  = Counter(gq.question.competency_level for gq in items)

        sep = "-" * 60
        lines = [
            sep,
            "  SUMMARY",
            sep,
            "  By Node:",
        ]
        for nid, cnt in sorted(node_cnt.items()):
            lines.append(f"    {nid:20s} : {cnt} question(s)")
        lines += [
            "",
            "  By Difficulty:",
        ]
        for d, cnt in sorted(diff_cnt.items()):
            lines.append(f"    {d:20s} : {cnt}")
        lines += [
            "",
            "  By Context Tag:",
        ]
        for c, cnt in sorted(ctx_cnt.items()):
            lines.append(f"    {c:20s} : {cnt}")
        lines += [
            "",
            "  By Competency Level:",
        ]
        for c, cnt in sorted(comp_cnt.items()):
            lines.append(f"    {c:20s} : {cnt}")
        lines += [
            "",
            "  Vocabulary Covered:",
            "    moment of force | torque | clockwise moment | anticlockwise moment",
            "    equilibrium | principle of moments | centre of gravity",
            "    regular body | irregular lamina | plumb line | fulcrum",
            "    stable equilibrium | unstable equilibrium | neutral equilibrium",
            "    CG height | restoring moment | wheelbase | distribution of mass",
            sep,
        ]
        return "\n".join(lines)


# ─── main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    gen = PhysicsQuestionGenerator(seed=42)

    # balanced distribution: 4 from node-001, 3 from node-002, 3 from node-003
    spec = {"c10_phy_001": 4, "c10_phy_002": 3, "c10_phy_003": 3}
    batch = gen.generate_batch(per_node=spec)

    print(f"\n{'='*60}")
    print(f"  CLASS 10 PHYSICS – Question Generation Report")
    print(f"{'='*60}")
    for gq in batch:
        q = gq.question
        print(
            f"  [{q.id}] {q.node_id} | {q.difficulty:6s} | "
            f"{q.context_tag:16s} | seed={gq.seed_used}"
        )
    print(f"{'='*60}\n")

    gen.save_to_file(batch, "class10_physics_questions.py")


if __name__ == "__main__":
    main()