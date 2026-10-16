## ELI5
The car's velocity formula is known, and the distance over a stated window is wanted: find any antiderivative of the velocity, evaluate it at the end and start, and subtract. The Second Fundamental Theorem converts definite integrals from limit-of-rectangles chores into simple evaluations - F of b minus F of a - with the integration constant harmlessly cancelling. Continuity of the integrand on the interval is the licence; the antiderivative is the executor.

## DEFINITION
The Second Fundamental Theorem of Calculus states that if \( f \) is a continuous function on the closed interval \([a, b]\) and \( F \) is any antiderivative of \( f \) (i.e., \( F'(x) = f(x) \) for all \( x \in [a, b] \)), then the definite integral of \( f \) from \( a \) to \( b \) is given by \( \int_a^b f(x) \, dx = F(b) - F(a) \). This theorem provides a practical method to evaluate definite integrals without computing limits of Riemann sums.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly evaluate definite integrals by finding an antiderivative and applying the evaluation theorem, can identify when the theorem applies (continuity of the integrand on the interval), and can handle integrals requiring algebraic manipulation or standard integral formulas before applying the theorem.

## SCOPE_BOUNDARY
This node covers the statement, justification, and application of the Second Fundamental Theorem of Calculus to evaluate definite integrals of continuous functions. It does not cover the First Fundamental Theorem (area function derivative), properties of definite integrals (symmetry, splitting limits), or integration techniques (substitution, parts, partial fractions) except as needed to find antiderivatives for evaluation.

## WALKTHROUGH
Imagine you are tracking a car's velocity \( v(t) = 3t^2 + 2 \) m/s from \( t = 1 \) s to \( t = 4 \) s. To find the total distance travelled, you need the definite integral of velocity. Instead of approximating with rectangles, you find an antiderivative \( s(t) = t^3 + 2t \) (since distance is the antiderivative of velocity). The distance is \( s(4) - s(1) = (64 + 8) - (1 + 2) = 69 \) m. This is the power of the Second Fundamental Theorem: find any antiderivative \( F \), then compute \( F(b) - F(a) \). Start by writing the integral, find \( F(x) \) using standard formulas (remembering the constant cancels), substitute the upper and lower limits, and subtract. The key insight: the constant of integration disappears, so you never need to write \( +C \) when evaluating definite integrals.

Takeaway first: evaluation replaces accumulation - antiderivative at the top limit minus antiderivative at the bottom - and the constant of integration cancels by construction. Exam moves: evaluation questions on definite integrals after algebraic preparation, applicability questions on the continuity licence, and constant-cancellation questions explaining why plus C is needless here. Method: rerun the drive - antiderivative of the velocity, evaluate at the later and earlier times, subtract, and read the metres. Check yourself: the theorem needs the integrand continuous on the whole closed interval; a break in the middle voids the licence until the interval is split. Drill: evaluate three definite integrals by the theorem and state why each licence holds.

## DIAGNOSTIC_QUESTION_1
State the Second Fundamental Theorem of Calculus precisely, including the conditions on \( f \) and \( F \).

## DIAGNOSTIC_ANSWER_1
The theorem: If \( f \) is continuous on \([a, b]\) and \( F \) is an antiderivative of \( f \) (i.e., \( F'(x) = f(x) \)), then \( \int_a^b f(x) \, dx = F(b) - F(a) \). A wrong answer (e.g., omitting continuity, confusing with the first theorem, or writing \( F(a) - F(b) \)) reveals the student does not recall the exact hypotheses or the order of subtraction.

## DIAGNOSTIC_QUESTION_2
Explain why the constant of integration \( C \) cancels out when using the Second Fundamental Theorem to evaluate a definite integral.

## DIAGNOSTIC_ANSWER_2
If \( F(x) \) is an antiderivative, then \( F(x) + C \) is also an antiderivative. Evaluating \( [F(x) + C]_a^b = (F(b)+C) - (F(a)+C) = F(b) - F(a) \). The constant cancels. A wrong answer (e.g., "we ignore C because it's arbitrary") shows the student does not understand the algebraic reason and may mistakenly keep \( C \) in the final answer.

## DIAGNOSTIC_QUESTION_3
Evaluate \( \int_1^3 (2x^3 - 4x + 5) \, dx \) using the Second Fundamental Theorem. Show all steps.

## DIAGNOSTIC_ANSWER_3
Antiderivative: \( \frac{2x^4}{4} - \frac{4x^2}{2} + 5x = \frac{x^4}{2} - 2x^2 + 5x \). Evaluate at 3: \( \frac{81}{2} - 18 + 15 = 40.5 - 3 = 37.5 \). Evaluate at 1: \( \frac{1}{2} - 2 + 5 = 3.5 \). Difference: \( 37.5 - 3.5 = 34 \). A wrong answer (e.g., 34.5 or 33) typically comes from arithmetic errors in powers or sign mistakes when substituting the lower limit.

## DIAGNOSTIC_QUESTION_4
Compare the two statements: (i) \( \frac{d}{dx} \int_a^x f(t) \, dt = f(x) \) and (ii) \( \int_a^b f(x) \, dx = F(b) - F(a) \). Which is the First Fundamental Theorem and which is the Second? What is the key difference in their roles?

## DIAGNOSTIC_ANSWER_4
(i) is the First Fundamental Theorem (derivative of area function gives integrand). (ii) is the Second Fundamental Theorem (evaluation of definite integral using antiderivative). The first connects differentiation and integration as inverse processes; the second provides a computational tool. A wrong answer confuses the two, indicating the student does not grasp the distinct purposes: one theoretical, one practical.

## DIAGNOSTIC_QUESTION_5
A student evaluates \( \int_0^2 \frac{1}{x-1} \, dx \) by finding antiderivative \( \ln|x-1| \) and computing \( \ln|1| - \ln|-1| = 0 \). Is this correct? Justify your answer.

## DIAGNOSTIC_ANSWER_5
Incorrect. The integrand \( \frac{1}{x-1} \) is not continuous on \([0, 2]\) (it has a vertical asymptote at \( x=1 \)). The Second Fundamental Theorem requires continuity on the closed interval. The integral is improper and diverges. A wrong answer that accepts the computation reveals the student ignores the continuity condition, a critical competitive-exam trap.

## DIAGNOSTIC_QUESTION_6
Construct a real-world problem (e.g., from physics or economics) that requires evaluating a definite integral using the Second Fundamental Theorem. Specify the integrand, limits, and the meaning of the result.

## DIAGNOSTIC_ANSWER_6
Example: The marginal cost function for producing \( x \) units is \( C'(x) = 0.02x + 5 \) rupees/unit. Find the total cost of increasing production from 100 to 200 units. Integrand: \( 0.02x + 5 \), limits: 100 to 200. Result: \( \int_{100}^{200} (0.02x+5) \, dx = [0.01x^2 + 5x]_{100}^{200} = (400+1000) - (100+500) = 800 \) rupees. A poor answer uses an integrand that is not a derivative of a meaningful quantity or misinterprets the result.

## COMMON_MISCONCEPTION
Students often write the antiderivative with \( +C \) and then substitute limits, e.g., \( [F(x) + C]_a^b \), and then incorrectly keep \( C \) in the final numeric answer, or they forget to subtract \( F(a) \) and only compute \( F(b) \). Another frequent error is applying the theorem to functions with discontinuities inside the interval (like \( \int_{-1}^1 \frac{1}{x^2} \, dx \)) without splitting the integral, leading to nonsensical negative areas for positive functions.

## ON_FAILURE
If a student makes the above errors: (1) Have them re-derive the cancellation of \( C \) algebraically: \( (F(b)+C) - (F(a)+C) = F(b)-F(a) \). (2) Give a set of definite integrals where the integrand has a discontinuity in the interval (e.g., \( \int_0^2 \frac{1}{x-1} dx \)) and ask them to check continuity first. (3) Practice the "upper minus lower" order by evaluating \( \int_1^2 2x \, dx \) both as \( [x^2]_1^2 \) and as \( [x^2+5]_1^2 \) to see the constant cancels. (4) Revisit node c12_math_cbse_07_008 (First Fundamental Theorem) to reinforce the link between antiderivatives and area.

## PREREQUISITE_NODE_IDS
c12_math_cbse_07_008, c12_math_cbse_07_001, c12_math_cbse_07_007, c11_math_cbse_13_006, c11_math_cbse_13_007, c11_math_cbse_13_008, c11_math_cbse_13_009, c11_math_cbse_13_010, c12_math_cbse_07_003, c12_math_cbse_07_004, c12_math_cbse_07_006

## PREREQUISITE_REASONS
c12_math_cbse_07_008: First Fundamental Theorem establishes the area function and its derivative; needed to understand why antiderivatives evaluate definite integrals.
c12_math_cbse_07_001: Integration as inverse of differentiation provides the concept of antiderivatives and standard integral formulas.
c12_math_cbse_07_007: Definite integral as limit of a sum gives the geometric meaning of the definite integral as area.
c11_math_cbse_13_006: Intuitive idea of derivatives is needed to understand antiderivatives.
c11_math_cbse_13_007: Derivative of polynomial functions provides basic differentiation rules reversed for integration.
c11_math_cbse_13_008: Derivative using first principles reinforces the derivative-integral connection.
c11_math_cbse_13_009: Algebra of derivatives (sum, product rules) is used when finding antiderivatives of combined functions.
c11_math_cbse_13_010: Derivatives of trigonometric functions are needed for integrals involving trig functions.
c12_math_cbse_07_003: Fundamental Theorem of Calculus Part 2 evaluates definite integrals using anti-derivatives from partial fractions.  
c12_math_cbse_07_004: FTC Part 2 evaluates definite integrals using anti-derivatives found via integration by parts.  
c12_math_cbse_07_006: The student should be able to compute indefinite integrals of standard forms (from nodes c12_math_cbse_07_001 to c12_math_cbse_07_006) and understand the geometric meaning of a definite integral as area (node c12_math_cbse_07_007).  

## FORWARD_NODE_IDS
c12_math_cbse_07_010, c12_math_cbse_07_011
## FORWARD_REASONS
c12_math_cbse_07_010: Properties of definite integrals (symmetry, splitting limits) rely on the evaluation theorem to prove and apply.
c12_math_cbse_07_011: Evaluation by substitution uses the Second Fundamental Theorem after changing variables; the theorem justifies the change of limits.

## CROSS_SUBJECT_PREREQS
c11_stat_cbse_01_008, c11_stat_cbse_05_002
## CROSS_SUBJECT_REASONS
c11_stat_cbse_01_008: Continuous variables in statistics lead to probability density functions; their probabilities are definite integrals, evaluated using the Second Fundamental Theorem.
c11_stat_cbse_05_002: The mean of a continuous distribution is computed as \( \int x f(x) \, dx \), a direct application of the evaluation theorem.

## CHAIN_DESCRIPTION
c12_math_cbse_07_008 -> c12_math_cbse_07_009 -> c12_math_cbse_07_010

## THIS_FORMULA
\[ \int_a^b f(x) \, dx = F(b) - F(a) \quad \text{where } F'(x) = f(x) \text{ and } f \text{ is continuous on } [a,b] \]

## FORMULA_VARIABLES
\( a \) = lower limit of integration, \( b \) = upper limit of integration, \( f(x) \) = integrand (continuous on \([a,b]\)), \( F(x) \) = any antiderivative of \( f \) (i.e., \( F'(x) = f(x) \))

## FORMULA_UNITS
The units of the definite integral are (units of \( f \)) \(\times\) (units of \( x \)). For example, if \( f \) is velocity (m/s) and \( x \) is time (s), the integral has units of metres.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_02_003 | The definite integral of velocity over time gives displacement; the Second Fundamental Theorem evaluates it using the position antiderivative.
 c12_eco_cbse_03_001 | Consumer surplus is the area under the demand curve above price, computed as a definite integral evaluated via antiderivatives.
## PREREQ_CONCEPT
The student must be fluent in finding antiderivatives of basic functions (polynomials, trigonometric, exponential, logarithmic) and understand the notation \( F(b) - F(a) \).

## PREREQ_BEFORE
The student should be able to compute indefinite integrals of standard forms (from nodes c12_math_cbse_07_001 to c12_math_cbse_07_006) and understand the geometric meaning of a definite integral as area (node c12_math_cbse_07_007).

## PREREQ_STUCK
If stuck, revisit node c12_math_cbse_07_001 (Integration as Inverse of Differentiation) to practice finding antiderivatives, and node c12_math_cbse_07_008 (First Fundamental Theorem) to see why antiderivatives give area.

## WORKED_EXAMPLE_1
PROBLEM: A particle moves along a straight line with velocity \( v(t) = 4t^3 - 6t + 2 \) m/s. Find the displacement of the particle from \( t = 1 \) s to \( t = 3 \) s.
STEPS:
- Step 1: Displacement is the definite integral of velocity: \( \int_1^3 (4t^3 - 6t + 2) \, dt \).
- Step 2: Find an antiderivative \( s(t) \) of \( v(t) \). Using power rule: \( \int 4t^3 \, dt = t^4 \), \( \int -6t \, dt = -3t^2 \), \( \int 2 \, dt = 2t \). So \( s(t) = t^4 - 3t^2 + 2t \). (No \( +C \) needed for definite integral.)
- Step 3: Evaluate \( s(t) \) at upper limit 3: \( s(3) = 3^4 - 3(3^2) + 2(3) = 81 - 27 + 6 = 60 \).
- Step 4: Evaluate \( s(t) \) at lower limit 1: \( s(1) = 1^4 - 3(1^2) + 2(1) = 1 - 3 + 2 = 0 \).
- Step 5: Subtract: displacement = \( s(3) - s(1) = 60 - 0 = 60 \) m.
REASONING: The Second Fundamental Theorem directly links the net change in position (displacement) to the integral of velocity. Finding any antiderivative and evaluating at the endpoints gives the exact displacement without approximation.
ANSWER: 60 m

## WORKED_EXAMPLE_2
PROBLEM: Evaluate \( \int_0^{\pi/2} (\sin x + \cos x) \, dx \).
STEPS:
- Step 1: Identify the integrand \( f(x) = \sin x + \cos x \) on \( [0, \pi/2] \). It is continuous.
- Step 2: Find antiderivative: \( \int \sin x \, dx = -\cos x \), \( \int \cos x \, dx = \sin x \). So \( F(x) = -\cos x + \sin x \).
- Step 3: Evaluate at upper limit \( \pi/2 \): \( F(\pi/2) = -\cos(\pi/2) + \sin(\pi/2) = -0 + 1 = 1 \).
- Step 4: Evaluate at lower limit 0: \( F(0) = -\cos 0 + \sin 0 = -1 + 0 = -1 \).
- Step 5: Compute \( F(\pi/2) - F(0) = 1 - (-1) = 2 \).
REASONING: The antiderivative of a sum is the sum of antiderivatives. The evaluation at the limits uses exact trigonometric values. The constant of integration cancels, so it is omitted.
ANSWER: 2

## WORKED_EXAMPLE_3
PROBLEM: The marginal revenue function for a product is \( R'(x) = 100 - 0.2x \) rupees per unit, where \( x \) is the number of units sold. Find the additional revenue generated by increasing sales from 50 to 100 units.
STEPS:
- Step 1: Additional revenue is \( \int_{50}^{100} R'(x) \, dx = \int_{50}^{100} (100 - 0.2x) \, dx \).
- Step 2: Find antiderivative: \( \int 100 \, dx = 100x \), \( \int -0.2x \, dx = -0.1x^2 \). So \( F(x) = 100x - 0.1x^2 \).
- Step 3: Evaluate at 100: \( F(100) = 100(100) - 0.1(100)^2 = 10000 - 1000 = 9000 \).
- Step 4: Evaluate at 50: \( F(50) = 100(50) - 0.1(50)^2 = 5000 - 250 = 4750 \).
- Step 5: Subtract: \( F(100) - F(50) = 9000 - 4750 = 4250 \).
- Step 6: Interpret: The extra revenue from selling units 51 to 100 is ₹4250.
REASONING: Marginal revenue is the derivative of total revenue. The definite integral of marginal revenue over an interval gives the total revenue change over that interval. The Second Fundamental Theorem evaluates this exactly.
ANSWER: ₹4250

## COMPETENCY_QUESTION_1
QUESTION: A student claims that \( \int_{-1}^{1} \frac{1}{x^2} \, dx = \left[ -\frac{1}{x} \right]_{-1}^{1} = -1 - (1) = -2 \). Identify the error in this evaluation and explain why the Second Fundamental Theorem cannot be applied directly. Then, set up the correct approach (without evaluating) for this improper integral.
COMPETENCY: Error identification and correction
STEPS:
- Step 1: Check continuity of \( \frac{1}{x^2} \) on \([-1, 1]\).
- Step 2: Identify the discontinuity at \( x = 0 \).
- Step 3: State that the Second Fundamental Theorem requires continuity on the closed interval.
- Step 4: Explain that the integral is improper and must be split into two limits: \( \lim_{a \to 0^-} \int_{-1}^{a} \frac{1}{x^2} dx + \lim_{b \to 0^+} \int_{b}^{1} \frac{1}{x^2} dx \).
- Step 5: Note that both limits diverge to \( +\infty \), so the integral does not converge.
ANSWER: The error is applying the theorem to a function with an infinite discontinuity at \( x=0 \) inside the interval. The integrand is not continuous on \([-1,1]\), so the theorem's hypothesis is violated. The correct approach is to split at the discontinuity and evaluate as improper integrals; both diverge, so the integral is divergent.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Let \( f \) be a continuous function on \([0, 2]\) such that \( \int_0^2 f(x) \, dx = 5 \) and \( \int_0^1 f(x) \, dx = 2 \). Define \( F(x) = \int_0^x f(t) \, dt \). (a) Find \( F(2) \) and \( F(1) \). (b) Use the Second Fundamental Theorem to find \( F'(1) \). (c) If \( g(x) = \int_x^2 f(t) \, dt \), find \( g'(x) \) and evaluate \( g'(1) \).
COMPETENCY: Translating real-world situations to mathematical expressions / Comparing and justifying
STEPS:
- Step 1: By definition, \( F(2) = \int_0^2 f(t) dt = 5 \), \( F(1) = \int_0^1 f(t) dt = 2 \).
- Step 2: By the First Fundamental Theorem, \( F'(x) = f(x) \). So \( F'(1) = f(1) \). (Cannot be numerically evaluated without more info.)
- Step 3: Rewrite \( g(x) = \int_x^2 f(t) dt = \int_0^2 f(t) dt - \int_0^x f(t) dt = 5 - F(x) \).
- Step 4: Differentiate: \( g'(x) = -F'(x) = -f(x) \).
- Step 5: Thus \( g'(1) = -f(1) = -F'(1) \).
ANSWER: (a) \( F(2) = 5 \), \( F(1) = 2 \). (b) \( F'(1) = f(1) \) (exact value unknown). (c) \( g'(x) = -f(x) \), so \( g'(1) = -f(1) \).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: This theorem provides a ______ method to evaluate definite integrals without computing limits of Riemann sums.

## DIAGNOSTIC_ANSWER_7
practical

Practical is the theorem's gift: the limit-of-sums machinery is retired in favour of two antiderivative evaluations. **A wrong answer (a theoretical word) reveals the student has praised the theorem for existing rather than for what it lets you skip.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: To find the total ______ travelled, you need the definite integral of velocity.

## DIAGNOSTIC_ANSWER_8
distance

The distance is the definite integral's cargo: velocity's antiderivative evaluated across the window lands exactly on it. **A wrong answer (displacement's sign) reveals the student has worried about direction where the walkthrough's velocity stays positive throughout.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can correctly evaluate definite integrals by finding an antiderivative and applying the evaluation theorem, can identify when the theorem applies (continuity of the integrand on the interval), and can handle integrals requiring algebraic manipulation or standard integral formulas before applying the theorem.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: To find the total distance ______, you need the definite integral of velocity.

## DIAGNOSTIC_ANSWER_10
travelled

Travelled is the accumulated word: the integral measures what the car has done between the two times, not what it will do. **A wrong answer (a remaining word) reveals the student has turned the odometer backwards.** Travelled is the integral's direction: the antiderivative is evaluated from the earlier time to the later one, never the reverse order.
