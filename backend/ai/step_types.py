"""Step Types — universal math operation definitions.

Each step type defines:
1. What inputs the student provides (structured form fields)
2. What thinking question to ask before showing the form (competency training)
3. Which solver_engine operation to execute
4. What the next step could be (for multi-step chaining)

These are UNIVERSAL — they work for any board (CBSE, ISC, JEE, etc.).
The math is the same everywhere.
"""

from dataclasses import dataclass, field
from typing import Optional


@dataclass
class InputField:
    """A single input field for a step type."""
    name: str           # field key, e.g. "expression"
    label: str          # display label, e.g. "Expression f(x)"
    field_type: str     # "expression", "variable", "point", "matrix", "vector", "number", "list"
    required: bool = True
    default: str = ""
    placeholder: str = ""
    help_text: str = "" # small help text shown to student


@dataclass
class ThinkingQuestion:
    """A competency-training question asked before the input form."""
    question: str       # the question text
    options: list       # multiple choice options
    correct: str        # the correct option
    explanation: str    # shown if student answers wrong


@dataclass
class StepType:
    """Definition of a universal math step type."""
    id: str             # unique identifier, e.g. "differentiate"
    name: str           # display name, e.g. "Find Derivative"
    description: str    # short description
    category: str       # "calculus", "algebra", "matrices", "vectors", "probability", "lpp"
    inputs: list        # list of InputField objects
    operation: str      # solver_engine operation name
    thinking: Optional[ThinkingQuestion] = None  # competency question
    next_steps: list = field(default_factory=list)  # possible next step type ids
    marks: int = 1      # typical marks for this step in CBSE/ISC
    hint: str = ""      # hint for this specific step — how to fill the input fields


# ─────────────────────────────────────────────────────────────────────
# Step Type Definitions
# ─────────────────────────────────────────────────────────────────────

STEP_TYPES = {

    # ════════════════════════════════════════════
    # CALCULUS — Differentiation
    # ════════════════════════════════════════════

    "differentiate": StepType(
        id="differentiate",
        name="Find Derivative",
        description="Find the derivative of an expression",
        category="calculus",
        inputs=[
            InputField("expression", "Expression f(x)", "expression",
                       placeholder="", help_text="Enter the function to differentiate"),
            InputField("var", "Variable", "variable",
                       default="x", placeholder="", help_text="Differentiate with respect to"),
            InputField("order", "Order (1=first, 2=second)", "number",
                       default="1", required=False, help_text="Default: first derivative"),
        ],
        operation="differentiate",
        thinking=ThinkingQuestion(
            question="What does differentiation find?",
            options=[
                "The rate of change of a function",
                "The area under a curve",
                "The maximum value of a function",
                "The inverse of a function",
            ],
            correct="The rate of change of a function",
            explanation="Differentiation finds the rate of change (slope) of a function at any point.",
        ),
        next_steps=["differentiate_at_point", "critical_points", "check_max_min",
                     "evaluate_at_point", "increasing_decreasing"],
        marks=2,
        hint="Differentiation rules: x^n -> n*x^(n-1). sin(x)->cos(x), cos(x)->-sin(x), e^x->e^x. Use product rule for f*g, chain rule for f(g(x))."
    ),

    "differentiate_at_point": StepType(
        id="differentiate_at_point",
        name="Find Derivative at a Point",
        description="Find the derivative and evaluate at a specific point",
        category="calculus",
        inputs=[
            InputField("expression", "Expression f(x)", "expression",
                       placeholder="", help_text="Enter the function"),
            InputField("var", "Variable", "variable",
                       default="x", placeholder=""),
            InputField("point", "Point to evaluate at", "expression",
                       placeholder="", help_text="e.g. 1, pi/4, 0"),
        ],
        operation="differentiate_at_point",
        thinking=ThinkingQuestion(
            question="To find f'(a), what do we do?",
            options=[
                "Differentiate f(x), then substitute x=a",
                "Substitute x=a into f(x), then differentiate",
                "Integrate f(x), then substitute x=a",
                "Just evaluate f(a)",
            ],
            correct="Differentiate f(x), then substitute x=a",
            explanation="First find the derivative f'(x), then substitute x=a to get f'(a).",
        ),
        next_steps=[],
        marks=2,
        hint="Find f'(x) first, then substitute x=a. Example: f(x)=x**2, f'(x)=2x, f'(3)=6."
    ),

    "critical_points": StepType(
        id="critical_points",
        name="Find Critical Points",
        description="Find where the derivative equals zero",
        category="calculus",
        inputs=[
            InputField("expression", "Expression f(x)", "expression",
                       placeholder="", help_text="Enter the function"),
            InputField("var", "Variable", "variable",
                       default="x", placeholder=""),
        ],
        operation="critical_points",
        thinking=ThinkingQuestion(
            question="How do we find critical points of a function?",
            options=[
                "Set derivative = 0 and solve",
                "Set the function = 0 and solve",
                "Integrate the function and set = 0",
                "Find the second derivative",
            ],
            correct="Set derivative = 0 and solve",
            explanation="Critical points occur where f'(x) = 0. Differentiate, set to zero, solve for x.",
        ),
        next_steps=["check_max_min", "evaluate_at_point"],
        marks=3,
        hint="Critical points: where f'(x)=0. Differentiate, set to 0, solve for x."
    ),

    "check_max_min": StepType(
        id="check_max_min",
        name="Check Maximum or Minimum",
        description="Use second derivative test to classify a critical point",
        category="calculus",
        inputs=[
            InputField("expression", "Expression f(x)", "expression",
                       placeholder="", help_text="The original function"),
            InputField("var", "Variable", "variable",
                       default="x", placeholder=""),
            InputField("point", "Critical point", "expression",
                       placeholder="", help_text="The critical point to check"),
        ],
        operation="check_max_min",
        thinking=ThinkingQuestion(
            question="What does the second derivative test say?",
            options=[
                "f''(x) < 0 → maximum, f''(x) > 0 → minimum",
                "f''(x) > 0 → maximum, f''(x) < 0 → minimum",
                "f''(x) = 0 → maximum",
                "f''(x) = 0 → minimum",
            ],
            correct="f''(x) < 0 → maximum, f''(x) > 0 → minimum",
            explanation="If the second derivative is negative at the critical point, it's a maximum. "
                        "If positive, it's a minimum.",
        ),
        next_steps=["evaluate_at_point"],
        marks=2,
        hint="f''(x)>0 at critical point -> minimum. f''(x)<0 -> maximum. f''(x)=0 -> inconclusive (use first derivative test)."
    ),

    "evaluate_at_point": StepType(
        id="evaluate_at_point",
        name="Evaluate at a Point",
        description="Substitute a value into an expression",
        category="calculus",
        inputs=[
            InputField("expression", "Expression f(x)", "expression",
                       placeholder="", help_text="The function to evaluate"),
            InputField("var", "Variable", "variable",
                       default="x", placeholder=""),
            InputField("point", "Point", "expression",
                       placeholder="", help_text="Value to substitute"),
        ],
        operation="evaluate_at_point",
        thinking=ThinkingQuestion(
            question="To find f(a), what do we do?",
            options=[
                "Substitute x=a into f(x)",
                "Differentiate f(x) and then substitute",
                "Integrate f(x) and then substitute",
                "Set f(x) = a and solve",
            ],
            correct="Substitute x=a into f(x",
            explanation="To evaluate f at a point a, simply replace x with a in the expression.",
        ),
        next_steps=[],
        marks=1,
        hint="Substitute the value of x into the expression. Example: f(x)=x**2+3, f(2)=4+3=7."
    ),

    # ════════════════════════════════════════════
    # CALCULUS — Integration
    # ════════════════════════════════════════════

    "integrate_indefinite": StepType(
        id="integrate_indefinite",
        name="Find Indefinite Integral",
        description="Find the antiderivative of an expression",
        category="calculus",
        inputs=[
            InputField("expression", "Expression to integrate", "expression",
                       placeholder="",
                       help_text="Enter the integrand"),
            InputField("var", "Variable", "variable",
                       default="x", placeholder="",
                       help_text="Integrate with respect to"),
        ],
        operation="integrate_indefinite",
        thinking=ThinkingQuestion(
            question="What does integration find?",
            options=[
                "The antiderivative (area function)",
                "The rate of change",
                "The maximum value",
                "The derivative",
            ],
            correct="The antiderivative (area function)",
            explanation="Integration finds the antiderivative — the function whose derivative "
                        "gives back the original expression.",
        ),
        next_steps=["evaluate_at_point", "integrate_definite"],
        marks=3,
        hint="Integration: x^n -> x^(n+1)/(n+1). Add +C. sin(x)->-cos(x), cos(x)->sin(x), e^x->e^x."
    ),

    "integrate_definite": StepType(
        id="integrate_definite",
        name="Find Definite Integral",
        description="Find the definite integral between two bounds",
        category="calculus",
        inputs=[
            InputField("expression", "Expression to integrate", "expression",
                       placeholder="", help_text="Enter the integrand"),
            InputField("var", "Variable", "variable",
                       default="x", placeholder=""),
            InputField("lower", "Lower bound", "expression",
                       placeholder="", help_text="Lower limit of integration"),
            InputField("upper", "Upper bound", "expression",
                       placeholder="", help_text="Upper limit of integration"),
        ],
        operation="integrate_definite",
        thinking=ThinkingQuestion(
            question="What does a definite integral represent?",
            options=[
                "The net area between the curve and x-axis",
                "The slope of the curve",
                "The maximum of the function",
                "The derivative of the function",
            ],
            correct="The net area between the curve and x-axis",
            explanation="A definite integral ∫[a to b] f(x) dx gives the signed area "
                        "between the curve y=f(x) and the x-axis from x=a to x=b.",
        ),
        next_steps=[],
        marks=3,
        hint="Evaluate F(b) - F(a) where F is the antiderivative. Find the integral first, then substitute bounds."
    ),

    "area_under_curve": StepType(
        id="area_under_curve",
        name="Find Area Under a Curve",
        description="Find the area between a curve and the x-axis",
        category="calculus",
        inputs=[
            InputField("expression", "Curve y = f(x)", "expression",
                       placeholder="", help_text="The curve equation"),
            InputField("var", "Variable", "variable",
                       default="x", placeholder=""),
            InputField("lower", "Lower bound", "expression",
                       placeholder="", help_text="Start of the region"),
            InputField("upper", "Upper bound", "expression",
                       placeholder="", help_text="End of the region"),
        ],
        operation="area_under_curve",
        thinking=ThinkingQuestion(
            question="How do we find the area under y = f(x) from x=a to x=b?",
            options=[
                "Integrate f(x) from a to b",
                "Differentiate f(x) from a to b",
                "Evaluate f(a) + f(b)",
                "Set f(x) = 0 and solve",
            ],
            correct="Integrate f(x) from a to b",
            explanation="Area = ∫[a to b] f(x) dx. Integrate the curve equation between the bounds.",
        ),
        next_steps=[],
        marks=3,
        hint="Area = integral of f(x) from a to b. If f(x)<0, area is below x-axis (take absolute value)."
    ),

    "area_between_curves": StepType(
        id="area_between_curves",
        name="Find Area Between Two Curves",
        description="Find the area enclosed between two curves",
        category="calculus",
        inputs=[
            InputField("upper", "Upper curve y₁ = ", "expression",
                       placeholder="", help_text="The curve on top"),
            InputField("lower", "Lower curve y₂ = ", "expression",
                       placeholder="", help_text="The curve on bottom"),
            InputField("var", "Variable", "variable",
                       default="x", placeholder=""),
            InputField("lower_bound", "Lower bound", "expression",
                       placeholder="", help_text="Start of the region"),
            InputField("upper_bound", "Upper bound", "expression",
                       placeholder="", help_text="End of the region"),
        ],
        operation="area_between_curves",
        thinking=ThinkingQuestion(
            question="How do we find the area between two curves y₁ and y₂?",
            options=[
                "Integrate (y₁ - y₂) between the bounds",
                "Integrate (y₁ + y₂) between the bounds",
                "Differentiate (y₁ - y₂)",
                "Set y₁ = y₂ and solve",
            ],
            correct="Integrate (y₁ - y₂) between the bounds",
            explanation="Area = ∫[a to b] (y₁ - y₂) dx, where y₁ is the upper curve "
                        "and y₂ is the lower curve.",
        ),
        next_steps=[],
        marks=5,
        hint="Area = integral of (upper - lower) dx. Find where curves intersect to get bounds. Upper = larger y values."
    ),

    # ════════════════════════════════════════════
    # CALCULUS — Limits & Continuity
    # ════════════════════════════════════════════

    "find_limit": StepType(
        id="find_limit",
        name="Find Limit",
        description="Find the limit of an expression as x approaches a point",
        category="calculus",
        inputs=[
            InputField("expression", "Expression", "expression",
                       placeholder="", help_text="The expression"),
            InputField("var", "Variable", "variable",
                       default="x", placeholder=""),
            InputField("point", "Approaching", "expression",
                       placeholder="", help_text="The point x approaches"),
        ],
        operation="find_limit",
        thinking=ThinkingQuestion(
            question="What does a limit describe?",
            options=[
                "The value a function approaches as x gets close to a point",
                "The maximum value of a function",
                "The derivative of a function",
                "The area under a curve",
            ],
            correct="The value a function approaches as x gets close to a point",
            explanation="A limit describes what value f(x) approaches as x gets closer and closer "
                        "to a specific value, even if f is not defined at that point.",
        ),
        next_steps=[],
        marks=2,
        hint="Substitute x=a. If 0/0 form, factor or use L'Hopital (differentiate top and bottom)."
    ),

    "continuity_find_k": StepType(
        id="continuity_find_k",
        name="Find k for Continuity",
        description="Find the value of k that makes a piecewise function continuous",
        category="calculus",
        inputs=[
            InputField("expression", "Piecewise function", "expression",
                       placeholder="",
                       help_text="Enter as Piecewise((expr1, cond1), (expr2, cond2))"),
            InputField("var", "Variable", "variable",
                       default="x", placeholder=""),
            InputField("point", "Point of continuity", "expression",
                       placeholder="", help_text="Where continuity is checked"),
        ],
        operation="continuity_find_k",
        thinking=ThinkingQuestion(
            question="For a function to be continuous at x = a, what must be true?",
            options=[
                "Left limit = Right limit = f(a)",
                "Left limit = Right limit (f(a) doesn't matter)",
                "f(a) = 0",
                "The derivative exists at x = a",
            ],
            correct="Left limit = Right limit = f(a)",
            explanation="For continuity at x=a: lim(x→a⁻) f(x) = lim(x→a⁺) f(x) = f(a). "
                        "All three must be equal.",
        ),
        next_steps=[],
        marks=2,
        hint="For continuity at x=a: left limit = right limit = f(a). Set them equal and solve for k."
    ),

    # ════════════════════════════════════════════
    # CALCULUS — Differential Equations
    # ════════════════════════════════════════════

    "differential_equation": StepType(
        id="differential_equation",
        name="Solve Differential Equation",
        description="Solve a first-order differential equation",
        category="calculus",
        inputs=[
            InputField("expression", "Differential equation", "expression",
                       placeholder="",
                       help_text="Use dy/dx for the derivative. Include = sign."),
            InputField("var", "Independent variable", "variable",
                       default="x", placeholder=""),
        ],
        operation="differential_equation",
        thinking=ThinkingQuestion(
            question="What is a first-order linear differential equation?",
            options=[
                "An equation involving dy/dx and y, where dy/dx appears to the first power",
                "An equation involving only dy/dx (no y)",
                "An equation involving second derivatives",
                "An equation with no derivatives",
            ],
            correct="An equation involving dy/dx and y, where dy/dx appears to the first power",
            explanation="A first-order linear DE has the form dy/dx + P(x)y = Q(x). "
                        "We solve it using an integrating factor.",
        ),
        next_steps=[],
        marks=5,
        hint="Separate variables: dy/dx = f(x)g(y) -> dy/g(y) = f(x)dx. Integrate both sides."
    ),

    # ════════════════════════════════════════════
    # ALGEBRA
    # ════════════════════════════════════════════

    "solve_equation": StepType(
        id="solve_equation",
        name="Solve Equation",
        description="Solve an equation for a variable",
        category="algebra",
        inputs=[
            InputField("expression", "Left side (LHS)", "expression",
                       placeholder="", help_text="The left side of the equation"),
            InputField("rhs", "Right side (RHS)", "expression",
                       default="0", placeholder="", required=False,
                       help_text="The right side (default: 0)"),
            InputField("var", "Solve for", "variable",
                       default="x", placeholder=""),
        ],
        operation="solve_equation",
        thinking=ThinkingQuestion(
            question="What does it mean to solve an equation?",
            options=[
                "Find the value(s) of the variable that make the equation true",
                "Find the derivative of the equation",
                "Find the area under the equation",
                "Simplify the equation",
            ],
            correct="Find the value(s) of the variable that make the equation true",
            explanation="Solving an equation means finding all values of the variable "
                        "that satisfy the equation (make LHS = RHS).",
        ),
        next_steps=[],
        marks=2,
        hint="Find x where expression = rhs. For linear: isolate x. For quadratic: use quadratic formula."
    ),

    "solve_system": StepType(
        id="solve_system",
        name="Solve System of Equations",
        description="Solve simultaneous equations with multiple variables",
        category="algebra",
        inputs=[
            InputField("equations", "Equations (one per line)", "list",
                       placeholder="",
                       help_text="Enter each equation on a new line"),
            InputField("var_names", "Variables (comma-separated)", "expression",
                       default="x,y,z", placeholder="", required=False),
        ],
        operation="solve_system",
        thinking=ThinkingQuestion(
            question="What does solving a system of equations mean?",
            options=[
                "Find values for all variables that satisfy ALL equations simultaneously",
                "Find values for one variable at a time",
                "Find the derivative of each equation",
                "Add all equations together",
            ],
            correct="Find values for all variables that satisfy ALL equations simultaneously",
            explanation="A system of equations has a solution when the same set of values "
                        "satisfies every equation at the same time.",
        ),
        next_steps=[],
        marks=5,
        hint="Substitution or elimination. From eq1 express x in terms of y, substitute into eq2."
    ),

    "simplify": StepType(
        id="simplify",
        name="Simplify Expression",
        description="Simplify a mathematical expression",
        category="algebra",
        inputs=[
            InputField("expression", "Expression", "expression",
                       placeholder="", help_text="The expression to simplify"),
        ],
        operation="simplify",
        thinking=ThinkingQuestion(
            question="What does simplifying an expression mean?",
            options=[
                "Rewrite it in a simpler equivalent form",
                "Solve for a variable",
                "Find its derivative",
                "Find its integral",
            ],
            correct="Rewrite it in a simpler equivalent form",
            explanation="Simplification rewrites an expression in an equivalent but simpler form, "
                        "like factoring, canceling, or combining terms.",
        ),
        next_steps=[],
        marks=1,
        hint="Combine like terms, cancel common factors, expand brackets. Use SymPy to simplify."
    ),

    "verify_identity": StepType(
        id="verify_identity",
        name="Verify Identity (Prove That)",
        description="Check if LHS = RHS for a mathematical identity",
        category="algebra",
        inputs=[
            InputField("expression", "LHS (Left Hand Side)", "expression",
                       placeholder="", help_text="The left side"),
            InputField("rhs", "RHS (Right Hand Side)", "expression",
                       placeholder="", help_text="The right side"),
            InputField("var", "Variable", "variable",
                       default="x", placeholder="", required=False),
        ],
        operation="verify_identity",
        thinking=ThinkingQuestion(
            question="How do you prove that LHS = RHS?",
            options=[
                "Show that LHS - RHS = 0 (they are the same expression)",
                "Show that LHS + RHS = 0",
                "Show that LHS × RHS = 0",
                "Show that LHS / RHS = 1",
            ],
            correct="Show that LHS - RHS = 0 (they are the same expression)",
            explanation="To prove LHS = RHS, simplify LHS - RHS and show it equals 0. "
                        "This means both sides are mathematically identical.",
        ),
        next_steps=[],
        marks=3,
        hint="Simplify both sides independently. If LHS = RHS, identity is verified."
    ),

    # ════════════════════════════════════════════
    # MATRICES & DETERMINANTS
    # ════════════════════════════════════════════

    "determinant": StepType(
        id="determinant",
        name="Find Determinant",
        description="Find the determinant of a matrix",
        category="matrices",
        inputs=[
            InputField("matrix", "Matrix", "matrix",
                       placeholder="",
                       help_text="Enter matrix as [[a,b],[c,d]] or [[a,b,c],[d,e,f],[g,h,i]]"),
        ],
        operation="determinant",
        thinking=ThinkingQuestion(
            question="What does the determinant of a matrix tell us?",
            options=[
                "Whether the matrix has an inverse (det ≠ 0 means invertible)",
                "The sum of all elements",
                "The number of rows",
                "The trace of the matrix",
            ],
            correct="Whether the matrix has an inverse (det ≠ 0 means invertible)",
            explanation="If the determinant is non-zero, the matrix has an inverse. "
                        "If det = 0, the matrix is singular (no inverse exists).",
        ),
        next_steps=["matrix_inverse", "solve_system_with_inverse"],
        marks=2,
        hint="2x2: ad-bc. 3x3: expand along first row using cofactors."
    ),

    "matrix_inverse": StepType(
        id="matrix_inverse",
        name="Find Matrix Inverse",
        description="Find the inverse of a square matrix",
        category="matrices",
        inputs=[
            InputField("matrix", "Matrix A", "matrix",
                       placeholder="",
                       help_text="Enter the square matrix"),
        ],
        operation="matrix_inverse",
        thinking=ThinkingQuestion(
            question="What is the inverse of a matrix A?",
            options=[
                "A matrix A⁻¹ such that A × A⁻¹ = I (identity matrix)",
                "A matrix A⁻¹ such that A × A⁻¹ = 0",
                "The transpose of A",
                "The determinant of A",
            ],
            correct="A matrix A⁻¹ such that A × A⁻¹ = I (identity matrix)",
            explanation="The inverse A⁻¹ satisfies A × A⁻¹ = A⁻¹ × A = I. "
                        "Only exists if det(A) ≠ 0.",
        ),
        next_steps=["solve_system_with_inverse"],
        marks=5,
        hint="A^(-1) = adj(A)/det(A). Only exists if det(A) != 0."
    ),

    "solve_system_with_inverse": StepType(
        id="solve_system_with_inverse",
        name="Solve System Using Matrix Inverse",
        description="Solve AX = B using X = A⁻¹B",
        category="matrices",
        inputs=[
            InputField("matrix", "Coefficient matrix A", "matrix",
                       placeholder="",
                       help_text="The coefficient matrix"),
            InputField("rhs", "RHS vector B", "expression",
                       placeholder="",
                       help_text="The right-hand side values, e.g. [10, 5, 0]"),
        ],
        operation="solve_system_with_inverse",
        thinking=ThinkingQuestion(
            question="How do you solve AX = B using matrices?",
            options=[
                "X = A⁻¹ × B (multiply inverse of A by B)",
                "X = A × B",
                "X = B / A",
                "X = A + B",
            ],
            correct="X = A⁻¹ × B (multiply inverse of A by B)",
            explanation="If AX = B, then X = A⁻¹B. First find A⁻¹, then multiply by B "
                        "to get the solution vector X.",
        ),
        next_steps=[],
        marks=5,
        hint="AX = B -> X = A^(-1)B. Find inverse of A, multiply by B."
    ),

    # ════════════════════════════════════════════
    # VECTORS & 3D GEOMETRY
    # ════════════════════════════════════════════

    "dot_product": StepType(
        id="dot_product",
        name="Find Dot Product",
        description="Find the dot product of two vectors",
        category="vectors",
        inputs=[
            InputField("vec1", "Vector 1", "vector",
                       placeholder="", help_text="First vector"),
            InputField("vec2", "Vector 2", "vector",
                       placeholder="", help_text="Second vector"),
        ],
        operation="dot_product",
        thinking=ThinkingQuestion(
            question="What does the dot product of two vectors give?",
            options=[
                "A scalar (single number) related to the angle between them",
                "A vector perpendicular to both",
                "The magnitude of the first vector",
                "The angle between them directly",
            ],
            correct="A scalar (single number) related to the angle between them",
            explanation="Dot product: a·b = |a||b|cos(θ). It gives a scalar value. "
                        "If a·b = 0, the vectors are perpendicular.",
        ),
        next_steps=[],
        marks=2,
        hint="a.b = a1*b1 + a2*b2 + a3*b3. Result is a scalar, not a vector."
    ),

    "cross_product": StepType(
        id="cross_product",
        name="Find Cross Product",
        description="Find the cross product of two 3D vectors",
        category="vectors",
        inputs=[
            InputField("vec1", "Vector 1", "vector",
                       placeholder="", help_text="First vector"),
            InputField("vec2", "Vector 2", "vector",
                       placeholder="", help_text="Second vector"),
        ],
        operation="cross_product",
        thinking=ThinkingQuestion(
            question="What does the cross product of two vectors give?",
            options=[
                "A vector perpendicular to both input vectors",
                "A scalar value",
                "The sum of the two vectors",
                "The angle between the vectors",
            ],
            correct="A vector perpendicular to both input vectors",
            explanation="Cross product a × b gives a vector perpendicular to both a and b. "
                        "Its magnitude = |a||b|sin(θ) = area of the parallelogram formed by a and b.",
        ),
        next_steps=["vector_magnitude"],
        marks=2,
        hint="a x b is perpendicular to both a and b. Use determinant formula with i,j,k unit vectors."
    ),

    "vector_magnitude": StepType(
        id="vector_magnitude",
        name="Find Vector Magnitude",
        description="Find the magnitude (length) of a vector",
        category="vectors",
        inputs=[
            InputField("vec", "Vector", "vector",
                       placeholder="", help_text="The vector"),
        ],
        operation="vector_magnitude",
        thinking=ThinkingQuestion(
            question="How do you find the magnitude of a vector [a, b, c]?",
            options=[
                "√(a² + b² + c²)",
                "a + b + c",
                "a × b × c",
                "√(a + b + c)",
            ],
            correct="√(a² + b² + c²)",
            explanation="Magnitude = √(a² + b² + c²). It's the length of the vector "
                        "using the Pythagorean theorem in 3D.",
        ),
        next_steps=[],
        marks=1,
        hint="|v| = sqrt(v1^2 + v2^2 + v3^2). Pythagorean theorem in 3D."
    ),

    # ════════════════════════════════════════════
    # LINEAR PROGRAMMING
    # ════════════════════════════════════════════

    "lpp_corner_points": StepType(
        id="lpp_corner_points",
        name="Evaluate LPP at Corner Points",
        description="Find max/min of objective function at corner points of feasible region",
        category="lpp",
        inputs=[
            InputField("objective", "Objective function Z = ", "expression",
                       placeholder="", help_text="The objective to maximize/minimize"),
            InputField("corner_points", "Corner points (one per line: x,y)", "list",
                       placeholder="",
                       help_text="Each line: x,y coordinates of a corner point"),
            InputField("var_names", "Variables", "expression",
                       default="x,y", placeholder="", required=False),
        ],
        operation="lpp_corner_points",
        thinking=ThinkingQuestion(
            question="In LPP, where does the optimal value of the objective function occur?",
            options=[
                "At one of the corner points of the feasible region",
                "At the center of the feasible region",
                "At the origin",
                "Anywhere inside the feasible region",
            ],
            correct="At one of the corner points of the feasible region",
            explanation="The maximum or minimum of the objective function in LPP always "
                        "occurs at a corner point (vertex) of the feasible region. "
                        "Evaluate Z at each corner point and compare.",
        ),
        next_steps=[],
        marks=3,
        hint="Evaluate Z = ax+by at each corner point. Maximum/minimum of Z is at one of the corners."
    ),

    # ════════════════════════════════════════════
    # BASIC ARITHMETIC (Class 1-5)
    # ════════════════════════════════════════════

    "arithmetic": StepType(
        id="arithmetic",
        name="Basic Arithmetic",
        description="Evaluate a basic arithmetic expression",
        category="arithmetic",
        inputs=[
            InputField("expression", "Expression", "expression",
                       placeholder="", help_text="Enter the calculation"),
        ],
        operation="arithmetic",
        thinking=ThinkingQuestion(
            question="What is the order of operations (BODMAS)?",
            options=[
                "Brackets, Orders, Division, Multiplication, Addition, Subtraction",
                "Addition, Subtraction, Multiplication, Division",
                "Left to right always",
                "Multiplication first, then everything else",
            ],
            correct="Brackets, Orders, Division, Multiplication, Addition, Subtraction",
            explanation="BODMAS: Brackets → Orders (powers) → Division/Multiplication → Addition/Subtraction.",
        ),
        next_steps=[],
        marks=1,
        hint="Use BODMAS: Brackets, Orders, Division, Multiplication, Addition, Subtraction. Type +,-,*,/ for operations."
    ),

    "percentage": StepType(
        id="percentage",
        name="Find Percentage",
        description="Find what percentage one number is of another",
        category="arithmetic",
        inputs=[
            InputField("part", "Part value", "expression", placeholder=""),
            InputField("whole", "Whole value", "expression", placeholder=""),
        ],
        operation="percentage",
        thinking=ThinkingQuestion(
            question="How do you find what percentage part is of whole?",
            options=[
                "(part / whole) × 100",
                "(whole / part) × 100",
                "part × whole",
                "part + whole",
            ],
            correct="(part / whole) × 100",
            explanation="Percentage = (part / whole) × 100. E.g., 25 out of 200 = 12.5%.",
        ),
        next_steps=[],
        marks=1,
        hint="Percentage = (part/whole) x 100. Example: 25 out of 50 = 50%."
    ),

    "percentage_of": StepType(
        id="percentage_of",
        name="Find Percentage of a Number",
        description="Find X% of a number",
        category="arithmetic",
        inputs=[
            InputField("percent", "Percentage (%)", "expression", placeholder=""),
            InputField("whole", "Number", "expression", placeholder=""),
        ],
        operation="percentage_of",
        thinking=ThinkingQuestion(
            question="How do you find X% of a number?",
            options=[
                "(X / 100) × number",
                "X × number",
                "number / X",
                "X + number",
            ],
            correct="(X / 100) × number",
            explanation="To find X% of N: (X/100) × N. E.g., 15% of 200 = 30.",
        ),
        next_steps=[],
        marks=1,
        hint="X% of N = (X/100) x N. Example: 15% of 200 = 30."
    ),

    "percentage_change": StepType(
        id="percentage_change",
        name="Percentage Increase/Decrease",
        description="Find percentage change from old to new value",
        category="arithmetic",
        inputs=[
            InputField("old", "Original value", "expression", placeholder=""),
            InputField("new", "New value", "expression", placeholder=""),
        ],
        operation="percentage_change",
        thinking=ThinkingQuestion(
            question="How do you calculate percentage change?",
            options=[
                "((new - old) / old) × 100",
                "(new / old) × 100",
                "(old / new) × 100",
                "new - old",
            ],
            correct="((new - old) / old) × 100",
            explanation="Percentage change = ((new - old) / old) × 100. Positive = increase, negative = decrease.",
        ),
        next_steps=[],
        marks=2,
        hint="Change% = ((new-old)/old) x 100. Positive = increase, negative = decrease."
    ),

    # ════════════════════════════════════════════
    # COMMERCIAL MATH (Class 6-10)
    # ════════════════════════════════════════════

    "simple_interest": StepType(
        id="simple_interest",
        name="Simple Interest",
        description="Calculate SI = P×R×T/100",
        category="commercial",
        inputs=[
            InputField("principal", "Principal (₹)", "expression", placeholder=""),
            InputField("rate", "Rate (%)", "expression", placeholder=""),
            InputField("time", "Time (years)", "expression", placeholder=""),
        ],
        operation="simple_interest",
        thinking=ThinkingQuestion(
            question="What is the formula for Simple Interest?",
            options=[
                "SI = (P × R × T) / 100",
                "SI = P × R + T",
                "SI = P + R + T",
                "SI = P × (1 + R/100)^T",
            ],
            correct="SI = (P × R × T) / 100",
            explanation="SI = (P × R × T) / 100, where P=principal, R=rate%, T=time in years.",
        ),
        next_steps=[],
        marks=2,
        hint="SI = (P x R x T)/100. P=principal, R=rate%, T=years. Amount = P + SI."
    ),

    "compound_interest": StepType(
        id="compound_interest",
        name="Compound Interest",
        description="Calculate CI = P(1 + R/(100n))^(nT) - P",
        category="commercial",
        inputs=[
            InputField("principal", "Principal (₹)", "expression", placeholder=""),
            InputField("rate", "Rate (%)", "expression", placeholder=""),
            InputField("time", "Time (years)", "expression", placeholder=""),
            InputField("n", "Compounded (1=annual, 2=semi-annual, 4=quarterly)", "number",
                       default="1", required=False),
        ],
        operation="compound_interest",
        thinking=ThinkingQuestion(
            question="What is the formula for Compound Interest?",
            options=[
                "A = P(1 + R/(100n))^(nT), CI = A - P",
                "CI = P × R × T / 100",
                "CI = P + R + T",
                "CI = P × R^T",
            ],
            correct="A = P(1 + R/(100n))^(nT), CI = A - P",
            explanation="Amount A = P(1 + R/(100n))^(nT). CI = A - P. n = times compounded per year.",
        ),
        next_steps=[],
        marks=3,
        hint="A = P(1 + R/100)^T. CI = A - P. Type principal, rate, time."
    ),

    "profit_loss": StepType(
        id="profit_loss",
        name="Profit / Loss",
        description="Calculate profit or loss from CP and SP",
        category="commercial",
        inputs=[
            InputField("cp", "Cost Price (₹)", "expression", placeholder=""),
            InputField("sp", "Selling Price (₹)", "expression", placeholder=""),
        ],
        operation="profit_loss",
        thinking=ThinkingQuestion(
            question="When is there a profit?",
            options=[
                "When SP > CP",
                "When CP > SP",
                "When SP = CP",
                "When CP = 0",
            ],
            correct="When SP > CP",
            explanation="Profit = SP - CP (when SP > CP). Loss = CP - SP (when CP > SP). "
                        "Profit% = (Profit/CP) × 100.",
        ),
        next_steps=[],
        marks=2,
        hint="Profit = SP - CP. Loss = CP - SP. Profit% = (Profit/CP) x 100."
    ),

    "discount": StepType(
        id="discount",
        name="Discount Calculation",
        description="Find selling price after discount",
        category="commercial",
        inputs=[
            InputField("mp", "Marked Price (₹)", "expression", placeholder=""),
            InputField("discount_pct", "Discount (%)", "expression", placeholder=""),
        ],
        operation="discount",
        thinking=ThinkingQuestion(
            question="How do you calculate the selling price after a discount?",
            options=[
                "SP = MP - (Discount% × MP / 100)",
                "SP = MP + Discount%",
                "SP = MP × Discount%",
                "SP = MP / Discount%",
            ],
            correct="SP = MP - (Discount% × MP / 100)",
            explanation="Discount = (Discount% × MP) / 100. SP = MP - Discount.",
        ),
        next_steps=[],
        marks=2,
        hint="Discount = MP - SP. SP = MP x (1 - d/100). Type marked price and discount %."
    ),

    "ratio_proportion": StepType(
        id="ratio_proportion",
        name="Ratio and Proportion",
        description="Find d in a:b = c:d",
        category="commercial",
        inputs=[
            InputField("a", "First term (a)", "expression", placeholder=""),
            InputField("b", "Second term (b)", "expression", placeholder=""),
            InputField("c", "Third term (c)", "expression", placeholder=""),
        ],
        operation="ratio_proportion",
        thinking=ThinkingQuestion(
            question="In a proportion a:b = c:d, how do you find d?",
            options=[
                "d = (b × c) / a",
                "d = (a × c) / b",
                "d = (a × b) / c",
                "d = a + b + c",
            ],
            correct="d = (b × c) / a",
            explanation="In a:b = c:d, cross-multiply: a×d = b×c, so d = (b×c)/a.",
        ),
        next_steps=[],
        marks=1,
        hint="a:b = c:d means a*d = b*c. Cross-multiply to find unknown."
    ),

    # ════════════════════════════════════════════
    # NUMBER THEORY (Class 6-10)
    # ════════════════════════════════════════════

    "hcf_lcm": StepType(
        id="hcf_lcm",
        name="HCF and LCM",
        description="Find HCF (GCD) and LCM of two or more numbers",
        category="number_theory",
        inputs=[
            InputField("numbers", "Numbers (comma-separated)", "expression",
                       placeholder="e.g. 12, 18, 24",
                       help_text="Enter 2 or more numbers separated by commas"),
        ],
        operation="hcf_lcm",
        thinking=ThinkingQuestion(
            question="What is the relationship between HCF, LCM, and the two numbers?",
            options=[
                "HCF × LCM = a × b",
                "HCF + LCM = a + b",
                "HCF = LCM",
                "HCF / LCM = a / b",
            ],
            correct="HCF × LCM = a × b",
            explanation="For any two numbers: HCF × LCM = product of the two numbers.",
        ),
        next_steps=[],
        marks=2,
        hint="HCF = largest common factor. LCM = smallest common multiple. HCF x LCM = a x b."
    ),

    "prime_factorization": StepType(
        id="prime_factorization",
        name="Prime Factorization",
        description="Find prime factors of a number",
        category="number_theory",
        inputs=[
            InputField("n", "Number", "expression", placeholder=""),
        ],
        operation="prime_factorization",
        thinking=ThinkingQuestion(
            question="What is prime factorization?",
            options=[
                "Expressing a number as a product of prime numbers",
                "Adding prime numbers together",
                "Finding the largest prime factor",
                "Checking if a number is prime",
            ],
            correct="Expressing a number as a product of prime numbers",
            explanation="Prime factorization breaks a number into its prime factors. "
                        "E.g., 60 = 2² × 3 × 5.",
        ),
        next_steps=[],
        marks=2,
        hint="Divide by smallest primes: 2,3,5,7,... until you reach 1. Example: 60 = 2x2x3x5."
    ),

    "is_prime": StepType(
        id="is_prime",
        name="Check if Prime",
        description="Check if a number is prime",
        category="number_theory",
        inputs=[
            InputField("n", "Number", "expression", placeholder=""),
        ],
        operation="is_prime",
        thinking=ThinkingQuestion(
            question="What is a prime number?",
            options=[
                "A number divisible only by 1 and itself",
                "A number divisible by 2",
                "An odd number",
                "A number greater than 10",
            ],
            correct="A number divisible only by 1 and itself",
            explanation="A prime number has exactly two factors: 1 and itself. E.g., 2, 3, 5, 7, 11...",
        ),
        next_steps=[],
        marks=1,
        hint="Check if number has only two factors: 1 and itself. Test divisibility by 2,3,5,7 up to sqrt(n)."
    ),

    # ════════════════════════════════════════════
    # EXPONENTS & ROOTS (Class 7-10)
    # ════════════════════════════════════════════

    "exponents": StepType(
        id="exponents",
        name="Exponents (Powers)",
        description="Evaluate base raised to a power",
        category="arithmetic",
        inputs=[
            InputField("a", "Base", "expression", placeholder=""),
            InputField("b", "Power", "expression", placeholder=""),
        ],
        operation="exponents",
        thinking=ThinkingQuestion(
            question="What does 2³ mean?",
            options=[
                "2 × 2 × 2 = 8",
                "2 × 3 = 6",
                "2 + 3 = 5",
                "3² = 9",
            ],
            correct="2 × 2 × 2 = 8",
            explanation="a^n means a multiplied by itself n times. 2³ = 2×2×2 = 8.",
        ),
        next_steps=[],
        marks=1,
        hint="a^n = a multiplied n times. a^m x a^n = a^(m+n). a^m / a^n = a^(m-n). (a^m)^n = a^(mn)."
    ),

    "square_root": StepType(
        id="square_root",
        name="Square Root",
        description="Find the square root of a number",
        category="arithmetic",
        inputs=[
            InputField("n", "Number", "expression", placeholder=""),
        ],
        operation="square_root",
        thinking=ThinkingQuestion(
            question="What is the square root of a number?",
            options=[
                "A number that when multiplied by itself gives the original number",
                "Half of the number",
                "The number divided by 2",
                "The number squared",
            ],
            correct="A number that when multiplied by itself gives the original number",
            explanation="√n is the number that gives n when squared. √144 = 12 because 12² = 144.",
        ),
        next_steps=[],
        marks=1,
        hint="sqrt(n) = number that squared gives n. sqrt(25)=5. Type as sqrt(25)."
    ),

    "cube_root": StepType(
        id="cube_root",
        name="Cube Root",
        description="Find the cube root of a number",
        category="arithmetic",
        inputs=[
            InputField("n", "Number", "expression", placeholder=""),
        ],
        operation="cube_root",
        thinking=ThinkingQuestion(
            question="What is the cube root of 27?",
            options=[
                "3 (because 3³ = 27)",
                "9 (because 9 × 3 = 27)",
                "27",
                "1/3",
            ],
            correct="3 (because 3³ = 27)",
            explanation="∛n is the number that gives n when cubed. ∛27 = 3 because 3³ = 27.",
        ),
        next_steps=[],
        marks=1,
        hint="cbrt(n) = number that cubed gives n. cbrt(27)=3. Type the number."
    ),

    # ════════════════════════════════════════════
    # POLYNOMIALS (Class 9-10)
    # ════════════════════════════════════════════

    "polynomial_zeros": StepType(
        id="polynomial_zeros",
        name="Find Zeros of Polynomial",
        description="Find roots of a polynomial equation",
        category="algebra",
        inputs=[
            InputField("expression", "Polynomial f(x)", "expression",
                       placeholder=""),
            InputField("var", "Variable", "variable", default="x", required=False),
        ],
        operation="polynomial_zeros",
        thinking=ThinkingQuestion(
            question="What are the zeros of a polynomial?",
            options=[
                "Values of x where f(x) = 0",
                "Values of x where f(x) = 1",
                "The coefficients of the polynomial",
                "The degree of the polynomial",
            ],
            correct="Values of x where f(x) = 0",
            explanation="Zeros are the values of x that make the polynomial equal to zero. "
                        "E.g., for x²-5x+6, zeros are x=2 and x=3.",
        ),
        next_steps=["factor_polynomial"],
        marks=2,
        hint="Set polynomial = 0, solve for x. Quadratic: use quadratic formula. Type using ** for powers."
    ),

    "factor_polynomial": StepType(
        id="factor_polynomial",
        name="Factor Polynomial",
        description="Factor a polynomial expression",
        category="algebra",
        inputs=[
            InputField("expression", "Polynomial", "expression",
                       placeholder=""),
        ],
        operation="factor_polynomial",
        thinking=ThinkingQuestion(
            question="What does factoring a polynomial mean?",
            options=[
                "Writing it as a product of simpler expressions",
                "Finding its derivative",
                "Finding its roots",
                "Expanding it",
            ],
            correct="Writing it as a product of simpler expressions",
            explanation="Factoring rewrites a polynomial as a product. E.g., x²-5x+6 = (x-2)(x-3).",
        ),
        next_steps=[],
        marks=2,
        hint="Find common factors or use identities. x^2-5x+6 = (x-2)(x-3). Type the polynomial."
    ),

    "expand_expression": StepType(
        id="expand_expression",
        name="Expand Expression",
        description="Expand a factored or compact expression",
        category="algebra",
        inputs=[
            InputField("expression", "Expression", "expression",
                       placeholder=""),
        ],
        operation="expand_expression",
        thinking=ThinkingQuestion(
            question="What does expanding (x+2)(x+3) give?",
            options=[
                "x² + 5x + 6",
                "x² + 6",
                "2x + 5",
                "x² + 2x + 3",
            ],
            correct="x² + 5x + 6",
            explanation="Expanding uses the distributive property: (x+2)(x+3) = x²+3x+2x+6 = x²+5x+6.",
        ),
        next_steps=[],
        marks=1,
        hint="Multiply out brackets using distributive law. (x+2)(x+3) = x^2+5x+6."
    ),

    "polynomial_division": StepType(
        id="polynomial_division",
        name="Polynomial Division",
        description="Divide one polynomial by another",
        category="algebra",
        inputs=[
            InputField("dividend", "Dividend polynomial", "expression",
                       placeholder=""),
            InputField("divisor", "Divisor polynomial", "expression",
                       placeholder=""),
            InputField("var", "Variable", "variable", default="x", required=False),
        ],
        operation="polynomial_division",
        thinking=ThinkingQuestion(
            question="What is polynomial long division?",
            options=[
                "Dividing one polynomial by another to get quotient and remainder",
                "Multiplying two polynomials",
                "Finding the GCD of polynomials",
                "Factoring a polynomial",
            ],
            correct="Dividing one polynomial by another to get quotient and remainder",
            explanation="Polynomial division gives quotient Q(x) and remainder R(x) such that "
                        "Dividend = Q(x) × Divisor + R(x).",
        ),
        next_steps=[],
        marks=3,
        hint="Long division of polynomials. Divide highest terms first, multiply, subtract, repeat."
    ),

    # ════════════════════════════════════════════
    # SEQUENCES & SERIES (Class 10-11)
    # ════════════════════════════════════════════

    "ap_nth_term": StepType(
        id="ap_nth_term",
        name="AP — nth Term",
        description="Find the nth term of an Arithmetic Progression",
        category="sequences",
        inputs=[
            InputField("a", "First term (a)", "expression", placeholder=""),
            InputField("d", "Common difference (d)", "expression", placeholder=""),
            InputField("n", "Term number (n)", "expression", placeholder=""),
        ],
        operation="ap_nth_term",
        thinking=ThinkingQuestion(
            question="What is the formula for the nth term of an AP?",
            options=[
                "a_n = a + (n-1)d",
                "a_n = a × d^(n-1)",
                "a_n = a + n×d",
                "a_n = a × n + d",
            ],
            correct="a_n = a + (n-1)d",
            explanation="AP nth term: a_n = a + (n-1)d, where a=first term, d=common difference.",
        ),
        next_steps=["ap_sum"],
        marks=2,
        hint="a_n = a + (n-1)d. a=first term, d=common difference."
    ),

    "ap_sum": StepType(
        id="ap_sum",
        name="AP — Sum of n Terms",
        description="Find sum of first n terms of an AP",
        category="sequences",
        inputs=[
            InputField("a", "First term (a)", "expression", placeholder=""),
            InputField("d", "Common difference (d)", "expression", placeholder=""),
            InputField("n", "Number of terms (n)", "expression", placeholder=""),
        ],
        operation="ap_sum",
        thinking=ThinkingQuestion(
            question="What is the formula for the sum of n terms of an AP?",
            options=[
                "S_n = n/2 × [2a + (n-1)d]",
                "S_n = a × n × d",
                "S_n = a + d",
                "S_n = n × a",
            ],
            correct="S_n = n/2 × [2a + (n-1)d]",
            explanation="AP sum: S_n = n/2 × [2a + (n-1)d] = n/2 × (first + last term).",
        ),
        next_steps=[],
        marks=3,
        hint="S_n = n/2 x (2a + (n-1)d) = n/2 x (a + l). l=last term."
    ),

    "gp_nth_term": StepType(
        id="gp_nth_term",
        name="GP — nth Term",
        description="Find the nth term of a Geometric Progression",
        category="sequences",
        inputs=[
            InputField("a", "First term (a)", "expression", placeholder=""),
            InputField("r", "Common ratio (r)", "expression", placeholder=""),
            InputField("n", "Term number (n)", "expression", placeholder=""),
        ],
        operation="gp_nth_term",
        thinking=ThinkingQuestion(
            question="What is the formula for the nth term of a GP?",
            options=[
                "a_n = a × r^(n-1)",
                "a_n = a + (n-1)r",
                "a_n = a × n × r",
                "a_n = a^r",
            ],
            correct="a_n = a × r^(n-1)",
            explanation="GP nth term: a_n = a × r^(n-1), where a=first term, r=common ratio.",
        ),
        next_steps=["gp_sum"],
        marks=2,
        hint="a_n = a x r^(n-1). a=first term, r=common ratio."
    ),

    "gp_sum": StepType(
        id="gp_sum",
        name="GP — Sum of n Terms",
        description="Find sum of first n terms of a GP",
        category="sequences",
        inputs=[
            InputField("a", "First term (a)", "expression", placeholder=""),
            InputField("r", "Common ratio (r)", "expression", placeholder=""),
            InputField("n", "Number of terms (n)", "expression", placeholder=""),
        ],
        operation="gp_sum",
        thinking=ThinkingQuestion(
            question="What is the formula for the sum of n terms of a GP (r ≠ 1)?",
            options=[
                "S_n = a(r^n - 1) / (r - 1)",
                "S_n = a × n × r",
                "S_n = a + r",
                "S_n = n/2 × (a + r)",
            ],
            correct="S_n = a(r^n - 1) / (r - 1)",
            explanation="GP sum: S_n = a(r^n - 1)/(r-1) for r≠1. If r=1, S_n = a×n.",
        ),
        next_steps=[],
        marks=3,
        hint="S_n = a(r^n - 1)/(r-1) for r>1. For r<1: a(1-r^n)/(1-r)."
    ),

    "gp_infinite_sum": StepType(
        id="gp_infinite_sum",
        name="GP — Infinite Sum",
        description="Find sum of infinite GP (|r| < 1)",
        category="sequences",
        inputs=[
            InputField("a", "First term (a)", "expression", placeholder=""),
            InputField("r", "Common ratio (r, |r|<1)", "expression", placeholder=""),
        ],
        operation="gp_infinite_sum",
        thinking=ThinkingQuestion(
            question="When does an infinite GP converge, and what is its sum?",
            options=[
                "Converges when |r| < 1, S = a/(1-r)",
                "Converges when |r| > 1, S = a/(1+r)",
                "Always converges, S = a×r",
                "Never converges",
            ],
            correct="Converges when |r| < 1, S = a/(1-r)",
            explanation="Infinite GP converges only when |r| < 1. Sum = a/(1-r). "
                        "E.g., 4 + 2 + 1 + 0.5 + ... = 4/(1-0.5) = 8.",
        ),
        next_steps=[],
        marks=3,
        hint="S = a/(1-r) when |r|<1. Example: a=7.5, r=0.75 -> S=30."
    ),

    # ════════════════════════════════════════════
    # COORDINATE GEOMETRY (Class 9-11)
    # ════════════════════════════════════════════

    "distance_formula": StepType(
        id="distance_formula",
        name="Distance Between Two Points",
        description="Find distance between (x1,y1) and (x2,y2)",
        category="coordinate",
        inputs=[
            InputField("x1", "x₁", "expression", placeholder=""),
            InputField("y1", "y₁", "expression", placeholder=""),
            InputField("x2", "x₂", "expression", placeholder=""),
            InputField("y2", "y₂", "expression", placeholder=""),
        ],
        operation="distance_formula",
        thinking=ThinkingQuestion(
            question="What is the distance formula?",
            options=[
                "d = √[(x₂-x₁)² + (y₂-y₁)²]",
                "d = (x₂-x₁) + (y₂-y₁)",
                "d = (x₂+x₁) × (y₂+y₁)",
                "d = √[(x₂+x₁)² + (y₂+y₁)²]",
            ],
            correct="d = √[(x₂-x₁)² + (y₂-y₁)²]",
            explanation="Distance = √[(x₂-x₁)² + (y₂-y₁)²]. This is the Pythagorean theorem applied "
                        "to the horizontal and vertical distances.",
        ),
        next_steps=[],
        marks=2,
        hint="Distance = sqrt((x2-x1)^2 + (y2-y1)^2). Pythagorean theorem in 2D."
    ),

    "section_formula": StepType(
        id="section_formula",
        name="Section Formula",
        description="Find point dividing line segment in ratio m:n",
        category="coordinate",
        inputs=[
            InputField("x1", "x₁", "expression", placeholder=""),
            InputField("y1", "y₁", "expression", placeholder=""),
            InputField("x2", "x₂", "expression", placeholder=""),
            InputField("y2", "y₂", "expression", placeholder=""),
            InputField("m", "Ratio m", "expression", placeholder=""),
            InputField("n", "Ratio n", "expression", placeholder=""),
        ],
        operation="section_formula",
        thinking=ThinkingQuestion(
            question="What does the section formula find?",
            options=[
                "The point that divides a line segment in a given ratio",
                "The midpoint of a line segment",
                "The length of a line segment",
                "The slope of a line",
            ],
            correct="The point that divides a line segment in a given ratio",
            explanation="Section formula: P = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)) for internal division.",
        ),
        next_steps=[],
        marks=3,
        hint="P divides AB in ratio m:n. P = ((mx2+nx1)/(m+n), (my2+ny1)/(m+n))."
    ),

    "midpoint": StepType(
        id="midpoint",
        name="Midpoint of Line Segment",
        description="Find midpoint between two points",
        category="coordinate",
        inputs=[
            InputField("x1", "x₁", "expression", placeholder=""),
            InputField("y1", "y₁", "expression", placeholder=""),
            InputField("x2", "x₂", "expression", placeholder=""),
            InputField("y2", "y₂", "expression", placeholder=""),
        ],
        operation="midpoint",
        thinking=ThinkingQuestion(
            question="How do you find the midpoint of (x₁,y₁) and (x₂,y₂)?",
            options=[
                "((x₁+x₂)/2, (y₁+y₂)/2)",
                "(x₁+x₂, y₁+y₂)",
                "(x₂-x₁, y₂-y₁)",
                "(x₁×x₂, y₁×y₂)",
            ],
            correct="((x₁+x₂)/2, (y₁+y₂)/2)",
            explanation="Midpoint = average of x-coordinates, average of y-coordinates.",
        ),
        next_steps=[],
        marks=1,
        hint="Midpoint = ((x1+x2)/2, (y1+y2)/2). Average of coordinates."
    ),

    "slope": StepType(
        id="slope",
        name="Slope of Line",
        description="Find slope of line through two points",
        category="coordinate",
        inputs=[
            InputField("x1", "x₁", "expression", placeholder=""),
            InputField("y1", "y₁", "expression", placeholder=""),
            InputField("x2", "x₂", "expression", placeholder=""),
            InputField("y2", "y₂", "expression", placeholder=""),
        ],
        operation="slope",
        thinking=ThinkingQuestion(
            question="What is the formula for the slope of a line through two points?",
            options=[
                "m = (y₂ - y₁) / (x₂ - x₁)",
                "m = (x₂ - x₁) / (y₂ - y₁)",
                "m = (y₂ + y₁) / (x₂ + x₁)",
                "m = y₂ × y₁ / (x₂ × x₁)",
            ],
            correct="m = (y₂ - y₁) / (x₂ - x₁)",
            explanation="Slope = rise/run = (y₂-y₁)/(x₂-x₁). Undefined for vertical lines (x₂=x₁).",
        ),
        next_steps=["line_equation"],
        marks=1,
        hint="Slope m = (y2-y1)/(x2-x1). Positive=upward, negative=downward, 0=horizontal."
    ),

    "line_equation": StepType(
        id="line_equation",
        name="Equation of Line",
        description="Find equation of line through two points",
        category="coordinate",
        inputs=[
            InputField("x1", "x₁", "expression", placeholder=""),
            InputField("y1", "y₁", "expression", placeholder=""),
            InputField("x2", "x₂", "expression", placeholder=""),
            InputField("y2", "y₂", "expression", placeholder=""),
        ],
        operation="line_equation",
        thinking=ThinkingQuestion(
            question="What is the two-point form of a line?",
            options=[
                "(y - y₁)(x₂ - x₁) = (y₂ - y₁)(x - x₁)",
                "y = mx + c",
                "y - y₁ = m(x - x₁)",
                "ax + by + c = 0",
            ],
            correct="(y - y₁)(x₂ - x₁) = (y₂ - y₁)(x - x₁)",
            explanation="Two-point form: (y-y₁)(x₂-x₁) = (y₂-y₁)(x-x₁). "
                        "Can be rearranged to standard form ax+by+c=0.",
        ),
        next_steps=[],
        marks=2,
        hint="y - y1 = m(x - x1). Need one point and slope, or two points."
    ),

    # ════════════════════════════════════════════
    # MENSURATION — 2D (Class 6-10)
    # ════════════════════════════════════════════

    "area_rectangle": StepType(
        id="area_rectangle", name="Area of Rectangle",
        description="Find area and perimeter of rectangle",
        category="mensuration",
        inputs=[
            InputField("length", "Length", "expression", placeholder=""),
            InputField("width", "Width", "expression", placeholder=""),
        ],
        operation="area_rectangle",
        thinking=ThinkingQuestion(
            question="What is the formula for the area of a rectangle?",
            options=["length × width", "length + width", "2 × (length + width)", "length²"],
            correct="length × width",
            explanation="Area = length × width. Perimeter = 2(length + width).",
        ),
        next_steps=[], marks=1,
        hint="Area = length x width. Type both dimensions."
    ),

    "area_triangle": StepType(
        id="area_triangle", name="Area of Triangle",
        description="Find area of triangle from base and height",
        category="mensuration",
        inputs=[
            InputField("base", "Base", "expression", placeholder=""),
            InputField("height", "Height", "expression", placeholder=""),
        ],
        operation="area_triangle",
        thinking=ThinkingQuestion(
            question="What is the formula for the area of a triangle?",
            options=["(base × height) / 2", "base × height", "base + height", "base²"],
            correct="(base × height) / 2",
            explanation="Area = ½ × base × height.",
        ),
        next_steps=[], marks=1,
        hint="Area = 1/2 x base x height. Type base and perpendicular height."
    ),

    "area_circle": StepType(
        id="area_circle", name="Area of Circle",
        description="Find area and circumference of circle",
        category="mensuration",
        inputs=[
            InputField("radius", "Radius", "expression", placeholder=""),
        ],
        operation="area_circle",
        thinking=ThinkingQuestion(
            question="What is the formula for the area of a circle?",
            options=["πr²", "2πr", "πr", "πd²"],
            correct="πr²",
            explanation="Area = πr². Circumference = 2πr.",
        ),
        next_steps=[], marks=1,
        hint="Area = pi x r^2. Type the radius. Use pi for the symbol."
    ),

    "area_trapezium": StepType(
        id="area_trapezium", name="Area of Trapezium",
        description="Find area of trapezium",
        category="mensuration",
        inputs=[
            InputField("a", "Parallel side a", "expression", placeholder=""),
            InputField("b", "Parallel side b", "expression", placeholder=""),
            InputField("height", "Height", "expression", placeholder=""),
        ],
        operation="area_trapezium",
        thinking=ThinkingQuestion(
            question="What is the formula for the area of a trapezium?",
            options=["(a + b)/2 × h", "a × b × h", "(a + b) × h", "a² + b²"],
            correct="(a + b)/2 × h",
            explanation="Area = ½ × (sum of parallel sides) × height = (a+b)/2 × h.",
        ),
        next_steps=[], marks=2,
        hint="Area = 1/2 x (a+b) x h. a,b = parallel sides, h = height."
    ),

    "area_parallelogram": StepType(
        id="area_parallelogram", name="Area of Parallelogram",
        description="Find area of parallelogram",
        category="mensuration",
        inputs=[
            InputField("base", "Base", "expression", placeholder=""),
            InputField("height", "Height", "expression", placeholder=""),
        ],
        operation="area_parallelogram",
        thinking=ThinkingQuestion(
            question="What is the formula for the area of a parallelogram?",
            options=["base × height", "base + height", "base × height / 2", "base²"],
            correct="base × height",
            explanation="Area = base × height (perpendicular height).",
        ),
        next_steps=[], marks=1,
        hint="Area = base x height. Use perpendicular height, not slant side."
    ),

    "area_rhombus": StepType(
        id="area_rhombus", name="Area of Rhombus",
        description="Find area of rhombus from diagonals",
        category="mensuration",
        inputs=[
            InputField("d1", "Diagonal d₁", "expression", placeholder=""),
            InputField("d2", "Diagonal d₂", "expression", placeholder=""),
        ],
        operation="area_rhombus",
        thinking=ThinkingQuestion(
            question="What is the formula for the area of a rhombus?",
            options=["(d₁ × d₂) / 2", "d₁ × d₂", "d₁ + d₂", "d₁² + d₂²"],
            correct="(d₁ × d₂) / 2",
            explanation="Area = ½ × d₁ × d₂ (product of diagonals divided by 2).",
        ),
        next_steps=[], marks=2,
        hint="Area = 1/2 x d1 x d2. d1,d2 = diagonals."
    ),

    "arc_length": StepType(
        id="arc_length", name="Arc Length",
        description="Find length of arc of a circle",
        category="mensuration",
        inputs=[
            InputField("radius", "Radius", "expression", placeholder=""),
            InputField("angle", "Angle (degrees)", "expression", placeholder=""),
        ],
        operation="arc_length",
        thinking=ThinkingQuestion(
            question="What is the formula for arc length?",
            options=["(θ/360) × 2πr", "θ × r", "θ × π × r", "(θ/180) × πr"],
            correct="(θ/360) × 2πr",
            explanation="Arc length = (θ/360) × 2πr, where θ is in degrees.",
        ),
        next_steps=[], marks=2,
        hint="Arc = (angle/360) x 2 x pi x r. Type angle in degrees and radius."
    ),

    "sector_area": StepType(
        id="sector_area", name="Area of Sector",
        description="Find area of a sector of a circle",
        category="mensuration",
        inputs=[
            InputField("radius", "Radius", "expression", placeholder=""),
            InputField("angle", "Angle (degrees)", "expression", placeholder=""),
        ],
        operation="sector_area",
        thinking=ThinkingQuestion(
            question="What is the formula for the area of a sector?",
            options=["(θ/360) × πr²", "θ × r²", "(θ/180) × πr", "πr²"],
            correct="(θ/360) × πr²",
            explanation="Sector area = (θ/360) × πr², where θ is in degrees.",
        ),
        next_steps=[], marks=2,
        hint="Sector = (angle/360) x pi x r^2. Type angle and radius."
    ),

    "pythagoras_hypotenuse": StepType(
        id="pythagoras_hypotenuse", name="Pythagoras — Find Hypotenuse",
        description="Find hypotenuse given two sides",
        category="mensuration",
        inputs=[
            InputField("a", "Side a", "expression", placeholder=""),
            InputField("b", "Side b", "expression", placeholder=""),
        ],
        operation="pythagoras_hypotenuse",
        thinking=ThinkingQuestion(
            question="What is the Pythagorean theorem?",
            options=["c² = a² + b²", "c = a + b", "c² = a² - b²", "c = a × b"],
            correct="c² = a² + b²",
            explanation="In a right triangle: hypotenuse² = side₁² + side₂². c = √(a² + b²).",
        ),
        next_steps=[], marks=1,
        hint="Hypotenuse = sqrt(leg1^2 + leg2^2). Only for right triangles."
    ),

    "pythagoras_side": StepType(
        id="pythagoras_side", name="Pythagoras — Find Missing Side",
        description="Find a side given hypotenuse and one side",
        category="mensuration",
        inputs=[
            InputField("a", "Hypotenuse", "expression", placeholder=""),
            InputField("b", "Known side", "expression", placeholder=""),
        ],
        operation="pythagoras_side",
        thinking=ThinkingQuestion(
            question="How do you find a missing side using Pythagoras?",
            options=["a = √(c² - b²)", "a = c + b", "a = c × b", "a = c - b"],
            correct="a = √(c² - b²)",
            explanation="If c is the hypotenuse: missing side = √(c² - known side²).",
        ),
        next_steps=[], marks=2,
        hint="Missing side = sqrt(hyp^2 - known^2). Only for right triangles."
    ),

    # ════════════════════════════════════════════
    # MENSURATION — 3D (Class 8-10)
    # ════════════════════════════════════════════

    "volume_cube": StepType(
        id="volume_cube", name="Volume of Cube",
        description="Find volume and surface area of cube",
        category="mensuration",
        inputs=[InputField("side", "Side length", "expression", placeholder="")],
        operation="volume_cube",
        thinking=ThinkingQuestion(
            question="What is the volume of a cube with side s?",
            options=["s³", "s²", "6s²", "s"],
            correct="s³",
            explanation="Volume = s³. Surface Area = 6s².",
        ),
        next_steps=[], marks=1,
        hint="Volume = side^3. Type the side length."
    ),

    "volume_cuboid": StepType(
        id="volume_cuboid", name="Volume of Cuboid",
        description="Find volume and surface area of cuboid",
        category="mensuration",
        inputs=[
            InputField("length", "Length", "expression", placeholder=""),
            InputField("width", "Width", "expression", placeholder=""),
            InputField("height", "Height", "expression", placeholder=""),
        ],
        operation="volume_cuboid",
        thinking=ThinkingQuestion(
            question="What is the volume of a cuboid?",
            options=["l × w × h", "l + w + h", "2(lw + wh + lh)", "l² + w² + h²"],
            correct="l × w × h",
            explanation="Volume = l × w × h. Surface Area = 2(lw + wh + lh).",
        ),
        next_steps=[], marks=2,
        hint="Volume = length x width x height. Type all three."
    ),

    "volume_cylinder": StepType(
        id="volume_cylinder", name="Volume of Cylinder",
        description="Find volume and surface area of cylinder",
        category="mensuration",
        inputs=[
            InputField("radius", "Radius", "expression", placeholder=""),
            InputField("height", "Height", "expression", placeholder=""),
        ],
        operation="volume_cylinder",
        thinking=ThinkingQuestion(
            question="What is the volume of a cylinder?",
            options=["πr²h", "2πrh", "πr²", "πrh"],
            correct="πr²h",
            explanation="Volume = πr²h. Surface Area = 2πr(r + h).",
        ),
        next_steps=[], marks=2,
        hint="Volume = pi x r^2 x h. Type radius and height."
    ),

    "volume_cone": StepType(
        id="volume_cone", name="Volume of Cone",
        description="Find volume of cone",
        category="mensuration",
        inputs=[
            InputField("radius", "Radius", "expression", placeholder=""),
            InputField("height", "Height", "expression", placeholder=""),
        ],
        operation="volume_cone",
        thinking=ThinkingQuestion(
            question="What is the volume of a cone?",
            options=["πr²h/3", "πr²h", "2πr", "πrh"],
            correct="πr²h/3",
            explanation="Volume = ⅓πr²h. Slant height l = √(r² + h²). SA = πr(r + l).",
        ),
        next_steps=[], marks=2,
        hint="Volume = 1/3 x pi x r^2 x h. Type radius and height."
    ),

    "volume_sphere": StepType(
        id="volume_sphere", name="Volume of Sphere",
        description="Find volume and surface area of sphere",
        category="mensuration",
        inputs=[InputField("radius", "Radius", "expression", placeholder="")],
        operation="volume_sphere",
        thinking=ThinkingQuestion(
            question="What is the volume of a sphere?",
            options=["4πr³/3", "4πr²", "πr³", "2πr"],
            correct="4πr³/3",
            explanation="Volume = (4/3)πr³. Surface Area = 4πr².",
        ),
        next_steps=[], marks=2,
        hint="Volume = 4/3 x pi x r^3. Type the radius."
    ),

    "volume_hemisphere": StepType(
        id="volume_hemisphere", name="Volume of Hemisphere",
        description="Find volume and surface area of hemisphere",
        category="mensuration",
        inputs=[InputField("radius", "Radius", "expression", placeholder="")],
        operation="volume_hemisphere",
        thinking=ThinkingQuestion(
            question="What is the volume of a hemisphere?",
            options=["2πr³/3", "4πr³/3", "πr³", "3πr²"],
            correct="2πr³/3",
            explanation="Volume = (2/3)πr³ (half of sphere). Surface Area = 3πr².",
        ),
        next_steps=[], marks=2,
        hint="Volume = 2/3 x pi x r^3. Half of sphere volume."
    ),

    "volume_frustum": StepType(
        id="volume_frustum", name="Volume of Frustum",
        description="Find volume of frustum of a cone",
        category="mensuration",
        inputs=[
            InputField("r1", "Top radius r₁", "expression", placeholder=""),
            InputField("r2", "Bottom radius r₂", "expression", placeholder=""),
            InputField("height", "Height", "expression", placeholder=""),
        ],
        operation="volume_frustum",
        thinking=ThinkingQuestion(
            question="What is the volume of a frustum of a cone?",
            options=["πh/3 × (r₁² + r₁r₂ + r₂²)", "πr²h", "πh(r₁ + r₂)", "πr₁²r₂²h"],
            correct="πh/3 × (r₁² + r₁r₂ + r₂²)",
            explanation="V = (πh/3)(r₁² + r₁r₂ + r₂²), where r₁ and r₂ are the two radii.",
        ),
        next_steps=[], marks=3,
        hint="Volume = 1/3 x pi x h x (R^2 + r^2 + Rr). R,r = top/bottom radii, h = height."
    ),

    # ════════════════════════════════════════════
    # STATISTICS (Class 7-12)
    # ════════════════════════════════════════════

    "mean": StepType(
        id="mean", name="Mean (Average)",
        description="Find the mean of a list of numbers",
        category="statistics",
        inputs=[InputField("values", "Values (comma-separated)", "expression",
                           placeholder="")],
        operation="mean",
        thinking=ThinkingQuestion(
            question="How do you find the mean?",
            options=["Sum of values / number of values", "Middle value", "Most frequent value", "Largest value"],
            correct="Sum of values / number of values",
            explanation="Mean = (sum of all values) / (count of values).",
        ),
        next_steps=[], marks=1,
        hint="Mean = sum of all values / count. Add them up, divide by how many."
    ),

    "median": StepType(
        id="median", name="Median",
        description="Find the median of a list of numbers",
        category="statistics",
        inputs=[InputField("values", "Values (comma-separated)", "expression",
                           placeholder="")],
        operation="median",
        thinking=ThinkingQuestion(
            question="What is the median?",
            options=["The middle value when sorted", "The average", "The most frequent value", "The range"],
            correct="The middle value when sorted",
            explanation="Median = middle value (odd count) or average of two middle values (even count).",
        ),
        next_steps=[], marks=1,
        hint="Sort values. Middle one if odd count. Average of two middle if even count."
    ),

    "mode": StepType(
        id="mode", name="Mode",
        description="Find the most frequent value",
        category="statistics",
        inputs=[InputField("values", "Values (comma-separated)", "expression",
                           placeholder="")],
        operation="mode",
        thinking=ThinkingQuestion(
            question="What is the mode?",
            options=["The most frequently occurring value", "The average", "The middle value", "The range"],
            correct="The most frequently occurring value",
            explanation="Mode = the value that appears most often.",
        ),
        next_steps=[], marks=1,
        hint="Most frequently occurring value. Can be more than one mode."
    ),

    "standard_deviation": StepType(
        id="standard_deviation", name="Standard Deviation",
        description="Find standard deviation of data",
        category="statistics",
        inputs=[InputField("values", "Values (comma-separated)", "expression",
                           placeholder="")],
        operation="standard_deviation",
        thinking=ThinkingQuestion(
            question="What does standard deviation measure?",
            options=["How spread out the data is from the mean", "The average value", "The middle value", "The range"],
            correct="How spread out the data is from the mean",
            explanation="SD = √(variance). Variance = average of squared deviations from mean.",
        ),
        next_steps=[], marks=3,
        hint="SD = sqrt(variance). Variance = average of (value - mean)^2. Measures spread."
    ),

    "weighted_mean": StepType(
        id="weighted_mean", name="Weighted Mean",
        description="Find weighted mean of values",
        category="statistics",
        inputs=[
            InputField("values", "Values (comma-separated)", "expression", placeholder=""),
            InputField("weights", "Weights (comma-separated)", "expression", placeholder=""),
        ],
        operation="weighted_mean",
        thinking=ThinkingQuestion(
            question="How do you calculate weighted mean?",
            options=["Σ(v × w) / Σw", "Σv / n", "Σw / n", "v × w"],
            correct="Σ(v × w) / Σw",
            explanation="Weighted mean = sum of (value × weight) / sum of weights.",
        ),
        next_steps=[], marks=2,
        hint="Weighted mean = sum(weight x value) / sum(weights). Type values and weights."
    ),

    "regression_line": StepType(
        id="regression_line", name="Regression Line (y = a + bx)",
        description="Find line of best fit from data",
        category="statistics",
        inputs=[
            InputField("x_values", "X values (comma-separated)", "expression", placeholder=""),
            InputField("y_values", "Y values (comma-separated)", "expression", placeholder=""),
        ],
        operation="regression_line",
        thinking=ThinkingQuestion(
            question="What does a regression line do?",
            options=["Fits the best straight line through data points", "Connects all points", "Finds the mean", "Finds the median"],
            correct="Fits the best straight line through data points",
            explanation="Regression line y = a + bx minimizes the sum of squared errors.",
        ),
        next_steps=[], marks=4,
        hint="y = a + bx. b = sum((x-xbar)(y-ybar)) / sum((x-xbar)^2). a = ybar - b*xbar."
    ),

    "correlation_coefficient": StepType(
        id="correlation_coefficient", name="Correlation Coefficient (r)",
        description="Find Pearson correlation coefficient",
        category="statistics",
        inputs=[
            InputField("x_values", "X values (comma-separated)", "expression", placeholder=""),
            InputField("y_values", "Y values (comma-separated)", "expression", placeholder=""),
        ],
        operation="correlation_coefficient",
        thinking=ThinkingQuestion(
            question="What does the correlation coefficient measure?",
            options=["Strength and direction of linear relationship", "The mean", "The variance", "The slope"],
            correct="Strength and direction of linear relationship",
            explanation="r ranges from -1 (perfect negative) to +1 (perfect positive). 0 = no correlation.",
        ),
        next_steps=[], marks=3,
        hint="r = covariance(x,y) / (sd(x) x sd(y)). Range: -1 to 1. +1=perfect positive, -1=perfect negative."
    ),

    # ════════════════════════════════════════════
    # PROBABILITY (Class 9-12)
    # ════════════════════════════════════════════

    "probability": StepType(
        id="probability", name="Basic Probability",
        description="Find P = favorable / total",
        category="probability",
        inputs=[
            InputField("favorable", "Favorable outcomes", "expression", placeholder=""),
            InputField("total", "Total outcomes", "expression", placeholder=""),
        ],
        operation="probability",
        thinking=ThinkingQuestion(
            question="What is the formula for probability?",
            options=["favorable / total", "total / favorable", "favorable × total", "favorable + total"],
            correct="favorable / total",
            explanation="P(event) = favorable outcomes / total outcomes. Always between 0 and 1.",
        ),
        next_steps=[], marks=1,
        hint="P(event) = favorable / total. Count matching outcomes, divide by all possible."
    ),

    "conditional_probability": StepType(
        id="conditional_probability", name="Conditional Probability",
        description="Find P(A|B) = P(A∩B) / P(B)",
        category="probability",
        inputs=[
            InputField("p_a", "P(A)", "expression", placeholder=""),
            InputField("p_b", "P(B)", "expression", placeholder=""),
            InputField("p_ab", "P(A∩B)", "expression", placeholder=""),
        ],
        operation="conditional_probability",
        thinking=ThinkingQuestion(
            question="What is the formula for conditional probability P(A|B)?",
            options=["P(A∩B) / P(B)", "P(A) / P(B)", "P(A) × P(B)", "P(A) + P(B)"],
            correct="P(A∩B) / P(B)",
            explanation="P(A|B) = P(A∩B) / P(B). Probability of A given that B has occurred.",
        ),
        next_steps=[], marks=3,
        hint="P(A|B) = P(A and B) / P(B). Probability of A given B occurred."
    ),

    "binomial_probability": StepType(
        id="binomial_probability", name="Binomial Probability",
        description="Find P(X=r) = C(n,r) × p^r × (1-p)^(n-r)",
        category="probability",
        inputs=[
            InputField("n", "Number of trials (n)", "expression", placeholder=""),
            InputField("r", "Successes (r)", "expression", placeholder=""),
            InputField("p", "Probability of success (p)", "expression", placeholder=""),
        ],
        operation="binomial_probability",
        thinking=ThinkingQuestion(
            question="What is the binomial probability formula?",
            options=["C(n,r) × p^r × (1-p)^(n-r)", "n × p × r", "p^r", "n! / r!"],
            correct="C(n,r) × p^r × (1-p)^(n-r)",
            explanation="P(X=r) = C(n,r) × p^r × (1-p)^(n-r). Used for repeated independent trials.",
        ),
        next_steps=[], marks=4,
        hint="P(X=r) = C(n,r) x p^r x (1-p)^(n-r). n=trials, r=successes, p=prob of success."
    ),

    # ════════════════════════════════════════════
    # PERMUTATIONS & COMBINATIONS (Class 11)
    # ════════════════════════════════════════════

    "permutation": StepType(
        id="permutation", name="Permutation (nPr)",
        description="Find nPr = n!/(n-r)!",
        category="probability",
        inputs=[
            InputField("n", "n", "expression", placeholder=""),
            InputField("r", "r", "expression", placeholder=""),
        ],
        operation="permutation",
        thinking=ThinkingQuestion(
            question="What does nPr represent?",
            options=["Number of ways to arrange r items from n (order matters)", "Number of ways to choose r from n (order doesn't matter)", "n × r", "n + r"],
            correct="Number of ways to arrange r items from n (order matters)",
            explanation="nPr = n!/(n-r)!. Used when order matters (arrangements).",
        ),
        next_steps=[], marks=2,
        hint="P(n,r) = n!/(n-r)!. Arrangements where order matters. ABC != BAC."
    ),

    "combination": StepType(
        id="combination", name="Combination (nCr)",
        description="Find nCr = n!/(r!(n-r)!)",
        category="probability",
        inputs=[
            InputField("n", "n", "expression", placeholder=""),
            InputField("r", "r", "expression", placeholder=""),
        ],
        operation="combination",
        thinking=ThinkingQuestion(
            question="What does nCr represent?",
            options=["Number of ways to choose r from n (order doesn't matter)", "Number of arrangements", "n × r", "n! / r"],
            correct="Number of ways to choose r from n (order doesn't matter)",
            explanation="nCr = n!/(r!(n-r)!). Used for selections where order doesn't matter.",
        ),
        next_steps=[], marks=2,
        hint="C(n,r) = n!/(r!(n-r)!). Selections where order doesn't matter. {A,B} = {B,A}."
    ),

    "factorial": StepType(
        id="factorial", name="Factorial (n!)",
        description="Find n!",
        category="probability",
        inputs=[InputField("n", "Number", "expression", placeholder="")],
        operation="factorial",
        thinking=ThinkingQuestion(
            question="What is 5!?",
            options=["120", "25", "5", "15"],
            correct="120",
            explanation="n! = n × (n-1) × ... × 1. 5! = 5×4×3×2×1 = 120.",
        ),
        next_steps=[], marks=1,
        hint="n! = n x (n-1) x ... x 1. 0! = 1. 5! = 120."
    ),

    # ════════════════════════════════════════════
    # COMPLEX NUMBERS (Class 11)
    # ════════════════════════════════════════════

    "complex_modulus": StepType(
        id="complex_modulus", name="Modulus of Complex Number",
        description="Find |z| = √(Re² + Im²)",
        category="complex",
        inputs=[InputField("expression", "Complex number z", "expression",
                           placeholder="")],
        operation="complex_modulus",
        thinking=ThinkingQuestion(
            question="What is the modulus of z = a + bi?",
            options=["√(a² + b²)", "a + b", "a - b", "a × b"],
            correct="√(a² + b²)",
            explanation="|z| = √(a² + b²). It's the distance from origin to z in the complex plane.",
        ),
        next_steps=[], marks=2,
        hint="|z| = sqrt(a^2 + b^2) for z = a+bi. Distance from origin in complex plane."
    ),

    "complex_argument": StepType(
        id="complex_argument", name="Argument of Complex Number",
        description="Find arg(z) = tan⁻¹(b/a)",
        category="complex",
        inputs=[InputField("expression", "Complex number z", "expression",
                           placeholder="")],
        operation="complex_argument",
        thinking=ThinkingQuestion(
            question="What is the argument of z = a + bi?",
            options=["tan⁻¹(b/a)", "tan⁻¹(a/b)", "a/b", "b/a"],
            correct="tan⁻¹(b/a)",
            explanation="arg(z) = tan⁻¹(b/a). It's the angle from the positive real axis to z.",
        ),
        next_steps=[], marks=2,
        hint="arg(z) = atan(b/a) for z = a+bi. Angle from positive real axis."
    ),

    # ════════════════════════════════════════════
    # SETS (Class 11)
    # ════════════════════════════════════════════

    "set_operations": StepType(
        id="set_operations", name="Set Operations",
        description="Union, intersection, or difference of two sets",
        category="sets",
        inputs=[
            InputField("set1", "Set A (comma-separated)", "expression", placeholder=""),
            InputField("set2", "Set B (comma-separated)", "expression", placeholder=""),
            InputField("operation", "Operation (union/intersection/difference)", "expression",
                       default="union", required=False),
        ],
        operation="set_operations",
        thinking=ThinkingQuestion(
            question="What is A ∪ B?",
            options=["All elements in A or B (or both)", "Elements in both A and B", "Elements in A but not B", "Elements in B but not A"],
            correct="All elements in A or B (or both)",
            explanation="Union (∪) = all elements. Intersection (∩) = common elements. Difference (-) = in A but not B.",
        ),
        next_steps=[], marks=2,
        hint="Union: all elements in either. Intersection: elements in both. Difference: in A but not B."
    ),

    # ════════════════════════════════════════════
    # CONIC SECTIONS (Class 11)
    # ════════════════════════════════════════════

    "circle_equation": StepType(
        id="circle_equation", name="Equation of Circle",
        description="Find equation from center and radius",
        category="coordinate",
        inputs=[
            InputField("center_x", "Center h", "expression", placeholder=""),
            InputField("center_y", "Center k", "expression", placeholder=""),
            InputField("radius", "Radius r", "expression", placeholder=""),
        ],
        operation="circle_equation",
        thinking=ThinkingQuestion(
            question="What is the equation of a circle with center (h,k) and radius r?",
            options=["(x-h)² + (y-k)² = r²", "x² + y² = r²", "y = mx + c", "x/a + y/b = 1"],
            correct="(x-h)² + (y-k)² = r²",
            explanation="Circle: (x-h)² + (y-k)² = r². Center at (h,k), radius r.",
        ),
        next_steps=[], marks=2,
        hint="(x-h)^2 + (y-k)^2 = r^2. (h,k) = center, r = radius."
    ),

    "parabola_vertex": StepType(
        id="parabola_vertex", name="Vertex of Parabola",
        description="Find vertex of y = ax² + bx + c",
        category="coordinate",
        inputs=[
            InputField("a", "Coefficient a", "expression", placeholder=""),
            InputField("b", "Coefficient b", "expression", placeholder=""),
            InputField("c", "Coefficient c", "expression", placeholder=""),
        ],
        operation="parabola_vertex",
        thinking=ThinkingQuestion(
            question="How do you find the vertex of y = ax² + bx + c?",
            options=["x = -b/(2a), then substitute", "x = b/(2a)", "x = -c/b", "x = 0"],
            correct="x = -b/(2a), then substitute",
            explanation="Vertex x = -b/(2a). Then find y by substituting x back into the equation.",
        ),
        next_steps=[], marks=2,
        hint="y = ax^2 + bx + c. Vertex at x = -b/(2a). Substitute to find y."
    ),

    # ════════════════════════════════════════════
    # BINOMIAL THEOREM (Class 11)
    # ════════════════════════════════════════════

    "binomial_expansion": StepType(
        id="binomial_expansion", name="Binomial Expansion",
        description="Expand (1 + x)^n",
        category="algebra",
        inputs=[
            InputField("n", "Power n", "expression", placeholder=""),
            InputField("expression", "Variable (default x)", "expression",
                       default="x", required=False),
        ],
        operation="binomial_expansion",
        thinking=ThinkingQuestion(
            question="What is the binomial theorem?",
            options=["(1+x)^n = Σ C(n,k) x^k", "(1+x)^n = 1 + x^n", "(1+x)^n = nx", "(1+x)^n = n!"],
            correct="(1+x)^n = Σ C(n,k) x^k",
            explanation="(1+x)^n = C(n,0) + C(n,1)x + C(n,2)x² + ... + C(n,n)x^n.",
        ),
        next_steps=[], marks=3,
        hint="(a+b)^n = sum of C(n,k) x a^(n-k) x b^k for k=0 to n."
    ),

    "binomial_coefficient": StepType(
        id="binomial_coefficient", name="Binomial Coefficient C(n,k)",
        description="Find C(n,k) = n!/(k!(n-k)!)",
        category="algebra",
        inputs=[
            InputField("n", "n", "expression", placeholder=""),
            InputField("r", "k", "expression", placeholder=""),
        ],
        operation="binomial_coefficient",
        thinking=ThinkingQuestion(
            question="What is C(n,k)?",
            options=["n!/(k!(n-k)!)", "n!/k!", "n × k", "n + k"],
            correct="n!/(k!(n-k)!)",
            explanation="C(n,k) = n!/(k!(n-k)!). Number of ways to choose k items from n.",
        ),
        next_steps=[], marks=2,
        hint="C(n,k) = n!/(k!(n-k)!). Number of ways to choose k from n."
    ),

    # ════════════════════════════════════════════
    # LOGARITHMS (Class 9-12)
    # ════════════════════════════════════════════

    "logarithm": StepType(
        id="logarithm", name="Logarithm",
        description="Evaluate log of a number",
        category="algebra",
        inputs=[
            InputField("expression", "Number", "expression", placeholder=""),
            InputField("base", "Base (e for ln, 10 for log₁₀)", "expression",
                       default="e", required=False),
        ],
        operation="logarithm",
        thinking=ThinkingQuestion(
            question="What does log_b(x) mean?",
            options=["The power to which b must be raised to get x", "x divided by b", "b divided by x", "b × x"],
            correct="The power to which b must be raised to get x",
            explanation="log_b(x) = y means b^y = x. E.g., log₁₀(100) = 2 because 10² = 100.",
        ),
        next_steps=[], marks=2,
        hint="log_b(x) = y means b^y = x. log(10)=1, log(e)=0. Natural log ln = log base e."
    ),

    # ════════════════════════════════════════════
    # FRACTIONS (Class 3-8)
    # ════════════════════════════════════════════

    "fraction_add": StepType(
        id="fraction_add", name="Add Fractions",
        description="Add two fractions",
        category="arithmetic",
        inputs=[
            InputField("n1", "Numerator 1", "expression", placeholder=""),
            InputField("d1", "Denominator 1", "expression", placeholder=""),
            InputField("n2", "Numerator 2", "expression", placeholder=""),
            InputField("d2", "Denominator 2", "expression", placeholder=""),
        ],
        operation="fraction_add",
        thinking=ThinkingQuestion(
            question="How do you add fractions with different denominators?",
            options=["Find common denominator, then add numerators", "Add denominators", "Multiply denominators", "Just add numerators"],
            correct="Find common denominator, then add numerators",
            explanation="Find LCM of denominators, convert both fractions, then add numerators.",
        ),
        next_steps=[], marks=1,
        hint="Find common denominator, add numerators. 1/2 + 1/3 = 3/6 + 2/6 = 5/6."
    ),

    "fraction_multiply": StepType(
        id="fraction_multiply", name="Multiply Fractions",
        description="Multiply two fractions",
        category="arithmetic",
        inputs=[
            InputField("n1", "Numerator 1", "expression", placeholder=""),
            InputField("d1", "Denominator 1", "expression", placeholder=""),
            InputField("n2", "Numerator 2", "expression", placeholder=""),
            InputField("d2", "Denominator 2", "expression", placeholder=""),
        ],
        operation="fraction_multiply",
        thinking=ThinkingQuestion(
            question="How do you multiply fractions?",
            options=["Multiply numerators, multiply denominators", "Add numerators and denominators", "Cross multiply", "Divide numerators"],
            correct="Multiply numerators, multiply denominators",
            explanation="(a/b) × (c/d) = (a×c)/(b×d).",
        ),
        next_steps=[], marks=1,
        hint="Multiply numerators, multiply denominators. 2/3 x 3/4 = 6/12 = 1/2."
    ),

    "fraction_divide": StepType(
        id="fraction_divide", name="Divide Fractions",
        description="Divide two fractions",
        category="arithmetic",
        inputs=[
            InputField("n1", "Numerator 1", "expression", placeholder=""),
            InputField("d1", "Denominator 1", "expression", placeholder=""),
            InputField("n2", "Numerator 2", "expression", placeholder=""),
            InputField("d2", "Denominator 2", "expression", placeholder=""),
        ],
        operation="fraction_divide",
        thinking=ThinkingQuestion(
            question="How do you divide fractions?",
            options=["Multiply by the reciprocal of the second fraction", "Multiply denominators", "Subtract numerators", "Invert the first fraction"],
            correct="Multiply by the reciprocal of the second fraction",
            explanation="(a/b) ÷ (c/d) = (a/b) × (d/c) = (a×d)/(b×c).",
        ),
        next_steps=[], marks=1,
        hint="Flip second fraction, multiply. 2/3 / 4/5 = 2/3 x 5/4 = 10/12 = 5/6."
    ),

    # ════════════════════════════════════════════
    # SPEED, DISTANCE, TIME (Class 5-8)
    # ════════════════════════════════════════════

    "speed_distance_time": StepType(
        id="speed_distance_time", name="Speed, Distance, Time",
        description="Find speed, distance, or time (provide any two)",
        category="arithmetic",
        inputs=[
            InputField("speed", "Speed (leave empty to find)", "expression", placeholder="", required=False),
            InputField("distance", "Distance (leave empty to find)", "expression", placeholder="", required=False),
            InputField("time", "Time (leave empty to find)", "expression", placeholder="", required=False),
        ],
        operation="speed_distance_time",
        thinking=ThinkingQuestion(
            question="What is the relationship between speed, distance, and time?",
            options=["Speed = Distance / Time", "Speed = Distance × Time", "Speed = Time / Distance", "Speed = Distance + Time"],
            correct="Speed = Distance / Time",
            explanation="Speed = Distance/Time. Distance = Speed×Time. Time = Distance/Speed.",
        ),
        next_steps=[], marks=2,
        hint="Speed = Distance/Time. Distance = Speed x Time. Time = Distance/Speed."
    ),

    "direct_proportion": StepType(
        id="direct_proportion", name="Direct Proportion",
        description="Find y₂ when x₁:y₁ = x₂:y₂",
        category="arithmetic",
        inputs=[
            InputField("x1", "x₁", "expression", placeholder=""),
            InputField("y1", "y₁", "expression", placeholder=""),
            InputField("x2", "x₂", "expression", placeholder=""),
        ],
        operation="direct_proportion",
        thinking=ThinkingQuestion(
            question="In direct proportion, what happens when one quantity increases?",
            options=["The other increases proportionally", "The other decreases", "The other stays the same", "No relationship"],
            correct="The other increases proportionally",
            explanation="Direct proportion: x₁/y₁ = x₂/y₂. Both increase or both decrease together.",
        ),
        next_steps=[], marks=1,
        hint="y = kx. More x means more y. Find k from one (x,y) pair."
    ),

    "inverse_proportion": StepType(
        id="inverse_proportion", name="Inverse Proportion",
        description="Find y₂ when x₁×y₁ = x₂×y₂",
        category="arithmetic",
        inputs=[
            InputField("x1", "x₁", "expression", placeholder=""),
            InputField("y1", "y₁", "expression", placeholder=""),
            InputField("x2", "x₂", "expression", placeholder=""),
        ],
        operation="inverse_proportion",
        thinking=ThinkingQuestion(
            question="In inverse proportion, what happens when one quantity increases?",
            options=["The other decreases proportionally", "The other increases", "The other stays the same", "No relationship"],
            correct="The other decreases proportionally",
            explanation="Inverse proportion: x₁×y₁ = x₂×y₂. One increases, other decreases.",
        ),
        next_steps=[], marks=1,
        hint="xy = k. More x means less y. Find k from one (x,y) pair."
    ),

    # ════════════════════════════════════════════
    # TRIGONOMETRY (Class 9-12)
    # ════════════════════════════════════════════

    "trig_value": StepType(
        id="trig_value", name="Trigonometric Value",
        description="Evaluate a trigonometric expression",
        category="trigonometry",
        inputs=[InputField("expression", "Expression", "expression",
                           placeholder="")],
        operation="trig_value",
        thinking=ThinkingQuestion(
            question="What is sin(30°)?",
            options=["1/2", "1", "√3/2", "0"],
            correct="1/2",
            explanation="Common values: sin(0°)=0, sin(30°)=1/2, sin(45°)=1/√2, sin(60°)=√3/2, sin(90°)=1.",
        ),
        next_steps=[], marks=1,
        hint="sin(30)=1/2, cos(60)=1/2, tan(45)=1. Use pi/180 for degrees: sin(30*pi/180)."
    ),

    "heights_distances": StepType(
        id="heights_distances", name="Heights and Distances",
        description="Find height using angle of elevation",
        category="trigonometry",
        inputs=[
            InputField("angle", "Angle of elevation (degrees)", "expression", placeholder=""),
            InputField("distance", "Distance from base", "expression", placeholder=""),
        ],
        operation="heights_distances",
        thinking=ThinkingQuestion(
            question="How do you find the height of a tower using angle of elevation?",
            options=["height = distance × tan(angle)", "height = distance × sin(angle)", "height = distance / tan(angle)", "height = distance + angle"],
            correct="height = distance × tan(angle)",
            explanation="In a right triangle: tan(θ) = opposite/adjacent = height/distance. So height = distance × tan(θ).",
        ),
        next_steps=[], marks=3,
        hint="Height = distance x tan(angle). Angle of elevation from ground. Use pi/180 for degrees."
    ),

    "inverse_trig_value": StepType(
        id="inverse_trig_value", name="Inverse Trigonometric Value",
        description="Evaluate an inverse trig expression",
        category="trigonometry",
        inputs=[InputField("expression", "Expression", "expression",
                           placeholder="")],
        operation="inverse_trig_value",
        thinking=ThinkingQuestion(
            question="What does sin⁻¹(1/2) equal?",
            options=["π/6 (30°)", "π/4 (45°)", "π/3 (60°)", "π/2 (90°)"],
            correct="π/6 (30°)",
            explanation="sin⁻¹(1/2) = π/6 because sin(π/6) = 1/2. Range of sin⁻¹ is [-π/2, π/2].",
        ),
        next_steps=[], marks=2,
        hint="sin^(-1)(x) = angle where sin = x. Result in radians. Convert to degrees: x 180/pi."
    ),

    # ════════════════════════════════════════════
    # MATRIX OPERATIONS (Class 12)
    # ════════════════════════════════════════════

    "matrix_multiply": StepType(
        id="matrix_multiply", name="Matrix Multiplication",
        description="Multiply two matrices",
        category="matrices",
        inputs=[
            InputField("matrix1", "Matrix A", "matrix", placeholder=""),
            InputField("matrix2", "Matrix B", "matrix", placeholder=""),
        ],
        operation="matrix_multiply",
        thinking=ThinkingQuestion(
            question="When can you multiply two matrices?",
            options=["When columns of A = rows of B", "When both are square", "When both have same dimensions", "Always"],
            correct="When columns of A = rows of B",
            explanation="A(m×n) × B(n×p) = C(m×p). Columns of A must equal rows of B.",
        ),
        next_steps=[], marks=2,
        hint="Row x column. (mxn) x (nxp) = (mxp). Each element = dot product of row and column."
    ),

    "matrix_add": StepType(
        id="matrix_add", name="Matrix Addition",
        description="Add two matrices",
        category="matrices",
        inputs=[
            InputField("matrix1", "Matrix A", "matrix", placeholder=""),
            InputField("matrix2", "Matrix B", "matrix", placeholder=""),
        ],
        operation="matrix_add",
        thinking=ThinkingQuestion(
            question="When can you add two matrices?",
            options=["When they have the same dimensions", "When both are square", "When columns match", "Always"],
            correct="When they have the same dimensions",
            explanation="Matrices must have the same number of rows and columns to add.",
        ),
        next_steps=[], marks=1,
        hint="Add corresponding elements. Both matrices must be same size."
    ),

    "matrix_transpose": StepType(
        id="matrix_transpose", name="Matrix Transpose",
        description="Find transpose of a matrix (A')",
        category="matrices",
        inputs=[InputField("matrix", "Matrix A", "matrix", placeholder="")],
        operation="matrix_transpose",
        thinking=ThinkingQuestion(
            question="What is the transpose of a matrix?",
            options=["Rows become columns and columns become rows", "Flip upside down", "Negate all elements", "Take the inverse"],
            correct="Rows become columns and columns become rows",
            explanation="Transpose A' swaps rows and columns. A[i][j] becomes A'[j][i].",
        ),
        next_steps=["verify_symmetric", "verify_skew_symmetric"], marks=1,
        hint="Swap rows and columns. Row i becomes column i."
    ),

    "verify_skew_symmetric": StepType(
        id="verify_skew_symmetric", name="Verify Skew-Symmetric",
        description="Check if A' = -A (skew-symmetric)",
        category="matrices",
        inputs=[InputField("matrix", "Matrix A", "matrix",
                           placeholder="")],
        operation="verify_skew_symmetric",
        thinking=ThinkingQuestion(
            question="What makes a matrix skew-symmetric?",
            options=["A' = -A (transpose equals negative)", "A' = A", "A = 0", "A = I"],
            correct="A' = -A (transpose equals negative)",
            explanation="Skew-symmetric: A' = -A. Diagonal elements must be 0, off-diagonal: a[i][j] = -a[j][i].",
        ),
        next_steps=[], marks=2,
        hint="A is skew-symmetric if A = -A^T. Diagonal elements must be 0."
    ),

    "verify_symmetric": StepType(
        id="verify_symmetric", name="Verify Symmetric",
        description="Check if A' = A (symmetric)",
        category="matrices",
        inputs=[InputField("matrix", "Matrix A", "matrix",
                           placeholder="")],
        operation="verify_symmetric",
        thinking=ThinkingQuestion(
            question="What makes a matrix symmetric?",
            options=["A' = A (transpose equals itself)", "A' = -A", "A = I", "A = 0"],
            correct="A' = A (transpose equals itself)",
            explanation="Symmetric: A' = A. Elements satisfy a[i][j] = a[j][i]. Must be square.",
        ),
        next_steps=[], marks=2,
        hint="A is symmetric if A = A^T. Elements mirror across diagonal."
    ),

    # ════════════════════════════════════════════
    # 3D GEOMETRY (Class 12)
    # ════════════════════════════════════════════

    "distance_3d": StepType(
        id="distance_3d", name="3D Distance Formula",
        description="Find distance between two points in 3D",
        category="vectors",
        inputs=[
            InputField("x1", "x₁", "expression", placeholder=""),
            InputField("y1", "y₁", "expression", placeholder=""),
            InputField("z1", "z₁", "expression", placeholder=""),
            InputField("x2", "x₂", "expression", placeholder=""),
            InputField("y2", "y₂", "expression", placeholder=""),
            InputField("z2", "z₂", "expression", placeholder=""),
        ],
        operation="distance_3d",
        thinking=ThinkingQuestion(
            question="What is the 3D distance formula?",
            options=["√[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]", "(x₂-x₁) + (y₂-y₁) + (z₂-z₁)", "√(x² + y² + z²)", "x₂y₂z₂ - x₁y₁z₁"],
            correct="√[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]",
            explanation="3D distance extends the 2D formula with the z-component.",
        ),
        next_steps=[], marks=2,
        hint="Distance = sqrt((x2-x1)^2+(y2-y1)^2+(z2-z1)^2). Pythagorean in 3D."
    ),

    "section_3d": StepType(
        id="section_3d", name="3D Section Formula",
        description="Find point dividing line in 3D in ratio m:n",
        category="vectors",
        inputs=[
            InputField("x1", "x₁", "expression", placeholder=""),
            InputField("y1", "y₁", "expression", placeholder=""),
            InputField("z1", "z₁", "expression", placeholder=""),
            InputField("x2", "x₂", "expression", placeholder=""),
            InputField("y2", "y₂", "expression", placeholder=""),
            InputField("z2", "z₂", "expression", placeholder=""),
            InputField("m", "Ratio m", "expression", placeholder=""),
            InputField("n", "Ratio n", "expression", placeholder=""),
        ],
        operation="section_3d",
        thinking=ThinkingQuestion(
            question="How does the 3D section formula work?",
            options=["Same as 2D but with z-component added", "Only works in 2D", "Different formula entirely", "No ratio needed"],
            correct="Same as 2D but with z-component added",
            explanation="3D section: P = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n), (mz₂+nz₁)/(m+n)).",
        ),
        next_steps=[], marks=3,
        hint="3D version of section formula. P = ((mx2+nx1)/(m+n), (my2+ny1)/(m+n), (mz2+nz1)/(m+n))."
    ),

    "direction_cosines": StepType(
        id="direction_cosines", name="Direction Cosines",
        description="Find direction cosines from direction ratios",
        category="vectors",
        inputs=[
            InputField("a", "Direction ratio a", "expression", placeholder=""),
            InputField("b", "Direction ratio b", "expression", placeholder=""),
            InputField("c", "Direction ratio c", "expression", placeholder=""),
        ],
        operation="direction_cosines",
        thinking=ThinkingQuestion(
            question="What are direction cosines?",
            options=["Cosines of angles with x, y, z axes", "The direction ratios themselves", "Sines of angles", "Tangents of angles"],
            correct="Cosines of angles with x, y, z axes",
            explanation="If (a,b,c) are direction ratios, then (l,m,n) = (a,b,c)/√(a²+b²+c²) are direction cosines. l²+m²+n²=1.",
        ),
        next_steps=[], marks=2,
        hint="l=cos(alpha), m=cos(beta), n=cos(gamma). l^2+m^2+n^2=1. From vector (a,b,c): l=a/|v|."
    ),

    "angle_between_vectors": StepType(
        id="angle_between_vectors", name="Angle Between Vectors",
        description="Find angle using dot product",
        category="vectors",
        inputs=[
            InputField("vec1", "Vector a", "vector", placeholder=""),
            InputField("vec2", "Vector b", "vector", placeholder=""),
        ],
        operation="angle_between_vectors",
        thinking=ThinkingQuestion(
            question="How do you find the angle between two vectors?",
            options=["cos θ = (a·b)/(|a||b|)", "θ = a·b", "θ = |a| + |b|", "cos θ = |a||b|/(a·b)"],
            correct="cos θ = (a·b)/(|a||b|)",
            explanation="cos θ = (a·b)/(|a||b|). If a·b=0, vectors are perpendicular (θ=90°).",
        ),
        next_steps=[], marks=3,
        hint="cos(theta) = (a.b)/(|a| x |b|). Result in radians. Convert to degrees if needed."
    ),

    "vector_projection": StepType(
        id="vector_projection", name="Vector Projection",
        description="Find projection of a on b",
        category="vectors",
        inputs=[
            InputField("vec1", "Vector a", "vector", placeholder=""),
            InputField("vec2", "Vector b", "vector", placeholder=""),
        ],
        operation="vector_projection",
        thinking=ThinkingQuestion(
            question="What is the projection of a on b?",
            options=["(a·b/|b|²) × b", "a × b", "a + b", "a - b"],
            correct="(a·b/|b|²) × b",
            explanation="Projection of a on b = (a·b / |b|²) × b. Scalar projection = a·b/|b|.",
        ),
        next_steps=[], marks=3,
        hint="Proj of a on b = (a.b / |b|^2) x b. Scalar projection = a.b/|b|."
    ),

    # ════════════════════════════════════════════
    # TANGENT & NORMAL (Class 12)
    # ════════════════════════════════════════════

    "tangent_equation": StepType(
        id="tangent_equation", name="Equation of Tangent",
        description="Find tangent line to y=f(x) at x=a",
        category="calculus",
        inputs=[
            InputField("expression", "Function f(x)", "expression", placeholder=""),
            InputField("var", "Variable", "variable", default="x", required=False),
            InputField("point", "Point x = a", "expression", placeholder=""),
        ],
        operation="tangent_equation",
        thinking=ThinkingQuestion(
            question="How do you find the equation of a tangent to y=f(x) at x=a?",
            options=["y - f(a) = f'(a)(x - a)", "y = f(x)", "y = f'(x)", "y = a"],
            correct="y - f(a) = f'(a)(x - a)",
            explanation="Tangent at x=a: y - f(a) = f'(a)(x - a). Slope = f'(a), point = (a, f(a)).",
        ),
        next_steps=[], marks=3,
        hint="y - f(a) = f'(a)(x - a). Need the function and point of tangency."
    ),

    "increasing_decreasing": StepType(
        id="increasing_decreasing", name="Increasing/Decreasing Intervals",
        description="Find where function is increasing or decreasing",
        category="calculus",
        inputs=[
            InputField("expression", "Function f(x)", "expression", placeholder=""),
            InputField("var", "Variable", "variable", default="x", required=False),
        ],
        operation="increasing_decreasing",
        thinking=ThinkingQuestion(
            question="How do you determine if a function is increasing or decreasing?",
            options=["f'(x) > 0 → increasing, f'(x) < 0 → decreasing", "f(x) > 0 → increasing", "f''(x) > 0 → increasing", "f(x) is large → increasing"],
            correct="f'(x) > 0 → increasing, f'(x) < 0 → decreasing",
            explanation="Find f'(x), set to 0 for critical points. Test intervals: f'>0 = increasing, f'<0 = decreasing.",
        ),
        next_steps=[], marks=3,
        hint="f'(x)>0 -> increasing. f'(x)<0 -> decreasing. Find f'(x)=0 for critical points, test intervals."
    ),

    "show_increasing": StepType(
        id="show_increasing", name="Show That Function is Increasing",
        description="Prove that f(x) is increasing on an interval by showing f'(x) > 0",
        category="calculus",
        inputs=[
            InputField("expression", "Function f(x)", "expression", placeholder=""),
            InputField("var", "Variable", "variable", default="x", required=False),
            InputField("interval_start", "Interval start (a)", "expression", required=False,
                       help_text="Left endpoint of interval. Leave empty if always increasing."),
            InputField("interval_end", "Interval end (b)", "expression", required=False,
                       help_text="Right endpoint of interval. Leave empty if always increasing."),
        ],
        operation="show_increasing",
        thinking=ThinkingQuestion(
            question="To show f(x) is increasing on [a,b], what must be true?",
            options=["f'(x) > 0 for all x in [a,b]", "f(x) > 0 for all x in [a,b]",
                     "f''(x) > 0 for all x in [a,b]", "f(x) is large"],
            correct="f'(x) > 0 for all x in [a,b]",
            explanation="A function is increasing where its derivative is positive. Show f'(x) > 0 on the interval.",
        ),
        next_steps=[], marks=3,
        hint="To show f is increasing: find f'(x), then show f'(x) > 0 on the interval. If f'(x) has no critical points and f'(0) > 0, it's always increasing.",
    ),

    "show_decreasing": StepType(
        id="show_decreasing", name="Show That Function is Decreasing",
        description="Prove that f(x) is decreasing on an interval by showing f'(x) < 0",
        category="calculus",
        inputs=[
            InputField("expression", "Function f(x)", "expression", placeholder=""),
            InputField("var", "Variable", "variable", default="x", required=False),
            InputField("interval_start", "Interval start (a)", "expression", required=False,
                       help_text="Left endpoint of interval. Leave empty if always decreasing."),
            InputField("interval_end", "Interval end (b)", "expression", required=False,
                       help_text="Right endpoint of interval. Leave empty if always decreasing."),
        ],
        operation="show_decreasing",
        thinking=ThinkingQuestion(
            question="To show f(x) is decreasing on [a,b], what must be true?",
            options=["f'(x) < 0 for all x in [a,b]", "f(x) < 0 for all x in [a,b]",
                     "f''(x) < 0 for all x in [a,b]", "f(x) is small"],
            correct="f'(x) < 0 for all x in [a,b]",
            explanation="A function is decreasing where its derivative is negative. Show f'(x) < 0 on the interval.",
        ),
        next_steps=[], marks=3,
        hint="To show f is decreasing: find f'(x), then show f'(x) < 0 on the interval.",
    ),

    "show_max_value": StepType(
        id="show_max_value", name="Show That f Has Maximum at a Point",
        description="Prove f has a maximum at x=a by showing f'(a)=0 and f''(a)<0",
        category="calculus",
        inputs=[
            InputField("expression", "Function f(x)", "expression", placeholder=""),
            InputField("var", "Variable", "variable", default="x", required=False),
            InputField("point", "Point x=a", "expression",
                       help_text="The point where you claim the maximum occurs"),
        ],
        operation="show_max_value",
        thinking=ThinkingQuestion(
            question="To show f has a maximum at x=a, what two conditions must hold?",
            options=["f'(a)=0 and f''(a)<0", "f(a)=0 and f'(a)<0",
                     "f'(a)=0 and f''(a)>0", "f(a) is large"],
            correct="f'(a)=0 and f''(a)<0",
            explanation="At a maximum: first derivative = 0 (critical point) AND second derivative < 0 (concave down).",
        ),
        next_steps=[], marks=3,
        hint="Show two things: 1) f'(a) = 0 (critical point), 2) f''(a) < 0 (second derivative negative = maximum).",
    ),

    "show_min_value": StepType(
        id="show_min_value", name="Show That f Has Minimum at a Point",
        description="Prove f has a minimum at x=a by showing f'(a)=0 and f''(a)>0",
        category="calculus",
        inputs=[
            InputField("expression", "Function f(x)", "expression", placeholder=""),
            InputField("var", "Variable", "variable", default="x", required=False),
            InputField("point", "Point x=a", "expression",
                       help_text="The point where you claim the minimum occurs"),
        ],
        operation="show_min_value",
        thinking=ThinkingQuestion(
            question="To show f has a minimum at x=a, what two conditions must hold?",
            options=["f'(a)=0 and f''(a)>0", "f(a)=0 and f'(a)>0",
                     "f'(a)=0 and f''(a)<0", "f(a) is small"],
            correct="f'(a)=0 and f''(a)>0",
            explanation="At a minimum: first derivative = 0 (critical point) AND second derivative > 0 (concave up).",
        ),
        next_steps=[], marks=3,
        hint="Show two things: 1) f'(a) = 0 (critical point), 2) f''(a) > 0 (second derivative positive = minimum).",
    ),

    "function_composition": StepType(
        id="function_composition", name="Function Composition f(g(x))",
        description="Find composite function",
        category="algebra",
        inputs=[
            InputField("expression", "f(x)", "expression", placeholder=""),
            InputField("rhs", "g(x)", "expression", placeholder=""),
            InputField("var", "Variable", "variable", default="x", required=False),
        ],
        operation="function_composition",
        thinking=ThinkingQuestion(
            question="What is f(g(x))?",
            options=["Substitute g(x) into f(x)", "Add f(x) and g(x)", "Multiply f(x) and g(x)", "Divide f(x) by g(x)"],
            correct="Substitute g(x) into f(x)",
            explanation="f(g(x)) means replace every x in f(x) with g(x).",
        ),
        next_steps=[], marks=2,
        hint="f(g(x)): substitute g(x) into f wherever x appears. Example: f=x^2, g=x+1 -> f(g)=(x+1)^2."
    ),

    # ════════════════════════════════════════════
    # PHYSICS — Mechanics
    # ════════════════════════════════════════════

    "physics_force": StepType(
        id="physics_force",
        name="Calculate Force (F = ma)",
        description="Calculate force using Newton's second law",
        category="physics",
        inputs=[
            InputField("mass", "Mass (kg)", "number", placeholder="5", help_text="Mass in kilograms"),
            InputField("acceleration", "Acceleration (m/s²)", "number", placeholder="2", help_text="Acceleration in m/s²"),
        ],
        operation="physics_force",
        thinking=ThinkingQuestion(
            question="Newton's second law states:",
            options=["F = ma", "F = mv", "F = m/a", "F = a/m"],
            correct="F = ma",
            explanation="Force equals mass times acceleration. The unit of force is the Newton (N).",
        ),
        next_steps=[], marks=2,
        hint="Identify the mass (kg) and acceleration (m/s²) from the question. F = m × a gives force in Newtons.",
    ),

    "physics_kinematics": StepType(
        id="physics_kinematics",
        name="Kinematics (v = u + at, s = ut + ½at²)",
        description="Calculate final velocity and displacement using kinematic equations",
        category="physics",
        inputs=[
            InputField("initial_velocity", "Initial velocity u (m/s)", "number", placeholder="0", help_text="Initial velocity in m/s"),
            InputField("acceleration", "Acceleration a (m/s²)", "number", placeholder="9.8", help_text="Acceleration in m/s²"),
            InputField("time", "Time t (s)", "number", placeholder="3", help_text="Time in seconds"),
        ],
        operation="physics_kinematics",
        thinking=ThinkingQuestion(
            question="Which equation relates velocity, acceleration, and time?",
            options=["v = u + at", "v = u - at", "v = u × at", "v = u/at"],
            correct="v = u + at",
            explanation="v = u + at gives final velocity. Displacement is s = ut + ½at².",
        ),
        next_steps=[], marks=3,
        hint="Identify u (initial velocity), a (acceleration), and t (time) from the question.",
    ),

    "physics_energy": StepType(
        id="physics_energy",
        name="Kinetic & Potential Energy",
        description="Calculate KE = ½mv² and PE = mgh",
        category="physics",
        inputs=[
            InputField("mass", "Mass (kg)", "number", placeholder="2", help_text="Mass in kilograms"),
            InputField("velocity", "Velocity v (m/s)", "number", required=False, placeholder="10", help_text="Velocity for KE (leave 0 if not needed)"),
            InputField("height", "Height h (m)", "number", required=False, placeholder="5", help_text="Height for PE (leave 0 if not needed)"),
            InputField("gravity", "g (m/s²)", "number", required=False, default="9.8", placeholder="9.8", help_text="Gravitational acceleration"),
        ],
        operation="physics_energy",
        thinking=ThinkingQuestion(
            question="Kinetic energy is given by:",
            options=["KE = ½mv²", "KE = mv²", "KE = ½mv", "KE = mgh"],
            correct="KE = ½mv²",
            explanation="KE = ½mv² (kinetic) and PE = mgh (potential). Both are in Joules.",
        ),
        next_steps=[], marks=2,
        hint="KE needs mass and velocity. PE needs mass, height, and g (9.8 m/s²).",
    ),

    # ════════════════════════════════════════════
    # PHYSICS — Electricity
    # ════════════════════════════════════════════

    "physics_ohms_law": StepType(
        id="physics_ohms_law",
        name="Ohm's Law (V = IR)",
        description="Calculate voltage using Ohm's law",
        category="physics",
        inputs=[
            InputField("current", "Current I (A)", "number", placeholder="2", help_text="Current in Amperes"),
            InputField("resistance", "Resistance R (Ω)", "number", placeholder="5", help_text="Resistance in Ohms"),
        ],
        operation="physics_ohms_law",
        thinking=ThinkingQuestion(
            question="Ohm's law states:",
            options=["V = IR", "V = I/R", "V = R/I", "V = I + R"],
            correct="V = IR",
            explanation="Voltage = Current × Resistance. Unit is Volts (V).",
        ),
        next_steps=["physics_power"], marks=1,
        hint="Identify current (A) and resistance (Ω). V = I × R.",
    ),

    "physics_power": StepType(
        id="physics_power",
        name="Electrical Power (P = VI)",
        description="Calculate electrical power",
        category="physics",
        inputs=[
            InputField("voltage", "Voltage V (V)", "number", placeholder="12", help_text="Voltage in Volts"),
            InputField("current", "Current I (A)", "number", placeholder="2", help_text="Current in Amperes"),
            InputField("resistance", "Resistance R (Ω)", "number", required=False, default="0", placeholder="6", help_text="Resistance for cross-check (optional)"),
        ],
        operation="physics_power",
        thinking=ThinkingQuestion(
            question="Electrical power is given by:",
            options=["P = VI", "P = V/I", "P = I/V", "P = V + I"],
            correct="P = VI",
            explanation="P = VI = I²R = V²/R. Unit is Watts (W).",
        ),
        next_steps=[], marks=2,
        hint="P = V × I. If you have resistance, you can cross-check with P = I²R or P = V²/R.",
    ),

    # ════════════════════════════════════════════
    # PHYSICS — Optics
    # ════════════════════════════════════════════

    "physics_lens": StepType(
        id="physics_lens",
        name="Lens/Mirror Formula (1/f = 1/v - 1/u)",
        description="Calculate focal length, image distance, or magnification",
        category="physics",
        inputs=[
            InputField("object_distance", "Object distance u (cm)", "number", placeholder="-30", help_text="Object distance (negative for real objects in Cartesian sign)"),
            InputField("image_distance", "Image distance v (cm)", "number", required=False, default="0", placeholder="10", help_text="Image distance (0 if unknown)"),
            InputField("focal_length", "Focal length f (cm)", "number", required=False, default="0", placeholder="15", help_text="Focal length (0 if unknown)"),
        ],
        operation="physics_lens",
        thinking=ThinkingQuestion(
            question="The lens formula is:",
            options=["1/f = 1/v - 1/u", "1/f = 1/u - 1/v", "f = uv/(u+v)", "f = u + v"],
            correct="1/f = 1/v - 1/u",
            explanation="Lens/mirror formula: 1/f = 1/v - 1/u. Magnification m = v/u.",
        ),
        next_steps=[], marks=3,
        hint="Provide any two of (u, v, f). The solver finds the third. Use Cartesian sign convention.",
    ),

    # ════════════════════════════════════════════
    # CHEMISTRY — Mole Concept
    # ════════════════════════════════════════════

    "chem_moles": StepType(
        id="chem_moles",
        name="Mole Calculation (n = mass/M)",
        description="Calculate number of moles from mass and molar mass",
        category="chemistry",
        inputs=[
            InputField("mass", "Mass (g)", "number", placeholder="36", help_text="Mass in grams"),
            InputField("molar_mass", "Molar mass (g/mol)", "number", placeholder="18", help_text="Molar mass in g/mol"),
        ],
        operation="chem_moles",
        thinking=ThinkingQuestion(
            question="Number of moles is calculated by:",
            options=["n = mass / molar_mass", "n = mass × molar_mass", "n = molar_mass / mass", "n = mass + molar_mass"],
            correct="n = mass / molar_mass",
            explanation="n = mass / M. For water: 36 g / 18 g/mol = 2 mol.",
        ),
        next_steps=["chem_molarity"], marks=1,
        hint="Identify the mass (g) and molar mass (g/mol). n = mass / molar_mass.",
    ),

    "chem_molarity": StepType(
        id="chem_molarity",
        name="Molarity (M = n/V)",
        description="Calculate molarity from moles and volume",
        category="chemistry",
        inputs=[
            InputField("moles", "Moles (mol)", "number", required=False, default="0", placeholder="0.5", help_text="Moles (0 if you have mass)"),
            InputField("mass", "Mass (g)", "number", required=False, default="0", placeholder="20", help_text="Mass (used if moles is 0)"),
            InputField("molar_mass", "Molar mass (g/mol)", "number", required=False, default="0", placeholder="40", help_text="Molar mass (needed if using mass)"),
            InputField("volume", "Volume (mL)", "number", placeholder="500", help_text="Volume in mL"),
        ],
        operation="chem_molarity",
        thinking=ThinkingQuestion(
            question="Molarity is defined as:",
            options=["M = moles / volume(L)", "M = moles × volume(L)", "M = volume(L) / moles", "M = moles / volume(mL)"],
            correct="M = moles / volume(L)",
            explanation="M = n / V(L). Volume must be in liters. If V is in mL, divide by 1000.",
        ),
        next_steps=[], marks=2,
        hint="M = n / V(L). If you have mass instead of moles, provide molar_mass too. Volume is in mL (converted to L).",
    ),

    # ════════════════════════════════════════════
    # CHEMISTRY — pH & Electrochemistry
    # ════════════════════════════════════════════

    "chem_pH": StepType(
        id="chem_pH",
        name="pH Calculation (pH = -log[H+])",
        description="Calculate pH from hydrogen ion concentration",
        category="chemistry",
        inputs=[
            InputField("h_concentration", "[H+] (mol/L)", "number", placeholder="0.001", help_text="Hydrogen ion concentration in mol/L"),
        ],
        operation="chem_pH",
        thinking=ThinkingQuestion(
            question="pH is calculated by:",
            options=["pH = -log[H+]", "pH = log[H+]", "pH = -ln[H+]", "pH = 1/[H+]"],
            correct="pH = -log[H+]",
            explanation="pH = -log10[H+]. For [H+] = 0.001 = 10^-3, pH = 3.",
        ),
        next_steps=[], marks=1,
        hint="Identify [H+] in mol/L. pH = -log10[H+]. Neutral pH = 7, acidic < 7, basic > 7.",
    ),

    "chem_dilution": StepType(
        id="chem_dilution",
        name="Dilution (M1V1 = M2V2)",
        description="Calculate final concentration or volume after dilution",
        category="chemistry",
        inputs=[
            InputField("m1", "M1 (initial molarity)", "number", placeholder="2", help_text="Initial molarity in mol/L"),
            InputField("v1", "V1 (initial volume, mL)", "number", placeholder="100", help_text="Initial volume in mL"),
            InputField("m2", "M2 (final molarity)", "number", required=False, default="0", placeholder="0.5", help_text="Final molarity (0 if unknown)"),
            InputField("v2", "V2 (final volume, mL)", "number", required=False, default="0", placeholder="400", help_text="Final volume in mL (0 if unknown)"),
        ],
        operation="chem_dilution",
        thinking=ThinkingQuestion(
            question="The dilution formula is:",
            options=["M1V1 = M2V2", "M1/V1 = M2/V2", "M1 + V1 = M2 + V2", "M1V1 = M2/V2"],
            correct="M1V1 = M2V2",
            explanation="M1V1 = M2V2. Provide M1, V1, and either M2 or V2 to find the unknown.",
        ),
        next_steps=[], marks=2,
        hint="Provide M1, V1, and either M2 or V2. The solver finds the missing value.",
    ),

    "chem_faraday": StepType(
        id="chem_faraday",
        name="Faraday's Law of Electrolysis",
        description="Calculate mass deposited during electrolysis",
        category="chemistry",
        inputs=[
            InputField("molar_mass", "Molar mass (g/mol)", "number", placeholder="63.5", help_text="Molar mass of the substance"),
            InputField("current", "Current I (A)", "number", placeholder="2", help_text="Current in Amperes"),
            InputField("time", "Time t (s)", "number", placeholder="3600", help_text="Time in seconds"),
            InputField("valency", "Valency n", "number", placeholder="2", help_text="Number of electrons transferred (valency)"),
        ],
        operation="chem_faraday",
        thinking=ThinkingQuestion(
            question="Faraday's law of electrolysis states:",
            options=["m = (M × I × t) / (n × F)", "m = M × I × t × n × F", "m = (M × I) / (t × n × F)", "m = M / (I × t × n × F)"],
            correct="m = (M × I × t) / (n × F)",
            explanation="m = (M × I × t) / (n × F), where F = 96485 C/mol.",
        ),
        next_steps=[], marks=3,
        hint="m = (M × I × t) / (n × F). F = 96485 C/mol. Identify M, I, t, and n from the question.",
    ),

    # ════════════════════════════════════════════
    # BIOLOGY — Genetics & Ecology
    # ════════════════════════════════════════════

    "bio_mendelian_ratio": StepType(
        id="bio_mendelian_ratio",
        name="Mendelian Cross Ratio",
        description="Calculate phenotypic and genotypic ratios for genetic crosses",
        category="biology",
        inputs=[
            InputField("cross_type", "Cross type", "expression", default="monohybrid", placeholder="monohybrid", help_text="monohybrid, dihybrid, or test_cross"),
        ],
        operation="bio_mendelian_ratio",
        thinking=ThinkingQuestion(
            question="A monohybrid cross (Aa × Aa) gives what F2 phenotypic ratio?",
            options=["3:1", "9:3:3:1", "1:1", "1:2:1"],
            correct="3:1",
            explanation="Monohybrid: 3:1 phenotypic, 1:2:1 genotypic. Dihybrid: 9:3:3:1. Test cross: 1:1.",
        ),
        next_steps=[], marks=2,
        hint="Type 'monohybrid' (Aa×Aa → 3:1), 'dihybrid' (AaBb×AaBb → 9:3:3:1), or 'test_cross' (Aa×aa → 1:1).",
    ),

    "bio_population_growth": StepType(
        id="bio_population_growth",
        name="Population Growth (Nt = N0 × e^(rt))",
        description="Calculate population size using exponential growth model",
        category="biology",
        inputs=[
            InputField("initial_population", "N0 (initial population)", "number", placeholder="100", help_text="Initial population size"),
            InputField("growth_rate", "r (growth rate)", "number", placeholder="0.05", help_text="Per capita growth rate"),
            InputField("time", "t (time)", "number", placeholder="10", help_text="Time period"),
        ],
        operation="bio_population_growth",
        thinking=ThinkingQuestion(
            question="Exponential population growth is modeled by:",
            options=["Nt = N0 × e^(rt)", "Nt = N0 + rt", "Nt = N0 × r × t", "Nt = N0 / (1 + rt)"],
            correct="Nt = N0 × e^(rt)",
            explanation="Nt = N0 × e^(rt). This is the exponential growth model used in ecology.",
        ),
        next_steps=[], marks=2,
        hint="Identify N0 (initial population), r (growth rate), and t (time). Nt = N0 × e^(r×t).",
    ),

    # ════════════════════════════════════════════
    # NEW — SURFACE AREA (Mensuration)
    # ════════════════════════════════════════════

    "surface_area_cube": StepType(
        id="surface_area_cube",
        name="Surface Area of Cube",
        description="Find total surface area of a cube (SA = 6a²)",
        category="mensuration",
        inputs=[InputField("side", "Side (a)", "expression", placeholder="5", help_text="Edge length of cube")],
        operation="surface_area_cube",
        thinking=ThinkingQuestion(
            question="What is the formula for the total surface area of a cube?",
            options=["6a²", "a³", "4a²", "12a"],
            correct="6a²",
            explanation="A cube has 6 square faces, each with area a². Total SA = 6a².",
        ),
        next_steps=[], marks=2,
        hint="A cube has 6 faces. SA = 6 × side².",
    ),

    "surface_area_cuboid": StepType(
        id="surface_area_cuboid",
        name="Surface Area of Cuboid",
        description="Find total surface area of a cuboid (SA = 2(lw + lh + wh))",
        category="mensuration",
        inputs=[
            InputField("length", "Length (l)", "expression", placeholder="10"),
            InputField("width", "Width (w)", "expression", placeholder="5"),
            InputField("height", "Height (h)", "expression", placeholder="3"),
        ],
        operation="surface_area_cuboid",
        thinking=ThinkingQuestion(
            question="What is the formula for the total surface area of a cuboid?",
            options=["2(lw + lh + wh)", "l × w × h", "2(l + w + h)", "lw + lh + wh"],
            correct="2(lw + lh + wh)",
            explanation="A cuboid has 6 faces: 2 of lw, 2 of lh, 2 of wh. Total SA = 2(lw + lh + wh).",
        ),
        next_steps=[], marks=2,
        hint="SA = 2(lw + lh + wh). Input length, width, height.",
    ),

    "surface_area_cylinder": StepType(
        id="surface_area_cylinder",
        name="Surface Area of Cylinder",
        description="Find total surface area of a cylinder (TSA = 2πr(r + h))",
        category="mensuration",
        inputs=[
            InputField("radius", "Radius (r)", "expression", placeholder="7"),
            InputField("height", "Height (h)", "expression", placeholder="10"),
        ],
        operation="surface_area_cylinder",
        thinking=ThinkingQuestion(
            question="What is the formula for the total surface area of a cylinder?",
            options=["2πr(r + h)", "πr²h", "2πrh", "πr(r + h)"],
            correct="2πr(r + h)",
            explanation="TSA = curved surface (2πrh) + 2 circular bases (2πr²) = 2πr(r + h).",
        ),
        next_steps=[], marks=2,
        hint="TSA = 2πr(r + h). Curved part = 2πrh, two bases = 2πr².",
    ),

    "surface_area_cone": StepType(
        id="surface_area_cone",
        name="Surface Area of Cone",
        description="Find total surface area of a cone (TSA = πr(r + l))",
        category="mensuration",
        inputs=[
            InputField("radius", "Radius (r)", "expression", placeholder="7"),
            InputField("slant_height", "Slant Height (l)", "expression", placeholder="25"),
        ],
        operation="surface_area_cone",
        thinking=ThinkingQuestion(
            question="What is the formula for the total surface area of a cone?",
            options=["πr(r + l)", "πr²h", "πrl", "2πr(r + l)"],
            correct="πr(r + l)",
            explanation="TSA = curved surface (πrl) + base (πr²) = πr(r + l). l = slant height.",
        ),
        next_steps=[], marks=2,
        hint="TSA = πr(r + l). Need radius and slant height. If only height given, l = √(r² + h²).",
    ),

    "surface_area_sphere": StepType(
        id="surface_area_sphere",
        name="Surface Area of Sphere",
        description="Find surface area of a sphere (SA = 4πr²)",
        category="mensuration",
        inputs=[InputField("radius", "Radius (r)", "expression", placeholder="7")],
        operation="surface_area_sphere",
        thinking=ThinkingQuestion(
            question="What is the formula for the surface area of a sphere?",
            options=["4πr²", "(4/3)πr³", "2πr²", "πr²"],
            correct="4πr²",
            explanation="SA = 4πr². This is 4 times the area of a great circle.",
        ),
        next_steps=[], marks=1,
        hint="SA = 4πr². Just need the radius.",
    ),

    "surface_area_hemisphere": StepType(
        id="surface_area_hemisphere",
        name="Surface Area of Hemisphere",
        description="Find total surface area of a hemisphere (TSA = 3πr²)",
        category="mensuration",
        inputs=[InputField("radius", "Radius (r)", "expression", placeholder="7")],
        operation="surface_area_hemisphere",
        thinking=ThinkingQuestion(
            question="What is the total surface area of a hemisphere?",
            options=["3πr²", "2πr²", "4πr²", "(2/3)πr³"],
            correct="3πr²",
            explanation="TSA = curved surface (2πr²) + flat circular base (πr²) = 3πr².",
        ),
        next_steps=[], marks=2,
        hint="TSA = 3πr². Curved = 2πr², base = πr².",
    ),

    # ════════════════════════════════════════════
    # NEW — FRACTIONS
    # ════════════════════════════════════════════

    "fraction_subtract": StepType(
        id="fraction_subtract",
        name="Subtract Fractions",
        description="Subtract two fractions: a/b - c/d",
        category="arithmetic",
        inputs=[
            InputField("n1", "Numerator 1", "expression", placeholder="3"),
            InputField("d1", "Denominator 1", "expression", placeholder="4"),
            InputField("n2", "Numerator 2", "expression", placeholder="1"),
            InputField("d2", "Denominator 2", "expression", placeholder="6"),
        ],
        operation="fraction_subtract",
        thinking=ThinkingQuestion(
            question="How do you subtract fractions with different denominators?",
            options=["Find common denominator, then subtract numerators",
                     "Subtract denominators and numerators separately",
                     "Multiply the fractions first",
                     "Divide both by their HCF"],
            correct="Find common denominator, then subtract numerators",
            explanation="To subtract a/b - c/d: (ad - bc)/(bd). Find a common denominator first.",
        ),
        next_steps=[], marks=1,
        hint="a/b - c/d = (ad - bc)/(bd). Enter all four values.",
    ),

    # ════════════════════════════════════════════
    # NEW — COMMERCIAL MATH
    # ════════════════════════════════════════════

    "successive_discount": StepType(
        id="successive_discount",
        name="Successive Discounts",
        description="Find selling price after two successive discounts",
        category="commercial",
        inputs=[
            InputField("mp", "Marked Price (₹)", "expression", placeholder="1000"),
            InputField("d1", "First Discount %", "expression", placeholder="20"),
            InputField("d2", "Second Discount %", "expression", placeholder="10"),
        ],
        operation="successive_discount",
        thinking=ThinkingQuestion(
            question="Two successive discounts of 20% and 10% are equivalent to a single discount of:",
            options=["28%", "30%", "26%", "32%"],
            correct="28%",
            explanation="Successive discounts don't add. SP = MP × 0.8 × 0.9 = 0.72 × MP. Total discount = 28%.",
        ),
        next_steps=[], marks=2,
        hint="SP = MP × (1 - d₁/100) × (1 - d₂/100). Discounts compound, don't add.",
    ),

    "gst_calculation": StepType(
        id="gst_calculation",
        name="GST Calculation",
        description="Calculate GST amount and total price",
        category="commercial",
        inputs=[
            InputField("price", "Price (₹)", "expression", placeholder="5000"),
            InputField("gst_rate", "GST Rate %", "expression", placeholder="18"),
        ],
        operation="gst_calculation",
        thinking=ThinkingQuestion(
            question="How is GST calculated on a product?",
            options=["Total = Price × (1 + GST%/100)", "Total = Price + GST%",
                     "Total = Price × GST%", "Total = Price - GST%"],
            correct="Total = Price × (1 + GST%/100)",
            explanation="GST Amount = Price × GST%/100. Total = Price + GST Amount = Price × (1 + GST%/100).",
        ),
        next_steps=[], marks=1,
        hint="GST Amount = Price × Rate/100. Total = Price + GST Amount.",
    ),

    # ════════════════════════════════════════════
    # NEW — ARITHMETIC (Speed/Work)
    # ════════════════════════════════════════════

    "average_speed": StepType(
        id="average_speed",
        name="Average Speed (Two Segments)",
        description="Find average speed for a journey with two segments",
        category="arithmetic",
        inputs=[
            InputField("d1", "Distance 1 (km)", "expression", placeholder="120"),
            InputField("s1", "Speed 1 (km/h)", "expression", placeholder="60"),
            InputField("d2", "Distance 2 (km)", "expression", placeholder="80"),
            InputField("s2", "Speed 2 (km/h)", "expression", placeholder="40"),
        ],
        operation="average_speed",
        thinking=ThinkingQuestion(
            question="How do you calculate average speed for a journey?",
            options=["Total Distance / Total Time", "(s₁ + s₂) / 2",
                     "Total Distance × Total Time", "s₁ × s₂"],
            correct="Total Distance / Total Time",
            explanation="Average speed = Total Distance / Total Time. NOT the arithmetic mean of speeds.",
        ),
        next_steps=[], marks=2,
        hint="Average Speed = (d₁ + d₂) / (d₁/s₁ + d₂/s₂). NOT (s₁+s₂)/2.",
    ),

    "relative_speed": StepType(
        id="relative_speed",
        name="Relative Speed",
        description="Find relative speed of two objects",
        category="arithmetic",
        inputs=[
            InputField("s1", "Speed 1 (km/h)", "expression", placeholder="60"),
            InputField("s2", "Speed 2 (km/h)", "expression", placeholder="40"),
            InputField("direction", "Direction (same/opposite)", "expression", default="same", placeholder="same"),
        ],
        operation="relative_speed",
        thinking=ThinkingQuestion(
            question="Two trains move in opposite directions. Their relative speed is:",
            options=["s₁ + s₂", "|s₁ - s₂|", "s₁ × s₂", "s₁ / s₂"],
            correct="s₁ + s₂",
            explanation="Opposite direction: relative speed = s₁ + s₂. Same direction: |s₁ - s₂|.",
        ),
        next_steps=[], marks=2,
        hint="Same direction: |s₁ - s₂|. Opposite direction: s₁ + s₂.",
    ),

    "time_and_work": StepType(
        id="time_and_work",
        name="Time and Work (Two Workers)",
        description="Find time to complete work together",
        category="arithmetic",
        inputs=[
            InputField("work1", "Worker 1 time (days)", "expression", placeholder="12"),
            InputField("work2", "Worker 2 time (days)", "expression", placeholder="18"),
        ],
        operation="time_and_work",
        thinking=ThinkingQuestion(
            question="If A completes work in 12 days and B in 18 days, together they take:",
            options=["1/(1/12 + 1/18)", "12 + 18", "(12 + 18)/2", "12 × 18"],
            correct="1/(1/12 + 1/18)",
            explanation="1/T = 1/t₁ + 1/t₂. T = t₁×t₂/(t₁+t₂) = 12×18/30 = 7.2 days.",
        ),
        next_steps=[], marks=2,
        hint="1/T = 1/t₁ + 1/t₂. T = (t₁ × t₂)/(t₁ + t₂).",
    ),

    "pipes_and_cisterns": StepType(
        id="pipes_and_cisterns",
        name="Pipes and Cisterns",
        description="Find time to fill a tank with two pipes",
        category="arithmetic",
        inputs=[
            InputField("pipe1", "Pipe 1 fill time (hours)", "expression", placeholder="6"),
            InputField("pipe2", "Pipe 2 fill time (hours)", "expression", placeholder="8"),
        ],
        operation="pipes_and_cisterns",
        thinking=ThinkingQuestion(
            question="Two pipes fill a tank in 6 and 8 hours. Together they fill it in:",
            options=["1/(1/6 + 1/8)", "6 + 8", "6 × 8", "(6 + 8)/2"],
            correct="1/(1/6 + 1/8)",
            explanation="Same formula as work: 1/T = 1/t₁ + 1/t₂. T = 6×8/14 ≈ 3.43 hours.",
        ),
        next_steps=[], marks=2,
        hint="Same as time and work. 1/T = 1/t₁ + 1/t₂.",
    ),

    "mixture_allegation": StepType(
        id="mixture_allegation",
        name="Mixture and Alligation",
        description="Find ratio to mix two ingredients using alligation",
        category="arithmetic",
        inputs=[
            InputField("q1", "Quantity 1", "expression", placeholder="0"),
            InputField("q2", "Quantity 2", "expression", placeholder="0"),
            InputField("c1", "Concentration 1 (%)", "expression", placeholder="20"),
            InputField("c2", "Concentration 2 (%)", "expression", placeholder="50"),
            InputField("target", "Target Concentration (%)", "expression", placeholder="30"),
        ],
        operation="mixture_allegation",
        thinking=ThinkingQuestion(
            question="In alligation, the ratio of quantities is:",
            options=["(c₂ - target) : (target - c₁)", "(c₁ - target) : (c₂ - target)",
                     "(target - c₁) : (target - c₂)", "c₁ : c₂"],
            correct="(c₂ - target) : (target - c₁)",
            explanation="Alligation rule: ratio = (c₂ - target) : (target - c₁). The cheaper is to dearer as (dearer - mean) : (mean - cheaper).",
        ),
        next_steps=[], marks=3,
        hint="Ratio = (c₂ - target) : (target - c₁). Cross-subtract from target.",
    ),

    # ════════════════════════════════════════════
    # NEW — PHYSICS
    # ════════════════════════════════════════════

    "physics_density": StepType(
        id="physics_density",
        name="Density (d = m/V)",
        description="Calculate density from mass and volume",
        category="physics",
        inputs=[
            InputField("mass", "Mass (kg)", "expression", placeholder="10"),
            InputField("volume", "Volume (m³)", "expression", placeholder="2"),
        ],
        operation="physics_density",
        thinking=ThinkingQuestion(
            question="What is the formula for density?",
            options=["d = m/V", "d = mV", "d = V/m", "d = m + V"],
            correct="d = m/V",
            explanation="Density = Mass / Volume. SI unit: kg/m³.",
        ),
        next_steps=[], marks=1,
        hint="d = m/V. Mass in kg, volume in m³. Result in kg/m³.",
    ),

    "physics_pressure": StepType(
        id="physics_pressure",
        name="Pressure (P = F/A)",
        description="Calculate pressure from force and area",
        category="physics",
        inputs=[
            InputField("force", "Force (N)", "expression", placeholder="100"),
            InputField("area", "Area (m²)", "expression", placeholder="2"),
        ],
        operation="physics_pressure",
        thinking=ThinkingQuestion(
            question="What is the formula for pressure?",
            options=["P = F/A", "P = F×A", "P = A/F", "P = F + A"],
            correct="P = F/A",
            explanation="Pressure = Force / Area. SI unit: Pascal (Pa) = N/m².",
        ),
        next_steps=[], marks=1,
        hint="P = F/A. Force in Newtons, area in m². Result in Pascals.",
    ),

    "physics_work": StepType(
        id="physics_work",
        name="Work Done (W = Fd cos θ)",
        description="Calculate work done by a force",
        category="physics",
        inputs=[
            InputField("force", "Force (N)", "expression", placeholder="50"),
            InputField("distance", "Distance (m)", "expression", placeholder="10"),
            InputField("angle", "Angle (degrees)", "expression", default="0", placeholder="0"),
        ],
        operation="physics_work",
        thinking=ThinkingQuestion(
            question="When is work done maximum?",
            options=["When force and displacement are in the same direction (θ = 0°)",
                     "When force is perpendicular to displacement (θ = 90°)",
                     "When angle is 180°", "When angle is 45°"],
            correct="When force and displacement are in the same direction (θ = 0°)",
            explanation="W = Fd cos(θ). Maximum when θ = 0° (cos 0° = 1). Zero when θ = 90°.",
        ),
        next_steps=[], marks=2,
        hint="W = F × d × cos(θ). If no angle given, use 0°.",
    ),

    "physics_gpe": StepType(
        id="physics_gpe",
        name="Gravitational Potential Energy (GPE = mgh)",
        description="Calculate gravitational potential energy",
        category="physics",
        inputs=[
            InputField("mass", "Mass (kg)", "expression", placeholder="5"),
            InputField("height", "Height (m)", "expression", placeholder="10"),
            InputField("g", "g (m/s²)", "expression", default="9.8", placeholder="9.8"),
        ],
        operation="physics_gpe",
        thinking=ThinkingQuestion(
            question="What is the formula for gravitational potential energy?",
            options=["GPE = mgh", "GPE = ½mv²", "GPE = mg", "GPE = mgh²"],
            correct="GPE = mgh",
            explanation="GPE = mgh where m = mass, g = 9.8 m/s², h = height. Unit: Joules.",
        ),
        next_steps=[], marks=1,
        hint="GPE = mgh. g = 9.8 m/s² (default). Mass in kg, height in m.",
    ),

    "physics_frequency_wavelength": StepType(
        id="physics_frequency_wavelength",
        name="Wave Equation (v = fλ)",
        description="Find frequency, wavelength, or speed of a wave",
        category="physics",
        inputs=[
            InputField("speed", "Speed (m/s)", "expression", placeholder="340"),
            InputField("frequency", "Frequency (Hz)", "expression", default="", placeholder="170"),
            InputField("wavelength", "Wavelength (m)", "expression", default="", placeholder=""),
        ],
        operation="physics_frequency_wavelength",
        thinking=ThinkingQuestion(
            question="What is the relationship between wave speed, frequency, and wavelength?",
            options=["v = f × λ", "v = f / λ", "v = f + λ", "v = λ / f"],
            correct="v = f × λ",
            explanation="v = f × λ. Speed = frequency × wavelength. Provide any two to find the third.",
        ),
        next_steps=[], marks=1,
        hint="v = f × λ. Provide speed and one of frequency/wavelength.",
    ),

    "physics_heat": StepType(
        id="physics_heat",
        name="Heat Transfer (Q = mcΔT)",
        description="Calculate heat energy transferred",
        category="physics",
        inputs=[
            InputField("mass", "Mass (kg)", "expression", placeholder="2"),
            InputField("shc", "Specific Heat Capacity (J/kg·K)", "expression", placeholder="4200"),
            InputField("temp_change", "Temperature Change (K)", "expression", placeholder="10"),
        ],
        operation="physics_heat",
        thinking=ThinkingQuestion(
            question="What is the formula for heat energy required to change temperature?",
            options=["Q = mcΔT", "Q = mL", "Q = mc", "Q = mΔT"],
            correct="Q = mcΔT",
            explanation="Q = mcΔT. m = mass, c = specific heat capacity, ΔT = temperature change.",
        ),
        next_steps=[], marks=2,
        hint="Q = mcΔT. For water, c = 4200 J/(kg·K).",
    ),

    "physics_resistance": StepType(
        id="physics_resistance",
        name="Combination of Resistors",
        description="Find equivalent resistance (series or parallel)",
        category="physics",
        inputs=[
            InputField("r1", "Resistance 1 (Ω)", "expression", placeholder="6"),
            InputField("r2", "Resistance 2 (Ω)", "expression", placeholder="3"),
            InputField("mode", "Mode (series/parallel)", "expression", default="series", placeholder="series"),
        ],
        operation="physics_resistance",
        thinking=ThinkingQuestion(
            question="How do resistors combine in parallel?",
            options=["1/R = 1/R₁ + 1/R₂", "R = R₁ + R₂",
                     "R = R₁ × R₂", "R = (R₁ + R₂)/2"],
            correct="1/R = 1/R₁ + 1/R₂",
            explanation="Series: R = R₁ + R₂. Parallel: 1/R = 1/R₁ + 1/R₂, so R = R₁R₂/(R₁+R₂).",
        ),
        next_steps=[], marks=2,
        hint="Series: R₁ + R₂. Parallel: R₁R₂/(R₁+R₂). Specify mode.",
    ),

    "physics_snells_law": StepType(
        id="physics_snells_law",
        name="Snell's Law (Refraction)",
        description="n₁ sin(θ₁) = n₂ sin(θ₂) — find angle of refraction",
        category="physics",
        inputs=[
            InputField("n1", "Refractive Index 1 (n₁)", "expression", placeholder="1"),
            InputField("angle1", "Angle of Incidence (θ₁°)", "expression", placeholder="30"),
            InputField("n2", "Refractive Index 2 (n₂)", "expression", placeholder="1.5"),
            InputField("angle2", "Angle of Refraction (θ₂°)", "expression", default="", placeholder=""),
        ],
        operation="physics_snells_law",
        thinking=ThinkingQuestion(
            question="Snell's law of refraction states:",
            options=["n₁ sin(θ₁) = n₂ sin(θ₂)", "n₁ cos(θ₁) = n₂ cos(θ₂)",
                     "n₁ + sin(θ₁) = n₂ + sin(θ₂)", "n₁/sin(θ₁) = n₂/sin(θ₂)"],
            correct="n₁ sin(θ₁) = n₂ sin(θ₂)",
            explanation="n₁ sin(θ₁) = n₂ sin(θ₂). Light bends towards normal when entering denser medium.",
        ),
        next_steps=[], marks=2,
        hint="n₁ sin(θ₁) = n₂ sin(θ₂). Provide n₁, θ₁, and one of n₂ or θ₂.",
    ),

    "physics_lens_power": StepType(
        id="physics_lens_power",
        name="Power of Lens (P = 1/f)",
        description="Calculate power of a lens in diopters",
        category="physics",
        inputs=[InputField("focal_length", "Focal Length (cm)", "expression", placeholder="50")],
        operation="physics_lens_power",
        thinking=ThinkingQuestion(
            question="What is the power of a lens?",
            options=["P = 1/f (in meters)", "P = f (in cm)", "P = 1/f (in cm)",
                     "P = f²"],
            correct="P = 1/f (in meters)",
            explanation="P = 1/f where f is in meters. Unit: diopter (D). Convex: +, Concave: -.",
        ),
        next_steps=[], marks=1,
        hint="P = 1/f(m). Convert cm to m first. Convex lens has +ve power.",
    ),

    # ════════════════════════════════════════════
    # NEW — CHEMISTRY
    # ════════════════════════════════════════════

    "chem_gas_equation": StepType(
        id="chem_gas_equation",
        name="Ideal Gas Equation (PV = nRT)",
        description="Solve ideal gas equation for any variable",
        category="chemistry",
        inputs=[
            InputField("pressure", "Pressure (Pa)", "expression", placeholder="101325"),
            InputField("volume", "Volume (m³)", "expression", placeholder="0.0224"),
            InputField("moles", "Moles (n)", "expression", default="", placeholder="1"),
            InputField("temp", "Temperature (K)", "expression", default="", placeholder="273"),
        ],
        operation="chem_gas_equation",
        thinking=ThinkingQuestion(
            question="The ideal gas equation is:",
            options=["PV = nRT", "PV = nRT²", "P/V = nRT", "PV = n/R T"],
            correct="PV = nRT",
            explanation="PV = nRT. R = 8.314 J/(mol·K). Provide P, V, and one of n or T.",
        ),
        next_steps=[], marks=2,
        hint="PV = nRT. R = 8.314 J/(mol·K). Provide P, V, and either n or T.",
    ),

    "chem_half_life": StepType(
        id="chem_half_life",
        name="Radioactive Decay (Half-Life)",
        description="N = N₀ × (1/2)^(t/t½) — find remaining quantity",
        category="chemistry",
        inputs=[
            InputField("initial", "Initial Amount (N₀)", "expression", placeholder="100"),
            InputField("half_life", "Half-Life (t½)", "expression", placeholder="5"),
            InputField("time", "Time Elapsed (t)", "expression", placeholder="15"),
        ],
        operation="chem_half_life",
        thinking=ThinkingQuestion(
            question="After 3 half-lives, what fraction of a radioactive sample remains?",
            options=["1/8", "1/3", "1/6", "1/9"],
            correct="1/8",
            explanation="After n half-lives: (1/2)^n. After 3: (1/2)³ = 1/8 = 12.5%.",
        ),
        next_steps=[], marks=2,
        hint="N = N₀ × (1/2)^(t/t½). Count how many half-lives have passed.",
    ),

    # ════════════════════════════════════════════
    # CLASS 1-2 — NUMBER SENSE
    # ════════════════════════════════════════════

    "number_comparison": StepType(
        id="number_comparison",
        name="Compare Numbers",
        description="Compare two numbers: greater, less, or equal",
        category="arithmetic",
        inputs=[
            InputField("a", "First Number", "expression", placeholder="5"),
            InputField("b", "Second Number", "expression", placeholder="8"),
        ],
        operation="number_comparison",
        thinking=ThinkingQuestion(
            question="Which symbol means 'greater than'?",
            options=[">", "<", "=", "+"],
            correct=">",
            explanation="> means greater than. < means less than. = means equal.",
        ),
        next_steps=[], marks=1,
        hint="Compare the two numbers. > means greater, < means less.",
    ),

    "place_value": StepType(
        id="place_value",
        name="Place Value",
        description="Find the place value expansion of a number",
        category="arithmetic",
        inputs=[InputField("n", "Number", "expression", placeholder="345")],
        operation="place_value",
        thinking=ThinkingQuestion(
            question="In the number 345, what is the place value of 3?",
            options=["300 (Hundreds)", "3 (Units)", "30 (Tens)", "3000"],
            correct="300 (Hundreds)",
            explanation="3 is in the hundreds place: 3 × 100 = 300. 4 is tens (40), 5 is units (5).",
        ),
        next_steps=[], marks=1,
        hint="Enter the number. The system will show each digit's place value.",
    ),

    "even_odd": StepType(
        id="even_odd",
        name="Even or Odd",
        description="Check if a number is even or odd",
        category="arithmetic",
        inputs=[InputField("n", "Number", "expression", placeholder="7")],
        operation="even_odd",
        thinking=ThinkingQuestion(
            question="How do you know if a number is even?",
            options=["It ends in 0, 2, 4, 6, or 8", "It ends in 1, 3, 5, 7, or 9",
                     "It is greater than 10", "It is divisible by 3"],
            correct="It ends in 0, 2, 4, 6, or 8",
            explanation="Even numbers end in 0, 2, 4, 6, 8. Odd numbers end in 1, 3, 5, 7, 9.",
        ),
        next_steps=[], marks=1,
        hint="Enter any number. Even = divisible by 2. Odd = not divisible by 2.",
    ),

    "skip_counting": StepType(
        id="skip_counting",
        name="Skip Counting",
        description="Generate a skip counting sequence",
        category="arithmetic",
        inputs=[
            InputField("start", "Start Number", "expression", placeholder="2"),
            InputField("step", "Skip By", "expression", placeholder="2"),
            InputField("count", "How Many Numbers", "expression", placeholder="5"),
        ],
        operation="skip_counting",
        thinking=ThinkingQuestion(
            question="Skip counting by 2 starting from 2 gives:",
            options=["2, 4, 6, 8, 10...", "2, 3, 4, 5, 6...", "2, 4, 8, 16, 32...", "2, 2, 2, 2, 2..."],
            correct="2, 4, 6, 8, 10...",
            explanation="Skip counting by 2: add 2 each time. 2, 4, 6, 8, 10, 12...",
        ),
        next_steps=[], marks=1,
        hint="Enter start, step (how much to skip), and count (how many numbers).",
    ),

    "before_after_between": StepType(
        id="before_after_between",
        name="Before, After, Between",
        description="Find the number before, after, or between two numbers",
        category="arithmetic",
        inputs=[
            InputField("a", "First Number", "expression", placeholder="5"),
            InputField("b", "Second Number", "expression", placeholder="7"),
        ],
        operation="before_after_between",
        thinking=ThinkingQuestion(
            question="What number comes between 5 and 7?",
            options=["6", "4", "8", "12"],
            correct="6",
            explanation="Between 5 and 7 is 6. Before 5 is 4. After 7 is 8.",
        ),
        next_steps=[], marks=1,
        hint="Enter two numbers. System finds what comes before, after, and between.",
    ),

    "multiplication_table": StepType(
        id="multiplication_table",
        name="Multiplication Table",
        description="Generate a multiplication table for a number",
        category="arithmetic",
        inputs=[
            InputField("n", "Table of", "expression", placeholder="7"),
            InputField("upto", "Up to", "expression", default="10", placeholder="10"),
        ],
        operation="multiplication_table",
        thinking=ThinkingQuestion(
            question="In the table of 7, what is 7 × 6?",
            options=["42", "35", "49", "13"],
            correct="42",
            explanation="7 × 6 = 42. Multiplication is repeated addition: 7+7+7+7+7+7 = 42.",
        ),
        next_steps=[], marks=1,
        hint="Enter the number and how many multiples you want (default 10).",
    ),

    "money_arithmetic": StepType(
        id="money_arithmetic",
        name="Money Calculation",
        description="Add or subtract money amounts (₹ and paise)",
        category="arithmetic",
        inputs=[
            InputField("expression", "Expression (e.g. 25.50 + 15.25)", "expression", placeholder="25.50 + 15.25"),
        ],
        operation="money_arithmetic",
        thinking=ThinkingQuestion(
            question="₹1 equals how many paise?",
            options=["100 paise", "10 paise", "1000 paise", "50 paise"],
            correct="100 paise",
            explanation="₹1 = 100 paise. To add money: align decimal points and add like normal numbers.",
        ),
        next_steps=[], marks=1,
        hint="Enter two amounts in rupees. Use + to add or - to subtract.",
    ),

    "time_conversion": StepType(
        id="time_conversion",
        name="Time Conversion",
        description="Convert between hours, minutes, and seconds",
        category="arithmetic",
        inputs=[
            InputField("value", "Value", "expression", placeholder="90"),
            InputField("from_unit", "From Unit (hours/minutes/seconds)", "expression", default="minutes", placeholder="minutes"),
            InputField("to_unit", "To Unit (hours/minutes/seconds)", "expression", default="hours", placeholder="hours"),
        ],
        operation="time_conversion",
        thinking=ThinkingQuestion(
            question="How many minutes are in 1 hour?",
            options=["60 minutes", "100 minutes", "24 minutes", "10 minutes"],
            correct="60 minutes",
            explanation="1 hour = 60 minutes. 1 minute = 60 seconds. 1 hour = 3600 seconds.",
        ),
        next_steps=[], marks=1,
        hint="1 hour = 60 min, 1 min = 60 sec. Enter value, from-unit, to-unit.",
    ),

    # ════════════════════════════════════════════
    # CLASS 3-4 — DIVISION, DECIMALS, UNITS
    # ════════════════════════════════════════════

    "division_with_remainder": StepType(
        id="division_with_remainder",
        name="Division with Remainder",
        description="Divide two numbers and find quotient and remainder",
        category="arithmetic",
        inputs=[
            InputField("dividend", "Dividend", "expression", placeholder="17"),
            InputField("divisor", "Divisor", "expression", placeholder="5"),
        ],
        operation="division_with_remainder",
        thinking=ThinkingQuestion(
            question="When you divide 17 by 5, the quotient and remainder are:",
            options=["Q=3, R=2", "Q=2, R=7", "Q=4, R=1", "Q=3, R=0"],
            correct="Q=3, R=2",
            explanation="17 ÷ 5 = 3 remainder 2. Because 5 × 3 = 15, and 17 - 15 = 2.",
        ),
        next_steps=[], marks=1,
        hint="Enter dividend and divisor. System finds quotient and remainder.",
    ),

    "equivalent_fractions": StepType(
        id="equivalent_fractions",
        name="Equivalent Fractions",
        description="Find equivalent fractions by multiplying or dividing",
        category="arithmetic",
        inputs=[
            InputField("n", "Numerator", "expression", placeholder="1"),
            InputField("d", "Denominator", "expression", placeholder="2"),
            InputField("factor", "Multiply by", "expression", placeholder="3"),
        ],
        operation="equivalent_fractions",
        thinking=ThinkingQuestion(
            question="Which fraction is equivalent to 1/2?",
            options=["2/4", "1/3", "2/3", "3/4"],
            correct="2/4",
            explanation="1/2 = 2/4 = 3/6. Multiply top and bottom by the same number.",
        ),
        next_steps=[], marks=1,
        hint="Multiply numerator and denominator by the same number to get equivalent fraction.",
    ),

    "fraction_comparison": StepType(
        id="fraction_comparison",
        name="Compare Fractions",
        description="Compare two fractions: which is greater",
        category="arithmetic",
        inputs=[
            InputField("n1", "Numerator 1", "expression", placeholder="3"),
            InputField("d1", "Denominator 1", "expression", placeholder="4"),
            InputField("n2", "Numerator 2", "expression", placeholder="2"),
            InputField("d2", "Denominator 2", "expression", placeholder="3"),
        ],
        operation="fraction_comparison",
        thinking=ThinkingQuestion(
            question="Which is greater: 3/4 or 2/3?",
            options=["3/4", "2/3", "They are equal", "Cannot compare"],
            correct="3/4",
            explanation="3/4 = 0.75, 2/3 ≈ 0.67. So 3/4 > 2/3. Cross-multiply: 3×3=9 > 4×2=8.",
        ),
        next_steps=[], marks=1,
        hint="Cross-multiply to compare: if n1×d2 > n2×d1, then n1/d1 is greater.",
    ),

    "decimal_operations": StepType(
        id="decimal_operations",
        name="Decimal Operations",
        description="Add, subtract, multiply, or divide decimals",
        category="arithmetic",
        inputs=[
            InputField("expression", "Expression (e.g. 3.5 + 2.25)", "expression", placeholder="3.5 + 2.25"),
        ],
        operation="decimal_operations",
        thinking=ThinkingQuestion(
            question="When adding decimals, what must you align?",
            options=["The decimal points", "The leftmost digits",
                     "The rightmost digits", "Nothing"],
            correct="The decimal points",
            explanation="Align decimal points when adding/subtracting. 3.50 + 2.25 = 5.75.",
        ),
        next_steps=[], marks=1,
        hint="Enter the full expression like 3.5 + 2.25 or 7.5 - 2.25.",
    ),

    "decimal_to_fraction": StepType(
        id="decimal_to_fraction",
        name="Decimal to Fraction",
        description="Convert a decimal to a fraction",
        category="arithmetic",
        inputs=[InputField("n", "Decimal Number", "expression", placeholder="0.75")],
        operation="decimal_to_fraction",
        thinking=ThinkingQuestion(
            question="0.75 as a fraction is:",
            options=["3/4", "75/100", "7/10", "3/5"],
            correct="3/4",
            explanation="0.75 = 75/100 = 3/4 (simplified). Divide numerator and denominator by 25.",
        ),
        next_steps=[], marks=1,
        hint="Enter a decimal. System converts to fraction and simplifies.",
    ),

    "unit_conversion": StepType(
        id="unit_conversion",
        name="Unit Conversion",
        description="Convert between metric units (m, cm, km, g, kg, L, mL)",
        category="arithmetic",
        inputs=[
            InputField("value", "Value", "expression", placeholder="5"),
            InputField("from_unit", "From Unit", "expression", default="km", placeholder="km"),
            InputField("to_unit", "To Unit", "expression", default="m", placeholder="m"),
        ],
        operation="unit_conversion",
        thinking=ThinkingQuestion(
            question="How many centimeters are in 1 meter?",
            options=["100 cm", "10 cm", "1000 cm", "1 cm"],
            correct="100 cm",
            explanation="1 m = 100 cm. 1 km = 1000 m. 1 kg = 1000 g. 1 L = 1000 mL.",
        ),
        next_steps=[], marks=1,
        hint="1 km=1000m, 1 m=100cm, 1 kg=1000g, 1 L=1000mL. Enter value and units.",
    ),

    "perimeter_polygon": StepType(
        id="perimeter_polygon",
        name="Perimeter of Polygon",
        description="Find the perimeter of a polygon (sum of all sides)",
        category="mensuration",
        inputs=[
            InputField("sides", "Side Lengths (comma-separated)", "expression", placeholder="5,3,5,3"),
        ],
        operation="perimeter_polygon",
        thinking=ThinkingQuestion(
            question="How do you find the perimeter of a rectangle?",
            options=["2 × (length + width)", "length × width",
                     "length + width", "4 × length"],
            correct="2 × (length + width)",
            explanation="Perimeter = sum of all sides. Rectangle: 2(l+w). Square: 4 × side.",
        ),
        next_steps=[], marks=1,
        hint="Enter all side lengths separated by commas. Perimeter = sum of all sides.",
    ),

    "factors_multiples": StepType(
        id="factors_multiples",
        name="Factors and Multiples",
        description="Find all factors of a number",
        category="number_theory",
        inputs=[InputField("n", "Number", "expression", placeholder="12")],
        operation="factors_multiples",
        thinking=ThinkingQuestion(
            question="What are the factors of 12?",
            options=["1, 2, 3, 4, 6, 12", "1, 2, 3, 4, 5, 6",
                     "2, 3, 4, 6", "1, 12"],
            correct="1, 2, 3, 4, 6, 12",
            explanation="Factors of 12: numbers that divide 12 exactly. 1, 2, 3, 4, 6, 12.",
        ),
        next_steps=[], marks=1,
        hint="Enter a number. System finds all factors (numbers that divide it exactly).",
    ),

    # ════════════════════════════════════════════
    # CLASS 5-6 — INTEGERS, ALGEBRA, ANGLES
    # ════════════════════════════════════════════

    "integer_operations": StepType(
        id="integer_operations",
        name="Integer Operations",
        description="Add, subtract, multiply, or divide integers (including negative)",
        category="arithmetic",
        inputs=[
            InputField("expression", "Expression (e.g. -5 + 3)", "expression", placeholder="-5 + 3"),
        ],
        operation="integer_operations",
        thinking=ThinkingQuestion(
            question="What is (-5) + 3?",
            options=["-2", "2", "-8", "8"],
            correct="-2",
            explanation="(-5) + 3 = -2. When adding a positive and negative, subtract and keep the sign of the larger.",
        ),
        next_steps=[], marks=1,
        hint="Enter the full expression like -5 + 3 or -4 * -7.",
    ),

    "algebraic_expression_eval": StepType(
        id="algebraic_expression_eval",
        name="Evaluate Algebraic Expression",
        description="Evaluate an expression like 2x + 3 for a given value of x",
        category="algebra",
        inputs=[
            InputField("expression", "Expression", "expression", placeholder="2*x + 3"),
            InputField("var", "Variable", "expression", default="x", placeholder="x"),
            InputField("value", "Value of variable", "expression", placeholder="5"),
        ],
        operation="algebraic_expression_eval",
        thinking=ThinkingQuestion(
            question="If x = 5, what is 2x + 3?",
            options=["13", "10", "8", "15"],
            correct="13",
            explanation="Substitute x = 5: 2(5) + 3 = 10 + 3 = 13.",
        ),
        next_steps=[], marks=1,
        hint="Enter the expression, the variable name, and its value. Substitute and evaluate.",
    ),

    "angle_type": StepType(
        id="angle_type",
        name="Type of Angle",
        description="Classify an angle as acute, right, obtuse, straight, or reflex",
        category="mensuration",
        inputs=[InputField("angle", "Angle (degrees)", "expression", placeholder="45")],
        operation="angle_type",
        thinking=ThinkingQuestion(
            question="An angle of 90° is called:",
            options=["Right angle", "Acute angle", "Obtuse angle", "Straight angle"],
            correct="Right angle",
            explanation="Acute: <90°. Right: =90°. Obtuse: 90-180°. Straight: =180°. Reflex: >180°.",
        ),
        next_steps=[], marks=1,
        hint="Enter angle in degrees. Acute<90, Right=90, Obtuse 90-180, Straight=180.",
    ),

    "angle_sum_triangle": StepType(
        id="angle_sum_triangle",
        name="Angle Sum of Triangle",
        description="Find the missing angle in a triangle (sum = 180°)",
        category="mensuration",
        inputs=[
            InputField("a", "Angle 1 (°)", "expression", placeholder="60"),
            InputField("b", "Angle 2 (°)", "expression", placeholder="50"),
        ],
        operation="angle_sum_triangle",
        thinking=ThinkingQuestion(
            question="The sum of angles in a triangle is:",
            options=["180°", "90°", "360°", "270°"],
            correct="180°",
            explanation="Angles of a triangle always add to 180°. Third angle = 180 - (angle1 + angle2).",
        ),
        next_steps=[], marks=1,
        hint="Enter two angles. Third = 180 - (angle1 + angle2).",
    ),

    "angle_sum_quadrilateral": StepType(
        id="angle_sum_quadrilateral",
        name="Angle Sum of Quadrilateral",
        description="Find the missing angle in a quadrilateral (sum = 360°)",
        category="mensuration",
        inputs=[
            InputField("a", "Angle 1 (°)", "expression", placeholder="90"),
            InputField("b", "Angle 2 (°)", "expression", placeholder="90"),
            InputField("c", "Angle 3 (°)", "expression", placeholder="100"),
        ],
        operation="angle_sum_quadrilateral",
        thinking=ThinkingQuestion(
            question="The sum of angles in a quadrilateral is:",
            options=["360°", "180°", "270°", "540°"],
            correct="360°",
            explanation="Angles of a quadrilateral add to 360°. Fourth = 360 - (a + b + c).",
        ),
        next_steps=[], marks=1,
        hint="Enter three angles. Fourth = 360 - (angle1 + angle2 + angle3).",
    ),

    "linear_equation_one_var": StepType(
        id="linear_equation_one_var",
        name="Solve Linear Equation (One Variable)",
        description="Solve an equation like 2x + 5 = 15",
        category="algebra",
        inputs=[
            InputField("expression", "Equation", "expression", placeholder="2*x + 5 - 15"),
            InputField("var", "Variable", "expression", default="x", placeholder="x"),
        ],
        operation="linear_equation_one_var",
        thinking=ThinkingQuestion(
            question="To solve 2x + 5 = 15, the first step is:",
            options=["Subtract 5 from both sides", "Multiply both sides by 2",
                     "Divide by x", "Add 15 to both sides"],
            correct="Subtract 5 from both sides",
            explanation="2x + 5 = 15 → 2x = 10 → x = 5. Move constants to one side first.",
        ),
        next_steps=[], marks=2,
        hint="Enter equation as expression = 0 (e.g. 2*x + 5 - 15 for 2x+5=15).",
    ),

    "rational_operations": StepType(
        id="rational_operations",
        name="Rational Number Operations",
        description="Add, subtract, multiply, or divide rational numbers (fractions)",
        category="arithmetic",
        inputs=[
            InputField("expression", "Expression (e.g. 3/4 + 1/2)", "expression", placeholder="3/4 + 1/2"),
        ],
        operation="rational_operations",
        thinking=ThinkingQuestion(
            question="What is 3/4 + 1/2?",
            options=["5/4", "4/6", "3/8", "2/3"],
            correct="5/4",
            explanation="3/4 + 1/2 = 3/4 + 2/4 = 5/4. Find common denominator first.",
        ),
        next_steps=[], marks=2,
        hint="Enter the full expression like 3/4 + 1/2 or 2/3 * 4/5.",
    ),

    "algebraic_simplify": StepType(
        id="algebraic_simplify",
        name="Simplify Algebraic Expression",
        description="Simplify expressions by combining like terms",
        category="algebra",
        inputs=[InputField("expression", "Expression", "expression", placeholder="3*x + 2*x - 5 + 7")],
        operation="algebraic_simplify",
        thinking=ThinkingQuestion(
            question="Simplify: 3x + 2x - 5 + 7",
            options=["5x + 2", "5x - 2", "6x + 2", "5x + 12"],
            correct="5x + 2",
            explanation="Combine like terms: 3x + 2x = 5x. -5 + 7 = 2. Result: 5x + 2.",
        ),
        next_steps=[], marks=2,
        hint="Enter the expression. System combines like terms automatically.",
    ),

    "factorise_algebraic": StepType(
        id="factorise_algebraic",
        name="Factorise Algebraic Expression",
        description="Factorise an algebraic expression",
        category="algebra",
        inputs=[
            InputField("expression", "Expression", "expression", placeholder="x**2 - 9"),
            InputField("var", "Variable", "expression", default="x", placeholder="x"),
        ],
        operation="factorise_algebraic",
        thinking=ThinkingQuestion(
            question="Factorise: x² - 9",
            options=["(x+3)(x-3)", "(x-3)²", "(x+9)(x-1)", "(x+3)²"],
            correct="(x+3)(x-3)",
            explanation="x² - 9 = x² - 3² = (x+3)(x-3). This is the difference of squares: a²-b² = (a+b)(a-b).",
        ),
        next_steps=[], marks=2,
        hint="Enter the expression. Common patterns: a²-b²=(a+b)(a-b), a²+2ab+b²=(a+b)².",
    ),

    "algebraic_identity": StepType(
        id="algebraic_identity",
        name="Verify Algebraic Identity",
        description="Verify identities like (a+b)² = a² + 2ab + b²",
        category="algebra",
        inputs=[
            InputField("expression", "LHS Expression", "expression", placeholder="(a+b)**2"),
            InputField("rhs", "RHS Expression", "expression", placeholder="a**2 + 2*a*b + b**2"),
        ],
        operation="algebraic_identity",
        thinking=ThinkingQuestion(
            question="(a + b)² equals:",
            options=["a² + 2ab + b²", "a² + b²", "a² - 2ab + b²", "2a + 2b"],
            correct="a² + 2ab + b²",
            explanation="(a+b)² = a² + 2ab + b². (a-b)² = a² - 2ab + b². (a+b)(a-b) = a² - b².",
        ),
        next_steps=[], marks=2,
        hint="Enter LHS and RHS. System expands and checks if they are equal.",
    ),

    "quadratic_formula": StepType(
        id="quadratic_formula",
        name="Quadratic Formula",
        description="Solve ax² + bx + c = 0 using the quadratic formula",
        category="algebra",
        inputs=[
            InputField("a", "Coefficient a", "expression", placeholder="1"),
            InputField("b", "Coefficient b", "expression", placeholder="-5"),
            InputField("c", "Coefficient c", "expression", placeholder="6"),
        ],
        operation="quadratic_formula",
        thinking=ThinkingQuestion(
            question="The quadratic formula is:",
            options=["x = (-b ± √(b²-4ac)) / 2a", "x = -b / 2a",
                     "x = b² - 4ac", "x = (b + √(b²-4ac)) / a"],
            correct="x = (-b ± √(b²-4ac)) / 2a",
            explanation="x = (-b ± √(b²-4ac)) / 2a. The discriminant b²-4ac determines the nature of roots.",
        ),
        next_steps=[], marks=3,
        hint="Enter a, b, c from ax²+bx+c=0. System applies the quadratic formula.",
    ),

    "nature_of_roots": StepType(
        id="nature_of_roots",
        name="Nature of Roots (Discriminant)",
        description="Determine the nature of roots using the discriminant",
        category="algebra",
        inputs=[
            InputField("a", "Coefficient a", "expression", placeholder="1"),
            InputField("b", "Coefficient b", "expression", placeholder="-4"),
            InputField("c", "Coefficient c", "expression", placeholder="4"),
        ],
        operation="nature_of_roots",
        thinking=ThinkingQuestion(
            question="If the discriminant (b²-4ac) is zero, the roots are:",
            options=["Real and equal", "Real and distinct", "No real roots", "Imaginary"],
            correct="Real and equal",
            explanation="D > 0: real and distinct. D = 0: real and equal. D < 0: no real roots (imaginary).",
        ),
        next_steps=[], marks=2,
        hint="Enter a, b, c. Discriminant = b² - 4ac. D>0: distinct, D=0: equal, D<0: no real roots.",
    ),

    "simultaneous_linear": StepType(
        id="simultaneous_linear",
        name="Solve Simultaneous Linear Equations",
        description="Solve a system of two linear equations",
        category="algebra",
        inputs=[
            InputField("expression", "Equation 1 (as expression=0)", "expression", placeholder="2*x + 3*y - 13"),
            InputField("rhs", "Equation 2 (as expression=0)", "expression", placeholder="3*x - y - 3"),
        ],
        operation="simultaneous_linear",
        thinking=ThinkingQuestion(
            question="To solve 2x+3y=13 and 3x-y=3, which method can be used?",
            options=["Substitution or elimination", "Only substitution",
                     "Only elimination", "Quadratic formula"],
            correct="Substitution or elimination",
            explanation="Systems of linear equations can be solved by substitution, elimination, or graphically.",
        ),
        next_steps=[], marks=3,
        hint="Enter both equations as expressions = 0. System solves for both variables.",
    ),

    "consistency_check": StepType(
        id="consistency_check",
        name="Check Consistency of System",
        description="Check if a system of linear equations is consistent",
        category="algebra",
        inputs=[
            InputField("a1", "a₁ (coeff of x in eq1)", "expression", placeholder="2"),
            InputField("b1", "b₁ (coeff of y in eq1)", "expression", placeholder="3"),
            InputField("c1", "c₁ (constant in eq1)", "expression", placeholder="13"),
            InputField("a2", "a₂ (coeff of x in eq2)", "expression", placeholder="4"),
            InputField("b2", "b₂ (coeff of y in eq2)", "expression", placeholder="6"),
            InputField("c2", "c₂ (constant in eq2)", "expression", placeholder="26"),
        ],
        operation="consistency_check",
        thinking=ThinkingQuestion(
            question="A system is inconsistent (no solution) when:",
            options=["a₁/a₂ = b₁/b₂ ≠ c₁/c₂", "a₁/a₂ = b₁/b₂ = c₁/c₂",
                     "a₁/a₂ ≠ b₁/b₂", "a₁ = a₂"],
            correct="a₁/a₂ = b₁/b₂ ≠ c₁/c₂",
            explanation="If ratios of coefficients are equal but constants differ → parallel lines → no solution.",
        ),
        next_steps=[], marks=2,
        hint="Enter all 6 coefficients. Check a₁/a₂, b₁/b₂, c₁/c₂ ratios.",
    ),
}


def get_step_type(step_id: str) -> Optional[StepType]:
    """Get a step type definition by ID."""
    return STEP_TYPES.get(step_id)


def get_step_types_by_category(category: str) -> list:
    """Get all step types in a category."""
    return [st for st in STEP_TYPES.values() if st.category == category]


def get_all_categories() -> list:
    """Get all unique categories."""
    return list(set(st.category for st in STEP_TYPES.values()))


def get_all_step_types() -> list:
    """Get all step type definitions."""
    return list(STEP_TYPES.values())
