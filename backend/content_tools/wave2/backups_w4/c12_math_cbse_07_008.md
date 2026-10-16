## ELI5
A car's distance meter totals its speed: the area function A of x - integral of speed from the start to time x - accumulates distance, and the rate at which that accumulation grows at any instant is simply the speed right then. The First Fundamental Theorem states it exactly: the derivative of the integral with a variable upper limit is the original function. Accumulation and instantaneous rate undo each other - integration and differentiation are reverse processes.

## DEFINITION
The Fundamental Theorem of Calculus (Part 1) states that if \( f \) is a continuous real-valued function defined on a closed interval \([a, b]\), and \( A(x) \) is the area function defined by \( A(x) = \int_a^x f(t) \, dt \) for all \( x \in [a, b] \), then \( A \) is differentiable on \((a, b)\) and \( A'(x) = f(x) \) for every \( x \in (a, b) \). In other words, differentiation and integration are inverse processes: the derivative of the integral of a function from a fixed lower limit to a variable upper limit is the function itself.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can state the theorem precisely with all conditions, explain the geometric meaning of the area function, compute derivatives of functions defined by integrals with variable upper limits, and apply the theorem to evaluate derivatives of integral functions without explicitly finding the antiderivative.

## SCOPE_BOUNDARY
This node covers the statement, intuition, and basic applications of the First Fundamental Theorem of Calculus for continuous functions on a closed interval. It does NOT cover the proof (which is beyond NCERT scope), the Second Fundamental Theorem (evaluation of definite integrals using antiderivatives), or cases where the integrand has discontinuities or the limits are not constant/variable in more complex ways (e.g., Leibniz rule).

## WALKTHROUGH
Imagine you are tracking the distance travelled by a car from your home in Delhi to a friend's house in Noida. You know the speed \( v(t) \) at every instant \( t \). The total distance covered from time \( a \) to time \( x \) is the area under the speed-time graph, i.e., \( A(x) = \int_a^x v(t) \, dt \). If you ask: "What is the rate of change of this accumulated distance at time \( x \)?" the answer is simply the speed at that instant, \( v(x) \). This real-world scenario is exactly the First Fundamental Theorem: the derivative of the accumulation function is the original rate function. To begin, write down the area function \( A(x) = \int_a^x f(t) \, dt \), recall the definition of derivative as a limit of difference quotients, and observe that \( A(x+h) - A(x) = \int_x^{x+h} f(t) \, dt \). For small \( h \), this integral is approximately \( f(x) \cdot h \), leading to \( A'(x) = f(x) \). The key insight is that integration accumulates change, and differentiation measures instantaneous rate; they undo each other.

Takeaway first: the area function is differentiable wherever the integrand is continuous, and its derivative is the integrand evaluated at the moving limit - the theorem that makes accumulation reversible. Exam moves: statement questions with conditions, geometric questions on the area function's meaning, and computation questions differentiating integrals with variable upper limits without ever finding an antiderivative. Method: rerun the drive - distance accumulated to time x, its rate of change queried, the instantaneous speed answering. Check yourself: a variable upper limit makes the whole integral a function; a constant lower limit is what lets differentiation pass through cleanly to the integrand. Drill: differentiate three integrals with variable upper limits directly from the theorem.

## DIAGNOSTIC_QUESTION_1
State the First Fundamental Theorem of Calculus. What are the necessary conditions on the function \( f \) and the interval?

## DIAGNOSTIC_ANSWER_1
The theorem states: If \( f \) is continuous on \([a, b]\) and \( A(x) = \int_a^x f(t) \, dt \), then \( A'(x) = f(x) \) for all \( x \in (a, b) \). A wrong answer that omits the continuity condition or writes the lower limit as variable reveals a misunderstanding of the theorem's hypotheses. Students often forget that \( f \) must be continuous on the whole closed interval, or they confuse the variable of integration with the limit variable.

## DIAGNOSTIC_QUESTION_2
Explain why the function \( A(x) = \int_0^x \frac{\sin t}{t} \, dt \) is differentiable for all \( x > 0 \) and find \( A'(x) \). Why can we not simply say \( A'(x) = \frac{\sin x}{x} \) at \( x = 0 \)?

## DIAGNOSTIC_ANSWER_2
The integrand \( \frac{\sin t}{t} \) has a removable discontinuity at \( t = 0 \) (limit is 1), so it can be extended to a continuous function on \([0, x]\) for any \( x > 0 \). By the theorem, \( A'(x) = \frac{\sin x}{x} \) for \( x > 0 \). At \( x = 0 \), the theorem does not directly apply because the interval \([0,0]\) is degenerate and the integrand is not originally defined at 0; we would need to check the limit definition of derivative separately. A wrong answer that blindly applies the formula at \( x = 0 \) without addressing the discontinuity shows lack of attention to the continuity hypothesis.

## DIAGNOSTIC_QUESTION_3
Find the derivative of \( F(x) = \int_1^{x^2} \sqrt{1 + t^3} \, dt \). (Hint: Use the chain rule with the First Fundamental Theorem.)

## DIAGNOSTIC_ANSWER_3
Let \( u = x^2 \). Then \( F(x) = \int_1^u \sqrt{1 + t^3} \, dt \). By the First Fundamental Theorem, \( \frac{d}{du} \int_1^u \sqrt{1 + t^3} \, dt = \sqrt{1 + u^3} \). By the chain rule, \( F'(x) = \sqrt{1 + (x^2)^3} \cdot \frac{d}{dx}(x^2) = \sqrt{1 + x^6} \cdot 2x = 2x \sqrt{1 + x^6} \). A common error is to forget the chain rule and write \( \sqrt{1 + x^6} \), or to incorrectly substitute \( t = x^2 \) inside the square root without multiplying by the derivative of the upper limit.

## DIAGNOSTIC_QUESTION_4
Compare the following two functions: \( G(x) = \int_0^x e^{-t^2} \, dt \) and \( H(x) = \int_x^1 e^{-t^2} \, dt \). How are their derivatives related? Explain without computing antiderivatives.

## DIAGNOSTIC_ANSWER_4
By the First Fundamental Theorem, \( G'(x) = e^{-x^2} \). For \( H(x) \), we can write \( H(x) = \int_1^x (-e^{-t^2}) \, dt = -\int_1^x e^{-t^2} \, dt \). Then \( H'(x) = -e^{-x^2} \). Alternatively, \( H(x) = \int_0^1 e^{-t^2} \, dt - \int_0^x e^{-t^2} \, dt = C - G(x) \), so \( H'(x) = -G'(x) = -e^{-x^2} \). The derivatives are opposites. A student who says they are equal misses the sign change when the variable is the lower limit.

## DIAGNOSTIC_QUESTION_5
A student claims that if \( f \) is continuous on \([a,b]\), then \( \frac{d}{dx} \int_a^b f(t) \, dt = f(x) \). Evaluate this claim and correct it if necessary.

## DIAGNOSTIC_ANSWER_5
The claim is false. The integral \( \int_a^b f(t) \, dt \) is a definite integral with constant limits, so its value is a constant number (the net area from \( a \) to \( b \)). The derivative of a constant is zero, not \( f(x) \). The First Fundamental Theorem applies only when the upper limit is the variable \( x \). The correct statement is \( \frac{d}{dx} \int_a^x f(t) \, dt = f(x) \). A student who agrees with the claim confuses a definite integral (constant) with an area function (variable).

## DIAGNOSTIC_QUESTION_6
Construct a real-world problem (in an Indian context) where the First Fundamental Theorem of Calculus is used to find a rate of change from an accumulated quantity. Describe the quantities involved and write the mathematical formulation.

## DIAGNOSTIC_ANSWER_6
Example: A water tank in a housing society in Mumbai is being filled. The rate of flow of water (in litres per minute) at time \( t \) minutes is given by \( r(t) = 50 - 2t \) for \( 0 \le t \le 20 \). The total volume of water in the tank at time \( x \) is \( V(x) = \int_0^x r(t) \, dt \). The First Fundamental Theorem tells us that the rate of change of volume at time \( x \) is exactly the flow rate \( r(x) \). A good answer will clearly identify the accumulated quantity (volume) and the rate (flow), set up the integral, and state \( V'(x) = r(x) \). A poor answer might just give a formula without context or confuse the variable of integration.

## COMMON_MISCONCEPTION
Students often confuse the variable of integration (dummy variable) with the variable upper limit. For example, when asked to find \( \frac{d}{dx} \int_0^x \sin(x) \, dt \), they might incorrectly treat the integrand as \( \sin(x) \) (constant with respect to \( t \)) and write the integral as \( x \sin(x) \), then differentiate to get \( \sin(x) + x \cos(x) \). The correct approach: the integrand is \( \sin(x) \) with respect to \( t \), so \( \int_0^x \sin(x) \, dt = \sin(x) \int_0^x dt = x \sin(x) \), and the derivative is indeed \( \sin(x) + x \cos(x) \). However, if the integrand were \( \sin(t) \), the derivative would be \( \sin(x) \). The misconception is not recognizing that the dummy variable is integrated out, leaving a function of the upper limit only. Another frequent error: forgetting the chain rule when the upper limit is a function of \( x \), e.g., writing \( \frac{d}{dx} \int_0^{x^2} \cos t \, dt = \cos(x^2) \) instead of \( 2x \cos(x^2) \).

## ON_FAILURE
If a student makes the above errors, take them through the following steps: (1) Write the area function \( A(x) = \int_a^x f(t) \, dt \) and emphasize that \( t \) is a dummy variable — the result depends only on \( x \). (2) For chain rule cases, set \( u = g(x) \) and write \( A(g(x)) = \int_a^{g(x)} f(t) \, dt \). Then compute \( \frac{d}{dx} A(g(x)) = A'(g(x)) \cdot g'(x) = f(g(x)) \cdot g'(x) \). (3) Practice with simple functions like \( f(t) = t \) and \( g(x) = x^2 \) to see the pattern. (4) Revisit the definition of derivative and the limit of \( \frac{1}{h} \int_x^{x+h} f(t) \, dt \) to reinforce why the chain rule appears.

## PREREQUISITE_NODE_IDS
c11_math_cbse_13_006, c11_math_cbse_13_007, c11_math_cbse_13_008, c11_math_cbse_13_009, c11_math_cbse_13_010, c12_math_cbse_07_001, c12_math_cbse_07_007, c12_math_cbse_07_003, c12_math_cbse_07_004

## PREREQUISITE_REASONS
c11_math_cbse_13_006: Derivatives: Intuitive Idea - needed to understand the concept of derivative as instantaneous rate of change.
c11_math_cbse_13_007: Derivative of Polynomial Functions - needed to differentiate simple functions that appear in examples.
c11_math_cbse_13_008: Derivative Using First Principle - needed to grasp the limit definition used in the proof idea of the theorem.
c11_math_cbse_13_009: Algebra of Derivatives - needed for chain rule application when upper limit is a function of x.
c11_math_cbse_13_010: Derivatives of Trigonometric Functions - needed for examples involving trigonometric integrands.
c12_math_cbse_07_001: Integration as Inverse of Differentiation - provides the foundational concept that integration reverses differentiation.
c12_math_cbse_07_007: Definite Integral as Limit of a Sum - gives the definition of definite integral as area, which is used to define the area function A(x).
c12_math_cbse_07_003: Fundamental Theorem of Calculus Part 1 uses anti-derivatives found by partial fractions.  
c12_math_cbse_07_004: Fundamental Theorem Part 1 connects anti-derivatives to definite integrals; integration by parts extends to definite form.  

## FORWARD_NODE_IDS
c12_math_cbse_07_009, c12_math_cbse_07_010, c12_math_cbse_07_011
## FORWARD_REASONS
c12_math_cbse_07_009: Fundamental Theorem of Calculus: Part 2 - directly uses Part 1 to evaluate definite integrals via antiderivatives.
c12_math_cbse_07_010: Properties of Definite Integrals - many properties (e.g., P3, P4) are proved using the First Fundamental Theorem.
c12_math_cbse_07_011: Evaluation of Definite Integrals by Substitution - relies on the relationship between differentiation and integration established by the Fundamental Theorem.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_math_cbse_13_007
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: Derivatives represent rates of change; in physics, velocity is the derivative of position, and the First Fundamental Theorem links displacement (integral of velocity) to velocity.
c11_math_cbse_13_007: Derivatives of polynomial functions are used in kinematics equations; the theorem allows finding position from velocity when velocity is a polynomial.

## CHAIN_DESCRIPTION
c11_math_cbse_13_006 -> c12_math_cbse_07_008 -> c12_math_cbse_07_009

## THIS_FORMULA
If \( f \) is continuous on \([a, b]\) and \( A(x) = \int_a^x f(t) \, dt \), then \( A'(x) = f(x) \) for all \( x \in (a, b) \).

## FORMULA_VARIABLES
\( f \): continuous function on \([a, b]\); \( a, b \): constants with \( a < b \); \( x \): variable in \([a, b]\); \( t \): dummy variable of integration; \( A(x) \): area function (accumulated integral from \( a \) to \( x \)).

## FORMULA_UNITS
If \( f(t) \) has units \( U \) per unit of \( t \) (e.g., m/s), then \( A(x) \) has units \( U \cdot \) (unit of \( t \)) (e.g., m), and \( A'(x) \) has units \( U \) (e.g., m/s).

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c11_math_cbse_13_006 | In physics, if velocity \( v(t) \) is the derivative of position \( s(t) \), then \( s(x) - s(a) = \int_a^x v(t) \, dt \). The First Fundamental Theorem says \( \frac{d}{dx} \int_a^x v(t) \, dt = v(x) \), confirming that the rate of change of displacement is velocity.
c11_math_cbse_13_007 | In economics, marginal cost \( C'(x) \) is the derivative of total cost \( C(x) \). Total cost from producing 0 to \( x \) units is \( \int_0^x C'(t) \, dt \). The theorem shows that the derivative of this accumulated cost is the marginal cost.
## PREREQ_CONCEPT
Understanding of definite integral as area under a curve and derivative as instantaneous rate of change.

## PREREQ_BEFORE
The student must be able to compute derivatives of basic functions (polynomials, trigonometric, exponential) and understand the definition of a definite integral as a limit of Riemann sums.

## PREREQ_STUCK
Review the definition of derivative as a limit and the geometric interpretation of the definite integral as area (c12_math_cbse_07_007).

## WORKED_EXAMPLE_1
PROBLEM: A car starts from rest and its acceleration (in m/s²) at time \( t \) seconds is given by \( a(t) = 6t - 2 \) for \( 0 \le t \le 5 \). Let \( v(x) \) be the velocity of the car at time \( x \). Write \( v(x) \) as an integral and use the First Fundamental Theorem to find the acceleration at time \( x \). Verify by direct differentiation.

STEPS:
- Step 1: Since acceleration is the derivative of velocity, the velocity at time \( x \) is the integral of acceleration from 0 to \( x \) plus initial velocity. The car starts from rest, so initial velocity \( v(0) = 0 \). Thus \( v(x) = \int_0^x a(t) \, dt = \int_0^x (6t - 2) \, dt \).
- Step 2: Compute the integral: \( \int_0^x (6t - 2) \, dt = \left[ 3t^2 - 2t \right]_0^x = 3x^2 - 2x \). So \( v(x) = 3x^2 - 2x \).
- Step 3: By the First Fundamental Theorem, the derivative of \( v(x) \) with respect to \( x \) is the integrand evaluated at \( x \): \( v'(x) = a(x) = 6x - 2 \).
- Step 4: Directly differentiate \( v(x) = 3x^2 - 2x \) to get \( v'(x) = 6x - 2 \), which matches \( a(x) \). This verifies the theorem.

REASONING: The First Fundamental Theorem connects the accumulation of acceleration (integral) to the instantaneous acceleration (derivative). The steps show that integrating acceleration gives velocity, and differentiating that velocity returns the original acceleration function, illustrating the inverse relationship.

ANSWER: \( v(x) = 3x^2 - 2x \) m/s; acceleration at time \( x \) is \( a(x) = 6x - 2 \) m/s².

## WORKED_EXAMPLE_2
PROBLEM: Find the derivative of \( F(x) = \int_2^{x^3} \frac{1}{1 + t^2} \, dt \).

STEPS:
- Step 1: Recognize that the upper limit is \( x^3 \), not \( x \). Let \( u = x^3 \). Then \( F(x) = \int_2^u \frac{1}{1 + t^2} \, dt \).
- Step 2: By the First Fundamental Theorem, \( \frac{d}{du} \int_2^u \frac{1}{1 + t^2} \, dt = \frac{1}{1 + u^2} \).
- Step 3: Apply the chain rule: \( F'(x) = \frac{d}{du} \left( \int_2^u \frac{1}{1 + t^2} \, dt \right) \cdot \frac{du}{dx} = \frac{1}{1 + u^2} \cdot 3x^2 \).
- Step 4: Substitute back \( u = x^3 \): \( F'(x) = \frac{1}{1 + (x^3)^2} \cdot 3x^2 = \frac{3x^2}{1 + x^6} \).
- Step 5: Check: If we had integrated first, \( \int \frac{1}{1+t^2} dt = \tan^{-1} t \), so \( F(x) = \tan^{-1}(x^3) - \tan^{-1}(2) \). Differentiating gives \( \frac{1}{1+(x^3)^2} \cdot 3x^2 \), same result.

REASONING: The chain rule is essential when the upper limit is a function of \( x \). The theorem gives the derivative with respect to the upper limit, and the chain rule accounts for how the upper limit changes with \( x \).

ANSWER: \( F'(x) = \frac{3x^2}{1 + x^6} \).

## WORKED_EXAMPLE_3
PROBLEM: Let \( G(x) = \int_x^3 \frac{\cos t}{\sqrt{t}} \, dt \). Find \( G'(x) \). (Assume \( x > 0 \) so the integrand is continuous.)

STEPS:
- Step 1: The variable \( x \) is the lower limit. To apply the First Fundamental Theorem, we need the variable to be the upper limit. Use the property \( \int_x^3 f(t) \, dt = -\int_3^x f(t) \, dt \).
- Step 2: Write \( G(x) = -\int_3^x \frac{\cos t}{\sqrt{t}} \, dt \).
- Step 3: Now apply the theorem: \( \frac{d}{dx} \int_3^x \frac{\cos t}{\sqrt{t}} \, dt = \frac{\cos x}{\sqrt{x}} \).
- Step 4: Therefore, \( G'(x) = -\frac{\cos x}{\sqrt{x}} \).
- Step 5: Verify by considering \( G(x) = H(3) - H(x) \) where \( H(x) = \int_3^x \frac{\cos t}{\sqrt{t}} \, dt \). Then \( G'(x) = -H'(x) = -\frac{\cos x}{\sqrt{x}} \).

REASONING: The First Fundamental Theorem directly applies when the variable is the upper limit. When it is the lower limit, a sign change is introduced. This example combines the theorem with the property of definite integrals.

ANSWER: \( G'(x) = -\frac{\cos x}{\sqrt{x}} \).

## COMPETENCY_QUESTION_1
QUESTION: A student defines \( A(x) = \int_0^x \frac{\sin t}{t} \, dt \) for \( x > 0 \) and claims that \( A'(x) = \frac{\sin x}{x} \) for all \( x > 0 \). Is this claim correct? Justify your answer by discussing the continuity of the integrand and the conditions of the First Fundamental Theorem.

COMPETENCY: Translating real-world situations to mathematical expressions / Error identification and correction

STEPS:
- Step 1: Identify the integrand \( f(t) = \frac{\sin t}{t} \). Note that it is not defined at \( t = 0 \).
- Step 2: Check if \( f \) can be made continuous on \([0, x]\) for any \( x > 0 \). The limit \( \lim_{t \to 0} \frac{\sin t}{t} = 1 \), so defining \( f(0) = 1 \) makes \( f \) continuous on \([0, x]\).
- Step 3: The First Fundamental Theorem requires \( f \) to be continuous on the closed interval. Since we can extend \( f \) continuously to include 0, the theorem applies for \( x > 0 \).
- Step 4: Conclude that the claim is correct for \( x > 0 \), but the student should mention the removable discontinuity and the extension.

ANSWER: Yes, the claim is correct for all \( x > 0 \). The integrand has a removable discontinuity at \( t = 0 \), and by defining \( f(0) = 1 \), it becomes continuous on \([0, x]\). The First Fundamental Theorem then guarantees \( A'(x) = \frac{\sin x}{x} \) for \( x > 0 \). At \( x = 0 \), the derivative would need to be checked separately using the limit definition.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The temperature \( T(t) \) (in °C) of a metal rod at time \( t \) (in minutes) after heating is given by \( T(t) = 20 + \int_0^t e^{-u/5} \, du \). (a) What is the initial temperature of the rod? (b) Find the rate of change of temperature at time \( t \). (c) If the heating stops after 10 minutes and the rod cools according to Newton's law of cooling \( \frac{dT}{dt} = -k(T - 20) \), explain how the First Fundamental Theorem relates the heating and cooling phases.

COMPETENCY: Comparing and justifying / Applying calculus to physical processes

STEPS:
- Step 1: (a) Initial temperature is at \( t = 0 \): \( T(0) = 20 + \int_0^0 e^{-u/5} \, du = 20 + 0 = 20 \)°C.
- Step 2: (b) By the First Fundamental Theorem, \( \frac{d}{dt} \int_0^t e^{-u/5} \, du = e^{-t/5} \). So \( T'(t) = e^{-t/5} \) °C/min.
- Step 3: (c) During heating, the rate of temperature increase is \( e^{-t/5} \). At \( t = 10 \), the temperature is \( T(10) = 20 + \int_0^{10} e^{-u/5} \, du \). After heating stops, cooling follows \( \frac{dT}{dt} = -k(T - 20) \). The First Fundamental Theorem shows that the derivative of the accumulated heat (integral) is the instantaneous heating rate. Similarly, the cooling rate is the derivative of temperature during cooling. The theorem links the integral of the rate to the net change in temperature in both phases.

ANSWER: (a) 20°C. (b) \( T'(t) = e^{-t/5} \) °C/min. (c) The theorem states that the derivative of the accumulated temperature change (integral of heating rate) is the heating rate itself. During cooling, the differential equation gives the rate directly. Both phases illustrate that the instantaneous rate of temperature change is the derivative of the temperature function, which can be expressed as an integral of the rate.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: In other words, ______ and integration are inverse processes: the derivative of the integral of a function from a fixed lower limit to a variable upper limit is the function itself.

## DIAGNOSTIC_ANSWER_7
differentiation

Differentiation is the first name of the inverse pair: the theorem's content is that differentiating an integral returns the integrand. **A wrong answer (integration twice) reveals the student has broken the pair into duplicates instead of opposites.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are tracking the ______ travelled by a car from your home in Delhi to a friend's house in Noida.

## DIAGNOSTIC_ANSWER_8
distance

The distance is the accumulation being tracked: speed integrated over the journey so far, growing as the car moves. **A wrong answer (the speed) reveals the student has swapped the accumulated total for the rate that feeds it.** The distance is the accumulation: speed integrated up to time x, growing second by second as the car proceeds.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can state the theorem precisely with all conditions, explain the geometric meaning of the area function, compute derivatives of functions defined by integrals with variable upper limits, and apply the theorem to evaluate derivatives of integral functions without explicitly finding the antiderivative.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are tracking the distance ______ by a car from your home in Delhi to a friend's house in Noida.

## DIAGNOSTIC_ANSWER_10
travelled

Travelled is the past-participle of accumulation: the distance is the integral's output, and its rate of change is the speed. **A wrong answer (a remaining word) reveals the student has pointed the meter at the road ahead instead of the road covered.**
