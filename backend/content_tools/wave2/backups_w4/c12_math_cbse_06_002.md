## ELI5
A shopkeeper watches profit climb with each sale, then sag: the derivative is the wind-vane. Strictly increasing functions rise everywhere - derivative positive on the interval; strictly decreasing ones fall - derivative negative; derivative vanishing throughout means the function has flatlined. The recipe: differentiate, find critical points where the derivative zeroes, test the sign between them with sample points, and label each stretch rising or falling.

## DEFINITION
A function \( f \) is **strictly increasing** on an interval \( I \) if for any \( x_1, x_2 \in I \) with \( x_1 < x_2 \), we have \( f(x_1) < f(x_2) \); it is **strictly decreasing** if \( f(x_1) > f(x_2) \). The **First Derivative Test for Monotonicity** states: if \( f \) is continuous on \([a,b]\) and differentiable on \((a,b)\), then \( f'(x) > 0 \) on \((a,b) \implies f \) is strictly increasing on \([a,b]\); \( f'(x) < 0 \) on \((a,b) \implies f \) is strictly decreasing on \([a,b]\); \( f'(x) = 0 \) on \((a,b) \implies f \) is constant on \([a,b]\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute the derivative of a given function (polynomial, trigonometric, exponential, or rational), find its critical points, determine the sign of the derivative on each sub‑interval, and correctly state the intervals of strict increase and strict decrease. The student can also interpret the result in a real‑world context (e.g., profit rising/falling, temperature rising/falling).

## SCOPE_BOUNDARY
This node covers the definition of increasing/decreasing functions, the first derivative test for monotonicity, and finding intervals of increase/decrease for algebraic, trigonometric, exponential, and logarithmic functions as per NCERT §6.3. It does **not** cover maxima/minima (first/second derivative tests), absolute extrema, or word problems on optimization — those are in subsequent nodes (c12_math_cbse_06_003, 06_004, 06_007).

## WALKTHROUGH
Imagine a small business owner in Delhi tracking daily profit (in ₹) as the number of items sold increases. She notices profit rises up to a point, then starts falling. How can she find exactly **when** profit rises and **when** it falls using calculus? Start by writing the profit function \( P(x) \). The derivative \( P'(x) \) gives the rate of change of profit. If \( P'(x) > 0 \), profit is increasing; if \( P'(x) < 0 \), profit is decreasing. So the steps are: (1) differentiate the function, (2) solve \( f'(x) = 0 \) to get critical points, (3) use a sign chart (test points) to decide where \( f'(x) \) is positive or negative, (4) write the intervals of increase/decrease. The key insight: **the sign of the derivative tells you the direction of the function**.

Takeaway first: the derivative's sign is the function's direction - positive rising, negative falling, zero parked - and critical points are the fence posts between the stretches. Exam moves: computation questions differentiating and finding critical points, sign-chart questions testing intervals, conclusion questions stating intervals of strict increase and decrease, and interpretation questions in profit-or-temperature clothing. Method: rerun the profit curve - differentiate P, solve P-prime equals zero, then sample between the roots and read the sign. Check yourself: the sign chart's test points come from inside each interval, never from its endpoints - and the derivative's zeros themselves belong to neither rising nor falling label. Drill: find the increasing and decreasing intervals of one cubic and sketch its direction.

## DIAGNOSTIC_QUESTION_1
State the precise condition on the derivative \( f'(x) \) that guarantees a function \( f \) is strictly increasing on an interval \( I \).

## DIAGNOSTIC_ANSWER_1
**Correct answer:** \( f'(x) > 0 \) for all \( x \) in the interior of \( I \) (and \( f \) continuous on \( I \)).  
**What a wrong answer reveals:** If a student writes \( f'(x) \ge 0 \), they confuse “strictly increasing” with “non‑decreasing”. If they omit the continuity requirement, they miss a subtle but important hypothesis (e.g., \( f(x) = 1/x \) has \( f'(x) > 0 \) on \( (-\infty,0) \cup (0,\infty) \) but is not increasing across the whole real line because it’s not continuous at 0).

## DIAGNOSTIC_QUESTION_2
Explain why \( f'(x) > 0 \) on an interval implies the function is strictly increasing there. Use the Mean Value Theorem in your reasoning.

## DIAGNOSTIC_ANSWER_2
**Correct explanation:** Take any \( x_1 < x_2 \) in the interval. By the Mean Value Theorem, there exists \( c \in (x_1, x_2) \) such that \( f(x_2) - f(x_1) = f'(c)(x_2 - x_1) \). Since \( f'(c) > 0 \) and \( x_2 - x_1 > 0 \), the product is positive, so \( f(x_2) > f(x_1) \). Hence \( f \) is strictly increasing.  
**What a wrong answer reveals:** A student who only says “positive slope means going up” is relying on geometric intuition, not the rigorous link via MVT. If they cannot invoke MVT, they haven’t connected the derivative definition to the function’s global behaviour.

## DIAGNOSTIC_QUESTION_3
Find the intervals on which the function \( f(x) = 2x^3 - 9x^2 + 12x + 1 \) is strictly increasing and strictly decreasing.

## DIAGNOSTIC_ANSWER_3
**Working:**
1. \( f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x-1)(x-2) \).
2. Critical points: \( x = 1, 2 \).
3. Sign chart:
   - \( x < 1 \): test \( x=0 \) → \( f'(0) = 12 > 0 \) ⇒ increasing on \( (-\infty, 1) \).
   - \( 1 < x < 2 \): test \( x=1.5 \) → \( f'(1.5) = 6(0.5)(-0.5) = -1.5 < 0 \) ⇒ decreasing on \( (1, 2) \).
   - \( x > 2 \): test \( x=3 \) → \( f'(3) = 6(2)(1) = 12 > 0 \) ⇒ increasing on \( (2, \infty) \).
**Answer:** Strictly increasing on \( (-\infty, 1] \) and \( [2, \infty) \); strictly decreasing on \( [1, 2] \). (Endpoints included because \( f \) is continuous.)  
**What a wrong answer reveals:** Common errors: forgetting to factor fully, mis‑placing signs in the chart, or writing open intervals \( (1,2) \) instead of closed \( [1,2] \) when the function is continuous at the critical points.

## DIAGNOSTIC_QUESTION_4
Compare the monotonicity of \( g(x) = x^3 \) and \( h(x) = x^3 - 3x \) on \( \mathbb{R} \). Why does one have no intervals of decrease while the other does?

## DIAGNOSTIC_ANSWER_4
**Correct analysis:**  
\( g'(x) = 3x^2 \ge 0 \) for all \( x \), and \( g'(x) = 0 \) only at \( x=0 \) (isolated point). Since the derivative is non‑negative and zero only at a single point, \( g \) is strictly increasing on \( \mathbb{R} \).  
\( h'(x) = 3x^2 - 3 = 3(x-1)(x+1) \). This is negative on \( (-1, 1) \), so \( h \) decreases there.  
The difference: \( g' \) never changes sign (it touches zero but stays non‑negative), while \( h' \) changes sign from positive to negative to positive.  
**What a wrong answer reveals:** If a student claims \( g \) is not strictly increasing because \( g'(0)=0 \), they misunderstand that a derivative can be zero at isolated points without destroying strict monotonicity (the function still satisfies \( x_1 < x_2 \implies g(x_1) < g(x_2) \)).

## DIAGNOSTIC_QUESTION_5
A student solves \( f(x) = \sin x + \cos x \) on \( [0, 2\pi] \) and writes: “\( f'(x) = \cos x - \sin x \). Setting \( f'(x)=0 \) gives \( x = \pi/4, 5\pi/4 \). Since \( f'(0) = 1 > 0 \), \( f \) is increasing on \( [0, \pi/4) \) and decreasing on \( (\pi/4, 2\pi] \).” Identify the error and give the correct intervals.

## DIAGNOSTIC_ANSWER_5
**Error:** The student only tested one point (\( x=0 \)) and assumed the sign stays the same until the next critical point, but there are **two** critical points in \( [0, 2\pi] \). The sign of \( f' \) changes at each critical point.  
**Correct intervals:**  
- \( [0, \pi/4] \): \( f' > 0 \) (increasing)  
- \( [\pi/4, 5\pi/4] \): \( f' < 0 \) (decreasing)  
- \( [5\pi/4, 2\pi] \): \( f' > 0 \) (increasing)  
**What a wrong answer reveals:** The student treats critical points as mere boundaries without checking the sign in **every** sub‑interval. This is a classic “missing interval” mistake that costs marks in board exams.

## DIAGNOSTIC_QUESTION_6
Construct a function \( f(x) \) that is strictly increasing on \( (-\infty, 0) \) and strictly decreasing on \( (0, \infty) \), and has a maximum value of 5 at \( x=0 \). Write its derivative and verify the monotonicity.

## DIAGNOSTIC_ANSWER_6
**Example answer:** \( f(x) = -x^2 + 5 \).  
\( f'(x) = -2x \).  
- For \( x < 0 \), \( f'(x) = -2x > 0 \) ⇒ increasing.  
- For \( x > 0 \), \( f'(x) = -2x < 0 \) ⇒ decreasing.  
\( f(0)=5 \) is the maximum.  
**What a poor answer reveals:** If a student gives a piecewise function like \( f(x) = x \) for \( x<0 \) and \( f(x) = -x \) for \( x>0 \), it’s not differentiable at 0, so the derivative test doesn’t apply smoothly. A good answer uses a simple polynomial whose derivative changes sign exactly once.

## COMMON_MISCONCEPTION
**“If \( f'(x) \ge 0 \), the function is strictly increasing.”**  
Many students write \( f'(x) \ge 0 \) as the condition for *strict* increase. Counterexample: \( f(x) = x^3 \) has \( f'(0)=0 \) but is strictly increasing; however, \( f(x) = 3 \) (constant) has \( f'(x)=0 \) everywhere and is **not** strictly increasing. The correct statement: \( f'(x) > 0 \) on an interval (except possibly at isolated points) implies strictly increasing. Students also forget to **check continuity at endpoints** when writing closed intervals — e.g., writing \( (1,2) \) instead of \( [1,2] \) for a polynomial. Another frequent error: **not considering points where the derivative does not exist** (e.g., \( f(x) = |x| \) at \( x=0 \)) as critical points for monotonicity.

## ON_FAILURE
1. **Revisit derivative rules** (sum, product, quotient, chain) using c11_math_cbse_13_007, c11_math_cbse_13_009, c11_math_cbse_13_010.  
2. **Practice sign analysis** of quadratic/cubic polynomials: solve \( f'(x)=0 \), plot roots on a number line, test one point in each region. Use c11_math_cbse_06_003 (linear inequalities) and c11_math_cbse_06_008 (quadratic inequalities) for the algebraic skill.  
3. **Re‑read the Mean Value Theorem** (NCERT Class 12 Chapter 5) to understand *why* \( f'>0 \) forces \( f(x_2)>f(x_1) \).  
4. **Redo Diagnostic Questions 3 and 5** step‑by‑step, writing the sign chart explicitly. If errors persist, ask the teacher for a “sign‑chart template” worksheet.

## PREREQUISITE_NODE_IDS
c12_math_cbse_06_001, c11_math_cbse_13_006, c11_math_cbse_13_007, c11_math_cbse_13_008, c11_math_cbse_13_009, c11_math_cbse_13_010, c11_math_cbse_02_005, c11_math_cbse_06_003, c11_math_cbse_06_008
## PREREQUISITE_REASONS
c12_math_cbse_06_001: Introduces derivative as rate of change; monotonicity is the application of that concept.  
c11_math_cbse_13_006: Builds intuitive idea of derivative as slope/rate.  
c11_math_cbse_13_007: Provides derivative formulas for polynomials.  
c11_math_cbse_13_008: First‑principle foundation (not directly used but conceptual base).  
c11_math_cbse_13_009: Algebra of derivatives (sum, product, quotient) needed for differentiating complex functions.  
c11_math_cbse_13_010: Derivatives of trigonometric functions required for trigonometric monotonicity problems.  
c11_math_cbse_02_005: Function definition, domain, interval notation.  
c11_math_cbse_06_003: Solving linear inequalities for sign charts.  
c11_math_cbse_06_008: Solving quadratic inequalities for sign charts.

## FORWARD_NODE_IDS
c12_math_cbse_06_003, c12_math_cbse_06_004, c12_math_cbse_06_007, c12_math_cbse_06_008
## FORWARD_REASONS
c12_math_cbse_06_003: First derivative test for local maxima/minima directly uses the sign‑change of \( f' \) learned here.  
c12_math_cbse_06_004: Second derivative test also requires finding critical points via \( f'(x)=0 \).  
c12_math_cbse_06_007: Word problems on optimization need intervals of increase/decrease to set up the model.  
c12_math_cbse_06_008: Critical points and inflection points are identified using \( f' \) and \( f'' \) sign analysis.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_math_cbse_13_007
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: Derivative as rate of change is used in physics (velocity = derivative of displacement) and economics (marginal cost/revenue = derivative of cost/revenue). Monotonicity tells whether velocity is increasing or marginal cost is rising.  
c11_math_cbse_13_007: Polynomial derivatives model cost, revenue, profit functions in economics; finding where they increase/decrease informs production decisions.

## CHAIN_DESCRIPTION
c12_math_cbse_06_001 -> c12_math_cbse_06_002 -> c12_math_cbse_06_003

## THIS_FORMULA
If \( f \) is continuous on \([a,b]\) and differentiable on \((a,b)\), then:  
\( f'(x) > 0 \ \forall x \in (a,b) \implies f \) strictly increasing on \([a,b]\)  
\( f'(x) < 0 \ \forall x \in (a,b) \implies f \) strictly decreasing on \([a,b]\)  
\( f'(x) = 0 \ \forall x \in (a,b) \implies f \) constant on \([a,b]\)

## FORMULA_VARIABLES
\( f \): real‑valued function; \( x \): independent variable; \( a,b \): endpoints of interval; \( f'(x) \): first derivative of \( f \).

## FORMULA_UNITS
Dimensionless (depends on the units of \( f \) and \( x \); e.g., if \( f \) is profit in ₹ and \( x \) is items, \( f' \) is ₹/item).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_006 | Derivative as rate of change connects to physics (velocity, acceleration) and economics (marginal analysis).  
c11_math_cbse_13_007 | Polynomial derivatives used to analyze increasing/decreasing behavior of cost, revenue, profit functions in economics.
## PREREQ_CONCEPT
Derivative as instantaneous rate of change and ability to differentiate polynomial, trigonometric, exponential, and logarithmic functions.

## PREREQ_BEFORE
Student must be able to compute derivatives of standard functions and solve polynomial/rational inequalities to determine sign of the derivative on intervals.

## PREREQ_STUCK
If stuck, review derivative rules (product, quotient, chain) from c11_math_cbse_13_009 and inequality solving from c11_math_cbse_06_003 and c11_math_cbse_06_008.

## WORKED_EXAMPLE_1
PROBLEM: A company's profit (in ₹ lakhs) from producing \( x \) hundred units of a product is given by \( P(x) = 2x^3 - 9x^2 + 12x + 1 \). Find the production intervals (in hundreds of units) where profit is increasing and where it is decreasing.

STEPS:
- Step 1: Identify the function and its domain. \( P(x) = 2x^3 - 9x^2 + 12x + 1 \), \( x \ge 0 \) (production cannot be negative).
- Step 2: Compute the derivative. \( P'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x-1)(x-2) \).
- Step 3: Find critical points by solving \( P'(x) = 0 \). \( 6(x-1)(x-2) = 0 \implies x = 1, 2 \).
- Step 4: Make a sign chart for \( P'(x) \) on \( [0, \infty) \). Test points: \( x=0.5 \in (0,1) \Rightarrow P'(0.5) = 6(-0.5)(-1.5) = 4.5 > 0 \). \( x=1.5 \in (1,2) \Rightarrow P'(1.5) = 6(0.5)(-0.5) = -1.5 < 0 \). \( x=3 \in (2,\infty) \Rightarrow P'(3) = 6(2)(1) = 12 > 0 \).
- Step 5: Write intervals with correct brackets (function is continuous). Profit increases on \( [0, 1] \) and \( [2, \infty) \); profit decreases on \( [1, 2] \). In hundreds of units: profit rises for 0–100 units and above 200 units; falls between 100–200 units.

REASONING: The derivative \( P'(x) \) represents marginal profit. When marginal profit is positive, total profit rises; when negative, total profit falls. The critical points \( x=1,2 \) are where marginal profit changes sign, separating intervals of increase and decrease.

ANSWER: Increasing on \( [0, 1] \) and \( [2, \infty) \); decreasing on \( [1, 2] \). (Units: \( x \) in hundreds, so 0–100 and 200+ units for increase; 100–200 units for decrease.)

## WORKED_EXAMPLE_2
PROBLEM: The height (in metres) of a wave at time \( t \) seconds is modeled by \( h(t) = \sin t + \cos t \) for \( t \in [0, 2\pi] \). Determine when the wave height is rising and when it is falling.

STEPS:
- Step 1: Write the function and domain. \( h(t) = \sin t + \cos t \), \( t \in [0, 2\pi] \).
- Step 2: Differentiate. \( h'(t) = \cos t - \sin t \).
- Step 3: Solve \( h'(t) = 0 \). \( \cos t = \sin t \implies \tan t = 1 \). In \( [0, 2\pi] \), \( t = \pi/4, 5\pi/4 \).
- Step 4: Sign chart for \( h'(t) \). Test \( t=0 \): \( h'(0)=1>0 \). Test \( t=\pi \): \( h'(\pi) = -1 < 0 \). Test \( t=2\pi \): \( h'(2\pi)=1>0 \).
- Step 5: State intervals. Height increases on \( [0, \pi/4] \) and \( [5\pi/4, 2\pi] \); decreases on \( [\pi/4, 5\pi/4] \).

REASONING: The derivative \( h'(t) \) is the vertical velocity of the wave. Positive velocity means rising height; negative means falling. The critical points correspond to the wave's crests and troughs.

ANSWER: Rising on \( [0, \pi/4] \) and \( [5\pi/4, 2\pi] \); falling on \( [\pi/4, 5\pi/4] \).

## WORKED_EXAMPLE_3
PROBLEM: The concentration of a drug in the bloodstream (mg/L) \( t \) hours after injection is \( C(t) = t^2 e^{-t} \) for \( t \ge 0 \). Find the time intervals when the concentration is increasing and when it is decreasing.

STEPS:
- Step 1: Function and domain: \( C(t) = t^2 e^{-t} \), \( t \ge 0 \).
- Step 2: Differentiate using product rule. \( C'(t) = 2t e^{-t} + t^2 (-e^{-t}) = e^{-t}(2t - t^2) = t e^{-t}(2 - t) \).
- Step 3: Critical points: \( C'(t)=0 \implies t=0 \) or \( t=2 \). (Note: \( e^{-t} > 0 \) always.)
- Step 4: Sign chart for \( t \ge 0 \). For \( 0 < t < 2 \): \( t>0, e^{-t}>0, (2-t)>0 \Rightarrow C'(t)>0 \). For \( t > 2 \): \( (2-t)<0 \Rightarrow C'(t)<0 \).
- Step 5: Interpret. Concentration increases from injection up to 2 hours, then decreases afterward. At \( t=0 \), concentration is 0 (start).

REASONING: The product rule handles the polynomial–exponential product. The factor \( e^{-t} \) is always positive, so the sign of \( C' \) depends entirely on \( t(2-t) \), a simple quadratic. This shows how exponential decay modulates the polynomial growth.

ANSWER: Increasing on \( [0, 2] \) hours; decreasing on \( [2, \infty) \) hours.

## COMPETENCY_QUESTION_1
QUESTION: A student claims: “The function \( f(x) = x^3 \) is strictly increasing on \( \mathbb{R} \) because its derivative \( f'(x) = 3x^2 \) is always non‑negative.” Is the student’s reasoning fully correct? Justify your answer using the definition of strictly increasing functions and the behaviour of \( f'(x) \) at \( x=0 \).

COMPETENCY: Reasoning and justification (connecting derivative sign to strict monotonicity, handling isolated zeros of derivative).

STEPS:
- Step 1: Recall definition: \( f \) strictly increasing on \( I \) iff \( x_1 < x_2 \implies f(x_1) < f(x_2) \).
- Step 2: Check \( f'(x) = 3x^2 \ge 0 \) everywhere, zero only at \( x=0 \).
- Step 3: Argue that a derivative zero at an isolated point does not prevent strict increase; the function still satisfies \( f(x_2) - f(x_1) = f'(c)(x_2-x_1) > 0 \) for any \( x_1 < x_2 \) by MVT (since \( f'(c) > 0 \) for some \( c \) between them unless the interval is just \( \{0\} \)).
- Step 4: Conclude the student’s conclusion is correct but the reasoning “non‑negative derivative implies strictly increasing” is incomplete; one must note that \( f' \) is not identically zero on any sub‑interval.

ANSWER: The student’s conclusion is correct (\( x^3 \) is strictly increasing), but the reasoning is slightly flawed. A non‑negative derivative only guarantees the function is non‑decreasing. For strict increase, we need \( f'(x) > 0 \) except possibly at isolated points. Here \( f'(x) = 3x^2 = 0 \) only at \( x=0 \), so \( f \) is strictly increasing. The student should have mentioned the “isolated zeros” condition.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Find the values of the parameter \( a \) for which the function \( f(x) = x^3 - 3x^2 + ax + 1 \) is strictly increasing on the whole real line \( \mathbb{R} \).

COMPETENCY: Analytical reasoning with parameters (using discriminant of derivative to ensure no sign change).

STEPS:
- Step 1: Compute derivative: \( f'(x) = 3x^2 - 6x + a \).
- Step 2: For \( f \) to be strictly increasing on \( \mathbb{R} \), we need \( f'(x) \ge 0 \) for all \( x \) and \( f'(x) \) not identically zero on any interval. Since \( f' \) is a quadratic, this means its discriminant \( \Delta \le 0 \).
- Step 3: \( \Delta = (-6)^2 - 4 \cdot 3 \cdot a = 36 - 12a \). Set \( \Delta \le 0 \implies 36 - 12a \le 0 \implies a \ge 3 \).
- Step 4: Check boundary \( a = 3 \): \( f'(x) = 3x^2 - 6x + 3 = 3(x-1)^2 \ge 0 \), zero only at \( x=1 \) (isolated). So \( f \) is strictly increasing for \( a = 3 \) as well.
- Step 5: Final answer: \( a \ge 3 \).

ANSWER: \( a \ge 3 \). For \( a > 3 \), \( f'(x) > 0 \) everywhere; for \( a = 3 \), \( f'(x) = 3(x-1)^2 \ge 0 \) with a single zero at \( x=1 \), still strictly increasing.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine a small business owner in Delhi tracking daily profit (in ₹) as the number of items sold ______.

## DIAGNOSTIC_ANSWER_7
increases

The increasing verb is the trend's first half: profit's rise, then fall, is exactly what the derivative's sign will certify. **A wrong answer (a price word) reveals the student has tracked the wrong quantity - the story counts items sold, not rates charged.**

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can compute the derivative of a given function (polynomial, trigonometric, exponential, or rational), find its critical points, determine the sign of the derivative on each sub‑interval, and correctly state the intervals of strict increase and strict decrease.
