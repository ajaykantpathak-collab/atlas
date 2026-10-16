## ELI5
A coaster's blueprint needs three landmarks: peaks and valleys (critical points, where the slope zeroes or fails), and the mid-slopes where the track changes its curl from valley-bending to hill-bending - inflection points. Critical points come from the first derivative; inflection points come from the second, and only when that second derivative actually changes sign - a zero that never changes sign is a false positive. Confusing the two derivative families is the classic blueprint error.

## DEFINITION
A **critical point** of a function \( f(x) \) is a point \( x = c \) in the domain of \( f \) where either \( f'(c) = 0 \) or \( f \) is not differentiable. An **inflection point** is a point \( x = c \) where the function is continuous and the concavity changes (i.e., \( f''(x) \) changes sign as \( x \) passes through \( c \)). At an inflection point, \( f''(c) = 0 \) or \( f''(c) \) does not exist, but the sign change of \( f'' \) is necessary.

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student can identify all critical points of a given function (including points of non-differentiability), classify them as local maxima, local minima, or inflection points using first and second derivative tests, and determine intervals of concavity. They can also sketch the graph of a polynomial or rational function marking critical points, inflection points, and asymptotes.

## SCOPE_BOUNDARY
Covers critical points and inflection points for functions differentiable on open intervals, including algebraic, trigonometric, exponential, and logarithmic functions. Does NOT cover higher-order derivative tests beyond the second derivative, parametric or implicit curves, or functions with discontinuities (except non-differentiable points like |x|). Restricted to real-valued functions of a single real variable as per NCERT Class 12.

## WALKTHROUGH
Imagine you are designing a roller coaster track — you need to know where the track reaches a peak (local maximum), a valley (local minimum), and where it changes from curving upward to curving downward (inflection point). These are exactly the critical points and inflection points of the height function. Start by finding the first derivative \( f'(x) \) and solving \( f'(x) = 0 \); also check where \( f'(x) \) does not exist (e.g., \( |x| \) at \( x=0 \)). These are your critical points. Use the first derivative test (sign chart of \( f' \)) or second derivative test (\( f'' \)) to classify each as max, min, or neither. For inflection points, find \( f''(x) \), solve \( f''(x)=0 \) or where \( f'' \) does not exist, and verify a sign change of \( f'' \) across that point. The key insight: **critical points come from \( f' \), inflection points come from \( f'' \) — never confuse the two.**

Takeaway first: f-prime supplies the peaks and valleys, f-double-prime supplies the curl changes - two derivatives, two kinds of landmark, never cross-examined. Exam moves: identification questions finding both kinds of points, classification questions via first or second derivative tests, concavity questions naming the intervals, and sketching questions placing all landmarks plus asymptotes. Method: rerun the coaster - first derivative zeroed for summits, second derivative zeroed and sign-checked for the curl's flip. Check yourself: an inflection point needs continuity plus a sign change of f-double-prime; a vanishing second derivative alone is a suspect, not a conviction. Drill: find all critical and inflection points of one cubic and sketch them on one axis.

## DIAGNOSTIC_QUESTION_1
State the definition of a critical point of a function \( f(x) \). Give an example of a function that has a critical point where the derivative does not exist.

## DIAGNOSTIC_ANSWER_1
A critical point of \( f(x) \) is a point \( x=c \) in the domain of \( f \) where either \( f'(c)=0 \) or \( f \) is not differentiable at \( c \). Example: \( f(x)=|x| \) has a critical point at \( x=0 \) because \( f'(0) \) does not exist (left derivative = -1, right derivative = 1). A wrong answer (e.g., "critical point only where \( f'(x)=0 \)") reveals the student ignores non-differentiable points, a common error in board exams when dealing with modulus or piecewise functions.

## DIAGNOSTIC_QUESTION_2
Explain why \( f(x)=x^3 \) has a critical point at \( x=0 \) but it is NOT a local maximum or minimum. What is it instead?

## DIAGNOSTIC_ANSWER_2
\( f'(x)=3x^2 \), so \( f'(0)=0 \) → critical point. But \( f'(x) \) does not change sign around 0 (it is positive on both sides), so by the first derivative test, \( x=0 \) is neither a local max nor min — it is a **point of inflection**. A student who says "it's a minimum because \( f''(0)=0 \) and \( f'''(0)>0 \)" confuses higher-order tests; NCERT only uses first/second derivative tests. This misconception leads to misclassifying saddle points as extrema in JEE.

## DIAGNOSTIC_QUESTION_3
Find all critical points of \( f(x)=x^3-3x^2+4 \) and classify each using the second derivative test. Also find any inflection points.

## DIAGNOSTIC_ANSWER_3
\( f'(x)=3x^2-6x=3x(x-2) \). Critical points: \( x=0, 2 \).
\( f''(x)=6x-6 \).
At \( x=0 \): \( f''(0)=-6<0 \) → local maximum, value \( f(0)=4 \).
At \( x=2 \): \( f''(2)=6>0 \) → local minimum, value \( f(2)=0 \).
Inflection point: \( f''(x)=0 \Rightarrow x=1 \). Check sign change: \( f''(0.5)=-3<0 \), \( f''(1.5)=3>0 \) → concavity changes from down to up. Inflection point at \( (1, f(1)) = (1, 2) \).
A wrong answer (e.g., missing \( x=0 \) or not checking sign change for inflection) reveals incomplete critical point analysis or confusion between \( f'=0 \) and \( f''=0 \).

## DIAGNOSTIC_QUESTION_4
A student claims: "If \( f''(c)=0 \), then \( x=c \) is always an inflection point." Is this true? Justify with a counterexample.

## DIAGNOSTIC_ANSWER_4
False. \( f''(c)=0 \) is necessary but not sufficient; the sign of \( f'' \) must change across \( c \). Counterexample: \( f(x)=x^4 \), \( f''(x)=12x^2 \), \( f''(0)=0 \) but \( f''(x) \ge 0 \) on both sides (no sign change). So \( x=0 \) is not an inflection point (it's a local minimum). A student who says "true" confuses the condition \( f''(c)=0 \) with the definition of inflection point, a frequent trap in MCQs (e.g., JEE Main 2021).

## DIAGNOSTIC_QUESTION_5
Consider \( f(x)=x^3-6x^2+9x+15 \) on \( [0, 5] \). A student finds critical points \( x=1, 3 \) and evaluates \( f(0)=15, f(1)=19, f(3)=15, f(5)=35 \). They conclude absolute maximum is 35 at \( x=5 \) and absolute minimum is 15 at \( x=0 \) and \( x=3 \). Is this correct? If not, identify the error.

## DIAGNOSTIC_ANSWER_5
The absolute maximum is correct (35 at \( x=5 \)). But the absolute minimum is **not** 15 — the function values at endpoints are 15 and 35, and at critical points are 19 and 15. The minimum value is 15, occurring at \( x=0 \) and \( x=3 \). The student's conclusion is actually correct in this case, but their method missed checking \( f(3)=15 \) properly? Wait, they listed \( f(3)=15 \). The error is subtle: they said "absolute minimum is 15 at \( x=0 \) and \( x=3 \)" — that is correct. But if they had missed \( f(3) \) or miscomputed, that would be an error. The diagnostic tests whether the student evaluates **all** critical points **and** endpoints. A common error is forgetting endpoints or critical points where \( f' \) does not exist.

## DIAGNOSTIC_QUESTION_6
Construct a function \( f(x) \) defined on \( \mathbb{R} \) that has exactly two critical points: one local maximum and one inflection point (but no local minimum). Sketch its graph roughly and explain your reasoning.

## DIAGNOSTIC_ANSWER_6
Example: \( f(x) = -x^3 + 3x \). \( f'(x) = -3x^2 + 3 = -3(x-1)(x+1) \). Critical points: \( x=-1, 1 \).
\( f''(x) = -6x \).
At \( x=-1 \): \( f''(-1)=6>0 \) → local minimum? Wait, we want local maximum. Let's adjust: \( f(x) = x^3 - 3x \). \( f'(x)=3x^2-3=3(x-1)(x+1) \). Critical points: \( x=-1, 1 \).
\( f''(x)=6x \).
At \( x=-1 \): \( f''(-1)=-6<0 \) → local maximum.
At \( x=1 \): \( f''(1)=6>0 \) → local minimum. That gives both max and min.
To have max and inflection but no min: need a critical point where \( f'=0 \) but \( f''=0 \) and no sign change of \( f' \) (so not extremum) and another where \( f'=0 \) and \( f''<0 \). Try \( f(x) = -x^3 \)? \( f'(x)=-3x^2 \), critical point at \( x=0 \) only.
Better: \( f(x) = -(x-1)^3 + 3(x-1) \)? Same shape.
Actually, a cubic always has either 0 or 2 critical points, and if two, one is max and one is min. So a cubic cannot have max and inflection without min.
Need a function with a critical point that is an inflection point (like \( x^3 \) at 0) and another that is a max. Example: \( f(x) = x^3 - 3x^2 \)? \( f'(x)=3x^2-6x=3x(x-2) \). Critical points: 0, 2. \( f''(x)=6x-6 \). At \( x=0 \): \( f''(0)=-6<0 \) → max. At \( x=2 \): \( f''(2)=6>0 \) → min. Still both.
What about \( f(x) = x^4 - 4x^3 \)? \( f'(x)=4x^3-12x^2=4x^2(x-3) \). Critical points: \( x=0 \) (double root), \( x=3 \). \( f''(x)=12x^2-24x=12x(x-2) \). At \( x=0 \): \( f''(0)=0 \), check sign of \( f' \): \( f'(x)=4x^2(x-3) \). For \( x<0 \), \( f'<0 \); for \( 0<x<3 \), \( f'<0 \). So \( f' \) does not change sign at 0 → inflection point (since \( f'' \) changes sign? \( f''(x)=12x(x-2) \), at \( x=0 \), \( f'' \) changes from positive (for x<0) to negative (for 0<x<2) → yes, inflection point). At \( x=3 \): \( f''(3)=36>0 \) → local minimum. That gives inflection and min, not max.
Try \( f(x) = -x^4 + 4x^3 \). \( f'(x) = -4x^3+12x^2 = -4x^2(x-3) \). Critical points: 0, 3. \( f''(x) = -12x^2+24x = -12x(x-2) \). At \( x=0 \): \( f''(0)=0 \), \( f' \) sign: for x<0, \( f'>0 \); for 0<x<3, \( f'>0 \) → no sign change, \( f'' \) changes from negative to positive? For x<0, \( f''(x) = -12x(x-2) \), x negative, (x-2) negative → product positive? Wait: x<0, -12x >0, (x-2)<0 → f''<0. For 0<x<2, -12x<0, (x-2)<0 → f''>0. So f'' changes sign → inflection point at 0. At \( x=3 \): \( f''(3) = -12*3*1 = -36 <0 \) → local maximum. So we have inflection at 0 and local max at 3, no local min. Function: \( f(x) = -x^4 + 4x^3 \). Good.
A good answer provides such a function with correct derivative analysis. A poor answer gives a cubic or fails to verify sign changes.

## COMMON_MISCONCEPTION
**Misconception:** "Every point where \( f''(x)=0 \) is an inflection point."  
**Reality:** \( f''(x)=0 \) is only a *candidate*; the concavity must actually change sign. For \( f(x)=x^4 \), \( f''(0)=0 \) but \( f''(x)=12x^2 \ge 0 \) on both sides — no sign change, so \( x=0 \) is a local minimum, not an inflection point. Students often write "inflection point at x=0" after solving \( f''(x)=0 \) without testing sign change, losing marks in board exams and JEE. Similarly, they confuse critical points of \( f \) (from \( f' \)) with inflection points (from \( f'' \)).

## ON_FAILURE
If a student cannot distinguish critical points from inflection points or forgets to test sign change:
1. Revisit **c12_math_cbse_06_003** (First Derivative Test) and **c12_math_cbse_06_004** (Second Derivative Test) to reinforce classification of critical points.
2. Practice the **sign chart method** for \( f' \) and \( f'' \) on the same number line: draw a line, mark critical points (from \( f'=0 \) or non-diff), test intervals for \( f' \) sign (inc/dec), then mark \( f''=0 \) points, test intervals for \( f'' \) sign (concavity).
3. Do a targeted re-diagnostic: "Find inflection points of \( f(x)=x^4-4x^3 \) and explain why \( x=0 \) is an inflection point but \( x=2 \) is not." Check if they test sign change of \( f'' \).

## PREREQUISITE_NODE_IDS
c11_math_cbse_13_006, c11_math_cbse_13_007, c11_math_cbse_13_008, c11_math_cbse_13_009, c11_math_cbse_13_010, c12_math_cbse_06_002, c12_math_cbse_06_003, c12_math_cbse_06_005, c12_math_cbse_06_006

## PREREQUISITE_REASONS
c11_math_cbse_13_006: Provides the intuitive idea of derivatives as rate of change, essential for understanding \( f' \) and \( f'' \).
c11_math_cbse_13_007: Covers derivative of polynomial functions, the primary algebraic tool for finding critical points.
c11_math_cbse_13_008: First principle of derivatives, needed for functions where standard rules don't apply directly (e.g., \( |x| \)).
c11_math_cbse_13_009: Algebra of derivatives (sum, product, quotient rules) required to differentiate composite functions in this node.
c11_math_cbse_13_010: Derivatives of trigonometric functions, as critical points of trig functions appear in board/competitive exams.
c12_math_cbse_06_002: Increasing/decreasing functions and sign of \( f' \) — directly used in first derivative test for critical points.
c12_math_cbse_06_003: First derivative test for maxima/minima — the primary method to classify critical points when \( f''=0 \).
c12_math_cbse_06_005: Critical points (where f'(x) = 0 or undefined) correspond to horizontal/vertical tangents; inflection points relate to tangent crossing the curve.  
c12_math_cbse_06_006: Critical points and inflection points analysis uses local linear approximation to understand function behaviour near f'(x)=0.  

## FORWARD_NODE_IDS
c12_math_cbse_06_004, c12_math_cbse_06_007

## FORWARD_REASONS
This is the last node in Chapter 6; no subsequent sibling nodes depend on it directly. However, the concepts feed into curve sketching in higher mathematics and optimization in economics/physics (not in this chapter's node list).
c12_math_cbse_06_004: Critical points and inflection points — defines critical points precisely and introduces inflection points which arise when \( f''(c)=0 \) and sign of \( f'' \) changes.  
c12_math_cbse_06_007: c12_math_cbse_06_003 -> c12_math_cbse_06_007 -> c12_math_cbse_06_008  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_math_cbse_13_009
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: Derivatives as rate of change — used in physics (velocity, acceleration) where critical points correspond to maximum height or zero velocity.
c11_math_cbse_13_009: Algebra of derivatives — used in economics for marginal cost/revenue optimization where critical points give profit maxima.

## CHAIN_DESCRIPTION
c11_math_cbse_13_006 -> c12_math_cbse_06_008 -> N/A

## THIS_FORMULA
Critical point: \( f'(c) = 0 \) or \( f \) not differentiable at \( c \).  
Inflection point: \( f \) continuous at \( c \), \( f''(c) = 0 \) or \( f''(c) \) DNE, and \( f''(x) \) changes sign at \( c \).

## FORMULA_VARIABLES
\( f \): real-valued function of a real variable; \( c \): point in domain of \( f \); \( f' \): first derivative; \( f'' \): second derivative.

## FORMULA_UNITS
dimensionless (pure mathematical concepts; units depend on application context, e.g., metres, rupees)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_03_001 | Critical points of position function give maximum height in projectile motion (velocity = 0); inflection points correspond to change in acceleration sign.
 c12_eco_cbse_02_004 | Marginal cost/revenue functions: critical points where marginal = 0 give profit maxima/minima; inflection points indicate diminishing returns onset.
## PREREQ_CONCEPT
Ability to compute first and second derivatives of algebraic, trigonometric, exponential, and logarithmic functions, and to solve equations \( f'(x)=0 \) and \( f''(x)=0 \).

## PREREQ_BEFORE
Student must be fluent in differentiation rules (product, quotient, chain) and solving polynomial/trigonometric equations. They must also understand the geometric meaning of \( f' \) (slope) and \( f'' \) (concavity).

## PREREQ_STUCK
If stuck, review derivative rules from **c11_math_cbse_13_009** and the first/second derivative tests from **c12_math_cbse_06_003** and **c12_math_cbse_06_004**.

## WORKED_EXAMPLE_1
PROBLEM: A rectangular sheet of tin 45 cm by 24 cm is to be made into an open-top box by cutting equal squares from each corner and folding up the flaps. Find the side length of the square to be cut off so that the volume of the box is maximum. (This is NCERT Example 36, but we rework with full steps.)

STEPS:
- Step 1: Let \( x \) cm be the side of the square cut from each corner. After cutting and folding, the box dimensions are: length \( = 45 - 2x \), breadth \( = 24 - 2x \), height \( = x \). All must be positive → \( 0 < x < 12 \).
- Step 2: Volume \( V(x) = x(45 - 2x)(24 - 2x) = x(1080 - 90x - 48x + 4x^2) = 4x^3 - 138x^2 + 1080x \).
- Step 3: Find critical points: \( V'(x) = 12x^2 - 276x + 1080 = 12(x^2 - 23x + 90) = 12(x - 5)(x - 18) \). Set \( V'(x) = 0 \) → \( x = 5 \) or \( x = 18 \). But \( x = 18 \) is outside domain (0,12), so only critical point in domain is \( x = 5 \).
- Step 4: Use second derivative test: \( V''(x) = 24x - 276 \). At \( x = 5 \), \( V''(5) = 120 - 276 = -156 < 0 \) → local maximum.
- Step 5: Check endpoints (though volume → 0 as \( x \to 0^+ \) or \( x \to 12^- \), so local max is absolute max). Maximum volume at \( x = 5 \) cm.

REASONING: We model the real-world problem as a cubic volume function. Critical points come from \( V'(x)=0 \). Domain restrictions eliminate extraneous roots. Second derivative confirms maximum. Endpoints give zero volume, so interior critical point gives absolute maximum.

ANSWER: Side of square to be cut off = 5 cm. Maximum volume = \( V(5) = 5 \times 35 \times 14 = 2450 \) cm³.

## WORKED_EXAMPLE_2
PROBLEM: Find the intervals of concavity and inflection points of \( f(x) = \sin x + \cos x \) on \( [0, 2\pi] \).

STEPS:
- Step 1: Compute derivatives: \( f'(x) = \cos x - \sin x \), \( f''(x) = -\sin x - \cos x = -(\sin x + \cos x) \).
- Step 2: Find where \( f''(x) = 0 \): \( \sin x + \cos x = 0 \) → \( \tan x = -1 \). On \( [0, 2\pi] \), solutions: \( x = \frac{3\pi}{4}, \frac{7\pi}{4} \).
- Step 3: Test sign of \( f'' \) in intervals: \( (0, \frac{3\pi}{4}) \), \( (\frac{3\pi}{4}, \frac{7\pi}{4}) \), \( (\frac{7\pi}{4}, 2\pi) \).
  - For \( x = \frac{\pi}{2} \in (0, \frac{3\pi}{4}) \): \( f''(\frac{\pi}{2}) = -(1 + 0) = -1 < 0 \) → concave down.
  - For \( x = \pi \in (\frac{3\pi}{4}, \frac{7\pi}{4}) \): \( f''(\pi) = -(0 - 1) = 1 > 0 \) → concave up.
  - For \( x = \frac{15\pi}{8} \in (\frac{7\pi}{4}, 2\pi) \): \( \sin \approx -0.38, \cos \approx 0.92 \), sum >0 → \( f'' < 0 \) → concave down.
- Step 4: Since \( f'' \) changes sign at both \( \frac{3\pi}{4} \) and \( \frac{7\pi}{4} \), these are inflection points.
- Step 5: Find coordinates: \( f(\frac{3\pi}{4}) = \frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2} = 0 \); \( f(\frac{7\pi}{4}) = -\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2} = 0 \).

REASONING: Inflection points require sign change of \( f'' \), not just \( f''=0 \). We test intervals between zeros of \( f'' \). The function is continuous everywhere, so no issues with non-differentiability.

ANSWER: Concave down on \( (0, \frac{3\pi}{4}) \) and \( (\frac{7\pi}{4}, 2\pi) \); concave up on \( (\frac{3\pi}{4}, \frac{7\pi}{4}) \). Inflection points at \( (\frac{3\pi}{4}, 0) \) and \( (\frac{7\pi}{4}, 0) \).

## WORKED_EXAMPLE_3
PROBLEM: A manufacturer can sell \( x \) items at a price of \( \text{₹}(5 - \frac{x}{100}) \) each. The cost price of \( x \) items is \( \text{₹}(\frac{x}{5} + 500) \). Find the number of items he should sell to earn maximum profit. Also find the maximum profit. (Adapted from NCERT Example 37.)

STEPS:
- Step 1: Selling price for \( x \) items: \( S(x) = x(5 - \frac{x}{100}) = 5x - \frac{x^2}{100} \).
- Step 2: Cost price: \( C(x) = \frac{x}{5} + 500 \).
- Step 3: Profit function: \( P(x) = S(x) - C(x) = 5x - \frac{x^2}{100} - \frac{x}{5} - 500 = \frac{24x}{5} - \frac{x^2}{100} - 500 \).
- Step 4: Find critical point: \( P'(x) = \frac{24}{5} - \frac{2x}{100} = \frac{24}{5} - \frac{x}{50} \). Set \( P'(x) = 0 \) → \( \frac{x}{50} = \frac{24}{5} \) → \( x = 240 \).
- Step 5: Second derivative: \( P''(x) = -\frac{1}{50} < 0 \) for all \( x \). So \( x = 240 \) gives local maximum. Since \( P(x) \) is a downward parabola, this is absolute maximum.
- Step 6: Maximum profit: \( P(240) = \frac{24}{5}(240) - \frac{240^2}{100} - 500 = 1152 - 576 - 500 = 76 \).

REASONING: Profit = Revenue - Cost. Critical point from \( P'(x)=0 \). Second derivative is constant negative → concave down everywhere → unique maximum. Domain: \( x \ge 0 \) and price positive → \( 5 - x/100 > 0 \) → \( x < 500 \). \( x=240 \) is in domain.

ANSWER: Sell 240 items. Maximum profit = ₹76.

## COMPETENCY_QUESTION_1
QUESTION: The function \( f(x) = x^3 - 3ax^2 + 3a^2x - a^3 \) has a critical point at \( x = a \). For what values of \( a \) is this critical point a point of inflection? Justify using both first and second derivative tests.

COMPETENCY: Analyzing the effect of a parameter on the nature of critical points; connecting algebraic structure to calculus classification.

STEPS:
- Step 1: Compute \( f'(x) = 3x^2 - 6ax + 3a^2 = 3(x - a)^2 \). Critical point at \( x = a \) (since \( f'(a)=0 \)).
- Step 2: Compute \( f''(x) = 6x - 6a = 6(x - a) \). At \( x = a \), \( f''(a) = 0 \). Second derivative test fails.
- Step 3: Apply first derivative test: \( f'(x) = 3(x-a)^2 \ge 0 \) for all \( x \), with \( f'(x) > 0 \) for \( x \ne a \). So \( f' \) does not change sign at \( x=a \) (positive on both sides).
- Step 4: Therefore, \( x=a \) is neither a local max nor min — it is an inflection point **for all real values of \( a \)**.
- Step 5: Verify concavity change: \( f''(x) = 6(x-a) \) changes sign from negative to positive at \( x=a \) → inflection point confirmed.

ANSWER: For all \( a \in \mathbb{R} \), the critical point \( x=a \) is a point of inflection. The function is \( f(x) = (x-a)^3 \), a cubic with horizontal inflection point at \( x=a \).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A particle moves along a straight line with position \( s(t) = t^4 - 8t^3 + 18t^2 - 10 \) (in metres) at time \( t \) seconds (\( t \ge 0 \)). 
(a) Find all times when the particle is at rest.
(b) Determine the intervals where the particle is speeding up and slowing down.
(c) Find the inflection points of the velocity function and interpret them physically.

COMPETENCY: Multi-concept application: critical points of position (velocity=0), critical points of velocity (acceleration=0), inflection points of velocity (jerk=0), and physical interpretation.

STEPS:
- Step 1: Velocity \( v(t) = s'(t) = 4t^3 - 24t^2 + 36t = 4t(t^2 - 6t + 9) = 4t(t-3)^2 \). Particle at rest when \( v(t)=0 \) → \( t=0 \) and \( t=3 \) seconds.
- Step 2: Acceleration \( a(t) = v'(t) = 12t^2 - 48t + 36 = 12(t^2 - 4t + 3) = 12(t-1)(t-3) \).
- Step 3: Speeding up when \( v \) and \( a \) have same sign; slowing down when opposite signs.
  Make sign chart for \( v(t) \) and \( a(t) \) on \( t \ge 0 \):
  - \( v(t) \): zero at 0, 3. \( v(t) \ge 0 \) for all \( t \ge 0 \) (since \( 4t \ge 0 \) and \( (t-3)^2 \ge 0 \)).
  - \( a(t) \): zeros at 1, 3. Sign: \( (0,1): a>0 \); \( (1,3): a<0 \); \( (3,\infty): a>0 \).
  - \( t \in (0,1) \): \( v>0, a>0 \) → speeding up.
  - \( t \in (1,3) \): \( v>0, a<0 \) → slowing down.
  - \( t \in (3,\infty) \): \( v>0, a>0 \) → speeding up.
  - At \( t=0 \): \( v=0, a>0 \) → starts from rest, speeding up.
  - At \( t=3 \): \( v=0, a=0 \) → momentarily at rest, need higher derivatives.
- Step 4: Inflection points of velocity: where \( a'(t) = v''(t) = 0 \) and changes sign. \( v''(t) = 24t - 48 = 24(t-2) \). Zero at \( t=2 \). Sign change: \( v''<0 \) for \( t<2 \), \( v''>0 \) for \( t>2 \) → inflection point of velocity at \( t=2 \).
- Step 5: Physical interpretation: At \( t=2 \) s, the acceleration is minimum (most negative) and changes from decreasing to increasing. The jerk (rate of change of acceleration) changes sign. The particle is slowing down at the maximum rate just before \( t=2 \), then slowing down less rapidly after.

ANSWER: (a) \( t=0, 3 \) s. (b) Speeding up: \( (0,1) \cup (3,\infty) \); slowing down: \( (1,3) \). (c) Inflection point of velocity at \( t=2 \) s; acceleration is minimum there, jerk changes sign.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are designing a roller coaster track — you need to know where the track reaches a peak (local maximum), a valley (local minimum), and where it changes from curving upward to curving downward (______ point).

## DIAGNOSTIC_ANSWER_7
inflection

The inflection point is the third landmark: neither peak nor valley, but the exact spot where the track's curl swaps direction. **A wrong answer (an asymptote) reveals the student has imported a stranger into the walkthrough's trio of landmarks.**

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can identify all critical points of a given function (including points of non-differentiability), classify them as local maxima, local minima, or inflection points using first and second derivative tests, and determine intervals of concavity.
