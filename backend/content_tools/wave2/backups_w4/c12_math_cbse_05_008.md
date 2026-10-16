## ELI5
A coaster's banking angle is set by arctan of distance over ten, and the design needs how steeply that angle changes. The inverse trig derivatives are manufactured by running the defining identity backwards: rewrite x equals tan y, differentiate implicitly, convert the trig of y back into x via a Pythagorean identity, and let the principal branch decide the radical's sign. Six such formulas result - each a reciprocal wearing a root or a sum of squares.

## DEFINITION
The derivative of an inverse trigonometric function \( y = \sin^{-1}x \), \( \cos^{-1}x \), \( \tan^{-1}x \), \( \cot^{-1}x \), \( \sec^{-1}x \), or \( \csc^{-1}x \) is obtained by differentiating the identity \( x = \sin y \), \( x = \cos y \), etc., implicitly with respect to \( x \), using the chain rule and the principal value branch restrictions to determine the sign of the radical. For example, \( \frac{d}{dx}(\sin^{-1}x) = \frac{1}{\sqrt{1-x^2}} \) for \( x \in (-1, 1) \).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive all six inverse trigonometric derivatives from first principles using implicit differentiation, correctly state the domain restrictions for each formula, apply the chain rule to composite functions like \( \sin^{-1}(2x) \) or \( \tan^{-1}(\sqrt{x}) \), and identify the correct principal value branch when simplifying expressions involving \( \sqrt{1-x^2} \) or \( \sqrt{x^2-1} \).

## SCOPE_BOUNDARY
This node covers the derivation and application of derivatives of the six inverse trigonometric functions (sin⁻¹x, cos⁻¹x, tan⁻¹x, cot⁻¹x, sec⁻¹x, csc⁻¹x) including their domains, chain rule applications, and simplification using trigonometric identities. It does NOT cover integration of inverse trigonometric functions (Chapter 7), higher-order derivatives of inverse trig functions beyond second order, or complex-valued inverse trigonometric functions.

## WALKTHROUGH
Imagine you are designing a roller coaster track where the banking angle \( \theta \) at any point depends on the horizontal distance \( x \) from the start as \( \theta = \tan^{-1}(x/10) \). To find how fast the banking angle changes per metre of track, you need \( d\theta/dx \) — the derivative of an inverse trigonometric function. Start by recalling Class 11: if \( y = \tan^{-1}x \), then \( x = \tan y \). Differentiate both sides with respect to \( x \) using the chain rule: \( 1 = \sec^2 y \cdot dy/dx \). Now express \( \sec^2 y \) in terms of \( x \) using \( \sec^2 y = 1 + \tan^2 y = 1 + x^2 \). This gives \( dy/dx = 1/(1+x^2) \). The key insight: implicit differentiation + Pythagorean identity + principal value branch selection = derivative formula.

Takeaway first: every inverse-trig derivative is implicit differentiation plus a Pythagorean cleanup, with the branch choosing the sign of the root. Exam moves: derivation questions building all six formulas from first principles, restriction questions stating each domain, chain-rule questions on composites, and branch questions on radical signs. Method: rerun the banking angle - start from x equals tan y, differentiate, substitute secant squared equals one plus x squared, and read the formula. Check yourself: the sec and cosec formulas carry absolute values precisely because the branch cannot decide the sign for every x; the others know their neighbourhood. Drill: derive two of the six formulas and differentiate one composite like arcsin of twice x.

## DIAGNOSTIC_QUESTION_1
Write the derivative of \( \cos^{-1}x \) with respect to \( x \) and state its domain.

## DIAGNOSTIC_ANSWER_1
The derivative is \( \frac{d}{dx}(\cos^{-1}x) = -\frac{1}{\sqrt{1-x^2}} \) for \( x \in (-1, 1) \). A wrong answer \( +\frac{1}{\sqrt{1-x^2}} \) reveals the student forgot the negative sign from \( \frac{d}{dx}(\cos y) = -\sin y \) and/or confused it with \( \sin^{-1}x \). Writing domain as \( [-1, 1] \) instead of \( (-1, 1) \) shows they don't realize the derivative is undefined at endpoints where \( \sqrt{1-x^2} = 0 \).

## DIAGNOSTIC_QUESTION_2
Explain why \( \frac{d}{dx}(\sin^{-1}x) = \frac{1}{\sqrt{1-x^2}} \) uses the positive square root, not \( \pm \frac{1}{\sqrt{1-x^2}} \).

## DIAGNOSTIC_ANSWER_2
Because \( y = \sin^{-1}x \) has range \( [-\pi/2, \pi/2] \) (principal value branch), \( \cos y \ge 0 \) in this interval, so \( \cos y = +\sqrt{1-\sin^2 y} = +\sqrt{1-x^2} \). A student who writes \( \pm \) doesn't understand that the derivative must be a single-valued function, and the principal branch fixes the sign of \( \cos y \).

## DIAGNOSTIC_QUESTION_3
Find \( \frac{dy}{dx} \) if \( y = \sin^{-1}(2x\sqrt{1-x^2}) \) for \( x \in [-1/\sqrt{2}, 1/\sqrt{2}] \).

## DIAGNOSTIC_ANSWER_3
Let \( x = \sin \theta \), then \( y = \sin^{-1}(2\sin\theta\cos\theta) = \sin^{-1}(\sin 2\theta) = 2\theta = 2\sin^{-1}x \). So \( dy/dx = 2/\sqrt{1-x^2} \). A student who directly applies chain rule without substitution gets \( \frac{2\sqrt{1-x^2} - 2x^2/\sqrt{1-x^2}}{\sqrt{1-4x^2(1-x^2)}} \) and fails to simplify the denominator to \( |1-2x^2| \), missing the domain restriction that makes it \( 1-2x^2 \) (positive in given domain).

## DIAGNOSTIC_QUESTION_4
Compare the derivatives of \( \tan^{-1}x \) and \( \cot^{-1}x \). What is their sum? What does this imply about the relationship between the functions?

## DIAGNOSTIC_ANSWER_4
\( \frac{d}{dx}(\tan^{-1}x) = \frac{1}{1+x^2} \), \( \frac{d}{dx}(\cot^{-1}x) = -\frac{1}{1+x^2} \). Their sum is 0, so \( \tan^{-1}x + \cot^{-1}x = \text{constant} = \pi/2 \) (for \( x > 0 \)). A student who says the sum is \( \pi/2 \) for all \( x \) misses that for \( x < 0 \), the principal values give \( \tan^{-1}x + \cot^{-1}x = -\pi/2 \), revealing ignorance of principal value branches of \( \cot^{-1}x \).

## DIAGNOSTIC_QUESTION_5
A student writes: \( \frac{d}{dx}(\sec^{-1}x) = \frac{1}{x\sqrt{x^2-1}} \) for \( |x| > 1 \). Is this correct? If not, correct it.

## DIAGNOSTIC_ANSWER_5
Incorrect. The correct formula is \( \frac{d}{dx}(\sec^{-1}x) = \frac{1}{|x|\sqrt{x^2-1}} \) for \( |x| > 1 \). The student missed the absolute value on \( x \). This matters because for \( x < -1 \), the principal value branch of \( \sec^{-1}x \) is in \( (\pi/2, \pi] \) where \( \tan y < 0 \), but \( \sqrt{x^2-1} > 0 \), so the derivative must be negative. Without \( |x| \), the formula gives positive derivative for negative \( x \), contradicting the decreasing nature of \( \sec^{-1}x \) on \( (-\infty, -1] \).

## DIAGNOSTIC_QUESTION_6
Construct a function \( f(x) \) involving an inverse trigonometric function such that \( f'(x) = \frac{1}{\sqrt{1-x^2}} + \frac{2x}{1+x^2} \). Justify your answer.

## DIAGNOSTIC_ANSWER_6
\( f(x) = \sin^{-1}x + \tan^{-1}(x^2) + C \) works because \( \frac{d}{dx}\sin^{-1}x = \frac{1}{\sqrt{1-x^2}} \) and \( \frac{d}{dx}\tan^{-1}(x^2) = \frac{2x}{1+x^4} \) — wait, that gives \( x^4 \). Correct construction: \( f(x) = \sin^{-1}x + \tan^{-1}(x^2) \) is wrong. The correct one is \( f(x) = \sin^{-1}x + \tan^{-1}(x^2) \) doesn't match. Actually \( \frac{d}{dx}\tan^{-1}(x^2) = \frac{2x}{1+x^4} \). To get \( \frac{2x}{1+x^2} \), use \( \tan^{-1}(x^2) \) no. Use \( \log(1+x^2) \) derivative is \( \frac{2x}{1+x^2} \). So \( f(x) = \sin^{-1}x + \log(1+x^2) \). But the question asks for inverse trig only. Then it's impossible with only inverse trig functions because \( \frac{2x}{1+x^2} \) is not the derivative of any single inverse trig function. A good answer recognises this impossibility and explains why.

## COMMON_MISCONCEPTION
Students write \( \frac{d}{dx}(\sin^{-1}(2x)) = \frac{1}{\sqrt{1-(2x)^2}} \) forgetting the chain rule factor of 2. The correct derivative is \( \frac{2}{\sqrt{1-4x^2}} \). They also confuse \( \sin^{-1}x \) (arcsin) with \( (\sin x)^{-1} = \csc x \), leading to nonsense like \( \frac{d}{dx}(\sin^{-1}x) = -\csc x \cot x \). Another error: simplifying \( \sqrt{1-\sin^2(\sin^{-1}x)} \) to \( \sqrt{1-x^2} \) without checking the sign of \( \cos(\sin^{-1}x) \), which is positive only because the principal branch of \( \sin^{-1} \) is \( [-\pi/2, \pi/2] \) where cosine is non-negative.

## ON_FAILURE
If a student makes the chain rule error, have them redo c12_math_cbse_05_006 (Chain Rule) with 5 practice problems of the form \( \sin^{-1}(g(x)) \). If they confuse \( \sin^{-1} \) with \( \csc \), revisit c11_math_cbse_03_003 (Trigonometric Functions Definition) and c11_math_cbse_03_007 (Domain and Range) to reinforce notation. For sign errors in radicals, make them explicitly write the principal value range for each inverse trig function and determine the sign of the corresponding trig function in that range — do this for all six functions as a table.

## PREREQUISITE_NODE_IDS
c12_math_cbse_05_006, c12_math_cbse_05_007, c11_math_cbse_03_003, c11_math_cbse_03_007, c11_math_cbse_13_008, c11_math_cbse_13_010, c12_math_cbse_05_003, c12_eco_cbse_02_004

## PREREQUISITE_REASONS
c12_math_cbse_05_006: Chain rule is essential for differentiating composite inverse trig functions like sin⁻¹(2x).
c12_math_cbse_05_007: Implicit differentiation is the method used to derive all inverse trig derivatives.
c11_math_cbse_03_003: Defines sin, cos, tan and their inverses with principal value branches.
c11_math_cbse_03_007: Domain and range of trigonometric functions determine the sign of radicals in derivatives.
c11_math_cbse_13_008: Derivative of polynomial functions — basic differentiation rules.
c11_math_cbse_13_010: Derivatives of trigonometric functions (sin, cos, tan) used in implicit differentiation step.
c12_math_cbse_05_003: Derivatives of inverse trigonometric functions use composition of continuous functions (e.g., \(\sin^{-1}(x)\) is continuous on \([-1,1]\)).  
c12_eco_cbse_02_004: c12_eco_cbse_02_004 | Marginal rate of substitution in indifference curves: MRS = -dy/dx often involves inverse trig derivatives in Cobb-Douglas utility functions.  

## FORWARD_NODE_IDS
c12_math_cbse_05_009, c12_math_cbse_05_010, c12_math_cbse_05_011
## FORWARD_REASONS
c12_math_cbse_05_009: Logarithmic differentiation often combines with inverse trig derivatives in complex functions.
c12_math_cbse_05_010: Parametric differentiation frequently involves inverse trig functions (e.g., x = a cos θ, y = a sin θ).
c12_math_cbse_05_011: Second order derivatives of inverse trig functions appear in differential equations and curvature problems.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_006, c11_math_cbse_10_008, c11_math_cbse_11_004, c11_math_cbse_11_006
## CROSS_SUBJECT_REASONS
c11_math_cbse_10_006: Slope of a line (dy/dx) — inverse trig derivatives give slopes of curves like y = tan⁻¹x.
c11_math_cbse_10_008: Angle between two lines uses tan⁻¹ formula; its derivative appears in rate of change of angle problems.
c11_math_cbse_11_004: Parabola focus-directrix property — derivative of tan⁻¹ gives angle of tangent.
c11_math_cbse_11_006: Ellipse eccentricity — inverse trig derivatives appear in orbital mechanics and geometry problems.

## CHAIN_DESCRIPTION
c11_math_cbse_03_003 -> c12_math_cbse_05_006 -> c12_math_cbse_05_008 -> c12_math_cbse_05_011

## THIS_FORMULA
\( \frac{d}{dx}(\sin^{-1}x) = \frac{1}{\sqrt{1-x^2}}, x \in (-1, 1) \); \( \frac{d}{dx}(\cos^{-1}x) = -\frac{1}{\sqrt{1-x^2}}, x \in (-1, 1) \); \( \frac{d}{dx}(\tan^{-1}x) = \frac{1}{1+x^2}, x \in \mathbb{R} \); \( \frac{d}{dx}(\cot^{-1}x) = -\frac{1}{1+x^2}, x \in \mathbb{R} \); \( \frac{d}{dx}(\sec^{-1}x) = \frac{1}{|x|\sqrt{x^2-1}}, |x| > 1 \); \( \frac{d}{dx}(\csc^{-1}x) = -\frac{1}{|x|\sqrt{x^2-1}}, |x| > 1 \)

## FORMULA_VARIABLES
x = independent variable (real number in the domain of the inverse trigonometric function); y = dependent variable = inverse trigonometric function of x; dy/dx = derivative of the inverse trigonometric function with respect to x.

## FORMULA_UNITS
dimensionless (pure mathematical functions, no physical units unless applied to a physical context like angle in radians per unit length)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_01_003 | In physics, the angle of a pendulum or inclined plane often involves inverse trig functions; their derivatives give angular velocity/acceleration.
 c12_phy_cbse_02_005 | Electric field of a dipole: angle dependence uses tan⁻¹, derivative gives rate of change of field with angle.
 c12_eco_cbse_02_004 | Marginal rate of substitution in indifference curves: MRS = -dy/dx often involves inverse trig derivatives in Cobb-Douglas utility functions.
## PREREQ_CONCEPT
Implicit differentiation and principal value branches of inverse trigonometric functions from Class 11.

## PREREQ_BEFORE
Student must be able to differentiate sin y, cos y, tan y implicitly with respect to x and solve for dy/dx, and must recall the principal value ranges of all six inverse trigonometric functions.

## PREREQ_STUCK
Review implicit differentiation (c12_math_cbse_05_007) and the principal value branch table for inverse trig functions (Class 11 Trigonometry chapter).

## WORKED_EXAMPLE_1
PROBLEM: A camera is mounted on a pole 10 metres high. A car moves away from the pole at 20 m/s. Find the rate at which the camera's angle of depression changes when the car is 15 metres from the pole. (Angle of depression θ satisfies tan θ = 10/x where x is horizontal distance.)

STEPS:
- Step 1: Identify given and unknown. Given: pole height = 10 m, dx/dt = 20 m/s (car moving away), x = 15 m at the instant of interest. Unknown: dθ/dt.
- Step 2: Write the relationship. tan θ = 10/x ⇒ θ = tan⁻¹(10/x). This is an inverse trigonometric function of x.
- Step 3: Differentiate with respect to time t using chain rule. dθ/dt = dθ/dx · dx/dt. First find dθ/dx = d/dx[tan⁻¹(10/x)].
- Step 4: Apply chain rule to tan⁻¹(10/x). Let u = 10/x. d/dx[tan⁻¹u] = (1/(1+u²)) · du/dx. Here du/dx = -10/x². So dθ/dx = (1/(1+(10/x)²)) · (-10/x²) = (1/((x²+100)/x²)) · (-10/x²) = x²/(x²+100) · (-10/x²) = -10/(x²+100).
- Step 5: Substitute x = 15 m and dx/dt = 20 m/s. dθ/dt = (-10/(15²+100)) × 20 = (-10/325) × 20 = -200/325 = -8/13 rad/s. Negative sign means angle of depression is decreasing (camera tilts up).

REASONING: The problem models a real-world related rates situation using tan⁻¹. The chain rule is applied twice: first to differentiate the inverse trig function, then to relate dθ/dt to dx/dt. The algebraic simplification of the compound fraction is critical — many students make errors here by not combining 1 + (10/x)² correctly.

ANSWER: -8/13 rad/s (angle of depression decreasing at 8/13 rad/s)

## WORKED_EXAMPLE_2
PROBLEM: Differentiate y = sin⁻¹( (2x)/(1+x²) ) with respect to x, for x ∈ (-1, 1).

STEPS:
- Step 1: Recognize the expression inside sin⁻¹. It matches the double-angle identity: sin 2θ = 2 tan θ / (1 + tan² θ). Set x = tan θ, so θ = tan⁻¹x.
- Step 2: Substitute x = tan θ. Then (2x)/(1+x²) = 2 tan θ / (1 + tan² θ) = sin 2θ.
- Step 3: Rewrite y = sin⁻¹(sin 2θ). Now apply principal value branch: sin⁻¹(sin 2θ) = 2θ only if 2θ ∈ [-π/2, π/2]. Since x ∈ (-1, 1), θ = tan⁻¹x ∈ (-π/4, π/4), so 2θ ∈ (-π/2, π/2). Condition satisfied.
- Step 4: Thus y = 2θ = 2 tan⁻¹x. Differentiate: dy/dx = 2 · d/dx(tan⁻¹x) = 2/(1+x²).
- Step 5: Verify by direct chain rule (optional): d/dx[sin⁻¹(2x/(1+x²))] = 1/√(1 - (2x/(1+x²))²) · d/dx(2x/(1+x²)). The derivative of the inner function is (2(1+x²) - 2x(2x))/(1+x²)² = (2-2x²)/(1+x²)². The radical simplifies to √((1-x²)²/(1+x²)²) = |1-x²|/(1+x²) = (1-x²)/(1+x²) since x²<1. Multiplying gives (1+x²)/(1-x²) · (2-2x²)/(1+x²)² = 2(1-x²)/( (1-x²)(1+x²) ) = 2/(1+x²). Matches.

REASONING: The substitution method using trigonometric identities is far more efficient than brute-force chain rule for this type of problem. It exploits the fact that (2x)/(1+x²) is exactly sin(2 tan⁻¹x). The domain check for the principal value branch is essential — if x > 1, the simplification would be different (y = π - 2 tan⁻¹x).

ANSWER: dy/dx = 2/(1+x²)

## WORKED_EXAMPLE_3
PROBLEM: Find the second derivative d²y/dx² of y = tan⁻¹( √( (1-x)/(1+x) ) ) for x ∈ (-1, 1].

STEPS:
- Step 1: Simplify the function using substitution. Let x = cos 2θ, where θ ∈ [0, π/2) so that 2θ ∈ [0, π) and x ∈ (-1, 1]. Then √((1-x)/(1+x)) = √((1-cos 2θ)/(1+cos 2θ)) = √((2 sin²θ)/(2 cos²θ)) = tan θ (positive since θ ∈ [0, π/2)).
- Step 2: So y = tan⁻¹(tan θ) = θ (since θ ∈ [0, π/2) ⊂ (-π/2, π/2), principal value holds).
- Step 3: Since x = cos 2θ, we have θ = (1/2) cos⁻¹x. Thus y = (1/2) cos⁻¹x.
- Step 4: First derivative: dy/dx = (1/2) · (-1/√(1-x²)) = -1/(2√(1-x²)).
- Step 5: Second derivative: d²y/dx² = d/dx[ -1/2 · (1-x²)⁻¹/² ] = -1/2 · (-1/2) · (1-x²)⁻³/² · (-2x) = -1/2 · (-1/2) · (-2x) · (1-x²)⁻³/² = -x/(2(1-x²)³/²).
- Step 6: Check domain: x ∈ (-1, 1), denominator non-zero. At x=1, derivative undefined (vertical tangent).

REASONING: This problem combines inverse trig simplification (using half-angle substitution), principal value branch verification, and second-order differentiation. The substitution x = cos 2θ converts the messy square root into a simple tan θ, avoiding quotient rule and chain rule on the radical. The second derivative uses the chain rule on (1-x²)⁻¹/².

ANSWER: d²y/dx² = -x / [2(1-x²)^(3/2)]

## COMPETENCY_QUESTION_1
QUESTION: A student claims that for all x ∈ (-1, 1), sin⁻¹(2x√(1-x²)) = 2 sin⁻¹x. Is this true? If not, find the correct expression and explain the error.

COMPETENCY: Error identification and correction; understanding principal value branches

STEPS:
- Step 1: Test the claim with a specific value, e.g., x = 0.9.
- Step 2: Compute LHS: sin⁻¹(2×0.9×√(1-0.81)) = sin⁻¹(1.8×√0.19) = sin⁻¹(1.8×0.4359) = sin⁻¹(0.7846) ≈ 0.90 rad.
- Step 3: Compute RHS: 2 sin⁻¹(0.9) ≈ 2 × 1.1198 = 2.2396 rad.
- Step 4: They are not equal. The error is ignoring the principal value range of sin⁻¹. For x > 1/√2, 2 sin⁻¹x > π/2, but sin⁻¹ output is always ≤ π/2.
- Step 5: Correct expression: Let x = sin θ, θ ∈ [-π/2, π/2]. Then sin⁻¹(2x√(1-x²)) = sin⁻¹(sin 2θ). This equals 2θ if 2θ ∈ [-π/2, π/2] i.e., θ ∈ [-π/4, π/4] i.e., x ∈ [-1/√2, 1/√2]. For x ∈ [1/√2, 1), 2θ ∈ [π/2, π], so sin⁻¹(sin 2θ) = π - 2θ = π - 2 sin⁻¹x. For x ∈ (-1, -1/√2], 2θ ∈ (-π, -π/2], so sin⁻¹(sin 2θ) = -π - 2θ = -π - 2 sin⁻¹x.

ANSWER: The claim is false. Correct piecewise expression:
sin⁻¹(2x√(1-x²)) = 
2 sin⁻¹x, if x ∈ [-1/√2, 1/√2]
π - 2 sin⁻¹x, if x ∈ [1/√2, 1)
-π - 2 sin⁻¹x, if x ∈ (-1, -1/√2]

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A particle moves along the curve y = tan⁻¹(x²) in the xy-plane. At the instant when x = 1, its x-coordinate is increasing at 3 cm/s. Find the rate of change of the angle that the tangent to the curve makes with the positive x-axis at that instant.

COMPETENCY: Translating real-world situations to mathematical expressions; multi-step calculus application

STEPS:
- Step 1: The angle ψ that the tangent makes with the x-axis satisfies tan ψ = dy/dx. So ψ = tan⁻¹(dy/dx).
- Step 2: Find dy/dx for y = tan⁻¹(x²). dy/dx = 1/(1+x⁴) · 2x = 2x/(1+x⁴).
- Step 3: At x = 1, slope = dy/dx = 2/(1+1) = 1. So ψ = tan⁻¹(1) = π/4.
- Step 4: We need dψ/dt at x = 1. ψ = tan⁻¹(2x/(1+x⁴)). Differentiate wrt t: dψ/dt = dψ/dx · dx/dt.
- Step 5: Compute dψ/dx = d/dx[tan⁻¹(2x/(1+x⁴))]. Let u = 2x/(1+x⁴). dψ/dx = (1/(1+u²)) · du/dx.
- Step 6: du/dx = [2(1+x⁴) - 2x(4x³)]/(1+x⁴)² = [2+2x⁴-8x⁴]/(1+x⁴)² = 2(1-3x⁴)/(1+x⁴)².
- Step 7: At x = 1, u = 1, so 1/(1+u²) = 1/2. du/dx = 2(1-3)/(1+1)² = 2(-2)/4 = -1.
- Step 8: dψ/dx = (1/2) × (-1) = -1/2. Given dx/dt = 3 cm/s, dψ/dt = (-1/2) × 3 = -1.5 rad/s.
- Step 9: Interpret: The angle is decreasing at 1.5 rad/s (tangent is rotating clockwise).

ANSWER: -1.5 rad/s (angle decreasing at 1.5 rad/s)

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The key insight: implicit ______ + Pythagorean identity + principal value branch selection = derivative formula.

## DIAGNOSTIC_ANSWER_7
differentiation

Differentiation is the engine in the formula's construction: implicit first, identity second, branch last - the assembly line in three words. **A wrong answer (integration) reveals the student has run the factory backwards and still expected the same formulas out.**
