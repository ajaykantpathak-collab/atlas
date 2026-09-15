"""Problem Types — chains of step types for multi-step problems.

Each problem type is a sequence of step types that solve a complete
CBSE/ISC question. Steps chain automatically — each step's output
feeds into the next step's input.

Problem types are organized by topic and class, matching the
CBSE/ISC curriculum structure.
"""

from dataclasses import dataclass, field
from typing import Optional


@dataclass
class ProblemStep:
    """A single step in a problem type chain."""
    step_type_id: str       # references step_types.STEP_TYPES
    label: str              # display label for this step
    auto_fill: dict = field(default_factory=dict)
    # auto_fill maps output names from previous steps to input field names
    # e.g. {"previous.answer_raw": "expression"} means take the raw answer
    # from the previous step and put it in this step's "expression" field


@dataclass
class ProblemThinkingQuestion:
    """Competency question asked before the entire problem."""
    question: str
    options: list
    correct: str
    explanation: str


@dataclass
class ProblemType:
    """A complete problem type — a chain of steps that solves a CBSE/ISC question."""
    id: str                     # unique identifier
    name: str                   # display name
    description: str            # what this problem type solves
    topic: str                  # curriculum topic
    class_level: str            # "12", "11", "10", etc.
    board: str                  # "CBSE", "ISC", "both"
    marks: int                  # total marks for this question type
    steps: list                 # list of ProblemStep
    thinking: Optional[ProblemThinkingQuestion] = None
    example: str = ""           # example question text
    hint: str = ""              # setup hint — how to extract the expression/variables from the word problem
    setup_help: str = ""        # detailed setup help — the formula or method to construct the expression from context


# ─────────────────────────────────────────────────────────────────────
# Problem Type Definitions
# ─────────────────────────────────────────────────────────────────────

PROBLEM_TYPES = {

    # ════════════════════════════════════════════
    # CALCULUS — Differentiation
    # ════════════════════════════════════════════

    "deriv_at_point": ProblemType(
        id="deriv_at_point",
        name="Find Derivative at a Point",
        description="Differentiate a function and evaluate at a specific point",
        topic="Differentiation",
        class_level="12",
        board="both",
        marks=2,
        steps=[
            ProblemStep("differentiate_at_point", "Find f'(a)"),
        ],
        thinking=ProblemThinkingQuestion(
            question="To find f'(a), what is the correct approach?",
            options=[
                "Differentiate f(x) to get f'(x), then substitute x=a",
                "Substitute x=a into f(x) first, then differentiate",
                "Integrate f(x), then substitute x=a",
                "Set f(x) = a and solve for x",
            ],
            correct="Differentiate f(x) to get f'(x), then substitute x=a",
            explanation="The derivative is a function f'(x). To find its value at a point, "
                        "first find f'(x), then substitute x=a.",
        ),
        example="If f(x) = x·tan⁻¹(x), find f'(1)",
        hint="Find f'(x), then substitute x=a. Type expression, variable, and point.",
    ),

    "find_critical_points": ProblemType(
        id="find_critical_points",
        name="Find Critical Points",
        description="Find where the derivative equals zero",
        topic="Differentiation",
        class_level="12",
        board="both",
        marks=3,
        steps=[
            ProblemStep("critical_points", "Find critical points"),
        ],
        thinking=ProblemThinkingQuestion(
            question="What is a critical point of a function?",
            options=[
                "A point where f'(x) = 0 or f'(x) does not exist",
                "A point where f(x) = 0",
                "A point where f''(x) = 0",
                "The maximum value of the function",
            ],
            correct="A point where f'(x) = 0 or f'(x) does not exist",
            explanation="Critical points are where the derivative is zero or undefined. "
                        "These are candidates for local maxima or minima.",
        ),
        example="Find the critical points of f(x) = x³ - 3x + 2",
        hint="Where f'(x)=0. Differentiate, set to 0, solve. Type expression and variable.",
    ),

    "max_min_optimization": ProblemType(
        id="max_min_optimization",
        name="Find Maximum/Minimum (Optimization)",
        description="Find critical points, check max/min, and find the extreme value",
        topic="Differentiation",
        class_level="12",
        board="both",
        marks=5,
        steps=[
            ProblemStep("critical_points", "Step 1: Find critical points"),
            ProblemStep("check_max_min", "Step 2: Check if max or min",
                        auto_fill={"previous.answer_raw": "point",
                                   "step_0.inputs.var": "var"}),
            ProblemStep("evaluate_at_point", "Step 3: Find the maximum/minimum value",
                        auto_fill={"step_0.inputs.expression": "expression",
                                   "step_0.inputs.var": "var",
                                   "step_1.answer_raw": "point"}),
        ],
        thinking=ProblemThinkingQuestion(
            question="To find the maximum value of a function, what steps do we follow?",
            options=[
                "1. Find critical points → 2. Check second derivative → 3. Evaluate function at critical point",
                "1. Integrate → 2. Set to zero → 3. Solve",
                "1. Find derivative → 2. Set to 1 → 3. Solve",
                "1. Evaluate at any point → 2. Check if it's the max",
            ],
            correct="1. Find critical points → 2. Check second derivative → 3. Evaluate function at critical point",
            explanation="To optimize: find where f'(x)=0 (critical points), use the second derivative "
                        "test to identify max/min, then evaluate f at that point.",
        ),
        example="Find the maximum value of f(x) = -x² + 4x + 1",
        hint="If the question gives a word problem (like box volume), first write the function to optimize. For a box made by cutting squares of side x from a 12cm sheet: V = x(12-2x)². Use x**2 for x².",
        setup_help="Common setups:\n• Box from sheet: V = x*(L-2*x)**2\n• Profit maximization: P = R(x) - C(x)\n• Area with fixed perimeter: A = x*(P/2 - x)\n• Projectile height: h(t) = v*t - 5*t**2 (use g=10) or h(t) = v*t - 4.9*t**2 (use g=9.8)",
    ),

    "profit_maximization": ProblemType(
        id="profit_maximization",
        name="Profit Maximization (Cost & Revenue)",
        description="Given cost and revenue functions, find maximum profit",
        topic="Application of Calculus",
        class_level="12",
        board="both",
        marks=4,
        steps=[
            ProblemStep("evaluate_at_point", "Step 1: Find profit function P(x) = R(x) - C(x)",
                        auto_fill={}),
            # This is a custom step — student inputs R(x) and C(x), system computes P = R - C
            # For now, student computes P manually and enters it
            ProblemStep("critical_points", "Step 2: Find critical points of P(x)",
                        auto_fill={"step_0.answer_raw": "expression"}),
            ProblemStep("check_max_min", "Step 3: Check if maximum",
                        auto_fill={"step_0.inputs.expression": "expression",
                                   "step_1.answer_raw": "point"}),
            ProblemStep("evaluate_at_point", "Step 4: Find maximum profit",
                        auto_fill={"step_0.inputs.expression": "expression",
                                   "step_1.answer_raw": "point"}),
        ],
        thinking=ProblemThinkingQuestion(
            question="What is the relationship between profit, revenue, and cost?",
            options=[
                "Profit = Revenue - Cost",
                "Profit = Revenue + Cost",
                "Profit = Cost - Revenue",
                "Profit = Revenue × Cost",
            ],
            correct="Profit = Revenue - Cost",
            explanation="Profit is what remains after subtracting costs from revenue: "
                        "P(x) = R(x) - C(x). To maximize profit, find critical points of P(x).",
        ),
        example="C(x) = 0.5x² - 10x + 150, R(x) = -0.3x² + 20x. Find maximum profit.",
        hint="P = R(x) - C(x). Max where P'(x)=0 (MR=MC). Type the profit function.",
    ),

    # ════════════════════════════════════════════
    # CALCULUS — Integration
    # ════════════════════════════════════════════

    "indefinite_integral": ProblemType(
        id="indefinite_integral",
        name="Find Indefinite Integral",
        description="Find the antiderivative of a function",
        topic="Integration",
        class_level="12",
        board="both",
        marks=3,
        steps=[
            ProblemStep("integrate_indefinite", "Find ∫f(x)dx"),
        ],
        thinking=ProblemThinkingQuestion(
            question="What is an indefinite integral?",
            options=[
                "The antiderivative of a function, plus a constant C",
                "The derivative of a function",
                "The area under a curve between two points",
                "The maximum value of a function",
            ],
            correct="The antiderivative of a function, plus a constant C",
            explanation="An indefinite integral ∫f(x)dx = F(x) + C, where F'(x) = f(x) "
                        "and C is an arbitrary constant.",
        ),
        example="Find ∫ x·sin(x) dx",
        hint="Integral of f(x)dx = F(x) + C. Type expression and variable.",
    ),

    "definite_integral": ProblemType(
        id="definite_integral",
        name="Find Definite Integral",
        description="Find the definite integral between two bounds",
        topic="Integration",
        class_level="12",
        board="both",
        marks=3,
        steps=[
            ProblemStep("integrate_definite", "Find ∫[a to b] f(x) dx"),
        ],
        thinking=ProblemThinkingQuestion(
            question="What does a definite integral ∫[a to b] f(x) dx represent?",
            options=[
                "The net signed area between f(x) and the x-axis from a to b",
                "The slope of f(x) at x = a",
                "The average value of f(x)",
                "The maximum of f(x) on [a, b]",
            ],
            correct="The net signed area between f(x) and the x-axis from a to b",
            explanation="A definite integral gives the net area (positive above x-axis, "
                        "negative below) between the curve and x-axis from x=a to x=b.",
        ),
        example="Evaluate ∫[0 to 1] x² dx",
        hint="Integral from a to b = F(b) - F(a). Type expression, variable, lower, upper.",
    ),

    "area_between_curves": ProblemType(
        id="area_between_curves",
        name="Find Area Between Two Curves",
        description="Find the area enclosed between two curves",
        topic="Application of Integration",
        class_level="12",
        board="both",
        marks=5,
        steps=[
            ProblemStep("area_between_curves", "Find area = ∫(y₁ - y₂) dx"),
        ],
        thinking=ProblemThinkingQuestion(
            question="How do you find the area between two curves y₁(x) and y₂(x)?",
            options=[
                "Area = ∫[a to b] (y₁ - y₂) dx, where y₁ ≥ y₂",
                "Area = ∫[a to b] (y₁ + y₂) dx",
                "Area = y₁(a) - y₂(b)",
                "Area = ∫[a to b] y₁ × y₂ dx",
            ],
            correct="Area = ∫[a to b] (y₁ - y₂) dx, where y₁ ≥ y₂",
            explanation="The area between curves is the integral of the difference: "
                        "upper curve minus lower curve, integrated between the intersection points.",
        ),
        example="Find the area between y² = 16x and x = 4",
        hint="To find area between curves: 1) Find where curves intersect (set them equal, solve for x or y), 2) Identify which curve is on top (upper) and which is below (lower), 3) Integrate (upper - lower) from left intersection to right intersection.",
        setup_help="Area = ∫(upper - lower) dx from a to b\n• To find intersection points: set y₁ = y₂ and solve\n• Upper curve has LARGER y values in the region\n• For y=f(x) vs x=g(y): if curves are in terms of y, integrate with respect to y\n• Common: y=x² and y=x → intersect at x=0 and x=1, upper=y=x, lower=y=x²",
    ),

    # ════════════════════════════════════════════
    # CALCULUS — Continuity & Limits
    # ════════════════════════════════════════════

    "continuity_find_k": ProblemType(
        id="continuity_find_k",
        name="Find k for Continuity",
        description="Find the value of k that makes a piecewise function continuous",
        topic="Continuity",
        class_level="12",
        board="both",
        marks=2,
        steps=[
            ProblemStep("continuity_find_k", "Find k for continuity"),
        ],
        thinking=ProblemThinkingQuestion(
            question="For a piecewise function to be continuous at x = a, what must hold?",
            options=[
                "Left limit = Right limit = f(a)",
                "Left limit = Right limit (f(a) can be anything)",
                "f(a) = 0",
                "The derivative must exist at x = a",
            ],
            correct="Left limit = Right limit = f(a)",
            explanation="For continuity at x=a: the left-hand limit, right-hand limit, "
                        "and function value must all be equal.",
        ),
        example="f(x) = kx+1 if x≤π, cos(x) if x>π. Find k for continuity at x=π.",
        hint="For continuity: left limit = right limit = f(a). Type expression and point.",
    ),

    # ════════════════════════════════════════════
    # CALCULUS — Differential Equations
    # ════════════════════════════════════════════

    "solve_de": ProblemType(
        id="solve_de",
        name="Solve Differential Equation",
        description="Solve a first-order linear differential equation",
        topic="Differential Equations",
        class_level="12",
        board="both",
        marks=5,
        steps=[
            ProblemStep("differential_equation", "Solve the DE"),
        ],
        thinking=ProblemThinkingQuestion(
            question="What is the standard form of a first-order linear differential equation?",
            options=[
                "dy/dx + P(x)y = Q(x)",
                "dy/dx = P(x) + Q(x)",
                "d²y/dx² + P(x)dy/dx = Q(x)",
                "y = P(x) + Q(x)",
            ],
            correct="dy/dx + P(x)y = Q(x)",
            explanation="The standard form is dy/dx + P(x)y = Q(x). "
                        "We solve it using the integrating factor IF = e^(∫P dx).",
        ),
        example="Solve: dy/dx + 2y = sin(x)",
        hint="Solve dy/dx = f(x,y). Type the differential equation.",
    ),

    # ════════════════════════════════════════════
    # MATRICES & DETERMINANTS
    # ════════════════════════════════════════════

    "find_determinant": ProblemType(
        id="find_determinant",
        name="Find Determinant of a Matrix",
        description="Find the determinant of a square matrix",
        topic="Determinants",
        class_level="12",
        board="both",
        marks=2,
        steps=[
            ProblemStep("determinant", "Find |A|"),
        ],
        thinking=ProblemThinkingQuestion(
            question="For a 2×2 matrix [[a,b],[c,d]], what is the determinant?",
            options=[
                "ad - bc",
                "ad + bc",
                "ab - cd",
                "a + b + c + d",
            ],
            correct="ad - bc",
            explanation="For a 2×2 matrix, det = ad - bc (products of diagonal minus anti-diagonal).",
        ),
        example="Find the determinant of [[1,2],[3,4]]",
        hint="det of 2x2 = ad-bc. Type matrix as [[a,b],[c,d]].",
    ),

    "matrix_inverse_and_solve": ProblemType(
        id="matrix_inverse_and_solve",
        name="Find Inverse and Solve System",
        description="Find A⁻¹ and use it to solve a system of linear equations",
        topic="Matrices",
        class_level="12",
        board="both",
        marks=6,
        steps=[
            ProblemStep("matrix_inverse", "Step 1: Find A⁻¹"),
            ProblemStep("solve_system_with_inverse", "Step 2: Solve AX = B using A⁻¹",
                        auto_fill={"step_0.inputs.matrix": "matrix"}),
        ],
        thinking=ProblemThinkingQuestion(
            question="How do you solve a system AX = B using matrix inverse?",
            options=[
                "X = A⁻¹B (find inverse of A, multiply by B)",
                "X = AB (multiply A by B)",
                "X = B/A (divide B by A)",
                "X = A + B",
            ],
            correct="X = A⁻¹B (find inverse of A, multiply by B)",
            explanation="If AX = B, then X = A⁻¹B. First find the inverse of A, "
                        "then multiply it by the vector B to get the solution.",
        ),
        example="A = [[1,2,0],[-2,-1,-2],[0,-1,1]]. Solve: x-2y=10, -2x-y-2z=5, -y+z=0",
        hint="Solve AX=B: X = A^-1 B. Type matrix A and vector B.",
    ),

    # ════════════════════════════════════════════
    # ALGEBRA
    # ════════════════════════════════════════════

    "solve_quadratic": ProblemType(
        id="solve_quadratic",
        name="Solve Quadratic Equation",
        description="Find roots of a quadratic equation",
        topic="Quadratic Equations",
        class_level="10",
        board="both",
        marks=2,
        steps=[
            ProblemStep("solve_equation", "Solve ax² + bx + c = 0"),
        ],
        thinking=ProblemThinkingQuestion(
            question="What are the methods to solve a quadratic equation?",
            options=[
                "Factorization, quadratic formula, completing the square",
                "Integration, differentiation",
                "Matrix method, Cramer's rule",
                "Only factorization works",
            ],
            correct="Factorization, quadratic formula, completing the square",
            explanation="Quadratic equations can be solved by factoring, using the formula "
                        "x = (-b ± √(b²-4ac)) / 2a, or completing the square.",
        ),
        example="Solve x² - 5x + 6 = 0",
        hint="Quadratic ax^2+bx+c=0: x = (-b +/- sqrt(b^2-4ac))/(2a). Type a, b, c.",
    ),

    "prove_identity": ProblemType(
        id="prove_identity",
        name="Prove That (Verify Identity)",
        description="Verify that LHS = RHS for a mathematical identity",
        topic="Trigonometry / Calculus",
        class_level="12",
        board="both",
        marks=3,
        steps=[
            ProblemStep("verify_identity", "Verify LHS = RHS"),
        ],
        thinking=ProblemThinkingQuestion(
            question="How do you prove that LHS = RHS?",
            options=[
                "Simplify LHS - RHS and show it equals 0",
                "Simplify LHS + RHS and show it equals 0",
                "Show LHS × RHS = 1",
                "Show LHS / RHS = 0",
            ],
            correct="Simplify LHS - RHS and show it equals 0",
            explanation="To prove LHS = RHS, compute LHS - RHS and simplify. "
                        "If the result is 0, the identity is verified.",
        ),
        example="Prove that sin²(x) + cos²(x) = 1",
        hint="Verify LHS = RHS. Type both sides.",
    ),

    # ════════════════════════════════════════════
    # VECTORS & 3D GEOMETRY
    # ════════════════════════════════════════════

    "vector_operations": ProblemType(
        id="vector_operations",
        name="Vector Operations",
        description="Find dot product, cross product, or magnitude of vectors",
        topic="Vectors",
        class_level="12",
        board="both",
        marks=2,
        steps=[
            ProblemStep("dot_product", "Find dot product"),
        ],
        thinking=ProblemThinkingQuestion(
            question="What is the dot product of two vectors?",
            options=[
                "a·b = |a||b|cos(θ) — gives a scalar",
                "a·b = |a||b|sin(θ) — gives a vector",
                "a·b = |a| + |b|",
                "a·b = |a| × |b|",
            ],
            correct="a·b = |a||b|cos(θ) — gives a scalar",
            explanation="Dot product gives a scalar. If a·b = 0, vectors are perpendicular. "
                        "Formula: a·b = a₁b₁ + a₂b₂ + a₃b₃.",
        ),
        example="Find the dot product of [1,2,3] and [4,5,6]",
        hint="Vector operations. Type the vectors.",
    ),

    "area_triangle_vectors": ProblemType(
        id="area_triangle_vectors",
        name="Area of Triangle Using Vectors",
        description="Find the area of a triangle given two side vectors",
        topic="Vectors",
        class_level="12",
        board="both",
        marks=3,
        steps=[
            ProblemStep("cross_product", "Step 1: Find a × b (cross product)"),
            ProblemStep("vector_magnitude", "Step 2: Find |a × b| (magnitude)",
                        auto_fill={"step_0.answer_raw": "vec"}),
            # Step 3: Area = 1/2 * |a × b| — student computes this
        ],
        thinking=ProblemThinkingQuestion(
            question="How do you find the area of a triangle given two side vectors a and b?",
            options=[
                "Area = (1/2)|a × b| (half the magnitude of cross product)",
                "Area = (1/2)|a · b| (half the dot product)",
                "Area = |a| + |b|",
                "Area = |a| × |b|",
            ],
            correct="Area = (1/2)|a × b| (half the magnitude of cross product)",
            explanation="The cross product a × b gives a vector whose magnitude equals "
                        "the area of the parallelogram formed by a and b. "
                        "Triangle area = half of that.",
        ),
        example="Find the area of triangle with sides OA = [1,1,1] and OB = [3,-1,3]",
        hint="Area = 1/2 |a x b|. Type two vectors.",
    ),

    # ════════════════════════════════════════════
    # LINEAR PROGRAMMING
    # ════════════════════════════════════════════

    "lpp_optimize": ProblemType(
        id="lpp_optimize",
        name="Linear Programming — Optimize at Corner Points",
        description="Find maximum/minimum of objective function at corner points",
        topic="Linear Programming",
        class_level="12",
        board="both",
        marks=3,
        steps=[
            ProblemStep("lpp_corner_points", "Evaluate Z at all corner points"),
        ],
        thinking=ProblemThinkingQuestion(
            question="In LPP, where does the optimal value occur?",
            options=[
                "At a corner point of the feasible region",
                "At the center of the feasible region",
                "At the origin",
                "Anywhere in the feasible region",
            ],
            correct="At a corner point of the feasible region",
            explanation="The optimal value (max or min) of the objective function in LPP "
                        "always occurs at a vertex (corner point) of the feasible region. "
                        "Evaluate Z at each corner point and pick the best.",
        ),
        example="Maximize Z = 3x + 2y at corner points (600,0), (1200,0), (800,400), (400,200)",
        hint="Maximize/minimize Z at corner points. Type corner points and objective.",
    ),

    # ════════════════════════════════════════════
    # KINEMATICS / RATE OF CHANGE
    # ════════════════════════════════════════════

    "rate_of_change": ProblemType(
        id="rate_of_change",
        name="Rate of Change / Kinematics",
        description="Find rate of change, velocity, or acceleration using differentiation",
        topic="Application of Derivatives",
        class_level="12",
        board="both",
        marks=4,
        steps=[
            ProblemStep("differentiate", "Step 1: Find rate of change (derivative)"),
            ProblemStep("evaluate_at_point", "Step 2: Evaluate at given time/point",
                        auto_fill={"step_0.answer_raw": "expression"}),
        ],
        thinking=ProblemThinkingQuestion(
            question="What does the derivative of a position function s(t) represent?",
            options=[
                "Velocity (rate of change of position with respect to time)",
                "Acceleration",
                "Total distance traveled",
                "Average speed",
            ],
            correct="Velocity (rate of change of position with respect to time)",
            explanation="If s(t) is position, then ds/dt = v(t) is velocity (instantaneous rate of change). "
                        "The second derivative d²s/dt² = a(t) is acceleration.",
        ),
        example="h(t) = -7t²/14 + 3t - 1/4. Find the time of maximum height and the maximum height.",
        hint="The height function h(t) is usually given as h(t) = v*t - (1/2)*g*t**2. If initial velocity v=20 and g=10, then h(t) = 20*t - 5*t**2. Maximum height occurs when velocity = 0, i.e., dh/dt = 0.",
        setup_help="Height function: h(t) = v₀*t - ½*g*t²\n• v₀ = initial velocity (m/s)\n• g = 10 (or 9.8) m/s²\n• Max height at t = v₀/g\n• Max height = v₀²/(2g)",
    ),

    "max_height": ProblemType(
        id="max_height",
        name="Find Maximum Height / Time",
        description="Find when an object reaches maximum height and the maximum height",
        topic="Application of Derivatives",
        class_level="12",
        board="both",
        marks=6,
        steps=[
            ProblemStep("critical_points", "Step 1: Find when velocity = 0 (critical points)"),
            ProblemStep("check_max_min", "Step 2: Verify it's a maximum",
                        auto_fill={"step_0.inputs.expression": "expression",
                                   "step_0.inputs.var": "var",
                                   "step_0.answer_raw": "point"}),
            ProblemStep("evaluate_at_point", "Step 3: Find maximum height",
                        auto_fill={"step_0.inputs.expression": "expression",
                                   "step_0.inputs.var": "var",
                                   "step_0.answer_raw": "point"}),
        ],
        thinking=ProblemThinkingQuestion(
            question="When does an object reach its maximum height?",
            options=[
                "When velocity = 0 (derivative of height function = 0)",
                "When acceleration = 0",
                "When height = 0",
                "When time = 0",
            ],
            correct="When velocity = 0 (derivative of height function = 0)",
            explanation="Maximum height occurs when the rate of change of height (velocity) is zero. "
                        "Find dh/dt = 0, solve for t, then evaluate h(t) at that time.",
        ),
        example="h(t) = -7t²/14 + 3t - 1/4. Find time of max height and the max height.",
        hint="The height function h(t) = v*t - 5*t**2 (with g=10). Max height occurs when velocity = 0, i.e., dh/dt = 0. Solve for t, then evaluate h(t).",
        setup_help="Height function: h(t) = v₀*t - ½*g*t²\n• v₀ = initial velocity (m/s)\n• g = 10 (or 9.8) m/s²\n• Max height at t = v₀/g\n• Max height = v₀²/(2g)",
    ),

    # ════════════════════════════════════════════
    # CLASS 1-5: BASIC ARITHMETIC & NUMBER SENSE
    # ════════════════════════════════════════════

    "basic_arithmetic": ProblemType(
        id="basic_arithmetic",
        name="Basic Arithmetic Calculation",
        description="Evaluate a basic arithmetic expression",
        topic="Arithmetic",
        class_level="3",
        board="both",
        marks=1,
        steps=[ProblemStep("arithmetic", "Evaluate the expression")],
        thinking=ProblemThinkingQuestion(
            question="What is the order of operations (BODMAS)?",
            options=["Brackets, Orders, Division, Multiplication, Addition, Subtraction",
                     "Addition first, then everything else",
                     "Left to right always",
                     "Multiplication first only"],
            correct="Brackets, Orders, Division, Multiplication, Addition, Subtraction",
            explanation="BODMAS rule ensures consistent evaluation of arithmetic expressions.",
        ),
        example="Evaluate: 12 + 3 × 4 - 6 ÷ 2",
        hint="Type the calculation using +, -, *, / for operations. Use BODMAS: Brackets, Orders, Division, Multiplication, Addition, Subtraction.",
    ),

    "add_fractions": ProblemType(
        id="add_fractions",
        name="Add Two Fractions",
        description="Add two fractions with different denominators",
        topic="Fractions",
        class_level="5",
        board="both",
        marks=2,
        steps=[ProblemStep("fraction_add", "Add the fractions")],
        thinking=ProblemThinkingQuestion(
            question="How do you add fractions with different denominators?",
            options=["Find a common denominator, then add numerators",
                     "Add denominators together",
                     "Just add numerators and denominators separately",
                     "Multiply the fractions first"],
            correct="Find a common denominator, then add numerators",
            explanation="Find LCM of denominators, convert both fractions, then add numerators.",
        ),
        example="Add: 1/4 + 2/3",
        hint="To add fractions: find a common denominator, then add numerators. Type fractions as a/b like 1/2.",
    ),

    "multiply_fractions": ProblemType(
        id="multiply_fractions",
        name="Multiply Two Fractions",
        description="Multiply two fractions",
        topic="Fractions",
        class_level="5",
        board="both",
        marks=1,
        steps=[ProblemStep("fraction_multiply", "Multiply the fractions")],
        thinking=ProblemThinkingQuestion(
            question="How do you multiply fractions?",
            options=["Multiply numerators, multiply denominators",
                     "Add numerators and denominators",
                     "Cross multiply",
                     "Divide numerators"],
            correct="Multiply numerators, multiply denominators",
            explanation="(a/b) × (c/d) = (a×c)/(b×d).",
        ),
        example="Multiply: 2/3 × 4/5",
        hint="To multiply fractions: multiply numerators together, multiply denominators together. Type as a/b.",
    ),

    "divide_fractions": ProblemType(
        id="divide_fractions",
        name="Divide Two Fractions",
        description="Divide two fractions",
        topic="Fractions",
        class_level="5",
        board="both",
        marks=1,
        steps=[ProblemStep("fraction_divide", "Divide the fractions")],
        thinking=ProblemThinkingQuestion(
            question="How do you divide fractions?",
            options=["Multiply by the reciprocal of the second fraction",
                     "Multiply denominators",
                     "Subtract numerators",
                     "Invert the first fraction"],
            correct="Multiply by the reciprocal of the second fraction",
            explanation="(a/b) ÷ (c/d) = (a/b) × (d/c) = (a×d)/(b×c).",
        ),
        example="Divide: 3/4 ÷ 2/5",
        hint="To divide fractions: flip the second fraction and multiply. Type as a/b.",
    ),

    # ════════════════════════════════════════════
    # CLASS 6-8: PERCENTAGE, RATIO, COMMERCIAL MATH
    # ════════════════════════════════════════════

    "find_percentage": ProblemType(
        id="find_percentage",
        name="Find Percentage",
        description="Find what percentage one number is of another",
        topic="Percentage",
        class_level="7",
        board="both",
        marks=2,
        steps=[ProblemStep("percentage", "Find the percentage")],
        thinking=ProblemThinkingQuestion(
            question="How do you find what percentage part is of whole?",
            options=["(part / whole) × 100", "(whole / part) × 100",
                     "part × whole", "part + whole"],
            correct="(part / whole) × 100",
            explanation="Percentage = (part / whole) × 100.",
        ),
        example="What percentage is 25 of 200?",
        hint="Percentage = (part/whole) x 100. Type the part and the whole.",
    ),

    "find_percentage_of": ProblemType(
        id="find_percentage_of",
        name="Find X% of a Number",
        description="Find a percentage of a quantity",
        topic="Percentage",
        class_level="7",
        board="both",
        marks=1,
        steps=[ProblemStep("percentage_of", "Find the percentage")],
        thinking=ProblemThinkingQuestion(
            question="How do you find X% of a number?",
            options=["(X / 100) × number", "X × number", "number / X", "X + number"],
            correct="(X / 100) × number",
            explanation="To find X% of N: (X/100) × N.",
        ),
        example="Find 15% of 200",
        hint="To find X% of a number: (X/100) x number. Type the percentage and the number.",
    ),

    "percentage_change": ProblemType(
        id="percentage_change",
        name="Percentage Increase/Decrease",
        description="Find percentage change between two values",
        topic="Percentage",
        class_level="8",
        board="both",
        marks=2,
        steps=[ProblemStep("percentage_change", "Find the percentage change")],
        thinking=ProblemThinkingQuestion(
            question="How do you calculate percentage change?",
            options=["((new - old) / old) × 100", "(new / old) × 100",
                     "(old / new) × 100", "new - old"],
            correct="((new - old) / old) × 100",
            explanation="Percentage change = ((new - old) / old) × 100.",
        ),
        example="A price increases from ₹100 to ₹125. Find the percentage increase.",
    ),

    "simple_interest_problem": ProblemType(
        id="simple_interest_problem",
        name="Simple Interest",
        description="Calculate simple interest and amount",
        topic="Commercial Math",
        class_level="7",
        board="both",
        marks=3,
        steps=[ProblemStep("simple_interest", "Calculate SI and Amount")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for Simple Interest?",
            options=["SI = (P × R × T) / 100", "SI = P × R + T",
                     "SI = P + R + T", "SI = P × (1 + R/100)^T"],
            correct="SI = (P × R × T) / 100",
            explanation="SI = (P × R × T) / 100, where P=principal, R=rate%, T=time in years.",
        ),
        example="Find SI on ₹1000 at 5% per annum for 2 years.",
        hint="SI = (P x R x T)/100. P=principal, R=rate%, T=years. Type principal, rate, time.",
    ),

    "compound_interest_problem": ProblemType(
        id="compound_interest_problem",
        name="Compound Interest",
        description="Calculate compound interest and amount",
        topic="Commercial Math",
        class_level="8",
        board="both",
        marks=4,
        steps=[ProblemStep("compound_interest", "Calculate CI and Amount")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for Compound Interest?",
            options=["A = P(1 + R/(100n))^(nT), CI = A - P", "CI = P × R × T / 100",
                     "CI = P + R + T", "CI = P × R^T"],
            correct="A = P(1 + R/(100n))^(nT), CI = A - P",
            explanation="Amount A = P(1 + R/(100n))^(nT). CI = A - P.",
        ),
        example="Find CI on ₹1000 at 5% per annum compounded annually for 2 years.",
        hint="A = P(1 + R/100)^T. Type principal, rate, and time.",
    ),

    "profit_loss_problem": ProblemType(
        id="profit_loss_problem",
        name="Profit or Loss",
        description="Calculate profit/loss and percentage",
        topic="Commercial Math",
        class_level="7",
        board="both",
        marks=3,
        steps=[ProblemStep("profit_loss", "Find profit/loss and percentage")],
        thinking=ProblemThinkingQuestion(
            question="When is there a profit?",
            options=["When SP > CP", "When CP > SP",
                     "When SP = CP", "When CP = 0"],
            correct="When SP > CP",
            explanation="Profit = SP - CP (when SP > CP). Loss = CP - SP (when CP > SP).",
        ),
        example="A shopkeeper buys an item for ₹100 and sells it for ₹120. Find profit and profit%.",
        hint="Profit = SP - CP. Loss = CP - SP. Profit% = (Profit/CP)x100. Type cost price and selling price.",
    ),

    "discount_problem": ProblemType(
        id="discount_problem",
        name="Discount and Selling Price",
        description="Find selling price after discount",
        topic="Commercial Math",
        class_level="8",
        board="both",
        marks=2,
        steps=[ProblemStep("discount", "Find discount and SP")],
        thinking=ProblemThinkingQuestion(
            question="How do you calculate the selling price after a discount?",
            options=["SP = MP - (Discount% × MP / 100)", "SP = MP + Discount%",
                     "SP = MP × Discount%", "SP = MP / Discount%"],
            correct="SP = MP - (Discount% × MP / 100)",
            explanation="Discount = (Discount% × MP) / 100. SP = MP - Discount.",
        ),
        example="Find the selling price of an item marked ₹500 with a 10% discount.",
        hint="Discount = MP - SP. Discount% = (Discount/MP)x100. Type marked price and discount %.",
    ),

    "ratio_proportion_problem": ProblemType(
        id="ratio_proportion_problem",
        name="Ratio and Proportion",
        description="Find the fourth term in a proportion",
        topic="Ratio and Proportion",
        class_level="6",
        board="both",
        marks=2,
        steps=[ProblemStep("ratio_proportion", "Find the fourth term")],
        thinking=ProblemThinkingQuestion(
            question="In a proportion a:b = c:d, how do you find d?",
            options=["d = (b × c) / a", "d = (a × c) / b",
                     "d = (a × b) / c", "d = a + b + c"],
            correct="d = (b × c) / a",
            explanation="In a:b = c:d, cross-multiply: a×d = b×c, so d = (b×c)/a.",
        ),
        example="If 3:4 = 9:d, find d.",
        hint="Ratio a:b = c:d means a*d = b*c. To find d: d = (b*c)/a. Type the known values.",
    ),

    "direct_proportion_problem": ProblemType(
        id="direct_proportion_problem",
        name="Direct Proportion",
        description="Find y₂ in a direct proportion",
        topic="Ratio and Proportion",
        class_level="8",
        board="both",
        marks=2,
        steps=[ProblemStep("direct_proportion", "Find y₂")],
        thinking=ProblemThinkingQuestion(
            question="In direct proportion, what happens when one quantity increases?",
            options=["The other increases proportionally", "The other decreases",
                     "The other stays the same", "No relationship"],
            correct="The other increases proportionally",
            explanation="Direct proportion: x₁/y₁ = x₂/y₂.",
        ),
        example="If 3 pens cost ₹15, how much do 5 pens cost?",
        hint="Direct proportion: y = kx. More x means more y. Find k from one pair.",
    ),

    "inverse_proportion_problem": ProblemType(
        id="inverse_proportion_problem",
        name="Inverse Proportion",
        description="Find y₂ in an inverse proportion",
        topic="Ratio and Proportion",
        class_level="8",
        board="both",
        marks=2,
        steps=[ProblemStep("inverse_proportion", "Find y₂")],
        thinking=ProblemThinkingQuestion(
            question="In inverse proportion, what happens when one quantity increases?",
            options=["The other decreases proportionally", "The other increases",
                     "The other stays the same", "No relationship"],
            correct="The other decreases proportionally",
            explanation="Inverse proportion: x₁×y₁ = x₂×y₂.",
        ),
        example="If 4 workers complete a job in 6 days, how long will 8 workers take?",
        hint="Inverse proportion: xy = k. More x means less y. Find k from one pair.",
    ),

    "speed_distance_time_problem": ProblemType(
        id="speed_distance_time_problem",
        name="Speed, Distance, Time",
        description="Find speed, distance, or time given the other two",
        topic="Speed, Distance, Time",
        class_level="7",
        board="both",
        marks=2,
        steps=[ProblemStep("speed_distance_time", "Find the missing quantity")],
        thinking=ProblemThinkingQuestion(
            question="What is the relationship between speed, distance, and time?",
            options=["Speed = Distance / Time", "Speed = Distance × Time",
                     "Speed = Time / Distance", "Speed = Distance + Time"],
            correct="Speed = Distance / Time",
            explanation="Speed = Distance/Time. Distance = Speed×Time. Time = Distance/Speed.",
        ),
        example="A car travels 240 km in 4 hours. Find its speed.",
        hint="Speed = Distance/Time. Type the two known values.",
    ),

    # ════════════════════════════════════════════
    # CLASS 6-8: NUMBER THEORY
    # ════════════════════════════════════════════

    "hcf_lcm_problem": ProblemType(
        id="hcf_lcm_problem",
        name="HCF and LCM",
        description="Find HCF and LCM of two numbers",
        topic="Number Theory",
        class_level="6",
        board="both",
        marks=3,
        steps=[ProblemStep("hcf_lcm", "Find HCF and LCM")],
        thinking=ProblemThinkingQuestion(
            question="What is the relationship between HCF, LCM, and the two numbers?",
            options=["HCF × LCM = a × b", "HCF + LCM = a + b",
                     "HCF = LCM", "HCF / LCM = a / b"],
            correct="HCF × LCM = a × b",
            explanation="For any two numbers: HCF × LCM = product of the two numbers.",
        ),
        example="Find HCF and LCM of 12 and 18.",
        hint="HCF = largest number that divides both. LCM = smallest number both divide into. Type the two numbers.",
    ),

    "prime_factorization_problem": ProblemType(
        id="prime_factorization_problem",
        name="Prime Factorization",
        description="Find prime factors of a number",
        topic="Number Theory",
        class_level="7",
        board="both",
        marks=2,
        steps=[ProblemStep("prime_factorization", "Find prime factors")],
        thinking=ProblemThinkingQuestion(
            question="What is prime factorization?",
            options=["Expressing a number as a product of prime numbers",
                     "Adding prime numbers together",
                     "Finding the largest prime factor",
                     "Checking if a number is prime"],
            correct="Expressing a number as a product of prime numbers",
            explanation="Prime factorization breaks a number into its prime factors.",
        ),
        example="Find the prime factorization of 60.",
        hint="Prime factorization: break a number into prime factors. 60 = 2x2x3x5. Type the number.",
    ),

    "check_prime": ProblemType(
        id="check_prime",
        name="Check if a Number is Prime",
        description="Determine if a number is prime",
        topic="Number Theory",
        class_level="6",
        board="both",
        marks=1,
        steps=[ProblemStep("is_prime", "Check if prime")],
        thinking=ProblemThinkingQuestion(
            question="What is a prime number?",
            options=["A number divisible only by 1 and itself",
                     "A number divisible by 2",
                     "An odd number",
                     "A number greater than 10"],
            correct="A number divisible only by 1 and itself",
            explanation="A prime number has exactly two factors: 1 and itself.",
        ),
        example="Is 17 a prime number?",
        hint="A prime number has only two factors: 1 and itself. Type one number to check.",
    ),

    "exponents_problem": ProblemType(
        id="exponents_problem",
        name="Evaluate Exponents",
        description="Evaluate base raised to a power",
        topic="Exponents and Powers",
        class_level="7",
        board="both",
        marks=1,
        steps=[ProblemStep("exponents", "Evaluate the power")],
        thinking=ProblemThinkingQuestion(
            question="What does 2³ mean?",
            options=["2 × 2 × 2 = 8", "2 × 3 = 6",
                     "2 + 3 = 5", "3² = 9"],
            correct="2 × 2 × 2 = 8",
            explanation="a^n means a multiplied by itself n times.",
        ),
        example="Evaluate 2⁵.",
        hint="Exponents: a^n means a multiplied n times. Type as 2**3 (two stars for power).",
    ),

    "square_root_problem": ProblemType(
        id="square_root_problem",
        name="Find Square Root",
        description="Find the square root of a number",
        topic="Squares and Square Roots",
        class_level="8",
        board="both",
        marks=1,
        steps=[ProblemStep("square_root", "Find the square root")],
        thinking=ProblemThinkingQuestion(
            question="What is the square root of a number?",
            options=["A number that when multiplied by itself gives the original number",
                     "Half of the number",
                     "The number divided by 2",
                     "The number squared"],
            correct="A number that when multiplied by itself gives the original number",
            explanation="√n is the number that gives n when squared.",
        ),
        example="Find √144.",
        hint="Square root: sqrt(n) is the number that gives n when squared. Type as sqrt(25).",
    ),

    "cube_root_problem": ProblemType(
        id="cube_root_problem",
        name="Find Cube Root",
        description="Find the cube root of a number",
        topic="Cubes and Cube Roots",
        class_level="8",
        board="both",
        marks=1,
        steps=[ProblemStep("cube_root", "Find the cube root")],
        thinking=ProblemThinkingQuestion(
            question="What is the cube root of 27?",
            options=["3 (because 3³ = 27)", "9 (because 9 × 3 = 27)",
                     "27", "1/3"],
            correct="3 (because 3³ = 27)",
            explanation="∛n is the number that gives n when cubed.",
        ),
        example="Find ∛27.",
        hint="Cube root: the number that gives n when cubed. Type the number.",
    ),

    # ════════════════════════════════════════════
    # CLASS 6-10: MENSURATION (2D)
    # ════════════════════════════════════════════

    "area_rectangle_problem": ProblemType(
        id="area_rectangle_problem", name="Area and Perimeter of Rectangle",
        description="Find area and perimeter of a rectangle",
        topic="Mensuration", class_level="6", board="both", marks=2,
        steps=[ProblemStep("area_rectangle", "Find area and perimeter")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for the area of a rectangle?",
            options=["length × width", "length + width", "2 × (length + width)", "length²"],
            correct="length × width",
            explanation="Area = length × width. Perimeter = 2(length + width).",
        ),
        example="Find the area and perimeter of a rectangle with length 10 and width 5.",
        hint="Area = length x width. Type length and width.",
    ),

    "area_triangle_problem": ProblemType(
        id="area_triangle_problem", name="Area of Triangle",
        description="Find area of triangle from base and height",
        topic="Mensuration", class_level="7", board="both", marks=2,
        steps=[ProblemStep("area_triangle", "Find the area")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for the area of a triangle?",
            options=["(base × height) / 2", "base × height", "base + height", "base²"],
            correct="(base × height) / 2",
            explanation="Area = ½ × base × height.",
        ),
        example="Find the area of a triangle with base 10 and height 6.",
        hint="Area = 1/2 x base x height. Type base and height.",
    ),

    "area_circle_problem": ProblemType(
        id="area_circle_problem", name="Area and Circumference of Circle",
        description="Find area and circumference of a circle",
        topic="Mensuration", class_level="7", board="both", marks=2,
        steps=[ProblemStep("area_circle", "Find area and circumference")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for the area of a circle?",
            options=["πr²", "2πr", "πr", "πd²"],
            correct="πr²",
            explanation="Area = πr². Circumference = 2πr.",
        ),
        example="Find the area and circumference of a circle with radius 7.",
        hint="Area = pi x r^2. Type the radius. Use pi for the symbol.",
    ),

    "area_trapezium_problem": ProblemType(
        id="area_trapezium_problem", name="Area of Trapezium",
        description="Find area of a trapezium",
        topic="Mensuration", class_level="8", board="both", marks=2,
        steps=[ProblemStep("area_trapezium", "Find the area")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for the area of a trapezium?",
            options=["(a + b)/2 × h", "a × b × h", "(a + b) × h", "a² + b²"],
            correct="(a + b)/2 × h",
            explanation="Area = ½ × (sum of parallel sides) × height.",
        ),
        example="Find the area of a trapezium with parallel sides 8 and 5, and height 4.",
        hint="Area = 1/2 x (a + b) x h. Type both parallel sides and height.",
    ),

    "area_parallelogram_problem": ProblemType(
        id="area_parallelogram_problem", name="Area of Parallelogram",
        description="Find area of a parallelogram",
        topic="Mensuration", class_level="8", board="both", marks=1,
        steps=[ProblemStep("area_parallelogram", "Find the area")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for the area of a parallelogram?",
            options=["base × height", "base + height", "base × height / 2", "base²"],
            correct="base × height",
            explanation="Area = base × height (perpendicular height).",
        ),
        example="Find the area of a parallelogram with base 10 and height 6.",
        hint="Area = base x height. Type base and perpendicular height.",
    ),

    "area_rhombus_problem": ProblemType(
        id="area_rhombus_problem", name="Area of Rhombus",
        description="Find area of a rhombus from its diagonals",
        topic="Mensuration", class_level="8", board="both", marks=2,
        steps=[ProblemStep("area_rhombus", "Find the area")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for the area of a rhombus?",
            options=["(d₁ × d₂) / 2", "d₁ × d₂", "d₁ + d₂", "d₁² + d₂²"],
            correct="(d₁ × d₂) / 2",
            explanation="Area = ½ × d₁ × d₂.",
        ),
        example="Find the area of a rhombus with diagonals 16 and 12.",
        hint="Area = 1/2 x d1 x d2. Type both diagonals.",
    ),

    "arc_length_problem": ProblemType(
        id="arc_length_problem", name="Arc Length",
        description="Find the length of an arc",
        topic="Mensuration", class_level="10", board="both", marks=2,
        steps=[ProblemStep("arc_length", "Find the arc length")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for arc length?",
            options=["(θ/360) × 2πr", "θ × r", "θ × π × r", "(θ/180) × πr"],
            correct="(θ/360) × 2πr",
            explanation="Arc length = (θ/360) × 2πr.",
        ),
        example="Find the arc length of a sector with radius 7 and angle 90°.",
        hint="Arc length = (angle/360) x 2 x pi x r. Type angle and radius.",
    ),

    "sector_area_problem": ProblemType(
        id="sector_area_problem", name="Area of Sector",
        description="Find the area of a sector",
        topic="Mensuration", class_level="10", board="both", marks=2,
        steps=[ProblemStep("sector_area", "Find the sector area")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for the area of a sector?",
            options=["(θ/360) × πr²", "θ × r²", "(θ/180) × πr", "πr²"],
            correct="(θ/360) × πr²",
            explanation="Sector area = (θ/360) × πr².",
        ),
        example="Find the area of a sector with radius 7 and angle 90°.",
        hint="Sector area = (angle/360) x pi x r^2. Type angle and radius.",
    ),

    "pythagoras_hypotenuse_problem": ProblemType(
        id="pythagoras_hypotenuse_problem", name="Pythagoras Theorem — Hypotenuse",
        description="Find the hypotenuse of a right triangle",
        topic="Geometry", class_level="7", board="both", marks=2,
        steps=[ProblemStep("pythagoras_hypotenuse", "Find the hypotenuse")],
        thinking=ProblemThinkingQuestion(
            question="What is the Pythagorean theorem?",
            options=["c² = a² + b²", "c = a + b", "c² = a² - b²", "c = a × b"],
            correct="c² = a² + b²",
            explanation="In a right triangle: hypotenuse² = side₁² + side₂².",
        ),
        example="Find the hypotenuse of a right triangle with sides 3 and 4.",
        hint="Hypotenuse = sqrt(a^2 + b^2). Type the two legs.",
    ),

    "pythagoras_side_problem": ProblemType(
        id="pythagoras_side_problem", name="Pythagoras Theorem — Missing Side",
        description="Find a missing side using Pythagoras",
        topic="Geometry", class_level="7", board="both", marks=2,
        steps=[ProblemStep("pythagoras_side", "Find the missing side")],
        thinking=ProblemThinkingQuestion(
            question="How do you find a missing side using Pythagoras?",
            options=["a = √(c² - b²)", "a = c + b", "a = c × b", "a = c - b"],
            correct="a = √(c² - b²)",
            explanation="If c is the hypotenuse: missing side = √(c² - known side²).",
        ),
        example="Find the missing side if hypotenuse is 5 and one side is 3.",
        hint="Missing side = sqrt(hyp^2 - side^2). Type hypotenuse and one side.",
    ),

    # ════════════════════════════════════════════
    # CLASS 8-10: MENSURATION (3D)
    # ════════════════════════════════════════════

    "volume_cube_problem": ProblemType(
        id="volume_cube_problem", name="Volume of Cube",
        description="Find volume and surface area of a cube",
        topic="Mensuration", class_level="8", board="both", marks=2,
        steps=[ProblemStep("volume_cube", "Find volume and SA")],
        thinking=ProblemThinkingQuestion(
            question="What is the volume of a cube with side s?",
            options=["s³", "s²", "6s²", "s"],
            correct="s³",
            explanation="Volume = s³. Surface Area = 6s².",
        ),
        example="Find the volume and surface area of a cube with side 5.",
        hint="Volume = side^3. Type the side length.",
    ),

    "volume_cuboid_problem": ProblemType(
        id="volume_cuboid_problem", name="Volume of Cuboid",
        description="Find volume and surface area of a cuboid",
        topic="Mensuration", class_level="8", board="both", marks=2,
        steps=[ProblemStep("volume_cuboid", "Find volume and SA")],
        thinking=ProblemThinkingQuestion(
            question="What is the volume of a cuboid?",
            options=["l × w × h", "l + w + h", "2(lw + wh + lh)", "l² + w² + h²"],
            correct="l × w × h",
            explanation="Volume = l × w × h. Surface Area = 2(lw + wh + lh).",
        ),
        example="Find volume and SA of a cuboid 10×5×3.",
        hint="Volume = length x width x height. Type all three.",
    ),

    "volume_cylinder_problem": ProblemType(
        id="volume_cylinder_problem", name="Volume of Cylinder",
        description="Find volume and surface area of a cylinder",
        topic="Mensuration", class_level="9", board="both", marks=2,
        steps=[ProblemStep("volume_cylinder", "Find volume and SA")],
        thinking=ProblemThinkingQuestion(
            question="What is the volume of a cylinder?",
            options=["πr²h", "2πrh", "πr²", "πrh"],
            correct="πr²h",
            explanation="Volume = πr²h. Surface Area = 2πr(r + h).",
        ),
        example="Find volume and SA of a cylinder with radius 7 and height 10.",
        hint="Volume = pi x r^2 x h. Type radius and height.",
    ),

    "volume_cone_problem": ProblemType(
        id="volume_cone_problem", name="Volume of Cone",
        description="Find volume of a cone",
        topic="Mensuration", class_level="9", board="both", marks=3,
        steps=[ProblemStep("volume_cone", "Find volume and SA")],
        thinking=ProblemThinkingQuestion(
            question="What is the volume of a cone?",
            options=["πr²h/3", "πr²h", "2πr", "πrh"],
            correct="πr²h/3",
            explanation="Volume = ⅓πr²h. Slant height l = √(r² + h²).",
        ),
        example="Find the volume of a cone with radius 7 and height 24.",
        hint="Volume = 1/3 x pi x r^2 x h. Type radius and height.",
    ),

    "volume_sphere_problem": ProblemType(
        id="volume_sphere_problem", name="Volume of Sphere",
        description="Find volume and surface area of a sphere",
        topic="Mensuration", class_level="9", board="both", marks=2,
        steps=[ProblemStep("volume_sphere", "Find volume and SA")],
        thinking=ProblemThinkingQuestion(
            question="What is the volume of a sphere?",
            options=["4πr³/3", "4πr²", "πr³", "2πr"],
            correct="4πr³/3",
            explanation="Volume = (4/3)πr³. Surface Area = 4πr².",
        ),
        example="Find the volume and SA of a sphere with radius 7.",
        hint="Volume = 4/3 x pi x r^3. Type the radius.",
    ),

    "volume_hemisphere_problem": ProblemType(
        id="volume_hemisphere_problem", name="Volume of Hemisphere",
        description="Find volume and surface area of a hemisphere",
        topic="Mensuration", class_level="10", board="both", marks=2,
        steps=[ProblemStep("volume_hemisphere", "Find volume and SA")],
        thinking=ProblemThinkingQuestion(
            question="What is the volume of a hemisphere?",
            options=["2πr³/3", "4πr³/3", "πr³", "3πr²"],
            correct="2πr³/3",
            explanation="Volume = (2/3)πr³. Surface Area = 3πr².",
        ),
        example="Find the volume and SA of a hemisphere with radius 7.",
        hint="Volume = 2/3 x pi x r^3. Type the radius.",
    ),

    "volume_frustum_problem": ProblemType(
        id="volume_frustum_problem", name="Volume of Frustum of Cone",
        description="Find volume of a frustum",
        topic="Mensuration", class_level="10", board="both", marks=4,
        steps=[ProblemStep("volume_frustum", "Find the volume")],
        thinking=ProblemThinkingQuestion(
            question="What is the volume of a frustum of a cone?",
            options=["πh/3 × (r₁² + r₁r₂ + r₂²)", "πr²h", "πh(r₁ + r₂)", "πr₁²r₂²h"],
            correct="πh/3 × (r₁² + r₁r₂ + r₂²)",
            explanation="V = (πh/3)(r₁² + r₁r₂ + r₂²).",
        ),
        example="Find the volume of a frustum with radii 4 and 8, and height 15.",
        hint="Volume = 1/3 x pi x h x (R^2 + r^2 + Rr). Type both radii and height.",
    ),

    # ════════════════════════════════════════════
    # CLASS 7-10: STATISTICS
    # ════════════════════════════════════════════

    "mean_problem": ProblemType(
        id="mean_problem", name="Find Mean",
        description="Calculate the mean of a data set",
        topic="Statistics", class_level="7", board="both", marks=2,
        steps=[ProblemStep("mean", "Find the mean")],
        thinking=ProblemThinkingQuestion(
            question="How do you find the mean?",
            options=["Sum of values / number of values", "Middle value",
                     "Most frequent value", "Largest value"],
            correct="Sum of values / number of values",
            explanation="Mean = (sum of all values) / (count of values).",
        ),
        example="Find the mean of: 10, 20, 30, 40, 50.",
        hint="Mean = sum of values / count. Type values separated by commas.",
    ),

    "median_problem": ProblemType(
        id="median_problem", name="Find Median",
        description="Calculate the median of a data set",
        topic="Statistics", class_level="7", board="both", marks=2,
        steps=[ProblemStep("median", "Find the median")],
        thinking=ProblemThinkingQuestion(
            question="What is the median?",
            options=["The middle value when sorted", "The average",
                     "The most frequent value", "The range"],
            correct="The middle value when sorted",
            explanation="Median = middle value (odd) or average of two middle values (even).",
        ),
        example="Find the median of: 10, 20, 30, 40, 50.",
        hint="Median = middle value when sorted. Type values separated by commas.",
    ),

    "mode_problem": ProblemType(
        id="mode_problem", name="Find Mode",
        description="Find the most frequent value",
        topic="Statistics", class_level="7", board="both", marks=1,
        steps=[ProblemStep("mode", "Find the mode")],
        thinking=ProblemThinkingQuestion(
            question="What is the mode?",
            options=["The most frequently occurring value", "The average",
                     "The middle value", "The range"],
            correct="The most frequently occurring value",
            explanation="Mode = the value that appears most often.",
        ),
        example="Find the mode of: 10, 20, 20, 30, 40.",
        hint="Mode = most frequent value. Type values separated by commas.",
    ),

    "standard_deviation_problem": ProblemType(
        id="standard_deviation_problem", name="Standard Deviation",
        description="Find the standard deviation of data",
        topic="Statistics", class_level="10", board="both", marks=3,
        steps=[ProblemStep("standard_deviation", "Find the standard deviation")],
        thinking=ProblemThinkingQuestion(
            question="What does standard deviation measure?",
            options=["How spread out the data is from the mean", "The average value",
                     "The middle value", "The range"],
            correct="How spread out the data is from the mean",
            explanation="SD = √(variance). Variance = average of squared deviations from mean.",
        ),
        example="Find the standard deviation of: 2, 4, 6, 8, 10.",
        hint="Std dev = sqrt(variance). Type values separated by commas.",
    ),

    "weighted_mean_problem": ProblemType(
        id="weighted_mean_problem", name="Weighted Mean",
        description="Find the weighted mean of values",
        topic="Statistics", class_level="10", board="both", marks=3,
        steps=[ProblemStep("weighted_mean", "Find the weighted mean")],
        thinking=ProblemThinkingQuestion(
            question="How do you calculate weighted mean?",
            options=["Σ(v × w) / Σw", "Σv / n", "Σw / n", "v × w"],
            correct="Σ(v × w) / Σw",
            explanation="Weighted mean = sum of (value × weight) / sum of weights.",
        ),
        example="Find the weighted mean of values 10, 20, 30 with weights 2, 3, 5.",
        hint="Weighted mean = sum(w*x) / sum(w). Type values and weights.",
    ),

    "regression_line_problem": ProblemType(
        id="regression_line_problem", name="Regression Line",
        description="Find the line of best fit",
        topic="Statistics", class_level="12", board="both", marks=4,
        steps=[ProblemStep("regression_line", "Find the regression line")],
        thinking=ProblemThinkingQuestion(
            question="What does a regression line do?",
            options=["Fits the best straight line through data points", "Connects all points",
                     "Finds the mean", "Finds the median"],
            correct="Fits the best straight line through data points",
            explanation="Regression line y = a + bx minimizes the sum of squared errors.",
        ),
        example="Find the regression line for x=[1,2,3,4,5], y=[2,4,5,4,5].",
        hint="Regression: y = a + bx. Type x and y values.",
    ),

    "correlation_problem": ProblemType(
        id="correlation_problem", name="Correlation Coefficient",
        description="Find the Pearson correlation coefficient",
        topic="Statistics", class_level="12", board="both", marks=3,
        steps=[ProblemStep("correlation_coefficient", "Find r")],
        thinking=ProblemThinkingQuestion(
            question="What does the correlation coefficient measure?",
            options=["Strength and direction of linear relationship", "The mean",
                     "The variance", "The slope"],
            correct="Strength and direction of linear relationship",
            explanation="r ranges from -1 to +1. 0 = no correlation.",
        ),
        example="Find r for x=[1,2,3,4,5], y=[2,4,5,4,5].",
        hint="Correlation r: -1 to 1. Type x and y values.",
    ),

    # ════════════════════════════════════════════
    # CLASS 9-10: PROBABILITY
    # ════════════════════════════════════════════

    "basic_probability_problem": ProblemType(
        id="basic_probability_problem", name="Basic Probability",
        description="Find the probability of an event",
        topic="Probability", class_level="9", board="both", marks=2,
        steps=[ProblemStep("probability", "Find the probability")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for probability?",
            options=["favorable / total", "total / favorable",
                     "favorable × total", "favorable + total"],
            correct="favorable / total",
            explanation="P(event) = favorable outcomes / total outcomes.",
        ),
        example="A die is rolled. Find the probability of getting an even number.",
        hint="Count the favorable outcomes and total outcomes. For a die: total = 6. Even numbers = {2,4,6} so favorable = 3. For two coins: total = 4 (HH, HT, TH, TT). For a deck of cards: total = 52.",
        setup_help="P(event) = favorable outcomes / total outcomes\n• Die: total=6, even={2,4,6}→3, odd={1,3,5}→3\n• Two coins: total=4 (HH,HT,TH,TT)\n• Deck of cards: total=52, hearts=13, face cards=12\n• Bag of balls: total = red + blue + ...",
    ),

    "conditional_probability_problem": ProblemType(
        id="conditional_probability_problem", name="Conditional Probability",
        description="Find P(A|B) given P(A), P(B), P(A∩B)",
        topic="Probability", class_level="12", board="both", marks=3,
        steps=[ProblemStep("conditional_probability", "Find P(A|B)")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for conditional probability P(A|B)?",
            options=["P(A∩B) / P(B)", "P(A) / P(B)",
                     "P(A) × P(B)", "P(A) + P(B)"],
            correct="P(A∩B) / P(B)",
            explanation="P(A|B) = P(A∩B) / P(B).",
        ),
        example="Given P(A)=0.5, P(B)=0.3, P(A∩B)=0.2, find P(A|B).",
        hint="P(A|B) = P(A and B) / P(B). Type P(A and B) and P(B).",
    ),

    "binomial_probability_problem": ProblemType(
        id="binomial_probability_problem", name="Binomial Probability",
        description="Find P(X=r) in a binomial distribution",
        topic="Probability", class_level="12", board="both", marks=4,
        steps=[ProblemStep("binomial_probability", "Find P(X=r)")],
        thinking=ProblemThinkingQuestion(
            question="What is the binomial probability formula?",
            options=["C(n,r) × p^r × (1-p)^(n-r)", "n × p × r",
                     "p^r", "n! / r!"],
            correct="C(n,r) × p^r × (1-p)^(n-r)",
            explanation="P(X=r) = C(n,r) × p^r × (1-p)^(n-r).",
        ),
        example="A coin is tossed 10 times. Find P(exactly 3 heads) with p=0.5.",
        hint="P(X=r) = C(n,r) x p^r x (1-p)^(n-r). Type n, r, and p.",
    ),

    # ════════════════════════════════════════════
    # CLASS 9-10: POLYNOMIALS & ALGEBRA
    # ════════════════════════════════════════════

    "polynomial_zeros_problem": ProblemType(
        id="polynomial_zeros_problem", name="Find Zeros of Polynomial",
        description="Find the roots of a polynomial",
        topic="Polynomials", class_level="10", board="both", marks=3,
        steps=[ProblemStep("polynomial_zeros", "Find the zeros")],
        thinking=ProblemThinkingQuestion(
            question="What are the zeros of a polynomial?",
            options=["Values of x where f(x) = 0", "Values of x where f(x) = 1",
                     "The coefficients", "The degree"],
            correct="Values of x where f(x) = 0",
            explanation="Zeros are values of x that make the polynomial equal to zero.",
        ),
        example="Find the zeros of x² - 5x + 6.",
        hint="Zeros = where polynomial = 0. Type using ** for powers: x**2 - 5*x + 6.",
    ),

    "factor_polynomial_problem": ProblemType(
        id="factor_polynomial_problem", name="Factor a Polynomial",
        description="Factor a polynomial expression",
        topic="Polynomials", class_level="9", board="both", marks=2,
        steps=[ProblemStep("factor_polynomial", "Factor the polynomial")],
        thinking=ProblemThinkingQuestion(
            question="What does factoring a polynomial mean?",
            options=["Writing it as a product of simpler expressions",
                     "Finding its derivative", "Finding its roots", "Expanding it"],
            correct="Writing it as a product of simpler expressions",
            explanation="Factoring rewrites a polynomial as a product.",
        ),
        example="Factor: x² - 5x + 6.",
        hint="Factor: write as product. Type the polynomial using ** for powers.",
    ),

    "expand_expression_problem": ProblemType(
        id="expand_expression_problem", name="Expand an Expression",
        description="Expand a factored expression",
        topic="Algebra", class_level="9", board="both", marks=1,
        steps=[ProblemStep("expand_expression", "Expand the expression")],
        thinking=ProblemThinkingQuestion(
            question="What does expanding (x+2)(x+3) give?",
            options=["x² + 5x + 6", "x² + 6", "2x + 5", "x² + 2x + 3"],
            correct="x² + 5x + 6",
            explanation="Expanding uses the distributive property.",
        ),
        example="Expand: (x + 2)(x + 3).",
        hint="Expand: multiply out brackets. (x+2)(x+3) = x^2+5x+6. Type the expression.",
    ),

    "polynomial_division_problem": ProblemType(
        id="polynomial_division_problem", name="Polynomial Division",
        description="Divide one polynomial by another",
        topic="Polynomials", class_level="10", board="both", marks=3,
        steps=[ProblemStep("polynomial_division", "Find quotient and remainder")],
        thinking=ProblemThinkingQuestion(
            question="What is polynomial long division?",
            options=["Dividing one polynomial by another to get quotient and remainder",
                     "Multiplying two polynomials", "Finding the GCD", "Factoring"],
            correct="Dividing one polynomial by another to get quotient and remainder",
            explanation="Polynomial division gives Q(x) and R(x) such that "
                       "Dividend = Q(x) × Divisor + R(x).",
        ),
        example="Divide x³ - 2x² + 3x - 4 by x - 1.",
        hint="Divide one polynomial by another. Type dividend and divisor.",
    ),

    "solve_equation_problem": ProblemType(
        id="solve_equation_problem", name="Solve Linear/Quadratic Equation",
        description="Solve an equation for the variable",
        topic="Linear Equations", class_level="10", board="both", marks=2,
        steps=[ProblemStep("solve_equation", "Solve the equation")],
        thinking=ProblemThinkingQuestion(
            question="What does it mean to solve an equation?",
            options=["Find the value(s) of the variable that make it true",
                     "Find the derivative", "Expand it", "Factor it"],
            correct="Find the value(s) of the variable that make it true",
            explanation="Solving means finding x such that the equation holds.",
        ),
        example="Solve: 2x + 5 = 11.",
        hint="Find x where expression = rhs. Type left side and right side value.",
    ),

    "logarithm_problem": ProblemType(
        id="logarithm_problem", name="Evaluate Logarithm",
        description="Evaluate a logarithmic expression",
        topic="Logarithms", class_level="11", board="both", marks=2,
        steps=[ProblemStep("logarithm", "Evaluate the logarithm")],
        thinking=ProblemThinkingQuestion(
            question="What does log_b(x) mean?",
            options=["The power to which b must be raised to get x",
                     "x divided by b", "b divided by x", "b × x"],
            correct="The power to which b must be raised to get x",
            explanation="log_b(x) = y means b^y = x.",
        ),
        example="Evaluate log₁₀(100).",
        hint="Logarithm: log_b(x) asks 'b to what power gives x?' Type as log(x) or log(x, 10).",
    ),

    "function_composition_problem": ProblemType(
        id="function_composition_problem", name="Composite Function f(g(x))",
        description="Find the composite function",
        topic="Functions", class_level="11", board="both", marks=2,
        steps=[ProblemStep("function_composition", "Find f(g(x))")],
        thinking=ProblemThinkingQuestion(
            question="What is f(g(x))?",
            options=["Substitute g(x) into f(x)", "Add f(x) and g(x)",
                     "Multiply f(x) and g(x)", "Divide f(x) by g(x)"],
            correct="Substitute g(x) into f(x)",
            explanation="f(g(x)) means replace every x in f(x) with g(x).",
        ),
        example="If f(x) = x² + 1 and g(x) = 2x + 3, find f(g(x)).",
        hint="f(g(x)): substitute g(x) into f. Type f(x) and g(x).",
    ),

    # ════════════════════════════════════════════
    # CLASS 10-11: SEQUENCES & SERIES
    # ════════════════════════════════════════════

    "ap_nth_term_problem": ProblemType(
        id="ap_nth_term_problem", name="AP — nth Term",
        description="Find the nth term of an Arithmetic Progression",
        topic="Sequences and Series", class_level="10", board="both", marks=2,
        steps=[ProblemStep("ap_nth_term", "Find the nth term")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for the nth term of an AP?",
            options=["a_n = a + (n-1)d", "a_n = a × d^(n-1)",
                     "a_n = a + n×d", "a_n = a × n + d"],
            correct="a_n = a + (n-1)d",
            explanation="AP nth term: a_n = a + (n-1)d.",
        ),
        example="Find the 10th term of the AP: 2, 5, 8, ...",
        hint="a_n = a + (n-1)d. Type first term, common difference, and n.",
    ),

    "ap_sum_problem": ProblemType(
        id="ap_sum_problem", name="AP — Sum of n Terms",
        description="Find the sum of first n terms of an AP",
        topic="Sequences and Series", class_level="10", board="both", marks=3,
        steps=[ProblemStep("ap_sum", "Find the sum")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for the sum of n terms of an AP?",
            options=["S_n = n/2 × [2a + (n-1)d]", "S_n = a × n × d",
                     "S_n = a + d", "S_n = n × a"],
            correct="S_n = n/2 × [2a + (n-1)d]",
            explanation="AP sum: S_n = n/2 × [2a + (n-1)d].",
        ),
        example="Find the sum of the first 10 terms of the AP: 2, 5, 8, ...",
        hint="S_n = n/2 x (2a + (n-1)d). Type a, d, and n.",
    ),

    "gp_nth_term_problem": ProblemType(
        id="gp_nth_term_problem", name="GP — nth Term",
        description="Find the nth term of a Geometric Progression",
        topic="Sequences and Series", class_level="11", board="both", marks=2,
        steps=[ProblemStep("gp_nth_term", "Find the nth term")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for the nth term of a GP?",
            options=["a_n = a × r^(n-1)", "a_n = a + (n-1)r",
                     "a_n = a × n × r", "a_n = a^r"],
            correct="a_n = a × r^(n-1)",
            explanation="GP nth term: a_n = a × r^(n-1).",
        ),
        example="Find the 5th term of the GP: 2, 6, 18, ...",
        hint="a_n = a x r^(n-1). Type first term, ratio, and n.",
    ),

    "gp_sum_problem": ProblemType(
        id="gp_sum_problem", name="GP — Sum of n Terms",
        description="Find the sum of first n terms of a GP",
        topic="Sequences and Series", class_level="11", board="both", marks=3,
        steps=[ProblemStep("gp_sum", "Find the sum")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for the sum of n terms of a GP (r ≠ 1)?",
            options=["S_n = a(r^n - 1) / (r - 1)", "S_n = a × n × r",
                     "S_n = a + r", "S_n = n/2 × (a + r)"],
            correct="S_n = a(r^n - 1) / (r - 1)",
            explanation="GP sum: S_n = a(r^n - 1)/(r-1) for r≠1.",
        ),
        example="Find the sum of the first 5 terms of the GP: 2, 6, 18, ...",
        hint="S_n = a(r^n - 1)/(r-1). Type a, r, and n.",
    ),

    "gp_infinite_sum_problem": ProblemType(
        id="gp_infinite_sum_problem", name="GP — Infinite Sum",
        description="Find the sum of an infinite GP (|r| < 1)",
        topic="Sequences and Series", class_level="11", board="both", marks=3,
        steps=[ProblemStep("gp_infinite_sum", "Find the infinite sum")],
        thinking=ProblemThinkingQuestion(
            question="When does an infinite GP converge, and what is its sum?",
            options=["Converges when |r| < 1, S = a/(1-r)",
                     "Converges when |r| > 1, S = a/(1+r)",
                     "Always converges, S = a×r", "Never converges"],
            correct="Converges when |r| < 1, S = a/(1-r)",
            explanation="Infinite GP converges only when |r| < 1. Sum = a/(1-r).",
        ),
        example="Find the sum of the infinite GP: 4 + 2 + 1 + 0.5 + ...",
        hint="S = a/(1-r) when |r|<1. Type a and r.",
    ),

    # ════════════════════════════════════════════
    # CLASS 9-11: COORDINATE GEOMETRY
    # ════════════════════════════════════════════

    "distance_formula_problem": ProblemType(
        id="distance_formula_problem", name="Distance Between Two Points",
        description="Find the distance between two points",
        topic="Coordinate Geometry", class_level="10", board="both", marks=2,
        steps=[ProblemStep("distance_formula", "Find the distance")],
        thinking=ProblemThinkingQuestion(
            question="What is the distance formula?",
            options=["d = √[(x₂-x₁)² + (y₂-y₁)²]", "d = (x₂-x₁) + (y₂-y₁)",
                     "d = (x₂+x₁) × (y₂+y₁)", "d = √[(x₂+x₁)² + (y₂+y₁)²]"],
            correct="d = √[(x₂-x₁)² + (y₂-y₁)²]",
            explanation="Distance = √[(x₂-x₁)² + (y₂-y₁)²].",
        ),
        example="Find the distance between (3, 4) and (0, 0).",
        hint="Distance = sqrt((x2-x1)^2 + (y2-y1)^2). Type both points.",
    ),

    "section_formula_problem": ProblemType(
        id="section_formula_problem", name="Section Formula",
        description="Find the point dividing a line segment in ratio m:n",
        topic="Coordinate Geometry", class_level="10", board="both", marks=3,
        steps=[ProblemStep("section_formula", "Find the dividing point")],
        thinking=ProblemThinkingQuestion(
            question="What does the section formula find?",
            options=["The point that divides a line segment in a given ratio",
                     "The midpoint", "The length", "The slope"],
            correct="The point that divides a line segment in a given ratio",
            explanation="Section formula: P = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)).",
        ),
        example="Find the point that divides the line joining (2,3) and (8,9) in ratio 1:2.",
        hint="P = ((mx2+nx1)/(m+n), (my2+ny1)/(m+n)). Type both points and ratio m:n.",
    ),

    "midpoint_problem": ProblemType(
        id="midpoint_problem", name="Midpoint of Line Segment",
        description="Find the midpoint of a line segment",
        topic="Coordinate Geometry", class_level="10", board="both", marks=1,
        steps=[ProblemStep("midpoint", "Find the midpoint")],
        thinking=ProblemThinkingQuestion(
            question="How do you find the midpoint of (x₁,y₁) and (x₂,y₂)?",
            options=["((x₁+x₂)/2, (y₁+y₂)/2)", "(x₁+x₂, y₁+y₂)",
                     "(x₂-x₁, y₂-y₁)", "(x₁×x₂, y₁×y₂)"],
            correct="((x₁+x₂)/2, (y₁+y₂)/2)",
            explanation="Midpoint = average of coordinates.",
        ),
        example="Find the midpoint of (2, 3) and (8, 9).",
        hint="Midpoint = ((x1+x2)/2, (y1+y2)/2). Type both points.",
    ),

    "slope_problem": ProblemType(
        id="slope_problem", name="Slope of a Line",
        description="Find the slope of a line through two points",
        topic="Coordinate Geometry", class_level="10", board="both", marks=1,
        steps=[ProblemStep("slope", "Find the slope")],
        thinking=ProblemThinkingQuestion(
            question="What is the formula for the slope of a line through two points?",
            options=["m = (y₂ - y₁) / (x₂ - x₁)", "m = (x₂ - x₁) / (y₂ - y₁)",
                     "m = (y₂ + y₁) / (x₂ + x₁)", "m = y₂ × y₁ / (x₂ × x₁)"],
            correct="m = (y₂ - y₁) / (x₂ - x₁)",
            explanation="Slope = rise/run = (y₂-y₁)/(x₂-x₁).",
        ),
        example="Find the slope of the line through (1, 2) and (3, 8).",
        hint="Slope = (y2-y1)/(x2-x1). Type both points.",
    ),

    "line_equation_problem": ProblemType(
        id="line_equation_problem", name="Equation of a Line",
        description="Find the equation of a line through two points",
        topic="Coordinate Geometry", class_level="10", board="both", marks=2,
        steps=[ProblemStep("line_equation", "Find the equation")],
        thinking=ProblemThinkingQuestion(
            question="What is the two-point form of a line?",
            options=["(y - y₁)(x₂ - x₁) = (y₂ - y₁)(x - x₁)", "y = mx + c",
                     "y - y₁ = m(x - x₁)", "ax + by + c = 0"],
            correct="(y - y₁)(x₂ - x₁) = (y₂ - y₁)(x - x₁)",
            explanation="Two-point form of a line.",
        ),
        example="Find the equation of the line through (1, 2) and (3, 8).",
        hint="Line: y - y1 = m(x - x1). Type a point and slope.",
    ),

    "circle_equation_problem": ProblemType(
        id="circle_equation_problem", name="Equation of Circle",
        description="Find the equation of a circle from center and radius",
        topic="Conic Sections", class_level="11", board="both", marks=2,
        steps=[ProblemStep("circle_equation", "Find the equation")],
        thinking=ProblemThinkingQuestion(
            question="What is the equation of a circle with center (h,k) and radius r?",
            options=["(x-h)² + (y-k)² = r²", "x² + y² = r²",
                     "y = mx + c", "x/a + y/b = 1"],
            correct="(x-h)² + (y-k)² = r²",
            explanation="Circle: (x-h)² + (y-k)² = r².",
        ),
        example="Find the equation of a circle with center (3, -2) and radius 5.",
        hint="Circle: (x-h)^2 + (y-k)^2 = r^2. Type center and radius.",
    ),

    "parabola_vertex_problem": ProblemType(
        id="parabola_vertex_problem", name="Vertex of Parabola",
        description="Find the vertex of y = ax² + bx + c",
        topic="Conic Sections", class_level="11", board="both", marks=2,
        steps=[ProblemStep("parabola_vertex", "Find the vertex")],
        thinking=ProblemThinkingQuestion(
            question="How do you find the vertex of y = ax² + bx + c?",
            options=["x = -b/(2a), then substitute", "x = b/(2a)",
                     "x = -c/b", "x = 0"],
            correct="x = -b/(2a), then substitute",
            explanation="Vertex x = -b/(2a). Then find y by substituting.",
        ),
        example="Find the vertex of y = x² - 4x + 3.",
        hint="Vertex at x = -b/(2a). Type a, b, c.",
    ),

    # ════════════════════════════════════════════
    # CLASS 9-12: TRIGONOMETRY
    # ════════════════════════════════════════════

    "trig_value_problem": ProblemType(
        id="trig_value_problem", name="Evaluate Trigonometric Expression",
        description="Evaluate a trigonometric expression",
        topic="Trigonometry", class_level="10", board="both", marks=2,
        steps=[ProblemStep("trig_value", "Evaluate the expression")],
        thinking=ProblemThinkingQuestion(
            question="What is sin(30°)?",
            options=["1/2", "1", "√3/2", "0"],
            correct="1/2",
            explanation="Common values: sin(30°)=1/2, sin(45°)=1/√2, sin(60°)=√3/2, sin(90°)=1.",
        ),
        example="Evaluate: sin(30°) + cos(60°).",
        hint="Type trig function and angle. Use pi/180 for degrees: sin(30*pi/180).",
    ),

    "heights_distances_problem": ProblemType(
        id="heights_distances_problem", name="Heights and Distances",
        description="Find height using angle of elevation",
        topic="Trigonometry", class_level="10", board="both", marks=3,
        steps=[ProblemStep("heights_distances", "Find the height")],
        thinking=ProblemThinkingQuestion(
            question="How do you find the height of a tower using angle of elevation?",
            options=["height = distance × tan(angle)", "height = distance × sin(angle)",
                     "height = distance / tan(angle)", "height = distance + angle"],
            correct="height = distance × tan(angle)",
            explanation="tan(θ) = height/distance, so height = distance × tan(θ).",
        ),
        example="The angle of elevation of a tower from 20m away is 45°. Find the tower's height.",
        hint="Height = distance x tan(angle). Type distance and angle. Use pi/180 for degrees.",
    ),

    "inverse_trig_problem": ProblemType(
        id="inverse_trig_problem", name="Inverse Trigonometric Value",
        description="Evaluate an inverse trig expression",
        topic="Trigonometry", class_level="12", board="both", marks=2,
        steps=[ProblemStep("inverse_trig_value", "Evaluate the expression")],
        thinking=ProblemThinkingQuestion(
            question="What does sin⁻¹(1/2) equal?",
            options=["π/6 (30°)", "π/4 (45°)", "π/3 (60°)", "π/2 (90°)"],
            correct="π/6 (30°)",
            explanation="sin⁻¹(1/2) = π/6 because sin(π/6) = 1/2.",
        ),
        example="Evaluate: sin⁻¹(1/2).",
        hint="Inverse trig: sin^-1(x) = angle. Type the value.",
    ),

    # ════════════════════════════════════════════
    # CLASS 11: PERMUTATIONS, COMBINATIONS, SETS, COMPLEX
    # ════════════════════════════════════════════

    "permutation_problem": ProblemType(
        id="permutation_problem", name="Permutation (nPr)",
        description="Find the number of arrangements",
        topic="Permutations and Combinations", class_level="11", board="both", marks=2,
        steps=[ProblemStep("permutation", "Find nPr")],
        thinking=ProblemThinkingQuestion(
            question="What does nPr represent?",
            options=["Number of ways to arrange r items from n (order matters)",
                     "Number of ways to choose r from n (order doesn't matter)",
                     "n × r", "n + r"],
            correct="Number of ways to arrange r items from n (order matters)",
            explanation="nPr = n!/(n-r)!. Used when order matters.",
        ),
        example="Find 5P3.",
        hint="P(n,r) = n!/(n-r)!. Order matters. Type n and r.",
    ),

    "combination_problem": ProblemType(
        id="combination_problem", name="Combination (nCr)",
        description="Find the number of selections",
        topic="Permutations and Combinations", class_level="11", board="both", marks=2,
        steps=[ProblemStep("combination", "Find nCr")],
        thinking=ProblemThinkingQuestion(
            question="What does nCr represent?",
            options=["Number of ways to choose r from n (order doesn't matter)",
                     "Number of arrangements", "n × r", "n! / r"],
            correct="Number of ways to choose r from n (order doesn't matter)",
            explanation="nCr = n!/(r!(n-r)!).",
        ),
        example="Find 5C3.",
        hint="C(n,r) = n!/(r!(n-r)!). Order doesn't matter. Type n and r.",
    ),

    "factorial_problem": ProblemType(
        id="factorial_problem", name="Factorial (n!)",
        description="Find the factorial of a number",
        topic="Permutations and Combinations", class_level="11", board="both", marks=1,
        steps=[ProblemStep("factorial", "Find n!")],
        thinking=ProblemThinkingQuestion(
            question="What is 5!?",
            options=["120", "25", "5", "15"],
            correct="120",
            explanation="n! = n × (n-1) × ... × 1. 5! = 120.",
        ),
        example="Find 5!.",
        hint="n! = n x (n-1) x ... x 1. Type one number.",
    ),

    "binomial_expansion_problem": ProblemType(
        id="binomial_expansion_problem", name="Binomial Expansion",
        description="Expand (1 + x)^n",
        topic="Binomial Theorem", class_level="11", board="both", marks=3,
        steps=[ProblemStep("binomial_expansion", "Expand the expression")],
        thinking=ProblemThinkingQuestion(
            question="What is the binomial theorem?",
            options=["(1+x)^n = Σ C(n,k) x^k", "(1+x)^n = 1 + x^n",
                     "(1+x)^n = nx", "(1+x)^n = n!"],
            correct="(1+x)^n = Σ C(n,k) x^k",
            explanation="(1+x)^n = C(n,0) + C(n,1)x + C(n,2)x² + ... + C(n,n)x^n.",
        ),
        example="Expand (1 + x)^5.",
        hint="(a+b)^n = sum C(n,k) a^(n-k) b^k. Type a, b, n or the expression.",
    ),

    "binomial_coefficient_problem": ProblemType(
        id="binomial_coefficient_problem", name="Binomial Coefficient C(n,k)",
        description="Find the binomial coefficient",
        topic="Binomial Theorem", class_level="11", board="both", marks=2,
        steps=[ProblemStep("binomial_coefficient", "Find C(n,k)")],
        thinking=ProblemThinkingQuestion(
            question="What is C(n,k)?",
            options=["n!/(k!(n-k)!)", "n!/k!", "n × k", "n + k"],
            correct="n!/(k!(n-k)!)",
            explanation="C(n,k) = n!/(k!(n-k)!).",
        ),
        example="Find C(8, 3).",
        hint="C(n,k) = n!/(k!(n-k)!). Type n and k.",
    ),

    "set_operations_problem": ProblemType(
        id="set_operations_problem", name="Set Operations",
        description="Find union, intersection, or difference of two sets",
        topic="Sets", class_level="11", board="both", marks=2,
        steps=[ProblemStep("set_operations", "Find the set operation result")],
        thinking=ProblemThinkingQuestion(
            question="What is A ∪ B?",
            options=["All elements in A or B (or both)", "Elements in both A and B",
                     "Elements in A but not B", "Elements in B but not A"],
            correct="All elements in A or B (or both)",
            explanation="Union (∪) = all elements. Intersection (∩) = common. Difference (-) = in A not B.",
        ),
        example="Find A ∪ B where A = {1,2,3,4} and B = {3,4,5,6}.",
        hint="Union, intersection, difference. Type elements separated by commas.",
    ),

    "complex_modulus_problem": ProblemType(
        id="complex_modulus_problem", name="Modulus of Complex Number",
        description="Find |z| of a complex number",
        topic="Complex Numbers", class_level="11", board="both", marks=2,
        steps=[ProblemStep("complex_modulus", "Find the modulus")],
        thinking=ProblemThinkingQuestion(
            question="What is the modulus of z = a + bi?",
            options=["√(a² + b²)", "a + b", "a - b", "a × b"],
            correct="√(a² + b²)",
            explanation="|z| = √(a² + b²). Distance from origin in the complex plane.",
        ),
        example="Find |3 + 4i|.",
        hint="|z| = sqrt(a^2 + b^2) for z = a+bi. Type real and imaginary parts.",
    ),

    "complex_argument_problem": ProblemType(
        id="complex_argument_problem", name="Argument of Complex Number",
        description="Find arg(z) of a complex number",
        topic="Complex Numbers", class_level="11", board="both", marks=2,
        steps=[ProblemStep("complex_argument", "Find the argument")],
        thinking=ProblemThinkingQuestion(
            question="What is the argument of z = a + bi?",
            options=["tan⁻¹(b/a)", "tan⁻¹(a/b)", "a/b", "b/a"],
            correct="tan⁻¹(b/a)",
            explanation="arg(z) = tan⁻¹(b/a). Angle from positive real axis.",
        ),
        example="Find arg(1 + i).",
        hint="arg(z) = atan(b/a). Type real and imaginary parts.",
    ),

    # ════════════════════════════════════════════
    # CLASS 12: MATRICES, VECTORS, 3D GEOMETRY, CALCULUS
    # ════════════════════════════════════════════

    "matrix_multiply_problem": ProblemType(
        id="matrix_multiply_problem", name="Matrix Multiplication",
        description="Multiply two matrices",
        topic="Matrices", class_level="12", board="both", marks=2,
        steps=[ProblemStep("matrix_multiply", "Multiply the matrices")],
        thinking=ProblemThinkingQuestion(
            question="When can you multiply two matrices?",
            options=["When columns of A = rows of B", "When both are square",
                     "When both have same dimensions", "Always"],
            correct="When columns of A = rows of B",
            explanation="A(m×n) × B(n×p) = C(m×p).",
        ),
        example="Multiply [[1,2],[3,4]] × [[5,6],[7,8]].",
        hint="Row x column. Type matrices as [[1,2],[3,4]]. Each inner list is a row.",
    ),

    "matrix_add_problem": ProblemType(
        id="matrix_add_problem", name="Matrix Addition",
        description="Add two matrices",
        topic="Matrices", class_level="12", board="both", marks=1,
        steps=[ProblemStep("matrix_add", "Add the matrices")],
        thinking=ProblemThinkingQuestion(
            question="When can you add two matrices?",
            options=["When they have the same dimensions", "When both are square",
                     "When columns match", "Always"],
            correct="When they have the same dimensions",
            explanation="Matrices must have the same dimensions to add.",
        ),
        example="Add [[1,2],[3,4]] + [[5,6],[7,8]].",
        hint="Add corresponding elements. Type two same-size matrices.",
    ),

    "matrix_transpose_problem": ProblemType(
        id="matrix_transpose_problem", name="Matrix Transpose",
        description="Find the transpose of a matrix",
        topic="Matrices", class_level="12", board="both", marks=1,
        steps=[ProblemStep("matrix_transpose", "Find the transpose")],
        thinking=ProblemThinkingQuestion(
            question="What is the transpose of a matrix?",
            options=["Rows become columns and columns become rows",
                     "Flip upside down", "Negate all elements", "Take the inverse"],
            correct="Rows become columns and columns become rows",
            explanation="Transpose A' swaps rows and columns.",
        ),
        example="Find the transpose of [[1,2,3],[4,5,6]].",
        hint="Swap rows and columns. Type one matrix.",
    ),

    "verify_skew_symmetric_problem": ProblemType(
        id="verify_skew_symmetric_problem", name="Verify Skew-Symmetric Matrix",
        description="Check if a matrix is skew-symmetric",
        topic="Matrices", class_level="12", board="both", marks=2,
        steps=[ProblemStep("verify_skew_symmetric", "Verify skew-symmetry")],
        thinking=ProblemThinkingQuestion(
            question="What makes a matrix skew-symmetric?",
            options=["A' = -A (transpose equals negative)", "A' = A",
                     "A = 0", "A = I"],
            correct="A' = -A (transpose equals negative)",
            explanation="Skew-symmetric: A' = -A. Diagonal = 0, a[i][j] = -a[j][i].",
        ),
        example="Verify if [[0,2,-3],[-2,0,4],[3,-4,0]] is skew-symmetric.",
        hint="Skew-symmetric: A = -A^T. Type one square matrix.",
    ),

    "verify_symmetric_problem": ProblemType(
        id="verify_symmetric_problem", name="Verify Symmetric Matrix",
        description="Check if a matrix is symmetric",
        topic="Matrices", class_level="12", board="both", marks=2,
        steps=[ProblemStep("verify_symmetric", "Verify symmetry")],
        thinking=ProblemThinkingQuestion(
            question="What makes a matrix symmetric?",
            options=["A' = A (transpose equals itself)", "A' = -A",
                     "A = I", "A = 0"],
            correct="A' = A (transpose equals itself)",
            explanation="Symmetric: A' = A. a[i][j] = a[j][i].",
        ),
        example="Verify if [[1,2],[2,1]] is symmetric.",
        hint="Symmetric: A = A^T. Type one square matrix.",
    ),

    "distance_3d_problem": ProblemType(
        id="distance_3d_problem", name="3D Distance Formula",
        description="Find distance between two points in 3D",
        topic="Three Dimensional Geometry", class_level="12", board="both", marks=2,
        steps=[ProblemStep("distance_3d", "Find the 3D distance")],
        thinking=ProblemThinkingQuestion(
            question="What is the 3D distance formula?",
            options=["√[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]",
                     "(x₂-x₁) + (y₂-y₁) + (z₂-z₁)",
                     "√(x² + y² + z²)", "x₂y₂z₂ - x₁y₁z₁"],
            correct="√[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]",
            explanation="3D distance extends the 2D formula with z-component.",
        ),
        example="Find the distance between (1,2,3) and (4,5,6).",
        hint="3D distance = sqrt((x2-x1)^2+(y2-y1)^2+(z2-z1)^2). Type both 3D points.",
    ),

    "section_3d_problem": ProblemType(
        id="section_3d_problem", name="3D Section Formula",
        description="Find point dividing a line in 3D in ratio m:n",
        topic="Three Dimensional Geometry", class_level="12", board="both", marks=3,
        steps=[ProblemStep("section_3d", "Find the dividing point")],
        thinking=ProblemThinkingQuestion(
            question="How does the 3D section formula work?",
            options=["Same as 2D but with z-component added",
                     "Only works in 2D", "Different formula entirely", "No ratio needed"],
            correct="Same as 2D but with z-component added",
            explanation="3D section: P = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n), (mz₂+nz₁)/(m+n)).",
        ),
        example="Find the point dividing (1,2,3) and (5,6,7) in ratio 2:3.",
        hint="3D section formula. Type both 3D points and ratio.",
    ),

    "direction_cosines_problem": ProblemType(
        id="direction_cosines_problem", name="Direction Cosines",
        description="Find direction cosines from direction ratios",
        topic="Three Dimensional Geometry", class_level="12", board="both", marks=2,
        steps=[ProblemStep("direction_cosines", "Find direction cosines")],
        thinking=ProblemThinkingQuestion(
            question="What are direction cosines?",
            options=["Cosines of angles with x, y, z axes",
                     "The direction ratios themselves", "Sines of angles", "Tangents of angles"],
            correct="Cosines of angles with x, y, z axes",
            explanation="(l,m,n) = (a,b,c)/√(a²+b²+c²). l²+m²+n²=1.",
        ),
        example="Find direction cosines of the line with direction ratios (1, 2, 3).",
        hint="Direction cosines: cosines of angles with axes. Type a vector.",
    ),

    "angle_between_vectors_problem": ProblemType(
        id="angle_between_vectors_problem", name="Angle Between Vectors",
        description="Find the angle between two vectors",
        topic="Vectors", class_level="12", board="both", marks=3,
        steps=[ProblemStep("angle_between_vectors", "Find the angle")],
        thinking=ProblemThinkingQuestion(
            question="How do you find the angle between two vectors?",
            options=["cos θ = (a·b)/(|a||b|)", "θ = a·b",
                     "θ = |a| + |b|", "cos θ = |a||b|/(a·b)"],
            correct="cos θ = (a·b)/(|a||b|)",
            explanation="cos θ = (a·b)/(|a||b|). If a·b=0, vectors are perpendicular.",
        ),
        example="Find the angle between [1,2,3] and [4,5,6].",
        hint="cos(theta) = (a.b)/(|a||b|). Type two vectors.",
    ),

    "vector_projection_problem": ProblemType(
        id="vector_projection_problem", name="Vector Projection",
        description="Find the projection of one vector on another",
        topic="Vectors", class_level="12", board="both", marks=3,
        steps=[ProblemStep("vector_projection", "Find the projection")],
        thinking=ProblemThinkingQuestion(
            question="What is the projection of a on b?",
            options=["(a·b/|b|²) × b", "a × b", "a + b", "a - b"],
            correct="(a·b/|b|²) × b",
            explanation="Projection of a on b = (a·b / |b|²) × b.",
        ),
        example="Find the projection of [1,2,3] on [4,5,6].",
        hint="Proj of a on b = (a.b/|b|^2) x b. Type two vectors.",
    ),

    "tangent_equation_problem": ProblemType(
        id="tangent_equation_problem", name="Equation of Tangent",
        description="Find the equation of a tangent line to a curve",
        topic="Application of Derivatives", class_level="12", board="both", marks=3,
        steps=[ProblemStep("tangent_equation", "Find the tangent equation")],
        thinking=ProblemThinkingQuestion(
            question="How do you find the equation of a tangent to y=f(x) at x=a?",
            options=["y - f(a) = f'(a)(x - a)", "y = f(x)",
                     "y = f'(x)", "y = a"],
            correct="y - f(a) = f'(a)(x - a)",
            explanation="Tangent at x=a: y - f(a) = f'(a)(x - a).",
        ),
        example="Find the tangent to y = x² at x = 2.",
        hint="The tangent to y=f(x) at x=a is: y - f(a) = f'(a)(x - a). You need the expression, the variable (usually x), and the point where the tangent touches the curve.",
        setup_help="Tangent line: y - f(a) = f'(a)·(x - a)\n• Expression = the function y = f(x)\n• Variable = x (or whatever variable the function uses)\n• Point = the x-value where tangent touches (e.g. x=2)\n• Normal line: y - f(a) = -1/f'(a) · (x - a)",
    ),

    "increasing_decreasing_problem": ProblemType(
        id="increasing_decreasing_problem", name="Increasing/Decreasing Intervals",
        description="Find where a function is increasing or decreasing",
        topic="Application of Derivatives", class_level="12", board="both", marks=3,
        steps=[ProblemStep("increasing_decreasing", "Find the intervals")],
        thinking=ProblemThinkingQuestion(
            question="How do you determine if a function is increasing or decreasing?",
            options=["f'(x) > 0 → increasing, f'(x) < 0 → decreasing",
                     "f(x) > 0 → increasing", "f''(x) > 0 → increasing",
                     "f(x) is large → increasing"],
            correct="f'(x) > 0 → increasing, f'(x) < 0 → decreasing",
            explanation="Find f'(x), set to 0 for critical points. Test intervals.",
        ),
        example="Find where f(x) = x³ - 3x is increasing/decreasing.",
        hint="Increasing where f'(x)>0, decreasing where f'(x)<0. Type the function.",
    ),

    # ════════════════════════════════════════════
    # "SHOW THAT" / "PROVE THAT" PROBLEM TYPES (CBSE 3-6 mark)
    # ════════════════════════════════════════════

    "show_increasing_problem": ProblemType(
        id="show_increasing_problem",
        name="Show That Function is Increasing",
        description="Prove that a function is increasing on an interval",
        topic="Application of Derivatives",
        class_level="12",
        board="both",
        marks=3,
        steps=[ProblemStep("show_increasing", "Show f'(x) > 0")],
        thinking=ProblemThinkingQuestion(
            question="To show f(x) is increasing, what do you need to prove?",
            options=["f'(x) > 0 on the interval", "f(x) > 0 on the interval",
                     "f''(x) > 0 on the interval", "f(x) has no zeros"],
            correct="f'(x) > 0 on the interval",
            explanation="A function is increasing where its derivative is positive. Differentiate and show f'(x) > 0.",
        ),
        example="Show that f(x) = x³ - 3x² + 3x + 7 is always increasing.",
        hint="Differentiate f(x). If f'(x) has no real roots and f'(0) > 0, then f is always increasing. For f(x) = x³-3x²+3x+7, f'(x) = 3x²-6x+3 = 3(x-1)² which is always ≥ 0.",
        setup_help="Steps for 'show increasing':\n1. Find f'(x)\n2. Show f'(x) > 0 (or ≥ 0 with equality only at isolated points)\n3. If f'(x) is a perfect square (like 3(x-1)²), it's always ≥ 0 → always increasing",
    ),

    "show_decreasing_problem": ProblemType(
        id="show_decreasing_problem",
        name="Show That Function is Decreasing",
        description="Prove that a function is decreasing on an interval",
        topic="Application of Derivatives",
        class_level="12",
        board="both",
        marks=3,
        steps=[ProblemStep("show_decreasing", "Show f'(x) < 0")],
        thinking=ProblemThinkingQuestion(
            question="To show f(x) is decreasing, what do you need to prove?",
            options=["f'(x) < 0 on the interval", "f(x) < 0 on the interval",
                     "f''(x) < 0 on the interval", "f(x) has no zeros"],
            correct="f'(x) < 0 on the interval",
            explanation="A function is decreasing where its derivative is negative. Differentiate and show f'(x) < 0.",
        ),
        example="Show that f(x) = -x³ + 3x² - 3x is always decreasing.",
        hint="Differentiate f(x). If f'(x) < 0 everywhere (no real roots or always negative), f is always decreasing.",
        setup_help="Steps for 'show decreasing':\n1. Find f'(x)\n2. Show f'(x) < 0 on the interval\n3. Common: f'(x) = -3(x-1)² is always ≤ 0 → always decreasing",
    ),

    "show_max_at_point": ProblemType(
        id="show_max_at_point",
        name="Show That f Has Maximum at x=a",
        description="Prove f has a maximum at a given point using f'(a)=0 and f''(a)<0",
        topic="Application of Derivatives",
        class_level="12",
        board="both",
        marks=5,
        steps=[ProblemStep("show_max_value", "Show f'(a)=0 and f''(a)<0")],
        thinking=ProblemThinkingQuestion(
            question="To show f has a maximum at x=a, what two conditions must hold?",
            options=["f'(a)=0 and f''(a)<0", "f(a)=0 and f'(a)<0",
                     "f'(a)=0 and f''(a)>0", "f(a) is the largest value"],
            correct="f'(a)=0 and f''(a)<0",
            explanation="At a maximum: f'(a)=0 (critical point) AND f''(a)<0 (concave down / second derivative negative).",
        ),
        example="Show that f(x) = x³ - 3x² + 3x + 7 has no maximum or minimum.",
        hint="Find f'(x) and solve f'(x)=0. Then check f''(x) at those points. If f''=0, the test is inconclusive. If f'(x) has no real roots, there's no max/min.",
        setup_help="Steps:\n1. Find f'(x), solve f'(x)=0 → critical points\n2. Find f''(x)\n3. At each critical point: f''<0 → max, f''>0 → min, f''=0 → inconclusive",
    ),

    "show_min_at_point": ProblemType(
        id="show_min_at_point",
        name="Show That f Has Minimum at x=a",
        description="Prove f has a minimum at a given point using f'(a)=0 and f''(a)>0",
        topic="Application of Derivatives",
        class_level="12",
        board="both",
        marks=5,
        steps=[ProblemStep("show_min_value", "Show f'(a)=0 and f''(a)>0")],
        thinking=ProblemThinkingQuestion(
            question="To show f has a minimum at x=a, what two conditions must hold?",
            options=["f'(a)=0 and f''(a)>0", "f(a)=0 and f'(a)>0",
                     "f'(a)=0 and f''(a)<0", "f(a) is the smallest value"],
            correct="f'(a)=0 and f''(a)>0",
            explanation="At a minimum: f'(a)=0 (critical point) AND f''(a)>0 (concave up / second derivative positive).",
        ),
        example="Show that f(x) = x² - 4x + 7 has a minimum at x=2.",
        hint="Find f'(x) and solve f'(x)=0. Then check f''(x) at that point. f''>0 confirms it's a minimum.",
        setup_help="Steps:\n1. Find f'(x), solve f'(x)=0 → critical points\n2. Find f''(x)\n3. At each critical point: f''>0 → minimum confirmed",
    ),

    # ════════════════════════════════════════════
    # CASE STUDY PROBLEM TYPES (CBSE 4-mark)
    # ════════════════════════════════════════════

    "case_study_optimization": ProblemType(
        id="case_study_optimization",
        name="Case Study: Optimization (Profit/Volume/Area)",
        description="Word problem requiring setup of optimization function, then find max/min",
        topic="Application of Derivatives",
        class_level="12",
        board="both",
        marks=4,
        steps=[
            ProblemStep("critical_points", "Step 1: Find critical points of the function"),
            ProblemStep("check_max_min", "Step 2: Check if max or min",
                        auto_fill={"previous.answer_raw": "point",
                                   "step_0.inputs.var": "var"}),
            ProblemStep("evaluate_at_point", "Step 3: Find the optimal value",
                        auto_fill={"step_0.inputs.expression": "expression",
                                   "step_0.inputs.var": "var",
                                   "step_1.answer_raw": "point"}),
        ],
        thinking=ProblemThinkingQuestion(
            question="For an optimization word problem, what is the first step?",
            options=["Write the function to maximize/minimize from the problem", "Differentiate immediately",
                     "Guess the answer", "Find the area"],
            correct="Write the function to maximize/minimize from the problem",
            explanation="First identify what to optimize (profit, volume, area) and write it as a function of one variable.",
        ),
        example="A company finds that profit P(x) = -0.8x² + 30x - 150. Find the production level for maximum profit.",
        hint="Read the case study and identify: 1) What to optimize (profit? volume? area?), 2) The function given or how to construct it. Common: P(x) = R(x) - C(x), V = x(L-2x)² for box, A = x(P/2-x) for fixed perimeter.",
        setup_help="Common case study setups:\n• Profit: P(x) = Revenue - Cost = R(x) - C(x)\n• Box volume: V = x*(L-2x)² (cut squares of side x from sheet of side L)\n• Fixed perimeter area: A = x*(P/2 - x)\n• Projectile: h(t) = v*t - 5*t²\n• Revenue: R(x) = price*x = (a-bx)*x",
    ),

    "case_study_lpp": ProblemType(
        id="case_study_lpp",
        name="Case Study: Linear Programming (LPP)",
        description="Word problem requiring LPP setup — maximize/minimize objective subject to constraints",
        topic="Linear Programming",
        class_level="12",
        board="both",
        marks=5,
        steps=[ProblemStep("lpp_corner_points", "Evaluate objective at corner points")],
        thinking=ProblemThinkingQuestion(
            question="In LPP, where does the optimal solution occur?",
            options=["At a corner point of the feasible region", "At the center of the feasible region",
                     "At the origin", "Anywhere in the feasible region"],
            correct="At a corner point of the feasible region",
            explanation="The maximum or minimum of the objective function in LPP always occurs at a vertex (corner point) of the feasible region.",
        ),
        example="Maximize Z = 3x + 4y subject to x + y ≤ 4, x ≥ 0, y ≥ 0.",
        hint="For LPP: 1) Identify the objective (maximize Z = ...), 2) Find the corner points of the feasible region by solving constraint equations pairwise, 3) Evaluate Z at each corner point, 4) Pick the max/min.",
        setup_help="LPP steps:\n1. Write objective: Z = ax + by\n2. Write constraints as equations to find corner points\n3. Solve pairs of constraint equations to get corner points\n4. Enter corner points as: x1,y1\\nx2,y2\\nx3,y3 (one per line)\n5. Enter objective as: 3*x + 4*y\n6. Solver evaluates Z at each corner and finds max/min",
    ),

    "case_study_probability": ProblemType(
        id="case_study_probability",
        name="Case Study: Probability (Balls/Cards/Dice)",
        description="Word problem requiring probability calculation from a scenario",
        topic="Probability",
        class_level="12",
        board="both",
        marks=4,
        steps=[ProblemStep("probability", "Find the probability")],
        thinking=ProblemThinkingQuestion(
            question="For probability from a word problem, what do you need to identify?",
            options=["Favorable outcomes and total outcomes", "Only the favorable outcomes",
                     "Only the total outcomes", "The sample space size"],
            correct="Favorable outcomes and total outcomes",
            explanation="P(event) = favorable / total. Read the problem to count how many outcomes match the event and how many total outcomes exist.",
        ),
        example="A bag has 3 red and 5 blue balls. One ball is drawn. Find P(red).",
        hint="Count from the problem: favorable = outcomes matching the event, total = all possible outcomes. For balls: total = sum of all colors. For cards: total = 52. For dice: total = 6 (one die) or 36 (two dice).",
        setup_help="Common probability setups:\n• Bag of balls: P(color) = count_of_color / total_balls\n• Die: P(number) = 1/6, P(even) = 3/6, P(prime) = 3/6\n• Two dice: total = 36, P(sum=7) = 6/36\n• Cards: total = 52, P(heart) = 13/52, P(king) = 4/52\n• Two coins: total = 4 (HH,HT,TH,TT), P(2 heads) = 1/4",
    ),

    # ════════════════════════════════════════════
    # PHYSICS — Mechanics
    # ════════════════════════════════════════════

    "physics_force_mass_accel": ProblemType(
        id="physics_force_mass_accel",
        name="Find Force (F = ma)",
        description="Calculate force given mass and acceleration using Newton's second law",
        topic="Newton's Laws of Motion",
        class_level="9",
        board="both",
        marks=2,
        steps=[
            ProblemStep("physics_force", "Step 1: Calculate F = ma"),
        ],
        thinking=ProblemThinkingQuestion(
            question="Newton's second law relates force to:",
            options=["Mass and acceleration", "Mass and velocity", "Acceleration and time", "Velocity and displacement"],
            correct="Mass and acceleration",
            explanation="F = ma. Force (N) = mass (kg) × acceleration (m/s²).",
        ),
        example="A 5 kg mass accelerates at 2 m/s². Find the force.",
        hint="Identify mass (kg) and acceleration (m/s²) from the question.",
        setup_help="F = m × a. Common setups:\n• Free body: F = ma directly\n• Friction: F_net = ma → F_applied - f = ma\n• Multiple forces: ΣF = ma",
    ),

    "physics_kinematics_uat": ProblemType(
        id="physics_kinematics_uat",
        name="Kinematics (v = u + at, s = ut + ½at²)",
        description="Find final velocity and displacement from initial velocity, acceleration, and time",
        topic="Kinematics",
        class_level="9",
        board="both",
        marks=3,
        steps=[
            ProblemStep("physics_kinematics", "Step 1: Find v and s"),
        ],
        thinking=ProblemThinkingQuestion(
            question="For motion with constant acceleration, which equation gives final velocity?",
            options=["v = u + at", "v = u + ½at", "v = ut", "v = at"],
            correct="v = u + at",
            explanation="v = u + at (final velocity). s = ut + ½at² (displacement).",
        ),
        example="A car starts from rest and accelerates at 3 m/s² for 5 seconds. Find its final velocity and distance covered.",
        hint="Identify u (initial velocity), a (acceleration), t (time). If 'from rest', u = 0.",
        setup_help="v = u + at, s = ut + ½at².\n• 'From rest' → u = 0\n• 'Uniform acceleration' → a is constant\n• 'Comes to stop' → v = 0",
    ),

    "physics_energy_ke_pe": ProblemType(
        id="physics_energy_ke_pe",
        name="Kinetic & Potential Energy",
        description="Calculate KE = ½mv² and PE = mgh",
        topic="Work, Energy and Power",
        class_level="9",
        board="both",
        marks=2,
        steps=[
            ProblemStep("physics_energy", "Step 1: Find KE and PE"),
        ],
        thinking=ProblemThinkingQuestion(
            question="Kinetic energy depends on:",
            options=["Mass and velocity", "Mass and height", "Force and displacement", "Mass and acceleration"],
            correct="Mass and velocity",
            explanation="KE = ½mv² (needs mass and velocity). PE = mgh (needs mass, height, gravity).",
        ),
        example="A 2 kg ball moves at 10 m/s at a height of 5 m. Find its KE and PE.",
        hint="KE needs mass and velocity. PE needs mass, height, and g (9.8 m/s²).",
        setup_help="KE = ½mv², PE = mgh.\n• Total energy = KE + PE (conservation of energy)\n• At max height: KE = 0, PE = max\n• At ground: PE = 0, KE = max",
    ),

    # ════════════════════════════════════════════
    # PHYSICS — Electricity
    # ════════════════════════════════════════════

    "physics_ohms_law_calc": ProblemType(
        id="physics_ohms_law_calc",
        name="Ohm's Law (V = IR)",
        description="Calculate voltage, current, or resistance using Ohm's law",
        topic="Current Electricity",
        class_level="10",
        board="both",
        marks=2,
        steps=[
            ProblemStep("physics_ohms_law", "Step 1: Calculate V = IR"),
        ],
        thinking=ProblemThinkingQuestion(
            question="Ohm's law states that voltage is:",
            options=["Directly proportional to current and resistance", "Inversely proportional to current", "Equal to current divided by resistance", "Independent of resistance"],
            correct="Directly proportional to current and resistance",
            explanation="V = IR. Voltage (V) = Current (A) × Resistance (Ω).",
        ),
        example="A current of 2 A flows through a 5 Ω resistor. Find the voltage across it.",
        hint="Identify I (current in A) and R (resistance in Ω). V = I × R.",
        setup_help="V = IR. Also: I = V/R, R = V/I.\n• Series: R_total = R1 + R2 + ...\n• Parallel: 1/R_total = 1/R1 + 1/R2 + ...",
    ),

    "physics_power_calc": ProblemType(
        id="physics_power_calc",
        name="Electrical Power (P = VI)",
        description="Calculate electrical power from voltage and current",
        topic="Current Electricity",
        class_level="10",
        board="both",
        marks=2,
        steps=[
            ProblemStep("physics_power", "Step 1: Calculate P = VI"),
        ],
        thinking=ProblemThinkingQuestion(
            question="Electrical power can be calculated as:",
            options=["P = VI = I²R = V²/R", "P = V/I", "P = IR", "P = V + I + R"],
            correct="P = VI = I²R = V²/R",
            explanation="All three formulas give the same power. Use whichever has the known values.",
        ),
        example="A 12 V battery drives 2 A through a bulb. Find the power dissipated.",
        hint="P = V × I. If you also know R, cross-check with P = I²R or P = V²/R.",
        setup_help="P = VI = I²R = V²/R. Unit: Watts (W).\n• Energy = P × t (Joules or kWh)",
    ),

    # ════════════════════════════════════════════
    # PHYSICS — Optics
    # ════════════════════════════════════════════

    "physics_lens_formula": ProblemType(
        id="physics_lens_formula",
        name="Lens/Mirror Formula",
        description="Find focal length, image distance, or magnification using lens formula",
        topic="Light - Reflection and Refraction",
        class_level="10",
        board="both",
        marks=3,
        steps=[
            ProblemStep("physics_lens", "Step 1: Apply lens formula"),
        ],
        thinking=ProblemThinkingQuestion(
            question="The lens formula relates:",
            options=["f, v, and u", "f, m, and v", "u, v, and m", "f, h, and v"],
            correct="f, v, and u",
            explanation="1/f = 1/v - 1/u. Magnification m = v/u = h'/h.",
        ),
        example="An object is placed 30 cm from a convex lens of focal length 15 cm. Find the image distance and magnification.",
        hint="Provide object distance (u) and focal length (f). The solver finds image distance (v) and magnification (m).",
        setup_help="1/f = 1/v - 1/u, m = v/u.\n• Convex lens: f > 0\n• Concave lens: f < 0\n• Real image: v < 0 (Cartesian sign)\n• Virtual image: v > 0",
    ),

    # ════════════════════════════════════════════
    # CHEMISTRY — Mole Concept
    # ════════════════════════════════════════════

    "chem_mole_calc": ProblemType(
        id="chem_mole_calc",
        name="Mole Calculation (n = mass/M)",
        description="Calculate number of moles from mass and molar mass",
        topic="Mole Concept and Stoichiometry",
        class_level="9",
        board="both",
        marks=1,
        steps=[
            ProblemStep("chem_moles", "Step 1: Calculate n = mass/M"),
        ],
        thinking=ProblemThinkingQuestion(
            question="One mole of any substance contains:",
            options=["6.022 × 10²³ particles", "12 grams", "1 liter", "Avogadro's number of moles"],
            correct="6.022 × 10²³ particles",
            explanation="1 mole = 6.022 × 10²³ particles (Avogadro's number). n = mass / molar_mass.",
        ),
        example="Find the number of moles in 36 g of water (H₂O, M = 18 g/mol).",
        hint="Identify mass (g) and molar mass (g/mol). n = mass / molar_mass.",
        setup_help="n = mass / M.\n• Water (H₂O): M = 18 g/mol\n• NaCl: M = 58.5 g/mol\n• CO₂: M = 44 g/mol",
    ),

    "chem_molarity_calc": ProblemType(
        id="chem_molarity_calc",
        name="Molarity Calculation (M = n/V)",
        description="Calculate molarity from moles (or mass) and volume",
        topic="Mole Concept and Stoichiometry",
        class_level="11",
        board="both",
        marks=2,
        steps=[
            ProblemStep("chem_molarity", "Step 1: Calculate M = n/V(L)"),
        ],
        thinking=ProblemThinkingQuestion(
            question="Molarity is the number of moles of solute per:",
            options=["Liter of solution", "Kilogram of solvent", "Total moles", "Gram of solute"],
            correct="Liter of solution",
            explanation="M = n / V(L). If volume is in mL, divide by 1000 to get liters.",
        ),
        example="Find the molarity of a solution containing 20 g of NaOH (M = 40) in 500 mL solution.",
        hint="If you have mass instead of moles, provide molar_mass too. Volume is in mL.",
        setup_help="M = n / V(L) = (mass/M) / (V_mL/1000).\n• 1 M = 1 mol/L\n• Volume must be in liters",
    ),

    # ════════════════════════════════════════════
    # CHEMISTRY — pH & Electrochemistry
    # ════════════════════════════════════════════

    "chem_pH_calc": ProblemType(
        id="chem_pH_calc",
        name="pH Calculation (pH = -log[H+])",
        description="Calculate pH from hydrogen ion concentration",
        topic="Acids, Bases and Salts",
        class_level="10",
        board="both",
        marks=1,
        steps=[
            ProblemStep("chem_pH", "Step 1: Calculate pH = -log[H+]"),
        ],
        thinking=ProblemThinkingQuestion(
            question="A solution with pH = 7 is:",
            options=["Neutral", "Acidic", "Basic", "Strongly acidic"],
            correct="Neutral",
            explanation="pH < 7 = acidic, pH = 7 = neutral, pH > 7 = basic. pH = -log[H+].",
        ),
        example="Find the pH of a solution with [H+] = 0.001 mol/L.",
        hint="Identify [H+] in mol/L. pH = -log10[H+].",
        setup_help="pH = -log10[H+].\n• pH + pOH = 14\n• [H+] = 10^(-pH)\n• Neutral: pH = 7",
    ),

    "chem_dilution_calc": ProblemType(
        id="chem_dilution_calc",
        name="Dilution (M1V1 = M2V2)",
        description="Calculate final concentration or volume after dilution",
        topic="Mole Concept and Stoichiometry",
        class_level="11",
        board="both",
        marks=2,
        steps=[
            ProblemStep("chem_dilution", "Step 1: Apply M1V1 = M2V2"),
        ],
        thinking=ProblemThinkingQuestion(
            question="When you dilute a solution, what remains constant?",
            options=["Amount of solute (moles)", "Concentration", "Volume", "Molarity"],
            correct="Amount of solute (moles)",
            explanation="Moles of solute don't change during dilution. M1V1 = M2V2.",
        ),
        example="100 mL of 2 M HCl is diluted to 400 mL. Find the final molarity.",
        hint="Provide M1, V1, and either M2 or V2. The solver finds the missing value.",
        setup_help="M1V1 = M2V2.\n• M1, V1 = initial conditions\n• M2, V2 = final conditions\n• Solve for the unknown",
    ),

    "chem_faraday_calc": ProblemType(
        id="chem_faraday_calc",
        name="Faraday's Law of Electrolysis",
        description="Calculate mass of substance deposited during electrolysis",
        topic="Electrochemistry",
        class_level="12",
        board="both",
        marks=3,
        steps=[
            ProblemStep("chem_faraday", "Step 1: Calculate m = (M×I×t)/(n×F)"),
        ],
        thinking=ProblemThinkingQuestion(
            question="Faraday's constant is approximately:",
            options=["96485 C/mol", "6.022 × 10²³", "8.314 J/(mol·K)", "9.8 m/s²"],
            correct="96485 C/mol",
            explanation="F = 96485 C/mol. m = (M × I × t) / (n × F).",
        ),
        example="A current of 2 A flows for 1 hour through CuSO₄ solution. Find the mass of copper deposited (Cu²⁺, M = 63.5, n = 2).",
        hint="Identify M (molar mass), I (current), t (time in seconds), n (valency). F = 96485.",
        setup_help="m = (M × I × t) / (n × F).\n• t must be in seconds\n• n = number of electrons transferred\n• F = 96485 C/mol",
    ),

    # ════════════════════════════════════════════
    # BIOLOGY — Genetics & Ecology
    # ════════════════════════════════════════════

    "bio_mendelian_cross": ProblemType(
        id="bio_mendelian_cross",
        name="Mendelian Cross Ratio",
        description="Determine phenotypic and genotypic ratios for genetic crosses",
        topic="Genetics and Evolution",
        class_level="10",
        board="both",
        marks=2,
        steps=[
            ProblemStep("bio_mendelian_ratio", "Step 1: Identify cross type and ratio"),
        ],
        thinking=ProblemThinkingQuestion(
            question="In a dihybrid cross (AaBb × AaBb), the F2 phenotypic ratio is:",
            options=["9:3:3:1", "3:1", "1:1", "1:2:1"],
            correct="9:3:3:1",
            explanation="Monohybrid → 3:1, Dihybrid → 9:3:3:1, Test cross → 1:1.",
        ),
        example="A pea plant heterozygous for height (Tt) is self-crossed. What is the expected phenotypic ratio?",
        hint="Type 'monohybrid' for single trait cross, 'dihybrid' for two traits, 'test_cross' for cross with recessive parent.",
        setup_help="Cross types:\n• Monohybrid (Aa × Aa): 3:1 phenotypic, 1:2:1 genotypic\n• Dihybrid (AaBb × AaBb): 9:3:3:1\n• Test cross (Aa × aa): 1:1",
    ),

    "bio_population_growth_calc": ProblemType(
        id="bio_population_growth_calc",
        name="Population Growth (Nt = N0 × e^(rt))",
        description="Calculate population size using exponential growth model",
        topic="Ecology and Environment",
        class_level="12",
        board="both",
        marks=2,
        steps=[
            ProblemStep("bio_population_growth", "Step 1: Calculate Nt = N0 × e^(rt)"),
        ],
        thinking=ProblemThinkingQuestion(
            question="In the exponential growth model, the growth rate depends on:",
            options=["Biotic potential (r)", "Carrying capacity (K)", "Environmental resistance", "Population density"],
            correct="Biotic potential (r)",
            explanation="Nt = N0 × e^(rt). r is the intrinsic growth rate. This model assumes unlimited resources.",
        ),
        example="A bacterial culture has 100 cells and grows at a rate of 0.5/hour. Find the population after 4 hours.",
        hint="Identify N0 (initial population), r (growth rate), t (time). Nt = N0 × e^(r×t).",
        setup_help="Nt = N0 × e^(rt).\n• Exponential growth (unlimited resources)\n• Logistic growth: Nt = K × N0 / (N0 + (K - N0)e^(-rt))\n• r = (b - d) where b = birth rate, d = death rate",
    ),

    # ════════════════════════════════════════════
    # NEW — SURFACE AREA (Class 8-10)
    # ════════════════════════════════════════════

    "surface_area_cube_problem": ProblemType(
        id="surface_area_cube_problem",
        name="Surface Area of Cube",
        description="Find the total surface area of a cube",
        topic="Mensuration",
        class_level="8",
        board="both",
        marks=2,
        steps=[ProblemStep("surface_area_cube", "Step 1: SA = 6a²")],
        thinking=ProblemThinkingQuestion(
            question="A cube has how many square faces?",
            options=["6", "4", "8", "12"],
            correct="6",
            explanation="A cube has 6 square faces. Total SA = 6 × (area of one face) = 6a².",
        ),
        example="Find the total surface area of a cube with edge 7 cm.",
        hint="SA = 6a². Enter the side length.",
    ),

    "surface_area_cuboid_problem": ProblemType(
        id="surface_area_cuboid_problem",
        name="Surface Area of Cuboid",
        description="Find the total surface area of a cuboid",
        topic="Mensuration",
        class_level="8",
        board="both",
        marks=2,
        steps=[ProblemStep("surface_area_cuboid", "Step 1: SA = 2(lw + lh + wh)")],
        thinking=ProblemThinkingQuestion(
            question="A cuboid has how many rectangular faces?",
            options=["6", "4", "8", "12"],
            correct="6",
            explanation="A cuboid has 6 rectangular faces: 2 of l×w, 2 of l×h, 2 of w×h. SA = 2(lw + lh + wh).",
        ),
        example="Find the TSA of a cuboid with l=10, w=5, h=3 cm.",
        hint="SA = 2(lw + lh + wh). Enter length, width, height.",
    ),

    "surface_area_cylinder_problem": ProblemType(
        id="surface_area_cylinder_problem",
        name="Surface Area of Cylinder",
        description="Find the total surface area of a cylinder",
        topic="Mensuration",
        class_level="9",
        board="both",
        marks=2,
        steps=[ProblemStep("surface_area_cylinder", "Step 1: TSA = 2πr(r + h)")],
        thinking=ProblemThinkingQuestion(
            question="The curved surface area of a cylinder is:",
            options=["2πrh", "πr²h", "2πr", "πr²"],
            correct="2πrh",
            explanation="CSA = 2πrh (unrolled = rectangle). TSA = CSA + 2 bases = 2πr(r + h).",
        ),
        example="Find the TSA of a cylinder with r=7, h=10 cm.",
        hint="TSA = 2πr(r + h). Need radius and height.",
    ),

    "surface_area_cone_problem": ProblemType(
        id="surface_area_cone_problem",
        name="Surface Area of Cone",
        description="Find the total surface area of a cone",
        topic="Mensuration",
        class_level="9",
        board="both",
        marks=2,
        steps=[ProblemStep("surface_area_cone", "Step 1: TSA = πr(r + l)")],
        thinking=ProblemThinkingQuestion(
            question="The curved surface area of a cone is:",
            options=["πrl", "πr²h", "2πrl", "πr(r + h)"],
            correct="πrl",
            explanation="CSA = πrl where l = slant height. TSA = CSA + base = πr(r + l).",
        ),
        example="Find the TSA of a cone with r=7, l=25 cm.",
        hint="TSA = πr(r + l). Need radius and slant height.",
    ),

    "surface_area_sphere_problem": ProblemType(
        id="surface_area_sphere_problem",
        name="Surface Area of Sphere",
        description="Find the surface area of a sphere",
        topic="Mensuration",
        class_level="9",
        board="both",
        marks=1,
        steps=[ProblemStep("surface_area_sphere", "Step 1: SA = 4πr²")],
        thinking=ProblemThinkingQuestion(
            question="The surface area of a sphere is:",
            options=["4πr²", "(4/3)πr³", "2πr²", "πr²"],
            correct="4πr²",
            explanation="SA = 4πr². This is 4 times the area of a great circle.",
        ),
        example="Find the surface area of a sphere with r=7 cm.",
        hint="SA = 4πr². Just need the radius.",
    ),

    "surface_area_hemisphere_problem": ProblemType(
        id="surface_area_hemisphere_problem",
        name="Surface Area of Hemisphere",
        description="Find the total surface area of a hemisphere",
        topic="Mensuration",
        class_level="9",
        board="both",
        marks=2,
        steps=[ProblemStep("surface_area_hemisphere", "Step 1: TSA = 3πr²")],
        thinking=ProblemThinkingQuestion(
            question="The total surface area of a hemisphere is:",
            options=["3πr²", "2πr²", "4πr²", "(2/3)πr³"],
            correct="3πr²",
            explanation="TSA = curved (2πr²) + flat base (πr²) = 3πr².",
        ),
        example="Find the TSA of a hemisphere with r=7 cm.",
        hint="TSA = 3πr². Curved = 2πr², base = πr².",
    ),

    # ════════════════════════════════════════════
    # NEW — FRACTIONS (Class 5)
    # ════════════════════════════════════════════

    "subtract_fractions": ProblemType(
        id="subtract_fractions",
        name="Subtract Two Fractions",
        description="Subtract two fractions with different denominators",
        topic="Fractions",
        class_level="5",
        board="both",
        marks=1,
        steps=[ProblemStep("fraction_subtract", "Step 1: a/b - c/d = (ad-bc)/(bd)")],
        thinking=ProblemThinkingQuestion(
            question="To subtract fractions with different denominators, you must first:",
            options=["Find a common denominator", "Subtract the denominators",
                     "Multiply the fractions", "Add the numerators"],
            correct="Find a common denominator",
            explanation="Find a common denominator (bd), then subtract: (ad - bc)/(bd).",
        ),
        example="Subtract 3/4 - 1/6.",
        hint="a/b - c/d = (ad - bc)/(bd). Enter all four values.",
    ),

    # ════════════════════════════════════════════
    # NEW — COMMERCIAL MATH (Class 8)
    # ════════════════════════════════════════════

    "successive_discount_problem": ProblemType(
        id="successive_discount_problem",
        name="Successive Discounts",
        description="Find selling price after two successive discounts",
        topic="Commercial Mathematics",
        class_level="8",
        board="both",
        marks=3,
        steps=[ProblemStep("successive_discount", "Step 1: SP = MP × (1-d₁/100) × (1-d₂/100)")],
        thinking=ProblemThinkingQuestion(
            question="Two successive discounts of 20% and 10% give a single equivalent discount of:",
            options=["28%", "30%", "26%", "32%"],
            correct="28%",
            explanation="SP = MP × 0.8 × 0.9 = 0.72 × MP. Discount = 28%. Successive discounts don't add.",
        ),
        example="A shopkeeper offers 20% then 10% discount on a ₹1000 item. Find SP.",
        hint="SP = MP × (1 - d₁/100) × (1 - d₂/100). Discounts compound.",
    ),

    "gst_calculation_problem": ProblemType(
        id="gst_calculation_problem",
        name="GST Calculation",
        description="Calculate GST amount and total bill",
        topic="Commercial Mathematics",
        class_level="8",
        board="both",
        marks=2,
        steps=[ProblemStep("gst_calculation", "Step 1: Total = Price × (1 + GST%/100)")],
        thinking=ProblemThinkingQuestion(
            question="GST is calculated as:",
            options=["Percentage of the price", "Fixed amount per item",
                     "Same as income tax", "Subtracted from price"],
            correct="Percentage of the price",
            explanation="GST Amount = Price × GST%/100. Total = Price + GST Amount.",
        ),
        example="A product costs ₹5000 with 18% GST. Find the total bill.",
        hint="GST = Price × Rate/100. Total = Price + GST.",
    ),

    # ════════════════════════════════════════════
    # NEW — ARITHMETIC: Speed/Work (Class 7-8)
    # ════════════════════════════════════════════

    "average_speed_problem": ProblemType(
        id="average_speed_problem",
        name="Average Speed (Two Segments)",
        description="Find average speed for a journey with two segments at different speeds",
        topic="Speed, Distance, Time",
        class_level="8",
        board="both",
        marks=3,
        steps=[ProblemStep("average_speed", "Step 1: Avg Speed = Total Distance / Total Time")],
        thinking=ProblemThinkingQuestion(
            question="A car travels 120 km at 60 km/h and 80 km at 40 km/h. Average speed is:",
            options=["Total Distance / Total Time", "(60 + 40) / 2 = 50 km/h",
                     "120 + 80 = 200 km/h", "60 × 40 = 2400"],
            correct="Total Distance / Total Time",
            explanation="Average speed = (d₁+d₂)/(d₁/s₁ + d₂/s₂) = 200/(2+2) = 50 km/h. NOT the arithmetic mean.",
        ),
        example="A car travels 120 km at 60 km/h, then 80 km at 40 km/h. Find average speed.",
        hint="Average Speed = Total Distance / Total Time. NOT (s₁+s₂)/2.",
    ),

    "relative_speed_problem": ProblemType(
        id="relative_speed_problem",
        name="Relative Speed",
        description="Find relative speed of two moving objects",
        topic="Speed, Distance, Time",
        class_level="7",
        board="both",
        marks=2,
        steps=[ProblemStep("relative_speed", "Step 1: Relative Speed")],
        thinking=ProblemThinkingQuestion(
            question="Two trains move in opposite directions at 60 and 40 km/h. Relative speed:",
            options=["100 km/h", "20 km/h", "2400 km/h", "1.5 km/h"],
            correct="100 km/h",
            explanation="Opposite direction: relative speed = s₁ + s₂ = 60 + 40 = 100 km/h.",
        ),
        example="Two trains approach each other at 60 and 40 km/h. Find relative speed.",
        hint="Same direction: |s₁-s₂|. Opposite: s₁+s₂. Specify direction.",
    ),

    "time_and_work_problem": ProblemType(
        id="time_and_work_problem",
        name="Time and Work (Two Workers)",
        description="Find time for two workers to complete a job together",
        topic="Time and Work",
        class_level="8",
        board="both",
        marks=3,
        steps=[ProblemStep("time_and_work", "Step 1: 1/T = 1/t₁ + 1/t₂")],
        thinking=ProblemThinkingQuestion(
            question="If A does a job in 12 days and B in 18 days, together they take:",
            options=["7.2 days", "30 days", "15 days", "216 days"],
            correct="7.2 days",
            explanation="1/T = 1/12 + 1/18 = 5/36. T = 36/5 = 7.2 days.",
        ),
        example="A completes work in 12 days, B in 18 days. How long together?",
        hint="1/T = 1/t₁ + 1/t₂. T = (t₁ × t₂)/(t₁ + t₂).",
    ),

    "pipes_and_cisterns_problem": ProblemType(
        id="pipes_and_cisterns_problem",
        name="Pipes and Cisterns",
        description="Find time to fill a tank with two pipes",
        topic="Time and Work",
        class_level="8",
        board="both",
        marks=3,
        steps=[ProblemStep("pipes_and_cisterns", "Step 1: 1/T = 1/t₁ + 1/t₂")],
        thinking=ProblemThinkingQuestion(
            question="Two pipes fill a tank in 6 and 8 hours. Together they fill it in:",
            options=["~3.43 hours", "14 hours", "7 hours", "48 hours"],
            correct="~3.43 hours",
            explanation="1/T = 1/6 + 1/8 = 7/24. T = 24/7 ≈ 3.43 hours.",
        ),
        example="Two pipes fill a tank in 6 and 8 hours. How long together?",
        hint="Same as work: 1/T = 1/t₁ + 1/t₂.",
    ),

    "mixture_allegation_problem": ProblemType(
        id="mixture_allegation_problem",
        name="Mixture and Alligation",
        description="Find the ratio to mix two ingredients using alligation",
        topic="Commercial Mathematics",
        class_level="8",
        board="both",
        marks=4,
        steps=[ProblemStep("mixture_allegation", "Step 1: Alligation ratio")],
        thinking=ProblemThinkingQuestion(
            question="Alligation rule: to mix 20% and 50% solutions to get 30%, the ratio is:",
            options=["2:1", "1:2", "1:1", "3:1"],
            correct="2:1",
            explanation="Ratio = (50-30):(30-20) = 20:10 = 2:1. More of the cheaper solution.",
        ),
        example="Mix 20% and 50% acid to get 30% acid. Find the ratio.",
        hint="Ratio = (c₂ - target) : (target - c₁). Cross-subtract.",
    ),

    # ════════════════════════════════════════════
    # NEW — PHYSICS (Class 9-12)
    # ════════════════════════════════════════════

    "physics_density_calc": ProblemType(
        id="physics_density_calc",
        name="Density (d = m/V)",
        description="Calculate density from mass and volume",
        topic="Matter and Its Properties",
        class_level="9",
        board="both",
        marks=1,
        steps=[ProblemStep("physics_density", "Step 1: d = m/V")],
        thinking=ProblemThinkingQuestion(
            question="Density is defined as:",
            options=["Mass per unit volume", "Volume per unit mass",
                     "Mass times volume", "Mass plus volume"],
            correct="Mass per unit volume",
            explanation="d = m/V. SI unit: kg/m³. Water has density 1000 kg/m³.",
        ),
        example="A block has mass 10 kg and volume 2 m³. Find its density.",
        hint="d = m/V. Mass in kg, volume in m³.",
    ),

    "physics_pressure_calc": ProblemType(
        id="physics_pressure_calc",
        name="Pressure (P = F/A)",
        description="Calculate pressure from force and area",
        topic="Force and Pressure",
        class_level="9",
        board="both",
        marks=1,
        steps=[ProblemStep("physics_pressure", "Step 1: P = F/A")],
        thinking=ProblemThinkingQuestion(
            question="Pressure is defined as:",
            options=["Force per unit area", "Force times area",
                     "Area per unit force", "Force plus area"],
            correct="Force per unit area",
            explanation="P = F/A. SI unit: Pascal (Pa) = N/m².",
        ),
        example="A force of 100 N acts on an area of 2 m². Find pressure.",
        hint="P = F/A. Force in N, area in m².",
    ),

    "physics_work_calc": ProblemType(
        id="physics_work_calc",
        name="Work Done (W = Fd cos θ)",
        description="Calculate work done by a force",
        topic="Work, Energy and Power",
        class_level="9",
        board="both",
        marks=2,
        steps=[ProblemStep("physics_work", "Step 1: W = Fd cos(θ)")],
        thinking=ProblemThinkingQuestion(
            question="Work done is zero when:",
            options=["Force is perpendicular to displacement", "Force is parallel to displacement",
                     "Force is zero", "Displacement is large"],
            correct="Force is perpendicular to displacement",
            explanation="W = Fd cos(θ). When θ = 90°, cos(90°) = 0, so W = 0.",
        ),
        example="A force of 50 N moves an object 10 m at 30° to the direction of motion. Find work done.",
        hint="W = F × d × cos(θ). If no angle, use 0°.",
    ),

    "physics_gpe_calc": ProblemType(
        id="physics_gpe_calc",
        name="Gravitational PE (mgh)",
        description="Calculate gravitational potential energy",
        topic="Work, Energy and Power",
        class_level="9",
        board="both",
        marks=1,
        steps=[ProblemStep("physics_gpe", "Step 1: GPE = mgh")],
        thinking=ProblemThinkingQuestion(
            question="Gravitational potential energy depends on:",
            options=["Mass, g, and height", "Mass and velocity only",
                     "Height and velocity", "Mass and temperature"],
            correct="Mass, g, and height",
            explanation="GPE = mgh. Depends on mass, gravitational acceleration, and height above reference.",
        ),
        example="A 5 kg object is at a height of 10 m. Find its GPE.",
        hint="GPE = mgh. g = 9.8 m/s².",
    ),

    "physics_wave_equation": ProblemType(
        id="physics_wave_equation",
        name="Wave Equation (v = fλ)",
        description="Find frequency, wavelength, or speed of a wave",
        topic="Waves and Sound",
        class_level="9",
        board="both",
        marks=1,
        steps=[ProblemStep("physics_frequency_wavelength", "Step 1: v = f × λ")],
        thinking=ProblemThinkingQuestion(
            question="The wave equation relates speed, frequency, and wavelength as:",
            options=["v = f × λ", "v = f / λ", "v = f + λ", "v = λ / f"],
            correct="v = f × λ",
            explanation="v = f × λ. Speed = frequency × wavelength.",
        ),
        example="A sound wave has frequency 170 Hz and speed 340 m/s. Find its wavelength.",
        hint="v = f × λ. Provide speed and one of frequency/wavelength.",
    ),

    "physics_heat_calc": ProblemType(
        id="physics_heat_calc",
        name="Heat Transfer (Q = mcΔT)",
        description="Calculate heat energy required to change temperature",
        topic="Heat and Temperature",
        class_level="10",
        board="both",
        marks=2,
        steps=[ProblemStep("physics_heat", "Step 1: Q = mcΔT")],
        thinking=ProblemThinkingQuestion(
            question="The heat required to raise the temperature of a substance depends on:",
            options=["Mass, specific heat, and temperature change", "Mass only",
                     "Temperature only", "Volume and density"],
            correct="Mass, specific heat, and temperature change",
            explanation="Q = mcΔT. m = mass, c = specific heat capacity, ΔT = temperature change.",
        ),
        example="How much heat is needed to raise 2 kg of water by 10 K? (c = 4200 J/kg·K)",
        hint="Q = mcΔT. For water, c = 4200 J/(kg·K).",
    ),

    "physics_resistance_calc": ProblemType(
        id="physics_resistance_calc",
        name="Combination of Resistors",
        description="Find equivalent resistance of series or parallel combination",
        topic="Electricity",
        class_level="10",
        board="both",
        marks=2,
        steps=[ProblemStep("physics_resistance", "Step 1: Series or Parallel")],
        thinking=ProblemThinkingQuestion(
            question="In a parallel combination of resistors, the equivalent resistance is:",
            options=["Less than the smallest resistor", "Equal to the smallest resistor",
                     "More than the largest resistor", "Equal to the sum"],
            correct="Less than the smallest resistor",
            explanation="Parallel: 1/R = 1/R₁ + 1/R₂. The equivalent is always less than the smallest individual resistor.",
        ),
        example="Two resistors of 6 Ω and 3 Ω are connected in parallel. Find equivalent resistance.",
        hint="Series: R₁+R₂. Parallel: R₁R₂/(R₁+R₂). Specify mode.",
    ),

    "physics_snells_law_calc": ProblemType(
        id="physics_snells_law_calc",
        name="Snell's Law (Refraction)",
        description="Find angle of refraction using Snell's law",
        topic="Light: Refraction",
        class_level="10",
        board="both",
        marks=2,
        steps=[ProblemStep("physics_snells_law", "Step 1: n₁ sin(θ₁) = n₂ sin(θ₂)")],
        thinking=ProblemThinkingQuestion(
            question="When light travels from air to glass, it:",
            options=["Bends towards the normal", "Bends away from the normal",
                     "Does not bend", "Reverses direction"],
            correct="Bends towards the normal",
            explanation="Glass is denser (n > 1). Light slows down and bends towards the normal.",
        ),
        example="Light travels from air (n=1) into glass (n=1.5) at 30°. Find the angle of refraction.",
        hint="n₁ sin(θ₁) = n₂ sin(θ₂). Provide n₁, θ₁, and n₂.",
    ),

    "physics_lens_power_calc": ProblemType(
        id="physics_lens_power_calc",
        name="Power of a Lens (P = 1/f)",
        description="Calculate the power of a lens in diopters",
        topic="Light: Lenses",
        class_level="10",
        board="both",
        marks=1,
        steps=[ProblemStep("physics_lens_power", "Step 1: P = 1/f (meters)")],
        thinking=ProblemThinkingQuestion(
            question="A convex lens has:",
            options=["Positive power", "Negative power", "Zero power", "Infinite power"],
            correct="Positive power",
            explanation="Convex (converging) lens has positive focal length → positive power. Concave: negative.",
        ),
        example="A convex lens has focal length 50 cm. Find its power.",
        hint="P = 1/f(m). Convert cm to m. Convex = +, Concave = -.",
    ),

    # ════════════════════════════════════════════
    # NEW — CHEMISTRY (Class 9-12)
    # ════════════════════════════════════════════

    "chem_gas_equation_calc": ProblemType(
        id="chem_gas_equation_calc",
        name="Ideal Gas Equation (PV = nRT)",
        description="Solve the ideal gas equation for any variable",
        topic="Gases and Gas Laws",
        class_level="11",
        board="both",
        marks=2,
        steps=[ProblemStep("chem_gas_equation", "Step 1: PV = nRT")],
        thinking=ProblemThinkingQuestion(
            question="In the ideal gas equation PV = nRT, R is:",
            options=["Universal gas constant = 8.314 J/(mol·K)", "Rate of reaction",
                     "Radius of molecule", "Resistance"],
            correct="Universal gas constant = 8.314 J/(mol·K)",
            explanation="R = 8.314 J/(mol·K). It's the same for all ideal gases.",
        ),
        example="1 mole of gas at 273 K has volume 0.0224 m³. Find the pressure.",
        hint="PV = nRT. R = 8.314 J/(mol·K). Provide P, V, and one of n or T.",
    ),

    "chem_half_life_calc": ProblemType(
        id="chem_half_life_calc",
        name="Radioactive Decay (Half-Life)",
        description="Find remaining quantity of a radioactive sample",
        topic="Nuclear Chemistry",
        class_level="12",
        board="both",
        marks=2,
        steps=[ProblemStep("chem_half_life", "Step 1: N = N₀ × (1/2)^(t/t½)")],
        thinking=ProblemThinkingQuestion(
            question="After 3 half-lives, what fraction of a radioactive sample remains?",
            options=["1/8", "1/3", "1/6", "1/9"],
            correct="1/8",
            explanation="After n half-lives: (1/2)^n. After 3: (1/2)³ = 1/8 = 12.5%.",
        ),
        example="A radioactive isotope has half-life 5 years. How much remains after 15 years from 100 g?",
        hint="N = N₀ × (1/2)^(t/t½). Count the number of half-lives.",
    ),

    # ════════════════════════════════════════════
    # CLASS 1-2 — NUMBER SENSE
    # ════════════════════════════════════════════

    "compare_numbers": ProblemType(
        id="compare_numbers",
        name="Compare Two Numbers",
        description="Compare two numbers using >, <, or =",
        topic="Number Sense",
        class_level="1",
        board="both",
        marks=1,
        steps=[ProblemStep("number_comparison", "Step 1: Compare the two numbers")],
        thinking=ProblemThinkingQuestion(
            question="Which symbol means 'greater than'?",
            options=[">", "<", "=", "+"],
            correct=">",
            explanation="> means greater than. < means less than. = means equal.",
        ),
        example="Compare 5 and 8. Which is greater?",
        hint="Enter both numbers. The system will compare them.",
    ),

    "place_value_problem": ProblemType(
        id="place_value_problem",
        name="Place Value of a Number",
        description="Find the place value of each digit in a number",
        topic="Number Sense",
        class_level="2",
        board="both",
        marks=1,
        steps=[ProblemStep("place_value", "Step 1: Find place value of each digit")],
        thinking=ProblemThinkingQuestion(
            question="In 345, the digit 4 is in which place?",
            options=["Tens", "Units", "Hundreds", "Thousands"],
            correct="Tens",
            explanation="3=Hundreds, 4=Tens, 5=Units. Place value of 4 = 4 × 10 = 40.",
        ),
        example="Find the place value of each digit in 345.",
        hint="Enter the number. System shows each digit's place value.",
    ),

    "even_or_odd": ProblemType(
        id="even_or_odd",
        name="Even or Odd",
        description="Check if a number is even or odd",
        topic="Number Sense",
        class_level="2",
        board="both",
        marks=1,
        steps=[ProblemStep("even_odd", "Step 1: Check if even or odd")],
        thinking=ProblemThinkingQuestion(
            question="Is 7 even or odd?",
            options=["Odd", "Even", "Both", "Neither"],
            correct="Odd",
            explanation="7 ends in 7, which is odd. Even numbers end in 0, 2, 4, 6, 8.",
        ),
        example="Is 24 even or odd?",
        hint="Enter the number. Even = divisible by 2, Odd = not.",
    ),

    "skip_counting_problem": ProblemType(
        id="skip_counting_problem",
        name="Skip Counting",
        description="Generate a skip counting sequence",
        topic="Number Sense",
        class_level="2",
        board="both",
        marks=1,
        steps=[ProblemStep("skip_counting", "Step 1: Generate skip counting sequence")],
        thinking=ProblemThinkingQuestion(
            question="Skip counting by 5 starting from 0:",
            options=["0, 5, 10, 15, 20...", "0, 5, 25, 125...", "5, 10, 15, 20, 25...", "0, 1, 2, 3, 4..."],
            correct="0, 5, 10, 15, 20...",
            explanation="Skip counting by 5: add 5 each time. 0, 5, 10, 15, 20, 25...",
        ),
        example="Skip count by 3 starting from 3, give 5 numbers.",
        hint="Enter start, step (skip by), and count (how many numbers).",
    ),

    "before_after_between_problem": ProblemType(
        id="before_after_between_problem",
        name="Before, After, Between",
        description="Find numbers that come before, after, or between two numbers",
        topic="Number Sense",
        class_level="1",
        board="both",
        marks=1,
        steps=[ProblemStep("before_after_between", "Step 1: Find before, after, between")],
        thinking=ProblemThinkingQuestion(
            question="What comes after 9?",
            options=["10", "8", "19", "0"],
            correct="10",
            explanation="After 9 comes 10. Before 9 is 8. Between 8 and 10 is 9.",
        ),
        example="What number comes between 7 and 9?",
        hint="Enter two numbers. System finds what's before, after, and between.",
    ),

    "multiplication_table_problem": ProblemType(
        id="multiplication_table_problem",
        name="Multiplication Table",
        description="Generate a multiplication table for a number",
        topic="Multiplication",
        class_level="2",
        board="both",
        marks=1,
        steps=[ProblemStep("multiplication_table", "Step 1: Generate multiplication table")],
        thinking=ProblemThinkingQuestion(
            question="What is 7 × 8?",
            options=["56", "54", "64", "49"],
            correct="56",
            explanation="7 × 8 = 56. Multiplication is repeated addition.",
        ),
        example="Write the multiplication table of 7 up to 10.",
        hint="Enter the number and how many multiples (default 10).",
    ),

    "money_calculation": ProblemType(
        id="money_calculation",
        name="Money Calculation",
        description="Add or subtract money amounts",
        topic="Money",
        class_level="2",
        board="both",
        marks=1,
        steps=[ProblemStep("money_arithmetic", "Step 1: Add or subtract money")],
        thinking=ProblemThinkingQuestion(
            question="₹1 = how many paise?",
            options=["100 paise", "10 paise", "1000 paise", "50 paise"],
            correct="100 paise",
            explanation="₹1 = 100 paise. ₹5.50 = 550 paise. Align decimal points when adding.",
        ),
        example="Add ₹25.50 and ₹15.25.",
        hint="Enter amounts in rupees. Use + or - for the operation.",
    ),

    "time_conversion_problem": ProblemType(
        id="time_conversion_problem",
        name="Time Conversion",
        description="Convert between hours, minutes, and seconds",
        topic="Measurement",
        class_level="2",
        board="both",
        marks=1,
        steps=[ProblemStep("time_conversion", "Step 1: Convert time units")],
        thinking=ProblemThinkingQuestion(
            question="How many minutes in 2 hours?",
            options=["120 minutes", "60 minutes", "200 minutes", "100 minutes"],
            correct="120 minutes",
            explanation="1 hour = 60 minutes. 2 hours = 2 × 60 = 120 minutes.",
        ),
        example="Convert 90 minutes to hours.",
        hint="1 hour = 60 min, 1 min = 60 sec. Enter value, from-unit, to-unit.",
    ),

    # ════════════════════════════════════════════
    # CLASS 3-4 — DIVISION, DECIMALS, FACTORS
    # ════════════════════════════════════════════

    "division_remainder_problem": ProblemType(
        id="division_remainder_problem",
        name="Division with Remainder",
        description="Divide two numbers and find quotient and remainder",
        topic="Division",
        class_level="3",
        board="both",
        marks=2,
        steps=[ProblemStep("division_with_remainder", "Step 1: Divide and find quotient, remainder")],
        thinking=ProblemThinkingQuestion(
            question="When you divide 23 by 5, the remainder is:",
            options=["3", "0", "5", "4"],
            correct="3",
            explanation="23 ÷ 5 = 4 remainder 3. Because 5 × 4 = 20, and 23 - 20 = 3.",
        ),
        example="Divide 47 by 6. Find quotient and remainder.",
        hint="Enter dividend and divisor. Quotient = how many times, Remainder = what's left.",
    ),

    "equivalent_fractions_problem": ProblemType(
        id="equivalent_fractions_problem",
        name="Equivalent Fractions",
        description="Find equivalent fractions by multiplying numerator and denominator",
        topic="Fractions",
        class_level="3",
        board="both",
        marks=1,
        steps=[ProblemStep("equivalent_fractions", "Step 1: Find equivalent fractions")],
        thinking=ProblemThinkingQuestion(
            question="Which is equivalent to 2/3?",
            options=["4/6", "3/4", "2/6", "3/2"],
            correct="4/6",
            explanation="2/3 × 2/2 = 4/6. Multiply top and bottom by the same number.",
        ),
        example="Find three equivalent fractions of 1/4.",
        hint="Multiply numerator and denominator by the same number.",
    ),

    "compare_fractions_problem": ProblemType(
        id="compare_fractions_problem",
        name="Compare Fractions",
        description="Compare two fractions and find which is greater",
        topic="Fractions",
        class_level="4",
        board="both",
        marks=1,
        steps=[ProblemStep("fraction_comparison", "Step 1: Compare the two fractions")],
        thinking=ProblemThinkingQuestion(
            question="Which is greater: 2/5 or 1/3?",
            options=["2/5", "1/3", "Equal", "Cannot compare"],
            correct="2/5",
            explanation="Cross-multiply: 2×3=6, 1×5=5. 6 > 5, so 2/5 > 1/3.",
        ),
        example="Compare 3/5 and 2/3. Which is greater?",
        hint="Cross-multiply: if n1×d2 > n2×d1, then n1/d1 is greater.",
    ),

    "decimal_operations_problem": ProblemType(
        id="decimal_operations_problem",
        name="Decimal Operations",
        description="Add, subtract, multiply, or divide decimal numbers",
        topic="Decimals",
        class_level="4",
        board="both",
        marks=2,
        steps=[ProblemStep("decimal_operations", "Step 1: Perform decimal operation")],
        thinking=ProblemThinkingQuestion(
            question="When adding 3.5 + 2.25, you should align:",
            options=["The decimal points", "The leftmost digits",
                     "The rightmost digits", "Nothing"],
            correct="The decimal points",
            explanation="Align decimal points: 3.50 + 2.25 = 5.75. Pad with zeros if needed.",
        ),
        example="Add 3.5 and 2.25.",
        hint="Enter two decimals and the operation (+, -, *, /).",
    ),

    "decimal_to_fraction_problem": ProblemType(
        id="decimal_to_fraction_problem",
        name="Convert Decimal to Fraction",
        description="Convert a decimal number to its fraction form",
        topic="Decimals",
        class_level="4",
        board="both",
        marks=1,
        steps=[ProblemStep("decimal_to_fraction", "Step 1: Convert decimal to fraction")],
        thinking=ProblemThinkingQuestion(
            question="0.5 as a fraction is:",
            options=["1/2", "5/10", "1/5", "5/100"],
            correct="1/2",
            explanation="0.5 = 5/10 = 1/2 (simplified). Divide numerator and denominator by 5.",
        ),
        example="Convert 0.75 to a fraction.",
        hint="Enter the decimal. System converts and simplifies.",
    ),

    "unit_conversion_problem": ProblemType(
        id="unit_conversion_problem",
        name="Unit Conversion",
        description="Convert between metric units (m, cm, km, g, kg, L, mL)",
        topic="Measurement",
        class_level="4",
        board="both",
        marks=1,
        steps=[ProblemStep("unit_conversion", "Step 1: Convert units")],
        thinking=ProblemThinkingQuestion(
            question="5 km = how many meters?",
            options=["5000 m", "500 m", "50 m", "50000 m"],
            correct="5000 m",
            explanation="1 km = 1000 m. 5 km = 5 × 1000 = 5000 m.",
        ),
        example="Convert 3.5 km to meters.",
        hint="1 km=1000m, 1 m=100cm, 1 kg=1000g, 1 L=1000mL.",
    ),

    "perimeter_problem": ProblemType(
        id="perimeter_problem",
        name="Perimeter of Polygon",
        description="Find the perimeter of a polygon by adding all sides",
        topic="Mensuration",
        class_level="4",
        board="both",
        marks=2,
        steps=[ProblemStep("perimeter_polygon", "Step 1: Add all sides to find perimeter")],
        thinking=ProblemThinkingQuestion(
            question="Perimeter of a rectangle with l=8 and w=5:",
            options=["26", "40", "13", "16"],
            correct="26",
            explanation="Perimeter = 2(l + w) = 2(8 + 5) = 2 × 13 = 26.",
        ),
        example="Find the perimeter of a rectangle with length 8 cm and width 5 cm.",
        hint="Enter all side lengths separated by commas. Perimeter = sum of all sides.",
    ),

    "factors_problem": ProblemType(
        id="factors_problem",
        name="Find Factors",
        description="Find all factors of a number",
        topic="Number Theory",
        class_level="4",
        board="both",
        marks=2,
        steps=[ProblemStep("factors_multiples", "Step 1: Find all factors")],
        thinking=ProblemThinkingQuestion(
            question="Which of these is NOT a factor of 18?",
            options=["5", "2", "3", "6"],
            correct="5",
            explanation="Factors of 18: 1, 2, 3, 6, 9, 18. 5 does not divide 18 exactly.",
        ),
        example="Find all factors of 24.",
        hint="Enter the number. Factors are numbers that divide it exactly.",
    ),

    # ════════════════════════════════════════════
    # CLASS 5-6 — INTEGERS, ALGEBRA, ANGLES
    # ════════════════════════════════════════════

    "integer_operations_problem": ProblemType(
        id="integer_operations_problem",
        name="Integer Operations",
        description="Add, subtract, multiply, or divide integers (including negative)",
        topic="Integers",
        class_level="6",
        board="both",
        marks=2,
        steps=[ProblemStep("integer_operations", "Step 1: Perform integer operation")],
        thinking=ProblemThinkingQuestion(
            question="What is (-7) × (-3)?",
            options=["21", "-21", "10", "-10"],
            correct="21",
            explanation="Negative × Negative = Positive. (-7) × (-3) = 21.",
        ),
        example="Evaluate: (-12) + 8 - (-5).",
        hint="Enter two integers and the operation. Negative × Negative = Positive.",
    ),

    "evaluate_expression_problem": ProblemType(
        id="evaluate_expression_problem",
        name="Evaluate Algebraic Expression",
        description="Evaluate an expression like 2x + 3 for a given value of x",
        topic="Algebra",
        class_level="6",
        board="both",
        marks=2,
        steps=[ProblemStep("algebraic_expression_eval", "Step 1: Substitute and evaluate")],
        thinking=ProblemThinkingQuestion(
            question="If x = 4, what is 3x - 7?",
            options=["5", "12", "19", "-3"],
            correct="5",
            explanation="Substitute x = 4: 3(4) - 7 = 12 - 7 = 5.",
        ),
        example="Evaluate 2x + 5 when x = 7.",
        hint="Enter the expression, variable name, and its value. Substitute and evaluate.",
    ),

    "angle_type_problem": ProblemType(
        id="angle_type_problem",
        name="Classify Angle",
        description="Classify an angle as acute, right, obtuse, straight, or reflex",
        topic="Geometry",
        class_level="5",
        board="both",
        marks=1,
        steps=[ProblemStep("angle_type", "Step 1: Classify the angle")],
        thinking=ProblemThinkingQuestion(
            question="An angle of 45° is:",
            options=["Acute", "Right", "Obtuse", "Straight"],
            correct="Acute",
            explanation="Acute: <90°. Right: =90°. Obtuse: 90-180°. Straight: =180°.",
        ),
        example="Classify an angle of 120°.",
        hint="Acute<90, Right=90, Obtuse 90-180, Straight=180, Reflex>180.",
    ),

    "angle_sum_triangle_problem": ProblemType(
        id="angle_sum_triangle_problem",
        name="Missing Angle in Triangle",
        description="Find the missing angle in a triangle (angles sum to 180°)",
        topic="Geometry",
        class_level="6",
        board="both",
        marks=2,
        steps=[ProblemStep("angle_sum_triangle", "Step 1: Find missing angle (sum = 180°)")],
        thinking=ProblemThinkingQuestion(
            question="Two angles of a triangle are 60° and 70°. The third angle is:",
            options=["50°", "60°", "70°", "130°"],
            correct="50°",
            explanation="Sum = 180°. Third = 180 - (60 + 70) = 180 - 130 = 50°.",
        ),
        example="Two angles of a triangle are 45° and 55°. Find the third angle.",
        hint="Sum of angles = 180°. Third = 180 - (angle1 + angle2).",
    ),

    "angle_sum_quadrilateral_problem": ProblemType(
        id="angle_sum_quadrilateral_problem",
        name="Missing Angle in Quadrilateral",
        description="Find the missing angle in a quadrilateral (angles sum to 360°)",
        topic="Geometry",
        class_level="6",
        board="both",
        marks=2,
        steps=[ProblemStep("angle_sum_quadrilateral", "Step 1: Find missing angle (sum = 360°)")],
        thinking=ProblemThinkingQuestion(
            question="Three angles of a quadrilateral are 90°, 90°, and 110°. The fourth is:",
            options=["70°", "90°", "110°", "170°"],
            correct="70°",
            explanation="Sum = 360°. Fourth = 360 - (90 + 90 + 110) = 360 - 290 = 70°.",
        ),
        example="Three angles of a quadrilateral are 80°, 100°, and 90°. Find the fourth.",
        hint="Sum = 360°. Fourth = 360 - (a + b + c).",
    ),

    "linear_equation_problem": ProblemType(
        id="linear_equation_problem",
        name="Solve Linear Equation (One Variable)",
        description="Solve a linear equation like 2x + 5 = 15",
        topic="Algebra",
        class_level="7",
        board="both",
        marks=2,
        steps=[ProblemStep("linear_equation_one_var", "Step 1: Solve for the variable")],
        thinking=ProblemThinkingQuestion(
            question="To solve 3x - 7 = 14, the first step is:",
            options=["Add 7 to both sides", "Multiply by 3",
                     "Divide by x", "Subtract 14"],
            correct="Add 7 to both sides",
            explanation="3x - 7 = 14 → 3x = 21 → x = 7. Move constants first, then divide.",
        ),
        example="Solve: 2x + 5 = 15.",
        hint="Enter equation as expression = 0 (e.g. 2*x + 5 - 15 for 2x+5=15).",
    ),

    "rational_operations_problem": ProblemType(
        id="rational_operations_problem",
        name="Rational Number Operations",
        description="Add, subtract, multiply, or divide rational numbers",
        topic="Rational Numbers",
        class_level="8",
        board="both",
        marks=2,
        steps=[ProblemStep("rational_operations", "Step 1: Perform operation on rational numbers")],
        thinking=ProblemThinkingQuestion(
            question="What is 2/3 + 1/4?",
            options=["11/12", "3/7", "8/12", "3/12"],
            correct="11/12",
            explanation="Common denominator 12: 8/12 + 3/12 = 11/12.",
        ),
        example="Add 2/3 and 1/4.",
        hint="Enter two rational numbers (fractions or decimals) and the operation.",
    ),

    "simplify_expression_problem": ProblemType(
        id="simplify_expression_problem",
        name="Simplify Algebraic Expression",
        description="Simplify by combining like terms",
        topic="Algebra",
        class_level="7",
        board="both",
        marks=2,
        steps=[ProblemStep("algebraic_simplify", "Step 1: Combine like terms")],
        thinking=ProblemThinkingQuestion(
            question="Simplify: 5x + 3 - 2x + 7",
            options=["3x + 10", "3x + 4", "7x + 10", "3x - 4"],
            correct="3x + 10",
            explanation="Combine like terms: 5x - 2x = 3x. 3 + 7 = 10. Result: 3x + 10.",
        ),
        example="Simplify: 4x + 7 - 2x + 3.",
        hint="Combine x terms together, constant terms together.",
    ),

    "factorise_problem": ProblemType(
        id="factorise_problem",
        name="Factorise Algebraic Expression",
        description="Factorise an algebraic expression",
        topic="Algebra",
        class_level="8",
        board="both",
        marks=3,
        steps=[ProblemStep("factorise_algebraic", "Step 1: Factorise the expression")],
        thinking=ProblemThinkingQuestion(
            question="Factorise: x² - 16",
            options=["(x+4)(x-4)", "(x-4)²", "(x+16)(x-1)", "(x+4)²"],
            correct="(x+4)(x-4)",
            explanation="x² - 16 = x² - 4² = (x+4)(x-4). Difference of squares: a²-b² = (a+b)(a-b).",
        ),
        example="Factorise: x² - 25.",
        hint="Look for patterns: a²-b²=(a+b)(a-b), a²+2ab+b²=(a+b)².",
    ),

    "algebraic_identity_problem": ProblemType(
        id="algebraic_identity_problem",
        name="Verify Algebraic Identity",
        description="Verify that LHS = RHS for an algebraic identity",
        topic="Algebra",
        class_level="8",
        board="both",
        marks=2,
        steps=[ProblemStep("algebraic_identity", "Step 1: Verify LHS = RHS")],
        thinking=ProblemThinkingQuestion(
            question="(a - b)² equals:",
            options=["a² - 2ab + b²", "a² + b²", "a² + 2ab + b²", "a² - b²"],
            correct="a² - 2ab + b²",
            explanation="(a-b)² = a² - 2ab + b². (a+b)² = a² + 2ab + b². (a+b)(a-b) = a² - b².",
        ),
        example="Verify: (x+3)² = x² + 6x + 9.",
        hint="Enter LHS and RHS. System expands and checks equality.",
    ),

    "quadratic_formula_problem": ProblemType(
        id="quadratic_formula_problem",
        name="Quadratic Formula",
        description="Solve ax² + bx + c = 0 using the quadratic formula",
        topic="Quadratic Equations",
        class_level="9",
        board="both",
        marks=3,
        steps=[ProblemStep("quadratic_formula", "Step 1: Apply quadratic formula")],
        thinking=ProblemThinkingQuestion(
            question="The quadratic formula is:",
            options=["x = (-b ± √(b²-4ac)) / 2a", "x = -b / 2a",
                     "x = b² - 4ac", "x = (b + √(b²-4ac)) / a"],
            correct="x = (-b ± √(b²-4ac)) / 2a",
            explanation="x = (-b ± √(b²-4ac)) / 2a. The discriminant determines the nature of roots.",
        ),
        example="Solve x² - 5x + 6 = 0 using the quadratic formula.",
        hint="Enter a, b, c from ax²+bx+c=0. System applies the formula.",
    ),

    "nature_of_roots_problem": ProblemType(
        id="nature_of_roots_problem",
        name="Nature of Roots",
        description="Determine the nature of roots using the discriminant",
        topic="Quadratic Equations",
        class_level="10",
        board="both",
        marks=2,
        steps=[ProblemStep("nature_of_roots", "Step 1: Find discriminant and nature of roots")],
        thinking=ProblemThinkingQuestion(
            question="If b² - 4ac < 0, the roots are:",
            options=["No real roots (imaginary)", "Real and equal",
                     "Real and distinct", "Zero"],
            correct="No real roots (imaginary)",
            explanation="D > 0: real and distinct. D = 0: real and equal. D < 0: no real roots.",
        ),
        example="Find the nature of roots of 2x² + 3x + 5 = 0.",
        hint="Discriminant = b² - 4ac. D>0: distinct, D=0: equal, D<0: no real roots.",
    ),

    "simultaneous_equations_problem": ProblemType(
        id="simultaneous_equations_problem",
        name="Solve Simultaneous Equations",
        description="Solve a system of two linear equations in two variables",
        topic="Linear Equations",
        class_level="10",
        board="both",
        marks=3,
        steps=[ProblemStep("simultaneous_linear", "Step 1: Solve the system")],
        thinking=ProblemThinkingQuestion(
            question="To solve 2x+3y=13 and 3x-y=3, which method works?",
            options=["Substitution or elimination", "Only factorization",
                     "Quadratic formula", "Integration"],
            correct="Substitution or elimination",
            explanation="Systems of linear equations can be solved by substitution, elimination, or graphically.",
        ),
        example="Solve: 2x + 3y = 13, 3x - y = 3.",
        hint="Enter both equations as expressions = 0. System solves for x and y.",
    ),

    "consistency_check_problem": ProblemType(
        id="consistency_check_problem",
        name="Check Consistency of System",
        description="Check if a system of linear equations has a solution",
        topic="Linear Equations",
        class_level="10",
        board="both",
        marks=2,
        steps=[ProblemStep("consistency_check", "Step 1: Check consistency")],
        thinking=ProblemThinkingQuestion(
            question="A system has no solution when:",
            options=["a₁/a₂ = b₁/b₂ ≠ c₁/c₂", "a₁/a₂ = b₁/b₂ = c₁/c₂",
                     "a₁/a₂ ≠ b₁/b₂", "All coefficients are zero"],
            correct="a₁/a₂ = b₁/b₂ ≠ c₁/c₂",
            explanation="If coefficient ratios are equal but constant ratio differs → parallel lines → no solution.",
        ),
        example="Check if 2x+3y=7 and 4x+6y=10 are consistent.",
        hint="Compare a₁/a₂, b₁/b₂, c₁/c₂. If all equal → infinite solutions.",
    ),
}


def get_problem_type(pt_id: str) -> Optional[ProblemType]:
    """Get a problem type by ID."""
    return PROBLEM_TYPES.get(pt_id)


def get_problem_types_by_topic(topic: str) -> list:
    """Get all problem types for a topic."""
    return [pt for pt in PROBLEM_TYPES.values() if pt.topic == topic]


def get_problem_types_by_class(class_level: str) -> list:
    """Get all problem types for a class level."""
    return [pt for pt in PROBLEM_TYPES.values() if pt.class_level == class_level]


def get_all_topics() -> list:
    """Get all unique topics."""
    return list(set(pt.topic for pt in PROBLEM_TYPES.values()))


def get_all_problem_types() -> list:
    """Get all problem type definitions."""
    return list(PROBLEM_TYPES.values())
