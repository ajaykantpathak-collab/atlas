## ELI5
A tin sheet loses four corner squares and folds into a tray: the volume depends on the corner size, and the maker wants the deepest tray. Critical points come from setting the volume's derivative to zero; the Second Derivative Test then plays judge with a single number - second derivative negative means a hilltop (maximum), positive a valley floor (minimum), zero means the judge abstains and the sign chart must decide.

## DEFINITION
The Second Derivative Test states that for a function \( f \) twice differentiable at a critical point \( c \) (where \( f'(c) = 0 \)): if \( f''(c) < 0 \), then \( f \) has a local maximum at \( c \); if \( f''(c) > 0 \), then \( f \) has a local minimum at \( c \); if \( f''(c) = 0 \), the test is inconclusive and one must revert to the First Derivative Test or higher-order derivative analysis.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly compute the second derivative, evaluate it at critical points obtained from \( f'(x)=0 \), and classify each critical point as a local maximum, local minimum, or identify when the test fails. They can also seamlessly switch to the First Derivative Test when \( f''(c)=0 \) and justify the conclusion with a sign chart.

## SCOPE_BOUNDARY
This node covers the Second Derivative Test for local extrema of twice-differentiable functions on open intervals, including the failure case \( f''(c)=0 \) and the fallback to the First Derivative Test. It does NOT cover absolute (global) extrema on closed intervals (handled in the same chapter but separate working rule), nor does it cover functions that are not twice differentiable at the critical point (e.g., \( f(x)=|x| \) at \( x=0 \)), which require the First Derivative Test directly.

## WALKTHROUGH
Imagine you are designing a rectangular box from a square 18 cm × 18 cm tin sheet by cutting equal squares from each corner and folding up the sides. You want to maximise the volume. You already know from the First Derivative Test how to find critical points by setting \( V'(x)=0 \), but checking sign changes of \( V'(x) \) around each root can be tedious with cubic derivatives. The Second Derivative Test gives a shortcut: compute \( V''(x) \) once, plug in the critical points, and the sign tells you max/min instantly. Start by writing the volume function \( V(x)=x(18-2x)^2 \), find \( V'(x) \), solve \( V'(x)=0 \) for critical points, then compute \( V''(x) \) and evaluate. The key insight: a negative second derivative means the graph is concave down (a hill → maximum), positive means concave up (a valley → minimum).

Takeaway first: the test trades the sign chart for one evaluation - differentiate twice, substitute the candidate, read the sign - with zero as the sanctioned escape back to the first derivative. Exam moves: computation questions finding candidates and second derivatives, classification questions by sign, and fallback questions handling the inconclusive case. Method: rerun the tray - volume function, first derivative zeroed, second derivative evaluated at each root, verdicts read as hill or valley. Check yourself: the test needs f-prime of c to be zero first; running it on non-critical points is judging suspects never arrested. Drill: classify the critical points of one cubic by the second derivative and confirm one verdict by a sign chart.

## DIAGNOSTIC_QUESTION_1
State the three conditions of the Second Derivative Test for a critical point \( c \) where \( f'(c)=0 \).

## DIAGNOSTIC_ANSWER_1
Correct answer: (i) If \( f''(c) < 0 \), \( f \) has a local maximum at \( c \). (ii) If \( f''(c) > 0 \), \( f \) has a local minimum at \( c \). (iii) If \( f''(c) = 0 \), the test fails; use the First Derivative Test. A wrong answer (e.g., swapping the inequality signs) reveals the student has memorised the test backwards — they confuse concave down (maximum) with concave up (minimum). This is the single most common sign error in board exams.

## DIAGNOSTIC_QUESTION_2
Explain why the Second Derivative Test fails for \( f(x)=x^4 \) at \( x=0 \), and determine the nature of the critical point using the First Derivative Test.

## DIAGNOSTIC_ANSWER_2
Correct answer: \( f'(x)=4x^3 \), so \( f'(0)=0 \). \( f''(x)=12x^2 \), so \( f''(0)=0 \) → test fails. For \( x<0 \), \( f'(x)<0 \) (decreasing); for \( x>0 \), \( f'(x)>0 \) (increasing). Sign changes from negative to positive → local minimum at \( x=0 \). A wrong answer that stops at "test fails" without applying the First Derivative Test shows the student treats the failure as a dead end rather than a signal to switch methods — a habit that costs marks in multi-step JEE problems.

## DIAGNOSTIC_QUESTION_3
Find the local maxima and minima of \( f(x)=2x^3-9x^2+12x+1 \) using the Second Derivative Test. Show all steps.

## DIAGNOSTIC_ANSWER_3
Correct answer:
\( f'(x)=6x^2-18x+12=6(x-1)(x-2) \). Critical points: \( x=1, 2 \).
\( f''(x)=12x-18 \).
\( f''(1)=12-18=-6 < 0 \) → local maximum at \( x=1 \), value \( f(1)=6 \).
\( f''(2)=24-18=6 > 0 \) → local minimum at \( x=2 \), value \( f(2)=5 \).
A wrong answer where the student writes \( f''(1)=6 \) (forgetting the minus sign) or mis-evaluates \( f(1) \) as 5 reveals algebraic carelessness in substituting into the second derivative or the original function — a frequent source of 1-mark errors in board papers.

## DIAGNOSTIC_QUESTION_4
Compare the First and Second Derivative Tests for the function \( f(x)=x^3-3x+3 \). Which test is more efficient and why?

## DIAGNOSTIC_ANSWER_4
Correct answer: Both work. First Derivative Test requires checking sign of \( f'(x)=3(x-1)(x+1) \) on intervals \( (-\infty,-1), (-1,1), (1,\infty) \) — three test points. Second Derivative Test: \( f''(x)=6x \), evaluate at \( x=-1 \) (negative → max) and \( x=1 \) (positive → min) — only two evaluations. Second Derivative Test is more efficient here because \( f''(x) \) is simpler than sign analysis of \( f'(x) \). A student who claims First Derivative Test is always better fails to recognise that efficiency depends on algebraic complexity — a key judgment skill for competitive exams where time matters.

## DIAGNOSTIC_QUESTION_5
A student solves \( f(x)=x^3-6x^2+9x+15 \) and writes: "\( f'(x)=3x^2-12x+9=3(x-1)(x-3) \), critical points \( x=1,3 \). \( f''(x)=6x-12 \). \( f''(1)=-6<0 \) → max at \( x=1 \). \( f''(3)=6>0 \) → min at \( x=3 \)." Is the solution fully correct? If not, identify the error.

## DIAGNOSTIC_ANSWER_5
The solution is correct in classification but incomplete: the student did not state the local maximum and minimum *values* \( f(1) \) and \( f(3) \). Board marking scheme requires the values (or at least the points with coordinates). A student who stops at "max at x=1" loses 1 mark per extremum. This tests whether the student understands that "local maximum" means the *value* \( f(c) \), not just the x-coordinate.

## DIAGNOSTIC_QUESTION_6
Construct a cubic polynomial \( f(x) \) that has a critical point at \( x=2 \) where the Second Derivative Test fails, but the First Derivative Test shows a local minimum. Write the polynomial and verify both tests.

## DIAGNOSTIC_ANSWER_6
Example: \( f(x)=(x-2)^4 \) or \( f(x)=x^4-8x^3+24x^2-32x+16 \). Check: \( f'(x)=4(x-2)^3 \), \( f'(2)=0 \). \( f''(x)=12(x-2)^2 \), \( f''(2)=0 \) → test fails. For \( x<2 \), \( f'(x)<0 \); for \( x>2 \), \( f'(x)>0 \) → sign change negative to positive → local minimum at \( x=2 \). A poor answer would give a cubic (degree 3) — but a cubic's second derivative is linear, so \( f''(c)=0 \) implies inflection, not min/max. This reveals the student doesn't connect polynomial degree to the order of the first non-zero derivative.

## COMMON_MISCONCEPTION
Students often believe the Second Derivative Test *always* works and forget to check the failure condition \( f''(c)=0 \). In exams, they write "\( f''(c)=0 \) so no extremum" — which is wrong; \( f(x)=x^4 \) at \( x=0 \) has \( f''(0)=0 \) but a clear minimum. Another error: they apply the test at points where \( f'(c) \neq 0 \) (e.g., endpoints or non-differentiable points) because they confuse "critical point" with "any point of interest". The exact wrong step: computing \( f''(c) \) without verifying \( f'(c)=0 \) first.

## ON_FAILURE
If a student makes the above errors, immediately have them:
1. Revisit the definition of a critical point (c12_math_cbse_06_008) — emphasise \( f'(c)=0 \) OR \( f \) not differentiable.
2. Do a focused drill: given 5 functions, identify critical points, then for each, state whether Second Derivative Test applies. Include \( f(x)=|x| \), \( f(x)=x^4 \), \( f(x)=x^3 \), \( f(x)=\sin x \), \( f(x)=e^x \).
3. For each case where test fails, explicitly perform First Derivative Test sign chart.
4. Re-attempt Diagnostic Questions 2 and 6. Mastery is shown when they automatically say "test fails, switch to first derivative test" without prompting.

## PREREQUISITE_NODE_IDS
c12_math_cbse_06_003, c12_math_cbse_06_002, c11_math_cbse_13_007, c11_math_cbse_13_009, c12_math_cbse_06_008
## PREREQUISITE_REASONS
c12_math_cbse_06_003: First Derivative Test is the fallback when Second Derivative Test fails; students must know how to do sign analysis of \( f'(x) \).
c12_math_cbse_06_002: Increasing/decreasing intervals and sign of \( f'(x) \) are the foundation of both derivative tests.
c11_math_cbse_13_007: Derivative of polynomial functions — needed to compute \( f'(x) \) and \( f''(x) \) fluently.
c11_math_cbse_13_009: Algebra of derivatives (sum, product rules) — required for differentiating polynomials, trigonometric, exponential functions in this chapter.
c12_math_cbse_06_008: Critical points and inflection points — defines critical points precisely and introduces inflection points which arise when \( f''(c)=0 \) and sign of \( f'' \) changes.

## FORWARD_NODE_IDS
c12_math_cbse_06_007
## FORWARD_REASONS
c12_math_cbse_06_007: Word problems on maxima/minima applications directly use the Second Derivative Test to classify critical points in optimisation (boxes, cylinders, profit, etc.).
## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_007, c11_math_cbse_13_010
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_007: Derivative of polynomial functions — the computational engine for finding \( f'(x) \) and \( f''(x) \) in physics optimisation (e.g., maximising range of projectile, minimising potential energy).
c11_math_cbse_13_010: Derivatives of trigonometric functions — needed for optimisation problems involving angles (e.g., maxima/minima of \( \sin x + \cos x \) in wave interference or AC circuit analysis).

## CHAIN_DESCRIPTION
c11_math_cbse_13_007 -> c12_math_cbse_06_003 -> c12_math_cbse_06_004 -> c12_math_cbse_06_007

## THIS_FORMULA
Second Derivative Test: Let \( f \) be twice differentiable at \( c \) with \( f'(c)=0 \). Then:
- If \( f''(c) < 0 \), \( f \) has a local maximum at \( c \), value \( f(c) \).
- If \( f''(c) > 0 \), \( f \) has a local minimum at \( c \), value \( f(c) \).
- If \( f''(c) = 0 \), test fails; use First Derivative Test.

## FORMULA_VARIABLES
\( f \) = function, \( c \) = critical point in domain of \( f \), \( f'(c) \) = first derivative at \( c \), \( f''(c) \) = second derivative at \( c \)

## FORMULA_UNITS
dimensionless (pure mathematical test; units depend on the applied problem context)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_007 | Polynomial derivatives are used in physics to find maximum height of a projectile (quadratic) or maximum range (trigonometric) by setting velocity derivative to zero and checking concavity.
c11_math_cbse_13_010 | Trigonometric derivatives enable optimisation of functions like \( \sin x + \cos x \) which appear in AC circuit power maximisation and wave superposition problems in Class 12 Physics.
## PREREQ_CONCEPT
Fluent computation of first and second derivatives of algebraic, trigonometric, and exponential functions, and the ability to solve \( f'(x)=0 \) for critical points.

## PREREQ_BEFORE
The student must be able to differentiate any function from the Class 12 syllabus (polynomials, trigonometric, inverse trigonometric, exponential, logarithmic) and solve the resulting equation \( f'(x)=0 \) accurately.

## PREREQ_STUCK
If stuck on differentiation or solving \( f'(x)=0 \), revisit c11_math_cbse_13_007 (polynomial derivatives), c11_math_cbse_13_010 (trigonometric derivatives), and c12_math_cbse_06_003 (critical points and first derivative test).

## WORKED_EXAMPLE_1
PROBLEM: A manufacturer can sell \( x \) items at a price of \( \left(5 - \frac{x}{100}\right) \) rupees each. The cost price of \( x \) items is \( \left(\frac{x}{5} + 500\right) \) rupees. Find the number of items he should sell to earn maximum profit. (NCERT Example 37 adapted)

STEPS:
- Step 1: Write the selling price function \( S(x) = x \left(5 - \frac{x}{100}\right) = 5x - \frac{x^2}{100} \). Write the cost function \( C(x) = \frac{x}{5} + 500 \).
- Step 2: Profit \( P(x) = S(x) - C(x) = 5x - \frac{x^2}{100} - \frac{x}{5} - 500 = \frac{24x}{5} - \frac{x^2}{100} - 500 \).
- Step 3: Find critical point: \( P'(x) = \frac{24}{5} - \frac{2x}{100} = \frac{24}{5} - \frac{x}{50} \). Set \( P'(x)=0 \) → \( \frac{x}{50} = \frac{24}{5} \) → \( x = 240 \).
- Step 4: Second derivative: \( P''(x) = -\frac{1}{50} \). Since \( P''(x) \) is constant negative, \( P''(240) = -\frac{1}{50} < 0 \).
- Step 5: By Second Derivative Test, \( x=240 \) gives a local maximum. Since it's the only critical point and \( P(x) \) is a downward parabola, it's the global maximum. Maximum profit = \( P(240) = \frac{24}{5}(240) - \frac{240^2}{100} - 500 = 1152 - 576 - 500 = 76 \) rupees.

REASONING: The profit function is a concave down quadratic (negative leading coefficient), so the single critical point is the global maximum. The Second Derivative Test confirms concavity instantly without needing interval testing. This is a standard board exam optimisation problem where the test is more efficient than the First Derivative Test.

ANSWER: The manufacturer should sell 240 items to earn a maximum profit of ₹76.

## WORKED_EXAMPLE_2
PROBLEM: Find the local maxima and minima of \( f(x) = \sin x + \cos x \) on \( (0, 2\pi) \). (NCERT Example 13 adapted)

STEPS:
- Step 1: Compute first derivative: \( f'(x) = \cos x - \sin x \).
- Step 2: Set \( f'(x)=0 \) → \( \cos x = \sin x \) → \( \tan x = 1 \). In \( (0, 2\pi) \), solutions: \( x = \frac{\pi}{4}, \frac{5\pi}{4} \).
- Step 3: Compute second derivative: \( f''(x) = -\sin x - \cos x = -(\sin x + \cos x) \).
- Step 4: Evaluate \( f'' \) at critical points:
  \( f''\left(\frac{\pi}{4}\right) = -\left(\frac{1}{\sqrt{2}} + \frac{1}{\sqrt{2}}\right) = -\sqrt{2} < 0 \) → local maximum at \( x=\frac{\pi}{4} \).
  \( f''\left(\frac{5\pi}{4}\right) = -\left(-\frac{1}{\sqrt{2}} - \frac{1}{\sqrt{2}}\right) = \sqrt{2} > 0 \) → local minimum at \( x=\frac{5\pi}{4} \).
- Step 5: Find the extreme values:
  \( f\left(\frac{\pi}{4}\right) = \frac{1}{\sqrt{2}} + \frac{1}{\sqrt{2}} = \sqrt{2} \) (local maximum value).
  \( f\left(\frac{5\pi}{4}\right) = -\frac{1}{\sqrt{2}} - \frac{1}{\sqrt{2}} = -\sqrt{2} \) (local minimum value).

REASONING: The Second Derivative Test is particularly efficient here because \( f''(x) = -f(x) \), so evaluating \( f'' \) at critical points directly gives the negative of the function value. The sign of \( f'' \) immediately classifies the points. This avoids the more cumbersome sign analysis of \( f'(x) = \cos x - \sin x \) on three intervals.

ANSWER: Local maximum at \( x=\frac{\pi}{4} \) with value \( \sqrt{2} \); local minimum at \( x=\frac{5\pi}{4} \) with value \( -\sqrt{2} \).

## WORKED_EXAMPLE_3
PROBLEM: An open-topped box is made by cutting squares of side \( x \) cm from each corner of a 3 m × 8 m rectangular aluminium sheet and folding up the sides. Find the volume of the largest such box. (NCERT Example 36 adapted)

STEPS:
- Step 1: Convert metres to cm for consistency: 3 m = 300 cm, 8 m = 800 cm. (Or keep metres and get volume in m³. We'll use metres.)
  Dimensions after cutting: length = \( 8 - 2x \), breadth = \( 3 - 2x \), height = \( x \). All in metres.
- Step 2: Volume \( V(x) = x(8-2x)(3-2x) = x(24 - 16x - 6x + 4x^2) = 4x^3 - 22x^2 + 24x \).
  Domain: \( 0 < x < 1.5 \) (since breadth \( 3-2x > 0 \)).
- Step 3: First derivative: \( V'(x) = 12x^2 - 44x + 24 = 4(3x^2 - 11x + 6) = 4(3x-2)(x-3) \).
  Critical points: \( x = \frac{2}{3} \), \( x = 3 \). \( x=3 \) is outside domain (breadth negative). Only \( x = \frac{2}{3} \) m.
- Step 4: Second derivative: \( V''(x) = 24x - 44 \).
  Evaluate at \( x = \frac{2}{3} \): \( V''\left(\frac{2}{3}\right) = 24\left(\frac{2}{3}\right) - 44 = 16 - 44 = -28 < 0 \).
- Step 5: By Second Derivative Test, \( x = \frac{2}{3} \) gives a local maximum. Since it's the only critical point in the open interval and \( V(x) \to 0 \) at endpoints \( x\to0^+ \) and \( x\to1.5^- \), it's the absolute maximum.
- Step 6: Maximum volume: \( V\left(\frac{2}{3}\right) = \frac{2}{3} \left(8 - \frac{4}{3}\right) \left(3 - \frac{4}{3}\right) = \frac{2}{3} \times \frac{20}{3} \times \frac{5}{3} = \frac{200}{27} \) m³.

REASONING: This problem combines domain restrictions (physical constraints), polynomial differentiation, and the Second Derivative Test. The critical point \( x=3 \) is correctly discarded by domain analysis — a step students often skip. The test confirms maximum without checking endpoints, but we verify endpoints to ensure absolute maximum.

ANSWER: The largest volume is \( \frac{200}{27} \) m³ (≈ 7.41 m³) when squares of side \( \frac{2}{3} \) m (≈ 66.7 cm) are cut.

## COMPETENCY_QUESTION_1
QUESTION: A student claims: "For any function \( f \), if \( f'(c)=0 \) and \( f''(c)=0 \), then \( x=c \) is a point of inflection." Is this statement true or false? Justify your answer with a counterexample if false, or a proof if true.

COMPETENCY: Error identification and correction; logical reasoning about calculus concepts.

STEPS:
- Step 1: Understand the claim — it equates \( f''(c)=0 \) with inflection point.
- Step 2: Recall definition: inflection point requires change in concavity (sign change of \( f'' \)), not just \( f''(c)=0 \).
- Step 3: Find a counterexample where \( f'(c)=0 \), \( f''(c)=0 \), but no inflection (e.g., \( f(x)=x^4 \) at \( x=0 \)).
- Step 4: Verify: \( f'(x)=4x^3 \), \( f'(0)=0 \); \( f''(x)=12x^2 \), \( f''(0)=0 \); but \( f''(x) \ge 0 \) for all \( x \), no sign change → not inflection, it's a minimum.
- Step 5: Conclude the statement is false.

ANSWER: False. Counterexample: \( f(x)=x^4 \) at \( x=0 \). Here \( f'(0)=0 \), \( f''(0)=0 \), but \( f''(x)=12x^2 \ge 0 \) for all \( x \), so concavity does not change — it's a local minimum, not an inflection point. The condition \( f''(c)=0 \) is necessary but not sufficient for inflection; sign change of \( f'' \) is required.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A rectangular sheet of tin 45 cm by 24 cm is made into an open box by cutting squares of side \( x \) cm from each corner. The volume is \( V(x) = x(45-2x)(24-2x) \). 
(a) Find the critical points of \( V(x) \) in the feasible domain.
(b) Use the Second Derivative Test to classify them.
(c) The test fails for one critical point — which one, and why? What does the First Derivative Test reveal?
(d) Hence find the side of the square to be cut for maximum volume.

COMPETENCY: Translating real-world situations to mathematical expressions; comparing and justifying methods; multi-step calculation with domain constraints.

STEPS:
- Step 1: Expand \( V(x) = 4x^3 - 138x^2 + 1080x \). Domain: \( 0 < x < 12 \) (since \( 24-2x > 0 \)).
- Step 2: \( V'(x) = 12x^2 - 276x + 1080 = 12(x^2 - 23x + 90) = 12(x-5)(x-18) \). Critical points: \( x=5 \), \( x=18 \). \( x=18 \) outside domain → only \( x=5 \) is feasible.
- Step 3: \( V''(x) = 24x - 276 \). \( V''(5) = 120 - 276 = -156 < 0 \) → local maximum at \( x=5 \).
- Step 4: The test does NOT fail for \( x=5 \). (The question tricks you: it says "the test fails for one critical point" — but the other critical point \( x=18 \) is outside domain, so we don't apply the test there. If we mistakenly applied it: \( V''(18) = 432-276=156>0 \) would indicate a minimum, but it's not in domain. The test doesn't fail at any feasible critical point.)
- Step 5: Maximum volume at \( x=5 \) cm. \( V(5) = 5 \times 35 \times 14 = 2450 \) cm³.

ANSWER: (a) Critical point in domain: \( x=5 \) cm. (b) \( V''(5) = -156 < 0 \) → local (and absolute) maximum. (c) The test does not fail for any feasible critical point; the other critical point \( x=18 \) is outside the physical domain. (d) Cut squares of side 5 cm for maximum volume 2450 cm³.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are designing a ______ box from a square 18 cm × 18 cm tin sheet by cutting equal squares from each corner and folding up the sides.

## DIAGNOSTIC_ANSWER_7
rectangular

Rectangular is the tray's plan: four corner squares cut, sides folded, volume a function of the cut's size. **A wrong answer (a cylindrical word) reveals the student has rolled the tin instead of folding it, changing every formula in the walkthrough.**
