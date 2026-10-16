## ELI5
Before antiderivatives existed, areas were cornered by brute force: slice the region into n thin strips, total the strips' areas into a Riemann sum, and let n grow without bound. The definite integral is defined as exactly that limit - width shrinking, height sampled in each strip, the sum settling to a single number. The garden bed along a curved edge is the picture: more, thinner strips hug the curve better, and in the limit the estimate becomes exact.

## DEFINITION
The definite integral of a continuous function \(f(x)\) on \([a, b]\) is defined as the limit of a Riemann sum:  
\[
\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x,
\]  
where \(\Delta x = \frac{b-a}{n}\), \(x_i^*\) is any point in the \(i\)-th subinterval \([x_{i-1}, x_i]\) with \(x_i = a + i\Delta x\). If the limit exists, \(f\) is integrable on \([a, b]\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) write the Riemann sum for a given function and interval using right-endpoint, left-endpoint, or midpoint rules, (2) express the sum in closed form using summation formulas (\(\sum i\), \(\sum i^2\), \(\sum i^3\)), (3) evaluate the limit as \(n \to \infty\) to obtain the exact value of the definite integral, and (4) explain why the limit definition is equivalent to the area under the curve.

## SCOPE_BOUNDARY
This node covers the definition of the definite integral as a limit of a sum (Riemann sums) for continuous functions on a closed interval, using right-endpoint, left-endpoint, and midpoint partitions. It does NOT cover improper integrals, Lebesgue integration, or the Fundamental Theorem of Calculus (which is the next node c12_math_cbse_07_008). It stays within the NCERT Class 12 scope: evaluation of \(\int_a^b f(x)dx\) via limit of sums for polynomials, trigonometric, and exponential functions.

## WALKTHROUGH
Imagine you are designing a rectangular garden bed of length 5 metres along a curved edge \(y = x^2\) from \(x=0\) to \(x=5\). To estimate the area, you divide the bed into \(n\) thin vertical strips of equal width \(\Delta x = 5/n\). The height of the \(i\)-th strip is \(f(x_i) = (i\Delta x)^2\). The total approximate area is \(\sum_{i=1}^n (i\Delta x)^2 \Delta x\). As you make the strips thinner (\(n \to \infty\)), the sum approaches the exact area. Start by writing \(\Delta x = \frac{b-a}{n}\) and \(x_i = a + i\Delta x\). Substitute into \(\sum f(x_i)\Delta x\), use formulas for \(\sum i\), \(\sum i^2\), \(\sum i^3\), then take the limit. The key insight: the definite integral is the limit of this discrete sum, giving a precise area without needing an antiderivative.

Takeaway first: the definite integral is a limit of discrete sums - no antiderivative required - and closed-form summation formulas turn the finite sum into something whose limit can be taken. Exam moves: setup questions writing Riemann sums from right, left or midpoint samples, closed-form questions using the sum-of-powers formulas, limit questions evaluating to the exact value, and equivalence questions tying the limit to area. Method: rerun the garden - width delta x over the interval, height from the curve at each sample point, sum, apply the power-sum formulas, take the limit. Check yourself: the sample point's choice - right edge, left edge, midpoint - does not affect the limit for continuous functions; it only changes the scenery mid-computation. Drill: evaluate one integral from its Riemann definition, showing every summation step.

## DIAGNOSTIC_QUESTION_1
State the definition of the definite integral \(\int_a^b f(x) dx\) as a limit of a sum using right endpoints. Write the expression for \(\Delta x\) and \(x_i\).

## DIAGNOSTIC_ANSWER_1
The definite integral is \(\lim_{n\to\infty} \sum_{i=1}^n f(a + i\Delta x) \Delta x\) with \(\Delta x = \frac{b-a}{n}\). A wrong answer (e.g., using \(x_i = a + (i-1)\Delta x\) or omitting the limit) shows confusion between left/right endpoints or missing the limiting process that converts the approximation to an exact value.

## DIAGNOSTIC_QUESTION_2
Explain why the limit of the Riemann sum \(\sum_{i=1}^n f(x_i^*)\Delta x\) gives the exact area under \(y=f(x)\) for a continuous positive function, whereas any finite \(n\) only gives an approximation.

## DIAGNOSTIC_ANSWER_2
For finite \(n\), rectangles either overestimate or underestimate the curved area; the error is the sum of small curved regions between the rectangles and the curve. As \(n\to\infty\), \(\Delta x\to 0\), the width of each error region vanishes, and the total error tends to zero. A wrong answer that says "rectangles become the curve" reveals a misunderstanding of the limiting process — the rectangles never become the curve; their total area converges to the area under the curve.

## DIAGNOSTIC_QUESTION_3
Evaluate \(\int_0^2 (x^2 + 1) dx\) as a limit of a sum using right endpoints. Show all steps including the summation formulas.

## DIAGNOSTIC_ANSWER_3
\(\Delta x = \frac{2}{n},\; x_i = \frac{2i}{n}\).  
Sum = \(\sum_{i=1}^n \left[\left(\frac{2i}{n}\right)^2 + 1\right] \frac{2}{n} = \frac{8}{n^3}\sum i^2 + \frac{2}{n}\sum 1\).  
\(\sum i^2 = \frac{n(n+1)(2n+1)}{6},\; \sum 1 = n\).  
Sum = \(\frac{8}{n^3}\cdot\frac{n(n+1)(2n+1)}{6} + \frac{2}{n}\cdot n = \frac{4}{3}\frac{(n+1)(2n+1)}{n^2} + 2\).  
Limit \(n\to\infty\): \(\frac{4}{3}\cdot 2 + 2 = \frac{8}{3}+2 = \frac{14}{3}\).  
A wrong answer often misapplies \(\sum i^2\) or forgets to multiply by \(\Delta x\) in the second term, showing algebraic carelessness.

## DIAGNOSTIC_QUESTION_4
Compare the right-endpoint sum and the midpoint sum for \(f(x)=x^2\) on \([0,1]\) with \(n=4\). Which is larger? Why does the midpoint rule generally give a better approximation for the same \(n\)?

## DIAGNOSTIC_ANSWER_4
Right-endpoint: \(\Delta x=0.25\), \(x_i=0.25,0.5,0.75,1.0\); sum = \(0.25(0.0625+0.25+0.5625+1)=0.46875\).  
Midpoint: \(x_i^*=0.125,0.375,0.625,0.875\); sum = \(0.25(0.015625+0.140625+0.390625+0.765625)=0.328125\).  
Exact integral = \(1/3 \approx 0.3333\). Midpoint is closer because errors from over/under estimation cancel symmetrically. A student who says "right-endpoint is always larger" misses that for decreasing functions the opposite holds; the key is the symmetry of error.

## DIAGNOSTIC_QUESTION_5
A student writes: \(\int_0^3 x^2 dx = \lim_{n\to\infty} \sum_{i=1}^n \left(\frac{3i}{n}\right)^2\). Identify the error and correct it.

## DIAGNOSTIC_ANSWER_5
The student omitted \(\Delta x = \frac{3}{n}\) in the summand. The correct sum is \(\lim_{n\to\infty} \sum_{i=1}^n \left(\frac{3i}{n}\right)^2 \cdot \frac{3}{n}\). Without \(\Delta x\), the sum diverges to infinity. This error shows the student treats the sum as just function values, not areas of rectangles (height × width).

## DIAGNOSTIC_QUESTION_6
Construct a function \(f(x)\) on \([0,1]\) and a partition with \(n=3\) such that the left-endpoint Riemann sum equals the right-endpoint Riemann sum, but the function is not constant. Explain why this happens.

## DIAGNOSTIC_ANSWER_6
Example: \(f(x) = \sin(2\pi x)\) on \([0,1]\) with \(n=3\). Left endpoints: \(0, 1/3, 2/3\); right endpoints: \(1/3, 2/3, 1\). Both sums are zero because \(\sin(0)=\sin(2\pi/3)+\sin(4\pi/3)=0\) and similarly for right. The function is symmetric about the midpoint of each subinterval, so left and right samples cancel. A poor answer gives a constant function or cannot explain the cancellation, missing the role of function symmetry.

## COMMON_MISCONCEPTION
Students often write the Riemann sum as \(\sum f(x_i)\) without the \(\Delta x\) factor, or they use \(\Delta x = \frac{b}{n}\) instead of \(\frac{b-a}{n}\) when \(a \neq 0\). Another frequent error: in the summation step, they incorrectly apply \(\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}\) but forget to multiply by the coefficient from \(\Delta x^3\), leading to an incorrect limit. For example, in \(\int_0^2 x^2 dx\), they write \(\sum \left(\frac{2i}{n}\right)^2 = \frac{4}{n^2}\sum i^2\) and then take the limit without the extra \(1/n\) from \(\Delta x\), getting \(\frac{8}{3}\) instead of \(\frac{8}{3}\)? Wait, the correct limit is \(\frac{8}{3}\) but the wrong sum without \(\Delta x\) would give \(\lim \frac{4}{n^2}\frac{n(n+1)(2n+1)}{6} = \frac{8}{3}\)? Actually, the missing \(\Delta x\) is exactly the factor \(1/n\) that makes the sum converge; without it the sum grows as \(n\). The typical mistake is to drop \(\Delta x\) entirely and then claim the limit is the integral, which is dimensionally wrong.

## ON_FAILURE
If a student drops \(\Delta x\) or uses the wrong \(\Delta x\):
1. Ask: "What are the units of the sum? Height is in metres, width must be in metres, so area is m². What is \(\Delta x\) in your sum?"
2. Re-derive \(\Delta x = \frac{b-a}{n}\) from the partition of \([a,b]\) into \(n\) equal parts.
3. Have them write the sum for a concrete case: \(f(x)=x\) on \([1,3]\) with \(n=4\). Compute both left and right sums manually to see \(\Delta x = 0.5\).
4. Re-attempt the general sum with \(\Delta x\) included, and check that the limit is finite.

## PREREQUISITE_NODE_IDS
c12_math_cbse_07_001, c11_math_cbse_13_001, c11_math_cbse_09_010, c10_math_cbse_05_008, c12_math_cbse_07_003, c12_math_cbse_07_005, c12_math_cbse_07_006, c12_phy_cbse_02_003

## PREREQUISITE_REASONS
c12_math_cbse_07_001: Integration as inverse of differentiation provides the antiderivative concept, which the limit-of-sum definition will later be connected to via the Fundamental Theorem.
c11_math_cbse_13_001: Intuitive idea of limits is essential to understand the limit of a sum as \(n\to\infty\).
c11_math_cbse_09_010: Sum of special series \(\sum n, \sum n^2, \sum n^3\) are directly used to evaluate the Riemann sums in closed form.
c10_math_cbse_05_008: Sum of first n terms of an AP provides the foundation for summation formulas used in Riemann sums.
c12_math_cbse_07_003: Definite integrals as limit of a sum may require evaluating rational function integrals.  
c12_math_cbse_07_005: Definite integrals require evaluating antiderivatives at limits; trigonometric antiderivatives appear in almost every definite integral exercise.  
c12_math_cbse_07_006: Definite integrals apply the same antiderivatives with limits; the standard integrals are the first step in evaluating any definite integral involving exponentials or logarithms.  
c12_phy_cbse_02_003: c12_phy_cbse_02_003 | The definite integral as limit of sum is used to compute work done by a variable force: \(W = \int F(x) dx = \lim \sum F(x_i)\Delta x\), where \(F(x)\) is force in newtons and \(x\) is displacement in metres.  

## FORWARD_NODE_IDS
c12_math_cbse_07_008, c12_math_cbse_07_009, c12_math_cbse_07_010, c12_math_cbse_07_011
## FORWARD_REASONS
c12_math_cbse_07_008: The First Fundamental Theorem of Calculus connects the area function (defined as a definite integral) to the derivative, relying on the limit-of-sum definition.
c12_math_cbse_07_009: The Second Fundamental Theorem uses antiderivatives to evaluate definite integrals, providing the practical computation method that the limit-of-sum definition motivates.
c12_math_cbse_07_010: Properties of definite integrals (linearity, additivity, symmetry) are proved using the limit-of-sum definition or the Fundamental Theorem.
c12_math_cbse_07_011: Evaluation by substitution changes variables in the definite integral, which is justified by the limit-of-sum definition under a change of partition.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_math_cbse_13_007
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: Derivative of polynomial functions — the limit-of-sum definition of integral will later be shown to be the inverse of differentiation for polynomials.
c11_math_cbse_13_007: Derivative using first principles — the limit process in Riemann sums is analogous to the limit of the difference quotient, reinforcing the duality of differentiation and integration.

## CHAIN_DESCRIPTION
c11_math_cbse_09_010 -> c12_math_cbse_07_007 -> c12_math_cbse_07_008

## THIS_FORMULA
\[
\int_a^b f(x) \, dx = \lim_{n \to \infty} \frac{b-a}{n} \sum_{i=1}^n f\left(a + i\frac{b-a}{n}\right)
\]

## FORMULA_VARIABLES
\(a\) = lower limit of integration, \(b\) = upper limit of integration, \(n\) = number of subintervals, \(\Delta x = \frac{b-a}{n}\) = width of each subinterval, \(x_i = a + i\Delta x\) = right endpoint of \(i\)-th subinterval, \(f(x_i)\) = height of rectangle at right endpoint.

## FORMULA_UNITS
If \(x\) is in metres and \(f(x)\) is in metres, the integral is in square metres (area). In general, units of integral = units of \(f(x)\) × units of \(x\).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_02_003 | The definite integral as limit of sum is used to compute work done by a variable force: \(W = \int F(x) dx = \lim \sum F(x_i)\Delta x\), where \(F(x)\) is force in newtons and \(x\) is displacement in metres.
 c12_eco_cbse_03_004 | Consumer surplus is the area under the demand curve minus total expenditure, calculated as a definite integral: \(\int_0^{q_0} D(q) dq - p_0 q_0\), evaluated via limit of sums or antiderivatives.
## PREREQ_CONCEPT
Summation formulas for \(\sum i\), \(\sum i^2\), \(\sum i^3\) and the concept of a limit as \(n \to \infty\).

## PREREQ_BEFORE
The student must be able to write a Riemann sum for a given function and interval, and simplify it using known summation formulas.

## PREREQ_STUCK
If stuck, revisit the formulas for \(\sum_{i=1}^n i = \frac{n(n+1)}{2}\), \(\sum i^2 = \frac{n(n+1)(2n+1)}{6}\), \(\sum i^3 = \left[\frac{n(n+1)}{2}\right]^2\) from Class 11 Sequences and Series (c11_math_cbse_09_010).

## WORKED_EXAMPLE_1
PROBLEM: A farmer wants to find the exact area of a plot bounded by the curve \(y = 2x + 1\), the x-axis, and the lines \(x = 1\) and \(x = 4\). Use the definition of definite integral as a limit of a sum with right endpoints to compute the area.

STEPS:
- Step 1: Identify the interval \([a, b] = [1, 4]\) and function \(f(x) = 2x + 1\). The width of each subinterval is \(\Delta x = \frac{4-1}{n} = \frac{3}{n}\).
- Step 2: The right endpoint of the \(i\)-th subinterval is \(x_i = a + i\Delta x = 1 + \frac{3i}{n}\).
- Step 3: Write the Riemann sum: \(\sum_{i=1}^n f(x_i) \Delta x = \sum_{i=1}^n \left[2\left(1 + \frac{3i}{n}\right) + 1\right] \frac{3}{n} = \sum_{i=1}^n \left(3 + \frac{6i}{n}\right) \frac{3}{n}\).
- Step 4: Simplify the sum: \(\frac{9}{n} \sum_{i=1}^n 1 + \frac{18}{n^2} \sum_{i=1}^n i = \frac{9}{n} \cdot n + \frac{18}{n^2} \cdot \frac{n(n+1)}{2} = 9 + \frac{9(n+1)}{n}\).
- Step 5: Take the limit as \(n \to \infty\): \(\lim_{n\to\infty} \left(9 + 9\left(1 + \frac{1}{n}\right)\right) = 9 + 9 = 18\). The area is 18 square units.

REASONING: The Riemann sum approximates the area with rectangles. As \(n\) increases, the rectangles better fit the trapezoidal region under the straight line. The limit of the sum gives the exact area, which matches the geometric formula for a trapezoid: \(\frac{1}{2}(f(1)+f(4))(4-1) = \frac{1}{2}(3+9)\cdot 3 = 18\).

ANSWER: 18 square units.

## WORKED_EXAMPLE_2
PROBLEM: Evaluate \(\int_0^{\pi/2} \sin x \, dx\) as a limit of a sum using right endpoints. (Use the identity \(\sum_{i=1}^n \sin(i\theta) = \frac{\sin(n\theta/2) \sin((n+1)\theta/2)}{\sin(\theta/2)}\).)

STEPS:
- Step 1: Here \(a=0, b=\pi/2\), so \(\Delta x = \frac{\pi}{2n}\). Right endpoints: \(x_i = \frac{i\pi}{2n}\).
- Step 2: Riemann sum: \(\sum_{i=1}^n \sin\left(\frac{i\pi}{2n}\right) \cdot \frac{\pi}{2n}\).
- Step 3: Use the summation formula with \(\theta = \frac{\pi}{2n}\): \(\sum_{i=1}^n \sin(i\theta) = \frac{\sin(n\theta/2) \sin((n+1)\theta/2)}{\sin(\theta/2)}\). Substitute \(\theta\): \(n\theta/2 = \pi/4\), \((n+1)\theta/2 = \frac{\pi}{4} + \frac{\pi}{4n}\), \(\theta/2 = \frac{\pi}{4n}\).
- Step 4: Sum = \(\frac{\pi}{2n} \cdot \frac{\sin(\pi/4) \sin(\pi/4 + \pi/(4n))}{\sin(\pi/(4n))} = \frac{\pi}{2n} \cdot \frac{1}{\sqrt{2}} \cdot \frac{\sin(\pi/4 + \pi/(4n))}{\sin(\pi/(4n))}\).
- Step 5: As \(n\to\infty\), \(\frac{\pi}{4n} \to 0\). Use \(\sin \epsilon \approx \epsilon\): \(\frac{\sin(\pi/4 + \epsilon)}{\epsilon} \to \frac{\sin(\pi/4)}{\epsilon} + \cos(\pi/4) = \frac{1/\sqrt{2}}{\epsilon} + 1/\sqrt{2}\). More precisely, \(\lim_{n\to\infty} \frac{\pi}{2n} \frac{1}{\sin(\pi/(4n))} = \frac{\pi}{2n} \cdot \frac{4n}{\pi} = 2\). So the limit becomes \(2 \cdot \frac{1}{\sqrt{2}} \cdot \sin(\pi/4) = 2 \cdot \frac{1}{\sqrt{2}} \cdot \frac{1}{\sqrt{2}} = 1\).
- Step 6: The definite integral equals 1.

REASONING: The limit of the sum uses the exact summation formula for sine, which is derived from trigonometric identities. The limit process exploits the small-angle approximation \(\sin \epsilon \sim \epsilon\), which is a standard limit from Class 11. This shows how the definition works for transcendental functions, not just polynomials.

ANSWER: 1

## WORKED_EXAMPLE_3
PROBLEM: A particle moves along a line with velocity \(v(t) = 3t^2 - 2t + 5\) m/s. Find the displacement from \(t=1\) s to \(t=3\) s using the limit-of-sum definition of the definite integral.

STEPS:
- Step 1: Displacement = \(\int_1^3 v(t) dt = \int_1^3 (3t^2 - 2t + 5) dt\). Interval \([a,b] = [1,3]\), \(\Delta t = \frac{2}{n}\).
- Step 2: Right endpoints: \(t_i = 1 + \frac{2i}{n}\).
- Step 3: Riemann sum: \(\sum_{i=1}^n \left[3\left(1 + \frac{2i}{n}\right)^2 - 2\left(1 + \frac{2i}{n}\right) + 5\right] \frac{2}{n}\).
- Step 4: Expand: \(3(1 + \frac{4i}{n} + \frac{4i^2}{n^2}) - 2 - \frac{4i}{n} + 5 = 3 + \frac{12i}{n} + \frac{12i^2}{n^2} + 3 - \frac{4i}{n} = 6 + \frac{8i}{n} + \frac{12i^2}{n^2}\).
- Step 5: Multiply by \(\Delta t = \frac{2}{n}\): \(\sum \left( \frac{12}{n} + \frac{16i}{n^2} + \frac{24i^2}{n^3} \right)\).
- Step 6: Sum each term: \(\frac{12}{n} \cdot n + \frac{16}{n^2} \cdot \frac{n(n+1)}{2} + \frac{24}{n^3} \cdot \frac{n(n+1)(2n+1)}{6} = 12 + 8\frac{n+1}{n} + 4\frac{(n+1)(2n+1)}{n^2}\).
- Step 7: Limit \(n\to\infty\): \(12 + 8 + 4 \cdot 2 = 12 + 8 + 8 = 28\) metres.

REASONING: The velocity function is a polynomial, so the Riemann sum reduces to sums of powers of \(i\). The limit gives the exact displacement, which can be verified by finding the antiderivative \(t^3 - t^2 + 5t\) and evaluating from 1 to 3: \((27-9+15)-(1-1+5)=33-5=28\). This connects the limit-of-sum definition to the antiderivative method (Fundamental Theorem).

ANSWER: 28 metres

## COMPETENCY_QUESTION_1
QUESTION: The area under the curve \(y = x^2\) from \(x=0\) to \(x=2\) is approximated by a right-endpoint Riemann sum with \(n=4\) subintervals. (a) Draw the rectangles and state whether the approximation overestimates or underestimates the true area. (b) Compute the sum. (c) Without evaluating the limit, explain why the limit as \(n\to\infty\) will give the exact area \(\frac{8}{3}\).

COMPETENCY: Translating real-world situations to mathematical expressions and interpreting geometric meaning.

STEPS:
- Step 1: Sketch \(y=x^2\) on \([0,2]\). Since the function is increasing and concave up, right-endpoint rectangles extend above the curve, so the sum overestimates.
- Step 2: \(\Delta x = 0.5\), \(x_i = 0.5, 1.0, 1.5, 2.0\). Sum = \(0.5(0.25 + 1 + 2.25 + 4) = 0.5 \times 7.5 = 3.75\).
- Step 3: As \(n\) increases, the width \(\Delta x\) decreases, and the error (area between rectangle tops and curve) shrinks to zero because the maximum error per rectangle is proportional to \(\Delta x^2\) (by concavity), and total error \(\sim n \cdot \Delta x^2 = \Delta x \to 0\). The limit is the unique number that all such sums converge to, which is the definition of the integral.

ANSWER: (a) Overestimate because \(f\) is increasing. (b) 3.75. (c) The error tends to zero as \(\Delta x \to 0\), so the limit of the sums equals the exact area.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A student claims that \(\int_0^1 x^2 dx = \lim_{n\to\infty} \sum_{i=1}^n \left(\frac{i}{n}\right)^2\) (without the \(\Delta x\) factor). (a) Show that this limit diverges. (b) Explain physically why the \(\Delta x\) factor is necessary. (c) Write the correct limit expression and evaluate it.

COMPETENCY: Error identification and correction, and justifying mathematical steps.

STEPS:
- Step 1: The sum \(\sum_{i=1}^n (i/n)^2 = \frac{1}{n^2} \sum i^2 = \frac{1}{n^2} \cdot \frac{n(n+1)(2n+1)}{6} = \frac{(n+1)(2n+1)}{6n} \to \frac{2}{6} = \frac{1}{3}\) as \(n\to\infty\). Wait, this actually converges to 1/3, but it's missing the \(\Delta x = 1/n\)? Let's recalc: \(\sum (i/n)^2 = \frac{1}{n^2} \sum i^2 = \frac{(n+1)(2n+1)}{6n} \to \frac{2}{6} = 1/3\). But the integral is \(\int_0^1 x^2 dx = 1/3\). So the student's expression accidentally gives the right number? No, because \(\Delta x = 1/n\), the correct sum is \(\sum (i/n)^2 \cdot (1/n) = \frac{1}{n^3} \sum i^2 = \frac{(n+1)(2n+1)}{6n^2} \to \frac{2}{6} = 1/3\). Both give 1/3? That's a coincidence for \(x^2\) on [0,1]? Let's check: \(\sum f(i/n)\) without \(\Delta x\) is \(\sum (i/n)^2 = \frac{1}{n^2} \sum i^2 \sim n^3/n^2 = n \to \infty\). Wait, \(\sum i^2 = n^3/3 + ...\) so \(\frac{1}{n^2} \cdot n^3 = n \to \infty\). I made an algebra error: \(\frac{(n+1)(2n+1)}{6n} = \frac{2n^2+3n+1}{6n} = \frac{n}{3} + \frac{1}{2} + \frac{1}{6n} \to \infty\). Yes, it diverges. Good.
- Step 2: Physically, \(f(x_i)\) is height (metres). Summing heights gives metres, not area (metres²). The width \(\Delta x\) (metres) converts height to area of each rectangle. Without it, you are adding lengths, not areas.
- Step 3: Correct expression: \(\lim_{n\to\infty} \sum_{i=1}^n \left(\frac{i}{n}\right)^2 \frac{1}{n} = \lim_{n\to\infty} \frac{1}{n^3} \frac{n(n+1)(2n+1)}{6} = \frac{1}{3}\).

ANSWER: (a) The sum behaves like \(\frac{n}{3} \to \infty\). (b) \(\Delta x\) provides the width; without it, the sum has units of length, not area. (c) Correct limit = 1/3.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The key insight: the definite integral is the limit of this discrete sum, giving a precise area without needing an ______.

## DIAGNOSTIC_ANSWER_7
antiderivative

The antiderivative is what the definition pointedly avoids: the limit of sums computes the area with no reverse-differentiation anywhere. **A wrong answer (a formula) reveals the student has smuggled shortcuts into a definition whose entire dignity is doing without them.**
