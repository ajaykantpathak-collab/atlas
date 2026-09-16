## DEFINITION
The Mean Value Theorem (MVT) states: If a function \( f \) is continuous on the closed interval \([a, b]\) and differentiable on the open interval \((a, b)\), then there exists at least one point \( c \in (a, b) \) such that \( f'(c) = \frac{f(b) - f(a)}{b - a} \). Geometrically, this means there is at least one point on the curve where the tangent is parallel to the chord joining the endpoints \((a, f(a))\) and \((b, f(b))\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to state the Mean Value Theorem with all its conditions, prove it using Rolle's Theorem, verify it for given algebraic and trigonometric functions on specified intervals, and interpret the result geometrically as the existence of a tangent parallel to the secant line.

## SCOPE_BOUNDARY
This node covers the statement, proof (via Rolle's Theorem), geometric interpretation, and verification of the Mean Value Theorem for functions that are continuous on \([a, b]\) and differentiable on \((a, b)\). It does NOT cover Cauchy's Mean Value Theorem, Taylor's Theorem, or applications to proving inequalities (though these are natural extensions). The scope is strictly limited to the NCERT Class 12 syllabus for Chapter 5.

## WALKTHROUGH
Imagine you drive from Delhi to Agra, a distance of 200 km, in exactly 2 hours. Your average speed is 100 km/h. The Mean Value Theorem guarantees that at some instant during the trip, your speedometer must have read exactly 100 km/h — provided your speed changed continuously (no teleporting) and you didn't stop (differentiable). To begin, write down the two conditions: continuity on \([a, b]\) and differentiability on \((a, b)\). Then recall Rolle's Theorem: if \( f(a) = f(b) \), there is a point with zero derivative. The clever step is to construct an auxiliary function \( g(x) = f(x) - \frac{f(b)-f(a)}{b-a}(x-a) - f(a) \) which satisfies \( g(a) = g(b) \). Applying Rolle's Theorem to \( g \) yields the MVT. The key insight is that subtracting the secant line's equation from \( f \) creates a function with equal endpoint values.

## DIAGNOSTIC_QUESTION_1
State the Mean Value Theorem precisely, including all hypotheses and the conclusion. Use mathematical notation.

## DIAGNOSTIC_ANSWER_1
**Correct Answer:** If \( f \) is continuous on \([a, b]\) and differentiable on \((a, b)\), then there exists at least one \( c \in (a, b) \) such that \( f'(c) = \frac{f(b) - f(a)}{b - a} \).  
**Misconception Analysis:** A common wrong answer omits "continuous on \([a, b]\)" or "differentiable on \((a, b)\)", or writes the conclusion as \( f(c) = \frac{f(b)-f(a)}{b-a} \) (confusing function value with derivative). This reveals the student memorizes the formula without understanding the conditions that make it valid.

## DIAGNOSTIC_QUESTION_2
Explain why the function \( f(x) = |x| \) on \([-1, 1]\) does NOT satisfy the hypotheses of the Mean Value Theorem. What happens if you try to find \( c \) such that \( f'(c) = \frac{f(1)-f(-1)}{1-(-1)} \)?

## DIAGNOSTIC_ANSWER_2
**Correct Answer:** \( f(x) = |x| \) is continuous on \([-1, 1]\) but NOT differentiable at \( x = 0 \in (-1, 1) \). The right-hand derivative at 0 is 1, left-hand derivative is -1, so \( f'(0) \) does not exist. The secant slope is \( \frac{1-1}{2} = 0 \). There is no \( c \in (-1, 1) \) with \( f'(c) = 0 \) because \( f'(x) = 1 \) for \( x>0 \) and \( f'(x) = -1 \) for \( x<0 \).  
**Misconception Analysis:** Students often say "it's not differentiable at 0" but forget to explicitly state that 0 lies in the OPEN interval \((-1, 1)\). Some incorrectly claim the function is not continuous. This shows confusion between the closed interval condition (continuity) and open interval condition (differentiability).

## DIAGNOSTIC_QUESTION_3
Verify the Mean Value Theorem for \( f(x) = x^3 - 3x^2 + 2x \) on the interval \([0, 2]\). Find all values of \( c \) that satisfy the conclusion.

## DIAGNOSTIC_ANSWER_3
**Correct Answer with Steps:**  
1. \( f(x) = x^3 - 3x^2 + 2x \) is a polynomial, so continuous on \([0, 2]\) and differentiable on \((0, 2)\). Conditions satisfied.  
2. \( f(0) = 0 \), \( f(2) = 8 - 12 + 4 = 0 \). Secant slope \( = \frac{0-0}{2-0} = 0 \).  
3. \( f'(x) = 3x^2 - 6x + 2 \).  
4. Set \( f'(c) = 0 \Rightarrow 3c^2 - 6c + 2 = 0 \Rightarrow c = \frac{6 \pm \sqrt{36 - 24}}{6} = \frac{6 \pm 2\sqrt{3}}{6} = 1 \pm \frac{\sqrt{3}}{3} \).  
5. Both \( 1 - \frac{\sqrt{3}}{3} \approx 0.423 \) and \( 1 + \frac{\sqrt{3}}{3} \approx 1.577 \) lie in \((0, 2)\).  
**Answer:** \( c = 1 \pm \frac{\sqrt{3}}{3} \).  
**Error Analysis:** A common mistake is solving \( f(c) = 0 \) instead of \( f'(c) = 0 \), yielding \( c = 0, 1, 2 \). This confuses the function value with the derivative. Another error is forgetting to check that the found \( c \) lies in the open interval.

## DIAGNOSTIC_QUESTION_4
Compare Rolle's Theorem and the Mean Value Theorem. How is MVT a generalization of Rolle's Theorem? Construct the auxiliary function used in the proof of MVT from Rolle's Theorem and explain why it works.

## DIAGNOSTIC_ANSWER_4
**Correct Answer:** Rolle's Theorem requires \( f(a) = f(b) \) and concludes \( f'(c) = 0 \). MVT drops the equal-endpoint condition and concludes \( f'(c) = \frac{f(b)-f(a)}{b-a} \). The auxiliary function is \( g(x) = f(x) - \frac{f(b)-f(a)}{b-a}(x-a) - f(a) \). Then \( g(a) = f(a) - 0 - f(a) = 0 \) and \( g(b) = f(b) - (f(b)-f(a)) - f(a) = 0 \). So \( g \) satisfies Rolle's conditions. By Rolle's Theorem, \( \exists c \in (a,b) \) with \( g'(c) = 0 \). But \( g'(x) = f'(x) - \frac{f(b)-f(a)}{b-a} \), so \( g'(c) = 0 \Rightarrow f'(c) = \frac{f(b)-f(a)}{b-a} \).  
**Error Analysis:** Students often write the auxiliary function incorrectly, e.g., missing the \(-f(a)\) term or using \( (x-b) \) instead of \( (x-a) \). This shows they don't understand the geometric idea of subtracting the secant line equation to make endpoints equal.

## DIAGNOSTIC_QUESTION_5
A student claims: "The function \( f(x) = \frac{1}{x} \) on \([-1, 1]\) satisfies the Mean Value Theorem because it is differentiable everywhere except at 0, and 0 is just one point." Evaluate this claim. Is the student correct? Justify your answer.

## DIAGNOSTIC_ANSWER_5
**Correct Answer:** The student is INCORRECT. The Mean Value Theorem requires differentiability on the ENTIRE OPEN INTERVAL \((-1, 1)\). Since \( f(x) = \frac{1}{x} \) is not defined at \( x = 0 \), it is neither continuous nor differentiable at 0. The domain of \( f \) is \( (-\infty, 0) \cup (0, \infty) \), so \( f \) is not even a function on \([-1, 1]\). The hypotheses fail at the very first step.  
**Error Analysis:** The student confuses "differentiable almost everywhere" with "differentiable on the whole open interval". They also overlook that continuity on the closed interval fails because the function isn't defined at 0. This is a classic JEE trap: checking differentiability only where the function is defined, ignoring points in the interval where it is not defined.

## DIAGNOSTIC_QUESTION_6
Construct a function \( f \) defined on \([0, 2]\) such that \( f(0) = 0 \), \( f(2) = 4 \), and the Mean Value Theorem guarantees at least one \( c \in (0, 2) \) with \( f'(c) = 2 \). Your function must be differentiable on \((0, 2)\) but NOT a straight line. Verify that your function works.

## DIAGNOSTIC_ANSWER_6
**Expected Answer:** Any function continuous on \([0, 2]\), differentiable on \((0, 2)\), with \( f(0)=0, f(2)=4 \), and non-linear. Example: \( f(x) = x^2 \). Check: \( f(0)=0, f(2)=4 \). Secant slope \( = \frac{4-0}{2-0} = 2 \). \( f'(x) = 2x \). Set \( 2c = 2 \Rightarrow c = 1 \in (0, 2) \). Works. Another example: \( f(x) = 2x + \sin(\pi x) \).  
**Poor Answer Indicators:** If the student gives a straight line \( f(x) = 2x \), they miss "NOT a straight line". If they give \( f(x) = |x| \) or a piecewise function with a corner, they violate differentiability. This tests whether they can synthesize the conditions and construct a valid example.

## COMMON_MISCONCEPTION
**Specific Error:** Students frequently write the conclusion as \( f(c) = \frac{f(b)-f(a)}{b-a} \) instead of \( f'(c) = \frac{f(b)-f(a)}{b-a} \). They confuse the *value* of the function at \( c \) with the *derivative* (slope) at \( c \).  
**Why it's wrong:** The Mean Value Theorem is about the slope of the tangent line matching the slope of the secant line. \( f(c) \) is a y-coordinate, while \( \frac{f(b)-f(a)}{b-a} \) is a slope (rate of change). Equating them is dimensionally inconsistent.  
**Another Error:** Assuming \( c \) is unique. The theorem guarantees *at least one* \( c \); there can be multiple (as seen in Diagnostic 3). Students often stop after finding one value.

## ON_FAILURE
1. **Revisit Rolle's Theorem (c12_math_cbse_05_012):** Ensure you can state it and verify its conditions. MVT proof is a direct application of Rolle's Theorem to a modified function.
2. **Practice Condition-Checking:** For 5 different functions on given intervals, explicitly write: "Continuous on [a,b] because... Differentiable on (a,b) because..." before attempting to find \( c \).
3. **Redo the Auxiliary Function Construction:** Write \( g(x) = f(x) - \left[ \frac{f(b)-f(a)}{b-a}(x-a) + f(a) \right] \) and verify \( g(a)=g(b) \) step by step. Do this for 3 functions until it becomes automatic.
4. **Re-diagnostic:** Attempt Diagnostic Question 3 again with a new function, e.g., \( f(x) = \sin x \) on \([0, \pi]\), and check if you correctly set \( f'(c) = \text{secant slope} \).

## PREREQUISITE_NODE_IDS
c12_math_cbse_05_012, c12_math_cbse_05_004, c12_math_cbse_05_001, c11_math_cbse_13_006, c11_math_cbse_13_008, c12_math_cbse_05_005, c12_math_cbse_05_011

## PREREQUISITE_REASONS
c12_math_cbse_05_012: Rolle's Theorem is the direct foundation; MVT is proved by applying Rolle's Theorem to an auxiliary function.
c12_math_cbse_05_004: Differentiability definition and condition are needed to check the hypothesis "differentiable on (a,b)".
c12_math_cbse_05_001: Continuity definition is needed to check the hypothesis "continuous on [a,b]".
c11_math_cbse_13_006: Intuitive idea of derivative as rate of change connects to the geometric interpretation of MVT.
c11_math_cbse_13_008: Derivative using first principle underpins the formal definition of \( f'(c) \) used in the theorem.
c12_math_cbse_05_005: Mean Value Theorem similarly requires differentiability at each point of an interval.  
c12_math_cbse_05_011: Lagrange's Mean Value Theorem is the foundation for Taylor's theorem, which explicitly uses second and higher derivatives for approximations. The error term in MVT involves \(f''(\xi)\).  

## FORWARD_NODE_IDS


## FORWARD_REASONS
This is the final node in Chapter 5 (Continuity and Differentiability). The Mean Value Theorem is a capstone result that uses all previous concepts (continuity, differentiability, Rolle's Theorem). It leads to applications in higher calculus (e.g., Taylor series, error bounds) but those are beyond Class 12 scope.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_math_cbse_10_006
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: Derivatives as rate of change — MVT formally links average rate of change over an interval to instantaneous rate of change at a point.
c11_math_cbse_10_006: Slope of a line — the secant slope \( \frac{f(b)-f(a)}{b-a} \) is the slope of the chord joining endpoints; MVT says this equals the slope of the tangent (derivative) at some interior point.

## CHAIN_DESCRIPTION
c12_math_cbse_05_012 -> c12_math_cbse_05_013 -> N/A

## THIS_FORMULA
If \( f \) is continuous on \([a, b]\) and differentiable on \((a, b)\), then \( \exists c \in (a, b) \) such that \( f'(c) = \frac{f(b) - f(a)}{b - a} \).

## FORMULA_VARIABLES
\( f \): real-valued function; \( a, b \): endpoints of interval with \( a < b \); \( c \): point in open interval \((a, b)\) where tangent is parallel to secant; \( f'(c) \): derivative (instantaneous rate of change) at \( c \); \( \frac{f(b)-f(a)}{b-a} \): average rate of change over \([a, b]\).

## FORMULA_UNITS
dimensionless (pure mathematical relationship; units depend on context, e.g., if \( f \) is distance in km and \( x \) is time in hours, then both sides are km/h).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_006 | MVT connects average rate of change (secant slope) to instantaneous rate of change (derivative), formalizing the intuitive idea from Class 11.
c11_math_cbse_10_006 | The secant slope formula \( \frac{f(b)-f(a)}{b-a} \) is exactly the slope of a line between two points, a concept from coordinate geometry.
## PREREQ_CONCEPT
Rolle's Theorem and the interpretation of derivative as slope of tangent.

## PREREQ_BEFORE
Student must be able to verify continuity on a closed interval and differentiability on an open interval, and state Rolle's Theorem with its conditions.

## PREREQ_STUCK
Revisit Rolle's Theorem (c12_math_cbse_05_012) and practice checking continuity/differentiability conditions for piecewise and absolute value functions.

## WORKED_EXAMPLE_1
PROBLEM: Verify the Mean Value Theorem for \( f(x) = \sqrt{x} \) on the interval \([1, 4]\). Find the value(s) of \( c \).  
STEPS:
- Step 1: Check hypotheses. \( f(x) = \sqrt{x} \) is continuous on \([1, 4]\) (square root function is continuous for \( x \ge 0 \)). It is differentiable on \((1, 4)\) because \( f'(x) = \frac{1}{2\sqrt{x}} \) exists for all \( x > 0 \). Conditions satisfied.
- Step 2: Compute endpoints. \( f(1) = 1 \), \( f(4) = 2 \).
- Step 3: Compute secant slope. \( \frac{f(4)-f(1)}{4-1} = \frac{2-1}{3} = \frac{1}{3} \).
- Step 4: Find derivative. \( f'(x) = \frac{1}{2\sqrt{x}} \). Set \( f'(c) = \frac{1}{3} \Rightarrow \frac{1}{2\sqrt{c}} = \frac{1}{3} \Rightarrow 2\sqrt{c} = 3 \Rightarrow \sqrt{c} = \frac{3}{2} \Rightarrow c = \frac{9}{4} = 2.25 \).
- Step 5: Verify \( c \in (1, 4) \). Yes, \( 2.25 \in (1, 4) \). MVT verified.
REASONING: The square root function is continuous and differentiable on the given interval, so MVT applies. The derivative represents the instantaneous rate of change, and we find where it equals the average rate of change over the interval. The algebraic manipulation involves solving a simple radical equation.
ANSWER: \( c = \frac{9}{4} \) (or 2.25)

## WORKED_EXAMPLE_2
PROBLEM: Verify the Mean Value Theorem for \( f(x) = x^3 - 6x^2 + 11x - 6 \) on \([1, 3]\). Show that there are two distinct values of \( c \) satisfying the theorem.  
STEPS:
- Step 1: \( f \) is a polynomial, so continuous on \([1, 3]\) and differentiable on \((1, 3)\). Conditions satisfied.
- Step 2: \( f(1) = 1 - 6 + 11 - 6 = 0 \); \( f(3) = 27 - 54 + 33 - 6 = 0 \). Secant slope \( = \frac{0-0}{3-1} = 0 \).
- Step 3: \( f'(x) = 3x^2 - 12x + 11 \). Set \( f'(c) = 0 \Rightarrow 3c^2 - 12c + 11 = 0 \).
- Step 4: Solve quadratic: \( c = \frac{12 \pm \sqrt{144 - 132}}{6} = \frac{12 \pm \sqrt{12}}{6} = \frac{12 \pm 2\sqrt{3}}{6} = 2 \pm \frac{\sqrt{3}}{3} \).
- Step 5: Approximate: \( 2 - \frac{\sqrt{3}}{3} \approx 1.423 \), \( 2 + \frac{\sqrt{3}}{3} \approx 2.577 \). Both lie in \((1, 3)\).
- Step 6: Conclusion: Two distinct values \( c_1 = 2 - \frac{\sqrt{3}}{3} \), \( c_2 = 2 + \frac{\sqrt{3}}{3} \) satisfy MVT. This shows \( c \) is not necessarily unique.
REASONING: Since \( f(1)=f(3)=0 \), the secant line is horizontal (slope 0). MVT reduces to Rolle's Theorem in this special case, but the function is not constant, so there can be multiple points with horizontal tangent. The cubic has a local max and min in the interval, giving two points where derivative is zero.
ANSWER: \( c = 2 \pm \frac{\sqrt{3}}{3} \)

## WORKED_EXAMPLE_3
PROBLEM: A car travels along a straight road. Its position at time \( t \) hours is given by \( s(t) = t^3 - 6t^2 + 9t \) km for \( t \in [0, 3] \). Use the Mean Value Theorem to prove that at some instant in \( (0, 3) \), the car's velocity was exactly 0 km/h.  
STEPS:
- Step 1: Identify \( f(t) = s(t) = t^3 - 6t^2 + 9t \), interval \([0, 3]\). \( s(t) \) is a polynomial, so continuous on \([0, 3]\) and differentiable on \((0, 3)\).
- Step 2: Compute endpoints: \( s(0) = 0 \), \( s(3) = 27 - 54 + 27 = 0 \). Average velocity \( = \frac{s(3)-s(0)}{3-0} = \frac{0}{3} = 0 \) km/h.
- Step 3: Velocity is derivative: \( v(t) = s'(t) = 3t^2 - 12t + 9 \).
- Step 4: By MVT, \( \exists c \in (0, 3) \) such that \( v(c) = \text{average velocity} = 0 \). So \( 3c^2 - 12c + 9 = 0 \Rightarrow c^2 - 4c + 3 = 0 \Rightarrow (c-1)(c-3) = 0 \Rightarrow c = 1 \) or \( c = 3 \).
- Step 5: \( c = 1 \in (0, 3) \), \( c = 3 \) is an endpoint (not in open interval). So at \( t = 1 \) hour, velocity is exactly 0 km/h.
- Step 6: Interpretation: The car starts at 0 km, returns to 0 km at \( t=3 \). Average velocity is 0. MVT guarantees at least one moment when instantaneous velocity is 0 (here, at \( t=1 \) when it turns around).
REASONING: This applies MVT to a real-world motion problem. The conditions are met because polynomial position functions are smooth. The conclusion directly gives a time when velocity equals the average velocity.
ANSWER: At \( t = 1 \) hour, the car's velocity is 0 km/h.

## COMPETENCY_QUESTION_1
QUESTION: (Case-based) A high-speed train travels from Station A to Station B, a distance of 300 km, in exactly 3 hours. The train's position function \( s(t) \) (in km from Station A) is continuous and differentiable for \( t \in [0, 3] \).  
(a) What is the train's average speed over the journey?  
(b) Using the Mean Value Theorem, prove that at some instant \( t = c \in (0, 3) \), the train's speedometer read exactly 100 km/h.  
(c) The train's speed is given by \( v(t) = 50 + 50\sin(\pi t) \) km/h. Verify that the MVT conclusion holds by finding \( c \) such that \( v(c) = 100 \).  
COMPETENCY: Translating real-world situations to mathematical expressions  
STEPS:
- Step 1: Average speed = total distance / total time = 300/3 = 100 km/h.
- Step 2: By MVT, since \( s(t) \) is continuous on \([0,3]\) and differentiable on \((0,3)\), \( \exists c \in (0,3) \) with \( s'(c) = \frac{s(3)-s(0)}{3-0} = 100 \). But \( s'(t) = v(t) \), so \( v(c) = 100 \).
- Step 3: Set \( 50 + 50\sin(\pi c) = 100 \Rightarrow \sin(\pi c) = 1 \Rightarrow \pi c = \frac{\pi}{2} + 2k\pi \). For \( c \in (0,3) \), \( c = \frac{1}{2} \) (or 2.5). Both work.
ANSWER: (a) 100 km/h. (b) MVT guarantees \( \exists c \in (0,3) \) with \( v(c)=100 \). (c) \( c = 0.5 \) hours or \( c = 2.5 \) hours.  
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: (Assertion-Reason)  
Assertion (A): If \( f(x) = x^2 \) on \([-1, 2]\), then there exists \( c \in (-1, 2) \) such that \( f'(c) = 1 \).  
Reason (R): The Mean Value Theorem guarantees that for any function continuous on \([a,b]\) and differentiable on \((a,b)\), there is a point where the derivative equals the average rate of change.  
Choose the correct option:  
(A) Both A and R are true, and R is the correct explanation of A.  
(B) Both A and R are true, but R is NOT the correct explanation of A.  
(C) A is true but R is false.  
(D) A is false but R is true.  
Justify your choice by verifying the conditions and computing the required \( c \).  
COMPETENCY: Comparing and justifying  
STEPS:
- Step 1: Check A: \( f(x)=x^2 \) is polynomial, so continuous on \([-1,2]\), differentiable on \((-1,2)\). \( f(-1)=1, f(2)=4 \). Average rate = \( \frac{4-1}{2-(-1)} = 1 \). \( f'(x)=2x \). Set \( 2c=1 \Rightarrow c=0.5 \in (-1,2) \). A is TRUE.
- Step 2: Check R: This is the exact statement of MVT. R is TRUE.
- Step 3: R directly explains A because A is a specific application of the general theorem stated in R.
ANSWER: (A) Both A and R are true, and R is the correct explanation of A.  
DIFFICULTY: medium